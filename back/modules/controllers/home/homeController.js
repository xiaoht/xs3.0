makerApp.controller('homeController', ['$scope', '$http', '$state', '$ionicSlideBoxDelegate', '$ionicViewSwitcher',
    '$interval', '$timeout', '$ionicPopup', 'popupAlertUtil', 'userService', 'homeService', '$stateParams','bToCService',
    function ($scope, $http, $state, $ionicSlideBoxDelegate, $ionicViewSwitcher, $interval,
              $timeout, $ionicPopup, popupAlertUtil, userService, homeService, $stateParams,bToCService) {
    // alert(window.location.href);
    // localStorage.clear();
        localStorage.token = "";
        localStorage.selected_first_level_id = "";
        doLogin();
        ///** 获取微信code用于支付 */
        //if (PAYNO == 1) {
        //    if (window.location.href.indexOf("code") != -1) {
        //        var param = window.location.href;
        //        if (param.indexOf("code") != -1) {
        //            var start = param.indexOf("?");
        //            var end = param.indexOf("&");
        //            WX_CODE = param.substring(start + 6, end);
        //        } else {
        //            window.location.href = WX_URL;
        //        }
        //    } else {
        //        window.location.href = WX_URL;
        //        return;
        //    }
        //}
        $scope.menuCat = [{name:'iPhone',img:'img/iphone.png'},
            {name:'iPad',img:'img/ipad.png'},
            {name:'Mac',img:'img/ma.png'},
            {name:'Watch',img:'img/watch.png'},
            {name:'Beats',img:'img/beats.png'},
            {name:'配件',img:'img/peijian.png'}
        ]
        $scope.$on('$ionicView.enter',function () {
            $scope.showPager = false;
            $scope.pageNo = 0;
            $scope.hasmore = true;
            $scope.columns = [];
            $scope.carousel = [];
            $scope.homeNewDayList = [];
            $scope.homeReocmmendList = [];
            $scope.homeActivityList = [];
            $scope.slideInterval = 4000;
            $scope.getColoum();
            console.log('屏幕的宽度为'+window.screen.width);
            $scope.oneFithOfScreenWidth = window.screen.width / 5;
            $scope.columsStyle = {
                'width':$scope.oneFithOfScreenWidth + 'px'
            }
            $scope.screenWidthStyle = {
                'width':window.screen.width + 'px'
            }
            console.log('屏幕宽度的五分之一为：'+$scope.oneFithOfScreenWidth);
        })
        $scope.remain = [];  //倒计时
        $scope.homeList = []; //首页装修List
        $scope.homeInput = {};
        $scope.homeInput.searchStr = ''; //搜索框中输入的内容
        //b2c获取首页栏目
        $scope.getColoum = function () {
            bToCService.getHomeColoum().then(function (data) {
                if(data.ret == '0'){
                    $scope.columns = data.data.columns;
                    // var count = $scope.columns.length;
                    // if(count * $scope.oneFithOfScreenWidth > window.screen.width){
                    //     $scope.scrollStyle = {
                    //         'width':count *　$scope.oneFithOfScreenWidth + 'px'
                    //     }
                    // }else {
                    //     $scope.scrollStyle = {
                    //         'width':'100%'
                    //     }
                    // }

                    $scope.getRestContent(10);
               }else {
                   popupAlertUtil.p_alert_example('提示',data.desp);
                }
            });
        }

        //获取方正热卖
        $scope.getHotColoum = function (columnId) {
            var param = {
                column_id:columnId
            }

            bToCService.getHZHotGoods(param).then(function (data) {
                if(data.ret == 0){
                    $scope.hzHotGood = data.data.goods_list;
                    /* 测试数据,后台暂无配置位置 start */
                    if($scope.hzHotGood.length==0){
                        $scope.hzHotGood = [{
                            goods_img:"https://img2.woyaogexing.com/2017/08/08/a8695c5d20b774df!400x400_big.jpg",
                            goods_name:"小豪君特供1",
                            goods_price:"20",
                            goods_activities_price:"10"
                        },{
                            goods_img:"https://img2.woyaogexing.com/2017/08/08/94394d3ee71b05db!400x400_big.jpg",
                            goods_name:"小豪君特供2",
                            goods_price:"20",
                            goods_activities_price:"10"
                        },{
                            goods_img:"https://img2.woyaogexing.com/2017/08/03/aeed75aa8fe97a65!267x267_big.jpg",
                            goods_name:"小豪君特供3",
                            goods_price:"20",
                            goods_activities_price:"10"
                        }]
                    }

                    /* 测试数据,后台暂无配置位置 end */
                }else{
                    $scope.hzHotGood = [];
                    console.log('获取热门商品失败');
                }

            })
        }

        //获取方正新品
        $scope.getNewColoum = function (columnId) {
            var param = {
                column_id:columnId
            }

            bToCService.getHZNewGoods(param).then(function (data) {
                if(data.ret == 0){
                    $scope.hzNewGood = data.data.goods_list;
                    /* 测试数据,后台暂无配置位置 start */
                    if($scope.hzNewGood.length==0){
                        $scope.hzNewGood = [{
                            goods_img:"https://img2.woyaogexing.com/2017/07/26/ac5d440a39eb16ac!300x300_big.jpg",
                            goods_name:"小豪君新品特供1",
                            goods_price:"20",
                            goods_activities_price:"10"
                        },{
                            goods_img:"https://img2.woyaogexing.com/2017/07/18/5951cc8978fae2d8!330x330_big.jpg",
                            goods_name:"小豪君新品特供2",
                            goods_price:"20",
                            goods_activities_price:"10"
                        },{
                            goods_img:"https://img2.woyaogexing.com/2017/06/23/9f5eed62c4a7c1b7!400x400_big.jpg",
                            goods_name:"小豪君新品特供3",
                            goods_price:"20",
                            goods_activities_price:"10"
                        }]
                    }

                    /* 测试数据,后台暂无配置位置 end */
                }else{
                    $scope.hzNewGood = [];
                    console.log('获取新品商品失败');
                }

            })
        }

        //获取方正热门品牌
        $scope.getHotBrand = function (columnId) {
            var param = {
                column_id:columnId,
                start:1,
                count:15
            }

            bToCService.getHZHotBrands(param).then(function (data) {
                if(data.ret == 0){
                    $scope.hzHotBrands = data.data.brand_list;
                }else{
                    $scope.hzHotBrands = [];
                    console.log('获取获取热卖品牌');
                }

            })
        }

        //获取页面主要信息
        $scope.getRestContent = function (columnId) {
            $scope.getCarouselImg(columnId);
            // $scope.getEverydayNewList();
            // $scope.getActivities(columnId);
            // $scope.getHotColoum(columnId);
            // $scope.getNewColoum(columnId);
            // $scope.getHotBrand(columnId);
        }
        //b2c获取轮播图
        $scope.getCarouselImg = function (columnId) {
            var param = {
                column_id:columnId
            }
            bToCService.getHomeCarouselImg(param).then(function (data) {


                $scope.imglist = data.data.images;
                // $scope.slideInterval = parseInt(data.data.image_show_time)*1000;
                $ionicSlideBoxDelegate.update();

                if ($scope.imglist.length > 1) {
                    $timeout(function() {
                        $ionicSlideBoxDelegate.$getByHandle("slideboximgs").loop(true);
                        $scope.showPager = true;
                    }, 1000);
                }

            });
        }
        //轮播图跳转
        $scope.goActive = function (item) {
            if(item.link){
                if(item.link.indexOf('goods_id:') == 0){

                    window.location.href='modules/views/HTML/goods/goodsDetails.html?goods_id='+item.link.replace('goods_id:','')+'&mine=mine';

                }else{
                    window.location.href= item.link;
                }

            }
            // else{
            //     if(item.type == 5){
            //
            //         window.location.href='modules/views/HTML/activity/active_1.html?activity_id='+item.promotion_id;
            //     }else{
            //         window.location.href='modules/views/HTML/activity/active_2.html?activity_id='+item.promotion_id;
            //     }
            // }
        }
        //获取每日上新
        $scope.getEverydayNewList = function () {
            bToCService.getEverydayNewList().then(function (data) {
                if(data.ret == '0'){
                    $scope.everydayNewList = data.data.goods_list;
                }else {
                    popupAlertUtil.p_alert_example('提示',data.desp);
                }
            });
        }

        //获取精选活动
        $scope.getActivities = function (columnId) {
            var param  = {
                column_id:columnId
            }
            bToCService.getHomeHotActivities(param).then(function (data) {
                if(data.ret == '0'){
                    $scope.hotActivitiesList = data.data.activities_list;
                }else {
                    // popupAlertUtil.p_alert_example('提示',data.desp);
                    console.log('获取精选活动异常：'+data.desp)
                }
            });
        }
        //获取方正推荐
        function getRecommendList () {
            var param = {
                start: String($scope.pageNo)
            }
            bToCService.getHomeRecommendList(param).then(function (data) {
                if(data.ret == '0'){
                    $scope.homeReocmmendList = $scope.homeReocmmendList.concat(data.data.goods_list);
                    if(data.data.goods_list.length == 8){
                        $scope.hasmore = true;
                    }else {
                       $scope.hasmore = false;
                    }
                }else {
                    $scope.hasmore = false;
                    console.log(data.desp);
                }
                // $scope.$broadcast('scroll.refreshComplete');
                $scope.$broadcast('scroll.infiniteScrollComplete');

            });
        }
        $scope.doLoadMore = function () {
            $scope.pageNo += 1;
            getRecommendList();
        }

        /** 判断是否登录，没登录清空用户信息| */
        // if (userService.getUsername()) {
        //     if (userService.getUsername() == -1 || userService.getUsername() == null) {
        //         userService.clearUserInfo();
        //     }
        // } else {
        //     userService.clearUserInfo();
        // }
        $scope.bannerWidth = WINDOW_WIDTH;
        $scope.bannerHeight = BANNER_HEIGHT;


        /** 搜索按钮被点击 */
        $scope.searchOnclick = function () {
            $scope.OnGoodsList($scope.homeInput.searchStr);
        };

        //倒计时
        $scope.countDown = function (id, time) {
            var remainHour = formatTime(Math.floor(time / 3600));
            var remainMinute = formatTime(Math.floor((time % 3600) / 60));
            var remainSecond = formatTime(Math.floor(time % 60));
            $scope.remain[id] = {
                hour: remainHour,
                minute: remainMinute,
                second: remainSecond
            };
            $interval(function () {
                var remainTime = time;
                if (remainTime <= 0) {
                    $interval.cancel();
                    return;
                }
                $scope.remain[id].hour = formatTime(Math.floor(remainTime / 3600));
                $scope.remain[id].minute = formatTime(Math.floor((remainTime % 3600) / 60));
                $scope.remain[id].second = formatTime(Math.floor(remainTime % 60));
                time = time - 1;
            }, 1000);
        };

        function formatTime(time) {
            if (String(time).length == 1) {
                return '0' + time;
            } else {
                return time;
            }
        }

        //跳转到通栏专场页面
        $scope.OnSpecial = function (id, name, goods) {
            console.log('跳转到通栏专场页面 goods = ' + JSON.stringify(goods));
            var toChannelParam = {
                id: id,
                name: name,
                goods: JSON.stringify(goods)
            };
            $state.go('commodityChannel', toChannelParam);
        };

        //跳转到单排专场页面
        $scope.toSingleChannel = function (id, name, goodsId) {
            console.log('跳转到通单排场页面 goodsId = ' + JSON.stringify(goodsId));
            var toChannelParam = {
                id: id,
                name: name,
                goodsId: goodsId
            };
            $state.go('commodityChannel', toChannelParam);
        };

        //跳转到秒杀专区
        $scope.OnSecKill = function (id, activeName) {
            console.log(activeName);
            $state.go('seckillList', {id: id, title: activeName});
        };
        $scope.HotEnterprise = function (commodityId) {
            // $state.go('commodityDetail', {commodityId: commodityId})
            // $scope.goodsDetailUrl.url = $scope.goodsDetailBasicUrl + 'goods_id:';
            // $scope.openModal();
            window.location.href='modules/views/HTML/brand/brand.html?brand_id='+commodityId;

        };
        //跳转到商品详细
        // =======================
        $scope.toDetail = function (commodityId) {
            // $state.go('commodityDetail', {commodityId: commodityId})
            // $scope.goodsDetailUrl.url = $scope.goodsDetailBasicUrl + 'goods_id:';
            // $scope.openModal();
            window.location.href='modules/views/HTML/goods/goodsDetails.html?goods_id='+commodityId+'&mine=mine';
        };
        $scope.OnDetail = function (goodsId) {
            $state.go('commodityDetail', {commodityId: goodsId});

        };

        //跳转到店铺页面
        $scope.OnStore = function (storeId) {
            $state.go('store', {storeId: storeId});
        };

        //跳转到商品列表
        $scope.OnGoodsList = function (searchStr) {
            $state.go('search');
        };

        //跳转到分类
        $scope.OnCategory = function () {
            $state.go('category');
        };

        // $scope.channel= {};
        // $scope.channel.channelChoose = 0;
        // $scope.channel.changeChoose = function (index) {
        //     $scope.channel.channelChoose = index;
        //     $scope.getRestContent($scope.columns[index].column_id);
        // }

        $scope.goToShoppingCart = function () {
            setTimeout(function () {
                localStorage.url = window.location.href;
                window.location.href='/modules/views/HTML/shoppingCart/shoppingCart.html';
            },200);
        };
        $scope.goToActivity = function () {
            setTimeout(function () {
                localStorage.url = window.location.href;
                window.location.href='/modules/views/HTML/activity/active_list.html';
            },200);
        };
        $scope.goCategory = function (firstCategory) {
            $state.go('category',{firstCategory:firstCategory});
        };

    }]);


makerApp.controller('mineCtrl', ['$scope', '$http', '$state', '$ionicViewSwitcher', '$ionicPopup',
  'mineServices', 'userService', 'popupAlertUtil', 'UrlService',
  function ($scope, $http, $state, $ionicViewSwitcher, $ionicPopup,
            mineServices, userService, popupAlertUtil, UrlService) {
    var ImgUrl = UrlService.imgServerUrl.imgUrl;
    function getlocalstorage() {
      if(!localStorage.user_id){
        alert(localStorage.user_id);
      }
    }
    /** 退出登录 */
    // $scope.logout = function () {
    //
    //
    //       popupAlertUtil.p_confirm_popup("提示信息", "确定要退出登录吗?").then(function (res) {
    //         if (res) {
    //           var param = {user_id:localStorage.user_id,token:localStorage.token};
    //           mineServices.loginOutInfo(param).then(function (json) {
    //             console.log(json);
    //             if (json.data) {
    //               userService.clearUserInfo();
    //               $scope.user.yhm = 0;
    //               $scope.gotoLogin();
    //             }
    //         });
    //         }
    //       });
    //
    // };
    //判断是否登录
    $scope.user = {
      // yhm: 0
    };
    if (localStorage.user_id&&localStorage.token&& localStorage.token != -1
    && localStorage.user_id != "undefined" && localStorage.token != "undefined") {
        var param = {user_id:localStorage.user_id,token:localStorage.token};
        $scope.mineInfos = {user_name:localStorage.user_name}
        // mineServices.getMineInfo(param).then(function (data) {
        //     if(!data.ret){
        //         userService.clearUserInfo();
        //         $scope.user.yhm = 0;
        //         return;
        //     }
        //     if(data.data){
        //         $scope.mineInfos = data.data;
        //         localStorage.userMobile = data.data.mobile;
        //         localStorage.email = data.data.email;
        //     }
        // });
        mineServices.getMineNum(param).then(function (data) {
            if(data.ret != 0){
                return;
            }
            if(data.data){
                $scope.order_no_pay_num =  data.data.order_no_pay_num;
                $scope.order_no_hair_num = data.data.order_no_hair_num;
                $scope.order_no_receive_num = data.data.order_no_receive_num;
            }
        });
    } else {
       // alert('mine mineCtrl '+ 'localStorage.user_id ='+localStorage.user_id
       //  + 'localStorage.token ='+localStorage.token)
       // alert(JSON.stringify(localStorage))


      doLogin();
        return;
    }

    //加载数据
    // if($scope.user.yhm == 1){
    //
    // }

    //跳转到联系我们
    $scope.goToStoreViews = function () {
      // if ($scope.user.yhm == 0) {
      //   $scope.gotoLogin();
      // } else {
        $state.go('store');
      // }
    };

    //跳转到我的足迹
    $scope.goToMyFootprintViews = function () {
      // if ($scope.user.yhm == 0) {
      //   $scope.gotoLogin();
      // } else {
        $state.go('myFootprint');
      // }
    };

    //跳转到地址管理
    $scope.goToAddressManageViews = function () {
      // if ($scope.user.yhm == 0) {
      //   $scope.gotoLogin();
      // } else {
        // $state.go('addressManage', {model: ''});
      localStorage.orderAddress_url = window.location.href;

        window.location.href='modules/views/HTML/order/orderAddress.html?'+'user_id='+localStorage.user_id+'&token='+localStorage.token;
      // }
    };

    //跳转到退款详细
    $scope.goyTOrefundDetailsView = function () {
      // if ($scope.user.yhm == 0) {
      //   $scope.gotoLogin();
      // } else {
        $state.go('refundDetails');
      // }
    };
    //refundList
    $scope.goyTOrefundManager = function () {
      //$state.go('refundManager',{whichTab:0});
      // if ($scope.user.yhm == 0) {
      //   $scope.gotoLogin();
      // } else {
        $state.go('refundList');
      // }

    };

    //跳转到我的购物车
    $scope.goToShopCartView = function () {
      // if ($scope.user.yhm == 0) {
      //   $scope.gotoLogin();
      // } else {
        $state.go('shoppingCart');
      // }
    };
    //跳转到消息
    $scope.goToMessageView = function () {
      // if ($scope.user.yhm == 0) {
      //   $scope.gotoLogin();
      // } else {
        $state.go('message');
      // }
    };
    //跳转到分类
    $scope.goToCategoryView = function () {
      // if ($scope.user.yhm == 0) {
      //   $scope.gotoLogin();
      // } else {
        $state.go('category');
      // }
    };
    //跳转到首页
    $scope.goToHomeView = function () {
      // if ($scope.user.yhm == 0) {
      //   $scope.gotoLogin();
      // } else {
        $state.go('home');
      // }
    };
    //跳转到我的
    $scope.goToMineView = function () {
      // if ($scope.user.yhm == 0) {
      //   $scope.gotoLogin();
      // } else {
        $state.go('mine');
      // }
    };
    //跳转到我的收藏
    $scope.goToCollect = function () {
      // if ($scope.user.yhm == 0) {
      //   $scope.gotoLogin();
      // } else {
        $state.go('newConllectionViews');
      // }
    };
    //跳转到我的关注
    $scope.gotoMyFocus = function () {
      if ($scope.user.yhm == 0) {
        $scope.gotoLogin();
      } else {
        $state.go('myFocusViews');
      }
    };
    //跳转到我的优惠券
    $scope.goToMyCoupon = function () {
      // if ($scope.user.yhm == 0) {
      //   $scope.gotoLogin();
      // } else {
        // $state.go('indent', {whichTab: 0});
        window.location.href='modules/views/HTML/coupon/coupon.html?'+'user_id='+localStorage.user_id+'&token='+localStorage.token+'&type=0';
      // }
    }

    //跳转到全部订单
    $scope.goToAll = function () {
      // if ($scope.user.yhm == 0) {
      //   $scope.gotoLogin();
      // } else {
        // $state.go('indent', {whichTab: 0});
        window.location.href='modules/views/HTML/order/orderList.html?'+'user_id='+localStorage.user_id+'&token='+localStorage.token+'&ordertype=-1';
      // }
    };

    //跳转到待付款
    $scope.goToWaitPay = function () {
      // if ($scope.user.yhm == 0) {
      //   $scope.gotoLogin();
      // } else {
        // $state.go('indent', {whichTab: 1});
        window.location.href='modules/views/HTML/order/orderList.html?'+'user_id='+localStorage.user_id+'&token='+localStorage.token+'&ordertype=0';
      // }
    };
    //跳转到待发货
    $scope.goToWaitSend = function () {
      // if ($scope.user.yhm == 0) {
      //   $scope.gotoLogin();
      // } else {
        // $state.go('indent', {whichTab: 2});
        window.location.href='modules/views/HTML/order/orderList.html?'+'user_id='+localStorage.user_id+'&token='+localStorage.token+'&ordertype=10';
      // }
    };
    //跳转到待收货
    $scope.goToWaitReceive = function () {
      // if ($scope.user.yhm == 0) {
      //   $scope.gotoLogin();
      // } else {
        // $state.go('indent', {whichTab: 3});
        window.location.href='modules/views/HTML/order/orderList.html?'+'user_id='+localStorage.user_id+'&token='+localStorage.token+'&ordertype=20';
      // }
    };
    //跳转到待评价
    $scope.goToWaitAppraisal = function () {
      if ($scope.user.yhm == 0) {
        $scope.gotoLogin();
      } else {
        // $state.go('indent', {whichTab: 4});
        window.location.href='modules/views/HTML/order/orderList.html?'+'user_id='+localStorage.user_id+'&token='+localStorage.token+'&ordertype=40';
      }
    };

    //跳转到我的积分
    $scope.goToMyCoreView = function () {
      if ($scope.user.yhm == 0) {
        $scope.gotoLogin();
      } else {
        $state.go('myScoreViews');
      }
    };
    //跳转到我的礼包
    $scope.goToMyGiftView = function () {
      if ($scope.user.yhm == 0) {
        $scope.gotoLogin();
      } else {
        $state.go('myGiftTabViews');
      }
    };
    //跳转到帮助中心
    $scope.goToHelpCenterView = function () {
      if ($scope.user.yhm == 0) {
        $scope.gotoLogin();
      } else {
        $state.go('helpCenterViews');
      }
    };

    //联系我们的弹窗客服电话：22222222222
    $scope.gotoContact = function(){
      popupAlertUtil.p_confirm_popup("客服电话","22222222222").then(function(res){
        if(res){
          console.log("拨打电话")
          window.location.href = 'tel://22222222222';
        }
      })
    }

    //修改个人信息
    $scope.goToPersonalData = function () {
      $state.go('personalDataViews')
    };
    //登录
    $scope.gotoLogin = function () {
      // $state.go('loginViews');
      localStorage.url = window.location.href;
      // window.location.href='modules/views/HTML/login/login.html';
      doLogin();
    };

    $scope.goToShoppingCart = function () {
      setTimeout(function () {
        localStorage.url = window.location.href;
        window.location.href='/modules/views/HTML/shoppingCart/shoppingCart.html';
      },200);
    };
    $scope.goToActivity = function () {
      // $state.go('loginViews');
      setTimeout(function () {
      localStorage.url = window.location.href;
      window.location.href='/modules/views/HTML/activity/active_list.html';
      },200);
    };

    //提示框
    $scope.mineAlert = function (str) {
      $ionicPopup.alert({
        title: '提示',
        template: str
      })
    };
  }]);




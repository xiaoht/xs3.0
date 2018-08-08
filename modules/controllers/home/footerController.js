/*
 * 底部导航
 * */
makerApp.controller('footerController', ['$scope', '$http', '$state', 'userService', 'getCommodityDetail',
    function ($scope, $http, $state, userService, getCommodityDetail) {
        //判断是否登录 跳转指定路由
        $scope.getUrl = function (url) {
            // if (userService.getSession()) {
                return url;
            // } else {
            //
            //     return 'loginViews';
            // }
        };


        $scope.massage = {
            messageCount: 0,
            messageNo: false
        };


        /** 获取未读消息个数 */
        $scope.getMessageData = function () {
            messageService.getNotReadMessage().then(function (json) {
                console.log('未读消息数量：', json);
                if(json.success){
                    var Count = parseInt(json.result);
                    if (Count > 0) {
                        $scope.massage = {
                            messageCount: Count,
                            messageNo: true
                        };
                    }
                }
            });
        };

        $scope.shopCar = {
            goodsCount: 0,
            shopCarNo: false
        };

        $scope.getShopCarNum = function () {
            //初始化获取购物车数量
            getCommodityDetail.askQuerySc({}).then(function (json) {
                if (!json.success) {
                    return;
                }
                var Count = parseInt(json.result);
                if (Count > 0) {
                    $scope.shopCar.goodsCount = json.result;
                    $scope.shopCar.shopCarNo = true;
                }
            });
        };
        // if (userService.getUsername() != null && userService.getUsername() != "-1") {
        //     $scope.getMessageData();
        //     $scope.getShopCarNum();
        // }
    }
])
;

/*
 * 活动列表
 * */
makerApp.controller('activeListCtrl', ['$scope', '$http', '$state', 'userService', 'getCommodityDetail',
    function($scope, $http, $state, userService, getCommodityDetail) {
        $('.active-list.detail').click(function() {
            window.location.href = '/modules/views/HTML/activity/active_detail.html';
        });
        $('.active-list.coupon').click(function() {
            window.location.href = '/modules/views/HTML/coupon/coupon_get.html';
        });
        $('.active-list.ac03').click(function() {
            window.location.href = 'ac03.html';
        });
        $('.active-list.ac04').click(function() {
            window.location.href = 'ac04.html?returnFlg=true';
        });
        $('.active-list.ac01').click(function() {
            window.location.href = '/modules/views/HTML/activity/ac-jifen.html';
        });
        $('.active-list.discount').click(function() {
            window.location.href = '/modules/views/HTML/activity/discount.html';
        });
        /*$('.active-list.actualGoods').click(function(){
         window.location.href = '/modules/views/HTML/activity/actualGoods.html';
         });*/
        $('.active-list.actualGoods').click(function() {
            window.location.href = '/modules/views/HTML/goods/goodsDetails.html?goods_id=lWEqFXKKagrkVlhxCB5Ca9zxjzG5dx-HqZKxIyVura8&mine=mine';
        });
        $('.active-list.iphonex').click(function() {
            window.location.href = '/modules/views/HTML/goods/goodsDetails.html?goods_id=lWEqFXKKagrkVlhxCB5Ca9zxjzG5dx-HqZKxIyVura8&mine=mine';
        });
        $('.active-list.blackFridayDetail').click(function() {
            window.location.href = '/modules/views/HTML/activity/blackFridayDetail.html';
        });
        $('.active-list.decemberActiveDetail').click(function() {
            window.location.href = '/modules/views/HTML/activity/decemberActiveIndex.html?mine=mine';
        });
        $('.active-list.thanksgivingDayDetail').click(function() {
            window.location.href = '/modules/views/HTML/activity/thanksgivingDayDetail.html';
        });
        $('.active-list.integralChangePhoneDetail').click(function() {
            window.location.href = '/modules/views/HTML/activity/integralChangePhoneDetail.html';
        });
        $('.active-list.christmasBoxIndex').click(function() {
            window.location.href = '/modules/views/HTML/activity/christmasBox.html';
        });
        $('.active-list.christmasIntegral').click(function() {
            window.location.href = '/modules/views/HTML/activity/christmasIntegral.html';
        });
        $('.active-list.beatsActivity').click(function() {
            window.location.href = '/modules/views/HTML/activity/beatsActivity.html';
        });
        $('.active-list.newYearActivity').click(function () {
            window.location.href = '/modules/views/HTML/activity/newYearActivity.html';
        });
        $('.active-list.workDayActivity').click(function () {
            window.location.href = '/modules/views/HTML/activity/workDayActivity.html';
        });
        $('.active-list.girlDayActivity').click(function () {
            window.location.href = '/modules/views/HTML/activity/girlDayActivity.html';
        });
        $('.active-list.valentineActivity').click(function () {
            window.location.href = '/modules/views/HTML/activity/valentineActivity.html';
        });
        $('.active-list.twentyFourActivity').click(function () {
            window.location.href = '/modules/views/HTML/activity/twentyFourActivity.html';
        });
        $scope.goToShoppingCart = function() {
            setTimeout(function() {
                localStorage.url = window.location.href;
                window.location.href = '/modules/views/HTML/shoppingCart/shoppingCart.html';
            }, 200);
        };



    }
]);
/**
 * Created by percy on 2016/11/14.
 */
makerApp.controller('newConllectionCtrl', ['$scope', '$http', '$state', '$ionicViewSwitcher', '$ionicPopup',
    'UrlService', 'popupAlertUtil', '$timeout','$ionicHistory','bToCService',
    function ($scope, $http, $state, $ionicViewSwitcher, $ionicPopup, UrlService, popupAlertUtil, $timeout,$ionicHistory,bToCService) {

        $scope.$on('$ionicView.beforeEnter',function () {
            $scope.editmode = false;
            $scope.totalChoosen = 0;
            $scope.myCollectionList = [];
            $scope.getCollectionList();
        });
        $scope.getCollectionList = function () {
            var param = {
                user_id:localStorage.user_id,
                token:localStorage.token
            }
            bToCService.getNewConllectionList(param).then(function (data) {
                if(data.ret == '0'){
                    $scope.myCollectionList = data.data.goods_list;
                    for(var i = 0; i < $scope.myCollectionList.length; i ++){
                        $scope.myCollectionList[i].isChoosen = false;
                    }
                }else{
                    popupAlertUtil.p_alert_example('',data.desp);
                }
            });
        };
        $scope.gotoEditMode = function () {
            $scope.editmode = true;
        };
        $scope.gotoScaleMode = function () {
            $scope.editmode = false;
            for(var i = 0; i < $scope.myCollectionList.length; i ++){
                $scope.myCollectionList[i].isChoosen = false;
            }
            $scope.totalChoosen = 0;
        };
        $scope.chooseGoods = function (index,choosen) {
            $scope.myCollectionList[index].isChoosen = !choosen;
            var sum = 0;
            for(var i = 0;i < $scope.myCollectionList.length;i ++){
                if($scope.myCollectionList[i].isChoosen){
                    sum += 1;
                }
            };
            $scope.totalChoosen = sum;
        }




        $scope.cancelConllection = function () {
            popupAlertUtil.p_confirm_popup('提示','确认取消收藏吗？').then(function (res) {
                if(res){
                    var goodsArr = [];
                    for(var i = 0; i < $scope.myCollectionList.length; i++){
                        if($scope.myCollectionList[i].isChoosen){
                            goodsArr.push($scope.myCollectionList[i].goods_id);
                        }
                    }

                    var param = {
                        collect_status:'1',
                        goods_ids:goodsArr,
                        user_id:localStorage.user_id,
                        token:localStorage.token
                    }
                    bToCService.addDeleteNewConllection(param).then(function (data) {
                        if(data.ret == '0'){
                            $scope.getCollectionList();
                        }else {
                            popupAlertUtil.p_alert_example('',data.desp);
                        }
                    });
                }
                $scope.gotoScaleMode();
            });
        };
        // =======添加==我的收藏点击跳转详情==========
        $scope.toDetail = function (commodityId) {
            // $state.go('commodityDetail', {commodityId: commodityId})
            // $scope.goodsDetailUrl.url = $scope.goodsDetailBasicUrl + 'goods_id:';
            // $scope.openModal();
            if($scope.editmode == false){
                window.location.href='modules/views/HTML/goods/goodsDetails.html?goods_id='+commodityId+'&mine=mine';}
                else{

            }

        };
        /** 返回按钮被点击 */
        $scope.backButtonOnclick = function () {
           // if (!$ionicHistory.backView()) {
            //    $state.go('home');
            //    return;
            //}
            //$scope.$ionicGoBack();
			$state.go('mine');
        };
    }]);
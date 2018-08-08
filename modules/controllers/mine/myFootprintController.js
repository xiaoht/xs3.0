
makerApp.controller('myFootprintController',
  [
    '$scope', '$stateParams', '$timeout', '$ionicHistory', '$state', '$ionicPopup', 'myFootprintService', 'popupAlertUtil',
    function ($scope, $stateParams, $timeout, $ionicHistory, $state, $ionicPopup, myFootprintService, popupAlertUtil) {


      $scope.$on('$ionicView.enter', function () {
        // getScore($scope.pageIndex);
        $scope.pageIndex = 0;
        $scope.hasmore = true;
      });

      function getScore(pageno) {
          //参数
          params = {
            user_id:localStorage.user_id,
            token:localStorage.token,
            start:pageno,
            count:10
          };
          if(pageno==1){
            $scope.myFootPrintList = [];
          }
          //访问服务器接口
        myFootprintService.getMyFootprintData(params).then(function (data) {
            console.log(data);
          if(data.ret=='0'){
            $scope.myFootPrintList = $scope.myFootPrintList.concat(data.data.goods_list);
            if(data.data.goods_list.length==10){
              $scope.hasmore = true;
              $scope.pageIndex += 1;
            }else{
              $scope.hasmore = false;
            }
            if($scope.myFootPrintList.length > 0){
              var glance_date = '';
              for(var i=0; i < $scope.myFootPrintList.length;i++){
                if($scope.myFootPrintList[i].glance_date && glance_date != $scope.myFootPrintList[i].glance_date){
                  glance_date = $scope.myFootPrintList[i].glance_date;
                }else{
                  $scope.myFootPrintList[i].glance_date = '';
                }
              }

            }
          }
          // $scope.$broadcast('scroll.refreshComplete');
          $scope.$broadcast('scroll.infiniteScrollComplete');
          })
        };
      //加载更多
      $scope.doLoadMore = function () {
        getScore($scope.pageIndex + 1);
      }
      /** 清空被点击*/
      $scope.deleteAllOnclick = function () {
        //请求接口
        popupAlertUtil.p_confirm_popup('提示', '确定清空足迹？').then(function (obj) {
          if (obj) {
            myFootprintService.deleteAll().then(function (json) {
              console.log(json);
              if (json.success) {
                $scope.myFootList = null;
              }
            });
          }
        })
      };
      // =============================
        $scope.goToGoodsDetail_2 = function (commodityId) {
            // $state.go('commodityDetail', {commodityId: commodityId})
            // $scope.goodsDetailUrl.url = $scope.goodsDetailBasicUrl + 'goods_id:';
            // $scope.openModal();
            window.location.href='modules/views/HTML/goods/goodsDetails.html?goods_id='+commodityId+'&mine=mine';
        };
      /** 跳转到 商品详情*/
      $scope.goToGoodsDetail = function(goods_Id){
        $state.go('goodsDetails',{commodityId:goods_Id});
      };
      $scope.backButtonOnclick = function () {
        // if (!$ionicHistory.backView()) {
        //     $state.go('home');
        //     return;
        // }
        // $scope.$ionicGoBack();
        $state.go('mine');
      };
    }
  ]
);

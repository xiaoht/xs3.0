/* controller模块指令 */
//分类信息
makerApp.controller('categoryController', ['$scope', '$http', '$ionicNavBarDelegate', '$timeout',
  'categoryServices', '$stateParams', '$window', '$ionicScrollDelegate', '$state', 'popupAlertUtil', 'userService','bToCService','goodsListServices'
  , function ($scope, $http, $ionicNavBarDelegate, $timeout, categoryServices, $stateParams,
              $window, $ionicScrollDelegate, $state, popupAlertUtil, userService,bToCService,goodsListServices ) {

    // tab选中项
    $scope.activeItem = {first_level_id: ''};
    //高亮当前nav导航
    $scope.goBack = function () {
      if (!$ionicHistory.backView()) {
        $state.go('home');
      } else {
        $ionicNavBarDelegate.back();
      }
    };
// $stateParams
    var selected_first_level_id  = $stateParams.firstCategory != '' ? $stateParams.firstCategory : 1;
    localStorage.selected_first_level_id = selected_first_level_id;
    $scope.selectedLi = selected_first_level_id;
    /** 加载数据 */
    function initCategoryPage() {

      console.log('获取分类开始');
      // 获取一级分类列表
      bToCService.getFirstLevelCategory().then(function (data) {
        console.log(data);
        //网络连接失败
        if (data.ret) {
          $scope.networkError = true;
          return;
        }
        $scope.fistTypeList = data.data;

        //获得一级分类成功后再获取二级分类
        if ($scope.fistTypeList.length > 0) {
          if(localStorage.selected_first_level_id && localStorage.selected_first_level_id != "undefined"){
            getSecondTypeList(localStorage.selected_first_level_id);
          }else if($stateParams.firstCategory){
            getSecondTypeList($stateParams.firstCategory);
          }else{
            getSecondTypeList($scope.fistTypeList[0].category_id);
          }
        }
      });
    }

    initCategoryPage();

    //获取二级分类列表  to do  分类的 icon 还没有设置
    function getSecondTypeList(parentId) {
      localStorage.selected_first_level_id = parentId;
      $scope.selectedLi = parentId;
      $scope.activeItem.first_level_id = parentId;
      $ionicScrollDelegate.$getByHandle('right').scrollTop();
      $scope.isLoading = true;
      var param = {
        "category_id": parentId
      };
      bToCService.getSecondLevelCategory(param).then(function (data) {
        console.log(data);
        if (data.data.length < 1) return;
        $scope.secondTypeData = data.data[0];
        //当一级分类下无二级分类
        if (!$scope.secondTypeData || $scope.secondTypeData.length == 0) {
          return;
        }
        for (var i = 0; i < $scope.secondTypeData.length; i++) {

          if($scope.secondTypeData[i].three_level_list){
            for (var j = 0; j < $scope.secondTypeData[i].three_level_list.length; j++) {
              getGoodsList($scope.secondTypeData[i].three_level_list[j]);
            }
          }

        }

      });

    }

    $scope.getSecondTypeList = getSecondTypeList;
    function getGoodsList(item) {
      var sift = [{"sift_cons_name":item.three_level_id,"sift_cons_id":"mall_category3_id"}];
      $scope.param = {
        input_search: '*', //商品名称
        goods_flag: 1,
        start: 0,
        count:999,
        sift: JSON.stringify(sift)
      };
      goodsListServices.getGoodsList($scope.param).then(function (json) {
        if (json.ret != "0") {
          return;
        }
          item.goodsList = json.data.goods_list;

      });
    }

    $scope.goToShoppingCart = function () {
      // $state.go('loginViews');
        setTimeout(function () {
            localStorage.url = window.location.href;
            window.location.href='/modules/views/HTML/shoppingCart/shoppingCart.html';
        },200);

    };
    $scope.goDetail = function(goods){
      localStorage.url = window.location.href;
      window.location.href='modules/views/HTML/goods/goodsDetails.html?goods_id='+goods.goods_id+'&mine=mine';
    }
    $scope.goToActivity = function () {
      setTimeout(function () {
        localStorage.url = window.location.href;
        window.location.href='/modules/views/HTML/activity/active_list.html';
      },200);
    };

  }]);

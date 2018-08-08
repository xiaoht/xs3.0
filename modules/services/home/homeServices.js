//拉去商铺页面轮播图
makerApp.factory('storeServices',['$http','UrlService',function($http, UrlService){

	var myUrl1 = 'data/store_info.json';
	var myUrl2 = 'data/store_commodity.json';

	return {
		getStoreInfo:function(param){
			return $http.post(myUrl1, param).then(function (object) {
				return object.data;
			});
		},
		getStoreGoodList:function(param, pId){
			params ={'pId':pId};
			return $http.post(myUrl2, {params:params}).then(function (object) {
				return object.data;
			});
		}
	};
}]);

/*获取商品列表*/
makerApp.factory('getCommodityList', ['$http', function ($http) {

	var url = 'data/commodity_list.json';    //获取商品列表url

	return {
		get: function (id) {
			return $http.get(url).then(function (object) {
				data = object.data;
				return data;
			})
		}
	}
}]);

/** 首页service*/

makerApp.factory('homeService',['$http','UrlService',function($http, UrlService){
  //var homeUrl = "data/homedata.json";
  var homeUrl = UrlService.urls.findPageLayoutDataListBySubsystemIdAndPageId_url;
  return {
    getHomeInfo: function (param) {
      return $http.post(homeUrl,param).then(function (object) {
        var data = object.data;
        return data;
      })
    }
  }
}]);

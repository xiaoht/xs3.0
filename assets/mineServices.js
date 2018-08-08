//获取个人中心小红点订单数量显示
makerApp.factory('mineServices',['$http','UrlService',function($http, UrlService){
  return {
    getMineInfo:function(param){
      return $http.get(UrlService.urls.mine_url,param).then(function (object) {
        return object.data;
      });
    },
    getMineNum:function(param){
      param = {params:param};
      return $http.get(UrlService.urls.mine_num_url,param).then(function (object) {
        return object.data;
      });
    },
    loginOutInfo:function(param){
      return $http.get(UrlService.urls.logout_url+'?userId='+param.user_id,param).then(function (object) {//UrlService.urls.mine_outLogin_url
        return object.data;
      });
    }
  };
}]);

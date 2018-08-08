//拉去秒杀时间信息
makerApp.factory('seckillServices', ['$http', 'UrlService', function ($http, UrlService) {

  var myUrl1 = 'data/seckill_info.json';
  var myUrl2 = 'data/seckill_list.json';

  return {
    /** 获取秒杀基本信息 */
    getActivityInof: function (param) {
      return $http.post(UrlService.urls.scKillpromotion_url, param).then(function (object) {
        return object.data;
      });
    },

    getSeckillInfo: function (param) {
      return $http.post(myUrl1, param).then(function (object) {
        return object.data;
      });
    },

    getSeckillList: function (param, pId) {
      params = {'pId': pId};
      return $http.post(myUrl2, {params: params}).then(function (object) {
        return object.data;
      });
    }
  };
}]);

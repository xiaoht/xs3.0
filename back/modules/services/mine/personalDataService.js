/**
 * 登录
 * 丁景元
 */
//登录用户校验
makerApp.factory('personalDataService', ['$http', 'UrlService', function ($http, UrlService) {
  return {
    updatePassword: function (addData) {
      return $http.post(UrlService.urls.mine_update_password_url,addData).then(function (object) {
        var data = object.data;
        return data;
      })
    },
    /** 上传头像 */
    upLoadHeadImg: function (addData) {
      console.log(addData);
      return $http.post(UrlService.urls.upLoad_headImg_url,addData).then(function (object) {
        var data = object.data;
        return data;
      })
    }
  }
}]);

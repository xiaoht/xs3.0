//消息列表
makerApp.factory('commonHttp', ['$http', 'UrlService', function ($http, UrlService) {
	return {
		post: function (url,addData) {
			return $http.post(url,addData).then(function (object) {
					var data = object.data;
					return data;
				});
		},
    get: function (url) {
      return $http.post(url).then(function (object) {
        var data = object.data;
        return data;
      });
    }
	}
}]);

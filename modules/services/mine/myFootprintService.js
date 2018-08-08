
//登录用户校验
makerApp.factory('myFootprintService', ['$http', 'UrlService', function ($http, UrlService) {
	return {
		getMyFootprintData: function (addData) {
			return $http.post(UrlService.urls.select_myFootprint_url,addData).then(function (object) {
					data = object.data;
					return data;
				});
		},
    deleteAll: function (addData) {
      return $http.post(UrlService.urls.deleteAll_myFootprint_url,addData).then(function (object) {
        data = object.data;
        return data;
      });
    }
	}
}]);

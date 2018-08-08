/**
 * 分类页
 */

//分类服务   https://192.168.103.218/sc/list?pId=11 接口地址 pid爲父id
makerApp.factory('categoryServices', ['$http', 'UrlService', function ($http, UrlService) {
    //获取一级分类
    return {
        getFirstTypeList: function (param) {
            //得到一级列表参数写在地址栏后面
            return $http.post(UrlService.urls.get_first_type_url, param).then(function (object) {
                return object.data;
            });
        },
        getSecondStoreCatList: function (param) {
            //获取店铺二级分类列表
            return $http.post(UrlService.urls.select_second_store_cat_list, param).then(function (object) {
                return object.data;
            });
        }
    };
}]);

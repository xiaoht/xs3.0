//拉去商铺页面轮播图
makerApp.factory('storeServices', ['$http', 'UrlService', function ($http, UrlService) {

    //var myUrl2 = 'data/store_commodity.json';
    var url = UrlService.urls.findPageLayoutDataListBySubsystemIdAndPageIdAndStoreId_url; //获取装修信息
    var url_cllect = UrlService.urls.url_cllect;// 'https://172.16.63.39:8085/check_unfavorite_shop.ajax';
    //var url = 'data/storezhaungxiu.json'; //店铺装修信息假数据
    return {
        getStoreInfo: function (param) {
            return $http.post(UrlService.urls.store_info_url, param).then(function (object) {
                return object.data;
            });
        },

        getStoreGoolsList: function (param) {
            return $http.post(url, param).then(function (object) {
                return object.data;
            });
        },
        getStoreGoodsCllect: function (param) {
            return $http.post(url_cllect, param).then(function (object) {
                return object.data;
            });
        },
        //获取店铺微信号
        getStoreWxNumber: function (param) {
            return $http.post(UrlService.urls.store_wx_number, param).then(function (object) {
                return object.data;
            });
        },
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

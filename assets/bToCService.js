
makerApp.factory('bToCService',['$http','UrlService',function($http, UrlService){
    return {
        changePassword:function(param){
            return $http.get(UrlService.urls.change_password_url,param).then(function (object) {
                return object.data;
            });
        },
        checkOldMobile:function (param) {
            return $http.get(UrlService.urls.check_old_mobile_url,param).then(function (object) {
                return object.data;
            });
        },
        bindMobile:function (param) {
            return $http.get(UrlService.urls.bind_mobile_url,param).then(function (object) {
                return object.data;
            });
        },
        getVeriCode:function (param) {
            return $http.get(UrlService.urls.get_vericode_url,param).then(function (object) {
                return object.data;
            });
        },
        checkUserOrMobile:function (param) {
            return $http.get(UrlService.urls.checkUser_url,param).then(function (object) {
                return object.data;
            });
        },
        getAuthMail:function (param) {
            return $http.get(UrlService.urls.get_authmail_url,param).then(function (object) {
                return object.data;
            });
        },
        getNewConllectionList:function (param) {
            return $http.get(UrlService.urls.get_newcollection_url,param).then(function (object) {
                return object.data;
            });
        },
        addDeleteNewConllection:function (param) {
            return $http.get(UrlService.urls.add_delete_newcollection_url,param).then(function (object) {
                return object.data;
            });
        },
        getFocusList:function (param) {
            return $http.get(UrlService.urls.get_focusProduct_url,param).then(function (object) {
                return object.data;
            });
        },
        addDeleteMyFocus:function (param) {
            return $http.get(UrlService.urls.add_delete_focusProduct_url,param).then(function (object) {
                return object.data;
            });
        },
        updateUserInfo:function (param) {
            return $http.get(UrlService.urls.update_personal_infomation_url,param).then(function (object) {
                return object.data;
            });
        },
        getFirstLevelCategory:function () {
            return $http.get(UrlService.urls.get_first_level_url).then(function (object) {
                return object.data;
            });
        },
        getSecondLevelCategory:function (param) {
            param = {'params':param};
            return $http.get(UrlService.urls.get_second_level_url,param).then(function (object) {
                return object.data;
            });
        },
        getThirdLevelCategory:function (param) {
            return $http.get(UrlService.urls.get_polular_brand_url,param).then(function (object) {
                return object.data;
            });
        },
        verifyPassword:function (param) {
            return $http.get(UrlService.urls.verify_password_url,param).then(function (object) {
                return object.data;
            });
        },
        getHomeCarouselImg:function (param) {
            return $http.get(UrlService.urls.get_home_carousel_url,param).then(function (object) {
                return object.data;
            });
        },
        getHomeColoum:function () {
            return $http.get(UrlService.urls.get_home_columns_url).then(function (object) {
                return object.data;
            });
        },
        getEverydayNewList:function () {
            return $http.get(UrlService.urls.get_home_newday_url).then(function (object) {
                return object.data;
            });
        },
        getHomeHotActivities:function (param) {
            return $http.get(UrlService.urls.get_home_activities_url,param).then(function (object) {
                return object.data;
            });
        },
        getHomeRecommendList:function (param) {
            return $http.get(UrlService.urls.get_home_recommend_url,param).success(function (object) {
                return object.data;
            });
        },
        getCommonActivityList:function (param) {
            return $http.get(UrlService.urls.get_activities_common_url,param).then(function (object) {
                return object.data;
            });
        },
        getTimeLimitActivityList:function () {
            return $http.get(UrlService.urls.get_activities_timelimit_url).then(function (object) {
                return object.data;
            });
        },
        getHZHotGoods:function (param) {
            return $http.get(UrlService.urls.get_home_hot_sale_url,param).then(function (object) {
                return object.data;
            })
        },
        getHZNewGoods:function (param) {
            return $http.get(UrlService.urls.get_home_newgoods_url,param).then(function (object) {
                return object.data;
            })
        },
        getHZHotBrands:function (param) {
            return $http.get(UrlService.urls.get_home_hot_brand_url,param).then(function (object) {
                return object.data;
            })
        },
        gethotSearch:function (param) {
            return $http.get(UrlService.urls.gethotSearch,param).then(function (object) {
                return object.data;
            })
        },
        getGoodDetail:function (param) {
            return $http.get(UrlService.urls.getGoodDetail,param).then(function (object) {
                return object.data;
            })
        },
        addEvaluate:function (param) {
            return $http.get(UrlService.urls.addEvaluate,param).then(function (object) {
                return object.data;
            })
        },

    };
}]);
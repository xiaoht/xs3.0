/**
 * 本地存取服务
 */
makerApp.factory('$localStorage', ['$window', function ($window) {
    return {
        set: function (key, value) {
            $window.localStorage[key] = value;
        },
        get: function (key, defaultValue) {
            return $window.localStorage[key] || defaultValue;
        },
        setObject: function (key, value) {
            $window.localStorage[key] = JSON.stringify(value);
        },
        getObject: function (key) {
            return JSON.parse($window.localStorage[key] || '{}');
        }
    }
}]);

/**
 * md5加密方法
 */
makerApp.factory('MD5Util', [function () {
    return {
        //获取MD5加密
        getMd5: function (val) {
            return $.md5(val);
        }
    }
}]);

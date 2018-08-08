/**
 * 加载器组件
 */
makerApp.factory('loadingUtil', ['$ionicLoading', function ($ionicLoading) {
    var content = '';
    return {
        /**
         * options，类型：object，可用的值如下：
         * --{string=}，template 显示的html内容
         * --{string=}，加载的html的url
         * --{boolean=}，noBackDrop，是否显示后台页面，默认是显示
         * --{number=},delay,延时多长时间再显示这个loading,默认无延迟
         * --{number=}，duration，显示多长时间后隐藏loading层，默认一直显示，直到调用hide方法
         *
         */
        show: function () {
            $ionicLoading.show({template: '加载中,请稍后。',duration : 10000})
        },
        showLoading: function (content) {
            $ionicLoading.show({template : content});
        },
        hide: function () {
            $ionicLoading.hide()
        },
        showDefinded: function (content) {
            $ionicLoading.show({template : content,duration:1000});
        }

    }
}]);

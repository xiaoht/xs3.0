
var makerApp = angular.module('starter', ['ionic', 'ngFileUpload', 'ng-file-model','ngIOS9UIWebViewPatch']);
makerApp.run(['$ionicPlatform', '$rootScope', '$interval', 'userService','popupAlertUtil','$ionicModal',
    function ($ionicPlatform, $rootScope, $interval, userService,popupAlertUtil,$ionicModal) {
        $ionicPlatform.ready(function () {
            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);
            }
            if (window.StatusBar) {
                StatusBar.styleLightContent();
            }
        });

        //获取设备屏幕的宽度和高度
        $rootScope.deviceWidth = document.body.clientWidth;
        $rootScope.deviceHeight = document.body.clientHeight;
    }]);

makerApp.config(['$stateProvider', '$urlRouterProvider', '$ionicConfigProvider', '$httpProvider',
    function ($stateProvider, $urlRouterProvider, $ionicConfigProvider, $httpProvider) {
        $ionicConfigProvider.tabs.position('bottom');
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
        $httpProvider.defaults.headers.post['Api-Version'] = '1.0';
        $httpProvider.defaults.transformRequest = function(obj){
            var str = [];
            for(var p in obj){
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            }
            return str.join("&");
        };

        $stateProvider

            .state('home', {
                url: '/home/:type/:random',
                templateUrl: 'modules/views/home/home.html',
                controller: 'homeController'
            })

            .state('category', {
                url: '/category/:firstCategory',
                templateUrl: 'modules/views/commodity/category.html',
                controller: 'categoryController'
            })

            .state('mine', {
                url: '/mine',
                templateUrl: 'modules/views/mine/mine.html',
                controller: 'mineCtrl'
            })

            .state('active', {
                url: '/active',
                templateUrl: 'modules/views/HTML/activity/active_list_ceshi.html',
                controller: 'activeListCtrl'
            })

            //我的足迹
            .state('myFootprint', {
                url: '/myFootprint',
                templateUrl: 'modules/views/mine/myFootprint.html',
                controller: 'myFootprintController'
            })

            //   获取新的收藏列表        -------------------------------------------------------------------------------------------
            .state('newConllectionViews', {
                url: '/newConllectionViews',
                templateUrl: 'modules/views/mine/newconllection.html',
                controller: 'newConllectionCtrl'
            })

            //个人信息              -------------------------------------------------------------------------------------------
            .state('personalDataViews', {
                url: '/personalDataViews',
                templateUrl: 'modules/views/mine/personalDataViews.html',
                controller: 'personalDataCtrl'
            })


        $urlRouterProvider.otherwise('/home//');


        /** 网络请求拦截器 */
        /* 拦截器 拦截http请求 */
        $httpProvider.interceptors.push(function ($rootScope, $q, userService) {
            return {
                request: function (config) {
                    var patrn = /.ajax/;
                    if (patrn.exec(config.url)) {
                        /*CHG START BY 葛硕 20150820：判断是否显示加载条，noLoading为true时不显示。 默认情况：显示加载条-----*/
                        if (!config.data || (config.data && !config.data.noLoading)) {
                            $rootScope.$broadcast('loading:show');
                        }
                        /*CHG END   BY 葛硕 20150820：判断是否显示加载条，noLoading为true时不显示。 默认情况：显示加载条-----*/
                    }
                    return config;
                },
                response: function (response) {
                    var patrn = /.ajax/;
                    if (patrn.exec(response.config.url)) {
                        $rootScope.$broadcast('loading:hide');
                        if (!response.data.error) {
                            /*if(angular.equals(JSON.parse(response.data).businessErrCode,"LOGIN_OVERTIME")){
                             window.location.href="/loginViews";
                             }*/
                        }
                    }
                    /** 判断是否请求成功 */
                    if (response.data.error) {
                        console.log('接口：' + response.config.url + '请求error');
                    }

                    /** 判断是否登录 */
                    if(response.data.ret == "10003" || response.data.ret == "10007"){
                        // console.log('您尚未登录！！！！！！');
                        // localStorage.url = window.location.href;
                        // localStorage.token = "";
                        // window.location.href='modules/views/HTML/login/login.html';
                        alert('app.js '+JSON.stringify(response))
                        doLogin();
                    }
                    return response;
                },
                responseError: function (rejection) {
                    //检测网络异常
                    $rootScope.$broadcast('http-response:error', rejection);
                    $rootScope.$broadcast('loading:hide');
                    $q.reject(rejection);
                }

            }
        });
    }])
;


//事件处理
makerApp.run(['$ionicPlatform', '$rootScope', '$ionicLoading', '$location', '$ionicHistory', '$ionicPopup',
    '$state', '$ionicViewSwitcher', '$timeout',
    function ($ionicPlatform, $rootScope, $ionicLoading, $location, $ionicHistory, $ionicPopup, $state,
              $ionicViewSwitcher, $timeout) {
        // $rootScope.$on('$stateChangeStart',function(event, toState, toParams, fromState, fromParams, options){
        //
        //     localStorage.url = toState.url;
        // });
        var timeout;
        $rootScope.$on('loading:show', function () {
            /*CHG START BY 葛硕 20150820：显示ion-spinner 加载条-----------------------------------------------*/
            if ($location.path() == '/home' || $location.path() == '/message'
                || $location.path() == '/category' || $location.path() == '/shoppingCart'
                || $location.path() == '/mine') {
                //一级页面，减小ion-spinner高度，使footer部分能够点击
                $rootScope.spinnerHeight = $rootScope.deviceHeight - 44 - 50;//headerBar高度：44px;footerBar高度：50px
            } else {
                //没有footer部分的其他页面，除header以外部分都不能点击
                $rootScope.spinnerHeight = $rootScope.deviceHeight - 44;//headerBar高度：44px
            }
            $rootScope.showLoading = true;
           
        });

        $rootScope.$on('loading:hide', function () {
            $rootScope.showLoading = false;
            if (timeout) {
                $timeout.cancel(timeout);
            }
        });
        $rootScope.phone = function () {
            hybrid_app.callPhoneNumber(serviceTel);
        }
        $rootScope.headerGoHome = function () {

            $state.go("home");
        }
        $rootScope.headerClose = function () {

            hybrid_app.back();
        }
    }]);


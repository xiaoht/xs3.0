
makerApp.controller('personalDataCtrl', ['$scope', '$http', '$state', '$ionicViewSwitcher', '$ionicHistory',
    '$ionicPopup', '$interval', '$interval', 'validateCodeService', 'userService', 'personalDataService',
    'UrlService', 'popupAlertUtil', 'MD5Util','mineServices',
    function ($scope, $http, $state, $ionicViewSwitcher, $ionicHistory, $ionicPopup, $timeout, $interval,
              validateCodeService, userService, personalDataService, UrlService, popupAlertUtil, MD5Util,
              mineServices) {
        $scope.$on('$ionicView.enter',function () {
            /** 编辑个人资料 定义变量*/
            $scope.imgOnchangeFlag = 0;
            $scope.user = {
                username: '',
                headUrl: ''
            };
            var param = {
                user_id:localStorage.user_id,
                token:localStorage.token
            }
            /** 获取头像等个人信息 */
            mineServices.getMineInfo(param).then(function (data) {
                if(data.ret == '0'){
                  $scope.user.username = data.data.user_name;
                    $scope.user.headUrl = data.data.avatar;
                    $scope.isUserNameChanged = data.data.enableUserName;
                }else {
                    popupAlertUtil.p_alert_example('提示',data.desp);
                }

            });
            if ($scope.user.headUrl == '' || $scope.user.headUrl == null) {
                $scope.user.headUrl = 'img/headImgDefault.png';
            }
        });



        /** 修改个人信息 */
        $scope.updatePersonData = function () {
            console.log($scope.headModel.headImg);
            if($scope.headModel.headImg.size > 2097152){
                popupAlertUtil.p_alert_example('提示','图片太大了，最大不可超过2M');
                return;
            }
            //访问接口
            var param = {
                file: $scope.headModel.headImg.data || '',
                fileName: $scope.headModel.headImg.name || '',
                userName: $scope.user.nickName || ''
            };
            personalDataService.upLoadHeadImg(param).then(function (json) {
                console.log(json);
                if (!json.success) {
                    popupAlertUtil.p_alert_example('提示', json.resultStatusMessage);
                    return;
                }
                popupAlertUtil.p_alert_example('提示', '修改成功！').then(function (res) {
                    if (res) {
                        userService.setHeadUrl(json.result.imgUrl);
                        userService.setNickName($scope.user.nickName);
                        $scope.backButtonOnclick();
                    }
                });
            })
        };

        $scope.headModel = {
            headImg: ""
        };
        /** 上传头像 start */
        $scope.getHeadImgFile = function () {
            var uploadImg = document.getElementById("headUploadId");
            uploadImg.click();
            uploadImg.onchange = function (e) {
                $scope.imgOnchangeFlag = 1;
            }
        };
        /** 上传头像 end */

        /** 返回按钮被点击 */
        $scope.backButtonOnclick = function () {
            $state.go('mine');
        }
        //修改密码
        $scope.goChangePwd = function () {
            $state.go('changePasswordViews');
        };
        //绑定手机
        $scope.goBindMobile = function () {
            $state.go('checkOldMobileViews')
        }
        //绑定邮箱
        $scope.bindMail = function () {
            $state.go('getAuthMailViews');
        }
        //修改用户名
        $scope.goChangUsername = function () {
            if($scope.isUserNameChanged == '1'){
                popupAlertUtil.p_alert_example('提示','您已经修改过一次用户名，不能再次修改了');
                return;
            }else if($scope.isUserNameChanged == '0'){
                $state.go('changeUserNameViews');
            }
        }

    }]);

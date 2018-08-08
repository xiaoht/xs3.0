/**
 * 登录用户管理，将登录用户信息保存到本地存储
 * 丁景元
 */
makerApp.factory('userService', ['$localStorage', function ($localStorage) {
    var userIdKey = 'user_id';//用户id （id）
    var userNoKey = 'userMobile';//用户手机号码
    var userPasswordKey = 'password';//密码
    var userNickNameKey = 'nickName'; //昵称
    var userHeadUrlKey = 'headUrl';//头像地址
    var stateKey = 'state'; //状态
    var commitOrderModelKey = 'commitOrderModel'; //立即购买用的订单modole
    var uuidKey = 'uuid';
    return {
        setUuid: function (model) {            $localStorage.set(uuidKey,model);
        },
        getUuid: function () {
            return $localStorage.get(uuidKey, -1);
        },
        setCommitOrderModel: function (model) {
          $localStorage.set(commitOrderModelKey,model);
        },
        getCommitOrderModel: function () {
          return $localStorage.get(commitOrderModelKey, -1);
        },
        clearCommitOrderModel: function (){
          $localStorage.set(commitOrderModelKey, -1);
        },
        setUserInfo: function (userinfo) {
            $localStorage.set(userIdKey, userinfo.id);
            $localStorage.set(userNoKey, userinfo.username);
            $localStorage.set(userPasswordKey, userinfo.password);
            $localStorage.set(userNickNameKey, userinfo.nickName);
            $localStorage.set(userHeadUrlKey, userinfo.headUrl);
            $localStorage.set(stateKey, userinfo.state);
        },
        getUserInfo: function () {
            var id = $localStorage.get(userIdKey, -1);
            var username = $localStorage.get(userNoKey, -1);
            var password = $localStorage.get(userPasswordKey, -1);
            var nickName =  $localStorage.get(userNickNameKey, -1);
            var headUrl = $localStorage.get(userHeadUrlKey, -1);
            var state = $localStorage.get(stateKey, -1);
            var userinfo = {id: id, username: username,password: password, nickName: nickName,headUrl:headUrl, state:state};
            return userinfo;
        },
        getSession: function () {
            if($localStorage.get("token", -1) == -1){
                return false;
            }else{
                return true;
            }
        },
        setId: function (id) {
            $localStorage.set(userIdKey, id);
        },
        getId: function () {
            return $localStorage.get(userIdKey, -1);
        },
        setUsername: function (username) {
            $localStorage.set(userNoKey, username);
        },
        getUsername: function () {
            return $localStorage.get(userNoKey, -1);
        },
        setPassword: function (password) {
            $localStorage.set(userPasswordKey, password);
        },
        getPassword: function () {
            return $localStorage.get(userPasswordKey, -1);
        },
        setNickName: function (nickName) {
          $localStorage.set(userNickNameKey, nickName);
        },
        getNickName: function () {
          return $localStorage.get(userNickNameKey, -1);
        },
        setHeadUrl: function (state) {
          $localStorage.set(userHeadUrlKey, state);
        },
        getHeadUrl: function () {
          return $localStorage.get(userHeadUrlKey, -1);
        },
        setState: function (state) {
            $localStorage.set(stateKey, state);
        },
        getState: function () {
            return $localStorage.get(stateKey, -1);
        },
        clearUserInfo: function () {

            $localStorage.set(userIdKey, -1);
            $localStorage.set("token", "");
            $localStorage.set(userNoKey, -1);
            $localStorage.set(userPasswordKey, -1);
            $localStorage.set(userNickNameKey, -1);
            $localStorage.get(userHeadUrlKey, -1);
            $localStorage.set(stateKey, -1);
        }
    }
}]);

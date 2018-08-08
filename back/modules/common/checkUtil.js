/**
 * 各种种类的文本校验
 * 2015/08/31
 */
makerApp.factory('checkUtil', ['$ionicPopup', function ($ionicPopup) {
    return {
        //弹出警告对话框（进行提示）
        f_alert_test: function (alertInfo) {
            var alertPopup = $ionicPopup.alert({
                title: '提示',
                template: alertInfo
            });
        },
        //弹出警告对话框（根据对象来进行提示）
        f_alert: function (obj, alertInfo) {
            var alertPopup = $ionicPopup.alert({
                title: '提示',
                template: obj + alertInfo
            });
        },
        //判断是否为汉字
        f_check_chinese: function (obj) {
            return /^[\u4e00-\u9fa5]+$/.test(obj);
        },
        //判断是否为数字、字母或者是其组合（字母大小写均可）
        f_check_numberletter: function (obj) {
            return /^[A-Za-z0-9]+$/.test(obj);
        },
        //判断是否为实数
        f_check_float: function (obj) {
            return /^(\+|-)?\d+($|\.\d+$)/.test(obj);
        },
        //判断是否为空
        f_check_empty: function (obj) {
            return obj == null || obj == "";
        },
        //判断是否为1-10之间的数字
        f_check_numberlimit: function (obj) {
            return /^(\d(\.\d{1,2})?|10)$/.test(obj);
        },
        //检查手机号码是否正确
        f_check_mobile:function(obj){
            return /^1[34578]\d{9}$/.test(obj);
        },
        //判断是否为0-9之间的数字
        f_check_number:function(obj) {
            return /^[0-9]+$/.test(obj);
        },
        //检查输入的身份证号是否正确
        f_check_idno:function(obj){
            return /^[0-9]{17}[0-9A-Za-z]{1}$|^[0-9]{14}[0-9A-Za-z]{1}$/.test(obj);
        },
        //检查输入的电子邮箱是否正确
        f_check_email:function(obj){
            return /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(obj);
        }
    }
}]);

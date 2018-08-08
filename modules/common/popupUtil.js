
/*
 *alert
 *
 * {
 *   title: '', // String. 弹窗的标题。
 *   subTitle: '', // String (可选)。弹窗的子标题。
 *   template: '', // String (可选)。放在弹窗body内的html模板。
 *   templateUrl: '', // String (可选)。 放在弹窗body内的html模板的URL。
 *   okText: '', // String (默认: 'OK')。OK按钮的文字。
 *   okType: '', // String (默认: 'button-positive')。OK按钮的类型。
 * }
 */
makerApp.service('popupAlertUtil', ['$ionicPopup', function ($ionicPopup) {
    return {
        /*提示窗
         *显示一个带有一段信息和一个用户可以点击关闭弹窗的按钮的简单提示弹窗。
         *
         * 方法参数介绍
         * title [String] 显示标题内容 null不显示
         * subtitle [String] 显示副标题内容 null不显示
         * return res 点击确认后返回true
         *
         *ionicPopup.alert 参数列表
         * {
         *   title: '', // String. 弹窗的标题。
         *   subTitle: '', // String (可选)。弹窗的子标题。
         *   template: '', // String (可选)。放在弹窗body内的html模板。
         *   templateUrl: '', // String (可选)。 放在弹窗body内的html模板的URL。
         *   okText: '', // String (默认: 'OK')。OK按钮的文字。
         *   okType: '', // String (默认: 'button-positive')。OK按钮的类型。
         * }
         * */
        p_alert_example: function (title, subtitle) {
            var template = '';
            if (title) {
                template += '<div class="color-black-3 font-size-14">' + title + '</div>';
            }
            if (subtitle) {
                template += '<div class="color-black-6 font-size-13">' + subtitle + '</div>';
            }
            var alertPopup = $ionicPopup.alert({
                title: '提示',
                template: template,
                okText: '好的'
            });
            return alertPopup.then(function (res) {
                return res;
            });
        },

      // 弹出提示框: 内容提示
      alert_example: function (title, subtitle) {

        var template = '';
        if (title) {
          template += '<div class="color-black-3 font-size-15 padding-bottom-5">' + title + '</div>';
        }
        if (subtitle) {
          template += '<div class="color-black-6 font-size-12 text-align-l">' + subtitle + '</div>';
        }
        var alertPopup = $ionicPopup.alert({
          title: '提示',
          template: template,
          okText: '好的'
        });
        return alertPopup.then(function (res) {
          return res;
        });
      },

        /*选择窗
         *显示一个简单的带有一个取消和OK按钮的对话框弹窗。
         *如果用户点击OK按钮，就设置promise为true，如果用户点击取消按钮则为false。
         *
         * 方法参数介绍
         * title [String] 显示标题内容 null不显示
         * subtitle [String] 显示副标题内容 null不显示
         * return res 点击确认后返回true 点击取消后返回false
         *
         *ionicPopup.alert 参数列表
         * {
         *  title: '', // String. 弹窗标题。
         *  subTitle: '', // String (可选)。弹窗的副标题。
         *  template: '', // String (可选)。放在弹窗body内的html模板。
         *  templateUrl: '', // String (可选)。放在弹窗body内的一个html模板的URL。
         *  cancelText: '', // String (默认: 'Cancel')。一个取消按钮的文字。
         *  cancelType: '', // String (默认: 'button-default')。取消按钮的类型。
         *  okText: '', // String (默认: 'OK')。OK按钮的文字。
         *  okType: '', // String (默认: 'button-positive')。OK按钮的类型。
         * }
         * */
        p_confirm_popup: function (title, subtitle) {
            var template = '';
            if (title) {
                template += '<div class="color-black-3 font-size-15">' + title + '</div>';
            }
            if (subtitle) {
                template += '<div class="color-black-6 font-size-13">' + subtitle + '</div>';
            }
            var confirmPopup = $ionicPopup.confirm({
                title: '提示',
                template: template,
                cancelText: '取消',
                okText: '好的'
            });
            return confirmPopup.then(function (res) {
                return res;
            });
        }
    }
}]);

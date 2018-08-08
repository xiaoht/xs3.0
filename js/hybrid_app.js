  var hybrid_app = {};
  var ua = navigator.userAgent;
  //判断是否是融e联 ios
  hybrid_app.isRELIphone = function() {
      if (ua.indexOf('ICBCiPhoneBS') > -1) {
          return true;
      }
      return false;
  };
  //  判断是否是融e联 android
  hybrid_app.isRELAndroid = function() {
      if (ua.indexOf('ICBCAndroidBS') > -1) {
          return true;
      }
      return false;
  };
  /**
   * 检测当前浏览器是否为Android(Chrome)
   */
  hybrid_app.isAndroid = function() {
      if (ua.indexOf('Android') > -1) {
          return true;
      }
      return false;
  };
  /**
   * 检测当前浏览器是否为iPhone(Safari)
   */
  hybrid_app.isIPhone = function() {
      if (ua.indexOf('iPhone') > -1) {
          return true;
      }
      return false;
  };

  function connectWebViewJavascriptBridge(callback) {
      if (window.WebViewJavascriptBridge) {
          return callback(WebViewJavascriptBridge);
      } else {
          document.addEventListener('WebViewJavascriptBridgeReady', function() {
              callback(WebViewJavascriptBridge);
          }, false);
      }
      if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }
      window.WVJBCallbacks = [callback];
      var WVJBIframe = document.createElement('iFrame');
      WVJBIframe.style.display = 'none';
      WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
      document.documentElement.appendChild(WVJBIframe);
      setTimeout(function() { document.documentElement.removeChild(WVJBIframe) });

  }
  connectWebViewJavascriptBridge(function(bridge) {
      bridge.init();
      bridge.registerHandler("callback", callback)
  });

  var ICBCBridge = {
      callHandler: function(name, params, callback) {
          connectWebViewJavascriptBridge(function(bridge) {
              bridge.callHandler(name, params, callback);
          });
      },
      send: function(params, callback) {
          connectWebViewJavascriptBridge(function(bridge) {
              bridge.send(params, callback);
          });
      }
  };
  window.ICBCBridge = ICBCBridge;

  //中途登录
  hybrid_app.merLogin = function() {
      //如果是安卓
      if (hybrid_app.isAndroid()) {
          Myutils.open("callLogin");
      } else { //ios
          window.ICBCBridge.callHandler("Myutils.open", "callLogin")
      }

  }
  //第三方显示或隐藏tabbar isShow:true显示tabbar 反之隐藏
  hybrid_app.showToolBar = function(isShow) {
      //如果是安卓
      if (hybrid_app.isAndroid()) {
          Myutils.showToolBar(isShow);
      } else { //ios
          window.ICBCBridge.callHandler("Myutils.showToolBar", isShow)
      }
  }

  //第三方返回上一级页面
  hybrid_app.back = function() {
      //如果是安卓
      if (hybrid_app.isAndroid()) {
          Myutils.back();
      } else { //ios
          window.ICBCBridge.callHandler("Myutils.back")
      }
  }
  //第三方开启定位
  hybrid_app.openGPS = function() {
      //如果是安卓
      if (hybrid_app.isAndroid()) {
          Myutils.openGPS();
      } else { //ios
          window.ICBCBridge.callHandler("Myutils.openGPS")
      }
  }
  //第三方关闭定位
  hybrid_app.closeGPS = function() {
      //如果是安卓
      if (hybrid_app.isAndroid()) {
          Myutils.closeGPS();
      } else { //ios
          window.ICBCBridge.callHandler("Myutils.closeGPS")
      }
  }

  //第三方获取定位  参数是回调的函数名的字符串
  hybrid_app.getMyLocation = function(getGps) {
      //如果是安卓
      if (hybrid_app.isAndroid()) {
          Myutils.getMyLocation(getGps);
      } else { //ios
          window.ICBCBridge.callHandler("Myutils.getMyLocation", getGps)
      }
  }


  //第三方打电话功能  参数是电话号
  hybrid_app.callPhoneNumber = function(tel) {
      //如果是安卓
      if (hybrid_app.isAndroid()) {
          Myutils.callPhoneNumber(tel);
      } else { //ios
          window.ICBCBridge.callHandler("Myutils.callPhoneNumber", tel)
      }
  }

  // 第三方分享
  hybrid_app.share = function(shareInfo) {
      if (hybrid_app.isAndroid()) {
          Myutils.share(shareInfo);
      } else {
          window.ICBCBridge.callHandler("Myutils.share", hybrid_app.base64Encode(shareInfo));
      }
  }

  hybrid_app.base64Encode = function(str) {
      _utf8_encode = function(string) {
          string = string.replace(/\r\n/g, "\n");
          var utftext = "";
          for (var n = 0; n < string.length; n++) {
              var c = string.charCodeAt(n);
              if (c < 128) {
                  utftext += String.fromCharCode(c);
              } else if ((c > 127) && (c < 2048)) {
                  utftext += String.fromCharCode((c >> 6) | 192);
                  utftext += String.fromCharCode((c & 63) | 128);
              } else {
                  utftext += String.fromCharCode((c >> 12) | 224);
                  utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                  utftext += String.fromCharCode((c & 63) | 128);
              }
          }
          return utftext;
      };

      _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
      var output = "";
      var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
      var i = 0;
      str = _utf8_encode(str);
      while (i < str.length) {
          chr1 = str.charCodeAt(i++);
          chr2 = str.charCodeAt(i++);
          chr3 = str.charCodeAt(i++);
          enc1 = chr1 >> 2;
          enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
          enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
          enc4 = chr3 & 63;
          if (isNaN(chr2)) {
              enc3 = enc4 = 64;
          } else if (isNaN(chr3)) {
              enc4 = 64;
          }
          output = output +
              _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
              _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
      }
      return output;
  };

  //中途登录的回调
  function callLogin(param) {

  }

  //获取定位信息的回调
  function getGps(param) {

  }
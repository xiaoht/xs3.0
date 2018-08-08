$(function() {
    var paramDic = getUrlString();
    var back = document.getElementById("backapp");
    var wchartPay = document.getElementById("wchartPay");
    var alipayPay = document.getElementById("alipayPay");
    var orderPay = document.getElementById("orderPay");
    var type = paramDic["type"];
    var user_id = paramDic["user_id"];
    var token = paramDic["token"];
    var pay_way = paramDic["pay_way"];
    var order_id = paramDic["order_id"];
    var stages = paramDic["stages"];
    localStorage.setItem("wxOrderId66", order_id);
    localStorage.setItem("wxUser_id", user_id);
    localStorage.setItem("wxToken", token);
    var pay_price = paramDic["order_price"];

    if (!pay_price) {
        pay_price = "0.00";
    }
    localStorage.setItem("pay_price", pay_price);
    if (stages) {
        switch (stages) {
            case 'threePrice':
                $('#payPrice').html(getFq(pay_price,3));
                break;
            case 'sixPrice':
                $('#payPrice').html(getFq(pay_price, 6));
                break;
            case 'ninePrice':
                $('#payPrice').html(getFq(pay_price, 9));
                break;
            case 'twelvePrice':
                $('#payPrice').html(getFq(pay_price, 12));
                break;
            case 'eighteenPrice':
                $('#payPrice').html(getFq(pay_price, 18));
                break;
            case 'twentyFourPrice':
                $('#payPrice').html(getFq(pay_price, 24));
                break;
            case '3':
                $('#payPrice').html(getFq(pay_price, 3));
                break;
            case '6':
                $('#payPrice').html(getFq(pay_price, 6));
                break;
            case '9':
                $('#payPrice').html(getFq(pay_price, 9));
                break;
            case '12':
                $('#payPrice').html(getFq(pay_price, 12));
                break;
            case '18':
                $('#payPrice').html(getFq(pay_price, 18));
                break;
            case '24':
                $('#payPrice').html(getFq(pay_price, 24));
                break;
        }
    } else {
        $('#payPrice').html(pay_price);
    }

    var code = paramDic["code"];
    if (code) {
        // openidByCode(code);
    };
    /*分期算法 */
    function getFq(money, num) {
        if (money) {
            if ((money / num) % 1 === 0) {
                return "￥" + money / num + "×" + num + "期</li>"
            } else {
                return "首期￥" + (money - Math.floor(money / num) * (num - 1)) + "，后续￥" + Math.floor(money / num) + '*' + (num - 1) + '期'
            }
        } else {
            return ''
        }
    }
    // 返回
    back.onclick = function() {
        if (type == "ios") {
            // window.location.href="ios://back";
            window.location.href = localStorage.orderSubmit_Url;
        } else if (type == "Android") {
            window.location.href = localStorage.orderSubmit_Url + "&back=yes";
        } else {
            window.location.href = "/modules/views/HTML/order/orderList.html";
        }
    };
    var flag = 0;
    //单选
    if (isWeiXin()) {
        alipayPay.style.display = 'none';
    }
    getChecked('.container div');
    // 订单支付
    // wchartPay.onclick = function(){
    //   $("#orderPayvalue").val("0");
    //   $("#orderPay").removeClass("gray");
    //   flag = 1;
    //   localStorage.setItem("pay_way","0");
    // };
    // alipayPay.onclick = function(){
    $("#orderPayvalue").val("1");
    $("#orderPay").removeClass("gray");
    flag = 2;
    localStorage.setItem("pay_way", "1");
    // };
    orderPay.onclick = function() {
        // window.location.href = "/modules/views/HTML/order/orderPay_suc.html?order_id="+order_id+"&order_price="+pay_price;
        if ($("#orderPay").hasClass("gray")) {
            return false;
        } else {
            addLoading();
            var paywayval = $("#orderPayvalue").val();

            //支付宝ht5code
            if (paramDic["user_id"] && paramDic["token"]) {
                var urlHeader = ajaxLink + "order/payEGateway.ajax";
                var dataParam = "user_id=" + paramDic["user_id"] + "&token=" + paramDic["token"] + "&order_id=" + order_id;

                function sucPrepay(response) {
                    if (response.ret == 0) {
                        // var data = response.data;
                        // localStorage.setItem("wxOrderId",data.out_trade_no);
                        // localStorage.setItem("pay_price",data.total_fee);
                        // // var ALIPAY_GATEWAY_NEW = "https://mapi.alipay.com/gateway.do?";
                        // var Method = "post";
                        // var sbHtml = "<form id=\"alipaysubmit\" name=\"alipaysubmit\" action=\"" + ALIPAY_GATEWAY_NEW + "_input_charset=" + data._input_charset + "\" method=\"" + Method + "\">";
                        // for (var i in data) {
                        //     var value = data[i];
                        //     sbHtml += "<input type=\"hidden\" name=\"" + i + "\" value=\"" + value + "\"/>";
                        // };
                        // sbHtml += "<input type=\"submit\" value=\"" + "确认" + "\" style=\"display:none;\"></form>";

                        $("body").html(response.data);
                        removeLoading();
                        // document.forms['alipaysubmit'].submit();
                    } else {
                        removeLoading();
                        getTips(response.desp);
                    }
                }
                //调用ajax
                ajaxWithHeader(urlHeader, dataParam, sucPrepay);
            }


        }
    };

    function openidByCode(code) {
        var urlHeader = ajaxLink + "authorize/get_wx_open_id.ajax";
        var dataParam = "code=" + code;
        // 获取请求成功回调函数
        function sucResultFunc(response) {
            if (response.ret == 0) {
                var data = response.data;
                var openid = data.openid;
                localStorage.setItem("wxopenId", openid);
                wxpay(openid);
            } else {
                removeLoading();
                getTips(response.desp);
            }
        }
        // 调用Ajax
        ajaxWithHeader(urlHeader, dataParam, sucResultFunc);
    };

    function wxpay(openId) {
        var user_id = localStorage.getItem("wxUser_id");
        var token = localStorage.getItem("wxToken");
        var orderId = localStorage.getItem("wxOrderId66");
        var urlHeader = ajaxLink + "order/payWechatJsApiGateway.ajax";
        var dataParam = "user_id=" + user_id + "&token=" + token + "&order_id=" + orderId + "&open_id=" + openId;
        // 获取请求成功回调函数
        function sucResultFunc(response) {
            console.log(response);
            if (response.ret == 0) {
                var data = response.data;
                localStorage.setItem("wxOrderId", data.out_trade_no);
                localStorage.setItem("pay_price", data.total_fee);
                pay(data);
            } else {
                removeLoading();
                getTips(response.desp);
            }
        }
        // 调用Ajax
        ajaxWithHeader(urlHeader, dataParam, sucResultFunc);
    };

    var wxdata = {};

    function pay(data) {
        wxdata = data;
        if (typeof WeixinJSBridge == "undefined") {
            if (document.addEventListener) {
                document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
            } else if (document.attachEvent) {
                document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
                document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
            }
        } else {
            onBridgeReady(data);
        };
    }

    function onBridgeReady(data) {
        data = wxdata;
        var appId = data.appId,
            nonceStr = data.nonceStr,
            packageStr = data.packageStr,
            paySign = data.paySign,
            signType = data.signType,
            timeStamp = data.timeStamp;
        WeixinJSBridge.invoke(
            'getBrandWCPayRequest', {
                "appId": appId, //公众号名称，由商户传入
                "timeStamp": timeStamp, //时间戳，自1970年以来的秒数
                "nonceStr": nonceStr, //随机串
                "package": packageStr,
                "signType": signType, //微信签名方式：
                "paySign": paySign //微信签名
            },
            function(res) {
                if (res.err_msg == "get_brand_wcpay_request:ok") {
                    wxpaysuc();
                } // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
            }
        );
    };

    function wxpaysuc() {
        var user_id = localStorage.getItem("wxUser_id");
        var token = localStorage.getItem("wxToken");
        var order_id = localStorage.getItem("wxOrderId");
        var pay_way = localStorage.getItem("pay_way");
        var pay_price = localStorage.getItem("pay_price");
        removeLoading();
        window.location.href = 'orderPay_suc.html?user_id=' + user_id + '&token=' + token + '&order_id=' + order_id + '&pay_way=' + pay_way + '&order_price=' + pay_price;
    };
});
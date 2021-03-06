// 定义接口版本
var loginApi = 'v1/site/login';
var ajaxLink = 'https://api.xsbuy.cn/'
var ajaxVersion = [
    {
        url: ajaxLink + 'login',
        version: '2.0'
    },{
        url: ajaxLink + 'third_login',
        version: '1.0'
    },{
        url: ajaxLink + 'register/register',
        version: '1.0'
    },{
        url: ajaxLink + 'register/get_auth_code',
        version: '1.0'
    },{
        url: ajaxLink + 'register/check_user',
        version: '1.0'
    },{
        url: ajaxLink + 'register/get_reset_password_auth_mail',
        version: '1.0'
    },{
        url: ajaxLink + 'register/reset_password',
        version: '1.0'
    },{
        url: ajaxLink + 'authorize/get_wx_open_id',
        version: '1.0'
    },{
        url: ajaxLink + 'goods/get_goods_details',
        version: '2.0'
    },{
        url: ajaxLink + 'goods/get_item_details',
        version: '1.0'
    },{
        url: ajaxLink + 'goods/get_goods_standard',
        version: '1.0'
    },{
        url: ajaxLink + 'goods/get_goods_introduce',
        version: '1.0'
    },{
        url: ajaxLink + 'goods/get_brand_details',
        version: '1.0'
    },{
        url: ajaxLink + 'goods/get_details_recommend',
        version: '1.0'
    },{
        url: ajaxLink + 'goods/get_brand_goods',
        version: '1.0'
    },{
        url: ajaxLink + 'v1/cart/add',
        version: '1.0'
    },{
        url: ajaxLink + 'cart/del',
        version: '1.0'
    },{
        url: ajaxLink + 'cart/edit_goods_num',
        version: '1.0'
    },{
        url: ajaxLink + 'cart/edit_goods_select',
        version: '1.0'
    },{
        url: ajaxLink + 'cart/list',
        version: '1.0'
    },{
        url: ajaxLink + 'cart/calcGoodsCarriage',
        version: '1.0'
    },{
        url: ajaxLink + 'cart/get_cart_recommend',
        version: '1.0'
    },{
        url: ajaxLink + 'order/content',
        version: '1.0'
    },{
        url: ajaxLink + 'order/createOrder',
        version: '1.0'
    },{
        url: ajaxLink + 'order/payGateway',
        version: '1.0'
    },{
        url: ajaxLink + 'order/weixin_app_pay',
        version: '1.0'
    },{
        url: ajaxLink + 'order/weixin_html_pay',
        version: '1.0'
    },{
        url: ajaxLink + 'order/pay_query',
        version: '1.0'
    },{
        url: ajaxLink + 'order/logistics',
        version: '1.0'
    },{
        url: ajaxLink + 'order/get_order_list',
        version: '1.0'
    },{
        url: ajaxLink + 'order/cancel_order',
        version: '1.0'
    },{
        url: ajaxLink + 'order/reminder_delivery',
        version: '1.0'
    },{
        url: ajaxLink + 'order/reminder',
        version: '1.0'
    },{
        url: ajaxLink + 'order/affirm_receive',
        version: '1.0'
    },{
        url: ajaxLink + 'order/get_order_details',
        version: '1.0'
    },{
        url: ajaxLink + 'order/get_order_list_num',
        version: '1.0'
    },{
        url: ajaxLink + 'order/get_order_info',
        version: '1.0'
    },{
        url: ajaxLink + 'order/delete_order',
        version: '1.0'
    },{
        url: ajaxLink + 'apply/apply_aftersale_submit',
        version: '1.0'
    },{
        url: ajaxLink + 'apply/apply_aftersale_submit_0',
        version: '1.0'
    },{
        url: ajaxLink + 'apply/apply_aftersale_revise',
        version: '1.0'
    },{
        url: ajaxLink + 'apply/apply_aftersale_cancel',
        version: '1.0'
    },{
        url: ajaxLink + 'apply/get_apply_aftersale_record',
        version: '1.0'
    },{
        url: ajaxLink + 'apply/apply_aftersale_logistic_submit',
        version: '1.0'
    },{
        url: ajaxLink + 'apply/apply_aftersale_logistic_revise',
        version: '1.0'
    },{
        url: ajaxLink + 'apply/get_apply_detail',
        version: '1.0'
    },{
        url: ajaxLink + 'address/add',
        version: '1.0'
    },{
        url: ajaxLink + 'address/del',
        version: '1.0'
    },{
        url: ajaxLink + 'address/edit',
        version: '1.0'
    },{
        url: ajaxLink + 'address/list',
        version: '1.0'
    },{
        url: ajaxLink + 'address/default',
        version: '1.0'
    },{
        url: ajaxLink + 'address/get_arealist',
        version: '1.0'
    },{
        url: ajaxLink + 'evaluate/get_evaluate_details',
        version: '1.0'
    },{
        url: ajaxLink + 'member/get_my_coupon_list',
        version: '1.0'
    },{
        url: ajaxLink + 'member/get_all_coupon_list',
        version: '1.0'
    },{
        url: ajaxLink + 'member/receive_coupon',
        version: '1.0'
    },{
        url: ajaxLink + 'activities/get_activities_timebucket',
        version: '1.0'
    },{
        url: ajaxLink + 'activities/get_activities_timelimit_goods',
        version: '1.0'
    },{
        url: ajaxLink + 'activities/get_hot_activities_pic_columns',
        version: '1.0'
    },{
        url: ajaxLink + 'activities/get_common_activities_goods',
        version: '1.0'
    },{
        url: ajaxLink + 'order/payH5Gateway',
        version: '1.0'
    },{
        url: ajaxLink + 'check_event_right',
        version: '1.0'
    }
];

// 构建请求头部内容
function setHeader(request, urlHeader, dataParam){ 
    // 生成8位随机数方法
    function generateMixed(n) {
       var res = "";
       var chars = ['0','1','2','3','4','5','6','7','8','9'];
       for(var i = 0; i < n ; i ++) {
           var id = Math.ceil(Math.random()*9);
           res += chars[id];
       }
       return res;
    }
    // 获取约定秘钥
    var secret = "w4drfrzyk541xda6i0o75y7eefhjuuaj";
    //获取客户端当前时间戳...
    var TimeStamp = new Date().getTime();
    //获取随机字符串...
    var Nonce = generateMixed(8);
    //接口版本号
    var ApiVersion = "1.0";
    var urlHeader = urlHeader;
    for(var i=0; i<ajaxVersion.length; i++){
        if(urlHeader == ajaxVersion[i].url) {
            ApiVersion = ajaxVersion[i].version;
            break;
        } 
    }
    console.log(ApiVersion);
    //获取客户端类型...
    var ClientType = 3;
    //获取客户端操作系统
    var paramDicAjax = getUrlString();
    var ClientOS;
    if(paramDicAjax["type"]=="ios"){
      ClientOS = 2;
    } else if(paramDicAjax["type"]=="Android") {
      ClientOS = 1;
    } else {
      ClientOS = 3;
    }
    // 创建参数表  
    var param = {};  
        param["timestamp"] = TimeStamp;  
        param["nonce"] = Nonce;  
        param["api-version"] = ApiVersion;  
        param["client-type"] = ClientType;  
        param["client-os"] = ClientOS;  
        param["sign-method"] = "HMAC-SHA1";  
    
    // 对参数名进行字典排序  
    var array = new Array();  
    for(var key in param) {  
      array.push(key);  
    }  
    array.sort(); 
    // 拼接成key=value&形式  
    var paramArray = new Array();  
    for(var index in array) {  
      var key = array[index];  
      paramArray.push(key + "=" + param[key] + "&");  
    }  
    // 判断入参是否为空
    if (dataParam == '') {
        var dataParamLast = paramArray[paramArray.length-1];
        dataParamLast = dataParamLast.substring(0,dataParamLast.length-1);
        paramArray[paramArray.length-1] = dataParamLast;
    } else { 
        paramArray.push(dataParam); 
    }

    //URL编码
    var sourceStr='';
    for(var i=0;i<paramArray.length;i++){
        sourceStr = sourceStr+paramArray[i]
    }
    sourceStr = encodeURIComponent(sourceStr); 
    sourceStr = sourceStr.replace(/%20/g,"+"); 
    
    //加密
    var sign = rstr_hmac_sha1(secret + "&", sourceStr).toString();

    // BASE64编码
    var signBase64 = window.btoa(sign);

    // 写入
    request.setRequestHeader("timestamp", param["timestamp"]);
    request.setRequestHeader("nonce", param["nonce"]);
    request.setRequestHeader("api-version", param["api-version"]);
    request.setRequestHeader("client-type", param["client-type"]);
    request.setRequestHeader("client-os", param["client-os"]);
    request.setRequestHeader("sign-method", param["sign-method"]);
    request.setRequestHeader("sign", signBase64);
}

// 封装
function ajaxWithHeader(urlHeader, dataParam, sucFunc,post){
    // 将请求传输字段按字典生序排列后用"&"拼接
    var dataParamJson = {};
    var dataParamArray = new Array();
    var dataParamStr = '';
    var dataParamArr = dataParam.split("&");
    if(dataParamArr!=""){
        for(var index in dataParamArr) {
            var itemArr = dataParamArr[index].split("=");
            dataParamJson[itemArr[0]]=itemArr[1];
        }
        for(var key in dataParamJson) {  
          dataParamArray.push(key);  
        }  
        dataParamArray.sort();   
        for(var index in dataParamArray) {  
          var key = dataParamArray[index]; 
          dataParamStrItem = key + "=" + dataParamJson[key] + "&"
          dataParamStr += dataParamStrItem;
        }  
        dataParamStr = dataParamStr.substring(0,dataParamStr.length-1);
    } else {
        dataParamStr == "";
    }
    console.log('urlHeader = "' + urlHeader + '"');
    console.log('DATA = "' + dataParamStr + '"');
    // alert(urlHeader)
    // alert(dataParamStr)
    $.ajax({
        type: post || "GET",
        url: urlHeader,
        contentType: "application/x-www-form-urlencoded",
        // contentType: "multipart/form-data",
        // data: JSON.stringify(dataParamJson),
        data: dataParamStr,
        dateType:"json",
        crossDomain:true,
        // beforeSend: function(request){setHeader(request, urlHeader, dataParamStr)},
        success:sucFunc,
        error: sucFunc,
    });
}

// 封装（专为规格接口所用）
function ajaxWithHeaderObj(urlHeader, dataParam, sucFunc,post){
    // 将请求传输字段转成json格式
    console.log(dataParam);
    var dataParamJson = {};
    var dataParamArr = dataParam.split("&");
    var dataParamArray = new Array();
    var dataParamStr = '';
    var dataParamArr = dataParam.split("&");
    for(var index in dataParamArr) {
        var itemArr = dataParamArr[index].split("=");
        dataParamJson[itemArr[0]]=itemArr[1];
        if(itemArr[1].indexOf("[")==0 & itemArr[1].indexOf("]")==itemArr[1].length-1){
            dataParamJson[itemArr[0]] = JSON.parse(itemArr[1]);
        }
    }

    $.ajax({
        type: post || "GET",
        url: urlHeader,
        contentType: "application/x-www-form-urlencoded",
        // data: JSON.stringify(dataParamJson),
        // data: JSON.stringify(dataParamJson),
        data: dataParam,
        dateType:"json",
        // crossDomain:true,
        // beforeSend: function(request){setHeader(request, urlHeader, dataParam)},
        success:sucFunc,
        error: sucFunc,
    });
}



function callLogin(loginParams){
    // $.ajax({
    //     url:ajaxLink + "v1/site/login",
    //     type:'POST',
    //     data:{
    //         'loginParams':loginParams,
    //         'encodeURIComponent loginParams' : encodeURIComponent(loginParams)
    //     }
    // })
    var tmpLoginParams = localStorage.loginParams;
    // tmpLoginParams = 'asd';
        // alert(loginParams.substring(0,213)+"\n##############"+tmpLoginParams)
    if(loginParams.substring(0,213) == tmpLoginParams){
        return false;
    }
// alert(loginParams.substring(0,213)+"\n##############"+tmpLoginParams)
    localStorage.loginParams = loginParams.substring(0,213);

    // loginParams = encodeURIComponent(loginParams);
    // $("#test").val(loginParams);
    //  alert("登录成功："+loginParams);
    var urlHeader = ajaxLink + "v1/site/login";

    // if(localStorage.token && localStorage.token!="undefined"){
    //     urlHeader += "?user_id=" + localStorage.user_id+"&token=" + localStorage.token ;
    // }
    var dataParam = "loginParams=" + loginParams ;
    if(!hybrid_app.isRELIphone() && !hybrid_app.isRELAndroid()){
        if(urlHeader.indexOf("?")>=0){
            urlHeader += "&flag=1";
        }else{
            urlHeader += "?flag=1";
        }

    }

    // 获取请求成功回调函数
    function sucResultFunc(response) {
        // debugger;
        // alert('response');
        // alert(JSON.stringify(response));
        if (response.ret == 0) {
            var data = response.data;

            localStorage.user_id = data.user_id;
            localStorage.token = data.accessToken;
            localStorage.user_name = data.user_name;

            if (window.location.href.indexOf("/#/home") < 0) {
                setTimeout(function() {
                    window.location.reload();
                }, 500);
            } else {
                removeLoading();
            }
            // localStorage.refurbishToken = data.refurbishToken;

        } else {
            // removeLoading();
            // getTips(response.desp);
            // setTimeout(function () {
            // window.location.href = "/modules/views/HTML/error/error.html";
            // },1000);

        }
    }
    // 调用Ajax
    ajaxWithHeader(urlHeader, dataParam, sucResultFunc, "POST");
}
function doLogin(noReload) {
    // addLoading();

    // alert('现在要登录了！004');
    if(hybrid_app.isRELIphone() || hybrid_app.isRELAndroid()) {
        hybrid_app.merLogin();
    }else{
        var loginParams = {'phone':'13099439943','currentTimeMillis':'1494466036877','cust_id':'Co1z7hV167Faqkk5WIohVdhaHj+mORib','isNewUser':'0'};

        callLogin(JSON.stringify(loginParams));
    }








}


function checkLogin(){

        doLogin();
   // if (!localStorage.user_id || !localStorage.token || localStorage.token == -1 || localStorage.user_id == "undefined" || localStorage.token == "undefined") {
   //      if(doLogin != undefined){
   //          doLogin();
   //      }
   // }
}

if (window.location.href.indexOf("/#/home") > 0 ||
    window.location.href.indexOf("/orderDetail.html") > 0 ||
    window.location.href.indexOf("/orderList.html") > 0
) {
    window.onload = checkLogin();
}

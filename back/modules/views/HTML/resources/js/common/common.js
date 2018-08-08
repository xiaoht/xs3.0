
//0：生产服务器  1:测试环境 2：红旗电脑 3：明超电脑 4：磊涛电脑  5: UAT环境
var ENVIRONMENT = 0;


var urlLink = window.location.href;
var urlLinkHead = urlLink.split('//')[1];
var urlLinkHeadMid = urlLinkHead.split('/')[0];
var ajaxLink = shareLink = 'https://' + urlLinkHeadMid + '/';

/*Header：地址头
 MAIN：IP地址
 PORT：端口
 IMG：图片地址
 PAY：支付地址
 LOGIN：第三方登录地址
 COLON ：（：）符号
 SLASH：（/）符号*/
// alert(document.location.protocol);
var CDFG_IP = [
    {
        Header: '//',
        MAIN: 'ghesh.imoba.com.cn',
        PORT: '',
        IMG: 'https://img-ghesh.imoba.com.cn',
        PAY: '',
        LOGIN: '',
        COLON: ':',
        SLASH: '/'
    },
    {
        Header: '//',
        MAIN: 'gh.htwins.com.cn',
        PORT: '',
        IMG: '192.168.1.83:10000',
        PAY: '',
        LOGIN: '',
        COLON: ':',
        SLASH: '/'
    },
    {
        Header: 'https://',
        MAIN: '192.168.1.63',
        PORT: '8501',
        IMG: '192.168.1.63:10000',
        PAY: '',
        LOGIN: '',
        COLON: ':',
        SLASH: '/'
    },
    {
        Header: 'https://',
        MAIN: '192.168.1.146',
        PORT: '8082',
        IMG: '192.168.1.83:10000',
        PAY: '',
        LOGIN: '',
        COLON: ':',
        SLASH: '/'
    },
    {
        Header: 'https://',
        MAIN: '192.168.1.106',
        PORT: '8080',
        IMG: '192.168.1.63:10000',
        PAY: '',
        LOGIN: '',
        COLON: ':',
        SLASH: '/'
    },
    {
        Header: '//',
        MAIN: 'uat-ghesh.imoba.com.cn',
        PORT: '',
        IMG: 'https://uat-img-ghesh.imoba.com.cn',
        PAY: '',
        LOGIN: '',
        COLON: ':',
        SLASH: '/'
    }
];

var CUR_IP = CDFG_IP[ENVIRONMENT],
    CDFG_SERVER = CUR_IP.Header + CUR_IP.MAIN + CUR_IP.COLON + CUR_IP.PORT + CUR_IP.SLASH,//数据服务器地址
    CDFG_IP_IMAGE = CUR_IP.IMG,//图片服务器地址
    CDFG_IP_SERVER = CUR_IP.MAIN,//数据服务器地址
    CDFG_PORT_SERVER = CUR_IP.PORT,//数据服务器端口
    CDFG_IP_IMAGE_SERVER = '192.168.103.235',//图片服务器地址,
    CDFG_IP_PAY_SERVER = CUR_IP.PAY,//支付接口
    CDFG_IP_LOGIN = CUR_IP.LOGIN, //第三方登录

    CDFG_PAGE_SIZE = 10,//页码，每页多少条数据
    CDFG_WAITING_TIME = 60,//发送验证码等待时间
    CDFG_NETWORK_ERROR = '无法连接到网络';

ajaxLink=CDFG_SERVER;
var serviceTel = "021-60310465";
// alert(ajaxLink);
Loading();
//底部弹出层通用
function getMask(title, message) {
    var msgHtml = '<div class="mask">'
                + '<div class="mask-wrap">'
                + '<div class="mask-wrap-tit">'
                + '<span class="left">' + title + '</span>'
                + '<i class="right icon-progressicon_defeated"></i>'
                + '<span class="clear"></span>'
                + '</div>'
                + '<div class="mask-wrap-con">' + message + '</div>'
                + '</div>'
                + '</div>';
    //添加alert                       
    $('body').append(msgHtml);
    document.addEventListener('touchmove',touch, false);//绑定阻止滑动页面的事件
    //关闭按钮
    $('.mask-wrap-tit .icon-progressicon_defeated').click(function() {
        $(this).parents('.mask').remove();
        document.removeEventListener('touchmove',touch, false);//解除绑定
    });
}

// 确认弹出层
function getConfirm(message, btnl, btnr) {
    var msgHtml = '<div class="confirm-bg">'
                + '<div class="conrirm-wrap">'
                + '<div class="conrirm-wrap-con">'
                + '<p class="conrirm-wrap-con-txt">' + message + '</p>'
                + '</div>'
                + '<div class="confirm-btn">'
                + '<p class="confirm-btn-cancel">' + btnl + '</p>'
                + '<p class="confirm-btn-sure">' + btnr + '</p>'
                + '<p class="clear"></p>'
                + '</div>'
                + '</div>'
                + '</div>';
    //添加alert                       
    $('body').append(msgHtml);
    document.addEventListener('touchmove',touch, false);//绑定阻止滑动页面的事件
    //关闭按钮
    $('.confirm-btn-cancel').click(function() {
        $(this).parents('.confirm-bg').remove();
        document.removeEventListener('touchmove',touch, false);//解除绑定
    });
}

// 确认弹出层--单按钮
function getPopup(message, btnl,func) {
    var msgHtml = '<div class="confirm-bg">'
        + '<div class="conrirm-wrap">'
        + '<div class="conrirm-wrap-con">'
        + '<p class="conrirm-txt">' + message + '</p>'
        + '</div>'
        + '<div class="confirm-btn-ok">' + btnl + '</p>'
        + '</div>'
        + '</div>'
        + '</div>';
    //添加alert
    $('body').append(msgHtml);
    document.addEventListener('touchmove',touch, false);//绑定阻止滑动页面的事件
    //关闭按钮
    $('.confirm-btn-ok').click(function() {
        $(this).parents('.confirm-bg').remove();
        document.removeEventListener('touchmove',touch, false);//解除绑定
        if(func){
            func();
        }
    });
}
// 浮动提示信息
function getTips(message,fun) {
    clearTimeout();
    $(".tip-message").remove();
    var tipHtml = '<div class="tip-message"><p>' + message + '</p></div>';
    $('body').append(tipHtml);
    setTimeout(function(){
        $(".tip-message").remove();
    },1500);
    clearTimeout();
}


//tab切换栏通用
function liWidth() {
    var linum = $(".tab-list li").length;
    $(".tab-list li").width($(".tab-list").width()/linum);
};

//返回顶部
function goTop() {
    var gotopHtml = '<div class="m-gotop-wrap"><div class="ic-gotop"><img src="/img/arrow003.png"></div></div>';
    $('body').append(gotopHtml);
    var windowHeight = $(window).height()/2;
    $(window).scroll(function() {
        if ($(window).scrollTop() > windowHeight) {
            $('.m-gotop-wrap').css('display','block');
        } else {
            $('.m-gotop-wrap').css('display','none');
        }
    });
    $(".ic-gotop").click(function() {
        $("body").animate({
            scrollTop: '0px'
        },300);
        $(document.documentElement).animate({
            scrollTop: '0px'
        },300);
    });
};

// handerbar模板调用
function getListTemp(templateId,eleId,num){
    //templateId：模版ID   eleId：元素ID   num：商品个数
    var source = templateId.html();
    var template = Handlebars.compile(source);
    var data = {
        list: []
    };
    for (var i = 0; i < num; i++) {
        data.list.push({});
    }
    var list = template(data);
    eleId.append($(list));
}
//使用方式：getList($('#redManorRecommendId'),$('#redManorRecommendList'),5)
 

function getGoodsList(data, eleId) {
    var data = data;
    if(data == '' || data.length ==0) {
        return;
    }
    for(var i = 0; i < data.length; i++){
        var data_label1;
        var data_label2;
        var data_label3;
        if(data[i].goods_label1 == "组合") {
            data_label1 = '<span class="bot-sale zuhe"></span>';
        } else if(data[i].goods_label1 == "满减") {
            data_label1 = '<span class="bot-sale manjian"></span>';
        } else {
            data_label1 = "";
        }
        if(data[i].goods_label2 == '直降') {
            data_label2 = '<span class="bot-label zhijiang"></span>';
        } else if(data[i].goods_label2 == '热销') {
            data_label2 = '<span class="bot-label rexiao"></span>';
        } else if(data[i].goods_label2 == '新品') {
            data_label2 = '<span class="bot-label xinpin"></span>';
        } else {
            data_label2 = '';
        }
        // if(data[i].goods_label3.length > 0) {
        //     data_label3 = '<span class="orange">' + data[i].goods_label3 + '</span><span class="line icon-line"></span><span class="b-tit">' + data[i].goods_name + '</span>';
        // } else {
        //     data_label3 = '<span class="b-tit">' + data[i].goods_name + '</span>';
        // }
        data_label3 = '<span class="b-tit goods-list-goods-name">' + data[i].goods_name + '</span>';
        var attr_html;
        if(data[i].item_id && data[i].item_id.length > 0) {
            attr_html = '<div class="goods-list" data-goodsid="' + data[i].goods_id + '" data-itemid="' + data[i].item_id + '">';
        } else {
            attr_html = '<div class="goods-list" data-goodsid="' + data[i].goods_id + '">';
        }
        var listHtml=attr_html
                + '<a href="javascript:void(0);">'
                + '<div class="goods-list-img">'
                + '<img class="goods-list-img-goods" src="' + data[i].goods_img + '" onerror=this.style.display="none">'
                +  data_label2 + data_label1
                + '</div>'
                + '<p class="goods-list-tit">' + data_label3 + '</p>'
                + '<div class="goods-list-price">'
                + '<span class="curr-price">￥' + data[i].goods_price + '</span>'
                // + '<span class="market-price">￥' + data[i].goods_refer_price + '</span>'
                + '</div>'
                + '</a> '
                + '</div>';
        $(eleId).find('p.clear').before(listHtml);
    }
    $(".goods-list").width(($("body").width() - 71)/2);
    $(".goods-list .goods-list-img").height(($("body").width() - 71)/2);
    $(".goods-list").click(function(){
        var goods_id = $(this).attr('data-goodsid');
        var item_id = $(this).attr('data-itemid');
        var paramDic_goods = getUrlString();
        var user_id_goods = paramDic_goods["user_id"];
        var token_goods = paramDic_goods["token"];
        if(user_id_goods && token_goods) {
            if(item_id) {
                window.location.href="../goods/goodsDetails.html?goods_id="+goods_id+"&user_id="+user_id_goods+"&token="+token_goods+"&item_id="+item_id+'&mine=mine';
            } else {
                window.location.href="../goods/goodsDetails.html?goods_id="+goods_id+"&user_id="+user_id_goods+"&token="+token_goods+'&mine=mine';
            }
        } else {
            if(item_id) {
                window.location.href="../goods/goodsDetails.html?goods_id="+goods_id+"&item_id="+item_id+'&mine=mine';
            } else {
                window.location.href="../goods/goodsDetails.html?goods_id="+goods_id+'&mine=mine';
            }
        }
    });
}

//截取url参数
function getUrlString() {
    var urlString = window.location.href;
    var index = urlString.indexOf("?");
    var paramDicObj = {};
    //有参数
    if(index>-1) {
        var param = "";
        param = urlString.substring(index+1,urlString.lastIndex);
        var arr = param.split("&");
        for(var index in arr) {
            var itemArr = arr[index].split("=");
            paramDicObj[itemArr[0]]=itemArr[1];
        }
    }
    paramDicObj['user_id'] = localStorage.user_id;
    paramDicObj['token'] = localStorage.token;
    return paramDicObj;
}

//单选切换
function getChecked(ele){
    $(ele).click(function(){
        if($(this).find("i").hasClass('icon-radio-unchecked')){
            $(ele).find("i").removeClass('icon-check-alt').addClass('icon-radio-unchecked');
            $(this).find("i").removeClass('icon-radio-unchecked').addClass('icon-check-alt');
        }else{
            return false;
        }
    });
}
//截取url参数
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
}

// 补0方法
function getZero(i) {
    str = i < 10 ? "0" + i : i;
    return str;
}

// 换算时分秒
function count(s) {
    var day = Math.floor(s / 86400);
    var hour = Math.floor((s - day * 86400) / 3600);
    var minute = Math.floor((s - day * 86400 - hour * 3600) / 60);
    var second = s - day * 86400 - hour * 3600 - minute * 60;
    return {"day": day, "hour": hour, "minute": minute, "second": second};
}

// 登录倒计时方法
function loginCountDown(str) {
    $(".login-btn-red").text(getZero(str) + '秒后重发');
    var TimeInterval = setInterval(function () {
      if (str == 01) {
        clearInterval(TimeInterval);
        TimeInterval = null;
        $(".login-btn-red").removeClass("gray").text('重新发送');
      } else {
        str--;
        $(".login-btn-red").text(getZero(str) + '秒后重发');
      }
    }, 1000);
}

// 刷新token
function getAccessToken(userid) {
    var uid = userid;
    var urlHeader = ajaxLink + "getAccessToken.ajax";
    var dataParam = 'uid=' + uid;// + '&refurbishToken=' + localStorage.refurbishToken;
    function sucgetAccessTokenFunc(response) {
        if(response.ret == 0){
            localStorage.token = response.data;
        } else {
            getTips(response.desp);
        }
    }
    // 调用Ajax
    ajaxWithHeader(urlHeader, dataParam, sucgetAccessTokenFunc);
}

// 获取Web页面地址
function getWebUrl(index, dataPar) {

    var urlHeader = ajaxLink + "weburl/get_web_url.ajax";
    var dataParam = '';
    var dataUrl;
    function sucGetWebUrl(response) {
        if(response.ret == 0){
            for(var i=0; i<response.data.length; i++) {
                if(response.data[i].type == index) {
                    dataUrl = response.data[i].url;

                    // if(dataPar == '') {
                    //     // window.location.href = dataUrl;
                    //     window.location.href = '/modules/views/HTML/login/login.html';
                    // } else {
                    //     // window.location.href = dataUrl + '?' + dataPar;
                    //     window.location.href = '/modules/views/HTML/login/login.html' + '?' + dataPar;
                    // }
                    doLogin();
                    
                }
            }
        } else {
            getTips(response.desp);
        }
    }
    // 调用Ajax
    ajaxWithHeader(urlHeader, dataParam, sucGetWebUrl);
}


//表单验证 返回true or false
//姓名
// function valName(name){var reg = /^[\u4e00-\u9fa5]+$/; return reg.test(name);}
function valName(name){var reg = /^([A-Za-z]|[\u4E00-\u9FA5])+$/; return reg.test(name);}
//身份证
// function valIdNo(IdNo){var idcard = new clsIDCard(IdNo); return idcard.IsValid();}

// 设置身份证号码，15位或者18位
function SetCardNo(CardNo) {
    this.ID15='';
    this.ID18='';
    this.Local='';
    CardNo=CardNo.replace(" ","");
    var strCardNo;
    if(CardNo.length==18) {
        pattern= /^\d{17}(\d|x|X)$/;
        if (pattern.exec(CardNo)==null)return;
        strCardNo=CardNo.toUpperCase();
    } else {
        pattern= /^\d{15}$/;
        if (pattern.exec(CardNo)==null)return;
        strCardNo=CardNo.substr(0,6)+'19'+CardNo.substr(6,9);
        strCardNo+=this.GetVCode(strCardNo);
    }
    this.Valid=this.CheckValid(strCardNo);
}
//邮箱
function valEmail(email){var reg = /^(\w)+((\.|-|_)\w+)*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/; return reg.test(email);}
//电话号keyup
function valPhoneNum(phoneNum){var reg= /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/; return reg.test(phoneNum);}
//密码
function valPassword(password){var reg=/^[a-z0-9]{6,16}$/; return reg.test(password);}

//阻止默认行为
function touch(){
    var e = event || window.event;
    e.preventDefault && e.preventDefault();
    e.returnValue=false;
    e.stopPropagation && e.stopPropagation();
    return false;
}

// 滑动点击事件
function iScrollClick(){    
    if (/iPhone|iPad|iPod|Macintosh/i.test(navigator.userAgent)) return false;  
    if (/Chrome/i.test(navigator.userAgent)) return (/Android/i.test(navigator.userAgent)); 
    if (/Silk/i.test(navigator.userAgent)) return false;    
    if (/Android/i.test(navigator.userAgent)) {  
        var s=navigator.userAgent.substr(navigator.userAgent.indexOf('Android')+8,3);   
        return parseFloat(s[0]+s[3]) < 44 ? false : true
    }
}

// 判断是否为微信浏览器
function isWeiXin(){ 
    var ua = window.navigator.userAgent.toLowerCase(); 
    if(ua.match(/MicroMessenger/i) == 'micromessenger'){ 
        return true; 
    }else{ 
        return false; 
    } 
} 

// 获取时间戳的时间点
function getLocalTime(tm) {
    var timeStr=new Date(parseInt(tm) * 1000).toLocaleString().substr(0,16);
    var timeTxt=timeStr.split(' ')[1].charAt(0);
    var time;
    if(timeTxt=='下'){
        var timeNum=timeStr.split(' ')[1].substr(2,2);
        time=Number(timeNum)+12+timeStr.split(' ')[1].substr(4);
    }else{
        time=timeStr.split(' ')[1].substr(2);
    }
    return time
}

function sucGetToken(mode){
    getAccessToken(user_id);
    token = localStorage.token;
    mode();
}

// 时间戳换算
function getTime(str){
  var Y, M, D, H, m, S;
  var str = new Date(str);
  Y = str.getFullYear();
  M = str.getMonth();
  D = str.getDate();
  H = str.getHours();
  m = str.getMinutes();
  S = str.getSeconds();
  return getZero(Y) + '-' + getZero(M) + '-' + getZero(D) +' ' + getZero(H) + ':' + getZero(m) +':'+ getZero(S);
}

// Loading
function Loading(){
    var paramDic_goods = getUrlString();
    var type = paramDic_goods["type"];
    if(!type) {
        var load_html = '<div class="msg-loading" id="msgLoadOver"><div class="loading"><img src="/modules/views/HTML/resources/img/common/loading.png"></div></div>';
        $('body').append(load_html);
        document.addEventListener('touchmove',touch, false);
        window.onload = function(){
            $('#msgLoadOver').remove();
            document.removeEventListener('touchmove',touch, false);
        };
        setTimeout(function(){
            $('#msgLoadOver').remove();
            document.removeEventListener('touchmove',touch, false);
        }, 5000);
    }
}

function errorToken() {
    doLogin();
    // var currentUrl = window.location.href;
    // var paramDicObj = {};
    // var urlPre = currentUrl.split('?')[0]
    // var param = currentUrl.split('?')[1];
    // var arr = param.split("&");
    // var urlAft = ''
    // for(var index in arr) {
    //     var itemArr = arr[index].split("=");
    //     paramDicObj[itemArr[0]]=itemArr[1];
    // }
    // delete paramDicObj.user_id;
    // delete paramDicObj.token;
    // for(var key in paramDicObj) {
    //     var urlAft_t = key + '=' + paramDicObj[key] + '&';
    //     urlAft += urlAft_t;
    // }
    // urlAft = urlAft.substring(0, urlAft.length - 1);
    // localStorage.url = urlPre + '?' + urlAft;
    // localStorage.token = "";
    // getWebUrl('0', urlAft);
}

// 加载Loading
function addLoading(){
    if($('body').find('#msgLoad').length > 0) return;
    var load_html = '<div class="msg-loading" id="msgLoad"><div class="loading"><img src="/modules/views/HTML/resources/img/common/loading.png"></div></div>';
    $('body').append(load_html);
    document.addEventListener('touchmove',touch, false);
}

// 取消Loading
function removeLoading(){
    $('#msgLoad').remove();
    document.removeEventListener('touchmove',touch, false);
}
$("#btnCustomer").on('touchend', function(){
    window.location.href = "tel:"+serviceTel
});

var _hmt = _hmt || [];
(function() {
    var hm = document.createElement("script");
    hm.src = "https://hm.baidu.com/hm.js?93ed0e1334c3b2d4c2a036e42cfbd115";
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(hm, s);
})();
/*
var _hmt = _hmt || [];
(function() {
    var hm = document.createElement("script");
    hm.src = "https://hm.baidu.com/hm.js?6259520f802b90fc6567b37e9e85d4a4";
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(hm, s);
})();*/

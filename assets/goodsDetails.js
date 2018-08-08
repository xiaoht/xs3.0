var paramDic = getUrlString();
var type = paramDic["type"];
var user_id = paramDic["user_id"];
var token = paramDic["token"];
var share_index = paramDic["share_index"];
var goods_id = paramDic["goods_id"];
var item_inpara_id = paramDic["item_id"];
var back = document.getElementById("backapp");
$("p.eva-empty").height($(window).height() - 120);
if (!goods_id) goods_id = 'cNBup4nmmYOHqR59GzytLM2Z_kIkIvaNxjYTlGrB0HM';
var item_name;
var item_id;
var share_img;
var share_tit;
var standard_count = 10;
var standard_count_limit = 10;
var goods_taxrate;
var goods_taxrate_price;

var limitNum;
var eventSign;
if (item_inpara_id) {
    item_id = item_inpara_id;
}
if (share_index == '1') {
    $("#backapp").hide();
}
// 不是ios和安卓的客户端既分享出来的
if (!hybrid_app.isRELIphone() && !hybrid_app.isRELAndroid()) {
    $('.footer_absolute_box').show()
}
// 非客户端隐藏分享按钮
if (paramDic["type"]) {
    share.style.display = "block";
}

$(function() {
    $('#openApp').click(function() {
        //跳转下载APP
        var ua = navigator.userAgent;
        var timer;
        var downUrl = "https://a.app.qq.com/o/simple.jsp?pkgname=com.icbc.elife";

        //判断是否是融e联
        if (ua.indexOf('ICBCAndroidBS') > -1) {
            window.location.href = 'com.icbc.elife://elife'; //跳到 安卓 url scheme
            timer = window.setTimeout(function() {
                window.location.href = downUrl;
            }, 1000)
        } else if (ua.indexOf('ICBCiPhoneBS') > -1) {
            window.location.href = 'com.icbc.elife://'; //跳到ios  url scheme地址
            timer = window.setTimeout(function() {
                window.location.href = downUrl;
            }, 1000)
        } else {
            window.location.href = downUrl; //应用宝地址  
        }
    })
    // tab栏切换
    // var tablinewidth = $(".tab-line-nav").width();
    // var pwidth = $(".tab-list-nav li:eq(0) p").width();
    // var poffsetleft = $(".tab-list-nav li:eq(0) p").offset().left;
    // $(".tab-line-nav").width(pwidth + 26).css("left", poffsetleft);
    $(".tab-list-nav li").click(function() {
        $(this).addClass("active").siblings().removeClass("active");
        // var pactivewidth = $(".tab-list-nav li.active p").width();
        // var pactiveoffsetleft = $(".tab-list-nav li.active p").offset().left;
        // $(".tab-line-nav").animate({
        //     'width': pactivewidth + 26,
        //     'left': pactiveoffsetleft
        // }, 300);
        var _this = $(this).index();
        if (_this == 2) {
            $('.action-btm').hide();
        } else if (_this == 1) {
            getIntroduceImg(); //图文详情接口
            $('.action-btm').show();
        } else {
            $('.action-btm').show();
        }
        $('.wrapper').hide();
        $('.wrapper').eq(_this).show();
        liWidth();
        $(window).scrollTop(0);
    });


    getGoodsDetails(); //执行获取商品详情
    // getEvaluateRender();//商品评价方法
    // getRecommend();//获取方正推荐
    // getGuessList();//获取猜你喜欢
    // getevaluatStyle();

    // 判断购物车商品数
    if (user_id && token) {
        getCarNumLogin();
    } else {
        // doLogin();
        if (localStorage.shopping_cart) {
            if (localStorage.shopping_cart != '') {
                var shopCartList = JSON.parse(localStorage.shopping_cart);
                var shopCart_num = shopCartList.length;
                console.log(shopCart_num);
                shopCartNumCout(shopCart_num);
            } else {
                shopCartNumCout(0);
            }
        } else {
            shopCartNumCout(0);
        }
    }

    //返回顶部
    goTop();

    //评价列表切换
    // $("#evalistTit p").click(function () {
    //     var _this = $(this).index();
    //     $(this).addClass("active").siblings().removeClass("active");
    //     getEvaluateRenderUd(_this);
    // });

    // 跳转品牌详情
    // $("#brandinfoThumb").click(function(){
    //     var brand_id = $(this).attr("data-brandid");
    //     if(user_id && token){
    //         window.location.href = "../brand/brand.html?brand_id="+brand_id+"&user_id="+user_id+"&token="+token;
    //     } else {
    //         window.location.href = "../brand/brand.html?brand_id="+brand_id;
    //     }
    // });

    //计算顶部tab切换栏宽度
    liWidth();

    //商品介绍切换
    $(".tab-list li").click(function() {
        $(this).addClass("active").siblings().removeClass("active");
    });
    $(".tab-list li:eq(0)").click(function() {
        $(".details-introduction").show().siblings().hide();
    });
    $(".tab-list li:eq(1)").click(function() {
        $(".details-standard").show().siblings().hide();
    });
    $(".tab-list li:eq(2)").click(function() {
        $(".details-service").show().siblings().hide();
    });
    // $(".detailsinfo-tit").click(function () {
    //     window.location.href = "goodsDetails_intro.html";
    // });

    //数量加减点击
    $('.minus').bind('touchend', function() {
        var pNum = $('.act-sum input').val();
        if (pNum <= 1) {
            pNum = 1;
            $(this).addClass('disable');
        } else {
            pNum--;
            $('.act-sum input').val(pNum);
        }
    });
    $('.plus').bind('touchend', function() {
        var pNum = $('.act-sum input').val();
        pNum++;
        $('.act-sum input').val(pNum);
        $('.minus').removeClass('disable');
    });

    $('.phone').click(function() {
        hybrid_app.callPhoneNumber(serviceTel);
    });

    $('#share').click(function() {
        //pngUrl：分享后链接显示的图片地址
        var pngUrl = "";

        //shareUrl：分享后点击链接需要跳转的地址
        var shareUrl = shareLink + "modules/views/HTML/goods/goodsDetails.html?goods_id=" + goods_id;
        //title：分享后链接显示的标题
        var title = item_name;

        //content：分享后链接显示的内容
        var content = item_name;


        //封装需要分享的对象
        var shareInfo = {
            PNGUrl: pngUrl,
            ShareUrl: shareUrl,
            Title: title,
            Content: content
        };

        // 将对象转为字符串
        shareInfo = JSON.stringify(shareInfo);
        hybrid_app.share(shareInfo);
    });
    //点击购买事件
    $('.buy-box div').click(function() {
        document.addEventListener('touchmove', touch, false); //绑定阻止滑动页面的事件
        var that = $(this).index();
        var fqPrice = $('.dgsc-fq ul').find('.active');
        if (fqPrice.length == 0) {
            if (that == 1) {
                $('#dgscBtn').text("确定购买");
                $('#dgscBtn').css("background-color", "#e42f46");
            } else {
                $('#dgscBtn').text("确认添加");
                $('#dgscBtn').css("background-color", "#ffb946");
            }
        }

        localStorage.chosenBtn = that;
        var buyBtnText = $('#dgscBtn').text();

        $('#viewportWrap').animate({ opacity: '1' }, 500).show();
        $('#viewPort').addClass('fadeInUp').removeClass('fadeOutDown');
        $('#dgscBtn').unbind("click").on('click', function() {
            var goods_num = parseInt($(".act-sum").find("input").val());


            if (goods_num > parseInt(standard_count)) {
                getTips('购买数量已超过库存，请修改！');
                return;
            }

            fqPrice = $('.dgsc-fq ul').find('.active');
            var pandunFq = fqPrice.length > 0 && fqPrice.data('fq');
            if (standard_count_limit && goods_num > parseInt(standard_count_limit)) {
                getTips('购买数量已超过限购，请修改！');
                return;
            }

            var dgsc_p_i = $("#goodsStand").find(".dgscp-c").length;
            var dgsc_p_i_active = $("#goodsStand").find("li.active").length;
            if (dgsc_p_i != dgsc_p_i_active) {
                getTips('请选择商品属性');
                return;
            }
            if (that == 1 || pandunFq) {

                if (user_id && token) {
                    if (item_id == undefined) {
                        getTips('item_id获取失败，请稍后再试');
                        return;
                    }

                    if (limitNum && eventSign) {
                        // 如果是活动商品，立即购买-检验限购数目
                        var urlHeader = ajaxLink + "order/checkOrderLimit.ajax";
                        var dataParam = 'goodsId=' + goods_id + '&token=' + token + '&user_id=' + user_id;
                        //成功校验活动商品限购的方法
                        function sucCheckOrderLimit(response) {
                            console.log(response);
                            if (response.ret == 0) {
                                if (response.data > 0) {
                                    getTips('购买数量已超过限购，请修改！');
                                    return;
                                } else {
                                    addLoading();
                                    localStorage.addressId = '';
                                    localStorage.couponId = '';
                                    localStorage.couponTxt = '';
                                    localStorage.ticketType = '';
                                    localStorage.ticketHead = '';
                                    localStorage.ticketNo = '';
                                    localStorage.ticketEmail = '';
                                    var goods_num = parseInt($(".act-sum").find("input").val());
                                    removeLoading();
                                    localStorage.orderSubmit_index = 1;
                                    localStorage.orderSubmit_Url = window.location.href;
                                    window.location.href = "../order/orderSubmit.html?goods_id=" + goods_id + "&user_id=" + user_id + "&token=" + token + "&goods_num=" + goods_num + "&item_id=" + item_id + "&oederSubtype=2";

                                }
                            } else if (response.ret == 10009) {
                                getTips(response.desp);
                                return;
                            } else if (response.ret == 10003) {
                                errorToken();
                                return;
                            } else {
                                getTips(response.desp);
                                return;
                            }
                        }

                        //调用ajax
                        ajaxWithHeader(urlHeader, dataParam, sucCheckOrderLimit);

                    } else {

                        addLoading();
                        localStorage.addressId = '';
                        localStorage.couponId = '';
                        localStorage.couponTxt = '';
                        localStorage.ticketType = '';
                        localStorage.ticketHead = '';
                        localStorage.ticketNo = '';
                        localStorage.ticketEmail = '';
                        var goods_num = parseInt($(".act-sum").find("input").val());
                        removeLoading();
                        localStorage.orderSubmit_index = 1;
                        localStorage.orderSubmit_Url = window.location.href;
                        var stages = $('.dgsc-fq ul .active').data('fq');
                        if (stages) {
                            window.location.href = "../order/orderSubmit.html?goods_id=" + goods_id + "&user_id=" + user_id + "&token=" + token + "&goods_num=" + goods_num + "&item_id=" + item_id + "&oederSubtype=2" + "&stages=" + stages;
                        } else {
                            window.location.href = "../order/orderSubmit.html?goods_id=" + goods_id + "&user_id=" + user_id + "&token=" + token + "&goods_num=" + goods_num + "&item_id=" + item_id + "&oederSubtype=2";
                        }

                    }
                } else {
                    localStorage.url = window.location.href;
                    // window.location.href = '../login/login.html';
                    doLogin(); //
                }
            } else {
                if (user_id && token) {
                    // 如果是活动商品，购物车检验限购数目
                    if (limitNum && eventSign) {
                        checkShopCartLimit();
                    } else {
                        addShopCartLogin();
                    }

                } else {
                    addShopCartNotLogin();
                }
            }
            $('#viewPort').addClass('fadeOutDown').removeClass('fadeInUp');
            $('#viewportWrap').fadeOut();
            document.removeEventListener('touchmove', touch, false);
        });
        $('.icon-progressicon_defeated').parent('span').bind('touchend', function() {
            $('#viewPort').addClass('fadeOutDown').removeClass('fadeInUp');
            $('#viewportWrap').fadeOut();
            document.removeEventListener('touchmove', touch, false);
        });

        $('.dgsc-pc li').bind('touchend', function() {
            if ($(this).hasClass("active")) return;
            var index = $(this).parents(".dgscp-c").index();
            if (index == 0) {
                var standardObj = {};
                var standardList = [];
                standardObj.standard_cons_id = $(this).attr("data-standardconsid");
                standardObj.standard_cons_name = $(this).text();
                standardList.push(standardObj);
                console.log(standardList);
                // goodsStandardFir(JSON.stringify(standardList), index);
                goodsStandardFir(standardList, index);
                $(this).addClass('active').siblings().removeClass('active');
            } else if (index == 1) {
                if ($(".dgscp-c:eq(0)").find("li.active").length == 1) {
                    var i = $(this).index();
                    var standardObj = {};
                    var standardObj_oth = {};
                    var standardList = [];
                    standardObj.standard_cons_id = $(".dgscp-c:eq(1)").find("li.active").attr("data-standardconsid");
                    standardObj.standard_cons_name = $(".dgscp-c:eq(1)").find("li.active").text();
                    standardObj_oth.standard_cons_id = $(".dgscp-c:eq(0)").find("li.active").attr("data-standardconsid");
                    standardObj_oth.standard_cons_name = $(".dgscp-c:eq(0)").find("li.active").text();
                    standardList.push(standardObj_oth);
                    standardList.push(standardObj);
                    // goodsStandardSec(JSON.stringify(standardList), i)
                     goodsStandardSec(standardList,i);
                    $(this).addClass('active').siblings().removeClass('active');
                } else {
                    $(this).addClass('active').siblings().removeClass('active');
                }
            }
        });
    });

    //收藏点击事件
    $('#collectThu').click(function() {
        if (user_id && token) {
            addLoading();
            if ($(this).hasClass('active')) {
                getCollectThu("1");
            } else {
                getCollectThu("0");
            }
        } else {
            localStorage.url = window.location.href;
            // window.location.href = '../login/login.html';
            doLogin();
        }
    });

    // 原生返回
    back.onclick = function() {

        if (paramDic["type"] == "ios") {
            window.location.href = "ios://back";
        } else if (paramDic["type"] == "Android") {
            JSkit.back();
        } else {

            if (paramDic["mine"]) {
                window.history.back();
            } else {
                hybrid_app.back();
            }
        }
    };

    // 原生分享
    // share.onclick = function(){
    //     var shareUrl = shareLink + "goods/goodsDetails.html?goods_id=" + goods_id;
    //     var shareImg = share_img;
    //     var shareTit = share_tit;
    //     if(type == "ios"){
    //         window.location.href="ios://share?shareUrl=" + shareUrl + "&shareImg=" + shareImg + "&shareTit=" + shareTit;
    //     } else if (type == "Android") {
    //         JSkit.share(shareUrl, shareImg, shareTit);
    //     }
    // };
    goShopcart.onclick = function() {
        if (user_id && token) {
            window.location.href = "../shoppingCart/shoppingCart.html?shopcartback=1&user_id=" + user_id + "&token=" + token;
        } else {
            window.location.href = "../shoppingCart/shoppingCart.html?shopcartback=1";
        }
    };

    $(".ps-active").click(function() {
        $(this).remove();
    });
    // //评价点击事件
    // $('.eva-thumb').click(function () {
    //     $(".tab-list-nav li:eq(2)").click();
    // });

});
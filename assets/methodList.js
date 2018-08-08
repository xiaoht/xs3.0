
 var ajaxLink = 'https://api.xsbuy.cn/';
//商品详情信息
function getGoodsInfo(data) {
    // console.log(data)
    var goods_price_txt;
    // if(data.goods_activities_price == '') {
    //     alert(data.minPrice==''||data.maxPrice=='')
    //     goods_price_txt =(data.minPrice==''||data.maxPrice=='')? data.goods_price:data.minPrice+'-￥'+data.maxPrice;
    // } else {
    //     goods_price_txt = data.goods_activities_price;
    // }
    //goods_price_txt = (data.minPrice == '' || data.maxPrice == '' || data.minPrice == data.maxPrice) ? data.goods_price : data.minPrice + '0-￥' + data.maxPrice + '0';
    goods_price_txt = data.minPrice +'-￥'+data.maxPrice;
    item_name = data.goods_name;
    // share_img = data.goods_imgs[0].img_url;
    share_tit = data.goods_name;
    goods_taxrate = parseFloat(data.goods_taxrate);
    goods_taxrate_price = parseFloat(goods_price_txt);
    // standard_count = data.standard_count;
    // standard_count_limit = data.standard_count_limit;

    limitNum = data.limitNum;
    eventSign = data.eventSign;
    // if(data.standard_count_limit == '') {
    //     standard_count = data.standard_count;
    // } else {
    //     if(data.standard_count >= data.standard_count_limit) {
    //         standard_count = data.standard_count_limit;
    //     }
    // }

    // 轮播图品牌信息
    var bannerLogo_html = '<img class="left" src="' + data.brand_logo + '">' +
        '<p class="left" id="goods_name">' + data.brand_name + '</p>' +
        '<p clas="clear"></p>';
    $('#bannerLogo').html(bannerLogo_html);

    // 轮播图信息
    getGoodsImg(data.goods_imgs);

    // 获取价格信息
    var goods_price_html = '<p class="curr-price">￥' + goods_price_txt + '</p>';
    // + '<p class="market-price">￥' + data.goods_refer_price + '</p>';
    $('#priceInfo').html(goods_price_html);

    // 限时购活动
    if (data.flash_sale == '' || data.flash_sale == undefined) {
        $('#rushbuyInfo').hide();
    } else {
        if (data.flash_sale_status == '进行中') {
            var saleTime = parseInt(data.flash_sale_end_time) - parseInt(data.service_time);
            saleTime = parseInt((saleTime / 1000).toFixed(0));
            var flash_str = '<div class="rushbuy-active" data-timeid="' + data.time_sale_id + '">' +
                '<i>' + data.flash_sale + '</i>' +
                '<span>' + data.flash_sale_status + '</span>' +
                '<p class="time">距结束还剩：<span id="timeBuyDown"></span></p>' +
                '</div>';
            $('#rushbuyInfo').html(flash_str);
            timeBuyCountDown(saleTime);
        } else if (data.flash_sale_status == '即将开始') {
            var saleTime = parseInt(data.flash_sale_time) - parseInt(data.service_time);
            saleTime = parseInt((saleTime / 1000).toFixed(0));
            var flash_str = '<div class="rushbuy-active" data-timeid="' + data.time_sale_id + '">' +
                '<i>' + data.flash_sale + '</i>' +
                '<span>' + data.flash_sale_status + '</span>' +
                '<p class="time">距开抢：<span id="timeBuyDown"></span></p>' +
                '</div>';
            $('#rushbuyInfo').html(flash_str);
            timeBuyCountDown(saleTime);
        }
        $('.rushbuy-active').click(function () {
            var activity_id = $(this).attr('data-timeid');
            if (user_id && token) {
                window.location.href = '../timeShopping/timeShopping.html?user_id=' + user_id + '&token=' + token;
            } else {
                window.location.href = '../timeShopping/timeShopping.html';
            }
        });
    }
    // 商品缺货
    if (data.standard_count === 0) {
        var flash_str = '<div class="rushbuy-end">' +
            '<p>商品售空了，方正正在疯狂补货中，您可以收藏此商品关注该商品状态</p>' +
            '</div>';
        $('#rushbuyInfo').html(flash_str).show();
        $('.buy-box').html('<p class="stock">商品已抢光</p>');
    }
    // 商品限购
    if (data.standard_count_limit == '') {
        // $('.buy-box').html('<p class="stock">商品已达今日购买上限</p>');
    } else {
        if (data.standard_count_limit == 0) {
            $('.buy-box').html('<p class="stock">商品已达今日购买上限</p>');
        }
    }
    // 评价标题
    var evaTit_html = '<h4 class="left">评价（' + data.evaluate_total_num + '）</h4>' +
        '<p class="right">好评&nbsp;<span>' + data.evaluate_high_opinion + '</span><i class="icon-chevron-thin-right"></i></p>' +
        '<p class="clear"></p>';
    $('#evaTit').html(evaTit_html);

    // 品牌信息
    var brand_html = '<p class="brand-img"><img src="' + data.brand_logo + '"></p>' +
        '<div class="brand-txt">' +
        '<h4>' + data.brand_name + '</h4>' +
        '<p class="brand-txt-img">' +
        '<img src="' + data.banner + '">' +
        '<span class="word03 m-l-5">' + data.nation + '</span>' +
        '</p>' +
        '</div>' +
        '<p class="icon-right"><i class="icon-chevron-thin-right"></i></p>';
    $("#brandinfoThumb").html(brand_html).attr("data-brandid", data.brand_id);

    // 商品标题信息
    var detailsInfo_html = '<h2 class="detailsinfo-tit">' + data.goods_name + '</h2>' 
        +'<h3 style="display: block; font-size: 12px;font-weight: 700;margin-bottom: 14px;left: 16px;">'+data.goods_subname+'</h3>'
        +'<p class="detailsinfo-con">' + data.goods_parameter + '</p>' +
        '<div>' +
        '<div class="left left-con">' +
        '<img class="icon-country" src="' + data.banner + '">' +
        '<span class="word03 m-l-6" id="nation">' + data.nation + '品牌</span>' +
        '<span class="word03 m-l-6" id="warehouse" data-houseid="0">' + data.warehouse_name + '直邮</span>' +
        '</div>' +
        '<div class="right tariffinfo" id="tariffInfo">' +
        '<span class="word03 m-r-3 underline">税费</span><i class="word03 icon-icon_Info2"></i>' +
        '</div>' +
        '<p class="clear"></p>' +
        '</div>';
    $('#detailsInfo').html(detailsInfo_html);
    $('#detailsInfo h2, #detailsInfo p').click(function () {
        $('.tab-list-nav li:eq(1)').click();
    })
    $('#tariffInfo').unbind('click').bind('touchend', function () {
        var goods_taxrate_whole = (goods_taxrate * 100) * (goods_taxrate_price * 100) * parseInt($(".act-sum").find("input").val()) / 10000;
        var tariffmask;
        if (goods_taxrate_whole <= 50) {
            tariffmask = '<p class="tariff-tax">' +
                '<span class="tariff-tax-num numfree">￥' + goods_taxrate_whole.toFixed(2) + '</span>' +
                '<span class="tariff-tax-free">关税<=50，免征哦</span>' +
                '</p>' +
                '<p class="tariff-rate">本商品使用税率为<span>' + goods_taxrate * 100 + '%</span>,若订单总额<=50则免征</p>';
        } else {
            tariffmask = '<p class="tariff-tax">' +
                '<span class="tariff-tax-num">￥' + goods_taxrate_whole.toFixed(2) + '</span>' +
                '</p>' +
                '<p class="tariff-rate">本商品使用税率为<span>' + goods_taxrate * 100 + '%</span>,若订单总额<=50则免征</p>';
        }
        getMask("税费", tariffmask);
    });

    var goodsImgLabel = "";
    if (data.goods_imgs && data.goods_imgs.length > 0) {
        goodsImgLabel = '<img src="' + data.goods_imgs[0].img_url + '">';
    }
    // 规格信息
    var stand_html = '<li class="dgsc-pic">' +
        goodsImgLabel +
        '</li>' +
        '<li class="dgsc-info">' +
        '<p><span class="dgsc-price">￥' + goods_price_txt + '</span> </p>' +
        '<p>请选择商品</p>' +
        '<p class="dgsc-quantity"></p>' +
        '</li>' +
        '<div class="clear"></div>';
    $('#dgscDetails').html(stand_html);

    //说明
    if (data.explain == '' || data.explain == undefined || data.explain.length == 0) {
        $('#explainInfo').remove();
        $('#detailsInfo').css('border-bottom', 'none');
    } else {
        var explainInfo_html = '<h4>说明：</h4>';
        for (var i = 0; i < data.explain.length; i++) {
            explainInfo_html += '<p><i class="point-red"></i><span class="word09" id="explain">' + data.explain[i].explain_con + '</span></p>';
        }
        $('#explainInfo').html(explainInfo_html);
    }

    //促销
    if (data.activity_id != '') {
        var activity_type = '';
        if (data.activity_type == '1') {
            activity_type = '满减';
        } else if (data.activity_type == '2') {
            activity_type = '组合';
        }
        var activity_html = '<h4>促销：</h4>' +
            '<div class="sale-list">' +
            '<p><span class="sale-type">' + activity_type + '</span><span class="sale-con">' + data.activity_con + '</span></p>' +
            '</div>' +
            '<div class="sale-icon"><i class="icon-chevron-thin-right"></i></div>';
        $('#saleInfo').html(activity_html).attr("data-activityid", data.activity_id).attr("data-activityflag", data.activity_flag);
    } else {
        $('#saleInfo').remove();
        $('#explainInfo').css('border-bottom', 'none');
    }
    $('#saleInfo').click(function () {
        var activity_id = $(this).attr('data-activityid');
        var activity_flag = $(this).attr('data-activityflag');
        if (activity_flag == '0') {
            if (user_id && token) {
                window.location.href = '../activity/active_1.html?activity_id=' + activity_id + '&user_id=' + user_id + '&token=' + token;
            } else {
                window.location.href = '../activity/active_1.html?activity_id=' + activity_id;
            }
        } else if (activity_flag == '1') {
            if (user_id && token) {
                window.location.href = '../activity/active_2.html?activity_id=' + activity_id + '&user_id=' + user_id + '&token=' + token;
            } else {
                window.location.href = '../activity/active_2.html?activity_id=' + activity_id;
            }
        }
    });

    //商品已下架
    if (data.goods_status == '20' || data.goods_status == '30' || data.goods_status == '60' || data.goods_status == '70') {
        $('#goodsShelves').show();
        $('#saleInfo').hide();
        $('#rushbuyInfo').hide();
        $('#explainInfo').hide();
        $('.buy-box').html('<p class="stock">商品已下架</p>');
    }

    // 判断是否已收藏
    if (data.is_collect == "1") {
        $("#collectThu").addClass("active").find("div").html('<i class="icon-heart"></i>已收藏');
    }

    // 获取单品信息
    if (data.standard_list.length == 0 || data.standard_list == '') {
        item_id = data.item_id;
        $('#goodsStand').remove();
    } else {
        goodsStandard(data.standard_list);
    }

    $('#actionBtm').show();

}

//轮播图片方法
function getGoodsImg(imgsLists) {
    var str = '<div class="swiper-wrapper">';
    if (imgsLists != '') {
        for (var i = 0; i < imgsLists.length; i++) {
            str += '<div class="swiper-slide">';
            str += '<img src="' + imgsLists[i].img_url + '">';
            str += '</div>';
        }
    }
    str += '</div>';
    $('#goodsImgs').html(str);

    $(".banner,.swiper-slide").height($('body').width()); //banner图高宽保持一致

    //定义banner图左右滑动
    $(".banner").unbind('click').on("click", function () {
        if ($(this).hasClass("banner-full")) {
            $(".banner").removeClass("banner-full");
            document.removeEventListener('touchmove', touch, false);
        } else {
            $(".banner").addClass("banner-full");
            document.addEventListener('touchmove', touch, false);
        }
    });

    var AppSwiper = new Swiper('.swiper-container', {
        pagination: '.pagination',
        mode: 'horizontal',
        loop: true
    });
}

//获取商品规格
function goodsStandard(data) {
    var str = '';
    // console.log(data)
    for (var i = 0; i < data.length; i++) {
        str += '<div class="dgscp-c" data-standid="' + data[i].standard_cons_name + '">';
        str += '<h2>' + data[i].standard_name + '</h2>';
        str += '<ul class="dgsc-pc">';
        for (var j = 0; j < data[i].standard_cons.length; j++) {
            str += '<li data-itemid="' + data[i].standard_cons[j].standard_cons_name + '" data-standardconsid="' + data[i].standard_cons[j].standard_cons_name + '">' + data[i].standard_cons[j].standard_cons_name + '</li>';
        }
        str += '<div class="clear"></div>';
        str += '</ul>'
        str += '</div>'
    }
    $('#goodsStand').html(str);
    if (item_inpara_id) {
        getItemMsg(item_inpara_id);
    }
}

function getItemMsg(data) {
    var urlHeader = ajaxLink + "v1/goods/get-goods-standard";
    var dataParam = "goods_id=" + goods_id + "&item_id=" + item_inpara_id;
    if (user_id && token) {
        dataParam = dataParam + '&user_id=' + user_id;
    }

    function sucGetItemMsg(response) {
        console.log(response);
        if (response.ret == 0) {
            var data = response.data.standard_list[0];
            var itemRender_fir = data.standard_value;
            var li_fir = $('#goodsStand').find('.dgscp-c:eq(0)').find('ul').children('li');
            for (var i = 0; i < li_fir.length; i++) {
                var li_fir_val = $('#goodsStand').find('.dgscp-c:eq(0)').find('ul').children('li:eq(' + i + ')').html();
                if (li_fir_val == itemRender_fir) {
                    $('#goodsStand').find('.dgscp-c:eq(0)').find('ul').children('li:eq(' + i + ')').addClass('active');
                    break;
                }
            }
            if (data.standard_cons.length != 0) {
                var itemRender_sec = data.standard_cons[0].standard_cons_name;
                var li_sec = $('#goodsStand').find('.dgscp-c:eq(1)').find('ul').children('li');
                for (var i = 0; i < li_sec.length; i++) {
                    var li_sec_val = $('#goodsStand').find('.dgscp-c:eq(1)').find('ul').children('li:eq(' + i + ')').html();
                    if (li_sec_val == itemRender_sec) {
                        $('#goodsStand').find('.dgscp-c:eq(1)').find('ul').children('li:eq(' + i + ')').addClass('active');
                        break;
                    }
                }
            }
        } else {
            getTips(response.desp);
        }
    }
    ajaxWithHeader(urlHeader, dataParam, sucGetItemMsg);
}
// 点击一级规格渲染二级规格
function goodsStandardFir(data, index) {
    $('.dgsc-fq').hide();
    var urlHeader = ajaxLink + "v1/goods/get-goods-standard";
    // data = data.substring(1, data.length - 1);
    console.log(data)
    console.log(data[0])
    console.log(data.standard_cons_name)
    var dataParam = "goods_id=" + goods_id + "&goods_standard_name=" +encodeURIComponent( data[0].standard_cons_name);
    if (user_id && token) {
        dataParam = dataParam + '&user_id=' + user_id;
    }

    function sucGoodsStandardSec(response) {
        console.log(response);
        if (response.ret == 0) {
            var data = response.data.standard_list;
            if ($('#goodsStand').find('.dgscp-c').length == 1 || $('#goodsStand').find('.dgscp-c').length == 0) {
                $(".dgsc-pic img").attr("src", data[0].standard_img);
                $('.dgsc-price').html('￥' + data[0].standard_price);
                $('.dgscDesp').html(data[0].stock_status);
                if ($('#goodsStand').find('.dgscp-c').length == 1) {
                    $('#priceInfo').find('p.curr-price').html('￥' + data[0].standard_price);
                }

                // 分期
                $('.dgsc-fq ul').html("<li data-fq=''>不分期</li>");
                var liStrs = '';
                var priceJson = {
                    threePrice: data[0].threePrice,
                    sixPrice: data[0].sixPrice,
                    ninePrice: data[0].ninePrice,
                    twelvePrice: data[0].twelvePrice,
                    eighteenPrice: data[0].eighteenPrice,
                    twentyFourPrice: data[0].twentyFourPrice
                };
                var fq3 = getFq(data[0].threePrice, 3);
                var fq6 = getFq(data[0].sixPrice, 6);
                var fq9 = getFq(data[0].ninePrice, 9);
                var fq12 = getFq(data[0].twelvePrice, 12);
                var fq18 = getFq(data[0].eighteenPrice, 18);
                var fq24 = getFq(data[0].twentyFourPrice, 24);
                liStrs = fq3 + fq6 + fq9 + fq12 + fq18 + fq24;
                $('.dgsc-fq ul').append(liStrs);
                if (liStrs.length > 0) {
                    $('.dgsc-fq').show();
                    // 分期点击事件
                    console.log($('dgsc-fq li'));
                    $('.dgsc-fq li').bind('touchend', function () {
                        if ($(this).hasClass("active")) return;
                        var PriceName = $(this).data('fq');
                        $(this).addClass('active').siblings().removeClass('active');
                        if (priceJson[PriceName]) {
                            $('.dgsc-price').html('￥' + priceJson[PriceName]);
                            $('#priceInfo').find('p.curr-price').html('￥' + priceJson[PriceName]);
                            $('#dgscBtn').text("分期购买");
                            $('#dgscBtn').css("background-color", "#e42f46");
                        } else {
                            console.log(data)
                            $('.dgsc-price').html('￥' + data[0].standard_price);
                            if (localStorage.chosenBtn == 0) {
                                $('#dgscBtn').text("确认添加");
                                $('#dgscBtn').css("background-color", "#ffb946");
                            } else {
                                $('#dgscBtn').text("确定购买");
                                $('#dgscBtn').css("background-color", "#e42f46");
                            }

                        }

                    });
                }
                // $('#priceInfo').find('p.market-price').html('￥' + data[0].goods_refer_price);
                goods_taxrate_price = parseFloat(data[0].standard_price);
                goods_num_stock = data[0].standard_price;
                var standard_count_txt = parseInt(data[0].standard_count);
                // if(standard_count > standard_count_txt) {
                // standard_count = standard_count_txt;
                // }
                // standard_count_limit = data[0].standard_count_limit;
                // if(data[0].standard_count_limit == '') {
                //     standard_count = standard_count;
                // } else {
                //     if(parseInt(data[0].standard_count_limit) < standard_count) {
                //         standard_count = parseInt(data[0].standard_count_limit);
                //     }
                // }
                item_id = data[0].item_id;
                // 限时购活动
                if (data[0].flash_sale == '' || data[0].flash_sale == undefined) {
                    $('#rushbuyInfo').hide();
                } else {
                    if (data[0].flash_sale_status == '进行中') {
                        var saleTime = parseInt(data[0].flash_sale_end_time) - parseInt(data[0].service_time);
                        saleTime = parseInt((saleTime / 1000).toFixed(0));
                        var flash_str = '<div class="rushbuy-active" data-timeid="' + data[0].time_sale_id + '">' +
                            '<i>' + data[0].flash_sale + '</i>' +
                            '<span>' + data[0].flash_sale_status + '</span>' +
                            '<p class="time">距结束还剩：<span id="timeBuyDown"></span></p>' +
                            '</div>';
                        $('#rushbuyInfo').show().html(flash_str);
                        timeBuyCountDown(saleTime);
                    } else if (data[0].flash_sale_status == '即将开始') {
                        var saleTime = parseInt(data[0].flash_sale_time) - parseInt(data[0].service_time);
                        saleTime = parseInt((saleTime / 1000).toFixed(0));
                        var flash_str = '<div class="rushbuy-active" data-timeid="' + data[0].time_sale_id + '">' +
                            '<i>' + data[0].flash_sale + '</i>' +
                            '<span>' + data[0].flash_sale_status + '</span>' +
                            '<p class="time">距开抢：<span id="timeBuyDown"></span></p>' +
                            '</div>';
                        $('#rushbuyInfo').show().html(flash_str);
                        timeBuyCountDown(saleTime);
                    }
                    $('.rushbuy-active').click(function () {
                        if (user_id && token) {
                            window.location.href = '../timeShopping/timeShopping.html?user_id=' + user_id + '&token=' + token;
                        } else {
                            window.location.href = '../timeShopping/timeShopping.html';
                        }
                    });
                }
                //促销
                if (data[0].activity_id != '') {
                    var activity_type = '';
                    if (data[0].activity_type == '1') {
                        activity_type = '满减';
                    } else if (data[0].activity_type == '2') {
                        activity_type = '组合';
                    }
                    var activity_html = '<h4>促销：</h4>' +
                        '<div class="sale-list">' +
                        '<p><span class="sale-type">' + activity_type + '</span><span class="sale-con">' + data[0].activity_con + '</span></p>' +
                        '</div>' +
                        '<div class="sale-icon"><i class="icon-chevron-thin-right"></i></div>';
                    $('#saleInfo').html(activity_html).attr("data-activityid", data[0].activity_id).attr("data-activityflag", data[0].activity_flag);
                } else {
                    $('#saleInfo').remove();
                    $('#explainInfo').css('border-bottom', 'none');
                }
                $('#saleInfo').click(function () {
                    var activity_id = $(this).attr('data-activityid');
                    var activity_flag = $(this).attr('data-activityflag');
                    if (activity_flag == '0') {
                        if (user_id && token) {
                            window.location.href = '../activity/active_1.html?activity_id=' + activity_id + '&user_id=' + user_id + '&token=' + token;
                        } else {
                            window.location.href = '../activity/active_1.html?activity_id=' + activity_id;
                        }
                    } else if (activity_flag == '1') {
                        if (user_id && token) {
                            window.location.href = '../activity/active_2.html?activity_id=' + activity_id + '&user_id=' + user_id + '&token=' + token;
                        } else {
                            window.location.href = '../activity/active_2.html?activity_id=' + activity_id;
                        }
                    }
                });
                return;
            } else {
                var str = '';
                // str += '<div class="dgscp-c" data-standid="' + data[0].standard_id + '">';
                // str += '<h2>' + data[0].standard_name + '</h2>';
                str += '<ul class="dgsc-pc">';
                for (var j = 0; j < data.standard_cons.length; j++) {
                    str += '<li data-itemid="' + data.standard_cons[j].item_id + '" data-standardconsid="' + data.standard_cons[j].standard_cons_name + '">' + data.standard_cons[j].standard_cons_name + '</li>';
                }
                str += '<div class="clear"></div>';
                str += '</ul>';
                // str += '</div>';
                $('#goodsStand').find(".dgscp-c:eq(1)").find('.dgsc-pc').remove();
                $('#goodsStand').find(".dgscp-c:eq(1)").append(str);
                $('#goodsStand').children(".dgscp-c:eq(1)").find('li').click(function () {

                    var i = $(this).index();
                    var standardObj = {};
                    var standardObj_oth = {};
                    var standardList = [];
                    console.log($(this).attr('data-standardconsid'));

                    console.log($(".dgscp-c:eq(1)").find("li.active"));
                    console.log($(".dgscp-c:eq(0)").find("li.active"));
                    standardObj.standard_cons_id = $(this).attr('data-standardconsid');
                    standardObj.item_id = $(this).attr("item_id");
                    standardObj.standard_cons_name = $(this).attr('data-standardconsid');

                    standardObj_oth.standard_cons_id = $(".dgscp-c:eq(0)").find("li.active").attr("standard_cons_name");
                    standardObj_oth.item_id = $(".dgscp-c:eq(0)").find("li.active").attr("item_id");
                    standardObj_oth.standard_cons_name = $(".dgscp-c:eq(0)").find("li.active").text();
                    standardList.push(standardObj_oth);
                    standardList.push(standardObj);
                    // goodsStandardSec(JSON.stringify(standardList), i)
                    goodsStandardSec(standardList,i);
                    $(this).addClass('active').siblings().removeClass('active');
                });


            }

        } else {
            getTips(response.desp);
        }
    }
    ajaxWithHeaderObj(urlHeader, dataParam, sucGoodsStandardSec);
    // ajaxWithHeader(urlHeader, dataParam, sucGoodsStandardSec);
}
/*分期算法 */
function getFq(money, num) {
    var data = '';
    switch (num) {
        case 3:
            data = 'threePrice'
            break;
        case 6:
            data = 'sixPrice'
            break;
        case 9:
            data = 'ninePrice'
            break;
        case 12:
            data = 'twelvePrice'
            break;
        case 18:
            data = 'eighteenPrice'
            break;
        case 24:
            data = 'twentyFourPrice'
            break;
        default:
            break;
    }
    if (money) {
        if ((money / num) % 1 === 0) {
            return "<li data-fq="+data+">￥" + money / num + "×" + num + "期</li>"
        } else {
            return "<li data-fq=" + data + ">首期￥" + (money - Math.floor(money / num) * (num - 1)) + "，后续￥" + Math.floor(money / num) + '*' + (num - 1) + '期</li>'
        }
    } else {
        return ''
    }


}
// 点击二级规格获取item
function goodsStandardSec(data, index) {
    var urlHeader = ajaxLink + "v1/goods/get-goods-standard";
    // data = data.substring(1, data.length - 1);
    var dataParam = "goods_id=" + goods_id + "&goods_standard_name=" + encodeURIComponent(data[0].standard_cons_name)+'&standard_cons_name='+encodeURIComponent(data[1].standard_cons_name);
    if (user_id && token) {
        dataParam = dataParam + '&user_id=' + user_id;
    }

    function sucGoodsStandardSec(response) {
        console.log(response);
        if (response.ret == 0 && parseFloat(response.data.standard_list.goods_quantity) > 0) {
            $('.dgsc-quantity').html('库存：'+response.data.standard_list.goods_quantity);
            var data_sec = response.data.standard_list.standard_cons;
            var installment_price = response.data.standard_list.installment_price;
            item_id = data_sec.item_id;
            // $(".dgsc-pic img").attr("src", data_sec.standard_img);
            $('.dgsc-price').html('￥' + data_sec.standard_price);
            // $('.dgscDesp').html(data_sec.stock_status);
            $('#priceInfo').find('p.curr-price').html('￥' + data_sec.standard_price);
            // $('#priceInfo').find('p.market-price').html('￥' + data_sec.goods_refer_price);
            goods_taxrate_price = parseFloat(data_sec.standard_price);
            goods_num_stock = data_sec.standard_price;
            // var standard_count_txt = parseInt(data_sec.standard_count || '' );
            // if(standard_count > standard_count_txt) {
            // standard_count = standard_count_txt || 0;
            // }
            // standard_count_limit = data_sec.standard_count_limit || '';
            // if(data_sec.standard_count_limit == '') {
            //     standard_count = standard_count;
            // } else {
            //     if(parseInt(data_sec.standard_count_limit) < standard_count) {
            //         standard_count = parseInt(data_sec.standard_count_limit);
            //     }
            // }
            // 限时购活动
            if (data_sec.flash_sale == '' || data_sec.flash_sale == undefined) {
                $('#rushbuyInfo').hide();
            } else {
                if (data_sec.flash_sale_status == '进行中') {
                    var saleTime = parseInt(data_sec.flash_sale_end_time) - parseInt(data_sec.service_time);
                    saleTime = parseInt((saleTime / 1000).toFixed(0));
                    var flash_str = '<div class="rushbuy-active" data-timeid="' + data_sec.time_sale_id + '">' +
                        '<i>' + data_sec.flash_sale + '</i>' +
                        '<span>' + data_sec.flash_sale_status + '</span>' +
                        '<p class="time">距结束还剩：<span id="timeBuyDown"></span></p>' +
                        '</div>';
                    $('#rushbuyInfo').show().html(flash_str);
                    timeBuyCountDown(saleTime);
                } else if (data_sec.flash_sale_status == '即将开始') {
                    var saleTime = parseInt(data_sec.flash_sale_time) - parseInt(data_sec.service_time);
                    saleTime = parseInt((saleTime / 1000).toFixed(0));
                    var flash_str = '<div class="rushbuy-active" data-timeid="' + data_sec.time_sale_id + '">' +
                        '<i>' + data_sec.flash_sale + '</i>' +
                        '<span>' + data_sec.flash_sale_status + '</span>' +
                        '<p class="time">距开抢：<span id="timeBuyDown"></span></p>' +
                        '</div>';
                    $('#rushbuyInfo').show().html(flash_str);
                    timeBuyCountDown(saleTime);
                }
                $('.rushbuy-active').click(function () {
                    if (user_id && token) {
                        window.location.href = '../timeShopping/timeShopping.html?user_id=' + user_id + '&token=' + token;
                    } else {
                        window.location.href = '../timeShopping/timeShopping.html';
                    }
                });
            }
            //促销
            if (data_sec.activity_id != '') {
                var activity_type = '';
                if (data_sec.activity_type == '1') {
                    activity_type = '满减';
                } else if (data_sec.activity_type == '2') {
                    activity_type = '组合';
                }
                var activity_html = '<h4>促销：</h4>' +
                    '<div class="sale-list">' +
                    '<p><span class="sale-type">' + activity_type + '</span><span class="sale-con">' + data_sec.activity_con + '</span></p>' +
                    '</div>' +
                    '<div class="sale-icon"><i class="icon-chevron-thin-right"></i></div>';
                $('#saleInfo').html(activity_html).attr("data-activityid", data_sec.activity_id).attr("data-activityflag", data_sec.activity_flag);
            } else {
                $('#saleInfo').remove();
                $('#explainInfo').css('border-bottom', 'none');
            }
            // 分期
            $('.dgsc-fq ul').html("<li data-fq=''>不分期</li>");
            var liStrs = '';
            var priceJson = {
                threePrice: installment_price.threePrice,
                sixPrice: installment_price.sixPrice,
                ninePrice: installment_price.ninePrice,
                twelvePrice: installment_price.twelvePrice,
                eighteenPrice: installment_price.eighteenPrice,
                twentyFourPrice: installment_price.twentyFourPrice
            };
            var fq3 = getFq(installment_price.threePrice, 3);
            var fq6 = getFq(installment_price.sixPrice, 6);
            var fq9 = getFq(installment_price.ninePrice, 9);
            var fq12 = getFq(installment_price.twelvePrice, 12);
            var fq18 = getFq(installment_price.eighteenPrice, 18);
            var fq24 = getFq(installment_price.twentyFourPrice, 24);

            liStrs = fq3 + fq6 + fq9 + fq12 + fq18 + fq24;
            $('.dgsc-fq ul').append(liStrs);
            if (liStrs.length > 0) {
                $('.dgsc-fq').show();
                // 分期点击事件
                $('.dgsc-fq li').bind('touchend', function () {
                    if ($(this).hasClass("active")) return;
                    var PriceName = $(this).data('fq');
                    $(this).addClass('active').siblings().removeClass('active');
                    if (priceJson[PriceName]) {
                        $('.dgsc-price').html('￥' + priceJson[PriceName]);
                        $('#priceInfo').find('p.curr-price').html('￥' + priceJson[PriceName]);
                        $('#dgscBtn').text("分期购买");
                        $('#dgscBtn').css("background-color", "#e42f46");
                    } else {
                        console.log(data)
                        $('.dgsc-price').html('￥' + data_sec.standard_price);
                        if (localStorage.chosenBtn == 0) {
                            $('#dgscBtn').text("确认添加");
                            $('#dgscBtn').css("background-color", "#ffb946");
                        } else {
                            $('#dgscBtn').text("确定购买");
                            $('#dgscBtn').css("background-color", "#e42f46");
                        }

                    }

                });
            }
            $('#saleInfo').click(function () {
                var activity_id = $(this).attr('data-activityid');
                var activity_flag = $(this).attr('data-activityflag');
                if (activity_flag == '0') {
                    if (user_id && token) {
                        window.location.href = '../activity/active_1.html?activity_id=' + activity_id + '&user_id=' + user_id + '&token=' + token;
                    } else {
                        window.location.href = '../activity/active_1.html?activity_id=' + activity_id;
                    }
                } else if (activity_flag == '1') {
                    if (user_id && token) {
                        window.location.href = '../activity/active_2.html?activity_id=' + activity_id + '&user_id=' + user_id + '&token=' + token;
                    } else {
                        window.location.href = '../activity/active_2.html?activity_id=' + activity_id;
                    }
                }
            });
        }else if (response.ret == 0 && parseFloat(response.data.standard_list.goods_quantity) <= 0){
            $('.dgsc-quantity').html('库存：'+response.data.standard_list.goods_quantity);
            getTips(response.data.standard_list.goods_quantity_desc);
        }else{
            getTips(response.desp);
        }
    }
    ajaxWithHeaderObj(urlHeader, dataParam, sucGoodsStandardSec);
}

//商品评价
function evaluateRender(data) {
    var str = '';
    for (var i = 0; i < data.length; i++) {
        var evaluateCode = '';
        switch (data[i].evaluate_goods_point) {
            case '1.0':
                evaluateCode = '<i class="icon-star-full"></i><i class="icon-star-empty"></i><i class="icon-star-empty"></i><i class="icon-star-empty"></i><i class="icon-star-empty"></i>';
                break;
            case '2.0':
                evaluateCode = '<i class="icon-star-full"></i><i class="icon-star-full"></i><i class="icon-star-empty"></i><i class="icon-star-empty"></i><i class="icon-star-empty"></i>';
                break;
            case '3.0':
                evaluateCode = '<i class="icon-star-full"></i><i class="icon-star-full"></i><i class="icon-star-full"></i><i class="icon-star-empty"></i><i class="icon-star-empty"></i>';
                break;
            case '4.0':
                evaluateCode = '<i class="icon-star-full"></i><i class="icon-star-full"></i><i class="icon-star-full"></i><i class="icon-star-full"></i><i class="icon-star-empty"></i>';
                break;
            case '5.0':
                evaluateCode = '<i class="icon-star-full"></i><i class="icon-star-full"></i><i class="icon-star-full"></i><i class="icon-star-full"></i><i class="icon-star-full"></i>';
                break;
        }
        var evaStr = '';
        for (var j = 0; j < data[i].evaluate_picture.length; j++) {
            evaStr += '<a href="' + data[i].evaluate_picture[j] + '" data-size="1600x1600" data-med="' + data[i].evaluate_picture[j] + '" data-med-size="1024x1024" class="gallery__img--main"><img src="' + data[i].evaluate_picture[j] + '"></a>';
        }
        if (evaStr != '') {
            evaStr = '<div class="eva-img">' + evaStr + '</div>';
        }
        var evaAddStr = '';
        for (var q = 0; q < data[i].evaluate_added_picture.length; q++) {
            evaAddStr += '<a href="' + data[i].evaluate_added_picture[q] + '" data-size="1600x1600" data-med="' + data[i].evaluate_added_picture[q] + '" data-med-size="1024x1024" class="gallery__img--main"><img src="' + data[i].evaluate_added_picture[q] + '"></a>';
        }
        if (evaAddStr != '') {
            evaAddStr = '<div class="eva-img">' + evaAddStr + '</div>';
        }
        str += '<li>';
        str += '<div class="eva-list-tit">';
        str += '<p class="eva-list-tit-pp"><span class="user">' + data[i].user_name + '</span><span class="time">' + data[i].evaluate_new_time + '</span></p>';
        str += '<p class="eva-list-tit-star">' + evaluateCode + '</p>';
        str += '<p class="clear"></p>';
        str += '</div>';
        str += '<div class="eva-list-con">';
        str += '<p>' + data[i].evaluate_goods_con + '</p><span>' + data[i].goods_standard + '</span>';
        str += evaStr;
        str += '</div>';
        str += '<div class="eva-list-con m-t-19">';
        str += '<p>' + data[i].evaluate_added_time + '追评</p><p>' + data[i].evaluate_added_con + '</p>';
        str += evaAddStr;
        str += '</div>';
        str += '</li>';
    }
    return str;
}

function evaluateRenderThumb(data) {
    var str = '';
    for (var i = 0; i < data.length; i++) {
        var evaluateCode = '';
        switch (data[i].evaluate_goods_point) {
            case '1.0':
                evaluateCode = '<i class="icon-star-full"></i><i class="icon-star-empty"></i><i class="icon-star-empty"></i><i class="icon-star-empty"></i><i class="icon-star-empty"></i>';
                break;
            case '2.0':
                evaluateCode = '<i class="icon-star-full"></i><i class="icon-star-full"></i><i class="icon-star-empty"></i><i class="icon-star-empty"></i><i class="icon-star-empty"></i>';
                break;
            case '3.0':
                evaluateCode = '<i class="icon-star-full"></i><i class="icon-star-full"></i><i class="icon-star-full"></i><i class="icon-star-empty"></i><i class="icon-star-empty"></i>';
                break;
            case '4.0':
                evaluateCode = '<i class="icon-star-full"></i><i class="icon-star-full"></i><i class="icon-star-full"></i><i class="icon-star-full"></i><i class="icon-star-empty"></i>';
                break;
            case '5.0':
                evaluateCode = '<i class="icon-star-full"></i><i class="icon-star-full"></i><i class="icon-star-full"></i><i class="icon-star-full"></i><i class="icon-star-full"></i>';
                break;
        }
        var evaStr = '';
        for (var j = 0; j < data[i].evaluate_picture.length; j++) {
            evaStr += '<p><img src="' + data[i].evaluate_picture[j] + '"></p>';
        }
        if (evaStr != '') {
            evaStr = '<div class="eva-img">' + evaStr + '</div>';
        }
        var evaAddStr = '';
        for (var q = 0; q < data[i].evaluate_added_picture.length; q++) {
            evaAddStr += '<p><img src="' + data[i].evaluate_added_picture[q] + '"></p>';
        }
        if (evaAddStr != '') {
            evaAddStr = '<div class="eva-img">' + evaAddStr + '</div>';
        }
        str += '<li>';
        str += '<div class="eva-list-tit">';
        str += '<p class="eva-list-tit-pp"><span class="user">' + data[i].user_name + '</span><span class="time">' + data[i].evaluate_new_time + '</span></p>';
        str += '<p class="eva-list-tit-star">' + evaluateCode + '</p>';
        str += '<p class="clear"></p>';
        str += '</div>';
        str += '<div class="eva-list-con">';
        str += '<p>' + data[i].evaluate_goods_con + '</p><span>' + data[i].goods_standard + '</span>';
        str += evaStr;
        str += '</div>';
        str += '<div class="eva-list-con m-t-19">';
        str += '<p>' + data[i].evaluate_added_time + '追评</p><p>' + data[i].evaluate_added_con + '</p>';
        str += evaAddStr;
        str += '</div>';
        str += '</li>';
    }
    return str;
}

// 评价列表样式方法
function getevaluatStyle() {
    $('#gd-evaluate').hide();
    $(".eva-img a").width(($(".eva-img").width() - 30) / 5);
    var evaW = $(".eva-img a").width();
    $(".eva-img a").height(evaW);
}

// 计算购物车数量
function shopCartNumCout(str) {
    var shopCart_num = str;
    if (shopCart_num == 0) {
        $("#goShopcart").find(".cartnum").html('').hide();
    } else if (shopCart_num < 10) {
        $("#goShopcart").find(".cartnum").show().html(shopCart_num);
    } else {
        $("#goShopcart").find(".cartnum").show().html('').addClass("small");
    }
}

// 获取登录状态下购物车商品数目
function getCarNumLogin() {
    var urlHeader = ajaxLink + "v1/cart/get-cart-num";
    var dataParam = "user_id=" + user_id + "&token=" + token;

    function sucGetCarNumLogin(response) {
        console.log(response);
        if (response.ret == 0) {
            shopCartNumCout(response.data.cart_goods_num);
        } else if (response.ret == 10009) {
            sucGetToken(getCarNumLogin);;
        } else if (response.ret == 10003) {
            errorToken();
        } else {
            getTips(response.desp);
        }
    }
    ajaxWithHeader(urlHeader, dataParam, sucGetCarNumLogin);
}

// 购物车-校验活动商品限购
function checkShopCartLimit() {
    var urlHeader = ajaxLink + "cart/checkShopCartLimit.ajax";
    var dataParam = 'goods_list=[{"goods_id":"' + goods_id + '"}]&token=' + token + '&user_id=' + user_id;
    //成功校验活动商品限购的方法
    function sucCheckShopCartLimit(response) {
        console.log(response);
        if (response.ret == 0) {
            if (response.data > 0) {
                getTips('购买数量已超过限购，请修改！');
                return;
            } else {
                addShopCartLogin();
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
    ajaxWithHeader(urlHeader, dataParam, sucCheckShopCartLimit);
}
// 登录状态下加入购物车
function addShopCartLogin() {
    var goods_num = parseInt($(".act-sum").find("input").val());
    var urlHeader = ajaxLink + "v1/cart/add";
    // var dataParam = 'goods_list=[{"goods_id":"' + goods_id + '","goods_num":' + goods_num + ',"item_id":"' + item_id + '"}]&token=' + token + '&user_id=' + user_id;
    var dataParam = 'goods_id=' + goods_id + '&goods_num=' + goods_num + '&item_id=' + item_id + '&token=' + token + '&user_id=' + user_id;
    //成功获取商品规格的方法
    function sucAddShopCartLogin(response) {
        console.log(response);
        if (response.ret == 0) {
            getTips('添加购物车成功!');
            getCarNumLogin();
        } else if (response.ret == 10009) {
            getTips(response.desp);
        } else if (response.ret == 10003) {
            errorToken();
        } else {
            getTips(response.desp);
        }
    }
    //调用ajax
    ajaxWithHeader(urlHeader, dataParam, sucAddShopCartLogin,'POST');
}

// 未登录状态下加入购物车
function addShopCartNotLogin() {
    var goods_num = parseInt($(".act-sum").find("input").val());
    if (item_id == undefined) {
        getTips('item_id获取失败，请稍后再试');
        return;
    }
    if (localStorage.shopping_cart) {
        if (localStorage.shopping_cart == '') {
            var shopping_cart_list = [];
            var shopping_cart_list_item = {};
            shopping_cart_list_item["goods_id"] = goods_id;
            shopping_cart_list_item["goods_num"] = goods_num;
            shopping_cart_list_item["item_id"] = item_id;
            shopping_cart_list_item["goods_select"] = 1;
            shopping_cart_list.push(shopping_cart_list_item);
            localStorage.shopping_cart = JSON.stringify(shopping_cart_list);
            shopCartNumCout(1);
            getTips('添加购物车成功');
        } else {
            var shopCartList = JSON.parse(localStorage.shopping_cart);
            var flag = 0;
            for (var i = 0; i < shopCartList.length; i++) {
                if (shopCartList[i].goods_id == goods_id) {
                    if (shopCartList[i].item_id == item_id) {
                        shopCartList[i].goods_num += goods_num;
                        flag = 1;
                        shopCartNumCout(shopCartList.length);
                        getTips('添加购物车成功');
                        localStorage.shopping_cart = JSON.stringify(shopCartList);
                    }
                }
            }
            if (flag == 0) {
                var shopping_cart_list_item = {};
                shopping_cart_list_item["goods_id"] = goods_id;
                shopping_cart_list_item["goods_num"] = goods_num;
                shopping_cart_list_item["item_id"] = item_id;
                shopping_cart_list_item["goods_select"] = 1;
                shopCartList.push(shopping_cart_list_item);
                shopCartNumCout(shopCartList.length);
                getTips('添加购物车成功');
                localStorage.shopping_cart = JSON.stringify(shopCartList);
            }
        }
    } else {
        var shopping_cart_list = [];
        var shopping_cart_list_item = {};
        shopping_cart_list_item["goods_id"] = goods_id;
        shopping_cart_list_item["goods_num"] = goods_num;
        shopping_cart_list_item["item_id"] = item_id;
        shopping_cart_list_item["goods_select"] = 1;
        shopping_cart_list.push(shopping_cart_list_item);
        localStorage.shopping_cart = JSON.stringify(shopping_cart_list);
        shopCartNumCout(1);
        getTips('添加购物车成功');
    }
}

//倒计时
function timeBuyLoad(s) {
    count(s);
    $('#timeBuyDown').html(getZero(count(s).hour) + ":" + getZero(count(s).minute) + ":" + getZero(count(s).second));
}

function timeBuyCountDown(str) {
    var s = str;
    timeBuyLoad(s);
    var TimeInterval = setInterval(function () {
        if (s == 0) {
            clearInterval(TimeInterval);
            TimeInterval = null;
        } else {
            s--;
            timeBuyLoad(s);
        }
    }, 1000);
}

// 获取方正推荐
function getRecommend() {
    var urlHeader = ajaxLink + "goods/get_details_recommend.ajax";
    var dataParam;
    if (user_id && token) {
        dataParam = 'count=4&goods_id=' + goods_id + '&goods_type=0&start=1&token=' + token + '&user_id=' + user_id;
    } else {
        dataParam = 'count=4&goods_id=' + goods_id + '&goods_type=0&start=1';
        // dataParam = 'count=4&goods_id=' + goods_id + '&goods_type=0&start=1&token=&user_id=';
    }
    if (item_inpara_id) {
        dataParam = dataParam + "&item_id=" + item_inpara_id;
    }

    function sucGetRecommend(response) {
        console.log(response);
        if (response.ret == 0) {
            var data = response.data.goods_list;
            getGoodsList(data, recommendid);
        } else if (response.ret == 10009) {
            getAccessToken(user_id);
            token = localStorage.token;
            getRecommend();
        } else if (response.ret == 10003) {
            errorToken();
        } else {
            getTips(response.desp);
        }
    }
    //调用ajax
    ajaxWithHeader(urlHeader, dataParam, sucGetRecommend);
}

// 获取猜你喜欢
function getGuessList() {
    var urlHeader = ajaxLink + "goods/get_details_recommend.ajax";
    var dataParam;
    if (user_id && token) {
        dataParam = 'count=4&goods_id=' + goods_id + '&goods_type=1&start=1&token=' + token + '&user_id=' + user_id;
    } else {
        dataParam = 'count=4&goods_id=' + goods_id + '&goods_type=1&start=1';
        // dataParam = 'count=4&goods_id=' + goods_id + '&goods_type=1&start=1&token=&user_id=';
    }
    if (item_inpara_id) {
        dataParam = dataParam + "&item_id=" + item_inpara_id;
    }

    function sucGetGuessList(response) {
        console.log(response);
        if (response.ret == 0) {
            if (response.data != '') {
                var data = response.data.goods_list;
                getGoodsList(data, redGuessid);
            } else {
                $('#redGuessid').siblings('.list-bot-tit').hide();
            }
        } else if (response.ret == 10009) {
            getAccessToken(user_id);
            token = localStorage.token;
            getGuessList();
        } else if (response.ret == 10003) {
            errorToken();
        } else {
            getTips(response.desp);
        }
    }
    //调用ajax
    ajaxWithHeader(urlHeader, dataParam, sucGetGuessList);
}

// 增加或取消收藏
function getCollectThu(i) {
    var urlHeader = ajaxLink + "add_or_delete_favorite_goods.ajax";
    var dataParam = "goods_ids=" + goods_id + "&user_id=" + user_id + "&token=" + token + "&collect_status=" + i;
    //成功获取获取商品介绍的方法
    function sucGetCollectThu(response) {
        console.log(response);
        if (response.ret == 0) {
            if (i == '0') {
                $("#collectThu").addClass("active").find("div").html('<i class="icon-heart"></i>已收藏');
                getTips('收藏成功！');
            } else if (i == '1') {
                $("#collectThu").removeClass("active").find("div").html('<i class="icon-heart"></i>收藏');
                getTips('商品已取消收藏');
            }
        } else if (response.ret == 10009) {
            getCollectThuToken(i);
        } else if (response.ret == 10003) {
            errorToken();
        } else {
            getTips(response.desp);
        }
    }
    //调用ajax
    ajaxWithHeader(urlHeader, dataParam, sucGetCollectThu);
    removeLoading();
}

function getCollectThuToken(i) {
    getAccessToken(user_id);
    token = localStorage.token;
    getCollectThu(i);
}

//获取商品介绍
function getIntroduceImg() {
    var urlHeader = ajaxLink + "v1/goods/get-goods-introduce";
    var dataParam = "goods_id=" + goods_id;
    //成功获取获取商品介绍的方法
    function sucIntroduceImg(response) {
        console.log(response);
        if (response.ret == 0) {
            var data = response.data;
            var goods_attr_html = '';
            var str = '<p>';

            var arr = data.introduce_images.split('||');
            for(var i = 0;i<arr.length;i++)
                str += '<img style="width:100%;" src="'+arr[i]+'" />';
            $('#introduceImgs').empty().html(str+'</p>');

            // for (var i = 0; i < data.goods_attr_list.length; i++) {
            //     if (data.goods_attr_list[i].attr_dic_value) {
            //         goods_attr_html += '<tr><td>' + data.goods_attr_list[i].attr_dic_name + '</td><td>' + data.goods_attr_list[i].attr_dic_value + '</td></tr>';

            //     }
            // }
            $('#detailsStandardWrap').html(data.goods_parameter);
            // if (goods_attr_html) {
            //     $('#detailsStandardWrap').html(goods_attr_html);
            // } else {
            //     $('.details-standard-wrap').hide();
            // }
            str = '';
            arr = data.service_note_images.split('||');
            for(var i = 0;i<arr.length;i++)
                str += '<img style="width:100%;" src="'+arr[i]+'" />';
            // var detailsService_html = '<img src="' + data.attr1 + '" style="width: 100%;">' +
            //     '<img src="' + data.attr2 + '" style="width: 100%;">'
            $('#detailsService').html(str);
        } else {
            getTips(response.desp);
        }
    }

    //调用ajax
    ajaxWithHeader(urlHeader, dataParam, sucIntroduceImg);
}

//获取评价（tab切换）
function getEvaluateRenderUd(status) {
    var urlHeader = ajaxLink + "evaluate/get_evaluate_details.ajax";
    var dataParam = "goods_id=" + goods_id + "&evaluate_status=" + status;
    //成功获取评价执行的方法
    function sucEvaluateRenderUd(response) {
        console.log(response);
        if (response.ret == 0) {
            if (response.data == '') {
                $("#evaList").hide();
                $(".eva-empty").show();
            } else {
                var data_evaList = response.data.evaluateDetailsList;
                var data_evaTit = response.data.evaluates;
                $(".eva-empty").hide();
                $("#evaList").show().html(evaluateRender(data_evaList));
                console.log($(".eva-list-con").width());
                $(".eva-img a").width(($("body").width() - 62) / 5);
                var evaW = $(".eva-img a").width();
                $(".eva-img a").height(evaW);
                initPhotoSwipeFromDOM('.gallery');
            }
        } else {
            getTips(response.desp);
        }
    }

    //调用ajax
    // ajaxWithHeader(urlHeader, dataParam, sucEvaluateRenderUd);
}

//获取评价
function getEvaluateRender() {
    var urlHeader = ajaxLink + "evaluate/get_evaluate_details.ajax";
    var dataParam = "goods_id=" + goods_id + "&evaluate_status=0";
    //成功获取评价执行的方法
    function sucEvaluateRender(response) {
        console.log(response);
        if (response.ret == 0) {
            if (response.data == '') {
                $("#evaListUd").hide();
                $(".eva-list-empty").show();
                $("#evaList").hide();
                $(".eva-empty").show();
                $("#evalistTit p:eq(0)").html('全部<br><span>0</span>');
                $("#evalistTit p:eq(1)").html('好评<br><span>0</span>');
                $("#evalistTit p:eq(2)").html('中评<br><span>0</span>');
                $("#evalistTit p:eq(3)").html('差评<br><span>0</span>');
                $("#evalistTit p:eq(4)").html('有图<br><span>0</span>');
            } else {
                var data_evaList = response.data.evaluateDetailsList;
                var data_evaTit = response.data.evaluates;
                for (var i = 0; i < 5; i++) {
                    $("#evalistTit p:eq(" + i + ")").html(data_evaTit[i].evaluates_title + '<br><span>' + data_evaTit[i].evaluates_num + '</span>');
                }
                $(".eva-empty").hide();
                $("#evaList").show().html(evaluateRender(data_evaList));
                $(".eva-list-empty").hide();
                $("#evaListUd").show().html(evaluateRenderThumb(data_evaList));
                $("#evaListUd li:eq(2)").nextAll().remove();
                $(".eva-img a").width(($("body").width() - 62) / 5);
                $(".eva-img p").width(($("body").width() - 62) / 5);
                var evaW = $(".eva-img a").width();
                $(".eva-img a").height(evaW);
                $(".eva-img p").height(evaW);
                initPhotoSwipeFromDOM('.gallery');
            }
        } else {
            getTips(response.desp);
        }
    }
    //调用ajax
    ajaxWithHeader(urlHeader, dataParam, sucEvaluateRender);
}

//获取商品详情方法
function getGoodsDetails() {
    var urlHeader = "https://api.xsbuy.cn/v1/goods/get-goods-details";
    
     // var urlHeader = ajaxLink + "v1/goods/get-goods-details";
    var dataParam;
    if (user_id && token) {
        dataParam = "goods_id=" + goods_id + "&user_id=" + user_id + "&token=" + token;
    } else {
        dataParam = "goods_id=" + goods_id;
    }
    if (item_inpara_id) {
        dataParam = dataParam + "&item_id=" + item_inpara_id;
    }
    //成功获取商品详情的方法
    function sucGoodsDetails(response) {
        // console.log(response);
        if (response.ret == 0) {
            var data = response.data;
            if(data.is_seckill !=  undefined ){
                if(data.is_seckill == 1){ //秒杀未开始
                    getTips(data.seckill_msg);
                    seckill()
                }else if(data.is_seckill == 2){//秒杀开始
                    startSeckill();
                }else if(data.is_seckill == 3){//秒杀结束
                    getTips('商品已售馨');
                    seckill()
                }
                
            }
            // console.log(data.standard_list)
            if (data.standard_list.length == 0) {
                goodsStandardFir('', '')
            }
            getGoodsInfo(data); //商品信息//轮播图片
            $('#wrapDetailsShow').show();
            $('#bannerLogo').show();
            $('#wrapShow').show();
            
        } else if (response.ret == 10003) {
            errorToken();
        } else if (response.ret == 10009) {
            sucGetToken(getGoodsDetails)
        } else {
            getTips(response.msg);
            // 
            
        }
    }

    //调用ajax
    ajaxWithHeader(urlHeader, dataParam, sucGoodsDetails);
}
var countdown=60;

function seckill(action){
     $('.buy-box div').unbind('click');
     $('#actionBtm > div.buy-box > div.shop-cart').addClass('seckill-gray');
     $('#actionBtm > div.buy-box > div.buy-btn').addClass('seckill-gray');

}

function startSeckill(){
    $('#actionBtm > div.buy-box > div.shop-cart').addClass('seckill-gray').unbind('click');
    $('.dgsc-num .plus').unbind('touchend');
    $('#actionBtm > div.buy-box > div.shop-cart').addClass('seckill-gray').unbind('click');
}
 
function settime(val) {
    if(val >= countdown)
        return;
    setTimeout(function() { 
        $('#actionBtm > div.buy-box > div.buy-btn').text(++val)
        settime(val) 
    },1000) 
} 
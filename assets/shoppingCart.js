$(document).ready(function() {
    var delCartAPI = 'v1/cart/delete';
    var editCartNumAPI = 'v1/cart/add';
    var paramDic = getUrlString();
    var type = paramDic["type"];
    var user_id = paramDic["user_id"];
    var token = paramDic["token"];
    var shopcartback = paramDic["shopcartback"];
    var back = document.getElementById("backapp");
    var shopSubmit = document.getElementById("shopSubmit");
    var start = 1;
    var countNum = 4;

    // 返回入口
    // if (shopcartback == "1") {
    // } else {
    //     back.style.display = "none";
    // }
    // 原生返回
    back.onclick = function () {
        if (type == "ios") {
            window.location.href = "ios://back";
        } else if (type == "Android") {
            JSkit.back();
        } else {
            window.history.back();
        }
    };
    shopSubmit.onclick = function () {
        if($('#shopSubmit').hasClass('gray')) return;
        if (user_id && token) {
            localStorage.addressId = '';
            localStorage.couponId = '';
            localStorage.couponTxt = '';
            localStorage.ticketType = '';
            localStorage.ticketHead = '';
            localStorage.ticketNo = '';
            localStorage.ticketEmail = '';
            localStorage.orderSubmit_index = 1; 
            localStorage.orderSubmit_Url = window.location.href; 
            window.location.href = "../order/orderSubmit.html?user_id=" + user_id + "&token=" + token +"&oederSubtype=0";
        } else {
            localStorage.url = window.location.href;
            // window.location.href='../login/login.html';
            doLogin();
        }
    };

    $('#emptyCart').find('a').click(function(){
        if (user_id && token) {
            window.location.href = "../timeShopping/timeShopping.html?user_id=" + user_id + "&token=" + token;
        } else {
            window.location.href='../timeShopping/timeShopping.html';
        }
    });

    $('#shopgoLogin').find('span').click(function(){
        localStorage.url = window.location.href;
        // window.location.href='../login/login.html';
        doLogin();
    });

    //返回顶部
    goTop();

    if(user_id && token){
        addLoading();
        if(localStorage.shopping_cart && localStorage.shopping_cart != '') {
            var shopping_cart_li = JSON.parse(localStorage.shopping_cart);
            if(shopping_cart_li.length != 0) {
                addShopCart();
            } else {
                localStorage.shopping_cart = '';
                getShopcart('');
            }
        } else {
            getShopcart('');
        }  

        removeLoading(); 
    } else {
        doLogin();
        // addLoading();
        // if(localStorage.shopping_cart) {
        //     if(localStorage.shopping_cart == '') {
        //         $("#notEmptyCart").hide().siblings("#emptyCart").show();
        //         $("#shopgoLogin").show();
        //         $(".nav-edit").remove();
        //         $(".tab-bot").remove();
        //         getShopCartGoods();
        //     } else {
        //         getShopcartUnLogin();
        //     }
        // } else {
        //     $("#notEmptyCart").hide().siblings("#emptyCart").show();
        //     $("#shopgoLogin").show();
        //     $(".nav-edit").remove();
        //     $(".tab-bot").remove();
        //     getShopCartGoods();
        // }
        // removeLoading();
    }

    function addShopCart(){
        var shopping_cart_add = JSON.parse(localStorage.shopping_cart);
        for(var i=0; i<shopping_cart_add.length; i++){
            delete shopping_cart_add[i].type;
        }
        var urlHeader = ajaxLink + "v1/cart/add";
        // var dataParam = 'goods_id=' + goods_id + '&goods_num=' + goods_num + '&item_id=' + item_id + '&token=' + token + '&user_id=' + user_id;
        // var dataParam = "goods_list=" + JSON.stringify(shopping_cart_add) +"&token="+token + "&user_id="+user_id;
         var dataParam = 'goods_id=' + shopping_cart_add[0].goods_id + '&goods_num=' + shopping_cart_add[0].goods_num + '&item_id=' + shopping_cart_add[0].item_id + '&token=' + token + '&user_id=' + user_id;
        function sucAddShopCart(response){
            console.log(response);
            if(response.ret == 0) {
                localStorage.shopping_cart = '';
                getShopcart('');
            } else if(response.ret == 10009) {
                sucGetToken(addShopCart);
            } else if(response.ret == 10003) {
                errorToken();
            } else {
                getTips(response.desp);
            }
        }
        ajaxWithHeaderObj(urlHeader, dataParam, sucAddShopCart,'POST');
    }

    // 获取未登录状态下购物车列表
    function getShopcartUnLogin(){
        if(localStorage.shopping_cart == '' || localStorage.shopping_cart == undefined) {
            $("#notEmptyCart").hide().siblings("#emptyCart").show();
            $(".nav-edit").remove();
            $(".tab-bot").remove();
            getShopCartGoods();
        } else {
            updataShopcartUnLogin();
        }
    }

    function updataShopcartUnLogin(){
        var urlHeader = ajaxLink + "v1/cart/list";
        var dataParam = "goods_list=" + localStorage.shopping_cart;
        function sucUpdataShopcartUnLogin(response){
            console.log(response);
            if(response.ret == 0) {
                getcartUnLogin(response.data);
            } else {
                removeLoading();
                getTips(response.desp);
            }
        }
        ajaxWithHeader(urlHeader, dataParam, sucUpdataShopcartUnLogin);
    }

    function checkSelectNum() {
        var num = $('#shopGrup').find('input[checked]').length;
        if(num == 0) {
            $('#shopSubmit').addClass('gray');
        } else {
            $('#shopSubmit').removeClass('gray');
        }
    }

    function getcartUnLogin(data) {
        if(data == '') {
            $("#notEmptyCart").hide().siblings("#emptyCart").show();
            $(".nav-edit").remove();
            $(".tab-bot").remove();
            $("#shopNum").html('购物车(0)');
            getShopCartGoods();
            removeLoading();
            return;
        }
        var shopdata_goods_list = JSON.parse(localStorage.shopping_cart);
        var shopData = data;
        var houseData = shopData.warehouse;
        var invalidData = shopData.invalid_goods_list;
        var houseDataHtml = eachHouseData(houseData);
        var invalidDataHtml = eachInvalidData(invalidData);
        $("#shopNum").html("购物车("+shopData.cart_goods_num+")");
        $("#shopGrup").html(houseDataHtml);
        $("#shopInvalid").html(invalidDataHtml);
        $("#totalNum").html(shopData.cart_goods_select_num);
        $("#total").html("￥"+shopData.cart_goods_price.toFixed(2));
        if(shopData.is_all_select == 1){
            $("#checkAll").attr("checked", true);
        } else {
            $("#checkAll").attr("checked", false);
        }
        if($('#shopGrup').find('.shop-group-item').length == 0 && $('#shop-invalid').find('.shop-invalid').length == 0) {
            $('#navEdit').hide();
            $('.tab-allcheck').addClass('disabled');
        } else {
            $('#navEdit').show();
        }
        $('#notEmptyCart').show();
        checkSelectNum();
        removeLoading();
        $('.shop-cart-c').click(function(){
            addLoading();
            var activity_id = $(this).parents('.shop-cart').attr('data-activetyid');
            var activity_type = $(this).parents('.shop-cart').attr('data-activetytype');
            if(activity_type == '0') {
                removeLoading();
                window.location.href = '../activity/active_1.html?activity_id=' + activity_id;
            } else if(activity_type == '1') {
                removeLoading();
                window.location.href = '../activity/active_2.html?activity_id=' + activity_id;
            }
        });
        
        $("#checkAll").unbind('change').on('change', function(){
            if($(this).parent('.tab-allcheck').hasClass('disabled')) return;
            addLoading();
            if($(this).prop('checked')){
                for(var i=0; i<shopdata_goods_list.length; i++){
                    shopdata_goods_list[i].type = 1;
                }
                localStorage.shopping_cart = JSON.stringify(shopdata_goods_list);
                updataShopcartUnLogin();
            } else {
                for(var i=0; i<shopdata_goods_list.length; i++){
                    shopdata_goods_list[i].type = 0;
                }
                localStorage.shopping_cart = JSON.stringify(shopdata_goods_list);
                updataShopcartUnLogin();
            }
        });

        $(".check-house").unbind('change').on('change', function(){
            addLoading();
            var cart_id = new Array();
            $(this).parents(".shop-group-item").find("li").each(function(){
                cart_id.push($(this).attr("data-goodsid"));
            });
            function goods_checked(obj){
                for(var i=0; i<cart_id.length; i++){
                    if(cart_id[i] == obj){
                        return true;
                    }
                }
            }
            if($(this).prop('checked')){
                for(var i=0; i<shopdata_goods_list.length; i++){
                    if(goods_checked(shopdata_goods_list[i].goods_id)){
                        shopdata_goods_list[i].type = 1;
                    }
                }
                localStorage.shopping_cart = JSON.stringify(shopdata_goods_list);
                updataShopcartUnLogin();
            } else {
                for(var i=0; i<shopdata_goods_list.length; i++){
                    if(goods_checked(shopdata_goods_list[i].goods_id)){
                        shopdata_goods_list[i].type = 0;
                    }
                }
                localStorage.shopping_cart = JSON.stringify(shopdata_goods_list);
                updataShopcartUnLogin(); 
            } 
        });

        $(".check-goods").unbind('change').on('change', function(){
            addLoading();
            var goods_id = $(this).parents("li").attr("data-goodsid");
            var item_id = $(this).parents("li").attr("data-itemid");
            if($(this).prop('checked')){
                for(var i=0; i<shopdata_goods_list.length; i++){
                    if(shopdata_goods_list[i].goods_id == goods_id && shopdata_goods_list[i].item_id == item_id){
                        shopdata_goods_list[i].type = 1;
                    }
                }
                localStorage.shopping_cart = JSON.stringify(shopdata_goods_list);
                updataShopcartUnLogin();
            } else {
                for(var i=0; i<shopdata_goods_list.length; i++){
                    if(shopdata_goods_list[i].goods_id == goods_id && shopdata_goods_list[i].item_id == item_id){
                        shopdata_goods_list[i].type = 0;
                    }
                }
                localStorage.shopping_cart = JSON.stringify(shopdata_goods_list);
                updataShopcartUnLogin(); 
            }
        });

        // 点击跳转商品详情
        $(".item-left, .cart-goods").on("click", function(){
            addLoading();
            var goods_id = $(this).parents("li").attr("data-goodsid");
            var item_id = $(this).parents("li").attr('data-itemid');
            if(user_id && token) {
                if(item_id) {
                    removeLoading();
                    window.location.href="../goods/goodsDetails.html?goods_id="+goods_id+"&user_id="+user_id+"&token="+token+"&item_id="+item_id+'&mine=mine';
                } else {
                    removeLoading();
                    window.location.href="../goods/goodsDetails.html?goods_id="+goods_id+"&user_id="+user_id+"&token="+token+'&mine=mine';
                }
            } else {
                if(item_id) {
                    removeLoading();
                    window.location.href="../goods/goodsDetails.html?goods_id="+goods_id+"&item_id="+item_id+'&mine=mine';
                } else {
                    removeLoading();
                    window.location.href="../goods/goodsDetails.html?goods_id="+goods_id+'&mine=mine';
                }
            }
        });

        // 关税显示隐藏
        // $(".goods-rate").on("click", function() {
        //     $(this).parent(".item-right").siblings(".shop-cart-rate-box").toggle();
        //     if ($(this).parents("li").children(".shop-cart-rate-box").is(":hidden")) {
        //         $(this).children("span").children(".icon-chevron-thin-up").hide();
        //         $(this).children("span").children(".icon-chevron-thin-down").show();
        //     } else {
        //         $(this).children("span").children(".icon-chevron-thin-down").hide();
        //         $(this).children("span").children(".icon-chevron-thin-up").show();
        //     }
        // });

        // 编辑商品
        $(".plus").on("click", function() { //增加商品数
            addLoading();
            var goods_id = $(this).parents("li").attr("data-goodsid");
            var item_id = $(this).parents("li").attr("data-itemid");
            for(var i=0; i<shopdata_goods_list.length; i++){
                if(shopdata_goods_list[i].goods_id == goods_id && shopdata_goods_list[i].item_id == item_id){
                    shopdata_goods_list[i].goods_num = shopdata_goods_list[i].goods_num + 1;
                }
            }
            localStorage.shopping_cart = JSON.stringify(shopdata_goods_list);
            updataShopcartUnLogin();
        });
        $(".minus").on("click", function() { //减少商品数
            addLoading();
            var num = parseInt($(this).siblings("span").children("input").val());
            if (num <= 1) {
                getTips('已修改到最小值啦~');
                console.log(num);
                return;
            } else {
                var goods_id = $(this).parents("li").attr("data-goodsid");
                var item_id = $(this).parents("li").attr("data-itemid");
                for(var i=0; i<shopdata_goods_list.length; i++){
                    if(shopdata_goods_list[i].goods_id == goods_id && shopdata_goods_list[i].item_id == item_id){
                        shopdata_goods_list[i].goods_num = shopdata_goods_list[i].goods_num - 1;
                    }
                }
                localStorage.shopping_cart = JSON.stringify(shopdata_goods_list);
                updataShopcartUnLogin();
            }
        });

        $(".shop-group-item .goods-delete").on("click", function() {
            var goods_id = $(this).parents("li").attr("data-goodsid");
            var item_id = $(this).parents("li").attr("data-itemid");
            getConfirm("确认要删除我么？下一场不一定买到哦~", "留在购物车", "狠心删除");
            $(".confirm-btn-sure").click(function(){
                addLoading();
                $(this).parents('.confirm-bg').remove();
                document.removeEventListener('touchmove',touch, false);
                for(var i=0; i<shopdata_goods_list.length; i++){
                    if(shopdata_goods_list[i].goods_id == goods_id && shopdata_goods_list[i].item_id == item_id){
                        shopdata_goods_list.splice(i,1);
                    }
                }
                localStorage.shopping_cart = JSON.stringify(shopdata_goods_list);
                updataShopcartUnLogin();
            });
        });

        // 清空失效商品
        $(".shop-invalid .invalid-clear").unbind('click').on('click', function() {
            getConfirm("确认要删除该商品", "取消", "删除");
            $(".confirm-btn-sure").click(function(){
                addLoading();
                $(this).parents('.confirm-bg').remove();
                document.removeEventListener('touchmove',touch, false);
                var cart_id = new Array();
                $("#shopInvalid").find("li").each(function(){
                    cart_id.push($(this).attr("data-goodsid"));
                });
                console.log(cart_id);
                function goods_checked(obj){
                    for(var i=0; i<cart_id.length; i++){
                        if(cart_id[i] == obj){
                            return true;
                        }
                    }
                }
                for(var i=0; i<shopdata_goods_list.length; i++){
                    if(goods_checked(shopdata_goods_list[i].goods_id)){
                        shopdata_goods_list.splice(i,1);
                    }
                }
                localStorage.shopping_cart = JSON.stringify(shopdata_goods_list);
                updataShopcartUnLogin();
            });
        });

        // 清空购物车
        $(".tab-alldelete").unbind('click').on('click', function() {
            getConfirm("确认清空购物车", "取消", "清空");
            $(".confirm-btn-sure").click(function(){
                addLoading();
                $(this).parents('.confirm-bg').remove();
                document.removeEventListener('touchmove',touch, false);
                localStorage.shopping_cart = '';
                $("#notEmptyCart").hide().siblings("#emptyCart").show();
                $(".nav-edit").remove();
                $(".tab-bot").remove();
                $("#shopNum").html('购物车(0)');
                getShopCartGoods();
            });
        }); 
    }

    // 获取购物车为空时猜你喜欢
    function getShopCartGoods(){
        var urlHeader = ajaxLink + "cart/get_cart_recommend.ajax";
        var dataParam; 
        // if(user_id && token){
        //     dataParam = 'user_id='+user_id+'&token='+token+'&goods_type=1&count='+countNum+'&start='+start;
        // } else {
            dataParam = 'goods_type=0&count='+countNum+'&start='+start;
            // dataParam = 'goods_type=0&count='+countNum+'&start='+start+'&user_id=001_67255395346000394_mem&token=MZGAAOGV2HCNJGBIPB1VBY7FNTIYJMAF';
        // }
        function sucGetShopCartGoods(response){
            // console.log(response);
            if(response.ret == 0) {
                var data = response.data.goods_list;
                console.log(data);
                getGoodsList(data, guessid);
            } else if(response.ret == 10009){
                sucGetShopCartGoodsToken();
            } else if(response.ret == 10003) {
                errorToken();
            } else {
                getTips(response.desp);
            }
        }
        ajaxWithHeader(urlHeader, dataParam, sucGetShopCartGoods);
    }
    function sucGetShopCartGoodsToken(){
        getAccessToken(user_id);
        token = localStorage.token;
        getShopCartGoods();
    }

    // 获取登录状态下购物车列表
    function getShopcart() {
        var urlHeader = ajaxLink + "v1/cart/list";
        var dataParam = "token=" + token + "&user_id=" + user_id;
        function sucGetShopcart(response) {
            console.log(response);
            if(response.ret == 0) {
                if(response.data == '') {
                    $("#notEmptyCart").hide().siblings("#emptyCart").show();
                    $("#shopNum").html("购物车(0)");
                    $(".nav-edit").remove();
                    $(".tab-bot").remove();
                    getShopCartGoods();
                    removeLoading();
                } else {
                    var shopData = response.data;
                    var houseData = shopData.warehouse;
                    var invalidData = shopData.invalid_goods_list || [];
                    var houseDataHtml = eachHouseData(shopData);
                    var invalidDataHtml = eachInvalidData(invalidData);
                    $("#shopNum").html("购物车("+shopData.cart_goods_num+")");
                    $("#shopGrup").html(houseDataHtml);
                    $("#shopInvalid").html(invalidDataHtml);
                    $("#totalNum").html(shopData.cart_goods_select_num);
                    $("#total").html("￥"+shopData.cart_goods_price.toFixed(2));
                    if(shopData.is_all_select == 1){
                        $("#checkAll").attr("checked", true);
                    } else {
                        $("#checkAll").attr("checked", false);
                    }
                    if($('#shopGrup').find('.shop-group-item').length == 0) {
                        $('#navEdit').hide();
                        $('.tab-allcheck').addClass('disabled');
                    } else {
                        $('#navEdit').show();
                    }
                    $('#notEmptyCart').show();
                    checkSelectNum();
                    removeLoading();

                    $('.shop-cart-c').click(function(){
                        addLoading();
                        var activity_id = $(this).parents('.shop-cart').attr('data-activetyid');
                        var activity_type = $(this).parents('.shop-cart').attr('data-activetytype');
                        if(activity_type == '0') {
                            if (user_id && token) {
                                removeLoading();
                                window.location.href = '../activity/active_1.html?activity_id=' + activity_id + '&user_id=' + user_id + '&token=' + token;
                            } else {
                                removeLoading();
                                window.location.href = '../activity/active_1.html?activity_id=' + activity_id;
                            }
                        } else if(activity_type == '1') {
                            if (user_id && token) {
                                removeLoading();
                                window.location.href = '../activity/active_2.html?activity_id=' + activity_id + '&user_id=' + user_id + '&token=' + token;
                            } else {
                                removeLoading();
                                window.location.href = '../activity/active_2.html?activity_id=' + activity_id;
                            }
                        }
                    });
                    $("#checkAll").unbind('change').on('change', function(){
                        if($(this).parent('.tab-allcheck').hasClass('disabled')) return;
                        addLoading();
                        var cart_id = '';
                        $(this).parents(".tab-bot").siblings("#shopGrup").find("li").each(function(){
                            cart_id += $(this).attr("data-cartid");
                            cart_id += ',';
                        });
                        cart_id = cart_id.substring(0,cart_id.length-1);
                        if($(this).prop('checked')){ 
                            editSelect(cart_id, '0');
                        } else {
                            editSelect(cart_id, '1');
                        }
                    });
                    $(".check-house").unbind('change').on('change', function(){
                        addLoading();
                        var cart_id = '';
                        $(this).parents(".shop-group-item").find("li").each(function(){
                            cart_id += $(this).attr("data-cartid");
                            cart_id += ',';
                        });
                        cart_id = cart_id.substring(0,cart_id.length-1);
                        if($(this).prop('checked')){ 
                            editSelect(cart_id, '0');
                        } else {
                            editSelect(cart_id, '1');
                        }
                    });
                    $(".check-goods").unbind('change').on('change', function(e){
                        addLoading();
                        var cart_id = $(this).parents("li").attr("data-cartid");
                        if(!$(this).prop('checked')){ 
                            editSelect(cart_id, '0');
                        } else {
                            editSelect(cart_id, '1');
                        }
                    });

                    // 点击跳转商品详情
                    $(".item-left, .cart-goods").on("click", function(){
                        addLoading();
                        var goods_id = $(this).parents("li").attr("data-goodsid");
                        var item_id = $(this).parents("li").attr('data-itemid');
                        if(user_id && token) {
                            if(item_id) {
                                removeLoading();
                                // window.location.href="../goods/goodsDetails.html?goods_id="+goods_id+"&user_id="+user_id+"&token="+token+"&item_id="+item_id+'&mine=mine';
                                 window.location.href="../goods/goodsDetails.html?goods_id="+goods_id+"&user_id="+user_id+"&token="+token+'&mine=mine';
                            } else {
                                removeLoading();
                                window.location.href="../goods/goodsDetails.html?goods_id="+goods_id+"&user_id="+user_id+"&token="+token+'&mine=mine';
                            }
                        } else {
                            if(item_id) {
                                removeLoading();
                                // window.location.href="../goods/goodsDetails.html?goods_id="+goods_id+"&item_id="+item_id+'&mine=mine';
                                window.location.href="../goods/goodsDetails.html?goods_id="+goods_id+'&mine=mine';
                            } else {
                                removeLoading();
                                window.location.href="../goods/goodsDetails.html?goods_id="+goods_id+'&mine=mine';
                            }
                        }
                    });

                    // 关税显示隐藏
                    // $(".goods-rate").on("click", function() {
                    //     $(this).parent(".item-right").siblings(".shop-cart-rate-box").toggle();
                    //     if ($(this).parents("li").children(".shop-cart-rate-box").is(":hidden")) {
                    //         $(this).children("span").children(".icon-chevron-thin-up").hide();
                    //         $(this).children("span").children(".icon-chevron-thin-down").show();
                    //     } else {
                    //         $(this).children("span").children(".icon-chevron-thin-down").hide();
                    //         $(this).children("span").children(".icon-chevron-thin-up").show();
                    //     }
                    // });

                    // 编辑商品
                    $(".plus").on("click", function() { //增加商品数
                        addLoading();
                        var num = parseInt($(this).siblings("span").children("input").val());
                        var goods_num = num + 1;
                        var cart_id = $(this).parents("li").attr("data-cartid");
                        var goods_id = $(this).parents("li").attr("data-goodsid");
                        var item_id = $(this).parents("li").attr("data-itemid");

                        plusCart();
                        function plusCart(){
                            var urlHeader = ajaxLink + editCartNumAPI;
                            var dataParam = "cart_id=" + cart_id+ "&goods_id="+goods_id + "&item_id="+item_id + "&goods_num=" + goods_num + "&token=" + token + "&user_id=" + user_id;
                            function sucPlusCart(response){
                                console.log(response);
                                if(response.ret == 0) {
                                    getShopcartUpdate();
                                } else if(response.ret == 10009) {
                                    plusCartToken();
                                } else if(response.ret == 10003) {
                                    removeLoading();
                                    errorToken();
                                } else {
                                    removeLoading();
                                    getTips(response.desp);
                                }
                            }
                            ajaxWithHeader(urlHeader, dataParam, sucPlusCart,'POST');
                        }
                        function plusCartToken() {
                            getAccessToken(user_id);
                            token = localStorage.token;
                            plusCart();
                        }
                    });
                    $(".minus").on("click", function() { //减少商品数
                        addLoading();

                        var num = parseInt($(this).siblings("span").children("input").val());
                        if (num <= 1) {
                            getTips('已修改到最小值啦~');
                            console.log(num);
                            return;
                        } else {
                            var goods_num = num - 1;
                            var cart_id = $(this).parents("li").attr("data-cartid");
                            var goods_id = $(this).parents("li").attr("data-goodsid");
                            var item_id = $(this).parents("li").attr("data-itemid");
                            minusCart();
                            function minusCart(){
                                var urlHeader = ajaxLink + editCartNumAPI;
                                var dataParam = "cart_id=" + cart_id+ "&goods_id="+goods_id + "&item_id="+item_id+"&goods_num=" + goods_num + "&token=" + token + "&user_id=" + user_id;
                                function sucMinusCart(response){
                                    console.log(response);
                                    if(response.ret == 0) {
                                        getShopcartUpdate();
                                    } else if(response.ret == 10009) {
                                        minisCartToken();
                                    } else if(response.ret == 10003) {
                                        removeLoading();
                                        errorToken();
                                    } else {
                                        removeLoading();
                                        getTips(response.desp);
                                    }
                                }
                                ajaxWithHeader(urlHeader, dataParam, sucMinusCart,'POST');
                            }
                            function minisCartToken() {
                                getAccessToken(user_id);
                                token = localStorage.token;
                                minusCart();
                            }
                        }
                    });

                    $(".shop-group-item .goods-delete").on("click", function() {
                        var cart_id = $(this).parents("li").attr("data-cartid");
                        getConfirm("确认要删除我么？下一场不一定买到哦~", "留在购物车", "狠心删除");
                        $(".confirm-btn-sure").on("click", function(){
                            addLoading();
                            deleteGoods();
                            $(this).parents('.confirm-bg').remove();
                            document.removeEventListener('touchmove',touch, false);
                        });
                        function deleteGoods(){
                            var urlHeader = ajaxLink + delCartAPI;
                            var dataParam = 'cart_id='+cart_id+'&token=' + token + '&user_id=' + user_id;
                            function sucDeleteGoods(response) {
                                console.log(response);
                                if(response.ret == 0) {
                                    getShopcartUpdate();
                                } else if(response.ret == 10009) {
                                    sucDeleteGoodsToken();
                                } else if(response.ret == 10003) {
                                    removeLoading();
                                    errorToken();
                                } else {
                                    removeLoading();
                                    getTips(response.desp);
                                }
                            }
                            ajaxWithHeader(urlHeader, dataParam, sucDeleteGoods);
                        }
                        function sucDeleteGoodsToken (){
                            getAccessToken(user_id);
                            token = localStorage.token;
                            deleteGoods();
                        }

                    });

                    // 清空失效商品
                    $(".shop-invalid .invalid-clear").on('click', function() {
                        getConfirm("确认要删除该商品", "取消", "删除");
                        $(".confirm-btn-sure").click(function(){
                            addLoading();
                            deleteInvalidGoods();
                            $(this).parents('.confirm-bg').remove();
                            document.removeEventListener('touchmove',touch, false);
                        });
                        function deleteInvalidGoods(){
                            var cart_id = '';
                            $("#shopInvalid").find("li").each(function(){
                                cart_id += $(this).attr("data-cartid");
                                cart_id += ',';
                            });
                            cart_id = cart_id.substring(0,cart_id.length-1);
                            var urlHeader = ajaxLink + delCartAPI;
                            var dataParam = 'cart_id='+cart_id+'&token=' + token + '&user_id=' + user_id;
                            function sucDeleteInvalidGoods(response) {
                                if(response.ret == 0) {
                                    getShopcartUpdate();
                                } else if(response.ret == 10009) {
                                    sucDeleteInvalidGoodsToken();
                                } else if(response.ret == 10003) {
                                    removeLoading();
                                    errorToken();
                                } else {
                                    removeLoading();
                                    getTips(response.desp);
                                }
                            }
                            ajaxWithHeader(urlHeader, dataParam, sucDeleteInvalidGoods);
                        }
                        function sucDeleteInvalidGoodsToken (){
                            getAccessToken(user_id);
                            token = localStorage.token;
                            deleteInvalidGoods();
                        }
                    });

                    // 清空购物车
                    $(".tab-alldelete").unbind('click').on('click', function() {
                        getConfirm("确认清空购物车？", "取消", "清空");
                        $(".confirm-btn-sure").click(function(){
                            addLoading();
                            deleteAllGoods();
                            $(this).parents('.confirm-bg').remove();
                            document.removeEventListener('touchmove',touch, false);
                        });
                        function deleteAllGoods(){
                            var cart_id = '';
                             $("#notEmptyCart").find("li").each(function(){
                                cart_id += $(this).attr("data-cartid");
                                cart_id += ',';
                            });
                            cart_id = cart_id.substring(0,cart_id.length-1);
                            console.log(cart_id);
                            var urlHeader = ajaxLink + delCartAPI;
                            var dataParam = 'cart_id='+cart_id+'&token=' + token + '&user_id=' + user_id;
                            function sucDeleteAllGoods(response) {
                                if(response.ret == 0) {
                                    getShopcartUpdate();
                                } else if(response.ret == 10009) {
                                    sucDeleteAllGoodsToken();
                                } else if(response.ret == 10003) {
                                    removeLoading();
                                    errorToken();
                                } else {
                                    removeLoading();
                                    getTips(response.desp);
                                }
                            }
                            ajaxWithHeader(urlHeader, dataParam, sucDeleteAllGoods);
                        }
                        function sucDeleteAllGoodsToken (){
                            getAccessToken(user_id);
                            token = localStorage.token;
                            deleteAllGoods();
                        }
                    });  
                }
            } else if(response.ret == 10009) {
                getShopcartToken();
            } else if(response.ret == 10003) {
                removeLoading();
                errorToken();
            } else {
                $("#notEmptyCart").hide().siblings("#emptyCart").show();
                $("#shopNum").html("购物车(0)");
                $(".nav-edit").remove();
                $(".tab-bot").remove();
                // getShopCartGoods();
                removeLoading();
                getTips(response.desp);
            }
        }
        ajaxWithHeader(urlHeader, dataParam, sucGetShopcart);
    }

    function editSelect(cartIds, i){
        var urlHeader = ajaxLink + "v1/cart/edit-goods-select";
        var dataParam = "type=" + i + "&cart_id=" + cartIds + "&token=" + token + "&user_id=" + user_id;
        function sucEditSelect(response){
            console.log(response);
            if(response.ret == 0) {
                getShopcart();
            } else if(response.ret == 10009){
                sucEditSelectToken();
            } else if(response.ret == 10003) {
                removeLoading();
                errorToken();
            } else {
                removeLoading();
                getTips(response.desp);
                getShopcart();
            }
        }
        ajaxWithHeader(urlHeader, dataParam, sucEditSelect);
    }
    function sucEditSelectToken(){
        getShopcartToken();
        token = localStorage.token;
        editSelect();
    }

    function getShopcartToken(){
        getAccessToken(user_id);
        token = localStorage.token;
        getShopcart();
    }

    function getShopcartUpdate(){
        getShopcart();
    }

    function eachHouseData(data) {
           var data = data;
        var goods = data.warehouse.warehouse_groups.warehouse_groups_goods;
        var houseDataHtml = "";
//         for(var i = 0; i < data.length; i++) {
//             var checkHouse;
            var checkHouse = '<input type="checkbox" class="check-house" checked>';
//             if(data[i].warehouse_select == 1) {
//                 checkHouse = '<input type="checkbox" class="check-house" checked>';
//             } else if(data[i].warehouse_select == 0){
//                 checkHouse = '<input type="checkbox" class="check-house">';
//             }
//             var houseItemHtml = '<div class="shop-group-item" data-houseid="' + data[i].warehouse_id + '">'
//                               + '<div class="shop-title">'
//                               + '<div class="check-wrapper">' + checkHouse + '</div>'
//                               + '<div class="shop-title-content">'
//                               + '<span class="icon-icon_house"></span>'
//                               + '<a class="shop-title-name">' + data[i].warehouse_name + '</a>'
//                               + '</div>'
//                               + '</div>';
              var houseItemHtml = '<div class="shop-group-item" >'
                              + '<div class="shop-title">'
                              + '<div class="check-wrapper">' + checkHouse + '</div>'
                              + '<div class="shop-title-content">'
                              + '<span class="icon-icon_house"></span>'
                              + '<a class="shop-title-name">ICBC官方</a>'
                              + '</div>'
                              + '</div>';
            var houseGoodsHtml = eachHouseGoodsData(goods);
            houseItemHtml += houseGoodsHtml;
            houseItemHtml += '<div class="shop-bill">'
                           + '<div class="shop-bill-right">'
                           // + '<p class="m-b-13">￥<span class="houseTax">' + data[i].warehouse_tariff.toFixed(2) + '</span><span class="delete">(￥<span>5.20</span>)</span></p>'
                           + '<p class="m-b-13">-￥0</p>'
                           + '<p class="group-total">￥<span class="houseTotal">' + data.cart_goods_price.toFixed(2) + '</span><span class="red-arrow-up" style="display: none;"></span></p>'
                           + '</div>'
                           + '<div class="shop-bill-left">'
                           // + '<p class="m-b-13">本仓关税：</p>'
                           + '<p class="m-b-13">活动优惠：</p>'
                           + '<p>总计：</p>'
                           // + '<div class="rate-warn" style="display: none;">'
                           // + '<p>关税超过￥50.00就要交税！</p>'
                           // + '<span class="red-arrow-right"></span>'
                           // + '</div>'
                           + '</div>'
                           + '<p class="clear"></p>'
                           // + '<div class="shop-price-warn" style="display: none;"><p>抱歉，您已超过海关限额￥1000，请分次购买！</p></div>'
                           + '</div>'
                           + '</div>';
            houseDataHtml += houseItemHtml;
        return houseDataHtml;
    }

    function eachHouseGoodsData(data) {
        var houseGoodsHtml = '';
        // for(var i = 0; i < data.length; i++) {
            var houseGoodsItem = '';
            // if(data[i].activity_label == '满额减'){
            //     houseGoodsItem = '<div class="shop-cart" data-activetyid="' + data[i].activities_id + '" data-activetytype="' + data[i].groups_type + '">'
            //                    + '<div class="shop-cart-title">'
            //                    + '<span class="shop-cart-s sale-tag-red">满额减</span>'
            //                    + '<span class="shop-cart-n">' + data[i].activity_label2 + '<a class="shop-cart-c" href="javascript:void(0);">去凑单&gt;&gt;</a></span>'
            //                    + '</div>'
            //                    + '<ul class="shop-cart-list">';
            // } else if(data[i].activity_label == '已满额'){
            //     houseGoodsItem = '<div class="shop-cart" data-activetyid="' + data[i].activities_id + '" data-activetytype="' + data[i].groups_type + '">'
            //                    + '<div class="shop-cart-title">'
            //                    + '<span class="shop-cart-s sale-tag-pink">已满额</span>'
            //                    + '<span class="shop-cart-n">' + data[i].activity_label2 + '</span>'
            //                    + '</div>'
            //                    + '<ul class="shop-cart-list">';
            // } else {
                houseGoodsItem = '<div class="shop-cart">'
                               + '<ul class="shop-cart-list">';
            // }
            houseGoodsHtml += houseGoodsItem
            // var houseGoodsItemGoodsData = data[i].warehouse_groups_goods;
            var houseGoodsItemGoodsHtml = eachHouseItemGoodsData(data);
            houseGoodsHtml += houseGoodsItemGoodsHtml;
            houseGoodsHtml += '</ul></div>';
        // }
        return houseGoodsHtml;
    }

    function eachHouseItemGoodsData(data) {
        var itemGoodsHtml = '';
        for(var i = 0; i < data.length; i++) {
            var checkGoods;
            var goodsTaxrate = parseFloat(data[i].goods_price) * 100 * parseInt(data[i].goods_num) * parseInt(data[i].goods_taxrate) / 10000;
            goodsTaxrate = goodsTaxrate.toFixed(2);
            if(goodsTaxrate == 0.00) goodsTaxrate = 0;
            if(data[i].type == 1) {
                checkGoods = '<input type="checkbox" class="check-goods" checked>';
            } else if(data[i].type == 0){
                checkGoods = '<input type="checkbox" class="check-goods">';
            }
            // var checkGoods = '<input type="checkbox" class="check-goods" checked>';
            var itemGoodsEdit;
            var itemGoodsDel;
            if($(".nav-edit").text() == '完成'){
                itemGoodsEdit = '<div class="item-main">'
                          + '<div class="cart-goods" style="display:none;">'
                          + '<p>' + data[i].goods_name + '</p>'
                          + '<span>' + data[i].goods_standard + '</span>'
                          + '</div>'
                          + '<div class="cart-edit" style="display:block;">'
                          + '<div class="cart-edit-box">'
                          + '<label class="minus" itemId="'+data[i].item_id+'" goodsId="'+data[i].goods_id+'" >-</label>'
                          + '<span class="numinput"><input type="text" value="' + data[i].goods_num + '" ReadOnly></span>'
                          + '<label class="plus" itemId="'+data[i].item_id+'" goodsId="'+data[i].goods_id+'" >+</label>'
                          + '<p class="clear"></p>'
                          + '</div>'
                          // + '<p class="goods-stock">' + data[i].stock_status + '</p>'
                          + '</div>'
                          + '<div class="cart-price">￥<span>' + (data[i].goods_price*1).toFixed(2) + '</span></div>'
                          + '</div>';
                itemGoodsDel = '<div class="goods-delete" style="display: block;"><span class="icon-icon_delete">删除</span></div>';
            } else {
                itemGoodsEdit = '<div class="item-main">'
                          + '<div class="cart-goods">'
                          + '<p>' + data[i].goods_name + '</p>'
                          + '<span>' + data[i].goods_standard + '</span>'
                          + '</div>'
                          + '<div class="cart-edit">'
                          + '<div class="cart-edit-box">'
                          + '<label class="minus" itemId="'+data[i].item_id+'" goodsId="'+data[i].goods_id+'">-</label>'
                          + '<span class="numinput"><input type="text" value="' + data[i].goods_num + '" ReadOnly></span>'
                          + '<label class="plus" itemId="'+data[i].item_id+'" goodsId="'+data[i].goods_id+'">+</label>'
                          + '<p class="clear"></p>'
                          + '</div>'
                          // + '<p class="goods-stock">' + data[i].stock_status + '</p>'
                          + '</div>'
                          + '<div class="cart-price">￥<span>' + (data[i].goods_price*1).toFixed(2) + '</span></div>'
                          + '</div>';
                itemGoodsDel = '<div class="goods-delete"><span class="icon-icon_delete">删除</span></div>';
            }
            var attr_html;
            if(data[i].item_id && data[i].item_id.length > 0) {
                attr_html = '<li data-goodsid="' + data[i].goods_id + '"  data-cartid="' + data[i].cart_id + '" data-itemid="' + data[i].item_id + '">';
            } else {
                attr_html = '<li data-goodsid="' + data[i].goods_id + '"  data-cartid="' + data[i].cart_id + '">';
            }
            var itemGoods = attr_html
                          + '<div class="check-wrapper">' + checkGoods + '</div>'
                          + '<div class="item-left">'
                          + '<img src="' + data[i].goods_img + '"></div>'
                          + itemGoodsEdit 
                          + '<div class="item-right">'
                          + '<div class="goods-num">'
                          + '<p class="goods-num-item">'
                          + '<span class="goods-num-exceed" style="display: none;"><i class="icon-icon_warn2"></i><i class="red-arrow-up"></i></span>'

                          + '</p>'
                          + '<p class="cart-product-warn-con"><span style="display: none;">购买数量大于库存数，请修改！</span></p>'
                          + '</div>'
                          + itemGoodsDel
                          + '<div class="goods-rate">'
                + '<span class="cart-product-num">x<span>' + data[i].goods_num + '</span>  </span>'
                          // + '<span>关税：￥<span class="tax-item">' + goodsTaxrate + '</span><i class="icon-chevron-thin-up"></i><i class="icon-chevron-thin-down"></i></span>'
                          // + '</div>'
                          // + '</div>'
                          // + '<p class="shop-cart-rate-box">关税=不含税价格x件数x价格<br>本品使用税率为' + data[i].goods_taxrate + '%，订单关税≤50元才能免征哦！</p>'
                          + '</li>';
            itemGoodsHtml +=  itemGoods;
        }
        return itemGoodsHtml;
    }

    function eachInvalidData(data) {
        var data = data;
        var invalidHtml;
        var invalidGoods = '';
        if (data.length == 0) {
            invalidHtml = '';
        } else {
            for(var i = 0; i < data.length; i++) {
                var goodsTaxrate = parseFloat(data[i].goods_price) * 100 * parseInt(data[i].goods_num) * parseInt(data[i].goods_taxrate) / 10000;
                goodsTaxrate = goodsTaxrate.toFixed(2);
                if(goodsTaxrate == 0.00) goodsTaxrate = 0;
                invalidGoodshtml = '<li data-goodsid="' + data[i].goods_id + '"  data-cartid="' + data[i].cart_id + '">'
                                + '<div class="check-wrapper">'
                                + '<span class="icon-invalid"></span>'
                                + '</div>'
                                + '<div class="item-left">'
                                + '<img src="' + data[i].goods_img + '">'
                                + '</div>'
                                + '<div class="item-main">'
                                + '<div class="cart-goods">'
                                + '<p>' + data[i].goods_name + '</p>'
                                + '<span>' + data[i].goods_standard + '</span>'
                                + '</div>'
                                + '<div class="cart-price">￥<span>' + data[i].goods_price.toFixed(2) + '</span></div>'
                                + '</div>'
                                + '<div class="item-right">'
                                + '<div class="goods-num">'
                                + '<p class="goods-num-item"><span class="cart-product-num">x' + data[i].goods_num + '</span></p>'
                                + '</div>'
                                + '<div class="goods-delete invalid-clear">'
                                + '<span class="icon-icon_delete"></span>'
                                + '</div>'
                                // + '<div class="goods-rate">'
                                // + '<span>关税：￥<span class="tax-item">' + goodsTaxrate + '</span><i class="icon-chevron-thin-up"></i></span>'
                                // + '</div>'
                                + '</div>'
                                // + '<p class="shop-cart-rate-box">关税=不含税价格x件数x价格<br>本品使用税率为' + data[i].goods_taxrate + '%，订单关税≤50元才能免征哦！</p>'
                                + '</li>';
                invalidGoods += invalidGoodshtml;
            }
            invalidHtml= '<div class="shop-invalid" id="shopInvalid">'
                    + '<div class="shop-title">'
                    + '<div class="check-wrapper">'
                    + '<span class="icon-invalid"></span>'
                    + '</div>'
                    + '<div class="shop-title-content">'
                    + '<span class="shop-title-name">失效商品</span>'
                    + '<span class="invalid-clear">清空失效商品</span>'
                    + '</div>'
                    + '</div>'
                    + '<div class="shop-cart">'
                    + '<ul class="shop-cart-list">' + invalidGoods + '</ul>'
                    + '</div>'
                    + '</div>';
        }
        return invalidHtml;
    }


});

function shopEdit() {
    if ($(".nav-edit").html() == "编辑") {
        $(".nav-edit").html("完成");
        $(".shop-group-item").find(".cart-goods").hide().siblings(".cart-edit").show();
        $(".goods-delete").show();
        $(".tab-allcheck").hide().siblings(".tab-alldelete").show();
        $(".goods-num-exceed").hide();
        $(".cart-product-warn-con").hide();
        $(".tab-right-but").css("background-color", "#ccc !important");
    } else {
        $(".nav-edit").html("编辑");
        $(".shop-group-item").find(".cart-goods").show().siblings(".cart-edit").hide();
        $(".goods-delete").hide();
        $(".tab-allcheck").show().siblings(".tab-alldelete").hide();
    }
}
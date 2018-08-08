
$(function () {

    var paramDic = getUrlString();
    var type = paramDic["type"];
    var user_id = paramDic["user_id"];
    var token = paramDic["token"];
    var stages = paramDic["stages"];
    var goods_id = paramDic["goods_id"];
    var item_id = paramDic["item_id"];
    var goods_num = paramDic["goods_num"];
    var order_id = paramDic["order_id"];
    var order_status_code = paramDic["order_status_code"];
    // var order_status_code = '100';
    var oederSubtype = paramDic["oederSubtype"];
    var back = document.getElementById("backapp");
    var couponBox = document.getElementById("couponBox");
    var goodsBox = document.getElementById("goodsBox");
    var billBbox = document.getElementById("billBbox");
    var addressBos = document.getElementById("addressBos");
    var address_id;
    var coupon_id;
    var coupon_txt;
    var ticket_id;
    var ticket_head;
    var ticket_txt;
    var goods_name;
    var operateType;
    var orderInfoAPI = 'v1/order/get-order-info';
    var createOrderAPI = 'v1/order/create-order';
    // 原生返回
    back.onclick = function () {
        if (type == "ios") {
            window.location.href = "ios://back";
        } else if (type == "Android") {
            JSkit.back();
        } else {
            // var index = localStorage.orderSubmit_index;
            // window.history.go(-index);
            window.location.href = "/#/category/";
        }
    };

    var code;
    function createCode(){
        code = '';
        var codeLength = 4;

        var random = new Array(0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R', 'S','T','U','V','W','X','Y','Z');

        for(var i = 0; i < codeLength; i++){

             var index = Math.floor(Math.random()*36);

             code += random[index]; 
        }
        $('#verify-code').text(code)
    }

    function validate(){
        var oValue = $('#verify-code-input').val().toUpperCase();
        if(oValue ==0 || oValue != code){
            createCode();
            return false;
        }else{
            return true;
        }
    }



    // 收货地址
    if (localStorage.addressId && localStorage.addressId != '') {
        address_id = localStorage.addressId;
    }

    // 新增状态
    if (localStorage.operateType && localStorage.operateType != '') {
        operateType = localStorage.operateType;
    }

    //优惠券
    if (localStorage.couponId && localStorage.couponTxt) {
        if (localStorage.couponId != '' && localStorage.couponTxt != '') {
            coupon_id = localStorage.couponId;
            coupon_txt = localStorage.couponTxt;
            $("#couponBox").find("span").text(coupon_txt).addClass('main01');
        }
    }

    // 发票信息 
    if (localStorage.ticketHead) {
        $("#billBbox").find("span").text(localStorage.ticketHead);
    }

    getOrderInfo(); //获取订单信息
    //获取订单信息方法----------1
    function getOrderInfo() {
        var urlHeader = ajaxLink + orderInfoAPI;
        var dataParam;
        if (oederSubtype == '0') {
            dataParam = "user_id=" + user_id + "&token=" + token + "&type=0";
        } else if (oederSubtype == '1') {
            dataParam = "order_id=" + order_id + "&order_state=" + order_status_code + "&user_id=" + user_id + "&token=" + token + "&type=1";
        } else if (oederSubtype == '2') {
            dataParam = "user_id=" + user_id + "&token=" + token + "&type=2&item_id=" + item_id + "&amount=" + goods_num;
        }
        if (coupon_id && coupon_id != '') {
            dataParam = dataParam + "&coupon_id=" + coupon_id;
        }
        if (address_id && address_id != '') {
            dataParam = dataParam + "&address_id=" + address_id;
        }
        if (stages) {
            dataParam += "&stages=" + stages;
        }

        createCode();
        //成功后执行的方法
        function sucOrderInfo(response) {
            console.log(response);
            if (response.ret == 0) {
                var data = response.data;
                goods_name = data.orderConfirmBeanList.orderConfirmDetailForms[0].goodsName;
                localStorage.goodsList_orderSub = JSON.stringify(data.orderConfirmBeanList);
                localStorage.couponList_orderSub = JSON.stringify(data.mapList);
                if (stages) {
                    switch (stages) {
                        case 'threePrice': 
                            $('#goodsFqAmount').html(getFq(data.totalPayMoney, 3));
                            break;
                        case 'sixPrice':
                            $('#goodsFqAmount').html(getFq(data.totalPayMoney, 6));
                            break;
                        case 'ninePrice':
                            $('#goodsFqAmount').html(getFq(data.totalPayMoney, 9));
                            break;
                        case 'twelvePrice':
                            $('#goodsFqAmount').html(getFq(data.totalPayMoney, 12));
                            break;
                        case 'eighteenPrice':
                            $('#goodsFqAmount').html(getFq(data.totalPayMoney, 18));
                            break;
                        case 'twentyFourPrice':
                            $('#goodsFqAmount').html(getFq(data.totalPayMoney, 24));
                            break;

                    }
                    $('.submitFq').show();
                }
                if (data.ticket_info == undefined || data.ticket_info == '' || data.ticket_info.length == 0) {

                }else{
                    localStorage.ticketType  = data.ticket_info.type;
                    localStorage.ticketHead  = data.ticket_info.title;
                    localStorage.ticketEmail = data.ticket_info.email;
                    localStorage.ticketNo    = data.ticket_info.number;
                    $("#billBbox").find("span").text(localStorage.ticketHead);
                }
                orderInfo(data);
                getGoodsInfo(data);
                $("#wrapCon").show();
            } else if (response.ret == 10009) {
                sucGetToken(getOrderInfo);
            } else if (response.ret == 10003) {
                errorToken();
            } else {
                getTips(response.desp);
            }
        }

        //调用ajax
        ajaxWithHeader(urlHeader, dataParam, sucOrderInfo);
    }


    // 优惠券
    // couponBox.onclick = function () {
    //     localStorage.orderSub_url = window.location.href;
    //     localStorage.orderSubmit_index = parseInt(localStorage.orderSubmit_index) + 1;
    //     window.location.href = "../coupon/coupon_order.html?user_id=" + user_id + "&token=" + token;
    // };
    // 商品列表
    // goodsBox.onclick = function () {
    //     window.location.href = "orderSub_goods.html";
    // };
    // 发票信息
    billBbox.onclick = function () {
        localStorage.orderSub_url = window.location.href;
        localStorage.orderSubmit_index = parseInt(localStorage.orderSubmit_index) + 1;
        window.location.href = "orderBill.html?user_id=" + user_id + "&token=" + token;
    };
    //收货地址
    addressBos.onclick = function () {
        localStorage.orderSub_url = window.location.href;
        localStorage.orderSubmit_index = parseInt(localStorage.orderSubmit_index) + 1;
        window.location.href = "orderAddress_orderSub.html?user_id=" + user_id + "&token=" + token;
    };

    $("#orderSubBtn").on('touchend', function () {
        getOrderSub();
    });
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
    //加载页面信息---1
    function orderInfo(data) {
        $('#goodsAmount').html('￥' + data.totalGoods.toFixed(2)); //总金额
        // $('#freight').html('￥' + data.freight.toFixed(2)); //运费
        // $('#customs').html('￥' + data.customs.toFixed(2)); //关税

        $('#freight').html('￥' + (0).toFixed(2)); //运费
        $('#customs').html('￥' + (0).toFixed(2)); //关税

        $('#goodsNum').html('共' + data.amount + '件');
        // $('#activities_amount').html('-￥' + data.promotionSumMoney.toFixed(2)); //活动优惠金额
        // $('#coupon_discount').html('-￥' + data.discountAmount.toFixed(2)); //优惠券金额
        // $('#coupon_discount').html('-￥' + data.discountAmount.toFixed(2)); 
         $('#coupon_discount').html('-￥' + data.preferentialPrice.toFixed(2)); //活动优惠金额
        $('#coupon_discount').html('-￥' + (0).toFixed(2)); //优惠券金额

        var coupon_html = '<option data-price="0" value="">请选择优惠券</option>';
        if (data.coupon_code_list.length > 0){
            for (var coupon = 0; coupon < data.coupon_code_list.length; coupon++) {
                coupon_html += '<option data-price="'+data.coupon_code_list[coupon].price+'" value="'+data.coupon_code_list[coupon].code+'">'+data.coupon_code_list[coupon].desc+'</option>';
            }
            $('#coupon_list').html(coupon_html);
        }


        $('#real_payment').html('￥' + data.totalPayMoney.toFixed(2)); //实付款
        $('#old_coupon_discount').val(parseFloat($('#coupon_discount').html().substring(2)));
        $('#old_real_payment').val(parseFloat($('#real_payment').html().substring(1)));
        if (data.memberAddressFormBean == undefined || data.memberAddressFormBean == '' || data.memberAddressFormBean.length == 0) {
            var address_str = '<p class="address-empty">请选择收货地址</p><i class="icon-chevron-thin-right iconRight ion-ios-arrow-right"></i>';
            $("#addressBos").html(address_str);
        } else {
            var address_str = '<p class="addrp">'

                +
                '<span class="left-name word09">' + data.memberAddressFormBean.consignee + '</span>'

                +
                '<span class="right-tel word09">' + data.memberAddressFormBean.mobile + '</span>' +
                '</p>' +
                '<p class="addra">' +
                '收货地址：' + data.memberAddressFormBean.provinceName + '(省) ' +
                data.memberAddressFormBean.cityName + '(市) ' +
                data.memberAddressFormBean.areaName + ' ' + data.memberAddressFormBean.address +
                '</p>' +
                '<i class="icon-chevron-thin-right iconRight ion-ios-arrow-right"></i>';
            $("#addressBos").attr("data-addressid", data.memberAddressFormBean.id).html(address_str);
        }
    }

    //商品信息加载-------2
    function getGoodsInfo(data) { //
        dataList = data.orderConfirmBeanList;
        var str = '';
        console.log(dataList);
        // for (var i = 0; i < dataList.length; i++) {
        //     for (var j = 0; j < dataList[i].orderConfirmDetailForms.length; j++) {
        //         str += '<div class="item-list-box"><div class="item-list"><img src="' + dataList[i].orderConfirmDetailForms[j].middlePicturePath + '">' +
        //             '<div  class="item-content"><div class="goods-name">' +
        //             dataList[i].orderConfirmDetailForms[j].itemName +
        //             '</div><div class="goods-price">¥' + dataList[i].orderConfirmDetailForms[j].price +
        //             '</div><div  class="goods-amount">x ' +
        //             dataList[i].orderConfirmDetailForms[j].amount +
        //             '</div></div></div> </div>';
        //     }
        // }



            for (var j = 0; j < dataList.orderConfirmDetailForms.length; j++) {
                str += '<div class="item-list-box"><div class="item-list"><img src="' + dataList.orderConfirmDetailForms[j].middlePicturePath + '">' +
                    '<div  class="item-content"><div class="goods-name">' +
                    dataList.orderConfirmDetailForms[j].goodsName +
                    '</div><div class="goods-price">¥' + ( stages ? (data.totalPayMoney/data.amount).toFixed(2) : dataList.orderConfirmDetailForms[j].price) +
                    '</div><div  class="goods-amount">x ' +
                    dataList.orderConfirmDetailForms[j].amount +
                    '</div></div></div> </div>';
            }
        
        $('#imgList').html(str);
        // if($('#imgList img').length > 3){
        //     $("#imgList img:eq(2)").nextAll().hide();
        // }
    }

    //遍历数组求和
    function getAryTotal(ary) {
        for (var i = 0; i < ary.length; i++) {
            total += ary[i];
        }
        return total;
    }


    //提交订单
    function getOrderSub() {
        //alert("提交订单");
        var address_id_sub = $("#addressBos").attr("data-addressid");
        if (address_id_sub == undefined) {
            getTips('请选择收货地址');
            return;
        }
        if (!localStorage.ticketHead || !localStorage.ticketEmail) {
            getTips('请填写发票信息');
            return;
        }
        if (localStorage.ticketType == 1 && !localStorage.ticketNo) {
            getTips('发票信息不完整');
        }

        if(!validate()){
            getTips('验证码不正确，请重新输入');

            return;
        }
        
        addLoading();
        var urlHeader = ajaxLink + createOrderAPI;
        var dataParam;
        if (oederSubtype == '0') {
            dataParam = "user_id=" + user_id + "&token=" + token + "&address_id=" + address_id_sub;
        } else if (oederSubtype == '1') {
            dataParam = "order_id=" + order_id + "&order_state=" + order_status_code + "&user_id=" + user_id + "&token=" + token + "&address_id=" + address_id_sub + "&immediately=yes";
        } else if (oederSubtype == '2') {
            dataParam = "user_id=" + user_id + "&token=" + token + "&goods_id=" + goods_id + "&item_id=" + item_id + "&goods_num=" + goods_num + "&amount="+goods_num+"&address_id=" + address_id_sub + "&immediately=yes&goods_name=" + goods_name+"&type=2&installment_type="+stages;
        }
        var code = $('#coupon_list').val();
        if (code && code != '') {
            dataParam += "&code=" + code;
        }

        if (localStorage.ticketType == 1) {
            dataParam += "&ticketType=";
            dataParam += localStorage.ticketType;
            dataParam += "&ticketHead=";
            dataParam += localStorage.ticketHead;
            dataParam += "&ticketNo=";
            dataParam += localStorage.ticketNo;
            dataParam += "&ticketEmail=";
            dataParam += localStorage.ticketEmail;
            dataParam += "&operateType=";
            dataParam += localStorage.operateType;
            dataParam += "&ticketId=";
            dataParam += localStorage.ticketId;
        } else if (localStorage.ticketType == 0) {
            dataParam += "&ticketType=";
            dataParam += localStorage.ticketType;
            dataParam += "&ticketHead=";
            dataParam += localStorage.ticketHead;
            dataParam += "&ticketEmail=";
            dataParam += localStorage.ticketEmail;
            dataParam += "&operateType=";
            dataParam += localStorage.operateType;
            dataParam += "&ticketId=";
            dataParam += localStorage.ticketId;
            // dataParam += "&ticketNo=";
            // dataParam += user_id;
        }

     

        if (coupon_id && coupon_id != '') {
            dataParam = dataParam + "&coupon_id=" + coupon_id;
        }
        if (stages) {
            dataParam += "&stages=" + stages;
        }

        //成功后执行的方法
        function sucGetOrderSub(response) {
            // console.log(response);
            //alert(JSON.stringify(response))
            // window.location.reload();
            if (response.ret == 0) {



                $(document.body).html(response.data.form);
                // localStorage.addressId = '';
                // localStorage.couponId = '';
                // localStorage.couponTxt = '';
                // localStorage.ticketType = '';
                // localStorage.ticketHead = '';
                // localStorage.ticketNo = '';
                // localStorage.ticketEmail = '';
                // var orderSub_id = response.data;
                // var orderSub_price_html = $("#real_payment").text();
                // var orderSub_price = orderSub_price_html.substring(1, orderSub_price_html.length);
                // removeLoading();
                // localStorage.orderSubmit_index = parseInt(localStorage.orderSubmit_index) + 1;
                // if (stages) {
                //     window.location.href = "orderPay.html?order_id=" + orderSub_id + "&user_id=" + user_id + "&token=" + token + "&order_price=" + orderSub_price + '&stages=' + stages;
                //     return
                // }
                // window.location.href = "orderPay.html?order_id=" + orderSub_id + "&user_id=" + user_id + "&token=" + token + "&order_price=" + orderSub_price;


            } else if (response.ret == 10009) {
                sucGetToken(getOrderSub);
            } else if (response.ret == 10003) {
                removeLoading();
                errorToken();
            } else {
                removeLoading();
                getTips(response.desp);
            }
        }

        //调用ajax
        ajaxWithHeader(urlHeader, dataParam, sucGetOrderSub,'POST');
    }

    $('#coupon_list').change(function () {
        var price = $("#coupon_list").find("option:selected").attr("data-price");
        var old_coupon_discount = $('#old_coupon_discount').val();
        var old_real_payment = $('#old_real_payment').val();
        $('#coupon_discount').html('-￥' + (parseFloat(old_coupon_discount)+parseFloat(price)).toFixed(2));
        $('#real_payment').html('￥' + (parseFloat(old_real_payment)-parseFloat(price)).toFixed(2));
    })
});
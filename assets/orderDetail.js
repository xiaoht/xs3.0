$(function(){
  // alert(window.location.href);
  var orderDetailAPI = 'v1/order/get-order-details';
  var orderNumAPI = 'v1/order/get-order-list-num';
  var orderListAPI = 'v1/order/get-info-list';
  var cancelOrderAPI = 'v1/order/cancel-order';
  var orderRefundAPI = 'v1/order/refund';
  var applyRefundAPI = 'v1/order/apply-refund';
  var orderPayAPI = 'v1/order/now-pay';
  var confirmOrderAPI = 'v1/order/confirm-order';
  var ajaxLink = 'https://api.xsbuy.cn/';
  var paramDic = getUrlString();
  var type = paramDic["type"];
  var order_id = paramDic["order_id"];
  var user_id = paramDic["user_id"];
  var token = paramDic["token"];
  var order_search_type = paramDic["order_search_type"];
  var back = document.getElementById("backapp");
  var order_pay_price;
  var order_status;
  var order_status_code;
  var goods_aftersale_state;
  var order_pay_price;
  var order_goods_list;
  var stages='';
  var invoiceUrl;
  var invoiceTittle;
  var invoiceTaxNo;

  var params = paramDic["params"];
  if(params){
    $(".wrapper").addClass("come-from-app")
    order_detail();
    // localStorage.clear();
    // window.location.disableReload = true;
    // localStorage.token = '';
    // doLogin();
    // var intervalId = window.setInterval(function () {
    //   if(localStorage.token){
    //     order_detail();
    //     window.clearInterval(intervalId);
    //   }
    // }, 1000);

  }else{
    order_detail();
  }
  back.onclick = function(){
    if (paramDic.hasOwnProperty('mine') && paramDic['mine'] == 'close') {
      hybrid_app.back();
    } else {
      window.location.href = '/modules/views/HTML/order/orderList.html';
    }
    // if(type=="ios"){
    //   window.location.href="ios://back";
    // } else if (type=="Android") {
    //   JSkit.back(); 
    // } else {
    //   if(params){
    //     // window.location.href='/';
    //     hybrid_app.back();
    //   }else{
    //     window.location.href='/modules/views/HTML/order/orderList.html';
    //   }

    // }
  };
  
  window.phone = function(tel){
    hybrid_app.callPhoneNumber(tel || '021-60310465');
    return false;
  }

  function order_detail() {
    addLoading();
    var urlHeader = ajaxLink + orderDetailAPI;
    if(order_search_type) {
      var dataParam = "order_id=" + order_id + "&token=" + token + "&user_id=" + user_id + '&order_search_type=1&mine=mine';
    } else {
      var dataParam = "order_id=" + order_id + "&token=" + token + "&user_id=" + user_id+'&mine=mine';
    }
    if(params){
      urlHeader = ajaxLink + "order/get_e_order_details.ajax";
      dataParam = "params=" + encodeURIComponent(params) + "&token=" + token + "&user_id=" + user_id;
    }
    function get_order_detail(response){
      // console.log(response);
      if(response.ret == 0) {
        var data = response.data[0];
        order_id = data.order_id;
        order_pay_price = data.total_amount;
        order_status = data.order_status;
        order_pay_money = data.total_amount;
        order_status_code = data.order_status_code;

        invoiceUrl=data.invoiceUrl;
        invoiceTittle=data.invoiceTittle;
        // invoiceTaxNo=data.invoiceTaxNo;
        $('#invoiceTaxNo').html(invoiceTaxNo);
          $('#invoiceTittle').html(invoiceTittle);
          // if(invoiceTaxNo){
          //     $('#invoiceTaxNo').html(invoiceTaxNo);
          // }else{
          //     $('#invoiceTaxNoP').hide();
          // }
          // if(invoiceUrl){
          //     $("#invoiceUrl").attr("href",invoiceUrl);
          // }else{
          //     $("#invoiceUrlSP").empty();
          //     $("#invoiceUrlSP").html("请签收7日后再下载");
          // }

          goods_aftersale_state = data.goods_aftersale_state;
        order_goods_list = data.order_goods_list;
        if (data.order_status == '40' || data.order_status == '50' || data.order_status == '50') {
          $('#orderExplan').find('.icon-deal').hide().siblings('.icon-icon_right2').show();
        } else {
          $('#orderExplan').find('.icon-deal').show().siblings('.icon-icon_right2').hide();
        }
        var order_status_txt=data.order_status_code;
        var order_btns='',orderTips='';
        if(data.order_status == 0) {
          // function getEPayResult() {
          //   addLoading();
          //   var urlHeader = ajaxLink + "order/epay/getEPayResult.ajax";
          //   var dataParam = 'orderId='+order_id;
          //   // if(user_id && token){
          //   //     dataParam = 'user_id='+user_id+'&token='+token+'&goods_type=0&count='+countNum+'&start='+start;
          //   // } else {
          //   //     dataParam = 'goods_type=0&count='+countNum+'&start='+start;      }
          //   function sucGetEPayResult(response){
          //     removeLoading();
          //     // debugger;
          //     if(response.success && response.result && response.result.payMoney) {

          //       window.location.reload();
          //     } else {

          //     }
          //   }
          //   ajaxWithHeader(urlHeader, dataParam, sucGetEPayResult);
          // }

        /**
        * 退款按钮
        */

          // getEPayResult();
          order_status_txt = '待付款';
          order_btns = '<span class="btn-gray">取消订单</span><span class="btn-red">立即付款</span>';
        } else if(data.order_status == 1) {
          order_status_txt = '已付款，待发货';
          order_btns = '<span class="btn-gray">申请退款</span>';

        } else if(data.order_status == 2){
          order_status_txt = '已发货，待收货';
          // order_btns = '<span class="btn-gray">物流信息</span><span class="btn-pink">确认收货</span>';
          order_btns = '<a href="/modules/views/HTML/order/express_info.html?express_name='+data.express_name+'&express_number='+data.express_number+'"><span class="btn-gray2">查看物流</span></a><span class="btn-pink">确认收货</span> ';
          orderTips =  ' <p class="order-bill-tit">已发货的订单暂时不支持直接申请退款</p><div class="order-bill-con"><p>联系客服：021-60310465 <img src="/img/phone.png" style="width: .8rem;height: .8rem;"onclick="phone()" /></p></div>'
        // } else if(data.order_status == '11'){
        //   order_status_txt = '待实名认证';
        //   order_btns = '<span class="btn-validate">实名认证</span>';
        }else if(data.order_status == 3){
          order_status_txt = '交易成功';
          order_btns = '';
          if(data.order_evalue_status == '0'){
            if(data.goods_aftersale_state == '0') {
              // order_btns = '<span class="btn-gray">删除订单</span><span class="btn-gray">再次购买</span>';
              order_btns = '';
            } else if(data.goods_aftersale_state == '1') {
              order_btns = '';
            }
          } else if(data.order_evalue_status == '1'){
            if(data.goods_aftersale_state == '0') {
              // order_btns = '<span class="btn-gray">删除订单</span><span class="btn-gray">再次购买</span>';
              order_btns = '';
            } else if(data.goods_aftersale_state == '1') {
              order_btns = '';
            }
          } else if(data.order_evalue_status == '2'){
            if(data.goods_aftersale_state == '0') {
              // order_btns = '<span class="btn-gray">删除订单</span><span class="btn-gray">再次购买</span>';
               order_btns = '';
            } else if(data.goods_aftersale_state == '1') {
              order_btns = '';
            }
          }
          order_btns += '<a href="/modules/views/HTML/order/express_info.html?express_name='+data.express_name+'&express_number='+data.express_number+'"><span class="btn-gray2">查看物流</span></a>';
        } else if(data.order_status == 4){
          order_status_txt = '交易关闭';
          // order_btns = '<span class="btn-gray">删除订单</span><span class="btn-gray">立即购买</span>';
          order_btns = '';
        // } else if(data.order_status == '100'){
        //   order_status_txt = '交易失败';
        //   order_btns = '<span class="btn-gray">删除订单</span><span class="btn-gray">立即购买</span>';
        }  else if(data.order_status == '5'){
            order_status_txt = '退款申请审核中';
            // order_btns = '<span class="btn-gray">删除订单</span><span class="btn-gray">立即购买</span>';
            // order_btns = '<span class="btn-gray">立即购买</span>';
          }  else if(data.order_status == '6'){
            order_status_txt = '退款申请审核通过';
            //xs2.0更新需求
            //此处不需要客户点立即退款,由后台直接做处理  后台那边操作成功后直接状态变成8
            order_btns = '<span class="btn-gray">立即退款</span>';
          }  else if(data.order_status == '7'){
            order_status_txt = '退款申请审核失败';
            // order_btns = '<span class="btn-gray">删除订单</span><span class="btn-gray">立即购买</span>';
            // order_btns = '<span class="btn-gray">立即购买</span>';
          }  else if(data.order_status == '8'){
            order_status_txt = '退款成功';
            // order_btns = '<span class="btn-gray">删除订单</span><span class="btn-gray">立即购买</span>';
            // order_btns = '<span class="btn-gray">立即购买</span>';
          } 
         


        $('#orderTips').html(orderTips);
        $("#orderExplanStatus").html('订单状态：' + order_status_txt);
        $("#orderExplanNum").html('订单号：' + data.order_id);
        $("#orderExplanTime").html('订单时间：' + data.order_time);
        if(data.order_logistic_status == '' || data.order_logistic_status == null) {
          $('#orderLogistic').hide();
        } else {
          $('#orderLogisticStatus').html('物流信息：' + data.express_number ||  '暂无物流信息' );
          // $('#orderLogisticTime').html(data.order_logistic_time);
          // if(data.order_logistic_time == '') {
          //   $("#orderLogistic").find(".icon-chevron-thin-right").css("top", "15px");
          // }
        }
        $('#express-number').html(data.express_number == undefined ?  '暂无物流信息'  : data.express_number );
        $('#orderPaydetail').html('支付金额：￥' + data.total_amount + ' （'+order_status_txt +'）');
        // $('#orderPaydetail').html('支付金额：￥' + data.order_pay_price);
        var orderShipaddressHtml = ''
                                 + '<p style="font-weight: 600">' + data.order_receiver_name + '<span>' + data.order_receiver_tel + '</span></p>'
                                 + '<p>' + data.order_receiver_addr + '</p>';
        if(data.order_receiver_name == '' && data.order_receiver_addr == '' && data.order_receiver_tel == ''){
          $('#orderShipaddress').remove();
        } else {
          $('#orderShipaddress').html(orderShipaddressHtml);
        }
        $('#orderBillBtns').empty().append(order_btns);
        // var house_data = data.house_list;
        var houseListHtml = "";
        // for(var i = 0; i < house_data.length; i++) {
          houseListHtml += '<div class="order-module-house" data-houseid="1">'
                        + '<div class="order-module-house-tit">'
                        + '<p>Icbc</p>'
                        + '</div>';
          // var goods_list_data = house_data[i].order_goods_list;
          houseListHtml += eachGoodsList(data.order_goods_list);
          houseListHtml += '</div>';
          console.log(houseListHtml);
        // }
        $("#orderModule").html(houseListHtml);
        $('#orderPri').html('￥' + data.total_amount);
        $('#orderFare').html('￥ 0.00' );

        if(data.bankOrderId){
          $('#bankOrderId').html(data.bankOrderId);
          $('#ecouponAmt').html('￥' + data.ecouponAmt);
          $('#bankDiscAmt').html('￥' + data.bankDiscAmt);
          $('#pointAmt').html('￥' + data.pointAmt);
        }else{
          $(".payInfo").hide();
        }

        if(data.stages){
          $(".fqAmt").show();
          stages = data.stages; 
          $("#fqAmt").html(getFq(data.total_amount, data.stages))
        }

        // $('#orderDuty').html('￥' + data.order_pay_taxes);
        removeLoading();

        // 商品详情跳转
        $(".item-left, .item-main p, .item-main .goods-stand").click(function(){
          addLoading();
          var goods_id = $(this).parents(".order-goods-item").attr("data-goodsid");
          var item_id = $(this).parents(".order-goods-item").attr("data-itemid");
          if(item_id) {
            removeLoading();
            window.location.href="../goods/goodsDetails.html?user_id=" + user_id + "&goods_id=" + goods_id+'&mine=mine';
          } else {
            removeLoading();
            window.location.href="../goods/goodsDetails.html?user_id=" + user_id + "&goods_id=" + goods_id+'&mine=mine';
          }
        });

        // 物流信息
        // $("#orderLogistic").on('touchend', function(){
        //   window.location.href="order_tracking.html?user_id=" + user_id + "&token=" + token + "&order_id=" + order_id;
        // });

        // // 实名认证
        // $(".btn-validate").on('touchend', function(){
        //   window.location.href="nameVarified.html?token=" + token + "&user_id=" + user_id + "&order_id=" + order_id;
        // });
        
        // 立即付款
        $(".btn-red").on('touchend', function(){
          addLoading();
          var order_price;
          getOrderPrice();
          function getOrderPrice(){
            var urlHeader = ajaxLink + orderPayAPI;
            var dataParam = "order_id=" + order_id + "&token=" + token + "&user_id=" + user_id;

            function sucGetOrderPrice(response){
              console.log(response);
              if(response.ret == 0){
                $(document.body).append(response.data.form);
                // order_price = response.data.order_pay_price;
                // localStorage.orderSubmit_index = 1; 
                // localStorage.orderSubmit_Url = window.location.href;
                // removeLoading();
                // if (stages!==''){
                //   window.location.href = "orderPay.html?token=" + token + "&user_id=" + user_id + "&order_id=" + order_id + "&order_price=" + order_price + "&stages="+stages;
                // }else{
                //   window.location.href = "orderPay.html?token=" + token + "&user_id=" + user_id + "&order_id=" + order_id + "&order_price=" + order_price;
                // }
                
              } else if(response.ret == 10009) {
                removeLoading();
                sucGetToken(getOrderPrice);
              } else if(response.ret == 10003) {
                removeLoading();
                errorToken();
              } else {
                removeLoading();
                getTips(response.desp);
              }
            }
            ajaxWithHeader(urlHeader, dataParam, sucGetOrderPrice,'POST');
          }
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
        // 确认收货
        $(".btn-pink").on('touchend', function(){

          var orderbtnitem = $(this).parents(".order-btn");
          var orderStatus = $(this).parents(".order-item").find(".order-status");
          var orderItem = $(this).parents(".order-item");
          getConfirm("确认收到该商品", "取消", "收到");
          $(".confirm-btn-sure").click(function(){
            addLoading();
            confirmReceive();
            function confirmReceive(){
              var urlHeader = ajaxLink + confirmOrderAPI;
              var dataParam = "order_id=" + order_id + "&token=" + token + "&user_id=" + user_id;
              function sucConfirmReceive(response){
                if(response.ret == 0){
                  order_detail();
                } else if(response.ret == 10009) {
                  removeLoading();
                  confirmReceiveToken();
                } else if(response.ret == 10003) {
                  removeLoading();
                  errorToken();
                } else {
                  removeLoading();
                  getTips(response.desp);
                }
              }
              ajaxWithHeader(urlHeader, dataParam, sucConfirmReceive,'POST');
            }
            function confirmReceiveToken(){
              getShopcartToken();
              token = localStorage.token;
              confirmReceive();
            }
            $(this).parents('.confirm-bg').remove();
            document.removeEventListener('touchmove',touch, false);
          });
        });

        $(".after-sale p").click(function(){
          addLoading();
          var apply_id = $(this).parent('.after-sale').attr("data-applyid");
          var apply_code = $(this).parent('.after-sale').attr("data-applycode");
          localStorage.applyBack_url = window.location.href;
          localStorage.applyBack_index = 1;
          switch (apply_code) {
            case  '00':
                var apply_details = {};
                apply_details["apply_order_id"] = order_id;
                apply_details["apply_goods_id"] = $(this).parents(".order-goods-item").attr("data-goodsid");
                apply_details["apply_order_detail_id"] = $(this).parents(".order-goods-item").attr("data-orderdetailid");
                apply_details["apply_goods_img"] = $(this).parents(".order-goods-item").find(".item-left").children("img").attr("src");
                apply_details["apply_goods_tit"] = $(this).parents(".order-goods-item").find(".goods-tit").text();
                apply_details["apply_goods_stand"] = $(this).parents(".order-goods-item").find(".goods-stand").children("span").text();
                apply_details["apply_goods_price"] = $(this).parents(".order-goods-item").find(".goods-pri").children("span").text();
                apply_details["apply_price"] = $(this).parents(".order-goods-item").attr("data-applyprice");
                apply_details["apply_goods_num"] = $(this).parents(".order-goods-item").find(".item-right").children("span").text();
                localStorage.apply_detail = JSON.stringify(apply_details);
                localStorage.applyBack_url = window.location.href;
                localStorage.applyBack_index = 1;
              window.location.href = "service_apply_check.html?apply_id="+apply_id+"&user_id="+user_id+"&token="+token;
              break;
            case  '10':
              window.location.href = "service_apply_failure.html?apply_id="+apply_id+"&user_id="+user_id+"&token="+token;
              break;
            case  '70':
              window.location.href = "service_apply_cancel.html?apply_id="+apply_id+"&user_id="+user_id+"&token="+token;
              break;
            case  '20':
              window.location.href = "service_apply_goodsReturn.html?apply_id="+apply_id+"&user_id="+user_id+"&token="+token;
              break;
            case  '30':
              window.location.href = "service_apply_goodsReview.html?apply_id="+apply_id+"&user_id="+user_id+"&token="+token;
              break;
            case  '60':
              window.location.href = "service_apply_review_failure.html?apply_id="+apply_id+"&user_id="+user_id+"&token="+token;
              break;
            case  '50':
              window.location.href = "service_apply_success.html?apply_id="+apply_id+"&user_id="+user_id+"&token="+token;
              break;
            case  '40':
              window.location.href = "service_apply_success.html?apply_id="+apply_id+"&user_id="+user_id+"&token="+token;
              break;
          }
          removeLoading();
        });

        // 灰色按钮点击
        $(".btn-gray").on('touchend', function(){
          var btntext = $(this).text();
          var orderbtnitem = $(this).parents(".order-btn");
          var orderStatus = $(this).parents(".order-item").find(".order-status");
          var orderItem = $(this).parents(".order-item");
          var address_id = $(this).parents(".order-item").attr("address_id");
          var order_state = $(this).parents(".order-item").attr("order_state");
          if(btntext == "删除订单") {
            getConfirm("确认删除订单?", "取消", "删除");
            $(".confirm-btn-sure").click(function(){
              addLoading();
              deleteOrder();
              function deleteOrder(){
                var urlHeader = ajaxLink + "order/delete_order.ajax";
                var dataParam = "order_id=" + order_id + "&token=" + token + "&user_id=" + user_id;
                function sucDeleteOrder(response){
                  console.log(response);
                  if(response.ret == 0){
                    removeLoading();
                    getTips('删除订单成功！');
                    setTimeout(function () {
                      if(paramDic["type"]=="ios"){
                        window.location.href="ios://back";
                      } else if (paramDic["type"]=="Android") {
                        JSkit.back(); 
                      } else {
                        window.location.href='/modules/views/HTML/order/orderList.html';
                      }
                    }, 2000);
                  } else if(response.ret == 10009) {
                    removeLoading();
                    deleteOrderToken();
                  } else if(response.ret == 10003) {
                    removeLoading();
                    errorToken();
                  } else {
                    removeLoading();
                    getTips(response.desp);
                  }
                }
                ajaxWithHeader(urlHeader, dataParam, sucDeleteOrder);
              }
              function deleteOrderToken(){
                getAccessToken(user_id);
                token = localStorage.token;
                deleteOrder();
              }
              $(this).parents('.confirm-bg').remove();
              document.removeEventListener('touchmove',touch, false);
            });
          } else if(btntext == "立即购买") {
            addLoading();
            localStorage.addressId = '';
            localStorage.couponId = '';
            localStorage.couponTxt = '';
            localStorage.ticketId = '';
            localStorage.ticketHead = '';
            localStorage.ticketTxt = '';
            localStorage.orderSubmit_index = 1; 
            localStorage.orderSubmit_Url = window.location.href;
            removeLoading();
            window.location.href="orderSubmit.html?user_id=" + user_id + "&token=" + token + "&oederSubtype=1&order_id=" + order_id + "&order_status_code=" + order_status_code;
          } else if(btntext == "再次购买") {

            window.location.href="../goods/goodsDetails.html?user_id=" + user_id + "&goods_id=" + goods_id;
            // addLoading();
            // var goodsList_num = $('#orderModule').find(".order-goods-item").length;
            // var goodsList_li = [];
            // for(var i=0; i<goodsList_num; i++) {
            //   var goodsList_obj = {};
            //   var goods_id = $('#orderModule').find(".order-goods-item:eq("+i+")").attr("data-goodsid");
            //   var item_id = $('#orderModule').find(".order-goods-item:eq("+i+")").attr("data-itemid");
            //   var num_str = $('#orderModule').find(".order-goods-item:eq("+i+")").find(".item-right").children("span").text();
            //   console.log(num_str);
            //   var goods_num = parseInt(num_str.substring(1,num_str.length));
            //   goodsList_obj["goods_id"] = goods_id;
            //   goodsList_obj["item_id"] = item_id;
            //   goodsList_obj["goods_num"] = goods_num;
            //   goodsList_li.push(goodsList_obj);
            // }
            // addShopCart();
            // function addShopCart(){
            //   var urlHeader = ajaxLink + "v1/cart/add";
            //   var dataParam = "goods_list=" + JSON.stringify(goodsList_li) +"&token="+token + "&user_id="+user_id;
            //   function sucAddShopCart(response){
            //     console.log(response);
            //     if(response.ret == 0) {
            //       removeLoading();
            //       window.location.href = '../shoppingCart/shoppingCart.html?shopcartback=1&token=' +token + '&user_id=' + user_id;
            //     } else if(response.ret == 10009) {
            //       removeLoading();
            //       sucGetToken(addShopCart);
            //     } else if(response.ret == 10003) {
            //       removeLoading();
            //       errorToken();
            //     } else {
            //       removeLoading();
            //       getTips(response.desp);
            //     }
            //   }
            //   ajaxWithHeaderObj(urlHeader, dataParam, sucAddShopCart);
            // }
          } else if(btntext == "立即评价" || btntext == "追加评价" || btntext == "查看评价") {
            if(type == "ios"){
              window.location.href="ios://appraise"+"?"+"order_id="+order_id;
            } else if (type == "Android") {
              JSkit.appraise(order_id); 
            } else {
              getTips("登录APP才可以评价哟~");
            }
          } else if(btntext == "物流信息") {
            window.location.href="order_tracking.html?user_id=" + user_id + "&token=" + token + "&order_id=" + order_id;
          } else if(btntext == "取消订单") {
            var orderbtnitem = $(this).parents(".order-btn");
            getConfirm("确认取消订单?<br>订单取消后，将不能恢复", "暂不取消", "确认取消");
            $(".confirm-btn-sure").click(function(){
              $(this).parents('.confirm-bg').remove();
              order_id_cancel = order_id;
              newReasonSelector('取消原因');
              document.removeEventListener('touchmove',touch, false);
              setTimeout(function(){$("#reasonSelector_dummy").click();},500);
            });
          } else if(btntext == "催发货") {
            addLoading();
            reminderDelivery();
            function reminderDelivery(){
              var urlHeader = ajaxLink + "order/reminder_delivery.ajax";
              var dataParam = "order_id=" + order_id + "&token=" + token + "&user_id=" + user_id;
              function sucReminderDelivery(response){
                removeLoading();
                if(response.ret == 0){
                  getTips(response.desp);
                } else if(response.ret == 10009) {
                  reminderDeliveryToken();
                } else if(response.ret == 10003) {
                  removeLoading();
                  errorToken();
                } else {
                  getTips(response.desp);
                }
              }
              ajaxWithHeader(urlHeader, dataParam, sucReminderDelivery);
            }
            function reminderDeliveryToken(){
              getAccessToken(user_id);
              token = localStorage.token;
              reminderDelivery();
            }
          } else if(btntext == "催物流") {
            addLoading();
            reminder();
            function reminder(){
              var urlHeader = ajaxLink + "order/reminder.ajax";
              var dataParam = "order_id=" + order_id + "&token=" + token + "&user_id=" + user_id;
              function sucReminder(response){
                removeLoading();
                if(response.ret == 0){
                  getTips(response.desp);
                } else if(response.ret == 10009) {            
                  sucGetToken(reminder);
                } else if(response.ret == 10003) {
                  removeLoading();
                  errorToken();
                } else {
                  getTips(response.desp);
                }
              }
              ajaxWithHeader(urlHeader, dataParam, sucReminder);
            }
          } else if(btntext == "申请换货") {
            addLoading();
            var apply_details = {};
            apply_details["apply_order_id"] = order_id;
            apply_details["order_status_code"] = order_status_code;
            apply_details["return_type"] = "00";
            apply_details["apply_goods_id"] = $(this).parents(".order-goods-item").attr("data-goodsid");
            apply_details["apply_order_detail_id"] = $(this).parents(".order-goods-item").attr("data-orderdetailid");
            apply_details["apply_goods_img"] = $(this).parents(".order-goods-item").find(".item-left").children("img").attr("src");
            apply_details["apply_goods_tit"] = $(this).parents(".order-goods-item").find(".goods-tit").text();
            apply_details["apply_goods_stand"] = $(this).parents(".order-goods-item").find(".goods-stand").children("span").text();
            apply_details["apply_goods_price"] = $(this).parents(".order-goods-item").find(".goods-pri").children("span").text();
            apply_details["apply_price"] = $(this).parents(".order-goods-item").attr("data-applyprice");
            apply_details["apply_goods_num"] = $(this).parents(".order-goods-item").find(".item-right").children("span").text();
            localStorage.apply_detail = JSON.stringify(apply_details);
            localStorage.applyBack_url = window.location.href;
            localStorage.applyBack_index = 1;
            if(type == 'Android') {
              var num = apply_details["apply_goods_num"].substring(1,apply_details["apply_goods_num"].length);
              removeLoading();
              JSkit.serviseApply(order_id,apply_details["apply_goods_id"],apply_details["apply_order_detail_id"],apply_details["apply_goods_img"],apply_details["apply_goods_tit"],apply_details["apply_goods_stand"],apply_details["apply_goods_price"],apply_details["apply_price"],num); 
            } else if(type == 'ios'){
              var num = apply_details["apply_goods_num"].substring(1,apply_details["apply_goods_num"].length);
              removeLoading();
              window.location.href="ios://serviceapply"+"?"+"order_id="+order_id+"&apply_goods_id="+apply_details["apply_goods_id"]+"&apply_order_detail_id="+apply_details["apply_order_detail_id"]+"&apply_goods_img="+apply_details["apply_goods_img"]+"&apply_goods_tit="+apply_details["apply_goods_tit"]+"&apply_goods_stand="+apply_details["apply_goods_stand"]+"&apply_goods_price="+apply_details["apply_goods_price"]+"&apply_price="+apply_details["apply_price"]+"&num="+num;
            } else {
              removeLoading();
              window.location.href = "service_apply.html?user_id="+user_id+"&order_id="+order_id+"&token="+token;
            }
          } else if(btntext == "申请退款") {
              var result = window.confirm("是否申请退款?");
              if(result == true){
                  //alert("true!");
              }
              else{
                  //alert("false!");
                  return;//不做任何操作
              }

              addLoading();
            var _this=$(this);
            // var order_id = $(this).parents(".order-item").attr("data-orderid");
            var order_price;
            getOrderPrice();
            function getOrderPrice(){
              var urlHeader = ajaxLink + applyRefundAPI;
              var dataParam = "order_id=" + order_id + "&token=" + token + "&user_id=" + user_id;
              function sucGetOrderPrice(response){
                // alert(JSON.stringify(response))
                
                if(response.ret == 0){
                    getTips(response.data);
                     
                   
                  // $(document.body).append(response.data.form);
                  // order_price = response.data.order_pay_price;
                  // localStorage.orderSubmit_index = 1; 
                  // localStorage.orderSubmit_Url = window.location.href;
                  // removeLoading();
                  // if (_this.data('fq')){
                  //   window.location.href = "orderPay.html?token=" + token + "&user_id=" + user_id + "&order_id=" + order_id + "&order_price=" + order_price + "&stages=" + _this.data('fq');
                  // }else{
                  //   window.location.href = "orderPay.html?token=" + token + "&user_id=" + user_id + "&order_id=" + order_id + "&order_price=" + order_price;
                  // }
                  
                } else if(response.ret == 10009) {
                  removeLoading();
                  sucGetToken(getOrderPrice);
                } else if(response.ret == 10003) {
                  removeLoading();
                  errorToken();
                } else {
                  removeLoading();
                  getTips(response.msg);
                }

                setTimeout(function () {
                       window.location.reload();
                    // window.location.reload();
                 },500);
              }
              ajaxWithHeader(urlHeader, dataParam, sucGetOrderPrice,'POST');

            }

        } else if(btntext == "立即退款") {
            addLoading();
            var _this=$(this);
            // var order_id = $(this).parents(".order-item").attr("data-orderid");
            var order_price;
            getOrderPrice();
            function getOrderPrice(){
              var urlHeader = ajaxLink + orderRefundAPI;
              var dataParam = "order_id=" + order_id + "&token=" + token + "&user_id=" + user_id;
              function sucGetOrderPrice(response){
                // alert(JSON.stringify(response))
                
                if(response.ret == 0){
                    getTips(response.data);
                     
                   
                  // $(document.body).append(response.data.form);
                  // order_price = response.data.order_pay_price;
                  // localStorage.orderSubmit_index = 1; 
                  // localStorage.orderSubmit_Url = window.location.href;
                  // removeLoading();
                  // if (_this.data('fq')){
                  //   window.location.href = "orderPay.html?token=" + token + "&user_id=" + user_id + "&order_id=" + order_id + "&order_price=" + order_price + "&stages=" + _this.data('fq');
                  // }else{
                  //   window.location.href = "orderPay.html?token=" + token + "&user_id=" + user_id + "&order_id=" + order_id + "&order_price=" + order_price;
                  // }
                  
                } else if(response.ret == 10009) {
                  removeLoading();
                  sucGetToken(getOrderPrice);
                } else if(response.ret == 10003) {
                  removeLoading();
                  errorToken();
                } else {
                  removeLoading();
                  getTips(response.msg);
                }

                setTimeout(function () {
                       window.location.reload();
                    // window.location.reload();
                 },500);
              }
              ajaxWithHeader(urlHeader, dataParam, sucGetOrderPrice,'POST');

            }
            }
        });
      } else if(response.ret == 10009){
        removeLoading();
        sucGetToken(order_detail);
      } else if(response.ret == 10003) {
        removeLoading();
        errorToken();
      } else {
        removeLoading();
        getTips(response.desp);
      }
    }
    // alert(urlHeader);
    // alert(dataParam);
    ajaxWithHeader(urlHeader, dataParam, get_order_detail);
  }

  function eachGoodsList(data){
    var goods_data = data;
    var goodsListHtml='';
    var applyHtml='';
    for (var i = 0; i < goods_data.length; i++) {
      if (goods_data[i].apply_id==null || goods_data[i].apply_id=='') {
        if(order_status_code == '20' || order_status_code == '40' || order_status_code == '50' || order_status_code == '60') {
          if(goods_aftersale_state != 2){
            applyHtml = '<div class="after-sale-btn"><span class="btn-gray">申请换货</span></div>';
          }else{
            applyHtml = '<div class="after-sale-btn"></div>';
          }
          if(order_status_code == '20') {
          var returnMoneyHtml = "";
          if(goods_aftersale_state == "0"){
                returnMoneyHtml = '<span class="btn-gray">申请退货</span>';
                $('#orderBillBtns').prepend(returnMoneyHtml);
                goods_aftersale_state = 1;
              }
          
        }

        } else if(order_status_code == '10') {
          var returnMoneyHtml = "";
          if(goods_aftersale_state == "0"){
                // returnMoneyHtml = '<span class="btn-gray">申请退款</span>';
                $('#orderBillBtns').prepend(returnMoneyHtml);
                goods_aftersale_state = 1;
              }
          
        }  
      } else {
        var goods_aftersale_tit_disable = "";
        if(goods_data[i].goods_aftersale_state == '50' || goods_data[i].goods_aftersale_state == '70' || goods_data[i].goods_aftersale_state == '80'){
          goods_aftersale_tit_disable = "售后";
          var goods_aftersale_tit = '';
        } else {
          var goods_aftersale_tit = '<button class="after-sale-button">售后</button>';
        }
        applyHtml = '<div class="after-sale" data-applyid="' + goods_data[i].apply_id 
          + '" data-applycode="' + goods_data[i].goods_aftersale_state + '">'
          +goods_aftersale_tit_disable+'<span>' + goods_data[i].goods_aftersale_code + '</span><p>' 
          + goods_aftersale_tit +'</p></div>';
      }
      var attr_html;
      if(goods_data[i].item_id && goods_data[i].item_id.length > 0) {
          attr_html = '<div class="order-goods-item" data-goodsid="' + goods_data[i].goods_id + '" data-itemid="' + goods_data[i].item_id + '" data-orderdetailid="' + goods_data[i].order_detail_id + '" data-applyprice="' + goods_data[i].apply_price + '">';
      } else {
          attr_html = '<div class="order-goods-item" data-goodsid="' + goods_data[i].goods_id + '" data-orderdetailid="' + goods_data[i].order_detail_id + '" data-applyprice="' + goods_data[i].apply_price + '">';
      }
      var goodsListHtmlItem = attr_html
                            + '<div class="item-left"><img src="' + goods_data[i].goods_image + '"></div>'
                            + '<div class="item-main">'
                            + '<p class="goods-tit">' + goods_data[i].goods_name + '</p>'
                            + '<div class="goods-stand"><span>' + goods_data[i].goods_standard + '</span></div>'
                            + '<div class="goods-pri"><span>￥' + goods_data[i].goods_price + '</span></div>'
                            + '</div>'
                            + '<div class="item-right"><span>x' + goods_data[i].goods_num + '</span></div>'
                            + '<i class="icon-chevron-thin-right iconRight iconfont icon-goto"></i>';
      if (order_status_code !="10") { 
        goodsListHtmlItem += applyHtml;
      } else if (i == "0") {
        $("#orderBillBtns").prepend(applyHtml);
        $(".btn-gray").appendTo($(".after-sale"));
        $(".btn-gray").css('color','black');
      }
      goodsListHtmlItem += '</div>';
      goodsListHtml += goodsListHtmlItem;
    }
    return goodsListHtml;
  }
  function orderCancel(cancel_reason) {
    var urlHeader = ajaxLink + cancelOrderAPI;
    var dataParam = "order_id=" + order_id + "&token=" + token + "&user_id=" + user_id + "&cancel_reason=" + cancel_reason;
    function sucOrderCancel(response){
      console.log(response);
      if(response.ret == 0){
        order_detail();
      } else if(response.ret == 10009) {
        removeLoading();
        sucGetToken(mode);
      } else if(response.ret == 10003) {
        removeLoading();
        errorToken();
      } else {
        removeLoading();
        getTips(response.desp);
      }
    }
    ajaxWithHeader(urlHeader, dataParam, sucOrderCancel,'POST');
  }
  function getReasonInfoHtml()
  {
      var reasonInfo =["收货人信息有误","商品数量或款式需调整","有更优惠的购物方案","商品缺货了","我不想买了","其他原因"];
      var reasonHtml='';
      for(var i=0;i<reasonInfo.length;i++){ 
          reasonHtml+='<li data-val="'+reasonInfo[i]+'">'+reasonInfo[i]+'</li>'
      }
      return reasonHtml;
  }

  function newReasonSelector(initValue,_this) {
    $('#reasonSelector').html(getReasonInfoHtml());
    $('#reasonSelector').mobiscroll().treelist({
        theme: 'mobiscroll',//样式
        display: 'bottom',//指定显示模式
        fixedWidth: [480],//一组滚动框的宽度
        //placeholder: initValue,//空白等待提示
        lang: 'zh', //语言
        mode:'scroller',//选择模式  scroller  clickpick  mixed
        rtl:false,//按钮是否靠右
        headerText:'',//头部提示文字
        rows:5,//滚动区域内的行数
        defaultValue: ['有更优惠的购物方案'],//设置初始值
        labels: ['请选择取消订单原因'],
        showInput:true,
        showLabel:true,//是否显示labels
        closeOnOverlay:false,//如果为ture覆盖点击将滚动条内数据将关闭遮罩层
        tap:true,
        onSelect: function (valueText) {
          orderCancelOrder(valueText);
        },
        formatResult: function (data) {
          return data[0];
        }
    });
  }

  function orderCancelOrder(data) {
      var data = data;
      addLoading();
      orderCancel(data);
  }

  function setAreaSelectedVal(areaVal,_this) {
      $('#reasonSelector_dummy').val(areaVal);
      $("#reasonSelector_dummy").attr('placeholder', areaVal);
      $('.order-item').eq(_this).remove();
  }

  function getAreaSelectedVal() {
      return $('#reasonSelector_dummy').val();
  }

  function getPlaceholderVal() {
      return $("#reasonSelector_dummy").attr('placeholder')
  }

  function isOpenAreaSelect() {
      return $("#reasonSelector_dummy").hasClass('dwtd') ? true : false
  }
});

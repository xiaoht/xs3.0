$(function(){
  var orderNumAPI = 'v1/order/get-order-list-num';
  var orderListAPI = 'v1/order/get-info-list';
  var cancelOrderAPI = 'v1/order/cancel-order';
  var orderPayAPI = 'v1/order/now-pay';
  var orderRefundAPI = 'v1/order/refund';
  var confirmOrderAPI = 'v1/order/confirm-order';
  var applyRefundAPI = 'v1/order/apply-refund';

  var ajaxLink = 'https://api.xsbuy.cn/';
  var paramDic = getUrlString();
  var type = paramDic["type"];
  var user_id = paramDic["user_id"];
  var token = paramDic["token"];
  var back = document.getElementById("backapp");
  var ordertype = paramDic["ordertype"]*1;
  var orderCount = 10;
  var start = 1;
  var isEnd = 0;
  var order_type;
  var order_id_cancel;
  var append = 0;
  user_id_cancel = user_id;
  token_cancel = token;

  if(!ordertype){
    if(localStorage.ordertype){
      ordertype = localStorage.ordertype;
    }else{
      ordertype = -1;
    }
  }else{
    localStorage.ordertype = ordertype;
  }
  if(ordertype == 0){
    order_type = 1;
  } else if(ordertype == -1){
    order_type = 0;
  // } else if(ordertype == "10"){
  //   order_type = 2;
  // } else if(ordertype == "20"){
  //   order_type = 3;
  // } else if(ordertype == "40"){
  //   order_type = 4;
  } else {
    ordertype = -1;
    order_type = 0;
  }
  $(".tab-list li:eq("+order_type+")").addClass("active").siblings().removeClass("active");
  $(".tab-list li:eq("+order_type+")").find("i").remove();
  // 原生返回
  back.onclick = function(){
    window.location.href="/#/home";
    // if(type=="ios"){
    //   window.location.href="ios://back";
    // } else if (type=="Android") {
    //   JSkit.back();
    // } else {
    //   window.history.back();
    // }
  }; 

  goTop();

  function phone(){
    alert('asd')
    hybrid_app.callPhoneNumber('021-60310465');

  }

  $(".tab-list li:eq("+order_type+")").addClass("active").siblings().removeClass("active");
  
  getOrderNum();
  function getOrderNum(){
    var urlHeader = ajaxLink + orderNumAPI;
    var dataParam = "token=" + token + "&user_id=" + user_id;
    ajaxWithHeader(urlHeader, dataParam, sucOrderNumFunc);
  }

  getOderList();
  function getOderList(){
    var urlHeader = ajaxLink + orderListAPI;
    var dataParam = "count=" + orderCount +( ordertype >= 0 ? "&status="+ ordertype : '' ) +"&start=" + start + "&token=" + token + "&user_id=" + user_id;
    ajaxWithHeader(urlHeader, dataParam, sucOrderListFunc);
  }

  // 订单tab切换
  $(".tab-list li").click(function(){
    if($(this).hasClass("active")){
      return;
    } else {
      addLoading();
      var i = $(this).index();
      switch (i) {
        case  0:
          ordertype = -1;
          break;
        case  1:
          ordertype = 0;
          break;
        // case  2:
        //   ordertype = '10';
        //   break;
        // case  3:
        //   ordertype = '20';
        //   break;
        // case  4:
        //   ordertype = '40';
        //   break;
      }
      localStorage.ordertype = ordertype;
      $(this).addClass("active").siblings().removeClass("active");
      getOrderNum();
      isEnd = 0;
      start = 1;
      append = 0;
      var wrapper_html = '<div id="wrapper"><div id="scroller"><div class="order-group" id="orderGroup"></div><div class="iconfont scroll-bottom-ele" style="display: none;"><img src="https://res-ghesh.imoba.com.cn/img/icon-loading01.gif" style="border-radius: 5px;"><span class="pullUpTxt">上拉加载更多</span></div></div></div></div>';
      $('#notEmptyOrder').html(wrapper_html);
      getOderList();
      // loaded();
    }
  });

  function sucOrderNumFunc(response){
    console.log(response);
    if(response.ret == 0){
      var data = response.data;
      var i_strHtml;
      var order_num;
      for(var i = 1; i < 5; i++){
        switch (i) {
          case  1:
            order_num = data.order_no_pay_num;
            break;
          case  2:
            order_num = data.order_no_hair_num;
            break;
          case  3:
            order_num = data.order_no_receive_num;
            break;
          case  4:
            order_num = data.order_no_evaluate_num;
            break;
        }
        var order_num_i = parseInt(order_num);
        if(order_num_i == 0) {
          i_strHtml = '';
        } else if(order_num_i > 0 && order_num_i < 10) {
          i_strHtml = '<i>' + order_num + '</i>';
        } else if(order_num_i > 9) {
          i_strHtml = '<i class="small"></i>';
        }
        $(".tab-list li:eq("+i+")").find("span").find('i').remove();
        $(".tab-list li:eq("+i+")").find("span").append(i_strHtml);
      }
    } else if(response.ret == 10009){
      sucGetToken(getOrderNum);
    } else if(response.ret == 10003){
      errorToken();
    } else {
      getTips(response.desp);
    }
  }

  function loaded() {
    var myScroll = new IScroll('#wrapper', {
      mouseWheel: true,
      pullRefresh: false, //下啦刷新
      scrollLoad: true,  //滚动加载
      bounce: false,
      click: true
    });
    var container = document.querySelector('#orderGroup');
    myScroll.on('scrollLoad', function (argument) {
      if(isEnd == 1) {
        $(".scroll-bottom-ele").show().find("span").text('没有更多数据').siblings("img").hide();
        myScroll.resetScrollLoad();
        return;
      }
      
      start = start + 1;
      if(start > 1) return;
      $(".scroll-bottom-ele").show().find("span").text('加载中').siblings("img").show();
      setTimeout(function () {
        append = 1;
        getOderList();
        myScroll.resetScrollLoad();
      }, 1000); // 数据加载结束， 重置
    });
  }

  function sucOrderListFunc(response) {
    console.log(response);
    if(response.ret == 0){
      var data = response.data;
      if(data == '' || data == null || data.length == 0) {
        if(append == 0) {
          $('#notEmptyOrder').hide().siblings('#emptyOrder').show();
        }
        isEnd = 1;
        $(".scroll-bottom-ele").show().find("span").text('没有更多数据').siblings("img").hide();
        removeLoading();
      } else {
        if(data.length < orderCount) {
          isEnd = 1;
          $(".scroll-bottom-ele").show().find("span").text('没有更多数据').siblings("img").hide();
        } else {
          isEnd = 0;
          $(".scroll-bottom-ele").show().find("span").text('上拉加载更多').siblings("img").show();
        }
        var orderGroupHtml = '';


    //     0 => '待付款',
    // 1 => '已付款',
    // 2 => '已发货',
    // 3 => '订单完成'
    // 4 => '订单取消'
        for(var i = 0; i < data.length; i++) {
          var order_status_txt='';
          var order_btns='';
          if(data[i].order_status == 0) {
            order_status_txt = '待付款';
            order_btns = '<span class="btn-gray">取消订单</span><span class="btn-red" data-fq=' + data[i].stages +'>立即付款</span>';
          } else if(data[i].order_status == 1) {
            order_status_txt = '已付款，待发货';
             order_btns = '<span class="btn-gray">申请退款</span>';
          } else if(data[i].order_status == 2){
            // if(data[i].billId ==''){
            //     order_status_txt = '配货中';
            // }else{
            //     order_status_txt = '待收货';
            // }
            order_status_txt = '已发货';
            order_btns = '<a href="/modules/views/HTML/order/express_info.html?express_name='+data[i].express_name+'&express_number='+data[i].express_number+'"><span class="btn-gray2">查看物流</span></a>';
            // order_btns = '<span class="btn-gray">申请退款</span><span class="btn-pink">确认收货</span>';
            
            order_btns += '<span class="btn-pink">确认收货</span>';
          // } else if(data[i].order_status == '11'){
          //   order_status_txt = '待实名认证';
          //   order_btns = '<span class="btn-validate">实名认证</span>';
          } else if(data[i].order_status == '3'){
            order_status_txt = '交易成功';
            order_btns = '<a href="/modules/views/HTML/order/express_info.html?express_name='+data[i].express_name+'&express_number='+data[i].express_number+'"><span class="btn-gray2">查看物流</span></a>';
            // order_btns = '<span class="btn-gray">删除订单</span><span class="btn-gray">立即购买</span>';
            // order_btns = '<span class="btn-gray">立即购买</span>';
          } else if(data[i].order_status == '4'){
            order_status_txt = '交易关闭';
            // order_btns = '<span class="btn-gray">删除订单</span><span class="btn-gray">立即购买</span>';
            // order_btns = '<span class="btn-gray">立即购买</span>';
          }  else if(data[i].order_status == '5'){
            order_status_txt = '退款申请审核中';
            // order_btns = '<span class="btn-gray">删除订单</span><span class="btn-gray">立即购买</span>';
            // order_btns = '<span class="btn-gray">立即购买</span>';
          }  else if(data[i].order_status == '6'){
            order_status_txt = '退款申请审核通过';
            //ku order_btns = '<span class="btn-gray">删除订单</span><span class="btn-gray">立即购买</span>';
            // order_btns = '<span class="btn-gray">立即购买</span>';
             order_btns = '<span class="btn-gray">立即退款</span>';
          }  else if(data[i].order_status == '7'){
            order_status_txt = '退款申请审核失败';
            // order_btns = '<span class="btn-gray">删除订单</span><span class="btn-gray">立即购买</span>';
            // order_btns = '<span class="btn-gray">立即购买</span>';
          }  else if(data[i].order_status == '8'){
            order_status_txt = '退款成功';
            // order_btns = '<span class="btn-gray">删除订单</span><span class="btn-gray">立即购买</span>';
            // order_btns = '<span class="btn-gray">立即购买</span>';
          } 
          // else if(data[i].order_status == '100'){
          //   order_status_txt = '交易失败';
          //   order_btns = '<span class="btn-gray">删除订单</span><span class="btn-gray">立即购买</span>';
          // } else if(data[i].order_status == '40' || data[i].order_status == '50' || data[i].order_status == '60'){
          //   order_status_txt = '交易成功';
          //   if(data[i].order_evalue_status == '0'){
          //     if(data[i].goods_aftersale_state == '0') {
          //       order_btns = '<span class="btn-gray">删除订单</span><span class="btn-gray">再次购买</span>';
          //     } else if(data[i].goods_aftersale_state == '1') {
          //       order_btns = '<span class="btn-gray">再次购买</span>';
          //     }
          //   } else if(data[i].order_evalue_status == '1'){
          //     if(data[i].goods_aftersale_state == '0') {
          //       order_btns = '<span class="btn-gray">删除订单</span><span class="btn-gray">再次购买</span>';
          //     } else if(data[i].goods_aftersale_state == '1') {
          //       order_btns = '<span class="btn-gray">再次购买</span>';
          //     }
          //   } else if(data[i].order_evalue_status == '2'){
          //     if(data[i].goods_aftersale_state == '0') {
          //       order_btns = '<span class="btn-gray">删除订单</span><span class="btn-gray">再次购买</span>';
          //     } else if(data[i].goods_aftersale_state == '1') {
          //       order_btns = '<span class="btn-gray">再次购买</span>';
          //     }
          //   }
          // }
          var house_data = data[i];
          var houseListHtmlStr = eachHouseList(house_data);
          
          var house_str = '<div class="order-item" data-orderid="' + data[i].order_id + '" data-ordercode="' + data[i].order_status + '">'
                        + '<div class="order-tit">'
                        + '<p class="order-date left">' + data[i].order_time + '</p>'
                        + '<p class="order-status right">' + order_status_txt + '</p>'
                        + '<p class="clear"></p>'
                        + '</div>'
                        +  houseListHtmlStr
                        + '<div class="order-bot">'
                        + '<p class="order-price">共' + data[i].goods_count + '件&nbsp;&nbsp;实付款：<span>￥' + (data[i].total_amount*1).toFixed(2) + '</span></p>'
                        + '<div class="order-btn">'
                        +  order_btns
                        + '</div>'
                        + '</div>'
                        + '</div>';
          orderGroupHtml += house_str;
        }
        $('#emptyOrder').hide().siblings('#notEmptyOrder').show();
        if(append == 1) {
          $('#orderGroup').append(orderGroupHtml);
        } else {
          $('#orderGroup').html(orderGroupHtml);
        }
        loaded();
        removeLoading();
      }
      // 订单详情跳转
      $(".order-goods-item").unbind('click').on('click', function(){
        addLoading();
        var order_id = $(this).parents(".order-item").attr("data-orderid");
        removeLoading();
        window.location.href="orderDetail.html?token=" + token + "&user_id=" + user_id + "&order_id=" + order_id;
      });
      // 实名认证
      // $(".btn-validate").unbind('click').on('click', function(){
      //   var order_id = $(this).parents(".order-item").attr("data-orderid");
      //   window.location.href="nameVarified.html?token=" + token + "&user_id=" + user_id + "&order_id=" + order_id;
      // });
      
      // 立即付款
      $(".btn-red").unbind('click').on('click', function(){
        addLoading();
        var _this=$(this);
        var order_id = $(this).parents(".order-item").attr("data-orderid");
        var order_price;
        getOrderPrice();
        function getOrderPrice(){
          var urlHeader = ajaxLink + orderPayAPI;
          var dataParam = "order_id=" + order_id + "&token=" + token + "&user_id=" + user_id;
          function sucGetOrderPrice(response){
            if(response.ret == 0){

              $(document.body).append(response.data.form);
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
              getTips(response.desp);
            }
          }
          ajaxWithHeader(urlHeader, dataParam, sucGetOrderPrice,'POST');
        }
      });
      
      // 确认收货
      $(".btn-pink").unbind('click').on('click', function(){

        var orderbtnitem = $(this).parents(".order-btn");
        var orderStatus = $(this).parents(".order-item").find(".order-status");
        var orderItem = $(this).parents(".order-item");
        var order_id = $(this).parents(".order-item").attr("data-orderid");
        getConfirm("确认收到该商品", "取消", "收到");
        $(".confirm-btn-sure").click(function(){
          addLoading();
          confirmReceive();
          function confirmReceive(){
            var urlHeader = ajaxLink + confirmOrderAPI;
            var dataParam = "order_id=" + order_id + "&token=" + token + "&user_id=" + user_id;
            function sucConfirmReceive(response){
              console.log(response);
              if(response.ret == 0){
                // getOrderNum();
                // $('#orderGroup').html('');
                // start = 1;
                // append = 0;
                // getOderList();
                window.location.reload();
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

      // 灰色按钮点击
      $(".btn-gray").unbind('click').on('click', function(){
        $(this).unbind()
        var btntext = $(this).text();
        var orderbtnitem = $(this).parents(".order-btn");
        var orderStatus = $(this).parents(".order-item").find(".order-status");
        var orderItem = $(this).parents(".order-item");
        var order_id = $(this).parents(".order-item").attr("data-orderid");
        var address_id = $(this).parents(".order-item").attr("address_id");
        var order_status_code = $(this).parents(".order-item").attr("data-ordercode");
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
                  getOrderNum();
                  $('#orderGroup').html('');
                  start = 1;
                  append = 0;
                  getOderList();
                  getTips('删除订单成功！');
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
          localStorage.ticketType = '';
          localStorage.ticketHead = '';
          localStorage.ticketNo = '';
          localStorage.ticketEmail = '';
          localStorage.orderSubmit_index = 1; 
          localStorage.orderSubmit_Url = window.location.href;
          removeLoading();
          window.location.href="orderSubmit.html?user_id=" + user_id + "&token=" + token + "&oederSubtype=1&order_id=" + order_id + "&order_status_code=" + order_status_code;
        } else if(btntext == "再次购买") {
          addLoading();
          var goodsList_num = $(this).parents('.order-item').find(".order-goods-item").length;
          var goodsList_li = [];
          for(var i=0; i<goodsList_num; i++) {
            var goodsList_obj = {};
            var goods_id = $(this).parents('.order-item').find(".order-goods-item:eq("+i+")").attr("data-goodsid");
            var item_id = $(this).parents('.order-item').find(".order-goods-item:eq("+i+")").attr("data-itemid");
            var num_str = $(this).parents('.order-item').find(".order-goods-item:eq("+i+")").find(".item-right").children("span").text();
            console.log(num_str);
            var goods_num = parseInt(num_str.substring(1,num_str.length));
            goodsList_obj["goods_id"] = goods_id;
            goodsList_obj["item_id"] = item_id;
            goodsList_obj["goods_num"] = goods_num;
            goodsList_li.push(goodsList_obj);
          }
          addShopCart();
          function addShopCart(){
            var urlHeader = ajaxLink + "v1/cart/add";
            var dataParam = "goods_list=" + JSON.stringify(goodsList_li) +"&token="+token + "&user_id="+user_id;
            function sucAddShopCart(response){
              console.log(response);
              if(response.ret == 0) {
                removeLoading();
                window.location.href = '../shoppingCart/shoppingCart.html?shopcartback=1&token=' +token + '&user_id=' + user_id;
              } else if(response.ret == 10009) {
                removeLoading();
                sucGetToken(addShopCart);
              } else if(response.ret == 10003) {
                removeLoading();
                errorToken();
              } else {
                removeLoading();
                getTips(response.desp);
              }
            }
            ajaxWithHeaderObj(urlHeader, dataParam, sucAddShopCart);
          }
        } else if(btntext == "立即评价" || btntext == "追加评价" || btntext == "查看评价") {
          if(type == "ios"){
            window.location.href="ios://appraise"+"?"+"order_id="+order_id;
          } else if (type == "Android") {
            JSkit.appraise(order_id); 
          } else {
              var goodsList_num = $(this).parents('.order-item').find(".order-goods-item").length;
              var good_id_str = "";
              for(var i=0; i<goodsList_num; i++) {
                  var goodsList_obj = {};
                  var goods_id = $(this).parents('.order-item').find(".order-goods-item:eq("+i+")").attr("data-goodsid");
                  good_id_str += goods_id;
                  if((i+1)!=goodsList_num){
                      good_id_str +=",";
                  }
              }
              window.location.href="/index.html#/evaluate?order_id="+order_id+"&token="+token + "&user_id="+user_id+"&goods_id="+good_id_str;
          }
        } else if(btntext == "物流信息") {
          window.location.href="order_tracking.html?user_id=" + user_id + "&token=" + token + "&order_id=" + order_id;
        } else if(btntext == "取消订单") {
          var orderbtnitem = $(this).parents(".order-btn");
          getConfirm("确认取消订单?<br>订单取消后，将不能恢复", "暂不取消", "确认取消");
          $(".confirm-btn-sure").click(function(){
            console.log(1);
            setTimeout(function(){$("#reasonSelector_dummy").click();},500);
            order_id_cancel = order_id;
            newReasonSelector('取消原因');
            $(this).parents('.confirm-bg').remove();
            document.removeEventListener('touchmove',touch, false);
          });
        } else if(btntext == "催发货") {
          addLoading();
          reminderDelivery();
          function reminderDelivery(){
            var urlHeader = ajaxLink + "order/reminder_delivery.ajax";
            var dataParam = "order_id=" + order_id + "&token=" + token + "&user_id=" + user_id;
            function sucReminderDelivery(response){
              removeLoading();
              console.log(response);
              if(response.ret == 0){
                getTips(response.desp);
              } else if(response.ret == 10009) {
                sucGetToken(reminderDelivery);
              } else if(response.ret == 10003) {
                  errorToken();
              } else {
                getTips(response.desp);
              }
            }
            ajaxWithHeader(urlHeader, dataParam, sucReminderDelivery);
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
            var order_id = $(this).parents(".order-item").attr("data-orderid");
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
            var order_id = $(this).parents(".order-item").attr("data-orderid");
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

        }else if(btntext == "催物流") {
          addLoading();
          reminder();
          function reminder(){
            var urlHeader = ajaxLink + "order/reminder.ajax";
            var dataParam = "order_id=" + order_id + "&token=" + token + "&user_id=" + user_id;
            function sucReminder(response){
              removeLoading();
              console.log(response);
              if(response.ret == 0){
                getTips(response.desp);
              } else if(response.ret == 10009) {
                sucGetToken(reminder);
              } else if(response.ret == 10003) {
                  errorToken();
              } else {
                getTips(response.desp);
              }
            }
            ajaxWithHeader(urlHeader, dataParam, sucReminder);
          }
        }
      }); 
    } else if(response.ret == 10009){
      sucGetToken(getOderList);
    } else if(response.ret == 10003) {
      removeLoading();
      errorToken();
    } else {
      removeLoading();
      getTips(response.desp);
    }
  }

  function eachHouseList(data) {
    var house_data = data;
    var houseListHtml='';
    // for (var i = 0; i < house_data.length; i++) {
      // var goods_data = house_data[i].order_goods_list;
      var goodsListHtml='';
      var applyHtml='';
      houseListHtml += '<div class="order-goods" data-houseid="1">'
      goodsListHtml =  eachGoodsList(data.order_goods_list);
      houseListHtml += goodsListHtml;
      houseListHtml += '</div>';
    // }
    return houseListHtml; 
  }

  function eachGoodsList(data){
    var goods_data = data;
    var goodsListHtml='';
    var applyHtml='';
    for (var i = 0; i < goods_data.length; i++) {
      if (goods_data[i].apply_id==null || goods_data[i].apply_id=='') {
        applyHtml = '';
      } else {

        // if(goods_data[i].goods_aftersale_state == '50' || goods_data[i].goods_aftersale_state == '70'|| goods_data[i].goods_aftersale_state == '80'){
        //   var goods_aftersale_tit = '售后';
        // } else {
        //   var goods_aftersale_tit = '售后';
        // }
        // applyHtml = '<div class="after-sale" data-applyid="' + goods_data[i].apply_id + '" data-applycode="' + goods_data[i].goods_aftersale_state + '"><p>' + goods_aftersale_tit + '<span>' + goods_data[i].goods_aftersale_code + '</span></p></div>';
      }
      var attr_html;
      if(goods_data[i].item_id && goods_data[i].item_id.length > 0) {
          attr_html = '<div class="order-goods-item" data-goodsid="' + goods_data[i].goods_id + '" data-itemid="' + goods_data[i].item_id + '">';
      } else {
          attr_html = '<div class="order-goods-item" data-goodsid="' + goods_data[i].goods_id + '">';
      }
      var goodsListHtmlItem = attr_html
                            + '<div class="item-left"><img src="' + goods_data[i].goods_image + '"></div>'
                            + '<div class="item-main">'
                            + '<p class="goods-tit">' + goods_data[i].goods_name + '</p><i class="iconfont icon-goto icon-chevron-thin-right iconRight"></i>'
                            // + '<div class="goods-stand"><span>' + goods_data[i].goods_standard + '</span></div>'
                            + '<div class="goods-stand"><span>' + goods_data[i].goods_attr + ' '+ goods_data[i].goods_color + '</span></div>'
                            + '<div class="goods-pri"><span>￥' + goods_data[i].goods_price + '</span></div>'
                            + '</div>'
                            + '<div class="item-right"><span>x' + goods_data[i].goods_count + '</span></div>'
                            + applyHtml
                            + '</div>';
      goodsListHtml += goodsListHtmlItem;
    }
    return goodsListHtml;
  }
  function orderCancel(cancel_reason) {
    var urlHeader = ajaxLink + cancelOrderAPI;
    var dataParam = "order_id=" + order_id_cancel + "&token=" + token + "&user_id=" + user_id + "&cancel_reason=" + cancel_reason;
    function sucOrderCancel(response){
      console.log(response);
      if(response.ret == 0){
        getOrderNum();
        $('#orderGroup').html('');
        start = 1;
        append = 0;
        getOderList();
        getTips('取消订单成功！');
      } else if(response.ret == 10009) {
        removeLoading();
        sucGetToken(mode);
      } else if(response.ret == 10003) {
        removeLoading();
        errorToken();
      } else {
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

  document.addEventListener('touchmove', function (e) { e.preventDefault(); }, isPassive() ? {
    capture: false,
    passive: false
  } : false);
  function isPassive() {
    var supportsPassiveOption = false;
    try {
      addEventListener("test", null, Object.defineProperty({}, 'passive', {
        get: function () {
          supportsPassiveOption = true;
        }
      }));
    } catch(e) {}
    return supportsPassiveOption;
  }
});
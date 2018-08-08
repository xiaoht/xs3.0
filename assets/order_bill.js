$(function() {
    var billListAPI = 'v1/invoice/list';
    var billAddAPI = 'v1/invoice/list';

    var paramDic = getUrlString();
    var type = paramDic["type"];
    var user_id = paramDic["user_id"];
    var token = paramDic["token"];
    var back = document.getElementById("backapp");
    var operateType = false;
    var aotuTicketList = [];
    //有参数
    // 原生返回
    back.onclick = function() {
        if (paramDic["type"] == "ios") {
            window.location.href = "ios://back";
        } else if (paramDic["type"] == "Android") {
            JSkit.back();
        } else {
            localStorage.orderSubmit_index = parseInt(localStorage.orderSubmit_index) - 1;
            window.history.back();
        }
    };
    // 点击个人取列表
    $("#geRen").click(function() {
        operateType = false;
        $("#ticketEmail").val('');
        getAutoTicket(0);
    });
    // getTicket();
    if (localStorage.ticketType == 1) {
        $('#geRen').removeClass('icon-check-alt ion-ios-circle-filled').addClass('icon-radio-unchecked ion-ios-circle-outline');
        $('#danWei').removeClass('icon-radio-unchecked ion-ios-circle-outline ').addClass('icon-check-alt ion-ios-circle-filled');
        $("#billTitle").show();
        $("#billHead").val(localStorage.ticketHead);
        $("#ticketNo").val(localStorage.ticketNo);
    } else {
        $("#geRen").click();
    }
    $("#ticketEmail").val(localStorage.ticketEmail);
    //单选
    $('#billType div').click(function() {
        if ($(this).find("i").hasClass('icon-check-alt ion-ios-circle-filled')) return;
        $(this).siblings('div').find("i").removeClass('icon-check-alt ion-ios-circle-filled').addClass('icon-radio-unchecked ion-ios-circle-outline');
        $(this).find("i").removeClass('icon-radio-unchecked ion-ios-circle-outline').addClass('icon-check-alt ion-ios-circle-filled');
        $("#billTitle").toggle();
    });
    $('#save').click(function() {
        if (!$("#ticketEmail").val()) {
            getTips('亲！收票邮箱不能为空哦~');
            return;
        } else if (!/^(?:\w+\.?)*\w+@(?:\w+\.)*\w+$/.test($("#ticketEmail").val())) {
            getTips('亲！收票邮箱不正确哦~');
            return;
        }
        if ($('#geRen').hasClass('icon-check-alt ion-ios-circle-filled')) {

            localStorage.ticketHead = '个人';
            localStorage.ticketNo = '';
            localStorage.ticketType = 0;
            localStorage.ticketEmail = $("#ticketEmail").val();
            localStorage.operateType = operateType ? 'add' : 'edit';
            localStorage.orderSubmit_index = parseInt(localStorage.orderSubmit_index) + 1;
            window.location.href = localStorage.orderSub_url;
        } else {
            var ticketNo = $("#ticketNo").val();
            if (!$("#billHead").val()) {
                getTips('亲！发票抬头不能为空哦~');
            } else if (!ticketNo) {
                getTips('亲！纳税人识别号不能为空哦~');
            } else if (!/^[0-9a-zA-Z]+$/.test(ticketNo) ||
                (ticketNo.length != 15 && ticketNo.length != 18 && ticketNo.length != 20)) {
                getTips('亲！纳税人识别号不正确哦~');
            } else {
                // localStorage.ticketId = $('#billContent').find('span.active').attr('data-ticketid');
                localStorage.ticketHead = $("#billHead").val();
                localStorage.ticketNo = $("#ticketNo").val();
                localStorage.ticketEmail = $("#ticketEmail").val();
                localStorage.ticketType = 1;
                localStorage.operateType = operateType ? 'add' : 'edit';
                localStorage.orderSubmit_index = parseInt(localStorage.orderSubmit_index) + 1;
                window.location.href = localStorage.orderSub_url;

            }
        }
    });

    // 获取发票分类
    function getTicket() {
        var urlHeader = ajaxLink + "order/content.ajax";
        var dataParam = 'token=' + token + '&user_id=' + user_id;
        //成功获取发票分类的方法
        function sucGetTicket(response) {
            if (response.ret == 0) {
                localStorage.ticketId = response.data.ticket_list[0].ticket_id;
                localStorage.ticketTxt = response.data.ticket_list[0].ticket_content;
                // var ticket_item='';
                // $('#billNotice').html(response.data.notice);
                // for(var i=0; i<response.data.ticket_list.length; i++){
                //   ticket_item += '<span data-ticketid="' + response.data.ticket_list[i].ticket_id + '">' + response.data.ticket_list[i].ticket_content + '</span>'
                // }
                // $('#ticketConList').html(ticket_item);
                // $('#ticketConList span').click(function(){
                //   $(this).addClass('active').siblings().removeClass('active');
                // });
                // if(localStorage.ticketTxt && localStorage.ticketTxt != '') {
                //   for(var i=0; i<$("#billContent").find('span').length; i++){
                //     if($("#billContent").find('span:eq('+i+')').text() == localStorage.ticketTxt){
                //       $("#billContent").find('span:eq('+i+')').addClass('active').siblings().removeClass('active');
                //     }
                //   }
                // } else {
                //   $("#billContent").find('span:eq(0)').addClass('active').siblings().removeClass('active');
                // }
            } else if (response.ret == 10009) {
                sucGetToken(getTicket);
            } else if (response.ret == 10003) {
                errorToken();
            } else {
                getTips(response.desp);
            }
        }
        //调用ajax
        ajaxWithHeader(urlHeader, dataParam, sucGetTicket);
    };

    // 点击单位取列表
    $("#danWei").click(function() {
        $('.billHeadUlBox').hide();
        $('.billemailUlBox').hide();
        $("#ticketEmail").val('');
        operateType = false;
        getAutoTicket(1);
    });



    // 点击输入款展示选择框
    $("#billHead").click(function() {
        showAutoTicketList(1)
    });
    // 点击邮箱展示选择框
    $("#ticketEmail").click(function() {
        if ($('#geRen').hasClass('icon-check-alt ion-ios-circle-filled')) {
            showAutoTicketList(0)
        }

    });
    // title录入时关闭选择列表
    $("#billHead").keyup(function() {
        $('.billHeadUlBox').hide();
    });
    // emial录入时关闭选择列表
    $("#ticketEmail").keyup(function() {
        $('.billemailUlBox').hide();
    });

    $("#ticketNo").change(function() {
        operateType = true;
    });
    $("#billHead").change(function() {
        operateType = true;
    });
    $("#ticketEmail").change(function() {
        operateType = true;
    });

    function showAutoTicketList(num) {
        // 0:个人||1：单位
        if (aotuTicketList.length > 0 && num == 1) {
            $('.billHeadUlBox').show();
            $('.billHeadUlBox').html('');
            for (var i = 0; i < aotuTicketList.length; i++) {
                $(".billHeadUlBox").append(" <li value=" + i + ">" + aotuTicketList[i].invoiceTittle + "</li>");
            }
            $('.billemailUlBox').hide();
        } else if (aotuTicketList.length == 0 && num == 1) {
            $('.billHeadUlBox').hide();
            $('.billHeadUlBox').html('');
            $('.billemailUlBox').hide();
        }else {
            $('.billemailUlBox').show();
            $('.billemailUlBox').html('');
            for (var i = 0; i < aotuTicketList.length; i++) {
                $(".billemailUlBox").append(" <li value=" + i + ">" + aotuTicketList[i].invoiceEmail + "</li>");
            }
        }

    }
    // 获取默认发票信息
    function getAutoTicket(num) {
        var urlHeader = ajaxLink + "order/get_member_invoice_list.ajax";
        var dataParam = "memberId=" + user_id + "&token=" + token + "&user_id=" + user_id + "&invoiceType=" + num;
        //成功获取发票分类的方法
        function sucGetTicket(response) {
            aotuTicketList = [];
            if (response.data.length > 0 && num == 1) {
                aotuTicketList = response.data;
                setAutoTicket(0);
            } else if (response.data.length > 0 && num == 0) {
                aotuTicketList = response.data;
                setAutoTicketGeren(0);
            }

        }
        //调用ajax
        // ajaxWithHeader(urlHeader, dataParam, sucGetTicket);
    };

    // 票据记录li点击事件
    $(".billHeadUlBox").delegate("li", "click", function(event) {
        var target = $(event.target);
        var ticNum = target.attr("value");
        $('.billHeadUlBox').hide()
        setAutoTicket(ticNum)
    });
    // 票据记录li点击事件
    $(".billemailUlBox").delegate("li", "click", function(event) {
        var target = $(event.target);
        var ticNum = target.attr("value");
        $('.billemailUlBox').hide()
        setAutoTicketGeren(ticNum)
    });

    function setAutoTicket(num) {
        $("#billHead").val(aotuTicketList[num].invoiceTittle);
        $("#ticketNo").val(aotuTicketList[num].invoiceTaxNo);
        $("#ticketEmail").val(aotuTicketList[num].invoiceEmail);
        localStorage.ticketId = aotuTicketList[num].id;
    };

    function setAutoTicketGeren(num) {
        $("#ticketEmail").val(aotuTicketList[num].invoiceEmail);
        localStorage.ticketId = aotuTicketList[num].id;
    }
});
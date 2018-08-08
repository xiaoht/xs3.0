
$(function () {
    var AddressListAPI = 'v1/address/list'
    var AddressAddAPI = 'v1/address/add'
    var AddressDelAPI = 'v1/address/delete'

    var paramDic = getUrlString();
    var type = paramDic["type"];
    var user_id = paramDic["user_id"];
    var token = paramDic["token"];
    var back = document.getElementById("backapp");
    // 原生返回
    back.onclick = function () {
        if (type == "ios") {
            window.location.href = "ios://back";
        } else if (type == "Android") {
            JSkit.back();
        } else {
            window.location.href = localStorage.orderAddress_url;
            // window.history.back();
            // window.history.go(-1);
        }
    };
    
    var addIdAry = [];
    getReceiptAddress();//执行获取收货地址
    var addList;

    //获取收货地址方法-------1
    function getReceiptAddress() {
        var urlHeader = ajaxLink + AddressListAPI;
        var dataParam = "user_id=" + user_id + "&token=" + token;
        //成功获取接口后执行
        function sucReceiptAddress(response) {
            console.log(response);
            if (response.ret == 0) {
                var data = response.data;
                addList = data;
                receiptAddress(data);
            } else if (response.ret == 10009) {
                sucGetToken(getReceiptAddress);
            } else if(response.ret == 10003) {
                errorToken();
            } else {
                getTips(response.desp);
            }
        }
        //调用ajax
        ajaxWithHeader(urlHeader, dataParam, sucReceiptAddress);
    }

    //设置默认收货地址方法-------2
    function getDefaultAddress(addressid) {
        var urlHeader = ajaxLink + "address/default.ajax";
        var dataParam = "user_id=" + user_id + "&token=" + token + "&address_id=" + addressid;
        //成功获取接口后执行
        function sucDefaultAddress(response) {
            console.log(response);
            if (response.ret == 0) {
                getReceiptAddress();
                getTips(response.data.desp_string);
            } else if (response.ret == 10009) {
                sucGetToken(getDefaultAddress);
            } else if(response.ret == 10003) {
                errorToken();
            } else {
                getTips(response.desp);
            }
        }
        //调用ajax
        ajaxWithHeader(urlHeader, dataParam, sucDefaultAddress);
    }

    //删除收货地址方法-------3
    function getDelAddress(addressid) {
        var urlHeader = ajaxLink + AddressDelAPI;
        var dataParam = "user_id=" + user_id + "&token=" + token + "&address_ids=" + addressid;
        //成功获取接口后执行
        function sucDelAddress(response) {
            console.log(response);
            if (response.ret == 0) {
                var data = response.data;
                getReceiptAddress();
                getTips(data.desp_string);
            } else if (response.ret == 10009) {
                sucGetToken(getDelAddress);
            } else if(response.ret == 10003) {
                errorToken();
            } else {
                getTips(response.desp);
            }
        }
        //调用ajax
        ajaxWithHeader(urlHeader, dataParam, sucDelAddress);
    }

    //点击新建页面地址事件
    $('.new-btn').click(function () {
        if ($('.items').length == 10) {
            getPopup("收货地址最多10个哦，请您先删除1个收货地址后才能添加新地址", "好");//弹出框
        } else {
            window.location.href = 'orderAddressNew.html?user_id=' + user_id + '&token=' + token;
        }
    });

    //收货地址页面显示
    function receiptAddress(data) {
        if(data == '' || data.length == 0) {
            $('#addrBox').hide();
            $('#addrEmpty').show();
        }
        var str = '';
        var temp = '';
        var default_html='';
        for (var i = 0; i < data.length; i++) {
            str += '<div class="items" detail_status=' + data[i].detail_status + '" data-addressid="' + data[i].address_id + '">';
            // if(data[i].detail_status == '0') {
            //     default_html = '<i class="icon-check-alt radio"></i>';
            // } else {
            //     default_html = '<i class="icon-radio-unchecked radio"></i>';
            // }
            // str += '<div class="addr-tit"><p class="addr-tit-default">' + default_html + '<span>默认地址</span></p>';
            // str += '<div class="addr-tit"><p class="addr-tit-default"><i class="icon-check-alt radio"></i><span></span></p>';
            // str += '<span class="right">删除</span></div>';
            str += '<div class="addr-info"><div class="addr-nametel">';

            // if (data[i].status == '0') {
            //     data[i].statusInfo = '已认证';
            //     temp = 'ca-icon';
            // } else if (data[i].status == '1') {
            //     data[i].statusInfo = '未认证';
            //     temp = 'un-ca-icon';
            // }
            str += '<h2 class="left" >' + data[i].address_name + '</h2>';
            str += '<span class="right tel">' + data[i].address_mobile + '</span></div>';
            // if (!data[i].identity_number == '') {
            //     str += '<p>' + data[i].province + data[i].city + data[i].area + data[i].detail_address + '</p></a><i class="icon-chevron-thin-right iconRight"></i></div>';
            // } else {
            //     str += '<p>' + data[i].province + data[i].city + data[i].area + data[i].detail_address + '</p></a></div>'
            //     ;
            // }

            if (!data[i].identity_number == '') {
                str += '<p>' + data[i].detail_address + '</p></a><i class="icon-chevron-thin-right iconRight"></i></div>';
            } else {
                str += '<p>' + data[i].detail_address + '</p></a></div>'
                ;
            }
            // str +='<i class="icon-chevron-thin-right iconRight"></i>'
            str += '</div>';

            addIdAry.push(data[i].address_id);
        }
        $('#addrBox').html(str);

        //点击事件删除收货地址
        $('.addr-tit span.right').click(function () {
            var address_id = $(this).parents('.items').attr('data-addressid');
            getConfirm("是否确定删除此地址", "取消", "确定");//弹出框
            //确认按钮点击事件
            $('.confirm-btn-sure').click(function () {
                $(this).parents('.confirm-bg').remove();
                document.removeEventListener('touchmove',touch, false);
                getDelAddress(address_id);//调用接口
            })
        });

        //单选事件设置默认地址
        $('.addr-tit-default').click(function () {
            if($(this).find('i').hasClass('icon-check-alt')) return;
            var address_id = $(this).parents('.items').attr('data-addressid');
            getDefaultAddress(address_id);//调用接口
        });

        //点击单个地址进入修改地址页面  保留对应的数据
        // $('.addr-info').click(function () {
        //     var _this = $(this).index('.addr-info');
        //     localStorage.addPrimary = JSON.stringify(addList[_this]);
        //     window.location.href = 'orderAddressNew.html?&modify=1&user_id=' + user_id + '&token=' + token;
        // })
    }

    function IDencrypt(obj) {
        if(obj.length > 7) {
            obj = obj.slice(0, 3) + '******' + obj.slice(-4);
        }
        return obj;
    }
});


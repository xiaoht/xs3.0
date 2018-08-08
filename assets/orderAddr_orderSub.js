/**
 * Created by 潘红霞 on 2016/7/11.
 */
$(function () {
    var AddressListAPI = 'v1/address/list'
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
            // localStorage.orderSubmit_index = parseInt(localStorage.orderSubmit_index) - 1;
            // window.history.back();
            window.location.href = localStorage.orderSub_url;
        }
    };

    var addIdAry = [];
    getReceiptAddress();//执行获取收货地址
    var addList;

    //点击管理收货地址
    $('.new-btn').click(function () {
        localStorage.orderAddress_url = window.location.href;
        window.location.href = 'orderAddress.html?user_id=' + user_id + '&token=' + token;
    });

    //获取收货地址方法-------1
    function getReceiptAddress() {
        var urlHeader = ajaxLink + AddressListAPI;
        var dataParam = "user_id=" + user_id + "&token=" + token;

        ////成功获取接口后执行
        function sucReceiptAddress(response) {
            if (response.ret == 0) {
                var data = response.data;
                console.log(response.data);
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

    //收货地址页面显示
    function receiptAddress(data) {
        if(data == '' || data.length == 0) {
            $('#addrBox').hide();
            $('#addrEmpty').show();
            // window.location.href = 'orderAddress.html?user_id=' + user_id + '&token=' + token;
        }
        var str = '';
        var temp = '';
        var default_html='';
        for (var i = 0; i < data.length; i++) {
            str += '<div class="items" detail_status="' + data[i].detail_status + '" data-addressid="' + data[i].address_id + '">';
            if(data[i].detail_status == '0') {
                default_html = '<i class="icon-check-alt radio"></i>';
                str += '<div class="addr-tit"><p class="addr-tit-default">' + default_html + '<span>默认地址</span></p>';
                str += '</div>';
            } else {
                // default_html = '<i class="icon-radio-unchecked radio"></i>';
            }

            str += '<div class="addr-info"><div class="addr-nametel">';
            // if (data[i].status == 0) {
            //     data[i].statusInfo = '已认证';
            //     temp = 'ca-icon';
            // } else if (data[i].status == 1) {
            //     data[i].statusInfo = '未认证';
            //     temp = 'un-ca-icon';
            // }
            str += '<h2 class="left" >' + data[i].address_name + '</h2>';
            str += '<span class="right tel">' + data[i].address_mobile + '</span></div>';
            // if (!data[i].identity_number == '') {
            //     str += '<p>' + data[i].province + data[i].city + data[i].area + data[i].detail_address + '</p></a></div>';
            // } else {
            //     str += '<p>' + data[i].province + data[i].city + data[i].area + data[i].detail_address + '</p></a></div>';
            // }

            if (!data[i].identity_number == '') {
                str += '<p>'+data[i].detail_address + '</p></a></div>';
            } else {
                str += '<p>' +  data[i].detail_address + '</p></a></div>';
            }
            str += '</div>';
            addIdAry.push(data[i].address_id);
        }
        $('#addrBox').html(str);

        //点击选择收货地址
        $('.addr-info').click(function () {
            var address_id = $(this).parent('.items').attr('data-addressid');
            localStorage.addressId = address_id;
            // if(type) {
            //   window.location.href = localStorage.orderSub_url;
            // } else {
            //   localStorage.orderSubmit_index = parseInt(localStorage.orderSubmit_index) + 1;
            //   window.history.back();
            // }
            localStorage.orderSubmit_index = parseInt(localStorage.orderSubmit_index) + 1;
            window.location.href = localStorage.orderSub_url;
        });
    }
});


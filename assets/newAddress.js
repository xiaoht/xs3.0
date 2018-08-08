$(function () {
    var addressAddAPI = 'v1/address/add';
    var paramDic = getUrlString();
    var type = paramDic["type"];
    var user_id = paramDic["user_id"];
    var token = paramDic["token"];
    var back = document.getElementById("backapp");
    var address_name, address_mobile, address_identity_card, province, city, area, detail_address, province_code, city_code, area_code;
    var addPrimary;
    // 原生返回
    back.onclick = function () {
        if (type == "ios") {
            window.location.href = "ios://back";
        } else if (type == "Android") {
            JSkit.back();
        } else {
            // location.href=document.referrer;
            window.location.href = localStorage.orderAddress_url;
        }
    };
    $(".jz_conv_8888_bottom-box").css({"position": "relative", "z-index": 1});
    $(document).on("click", "body", function (e) {//解决使用iscroll 5 input 不能失去焦点的bug
        if (e.target.nodeName != "INPUT") {
            $('input').blur();
        }
    });
    newAreaSelector('请选择省市区');
    // var itemW = $('.addr-item').width();
    // var leftW = $('#uAddr span').width();
    // var rightW = (itemW - leftW - 28) + 'px';
    // $('#uAddr textarea').width(rightW);
    // 进入页面截取参数判断为修改页面还是新建
    var modify = GetQueryString('modify');
    if (modify == 1) {//修改页面
        addPrimary = JSON.parse(localStorage.addPrimary);
        getAddInfo();
    }
    //点击保存事件的验证及调接口
    $('.nav-edit').click(function () {
        var jIuserDistrict = $('#J_iuserDistrict input').val();//省市区
        address_name = $('#uName input').val();//姓名
        address_mobile = $('#uTel input').val();//手机号
        // address_identity_card = $('#uCertificate input').val();//身份证号
        detail_address = $('#uAddr textarea').val();//详细地址
        if (address_name == '') {
            getTips("请输入收货人姓名");
            return;
        }
        if (!valPhoneNum(address_mobile)) {
            getTips("请输入正确的手机号码");
            return;
        }
        // if (address_identity_card !== '') {
        //    if (!valIdNo(address_identity_card)) {
        //        getTips("请输入正确的身份证号码");
        //        return;
        //    }
        // }
        if (jIuserDistrict == '') {
            getTips("请选择省市区");
            return;
        } else {
            var addAry = jIuserDistrict.split(' ');
            province = addAry[0];
            city = addAry[1];
            area = addAry[2];
            var province_list = $("#areaSelector").children();
            for (var i=0; i<province_list.length; i++) {
                if(province_list[i].innerHTML.split('<')[0] == province) {
                    province_code = $("#areaSelector").children('li:eq('+i+')').attr('data-code');
                    var city_list = $("#areaSelector").children('li:eq('+i+')').children('ul');
                    for(var j=0; j<city_list.length; j++) {
                        var city_txt = $("#areaSelector").children('li:eq('+i+')').children('ul:eq('+j+')').children('li').html().split('<')[0];
                        var city_txt_id = $("#areaSelector").children('li:eq('+i+')').children('ul:eq('+j+')').children('li').attr('data-code');
                        if(city_txt == city) {
                            city_code = city_txt_id;
                            var area_list = $("#areaSelector").children('li:eq('+i+')').children('ul:eq('+j+')').children('li').children('ul').find('li');
                            for(var k=0; k<area_list.length; k++) {
                                var area_txt = area_list[k].innerText;
                                var area_txt_id = area_list[k].outerHTML.split('"')[1];
                                if(area_txt == area) {
                                    area_code = area_txt_id;
                                }
                            }
                        }
                    }
                }
            }
        }
        if (detail_address == '') {
            getTips("请输入详细地址");
            return;
        } else {
            addLoading();
            if (modify == '1') {//修改页面
                getModifyAddress();
            }else{
                getNewAddress();
            }
        }
    });

    //获取收货地址方法-------1
    function getNewAddress() {
        var urlHeader = ajaxLink + addressAddAPI;
        var dataParam = "user_id=" + user_id + "&token=" + token + "&address_name=" + address_name + "&address_mobile=" + address_mobile + "&address_identity_card=" + address_identity_card + "&province=" + province_code + "&city=" + city_code + "&area=" + area_code + "&detail_address=" + detail_address;
        //成功获取接口后执行  addPrimary
        function sucNewAddress(response) {
            if (response.ret == 0) {
                // var data = response.data;
                getTips('添加'+response.desp);
                // setTimeout(function(){
                    removeLoading();
                    if (type == "ios") {
                        window.location.href = "ios://back";
                    } else if (type == "Android") {
                        JSkit.back();
                    } else {
                        // location.href=document.referrer;
                        window.location.href = localStorage.orderAddress_url;
                    }
                // },1000);
            } else if (response.ret == 10009) {
                removeLoading();
                sucGetToken(getNewAddress);
            } else if(response.ret == 10003) {
                removeLoading();
                errorToken();
            } else {
                removeLoading();
                getTips(response.desp);
            }
        }

        //调用ajax
        ajaxWithHeader(urlHeader, dataParam, sucNewAddress,'POST');
    }

    //修改收货地址方法-------1
    function getModifyAddress() {
        var urlHeader = ajaxLink + "address/edit.ajax";
        var dataParam = "user_id=" + user_id + "&token=" + token + "&address_id=" + addPrimary.address_id + "&address_name=" + address_name + "&address_mobile=" + address_mobile + "&address_identity_card=" + address_identity_card + "&province=" + province_code + "&city=" + city_code + "&area=" + area_code + "&detail_address=" + detail_address;
        //成功获取接口后执行
        function sucModifyAddress(response) {
            console.log(response);
            if (response.ret == 0) {
                var data = response.data;
                getTips(data.desp_string);
                // setTimeout(function(){
                    removeLoading();
                    if (type == "ios") {
                        window.location.href = "ios://back";
                    } else if (type == "Android") {
                        JSkit.back();
                    } else {
                        // location.href=document.referrer;
                        window.location.href = localStorage.orderAddress_url;
                    }
                // },1000);
            } else if (response.ret == 10009) {
                removeLoading();
                sucGetToken(getModifyAddress);
                removeLoading();
            } else if(response.ret == 10003) {
                errorToken();
            } else {
                removeLoading();
                getTips(response.desp);
            }
        }

        //调用ajax
        ajaxWithHeader(urlHeader, dataParam, sucModifyAddress);
    }

    //修改地址渲染页面

    function getAddInfo() {
        $('.nav-tit').text('修改收货地址');//标题更改
        $('#uName input').val(addPrimary.address_name);
        $('#uTel input').val(addPrimary.address_mobile);
        if (addPrimary.identity_number) {
            $('#uCertificate input').val(addPrimary.identity_number);
        }
        $('#J_iuserDistrict input').val(addPrimary.province + ' ' + addPrimary.city + ' ' + addPrimary.area);
        $('#uAddr textarea').val(addPrimary.detail_address);
        if(addPrimary.status == '0') {
            $('#uName input').attr('readonly', true).css('color', '#999');
            $('#uCertificate input').attr('readonly', true).css('color', '#999');
        }
    }
    //身份证
    function valIdNo(IdNo){var idcard = new clsIDCard(IdNo); return idcard.IsValid();}
});
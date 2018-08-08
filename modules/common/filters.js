
//图片地址过滤器 参数 wh为已;分割的宽高尺寸，比如10;10，是宽10高10
makerApp.filter('imgUrlFilter', function () {
    return function (value, wh) {
        if (!value) {
            return 'img/10x10.png'
        }
        //图片地址
        var pic = CDFG_IP_IMAGE + value;
        if (wh) {
            var size = wh.split(';');
            pic += '&op=s1_w' + size[0] + '_h' + size[1] + '_e1-c0_x0_y0_w' + size[0] + '_h' + size[1];
        }
        return pic;
    }
});

makerApp.filter('imgUrlFilter2', function () {
    return function (value, wh) {
        if (!value) {
            return 'img/10x10.png'
        }
        //图片地址
        var pic = "https://img14.zhongmian.com/rc/get?rid=" + value;
        if (wh) {
            var size = wh.split(';');
            pic += '&op=s1_w' + size[0] + '_h' + size[1] + '_e1-c0_x0_y0_w' + size[0] + '_h' + size[1];
        }
        return pic;
    }
});
/*时间拦截器 将毫秒转化为时间*/
makerApp.filter('millisecondFilter', function () {
    return function (value) {
        var format = function (time, format) {
            var t = new Date(time);
            var tf = function (i) {
                return (i < 10 ? '0' : '') + i
            };
            return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function (a) {
                switch (a) {
                    case 'yyyy':
                        return tf(t.getFullYear());
                        break;
                    case 'MM':
                        return tf(t.getMonth() + 1);
                        break;
                    case 'mm':
                        return tf(t.getMinutes());
                        break;
                    case 'dd':
                        return tf(t.getDate());
                        break;
                    case 'HH':
                        return tf(t.getHours());
                        break;
                    case 'ss':
                        return tf(t.getSeconds());
                        break;
                }
            })
        }
        //返回时间 格式 format(value, 'yyyy-MM-dd HH:mm:ss');
        return format(value, 'yyyy-MM-dd HH:mm:ss');
    }
});


/*图片拦截器*/
makerApp.filter('imagesFilter', function () {
    return function (value) {
        var osrc = value;
        var nsrc = 'img/default.png';
        if (ENVIRONMENT == 0) {
            //生产环境,路径不处理
            if (osrc) {
                nsrc = osrc;
            }
        } else {
            //测试环境
            if (osrc) {
                if (osrc.indexOf("10000") >= 0) {
                    if (osrc != null) {
                        nsrc = osrc.split(':');
                        nsrc = '//172.16.75.208:' + nsrc[1];
                    }
                } else {
                    if (osrc != null) {
                        nsrc = '//172.16.75.208:8082' + osrc;
                    }
                }
            }
        }
        return nsrc;
    }
});


/*头像图片拦截器*/
makerApp.filter('headImgFilter', function () {
    return function (value) {
        var osrc = value;
        var nsrc = 'img/headImgDefault.png';
        //change by geshuo 20151229
        if (ENVIRONMENT == 0) {
            //生产环境,路径不处理
            if (osrc) {
                nsrc = osrc;
            }
        } else {
            //测试环境
            if (osrc) {
                if (osrc.indexOf("10000") >= 0) {
                    if (osrc != null) {
                        nsrc = osrc.split(':');
                        if (nsrc[1]) {
                            nsrc = '//172.16.75.208:' + nsrc[1];
                        } else {
                            nsrc = '//172.16.75.208:' + nsrc[0];
                        }
                    }
                } else {
                    if (osrc != null) {
                        nsrc = '//172.16.75.208:8082' + osrc;
                    }
                }
            }
        }
        return nsrc;
    }
});

/*跳转拦截器*/
makerApp.filter('massageUrlFilter', function () {
    return function (value) {
        console.log(value);
        return value;
    }
});

/** 时间计时器 */
makerApp.filter('timeFilter', function () {
    return function (goodsList) {
        //console.log(goodsList);
        return goodsList;
    }
});



makerApp.filter('trustHtml', function ($sce) {
    return function (input) {
        return $sce.trustAsHtml(input);
    }
});

makerApp.filter('deleteATag', function ($sce) {
    return function (input) {
        if(input.indexOf('<a') > 0){
            try{
                var str1 = input.substring(0,input.indexOf('<a'));
                var str2 = input.substring(input.indexOf('<a'),input.indexOf('</a')+4);
                var str3 = input.substring(input.indexOf('</a')+4);
                str2 = str2.substring(str2.indexOf('>')+1,str2.indexOf('<',2));

                return str1+str2+str3;
            }catch (e){
                return input;
            }

        }
        return input;
    }
});
function newAreaSelector(initValue){
    $('#areaSelector').mobiscroll().treelist({
        theme: 'mobiscroll',//样式
        display: 'bottom',//指定显示模式
        fixedWidth: [160,160,160],//三组滚动框的宽度
        placeholder: initValue,//空白等待提示
        lang: 'zh', //语言
        mode:'scroller',//选择模式  scroller  clickpick  mixed
        rtl:false,//按钮是否靠右
        headerText:'',//头部提示文字
        rows:5,//滚动区域内的行数
        defaultValue: ['北京', '北京', '东城区'],//设置初始值
        labels: ['省', '市', '区'],
        showInput:true,
        showLabel:true,//是否显示labels
        closeOnOverlay:false,//如果为ture覆盖点击将滚动条内数据将关闭遮罩层
        tap:true,
        onSelect: function (valueText, inst) {
            setAreaSelectedVal(valueText);
        },
        formatResult: function (data) {
            return data[0] + ' ' + data[1] + ' '+ data[2];
        }
    });
}

function setAreaSelectedVal(areaVal)
{
    $('#areaSelector_dummy').val(areaVal);
    $("#areaSelector_dummy").attr('placeholder', areaVal);
}

function getAreaSelectedVal()
{
    return $('#areaSelector_dummy').val();
}

function getPlaceholderVal()
{
    return $("#areaSelector_dummy").attr('placeholder')
}

function isOpenAreaSelect()
{
    return $("#areaSelector_dummy").hasClass('dwtd') ? true : false
}
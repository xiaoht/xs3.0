//接口地址管理
makerApp.service('UrlService', [function () {

  // 服务器地址
  // var server_url = CDFG_SERVER;
      var server_url = 'https://api.xsbuy.cn/';
  //图片地址
  var imageHead =  'https://' + CDFG_IP_IMAGE;


  this.imgServerUrl = {
    imgUrl: imageHead
  };
  //判断数据返回是否成功
  this.httpIsSuccess = {
    SUCCESS_CODE: 'E0001',
    PARAMETER_ERROR_CODE: 'E0002',
    NULL_VALUE_CODE: 'E0003',
  };

  //访问接口总汇
  this.urls = {
    get_first_type_url: 'select_category_list',  //获取一级分类
    select_message_url: 'message/get_messages',//b2c获取消息列表
    read_message_url: 'message/read_messages',//b2c标记消息为已读
    delete_message_url: 'message/delete_messages',//b2c删除消息
    message_num: 'message/get_unread_message_number',//b2c获取未读消息数量
    select_myFootprint_url: 'member/findBrowseHistory',//b2c获取足迹列表
    deleteAll_myFootprint_url: 'deleteAll_myFootprint',
    select_goods_detail_url: 'select_goods_detail', //查询商品详情
    findCombinationValuesByItemId_url: 'findCombinationValuesByItemId', //查询商品详情
    // select_goods_list_url: '/search/get_hot_search', //频道专场下面分类查询假数据
    select_goods_list_url: 'v1/classify/get-goods-classify', //频道专场下面分类查询假数据 因为b2c需要改成
    select_goods_attr_values_url: 'select_goods_attr_values', //获取商品属性
    select_score_order_info_url: 'select_score_order_info', //评价订单页面信息加载
    submit_order_score_url: 'submit_order_score', //提交评价接口
    save_address_url:"save_address", //添加地址
    logout_url:"logout",  //b2c推出登录
    upLoad_headImg_url:"upLoad_headImg", //上传头像
    store_info_url:"store_info", //店铺基本信息
    store_wx_number:"select_custom_service", //店铺微信号
    calcGoodsCarriage_url:"calcGoodsCarriage", //计算运费
    calcGoodsListCarriage_url:"calcGoodsCarriageList", //计算多个商品的运费
    add_mall_getCollectionShop_url:"add_mall_getCollectionShop", //收藏店铺
    add_unfavorite_goods_url: "add_unfavorite_goods", //收藏商品
    delete_unfavorite_goods_url: "delete_unfavorite_goods",  //取消收藏商品
    delete_unfavorite_shop_url: "delete_unfavorite_shop", //取消收藏店铺
    toOrderConfirm_url: 'toOrderConfirm', //购物车跳转到订单加载数据
    findPageLayoutDataListBySubsystemIdAndPageIdAndStoreId_url:'findPageLayoutDataListBySubsystemIdAndPageIdAndStoreId',//店铺装修
    status_change_all_url: "status_change_all", //修改阅读状态
    get_message_num_url: "get_message_num",//获取未读消息个数
    save_order_url: "save_order", //提交订单去结算
    createOrder_url: "createOrder",//立即购买去结算
    findPageLayoutDataListBySubsystemIdAndPageId_url: 'findPageLayoutDataListBySubsystemIdAndPageId', //首页装修
    select_one_coupon_from_store_url: "select_one_coupon_from_store",  //加载一个刮刮乐
    receive_coupon_url: "receive_coupon",  //领取优惠券
    add_myFootprint_url: "add_myFootprint", //添加足迹
    querySc_url: "cart/get_cart_num", //购物车数量
    findPageLayoutDataById_url: "findPageLayoutDataById",  //专场装修
    scKillpromotion_url: "toPromotionMoreList",    //请求活动接口
    start_wx_payment_url: "start_wx_payment",  //获取支付信息接口
    start_wx_config_url: "wx_signature?page_url=https://172.16.63.208:8085",  //获取微信初始化接口
    toOrderConfirmByImmediately_url: "toOrderConfirmByImmediately",
    addCombinationShopcart_url: "addCombinationShopcart", //组合商品加入购物车
    get_wx_code:"",
    updateScoreOrderInfo_url:"updateScoreOrderInfo",//修改订单
    toGeneSendBack_url: "toGeneSendBack", //回寄页面加载
    confirmSendBack_url: "confirmSendBack", //提交回寄信息
    retrunItemAmountMoney_url: "retrunItemAmountMoney",
  /** 丁景元 end ---------------------------------------------------------------------------------------------------*/

    /** 王文超 start -------------------------------------------------------------------------------------------------*/
    //STORE_INFO: 'data/store_info.json', //店铺信息
    //STORE_GOOD_LIST: 'data/store_commodity.json',//店铺商品列表
    /** 王文超 end ---------------------------------------------------------------------------------------------------*/
    /** 曲嵬齐 start -------------------------------------------------------------------------------------------------*/
    SELECT_ORDER_LIST:'select_order_list',//获取全部订单
    SELECT_MALL_GETCOLLECTIONGOODS:'select_mall_getCollectionGoods',//收藏商品的列表
    DELETE_UNFAVORITE_GOODS:'delete_unfavorite_goods',//取消收藏商品
    SELECT_MALL_GETCOLLECTIONSHOP:'select_mall_getCollectionShop',//收藏店铺的列表
    DELETE_UNFAVORITE_SHOP:'delete_unfavorite_shop',//取消收藏的店铺
    toShipping:'toShipping',//订单物流信息
    remindShipping:'remindShipping', // 提醒发货
    doConfirmReceive:'doConfirmReceive',//确定收货
    doCancelOrder:'doCancelOrder',//关闭交易
    saveExtendReceive:'saveExtendReceive', //延长收货
    checkExtendReceive:'checkExtendReceive',//验证 是否是第一次延长收货
    toOrderDetail:'toOrderDetail',//订单详情
    select_mg_refundList:'select_mg_refundList',//退换货管理列表
    applyRefund:'applyRefund',//退款退货管理-申请-初始加载
    addApplyRefund:'addApplyRefund',//退款退货管理-提交-添加
    submit_Second_Score:'submitSecondScore',//二次评价
    doCancelReturnOrder:'doCancelReturnOrder',//撤销退款申请
    toReturnOrderDetail:'toReturnOrderDetail',//退款详情
    select_help_center_category_list:'select_help_center_category_list',//帮助中心
    select_help_center_category_and_content:'select_help_center_category_and_content',//问题列表
    select_help_center_content_detail:'select_help_center_content_detail',//问题详情
    platformInterpose:'platformInterpose',//平台介入
    returnEditApplyRefund:'returnEditApplyRefund',// 跳转修改退款申请页面
    select_points_list:'member/findMemberPointsDetailList',//b2c加载积分列表
    select_total_points:'select_total_points',//获取会员总积分
    select_my_coupon_list:'select_my_coupon_list' ,//加载我的礼包
    editApplyRefund:'editApplyRefund', //修改保存退款申请
    select_goods_list_by_category:'select_goods_list_by_category',//通过店铺分类取得商品一览.
    selectCouponForStore:'selectCouponForStore',//获取店铺优惠券列表

    /** 曲嵬齐 end ----------------------------------------------------------------------------------------------------*/
    /** 曹越 start  ------------------------------------------------------------------------------------------------- */
    mine_url:'get_user_info',//b2c个人中心接口
    mine_num_url:'v1/order/get-order-list-num',//订单数量接口
    change_password_url:'change_password',//b2c修改密码
    check_old_mobile_url:'check_old_mobile',//b2c验证绑定手机号
    bind_mobile_url:'binding_mobile',//b2c绑定手机号
    get_vericode_url:'get_auth_code',//b2c获取验证码
    checkUser_url:'check_user',//b2c检验用户
    get_authmail_url:'register/get_auth_mail',//b2c获取验证邮件
    get_newcollection_url:'get_favorite_goods_list',//b2c获取收藏列表
    add_delete_newcollection_url:'add_or_delete_favorite_goods',//b2c添加或者删除收藏列表
    get_focusProduct_url:'member/get_focus_brand_list',//b2c获取关注列表
    add_delete_focusProduct_url:'member/add_or_cancel_focus_brand',//b2c添加或者删除关注列表
    update_personal_infomation_url:'change_user_info',//b2c修改个人信息
    get_first_level_url:'v1/classify/get-classify-list',//b2c获取一级类目
    get_second_level_url:'v1/classify/get-goods-classify',//b2c获取二级类目
    get_polular_brand_url:'v1/classify/get-goods-classify',//b2c获取二级类目
    verify_password_url:'verify_password',//b2c验证密码
    get_home_carousel_url:'v1/home/get-home-carousel-figure',//b2c获取轮播图
    get_home_columns_url:'v1/home/get-home-columns',//b2c获取首页栏目
    get_home_newday_url:'home/get_home_newday',//b2c获取每日上新
    get_home_recommend_url:'v1/home/get-home-recommend',//b2c获取推荐
    get_home_activities_url:'home/get_home_activities',//b2c获取首页热门/精选活动
    get_home_hot_sale_url:'home/get_home_hot_sale',//b2c获取热卖
    get_home_newgoods_url:'home/get_home_newgoods',//b2c获取新品
    get_home_hot_brand_url:'home/get_home_hot_brand',//b2c获取热门品牌
    get_home_floor_all_url:'home/get_home_floor_all',//b2c获取热门品牌
    get_activities_timelimit_url:'activities/get_activities_timelimit',//b2c获取限时购活动
    get_activities_common_url:'activities/get_activities_common',//b2c获常规活动
    mine_outLogin_url:'logout',//退出按钮
    address_list_url:'select_address_list',//地址列表接口
    set_defult_url:'save_defult_address',//设置默认地址接口
    set_delete_address_url:'delete_address',//删除地址接口
    find_defult_address_url: 'find_defult_address', //根据id查询地址
    set_country_address_url:'find_defult_address',//请求省市区接口
    addTo_shopCart_goods:'insert_shopCar',//加入购物车接口
    shopCart_list_url:'shopping_cart',//购物车列表接口
    shopCart_amount_url:'upShoppingCartAmount',//购物车增加减少商品数量接口
    shopCart_delete_url:'shoppingCartToDelete',//购物车删除接口
    shopCart_toBalance_url:'shoppingCartToBalance',//购物车去结算接口
    mine_update_password_url:'update_password',//修改密码接口
    login_check_phone_url:'check_phone',//判断手机号是否注册
    select_captcha_url: 'select_captcha', //获取验证码
    login_url:'insert_user',//注册接口
    // toLogin_url:'toLogin',//登录接口
    toLogin_url:'login',//lafite登录
    heartbeat_url:'heartbeat',//心跳接口
    select_goods_introduction_url:'select_goods_introduction',//商品详情》商品详细加载
    select_goods_score_list_url: 'select_goods_score_list', //商品详情》商品评论区
    forget_password_url: "forget_password",
    url_cllect : "check_unfavorite_shop",//判断店铺是否收藏
    check_collect_url:"check_unfavorite_goods",//判断商品是否收藏
    flowCountStatisticsUrl:"img.htwins.com.cn/tj",
    /** 曹越 end    --------------------------------------------------------------------------------------------------*/
    gethotSearch:"search/get_hot_search",
    select_second_store_cat_list:'select_store_category_list',//获取店铺二级分类列表
    getGoodDetail:"goods/get_goods_details",
    addEvaluate:"evaluate/evaluate_added"
  };
  //循环地址把服务器地址加上去
  for (var key in this.urls) {
    this.urls[key] = server_url + this.urls[key];
  }
}]);

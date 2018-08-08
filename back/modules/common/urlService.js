//接口地址管理
makerApp.service('UrlService', [function () {

  // 服务器地址
  var server_url = CDFG_SERVER;
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
    /** 丁景元 start -------------------------------------------------------------------------------------------------*/
    get_first_type_url: 'select_category_list.ajax',  //获取一级分类
    select_message_url: 'message/get_messages.ajax',//b2c获取消息列表
    read_message_url: 'message/read_messages.ajax',//b2c标记消息为已读
    delete_message_url: 'message/delete_messages.ajax',//b2c删除消息
    message_num: 'message/get_unread_message_number.ajax',//b2c获取未读消息数量
    select_myFootprint_url: 'member/findBrowseHistory.ajax',//b2c获取足迹列表
    deleteAll_myFootprint_url: 'deleteAll_myFootprint.ajax',
    select_goods_detail_url: 'select_goods_detail.ajax', //查询商品详情
    findCombinationValuesByItemId_url: 'findCombinationValuesByItemId.ajax', //查询商品详情
    // select_goods_list_url: '/search/get_hot_search.ajax', //频道专场下面分类查询假数据
    select_goods_list_url: 'goods/search_goods.ajax', //频道专场下面分类查询假数据 因为b2c需要改成
    select_goods_attr_values_url: 'select_goods_attr_values.ajax', //获取商品属性
    select_score_order_info_url: 'select_score_order_info.ajax', //评价订单页面信息加载
    submit_order_score_url: 'submit_order_score.ajax', //提交评价接口
    save_address_url:"save_address.ajax", //添加地址
    logout_url:"logout.ajax",  //b2c推出登录
    upLoad_headImg_url:"upLoad_headImg.ajax", //上传头像
    store_info_url:"store_info.ajax", //店铺基本信息
    store_wx_number:"select_custom_service.ajax", //店铺微信号
    calcGoodsCarriage_url:"calcGoodsCarriage.ajax", //计算运费
    calcGoodsListCarriage_url:"calcGoodsCarriageList.ajax", //计算多个商品的运费
    add_mall_getCollectionShop_url:"add_mall_getCollectionShop.ajax", //收藏店铺
    add_unfavorite_goods_url: "add_unfavorite_goods.ajax", //收藏商品
    delete_unfavorite_goods_url: "delete_unfavorite_goods.ajax",  //取消收藏商品
    delete_unfavorite_shop_url: "delete_unfavorite_shop.ajax", //取消收藏店铺
    toOrderConfirm_url: 'toOrderConfirm.ajax', //购物车跳转到订单加载数据
    findPageLayoutDataListBySubsystemIdAndPageIdAndStoreId_url:'findPageLayoutDataListBySubsystemIdAndPageIdAndStoreId.ajax',//店铺装修
    status_change_all_url: "status_change_all.ajax", //修改阅读状态
    get_message_num_url: "get_message_num.ajax",//获取未读消息个数
    save_order_url: "save_order.ajax", //提交订单去结算
    createOrder_url: "createOrder.ajax",//立即购买去结算
    findPageLayoutDataListBySubsystemIdAndPageId_url: 'findPageLayoutDataListBySubsystemIdAndPageId.ajax', //首页装修
    select_one_coupon_from_store_url: "select_one_coupon_from_store.ajax",  //加载一个刮刮乐
    receive_coupon_url: "receive_coupon.ajax",  //领取优惠券
    add_myFootprint_url: "add_myFootprint.ajax", //添加足迹
    querySc_url: "v1/cart/get-cart-num", //购物车数量
    findPageLayoutDataById_url: "findPageLayoutDataById.ajax",  //专场装修
    scKillpromotion_url: "toPromotionMoreList.ajax",    //请求活动接口
    start_wx_payment_url: "start_wx_payment.ajax",  //获取支付信息接口
    start_wx_config_url: "wx_signature.ajax?page_url=https://172.16.63.208:8085",  //获取微信初始化接口
    toOrderConfirmByImmediately_url: "toOrderConfirmByImmediately.ajax",
    addCombinationShopcart_url: "addCombinationShopcart.ajax", //组合商品加入购物车
    get_wx_code:"",
    updateScoreOrderInfo_url:"updateScoreOrderInfo.ajax",//修改订单
    toGeneSendBack_url: "toGeneSendBack.ajax", //回寄页面加载
    confirmSendBack_url: "confirmSendBack.ajax", //提交回寄信息
    retrunItemAmountMoney_url: "retrunItemAmountMoney.ajax",
  /** 丁景元 end ---------------------------------------------------------------------------------------------------*/

    /** 王文超 start -------------------------------------------------------------------------------------------------*/
    //STORE_INFO: 'data/store_info.json', //店铺信息
    //STORE_GOOD_LIST: 'data/store_commodity.json',//店铺商品列表
    /** 王文超 end ---------------------------------------------------------------------------------------------------*/
    /** 曲嵬齐 start -------------------------------------------------------------------------------------------------*/
    SELECT_ORDER_LIST:'select_order_list.ajax',//获取全部订单
    SELECT_MALL_GETCOLLECTIONGOODS:'select_mall_getCollectionGoods.ajax',//收藏商品的列表
    DELETE_UNFAVORITE_GOODS:'delete_unfavorite_goods.ajax',//取消收藏商品
    SELECT_MALL_GETCOLLECTIONSHOP:'select_mall_getCollectionShop.ajax',//收藏店铺的列表
    DELETE_UNFAVORITE_SHOP:'delete_unfavorite_shop.ajax',//取消收藏的店铺
    toShipping:'toShipping.ajax',//订单物流信息
    remindShipping:'remindShipping.ajax', // 提醒发货
    doConfirmReceive:'doConfirmReceive.ajax',//确定收货
    doCancelOrder:'doCancelOrder.ajax',//关闭交易
    saveExtendReceive:'saveExtendReceive.ajax', //延长收货
    checkExtendReceive:'checkExtendReceive.ajax',//验证 是否是第一次延长收货
    toOrderDetail:'toOrderDetail.ajax',//订单详情
    select_mg_refundList:'select_mg_refundList.ajax',//退换货管理列表
    applyRefund:'applyRefund.ajax',//退款退货管理-申请-初始加载
    addApplyRefund:'addApplyRefund.ajax',//退款退货管理-提交-添加
    submit_Second_Score:'submitSecondScore.ajax',//二次评价
    doCancelReturnOrder:'doCancelReturnOrder.ajax',//撤销退款申请
    toReturnOrderDetail:'toReturnOrderDetail.ajax',//退款详情
    select_help_center_category_list:'select_help_center_category_list.ajax',//帮助中心
    select_help_center_category_and_content:'select_help_center_category_and_content.ajax',//问题列表
    select_help_center_content_detail:'select_help_center_content_detail.ajax',//问题详情
    platformInterpose:'platformInterpose.ajax',//平台介入
    returnEditApplyRefund:'returnEditApplyRefund.ajax',// 跳转修改退款申请页面
    select_points_list:'member/findMemberPointsDetailList.ajax',//b2c加载积分列表
    select_total_points:'select_total_points.ajax',//获取会员总积分
    select_my_coupon_list:'select_my_coupon_list.ajax' ,//加载我的礼包
    editApplyRefund:'editApplyRefund.ajax', //修改保存退款申请
    select_goods_list_by_category:'select_goods_list_by_category.ajax',//通过店铺分类取得商品一览.
    selectCouponForStore:'selectCouponForStore.ajax',//获取店铺优惠券列表

    /** 曲嵬齐 end ----------------------------------------------------------------------------------------------------*/
    /** 曹越 start  ------------------------------------------------------------------------------------------------- */
    mine_url:'get_user_info.ajax',//b2c个人中心接口
    mine_num_url:'order/get_order_list_num.ajax',//订单数量接口
    change_password_url:'change_password.ajax',//b2c修改密码
    check_old_mobile_url:'check_old_mobile.ajax',//b2c验证绑定手机号
    bind_mobile_url:'binding_mobile.ajax',//b2c绑定手机号
    get_vericode_url:'get_auth_code.ajax',//b2c获取验证码
    checkUser_url:'check_user.ajax',//b2c检验用户
    get_authmail_url:'register/get_auth_mail.ajax',//b2c获取验证邮件
    get_newcollection_url:'get_favorite_goods_list.ajax',//b2c获取收藏列表
    add_delete_newcollection_url:'add_or_delete_favorite_goods.ajax',//b2c添加或者删除收藏列表
    get_focusProduct_url:'member/get_focus_brand_list.ajax',//b2c获取关注列表
    add_delete_focusProduct_url:'member/add_or_cancel_focus_brand.ajax',//b2c添加或者删除关注列表
    update_personal_infomation_url:'change_user_info.ajax',//b2c修改个人信息
    get_first_level_url:'classify/get_first_level.ajax',//b2c获取一级类目
    get_second_level_url:'classify/get_second_level.ajax',//b2c获取二级类目
    get_polular_brand_url:'classify/get_three_level.ajax',//b2c获取二级类目
    verify_password_url:'verify_password.ajax',//b2c验证密码
    get_home_carousel_url:'v1/home/get-home-carousel-figure',//b2c获取轮播图
    get_home_columns_url:'home/get_home_columns.ajax',//b2c获取首页栏目
    get_home_newday_url:'home/get_home_newday.ajax',//b2c获取每日上新
    get_home_recommend_url:'home/get_home_recommend0.ajax',//b2c获取推荐
    get_home_activities_url:'home/get_home_activities.ajax',//b2c获取首页热门/精选活动
    get_home_hot_sale_url:'home/get_home_hot_sale.ajax',//b2c获取热卖
    get_home_newgoods_url:'home/get_home_newgoods.ajax',//b2c获取新品
    get_home_hot_brand_url:'home/get_home_hot_brand.ajax',//b2c获取热门品牌
    get_home_floor_all_url:'home/get_home_floor_all.ajax',//b2c获取热门品牌
    get_activities_timelimit_url:'activities/get_activities_timelimit.ajax',//b2c获取限时购活动
    get_activities_common_url:'activities/get_activities_common.ajax',//b2c获常规活动
    mine_outLogin_url:'logout.ajax',//退出按钮
    address_list_url:'select_address_list.ajax',//地址列表接口
    set_defult_url:'save_defult_address.ajax',//设置默认地址接口
    set_delete_address_url:'delete_address.ajax',//删除地址接口
    find_defult_address_url: 'find_defult_address.ajax', //根据id查询地址
    set_country_address_url:'find_defult_address.ajax.ajax',//请求省市区接口
    addTo_shopCart_goods:'insert_shopCar.ajax',//加入购物车接口
    shopCart_list_url:'shopping_cart.ajax',//购物车列表接口
    shopCart_amount_url:'upShoppingCartAmount.ajax',//购物车增加减少商品数量接口
    shopCart_delete_url:'shoppingCartToDelete.ajax',//购物车删除接口
    shopCart_toBalance_url:'shoppingCartToBalance.ajax',//购物车去结算接口
    mine_update_password_url:'update_password.ajax',//修改密码接口
    login_check_phone_url:'check_phone.ajax',//判断手机号是否注册
    select_captcha_url: 'select_captcha.ajax', //获取验证码
    login_url:'insert_user.ajax',//注册接口
    // toLogin_url:'toLogin.ajax',//登录接口
    toLogin_url:'login.ajax',//lafite登录
    heartbeat_url:'heartbeat.ajax',//心跳接口
    select_goods_introduction_url:'select_goods_introduction.ajax',//商品详情》商品详细加载
    select_goods_score_list_url: 'select_goods_score_list.ajax', //商品详情》商品评论区
    forget_password_url: "forget_password.ajax",
    url_cllect : "check_unfavorite_shop.ajax",//判断店铺是否收藏
    check_collect_url:"check_unfavorite_goods.ajax",//判断商品是否收藏
    flowCountStatisticsUrl:"img.htwins.com.cn/tj",
    /** 曹越 end    --------------------------------------------------------------------------------------------------*/
    gethotSearch:"search/get_hot_search.ajax",
    select_second_store_cat_list:'select_store_category_list.ajax',//获取店铺二级分类列表
    getGoodDetail:"goods/get_goods_details.ajax",
    addEvaluate:"evaluate/evaluate_added.ajax"
  };
  //循环地址把服务器地址加上去
  for (var key in this.urls) {
    this.urls[key] = server_url + this.urls[key];
  }
}]);

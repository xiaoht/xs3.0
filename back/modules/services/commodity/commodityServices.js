/**
 * 服务-商品页
 */
/*获取商品详细*/
makerApp.factory('getCommodityDetail', ['$http','UrlService', function ($http,UrlService) {
    return {
      /** 商品详情 */
      getGoodList: function (param) {
        return $http.post(UrlService.urls.select_goods_detail_url,param)
            .then(function (object) {
              var data = object.data;
              return data;
            })
      },

      /** 优惠组合活动 */
      getActiveGoodsDetail: function (param) {
        return $http.post(UrlService.urls.findCombinationValuesByItemId_url,param)
            .then(function (object) {
              var data = object.data;
              return data;
            })
      },

      /** 获取商品属性 */
      getGoodAttr:function(param){
        return $http.post(UrlService.urls.select_goods_attr_values_url,param)
          .then(function (object) {
            var data = object.data;
            return data;
          })
      },
      /**  添加足迹 */
      addFootPrin:function(param){
        return $http.post(UrlService.urls.add_myFootprint_url,param)
          .then(function (object) {
            var data = object.data;
            return data;
          })
      },
      /**  获取购物车数量 */
      askQuerySc:function(param){
        return $http.post(UrlService.urls.querySc_url,param)
          .then(function (object) {
            var data = object.data;
            return data;
          })
      },
      /** 获取收藏状态 */
      checkCollect:function(param){
        return $http.post(UrlService.urls.check_collect_url,param)
          .then(function (object) {
            var data = object.data;
            return data;
          })
      },

      /** 流量统计 */
      flowCount:function(sid,sn,gid,gn,uid){
        console.log(sid,sn,gid,gn,uid);
        return $http.get("img.htwins.com.cn/tj" + "?sid=" + sid + "&sn=" + sn + "&gid=" + gid +"&gn=" + gn + "&uid=" + uid)
            .then(function (object) {
              var data = object.data;
              return data;
            })
      }
    }

}]);


/* 收藏商品 */
makerApp.factory('saveCommodity', ['$http','UrlService', function ($http,UrlService) {
  return {
    favorateGoodls: function (param) {
      return $http.post(UrlService.urls.add_unfavorite_goods_url,param).then(function (object) {
        var data = object.data;
        return data;
      })
    },
    unFavorateGoodls: function (param) {
      return $http.post(UrlService.urls.delete_unfavorite_goods_url,param).then(function (object) {
        var data = object.data;
        return data;
      })
    },
    favorateShop: function (param) {
      return $http.post(UrlService.urls.add_mall_getCollectionShop_url,param).then(function (object) {
        var data = object.data;
        return data;
      })
    },
    unFavorateShop: function (param) {
      return $http.post(UrlService.urls.delete_unfavorite_shop_url,param).then(function (object) {
        var data = object.data;
        return data;
      })
    },
  }
}]);

/*获取商品详情介绍*/
makerApp.factory('getCommodityDetailIntro', ['$http','UrlService', function ($http,UrlService) {
    return {
        getGoolsDetail: function (param) {
            return $http.post(UrlService.urls.select_goods_introduction_url,param).then(function (object) {
                var data = object.data;
                return data;
            })
        },
        //获取商品评论
        getGoolsComm:function(param) {
          return $http.post(UrlService.urls.select_goods_score_list_url,param).then(function (object) {
            var data = object.data;
            return data;
          })
        }
    }
}]);
  //url = 'data/saveShopCart.json';//假数据
/** 加入购物车 */
makerApp.factory('saveShopCartService', ['$http','UrlService', function ($http,UrlService) {
  return {
    saveShopCartFun: function (addDate) {
      return $http.post(UrlService.urls.addTo_shopCart_goods,addDate).then(function (object) {
        var data = object.data;
        return data;
      })
    },
    /** 立即购买 */
    nowBuy: function (addDate) {
      return $http.post(UrlService.urls.toOrderConfirmByImmediately_url,addDate).then(function (object) {
        var data = object.data;
        return data;
      })
    },
    /** 组合商品加入购物车 */
    zuheGoolsInsertShopCar: function (param) {
      return $http.post(UrlService.urls.addCombinationShopcart_url,param).then(function (object) {
        var data = object.data;
        return data;
      })
    }

  }
}]);



makerApp.controller('seckillController', ['$scope', '$http', '$state', 'seckillServices', '$ionicViewSwitcher', '$ionicHistory', '$interval',
    '$timeout', '$stateParams', '$interval',
    function ($scope, $http, $state, seckillServices, $ionicViewSwitcher, $ionicHistory, $interval, $timeout, $stateParams, $interval) {

        /** 定义变量 */
        $scope.goodsList = [];
        //$scope.goods = {
        //    goodId:'',
        //    marketPrice: '',
        //    salesPrice: '',
        //    imgUrl: '',
        //    goodName: '',
        //    picUrl: '',
        //    endTime: ''
        //};
        $scope.seckillTitel = $stateParams.title;
        /** 定义参数 */
        $scope.param = {
            activityType: parseInt($stateParams.id),
            timeQuantum: ''
        };
        var startTimes = [];
        
        /** 加载数据 */
        seckillServices.getActivityInof($scope.param).then(function (json) {
            console.log('活动数据' + JSON.stringify(json));
            if (!json.success) {
                return;
            }
            /** 判断是什么活动*/
            if ($stateParams.id == 1) { //折扣
                //$scope.goodsList = json.result.zhekou;
                for (var i = 0; i < json.result.zhekou.length; i++) {
                	json.result.zhekou[i].salesPrice = formatPrice(json.result.zhekou[i].salesPrice);
                	json.result.zhekou[i].marketPrice = formatPrice(json.result.zhekou[i].marketPrice);
                    $scope.goodsList.push(json.result.zhekou[i])
                }
            } else if ($stateParams.id == 2) {//满减
                //$scope.goodsList = json.result.manjian;
                for (var i = 0; i < json.result.manjian.length; i++) {
                	json.result.manjian[i].salesPrice = formatPrice(json.result.manjian[i].salesPrice);
                	json.result.manjian[i].marketPrice = formatPrice(json.result.manjian[i].marketPrice);
                    $scope.goodsList.push(json.result.manjian[i])
                }
            } else if ($stateParams.id == 3) {//组合
                //$scope.goodsList = json.result.zuhe;
                for (var i = 0; i < json.result.zuhe.length; i++) {
                	json.result.zuhe[i].salesPrice = formatPrice(json.result.zuhe[i].salesPrice);
                	json.result.zuhe[i].marketPrice = formatPrice(json.result.zuhe[i].marketPrice);
                    $scope.goodsList.push(json.result.zuhe[i])
                }
            } else if ($stateParams.id == 4) {//秒杀
                for (var i = 0; i < json.result.miaosha.length; i++) {
                    json.result.miaosha[i].salesPrice = json.result.miaosha[i].field0;
                	json.result.miaosha[i].salesPrice = formatPrice(json.result.miaosha[i].salesPrice);
                	json.result.miaosha[i].marketPrice = formatPrice(json.result.miaosha[i].marketPrice);
                    
                	var interval = 1000; 
                	
                	startTimes[i] = json.result.miaosha[i].field2;
                	window.setInterval(function(){countDown(startTimes);}, interval); 
                	$scope.goodsList.push(json.result.miaosha[i]);
                	$scope.goodsList[i].countText =  getDiffText(startTimes[i]);
                }
            } else if ($stateParams.id == 5) {//包邮
                //$scope.goodsList = json.result.baoyou;
                for (var i = 0; i < json.result.baoyou.length; i++) {
                	json.result.baoyou[i].salesPrice = formatPrice(json.result.baoyou[i].salesPrice);
                	json.result.baoyou[i].marketPrice = formatPrice(json.result.baoyou[i].marketPrice);
                    $scope.goodsList.push(json.result.baoyou[i])
                }
            }
        });
        
        function countDown(startTimes){
        	for(var i = 0,len = startTimes.length;i<len;i++){
        		$scope.goodsList[i].countText =  getDiffText(startTimes[i]);
        		$scope.$apply();
        	}
          } 
        
        function getDiffText(time){
        	var EndTime= new Date(time);
            var NowTime = new Date();
            var t =EndTime.getTime() - NowTime.getTime();
            var d=0;
            var h=0;
            var m=0;
            var s=0;
            if(t>=0){
              d=Math.floor(t/1000/60/60/24);
              h=Math.floor(t/1000/60/60%24);
              m=Math.floor(t/1000/60%60);
              s=Math.floor(t/1000%60);
              return d + " 天 "+ h + " 时 "+m + " 分 "+ s + " 秒 ";
            } else {
            	return '';
            }
        }
        
        function formatPrice(value){
        	return value.replace(/,/g,'');
        }

        /** 选择时间段请求活动商品 */
        $scope.selectOnClick = function (timeNum) {
            console.log(timeNum);
            $scope.param.timeQuantum = timeNum;
            seckillServices.getActivityInof($scope.param).then(function (json) {
                console.log(json);
                if (!json.success) {
                    return;
                }
                /** 如果请求成功了 */
                for (var i = 0; i < $scope.timeList.length; i++) {
                    $scope.timeList[i].onClick = false;
                }
                $scope.timeList[timeNum - 1].onClick = true;
                $scope.seckillModel = json.result;
                if (timeNum == 1) {
                    $scope.goodsList = json.result.spSalesPromotionRuleTypeForm.promotionGoodList1;
                }
                if (timeNum == 2) {
                    $scope.goodsList = json.result.spSalesPromotionRuleTypeForm.promotionGoodList2;
                }
                if (timeNum == 3) {
                    $scope.goodsList = json.result.spSalesPromotionRuleTypeForm.promotionGoodList3;
                }
                if (timeNum == 4) {
                    $scope.goodsList = json.result.spSalesPromotionRuleTypeForm.promotionGoodList4;
                }
                if (timeNum == 5) {
                    $scope.goodsList = json.result.spSalesPromotionRuleTypeForm.promotionGoodList5;
                }
                if (timeNum == 6) {
                    $scope.goodsList = json.result.spSalesPromotionRuleTypeForm.promotionGoodList6;
                }
            });
        };

        /** 跳转到商品详情-立即购买被点击 */
        $scope.OnDetail = function (index) {
            console.log($scope.goodsList[index]);
            $state.go('commodityDetail', {commodityId: $scope.goodsList[index].goodId});
        };

        /**返回上一页*/
        $scope.goBack = function () {
            if (!$ionicHistory.backView()) {
                $state.go('home');
            } else {
                $ionicHistory.goBack();
            }
        };

        /** 计时器 */
        $scope.getTimeIng = function (startTime, flag) {
            console.log(startTime);
            if (flag) {
                $interval.cancel($scope.getTime);
            }
            console.log($scope.systemTime);
            var startLogTimeDate = new Date(Date.parse(startTime.replace(/-/g, "/")));
            var systemLogTimeDate = new Date(Date.parse($scope.systemTime.replace(/-/g, "/")));
            var daysHaomiaos = startLogTimeDate.getTime() - systemLogTimeDate.getTime(); //一共有这么多毫秒
            console.log(daysHaomiaos);
            if (daysHaomiaos < 0) {
                $scope.days = 0;
                $scope.hour = 0;
                $scope.mine = 0;
                $scope.miao = 0;
                $interval.cancel($scope.getTime);
                return;
            }
            $scope.getTime = $interval(function () {
                daysHaomiaos = daysHaomiaos - 1000;
                var days = Math.floor(daysHaomiaos / 86400000);
                var hourHaomiaos = daysHaomiaos - days * 86400000;
                var hours = Math.floor(hourHaomiaos / 3600000);
                var mineHaomiaos = hourHaomiaos - hours * 3600000;
                var mines = Math.floor(mineHaomiaos / 60000);
                var miaoHaomiaos = mineHaomiaos - mines * 60000;
                var miaos = Math.floor(miaoHaomiaos / 1000);
                $scope.days = days;
                $scope.hour = hours;
                $scope.mine = mines;
                $scope.miao = miaos;
            }, 1000)
        }
    }]);

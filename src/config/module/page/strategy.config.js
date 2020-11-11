import logisticsArea from 'allpages/strategyPlatform/logisticsStrategy/logisticsArea'; // 策略平台-物流区域设置-新增/详情
import setWarehouseLogistics from 'allpages/strategyPlatform/setWarehouseLogistics/setWarehouseLogistics'; // 策略平台-仓库物流优先级方案(新增/详情)
import courierPay from 'allpages/strategyPlatform/courierPay/courierPay'; // 策略平台-快递赔付方案(新增/详情)
import orderAutoCheck from 'allpages/strategyPlatform/orderAutoCheck.vue'; // 订单自动审核
import sendSingleRule from 'allpages/strategyPlatform/sendSingleRule.vue'; // 发货单派单规则

export default {
  // 策略平台-物流区域设置
  LOGISTICSAREA: {
    component: logisticsArea,
    labelName: '物流区域设置新增'
  },
  // 策略平台-仓库物流优先级方案(新增/详情)
  SETWAREHOUSELOGISTICS: {
    component: setWarehouseLogistics,
    labelName: '仓库物流优先级方案新增'
  },
  // 策略平台-快递赔付方案(新增/详情)
  COURIERPAY: {
    component: courierPay,
  },
  ORDERAUTOCHECK: {
    component: orderAutoCheck,
    labelName: '订单自动审核编辑'
  },
  SENDSINGLERULE: {
    component: sendSingleRule,
    labelName: '发货单派单规则'
  }
};

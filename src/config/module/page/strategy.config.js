import logisticsArea from "allpages/StrategyPlatform/logisticsStrategy/logisticsArea"; //策略平台-物流区域设置-新增/详情
import setWarehouseLogistics from "allpages/StrategyPlatform/setWarehouseLogistics/setWarehouseLogistics"; //策略平台-仓库物流优先级方案(新增/详情)
import courierPay from "allpages/StrategyPlatform/courierPay/courierPay"; //策略平台-快递赔付方案(新增/详情)

export default {
  // 策略平台-物流区域设置
  LOGISTICSAREA: {
    component: logisticsArea,
  },
  // 策略平台-仓库物流优先级方案(新增/详情)
  SETWAREHOUSELOGISTICS: {
    component: setWarehouseLogistics,
  },
  // 策略平台-快递赔付方案(新增/详情)
  COURIERPAY: {
    component: courierPay,
  },
};

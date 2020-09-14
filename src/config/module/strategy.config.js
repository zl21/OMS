import logisticsArea from "branchComponent/page/StrategyPlatform/logisticsStrategy/logisticsArea"; //策略平台-物流区域设置-新增/详情
import setWarehouseLogistics from "branchComponent/page/StrategyPlatform/setWarehouseLogistics/setWarehouseLogistics"; //策略平台-仓库物流优先级方案(新增/详情)
import courierPay from "branchComponent/page/StrategyPlatform/courierPay/courierPay"; //策略平台-快递赔付方案(新增/详情)

export default {
  // 策略平台-物流区域设置
  LOGISTICAREA: {
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

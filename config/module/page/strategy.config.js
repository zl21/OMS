import logisticsArea from 'allpages/strategyPlatform/logisticsStrategy/logisticsArea'; // 策略平台-物流区域设置-新增/详情
import setWarehouseLogistics from 'allpages/strategyPlatform/setWarehouseLogistics/setWarehouseLogistics'; // 策略平台-仓库物流优先级方案(新增/详情)
import courierPay from 'allpages/strategyPlatform/courierPay/courierPay'; // 策略平台-快递赔付方案(新增/详情)
import orderAutoCheck from 'allpages/strategyPlatform/orderAutoCheck'; // 订单自动审核
import sendSingleRule from 'allpages/strategyPlatform/sendSingleRule'; // 发货单派单规则
import wphEmailSend from 'allpages/strategyPlatform/wphEmailSend'; // 唯品会预警通知-新增/详情-内容设置
import smsStrategy from 'allpages/strategyPlatform/smsStrategy'; // 短信策略-新增/详情-内容设置
import scheduleAddOrEdit from 'allpages/strategyPlatform/scheduleAddOrEdit'; // 档期日程规划
import warehouseLogisticsAddOrEdit from 'allpages/strategyPlatform/warehouseLogisticsAddOrEdit'; // 仓库物流规则
import commodityPriceAddOrEdit from 'allpages/strategyPlatform/commodityPriceAddOrEdit'; // 商品价格策略
import liveParsingAddOrEdit from 'allpages/strategyPlatform/liveParsingAddOrEdit'; // 直播解析策略

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
    labelName: '快递赔付方案编辑',
  },
  ORDERAUTOCHECK: {
    component: orderAutoCheck,
    labelName: '订单自动审核编辑'
  },
  SENDSINGLERULE: {
    component: sendSingleRule,
    labelName: '发货单派单规则'
  },
  WPHEMAILSEND: {
    component: wphEmailSend,
    labelName: '唯品会预警通知'
  },
  SMSSTRATEGY: {
    component: smsStrategy,
  },
  ST_C_VIPCOM_PROJECT: {
    component: scheduleAddOrEdit,
    labelName: '档期日程规划编辑'
  },
  ST_C_WAREHOUSE_LOGISTICS_SET: {
    component: warehouseLogisticsAddOrEdit,
    labelName: '仓库物流规则编辑'
  },
  ST_C_PRICE: {
    component: commodityPriceAddOrEdit,
    labelName: '商品价格编辑'
  },
  ST_C_LIVE_CAST_STRATEGY: {
    component: liveParsingAddOrEdit,
    labelName: '直播解析编辑'
  }
};

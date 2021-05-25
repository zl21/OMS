/*
 * @Author: your name
 * @Date: 2021-05-08 10:41:48
 * @LastEditTime: 2021-05-25 11:54:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /burgeon-project-logic/config/module/page/strategy.config.js
 */
export default {
  // 策略平台-物流区域设置
  LOGISTICSAREA: {
    component: () => import('allpages/strategyPlatform/logisticsStrategy/logisticsArea'),
    labelName: '物流区域设置新增'
  },
  // 策略平台-仓库物流优先级方案(新增/详情)
  SETWAREHOUSELOGISTICS: {
    component: () => import('allpages/strategyPlatform/setWarehouseLogistics/setWarehouseLogistics'),
    labelName: '仓库物流优先级方案新增'
  },
  // 策略平台-快递赔付方案(新增/详情)
  COURIERPAY: {
    component: () => import('allpages/strategyPlatform/courierPay/courierPay'),
    labelName: '快递赔付方案编辑',
  },
  ORDERAUTOCHECK: {
    component: () => import('allpages/strategyPlatform/orderAutoCheck'),
    labelName: '订单自动审核编辑'
  },
  SENDSINGLERULE: {
    component: () => import('allpages/strategyPlatform/sendSingleRule'),
    labelName: '发货单派单规则'
  },
  WPHEMAILSEND: {
    component: () => import('allpages/strategyPlatform/wphEmailSend'),
    labelName: '唯品会预警通知'
  },
  SMSSTRATEGY: {
    component: () => import('allpages/strategyPlatform/smsStrategy'),
  },
  ST_C_VIPCOM_PROJECT: {
    component: () => import('allpages/strategyPlatform/scheduleAddOrEdit'),
    labelName: '档期日程规划编辑'
  },
  ST_C_WAREHOUSE_LOGISTICS_SET: {
    component: () => import('allpages/strategyPlatform/warehouseLogisticsAddOrEdit'),
    labelName: '仓库物流规则编辑'
  },
  ST_C_PRICE: {
    component: () => import('allpages/strategyPlatform/commodityPriceAddOrEdit'),
    labelName: '商品价格编辑'
  },
  ST_C_LIVE_CAST_STRATEGY: {
    component: () => import('allpages/strategyPlatform/liveParsingAddOrEdit'),
    labelName: '直播解析编辑'
  },
  ST_C_ORDER_WAREHOUSE: {
    component: () => import('allpages/strategyPlatform/storehouseRule'),
    labelName: '分仓规则',
    isList: true
  },
  ST_C_ASSIGN_LOGISTICS: {
    component: () => import('allpages/strategyPlatform/storehouseRule'),
    labelName: '物流规则',
    isList: true
  },
  ST_C_SPECIAL_ASSIGN_LOGISTICS: {
    component: () => import('allpages/strategyPlatform/specialLogistics'),
    labelName: '特殊物流方案',
    isList: true
  },
  ST_C_DELIVERY_AREA: {
    component: () => import('allpages/strategyPlatform/logisticsDistribute'),
    labelName: '物流派送范围',
    isList: true
  },
  ST_C_HOLD_ORDER_STRATEGY: {
    component: () => import('allpages/strategyPlatform/holdStrategyAddOrEdit'),
    labelName: 'HOLD单策略',
    isList: true
  },
};

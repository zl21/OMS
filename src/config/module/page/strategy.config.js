/*
 * @Author: your name
 * @Date: 2021-05-08 10:41:48
 * @LastEditTime: 2021-07-14 19:24:18
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \burgeon-project-logic\config\module\page\strategy.config.js
 */
export default {
  SG_B_SHOP_DETAIL: {
    component: () => import(
      /* webpackChunkName: 'StrategyCenterPage' */
      'allpages/strategyPlatform/shopCom.vue'
    ),
  },
  // 店铺条码锁库策略
  SG_B_SHOP_LOCK_DETAIL: {
    component: () => import(
      /* webpackChunkName: 'StrategyCenterPage' */
      'allpages/strategyPlatform/goodsInfoDetails.vue'
    ),
  },
  // 策略平台-物流区域设置
  LOGISTICSAREA: {
    component: () => import(
      /* webpackChunkName: 'StrategyCenterPage' */
      'allpages/strategyPlatform/logisticsStrategy/logisticsArea.vue'
    ),
    labelName: $it('menu.ae') // 物流区域设置新增
  },
  // 策略平台-仓库物流优先级方案(新增/详情)
  SETWAREHOUSELOGISTICS: {
    component: () => import(
      /* webpackChunkName: 'StrategyCenterPage' */
      'allpages/strategyPlatform/setWarehouseLogistics/setWarehouseLogistics.vue'
    ),
    labelName: $it('menu.af') // 仓库物流优先级方案新增
  },
  // 策略平台-快递赔付方案(新增/详情)
  COURIERPAY: {
    component: () => import(
      /* webpackChunkName: 'StrategyCenterPage' */
      'allpages/strategyPlatform/courierPay/courierPay.vue'
    ),
    labelName: $it('menu.ag') // 快递赔付方案编辑
  },
  ORDERAUTOCHECK: {
    component: () => import(
      /* webpackChunkName: 'StrategyCenterPage' */
      'allpages/strategyPlatform/orderAutoCheck.vue'
    ),
    labelName: $it('menu.ai') // 订单自动审核编辑
  },
  SENDSINGLERULE: {
    component: () => import(
      /* webpackChunkName: 'StrategyCenterPage' */
      'allpages/strategyPlatform/sendSingleRule.vue'
    ),
    labelName: $it('menu.aj') // 发货单派单规则
  },
  WPHEMAILSEND: {
    component: () => import(
      /* webpackChunkName: 'StrategyCenterPage' */
      'allpages/strategyPlatform/wphEmailSend.vue'
    ),
    labelName: $it('menu.ak') // 唯品会预警通知
  },
  SMSSTRATEGY: {
    component: () => import(
      /* webpackChunkName: 'StrategyCenterPage' */
      'allpages/strategyPlatform/smsStrategy.vue'
    ),
  },
  ST_C_VIPCOM_PROJECT: {
    component: () => import(
      /* webpackChunkName: 'StrategyCenterPage' */
      'allpages/strategyPlatform/scheduleAddOrEdit.vue'
    ),
    labelName: $it('menu.al') // 档期日程规划
  },
  SCHEDULEADDOREDIT: {
    component: () => import(
      /* webpackChunkName: 'StrategyCenterPage' */
      'allpages/strategyPlatform/scheduleAddOrEdit.vue'
    ),
    labelName: $it('menu.al') // 档期日程规划
  },
  ST_C_WAREHOUSE_LOGISTICS_SET: {
    component: () => import(
      /* webpackChunkName: 'StrategyCenterPage' */
      'allpages/strategyPlatform/warehouseLogisticsAddOrEdit.vue'
    ),
    labelName: $it('menu.am') // 仓库物流设置
  },
  ST_C_PRICE: {
    component: () => import(
      /* webpackChunkName: 'StrategyCenterPage' */
      'allpages/strategyPlatform/commodityPriceAddOrEdit.vue'
    ),
    labelName: $it('menu.an') // 商品价格策略
  },
  ST_C_LIVE_CAST_STRATEGY: {
    component: () => import(
      /* webpackChunkName: 'StrategyCenterPage' */
      'allpages/strategyPlatform/liveParsingAddOrEdit.vue'
    ),
    labelName: $it('menu.ao') // 直播解析策略
  },
  ST_C_ORDER_WAREHOUSE: {
    component: () => import(
      /* webpackChunkName: 'StrategyCenterPage' */
      'allpages/strategyPlatform/storehouseRule.vue'
    ),
    isList: true,
    labelName: $it('menu.ap'), // 分仓规则
  },
  ST_C_ASSIGN_LOGISTICS: {
    component: () => import(
      /* webpackChunkName: 'StrategyCenterPage' */
      'allpages/strategyPlatform/storehouseRule.vue'
    ),
    isList: true,
    labelName: $it('menu.aq'), // 分物流规则
  },
  ST_C_SPECIAL_ASSIGN_LOGISTICS: {
    component: () => import(
      /* webpackChunkName: 'StrategyCenterPage' */
      'allpages/strategyPlatform/specialLogistics.vue'
    ),
    isList: true,
    labelName: $it('menu.ar'), // 特殊物流方案
  },
  ST_C_DELIVERY_AREA: {
    component: () => import(
      /* webpackChunkName: 'StrategyCenterPage' */
      'allpages/strategyPlatform/logisticsDistribute.vue'
    ),
    isList: true,
    labelName: $it('menu.as'), // 物流派送范围
  },
  ST_C_HOLD_ORDER_STRATEGY: {
    component: () => import(
      /* webpackChunkName: 'StrategyCenterPage' */
      'allpages/strategyPlatform/holdStrategyAddOrEdit.vue'
    ),
    isList: true,
    labelName: $it('menu.at') // HOLD单策略
  },
  ST_C_TMALL_EXCHANGE_ORDER: {
    component: () => import(
      /* webpackChunkName: 'StrategyCenterPage' */
      'allpages/strategyPlatform/tmExchangeAddOrEdit.vue'
    ),
    labelName: $it('menu.au') // 天猫换货策略
  },
  ST_C_AUTO_AUDIT: {
    component: () => import(
      /* webpackChunkName: 'StrategyCenterPage' */
      'allpages/strategyPlatform/auditOrderStrategy.vue'
    ),
    labelName: $it('menu.av') // 审单策略
  }

};

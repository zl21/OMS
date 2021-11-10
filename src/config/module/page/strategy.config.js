/*
 * @Author: your name
 * @Date: 2021-05-08 10:41:48
 * @LastEditTime: 2021-07-14 19:24:18
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \burgeon-project-logic\config\module\page\strategy.config.js
 */
import i18n from '@burgeon/internationalization/i18n'; // 国际化
export default {
  SG_B_SHOP_DETAIL: {
    component: () => import(
      /* webpackchunkname: 'StrategyCenterPage' */
      'allpages/strategyPlatform/shopCom.vue'
    ),
  },
  // 店铺条码锁库策略
  SG_B_SHOP_LOCK_DETAIL: {
    component: () => import(
      /* webpackchunkname: 'StrategyCenterPage' */
      'allpages/strategyPlatform/goodsInfoDetails.vue'
    ),
  },
  // 策略平台-物流区域设置
  LOGISTICSAREA: {
    component: () => import(
      /* webpackchunkname: 'StrategyCenterPage' */
      'allpages/strategyPlatform/logisticsStrategy/logisticsArea.vue'
    ),
    labelName: i18n.t('menu.ae') // 物流区域设置新增
  },
  // 策略平台-仓库物流优先级方案(新增/详情)
  SETWAREHOUSELOGISTICS: {
    component: () => import(
      /* webpackchunkname: 'StrategyCenterPage' */
      'allpages/strategyPlatform/setWarehouseLogistics/setWarehouseLogistics.vue'
    ),
    labelName: i18n.t('menu.af') // 仓库物流优先级方案新增
  },
  // 策略平台-快递赔付方案(新增/详情)
  COURIERPAY: {
    component: () => import(
      /* webpackchunkname: 'StrategyCenterPage' */
      'allpages/strategyPlatform/courierPay/courierPay.vue'
    ),
    labelName: i18n.t('menu.ag') // 快递赔付方案编辑
  },
  ORDERAUTOCHECK: {
    component: () => import(
      /* webpackchunkname: 'StrategyCenterPage' */
      'allpages/strategyPlatform/orderAutoCheck.vue'
    ),
    labelName: i18n.t('menu.ai') // 订单自动审核编辑
  },
  SENDSINGLERULE: {
    component: () => import(
      /* webpackchunkname: 'StrategyCenterPage' */
      'allpages/strategyPlatform/sendSingleRule.vue'
    ),
    labelName: i18n.t('menu.aj') // 发货单派单规则
  },
  WPHEMAILSEND: {
    component: () => import(
      /* webpackchunkname: 'StrategyCenterPage' */
      'allpages/strategyPlatform/wphEmailSend.vue'
    ),
    labelName: i18n.t('menu.ak') // 唯品会预警通知
  },
  SMSSTRATEGY: {
    component: () => import(
      /* webpackchunkname: 'StrategyCenterPage' */
      'allpages/strategyPlatform/smsStrategy.vue'
    ),
  },
  ST_C_VIPCOM_PROJECT: {
    component: () => import(
      /* webpackchunkname: 'StrategyCenterPage' */
      'allpages/strategyPlatform/scheduleAddOrEdit.vue'
    ),
    labelName: i18n.t('menu.al') // 档期日程规划
  },
  ST_C_WAREHOUSE_LOGISTICS_SET: {
    component: () => import(
      /* webpackchunkname: 'StrategyCenterPage' */
      'allpages/strategyPlatform/warehouseLogisticsAddOrEdit.vue'
    ),
    labelName: i18n.t('menu.am') // 仓库物流设置
  },
  ST_C_PRICE: {
    component: () => import(
      /* webpackchunkname: 'StrategyCenterPage' */
      'allpages/strategyPlatform/commodityPriceAddOrEdit.vue'
    ),
    labelName: i18n.t('menu.an') // 商品价格策略
  },
  ST_C_LIVE_CAST_STRATEGY: {
    component: () => import(
      /* webpackchunkname: 'StrategyCenterPage' */
      'allpages/strategyPlatform/liveParsingAddOrEdit.vue'
    ),
    labelName: i18n.t('menu.ao') // 直播解析策略
  },
  ST_C_ORDER_WAREHOUSE: {
    component: () => import(
      /* webpackchunkname: 'StrategyCenterPage' */
      'allpages/strategyPlatform/storehouseRule.vue'
    ),
    isList: true,
    labelName: i18n.t('menu.ap'), // 分仓规则
  },
  ST_C_ASSIGN_LOGISTICS: {
    component: () => import(
      /* webpackchunkname: 'StrategyCenterPage' */
      'allpages/strategyPlatform/storehouseRule.vue'
    ),
    isList: true,
    labelName: i18n.t('menu.aq'), // 分物流规则
  },
  ST_C_SPECIAL_ASSIGN_LOGISTICS: {
    component: () => import(
      /* webpackchunkname: 'StrategyCenterPage' */
      'allpages/strategyPlatform/specialLogistics.vue'
    ),
    isList: true,
    labelName: i18n.t('menu.ar'), // 特殊物流方案
  },
  ST_C_DELIVERY_AREA: {
    component: () => import(
      /* webpackchunkname: 'StrategyCenterPage' */
      'allpages/strategyPlatform/logisticsDistribute.vue'
    ),
    isList: true,
    labelName: i18n.t('menu.as'), // 物流派送范围
  },
  ST_C_HOLD_ORDER_STRATEGY: {
    component: () => import(
      /* webpackchunkname: 'StrategyCenterPage' */
      'allpages/strategyPlatform/holdStrategyAddOrEdit.vue'
    ),
    isList: true,
    labelName: i18n.t('menu.at') // HOLD单策略
  },
  ST_C_TMALL_EXCHANGE_ORDER: {
    component: () => import(
      /* webpackchunkname: 'StrategyCenterPage' */
      'allpages/strategyPlatform/tmExchangeAddOrEdit.vue'
    ),
    labelName: i18n.t('menu.au') // 天猫换货策略
  },
  ST_C_AUTO_AUDIT: {
    component: () => import(
      /* webpackchunkname: 'StrategyCenterPage' */
      'allpages/strategyPlatform/auditOrderStrategy.vue'
    ),
    labelName: i18n.t('menu.av') // 审单策略
  }

};

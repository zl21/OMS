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
    component: () => import('allpages/strategyPlatform/shopCom.vue'),
  },
  // 策略平台-物流区域设置
  LOGISTICSAREA: {
    component: () => import('allpages/strategyPlatform/logisticsStrategy/logisticsArea'),
    // labelName: '物流区域设置新增',
    labelName: i18n.t('menu.ae')
  },
  // 策略平台-仓库物流优先级方案(新增/详情)
  SETWAREHOUSELOGISTICS: {
    component: () => import('allpages/strategyPlatform/setWarehouseLogistics/setWarehouseLogistics'),
    // labelName: '仓库物流优先级方案新增',
    labelName: i18n.t('menu.af')
  },
  // 策略平台-快递赔付方案(新增/详情)
  COURIERPAY: {
    component: () => import('allpages/strategyPlatform/courierPay/courierPay'),
    // labelName: '快递赔付方案编辑',
    labelName: i18n.t('menu.ag')
  },
  ORDERAUTOCHECK: {
    component: () => import('allpages/strategyPlatform/orderAutoCheck'),
    // labelName: '订单自动审核编辑',
    labelName: i18n.t('menu.ai')
  },
  SENDSINGLERULE: {
    component: () => import('allpages/strategyPlatform/sendSingleRule'),
    // labelName: '发货单派单规则',
    labelName: i18n.t('menu.aj')
  },
  WPHEMAILSEND: {
    component: () => import('allpages/strategyPlatform/wphEmailSend'),
    // labelName: '唯品会预警通知',
    labelName: i18n.t('menu.ak')
  },
  SMSSTRATEGY: {
    component: () => import('allpages/strategyPlatform/smsStrategy'),
  },
  ST_C_VIPCOM_PROJECT: {
    component: () => import('allpages/strategyPlatform/scheduleAddOrEdit'),
    // labelName: '档期日程规划',
    labelName: i18n.t('menu.al')
  },
  ST_C_WAREHOUSE_LOGISTICS_SET: {
    component: () => import('allpages/strategyPlatform/warehouseLogisticsAddOrEdit'),
    // labelName: '仓库物流设置',
    labelName: i18n.t('menu.am')
  },
  ST_C_PRICE: {
    component: () => import('allpages/strategyPlatform/commodityPriceAddOrEdit'),
    // labelName: '商品价格策略',
    labelName: i18n.t('menu.an')
  },
  ST_C_LIVE_CAST_STRATEGY: {
    component: () => import('allpages/strategyPlatform/liveParsingAddOrEdit'),
    // labelName: '直播解析策略',
    labelName: i18n.t('menu.ao')
  },
  ST_C_ORDER_WAREHOUSE: {
    component: () => import('allpages/strategyPlatform/storehouseRule'),
    // labelName: '分仓规则',
    isList: true,
    labelName: i18n.t('menu.ap'),
  },
  ST_C_ASSIGN_LOGISTICS: {
    component: () => import('allpages/strategyPlatform/storehouseRule'),
    // labelName: '分物流规则',
    isList: true,
    labelName: i18n.t('menu.aq'),
  },
  ST_C_SPECIAL_ASSIGN_LOGISTICS: {
    component: () => import('allpages/strategyPlatform/specialLogistics'),
    // labelName: '特殊物流方案',
    isList: true,
    labelName: i18n.t('menu.ar'),
  },
  ST_C_DELIVERY_AREA: {
    component: () => import('allpages/strategyPlatform/logisticsDistribute'),
    // labelName: '物流派送范围',
    isList: true,
    labelName: i18n.t('menu.as'),
  },
  ST_C_HOLD_ORDER_STRATEGY: {
    component: () => import('allpages/strategyPlatform/holdStrategyAddOrEdit'),
    // labelName: 'HOLD单策略',
    isList: true,
    labelName: i18n.t('menu.at')
  },
  ST_C_TMALL_EXCHANGE_ORDER: {
    component: () => import('allpages/strategyPlatform/tmExchangeAddOrEdit'),
    // labelName: '天猫换货策略',
    labelName: i18n.t('menu.au')
  },
  ST_C_AUTO_AUDIT: {
    component: () => import('allpages/strategyPlatform/auditOrderStrategy'),
    // labelName: '审单策略',
    labelName: i18n.t('menu.av')
  }
  
};

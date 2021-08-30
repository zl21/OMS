/*
 * @Author: your name
 * @Date: 2021-05-17 14:48:57
 * @LastEditTime: 2021-06-24 10:42:21
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /burgeon-project-logic/config/config/customized.modal.config.js
 */
import MarketCenter from '../module/modal/market.config.js'; // ------------促销中心
import OrderCenter from '../module/modal/order.config.js'; // ------------订单中心
import FinanceCenter from '../module/modal/finance.config.js'; // -----------财务中心
import CommodityCenter from '../module/modal/commodity.config.js'; // -----------商品中心
import OrganizationCenter from '../module/modal/organization.config.js'; // -----------组织中心
import StrategyPlatform from '../module/modal/strategy.config.js'; // -----------策略平台
import SystemConfig from '../module/modal/system.config.js'; // -----------系统配置
import InventoryConfig from '../module/modal/inventory.config.js'; // -----------库存中心
import InterfaceConfig from '../module/modal/interface.config.js'; // ----------接口平台
import ReportCenter from '../module/modal/report.config.js'; // ----------报表中心
import basicDataConfig from '../module/modal/basicData.config'; // -----------基础数据

import importCom from 'professionalComponents/importTable';
import downLoad from 'professionalComponents/downLoad.vue'
const common = {
  DOWNLOADCOMMODITY: {
    component: downLoad,
    labelName: '下载商品',
  },
  DOWNLOADCOMMON: {
    component: downLoad,
    labelName: '下载PO单',
  },
  SKUADDOREDIT: {
    component: importCom,
  },
  SKUIMPORT: {
    component: importCom,
  },
  SPUIMPORT: {
    component: importCom,
  },
  REGIONIMPORT: {
    component: importCom,
  },
  SYNCSTOCKSTRATEGYIMPORT: {
    component: importCom,
  },
  IMPORTCOM: {
    component: importCom,
  },
  EXTRAIMPORT: {
    component: importCom,
  },
  IMPORTPAYRESULT: {
    component: importCom
  },
  LOGISTICSIMPORT: {
    component: importCom,
  },
  WAREHOUSEIMPORT: {
    component: importCom,
  },
  ZFBACCOUNTIMPORT: {
    component: importCom,
  },
  GOODDISTRIBUTIONIMPORT: {
    component: importCom,
  },
  SG_B_GOOD_DISTRIBUTION_ITEM_IMPORT: {
    component: importCom,
  },
  PURCHASEIMPORT: {
    component: importCom,
  },
}

const allCenterModal = Object.assign(
  common,
  OrderCenter,
  MarketCenter,
  FinanceCenter,
  CommodityCenter,
  OrganizationCenter,
  StrategyPlatform,
  SystemConfig,
  InventoryConfig,
  InterfaceConfig,
  ReportCenter,
  basicDataConfig,
);

export default allCenterModal;
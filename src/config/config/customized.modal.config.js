/*
 * @Author: your name
 * @Date: 2021-05-17 14:48:57
 * @LastEditTime: 2021-12-03 15:22:54
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

const { Components } = BC

const common = {
  // 淘宝订单接口
  DOWNLOADORDER: {
    component: Components.DownLoad,
  },
  // 通用订单接口 通用退单接口 (通用订单下载)
  DOWNLOADPUBLIC: {
    component: Components.DownLoad,
  },
  DOWNLOADORDER: {
    component: Components.DownLoad,
  },
  DOWNLOADCOMMODITY: {
    component: Components.DownLoad,
    labelName: '下载商品',
  },
  DOWNLOADCOMMON: {
    component: Components.DownLoad,
    labelName: '下载PO单',
  },
  SKUIMPORT: {
    component: Components.ImportTable,
  },
  SKUADDOREDIT: {
    component: Components.ImportTable,
  },
  SPUIMPORT: {
    component: Components.ImportTable,
  },
  REGIONIMPORT: {
    component: Components.ImportTable,
  },
  SYNCSTOCKSTRATEGYIMPORT: {
    component: Components.ImportTable,
  },
  IMPORTCOM: {
    component: Components.ImportTable,
  },
  EXTRAIMPORT: {
    component: Components.ImportTable,
  },
  IMPORTPAYRESULT: {
    component: Components.ImportTable,
  },
  LOGISTICSIMPORT: {
    component: Components.ImportTable,
  },
  WAREHOUSEIMPORT: {
    component: Components.ImportTable,
  },
  ZFBACCOUNTIMPORT: {
    component: Components.ImportTable,
  },
  GOODDISTRIBUTIONIMPORT: {
    component: Components.ImportTable,
  },
  SG_B_GOOD_DISTRIBUTION_ITEM_IMPORT: {
    component: Components.ImportTable,
  },
  PURCHASEIMPORT: {
    component: Components.ImportTable,
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
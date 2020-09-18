import MarketCenter from './module/modal/market.config.js'; // ------------促销中心
import OrdersCenter from './module/modal/order.config.js'; // ------------订单中心
import FinanceCenter from "./module/modal/finance.config.js"; //-----------财务中心
import CommodityCenter from "./module/modal/commodity.config.js"; //-----------商品中心
import OrganizationCenter from "./module/modal/organization.config.js"; //-----------组织中心
import StrategyPlatform from "./module/modal/strategy.config.js"; //-----------策略平台
import SystemConfig from './module/modal/system.config.js'; // -----------系统配置
import InventoryConfig from './module/modal/inventory.config.js'; // -----------库存中心

const allCenterModal = Object.assign(
  OrdersCenter,
  MarketCenter,
  FinanceCenter,
  CommodityCenter,
  OrganizationCenter,
  StrategyPlatform,
  SystemConfig,
  InventoryConfig
);
export default {
  ...allCenterModal,
};

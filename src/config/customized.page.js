import MarketCenter from './module/page/promotion.config.js'; // ------------促销中心
import OrdersCenter from './module/page/order.config.js'; // ------------订单中心
// import FinanceCenter from "branchConfig/module/finance.config.js"; //-----------财务中心
// import CommodityCenter from "branchConfig/module/commodity.config.js"; //-----------商品中心
// import OrganizationCenter from "branchConfig/module/organization.config.js"; //-----------组织中心
// import StrategyPlatform from "branchConfig/module/strategy.config.js"; //-----------策略平台
import SystemConfig from './module/page/system.config.js'; // -----------系统配置
import InventoryConfig from './module/page/inventory.config.js'; // -----------库存中心

const allCenter = Object.assign(
  OrdersCenter,
  MarketCenter,
  // FinanceCenter,
  // CommodityCenter,
  // OrganizationCenter,
  // StrategyPlatform,
  SystemConfig,
  InventoryConfig
);
export default {
  ...allCenter,
};

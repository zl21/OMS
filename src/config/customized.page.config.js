import halfOrderDetail from '@/views/pages/common/orderDetail/halfOrderDetail.vue';
import MarketCenter from './module/page/promotion.config.js'; // ------------促销中心
import OrdersCenter from './module/page/order.config.js'; // ------------订单中心
import FinanceCenter from "./module/page/finance.config.js"; //-----------财务中心
import CommodityCenter from "./module/page/commodity.config.js"; //-----------商品中心
import OrganizationCenter from "./module/page/organization.config.js"; //-----------组织中心
import StrategyPlatform from "./module/page/strategy.config.js"; //-----------策略平台
import SystemConfig from './module/page/system.config.js'; // -----------系统配置
import InventoryConfig from './module/page/inventory.config.js';// -----------库存中心

const all = Object.assign(OrdersCenter,
  MarketCenter,
  FinanceCenter,
  CommodityCenter,
  OrganizationCenter,
  StrategyPlatform,
  SystemConfig,
  InventoryConfig);
export default {
  // 列表配置双击跳转定制界面，需在文档里维护对应的labelName属性
  orderDetail2: {
    component: halfOrderDetail
  },
  ...all
};

import halfOrderDetail from '@/views/pages/common/orderDetail/halfOrderDetail.vue';
import MarketCenter from './module/page/promotion.config'; // ------------促销中心
import OrderCenter from './module/page/order.config'; // ------------订单中心
import FinanceCenter from './module/page/finance.config'; // -----------财务中心
import CommodityCenter from './module/page/commodity.config'; // -----------商品中心
// import OrganizationCenter from "./module/page/organization.config.js"; //-----------组织中心
import StrategyPlatform from './module/page/strategy.config'; // -----------策略平台
import SystemConfig from './module/page/system.config'; // -----------系统配置
import InventoryConfig from './module/page/inventory.config'; // -----------库存中心

const all = Object.assign(
  OrderCenter,
  MarketCenter,
  FinanceCenter,
  CommodityCenter,
  // OrganizationCenter,
  StrategyPlatform,
  SystemConfig,
  InventoryConfig
);
export default {
  // 列表配置双击跳转定制界面，需在文档里维护对应的labelName属性
  orderDetail2: {
    component: halfOrderDetail
  },
  ...all
};

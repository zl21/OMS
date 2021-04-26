// import halfOrderDetail from 'allpages/orderCenter/orderManageDetail/orderDetail/halfOrderDetail.vue'; // ORDERDETAIL2
import MarketCenter from '../module/page/promotion.config'; // ------------促销中心
import OrderCenter from '../module/page/order.config'; // ------------订单中心
import FinanceCenter from '../module/page/finance.config'; // -----------财务中心
import CommodityCenter from '../module/page/commodity.config'; // -----------商品中心
// import OrganizationCenter from "./module/page/organization.config.js"; //-----------组织中心
import StrategyPlatform from '../module/page/strategy.config'; // -----------策略平台
import SystemConfig from '../module/page/system.config'; // -----------系统配置
import InventoryConfig from '../module/page/inventory.config'; // -----------库存中心
import basicDataConfig from '../module/page/basicData.config'; // -----------基础数据

const allCenterPage = Object.assign(
  OrderCenter,
  MarketCenter,
  FinanceCenter,
  CommodityCenter,
  // OrganizationCenter,
  StrategyPlatform,
  SystemConfig,
  InventoryConfig, 
  basicDataConfig, 
  {
    ORDERDETAIL2: {
      component: () => import('allpages/orderCenter/orderManageDetail/orderDetail/halfOrderDetail.vue')
    }
  },
);

export default allCenterPage;
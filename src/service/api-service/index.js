// 导出所有的服务
import common from './modules/common';
import interfacePlatform from "./modules/interface-platform";
import orderCenter from "./modules/order-center";
import promotionCenter from "./modules/promotion-center";
import commodityCenter from "./modules/commodity-center";
import inventoryCenter from "./modules/inventory-center";
import strategyPlatform from "./modules/strategy-platform";
import organizationCenter from "./modules/organization-center";
import financeCenter from './modules/finance-center';
import clearanceCenter from './modules/clearance-center';
import memberCenter from './modules/member-center';
import reportCenter from './modules/report-center';
import systemConfig from './modules/system-config';
export default {
  common,              // 公共
  interfacePlatform,   // 接口平台
  orderCenter,         // 订单中心
  promotionCenter,     // 促销中心
  commodityCenter,     // 商品中心
  inventoryCenter,     // 库存中心
  strategyPlatform,    // 策略平台
  organizationCenter,  // 组织中心
  financeCenter,       // 财务中心
  clearanceCenter,     // 结算中心
  memberCenter,        // 会员中心
  reportCenter,        // 报表中心
  systemConfig,        // 系统配置
}

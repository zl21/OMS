// 导出所有的接口
import common from './modules/common';
import interfacePlatform from './modules/interfacePlatform';
import orderCenter from './modules/orderCenter';
import promotionCenter from './modules/promotionCenter';
import commodityCenter from './modules/commodityCenter';
import inventoryCenter from './modules/inventoryCenter';
import strategyPlatform from './modules/strategyPlatform';
import organizationCenter from './modules/organizationCenter';
import financeCenter from './modules/financeCenter';
import clearanceCenter from './modules/clearanceCenter';
import memberCenter from './modules/memberCenter';
import reportCenter from './modules/reportCenter';
import systemConfig from './modules/systemConfig';

export default {
  common, // 公共
  interfacePlatform, // 接口平台
  orderCenter, // 订单中心
  promotionCenter, // 促销中心
  commodityCenter, // 商品中心
  inventoryCenter, // 库存中心
  strategyPlatform, // 策略平台
  organizationCenter, // 组织中心
  financeCenter, // 财务中心
  clearanceCenter, // 结算中心
  memberCenter, // 会员中心
  reportCenter, // 报表中心
  systemConfig, // 系统配置
};

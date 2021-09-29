// 接口平台
export default {
  // 淘宝订单接口
  DOWNLOADORDER: {
    component: () => import('@/views/modal/InterfacePlatform/downLoadAll.vue')
  },
  // 通用订单接口 通用退单接口 (通用订单下载)
  DOWNLOADPUBLIC: {
    component: () => import('@/views/modal/InterfacePlatform/downLoadPublic.vue')
  },
  // 淘宝换货单接口-拒绝换货
  TAOBOREFUSEEXCHANGE: {
    component: () => import('@/views/modal/InterfacePlatform/taobaoRefuseExchange.vue')
  },
  //  唯品会退供单-修改收货仓库
  CUSTOMIZEDRECEIPT: {
    component: () => import('@/views/modal/InterfacePlatform/customizedReceipt.vue')
  },
  // 淘宝订单接口-SKU异常登记
  SKUABNORMALREGISTRATION: {
    component: () => import('@/views/modal/orderCenter/changeProduct.vue')
  },
  // 接口平台-京东接口订单-SKU异常处理
  JDSKUEXCEPTIONHANDLING: {
    component: () => import('@/views/modal/orderCenter/changeProduct.vue')
  },
  // 接口平台-通用订单接口-SKU异常处理
  CURRENCYSKUEXCEPTIONHANDLING: {
    component: () => import('@/views/modal/orderCenter/changeProduct.vue')
  },
};

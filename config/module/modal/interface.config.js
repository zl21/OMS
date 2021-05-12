import downLoad from 'professionalComponents/downLoad.vue'

// 接口平台
export default {
  // 淘宝订单接口
  DOWNLOADORDER: {
    // component: () => import('professionalComponents/downLoad.vue')
    component: downLoad
  },
  // 通用订单接口 通用退单接口 (通用订单下载)
  DOWNLOADPUBLIC: {
    // component: () => import('professionalComponents/downLoad.vue')
    component: downLoad
  },
  // 淘宝换货单接口-拒绝换货
  TAOBOREFUSEEXCHANGE: {
    component: () => import('@/views/modal/interfacePlatform/taobaoRefuseExchange.vue')
  },
};

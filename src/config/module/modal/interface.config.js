// 接口平台
export default {
  
  // 淘宝换货单接口-拒绝换货
  TAOBOREFUSEEXCHANGE: {
    component: () => import(
      /* webpackChunkName: 'InterfaceCenterModal' */
      '@/views/modal/interfacePlatform/taobaoRefuseExchange.vue'
    )
  },
};

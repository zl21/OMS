// 商品中心
export default {
  // 淘宝商品 (下载商品) 接口平台配置 IP_C_TAOBAO_PRODUCT
  // 唯品会 (下载商品)   接口平台配置 IP_C_VIP_PRO
  // 通用商品(通用商品下载)  同接口平台通用订单接口
  // 京东商品 (下载商品) 
  DOWNLOADJINGDONGGOODS: {
    component: () => import("@/views/modal/commodityCenter/downLoadJingdongGoods.vue"),
  },

};

// 商品中心
export default {
  // //淘宝商品 (下载商品)
  DOWNLOADTAOBAOGOODS: {
    component: () => import("@/views/modal/commodityCenter/downLoadTaobaoGoods.vue"),
  },
  // //京东商品 (下载商品)
  DOWNLOADJINGDONGGOODS: {
    component: () => import("@/views/modal/commodityCenter/downLoadJingdongGoods.vue"),
  },
  // //京东商品 (下载商品)
  DOWNLOADVIPGOODS: {
    component: () => import("@/views/modal/commodityCenter/downLoadVipGoods.vue"),
  },
  // 通用商品(通用商品下载)  同接口平台通用订单接口
  // DOWNLOADPUBLIC: {
  //   component: () => {
  //     import("@/views/modal/InterfacePlatform/downLoadPublic.vue");
  //   }
  // },
};

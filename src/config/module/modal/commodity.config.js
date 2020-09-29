// 商品中心
export default {
  // //京东商品 (下载商品)
  downLoadJingdongGoods: {
    component: () => import("@/views/modal/commodityCenter/downLoadJingdongGoods.vue"),
  },
  // 通用商品(通用商品下载)
  downLoadPublic : {
    component: () => {
      import("@/views/modal/InterfacePlatform/downLoadPublic.vue");
    }
  },
};

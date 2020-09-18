export default {
  //淘宝商品 (下载商品)
  downLoadTaobaoGoods: {
    component: () => import("@/views/modal/commodityCenter/downLoadTaobaoGoods.vue"),
  },
  //京东商品 (下载商品)
  downLoadJingdongGoods: {
    component: () => import("@/views/modal/commodityCenter/downLoadJingdongGoods.vue"),
  },
  // 通用商品(通用商品下载)
  downLoadPublic : {
    component: () => {
      import("@/views/modal/InterfacePlatform/downLoadPublic.vue");
    }
  },
  // 唯品会商品(下载商品)
  downLoadVipGoods: {
    component: () => {
      import("@/views/modal/commodityCenter/downLoadVipGoods.vue");
    }
  }
};

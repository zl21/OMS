// 接口平台
export default {
  // 淘宝订单接口
  downLoadTaobaoOrder: {
    component: () => {
      import("@/views/modal/InterfacePlatform/downLoadAll.vue");
    },
  },
  // 通用订单接口 通用退单接口 (通用订单下载)
  downLoadPublic : {
    component: () => {
      import("@/views/modal/InterfacePlatform/downLoadPublic.vue");
    }
  }
};

// 接口平台
export default {
  // 淘宝订单接口
  DOWNLOADORDER: {
    component: () => {
      import("@/views/modal/InterfacePlatform/downLoadAll.vue");
    },
  },
  // 通用订单接口 通用退单接口 (通用订单下载)
  DOWNLOADPUBLIC: {
    component: () => {
      import("@/views/modal/InterfacePlatform/downLoadPublic.vue");
    }
  }
};

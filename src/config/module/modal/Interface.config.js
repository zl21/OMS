export default {
  // 淘宝订单接口
  downLoadTaobaoOrder: {
    component: () => {
      import("@/views/modal/InterfacePlatform/downLoadAll.vue");
    },
  },
  // // 换货单下载
  // taoBaoExchangeBillDownload: {
  //   component: () => {
  //     import("@/views/modal/InterfacePlatform/taoBaoExchangeBillDownload.vue");
  //   },
  // },
  // // 退单下载
  // taobaoReturnListDownload: {
  //   component: () => {
  //     import("@/views/modal/InterfacePlatform/taobaoReturnListDownload.vue");
  //   },
  // },
  // //京东订单接口  (订单下载)
  // downLoadJingdongOrder: {
  //   component: () => {
  //     import("@/views/modal/InterfacePlatform/downLoadJingdongOrder.vue");
  //   },
  // },
  // // 京东订单接口 (退单下载)
  // downLoadJDChargeback: {
  //   component: () => {
  //     import("@/views/modal/InterfacePlatform/downLoadJDChargeback.vue");
  //   },
  // },
  // // JITX 订单接口 (订单下载)
  // downLoadJitxOrder: {
  //   component: () => {
  //     import("@/views/modal/InterfacePlatform/downLoadJitxOrder.vue");
  //   },
  // },
  // //JITX寻仓接口 (寻仓订单下载)
  // downLoadVipDelivery: {
  //   component: () => {
  //     import("@/views/modal/InterfacePlatform/downLoadVipDelivery.vue");
  //   },
  // },
  // // 唯品会退供单 (退供单下载) 
  // downLoadVipRetreatSupply: {
  //   component: () => {
  //     import("@/views/modal/InterfacePlatform/downLoadVipRetreatSupply.vue");
  //   },
  // },
  // // 唯品会时效订单 (时效订单下载)
  // downLoadVipTimeOrder: {
  //   component: () => {
  //     import("@/views/modal/InterfacePlatform/downLoadVipTimeOrder.vue");
  //   },
  // },
  // // 唯品会取消时效订单(取消时效订单下载)
  // downLoadVipCancelTimeOrder : {
  //   component: () => {
  //     import("@/views/modal/InterfacePlatform/downLoadVipCancelTimeOrder.vue");
  //   }
  // },
  // 通用订单接口 通用退单接口 (通用订单下载)
  downLoadPublic : {
    component: () => {
      import("@/views/modal/InterfacePlatform/downLoadPublic.vue");
    }
  }
};

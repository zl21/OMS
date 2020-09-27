export default {
  //JIT配货单修改仓库测试弹框
  modifyWarehouse: {
    component: () => import("@/views/modal/InterfacePlatform/downLoadPublic.vue"),
  },
  //JIT拣货单 (创建拣货单)
  vipCreatePickorder: {
    component: () => import("@/views/modal/orderCenter/vipCreatePickorder.vue")
  },
  // JIT配货单(手工占单)
  vipDistributionOccus: {
    component: () => import("@/views/modal/orderCenter/vipDistributionOccus.vue")
  },
  // JIT配货单(匹配出仓单)
  deliveryOrder: {
    component: () => import("@/views/modal/orderCenter/deliveryOrder.vue")
  },
  // JIT PO单(下载PO单)
  vipDownloadPo: {
    component: () => import("@/views/modal/orderCenter/vipDownloadPo.vue")
  },
  // JIT仓库管理(生成出仓单)
  jtWarehouse: {
    component: () => import("@/views/modal/orderCenter/jtWarehouse.vue")
  }
  
};

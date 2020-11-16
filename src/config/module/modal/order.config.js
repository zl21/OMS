// 订单中心
export default {
  // JIT配货单修改仓库测试弹框
  MODIFYWAREHOUSE: {
    component: () => import('@/views/modal/orderCenter/modifyWarehouse.vue'),
  },
  // JIT拣货单 (创建拣货单)
  VIPCREATEPICKORDER: {
    component: () => import('@/views/modal/orderCenter/vipCreatePickorder.vue')
  },
  // JIT配货单(手工占单)
  VIPDISTRIBUTIONOCCUS: {
    component: () => import('@/views/modal/orderCenter/vipDistributionOccus.vue')
  },
  // JIT配货单(匹配出仓单)->改名为(匹配唯品会入库单)
  DELIVERYORDER: {
    component: () => import('@/views/modal/orderCenter/deliveryOrder.vue')
  },
  // JIT PO单(下载PO单)
  VIPDOWNLOADPO: {
    component: () => import('@/views/modal/orderCenter/vipDownloadPo.vue')
  },
  // JIT仓库管理(生成出仓单)
  JTWAREHOUSE: {
    component: () => import('@/views/modal/orderCenter/jtWarehouse.vue')
  },
  MODIFYLOGISTICSNUMBER: {
    component: () => import('@/views/modal/orderCenter/modifyLogisticsNumber.vue')
  },

  EXTRARETURNIMPORT: {
    component: () => import('@/views/modal/orderCenter/extraReturnImport.vue')
  }
};

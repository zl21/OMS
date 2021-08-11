/*
 * @Author: your name
 * @Date: 2021-04-28 13:22:03
 * @LastEditTime: 2021-07-14 19:27:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /burgeon-project-logic/config/module/modal/order.config.js
 */
// 订单中心
export default {
  PAYDETAIL: { 
    component: () => import('@/views/pages/orderCenter/pay/payDetail.vue'),
  },
  ORDERRETURN: { 
    component: () => import('@/views/pages/orderCenter/returnOrder/orderReturnchange.vue'),
    labelName: '返回'
  },
  SAVE: { 
    component: () => import('@/views/pages/orderCenter/returnOrder/save.vue'),
    labelName: '保存'
  },
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
  MODIFYWMS: {
    component: () => import('@/views/modal/orderCenter/modifyWms.vue')
  },

  EXTRARETURNIMPORT: {
    component: () => import('@/views/modal/orderCenter/extraReturnImport.vue')
  },
  CREATEGRN: {
    component: () => import('@/views/modal/orderCenter/createGrn.vue')
  },
  REFUSETOPAYOCBRETURNAFSEND: {
    component: () => import('@/views/modal/orderCenter/returngood/refuseToPayOcBReturnAfSend.vue')
  },
  PICKORDEREXPORT: {
    component: () => import('@/views/modal/orderCenter/returngood/pickorderExport.vue')
  },
  // JIT配货单-换吊牌
  EXCHANGETAG: {
    component: () => import('@/views/modal/orderCenter/exchangeTag.vue')
  },
  CHANGETAG: {
    component: () => import('@/views/modal/orderCenter/changeTag.vue'),
    labelName: '换吊牌',
    isList: false
  },
  MANUAL: {
    component: () => import('@/views/modal/orderCenter/manual.vue')
  },
  FOURCE: {
    component: () => import('@/views/modal/orderCenter/force.vue')
  },

  REMITFAIL:{
    component: () => import('@/views/modal/orderCenter/remitFail.vue') //
  }
};

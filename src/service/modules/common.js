// 公共的接口
import R3 from '@syman/burgeon-r3';
import qs from 'qs';

const { network } = R3;

export default {
  // 详情页数据查询接口。共用于：inventoryCenter、orderCenter
  getObject: params => network.post('/p/cs/getObject', params),
  queryPhyWareHouseList: params => network.post('/p/cs/queryPhyWareHouseList', params),
  selectLimitGroups: params => network.post('/p/cs/selectLimitGroups', params),
  objectTableItem: params => network.post('/p/cs/objectTableItem', params),
  saveWarehouseLogistics: params => network.post('/p/cs/saveWarehouseLogistics', params),
  getWarehouseLogisticsTree: params => network.post('/p/cs/getWarehouseLogisticsTree', params),
  getLogisticsRankResultTable: params => network.post('/p/cs/getLogisticsRankResultTable', params),
  getLogisticsLikeRankResultTable: params => network.post('/p/cs/getLogisticsLikeRankResultTable', params),
  voidWarehouseLogistics: params => network.post('/p/cs/voidWarehouseLogistics', params),
  exportWarehouseLogisticsRank: params => network.post('/p/cs/exportWarehouseLogisticsRank', params),
  getPromField: params => network.get('/p/cs/getPromField', params),
  getWarehouseLogisticsInfo: params => network.post('/p/cs/getWarehouseLogisticsInfo', params),
  delWarehouseLogistics: params => network.post('/p/cs/delWarehouseLogistics', params),
  selectCompenstateLogistic: params => network.post('/p/cs/selectCompenstateLogistic', params),
  getExpressAreaTree: params => network.post('/p/cs/getExpressAreaTree', params),
  getExpressAreaItemLikeTable: params => network.post('/p/cs/getExpressAreaItemLikeTable', params),
  getExpressAreaItemTable: params => network.post('/p/cs/getExpressAreaItemTable', params),
  exportExpressAreaItem: params => network.post('/p/cs/exportExpressAreaItem', params),
  skuQuery: params => network.post('/p/cs/skuQuery', params),
  fetchActionsInCustomizePage: params => network.get(`/p/cs/v2/fetchActionsInCustomizePage?${qs.stringify(params)}`),
  manualJdMatchingCheck: params => network.post('/p/cs/manualJdMatchingCheck', params),
  jdReturnStorageSave: params => network.get('/p/cs/jdReturnStorageSave', params),
  manualJdMatchingList: params => network.post('/p/cs/manualJdMatchingList', params),
  screenresult: params => network.post('/p/cs/screenresult', params),
  cpCHrorgTree: params => network.post('/p/c/cpCHrorgTree', params),
  addToFavorite: params => network.post('/p/cs/addToFavorite', params),
  groupTreeload: params => network.post('/p/cs/groupTreeload', params),
  removeFromFavorite: params => network.post('/p/cs/removeFromFavorite', params),
  itemDownload: params => network.post('/p/cs/itemDownload', params),
  getUserConfig: params => network.post('/p/cs/getUserConfig', params),
  QueryList: params => network.post('/p/cs/QueryList', params),
  SgOutNoticePrint: params => network.post('/p/cs/SgOutNoticePrint', params),
  fuzzyquerybyak: params => network.post('/p/cs/fuzzyquerybyak', params),
  cgroupcolumnquery: params => network.get(`/p/cs/cgroupcolumnquery?${qs.stringify(params)}`),
  queryShopPermission: params => network.get('/p/cs/queryShopPermission', params),
  screenresultcheck: params => network.post('/p/cs/screenresultcheck', params),
  searchButtonsInJdDetail: params => network.post('/p/cs/searchButtonsInJdDetail', params),
  objectSave: params => network.post('/p/cs/objectSave', params),
  cpromLogQuery: params => network.post('/p/cs/cpromLogQuery', params),
  getweekdate: params => network.post('/p/cs/getweekdate', params),
  getWarehourseByShopId: params => network.post('/p/cs/getWarehourseByShopId', params),
  voidPayableAdjustment: params => network.post('/p/cs/voidPayableAdjustment', params),
  regionBySelect: params => network.post('/p/cs/regionBySelect', params),
  prodel: params => network.post('/p/cs/prodel', params),
  exeAction: params => network.post('/p/cs/exeAction', params),
  menuimport: params => network.post('/p/cs/menuimport', params),
  queryOcBOrder: params => network.post('/api/cs/oc/oms/v1/queryOcBOrder', params),
  returnOrderquery: params => network.post('/api/cs/oc/oms/v1/returnOrderquery', params),
  returnSkuDb: params => network.post('/p/cs/returnSkuDb', params),
  checkAllStroreStock: params => network.post('/api/cs/oc/oms/v1/checkAllStroreStock', params),
  returnOrder: params => network.post('/api/cs/oc/oms/v1/returnOrder', params),
  chargebackcheck: params => network.post('/api/cs/oc/oms/v1/chargebackcheck', params),
  OcCancelChangingOrRefund: params => network.post('/api/cs/oc/oms/v1/OcCancelChangingOrRefund', params),
  updateVirtualLibrary: params => network.post('/api/cs/oc/oms/v1/updateVirtualLibrary', params),
  getOrderList: params => network.post('/p/cs/getOrderList', params),
  extInfoQuery: params => network.post('/p/cs/extInfoQuery', params),
  manualJdMatchingConfirmationButton: params => network.post('/p/cs/manualJdMatchingConfirmationButton', params),
  seachJdForced: params => network.post('/p/cs/seachJdForced', params),
  getJdScanIncomingInfo: params => network.post('/p/cs/getJdScanIncomingInfo', params),
  saveJdScanIncoming: params => network.post('/p/cs/saveJdScanIncoming', params),
  getTableQuery: params => network.post('/p/cs/getTableQuery', params),
  groupQueryName: params => network.post('/p/cs/groupQueryName', params),
  cuserspro: params => network.post('/p/cs/cuserspro', params),
  objectDelete: params => network.post('/p/cs/objectDelete', params),
  cprolikequery: params => network.post('/p/cs/cprolikequery', params),
  cgroupsquery: params => network.get(`/p/cs/cgroupsquery?${qs.stringify(params)}`),
  getCopyTargetGroups: params => network.get(`/p/cs/getCopyTargetGroups?${qs.stringify(params)}`),
  // 导出接口。共用于：financeCenter、inventoryCenter
  exportPayableAdjustment: params => network.post('/p/cs/exportPayableAdjustment', params),
  // 查询接口。共用于：financeCenter、orderCenter
  queryOrderList: params => network.post('/api/cs/oc/oms/v1/queryOrderList', params),

  // 通用接口下载
  /**
   * 经销订单下载 分销商订单下载 /p/cs/orderDownload
   * 分销商品下载 /p/cs/itemDownload
   * 通用商品下载 /p/cs/stdp/item/get
   * 分销退单下载 /p/cs/refundDownload
   * "/p/cs/stdp/order/get
   */
  publicOrderDownload: (url, params) => network.post(url, params),

  /**
   * 导入 / 下载模版 - 接口 
   */
  importApiArr: () => {
    const arr = [
      { 
        tableName: 'OC_B_ORDER',
        url: '/api/cs/oc/oms/v1/importOcBOrder',
        downloadUrl: '/api/cs/oc/oms/v1/downloadOrderTemp' 
      }, // 零售发货单
      { 
        tableName: 'PS_C_SKU',
        url: '/p/cs/pm/v1/parseExcel',
        // 促销批量
        urlType: '/p/cs/pm/v1/parseActiExcelCmd',
        downloadUrl: '/p/cs/pm/v1/getModuleUrl'
      },
      { 
        tableName: 'SG_B_CHANNEL_PRODUCT',
        url: '/p/cs/pm/v1/parseExcel',
        // 促销批量
        urlType: '/p/cs/pm/v1/parseActiExcelCmd',
        downloadUrl: '/p/cs/pm/v1/getModuleUrl'
      },
      { 
        tableName: 'PS_C_PRO',
        url: '/p/cs/pm/v1/parseExcel',
        // 促销批量
        urlType: '/p/cs/pm/v1/parseActiExcelCmd',
        downloadUrl: '/p/cs/pm/v1/getModuleUrl'
      },
      { 
        tableName: 'IP_C_TAOBAO_PRODUCT',
        url: '/p/cs/pm/v1/parseExcel',
        // 促销批量
        urlType: '/p/cs/pm/v1/parseActiExcelCmd',
        downloadUrl: '/p/cs/pm/v1/getModuleUrl'
      }, 
      { 
        tableName: 'OC_B_RETURN_ORDER',
        downloadUrl: '/api/cs/oc/oms/v1/downloadReturnOrderTemp'
      }, // 退换货订单
      { 
        tableName: 'PS_C_SKUGROUP',
        // 组合商品档案明细与虚拟条码
        url: '/p/cs/product/realSkuGroupImport',
        // 组合商品档案明细
        urlType: '/p/cs/product/skuGroupImport',
        // 组合商品档案明细与虚拟条码
        downloadUrl: '/p/cs/product/downloadRealSkuGroupTemp',
        // 组合商品档案明细
        downloadUrlType: '/p/cs/product/downloadSkuGroupTemp'
      }, 
      { 
        tableName: 'OC_B_INVOICE_NOTICE',
        url: '/api/cs/oc/oms/v1/importInvoiceNotice',
        downloadUrl: '/api/cs/oc/oms/v1/downloadInvoiceNotice' 
      }, // 开票信息
      { 
        tableName: 'AC_F_DISTRIBUTION',
        url: '/p/cs/importDistributionItem',
        downloadUrl: '/p/cs/downloadDistributionItem'  
      }, // 分销代销商品明细
      { 
        tableName: 'ST_C_EXPRESS_AREA',
        url: '/p/cs/importExpressAreaItem',
        downloadUrl: '/p/cs/downloadExpressAreaItem'
      }, // 物流区域设置
      { 
        tableName: 'OUT_OF_STOCK_MEMO',
        url: '/api/cs/oc/oms/v1/batchImport',
        downloadUrl: '/api/cs/oc/oms/v1/downloadUpdateRemarkTemp'
      }, // 缺货备注
      { 
        tableName: 'ST_C_WAREHOUSE_LOGISTICS',
        url: '/p/cs/importWarehouseLogisticsRank',
        downloadUrl: '/p/cs/downloadWarehouseLogisticsRank'
      }, // 仓库物流优先级设置
      { 
        tableName: 'OC_B_REFUND_IN',
        url: '/api/cs/oc/oms/v1/refundInImport',
        downloadUrl: '/api/cs/oc/oms/v1/downloadRdfundInRemarkTemp'  
      }, // 退货入库
      { 
        tableName: 'ST_C_SEND_RULE',
        url: '/p/cs/importSendRuleWarehouseRank',
        downloadUrl: '/p/cs/downloadSendRuleWarehouseRank'
      }, // 订单派单规则-优先级
      { 
        tableName: 'ST_C_SEND_RULE_RATE',
        url: '/p/cs/importSendRuleWarehouseRate',
        downloadUrl: '/p/cs/downloadSendRuleWarehouseRate'
      }, // 订单派单规则-比例
      { 
        tableName: 'OC_B_RETURN_ORDER_remark',
        url: '/api/cs/oc/oms/v1/importReturnSellerRemark',
        downloadUrl: '/api/cs/oc/oms/v1/downloadReturnRemarkTemp'
      }, // 退换货卖家备注导入
      { 
        tableName: 'AC_F_RECEIVABLES_ADJUSTMENT',
        url: '/p/cs/receivableAdjustmentImport',
        downloadUrl: '/p/cs/receivableAdjustmentDownload'
      }, // 应收款调整单导入
      { 
        tableName: 'SC_B_TRANSFER',
        url: '/p/cs/transfer/sgTransferImport',
        urlType: '/p/cs/store/transfer/importTransferItems',
        downloadUrl: '/p/cs/transfer/downloadTemp',
        downloadUrlType: 'http://qd-r3-upload-dev.oss-cn-shanghai.aliyuncs.com/import/template/sc_b_transfer/dbd_template.xlsx'
      }, //
      { 
        tableName: 'SG_B_PHY_OUT_RESULT',
        url: '/p/cs/importSgPhyOutResult',
        downloadUrl: '/p/cs/downLoadSgPhyOutResultTemp'  
      }, // 出库结果单
      { 
        tableName: 'OC_B_MULTI_STORE_DISTRIBUTION',
        url: '/p/cs/oc/v1/sale/importMultiStoreDistributionSku',
        downloadUrl: '/p/cs/oc/v1/sale/downloadMultiStoreDistributionSku'
      }, //
      { 
        tableName: 'OC_B_SEND_OUT',
        url: '/p/cs/oc/v1/send/importSendOutSku', 
        urlType: '/p/cs/oc/v1/send/importSendOut',
        downloadUrl: 'http://qd-r3-upload-dev.oss-cn-shanghai.aliyuncs.com/import/template/saleorder/importTemplate.xlsx', 
        downloadUrlType: 'http://qd-r3-upload-dev.oss-cn-shanghai.aliyuncs.com/import/template/saleorder/importTemplate_batch.xlsx'
      },
      { 
        tableName: 'OC_B_JD_RETURN_ORDER',
        url: '/p/cs/ocBJdReturnOrder/importTemple',
        downloadUrl: '/p/cs/ocBJdReturnOrder/downloadTemple'  
      },
      { 
        tableName: 'IP_C_STANDPLAT_PRO',
        url: '/p/cs/getItemIdsForExcel',
        downloadUrl: 'http://smtools.oss-cn-shanghai.aliyuncs.com/import/template/893/商品下载-商品代码上传模板-root-20200622161110098.xlsx' 
      }, // 通用商品下载
      { 
        tableName: 'ST_C_SYNC_STOCK_STRATEGY',
        url: '/p/cs/importSyncStockStrategy',
        downloadUrl: '/p/cs/downLoadSyncStockStrategyImportTemp' 
      }, // 店铺同步库存策略
      { 
        tableName: 'IP_C_STANDPLAT_PRO_mcdr',
        url: '/p/cs/alibabaProductImport',
        downloadUrl: 'https://semir-r3-upload-prod.oss-cn-zhangjiakou.aliyuncs.com/tmp/maochao/%E7%8C%AB%E8%B6%85%E5%95%86%E5%93%81%E5%AF%BC%E5%85%A5%E6%A8%A1%E6%9D%BF.xlsx' 
      }, // 通用商品-猫超商品导入
      {
        tableName: 'AC_F_LIVE_ORDER',
        url: '/p/cs/ac/v1/liveOrderImport',
        downloadUrl: '/p/cs/ac/v1/liveOrderImportTemp'
      }, // O2O直播订单设置
      { 
        tableName: 'ST_C_PRODUCT_STRATEGY',
        url: '/p/cs/productStrategy/import/multiShopItem',
        downloadUrl: '/p/cs/productStrategy/import/downloadMultiShopTemp'
      } // 店铺商品特殊设置 - 多店铺比例-明细导入
    ];
    return arr;
  },
};

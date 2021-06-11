/**
 * 说明:
 * http://knowledge.ark.burgeononline.com/repository#/entryComponents/2/749656/1/2061
 */

const importConfig = {
  OC_B_REFUND_ORDER_EXTRA__IMPORT_PAY_RESULT: {
    // 额外退款单-导入打款结果
    isAction: true,
    tableName: 'OC_B_REFUND_ORDER_EXTRA',
    webname: 'IMPORT_PAY_RESULT',
    tempApi: '/p/cs/oc/oms/v1/refundExtra/remitResultDownLoad',
    okApi: '/p/cs/oc/oms/v1/refundExtra/remitResultImport',
    downErrorInfo: true,
  },
  OC_B_REFUND_ORDER_EXTRA__EXTRA_IMPORT: {
    // 额外退款单-导入
    isAction: true,
    tableName: 'OC_B_REFUND_ORDER_EXTRA',
    webname: 'EXTRA_IMPORT',
    tempApi: '/p/cs/oc/oms/v1/refundExtra/downLoad',
    okApi: '/p/cs/oc/oms/v1/refundExtra/import',
    downErrorInfo: true,
  },
  PS_C_SKU__skuImport: {
    // 商品sku-导入
    isAction: true,
    tableName: 'PS_C_SKU',
    webname: 'skuImport',
    tempApi: '/p/cs/ps/import/v1/template',
    okApi: '/p/cs/ps/import/v1/pro',
    downErrorInfo: true,
  },
  CP_C_PHY_WAREHOUSE__warehouseImport: {
    isAction: true,
    tableName: 'CP_C_PHY_WAREHOUSE',
    webname: 'warehouseImport',
    tempApi: '/p/cs/cp/import/v1/warehouse/template',
    tempParm: null,
    okApi: '/p/cs/cp/import/v1/warehouse/import',
    okParm: null,
    downErrorInfo: true,
  },
  CP_C_LOGISTICS__logisticsImport: {
    // 物流公司档案-导入
    isAction: true,
    tableName: 'CP_C_LOGISTICS',
    webname: 'logisticsImport',
    tempApi: '/p/cs/cp/import/v1/logistics/template',
    tempParm: null,
    okApi: '/p/cs/cp/import/v1/logistics/import',
    okParm: null,
    downErrorInfo: true,
  },
  PS_C_SKU__skuImportUpdate: {
    // 商品sku-导入更新
    isAction: true,
    tableName: 'PS_C_SKU',
    webname: 'skuImportUpdate',
    tempApi: '/p/cs/ps/import/v1/sku/template',
    tempParm: null,
    okApi: '/p/cs/ps/import/v1/sku/update',
    okParm: null,
    downErrorInfo: true,
    showErrorInfo: false,
    // freshPage: Fn,
    importNotes: false,
    dontShowDownloadA: false,
  },
  PS_C_SKU__skuImport: {
    // 商品sku-导入
    isAction: true,
    tableName: 'PS_C_SKU',
    webname: 'skuImport',
    tempApi: '/p/cs/ps/import/v1/template',
    okApi: '/p/cs/ps/import/v1/pro',
    downErrorInfo: true,
  },
  PS_C_PRO__spuImportUpdate: {
    // 商品spu-导入更新
    isAction: true,
    tableName: 'PS_C_PRO',
    webname: 'spuImportUpdate',
    tempApi: '/p/cs/ps/import/v1/spu/template',
    okApi: '/p/cs/ps/import/v1/pro/update',
    downErrorInfo: true,
  },
  PS_C_PRO__spuImport: {
    // 商品spu-导入
    isAction: true,
    tableName: 'PS_C_SKU',
    webname: 'skuImport',
    tempApi: '/p/cs/ps/import/v1/template',
    okApi: '/p/cs/ps/import/v1/pro',
    downErrorInfo: true,
  },
  PS_C_PRO_GROUP__ordinaryGroupImport: {
    // 普通组合商品导入-普通商品导入
    isAction: true,
    tableName: 'PS_C_PRO_GROUP',
    webname: 'ordinaryGroupImport',
    tempApi: '/p/cs/ps/import/v1/groupSku/template',
    okApi: '/p/cs/ps/import/v1/group',
    downErrorInfo: true,
  },
  PS_C_PRO_GROUP__luckGroupImport: {
    // 普通组合商品导入-福袋商品导入
    isAction: true,
    tableName: 'PS_C_PRO_GROUP',
    webname: 'luckGroupImport',
    tempApi: '/p/cs/ps/import/v1/luckySku/template',
    okApi: '/p/cs/ps/import/v1/luckygroup',
    downErrorInfo: true,
  },
  OC_B_ORDER: {
    tableName: 'OC_B_ORDER',
    url: '/api/cs/oc/oms/v1/importOcBOrder',
    downloadUrl: '/api/cs/oc/oms/v1/downloadOrderTemp'
  }, // 零售发货单
  PS_C_SKU: {
    tableName: 'PS_C_SKU',
    url: '/p/cs/pm/v1/parseExcel',
    // 促销批量
    urlType: '/p/cs/pm/v1/parseActiExcelCmd',
    downloadUrl: '/p/cs/pm/v1/getModuleUrl'
  },
  SG_B_CHANNEL_PRODUCT: {
    tableName: 'SG_B_CHANNEL_PRODUCT',
    url: '/p/cs/pm/v1/parseExcel',
    // 促销批量
    urlType: '/p/cs/pm/v1/parseActiExcelCmd',
    downloadUrl: '/p/cs/pm/v1/getModuleUrl'
  },
  PS_C_PRO: {
    tableName: 'PS_C_PRO',
    url: '/p/cs/pm/v1/parseExcel',
    // 促销批量
    urlType: '/p/cs/pm/v1/parseActiExcelCmd',
    downloadUrl: '/p/cs/pm/v1/getModuleUrl'
  },
  IP_C_TAOBAO_PRODUCT: {
    tableName: 'IP_C_TAOBAO_PRODUCT',
    url: '/p/cs/pm/v1/parseExcel',
    // 促销批量
    urlType: '/p/cs/pm/v1/parseActiExcelCmd',
    downloadUrl: '/p/cs/pm/v1/getModuleUrl'
  },
  OC_B_RETURN_ORDER: {
    tableName: 'OC_B_RETURN_ORDER',
    downloadUrl: '/api/cs/oc/oms/v1/downloadReturnOrderTemp'
  }, // 退换货订单
  PS_C_SKUGROUP: {
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
  OC_B_INVOICE_NOTICE: {
    tableName: 'OC_B_INVOICE_NOTICE',
    url: '/api/cs/oc/oms/v1/importInvoiceNotice',
    downloadUrl: '/api/cs/oc/oms/v1/downloadInvoiceNotice'
  }, // 开票信息
  OC_B_RETURN_AF_SEND_MANUAL: {
    tableName: 'OC_B_RETURN_AF_SEND_MANUAL',
    url: '/api/cs/oc/oms/v1/downloadUpdateOcBReturnAfSendTemp',
    downloadUrl: '/api/cs/oc/oms/v1/batchUpdateOcBReturnAfSend'
  }, // 打款结果
  POS_SC_B_TRANSFER: {
    tableName: 'POS_SC_B_TRANSFER',
    url: '/p/cs/sg/transferPos/import',
  },
  OC_B_SALE: {
    tableName: 'OC_B_SALE',
    url: '/p/cs/oc/sale/pdaImport',
  },
  OC_B_REFUND_SALE: {
    tableName: 'OC_B_REFUND_SALE',
    url: '/p/cs/oc/refundSale/pdaImport',
  },
  SG_B_OUT_PICKORDER: {
    tableName: 'SG_B_OUT_PICKORDER',
    url: '/p/cs/sg/outPickorder/pdaImport',
  },
  OC_B_JD_REFUND_IN: {
    tableName: 'OC_B_JD_REFUND_IN',
    url: '/p/cs/ocBJdRefundInOrder/importTemple',
  },
  AC_F_DISTRIBUTION: {
    tableName: 'AC_F_DISTRIBUTION',
    url: '/p/cs/importDistributionItem',
    downloadUrl: '/p/cs/downloadDistributionItem'
  }, // 分销代销商品明细
  ST_C_EXPRESS_AREA: {
    tableName: 'ST_C_EXPRESS_AREA',
    url: '/p/cs/importExpressAreaItem',
    downloadUrl: '/p/cs/downloadExpressAreaItem'
  }, // 物流区域设置
  OUT_OF_STOCK_MEMO: {
    tableName: 'OUT_OF_STOCK_MEMO',
    url: '/api/cs/oc/oms/v1/batchImport',
    downloadUrl: '/api/cs/oc/oms/v1/downloadUpdateRemarkTemp'
  }, // 缺货备注
  ST_C_WAREHOUSE_LOGISTICS: {
    tableName: 'ST_C_WAREHOUSE_LOGISTICS',
    url: '/p/cs/importWarehouseLogisticsRank',
    downloadUrl: '/p/cs/downloadWarehouseLogisticsRank'
  }, // 仓库物流优先级设置
  OC_B_REFUND_IN: {
    tableName: 'OC_B_REFUND_IN',
    url: '/api/cs/oc/oms/v1/refundInImport',
    downloadUrl: '/api/cs/oc/oms/v1/downloadRdfundInRemarkTemp'
  }, // 退货入库
  ST_C_SEND_RULE: {
    tableName: 'ST_C_SEND_RULE',
    url: '/p/cs/importSendRuleWarehouseRank',
    downloadUrl: '/p/cs/downloadSendRuleWarehouseRank'
  }, // 订单派单规则-优先级
  ST_C_SEND_RULE_RATE: {
    tableName: 'ST_C_SEND_RULE_RATE',
    url: '/p/cs/importSendRuleWarehouseRate',
    downloadUrl: '/p/cs/downloadSendRuleWarehouseRate'
  }, // 订单派单规则-比例
  OC_B_RETURN_ORDER_remark: {
    tableName: 'OC_B_RETURN_ORDER_remark',
    url: '/api/cs/oc/oms/v1/importReturnSellerRemark',
    downloadUrl: '/api/cs/oc/oms/v1/downloadReturnRemarkTemp'
  }, // 退换货卖家备注导入
  AC_F_RECEIVABLES_ADJUSTMENT: {
    tableName: 'AC_F_RECEIVABLES_ADJUSTMENT',
    url: '/p/cs/receivableAdjustmentImport',
    downloadUrl: '/p/cs/receivableAdjustmentDownload'
  }, // 应收款调整单导入
  SC_B_TRANSFER: {
    tableName: 'SC_B_TRANSFER',
    url: '/p/cs/transfer/sgTransferImport',
    urlType: '/p/cs/store/transfer/importTransferItems',
    downloadUrl: '/p/cs/transfer/downloadTemp',
    downloadUrlType: 'http://qd-r3-upload-dev.oss-cn-shanghai.aliyuncs.com/import/template/sc_b_transfer/dbd_template.xlsx'
  }, //
  SG_B_PHY_OUT_RESULT: {
    tableName: 'SG_B_PHY_OUT_RESULT',
    url: '/p/cs/importSgPhyOutResult',
    downloadUrl: '/p/cs/downLoadSgPhyOutResultTemp'
  }, // 出库结果单
  OC_B_MULTI_STORE_DISTRIBUTION: {
    tableName: 'OC_B_MULTI_STORE_DISTRIBUTION',
    url: '/p/cs/oc/v1/sale/importMultiStoreDistributionSku',
    downloadUrl: '/p/cs/oc/v1/sale/downloadMultiStoreDistributionSku'
  }, //
  OC_B_SEND_OUT: {
    tableName: 'OC_B_SEND_OUT',
    url: '/p/cs/oc/v1/send/importSendOutSku',
    urlType: '/p/cs/oc/v1/send/importSendOut',
    downloadUrl: 'http://qd-r3-upload-dev.oss-cn-shanghai.aliyuncs.com/import/template/saleorder/importTemplate.xlsx',
    downloadUrlType: 'http://qd-r3-upload-dev.oss-cn-shanghai.aliyuncs.com/import/template/saleorder/importTemplate_batch.xlsx'
  },
  OC_B_JD_RETURN_ORDER: {
    tableName: 'OC_B_JD_RETURN_ORDER',
    url: '/p/cs/ocBJdReturnOrder/importTemple',
    downloadUrl: '/p/cs/ocBJdReturnOrder/downloadTemple'
  },
  IP_C_STANDPLAT_PRO: {
    tableName: 'IP_C_STANDPLAT_PRO',
    url: '/p/cs/getItemIdsForExcel',
    downloadUrl: 'http://smtools.oss-cn-shanghai.aliyuncs.com/import/template/893/商品下载-商品代码上传模板-root-20200622161110098.xlsx'
  }, // 通用商品下载
  ST_C_SYNC_STOCK_STRATEGY: {
    tableName: 'ST_C_SYNC_STOCK_STRATEGY',
    url: '/p/cs/importSyncStockStrategy',
    downloadUrl: '/p/cs/downLoadSyncStockStrategyImportTemp'
  }, // 店铺同步库存策略
  ST_C_PRODUCT_STRATEGY: {
    tableName: 'ST_C_PRODUCT_STRATEGY',
    url: '/p/cs/productStrategy/import/multiShopItem',
    downloadUrl: '/p/cs/productStrategy/import/downloadMultiShopTemp'
  } // 店铺商品特殊设置 - 多店铺比例-明细导入
};
export default importConfig;
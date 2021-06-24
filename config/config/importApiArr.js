/**
 * 导入 / 下载模版 - 接口
 */
export default [{
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
    tableName: 'OC_B_RETURN_AF_SEND_MANUAL',
    url: '/api/cs/oc/oms/v1/downloadUpdateOcBReturnAfSendTemp',
    downloadUrl: '/api/cs/oc/oms/v1/batchUpdateOcBReturnAfSend'
  }, // 打款结果
  {
    tableName: 'POS_SC_B_TRANSFER',
    url: '/p/cs/sg/transferPos/import',
  },
  {
    tableName: 'OC_B_SALE',
    url: '/p/cs/oc/sale/pdaImport',
  },
  {
    tableName: 'OC_B_REFUND_SALE',
    url: '/p/cs/oc/refundSale/pdaImport',
  },
  {
    tableName: 'SG_B_OUT_PICKORDER',
    url: '/p/cs/sg/outPickorder/pdaImport',
  },
  {
    tableName: 'OC_B_JD_REFUND_IN',
    url: '/p/cs/ocBJdRefundInOrder/importTemple',
  },
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
    tableName: 'ST_C_PRODUCT_STRATEGY',
    url: '/p/cs/productStrategy/import/multiShopItem',
    downloadUrl: '/p/cs/productStrategy/import/downloadMultiShopTemp'
  }, // 店铺商品特殊设置 - 多店铺比例-明细导入
  {
    tableName: 'AC_F_ALIPAY_ACCOUNTMANAGE',
    url: '/p/cs/ac/v1/alipayAccountManage/importData',
    downloadUrl: '/p/cs/ac/v1/alipayAccountManage/exportTemplate'
  } // 支付宝账户》导入
]
const customizePage = [
  // 订单中心 - 'DISTRIBUTIONORDERLIST','SPLITDISTRIBUTIONORDER','MANUALMATCHING',
  ['ORDERMANAGER', 'ORDERMANAGEDETAIL', 'ORDERMANAGEADD', 'SPLITORDER', 'SCANIN', 'RETURNGOODLIST', 'RETURNGOOD', 'RETURNSTOREAGELIST', 'RETURNTREASURYADD', 'REFUNDAFTERSHIPMENT', 'EXTRAREFUND'],
  // 财务中心 - 'PAYABLEADJUSTMENTLIST','PAYABLEADJUSTADD'
  [],
  // 促销中心 - 'PROMACTIQUERYLIST','ADDOREDITACTI','BATCHACTIVITY','SIMULATION'
  [],
  // 商品中心
  ['COMBINEDCOMMODITY'],
  // 策略平台 - 'LOGISTICSAREA','WPHEMAILSEND','SENDSINGLERULE','ORDERAUTOCHECK','COURIERPAY','SETWAREHOUSELOGISTICS',
  [],
  // 库存中心 - 'SGSTORAGECHANGEFTPQUERY','SGCHANNELSYNSTOCKQUERY','SGCHANNELSTORAGEBUFFER','OUTBOUNDPICKORDER'
  [],
  // 系统配置 - 'PHYSICALSTORAGEAUTHORITY','BRANDPERMISSIONS','SENSITIVECOLUMNPERMISSIONS','STOREWAREHOUSEPERMISSIONS','SALESCHANNELAUTHORITY'
  ['USERPERMISSION', 'COMMODITYAUTHORITY', 'CP_C_GROUPS', 'CP_C_HRUSERS']
]

export default {
  configPage: {
    /* ------------ interfacePlatform ------------ */
    // 淘宝订单--IP_B_TAOBAO_ORDER
    // IP_B_TAOBAO_ORDER: ['/p/cs/orderDownload', ],
    // 京东订单--IP_B_JINGDONG_ORDER
    // IP_B_JINGDONG_ORDER: ['/p/cs/orderDownload', ],
    // JITX订单--IP_B_JITX_ORDER
    // IP_B_JITX_ORDER: ['/p/cs/orderDownload', ],
    // 淘宝退单--IP_B_TAOBAO_REFUND
    // IP_B_TAOBAO_REFUND: ['/p/cs/refundDownload', ],
    // 京东退单--IP_B_JINGDONG_REFUND
    // IP_B_JINGDONG_REFUND: ['/p/cs/refundDownload', ],
    // 通用接口退单-退单下载--IP_B_STANDPLAT_REFUND
    // IP_B_STANDPLAT_REFUND: ['/p/cs/refundDownload', ],
    // 淘宝换货单接口--IP_B_TAOBAO_EXCHANGE
    // IP_B_TAOBAO_EXCHANGE: ['/p/cs/exchangeDownload', ],
    // JITX寻仓接口-寻仓订单下载--IP_B_JITX_DELIVERY
    // IP_B_JITX_DELIVERY: ['/p/cs/downLoadVipDelivery', ],
    // 唯品会退供单--IP_B_VIP_RETURN_ORDER
    // IP_B_VIP_RETURN_ORDER: ['/p/cs/downLoadVipOrderRefund', ],
    // 实效订单下载--IP_B_TIME_ORDER_VIP
    // IP_B_TIME_ORDER_VIP: ['/p/cs/downLoadVipTimeOrder', ],
    // 唯品会取消时效订单-取消实效订单下载--IP_B_CANCEL_TIME_ORDER_VIP
    // IP_B_CANCEL_TIME_ORDER_VIP: ['/p/cs/downLoadVipCancelTimeOrder', ],

    /* ------------ orderCenter ------------ */
    // orderCenter-唯品会入库单-编辑-配货单明细--OC_B_VIPCOM_DELIVERY
    // IP_B_STANDPLAT_REFUND: ['/api/cs/vip/distribution/v1/out/storage', ],
    // 创建出仓单初始化接口
    // OC_B_VIPCOM_DISTRIBUTION: ['/api/cs/vip/distribution/v1/checkBeforeCreateVipDelivery'],

    /* ------------ commodityCenter ------------ */
    // 淘宝商品(下载商品)-IP_C_TAOBAO_PRODUCT
    // IP_C_TAOBAO_PRODUCT: ['/p/cs/itemDownload'],
    // 京东商品(下载商品)-IP_C_JINGDONG_PRODUCT
    // IP_C_JINGDONG_PRODUCT: ['/p/cs/itemDownload'],
    // 通用商品(通用商品下载,导入)-IP_C_STANDPLAT_PRO
    // IP_C_STANDPLAT_PRO: ['/p/cs/stdp/order/get', '/p/cs/getItemIdsForExcel'],
    // 唯品会商品(下载商品)-IP_C_VIP_PRO
    // IP_C_VIP_PRO: ['/p/cs/vip/item/get'],

    /* ------------ inventoryCenter ------------ */
    // 出库结果单--SG_B_PHY_OUT_RESULT
    // SG_B_PHY_OUT_RESULT: ['/p/cs/importSgPhyOutResult'],
    // 平台店铺商品表--SG_B_CHANNEL_PRODUCT
    // SG_B_CHANNEL_PRODUCT: ['/p/cs/storage/manualCalcAndSynchChannelProduct'],
    // 出库通知单-SG_B_PHY_OUT_NOTICES
    // SG_B_PHY_OUT_NOTICES: ['/p/cs/sgPhyOutNoticesSendWMSAgainCondition'],

    /* ------------ strategyPlatfor ------------ */
    // 店铺同步库存策略-ST_C_SYNC_STOCK_STRATEGY
    // ST_C_SYNC_STOCK_STRATEGY: ['/p/cs/importSyncStockStrategy'],
    // 店铺商品特殊设置-ST_C_PRODUCT_STRATEGY
    // ST_C_PRODUCT_STRATEGY: ['/p/cs/delayButtonFunction'],
    // 店铺锁库条码特殊设置-ST_C_LOCK_SKU_STRATEGY
    // ST_C_LOCK_SKU_STRATEGY: ['/p/cs/delayButtonFunction'],
    // 店铺商品虚高库存设置-ST_C_SHOP_VIRTUAL_HIGH_STOCK
    // ST_C_SHOP_VIRTUAL_HIGH_STOCK: ['/p/cs/st/v1/delayEndTime'],
    // 直播解析策略-ST_C_LIVE_CAST_STRATEGY
    // ST_C_LIVE_CAST_STRATEGY: ['/p/cs/st/liveCastStrategy/v1/updateEndTime'],
    // HOLD单策略-ST_C_HOLD_ORDER
    // ST_C_HOLD_ORDER: ['/p/cs/st/holdOrderUpdateStrategyEndTime', ],
    // 物流方案-ST_C_EXPRESS
    // ST_C_EXPRESS: ['/p/cs/delayButtonFunction'],
    // 发货单派单方案-ST_C_SEND_PLAN
    // ST_C_SEND_PLAN: ['/p/cs/delayButtonFunction'],

    /* ------------ financeCenter ------------ */
    // 唯品会进度账单-AC_F_VIP_BILL_PROGRESS
    AC_F_VIP_BILL_PROGRESS: ['/p/cs/ac/v1/triggerVipBill'],
    // 唯品会月结账单-AC_F_VIP_BILL_MONTH
    AC_F_VIP_BILL_MONTH: ['/p/cs/ac/v1/triggerVipBill']
    // 唯品会进度账单聚合表-AC_F_VIP_BILL_PROGRESS_AGGREGATE
    // AC_F_VIP_BILL_PROGRESS_AGGREGATE: ['/p/cs/ac/v1/getVendorCodeAndBillNumber', '/p/cs/ac/v1/generateVipSalesOrder'],
    // 唯品会月结账单聚合表-AC_F_VIP_BILL_MONTH_AGGREGATE
    // AC_F_VIP_BILL_MONTH_AGGREGATE: ['/p/cs/ac/v1/getVendorCodeAndBillNumber', '/p/cs/ac/v1/generateVipSalesOrder'],

    /* ------------ reportCenter ------------ */
    // 订单导出报表-ORDEREXPORTVIEW
    // ORDEREXPORTVIEW: ['/p/cs/exportOrderReport'],
    // 退货入库-REFUND_IN_EXPORTVIEW
    // REFUND_IN_EXPORTVIEW: ['/p/cs/exportRefIn'],
    // 配货单导出报表-V_OC_B_VIPCOM_DISTRIBUTION
    // V_OC_B_VIPCOM_DISTRIBUTION: ['/p/cs/exportVipcomDistribution'],
    // 出库通知单导出报表-V_SG_B_PHY_OUT_NOTICES
    // V_SG_B_PHY_OUT_NOTICES: ['/p/cs/exportPhyOutNoticesReport'],
    // 零售导出报表-V_RETAIL_REPORT
    // V_RETAIL_REPORT: ['/p/cs/exportRetailReport']
  },

  customizePage: customizePage.flat()
};

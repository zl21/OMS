|-- bojun
    |-- .gitignore
    |-- .npmrc
    |-- README.en.md
    |-- README.md
    |-- README_API.md
    |-- babel.config.js
    |-- directoryList.md
    |-- package-lock.json
    |-- package.json
    |-- assets
    |   |-- css
    |   |   |-- css_1_3
    |   |       |-- base.less // 项目基本样式文件
    |   |       |-- custom.less // 框架样式覆盖文件
    |   |       |-- index.less // 项目样式覆盖文件
    |   |       |-- oms_index.less // 主题样式二开文件
    |   |-- img
    |   |   |-- arrow-right.png
    |   |   |-- banner.png
    |   |   |-- form-logo.png
    |   |   |-- login-bg-img.png
    |   |   |-- login-bg.jpg
    |   |   |-- login-form-bg.png
    |   |   |-- loginBg.jpg
    |   |   |-- logo.png
    |   |   |-- matrix.jpg
    |   |   |-- menuLogo.png
    |   |   |-- mini-logo.png
    |   |   |-- openToRight.png
    |   |   |-- openToRight_hover.png
    |   |   |-- switch.png
    |   |   |-- flagImgs
    |   |       |-- 0.png
    |   |       |-- 1.png
    |   |       |-- 2.png
    |   |       |-- 3.png
    |   |       |-- 4.png
    |   |       |-- 5.png
    |   |-- js
    |       |-- ChineseDictionary.js // 已删
    |       |-- constant.js // 仅用于aG
    |       |-- dataToSmall.js // 处理压缩数据
    |       |-- fkRequest.js // 仅用于处理form结构
    |       |-- pako.min.js // 第三方处理压缩数据的工具
    |       |-- __utils__
    |       |   |-- common.js // 公用方法（已经整合到commonUtils,待该引用后删除）
    |       |   |-- custom-ag-grid-table.js // js版ag的二次封装
    |       |   |-- date.js // 日期处理
    |       |   |-- form.js // 仅用于处理form结构
    |       |   |-- usual.js // 已删
    |       |   |-- util.js // 字符串的相关处理方法
    |       |-- address // 地址解析工具
    |       |   |-- address-parse.js
    |       |   |-- area-list.js
    |       |-- mixins
    |       |   |-- buttonPermissions.js // 按钮权限方法（仅老组件使用）
    |       |   |-- customPaging.js // 分页方法（仅老组件使用）
    |       |   |-- dataAccess.js // 数据权限控制的方法
    |       |   |-- isFavorite.js // 收藏功能
    |       |   |-- listeningToKeydown.js // 键盘事件监听
    |       |   |-- modifycurrentLabel.js // labelName修改
    |       |-- promotion
    |       |   |-- groups.js // 促销的store数据初始化
    |       |-- public
    |           |-- publicMethods.js // 公用方法（已经整合到commonUtils,待该引用后删除）
    |-- commonPages
    |   |-- Login.vue // 登录
    |   |-- WelcomePage.vue // 欢迎
    |   |-- layout
    |       |-- NavigatorSubMenu.vue // 导航条
    |-- config
    |   |-- appLayout.js // ？？
    |   |-- customized.config.js // 本仓库暴露的Properties & API
    |   |-- config
    |   |   |-- commonUtils.js // 本仓库的工具方法集
    |   |   |-- customized.modal.config.js // 定制弹窗配置项
    |   |   |-- customized.page.config.js // 定制页面配置项
    |   |   |-- customized.panel.config.js // 定制表单配置项
    |   |   |-- customized.watermark.config.js // 水印配置集合
    |   |   |-- dialogs.config.js // 定制弹窗配置项
    |   |   |-- dropDown.config.js // 下拉型按钮集
    |   |   |-- event.config.js // 按钮事件集
    |   |   |-- externalTreeDatas.config.js // 树结构配置项
    |   |   |-- filterUrl.config.js // 接口报错过滤配置
    |   |   |-- filterUrlForNetwork.js // 接口报错过滤配置的依赖文件
    |   |   |-- funBtn.config.js // 定制页面动作定义按钮集
    |   |   |-- functionPower.actions.js // 功能权限的一些方法（待整合-wk）
    |   |   |-- globalComponent.config.js // 项目登录、欢迎页、Logo、Banner配置
    |   |   |-- importApiArr.js // 待删
    |   |   |-- importTable.config.js //【组件库】导入组件的配置项
    |   |   |-- init.config.js // 项目初始化基本配置
    |   |   |-- labelList.js // labelList集合
    |   |   |-- orderDetailConnector.js // 矩阵组件专用配置
    |   |   |-- orderLogo.js // 订单标签集合
    |   |   |-- pageNote.js // 可删
    |   |   |-- routeGuardFun.js // 路由守卫
    |   |   |-- subTable.config.js //【组件库】子表组件的配置项
    |   |   |-- validate.config.js // 表单校验
    |   |   |-- warning.modal.config.js // 提示弹窗配置
    |   |-- module
    |   |   |-- modal
    |   |   |   |-- basicData.config.js
    |   |   |   |-- commodity.config.js
    |   |   |   |-- finance.config.js
    |   |   |   |-- interface.config.js
    |   |   |   |-- inventory.config.js
    |   |   |   |-- market.config.js
    |   |   |   |-- order.config.js
    |   |   |   |-- organization.config.js
    |   |   |   |-- report.config.js
    |   |   |   |-- strategy.config.js
    |   |   |   |-- system.config.js
    |   |   |-- page
    |   |       |-- basicData.config.js
    |   |       |-- commodity.config.js
    |   |       |-- finance.config.js
    |   |       |-- inventory.config.js
    |   |       |-- order.config.js
    |   |       |-- organization.config.js
    |   |       |-- promotion.config.js
    |   |       |-- strategy.config.js
    |   |       |-- system.config.js
    |   |-- store
    |       |-- customizeGlobal.js
    |       |-- jordanStore.js
    |       |-- store.js
    |-- css
    |   |-- modal
    |   |   |-- commodityCenter
    |   |   |   |-- downLoadJingdongGoods.less
    |   |   |-- financeCenter
    |   |   |   |-- downLoadAlipayBill.less
    |   |   |   |-- downLoadVipBill.less
    |   |   |   |-- generateSalesOrder.less
    |   |   |-- interfacePlatform
    |   |   |   |-- downLoadAll.less
    |   |   |   |-- downLoadPublic.less
    |   |   |   |-- taobaoRefuseExchange.less
    |   |   |-- inventoryCenter
    |   |   |   |-- channelInventory.less
    |   |   |-- orderCenter
    |   |   |   |-- addGifts.less
    |   |   |   |-- changeProduct.less
    |   |   |   |-- changeRemark.less
    |   |   |   |-- changeWarehouse.less
    |   |   |   |-- extraReturnImport.less
    |   |   |   |-- goodsDetail.less
    |   |   |   |-- holdOrderDialog.less
    |   |   |   |-- itemDelete.less
    |   |   |   |-- jtWarehouse.less
    |   |   |   |-- makeOutInvoice.less
    |   |   |   |-- manualMarking.less
    |   |   |   |-- matrixBox.less
    |   |   |   |-- modifyLogistics.less
    |   |   |   |-- modifyLogisticsNumber.less
    |   |   |   |-- modifyWarehouse.less
    |   |   |   |-- modifyWms.less
    |   |   |   |-- pushProduce.less
    |   |   |   |-- replaceGoodsDetail.less
    |   |   |   |-- resolveAddress.less
    |   |   |   |-- setFormDrag.less
    |   |   |   |-- specifyGoodsAssign.less
    |   |   |   |-- publicDialog
    |   |   |       |-- JDialog.less
    |   |   |-- promotionCenter
    |   |   |   |-- setGroup.less
    |   |   |-- reportCenter
    |   |   |   |-- rcOrderReportExport.less
    |   |   |-- strategyPlatform
    |   |   |   |-- endTimeUpdateDialog.less
    |   |   |   |-- postponeConfirm.less
    |   |   |   |-- productStrategyShopScaleImport.less
    |   |   |   |-- scheduleFormDialog.less
    |   |   |   |-- strategyTimeDialog.less
    |   |   |   |-- syncStockStrategyImport.less
    |   |   |   |-- setWarehouseLogistics
    |   |   |       |-- modifyLogistics.less
    |   |   |-- systemConfig
    |   |       |-- copyPermission.less
    |   |-- pages
    |       |-- basicData
    |       |   |-- addLogicStore.less
    |       |   |-- authorize.less
    |       |   |-- channelStore.less
    |       |-- commodityCenter
    |       |   |-- combinedCommodity.less
    |       |   |-- modifyGroup.less
    |       |   |-- productSpecification.less
    |       |   |-- quicklyGenerate.less
    |       |   |-- spuRecord.less
    |       |   |-- supplier.less
    |       |-- financialCenter
    |       |   |-- payableAdjust
    |       |       |-- payableAdjustAdd.less
    |       |       |-- payableAdjustmentList.less
    |       |-- inventoryCenter
    |       |   |-- outboundPickOrder.less
    |       |   |-- sgChannelStorageBuffer.less
    |       |-- orderCenter
    |       |   |-- distribution
    |       |   |   |-- splitDistributionOrder.less
    |       |   |-- orderManageAdd
    |       |   |   |-- orderManageAdd.less
    |       |   |-- orderManageDetail
    |       |   |   |-- orderManageDetail.less
    |       |   |   |-- details
    |       |   |   |   |-- custOrderItem.less
    |       |   |   |   |-- essentialInfo.less
    |       |   |   |   |-- orderItem.css
    |       |   |   |   |-- orderItem.less
    |       |   |   |-- orderDetail
    |       |   |       |-- halfOrderDetail.less
    |       |   |       |-- matrix.less
    |       |   |       |-- matrixInput2.less
    |       |   |       |-- matrixPop.less
    |       |   |       |-- matrixPopScope.less
    |       |   |-- orderManager
    |       |   |   |-- orderManager.less
    |       |   |   |-- replaceTheGoods.less
    |       |   |   |-- splitOrder.less
    |       |   |-- returngood
    |       |   |   |-- refundAfterShipment.less
    |       |   |   |-- returngoodmanagement.less
    |       |   |   |-- returngoodmanagementList.less
    |       |   |   |-- rturngoodModifyRemarks.less
    |       |   |   |-- returnStoreage
    |       |   |       |-- manualMatching.less
    |       |   |       |-- returnJdNumberPop.less
    |       |   |       |-- returnNumberPop.less
    |       |   |       |-- returnStoreageList.less
    |       |   |       |-- returnTreasuryAdd.less
    |       |   |-- scanIn
    |       |       |-- outboundPickOrder.less
    |       |       |-- putStorePickOrder.less
    |       |       |-- scanIn.less
    |       |       |-- scandilog.less
    |       |-- promotionCenter
    |       |   |-- common.less
    |       |   |-- promotionlist.less
    |       |   |-- simulation.less
    |       |-- strategyPlatform
    |       |   |-- auditOrderStrategy.less
    |       |   |-- commodityPriceAddOrEdit.less
    |       |   |-- holdStrategyAddOrEdit.less
    |       |   |-- liveParsingAddOrEdit.less
    |       |   |-- logisticsDistribute.less
    |       |   |-- orderAutoCheck.less
    |       |   |-- scheduleAddOrEdit.less
    |       |   |-- sendSingleRule.less
    |       |   |-- smsStrategy.less
    |       |   |-- specialLogistics.less
    |       |   |-- storehouseRule.less
    |       |   |-- syncStockStrategyImport.less
    |       |   |-- tmExchangeAddOrEdit.less
    |       |   |-- warehouseLogisticsAddOrEdit.less
    |       |   |-- wphEmailSend.less
    |       |   |-- courierPay
    |       |   |   |-- courierPay.less
    |       |   |-- logisticsStrategy
    |       |   |   |-- logisticsArea.less
    |       |   |-- setWarehouseLogistics
    |       |       |-- setWarehouseLogistics.less
    |       |-- systemConfig
    |           |-- commodityAuthority
    |           |   |-- commodityAuthority.less
    |           |   |-- order.less
    |           |   |-- senmir.code-workspace
    |           |-- quanXian
    |           |   |-- copyModal.less
    |           |   |-- quanXian.less
    |           |   |-- quanXianTable.less
    |           |-- userPermission
    |               |-- userPermission.less
    |-- js
    |   |-- modal
    |   |   |-- commodityCenter
    |   |   |   |-- downLoadJingdongGoods.js
    |   |   |   |-- downLoadVipGoods.js
    |   |   |-- financeCenter
    |   |   |   |-- AC_F_PLATFORM_BILL.js
    |   |   |   |-- downLoadVipBill.js
    |   |   |   |-- generateSalesOrder.js
    |   |   |-- interfacePlatform
    |   |   |   |-- downLoadAll.js
    |   |   |   |-- downLoadPublic.js
    |   |   |   |-- taobaoRefuseExchange.js
    |   |   |   |-- config
    |   |   |       |-- IP_B_CANCEL_TIME_ORDER_VIP.js
    |   |   |       |-- IP_B_JINGDONG_ORDER.js
    |   |   |       |-- IP_B_JINGDONG_REFUND.js
    |   |   |       |-- IP_B_JINGDONG_SA_REFUND.js
    |   |   |       |-- IP_B_JITX_DELIVERY.js
    |   |   |       |-- IP_B_JITX_ORDER.js
    |   |   |       |-- IP_B_STANDPLAT_ORDER.js
    |   |   |       |-- IP_B_STANDPLAT_REFUND.js
    |   |   |       |-- IP_B_TAOBAO_EXCHANGE.js
    |   |   |       |-- IP_B_TAOBAO_EXCHANGE00.js
    |   |   |       |-- IP_B_TAOBAO_FX_ORDER.js
    |   |   |       |-- IP_B_TAOBAO_FX_REFUND.js
    |   |   |       |-- IP_B_TAOBAO_ORDER.js
    |   |   |       |-- IP_B_TAOBAO_REFUND.js
    |   |   |       |-- IP_B_TIME_ORDER_VIP.js
    |   |   |       |-- IP_B_VIP_RETURN_ORDER.js
    |   |   |       |-- IP_C_STANDPLAT_PRO.js
    |   |   |       |-- IP_C_TAOBAO_PRODUCT.js
    |   |   |       |-- IP_C_VIP_PRO.js
    |   |   |       |-- OC_B_VIPCOM_PO.js
    |   |   |       |-- PS_C_SKU.js
    |   |   |       |-- downLoadAll.Config.js
    |   |   |       |-- fenxiao.js
    |   |   |       |-- jingxiao.js
    |   |   |-- inventoryCenter
    |   |   |   |-- channelInventory.js
    |   |   |   |-- electronicSheetPrinting.js
    |   |   |   |-- outResultImport.js
    |   |   |   |-- queryConditionRetransmissionWms.js
    |   |   |   |-- sgTransferImport.js
    |   |   |-- orderCenter
    |   |   |   |-- addGiftItem.js
    |   |   |   |-- addGifts.js
    |   |   |   |-- addressError.js
    |   |   |   |-- changeProduct.js
    |   |   |   |-- changeRemark.js
    |   |   |   |-- changeWarehouse.js
    |   |   |   |-- createGrn.js
    |   |   |   |-- deliveryOrder.js
    |   |   |   |-- exceptionHandle.js
    |   |   |   |-- exchangeTag.js
    |   |   |   |-- extraReturnImport.js
    |   |   |   |-- goodsDetail.js
    |   |   |   |-- holdOrderDialog.js
    |   |   |   |-- itemDelete.js
    |   |   |   |-- jtWarehouse.js
    |   |   |   |-- makeOutInvoice.js
    |   |   |   |-- manualMarking.js
    |   |   |   |-- matrixBox.js
    |   |   |   |-- modifyLogistics.js
    |   |   |   |-- modifyLogisticsNumber.js
    |   |   |   |-- modifyWarehouse.js
    |   |   |   |-- modifyWms.js
    |   |   |   |-- productError.js
    |   |   |   |-- pushProduce.js
    |   |   |   |-- replaceGoodsDetail.js
    |   |   |   |-- resolveAddress.js
    |   |   |   |-- setFormDrag.js
    |   |   |   |-- specifyGoodsAssign.js
    |   |   |   |-- vipCreatePickorder.js
    |   |   |   |-- vipDistributionOccus.js
    |   |   |   |-- vipDownloadPo.js
    |   |   |   |-- publicDialog
    |   |   |   |   |-- JDialog.js
    |   |   |   |-- returngood
    |   |   |       |-- modifyReturnLogistics.js
    |   |   |       |-- modifyWarehouse.js
    |   |   |       |-- pickorderExport.js
    |   |   |       |-- refuseToPayOcBReturnAfSend.js
    |   |   |       |-- rturngoodModifyRemarks.js
    |   |   |-- promotionCenter
    |   |   |   |-- setGroup.js
    |   |   |-- reportCenter
    |   |   |   |-- rcOrderReportExport.js
    |   |   |-- strategyPlatform
    |   |       |-- delaySet.js
    |   |       |-- endTimeUpdateDialog.js
    |   |       |-- postponeConfirm.js
    |   |       |-- productStrategyShopScaleImport.js
    |   |       |-- scheduleFormDialog.js
    |   |       |-- strategyTimeDialog.js
    |   |       |-- syncStockStrategyImport.js
    |   |       |-- logisticsStrategy
    |   |       |   |-- strategyModifyLogistics.js
    |   |       |-- setWarehouseLogistics
    |   |           |-- modifyLogistics.js
    |   |-- pages
    |       |-- basicData
    |       |   |-- addAliasOrRegion.js
    |       |   |-- addLogicStore.js
    |       |   |-- authorize.js
    |       |   |-- authorizeDetails.js
    |       |   |-- channelStore.js
    |       |   |-- logisticsCompanyFilesAddOrEdit.js
    |       |   |-- nationalProvincialMunicipalEdit.js
    |       |-- commodityCenter
    |       |   |-- combinedCommodity.js
    |       |   |-- commodityClassifyAddOrEdit.js
    |       |   |-- commodityCusPropertiesAddOrEdit.js
    |       |   |-- modifyGroup.js
    |       |   |-- productSpecification.js
    |       |   |-- quicklyGenerate.js
    |       |   |-- skuAddOrEdit.js
    |       |   |-- spuRecord.js
    |       |   |-- supplier.js
    |       |-- financeCenter
    |       |   |-- payableAdjustAdd.js
    |       |   |-- payableAdjustmentList.js
    |       |-- inventoryCenter
    |       |   |-- sgChannelStorageBuffer.js
    |       |   |-- sgChannelSynstockQuery.js
    |       |   |-- sgStorageChangeFtpQuery.js
    |       |-- orderCenter
    |       |   |-- addGiftItem.js
    |       |   |-- distribution
    |       |   |   |-- splitDistributionOrder.js
    |       |   |-- orderManageAdd
    |       |   |   |-- orderManageAdd.js
    |       |   |-- orderManageDetail
    |       |   |   |-- orderManageDetail.js
    |       |   |   |-- details
    |       |   |   |   |-- custManageAdd.js
    |       |   |   |   |-- essentialInfo.js
    |       |   |   |   |-- orderItem.js
    |       |   |   |-- orderDetail
    |       |   |       |-- halfOrderDetail.js
    |       |   |       |-- matrix.js
    |       |   |       |-- matrixInput2.js
    |       |   |       |-- matrixPop.js
    |       |   |-- orderManager
    |       |   |   |-- orderManager.js
    |       |   |   |-- replaceTheGoods.js
    |       |   |   |-- splitOrder.js
    |       |   |   |-- publicConfig
    |       |   |       |-- labelList.js
    |       |   |       |-- orderLogo.js
    |       |   |-- returngood
    |       |   |   |-- commonUtils.js
    |       |   |   |-- config.js
    |       |   |   |-- refundAfterShipment.js
    |       |   |   |-- returngoodmanagement.js
    |       |   |   |-- returngoodmanagementList.js
    |       |   |   |-- constants
    |       |   |   |   |-- refundAfterShipment.js
    |       |   |   |-- returnStoreage
    |       |   |       |-- manualMatching.js
    |       |   |       |-- returnJdNumberPop.js
    |       |   |       |-- returnNumberPop.js
    |       |   |       |-- returnStoreageList.js
    |       |   |       |-- returnTreasuryAdd.js
    |       |   |-- scanIn
    |       |   |   |-- outboundPickOrder.js
    |       |   |   |-- putStorePickOrder.js
    |       |   |   |-- scanDialog.js
    |       |   |   |-- scanIn.js
    |       |   |-- vipJit
    |       |       |-- distributionOrderList.js
    |       |-- promotionCenter
    |       |   |-- addOrEditActi.js
    |       |   |-- batchActivity.js
    |       |   |-- promotion.config.js
    |       |   |-- promotion.mixin.js
    |       |   |-- promotionlist.js
    |       |   |-- simulation.js
    |       |   |-- details
    |       |       |-- basicInfo.js
    |       |       |-- batchInfoSet.js
    |       |       |-- batchTables.js
    |       |       |-- giftSet.js
    |       |       |-- infoSet.js
    |       |       |-- meetConditions.js
    |       |       |-- setCommodity.js
    |       |       |-- tabList.js
    |       |       |-- table.js
    |       |       |-- tableTabs.js
    |       |-- strategyPlatform
    |       |   |-- auditOrderStrategy.js
    |       |   |-- commodityPriceAddOrEdit.js
    |       |   |-- holdStrategyAddOrEdit.js
    |       |   |-- liveParsingAddOrEdit.js
    |       |   |-- logisticsDistribute.js
    |       |   |-- orderAutoCheck.js
    |       |   |-- scheduleAddOrEdit.js
    |       |   |-- sendSingleRule.js
    |       |   |-- smsStrategy.js
    |       |   |-- specialLogistics.js
    |       |   |-- storehouseRule.js
    |       |   |-- tmExchangeAddOrEdit.js
    |       |   |-- warehouseLogisticsAddOrEdit.js
    |       |   |-- wphEmailSend.js
    |       |   |-- courierPay
    |       |   |   |-- courierPay.js
    |       |   |-- logisticsStrategy
    |       |   |   |-- logisticsArea.js
    |       |   |-- setWarehouseLogistics
    |       |       |-- setWarehouseLogistics.js
    |       |-- systemConfig
    |           |-- commodityAuthority
    |           |   |-- commodityAuthority.js
    |           |-- quanXian
    |           |   |-- copyModal.js
    |           |   |-- quanXian.js
    |           |   |-- quanXianTable.js
    |           |   |-- qxBtnData.js
    |           |-- userPermission
    |               |-- userPermission.js
    |-- service
    |   |-- index.js
    |   |-- modules
    |       |-- accountingCenter.js
    |       |-- basicData.js
    |       |-- commodityCenter.js
    |       |-- common.js
    |       |-- financeCenter.js
    |       |-- interfacePlatform.js
    |       |-- inventoryCenter.js
    |       |-- memberCenter.js
    |       |-- orderCenter.js
    |       |-- organizationCenter.js
    |       |-- promotionCenter.js
    |       |-- reportCenter.js
    |       |-- strategyPlatform.js
    |       |-- systemConfig.js
    |       |-- userCenter.js
    |-- views
        |-- babel.config.js
        |-- modal
        |   |-- basicData
        |   |   |-- authinfodisplay.vue
        |   |-- commodityCenter
        |   |   |-- addPlatformLogisticsCompany.vue
        |   |   |-- downLoadJingdongGoods.vue
        |   |   |-- downLoadVipGoods.vue
        |   |-- financeCenter
        |   |   |-- authorize.vue
        |   |   |-- downLoadVipBill.vue
        |   |   |-- generateSalesOrder.vue
        |   |-- interfacePlatform
        |   |   |-- downLoadAll.vue
        |   |   |-- downLoadPublic.vue
        |   |   |-- taobaoRefuseExchange.vue
        |   |-- inventoryCenter
        |   |   |-- channelInventory.vue
        |   |   |-- electronicSheetPrinting.vue
        |   |   |-- outResultImport.vue
        |   |   |-- queryConditionRetransmissionWms.vue
        |   |   |-- sgTransferImport.vue
        |   |-- orderCenter
        |   |   |-- OC_B_REFUND_IN_save.vue
        |   |   |-- addFlag.vue
        |   |   |-- addGiftItem.vue
        |   |   |-- addGifts.vue
        |   |   |-- addressError.vue
        |   |   |-- afterSaleCopy.vue
        |   |   |-- changeProduct.vue
        |   |   |-- changeRemark.vue
        |   |   |-- changeWarehouse.vue
        |   |   |-- createGrn.vue
        |   |   |-- deliveryOrder.vue
        |   |   |-- exceptionHandle.vue
        |   |   |-- exchangeTag.vue
        |   |   |-- extraReturnImport.vue
        |   |   |-- force.vue
        |   |   |-- goodsDetail.vue
        |   |   |-- holdOrderDialog.vue
        |   |   |-- itemDelete.vue
        |   |   |-- jtWarehouse.vue
        |   |   |-- makeOutInvoice.vue
        |   |   |-- manual.vue
        |   |   |-- manualMarking.vue
        |   |   |-- matrixBox.vue
        |   |   |-- modifyLogistics.vue
        |   |   |-- modifyLogisticsNumber.vue
        |   |   |-- modifyReturnLogistics.vue
        |   |   |-- modifyWarehouse.vue
        |   |   |-- modifyWms.vue
        |   |   |-- productError.vue
        |   |   |-- pushProduce.vue
        |   |   |-- remitFail.vue
        |   |   |-- replaceGoodsDetail.vue
        |   |   |-- resolveAddress.vue
        |   |   |-- setFormDrag.vue
        |   |   |-- specifyGoodsAssign.vue
        |   |   |-- vipCreatePickorder.vue
        |   |   |-- vipDistributionOccus.vue
        |   |   |-- vipDownloadPo.vue
        |   |   |-- publicDialog
        |   |   |   |-- JDialog.vue
        |   |   |-- returngood
        |   |       |-- modifyWarehouse.vue
        |   |       |-- pickorderExport.vue
        |   |       |-- refuseToPayOcBReturnAfSend.vue
        |   |       |-- rturngoodModifyRemarks.vue
        |   |-- organizationCenter
        |   |   |-- users_reset_pwd.vue
        |   |-- promotionCenter
        |   |   |-- setGroup.vue
        |   |-- reportCenter
        |   |   |-- rcOrderReportExport.vue
        |   |-- strategyPlatform
        |       |-- batchModify.vue
        |       |-- delaySet.vue
        |       |-- endTimeUpdateDialog.vue
        |       |-- postponeConfirm.vue
        |       |-- productStrategyShopScaleImport.vue
        |       |-- scheduleFormDialog.vue
        |       |-- strategyTimeDialog.vue
        |       |-- syncStockStrategyImport.vue
        |       |-- tablelist_copy.vue
        |       |-- logisticsStrategy
        |       |   |-- strategyModifyLogistics.vue
        |       |-- setWarehouseLogistics
        |           |-- modifyLogistics.vue
        |-- pages
            |-- basicData
            |   |-- addAliasOrRegion.vue
            |   |-- addLogicStore.vue
            |   |-- authorize.vue
            |   |-- authorizeDetails.vue
            |   |-- channelStore.vue
            |   |-- logisticsCompanyFilesAddOrEdit.vue
            |   |-- nationalProvincialMunicipalEdit.vue
            |   |-- orderNumberNnalysis.vue
            |-- commodityCenter
            |   |-- combinedCommodity.vue
            |   |-- commodityClassifyAddOrEdit.vue
            |   |-- commodityCusPropertiesAddOrEdit.vue
            |   |-- modifyGroup.vue
            |   |-- productSpecification.vue
            |   |-- quicklyGenerate.vue
            |   |-- skuAddOrEdit.vue
            |   |-- spuRecord.vue
            |   |-- supplier.vue
            |-- financialCenter
            |   |-- payableAdjust
            |       |-- payableAdjustAdd.vue
            |       |-- payableAdjustmentList.vue
            |-- inventoryCenter
            |   |-- sgChannelStorageBuffer.vue
            |   |-- sgChannelSynstockQuery.vue
            |   |-- sgStorageChangeFtpQuery.vue
            |-- orderCenter
            |   |-- addGiftItem.vue
            |   |-- matchingDetails.vue
            |   |-- distribution
            |   |   |-- splitDistributionOrder.vue
            |   |-- extraRefund
            |   |   |-- productDetails.vue
            |   |   |-- sourceBillNo.vue
            |   |-- orderManageAdd
            |   |   |-- orderManageAdd.vue
            |   |-- orderManageDetail
            |   |   |-- orderManageDetail.vue
            |   |   |-- details
            |   |   |   |-- custOrderItem.vue
            |   |   |   |-- essentialInfo.vue
            |   |   |   |-- goodsTotalAmount.vue
            |   |   |   |-- orderItem.vue
            |   |   |-- orderDetail
            |   |       |-- halfOrderDetail.vue
            |   |       |-- matrix.vue
            |   |       |-- matrixInput2.vue
            |   |       |-- matrixPop.vue
            |   |-- orderManager
            |   |   |-- dynamicSearch.vue
            |   |   |-- formSetting.vue
            |   |   |-- orderAddOrCopy.vue
            |   |   |-- orderManager.vue
            |   |   |-- proDetail.vue
            |   |   |-- replaceTheGoods.vue
            |   |   |-- splitOrder.vue
            |   |-- pay
            |   |   |-- payDetail.vue
            |   |   |-- payDetailAdd.vue
            |   |   |-- paySearchOri.vue
            |   |-- returnOrder
            |   |   |-- orderManageDetails.vue
            |   |   |-- orderReturnchange.vue
            |   |   |-- returnChangeOrderdetails.vue
            |   |   |-- returnConfig.js
            |   |   |-- returnGoods.vue
            |   |   |-- returnOrderAdd.vue
            |   |   |-- save.vue
            |   |   |-- searchOOID.vue
            |   |-- returngood
            |   |   |-- refundAfterShipment.vue
            |   |   |-- returnAmount.vue
            |   |   |-- returnGoods.vue
            |   |   |-- returngoodmanagement.vue
            |   |   |-- returngoodmanagementList.vue
            |   |   |-- returnStoreage
            |   |       |-- manualMatching.vue
            |   |       |-- returnJdNumberPop.vue
            |   |       |-- returnNumberPop.vue
            |   |       |-- returnStoreageList.vue
            |   |       |-- returnTreasuryAdd.vue
            |   |-- scanIn
            |   |   |-- outboundPickOrder.vue
            |   |   |-- putStorePickOrder.vue
            |   |   |-- scanDialog.vue
            |   |   |-- scanIn.vue
            |   |   |-- MP3
            |   |       |-- error01.mp3
            |   |       |-- error01old.mp3
            |   |       |-- error02.mp3
            |   |       |-- error02old.mp3
            |   |       |-- fm01.mp3
            |   |       |-- fm02.mp3
            |   |       |-- fm03.mp3
            |   |       |-- fm04.mp3
            |   |-- vipJit
            |       |-- distributionOrderList.vue
            |-- promotionCenter
            |   |-- addOrEditActi.vue
            |   |-- batchActivity.vue
            |   |-- promotionlist.vue
            |   |-- simulation.vue
            |   |-- details
            |       |-- basicInfo.vue
            |       |-- basicInfoP.vue
            |       |-- batchInfoSet.vue
            |       |-- batchTables.vue
            |       |-- giftSet.vue
            |       |-- infoSet.vue
            |       |-- meetConditions.vue
            |       |-- setCommodity.vue
            |       |-- tabList.vue
            |       |-- table.vue
            |       |-- tableTabs.vue
            |-- strategyPlatform
            |   |-- auditOrderStrategy.vue
            |   |-- commodityPriceAddOrEdit.vue
            |   |-- holdStrategyAddOrEdit.vue
            |   |-- liveParsingAddOrEdit.vue
            |   |-- logisticsDistribute.vue
            |   |-- orderAutoCheck.vue
            |   |-- preformAction.vue
            |   |-- scheduleAddOrEdit.vue
            |   |-- sendSingleRule.vue
            |   |-- smsStrategy.vue
            |   |-- specialLogistics.vue
            |   |-- storehouseRule.vue
            |   |-- tmExchangeAddOrEdit.vue
            |   |-- warehouseLogisticsAddOrEdit.vue
            |   |-- wphEmailSend.vue
            |   |-- courierPay
            |   |   |-- courierPay.vue
            |   |-- logisticsStrategy
            |   |   |-- logisticsArea.vue
            |   |-- setWarehouseLogistics
            |       |-- setWarehouseLogistics.vue
            |-- systemConfig
                |-- commodityAuthority
                |   |-- commodityAuthority.vue
                |-- quanXian
                |   |-- FunctionPowerNew.vue
                |   |-- copyModal.vue
                |   |-- quanXian.vue
                |   |-- quanXianTable.vue
                |-- userPermission
                    |-- userPermission.vue

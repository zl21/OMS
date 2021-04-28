// 策略平台
import R3 from '@syman/burgeon-r3';

const { network } = R3;
export default {
  // 店铺策略 -树展示
  strategyTree: params => $network.post('/p/cs/st/v1/strategy/tree', params),

  // 直播解析策略 - 修改结束时间
  liveCastStrategyUpdateEndTime: params => $network.post('/p/cs/st/liveCastStrategy/v1/updateEndTime', params),
  // 订单HOLD单策略 - 调整策略时间
  holdOrderUpdateStrategyEndTime: params => $network.post('/p/cs/st/holdOrderUpdateStrategyEndTime', params),
  /**
   * 物流区域设置 新增
   * */
  // 保存修改
  expressAreaSaveCmd: params => $network.post('/p/cs/expressAreaSaveCmd', params),
  // 作废
  expressAreaVoidCmd: params => $network.post('/p/cs/expressAreaVoidCmd', params),
  // 获取树
  getExpressAreaTree: params => $network.post('/p/cs/getExpressAreaTree', params),
  // 省市区检索
  getExpressAreaItemLikeTable: params => $network.post('/p/cs/getExpressAreaItemLikeTable', params),
  // 明细
  getExpressAreaItemTable: params => $network.post('/p/cs/getExpressAreaItemTable', params),
  // 导出
  exportExpressAreaItem: params => $network.post('/p/cs/exportExpressAreaItem', params),
  /**
   * 仓库物流规则 新增
   * */
  saveWarehouseLogistics: params => $network.post('/p/cs/saveWarehouseLogistics', params),
  // 检索
  getLogisticsLikeRankResultTable: params => $network.post('/p/cs/getLogisticsLikeRankResultTable', params),
  // 作废
  voidWarehouseLogistics: params => $network.post('/p/cs/voidWarehouseLogistics', params),
  // 导出
  exportWarehouseLogisticsRank: params => $network.post('/p/cs/exportWarehouseLogisticsRank', params),

  /**
   * 快递赔付方案
   */

  // 保存
  saveCompensate: params => $network.post('/p/cs/saveCompensate', params),
  // 删除明细
  delCompenstate: params => $network.post('/p/cs/delCompenstate', params),
  // 查询方法
  selectCompenstateLogistic: params => $network.post('/p/cs/selectCompenstateLogistic', params),
  getAutoCheck: params => $network.post('/p/cs/st/v1/getAutoCheck', params),
  addAutoCheck: params => $network.post('/p/cs/st/v1/addAutoCheck', params),
  queryLogisticsCompany: () => $network.get('/p/cs/cpext/v1/queryLogisticsList'),
  saveSendRule: params => $network.post('/p/cs/saveSendRule', params),
  getSendRuleMain: params => $network.post('/p/cs/getSendRuleMain', params),
  getWarehouseRateResultTable: params => $network.post('/p/cs/getWarehouseRateResultTable', params),
  getLikeRankResultTable: params => $network.post('/p/cs/getLikeRankResultTable', params),
  voidSendRule: params => $network.post('/p/cs/voidSendRule', params),
  exportSendRuleWarehouseRate: params => $network.post('p/cs/exportSendRuleWarehouseRate', params),
  delSendRule: params => $network.post('/p/cs/delSendRule', params),
  exportSendRuleWarehouseRank: params => $network.post('/p/cs/exportSendRuleWarehouseRank', params),
  // 延期
  delayButtonFunction: params => $network.post('/p/cs/delayButtonFunction', params),
  delayEndTime: params => $network.post('/p/cs/st/v1/delayEndTime', params),
  // 发货单派单规则 - 详情 - 修改仓库
  getSendRuleWarehouseInfo: params => $network.post('/p/cs/getSendRuleWarehouseInfo', params),
  getSendRuleTree: params => $network.post('/p/cs/getSendRuleTree', params), // 发货单派单规则获取树
  getSendRuleVipWarehouseTree: params => $network.post('/p/cs/getSendRuleVipWarehouseTree', params), // 发货单派单规则获取树
  getWarehouseRankResultTable: params => $network.post('/p/cs/getWarehouseRankResultTable', params), // 发货单派单规则获取表格
  getVipWarehouseRankResultTable: params => $network.post('/p/cs/getVipWarehouseRankResultTable', params), // 发货单派单规则获取表格

  selectVipcomMailSetColumn: params => $network.post('/p/cs/selectVipcomMailSetColumn', params),
  saveVipcomMail: params => $network.post('/p/cs/saveVipcomMail', params),
  querySmsContent: params => $network.post('/p/cs/st/v1/querySmsContent', params),
  saveSmsContent: params => $network.post('/p/cs/st/v1/saveSmsContent', params),
  vipItemGet: params => $network.post('/p/cs/vip/item/get', params),

  /* 2.0: */
  queryAddressPages: params => $network.post('/p/cs/st/v1/specialAssignLogistics/queryAddressPages', params), // 特殊物流策略-查询地址分页
  specialAssignLogisticsqueryById: params => $network.post('/p/cs/st/v1/specialAssignLogistics/queryById', params), // 特殊物流策略-保存
  queryProPages: params => $network.post('/p/cs/st/v1/specialAssignLogistics/queryProPages', params), // 物流策略-物流规则-启用停用
  queryLogisticsWarehousePages: params => $network.post('/p/cs/st/v1/specialAssignLogistics/queryLogisticsWarehousePages', params),

  specialAssignLogisticssave: params => $network.post('/p/cs/st/v1/specialAssignLogistics/save', params), // 特殊物流策略-保存
  tableDetailswitchById: params => $network.post('/p/cs/st/v1/tableDetail/switchById', params), // 物流策略-物流规则-启用停用
  deliveryAreaSave: params => $network.post('/p/cs/st/v1/deliveryArea/save', params), // 物流策略-物流派送范围-详情新增保存
  deliveryQueryById: params => $network.post('/p/cs/st/v1/deliveryArea/queryById', params), // 物流策略-物流派送范围-详情查询
  deliveryDeleteItems: params => $network.post('/p/cs/st/v1/deliveryArea/deleteItems', params), // 物流策略-物流派送范围-删除明细
  assignLogisticsqueryById: params => $network.post('/p/cs/st/v1/assignLogistics/queryById', params), // 分物流-查询主表
  assignLogisticsqueryDetailById: params => $network.post('/p/cs/st/v1/assignLogistics/queryDetailById', params), // 分物流-查询明细表
  assignLogisticssave: params => $network.post('/p/cs/st/v1/assignLogistics/save', params), // 分物流-保存
  assignLogisticsexportDetail: params => $network.post(`/p/cs/st/v1/assignLogistics/exportDetail?ID=${params}`), // 分物流-保存
  ST_C_ASSIGN_LOGISTICSselectTree: params => $network.post('/p/cs/st/v1/ST_C_ASSIGN_LOGISTICS/selectTree', params), // 分物流-保存

  getWarehouseRegionInfo: params => $network.get('/p/cs/st/v1/orderWarehouse/getWarehouseRegionInfo', params), // 分仓策略-区域矩阵查询
  orderwarehouse: params => $network.post('/p/cs/st/v1/orderWarehouse/saveOrUpdate', params), // 档期日程规划-查询
  oWexportData: params => $network.post(`/p/cs/st/v1/orderWarehouse/exportData?id=${params}`), // 分仓策略-导出数据、导出模版
  getWarehouseInfo: params => $network.get('/p/cs/st/v1/orderWarehouse/getWarehouseInfo', params), // 分仓策略-详情查询
  orderWarehouseSetIsActive: params => $network.post(`/p/cs/st/v1/orderWarehouse/setIsActive?id=${params.id}&isActive=${params.isActive}`), // 分仓策略-启用停用 详情页单对象

  querySchedule: params => $network.post('/vip/v1/ListStCVipcomProjectAndItems', params), // 档期日程规划-查询
  wphScheduleSave: params => $network.post('/vip/v1/saveOrUpdateStCVipcomProject', params), // 档期日程规划-主表保存
  pickSave: params => $network.post('/vip/v1/saveOrUpdateStCVipcomProjectPickItem', params), // 拣货单-保存
  pickDelete: params => $network.post('/vip/v1/deleteStCVipcomProjectPickItem', params), // 拣货单-删除
  warehouseInSave: params => $network.post('/vip/v1/saveOrUpdateStCVipcomProjectStockInItem', params), // 入库单-保存
  warehouseInDelete: params => $network.post('/vip/v1/deleteStCVipcomProjectStockInItem', params), // 入库单-删除
  carrierDropList: params => $network.post('/vip/v1/carrierDropList', params), // 承运商
  getScheduleTree: params => $network.post('/vip/v1/AllStCVipcomProject', params), // 档期日程规划-tree

  saveLogisticsCorp: params => $network.post('/p/cs/st/v1/expressAllocation/save', params), // 仓库物流设置-保存
  queryLogistics: params => $network.post('/p/cs/st/v1/expressAllocation/queryById', params), // 仓库物流设置-查询
  deleteLogisticsCorp: params => $network.post('/p/cs/st/v1/expressAllocation/deleteItems', params), // 仓库物流设置-删除明细
  switchLogisticsCorp: params => $network.post('/p/cs/st/v1/tableDetail/switchById', params), // 仓库物流设置-启用停用
  getLogisticsTree: params => $network.post('/p/cs/st/v1/ST_C_EXPRESS_ALLOCATION/selectTree', params), // 仓库物流设置-tree
  checkPhyWarehouse: params => $network.post('/p/cs/st/v1/expressAllocation/checkPhyWarehouse', params), // 仓库物流设置-仓库查询

  savePrice: params => $network.post('/p/cs/st/v1/price/saveOrUpdate', params), // 商品价格策略-保存
  queryPrice: params => $network.get(`/p/cs/st/v1/price/getPriceInfo?${qs.stringify(params)}`), // 商品价格策略-主表-查询
  queryPriceItem: params => $network.get(`/p/cs/st/v1/price/getPriceItemInfo?${qs.stringify(params)}`), // 商品价格策略-子表-查询
  priceSetIsActive: params => $network.post('/p/cs/st/v1/price/setIsActive', params), // 商品价格策略-启用停用
  deletePrice: params => $network.post('/p/cs/st/v1/price/deletePriceItem', params), // 商品价格策略-删除
  exportPrice: params => $network.post('/p/cs/st/v1/price/exportData', params), // 商品价格策略-导出
  getPriceTree: params => $network.post('/p/cs/st/v1/ST_C_EXPRESS_ALLOCATION/selectTree', params), // 商品价格策略-tree
  saveOrUpdate: params => $network.post('/p/cs/st/v1/autoAudit/saveOrUpdate', params), // 审单策略保存
  getAutoAuditInfo: params => $network.get(`/p/cs/st/v1/autoAudit/getAutoAuditInfo?id=${params}`), // 审单策略查询
  strategy: params => $network.post('/p/cs/st/v1/strategy/tree', params), // 审单策略组织树查询
};

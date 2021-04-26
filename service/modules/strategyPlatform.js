// 策略平台
import R3 from '@syman/burgeon-r3';

const { network } = R3;
export default {
  // 店铺策略 -树展示
  strategyTree: params => network.post('/p/cs/st/v1/strategy/tree', params),

  // 直播解析策略 - 修改结束时间
  liveCastStrategyUpdateEndTime: params => network.post('/p/cs/st/liveCastStrategy/v1/updateEndTime', params),
  // 订单HOLD单策略 - 调整策略时间
  holdOrderUpdateStrategyEndTime: params => network.post('/p/cs/st/holdOrderUpdateStrategyEndTime', params),
  /**
   * 物流区域设置 新增
   * */
  // 保存修改
  expressAreaSaveCmd: params => network.post('/p/cs/expressAreaSaveCmd', params),
  // 作废
  expressAreaVoidCmd: params => network.post('/p/cs/expressAreaVoidCmd', params),
  // 获取树
  getExpressAreaTree: params => network.post('/p/cs/getExpressAreaTree', params),
  // 省市区检索
  getExpressAreaItemLikeTable: params => network.post('/p/cs/getExpressAreaItemLikeTable', params),
  // 明细
  getExpressAreaItemTable: params => network.post('/p/cs/getExpressAreaItemTable', params),
  // 导出
  exportExpressAreaItem: params => network.post('/p/cs/exportExpressAreaItem', params),
  /**
   * 仓库物流规则 新增
   * */
  saveWarehouseLogistics: params => network.post('/p/cs/saveWarehouseLogistics', params),
  // 检索
  getLogisticsLikeRankResultTable: params => network.post('/p/cs/getLogisticsLikeRankResultTable', params),
  // 作废
  voidWarehouseLogistics: params => network.post('/p/cs/voidWarehouseLogistics', params),
  // 导出
  exportWarehouseLogisticsRank: params => network.post('/p/cs/exportWarehouseLogisticsRank', params),

  /**
   * 快递赔付方案
   */

  // 保存
  saveCompensate: params => network.post('/p/cs/saveCompensate', params),
  // 删除明细
  delCompenstate: params => network.post('/p/cs/delCompenstate', params),
  // 查询方法
  selectCompenstateLogistic: params => network.post('/p/cs/selectCompenstateLogistic', params),
  getAutoCheck: params => network.post('/p/cs/st/v1/getAutoCheck', params),
  addAutoCheck: params => network.post('/p/cs/st/v1/addAutoCheck', params),
  queryLogisticsCompany: () => network.get('/p/cs/cpext/v1/queryLogisticsList'),
  saveSendRule: params => network.post('/p/cs/saveSendRule', params),
  getSendRuleMain: params => network.post('/p/cs/getSendRuleMain', params),
  getWarehouseRateResultTable: params => network.post('/p/cs/getWarehouseRateResultTable', params),
  getLikeRankResultTable: params => network.post('/p/cs/getLikeRankResultTable', params),
  voidSendRule: params => network.post('/p/cs/voidSendRule', params),
  exportSendRuleWarehouseRate: params => network.post('p/cs/exportSendRuleWarehouseRate', params),
  delSendRule: params => network.post('/p/cs/delSendRule', params),
  exportSendRuleWarehouseRank: params => network.post('/p/cs/exportSendRuleWarehouseRank', params),
  // 延期
  delayButtonFunction: params => network.post('/p/cs/delayButtonFunction', params),
  delayEndTime: params => network.post('/p/cs/st/v1/delayEndTime', params),
  // 发货单派单规则 - 详情 - 修改仓库
  getSendRuleWarehouseInfo: params => network.post('/p/cs/getSendRuleWarehouseInfo', params),
  getSendRuleTree: params => network.post('/p/cs/getSendRuleTree', params), // 发货单派单规则获取树
  getSendRuleVipWarehouseTree: params => network.post('/p/cs/getSendRuleVipWarehouseTree', params), // 发货单派单规则获取树
  getWarehouseRankResultTable: params => network.post('/p/cs/getWarehouseRankResultTable', params), // 发货单派单规则获取表格
  getVipWarehouseRankResultTable: params => network.post('/p/cs/getVipWarehouseRankResultTable', params), // 发货单派单规则获取表格

  selectVipcomMailSetColumn: params => network.post('/p/cs/selectVipcomMailSetColumn', params),
  saveVipcomMail: params => network.post('/p/cs/saveVipcomMail', params),
  querySmsContent: params => network.post('/p/cs/st/v1/querySmsContent', params),
  saveSmsContent: params => network.post('/p/cs/st/v1/saveSmsContent', params),
  vipItemGet: params => network.post('/p/cs/vip/item/get', params),

  /* 2.0: */
  querySchedule: params => network.post('/p/cs/vip/ListStCVipcomProjectAndItems', params), // 档期日程规划-查询
  wphScheduleSave: params => network.post('/p/cs/vip/saveOrUpdateStCVipcomProject', params), // 档期日程规划-主表保存
  pickSave: params => network.post('/p/cs/vip/saveOrUpdateStCVipcomProjectPickItem', params), // 拣货单-保存
  pickDelete: params => network.post('/p/cs/vip/deleteStCVipcomProjectPickItem', params), // 拣货单-删除
  warehouseInSave: params => network.post('/p/cs/vip/saveOrUpdateStCVipcomProjectStockInItem', params), // 入库单-保存
  warehouseInDelete: params => network.post('/p/cs/vip/deleteStCVipcomProjectStockInItem', params), // 入库单-删除

};

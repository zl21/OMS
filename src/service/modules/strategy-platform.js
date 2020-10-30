// 策略平台
import R3 from '@syman/burgeon-r3';
const {network} = R3;
export default {
  /**
   * 物流区域设置 新增
   **/ 
  // 保存修改
  expressAreaSaveCmd: (params) => network.post('/p/cs/expressAreaSaveCmd', params),
  // 作废
  expressAreaVoidCmd: (params) => network.post('/p/cs/expressAreaVoidCmd', params),
  // 获取树
  getExpressAreaTree: (params) => network.post('/p/cs/getExpressAreaTree', params),
  // 省市区检索
  getExpressAreaItemLikeTable: (params) => network.post('/p/cs/getExpressAreaItemLikeTable', params),
  // 明细 
  getExpressAreaItemTable: (params) => network.post('/p/cs/getExpressAreaItemTable', params),
  // 导出
  exportExpressAreaItem: (params) => network.post('/p/cs/exportExpressAreaItem', params),
  /**
   * 仓库物流规则 新增
   **/ 
  saveWarehouseLogistics: (params) => network.post('/p/cs/saveWarehouseLogistics', params),
  // 获取treeData
  getWarehouseLogisticsTree:() => network.post('p/cs/getWarehouseLogisticsTree',params),
  // 省同步查询 /p/cs/getLogisticsRankResultTable
  getLogisticsRankResultTable: () => network.post('p/cs/getLogisticsRankResultTable',params),
  // 检索
  getLogisticsLikeRankResultTable: () => network.post('getLogisticsLikeRankResultTable',parmas),
  // 作废 
  voidWarehouseLogistics: () => network.post('/p/cs/voidWarehouseLogistics',params),
  // 导出
  exportWarehouseLogisticsRank: () => network.post('/p/cs/exportWarehouseLogisticsRank',params),

  /**
   * 快递赔付方案
   */

  // 保存
  saveCompensate: () => network.post('/p/cs/saveCompensate',params),
  // 删除明细 /p/cs/delCompenstate
  delCompenstate: () => network.post('/p/cs/delCompenstate',params),
  // 查询方法
  selectCompenstateLogistic:() => network.post('/p/cs/selectCompenstateLogistic',params),


}

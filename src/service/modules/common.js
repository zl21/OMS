// 公共的接口
import R3 from '@syman/burgeon-r3';

const {network} = R3;

export default {
  hello: (params) => network.post('/p/cs/hello', params),
  getObject: (params) => network.post('/p/cs/getObject', params),
  ignoreMsg: (params) => network.post('/p/cs/ignoreMsg', params),
  queryPhyWareHouseList: (params) => network.post('/p/cs/queryPhyWareHouseList', params),
  selectLimitGroups: (params) => network.post('/p/cs/selectLimitGroups', params),
  objectTableItem: (params) => network.post('/p/cs/objectTableItem', params),
  saveWarehouseLogistics: (params) => network.post('/p/cs/saveWarehouseLogistics', params),
  getWarehouseLogisticsTree: (params) => network.post('/p/cs/getWarehouseLogisticsTree', params),
  getLogisticsRankResultTable: (params) => network.post('/p/cs/getLogisticsRankResultTable', params),
  getLogisticsLikeRankResultTable: (params) => network.post('/p/cs/getLogisticsLikeRankResultTable', params),
  voidWarehouseLogistics: (params) => network.post('/p/cs/voidWarehouseLogistics', params),
  exportWarehouseLogisticsRank: (params) => network.post('/p/cs/exportWarehouseLogisticsRank', params),
  getPromField: (params) => network.post('/p/cs/getPromField', params),
  getWarehouseLogisticsInfo: (params) => network.post('/p/cs/getWarehouseLogisticsInfo', params),
  delWarehouseLogistics: (params) => network.post('/p/cs/delWarehouseLogistics', params),
  saveCompensate: (params) => network.post('/p/cs/saveCompensate', params),
  delCompenstate: (params) => network.post('/p/cs/delCompenstate', params),
  selectCompenstateLogistic: (params) => network.post('/p/cs/selectCompenstateLogistic', params),
  expressAreaSaveCmd: (params) => network.post('/p/cs/expressAreaSaveCmd', params),
  getExpressAreaTree: (params) => network.post('/p/cs/getExpressAreaTree', params),
  getExpressAreaItemLikeTable: (params) => network.post('/p/cs/getExpressAreaItemLikeTable', params),
  getExpressAreaItemTable: (params) => network.post('/p/cs/getExpressAreaItemTable', params),
  exportExpressAreaItem: (params) => network.post('/p/cs/exportExpressAreaItem', params),
  skuQuery: (params) => network.post('/p/cs/skuQuery', params),
  fetchActionsInCustomizePage: (params) => network.get('/p/cs/v2/fetchActionsInCustomizePage', params),
  manualJdMatchingCheck: (params) => network.post('/p/cs/manualJdMatchingCheck', params),
  jdReturnStorageSave: (params) => network.get('/p/cs/jdReturnStorageSave', params),
  manualJdMatchingList: (params) => network.post('/p/cs/manualJdMatchingList', params),
}


























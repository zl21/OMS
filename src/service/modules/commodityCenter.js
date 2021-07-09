// 商品中心
import R3 from '../../../static/r3.publish/r3.min.js';

const { network } = R3;

export default {
  skuGroupSave: params => network.post('/p/cs/product/skuGroupSave', params), // 新增页保存
  skuGroupDelDetail: params => network.post('/p/cs/product/skuGroupDelDetail', params), // 条码明细删除
  skuGroupSubmit: params => network.post('/p/cs/product/skuGroupSubmit', params), // 提交
  skuGroupVoid: params => network.post('/p/cs/product/skuGroupVoid', params), // 作废
  skuPage: params => network.post('/p/cs/product/skuPage', params), // 触发分页
  skuGroupDetailSearch: params => network.post('/p/cs/product/skuGroupDetailSearch', params), // 分页请求数据
  skuGroupEditorSearch: params => network.post('/p/cs/product/skuGroupEditorSearch', params), // 初始化数据
};

// 商品中心
import R3 from '@syman/burgeon-r3';

const { network } = R3;

export default {
  skuGroupSave: params => network.post('/p/cs/product/skuGroupSave', params), // 新增页保存
  skuGroupDelDetail: params => network.post('/p/cs/product/skuGroupDelDetail', params), // 条码明细删除
  skuGroupSubmit: params => network.post('/p/cs/product/skuGroupSubmit', params), // 提交
  skuGroupVoid: params => network.post('/p/cs/product/skuGroupVoid', params), // 作废
  skuPage: params => network.post('/p/cs/product/skuPage', params), // 触发分页
  skuGroupDetailSearch: params => network.post('/p/cs/product/skuGroupDetailSearch', params), // 分页请求数据
  skuGroupEditorSearch: params => network.post('/p/cs/product/skuGroupEditorSearch', params), // 初始化数据
  alibabaProductUpdate: params => network.post('/p/cs/alibabaProductUpdate', params), // 猫超商家仓修改
};

// 商品中心
import R3 from '@syman/burgeon-r3';

const { network } = R3;

export default {
  skuGroupSave: params => network.post('/p/cs/product/skuGroupSave', params),
  skuGroupDelDetail: params => network.post('/p/cs/product/skuGroupDelDetail', params),
  skuGroupSubmit: params => network.post('/p/cs/product/skuGroupSubmit', params),
  skuGroupVoid: params => network.post('/p/cs/product/skuGroupVoid', params),
  skuPage: params => network.post('/p/cs/product/skuPage', params),
  skuGroupDetailSearch: params => network.post('/p/cs/product/skuGroupDetailSearch', params),
  skuGroupEditorSearch: params => network.post('/p/cs/product/skuGroupEditorSearch', params),
};

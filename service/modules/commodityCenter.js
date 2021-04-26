// 商品中心
import R3 from '@syman/burgeon-r3';
import commonUtils from 'burgeonConfig/config/commonUtils';
const { network } = R3;
const centerStr='commodityCenter';
export default {
  skuGroupSave: params => network.post(commonUtils.splicingGateWay(centerStr,'/p/cs/product/skuGroupSave'), params), // 新增页保存
  skuGroupDelDetail: params => network.post(commonUtils.splicingGateWay(centerStr,'/p/cs/product/skuGroupDelDetail'), params), // 条码明细删除
  skuGroupSubmit: params => network.post(commonUtils.splicingGateWay(centerStr,'/p/cs/product/skuGroupSubmit'), params), // 提交
  skuGroupVoid: params => network.post(commonUtils.splicingGateWay(centerStr,'/p/cs/product/skuGroupVoid'), params), // 作废
  skuPage: params => network.post(commonUtils.splicingGateWay(centerStr,'/p/cs/product/skuPage'), params), // 触发分页
  skuGroupDetailSearch: params => network.post(commonUtils.splicingGateWay(centerStr,'/p/cs/product/skuGroupDetailSearch'), params), // 分页请求数据
  skuGroupEditorSearch: params => network.post(commonUtils.splicingGateWay(centerStr,'/p/cs/product/skuGroupEditorSearch'), params), // 初始化数据
  /* 2.0: */
  operateSku: params => network.post(commonUtils.splicingGateWay(centerStr,'/p/cs/ps/sku/v1/operateSku'), params), // 商品SKU-保存
  querySpu: params => network.post(commonUtils.splicingGateWay(centerStr,'/p/cs/ps/pro/v1/querySpu'), params), // 查询spu档案
  queryAttributeSku: params => network.post(commonUtils.splicingGateWay(centerStr,'/p/cs/ps/sku/v1/queryAttributeSku'), params), // 查询spu/sku自定义属性
  listSku: params => network.post(commonUtils.splicingGateWay(centerStr,'/p/cs/ps/pro/v1/list/sku'), params),
  listSpu: params => network.post(commonUtils.splicingGateWay(centerStr,'/p/cs/ps/pro/v1/list/sup'), params),
  spuSave: params => network.post(commonUtils.splicingGateWay(centerStr,'/p/cs/ps/pro/v1/save'), params), // spu档案保存
  querySku: params => network.post(commonUtils.splicingGateWay(centerStr,'/p/cs/ps/pro/group/v1/skuGroupLikeSelect'), params), // SKU编码查询
  skuGroupSave: params => network.post(commonUtils.splicingGateWay(centerStr,'/p/cs/ps/pro/group/v1/skuGroupSave'), params), // 组合商品保存接口
  selectGroupById: params => network.post(commonUtils.splicingGateWay(centerStr,'/p/cs/ps/pro/group/v1/selectGroupById'), params), // 组合商品查询
  skuGroupDelItem: params => network.post(commonUtils.splicingGateWay(centerStr,'/p/cs/ps/pro/group/v1/skuGroupDelItem'), params), // 组合商品明细删除
  cusAttrSave: params => network.post(commonUtils.splicingGateWay(centerStr,'/p/cs/ps/attribute/v1/save'), params), // 商品自定义属性-保存
  queryClassifyInit: params => network.post(commonUtils.splicingGateWay(centerStr,'/p/cs/ps/pro/classify/v1/queryClassify'), params), // 商品分类-初始化查询
  saveClassify: params => network.post(commonUtils.splicingGateWay(centerStr,'/p/cs/ps/pro/classify/v1/saveClassify'), params), // 商品分类-保存
  queryClassifyItem: params => network.post(commonUtils.splicingGateWay(centerStr,'/p/cs/ps/pro/classify/v1/queryClassifyItem'), params), // 商品分类-子表-添加
  delClassifyItem: params => network.post(commonUtils.splicingGateWay(centerStr,'/p/cs/ps/pro/classify/v1/delClassifyItem'), params), // 商品分类-子表-删除
  treeLoad: params => network.post(commonUtils.splicingGateWay(centerStr,'/p/cs/ps/spec/v1/load'), params), // spu快速生成查询树
  quickAdd: (params) => network.post(commonUtils.splicingGateWay(centerStr,'/p/cs/ps/sku/v1/quick/add'), params), // 快速生成接口
  skuSelSpecobj: (params) => network.post(commonUtils.splicingGateWay(centerStr,'/p/cs/ps/sku/v1/selSpecobj'), params), // 商品sku-新增/详情-规格维度一、二等下拉查询及模糊查询

  queryClassifyTree: params => network.post('/p/cs/ps/pro/classify/v1/queryClassifyTree', params), // 商品分类-列表-树结构
};
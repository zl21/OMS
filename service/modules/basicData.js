// 基础数据
import R3 from '@syman/burgeon-r3';
import commonUtils from 'burgeonConfig/config/commonUtils';
const { network } = R3;
const centerStr='basicData';
export default {

  /* 2.0: */
  logicStoreSave: params => network.post(commonUtils.splicingGateWay(centerStr,'/p/cs/cp/v1/store/save'), params), // 新增逻辑仓保存接口
  channelQueryDetail: params=> network.post(commonUtils.splicingGateWay(centerStr,'/p/cs/cp/v1/channelWarehouse/queryDetail'), params), // 查询渠道仓
  queryById: params => network.post(commonUtils.splicingGateWay(centerStr,'/p/cs/cp/v1/store/queryById'), params), // 根据逻辑仓查询实体仓
  channelSave: params => network.post(commonUtils.splicingGateWay(centerStr,'/p/cs/cp/v1/channelWarehouse/save'), params), // 渠道仓保存
  channelDelete: params => network.post(commonUtils.splicingGateWay(centerStr,'/p/cs/cp/v1/channelWarehouse/deleteItems'), params), // 渠道仓明细删除
  platformQueryItems: params => network.post(commonUtils.splicingGateWay(centerStr,'/p/cs/cp/v1/logistics/queryItems'), params), // 物流公司档案-新增/详情-添加-搜索
  platformSave: params => network.post(commonUtils.splicingGateWay(centerStr,'/p/cs/cp/v1/logistics/save'), params), // 物流公司档案-新增/详情-保存
  platformDeleteItems: params => network.post(commonUtils.splicingGateWay(centerStr,'/p/cs/cp/v1/logistics/deleteItems'), params), // 物流公司档案-新增/详情-删除
  getById: params=>network.post(commonUtils.splicingGateWay(centerStr,'/p/cs/cp/v1/phyWarehouse/getById'), params), // 根据实体仓id查询实体仓信息
  saveAlias: params=>network.post(commonUtils.splicingGateWay(centerStr,'/p/cs/cp/v1/region/v1/savealias'), params), // 国家省市区-新增别名-保存
  saveRegion: params=>network.post(commonUtils.splicingGateWay(centerStr,'/p/cs/cp/v1/region/v1/saveregion'), params), // 国家省市区-新增别名-保存
  selectregion: params=>network.post(commonUtils.splicingGateWay(centerStr,'/p/cs/cp/v1/region/v1/selectregion'), params), // 国家省市区-详情-初始化
  basicLogos: params => network.get(commonUtils.splicingGateWay(centerStr,'/p/cs/cp/v1/shop/getPlantList'), params), // 查询平台信息列表
  shopSave:params => network.post(commonUtils.splicingGateWay(centerStr,'/p/cs/cp/v1/shop/save'),params), //保存平台店铺档案
  isaothorSucceed:params => network.post(commonUtils.splicingGateWay(centerStr,'/p/cs/cp/v1/shop/queryAuthorizationInfo'),params),  //查询云枢纽授权结果
  isauthorize: params => network.post(commonUtils.splicingGateWay(centerStr,'/p/cs/cp/v1/shop/authorizationUrl'), params), // 获取授权url


  selectTree: params => network.post('/p/cs/cp/v1/region/v1/selectTree', params), // 国家省市区-列表-树结构
  
};
// 营销中心(促销中心)
import qs from 'qs';
import R3 from '@syman/burgeon-r3';
window.$network = R3.network;

export default {
  /**
   * 营销列表页面
   */
  // 查询列表
  selectPmList: params => $network.post('/p/cs/pm/v1/selectPmList', params),
  // 查看日志
  cpromLogQuery: params => $network.post('/p/cs/cpromLogQuery', params),
  // 获取button数组
  // 发布
  updatePmStatus: params => $network.post('/p/cs/pm/v1/updatePmStatus', params),
  // 删除
  deletePm: params => $network.post('/p/cs/pm/v1/deletePm', params),
  // 设置分组
  selectPmGroup: params => $network.post('/p/cs/pm/v1/selectPmGroup', params),
  // 确定设置分组
  updatePmGroup: params => $network.post('/p/cs/pm/v1/updatePmGroup', params),
  // 请求时间
  getweekdate: params => $network.post('/p/cs/getweekdate', params),
  // 查询当前行的信息
  selectPm: params => $network.post('/p/cs/pm/v1/selectPm', params),
  /**
   * 促销编辑页面
   */
  // 保存
  savePm: params => $network.post('/p/cs/pm/v1/savePm', params),
  /**
   * 批量新增 获取sku编码
   */
  selectProInfoLike: params => $network.post('/p/cs/pm/v1/selectProInfoLike', params),

  /**
   * 草稿保存
   */
  saveBatchPm: params => $network.post('/p/cs/pm/v1/saveBatchPm', params),
  /**
   * 仿真试算
   */
  // 根据id获取表格其他数据
  selectProInfo: params => $network.post('/p/cs/pm/v1/selectProInfo', params),
  // 仿真试算：
  testPm: params => $network.post('/p/cs/pm/v1/testPm', params),

  selectInit: params => $network.get(`/p/cs/pm/v1/selectInit?${qs.stringify(params)}`,{ serviceId: "r3-pm" }),
  getPromField: (params) => $network.get("/p/cs/getPromField", params, { serviceId: "r3-pm" }),
  setMultiQuery: (params) => $network.get("/p/cs/setMultiQuery", params),
  screen: (params) => $network.get("/p/cs/screen", params),
};

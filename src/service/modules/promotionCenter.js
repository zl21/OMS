// 营销中心(促销中心)
import R3 from '@syman/burgeon-r3';

const { network } = R3;
export default {
  /**
   * 营销列表页面
   */
  // 查询列表 
  selectPmList: params => network.post('/p/cs/pm/v1/selectPmList', params),
  // 查看日志
  cpromLogQuery: params => network.post('/p/cs/cpromLogQuery', params),
  // 获取button数组
  fetchActionsInCustomizePage: params => network.get('/p/cs/fetchActionsInCustomizePage', { params }),
  // 发布
  updatePmStatus: params => network.post('/p/cs/pm/v1/updatePmStatus', params),
  // 删除
  deletePm: params => network.post('/p/cs/pm/v1/deletePm', params),
  // 设置分组
  selectPmGroup: params => network.post('/p/cs/pm/v1/selectPmGroup', params),
  // 请求时间
  getweekdate: params => network.post('/p/cs/getweekdate', params),
  // 查询当前行的信息
  selectPm: params => network.post('/p/cs/pm/v1/selectPm', params),
  /**
   * 促销编辑页面
   */
  // 保存 
  savePm: params => network.post('/p/cs/pm/v1/savePm', params),
  /**
   * 草稿保存
   */
  saveBatchPm: params => network.post('/p/cs/pm/v1/saveBatchPm', params),
  /**
   * 仿真试算
   */
  // 根据id获取表格其他数据 
  selectProInfo: params => network.post('/p/cs/pm/v1/selectProInfo', params),
  // 仿真试算：
  testPm: params => network.post('/p/cs/pm/v1/testPm', params)
};

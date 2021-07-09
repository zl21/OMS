/* 树结构界面配置 */

import R3 from '../../static/r3.publish/r3.min.js';
import service from '@/service/index';

const {
  network,
  urlSearchParams
} = R3;
Vue.prototype.$network = network;
Vue.prototype.$urlSearchParams = urlSearchParams;

const paramObj = {
  // 供应商档案
  CP_C_SUPPLIER: 'cpcsupplier',
  // 内部组织
  CP_C_INORG: 'inorg',
  // 伙伴组织
  CP_C_OUTORG: 'outorg',
  // 员工档案
  CP_C_EMP: 'emp',
  // 用户档案
  CP_C_HRUSERS: 'users',
  // 角色
  CP_C_GROUPS: 'group',
}

export default {
  // 供应商档案
  CP_C_SUPPLIER: () => async () => {
    let data = [];
    const formdata = new FormData();
    formdata.append('param', 'cpcsupplier');
    const res = await service.common.cpCHrorgTree(formdata);
    data = res.data;
    const treeData = {
      data,
      name: 'ID'
    };
    return treeData;
  },
  // 员工档案
  CP_C_EMP: () => async () => {
    let data = [];
    const formdata = new FormData();
    formdata.append('param', 'emp');
    const res = await service.common.cpCHrorgTree(formdata);
    data = res.data;
    const treeData = {
      data,
      name: 'ID'
    };
    return treeData;
  },
  // 内部组织
  CP_C_INORG: () => async () => {
    let data = [];
    const formdata = new FormData();
    formdata.append('param', 'inorg');
    const res = await service.common.cpCHrorgTree(formdata);
    data = res.data;
    const treeData = {
      data,
      name: 'ID'
    };
    return treeData;
  },
  // 用户档案
  CP_C_HRUSERS: () => async () => {
    let data = [];
    const formdata = new FormData();
    formdata.append('param', 'users');
    const res = await service.common.cpCHrorgTree(formdata);
    data = res.data;
    const treeData = {
      data,
      name: 'ID'
    };
    return treeData;
  },
  // 角色
  CP_C_GROUPS: () => async () => {
    let data = [];
    const formdata = new FormData();
    formdata.append('param', 'group');
    const res = await service.common.cpCHrorgTree(formdata);
    data = res.data;
    const treeData = {
      data,
      name: 'ID'
    };
    return treeData;
  },
  // 伙伴组织
  CP_C_OUTORG: () => async () => {
    let data = [];
    const formdata = new FormData();
    formdata.append('param', 'outorg');
    const res = await service.common.cpCHrorgTree(formdata);
    data = res.data;
    const treeData = {
      data,
      name: 'ID'
    };
    return treeData;
  },
};

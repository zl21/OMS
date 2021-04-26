/* 树结构界面配置 */

import service from '@/service/index';

// paramObj is assigned a value but never used  no-unused-vars
const tableNameList = {
  // 供应商档案
  CP_C_SUPPLIER: {
    table: 'CP_C_SUPPLIER',
    param: 'cpcsupplier',
    api: 'cpCHrorgTree',
  },
  // 内部组织
  CP_C_INORG: {
    table: 'CP_C_SUPPLIER',
    param: 'inorg',
    api: 'cpCHrorgTree',
  },
  // 伙伴组织
  CP_C_OUTORG: {
    table: 'CP_C_SUPPLIER',
    param: 'outorg',
    api: 'cpCHrorgTree',
  },
  // 员工档案
  CP_C_EMP: {
    table: 'CP_C_SUPPLIER',
    param: 'emp',
    api: 'cpCHrorgTree',
  },
  // 用户档案
  CP_C_HRUSERS: {
    table: 'CP_C_SUPPLIER',
    param: 'users',
    api: 'cpCHrorgTree',
  },
  // 角色
  CP_C_GROUPS: {
    table: 'CP_C_SUPPLIER',
    param: 'group',
    api: 'cpCHrorgTree',
  },
  // 商品分类
  PS_C_PRO_CLASSIFY: {
    table: 'PS_C_PRO_CLASSIFY',
    api: 'queryClassifyTree',
  },
  // 国家省市区
  V_CP_C_REGION_ALIAS: {
    table: 'PS_C_PRO_CLASSIFY',
    api: 'selectTree',
    placeholder: '请输入',
    query: {},
  },
};

let externalTreeDatasConfig = {};
externalTreeDatasConfig = (() => {
  for (const item in tableNameList) {
    externalTreeDatasConfig = Object.assign(externalTreeDatasConfig, {
      [item.table]: () => async () => {
        let data = [];
        let formdata = new FormData();
        formdata = item.param ? formdata.append('param', item.param) : '';
        const res = await service.common[item.api](formdata);
        data = res.data ? res.data : res.data.data;
        const treeData = {
          data,
          name: 'ID',
          placeholder: item.placeholder || '请输入',
        };
        if (item.query) treeData.query = item.query
        return treeData;
      }
    });
  }
  return externalTreeDatasConfig;
})();

export default externalTreeDatasConfig;
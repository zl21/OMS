/* 树结构界面配置 */

import R3 from '@syman/burgeon-r3'
const {
  network,
  urlSearchParams
} = R3;
Vue.prototype.$network = network;
Vue.prototype.$urlSearchParams = urlSearchParams;

export default {
  restructureMenuTreeData: function (data) {
    return data.map((item) => {
      item.NAME = item.ENAME;
      // item.id = item.ID;
      if (item.children && item.children.length > 0) {
        restructureMenuTreeData(item.children);
      }
      return item;
    });
  },
  getTreeChildren: function (pnode, arr) {
    pnode.children = arr.filter(item => item.CP_C_ORGUP_ID === pnode.ID);
    pnode.children.forEach(item => {
      item.lastChild = false;
      item.ID = item.ENAME;
      // item.expand = true;
      pnode.children[pnode.children.length - 1].lastChild = true;
      getTreeChildren(item, arr);
    })
  },
  // 供应商档案
  CP_C_SUPPLIER: () => async () => {
    let data = [];
    let formdata = new FormData();
    formdata.append('param', 'cpcsupplier');
    await network.post('/p/c/cpCHrorgTree', formdata).then((res) => {
      //   console.log(res);
      // data = restructureMenuTreeData(res.data);
      data = res.data;
      if (res.data.code === 0) {}
    });
    const treeData = {
      data,
      name: 'CP_C_HRORG_ID'
    };
    return treeData;
  },
  // 员工档案
  CP_C_EMP: () => async () => {
    let data = [];
    let formdata = new FormData();
    formdata.append('param', 'emp');
    await network.post('http://yapi.dev.syman.cn/mock/624/p/c/standardTree_1603157227651', formdata).then((res) => {
      //   console.log(res);
      // data = restructureMenuTreeData(res.data);
      data = res.data;
      if (res.data.code === 0) {}
    });
    const treeData = {
      data,
      name: 'ID'
    };
    return treeData;
  },
  // 组织中心
  CP_C_INORG: () => async () => {
    let data = [];
    let formdata = new FormData();
    formdata.append('param', 'cpcHrorg');
    await network.post('/p/c/cpCHrorgTree', formdata).then((res) => {
      //   console.log(res);
      // data = restructureMenuTreeData(res.data);
      data = res.data;
    })
    const treeData = {
      data,
      name: 'ID'
    };
    return treeData;
  },
  // 用户档案
  CP_C_HRUSERS: () => async () => {
    let data = [];
    let formdata = new FormData();
    formdata.append('param', 'users');
    await network.post('/p/c/cpCHrorgTree', formdata).then((res) => {
      data = res.data;
    })
    const treeData = {
      data,
      name: 'ID'
    };
    return treeData;
  },
  // 角色
  CP_C_GROUPS: () => async () => {
    let data = [];
    let formdata = new FormData();
    formdata.append('param', 'group');
    await network.post('/p/c/cpCHrorgTree', formdata).then((res) => {
      data = res.data;
    })
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
    formdata.append('param', 'IN');
    await network.post('/p/c/cpCHrorgTree', formdata).then((res) => {
      //   console.log(res);
      data = res.data;
      if (res.data.code === 0) {}
    });
    const treeData = {
      data,
      name: 'CP_C_HRORG_ID'
    };
    return treeData;
  },
}

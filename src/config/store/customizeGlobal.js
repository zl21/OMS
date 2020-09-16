

import R3 from '@syman/burgeon-r3';
import jordanstore from './jordanStore';

const { store, router, getKeepAliveModuleName } = R3;

export const globalStore = {// 1.3框架全局状态管理
  namespaced: true,
  state: {
    mainContentLoading: false,
    pwTips: false,
    activeTabAddr: [],
    ref: '',
    errorDialog: {
      show: false,
      type: 'error',
      title: '错误',
      errorList: [],
      hiddenButton: true
    },
    excludedComponents: [], // 针对性缓存相应的组件
  
    // 促销策略数据
    dataTwoNew: {
      scheme_arr: [],
    },
    scheme_dataNew: {
      // 大类方案 商品活动(GA)，全场活动 (PA)
      program_code: 'GA',
      // 中类 discount--打折  /change--换购  /minus  /gift
      promotionType_code: 'GA12',
      // 小类（折扣、满减、特价）  all--统一打折   multiple--多种折扣    increment--递增    combine--组合
      // 小类 (买赠)  all-gift --统一赠品   all-coupon--统一送券     grade-gift--梯度赠品   grade-coupon-梯度送券
      // 小类 (换购)  all/combine   all-fprice--统一特价  all-dis--统一打折  all-minus--统一优惠   combine-fprice--组合特价  combine-dis--组合特价 combine-minus--组合特价
      detail_code: 'GA1201',
      // 组合策略，使用的值
      content: '0.9',
      rules: [
        {
          // 购买商品
          skuIds: '',
          // 条件名称
          conditionName: 'QTTY',
          // 条件类型：大于，等于。。。。
          conditionType: 'GE',
          // 条件值
          conditionValue: '',
          // 非组合策略使用的(打折、满减、特价)
          content: '',
          // 赠品、换购范围条件
          prizeItem: '',
          // 赠品、换购数量
          prizeNum: ''
        }
      ],
      limits: [
        {
          content: '0.66',
          skusId: '',
          skusNum: ''
        }
      ]
    },
    dataTwo: {
      scheme_arr: [],
    },
    scheme_data: {
      // 大类方案 商品活动(GA)，全场活动 (PA)
      program_code: 'GA',
      // 中类 discount--打折  /change--换购  /minus  /gift
      promotionType_code: 'GA12',
      // 小类（折扣、满减、特价）  all--统一打折   multiple--多种折扣    increment--递增    combine--组合
      // 小类 (买赠)  all-gift --统一赠品   all-coupon--统一送券     grade-gift--梯度赠品   grade-coupon-梯度送券
      // 小类 (换购)  all/combine   all-fprice--统一特价  all-dis--统一打折  all-minus--统一优惠   combine-fprice--组合特价  combine-dis--组合特价 combine-minus--组合特价
      detail_code: 'GA1201',
      // 组合策略，使用的值
      content: '0.9',
      rules: [
        {
          // 购买商品
          skuIds: '',
          // 条件名称
          conditionName: 'QTTY',
          // 条件类型：大于，等于。。。。
          conditionType: 'GE',
          // 条件值
          conditionValue: '',
          // 非组合策略使用的(打折、满减、特价)
          content: '',
          // 赠品、换购范围条件
          prizeItem: '',
          // 赠品、换购数量
          prizeNum: ''
        }
      ],
      limits: [
        {
          content: '0.66',
          skusId: '',
          skusNum: ''
        }
      ]
    },
    // 促销二类名称和描述
    prom_type: {
      prom_type_name: '',
      prom_type_brief: ''
    },
    forginkeys: {
      columnIds: {},
      groups: {}
    }
  },
  mutations: {
    // 存储促销二类名称和描述
    save_prom_type(state, n) {
      state.prom_type.prom_type_name = n.prom_type_name;
      state.prom_type.prom_type_brief = n.prom_type_brief;
    },
    forginkeys(state, data) {
      state.forginkeys[data.key] = data.value;
    },
    stateChange(state, data) {
      state = Object.assign(state, data);
    },
    // 清空赋值dataTWO
    clearType(state, n) {
      state.dataTwoNew.scheme_arr = n;
    },
    // 接收切换促销策略的值
    switchDetail(state, switchTo) { // 促销模块
      if (switchTo.id > 0) {
        // state.dataTwo = switchTo.scheme_struct
        state.scheme_data = switchTo.scheme_struct;
      } else {
        state.scheme_dataNew = switchTo.scheme_struct;
      }
    },
    // getCurrentCompent(state, ref) {
    //   if (!ref) ref = `${state.activeTab.type}_${state.activeTab.name}_${state.activeTab.id}`;
    //   vm.$nextTick(() => {
    //     const comList = vm.$children[0].$children[0].$children[3].$children[0].$refs; //  组件列表
    //     for (const i in comList) {
    //       if (i == ref) {
    //         state.CurrentCompent = comList[i];
    //       }
    //     }
    //   });
    // },
    // saveUserInfo(state, info) {
    //   state.userInfo.name = info.name;
    //   state.userInfo.ename = info.ename;
    //   state.userInfo.truename = info.truename;
    //   state.userInfo.id = info.id;
    //   state.userInfo.isadmin = info.isadmin;
    // },
    beforeSignout(state, callback) { // 登出
      state.logout = true;
      // if (vm.$children[0].$children.length == 0) {
      //   callback();
      // }
      this.dispatch('global/signout');
    },
    mainContentLoading(state, option) {
      state.mainContentLoading = option;
    },

    // asyncTaskDialog(state, data) {
    //   state.asyncTaskDialog.show = true;
    //   state.asyncTaskDialog.id = data.id;
    // },
    clostErrorDialog(state, data) { // 关闭报错提示框
      state.errorDialog.show = data;
    },
    errorDialog(state, data) {
      state.errorDialog.show = true;
      if (data.message && data.message.data && data.message.data.length > 0) {
        state.errorDialog.errorList = data.message.data;
      } else if (data.message && data.message.message) {
        state.errorDialog.errorList = data.message;
      } else {
        state.errorDialog.errorList = data;
      }

      if (data.type) {
        state.errorDialog.type = data.type;
      } else {
        state.errorDialog.type = 'error';
      }
      state.errorDialog.title = data.type == 'warning' ? '警告' : '错误';

      if (data.title) {
        state.errorDialog.title = data.title;
      }


      if (data.hiddenButton == undefined) {

      } else {
        state.errorDialog.hiddenButton = data.hiddenButton;
      }
    },
    errorDialogClose(state) {
      state.errorDialog.show = false;
    },
    slidemenu(state) {
      state.sliderbar.isopen = !state.sliderbar.isopen;
    },
    // switchActiveTab(state, tab) {
    //   const selectTabs = state.selectedTabs;
    //   for (const index in selectTabs) {
    //     if (selectTabs[index].type === tab.type && selectTabs[index].name === tab.name && selectTabs[index].id == tab.id) {
    //       // state.selectedTabs.splice(index, 1);
    //       state.activeTab = state.selectedTabs[index];
    //       break;
    //     }
    //   }

    //   if (tab.type === 'singleView' || tab.type === 'singleObject') {
    //     const component = `${tab.type}_${tab.name}_${tab.id}`;
    //     const index = state.excludedComponents.indexOf(component);
    //     if (index > -1) {
    //       state.excludedComponents.splice(index, 1);
    //     }
    //   }
    // },
    // deleteAllTabs(state, tab) {
    //   state.selectedTabs = [];
    //   state.activeTab = {
    //     id: '',
    //     label: '',
    //     name: '',
    //     addr: []
    //   };
    //   route.push('/');
    // },

    // saveRefs(state, ref) {
    //   state.ref = ref;
    // },
    // favoriteList(state, list) {
    //   state.favorite.list = list;
    // },
    updateFavoriteList(state, list) {
      state.favoriteList = list.reverse();
    },
    // updateHistoryList(state, list) {
    //   state.historyList = list.reverse();
    // },
    // deleteExcludedComponents(state, tab) {
    //   let component = null;
    //   component = `${tab.type}_${tab.name}_${tab.id}`;
    //   const index = state.excludedComponents.indexOf(component);

    //   if (index > -1) {
    //     state.excludedComponents.splice(index, 1);
    //   }
    // },
    // addExcludedComponents(state, tab) {
    //   let component = null;
    //   component = `${tab.type}_${tab.name}_${tab.id}`;
    //   if (state.excludedComponents.indexOf(component) === -1) {
    //     state.excludedComponents.push(component);
    //   }
    // },

    /**
     * 当前页跳转
     * @param state
     * @param tab
     * {
     *    back: 是否为返回
     *    id
     *    type: '' 类型: table, singleView, singleObject, action, rpt...
     *    name: '' 文件名称: tablename(表名), 配置文件名
     *    label: '' tab 名称
     *    query:{} url search
     * }
     * @constructor
     */
    TabHref(state, tab) {
      if (tab.type === 'singleView' || tab.type === 'singleObject') {
        // 暂不处理
      } else {
        let url = '';
        if (tab.query && Object.keys(tab.query).length > 0) { // 有传参时
        // const url = '/CUSTOMIZED/promotion/-1?id=-1&tabTitle=新增促销活动';
          url = `/CUSTOMIZED/${tab.name}/${tab.id}?`;
          const param = [];

          for (const q in tab.query) {
            if (tab.query.hasOwnProperty(q)) {
              param.push(`${q}=${tab.query[q]}`);
            }
          }
          url += param.join('&');
        } else { // 无传参
          const type = 'C';  
          const data = {
            type,
            label: tab.label,
            customizedModuleName: tab.name,
            customizedModuleId: tab.id,
          };
          store.commit('global/tabOpen', data);
        }
        const type = 'C';  
        const data = {
          type,
          label: tab.label,
          url,
          customizedModuleName: tab.name,
          customizedModuleId: tab.id,
        };
        store.commit('global/tabOpen', data);
      }
      // 在当前tab打开新界面
    },
    /**
     * 打开新tab页
     * @param state
     * @param tab
     * @constructor
     */
    TabOpen(state, tab) {
      // tab.name:自定义界面name
      // tab.id:自定义界面ID 
      // tab.label:自定义界面label
      if (tab.type === 'singleView' || tab.type === 'singleObject') {
        // 暂不处理
      } else {
        let url = '';
        if (tab.query && Object.keys(tab.query).length > 0) { // 有传参时
        // const url = '/CUSTOMIZED/promotion/-1?id=-1&tabTitle=新增促销活动';
          url = `/CUSTOMIZED/${tab.name}/${tab.id}?`;
          const param = [];

          for (const q in tab.query) {
            if (tab.query.hasOwnProperty(q)) {
              param.push(`${q}=${tab.query[q]}`);
            }
          }
          url += param.join('&');
        } else { // 无传参
          const type = 'C';  
          const data = {
            type,
            label: tab.label,
            customizedModuleName: tab.name,
            customizedModuleId: tab.id,
          };
          store.commit('global/tabOpen', data);
        }
        const type = 'C';  
        const data = {
          type,
          label: tab.label,
          url,
          customizedModuleName: tab.name,
          customizedModuleId: tab.id,
        };
        store.commit('global/tabOpen', data);
      }
    },
    /**
     * 关闭当前Tab页
     * @param state
     * @param nextTab 下一个选中的tab
     * {
     *    id
     *    type: '' 类型: table, singleView, singleObject, action, rpt...
     *    name: '' 文件名称: tablename(表名), 配置文件名
     *    label: '' tab 名称
     *    path:
     *    url:
     *    query:{} url search
     * }
     * @constructor
     */
    TabClose(state, nextTab) {
      // id: 2663,
      // type: 'action',
      // name: 'promactiquerylist',
      // label: '促销活动'
     
      // 移除当前tab
      const currentRoute = this.state.global.activeTab.routeFullPath;
      const keepAliveModuleName = getKeepAliveModuleName(router.currentRoute);
      // global/tabCloseAppoint
      // params
      // routeFullPath:当前path
      // keepAliveModuleName:模块名
      // tableName:表名
      this.commit('global/tabCloseAppoint', { routeFullPath: currentRoute, keepAliveModuleName, tableName: router.currentRoute.params.customizedModuleName });

      const type = 'C';  
      const nextTabParame = {
        type,
        label: nextTab.label,
        customizedModuleName: nextTab.name,
        customizedModuleId: nextTab.id,
      };
      this.commit('global/tabOpen', nextTabParame);
    },
    /**
     * 删除指定tab
     * @param state
     * @param tab
     * @constructor
     */
    // TabCloseAppoint(state, tab) {
    //   const activeTab = state.activeTab;
    //   const selectTabs = state.selectedTabs;
    //   for (const index in selectTabs) {
    //     if (selectTabs[index].type === tab.type && selectTabs[index].name === tab.name && selectTabs[index].id == tab.id) {
    //       state.selectedTabs.splice(index, 1);
    //       break;
    //     }
    //   }
    //   if (tab.type === activeTab.type && tab.name === activeTab.name && tab.id == activeTab.id) {
    //     if (state.selectedTabs.length > 0) {
    //       state.activeTab = state.selectedTabs[state.selectedTabs.length - 1];
    //       route.push({
    //         path: state.activeTab.path
    //       });
    //     } else {
    //       state.activeTab = {
    //         id: '',
    //         label: '',
    //         name: '',
    //         addr: []
    //       };
    //       state.selectedTabs = [];
    //       route.push('/');
    //     }
    //   }
    // },

  },
  modules: {
    jordanStore: jordanstore
  }
};
export default globalStore;

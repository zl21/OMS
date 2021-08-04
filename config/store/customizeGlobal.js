import R3 from '@syman/burgeon-r3';
import jordanStore from './jordanStore'


const { store, router, getKeepAliveModuleName } = R3;
export const globalStore = {
  // 1.3框架全局状态管理
  namespaced: true,
  state: {
    language: 'zh', // 国际化
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
    },
    /* --------- oms --------- */
    //订单中心 - 退货金额
    returnAmount:{
      PRO_ACTUAL_AMT:0, // 商品应退金额
      PRO_REAL_AMT:0, // 商品实退金额
      SHIP_AMT:0, //应退运费
      ADJUST_AMT:0, //调整金额
      EXCHANGE_AMT:0, //换货金额
      FINAL_ACTUAL_AMT:0, //最终应退总金额
      FINAL_REAL_AMT:0, //最终实退总金额
    },
    // 订单中心 - 退换货明细
    returnOrderChangeItem:[],
    // 订单中心 - 赔付单
    COMPENSATE: {
      detail: [],
      deleteIds: [],
      other: {},
      exCode: '',
      orderId: '',
    },
    originalOrder:'',
    extraoOrderDetails:[],
    clear:false,
    colRowNum:4 // 针对于定制界面 form表单根据屏幕变化设置个数（用于计算）
  },
  mutations: {
    language(state, x) {
      state.language = x;
      // console.log('state.language::', x);
    },
    REDUNDANT_ORDER_ID(state, n) {
      state.REDUNDANT_ORDER_ID = n;
    },
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
    // 接收切换促销策略的值
    switchDetail(state, switchTo) {
      // 促销模块
      if (switchTo.id > 0) {
   
        state.scheme_data = switchTo.scheme_struct;
      } else {
        state.scheme_dataNew = switchTo.scheme_struct;
      }
    },
    beforeSignout(state) {
      // 登出
      state.logout = true;
      this.dispatch('global/signout');
    },
    mainContentLoading(state, option) {
      state.mainContentLoading = option;
    },
    clostErrorDialog(state, data) {
      // 关闭报错提示框
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

      if (data.hiddenButton != undefined) {
        state.errorDialog.hiddenButton = data.hiddenButton;
      }
    },
    errorDialogClose(state) {
      state.errorDialog.show = false;
    },
    slidemenu(state) {
      state.sliderbar.isopen = !state.sliderbar.isopen;
    },
    updateFavoriteList(state, list) {
      state.favoriteList = list.reverse();
    },

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
        if (tab.query && Object.keys(tab.query).length > 0) {
          // 有传参时
          // const url = '/CUSTOMIZED/promotion/-1?id=-1&tabTitle=新增促销活动';
          url = `/CUSTOMIZED/${tab.name}/${tab.id}?`;
          const param = [];

          for (const q in tab.query) {
            if (Object.prototype.hasOwnProperty.call(tab.query, q)) {
              param.push(`${q}=${tab.query[q]}`);
            }
          }
          url += param.join('&');
        } else {
          // 无传参
          const type = 'C';
          const data = {
            type,
            label: tab.label,
            customizedModuleName: tab.name,
            customizedModuleId: tab.id
          };
          store.commit('global/tabOpen', data);
        }
        const type = 'C';
        const data = {
          type,
          label: tab.label,
          url,
          customizedModuleName: tab.name,
          customizedModuleId: tab.id
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
        
        if (tab.query && Object.keys(tab.query).length > 0) {
          // 有传参时
          // const url = '/CUSTOMIZED/promotion/-1?id=-1&tabTitle=新增促销活动';
          url = `/CUSTOMIZED/${tab.name}/${tab.id}?`;
          const param = [];

          for (const q in tab.query) {
            if (Object.prototype.hasOwnProperty.call(tab.query, q)) {
              param.push(`${q}=${tab.query[q]}`);
            }
          }
          url += param.join('&');
        } 
        const type = 'C';
        const data = {
          type,
          label: tab.label,
          url,
          customizedModuleName: tab.name,
          customizedModuleId: tab.id
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
      const currentRoute = this.state.global.activeTab.routeFullPath;
      const keepAliveModuleName = getKeepAliveModuleName(router.currentRoute);
      this.commit('global/tabCloseAppoint', { routeFullPath: currentRoute, keepAliveModuleName, tableName: router.currentRoute.params.customizedModuleName });

      const type = 'C';
      const nextTabParame = {
        type,
        label: nextTab.label,
        customizedModuleName: nextTab.name,
        customizedModuleId: nextTab.id
      };
      this.commit('global/tabOpen', nextTabParame);
    },
     /* --------- oms --------- */
    //订单中心
    returnAmount(state, n){
      // console.log(state.returnAmount,n);
      let ks = Object.keys(state.returnAmount);
      ks.forEach((k) => n[k] && (state.returnAmount[k] = n[k]));
    },
    // 编辑 退换货
    returnOrderChangeItem(state,n){
      state.returnOrderChangeItem = n;
      // console.log(state.returnOrderChangeItem,n);
    },
    COMPENSATE(state, n) {
      // console.log('state::',n);
      let obj = JSON.parse(JSON.stringify(state.COMPENSATE));
      let ks = Object.keys(n);
      ks.forEach((k) => obj[k] = n[k]);
      state.COMPENSATE = obj; // 改变引用
    },
    originalOrder(state,n){
      // console.log(state,n);
      state.originalOrder = n
    },
    extraoOrderDetails(state,n){
      state.extraoOrderDetails = n;
    },
    clear(state,n){
      state.clear = n;
    },
    colRowNum(state,n){
      state.colRowNum = n
    }
  },
  modules: {
    jordanStore
  }
};
export default globalStore;

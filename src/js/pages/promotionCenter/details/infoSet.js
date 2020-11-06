import tableCols from '@/assets/js/promotion/columns.js';
import SingleBox from '@/views/pages/promotionCenter/components/singleBox.vue';
import ButtonFkDialog from '@/views/pages/promotionCenter/components/buttonFkDialog.vue';
import detailtable from '@/views/pages/promotionCenter/details/table.vue';
import detailtabs from '@/views/pages/promotionCenter/details/tableTabs.vue';
import CTSIT from '@/views/pages/promotionCenter/details/CTSIT';

// const _import = file => require(`@/jordanComponents/views/${file}.vue`).default;
export default {
  name: 'InfoSet',
  components: {
    detailtable,
    detailtabs,
    SingleBox,
    CTSIT,
    ButtonFkDialog,
  },
  props: {
    basicData: {
      type: Object,
    },
    infoData: {
      type: Object,
    },
    loadDis: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    'infoData.products_origin': {
      handler(val, old) {
        const self = this;
        if (val === '1') {
          this.columns = self.tableCols.infoColumns;
        } else if (val === '2') {
          this.columns = self.tableCols.infoColumns;
        } else if (val === '3') {
          this.columns = self.tableCols.infoColumnsxt;
        } else {
          this.columns = self.tableCols.infoColumnspt;
        }
      },
    },
    loadDis(val) {
      if (val === true) {
        this.initView();
      }
    },
  },
  data() {
    return {
      vmI18n: window.vmI18n,
      temp_time_type: '',
      columns: tableCols.infoColumns,
      data: [], // 表格数据
      itemdata_xitong: {
        col: 1,
        colid:
          this.$store.state.customize.forginkeys.columnIds.sku || '1700806532',
        colname: 'PS_C_PRO_ID',
        datelimit: 'all',
        display: 'text',
        fkdesc: '系统商品SKU',
        fkdisplay: 'drp',
        inputname: 'PS_C_PRO_ID:ECODE',
        isfk: true,
        isnotnull: false,
        isuppercase: true,
        length: 65535,
        name: '',
        readonly: false,
        reftable: 'PS_C_SKU',
        reftableid: 23281,
        row: 1,
        statsize: -1,
        type: 'STRING',
        valuedata: '',
        isOneData: true,
        isObject: true,
      },
      itemdata_channel: {
        col: 1,
        colid:
          this.$store.state.customize.forginkeys.columnIds.plateform_sku
          || '1700806533',
        colname: 'SG_B_CHANNEL_PRODUCT_ID',
        datelimit: 'all',
        display: 'text',
        fkdesc: '平台SKUID',
        fkdisplay: 'drp',
        inputname: 'SG_B_CHANNEL_PRODUCT_ID:ECODE',
        isfk: true,
        isnotnull: false,
        isuppercase: true,
        length: 65535,
        name: '',
        readonly: false,
        reftable: 'SG_B_CHANNEL_PRODUCT',
        reftableid: 24801,
        row: 1,
        statsize: -1,
        type: 'STRING',
        valuedata: '',
        isOneData: true,
        isObject: true,
        refcolval: {
          // 该值为过滤功能的配置项
          fixcolumn: 'CP_C_SHOP_ID', // 该值为该选项的上级ID
          expre: 'equal', // 该值为过滤条件 equal为等于
          srccol: 'CP_C_SHOP_ID', // 改值为该选项的上级字段名
        },
      },
      itemdata_xitong_pro: {
        // 系统商品款号
        col: 1,
        colid:
          this.$store.state.customize.forginkeys.columnIds.pro || '1700806532',
        colname: 'PS_C_PRO_ID',
        datelimit: 'all',
        display: 'text',
        fkdesc: '系统商品款号',
        fkdisplay: 'drp',
        inputname: 'PS_C_PRO_ID:ECODE',
        isfk: true,
        isnotnull: false,
        isuppercase: true,
        length: 65535,
        name: '',
        readonly: false,
        reftable: 'PS_C_PRO',
        reftableid: 23281,
        row: 1,
        statsize: -1,
        type: 'STRING',
        valuedata: '',
        isOneData: true,
        isObject: true,
      },
      itemdata_channel_pro: {
        // 平台商品ID
        col: 1,
        colid:
          this.$store.state.customize.forginkeys.columnIds.plateform_pro
          || '1700806533',
        colname: 'IP_C_TAOBAO_PRODUCT_ID',
        datelimit: 'all',
        display: 'text',
        fkdesc: '平台商品ID',
        fkdisplay: 'drp',
        inputname: 'IP_C_TAOBAO_PRODUCT_ID:ECODE',
        isfk: true,
        isnotnull: false,
        isuppercase: true,
        length: 65535,
        name: '',
        readonly: false,
        reftable: 'IP_C_TAOBAO_PRODUCT',
        reftableid: 24801,
        row: 1,
        statsize: -1,
        type: 'STRING',
        valuedata: '',
        isOneData: true,
      },
      currentTab: 0, // 当前选中
      productslistView: {
        current: 1,
        total: 0,
        pageSize: 10,
      },
      productsArrsView: [],
      currentView: '',
      popDialog: '',
      dialogModal: {},
      show_dialog: false,
      dialogSet: {
        dialogTitle: '',
        footerHide: true,
        mask: true,
      },
      moduleMode: 'info',
    };
  },
  computed: {
    itemdata() {
      const self = this;
      let rs;
      if (this.infoData.products_origin === '1') {
        rs = this.itemdata_xitong;
        // this.columns = self.tableCols.infoColumns
      } else if (this.infoData.products_origin === '2') {
        rs = this.itemdata_channel;
        // this.columns = self.tableCols.infoColumns
      } else if (this.infoData.products_origin === '3') {
        rs = this.itemdata_xitong_pro;
        // this.columns = self.tableCols.infoColumnsxt
      } else {
        rs = this.itemdata_channel_pro;
        // this.columns = self.tableCols.infoColumnspt
      }
      const itemdata = JSON.parse(JSON.stringify(rs));
      if (this.infoData.products_origin === '2') {
        itemdata.objList = [];
        const obj = this.basicData.stores.itemdata;
        itemdata.objList.push(obj);
      }
      return itemdata;
    },
    itemdataFk() {
      try {
        let rs;
        if (this.infoData.products_origin === '1') {
          rs = this.itemdata_xitong;
        } else if (this.infoData.products_origin === '2') {
          rs = this.itemdata_channel;
        } else if (this.infoData.products_origin === '3') {
          rs = this.itemdata_xitong_pro;
        } else {
          rs = this.itemdata_channel_pro;
        }
        const itemdata = JSON.parse(JSON.stringify(rs));
        itemdata.isOneData = false;
        itemdata.fkdisplay = 'mop';
        itemdata.isObject = true;
        return itemdata;
      } catch (e) {}
    },
    groups() {
      return this.$store.state.customize.forginkeys.groups;
    },
    tableCols() {
      return tableCols;
    },
    productsJoin() {
      let options = this.groups.productsJoin || [];
      if (this.basicData.gradient_gift === '1') {
        // 梯度赠送选择是
        options = this.groups.productsJoin.filter(
          item => item.title === '非搭配商品' // 非搭配商品
        );
        this.infoData.products_join = '1';
      }
      return options;
    },
    showPdtsArr() {
      const flag = this.infoData.products_join === '2';
      if (flag) {
        // 重置tab页面为第一页
        this.currentTab = 0;
      }
      return flag;
    },

    getProductsArrsIndex() {
      // 组索引
      return this.infoData.productsArrs.length;
    },
    getProductsListIndex() {
      // 商品列表索引
      return this.infoData.productslist.length;
    },
    onlyShowRules() {
      // 只显示满足条件规则
      // 全场 & 梯度否
      if (
        this.basicData.activity_type === 'PA'
        && this.basicData.gradient_gift === '0'
      ) {
        this.infoData.rules.forEach((rule) => {
          rule.show = true;
        });
        return true;
      }
      if (
        this.basicData.activity_type === 'GA'
        && this.basicData.gradient_gift === '0'
      ) {
        this.infoData.rules.forEach((rule) => {
          rule.show = true;
          if (rule.name === 'QTTY') {
            rule.filterPdtWayShow = true;
            if (!rule.filterPdtWay) rule.filterPdtWay = '2'; // 指定商品梯度为否  如果没有选择,默认为任意商品
          }
        });
        return false;
      }
      return false;
    },
    includeOrExclude() {
      // 选择商品方式，非搭配商品全部展示  搭配商品需要去掉【排除以下商品】
      let options = this.groups.includeOrExclude || [];
      if (this.infoData.products_join === '2') {
        options = this.groups.includeOrExclude.filter(
          item => item.title !== '排除以下商品' // 非搭配商品
        );
        this.infoData.includeOrExclude = '1';
      }
      return options;
    },
    showRulesContent() {
      if (this.basicData.gradient_gift === '0') return true;
      return false;
    },
  },
  methods: {
    /**
     * 商品参与方式
     */
    checkProductJoinChange(val) {
      this.infoData.products_join = val;
      // 需要根据当前的情况修改选择商品方式
      if (val === '2') {
        this.infoData.includeorexclude = '1';
      }
      this.clearPdts();
    },
    /**
     * 商品来源
     */
    checkProductOriginChange(val) {
      this.infoData.products_origin = val;
      this.clearPdts();
    },
    /**
     * 选择商品方式
     */
    checkIncludeOrExcludeChange(val) {
      this.infoData.includeorexclude = val;
      this.clearPdts();
    },
    /**
     * 增加行数据
     * @rowObj  初始化行数据  可为空
     */
    addRowData(rowObj) {
      // 非搭配--增加行
      const obj = {};
      this.columns.forEach((col) => {
        obj[col.key] = rowObj && rowObj[col.key] ? rowObj[col.key] : '';
      });
      // obj.itemdata = JSON.parse(JSON.stringify(this.itemdata));
      // if(rowObj){
      //     obj.itemdata.pid = rowObj.ID;
      //     obj.itemdata.valuedata  = rowObj.ECODE;
      // }
      // obj.itemdata.colname = obj.itemdata.colname + Math.floor(Math.random()*1000000);
      if (rowObj) {
        obj.ID = rowObj.ID || '';
        obj.SKU_ID = rowObj.SKU_ID || '';
      }
      this.infoData.productslist.push(obj);
      this.countTablelistView();
    },
    /**
     * 单表格删除表格数据
     * @row  行数据
     * @currentPage 当前页
     * @pageSize 分页页数
     */
    deleteRowData(row, currentPage, pageSize) {
      // 非搭配-删除行
      const rowCount = (currentPage - 1) * pageSize;
      const index = rowCount + row._index;
      if (index >= 0) {
        this.infoData.productslist.splice(index, 1);
      }
      this.countTablelistView();
    },
    /**
     * 增加行数据
     * @tabindex  搭配商品  第几个表格
     * @rowObj  行数据  可为空
     */
    addOneTableRowData(tabindex, rowObj) {
      // 搭配-增加行数据
      const obj = {};
      this.columns.forEach((col) => {
        obj[col.key] = rowObj && rowObj[col.key] ? rowObj[col.key] : '';
      });
      // obj.itemdata = JSON.parse(JSON.stringify(this.itemdata));
      //  if(rowObj){
      //     obj.itemdata.valuedata  = rowObj.ECODE;
      // }
      if (rowObj) {
        obj.ID = rowObj.ID || '';
        obj.SKU_ID = rowObj.SKU_ID || '';
      }
      this.infoData.productsArrs[tabindex].productslist.push(obj);
      this.countOneTablelistView(tabindex);
    },
    deleteOneTableRowData(tabindex, row, currentPage, pageSize) {
      // 搭配-删除行数据
      try {
        const rowCount = (currentPage - 1) * pageSize;
        const rowindex = rowCount + row._index;
        const arrs = this.infoData.productsArrs[tabindex].productslist || [];
        arrs.splice(rowindex, 1);
        this.countOneTablelistView(tabindex);
      } catch (e) {}
    },
    getGroupIndex() {
      return `组${Number(this.getProductsArrsIndex + 1)}`;
    },
    addGroup() {
      // 增加搭配
      const obj = {};
      this.columns.forEach((col) => {
        obj[col.key] = '';
      });
      const group = {
        group: this.getGroupIndex(),
        rules: [
          {
            show: false,
            name: 'QTTY', // 条件名称
            type: 'GE', // 条件类型：大于，等于
            value: '', // 条件值
          },
        ],
        productslist: [...obj],
      };
      this.infoData.productsArrs.push(group);
      this.currentTab = this.getProductsArrsIndex - 1;
      this.addGroupView(this.currentTab);
    },
    removeGroup() {
      // 删除搭配
      // let delTab = this.infoData.productsArrs.length - 1;
      const delTab = this.currentTab;
      this.infoData.productsArrs.splice(this.currentTab, 1);
      // 确认是否是删除的最后一个
      if (this.infoData.productsArrs.length <= this.currentTab) {
        this.currentTab = this.infoData.productsArrs.length - 1;
      }
      this.removeGroupView(delTab);
      this.countOneTablelistView(this.currentTab);
    },
    showRules(index, rule) {
      if (
        this.basicData.activity_type === 'PA'
        && this.basicData.gradient_gift === '0'
      ) {
        return true;
      }
      if (this.infoData.products_join === '2' && rule.name === 'QTTY') {
        return false;
      }
      return true;
    },
    clearPdts() {
      this.infoData.productslist = [];
      this.infoData.productsArrs = [];
      this.productslistView = {
        total: 0,
        current: 1,
        pageSize: 10,
        data: [],
      };
      this.productsArrsView = [];
    },
    /**
     * 切换非tab页面的表格的页数
     */
    pageChange(val) {
      this.productslistView.current = val;
      this.tablelistView(this.infoData.productslist, this.productslistView);
    },
    /**
     * 切换非tab页面的表格的页长度
     */
    onPageSizeChange(val) {
      this.productslistView.pageSize = val;
      this.tablelistView(this.infoData.productslist, this.productslistView);
    },
    /**
     * 切换tab页面的表格的页数
     */
    onePageChange(tabindex, val) {
      this.productsArrsView[tabindex].current = val;
      this.tablelistView(
        this.infoData.productsArrs[tabindex].productslist,
        this.productsArrsView[tabindex]
      );
    },
    /**
     * 切换tab页面的表格的页长度
     */
    onOnePageSizeChange(tabindex, val) {
      this.productsArrsView[tabindex].pageSize = val;
      this.tablelistView(
        this.infoData.productsArrs[tabindex].productslist,
        this.productsArrsView[tabindex]
      );
    },
    /**
     * 单表格添加和删除 灵活展示表格
     */
    countTablelistView() {
      const rows = this.infoData.productslist || [];
      const obj = this.productslistView;
      const pageSize = obj.pageSize || 10;
      const pagesLen = Math.ceil(rows.length / pageSize);
      if (obj.current > pagesLen) obj.current = pagesLen;
      if (pagesLen === 0) obj.current = 1;
      this.tablelistView(rows, this.productslistView);
    },
    /**
     * 多tab单表格添加和删除 灵活展示表格
     */
    countOneTablelistView(tabindex) {
      const rows = this.infoData.productsArrs[tabindex].productslist || [];
      const obj = this.productsArrsView[tabindex];
      const pageSize = obj.pageSize || 10;
      const pagesLen = Math.ceil(rows.length / pageSize);
      if (obj.current > pagesLen) obj.current = pagesLen;
      if (pagesLen === 0) obj.current = 1;
      this.tablelistView(rows, obj);
    },
    /**
     * 根据当前页和当前页数目 ，展示表格
     * @row 原始表格数据
     * @obj 表格虚拟视图
     */
    tablelistView(rows, obj) {
      const current = obj.current || 1;
      const pageSize = obj.pageSize || 10;
      const start = Number((current - 1) * pageSize);
      const end = Number(current * pageSize);
      obj.total = rows.length;
      obj.data = rows.slice(start, end);
    },
    /**
     * 新增的阶梯 增加对应的视图表格
     */
    addGroupView() {
      const obj = {
        current: 1,
        total: 0,
        pageSize: 10,
        data: [],
      };
      this.productsArrsView.push(obj);
    },
    /**
     * 删除阶梯对应的视图表格
     */
    removeGroupView(delTab) {
      this.productsArrsView.splice(delTab, 1);
    },
    /**
     *  修改行数据
     *  @row 行数据
     *  @currentPage 当前页
     *  @pageSize 页大小
     *  @force 强制更改元数据，刷新表格
     */
    alertRowData(row, currentPage, pageSize, force) {
      const rowCount = (currentPage - 1) * pageSize;
      const index = rowCount + row._index;
      if (index >= 0) {
        this.deleteProperty(row);
        this.infoData.productslist.splice(index, 1, row);
      }
      if (force) this.countTablelistView();
    },
    /**
     * 修改多tab 第N个表格的行数据
     * @tabindex 表格索引
     */
    alertOneTableRowData(tabindex, row, currentPage, pageSize, force) {
      const rowCount = (currentPage - 1) * pageSize;
      const rowindex = rowCount + row._index;
      if (rowindex >= 0) {
        this.deleteProperty(row);
        const arrs = this.infoData.productsArrs[tabindex].productslist || [];
        arrs.splice(rowindex, 1, row);
      }
      if (force) this.countOneTablelistView(tabindex);
    },
    getButtonFkChoose() {
      const rs = this.itemdataFk || {};
      const namelist = JSON.parse(rs.pid).nameList;
      namelist.forEach((obj) => {
        const row = {};
        if (rs.reftable === 'SG_B_CHANNEL_PRODUCT') {
          row.ECODE = obj.PS_C_SKU_ECODE || '';
          row.ENAME = obj.PS_C_PRO_ENAME || '';
          row.SKU_ID = obj.SKU_ID || '';
          row.ID = obj.ID;
        } else if (rs.reftable === 'IP_C_TAOBAO_PRODUCT') {
          row.ECODE = String(obj.NUM_IID) || '';
          row.ENAME = obj.TITLE || '';
          row.ID = obj.ID;
        } else if (rs.reftable === 'PS_C_PRO') {
          row.ECODE = obj.ECODE || '';
          row.ENAME = obj.ENAME || '';
          row.ID = obj.ID || '';
        } else {
          row.ECODE = obj.ECODE || '';
          row.ENAME = obj.PS_C_PRO_ENAME || '';
          row.ID = obj.ID || '';
        }
        this.addRowData(row);
      });
    },
    getOnePageButtonFkChoose(tabindex, val) {
      const rs = val || {};
      const namelist = JSON.parse(rs.pid).nameList;
      namelist.forEach((obj) => {
        const row = {};
        if (rs.reftable === 'SG_B_CHANNEL_PRODUCT') {
          row.ECODE = obj.PS_C_SKU_ECODE || '';
          row.ENAME = obj.PS_C_PRO_ENAME || '';
          row.ID = obj.SKU_ID;
        } else if (rs.reftable === 'IP_C_TAOBAO_PRODUCT') {
          row.ECODE = obj.NUM_IID || '';
          row.ENAME = obj.TITLE || '';
          row.ID = obj.ID;
        } else if (rs.reftable === 'PS_C_PRO') {
          row.ECODE = obj.ECODE || '';
          row.ENAME = obj.ENAME || '';
          row.ID = obj.ID || '';
        } else {
          row.ECODE = obj.ECODE || '';
          row.ENAME = obj.ENAME || '';
          row.ID = obj.ID || '';
        }
        this.addOneTableRowData(tabindex, row);
      });
    },
    /**
     * 删除多余属性
     */
    deleteProperty(row) {
      delete row._index;
      delete row.colspan;
      delete row._rowKey;
    },
    /**
     * 根据数据源 真实展示数据
     */
    initView() {
      const obj = {
        current: 1,
        total: 0,
        pageSize: 10,
        data: [],
      };
      if (this.infoData.products_join === '1') {
        this.productslistView = obj;
        this.tablelistView(this.infoData.productslist, this.productslistView);
      } else {
        this.productsArrsView = [];
        this.infoData.productsArrs.forEach((item, index) => {
          if (!item.group) {
            item.group = `组${index + 1}`;
          }
          const o = JSON.parse(JSON.stringify(obj));
          this.productsArrsView.push(o);
          this.tablelistView(
            this.infoData.productsArrs[index].productslist,
            this.productsArrsView[index]
          );
        });
      }
    },
    /**
     * 导入
     */
    importData() {
      const self = this;
      this.dialogModal = {};
      this.dialogModal.tableName = this.itemdata.reftable || 'PS_C_SKU';
      this.dialogModal.mode = this.moduleMode; // 区分模块 条件设置  赠品设置 还是批量设置
      const _component = 'popdialog';
      Vue.component(
        _component,
        Vue.extend(_import('onlinePromotion/components/importDialog'))
      );
      self.currentView = _component;
      self.dialogSet.dialogTitle = '导入';
      self.show_dialog = true;
    },
    /**
     * 返回值，用于弹框导入返回调添加单个表
     */
    returnData(data) {
      if (data && data.length > 0) {
        this.infoData.productslist = this.infoData.productslist.concat(data);
        this.countTablelistView();
      }
    },
    /**
     * 返回值，用于弹框导入返回调添加多个表
     */
    returnOneTableData(data, tabindex) {
      if (data && data.length > 0) {
        this.infoData.productsArrs[
          tabindex
        ].productslist = this.infoData.productsArrs[
          tabindex
        ].productslist.concat(data);
        this.countOneTablelistView(tabindex);
      }
    },
    /**
     * 关闭弹框
     */
    closeDialog() {
      this.show_dialog = false;
    },
  },

  mounted() {},
};

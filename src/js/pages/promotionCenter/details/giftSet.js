import detailtable from 'allpages/promotionCenter/details/table.vue';
import detailtabs from 'allpages/promotionCenter/details/tableTabs.vue';
import SingleBox from 'allpages/promotionCenter/components/singleBox';
import tableCols from '@/assets/js/promotion/columns';
import ButtonFkDialog from 'allpages/promotionCenter/components/buttonFkDialog';
import SetCommodity from 'allpages/promotionCenter/details/setCommodity';
import businessDialog from 'professionalComponents/businessDialog';
export default {
  name: 'giftSet',
  components: {
    detailtable,
    detailtabs,
    SingleBox,
    ButtonFkDialog,
    businessDialog,
    SetCommodity
  },
  props: {
    basicData: {
      type: Object
    },
    giftData: {
      type: Object
    },
    loadDis: {
      type: Boolean,
      default: false
    },
    objid: {
      type: String
    }
  },
  computed: {
    groups() {
      return this.$store.state.customize.forginkeys.groups;
    },
    showPdtsArr() {
      const flag = this.basicData.gradient_gift === '1';
      if (flag) {
        // 重置tab页面为第一页
        this.currentTab = 0;
      }
      return flag;
    },
    getProductsArrsIndex() {
      // 组索引
      return this.giftData.gift_productsArrs.length;
    },
    getProductsListIndex() {
      // 商品列表索引
      return this.giftData.gift_productslist.length;
    },
    columns() {
      return this.customeColumns();
    },
    itemdataFk() {
      try {
        const itemdata = JSON.parse(JSON.stringify(this.itemdata));
        itemdata.isOneData = false;
        itemdata.fkdisplay = 'mop';
        itemdata.isObject = true;
        return itemdata;
      } catch (e) {
        throw new Error(e);
      }
    }
  },
  watch: {
    loadDis(val) {
      if (val === true) {
        this.initView();
      }
    }
  },
  data() {
    return {
      vmI18n: window.vmI18n,
      currentTab: 0,
      tableCols,
      data: [], // 表格数据
      itemdata: {
        col: 1,
        colid: this.$store.state.customize.forginkeys.columnIds.sku || '1700806532',
        colname: `PS_C_PRO_ID${Math.floor(Math.random() * 100)}`,
        datelimit: 'all',
        display: 'text',
        fkdesc: '商品档案',
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
        isObject: true
      },
      productslistView: {
        current: 1,
        total: 0,
        pageSize: 10,
        data: []
      },
      productsArrsView: [], // 多tab表格
      currentView: '', // 弹框展示模块
      popDialog: '', // 弹框
      dialogModal: {},
      show_dialog: false,
      dialogSet: {
        // 弹框设置
        dialogTitle: '',
        footerHide: true,
        mask: true
      },
      // 弹框配置 导入
      importTable: {
        refFuns: 'confirmFun',
        confirmTitle: '赠品信息导入',
        titleAlign: 'center', // 设置标题是否居中 center left
        width: '400',
        scrollable: false, // 是否可以滚动
        closable: true, // 是否可以按esc关闭
        draggable: true, // 是否可以拖动
        mask: true, // 是否显示遮罩层
        maskClosable: true, // 是否可以点击叉号关闭
        transfer: true, // 是否将弹层放在body内
        name: 'importTable', // 组件名称
        url: 'modal/publicDialog/importTable',
        keepAlive: true,
        excludeString: 'importTable', // 将name传进去，确认不缓存
        componentData: {}
      },
      moduleMode: 'gift'
    };
  },
  methods: {
    /**
     * 修改阶梯类型
     */
    checkStepsTypeChange(val) {
      this.giftData.steps_type = val;
      this.clearPdts();
    },
    /**
     * 修改赠品翻倍
     */
    checkGiftDoublesChange(val) {
      this.giftData.gift_doubles = val;
    },
    /**
     * 修改赠送方式
     */
    checkGiftMethodsChange(val) {
      this.giftData.gift_methods = val;
      this.clearPdts();
    },
    checkGiftGrossChange(val) {
      this.giftData.give_num_share = val;

      this.clearPdts();
    },
    deleteOneTableRowData(tabindex, row, currentPage, pageSize) {
      // 搭配-删除行数据
      try {
        const rowCount = (currentPage - 1) * pageSize;
        const rowindex = rowCount + row._index;
        const arrs = this.giftData.gift_productsArrs[tabindex].productslist || [];
        if (this.giftData.gift_productsArrs[tabindex].productslist.length <= 1) {
          this.$message({
            type: 'warning',
            message: '至少保留一条条件信息'
          });
          return;
        }
        arrs.splice(rowindex, 1);
        this.countOneTablelistView(tabindex);
      } catch (e) {
        throw e;
      }
    },
    addOneTableRowData(tabindex, rowObj) {
      // 搭配-增加行数据
      const obj = {};
      const tempArr = this.giftData.gift_productsArrs[tabindex].productslist;
      this.columns.forEach(col => {
        obj[col.key] = rowObj && rowObj[col.key] ? rowObj[col.key] : '';
        if (col.key === 'ORDER') obj[col.key] = tempArr.length + 1;
      });
      if (rowObj) {
        obj.ID = rowObj.ID || '';
        obj.SKU_ID = rowObj.SKU_ID || '';
      }
      this.giftData.gift_productsArrs[tabindex].productslist.push(obj);
      this.countOneTablelistView(tabindex);
    },
    addRowData(event, rowObj) {
      // 非搭配--增加行
      const obj = {};

      this.columns.forEach(col => {
        obj[col.key] = rowObj && rowObj[col.key] ? rowObj[col.key] : '';
        if (col.key === 'ORDER') obj[col.key] = this.giftData.gift_productslist.length + 1;
      });
      this.giftData.gift_productslist.push(obj);
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
      if (this.giftData.gift_productslist.length <= 1) {
        this.$message({
          type: 'warning',
          message: '至少保留一条赠品信息'
        });
        return;
      }
      if (index >= 0) {
        this.giftData.gift_productslist.splice(index, 1);
      }
      this.countTablelistView();
    },
    /**
     * 删除阶梯
     */
    removeSteps() {
      // let delTab = this.giftData.gift_productsArrs.length - 1;
      const delTab = this.currentTab;
      this.giftData.gift_productsArrs.splice(this.currentTab, 1);
      // 确认是否是删除的最后一个
      if (this.giftData.gift_productsArrs.length <= this.currentTab) {
        this.currentTab = this.giftData.gift_productsArrs.length - 1;
      }
      this.removeGroupView(delTab);
      this.countOneTablelistView(this.currentTab);
    },
    /**
     *  设置商品池
     */
    setCommodity() {
      this.$emit('setcommodity');
    },
    /**
     *  添加阶梯
     */
    addSteps() {
      const obj = [];
      this.columns.forEach(col => {
        obj[col.key] = '';
      });
      const group = {
        group: this.getGroupIndex(),
        unit: this.giftData.steps_type === 'QTTY' ? '件' : '元',
        productslist: [...obj]
      };
      this.giftData.gift_productsArrs.push(group);
      this.currentTab = this.getProductsArrsIndex - 1;
      this.addGroupView(this.currentTab);
    },
    getGroupIndex() {
      return Number(this.getProductsArrsIndex) + 1;
    },
    clearPdts() {
      this.giftData.gift_productsArrs = [];
      this.giftData.gift_productslist = [];
      this.productslistView = {
        total: 0,
        current: 1,
        pageSize: 10,
        data: []
      };
      this.productsArrsView = [];
    },
    /**
     * 切换非tab页面的表格的页数
     */
    pageChange(val) {
      this.productslistView.current = val;
      this.tablelistView(this.giftData.gift_productslist, this.productslistView);
    },
    /**
     * 切换非tab页面的表格的页长度
     */
    onPageSizeChange(val) {
      this.productslistView.pageSize = val;
      this.tablelistView(this.giftData.gift_productslist, this.productslistView);
    },
    /**
     * 切换tab页面的表格的页数
     */
    onePageChange(tabindex, val) {
      this.productsArrsView[tabindex].current = val;
      this.tablelistView(this.giftData.gift_productsArrs[tabindex].productslist, this.productsArrsView[tabindex]);
    },
    /**
     * 切换tab页面的表格的页长度
     */
    onOnePageSizeChange(tabindex, val) {
      this.productsArrsView[tabindex].pageSize = val;
      this.tablelistView(this.giftData.gift_productsArrs[tabindex].productslist, this.productsArrsView[tabindex]);
    },
    /**
     * 单表格添加和删除 灵活展示表格
     */
    countTablelistView() {
      const rows = this.giftData.gift_productslist || [];
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
      const rows = this.giftData.gift_productsArrs[tabindex].productslist || [];
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
        data: []
      };
      this.productsArrsView.push(obj);
      this.addOneTableRowData(this.currentTab);
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
        this.giftData.gift_productslist.splice(index, 1, row);
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
        const arrs = this.giftData.gift_productsArrs[tabindex].productslist || [];
        arrs.splice(rowindex, 1, row);
      }
      if (force) this.countOneTablelistView(tabindex);
    },
    getButtonFkChoose() {
      const rs = this.itemdataFk || {};
      const namelist = JSON.parse(rs.pid).nameList;
      namelist.forEach(obj => {
        const row = {};
        if (rs.reftable === 'SG_B_CHANNEL_PRODUCT') {
          row.ECODE = obj.PS_C_SKU_ECODE || '';
          row.ENAME = obj.PS_C_PRO_ENAME || '';
          row.SKU_ID = obj.SKU_ID || '';
          row.ID = obj.ID;
        } else {
          row.ECODE = obj.ECODE || '';
          row.ENAME = obj.PS_C_PRO_ENAME || '';
          row.ID = obj.ID || '';
        }
        this.addRowData(null, row);
      });
    },
    getOnePageButtonFkChoose(tabindex, val) {
      const rs = val || {};
      const namelist = JSON.parse(rs.pid).nameList;
      namelist.forEach(obj => {
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
          row.ENAME = obj.PS_C_PRO_ENAME || '';
          row.ID = obj.ID;
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
     * 定制列元素
     */
    customeColumns() {
      let cols = [];
      if (this.giftData.gift_methods === '2') {
        if (this.giftData.give_num_share === '1') {
          cols = JSON.parse(JSON.stringify(this.tableCols.giftInCreaseNoSUMColumns));
        } else {
          cols = JSON.parse(JSON.stringify(this.tableCols.giftInCreaseColumns));
        }
      } else if (this.giftData.give_num_share === '1') {
        cols = JSON.parse(JSON.stringify(this.tableCols.giftNoSumColumns));
      } else {
        cols = JSON.parse(JSON.stringify(this.tableCols.giftAllColumns));
      }

      cols.forEach(column => {
        if (column.key === 'SUM_QTY') {
          if (this.basicData.status === '1' || this.objid == '-1') {
            column.render = (h, params) => h('div', {}, params.row.SUM);
          } else {
            delete column.render;
            this.$set(column, 'render', null);
          }
        }
        if (column.key === 'SEND_QTY') {
          if (this.basicData.status === '1' || this.objid == '-1') {
            column.render = h => h('div', {}, 0);
          } else {
            delete column.render;
            this.$set(column, 'render', null);
          }
        }
      });
      return cols;
    },
    /**
     * 根据数据源 真实展示数据
     */
    initView() {
      const obj = {
        current: 1,
        total: 0,
        pageSize: 10,
        data: []
      };
      if (this.basicData.gradient_gift === '0') {
        this.productslistView = obj;
        this.tablelistView(this.giftData.gift_productslist, this.productslistView);
      } else {
        this.productsArrsView = [];
        this.giftData.gift_productsArrs.forEach((item, index) => {
          const o = JSON.parse(JSON.stringify(obj));
          this.productsArrsView.push(o);
          this.tablelistView(this.giftData.gift_productsArrs[index].productslist, this.productsArrsView[index]);
        });
      }
    },
    /**
     * 导入
     */
    importData() {
      this.importTable.componentData = { tableName: this.itemdata.reftable || 'PS_C_SKU', mode: this.moduleMode };
      this.$children.find(item => item.name === 'importTable').openConfirm();
    },
    /**
     * 返回值，用于弹框返回解析
     */
    returnData(data) {
      if (data && data.length > 0) {
        this.giftData.gift_productslist = this.giftData.gift_productslist.concat(data);
        this.countTablelistView();
      }
    },
    /**
     * 返回值，用于弹框导入返回调添加多个表
     */
    returnOneTableData(data, tabindex) {
      if (data && data.length > 0) {
        if (this.giftData.give_num_share == '1') {
          data.forEach(item => {
            item.SUM = 0;
          });
        }
        this.giftData.gift_productsArrs[tabindex].productslist = this.giftData.gift_productsArrs[tabindex].productslist.concat(data);
        this.countOneTablelistView(tabindex);
      }
    },
    /**
     * 商品池保存
     */
    confirm() {
      this.$emit('confirm');
    },
    /**
     * 关闭弹框
     */
    closeDialog() {
      //  this.show_dialog = false;
      this.$emit('closeDialog');
    }
  },
  mounted() {
    this.addRowData();
  }
};

import detailTable from 'allpages/promotionCenter/details/table.vue';
import meetConditions from 'allpages/promotionCenter/details/meetConditions.vue';
import tabList from 'allpages/promotionCenter/details/tabList.vue';
import BC from 'burgeonComponents';
const { Components } = BC

export default {
  name: 'detailTabs',
  components: {
    detailTable,
    meetConditions,
    tabList,
  },
  computed: {
    currentTab: {
      get() {
        return this.current;
      },
      set(val) {
        this.$emit('update:current', val);
      }
    },
    itemdataFk() {
      try {
        const itemdata = JSON.parse(JSON.stringify(this.itemdata));
        itemdata.isOneData = false;
        itemdata.fkdisplay = 'mop';
        itemdata.isObject = true;
        itemdata.version = '1.4';
        itemdata.serviceId = 'r3-cp';
        return itemdata;
      } catch (e) {
        throw new Error(e);
      }
    }
  },
  props: {
    current: {
      type: Number
    },
    productsArrs: {
      type: Array
    },
    columns: {
      type: Array
    },
    itemdata: {
      type: Object
    },
    productsArrsView: {
      type: Array
    },
    moduleMode: {
      type: String
    }
  },
  data() {
    return {
      // currentView:'',  //弹框
      // popDialog:'',
      dialogModal: {}, // 弹框传参
      show_dialog: false, // 弹框是否关闭
      dialogSet: {
        // 弹框层设置  标题、 隐藏底部 、是否遮罩
        dialogTitle: '',
        footerHide: true,
        mask: true
      },
      // 弹框配置 导入
      importTable: {
        refFuns: 'confirmFun',
        confirmTitle: '条件信息导入',
        titleAlign: 'left', // 设置标题是否居中 center left
        width: '572',
        scrollable: false, // 是否可以滚动
        closable: true, // 是否可以按esc关闭
        draggable: true, // 是否可以拖动
        mask: true, // 是否显示遮罩层
        maskClosable: true, // 是否可以点击叉号关闭
        transfer: true, // 是否将弹层放在body内
        name: 'importTable', // 组件名称
        url: Components.ImportTable,
        keepAlive: true,
        excludeString: 'importTable', // 将name传进去，确认不缓存
        componentData: {}
      },
    };
  },
  methods: {
    showContent(index) {
      return this.currentTab == index;
    },
    /**
     * @tabindex 标记第几个表格
     */
    addOneTableRowData(tabindex) {
      this.$emit('addOneTableRowData', tabindex);
    },
    /**
     * @rowindex 行数据的标记
     */
    deleteOneTableRowData(row, currentPage, pageSize) {
      const tabindex = Number(this.currentTab);
      if (tabindex >= 0) this.$emit('deleteOneTableRowData', tabindex, row, currentPage, pageSize);
    },
    /**
     * 修改表格数据
     */
    alertOneTableRowData(row, currentPage, pageSize, force) {
      const tabindex = Number(this.currentTab);
      if (tabindex >= 0) this.$emit('alertOneTableRowData', tabindex, row, currentPage, pageSize, force);
    },
    onePageChange(val) {
      const tabindex = Number(this.currentTab);
      if (tabindex >= 0) this.$emit('onePageChange', tabindex, val);
    },
    onOnePageSizeChange(val) {
      const tabindex = Number(this.currentTab);
      if (tabindex >= 0) this.$emit('onOnePageSizeChange', tabindex, val);
    },
    getOnePageButtonFkChoose(val) {
      const tabindex = Number(this.currentTab);
      if (tabindex >= 0) this.$emit('getOnePageButtonFkChoose', tabindex, val);
    },
    /**
     * 导入
     */
    importData() {
      const componentData = {
        isAction: false,
        tempApi: '/p/cs/pm/v1/getModuleUrl',
        okApi: '/p/cs/pm/v1/parseExcel',
        okParm: { table: 'PS_C_SKU', mode: 'info' },
        tempParm: { 'mode': this.moduleMode },
        downErrorInfo: true,
        showErrorInfo: false,
        returnData: this.returnData,
      }
      this.importTable.componentData = componentData;
      this.$children.find(item => item.name === 'importTable').openConfirm();
    },
    /**
     * 返回值，用于弹框返回解析
     */
    returnData(data) {
      const tabindex = Number(this.currentTab);
      this.$emit('returnOneTableData', data, tabindex);
    },
    /**
     * 关闭弹框
     */
    closeDialog() {
      this.show_dialog = false;
    }
  },
  mounted() { }
};

import detailTable from '@/views/pages/promotionCenter/details/table';
import CTSIT from '@/views/pages/promotionCenter/details/CTSIT';
import tabList from '@/views/pages/promotionCenter/details/tabList';
import ButtonFkDialog from '@/views/pages/promotionCenter/components/buttonFkDialog';
// const _import = file =>
//   require("@/jordanComponents/views/" + file + ".vue").default;
import importDialog from '../components/importDialog';

export default {
  name: 'detailTabs',
  components: {
    detailTable,
    CTSIT,
    tabList,
    ButtonFkDialog,
    importDialog
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
        return itemdata;
      } catch (e) { }
    },
  },
  props: {
    current: {
      type: Number
    }, // 当前默认展示的tab
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
      dialogSet: { // 弹框层设置  标题、 隐藏底部 、是否遮罩
        dialogTitle: '',
        footerHide: true,
        mask: true,
      }
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
      const self = this;
      this.dialogModal = {};
      this.dialogModal.tableName = this.itemdata.reftable || 'PS_C_SKU';
      this.dialogModal.mode = this.moduleMode;
      // let  _component = "poptabdialog";
      // Vue.component(
      //   _component,
      //   Vue.extend(_import("onlinePromotion/components/importDialog"))
      // );
      // self.currentView = _component;
      self.dialogSet.dialogTitle = '导入';
      self.show_dialog = true;
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

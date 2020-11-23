import myInputLd from '@/views/pages/promotionCenter/components/tableinput';
import detailtable from '@/views/pages/promotionCenter/details/table.vue';
import ButtonFkDialog from '@/views/pages/promotionCenter/components/buttonFkDialog';
import TableSku from '@/views/pages/promotionCenter/components/tableSku';
import importDialog from '@/views/pages/promotionCenter/components/importDialog';

export default {
  name: 'batchTables',
  components: {
    myInputLd,
    detailtable,
    ButtonFkDialog,
    TableSku,
    importDialog
  },
  props: {
    productList: { type: Array },
    products_columns: {
      type: Array
    },
    gift_columns: {
      type: Array
    },
    itemdata: { type: Object },
    itemdata_gift: { type: Object }
  },
  data() {
    return {
      AutoRight: true,
      currentTab: 0,
      list_index: '',
      // currentView:'',   //弹框展示模块
      // popDialog:'',  //弹框
      dialogModal: {},
      show_dialog: false,
      dialogSet: {
        // 弹框设置
        dialogTitle: '',
        footerHide: true,
        mask: true
      },
      moduleMode: 'batch'
    };
  },
  watch: {},
  computed: {
    itemdataFk() {
      try {
        const rs = this.itemdata;
        const itemdata = JSON.parse(JSON.stringify(rs));
        itemdata.isOneData = false;
        itemdata.fkdisplay = 'mop';
        itemdata.isObject = true;
        return itemdata;
      } catch (e) {
        throw new Error(e);
      }
    },
    itemdata_giftFk() {
      try {
        const rs = this.itemdata_gift;
        const itemdata = JSON.parse(JSON.stringify(rs));
        itemdata.isOneData = false;
        itemdata.fkdisplay = 'mop';
        itemdata.isObject = true;
        return itemdata;
      } catch (e) {
        throw new Error(e);
      }
    }
  },
  methods: {
    changeActive(index) {
      this.list_index = index;
    },
    blurValue(event, row, listIndex, index, from, key) {
      this.$emit('blurValue', row, listIndex, index, from, key);
    },
    addList() {
      this.$emit('addList');
    },
    delIndexData(index) {
      this.productList.splice(index, 1);
    },
    getButtonFkChoose(index, from) {
      const rs = from === 'product' ? this.itemdataFk : this.itemdata_giftFk;
      const namelist = JSON.parse(rs.pid).nameList;
      namelist.forEach(obj => {
        const row = {};
        if (rs.reftable === 'SG_B_CHANNEL_PRODUCT') {
          row.ECODE = obj.PS_C_SKU_ECODE || '';
          row.ENAME = obj.PS_C_PRO_ENAME || '';
          row.SKU_ID = obj.SKU_ID || '';
          row.ID = obj.ID || '';
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
        this.addRowData(index, from, row);
      });
    },
    addRowData(index, from, row) {
      this.$emit('addRowData', index, from, row);
    },
    deleteRowData(row, index, from) {
      this.$emit('deleteRowData', row, index, from);
    },
    handleChangeds(itemdata, listIndex, index, from) {
      let obj = {};
      if (from === 'gift') {
        obj = this.productList[listIndex].gift_products[index];
      } else {
        obj = this.productList[listIndex].products[index];
      }
      if (!itemdata.pid) {
        itemdata.ENAMECOL = itemdata.ECODECOL = '';
        if (itemdata.reftable === 'SG_B_CHANNEL_PRODUCT') {
          obj.ENAME = itemdata.ENAMECOL = '';
          obj.ECODE = itemdata.ECODECOL = '';
          obj.SKU_ID = '';
          obj.SUM = '';
        } else if (rs.reftable === 'IP_C_TAOBAO_PRODUCT') {
          obj.ECODE = itemdata.NUM_IID = '';
          obj.ENAME = itemdata.TITLE = '';
          obj.ID = itemdata.ID = '';
        } else if (rs.reftable === 'PS_C_PRO') {
          obj.ECODE = itemdata.ECODE = '';
          obj.ENAME = itemdata.ENAME = '';
          obj.ID = itemdata.ID = '';
        } else {
          obj.ENAME = itemdata.ENAMECOL = '';
          obj.ECODE = itemdata.ECODECOL = '';
          obj.ID = '';
        }
      }
      const channelList = itemdata.channelList;
      if (itemdata.reftable === 'SG_B_CHANNEL_PRODUCT') {
        obj.ENAME = itemdata.ENAMECOL = channelList.PS_C_PRO_ENAME;
        obj.ECODE = itemdata.ENAMECOL = channelList.PS_C_SKU_ECODE;
        obj.SKU_ID = channelList.SKU_ID;
        obj.SUM = channelList.PRICE;
      } else {
        obj.ENAME = itemdata.ENAMECOL = channelList.ENAME;
        obj.ECODE = itemdata.ECODECOL = channelList.ECODE;
        obj.ID = channelList.ID;
      }
      obj.itemdata = itemdata;
    },
    /**
     *  表格支持商品模糊选中
     * @item 商品信息
     * @row 行信息
     */
    getFilterChooseItem(item, row, listIndex, index, from) {
      const self = this;
      let obj = {};
      const rs = from === 'product' ? this.itemdataFk : this.itemdata_giftFk;
      if (from === 'gift') {
        obj = this.productList[listIndex].gift_products[index];
      } else {
        obj = this.productList[listIndex].products[index];
      }
      if (rs.reftable === 'SG_B_CHANNEL_PRODUCT') {
        obj.ENAME = item.PS_C_PRO_ENAME || '';
        obj.ECODE = item.PS_C_SKU_ECODE || '';
        obj.SKU_ID = item.SKU_ID || '';
        obj.ID = item.ID || '';
      } else if (rs.reftable === 'IP_C_TAOBAO_PRODUCT') {
        obj.ENAME = item.PS_C_PRO_ENAME || '';
        obj.ECODE = item.PS_C_SKU_ECODE || '';
        obj.ID = item.ID;
      } else if (rs.reftable === 'PS_C_PRO') {
        obj.ENAME = item.PS_C_PRO_ENAME || '';
        obj.ECODE = item.PS_C_PRO_ECODE || '';
        obj.ID = item.ID;
      } else {
        obj.ENAME = item.PS_C_PRO_ENAME;
        obj.ECODE = item.PS_C_SKU_ECODE;
        obj.ID = item.ID;
      }
    },
    /**
     *  清空表格行信息中的商品信息
     *  特殊情况下不能如此清空
     */
    clearFilterChooseItem(listIndex, index, from) {
      let obj = {};
      const rs = from === 'product' ? this.itemdataFk : this.itemdata_giftFk;
      if (from === 'gift') {
        obj = this.productList[listIndex].gift_products[index];
      } else {
        obj = this.productList[listIndex].products[index];
      }
      if (rs.reftable === 'SG_B_CHANNEL_PRODUCT') {
        if (obj.ENAME) obj.ENAME = '';
        if (obj.ECODE) obj.ECODE = '';
        if (obj.ID) obj.ID = '';
        if (obj.SKU_ID) obj.SKU_ID = '';
        if (obj.SUM) obj.SUM = '';
        if (obj.ALLSUM) obj.ALLSUM = '';
        if (obj.SG_PRO_ID) obj.SG_PRO_ID = '';
        if (obj.PRO_ECODE) obj.PRO_ECODE = '';
      } else if (rs.reftable === 'IP_C_TAOBAO_PRODUCT') {
        if (obj.ENAME) obj.PS_C_PRO_ENAME = '';
        if (obj.ECODE) obj.PS_C_SKU_ECODE = '';
        if (obj.ID) obj.ID = '';
      } else if (rs.reftable === 'PS_C_PRO') {
        if (obj.ENAME) obj.ENAME = '';
        if (obj.ECODE) obj.ECODE = '';
        if (obj.ID) obj.ID = '';
      } else {
        if (obj.ENAME) obj.ENAME = '';
        if (obj.ECODE) obj.ECODE = '';
        if (obj.ID) obj.ID = '';
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
      self.dialogSet.dialogTitle = '导入';
      self.show_dialog = true;
    },
    /**
     * 返回值，用于弹框导入返回调添加单个表
     */
    returnData(data) {
      if (data && data.length > 0) {
        this.$emit('batchImport', data);
      }
    },
    /**
     * 关闭弹框
     */
    closeDialog() {
      this.show_dialog = false;
    },
    /**
     * 按键
     */
    keyUpValue(event) {
      // event.target.value= event.target.value.match(/^[1-9]\d*/) ? event.target.value.match(/^[1-9]\d*/)[0] : '';
      event.target.value = event.target.value.replace(/[^0-9]+/, '');
      return event.target.value;
    }
  },
  mounted() {
    console.log('productList', this.productList);
  }
};

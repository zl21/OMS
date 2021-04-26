import detailtable from 'allpages/promotionCenter/details/table.vue';
import batchTables from 'allpages/promotionCenter/details/batchTables';
import SingleBox from 'professionalComponents/singleBox';
import tableCols from '@/assets/js/promotion/columns.js';

export default {
  name: 'InfoSet',
  components: {
    detailtable,
    batchTables,
    SingleBox,
  },
  props: {
    basicData: {
      type: Object,
    },
    infoData: {
      type: Object,
    },
    objid: {
      type: String,
    },
  },
  data() {
    return {
      vmI18n: window.vmI18n,
      products_columns: tableCols.productsColumns,
      itemdata_xitong: {
        col: 1,
        colid: this.$store.state.customize.forginkeys.columnIds.sku || '1700806532',
        colname: 'PS_C_PRO_ID',
        datelimit: 'all',
        display: 'text',
        fkdesc: '门店档案',
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
        fkdesc: '门店档案',
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
      },
      itemdata_xitong_pro: {
        // 系统商品款号
        col: 1,
        colid:
          this.$store.state.customize.forginkeys.columnIds.pro || '1700806532',
        colname: 'PS_C_PRO_ID',
        datelimit: 'all',
        display: 'text',
        fkdesc: '门店档案',
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
        // colid: this.$store.state.forginkeys.columnIds.plateform_pro || '1700806533',
        colid: '1700806533',
        colname: 'IP_C_TAOBAO_PRODUCT_ID',
        datelimit: 'all',
        display: 'text',
        fkdesc: '门店档案',
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
    };
  },
  computed: {
    groups() {
      return this.$store.state.customize.forginkeys.groups;
    },
    itemdata() {
      // this.clearPdts();
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
      return itemdata;
    },
    itemdata_gift() {
      return JSON.parse(JSON.stringify(this.itemdata_xitong));
    },
    gift_columns() {
      const cols = JSON.parse(JSON.stringify(this.tableCols.giftColumns));
      cols.forEach((column) => {
        if (column.key === 'ECODE') {
          // column.width = 200;
        }
        if (column.key === 'SUM_QTY') {
          if (
            (this.basicData && this.basicData.status === '1')
            || this.objid == '-1'
          ) {
            column.render = (h, params) => h('div', {}, params.row.SUM);
          } else {
            delete column.render;
            this.$set(column, 'render', null);
          }
        }
        if (column.key === 'SEND_QTY') {
          if (
            (this.basicData && this.basicData.status === '1')
            || this.objid == '-1'
          ) {
            column.render = (h) => h('div', {}, 0);
          } else {
            delete column.render;
            this.$set(column, 'render', null);
          }
        }
      });
      return cols;
    },
    // products_columns() {
    //   let cols = JSON.parse(JSON.stringify(this.tableCols.productsColumns));
    //   cols.forEach(column => {
    //     if (column.key === "ECODE") {
    //       column.width = 200;
    //     }
    //   });
    //   return cols;
    // },
    tableCols() {
      return tableCols;
    },
  },
  watch: {
    'infoData.products_origin': {
      handler(val) {
        const cols = JSON.parse(JSON.stringify(this.tableCols.productsColumns));
        const colsxt = JSON.parse(
          JSON.stringify(this.tableCols.productsColumnsxt)
        );
        const colspt = JSON.parse(
          JSON.stringify(this.tableCols.productsColumnspt)
        );
        switch (val) {
          case '1':
          case '2':
            setProColumns(cols);
            break;
          case '3':
            setProColumns(colsxt);
            break;
          default:
            setProColumns(colspt);
            break;
        }
      },
    },
  },
  methods: {
    setProColumns(x) {
      x.forEach((column) => {
        if (column.key === 'ECODE') {
          column.width = 200;
        }
      });
      this.products_columns = x;
    },
    blurValue(row, listIndex, index, from, key) {
      if (from === 'gift') {
        this.infoData.list[listIndex].gift_products[index][key] = row[key];
      } else {
        this.infoData.list[listIndex].products[index][key] = row[key];
      }
    },
    addList() {
      this.infoData.list.push({ gift_products: [], products: [] });
      this.addRowData(this.infoData.list.length - 1, 'product');
      this.addRowData(this.infoData.list.length - 1, 'gift');
    },
    productsFromChange(val) {
      this.infoData.list = [{ gift_products: [], products: [] }];
      this.infoData.products_origin = val;
    },
    checkBuyerLimitFrequencyChange(val) {
      this.infoData.gift_doubles = val;
    },
    checkGiftChange(val) {
      this.infoData.gift_methods = val;
    },
    addRowData(index, from, row) {
      // 添加
      const self = this;
      const obj = {};
      if (from === 'gift') {
        self.gift_columns.forEach((col) => {
          obj[col.key] = row && row[col.key] ? row[col.key] : '';
        });
        if (row && row.ID) obj.ID = row.ID;
        self.infoData.list[index].gift_products.push(obj);
      } else {
        self.products_columns.forEach((col) => {
          obj[col.key] = row && row[col.key] ? row[col.key] : '';
        });
        if (row && row.ID) obj.ID = row.ID;
        if (row && row.SKU_ID) obj.SKU_ID = row.SKU_ID;
        self.infoData.list[index].products.push(obj);
      }
    },
    deleteRowData(row, index, from) {
      const self = this;
      const rowIndex = row._index;
      if (from === 'gift') {
        if (self.infoData.list[index].gift_products.length <= 1) {
          this.$message({
            type: 'warning',
            message: '至少保留一条赠品信息',
          });
          return;
        }
        self.infoData.list[index].gift_products.splice(rowIndex, 1);
      } else {
        if (self.infoData.list[index].products.length <= 1) {
          this.$message({
            type: 'warning',
            message: '至少保留一条条件信息',
          });
          return;
        }
        self.infoData.list[index].products.splice(rowIndex, 1);
      }
    },
    clearPdts() {
      this.infoData.list = [{ gift_products: [], products: [] }];
    },
    /**
     * 批量录入
     */
    batchImport(data) {
      const self = this;
      data.forEach((item, index) => {
        let obj = this.infoData.list[index];
        try {
          if (obj) {
            obj.products = obj.products.concat(item.rules);
            obj.gift_products = obj.gift_products.concat(item.gifts);
          } else {
            obj = {};
            obj.products = item.rules;
            obj.gift_products = item.gifts;
            this.infoData.list.push(obj);
          }
        } catch (e) {
          // console.log("批量导入解析出现问题...");
          self.$message({ type: 'error', message: self.vmI18n.t('modalTips.r7') });
        }
      });
    },
  },

  mounted() {
    // console.log("infoData", this.infoData);
    this.addRowData(0, 'product');
    this.addRowData(0, 'gift');
    console.log('infoData', this.infoData);
  },
};

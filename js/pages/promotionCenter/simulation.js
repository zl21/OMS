// import myInput from 'framework/components/element/input';
import myInput from 'professionalComponents/fkinputPlus.vue';
import detailtable from 'allpages/promotionCenter/details/table.vue';
// import MultipleBox from 'professionalComponents/multipleBox.vue';
import SingleBox from 'professionalComponents/singleBox.vue';
import ButtonFkDialog from 'professionalComponents/buttonFkDialog.vue';
import { tableCols as tabList } from './promotion.config';
import businessButton from 'professionalComponents/businessButton';
import groups from '@/assets/js/promotion/groups';
import promotionMixin from './promotion.mixin';

export default {
	mixins: [promotionMixin()],
  data() {
    return {
      btnConfig: {
        btnsite: 'right',
        typeAll: 'default',
        buttons: [
          {
            text: $i18n.t('common.cancel'), // 取消
            btnclick: () => {
              this.close();
            }
          },
          {
            text: $i18n.t('btn.simulation_trial_calculation'), // 仿真试算
            btnclick: () => {
              this.execute_simulation();
            }
          },
        ]
      },
      basicData: {
        time_limit: '', // 时间范围
        time_type: '1', // 时间类型
        order_list: '1', // 订单类型
        platform_mark: '', // 平台标记
        buy_ranking: '', // 购买排名
        vendor_remark: '', // 卖家备注
        buyer_message: '', // 买家留言
        receiving_porvince: {
          isActive: true,
          isdisabled: false,
          itemdata: {
            colid: 180257,
            serviceId: "r3-cp",
            colname: 'RECEIVER_PROVINCE',
            fkdisplay: 'drp',
            isfk: true,
            isnotnull: true,
            // name: "收货省份",
            name: $i18n.t('form_label.receiving_province'),
            readonly: false,
            valuedata: '',
            notForm: true,
            version:'1.4'
          }
        }, // 收货省份
        stores: {
          isActive: true,
          isdisabled: false,
          itemdata: {
            colid: 171929,
            colname: 'CP_C_SHOP_ID',
            fkdisplay: 'drp',
            isfk: true,
            isnotnull: true,
            // name: "店铺名称",
            name: $i18n.t('table_label.shopName'),
            readonly: false,
            refobjid: '',
            valuedata: '',
            notForm: true,
            version:'1.4'
          }
        } // 店铺名称
      },
      itemdata: {
        // 平台商品
        colid: 1700806533,
        colname: `SG_B_CHANNEL_PRODUCT_ID${Math.floor(Math.random() * 100)}`,
        fkdesc: '门店档案',
        fkdisplay: 'drp',
        isfk: true,
        isnotnull: false,
        name: '',
        readonly: false,
        reftable: 'SG_B_CHANNEL_PRODUCT',
        reftableid: 24801,
        valuedata: '',
        isObject: true,
        isSimulation: true,
        notForm: true,
        isGetValue: true
      },
      products_columns: tabList.products_columns,
      result_columns: tabList.result_columns,
      result_data: [], // 试算执行结果列表
      treePropsData: { children: 'productList' },
      products_data: [], // 商品列表
      currentTab: 0, // 当前选中
      productslistView: {
        current: 1,
        total: 0,
        pageSize: 10
      },
      productsArrsView: []
    };
  },
  props: [],
  components: {
    businessButton,
    myInput,
    detailtable,
    // MultipleBox,
    SingleBox,
    ButtonFkDialog
  },
  computed: {
    itemdataFk() {
      try {
        const rs = this.itemdata;
        const itemdata = JSON.parse(JSON.stringify(rs));
        itemdata.isOneData = false;
        itemdata.fkdisplay = 'mop';
        itemdata.isObject = true;
        itemdata.version = '1.4';
        itemdata.serviceId = 'r3-sg';
        return itemdata;
      } catch (e) {
        throw new Error(e);
      }
    }
  },
  watch: {
    basicData: {
      handler() {
        this.result_data = [];
      },
      deep: true
    },
    products_data: {
      handler() {
        this.result_data = [];
      },
      deep: true
    }
  },
  methods: {
    handleTimeLimitChange(val) {
      this.basicData.time_limit = val;
    },
    mergeCells() { },
    checkTimeTypeChange(val) {
      this.basicData.time_type = val;
    },
    checkOrderTypeChange(val) {
      this.basicData.order_list = val;
    },
    checkPlatformChange(val) {
      this.basicData.platform_mark = val;
    },
    add_prolist(objRow) {
      const obj = {};
      this.products_columns.forEach(col => {
        if (col.key == 'ALLSUM') {
          obj[col.align] = 'right';
          obj[col.color] = 'red';
        }
        if (col.key == 'NUM' && !obj[col.key]) {
          obj[col.key] = 1;
          obj[col.align] = 'right';
        } else {
          obj[col.key] = objRow.ECODE ? objRow[col.key] : '';
        }
      });
      this.products_data.push(obj);
      this.countTablelistView();
    },
    del_prolist(row, currentPage, pageSize) {
      const rowCount = (currentPage - 1) * pageSize;
      const index = rowCount + row._index;
      this.products_data.splice(index, 1);
      console.log('this.products_data', JSON.stringify(this.products_data));
      this.countTablelistView();
    },
    /**
     * 切换非tab页面的表格的页数
     */
    pageChange(val) {
      this.productslistView.current = val;
      this.tablelistView(this.products_data, this.productslistView);
    },
    /**
     * 切换非tab页面的表格的页长度
     */
    onPageSizeChange(val) {
      this.productslistView.pageSize = val;
      this.tablelistView(this.products_data, this.productslistView);
    },
    /**
     * 单表格添加和删除 灵活展示表格
     */
    countTablelistView() {
      const rows = this.products_data || [];
      const obj = this.productslistView;
      const pageSize = obj.pageSize || 10;
      const pagesLen = Math.ceil(rows.length / pageSize);
      if (obj.current > pagesLen) obj.current = pagesLen;
      if (pagesLen === 0) obj.current = 1;
      this.tablelistView(rows, this.productslistView);
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
    async getButtonFkChoose() {
      const rs = this.itemdataFk || {};
      let namelist = JSON.parse(rs.pid).nameList;
      if (rs.isGetValue) {
        namelist = await this.isGetIndexValue(rs.reftable, namelist);
      }
      namelist.forEach(obj => {
        const row = {};
        if (['PS_C_SKU', 'SG_B_CHANNEL_PRODUCT'].includes(rs.reftable)) {
          row.ECODE = obj.PS_C_SKU_ECODE || '';
          row.ENAME = obj.PS_C_PRO_ENAME || '';
          row.SUM = Number(obj.PRICE) || '';
          row.SKU_ID = obj.SKU_ID || '';
          row.ID = obj.ID;
          row.NUM = 1;
          row.PRO_ECODE = obj.PS_C_PRO_ECODE;
          row.SG_PRO_ID = obj.NUMIID;
          row.ALLSUM = Number(row.SUM * row.NUM).toFixed(2);
        }
        this.add_prolist(row);
      });
    },
    async isGetIndexValue(reftable, nameList) {
      const arr = [];
      console.log('nameList++++++', nameList);
      const simParam = new URLSearchParams();
      nameList.forEach((item) => {
        arr.push(item.ID);
      });
      const params = {
        table: reftable,
        ids: arr
      };
      simParam.append('param', JSON.stringify(params));
      return new Promise(async (resolve) => {
        const {
          data: { code, message, data }
        } = await this.service.promotionCenter.selectProInfo(simParam);
        console.log(code, message, data);
        if (code === 0) {
          resolve(data);
        }
      });
    },
    async execute_simulation() {
      const self = this;
      const checkSimulation = this.checkSimulation();
      if (checkSimulation.code == '-1') {
        self.$Message.warning(checkSimulation.message);
        return;
      }
      //  仿真试算
      const params = {
        basicData: this.basicData,
        products_data: this.products_data
      };
      const formData = new URLSearchParams();
      formData.append('param', JSON.stringify(params));
      const {
        data: { code, message, data }
      } = await this.service.promotionCenter.testPm(formData);
      console.log(code, message, data);
      if (code === 0) {
        console.log('data', data);
        self.result_data = data.result;
        self.result_columns = data.cloumns;
        self.$Message.success($i18n.t('modalTips.t5'));
      } else {
        self.result_data = [];
      }
    },
    initData() {
      // 初始化数据
      try {
        const groups = this.groups;
        this.basicData.time_type = groups.timeTypes.find(item => item.value == 2).value;
        this.basicData.order_list = groups.orderTypes.find(item => item.value == 1).value;
        // this.basicData.platform_mark = groups.platformTabs.find((item)=>{
        //     return item.title == '手机';
        // }).value;
        this.basicData.receiving_porvince.itemdata.valuedata = '';
        this.basicData.receiving_porvince.itemdata.pid = '';
        this.basicData.stores.itemdata.valuedata = '';
        this.basicData.stores.itemdata.pid = '';
        this.basicData.time_limit = ''; // 时间范围
        this.basicData.buy_ranking = ''; // 购买排名
        this.basicData.vendor_remark = ''; // 卖家备注
        this.basicData.buyer_message = ''; // 买家留言
        this.products_data = [];
      } catch (e) {
        console.log(e.stack);
      }
    },
    checkSimulation() {
      if (!this.basicData.stores.itemdata.pid) {
        return { code: '-1', message: $i18n.t('modalTips.t6') };
      }
      if (this.basicData.time_type === '') {
        return { code: '-1', message: $i18n.t('modalTips.t7') };
      }
      if (this.basicData.time_limit === '') {
        return { code: '-1', message: $i18n.t('modalTips.t8') };
      }
      if (this.basicData.order_list === '') {
        return { code: '-1', message: $i18n.t('modalTips.t9') };
      }
      // if(this.basicData.platform_mark === ""){
      //     return {code:"-1",message:"平台标记未填写"}
      // }
      if (!this.basicData.receiving_porvince.itemdata.pid) {
        return { code: '-1', message: $i18n.t('modalTips.s0') };
      }
      if (this.products_data.length == 0) {
        return { code: '-1', message: $i18n.t('modalTips.s1') };
      }
      for (let i = 0; i < this.products_data.length; i++) {
        const row = this.products_data[i];
        for (const j in row) {
          const notnull = ['ECODE', 'ENAME', 'NUM', 'SUM'];
          if (notnull.includes(j) && row[j] === '') {
            // return { code: -1, message: `商品列表第${i + 1}行数据未填写完毕` };
            return {
              code: -1,
              message: `${$i18n.t('modalTips.s2')}${i + 1}${$i18n.t('modalTips.s3')}`
            };
          }
        }
      }

      // return { code: 0, message: "校验完成" };
      return { code: 0, message: $i18n.t('modalTips.s4') };
    },
    /**
     *  修改行数据
     */
    alertRowData(row, currentPage, pageSize, force) {
      const rowCount = (currentPage - 1) * pageSize;
      const index = rowCount + row._index;
      this.deleteProperty(row);
      this.products_data.splice(index, 1, row);
      if (force) this.countTablelistView();
    },
    /**
     * 删除多余属性
     */
    deleteProperty(row) {
      delete row._index;
      delete row.colspan;
      delete row._rowKey;
    }
  },
  async created() {
    await groups.load();
    this.initData();
  },
  mounted() { }
};

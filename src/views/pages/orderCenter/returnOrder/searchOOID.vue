<template>
  <!-- 退换货订单-查询原始订单编号 -->
  <div class="searchOOID" v-loading="loading">
    <business-action-table
      :jordan-table-config="table"
      @on-row-click="onRowClick"
      @on-row-dblclick="onRowDblclick"
      @on-page-change="pageChange"
      @on-page-size-change="pageSizeChange"
    />
  </div>
</template>

<script>
// 退换货单详情
import businessButton from 'burgeonComponents/businessButton';
import businessActionTable from 'burgeonComponents/businessActionTable';
import { setTimeout } from 'timers';
import dateUtil from '@/assets/js/__utils__/date.js';

export default {
  name: 'searchOOID',
  components: {
    businessButton,
    businessActionTable,
  },
  data() {
    return {
      vmI18n: $i18n,
      loading: false,
      ID: this.$route.params.customizedModuleId && (this.$route.params.customizedModuleId != 'NEW' || this.$route.params.customizedModuleId != 'New') ? this.$route.params.customizedModuleId : '-1',
      backable: false,
      modal: false,
      getCurrenData: {},
      table: {
        columns: [], // 表头
        data: [], // 数据配置
        indexColumn: true, // 是否显示序号
        height: '270',
        loading: false,
        isShowSelection: true, // 是否显示checkedbox
        highlightRow: true, // 展示单选radio，结合isShowSelection使用
        pageShow: true, // 控制分页是否显示
        btnsShow: true, // 控制操作按钮是否显示
        searchInputShow: false, // 控制搜索框是否显示
        total: 0, // 设置总条数
        pageSizeOpts: [10, 20, 30, 50, 100], // 每页条数切换的配置
        pageSize: 10, // 每页条数
        pageIndex: 1, // 页码
        multiple: false,
        businessFormConfig: {
          formValue: {
            CP_C_SHOP_ID: "",
            SOURCE_CODE: '',
            PLATFORM_STATUS: '',
            ORDER_STATUS: ['1', '2'],
            BUYER_NICK: '',
            RECEIVER_NAME: '',
            RECEIVER_MOBILE: '',
            ORDER_DATE: [`${this.getData(7, true)}`, `${this.getData(7)}`],
            PAY_TIME: [`${this.getData(7, true)}`, `${this.getData(7)}`],
            BILL_NO: '',
          },
          formData: [
            {
              version: '1.4',
              style: 'popInput',
              width: '8',
              colname: 'CP_C_SHOP_ID',
              itemdata: {
                // serviceId: 'r3-cp',
                colid: 171929,
                colname: 'CP_C_SHOP_ID', // 当前字段的名称
                /* precolnameslist: [
                  {
                    premtype: 'CP_C_SHOP_PERMISSION_ID',
                    refcol: 'ID',
                    iswrite: 'true',
                  },
                ], */
                fkdisplay: 'mrp', // 外键关联类型
                isfk: true, // 是否有fk键
                isnotnull: false, // 是否必填
                name: '店铺', // 店铺名称
                readonly: false, // 是否可编辑，对应input   readonly属性
                reftable: 'CP_C_SHOP', // 对应的表
                reftableid: 10348, // 对应的表ID
                valuedata: '', // 这个是选择的值
              },
              oneObj: (e) => {
                console.log('店铺：', e);
                this.table.businessFormConfig.formValue.CP_C_SHOP_ID = e.pid;
                // this.threeObjs();
              },
            },
            {
              style: 'input',
              label: $i18n.t('form_label.platform_billNo'), // 平台单号
              colname: 'SOURCE_CODE',
              width: '8',
              // inputenter: () => this.queryBounced(),
            },
            /* {
              style: 'select',
              label: '平台状态',
              colname: 'PLATFORM_STATUS',
              width: '8',
              options: [],
            }, */
            {
              style: '',
              label: '单据状态',
              colname: 'ORDER_STATUS',
              width: '8',
              multiple: true,
              options: [],
              selectChange: (val) => {
                this.table.businessFormConfig.formValue.ORDER_STATUS = val.value;
              },
            },
            {
              style: 'input',
              label: $i18n.t('table_label.buyerNickname'), // 买家昵称
              colname: 'BUYER_NICK',
              width: '8',
              // inputenter: () => this.queryBounced(),
            },
            {
              style: 'input',
              label: $i18n.t('form_label.consignee'), // 收货人
              colname: 'RECEIVER_NAME',
              width: '8',
              // inputenter: () => this.queryBounced(),
            },
            {
              style: 'input',
              label: $i18n.t('form_label.consignee_phone'), // 收货人手机
              colname: 'RECEIVER_MOBILE',
              width: '8',
              // inputenter: () => this.queryBounced(),
            },
            {
              style: "date",
              type: "datetimerange",
              label: "下单时间",
              colname: "ORDER_DATE",
              format: "yyyy/MM/dd HH:mm:ss",
              width: "8",
              icon: "md-alarm",
              placeholder: "",
              transfer: true,
              ghost: false, // 是否关闭幽灵按钮，默认开启
              onChange: () => {
                let time = this.table.businessFormConfig.formValue.ORDER_DATE;
                if (time[0]) {
                  // this.table.businessFormConfig.formValue.ORDER_DATE = this.formatDate(time);
                } else {
                  this.table.businessFormConfig.formValue.ORDER_DATE = '';
                }
              },
              clearable: true,
            },
            {
              style: "date",
              type: "datetimerange",
              label: "支付时间",
              colname: "PAY_TIME",
              format: "yyyy/MM/dd HH:mm:ss",
              width: "8",
              icon: "md-alarm",
              placeholder: "",
              transfer: true,
              ghost: false, // 是否关闭幽灵按钮，默认开启
              onChange: () => {
                let time = this.table.businessFormConfig.formValue.PAY_TIME;
                if (time[0]) {
                  // this.table.businessFormConfig.formValue.PAY_TIME = this.formatDate(time);
                } else {
                  this.table.businessFormConfig.formValue.PAY_TIME = '';
                }
              },
              clearable: true,
            },
            {
              style: 'input',
              label: $i18n.t('form_label.billNo'), // 订单编号
              colname: 'BILL_NO',
              width: '8',
              // inputenter: () => this.queryBounced(),
            },
          ],
        },
        businessButtonConfig: {
          typeAll: 'default', // 按钮统一风格样式
          btnsite: "right",
          buttons: [
            {
              text: $i18n.t('btn.reset'),//'重置'
              disabled: false, // 按钮禁用控制
              btnclick: () => {
                this.formEmpty(this, 'formConfig', ['ORDER_DATE', 'PAY_TIME']);
                this.queryEnter(0, this.table.pageSize, true);
              }, // 按钮点击事件
            },
            {
              text: $i18n.t('btn.find'), // 查找 按钮文本
              disabled: false, // 按钮禁用控制
              type: 'primary',
              btnclick: () => {
                this.queryEnter(0, this.table.pageSize, true);
              }, // 按钮点击事件
            },
          ],
        }
      },
    };
  },
  created() {
    console.log();
  },
  destroyed() {

  },
  mounted() {
    this.$nextTick(async () => {
      await this.initObjItem(-1);
      // 初始化form后给时间赋值
      this.table.businessFormConfig.formValue.ORDER_DATE = [`${this.getData(7, true)}`, `${this.getData(0)}`];
      this.table.businessFormConfig.formValue.PAY_TIME = [`${this.getData(7, true)}`, `${this.getData(0)}`];
      // 获取
      this.queryEnter();
    });
  },
  methods: {

    /* --------------------- 工具函数： --------------------- */
    // 清空表单
    formEmpty(_this, form, notvalueArr = [], notdrpArr = []) {
      _this[form].formData.forEach((it) => {
        if (it.itemdata && !notdrpArr.includes(it.colname)) {
          it.itemdata.pid = '';
          it.itemdata.valuedata = '';
        }
      })
      for (const key in _this[form].formValue) {
        if (!notvalueArr.includes(key)) {
          _this[form].formValue[key] = ''
        }
      }
      return _this[form]
    },
    // 获取几天前日期 0获取当前日期
    getData(day, startTime) {
      let date = startTime ? this.formatDate(new Date().setHours(0, 0, 0, 0) - 86400 * day * 1000) : this.formatDate(new Date().setHours(23, 59, 59, 0) - 86400 * day * 1000)
      return date;
    },
    // 时间戳格式化
    formatDate(time) {
      if (time instanceof Array && time[0]) {
        const start = dateUtil.getFormatDate(time[0], 'yyyy-MM-dd HH:mm:ss');
        const end = dateUtil.getFormatDate(time[1], 'yyyy-MM-dd HH:mm:ss');
        return start + '~' + end
      } else {
        const date = new Date(time);
        const resTime = dateUtil.getFormatDate(date, 'yyyy-MM-dd HH:mm:ss');
        return resTime
      }
    },
    keyDown() { },
    // 初始化form表单
    async initObjItem(id) {
      const self = this;
      this.loading = true;
      let formData = new FormData();
      formData.append("table", 'OC_B_ORIG_ORDER');
      formData.append("getcmd", 'y');
      const res = await this.service.common.getTableQuery(formData);
      // let base = res?.data?.data?.datas?.dataarry || [];
      let base = res.data.data.datas.dataarry || [];
      base.map(it => {
        it.name = it.coldesc;
        it.display = it.display == 'OBJ_SELECT' ? 'select' : it.display;
      })
      self.table.businessFormConfig = this.$OMS2.omsUtils.initFormConfig(
        base,
        self.table.businessFormConfig
      );
      setTimeout(() => {
        this.loading = false;
      }, 100);
    },
    async queryEnter(page = 0, pageSize = 10, showData) {
      this.$emit('getRowData', {});
      console.log(page, pageSize);
      const self = this;
      if (page >= 1) page = `${page - 1}0`
      // 清空数据
      this.table.loading = true,
        this.table.data = [];
      // 获取查询条件
      let { CP_C_SHOP_ID, SOURCE_CODE, PLATFORM_STATUS, ORDER_STATUS, BUYER_NICK, RECEIVER_NAME, RECEIVER_MOBILE, ORDER_DATE, PAY_TIME, BILL_NO } = self.table.businessFormConfig.formValue;
      // 处理时间格式
      if (ORDER_DATE[0]) {
        ORDER_DATE = `${this.formatDate(ORDER_DATE[0])}~${this.formatDate(ORDER_DATE[1])}`
      }
      if (PAY_TIME[0]) {
        PAY_TIME = `${this.formatDate(PAY_TIME[0])}~${this.formatDate(PAY_TIME[1])}`
      }
      // 组合查询条件
      let fixedcolumns = {
        CP_C_SHOP_ID,//店铺
        SOURCE_CODE,//平台
        PLATFORM_STATUS,//平台状态
        ORDER_STATUS: ["1", "2"],//订单状态
        BUYER_NICK,// 昵称
        RECEIVER_NAME, //收货人姓名
        RECEIVER_MOBILE, //收货人手机号
        ORDER_DATE, // 
        PAY_TIME,//
        BILL_NO,
      };
      for (const key in fixedcolumns) {
        if (!fixedcolumns[key]) delete fixedcolumns[key];
      }
      let searchdata = { "table": "OC_B_ORIG_ORDER_TABLE", "startindex": page, "range": pageSize, "fixedcolumns": fixedcolumns, "column_include_uicontroller": true, "isolr": false };
      let formData = new FormData();
      formData.append("searchdata", JSON.stringify(searchdata));
      // 调用查询接口
      const { data: { code, data } } = await self.service.common.QueryList(formData, { serviceId: "r3-oc-oms" });
      this.table.loading = false;
      if (code === 0) {
        // 处理表头和数据
        if (data.tabth[0].colname == 'ID') data.tabth.splice(0, 1);
        this.table.columns = data.tabth.map(element => ({ title: `${element.name}`, key: `${element.colname}`, dataAcessKey: `${element.colname}` }));
        // 是否显示数据
        if (showData) {
          let tableKey = data.row.length ? Object.keys(data.row[0]) : []; // 获取行数据的key
          this.getCurrenData = data.row.length ? data.row : [];
          this.table.total = data.totalRowCount
          data.row.forEach((item) => { //处理数据
            let curentData = {}
            tableKey.forEach(element => curentData[element] = item[element].val);
            this.table.data.push(curentData)
          });
        }
      }
    },
    onRowClick(row, index) {
      const self = this;
      console.log(row, index);
      this.$emit('getRowData', this.getCurrenData[index]);
    },
    onRowDblclick(row) {
      const self = this;
      console.log(row);
    },
    pageChange(page) {
      console.log('page:', page);
      this.table.pageIndex = page;
      this.queryEnter(page, this.table.pageSize, true)
    },
    pageSizeChange(size) {
      this.table.pageSize = size;
      this.queryEnter(0, size, true)
    }
  },
};

</script>

<style lang="less" scoped>
</style>

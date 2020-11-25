import { timestampToTime } from '@/assets/js/__utils__/usual';
import logTable from 'professionalComponents/LogTable';
import businessButton from 'professionalComponents/businessButton';

export default {
  components: {
    logTable,
    businessButton
  },
  data() {
    return {
      show: '',
      s: [],
      providesList: [],
      btnConfig: {
        typeAll: 'error', // 按钮统一风格样式
        buttons: [
          {
            text: '保存', // 查找 按钮文本
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              this.save();
            } // 按钮点击事件
          },
          {
            text: '返回', // 查找 按钮文本
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              R3.store.commit('global/tabOpen', {
                type: 'S',
                tableName: 'ST_C_AUTOCHECK',
                tableId: 24634,
                back: true,
              });
            } // 按钮点击事件
          }
        ]
      },
      isChange: {
        orderType: false,
        beginEndTimeChange: false
      },
      result: {},
      collapseShow: ['1', '2', '3', 'auditCondition'],
      collapseLog: ['1'],
      info: {},
      data1: {},
      startindex: 0,
      totalRowCount: 0, // c
      pageSize: 10, // c
      defaultSelected: [],
      AutoData: [],
      dataEmptyMessage: '数据加载中...', // c
      columns: ['name', 'value'], // 展现的组
      IS_AUTOCHECK_ORDER: false,
      IS_AUTOCHECK_PAY: false,
      IS_FULL_GIFT_ORDER: false,
      IS_MANUAL_ORDER: false,
      IS_MERGE_ORDER: false, // 是否可合并
      orderType: [''],
      indeterminate: false,
      checkAll: false,
      effectiveCondition: [
        {
          key: 0,
          value: false
        },
        {
          key: 1,
          value: false
        },
        {
          key: 2,
          value: false
        },
        {
          key: 3,
          value: false
        },
        {
          key: 4,
          value: false
        },
        {
          key: 5,
          value: false
        },
        {
          key: 6,
          value: false
        },
        {
          key: 7,
          value: false
        }
      ],
      EXCLUDE_SKU_TYPE: 1,
      CREATIONDATE: '',
      MODIFIEDDATE: '',
      CP_C_LOGISTICS_ID_SELECT: {
        selectDatas: [],
        datas: {
          start: 0,
          tabth: [
            {
              colname: 'ID',
              name: 'ID',
              show: false
            },
            {
              colname: 'ENAME',
              name: '物流公司',
              show: true
            },
          ],
          row: []
        },
        totalRowCount: 100,
        pageSize: 999999,
      },
      CP_C_LOGISTICS_ID: ','
    };
  },
  mounted() {
    this.getAutoCheck().then(() => {
      this.QueryList();
    });
    this.queryLogisticsCompany();
  },
  methods: {
    queryLogisticsCompany() {
      // TODO refcolid
      const query = new FormData();
      query.append('searchdata', JSON.stringify({
        refcolid :167630,
        isdroplistsearch: true,
        column_include_uicontroller: true,
        startindex: (this.CP_C_LOGISTICS_ID_SELECT.start - 1) * this.pageSize, // 起始下标
        range: this.CP_C_LOGISTICS_ID_SELECT.pageSize, // 每页个数
        fixedcolumns:{},
        multiple: [],
      }));
      this.service.common.QueryList(query).then(res=>{
        this.$nextTick(()=>{
          console.log("CP_C_LOGISTICS_ID_SELECT::res", res);
          this.CP_C_LOGISTICS_ID_SELECT.datas.row = res.data.datas.row;
          this.CP_C_LOGISTICS_ID_SELECT.totalRowCount = res.data.datas.totalRowCount;
        });
      });
    },
    selected(value) {
      console.log(value);
      this.providesList = value;
    },
    clearSelect() {
      this.providesList = [];
      this.info.CP_C_REGION_PROVINCE_ENAME = '';
      this.defaultSelected = [];
    },
    getAutoCheck() {
      const params = new URLSearchParams();
      params.append('id', this.$route.params.customizedModuleId);
      return (
        this.service.strategyPlatform
          .getAutoCheck(params)
          // return httpFormdata({
          //   method: 'post',
          //   url: '/p/cs/st/v1/getAutoCheck',
          //   headers: {
          //     'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
          //   },
          //   data: params
          // })
          .then(({ data }) => {
            if (data.data.code == 0) {
              this.info = data.data.data;
              this.IS_AUTOCHECK_ORDER = this.info.IS_AUTOCHECK_ORDER == 'Y';
              this.IS_AUTOCHECK_PAY = this.info.IS_AUTOCHECK_PAY == 'Y';
              this.IS_FULL_GIFT_ORDER = this.info.IS_FULL_GIFT_ORDER == 'Y';
              this.IS_MANUAL_ORDER = this.info.IS_MANUAL_ORDER == 'Y';
              this.IS_MERGE_ORDER = this.info.IS_MERGE_ORDER == 'Y';
              this.orderType = this.info.ORDER_TYPE ? this.info.ORDER_TYPE.split(',') : [];
              this.checkAll = this.orderType.length == 7;
              this.info.beginTime = this.info.BEGIN_TIME ? timestampToTime(this.info.BEGIN_TIME) : '';
              this.info.endTime = this.info.END_TIME ? timestampToTime(this.info.END_TIME) : '';
              const arr = new Set(this.info.EFFECTIVE_CONDITION ? this.info.EFFECTIVE_CONDITION.split(',') : []);

              if (this.info.CP_C_REGION_PROVINCE_ENAME) {
                this.info.CP_C_REGION_PROVINCE_ENAME.split(',').forEach(item => {
                  this.providesList.push({ ID: '-1', Label: item });
                });
              }
              this.effectiveCondition.forEach(item => {
                if (arr.has(item.key.toString())) {
                  item.value = true;
                }
              });
              this.EXCLUDE_SKU_TYPE = `${this.info.EXCLUDE_SKU_TYPE}`;
              this.CREATIONDATE = this.info.CREATIONDATE ? timestampToTime(this.info.CREATIONDATE) : '';
              this.MODIFIEDDATE = this.info.MODIFIEDDATE ? timestampToTime(this.info.MODIFIEDDATE) : '';
              return;
            }
            this.$Message.error(data.data.message);
          })
      );
    },
    QueryList() {
      const params = new URLSearchParams();
      params.append(
        'searchdata',
        JSON.stringify({
          isdroplistsearch: true,
          refcolid: 174707,
          fixedcolumns: {},
          startindex: this.startindex,
          range: this.pageSize
        })
      );
      this.service.strategyPlatform.QueryList(params).then(({ data }) => {
        if (data.code == 0) {
          this.totalRowCount = data.datas.totalRowCount;
          const d = data.datas.tabth;
          d.forEach(item => {
            item.show = true;
          });
          this.data1 = data.datas;
          const tempArr = (this.info.CP_C_REGION_PROVINCE_ENAME || '').split(',');
          tempArr.forEach(item => {
            // 翻页选择的时候防止多次输入到收货省份
            let flag = true;
            for (let i = 0; i < this.defaultSelected.length; i++) {
              const selectedItem = this.defaultSelected[i];
              if (item == selectedItem.Label) {
                flag = false;
                break;
              }
            }
            if (flag) {
              this.defaultSelected.push({ ID: -1, Label: item });
            }
          });
          this.defaultSelected.forEach(item => {
            this.data1.row.forEach(ele => {
              if (ele.ENAME.val == item.Label) {
                item.ID = ele.ID.val;
              }
            });
          });
        }
      });
    },
    handleCheckAll() {
      if (this.indeterminate) {
        this.checkAll = false;
      } else {
        this.checkAll = !this.checkAll;
      }
      this.indeterminate = false;

      if (this.checkAll) {
        this.orderType = ['1', '2', '3', '4', '5', '6', '7'];
      } else {
        this.orderType = [];
      }
      this.setResult('orderType');
    },
    setResult(type, e) {
      if (type == 'IS_AUTOCHECK_ORDER') {
        this.result.IS_AUTOCHECK_ORDER = this.IS_AUTOCHECK_ORDER ? 'Y' : 'N';
      } else if (type == 'IS_AUTOCHECK_PAY') {
        this.result.IS_AUTOCHECK_PAY = this.IS_AUTOCHECK_PAY ? 'Y' : 'N';
      } else if (type == 'IS_FULL_GIFT_ORDER') {
        this.result.IS_FULL_GIFT_ORDER = this.IS_FULL_GIFT_ORDER ? 'Y' : 'N';
      } else if (type == 'IS_MANUAL_ORDER') {
        this.result.IS_MANUAL_ORDER = this.IS_MANUAL_ORDER ? 'Y' : 'N';
      } else if (type == 'IS_MERGE_ORDER') {
        this.result.IS_MERGE_ORDER = this.IS_MERGE_ORDER ? 'Y' : 'N';
      } else if (type === 'AUDIT_WAIT_TIME' || type === 'WAIT_TIME' || type === 'RECEIVER_ADDRESS' || type === 'BUYER_REMARK' || type === 'SELLER_REMARK' || type === 'HOLD_WAIT_TIME' || type === 'UN_AUDIT_WAIT_TIME' || type === 'CP_C_LOGISTICS_ID' || type === 'ANTI_AUDIT_WAIT_TIME') {
        this.result[type] = this.info[type] ? this.info[type] : '';
      } else if (type == 'orderType') {
        if (this.orderType.length === 7) {
          this.indeterminate = false;
          this.checkAll = true;
        } else if (this.orderType.length > 0) {
          this.indeterminate = false;
          this.checkAll = false;
        } else {
          this.indeterminate = false;
          this.checkAll = false;
        }
        console.log('this.orderType:::', this.orderType);
        this.result.ORDER_TYPE = this.orderType.join(',');
      } else if (type == 'beginEndTime') {
        this.result.BEGIN_TIME = new Date(this.info.beginTime).getTime();
        this.result.END_TIME = new Date(this.info.endTime).getTime();
      } else if (type == 'AUDIT_PRICE') {
        this.result.AUDIT_PRICE_DOWN = parseFloat(this.info.AUDIT_PRICE_DOWN);
        this.result.AUDIT_PRICE_UP = parseFloat(this.info.AUDIT_PRICE_UP);
      } else if (type.indexOf('LIMIT_PRICE') > -1) {
        let price = `${e.target.value}`;
        price = price
          .replace(/[^\d.]/g, '') // 清除“数字”和“.”以外的字符
          .replace(/\.{2,}/g, '.') // 只保留第一个. 清除多余的
          .replace('.', '$#$')
          .replace(/\./g, '')
          .replace('$#$', '.')
          .replace(/^(\-)*(\d+)\.(\d\d\d\d).*$/, '$1$2.$3'); // 只能输入两个小数
        if (price.indexOf('.') < 0 && price != '') {
          // 以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
          price = parseFloat(price);
        }
        this.$nextTick(()=>{
          this.info[type] = price;
          this.result[type] = price;
        });
        // deprecated
        // this.result.LIMIT_PRICE_DOWN = parseFloat(this.info.LIMIT_PRICE_DOWN);
        // this.result.LIMIT_PRICE_UP = parseFloat(this.info.LIMIT_PRICE_UP);
      } else if (type == 'EXCLUDE_SKU_TYPE' || type == 'SKU_CONTENT') {
        this.result.EXCLUDE_SKU_TYPE = this.EXCLUDE_SKU_TYPE;
        this.result.SKU_CONTENT = this.info.SKU_CONTENT;
      } else if (type == 'effectiveCondition') {
        const a = [];
        this.effectiveCondition.forEach((item, i) => {
          if (item.value) {
            a.push(i);
          }
        });
        this.result.EFFECTIVE_CONDITION = a.join(',');
      }
    },
    changePage1(value) {
      console.log('changePage1::val', value);
      this.startindex = (value - 1) * this.pageSize;
      this.QueryList();
    },
    logisticSelected(e) {
      console.log('logisticSelected::e', e);
      this.CP_C_LOGISTICS_ID_SELECT.selectDatas = e;
      this.result.CP_C_LOGISTICS_ID = e.map(item=>item.ID).join(',');
    },
    logisticClear() {
      console.log('logisticClear');
      this.CP_C_LOGISTICS_ID_SELECT.selectDatas = [];
    },
    logisticInputValueChange() {
      console.log('logisticInputValueChange');
      const formdata = new FormData();
      const obj = {
        table: 'ST_C_VIPCOM_ASCRIPTION', startindex: this.datas.start, range: this.pageSize, fixedcolumns: { ENAME: e }, column_include_uicontroller: true, isolr: false
      };
      formdata.append('searchdata', JSON.stringify(obj));
      this.service.common.QueryList(formdata).then(res=>{
        console.log(res);
      });
    },
    InputValueChange(value) {
      this.AutoData = [];
      this.data1.row.forEach(item => {
        if (item.ENAME.val.includes(value)) {
          this.AutoData.push({
            id: item.ID.val,
            name: item.ENAME.val,
            ECODE: item.ECODE.val
          });
        }
      });
    },
    save() {
      const list = this.providesList.map(item => item.Label);
      this.result.CP_C_REGION_PROVINCE_ENAME = list.join(',');
      this.service.strategyPlatform
        .addAutoCheck({
          fixcolumn: {
            ST_C_AUTOCHECK: this.result
          },
          objid: this.$route.params.customizedModuleId
        })
        .then(({ data }) => {
          if (data.data.code == 0) {
            this.$Message.success(data.data.message);
            R3.store.commit('global/tabOpen', {
              type: 'S',
              tableName: 'ST_C_AUTOCHECK',
              tableId: 24634,
              back: true,
            });
            this.$destroy();
            return;
          }
          if (data.data.message) {
            this.$Message.error(data.data.message);
          } else {
            console.log('/p/cs/st/v1/addAutoCheck error');
          }
        });
    }
  }
};

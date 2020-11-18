import { timestampToTime } from '@/assets/js/__utils__/usual';
import logTable from 'professionalComponents/LogTable';

export default {
  components: {
    logTable
  },
  data() {
    return {
      show: '',
      s: [],
      providesList: [],
      // showColnameKey: [],
      oc: [
        {
          text: '保存',
          clickEv: () => {
            this.save();
          }
        },
        {
          text: '返回',
          clickEv: () => {
            R3.store.commit('global/tabOpen', {
              type: 'S',
              tableName: 'ST_C_AUTOCHECK',
              tableId: 24634
            });
          }
        }
      ],
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
      CP_C_LOGISTICS_ID_SELECT: [],
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
      const self = this;
      self.service.strategyPlatform.queryLogisticsCompany().then((res) => {
        if (res.data.code === 0) {
          const arr = [];
          res.data.data.forEach(item=>{
            const obj = {};
            obj.value = String(item.ID);
            obj.label = item.ENAME;
            arr.push(obj);
          });
          this.CP_C_LOGISTICS_ID_SELECT = arr;
        }
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
              // this.info.CP_C_REGION_PROVINCE_ENAME =
              // this.effectiveCondition = this.info.EFFECTIVE_CONDITION
              //   ? this.info.EFFECTIVE_CONDITION.split(",")
              //   : [];
              const arr = new Set(this.info.EFFECTIVE_CONDITION ? this.info.EFFECTIVE_CONDITION.split(',') : []);

              if (this.info.CP_C_REGION_PROVINCE_ENAME) {
                this.info.CP_C_REGION_PROVINCE_ENAME.split(',').forEach(item => {
                  this.providesList.push({ ID: '-1', Label: item });
                });
              }

              // this.effectiveCondition.map((item, i) => {
              //   arr.map(ele => {
              //     if (item.key == parseInt(ele)) {
              //       item.value = true;
              //     }
              //   });
              // });

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
      this.service.strategyPlatform
        .QueryList(params)
        .then(({ data }) => {
          if (data.code == 0) {
            this.totalRowCount = data.datas.totalRowCount;
            const d = data.datas.tabth;
            d.forEach(item => {
              item.show = true;
            });
            this.data1 = data.datas;
            this.info.CP_C_REGION_PROVINCE_ENAME
              ? this.info.CP_C_REGION_PROVINCE_ENAME.split(',').map(item => {
                  const o = {
                    ID: -1,
                    Label: item
                  };
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
                    this.defaultSelected.push(o);
                  }
                })
              : '';
            this.defaultSelected.map(item => {
              this.data1.row.map(ele => {
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
    setResult(type) {
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
      } else if (type === 'AUDIT_WAIT_TIME' || type === 'WAIT_TIME' || type === 'RECEIVER_ADDRESS' || type === 'BUYER_REMARK' || type === 'SELLER_REMARK' || type === 'HOLD_WAIT_TIME' || type === 'UN_AUDIT_WAIT_TIME' || type === 'CP_C_LOGISTICS_ID') {
        this.result[type] = this.info[type];
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
      } else if (type == 'LIMIT_PRICE') {
        this.result.LIMIT_PRICE_DOWN = parseFloat(this.info.LIMIT_PRICE_DOWN);
        this.result.LIMIT_PRICE_UP = parseFloat(this.info.LIMIT_PRICE_UP);
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
      this.startindex = (value - 1) * this.pageSize;
      this.QueryList();
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
      const p = this.providesList.map(item => item.Label);
      this.result.CP_C_REGION_PROVINCE_ENAME = p.join(',');
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
            this.oc[1].clickEv();
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

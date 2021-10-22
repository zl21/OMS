import { timestampToTime } from '@/assets/js/__utils__/usual';
import businessButton from 'professionalComponents/businessButton';

export default {
  components: {
    businessButton
  },
  props: {
    idArray: {
      type: Array
    }
  },
  data() {
    return {

      loading: false,
      show: '',
      s: [],
      providesList: [],
      btnConfig: {
        typeAll: 'error', // 按钮统一风格样式
        btnsite: 'center', // 按钮位置 (right , center , left)
        buttons: [
          {
            text: '取消',
            btnclick: async () => {
              this.$emit('closeActionDialog', false);
            }
          },
          {
            text: '确定', // 查找 按钮文本
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              this.save();
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
      IS_AUTOCHECK_ORDER: '',
      IS_AUTOCHECK_PAY: '',
      IS_FULL_GIFT_ORDER: '',
      IS_ZERO_AUTOCHECK: '',
      IS_MANUAL_ORDER: '',
      IS_MERGE_ORDER: '', // 是否可合并
      orderType: [],
      indeterminate: false,
      checkAll: false,
      effectiveCondition: [
        {
          key: 0,
          value: ''
        },
        {
          key: 1,
          value: ''
        },
        {
          key: 2,
          value: ''
        },
        {
          key: 3,
          value: ''
        },
        {
          key: 4,
          value: ''
        },
        {
          key: 5,
          value: ''
        },
        {
          key: 6,
          value: ''
        },
        {
          key: 7,
          value: ''
        },
        {
          key: 8,
          value: ''
        }
      ],
      EXCLUDE_SKU_TYPE: 1,
      CREATIONDATE: '',
      MODIFIEDDATE: '',
      CP_C_LOGISTICS_ID_SELECT: {
        selectDatas: [],
        defaultSelected: [],
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
        inputValue: '',
        modalValue: [],
        autoData: [],
        totalRowCount: 100,
        pageSize: 999999,
      },
    };
  },
  async mounted() {
    await this.queryLogisticsCompany();
  },
  methods: {
    async queryLogisticsCompany() {
      // TODO refcolid
      const query = new FormData();
      query.append('searchdata', JSON.stringify({
        refcolid: 169275,
        isdroplistsearch: true,
        column_include_uicontroller: true,
        startindex: (this.CP_C_LOGISTICS_ID_SELECT.start - 1) * this.pageSize, // 起始下标
        range: this.CP_C_LOGISTICS_ID_SELECT.pageSize, // 每页个数
        fixedcolumns: {},
        multiple: [],
      }));
      const res = await this.service.common.QueryList(query);
      this.$nextTick(() => {
        console.log('CP_C_LOGISTICS_ID_SELECT::res', res);
        this.CP_C_LOGISTICS_ID_SELECT.datas.row = res.data.datas.row;
        this.CP_C_LOGISTICS_ID_SELECT.totalRowCount = res.data.datas.totalRowCount;
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
          this.loading = false;
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
    setResult(type, e) {
      if (type == 'IS_AUTOCHECK_ORDER') {
        this.result.IS_AUTOCHECK_ORDER = this.IS_AUTOCHECK_ORDER;
      } else if (type == 'IS_AUTOCHECK_PAY') {
        this.result.IS_AUTOCHECK_PAY = this.IS_AUTOCHECK_PAY;
      } else if (type == 'IS_FULL_GIFT_ORDER') {
        this.result.IS_FULL_GIFT_ORDER = this.IS_FULL_GIFT_ORDER;
      } else if (type == 'IS_ZERO_AUTOCHECK') {
        this.result.IS_ZERO_AUTOCHECK = this.IS_ZERO_AUTOCHECK;
      } else if (type == 'IS_MANUAL_ORDER') {
        this.result.IS_MANUAL_ORDER = this.IS_MANUAL_ORDER;
      } else if (type == 'IS_MERGE_ORDER') {
        this.result.IS_MERGE_ORDER = this.IS_MERGE_ORDER;
      } else if (type === 'AUDIT_WAIT_TIME' || type === 'WAIT_TIME' || type === 'RECEIVER_ADDRESS' || type === 'BUYER_REMARK' || type === 'SELLER_REMARK' || type === 'HOLD_WAIT_TIME' || type === 'UN_AUDIT_WAIT_TIME' || type === 'CP_C_LOGISTICS_ID' || type === 'ANTI_AUDIT_WAIT_TIME' || type === 'SKU_LINE_NUM_UP' || type === 'SKU_LINE_NUM_DOWN') {
        this.result[type] = this.info[type] ? this.info[type] : '';
      } else if (type == 'orderType') {
        let arr = []
        this.orderType.map(item => {
          if (item !== 'N') {
            arr.push(item);
          }
        })
        this.result.ORDER_TYPE = arr.join(',');
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
        this.$nextTick(() => {
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
        if (e === "N") {
          this.$delete(this.info, 'SKU_LINE_NUM_UP');
          this.$delete(this.info, 'SKU_LINE_NUM_DOWN');
          this.$delete(this.result, 'SKU_LINE_NUM_UP');
          this.$delete(this.result, 'SKU_LINE_NUM_DOWN');
        }
        const a = [];
        this.effectiveCondition.forEach((item, i) => {
          if (item.value == 'Y') {
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
      this.result.CP_C_LOGISTICS_ID = e.map(item => item.ID).join(',');
    },
    logisticClear() {
      console.log('logisticClear');
      this.CP_C_LOGISTICS_ID_SELECT.selectDatas = [];
      this.CP_C_LOGISTICS_ID_SELECT.defaultSelected = [];
      this.info.CP_C_LOGISTICS_ID = '';
      this.result.CP_C_LOGISTICS_ID = '';
    },
    async logisticInputValueChange(e) {
      console.log('logisticInputValueChange');
      const formdata = new FormData();
      // const query = {
      //   ak: e.trim(),
      //   colid: 169275, // 排除物流公司
      //   fixedcolumns: {},
      // };
      // formdata.append('searchdata', JSON.stringify(query));
      formdata.append('ak', e.trim());
      formdata.append('colid', 169275);
      formdata.append('fixedcolumns', JSON.stringify({}));
      const res = await this.service.common.fuzzyquerybyak(formdata);
      if (res.data.code == 0) {
        this.CP_C_LOGISTICS_ID_SELECT.autoData = res.data.data;
      } else {
        this.CP_C_LOGISTICS_ID_SELECT.autoData = [];
      }
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
    judgeCondition() {
      // 限制条件勾选非空判断
      const effectiveCondition = this.effectiveCondition;
      if (effectiveCondition[1].value == 'Y') {
        if (!this.info.beginTime || !this.info.endTime) {
          this.$Message.error('付款时间为必填项,没有选择值!');
          return false;
        }
      }
      if (this.info.beginTime > this.info.endTime) {
        this.$Message.error('付款时间范围有误!');
        return false;
      }
      if (effectiveCondition[2].value == 'Y') {
        if (!this.info.LIMIT_PRICE_DOWN || !this.info.LIMIT_PRICE_UP) {
          this.$Message.error('订单金额（元）为必填项,没有输入值!');
          return false;
        }
      }
      if (this.info.LIMIT_PRICE_DOWN > this.info.LIMIT_PRICE_UP) {
        this.$Message.error('订单金额范围设置有误!');
        return false;
      }
      if (effectiveCondition[8].value == 'Y') {
        if (!this.info.SKU_LINE_NUM_UP || !this.info.SKU_LINE_NUM_DOWN) {
          this.$Message.error('SKU行数为必填荐，请录入值');
          return false;
        }
        if (this.info.SKU_LINE_NUM_UP > this.info.SKU_LINE_NUM_DOWN) {
          this.$Message.error('SKU行数有误!');
          return false;
        }
      }
      if (effectiveCondition[4].value == 'Y') {
        if (!this.info.RECEIVER_ADDRESS) {
          this.$Message.error('收货地址为必填项,没有输入值!');
          return false;
        }
      }
      return true;
    },
    save() {
      if (!this.judgeCondition()) return;
      console.log('this.result: ', this.result);
      const list = this.providesList.map(item => item.Label);
      this.result.CP_C_REGION_PROVINCE_ENAME = list.join(',');
      this.service.strategyPlatform
        .batchUpdateAutoCheck({
          fixcolumn: {
            ST_C_AUTOCHECK: this.result
          },
          objid: this.idArray.join(',')
        })
        .then(({ data }) => {
          console.log(data);
          if (data.code == 0) {
            this.$Message.success(data.message);
            this.$emit('closeActionDialog', false);
            document.getElementById('reset').click();
          } else {
            this.$Modal.confirm({
              title: data.message,
              width: 350,
              mask: true,
              render: h => {
                if (data.data) {
                  return h('Table', {
                    props: {
                      columns: [
                        {
                          title: 'ID',
                          key: 'id'
                        },
                        {
                          title: '提示信息',
                          key: 'message'
                        }
                      ],
                      data: data.data
                    }
                  });
                }
              }
            });
            document.getElementById('reset').click();
          }
        });
    }
  }
};

export default {
  components: {},
  props: {
    idArray: {
      default: []
    }
  },
  data() {
    return {
      // isError: false,
      // errorMessage: '',
      // transportStyle: {
      //   text: '',
      //   value: ''
      // },
      // autoData: [],
      // columns: ['ENAME', 'value'],
      // defaultSelected: [],
      // selectData: [],
      // list: [],
      btnConfig: {
        typeAll: 'error', // 按钮统一风格样式
        btnsite: 'right', // 按钮位置 (right , center , left)
        buttons: [{
          type: '', // 按钮类型
          text: $i18n.t('common.cancel'), // 取消
          icon: '', // 按钮图标
          size: 'small', // 按钮大小
          disabled: false, // 按钮禁用控制
          btnclick: () => {
            this.$emit('closeActionDialog');
          }, // 按钮点击事件
        }
        ],
      },
      // datas: {
      //   start: 0,
      //   tabth: [
      //     {
      //       colname: 'ID',
      //       name: 'ID',
      //       show: false
      //     },
      //     {
      //       colname: 'ENAME',
      //       name: $i18n.t('table_label.a3'), // '日程归属名称',
      //       show: true,
      //       isak: true
      //     },
      //   ],
      //   row: []
      // },
      formConfig: {
        formData: [
          {
            style: "popInput",
            width: "24",
            colname: "CP_C_PHY_WAREHOUSE_ID",
            itemdata: {
              colid: 172220,
              colname: "CP_C_PHY_WAREHOUSE_ID",
              name: "发货实体仓",
              valuedata: "",
              pid: "",
              fkdisplay: "mrp",
              isfk: true,
              isnotnull: true,
              readonly: true,
              isBackRowItem: true,
              AutoData: [{ ID: 1, value: 'item.ENAME' }],
              columnsKey: ['ECODE'],
              // hidecolumns: ['id', 'value', 'ENAME'],
            },
            oneObj: (e) => {},
          },
          {
            style: 'select',
            label: '承运商',
            value: 'CARRIER_CODE',
            width: '24',
            disabled: true,
            colname: 'CARRIER_CODE',
            selectChange: () => {}, // 选中事件，默认返回选中的值,默认返回当前值value
            options: [ // radio选项
              {
                value: '1',
                label: '唯品会专配',
              },
              {
                value: '2',
                label: '非唯品会专配',
              }
            ]
          },
          {
            style: 'input', // 输入框类型
            label: '航空禁运', // 输入框前文字
            colname: 'IS_AIR_EMBARGO_TEXT',
            value: 'IS_AIR_EMBARGO_TEXT', // 输入框的值
            width: '24', // 所占的宽度 (宽度分为24份,数值代表所占份数的宽度)
            disabled: true,
          },
          {
            style: 'time', // 输入框类型
            label: '发货时间', // 输入框前文字
            colname: 'SENDTIME',
            type: 'time',
            value: 'SENDTIME', // 输入框的值
            width: '24', // 所占的宽度 (宽度分为24份,数值代表所占份数的宽度)
            format: 'HH:mm:ss',
            disabled: true,
            onChange: () => {}
          },
          {
            style: 'time', // 输入框类型
            label: '入库单结单时间', // 输入框前文字
            colname: 'STATEMENT_TIME',
            type: 'time',
            value: 'STATEMENT_TIME', // 输入框的值
            width: '24', // 所占的宽度 (宽度分为24份,数值代表所占份数的宽度)
            format: 'HH:mm:ss',
            disabled: true,
            onChange: () => {}
          }
        ],
        formValue: {
          ID: '',
          CP_C_PHY_WAREHOUSE_ID: '',
          CP_C_PHY_WAREHOUSE_ENAME: '',
          CP_C_PHY_WAREHOUSE_ECODE: '',
          CARRIER_CODE: '', // 承运商
          SENDTIME: '', // 发货时间
          IS_AIR_EMBARGO: '', // 航空禁运
          STATEMENT_TIME: '' // 入库单结单时间
        },
        // ruleValidate: {
        //   CARRIER_CODE: [{
        //     required: true,
        //     message: ' '
        //   }],
        //   SENDTIME: [{
        //     required: true,
        //     message: ' '
        //   }],
        //   CP_C_PHY_WAREHOUSE_ID: [{
        //     required: true,
        //     message: ' '
        //   }],
        //   STATEMENT_TIME: [{
        //     required: true,
        //     message: ' '
        //   }]
        // }
      },
      checkRes: {},
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    determine() {
      const formdata = new FormData();
      // if (!this.selectData.length && !this.defaultSelected.length) {
      //   this.$Message.warning($i18n.t('modalTips.eh')); // '档案日程归属不能为空!'
      //   return;
      // }
      let obj1 = JSON.parse(JSON.stringify(this.formConfig.formValue));
      Object.assign(obj1, this.checkRes);
      const obj = {
        ids: this.idArray,
        ST_C_VIPCOM_PROJECT_WAREHOUSE_ENTRY_ITEM: obj1
      };
      formdata.append('param', JSON.stringify(obj));
      this.service.orderCenter.distributionCreateDelivery(formdata)
        .then(res=>{
          console.log(res);
          if (res.data.code === 0) {
            this.$Message.success(res.data.message);
            this.$emit('closeActionDialog');
          } else {
            // this.$Message.error(res.data.message);
          }
        });
    },
    intersectFormValue(target, origin) {
      Object.keys(target).forEach((key) => origin[key] && (target[key] = origin[key]))
    },
    init() {
      const formdata = new FormData();
      formdata.append('param', JSON.stringify({ ids: this.idArray }));
      this.service.orderCenter.checkBeforeCreateVipDelivery(formdata).then(res=>{
        console.log(res);
        if (res.data.code === 0) {
          // const def = res.data.data.filter(item => item.SELECTED == 1)[0];
          // this.transportStyle.text = def.DELIVERY_METHOD_NAME;
          // this.transportStyle.value = def.DELIVERY_METHOD;
          // this.defaultSelected = [{ ID: def.ID, Label: def.ENAME }];
          // this.selectData = this.defaultSelected;
          this.btnConfig.buttons.push({
            type: '', // 按钮类型
            text: $i18n.t('common.determine'), // 确定
            icon: '', // 按钮图标
            size: 'small', // 按钮大小
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              this.determine();
            }, // 按钮点击事件
          });
          // this.list = JSON.parse(JSON.stringify(res.data.data));
          // this.datas.row = this.getData(res.data.data);
          let data = JSON.parse(JSON.stringify(res.data.data));
          this.checkRes = data;
          // let data = result.ST_C_VIPCOM_PROJECT_WAREHOUSE_ENTRY_ITEM[0]
          this.intersectFormValue(this.formConfig.formValue, data);
          this.formConfig.formValue.IS_AIR_EMBARGO = data.IS_AIR_EMBARGO
          this.formConfig.formValue.IS_AIR_EMBARGO_TEXT = data.IS_AIR_EMBARGO != 0 ? '是' : '否'
          this.formConfig.formData[0].itemdata.pid = data.CP_C_PHY_WAREHOUSE_ID
          this.formConfig.formData[0].itemdata.valuedata = data.CP_C_PHY_WAREHOUSE_ENAME
        } else {
          // this.isError = true;
          // this.$Message.error(res.data.message);
        }
      });
    },
    // getData(row) {
    //   const arr = [];
    //   row.forEach(item=>{
    //     const obj = {};
    //     for (const key in item) {
    //       const val = {};
    //       val.val = item[key];
    //       obj[key] = val;
    //     }
    //     arr.push(obj);
    //   });
    //   return arr;
    // },
    // fkrpSelected(e) {
    //   this.selectData = e;
    //   this.getDeliveryMethod(e);
    // },
    // clear() {
    //   this.defaultSelected = [];
    //   this.selectData = [];
    //   this.transportStyle.value = '';
    //   this.transportStyle.text = '';
    // },
    // getDeliveryMethod(e) {
    //   const val = this.list.filter(item => item.ID == e[0].ID)[0];
    //   this.transportStyle.value = val.DELIVERY_METHOD;
    //   this.transportStyle.text = val.DELIVERY_METHOD_NAME;
    // }
  }
};

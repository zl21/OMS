/*
 * @Author: your name
 * @Date: 2021-06-03 19:24:03
 * @LastEditTime: 2021-06-18 10:38:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /burgeon-project-logic/js/pages/strategyPlatform/auditOrderStrategy.js
 */
import businessButton from 'professionalComponents/businessButton';
import businessForm from 'professionalComponents/businessForm';
import myInput from 'professionalComponents/fkinput.vue';
import comUtils from '@/assets/js/__utils__/common.js';
import subTable from 'professionalComponents/subTable';
import businessLabel from 'professionalComponents/businessLabel';
import modifycurrentLabel from '../../../assets/js/mixins/modifycurrentLabel';

  export default {
    components: {
      businessButton,
      businessForm,
      myInput,
      subTable,
      businessLabel
    },
    mixins: [modifycurrentLabel],
    data() {
      return {
        isModify: false, // 是否修改过页面
        PAYMENT_TIME: [], // 存储支付时间
        collapseValue: ['1', '2'],
        createMethod: {
          indeterminate: true,
          checkAll: false
        },
        orderType: {
          indeterminate: true,
          checkAll: false
        },
        DELIVERY_WAREHOUSE: {
          version: '1.4',
          isActive: true,
          isDisabled: false,
          itemdata: {
            col: 1,
            colid: 172160, // 当前字段的ID
            colname: 'CP_C_SHOP_ID', // 当前字段的名称
            datelimit: 'all',
            display: 'text', // 显示什么类型，例如xml表示弹窗多选加导入功能，mrp表示下拉多选
            fkdisplay: 'mrp', // 外键关联类型
            fkdesc: '发货仓库',
            inputname: 'PS_C_PRO_ID:ECODE', // 这个是做中文类型的模糊查询字段，例如ENAME
            isfk: true, // 是否有fk键
            isnotnull: false, // 是否必填
            isuppercase: false, // 是否转大写
            length: 65535, // 最大长度是多少
            name: '', // 赔付类型
            readonly: false, // 是否可编辑，对应input   readonly属性
            reftable: '123', // 对应的表
            reftableid: '123', // 对应的表ID
            row: 1,
            statsize: -1,
            type: 'STRING', // 这个是后台用的
            valuedata: '', // 这个是选择的值
            pid: '' // 啥 ？？？
          },
        },
        LOGISTICS_COMPANY: {
          version: '1.4',
          isActive: true,
          isDisabled: false,
          itemdata: {
            col: 1,
            colid: 172159, // 当前字段的ID
            colname: 'CP_C_SHOP_ID', // 当前字段的名称
            datelimit: 'all',
            display: 'text', // 显示什么类型，例如xml表示弹窗多选加导入功能，mrp表示下拉多选
            fkdisplay: 'mrp', // 外键关联类型
            fkdesc: '物流公司',
            inputname: 'PS_C_PRO_ID:ECODE', // 这个是做中文类型的模糊查询字段，例如ENAME
            isfk: true, // 是否有fk键
            isnotnull: false, // 是否必填
            isuppercase: false, // 是否转大写
            length: 65535, // 最大长度是多少
            name: '', // 赔付类型
            readonly: false, // 是否可编辑，对应input   readonly属性
            reftable: '123', // 对应的表
            reftableid: '123', // 对应的表ID
            row: 1,
            statsize: -1,
            type: 'STRING', // 这个是后台用的
            valuedata: '', // 这个是选择的值
            pid: '' // 啥 ？？？
              
          }
        },
        btnConfig: {
          typeAll: 'default',
          buttons: [
            {
              text: '保存',
              btnclick: ()=>{
                this.save();
              }
            },
            {
              text: '返回',
              btnclick: ()=>{
                if (this.isModify) {
                  this.$Modal.fcWarning({
                    title: '提示', // 打印
                    content: '该页面已经修改,是否继续返回?', // 正在打印中，请稍后。。。
                    mask: true,
                    showCancel: true,
                    onOk: () => {
                      comUtils.tabCloseAppoint(this);
                      this.$destroy(true);
                      this.$store.commit('global/tabOpen', {
                        tableId: 10662,
                        type: 'S',
                        tableName: 'ST_C_AUTO_AUDIT',
                        label: '审单策略',
                        back: true,
                      });
                    }
                  });
                } else {
                  comUtils.tabCloseAppoint(this);
                  this.$destroy(true);
                  this.$store.commit('global/tabOpen', {
                    tableId: 10662,
                    type: 'S',
                    tableName: 'ST_C_AUTO_AUDIT',
                    label: '审单策略',
                    back: true,
                  });
                }
              }
            }
          ]
        },
        formConfig: {
          formData: [
            {
              style: '',
              label: '策略ID',
              value: 'PLAN_ID',
              width: '6',
              disabled: true
            },
            {
              style: 'input',
              label: '策略名称',
              value: 'PLAN_NAME',
              width: '6',
              inputChange: ()=>{
                this.modify();
              }
            },
            {
              style: 'switch',
              label: '启动自动审核',
              value: 'IS_OPEN',
              width: '6',
              switchChange: ()=>{
                this.modify();
              }
            },
            {
              version: '1.4',
              colname: 'key', // 控件key
              style: 'popInput', // 输入框弹框单多选
              width: '6',
              itemdata: {
                col: 1,
                colid: 172161, // 当前字段的ID
                colname: 'CP_C_SHOP_ID', // 当前字段的名称
                datelimit: 'all',
                display: 'text', // 显示什么类型，例如xml表示弹窗多选加导入功能，mrp表示下拉多选
                fkdisplay: 'mrp', // 外键关联类型
                fkdesc: '商品SPU',
                inputname: 'PS_C_PRO_ID:ECODE', // 这个是做中文类型的模糊查询字段，例如ENAME
                isfk: true, // 是否有fk键
                isnotnull: true, // 是否必填
                isuppercase: false, // 是否转大写
                length: 65535, // 最大长度是多少
                name: '参与店铺', // 赔付类型
                readonly: false, // 是否可编辑，对应input   readonly属性
                reftable: '123', // 对应的表
                reftableid: '123', // 对应的表ID
                row: 1,
                statsize: -1,
                type: 'STRING', // 这个是后台用的
                valuedata: '', // 这个是选择的值
                pid: '' // 啥 ？？？
              },
              oneObj: e => {
                this.resultData.ST_C_AUTO_AUDIT.CP_C_SHOP_IDS = e.pid;
                this.resultData.ST_C_AUTO_AUDIT.CP_C_SHOP_NAMES = e.valuedata;
                this.modify();
              }
            }
          ],
          formValue: {
            PLAN_NAME: '', // 策略名称
            IS_OPEN: false, // 启用自动审核
            PLAN_ID: '', // 策略ID
          },
          ruleValidate: {
            PLAN_NAME: [{ required: true, message: ' ', trigger: 'blur' }],
          }
        },
        resultData: {
          ST_C_AUTO_AUDIT: {
            PLAN_NAME: '', // 策略名称
            IS_OPEN: true, // 启用自动审核
            CP_C_SHOP_IDS: '', // 参与店铺id
            CP_C_SHOP_NAMES: '', // 参与店铺名称
            WAIT_TIME: 5 // 等待时间
          },
          ST_C_AUTO_AUDIT_ITEM: {
            BILL_FOUND_TYPE: { // 单据创建方式
              VALUE: []
            },
            BILL_TYPE: { // 单据类型
              VALUE: []
            },
            DELIVERY_WAREHOUSE: { // 发货仓库
              IS_OPEN: false,
              ID: '',
              VALUE: ''
            },
            LOGISTICS_COMPANY: { // 物流公司
              IS_OPEN: false,
              ID: '',
              VALUE: ''
            },
            PAYMENT_TIME: { // 支付时间
              IS_OPEN: false,
              BEGIN_TIME: '',
              END_TIME: ''
            },
            TOTAL_AMOUNT: { // 总金额
              IS_OPEN: false,
              TOTAL_AMT_ITEM: [
                {
                  LESS: '',
                  GREATER: ''
                }
              ]
            },
            RECEIVING_ADDRESS: { // 收货地址
              IS_OPEN: false,
              INFO: ''
            },
            BUYER_MESSAGE: { // 买家留言
              IS_OPEN: false,
              INFO: ''
            },
            SELLER_NOTES: { // 卖家备注
              IS_OPEN: false,
              INFO: ''
            },
            PRO_INFO: { // 商品信息
              IS_OPEN: false,
              TYPE: '9',
              INFO: ''
            }
          }
        },
        label:{
          labelList: [{
          label: '操作日志',
          value: 'log',
        }],
        labelDefaultValue:'log'
        },
        subTableConfig: {
        centerName: '',
        tablename: '',
        objid: '',
        
      },
      };
    },
    computed: {
      id() {
        return this.$route.params.customizedModuleId == 'New' ? '-1' : this.$route.params.customizedModuleId;
      },
    },
    created(){
      this.subTableConfig = {
          centerName: 'strategyPlatform',
          tablename: 'ST_C_AUTO_AUDIT_LOG',
          objid: this.id,
          pageShow:true,
        }
    },
    mounted() {
      const self = this;
      if (self.id !== '-1') {
        self.formConfig.formData[0].style = 'input';
        this.query();
      }
    },
    methods: {
      query() {
        const self = this;
        self.service.strategyPlatform.getAutoAuditInfo(self.id).then(res=>{
          console.log(res);
          if (res.data.code == 0) {
            this.initData(res.data.data);
          } else {
            self.$OMS2.omsUtils.msgTips(self, 'warning', res.data.message, 0);
          }
        });
      },
      initData(data) {
        const self = this;
        const resultData = JSON.parse(JSON.stringify(data));
        self.formConfig.formValue.PLAN_NAME = data.ST_C_AUTO_AUDIT.PLAN_NAME; // 策略名称复制
        self.formConfig.formValue.IS_OPEN = data.ST_C_AUTO_AUDIT.IS_OPEN; // 启用自动审核
        self.formConfig.formValue.PLAN_ID = data.ST_C_AUTO_AUDIT.PLAN_ID; // 策略ID
        self.formConfig.formData.forEach(item => {
          if (item.itemdata && item.itemdata.name == '参与店铺') {
            item.itemdata.pid = data.ST_C_AUTO_AUDIT.CP_C_SHOP_IDS;
            item.itemdata.valuedata = data.ST_C_AUTO_AUDIT.CP_C_SHOP_NAMES;
          }
        });
        resultData.ST_C_AUTO_AUDIT_ITEM.BILL_FOUND_TYPE.VALUE = data.ST_C_AUTO_AUDIT_ITEM.BILL_FOUND_TYPE.VALUE ? data.ST_C_AUTO_AUDIT_ITEM.BILL_FOUND_TYPE.VALUE.split(',') : []; // 单据创建方式
        resultData.ST_C_AUTO_AUDIT_ITEM.BILL_TYPE.VALUE = data.ST_C_AUTO_AUDIT_ITEM.BILL_TYPE.VALUE ? data.ST_C_AUTO_AUDIT_ITEM.BILL_TYPE.VALUE.split(',') : []; // 单据类型
        //如果多选框控件数据满足全选状态,则勾选全选
        if(resultData.ST_C_AUTO_AUDIT_ITEM.BILL_FOUND_TYPE.VALUE.length == 2){
          self.createMethod.indeterminate = false;
          self.createMethod.checkAll = true;
        };
        if(resultData.ST_C_AUTO_AUDIT_ITEM.BILL_TYPE.VALUE.length == 5){
          self.orderType.indeterminate = false;
          self.orderType.checkAll = true;
        }
        self.DELIVERY_WAREHOUSE.itemdata.pid = data.ST_C_AUTO_AUDIT_ITEM.DELIVERY_WAREHOUSE.ID;
        self.DELIVERY_WAREHOUSE.itemdata.valuedata = data.ST_C_AUTO_AUDIT_ITEM.DELIVERY_WAREHOUSE.VALUE; // 发货仓库
        self.LOGISTICS_COMPANY.itemdata.pid = data.ST_C_AUTO_AUDIT_ITEM.LOGISTICS_COMPANY.ID;
        self.LOGISTICS_COMPANY.itemdata.valuedata = data.ST_C_AUTO_AUDIT_ITEM.LOGISTICS_COMPANY.VALUE; // 物流公司
        self.PAYMENT_TIME = [data.ST_C_AUTO_AUDIT_ITEM.PAYMENT_TIME.BEGIN_TIME, data.ST_C_AUTO_AUDIT_ITEM.PAYMENT_TIME.END_TIME];
        resultData.ST_C_AUTO_AUDIT_ITEM.PRO_INFO.TYPE = String(data.ST_C_AUTO_AUDIT_ITEM.PRO_INFO.TYPE);
        self.resultData = resultData;
      },
      mdAdd() {
        const self = this;
        if (self.resultData.ST_C_AUTO_AUDIT_ITEM.TOTAL_AMOUNT.TOTAL_AMT_ITEM.length >= 5) {
          self.$OMS2.omsUtils.msgTips(self, 'warning', '最多只能添加5条!', 0);
          return;
        }
        self.resultData.ST_C_AUTO_AUDIT_ITEM.TOTAL_AMOUNT.TOTAL_AMT_ITEM.push({
          LESS: '',
          GREATER: ''
        });
      },
      createMethod_handleCheckAll() {
        const self = this;
        if (self.createMethod.indeterminate) {
          self.createMethod.checkAll = false;
        } else {
          self.createMethod.checkAll = !self.createMethod.checkAll;
        }
        self.createMethod.indeterminate = false;

        if (self.createMethod.checkAll) {
          self.resultData.ST_C_AUTO_AUDIT_ITEM.BILL_FOUND_TYPE.VALUE = ['3', '1'];
        } else {
          self.resultData.ST_C_AUTO_AUDIT_ITEM.BILL_FOUND_TYPE.VALUE = [];
        }
        this.modify();
      },
      createMethod_checkAllGroupChange(data) {
        const self = this;
        if (data.length === 2) {
          self.createMethod.indeterminate = false;
          self.createMethod.checkAll = true;
        } else if (data.length > 0) {
          self.createMethod.indeterminate = true;
          self.createMethod.checkAll = false;
        } else {
          self.createMethod.indeterminate = false;
          self.createMethod.checkAll = false;
        }
        this.modify();
      },
      orderType_handleCheckAll() {
        const self = this;
        if (self.orderType.indeterminate) {
          self.orderType.checkAll = false;
        } else {
          self.orderType.checkAll = !self.orderType.checkAll;
        }
        self.orderType.indeterminate = false;

        if (self.orderType.checkAll) {
          self.resultData.ST_C_AUTO_AUDIT_ITEM.BILL_TYPE.VALUE = ['1', '32', '4', '2', '16'];
        } else {
          self.resultData.ST_C_AUTO_AUDIT_ITEM.BILL_TYPE.VALUE = [];
        }
        this.modify();
      },
      orderType_checkAllGroupChange(data) {
        const self = this;
        if (data.length === 5) {
          self.orderType.indeterminate = false;
          self.orderType.checkAll = true;
        } else if (data.length > 0) {
          self.orderType.indeterminate = true;
          self.orderType.checkAll = false;
        } else {
          self.orderType.indeterminate = false;
          self.orderType.checkAll = false;
        }
        this.modify();
      },
      save() {
        const self = this;
        const resultData = JSON.parse(JSON.stringify(self.resultData));
        // 处理下保存数据
        resultData.ST_C_AUTO_AUDIT.PLAN_NAME = self.formConfig.formValue.PLAN_NAME;
        resultData.ST_C_AUTO_AUDIT.IS_OPEN = self.formConfig.formValue.IS_OPEN;
        resultData.ST_C_AUTO_AUDIT_ITEM.BILL_FOUND_TYPE.VALUE = self.resultData.ST_C_AUTO_AUDIT_ITEM.BILL_FOUND_TYPE.VALUE.join(',');
        resultData.ST_C_AUTO_AUDIT_ITEM.BILL_TYPE.VALUE = self.resultData.ST_C_AUTO_AUDIT_ITEM.BILL_TYPE.VALUE.join(',');
        resultData.ST_C_AUTO_AUDIT_ITEM.PAYMENT_TIME.BEGIN_TIME = self.PAYMENT_TIME[0];
        resultData.ST_C_AUTO_AUDIT_ITEM.PAYMENT_TIME.END_TIME = self.PAYMENT_TIME[1];
        console.log(resultData);
        resultData.ID = self.id;
        if (self.isNull(resultData)) {
          return;
        }
        self.service.strategyPlatform.saveOrUpdate(resultData).then(res=>{
          console.log(res);
          if (res.data.code == 0) {
            self.$OMS2.omsUtils.msgTips(self, 'success', res.data.message, 0);
            comUtils.tabCloseAppoint(this);
            this.$destroy(true);
            this.$store.commit('global/tabOpen', {
              tableId: 10662,
              type: 'S',
              tableName: 'ST_C_AUTO_AUDIT',
              label: '审单策略',
              back: true,
            });
          } else {
            self.$OMS2.omsUtils.msgTips(self, 'error', res.data.message, 0);
          }
        });
      },
      isNull(val) {
        const self = this;
        // 判断总金额里是否有嵌套包含数据
        const totalAmt = val.ST_C_AUTO_AUDIT_ITEM.TOTAL_AMOUNT.TOTAL_AMT_ITEM;
        let isClash = false;
        for (const iterator of totalAmt) {
          if (totalAmt.some(item=> +iterator.GREATER > +item.GREATER && +iterator.LESS < +item.LESS)) {
            self.$OMS2.omsUtils.msgTips(self, 'warning', '存在相互冲突的价格区间,请调整!', 0);
            isClash = true;
            break;
          }
        }
        if (isClash) {
          return true;
        }
        // 判断为空
        const data = val.ST_C_AUTO_AUDIT_ITEM;
        let str = '';
        if (!val.ST_C_AUTO_AUDIT.PLAN_NAME) {
          str += '策略名称,';
        } else if (!val.ST_C_AUTO_AUDIT.CP_C_SHOP_IDS) {
          str += '参与店铺,';
        } else if (data.DELIVERY_WAREHOUSE.IS_OPEN && !data.DELIVERY_WAREHOUSE.VALUE) {
          str += '发货仓库,';
        } else if (data.LOGISTICS_COMPANY.IS_OPEN && !data.LOGISTICS_COMPANY.VALUE) {
          str += '物流公司,';
        } else if (data.PAYMENT_TIME.IS_OPEN && !data.PAYMENT_TIME.BEGIN_TIME) {
          str += '支付时间,';
        } else if (data.RECEIVING_ADDRESS.IS_OPEN && !data.RECEIVING_ADDRESS.INFO) {
          str += '收货地址,';
        } else if (data.TOTAL_AMOUNT.IS_OPEN && !(data.TOTAL_AMOUNT.TOTAL_AMT_ITEM.some(item=> item.GREATER && item.LESS))) {
          str += '总金额,';
        }
        if (str) {
          self.$OMS2.omsUtils.msgTips(self, 'warning', `${str}不能为空`, 0);
          return true;
        }
        return false;
      },
      bothChange(i) {
        const self = this;
        const data = self.resultData.ST_C_AUTO_AUDIT_ITEM.TOTAL_AMOUNT.TOTAL_AMT_ITEM;
        if (Number(data[i].GREATER) >= Number(data[i].LESS)) {
          self.$OMS2.omsUtils.msgTips(self, 'warning', `金额区间不能小于${data[i].GREATER}`, 0);
          self.$nextTick(()=> { data[i].LESS = ''; });
        }
      },
      DELIVERY_WAREHOUSE_oneObj() {
        const self = this;
        self.resultData.ST_C_AUTO_AUDIT_ITEM.DELIVERY_WAREHOUSE.VALUE = self.DELIVERY_WAREHOUSE.itemdata.valuedata;
        self.resultData.ST_C_AUTO_AUDIT_ITEM.DELIVERY_WAREHOUSE.ID = self.DELIVERY_WAREHOUSE.itemdata.pid;
        self.modify();
      },
      LOGISTICS_COMPANY_oneObj() {
        const self = this;
        self.resultData.ST_C_AUTO_AUDIT_ITEM.LOGISTICS_COMPANY.VALUE = self.LOGISTICS_COMPANY.itemdata.valuedata;
        self.resultData.ST_C_AUTO_AUDIT_ITEM.LOGISTICS_COMPANY.ID = self.LOGISTICS_COMPANY.itemdata.pid;
        self.modify();
      },
      modify() {
        this.isModify = true;
      }
    }
  };
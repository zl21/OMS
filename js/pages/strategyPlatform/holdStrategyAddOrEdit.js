import businessButton from 'professionalComponents/businessButton';
import businessActionTable from 'professionalComponents/businessActionTable';
import businessForm from 'professionalComponents/businessForm';
import businessLabel from 'professionalComponents/businessLabel';
import businessStatusFlag from 'professionalComponents/businessStatusFlag';
import dateUtil from '@/assets/js/__utils__/date.js';
import subTable from 'professionalComponents/subTable';

export default {
  name: 'holdStrategyAddOrEdit',
  components: {
    subTable,
    businessActionTable,
    businessButton,
    businessForm,
    businessLabel,
    businessStatusFlag
  },
  data() {
    return {
      ID: this.$route.params.customizedModuleId && this.$route.params.customizedModuleId != 'New' ? this.$route.params.customizedModuleId : '-1', // 记录主界面传入的ID
      showSubtablePart: false,
      modify: {},
      loading: false,
      backable: false,
      btnConfig: {
        typeAll: 'default',
        buttons: [
          {
            text: '保存',
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              this.save();
            }
          },
          {
            text: $i18n.t('btn.back'),
            btnclick: () => {
              this.back();
            }
          },
          // {
          //   text: '启用',
          //   disabled: false,
          //   isShow: false,
          //   btnclick: async () => {
          //     let { data: { code, message } } = await this.service.strategyPlatform.holdOrderHoldStrategyEnable({ ID: this.ID });
          //     if (code === 0) {
          //       this.$Message.success(message || 'no message！');
          //       this.initData()
          //     }
          //   }
          // },
          // {
          //   text: '停用',
          //   disabled: false,
          //   isShow: false,
          //   btnclick: async () => {
          //     let { data: { code, message } } = await this.service.strategyPlatform.holdOrderHoldStrategyDisable({ ID: this.ID });
          //     if (code === 0) {
          //       this.$Message.success(message || 'no message！');
          //       this.initData()
          //     }
          //   }
          // }
        ]
      },
      paramsTime: {},
      formConfig1: {
        formData: [
          {
            colname: 'ECODE',
            width: '6',
            label: '方案ID',
            style: null,
            regx: /^(\s*|[A-Za-z0-9]+)$/,
          },
          {
            colname: 'ENAME',
            width: '6',
            label: '方案名称', // Y
            style: 'input',
            inputChange: () => {
              this.masterModifyData('ENAME', 'formConfig1')
            }
          },
          {
            colname: 'ISACTIVE',
            width: '6',
            label: '启用状态',
            style: null,
            switchChange: () => {
              this.masterModifyData('ISACTIVE', 'formConfig1')
              let isActive = this.formConfig1.formValue.ISACTIVE
              this.formConfig2.formData[1].disabledSwitch = isActive ? true : false;
              this.formConfig2.formData[0].itemdata.readonly = isActive ? true : false;
              this.formConfig2.formData[2].disabledSwitch = isActive ? true : false;
              this.formConfig2.formData[1].disabled = isActive ? true : false;
              this.formConfig2.formData[2].disabled = isActive || !this.formConfig2.formValue.ORDER_TAB_TYPE ? true : false;
              this.formConfig2.formData[2].timeDisabled = isActive ? true : false;
            }
          },
          {
            style: 'date',
            type: 'datetime',
            label: '生效开始时间',
            colname: 'VALID_BEGIN_TIME',
            value: '',
            width: '6',
            disabled: false,
            options: {
              disabledDate(date) {
                return date && date.valueOf() < Date.now() - 86400000;
              }
            },
            onChange: (val) => {
              this.masterModifyData('VALID_BEGIN_TIME', 'formConfig1')
              this.paramsTime.VALID_BEGIN_TIME = this.formatDate(this.formConfig1.formValue.VALID_BEGIN_TIME);
            }
          },
          {
            style: 'date',
            type: 'datetime',
            label: '生效结束时间',
            colname: 'VALID_END_TIME',
            value: '',
            width: '6',
            disabled: false,
            options: {
              disabledDate(date) {
                return date && date.valueOf() < Date.now() - 86400000;
              }
            },
            onChange: () => {
              this.masterModifyData('VALID_END_TIME', 'formConfig1')
              this.paramsTime.VALID_END_TIME = this.formatDate(this.formConfig1.formValue.VALID_END_TIME);
            }
          },
        ],
        formValue: {
          ECODE: '',
          ENAME: '',
          ISACTIVE: '',
          VALID_BEGIN_TIME: '',
          VALID_END_TIME: '',
        },
        ruleValidate: {
          ENAME: [{ required: true, message: ' ' }],
          VALID_BEGIN_TIME: [{ required: true, message: ' ' }],
          VALID_END_TIME: [{ required: true, message: ' ' }],
        }
      },
      formConfig2: {
        formData: [
          {
            colname: 'CP_C_SHOP_IDS',
            style: 'popInput',
            width: '6',
            version: '1.4',
            itemdata: {
              colid: '172070',
              colname: 'CP_C_SHOP_IDS',
              name: '店铺名称',
              valuedata: '',
              pid: '',
              fkdisplay: 'mrp',
              isfk: true,
              isnotnull: true,
              readonly: false
            },
            oneObj: val => {
              // 选中触发事件
              console.log('val::', val);
              //if (!val.pid) return;
              this.formConfig2.formValue.CP_C_SHOP_IDS = val.pid;
              this.formConfig2.formValue.CP_C_SHOP_NAME = val.valuedata;
              this.masterModifyData('CP_C_SHOP_IDS', 'formConfig2')
              this.masterModifyData('CP_C_SHOP_NAME', 'formConfig2')
            }
          },
          {
            colname: 'TIME',
            style: 'formCompile',
            class: 'soltDom',
            label: '时间类型',
            format: 'yyyy-MM-dd HH:mm:ss',
            slotName: 'spec01',
            width: '24',
            disabled: true,
            timeDisabled: false,
            disabledSwitch: false,
            options: [
              {
                label: '下单时间',
                value: 1
              },
              {
                label: '系统创建时间',
                value: 2
              },
              {
                label: '支付时间',
                value: 3
              }
            ],
            switchChange: val => {
              if (!val) {
                this.formConfig2.formData[1].disabled = true;
              } else {
                this.formConfig2.formData[1].disabled = false;
              }
            },
            radioChange: val => {
              console.log(val);
              this.masterModifyData('DAY_TYPE', 'formConfig2')
            },
            datePickerChange: val => {
              this.paramsTime.BEGIN_TIME = val[0];
              this.paramsTime.END_TIME = val[1];
              this.masterModifyData('TIME', 'formConfig2')
            }
          },
          {
            colname: 'ORDER_TAB_TYPE',
            style: 'formCompile',
            class: 'soltDom',
            label: '单据标签',
            slotName: 'spec02',
            width: '24',
            disabled: true,
            disabledSwitch: false,
            switchChange: val => {
              console.log(val, '单据状态');
              if (!val) {
                this.formConfig2.formData[2].disabled = true;
              } else {
                this.formConfig2.formData[2].disabled = false;
              }
            },
            checkChange: val => {
              console.log(val);
            }
          }
        ],
        formValue: {
          CP_C_SHOP_IDS: '',
          CP_C_SHOP_NAME: '',
          IS_DATE_TYPE: false, // 控制时间类型的开关
          DAY_TYPE: '', // 时间类型
          // TIME: [new Date(), new Date()],
          TIME: '', // 时间
          ORDER_TAB_TYPE: false, //控制单据标签的开关
          ORDER_FLAG: false // 直播
        }
      },
      formConfig3: {
        formData: [
          {
            style: 'radio',
            label: 'Hold单原因',
            colname: 'HOLD_ORDER_REASON',
            width: '24',
            radioChange: e => {
              this.masterModifyData('HOLD_ORDER_REASON', 'formConfig3')
            },
            options: [
              {
                label: '直播HOLD单',
                value: 1
              }, {
                label: '其它',
                value: 2
              },
            ]
          },
          {
            style: 'checkbox',
            label: '自动释放',
            colname: 'IS_AUTO_RELEASE',
            width: '24',
            checkboxChange: (val) => {
              this.masterModifyData('IS_AUTO_RELEASE', 'formConfig3')
              if (!val) {
                this.formConfig3.formData[2].style = 'select';
              } else {
                this.formConfig3.formData[2].style = '';
                this.formConfig3.formData[3].style = '';
                this.formConfig3.formValue.RELEASE_TIME_TYPE = null;// 释放时点 1-指定时间点 2-固定时长
                this.formConfig3.formValue.RELEASE_TIME = null;//释放指定时间
                this.formConfig3.formValue.FIXED_DURATION = null; //固定时长
                this.formConfig3.formValue.RELEASE_DAY_TYPE = null; // 固定时长类型
                this.formConfig3.formValue.TIME_UNIT = null; // 单位 1-分钟 2-小时 3-天
              }
            },
          },
          {
            style: '',
            label: '释放时间',
            value: 'RELEASE_TIME_TYPE',
            width: '6',
            disabled: false,
            colname: 'PICK_FLAG',
            selectChange: (val) => {
              this.masterModifyData('RELEASE_TIME_TYPE', 'formConfig3')
              this.formConfig3.formData[3].style = 'formCompile';
              if (val.value == 1) {
                this.formConfig3.formValue.FIXED_DURATION = null; //固定时长
                this.formConfig3.formValue.RELEASE_DAY_TYPE = null; // 固定时长类型
                this.formConfig3.formValue.TIME_UNIT = null; // 单位 1-分钟 2-小时 3-天
              } else {
                console.log('固定时长');
                this.formConfig3.formValue.RELEASE_TIME = null;//释放指定时间
              }
            },
            options: [
              {
                value: 1,
                label: '指定时间点',
              },
              {
                value: 2,
                label: '固定时长',
              }
            ]
          },
          {
            style: '',
            colname: 'TIME_TYPE',
            class: 'soltDom',
            label: '时间类型',
            slotName: 'spec03',
            width: '18',
            disabled: false,
            orderTimeOption: [
              {
                value: 1,
                label: '下单时间'
              },
              {
                value: 2,
                label: '支付时间'
              },
              {
                value: 3,
                label: '创建时间'
              }
            ],
            timeUnitOption: [
              {
                value: 1,
                label: '分'
              },
              {
                value: 2,
                label: '时'
              },
              {
                value: 3,
                label: '天'
              }
            ],
            optionsTime: {
              disabledDate(date) {
                return date && date.valueOf() < Date.now() - 86400000;
              }
            },
            datePickerChange: (val) => {
              // 时间
              this.paramsTime.RELEASE_TIME = this.formatDate(val);
              this.masterModifyData('RELEASE_TIME', 'formConfig3')
            }
          },
          {
            style: 'radio',
            label: '订单标签',
            colname: 'ORDER_FROM_TAB',
            width: '24',
            options: [
              {
                label: '“hold”标',
                value: 1
              }
            ]
          }
        ],
        formValue: {
          ORDER_FROM_TAB: 1, //订单标签
          HOLD_ORDER_REASON: 1, //hold单原因
          IS_AUTO_RELEASE: false, //是否自动释放
          RELEASE_TIME_TYPE: null,// 释放时点 1-指定时间点 2-固定时长
          RELEASE_TIME: null, //释放指定时间
          FIXED_DURATION: null, //固定时长
          RELEASE_DAY_TYPE: null, // 固定时长类型
          TIME_UNIT: null, // 单位 1-分钟 2-小时 3-天
        },
        ruleValidate: {
          ORDER_FROM_TAB: [{ required: true, message: ' ' }],
          HOLD_ORDER_REASON: [{ required: true, message: ' ' }]
        }
      },
      // tab切换配置
      labelList: [
        {
          label: '操作日志',
          value: 'ST_HOLD_ORDER_STRATEGY_LOG'
        }
      ],
      subTableConfig: {
        centerName: '',
        tablename: '',
        objid: ''
      },
      labelDefaultValue: 'ST_HOLD_ORDER_STRATEGY_LOG', // 设置tab默认值
      panelDefaultValue: ['panel_baseInfo', 'panel_condition', 'panel_action'] // 设置默认打开'基础信息'
    };
  },
  watch: {},
  computed: {
    customizedModuleName() {
      return this.$router.currentRoute.params.customizedModuleName;
    }
  },
  async mounted() {
    const self = this;
    if (self.ID > 0 && !self.$route.query.spuid) {
      // 详情
      // const { customizedModuleName, customizedModuleId } = self.$route.params;//获取定制界面ID，Name 
      // const keepAliveModuleName = `C.${customizedModuleName}.${customizedModuleId}`;//拼接当前定制界面模块名称 
      // const data = { label: 'hold策略编辑', keepAliveModuleName:keepAliveModuleName}; //当前界面模块名称 
      // console.log('$store:',R3)
      // R3.store.commit('global/changeCurrentTabName',data);
      this.initData();
      // 日志
      self.subTableConfig = {
        centerName: 'strategyPlatform',
        tablename: this.labelDefaultValue,
        objid: self.ID,
      }
    }
  },
  created() { },
  methods: {
    // 初始化数据
    async initData(page, size) {
      let params = {
        pageNumber: page,
        pageSize: size
      };
      params = Object.assign(params, { ID: this.ID })
      let { data: { data, code } } = await this.service.strategyPlatform.holdOrderHoldStrategyDetails({ ID: this.ID });
      if (code === 0) {
        let formValue1 = this.formConfig1.formValue;
        let formValue2 = this.formConfig2.formValue;
        let formValue3 = this.formConfig3.formValue;
        this.formConfig1.formData[0].style = 'input'
        this.formConfig1.formData[0].disabled = true
        this.formConfig1.formData[2].style = 'switch'
        this.formConfig1.formData[2].disabled = true
        formValue1.ECODE = data.ECODE;
        formValue1.ENAME = data.ENAME;
        formValue1.ISACTIVE = data.ISACTIVE === 'Y';
        formValue1.VALID_BEGIN_TIME = data.VALID_BEGIN_TIME;
        formValue1.VALID_END_TIME = data.VALID_END_TIME;
        // 状态为启用状态一下内容不能编辑 启用停用按钮限制
        // this.btnConfig.buttons[2].disabled = data.ISACTIVE === 'Y' ? true : false;
        // this.btnConfig.buttons[3].disabled = data.ISACTIVE === 'Y' ? false : true;
        this.formConfig2.formData[1].disabledSwitch = data.ISACTIVE === 'Y' ? true : false;
        this.formConfig2.formData[0].itemdata.readonly = data.ISACTIVE === 'Y' ? true : false;
        this.formConfig2.formData[2].disabledSwitch = data.ISACTIVE === 'Y' ? true : false;
        this.formConfig2.formData[1].disabled = data.ISACTIVE === 'Y' ? true : false;
        this.formConfig2.formData[2].disabled = data.ISACTIVE === 'Y' || data.ORDER_TAB_TYPE === 0 ? true : false;
        this.formConfig2.formData[2].timeDisabled = data.ISACTIVE === 'Y' ? true : false;
        formValue2.CP_C_SHOP_IDS = data.CP_C_SHOP_IDS;
        formValue2.CP_C_SHOP_NAME = data.CP_C_SHOP_NAME;
        this.formConfig2.formData[0].itemdata.pid = data.CP_C_SHOP_IDS;
        this.formConfig2.formData[0].itemdata.valuedata = data.CP_C_SHOP_NAME;
        formValue2.IS_DATE_TYPE = data.IS_DATE_TYPE ? true : false;
        formValue2.ORDER_TAB_TYPE = data.ORDER_TAB_TYPE ? true : false;
        formValue2.TIME = [data.BEGIN_TIME, data.END_TIME]
        formValue2.DAY_TYPE = data.DAY_TYPE;
        formValue2.ORDER_FLAG = data.ORDER_FLAG ? true : false;
        formValue3.HOLD_ORDER_REASON = data.HOLD_ORDER_REASON ? 1 : 2;
        formValue3.IS_AUTO_RELEASE = data.IS_AUTO_RELEASE ? true : false;
        if (data.IS_AUTO_RELEASE) {
          this.formConfig3.formData[2].style = 'select';
          this.formConfig3.formData[3].style = 'formCompile';
        }
        formValue3.RELEASE_TIME_TYPE = data.RELEASE_TIME_TYPE;
        formValue3.RELEASE_TIME = data.RELEASE_TIME;
        formValue3.RELEASE_DAY_TYPE = data.RELEASE_DAY_TYPE;
        formValue3.FIXED_DURATION = data.FIXED_DURATION;
        formValue3.TIME_UNIT = data.TIME_UNIT;
        formValue3.ORDER_FROM_TAB = data.ORDER_FROM_TAB;
      }
    },
    // 保存
    async save() {
      const self = this;
      // 校验必选
      let requriredArr = ['ENAME', 'VALID_BEGIN_TIME', 'VALID_END_TIME', 'PS_C_PRO_ID', 'ORDER_FROM_TAB'];//必须选项
      let labelArr = ['方案名称', '生效开始时间', '生效结束时间', '店铺名称', '订单标签']
      let formConfig2 = this.formConfig2.formValue;
      if (formConfig2.IS_DATE_TYPE) {
        requriredArr.push('DAY_TYPE');
        labelArr.push('时间类型及时间');
        if (formConfig2.DAY_TYPE && !formConfig2.TIME[0]) {
          self.$Message.warning('时间类型的时间不能为空，请填写！');
          return;
        }
      }
      if (formConfig2.ORDER_TAB_TYPE) {
        requriredArr.push('ORDER_FLAG');
        labelArr.push('单据标签')

      }
      if (!formConfig2.CP_C_SHOP_NAME) {
        self.$Message.warning('店铺名称不能为空，请填写！');
        return;
      }
      if (this.formConfig3.formValue.IS_AUTO_RELEASE) {
        if (this.formConfig3.formValue.RELEASE_TIME_TYPE === 1) {
          requriredArr.push('RELEASE_TIME');
          labelArr.push('释放指定时间')
        } else if (this.formConfig3.formValue.RELEASE_TIME_TYPE === 2) {
          if (!this.formConfig3.formValue.RELEASE_DAY_TYPE || !this.formConfig3.formValue.FIXED_DURATION || !this.formConfig3.formValue.TIME_UNIT) {
            self.$Message.warning('固定时长类型,固定时长及单位不能为空,请填写！');
            return;
          }
        } 
        // else {
        //   self.$Message.warning('释放时间类型不能为空,请填写！');
        //   return;
        // }
      }

      console.log(requriredArr, labelArr);
      if (!self.resultTipsHand(requriredArr, labelArr)) return;
      let formValues = {};
      formValues = Object.assign(formValues, this.formConfig1.formValue, formConfig2, this.formConfig3.formValue);
      let { PS_C_PRO_ID, TIME, ...params } = formValues;
      // 特殊
      params = Object.assign(params, this.paramsTime)
      params.ORDER_TAB_TYPE = params.ORDER_TAB_TYPE ? 1 : 0;
      params.ORDER_FLAG = params.ORDER_FLAG ? 1 : 0;
      params.IS_DATE_TYPE = params.IS_DATE_TYPE ? 1 : 0;
      params.ID = this.ID
      // 如果是编辑
      if (!params.BEGIN_TIME) {
        params.BEGIN_TIME = formValues.TIME[0];
        params.END_TIME = formValues.TIME[1];
      }
      if (self.ID > 0 && !self.$route.query.spuid) {
        params.ISACTIVE = params.ISACTIVE ? 'Y' : 'N'
        params.IS_AUTO_RELEASE = params.IS_AUTO_RELEASE ? 1 : 0
      }
      let { data: { code,data,message } } = await this.service.strategyPlatform.holdOrderHoldStrategySave({ "ST_C_HOLD_ORDER_STRATEGY": params });
      if (code === 0) {
        // 情况已经存储的字段
        self.modify = [];
        self.$Message.success(message || 'no message！');
        if(self.ID > 0 && !self.$route.query.spuid){
          console.log('编辑');
          self.onOk();
        }else{
          console.log('新增');
          this.$store.commit('global/tabOpen', {
            type: 'tableDetailAction',
            label: 'HOLD单策略编辑',
            customizedModuleName: 'ST_C_HOLD_ORDER_STRATEGY',
            customizedModuleId: data.objId
          });
        }
      }
    },
    /**
     * 记录主表修改信息方法
     * @param {*} ecode 记录字段
     * @param {*} formConfig 表单key
     * @returns 
     */
    masterModifyData(ecode, formConfig) {
      const self = this;
      let value = self[formConfig].formValue[ecode]
      if (ecode == 'VALID_END_TIME') {
        let oldTime = self.modify[ecode]
        value = this.$OMS2.omsUtils.defaultEndTime(value, oldTime)
        self[formConfig].formValue[ecode] = new Date(value)
      }
      self.modify[ecode] = value;
    },
    // 返回
    back() {
      const self = this;
      if (self.backable) {
        // 保存成功之后返回
        self.onOk();
        return;
      }
      if (Object.keys(this.modify).length) {
        this.$Modal.info({
          title: $i18n.t('modalTitle.tips'), // 提示
          content: '当前修改未保存，确定返回？',
          mask: true,
          showCancel: true,
          okText: $i18n.t('common.determine'), // 确定
          cancelText: $i18n.t('common.cancel'), // 取消
          onOk: () => {
            self.onOk();
          }
        });
      } else {
        self.onOk();
      }
    },
    // 关闭标签并跳转
    onOk() {
      this.$comUtils.tabCloseAppoint(this);
      this.$destroy(true);
      this.$store.commit('global/tabOpen', {
        tableId: 10669,
        type: 'S',
        tableName: 'ST_C_HOLD_ORDER_STRATEGY',
        label: 'HOLD单策略',
        back: true
      });
    },
    /* --------------------- 公共方法 --------------------- */
    // 回车操作
    keyDown(e) {
      console.log(e);
    },
    // 时间戳格式化
    formatDate(time) {
      const date = new Date(time);
      return dateUtil.getFormatDate(date, 'yyyy-MM-dd HH:mm:ss');
    },
    // 校验提示
    resultTipsHand(requriredArr, labelArr) {
      let formValues = {};
      Object.assign(formValues, this.formConfig1.formValue, this.formConfig2.formValue, this.formConfig3.formValue);
      for (let key in formValues) {
        if (requriredArr.includes(key)) {
          if (typeof formValues[key] !== "object" && !formValues[key]) {
            let index = requriredArr.findIndex((item) => item == key)
            this.$Message.warning(`${labelArr[index]}字段不能为空，,请填写！`);
            return false;
          }
        }
      }
      return true;
    }
  }
};
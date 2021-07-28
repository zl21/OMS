import businessButton from 'professionalComponents/businessButton';
import businessActionTable from 'professionalComponents/businessActionTable';
import businessForm from 'professionalComponents/businessForm';
import businessLabel from 'professionalComponents/businessLabel';
import businessStatusFlag from 'professionalComponents/businessStatusFlag';
import dateUtil from '@/assets/js/__utils__/date.js';
import subTable from 'professionalComponents/subTable';
import modifycurrentLabel from '../../../assets/js/mixins/modifycurrentLabel';
import { setWith } from 'lodash';

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
  mixins: [new modifycurrentLabel()],
  data() {
    return {
      ID: this.$route.params.customizedModuleId && this.$route.params.customizedModuleId != 'New' ? this.$route.params.customizedModuleId : '-1', // 记录主界面传入的ID
      showSubtablePart: false,
      modify: {},
      loading: false,
      backable: false,
      Il8n: $i18n,
      btnConfig: {
        btnsite: 'right', // 按钮对齐方式
        typeAll: 'default',
        buttons: [
          {
            webname: 'ST_C_HOLD_STRATEGY_SAVE',
            text: $i18n.t('btn.save'), // 保存
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              this.save();
            }
          },
          {
            webname: 'fix_back',
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
            label: $i18n.t('form_label.bc'), // 策略ID
            style: null,
            regx: /^(\s*|[A-Za-z0-9]+)$/,
          },
          {
            colname: 'ENAME',
            width: '6',
            label: $i18n.t('form_label.bd'), // 策略名称
            style: 'input',
            inputChange: () => {
              this.masterModifyData('ENAME', 'formConfig1')
            }
          },
          {
            colname: 'ISACTIVE',
            width: '6',
            label: $i18n.t('form_label.bg'), // 启用状态
            style: null,
            // inputChange: () => {
            //   this.masterModifyData('ISACTIVE', 'formConfig1')
            //   let isActive = this.formConfig1.formValue.ISACTIVE
            //   this.formConfig2.formData[1].disabledSwitch = isActive ? true : false;
            //   this.formConfig2.formData[0].itemdata.readonly = isActive ? true : false;
            //   this.formConfig2.formData[2].disabledSwitch = isActive ? true : false;
            //   this.formConfig2.formData[1].disabled = isActive ? true : false;
            //   this.formConfig2.formData[2].disabled = isActive || !this.formConfig2.formValue.ORDER_TAB_TYPE ? true : false;
            //   this.formConfig2.formData[2].timeDisabled = isActive ? true : false;
            // }
          },
          {
            style: 'date',
            type: 'datetime',
            label: $i18n.t('form_label.be'), // 生效开始时间
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
            label: $i18n.t('form_label.bf'), // 生效结束时间
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
              name: $i18n.t('table_label.shopName'), // 店铺名称
              valuedata: '',
              pid: '',
              fkdisplay: 'mrp',
              isfk: true,
              isnotnull: true,
              istooltip: true,
              readonly: false
            },
            oneObj: val => {
              // 选中触发事件
              console.log('val::', val);
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
            label: $i18n.t('form_label.timeType'), // 时间类型
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
                value: 3
              },
              {
                label: '支付时间',
                value: 2
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
            },
            checkChange1: val => {
               this.checkShow()
              // if (val) {
              //    this.formConfig5.formData[0].class = "radio-label"
              //    this.formConfig3.formData[0].class = ""
              //    this.formConfig3.formData[1].class = ""
              //    this.formConfig3.formData[2].class = ""
              //    this.formConfig3.formData[3].class = "soltDom"
              // }else{
              //   this.formConfig5.formData[0].class = ""
              //   this.formConfig3.formData[0].class = "radio-label1"
              //   this.formConfig3.formData[1].class = "radio-label1"
              //   this.formConfig3.formData[2].class = "radio-label1"
              //   this.formConfig3.formData[3].class = "soltDom radio-label1"
              // }
            },
            checkAllGroupChange: val => {
              this.checkShow()
              this.formConfig2.formValue.show = val;
              // if (val) {
              //   this.formConfig4.formData[0].class = "radio-label"
              //   this.formConfig4.formData[1].class = ""
              //   this.formConfig4.formData[2].class = ""
              //   this.formConfig4.formData[3].class = "soltDom"
              // }else{
              //   this.formConfig4.formData[0].class = "radio-label radio-label2"
              //   this.formConfig4.formData[1].class = "radio-label2"
              //   this.formConfig4.formData[2].class = "radio-label2"
              //   this.formConfig4.formData[3].class = "soltDom radio-label2"
              // }
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
          ORDER_FLAG: false, // 直播
          preSale: false,//预售
          preSale1: false,
          preSale2: false,
          preSale3: false,
          show: false
        }
      },
      formConfig3: {
        formData: [
          {
            style: 'radio',
            label: '',
            colname: 'HOLD_ORDER_REASON',
            width: '5',
            class: "radio-label",
            radioChange: e => {
              this.masterModifyData('HOLD_ORDER_REASON', 'formConfig3')
            },
            options: [
              {
                label: '直播HOLD单',
                value: 1
              }
            ]
          },
          {
            style: 'checkbox',
            label: '自动释放',
            colname: 'IS_AUTO_RELEASE',
            width: '3',
            checkboxChange: (val) => {
              this.masterModifyData('IS_AUTO_RELEASE', 'formConfig3')
              if (val) {
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
            label: $i18n.t('form_label.timeType'), // 时间类型
            slotName: 'spec03',
            width: '10',
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

        ],
        formValue: {
          HOLD_ORDER_REASON: 1, //hold单原因
          IS_AUTO_RELEASE: false, //是否自动释放
          RELEASE_TIME_TYPE: null,// 释放时点 1-指定时间点 2-固定时长
          RELEASE_TIME: null, //释放指定时间
          FIXED_DURATION: null, //固定时长
          RELEASE_DAY_TYPE: null, // 固定时长类型
          TIME_UNIT: null, // 单位 1-分钟 2-小时 3-天
        },
        ruleValidate: {
          HOLD_ORDER_REASON: [{ required: true, message: ' ' }]
        }
      },
      formConfig4: {
        formData: [
          {
            style: 'radio',
            label: '',
            colname: 'HOLD_ORDER_REASON',
            class: "radio-label",
            width: '5',
            radioChange: e => {
              this.masterModifyData('HOLD_ORDER_REASON', 'formConfig3')
            },
            options: [
              {
                label: '预售HOLD单',
                value: 2
              }
            ]
          },
          {
            style: 'checkbox',
            label: '自动释放',
            colname: 'IS_AUTO_RELEASE',
            width: '3',
            checkboxChange: (val) => {
              this.masterModifyData('IS_AUTO_RELEASE', 'formConfig3')
              if (val) {
                this.formConfig4.formData[2].style = 'select';
              } else {
                this.formConfig4.formData[2].style = '';
                this.formConfig4.formData[3].style = '';
                this.formConfig4.formValue.RELEASE_TIME_TYPE = null;// 释放时点 1-指定时间点 2-固定时长
                this.formConfig4.formValue.RELEASE_TIME = null;//释放指定时间
                this.formConfig4.formValue.FIXED_DURATION = null; //固定时长
                this.formConfig4.formValue.RELEASE_DAY_TYPE = null; // 固定时长类型
                this.formConfig4.formValue.TIME_UNIT = null; // 单位 1-分钟 2-小时 3-天
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
              this.formConfig4.formData[3].style = 'formCompile';
              if (val.value == 1) {
                this.formConfig4.formValue.FIXED_DURATION = null; //固定时长
                this.formConfig4.formValue.RELEASE_DAY_TYPE = null; // 固定时长类型
                this.formConfig4.formValue.TIME_UNIT = null; // 单位 1-分钟 2-小时 3-天
              } else {
                console.log('固定时长');
                this.formConfig4.formValue.RELEASE_TIME = null;//释放指定时间
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
            label: $i18n.t('form_label.timeType'), // 时间类型
            slotName: 'spec04',
            width: '10',
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
          }
        ],
        formValue: {
          HOLD_ORDER_REASON: 2, //hold单原因
          IS_AUTO_RELEASE: false, //是否自动释放
          RELEASE_TIME_TYPE: null,// 释放时点 1-指定时间点 2-固定时长
          RELEASE_TIME: null, //释放指定时间
          FIXED_DURATION: null, //固定时长
          RELEASE_DAY_TYPE: null, // 固定时长类型
          TIME_UNIT: null, // 单位 1-分钟 2-小时 3-天
        },
        ruleValidate: {
          HOLD_ORDER_REASON: [{ required: true, message: ' ' }]
        }
      },
      formConfig5: {
        formData: [
          {
            style: 'checkbox',
            label: 'Hold单原因',
            colname: 'HOLD_ORDER_IS',
            width: '5',
            circle:true,
            radioChange: e => {
              this.masterModifyData('HOLD_ORDER_REASON', 'formConfig3')
            },
            checkboxLabel:"其他"
          },
          {
            style: 'checkbox',
            label: '自动释放',
            colname: 'IS_AUTO_RELEASE',
            width: '3',
            checkboxChange: (val) => {
              this.masterModifyData('IS_AUTO_RELEASE', 'formConfig3')
              if (val) {
                this.formConfig5.formData[2].style = 'select';
              } else {
                this.formConfig5.formData[2].style = '';
                this.formConfig5.formData[3].style = '';
                this.formConfig5.formValue.RELEASE_TIME_TYPE = null;// 释放时点 1-指定时间点 2-固定时长
                this.formConfig5.formValue.RELEASE_TIME = null;//释放指定时间
                this.formConfig5.formValue.FIXED_DURATION = null; //固定时长
                this.formConfig5.formValue.RELEASE_DAY_TYPE = null; // 固定时长类型
                this.formConfig5.formValue.TIME_UNIT = null; // 单位 1-分钟 2-小时 3-天
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
              this.formConfig5.formData[3].style = 'formCompile';
              if (val.value == 1) {
                this.formConfig5.formValue.FIXED_DURATION = null; //固定时长
                this.formConfig5.formValue.RELEASE_DAY_TYPE = null; // 固定时长类型
                this.formConfig5.formValue.TIME_UNIT = null; // 单位 1-分钟 2-小时 3-天
              } else {
                console.log('固定时长');
                this.formConfig5.formValue.RELEASE_TIME = null;//释放指定时间
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
            label: $i18n.t('form_label.timeType'), // 时间类型
            slotName: 'spec05',
            width: '10',
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
        ],
        formValue: {
          HOLD_ORDER_REASON: 10, //hold单原因
          HOLD_ORDER_IS:false,
          IS_AUTO_RELEASE: false, //是否自动释放
          RELEASE_TIME_TYPE: null,// 释放时点 1-指定时间点 2-固定时长
          RELEASE_TIME: null, //释放指定时间
          FIXED_DURATION: null, //固定时长
          RELEASE_DAY_TYPE: null, // 固定时长类型
          TIME_UNIT: null, // 单位 1-分钟 2-小时 3-天
        },
        ruleValidate: {
          HOLD_ORDER_REASON: [{ required: true, message: ' ' }]
        }
      },
      formConfig6: {
        formData: [
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
        },
        ruleValidate: {
          ORDER_FROM_TAB: [{ required: true, message: ' ' }],
        }
      },
      // tab切换配置
      labelList: [
        {
          label: $i18n.t('panel_label.operationLog'), // 操作日志
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
      // const data = { label: 'hold策略编辑', name:keepAliveModuleName}; //当前界面模块名称 
      // self.$store.commit('global/modifycurrentLabel' , data)
      this.initData();
      // 日志
      self.subTableConfig = {
        centerName: 'strategyPlatform',
        tablename: this.labelDefaultValue,
        objid: self.ID,
      }
    }
  },
  async created() {
    $omsUtils.getPermissions(this, 'btnConfig', { serviceId: 'r3-oc-oms', table: this.$route.params.customizedModuleName, type: 'OBJ' }, true);
  },
  methods: {
    checkShow(){
   
     if (this.formConfig2.formValue.ORDER_FLAG) {
       this.formConfig3.formData[0].label = "Hold单原因"
       this.formConfig3.formData[0].class = ""
     }
     if (this.formConfig2.formValue.preSale && !this.formConfig2.formValue.ORDER_FLAG) {
      this.formConfig4.formData[0].label = "Hold单原因"
      this.formConfig4.formData[0].class = ""
     }
     if (this.formConfig2.formValue.preSale && this.formConfig2.formValue.ORDER_FLAG) {
      this.formConfig4.formData[0].class = "radio-label"
     }


    },
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
        this.formConfig1.formData[2].style = 'input'
        this.formConfig1.formData[2].disabled = true
        formValue1.ECODE = data.ECODE;
        formValue1.ENAME = data.ENAME;
        formValue1.ISACTIVE = data.ISACTIVE === 'Y' ? '启用' : '停用';
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
        formValue3.HOLD_ORDER_REASON = data.HOLD_ORDER_REASON == 1 ? 1 : 2;
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
        data.ORDER_FLAG_TYPE.split(",").forEach(item => {
          switch (item) {
            case '1':
              this.formConfig2.formValue.ORDER_FLAG = true
              break;
            case '2':
              this.formConfig2.formValue.preSale = true
              break;
            case '3':
              this.formConfig2.formValue.preSale1 = true
              break;
            case '4':
              this.formConfig2.formValue.preSale2 = true
              break;
            case '5':
              this.formConfig2.formValue.preSale3 = true
              break;
          }
        })
        data.ST_C_HOLD_ORDER_STRATEGY_ITEM.forEach(item=>{
          if (item.HOLD_ORDER_REASON == "1") {
            for (const k in this.formConfig3.formValue) {
              this.formConfig3.formValue[k] = item[k]
            }
          }else if (item.HOLD_ORDER_REASON == "2") {
            for (const k in this.formConfig4.formValue) {
              this.formConfig4.formValue[k] = item[k]
            }
          }else{
            for (const k in this.formConfig5.formValue) {
              this.formConfig5.formValue[k] = item[k]
            }
          }
        })

        if (formValue1.ISACTIVE == '启用') {
          this.formConfig3.formData[0].label = "Hold单原因"
          this.formConfig3.formData[0].class = ""
          this.formConfig5.formData[0].class = "radio-label"

          this.formConfig3.formData[1].disabled = true
          this.formConfig4.formData[1].disabled = true
          this.formConfig5.formData[1].disabled = true

          this.formConfig3.formData[0].options[0].disabled = true
          this.formConfig4.formData[0].options[0].disabled = true
          this.formConfig5.formData[0].disabled = true
        }


        
      }
    },
    // 保存
    async save() {
      const self = this;
      // 校验必选
      let requriredArr = ['ENAME', 'VALID_BEGIN_TIME', 'VALID_END_TIME', 'PS_C_PRO_ID', 'ORDER_FROM_TAB'];//必须选项
      let labelArr = ['策略名称', '生效开始时间', '生效结束时间', '店铺名称', '订单标签']
      let formConfig2 = this.formConfig2.formValue;
      if (formConfig2.IS_DATE_TYPE) {
        requriredArr.push('DAY_TYPE');
        labelArr.push('时间类型及时间');
        if (formConfig2.DAY_TYPE && !formConfig2.TIME[0]) {
          self.$Message.warning('时间类型的时间不能为空，请填写！');
          return;
        }
      }
      // if (formConfig2.ORDER_TAB_TYPE) {
      //   requriredArr.push('ORDER_FLAG');
      //   labelArr.push('单据标签')

      // }
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

      console.log(requriredArr, labelArr);//ORDER_TAB_TYPE
      if (!self.resultTipsHand(requriredArr, labelArr)) return;
      let formValues = {};
      formValues = Object.assign(formValues, this.formConfig1.formValue, formConfig2, this.formConfig3.formValue);
      let { PS_C_PRO_ID, TIME, ...params } = formValues;
      console.log(this.formConfig3.formValue, PS_C_PRO_ID, TIME);
      // 特殊
      params = Object.assign(params, this.paramsTime)
      params.ORDER_TAB_TYPE = params.ORDER_TAB_TYPE ? 1 : 0;
      params.ORDER_FLAG = params.ORDER_FLAG ? 1 : 0;
      params.IS_DATE_TYPE = params.IS_DATE_TYPE ? 1 : 0;
      params.ID = this.ID
      let ORDER_FLAG_TYPE = [] //单据标签入参
      if (params.ORDER_FLAG) {
        ORDER_FLAG_TYPE.push(1)
      }
      if (params.preSale) {
        ORDER_FLAG_TYPE.push(2)
      }
      if (params.preSale1) {
        ORDER_FLAG_TYPE.push(3)
      }
      if (params.preSale2) {
        ORDER_FLAG_TYPE.push(4)
      }
      if (params.preSale3) {
        ORDER_FLAG_TYPE.push(5)
      }
      params.ORDER_FLAG_TYPE = ORDER_FLAG_TYPE.join(",")

      // 如果是编辑
      if (!params.BEGIN_TIME) {
        params.BEGIN_TIME = formValues.TIME[0];
        params.END_TIME = formValues.TIME[1];
      }
      if (self.ID > 0 && !self.$route.query.spuid) {
        params.ISACTIVE = params.ISACTIVE ? 'Y' : 'N'
        params.IS_AUTO_RELEASE = params.IS_AUTO_RELEASE ? 1 : 0
      }
      if (this.formConfig3.formValue.RELEASE_TIME_TYPE !== 1) {
        params.RELEASE_TIME = null;
      }

      //增加变更需求》增加预售 调整入参  去除多余字段
      let refdata = {
        ID: params.ID,
        ECODE: params.ECODE,
        ENAME: params.ENAME,
        VALID_BEGIN_TIME: params.VALID_BEGIN_TIME,
        VALID_END_TIME: params.VALID_END_TIME,
        IS_DATE_TYPE: params.IS_DATE_TYPE,
        DAY_TYPE: params.DAY_TYPE,
        BEGIN_TIME: params.BEGIN_TIME,
        END_TIME: params.END_TIME,
        ORDER_TAB_TYPE: params.ORDER_TAB_TYPE,
        ORDER_FLAG_TYPE: params.ORDER_FLAG_TYPE,
        CP_C_SHOP_IDS: params.CP_C_SHOP_IDS,
        ORDER_FROM_TAB: this.formConfig6.formValue.ORDER_FROM_TAB
      }
      let ST_C_HOLD_ORDER_STRATEGY_ITEM = []
      if (this.formConfig2.formValue.ORDER_FLAG && !this.formConfig2.formData[2].disabled) {
       let obj = {
          HOLD_ORDER_REASON: this.formConfig3.formValue.HOLD_ORDER_REASON,
          IS_AUTO_RELEASE: this.formConfig3.formValue.IS_AUTO_RELEASE,
          RELEASE_TIME_TYPE: this.formConfig3.formValue.RELEASE_TIME_TYPE,
          RELEASE_DAY_TYPE: this.formConfig3.formValue.RELEASE_DAY_TYPE,
          RELEASE_TIME: this.formConfig3.formValue.RELEASE_TIME,
          FIXED_DURATION: this.formConfig3.formValue.FIXED_DURATION,
          TIME_UNIT: this.formConfig3.formValue. TIME_UNIT,
        }
        ST_C_HOLD_ORDER_STRATEGY_ITEM.push(obj)
      }

      if (this.formConfig2.formValue.preSale && !this.formConfig2.formData[2].disabled) {
        let obj = {
          HOLD_ORDER_REASON: this.formConfig4.formValue.HOLD_ORDER_REASON,
          IS_AUTO_RELEASE: this.formConfig4.formValue.IS_AUTO_RELEASE,
          RELEASE_TIME_TYPE: this.formConfig4.formValue.RELEASE_TIME_TYPE,
          RELEASE_DAY_TYPE: this.formConfig4.formValue.RELEASE_DAY_TYPE,
          RELEASE_TIME: this.formConfig4.formValue.RELEASE_TIME,
          FIXED_DURATION: this.formConfig4.formValue.FIXED_DURATION,
          TIME_UNIT: this.formConfig4.formValue.TIME_UNIT,
        }
        ST_C_HOLD_ORDER_STRATEGY_ITEM.push(obj)
      }
 
      if (this.formConfig5.formValue.HOLD_ORDER_IS) {
        let obj = {
          HOLD_ORDER_REASON: this.formConfig5.formValue.HOLD_ORDER_REASON,
          IS_AUTO_RELEASE: this.formConfig5.formValue.IS_AUTO_RELEASE,
          RELEASE_TIME_TYPE: this.formConfig5.formValue.RELEASE_TIME_TYPE,
          RELEASE_DAY_TYPE: this.formConfig5.formValue.RELEASE_DAY_TYPE,
          RELEASE_TIME: this.formConfig5.formValue.RELEASE_TIME,
          FIXED_DURATION: this.formConfig5.formValue.FIXED_DURATION,
          TIME_UNIT: this.formConfig5.formValue.TIME_UNIT,
        }
        ST_C_HOLD_ORDER_STRATEGY_ITEM.push(obj)
      }




      let { data: { code, data, message } } = await this.service.strategyPlatform.holdOrderHoldStrategySave({ "ST_C_HOLD_ORDER_STRATEGY": refdata, ST_C_HOLD_ORDER_STRATEGY_ITEM });
      if (code === 0) {
        // 情况已经存储的字段
        self.modify = [];
        self.$Message.success(message || 'no message！');
        if (self.ID > 0 && !self.$route.query.spuid) {
          console.log('编辑');
          self.onOk();
        } else {
          console.log('新增');
          this.$store.commit('global/tabOpen', {
            type: 'tableDetailAction',
            label: this.getCustomLabel(true), // HOLD单策略编辑
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
        value = $omsUtils.defaultEndTime(value, oldTime)
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
          className: 'ark-dialog',
          title: $i18n.t('modalTitle.tips'), // 提示
          content: $i18n.t('modalTips.hu'), // 当前修改未保存，确定返回？
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
      Object.assign(formValues, this.formConfig1.formValue, this.formConfig2.formValue, this.formConfig3.formValue, this.formConfig6.formValue);
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
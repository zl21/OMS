import businessButton from 'professionalComponents/businessButton';
import businessActionTable from 'professionalComponents/businessActionTable';
import businessForm from 'professionalComponents/businessForm';
import businessLabel from 'professionalComponents/businessLabel';
import businessStatusFlag from 'professionalComponents/businessStatusFlag';
import subTable from 'professionalComponents/subTable';
import modifycurrentLabel from '../../../assets/js/mixins/modifycurrentLabel';

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
  mixins: [modifycurrentLabel],
  data() {
    return {
      ID: this.$route.params.customizedModuleId && this.$route.params.customizedModuleId != 'New' ? this.$route.params.customizedModuleId : '-1', // 记录主界面传入的ID
      showSubtablePart: false,
      modify: {
        master: {}
      },
      loading: false,
      isWatchChange: false, // 监听
      isModify: false,
      isEnable: false,
      btnConfig: {
        typeAll: 'default',
        buttons: [
          {
            webname: 'ST_C_TMALL_EXCHANGE_MAIN_SAVE',
            text: '保存',
            disabled: false, // 按钮禁用控制
            isShow: false,
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
        ]
      },
      paramsTime: {},
      formConfig1: {
        formData: [
          {
            style: null,
            colname: 'ECODE',
            label: '策略ID',
            width: '12'
          },
          {
            style: 'input',
            colname: 'ENAME',
            label: '策略名称',
            width: '12',
            inputChange: () => {
              this.masterModifyData('ENAME', 'master', 'formConfig1');
            }
          },
          {
            version: '1.4',
            colname: 'CP_C_SHOP_ID',
            style: 'popInput', // 输入框弹框单多选
            width: '12',
            itemdata: {
              col: 1,
              colid: 179601, // 当前字段的ID
              colname: 'CP_C_SHOP_ID', // 当前字段的名称
              datelimit: 'all',
              display: 'text', // 显示什么类型，例如xml表示弹窗多选加导入功能，mrp表示下拉多选
              fkdisplay: 'drp', // 外键关联类型
              fkdesc: '店铺',
              inputname: 'CP_C_SHOP_ID:ECODE', // 这个是做中文类型的模糊查询字段，例如ENAME
              isfk: true, // 是否有fk键
              isnotnull: true, // 是否必填
              isuppercase: false, // 是否转大写
              length: 65535, // 最大长度是多少
              name: '店铺名称', // 赔付类型
              readonly: false, // 是否可编辑，对应input   readonly属性
              reftable: 'CP_C_SHOP', // 对应的表
              reftableid: 171534, // 对应的表ID
              row: 1,
              statsize: -1,
              type: 'STRING', // 这个是后台用的
              valuedata: '', // 这个是选择的值
              pid: '', // 啥 ？？？
            },
            oneObj: (e) => { 
              this.formConfig1.formValue.CP_C_SHOP_ID = e.pid;
              this.formConfig1.formValue.CP_C_SHOP_TITLE = e.valuedata;
              this.masterModifyData('CP_C_SHOP_ID', 'master', 'formConfig1');
              this.masterModifyData('CP_C_SHOP_TITLE', 'master', 'formConfig1');
              this.tamallExchangeAddrs()
            },
          },
          {
            style: 'select',
            label: '换货地址',
            width: '12',
            colname: 'EXCHANGE_ADDR_ID',
            options: [],
            onOpenChange: (flag) => {
              const _this = this;
              if (flag && !_this.formConfig1.formValue.CP_C_SHOP_ID) {
                _this.$Message.warning('请先选择店铺！');
                return;
              }
            },
            selectChange: (val = {}) => {
              const { label, value } = val;
              this.formConfig1.formValue.EXCHANGE_ADDR = label;
              this.formConfig1.formValue.EXCHANGE_ADDR_ID = value;
              this.masterModifyData('EXCHANGE_ADDR', 'master', 'formConfig1')
              this.masterModifyData('EXCHANGE_ADDR_ID', 'master', 'formConfig1')
            },
          },
          // {
          //   style: null,
          //   colname: 'ISACTIVE',
          //   label: '启用状态',
          //   width: '6',
          //   switchChange: () => {
          //     this.masterModifyData('ISACTIVE', 'master', 'formConfig1')
          //     this.isEnable = this.formConfig1.formValue.ISACTIVE;
          //     this.setEnable()
          //   }
          // },
        ],
        formValue: {
          ECODE: '', // 策略ID
          ENAME: '', // 策略名称
          CP_C_SHOP_ID: '', // 店铺
          EXCHANGE_ADDR: '', // 换货地址
          EXCHANGE_ADDR_ID: '',
          // ISACTIVE: false // 启用状态
        },
        ruleValidate: {
          ECODE: [{ required: true, message: ' ' }],
          ENAME: [{ required: true, message: ' ' }],
          CP_C_SHOP_ID: [{ required: true, message: ' ' }],
          EXCHANGE_ADDR_ID: [{ required: true, message: ' ' }],
        }
      },
      formConfig2: {
        formData: [
          {
            label: '换货说明',
            subLabel: '偏差N元同意换货<=',
            style: 'formCompile',
            colname: 'IS_AUTO_APPROVE',
            class: 'soltDom',
            format: 'yyyy-MM-dd HH:mm:ss',
            slotName: 'exchangeDesc',
            regx: /^-?\d{0,15}(\.[0-9]{0,2})?$/,
            width: '24',
            disabled: false,
            options: [
              {
                label: '全部',
                value: '2'
              },
              {
                label: '有',
                value: '1'
              },
              {
                label: '没有',
                value: '0'
              }
            ],
            switchChange: () => {
              this.masterModifyData('IS_AUTO_APPROVE', 'master', 'formConfig2')
              this.setRequired('IS_AUTO_APPROVE')
            },
            checkChange: val => {
              console.log(val);
              let newVal
              let oldVal = this.modify.master.EXCHANGE_DESC || []
              if (
                oldVal.length == 0 && val.includes(2) 
                || !oldVal.includes('2') && val.includes('2') 
                || val.includes('1') && val.includes('0') && !oldVal.includes('2')) {
                newVal = ['0', '1', '2']
              } else if (!val.includes('2') && oldVal.includes('2')) {
                newVal = []
              } else if (oldVal.length == 3) {
                newVal = val.filter(i => i != '2')
              } else {
                newVal = val
              }
              console.log(newVal);
              this.formConfig2.formValue.EXCHANGE_DESC = newVal
              this.masterModifyData('EXCHANGE_DESC', 'master', 'formConfig2')
            },
            inputChange: () => {
              this.masterModifyData('AOTU_APPROVE_DEVIATION_PRICE', 'master', 'formConfig2');
            }
          },
          {
            label: '缺货自动拒绝',
            subLabel1: '缺货自动拒绝换货原因',
            subLabel2: '缺货自动拒绝文案',
            style: 'formCompile',
            slotName: 'stockout',
            reqStr: true,
            colname: 'OOS_AUTO_REJECT',
            class: 'soltDom',
            width: '24',
            disabled: false,
            options: [], // 缺货自动拒绝换货原因
            switchChange: () => {
              this.masterModifyData('OOS_AUTO_REJECT', 'master', 'formConfig2');
              this.setRequired('OOS_AUTO_REJECT')
            },
            selectChange: (val = {}) => {
              const { label, value } = val;
              this.formConfig2.formValue.OOS_AUTO_REJECT_REASON = label;
              this.formConfig2.formValue.OOS_AUTO_REJECT_REASON_ID = value;
              this.masterModifyData('OOS_AUTO_REJECT_REASON_ID', 'master', 'formConfig2');
              this.masterModifyData('OOS_AUTO_REJECT_REASON', 'master', 'formConfig2');
            },
            inputChange: () => {
              this.masterModifyData('OOS_AUTO_REJECT_DESC', 'master', 'formConfig2');
            }
          },
          {
            label: '偏差N元自动拒绝',
            subLabel1: '偏差N元拒绝换货>',
            subLabel2: '偏差N元自动拒绝换货原因',
            subLabel3: '偏差N元自动拒绝文案',
            style: 'formCompile',
            slotName: 'bias',
            reqStr: true,
            colname: 'DEVIATION_AUTO_REJECT',
            regx: '/^(-|\+)?\d{0,15}(\.[0-9]{0,2})?$/',
            class: 'soltDom',
            width: '24',
            disabled: false,
            options: [],
            switchChange: () => {
              this.masterModifyData('DEVIATION_AUTO_REJECT', 'master', 'formConfig2');
              this.setRequired('DEVIATION_AUTO_REJECT')
            },
            inputChange: () => {
              this.masterModifyData('AUTO_REJECT_DEVIATION_PRICE', 'master', 'formConfig2');
            },
            selectChange: (val = {}) => {
              const { label, value } = val;
              this.formConfig2.formValue.DEVIATION_AUTO_REJECT_REASON = label;
              this.formConfig2.formValue.DEVIATION_AUTO_REJECT_REASON_ID = value;
              this.masterModifyData('DEVIATION_AUTO_REJECT_REASON_ID', 'master', 'formConfig2');
              this.masterModifyData('DEVIATION_AUTO_REJECT_REASON', 'master', 'formConfig2');
            },
            inputChange2: () => {
              this.masterModifyData('DEVIATION_AUTO_REJECT_DESC', 'master', 'formConfig2');
            }
          },
        ],
        formValue: {
          IS_AUTO_APPROVE: false, // 控制换货说明的开关
          EXCHANGE_DESC: [], // check
          AOTU_APPROVE_DEVIATION_PRICE: 0, // 偏差N元同意换货
          OOS_AUTO_REJECT: false, // 控制缺货自动拒绝的开关
          OOS_AUTO_REJECT_REASON: '',
          OOS_AUTO_REJECT_REASON_ID: '', // 缺货自动拒绝换货原因
          OOS_AUTO_REJECT_DESC: '', // 缺货自动拒绝文案
          DEVIATION_AUTO_REJECT: false, // 控制偏差N元自动拒绝的开关
          AUTO_REJECT_DEVIATION_PRICE: 0, // 偏差N元拒绝换货>
          DEVIATION_AUTO_REJECT_REASON: '', // 偏差N元自动拒绝换货原因
          DEVIATION_AUTO_REJECT_REASON_ID: '',
          DEVIATION_AUTO_REJECT_DESC: '', // 偏差N元自动拒绝文案
        },
        ruleValidate: {
          EXCHANGE_DESC: { required: false, message: ' ' },
          AOTU_APPROVE_DEVIATION_PRICE: { required: false, message: ' ' },
          DEVIATION_AUTO_REJECT_REASON_ID: { required: false, message: ' ' },
          OOS_AUTO_REJECT_REASON_ID: { required: false, message: ' ' },
          AUTO_REJECT_DEVIATION_PRICE: { required: false, message: ' ' },
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
        objid: '',
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
    await this.getBtn()
    this.isWatchChange = true;
    this.tamallExchangeReasons();
    this.ID > 0 && this.queryOrder();
  },
  created() { },
  methods: {
    // 获取按钮权限
    async getBtn() {
      let params = { table: 'ST_C_TMALL_EXCHANGE_ORDER', type: 'OBJ', serviceId: 'r3-oc-oms' }
      const { ACTIONS, SUB_ACTIONS } = await this.$OMS2.omsUtils.getPermissions(this, 'btnConfig', params, true)
      const mainWebArr = $OMS2.omsUtils.sonList(ACTIONS, 'webname');
      this.btnConfig.buttons.forEach(item => {
        item.webname != 'fix_back' && (item.isShow = mainWebArr.includes(item.webname))
      })
    },
    // 查询
    async queryOrder() {
      const { data: { code, data } } = await this.service.strategyPlatform.tamallExchangeOrder({ ID: this.ID });
      if (code == 0) {
        this.isWatchChange = false;
        this.isEnable = data.isactive == 'Y'
        this.$OMS2.omsUtils.intersectFormValue(this.formConfig1.formValue, data)
        this.$OMS2.omsUtils.intersectFormValue(this.formConfig2.formValue, data)
        this.queryForm(this.formConfig1, 'CP_C_SHOP_ID').itemdata.pid = data.CP_C_SHOP_ID
        this.queryForm(this.formConfig1, 'CP_C_SHOP_ID').itemdata.valuedata = data.CP_C_SHOP_TITLE
        this.queryForm(this.formConfig1, 'ECODE').style = 'input'
        // this.queryForm(this.formConfig1, 'ISACTIVE').style = 'switch'
        // this.formConfig1.formValue.ISACTIVE = this.isEnable
        this.formConfig2.formValue.IS_AUTO_APPROVE = !!data.IS_AUTO_APPROVE
        this.formConfig2.formValue.OOS_AUTO_REJECT = !!data.OOS_AUTO_REJECT
        this.formConfig2.formValue.DEVIATION_AUTO_REJECT = !!data.DEVIATION_AUTO_REJECT
        this.formConfig2.formValue.EXCHANGE_DESC = data.EXCHANGE_DESC.split(',')
        this.setEnable()
        this.setRequired('IS_AUTO_APPROVE')
        this.setRequired('OOS_AUTO_REJECT')
        this.setRequired('DEVIATION_AUTO_REJECT')
        await this.tamallExchangeAddrs(data)
        this.isWatchChange = true;
      }
    },
    // 保存
    async save() {
      const self = this;
      const formConfig = {
        formData: [
          ...this.formConfig1.formData,
          ...this.formConfig2.formData
        ],
        formValue: {
          ...this.formConfig1.formValue,
          ...this.formConfig2.formValue
        }
      }
      let valueArr = ['ENAME', 'EXCHANGE_ADDR_ID'];
      let drpArr = ['CP_C_SHOP_ID']
      let msg = this.$OMS2.omsUtils.validatorNotEmpty(formConfig, valueArr, drpArr);
      let novalid = this.isValid()
      msg = msg
        ? msg.replace(/ 不能为空!/, '').split('，').concat(novalid).join('，')
        : novalid.join('，')

      if (msg) {
        self.$message.error(`${msg} 不能为空!`);
        return false;
      }

      let params = {
        ID: this.ID,
        ...(this.isModify ? this.modify.master : formConfig.formValue)
      }
      Object.keys(params).forEach(i => {
        switch (i) {
          // case 'ISACTIVE':
          //   params[i] = params[i] ? 'Y' : 'N'
          //   break;
          case 'IS_AUTO_APPROVE':
          case 'DEVIATION_AUTO_REJECT':
          case 'OOS_AUTO_REJECT':
            params[i] = params[i] ? 1 : 0
            break;
          case 'EXCHANGE_DESC':
            if (params[i].includes(2)) {
              params[i] = '0,1'
            } else {
              params[i] = String(params[i])
            }
            break;
          default:
            break;
        }
      })
      this.loading = true
      this.service.strategyPlatform.tamallExchangeOrderSave(params)
      .then(({ data: { code, data, message }}) => {
        this.loading = false
        if (code == 0) {
          this.modify = {
            master: {}
          }
          this.isModify = false
          this.$message.success(message)
          this.onOk(this.ID == -1 && data.objId)
        }
      }).catch(() => this.loading = false)
    },
    // 自动拒绝原因
    async tamallExchangeReasons(obj = {}) {
      const { OOS_AUTO_REJECT_REASON_ID, OOS_AUTO_REJECT_REASON, DEVIATION_AUTO_REJECT_REASON, DEVIATION_AUTO_REJECT_REASON_ID } = obj
      const { CP_C_SHOP_ID } = this.formConfig1.formValue
      const { data: { code, data, message } } = await this.service.strategyPlatform.tamallExchangeReasons({ CP_C_SHOP_ID })
      let result = data.length ? data.map(i => ({ label: i.ENAME, value: i.ID })) : []
      this.queryForm(this.formConfig2, 'OOS_AUTO_REJECT').options = result
      this.queryForm(this.formConfig2, 'DEVIATION_AUTO_REJECT').options = result
      this.formConfig2.formValue.OOS_AUTO_REJECT_REASON = OOS_AUTO_REJECT_REASON || ''
      this.formConfig2.formValue.OOS_AUTO_REJECT_REASON_ID = OOS_AUTO_REJECT_REASON_ID || ''
      this.formConfig2.formValue.DEVIATION_AUTO_REJECT_REASON = DEVIATION_AUTO_REJECT_REASON || ''
      this.formConfig2.formValue.DEVIATION_AUTO_REJECT_REASON_ID = DEVIATION_AUTO_REJECT_REASON_ID || ''
      code != 0 && this.$Message.error(message)
    },
    // 换货地址
    async tamallExchangeAddrs({ EXCHANGE_ADDR_ID, EXCHANGE_ADDR } = {}) {
      const { CP_C_SHOP_ID } = this.formConfig1.formValue
      const { data: { code, data } } = await this.service.strategyPlatform.tamallExchangeAddrs({ CP_C_SHOP_ID })
      let result = data && data.length ? data.map(i => ({ label: i.ENAME, value: i.ID })) : []
      this.queryForm(this.formConfig1, 'EXCHANGE_ADDR_ID').options = result
      this.formConfig1.formValue.EXCHANGE_ADDR_ID = EXCHANGE_ADDR_ID || ''
      this.formConfig1.formValue.EXCHANGE_ADDR = EXCHANGE_ADDR || ''
    },
    // 字段是否必填
    setRequired(fieldName) {
      let val = this.formConfig2.formValue[fieldName];
      switch (fieldName) {
        case 'IS_AUTO_APPROVE':
          this.formConfig2.ruleValidate.EXCHANGE_DESC.required = val;
          this.formConfig2.ruleValidate.AOTU_APPROVE_DEVIATION_PRICE.required = val;
          break;
        case 'OOS_AUTO_REJECT':
          this.formConfig2.ruleValidate.OOS_AUTO_REJECT_REASON_ID.required = val;
          break;
        case 'DEVIATION_AUTO_REJECT':
          this.formConfig2.ruleValidate.AUTO_REJECT_DEVIATION_PRICE.required = val;
          this.formConfig2.ruleValidate.DEVIATION_AUTO_REJECT_REASON_ID.required = val;
          break;
        default:
          break;
      }
    },       
    // 主子表字段是否可编辑
    setEnable() {
      const FIELDS = ['ENAME', 'EXCHANGE_ADDR_ID']
      this.formConfig1.formData.forEach(i => {
        i.disabled = this.isEnable ? i.colname != 'ENAME' : !FIELDS.includes(i.colname)
      })
      this.formConfig2.formData.forEach(i => {
        i.disabled = this.isEnable
      })
      this.queryForm(this.formConfig1, 'CP_C_SHOP_ID').itemdata.readonly = this.isEnable
    },
    // 校验
    isValid() {
      let msg = []
      let tip = {
        EXCHANGE_DESC: '换货说明',
        AOTU_APPROVE_DEVIATION_PRICE: '偏差N元同意换货',
        OOS_AUTO_REJECT_REASON_ID: '缺货自动拒绝换货原因',
        AUTO_REJECT_DEVIATION_PRICE: '偏差N元拒绝换货',
        DEVIATION_AUTO_REJECT_REASON_ID: '偏差N元自动拒绝换货原因'
      }
      for (let key in this.formConfig2.ruleValidate) {
        let val = this.formConfig2.formValue[key]
        if (this.formConfig2.ruleValidate[key].required) {
          if (Array.isArray(val) && !val.length) {
            msg.push(tip[key])
          } else if (typeof val == 'number') {
          } else if (!val) {
            msg.push(tip[key])
          }
        } 
      }
      return msg
    },
    queryForm(formConfig, field) {
      return formConfig.formData.find((item) => item.colname == field);
    },
    /**
     * 记录主表修改信息方法
     * @param {*} ecode 记录字段
     * @param {*} obj 修改值存在modify下的某个对象中
     * @param {*} formName 表单配置名
     */
    masterModifyData(ecode, obj, formName) {
      if (!this.isWatchChange) return;
      const self = this;
      self.isModify = true;
      self.modify[obj][ecode] = self[formName].formValue[ecode];
    },
    // 返回
    back() {
      if (this.isModify) {
        this.$Modal.info({
          title: $i18n.t('modalTitle.tips'), // 提示
          content: '当前修改未保存，确定返回？',
          mask: true,
          showCancel: true,
          okText: $i18n.t('common.determine'), // 确定
          cancelText: $i18n.t('common.cancel'), // 取消
          onOk: () => {
            this.onOk();
          },
        });
      } else {
        this.onOk();
      }
    },
    onOk(id) {
      this.$comUtils.tabCloseAppoint(this);
      this.$destroy(true);
      if (id) {
        this.$store.commit('global/tabOpen', {
          type: 'C',
          label: '天猫换货策略编辑',
          customizedModuleId: id,
          customizedModuleName: this.customizedModuleName
        });
      } else {
        this.$store.commit('global/tabOpen', {
          tableId: 10731,
          type: 'S',
          tableName: this.customizedModuleName,
          back: true
        });
      }
    },
  }
};

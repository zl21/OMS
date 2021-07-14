import businessButton from 'professionalComponents/businessButton';
import businessForm from 'professionalComponents/businessForm';
import businessLabel from 'professionalComponents/businessLabel';
import businessStatusFlag from 'professionalComponents/businessStatusFlag';
import subTable from 'professionalComponents/subTable';
import dateUtil from '@/assets/js/__utils__/date.js';
import modifycurrentLabel from '../../../assets/js/mixins/modifycurrentLabel';

export default {
  components: {
    businessButton,
    businessForm,
    businessLabel,
    businessStatusFlag,
    subTable
  },
  mixins: [modifycurrentLabel],
  data() {
    return {
      vmI18n:$i18n,
      collapse: ['panel_baseInfo', 'panel_conds', 'panel_action'],
      loading: false,
      isEnable: false, // 是否启用
      isModify: false,
      isWatchChange: false, // 监听
      ID: this.$route.params.customizedModuleId && this.$route.params.customizedModuleId != 'New' ? this.$route.params.customizedModuleId : '-1', // 记录主界面传入的ID
      subTableConfig: {
        centerName: '',
        tablename: '',
        objid: '',
        pageShow: true
      },
      btnConfig: {
        typeAll: 'default',
        buttons: [{
            webname: 'lookup_save', // 保存
            text: $i18n.t('btn.save'), // 保存
            size: '', // 按钮大小
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              const self = this;
              self.save();
            },
          },
          {
            webname: 'lookup_return', // 返回
            text: $i18n.t('btn.back'),
            btnclick: () => {
              this.back()
            },
          }
        ]
      },
      formConfig1: {
        formData: [{
            style: '',
            label: '策略ID',
            colname: 'PLAN_ID',
            width: '6',
            disabled: false,
            inputChange: () => {
              this.masterModifyData('PLAN_ID', 'master', 'formConfig1');
            }
          },
          {
            style: 'input',
            label: '策略名称',
            colname: 'PLAN_NAME',
            width: '6',
            disabled: false,
            inputChange: () => {
              this.masterModifyData('PLAN_NAME', 'master', 'formConfig1');
            }
          },
          {
            style: 'date', // 输入框类型
            label: '生效开始时间', // 输入框前文字
            colname: 'EFFECTIVE_BEGIN_TIME',
            type: 'datetime',
            width: '6', // 所占的宽度 (宽度分为24份,数值代表所占份数的宽度)
            format: 'yyyy-MM-dd HH:mm:ss',
            disabled: false,
            options: {
              disabledDate (date) {
                return date && date.valueOf() < Date.now() - 86400000;
              }
            },
            onChange: () => {
              this.masterModifyData('EFFECTIVE_BEGIN_TIME', 'master', 'formConfig1');
            }
          },
          {
            style: 'date', // 输入框类型
            label: '生效结束时间', // 输入框前文字
            colname: 'EFFECTIVE_END_TIME',
            type: 'datetime',
            width: '6', // 所占的宽度 (宽度分为24份,数值代表所占份数的宽度)
            format: 'yyyy-MM-dd HH:mm:ss',
            disabled: false,
            options: {
              disabledDate (date) {
                return date && date.valueOf() < Date.now() - 86400000;
              }
            },
            onChange: () => {
              this.masterModifyData('EFFECTIVE_END_TIME', 'master', 'formConfig1');
            }
          },
          {
            style: '',
            label: '启用状态',
            colname: 'ISACTIVE',
            width: '6',
            disabled: true,
            // inputChange: () => {
            //   this.masterModifyData('ISACTIVE', 'master', 'formConfig1');
            //   this.isEnable = this.formConfig1.formValue.ISACTIVE;
            //   this.setEnable();
            // }
          },
        ],
        formValue: {
          PLAN_ID: '', // 策略ID
          PLAN_NAME: '', // 策略名称
          EFFECTIVE_BEGIN_TIME: '', // 生效开始时间
          EFFECTIVE_END_TIME: '' // 生效结束时间
        },
        ruleValidate: {
          PLAN_ID: [{ required: false, message: ' ' }],
          PLAN_NAME: [{ required: true, message: ' ' }],
          EFFECTIVE_BEGIN_TIME: [{ required: true, message: ' ' }],
          EFFECTIVE_END_TIME: [{ required: true, message: ' ' }]
        }
      },
      formConfig2: {
        formData: [
          {
            version: '1.4',
            colname: 'CP_C_SHOP_ID',
            style: 'popInput', // 输入框弹框单多选
            width: '6',
            itemdata: {
              colid: 171534, // 当前字段的ID
              colname: 'CP_C_SHOP_ID', // 当前字段的名称
              fkdisplay: 'mrp', // 外键关联类型
              isfk: true, // 是否有fk键
              isnotnull: true, // 是否必填
              istooltip: true,
              name: $i18n.t('table_label.shopName'), // 店铺名称
              readonly: false, // 是否可编辑，对应input   readonly属性
              reftable: 'CP_C_SHOP', // 对应的表
              reftableid: 171534, // 对应的表ID
              valuedata: '' // 这个是选择的值
            },
            oneObj: e => {
              console.log(e);
              this.formConfig2.formValue.CP_C_SHOP_ID = e.pid;
              this.formConfig2.formValue.CP_C_SHOP_ENAME = e.valuedata;
              this.masterModifyData('CP_C_SHOP_ID', 'master', 'formConfig2');
              this.masterModifyData('CP_C_SHOP_ENAME', 'master', 'formConfig2');
            }
          },
          {
            style: 'formCompile',
            label: $i18n.t('form_label.timeType'), // 时间类型
            colname: 'BILL_TIME_TYPE',
            width: '24',
            disabled: false,
            slotName: 'timeType',
            reqStar: true, // 插槽必填标识
            options: [
              {
                value: 1,
                label: $i18n.t('form_label.orderTime'), // 下单时间
              },
              {
                value: 2,
                label: '支付时间'
              }
            ],
            radioChange: () => {
              this.masterModifyData('BILL_TIME_TYPE', 'master', 'formConfig2');
            },
            datePickerChange: () => {
              this.masterModifyData('TIME_RANGE', 'master', 'formConfig2');
            }
          },
          {
            label: '直播商品识别',
            subLabel: '识别规则',
            style: 'formCompile',
            slotName: 'rule',
            reqStar: true, // 插槽必填标识
            colname: 'RULE',
            value: 'RULE',
            width: '24',
            disabled: false,
            options: [
              {
                value: 1,
                label: $i18n.t('table_label.product_title'), // 商品标题
              },
              {
                value: 2,
                label: $i18n.t('form_label.platformCommodityID'), // 平台商品ID
              },
              {
                value: 3,
                label: $i18n.t('form_label.buyer_message'), // 买家留言
              }
            ],
            radioChange: (item) => {
              this.masterModifyData('RULE_TYPE', 'master', 'formConfig2', item);
            },
            inputChange: (item) => {
              this.masterModifyData('RULE_CONTEXT', 'master', 'formConfig2', item);
            },
            handleRuleFields: (item, index) => {
              if (index == 0) {
                this.formConfig2.formValue.RULES.push({
                  ID: -1,
                  RULE_TYPE: '',
                  RULE_CONTEXT: ''
                })
              } else {
                this.formConfig2.formValue.RULES.splice(index, 1)
                this.masterModifyData('RULE_CONTEXT', 'master', 'formConfig2', item, true)
              }
            }
          }
        ],
        formValue: {
          CP_C_SHOP_ID: '', // 店铺
          CP_C_SHOP_ENAME: '',
          BILL_TIME_TYPE: '', // 时间类型
          TIME_RANGE: [], // 时间类型
          RULES: [
            {
              ID: -1,
              RULE_TYPE: '',
              RULE_CONTEXT: ''
            }, // 识别规则
          ] // 直播商品识别
        }, 
        ruleValidate: {
          CP_C_SHOP_ID: [{
            required: true,
            message: ' '
          }],
          BILL_TIME_TYPE: [{
            required: true,
            message: ' '
          }],
          TIME_RANGE: [{
            required: true,
            message: ' '
          }],
          RULES: [{
            required: true,
            message: ' '
          }]
        }
      },
      formConfig3: {
        formData: [
          {
            style: 'input',
            label: '主播ID',
            colname: 'LIVE_ANCHOR_ID',
            width: '24',
            class: 'custom-width',
            placeholder: '请录入主播ID',
            disabled: false,
            inputChange: () => {
              this.masterModifyData('LIVE_ANCHOR_ID', 'master', 'formConfig3');
            }
          },
          {
            style: 'input',
            label: '主播昵称',
            colname: 'LIVE_ANCHOR_NAME',
            width: '24',
            class: 'custom-width',
            placeholder: '请录入主播昵称',
            disabled: false,
            inputChange: () => {
              this.masterModifyData('LIVE_ANCHOR_NAME', 'master', 'formConfig3');
            }
          },
          {
            style: 'radio',
            label: '订单标签',
            colname: 'ORDER_TAG',
            width: '24',
            disabled: false,
            options: [
              {
                value: 1,
                label: '“播”标'
              }
            ],
            radioChange: () => {
              this.masterModifyData('ORDER_TAG', 'master', 'formConfig3');
            }
          }
        ],
        formValue: {
          LIVE_ANCHOR_ID: '',
          LIVE_ANCHOR_NAME: '',
          ORDER_TAG: 1
        },
        ruleValidate: {
          ORDER_TAG: [{
            required: true,
            message: ' '
          }]
        }
      },
      // tab切换配置
      labelList: [
        {
          label: $i18n.t('panel_label.operationLog'), // 操作日志
          value: 'ST_C_LIVE_CAST_STRATEGY_LOG'
        }
      ],
      labelDefaultValue: 'ST_C_LIVE_CAST_STRATEGY_LOG', // 设置tab默认值，默认展示《自定义属性》
      // 修改的信息
      modify: {
        master: {
          rules: {
            addData: [],
            updateData: [],
            deleteData: []
          }
        }, // 主表信息
      }
    };
  },
  mounted() {
    this.ID != -1 && this.queryLiveParsing()
    this.subTableConfig = {
      centerName: 'strategyPlatform',
      tablename: this.labelDefaultValue,
      objid: this.ID,
      pageShow: true
    }
  },
  created() {},
  methods: {
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
          label: '直播解析编辑',
          customizedModuleId: id,
          customizedModuleName: 'ST_C_LIVE_CAST_STRATEGY'
        });
      } else {
        this.$store.commit('global/tabOpen', {
          tableId: 10676,
          type: 'S',
          tableName: 'ST_C_LIVE_CAST_STRATEGY',
          back: true
        });
      }
    },
    queryForm(formConfig, field) {
      return formConfig.formData.find((item) => item.colname == field);
    },
    // 时间戳格式化
    formatDate(time) {
      const date = new Date(time);
      return dateUtil.getFormatDate(date, 'yyyy-MM-dd HH:mm:ss');
    },
    /**
     * 记录主表修改信息方法
     * @param {*} ecode 记录字段
     * @param {*} obj 修改值存在modify下的某个对象中
     * @param {*} formName 表单配置名
     * @param {*} item 当前操作对象
     * @param {*} isDelete 是否是删除一条记录
     */
    masterModifyData(ecode, obj, formName, item, isDelete) {
      const self = this;
      self.isModify = true;
      if (item) {
        if (isDelete) {
          // 删除
          item.ID != -1 && self.modify[obj].rules.deleteData.push(item)
        } else if (item.ID != -1) {
          // 编辑
          const rowIndex = self.modify[obj].rules.updateData.findIndex(i => i.ID == item.ID)
          if (rowIndex != -1) {
            self.modify[obj].rules.updateData.splice(rowIndex, 1, item)
          } else {
            self.modify[obj].rules.updateData.push(item)
          }
        } else {
          // 新增
          self.modify[obj].rules.addData = self[formName].formValue.RULES.filter(i => i.ID == -1)
        }
      } else {
        let value = self[formName].formValue[ecode]
        let type = Object.prototype.toString.call(value)
        if (type == '[object Date]') {
          let newTime = this.formatDate(value)
          let oldTime = self.modify[obj][ecode]
          if (ecode == 'EFFECTIVE_END_TIME') {
            newTime = $omsUtils.defaultEndTime(newTime, oldTime)
            self[formName].formValue[ecode] = newTime
          }
          // self[formName].formValue[ecode] = newTime  // TODO END_TIME 复制失败
          self.modify[obj][ecode] = newTime
        } else {
          self.modify[obj][ecode] = self[formName].formValue[ecode];
        }
      }
    },
    // 主表字段是否可编辑
    setEnable() {
      const FIELDS = ['PLAN_ID', 'ISACTIVE']
      this.formConfig1.formData.forEach(i => {
        i.disabled = this.isEnable ? true : FIELDS.includes(i.colname)
      })
      this.formConfig3.formData.forEach(i => {
        i.disabled = this.isEnable
      })
      this.formConfig2.formData[0].itemdata.readonly = this.isEnable
    },
    // 表单赋值
    initForm(data) {
      ['formConfig1', 'formConfig2', 'formConfig3'].forEach(formName => {
        $omsUtils.intersectFormValue(this[formName].formValue, data)
      })
      this.queryForm(this.formConfig1, 'PLAN_ID').style = 'input'
      this.queryForm(this.formConfig1, 'ISACTIVE').style = 'input'
  
      const { CP_C_SHOP_ID, CP_C_SHOP_ENAME, ISACTIVE, BEGIN_TIME, END_TIME } = data
      const obj = this.queryForm(this.formConfig2, 'CP_C_SHOP_ID')
      obj.itemdata.pid = CP_C_SHOP_ID
      obj.itemdata.valuedata = CP_C_SHOP_ENAME

      this.isEnable = ISACTIVE == 'Y'
      this.formConfig1.formValue.ISACTIVE = this.isEnable ? '启用' : '停用'
      this.formConfig2.formValue.TIME_RANGE = [BEGIN_TIME, END_TIME]
      this.formConfig1.ruleValidate.PLAN_ID[0].required = true
    },
    // 查询
    async queryLiveParsing() {
      this.loading = true
      this.isWatchChange = false
      const { data: { code, data, message }} = await this.service.strategyPlatform.queryLiveParsing({ id: this.ID })
      this.loading = false
      if (code == 0) {
        if (data) {
          this.initForm(data)
          this.setEnable()
        }
        return
      }
      this.$message.error(message)
    },
    isValid(obj, validFields) {
      let valid = true;
      for (let key of validFields) {
        if (!obj[key]) {
          valid = false;
          break;
        }
      }
      return valid;
    },
    async save() { // 保存
      const self = this;
      /* =========== 保存校验 start =========== */
      const valueArr = ['PLAN_NAME', 'EFFECTIVE_BEGIN_TIME', 'EFFECTIVE_END_TIME', 'BILL_TIME_TYPE', 'ORDER_TAG']
      this.ID != -1 && valueArr.push('PLAN_ID')
      const drpArr = ['CP_C_SHOP_ID']
      const formConfig = {
        formData: [
          ...this.formConfig1.formData,
          ...this.formConfig2.formData,
          ...this.formConfig3.formData
        ],
        formValue: {
          ...this.formConfig1.formValue,
          ...this.formConfig2.formValue,
          ...this.formConfig3.formValue
        },
      }
      const mes = $omsUtils.validatorNotEmpty(formConfig, valueArr, drpArr);
  
      const [startTime] = formConfig.formValue.TIME_RANGE
      let msg
      if (mes) {
        let msgArr = mes.replace(/ 不能为空!/, '').split('，')
        msg = !startTime && !msgArr.includes('时间类型') ? [...msgArr, '时间类型'] : msgArr
      }
      msg = !mes ? startTime ? '' : ['时间类型'] : msg
      
      // 直播商品识别校验
      const hasNoValid = this.formConfig2.formValue.RULES
        .some(i => !this.isValid(i, ['RULE_TYPE', 'RULE_CONTEXT']))

      if (msg || hasNoValid) {
        let tip = msg && hasNoValid 
          ? `${msg.join('，')}，直播商品识别 不能为空!` 
          : msg && !hasNoValid ? `${msg.join('，')} 不能为空!` : `直播商品识别 不能为空!`
        self.$message.error(tip);
        return false;
      }

      // 校验识别规则是否重复
      let allRow = this.formConfig2.formValue.RULES
      .map(({ RULE_CONTEXT, RULE_TYPE }) => Object.values({ RULE_CONTEXT, RULE_TYPE }).join(' '))
      let uniqRow = Array.from(new Set(allRow))
      if (allRow.length != uniqRow.length) {
        self.$message.error('请勿重复添加直播商品识别规则!')
        return
      }
      
      /**
       * 编辑页面，如果直播商品识别未做操作就不传，否则就传所有数据, 其他字段，操作了就传
       * 
       *  const { addData, deleteData, updateData } = this.modify.master.rules
          let RULES = this.ID != -1 && ![...addData, ...deleteData, ...updateData].length
            ? [] : this.formConfig2.formValue.RULES
          let masterForm = this.ID != -1 ? this.modify.master : formConfig.formValue
       */
      let masterForm = formConfig.formValue
      let params = {
        ID: this.ID,
        ...masterForm,
        EFFECTIVE_BEGIN_TIME: this.formatDate(masterForm.EFFECTIVE_BEGIN_TIME),
        EFFECTIVE_END_TIME: this.formatDate(masterForm.EFFECTIVE_END_TIME),
        BEGIN_TIME: this.formatDate(masterForm.TIME_RANGE[0]),
        END_TIME: this.formatDate(masterForm.TIME_RANGE[1]),
        RULES: this.formConfig2.formValue.RULES,
        ISACTIVE: masterForm.ISACTIVE ? 'Y' : 'N'
      }
      delete params.rules
      this.loading = true
      const { data: { code, data, message }} = await this.service.strategyPlatform.liveParsingSave(params)
      this.loading = false
      if (code == 0) {
        this.modify = {
          master: {
            rules: {
              addData: [],
              updateData: [],
              deleteData: []
            }
          }
        }
        this.isModify = false
        this.$message.success(message)
        this.onOk(this.ID == -1 && data.objId)
        return
      }
    }
  }
};
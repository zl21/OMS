import reForm from 'professionalComponents/businessForm';
import businessButton from 'professionalComponents/businessButton';
import loading from "professionalComponents/loading";

export default {
  components: {
    loading,
    reForm,
    businessButton
  },
  name: 'holdOrderDialog',
  props: ['componentData'],
  data() {
    const _this = this;
    return {
      vmI18n:$i18n,
      holdBtnClass: '',
      loading: false,
      formConfig: {
        formValue: {
          HOLD_ORDER_REASON: '',
          IS_AUTO_RELEASE: false,
          RELEASE_TIME_TYPE: '',
          RELEASE_TIME: '',
          DAY_TYPE: '',
          FIXED_DURATION: 1,
          TIME_UNIT: ''
        },
        formData: [
          {
            style: 'select',
            // label: 'HOLD单原因',
            label: $i18n.t('form_label.hOLD_reason'),
            width: '24',
            value: 'HOLD_ORDER_REASON',
            setRequired: 'required',
            options: [
              {
                value: '1',
                // label: '直播HOLD单'
                label: $i18n.t('form_label.live_HOLD')
              },
              {
                value: '2',
                // label: '买家HOLD单'
                label: '其它HOLD单'
              }
            ]
          },
          {
            style: 'checkbox',
            // label: "自动释放",
            label: $i18n.t('form_label.automaticRelease'),
            value: 'IS_AUTO_RELEASE',
            width: 24
          }
        ],
        ruleValidate: {
          HOLD_ORDER_REASON: [{ required: true, message: ' ', trigger: 'blur' }]
        }
      },
      elseFormData: [
        {
          style: 'select',
          // label: "释放时点",
          label: $i18n.t('form_label.release_timePoint'),
          width: 24,
          value: 'RELEASE_TIME_TYPE',
          options: [
            {
              // label: "指定时点释放",
              label: $i18n.t('form_label.release_specified_timePoint'),
              value: '1'
            },
            {
              // label: "固定时长后释放",
              label: $i18n.t('form_label.release_after_fixedTime'),
              value: '2'
            }
          ],
          selectChange: () => {
            _this.formConfig.formValue.RELEASE_TIME = '';
            _this.formConfig.formValue.DAY_TYPE = '';
            _this.formConfig.formValue.FIXED_DURATION = 1;
            _this.formConfig.formValue.TIME_UNIT = '';
            if (_this.formConfig.formValue.RELEASE_TIME_TYPE === '1') _this.formConfig.formData[3] = _this.elseFormData[1];
            else _this.formConfig.formData[3] = _this.elseFormData[2];
          }
        },
        {
          style: 'date',
          type: 'datetime',
          value: 'RELEASE_TIME',
          label: ' ',
          class: 'releaseClass',
          width: 24,
          format: 'yyyy-MM-dd HH:mm:ss', // 格式参照burgeonui
          placeholder: '',
          options: {
            disabledDate(date) {
              return date && date.valueOf() < Date.now() - 86400000;
            }
          }
        },
        {
          style: 'formCompile',
          label: ' ',
          slotName: 'formCompile',
          width: 24,
          class: 'releaseClass',
          options1: [
            {
              // label: "下单时间",
              label: $i18n.t('table_label.orderTime'),
              value: '1'
            },
            {
              // label: "付款时间",
              label: $i18n.t('table_label.paymentTime'),
              value: '2'
            },
            {
              label: '创建时间',
              value: '3'
            }
          ],
          options2: [
            {
              // label: "分钟",
              label: $i18n.t('other.minute'),
              value: '1'
            },
            {
              // label: "小时",
              label: $i18n.t('other.hour'),
              value: '2'
            },
            {
              // label: "天",
              label: $i18n.t('other.day'),
              value: '3'
            }
          ]
        }
      ],
      btnConfig: {
        typeAll: 'default',
        btnsite: 'right',
        buttons: [
          {
            text: $i18n.t('common.cancel'), // 取消
            btnclick: () => {
              this.$parent.$parent.closeConfirm();
            }
          },
          {
            text: $i18n.t('common.determine'), // 确定
            btnclick: () => {
              this.confirmChange();
            }
          }
        ]
      }
    };
  },
  watch: {
    'formConfig.formValue.IS_AUTO_RELEASE': {
      handler(newValue, oldVal) {
        const formData = this.formConfig.formData;
        const oldForm = [formData[0], formData[1]];
        if (newValue) {
          this.holdBtnClass = 'holdBtnClass';
          this.formConfig.formData = [...oldForm, this.elseFormData[0]];
        }
        else {
          this.formConfig.formData = oldForm;
          this.formConfig.formValue.RELEASE_TIME_TYPE = '';
          this.formConfig.formValue.RELEASE_TIME = '';
          this.formConfig.formValue.DAY_TYPE = '';
          this.formConfig.formValue.FIXED_DURATION = 1;
          this.formConfig.formValue.TIME_UNIT = '';
        }
      }
    }
  },
  methods: {
    // 确定请求
    async confirmInfo(data) {
      this.loading = true;
      const res = await this.service.orderCenter.managementOrderHold(data);
      if (res.data.code === 0) {
        this.$Message.success(res.data.message); // 'HOLD单成功'
        if (this.$route.params.customizedModuleId == 2307) {
          // 2307：零售发货单列表
          this.$parent.$parent.closeConfirm();
          this.$nextTick(() => {
            this.$parent.$parent.$parent.query();
          });
        } else {
          this.$parent.$parent.closeConfirm();
          this.$nextTick(() => {
            this.$parent.$parent.$parent.load();
          });
        }
      } else if (res.data.code == 1 && res.data.data) {
        let tabData = res.data.data.map((row, index) => {
          row.INDEX = ++index;
          row.BILL_NO = row.objid;
          row.RESULT_MSG = row.message;
          return row
        });
        $omsUtils.tipShow('confirm', this, res, res.data.message, function (h) {
          return h('Table', {
            props: {
              columns: [
                {
                  title: $i18n.t('table_label.serialNo'), // 序号
                  key: 'INDEX'
                },
                {
                  title: '单据编号',
                  key: 'BILL_NO'
                },
                {
                  title: '失败原因',
                  key: 'RESULT_MSG'
                }
              ],
              // data:res.data.data.CANCEL_ORDER_ERROR_INFOS
              data: tabData
            }
          })
        })
      } else {
        // this.$Message.error(res.data.message);
      }
      this.loading = false;
    },
    // 确定事件校验和参数赋值
    confirmVerifyAssignment() {
      const params = {};
      const formValue = this.formConfig.formValue;
      // 判断HOLD单原因
      if (!formValue.HOLD_ORDER_REASON) {
        // return { message: "HOLD单原因不能为空" };
        return { message: $i18n.t('modalTips.zn') };
      }
      params.HOLD_ORDER_REASON = formValue.HOLD_ORDER_REASON;
      // 判断是否有勾选自动释放
      if (formValue.IS_AUTO_RELEASE) {
        // params.IS_AUTO_RELEASE = 'Y';
        params.IS_AUTO_RELEASE = true;
        params.RELEASE_TIME_TYPE = formValue.RELEASE_TIME_TYPE;
        // 判断释放时点
        if (formValue.RELEASE_TIME_TYPE === '1') {
          // 判断指定时点释放的时间
          if (!formValue.RELEASE_TIME) {
            return { message: $i18n.t('modalTips.zo') }; // 指定时点释放的时间不能为空
          }
          if (new Date(formValue.RELEASE_TIME).getTime() < Date.now()) {
            return { message: $i18n.t('modalTips.zp') }; // 指定时点释放的时间不能小于当前时间
          }
          params.RELEASE_TIME = this.$comUtils.dateFormat(formValue.RELEASE_TIME, 'yyyy-MM-dd hh:mm:ss');
        } else if (formValue.RELEASE_TIME_TYPE === '2') {
          // 判断固定时长后释放的相应参数
          if (formValue.DAY_TYPE && formValue.FIXED_DURATION && formValue.TIME_UNIT) {
            if (formValue.FIXED_DURATION.toString().indexOf('.') >= 0) {
              return { message: $i18n.t('modalTips.zq') }; // 固定时长后释放的固定时长只能是整数
            }
            params.RELEASE_DAY_TYPE = +formValue.DAY_TYPE;
            params.FIXED_DURATION = formValue.FIXED_DURATION;
            params.TIME_UNIT = +formValue.TIME_UNIT;
          } else {
            return { message: $i18n.t('modalTips.zr') }; // 固定时长后释放的相关数据不能为空
          }
        } else {
          return { message: $i18n.t('modalTips.zs') }; // 释放时点不能为空
        }
      } else {
        params.IS_AUTO_RELEASE = false;
      }
      return {
        params
      };
    },
    // 确定事件
    confirmChange() {
      const requestData = this.confirmVerifyAssignment();
      if (requestData.message) {
        this.$message.error(requestData.message);
        return
      }
      let rows = this.componentData.ids;
      let list = [];
      list = rows.map(it => ({ ID: it.ID, BILL_NO: it.BILL_NO }));
      const params = {
        ID_AND_BILL_NO_LIST: list,
        ...requestData.params
      };
      params.HOLD_ORDER_REASON *= 1;
      params.RELEASE_TIME_TYPE *= 1;
      this.confirmInfo(params);
    }
  }
};

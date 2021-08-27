import businessForm from 'professionalComponents/businessForm';
import businessButton from 'professionalComponents/businessButton';
import dateUtil from '@/assets/js/__utils__/date.js';

export default {
  name: 'AddStockInOrder',
  components: {
    businessButton,
    businessForm
  },
  props: {
    detail: {
      type: Object
    }
  },
  data() {
    return {
      vmI18n: $i18n,
      ID: '-1', // 记录主界面传入的ID
      btnConfig: {
        typeAll: 'default',
        buttons: [
          {
            text: $i18n.t('common.cancel'), // 取消
            btnclick: () => {
              this.$parent.close();
            },
          },
          {
            text: $i18n.t('common.determine'), // 确定
            size: '', // 按钮大小
            btnclick: () => {
              this.save();
            },
          },
        ],
      },
      formConfig: {
        formData: [
          {
            style: 'input', // 输入框类型
            label: '发货实体仓', // 输入框前文字
            colname: 'CP_C_PHY_WAREHOUSE_ENAME',
            value: 'CP_C_PHY_WAREHOUSE_ENAME', // 输入框的值
            width: '24', // 所占的宽度 (宽度分为24份,数值代表所占份数的宽度)
            disabled: true
          },
          {
            style: 'select',
            label: '承运商',
            value: 'CARRIER_CODE',
            width: '24',
            disabled: true,
            colname: 'CARRIER_CODE',
            options: [ // radio选项
              {
                value: 120001552,
                label: '唯品会专配',
              },
              {
                value: 1200000538,
                label: '顺丰陆运',
              }
            ]
          },
          {
            style: 'date', // 输入框类型
            label: '发货时间', // 输入框前文字
            colname: 'EXP_SENDTIME',
            type: 'datetime',
            value: 'EXP_SENDTIME', // 输入框的值
            width: '24', // 所占的宽度 (宽度分为24份,数值代表所占份数的宽度)
            format: 'yyyy-MM-dd HH:mm:ss',
            disabled: true
          },
          {
            style: 'input', // 输入框类型
            label: '航空禁运', // 输入框前文字
            colname: 'IS_AIR_EMBARGO',
            value: 'IS_AIR_EMBARGO', // 输入框的值
            width: '24', // 所占的宽度 (宽度分为24份,数值代表所占份数的宽度)
            disabled: true
          },
          {
            style: 'date', // 输入框类型
            label: '入库单结单时间', // 输入框前文字
            colname: 'STATEMENT_TIME',
            type: 'datetime',
            value: 'STATEMENT_TIME', // 输入框的值
            width: '24', // 所占的宽度 (宽度分为24份,数值代表所占份数的宽度)
            format: 'yyyy-MM-dd HH:mm:ss',
            disabled: true
          },
        ],
        formValue: {
          CP_C_PHY_WAREHOUSE_ID: '',
          CP_C_PHY_WAREHOUSE_ENAME: '',
          CARRIER_CODE: '', // 承运商
          EXP_SENDTIME: '', // 发货时间
          IS_AIR_EMBARGO: '', // 航空禁运
          STATEMENT_TIME: '' // 入库单结单时间
        }
      }
    };
  },
  computed: {
    objid() {
      const selectRow = this.$parent.$parent.selectRowData[0];
      return selectRow && selectRow.ID.val;
    }
  },
  mounted() {
    this.initForm();
  },
  methods: {
    async save() {
      let params = {
        distributionId: this.objid,
        step: 1
      };
      const { 
        data: { code, message }
      } = await this.service.orderCenter.stockInSave(params);
      if (code == 0) {
        this.$Message.success(message);
      } else {
        this.$Message.error(message);
      }
    },
    async initForm() {
      const { 
        data: { code, data }
      } = await this.service.orderCenter.getStockInDetail({ distributionId: this.objid });
      if (code == 0) {
        const fields = Object.keys(this.formConfig.formValue).filter(i => i != 'CP_C_PHY_WAREHOUSE_ENAME');
        fields.forEach(key => {
          if (key == 'CP_C_PHY_WAREHOUSE_ID') {
            this.formConfig.formValue[key] = data[key].refobjid;
            this.formConfig.formValue.CP_C_PHY_WAREHOUSE_ENAME = data[key].val;
          } else {
            let val = key == 'EXP_SENDTIME' ? this.formatDate(data[key]) : data[key];
            this.formConfig.formValue[key] = val;
          }
        });
      } else {
        this.$emit('closeActionDialog', true);
      }
    },
    // 时间戳格式化
    formatDate(time) {
      const date = new Date(time);
      return dateUtil.getFormatDate(date, 'yyyy-MM-dd HH:mm:ss');
    }
  }
};

import businessButton from 'professionalComponents/businessButton';
import businessForm from 'professionalComponents/businessForm';
// import { standardTimeConversion } from  '@/assets/js/__utils__/date.js';

const { getModuleName } = R3;
export default {
  components: {
    businessButton,
    businessForm
  },
  /**
   * @property {Array} idArr 选中的id
   * @property {Array} objList 查询区域里面的字段
   * @property {String} tablename 表名
   * @property {Object} activeTabAction 元数据定义的数据
   * @property {Array} rowData 表格的所有数据
   * @property {Array} rowArr 选中的数据
   */
  // eslint-disable-next-line vue/require-prop-types
  props: ['idArray', 'objList', 'tablename', 'rowArr'],
  data() {
    return {
      vmI18n:$i18n,
      formConfig: {
        formValue: {
          BILL_TIME_TYPE: '',
          END_TIME: ''
        },
        formData: [
          {
            style: 'select',
            label: $i18n.t('form_label.order_time'), // '订单时间',
            width: '24',
            value: 'BILL_TIME_TYPE',
            clearable: false,
            disabled: true,
            options: []
          }, {
            style: 'date',
            type: 'datetime',
            label: $i18n.t('form_label.adjustEndTime'), // '调整结束时间',
            width: '24',
            format: 'yyyy-MM-dd HH:mm:ss',
            value: 'END_TIME',
            placeholder: ''
          }
        ]
      },
      btnConfig: {
        typeAll: 'error',
        btnsite: 'right',
        buttons: [
          {
            text: $i18n.t('common.cancel'), // 取消
            btnclick: () => {
              this.$emit('closeActionDialog');
            } // 按钮点击事件
          }, {
            text: $i18n.t('common.determine'), // 确定
            btnclick: () => {
              this.confirmChange();
            }
          }
        ]
      },
      infoParams: {
        objid: '',
        table: ''
      }
    };
  },
  mounted() {
    const tableInfo = this.$store.state[getModuleName()];
    this.infoParams = {
      objid: tableInfo.buttons.selectIdArr[0],
      table: this.$route.params.tableName
    };
    console.log(tableInfo);
    // const timeType = '1';
    const item = tableInfo.formItems.defaultFormItemsLists.find(item => item.coldesc === $i18n.t('form_label.order_time'));
    console.log(item);
    this.formConfig.formData[0].options = item.combobox.forEach(val => {
      if (tableInfo.buttons.selectArr[0].BILL_TIME_TYPE.val === val.limitdesc) this.formConfig.formValue.BILL_TIME_TYPE = val.limitval;
      return {
        label: val.limitdesc,
        value: val.limitval
      };
    });
  },
  methods: {
    async confirmChange() {
      const formValue = this.formConfig.formValue;
      const params = {
        ...this.infoParams,
        fixcolumn: {
          ST_C_LIVE_CAST_STRATEGY: {
            BILL_TIME_TYPE: formValue.BILL_TIME_TYPE,
            END_TIME: formValue.END_TIME
            // END_TIME: standardTimeConversion(formValue.END_TIME)
          }
        }
      };
      $omsUtils.setLoading(true);
      try {
        const res = await this.service.strategyPlatform.liveCastStrategyUpdateEndTime(params);
        $omsUtils.setLoading();
        if (res.data.data.code === 0) {
          this.$Message.success(res.data.data.message);
          this.$emit('confirmImport');
          this.$emit('closeActionDialog');
        } else {
          $omsUtils.setLoading();
          // this.$Message.error(res.data.data.message);
        }
      } catch (error) {
        $omsUtils.setLoading();
        this.$Message.success($i18n.t('modalTips.z3')); // '修改时间失败'
      }
    }
  }
};

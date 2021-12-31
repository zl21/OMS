// import httpServer from '@/utils/request';
import format from '@/assets/js/__utils__/date';

const { getModuleName } = R3;
export default {
  /**
   * @property {Array} idArr 选中的id
   * @property {Array} objList 查询区域里面的字段
   * @property {String} tablename 表名
   * @property {Object} activeTabAction 元数据定义的数据
   * @property {Array} rowData 表格的所有数据
   * @property {Array} rowArr 选中的数据
   */
  props: ['idArray', 'objList', 'tablename', 'rowArr'],
  data() {
    return {
      dialogLoad: false,
      formConfig: {
        formValue: {
          DAY_TYPE: '',
          BEGIN_TIME: '',
          END_TIME: ''
        },
        formData: [
          {
            style: 'select',
            label: $it('fL.order_time'), // '订单时间',
            width: '24',
            value: 'DAY_TYPE',
            clearable: false,
            transfer: true,
            disabled: true,
            options: []
          }, {
            style: 'date',
            type: 'datetime',
            label: $it('fL.startTime'), // '开始时间',
            width: '24',
            format: 'yyyy-MM-dd HH:mm:ss',
            transfer: true,
            value: 'BEGIN_TIME',
            disabled: true,
            placeholder: ''
          }, {
            style: 'date',
            type: 'datetime',
            label: $it('fL.endTime'), // '结束时间',
            width: '24',
            transfer: true,
            format: 'yyyy-MM-dd HH:mm:ss',
            value: 'END_TIME',
            placeholder: ''
          }
        ]
      },
      btnConfig: {
        btnsite: 'right',
        buttons: [
          {
            text: $it('com.cancel'), // 取消
            btnclick: () => {
              this.$emit('closeActionDialog');
            } // 按钮点击事件
          }, {
            text: $it('com.determine'), // 确定
            type: 'primary',
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
      // objid: this.idArr[0],
      // table: this.tablename
      objid: tableInfo.buttons.selectIdArr[0],
      table: this.$route.params.tableName
    };
    // let timeType = '1'
    const item = tableInfo.formItems.defaultFormItemsLists.find(item => item.coldesc === $it('fL.order_time'));
    this.formConfig.formData[0].options = item.combobox.map(val => {
      if (tableInfo.buttons.selectArr[0].DAY_TYPE.val === val.limitdesc) this.formConfig.formValue.DAY_TYPE = val.limitval;
      return {
        label: val.limitdesc,
        value: val.limitval
      };
    });
    this.formConfig.formValue.BEGIN_TIME = tableInfo.buttons.selectArr[0].BEGIN_TIME.val;
    this.formConfig.formValue.END_TIME = tableInfo.buttons.selectArr[0].END_TIME.val;
  },
  methods: {
    async confirmChange() {
      const formValue = this.formConfig.formValue;
      const fromdata = new FormData();
      fromdata.append('objid', this.infoParams.objid);
      fromdata.append('table', this.infoParams.table);
      fromdata.append('isStrategyTime', 'Y');
      fromdata.append('END_TIME', format.getFormatDate(formValue.END_TIME, 'yyyy-MM-dd HH:mm:ss'));
      this.dialogLoad = true;
      try {
        const res = await this.service.strategyPlatform.holdOrderUpdateStrategyEndTime(fromdata);
        this.dialogLoad = false;
        if (res.data.data.code === 0) {
          this.$Message.success($it('tip.eo')); // '调整策略时间成功'
          this.$emit('confirmImport');
          this.$emit('closeActionDialog');
        }
      } catch (error) {
        this.dialogLoad = false;
      }
    }
  }
};

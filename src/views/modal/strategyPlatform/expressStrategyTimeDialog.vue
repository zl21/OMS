<template>
  <div
    v-loading="dialogLoad"
    class="time-dialog"
  >
    <div class="time-dialog-form">
      <businessForm
        :form-config="formConfig"
      />
    </div>
    <businessButton
      :btn-config="btnConfig"
    />
  </div>
</template>

<script>
  // import httpServer from '@/utils/request';
import businessButton from 'professionalComponents/businessButton';
import businessForm from 'professionalComponents/businessForm';
import format from '@/assets/js/__utils__/date';

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
  props: ['idArray', 'objList', 'tablename', 'selectRowData'],
  data() {
    return {
      dialogLoad: false,
      formConfig: {
        formValue: {
          DAY_TYPE: '', // 日期类型
          BEGIN_TIME: '', // 列表批量时取第一条数据的
          END_TIME: ''
        },
        formData: [
          {
            style: 'input',
            label: '订单时间',
            width: '24',
            value: 'DAY_TYPE',
            clearable: false,
            disabled: true,
            options: []
          }, {
            style: 'date',
            type: 'datetime',
            label: '开始时间',
            width: '24',
            format: 'yyyy-MM-dd HH:mm:ss',
            value: 'BEGIN_TIME',
            disabled: true,
            placeholder: ''
          }, {
            style: 'date',
            type: 'datetime',
            label: '结束时间',
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
            text: '取消',
            btnclick: () => {
              this.$emit('closeActionDialog');
            } // 按钮点击事件
          }, {
            text: '确定',
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
    console.log(this.selectRowData);
    const select = this.selectRowData
    let item = null
    if (false) { // 详情
      // item =
    } else {
      item = select[0]
    }
    if (select.length >= 2) {
      this.$Modal.fcWarning({
        title: '警告',
        content: '不能选择多条方案进行延期！',
      });
      this.$emit('closeActionDialog');
      return
    }
    // 若方案状态不是“已审核”，则提示：“方案状态不是已审核，不允许延期！”
    if (item.BILL_STATUS.val != '已审核') {
      this.$Modal.fcWarning({
        title: '警告',
        content: '方案状态不是已审核，不允许延期！',
      });
      this.$emit('closeActionDialog');
      return
    }
    this.infoParams = {
      objid: item.ID.val,
      table: this.$route.params.tableName
    }
    this.formConfig.formValue.DAY_TYPE = item.DAY_TYPE.val;
    this.formConfig.formValue.BEGIN_TIME = item.BEGIN_TIME.val;
    this.formConfig.formValue.END_TIME = item.END_TIME.val;

    /* console.log(format.standardTimeConversion);
    const tableInfo = this.$store.state[getModuleName()];
    console.log(tableInfo);
    this.infoParams = {
      // objid: this.idArr[0],
      // table: this.tablename
      objid: tableInfo.buttons.selectIdArr[0],
      table: this.$route.params.tableName
    }; */
    // let timeType = '1'

    /* const item = tableInfo.formItems.defaultFormItemsLists.find(item => item.coldesc === '订单时间');
    this.formConfig.formData[0].options = item.combobox.map(val => {
      if (tableInfo.buttons.selectArr[0].DAY_TYPE.val === val.limitdesc) this.formConfig.formValue.DAY_TYPE = val.limitval;
      return {
        label: val.limitdesc,
        value: val.limitval
      };
    });
    this.formConfig.formValue.BEGIN_TIME = tableInfo.buttons.selectArr[0].BEGIN_TIME.val;
    this.formConfig.formValue.END_TIME = tableInfo.buttons.selectArr[0].END_TIME.val;
     */
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
        const res = await this.service.strategyPlatform.extEntTime(fromdata);
        this.dialogLoad = false;
        if (res.data.data.code === 0) {
          this.$Message.success(res.data.data.message);
          this.$emit('confirmImport');
          this.$emit('closeActionDialog');
        } else {
          // this.$Message.error(res.data.data.message);
          this.$Modal.fcError({
            title: '错误',
            content: res.data.data.message,
          });
        }
      } catch (error) {
        this.dialogLoad = false;
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .time-dialog {
  display: flex;
  width: 400px;
  flex-direction: column;
  .time-dialog-form {
    display: inline-flex;
    width: 100%;
    justify-content: center;
  }
}
</style>

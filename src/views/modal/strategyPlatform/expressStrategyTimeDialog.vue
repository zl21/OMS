<template>
  <div v-loading="dialogLoad" class="time-dialog">
    <businessForm :form-config="formConfig" />
    <businessButton :btn-config="btnConfig" />
  </div>
</template>

<script>
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
            label: '日期类型',
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
  beforeMount() {
    // console.log('this::', this);
  },
  mounted() {
    const select = this.selectRowData
    let item = null
    if (this.$route.meta.routePrefix.includes('/SYSTEM/TABLE_DETAIL/')) { // 详情
      const options1 = this.objList[0].childs.find(it => it.colname == 'DAY_TYPE').combobox
      const val1 = this.objList[0].childs.find(it => it.colname == 'DAY_TYPE').valuedata
      item = {
        DAY_TYPE: {
          val: options1.find(it => it.limitval == val1).limitdesc
        },
        BEGIN_TIME: {
          val: this.objList[0].childs.find(it => it.colname == 'BEGIN_TIME').valuedata
        },
        END_TIME: {
          val: this.objList[0].childs.find(it => it.colname == 'END_TIME').valuedata
        },
        BILL_STATUS: {
          val: this.objList[0].childs.find(it => it.colname == 'BILL_STATUS').valuedata
        },
        ID: {
          val: this.$route.params.itemId
        },
      }
    } else {
      item = select[0]
      if (select.length >= 2) {
        this.$Modal.fcWarning({
          title: '警告',
          content: '不能选择多条方案进行延期！',
        });
        this.$emit('closeActionDialog');
        return
      }
    }
    console.log('item::', item);
    // 若方案状态不是“已审核”，则提示：“方案状态不是已审核，不允许延期！”
    if (!['已审核', '2'].includes(item.BILL_STATUS.val)) {
      this.$Modal.fcWarning({
        title: '警告',
        content: '方案状态不是已审核，不允许延期！',
      });
      this.$emit('closeActionDialog');
      return
    }
    // 如果当前时间晚于原来的结束时间（即方案已经不生效），则提示“方案的结束时间已过，确定仍要延期方案吗？”
    if (+new Date() > +new Date(item.END_TIME.val)) {
      this.$parent.$el.style.display = "none"
      this.$Modal.info({
        title: '警告',
        content: '方案的结束时间已过，确定仍要延期方案吗？',
        mask: true,
        showCancel: true,
        onOk: () => {
          this.$parent.$el.style.display = "block"
          // this.$parent.$parent.showModal = true
          // this.$parent.value = true
        },
        onCancel: () => {
          this.$parent.$el.style.display = "block"
          this.$emit('closeActionDialog');
        }
      });
    }
    this.infoParams = {
      objid: item.ID.val,
      table: this.$route.params.tableName
    }
    this.formConfig.formValue.DAY_TYPE = item.DAY_TYPE.val;
    this.formConfig.formValue.BEGIN_TIME = item.BEGIN_TIME.val;
    this.formConfig.formValue.END_TIME = item.END_TIME.val;
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
  .orderManageEdit {
    margin-left: -10px;
    padding-top: 8px;
  }
  .one_button {
    margin-top: 10px;
  }
}
</style>

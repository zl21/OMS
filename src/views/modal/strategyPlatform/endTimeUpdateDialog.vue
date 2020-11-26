<template>
  <div
    v-loading="dialogLoad"
    class="time-dialog"
  >
    <div class="time-dialog-form">
      <businessForm :form-config="formConfig" />
    </div>
    <businessButton :btn-config="btnConfig" />
  </div>
</template>

<script>
  // import { post } from '@/utils/request';

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
        dialogLoad: false,
        formConfig: {
          formValue: {
            BILL_TIME_TYPE: '',
            END_TIME: ''
          },
          formData: [
            {
              style: 'select',
              label: '订单时间',
              width: '24',
              value: 'BILL_TIME_TYPE',
              clearable: false,
              disabled: true,
              options: []
            }, {
              style: 'date',
              type: 'datetime',
              label: '调整结束时间',
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
      const tableInfo = this.$store.state[getModuleName()];
      this.infoParams = {
        objid: tableInfo.buttons.selectIdArr[0],
        table: this.$route.params.tableName
      };
      console.log(tableInfo);
      // const timeType = '1';
      const item = tableInfo.formItems.defaultFormItemsLists.find(item => item.coldesc === '订单时间');
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
        this.dialogLoad = true;
        try {
          const res = await this.service.strategyPlatform.liveCastStrategyUpdateEndTime(params);
          this.dialogLoad = false;
          if (res.data.data.code === 0) {
            this.$Message.success('修改时间成功');
            this.$emit('confirmImport');
            this.$emit('closeActionDialog');
          }
        } catch (error) {
          this.dialogLoad = false;
          this.$Message.success('修改时间失败');
        }
      }
    }
  };
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

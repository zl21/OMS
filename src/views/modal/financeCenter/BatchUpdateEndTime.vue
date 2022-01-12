<template>
  <div style="width:430px">
    <businessForm
      :form-config="formConfig"
    />
    <businessButton :btn-config="btnConfig" />
  </div>
 
</template>

<script>
import businessForm from 'professionalComponents/businessForm';
import businessButton from 'professionalComponents/businessButton';
import dateUtil from '@/assets/js/__utils__/date.js';

export default {
  components: {
    businessForm,
    businessButton,
  },
  props: {
    objList: {
      type: Array,
      defalut: () => [],
    },
    idArray: {
      type: Array,
      defalut: () => [],
    },
    webid: {
      type: Number,
    },
    tablename: {
      type: String,
    },
    selectRowData: {
      type: Array,
      defalut: () => [],
    },
  },
  data() {
    const self = this;
    return {
      formConfig: {
        colSpan: 20,
        formValue: {
          end_time: '',
        },
        formData: [
          {
            style: 'date',
            type: 'datetime',
            label: '截止日期', // 创建日期
            value: 'end_time',
            format: 'yyyy-MM-dd HH:mm:ss', // 格式参照burgeonui
            placeholder: '',
            clearable: '' // 是否显示清空按钮,默认为true   false
          },
        ]
      },
      btnConfig: {
        typeAll: 'error', // 按钮统一风格样式
        btnsite: 'right', // 按钮位置 (right , center , left)
        loading: false,
        buttons: [
          {
            type: '', // 按钮类型
            text: window.vmI18n.t('common.cancel'), // 取消 按钮文本
            icon: '', // 按钮图标
            size: 'small', // 按钮大小
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              this.closeConfirm();
            } // 按钮点击事件
          },
          {
            text: window.vmI18n.t('common.determine'), // 确定 按钮文本
            size: 'small', // 按钮大小
            disabled: false, // 按钮禁用控制
            btnclick: async () => {
              const { end_time } = this.formConfig.formValue;
              if (!end_time) {
                this.$Message.warning('请选择一个截止时间');
                return;
              };
              this.btnConfig.loading = true;
              const ids = this.idArray;
              const res = await this.service.financeCenter.batchUpdateEndTime({
                ids,
                end_time: this.formatDate(end_time),
              });
              if (res.data.data.code === 0) {
                this.closeConfirm();
              } else {
                const message = res.data.data.message || '变更失败';
                this.$message({
                  message,
                  type: 'error',
                  duration: 5000,
                });
              }
              this.btnConfig.loading = false;
            } // 按钮点击事件
          }
        ]
      },
    }
  },
  methods: {
    closeConfirm() {
      const _this = this;
      // 元数据配置窗口特殊处理
      _this.$parent.$parent.closeActionDialog();
    },
    // 时间戳格式化
    formatDate(time) {
      const date = new Date(time);
      return dateUtil.getFormatDate(date, 'yyyy-MM-dd HH:mm:ss');
    },
  },
}
</script>

<style>

</style>
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
    return {
      formConfig: {
        colSpan: 20,
        formValue: {
          code: '',
        },
        formData: [
          {
            style: 'input',
            label: '猫超仓库编码', // 创建日期
            value: 'code',
            placeholder: '请输入',
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
              const { code } = this.formConfig.formValue;
              if (!code) {
                this.$Message.warning('请输入一个仓库编码');
                return;
              };
              this.btnConfig.loading = true;
              const ids = this.idArray;
              const res = await this.service.commodityCenter.alibabaProductUpdate({
                ids,
                code,
              });
              if (res.data.data.code === 0) {
                const successMsg = res.data.data.message || '提交成功';
                this.closeConfirm();
                this.$Message.success(successMsg);
                this.$parent.$parent.$parent.getQueryList();
              } else {
                const message = res.data.data.message || '提交失败';
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
  },
}
</script>
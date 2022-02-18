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
          period: '',
        },
        formData: [
          {
            style: 'select', // 下拉框类型
            label: '优惠券免除时间', // 下拉框前的值
            width: '24', // 所占宽度宽度
            value: 'period', // 输入框的值
            multiple: false,
            options: []
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
              const { period } = this.formConfig.formValue;
              if (!period) {
                this.$Message.warning('请选择一个时间');
                return;
              };
              this.btnConfig.loading = true;
              const ids = this.idArray;
              const { data: { code, message } } = await this.service.inventoryCenter.periodtimeAdd({
                ids,
                period,
              });
              if (code === 0) {
                this.closeConfirm();
                this.$Message.success('修改成功');
                this.$parent.$parent.$parent.getQueryList();
              } else {
                const msg = message || '修改失败';
                this.btnConfig.loading = false;
                this.$message({
                  message: msg,
                  type: 'error',
                  duration: 5000,
                });
              }
            } // 按钮点击事件
          }
        ]
      },
    }
  },
  mounted() {
    this.periodtimeQuery();
  },
  methods: {
    closeConfirm() {
      const _this = this;
      // 元数据配置窗口特殊处理
      _this.$parent.$parent.closeActionDialog();
    },
    // 查询免除时间
    async periodtimeQuery() {
      const { data: { data, code } } = await this.service.inventoryCenter.periodtimeQuery();
      if (code === 0) {
        const options = data.map(item => ({
            value: item.coupon_time,
            label: item.coupon_time,
            origin: item,
          }));
        this.formConfig.formData[0].options = options;
      }
    },
    
  },
}
</script>
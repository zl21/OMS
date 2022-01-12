<template>
  <div class="custom-modal-confirm-body">
    <div class="custom-modal-confirm-header">
      <i class="iconfont custom-modal-confirm-icon iconbj_doubt fcWarning "></i>
      <div class="" style="border: none; resize: none; max-height: 200px; overflow: auto; width: 100%; color: rgb(102, 102, 102);">
        当前的操作可能导致长时间等待！是否继续查询？
      </div>
    </div>
    <businessButton :btn-config="btnConfig" />
  </div>
</template>

<script>
import businessButton from 'professionalComponents/businessButton';
export default {
  components: {
    businessButton,
  },
  data() {
    return {
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
              const route = this.$route.params;
              this.btnConfig.loading = true;
              const formConfig = this.$store.state[`S.${route.tableName}.${route.tableId}`].formItems.data;
              const res = await this.service.financeCenter.batchAuditByQueryConditions(formConfig);
              if (res.data.data.code === 0) {
                this.closeConfirm();
                this.$Message.success('查询成功');
              } else {
                const message = res.data.data.message || '查询失败';
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
      }
    }
  },
  methods: {
    closeConfirm() {
      const _this = this;
      // 元数据配置窗口特殊处理
      _this.$parent.$parent.closeActionDialog();
    }
  },
}
</script>

<style scoped>
  .custom-modal-confirm-body{
    width: 350px;
  }
  .custom-modal-confirm-header{
    padding: 10px 20px 0;
    display: flex;
    align-items: center;
  }
  .custom-modal-confirm-icon{
    color: #f7b901;
    font-size: 28px;
    margin-right: 10px;
    display: inline-block;
  }
</style>
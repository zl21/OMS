<template>
  <div class="custom-modal-confirm-wrapper">
    <div class="custom-modal-confirm-header">
      <i class="iconfont custom-modal-confirm-icon iconbj_doubt fcWarning "></i>
      <div class="custom-modal-confirm-body">
        当前的操作会执行全量导出，导出时间可能会比较慢！是否继续导出？
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
      configTableName: ['ST_C_PRODUCT_STRATEGY', 'AC_F_RECEIVABLES_ADJUSTMENT', 'SG_B_PHY_OUT_RESULT', 'SC_B_TRANSFER', 'OC_B_MULTI_STORE_DISTRIBUTION', 'OC_B_SEND_OUT', 'OC_B_JD_RETURN_ORDER'],
      btnConfig: {
        typeAll: 'error', // 按钮统一风格样式
        btnsite: 'right', // 按钮位置 (right , center , left)
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
              const formConfig = this.$store.state[`S.${route.tableName}.${route.tableId}`].formItems.data;
              const params = Object.assign(formConfig, {
                tableName: route.tableName,
              });
              console.log('params', params);
              const res = await this.service.interfacePlatform.exportErrorSku({param: params});
              console.log('res', res);
              if (res.data.code === 0) {
                // this.$message.success('导出成功');
                this.closeConfirm();
              }
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
  .custom-modal-confirm-wrapper{
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
  .custom-modal-confirm-body {
    border: none;
    resize: none;
    max-height: 200px;
    overflow: auto;
    width: 100%;
    color: rgb(102, 102, 102);
    line-height: 150%;
  }
</style>
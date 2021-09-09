<!--
 * @Author: your name
 * @Date: 2021-07-26 08:04:57
 * @LastEditTime: 2021-09-01 15:44:14
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /burgeon-business-components/buttonFkDialog.vue
-->
<!--点击按钮弹出外键关联弹框-->
<template>
  <div class="buttonFk">
    <button
      class="white"
      @click="add"
    >
    <!-- 批量新增 -->
    {{ vmI18n.t("btn.batch_add") }}
    </button>
    <fkdialog
      v-if="fkDialog.dialog && itemdata.reftable !== 'VP_C_VIP_ACC'"
      :title="多选"
      :tablename="itemdata.reftable"
      :tableid="itemdata.reftableid"
      :right-list="fkDialog.lists"
      :is-object="itemdata.isObject"
      :append-to-body="layer"
      :fkshow.sync="fkDialog.dialog"
      :is-one-data="itemdata.isOneData"
      @easyData="getFkdialog"
      :version="itemdata.version || '1.3'"
      :serviceId="itemdata.serviceId || 'r3-cp'"
    />
  </div>
</template>
<script>
  import buttonFkDialog from './js/buttonFkDialog';

  export default buttonFkDialog;
</script>
<style lang="less" scoped>
@import "css/buttonFkDialog.less";
</style>

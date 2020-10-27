<!--点击按钮弹出外键关联弹框-->
<template>
  <div class="buttonFk">
    <button
      class="white"
      @click="add"
    >
      批量新增
    </button>
    <fkdialog
      v-if="fkDialog.dialog && itemdata.reftable !== 'VP_C_VIP_ACC'"
      :tablename="itemdata.reftable"
      :tableid="itemdata.reftableid"
      :right-list="fkDialog.lists"
      :is-object="itemdata.isObject"
      :append-to-body="layer"
      :fkshow.sync="fkDialog.dialog"
      :is-one-data="itemdata.isOneData"
      @easyData="getFkdialog"
    />
  </div>
</template>
<script>
  import buttonFkDialog from "@/js/pages/promotionCenter/components/buttonFkDialog";
  export default buttonFkDialog;
</script>
<style lang="less" scoped>
.buttonFk {
    button {
        height: 24px;
        line-height: 24px;
        padding: 0 8px;
        border: 1px solid #fd6442;
        font-size: 12px;
        background: #fff;
        color: #fd6442;
        border-radius: 2px;
        margin-right: 5px;
      }
}
</style>

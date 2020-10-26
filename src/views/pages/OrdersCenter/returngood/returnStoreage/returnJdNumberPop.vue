<!-- 查询退单编号弹框 -->
<template>
  <div class="returnNumberPop">
    <div class="orderContent">
      <businessForm @oneObjs="threeObjs" :formConfig="order.orderform"></businessForm>
      <businessButton :btnConfig="order.btn"></businessButton>
    </div>
    <jordan-action-table
      :jordanTableConfig="order.table"
      @on-select="onquerySelect"
      @on-select-cancel="onqueryCancel"
      @on-select-all="onSelectAll"
      @on-select-all-cancel="onSelectAllCancel"
    ></jordan-action-table>
    <businessButton :btnConfig="btnConfig"></businessButton>
    <div class="wrongForce">
      <Modal
        v-model="wrong.modal"
        :mask-closable="false"
        :draggable="true"
        :title="'查询原始订单编号'"
        @on-ok="wrongForce"
        @on-cancel="querycancel"
      >
        <jordan-action-table
          :jordanTableConfig="wrong.table"
          @on-select="wrongForceSelect"
          @on-select-cancel="wrongForceCancel"
          @on-select-all="wrongSelectAll"
          @on-select-all-cancel="wrongSelectAllCancel"
        ></jordan-action-table>
      </Modal>
    </div>
  </div>
</template>
<script>
  import returnJdNumberPop from "@/js/pages/orderCenter/returngood/returnStoreage/returnJdNumberPop";
  export default returnJdNumberPop;
</script>

<style>
.returnNumberPop .burgeon-modal-body {
  overflow: hidden;
}
.returnNumberPop
  .burgeon-modal-content
  .burgeon-modal-body
  .burgeon-form-item-content {
  margin-right: 0 !important;
}
.returnNumberPop .burgeon-form-item {
  margin-bottom: 0 !important;
}
.returnNumberPop .orderContent {
  display: flex;
  justify-content: space-between;
}
.returnNumberPop .orderContent .buttonBox {
  height: 30px;
  margin-top: 40px;
}
.returnNumberPop .jordan-table-box .page-box {
  margin-top: 0 !important;
  padding-top: 0 !important;
}
.returnNumberPop .jordan-table-box .burgeon-table-wrapper {
  margin-top: 0 !important;
}
.burgeon-modal-content .burgeon-modal-body .burgeon-form-item-content {
  margin-right: 0 !important;
}
</style>

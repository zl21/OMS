<!-- 退货入库新增、详情 -->
<template>
  <div class="returnJdTreasurys">
    <!--按钮块-->
    <div style="margin-top: 8px;">
      <businessButton :btnConfig="btnConfig"></businessButton>
    </div>
    <!-- form表单 -->
    <div class="TreasuryDefault">
      <Collapse v-model="openDefault">
        <Panel name="1">
          基本信息
          <p slot="content">
            <businessForm :formConfig="information"></businessForm>
          </p>
        </Panel>
      </Collapse>
    </div>
    <div class="salesTable">
      <!-- tab切换 -->
      <businessLabel
        class="businessLabel"
        :labelList="labelList"
        :labelDefaultValue="DefaultValue"
        @labelClick="labelClick"
      ></businessLabel>
      <!-- 列表组件 -->
      <div class="tableBox">
        <jordan-action-table
          v-if="labelDefaultValue"
          :jordanTableConfig="jordanTableConfig"
          @on-select="returnOnSelect"
          @on-select-cancel="returnCancel"
        ></jordan-action-table>
        <OrderItem v-if="!labelDefaultValue" :componentData="tab2"></OrderItem>
      </div>
    </div>
    <div class="queryorderBox">
      <Modal
        class="queryorder"
        :mask="true"
        v-model="order.modal"
        :title="'查询原单单号'"
        @on-ok="queryorder"
        @on-cancel="querycancel"
      >
        <div class="orderContent">
          <businessForm :formConfig="order.orderform"></businessForm>
          <businessButton :btnConfig="order.btn"></businessButton>
        </div>
        <div class="orderTable">
          <jordan-action-table
            :jordanTableConfig="order.table"
            @on-select="onquerySelect"
            @on-select-cancel="onqueryCancel"
          ></jordan-action-table>
        </div>
      </Modal>
    </div>
    <!-- 水印图片 -->
    <businessStatusFlag :statusName="statusName"></businessStatusFlag>
    <div class="fromLoading" v-show="isSaveLoading">
      <Spin></Spin>
    </div>
  </div>
</template>

<script>
  import returnJdTreasuryAdd from "@/js/pages/orderCenter/returngood/returnStoreage/returnJdTreasuryAdd";
  export default returnJdTreasuryAdd;
</script>

<style lang="less">
@import "~@/assets/css/css_1_3/theme.less";
.returnJdTreasurys {
  position: relative;
  .fromLoading {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(255, 255, 255, 0.9);
    z-index: 1000 !important;
  }
}
.queryorder .burgeon-modal {
  width: 800px !important;
}
.queryorder .burgeon-modal-body {
  overflow: hidden;
}
.queryorder
  .burgeon-modal-content
  .burgeon-modal-body
  .burgeon-form-item-content {
  margin-right: 0 !important;
}
.queryorder .burgeon-form-item {
  margin-bottom: 0 !important;
}
.queryorder .burgeon-modal-body .orderContent {
  display: flex;
  justify-content: space-between;
}
.queryorder .orderContent .buttonBox {
  height: 30px;
  margin-top: 47px;
}
.queryorder .jordan-table-box .page-box {
  margin-top: 0 !important;
  padding-top: 0 !important;
}
.queryorder .jordan-table-box .burgeon-table-wrapper {
  margin-top: 0 !important;
}
</style>

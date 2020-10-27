<!-- 退货入库手工匹配 && 错发强制匹配 -->
<template>
  <div class="returnTreasury">
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
            <businessForm @oneObjs="oneObjs" :formConfig="information"></businessForm>
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
          @on-select-all="onSelectAll"
          @on-select-all-cancel="onSelectAllCancel"
        ></jordan-action-table>
        <OrderItem v-if="!labelDefaultValue" :componentData="tab2"></OrderItem>
      </div>
    </div>
    <div class="queryorder">
      <Modal
        class="queryorder"
        v-model="order.modal"
        :title="'退换货订单明细'"
        @on-ok="queryorder"
        @on-cancel="querycancel"
      >
        <div class="orderContent">
          <businessForm :formConfig="order.orderform"></businessForm>
          <businessButton :btnConfig="order.btn"></businessButton>
        </div>
        <jordan-action-table
          :jordanTableConfig="order.table"
          @on-select="onquerySelect"
          @on-select-cancel="onqueryCancel"
          @on-select-all="onqueryAll"
          @on-select-all-cancel="onqueryAllCancel"
        ></jordan-action-table>
      </Modal>
    </div>
    <!-- 退单编号-->
    <jordanModal
      :title="returnNumber.confirmTitle"
      :titleAlign="returnNumber.titleAlign"
      :width="returnNumber.width"
      :scrollable="returnNumber.scrollable"
      :closable="returnNumber.closable"
      :draggable="returnNumber.draggable"
      :mask="returnNumber.mask"
      :mask-closable="returnNumber.maskClosable"
      :transfer="returnNumber.transfer"
      :name="returnNumber.name"
      :url="returnNumber.url"
      :keepAlive="returnNumber.keepAlive"
      :excludeString="returnNumber.excludeString"
      :componentData="returnNumber.componentData"
    ></jordanModal>
    <div class="fromLoading" v-show="isSaveLoading">
      <Spin></Spin>
    </div>
  </div>
</template>
  
<script>
  import manualMatching from "@/js/pages/orderCenter/returngood/returnStoreage/manualMatching";
  export default manualMatching;
</script>

<style lang="less">
@import "~@/css/pages/orderCenter/returngood/returnStoreage/manualMatching.less";
</style>

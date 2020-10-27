<!-- 退货入库新增、详情 -->
<template>
  <div class="returnTreasurys">
    <!--按钮块-->
    <div style="margin-top: 8px">
      <businessButton :btnConfig="btnConfig"></businessButton>
    </div>
    <!-- form表单 -->
    <div class="TreasuryDefault">
      <Collapse v-model="openDefault">
        <Panel name="1">
          <!-- 基本信息 -->
          {{ vmI18n.t("common.baseInformation") }}
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
        <business-action-table
          v-if="labelDefaultValue"
          :jordanTableConfig="jordanTableConfig"
          @on-select="returnOnSelect"
          @on-select-cancel="returnCancel"
        ></business-action-table>
        <OrderItem v-if="!labelDefaultValue" :componentData="tab2"></OrderItem>
      </div>
    </div>
    <div class="queryorderBox">
      <!-- :title="'查询原始订单编号'" -->
      <Modal
        class="queryorder"
        :mask="true"
        v-model="order.modal"
        :title="vmI18n.t('modalTitle.query_OriginalOrderNo')"
        @on-ok="queryorder"
        @on-cancel="querycancel"
      >
        <div class="orderContent">
          <businessForm :formConfig="order.orderform"></businessForm>
          <businessButton :btnConfig="order.btn"></businessButton>
        </div>
        <div class="orderTable">
          <business-action-table
            :jordanTableConfig="order.table"
            @on-select="onquerySelect"
            @on-select-cancel="onqueryCancel"
          ></business-action-table>
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
  import returnTreasuryAdd from "@/js/pages/orderCenter/returngood/returnStoreage/returnTreasuryAdd";
  export default returnTreasuryAdd;
</script>

<style lang="less">
@import "~@/css/pages/orderCenter/returngood/returnStoreage/returnTreasuryAdd.less";
</style>

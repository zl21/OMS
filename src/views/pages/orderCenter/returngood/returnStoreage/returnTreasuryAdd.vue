<!-- 退货入库新增、详情 -->
<template>
  <div class="returnTreasurys public-main custom-main">
    <loading :loading="loading" />
    <!--按钮块-->
    <div class="returnTreasurysBtn custom-btn">
      <OmsButton :btn-config="btnConfig" />
    </div>
    <div class="public-content">
      <!-- form表单 -->
      <div class="TreasuryDefault">
        <Collapse v-model="openDefault">
          <Panel name="1">
            <!-- 基本信息 -->
            {{ vmI18n.t("common.baseInformation") }}
            <p slot="content">
              <businessForm :form-config="information" />
            </p>
          </Panel>
        </Collapse>
      </div>
      <div class="salesTable custom-table">
        <!-- tab切换 -->
        <businessLabel
          class="businessLabel"
          :label-list="labelList"
          :label-default-value="DefaultValue"
          @labelClick="labelClick"
        />
        <!-- 列表组件 -->
        <div class="tableBox">
          <business-action-table
            v-if="labelDefaultValue"
            :jordan-table-config="jordanTableConfig"
            @on-select="returnOnSelect"
            @on-select-cancel="returnCancel"
          />
          <OrderItem v-if="!labelDefaultValue" :component-data="tab2" />
        </div>
      </div>
      <div class="queryorderBox">
        <!-- 查询原始订单编号 -->
        <Modal
          v-model="order.modal"
          width="900"
          class="queryorder"
          :closable="true"
          :mask="true"
          :title="vmI18n.t('modalTitle.query_OriginalOrderNo')"
          @on-ok="queryorder"
          @on-cancel="querycancel"
        >
          <div class="orderContent">
            <businessForm :form-config="order.orderform" />
            <OmsButton :btn-config="order.btn" />
          </div>
          <div class="orderTable">
            <business-action-table
              :jordan-table-config="order.table"
              @on-select="onquerySelect"
              @on-select-cancel="onqueryCancel"
            />
          </div>
        </Modal>
      </div>
      <!-- 水印图片 -->
      <WaterMark v-if="statusName !== ''" class="omsWaterMark" :text="statusName"/>
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

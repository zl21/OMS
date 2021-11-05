<!-- 退货入库手工匹配 && 错发强制匹配 -->
<template>
  <div class="returnTreasury">
    <loading :loading="loading" />
    <!--按钮块-->
    <div style="margin-top: 8px;">
      <OmsButton :btn-config="btnConfig" />
    </div>
    <!-- form表单 -->
    <div class="TreasuryDefault">
      <Collapse v-model="openDefault">
        <Panel name="1">
          <!-- 基本信息 -->
          {{ vmI18n.t("common.baseInformation") }}
          <p slot="content">
            <businessForm
              :form-config="information"
              @oneObjs="oneObjs"
            />
          </p>
        </Panel>
      </Collapse>
    </div>
    <div class="salesTable">
      <!-- tab切换 -->
      <businessLabel
        class="businessLabel"
        :label-list="labelList"
        :label-default-value="DefaultValue"
        @labelClick="labelClick"
      />
      <!-- 列表组件 -->
      <div class="tableBox">
        <OmsTable
          v-if="labelDefaultValue"
          :jordan-table-config="jordanTableConfig"
          @on-select="returnOnSelect"
          @on-select-cancel="returnCancel"
          @on-select-all="onSelectAll"
          @on-select-all-cancel="onSelectAllCancel"
        />
        <OrderItem
          v-if="!labelDefaultValue"
          :component-data="tab2"
        />
      </div>
    </div>
    <div class="queryorder">
      <Modal
        v-model="order.modal"
        class="queryorder"
        :title="'退换货订单明细'"
        @on-ok="queryorder"
        @on-cancel="querycancel"
      >
        <div class="orderContent">
          <businessForm :form-config="order.orderform" />
          <OmsButton :btn-config="order.btn" />
        </div>
        <OmsTable
          :jordan-table-config="order.table"
          @on-select="onquerySelect"
          @on-select-cancel="onqueryCancel"
          @on-select-all="onqueryAll"
          @on-select-all-cancel="onqueryAllCancel"
        />
      </Modal>
    </div>
    <!-- 退单编号-->
    <businessDialog
      :title="returnNumber.confirmTitle"
      :title-align="returnNumber.titleAlign"
      :width="returnNumber.width"
      :scrollable="returnNumber.scrollable"
      :closable="returnNumber.closable"
      :draggable="returnNumber.draggable"
      :mask="returnNumber.mask"
      :mask-closable="returnNumber.maskClosable"
      :transfer="returnNumber.transfer"
      :name="returnNumber.name"
      :url="returnNumber.url"
      :keep-alive="returnNumber.keepAlive"
      :exclude-string="returnNumber.excludeString"
      :component-data="returnNumber.componentData"
    />
  </div>
</template>

<script>
  import manualMatching from '@/js/pages/orderCenter/returngood/returnStoreage/manualMatching';

  export default manualMatching;
</script>

<style lang="less">
@import "~@/css/pages/orderCenter/returngood/returnStoreage/manualMatching.less";
</style>

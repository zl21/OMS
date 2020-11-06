<template>
  <div class="courierPay">
    <div
      v-if="identifying === 3"
      class="img"
    >
      <img
        :src="'@/assets/image/void.png'"
        alt=""
      >
    </div>
    <div class="buttons">
      <business-button :btn-config="btnConfig" />
    </div>
    <Collapse v-model="value1">
      <Panel name="1">
        <!-- 基本信息 -->
        {{ vmI18n.t("common.baseInformation") }}
        <p slot="content">
          <business-form :form-config="formConfig" />
        </p>
      </Panel>
      <Panel name="2">
        <!-- 日志 -->
        {{ vmI18n.t("common.journal") }}
        <p slot="content">
          <business-form :form-config="formConfig1" />
        </p>
      </Panel>
      <Panel name="3">
        <!-- 明细信息 -->
        {{ vmI18n.t("common.detailed_info") }}
        <p slot="content">
          <!-- 表格 -->
          <!-- <div class="table"> -->
          <!-- 订单明细 -->
          <!-- <div class="barcodeDetails"> -->
          <business-action-table
            :jordan-table-config="jordanTableConfig"
            @on-select="onSelect"
            @on-select-all="onSelectAll"
            @on-select-all-cancel="onSelectAllCancel"
            @on-select-cancel="onSelectCancel"
            @table-delete-detail="tableDeleteDetail"
          />
        </p>
      </Panel>
    </Collapse>
    <!-- tab切换 -->
    <!-- <jordan-label :labelList="labelList" :labelDefaultValue="labelDefaultValue"></jordan-label> -->
  </div>
</template>
<script>
  import courierPay from '@/js/pages/strategyPlatform/courierPay/courierPay.js';

  export default courierPay;
</script>

<style lang="less">
  @import "~@/css/pages/strategyPlatform/courierPay/courierPay.less";
</style>

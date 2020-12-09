<template>
  <div class="jordanModal">
    <!-- 开票 -->
    <div class="invoice-header">
      <!-- <span>开票状态:</span> -->
      <span>{{ vmI18n.t("form_label.billing_status") }}:</span>
      <span>{{
        componentData.QUERYORDERRESULT.INVOICE_STATUS_NAME || "未登记"
      }}</span>
    </div>
    <div class="invoice-content">
      <Divider orientation="left">
        <!-- 发票信息 -->
      </Divider>
      <div>
        <!-- <span>发票类型:</span> -->
        <span>{{ vmI18n.t('form_label.invoice_type') }}:</span>
        <RadioGroup
          v-model="invoiceType"
          type="button"
          size="small"
          @on-change="invoiceTypeChange"
        >
          <!-- <Radio label="电子发票"></Radio> -->
          <Radio :label="vmI18n.t('form_label.electronic_invoice')" />
          <!-- <Radio label="纸质发票"></Radio> -->
          <Radio :label="vmI18n.t('form_label.paper_invoice')" />
          <!-- <Radio label="专用发票"></Radio> -->
          <Radio :label="vmI18n.t('form_label.special_invoice')" />
        </RadioGroup>
        <span
          v-if="!specialInvoiceFlag"
          style="margin-left: 20px"
        >
          <!-- 抬头类型 -->
          {{ vmI18n.t("form_label.invoiceTitle_type") }}:</span>
        <RadioGroup
          v-if="!specialInvoiceFlag"
          v-model="invoiceTitleType"
          type="button"
          size="small"
          @on-change="invoiceTitleTypeChange"
        >
          <!-- <Radio label="个人"></Radio> -->
          <Radio :label="vmI18n.t('form_label.personal')" />
          <!-- <Radio label="企业"></Radio> -->
          <Radio :label="vmI18n.t('form_label.enterprise')" />
        </RadioGroup>
        <span
          v-if="specialInvoiceFlag"
          style="color: #fd6442"
        >
          <!-- 开专用发票必须跟开票专员确认 -->
          {{ vmI18n.t("modalTips.zv") }}
        </span>
      </div>
      <businessForm :form-config="formConfig" />
    </div>
    <div
      v-if="invoiceFooterFlag"
      class="invoice-footer"
    >
      <Divider orientation="left">
        <!-- 收票信息 -->
        {{ vmI18n.t("form_label.ticket_info") }}
      </Divider>
      <businessForm :form-config="formConfig2" />
    </div>
    <businessButton class="modalBth" :btn-config="btnConfig" />
  </div>
</template>
<script>
  import makeOutInvoice from '@/js/modal/orderCenter/makeOutInvoice';

  export default makeOutInvoice;
</script>

<style lang='less'>
  @import "~@burgeon/oms-theme/skin/public.less";
  @import "~@/css/modal/orderCenter/makeOutInvoice.less";
</style>

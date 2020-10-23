<template>
  <div class="jordanModal">
    <!-- 开票 -->
    <div class="invoice-header">
      <!-- <span>开票状态:</span> -->
      <span>{{ vmI18n.t("form_label.billing_statu") }}:</span>
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
        <span>{{ vmI18n.t("form_label.invoice_type") }}:</span>
        <RadioGroup
          v-model="invoiceType"
          type="button"
          size="small"
          @on-change="invoiceTypeChange"
        >
          <!-- <Radio label="电子发票"></Radio> -->
          <Radio :label="vmI18n.t('form_label.electronic_invoic')"></Radio>
          <!-- <Radio label="纸质发票"></Radio> -->
          <Radio :label="vmI18n.t('form_label.paper_invoice')"></Radio>
          <!-- <Radio label="专用发票"></Radio> -->
          <Radio :label="vmI18n.t('form_label.special_invoice')"></Radio>
        </RadioGroup>
        <span v-if="!specialInvoiceFlag" style="margin-left: 20px">
          <!-- 抬头类型 -->
          {{ vmI18n.t("form_label.invoiceTitle_typ") }}:</span
        >
        <RadioGroup
          v-if="!specialInvoiceFlag"
          v-model="invoiceTitleType"
          type="button"
          size="small"
          @on-change="invoiceTitleTypeChange"
        >
          <!-- <Radio label="个人"></Radio> -->
          <Radio :label="vmI18n.t('form_label.personal')"></Radio>
          <!-- <Radio label="企业"></Radio> -->
          <Radio :label="vmI18n.t('form_label.enterprise')"></Radio>
        </RadioGroup>
        <span v-if="specialInvoiceFlag" style="color: #fd6442">
          <!-- 开专用发票必须跟开票专员确认 -->
          {{ vmI18n.t("modalTips.zv") }}
        </span>
      </div>
      <businessForm :formConfig="formConfig"></businessForm>
    </div>
    <div class="invoice-footer" v-if="invoiceFooterFlag">
      <Divider orientation="left">
        <!-- 收票信息 -->
        {{ vmI18n.t("form_label.ticket_info") }}
      </Divider>
      <businessForm :formConfig="formConfig2"></businessForm>
    </div>
    <jordanBtn :btnConfig="btnConfig" style="margin-top: 10px"></jordanBtn>
  </div>
</template>
<script>
  import makeOutInvoice from "@/js/modal/orderCenter/makeOutInvoice";
  export default makeOutInvoice;
</script>

<style lang='less'>
@import "~@burgeon/oms-theme/skin/public.less";
.header {
  background-color: #eee;
  color: black;
  font-size: 13px;
}
.footer {
  width: 100%;
  margin-top: 20px;
}
.ark-radio-group-button.ark-radio-group-small .ark-radio-wrapper:first-child {
  border-color: @button-border;
  color: @button-transparent-font;
}
</style>

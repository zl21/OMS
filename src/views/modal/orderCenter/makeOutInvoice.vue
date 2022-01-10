<template>
  <div class="jordanModal cus-modal">
    <!-- 开票 -->
    <div class="invoice-header">
      <!-- <span>开票状态:</span> -->
      <span>{{ $it("fL.billing_status") }}:</span>
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
        <span>{{ $it('fL.invoice_type') }}:</span>
        <RadioGroup
          v-model="invoiceType"
          type="button"
          size="small"
          @on-change="invoiceTypeChange"
        >
          <!-- <Radio label="电子发票"></Radio> -->
          <Radio :label="$it('fL.electronic_invoice')" />
          <!-- <Radio label="纸质发票"></Radio> -->
          <Radio :label="$it('fL.paper_invoice')" />
          <!-- <Radio label="专用发票"></Radio> -->
          <Radio :label="$it('fL.special_invoice')" />
        </RadioGroup>
        <span
          v-if="!specialInvoiceFlag"
          style="margin-left: 20px"
        >
          <!-- 抬头类型 -->
          {{ $it("fL.invoiceTitle_type") }}:</span>
        <RadioGroup
          v-if="!specialInvoiceFlag"
          v-model="invoiceTitleType"
          type="button"
          size="small"
          @on-change="invoiceTitleTypeChange"
        >
          <!-- <Radio label="个人"></Radio> -->
          <Radio :label="$it('fL.personal')" />
          <!-- <Radio label="企业"></Radio> -->
          <Radio :label="$it('fL.enterprise')" />
        </RadioGroup>
        <span
          v-if="specialInvoiceFlag"
          style="color: #fd6442"
        >
          <!-- 开专用发票必须跟开票专员确认 -->
          {{ $it("tip.zv") }}
        </span>
      </div>
      <OmsForm :form-config="formConfig" />
    </div>
    <div
      v-if="invoiceFooterFlag"
      class="invoice-footer"
    >
      <Divider orientation="left">
        <!-- 收票信息 -->
        {{ $it("fL.ticket_info") }}
      </Divider>
      <OmsForm :form-config="formConfig2" />
    </div>
    <OmsButton
      class="modal-footer"
      :btn-config="btnConfig"
    />
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

<!-- 单据状态标志 -->
<template>
  <!--
    statusName 根据状态名称来判断显示哪张水印
   -->
  <div class="statusName" v-if="statusName !== ''">
    <img v-if="statusName === '已提交'" :src="submitImg" alt="">
    <img v-if="statusName === '已作废'" :src="voidImg" alt="">
    <img v-if="statusName === '未确认'" :src="noConfirmImg" alt="">
    <img v-if="statusName === '已审核'" :src="checkedImg" alt="">
    <img v-if="statusName === '未审核'" :src="uncheckedImg" alt="">
    <img v-if="statusName === '配货中'" :src="preparingImg" alt="">
    <img v-if="statusName === '仓库发货'" :src="warehouseDeliveryImg" alt="">
    <img v-if="statusName === '平台发货'" :src="platformDeliveryImg" alt="">
    <img v-if="statusName === '已确认收货'" :src="confirmedReceiptImg" alt="">
    <img v-if="statusName === '已取消'" :src="canceledImg" alt="">
    <img v-if="statusName === '系统作废'" :src="systemCancelImg" alt="">
    <img v-if="statusName === '交易完成'" :src="tradeFinishImg" alt="">
    <img v-if="statusName === '预售待发货'" :src="preSaleDeliveryImg" alt="">
    <img v-if="statusName === '预售缺货'" :src="preSaleShortageImg" alt="">
    <img v-if="statusName === '等待退货入库'" :src="waitReturnWarehouseImg" alt="">
    <img v-if="statusName === '等待售后审核'" :src="waitSaledAuditImg" alt="">
    <img v-if="statusName === '完成'" :src="finishImg" alt="">
    <img v-if="statusName === '未完结'" :src="unfinishedImg" alt="">
    <img v-if="statusName === '已完结'" :src="endedImg" alt="">
    <img v-if="statusName === '待出库'" :src="waitOutstockImg" alt="">
    <img v-if="statusName === '部分出库'" :src="partOutstockImg" alt="">
    <img v-if="statusName === '出库完成'" :src="finishOutstockImg" alt="">
    <img v-if="statusName === '待入库'" :src="waitInstockImg" alt="">
    <img v-if="statusName === '部分入库'" :src="partInstockImg" alt="">
    <img v-if="statusName === '入库完成'" :src="finishInstockImg" alt="">
    <img v-if="statusName === '创建'" :src="createImg" alt="">
    <img v-if="statusName === '更新'" :src="updateImg" alt="">
    <img v-if="statusName === '部分发货'" :src="partSendgoodsImg" alt="">
    <img v-if="statusName === '发货完成'" :src="finishSendgoodsImg" alt="">
    <img v-if="statusName === '部分收货'" :src="partReceiptgoodsImg" alt="">
    <img v-if="statusName === '收货完成'" :src="finishReceiptgoodsImg" alt="">
    <img v-if="statusName === '缺货'" :src="saleShortageImg" alt="">
    <img v-if="statusName === '已客审'" :src="custAutidImg" alt="">
    <img v-if="statusName === '已财审'" :src="financeAuditImg" alt="">
    <img v-if="statusName === '暂缓开票'" :src="delayBillImg" alt="">
    <img v-if="statusName === '已开票'" :src="finallyBillImg" alt="">
    <img v-if="statusName === '待开票'" :src="waitBillImg" alt="">
    <img v-if="statusName === '已结案'" :src="caseClosedImg" alt="">
  </div>
</template>

<script>
export default {
  data() {
    return {
      submitImg: '/static/img/submit.png', // 已提交
      voidImg: '/static/img/void.png', // 已作废
      noConfirmImg: '/static/img/watermark/no_confirm.png', // 未确认
      checkedImg: '/static/img/watermark/checked.png', // 已审核
      uncheckedImg: '/static/img/watermark/unchecked.png', // 已审核
      preparingImg: '/static/img/watermark/preparing.png', // 配货中
      warehouseDeliveryImg: '/static/img/watermark/warehouse_delivery.png', // 仓库发货
      platformDeliveryImg: '/static/img/watermark/platform_delivery.png', // 平台发货
      confirmedReceiptImg: '/static/img/watermark/confirmed_receipt.png', // 已确认收货
      canceledImg: '/static/img/watermark/canceled.png', // 已取消
      systemCancelImg: '/static/img/watermark/system_cancel.png', // 系统作废
      tradeFinishImg: '/static/img/watermark/trade_finish.png', // 交易完成
      preSaleDeliveryImg: '/static/img/watermark/pre_sale_delivery.png', // 预售待发货
      preSaleShortageImg: '/static/img/watermark/pre_sale_shortage.png', // 预售缺货
      waitReturnWarehouseImg: '/static/img/watermark/wait_return_warehouse.png', // 等待退货入库
      waitSaledAuditImg: '/static/img/watermark/wait_saled_audit.png', // 等待售后审核
      finishImg: '/static/img/watermark/finish.png', // 完成
      unfinishedImg: '/static/img/watermark/unfinished.png', // 未完结
      endedImg: '/static/img/watermark/ended.png', // 已完结
      waitOutstockImg: '/static/img/watermark/wait_outstock.png', // 待出库
      partOutstockImg: '/static/img/watermark/part_outstock.png', // 部分出库
      finishOutstockImg: '/static/img/watermark/finish_outstock.png', // 出库完成
      waitInstockImg: '/static/img/watermark/wait_instock.png', // 待入库
      partInstockImg: '/static/img/watermark/part_instock.png', // 部分入库
      finishInstockImg: '/static/img/watermark/finish_instock.png', // 入库完成
      createImg: '/static/img/watermark/create.png', // 创建
      updateImg: '/static/img/watermark/update.png', // 更新
      partSendgoodsImg: '/static/img/watermark/part_sendgoods.png', // 部分发货
      finishSendgoodsImg: '/static/img/watermark/finish_sendgoods.png', // 发货完成
      partReceiptgoodsImg: '/static/img/watermark/part_receiptgoods.png', // 部分收货
      finishReceiptgoodsImg: '/static/img/watermark/finish_receiptgoods.png', // 收货完成
      saleShortageImg: '/static/img/watermark/sale_shortage.png', // 缺货
      custAutidImg: '/static/img/watermark/custAutid.png', // 已客审
      financeAuditImg: '/static/img/watermark/financeAudit.png', // 已财审
      delayBillImg: '/static/img/watermark/delayBill.png', // 暂缓开票
      finallyBillImg: '/static/img/watermark/finallyBill.png', // 已开票
      waitBillImg: '/static/img/watermark/waitBill.png', // 待开票
      caseClosedImg: '/static/img/watermark/caseclosed.png', // 已结案
    };
  },
  props: {
    statusName: {
      type: String
    }
  },
};
</script>

<style lang="less">
.statusName {
  position: absolute;
  top: 0;
  right: 60px;
  width: 104px;
  height: 104px;
  z-index: 1000;
  img {
    position: absolute;
    top: 0;
    right: 0;
    width: 104px;
    height: 104px;
  }
}
</style>


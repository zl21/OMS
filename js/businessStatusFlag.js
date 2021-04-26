export default {
  data() {
    return {
      flagObj:{
        已提交: require('../static/img/watermark/submit.png'), // 已提交
        已作废: require('../static/img/watermark/void.png'), // 已作废
        未确认: require('../static/img/watermark/no_confirm.png'), // 未确认
        已审核: require('../static/img/watermark/checked.png'), // 已审核
        // 未审核: require('../static/img/watermark/unchecked.png'), // 已审核
        配货中: require('../static/img/watermark/preparing.png'), // 配货中
        仓库发货: require('../static/img/watermark/warehouse_delivery.png'), // 仓库发货
        平台发货: require('../static/img/watermark/platform_delivery.png'), // 平台发货
        已确认收货: require('../static/img/watermark/confirmed_receipt.png'), // 已确认收货
        已取消: require('../static/img/watermark/canceled.png'), // 已取消
        系统作废: require('../static/img/watermark/system_cancel.png'), // 系统作废
        交易完成: require('../static/img/watermark/trade_finish.png'), // 交易完成
        预售待发货: require('../static/img/watermark/pre_sale_delivery.png'), // 预售待发货
        预售缺货: require('../static/img/watermark/pre_sale_shortage.png'), // 预售缺货
        等待退货入库: require('../static/img/watermark/wait_return_warehouse.png'), // 等待退货入库
        等待售后审核: require('../static/img/watermark/wait_saled_audit.png'), // 等待售后审核
        完成: require('../static/img/watermark/finish.png'), // 完成
        未完结: require('../static/img/watermark/unfinished.png'), // 未完结
        已完结: require('../static/img/watermark/ended.png'), // 已完结
        待出库: require('../static/img/watermark/wait_outstock.png'), // 待出库
        部分出库: require('../static/img/watermark/part_outstock.png'), // 部分出库
        出库完成: require('../static/img/watermark/finish_outstock.png'), // 出库完成
        待入库: require('../static/img/watermark/wait_instock.png'), // 待入库
        部分入库: require('../static/img/watermark/part_instock.png'), // 部分入库
        // 入库完成: require('../static/img/watermark/finish_instock.png'), // 入库完成
        创建: require('../static/img/watermark/create.png'), // 创建
        更新: require('../static/img/watermark/update.png'), // 更新
        部分发货: require('../static/img/watermark/part_sendgoods.png'), // 部分发货
        发货完成: require('../static/img/watermark/finish_sendgoods.png'), // 发货完成
        部分收货: require('../static/img/watermark/part_receiptgoods.png'), // 部分收货
        收货完成: require('../static/img/watermark/finish_receiptgoods.png'), // 收货完成
        缺货: require('../static/img/watermark/sale_shortage.png'), // 缺货
        已客审: require('../static/img/watermark/custAutid.png'), // 已客审
        已财审: require('../static/img/watermark/financeAudit.png'), // 已财审
        暂缓开票: require('../static/img/watermark/delayBill.png'), // 暂缓开票
        已开票: require('../static/img/watermark/finallyBill.png'), // 已开票
        待开票: require('../static/img/watermark/waitBill.png'), // 待开票
        已结案: require('../static/img/watermark/caseclosed.png'), // 已结案
        待审核: require('../static/img/watermark/stay_audit.png'),  //待审核
      }
    };
  },
  props: {
    statusName: {
      type: String
    }
  },
};
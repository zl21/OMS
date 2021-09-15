/**
 * defined组件的配置项
 */
import returnGoods from 'allpages/orderCenter/returngood/returnGoods.vue';
import returnAmount from 'allpages/orderCenter/returngood/returnAmount.vue';
import remark from 'allpages/strategyPlatform/preformAction.vue'
import paySearchOri from 'allpages/orderCenter/pay/paySearchOri.vue';
import sourceBillNo from 'allpages/orderCenter/extraRefund/sourceBillNo.vue';
import AUDITID from 'allpages/orderCenter/returnOrder/ownerName.vue';
import preSale from 'allpages/strategyPlatform/preSale.vue'

let custommizeMain = {
  REDUNDANT_ORDER_ID: paySearchOri,
  VERSION: returnGoods,
  PRO_ACTUAL_AMT:returnAmount,
  REMARK: remark,
  SOURCE_BILL_NO:sourceBillNo,
  AUDIT_ID:AUDITID,
  ST_C_CUSTOM_PRESELL_STRATEGY_ITEM:preSale   //自定义预售策略，满足条件
}
export default custommizeMain;
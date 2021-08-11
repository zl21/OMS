/**
 * defined组件的配置项
 */
import returnGoods from '@/views/pages/orderCenter/returngood/returnGoods.vue';
import returnAmount from '@/views/pages/orderCenter/returngood/returnAmount.vue';
import remark from '@/views/pages/strategyPlatform/preformAction.vue'
import paySearchOri from '@/views/pages/orderCenter/pay/paySearchOri.vue';
import sourceBillNo from '@/views/pages/orderCenter/extraRefund/sourceBillNo.vue';
import AUDITID from '@/views/pages/orderCenter/returnOrder/ownerName.vue';
import preSale from '@/views/pages/strategyPlatform/preSale.vue'

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
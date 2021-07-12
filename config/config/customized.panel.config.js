/*
 * @Author: your name
 * @Date: 2021-05-19 13:11:45
 * @LastEditTime: 2021-07-12 17:35:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /project-logic/config/module/page/coustomPage.config.js
 */
import returnGoods from '@/views/pages/orderCenter/returngood/returnGoods.vue'; // 发货前退款单/已发货退款单
import returnAmount from '@/views/pages/orderCenter/returngood/returnAmount.vue';
import remark from '@/views/pages/strategyPlatform/preformAction.vue'
import sourceBillNo from '@/views/pages/orderCenter/extraRefund/sourceBillNo.vue';
import ownerName from '@/views/pages/orderCenter/returnOrder/ownerName.vue';


let custommizeMain = {
  VERSION: returnGoods,
  PRO_ACTUAL_AMT:returnAmount,
  REMARK: remark,
  SOURCE_BILL_NO:sourceBillNo,
  OWNERNAME:ownerName
}
export default custommizeMain;
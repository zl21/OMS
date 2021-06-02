/*
 * @Author: your name
 * @Date: 2021-05-19 13:11:45
 * @LastEditTime: 2021-06-02 10:42:23
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /project-logic/config/module/page/coustomPage.config.js
 */
import returnGoods from '@/views/pages/orderCenter/returngood/returnGoods.vue';
import returnAmount from '@/views/pages/orderCenter/returngood/returnAmount.vue';
import remark from '@/views/pages/strategyPlatform/preformAction.vue'
import paySearchOri from '@/views/pages/orderCenter/paySearchOri.vue';

let custommizeMain = {
  REDUNDANT_ORDER_ID: paySearchOri,
  VERSION: returnGoods,
  PRO_ACTUAL_AMT:returnAmount,
  REMARK: remark
}
export default custommizeMain;
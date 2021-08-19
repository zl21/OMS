/*
 * @Author: your name
 * @Date: 2021-05-06 14:58:26
 * @LastEditTime: 2021-07-14 19:38:42
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /project-logic/config/module/page/finance.config.js
 */
// 财务中心-赔付单
// import payableAdjustmentList from 'allpages/financialCenter/payableAdjust/payableAdjustmentList';
// 财务中心-赔付单新增
// import payableAdjustAdd from 'allpages/financialCenter/payableAdjust/payableAdjustAdd';
import i18n from '@burgeon/internationalization/i18n'; // 国际化
export default {
  // 赔付单
  PAYABLEADJUSTMENTLIST: {
    component: () => import('allpages/financialCenter/payableAdjust/payableAdjustmentList'),
    // component: payableAdjustmentList,
  },
  // 新增赔付单
  PAYABLEADJUSTADD: {
    component: () => import('allpages/financialCenter/payableAdjust/payableAdjustAdd'),
    // component: payableAdjustAdd,
  },
};

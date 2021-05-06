// 财务中心-赔付单
// import payableAdjustmentList from 'allpages/financialCenter/payableAdjust/payableAdjustmentList';
// 财务中心-赔付单新增
// import payableAdjustAdd from 'allpages/financialCenter/payableAdjust/payableAdjustAdd';

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

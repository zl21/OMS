export default {
  // JIT配货单
  distributionFindBydistributionId: '/api/cs/vip/distributionItem/v1/findBydistributionId', // 根据配货单id查询配货单明细
  distributionChangeTag: '/api/cs/vip/distribution/v1/changeTag', // 配货单换吊牌的保存
  // 零售发货单
  managementOrderHold: '/api/cs/oc/oms/v1/holdOrder', // HOLD单
  // 退款分类
  returnTypeItemquery: '/p/cs/objectTableItem', // 退款分类描述
  // 额外退款单
  extraReturnTableLogQuery: '/api/cs/oc/oms/v1/getOcBReturnAfSendLog' // 额外退款单日志
};

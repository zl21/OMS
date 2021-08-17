// 新增明细弹框配置数据
const addItemTableColumns = [{
  type: 'selection',
  width: 50,
  align: 'center',
  key: 'selection'
},
{
  title: '商品名称',
  key: 'proEname'
},
{
  title: 'SKU编码',
  key: 'skuEcode'
},
{
  title: '商品编码',
  key: 'ecode'
},
{
  title: 'SKU名称',
  key: '平台商品名称'
},
{
  title: '赠品',
  key: 'IS_GIFT_NAME'
},
// {
//   title: '商品条码',
//   key: 'skuEcode'
// },
{
  title: '成交金额',
  key: 'realAmt'
},
{
  title: '可退金额（单笔订单退款金额上限=（可退金额+30））',
  key: 'RETURNABLE_AMOUNT_total'
},
{
  title: '购买数量',
  key: 'qty'
},
{
  title: '可退数量',
  key: 'returnQTY'
},
// {
//   title: '规格名称',
//   key: 'skuSpec'
// },
{
  title: '可退数量',
  key: 'returnQTY'
},

{
  title: '组合商品',
  key: ''
}
];

// 调整历史记录的table配置数据
const recordTableConfig = {
  columns: [{
    title: '单据编号',
    key: 'BILL_NO'
  }, {
    title: '商品编码',
    key: 'ecode'
  }]
};

// 日志的form配置数据
const logFormConfig = {
  formValue: {},
  formData: [{
    style: 'input',
    label: '创建人',
    value: 'OWNERENAME',
    width: '6',
    disabled: true
  }, {
    style: 'input',
    label: '创建时间',
    value: 'CREATIONDATE',
    width: '6',
    disabled: true
  }, {
    style: 'input',
    label: '修改人',
    value: 'MODIFIERENAME',
    width: '6',
    disabled: true
  }, {
    style: 'input',
    label: '修改时间',
    value: 'MODIFIEDDATE',
    width: '6',
    disabled: true
  }]
};

// 日志table字段
const returnLogTableConfig = [
  {
    key: 'IP_ADDRESS',
    title: 'IP地址'
  }, {
    key: 'LOG_TYPE',
    title: '日志类型'
  }, {
    key: 'LOG_MESSAGE',
    title: '日志内容'
  }, {
    key: 'OWNERENAME',
    title: '创建人姓名'
  }, {
    key: 'CREATIONDATE',
    title: '创建时间'
  }
];

const reFormDataConfig = {
  单据编号: 'BILL_NO',
  单据来源: 'REFUND_ORDER_SOURCE_TYPE',
  // '平台': 'CP_C_PLATFORM_ID',
  原始订单编号: 'SOURCE_BILL_NO',
  店铺名称: 'CP_C_SHOP_TITLE',
  原始平台单号: 'TID',
  平台退款单号: 'T_RETURN_ID',
  买家昵称: 'VIP_NICK',
  买家手机号: 'VIP_PHONE',
  退款原因: 'REASON',
  支付方式: 'PAY_MODE',
  支付账号: 'PAY_ACCOUNT',
  单据日期: 'RETURN_APPLY_TIME',
  退款金额: 'AMT_RETURN_APPLY',
  实际退款金额: 'AMT_RETURN_ACTUAL',
  判责方: 'RESPONSIBLE_PARTY',
  判责方备注: 'RESPONSIBLE_PARTY_REMARK',
  收款人姓名: 'RECEIVER_NAME',
  备注: 'REMARK',
  卖家备注: 'SELLER_REMARK'
};

export default {
  addItemTableColumns,
  recordTableConfig,
  logFormConfig,
  returnLogTableConfig,
  reFormDataConfig
};

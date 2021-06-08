/*
 * @Author: zhou.l
 * @Date: 2021-05-21 18:51:27
 * @LastEditTime: 2021-06-03 15:28:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /front-standard-product/src/views/pages/orderCenter/returnOrder/returnConfig.js
 */
const valiObj = {
	// 强制保存正则校验失败（红框警告无效）的form时：
	anyCharacter: {
		rule: /^.{0,100}$/,
		tip: "",
		msg: "存在超长录入！",
	},
	BUYER_NICK: {
		rule: /^.{0,50}$/,
		tip: "",
		msg: "买家昵称超长！",
	},
	RECEIVER_NAME: {
		rule: /^.{0,100}$/,
		tip: "",
		msg: "退货人姓名超长！",
	},
	RECEIVER_MOBILE: {
		rule: /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/,
		tip: "",
		msg: "手机号格式不正确！",
	},
	REFUND_REASON: {
		rule: /^.{0,100}$/,
		tip: "",
		msg: "退货原因超长！",
	},
	EXPRESS_CODE: {
		rule: /^.{0,50}$/,
		tip: "",
		msg: "退回运单号超长！",
	},
	SYS_REMARK: {
		rule: /^.{0,200}$/,
		tip: "",
		msg: "单据备注超长！",
	},
};
const waterMarkMap = {
	// 单据状态为等待退货入库（20）、等待售后确认（30）、完成（50）、取消（60）时，显示水印
	20: $i18n.t('form_label.waitFor_return_warehous'), // '等待退货入库',
	30: $i18n.t('form_label.waitFor_afterSale_review'), // '等待售后审核',
	50: $i18n.t('form_label.complete'), // '完成',
	60: $i18n.t('common.cancelled'), // '已取消',
};
const addDetailModalTableColumns = [
	{
		key: 'PS_C_PRO_ECODE',
		title: $i18n.t('table_label.productNo'), // 商品编码
	},
	{
		key: 'PS_C_PRO_ENAME',
		title: '商品名称',
	},
	{
		key: 'PS_C_SKU_ECODE',
		title: 'SKU编码',
	},
	{
		key: 'PS_C_SKU_ENAME',
		title: 'SKU名称',
	},
	{
		key: 'GIFT_TYPE_STR',
		title: '赠品标记',
	},
	{
		key: 'PS_C_SPEC1_ENAME',
		title: '规格1',
	},
	{
		key: 'PS_C_SPEC2_ENAME',
		title: '规格2',
	},
	{
		key: 'PS_C_SPEC3_ENAME',
		title: '规格3',
	},
	{
		key: 'QTY',
		title: '购买数量',
	},
	{
		key: 'PRICE_ACTUAL',
		title: '成交单价',
	},
	{
		key: 'REAL_AMT',
		title: '成交金额',
	},
	{
		key: 'RETURNABLE_QTY',
		title: '可退数量',
	},
];
const tuiColumns = [
	{
		key: 'selection',
		type: 'selection',
		width: '50',
		align: 'center',
	},
	{
		title: "序号",
		key: "index",
		type: "index",
		align: 'center',
	},
	{
		title: "平台退款单号",
		key: "REFUND_ID",
	},
	{
		title: "零售发货单单号",
		key: "SOURCE_BILL_NO",
	},
	{
		title: "商品编码",
		key: "PS_C_PRO_ECODE",
	},
	{
		title: "商品名称",
		key: "PS_C_PRO_ENAME",
	},
	{
		title: "SKU编码",
		key: "PS_C_SKU_ECODE",
	},
	{
		title: "SKU名称",
		key: "PS_C_SKU_ENAME",
	},
	{
		title: "赠品标记",
		key: "GIFT_TYPE_STR",
	},
	{
		title: "规格1",
		key: "PS_C_SPEC1_ENAME",
	},
	{
		title: "规格2",
		key: "PS_C_SPEC2_ENAME",
	},
	{
		title: "规格3",
		key: "PS_C_SPEC3_ENAME",
	},
	{
		title: "购买数量",
		key: "QTY",
	},
	{
		title: "成交单价",
		key: "PRICE_ACTUAL",
	},
	{
		title: "成交金额",
		key: "REAL_AMT",
	},
	{
		title: "可退数量",
		key: "RETURNABLE_QTY",
	},
	{
		title: "申请退货数量",
		key: "QTY_REFUND",
	},
	{
		title: "退货单价",
		key: "AMT_REFUND_SINGLE",
	},
	{
		title: "退货金额",
		key: "REFUND_FEE",
	},
];
const huanColumns = [
	{
		key: 'selection',
		type: 'selection',
		width: '50',
		align: 'center',
	},
	{
		title: "序号",
		key: "index",
		type: "index",
		align: 'center',
	},
	{
		title: "SPU编码",
		key: "PS_C_PRO_ECODE",
	},
	{
		title: "SPU名称",
		key: "PS_C_PRO_ENAME",
	},
	{
		title: "SKU编码",
		key: "PS_C_SKU_ECODE",
	},
	{
		title: "SKU名称",
		key: "PS_C_SKU_ENAME",
	},
	{
		title: "规格1",
		key: "PS_C_SPEC1_ENAME",
	},
	{
		title: "规格2",
		key: "PS_C_SPEC2_ENAME",
	},
	{
		title: "规格3",
		key: "PS_C_SPEC3_ENAME",
	},
	{
		title: "换货数量",
		key: "QTY_EXCHANGE",
	},
	{
		title: "零售价",
		key: "PRICE_LIST",
	},
	{
		title: "成交单价",
		key: "PRICE_ACTUAL",
	},
	{
		title: "成交金额",
		key: "AMT_EXCHANGE",
	},
];
export {
	huanColumns,
	tuiColumns,
	addDetailModalTableColumns,
	valiObj,
	waterMarkMap,
}
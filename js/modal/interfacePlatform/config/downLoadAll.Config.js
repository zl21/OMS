/**
 * @export 暴露出使用downLoadAll组件的弹窗配置项
 * */
// import IP_B_CANCEL_TIME_ORDER_VIP from './IP_B_CANCEL_TIME_ORDER_VIP.js'
// import IP_B_JINGDONG_ORDER from './IP_B_JINGDONG_ORDER.js'
// import IP_B_JINGDONG_REFUND from './IP_B_JINGDONG_REFUND.js'
// import IP_B_JITX_DELIVERY from './IP_B_JITX_DELIVERY.js'
// import IP_B_JITX_ORDER from './IP_B_JITX_ORDER.js'
// import IP_B_STANDPLAT_ORDER from './IP_B_STANDPLAT_ORDER.js'
// import IP_B_TAOBAO_EXCHANGE from './IP_B_TAOBAO_EXCHANGE.js'
// import IP_B_TAOBAO_ORDER from './IP_B_TAOBAO_ORDER.js'
// import IP_B_TAOBAO_REFUND from './IP_B_TAOBAO_REFUND.js'
// import IP_B_TIME_ORDER_VIP from './IP_B_TIME_ORDER_VIP.js'
// import IP_B_VIP_RETURN_ORDER from './IP_B_VIP_RETURN_ORDER.js'
// import IP_C_TAOBAO_PRODUCT from './IP_C_TAOBAO_PRODUCT.js'

/* 2.0: */
// import OC_B_VIPCOM_PO from './OC_B_VIPCOM_PO.js'
// import PS_C_SKU from './PS_C_SKU.js'

export default {
	IP_B_CANCEL_TIME_ORDER_VIP : () => import('./IP_B_CANCEL_TIME_ORDER_VIP.js'),
	IP_B_JINGDONG_REFUND:() => import('./IP_B_JINGDONG_REFUND.js'),
	IP_B_JITX_DELIVERY:() => import('./IP_B_JITX_DELIVERY.js'),
	IP_B_JITX_ORDER:() => import('./IP_B_JITX_ORDER.js'),
	IP_B_STANDPLAT_ORDER:() => import('./IP_B_STANDPLAT_ORDER.js'),
	IP_B_TAOBAO_EXCHANGE:() => import('./IP_B_TAOBAO_EXCHANGE.js'),
	IP_B_TAOBAO_ORDER:() => import('./IP_B_TAOBAO_ORDER.js'),
	IP_B_TAOBAO_REFUND:() => import('./IP_B_TAOBAO_REFUND.js'),
	IP_B_TIME_ORDER_VIP:() => import('./IP_B_TIME_ORDER_VIP.js'),
	IP_B_VIP_RETURN_ORDER:() => import('./IP_B_VIP_RETURN_ORDER.js'),
	IP_C_TAOBAO_PRODUCT:() => import('./IP_C_TAOBAO_PRODUCT.js'),
	/* 2.0: */
	OC_B_VIPCOM_PO: () => import('./OC_B_VIPCOM_PO.js'),
	PS_C_SKU:() => import('./PS_C_SKU.js'),
}
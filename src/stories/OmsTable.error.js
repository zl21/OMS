import OmsTable from '../view/OmsTable.vue'
import Md from './md/OmsTable.md'
import { action } from "@storybook/addon-actions";

export default {
	title: 'TABLE/OmsTable',
	component: OmsTable,
	parameters: {
		notes: Md,
	},
}

const Template = (args, { argTypes }) => ({
	components: { OmsTable },
	props: Object.keys(argTypes),
	template: '<OmsTable v-bind="$props" @labelClick="lClick" />',
	methods: {
		lClick: action(""),
	}
})

export const Default = Template.bind({})
Default.args = {
	jordanTableConfig: {
		businessButtonConfig: { "typeAll": "default", "btnsite": "left", "buttons": [{ "type": "warning", "text": "删除明细", "isShow": true, "btnclick": { "_custom": { "type": "function", "display": "<span>f</span> btnclick()", "_reviveId": 25 } } }, { "type": "default", "text": "导入", "isShow": true, "btnclick": { "_custom": { "type": "function", "display": "<span>f</span> btnclick()", "_reviveId": 26 } } }] },
		businessFormConfig: {
			formValue: { "dimData": "", "Num": "", "gbCode": "" },
			formData: [{ "style": "popInputPlus", "width": "6", "colname": "PS_C_SKU", "itemdata": { "serviceId": "r3-cp", "version": "1.4", "colid": "171332", "colname": "PS_C_SKU", "name": "SKU编码", "valuedata": "0011", "pid": "755", "fkdisplay": "drp", "isfk": true, "isnotnull": true, "readonly": false, "columnsKey": ["ECODE"], "hidecolumns": ["id", "value", "ENAME"] }, "oneObj": { "_custom": { "type": "function", "display": "<span>f</span> oneObj(\"SKU编码-oneObj::\", val)", "_reviveId": 94 } }, "inputEnter": { "_custom": { "type": "function", "display": "<span>f</span> inputEnter(!val.pid && !val.valuedata)", "_reviveId": 95 } } }]
		},
		showHeader: true,
		noDataText: '暂无数据',
		highlightRow: true,
		multiple: false,
		isSearchText: '',
		columns: [
			{ "key": "selection", "type": "selection", "width": "50", "align": "center", "__id": "vZcw1r" },
			{ "title": "序号", "key": "index", "type": "index", "align": "center", "__id": "IYEkHT" },
			{ "title": "SKU编码", "key": "PS_C_SKU_ECODE", "dataAcessKey": "PS_C_SKU_ECODE", "__id": "V65Cn7" },
			{ "title": "SKU名称", "key": "PS_C_SKU_ENAME", "dataAcessKey": "PS_C_SKU_ENAME", "__id": "IaL7B0" },
			{ "title": "SPU编码", "key": "PS_C_PRO_ECODE", "dataAcessKey": "PS_C_PRO_ECODE", "__id": "hpbDOj" },
			{ "title": "SPU名称", "key": "PS_C_PRO_ENAME", "dataAcessKey": "PS_C_PRO_ENAME", "__id": "SuFSok" },
			{ "title": "零售价", "key": "PRICE", "dataAcessKey": "PRICE", "__id": "g296GT" },
			{ "title": "成交单价", "key": "PRICE_ACTUAL", "__id": "s9ZotU" },
			// { "_custom": { "type": "component-definition", "display": "<i>Unknown Component</i>", "tooltip": "Component definition" } },
			// { "_custom": { "type": "component-definition", "display": "<i>Unknown Component</i>", "tooltip": "Component definition" } },
			// { "_custom": { "type": "component-definition", "display": "<i>Unknown Component</i>", "tooltip": "Component definition" } }
		],
		data: [{ "ACTIVE_CODE": null, "ACTIVE_ID": null, "ADJUST_AMT": "0.00", "AMT_DISCOUNT": "0.00", "AMT_JINGDONG_COUPON": null, "AMT_REFUND": null, "AMT_TAX": null, "BARCODE": null, "CANCEL_STATUS": 0, "EXCEPTION_TYPE": null, "EXCHANGE_BILL_NO": null, "GIFT_RELATION": null, "GIFT_TYPE": 0, "GROSS_WEIGHT": null, "GROUP_GOODS_MARK": null, "GROUP_NAME": null, "ID": null, "IS_EXCHANGE_ITEM": null, "IS_LACKSTOCK": null, "IS_MANUAL_ADD": null, "IS_PRESALE_SKU": null, "IS_SENDOUT": null, "IS_VIRTUAL": 0, "JD_AMT_DISCOUNT": null, "JD_COUPON_NO": null, "JITX_PO_NO": null, "LIVE_ANCHOR_ID": null, "LIVE_ANCHOR_NAME": null, "LIVE_FLAG": null, "LIVE_PLATFORM": null, "MODIFIERENAME": null, "NUM_IID": null, "OC_B_ORDER_ID": null, "OOID": null, "ORDER_SPLIT_AMT": "0.00", "ORIG_SKU_CODE": null, "OUTERRCOUNT": null, "OUTER_IID": null, "OUTER_SKU_ECODE": null, "OWNERENAME": null, "PIC_PATH": null, "PLATFORM_STATUS": null, "PRESALE_TYPE": null, "PRICE": "0.00", "PRICE_ACTUAL": "0.00", "PRICE_LIST": "0.00", "PRO_TYPE": 4, "PS_C_BRAND_ID": null, "PS_C_PRO_ECODE": "0011", "PS_C_PRO_ENAME": "轩妈中秋大礼包", "PS_C_PRO_ID": 474, "PS_C_SKU_ECODE": "0011", "PS_C_SKU_ENAME": "轩妈中秋大礼包", "PS_C_SKU_ID": 755, "PS_C_SPEC1_ECODE": null, "PS_C_SPEC1_ENAME": null, "PS_C_SPEC1_ID": null, "PS_C_SPEC2_ECODE": null, "PS_C_SPEC2_ENAME": null, "PS_C_SPEC2_ID": null, "PS_C_SPEC3_ECODE": null, "PS_C_SPEC3_ENAME": null, "PS_C_SPEC3_ID": null, "PT_PRO_NAME": null, "PT_REFUND_STATUS": null, "QTY": "1", "QTY_HAS_RETURN": null, "QTY_LACK": null, "QTY_REFUND": "0.00", "QTY_RETURN_APPLY": null, "REAL_AMT": "0.00", "REFUND_ID": null, "RETURN_ORDER_ID": null, "SKU_NUMIID": null, "SKU_SPEC": null, "STANDARD_WEIGHT": "0", "TID": null, "TITLE": null, "UNIQUE_FLAG": null, "VERSION": null, "VIRTUAL_GOODS_NOTICE": "", "WHETHER_VIRTUAL_PRODUCTION": 0, "pryKey": "_0011" }],
		height: "280",
		indexColumn: false,
		isSearchText: true,
		isShowDeleteDetailBtn: false,
		isShowImportBtn: false,
		pageShow: false,
		pageSize: 10,
		pageSizeOpts: [10, 30, 45, 60],
		renderArr: [],
		searchInputShow: false,
		searchSelectList: [],
		selectData: [],
		total: 1,
		totalData: [{ "selection": "合计:", "REAL_AMT": "0.00", "QTY": 1 }],
		width: "",
	}
}
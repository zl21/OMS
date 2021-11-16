import { handerTreeList, compareObjectFunction, beforeEach as beEach } from 'burgeonConfig/config/config.hander.js'
import customizedModal from 'burgeonConfig/config/customized.modal.config.js'
import customizedPage from 'burgeonConfig/config/customized.page.config.js'
import customizedExternalTreeDatas from 'burgeonConfig/config/externalTreeDatas.config.js'
import customizeWaterMarkConfig from 'burgeonConfig/config/customized.watermark.config.js'
import filterUrlConfig from 'burgeonConfig/config/filterUrl.config.js'
import filterUrlForNetworkSc from 'burgeonConfig/config/filterUrlForNetwork.js'
import orderDetailConnector from 'burgeonConfig/config/orderDetailConnector.js'
import labelList from 'burgeonConfig/config/labelList.js'
import orderLogo from 'burgeonConfig/config/orderLogo.js'
import importTableConfig from 'burgeonConfig/config/importTable.config.js'
import oldConfig from 'burgeonConfig/config/globalComponent.config.js'
import subTableConfig from 'burgeonConfig/config/subTable.config.js'
import custommizeMain from 'burgeonConfig/config/customized.panel.config.js'

import commonUtils from 'burgeonConfig/config/commonUtils.js'
import funBtn from 'burgeonConfig/config/funBtn.config.js'
import dropDownBtn from 'burgeonConfig/config/dropDown.config.js'
import cusValidate from 'burgeonConfig/config/validate.config.js';


import downLoadAllConfig from '@/js/modal/interfacePlatform/config/downLoadAll.Config.js'
import customizedService from '@/service/index.js'

/* --------- mixin: --------- */
import standardTableListsCustomize from 'burgeonConfig/minxin/standardTableListsCustomize';
import verticalTableDetailCustomize from 'burgeonConfig/minxin/verticalTableDetailCustomize';
import tableDetailCollectionMixin from 'burgeonConfig/minxin/standardTable/mixin.js';

import layoutDirectionSlot from '@/commonPages/layout/';

class CustomizedConfig {
	// static #beforeEach = beEach;
	static #STLD = {
		defined: layoutDirectionSlot.standardTableListdefind,
	};
	static #STLC = standardTableListsCustomize;
	static #VTDC = verticalTableDetailCustomize;
	static #TDCM = tableDetailCollectionMixin;
	static #custommizeMain = custommizeMain;
	static #subTableConfig = subTableConfig;
	static #customizedModal = customizedModal;
	static #customizedPage = customizedPage;
	static #customizedExternalTreeDatas = customizedExternalTreeDatas;
	static #customizedService = customizedService;
	static #customizeWaterMarkConfig = customizeWaterMarkConfig;
	static #filterUrlConfig = filterUrlConfig;
	static #filterUrlForNetworkSc = filterUrlForNetworkSc;
	static #orderDetailConnector = orderDetailConnector;
	static #labelList = labelList;
	static #orderLogo = orderLogo;
	static #importTableConfig = importTableConfig;
	static #downLoadAllConfig = downLoadAllConfig;
	static #cusGlobalComponent = oldConfig.cusGlobalComponent;
	static #cusImage = oldConfig.cusImage;

	/* 初始化项目的配置项，用于挂载 */
	static #commonUtils = commonUtils;
	static #funBtn = funBtn;
	static #dropDownBtn = dropDownBtn;
	static #cusValidate = cusValidate;
	/* ------------ 挂载项 start ------------- */

	/* static get beforeEach() {
		return this.#beforeEach;
	} */
	static get STLD() {
		return this.#STLD;
	}
	static get Rule() {
		return this.#cusValidate;
	}
	static get STLC() {
		return this.#STLC;
	}
	static get VTDC() {
		return this.#VTDC;
	}
	static get TDCM() {
		return this.#TDCM;
	}
	static get omsUtils() {
		return this.#commonUtils;
	}
	static get BtnConfig() {
		return this.#funBtn;
	}
	static get dropDownBtn() {
		return this.#dropDownBtn;
	}
	/* ------------ 挂载项 end ------------- */

	constructor() {
		// this.initConfig = new InitAppConfig();
		// console.log('hello CustomizedConfig');
	}
	static get formDefined() {
		return this.#custommizeMain; // defined组件的配置项
	}
	// subTable组件的配置项(有用到，不准删！！！)
	static get subTableConfig() {
		return this.#subTableConfig;
	}
	static editSubTableConfig(configItem = {}) {
		for (const centerKey in configItem) {
			if (!Object.keys(configItem[centerKey])) return
			for (const key in configItem[centerKey]) {
				if (this.#subTableConfig[centerKey]) {
					this.#subTableConfig[centerKey][key] = configItem[centerKey][key];
				} else {
					this.#subTableConfig[centerKey] = configItem[centerKey];
				}
			}
			this.#subTableConfig[key] = configItem[key];
		}
		return this.#subTableConfig
	}

	// R3.launchApplication.image配置
	static get image() {
		return this.#cusImage;
	}
	static editImage(configItem = {}) {
		for (const key in configItem) {
			this.#cusImage[key] = configItem[key];
		}
		return this.#cusImage
	}

	// R3.launchApplication.globalComponent配置
	static get globalComponent() {
		return this.#cusGlobalComponent;
	}
	static editGlobalComponent(configItem = {}) {
		for (const key in configItem) {
			this.#cusGlobalComponent[key] = configItem[key];
		}
		return this.#cusGlobalComponent
	}

	// downLoadAll组件的配置项
	static get cusDownLoadAllConfig() {
		return this.#downLoadAllConfig;
	}
	static editDownLoadAllConfig(configItem = {}) {
		for (const key in configItem) {
			this.#downLoadAllConfig[key] = configItem[key];
		}
		return this.#downLoadAllConfig
	}

	// 定制弹窗配置项
	static get cusModalConfig() {
		return this.#customizedModal;
	}
	static editCusModalConfig(configItem = {}) {
		for (const key in configItem) {
			this.#customizedModal[key] = configItem[key];
		}
		return this.#customizedModal
	}

	// 定制页面配置项
	static get cusPageConfig() {
		return this.#customizedPage;
	}
	static editCusPageConfig(configItem = {}) {
		if (!Object.keys(configItem)) return
		for (const key in configItem) {
			this.#customizedPage[key] = configItem[key];
		}
		return this.#customizedPage
	}

	// 树结构配置项
	static get cusExternalTreeDatas() {
		let list = this.#customizedExternalTreeDatas;
		return handerTreeList(list);
	}
	static editCusExternalTreeDatas(config = []) {
		/* for (const key in configItem) {
			this.#customizedExternalTreeDatas[key] = configItem[key];
		} */
		let res = JSON.parse(JSON.stringify(this.#customizedExternalTreeDatas));
		if (config.length) {
			this.#customizedExternalTreeDatas = res.concat(config);
		}
		return this.#customizedExternalTreeDatas
	}

	// 接口配置项
	static get cusService() {
		return this.#customizedService;
	}
	static editCusService(configItem = {}) {
		for (const centerKey in configItem) {
			if (!Object.keys(configItem[centerKey])) return
			for (const apiKey in configItem[centerKey]) {
				if (this.#customizedService[centerKey]) {
					// 存在此中心则修改apiKey
					this.#customizedService[centerKey][apiKey] = configItem[centerKey][apiKey];
				} else {
					// 不存在此中心则直接新增
					this.#customizedService[centerKey] = configItem[centerKey];
				}
			}
		}
		return this.#customizedService
	}

	// 订单管理专用label配置项.[]
	static get cusLabelList() {
		return this.#labelList;
	}
	static editCusLabelList(configItem = []) {
		const compareLable = compareObjectFunction('label');
		for (const x in configItem) {
			for (const y in this.#labelList) {
				if (compareLable(configItem[x], this.#labelList[y])) {
					// lable相同则替换
					this.#labelList[y] = configItem[x]
				} else {
					// 反之，新增
					this.#labelList.push(configItem[x])
				}
			}
		}
		return this.#labelList
	}

	// orderLogo配置项
	static get cusOrderLogo() {
		return this.#orderLogo;
	}
	static editCusOrderLogo(configItem = {}) {
		for (const key in configItem) {
			this.#orderLogo[key] = configItem[key];
		}
		return this.#orderLogo
	}

	// 水印配置项
	static get cusWaterMarkConfig() {
		return this.#customizeWaterMarkConfig;
	}
	static editCusWaterMarkConfig(configItem = {}) {
		for (const key in configItem) {
			this.#customizeWaterMarkConfig[key] = configItem[key];
		}
		return this.#customizeWaterMarkConfig
	}

	// 过滤报错接口配置项 的脚本（不提供修改）
	static get filterUrlForNetworkScript() {
		return this.#filterUrlForNetworkSc;
	}

	// 过滤报错接口配置项
	static get cusFilterUrlConfig() {
		return this.#filterUrlConfig;
	}
	static editCusFilterUrlConfig(configItem = {}) {
		for (const key in configItem) {
			this.#filterUrlConfig[key] = configItem[key];
		}
		return this.#filterUrlConfig
	}

	// 订单详情-半定制-配置项
	static get connector() {
		return this.#orderDetailConnector;
	}
	static editConnector(configItem = {}) {
		for (const key in configItem) {
			this.#orderDetailConnector[key] = configItem[key];
		}
		return this.#orderDetailConnector
	}

	// 导入接口、下载模板的模板地址（importTable.vue中需要的配置项）
	static get cusImport() {
		return this.#importTableConfig;
	}
	static editCusImport(configObj = {}) {
		if (!Object.keys(configObj)) return
		for (const tableWebnameKey in configObj) {
			this.#importTableConfig[tableWebnameKey] = configObj[tableWebnameKey];
		}
		return this.#importTableConfig
	}

	static editConfig(config, configItem = {}) {
		for (const key in configItem) {
			this[config][key] = configItem[key];
		}
		return this[config]
	}
}



// console.log(new CustomizedConfig());
// console.clear();
const Custom = {
	beforeEach: beEach,
	...layoutDirectionSlot,
	STLD: CustomizedConfig.STLD,
	Rule: CustomizedConfig.Rule,
	STLC: CustomizedConfig.STLC,
	VTDC: CustomizedConfig.VTDC,
	TDCM: CustomizedConfig.TDCM,
	omsUtils: CustomizedConfig.omsUtils,
	BtnConfig: CustomizedConfig.BtnConfig,
	dropDownBtn: CustomizedConfig.dropDownBtn,
	image: CustomizedConfig.image,
	setImage: (v) => CustomizedConfig.editImage(v),
	globalComponent: CustomizedConfig.globalComponent,
	setGlobalComponent: (v) => CustomizedConfig.editGlobalComponent(v),
	cusModalConfig: CustomizedConfig.cusModalConfig,
	setCusModalConfig: (v) => CustomizedConfig.editCusModalConfig(v),
	cusPageConfig: CustomizedConfig.cusPageConfig,
	setCusPageConfig: (v) => CustomizedConfig.editCusPageConfig(v),
	cusExternalTreeDatas: CustomizedConfig.cusExternalTreeDatas,
	setCusExternalTreeDatas: (v) => CustomizedConfig.editCusExternalTreeDatas(v),
	formDefined: CustomizedConfig.formDefined,
	subTableConfig: CustomizedConfig.subTableConfig,
	setSubTableConfig: (v) => CustomizedConfig.editSubTableConfig(v),
	cusDownLoadAllConfig: CustomizedConfig.cusDownLoadAllConfig,
	setDownLoadAllConfig: (v) => CustomizedConfig.editDownLoadAllConfig(v),
	cusService: CustomizedConfig.cusService,
	setCusService: (v) => CustomizedConfig.editCusService(v),
	cusLabelList: CustomizedConfig.cusLabelList,
	setCusLabelList: (v) => CustomizedConfig.editCusLabelList(v),
	cusOrderLogo: CustomizedConfig.cusOrderLogo,
	setCusOrderLogo: (v) => CustomizedConfig.editCusOrderLogo(v),
	cusWaterMarkConfig: CustomizedConfig.cusWaterMarkConfig,
	setCusWaterMarkConfig: (v) => CustomizedConfig.editCusWaterMarkConfig(v),
	filterUrlForNetworkScript: CustomizedConfig.filterUrlForNetworkScript,
	cusFilterUrlConfig: CustomizedConfig.cusFilterUrlConfig,
	setCusFilterUrlConfig: (v) => CustomizedConfig.editCusFilterUrlConfig(v),
	connector: CustomizedConfig.connector,
	setConnector: (v) => CustomizedConfig.editConnector(v),
	cusImport: CustomizedConfig.cusImport,
	editCusImport: (v) => CustomizedConfig.editCusImport(v),
	editConfig: (v) => CustomizedConfig.editConfig(v),
}
// export default CustomizedConfig;
export default Custom
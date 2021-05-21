import InitAppConfig from './config/init.config.js' // 首位引入
import customizedModal from './config/customized.modal.config.js'
import customizedPage from './config/customized.page.config.js'
import customizedExternalTreeDatas from './config/externalTreeDatas.config.js'
import customizedService from '../service/index.js'
import customizeWaterMarkConfig from './config/customized.watermark.config.js'
import filterUrlConfig from './config/filterUrl.config.js'
import filterUrlForNetworkSc from './config/filterUrlForNetwork.js'
import orderDetailConnector from './config/orderDetailConnector.js'
import labelList from './config/labelList.js'
import orderLogo from './config/orderLogo.js'
import importTableConfig from './config/importTable.config.js'
import downLoadAllConfig from '@/js/modal/interfacePlatform/config/downLoadAll.Config.js'
import oldConfig from './config/globalComponent.config.js'
import subTableConfig from './config/subTable.config.js'
import custommizeMain from './config/customized.panel.config.js'

import commonUtils from './config/commonUtils.js'
import funBtn from './config/funBtn.config.js'
import dropDownBtn from './config/dropDown.config.js'
import Vue from 'vue';

class CustomizedConfig {
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
	/* ------------ 挂载项 start ------------- */
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
	static get custommizeMain() {
		return this.#custommizeMain;
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
		return this.#customizedExternalTreeDatas;
	}
	static editCusExternalTreeDatas(configItem = {}) {
		for (const key in configItem) {
			this.#customizedExternalTreeDatas[key] = configItem[key];
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

/**
 * @method 用于比较对象
 * @propName 根据对象的什么属性进行比较（一般根据对象的key）
 * @objX @objY 待进行比较的两个对象
 * @return key值相同返回1
 */
function compareObjectFunction(propName) {
	return function (objX, objY) {
		let x = objX[propName],
			y = objY[propName];
		if (x < y) {
			return -1;
		} else {
			return 1;
		}
	}
}

/**
 * @method 用于修改二维对象的属性 eg.allCenter:{orderCenter:{orderAdd:'订单新增'}}
 * @property 对应当前类中的私有属性（私有属性不能通过中括号语法访问，可以尝试先改import进来的东西，改了之后再一次赋值给私有属性）
 * @configObj 外部传入的对象
 * @return 配置项
 */
function modifyObjectFunction(property, configObj = {}) {
	if (!Object.keys(configObj)) return
	for (const key1 in configObj) {
		if (!Object.keys(configObj[key1])) return
		for (const key2 in configObj[key1]) {
			const pubProperty = property;
			if (pubProperty[key1]) {
				// 存在此中心则修改
				pubProperty[key1][key2] = configObj[key1][key2];
			} else {
				// 不存在此中心则直接新增
				pubProperty[key1] = configObj[key1];
			}
		}
	}
}

// console.log(new CustomizedConfig());
// console.clear();
export default CustomizedConfig;
/*
 * @Author: your name
 * @Date: 2021-11-01 15:32:39
 * @LastEditTime: 2021-11-02 17:42:48
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /burgeon-business-components/src/index.js
 */

import Vue from 'vue';

let comJS = require.context('burgeonComponents/common/js/', false, /\.js$/);
const Utils = {}
comJS.keys().forEach(key => {
	if (key == './utils.js') {
		Utils.CM = comJS(key).default
	} else {
		const obj = comJS(key).default;
		Object.assign(Utils, obj)
	}
})

const context = require.context('burgeonComponents/view/', false, /\.vue$/);
const CustomComponents = {}
context.keys().forEach((key) => {
	const component = context(key).default;
	CustomComponents[component.name] = component
	Vue.component(component.name, component)
});

let directiveFiles = require.context('burgeonComponents/directive/', false, /\.js$/);
const Directives = directiveFiles.keys().reduce((Directives, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = directiveFiles(modulePath)
  Directives[moduleName] = value.default
  return Directives
}, {});

export default { Components: CustomComponents, Utils, Directives };

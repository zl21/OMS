/*
 * @Author: your name
 * @Date: 2021-11-01 15:32:39
 * @LastEditTime: 2021-11-02 17:42:48
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /burgeon-business-components/src/index.js
 */
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
const Components = Utils.CM.exportModules(context);
// const CustomComponents = {}
// context.keys().forEach((key) => {
// 	const component = context(key).default;
// 	CustomComponents[component.name] = component
// 	Vue.component(component.name, component)
// });

let directiveFiles = require.context('burgeonComponents/directive/', false, /\.js$/);
const Directives = Utils.CM.exportModules(directiveFiles)

const install = function(Vue, opts = {}) {
	context.keys().forEach((key) => {
		const component = context(key).default;
		Vue.component(component.name, component)
	});

	Object.keys(Directives).forEach(key => {
		Vue.directive(key, Directives[key])
	})

	window.$utils = Utils.CM;
	Vue.prototype.$utils = Utils.CM;
}

export default {
	install,
	Components,
	Utils,
	version: require('./package.json').version,
};

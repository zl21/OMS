/*
 * @Author: your name
 * @Date: 2021-11-01 15:32:39
 * @LastEditTime: 2021-12-15 09:25:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /burgeon-business-components/src/index.js
 */

const Utils = {}
let Components
let install

let comJS = require.context('burgeonComponents/common/js/', false, /\.js$/);

comJS.keys().forEach(key => {
	if (key == './utils.js') {
		Utils.CM = comJS(key).default
	} else {
		const obj = comJS(key).default;
		Object.assign(Utils, obj)
	}
})
Utils.unZip = require('./src/common/js/zip/index').default

const context = require.context('burgeonComponents/view/', false, /\.vue$/);
Components = Utils.CM.exportModules(context);

let directiveFiles = require.context('burgeonComponents/directive/', false, /\.js$/);
const Directives = Utils.CM.exportModules(directiveFiles)

install = function (Vue, opts = {}) {
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

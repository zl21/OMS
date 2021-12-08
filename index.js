/*
 * @Author: your name
 * @Date: 2021-11-01 15:32:39
 * @LastEditTime: 2021-12-07 19:56:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /burgeon-business-components/src/index.js
 */
import ImportCDNJS from 'import-cdn-js';

const Utils = {}
let Components
let install
export default ImportCDNJS('//cdn.jsdelivr.net/npm/@syman/burgeon-r3-components@2.1.3-cs/r3.publish/r3components.min.js', '$R3_CPS')
  .then(R3C => {
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
	
	install = function(Vue, opts = {}) {
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

}).then(()=> {
	return {
		install,
		Components,
		Utils,
		version: require('./package.json').version,
	}
})



// export default {
// 	install,
// 	Components,
// 	Utils,
// 	version: require('./package.json').version,
// };

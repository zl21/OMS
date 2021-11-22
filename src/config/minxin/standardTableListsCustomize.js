/*
 * @Author: your name
 * @Date: 2021-11-05 15:08:58
 * @LastEditTime: 2021-11-08 13:29:41
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /burgeon-project-logic/src/config/minxin/standardTableListsCustomize.js
 */
import listJsActions from './listJsActions';

export default () => standardTableListsCustomize({
	mixins: [listJsActions(),],
	data() {
		return {};
	},
	watch: {},
	created() { },
	updated() { },
	mounted() { },
	methods: {
		R3_searchBefore(obj) {
			// 列表界面查询按钮前置事件，可通过该事件改变查询接口参数
			// this.searchData.isfresh = true;
			// debugger
			obj.callBack().then(() => {
				// delete this.searchData.isfresh; // 执行完要删除
				// debugger
			});
		},
		R3_processColumns(columns) {
			columns.forEach(item => {
				// item.tdAlign = 'center' // 列的表体内容居中
				// item.isorder = false // 关闭列的过滤功能
				// item.thAlign = 'center'
				if (item.colname == 'ID') {
					// item.headerClass = 'aG_index'
					item.thAlign = 'center'
					item.tdAlign = 'center'
				}
			})

			return columns // 从下个版本2.0.6开始，需要把结果return 回去。可以提前return做下兼容
		}
	},
});

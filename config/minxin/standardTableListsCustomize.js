import listJsActions from './listJsActions';

export default () => ({
	mixins: [listJsActions(),],
	data() {
		return {};
	},
	watch: {},
	created() { },
	updated() { },
	mounted() { },
	methods: {
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

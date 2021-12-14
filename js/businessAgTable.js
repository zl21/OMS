/*
 * @Author: your name
 * @Date: 2021-06-21 10:17:52
 * @LastEditTime: 2021-06-29 16:08:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /burgeon-business-components/js/vueAgTable.js
 */
// import commonTableByAgGrid from 'libs/@syman/ark-ui-bcl/src/components/common-table-by-ag-grid/CommonTableByAgGrid'; // npm
import i18n from "@burgeon/internationalization/i18n";

export default {
	name: 'businessAgTable',
	components: {
		// commonTableByAgGrid
	},
	props: {
		renderParams: {
			type: Function
		},
		agTableConfig: {
			type: Object,
			default: {}
		},
		options: {
			type: Object,
			default: {
				datas: {}
			}
		}
	},
	data() {
		return {
			vmI18n: i18n,
			columnState: '',
		}
	},
	watch: {
		/* 'columnState': {
			handler(val) {
			const self = this;
			if (val != '') {
				let th = self.setColumn(val, self.agTableConfig.columnDefs)
				console.log('th::', th);
				self.agTableConfig.columnDefs = th;
			}
			}
		}, */
		'agTableConfig.columnDefs': {
			handler(val, oldVal) {
				if (this.agTableConfig.isIndex && val[0].field !== 'ag_index') {
					val.unshift({
						headerName: '序号',
						field: 'ag_index',
						checkboxSelection: true,
						headerCheckboxSelection: true,
						pinned: 'left',
						suppressMovable: true, //禁止该列拖拽
						suppressFilter: true,
						floatingFilter: this.options.floatingFilter ?  this.options.floatingFilter : true,
						isorder: true, // checkboxSelection为true时排序不生效！？
						sort: 'desc',
						maxWidth: 125, //最大宽度
						"width": 90,
						cellStyle: { color: 'rgb(15, 142, 233)' },
					})
				}
			},
			deep: true
		},
		'agTableConfig.rowData': {
			handler(val, oldVal) {
				const currentPage = this.agTableConfig.pagenation.current;
				const pageSize = this.agTableConfig.pagenation.pageSize;
				if (this.agTableConfig.isIndex) {
					val.forEach((item, i) => {
						item.ag_index = (currentPage - 1) * pageSize + i + 1;
					});
				}
			},
			deep: true
		},
	},
	methods: {
		gridReady() {
			// this.tabth = [];
			// this.row = [];
			const self = this;
			console.log('--::', this.columnState);
      if (self.columnState != '') {
        let th = self.setColumn(this.columnState, self.agTableConfig.columnDefs)
        this.agTableConfig.columnDefs = th;
      }
		},
		tableRowDbclick(data) {
			this.$emit('on-row-dblclick', data.data);
		},
		// 分页change 事件
		pageChange(val) {
			this.$emit('on-page-change', val)
		},
		// 切换分页条数
		onPageSizeChange(val) {
			this.$emit('on-page-size-change', val)
		},
		tableSelectedChange(data) {
			this.$emit('on-selection-change', data);
		},
		colPinned(data) {
			this.$emit('on-column-pinned', data);
		},
		colSortChange(data) {
			this.$emit('on-sort-change', data);
		},
		colMoved: _.debounce(async function () {
			const self = this;
			if (self.options.oldMoved) {
				self.onColumnMoved(self.$refs.agGrid, self);
				// return
			}
			const { api, columnApi } = self.$refs.agGrid;
			const colData = columnApi.getAllGridColumns()
			this.$emit('on-column-moved', colData);
		}, 1000),

		/** ---------------------- 老ag方法： ---------------------- **/
		onColumnMoved: _.debounce((agSelf, self) => {
			//拖拽表头,更新表头顺序
			const {
				columnApi
			} = agSelf
			let a = columnApi
				.getColumnState()
				.map((d) => d.colId)
				.toString()
			//表头拖拽存储
			let formdata = new FormData()
			formdata.append('tableid', self.$route.params.customizedModuleId)
			formdata.append('colposition', a)
			R3.network.post('/p/cs/setColPosition', formdata)
				.then((res) => {
					if (res.data.code == 0) {
						self.columnState = res.data.data
						//更新表头
						let col = self.setColumn(
							res.data.data,
							self.agTableConfig.columnDefs
						)
						self.agTableConfig.columnDefs = col;
						// self.AGTABLE.setCols(col)
					}
				})
		}, 1000),
		setColumn(val, th) {
			let arr = val.split(',')
			let thArr = [], eXArr = []
			/* arr.forEach((item) => {
				let head = th.find((i) => {
					return i.field == item
				})
				if (head) {
					thArr.push(head)
				}
			})
			return thArr */
			arr.forEach((item) => {
        th.forEach((i) => {
					if (item == i.field) {
						thArr.push(i)
					}
				})
			})
      th.forEach((i) => {
        if (!arr.includes(i.field)) {
					eXArr.push(i)
				}
      })
			return thArr.concat(eXArr)
		},
		getUserConfig() {
			//请求用户表头排列顺序
			let self = this
			let formdata = new FormData()
			formdata.append('id', this.$route.params.customizedModuleId)
			formdata.append('type', 'action')
			formdata.append('flag', 'OmsAgTable')
			R3.network.post('/p/cs/getUserConfig', formdata)
				.then((res) => {
					// console.log(res);
					if (res.data.code == 0) {
						self.columnState = res.data.data.colPosition
					}
				})
		},
		getMainMenuItems: (params, self) => {
			// 注意: 会触发列移动的回调'on-column-moved'
			// let self = this
			return [
				// 'pinSubMenu',
				'separator',
				'autoSizeThis',
				'autoSizeAll',
				'separator',
				{
					name: '重置所有列位置信息',
					action: () => {
						// let a = columnApi.getColumnState().map(d => d.colId).toString();
						//表头拖拽存储
						let formdata = new FormData()
						formdata.append('tableid', self.$route.params.customizedModuleId)
						formdata.append('colposition', '')
						formdata.append('flag', 'reset')
						R3.network.post('/p/cs/setColPosition', formdata).then((res) => {
							if (res.data.code == 0) {
								self.columnState = res.data.data
								//更新表头
								self.agTableConfig.columnDefs.forEach((d, i) => {
									params.columnApi.moveColumn(d, i);
								})
							}
						})
					},
				},
			]
		},
	},
	mounted() {
		this.getUserConfig();
		// 初始化options
		if (this.options.oldAg || this.options.oldMoved) {
			Object.assign(this.options, {
				'getMainMenuItems': ag => this.getMainMenuItems(ag, this),
			})
		}
	}
}

import detailtable from 'allpages/promotionCenter/onlinePromotion/details/table.vue';
import { tableCols } from '../promotion.config';

export default {
	name: 'dialogVisiblex',
	data() {
		return {
			btnConfig: {
				typeAll: 'default',
				btnsite: "right",
				buttons: [
					{
						text: $i18n.t('common.cancel'), // 取消
						class: "white",
						isShow: false,
						disabled: false,
						btnclick: () => this.closeDialogs()
					},
					{
						text: $i18n.t('btn.save'), // 保存
						class: "active",
						disabled: false,
						btnclick: () => this.confirm()
					},
				]
			},
			tableCols,
			commodityList: {
				current: 1,
				total: 0,
				pageSize: 10,
				data: []
			}
		};
	},
	props: {
		dialog_visible: {
			type: Boolean,
			default: false
		},
		giftData: {
			type: Object
		},
		basicData: {
			type: Object
		},
		objid: {
			type: String
		},
		loadDis: {
			type: Boolean,
			default: false
		},
	},
	components: {
		detailtable,
	},
	computed: {
		columns() {
			return this.tableCols.set_commodity;
		},
	},
	watch: {
		loadDis(val) {
			if (val === true) {
				this.commodityList.data = [];
				this.initView();
			}
		}
	},
	mounted() {
		this.btnConfig.buttons[0].isShow = !(this.objid > 0 && ['2', '3'].includes(this.basicData.status));
	},
	created() {
	},
	activated() {

	},
	methods: {
		/**
		 * 根据数据源 真实展示数据
		 */
		initView() {
			const obj = {
				current: 1,
				total: 0,
				pageSize: 10,
				data: []
			};
			this.commodityList = obj;
			this.tablelistView(
				this.giftData.gift_commoditylist,
				this.commodityList
			);
		},
		confirm() {
			this.$emit('confirm');
		},
		closeDialogs() {
			this.$emit('closeDialog');
		},
		/** * 根据当前页和当前页数目 ，展示表格
		 * @row 原始表格数据
		 * @obj 表格虚拟视图
		 */
		tablelistView(rows, obj) {
			const current = obj.current || 1;
			const pageSize = obj.pageSize || 10;
			const start = Number((current - 1) * pageSize);
			const end = Number(current * pageSize);
			obj.total = rows.length;
			obj.data = rows.slice(start, end);
		},
		pageChange(val) {
			this.commodityList.current = val;
			this.tablelistView(
				this.giftData.gift_commoditylist,
				this.commodityList
			);
		},
		/**
		 * 切换非tab页面的表格的页长度
		 */
		onPageSizeChange(val) {
			this.commodityList.pageSize = val;
			this.tablelistView(
				this.giftData.gift_commoditylist,
				this.commodityList
			);
		},
		/**
		 * 单表格添加和删除 灵活展示表格
		 */
		countTablelistView() {
			const rows = this.giftData.gift_commoditylist || [];
			const obj = this.commodityList;
			const pageSize = obj.pageSize || 10;
			const pagesLen = Math.ceil(rows.length / pageSize);
			if (obj.current > pagesLen) obj.current = pagesLen;
			if (pagesLen === 0) obj.current = 1;
			this.tablelistView(rows, this.commodityList);
		},
		/**
		 * 删除多余属性
		 */
		deleteProperty(row) {
			delete row._index;
			delete row.colspan;
			delete row._rowKey;
		},
		/**
		 *  修改行数据
		 *  @row 行数据
		 *  @currentPage 当前页
		 *  @pageSize 页大小
		 *  @force 强制更改元数据，刷新表格
		 */
		alertRowData(row, currentPage, pageSize) {
			const rowCount = (currentPage - 1) * pageSize;
			const index = rowCount + row._index;
			if (index >= 0 && !(this.objid > 0 && (this.basicData.status === '2' || this.basicData.status === '3'))) {
				this.giftData.gift_commoditylist[index].SUM_QTY = row.SUM;
				this.giftData.gift_commoditylist[index].SUM = row.SUM;
				this.commodityList.data[row._index].SUM_QTY = row.SUM;
			}
		},
	}
};

import OmsAgTable from '../view/OmsAgTable.vue'
import Md from './md/OmsAgTable.md'
import { action } from '@storybook/addon-actions';

const baseColumnDefs = [
	{
		headerName: '序号',
		// headerName: vmI18n.t("table_label.serialNo"),
		field: 'SERIAL_NO',
		pinned: 'left',
		width: 90,
		headerCheckboxSelection: true,
		checkboxSelection: true,
		sort: '10',
		suppressMovable: true,
		// headerClass: 'aG_index',
		cellStyle: { color: 'rgb(15, 142, 233)' },
		thAlign: 'center',
		tdAlign: 'center',
	},
	{
		headerName: '促销编号',
		// headerName: vmI18n.t("table_label.serialNo"),
		field: 'ACTI_NO'
	},
	{
		headerName: '活动名称',
		// headerName: vmI18n.t("form_label.activityName"),
		field: 'ACTI_NAME'
	},
	{
		headerName: '参与店铺',
		// headerName: vmI18n.t("table_label.participating_store"),
		field: 'STORE_NAMES'
	},
	{
		headerName: '活动时间段',
		// headerName: vmI18n.t("table_label.activity_period"),
		field: 'ACTI_DATE'
	},
	{
		headerName: '失效下线时间',
		// headerName: vmI18n.t("table_label.failure_offline_time"),
		field: 'DOWN_TIME'
	},
	{
		headerName: '剩余可送',
		// headerName: vmI18n.t("table_label.rest_sent"),
		field: 'STOCK'
	},
	{
		headerName: '已送数量',
		// headerName: vmI18n.t("table_label.delivered_quantity"),
		field: 'SEND'
	},
	{
		headerName: '状态',
		// headerName: vmI18n.t("table_label.status"),
		field: 'status'
	},
	{
		headerName: '分组名称',
		// headerName: vmI18n.t("table_label.groupName"),
		field: 'GROUP_NAME'
	},
	{
		headerName: '优先级',
		// headerName: vmI18n.t("table_label.priority"),
		field: 'LEVEL'
	},
	{
		headerName: '创建人',
		// headerName: vmI18n.t("table_label.creator"),
		field: 'OWNERENAME'
	},
	{
		headerName: '创建时间',
		// headerName: vmI18n.t("table_label.creationTime"),
		field: 'CREATIONDATE'
	},
	{
		headerName: '修改人',
		// headerName: vmI18n.t("table_label.reviser"),
		field: 'OWNERENAME'
	},
	{
		headerName: '修改时间',
		// headerName: vmI18n.t("table_label.modificationTime"),
		field: 'MODIFIEDDATE'
	},
	{
		headerName: '备注',
		// headerName: vmI18n.t("table_label.remarks"),
		field: 'REMARK'
	},
	{
		headerName: $i18n.t('table_label.operation'), // 操作
		// headerName: vmI18n.t("table_label.operation"),
		field: 'ACTION_LOG'
	}
];

export default {
	title: 'Table/OmsAgTable',
	component: OmsAgTable,
	parameters: {
		notes: Md,
	},
	// argTypes: {
	// backgroundColor: { control: 'color' },
	// size: {
	//   control: { type: 'select' },
	//   options: ['small', 'medium', 'large'],
	// },
	// },
}

const Template = (args, { argTypes }) => ({
	components: { OmsAgTable },
	props: Object.keys(argTypes),
	// template: '<OmsAgTable v-bind="$props" @on-row-dblclick="dbClick" @on-page-change="pageChange" @on-page-size-change="pageSizeChange" @on-selection-change="onSelectionChange" @on-column-pinned="colPinned" @on-column-moved="colMoved" @on-sort-change="colSortChange" />',
	template: '<OmsAgTable v-bind="$props" @on-row-dblclick="dbClick" @on-page-change="pageChange" />',
	methods: {
		dbClick: action(""),
		pageChange: action(""),
	}
})

export const Default = Template.bind({})
Default.args = {
	agTableConfig: {
		pageShow: true,
		isIndex: true,
		tableHeight: '400px',
		columnDefs: baseColumnDefs,
		rowData: [{ "CREATIONDATE": "2021.11.03 14:47:25", "ACTI_NO": "CX2111030002947", "ORDER_TYPE": "正常,换货,预售,虚拟定金,虚拟", "MODIFIEDDATE": "2021.11.03 14:50:10", "LEVEL": null, "ACTI_TYPE": "指定买赠", "STOCK": 10, "SEND": 0, "OWNERENAME": "[root]系统管理员", "DOWN_TIME": "2021.11.06 23:59:59", "ACTI_ID": 2960, "ACTI_DATE": "2021.11.03 00:00:00 ~ 2021.11.04 23:59:59", "GROUP_NAME": null, "STATUS": 3, "ACTI_NAME": "ZZB回归", "PROMOTION_TIME_TYPE": "付款日期", "STORE_NAMES": "郭成伟的测试店铺", "IS_BATCH": false, "MODIFIERENAME": "[root]系统管理员", "REMARK": "", "ID": { "val": "2960" }, "ACTION_LOG": "查看日志", "ag_index": 1, "__ag_sequence_column_name__": { "val": 1 } }],
		pagenation: {
			total: 0,
			current: 1,
			pageSize: 20,
			pageSizeOpts: [20, 50, 100, 200, 500, 2000],
		},
		renderParams: (cellData) => {
			if (cellData.field == 'ACTION_LOG') {
				return {
					renderContainer: 'CellRenderByFunction',
					renderComponent: (h, params) => {
						if (!params.row.ACTION_LOG) return;
						return h('div', {
							on: {
								click: () => {
									this.viewLog(params.row);
								}
							},
							domProps: {},
							style: {
								color: '#0f8ee9 ',
								textDecoration: 'underline ',
								cursor: 'pointer ',
							}
						}, params.row.ACTION_LOG)
					}
				}
			}
		},
	},
	options: {
		datas: {}
	}
}
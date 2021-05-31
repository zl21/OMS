/*
 * @Author: zhou.l
 * @Date: 2021-05-31 17:36:42
 * @LastEditTime: 2021-05-31 17:41:30
 * @LastEditors: Please set LastEditors
 * @Description: 促销中心的配置文件
 * @FilePath: /burgeon-project-logic/js/pages/promotionCenter/promotionConfig.js
 */

const baseColumnDefs = [
	{
		headerName: '序号',
		// headerName: vmI18n.t("table_label.serialNo"),
		field: 'SERIAL_NO',
		pinned: 'left',
		maxWidth: 120,
		headerCheckboxSelection: true,
		checkboxSelection: true,
		sort: 'asc',
		suppressMovable: true
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
		headerName: '操作',
		// headerName: vmI18n.t("table_label.operation"),
		field: 'ACTION_LOG'
	}
];
const logDataCol = [
	{
		// title: "序号",
		title: $i18n.t('table_label.serialNo'),
		type: 'index',
		width: 60,
		align: 'center'
	},
	{
		// title: "操作时间",
		title: $i18n.t('table_label.operatorTime'),
		key: 'creationdate'
	},
	{
		// title: "操作人",
		title: $i18n.t('form_label.operator'),
		key: 'operator'
	},
	{
		// title: "操作描述",
		title: $i18n.t('table_label.operation_description'),
		key: 'describes'
	}
];
const diStatusArr = [
	{
		value: 1,
		label: $i18n.t('btn.draft') // 草稿
	},
	{
		value: 2,
		label: $i18n.t('btn.published') // 已发布
	},
	{
		value: 3,
		label: $i18n.t('btn.offline') // 下线
	}
];

export {
	diStatusArr,
	logDataCol,
	baseColumnDefs,
}
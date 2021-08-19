/*
 * @Author: zhou.l
 * @Date: 2021-05-31 17:36:42
 * @LastEditTime: 2021-05-31 17:41:30
 * @LastEditors: Please set LastEditors
 * @Description: 促销中心的配置文件
 * @FilePath: /burgeon-project-logic/js/pages/promotionCenter/promotionConfig.config.js
 */

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
		cellStyle: {color: 'rgb(15, 142, 233)'},
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
const tableCols = {
	infoColumns: [
		{
			slot: 'ECODE',
			key: 'ECODE',
			title: 'SKU编码'
		},
		{
			key: 'ENAME',
			title: '商品名称'
		},
		{
			key: 'OPERATE',
			title: $i18n.t('table_label.operation'), // 操作
			fun: ''
		}
	],
	infoColumnsxt: [
		{
			slot: 'ECODE',
			key: 'ECODE',
			title: '商品编码'
		},
		{
			key: 'ENAME',
			title: '商品名称'
		},
		{
			key: 'OPERATE',
			title: $i18n.t('table_label.operation'), // 操作
			fun: ''
		}
	],
	infoColumnspt: [
		{
			slot: 'ECODE',
			key: 'ECODE',
			title: '商品数据编号'
		},
		{
			key: 'ENAME',
			title: '商品标题'
		},
		{
			key: 'OPERATE',
			title: $i18n.t('table_label.operation'), // 操作
			fun: ''
		}
	],
	giftAllColumns: [
		{
			slot: 'ECODE',
			key: 'ECODE',
			title: 'SKU编码'
		},
		{
			key: 'ENAME',
			title: '商品名称'
		},
		{
			key: 'NUM',
			title: '每次赠送数量',
		},
		{
			key: 'SUM',
			title: '赠送总计数量',
		},
		{
			key: 'SUM_QTY',
			title: '剩余可送',
		},
		{
			key: 'SEND_QTY',
			title: '已送数量'
		},
		{
			key: 'OPERATE',
			title: $i18n.t('table_label.operation'), // 操作
			fun: ''
		}
	],
	giftNoSumColumns: [
		{
			slot: 'ECODE',
			key: 'ECODE',
			title: 'SKU编码'
		},
		{
			key: 'ENAME',
			title: '商品名称'
		},
		{
			key: 'NUM',
			title: '每次赠送数量',
		},
		// {
		//     key: "SUM",
		//     title: "赠送总计数量",
		// },
		// {
		//     key: "SUM_QTY",
		//     title: "剩余可送",
		// },
		{
			key: 'SEND_QTY',
			title: '已送数量'
		},
		{
			key: 'OPERATE',
			title: $i18n.t('table_label.operation'), // 操作
			fun: ''
		}
	],
	giftInCreaseColumns: [
		{
			slot: 'ECODE',
			key: 'ECODE',
			title: 'SKU编码'
		},
		{
			key: 'ENAME',
			title: '商品名称'
		},
		{
			key: 'NUM',
			title: '每次赠送数量',
		},
		{
			key: 'SUM',
			title: '赠送总计数量',
		},
		{
			key: 'SUM_QTY',
			title: '剩余可送',
		},
		{
			key: 'SEND_QTY',
			title: '已送数量'
		},
		{
			key: 'ORDER',
			title: '顺序号',
		},
		{
			key: 'OPERATE',
			title: $i18n.t('table_label.operation'), // 操作
			fun: ''
		}
	],
	giftInCreaseNoSUMColumns: [
		{
			slot: 'ECODE',
			key: 'ECODE',
			title: 'SKU编码'
		},
		{
			key: 'ENAME',
			title: '商品名称'
		},
		{
			key: 'NUM',
			title: '每次赠送数量',
		},
		// {
		//     key: "SUM",
		//     title: "赠送总计数量",
		// },
		// {
		//     key: "SUM_QTY",
		//     title: "剩余可送",
		// },
		{
			key: 'SEND_QTY',
			title: '已送数量'
		},
		{
			key: 'ORDER',
			title: '顺序号',
		},
		{
			key: 'OPERATE',
			title: $i18n.t('table_label.operation'), // 操作
			fun: ''
		}
	],
	productsColumns: [// 批量新增商品列表
		{
			slot: 'ECODE',
			key: 'ECODE',
			title: 'SKU编码'
		},
		{
			key: 'ENAME',
			title: '商品名称'
		},
		{
			slot: 'NUM',
			key: 'NUM',
			title: '数量'
		},
		{
			slot: 'OPERATE',
			key: 'OPERATE',
			title: $i18n.t('table_label.operation'), // 操作
			fun: ''
		}
	],
	productsColumnsxt: [// 批量新增商品列表
		{
			slot: 'ECODE',
			key: 'ECODE',
			title: '商品编码'
		},
		{
			key: 'ENAME',
			title: '商品名称'
		},
		{
			slot: 'NUM',
			key: 'NUM',
			title: '数量'
		},
		{
			slot: 'OPERATE',
			key: 'OPERATE',
			title: $i18n.t('table_label.operation'), // 操作
			fun: ''
		}
	],
	productsColumnspt: [// 批量新增商品列表
		{
			slot: 'ECODE',
			key: 'ECODE',
			title: '商品数据编号'
		},
		{
			key: 'ENAME',
			title: '商品标题'
		},
		{
			slot: 'NUM',
			key: 'NUM',
			title: '数量'
		},
		{
			slot: 'OPERATE',
			key: 'OPERATE',
			title: $i18n.t('table_label.operation'), // 操作
			fun: ''
		}
	],
	giftColumns: [// 批量新增赠品列表
		{
			slot: 'ECODE',
			key: 'ECODE',
			title: 'SKU编码'
		},
		{
			key: 'ENAME',
			title: '商品名称'
		},
		{
			slot: 'NUM',
			key: 'NUM',
			title: '每次赠送数量',
		},
		{
			slot: 'SUM',
			key: 'SUM',
			title: '赠送总计数量',
		},
		{
			key: 'SUM_QTY',
			title: '剩余可送',
		},
		{
			key: 'SEND_QTY',
			title: '已送数量'
		},
		{
			slot: 'OPERATE',
			key: 'OPERATE',
			title: $i18n.t('table_label.operation'), // 操作
			fun: ''
		}
	],
	products_columns: [// 模拟仿真商品列表
		{
			align: 'center',
			slot: 'ECODE',
			key: 'ECODE',
			title: 'SKU编码'
		},
		{
			align: 'center',
			key: 'PRO_ECODE',
			title: '商品编码'
		},
		{
			align: 'center',
			key: 'ENAME',
			title: '商品名称'
		},
		{
			align: 'center',
			key: 'SG_PRO_ID',
			title: '平台款号ID'
		},
		{
			align: 'center',
			key: 'SKU_ID',
			title: '平台条码ID'
		},
		{
			align: 'center',
			key: 'NUM',
			title: '数量'
		},
		{
			align: 'center',
			key: 'SUM',
			title: '成交单价'
		},
		{
			align: 'center',
			key: 'ALLSUM',
			title: '成交金额'
		},
		{
			align: 'center',
			key: 'OPERATE',
			title: $i18n.t('table_label.operation'), // 操作
			fun: ''
		}
	],
	result_columns: [// 模拟仿真试算列表
		{
			key: 'actiName',
			title: '促销名称'
		},
		{
			key: 'ECODE',
			title: '赠品商品编码'
		},
		{
			key: 'ENAME',
			title: '赠送商品名称'
		},
		{
			key: 'NUM',
			title: '数量'
		}
	],
	set_commodity: [
		{
			// slot: "ECODE",
			key: 'ECODE',
			title: 'SKU编码',
			hideSku: true
		},
		{
			key: 'ENAME',
			title: '商品名称'
		},
		{
			slot: 'SUM',
			key: 'SUM',
			title: '赠送总计数量',
		},
		{
			key: 'SUM_QTY',
			title: '剩余可送',
		}
	]

};

export {
	tableCols,
	diStatusArr,
	logDataCol,
	baseColumnDefs,
}
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
		// headerName: $it("tL.serialNo"),
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
		// headerName: $it("tL.serialNo"),
		field: 'ACTI_NO'
	},
	{
		headerName: '活动名称',
		// headerName: $it("fL.activityName"),
		field: 'ACTI_NAME'
	},
	{
		headerName: '参与店铺',
		// headerName: $it("tL.participating_store"),
		field: 'STORE_NAMES'
	},
	{
		headerName: '活动时间段',
		// headerName: $it("tL.activity_period"),
		field: 'ACTI_DATE'
	},
	{
		headerName: '失效下线时间',
		// headerName: $it("tL.failure_offline_time"),
		field: 'DOWN_TIME'
	},
	{
		headerName: '剩余可送',
		// headerName: $it("tL.rest_sent"),
		field: 'STOCK'
	},
	{
		headerName: '已送数量',
		// headerName: $it("tL.delivered_quantity"),
		field: 'SEND'
	},
	{
		headerName: '状态',
		// headerName: $it("tL.status"),
		field: 'status'
	},
	{
		headerName: '分组名称',
		// headerName: $it("tL.groupName"),
		field: 'GROUP_NAME'
	},
	{
		headerName: '优先级',
		// headerName: $it("tL.priority"),
		field: 'LEVEL'
	},
	{
		headerName: '创建人',
		// headerName: $it("tL.creator"),
		field: 'OWNERENAME'
	},
	{
		headerName: '创建时间',
		// headerName: $it("tL.creationTime"),
		field: 'CREATIONDATE'
	},
	{
		headerName: '修改人',
		// headerName: $it("tL.reviser"),
		field: 'OWNERENAME'
	},
	{
		headerName: '修改时间',
		// headerName: $it("tL.modificationTime"),
		field: 'MODIFIEDDATE'
	},
	{
		headerName: '备注',
		// headerName: $it("tL.remarks"),
		field: 'REMARK'
	},
	{
		headerName: $it('tL.operation'), // 操作
		// headerName: $it("tL.operation"),
		field: 'ACTION_LOG'
	}
];
const logDataCol = [
	{
		// title: "序号",
		title: $it('tL.serialNo'),
		type: 'index',
		width: 60,
		align: 'center'
	},
	{
		// title: "操作时间",
		title: $it('tL.operatorTime'),
		key: 'creationdate'
	},
	{
		// title: "操作人",
		title: $it('fL.operator'),
		key: 'operator'
	},
	{
		// title: "操作描述",
		title: $it('tL.operation_description'),
		key: 'describes'
	}
];
const diStatusArr = [
	{
		value: 1,
		label: $it('btn.draft') // 草稿
	},
	{
		value: 2,
		label: $it('btn.published') // 已发布
	},
	{
		value: 3,
		label: $it('btn.offline') // 下线
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
			title: $it('tL.operation'), // 操作
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
			title: $it('tL.operation'), // 操作
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
			title: $it('tL.operation'), // 操作
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
			title: $it('tL.operation'), // 操作
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
			title: $it('tL.operation'), // 操作
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
			title: $it('tL.operation'), // 操作
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
			title: $it('tL.operation'), // 操作
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
			title: $it('tL.operation'), // 操作
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
			title: $it('tL.operation'), // 操作
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
			title: $it('tL.operation'), // 操作
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
			title: $it('tL.operation'), // 操作
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
			title: $it('tL.operation'), // 操作
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
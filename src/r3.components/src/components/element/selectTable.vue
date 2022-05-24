<template>
<div class="select-table" :class="tableName">
	<div class="left">
		<table class="left-thead">
			<tr>
				<th>
					{{$t('table.index')}}
				</th>
			</tr>
		</table>
		<table class="left-tbody">
			<tr v-for="(item, index) in tableRows" :key="item.ID.val">
				<th>
					<label @click="chooseItem($event,index)"><input name="orderNumber" type="radio" /> {{start + index + 1}}</label>
				</th>
			</tr>
		</table>
	</div>
	<div class="table-component">
				
		<div class="right">
			<table class="thead">
				<thead>
					<tr>
						<!-- <th>
							编号
						</th> -->
						<th v-for="(item, index) in thead" :key="item.name + index" v-if="item.name !== 'ID'">
							{{item.name}}
						</th>
					</tr>
				</thead>
			</table>

			<table class="tbody">
				<tbody>
					<tr v-for="(row, index) in tableRows" :key="row.ID.val + index">
						<!-- <td>
							<label><input name="SelectRadio" type="radio" value="" /></label>
						</td> -->
						<td v-for="(td, index) in thead" :key="td.name + index" v-if="td.name !== 'ID'">
							{{row[td.colname].val}}
						</td>
					</tr>
				</tbody>
			</table>
		</div>
		
  </div>
</div>
  
</template>

<script>
// import i18n from '../../assets/js/i18n'

export default {
  name: 'selectTable',
	props: {
		thead: {
			type: Array
		},
		"tableRows": {
			type: Array
		},
		tableName: {
			type: String
		},
		start: {
			type: Number
		}
	},
	data () {
		return {
			radio: ''
		}
	},

	beforeCreate() {
		// this.$t = i18n.t.bind(i18n)
	},

	mounted () {
		
		//监听  scroll
		$('.'+ this.tableName + ' table.tbody').scroll(function(event){   
			let left = event.currentTarget.scrollLeft
            let top = event.currentTarget.scrollTop
			event.target,$(event.target).parent().find('table.thead').css('left','-'+left+'px')
			event.target,$(event.target).parent().parent().parent().find('table.left-tbody').css('top','-'+top+'px')
			// $('.dateilTable table:eq(2)').css('left','-'+left+'px')
		})
	},
	updated () {
		let self = this
		setTimeout(function(){
		const scrollWidth = $('.select-table .table-component .right')[0].scrollWidth
		const clientWidth = $('.select-table .table-component .right')[0].clientWidth

		if($('.table-component .table_A thead').width() < clientWidth) {
			$('.table-component .table_A').css('width',clientWidth+'px')
			$('.table-component .table_B').css('width',clientWidth+'px')
		} else {
			$('.table-component .table_A').css('width',$('.table-component .table_A thead').width()+'px')
			$('.table-component .table_B').css('width',$('.table-component .table_B thead').width()+'px')
		}
		
		
		if(scrollWidth > clientWidth && self.tableRows.length > 0) {
			$('.select-table .left-tbody').css('padding-bottom','8px')
		}
		},200)
		
	},
	methods: {
		chooseItem(event,index) {
			console.log('getChooseItem----',this.tableRows[index])
			this.$emit('getChooseItem',this.tableRows[index])
		}
	}
}
</script>

<style lang="less" scoped>
.select-table {
	font-size: 12px;
}
.left {
	float: left;
	border: 1px solid #d8d8d8;
	border-right: 0;
	overflow: hidden;
	.left-thead {
		display: block;
		z-index: 99;
		position: relative;
		background-color: #f5f6fa;
		border-bottom: 1px solid #d8d8d8;
		text-align: center;
		tr {
			th {
				height: 22px;
				line-height: 22px;
				min-width: 50px;
			}
		}
	}
	.left-tbody {
		display: block;
		position: relative;
		max-height: 300px;
		tr {
			border-bottom: 1px solid #d8d8d8;
			th {
				min-width: 60px;
				float: left;
				height: 22px;
				line-height: 22px;
				-webkit-box-sizing: border-box;
				box-sizing: border-box;
				background-color: white;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				color: #575757;
				label {
					min-width: inherit;
				}
			}
		}
	}
	
}
.table-component {
	border: 1px solid #d8d8d8;
	-webkit-box-flex: 1;
	-ms-flex: 1;
	flex: 1;
	height: 100%;
	overflow: hidden;
	display: -webkit-box;
	display: -ms-flexbox;
	display: flex;
	-webkit-box-orient: vertical;
	-webkit-box-direction: normal;
	-ms-flex-direction: column;
	flex-direction: column;
	/*定义滚动条宽高及背景，宽高分别对应横竖滚动条的尺寸*/
    ::-webkit-scrollbar{
        width: 8px;
        height: 8px;
		background-color: #f5f5f5;
		margin-right: 0;
	}
	/*定义滚动条的轨道，内阴影及圆角*/
    ::-webkit-scrollbar-track{
        -webkit-box-shadow: inset 0 0 1px rgba(0,0,0,.3);
        border-radius: 6px;
        background-color: #f5f5f5;
    }
    /*定义滑块，内阴影及圆角*/
    ::-webkit-scrollbar-thumb{
        /*width: 10px;*/
        height: 20px;
        border-radius: 6px;
        -webkit-box-shadow: inset 0 0 1px rgba(0,0,0,.3);
        background-color: #d8d8d8;
    }
	.left {
		float: left;
		width: 80px;
		.left-body {
			tr {
				th {
					width: 60px;
					float: left;
				}
			}
		}
		
	}
	.right {
		float: left;
	}
	.thead {
		display: block;
		width: 100%;
		position: relative;
		thead {
			background-color: #f5f6fa;
      border-bottom: 1px solid #d8d8d8;
			tr {
				th {
					min-width: 112px;
					max-width: 112px;
					height: 22px;
					line-height: 22px;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					color: #575757;
					padding-left: 18px;
					text-align: left;
				}
				th:last-child {
					width: 100%;
				}
			}
		}
	}
	.tbody {
		display: block;
		overflow: auto;
		max-height: 300px;
		tbody {
			tr {
				border-bottom: 1px solid #d8d8d8;
				td {
					min-width: 130px;
					max-width: 130px;
					height: 22px;
					line-height: 22px;
					-webkit-box-sizing: border-box;
					box-sizing: border-box;
					background-color: white;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					color: #575757;
					padding-left: 18px;
    			text-align: left;
				}
				td:last-child {
					width: 100%;
				}
			}
		}
	}
}
</style>



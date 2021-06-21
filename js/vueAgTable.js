/*
 * @Author: your name
 * @Date: 2021-06-21 10:17:52
 * @LastEditTime: 2021-06-21 16:05:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /burgeon-business-components/js/vueAgTable.js
 */
import commonTableByAgGrid from 'libs/@syman/ark-ui-bcl/src/components/common-table-by-ag-grid/CommonTableByAgGrid';
export default {
    name: 'VueAgTable',
    components: {
        commonTableByAgGrid
    },
    props: {
        renderParams: {
            type: Function
        },
        agTableConfig:{
            type:Object,
            default: {}
        }
    },
    data() {
        return {
            options: {
                datas: {
                },
            },
        }
    },
    methods: {
        gridReady() {
            // this.tabth = [];
            // this.row = [];
            console.log(this.tabth);
        },
        tableRowDbclick(data){
            this.$emit('on-row-dblclick' , data.data);
        },
        // 分页change 事件
    pageChange(val) {
        this.$emit('on-page-change', val)
      },
      // 切换分页条数
      onPageSizeChange(val) {
        this.$emit('on-page-size-change', val)
      },
      tableSortChange(e){
        this.$emit('on-sort-changed', e.api.getSortModel())
      }
        // renderParams(cellData) {
        //     if (cellData.field == 'ORDER_TAG') {
        //         return {
        //             renderContainer: 'CellRenderByFunction',
        //             renderComponent: (h, params) => {
        //                 console.log(params);
        //                 return h('div', {
        //                     domProps: {

        //                     }
        //                 },
        //                     params.row.ORDER_TAG.map(item => h('span', {
        //                         domProps: {
        //                             innerText: item.text
        //                         },
        //                         style: {
        //                             border: `1px solid${item.clr}`,
        //                             color: item.clr,
        //                             margin: '0 2px',
        //                             borderRadius: '6px',
        //                             padding: '2px'
        //                         }
        //                     }))
        //                 )
        //             }
        //         }
        //     }
        // },
    }
}
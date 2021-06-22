/*
 * @Author: your name
 * @Date: 2021-06-21 10:17:52
 * @LastEditTime: 2021-06-22 16:13:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /burgeon-business-components/js/vueAgTable.js
 */
import commonTableByAgGrid from 'libs/@syman/ark-ui-bcl/src/components/common-table-by-ag-grid/CommonTableByAgGrid';
export default {
    name: 'businessAgTable',
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
        },
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
      tableSelectedChange(data){
          this.$emit('on-selection-change' , data);
      }
    }
}
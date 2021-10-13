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
        agTableConfig:{
            type:Object,
            default: {}
        },
        options:{
            type:Object,
            default:{
                datas: {}
            }
        }
    },
    data() {
        return {
            vmI18n: i18n,
        }
    },
    methods: {
        gridReady() {
            // this.tabth = [];
            // this.row = [];
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
        },
        colPinned(data){
            this.$emit('on-column-pinned' , data);
        },
        colSortChange(data){
            this.$emit('on-sort-change' , data);
        },
        colMoved: _.debounce(async function () {
            const self = this;
            const {api, columnApi} = self.$refs.agGrid;
            const colData = columnApi.getAllGridColumns()
            this.$emit('on-column-moved' , colData);
        }, 1000),
    }
}
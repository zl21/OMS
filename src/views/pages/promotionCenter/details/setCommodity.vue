<!-- 设置商品池 -->
<template>
<div v-if="dialog_visible" class="setCommodity">
    <my-dialog
    :visible.sync="dialog_visible"
    title="商品池设置"
    @MyDialogClose = "closeDialogs"
     class="dialog-div"
    width="70%">
       <div class="tableBox">
           <detailtable
            :tColumns="columns"
            :tData="commodityList.data"
            :total="commodityList.total"
            :current="commodityList.current"
            :pageSize="commodityList.pageSize"
             @on-page-change="pageChange"
            @on-page-size-change="onPageSizeChange"
            @alertRowData="alertRowData"
           ></detailtable>
       </div>
        <div class="footer">
            <button class="active" v-show="!(objid > 0 && (basicData.status === '2' || basicData.status ==='3'))" @click="confirm" >保存</button>
            <button class="white" @click="closeDialogs" >取 消</button>
        </div>
    </my-dialog>
</div>
</template>
<script>
import detailtable from "./table.vue";
import tableCols from "@/assets/js/promotion/columns.js";
import MyDialog from 'framework/components/dialog/mydialog'
 export default {
     name:"dialogVisiblex",
     data(){
         return{
           tableCols: tableCols,
           commodityList:{
                current: 1,
                total: 0,
                pageSize: 10,
                data: []
           }
         }
     },
    props:{
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
        objid:{
        type: String
        },
        loadDis: {
        type: Boolean,
        default: false
        },
    },
    components: {
        detailtable,
        MyDialog
    },
    computed:{
        columns() {
            return this.tableCols.set_commodity;
        },
    },
    watch:{
        loadDis: function(val) {
            if (val === true) {
                this.commodityList.data = []
                this.initView();
            }
         }
    },
    mounted(){
    },
    created(){
    },
    activated(){

    },
    methods:{
        /**
         * 根据数据源 真实展示数据
         */
        initView() {
            let obj = {
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
        confirm(){
            this.$emit('confirm')
        },
        closeDialogs(){
            this.$emit('closeDialog')
        },
        /*** 根据当前页和当前页数目 ，展示表格
         * @row 原始表格数据
         * @obj 表格虚拟视图
         */
        tablelistView(rows, obj) {
        let current = obj.current || 1;
        let pageSize = obj.pageSize || 10;
        let start = Number((current - 1) * pageSize);
        let end = Number(current * pageSize);
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
        let rows = this.giftData.gift_commoditylist || [];
        let obj = this.commodityList;
        let pageSize = obj.pageSize || 10;
        let pagesLen = Math.ceil(rows.length / pageSize);
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
        alertRowData(row, currentPage, pageSize, force) {
        let rowCount = (currentPage - 1) * pageSize;
        let index = rowCount + row._index;
        if (index >= 0 && !(this.objid > 0 && (this.basicData.status === '2' || this.basicData.status ==='3'))) {
            this.giftData.gift_commoditylist[index].SUM_QTY = this.giftData.gift_commoditylist[index].SUM  = row.SUM
            this.commodityList.data[row._index].SUM_QTY = row.SUM
        }
        },
    }
 }
</script>
<style lang="less" type="text/less">
.setCommodity{
    .page-allSizes{
        line-height: 28px;
    }
    .el-dialog .el-dialog__body{
        padding:20px 20px 0;
    }
    
    
}
</style>
<style lang="less" type="text/less">
.dialog-div{
    .el-dialog__body{
        padding:20px!important;
    }
    .my-dialog{
        width:60%;
    }
        .footer{
            text-align: right;
            position:absolute;
            right:14px;bottom:20px;
            button{
                height: 24px;
                min-width: 50px;
                line-height: 24px;
                padding: 0 8px;
                border: 1px solid #fd6442;
                font-size: 12px;
                background: #fff;
                color: #fd6442;
                border-radius: 2px;
                margin-right: 5px;
            }
            .active{
                background: #fd6442;
                color: #fff;
                margin-right: 8px;
            }
            .white{

            }
        }
    }
</style>
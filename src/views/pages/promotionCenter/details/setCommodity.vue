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
  import setCommodity from '@/js/pages/promotionCenter/details/setCommodity.js';
  export default setCommodity;
</script>
<style lang="less" scoped>
  @import "~@/css/pages/promotionCenter/details/setCommodity.less";
</style>
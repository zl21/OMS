<!-- 设置商品池 -->
<template>
  <div
    v-if="dialog_visible"
    class="setCommodity"
  >
    <!-- <my-dialog
      :visible.sync="dialog_visible"
      title="商品池设置"
      class="setCommodityModal"
      width="70%"
      @MyDialogClose="closeDialogs"
    > -->
    <Modal
        v-model="dialog_visible"
        title="商品池设置"
        mask
        class-name='setCommodityModal'
        width="70%">
      <div class="tableBox">
        <detailtable
          :t-columns="columns"
          :t-data="commodityList.data"
          :total="commodityList.total"
          :current="commodityList.current"
          :page-size="commodityList.pageSize"
          @on-page-change="pageChange"
          @on-page-size-change="onPageSizeChange"
          @alertRowData="alertRowData"
        />
      </div>
      <div slot="footer" class="modal_footer">
        <businessButton :btn-config="btnConfig" />
      </div>
    </Modal>
    <!-- </my-dialog> -->
  </div>
</template>
<script>
  import setCommodity from '@/js/pages/promotionCenter/details/setCommodity';

  export default setCommodity;
</script>

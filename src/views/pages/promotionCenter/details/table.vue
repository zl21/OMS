<!--商品列表-->
<template>
  <div class="detailtable">
    <slot name="action" />
    <Table
      ref="table"
      :columns="columns"
      :data="tData"
      border
      :height="height"
    >
      <!-- 定义slot部分 -->
      <template
        slot="ECODE"
        slot-scope="{ row }"
      >
        <TableSku
          :itemdata="itemdata"
          :row="row"
          @getFilterChooseItem="getFilterChooseItem"
          @clearFilterChooseItem="clearFilterChooseItem"
        />
      </template>
    </Table>
    <div class="page-box">
      <div class="page-box-left">
        <div
          v-show="pageShow"
          class="page_content"
        >
          <p class="page-allSizes">
            共 {{ total }} 条
          </p>
          <Page
            class="page-pages"
            size="small"
            :total="total"
            :current="current"
            :page-size="pageSize"
            :page-size-opts="pageSizeOpts"
            :styles="styles"
            show-elevator
            show-sizer
            :transfer="true"
            @on-change="pageChange"
            @on-page-size-change="onPageSizeChange"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import table from '@/js/pages/promotionCenter/details/table';

  export default table;
</script>
<style lang="less" scoped>
@import "~@/css/pages/promotionCenter/details/table.less";
</style>

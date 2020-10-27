<!--商品列表-->
<template>
  <div class="detailtable">
    <slot name="action"></slot>
    <Table :columns="columns" ref="table" :data="tData" border :height="height">
      <!-- 定义slot部分 -->
      <template slot-scope="{ row, index }" slot="ECODE">
        <TableSku :itemdata="itemdata" :row="row" @getFilterChooseItem="getFilterChooseItem" @clearFilterChooseItem="clearFilterChooseItem"></TableSku>
      </template>
    </Table>
    <div class="page-box">
      <div class="page-box-left">
        <div class="page_content" v-show="pageShow">
          <p class="page-allSizes">共 {{total}} 条</p>
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
  import table from "@/js/pages/promotionCenter/details/table.js";
  export default table;
</script>
<style lang="less" scoped>
@fontSize: 12px;
@inputWidth: 300px;
@lineHeight: 24px;
.detailtable {
  .page-box {
    margin-top: 5px;
    .page_content {
      display: flex;
      .page-allSizes {
        padding-right: 10px;
      }
    }
  }

  .burgeon-table-cell .burgeon-table-cell-ellipsis {
    input {
      width: 90px;
    }
  }
}
</style>


<template>
  <div
    class="stockOutWarehouse_box"
    style="width: 400px; padding-right: 20px"
  >
    <!-- 修改仓库 -->
    <div class="stockOutWarehouse">
      <!-- <label>修改仓库:</label> -->
      <label>{{ vmI18n.t("btn.modifyWarehouse") }}:</label>
      <DropDownSelectFilter
        style="width: 80%"
        :single="true"
        :data="foreignKeyLink"
        :z-index="2500"
        :total-row-count="totalRowCount"
        :page-size="pageSize"
        :show-colname-key="'show'"
        :data-empty-message="dataEmptyMessage"
        :columns="columns"
        :auto-data="AutoData"
        @on-page-change="changePage"
        @on-fkrp-selected="onFkrpSelected"
      />
    </div>
    <jordanBtn
      :btn-config="btnConfig"
      style="margin-top: 10px"
    />
  </div>
</template>
<script>
  import modifyWarehouse from '@/js/modal/orderCenter/modifyWarehouse';

  export default modifyWarehouse;
</script>
<style  lang='less'>
  @import "~@/css/modal/orderCenter/modifyWarehouse.less";
</style>

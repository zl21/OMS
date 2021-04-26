<template>
  <div
    class="semiCustomModal"
    style="width: 400px;"
  >
    <div class="Modal-Form">
      <div class="Modal-Form-Item">
        <!-- 修改仓库 -->
        <label>{{ vmI18n.t("btn.modifyWarehouse") }}:</label>
        <DropDownSelectFilter
          :single="true"
          :data="foreignKeyLink"
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
    </div>
    <businessButton :btn-config="btnConfig" />
  </div>
</template>
<script>
  import modifyWarehouse from '@/js/modal/orderCenter/modifyWarehouse';

  export default modifyWarehouse;
</script>
<style  lang='less'>
  @import "~@/css/modal/orderCenter/modifyWarehouse.less";
</style>

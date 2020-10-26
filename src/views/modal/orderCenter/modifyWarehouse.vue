<template>
  <div class="stockOutWarehouse_box" style="width: 400px; padding-right: 20px">
    <!-- 修改仓库 -->
    <div class="stockOutWarehouse">
      <!-- <label>修改仓库:</label> -->
      <label>{{ vmI18n.t("btn.modifyWarehouse") }}:</label>
      <DropDownSelectFilter
        style="width: 80%"
        :single="true"
        :data="foreignKeyLink"
        :zIndex="2500"
        :totalRowCount="totalRowCount"
        :pageSize="pageSize"
        :showColnameKey="'show'"
        @on-page-change="changePage"
        :dataEmptyMessage="dataEmptyMessage"
        :columns="columns"
        :AutoData="AutoData"
        @on-fkrp-selected="onFkrpSelected"
      ></DropDownSelectFilter>
    </div>
    <jordanBtn :btnConfig="btnConfig" style="margin-top: 10px"></jordanBtn>
  </div>
</template>
<script>
  import modifyWarehouse from "@/js/modal/orderCenter/modifyWarehouse";
  export default modifyWarehouse;
</script>
<style  lang='less'>
  @import "~@/css/modal/orderCenter/modifyWarehouse.less";
</style>

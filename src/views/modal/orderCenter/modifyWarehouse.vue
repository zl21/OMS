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
.stockOutWarehouse_box {
  .stockOutWarehouse {
    box-sizing: border-box;
    label {
      width: 80px;
      margin-right: 10px;
      display: flex;
      justify-content: flex-end;
    }
    #dropDownSelectFilter {
      box-sizing: border-box;
      .burgeon-select {
        box-sizing: border-box;
        input {
          box-sizing: border-box;
        }
      }
    }
  }

  .stockOutWarehouse {
    .label {
      margin-right: 10px;
    }
    display: flex;
    align-items: center;
    html *,
    :after,
    :before {
      box-sizing: border-box !important;
    }
  }
}
</style>

<template>
  <div class="jordanModal">
    <!-- 修改仓库 -->
    <div
      v-show="isShowFromLoading"
      class="order_warehouse_loading"
    >
      <Spin />
    </div>
    <div class="jordanModal_box">
      <!-- <label for>修改仓库:</label> -->
      <label for>{{ vmI18n.t("btn.modifyWarehouse") }}:</label>
      <DropDownSelectFilter
        style="width: 250px"
        :single="true"
        :data="foreignKeyLink"
        :z-index="zIndex"
        :total-row-count="totalRowCount"
        :page-size="pageSize"
        :show-colname-key="'show'"
        :data-empty-message="dataEmptyMessage"
        :columns="columns"
        :auto-data="AutoData"
        :hidecolumns="hidecolumns"
        @on-page-change="changePage"
        @on-fkrp-selected="onFkrpSelected"
        @on-input-value-change="inputValueChange"
      />
    </div>
    <div class="jordanModal-input-box">
      <!-- <label for>改仓原因:</label> -->
      <label for>{{ vmI18n.t("form_label.changeWarehouse_reasons") }}:</label>
      <!-- <Input class="jordanModal-input" v-model="updateRemark" /> -->
      <Select
        v-model="updateRemark"
        class="jordanModal-input"
        style="width: 200px"
      >
        <Option
          v-for="item in updateRemarkOptions"
          :key="item.value"
          :value="item.value"
        >
          {{ item.label }}
        </Option>
      </Select>
    </div>
    <jordanBtn
      :btn-config="btnConfig"
      style="margin-top: 10px"
    />
  </div>
</template>
<script>
  import changeWarehouse from '@/js/modal/orderCenter/changeWarehouse';

  export default changeWarehouse;
</script>
<style scoped lang='less'>
  @import "~@/css/modal/orderCenter/changeWarehouse.less";
</style>

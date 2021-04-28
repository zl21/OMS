<template>
  <div class="semiCustomModal customized-modal">
    <!-- 修改仓库 -->
    <div v-show="isShowFromLoading" class="order_warehouse_loading">
      <Spin />
    </div>
    <div class="Modal-Form">
      <div class="Modal-Form-Item">
        <!-- 修改仓库-->
        <label for>{{ vmI18n.t("btn.modifyWarehouse") }}:</label>
        <DropDownSelectFilter
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
      <!-- 修改仓库-->
      <!-- <div class="Modal-Form-Item">
        <label for>{{ vmI18n.t('form_label.changeWarehouse_reasons') }}:</label>
        <Select 
          v-model="updateRemark" 
        >
          <Option
            v-for="item in updateRemarkOptions"
            :key="item.value"
            :value="item.value"
          >
            {{ item.label }}
          </Option>
        </Select>
      </div> -->
    </div>
    <businessButton :btn-config="btnConfig" class="modal-footer" />
  </div>
</template>
<script>
import changeWarehouse from "@/js/modal/orderCenter/changeWarehouse";

export default changeWarehouse;
</script>
<style scoped lang='less'>
@import "~@/css/modal/orderCenter/changeWarehouse.less";
.semiCustomModal {
  min-height: initial;
}
</style>

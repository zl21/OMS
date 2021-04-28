<template>
  <div class="jordanModal customized-modal">
    <!-- 修改物流 -->
    <!-- <businessForm style="margin-top:10px;" :formConfig="formConfig"></businessForm> -->
    <div class="jordanModal_box">
      <!-- <label for>物流公司:</label> -->
      <label for>{{ vmI18n.t("form_label.logisticsCompany") }}:</label>
      <DropDownSelectFilter
        style="width: 285px"
        :single="true"
        :data="foreignKeyLink"
        :z-index="zIndex"
        :total-row-count="totalRowCount"
        :page-size="pageSize"
        :show-colname-key="'show'"
        :data-empty-message="dataEmptyMessage"
        :columns="columns"
        :auto-data="AutoData"
        :disabled="logisticsFlag"
        @on-page-change="changePage"
        @on-fkrp-selected="onFkrpSelected"
      />
    </div>
    <div v-if="type == 'EXPRESSCODE'" class="jordanModal_box">
      <!-- <label for>物流单号:</label> -->
      <label for>{{ vmI18n.t("form_label.logisticsOrder_No") }}:</label>
      <Input
        v-model="expressCode"
        style="width: 285px"
        :disabled="expressCodeFlag"
      />
    </div>
    <businessButton :btn-config="btnConfig" class="modal-footer" />
  </div>
</template>
<script>
import modifyLogistics from "@/js/modal/orderCenter/modifyLogistics";

export default modifyLogistics;
</script>

<style scoped lang='less'>
@import "~@/css/modal/orderCenter/modifyLogistics.less";
.jordanModal {
  min-height: initial;
}
</style>

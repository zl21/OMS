<template>
  <div class="jordanModal">
    <!-- 修改物流 -->
    <!-- <businessForm style="margin-top:10px;" :formConfig="formConfig"></businessForm> -->
    <div class="jordanModal_box">
      <!-- <label for>物流公司:</label> -->
      <label for>{{ vmI18n.t("form_label.logisticsCompany") }}:</label>
      <DropDownSelectFilter
        style="width: 250px"
        :single="true"
        :data="foreignKeyLink"
        :zIndex="zIndex"
        :totalRowCount="totalRowCount"
        :pageSize="pageSize"
        :showColnameKey="'show'"
        @on-page-change="changePage"
        :dataEmptyMessage="dataEmptyMessage"
        :columns="columns"
        :AutoData="AutoData"
        :disabled="logisticsFlag"
        @on-fkrp-selected="onFkrpSelected"
      ></DropDownSelectFilter>
    </div>
    <div class="jordanModal_box" v-if="type == 'EXPRESSCODE'">
      <!-- <label for>物流单号:</label> -->
      <label for>{{ vmI18n.t("form_label.logisticsOrder_No") }}:</label>
      <Input
        style="width: 250px"
        v-model="expressCode"
        :disabled="expressCodeFlag"
      />
    </div>

    <jordanBtn :btnConfig="btnConfig" style="margin-top: 10px"></jordanBtn>
  </div>
</template>
<script>
  import modifyLogistics from "@/js/modal/orderCenter/modifyLogistics";
  export default modifyLogistics;
</script>

<style scoped lang='less'>
  @import "~@/css/modal/orderCenter/modifyLogistics.less";
</style>

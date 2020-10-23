<template>
  <div class="jordanModal">
    <!-- 修改仓库 -->
    <div class="order_warehouse_loading" v-show="isShowFromLoading">
      <Spin></Spin>
    </div>
    <div class="jordanModal_box">
      <!-- <label for>修改仓库:</label> -->
      <label for>{{ vmI18n.t("btn.modifyWarehouse") }}:</label>
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
        :hidecolumns="hidecolumns"
        @on-fkrp-selected="onFkrpSelected"
        @on-input-value-change="inputValueChange"
      ></DropDownSelectFilter>
    </div>
    <div class="jordanModal-input-box">
      <!-- <label for>改仓原因:</label> -->
      <label for>{{ vmI18n.t("form_label.changeWarehouse_reasons") }}:</label>
      <!-- <Input class="jordanModal-input" v-model="updateRemark" /> -->
      <Select
        class="jordanModal-input"
        v-model="updateRemark"
        style="width: 200px"
      >
        <Option
          v-for="item in updateRemarkOptions"
          :value="item.value"
          :key="item.value"
          >{{ item.label }}</Option
        >
      </Select>
    </div>
    <jordanBtn :btnConfig="btnConfig" style="margin-top: 10px"></jordanBtn>
  </div>
</template>
<script>
  import changeWarehouse from "@/js/modal/orderCenter/changeWarehouse";
  export default changeWarehouse;
</script>
<style scoped lang='less'>
.jordanModal {
  width: 380px;
  .jordanModal_box {
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
  .header {
    background-color: #eee;
    color: black;
    font-size: 13px;
  }
  .footer {
    width: 100%;
    margin-top: 20px;
  }
  .order_warehouse_loading {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(255, 255, 255, 0.7);
    z-index: 1000 !important;
  }
  .jordanModal-input-box {
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin-top: 10px;
    .jordanModal-input {
      width: 250px !important;
    }
  }
  // 修改按钮白色字体问题
  /deep/ .one_button {
    > div:last-child {
      span {
        color: #333333 !important;
      }
    }
  }
}
</style>

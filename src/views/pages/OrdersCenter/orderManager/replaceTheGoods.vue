<template>
  <div>
    <div class="order-change-detail">
      <ul>
        <li v-for="(list, index) of queryList" :key="index">
          <label>{{ list.label }}</label>
          <Input
            placeholder
            v-model.trim="queryParams[list.column]"
            @on-enter="search"
          ></Input>
        </li>
      </ul>
      <input v-focus id="focus" class="focusStyle" />
    </div>
    <div>
      <businessButton :btnConfig="btnConfig"></businessButton>
    </div>
    <div>
      <businessActionTable
        :jordanTableConfig="tableConfig"
        @on-select="onSelect"
        @on-select-cancel="onSelectCancel"
        @on-select-all="onSelectAll"
        @on-select-all-cancel="onSelectAllCancel"
        @on-row-click="onRowClick"
        @on-row-dblclick="onRowDblclick"
        @table-delete-detail="tableDeleteDetail"
        @on-page-change="pageChange"
        @on-page-size-change="pageSizeChange"
      ></businessActionTable>
    </div>
    <div class="order-footer">
      <businessButton :btnConfig="btnConfig2"></businessButton>
    </div>
  </div>
</template>

<script>
import replaceTheGoods from "@/js/pages/orderCenter/orderManager/replaceTheGoods";
export default replaceTheGoods;
</script>

<style lang="less" scoped>
.order-change-detail {
  position: relative;
  overflow: auto;
  ul {
    li {
      line-height: 16px;
      vertical-align: middle;
      padding: 5px;
      float: left;
      width: 30%;
      display: flex;
      label {
        min-width: 60px;
        text-align: right;
        margin: 5px;
      }
      p {
        margin-left: 10px;
      }
    }
  }
}
.focusStyle {
  margin-top: -40px;
  z-index: -1;
  opacity: 0;
}
.order-footer {
  margin-top: 10px;
}
</style>

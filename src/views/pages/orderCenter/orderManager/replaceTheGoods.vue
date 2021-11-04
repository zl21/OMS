<template>
  <div>
    <div class="order-change-detail">
      <ul>
        <li
          v-for="(list, index) of queryList"
          :key="index"
        >
          <label>{{ list.label }}</label>
          <Input
            v-model.trim="queryParams[list.column]"
            placeholder
            @on-enter="search"
          /></Input>
        </li>
      </ul>
      <input
        id="focus"
        v-focus
        class="focusStyle"
      >
    </div>
    <div>
      <businessButton :btn-config="btnConfig" />
    </div>
    <div>
      <businessActionTable
        :jordan-table-config="tableConfig"
        @on-select="onSelect"
        @on-select-cancel="onSelectCancel"
        @on-select-all="onSelectAll"
        @on-select-all-cancel="onSelectAllCancel"
        @on-row-click="onRowClick"
        @on-row-dblclick="onRowDblclick"
        @table-delete-detail="tableDeleteDetail"
        @on-page-change="pageChange"
        @on-page-size-change="pageSizeChange"
      />
    </div>
    <div class="order-footer">
      <businessButton :btn-config="btnConfig2" />
    </div>
  </div>
</template>

<script>
  import replaceTheGoods from '@/js/pages/orderCenter/orderManager/replaceTheGoods';

  export default replaceTheGoods;
</script>

<style lang="less" scoped>
@import "~@/css/pages/orderCenter/orderManager/replaceTheGoods.less";
</style>

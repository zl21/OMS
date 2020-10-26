<!--增加赠品-->
<template>
  <div>
    <EasyMatrix :componentData="matrixData"></EasyMatrix>
    <businessActionTable
      :jordanTableConfig="tableConfig"
      @on-select="onSelect"
      @on-select-cancel="onSelectCancel"
      @on-select-all="onSelectAll"
      @on-select-all-cancel="onSelectAllCancel"
      @on-row-click="onRowClick"
      @on-row-dblclick="onRowDblclick"
    ></businessActionTable>
    <input v-focus id="focus" class="focusStyle" />
    <div class="order-footer">
      <businessButton :btnConfig="btnConfig"></businessButton>
    </div>
  </div>
</template>

<script>
  import addGifts from "@/js/modal/orderCenter/addGifts";
  export default addGifts;
</script>
<style lang="less" scoped>
  @import "~@/css/modal/orderCenter/addGifts.less";
</style>



<!--增加赠品-->
<template>
  <div>
    <EasyMatrix :component-data="matrixData" />
    <OmsTable
      :jordan-table-config="tableConfig"
      @on-select="onSelect"
      @on-select-cancel="onSelectCancel"
      @on-select-all="onSelectAll"
      @on-select-all-cancel="onSelectAllCancel"
      @on-row-click="onRowClick"
      @on-row-dblclick="onRowDblclick"
    />
    <input
      id="focus"
      v-focus
      class="focusStyle"
    >
    <businessButton :btn-config="btnConfig" />
  </div>
</template>

<script>
  import addGifts from '@/js/modal/orderCenter/addGifts';

  export default addGifts;
</script>
<style lang="less" scoped>
  @import "~@/css/modal/orderCenter/addGifts.less";
</style>

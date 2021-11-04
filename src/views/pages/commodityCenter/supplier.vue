<template>
  <div class="supplier">
    <div class="supplier_header">
      <span>供应商名称</span>
      <businessButton :btn-config="btnConfig" />
    </div>
    <div class="supplier_body">
      <Table :columns="columns" :data="resData.supplier.data" @on-selection-change="onSelectionChange" />
    </div>
  </div>
</template>

<script>
import supplier from '@/js/pages/commodityCenter/supplier.js';
export default supplier;
</script>

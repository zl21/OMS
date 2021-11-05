<template>
  <div class="productSpecification">
    <div class="productSpecification_button">
      <OmsButton :btn-config="btnConfig" />
    </div>
    <div class="productSpecification_table">
      <Table :columns="columns" :data="resData" @on-selection-change="onSelectionChange" @on-column-click="onColumnClick" />
    </div>
  </div>
</template>

<script>
import productSpecification from '@/js/pages/commodityCenter/productSpecification.js';
export default productSpecification;
</script>


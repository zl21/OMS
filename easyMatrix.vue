<!--简单矩阵，模糊匹配商品SKU-->
<template>
  <div v-loading="pageLoad">
    <businessForm :formConfig="formConfig"></businessForm>
  </div>
</template>

<script>
import easyMatrix from './js/easyMatrix.js';
export default easyMatrix;
</script>

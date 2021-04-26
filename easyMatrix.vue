<!--简单矩阵，模糊匹配商品SKU-->
<template>
  <div v-loading="pageLoad">
    <jordanForm :formConfig="formConfig"></jordanForm>
  </div>
</template>

<script>
import easyMatrix from './js/easyMatrix.js';
export default easyMatrix;
</script>

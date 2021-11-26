<!--
 * @Author: your name
 * @Date: 2021-11-01 15:07:28
 * @LastEditTime: 2021-11-02 17:59:33
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /burgeon-business-components/src/view/easyMatrix.vue
-->
<!--简单矩阵，模糊匹配商品SKU-->
<template>
  <div v-loading="pageLoad">
    <OmsForm :formConfig="formConfig"></OmsForm>
  </div>
</template>

<script>
import EasyMatrix from 'burgeonComponents/js/EasyMatrix.js';
export default EasyMatrix;
</script>

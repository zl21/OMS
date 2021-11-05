<!--
 * @Author: your name
 * @Date: 2021-05-19 17:55:24
 * @LastEditTime: 2021-06-03 10:23:20
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /burgeon-project-logic/views/modal/orderCenter/modifyWarehouse.vue
-->
<template>
  <!-- 修改仓库 -->
  <div
    class="customized-modal"
    style="width: 400px;"
  >
    <businessForm :form-config="formConfig"></businessForm>
    <OmsButton :btn-config="btnConfig" class="modal-footer"/>
  </div>
</template>
<script>
  import modifyWarehouse from '@/js/modal/orderCenter/modifyWarehouse';

  export default modifyWarehouse;
</script>
<style  lang='less'>
  // @import "~@/css/modal/orderCenter/modifyWarehouse.less";
</style>

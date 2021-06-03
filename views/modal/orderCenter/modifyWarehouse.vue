<!--
 * @Author: your name
 * @Date: 2021-05-19 17:55:24
 * @LastEditTime: 2021-06-03 10:23:20
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /burgeon-project-logic/views/modal/orderCenter/modifyWarehouse.vue
-->
<template>
  <div
    class="semiCustomModal"
    style="width: 400px;"
  >
    <div class="Modal-Form">
      <div class="Modal-Form-Item">
        <!-- 修改仓库 -->
        <businessForm :form-config="formConfig"></businessForm>
      </div>
    </div>
    <businessButton :btn-config="btnConfig" />
  </div>
</template>
<script>
  import modifyWarehouse from '@/js/modal/orderCenter/modifyWarehouse';

  export default modifyWarehouse;
</script>
<style  lang='less'>
  @import "~@/css/modal/orderCenter/modifyWarehouse.less";
</style>

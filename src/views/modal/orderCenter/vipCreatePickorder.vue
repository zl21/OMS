<!--
 * @Author: your name
 * @Date: 2021-04-27 11:20:18
 * @LastEditTime: 2021-07-20 16:59:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /project-logic/views/modal/orderCenter/vipCreatePickorder.vue
-->
<template>
  <div class="customized-modal" style="width: 430px; padding-right: 20px">
    <OmsForm :form-config="pickorderFromConfig" />
    <OmsButton class="modal-footer" :btn-config="pickorderBtnConfig" />
  </div>
</template>

<script>
  import vipCreatePickorder from '@/js/modal/orderCenter/vipCreatePickorder';

  export default vipCreatePickorder;
</script>

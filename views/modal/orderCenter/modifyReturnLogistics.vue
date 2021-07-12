<!--
 * @Author: your name
 * @Date: 2021-06-02 19:20:52
 * @LastEditTime: 2021-06-03 13:10:43
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /burgeon-project-logic/views/modal/orderCenter/modifyReturnLogistics.vue
-->
<template>
<!-- 改退回物流 -->
    <div class="customized-modal">
        <business-form :form-config="formConfig" />
        <businessButton :btn-config="btnConfig" class="modal-footer" />
    </div>
</template>

<script>
import modifyReturnLogistics from '@/js/modal/orderCenter/returngood/modifyReturnLogistics';
export default modifyReturnLogistics;
</script>
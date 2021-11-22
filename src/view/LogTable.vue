<!--
 * @Author: your name
 * @Date: 2021-04-26 18:32:29
 * @LastEditTime: 2021-11-02 18:06:29
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /burgeon-business-components/src/view/LogTable.vue
-->
<template>
  <!-- 定制页面通用日志表格 只需要引入组件,传入当前表明和详情id即可-->
  <div class="logTable">
    <Table :columns="columns"
           :data="data"></Table>
  </div>
</template>

<script>
import LogTable from 'burgeonComponents/js/LogTable.js';
export default LogTable;
</script>

<template>
  <!-- 定制页面通用日志表格 只需要引入组件,传入当前表明和详情id即可-->
  <div class="logTable">
    <Table :columns="columns"
           :data="data"></Table>
  </div>
</template>

<script>
import LogTable from './js/LogTable.js';
export default LogTable;
</script>

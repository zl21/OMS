<template>
  <div class="pickofderExport">
    <p>是否确定导出选中的主子表数据?</p>
    <div class="button">
      <OmsButton :btn-config="btnConfig" />
    </div>
  </div>
</template>

<script>
  import pickorderExport from '@/js/modal/orderCenter/returngood/pickorderExport';
  
  export default pickorderExport;
</script>

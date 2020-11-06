<template>
  <div style="width: 440px;">
    <!-- 是否打印选中行？ -->
    <p>{{ vmI18n.t("modalTips.bz") }}</p>
    <businessButton :btn-config="btnConfig" />
  </div>
</template>
<script>
  import electronicSheetPrinting from '@/js/modal/InventoryCenter/electronicSheetPrinting';

  export default electronicSheetPrinting;
</script>

<template>
  <div>
    <businessForm :form-config="formConfig" />
    <businessButton :btn-config="btnConfig" />
  </div>
</template>

<script>

  import delaySet from '@/js/modal/strategyPlatform/delaySet';

  export default delaySet;
</script>

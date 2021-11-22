<template>
  <div>
    <OmsForm :form-config="formConfig" />
    <OmsButton :btn-config="btnConfig" />
  </div>
</template>

<script>

  import delaySet from '@/js/modal/strategyPlatform/delaySet';

  export default delaySet;
</script>

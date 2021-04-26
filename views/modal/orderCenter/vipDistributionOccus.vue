<template>
  <div style="width:350px;padding-right:20px">
    <div v-if="corfirmFlag">
      <p ref="corfirmMessage">
        {{ corfirmMessage }}
      </p>
      <br>
      <businessButton :btn-config="confirmBtnConfig" />
    </div>
  </div>
</template>
<script>
  import vipDistributionOccus from '@/js/modal/orderCenter/vipDistributionOccus';

  export default vipDistributionOccus;
</script>

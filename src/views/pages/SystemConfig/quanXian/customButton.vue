<template>
  <div class="btn">
    <div :class="['btn-group', config.flex]">
      <Button
        v-for="(item, index) in config.buttons"
        :key="index"
        type="fcdefault"
        @click="item.btnClick"
        v-text="item.text"
      />
    </div>
  </div>
</template>
<script>
  import customButton from '@/js/pages/SystemConfig/quanXian/customButton.js';

  export default customButton;
</script>
<style lang="less">
@import "~@/css/pages/SystemConfig/quanXian/customButton.less"; 
</style>

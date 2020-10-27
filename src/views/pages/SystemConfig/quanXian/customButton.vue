<template>
  <div class="btn">
    <div :class="['btn-group', config.flex]">
      <Button
        v-for="(item, index) in config.buttons"
        :key="index"
        @click="item.btnClick"
        type="fcdefault"
        v-text="item.text"
      />
    </div>
  </div>
</template>
<script>
import customButton from "@/js/pages/SystemConfig/quanXian/customButton.js";
export default customButton;
</script>
<style lang="less">
.btn {
  .btn-group {
    padding: 8px 0;
    display: flex;
    overflow: hidden;
    flex-wrap: wrap;

    button {
      height: 22px;
      line-height: 18px;
      margin-right: 8px;
      margin-left: 0px;
      padding: 0 8px;
      margin-bottom: 4px;
    }
    .ark-btn-fcdefault {
      min-width: auto !important;
    }
  }
  .left {
    justify-content: flex-start;
  }
  .center {
    justify-content: center;
  }
  .right {
    justify-content: flex-end;
  }
}
</style>

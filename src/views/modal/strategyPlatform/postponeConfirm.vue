<template>
  <!-- 延期处理 -->
  <div class="postponeConfirm">
    <div class="search">
      生效结束时间:
      <DatePicker type="datetime" style="width: 200px" size="small" v-model="time" format="yyyy-MM-dd HH:mm:ss"/>
    </div>
    <div class="button">
      <Button type="error" @click="confirm" style="marginright: 35px">确定</Button>
      <Button @click="closeActionDialog">取消</Button>
    </div>
  </div>
</template>

<script>

  import postponeConfirm from '@/js/modal/strategyPlatform/postponeConfirm';

  export default postponeConfirm;
</script>

<style lang="less">
  @import "~@/css/modal/strategyPlatform/postponeConfirm.less";
</style>

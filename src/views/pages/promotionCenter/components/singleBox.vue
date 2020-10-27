<template>
  <div class="singleBox">
    <RadioGroup
      v-model="name"
      @on-change="checkChange"
    >
      <Radio
        v-for="(item,index) in options"
        :key="index"
        circle
        :label="item.title"
      >
        <span>{{ item.title }}</span>
      </Radio>
    </RadioGroup>
  </div>
</template>
<script>
  import singleBox from '@/js/pages/promotionCenter/components/singleBox';

  export default singleBox;
 </script>
<style lang="less" scoped>
@import "~@/css/pages/promotionCenter/components/singleBox.less";
</style>>

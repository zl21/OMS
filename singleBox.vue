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
  import singleBox from './js/singleBox';

  export default singleBox;
 </script>
<style lang="less" scoped>
@import "css/singleBox.less";
</style>>

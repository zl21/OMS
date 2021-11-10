<!--
 * @Author: your name
 * @Date: 2021-11-01 13:50:01
 * @LastEditTime: 2021-11-02 18:06:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /burgeon-business-components/src/view/singleBox.vue
-->
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
  import SingleBox from 'burgeonComponents/js/singleBox';

  export default SingleBox;
 </script>
<style lang="less" scoped>
@import "burgeonComponents/css/singleBox.less";
</style>>

<!--
 * @Author: your name
 * @Date: 2021-11-01 13:50:01
 * @LastEditTime: 2021-11-02 17:43:56
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /burgeon-business-components/src/view/steps.vue
-->
<template>
  <div class="stepsBars">
    <div
      v-for="(item,index) in steps"
      :key="index"
      class="steps-item"
    >
      <div
        v-if="(steps.length -1 !== index)"
        class="steps-tail"
      />
      <div
        class="steps-head"
        @click="selectOneStep(index)"
      >
        <div class="steps-head-inner">
          <span
            :class="['iconfont','icon-item',showItem(index,item),showFinish(index,item),showActive(index,item)]"
          />
        </div>
      </div>
      <div class="steps-main">
        <div class="steps-title" />
        <div class="steps-content">
          {{ item.content }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import steps from 'burgeonComponents/js/steps';

  export default steps;
</script>
<style lang="less" scoped>
@import "burgeonComponents/css/steps.less";
</style>

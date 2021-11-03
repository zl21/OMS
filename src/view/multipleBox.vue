<!--
 * @Author: your name
 * @Date: 2021-11-01 13:50:01
 * @LastEditTime: 2021-11-02 18:06:40
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /burgeon-business-components/src/view/multipleBox.vue
-->
<template>
  <div class="multipleBox">
    <Checkbox
      v-model="all"
      @click.prevent.native="handleCheckAll"
    >
      {{ vmI18n.t('common.all') }}
    </Checkbox>

    <CheckboxGroup
      v-model="names"
      @on-change="checkChange"
    >
      <Checkbox
        v-for="(item,index) in _options"
        :key="index"
        :label="item.title"
      >
        <span>{{ item.title }}</span>
      </Checkbox>
    </CheckboxGroup>
  </div>
</template>
<script>
  import multipleBox from 'burgeonComponents/js/multipleBox';

  export default multipleBox;
 </script>
<style lang="less" scoped>
@import "burgeonComponents/css/multipleBox.less";
</style>>

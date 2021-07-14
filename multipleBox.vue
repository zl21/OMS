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
  import multipleBox from './js/multipleBox';

  export default multipleBox;
 </script>
<style lang="less" scoped>
@import "css/multipleBox.less";
</style>>

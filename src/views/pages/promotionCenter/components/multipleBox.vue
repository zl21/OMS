<template>
  <div class="multipleBox">
    <Checkbox
      v-model="all"
      @click.prevent.native="handleCheckAll"
    >
      全部
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
  import multipleBox from '@/js/pages/promotionCenter/components/multipleBox';

  export default multipleBox;
 </script>
<style lang="less" scoped>
@import "~@/css/pages/promotionCenter/components/multipleBox.less";
</style>>

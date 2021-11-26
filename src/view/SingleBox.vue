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
    <RadioGroup v-model="name" @on-change="checkChange">
      <Radio
        v-for="(item, index) in options"
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
export default {
  name: 'SingleBox',
  data() {
    return {
      name: '',
      norefresh: true,
    };
  },
  watch: {
    value(val) {
      this.initData();
    },
    options: {
      handler(val) {
        this.initData();
      },
      deep: true
    }
  },
  props: {
    value: {
      type: String,
      default: () => ''
    },
    options: {
      type: Array,
      default: () => []
    },
    options: {
      type: Array
    }
  },
  methods: {
    /**
       * 初始化单选值
       */
    initData() {
      this.name = '';
      const obj = this.options.find(opt => opt.value === this.value);
      if (obj) this.name = obj.title;
      this.$nextTick(() => {
        const obj = this.options.find(opt => opt.value === this.value);
        if (obj) this.name = obj.title;
      });
    },
    /**
       * 单选值
       */
    checkChange(name) {
      const obj = this.options.find(opt => opt.title === name);
      if (obj) {
        this.$emit('changeSingle', obj.value);
      }
    }
  },
  mounted() {
    this.initData();
  }
};
  // import SingleBox from 'burgeonComponents/js/singleBox';
  // export default SingleBox;
 </script>
 
<style lang="less" scoped>
@import "burgeonComponents/css/singleBox.less";
</style>>

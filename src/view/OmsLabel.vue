<!--
 * @Author: your name
 * @Date: 2021-04-26 18:32:29
 * @LastEditTime: 2021-11-02 17:57:15
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /burgeon-business-components/src/view/OmsLabel.vue
-->
<template>
  <div class="jordan-label-box">
    <div v-for="(item, index) in labelList" :key="index">
      <div
        v-show="item.isShow === false ? false : true"
        class="jordan-label"
        :class="{ colorStyle: defaultData === item.value }"
        @click="click(item, index)"
      >
        <div class="underline_right" v-show="index === 0"></div>
        <span class="jordan-label-name">{{ item.label }}</span>
        <div class="underline"></div>
      </div>
    </div>
    <div
      class="underline-flex"
      v-show="labelList.length !== 0 || labelList !== undefined"
    ></div>
  </div>
</template>

<script>
export default {
  name: 'OmsLabel',
  props: {
    labelList: {
      type: Array,
      required: true
    }, //渲染数据
    isMultiSelect: {
      type: Boolean,
      default: false
    }, //控制是否单选
    labelDefaultValue: {
      type: [String],
      default: ""
    } //设置默认值
  },
  data() {
    return {
      defaultData: null
    };
  },
  mounted() {
    this.defaultData = this.labelDefaultValue;
  },
  watch: {
    labelDefaultValue(val) {
      this.defaultData = this.labelDefaultValue;
    },
  },
  methods: {
    // 单选
    click(item, index) {
      this.defaultData = item.value;
      this.$emit("labelClick", item, index);
    }
  }
};
// import OmsLabel from 'burgeonComponents/js/OmsLabel.js';
// export default OmsLabel;
</script>

<style lang="less" scoped>
@import "burgeonComponents/css/OmsLabel.less";
</style>

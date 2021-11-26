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
    <div v-for="(item, index) in steps" :key="index" class="steps-item">
      <div v-if="steps.length - 1 !== index" class="steps-tail" />
      <div class="steps-head" @click="selectOneStep(index)">
        <div class="steps-head-inner">
          <span
            :class="[
              'iconfont',
              'icon-item',
              showItem(index, item),
              showFinish(index, item),
              showActive(index, item),
            ]"
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
export default {
  name: 'OmsSteps',
  data() {
    return {};
  },
  computed: {
    current_step: {
      get() {
        return this.current;
      },
      set(val) {
        this.$emit('update:current', val);
      }
    }
  },
  props: {
    current: {
      type: Number
    },
    steps: {
      type: Array
    }
  },
  methods: {
    showItem(index, item) {
      console.log(item);
      return item.class ? item.class : '';
    },
    showActive(index, item) { // 激活
      return this.current_step === index ? 'step-active' : 'step-noactive';
    },
    showFinish(index, item) { // 完成
      return item.finish === true ? 'step-finish' : '';
    },
    /**
     * 选中某个模块
     */
    selectOneStep(index) {
      this.current_step = index;
    }
  },
  mounted() { }
};
  // import OmsSteps from 'burgeonComponents/js/steps';
  // export default OmsSteps;
</script>

<style lang="less" scoped>
@import "burgeonComponents/css/steps.less";
</style>

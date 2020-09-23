<template>
  <div class="stepsBars">
    <div v-for="(item,index) in steps" :key="index" class="steps-item">
      <div class="steps-tail" v-if="(steps.length -1 !== index)"></div>
      <div class="steps-head" @click="selectOneStep(index)">
        <div class="steps-head-inner">
          <span
            :class="['iconfontPromotion','icon-item',showItem(index,item),showFinish(index,item),showActive(index,item)]"
          ></span>
        </div>
      </div>
      <div class="steps-main">
        <div class="steps-title"></div>
        <div class="steps-content">{{item.content}}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "stepsBars",
  data() {
    return {};
  },
  computed: {
    current_step: {
      get() {
        return this.current;
      },
      set(val) {
        this.$emit("update:current", val);
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
      return item.class ? item.class : "";
    },
    showActive(index, item) {  //激活
      return this.current_step === index ? "step-active" : "step-noactive";
    },
    showFinish(index, item) {  //完成
      return item.finish === true ? "step-finish" : "";
    },
    /**
     * 选中某个模块
     */
    selectOneStep(index) {
      this.current_step = index;
    }
  },
  mounted() {}
};
</script>
<style lang="less" scoped>
.stepsBars {
  width: 100%;
  display: flex;
  flex-direction: column;
  color: rgb(204, 204, 204);
  .steps-item {
    position: relative;
    text-align: center;
    height: 140px;
    .steps-tail {
      position: absolute;
      border-left: 2px dashed rgb(204, 204, 204);
      height: calc(100% - 90px);
      width: 1px;
      left: 50%;
      margin-top: 90px;
    }
    .steps-head {
      .steps-head-inner {
        .icon-item {
          line-height: 70px;
          padding: 5px;
          font-size: 50px;
        }
      }
      .steps-head-inner > span:hover{
         cursor: pointer;
      }
     
      .step-noactive {
        color: rgb(204, 204, 204);
      }
      .step-finish {
        //color: rgb(48,62,79)
        color: #fd6442;
      }
       .step-active {
        border: 2px dashed;
        //color: #fd6442;
      }
    }
    .steps-main {
      .steps-content {
        font-size: 12px;
      }
    }
  }
}
</style>
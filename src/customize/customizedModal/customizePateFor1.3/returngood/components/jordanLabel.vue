<template>
  <div class="jordan-label-box">
    <div
      v-for="(item,index) in labelList"
      v-show="(item.isShow === false) ? false :true"
      :key="index"
      class="jordan-label"
      :class="{colorStyle:defaultData === item.value}"
      @click="click(item,index)"
    >
      <div class="underline_right" v-show="index === 0"></div>
      <span class="jordan-label-name">{{item.label}}</span>
      <div class="underline"></div>
    </div>
    <div class="underline-flex" v-show="labelList.length !== 0 || labelList !== undefined"></div>
  </div>
</template>

<script>
export default {
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
    labelDefaultValue(val){
      this.defaultData = this.labelDefaultValue;
    },
  },
  methods: {
    // 单选
    click(item, index) {
      console.log(item);
      this.defaultData = item.value;
      this.$emit("labelClick", item, index);
    }
  }
};
</script>

<style lang="less" scoped>
.jordan-label-box {
  display: flex;
  flex-wrap: wrap;
  margin-left: 18px;
  .jordan-label {
    margin-right: 4px;
    border-bottom: 1px solid #d3d3d3;
    padding: 8px 18px;
    margin-top: 8px;
    cursor: pointer;
    position: relative;
    display: flex;
  }

  .colorStyle {
    border: 1px solid #d3d3d3;
    border-bottom: 1px solid white;
    border-top-right-radius: 2px;
    border-top-left-radius: 2px;
    color: rgb(236, 110, 78);
  }

  .underline {
    position: absolute;
    bottom: -1px;
    right: -5px;
    width: 5px;
    border-bottom: 1px solid #d3d3d3;
  }
  .underline_right {
    position: absolute;
    bottom: -1px;
    left: -18px;
    width: 18px;
    border-bottom: 1px solid #d3d3d3;
  }

  .underline-flex {
    flex: 1;
    border-bottom: 1px solid #d3d3d3;
  }
}
</style>

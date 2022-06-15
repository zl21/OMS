<!--
 * @Author: your name
 * @Date: 2021-04-26 18:32:29
 * @LastEditTime: 2021-11-02 17:57:15
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /burgeon-business-components/src/view/OmsLabel.vue
-->
<template>
  <div class="jordan-label-box OmsLabel">
    <div class="labelWrap">
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
    <div class="moveIcons" v-if="showIcon">
      <Icon type="ios-arrow-back" :class="[left]" @click="moveClick(0)"/>
      <Icon type="ios-arrow-forward" :class="[right]" @click="moveClick(1)"/>
    </div>
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
      left: '',
      right: '',
      showIcon: false,
      defaultData: null
    };
  },
  mounted() {
    this.defaultData = this.labelDefaultValue;

    this.showIconHandel()

    const self = this
    $('.labelWrap').scroll(_.throttle(function() {
      self.showIconHandel()
    },300))
    $('.tag .iconfont.iconbj-fold').click(function() { // 折叠icon触发
      setTimeout(() => {
        self.showIconHandel()
      }, 100)
    })
    $(window).resize(_.throttle(function() { // 屏幕尺寸变更触发
      self.showIconHandel()
    },300))
  },
  watch: {
    labelDefaultValue(val) {
      this.defaultData = this.labelDefaultValue;
    },
  },
  methods: {
    moveClick(tag) {
      if (tag) {
        $('.labelWrap')[0].scrollLeft += 100
      } else {
        $('.labelWrap')[0].scrollLeft -= 100
      }
      this.showIconHandel()
    },
    showIconHandel() {
      const dom = $('.labelWrap')[0]
      const { scrollWidth, clientWidth, scrollLeft } = dom
      if (scrollWidth > clientWidth) {
        this.showIcon = true
        dom.style.marginRight = '40px'
        if (scrollWidth -  scrollLeft - clientWidth < 2) { // 滑到右底
          // console.log('滑到右底');
          this.left = 'left'
          this.right = ''
        }
        if (scrollLeft == 0) { // 滑到左底
          // console.log('滑到左底');
          this.left = ''
          this.right = 'right'
        }
        if (scrollLeft != 0 && scrollWidth -  scrollLeft - clientWidth > 2) {
          // console.log('中间');
          this.left = 'left'
          this.right = 'right'
        }
      } else {
        this.showIcon = false
        dom.style.marginRight = '0'
      }
    },
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

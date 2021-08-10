<!--
 * @Author: your name
 * @Date: 2021-07-30 11:24:27
 * @LastEditTime: 2021-08-10 23:31:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /project-logic/commonPages/layout/listFormButton.vue
-->
<template>
  <div>
    <Button size="small" @click="buttonClick"> 查找 </Button>
    <Button
      type="primary"
      size="small"
      @click="buttonClick('reset')"
    >
      重置
    </Button>
    <!-- <Button class="positionArrow" size="small" v-if="isShowSelectBut" @click="iconClick" :icon='icon'></Button> -->
    <!-- {{slotProps.item.name}} -->
  </div>
</template>
<script>
export default {
  props: {
    ButttonCallBack: {
      type: Function,
      default: () => {
        //  点击事件回调
      },
    },
    IconCallBack: {
      type: Function,
      default: () => {
        //  收拉回调
      },
    },
  },
  data() {
    return {
      icon: "ios-arrow-down",
      hiddenButtons: ["reset", "search"], // 隐藏按钮的key
      hiddenIcon: false, // 是否隐藏收拉icon
      isShowSelectBut: false,
    };
  },
  computed: {
    // Foldnum:function () {
    //   return this.$parent.searchFoldnum;
    // }
  },
  watch: {
    // Foldnum:{
    //   handler(newName) {
    //     let inputNum = this.$parent.formArray.length;
    //     let isColumn = this.$parent.setdefaultColumn;
    //     this.isShowSelectBut = (inputNum / isColumn) > newName ? true : false
    // 　},
    // 　immediate: true
    // }
  },
  mounted() {},
  methods: {
    buttonClick(type) {
      this.ButttonCallBack(type);
    },
    iconClick(e) {
      console.log(this.$parent.searchFoldnum);
      if (
        e.target.className.includes("ios-arrow-down") ||
        (e.target.children.length &&
          e.target.children[0].className.includes("ios-arrow-down"))
      ) {
        this.icon = "ios-arrow-up";
      } else if (
        e.target.className.includes("ios-arrow-up") ||
        (e.target.children.length &&
          e.target.children[0].className.includes("ios-arrow-up"))
      ) {
        this.icon = "ios-arrow-down";
      }
      this.IconCallBack();
    },
  },
};
</script>

<style lang="less">
@import "~@burgeon/oms-theme/skin/public.less";
.standarTableListContent
  .StandardTableListRootDiv
  .downComponent-context
  .tag-close {
  width: 55px;
  height: 14px;
  background: transparent;
  bottom: 0;
  left: 50%;
  top: auto;
  right: auto;
  transform: translateX(-50%);
  i {
    display: inline-block;
    width: 100%;
    height: 100%;
    background: url(../../assets/img/aroowDown.png) right no-repeat;
    background-size: 100%;
    transform:rotate(0);
    &::before {
      content: "";
    }
  }
  .icon-xiadown {
    background: url(../../assets/img/aroowUp.png) right no-repeat;
    background-size: 100%;
  }
}
.ListsForm-button {
  bottom: 24px;
  right: 43px;
  button {
    #bundle > .defalutBtn;
    &:first-child {
      #bundle > .primaryBtn;
    }
  }
}
</style>

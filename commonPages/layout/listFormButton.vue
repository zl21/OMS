<!--
 * @Author: your name
 * @Date: 2021-07-30 11:24:27
 * @LastEditTime: 2021-08-02 11:22:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /project-logic/commonPages/layout/listFormButton.vue
-->
<template>
  <div>
    <Button size="small" @click="buttonClick"> 查找 </Button>
    <Button type="primary" size="small" @click="buttonClick('reset')"> 重置 </Button>
    <Button size="small" @click="iconClick" :icon='icon'></Button>
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
      }
    },
    IconCallBack: {
      type: Function,
      default: () => {
        //  收拉回调
      }
    }

  },
  data() {
    return {
      icon: 'ios-arrow-down',
      hiddenButtons: ['reset', 'search'],  // 隐藏按钮的key
      hiddenIcon: true, // 是否隐藏收拉icon
    }
  },
  methods: {
    buttonClick(type) {
      this.ButttonCallBack(type);
    },
    iconClick(e) { 
      if (e.target.className.includes('ios-arrow-down') || (e.target.children.length && e.target.children[0].className.includes('ios-arrow-down'))) {
        this.icon = 'ios-arrow-up'
      } else if (e.target.className.includes('ios-arrow-up') || (e.target.children.length && e.target.children[0].className.includes('ios-arrow-up'))) {
        this.icon = 'ios-arrow-down'
      }
      this.IconCallBack()
    }

  }
}
</script>

<style lang="less" scoped>
@import '~@burgeon/oms-theme/skin/public.less';
.ListsForm-button {
  bottom: 24px;
  right: 43px;
  button{
    #bundle > .defalutBtn;
    &:first-child{
      #bundle > .primaryBtn;
    }
  }
}
</style>
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
      if (e.target.className.includes('ios-arrow-down')) {
        this.icon = 'ios-arrow-up'
      } else if (e.target.className.includes('ios-arrow-up')) {
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
  
}
</style>
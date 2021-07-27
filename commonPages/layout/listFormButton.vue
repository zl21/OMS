<template>
  <div>
    <Button type="primary" size="small" @click="buttonClick"> 查找555 </Button>
    <Button type="primary" size="small" @click="buttonClick('reset')"> 重置AAA </Button>
    <Button type="primary" size="small" @click="iconClick"> 收拉折叠框 </Button>
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
      hiddenButtons: ['reset', 'search'],  // 隐藏按钮的key
      hiddenIcon: true, // 是否隐藏收拉icon
    }
  },
  methods: {
    buttonClick(type) {
      this.ButttonCallBack(type);
    },
    iconClick() {
      this.IconCallBack()
    }

  }
}
</script>
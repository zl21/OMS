<!--
 * @Author: your name
 * @Date: 2021-04-27 11:20:18
 * @LastEditTime: 2021-09-06 13:17:33
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /project-logic/commonPages/WelcomePage.vue
-->
<template>
  <div class="welcomepage">
    <!-- <SelectTheme></SelectTheme> -->
  </div>
</template>

<script>
// import SelectTheme from './menuTheme';

export default {
  name: "WelcomePage",
  data() {
    return {
      vmI18n: window.vmI18n,
    };
  },
  components:{
    // SelectTheme
  },
  methods: {
  },
  mounted() {
    const domContent = document.getElementById("content");
    domContent.style.padding = "0 0";
  },
  destroyed() {
    if (document.getElementById("content")) {
      const domContent = document.getElementById("content");
      domContent.style.padding = "0 15px";
    }
  },
};
</script>

<style scoped lang="less">
@import "~@burgeon/oms-theme/skin/public.less";
.welcomepage {
  width: 100%;
  height: 100%;
  background: url("~assetsImg/loginBg.png") center / 100% no-repeat #fff;
  // background-size: contain;
  background-size: auto 100%;
  /deep/ .ark-dropdown {
    margin: 10px 10px 20px;
  }
  .container {
    z-index: 999;
    padding: 20px;
    background-color: rgb(252, 252, 247);
    button {
      height: 24px;
      width: 60px;
      border-radius: 2px;
      border: 1px solid @button-border;
      color: @button-border;
      background-color: @button-bg-font;
      margin-right: 20px;
    }
    span {
      font-size: 16px;
      text-align: left;
    }
  }
}
</style>

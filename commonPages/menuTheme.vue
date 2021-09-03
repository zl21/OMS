<!--
 * @Author: your name
 * @Date: 2021-09-03 13:12:04
 * @LastEditTime: 2021-09-03 13:31:27
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /project-logic/commonPages/menuTheme.vue
-->
<template>
  <div>
    <Select v-model="model" style="width: 200px" @on-change="changeOtheme">
      <Option v-for="item in themeArr" :value="item.value" :key="item.value">
        {{
          item.label
        }}
      </Option>
    </Select>
  </div>
</template>

<script>
export default {
  name: "WelcomePage",
  data() {
    return {
      vmI18n: window.vmI18n,
      themeArr: [
        {
          value: "oms",
          label: "默认",
        },
        {
          value: "oms2",
          label: "主题1",
        },
      ],
      model: "oms",
    };
  },
  created(){
    let omsTheme = localStorage.getItem("VarTheme");
    this.model = omsTheme
    $store.commit('customize/VarTheme', omsTheme);
    require(`@burgeon/oms-theme/skin/${omsTheme}/index.less`).default;
  },
  methods: {
    changeOtheme(e) {
      if($store.state.customize.VarTheme != e){
        this.model = e;
        localStorage.setItem("VarTheme",e);
        location.reload();
      }
    },
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

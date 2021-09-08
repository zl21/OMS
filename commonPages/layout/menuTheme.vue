<!--
 * @Author: your name
 * @Date: 2021-09-03 13:12:04
 * @LastEditTime: 2021-09-07 17:17:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /project-logic/commonPages/menuTheme.vue
-->
<template>
  <div class="changeOtheme">
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
// import less from "libs/less/dist/less.js";
// import '~_/src/assets/css.less'
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
    if(!omsTheme){
      localStorage.setItem("VarTheme",this.model);
      omsTheme = localStorage.getItem("VarTheme");
    }
    this.model = omsTheme;
    require(`@burgeon/oms-theme/skin/${omsTheme}/index.less`).default;
  },
  methods: {
    changeOtheme(e) {
      if(localStorage.getItem("VarTheme") != e){
        localStorage.setItem("VarTheme",e);
        location.reload();
      //  setTimeout(() => {
      //     less.modifyVars({
      //       '@base-color': '#000'
      //   }).then((res)=>{
      //     console.log(res);
      //     less.refreshStyles()
      //   })
      //  }, 1000);
      }
      // window.less.modifyVars({primary:'#1890FF'})
    },
  },
  mounted() {
    
  }
};
</script>

<style scoped lang="less">
@import '~@burgeon/oms-theme/skin/public.less';
  .changeOtheme{
    display: flex;
    align-items:center;
    margin-right: 16px;
    /deep/ .ark-select{
      width: 100px !important;
      .ark-select-selection{
         #bundle>.defalutInput;
      }
      .ark-select-selection-head{
        .ark-select-selected-value{
          height: 100%;
          line-height: 30px;
        }
        & > i{
          background-color: @base-color;
        }
      }
    }
  }
</style>

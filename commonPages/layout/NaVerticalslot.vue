<!--
 * @Author: your name
 * @Date: 2021-07-02 14:03:34
 * @LastEditTime: 2021-07-15 14:37:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /project-logic/commonPages/layout/NaVerticalslot.vue
-->
<template>
  <div class="NaVertical">
    <div class="NaVertical-icons">
 
      <!-- 收拉左侧菜单 -->
      <slot name="icon-tag"></slot>
    </div>
    <div class="NaVertical-box">
      <!-- 模糊查询 -->
      <slot name="nav-input"></slot>
      <!-- 控制台 -->
      <slot name="icon-home"></slot>
      <!-- 收藏 -->
      <slot name="icon-Collect"></slot>
      <!-- 这个最近使用 -->
      <slot name="icon-Lately"></slot>
      <!-- 这个 设置【jlow、工作台】 -->
      <slot name="icon-Setting"></slot>
      <!-- 消息提示 -->
      <slot name="icon-message"></slot>
      <!-- 个人设置 -->
      <slot name="icon-person"></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: "NaVerticalslot",
  data() {
    return {

    }
  },
  created() {

  },
  mounted() {
    // 模拟点击，展示搜索框
    document.getElementsByClassName("buttonIcon")[0].click();
 
    this.$nextTick(() => {
      if (localStorage.getItem("locale") != "zh") {
      let dom = document.getElementsByClassName("ark-input-default")
      dom[0].placeholder = "please enter the system function to search"

      let dom1 = document.getElementsByClassName("set-panel")[0].getElementsByClassName("panel-item")

      dom1[0].getElementsByTagName("p")[0].innerHTML = `<i class="iconfont iconmd-contact explanatory"></i> Welcome：Admin` 
        //欢迎: 系统管理员
      dom1[1].getElementsByTagName("p")[0].innerHTML = `<i class="iconfont iconmd-key explanatory"></i> change password`  //修改密码    
      dom1[2].getElementsByTagName("p")[0].innerHTML = `<i class="iconfont iconmd-apps explanatory"></i> Collapse search conditions <span tabindex="0" class="switch ark-switch ark-switch-checked ark-switch-default"><input type="hidden" value="true"> <span class="ark-switch-inner"> <!----></span></span>`
        //折叠查询条件
      setTimeout(() => {
        dom1[3].getElementsByTagName("p")[0].innerHTML =`<i class="iconfont iconmd-list explanatory"></i>
        earch conditions default displayed rows
        <div class="set-panel-number ark-input-number ark-input-number-default"><div class="ark-input-number-handler-wrap"><a class="ark-input-number-handler ark-input-number-handler-up"><span class="ark-input-number-handler-up-inner ark-icon iconios-arrow-up"></span></a> <a class="ark-input-number-handler ark-input-number-handler-down"><span class="ark-input-number-handler-down-inner ark-icon iconios-arrow-down"></span></a></div> <div class="ark-input-number-input-wrap"><input autocomplete="off" spellcheck="false" placeholder="" class="ark-input-number-input"></div></div>`
         //查询条件默认显示行数
      }, 500)
      dom1[3].getElementsByTagName("p")[0].innerHTML = `<i class="iconfont iconmd-exit explanatory"></i>
      Exit`          //退出 
      }


    })

  }
};
</script>
<style lang="less">
@import "~@burgeon/oms-theme/skin/public.less";
.favorite:before {
  content: "";
}
// 头部导航有关系的所有样式
// 搜索
.NaVertical {
  .nav-search input {
    #bundle > .defalutInput !important;
  }
}
// 历史
.history,
.favorite {
  .ark-select-dropdown {
    ul {
      li {
        text-align: left;
      }
    }
  }
  .ark-select-dropdown {
    margin-top: 10px;
  }
  .ark-select-dropdown::before {
    content: "";
    display: inline-block;
    width: 20px;
    height: 20px;
    background: url(../../assets/img/arrowTop.png) top no-repeat;
  }
}
.favorite {
  .ark-select-dropdown::before {
    #bundle > .absolute(@top:-15px,@left:40px);
  }
}
.history {
  .ark-select-dropdown::before {
    #bundle > .absolute(@top:-15px,@left:45px);
  }
}
// 消息
.message-panel {
  .panel-main {
    width: 420px;
    // border-left: 70px solid rgba(0,0,0,.5);
    .panel-title {
      padding: 0 @base-mr;
      height: 48px;
      line-height: 47px;
      border-bottom: 1px solid #f2f2f2;
      &::before {
        display: inline-block;
        content: "";
        width: 4px;
        height: 16px;
        border-radius: 4px;
        background: @base-color;
        vertical-align: middle;
        margin-top: -3px;
        margin-right: @base-mr;
        color: #292f43;
      }
      .right {
        height: 48px;
        line-height: 48px;
        color: @base-color;
      }
    }
    .no-message {
      padding-top: 180px;
      background: url(../../assets/img/message.png) top no-repeat #ffffff;
      background-size: 160px 160px;
    }
  }
}
// 管理员
.set-panel {
  .panel-main {
    .panel-item {
      border-bottom: none;
      .explanatory {
        margin-right: 5px;
        color: #8d91a1;
      }
      p {
        color: #292f43;
      }
      &:first-child {
        p {
          color: #8d91a1;
          i::before {
            content: "";
          }
        }
      }
    }
  }
}
</style>

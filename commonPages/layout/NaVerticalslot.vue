<!--
 * @Author: your name
 * @Date: 2021-07-02 14:03:34
 * @LastEditTime: 2021-09-08 09:55:27
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
      <!-- 自定义 问候-->
      <span class="timeTips">{{ timeTips }}, {{ welcome }}</span>
      
       <!-- <SelectTheme></SelectTheme> -->
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
import service from '@/service/index';
// import SelectTheme from './menuTheme';

export default {
  name: "NaVerticalslot",
  components:{
    // SelectTheme
  },
  data() {
    return {
      timeTips: '',
      welcome: '欢迎来到 R3-OMS ！',
      userName: localStorage.getItem('name'),
    }
  },
  created() {
    const pa = new FormData();
    pa.append('language', localStorage.getItem("locale") || 'zh');
    service.common.langSwitcher(pa).then((r) => {
      if (r.status === 200 && r.data.code === 0) {
        console.log('langSwitcher success!');
      }
    })
  },
  mounted() {
    // // 设置变量
    // document.body.style.setProperty('--baseColor', '#7F583F');
    // // 读取变量
    // let getVal = document.body.style.getPropertyValue('--baseColor').trim();
    // console.log(getVal);
    // 模拟点击，展示搜索框
    document.getElementsByClassName("buttonIcon")[0].click();
    this.$nextTick(() => {
      if (localStorage.getItem("locale") != "zh") {
        let dom = document.getElementsByClassName("ark-input-default")
        dom[0].placeholder = "please enter the system function to search"

        //折叠查询条件
        setTimeout(() => {
          let dom1 = document.getElementsByClassName("set-panel")[0].getElementsByClassName("panel-item")

          dom1[0].getElementsByTagName("p")[0].innerHTML = `<i class="iconfont iconmd-contact explanatory"></i> Welcome：Admin`
          //欢迎: 系统管理员
          dom1[1].getElementsByTagName("p")[0].innerHTML = `<i class="iconfont iconmd-key explanatory"></i> change password`  //修改密码    
          dom1[2].getElementsByTagName("p")[0].innerHTML = `<i class="iconfont iconmd-apps explanatory"></i> Collapse search conditions <span tabindex="0" class="switch ark-switch ark-switch-checked ark-switch-default"><input type="hidden" value="true"> <span class="ark-switch-inner"> <!----></span></span>`

          dom1[3].getElementsByTagName("p")[0].innerHTML = `<i class="iconfont iconmd-list explanatory"></i>
        earch conditions default displayed rows
        <div class="set-panel-number ark-input-number ark-input-number-default"><div class="ark-input-number-handler-wrap"><a class="ark-input-number-handler ark-input-number-handler-up"><span class="ark-input-number-handler-up-inner ark-icon iconios-arrow-up"></span></a> <a class="ark-input-number-handler ark-input-number-handler-down"><span class="ark-input-number-handler-down-inner ark-icon iconios-arrow-down"></span></a></div> <div class="ark-input-number-input-wrap"><input autocomplete="off" spellcheck="false" placeholder="" class="ark-input-number-input"></div></div>`
          //查询条件默认显示行数
          dom1[4].getElementsByTagName("p")[0].innerHTML = `<i class="iconfont iconmd-exit explanatory"></i>
      Exit`          //退出 

       let xiaoXiDome = document.getElementsByClassName("panel-title")[0].getElementsByClassName("left")
        xiaoXiDome[0].innerText = "Messages"

        let Ignore = document.getElementsByClassName("panel-title")[0].getElementsByClassName("right")
        Ignore[0].innerText = "Ignore"

       let xiaoXiDome2 = document.getElementsByClassName("no-message")[0].getElementsByTagName("span")
        xiaoXiDome2[0].innerText = "No unread messages"

       let tasks = document.getElementsByClassName("panel-bottom")[0].getElementsByClassName("right")
        tasks[0].innerText = "All tasks"

        }, 700)

      }
    });
    let now = new Date();
    let hour = now.getHours();
    let ZH = localStorage.getItem("locale") == "zh"
    this.welcome = ZH ? this.welcome : 'Welcome to R3-OMS !'
    if (hour >= 0 && hour < 8) this.timeTips = '早上好！';
    else if (hour >= 8 && hour < 11) ZH ? this.timeTips = '上午好' : this.timeTips = 'Good morning';
    else if (hour >= 11 && hour < 13) ZH ? this.timeTips = '中午好' : this.timeTips = 'Good noon';
    else if (hour >= 13 && hour < 17) ZH ? this.timeTips = '下午好' : this.timeTips = 'Good afternoon';
    else if (hour >= 17 && hour < 24) ZH ? this.timeTips = '晚上好' : this.timeTips = 'Good evening';
  }
};
</script>
<style lang="less">
@import "~@burgeon/oms-theme/skin/public.less";
.favorite:before {
  content: "";
}
// 头部导航有关系的所有样式
// 收拉左侧菜单
.NaVertical-icons{
  position: absolute;
  .iconbj-unfold,.iconbj-fold{
    &::before{
      content:'';
    }
    position: fixed;
    top: 50%;
    left: 55px;
    transform: translateY( - 50%);
    display: inline-block;
    width: 10px;
    height: 40px;
    background:  url('~assetsImg/icon_fold.png') right no-repeat;
    background-size: 100% auto;
    z-index: 99;
  }
  .iconbj-fold{
    left: 180px;
    background:  url('~assetsImg/icon_unfold.png') right no-repeat;
    background-size: 100% auto;
  }
}
// 搜索
.NaVertical {
  .tag{
    line-height: 41px;
  }
  .NaVertical-box {
    width: 100%;
    .timeTips {
      flex: 1;
      line-height: 40px;
      font-size: 12px;
      color: #292f43;
      padding-left: @base-mr;
    }
  }
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
    background: url('~assetsImg/arrowTop.png') top no-repeat;
  }
}
.favorite {
  .ark-select-dropdown::before {
    #bundle > .absolute(@top:-13px,@left:50%,@X:-50%);
  }
}
.history {
  .ark-select-dropdown::before {
    #bundle > .absolute(@top:-13px,@left:50%,@X:-50%);
  }
}
// 消息
.message-panel {
  .panel-main {
    width: 420px;
    // border-left: 70px solid rgba(0,0,0,.5);
    .panel-title {
      padding: 0 @base-mr !important;
      height: 48px !important;
      line-height: 47px !important;
      border-bottom: 1px solid #f2f2f2 !important;
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
        height: 48px !important;
        line-height: 48px !important;
        color: @base-color !important;
      }
    }
    .no-message {
      padding-top: 180px;
      background: url('~assetsImg/message.png') top no-repeat #ffffff;
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

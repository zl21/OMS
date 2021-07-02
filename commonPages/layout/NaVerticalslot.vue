<!--
 * @Author: your name
 * @Date: 2021-07-02 14:03:34
 * @LastEditTime: 2021-07-02 18:38:12
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
};
</script>
<style lang="less">
@import '~@burgeon/oms-theme/skin/public.less';
.favorite:before{
 content:'';
}
// 头部导航有关系的所有样式
// 搜索
.NaVertical{
  .nav-search input{
    #bundle > .defalutInput;
  }
}
// 历史
.history{
  .ark-select-dropdown{
    ul{
      li{
        text-align: left;
      }
    }
  }
  .ark-select-dropdown::before{
      // content: '';
      // display: inline-block;
      // width:0;
      // height:0;
      // border:5px solid transparent;  //所有border都是透明的，
      // border-top-color:black; //只有尖相对的方向border有颜色
    }
}
// 消息
.message-panel{
  .panel-main{
    width: 420px;
    border-left: 70px solid rgba(0,0,0,.5);
    .panel-title{
      padding: 0 @base-mr;
      height: 48px;
      line-height: 47px;
      border-bottom: 1px solid #f2f2f2;
      &::before{
        display: inline-block;
        content: '';
        width: 4px;
        height:  16px;
        border-radius: 4px;
        background: @base-color;
        vertical-align: middle;
        margin-top: -3px;
        margin-right: @base-mr;
        color: #292f43;
      }
      .right{
        height: 48px;
        line-height: 48px;
        color: @base-color;
      }
    }
    .no-message{
      padding-top: 180px;
      background:url(../../assets/img/message.png) top no-repeat #ffffff;
      background-size:160px 160px ;
    }
  }
}
</style>

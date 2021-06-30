<!--
 * @Author: your name
 * @Date: 2021-06-29 10:56:54
 * @LastEditTime: 2021-06-30 14:58:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /project-logic/commonPages/layput/NavigatorSubMenu.vue
-->
<template>
    <div>
        <Tooltip :content="data.label"  placement="right" theme="light" max-width="200">
          <i class="iconfont icon" :class="`icon-menu-`+data.id"></i>
        </Tooltip>
        <div class="navigator-primary-menu-div">
          <span class="displayNone">{{ data.label }}</span>
        </div>
         <Icon class="displayNone" type="ios-arrow-forward" />
    </div>
</template>
<script>
 export default {
    props:{
        data:{
          type: Object
        },
        index: {
           type: Number
        }
    },
    mounted(){
    }
}
</script>
<style lang="less">
.NavigatorVertical{
  // 提示图标
  .ark-tooltip, .ark-tooltip-rel{
    width: 20px !important;
    margin-right: 10px;
  }
  .ark-tooltip-light.ark-tooltip-popper[x-placement=right] .ark-tooltip-arrow{
    width: 0;
  }
  // 收起
  &.transferLeft{
    width: 55px;
    overflow: inherit;
    .middle{
      overflow: inherit;
    }
    .displayNone{
      display: none;
    }
    .navigator-primary-menu{
      &:hover{
        .navigator-primary-menu-div .tips{
          display: block;
        }
      }
      .navigator-primary-menu-div{
        overflow: inherit;
      }
    }
    .ark-tooltip-light {
      z-index: 99999;
      .ark-tooltip-inner{
        width: 80px;
        line-height: 20px;
      }
    }
  }
  // 展开
  &.transferRight{
    width: 180px;
    .ark-tooltip, .ark-tooltip-rel{
      pointer-events: none;
    }
  }
  // 展开部分
  div .navigator-sub-menu{
    width: auto !important;
    top: 0 !important;
    height: 100%;
    max-height: initial;
    box-shadow: 16px 0 10px 0 rgba(0,0,0,.05)!important;
  }
}

</style>
<!--
 * @Author: your name
 * @Date: 2021-06-29 10:56:54
 * @LastEditTime: 2021-08-03 18:01:37
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
 const menuObj = {'零售发货单':'Retail delivery order','退换货单':'Return and exchange order','功能权限':'Functional authority','数据权限':'Data authority','促销活动':'Sales promotion activity'};
 const menuKey = Object.keys(menuObj);
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
      if (localStorage.getItem("locale") === 'en') {
        this.modifyLabelByLan(this.data);
      }
    },
    methods: {
      // 国际化:修改动作定义类型的功能清单
      modifyLabelByLan(data) {
        if (!data.children) {
          if (menuKey.includes(data.label)) {
            data.label = menuObj[data.label];
            console.log(data.label);
          }
        } else {
          if (data.children.length) {
            data.children.forEach(it => {
              this.modifyLabelByLan(it);
            });
          }
        }
      }
    },
}
</script>
<style lang="less">
.NavigatorVertical .left img.banner{
   display: none;
}
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
    width: 55px !important;
    overflow: inherit;
    transition: inherit !important;
    .left{
      background: url(../../assets/img/mini-logo.png) right no-repeat #4855AF;
      background-size:100% auto ;
    }
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
    width: 180px !important;
    transition: inherit !important;
    .left{
      display: block;
      background: url(../../assets/img/menuLogo.png) right no-repeat #4855AF;
      background-size:100% auto;
    }
    .ark-tooltip, .ark-tooltip-rel{
      pointer-events: none;
    }
  }
  // 展开部分
  div .NavigatorSubMenu{
    width: auto !important;
    top: 51px !important;
    height: calc(100% - 51px);
    max-height: initial;
    box-shadow: 16px 0 10px 0 rgba(0,0,0,.05)!important;
  }
}

</style>
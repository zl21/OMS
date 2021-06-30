<!--
 * @Author: your name
 * @Date: 2021-06-29 10:56:54
 * @LastEditTime: 2021-06-30 10:50:24
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
          <!-- <span class="tips">{{ data.label }}</span> -->
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
      console.log(this.data,this.index);
      // let iconfArr = new Map();
      // iconfArr['接口平台'] = 'icon-xialadanxuan';
      // let datas = JSON.parse(JSON.stringify(this.data))
      // for(var key in iconfArr) {
      //   if(key === this.data.label){
      //     this.$set(this.data, 'iconf', iconfArr[key]);
      //   }
      // }
      // this.$set(this.data, 'iconf', 'icon-xialadanxuan');
      // console.log(this.$store);
    }
}
</script>
<style lang="less">
.NavigatorVertical{
  .ark-tooltip, .ark-tooltip-rel{
    width: 20px !important;
    margin-right: 10px;
  }
  .ark-tooltip-light.ark-tooltip-popper[x-placement=right] .ark-tooltip-arrow{
    width: 0;
  }
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
  &.transferRight{
    .ark-tooltip, .ark-tooltip-rel{
      pointer-events: none;
    }
  }
}
.navigator-primary-menu-div{
  position: relative;
}
.tips{
  display: none;
  position: absolute;
  right: -60px;
  top: 0;
  z-index: 99;
  color: #3b49aa;
  background-color: #F1F2FA;
  padding: 2px 5px;
  border-radius: 3px;
}
// iconfont
</style>
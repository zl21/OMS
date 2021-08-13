<!--
 * @Author: your name
 * @Date: 2021-07-07 18:45:07
 * @LastEditTime: 2021-08-13 16:09:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /project-logic/views/pages/orderCenter/returnOrder/OWNERNAME.vue
-->
<template>
  <div>
   <span class="eye" @click="onClickEye(isShow)">
     <i ref="iconfont" class="iconfont iconios-eye-off"></i>
   </span>
  </div>
</template>
<script>
import { throttle } from 'lodash'
export default {
  data(){
    return {
      isShow:false,
    }
  },
  props: {
    options: {
      type: Object,
      default: () => ({})
    }
  },
  created(){
    
  },
  mounted(){
    // 模拟点击，加密
    setTimeout(() => {
      // document.getElementsByClassName("eye")[0].click();
    }, 500);
  },
  methods:{
    onClickEye:throttle(function (val){
     let obj = {
       Label:'Label',
       name:'name',
       OWNERNAME:this.$route.params.itemId
     }
     if(val){
        obj.ID = this.$route.params.itemId
        this.$emit('change',[obj])
        this.$refs.iconfont.classList.replace('iconios-eye-off','iconios-eye');
     }else{
        this.$emit('change','')
        this.$refs.iconfont.classList.replace('iconios-eye','iconios-eye-off')
     }
     this.isShow = !val
    },2000)
  }
}
</script>
<style lang="less">

// 换货信息 小眼睛
div[id*="OC_B_RETURN_ORDER_ECXCHANGE_TABLE-10754"] .ark-collapse{
  position: relative;
  #AUDIT_ID{
    position: absolute;
    left: 120px;
    top: 0px;
    color: #4855AF;
    .itemComponent{
     overflow: inherit;
    }
  }
}
</style>
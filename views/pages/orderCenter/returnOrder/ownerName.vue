<!--
 * @Author: your name
 * @Date: 2021-07-07 18:45:07
 * @LastEditTime: 2021-07-09 11:04:18
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
  methods:{
    onClickEye(val){
     this.isShow = !val
     let obj = {
       Label:'Label',
       name:'name',
       OWNERNAME:this.$route.params.itemId
     }
      if(!val){
        obj.ID = this.$route.params.itemId
        this.$emit('change',[obj])
        this.$refs.iconfont.classList.replace('iconios-eye-off','iconios-eye');
      }else{
       this.$emit('change','')
        this.$refs.iconfont.classList.replace('iconios-eye','iconios-eye-off')
      }
    },
    
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
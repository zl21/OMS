<!--
 * @Author: your name
 * @Date: 2021-06-15 14:24:06
 * @LastEditTime: 2021-07-23 17:09:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /burgeon-project-logic/views/modal/financeCenter/authorize.vue
-->
<template>
  <div>
      hello
  </div>
</template>

<script>
import service from '@/service/index'

export default {
  data(){
    return{

    }
  },
  created(){
   this.$emit('closeActionDialog', false);
  },
  mounted(){
    this.init()
  },
  methods:{
    init(){
      let fordata = new FormData()
      fordata.append("id",this.$parent.$parent.idArray[0])


      service.financeCenter.getAuth(fordata).then(res=>{
        if (res.data.code == 0) {
          window.open(res.data.data)
        }
       
      })
    }
  }
}
</script>

<style>

</style>
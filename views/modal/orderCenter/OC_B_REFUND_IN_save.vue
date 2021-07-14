<!--
 * @Author: your name
 * @Date: 2021-06-01 17:27:45
 * @LastEditTime: 2021-07-14 14:47:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /burgeon-project-logic/views/modal/orderCenter/OC_B_REFUND_IN_save.vue
-->
<template>
  <div></div>
</template>

<script>
import service from '@/service/index'

export default {
  data() {
    return {
    }
  },
  created() {
    this.$emit("closeActionDialog");
    this.save()
  },
  methods: {
    save() {

      let person = JSON.parse(sessionStorage.getItem("OC_B_REFUND_IN_data"));
     
    }
  }
}
</script>

<style>
</style>
<!--
 * @Author: your name
 * @Date: 2021-05-25 16:48:54
 * @LastEditTime: 2021-05-25 19:51:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /burgeon-project-logic/views/modal/orderCenter/manual.vue
-->
<template>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  created() {
    this.$emit("closeActionDialog");
    if (this.$parent.$parent.idArray.length != 1) {
      this.$Message.warning('请选中一条数据！');
      return
    } else {
      this.init()
    }


  },
  methods: {
    init() {
      this.$store.commit('global/tabOpen', {
        tableId: 10542,
        type: 'V',
        tableName: 'OC_B_REFUND_IN',
        id: this.$parent.$parent.idArray[0]+"?type=1",
      });
    }
  }

}
</script>

<style>
</style>
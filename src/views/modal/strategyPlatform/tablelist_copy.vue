<!--
 * @Author: your name
 * @Date: 2021-06-21 15:04:03
 * @LastEditTime: 2021-06-21 15:18:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /burgeon-project-logic/views/modal/strategyPlatform/tablelist_copy.vue
-->
<template>
  <div>heelo</div>
</template>

<script>
export default {
  data() {
    return {
      ids: ""
    }
  },
  created() {
    this.ids = this.$parent.$parent.idArray[0]
    this.$emit('closeActionDialog', false)

  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      let tableName = this.$route.params.tableName;

      this.$store.commit('global/tabOpen', {
        type: 'C',
        url: `/CUSTOMIZED/${tableName}/New?copy=${this.ids}`,
        label: tableName == 'ST_C_ASSIGN_LOGISTICS' ? '分物流规则' : '分仓规则',
        customizedModuleName: tableName,
        customizedModuleId: 'New',
        dynamicRoutingForCustomizePage: true
      })

    }
  }
}
</script>

<style>
</style>
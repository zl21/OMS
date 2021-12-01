<template>
  <div class="clearfix" style="font-weight: 400">
    <span class="pull-left">{{ params.displayName }}</span>
    <Poptip trigger="hover" :transfer="true" :content="params.toolTipText">
      <i
        class="iconfont iconios-information-circle-outline color-primary mg-lf-3 pull-left font-size-14 cursor-pointer"></i>
    </Poptip>
    <span class="height-32 flex  align-items-center  inline-block mg-lf-3 pull-left" v-if="params.sortable"
          @click="sortFun()">
<!--      <span class="cursor-pointer ag-icon ag-icon-none "></span>-->
      <Icon class="cursor-pointer color-c5c8ce " :class="{'color-2d8cf0':params.sortType === 'asc'}"

            type="ios-arrow-round-down"/>
      <Icon class="cursor-pointer color-c5c8ce " :class="{'color-2d8cf0':params.sortType === 'desc'}"
            type="ios-arrow-round-up"
            style="transform: translateX(-9px);"/>
    </span>
  </div>
</template>

<script>

export default {
  name: "",
  data() {
    return {};
  },
  mounted() {
  },
  methods: {
    sortFun() {
      console.log(111, this.params)
      if (typeof this.params.setSortTypeFun === 'function') {
        if (this.params.sortType === '') {
          this.params.setSortTypeFun('desc', this.params.column.colId)
        } else if (this.params.sortType === 'desc') {
          this.params.setSortTypeFun('asc', this.params.column.colId)
        } else if (this.params.sortType === 'asc') {
          this.params.setSortTypeFun('', this.params.column.colId)
        }
      }

    }
  }
};
</script>

<style scoped lang="less">

.color-c5c8ce {
  color: #c5c8ce;
}

.color-2d8cf0 {
  color: #2d8cf0;
}
</style>

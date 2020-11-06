<template>
  <ul
    id="container"
    class="setFromDrag"
  >
    <li
      v-for="(item,index) in dragList"
      :id="item.id"
      :key="index"
      class="ele"
      :orderno="item.orderno"
      :isfilter="item.isfilter"
      :label="item.label"
      :colname="item.colname"
      draggable="true"
    >
      <input
        id="checkboxid"
        type="checkbox"
        :checked="item.isfilter === false ? false : true"
        @click="checkbox($event,item)"
      >
      {{ item.label }}
    </li>
  </ul>
</template>

<script>
  import setFromDrag from '@/js/modal/orderCenter/setFromDrag';

  export default setFromDrag;
</script>

<style lang="less" scoped>
  @import "~@/css/modal/orderCenter/setFromDrag.less";
</style>

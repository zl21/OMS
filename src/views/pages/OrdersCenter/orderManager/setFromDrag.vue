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
  import setFromDrag from '@/js/pages/orderCenter/orderManager/setFromDrag';

  export default setFromDrag;
</script>

<style scoped>
@import "~@/css/pages/orderCenter/orderManager/setFromDrag.less";
</style>

<template>
  <ul id="container" class="setFromDrag">
    <li
      class="ele"
      :orderno="item.orderno"
      :isfilter="item.isfilter"
      :label="item.label"
      :colname="item.colname"
      :id="item.id"
      draggable="true"
      v-for="(item,index) in dragList"
      :key="index"
    >
      <input
        type="checkbox"
        id="checkboxid"
        :checked="item.isfilter === false ? false : true"
        @click="checkbox($event,item)"
      />
      {{item.label}}
    </li>
  </ul>
</template>

<script>
import setFromDrag from "@/js/pages/orderCenter/orderManager/setFromDrag";
export default setFromDrag;
</script>

<style scoped>
ul {
  list-style: none;
  margin: 8px 20px;
  height: 300px;
  overflow: auto;
  margin-bottom: 10px;
}
.ele {
  width: 100%;
  border: 1px solid #f0f0f0;
  padding: 6px 0px 6px 0px;
  margin-bottom: 4px;
  margin-top: 2px;
  padding-left: 10px;
  color: black;
  cursor: move;
}
</style>

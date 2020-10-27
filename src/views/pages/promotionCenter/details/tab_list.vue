<template>
  <div class="tablists">
    <div class="tabs_header">
      <div class="nav_wrap_scroll">
        <div
          v-for="(item,index) in panels"
          :key="index"
          :class="showClass(index)"
          v-on:click="handleHeaderClick(index)"
          v-on:dblclick="handleHeaderDbClick(index)"
        >
          <input v-if="showTitle(index,item)"  
           @input="check($event,item)"
           @keyup.13="noedit($event,item)"
          v-on:blur="noedit($event,item)"  :value="item.group"  />
          <span v-if="!showTitle(index,item)">{{item.group}}{{item.unit||''}}</span>
        </div>
      </div>
    </div>
    <div class="tabs_content">
        <slot  name="tab_content"></slot>
      <!-- <div v-for="(item,index) in  panels" :key="index" v-show="showContent(index)">{{index}}</div> -->
    </div>
  </div>
</template>
<script>
  import tab_list from "@/js/pages/promotionCenter/details/tab_list.js";
  export default tab_list;
</script>
<style lang="less" scoped>
.tablists {
  .tabs_header {
    position: relative;
    .nav_wrap_scroll {
      overflow: hidden;
      .tab_item {
        padding: 0 20px;
        height: 40px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        line-height: 40px;
        display: inline-block;
        list-style: none;
        font-size: 14px;
        font-weight: 500;
        color: #303133;
        position: relative;
      }
      .tab_item:first-child{
          padding-left: 0;
      }
       .tab_item:last-child{
          padding-right: 0;
      }
      .tab_active{
          z-index: 2;
          border-bottom:2px solid #ec6e4e;
          color: #ec6e4e;
      }
    }
    .nav_wrap_scroll::after {
      content: "";
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 2px;
      background-color: #e4e7ed;
      z-index: 1;
    }
  }
  .tabs_content{
      margin: 10px 0;
  }
}
</style>
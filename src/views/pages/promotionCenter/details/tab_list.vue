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
export default {
  name: "tablist",
  data() {
    return {
      edit: false, //tab标签编辑
      //current:this.currentTab
    };
  },
  
  props: {
    currentTab: {
      type: Number
    }, //当前选中
    panels: {
      type: Array
    }
  },
  computed:{
      current:{
          get(){
              return this.currentTab;
          },
          set(val){
              this.$emit('update:currentTab',val);
          }
      }
  },
  methods: {
    showClass(index){
         return  this.current == index ? 'tab_item tab_active':'tab_item';
    },
    /**
     * 展示tab标题
     */
    showTitle(index, item) {
      if (index === this.current && this.edit)
         return true;
      else 
         return false;
    },
    showContent(index) {
      return this.current === index;
    },
    /**
     *  不可编辑tab
     */
    noedit(event,item) {
      item.group = event.target.value === ""? item.group:event.target.value;
      this.edit = false;
    },
    /**
     * 选中tab,展示对应内容区域
     */
    handleHeaderClick(index) {
      this.current = index;
    },
    /**
     * tab标签是否可编辑
     */
    handleHeaderDbClick(index) {
      this.handleHeaderClick(index);
      this.edit = true;
    },
    check(event,item){
       if(item.unit === '件'){
           event.target.value = event.target.value.match(/^[1-9]\d{0,2}/) ? event.target.value.match(/^[1-9]\d{0,2}/)[0] : '';
       }
    }
  },
  mounted() {}
};
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
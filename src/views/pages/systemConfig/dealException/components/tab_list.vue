<template>
  <div class="tablists">
    <div class="tabs_header">
      <div class="nav_wrap_scroll">
        <div
          v-for="(item,index) in panels"
          :key="index"
          :class="showClass(item)"
        >
          
          <div v-if="showTitle(item)" class="title"><img src='../image/three.png'> </img><span >{{item.title}}</span></div>
        </div>
      </div>
    </div>
    <div class="tabs_content">
        <slot  name="tab_content"></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: "tablist",
  props: {
    currentTab: {
      type: [String,Number]
    }, //当前选中
    panels:{
      type:Array
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
    showClass(item){
         return  this.current == item.value ? 'tab_item tab_active':'tab_item';
    },
    /**
     * 展示tab标题
     */
    showTitle(item) {
      if (item.value === this.current)
         return true;
      else 
         return false;
    },
    showContent(index) {
      return this.current === index;
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
    },
    check(event,item){
       if(item.unit){
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
       // padding: 0 20px;
        height: 40px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        line-height: 40px;
        display: inline-block;
        list-style: none;
        font-size: 14px;
        font-weight: 500;
        //color: #303133;
        color:#dcdfe6;
        position: relative;
      }
      // .tab_item:first-child{
      //     padding-left: 0;
      // }
      //  .tab_item:last-child{
      //     padding-right: 0;
      // }
      .tab_active{
          z-index: 2;
         // border-bottom:1px solid #2c3e50;
          color: #2c3e50;
      }
    }
    // .nav_wrap_scroll::after {
    //   content: "";
    //   position: absolute;
    //   left: 0;
    //   bottom: 0;
    //   width: 100%;
    //   height: 1px;
    //   background-color: #e4e7ed;
    //   z-index: 1;
    // }
  }
 
}
</style>
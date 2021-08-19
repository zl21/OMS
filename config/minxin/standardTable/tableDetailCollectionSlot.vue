<!--
 * @Author: your name
 * @Date: 2021-06-18 10:08:27
 * @LastEditTime: 2021-08-09 19:15:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /front-standard-product/src/config/minxin/tableDetailCollectionSlot.vue
-->
<template>
  <div class="detail-top">
    <!-- button + 搜索 -->
    <div class="detail-operation">
      <slot name="detail-buttons"></slot>  
      <slot name="detail-search"></slot>
    </div>
    <!-- 表格 -->
    <slot name="detail-table"></slot>
    <!-- 翻页 -->
    <div class="detail-content">
	    <slot name="detail-page"></slot>
    </div>
    <!-- 左右结果展示查询结果 -->
	  <slot name="detail-queryCondition"></slot>
  </div>
</template>
<script>
    
 export default {
    mounted(){
    }
}
</script>
<style lang="less" scoped>
@import '~@burgeon/oms-theme/skin/public.less';
.TableDetailCollection{
  .detail-content {
    height: 40px;
    #bundle > .flex(@justify:center,@align:center)
  }
  .detail-operation{
    #bundle > .flex(@justify:space-between,@align:center);
    // margin-bottom: @base-mr;
  }
}

</style>
<!--
 * @Author: your name
 * @Date: 2021-06-18 10:16:05
 * @LastEditTime: 2021-06-18 13:51:05
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /front-standard-product/src/config/minxin/detailbuttons.vue
-->
<template>
    <div>
        <Button type="primary">{{slotProps.item.name}}</Button>
    </div>
</template>
<script>
 export default {
    props:{
        slotProps:{   // 用来接收子表的按钮数据
          type:Object
        }
    }
}
</script>
<style lang="less">
 @import '~@burgeon/oms-theme/skin/public.less';
 .detail-buttons {
     margin-left: 0 !important;
     display: flex;
     .ark-btn-primary{
         #bundle > .defalutBtn;
         margin-right: @base-mr;
     }
 }
 .verticalTableDetailContent {
    .tabComponent > div {
        overflow: hidden !important;
    }
 }
</style>
/*
 * @Author: your name
 * @Date: 2021-06-18 10:14:53
 * @LastEditTime: 2021-06-18 11:24:25
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /front-standard-product/src/config/minxin/mixin.js
 */
import detailbuttons from './detailbuttons.vue';
import tableDetailCollectionSlot from './tableDetailCollectionSlot';

export default {
  slotArray:{
    detailbuttonsa:detailbuttons //子表按钮的文件
  }, 
  slotTableTemplate:tableDetailCollectionSlot, // 子表渲染的逻辑的文件,
  mounted () {
   
  }
}
/*
 * @Author: your name
 * @Date: 2021-06-18 10:14:53
 * @LastEditTime: 2021-09-15 10:07:27
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /front-standard-product/src/config/minxin/mixin.js
 */
import detailbuttons from './detailbuttons.vue';
import tableDetailCollectionSlot from './tableDetailCollectionSlot.vue';

export default {
  slotArray:{
    detailbuttonsa:detailbuttons //子表按钮的文件
  }, 
  slotTableTemplate:tableDetailCollectionSlot, // 子表渲染的逻辑的文件,
  mounted () {
   
  },
  methods: {
    R3_processColumns(columns){
      columns.forEach(item => {
        // item.thAlign = 'center'
      });
      return columns
    }
  }
}
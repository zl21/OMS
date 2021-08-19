/*
 * @Author: your name
 * @Date: 2021-06-18 13:32:00
 * @LastEditTime: 2021-07-14 19:16:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /project-logic/config/module/page/commodity.config.js
 */
// import combinedCommodity from 'allpages/commodityCenter/combinedCommodity'; // 商品中心-组合福袋商品-新增/详情

/* 2.0: */
// import quicklyGenerate from 'allpages/commodityCenter/quicklyGenerate.vue'; // 快速生成
// import spuRecord from 'allpages/commodityCenter/spuRecord.vue'; // SPU档案
// import skuAddOrEdit from 'allpages/commodityCenter/skuAddOrEdit.vue'; // 商品SKU-新增/详情
// import commodityCusPropertiesAddOrEdit from 'allpages/commodityCenter/commodityCusPropertiesAddOrEdit.vue'; // 商品自定义属性-新增/详情
// import modifyGroup from 'allpages/commodityCenter/modifyGroup.vue'; // 组合商品
// import commodityClassifyAddOrEdit from 'allpages/commodityCenter/commodityClassifyAddOrEdit.vue'; // 商品分类-新增/详情
import i18n from '@burgeon/internationalization/i18n'; // 国际化
export default {
  // 商品中心-组合福袋商品-新增/详情
  COMBINEDCOMMODITY: {
    component: () => import('allpages/commodityCenter/combinedCommodity'),
    // labelName: '组合福袋商品编辑',
    labelName: i18n.t('menu.a6')
  },
  /* 2.0: */
  PS_C_PRO: {
    component: () => import('allpages/commodityCenter/spuRecord.vue'),
    // labelName: '商品SPU',
    labelName: i18n.t('menu.a7')
  },
  PS_C_SKU: {
    component: () => import('allpages/commodityCenter/skuAddOrEdit.vue'),
    // labelName: '商品SKU',,
    labelName: i18n.t('menu.a8')
  },
  PS_C_SKU_QUICKLY_ADD: {
    component: () => import('allpages/commodityCenter/quicklyGenerate.vue'),
    // labelName: 'SKU快速生成',
    labelName: i18n.t('menu.a9')
  },
  BS_C_EXTRA_ATTRIBUTE_DEF_PRO: {
    component: () => import('allpages/commodityCenter/commodityCusPropertiesAddOrEdit.vue'),
    // labelName: '商品自定义属性',
    labelName: i18n.t('menu.aa')
  },
  PS_C_PRO_GROUP: {
    component: () => import('allpages/commodityCenter/modifyGroup.vue'),
    // labelName: '组合商品',
    labelName: i18n.t('menu.ab')
  },
  PS_C_PRO_CLASSIFY: {
    component: () => import('allpages/commodityCenter/commodityClassifyAddOrEdit.vue'),
    // labelName: '商品分类',
    labelName: i18n.t('menu.ac')
  },
}; 

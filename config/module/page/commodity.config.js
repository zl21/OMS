// import combinedCommodity from 'allpages/commodityCenter/combinedCommodity'; // 商品中心-组合福袋商品-新增/详情

/* 2.0: */
// import quicklyGenerate from 'allpages/commodityCenter/quicklyGenerate.vue'; // 快速生成
// import spuRecord from 'allpages/commodityCenter/spuRecord.vue'; // SPU档案
// import skuAddOrEdit from 'allpages/commodityCenter/skuAddOrEdit.vue'; // 商品SKU-新增/详情
// import commodityCusPropertiesAddOrEdit from 'allpages/commodityCenter/commodityCusPropertiesAddOrEdit.vue'; // 商品自定义属性-新增/详情
// import modifyGroup from 'allpages/commodityCenter/modifyGroup.vue'; // 组合商品
// import commodityClassifyAddOrEdit from 'allpages/commodityCenter/commodityClassifyAddOrEdit.vue'; // 商品分类-新增/详情

export default {
  // 商品中心-组合福袋商品-新增/详情
  COMBINEDCOMMODITY: {
    component: () => import('allpages/commodityCenter/combinedCommodity'),
    // component: combinedCommodity,
    labelName: '组合福袋商品编辑',
  },
  /* 2.0: */
  PS_C_PRO: {
    component: () => import('allpages/commodityCenter/spuRecord.vue'),
    // component: spuRecord,
    labelName: 'SPU新增'
  },
  PS_C_SKU: {
    component: () => import('allpages/commodityCenter/skuAddOrEdit.vue'),
    // component: skuAddOrEdit,
    labelName: '商品SKU编辑',
  },
  PS_C_SKU_QUICKLY_ADD: {
    component: () => import('allpages/commodityCenter/quicklyGenerate.vue'),
    // component: quicklyGenerate,
    labelName: 'SKU快速生成'
  },
  BS_C_EXTRA_ATTRIBUTE_DEF: {
    component: () => import('allpages/commodityCenter/commodityCusPropertiesAddOrEdit.vue'),
    // component: commodityCusPropertiesAddOrEdit,
    labelName: '商品自定义属性编辑'
  },
  PS_C_PRO_GROUP: {
    component: () => import('allpages/commodityCenter/modifyGroup.vue'),
    // component: modifyGroup,
    labelName: '组合商品编辑'
  },
  PS_C_PRO_CLASSIFY: {
    component: () => import('allpages/commodityCenter/commodityClassifyAddOrEdit.vue'),
    // component: commodityClassifyAddOrEdit,
    labelName: '商品分类编辑'
  },
}; 

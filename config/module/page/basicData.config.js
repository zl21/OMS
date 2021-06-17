/* 2.0: */
// import logisticsCompanyFilesAddOrEdit from 'allpages/basicData/logisticsCompanyFilesAddOrEdit.vue'; // 物流公司档案-新增/详情
// import addLogicStore from 'allpages/basicData/addLogicStore.vue'; // 逻辑仓新增
// import addAliasOrRegion from 'allpages/basicData/addAliasOrRegion.vue'; // 国家省市区-新增别名/新增区域
// import nationalProvincialMunicipalEdit from 'allpages/basicData/nationalProvincialMunicipalEdit.vue'; // 国家省市区-详情
// import channelStore from 'allpages/basicData/channelStore.vue'; // 渠道仓新增

export default {
  /* 2.0: */
  SHOPAUTHORIZE: {
    component: () => import('@/views/pages/basicData/authorize.vue'),
    labelName: '店铺授权',
  },
  SHOPAUTHORIZEDETAILS: {
    component: () => import('@/views/pages/basicData/authorizeDetails.vue'),
  },
  LOGISTICSCOMPANYFILESADDOREDIT: {
    // component: logisticsCompanyFilesAddOrEdit,
    component: () =>
      import('allpages/basicData/logisticsCompanyFilesAddOrEdit.vue'),
    labelName: '物流公司档案',
  },
  ADDLOGICSTORE: {
    // component: addLogicStore,
    component: () => import('allpages/basicData/addLogicStore.vue'),
    labelName: '新增逻辑仓'
  },
  ADDALIAS: {
    // component: addAliasOrRegion,
    component: () => import('allpages/basicData/addAliasOrRegion.vue'),
    labelName: '新增别名'
  },
  ADDREGION: {
    // component: addAliasOrRegion,
    component: () => import('allpages/basicData/addAliasOrRegion.vue'),
    labelName: '新增区域'
  },
  CP_C_ORG_CHANNEL: {
    // component: channelStore,
    component: () => import('allpages/basicData/channelStore.vue'),
    labelName: '渠道仓档案', // 元数据若配置的是'网页链接'则需前端配置labelName，若是动作定义则不用配置
  },
  NATIONALPROVINCIALMUNICIPALEDIT: {
    // component: nationalProvincialMunicipalEdit,
    component: () =>
      import('allpages/basicData/nationalProvincialMunicipalEdit.vue'),
    labelName: '国家省市区编辑'
  },
}

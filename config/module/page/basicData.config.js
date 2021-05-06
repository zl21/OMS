/* 2.0: */
import logisticsCompanyFilesAddOrEdit from 'allpages/basicData/logisticsCompanyFilesAddOrEdit.vue' // 物流公司档案-新增/详情
import addLogicStore from 'allpages/basicData/addLogicStore.vue' // 逻辑仓新增
import addAliasOrRegion from 'allpages/basicData/addAliasOrRegion.vue' // 国家省市区-新增别名/新增区域
import nationalProvincialMunicipalEdit from 'allpages/basicData/nationalProvincialMunicipalEdit.vue' // 国家省市区-详情
import channelStore from 'allpages/basicData/channelStore.vue' // 渠道仓新增

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
    component: logisticsCompanyFilesAddOrEdit,
    labelName: '物流公司档案编辑',
  },
  ADDLOGICSTORE: {
    component: addLogicStore,
    labelName: '逻辑仓档案新增',
  },
  ADDALIAS: {
    component: addAliasOrRegion,
    labelName: '新增别名',
  },
  ADDREGION: {
    component: addAliasOrRegion,
    labelName: '新增区域',
  },
  CHANNELSTORE: {
    component: channelStore,
    labelName: '渠道仓新增',
  },
  NATIONALPROVINCIALMUNICIPALEDIT: {
    component: nationalProvincialMunicipalEdit,
    labelName: '国家省市区编辑',
  },
}

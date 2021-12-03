/*
 * @Author: your name
 * @Date: 2021-07-20 16:16:43
 * @LastEditTime: 2021-07-21 11:52:42
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /burgeon-project-logic/config/module/page/basicData.config.js
 */
/* 2.0: */
// import logisticsCompanyFilesAddOrEdit from 'allpages/basicData/logisticsCompanyFilesAddOrEdit.vue'; // 物流公司档案-新增/详情
// import addLogicStore from 'allpages/basicData/addLogicStore.vue'; // 逻辑仓新增
// import addAliasOrRegion from 'allpages/basicData/addAliasOrRegion.vue'; // 国家省市区-新增别名/新增区域
// import nationalProvincialMunicipalEdit from 'allpages/basicData/nationalProvincialMunicipalEdit.vue'; // 国家省市区-详情
// import channelStore from 'allpages/basicData/channelStore.vue'; // 渠道仓新增
export default {
  /* 2.0: */
  SHOPAUTHORIZE: {
    component: () => import(
      /* webpackChunkName: 'BasicDataCenterPage' */
      'allpages/basicData/authorize.vue'
    ),
    labelName: $it('form_label.ap'),//店铺授权
  },
  SHOPAUTHORIZEDETAILS: {
    component: () => import(
      /* webpackChunkName: 'BasicDataCenterPage' */
      'allpages/basicData/authorizeDetails.vue'
    ),
  },
  LOGISTICSCOMPANYFILESADDOREDIT: {
    // component: logisticsCompanyFilesAddOrEdit,
    component: () => import(
      /* webpackChunkName: 'BasicDataCenterPage' */
      'allpages/basicData/logisticsCompanyFilesAddOrEdit.vue'
    ),
    labelName: $it('menu.a0'), //物流公司档案
  },
  ADDLOGICSTORE: {
    // component: addLogicStore,
    component: () => import(
      /* webpackChunkName: 'BasicDataCenterPage' */
      'allpages/basicData/addLogicStore.vue'
    ),
    labelName: $it('menu.a1'), //新增逻辑仓
  },
  ADDALIAS: {
    // component: addAliasOrRegion,
    component: () => import(
      /* webpackChunkName: 'BasicDataCenterPage' */
      'allpages/basicData/addAliasOrRegion.vue'
    ),
    labelName: $it('menu.a2'), //新增别名
  },
  ADDREGION: {
    // component: addAliasOrRegion,
    component: () => import(
      /* webpackChunkName: 'BasicDataCenterPage' */
      'allpages/basicData/addAliasOrRegion.vue'
    ),
    labelName: $it('menu.a3'), //新增区域
  },
  CP_C_ORG_CHANNEL: {
    // component: channelStore,
    component: () => import(
      /* webpackChunkName: 'BasicDataCenterPage' */
      'allpages/basicData/channelStore.vue'
    ),
    labelName: $it('menu.a4'), //渠道仓档案  元数据若配置的是'网页链接'则需前端配置labelName，若是动作定义则不用配置
  },
  NATIONALPROVINCIALMUNICIPALEDIT: {
    // component: nationalProvincialMunicipalEdit,
    component: () => import(
      /* webpackChunkName: 'BasicDataCenterPage' */
      'allpages/basicData/nationalProvincialMunicipalEdit.vue'
    ),
    labelName: $it('menu.a5'), //国家省市区编辑
  },
}

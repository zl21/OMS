// 组织中心-员工档案
// import staffRecord from 'branchComponent/page/OrganizationCenter/cp_c_emp';
// 组织中心-伙伴组织
// import partnerOrganization from 'branchComponent/page/OrganizationCenter/cp_c_outorg';
// 组织中心-内部组织
// import innerOrganization from 'branchComponent/page/OrganizationCenter/cp_c_inorg';

// import innerOrganization from 'commonComponent/peiZhi/cp_c_inorg'; // 内部组织
// 组织中心-供应商档案
// import supplierRecord from 'branchComponent/page/OrganizationCenter/cp_c_supplier';
// //组织中心-门店档案
// import wareHouseRecord from 'branchComponent/page/OrganizationCenter/cp_c_warehouse';

import i18n from '@burgeon/internationalization/i18n'; // 国际化
export default {
  // 组织中心-员工档案
  CP_C_EMP: {
    component: () => import(
      /* webpackChunkName: 'OrganizationCenterPage' */
      'branchComponent/page/OrganizationCenter/cp_c_emp'
    ),
    // component: staffRecord,
  },

  // 组织中心-伙伴组织
  CP_C_OUTORG: {
    component: () => import(
      /* webpackChunkName: 'OrganizationCenterPage' */
      'branchComponent/page/OrganizationCenter/cp_c_outorg'
    ),
    // component: partnerOrganization,
  },  

  // 组织中心-内部组织
  CP_C_INORG: {
    component: () => import(
      /* webpackChunkName: 'OrganizationCenterPage' */
      'branchComponent/page/OrganizationCenter/cp_c_inorg'
    ),
    // component: innerOrganization,
  },   

  // 组织中心-供应商档案
  CP_C_SUPPLIER: {
    component: () => import(
      /* webpackChunkName: 'OrganizationCenterPage' */
      'branchComponent/page/OrganizationCenter/cp_c_supplier'
    ),
    // component: supplierRecord,
  },   
  // 组织中心-供应商-门店档案
  CP_C_RSTORE: {
    component: () => import(
      /* webpackChunkName: 'OrganizationCenterPage' */
      'branchComponent/page/OrganizationCenter/cp_c_warehouse'
    ),
    // component: wareHouseRecord,
  },   
};

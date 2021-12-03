/**
 * 监控平台
 */
export default {
  MONITORINGPLATFORM: {
    component: () => import(
      /* webpackChunkName: 'MonitorCenterPage' */
      'allpages/monitorPlatform/monitorPlatform.vue'
    ),
    // labelName: $it('menu.ae')
    labelName: '监控平台',
  },
};

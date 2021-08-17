/**
 * 监控平台
 */
import i18n from '@burgeon/internationalization/i18n'; // 国际化
export default {
  MONITORINGPLATFORM: {
    component: () => import('allpages/monitorPlatform/monitorPlatform'),
    // labelName: i18n.t('menu.ae')
    labelName: '监控平台',
  },
};

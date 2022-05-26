/**
 *
 * @authors Your Name (you@example.org)
 * @date    2017-09-13 15:30:31
 * @version $Id$
 */
import i18n from '../../index.js';

const ChineseDictionary = {
  ONLYREADY: () => `【${i18n.t('messages.switchReadOnlyInterface')}】`,
  REFRESH: () => i18n.t('buttons.refresh'),
  RESETSEARCH: () => `【${i18n.t('buttons.reset')}】`,
  PLEASEENTER: () => '', // 请输入
  PLEASESELECT: () => '', // 请选择
  MORE: () => i18n.t('tips.more'),
  HIDDENCOLUMNS: () => i18n.t('tips.hiddenColumn'),
  SCREEN: () => i18n.t('buttons.filter'),
  RESET: () => i18n.t('buttons.reset'),
  SERIALNUMBER: () => i18n.t('table.index'),
  NODATADISPLAY: () => i18n.t('tips.noData'),
  TOTAL: () => i18n.t('table.summation'),
  AMOUNT: () => i18n.t('table.total'),
  PROMPT: () => i18n.t('feedback.alert'),
  CANCEL: () => i18n.t('buttons.cancel'),
  CONFIRM: () => i18n.t('buttons.confirm'),
  CLOSE: () => i18n.t('buttons.close'),
  ENSURE: () => i18n.t('buttons.confirm'),
  COLLECTIONOFSUCCESS: () => i18n.t('feedback.collectionSuccess'),
  COLLECTIONOFFAILED: () => i18n.t('feedback.collectionFailed'),
  UNCOLLECTIBLE: () => i18n.t('feedback.unfavoriteSuccessfully'),
  CANCELCOLLECTIONFAILED: () => i18n.t('feedback.failedToUnfavorite'),
  MODIFY: () => i18n.t('buttons.modify'),
  ALL: () => i18n.t('tips.all'),
  '@no-permission@': () => i18n.t('messages.noPermissionToAccess'),
  NODATA: () => i18n.t('tips.noData'),
  QUERYCRITERIA: () => i18n.t('tips.queryCondition'),
  NUMBER: () => i18n.t('table.index'),
  IMPORT: () => i18n.t('buttons.import'),
  EXPORT: () => i18n.t('buttons.export'),
  MORESCREENING: () => i18n.t('messages.moreFilters'),
  QUERYCONDITION: () => i18n.t('tips.queryCondition'),
  SCREENCONDITION: () => i18n.t('tips.filterCondition'),
  SEARCH: () => i18n.t('buttons.find'),
  ADDTHECONDITION: () => i18n.t('messages.addCondition'),
  HASBEENSELECTED: () => i18n.t('feedback.selected'),
  SELECTEDRESULTS: () => i18n.t('tips.filterResults'),
  VIEWTHESELECTEDRESULTS: () => i18n.t('messages.viewSelectedResults'),
  PLEASEINPUTAGAIN: () => i18n.t('messages.pleaseEnterAgain'),
  GLOBALSEARCH: () => i18n.t('actions.globalSearch'),
  EXCLUDE: () => i18n.t('actions.exclude'),
  BACK: () => i18n.t('buttons.back'),
  IMPORTTITLE: () => i18n.t('messages.uploadWarning'),
  DOWNTEMPLATE: () => `(${i18n.t('messages.downloadTemplateRemark')})`,
  SELECTFILE: () => i18n.t('buttons.selectFile'),
  FILEMAX: () => i18n.t('messages.fileSizeTip'),
  ERROR: () => i18n.t('feedback.error'),
  WARNING: () => i18n.t('feedback.warning'),
  COLOURSIZESAVE: () => i18n.t('messages.colorSizeSave'),
  COLOUR: () => i18n.t('tips.color'),
  SIZE: () => i18n.t('tips.size'),
  SUBMIT: () => i18n.t('buttons.submit'),
  PAGENAME: () => i18n.t('tips.templateName'),
  POTX: () => i18n.t('messages.saveAsTemplate'),
  SOURCETABLENAME: () => i18n.t('tips.sourceTable'),
  TARGETTABLENVARCHAR: () => i18n.t('tips.targetTable'),
  TARGETDESCRIPTION: () => i18n.t('tips.targetDescription'),
  OriginalStoreWarehouse: () => i18n.t('messages.originalWarehouse'),
  TargetStoreWarehouse: () => i18n.t('messages.targetWarehouse'),
  VIPSTYLE: () => i18n.t('messages.VIPType'),
  EMPTY: () => i18n.t('actions.clear'),
  MATCH: () => i18n.t('actions.match'),
};
 
// 为了保证切换语言包后拿到正确值，此处直接通过劫持属性获取函数返回值。避免再去引用文件中修改变量的使用方法
const ChineseDictionaryProxy = {};
Object.keys(ChineseDictionary).forEach((key) => {
  ChineseDictionaryProxy[key] = '';
  Object.defineProperty(ChineseDictionaryProxy, key, {
    get() {
      return ChineseDictionary[key]();
    },
  });
});
 
export default ChineseDictionaryProxy;

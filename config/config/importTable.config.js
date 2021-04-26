/**
 * 组件说明：
 *  1、用途：
 *    a.用于动作定义类型的导入
 *    b.用于非动作定义类型的导入（即全定制页面）
 *
 *  2、使用方法：
 *    a.动作定义型：
 *        1）判断表名（通过路由）
 *        2）判断webname（通过this.$parent.$parent.objTabActionDialogConfig.webname）
 *    a.非动作定义型：
 *        1）判断表名（通过路由）
 *        2）判断webname（通过this.$parent.$parent.$parent.objTabActionDialogConfig.webname）
 *
 *  3、配置说明（当前文件）：
 *    a.动作定义型：
 *        1) 配置一个key为表名拼接webname的对象：
 *            "tableName__webname":{
 *              isAction:true, // 是否为动作定义类型的，默认true为动作定义
 *              tableName:"", // 表名
 *               tempApi:"", // 下载模板的Api，必须
 *               tempUrl:"", // 下载模板的Url（后端直接给了个下载链接，不需要请求接口的情况）
 *               tempParm:"", // 下载模板的传参数，默认无
 *               okApi:"", // 上传Handel的Api，必须
 *               okParm:"", // 上传Handel的Api，默认无
 *               downErrorInfo:false, // 是否以表格的形式下载错误信息，默认false
 *               showErrorInfo:false, // 是否在当前导入弹框内展示错误信息，默认false
 *               buttonPermission:false, // 是否要控制按钮的disable属性
 *               freshPage:Fn, // 导入成功后刷新页面的操作
 *               importNotes:false, // 是否备注导入，默认false
 *               dontShowDownloadA:false, // 不展示'下载模板'的a标签，默认false
 *            }
 *    b.非动作定义型：
 *        1) 配置一个key为 tableName__webname 的对象：{}
 *        2) 父组件传一个componentData配置项过来
 */

const importConfig = {
  PS_C_SKU__skuImportUpdate: {
    // 商品sku-导入更新
    isAction: true,
    tableName: 'PS_C_SKU',
    webname: 'skuImportUpdate',
    tempApi: '/p/cs/ps/import/v1/sku/template',
    tempParm: null,
    okApi: '/p/cs/ps/import/v1/sku/update',
    okParm: null,
    downErrorInfo: true,
    showErrorInfo: false,
    // freshPage: Fn,
    importNotes: false,
    dontShowDownloadA: false,
  },
  PS_C_SKU__skuImport: {
    // 商品sku-导入
    isAction: true,
    tableName: 'PS_C_SKU',
    webname: 'skuImport',
    tempApi: '/p/cs/ps/import/v1/template',
    okApi: '/p/cs/ps/import/v1/pro',
    downErrorInfo: true,
  },
  PS_C_PRO__spuImportUpdate: {
    // 商品spu-导入更新
    isAction: true,
    tableName: 'PS_C_PRO',
    webname: 'spuImportUpdate',
    tempApi: '/p/cs/ps/import/v1/spu/template',
    okApi: '/p/cs/ps/import/v1/pro/update',
    downErrorInfo: true,
  },
  PS_C_PRO__spuImport: {
    // 商品spu-导入
    isAction: true,
    tableName: 'PS_C_SKU',
    webname: 'skuImport',
    tempApi: '/p/cs/ps/import/v1/template',
    okApi: '/p/cs/ps/import/v1/pro',
    downErrorInfo: true,
  },
  PS_C_PRO_GROUP__ordinaryGroupImport: {
    // 普通组合商品导入-普通商品导入
    isAction: true,
    tableName: 'PS_C_PRO_GROUP',
    webname: 'ordinaryGroupImport',
    tempApi: '/p/cs/ps/import/v1/groupSku/template',
    okApi: '/p/cs/ps/import/v1/group',
    downErrorInfo: true,
  },
  PS_C_PRO_GROUP__luckGroupImport: {
    // 普通组合商品导入-福袋商品导入
    isAction: true,
    tableName: 'PS_C_PRO_GROUP',
    webname: 'luckGroupImport',
    tempApi: '/p/cs/ps/import/v1/luckySku/template',
    okApi: '/p/cs/ps/import/v1/luckygroup',
    downErrorInfo: true,
  }
};
export default importConfig;
## 导入组件的使用说明

### 一. 配置项说明

```
 *    a.动作定义型：
 *        1) 配置一个key为表名拼接webname的对象：
 *            "tableName__webname":{
 *               isAction:true, // 是否为动作定义类型的，默认true为动作定义
 *               tableName:"", // 表名
 *               tempApi:"", // 下载模板的Api，必须
 *               tempUrl:"", // 下载模板的Url（后端直接给了个下载链接，不需要请求接口的情况）
 *               tempParm:"", // 下载模板的传参数，默认无
 *               downApi:"", // 上传Handel的Api，必须
 *               downParm:"", // 上传Handel的Api，默认无
 *               downErrorInfo:false, // 是否以表格的形式下载错误信息，默认false
 *               showErrorInfo:false, // 是否在当前导入弹框内展示错误信息，默认false
 *               buttonPermission:false, // 是否要控制按钮的disable属性
 *               freshPage:Fn, // 导入成功后刷新页面的操作
 *               importNotes:false, // 是否备注导入，默认false
 *               dontShowDownloadA:false, // 不展示'下载模板'的a标签，默认false
 *            }
 *    b.非动作定义型：
 *        1) 通过父组件传一个componentData对象
 *        2) 对象的属性同上
```

### 二. 使用说明

- #### 使用场景一：标准动作定义型导入
`index.js文件中`
1. 定义配置项，如：

```
const importConfig = {
  V_CP_C_REGION_ALIAS__regionImport: {
    // 国家省市区-导入
    isAction: true,
    tableName: 'V_CP_C_REGION_ALIAS',
    webname: 'regionImport',
    tempApi: '/r3-cp/p/cs/cp/import/v1/region/template',
    downApi: '/r3-cp/p/cs/cp/import/v1/region/import',
    downErrorInfo: true,
  },
}
```
2. 传如配置项，如：
```
import CustomConfig from 'burgeonConfig/customized.config';
CustomConfig.editCusImport(importTableConfig);
```

- #### 使用场景二：全定制页面的导入
`组件文件中（A.vue）`
1. 引入组件：
```
import businessDialog from 'professionalComponents/businessDialog';
```
2. 注册：
```
components: {
    businessDialog,
},
```
3. data中定义importTable：

```
importTable: {
    refFuns: 'confirmFun',
    confirmTitle: '条件信息导入',
    titleAlign: 'center', // 设置标题是否居中 center left
    width: '600',
    scrollable: false, // 是否可以滚动
    closable: true, // 是否可以按esc关闭
    draggable: true, // 是否可以拖动
    mask: true, // 是否显示遮罩层
    maskClosable: true, // 是否可以点击叉号关闭
    transfer: true, // 是否将弹层放在body内
    name: 'importTable', // 组件名称
    basePathName: 'business-components',
    url: 'importTable',
    keepAlive: true,
    excludeString: 'importTable', // 将name传进去，确认不缓存
    componentData: {},
 },
```
4. method中定义按钮点击事件：

```
methods: {
    importData() {
      const componentData = {
        isAction: false,
        tableName: 'ORDER',
        webname: 'import',
        tempApi: '/p/cs/ps/import/v1/sku/template',
        tempParm: null,
        downApi: '/p/cs/ps/import/v1/sku/update',
        downParm: null,
        downErrorInfo: true,
        showErrorInfo: false,
        // freshPage: Fn,
        importNotes: false,
        dontShowDownloadA: false,
      }
      this.importTable.componentData = componentData;
      this.$children.find((item) => item.name === 'importTable').openConfirm();
    },
```
5. 使用组件：
```
<businessDialog
  :closable="importTable.closable"
  :component-data="importTable.componentData"
  :draggable="importTable.draggable"
  :exclude-string="importTable.excludeString"
  :keep-alive="importTable.keepAlive"
  :mask="importTable.mask"
  :mask-closable="importTable.maskClosable"
  :name="importTable.name"
  :scrollable="importTable.scrollable"
  :title="importTable.confirmTitle"
  :title-align="importTable.titleAlign"
  :transfer="importTable.transfer"
  :base-path-name="importTable.basePathName"
  :url="importTable.url"
  :width="importTable.width"
  :basePathName="importTable.basePathName"
/>
<button class="white" @click="importData">导入</button>
```

------------

&copy;撰写：zhou.l@burgeon.cn
## Extends-Api

#### 介绍

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;@burgeon/extends-api 扩展化 API;
　　为了更高效地管理及更便捷地完成项目的配置，特向项目组提供此配置项。

#### 引入

import CustomConfig from 'burgeonConfig/customized.config.js'

> 提示：burgeonConfig 源于依赖包@burgeon/extends-api"，在使用前请确保项目已经安装了相关依赖。

#### Usage Example

```
// 引入配置
import CustomConfig from 'burgeonConfig/config.ex';

// 修改定制弹窗界面配置项
CustomConfig.editCusModalConfig({ CHANNELINVENTORY:{
  component: () => import('@/views/modal/inventoryCenter/channelInventory.vue'),
}})

// 修改订单管理专用label配置项
CustomConfig.editCusLabelList([{
  label: '待审核',
  value: '1',
  isShow: true
}])

R3.launchApplication({
    externalModules: CustomConfig.cusPageConfig, // 自定义界面
    externalModals: CustomConfig.cusModalConfig, // 自定义弹框
    ...
});
```

#### Properties

> 提示：由于默认配置项较多，在此不作举例，请在项目中打印查看。

| Name                                   | Type   | Description                  | Default Value |
| -------------------------------------- | ------ | ---------------------------- | ------------- |
| CustomConfig.cusPageConfig             | Object | 自定义界面配置项             | {}            |
| CustomConfig.cusModalConfig            | Object | 定制弹窗界面配置项           | {}            |
| CustomConfig.cusExternalTreeDatas      | Object | 树结构配置项                 | {}            |
| CustomConfig.cusService                | Object | 接口配置项                   | {}            |
| CustomConfig.cusLabelList              | Array  | 订单管理专用 label 配置项    | []            |
| CustomConfig.cusOrderLogo              | Object | orderLogo 配置项             | {}            |
| CustomConfig.cusWaterMarkConfig        | Object | 水印配置项                   | {}            |
| CustomConfig.cusFilterUrlConfig        | Object | 过滤报错接口配置项           | {}            |
| CustomConfig.filterUrlForNetworkScript | Object | 过滤报错接口配置项的脚本     | {}            |
| CustomConfig.connector                 | Object | 订单详情-半定制-配置项       | {}            |
| CustomConfig.cusImport                 | Object | 导入接口、下载模板的模板地址 | {}            |
| CustomConfig.cusDownLoadAllConfig      | Object | downLoadAll 组件的配置项     | {}            |

#### Methods

| Name                                | Type     | Description                                                                        |
| ----------------------------------- | -------- | ---------------------------------------------------------------------------------- |
| CustomConfig.editCusModalConfig     | Function | 用于编辑定制弹窗配置项的方法，接收一个参数( {} )<br/>1.参数为要修改的目标配置项    |
| CustomConfig.editCusPageConfig      | Function | 用于编辑定制页面配置项的方法，接收一个参数( {} )<br/>1.参数为要修改的目标配置项    |
| CustomConfig.cusExternalTreeDatas   | Function | 用于编辑树结构配置项的方法，接收一个参数( {} )<br/>1.参数为要修改的目标配置项      |
| CustomConfig.editCusService         | Function | 用于编辑接口配置项的方法，接收一个参数( {} )<br/>1.参数为要修改的目标配置项        |
| CustomConfig.editCusLabelList       | Function | 用于编辑 Label 配置项的方法，接收一个参数( [] )<br/>1.参数为要修改的目标配置项     |
| CustomConfig.editCusOrderLogo       | Function | 用于编辑 OrderLogo 配置项的方法，接收一个参数( {} )<br/>1.参数为要修改的目标配置项 |
| CustomConfig.editCusWaterMarkConfig | Function | 用于编辑水印配置项的方法，接收一个参数( {} )<br/>1.参数为要修改的目标配置项        |
| CustomConfig.editCusFilterUrlConfig | Function | 用于编辑 FilterUrl 配置项的方法，接收一个参数( {} )<br/>1.参数为要修改的目标配置项 |
| CustomConfig.editConnector          | Function | 用于修改配置项的方法，接收一个参数( {} )<br/>1.参数为要修改的目标配置项            |
| CustomConfig.editCusImport          | Function | 用于修改配置项的方法，接收一个参数( [] )<br/>1.参数为要修改的目标配置项            |
| CustomConfig.editDownLoadAllConfig  | Function | 用于修改配置项的方法，接收一个参数( {} )<br/>1.参数为要修改的目标配置项            |

#### Extends-Api 版本说明

| Version | Description                                   |
| ------- | --------------------------------------------- |
| v1.0.0  | 初始化 API                                    |
| v1.0.1  | 首封装测试                                    |
| v1.0.2  | service 引用修改                              |
| v1.0.3  | 新增一些配置项                                |
| v1.0.4  | modify CC to CustomConfig                     |
| v1.0.5  | add 下载模板及确认导入的 Api 配置             |
| v1.0.6  | add filterUrlForNetworkScript 配置            |
| v1.0.7  | add downLoadAll.config 配置                   |
| v1.0.9  | add R3.launchApplication.globalComponent 配置 |
| v1.0.10 | add R3.launchApplication.image 配置           |
| v1.0.11 | add 初始化项目配置                            |
| v1.0.12 | add btnConfig/commonUtils……                   |
| v1.0.13 | add importTableConfig                         |
| v1.0.14 | editCusPageConfig 方法优化                    |
| v1.0.16 | 物流单号解析配置删除接口联调                    |

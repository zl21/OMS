#  project-logic

## 介绍
   

@burgeon/project-logic 是伯俊公司电商项目中标准化逻辑库, 包括各项目标准界面中定制需求开发，是一套较为完整的订单管理系统；
秉承前端项目工程化的思想, 独立模块依赖包便于后期迭代维护。提供：
 - 八大中心、两个平台、一个系统配置；[预览](http://139.224.134.69:58000)
 - 可以通过项目内的配置文件进行配置；
 - 可以通过包体中的API进行扩展。

## 安装
1.  新增.npmrc文件配置：
```javascript
registry=https://registry.npm.taobao.org/
@burgeon:registry=https://packages.aliyun.com/60583434ff5718e91a64f406/npm/npm-registry/
_auth=NjA1MDdlMDJjNDFmNWMzNmRiNjA2YjM5OlhxWkpIOXM1QmU3Tg==
always-auth=true
```

2. 安装: 
```javascript
npm install @burgeon/project-logic
```

## 基本配置

 - 可在项目的入口文件中使用注入 node_Module 依赖包的方式进行注入并挂载, 即可全局使用;

 - 可在项目单文件中使用 import 方式进行局部引入使用, 实现按需加载, 近而减少包体;
 - webpack配置：
```javascript
	'@': path.resolve(__dirname, 'node_modules/@burgeon/project-logic/'),
	_: path.resolve(__dirname, './src'),
	commonPage: path.resolve(__dirname, './src/commonPages'),
	libs: path.resolve(__dirname, 'node_modules'),
	allpages: path.resolve(__dirname, 'node_modules/@burgeon/project-logic/views/pages'),
	burgeonConfig: path.resolve(__dirname, 'node_modules/@burgeon/project-logic/config'),
	framework: path.resolve(__dirname, 'node_modules/@syman/burgeon-r3-components/r3.publish/src'),
	professionalComponents: path.resolve(__dirname, 'node_modules/@burgeon/business-components'),
	omsTheme: path.resolve(__dirname, 'node_modules/@burgeon/oms-theme/skin')
```
 - 引入示范：
`import OMS from 'burgeonConfig/customized.config.js'`

***Tips：***
> 1. project-logic依赖于"@burgeon/business-components"、"@burgeon/oms-theme"、"@burgeon/internationalization"， 在使用前请确保项目已经安装了相关依赖；
> ```npm install @burgeon/business-components @burgeon/oms-theme @burgeon/internationalization```
> 2. burgeonConfig是在项目webpack中对依赖包"@burgeon/project-logic"设置的别名，在使用前请确保项目已经完成了相关配置。

## Properties
| Name |  Type  |   Description  |  Default Value  |  Use Example |
| :--- | --- | :--- | --- | :--- |
| $store   |  Object   |  全局状态管理   | ··  |
| $omsUtils   |  Class   |  封装的一些方法集   |  ··  |  [$omsUtils](http://share.ark.burgeononline.com/repository/entryComponents/2/907859/2/2061/P)  |
| $i18n   |  Object   |  国际化   |  ··  | [$i18n](http://101.132.182.36:20000/) 
| BtnConfig   |  Class   |  项目动作定义Handel   |  ··  | [BtnConfig](http://share.ark.burgeononline.com/repository/entryComponents/2/926404/1/2061/P)
| .cusPageConfig   |  Object   |  自定义界面配置项   |  {}  | $OMS2.cusPageConfig
| .cusModalConfig     |  Object   |  定制弹窗界面配置项  |  {}  | ``
| .cusExternalTreeDatas       |  Object   | 树结构配置项    |  ··  | [左树右表配置](http://share.ark.burgeononline.com/repository/entryComponents/2/908055/1/2061/P)
| .cusService       |  Object   | 接口配置项    |  {}  | ``
| .cusLabelList       |  Array   | 订单管理专用label配置项    |  []  | ``
| .cusOrderLogo       |  Object   | orderLogo配置项    |  {}  | ``
| .cusWaterMarkConfig       |  Object   | 水印配置项    |  {}  | ``
| .cusFilterUrlConfig       |  Object   | 过滤报错接口配置项    |  {}  | ``
| .connector       |  Object   | 订单详情-半定制-配置项    |  {}  | ``

***Tips：***
> 由于默认配置项较多，在此不作举例，请在项目中打印查看。
> eg.`console.log(OMS);`

## API
| Name |  Type  |   Description  |
| :--- | --- | :--- |
| editCusModalConfig             |  Function     | 用于编辑定制弹窗配置项的方法，接收一个参数( {} )<br/>1.参数为要修改的目标配置项  |
| editCusPageConfig             |  Function     | 用于编辑定制页面配置项的方法，接收一个参数( {} )<br/>1.参数为要修改的目标配置项  |
| cusExternalTreeDatas             |  Function     | 用于编辑树结构配置项的方法，接收一个参数( {} )<br/>1.参数为要修改的目标配置项  |
| editCusService             |  Function     | 用于编辑接口配置项的方法，接收一个参数( {} )<br/>1.参数为要修改的目标配置项  |
| editCusLabelList             |  Function     | 用于编辑Label配置项的方法，接收一个参数( [] )<br/>1.参数为要修改的目标配置项  |
| editCusOrderLogo             |  Function     | 用于编辑OrderLogo配置项的方法，接收一个参数( {} )<br/>1.参数为要修改的目标配置项  |
| editCusWaterMarkConfig             |  Function     | 用于编辑水印配置项的方法，接收一个参数( {} )<br/>1.参数为要修改的目标配置项  |
| editCusFilterUrlConfig             |  Function     | 用于编辑FilterUrl配置项的方法，接收一个参数( {} )<br/>1.参数为要修改的目标配置项  |
| editConnector             |  Function     | 用于修改配置项的方法，接收一个参数( {} )<br/>1.参数为要修改的目标配置项  |

## Usage Example
```javascript
// 项目入口文件

import CC from 'burgeonConfig/customized.config.js'; // 引入配置
console.log(CC);

// 修改定制弹窗界面配置项
CC.editCusModalConfig({ CHANNELINVENTORY:{
  component: () => import('@/views/modal/inventoryCenter/channelInventory.vue'),
}})

// 修改订单管理专用label配置项
CC.editCusLabelList([{
  label: '待审核',
  value: '1',
  isShow: true
}])

R3.launchApplication({
    externalModules: CC.cusPageConfig, // 自定义界面
    externalModals: CC.cusModalConfig, // 自定义弹框
    ...
});
```

## 包体结构说明 [🔗](http://share.ark.burgeononline.com/repository/entryComponents/2/941888/1/2061/P)



## 版本说明
|  Version  |  Description  |
|  ---  | --- |
| v1.0.0 |  初始化API   |
| v1.0.1 |  首封装测试   |
| v1.0.2 |  service引用微调   |
| v1.0.3 |  新增一些配置项   |


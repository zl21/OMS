# project-logic

#### 介绍

@burgeon/project-logic 是伯俊公司电商项目中标准化逻辑库, 包括各电商项目标准界面中定制需求开发;

秉承前端项目工程化的思想, 独立模块依赖包便于后期迭代维护;

#### 安装教程

一. 简易化安装依赖:

1.  命令行: npm install @burgeon/project-logic --registry http://47.102.123.140:4873;

2.  优缺点:

    优点: 简单易用,不用切源;

    缺点: 单行命令过多;

二. nrm 安装依赖:

1.  命令行:

    npm install nrm -g;

    nrm add XXX http://47.102.123.140:4873;

    nrm use XXX;

    npm install @burgeon/project-logic;

2.  优缺点:

    优点: 引入 nrm 管理依赖包来源; 多源情景下切源方便;

    缺点: 初期命令行相应较多;

#### 使用说明

1. 可在项目的入口文件中使用注入 node_Module 依赖包的方式进行注入并挂载, 即可全局使用;

2. 可在项目单文件中使用 import 方式进行局部引入使用, 实现按需加载, 近而减少包体;

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

#### project-logic 版本说明

| Version  | Description                                                                                      |
| -------- | ------------------------------------------------------------------------------------------------ |
| v1.0.0   | 初始化标准化逻辑库                                                                               |
| v1.0.1   | 初始化共用逻辑模块                                                                               |
| v1.0.2   | 架构逻辑模块移入逻辑库                                                                           |
| v1.0.3   | 修改引用别名@/views/pages->allpages                                                              |
| v1.0.4   | 移入系统配置静态资源                                                                             |
| v1.0.5   | 统一替换 loading 引用                                                                            |
| v1.0.6   | 去掉 loading 引用                                                                                |
| v1.0.7   | 修复引用 bug;                                                                                    |
| v1.0.8   | 移除 loading 文件                                                                                |
| v1.0.9   | 修复 importTable 弹窗路径问题                                                                    |
| v1.0.10  | 调用局部弹窗 loading                                                                             |
| v1.0.11  | button/input 样式调整                                                                            |
| v1.0.12  | datePiker/page 样式调整                                                                          |
| v1.0.13  | 优化 try... catch... finally 逻辑及写法                                                          |
| v1.0.14  | 迁移动态配置按钮 Handler 方法模块                                                                |
| v1.0.15  | 优化配置按钮 Handler 方法模块                                                                    |
| v1.0.16  | 优化 ordermanager 列表配置按钮 Handler 方法模块                                                  |
| v1.0.17  | 迁移下拉菜单配置按钮                                                                             |
| v1.0.18  | 优化下拉菜单配置按钮 Handler 方法模块                                                            |
| v1.0.19  | bug: 由于屏幕变化导致的表格选中数据消失问题                                                      |
| v1.0.20  | 合并 Extends-Api                                                                                 |
| v1.0.21  | 修改 table 计算方法                                                                              |
| v1.0.22  | 优化公用 date 格式化方法                                                                         |
| v1.0.23  | 优化代码结构, 迁移自定义导出模块                                                                 |
| v1.0.24  | Extends-Api v1.0.7                                                                               |
| v1.0.25  | 删除不完整 async await 异步用法                                                                  |
| v1.0.26  | 修复订单管理导出 bug;                                                                            |
| v1.0.27  | 新增退换货单配置按钮 Handler 方法模块;                                                           |
| v1.0.28  | 新增（路由跳转）公共方法,修改引用;                                                               |
| v1.0.29  | 修改路由跳转公共方法;                                                                            |
| v1.0.30  | 订单操作按钮校验方法修改;                                                                        |
| v1.0.31  | 新增退换货单详情（新增）配置按钮 Handler 方法模块;                                               |
| v1.0.32  | 完善零售发货单（详情）配置按钮 Handler 方法模块;                                                 |
| v1.0.33  | 添加校验配置公用模块;                                                                            |
| v1.0.34  | 添加导航主模块功能方法;                                                                          |
| v1.0.35  | 优化代码写法,添加弹窗模块配置方法;                                                               |
| v1.0.36  | 兼容单对象页面方法调用;                                                                          |
| v1.0.37  | 退货入库列表/详情（新增）配置按钮 Handler 方法模块;                                              |
| v1.0.38  | 跳转页面方法优化                                                                                 |
| v1.0.39  | 迁移优化定制弹窗配置处理;                                                                        |
| v1.0.40  | 统一定制页面 loading,换掉框架 loading 方法（无法支持局部）;                                      |
| v1.0.41  | 替换所有 loading;                                                                                |
| v1.0.42  | 添加库存中心按钮配置方法;                                                                        |
| v1.0.43  | 修改特定下载组件(JIT);                                                                           |
| v1.0.44  | 优化跳转方法;                                                                                    |
| v1.0.45  | 删除覆盖变量;                                                                                    |
| v1.0.46  | 促销中心的状态初始化方法放到列表页/部分样式优化;                                                 |
| v1.0.47  | Extends-Api v1.0.8                                                                               |
| v1.0.48  | 版本已用                                                                                         |
| v1.0.49  | Extends-Api v1.0.9                                                                               |
| v1.0.50  | Extends-Api v1.0.10                                                                              |
| v1.0.51  | index.less 优化                                                                                  |
| v1.0.52  | Extends-Api v1.0.11 登录页网关处理                                                               |
| v1.0.53  | 修改已有 bug                                                                                     |
| v1.0.54  | login 页面更换                                                                                   |
| v1.0.55  | login -- 修改网关                                                                                |
| v1.0.56  | login -- 样式微调                                                                                |
| v1.0.57  | login -- 替换 iconfont                                                                           |
| v1.0.58  | login -- 修改错别字                                                                              |
| v1.0.59  | login -- 优化登录逻辑代码                                                                        |
| v1.0.60  | 解决 getAppTitle 重复调用                                                                        |
| v1.0.61  | 新增 WaringModal 弹窗配置类                                                                      |
| v1.0.62  | 去除框架包里的 getAppTitle 设置                                                                  |
| v1.0.63  | 临时回滚代码                                                                                     |
| v1.0.64  | 优化订单管理代码                                                                                 |
| v1.0.65  | 按钮组件配置 typeAll 设置为 default                                                              |
| v1.0.66  | Extends-Api v1.0.12                                                                              |
| v1.0.67  | 修复引用路径 bug                                                                                 |
| v1.0.68  | 重构 InitAppConfig 类及引用方法                                                                  |
| v1.0.70  | 手动拼接网关                                                                                     |
| v1.0.71  | 手动拼接网关-修改                                                                                |
| v1.0.72  | 手动拼接网关-修改                                                                                |
| v1.0.74  | 迁移-basicData/commodityCenter                                                                   |
| v1.0.75  | 迁移下载组件(downLoadAll)配置\*2                                                                 |
| v1.0.76  | page/modal 配置                                                                                  |
| v1.0.77  | 修改样式引入文件                                                                                 |
| v1.0.78  | spu->sku 数据初始化                                                                              |
| v1.0.79  | Extends-Api v1.0.13 &&商品中心、基础数据添加自动判断网关前缀;                                    |
| v1.0.80  | 树结构接口网关特殊处理                                                                           |
| v1.0.81  | Extends-Api v1.0.14                                                                              |
| v1.0.82  | 调整订单公用方法;                                                                                |
| v1.0.83  | bug:35942                                                                                        |
| v1.0.84  | bug:35955                                                                                        |
| v1.0.85  | 上传图片 url 网关配置                                                                            |
| v1.0.86  | addPlatformLogisticsCompany 样式调整                                                             |
| v1.0.87  | $OMS2.omsUtils.formItemDisable-方法优化                                                          |
| v1.0.88  | 组合商品业务代码修改                                                                             |
| v1.0.89  | commonUtils 方法注释&优化                                                                        |
| v1.0.90  | BurgeonEvent 定制事件配置类                                                                      |
| v1.0.91  | bug:35572                                                                                        |
| v1.0.92  | bug:35636                                                                                        |
| v1.0.93  | 逻辑仓表格样式处理                                                                               |
| v1.0.94  | sku-select 类型变量监听优化(涉及 initFormConfig) & loading 替换                                  |
| v1.0.95  | 组合商品查询提示隐藏                                                                             |
| v1.0.96  | 统一替换 loading(basicData/commodityCenter)                                                      |
| v1.0.97  | 定制界面详情折叠面板 -- 特殊布局（左右）修改 ｜ oms_index.less 更新                              |
| v1.0.98  | 退换货单事件整理;                                                                                |
| v1.0.99  | ----;                                                                                            |
| v1.0.100 | 逻辑仓新增保存,仓库类型不能为空;                                                                 |
| v1.1.0   | 修改接口平台淘宝订单下载 ｜ ;                                                                    |
| v1.1.1   | 优化接口平台淘宝订单下载 ｜ ;                                                                    |
| v1.1.2   | 迁移退换货单方法 ｜ ;                                                                            |
| v1.1.3   | 按钮权限接口替换                                                                                 |
| v1.1.4   | 按钮样式修改                                                                                     |
| v1.1.5   | 按钮权限请求方法修改                                                                             |
| v1.1.6   | 按钮权限请求数据压缩处理                                                                         |
| v1.1.7   | sku 改造                                                                                         |
| v1.1.8   | 筛选排序按钮配置                                                                                 |
| v1.1.9   | sku 改造-初始化+保存                                                                             |
| v1.1.10  | sku 改造-数据回显及 spu 跳转 sku bug                                                             |
| v1.1.11  | 商品分类改造                                                                                     |
| v1.1.12  | sku 必填渲染问题                                                                                 |
| v1.0.13  | login 图片压缩替换                                                                               |
| v1.1.14  | form 必填渲染优化                                                                                |
| v1.1.15  | 三级按钮参数处理改造                                                                             |
| v1.1.16  | drp-clear 配置,initFormConfig 方法优化                                                           |
| v1.1.17  | 零售发货单详情-组件修改                                                                          |
| v1.1.18  | 快速生成页面补充国际化对象                                                                       |
| v1.1.19  | 增加策略中心》店铺策略树状接口请求                                                               |
| v1.1.20  | 零售发货单详情 -- 明细弹框配置修改 ｜ dialogs.config 方法修改                                    |
| v1.1.21  | 返回刷新列表,back:true                                                                           |
| v1.1.22  | 零售发货单异常处理 and 零售发货单详情更新                                                        |
| v1.1.23  | addAliasOrRegion 保存关闭当前界面                                                                |
| v1.1.24  | 异常处理弹窗代码迁移                                                                             |
| v1.1.25  | HOLD/取消 HOLD 单                                                                                |
| v1.1.26  | 逻辑仓新增备注字段修改                                                                           |
| v1.1.27  | 零售发货单详情-修改地址接口                                                                      |
| v1.1.28  | splitServiceID 标准接口拼接网关前缀                                                              |
| v1.1.29  | 修复 addressError 引用报错 fkinput                                                               |
| v1.1.30  | 异常处理清空逻辑                                                                                 |
| v1.1.31  | 修复 addressError 引用报错 fkinput                                                               |
| v1.1.32  | commonUtils 两个对象相同 key 快速赋值                                                            |
| v1.1.33  | SKU 外键关联配置                                                                                 |
| v1.1.34  | 异常入参更改                                                                                     |
| v1.1.35  | 异常入参更改 1                                                                                   |
| v1.1.36  | 批量 HOLD 单                                                                                     |
| v1.1.37  | 零售发货单详情渲染                                                                               |
| v1.1.38  | 批量取消 HOLD 单                                                                                 |
| v1.1.39  | 零售发货单详情修改                                                                               |
| v1.1.40  | 零售发货单详情修改                                                                               |
| v1.1.41  | 修改报错                                                                                         |
| v1.1.42  | 零售发货单-售后复制                                                                              |
| v1.1.43  | transformForm 方法优化                                                                           |
| v1.1.44  | 零售发货单详情 -- 修改地址                                                                       |
| v1.1.45  | 零售发货单详情优化                                                                               |
| v1.1.46  | 零售发货单详情 -- 保留小数点后两位                                                               |
| v1.1.47  | 零售发货单详情 -- 修改地址 api 路径修改                                                          |
| v1.1.48  | commonUtils-导航跳转处理拓展 isback                                                              |
| v1.1.49  | bug:37139                                                                                        |
| v1.1.50  | 订单详情保留两位小数 ｜ 弹框样式修改 ｜ 添加公共方法（保留两位小数，不足补 0）                   |
| v1.1.51  | SPU 界面隐藏掉启用状态表单                                                                       |
| v1.1.52  | 订单中心接口地址调用公共方法                                                                     |
| v1.1.53  | downApi->okApi,downParm->okParm                                                                  |
| v1.1.54  | 零售发货单导入可配置                                                                             |
| v1.1.55  | 订单列表-hold 单修复                                                                             |
| v1.1.56  | 优化代码 npm link 本地联调                                                                       |
| v1.1.57  | 淘宝订单-下载修改参数 ｜ 零售发货单详情表格定高度                                                |
| v1.1.58  | 修改按钮处理集合方法                                                                             |
| v1.1.59  | 零售发货单详情 - 字段修改 ｜ 明细按钮修改                                                        |
| v1.1.60  | 零售发货单详情 - 添加修改备注图标                                                                |
| v1.1.61  | 零售发货单详情 - 添加明细操作按钮修改 ｜ 弹框迁移                                                |
| v1.1.62  | subTable 应用                                                                                    |
| v1.1.63  | validator 校验器更新                                                                             |
| v1.1.64  | npm link 前置工作(npmrc/gitignore……)                                                             |
| v1.1.65  | 订单取消,审核反审核结构修改                                                                      |
| v1.1.66  | 详情 - 明细添加新增修改                                                                          |
| v1.1.67  | 详情 - 修改地址添加提示                                                                          |
| v1.1.68  | 列表-修改卖家备注                                                                                |
| v1.1.69  | 接口迁移、网关处理                                                                               |
| v1.1.70  | strategyPlatform 接口迁移                                                                        |
| v1.1.71  | strategyPlatform 接口迁移                                                                        |
| v1.1.72  | 档期日程规划接口 url                                                                             |
| v1.1.73  | 增加策略中心的接口                                                                               |
| v1.1.74  | 增加策略中心的接口                                                                               |
| v1.1.75  | 策略中心接口 qs                                                                                  |
| v1.1.76  | hold 策略接口添加                                                                                |
| v1.1.77  | 详情-订单金额计算修改                                                                            |
| v1.1.78  | 直播解析策略接口                                                                                 |
| v1.1.79  | hold 策略接口添加                                                                                |
| v1.1.80  | modifyLogistics                                                                                  |
| v1.1.81  | 零售发货单列表取消订单                                                                           |
| v1.1.82  | 修改格式错误                                                                                     |
| v1.1.83  | changeWarehouse                                                                                  |
| v1.1.84  | $network 自定义网关                                                                              |
| v1.1.85  | 零售发货单详情 -- 修改如果明细是组合商品则明细不可切换                                           |
| v1.1.86  | cancelHoldOrderHandler 入参及错误信息处理                                                        |
| v1.1.87  | 增加物流派送范围查询公司是否可用                                                                 |
| v1.1.88  | cancelHoldOrderHandler 报错处理                                                                  |
| v1.1.89  | hold 单/取消 hold 单失败处理                                                                     |
| v1.1.90  | 改仓库/物流 bug 修复                                                                             |
| v1.1.91  | 增加零售发货单批量定制弹窗逻辑                                                                   |
| v1.1.92  | 修改零售发货单 key                                                                               |
| v1.1.93  | 售后复制修复                                                                                     |
| v1.1.93  | 售后复制修复                                                                                     |
| v1.1.94  | cancelHoldOrderHandler 批量操作入参调整                                                          |
| v1.1.95  | 零售发货单详情 -- 添加修改备注                                                                   |
| v1.1.96  | 列表-改仓库/物流样式调整                                                                         |
| v1.1.97  | 页面引入配置修改为 import 动态加载方法                                                           |
| v1.1.98  | cancelOrderHandler-入参修改                                                                      |
| v1.1.99  | 迁移店铺授权，完善零售发货单批量操作的弹窗                                                       |
| v1.2.0   | initFormConfig 复杂类型 isnotnull 默认 false                                                     |
| v1.2.1   | funBtn webname 补充                                                                              |
| v1.2.2   | changeWarehouse 入参调整                                                                         |
| v1.2.3   | 迁移 4 个策略定制页面                                                                            |
| v1.2.4   | changeWarehouse/modifyLogistics 入参协议变更整                                                   |
| v1.2.5   | cancelMergeOrderHandler 取消合并异常 loading                                                     |
| v1.2.6   | 迁移策略定制页面                                                                                 |
| v1.2.7   | funBtn-批量操作判断                                                                              |
| v1.2.8   | 新增/复制迁移                                                                                    |
| v1.2.9   | labelName、drp 必填等属性                                                                        |
| v1.2.10  | 必要的 labelName 补充 (元数据若配置的是'网页链接'则需前端配置 labelName，若是动作定义则不用配置) |
| v1.2.11  | holdOrderDialog 批量操作入参调整                                                                 |
| v1.2.12  | 取消 hold 单 tips                                                                                |
| v1.2.13  | 增加零售发货单的批量操作按钮                                                                     |
| v1.2.14  | 取消 hold 单新增一个 options                                                                     |
| v1.2.15  | 调整零售发货单，批量按钮逻辑                                                                     |
| v1.2.16  | 零售发货单详情-订单明细 添加新增/删除/替换功能                                                   |
| v1.2.17  | 修改零售发货单的入参数据                                                                         |
| v1.2.18  | 回退 downLoadAll 配置动态引入                                                                    |
| v1.2.19  | 修改 downLoadAll 配置动态引入                                                                    |
| v1.2.20  | spu 新增保存成功路由跳转问题处理                                                                 |
| v1.2.21  | 调整零售发货单批量操作弹窗                                                                       |
| v1.2.22  | 零售发货单详情 -- 弹框配置下修改                                                                 |
| v1.2.23  | 零售发货单取消订单成功提示                                                                       |
| v1.2.24  | 零售发货单>添加赠品入参调整                                                                      |
| v1.2.25  | 零售发货单>手工拆单按钮配置                                                                      |
| v1.2.26  | skuAdd 报错处理                                                                                  |
| v1.2.27  | 零售发货单详情 -- 修改操作明细                                                                   |
| v1.2.28  | 修改零售发货单详情                                                                               |
| v1.2.29  | v-loading 指令                                                                                   |
| v1.2.30  | 策略接口配置去除重复定义                                                                         |
| v1.2.31  | 零售发货单详情修改 ｜ 零售发货单合并按钮修改                                                     |
| v1.2.32  | 零售发货单 - 合并订单、取消合并逻辑修改 ｜ 替换合并订单、取消合并 api                            |
| v1.2.33  | 迁移项目工具方法，增加零售发货单错误提示                                                         |
| v1.2.34  | businessDialog 弹窗迁移                                                                          |
| v1.2.35  | 提示弹框样式修改 ｜ 国际化替换                                                                   |
| v1.2.36  | 回退 businessDialog 弹窗迁移                                                                     |
| v1.2.37  | 增加零售发货单》批量添加赠品〉增加数量                                                           |
| v1.2.38  | 优化退换货单详情;                                                                                |
| v1.2.39  | 退换货单详情工具方法的引用                                                                       |
| v1.2.40 | 修复兼容斯凯奇matrixInput2报错                                                                       |
| v1.2.41 | 店铺授权页面 修改弹框                                                                        |
| v1.2.42 | downLoad v1  |
| v1.2.43 | scheduleAddOrEdit: onlyBox: true,  |
| v1.2.44 | 修bug |
| v1.2.45 | sku快速生成网关配置 |
| v1.2.46 | 详情地址bug：收货信息拼接 ｜ 弹框修改配置点击弹层不关闭|
| v1.2.47 | businessDialog 弹窗迁移 |
| v1.2.48 | 修改地址校验问题 |
| v1.2.49 | 修改地址校验问题/bug:38205/diologConfig |
| v1.2.50 | 增加店铺授权的接口地址 |
| v1.2.51 | 修复零售发货单替换下挂入参问题 |
| v1.2.52 | 手工拆单检查/查询调试 |
| v1.2.53 | downLoad v2 |
| v1.2.54 | modify改物流/仓库modalTittle |
| v1.2.55 | bug:38264 |
| v1.2.56 | bug:38309 | 38308 | 38286 |
| v1.2.57 | 添加赠品按钮添加禁止重复点击 |
| v1.2.58 | spu->skuAddOrEdit |
| v1.2.59 | 零售发货单详情 - 刷新问题 |
| v1.2.60 | spu->sku-save渲染问题 |
| v1.2.61 | 修改-删除赠品和替换赠品禁止重复点击 |
| v1.2.62 | 修改-删除刷新 ｜ 修改打标按钮颜色 |
| v1.2.63 | 版本更新 |
| v1.2.64 | 改物流/仓库提示信息处理  |
| v1.2.65 | js $i18n  |
| v1.2.66 | config $i18n  |
| v1.2.67 | 拆分订单bug  |
| v1.2.68 | 订单列表 - 取消合并联调  |
| v1.2.69 | 拆分订单保存调试  |
| v1.2.70 | 结束时间选择日期 时间默认23:59:59
| v1.2.71 | temp i18n
| v1.2.72 | 渠道仓新增/编辑路径改为表名
| v1.2.73 | 找回被删掉的subTableConfig(有用到,不准删！！！！！)
| v1.2.74 | 单独js页面-特殊处理国际化  |
| v1.2.75 | 仓库物流\价格策略\档期日程规划-生效时间disabledDate  |
| v1.2.76 | importTableConfig拓展  |
| v1.2.77 | 淘宝/京东订单下载外键关联id配置  |
| v1.2.78 | 京东订单下载接口  |
| v1.2.79 | 替换商品参数修改 ｜ 表格替换 |
| v1.2.80 | 修复价格策略新增页校验红框 |
| v1.2.81 | 售后复制vmI18n报错修复 |
| v1.2.82 | 渠道仓bug确认及样式调整 |
| v1.2.83 | 修复新增页面tab切换回来缓存失效问题 |
| v1.2.84 | test-getway |
| v1.2.85 | 修复京东订单》下载订单入参问题|
| v1.2.86 | 修复淘宝订单》京东订单》确认订单入参问题|
| v1.2.87 | fkinput样式调整|
| v1.2.88 | 改物流/仓库提示信息处理 |
| v1.2.89 | r3-ps -> r3-cp |
| v1.2.90 | skuAddOrEdit数据回显bug |
| v1.2.91 | 详情组合商品 - bug |
| v1.2.92 | 改物流/仓库错误即关弹窗; sku样式调整 |
| v1.2.93 | 修复拆单bug; 策略返回修改提示 |
| v1.2.94 | 修复零售发货单bug |
| v1.2.95 | 订单拆单bug |
| v1.2.96 | bug:38615 |
| v1.2.97 | bug:38624|38631 |
| v1.2.98 | bug:38626解决 |
| v1.2.99 | 改仓库name |
| v1.3.0 | 物流公司档案-导入 |
| v1.3.1 | LOGISTICSIMPORT config |
| v1.3.2 | bug:38634 |
| v1.3.3 | bug:38613 |
| v1.3.4 | 修复零售发货单bug |
| v1.3.5 | 实体仓档案-导入 |
| v1.3.6 | bug:38699 |
| v1.3.7 | 零售发货单详情 -- 明细取消标记联调 |
| v1.3.8 | orderAdd |
| v1.3.9 | bgu:38709-错误提示处理 |
| v1.3.10 | 修改提示 |
| v1.3.11 | bug:38706 |
| v1.3.12 | bgu:38709-错误提示处理++ |
| v1.3.13 | 修复淘宝退单下载地址不正确|
| v1.3.14 | bug:38733/format|
| v1.3.15 | 指定拆/sku |
| v1.3.16 | bug:38749 |
| v1.3.17 | orderAddDetail合计处理 |
| v1.3.18 | 异常处理bug:38766|
| v1.3.19 | bug:38812  |
| v1.3.20 | commonUtils- defaultEndTime  |
| v1.3.21 | 添加路由守卫配置方法文件  |
| v1.3.22 | 路由守卫方法修改  |
| v1.3.23 | 操作日志配置添加 - 策略平台配置  |

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

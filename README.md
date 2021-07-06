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

#### project-logic 版本说明

| Version  | Description                                                                                      |
| -------- | ------------------------------------------------------------------------------------------------ |
| v1.0.0   | 初始化标准化逻辑库 |
| v1.0.1   | 初始化共用逻辑模块 |
| v1.0.2   | 架构逻辑模块移入逻辑库 |
| v1.0.3   | 修改引用别名@/views/pages->allpages |
| v1.0.4   | 移入系统配置静态资源 |
| v1.0.5   | 统一替换 loading 引用 |
| v1.0.6   | 去掉 loading 引用 |
| v1.0.7   | 修复引用 bug; |
| v1.0.8   | 移除 loading 文件 |
| v1.0.9   | 修复 importTable 弹窗路径问题 |
| v1.0.10  | 调用局部弹窗 loading |
| v1.0.11  | button/input 样式调整 |
| v1.0.12  | datePiker/page 样式调整 |
| v1.0.13  | 优化 try... catch... finally 逻辑及写法 |
| v1.0.14  | 迁移动态配置按钮 Handler 方法模块 |
| v1.0.15  | 优化配置按钮 Handler 方法模块 |
| v1.0.16  | 优化 ordermanager 列表配置按钮 Handler 方法模块 |
| v1.0.17  | 迁移下拉菜单配置按钮 |
| v1.0.18  | 优化下拉菜单配置按钮 Handler 方法模块 |
| v1.0.19  | bug: 由于屏幕变化导致的表格选中数据消失问题 |
| v1.0.20  | 合并 Extends-Api |
| v1.0.21  | 修改 table 计算方法 |
| v1.0.22  | 优化公用 date 格式化方法 |
| v1.0.23  | 优化代码结构, 迁移自定义导出模块 |
| v1.0.24  | Extends-Api v1.0.7 |
| v1.0.25  | 删除不完整 async await 异步用法 |
| v1.0.26  | 修复订单管理导出 bug; |
| v1.0.27  | 新增退换货单配置按钮 Handler 方法模块; |
| v1.0.28  | 新增（路由跳转）公共方法,修改引用; |
| v1.0.29  | 修改路由跳转公共方法; |
| v1.0.30  | 订单操作按钮校验方法修改; |
| v1.0.31  | 新增退换货单详情（新增）配置按钮 Handler 方法模块; |
| v1.0.32  | 完善零售发货单（详情）配置按钮 Handler 方法模块; |
| v1.0.33  | 添加校验配置公用模块; |
| v1.0.34  | 添加导航主模块功能方法; |
| v1.0.35  | 优化代码写法,添加弹窗模块配置方法; |
| v1.0.36  | 兼容单对象页面方法调用; |
| v1.0.37  | 退货入库列表/详情（新增）配置按钮 Handler 方法模块; |
| v1.0.38  | 跳转页面方法优化 |
| v1.0.39  | 迁移优化定制弹窗配置处理; |
| v1.0.40  | 统一定制页面 loading,换掉框架 loading 方法（无法支持局部）; |
| v1.0.41  | 替换所有 loading; |
| v1.0.42  | 添加库存中心按钮配置方法; |
| v1.0.43  | 修改特定下载组件(JIT); |
| v1.0.44  | 优化跳转方法; |
| v1.0.45  | 删除覆盖变量; |
| v1.0.46  | 促销中心的状态初始化方法放到列表页/部分样式优化; |
| v1.0.47  | Extends-Api v1.0.8 |
| v1.0.48  | 版本已用 |
| v1.0.49  | Extends-Api v1.0.9 |
| v1.0.50  | Extends-Api v1.0.10 |
| v1.0.51  | index.less 优化 |
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
| v1.3.24 | returngoodAdd  |
| v1.3.25 | 自定义外键关联组件,根据不同触发事件返回不同格式参数  |
| v1.3.26 | 启用、停用按钮禁用  |
| v1.3.27 | 详情修改商品报错信息修改 |
| v1.3.28 | orderManage/returnGoods |
| v1.3.29 | mergeOrderTree 合单策略API |
| v1.3.30 | 直播解析识别规则重复校验 |
| v1.3.31 | bug:38870 |
| v1.3.32 | bug:38865 |
| v1.3.33 | bug:38865->once |
| v1.3.34 | bug:38865->once |
| v1.3.35 | 替换 ImageUpload 业务组件  |
| v1.3.36 | bug:38957  |
| v1.3.37 | manualReturnCreation  |
| v1.3.38 | 策略中心-新增/详情 移除启用停用按钮  |
| v1.3.39 | 异常处理功能,模糊搜索处理  |
| v1.3.40 | 修改bug ｜ 添加定制面板配置及发货前退款单模版定制页面  |
| v1.3.41 | 退货单- 通知WMS新建、撤回  |
| v1.3.42 | 修改bug |
| v1.3.43 | 省市区必选择 |
| v1.3.44 | modal closeable |
| v1.3.45 | 淘宝退货单下载  |
| v1.3.46 | 修改地址省市必填  |39098
| v1.3.47 | bug:39098  |
| v1.3.48 | specifyGoodsAssign  |
| v1.3.49 | 迁移策略中心模块  |
| v1.3.50 | subTable(操作日志) config add  |
| v1.3.51 | 修改引入switchList组件路径  |
| v1.3.52 | 已发货退款单和发货前退款单接口联调  |
| v1.3.53 | bug:39098|39109  策略详情启用开关 |
| v1.3.54 | 淘宝退货单接口下载->时间空判断 |
| v1.3.55 | 分仓|分物流-启用开关 |
| v1.3.56 | 迁移hold单策略 |
| v1.3.57 | 价格策略-导入刷新 |
| v1.3.58 | 修复特殊物流方案bug |
| v1.3.59 | 修复特殊物流方案时间日期排版bug |
| v1.3.60 | 组合商品/商品spu操作日志 |
| v1.3.61 | 商品sku-动态事件监听 仓库物流bug |
| v1.3.62 | sku bug 修复 |
| v1.3.63 | spu商品自定义属性支持时间空间保存 |
| v1.3.64 | 组合商品重复保存报错问题 |
| v1.3.65 | sku 操作日志 |
| v1.3.66 | 仓库物流bug 操作日志 |
| v1.3.67 | 增加带店铺策略批量修改 |
| v1.3.68 | 商品分类/商品自定义属性 操作日志调整 |
| v1.3.69 | 退换货退款金额组件 ｜ 日志配置文件修改 |
| v1.3.70 | bug:39271|39266 操作日志 |
| v1.3.71 | bug:39279 |
| v1.3.72 | bug:39022|
| v1.3.73 | store储存退款金额|
| v1.3.74 | 增加基础数据和策略中心的操作日志展示 |
| v1.3.75 | store调整字段 |
| v1.3.76 | 物流派送 css |
| v1.3.77 | sku 操作日志 代码找回 |
| v1.3.78 | bug:39000 |
| v1.3.79 | 组合商品明细删除逻辑修改|
| v1.3.80 | 组合商品详情页面,根据启用状态禁用保存修改|
| v1.3.81 | 组合商品详情启用状态赋值|
| v1.3.82 | 修改地址解析调用定制接口|
| v1.3.83 | 异常地址处理,省市取消关联|
| v1.3.84 | fkinput模糊搜索样式调整/bug:38999|
| v1.3.85 | oederAdd-SKU编码-popInputPlus |
| v1.3.86 | 查询流程控制 |
| v1.3.87 | 查询流程控制1 |
| v1.3.89 | 组合商品启用状态根据新增是否显示隐藏 |
| v1.3.90 | 组合商品零售价必填 |
| v1.3.91 | 39436：bug|
| v1.3.92 | 退货单虚拟入库完成 |
| v1.3.93 | 退货单修改单据备注和退货入库半定制 |
| v1.3.94 | 物流公司档案-物流单号解析配置-新增需求v1 |
| v1.3.95 | 增加基础数据平台档案授权打开新的页面 |
| v1.3.96 | 退单取消接口 |
| v1.3.97 | 新增退货确认策略定制面板->执行动作 |
| v1.3.98 | 调整策略中心详情页保存好之后返回列表 |
| v1.3.99 |菜单样式修改 |
| v1.4.0 | 校验表单空validatorNotEmpty方法优化 |
| v1.4.1 | 迁移订单列表 |
| v1.4.2 | 订单列表样式调整 |
| v1.4.3 | 设置按钮控制显示隐藏 |
| v1.4.4 | 1.完成修改备注长度限制2.完成退货入库》手工定制查询接口 |
| v1.4.5 | 退换货单-跳转携带参数 |
| v1.4.6 | 退换货单-跳转携带参数修改 |
| v1.4.7 | 分物流策略-启用状态 |
| v1.4.8 | 分仓-启用状态 |
| v1.4.9 | hold策略修改label |
| v1.5.0 | 仓库物流tab |
| v1.5.1 | hold-策略修改label |
| v1.5.2 | 物流公司档案-物流单号解析配置联调 |
| v1.5.3 | 更新版本号 |
| v1.5.4 | hold 策略新增修改label |
| v1.5.5 | 天猫换货策略 |
| v1.5.6 | 完成部分退货入库保存联调 |
| v1.5.7 | 促销新增路由匹配表名 |
| v1.5.8 | 天猫换货策略表单校验 |
| v1.5.9 | 用户中心-组织档案tree |
| v1.5.10 | 商品分类组件替换40080 |
| v1.5.11 | 商品分类/sku-drp clear时入参修改0 |
| v1.5.12 | 批量新增促销/模拟仿真页面重载配置 |
| v1.5.13 | 完善退货入库的手工匹配和强制匹配逻辑 |
| v1.5.14 | 赔付 |
| v1.5.15 | hrorgTree网关 |
| v1.5.16 | 直播解析日志 |
| v1.5.17 | 完成退货入库分页 |
| v1.5.19 | 物流单号解析配置查询修改参数                    |
| v1.5.20 | 商品价格策略日志 |
| v1.5.21 | 改退回物流/改退回仓库 |
| v1.5.22 | 促销保存参数调整 |
| v1.5.23 | 审单策略日志配置 |
| v1.5.24 | 退货确认处理 |
| v1.5.25 | 退换货放开设置排序功能 |
| v1.5.26 | 修复wms新建 |
| v1.5.27 | 嵌套serviceHandler传参多次嵌套问题处理 |
| v1.5.28 | 添加额外退款单明细 |
| v1.5.29 | 指定商品拆单联调 |
| v1.5.30 | 增加操作日志分页和退货入库手工匹配和强制匹配的校验 |
| v1.5.31 | 修改中文文件名 |
| v1.5.32 | 修改全局语言包引用 |
| v1.5.33 | 修复仓库物流备注 |
| v1.5.34 | 退换货单 - 退款金额计算 |
| v1.5.35 | 退换货单,换表名 |
| v1.5.36 | 修改引用包名写法 |
| v1.5.37 | 修复商品价格复制ID |
| v1.5.38 | 修复物流派送范围界面样式调整 |
| v1.5.39 | 促销列表调整 |
| v1.5.40 | bug:40443 |
| v1.5.41 | 退换货代码迁移 |
| v1.5.42 | bug:40443 |
| v1.5.43 | store修改 |
| v1.5.44 | 促销按钮调整 |
| v1.5.45 | 零售发货单新增-智能地址匹配调接口 |
| v1.5.46 | 退换货修改 |
| v1.5.47 | wms撤回重做 |
| v1.5.48 | 额外退款单 - 原订单编号查询 |
| v1.5.49 |增加功能权限和数据权限定制页面 |
| v1.5.50 | 修复天猫换货策略取消勾选 |
| v1.5.51 | sku/spu添加模糊搜索 |
| v1.5.52 | bug:40591 |
| v1.5.54 | initSubtable方法拓展 |
| v1.5.55 | orderAdd计算修复 |
| v1.5.56 | 调整功能权限和数据权限定制页面 |
| v1.5.57 | 手工打标联调完成 |
| v1.5.58 | 增加数据权限mock数据 |
| v1.5.59 | 增加数据权限mock数据 |
| v1.5.60 | 淘宝商品下载 |
| v1.5.61 | 修复数据权限页面优化 |
| v1.5.62 | 通用退单下载 |
| v1.5.63 | 赔付单迁移 |
| v1.5.64 | 零售发货单查询条件处理 |
| v1.5.65 | 赔付单define组件添加clear事件 |
| v1.5.67 | 批量新增促销处理 |
| v1.5.68 | 零售发货单迁移以及额外退款新增 |
| v1.5.69 | 额外退款新增明细修改 |
| v1.5.71 | bug:38978 |
| v1.5.72 | 修复淘宝商品下载文案 |
| v1.5.73 | 促销接口 |
| v1.5.74 | 额外退款单 - 优化 |
| v1.5.75 | infoSet/giftSet button组件更换 |
| v1.5.76 | 促销-导入 |
| v1.5.77 | 组合商品-新增 操作日志/默认panel修复 |
| v1.5.78 | 商品中心-tabCloseAppoint问题修复/bug:40622 |
| v1.5.79 | spu详情->sku->back |
| v1.5.80 | 额外退款-编辑 |
| v1.5.81 | bug:40584 |
| v1.5.82 | 额外退款单-导入|导入打款结果 |
| v1.5.83 | 额外退款单-编辑参数修改 |
| v1.5.84 | 赔付-详情-新增明细搜索修复 |
| v1.5.85 | 增加额外退款单》退款失败处理|
| v1.5.86 | 天猫换货排版 |
| v1.5.87 | 修复增加额外退款单》退款失败处理入参|
| v1.5.89 | 赔付 |
| v1.5.90 | 天猫换货移除启用 |
| v1.5.91 | 赔付入参修复 |
| v1.5.92 | 赔付-主子表联动清空 |
| v1.5.93 | 促销批量新增按钮 |
| v1.5.94 | 增加支付宝账单，授权 |
| v1.5.95 | 找回wms撤回重做 |
| v1.5.96 | 赔付-明细 金额 修改渲染问题 |
| v1.5.97 | 额外 - 编辑修改参数 |
| v1.5.98 | 文案、下载账单页面 |
| v1.5.99 | bug: 41015 |
| v1.6.0 | orderManage 明细修复 |
| v1.6.1 | 额外退款  - 详情修改 |
| v1.6.2 | 退换修复,orderManage正则调整 |
| v1.6.3 | orderManage计算0情况 |
| v1.6.4 | 促销样式修改
| v1.6.6 | orderManage计算防抖 |
| v1.6.7 | 赔付-无原单明细逻辑处理 |
| v1.6.8 | 异常订单类型修改 |
| v1.6.9 | 修改文件名/bug:41078 |
| v1.7.0 | 配置修改 |
| v1.7.1 | pay 明细失焦修复数据渲染修复 |
| v1.7.2 | bug:41067 |
| v1.7.3 | pay-详情-未关联原单-新增/删除明细修复 |
| v1.7.4 | 额外退款金额-限制输入小数点两位|
| v1.7.5 | 删除多余分号|
| v1.7.6 | hold-修改参数|
| v1.7.7 | 取消订单提示语修改|
| v1.7.8 | 退换货单 -- 修改字段|
| v1.7.9 | 增加用户中心重置密码|
| v1.7.10 | bug:41166、tab名称mixins |
| v1.7.11 | 额外-修改字段|
| v1.7.12 | 促销-basic->businessForm |
| v1.7.13 | 修复分仓分物流bug|
| v1.7.14 | 促销-批量导入接口入参调整 |
| v1.7.15 | 退换-换-新增-IS_RESERVED默认值 |
| v1.7.16 | tab title 统一处理 |
| v1.7.17 | 审单策略开关默认关闭/审核反审核批量错误展示处理 |
| v1.7.18 | 解决'商品自定义属性'新增/详情打开新页导致返回不关掉tab的问题 |
| v1.7.19 | 审单策略bug修复 |
| v1.7.20 | 促销列表-优化跳转 |
| v1.7.21 | sku/spu自定义属性样式修改 |
| v1.7.22 | 促销-errorMessage/Mydialog组件替换 |
| v1.7.23 | 天猫换货css |
| v1.7.24 | 促销/组合商品修改 |
| v1.7.25 | 促销-批量新增优化 |
| v1.7.26 | 赔付-框架支持'原定单编号'clear传空字符串 |
| v1.7.27 | 接口变量冲突问题 |
| v1.7.28 | 促销方法提取 |
| v1.7.29 | 省市区修复 |
| v1.7.30 | 赔付-样式调整 |
| v1.7.31 | 调整金额新增-自定义input添加label 零售发货单修改地址成功刷新页面 |
| v1.7.32 | 修复权限和策略bug |
| v1.7.33 | 修复功能权限中间树的展示 |
| v1.7.34 | 零售发货单详情-bug：41424 |
| v1.7.35 | 零售发货单-bug:41423 |
| v1.7.36 | 零售发货单 - 合并订单成功刷新列表 |
| v1.7.37 | 修复派送范围的bug，增加分物流规则列表复制功能 |
| v1.7.38 | 审单策略-新增/详情-样式 |
| v1.7.39 | 零售发货单-bug:41477 |
| v1.7.40 | bug处理 |
| v1.7.41 | 支付宝下载账单 |
| v1.7.42 | 手工拆单逻辑处理 |
| v1.7.43 | 修复零售发货单添加赠品系列限制 |
| v1.7.44 | 退换新增-onlyBox取值修复/back修复 |
| v1.7.45 | agTable/vueAgTable切换配置开关 |
| v1.7.46 | 档期日程-checkbox |
| v1.7.47 | 所有定制界面详情明细表单按钮配置添加展示类型 |
| v1.7.48 | 下载账单-colid |
| v1.7.49 | 修复特殊物流方案bug |
| v1.7.50 | 档期日程规划样式修改 |
| v1.7.51 | 表格优化 |
| v1.7.52 | 优化特殊物流方案表格分页 |
| v1.7.53 | 手工拆单效验 |
| v1.7.54 | getPermissions方法处理 |
| v1.7.55 | 下载账单serviceId、档期日程样式 |
| v1.7.56 | bug: 41590 |
| v1.7.57 | 下载账单serviceId |
| v1.7.58 | 修复特殊物流方案仓库物流全选删除无效 |
| v1.7.59 | popInputPlus version |
| v1.7.60 | getPermissions方法返回值处理 |
| v1.7.61 | 修复下载账单入参 |
| v1.7.62 | 退换货新增-明细-按钮权限 |
| v1.7.63 | 修复特殊物流方案bug若干 |
| v1.7.64 | 修复特殊物流方案bug若干 |
| v1.7.65 | 退换货-权限控制 |
| v1.7.66 | bug:41687 |
| v1.7.67 | bug:41726 |
| v1.7.68 | bug:41615，41685 |
| v1.7.69 | 零售发货单详情｜退换货单详情 对接按钮权限 |
| v1.7.70 | 促销列表按钮权限 |
| v1.7.71 | bug: 41755|
| v1.7.72 | 修复航空禁运 |
| v1.7.73 | 国家省市区-权限控制 |
| v1.7.74 | 公共方法保留小数点两位修改 |
| v1.7.75 | 物流公司档案-按钮权限 |
| v1.7.76 | 完成策略按钮权限，退货入库按钮权限 |
| v1.7.77 | hold单策略｜额外退款单按钮权限 ｜ 零售发货单详情明细 取消标记 成功弹框修改 |
| v1.7.78 | 零售发货单-明细-变更 |
| v1.7.79 | 零售发货单详情 - 判断类型 |
| v1.7.80 | 策略平台按钮权限 |
| v1.7.81 | 权限按钮控制 |
| v1.7.82 | 修复bug，41909，41883，41794 |
| v1.7.83 | 修复bug，41947 |
| v1.7.84 | 修复特殊物流方案，启用可以删除数据问题 |
| v1.7.85 |组合商品权限衍生报错处理 |
| v1.7.86 | 物流公司、getBtnPermission |
| v1.7.87 |多级对象按钮权限控制|
| v1.7.88 | sku-SKU编码中文字符 |
| v1.7.89 | 找回无权限控制的text |
| v1.7.90 | 组合商品详情按钮权限控制 |
| v1.7.91 | 促销详情权限按钮控制 |
| v1.7.92 | 权限方法-fix按钮处理(不受接口控制 |
| v1.7.93 | 完成数据权限联调 |
| v1.7.94 | 组合商品明细权限按钮控制|
| v1.7.95 | 指定商品拆单查询功能|
| v1.7.96 | spu-sku-保存-数据回显修复 |
| v1.7.97 | 完善数据权限分类别保存入参 |
| v1.7.98 | 修复数据权限控件显示问题 |
| v1.7.99 | spu-sku-SPU编码readonly |
| v1.8.1 | 促销列表收藏按钮控制 |
| v1.8.2 | 档期日程弹窗调整 |
| v1.8.3 | 修复bug 41943，42136，和数据权限样式调整 |
| v1.8.4 | 梯度赠品保存控制限制调整 |
| v1.8.5 | 零售发货单-取消合并-单据状态校验 |
| v1.8.6 | 促销-批量新增组件新增配置 |
| v1.8.7 | 促销查询条件调整 |
| v1.8.8 | 增加零售发货单详情删除赠品，加参数 |
| v1.8.9 | 增加零售发货单详情删除赠品，加参数 |
| v1.8.11 | spu明细销售状态映射 |
| v1.8.12 |促销新增排除省配置调整|
| v1.8.13 | 下载账单调整 |
| v1.8.14 | 促销优化-新增mixin文件 |
| v1.8.15 | 促销优化-created方法修复 |
| v1.8.16 | 下载账单修复 |
| v1.8.17 | 修复数据权限input控件样式 |
| v1.8.18 | 修复零售发货单弹窗确认按钮样式不正确 |
| v1.8.19 | 统一全局分页调整 |
| v1.8.20 | 促销重置功能 |
| v1.8.21 | 促销优化-mixin |
| v1.8.22 | bug:42113 |
| v1.8.23 | 过滤配置 |
| v1.8.24 | 退换货新增-替换路由 |
| v1.8.25 | 添加自定义菜单组件 |
| v1.8.26 | 修复物流派送范围调整部分 |
| v1.8.27 | 修复零售发货单数量输入长度限制 |
| v1.8.28 | 自定义菜单组件修改|
| v1.8.29 | 促销列表-换AgTable |
| v1.8.30 | 菜单展现方式修改 |
| v1.8.31 | 下载账单模糊搜索取值 |
| v1.8.32 | 账单时间选择限制 |
| v1.8.33 | 隐藏掉忘记密码 |
| v1.8.34 | 促销列表-选中修复 |
| v1.8.35 | bug:42426 |
| v1.8.36 | 菜单替换logo|
| v1.8.37 | 修复模糊搜索取值 |
| v1.8.38 | 调整部分物流派送范围界面和数据权限样式调整 |
| v1.8.39 | 修改菜单动画 |
| v1.8.40 | 促销-导入修复 |
| v1.8.41 | 新增逻辑仓-添加布局 |
| v1.8.42 | 退换列表-退货确认未勾选数据提示 |
| v1.8.43 | self/this.$OMS2.omsUtils. -> $omsUtils. |
| v1.8.44 | bug:42546 |
| v1.8.45 | 指定商品拆-防抖 |
| v1.8.46 | 完成物流派送范围部分功能，修复bug42557 |
| v1.8.47 | 天猫换货正则 |
| v1.8.48 | bug:42508 |
| v1.8.49 | bug:42508 补充 |
| v1.8.50 | 完善物流派送范围功能联调 |
| v1.8.51 | bug:42508 补充*2 |
| v1.8.52 | bug:42581 完成物流派送范围|
| v1.8.53 | 新增头部导航配置文件|
| v1.8.54 | 零售发货单详情-添加打标|
| v1.8.55 | 退换-新增/详情 查原单号修复脏数据导致的报错 |
| v1.8.56 | 修复零售发货单滚动条展示 |
| v1.8.57 | 零售发货单aG保存列移动信息/重置列 |
| v1.8.58 | bug:42720 |
| v1.8.59 | 促销列表报错修复 |
| v1.8.61 | 代码迁移 |
| v1.8.62 | 零售列表-异常处理接口网关修改 |
| v1.8.63 | 图片替换 |
| v1.8.64 | 下载弹窗添加网关配置 |
| v1.8.66 | 通用订单下载调整 |
| v1.8.67 | 商品价格策略-生效时间格式调整 |
| v1.8.68 | 零售列表-异常处理弹窗-限制最大高度 |
| v1.8.69 | bug:42765 |
| v1.8.70 | 替换赠品-修改参数｜替换logo｜添加默认点击事件头部展示搜索框 |
| v1.8.71 | 改物流/仓库 网关替换 |
| v1.8.72 | 头部导航iconfont修改 |
| v1.8.73 | 零售列表-异常处理-组件name问题报错修复 |
| v1.8.74 | 零售发货单列表 样式修改 ｜ 图片更换 |
| v1.8.75 | 样式修改 |
| v1.8.76 | bug:42856 |
| v1.8.77 | 修改地址-省市区添加网关 |



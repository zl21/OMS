#  @burgeon/business-components
#### 介绍
@burgeon/business-components  

是上海伯俊中台事业部产品中心项目架构私有依赖包仓库中复合型业务组件库;

秉承前端项目工程化的思想, 将中台项目中公用的业务组件库抽离, 独立模块依赖包便于后期迭代维护;

#### 安装教程

一. 简易化安装依赖: 

   1. 命令行: npm install @burgeon/business-components --registry http://47.102.123.140:4873;

   2. 优缺点:

        优点: 简单易用,不用切源;  

        缺点: 单行命令过多;

二. nrm安装依赖: 

   1. 命令行: 

         npm install nrm -g;  

         nrm add XXX http://47.102.123.140:4873;  

         nrm use XXX;  

         npm install @burgeon/business-components;  

   2. 优缺点:
   
        优点: 引入nrm管理依赖包来源; 多源情景下切源方便;   

        缺点: 初期命令行相应较多;     

#### 使用说明

1. 可在项目的入口文件中使用注入node_Module依赖包的方式进行注入并挂载, 即可全局使用;

2. 可在项目单文件中使用import方式进行局部引入使用, 实现按需加载, 近而减少包体;

#### 更新版本列表


|  Version  |  Description  |
|  ---  | --- |
| v1.0.1 |  重构组件库项目架构   |
| v1.0.2 |  添加使用说明   |
| v1.0.3 |  解决input框重叠问题   |
| v1.0.6 |  标品项目架构调整优化弹窗引用问题   |
| v1.0.7 |  加入定制弹窗   |
| v1.0.8 |  修改定制页面弹窗配置   |
| v1.0.9 |  修改1.4框架agGridTable获取ID的方式   |
| v1.0.10 |  修改组件businessLabel样式   |
| v1.0.11 |  修改组件businessForm样式   |
| v1.0.12 |  修改agTable序号宽度/businessForm箭头样式/form的高度   |
| v1.0.13 |  修改ActionTable表格样式和businessLabel样式   |
| v1.0.14 |  修改input样式   |
| v1.0.15 |  form表单搜索收起状态下去掉固定高度添加最大高度，解决一行搜索条件留白过多问题   |
| v1.0.16 |  LogTable.js报错修复   |
| v1.0.17 |  businessActionTable组件新增功能,控制列表单击当前行当前行checkbox是否勾选 rowClickNoSelected:(不传参默认为勾选,传参为true为不勾选)   |
| v1.0.18 |  agTable 翻页组件修改size属性   |
| v1.0.19 |  businessActionTable单击表格行功能   |
| v1.0.20 |  businessActionTable修改单元格高度   |
| v1.0.21 |  businessActionTable修改布局   |
| v1.0.22 |  businessActionTable修改布局patch   |
| v1.0.23 |  表格组件新增行颜色   |
| v1.0.24 |  修改agTable序号宽度   |
| v1.0.25 |  优化agTable的重置所有列信息功能   |
| v1.0.26 |  优化组件样式引用空文件及修改businessDialog组件引用名   |
| v1.0.27 |  优化按钮组件(businessButton)的匹配方式 (btn.text -> btn.webname)   |
| v1.0.28 |  修改businessForm - input disabled样式
| v1.0.29 |  修改businessDialog z-index 层级修改
| v1.0.30 |  businessForm组件中AttachFilter添加on-clear事件
| v1.0.31 |  fix:businessForm组件中AttachFilter组件报warn:Invalid handler for event "on-xxx": got undefined
| v1.0.32 |  fix:businessForm组件中AttachFilter组件报未获取到输入值
| v1.0.33 |  fix:publicDialog组件中dropSortConfig中setFormDrag命名
| v1.0.34 |  easyMatrix组件模糊搜索点击选中值后赋值给value
| v1.0.35 |  增加待审核水印图片
| v1.0.36 |  弹窗组件增加动态base路径传参basePathName
| v1.0.37 |  businessActionTable修改样式（添加最后一行下边线）
| v1.0.38 |  添加促销组件
| v1.0.39 |  agGrid依赖文件迁移至私仓
| v1.0.40 |  agGrid路径错误补丁
| v1.0.41 |  publicDialog.js 路径修改（首字母大写改小写）
| v1.0.42 |  私仓import.js和项目import.js合并
| v1.0.43 |  将水印配置文件迁移至私仓
| v1.0.44 |  businessForm样式微调
| v1.0.45 |  businessForm样式调整(全局)
| v1.0.46 |  importTable替换loading
| v1.0.47 |  设置弹窗局部loading
| v1.0.48 |  修改businessform引入的fktable组件兼容1.4的数据格式（云雀）
| v1.0.49 |  修改businessform引入的fktable组件修改组件传值
| v1.0.50 |  修复版本号问题;
| v1.0.51 |  修复commonPage的兼容性问题;
| v1.0.52 |  修复importTable的接口问题;
| v1.0.53 |  添加loading组件;
| v1.0.54 |  businessForm修改;
| v1.0.55 |  businessForm add Tooltip;
| v1.0.56 |  importTable兼容优化(sku/spu);
| v1.0.57 |  增加textarea组件操作事件(enter change blur)
| v1.0.58 |  1.Tooltip拓展配置；2.FormItem拓展动态class
| v1.0.59 |  修复FormItem拓展动态class-bug
| v1.0.61 |  businessform样式修改
| v1.0.62 |  businessform添加:maxlength="item.maxlength"控制
| v1.0.63 |  新增通用子表组件subTable.vue
| v1.0.64 |  businessTable优化-无data时不展示thead
| v1.0.65 |  修改businessButton -- 按钮透明属性 guost取值错误
| v1.0.66 |  修改导入更新组件 class content为importContent
| v1.0.67 |  businessButton Alltype 值为 default 
| v1.0.68 |  组件内部的请求前缀固定
| v1.0.69 |  businessform新增时分秒组件TimePicker
| v1.0.70 |  importTable配置优化封装
| v1.0.71 |  时分秒组件添加placement属性
| v1.0.72 |  importTable配置文件迁移
| v1.0.73 |  importTable组件的loading及导入成功后刷新页面
| v1.0.74 |  businessForm组件内bothInput/bothNumber参数格式调整
| v1.0.75 |  businessForm组件内select添加模糊搜索
| v1.0.76 |  importTable组件修改
| v1.0.77 |  修复fktable样式问题
| v1.0.78 |  fktable 判断接口是否需要添加网关前缀 | 修复key重复问题报错
| v1.0.79 |  businessForm input样式问题
| v1.0.80 |  businessButton文字隐藏修改 ｜ input - padding修改
| v1.0.81 |  businessButton组件优化 ｜ businessForm - 默认高度修改
| v1.0.82 |  三级按钮html结构改造
| v1.0.83 |  businessForm组件优化、drp类型支持clear
| v1.0.84 |  businessLable样式修改
| v1.0.85 |  axios->network(agGrid)
| v1.0.86 |  objinput_dz->fkinput
| v1.0.87 |  标准接口动态匹配网关
| v1.0.88 |  importTable computed 优化
| v1.0.89 |  fkTable-queryList接口暂时写死
| v1.0.90 |  importTable修复
| v1.0.91 |  businessForm-select-拓展on-open-change方法
| v1.0.92 |  button三级按钮点击多次触发问题修改
| v1.0.93 |  businessForm-select-拓展-选中返回选中对象
| v1.0.94 |  agtable修改配置行高 ｜ 修改importTable样式
| v1.0.95 |  importTable catch、参数更改、回调刷新
| v1.0.96 |  businessForm拓展自定义class
| v1.0.97 |  importTable优化导入失败的处理、businessActionTable展示表头
| v1.0.98 |  "@burgeon/project-logic": "^1.1.56"
| v1.0.99 |  businessForm拓展checkbox多选、fkinput支持返回rowdata
| v1.1.00 |  subTable配置项Api封装
| v1.1.01 |  解决businessForm无key导致的warning
| v1.1.02 |  businessForm/importTable优化
| v1.1.03 |  businessForm-checkbox修复
| v1.1.4 |  迁移库加入静态资源;
| v1.1.5 |  补齐遗漏的组件资源;
| v1.1.6 |  businessForm插槽必填标识
| v1.1.7 |  组件内部通信添加自动拼网关方式
| v1.1.8 |  网关参数
| v1.1.9 |  fkinput
| v1.1.10 |  fktable-mrp模糊搜索
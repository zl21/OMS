## 主题变量

##### 注
- 为了保证主题的覆盖范围，请尽量使用主题变量。


### 变量介绍
```
  // ----- 变动色: -------------------
  // 第一主色
  --b1-color: #3870c1;
  --b1-color_x1: #1256b9; // 深1度
  --b1-color_x2: #0e3877; // 深2度
  --b1-color_q1: #ABCDEF; // 浅1度

  // 第二主色
  --b2-color: #fd6442;
  --b2-color_q1: #fdd2c9; // 浅1度
  --b2-color_x1: #ed4014; // 深1度

  // 仅支持两种变化的变量（eg.深色系则文字为白色，反之为黑色）
  --t-text: #fff; // 或 #17233d

  // ----- 固定色: -------------------
  --s-title: #17233d; // 标题
  --s-content: #515a6e; // 正文
  --s-disabled: #c5c8ce; // 失效、禁用
  --s-border: #dcdee2; // 边框
  --s-divider: #e8eaec; // 分割线
  --s-bg: #fff; // 背景-白
  --s-bg_x1: #f8f8f9; // 背景-深1度
  --s-success: #19be6b; // 成功
  --s-error: #ff9900; // 失败
  --s-warn: #ed4014; // 警告
```

`使用方法如下：`
```
// index.less
body {
	color: var(--b1-color);
	background-color: var(--b2-color_q1);
}
```

### 通用基础样式

`使用方法如下：`
```
@import '~@burgeon/oms-theme/skin/public.less';
@import '～@burgeon/oms-theme/skin/oms/index.less';
//设置按钮样式 可直接引用变量
button{
    #bundle > .defalutBtn;
  }
```
| name | 描述 | 参数（默认值） |
| --- | --- | --- |
| .basicBtn() | 默认按钮 | ~~~~|
| .absolute() |  绝对定位|  @top:auto,@left:auto,@right:auto,@bottom:auto,@X:0,@Y:0 |
| .flex() | lex布局  |@type:flex,@direction:row,@justify:inherit,@align:inherit,@wrap:inherit |
| .order() | order：展示顺序 | @order | 
| .nowrap | 超出点点点 | ~~~~|
|.defalutBtn|默认按钮| ~~~~|
|.primaryBtn|主要按钮| ~~~~|
|.varBtn()|变量按钮| @color:@button-warning-bg|
|.defalutInput|默认input|~~~~ |
|beforeIconf|图标|@color:@base-color,@size:14px,@uncode |



> 可全局覆盖方法


`使用方法如下：`
```
//说明：通过命名空间方式调用方法并传参即可


@import '~@burgeon/oms-theme/skin/public.less';
@import '～@burgeon/oms-theme/skin/oms/index.less';
//设置按钮样式 可直接引用变量
body{
 // 背景色/logo背景色/鼠标经过背景色/鼠标经过子菜单字体颜色/鼠标经过子菜单背景色
  #commonTheme > .navBg(#5461B8,#4855AF,#3b49aa,#3b49aa,#F1F2FA);
}
```
| 模块                      | name                | 描述                              | 参数/说明                                                                                                                      |
|-------------------------|---------------------|---------------------------------|----------------------------------------------------------------------------------------------------------------------------|
| commonTheme             | navBg               | 菜单导航                            | @bg：背景色；@logo-bg：logo背景色；@hc：鼠标经过背景色； @li-hc：鼠标经过子菜单字体颜色； @li-hg：鼠标经过子菜单背景色                                                |
| commonTheme             | historyFavorite     | historyFavorite（水平布局：收藏和历史菜单）   | @bg：背景色；@label-bg：label背景色；@fc：label字体颜色；@ul-bg下拉菜单背景色；@liH-bg：鼠标经过下拉菜单子菜单背景色； @liH-fc：鼠标经过下拉菜单子菜单字体颜色； @collectFontColor： |
| commonTheme             | NaVertical          | 头部导航（垂直布局：iconfont替换/颜色/大小）     | ~~~~                                                                                                                       |
| commonTheme             | tabs                | 框架tabs                          | @br：边框颜色； @fc：字体颜色； @btc：选中状态上边框颜色     |
| commonTheme             | page                | ark - page                      | ~~~~                                                                                                                       |
| commonTheme             | calendar            | ark -- 日历                       | ~~~~                                                                                                                       |
| commonTheme             | steps               | ark -- steps                    | ~~~~                                                                                                                       |
| commonTheme             | dropdown            | ark -- 下拉菜单                     | ~~~~                                                                                                                       |
| commonTheme             | allButton           | 包含项目大部分button                   | 无参数。如需要这有四种默认颜色可提供修改：主要（@button-primary）、谨慎（@button-warning-bg）、error（@button-error-bg）、success（@button-success-bg）        |
| commonTheme             | modalBtn            | button - modal：项目大部分弹框里面的button |   |
| commonTheme             | checked             | all -- checked                  | ~~~~                                                                                                                       |
| commonTheme             | agtable             | agtable样式                       | ~~~~                                                                                                                       |
| standardTheme （标准界面）    | buttonList          | 列表页面butoon操作按钮                  | ~~~~   |
| standardTheme （标准界面）    | waterMarkContainer  | 水印                              | ~~~~   |
| standardTheme （标准界面）    | tab                 | 单对象界面 上下结构                      | @c:主色       |
| commonLayout （布局 -- 公共） | contentMain         | 主要内容部分                          | @tbm：内容上下外边距；@lrm：内容左右外边距；@tbp：内容上下内边距；@lrp内容左右外边距                                                                         |
| commonLayout （布局 -- 公共） | standarContent      | 标准布局                            | @but-order：button列表排序；@form-order:form表单排序；@table-order表格排序；@but-p：button列表内边距；@form-pd:form表单内边距；@table-mr:表格外边距          |
| commonLayout （布局 -- 公共） | treeList            | 标准 tree列表                       |       ~~~~    |
| commonLayout （布局 -- 公共） | verticalTableDetail | 标准布局 详情                         |                   ~~~~  |
| commonLayout （布局 -- 公共） | collapse            | all - 折叠面板                      |         ~~~~          |
| commonLayout （布局 -- 公共） | allInput            | other - input                   |      ~~~~    |
| commonLayout （布局 -- 公共） | scrollbar           | 滚动条                             |     ~~~~        |
| commonLayout （布局 -- 公共） | tableList           | 标准布局 -排序 ta 对齐方式                | @page:分页order值；@table:表格order值；@desc:图例order值；@ta:文字对齐方式                                                                   |
| commonLayout （布局 -- 公共） | customizedList      | 定制列表布局                          | [配合定制页面定制class使用(具体文档参考-定制界面布局规定)](http://share.ark.burgeononline.com/repository/entryComponents/2/941904/2/1344/P)                                                                                                            |
| commonLayout （布局 -- 公共） | customizedDetails   | 定制详情                            | [配合定制页面定制class使用(具体文档参考-定制界面布局规定)](http://share.ark.burgeononline.com/repository/entryComponents/2/941904/2/1344/P)                                                                                                            |
| modal                   | ark-modal           | all - modal布局                   | ~~~~      |

### 命名空间 - Example
```
// @bojun/oms-theme的主题，引入主题
@import 'omsTheme/index.less';

body {
  #ContentDisplayArea {
    margin: 0 !important;
    background-color: @body-bg !important;
  }
  // 公共部分 菜单背景色/鼠标经过/字体颜色/
  #commonTheme > .navBg(@base-color, @base-color, @base-color_x2,#fff,@base2-color);
  // 公共部分 菜单背景色/菜单背景色鼠标经过/二级菜单鼠标经过背景色/二级菜单鼠标经过字颜色
  #commonTheme > .historyFavorite(@base-color,@base-color_x2,#fff,@base-color,@base-color_x2,#fff,#fff) !important;
  #commonTheme > .NaVertical();
  // 公共部分 导航菜单
  #commonTheme > .NavMenu();
  // 公共部分 tab 边线/选中字体颜色/选中上边框颜色
  #commonTheme > .tabs(#dcdee2,@base2-color,@base2-color);
  // ark -- page
  #commonTheme > .page;
  #ele > .page;
  #ele > .date;
  #ele > .input;
  #ele > .dialog;
  // ark -- 日历
  #commonTheme > .calendar;
  // ark -- 步骤条
  #commonTheme > .steps(#fff,#6b76c1);
  // ark -- 下拉菜单
  #commonTheme > .dropdown;
  // 全局 -- button
  #commonTheme > .allButton;
  #commonTheme > .allFormItem;
  // modal -- button
  #commonTheme > .modalBtn(@base2-color) !important;
  // 全局 -- chekced
  #commonTheme > .checked(@base2-color);
  // 全局 -- agtable
  #commonTheme > .agtable;
  //标准页面 -- buttom
  #standardTheme > .buttonList;
  //标准页面 -- 水印
  #standardTheme > .waterMarkContainer;
  //标准页面 -- tab
  #standardTheme > .tab(@base2-color);
  // 布局
  #commonLayout > .contentMain() !important;
  // 标准
  #stand_list > .standarContent(1, 2, 3) !important;
  // 标准tree列表
  #commonLayout > .treeList;
  // 折叠面板
  #stand_obj_v > .vTableDetail;
  // 折叠面板
  #commonLayout > .collapse;
  // input
  #commonLayout > .allInput(10px);
  //滚动条
  #commonLayout > .scrollbar(12px);
  // table - 排版
  #commonLayout > .tableList !important;
  #cus_com > .tabChange !important;
  // 定制列表
  #cus_list > .customizedList (#5461b8,#fff,#5461b8,#fff);
  // 定制详情
  #cus_obj > .customizedDetails;
  // modal
  #modal > .ark-modal(8px);
  #modal > .fkTab();
  #modal > .modalCenter();
  // #commonLayout > .queryDesc(); // oms图例
  #commonLayout > .skx-queryDesc(); // 斯凯奇图例
  #compoReset > .OmsLabel();
  #compoReset > .OmsLabel();
  #twoColor > .text() !important;
  #commonLayout > .baseCover(); // 根元素覆盖（body节点下的一级节点)
}
```
### npm install

### npm run dev

### npm run dist


## 更新日志


> 2019.12.17 1.0.44

表格 树形结构 添加 开关控制是否展开
修改 表格 数据 data this 指向问题
表单绘制界面 浏览器兼容

> 2020.1.15 1.0.47

组件兼容ie


## 组件使用说明文档


### button

添加了 fcdefault 和 posdefault 类型

fcdefault 类型为幽灵按钮
posdefault 为填充按钮

### select

添加了 multipleType 属性（只有在多选情况下有效）
multipleType 默认为 false,只有全选按钮
multipleType 为 true 时为 malon 样式

### Modal instance (直接调用方法)

添加了 fcSuccess,fcError,fcWarning,posMessage

`this.$Modal.posMessage({ title: 'fcWarning', content: '123123', iconClass:'', mask:true, showCancel:true });`

iconClass 可以控制显示的图标
showCancel 控制是否显示取消按钮
okType 确定按钮类型
cancelType 取消按钮类型
mask 控制蒙层
draggable 控制消息提示是否支持拖拽
footerRender 消息提示底部的 render 方法

@on-keydown 可以监听弹框中的快捷键相应,该方法能接受参数 event

titleAlign 属性可以控制 title 的显示样式,目前支持 left,center

### table

indexMethod 返回参数中多加了 length(表格数据 total)

单双击 加了延时 300 毫秒 事件

colRowMethod 返回当前 table 的 row，col 用于用户合并

colspan:[0,0,0,0,0,1] 列合并（0 表示被合并，1 表示显示）
rowspan:[1,0,1,0,0], 行合并 //向下合并 (1,表示显示，0 表示合并)

### tree

nodeInteraction 控制父子节点是否联动

### form

表单指定报错提示
unique:{ /_ 报错唯一标识 _/
class:'error-tip',
show:false,
message:''
},

`"async-validator": "^1.8.2", //10k 支持数据校验 form "deepmerge": "^2.1.0", // 4k merge object 监听元素设置自适应 "element-resize-detector": "^1.1.14", // 18k table tabs "js-calendar": "^1.2.3", //10k 日期插件 "lodash.throttle": "^4.1.1", //13k 实现节流 scroll "popper.js": "^1.14.1", // 19k 气泡 dropdown.vue "v-click-outside-x": "^3.0.0" // 12k eg：点击body 关闭弹窗`

<!-- 2019-02-25 -->

修改提示框按钮默认样式

<!-- 2019-02-27 -->

tabs 类型为 card 的样式修改

<!-- 2019-03-07 -->

input 组件添加 disabledHidden 属性,控制在 disabled 为 true 时，如果 disabledHidden 为 true,则输入框超出隐藏，鼠标上移出现提示，若为 false，怎正常展示.

<!-- 2019-03-14 -->

select 多选情况下，在选择全部的时候会返回全部所对应的 value 值 bSelect-all
select 增加删除

<!-- 2019-03-20 -->

select 多选添加 clearable 时样式修改,以及对属性 label-in-value 的完善

<!-- 2019-04-09 -->

submenu 添加属性 arrowdown，控制折叠箭头是否展示,默认不展示

<!-- 2019-04-10 -->

修改 select 和日期控件的面板展示逻辑
page 组件修改总数展示逻辑

<!-- 2019-04-16 -->

select 增加属性 optionsVisible，判断 options 是否开启 v-if 控制

<!-- 2019-04-22 -->

select 修改点击全部时，界面显示错误的 bug(是由于上一次代码的改动没有兼容全部的选择)

<!-- 2019-04-23 -->

poptip 样式调整，去除纵向滚动条

<!-- 2019-04-25 -->

tree 组件增加 query 和 queryStyle 属性
query 是模糊匹配字符
queryStyle 是可设置匹配字符样式

<!-- 2019-04-26 -->

tree 组件中的 on-select-change 和 on-check-change 在返回值中多加一个参数(当前改变的节点数据)

input 属性 autocomplete 增加一个可选值 new-password

<!-- 2019-04-28 -->

Input 组件 slot="append" 修改 clear icon 的位置
DropDownSelectFilter 组件去掉只有第一次监听 defaultSelected
Menu 组件 修改 open-names 属性不生效的 bug

<!-- 2019-04-29 -->

tree 组件属性 queryStyle 的类型修改为 Object

<!-- 2019-05-05 -->

tree 增加属性 selectMessageShow，selectMessage
selectMessageShow 控制是否显示当前节点的选中个数
selectMessage 回调函数，可以自定义显示显示内容，返回参数为当前节点选中的个数(考虑过采用 render，但是影响到之前的模糊搜索匹配内容，暂时未动)

<!-- 2019-05-16 -->

AttachFilter 完善 value 缺少导致的 props 爆红
Complexs-dialog 组件 添加 loading 效果
input 添加中文输入 change 拦截，中文输入完成时候在触发 change Input 事件

<!-- 2019-05-22 -->

全局添加 defaultZindex 默认层级的设置，Vue.use(BurgeonUi,{ defaultZindex: 3000 });

<!-- 2019-05-29 -->

修改表格 默认选中 index 事件， AttachFilter 弹窗内容结构赋值

<!-- 2019-05-30 -->

select 添加属性 chooseAll 控制在全选是选项是否全部选中
修改外键模糊查询 下拉选中报错
table 修改 CheckBox 选中表格变色 bug
form 必填字段不能监听问题 (使用时请配合 Object.assign)

<!-- 2019-06-03 -->

修复表格定位层级问题，给 td 在合计情况下添加 zindex 属性
修复表格滚动对齐和头部对齐问题
修复表格为空的时候 暂无数据展示（居中）

<!-- 2019-06-10 -->

外键 模糊查询 赋值 添加 on-change underfind 判断
<!-- 2019-06-17 -->
外键失去焦点事件，
table index 为0  的时候不能显示

<!-- 2019-06-20  -->
table 添加 totaldata  数据展示
input ,textarea,checkbox,radio 去除外边框阴影
<!-- 2019-06-24  -->
修复checkbox 默认值 设置的时候 先选中 在取消的效果
<!-- 7.2 -->
外键模糊查询 enterType 为true 的时候 回车 和失去光标默认选中 第一条
<!-- 7.4 -->
模糊查询 配置 图标点击事件的回调（在清除事件 配置后 不抛出）
<!-- 7.16 -->
表格 双击行和单击事件，抛出点击位置的列数据
<!-- 9.29 -->
修改表格点击兼容 事件、 气泡附件 兼容 placeholder
<!-- 10.30 -->
修改formLayout 组件less文件 引用问题，表格动态计算、及显示省略号问题
<!-- 11/22 -->
优化表格 鼠标滑动内存溢出事件
<!-- 12/3 -->
表格添加 卡槽功能
表格添加 树形数据展示功能

<!-- 7/14 -->
Cascader增加valueName和labelName字段，控制value和label字段修改

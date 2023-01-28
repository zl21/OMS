## businessForm组件的使用说明

### 一. 介绍
#### 1. 概述
表单配置，优势在于，简化了template，使表单控件统一配置在js代码中，方便维护。支持控件类型：`input`,`textarea`,`select`,`date`,`time`,`popInput`,`popInputPlus`,`popInput_ld`,`radio`,`checkbox`,`dimSearch`,`inputNumber`,`bothNumber`,`bothInput`,`switch`，另外支持插槽，处理复杂情况下的字段，比如组合字段。
#### 2. 应用场景
* 普通表单
* 表格中包括表单的

### 二. 配置项说明
#### 1. 普通输入框型：
##### 1) 基本配置：
```javascript
{
	style: 'input', // 输入框类型
	label: '自定义02',
	value: 'ENAME', // 输入框的值
	width: '6', // 所占的宽度 (宽度分为24份,数值代表所占份数的宽度)
	placeholder: '', // 占位文本，默认为请输入
	ghost: false, // 是否关闭幽灵按钮，默认开启
	disabled: false,
	inputChange: () => {
		// this.inputCapital(2);
	}
}
```
##### 2) 图例：
![](http://arkshare-file.oss-cn-hangzhou.aliyuncs.com/arkshare-pro/arkdocs/markdown/1617847532353/input.png)

------------

#### 2. 下拉单选：
##### 1) 基本配置：
```javascript
{
	style: 'select', // 下拉框类型
	label: '组合商品类型', //input框前的展示文本
	width: '6', // 所占宽度宽度
	value: 'GROUP_TYPE', // 输入框的值
	multiple: false, // 布尔值,下拉框是否开启多选,默认为不开启
	disabled: false, // 是否禁用
	selectChange: () => {}, // 选中事件，默认返回选中的值,默认返回当前值value
	options: [// 下拉框选项值
		{
			value: 1,
			label: '福袋',
		},
		{
			value: 2,
			label: '普通',
		}
	]
}
```
##### 2) 图例：
![](http://arkshare-file.oss-cn-hangzhou.aliyuncs.com/arkshare-pro/arkdocs/markdown/1617847883314/select.png)

------------

#### 3. 弹窗单选型：
##### 1) 普通配置：
```javascript
{
	style: 'popInput', // 输入框类型
	width: '6',
	inputList: [], // 用于联动查询
	// rules: true, //必选标识,值不为required时无标识
itemdata: {
	colid: 166758, // 字段id
	colname: 'PS_C_BRAND', // 当前字段的名称 用来显示的
	display: 'text', // 显示什么类型，例如xml表示弹窗多选加导入功能，mrp表示下拉多选
	fkdisplay: 'drp', // 外键关联类型
	fkdesc: '品牌',
	inputname: 'PS_C_BRAND:ENAME', // 这个是做中文类型的模糊查询字段，例如ENAME
	isfk: true, // 是否有fk键
	isnotnull: true, // 是否必填
	name: window.vmI18n.t('table_label.brand'), // 品牌
	readonly: false, // 是否可编辑，对应input readonly属性
	reftable: 'PS_C_BRAND', // 关联的表
	reftableid: 23051, // 关联的表ID
	pid: '', // 选择后选中数据的ID
	valuedata: '' // 选择后用于展示的值
	refcolval: {}, // 用于联动查询
},
	oneObj: val => {}// 选中触发事件
},
```
##### 2) 图例：
![](http://arkshare-file.oss-cn-hangzhou.aliyuncs.com/arkshare-pro/arkdocs/markdown/1617848209094/drp.png)
##### 3) 联动查询配置：
 - 以省、市、区联动查询为例
	  - 1) 省的inputList是国的itemdata；（* 必须填充，否则点击无效！）
	  - 2) 省的itemdata的refcolval，配置之后，如未选择‘省’先去选择‘市’，则会提示：‘请先选择省’
```javascript
refcolval: {
	fixcolumn: 'C_UP_ID',
	expre: 'equal',
	srccol: 'CP_C_REGION_COUNTRY_ID', // 国的colname
},
```
 - 特别地：若‘省’的值被修改之后想要联动清空‘市’、‘区’，要在代码中自己监听。

`参考：addAliasOrRegion.vue 的relationShip()方法`

```javascript
如.
	{
		style: 'popInput',
		width: '6',
		inputList: [], // 用于联动查询，若当前为‘市’的配置，则此inputList里面要push的是‘省’的itemdata
		itemdata: {
			colid: 166758,
			colname: 'CITY',
			fkdisplay: 'drp',
			isnotnull: true,
			name: '市',
			readonly: false,
			reftable: 'CITY_TABLE',
			reftableid: 23051,
			pid: '',
			valuedata: ''
			refcolval: {
				fixcolumn: "C_UP_ID",
				expre: "equal", // 相等
				srccol: "PROVINCE", // ‘省’字段
			}, // 用于联动查询
		},
		oneObj: val => {}
	},
```

------------

#### 4. 弹窗多选型：
##### 1) 普通配置：
##### 2) 图例：

------------

#### 5. DropDownSelectFilter 弹窗单/多选型：
##### 1) 普通配置：
```javascript
formData: [
          {
            colname: 'PS_C_SPEC_GROUP_ID1',
            style: 'DropDownSelectFilter', // ark里的弹框单多选
            label: '规格名称二',
            width: '6',
            single:true, // 是否是单选，可选值为 true、false
            pageSize: 10, // 每页条数
            columns:['name','value'],// 展现的组???
            showColnameKey:"'show'",
            itemdata: {
              totalRowCount: 39, // 数据总条数
              AutoData: [], // 模糊搜索的数据
              data:this.popData, // 下拉气泡表格里数据
            },
            changePage:()=>{}, // 页码改变时触发
            InputValueChange:()=>{}, // 输入框输入时触发，模糊查询
			fkrpSelected:()=>{}, // 选中值时触发
			clearInput:()=>{}, // 点击清空的小叉号icon时触发
          },
        ],
```
##### 2) 图例：
![](http://arkshare-file.oss-cn-hangzhou.aliyuncs.com/arkshare-pro/arkdocs/markdown/1617938481553/droppop.png)
##### 3) 配置项说明：
- itemdata中的属性值要通过自己请求接口填充；
- AutoData、data等数据格式请参考：[DropDownSelectFilter](http://arkui.dev.syman.cn/#/components/fkrp-select#XLDX "DropDownSelectFilter")
- 页码改变(changePage) 及 模糊查询(InputValueChange) 都要实时调用接口从而实时填充itemdata。

------------

#### 6. 双数字框型：
##### 1) 普通配置：
##### 2) 图例：
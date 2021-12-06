## subTable子表组件的使用说明

### 一. 组件说明
根据接口（/p/cs/objectTableItem）渲染子表（单纯的展示类子表.eg:日志--没有表内操作）
配置文件路径：/burgeon-project-logic/config/config/subTable.config.js

### 二. 配置项说明
1. index.js中添加/修改配置：

```javascript
const con = {
  orderCenter: {
    OC_B_RETURN_ORDER110: { // 退货日志
      table: 'OC_B_RETURN_ORDER_LOG',
      refcolid: 171736, // 明细表的primaryKey（主键字段）的ID
      searchdata: {
        column_include_uicontroller: true,
        orderby: [{ column: 'OC_B_RETURN_ORDER_LOG.ID', asc: false }],
        range: 10,
        fixedcolumns: {},
        startindex: 0
      }
    },
  },
  PS_C_SKU: {
    PS_C_ALTERNATE_SKU110: { // 备用条码
      table: 'PS_C_ALTERNATE_SKU',
      refcolid: 165654,
      searchdata: {
        column_include_uicontroller: true,
        range: 10,
        fixedcolumns: {},
        startindex: 0
      }
    },
  }
}
CustomConfig.editSubTableConfig(con); //  修改/传入配置
console.log('CustomConfig.subTableConfig::', CustomConfig.subTableConfig);
```


### 三. 使用说明

1.引入组件：
```
import subTable from 'professionalComponents/subTable';
```
2.注册：
```
components: {
    subTable,
},
```
3.data中定义subTableConfig：

```
subTableConfig: {
        centerName: '', // 用于匹配this.$OMS2.subTableCon下的一级key（可能是中心名）
        tablename: '', // 子表的表名
        objid: '',  // 明细ID（路由上的那个）
		pageShow:true|false, // 当前是否展示页码，默认false
},
```
4.使用组件：
```
<subTable :component-data="subTableConfig"></subTable>
```

------------

&copy;撰写：zhou.l@burgeon.cn
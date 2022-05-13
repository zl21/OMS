## businessAgTable表格
### 一.组件说明

1. 该组件在ag-grid(vue版本)为基础,开发的一套适用于R3V1.4框架业务的表格组件
2. 使用场景:
- 适用于数据量很大的表格展示需求
- 该表格基于ag-grid,兼容ag-grid的所有特性

### 二.使用说明
- 引入组件注册

```javascript
import businessAgTable from 'professionalComponents/businessAgTable';
components :{
	businessAgTable
}
```

- 组件配置项

```javascript
	<businessAgTable
      :ag-table-config="agTableConfig"
      :options="options"
      @on-row-dblclick="onRowDblclick"      //表格行双击事件
      @on-page-change="pageChange"          //分页切换事件
      @on-page-size-change="pageSizeChange" //可选分页项切换事件
      @on-selection-change="onSelectionChange"  //复选框选中事件~~~~
    />
	  
	  data(){
	  return {
	  	 agTableConfig: {   //配置数据
          tableHeight: '480px', //表格高度
          columnDefs: [
              {
                "displayName":"序号",
                "field":"index",
                "checkboxSelection":true,   //是否开启多选
                "pinned":"left"     //固定列
              }
              {
			  "displayName":"异常类型",
			  "field":"EXCEPTION_TYPE"
			  }
          ],   表头数据
          rowData: [
              {
			  	EXCEPTION_TYPE:'数据'
			  }
          ],  //表格数据
          pagenation: {     // 设置总条数
            total: 0,       // 条数
            pageSize: 10,   // 页数
            current: 1,     //当前页
            pageSizeOpts: [],       //可选分页项
          },
          renderParams:(cellData)=> {       //render表格渲染
            if (cellData.field == 'ORDER_TAG') {
                return {
                    renderContainer: 'CellRenderByFunction',
                    renderComponent: (h, params) => {
                        console.log(params);
                        return h('div', {
                            domProps: {
  
                            }
                        },
                            params.row.ORDER_TAG.map(item => h('span', {
                                domProps: {
                                    innerText: item.text
                                },
                                style: {
                                    border: `1px solid${item.clr}`,
                                    color: item.clr,
                                    margin: '0 2px',
                                    borderRadius: '6px',
                                    padding: '2px'
                                }
                            }))
                        )
                    }
                }
            }else if(cellData.field == 'PRODUCT_DETAILS'){
              return {
                renderContainer: 'CellRenderByFunction',
                renderComponent: (h , params) => {
                  return h('a' , {
                    on:{
                      click:()=>{
                        this.proDetailConfig.modal_proDetail = true;
                        this.proDetailConfig.title = params.row.PRODUCT_DETAILS;
                        this.proDetailConfig.ID = params.row.ID;
                      }
                    }
                  }, params.row.PRODUCT_DETAILS)
                }
              }
            }else if(cellData.field == 'PACKAGE_DETAILS'){
              return {
                renderContainer: 'CellRenderByFunction',
                renderComponent: (h , params) => {
                  return h('a' , {
                    on:{
                      click:()=>{
                        this.proDetailConfig.modal_proDetail = true;
                        this.proDetailConfig.title = params.row.PACKAGE_DETAILS;
                        this.proDetailConfig.ID = params.row.ID;
                      }
                    }
                  }, params.row.PACKAGE_DETAILS)
                }
              }
            }
        },
        },
	  }
	  }
```

* renderParams表格渲染:
   
```javascirpt
    renderParams:{		//render函数
    renderContainer: 'CellRenderByFunction',    //render函数渲染
    renderComponent:(h,params)=>{}
    }

    renderParams:{		//vue组件render
        return {renderComponent: 你的组件名称}
    }
```

* 表格其他配置:

```javascript
    options:{
          datas:{},     //南京框架增加的配置,datas必须存在
          floatingFilter:false      //关掉表格浮动过滤器 agTable原生配置
        },
```
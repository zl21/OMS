import {
    Grid
  } from 'ag-grid'; //该依赖在标品项目中
  import 'libs/ag-grid/dist/styles/ag-grid.css';  //该依赖在标品项目中
  import 'libs/ag-grid/dist/styles/ag-theme-balham.css';  //该依赖在标品项目中
  import {
    LicenseManager
  } from 'ag-grid-enterprise/main'; //该依赖在标品项目中
  
  import {
    agGridEnterpriseLicenseKey
  } from './constant';
  
  // 设置enterprise key
  LicenseManager.setLicenseKey(agGridEnterpriseLicenseKey);
  const AG_SEQUENCE_COLUMN_NAME = '__ag_sequence_column_name__'; // 表格序号列字段
  /**
   * @param container // 容器
   * @param opt // 配置项
   * @returns {function(*=, *=)} 函数
   */
  const initializeAgTable = (container, opt, obj) => {
    const agTable = (agGridTableContainer, options, obj) => {
      agTable.customizeOptions = options;
      agGridTableContainer.style.width = '100%';
      agGridTableContainer.style.height = obj.tableHeight || '600px';
      agGridTableContainer.style.margin = '0 auto';
      agGridTableContainer.style.position = 'relative';
      agGridTableContainer.classList.add('ag-theme-balham');
      let updateBodyScrollDelay = -1; // 横向滚动延迟计时器
      // 判断agGridTableContainer是否已经被实例化
      if (agGridTableContainer.agTable) {
        agGridTableContainer.agTable.customizeOptions = options;
        return agGridTableContainer.agTable;
      }
      // eslint-disable-next-line no-unused-expressions
      (options.onBodyScroll = function (params) {
        const {
          columnApi,
          direction
        } = params;
        clearTimeout(updateBodyScrollDelay);
        // if (direction === 'horizontal') {
        //   updateBodyScrollDelay = setTimeout(() => {
        //     columnApi.autoSizeAllColumns();
        //   }, 10); // 当检测到滚动条为横向滚动时，自适应当前视口范围内的所有列
        // }
        agGridTableContainer.setAttribute('data-scroll-left', params.left);
        agGridTableContainer.setAttribute('data-scroll-top', params.top);
      }), // 当表体发生滚动时候触发该事件
        options.floatingFilter = options && options.floatingFilter ? options.floatingFilter : true, // 是否显表头下方的浮动筛选框
        options.toolPanelSuppressSideButtons = true; // 隐藏右侧工具栏
      // eslint-disable-next-line no-new
      new Grid(agGridTableContainer, options);
      const {
        api,
        columnApi
      } = options;
      agTable.api = api;
      agTable.columnApi = columnApi;
      // 赋值表头数据
      agTable.setCols = (data) => {
        // 自适应所有列宽
        columnApi.autoSizeAllColumns();
        if (agGridTableContainer.agTable) {
          return agTable;
        }
  
        api.setColumnDefs(data);
        return agTable;
      };
      // 重置表头数据
      agTable.resetCols = (data) => {
        api.setColumnDefs(data);
        // 自适应所有列宽
        columnApi.autoSizeAllColumns();
        return agTable;
      };
      // 暴露纵向滚动方法
      agTable.fixAgRenderChoke = () => {
        const viewport = document.querySelector('.ag-body-viewport');
        if (viewport) {
          const currentViewPortScrollLeft = agGridTableContainer.getAttribute(
            'data-scroll-left'
          );
          const currentViewPortScrollTop = agGridTableContainer.getAttribute(
            'data-scroll-top'
          );
          // viewport.scrollTop = 5;
          // viewport.scrollLeft = 1;
          setTimeout(() => {
            viewport.scrollTop = currentViewPortScrollTop || 0;
            viewport.scrollLeft = currentViewPortScrollLeft || 0;
            columnApi.autoSizeAllColumns();
          }, 50);
        }
        return agTable;
      };
      // 赋值表格数据
      agTable.setRows = (data) => {
        if (!data) {
          return agTable;
        } // 如果未传参,则返回
        if (!(Object.prototype.toString.call(data) === '[object Array]')) {
          alert('agTable.setRows requires Array as first param');
          return agTable;
        }
        // if (!(data[0][AG_SEQUENCE_COLUMN_NAME])) {
        data.forEach((item, index) => {
          item[AG_SEQUENCE_COLUMN_NAME] = index + 1;
        });
        // }
  
        api.setRowData(data);
        return agTable;
      };
      agTable.cleanRows = () => {
        // 清空数据
        api.setRowData([]);
        return agTable;
      };
      agTable.getSelect = () =>
        // 获取表格勾选数据
        // console.log(api.getSelectedRows());
        api.getSelectedRows();
  
      agTable.deselectAll = () => {
        api.deselectAll();
      };
      // 暴露销毁方法，释放内存
      agTable.destroy = () => {
        api.destroy();
        return agTable;
      };
      agTable.loading = () => {
        api.showLoadingOverlay();
        return agTable;
      };
      agTable.setPinnedBottomRowData = (rowList) => {
        api.setPinnedBottomRowData(rowList);
        return agTable;
      };
      agGridTableContainer.agTable = agTable;
      return agTable;
    };
    return agTable(container, opt, obj);
  };
  
  export default initializeAgTable;
  
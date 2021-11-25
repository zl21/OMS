// 检查必填项是否已经填写
export const setTableDataMixin = {
  mounted() {

  },
  methods: {
    /**
     * 设置表格头部和表格数据 (用于<Table>组件)
     * @param obj
     * @param hasSelection
     * @param hasIndex
     * @param customData
     * @returns {{tbody: *, thead: *[]}}
     */
    setTableData(obj, hasSelection, hasIndex, customData) {
      const selection = hasSelection ? [
        {
          type: 'selection',
          width: 40,
          align: 'center'
        }
      ] : []
      const index = hasIndex ? [
        {
          key: 'INDEX',
          type: 'index',
          title: '序号',
          width: 60,
          align: 'left'
        }
      ] : []
      const filterList = [] // 筛选列表
      const thead = obj.tabth.filter((element) => {
        if (element.colname === 'ID') return false;
        return true;
      }).map((element) => {
        if (element.isfilter) {
          filterList.push({
            value: element.inputname,
            label: element.name,
          }) // isfilter为true的字段支持筛选
        }
        const customDataFun = customData ? customData(element) : {}
        const obj = {
          key: element.colname,
          title: element.name,
          ...customDataFun
        };
        return obj;
      });
      const tbody = obj.row.map((row) => {
        const obj = {};
        for (const i in row) {
          obj[i] = row[i].val;
        }
        return obj;
      });
      return {
        thead: [...selection, ...index, ...thead],
        tbody,
        filterList
      }
    },
  }
};

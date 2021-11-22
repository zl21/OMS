// import { OC_B_ORDER } from './config';
// import config from './config';
export default {
  data() {
    return {
      vmI18n:$i18n,
      tableItemUrl: '/p/cs/objectTableItem',
      tableConfig: {
        columns: [],
        data: [],
        pageShow: false, // 控制分页是否显示
        btnsShow: true, // 控制操作按钮是否显示
        searchInputShow: false, // 控制搜索框是否显示
        indexColumn: true,
        width: '', // 表格宽度
        height: '', // 表格高度
        border: true, // 是否显示纵向边框
        total: 0, // 设置总条数
        pageSizeOpts: [10, 20, 30,50,100], // 每页条数切换的配置
        pageSize: 10, // 每页条数
        current: '', // 当前页
      },
      objid: '',
      options: {} // 自定义属性（选填）
    };
  },
  props: {
    componentData: {}
  },
  watch: {
    componentData: {
      handler(newVal) {
        this.objid = newVal.objid;
        this.getColumns(newVal);
        this.getData(newVal);
      },

    }
  },
  methods: {
    pageChange(val) {
      this.tableConfig.current = val;
      this.getData(this.componentData,{index:val,size:this.tableConfig.pageSize});
    },
    pageSizeChange(val) {
      this.tableConfig.pageSize = val;
      this.getData(this.componentData,{size:val});
    },
    // 获取表头
    async getColumns(req){
      try {
        const { data: {data} } = await this.service.orderCenter.initObject({"TABLE":req.tabValue});
        let arr = [];
        data.DATA.forEach(element => {
          arr.push({title:`${element.headerName}`,key:`${element.field}`});
        });
        this.tableConfig.columns = arr;
      } catch (error) {
        new Error(error)
      }
    },
    // 获取数据
    async getData(req,obj) {
      console.log(req,obj);
      this.loading = true;
      this.tableConfig.data = [];
      this.tableConfig.pageShow = false;
      let params = {
        ID: this.objid, 
        TABLE: 'OC_B_ORDER',
        SUB_TABLE: req.tabValue,
        REFRESH: false
      };
      if(obj){
        params = Object.assign(params,obj)
      }
      try {
        const { data: { data } } = await this.service.orderCenter.queryObject(params);
        this.tableConfig.data = data.DATA.SUB_ITEM;
        if(data.DATA.PAGE_INFO){
          this.tableConfig.pageShow = true
          this.tableConfig.total = data.DATA.PAGE_INFO.COUNT
        }
      } catch (error) {
        new Error(error)
      }
        
    },
    showTable(obj) {
      const thead = obj.tabth.filter((element) => {
        if (element.colname === 'ID') return false;
        return true;
      }).map((element) => {
        const obj = {
          key: element.colname,
          title: element.name
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
      this.tableConfig = {
        columns: thead,
        data: tbody,
        pageShow: true, // 控制分页是否显示
        btnsShow: true, // 控制操作按钮是否显示
        searchInputShow: false, // 控制搜索框是否显示
        indexColumn: true,
        width: '', // 表格宽度
        height: '', // 表格高度
        border: true, // 是否显示纵向边框
        total: obj.totalRowCount, // 设置总条数
        pageSizeOpts: obj.selectrange, // 每页条数切换的配置
        pageSize: obj.defaultrange // 每页条数
      };
    }
  },
  mounted() {
    if (this.componentData && this.componentData.tabValue) {
      this.getData(this.componentData);
    }
  }
};

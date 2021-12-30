import { OC_B_ORDER } from '@/js/pages/orderCenter/returngood/config';
export default {
  data() {
    return {
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
        // this.getColumns(newVal);
        // this.getData(newVal);

        this.request(newVal);
      },

    }
  },
  methods: {
    async request(req) {
      const self = this;
      const data = JSON.parse(JSON.stringify(OC_B_ORDER[req.tablename]));
      self.objid = req.objid || -1;
      if (self.objid === -1) return;
      // data.objid = self.objid ;
      const searchdata = {};
      searchdata.startindex = (this.tableConfig.current - 1) * this.tableConfig.pageSize;
      searchdata.range = this.tableConfig.pageSize;
      data.searchdata = JSON.stringify(Object.assign(data.searchdata, searchdata));
      self.options = req.options || {};
      const formdata = new FormData();
      formdata.append('objid', self.objid);
      formdata.append('table', data.table);
      formdata.append('searchdata', data.searchdata);
      formdata.append('refcolid', data.refcolid);

      const res = await this.service.common.objectTableItem(formdata);
      if (res.data.code === 0) {
        self.showTable(res.data.datas);
      } else {
        console.log('数据加载失败');
      }

      // axios({
      //   url: this.tableItemUrl,
      //   method: 'post',
      //   data: formdata
      // }).then((res) => {
      //   if (res.data.code === 0) {
      //     self.showTable(res.data.datas);
      //   } else {
      //     console.log('数据加载失败');
      //   }
      // });
    },
    pageChange(val) {
      this.tableConfig.current = val;
      // this.getData(this.componentData,{index:val,size:this.tableConfig.pageSize});
    },
    pageSizeChange(val) {
      this.tableConfig.pageSize = val;
      // this.getData(this.componentData,{size:val});
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
      // this.getData(this.componentData);
      this.request(this.componentData);
    }
  }
};

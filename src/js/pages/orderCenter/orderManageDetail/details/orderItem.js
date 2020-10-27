import businessActionTable from "professionalComponents/businessActionTable.vue";
import config from "./config";
import axios from "axios";
export default {
  data() {
    return {
      tableItemUrl: "/p/cs/objectTableItem",
      tableConfig: {
        columns: [],
        data: [],
        pageShow: true, //控制分页是否显示
        btnsShow: true, //控制操作按钮是否显示
        searchInputShow: false, // 控制搜索框是否显示
        indexColumn: true,
        width: "", // 表格宽度
        height: "", // 表格高度
        border: true, //是否显示纵向边框
        total: 0, //设置总条数
        pageSizeOpts: [10, 20, 30], // 每页条数切换的配置
        pageSize: 10,// 每页条数
        current: '', //当前页
      },
      objid: "",
      options: {} //自定义属性（选填）
    };
  },
  components: {
    businessActionTable
  },
  props: {
    componentData: {}
  },
  watch: {
    componentData: {
      handler(newVal, oldVal) {
        this.request(newVal);
      },

    }
  },
  methods: {
    pageChange(val) {
      this.tableConfig.current = val;
      this.request(this.componentData);
    },
    pageSizeChange(val) {
      this.tableConfig.pageSize = val;
      this.request(this.componentData);
    },
    request(req) {
      let self = this;
      let data = JSON.parse(JSON.stringify(config.OC_B_ORDER[req.tablename]));
      self.objid = req.objid || -1;
      if (self.objid === -1) return;
      //data.objid = self.objid ;
      var searchdata = {};
      searchdata.startindex = (this.tableConfig.current - 1) * this.tableConfig.pageSize;
      searchdata.range = this.tableConfig.pageSize;
      data.searchdata = JSON.stringify(Object.assign(data.searchdata, searchdata));
      self.options = req.options || {};
      var formdata = new FormData()
      formdata.append("objid", self.objid);
      formdata.append("table", data.table);
      formdata.append("searchdata", data.searchdata);
      formdata.append("refcolid", data.refcolid);

      axios({
        url: this.tableItemUrl,
        method: "post",
        data: formdata
      }).then(res => {
        if (res.data.code === 0) {
          self.showTable(res.data.datas);
        } else {
          console.log("数据加载失败");
        }
      });
    },
    showTable(obj) {
      let thead = obj.tabth.filter((element) => {
        if (element.colname === 'ID') return false;
        return true;
      }).map(element => {
        let obj = {
          key: element.colname,
          title: element.name
        };
        return obj;
      });
      let tbody = obj.row.map(row => {
        let obj = {};
        for (let i in row) {
          obj[i] = row[i].val;
        }
        return obj;
      });
      let tabname = obj.tabname;
      this.tableConfig = {
        columns: thead,
        data: tbody,
        pageShow: true, //控制分页是否显示
        btnsShow: true, //控制操作按钮是否显示
        searchInputShow: false, // 控制搜索框是否显示
        indexColumn: true,
        width: "", // 表格宽度
        height: "", // 表格高度
        border: true, //是否显示纵向边框
        total: obj.totalRowCount, //设置总条数
        pageSizeOpts: obj.selectRange, // 每页条数切换的配置
        pageSize: obj.defaultrange // 每页条数
      };
    }
  },
  mounted() {
    if (this.componentData && this.componentData.tablename) {
      this.request(this.componentData);
    }
  }
};

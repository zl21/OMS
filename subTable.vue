<!-- 开发文档：http://knowledge.ark.burgeononline.com/repository#/entryComponents/2/907865/2/2061 -->
<template>
  <div>
    <business-action-table
      :jordan-table-config="tableConfig"
      @on-page-change="pageChange"
      @on-page-size-change="pageSizeChange"
    />
  </div>
</template>

<script>
import businessActionTable from "./businessActionTable.vue";
// import config from "@/js/pages/orderCenter/orderManageDetail/details/config.js";
export default {
  data() {
    return {
      tableConfig: {
        showHeader: true,
        columns: [],
        data: [],
        pageShow: true, // 控制分页是否显示
        btnsShow: true, // 控制操作按钮是否显示
        searchInputShow: false, // 控制搜索框是否显示
        indexColumn: true,
        width: "", // 表格宽度
        height: "", // 表格高度
        border: true, // 是否显示纵向边框
        total: 0, // 设置总条数
        pageSizeOpts: [10, 20, 30, 50, 100], // 每页条数切换的配置
        pageSize: 10, // 每页条数
        current: "", // 当前页
      },
      objid: "",
      options: {}, // 自定义属性（选填）
    };
  },
  components: {
    businessActionTable,
  },
  props: {
    /**
     * componentData属性说明：
     * @centerName 一般为中心名,不传则默认是'orderCenter',用于匹配config文件的一级key
     * @tablename 当前明细表的表名
     * @objid 明细ID（这条详情的ID）
     * @pageShow 当前是否展示页码
     */
    componentData: {},
  },
  watch: {
    componentData: {
      handler(newVal) {
        this.request(newVal);
      },
    },
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
    async request(req) {
      const self = this;
      const centerName = req.centerName ? req.centerName : "orderCenter";
      /**
       * config配置信息
       * http://knowledge.ark.burgeononline.com/repository#/entryComponents/2/907865/2/2061
       */
      if (!self.config[centerName][req.tablename]) {
        console.log("no Config in this.$OMS2.subTableConfig ！！！");
        console.log('this.$OMS2.subTableConfig::', self.config);
        return;
      }
      const data = JSON.parse(
        JSON.stringify(self.config[centerName][req.tablename])
      ); // 匹配config文件中每个小item的key
      self.objid = req.objid || -1;
      // if (self.objid === -1) return;
      const searchdata = {};
      searchdata.startindex =
        (this.tableConfig.current - 1) * this.tableConfig.pageSize;
      searchdata.range = this.tableConfig.pageSize;
      data.searchdata = JSON.stringify(
        Object.assign(data.searchdata, searchdata)
      );
      self.options = req.options || {};
      const formdata = new FormData();
      formdata.append("objid", self.objid);
      formdata.append("table", data.table);
      formdata.append("searchdata", data.searchdata);
      formdata.append("refcolid", data.refcolid);
      const res = await this.service.common.objectTableItem(formdata).catch(() => {
        self.$Message.warning('p/cs/objectTableItem try catch !')
      });
      if (res.data.code === 0) {
        self.showTable(res.data.datas ? res.data.datas : res.data.data);
      } else {
        // 数据加载失败
        // console.log(self.vmI18n.t("modalTips.z3"));
      }
    },
    showTable(obj) {
      const thead = obj.tabth
        .filter((element) => {
          if (element.colname === "ID") return false;
          return true;
        })
        .map((element) => {
          const obj = {
            key: element.colname,
            title: element.name,
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
        showHeader: true,
        columns: thead,
        data: tbody,
        pageShow: this.componentData.pageShow || false, // 控制分页是否显示
        btnsShow: true, // 控制操作按钮是否显示
        searchInputShow: false, // 控制搜索框是否显示
        indexColumn: true,
        width: "", // 表格宽度
        height: "", // 表格高度
        border: true, // 是否显示纵向边框
        total: obj.totalRowCount, // 设置总条数
        pageSizeOpts: obj.selectrange, // 每页条数切换的配置
        pageSize: obj.defaultrange, // 每页条数
      };
    },
  },
  created() {
    const _this = this;
    _this.config = this.$OMS2.subTableConfig;
  },
  mounted() {
    if (this.componentData && this.componentData.tablename) {
      this.$nextTick(() => {
        this.request(this.componentData);
      })
    }
  },
};
</script>

<template>
  <div style="width:250px;" class="gf">
    <p class="title">数据导出中...</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  components: {
  },
  props: {
    objList: {
      type: Array
    },
    idArr: {
      type: Array
    },
    webid: {
      type: Number
    },
    tablename: {
      type: String
    },
    rowData: {
      type: Array
    }
  },
  created() {
    let self = this;
    self.getBatchNumber();
  },
  methods: {
    getBatchNumber() {
      let self = this;
      let fixedcolumns = self.$parent.$parent.formObj.fixedcolumns;
      let url = '/p/cs/exportOrderReport';
      let searchdata ={
        table:"ORDEREXPORTVIEW",
        column_include_uicontroller:true,
        fixedcolumns:fixedcolumns
      };
      let fromdata = new FormData();
      fromdata.append("searchdata", JSON.stringify(searchdata));
      fromdata.append("filename", "订单导出报表");
      fromdata.append("filetype", " .xlsx");
      fromdata.append("showColumnName", true);
      fromdata.append("menu", "订单导出报表");
      axios({
        url: url,
        method: "post",
        data: fromdata
      }).then(function(res) {
        self.$emit("closeActionDialog");
        if (res.data.code === 0) {
          let mes = res.data.message || "导出成功！";
          self.$Message.success(mes);
          self.$store.commit("TabOpen", {
            id: res.data.data,
            type: "singleView",
            name: "singleView",
            label: "我的任务",
            query: {
              id: res.data.data,
              pid: "10010",
              ptitle: "我的任务",
              ptype: "table",
              tabTitle: "我的任务",
              tableName: "CP_C_TASK"
            }
          });
          self.downloadUrlFile(res.data.data);
        } else {
          let err = res.data.message || "失败！";
          self.$Message.error(err);
        }
      })
    }
  },
};
</script>

<style>
  .gf .title {
    height: 50px;
    line-height: 50px;
    text-align: center;
  }
</style>

<template>
  <div class="targetDetailToSalers">
    <Spin size="large" fix v-if="spinShow"></Spin>
    <Table :columns="columns" :data="data" :height="height" :totalData="tableTotal"></Table>
  </div>
</template>
<script>
export default {
  props: {
    objList: Array,
    idArr: Array,
    objid: "", //表ID
    selectItem: {}, //表信息
    refresh: Boolean, //刷新
    save: Boolean, //保存
    tablename: {}, //主表表名
    isdisabled: {
      type: Boolean
    }, //用于判断状态是否变更
    isActive: Boolean, //true显示 false表示禁用
    editsave: Boolean
  },
  data() {
    return {
      spinShow: false,
      columns: [],
      data: [],
      tableTotal: [
        {
          dateTime: "合计",
          dayKpi: "0"
        }
      ],
      height: 350,
      saveData: [], //存放修改的数据用于保存操作
      saler_prefix: "saler_", //字段前缀
      weight_prefix: "weight_",
      kpi_prefix: "kpi_"
    };
  },
  watch: {
    save(val) {
      let self = this;
      if (val) {
        this.saveCurrent().catch(self.saveAfterAction)
      }
    },
    refresh(val) {
      if (val) this.init();
      this.$emit("changeRefresh", false);
    },
    editsave(val) {
      console.log("editsave");
    }
  },
  methods: {
    search() {
      //查询接口
      let formdata = new FormData();
      let obj = { retailBusinessTargetId: this.$route.params.itemId };
      formdata.append("param", JSON.stringify(obj));
      return this.service.orderCenter.retailBusinessTargetSalerQuery(formdata);
    },
    initTableElement() {
      let self = this;
      // 初始化表头
      let cols = [...this.columns];
      let fixed = ['dateTime', 'weekName', 'dayKpi'];
      this.columns = cols.map(row => {
        row.align = "center";
        if (fixed.includes(row.key)) row.fixed = 'left';
        //row.className = "gray";

        row.renderHeader = (h, params) => {
          return h("div", { class: "headClass" }, row.title);
        };
        if (row.children && row.children.length > 0) {
          row.children.forEach(item => {
            item.align = "center";
            item.className =
              item.key.indexOf("weight") > -1 ? "yellow" : "pink";
            delete item.children;
            self.isdisabled
              ? ""
              : (item.render = (h, params) => {
                return h("input", {
                  domProps: {
                    value: params.row[item.key] == 0 ? '' : params.row[item.key]
                  },
                  on: {
                    blur: event => {
                      let value = Number(this.getEvent(event, item));
                      event.target.value = (value === 0 ? '' : value);
                      this.calcChangeItem(
                        item.key,
                        params.row,
                        params.column,
                        value
                      );
                    },
                    change: event => {
                      this.formatInput(event, item, params.row);
                    }
                  }
                });
              });
          });
        } else {
          delete row.children;
        }
        return row;
      });

      // this.data.forEach((item) =>{
      //    item.dayKpi = 1000;
      // });
      //初始化表格合计项目
      this.totalDateKpi("dayKpi");
      let rows = cols.splice(3);
      rows.forEach(col => {
        let [columnName, id] = col.key.split("_");
        this.totalCalc(columnName, id);
      });
    },
    getEvent(event, column) {
      let value = isNaN(event.target.value) ? 0 : Number(event.target.value).toFixed(2);
      return value;
    },
    formatInput(event, column, row) {
      let org_val = row[column.key] || 0;
      let value = isNaN(event.target.value) ? 0 : Number(event.target.value).toFixed(2);
      if (column.key.indexOf("weight") > -1 && (value > 1 || value < 0)) {
        event.target.value = org_val;
      }
    },
    calcChangeItem(columnName, row, column, value) {
      let obj = this.data.find(item => {
        return item.dateTime === row.dateTime;
      });
      if (!obj) return;
      this.$set(obj, columnName, value);
      this.alterTargetByWeightOrKpi(obj, columnName);
    },
    /**
     * 修改权重或者指标
     */
    alterTargetByWeightOrKpi(row, columnName) {
      let [col, id] = columnName.split("_");
      if (columnName.indexOf("kpi") > -1 && row.dayKpi > 0)
        row[this.weight_prefix + id] = Number(row[columnName] / row.dayKpi).toFixed(2);
      else if (columnName.indexOf("weight") > -1 && row.dayKpi > 0) {
        row[this.kpi_prefix + id] = Number(row[columnName] * row.dayKpi).toFixed(2);
      }
      this.updateTableCell(row, id);
      this.totalCalc(row, id);
    },
    /**
     * 名称：计算日指标合计
     */
    totalDateKpi(col) {
      let total = this.data.reduce((total, item) => {
        return (total += isNaN(item.dayKpi) ? 0 : Number(item.dayKpi));
      }, 0);
      this.$set(this.tableTotal[0], col, total.toFixed(2));
    },
    /**
     * 合计：根据行和id决定，同时更新KPI 和 weight
     */
    totalCalc(row, id) {
      let col1 = this.weight_prefix + id;
      let col2 = this.kpi_prefix + id;
      let [t1, t2] = this.data.reduce(
        ([t1, t2], item) => {
          let one = t1 + (isNaN(item[col1]) ? 0 : Number(item[col1]));
          let two = t2 + (isNaN(item[col2]) ? 0 : Number(item[col2]));
          return [one, two];
        },
        [0, 0]
      );
      this.$set(this.tableTotal[0], col1, t1.toFixed(2));
      this.$set(this.tableTotal[0], col2, t2.toFixed(2));
    },
    /** 更改表格数据到行 */
    updateTableCell(row, id) {
      let obj = {
        dateTime: row.dateTime,
        weight: row[this.weight_prefix + id],
        kpi: row[this.kpi_prefix + id],
        id: row["id_" + id]
      };
      let o = false;
      let index = 0;
      this.saveData.forEach((item, i) => {
        if (item.dateTime === obj.dateTime && item.id === obj.id) {
          o = true;
          index = i;
        }
      });
      if (o) {
        this.saveData.splice(index, 1, obj);
      } else {
        this.saveData.push(obj);
      }
      this.$emit("amendData", this.saveData);
    },
    saveCurrent() {
      // 没有编辑时不调保存接口
      if (!this.saveData.length) return
      let self = this;
      let obj = {
        fixcolumn: {
          DL_B_RETAIL_BUSINESS_TARGET: {},
          DL_B_RETAIL_BUSINESS_TARGET_DETAIL: [],
          DL_B_RETAIL_BUSINESS_TARGET_SALER: [...this.saveData]
        },
        objid: this.$route.params.itemId
      };

      let formdata = new FormData();
      formdata.append("param", JSON.stringify(obj));

      return this.service.orderCenter.retailBusinessTargetSave(formdata).then(function (res) {
        if (res.data.code === 0) {
          self.saveAfterAction();
        } else {
          self.$message({
            message: res.data.message,
            type: "error"
          });
          self.saveAfterFailAction();
        }
      });
    },
    saveAfterAction() {
      this.saveData = [];
      this.$emit("changeSave", false);
      this.$emit("amendData", this.saveData);
    },
    saveAfterFailAction() {  //失败动作
      this.$emit("changeSave", false);   //修改保存状态
      this.$emit("saveError");
    },
    getTableData(result) {
      // result = {
      //   rowData: [
      //     {
      //       dateTime: "2019/12/1",
      //       dayKpi: "2500",
      //       saler_1: "张三",
      //       weight_1: 0.8,
      //       kpi_1: 2000,
      //       saler_2: "李四",
      //       weight_2: 0.6,
      //       kpi_2: 1900,
      //       weekName: "星期日"
      //     },
      //     {
      //       dateTime: "2019/12/2",
      //       dayKpi: "2000",
      //       saler_1: "张三",
      //       weight_1: 0.8,
      //       kpi_1: 1600,
      //       saler_2: "李四",
      //       weight_2: 0.5,
      //       kpi_2: 1000,
      //       weekName: "星期一"
      //     }
      //   ],
      //   rowTitleData: [
      //     {
      //       flag: true,
      //       key: "dateTime",
      //       align: "center",
      //       title: "日期"
      //     },
      //     {
      //       flag: true,
      //       key: "weekName",
      //       align: "center",
      //       title: "星期"
      //     },
      //     {
      //       flag: true,
      //       key: "dayKpi",
      //       align: "center",
      //       title: "日指标"
      //     },
      //     {
      //       flag: true,
      //       id: 1,
      //       key: "saler_1",
      //       align: "center",
      //       children: [
      //         {
      //           flag: true,
      //           key: "weight_1",
      //           title: "权重"
      //           //   render : (h,params) =>{
      //           //       return h('input',{},params.row["saler_1"])
      //           //     }
      //         },
      //         {
      //           flag: true,
      //           key: "kpi_1",
      //           title: "指标"
      //         }
      //       ],
      //       title: "张三"
      //     },
      //     {
      //       flag: true,
      //       id: 2,
      //       key: "saler_2",
      //       align: "center",
      //       children: [
      //         {
      //           flag: true,
      //           key: "weight_2",
      //           title: "权重"
      //         },
      //         {
      //           flag: true,
      //           key: "kpi_2",
      //           title: "指标"
      //         }
      //       ],
      //       title: "李四"
      //     }
      //   ]
      // };

      this.columns = result.rowTitleData || [];
      this.data = result.rowData || [];
    },
    init() {
      this.saveData = [];
      this.spinShow = true;
      this.search().then(res => {
        if (res.data.code === 0) {
          this.getTableData(res.data.data);
          //初始化表格
          this.initTableElement();
        } else {
          this.$message(res.data.data.message, "error");
        }
        this.spinShow = false;
      });
      this.$emit("changeRefresh", false);
    }
  },
  created() {
    window.addEventListener('customizeClick', this.saveCurrent);
  },
  activated() {
    const { tableId, itemId } = this.$route.params
    if (this.$store.state[`V.DL_B_RETAIL_BUSINESS_TARGET.${tableId}.${itemId}`].mainFormInfo.formData.data.addcolums[0].childs[8].valuedata === '1') {
      this.spinShow = true;
      let time = setInterval(() => {
        if (this.$root.retailSave) {
          this.init();
          this.$root.retailSave = false;
          clearInterval(time);
        }
      }, 500);
    } else this.init();
  },
  beforeDestroy() {
    window.removeEventListener('customizeClick', this.saveCurrent);
  },
};
</script>

<style lang="less">
.targetDetailToSalers {
  padding: 10px;
  font-size: 13px;
  table {
    thead > tr > td {
      font-size: 14px;
    }

    tbody > tr > td {
      input {
        text-indent: 5px;
        width: 100px;
        height: 25px;
        text-align: center;
        background: transparent;
        border: 0;
        border-bottom: 1px solid #747474;
      }
      min-width: 100px;
    }

    tfoot > tr > td {
      //background: rgb(222, 230, 239);
      text-align: center;
    }

    .headClass {
      font-size: 13px;
      font-weight: 500;
    }
    .gray {
      //background: rgb(191, 191, 191);
    }
    .pink {
      //background: rgb(240, 203, 145);
    }
    .blue {
      //background: rgb(222, 230, 239);
    }
    .yellow {
      //background: rgb(221, 217, 197);
    }
  }
}
</style>

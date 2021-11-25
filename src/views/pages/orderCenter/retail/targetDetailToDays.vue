<template>
  <div class="targetDetailToDays">
    <Table
      :columns="columns"
      :data="data"
      border
      :highlight-row="highlightRow"
      :height="height"
      :colRowMethod="colRowMethod"
      :totalData="tableTotal"
    ></Table>
  </div>
</template>
<script>
export default {
  props: {
    objList: Array,
    idArr: Array,
    objid: "", //表ID
    selectItem: {}, //表信息
    refresh: false, //刷新
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
      height: 350,
      highlightRow: false,
      data: [],
      columns: [],
      tableTotal: [
        {
          dateTime: "合计",
          dayKpi: "0",
          dayWeight: "0",
          week: "0",
          weekKpi: "0",
          weekName: "",
          weekWeight: "0"
        }
      ],
      rowAndColSpan: [],
      totalKpi: 10000,
      flag: true, //标记当前文件是制定周营业员计划还是调整   false - 新增  true - 调整
      saveData: [] //需要保存的数据
    };
  },
  watch: {
    save(val) {
      if (val) {
        let self = this;
        // let res = self.saveBeforeAction();
        // if (res.code === -1) {
        //   self.$message({ message: res.message, type: "error" });
        //   self.saveAfterFailAction();
        //   return;
        // }
        if(this.data.length === 0){
          return
        }else{
          self.saveCurrent().catch(self.saveAfterAction)
        }
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
    init() {
      this.saveData = [];
      //查询接口
      this.search().then(res => {
        if (res.data.code === 0) {
          this.getTableData(res.data.data);
          //初始化表格
          this.initTableElement();
          //构建表格计算跨行跨列
          this.createTableWithSpan();
        } else {
          this.$message({ message: res.data.data.message, type: "error" });
        }
      });
    },
    /**
     * 获取表格数据
     */
    getTableData(data) {
      // this.columns = [
      //   {
      //     key: "storeName",
      //     title: "门店",
      //     // className: "gray",
      //     // renderHeader: (h, params) => {
      //     //   return h("div", { className: "headClass" }, "门店");
      //     // }
      //   },
      //   {
      //     title: "日期",
      //     key: "dateTime",
      //     // className: "gray",
      //     // renderHeader: (h, params) => {
      //     //   return h("div", { class: "headClass" }, "日期");
      //     // }
      //   },
      //   {
      //     key: "weekName",
      //     title: "星期",
      //     // className: "gray",
      //     // renderHeader: (h, params) => {
      //     //   return h("div", { class: "headClass" }, "星期");
      //     // }
      //   },
      //   {
      //     key: "weekWeight",
      //     title: "周权重",
      //     //className: "pink",
      //     // renderHeader: (h, params) => {
      //     //   return h("div", { class: "headClass" }, "周权重");
      //     // },
      //     // render: (h, params) => {
      //     //   return h("input", {
      //     //     domProps: {
      //     //       value: params.row.weekWeight
      //     //     },
      //     //     on: {
      //     //       blur: event => {
      //     //         let value = this.getEvent(event);
      //     //         this.totalCalc(
      //     //           "weekWeight",
      //     //           params.row,
      //     //           params.column,
      //     //           value
      //     //         );
      //     //       }
      //     //     },
      //     //     class: ""
      //     //   });
      //     // }
      //   },
      //   {
      //     key: "weekKpi",
      //     title: "周指标",
      //     //className: "pink",
      //     // renderHeader: (h, params) => {
      //     //   return h("div", { class: "headClass" }, "周指标");
      //     // },
      //     // render: (h, params) => {
      //     //   return h("input", {
      //     //     domProps: {
      //     //       value: params.row.weekKpi
      //     //     },
      //     //     on: {
      //     //       blur: event => {
      //     //         let value = this.getEvent(event);
      //     //         this.totalCalc("weekKpi", params.row, params.column, value);
      //     //       }
      //     //     },
      //     //     class: ""
      //     //   });
      //     // }
      //   },
      //   {
      //     key: "weekWeightAdjust",
      //     title: "周权重调整",
      //     //className: "blue",
      //     // renderHeader: (h, params) => {
      //     //   return h("div", { class: "headClass" }, "周权重调整");
      //     // },
      //     // render: (h, params) => {
      //     //   return h("input", {
      //     //     domProps: {
      //     //       value: params.row.weekWeightAdjust
      //     //     },
      //     //     on: {
      //     //       blur: event => {
      //     //         let value = this.getEvent(event);
      //     //         this.totalCalc(
      //     //           "weekWeightAdjust",
      //     //           params.row,
      //     //           params.column,
      //     //           value
      //     //         );
      //     //       }
      //     //     },
      //     //     class: ""
      //     //   });
      //     //}
      //   },
      //   {
      //     key: "weekKpiAdjust",
      //     title: "周指标调整",
      //     //className: "blue",
      //     // renderHeader: (h, params) => {
      //     //   return h("div", { class: "headClass" }, "周指标调整");
      //     // },
      //     // render: (h, params) => {
      //     //   return h("input", {
      //     //     domProps: {
      //     //       value: params.row.weekKpiAdjust
      //     //     },
      //     //     on: {
      //     //       blur: event => {
      //     //         let value = this.getEvent(event);
      //     //         this.totalCalc(
      //     //           "weekKpiAdjust",
      //     //           params.row,
      //     //           params.column,
      //     //           value
      //     //         );
      //     //       }
      //     //     },
      //     //     class: ""
      //     //   });
      //     // }
      //   },
      //   {
      //     title: "日权重",
      //     key: "dayWeight",
      //     //className: "gray",
      //     // renderHeader: (h, params) => {
      //     //   return h("div", { class: "headClass" }, "日权重");
      //     // }
      //   },
      //   {
      //     title: "日指标",
      //     key: "dayKpi",
      //     //className: "pink",
      //     // renderHeader: (h, params) => {
      //     //   return h("div", { class: "headClass" }, "日指标");
      //     // },
      //     // render: (h, params) => {
      //     //   return h("input", {
      //     //     domProps: {
      //     //       value: params.row.dayKpi
      //     //     },
      //     //     on: {
      //     //       blur: event => {
      //     //         let value = this.getEvent(event);
      //     //         this.caluDayWeight(
      //     //           "dayKpi",
      //     //           params.row,
      //     //           params.column,
      //     //           value
      //     //         );
      //     //         this.totalCalc("dayKpi", params.row, params.column, value);
      //     //       }
      //     //     },
      //     //     class: ""
      //     //   });
      //     // }
      //   }
      // ];
      // this.data = [
      //   {
      //     dateTime: "2019/12/1",
      //     dayKpi: "1.2",
      //     dayWeight: "3.1",
      //     id: "1",
      //     storeName: "测试店",
      //     week: "1",
      //     weekKpi: "1",
      //     weekName: "星期日",
      //     weekWeight: "18"
      //   },
      //   {
      //     dateTime: "2019/12/2",
      //     dayKpi: "1.2",
      //     dayWeight: "3.1",
      //     id: "1",
      //     storeName: "测试店",
      //     week: "2",
      //     weekKpi: "1",
      //     weekName: "星期一",
      //     weekWeight: "18"
      //   },
      //   {
      //     dateTime: "2019/12/3",
      //     dayKpi: "1.2",
      //     dayWeight: "3.1",
      //     id: "1",
      //     storeName: "测试店",
      //     week: "2",
      //     weekKpi: "1",
      //     weekName: "星期二",
      //     weekWeight: "18"
      //   },
      //   {
      //     dateTime: "2019/12/4",
      //     dayKpi: "1.2",
      //     dayWeight: "3.1",
      //     id: "1",
      //     storeName: "测试店",
      //     week: "2",
      //     weekKpi: "1",
      //     weekName: "星期三",
      //     weekWeight: "18"
      //   },
      //   {
      //     dateTime: "2019/12/5",
      //     dayKpi: "1.2",
      //     dayWeight: "3.1",
      //     id: "1",
      //     storeName: "测试店",
      //     week: "2",
      //     weekKpi: "1",
      //     weekName: "星期四",
      //     weekWeight: "18"
      //   },
      //   {
      //     dateTime: "2019/12/6",
      //     dayKpi: "1.2",
      //     dayWeight: "3.1",
      //     id: "1",
      //     storeName: "测试店",
      //     week: "2",
      //     weekKpi: "1",
      //     weekName: "星期五",
      //     weekWeight: "18"
      //   },
      //   {
      //     dateTime: "2019/12/7",
      //     dayKpi: "1.2",
      //     dayWeight: "3.1",
      //     id: "1",
      //     storeName: "测试店",
      //     week: "2",
      //     weekKpi: "1",
      //     weekName: "星期六",
      //     weekWeight: "18"
      //   },
      //   {
      //     dateTime: "2019/12/8",
      //     dayKpi: "1.2",
      //     dayWeight: "3.1",
      //     id: "1",
      //     storeName: "测试店",
      //     week: "2",
      //     weekKpi: "1",
      //     weekName: "星期日",
      //     weekWeight: "18"
      //   },
      //   {
      //     dateTime: "2019/12/9",
      //     dayKpi: "1.2",
      //     dayWeight: "3.1",
      //     id: "1",
      //     storeName: "测试店",
      //     week: "3",
      //     weekKpi: "1",
      //     weekName: "星期一",
      //     weekWeight: "18"
      //   }
      // ]

      this.columns = data.rowTitleData || [];
      this.data = data.rowData || [];
      try {
        this.totalKpi = data.retailBusinessTarget.planAmt || 0;
        this.flag = data.retailBusinessTarget.isFirstWeekKpi === 'N' ? false : true;  //isFirstWeekKpi 为N时隐藏周指标调整
      } catch (e) { }

    },
    /**
     * 丰富表头配置
     */
    initTableElement() {
      let self = this;
      // 初始化表头
      let cols = [...this.columns];
      this.columns = cols.filter((row) => {
        if (!this.flag && ["weekWeightAdjust", "weekKpiAdjust"].includes(row.key))
          return false;
        else
          return true;
      }).map(row => {
        row.align = "center";
        let editRow1 = ["weekWeight", "weekKpi", "dayKpi"];
        let editRow2 = ["weekWeightAdjust", "weekKpiAdjust", "dayKpi"];
        row.className = editRow1.includes(row.key)
          ? "pink"
          : editRow2.includes(row.key)
            ? "blue"
            : "gray";
        row.renderHeader = (h, params) => {
          return h("div", { class: "headClass" }, row.title);
        };
        delete row.children;
        if (
          ((editRow1.includes(row.key) && !this.flag) || (editRow2.includes(row.key) && this.flag)) &&
          !self.isdisabled
        ) {
          row.render = (h, params) => {
            return h("input", {
              domProps: {
                value: params.row[row.key] == 0 ? '' : params.row[row.key]
              },
              on: {
                blur: event => {
                  let value = this.getEvent(event);
                  event.target.value = value;
                  this.tableCellAlter(
                    row.key,
                    params.row,
                    params.column,
                    value
                  );
                },
                change: event => {
                  this.formatInput(event, row, params.row);
                }
              }
            });
          };
        }
        return row;
      });
      //初始化表格合计
      let rows = [
        "weekWeight",
        "weekKpi",
        "weekWeightAdjust",
        "weekKpiAdjust",
        "dayWeight",
        "dayKpi"
      ];
      rows.forEach(columnName => {
        this.totalCalc(columnName);
      });
    },
    colRowMethod(column, row, rowIndex, columnIndex) {
      let cols = ["weekWeight", "weekKpi", "weekWeightAdjust", "weekKpiAdjust"];
      if (cols.includes(column.key)) {
        return {
          rowspan: this.rowAndColSpan,
          colspan: 1
        };
      } else {
        return {
          rowspan: 1,
          colspan: 1
        };
      }
    },
    createTableWithSpan() {
      this.rowAndColSpan = [];
      this.top = 0;
      this.data.forEach(row => {
        let n = this.handleSpan(row);
        if (n === -1) return;
        if (n === 0) {
          this.rowAndColSpan.push(1);
        } else if (n > 0) {
          let arr = new Array(n).fill(0);
          arr.unshift(1);
          this.rowAndColSpan.push(...arr);
        }
      });
    },
    /**
     * 返回-1 则不显示，其他就代表小跨N列
     * @param row 行数据
     */
    handleSpan(row) {
      let array = [...this.data];
      let startTime = new Date(array[0].dateTime).Format("yyyyMMdd");
      let endTime = new Date(array.pop().dateTime).Format("yyyyMMdd");
      let rowTime = new Date(row.dateTime).Format("yyyyMMdd");
      if (startTime === rowTime || row.weekName === "星期一") {
        //当月第一天
        let rowWeeklyEndTme = this.getWeeklyEndTime(row.dateTime).Format(
          "yyyyMMdd"
        );
        rowWeeklyEndTme = rowWeeklyEndTme > endTime ? endTime : rowWeeklyEndTme;
        return rowWeeklyEndTme - rowTime;
      } else {
        return -1;
      }
    },
    /**
     *  获取当前日期所在周的任意时间
     *  @param currentTime 当前日期
     *  @param n  星期几
     */
    getWeeklyEndTime(currentTime, n) {
      n = n ? n : 7;
      var checkDate = new Date(currentTime);
      checkDate.setDate(checkDate.getDate() + n - (checkDate.getDay() || 7));
      return checkDate;
    },
    tableCellAlter(columnName, row, column, value) {
      this.sameWeekCellUpdate(columnName, row, column, value);
      this.totalCalc(columnName, row, column, value);
    },
    /**
     * 相同周更改
     */
    sameWeekCellUpdate(columnName, row, column, value) {
      //同一个周，修改数量一起更新
      if (columnName.indexOf("week") > -1) {
        this.data.forEach((item,i) => {
          if (row.week === item.week) {
            this.$set(item, columnName, value);
            this.targetByWeightOrKpi(item, columnName,i); //更新对应的指标
            this.updateTableCell(item); //修改数据更新到修改的内存变量 savedata
          }
        });
        this.updateTotalbyAddOrEdit();

      } else {
        // this.data.forEach(item => {
        //   if (row.dateTime === item.dateTime){
        //     this.$set(item, columnName, value);
        //   };
        // });
        this.caluDayWeight(columnName, row, column, value);
      }
    },
     /**
     *一周多少天
     */
    gehowmoreDay(data,row){
      var cout = 0;
      data.forEach((item)=>{
        if(row.week==item.week){
          cout++
        }
      })
      return cout
    },
    /**
     *当前选中日期之前的天数
     */
    beforeDay(data,row){
      var cout = 0;
      data.forEach((item)=>{
        if(row.week>=item.week){
          cout++
        }
      })
      return cout
    },
    /**
     * 修改周权重或者周指标 或者周全中
     */
    targetByWeightOrKpi(row, columnName,i) {
      let self = this;
      let week = this.gehowmoreDay(this.data,row);
      let beforeWeek = this.beforeDay(this.data,row)
      console.log('beforeWeek,beforeWeek',beforeWeek)
      let totalKpi = this.totalKpi || 0;
      if (Number(totalKpi) > 0) {
        switch (columnName) {
          case "weekKpi":
            row.weekWeight = Number(row[columnName] / this.totalKpi).toFixed(2);
            break;
          case "weekKpiAdjust":
            row.weekWeightAdjust = Number(row[columnName] / this.totalKpi).toFixed(2);
            break;
          case "weekWeight":
            row.weekKpi = Number(row[columnName] * this.totalKpi).toFixed(2);
            break;
          case "weekWeightAdjust":
            row.weekKpiAdjust = Number(row[columnName] * this.totalKpi).toFixed(2);
            break;
        }
        let kpi = (!this.flag) ? row.weekKpi : row.weekKpiAdjust;
        row.dayKpi= (Math.floor((Number(kpi)/week))*100/100).toFixed(2);
        if(i==week){
           row.dayKpi=(kpi - row.dayKpi*(week-1)).toFixed(2);
        }
        let caltotaldayKpi = 0;
        if(this.flag){
          this.data.forEach((item,index)=>{
              caltotaldayKpi += Number(item.dayKpi)
          })
        }
        console.log('caltotaldayKpi',caltotaldayKpi)
        this.$nextTick(()=>{
          if((i+1) == beforeWeek){
            let totaldayKpi = !this.flag?Number(this.tableTotal[0].dayKpi):caltotaldayKpi;
            let totalweekKpi = (!this.flag) ?Number(this.tableTotal[0].weekKpi):Number(this.tableTotal[0].weekKpiAdjust)
          if( totaldayKpi < totalweekKpi){
             let rem = totalweekKpi - totaldayKpi
             row.dayKpi = (Number(row.dayKpi) + rem).toFixed(2);
             this.tableTotal[0].dayKpi = totalweekKpi.toFixed(2)
           }else{
             this.tableTotal[0].dayKpi = totalweekKpi.toFixed(2)
           }
          }
        })
        
        console.log('tableTotal',this.tableTotal)
        if(this.flag){
          row.isAdjust = 1;//修改过的数据值为1
        }
        kpi = isNaN(kpi) ? 0 : Number(kpi);
        if (kpi > 0)
          row.dayWeight = Number(row.dayKpi / kpi).toFixed(2);
        else
          row.dayWeight = 0;
      }
    },
    /**
     *   修改周权重和指标同时更新月权重的合计
     */
    updateTotalbyAddOrEdit() {
      if (!this.flag) {
        this.totalCalc('weekKpi');
        this.totalCalc('weekWeight');
        this.totalCalc('dayKpi');
      } else {
        this.totalCalc('weekKpiAdjust');
        this.totalCalc('weekWeightAdjust');
      }
      this.totalCalc('dayWeight');
    },
    /***
     *
     * @param name  修改合计列
     * @param row 行数据
     * @param column  列
     * @param  value  值
     */
    totalCalc(columnName, row, column, value) {
      //不同周叠加合计项叠加
      let total = 0;
      if (columnName.indexOf("week") > -1) {
        let weeks = [];
        total = this.data.reduce((total, item) => {
          let week = item.week || "1";
          if (weeks.includes(week)) return total;
          else {
            weeks.push(week);
            return (total += Number(item[columnName]));
          }
        }, 0);
      } else {
        total = this.data.reduce((total, item) => {
          return (total += Number(item[columnName]));
        }, 0);
      }
      this.$set(this.tableTotal[0], columnName, total.toFixed(2));
    },
    caluDayWeight(columnName, row, column, value) {
      let obj = this.data.find(item => {
        return item.dateTime === row.dateTime;
      });
      let kpi = !this.flag ? row.weekKpi : row.weekKpiAdjust;
      if (!kpi || isNaN(kpi) || kpi == 0) return this.$message({ message: '请先填写正确的周指标或者周指标调整', type: 'warning' });
      if (obj) {
        this.$set(obj, columnName, value);
        obj.dayWeight = Number(obj.dayKpi / kpi).toFixed(2);
      }
      this.$set(obj, "dayWeight", obj.dayWeight);
      this.updateTableCell(obj);
      this.totalCalc("dayWeight", obj, null, obj.dayWeight);
    },
    /** 更改表格数据到行 */
    updateTableCell(obj) {
      let index = 0;
      let o = false;
      this.saveData.forEach((item, i) => {
        if (item.dateTime === obj.dateTime) {
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
    getEvent(event) {
      let value = isNaN(event.target.value) ? 0 : Number(event.target.value).toFixed(2);
      return value;
    },
    formatInput(event, column, row) {
      let org_val = row[column.key] || 0;
      let value = isNaN(event.target.value) ? 0 : Number(event.target.value).toFixed(2);
      if ((column.key.indexOf("weight") > -1 || column.key.indexOf("Weight") > -1) && (value > 1 || value < 0)) {
        event.target.value = org_val;
      }
    },
    search() {
      //查询接口
      let formdata = new FormData();
      let obj = { retailBusinessTargetId: this.$route.params.itemId };
      formdata.append("param", JSON.stringify(obj));
      return this.service.orderCenter.retailBusinessTargetDetailQuery(formdata);
    },
    saveCurrent(event) {
      if (event) {
        if (event.detail.type !== 'save' || (event.detail.type === 'save' && event.detail.hasOwnProperty('res'))) return;
      }
      let self = this;
      let obj = {
        fixcolumn: {
          DL_B_RETAIL_BUSINESS_TARGET: {},
          DL_B_RETAIL_BUSINESS_TARGET_DETAIL: [...this.data],//this.saveData
          DL_B_RETAIL_BUSINESS_TARGET_SALER: []
        },
        objid: this.$route.params.itemId
      };
      let formdata = new FormData();
      formdata.append("param", JSON.stringify(obj));
      return this.service.orderCenter.retailBusinessTargetSave(formdata).then(function (res) {
        self.$root.retailSave = true;
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
    saveAfterAction() {  //成功动作
      this.saveData = [];
      this.$emit("changeSave", false);   //修改保存状态
      this.$emit("amendData", this.saveData);  //重置修改数据
    },
    saveAfterFailAction() {  //失败动作
      this.$emit("changeSave", false);   //修改保存状态
      this.$emit("saveError");
    },
    saveBeforeAction() {
      let res = { code: 0, message: 'OK' }
      if (this.totalKpi != this.tableTotal[0].weekKpi && !this.flag) {
        res = { code: -1, message: '周指标之和不等于计划销售指标' };
        return res;
      }
      if (this.totalKpi != this.tableTotal[0].weekKpiAdjust && this.flag) {
        res = { code: -1, message: '周指标调整之和不等于计划销售指标' };
        return res;
      }
      if (this.totalKpi != this.tableTotal[0].dayKpi) {
        res = { code: -1, message: '日指标之和不等于计划销售指标' };
        return res;
      }
      return res;
    }
  },
  created() {
    this.init();
    this.$emit("changeRefresh", false);
    window.addEventListener('customizeClick', this.saveCurrent);
  },
  beforeDestroy() {
    window.removeEventListener('customizeClick', this.saveCurrent);
  },
};
</script>
<style lang="less">
.targetDetailToDays {
  padding: 10px;
  font-size: 13px;
  table {
    thead > tr > td {
      border: 1px solid #ccc !important;

      font-size: 14px;
    }

    tr.burgeon-table-row-hover td {
      background-color: #fff !important;
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
      //width: 200px;
      //background: rgb(240, 203, 145);
    }
    .blue {
      //width: 200px;
      //background: rgb(222, 230, 239);
    }
  }
}
</style>

<template>
  <div>
    <!-- <Table :columns="columnsArray" :data="dataArray" /> -->
    <div class="actionPermissionsTable">
      <div :style="scrollThead">
        <table>
          <thead>
            <tr>
              <th>序号</th>
              <template v-for="(column, index) in columns">
                <th :key="index" v-if="column.key === 'IS_READ'">
                  <Checkbox
                    v-model="tableArr.isReadValue"
                    :disabled="tableArr.isChild && !tableArr.isParentReadValue"
                    @on-change="theadCheckboxChange($event, column)"
                  >{{column.title}}</Checkbox>
                </th>
                <th :key="index" v-else-if="column.key === 'IS_WRITE'">
                  <Checkbox
                    v-model="tableArr.isWriteValue"
                    :disabled="tableArr.isChild && !tableArr.isParentWriteValue"
                    @on-change="theadCheckboxChange($event, column)"
                  >{{column.title}}</Checkbox>
                </th>
                <th :key="index" v-else>{{column.title}}</th>
              </template>
            </tr>
          </thead>
        </table>
      </div>
      <div class="scrollTable" :style="scrollTableHeight" ref="scrollTable">
        <table>
          <tbody>
            <tr v-for="(row, rowIndex) in rows" :key="rowIndex">
              <td>{{rowIndex + 1}}</td>
              <template v-for="(column, index) in columns">
                <td :key="index" v-if="column.key === 'IS_READ' || column.key === 'IS_WRITE'">
                  <Checkbox
                    v-model="row[column.key]"
                    :disabled="row.PARENT_GROUPS_ID && (column.key === 'IS_READ' && (row.PARENT_IS_READ === 'N' || row.PARENT_ISREAD === 'N')) || (column.key === 'IS_WRITE' && (row.PARENT_IS_WRITE === 'N' || row.PARENT_ISMODIFY === 'N'))"
                    @on-change="rowCheckboxChange($event, rowIndex, column)"
                  ></Checkbox>
                </td>
                <td
                  :key="index"
                  v-else-if="column.key === 'ISACTIVE'"
                >{{row[column.key] === "Y" ? "是" : "否"}}</td>
                <td :key="index" v-else>{{row[column.key]}}</td>
              </template>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    rows: {
      type: Array,
      default: []
    },
    columns: {
      type: Array,
      default: []
    },
    tableArr: {
      type: Object,
      default: () => ({})
    },
  },
  data() {
    return {
      scrollThead: {
        marginRight: "10px"
      },
      scrollTableHeight: {
        height: ""
      },
    }
  },
  mounted() {
    this.setTableHeight();
  },
  methods: {
    refreshTable() {
      this.$refs.scrollTable.scrollTop = 0
    },
    setTableHeight() {
      let self = this;
      const contentHeight = document.getElementsByClassName("SearchForm_Table")[0].clientHeight;
      let scrollTableHeight = contentHeight - 200;
      this.scrollTableHeight.height = `${scrollTableHeight}px`;
    },
    theadCheckboxChange(val, column) {
      this.$emit('isChangeFun', true);
      if (column.key === "IS_WRITE") {
        this.tableArr.isWriteValue = val;
        if (val) {
          this.tableArr.isReadValue = val;
          this.tableArr.isWriteValueTotal = this.rows.length;
          this.tableArr.isReadValueTotal = this.rows.length;
        } else {
          this.tableArr.isWriteValueTotal = 0;
        }
      } else if (column.key === "IS_READ") {
        this.tableArr.isReadValue = val;
        if (!val) {
          this.tableArr.isWriteValue = val;
          this.tableArr.isWriteValueTotal = 0;
          this.tableArr.isReadValueTotal = 0;
        } else {
          this.tableArr.isReadValueTotal = this.rows.length;
        }
      }

      setTimeout(() => {
        if (column.key === "IS_WRITE") {
          this.rows.forEach((item) => {
            item["IS_WRITE"] = val;
            if (val && item["IS_READ"] !== val) {
              item["IS_READ"] = val;
            }
          });
        } else if (column.key === "IS_READ") {
          this.rows.forEach((item) => {
            item["IS_READ"] = val;
            if (!val && item["IS_WRITE"] !== val) {
              item["IS_WRITE"] = val;
            }
          });
        }
        this.$forceUpdate();
      }, 0);
    },
    rowCheckboxChange(val, rowIndex, column) {
      this.$emit('isChangeFun', true);
      if (column.key === "IS_WRITE") {
        this.rows[rowIndex]["IS_WRITE"] = val;
        if (val) {
          if (this.rows[rowIndex]["IS_READ"] !== val) {
            this.rows[rowIndex]["IS_READ"] = val;
            this.tableArr.isReadValueTotal++;
          }
          this.tableArr.isWriteValueTotal++;
        } else {
          this.tableArr.isWriteValueTotal--;
        }
      }
      if (column.key === "IS_READ") {
        this.rows[rowIndex]["IS_READ"] = val;
        if (!val) {
          if (this.rows[rowIndex]["IS_WRITE"] !== val) {
            this.rows[rowIndex]["IS_WRITE"] = val;
            this.tableArr.isWriteValueTotal--;
          }
          this.tableArr.isReadValueTotal--;
        } else {
          this.tableArr.isReadValueTotal++;
        }
      }
      this.tableArr.isReadValue = this.tableArr.isReadValueTotal === this.rows.length ? true : false;
      this.tableArr.isWriteValue = this.tableArr.isWriteValueTotal === this.rows.length ? true : false;
    },
  }
};
</script>

<style lang="less">
.actionPermissionsTable {
  table {
    border-spacing: 0px 0px;
  }
  .scrollTable {
    overflow: auto;
    table {
      border-collapse: collapse;
      border-spacing: 0px 0px;
      tbody {
        tr {
          border-bottom: 1px solid #d8d8d8;
        }
      }
    }
  }
  table {
    color: #575757;
    text-align: left;
    width: 100%;
    text-indent: 5px;
    table-layout: fixed;
    thead {
      tr {
        th {
          text-align: left;
          background-color: #eeeff0;
          height: 26px;
          line-height: 26px;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
      }
    }
    tbody {
      tr {
        border-bottom: 1px solid #d8d8d8;
        height: 23px;
        line-height: 23px;
        td {
          height: 23px;
          line-height: 23px;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
      }
    }
    .textEllipsis {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    ._italics {
      font-style: oblique;
      color: #d3d3d3;
    }
    .paddingleft18 {
      padding-left: 18px;
    }
    .paddingleft10 {
      padding-left: 10px;
    }
  }
}
</style>
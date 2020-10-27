<template>
  <div>
    <!-- <Table :columns="columnsArray" :data="dataArray" /> -->
    <div class="actionPermissionsTable">
      <div :style="scrollThead">
        <table>
          <thead>
            <tr>
              <!-- <th>序号</th> -->
              <th>{{ vmI18n.t("table_label.serialNo") }}</th>
              <template v-for="(column, index) in columns">
                <th :key="index" v-if="column.key === 'IS_READ'">
                  <Checkbox
                    v-model="tableArr.isReadValue"
                    :disabled="tableArr.isChild && !tableArr.isParentReadValue"
                    @on-change="theadCheckboxChange($event, column)"
                    >{{ column.title }}</Checkbox
                  >
                </th>
                <th :key="index" v-else-if="column.key === 'IS_WRITE'">
                  <Checkbox
                    v-model="tableArr.isWriteValue"
                    :disabled="tableArr.isChild && !tableArr.isParentWriteValue"
                    @on-change="theadCheckboxChange($event, column)"
                    >{{ column.title }}</Checkbox
                  >
                </th>
                <th :key="index" v-else>{{ column.title }}</th>
              </template>
            </tr>
          </thead>
        </table>
      </div>
      <div class="scrollTable" :style="scrollTableHeight" ref="scrollTable">
        <table>
          <tbody>
            <tr v-for="(row, rowIndex) in rows" :key="rowIndex">
              <td>{{ rowIndex + 1 }}</td>
              <template v-for="(column, index) in columns">
                <td
                  :key="index"
                  v-if="column.key === 'IS_READ' || column.key === 'IS_WRITE'"
                >
                  <Checkbox
                    v-model="row[column.key]"
                    :disabled="
                      (row.PARENT_GROUPS_ID &&
                        column.key === 'IS_READ' &&
                        (row.PARENT_IS_READ === 'N' ||
                          row.PARENT_ISREAD === 'N')) ||
                      (column.key === 'IS_WRITE' &&
                        (row.PARENT_IS_WRITE === 'N' ||
                          row.PARENT_ISMODIFY === 'N'))
                    "
                    @on-change="rowCheckboxChange($event, rowIndex, column)"
                  ></Checkbox>
                </td>
                <td :key="index" v-else-if="column.key === 'ISACTIVE'">
                  {{ row[column.key] === "Y" ? "是" : "否" }}
                </td>
                <td :key="index" v-else>{{ row[column.key] }}</td>
              </template>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import quanXianTable from "@/js/pages/SystemConfig/quanXian/quanXianTable.js";
export default quanXianTable;
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
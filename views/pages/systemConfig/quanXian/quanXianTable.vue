<template>
  <div>
    <!-- <Table :columns="columnsArray" :data="dataArray" /> -->
    <div class="actionPermissionsTable">
      <!-- <div :style="scrollThead"> -->
      <div>
        <table>
          <thead>
            <tr>
              <!-- <th>序号</th> -->
              <th>{{ vmI18n.t("table_label.serialNo") }}</th>
              <template v-for="(column, index) in columns">
                <th
                  v-if="column.key === 'IS_READ'"
                  :key="index"
                >
                  <Checkbox
                    v-model="tableArr.isReadValue"
                    :disabled="tableArr.isChild && !tableArr.isParentReadValue"
                    @on-change="theadCheckboxChange($event, column)"
                  >
                    {{ column.title }}
                  </Checkbox>
                </th>
                <th
                  v-else-if="column.key === 'IS_WRITE'"
                  :key="index"
                >
                  <Checkbox
                    v-model="tableArr.isWriteValue"
                    :disabled="tableArr.isChild && !tableArr.isParentWriteValue"
                    @on-change="theadCheckboxChange($event, column)"
                  >
                    {{ column.title }}
                  </Checkbox>
                </th>
                <th
                  v-else
                  :key="index"
                >
                  {{ column.title }}
                </th>
              </template>
            </tr>
          </thead>
        </table>
      </div>
      <div
        ref="scrollTable"
        class="scrollTable"
        :style="scrollTableHeight"
      >
        <table>
          <tbody>
            <tr
              v-for="(row, rowIndex) in rows"
              :key="rowIndex"
            >
              <td>{{ rowIndex + 1 }}</td>
              <template v-for="(column, index) in columns">
                <td
                  v-if="column.key === 'IS_READ' || column.key === 'IS_WRITE'"
                  :key="index"
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
                  />
                </td>
                <td
                  v-else-if="column.key === 'ISACTIVE'"
                  :key="index"
                >
                  {{ row[column.key] === "Y" ? "是" : "否" }}
                </td>
                <td
                  v-else
                  :key="index"
                >
                  {{ row[column.key] }}
                </td>
              </template>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
  import quanXianTable from '@/js/pages/systemConfig/quanXian/quanXianTable';

  export default quanXianTable;
</script>

<style lang="less">
@import "~@/css/pages/systemConfig/quanXian/quanXianTable.less";
</style>

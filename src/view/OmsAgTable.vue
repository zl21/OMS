<!--
 * @Author: your name
 * @Date: 2021-06-21 10:17:42
 * @LastEditTime: 2021-11-02 17:53:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /burgeon-business-components/vueAgTable.vue
-->
<template>
  <div class="agTable">
    <arkCommonTableByAgGrid
      ref="agGrid"
      :rowHeight="agTableConfig.rowHeight"
      :height="agTableConfig.tableHeight"
      :options="options"
      :data="agTableConfig.rowData"
      :columns="agTableConfig.columnDefs"
      @grid-ready="gridReady"
      :renderParams="agTableConfig.renderParams"
      @on-row-dblclick="tableRowDbclick"
      @on-selection-change="tableSelectedChange"
      @on-column-moved="colMoved"
      @on-column-pinned="colPinned"
      @on-sort-change="colSortChange"
    ></arkCommonTableByAgGrid>

    <div
      class="page"
      v-show="agTableConfig.pageShow && (agTableConfig.rowData || []).length !== 0"
    >
      <span style="paddingright: 8px"
        >{{ vmI18n.t("common.total") }} {{ agTableConfig.pagenation.total }}
        {{ vmI18n.t("common.piece") }}</span
      >
      <Page
        class="page-pages"
        size="small"
        :total="agTableConfig.pagenation.total"
        :current="agTableConfig.pagenation.current"
        :page-size="agTableConfig.pagenation.pageSize"
        :page-size-opts="agTableConfig.pagenation.pageSizeOpts"
        show-elevator
        show-sizer
        :transfer="true"
        @on-change="pageChange"
        @on-page-size-change="onPageSizeChange"
      />
    </div>
  </div>
</template>

<script>
// import commonTableByAgGrid from 'libs/@syman/ark-ui-bcl/src/components/common-table-by-ag-grid/CommonTableByAgGrid'; // npm
// import i18n from "@burgeon/internationalization/i18n";

export default {
  name: 'OmsAgTable',
  components: {
    // commonTableByAgGrid
  },
  props: {
    renderParams: {
      type: Function
    },
    agTableConfig: {
      type: Object,
      default: {}
    },
    options: {
      type: Object,
      default: {
        datas: {}
      }
    }
  },
  data() {
    return {
      // vmI18n: i18n,
    }
  },
  methods: {
    gridReady() {
      // this.tabth = [];
      // this.row = [];
    },
    tableRowDbclick(data) {
      this.$emit('on-row-dblclick', data.data);
    },
    // 分页change 事件
    pageChange(val) {
      this.$emit('on-page-change', val)
    },
    // 切换分页条数
    onPageSizeChange(val) {
      this.$emit('on-page-size-change', val)
    },
    tableSelectedChange(data) {
      this.$emit('on-selection-change', data);
    },
    colPinned(data) {
      this.$emit('on-column-pinned', data);
    },
    colSortChange(data) {
      this.$emit('on-sort-change', data);
    },
    colMoved: _.debounce(async function () {
      const self = this;
      const { api, columnApi } = self.$refs.agGrid;
      const colData = columnApi.getAllGridColumns()
      this.$emit('on-column-moved', colData);
    }, 1000),
  }
}

// import OmsAgTable from 'burgeonComponents/js/OmsAgTable'
// export default OmsAgTable
</script>

<style lang="less" scoped>
@import "burgeonComponents/common/css/table.less";
.agTable {
  .page {
    padding: 10px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #606266;
  }
}
</style>
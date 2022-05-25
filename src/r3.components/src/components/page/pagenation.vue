<template>
  <div class="ff-table-pagenation">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 50, 100]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    <span class="ff-table-detail-delete" @click="detailDelete" v-if="isDeleteBtn">【{{$t('buttons.deleteDetails')}}】</span>
    <span class="ff-table-detail-delete" @click="packStandard" v-if="hasStandard">【{{$t('page.packStandard')}}】</span>
    <span class="ff-table-detail-delete" @click="detailImport" v-if="hasImport">【{{$t('buttons.export')}}】</span>
  </div>
</template>
<style lang="less" type="text/less">
  .ff-table-pagenation {
    padding: 6px 0 4px 5px;
    .ff-table-detail-delete {
      color: #20A0FF;
      display: inline-block;
      margin-left: 2px;
      cursor: pointer;
      vertical-align: middle;
    }
    .el-pagination {
      display: inline-block;
      vertical-align: middle;
    }
    .el-pagination .el-select .el-input {
      width: 80px;
      height: 24px;
    }
    .el-input__icon {
      width: 20px;
      height: 24px;
    }
    .el-pagination button, .el-pagination span {
      height: 24px;
      line-height: 24px;
      min-width: 24px;
    }
    .el-pagination .el-select .el-input input {
      height: 24px;
      padding: 0 20px 0 3px;
      font-size: 12px;
    }
    .el-pager li {
      min-width: 24px;
      height: 24px;
      line-height: 23px;
      &:hover {
        color: #d4dade;
      }
    }
    .el-pagination__editor {
      width: 24px;
    }
    .el-pagination .el-pagination__jump input {
      width: 24px;
      line-height: 18px;
    }
    .el-pager li.active {
      background-color: #d4dade;
      color: #fff;
      border-color: #d4dade;
    }
  }
</style>
<script>
  import i18n from '../../assets/js/i18n'

  export default {
    props: {
      currentPage: {},//当前页
      pageSize: {},//页面数量
      total: {},//总数
      isDeleteBtn: {},//是否显示删除明细
      hasImport: {},//是否显示导出
      hasStandard: Boolean//是否显示读入装箱标准
    },
    methods: {
      /*页码个数变化*/
      handleSizeChange(val) {
        this.$emit('size-change', val);
      },
      /*当前页变化*/
      handleCurrentChange(val) {
        this.$emit('current-change', val);
      },
      /*删除明细*/
      detailDelete() {
        this.$emit('detail-delete');
      },
      /*导出*/
      detailImport() {
        this.$emit('detailImport');
      },
      /*读入装箱标准*/
      packStandard () {
        this.$emit('packStandard');
      }
    },

    beforeCreate() {
      this.$t = i18n.t.bind(i18n)
    },
  }
</script>

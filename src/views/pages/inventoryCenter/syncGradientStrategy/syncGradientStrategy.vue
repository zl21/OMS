<template>
  <div class="auto-check syncGradientStrategy" v-loading="loading">
    <WaterMark v-if="ID!=='-1'&& !isActive" :text="'已作废'"/>
    <OmsButton :btn-config="btnConfig" class="top-btns"/>
    <Collapse v-model="collapse">
      <Panel name="panel_baseInfo">
        基本信息
        <div slot="content">
          <OmsForm class=""  :form-config="formConfig1"/>
        </div>
      </Panel>
      <Panel name="log" v-if="ID!=='-1'">
        日志
        <div slot="content">
          <OmsForm class="" :form-config="formConfig4"/>
        </div>
      </Panel>
    </Collapse>
    <div class="flex flex-direction-row">
      <div class="br-d3d3d3 mg-rt-5 flex-1 pd-tp-5 pd-rt-5">
        <OmsForm v-if="isActive" :form-config="formConfig2" class="bg-form pd-tp-0"/>
        <div class="pd-lf-5 pd-rt-5 pd-bt-5">
          <div class="flex flex-direction-row justify-content-space-between align-items-center mg-tp-10 mg-bt-6">
            <div v-if="isActive" class="flex flex-direction-row align-items-center">
              <a  @click="delFun2(multipleSelection1,tab1tableName,1)">【删除明细】</a>
              <a  @click="saveFun(2)">【保存】</a>
            </div>
          </div>
          <Table ref="table1" border highlight-row
                 height="270"
                 :row-class-name="rowClassName"
                 :columns="tableColumn1"
                 @on-current-change="onCurrentChange"
                 :data="tableData1" @on-selection-change="multipleSelection1 = $event"></Table>
        </div>

      </div>
      <div class="br-d3d3d3 mg-lf-5 flex-1 pd-tp-5  pd-rt-5">
        <OmsForm v-if="isActive"  :form-config="formConfig3" class="bg-form pd-tp-0"/>
        <div class="pd-lf-5 pd-rt-5 pd-bt-5">
          <div class="flex flex-direction-row justify-content-space-between align-items-center mg-tp-10 mg-bt-6">
            <div class="flex flex-direction-row align-items-center">
              <Page :total="pageObj1.total"
                    :current="pageObj1.current"
                    :page-size="pageObj1.pageSize"
                    :page-size-opts="pageObj1.pageSizeOpts"
                    size="small"
                    show-elevator show-sizer class-name="mg-rt-10 page-little"
                    :transfer="true"
                    @on-change="pageChange1"
                    @on-page-size-change="pageSizeChange1"
              />
              <a v-if="isActive" @click="delFun2(multipleSelection2,tab2tableName,2)">【删除明细】</a>
              <a v-if="isActive" @click="saveFun(3)">【保存】</a>
            </div>
          </div>
          <Table ref="table1" border
                 height="270"
                 :loading="rightTableLoading"
                 :columns="tableColumn2"
                 :data="tableData2" @on-selection-change="multipleSelection2 = $event"></Table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import sgStorageChangeFtpQuery from '@/js/pages/inventoryCenter/syncGradientStrategy/syncGradientStrategy';

export default sgStorageChangeFtpQuery;
</script>

<style scoped lang="less">
.syncGradientStrategy {
  .bg-form {
    &.unFlodStyle {
      background-color: #f8f8f8;
      padding-bottom: 3px;
    }

    .el-autocomplete.table-input.add-input {
      background-color: #fff;
    }
  }
}

</style>

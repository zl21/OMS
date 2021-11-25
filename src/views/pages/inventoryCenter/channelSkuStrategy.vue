<template>
  <div class="auto-check channelSkuStrategyAddOrEdit public-main" v-loading="loading">
    <WaterMark v-if="ID!=='-1'&&status && statusObj[status]" :text="statusObj[status]"/>
    <div class="operate left">
      <OmsButton :btn-config="btnConfig"/>
    </div>
    <div class="public-content">
      <Collapse v-model="collapse">
        <Panel name="panel_baseInfo">
          基本信息
          <div slot="content">
            <OmsForm :form-config="formConfig1"/>
          </div>
        </Panel>
        <Panel name="exclusive_stock">
          独享库存
          <div slot="content">
            <OmsForm v-if="canEdit" ref="exclusiveStock" :form-config="formConfig2"/>
            <div class="flex flex-direction-row justify-content-space-between align-items-center mg-tp-10 mg-bt-6">
              <div class="flex flex-direction-row align-items-center">
                <Page :total="exclusiveStockPage.total"
                      :current="exclusiveStockPage.current"
                      :page-size="exclusiveStockPage.pageSize"
                      :page-size-opts="exclusiveStockPage.pageSizeOpts"
                      size="small"
                      show-elevator show-sizer class-name="mg-rt-10 page-little"
                      :transfer="true"
                      @on-change="pageChange1"
                      @on-page-size-change="pageSizeChange1"
                />
                <a v-if="canEdit && ID !== '-1'" @click="addSubmit('-1','formConfig2',tab1tableName,1)">【添加】</a>
                <a v-if="canEdit && ID !== '-1'" @click="delFun(multipleSelection,tab1tableName,1)">【删除明细】</a>
                <a v-if="canEdit && ID !== '-1'" @click="importFun(tab1tableName,'独享库存明细',1)">【导入】</a>
                <a v-if="ID !== '-1'" @click="exportClick(tab1tableName,multipleSelection,table1Refcolid,'独享库存明细',isExport,1)">【导出】</a>
              </div>
              <div class="flex flex-direction-row align-items-center ">
                <Select v-model="exclusiveStockFilterValue" class="width-120" placeholder="查询条件" clearable>
                  <Option v-for="item in exclusiveStockFilterList" :value="item.value" :key="item.value">{{
                      item.label
                    }}
                  </Option>
                </Select>
                <el-input placeholder="请输入查询内容" v-model="exclusiveStockFilterInputValue"
                          class="input-with-search-style font-size-12 mg-lf-10"
                          size="mini">
                  <el-button slot="prepend" class="font-size-12" @click="getExclusiveStockData(true)">搜索</el-button>
                  <i slot="suffix" class="el-input__icon el-icon-search cursor-pointer"
                     @click="getExclusiveStockData(true)"></i>
                </el-input>
              </div>
            </div>
            <Table ref="table1"  border
                   :loading="table1Loading"
                   :columns="exclusiveStockColumns"
                   :data="exclusiveStockData" @on-selection-change="handleSelectionChange"></Table>
          </div>
        </Panel>
        <Panel name="share_baseInfo">
          共享库存
          <div slot="content">
            <OmsForm v-if="canEdit" :form-config="formConfig3"/>
            <div class="flex flex-direction-row justify-content-space-between align-items-center mg-tp-10 mg-bt-6">
              <div class="flex flex-direction-row align-items-center ">
                <Page :total="shareBaseInfoPage.total"
                      :current="shareBaseInfoPage.current"
                      :page-size="shareBaseInfoPage.pageSize"
                      :page-size-opts="shareBaseInfoPage.pageSizeOpts"
                      size="small"
                      show-elevator show-sizer class-name="mg-rt-10 page-little"
                      :transfer="true"
                      @on-change="pageChange2"
                      @on-page-size-change="pageSizeChange2"

                />

                <a v-if="canEdit && ID !== '-1'" @click="addSubmit('-1','formConfig3',tab2tableName,2)">【添加】</a>
                <a v-if="canEdit && ID !== '-1'" @click="delFun(multipleSelection2,tab2tableName,2)">【删除明细】</a>
                <a v-if="canEdit && ID !== '-1'" @click="importFun(tab2tableName,'共享库存明细',2)">【导入】</a>
                <a v-if="ID !== '-1'" @click="exportClick(tab2tableName,multipleSelection2,table2Refcolid,'共享库存明细',isExport2,2)">【导出】</a>
              </div>
              <div class="flex flex-direction-row align-items-center ">
                <Select v-model="sharedInventoryFilterValue" class="width-120" placeholder="查询条件" clearable>
                  <Option v-for="item in sharedInventoryFilterList" :value="item.value" :key="item.value">{{
                      item.label
                    }}
                  </Option>
                </Select>
                <el-input placeholder="请输入查询内容" v-model="sharedInventoryFilterInputValue"
                          class="input-with-search-style font-size-12 mg-lf-10"
                          size="mini">
                  <el-button slot="prepend" class="font-size-12" @click="getSharedInventoryData()">搜索</el-button>
                  <i slot="suffix" class="el-input__icon el-icon-search cursor-pointer"
                     @click="getSharedInventoryData()"></i>
                </el-input>
              </div>
            </div>
            <Table ref="table2"  border
                   :loading="table2Loading"
                   :columns="sharedInventoryColumns"
                   :data="sharedInventoryData" @on-selection-change="handleSelectionChange2"></Table>
          </div>
        </Panel>

        <Panel name="log" v-if="ID!=='-1'">
          日志
          <div slot="content">
            <OmsForm :form-config="formConfig4"/>
          </div>
        </Panel>
      </Collapse>
    </div>

    <!-- 导入 -->
    <OmsDialog
      :title="importTable.confirmTitle"
      :title-align="importTable.titleAlign"
      :width="importTable.width"
      :scrollable="importTable.scrollable"
      :closable="importTable.closable"
      :draggable="importTable.draggable"
      :mask="importTable.mask"
      :mask-closable="importTable.maskClosable"
      :transfer="importTable.transfer"
      :name="importTable.name"
      :url="importTable.url"
      :keep-alive="importTable.keepAlive"
      :exclude-string="importTable.excludeString"
      :component-data="importTable.componentData"
    />
  </div>
</template>

<script>
import channelRatioStrategy from '@/js/pages/inventoryCenter/channelSkuStrategy';

export default channelRatioStrategy;
</script>
<style lang="less">
@import '~@/css/pages/inventoryCenter/channelSkuStrategy.less';
</style>

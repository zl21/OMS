<!--组合商品编码新增和编辑页面-->
<template>
  <div class="jq-combined-commodity public-main custom-main">
    <div
      v-if="objid == '-1'"
      class="jq-combined-commodity-new"
      style="height: 100%; display: flex; flex-direction: column"
    >
      <div class="btn-operate custom-btn">
        <OmsButton :btn-config="btnConfig" />
      </div>
      <div class="public-content">
        <div class="item-collapse">
          <Collapse v-model="value1">
            <Panel name="1">
              <!-- 基本信息 -->
              {{ vmI18n.t('common.baseInformation') }}
              <OmsForm
                slot="content"
                :form-config="formConfig1"
              />
            </Panel>
            <Panel name="2">
              <!-- 日志 -->
              {{ vmI18n.t('common.journal') }}
              <OmsForm
                slot="content"
                :form-config="formConfig2"
              />
            </Panel>
          </Collapse>
        </div>
        <div class="commodity-detail-box">
          <div class="bar-code-detail">
            <OmsLabel
              :label-default-value="tabconfig1.labelDefaultValue"
              :label-list="tabconfig1.labelList"
            />
            <div class="tab-content">
              <p style="color:red;padding-left:56px;padding-top:5px">
                提示: 平台维护条码也需大写
              </p>
              <OmsTable
                ref="codeTable"
                :jordan-table-config="jordanTableConfig1"
                @on-select="onSelect"
                @on-row-click="onRowClick"
                @table-delete-detail="tableDeleteDetail"
                @on-page-change="pageChange"
                @on-page-size-change="pageSizeChange"
                @on-select-cancel="onSelectCancel"
                @on-select-all="onSelectAll"
                @on-select-all-cancel="onSelectAllCancel"
              />
            </div>
          </div>
          <div class="combined-commodity-detail">
            <OmsLabel
              :label-default-value="tabconfig2.labelDefaultValue"
              :label-list="tabconfig2.labelList"
            />
            <div class="tab-content">
              <div class="wrap">
                <p style="color:#fff;padding-left:55px;padding-top:5px">
                  1
                </p>
                <OmsTable
                  :jordan-table-config="jordanTableConfig2"
                  @table-delete-detail="commodityDeleteDetail"
                  @on-select="RightonSelect"
                  @on-page-change="commodityPageChange"
                  @on-page-size-change="commodityPageSizeChange"
                  @on-select-cancel="onSelectCancelCommodity"
                  @on-select-all="onSelectAllCommodity"
                  @on-select-all-cancel="onSelectAllCancelCommodity"
                  @table-import="commodityDetailImport"
                  @table-export="commodityDetailExport"
                />
              </div>
            </div>
          </div>
        </div> 
        <!-- 水印 -->
        <WaterMark v-if="statusName !== ''" class="omsWaterMark" :text="statusName"></WaterMark>
      </div>
    </div>
    <div
      v-else
      class="jq-combined-commodity-edit"
    >
      <!-- <Tabs
        :value="tab.activeName"
        on-click="changeTab"
      > -->
        <!-- <TabPane
          :label="vmI18n.t('common.baseInformation')"
          :name="vmI18n.t('common.baseInformation')"
          class="custom-label"
        > -->
          <div class="btn-operate custom-btn">
            <OmsButton :btn-config="btnConfig" />
          </div>
          <div class="item-collapse">
            <Collapse v-model="value1">
              <Panel name="1">
                <!-- 基本信息 -->
                {{ vmI18n.t('common.baseInformation') }}
                <OmsForm
                  slot="content"
                  :form-config="formConfig1"
                />
              </Panel>
              <Panel name="2">
                <!-- 日志 -->
                {{ vmI18n.t('common.journal') }}
                <OmsForm
                  slot="content"
                  :form-config="formConfig2"
                />
              </Panel>
            </Collapse>
          </div>
          <div class="commodity-detail-box">
            <div class="bar-code-detail">
              <OmsLabel
                :label-default-value="tabconfig1.labelDefaultValue"
                :label-list="tabconfig1.labelList"
              />
              <div class="tab-content">
                <OmsTable
                  ref="codeTable"
                  :jordan-table-config="jordanTableConfig1"
                  @on-select="onSelect"
                  @on-row-click="onRowClick"
                  @table-delete-detail="tableDeleteDetail"
                  @on-page-change="pageChange"
                  @on-page-size-change="pageSizeChange"
                  @on-select-cancel="onSelectCancel"
                  @on-select-all="onSelectAll"
                  @on-select-all-cancel="onSelectAllCancel"
                />
              </div>
            </div>
            <div class="combined-commodity-detail">
              <OmsLabel
                :label-default-value="tabconfig2.labelDefaultValue"
                :label-list="tabconfig2.labelList"
              />
              <div class="tab-content">
                <div class="wrap">
                  <OmsTable
                    :jordan-table-config="jordanTableConfig2"
                    @table-delete-detail="commodityDeleteDetail"
                    @on-select="RightonSelect"
                    @on-page-change="commodityPageChange"
                    @on-page-size-change="commodityPageSizeChange"
                    @on-select-cancel="onSelectCancelCommodity"
                    @on-select-all="onSelectAllCommodity"
                    @on-select-all-cancel="onSelectAllCancelCommodity"
                    @table-import="commodityDetailImport"
                    @table-export="commodityDetailExport"
                  />
                </div>
              </div>
            </div>
          </div>
        <!-- </TabPane> -->
        <!--<TabPane label="修改日志" :name="'日志'">-->
        <!--<OmsTable-->
        <!--ref="oprateLog"-->
        <!--:jordanTableConfig="oprateLogTableConfig"-->
        <!--@on-page-change="operateLogPageChange"-->
        <!--@on-page-size-change="operateLogPageSizeChange"-->
        <!--&gt;</OmsTable>-->
        <!--</TabPane>-->
        <!-- 水印 -->
        <WaterMark v-if="statusName !== ''" class="omsWaterMark" :text="statusName"></WaterMark>
      <!-- </Tabs> -->
    </div>
    <Modal
      v-model="modal1"
      width="360"
      :title="vmI18n.t('modalTitle.warning')"
      class="customizedModal"
      @on-ok="ok"
      @on-cancel="cancel"
    >
      <p>{{ tipMessage }}</p>
    </Modal>
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
      :basePathName="importTable.basePathName"
    />
  </div>
</template>
<script>
  import combinedCommodity from '@/js/pages/commodityCenter/combinedCommodity';

  export default combinedCommodity;
</script>
<style lang="less">
@import '~@/css/pages/commodityCenter/combinedCommodity.less';
</style>

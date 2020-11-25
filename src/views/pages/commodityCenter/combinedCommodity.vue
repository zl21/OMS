<!--组合商品编码新增和编辑页面-->
<template>
  <div class="jq-combined-commodity">
    <div
      v-if="objid == '-1'"
      class="jq-combined-commodity-new"
    >
      <div class="btn-operate">
        <businessButton :btn-config="btnConfig" />
      </div>
      <businessStatusFlag :status-name="statusName" />
      <div class="item-collapse">
        <Collapse v-model="value1">
          <Panel name="1">
            <!-- 基本信息 -->
            {{ vmI18n.t("common.baseInformation") }}
            <businessForm
              slot="content"
              :form-config="formConfig1"
            />
          </Panel>
          <Panel name="2">
            <!-- 日志 -->
            {{ vmI18n.t("common.journal") }}
            <businessForm
              slot="content"
              :form-config="formConfig2"
            />
          </Panel>
        </Collapse>
      </div>
      <div class="commodity-detail-box">
        <div class="bar-code-detail">
          <businessLabel
            :label-default-value="tabconfig1.labelDefaultValue"
            :label-list="tabconfig1.labelList"
          />
          <div class="tab-content">
            <businessActionTable
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
          <businessLabel
            :label-default-value="tabconfig2.labelDefaultValue"
            :label-list="tabconfig2.labelList"
          />
          <div class="tab-content">
            <div class="wrap">
              <businessActionTable
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
    </div>
    <div
      v-else
      class="jq-combined-commodity-edit"
    >
      <Tabs
        :value="tab.activeName"
        on-click="changeTab"
      >
        <TabPane
          :label="vmI18n.t('common.baseInformation')"
          :name="vmI18n.t('common.baseInformation')"
        >
          <div class="btn-operate">
            <businessButton :btn-config="btnConfig" />
          </div>
          <businessStatusFlag :status-name="statusName" />
          <div class="item-collapse">
            <Collapse v-model="value1">
              <Panel name="1">
                <!-- 基本信息 -->
                {{ vmI18n.t("common.baseInformation") }}
                <businessForm
                  slot="content"
                  :form-config="formConfig1"
                />
              </Panel>
              <Panel name="2">
                <!-- 日志 -->
                {{ vmI18n.t("common.journal") }}
                <businessForm
                  slot="content"
                  :form-config="formConfig2"
                />
              </Panel>
            </Collapse>
          </div>
          <div class="commodity-detail-box">
            <div class="bar-code-detail">
              <businessLabel
                :label-default-value="tabconfig1.labelDefaultValue"
                :label-list="tabconfig1.labelList"
              />
              <div class="tab-content">
                <businessActionTable
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
              <businessLabel
                :label-default-value="tabconfig2.labelDefaultValue"
                :label-list="tabconfig2.labelList"
              />
              <div class="tab-content">
                <div class="wrap">
                  <businessActionTable
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
        </TabPane>
        <!--<TabPane label="修改日志" :name="'日志'">-->
        <!--<businessActionTable-->
        <!--ref="oprateLog"-->
        <!--:jordanTableConfig="oprateLogTableConfig"-->
        <!--@on-page-change="operateLogPageChange"-->
        <!--@on-page-size-change="operateLogPageSizeChange"-->
        <!--&gt;</businessActionTable>-->
        <!--</TabPane>-->
      </Tabs>
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
    <businessDialog
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
  import combinedCommodity from '@/js/pages/commodityCenter/combinedCommodity';

  export default combinedCommodity;
</script>
<style lang="less">
  @import "~@/css/pages/commodityCenter/combinedCommodity.less";
</style>

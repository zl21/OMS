<!--组合商品编码新增和编辑页面-->
<template>
  <div class="jq-combined-commodity">
    <div class="jq-combined-commodity-new" v-if="objid === '-1'">
      <div class="btn-operate">
        <businessButton :btnConfig="btnConfig"></businessButton>
      </div>
      <businessStatusFlag :statusName="statusName"></businessStatusFlag>
      <div class="item-collapse">
        <Collapse v-model="value1">
          <Panel name="1">
            <!-- 基本信息 -->
            {{ vmI18n.t("common.baseInformation") }}
            <businessForm
              slot="content"
              :formConfig="formConfig1"
            ></businessForm>
          </Panel>
          <Panel name="2">
            <!-- 日志 -->
            {{ vmI18n.t("common.journal") }}
            <businessForm
              slot="content"
              :formConfig="formConfig2"
            ></businessForm>
          </Panel>
        </Collapse>
      </div>
      <div class="commodity-detail-box">
        <div class="bar-code-detail">
          <businessLabel
            :labelDefaultValue="tabconfig1.labelDefaultValue"
            :labelList="tabconfig1.labelList"
          ></businessLabel>
          <div class="tab-content">
            <businessActionTable
              ref="codeTable"
              :jordanTableConfig="jordanTableConfig1"
              @on-select="onSelect"
              @on-row-click="onRowClick"
              @table-delete-detail="tableDeleteDetail"
              @on-page-change="pageChange"
              @on-page-size-change="pageSizeChange"
              @on-select-cancel="onSelectCancel"
              @on-select-all="onSelectAll"
              @on-select-all-cancel="onSelectAllCancel"
            ></businessActionTable>
          </div>
        </div>
        <div class="combined-commodity-detail">
          <businessLabel
            :labelDefaultValue="tabconfig2.labelDefaultValue"
            :labelList="tabconfig2.labelList"
          ></businessLabel>
          <div class="tab-content">
            <div class="wrap">
              <businessActionTable
                :jordanTableConfig="jordanTableConfig2"
                @table-delete-detail="commodityDeleteDetail"
                @on-select="RightonSelect"
                @on-page-change="commodityPageChange"
                @on-page-size-change="commodityPageSizeChange"
                @on-select-cancel="onSelectCancelCommodity"
                @on-select-all="onSelectAllCommodity"
                @on-select-all-cancel="onSelectAllCancelCommodity"
                @table-import="commodityDetailImport"
                @table-export="commodityDetailExport"
              ></businessActionTable>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="jq-combined-commodity-edit" v-else>
      <Tabs :value="tab.activeName" on-click="changeTab">
        <TabPane
          :label="vmI18n.t('common.baseInformation')"
          :name="vmI18n.t('common.baseInformation')"
        >
          <div class="btn-operate">
            <businessButton :btnConfig="btnConfig"></businessButton>
          </div>
          <businessStatusFlag :statusName="statusName"></businessStatusFlag>
          <div class="item-collapse">
            <Collapse v-model="value1">
              <Panel name="1">
                <!-- 基本信息 -->
                {{ vmI18n.t("common.baseInformation") }}
                <businessForm
                  slot="content"
                  :formConfig="formConfig1"
                ></businessForm>
              </Panel>
              <Panel name="2">
                <!-- 日志 -->
                {{ vmI18n.t("common.journal") }}
                <businessForm
                  slot="content"
                  :formConfig="formConfig2"
                ></businessForm>
              </Panel>
            </Collapse>
          </div>
          <div class="commodity-detail-box">
            <div class="bar-code-detail">
              <businessLabel
                :labelDefaultValue="tabconfig1.labelDefaultValue"
                :labelList="tabconfig1.labelList"
              ></businessLabel>
              <div class="tab-content">
                <businessActionTable
                  ref="codeTable"
                  :jordanTableConfig="jordanTableConfig1"
                  @on-select="onSelect"
                  @on-row-click="onRowClick"
                  @table-delete-detail="tableDeleteDetail"
                  @on-page-change="pageChange"
                  @on-page-size-change="pageSizeChange"
                  @on-select-cancel="onSelectCancel"
                  @on-select-all="onSelectAll"
                  @on-select-all-cancel="onSelectAllCancel"
                ></businessActionTable>
              </div>
            </div>
            <div class="combined-commodity-detail">
              <businessLabel
                :labelDefaultValue="tabconfig2.labelDefaultValue"
                :labelList="tabconfig2.labelList"
              ></businessLabel>
              <div class="tab-content">
                <div class="wrap">
                  <businessActionTable
                    :jordanTableConfig="jordanTableConfig2"
                    @table-delete-detail="commodityDeleteDetail"
                    @on-select="RightonSelect"
                    @on-page-change="commodityPageChange"
                    @on-page-size-change="commodityPageSizeChange"
                    @on-select-cancel="onSelectCancelCommodity"
                    @on-select-all="onSelectAllCommodity"
                    @on-select-all-cancel="onSelectAllCancelCommodity"
                    @table-import="commodityDetailImport"
                    @table-export="commodityDetailExport"
                  ></businessActionTable>
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
      width="360"
      v-model="modal1"
      :title="vmI18n.t('modalTitle.warning')"
      class="customizedModal"
      @on-ok="ok"
      @on-cancel="cancel"
    >
      <p>{{ tipMessage }}</p>
    </Modal>
    <!-- 导入 -->
    <jordanModal
      :title="importTable.confirmTitle"
      :titleAlign="importTable.titleAlign"
      :width="importTable.width"
      :scrollable="importTable.scrollable"
      :closable="importTable.closable"
      :draggable="importTable.draggable"
      :mask="importTable.mask"
      :mask-closable="importTable.maskClosable"
      :transfer="importTable.transfer"
      :name="importTable.name"
      :url="importTable.url"
      :keepAlive="importTable.keepAlive"
      :excludeString="importTable.excludeString"
      :componentData="importTable.componentData"
    ></jordanModal>
  </div>
</template>
<script>
import combinedCommodity from "@/js/pages/commodityCenter/combinedCommodity";
export default combinedCommodity;
</script>
<style lang="less">

</style>


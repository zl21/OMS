<template>
  <div class="detailTabs">
    <slot name="MatchOperate" />

    <!--因为element-ui 不可编辑tab标签内容  因此需要重写组件-->
    <tabList
      :current-tab.sync="currentTab"
      :panels="productsArrs"
    >
      <div slot="tab_content">
        <div
          v-for="(panel,index) in productsArrs"
          :key="index"
        >
          <div v-if="showContent(index)">
            <div
              v-if="panel.rules && panel.rules.length>0"
              class="detail_rules"
            >
              <CTSIT
                v-for="(rule,_index) in panel.rules"
                :key="_index"
                :rule="rule"
              />
            </div>
            <detailTable
              :t-columns="columns"
              :t-data="productsArrsView[index].data"
              :current.sync="productsArrsView[index].current"
              :total="productsArrsView[index].total"
              :itemdata="itemdata"
              :page-size="productsArrsView[index].pageSize"
              @alertRowData="alertOneTableRowData"
              @deleteRowData="deleteOneTableRowData"
              @on-page-change="onePageChange"
              @on-page-size-change="onOnePageSizeChange"
            >
              <div
                slot="action"
                class="form_button"
              >
                <ButtonFkDialog
                  :itemdata="itemdataFk"
                  @getFkChooseItem="getOnePageButtonFkChoose"
                />
                <button
                  class="white"
                  @click="addOneTableRowData(index)"
                >
                  新增
                </button>
                <button
                  class="white"
                  @click="importData"
                >
                  导入
                </button>
              </div>
            </detailTable>
          </div>
        </div>
      </div>  
    </tabList>
    <!--导入组件-->
    <businessDialog
      :closable="importTable.closable"
      :component-data="importTable.componentData"
      :draggable="importTable.draggable"
      :exclude-string="importTable.excludeString"
      :keep-alive="importTable.keepAlive"
      :mask="importTable.mask"
      :mask-closable="importTable.maskClosable"
      :name="importTable.name"
      :scrollable="importTable.scrollable"
      :title="importTable.confirmTitle"
      :title-align="importTable.titleAlign"
      :transfer="importTable.transfer"
      :url="importTable.url"
      :width="importTable.width"
    />
  </div>
</template>
<script>
  import tableTabs from '@/js/pages/promotionCenter/details/tableTabs';

  export default tableTabs;
</script>

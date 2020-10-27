<template>
  <div class="detailTabs">
    <slot name="MatchOperate"></slot>

    <!--因为element-ui 不可编辑tab标签内容  因此需要重写组件-->
    <tabList :currentTab.sync="currentTab" :panels="productsArrs">
      <div slot="tab_content">
        <div v-for="(panel,index) in productsArrs" :key="index" v-if="showContent(index)">
          <div class="detail_rules" v-if="panel.rules && panel.rules.length>0">
            <CTSIT v-for="(rule,_index) in panel.rules" :key="_index" :rule="rule"></CTSIT>
          </div>
          <detailTable
            :tColumns="columns"
            :tData="productsArrsView[index].data"
            :current.sync="productsArrsView[index].current"
            :total="productsArrsView[index].total"
            :itemdata="itemdata"
            :pageSize="productsArrsView[index].pageSize"
            @alertRowData="alertOneTableRowData"
            @deleteRowData="deleteOneTableRowData"
            @on-page-change ="onePageChange"
            @on-page-size-change="onOnePageSizeChange"
          >
            <div slot="action" class="form_button">
              <ButtonFkDialog :itemdata="itemdataFk"  @getFkChooseItem="getOnePageButtonFkChoose"></ButtonFkDialog>
              <button class="white"  @click="addOneTableRowData(index)">新增</button>
              <button class="white"  @click="importData">导入</button>
            </div>
          </detailTable>
        </div>
      </div>
    </tabList>

     <!--导入组件-->
    <!-- <div  v-if="show_dialog">
      <Modal class="dialog" v-model="show_dialog" :footer-hide="dialogSet.footerHide"  :title="dialogSet.dialogTitle"   :mask="dialogSet.mask"  >
          <component :ref="popDialog"   :componentData="dialogModal"  v-bind:is="currentView"  @returnData="returnData"  ></component>
      </Modal>
    </div> -->
    <div  v-if="show_dialog">
      <Modal class="dialog" v-model="show_dialog" :footer-hide="dialogSet.footerHide"  :title="dialogSet.dialogTitle"   :mask="dialogSet.mask"  >
        <importDialog :componentData="dialogModal" @returnData="returnData" ></importDialog>
      </Modal>
    </div>
  </div>
</template>
<script>
  import tableTabs from "@/js/pages/promotionCenter/details/tableTabs.js";
  export default tableTabs;
</script>

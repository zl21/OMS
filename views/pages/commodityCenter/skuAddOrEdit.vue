<template>
  <div class="skuAddOrEdit customized-detail" :id="this.customizedModuleName">
    <loading :loading="loading" />
    <div class="customized-detail-btn">
      <businessButton :btn-config="btnConfig" />
    </div>
    <div class="customized-detail-main">
      <Collapse v-model="panelDefaultValue">
        <Panel name="panel_baseInfo">
          <!-- SKU基本信息 -->
          {{vmI18n.t('panel_label.at')}}
          <div slot="content" class="customized_Info_img">
            <ImageUpload
              v-model="imageValue"
              :http="http"
              :PropsData="dataitem"
              @on-delete="deleteImg"
              @on-Change="uploadFileChangeSuccess"
            />
          </div>
          <div slot="content" class="customized_Info_form">
            <businessForm
              :form-config="formConfig"
              @keyDown="keyDown"
              :key="forceFresh"
            >
              <template #spec01="{ rowData }">
                <DropDownSelectFilter
                  isBackRowItem
                  :single="true"
                  :data="rowData.value[rowData.item.defVal].data"
                  :total-row-count="
                    rowData.value[rowData.item.defVal].totalRowCount
                  "
                  :auto-data="rowData.value[rowData.item.defVal].autoData"
                  :defaultSelected="
                    rowData.value[rowData.item.defVal].defaultSelected
                  "
                  :page-size="rowData.item.pageSize"
                  :columns-key="rowData.item.columnsKey || []"
                  :hidecolumns="rowData.item.hidecolumns || []"
                  @on-popper-show="rowData.item.popShow"
                  @on-page-change="rowData.item.changePage"
                  @on-fkrp-selected="rowData.item.fkrpSelected"
                  @on-input-value-change="rowData.item.inputValueChange"
                  @on-clear="rowData.item.clearInput"
                />
              </template>
              <template #spec02="{ rowData }">
                <DropDownSelectFilter
                  isBackRowItem
                  :single="true"
                  :data="rowData.value[rowData.item.defVal].data"
                  :total-row-count="
                    rowData.value[rowData.item.defVal].totalRowCount
                  "
                  :auto-data="rowData.value[rowData.item.defVal].autoData"
                  :defaultSelected="
                    rowData.value[rowData.item.defVal].defaultSelected
                  "
                  :page-size="rowData.item.pageSize"
                  :columns-key="rowData.item.columnsKey || []"
                  :hidecolumns="rowData.item.hidecolumns || []"
                  @on-popper-show="rowData.item.popShow"
                  @on-page-change="rowData.item.changePage"
                  @on-fkrp-selected="rowData.item.fkrpSelected"
                  @on-input-value-change="rowData.item.inputValueChange"
                  @on-clear="rowData.item.clearInput"
                />
              </template>
              <template #spec03="{ rowData }">
                <DropDownSelectFilter
                  isBackRowItem
                  :single="true"
                  :data="rowData.value[rowData.item.defVal].data"
                  :total-row-count="
                    rowData.value[rowData.item.defVal].totalRowCount
                  "
                  :auto-data="rowData.value[rowData.item.defVal].autoData"
                  :defaultSelected="
                    rowData.value[rowData.item.defVal].defaultSelected
                  "
                  :page-size="rowData.item.pageSize"
                  :columns-key="rowData.item.columnsKey || []"
                  :hidecolumns="rowData.item.hidecolumns || []"
                  @on-popper-show="rowData.item.popShow"
                  @on-page-change="rowData.item.changePage"
                  @on-fkrp-selected="rowData.item.fkrpSelected"
                  @on-input-value-change="rowData.item.inputValueChange"
                  @on-clear="rowData.item.clearInput"
                />
              </template>
            </businessForm>
          </div>
          <div slot="content" class="clear"></div>
        </Panel>
        <Panel name="panel_wuli">
          <!-- 物理属性 -->
          {{vmI18n.t('panel_label.aw')}}
          <div slot="content">
            <businessForm :form-config="formConfigWuLi" @keyDown="keyDown" :key="formConfigWuLi.key"/>
          </div>
        </Panel>
        <Panel name="panel_fixAttr">
          <!-- 固定属性 -->
          {{vmI18n.t('panel_label.b4')}}
          <div slot="content">
            <businessForm :form-config="fixAttrFormConfig" @keyDown="keyDown" />
          </div>
        </Panel>
        <Panel name="panel_cusAttr">
          <!-- 自定义属性 -->
          {{vmI18n.t('panel_label.b5')}}
          <div slot="content">
            <businessForm :form-config="cusAttrFormConfig" @keyDown="keyDown" />
          </div>
        </Panel>
      </Collapse>
      <div class="customized-detail-table">
        <!-- tab切换 -->
        <businessLabel
          class="jordanLabel"
          :label-list="labelList"
          :label-default-value="labelDefaultValue"
          @labelClick="labelClick"
        />
        <!-- 子表Part -->
        <div class="subtablePart">
          <!-- <businessForm v-show="labelDefaultValue === 'PROPERTY'" :form-config="propertiesFormConfig"></businessForm> -->
          <orderItem :component-data="subTableConfig"></orderItem>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import skuAddOrEdit from "@/js/pages/commodityCenter/skuAddOrEdit.js";
export default skuAddOrEdit;
</script>
<style lang="less" scoped>
@import '~@burgeon/oms-theme/skin/public.less';
</style>

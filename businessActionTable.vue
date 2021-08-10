<template>
  <div class="jordan-table-box">
    <!-- businessForm 按钮定位
    *colRowNum:获取当前展示几列；
    *formData.length:form的个数；
    1.如果存在businessFormConfig添加fromBtn 添加相对定位，并且给按钮添加绝对定位；
    2.判断是否启用gridBar（栅格栏），如果启用判断formData的长度是否可以被colRowNum（当前枪）整除，是则添加FormPadding；（公式：Number.isInteger(formData.length / colRowNum)）
    -->
    <div :class="[
      businessFormConfig !== undefined ? 'fromBtn' :'',
      gridBar && Number.isInteger(formDataLength / colRowNum) ? 'FormPadding' : '',
      noGridBar ? 'FormPadding' : ''
      ]">
      <div class="businessForm-box" 
        v-if="businessFormConfig !== undefined">
        <businessForm :formConfig="businessFormConfig"></businessForm>
      </div>
      <!-- businessButtons -->
      <div class="businessButton" v-if="businessButtonConfig !== undefined">
        <businessButton :btnConfig="businessButtonConfig"></businessButton>
      </div>
    </div>
    <!-- button -->
    <div class="detailButtons" v-show="isShowRefreshBtn || isShowAddDetailBtn || isShowDeleteDetailBtn || isShowImportBtn || isShowExportBtn">
      <!-- 刷新 -->
      <Button class="deleteDetail" v-show="isShowRefreshBtn" @click="tableRefreshDetail">{{vmI18n.t('btn.refresh')}}</Button>
      <!-- 新增明细 -->
      <Button class="deleteDetail" v-show="isShowAddDetailBtn" @click="tableAddDetail">{{vmI18n.t('btn.addDetail')}}</Button>
      <!-- 删除明细 -->
      <Button class="deleteDetail" v-show="isShowDeleteDetailBtn" @click="tableDeleteDetail">{{vmI18n.t('btn.deleteDetail')}}</Button>
      <!-- 导入 -->
      <Button class="import" v-show="isShowImportBtn" @click="tableImport">{{vmI18n.t('btn.import')}}</Button>
      <!-- 导出 -->
      <Button class="export" v-show="isShowExportBtn" @click="tableExport">{{vmI18n.t('btn.export')}}</Button>
      <!-- <businessButton :btnConfig="detailButtonsConfig"></businessButton> -->
    </div>
    <keep-alive>
      <component v-bind:is="currentView" :ref="currentView" :componentData="componentData"> </component>
    </keep-alive>
    <Table
      class="jordan-table"
      ref="selections"
      :columns="columns"
      :draggableMethod="draggableMethod"
      :data="data"
      :total-data="totalData"
      :border="border"
      :height="height"
      :width="width"
      :loading="loading"
      :highlight-row="highlightRow"
      :multiple="multiple"
      :row-class-name="rowClassName"
      :no-data-text="noDataText"
      :show-header="showHeader"
      @on-current-change="onCurrentChange"
      @on-select="onSelect"
      @on-select-cancel="onSelectCancel"
      @on-select-all="onSelectAll"
      @on-select-all-cancel="onSelectAllCancel"
      @on-row-click="onRowClick"
      @on-row-dblclick="onRowDblclick"
    ></Table>
    <!-- @on-drag-drop="onDragDrop" -->
    <div>
      <slot name="tableFooter"></slot>
    </div>
    <!-- page -->
    <div class="page-box">
      <div class="page-box-left">
        <div class="page_content" v-show="pageShow">
          <p class="page-allSizes">{{vmI18n.t('common.total')}} {{ total }} {{vmI18n.t('common.piece')}}</p>
          <Page 
            size='small' 
            class="page-pages" 
            :total="total" 
            :current="current" 
            :page-size="pageSize" 
            :page-size-opts="pageSizeOpts" 
            show-elevator 
            show-sizer 
            :transfer="true" 
            @on-change="pageChange" 
            @on-page-size-change="onPageSizeChange" />
        </div>
      </div>
      <Input 
        class="page-input" 
        v-show="searchInputShow" 
        v-model="searchInputValue" 
        placeholder 
        @on-enter="searchOnEnter" 
        @on-change="searchOnChange" 
        style="width: 220px"
      >
        <span slot="prepend" v-if="isSearchText">{{vmI18n.t('btn.search')}}</span>
        <Select 
          :label-in-value="true" 
          @on-change="searchSelectOnChange" 
          v-model="searchSelectValue" 
          size="small" v-if="!isSearchText" 
          :transfer="true" 
          slot="prepend" 
          style="width: 80px"
        >
          <Option :value="item.value" v-for="(item, index) in searchSelectList" :key="index">{{ item.label }}</Option>
        </Select>
        <Button slot="append" @click="searchOnEnter" icon="ios-search"></Button>
      </Input>
    </div>
  </div>
</template>

<script>
import businessActionTable from './js/businessActionTable';
export default businessActionTable;
</script>

<style lang="less">
@import 'css/businessActionTable.less';
</style>

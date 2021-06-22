<template>
  <div class="jordan-table-box">
    <!-- businessForm -->
    <div class="businessForm-box" v-if="businessFormConfig !== undefined">
      <businessForm :formConfig="businessFormConfig"></businessForm>
    </div>
    <!-- businessButtons -->
    <div class="businessButtons-box" v-if="businessButtonConfig !== undefined">
      <businessButton :btnConfig="businessButtonConfig"></businessButton>
    </div>
    <!-- button -->
    <div class="detailButtons" v-show="isShowRefreshBtn || isShowAddDetailBtn || isShowDeleteDetailBtn || isShowImportBtn || isShowExportBtn">
      <Button class="deleteDetail" v-show="isShowRefreshBtn" @click="tableRefreshDetail">刷新</Button>
      <Button class="deleteDetail" v-show="isShowAddDetailBtn" @click="tableAddDetail">新增明细</Button>
      <Button class="deleteDetail" v-show="isShowDeleteDetailBtn" @click="tableDeleteDetail">删除明细</Button>
      <Button class="import" v-show="isShowImportBtn" @click="tableImport">导入</Button>
      <Button class="export" v-show="isShowExportBtn" @click="tableExport">导出</Button>
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
          <p class="page-allSizes">共 {{ total }} 条</p>
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
        <span slot="prepend" v-if="isSearchText">搜索</span>
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

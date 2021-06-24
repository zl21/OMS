<!--
 * @Author: your name
 * @Date: 2021-06-07 20:40:41
 * @LastEditTime: 2021-06-23 17:12:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /burgeon-project-logic/views/pages/systemConfig/quanXian/quanXian.vue
-->
<template>
  <div class="jurisdiction custom-main functionPower">
    <loading :loading="loading" />
    <div class="custom-btn">
      <businessButton :btn-config="buttonConfig" />
    </div>
    <div class="content">
      <div class="FilterTree_box left_col">
        <FilterTree
          class="FilterTree"
          :tree-attribute="filterTreeConfig.treeAttribute"
          :tree-event="filterTreeConfig.treeEvent"
          :clearable="filterTreeConfig.clearable"
          :placeholder="filterTreeConfig.placeholder"
        />
      </div>

      <div class="FilterTree_box left_col">
        <div class="tree-center">
          <Tree ref="tree" :data="treeData" @on-select-change="treeChange" />
        </div>
      </div>

      <div class="right_col">
        <div class="SearchForm_Table">
          <div v-if="permissionType !== 'sensitive'" class="fromHeight">
            <SearchForm
              class="SearchForm"
              :set-height="searchFormConfig.setHeight"
              :row-all="searchFormConfig.rowAll"
              :search-foldnum="searchFormConfig.searchFoldnum"
              :default-column="searchFormConfig.defaultColumn"
              :defaultconfig="searchFormConfig.defaultconfig"
            />
            <businessButton :btn-config="searchBtnConfig" />
          </div>
          <div class="table_content">
            <quanXianTable
              ref="quanXianTable"
              :search-value="tableArr.searchValue"
              :rows="tableArr.rows"
              :columns="tableArr.columns"
              :table-arr="tableArr"
              @isChangeFun="isChangeFun"
            />
          </div>
        </div>
      </div>
    </div>
    <copyModal
      :copy-modal="copyModal"
      @cancel-btn="cancelBtn"
      @sure-btn="sureBtn"
    />
    <Modal
      v-model="saveModal"
      :title="vmI18n.t('modalTitle.tips')"
      @on-ok="saveOk"
      @on-cancel="saveCancel"
    >
      <!-- <p>是否保存已经修改的数据?</p> -->
      <p>{{ vmI18n.t("modalTips.a0") }}</p>
    </Modal>
  </div>
</template>
<script>
import quanXian from "@/js/pages/systemConfig/quanXian/quanXian";

export default quanXian;
</script>
<style lang="less">
@import "~@/css/pages/systemConfig/quanXian/quanXian.less";
</style>

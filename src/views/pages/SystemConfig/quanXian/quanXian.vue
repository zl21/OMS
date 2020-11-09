<template>
  <div class="jurisdiction">
    <Spin
      v-if="spinShow"
      size="large"
      fix
    />
    <customButton :button-config="buttonConfig" />
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
      <div class="right_col">
        <div class="SearchForm_Table">
          <div
            v-if="permissionType !== 'sensitive'"
            class="fromHeight"
          >
            <SearchForm
              class="SearchForm"
              :set-height="searchFormConfig.setHeight"
              :row-all="searchFormConfig.rowAll"
              :search-foldnum="searchFormConfig.searchFoldnum"
              :default-column="searchFormConfig.defaultColumn"
              :defaultconfig="searchFormConfig.defaultconfig"
            />
            <customButton :button-config="searchBtnConfig" />
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
      <p>{{ vmI18n.t('modalTips.a0') }}</p>
    </Modal>
  </div>
</template>
<script>
  import quanXian from '@/js/pages/SystemConfig/quanXian/quanXian';

  export default quanXian;
</script>
<style lang="less">
@import "~@/css/pages/SystemConfig/quanXian/quanXian.less";
</style>

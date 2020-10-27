<template>
  <div class="jurisdiction">
    <Spin size="large" fix v-if="spinShow"></Spin>
    <customButton :button-config="buttonConfig" />
    <div class="content">
      <div class="FilterTree_box left_col">
        <FilterTree
          class="FilterTree"
          :treeAttribute="filterTreeConfig.treeAttribute"
          :treeEvent="filterTreeConfig.treeEvent"
          :clearable="filterTreeConfig.clearable"
          :placeholder="filterTreeConfig.placeholder"
        ></FilterTree>
      </div>
      <div class="right_col">
        <div class="SearchForm_Table">
          <div class="fromHeight" v-if="permissionType !== 'sensitive'">
            <SearchForm
              class="SearchForm"
              :setHeight="searchFormConfig.setHeight"
              :rowAll="searchFormConfig.rowAll"
              :searchFoldnum="searchFormConfig.searchFoldnum"
              :defaultColumn="searchFormConfig.defaultColumn"
              :defaultconfig="searchFormConfig.defaultconfig"
            ></SearchForm>
            <customButton :button-config="searchBtnConfig" />
          </div>
          <div class="table_content">
            <quanXianTable
              ref="quanXianTable"
              :searchValue="tableArr.searchValue"
              :rows="tableArr.rows"
              :columns="tableArr.columns"
              :tableArr="tableArr"
              @isChangeFun="isChangeFun"
            ></quanXianTable>
          </div>
        </div>
      </div>
    </div>
    <copyModal
      :copyModal="copyModal"
      @cancel-btn="cancelBtn"
      @sure-btn="sureBtn"
    ></copyModal>
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
import quanXian from "@/js/pages/SystemConfig/quanXian/quanXian.js";
export default quanXian;
</script>
<style lang="less">
.jurisdiction {
  height: 100%;
  .content {
    height: calc(100% - 50px);
    display: flex;
    align-items: center;
    .FilterTree_box {
      height: 100%;
      .FilterTree {
        height: 100%;
      }
    }
    .right_col {
      height: 100%;
      display: flex;
      width: 100%;
      border: 1px solid #d8d8d8;
      border-radius: 6px;
      .SelectTree_box {
        height: 100%;
        display: flex;
        .SelectTree {
          height: 100%;
        }
      }
      .SearchForm_Table {
        height: 100%;
        padding: 8px 12px;
        display: flex;
        flex: 1;
        flex-direction: column;
        .SearchForm {
          width: 100%;
        }
        .table_content {
          margin-top: 10px;
        }
      }
    }
  }
}
</style>

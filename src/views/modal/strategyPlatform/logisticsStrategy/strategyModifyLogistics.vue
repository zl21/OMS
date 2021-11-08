<template>
  <div class="strategyModifyLogistics">
    <div class="modifyBox">
      <div class="modifyLeft">
        <div class="retrieveBox">
          <span class="retrieveTitle">检索</span>
          <Input
            v-model="name"
            class="retrieve"
            :expand="false"
            @on-enter="getLogistics(name, 1)"
          />
          <Icon
            slot="suffix"
            type="ios-search"
            @click="getLogistics(name, 1)"
          />
          </Input>
        </div>
        <business-action-table
          :jordan-table-config="jordanTableConfig"
          @on-row-dblclick="onRowDblclick"
          @on-select="OnSelect"
          @on-select-cancel="Cancel"
          @on-select-all="SelectAll"
          @on-select-all-cancel="SelectAllCancel"
        />
      </div>
      <div class="modifyMiddle">
        <Button
          size="small"
          @click="synchronous"
        >
          >>
        </Button>
      </div>
      <div class="modifyRight">
        <div class="selectedModify">
          <div class="selectedTop">
            <p>
              已选中（
              <span>{{ total }}条</span>）
            </p>
            <Icon
              type="ios-trash-outline"
              size="20"
              @click="DeleteAll"
            />
          </div>
          <div class="selectedList">
            <ul>
              <li
                v-for="(item, index) in selectData"
                :key="index"
              >
                <p>{{ item.CP_C_PHY_WAREHOUSE_ENAME }}</p>
                <span @click="DeleteSelect(item.CP_C_PHY_WAREHOUSE_ECODE, item.ID)">X</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <OmsButton :btn-config="btnConfig" />
    <Modal
      v-model="cancelModel"
      title="提示"
      width="400"
      :mask-closable="false"
      :mask="true"
      @on-ok="okClick"
      @on-cancel="cancalModal"
    >
      <p>请确认是否需要删除仓库</p>
    </Modal>
    <div
      v-show="removeLoading"
      class="fromLoading"
    >
      <Spin />
    </div>
  </div>
</template>

<script>
  import strategyModifyLogistics from '@/js/modal/strategyPlatform/logisticsStrategy/strategyModifyLogistics.js';

  export default strategyModifyLogistics;
</script>

<style lang="less">
  @import "~@/css/modal/strategyPlatform/setWarehouseLogistics/modifyLogistics.less";
</style>

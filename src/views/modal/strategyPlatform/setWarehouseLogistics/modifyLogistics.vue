<template>
  <div class="modifyLogistics">
    <div class="modifyBox">
      <div class="modifyLeft">
        <div class="retrieveBox">
          <span class="retrieveTitle">检索</span>
          <Input
            v-model="name"
            :expand="false"
            class="retrieve"
            @on-enter="getLogistics(name, 1)"
          >
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
          @on-select-all="SelectAll"
          @on-select-all-cancel="SelectAllCancel"
          @on-select-cancel="Cancel"
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
              size="20"
              type="ios-trash-outline"
              @click="DeleteAll"
            />
          </div>
          <div class="selectedList">
            <ul>
              <li
                v-for="(item, index) in selectData"
                :key="index"
              >
                <p>{{ item.CP_C_LOGISTICS_ENAME }}</p>
                <span @click="DeleteSelect(item.CP_C_LOGISTICS_ECODE, item.ID)">X</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <business-button :btn-config="btnConfig" />
    <Modal
      v-model="cancelModel"
      :mask="true"
      :mask-closable="false"
      title="提示"
      width="400"
      @on-cancel="cancalModal"
      @on-ok="okClick"
    >
      <p>请确认是否需要删除物流公司</p>
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

  import modifyLogistics from '@/js/modal/strategyPlatform/setWarehouseLogistics/modifyLogistics';

  export default modifyLogistics;
</script>

<style lang="less">
  @import "~@/css/modal/strategyPlatform/setWarehouseLogistics/modifyLogistics.less";
</style>

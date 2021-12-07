<template>
  <div class="customized-modal" v-loading="loading">
    <div class="subtablePart">
      <div class="modalContent">
        <div class="itemContent">
          <div class="labelContent">
            <div class="labelTip">*</div>
            <!-- 原角色 -->
            <div>{{ $it('fL.eq') }}:</div>
          </div>
          <DropDownSelectFilter
            class="itemCom"
            :total-row-count="totalRowCount"
            :page-size="dropPageSize"
            :auto-data="singleAutoData"
            :columns-key="['NAME']"
            :hidecolumns="['ID']"
            :default-selected="singleDefaultSelected"
            :data="singleDropDownSelectFilterData"
            @on-fkrp-selected="singleDropSelected"
            @on-page-change="singleDropPageChange"
            @on-popper-hide="singlePopperHide"
            @on-clear="singleDropClear"
            @on-input-value-change="singleInputChange"
          />
        </div>
        <div class="itemContent">
          <div class="labelContent">
            <div class="labelTip">*</div>
            <!-- 目的角色 -->
            <div>{{ $it('fL.er') }}:</div>
          </div>
          <DropDownSelectFilter
            :single="false"
            class="itemCom"
            :total-row-count="totalRowCount"
            :page-size="dropPageSize"
            :columns-key="['NAME']"
            :hidecolumns="['ID']"
            :default-selected="multipleDefaultSelected"
            :auto-data="multipleAutoData"
            :data="multipleDropDownSelectFilterData"
            :disabled="filterDisabled"
            @on-fkrp-selected="multipleDropSelected"
            @on-page-change="multipleDropPageChange"
            @on-popper-hide="multiplePopperHide"
            @on-clear="multipleDropClear"
            @on-input-value-change="multipleInputChange"
          />
        </div>
        <div class="itemContent">
          <div class="labelContent">
            <div class="labelTip">*</div>
            <!-- 复制方式 -->
            <div>{{ $it('fL.et') }}:</div>
          </div>
          <Select
            v-model="copyType"
            class="itemCom"
            :placeholder="$it('tip.ir')"
          >
            <Option value="cover"> 
              <!-- 覆盖原有权限  -->
              {{ $it('fL.eu') }}
            </Option>
            <Option value="copy"> 
              <!-- 保留原有权限 -->
              {{ $it('fL.ev') }}
            </Option>
          </Select>
        </div>
      </div>
    </div>
    <OmsButton class="modal-footer" :btn-config="btnConfig" />
  </div>
</template>

<script>
  import copyPermission from '@/js/modal/systemConfig/copyPermission';
  export default copyPermission;
</script>
<style lang="less" scoped>
  // @import "~@/css/modal/strategyPlatform/scheduleFormDialog.less";
</style>

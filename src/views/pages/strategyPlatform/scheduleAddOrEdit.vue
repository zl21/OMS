<template>
  <!-- 档期日程规划 -->
  <div class="customized-detail" v-loading="loading">
    <div class="customized-detail-btn">
      <OmsButton :btn-config="btnConfig" />
    </div>
    <div class="customized-detail-main">
      <Collapse v-model="collapse">
        <Panel name="panel_baseInfo">
          {{ vmI18n.t('common.baseInformation') }}
          <p slot="content">
            <OmsForm :form-config="formConfig" />
          </p>
        </Panel>
        <Panel v-show="ID != -1 || isMasterRequired" name="panel_pickInfo">
          {{ vmI18n.t('panel_label.au') }}
          <p slot="content">
            <OmsTable :jordan-table-config="pickingTableConfig" />
          </p>
        </Panel>
        <Panel v-show="ID != -1 || isMasterRequired" name="panel_warehouseInfo">
          {{ vmI18n.t('panel_label.av') }}
          <p slot="content">
            <OmsTable :jordan-table-config="warehouseWarrantConfig" />
          </p>
        </Panel>
      </Collapse>

      <div class="">
        <!-- tab切换 -->
        <!-- <businessLabel
          v-if="$route.params.customizedModuleId != 'New'"
          :label-list="labelList"
          :label-default-value="labelDefaultValue"
        /> -->
        <!-- 子表Part -->
        <!-- <div class="subtablePart">
          <logTable
            v-if="$route.params.customizedModuleId != 'New'"
            :id="$route.params.customizedModuleId"
            :table-name="$route.params.customizedModuleName"
          />
        </div> -->
      </div>

      <Modal v-model="dialog[curDialog]" :title="dialogInfo.title" footer-hide :width="dialogInfo.width" mask>
        <scheduleFormDialog :forceReload="forceReload" ref="dialogForm" :dialog-config="dialogConfig" :detail="initDetail" :loading="dialogLoading" @getData="getDetail" @clearModify="initModify" />
      </Modal>
    </div>
  </div>
</template>

<script>
import scheduleAddOrEdit from '@/js/pages/strategyPlatform/scheduleAddOrEdit';
export default scheduleAddOrEdit;
</script>
<style lang="less" scoped>
@import '~@/css/pages/strategyPlatform/scheduleAddOrEdit.less';
</style>

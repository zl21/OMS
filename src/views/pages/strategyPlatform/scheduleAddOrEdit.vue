<template>
  <!-- 档期日程规划 -->
  <div class="customized-detail" v-loading="loading">
    <div class="customized-detail-btn">
      <OmsButton :btn-config="btnConfig" />
    </div>
    <div class="customized-detail-main">
      <Collapse v-model="collapse">
        <Panel name="panel_baseInfo">
          <!-- 基本信息 -->
          {{ vmI18n.t("common.baseInformation") }}
          <p slot="content">
            <OmsForm :form-config="formConfig" />
          </p>
        </Panel>
        <Panel
          v-show="ID != -1 || isMasterRequired"
          name="panel_pickInfo"
        >
          <!-- 创建拣货单 -->
          {{ vmI18n.t('panel_label.au') }}
          <p slot="content">
            <OmsTable
              :jordan-table-config="pickingTableConfig"
            />
          </p>
        </Panel>
        <Panel
          v-show="ID != -1 || isMasterRequired"
          name="panel_warehouseInfo"
        >
          <!-- 创建入库单 -->
          {{ vmI18n.t('panel_label.av') }}
          <p slot="content">
            <OmsTable
              :jordan-table-config="warehouseWarrantConfig"
            />
          </p>
        </Panel>
      </Collapse>

      <div class="customized-detail-table">
        <!-- tab切换 -->
        <OmsLabel
          v-if="$route.params.customizedModuleId != 'New'"
          :label-list="labelList"
          :label-default-value="labelDefaultValue"
        />
        <!-- 子表Part -->
        <div class="subtablePart">
          <subTable
            v-if="$route.params.customizedModuleId != 'New'"
            :component-data="subTableConfig"
          />
        </div>
      </div>
      <OmsDialog
        :batch-closed="scheduleFormConfig.batchClosed"
        :closable="scheduleFormConfig.closable"
        :component-data="scheduleFormConfig.componentData"
        :draggable="scheduleFormConfig.draggable"
        :exclude-string="scheduleFormConfig.excludeString"
        :keep-alive="scheduleFormConfig.keepAlive"
        :mask="scheduleFormConfig.mask"
        :mask-closable="scheduleFormConfig.maskClosable"
        :name="scheduleFormConfig.name"
        :quit="scheduleFormConfig.quit"
        :scrollable="scheduleFormConfig.scrollable"
        :title="scheduleFormConfig.title"
        :title-align="scheduleFormConfig.titleAlign"
        :transfer="scheduleFormConfig.transfer"
        :url="scheduleFormConfig.url"
        :width="scheduleFormConfig.width"
      />
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

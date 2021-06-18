<template>
  <!-- 档期日程规划 -->
  <div class="wphAddOrEdit public-main customized-detail" v-loading="loading">
    <div class="buttons customized-detail-btn">
      <businessButton :btn-config="btnConfig" />
    </div>
    <div class="public-content customized-detail-main">
      <Collapse v-model="collapse">
        <Panel name="panel_baseInfo">
          基本信息
          <p slot="content">
            <businessForm :form-config="formConfig" />
          </p>
        </Panel>
        <Panel
          v-show="ID != -1 || isMasterRequired"
          name="panel_pickInfo"
        >
          创建拣货单
          <p slot="content">
            <businessActionTable
              :jordan-table-config="pickingTableConfig"
            />
          </p>
        </Panel>
        <Panel
          v-show="ID != -1 || isMasterRequired"
          name="panel_warehouseInfo"
        >
          创建入库单
          <p slot="content">
            <businessActionTable
              :jordan-table-config="warehouseWarrantConfig"
            />
          </p>
        </Panel>
      </Collapse>

      <div class="customized-detail-table">
        <!-- tab切换 -->
        <businessLabel
          v-show="ID != -1 || isMasterRequired"
          :label-list="labelList"
          :label-default-value="labelDefaultValue"
        />
        <!-- 子表Part -->
        <div class="subtablePart">
          <subTable
            v-show="ID != -1 || isMasterRequired"
            :component-data="subTableConfig"
          />
        </div>
      </div>

      <!-- <Modal
        v-model="dialog[curDialog]"
        :title="dialogInfo.title"
        footer-hide
        :width="dialogInfo.width"
        mask
      >
        <scheduleFormDialog 
          ref="dialogForm"
          :dialog-config="dialogConfig"
          :detail="initDetail"
          :loading="dialogLoading"
          @getData="getDetail"
          @clearModify="initModify"
        />
      </Modal> -->
      <businessDialog
        :ref="scheduleFormConfig.name"
        :url="scheduleFormConfig.url"
        :title="scheduleFormConfig.title"
        :name="scheduleFormConfig.name"
        :keep-alive="scheduleFormConfig.keepAlive||true"
        :width="scheduleFormConfig.width||''"
        :exclude-string="scheduleFormConfig.excludeString"
        :component-data="scheduleFormConfig.data"
        :footer-hide="scheduleFormConfig.footerHide"
        :quit="scheduleFormConfig.quit"
        :mask-closable="scheduleFormConfig.maskClosable"
        :confirm="scheduleFormConfig.confirm"
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

<!--
 * @Author: your name
 * @Date: 2021-05-14 11:34:41
 * @LastEditTime: 2021-05-22 12:41:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /burgeon-project-logic/views/pages/basicData/channelStore.vue
-->
<template>
  <div class="channelStore public-main customized-detail">
    <div class="buttons customized-detail-btn">
      <businessButton :btn-config="btnConfig" />
    </div>
    <div class="public-content customized-detail-main">
      <Collapse v-model="collapse">
        <Panel name="panel_baseInfo">
          <!-- 基础信息 -->
          {{ vmI18n.t("other.basic_info") }}
          <p slot="content">
            <businessForm :form-config="formConfig" />
          </p>
        </Panel>
      </Collapse>
      <!-- tab切换 -->
      <div class="customized-detail-table">
        <businessLabel
          :label-list="labelList"
          :label-default-value="labelDefaultValue"
          @labelClick="labelClick"
        />
        <!-- 子表Part -->
        <div
          v-show="labelDefaultValue == 'supplyStore'"
          class="supplyStore"
        >
          <businessActionTable
            :jordan-table-config="jordanTableConfig"
            @on-select="onSelect"
            @on-select-cancel="onSelect"
            @on-select-all="onSelect"
            @on-select-all-cancel="onSelect"
            @on-page-change="pageChange"
            @on-page-size-change="pageSizeChange"
          />
        </div>
         <div class="subtablePart" v-show="labelDefaultValue != 'supplyStore'">
          <subTable :component-data="subTableConfig"></subTable>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
  import channelStore from '@/js/pages/basicData/channelStore.js';

  export default channelStore;
</script>
<style lang="less" scoped>
@import '~@/css/pages/basicData/channelStore.less';
</style>

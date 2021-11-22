<!--
 * @Author: your name
 * @Date: 2021-05-19 17:55:24
 * @LastEditTime: 2021-06-23 10:25:26
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /burgeon-project-logic/views/pages/commodityCenter/modifyGroup.vue
-->
<template>
  <!-- 组合商品编辑 -->
  <div class="modifyGroup customized-detail">
    <div class="customized-detail-btn">
      <OmsButton :btn-config="btnConfig" />
    </div>
    <div class="customized-detail-main">
      <Collapse v-model="collapse">
        <Panel name="panel_baseInfo">
          <!-- 基础资料 -->
          {{ vmI18n.t('panel_label.basicData') }}
          <p
            slot="content"
            style="float: left; width: 250px; margin-top: 15px"
          >
            <arkImageUpload
              v-model="imageValue"
              :http="http"
              :PropsData="dataitem"
              @on-delete="deleteImg"
              @on-Change="uploadFileChangeSuccess"
            />
          </p>
          <p slot="content">
            <OmsForm :form-config="formConfig" />
          </p>
          <div slot="content" class="clear"></div>
        </Panel>
      </Collapse>
      <Modal
        v-model="isClearItem"
        :title="vmI18n.t('modalTitle.tips')"
        @on-ok="clearItem"
        @on-cancel="unClearItem"
      >
        <!-- <p>点击后将删除凭证,是否继续?</p> -->
        <p>切换类型会清空当前类型明细,是否继续?</p>
      </Modal>
      <!-- tab切换 -->
      <div class="customized-detail-table">
        <OmsLabel
          :label-list="formConfig.formValue.group_type == '2' ? label.labelList : label.labelTagList"
          :label-default-value="label.labelValue"
          @labelClick="labelClick"
        />
        <div
          v-show="label.labelValue === 'generalGroupItem'"
          class="generalGroupItem"
        >
          <OmsTable
            :jordan-table-config="jordanTableConfigGenera"
            @on-select="onSelect"
            @on-select-cancel="onSelect"
            @on-select-all="onSelect"
            @on-select-all-cancel="onSelect"
          />
        </div>
        <div
          v-show="label.labelValue === 'luckbagGroupItem'"
          class="luckbagGroupItem"
        >
          <OmsTable
            :jordan-table-config="jordanTableConfigLuck"
            @on-select="onSelect"
            @on-select-cancel="onSelect"
            @on-select-all="onSelect"
            @on-select-all-cancel="onSelect"
          />
        </div>
        <div
        v-show="label.labelValue === 'logTable'"
          >
          <subTable
          :component-data="subTableConfig"
          ></subTable>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import modifyGroup from '@/js/pages/commodityCenter/modifyGroup.js';

  export default modifyGroup;
</script>

<style lang="less">
// @import '~burgeonComponents/burgeon.publish/common/css/theme.less';
@import url(https://cdn.jsdelivr.net/gh/zl21/OMS/burgeon.publish/common/css/theme.less);

</style>

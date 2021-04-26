<template>
  <!-- 基础信息-国家省市区-编辑 -->
  <div
    :id="this.customizedModuleName"
    class="nationalProvincialMunicipalEdit customized-detail"
  >
    <loading :loading="loading" />
    <div class="buttons customized-detail-btn">
      <businessButton :btn-config="btnConfig" />
    </div>
    <div class="customized-detail-main">
      <Collapse v-model="panelDefaultValue">
        <Panel name="panel_baseInfo">
          基本信息
          <p slot="content">
            <businessForm
              :form-config="formConfig"
              @keyDown="keyDown"
            />
          </p>
        </Panel>
      </Collapse>
      <div class="customized-detail-table">
        <businessLabel
          :label-list="labelList"
          :label-default-value="labelDefaultValue"
        />
        <div class="subtablePart">
          <orderItem :component-data="subTableConfig" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import nationalProvincialMunicipalEdit from '@/js/pages/basicData/nationalProvincialMunicipalEdit.js';
export default nationalProvincialMunicipalEdit;
</script>

<style lang="less" scoped>
@import '~professionalComponents/common/css/theme.less';
.nationalProvincialMunicipalEdit {
  /deep/ .businessForm_a {
    .ark-row .ark-col {
      &:last-child {
        input.ark-input {
          border: none;
          width: 45px;
        }
      }
    }
  }
}
</style>

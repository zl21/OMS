<!--店仓评分设置表 新增/详情 -->
<template>
  <div class="auto-check storeScoreStrategy customized-detail">
    <div class="obj-btn">
      <OmsButton :btn-config="btnConfig" class="top-btns" />
    </div>
    <div class="obj-main">
      <Collapse v-model="collapse">
        <Panel name="baseInfo1">
          <!-- 基本信息 -->
          {{ $it('com.baseInformation') }}
          <div slot="content">
            <OmsForm :form-config="formConfig" />
          </div>
        </Panel>
        <Panel name="baseInfo2" v-if="ID !== '-1'">
          <!-- 基础信息 -->
          {{ $it('other.basic_info') }}
          <div slot="content">
            <OmsForm :form-config="formConfig2" />
          </div>
        </Panel>
      </Collapse>
    </div>
  </div>
</template>

<script>
import channelRatioStrategy from '@/js/pages/inventoryCenter/storeScoreStrategy/storeScoreStrategyAdd';

export default channelRatioStrategy;
</script>
<style lang="less">
@import "~@/css/pages/inventoryCenter/storeScoreStrategy.less";
</style>

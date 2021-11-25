<template>
  <div class="auto-check channelRatioStrategyAddOrEdit public-main" v-loading="loading">
    <WaterMark v-if="ID!=='-1'&& !isActive" :text="'已作废'"/>
    <div class="operate left">
      <OmsButton :btn-config="btnConfig"/>
    </div>
    <div class="public-content">
      <Collapse v-model="collapse">
        <Panel name="panel_baseInfo">
          基本信息
          <div slot="content">
            <OmsForm :form-config="formConfig1"/>
          </div>
        </Panel>
        <Panel name="share_baseInfo">
          共享库存
          <div slot="content">
            <OmsForm :form-config="formConfig3"/>
          </div>
        </Panel>
        <Panel name="exclusive_stock">
          独享库存
          <div slot="content">
            <OmsForm v-if="isActive|| ID==='-1'" ref="exclusiveStock" :form-config="formConfig2"/>
            <div class="flex flex-direction-row justify-content-space-between align-items-center mg-tp-10" v-if="this.canEdit  && this.ID !== '-1' ">
              <div class="flex flex-direction-row " >
                <a v-if="isActive" @click="addSubmit('-1')">【添加】</a>
                <a v-if="isActive" @click="importFun()">【导入】</a>
                <a @click="exportClick()">【导出】</a>
              </div>
              <div class="flex flex-direction-row align-items-center mg-bt-6">
                <Select v-model="exclusiveStockFilterValue" class="width-120" placeholder="查询条件" clearable>
                  <Option v-for="item in exclusiveStockFilterList" :value="item.value" :key="item.value">{{
                      item.label
                    }}
                  </Option>
                </Select>
                <el-input placeholder="请输入查询内容" v-model="exclusiveStockFilterInputValue"
                          class="input-with-search-style font-size-12 mg-lf-10"
                          size="mini">
                  <el-button slot="prepend" class="font-size-12" @click="getExclusiveStockData()">搜索</el-button>
                  <i slot="suffix" class="el-input__icon el-icon-search cursor-pointer"
                     @click="getExclusiveStockData()"></i>
                </el-input>
              </div>
            </div>
            <Table :height="exclusiveStockData.length>10?'500px':''" border ref="selection"
                   :columns="exclusiveStockColumns"
                   :data="exclusiveStockData" @on-selection-change="handleSelectionChange">
              <template slot-scope="{ row, index }" slot="switch">
                <i-switch v-if="canEdit" :value="row.ISACTIVE==='是'" @on-change="switchFun(row, index)">
                  <span slot="open">是</span>
                  <span slot="close">否</span>
                </i-switch>
                <span v-else>row.ISACTIVE</span>
              </template>
            </Table>
          </div>
        </Panel>
        <Panel name="operation_log" v-if="ID!=='-1'">
          操作日志
          <div slot="content">
            <Table :height="shareBaseInfoData.length>10?'500px':''" border :columns="shareBaseInfoColumns"
                   :data="shareBaseInfoData"></Table>
          </div>
        </Panel>
        <Panel name="log" v-if="ID!=='-1'">
          日志
          <div slot="content">
            <OmsForm :form-config="formConfig4"/>
          </div>
        </Panel>
      </Collapse>
    </div>

    <!-- 导入 -->
    <OmsDialog
      :title="importTable.confirmTitle"
      :title-align="importTable.titleAlign"
      :width="importTable.width"
      :scrollable="importTable.scrollable"
      :closable="importTable.closable"
      :draggable="importTable.draggable"
      :mask="importTable.mask"
      :mask-closable="importTable.maskClosable"
      :transfer="importTable.transfer"
      :name="importTable.name"
      :url="importTable.url"
      :keep-alive="importTable.keepAlive"
      :exclude-string="importTable.excludeString"
      :component-data="importTable.componentData"
    />
  </div>
</template>

<script>
import channelRatioStrategy from '@/js/pages/inventoryCenter/channelRatioStrategy';

export default channelRatioStrategy;
</script>
<style lang="less">
@import '~@/css/pages/inventoryCenter/channelRatioStrategy.less';
</style>

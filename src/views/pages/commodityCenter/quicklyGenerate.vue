<template>
  <div class="quicklyGenerate customized-detail">
    <div class="quick_header customized-detail-btn">
      <OmsButton :btn-config="btnConfig" />
    </div>
    <div class="quick_body customized-detail-main">
      <Tabs value="name1">
        <TabPane label="规格维度信息" name="name1">
          <div>
            <div class="query">
              规格维度信息:
              <Input v-model="searchTreeData" style="width: 200px" @on-enter="searchDimen" />
            </div>
            <div class="info">
              <div class="info_tree">
                <Tree ref="trees" show-checkbox :data="treeData" @on-check-change="onCheckChange" />
              </div>
              <div class="info_move">
                <span @click="toRight"><Icon type="ios-arrow-forward" /></span>
                <span @click="toLeft"><Icon type="ios-arrow-back" /></span>
              </div>
              <div class="info_table">
                <Table :columns="table.columns" :data="table.data" @on-selection-change="onSelectionChange" @on-column-click="onColumnClick" />
              </div>
            </div>
          </div>
        </TabPane>
      </Tabs>
    </div>
  </div>
</template>
<script>
import quicklyGenerate from '@/js/pages/commodityCenter/quicklyGenerate.js';
export default quicklyGenerate;
</script>

<style scoped lang='less' scoped>
@import '~@/css/pages/commodityCenter/quicklyGenerate.less';
</style>

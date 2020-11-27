<template>
  <div class="setWarehouseLogistics public-main">
    <businessButton :btn-config="btnConfig" />
    <div class="public-content">
      <div class="tableTop">
        <Collapse v-model="openDefault">
          <Panel name="1">
            <!-- 基本信息 -->
            {{ vmI18n.t("common.baseInformation") }}
            <p slot="content">
              <businessForm :form-config="information" />
            </p>
          </Panel>
        </Collapse>
      </div>
      <div
        v-if="this.$route.params.customizedModuleId !== 'New'"
        class="tableContent"
      >
        <!-- tab切换 -->
        <businessLabel
          class="jordanLabel"
          :label-list="labelList"
          :label-default-value="labelDefaultValue"
        />
        <div class="tableBox">
          <div class="tableLeft">
            <div class="retrieveBox">
              <!-- <span class="retrieveTitle">检索</span> -->
              <span class="retrieveTitle">{{ vmI18n.t('common.searching') }}</span>
              <Input
                v-model="name"
                class="retrieve"
                :expand="false"
                @on-enter="enter(name)"
              />
              <Icon
                slot="suffix"
                type="ios-search"
                @click="enter(name)"
              />
              </Input>
            </div>
            <Checkbox
              v-model="single"
              style="margin: 0 0 7px 32px;"
              @on-change="checkAll(single)"
            >
              <!-- 全选 -->
              {{ vmI18n.t('common.selectAll') }}
            </Checkbox>
            <div class="treeBox">
              <Tree
                id="tree"
                :data="treeData"
                :disabled="true"
                :query="query"
                show-checkbox
              />
            </div>
          </div>
          <div class="tableSynchronous">
            <Button
              class="btn1"
              size="small"
              @click="synchronous"
            >
              <!-- 市 -->
              {{ vmI18n.t('common.city') }}->
            </Button>
            <Button
              class="btn2"
              size="small"
              @click="provinceSynchronous"
            >
              <!-- 省 -->
              {{ vmI18n.t('common.province') }}->
            </Button>
          </div>
          <!-- table -->
          <div class="tableRight">
            <div class="all-table">
              <div
                id="conTop"
                class="conTop"
              >
                <div id="contenter">
                  <table id="fixedDiv">
                    <thead>
                      <tr>
                        <th style="min-width: 50px !important;">
                          <!-- 序号 -->
                          {{ vmI18n.t('table_label.serialNo') }}
                        </th>
                        <!-- <th>省</th> -->
                        <th>{{ vmI18n.t('common.province') }}</th>
                        <th v-if="cityThead">
                          <!-- 市 -->
                          {{ vmI18n.t('common.city') }}
                        </th>
                        <th
                          v-for="(item, index) in theadArr"
                          :key="index"
                        >
                          {{ item.name }}
                        </th>
                      </tr>
                    </thead>
                  </table>
                </div>
                <div
                  id="mainDiv"
                  class="list-table"
                  @scroll="paperScroll($event)"
                >
                  <table>
                    <thead style="display:none;">
                      <tr>
                        <th style="min-width: 50px !important;">
                          {{ vmI18n.t('table_label.serialNo') }}
                        </th>
                        <th>{{ vmI18n.t('common.province') }}</th>
                        <th v-if="cityThead">
                          {{ vmI18n.t('common.city') }}
                        </th>
                        <th
                          v-for="(item, index) in theadArr"
                          :key="index"
                        >
                          {{ item.name }}
                        </th>
                      </tr>
                    </thead>
                    <tbody class="table-content">
                      <tr
                        v-for="(data, index) of listArr"
                        :key="index"
                      >
                        <td style="min-width: 50px !important;">
                          {{ index+1 }}
                        </td>
                        <td>{{ data.CP_C_REGION_PROVINCE_ENAME }}</td>
                        <td v-if="cityThead">
                          {{ data.CP_C_REGION_CITY_ENAME }}
                        </td>
                        <td
                          v-for="(item, j) of data.LOGISTICS_RANK"
                          :key="j"
                          class="tdColor"
                        >
                          <Input
                            v-model="item.rank"
                            :placeholder="item.provDiffRank ? item.provDiffRank : ''"
                            :regx="/^[1-9]\d*$/"
                            @on-blur="inputBlur(data.LOGISTICS_RANK, item, j)"
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div
              v-show="tableLoading"
              class="fromLoading"
            >
              <Spin />
            </div>
          </div>
        </div>
      </div>
      <!--单据状态图片展示 -->
      <businessStatusFlag :status-name="statusName" />
    </div>
    <!-- 导入 -->
    <businessModal
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
    <!-- 导出 -->
    <Modal
      v-model="warningModal"
      :title="vmI18n.t('modalTitle.tips')"
      width="420"
      :mask="true"
      @on-ok="warningOk"
    >
      <!-- <p>是否确认导出？</p> -->
      <p>{{ vmI18n.t('modalTips.y2') }}</p>
    </Modal>
    <Modal
      v-model="saveModal"
      :title="vmI18n.t('modalTitle.tips')"
      width="420"
      :mask="true"
      @on-ok="saveOk"
    >
      <p>{{ saveModalText }}</p>
    </Modal>
    <!-- 修改物流公司-->
    <businessModal
      :title="modifyLogistics.confirmTitle"
      :title-align="modifyLogistics.titleAlign"
      :width="modifyLogistics.width"
      :scrollable="modifyLogistics.scrollable"
      :closable="modifyLogistics.closable"
      :draggable="modifyLogistics.draggable"
      :mask="modifyLogistics.mask"
      :mask-closable="modifyLogistics.maskClosable"
      :transfer="modifyLogistics.transfer"
      :name="modifyLogistics.name"
      :url="modifyLogistics.url"
      :keep-alive="modifyLogistics.keepAlive"
      :exclude-string="modifyLogistics.excludeString"
      :component-data="modifyLogistics.componentData"
    />
    <div
      v-show="isSaveLoading"
      class="fromLoading"
    >
      <Spin />
    </div>
  </div>
</template>

<script>
  import setWarehouseLogistics from '@/js/pages/strategyPlatform/setWarehouseLogistics/setWarehouseLogistics';

  export default setWarehouseLogistics;
</script>


<style lang="less">
@import '~@/css/pages/strategyPlatform/setWarehouseLogistics/setWarehouseLogistics.less';
</style>

<template>
  <div class="logisticsArea public-main">
    <businessButton :btn-config="btnConfig" />
    <div class="public-content">
      <div class="tableTop">
        <Collapse v-model="openDefault">
          <Panel name="1">
            <!-- 基本信息 -->
            {{ vmI18n.t('common.baseInformation') }}
            <p slot="content">
              <businessForm :form-config="information" />
            </p>
          </Panel>
        </Collapse>
      </div>
      <div
        v-if="this.$route.params.customizedModuleId !== 'New'"
        class="salesTable"
      >
        <!-- tab切换 -->
        <businessLabel
          :label-default-value="labelDefaultValue"
          :label-list="labelList"
          class="jordanLabel"
        />
        <!-- tree -->
        <div class="tableBox">
          <div class="tableLeft">
            <div class="retrieveBox">
              <!-- <span class="retrieveTitle">检索</span> -->
              <span class="retrieveTitle">{{ vmI18n.t('common.searching') }}</span>
              <Input
                v-model="name"
                :expand="false"
                class="retrieve"
                @on-enter="enter(name)"
              />
              <Icon
                slot="suffix"
                type="ios-search"
                @click="enter(name)"
              />
              </Input>
            </div>
            <div class="treeBox">
              <Tree
                id="tree"
                :data="treeData1"
                :disabled="true"
                :query="query"
                show-checkbox
                @on-select-change="selectChange"
              />
            </div>
          </div>
          <div class="tableRight">
            <div class="setTree">
              <div class="retrieveBox">
                <!-- <span class="retrieveTitle">检索</span> -->
                <span class="retrieveTitle">{{ vmI18n.t('common.searching') }}</span>
                <Input
                  v-model="name2"
                  :expand="false"
                  class="retrieve"
                  @on-enter="enter2(name2)"
                />
                <Icon
                  slot="suffix"
                  type="ios-search"
                  @click="enter2(name2)"
                />
                </Input>
              </div>
              <Checkbox
                v-model="single"
                style="margin: 0 0 7px 32px"
                @on-change="checkAll(single)"
              >
                <!-- 全选 -->
                {{ vmI18n.t('common.selectAll') }}
              </Checkbox>
              <div class="treeBox2">
                <Tree
                  id="tree2"
                  :data="treeData2"
                  :query="query2"
                  show-checkbox
                  @on-select-change="selectChange"
                  @on-toggle-expand="toggleExpand"
                />
              </div>
            </div>
            <div class="synchronous">
              <div class="iconButton">
                <Button
                  size="small"
                  @click="synchronous"
                >
                  >>
                </Button>
              </div>
            </div>

            <div class="actionPermissionsTable">
              <div class="scrollThead">
                <table>
                  <thead>
                    <tr>
                      <th
                        class="paddingleft18"
                        style="width: 18%"
                      >
                        <!-- 省 -->
                        {{ vmI18n.t('common.province') }}
                      </th>
                      <th style="width: 18%">
                        <!-- 市 -->
                        {{ vmI18n.t('common.city') }}
                      </th>
                      <th style="width: 18%">
                        <!-- 区 -->
                        {{ vmI18n.t('common.region') }}
                      </th>
                      <th style="width: 19%">
                        <!-- 排除区域 -->
                        {{ vmI18n.t('common.exclude_region') }}
                      </th>
                      <th style="width: 19%">
                        <input
                          v-model="isDelivery"
                          type="checkbox"
                          @change="handleAllChange(isDelivery)"
                        >
                        <!-- 是否送达 -->
                        {{ vmI18n.t('common.delivered_or_not') }}
                      </th>
                    </tr>
                  </thead>
                </table>
              </div>
              <div class="scrollTable">
                <table>
                  <tbody>
                    <tr
                      v-for="(item, index) in dataArr"
                      :key="index"
                    >
                      <td
                        class="paddingleft18"
                        style="width: 18%"
                      >
                        {{ item.CP_C_REGION_PROVINCE_ENAME }}
                      </td>
                      <td style="width: 18%">
                        {{ item.CP_C_REGION_CITY_ENAME }}
                      </td>
                      <td style="width: 18%">
                        {{ item.CP_C_REGION_AREA_ENAME }}
                      </td>
                      <td style="width: 19%">
                        <input
                          v-model="item.EXCLUSION_AREA"
                          class="borderInput"
                          type="text"
                        >
                      </td>
                      <td style="width: 19%">
                        <input
                          v-model="item.IS_ARRIVE"
                          type="checkbox"
                          @change="isDeliveryChange()"
                        >
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <!-- 弹框 -->
            <loading :loading="tableLoading" />
          </div>
        </div>
      </div>
      <!--单据状态图片展示 -->
      <businessStatusFlag :status-name="statusName" />
    </div>
    <!-- 导入 -->
    <businessModal
      :closable="importTable.closable"
      :component-data="importTable.componentData"
      :draggable="importTable.draggable"
      :exclude-string="importTable.excludeString"
      :keep-alive="importTable.keepAlive"
      :mask="importTable.mask"
      :mask-closable="importTable.maskClosable"
      :name="importTable.name"
      :scrollable="importTable.scrollable"
      :title="importTable.confirmTitle"
      :title-align="importTable.titleAlign"
      :transfer="importTable.transfer"
      :url="importTable.url"
      :width="importTable.width"
    />
    <!-- 导出 -->
    <Modal
      v-model="warningModal"
      :mask="true"
      :title="vmI18n.t('modalTitle.tips')"
      width="420"
      @on-ok="warningOk"
    >
      <!-- <p>是否确认导出？</p> -->
      <p>{{ vmI18n.t('modalTips.y2') }}</p>
    </Modal>
    <!-- 弹框 -->
    <loading :loading="isSaveLoading" />
  </div>
</template>

<script>
  import logisticsArea from '@/js/pages/strategyPlatform/logisticsStrategy/logisticsArea';

  export default logisticsArea;
</script>


<style lang="less">
@import '~@/css/pages/strategyPlatform/logisticsStrategy/logisticsArea.less';
</style>

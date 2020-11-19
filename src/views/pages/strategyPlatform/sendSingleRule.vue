<template>
  <div class="sendSingleRule">
    <businessButton
      :btn-config="btnConfig"
    />
    <Collapse v-model="openDefault">
      <Panel name="1">
        基本信息
        <p slot="content">
          <businessForm :form-config="information" />
        </p>
      </Panel>
    </Collapse>
    <div
      v-if="$route.params.customizedModuleId !== 'New'"
      v-loading="contentLoading"
      class="tableContent"
    >
      <!-- tab切换 -->
      <business-label
        class="jordanLabel"
        :label-list="labelList"
        :label-default-value="labelDefaultValue"
      />
      <business-action-table
        v-if="showFlag"
        :jordan-table-config="jordanTableConfig"
        @on-select="OnSelect"
        @on-select-cancel="Cancel"
        @on-select-all="SelectAll"
        @on-select-all-cancel="SelectAllCancel"
        @table-delete-detail="DeleteDetail"
        @table-import="tableImport"
        @table-export="tableExport"
      />
      <div
        v-if="!showFlag"
        class="tableBox"
      >
        <div class="tableLeft">
          <div class="retrieveBox">
            <span class="retrieveTitle">检索</span>
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
            全选
          </Checkbox>
          <div class="treeBox">
            <Tree
              id="tree"
              :data="treeData"
              :disabled="true"
              :query="query"
              show-checkbox
            />
            <div
              v-show="treeLoading"
              class="fromLoading"
            >
              <Spin />
            </div>
          </div>
        </div>
        <div class="tableSynchronous">
          <Button
            size="small"
            @click="synchronous"
          >
            >>
          </Button>
        </div>
        <!-- table -->
        <div class="tableRight">
          <div class="all-table">
            <div
              v-if="information.formValue.ETYPE === '1'"
              id="conTop"
              class="conTop"
            >
              <div id="contenter">
                <table id="fixedDiv">
                  <thead>
                    <tr>
                      <th style="min-width: 40px !important;">
                        序号
                      </th>
                      <th
                        style="min-width: 140px !important;"
                      >
                        {{ information.formValue.ETYPE === '1' ? '省' : '唯品会仓库' }}
                      </th>
                      <th
                        v-for="(item, index) in theadArr"
                        :key="index"
                        style="min-width: 140px !important;"
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
                      <th style="min-width: 40px !important;">
                        序号
                      </th>
                      <th
                        style="min-width: 140px !important;"
                      >
                        {{ information.formValue.ETYPE === '1' ? '省' : '唯品会仓库' }}
                      </th>
                      <th
                        v-for="(item, index) in theadArr"
                        :key="index"
                        style="min-width: 140px !important;"
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
                      <td style="min-width: 40px !important;">
                        {{ index+1 }}
                      </td>
                      <td
                        style="min-width: 140px !important;"
                      >
                        {{ information.formValue.ETYPE === '1' ? data.CP_C_REGION_PROVINCE_ENAME : data.CP_C_VIPCOM_WAHOUSE_WAREHOUSE_NAME }}
                      </td>
                      <td
                        v-for="(item, j) of data.WAREHOUSE_RANK"
                        :key="j"
                        style="min-width: 140px !important;"
                        class="tdColor"
                      >
                        <Input
                          v-model="item.rank"
                          placeholder
                          :regx="/^[1-9]\d*$/"
                          @on-blur="inputBlur(data.WAREHOUSE_RANK, item, j)"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div
              v-else
              id="conTop"
              class="conTop"
            >
              <div id="contenter">
                <table id="fixedDiv">
                  <thead>
                    <tr>
                      <th style="min-width: 40px !important;">
                        序号
                      </th>
                      <th style="min-width: 140px !important;">
                        唯品会仓库
                      </th>
                      <th
                        v-for="(item, index) in listArr"
                        :key="index"
                        style="min-width: 140px !important;"
                      >
                        {{ item.CP_C_VIPCOM_WAHOUSE_WAREHOUSE_NAME }}
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
                      <th style="min-width: 40px !important;">
                        序号
                      </th>
                      <th style="min-width: 140px !important;">
                        唯品会仓库
                      </th>
                      <th
                        v-for="(item, index) in listArr"
                        :key="index"
                        style="min-width: 140px !important;"
                      >
                        {{ item.CP_C_VIPCOM_WAHOUSE_WAREHOUSE_NAME }}
                      </th>
                    </tr>
                  </thead>
                  <tbody class="table-content">
                    <tr
                      v-for="(data , index) of theadArr"
                      :key="index"
                    >
                      <td style="min-width: 40px !important;">
                        {{ index+1 }}
                      </td>
                      <td style="min-width: 140px !important;">
                        {{ data.name }}
                      </td>
                      <td
                        v-for="(item, j) of listArr"
                        :key="j"
                        style="min-width: 140px !important;"
                        class="tdColor"
                      >
                        <Input
                          v-model="item.WAREHOUSE_RANK[index].rank"
                          placeholder
                          :regx="/^[1-9]\d*$/"
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
    <!-- 修改仓库-->
    <businessDialog
      :title="modifyWarehouse.confirmTitle"
      :title-align="modifyWarehouse.titleAlign"
      :width="modifyWarehouse.width"
      :scrollable="modifyWarehouse.scrollable"
      :closable="modifyWarehouse.closable"
      :draggable="modifyWarehouse.draggable"
      :mask="modifyWarehouse.mask"
      :mask-closable="modifyWarehouse.maskClosable"
      :transfer="modifyWarehouse.transfer"
      :name="modifyWarehouse.name"
      :url="modifyWarehouse.url"
      :keep-alive="modifyWarehouse.keepAlive"
      :exclude-string="modifyWarehouse.excludeString"
      :component-data="modifyWarehouse.componentData"
    />
    <!-- 导入 -->
    <businessDialog
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
    <!-- <Modal v-model="warningModal" title="提示" width="420" @on-ok="warningOk" :mask="true">
      <p>是否确认导出？</p>
    </Modal>-->
    <!--单据状态图片展示 -->
    <businessStatusFlag :status-name="statusName" />
    <div
      v-show="saveLoading"
      class="fromLoading"
    >
      <Spin />
    </div>
  </div>
</template>

<script>
import sendSingleRule from '@/js/pages/strategyPlatform/sendSingleRule';

export default sendSingleRule;
</script>

<style lang="less">
@import '~@/css/pages/strategyPlatform/sendSingleRule.less';
</style>

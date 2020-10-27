<template>
  <div class="setWarehouseLogistics">
    <div class="tableTop">
      <businessButton :btn-config="btnConfig" />
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
      v-if="this.$route.query.id !== '-1'"
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
    <!--单据状态图片展示 -->
    <businessStatusFlag :status-name="statusName" />
    <div
      v-show="isSaveLoading"
      class="fromLoading"
    >
      <Spin />
    </div>
  </div>
</template>

<script>
  import setWarehouseLogistics from "@/js/pages/strategyPlatform/setWarehouseLogistics/setWarehouseLogistics.js";
  export default setWarehouseLogistics;
</script>


<style lang="less">
@import "~professionalComponents/common/css/theme.less";
@import "~@burgeon/oms-theme/skin/public.less";
.setWarehouseLogistics {
  position: relative;
  padding-top: 8px;
  .tableContent {
    .tableBox {
      display: flex;
      .tableLeft {
        width: 20%;
        height: 100%;
        min-height: 400px;
        margin: 20px 20px 10px;
        border: 1px solid #d3d3d3;
        overflow: hidden;
        .retrieveBox {
          text-align: center;
          margin: 20px 0;
          font-size: 0;
          width: 100%;
          .retrieveTitle {
            display: inline-block;
            vertical-align: middle;
            background: #ddd;
            width: 36px;
            height: 23px;
            line-height: 23px;
            font-size: 14px;
          }
          .retrieve {
            width: 60%;
            display: inline-block;
          }
        }
        .treeBox {
          height: 90%;
          padding: 0 10px;
          overflow: scroll;
          #tree {
            .iconbj_on:before {
              content: "\ea03";
            }
          }
        }
      }
      .tableSynchronous {
        width: 24px;
        height: 100%;
        min-height: 500px;
        margin-right: 15px;
        position: relative;
        .btn1 {
          border-color: @base-color;
          color: @base-color;
          position: absolute;
          top: 50%;
          left: 50%;
          margin: -12px 0 0 -20px;
          span {
            vertical-align: top !important;
          }
        }
        .btn2 {
          border-color: @base-color;
          color: @base-color;
          position: absolute;
          top: 50%;
          left: 50%;
          margin: 25px 0 0 -20px;
          span {
            vertical-align: top !important;
          }
        }
      }
      .tableRight {
        position: relative;
        width: 75%;
        height: 100%;
        overflow: hidden;
        margin-top: 20px;
        border: 1px solid #d3d3d3;
        .all-table {
          width: 100%;
        }
        .conTop {
          overflow: hidden;
        }
        .list-table {
          // width: 100%;
          height: 500px;
          overflow: hidden;
          overflow: auto;
          input {
            height: 23px !important;
            padding: 0 10px;
            border: none;
          }
        }
        table {
          width: 100%;
          border-collapse: collapse;
        }
        th {
          text-align: left;
          background-color: #eeeff0 !important;
          font-weight: normal;
          span {
            font-size: 14px;
          }
        }
        th,
        td {
          min-width: 150px;
          height: 23px;
          line-height: 23px;
          white-space: nowrap;
          box-sizing: content-box;
          background-color: #fff;
          border: 1px solid #eeeff0;
          padding: 0 10px;
          text-align: left;
          overflow: hidden;
          text-overflow: ellipsis;
          word-break: break-all;
        }
        #contenter {
          z-index: 1000;
          position: relative;
          margin: auto;
          background-color: white;
        }
        #fixedDiv {
          position: absolute;
          left: 0;
          overflow: hidden;
        }
        #mainDiv {
          margin-top: 24px;
          overflow: auto;
          // overflow-x: hidden;
        }
        .fromLoading {
          position: absolute;
          top: 0;
          right: 0;
          left: 0;
          bottom: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: rgba(255, 255, 255, 0.9);
          z-index: 1000 !important;
        }
      }
    }
  }
  .fromLoading {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(255, 255, 255, 0.9);
    z-index: 1000 !important;
  }
}
</style>

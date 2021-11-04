<template>
  <!-- 出库通知单==>生成出库拣货单==>出库拣货单 -->
  <!-- 出库拣货单 -->
  <div class="outboundPickOrder">
    <div class="watermark">
      <!-- 
      <img
        :src="watermark_src"
        alt
      >
     -->  
      <businessStatusFlag :status-name="statusName" />
    </div>
    <Tabs
      :value="tab"
      @on-click="onclick"
    >
      <!-- 扫描出库 -->
      <TabPane
        label="扫描出库"
        name="tab1"
      >
        <buttons :btn-config="scanOutbound.btnConfig" />
        <!-- 操作模块 -->
        <div class="operationMoudle">
          <div class="card1">
            <div class="title">
              <i />扫描作业
            </div>
            <div class="content">
              <div class="form">
                <!-- <div class="form1">
                                    <label>单据扫描</label>
                                    <input type="text" >
                </div>-->
                <div class="form2">
                  <label>商品扫描 :</label>
                  <input
                    ref="proScanText"
                    v-model="scanOutbound.scanWork.scanProduce"
                    type="text"
                    @keyup.enter="scanPro"
                  >
                </div>
                <div class="form3">
                  <label>扫描数量 :</label>
                  <div class="radio">
                    <input
                      v-model="scanOutbound.scanWork.scanNum"
                      class="num"
                      type="number"
                      min="0"
                      @input="initScanNum"
                    >

                    <input
                      id="add"
                      type="radio"
                      name="s"
                      checked
                      @change="radioChange('add')"
                    >
                    <label for="add">扫描</label>
                    <input
                      id="sub"
                      type="radio"
                      name="s"
                      @change="radioChange('sub')"
                    >
                    <label for="sub">反冲</label>
                  </div>
                </div>
                <div class="form4">
                  <label>提示信息 :</label>
                  <textarea
                    id
                    v-model="scanOutbound.scanWork.message"
                    style="text-align:center;line-height:38px;"
                    name
                    cols="20"
                    rows="1"
                    disabled
                    placeholder="提示信息"
                  />
                </div>
                <div class="form5">
                  <label class="checkbox">
                    部分出库 :
                    <input
                      v-model="scanOutbound.scanWork.isAllowPart"
                      type="checkbox"
                    ></label>
                </div>
              </div>
              <div class="img">
                <img
                  :src="IMAGE"
                  alt
                >
              </div>
            </div>
          </div>

          <div class="card2">
            <div class="title">
              <i />作业实时动态
            </div>
            <div class="content">
              <div class="RTK">
                <div class="text">
                  总数 :
                </div>
                <div class="num">
                  {{ scanOutbound.workRTK.total }}
                </div>
              </div>
              <div class="RTK">
                <div class="text">
                  未扫描数 :
                </div>
                <div class="num">
                  {{ scanOutbound.workRTK.unscanCount }}
                </div>
              </div>
              <div class="RTK">
                <div class="text">
                  已扫描数 :
                </div>
                <div class="num">
                  {{ scanOutbound.workRTK.scanCount }}
                </div>
              </div>
              <div class="RTK">
                <div class="text">
                  已装箱数 :
                </div>
                <div class="num">
                  {{ scanOutbound.boxs.length }}
                </div>
              </div>
            </div>
          </div>

          <div class="card3">
            <div class="title">
              <i />基础信息
            </div>
            <div class="content">
              <div class="RTK">
                <div class="text">
                  拣货单号 :
                </div>
                <div class="num">
                  {{ scanOutbound.baseInfo.BILL_NO }}
                </div>
              </div>
              <div class="RTK">
                <div class="text">
                  单据日期 :
                </div>
                <div class="num">
                  {{ toDate(scanOutbound.baseInfo.BILL_DATE) }}
                </div>
              </div>
              <div class="RTK">
                <div class="text">
                  发货方 :
                </div>
                <div class="num">
                  {{ scanOutbound.baseInfo.CP_C_ORIG_ENAME }}
                </div>
              </div>
              <div class="RTK">
                <div class="text">
                  收货方 :
                </div>
                <div class="num">
                  {{ scanOutbound.baseInfo.CP_C_DEST_ENAME }}
                </div>
              </div>
              <div class="RTK">
                <div class="text">
                  备注
                </div>
                <div class="num">
                  {{ scanOutbound.baseInfo.REMARK }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 扫描明细 -->
        <div class="scanItem">
          <div class="boxs">
            <div class="boxNo">
              箱号
            </div>
            <div
              v-for="(item,index) in scanOutbound.boxs"
              :key="index"
              class="childsBox"
              :class="item.id == isActive?'currentBoxStyle':''"
              @click="currentBox(index)"
            >
              {{ item.boxName }}
              <Icon
                type="ios-remove-circle-outline"
                @click.stop="subBox(index)"
              />
            </div>
            <div
              class="addBox"
              @click="addBox"
            >
              新增箱
            </div>
          </div>
          <div class="scanTable">
            <Atable
              :jordan-table-config="scanOutbound.jordanTableConfig"
              @table-delete-detail="tableDeleteDetail"
              @table-import="tableImport"
              @on-select="onSelect"
              @on-select-cancel="onSelectCancel"
              @on-select-all="onSelectAll"
              @on-select-all-cancel="onSelectAllCancel"
            />
          </div>
        </div>
      </TabPane>
      <!-- 拣货单 -->
      <TabPane
        label="拣货单"
        name="tab2"
      >
        <div class="orderButton">
          <buttons :btn-config="pickOrder.btnConfig" />
        </div>
        <Collapse v-model="pickOrder.value1">
          <Panel name="1">
            <!-- 基本信息 -->
            {{ vmI18n.t("common.baseInformation") }}
            <p slot="content">
              <Aform :form-config="pickOrder.formConfig" />
            </p>
          </Panel>
        </Collapse>
        <div class="tableTab">
          <Tabs
            v-model="pickOrder.tableTab"
            :animated="false"
            @on-click="onTableTab"
          >
            <TabPane
              label="拣货明细"
              name="pickDetail"
            >
              <Atable :jordan-table-config="pickOrder.pickDetail" />
            </TabPane>
            <TabPane
              label="来源出库通知单"
              name="sourceNotification"
            >
              <Atable :jordan-table-config="pickOrder.sourceNotification" />
            </TabPane>
            <TabPane
              label="装箱明细"
              name="binningDetail"
            >
              <Atable :jordan-table-config="pickOrder.binningDetail" />
            </TabPane>
            <TabPane
              label="来源出库结果单"
              name="entryNotice"
            >
              <Atable :jordan-table-config="pickOrder.entryNotice" />
            </TabPane>
            <TabPane
              label="日志信息"
              name="logInfo"
            >
              <Aform :form-config="pickOrder.logFormConfig" />
            </TabPane>
          </Tabs>
        </div>
      </TabPane>
    </Tabs>

    <!-- 未扫描商品 -->
    <Modal
      v-model="notScanModal.modal1"
      title="未扫描商品"
      :mask="notScanModal.mask"
      :footer-hide="notScanModal.footerHide"
      :closable="true"
      width="800"
      @on-keydown="notScanKeyDown"
    >
      <Atable :jordan-table-config="notScanData" />
    </Modal>
    <!-- 删除箱警告提示框 -->
    <Modal
      v-model="scanOutbound.modal2"
      title
      @on-ok="ok"
    >
      <p>确认执行删除箱?</p>
    </Modal>
    <!-- 清空提示 -->
    <Modal
      v-model="clean"
      title
      @on-ok="ok_clean"
    >
      <p>确认清空?</p>
    </Modal>
    <!-- 返回提示 -->
    <Modal
      v-model="go_home"
      title
      @on-ok="ok_home"
    >
      <p>返回将不会保留你修改的内容,确定返回吗?</p>
    </Modal>
    <Modal
      v-model="scanOutbound.warnModal"
      title="错误提示"
      @on-keydown="warnKeyDown"
    >
      <p>{{ scanOutbound.warnMessage }}</p>
    </Modal>
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
    <!-- 提示音 -->
    <audio id="fm01">
      <!-- <source src="./MP3/fm01.mp3" type="audio/ogg"> -->
      您的浏览器不支持 audio 与元素。
    </audio>
    <audio id="error01">
      <!-- <source src="./MP3/error01.mp3" type="audio/ogg"> -->
      您的浏览器不支持 audio 与元素。
    </audio>
  </div>
</template>

<script>
  import outboundPickOrder from '@/js/pages/orderCenter/scanIn/outboundPickOrder';

  export default outboundPickOrder;
</script>

<style lang="less">
@import "~@/css/pages/orderCenter/scanIn/outboundPickOrder.less";
</style>

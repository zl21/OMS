<template>
  <div class="auto-check  height-percent-100 relative channelStockControl">
    <div class="flex flex-direction-row height-percent-100 pd-tp-15 relative pd-bt-10">
      <!--      <Spin size="large" fix v-if="leftLoading || !leftCheckValue"></Spin>-->
      <!-- 平台店铺选择区(渠道仓选择) -->
      <div class="width-200 mg-rt-15 br-d3d3d3 height-percent-100  pd-lf-10 pd-rt-10 pd-tp-40 relative">
        <div class="absolute top-0 left-0 pd-tp-10 pd-lf-10 pd-rt-10">
          <el-input placeholder="请输入内容" v-model="leftSearch" size="mini" clearable
                    @keyup.enter.native="getLeftList(true)"
                    @clear="getLeftList(true)"
          >
            <el-button slot="append" icon="el-icon-search" @click="getLeftList(true)"></el-button>
          </el-input>
        </div>
        <div class="width-percent-100   height-percent-100  overflow-y-auto ">
          <Scroll :on-reach-bottom="handleReachBottom" :height="windowHeight - 150">
            <RadioGroup v-model="leftCheckValue" v-if="leftShopList.length" @on-change="leftCheckChangeFun">
              <div class="mg-bt-10" v-for="(item, index) in leftShopList"
                   :key="index">
                <Radio :label="item.id">{{ item.cpCShopEname }}</Radio>
              </div>
            </RadioGroup>
            <div v-else class="fs-12 color-999 text-center line-height-30">
              {{$it('other.noDataAvailable')}}
              <!--暂无数据-->
            </div>
          </Scroll>


        </div>
      </div>
      <div class="flex-1  overflow-y-auto ">
        <template>
          <!--平台商品查询条件区域-->
          <div class="br-d3d3d3 pd-tp-10">
            <action-form
                ref="actionFormFilter"
                :form-items="formConfig1.formData"
                :form="formConfig1.formValue"
                :span="6"
            />
          </div>
          <OmsButton :btn-config="btnConfig2" class="top-btns"/>
          <!--<OmsButton :btn-config="btnConfig" class="top-btns"/>-->
          <!--库存查询与选择区-->
          <div class="pd-rt-5">
            <div class="relative" v-loading="table1Loading">
              <arkCommonTableByAgGrid
                  class="br-d3d3d3"
                  ref="agGrid"
                  height="300px"
                  :columns="agTableConfig.columnDefs"
                  :data="agTableConfig.rowData"
                  :height="tableHeight"
                  :renderParams="agTableConfig.renderParams"
                  @on-selection-change="handleSelectionChange"
                  @grid-ready="onGridReady"
                  :options="{getContextMenuItems: getContextMenuItemsFun}"
                  @on-column-moved="columnmovedFun"
                  @on-row-click="tableRowClick"
              ></arkCommonTableByAgGrid>
            </div>
            <!--<Table ref="selectionTable" class="mg-tp-15" border :loading="table1Loading" multiple
                   :row-class-name="rowClassName"
                   @on-sort-change="sortChange"
                   :columns="columns1"
                   :data="data1"
                   :height="tableHeight"
                   @on-row-click="tableRowClick"
                   @on-selection-change="handleSelectionChange"
                   :totalData="tableTotal"
            >
              <template slot-scope="{ row, index }" slot="switch">
                <span>{{ row.istrans === 'Y' ? '是' : '否' }}</span>
                &lt;!&ndash;<i-switch value="row.istrans === 'Y'" @on-change="">
                  <span slot="open">开</span>
                  <span slot="close">关</span>
                </i-switch>&ndash;&gt;
              </template>
              <template slot-scope="{ row, index }" slot="islock">
                &lt;!&ndash; 这个后端让取反&ndash;&gt;
                <span>{{ row.islock === 'Y' ? '否' : '是' }}</span>
              </template>
            </Table>-->
            <div class="pd-tp-10">
              <Page :total="page1.total" show-total
                    :current="page1.current"
                    :page-size="page1.pageSize"
                    :page-size-opts="page1.pageSizeOpts"
                    size="small"
                    show-elevator show-sizer
                    class-name=" flex flex-direction-row align-items-center justify-content-center"
                    :transfer="true"
                    @on-change="pageChange1"
                    @on-page-size-change="pageSizeChange1"
              />
            </div>
          </div>
          <!--库存来源配置区-->
          <Collapse v-model="collapseShow" class="mg-tp-15">
            <Panel name="1">
              配销仓
              <div slot="content" class="">
                <Table class="" border :columns="columns2" :data="data2" :loading="table2Loading"></Table>
                <div class="pd-tp-10">
                  <Page :total="page2.total" show-total
                        :current="page2.current"
                        :page-size="page2.pageSize"
                        :page-size-opts="page2.pageSizeOpts"
                        size="small"
                        show-elevator show-sizer
                        class-name=" flex flex-direction-row align-items-center justify-content-center"
                        :transfer="true"
                        @on-change="pageChange2"
                        @on-page-size-change="pageSizeChange2"
                  />
                </div>
              </div>
            </Panel>
            <Panel name="2">
              共享池
              <div slot="content" class="">
                <Table border :columns="columns3" :data="data3"></Table>
              </div>
            </Panel>
          </Collapse>
          <!--<div class="br-d3d3d3 mg-tp-15 pd-10">
            <div>
              <Table class="" border :columns="columns2" :data="data2" :loading="table2Loading"></Table>
              <div class="pd-tp-10">
                <Page :total="page2.total"
                      :current="page2.current"
                      :page-size="page2.pageSize"
                      :page-size-opts="page2.pageSizeOpts"
                      size="small"
                      show-elevator show-sizer
                      class-name=" flex flex-direction-row align-items-center justify-content-center"
                      :transfer="true"
                      @on-change="pageChange2"
                      @on-page-size-change="pageSizeChange2"
                />
              </div>
            </div>
            <Table class="mg-tp-10" border :columns="columns3" :data="data3"></Table>
          </div>-->
        </template>
      </div>
    </div>
    <!--停止/开启平台库存同步-->
    <el-dialog :title="$it('mT.ak')" :visible.sync="dialogObj1.show" width="500px">
      <Form ref="formCustom4" :model="dialogObj1.formData" :label-width="155">
        <FormItem :label="`${$it('btn.a9')}:`" prop="qty">
          <!-- 这个后端让取反-->
          <Select v-model="dialogObj1.formData.islock" clearable style="width:200px">
            <Option value="Y">{{$it('com.no')}}</Option> <!--否-->
            <Option value="N">{{$it('com.yes')}}</Option> <!--是-->
          </Select>
        </FormItem>
      </Form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogObj1.show = false">{{$it('com.cancel')}}<!--取 消--></el-button>
        <el-button type="primary" :disabled="!dialogObj1.formData.islock" :loading="dialogObj1.loading"
                   @click="saveDevOpsInfoFun({islock:dialogObj1.formData.islock},'dialogObj1',true)">{{$it('com.determine')}}<!--确 定-->
        </el-button>
      </div>
    </el-dialog>

    <!--是否转仓-->
    <el-dialog :title="$it('btn.aa')" :visible.sync="dialogObj2.show" width="500px">
      <Form ref="formCustom3" :model="dialogObj2.formData" :label-width="155">
        <FormItem :label="`${$it('btn.aa')}:`" prop="qty">
          <Select v-model="dialogObj2.formData.istrans" clearable style="width:200px">
            <Option value="Y">{{$it('com.yes')}}</Option>
            <Option value="N">{{$it('com.no')}}</Option>
          </Select>
        </FormItem>
      </Form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogObj2.show = false">{{$it('com.cancel')}}<!--取 消--></el-button>
        <el-button type="primary" :disabled="!dialogObj2.formData.istrans" :loading="dialogObj2.loading"
                   @click="saveDevOpsInfoFun({istrans:dialogObj2.formData.istrans},'dialogObj2',true)">{{$it('com.determine')}}<!--确 定-->
        </el-button>
      </div>
    </el-dialog>

    <!--设定安全库存-->
    <el-dialog :title="$it('btn.a7')" :visible.sync="dialogObj3.show" width="500px">
      <Form ref="formCustom2" :model="dialogObj3.formData" :label-width="155">
        <FormItem :label="`${$it('btn.a7')}:`" prop="qty">
          <Input v-model="dialogObj3.formData.qtySafety" clearable :regx="/^[0-9]*$/" style="width: 200px"/>
        </FormItem>
      </Form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogObj3.show = false">{{$it('com.cancel')}}<!--取 消--></el-button>
        <el-button type="primary" :disabled="!dialogObj3.formData.qtySafety" :loading="dialogObj3.loading"
                   @click="saveDevOpsInfoFun({qtySafety:dialogObj3.formData.qtySafety},'dialogObj3')">{{$it('com.determine')}}<!--确 定-->
        </el-button>
      </div>
    </el-dialog>

    <!-- 调入库存 -->
    <el-dialog :title="$it('btn.a8')" :visible.sync="showTransferInventory" width="500px">
      <Form ref="formCustom" :model="transferInventoryForm" :rules="ruleCustom" :label-width="155"
            v-if="rightTableCurrRowData && rightTable2CurrRowData">
        <!-- 商家条码id -->
        <FormItem :label="`${$it('pL.bb')}:`">{{ rightTableCurrRowData.psCSkuId }}</FormItem>
        <!-- 来源聚合仓名称 -->
        <FormItem :label="`${$it('pL.bc')}:`">{{ rightTable2CurrRowData.sgCShareStoreEname }}</FormItem>
        <!-- 来源配销仓名称 -->
        <FormItem :label="`${$it('pL.bi')}:`">{{ rightTableCurrRowData.cpCShopEname }}</FormItem>
        <!-- 调入量 -->
        <FormItem :label="`${$it('pL.bd')}:`" prop="qty">
          <Input type="text" v-model="transferInventoryForm.qty" :regx="/^[0-9]*$/" clearable
                 style="width: 225px"></Input>
        </FormItem>
      </Form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showTransferInventory = false">{{$it('com.cancel')}}<!--取 消--></el-button>
        <el-button type="primary" @click="transferInventoryFun">{{$it('com.determine')}}<!--确 定--></el-button>
      </div>
    </el-dialog>

    <!--下载平台商品 (需要传时间的目前只有唯品会)-->
    <el-dialog :title="downDialogObjTittle" width="500px" :visible.sync="downDialogObjShow">
      <FormLayout :defaultColumn="1" ref="downDialogForm"
                  :defaultconfig="downConfig">
        <div slot="shopSlot">
          <div class="clearfix line-height-33">
            <div class="pull-left width-120 pd-rt-6 text-right">{{$it('other.shop')}}：</div><!--店铺-->
            <div class="pull-left">{{ leftCheckData.cpCShopEname }}</div>
          </div>
        </div>
      </FormLayout>
      <div slot="footer" class="dialog-footer">
        <el-button @click="downDialogObjShow = false">{{$it('com.cancel')}}<!--取 消--></el-button>
        <el-button type="primary" @click="downDialogSubmit()"> {{$it('btn.download')}}<!--下 载--></el-button>
      </div>
    </el-dialog>

    <!--下载平台库存-->
    <el-dialog :title="$it('btn.a4')" width="500px" :visible.sync="downDialogObjShow2">
      <FormLayout :defaultColumn="1" ref="downDialogForm2"
                  :defaultconfig="downConfig2">
        <div slot="shopSlot">
          <div class="clearfix line-height-33">
            <div class="pull-left width-120 pd-rt-6 text-right">{{$it('other.shop')}}：</div><!--店铺-->
            <div class="pull-left">{{ leftCheckData.cpCShopEname }}</div>
          </div>
        </div>
      </FormLayout>
      <div slot="footer" class="dialog-footer">
        <el-button @click="downDialogObjShow2 = false">{{$it('com.cancel')}}<!--取 消--></el-button>
        <el-button type="primary" @click="downDialogSubmit2()"> {{$it('btn.download')}}<!--下 载--></el-button>
      </div>
    </el-dialog>

    <!--修改商品标签-->
    <el-dialog title="修改商品标签" width="500px" :visible.sync="modifyTypeDialogObjShow">
      <action-form
          ref="actionFormModifyType"
          :form-items="formConfig2.formData"
          :form="formConfig2.formValue"
          :span="18"
      />
      <div slot="footer" class="dialog-footer">
        <el-button @click="modifyTypeDialogObjShow = false">{{$it('com.cancel')}}<!--取 消--></el-button>
        <el-button type="primary" :disabled="!formConfig2.formValue.brandLabels"
                   :loading="formConfig2.loading"
                   @click="modifyTypeFun">{{$it('com.determine')}}<!--确 定-->
        </el-button>
      </div>
    </el-dialog>



    <!-- 修改同步比例-->
    <el-dialog :title="$it('btn.a6')" :visible.sync="dialogObj4.show" width="500px">
      <Form  :model="dialogObj4.formData" :label-width="155">
        <FormItem label="比例:" prop="qty">
          <Input v-model="dialogObj4.formData.ratio" clearable :regx="/^[0-9]*$/" style="width: 200px"/>
        </FormItem>
      </Form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogObj4.show = false">{{$it('com.cancel')}}<!--取 消--></el-button>
        <el-button type="primary" :disabled="!dialogObj4.formData.ratio" :loading="dialogObj4.loading"
                   @click="checkSkuStorageFun({ratio:dialogObj4.formData.ratio},'dialogObj4',true)">{{$it('com.determine')}}<!--确 定-->
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import channelStockControl from '@/js/pages/inventoryCenter/channelStockControl/channelStockControl';

export default channelStockControl;
</script>
<style lang="less" type="text/less">
.channelStockControl {
  .ark-table-tfoot tr:first-child td {
    border-top: 1px solid #e8eaec;
  }

  .ark-collapse-content {
    padding: 10px !important;
  }

  .ark-table {
    .ark-radio-wrapper.ark-radio-default {
      margin-right: 0;
    }
  }

  .ark-switch:after {
    width: 14px;
    height: 14px;
    border-radius: 14px;
  }

  .ark-switch-checked:after {
    left: 21px;
  }

  .ark-switch-checked .ark-switch-inner {
    left: 7px;
  }

  .channelStockControl .ark-switch {
    width: 36px;
  }

  .ark-switch-inner {
    left: 18px;
  }

  .ark-switch {
    width: 38px;
    height: 18px;
  }


  .ark-select-dropdown {
    .flag {
      &:after {
        left: auto;
      }
    }
  }


  .ark-form-item {
    margin-bottom: 8px;
  }
}

</style>

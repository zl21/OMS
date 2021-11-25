<!--寻源策略表-->
<template>
  <div class="sourcstrategy pd-tp-20 relative pd-bt-50" v-loading="loading">
    <WaterMark v-if="ID!=='-1'&&status && statusObj[status]" :text="statusObj[status]"/>
    <div class="pd-rt-100">
      <div class="br-d3d3d3  pd-20 mg-bt-20" id="box-1">
        <div class="flex flex-direction-row align-items-center pd-bt-15">
          <span class="iconfont icon-item icon-jibenxinxi font-size-24 color-primary"></span>
          <span class="pd-lf-15 font-size-18 font-weight-bold">基础信息</span>
        </div>
        <OmsForm :form-config="formConfig1"/>
      </div>
      <div class="br-d3d3d3  pd-20 mg-bt-20" id="box-2">
        <div class="flex flex-direction-row align-items-center pd-bt-15">
          <span class="iconfont icon-item icon-liuchengtiaojian font-size-24 color-primary"></span>
          <span class="pd-lf-15 font-size-18 font-weight-bold">强制寻源规则</span>
        </div>
        <div>
          <!--弹窗多选-->
          <Fkdialog
            class="flex align-items-center justify-content-center"
            v-if="fkDialog.dialog"
            :tablename="itemdata.reftable"
            :tableid="itemdata.reftableid"
            :right-list="fkDialog.lists"
            :is-object="itemdata.isObject"
            :append-to-body="true"
            :fkshow.sync="fkDialog.dialog"
            :is-one-data="itemdata.isOneData"
            @easyData="getFkdialog"
            @dialogClose="dialogClose"
          />
          <Table border size="small" :columns="columns1" :data="tableData1">
            <template slot-scope="{ row, index }" slot="type">
              <Select v-model="row.type" :transfer="true" size="small" class="width-100"
                      v-for="(item,index) in typeList" :key="index">
                <Option :value="item.value">{{ item.label }}</Option>
              </Select>
            </template>
            <template slot-scope="{ row, index }" slot="stores">
              <Tag v-for="(item,i) in row.store" class="tag-blue"
                   :key="i"
                   :name="item.ECODE"
                   :closable="canEdit"
                   type="border"
                   @on-close="handleClose(index,i,item)">{{ item.ENAME }}
              </Tag>
            </template>
          </Table>
        </div>
      </div>
      <div class="br-d3d3d3  pd-20 mg-bt-20" id="box-3">
        <div class="flex flex-direction-row align-items-center">
          <span class="iconfont icon-item icon-zengpin font-size-24 color-primary"></span>
          <span class="pd-lf-15 font-size-18 font-weight-bold">寻源规则</span>
        </div>
        <div :class="{'pd-tp-15':!canEdit}">
          <div v-if="canEdit" class="flex flex-direction-row justify-content-end pd-bt-5">
            <Button :loading="addLineLoading" type="fcdefault" @click="addRowFun" size="small"
                    class="pd-tp-3 pd-bt-3">新增行
            </Button>
          </div>
          <Table border size="small" :columns="columns2" :data="tableData2ForFrontEndPage"
                 :loading="addLineLoading || tableData2Loading">
            <template slot-scope="{ row, index }" slot="level">
              {{ row.level }}
            </template>
            <template slot-scope="{ row, index }" slot="rulers">
              <Tag v-for="(item,i) in row.rulers" class="tag-red"
                   :key="i"
                   :name="item.sgCShareSourceRuleStrategyEcode"
                   :checked="item.isactive === 'Y'"
                   :checkable="canEdit"
                   @on-change="tabClick($event,index,i,row)"
                   type="border">{{ item.sgCShareSourceRuleStrategyEname }}
              </Tag>
            </template>
            <template slot-scope="{ row, index }" slot="action">
              <Button :disabled="!canEdit" type="fcdefault" @click="delRowFun(index,row)" size="small"
                      class="pd-tp-3 pd-bt-3">删除行
              </Button>
            </template>

          </Table>
          <el-pagination
            class="pagination-style mg-tp-20"
            background small
            popper-class="aaaaa"
            @size-change="pageSizeChange"
            @current-change="changePage"
            :current-page.sync="page.current"
            :page-size="page.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalForFrontEnd">
          </el-pagination>
          <!--<div class="mg-tp-20 flex flex-direction-row align-items-center justify-content-center">
            <span class="mg-rt-10">共{{ totalForFrontEnd }}条</span>
            <Page size="small" class-name="flex  align-items-center  justify-content-center" show-elevator show-sizer
                  :total="totalForFrontEnd"
                  :current.sync="page.current"
                  :page-size="page.pageSize"
                  :page-size-opts="page.pageSizeOpts"
                  @on-page-size-change="pageSizeChange"
                  @on-change="changePage"></Page>
          </div>-->

        </div>
      </div>
      <div class="br-d3d3d3  pd-20 mg-bt-20" id="box-4">
        <div class="flex flex-direction-row align-items-center pd-bt-15">
          <span class="iconfont icon-item icon-huodong font-size-24 color-primary"></span>
          <span class="pd-lf-15 font-size-18 font-weight-bold">评分策略</span>
        </div>
        <div>
          <OmsForm :form-config="formConfig2"/>
        </div>
      </div>
    </div>
    <div
      class="width-100  fixed right-0   flex flex-direction-column justify-content-center "
      style="top: 15%;height: 70%">
      <ul class="text-center right-bar" id="navBox">
        <li class="curr">
          <div class="icon-box flex flex-direction-column justify-content-center">
            <span class="iconfont icon-item icon-jibenxinxi  "></span>
          </div>
          <div class="fs-12 color-gray pd-tp-8 pd-bt-30 des">基础信息</div>
        </li>
        <li class="">
          <div class="icon-box flex flex-direction-column justify-content-center">
            <span class="iconfont icon-item icon-liuchengtiaojian  "></span>
          </div>
          <div class="fs-12 color-gray pd-tp-8 pd-bt-30 des">强制寻源规则</div>
        </li>
        <li class="">
          <div class="icon-box flex flex-direction-column justify-content-center">
            <span
              class="iconfont icon-item icon-sousou font-size-30 br-primary border-radius-5  mg-auto width-40 height-40 line-height-35 display-block text-center li"></span>
          </div>
          <div class="fs-12 color-gray pd-tp-8 pd-bt-30 des">寻源规则</div>
        </li>
        <li class="">
          <div class="icon-box flex flex-direction-column justify-content-center">
            <span
              class="iconfont icon-item icon-liebiao-yishoucang font-size-30 bg-primary border-radius-5 color-white mg-auto width-40 height-40 line-height-40 display-block text-center li"></span>
          </div>
          <div class="fs-12 color-gray pd-tp-8 pd-bt-30 des">评分策略</div>
        </li>
      </ul>
    </div>
    <div class="fixed bottom-0 right-0" ref="rightBox" style="z-index: 999">
      <div class="flex flex-direction-row justify-content-end bg-base">
        <OmsButton :btn-config="btnConfig" class="top-btns"/>
      </div>
    </div>
  </div>
</template>

<script>
import channelRatioStrategy from '@/js/pages/inventoryCenter/sourcstrategy/sourcstrategyAdd';

export default channelRatioStrategy;
</script>
<style lang="less">
@import '~@/css/pages/inventoryCenter/sourcstrategy.less';
</style>

<!--批量新增商品列表-->
<template>
  <div class="row">
    <div style="width: 100%">
      <Button class="import" @click="importData">批量导入</Button>
    </div>
    <div
      class="form_content content_pro_list"
      v-for="(list, listIndex) in productList"
      v-on:mouseover="changeActive(listIndex)"
      :key="listIndex"
    >
      <i
        class="el-tag__close el-icon-close closeBtn"
        @click="delIndexData(listIndex)"
        v-show="list_index === listIndex ? true : false"
      ></i>
      <div class="detailtable">
        <div slot="action" class="form_button">
          <ButtonFkDialog
            :itemdata="itemdataFk"
            @getFkChooseItem="getButtonFkChoose(listIndex, 'product')"
          ></ButtonFkDialog>
          <button class="white" @click="addRowData(listIndex, 'product')">
            添加
          </button>
        </div>
        <Table :columns="products_columns" :data="list.products" border>
          <template slot-scope="{ row, index }" slot="ECODE">
            <!-- <myInputLd
                :isActive="true"
                :isdisabled="false"
                :itemdata ="row.itemdata"
                :row = row
                :isObject="true"
                @getFkChooseItem="handleChangeds(row.itemdata,listIndex,index,'product')"
                >
            </myInputLd>-->
            <TableSku
              :itemdata="itemdata"
              :row="row"
              @getFilterChooseItem="
                (item, row) => {
                  getFilterChooseItem(item, row, listIndex, index, 'product');
                }
              "
              @clearFilterChooseItem="
                clearFilterChooseItem(listIndex, index, 'product')
              "
            ></TableSku>
          </template>
          <template slot-scope="{ row, index }" slot="NUM">
            <input
              type="text"
              v-model="row.NUM"
              placeholder=""
              oninput="this.value = this.value.replace( /[^0-9]+/,'');"
              @blur="blurValue($event, row, listIndex, index, 'product', 'NUM')"
              :class="{ AutoRight }"
            />
          </template>
          <template slot-scope="{ row, index }" slot="OPERATE">
            <Button :row="row" @click="deleteRowData(row, listIndex, 'product')"
              >删除</Button
            >
          </template>
        </Table>
      </div>
      <div class="detailtable">
        <div slot="action" class="form_button">
          <ButtonFkDialog
            :itemdata="itemdata_giftFk"
            @getFkChooseItem="getButtonFkChoose(listIndex, 'gift')"
          ></ButtonFkDialog>
          <button class="white" @click="addRowData(listIndex, 'gift')">
            添加
          </button>
        </div>
        <Table :columns="gift_columns" :data="list.gift_products" border>
          <template slot-scope="{ row, index }" slot="ECODE">
            <!-- <myInputLd
                :isActive="true"
                :isdisabled="false"
                :itemdata ="row.itemdata"
                :row = row
                :isObject="true"
                @getFkChooseItem="handleChangeds(row.itemdata,listIndex,index,'gift')"
                >
            </myInputLd>-->
            <TableSku
              :itemdata="itemdata_gift"
              :row="row"
              @getFilterChooseItem="
                (item, row) => {
                  getFilterChooseItem(item, row, listIndex, index, 'gift');
                }
              "
              @clearFilterChooseItem="
                clearFilterChooseItem(listIndex, index, 'gift')
              "
            ></TableSku>
          </template>
          <template slot-scope="{ row, index }" slot="NUM">
            <input
              type="text"
              v-model="row.NUM"
              placeholder=""
              oninput="this.value = this.value.replace( /[^0-9]+/,'');"
              @blur="blurValue($event, row, listIndex, index, 'gift', 'NUM')"
              :class="{ AutoRight }"
            />
          </template>
          <template slot-scope="{ row, index }" slot="SUM">
            <input
              type="text"
              v-model="row.SUM"
              placeholder=""
              oninput="this.value = this.value.replace( /[^0-9]+/,'');"
              @blur="blurValue($event, row, listIndex, index, 'gift', 'SUM')"
              :class="{ AutoRight }"
            />
          </template>
          <template slot-scope="{ row, index }" slot="OPERATE">
            <Button :row="row" @click="deleteRowData(row, listIndex, 'gift')"
              >删除</Button
            >
          </template>
        </Table>
      </div>
    </div>
    <div class="add" @click="addList">
      <Icon type="md-add" class="addIcon" />
    </div>

    <!--导入组件-->
    <!-- <div  v-if="show_dialog">
      <Modal class="dialog" v-model="show_dialog" :footer-hide="dialogSet.footerHide"  :title="dialogSet.dialogTitle"   :mask="dialogSet.mask"  >
          <component :ref="popDialog"   :componentData="dialogModal"  v-bind:is="currentView"  @returnData="returnData"  ></component>
      </Modal>
     </div> -->
    <div v-if="show_dialog">
      <Modal
        class="dialog"
        v-model="show_dialog"
        :footer-hide="dialogSet.footerHide"
        :title="dialogSet.dialogTitle"
        :mask="dialogSet.mask"
      >
        <importDialog
          :componentData="dialogModal"
          @returnData="returnData"
        ></importDialog>
      </Modal>
    </div>
  </div>
</template>
<script>
  import batchTables from "@/js/pages/promotionCenter/details/batchTables.js";
  export default batchTables;
</script>
<style lang="less" scoped>
@import "../less/common.less";
.row {
  padding: 0px 0 40px;
  display: block;

  .AutoRight {
    text-align: right;
    padding: 0 15px;
  }
  .form_content {
    position: relative;
    width: 100%;
    //display:flex;
    .detailtable {
      width: 50%;
    }
    .closeBtn {
      position: absolute;
      right: -7px;
      top: 30px;
      z-index: 10;
      font-size: 16px;
      border: 1px solid #666;
      border-radius: 50%;
      color: #666;
      background: #fff;
    }
  }
  .burgeon-table-row {
    font-size: 12px;
    .item-input {
      min-width: 150px;
    }
  }
  .import {
    float: right;
    background: #fd6442;
    color: #fff;
    border: 1px solid #fd6442;
    border-radius: 3px;
    padding: 5px;
  }
  .burgeon-table-body {
    button {
      color: #fd6442;
    }
  }
}
.add {
  display: inline-block;
  background: #fd6442;
  color: #fff;
  padding: 0px 10px;
  text-align: right;
  float: right;
  margin: 0 10px;
  justify-content: flex-end;
}
.addIcon {
  font-size: 30px;
}
.buttonFk {
  display: inline-block;
}
</style>

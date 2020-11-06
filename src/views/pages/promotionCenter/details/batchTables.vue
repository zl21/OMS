<!--批量新增商品列表-->
<template>
  <div class="row">
    <div style="width: 100%">
      <Button
        class="import"
        @click="importData"
      >
        批量导入
      </Button>
    </div>
    <div
      v-for="(list, listIndex) in productList"
      :key="listIndex"
      class="form_content content_pro_list"
      @mouseover="changeActive(listIndex)"
    >
      <i
        v-show="list_index === listIndex ? true : false"
        class="el-tag__close el-icon-close closeBtn"
        @click="delIndexData(listIndex)"
      />
      <div class="detailtable">
        <div
          slot="action"
          class="form_button"
        >
          <ButtonFkDialog
            :itemdata="itemdataFk"
            @getFkChooseItem="getButtonFkChoose(listIndex, 'product')"
          />
          <button
            class="white"
            @click="addRowData(listIndex, 'product')"
          >
            添加
          </button>
        </div>
        <Table
          :columns="products_columns"
          :data="list.products"
          border
        >
          <template
            slot="ECODE"
            slot-scope="{ row, index }"
          >
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
            />
          </template>
          <template
            slot="NUM"
            slot-scope="{ row, index }"
          >
            <input
              v-model="row.NUM"
              type="text"
              placeholder=""
              oninput="this.value = this.value.replace( /[^0-9]+/,'');"
              :class="{ AutoRight }"
              @blur="blurValue($event, row, listIndex, index, 'product', 'NUM')"
            >
          </template>
          <template
            slot="OPERATE"
            slot-scope="{ row }"
          >
            <Button
              :row="row"
              @click="deleteRowData(row, listIndex, 'product')"
            >
              删除
            </Button>
          </template>
        </Table>
      </div>
      <div class="detailtable">
        <div
          slot="action"
          class="form_button"
        >
          <ButtonFkDialog
            :itemdata="itemdata_giftFk"
            @getFkChooseItem="getButtonFkChoose(listIndex, 'gift')"
          />
          <button
            class="white"
            @click="addRowData(listIndex, 'gift')"
          >
            添加
          </button>
        </div>
        <Table
          :columns="gift_columns"
          :data="list.gift_products"
          border
        >
          <template
            slot="ECODE"
            slot-scope="{ row, index }"
          >
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
            />
          </template>
          <template
            slot="NUM"
            slot-scope="{ row, index }"
          >
            <input
              v-model="row.NUM"
              type="text"
              placeholder=""
              oninput="this.value = this.value.replace( /[^0-9]+/,'');"
              :class="{ AutoRight }"
              @blur="blurValue($event, row, listIndex, index, 'gift', 'NUM')"
            >
          </template>
          <template
            slot="SUM"
            slot-scope="{ row, index }"
          >
            <input
              v-model="row.SUM"
              type="text"
              placeholder=""
              oninput="this.value = this.value.replace( /[^0-9]+/,'');"
              :class="{ AutoRight }"
              @blur="blurValue($event, row, listIndex, index, 'gift', 'SUM')"
            >
          </template>
          <template
            slot="OPERATE"
            slot-scope="{ row }"
          >
            <Button
              :row="row"
              @click="deleteRowData(row, listIndex, 'gift')"
            >
              删除
            </Button>
          </template>
        </Table>
      </div>
    </div>
    <div
      class="add"
      @click="addList"
    >
      <Icon
        type="md-add"
        class="addIcon"
      />
    </div>

    <!--导入组件-->
    <!-- <div  v-if="show_dialog">
      <Modal class="dialog" v-model="show_dialog" :footer-hide="dialogSet.footerHide"  :title="dialogSet.dialogTitle"   :mask="dialogSet.mask"  >
          <component :ref="popDialog"   :componentData="dialogModal"  v-bind:is="currentView"  @returnData="returnData"  ></component>
      </Modal>
     </div> -->
    <div v-if="show_dialog">
      <Modal
        v-model="show_dialog"
        class="dialog"
        :footer-hide="dialogSet.footerHide"
        :title="dialogSet.dialogTitle"
        :mask="dialogSet.mask"
      >
        <importDialog
          :component-data="dialogModal"
          @returnData="returnData"
        />
      </Modal>
    </div>
  </div>
</template>
<script>
  import batchTables from '@/js/pages/promotionCenter/details/batchTables.js';

  export default batchTables;
</script>
<style lang="less" scoped>
@import "../less/common.less";
@import "~@/css/pages/promotionCenter/details/batchTables.less";
</style>

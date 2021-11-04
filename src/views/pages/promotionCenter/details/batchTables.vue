<!--批量新增商品列表-->
<template>
  <div class="row batchTables">
    <div style="width: 100%;text-align:right">
      <Button
        class="import"
        @click="importData"
      >
        <!-- 批量导入 -->
        {{ vmI18n.t("modalTitle.batchImport") }}
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
            <!-- 添加 -->
            {{ vmI18n.t("btn.increase") }}
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
            <TableSku
              :itemdata="itemdata"
              :row="row"
              @getFilterChooseItem="
                (item, row) => {
                  getFilterChooseItem(item, row, listIndex, index, 'product');
                }
              "
              @clearFilterChooseItem="clearFilterChooseItem(listIndex, index, 'product')"
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
              {{ vmI18n.t("btn.delete") }}
              <!-- 删除 -->
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
            {{ vmI18n.t("btn.increase") }}
            <!-- 添加 -->
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
            <TableSku
              :itemdata="itemdata_gift"
              :row="row"
              @getFilterChooseItem="
                (item, row) => {
                  getFilterChooseItem(item, row, listIndex, index, 'gift');
                }
              "
              @clearFilterChooseItem="clearFilterChooseItem(listIndex, index, 'gift')"
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
              {{ vmI18n.t("btn.delete") }}
              <!-- 删除 -->
            </Button>
          </template>
        </Table>
      </div>
    </div>
    <div style="text-align: right;">
      <span
        class="add"
        @click="addList"
      >
        <Icon
          type="md-add"
          class="addIcon"
        />
      </span>
    </div>
    
    <businessDialog
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
      :basePathName="importTable.basePathName"
    />
  </div>
</template>
<script>
  import batchTables from '@/js/pages/promotionCenter/details/batchTables';

  export default batchTables;
</script>

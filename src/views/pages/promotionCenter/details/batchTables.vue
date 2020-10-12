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
import myInputLd from "./../components/tableinput";
import detailtable from "./table.vue";
import ButtonFkDialog from "../components/buttonFkDialog";
import TableSku from "./../components/tableSku";
import importDialog from "./../components/importDialog";
export default {
  name: "batchTables",
  components: {
    myInputLd,
    detailtable,
    ButtonFkDialog,
    TableSku,
    importDialog,
  },
  props: {
    productList: { type: Array },
    products_columns: {
      type: Array,
    },
    gift_columns: {
      type: Array,
    },
    itemdata: { type: Object },
    itemdata_gift: { type: Object },
  },
  data() {
    return {
      AutoRight: true,
      currentTab: 0,
      list_index: "",
      // currentView:'',   //弹框展示模块
      // popDialog:'',  //弹框
      dialogModal: {},
      show_dialog: false,
      dialogSet: {
        //弹框设置
        dialogTitle: "",
        footerHide: true,
        mask: true,
      },
      moduleMode: "batch",
    };
  },
  watch: {},
  computed: {
    itemdataFk() {
      try {
        let rs = this.itemdata;
        let itemdata = JSON.parse(JSON.stringify(rs));
        itemdata.isOneData = false;
        itemdata.fkdisplay = "mop";
        itemdata.isObject = true;
        return itemdata;
      } catch (e) {}
    },
    itemdata_giftFk() {
      try {
        let rs = this.itemdata_gift;
        let itemdata = JSON.parse(JSON.stringify(rs));
        itemdata.isOneData = false;
        itemdata.fkdisplay = "mop";
        itemdata.isObject = true;
        return itemdata;
      } catch (e) {}
    },
  },
  methods: {
    changeActive(index) {
      this.list_index = index;
    },
    blurValue(event, row, listIndex, index, from, key) {
      this.$emit("blurValue", row, listIndex, index, from, key);
    },
    addList() {
      this.$emit("addList");
    },
    delIndexData(index) {
      this.productList.splice(index, 1);
    },
    getButtonFkChoose(index, from) {
      let rs = from === "product" ? this.itemdataFk : this.itemdata_giftFk;
      let namelist = JSON.parse(rs.pid).nameList;
      namelist.forEach((obj) => {
        let row = {};
        if (rs.reftable === "SG_B_CHANNEL_PRODUCT") {
          row.ECODE = obj.PS_C_SKU_ECODE || "";
          row.ENAME = obj.PS_C_PRO_ENAME || "";
          row.SKU_ID = obj.SKU_ID || "";
          row.ID = obj.ID || "";
        } else if (rs.reftable === "IP_C_TAOBAO_PRODUCT") {
          row.ECODE = String(obj.NUM_IID) || "";
          row.ENAME = obj.TITLE || "";
          row.ID = obj.ID;
        } else if (rs.reftable === "PS_C_PRO") {
          row.ECODE = obj.ECODE || "";
          row.ENAME = obj.ENAME || "";
          row.ID = obj.ID || "";
        } else {
          row.ECODE = obj.ECODE || "";
          row.ENAME = obj.PS_C_PRO_ENAME || "";
          row.ID = obj.ID || "";
        }
        this.addRowData(index, from, row);
      });
    },
    addRowData(index, from, row) {
      this.$emit("addRowData", index, from, row);
    },
    deleteRowData(row, index, from) {
      this.$emit("deleteRowData", row, index, from);
    },
    handleChangeds(itemdata, listIndex, index, from) {
      let obj = {};
      if (from === "gift") {
        obj = this.productList[listIndex].gift_products[index];
      } else {
        obj = this.productList[listIndex].products[index];
      }
      if (!itemdata.pid) {
        itemdata.ENAMECOL = itemdata.ECODECOL = "";
        if (itemdata.reftable === "SG_B_CHANNEL_PRODUCT") {
          obj.ENAME = itemdata.ENAMECOL = "";
          obj.ECODE = itemdata.ECODECOL = "";
          obj.SKU_ID = "";
          obj.SUM = "";
        } else if (rs.reftable === "IP_C_TAOBAO_PRODUCT") {
          obj.ECODE = itemdata.NUM_IID = "";
          obj.ENAME = itemdata.TITLE = "";
          obj.ID = itemdata.ID = "";
        } else if (rs.reftable === "PS_C_PRO") {
          obj.ECODE = itemdata.ECODE = "";
          obj.ENAME = itemdata.ENAME = "";
          obj.ID = itemdata.ID = "";
        } else {
          obj.ENAME = itemdata.ENAMECOL = "";
          obj.ECODE = itemdata.ECODECOL = "";
          obj.ID = "";
        }
      }
      let channelList = itemdata.channelList;
      if (itemdata.reftable === "SG_B_CHANNEL_PRODUCT") {
        obj.ENAME = itemdata.ENAMECOL = channelList.PS_C_PRO_ENAME;
        obj.ECODE = itemdata.ENAMECOL = channelList.PS_C_SKU_ECODE;
        obj.SKU_ID = channelList.SKU_ID;
        obj.SUM = channelList.PRICE;
      } else {
        obj.ENAME = itemdata.ENAMECOL = channelList.ENAME;
        obj.ECODE = itemdata.ECODECOL = channelList.ECODE;
        obj.ID = channelList.ID;
      }
      obj.itemdata = itemdata;
    },
    /**
     *  表格支持商品模糊选中
     * @item 商品信息
     * @row 行信息
     */
    getFilterChooseItem(item, row, listIndex, index, from) {
      let self = this;
      let obj = {};
      let rs = from === "product" ? this.itemdataFk : this.itemdata_giftFk;
      if (from === "gift") {
        obj = this.productList[listIndex].gift_products[index];
      } else {
        obj = this.productList[listIndex].products[index];
      }
      if (rs.reftable === "SG_B_CHANNEL_PRODUCT") {
        obj.ENAME = item.PS_C_PRO_ENAME || "";
        obj.ECODE = item.PS_C_SKU_ECODE || "";
        obj.SKU_ID = item.SKU_ID || "";
        obj.ID = item.ID || "";
      } else if (rs.reftable === "IP_C_TAOBAO_PRODUCT") {
        obj.ENAME = item.PS_C_PRO_ENAME || "";
        obj.ECODE = item.PS_C_SKU_ECODE || "";
        obj.ID = item.ID;
      } else if (rs.reftable === "PS_C_PRO") {
        obj.ENAME = item.PS_C_PRO_ENAME || "";
        obj.ECODE = item.PS_C_PRO_ECODE || "";
        obj.ID = item.ID;
      } else {
        obj.ENAME = item.PS_C_PRO_ENAME;
        obj.ECODE = item.PS_C_SKU_ECODE;
        obj.ID = item.ID;
      }
      return;
    },
    /**
     *  清空表格行信息中的商品信息
     *  特殊情况下不能如此清空
     */
    clearFilterChooseItem(listIndex, index, from) {
      let obj = {};
      let rs = from === "product" ? this.itemdataFk : this.itemdata_giftFk;
      if (from === "gift") {
        obj = this.productList[listIndex].gift_products[index];
      } else {
        obj = this.productList[listIndex].products[index];
      }
      if (rs.reftable === "SG_B_CHANNEL_PRODUCT") {
        if (obj.ENAME) obj.ENAME = "";
        if (obj.ECODE) obj.ECODE = "";
        if (obj.ID) obj.ID = "";
        if (obj.SKU_ID) obj.SKU_ID = "";
        if (obj.SUM) obj.SUM = "";
        if (obj.ALLSUM) obj.ALLSUM = "";
        if (obj.SG_PRO_ID) obj.SG_PRO_ID = "";
        if (obj.PRO_ECODE) obj.PRO_ECODE = "";
      } else if (rs.reftable === "IP_C_TAOBAO_PRODUCT") {
        if (obj.ENAME) obj.PS_C_PRO_ENAME = "";
        if (obj.ECODE) obj.PS_C_SKU_ECODE = "";
        if (obj.ID) obj.ID = "";
      } else if (rs.reftable === "PS_C_PRO") {
        if (obj.ENAME) obj.ENAME = "";
        if (obj.ECODE) obj.ECODE = "";
        if (obj.ID) obj.ID = "";
      } else {
        if (obj.ENAME) obj.ENAME = "";
        if (obj.ECODE) obj.ECODE = "";
        if (obj.ID) obj.ID = "";
      }
    },
    /**
     * 导入
     */
    importData() {
      let self = this;
      this.dialogModal = {};
      this.dialogModal.tableName = this.itemdata.reftable || "PS_C_SKU";
      this.dialogModal.mode = this.moduleMode; //区分模块 条件设置  赠品设置 还是批量设置
      // let  _component = "popdialog";
      // Vue.component(
      //   _component,
      //   Vue.extend(_import("onlinePromotion/components/importDialog"))
      // );
      // self.currentView = _component;
      self.dialogSet.dialogTitle = "导入";
      self.show_dialog = true;
    },
    /**
     * 返回值，用于弹框导入返回调添加单个表
     */
    returnData(data) {
      if (data && data.length > 0) {
        this.$emit("batchImport", data);
      }
    },
    /**
     * 关闭弹框
     */
    closeDialog() {
      this.show_dialog = false;
    },
    /**
     * 按键
     */
    keyUpValue(event) {
      //event.target.value= event.target.value.match(/^[1-9]\d*/) ? event.target.value.match(/^[1-9]\d*/)[0] : '';
      event.target.value = event.target.value.replace(/[^0-9]+/, "");
      return event.target.value;
    },
  },
  mounted() {
    console.log("productList", this.productList);
  },
};
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

<!-- 条件设置-->
<template>
  <div class="batchInfoSet">
    <div class="title">
      <i class="iconfontPromotion burgeon-iconliuchengtiaojian" />
      <!-- <span>条件信息设置</span>  -->
      <span>{{ vmI18n.t("other.info_set") }}</span>
    </div>
    <!--商品来源-->
    <div class="info-row row">
      <!-- <div class="form_label">商品来源：</div> -->
      <div class="form_label">{{ vmI18n.t("form_label.goods_source") }}：</div>
      <div class="form_content">
        <SingleBox
          :value="infoData.products_origin"
          :options="groups.productsOrigin"
          @changeSingle="productsFromChange"
        />
      </div>
    </div>
    <!--赠品翻倍-->
    <div class="info-row row">
      <!-- <div class="form_label">赠品翻倍：</div> -->
      <div class="form_label">{{ vmI18n.t("form_label.double_gifts") }}：</div>
      <div class="form_content">
        <SingleBox
          :value="infoData.gift_doubles"
          :options="groups.giftDoubles"
          @changeSingle="checkBuyerLimitFrequencyChange"
        />
        <!-- <div class="form_item">,最大翻倍次数</div> -->
        <div class="form_item">
          ,{{ vmI18n.t("form_label.max_doubling_times") }}
        </div>
        <div class="form_el_input form_item doubleNum">
          <input
            v-model="infoData.max_doubles_limits"
            oninput="this.value= this.value.match(/^[1-9]\d{0,2}/) ? this.value.match(/^[1-9]\d{0,2}/)[0] : ''"
            placeholder
          />
        </div>
      </div>
    </div>
    <!--选择商品方式-->
    <div class="info-row row">
      <!-- <div class="form_label">赠送方式：</div> -->
      <div class="form_label">{{ vmI18n.t("form_label.giving_ways") }}：</div>
      <div class="form_content">
        <SingleBox
          :value="infoData.gift_methods"
          :options="groups.batchGiftMethods"
          @changeSingle="checkGiftChange"
        />
      </div>
    </div>
    <!--商品列表-->
    <batchTables
      :product-list="infoData.list"
      :products_columns="products_columns"
      :gift_columns="gift_columns"
      :itemdata="itemdata"
      :itemdata_gift="itemdata_gift"
      @addRowData="addRowData"
      @deleteRowData="deleteRowData"
      @addList="addList"
      @blurValue="blurValue"
      @batchImport="batchImport"
    />
  </div>
</template>
<script>
import detailtable from "./table.vue";
import batchTables from "./batchTables";
import SingleBox from "../components/singleBox";
import tableCols from "@/assets/js/promotion/columns.js";

export default {
  name: "InfoSet",
  components: {
    detailtable,
    batchTables,
    SingleBox,
  },
  props: {
    basicData: {
      type: Object,
    },
    infoData: {
      type: Object,
    },
    objid: {
      type: String,
    },
  },
  data() {
    return {
      vmI18n: window.vmI18n,
      products_columns: tableCols.productsColumns,
      // products_columns: [
      //   {
      //     slot: "ECODE",
      //     key: "ECODE",
      //     title: "商品编码"
      //   },
      //   {
      //     key: "ENAME",
      //     title: "商品名称"
      //   },
      //   {
      //     slot: "NUM",
      //     key: "NUM",
      //     title: "数量"
      //   },
      //   {
      //     slot:"OPERATE",
      //     key: "OPERATE",
      //     title: "操作",
      //     fun: ""
      //   }
      // ], //表头
      // gift_columns: [
      //   {
      //     slot: "ECODE",
      //     key: "ECODE",
      //     title: "商品编码"
      //   },
      //   {
      //     key: "ENAME",
      //     title: "商品名称"
      //   },
      //   {
      //     slot: "NUM",
      //     key: "NUM",
      //     title: "每次赠送数量"
      //   },
      //   {
      //     slot: "SUM",
      //     key: "SUM",
      //     title: "赠送总计数量"
      //   },
      //   {
      //     slot:"OPERATE",
      //     key: "OPERATE",
      //     title: "操作",
      //     fun: ""
      //   }
      // ], //表头
      itemdata_xitong: {
        col: 1,
        colid:
          this.$store.state.customize.forginkeys.columnIds.sku || "1700806532",
        colid: "1700806532",
        colname: "PS_C_PRO_ID",
        datelimit: "all",
        display: "text",
        fkdesc: "门店档案",
        fkdisplay: "drp",
        inputname: "PS_C_PRO_ID:ECODE",
        isfk: true,
        isnotnull: false,
        isuppercase: true,
        length: 65535,
        name: "",
        readonly: false,
        reftable: "PS_C_SKU",
        reftableid: 23281,
        row: 1,
        statsize: -1,
        type: "STRING",
        valuedata: "",
        isOneData: true,
        isObject: true,
      },
      itemdata_channel: {
        col: 1,
        colid:
          this.$store.state.customize.forginkeys.columnIds.plateform_sku ||
          "1700806533",
        colname: "SG_B_CHANNEL_PRODUCT_ID",
        datelimit: "all",
        display: "text",
        fkdesc: "门店档案",
        fkdisplay: "drp",
        inputname: "SG_B_CHANNEL_PRODUCT_ID:ECODE",
        isfk: true,
        isnotnull: false,
        isuppercase: true,
        length: 65535,
        name: "",
        readonly: false,
        reftable: "SG_B_CHANNEL_PRODUCT",
        reftableid: 24801,
        row: 1,
        statsize: -1,
        type: "STRING",
        valuedata: "",
        isOneData: true,
      },
      itemdata_xitong_pro: {
        // 系统商品款号
        col: 1,
        colid:
          this.$store.state.customize.forginkeys.columnIds.pro || "1700806532",
        colname: "PS_C_PRO_ID",
        datelimit: "all",
        display: "text",
        fkdesc: "门店档案",
        fkdisplay: "drp",
        inputname: "PS_C_PRO_ID:ECODE",
        isfk: true,
        isnotnull: false,
        isuppercase: true,
        length: 65535,
        name: "",
        readonly: false,
        reftable: "PS_C_PRO",
        reftableid: 23281,
        row: 1,
        statsize: -1,
        type: "STRING",
        valuedata: "",
        isOneData: true,
        isObject: true,
      },
      itemdata_channel_pro: {
        // 平台商品ID
        col: 1,
        // colid: this.$store.state.forginkeys.columnIds.plateform_pro || '1700806533',
        colid: "1700806533",
        colname: "IP_C_TAOBAO_PRODUCT_ID",
        datelimit: "all",
        display: "text",
        fkdesc: "门店档案",
        fkdisplay: "drp",
        inputname: "IP_C_TAOBAO_PRODUCT_ID:ECODE",
        isfk: true,
        isnotnull: false,
        isuppercase: true,
        length: 65535,
        name: "",
        readonly: false,
        reftable: "IP_C_TAOBAO_PRODUCT",
        reftableid: 24801,
        row: 1,
        statsize: -1,
        type: "STRING",
        valuedata: "",
        isOneData: true,
      },
    };
  },
  computed: {
    groups() {
      return this.$store.state.customize.forginkeys.groups;
    },
    itemdata() {
      // this.clearPdts();
      let rs;
      if (this.infoData.products_origin === "1") {
        rs = this.itemdata_xitong;
      } else if (this.infoData.products_origin === "2") {
        rs = this.itemdata_channel;
      } else if (this.infoData.products_origin === "3") {
        rs = this.itemdata_xitong_pro;
      } else {
        rs = this.itemdata_channel_pro;
      }
      const itemdata = JSON.parse(JSON.stringify(rs));
      return itemdata;
    },
    itemdata_gift() {
      return JSON.parse(JSON.stringify(this.itemdata_xitong));
    },
    gift_columns() {
      const cols = JSON.parse(JSON.stringify(this.tableCols.giftColumns));
      cols.forEach((column) => {
        if (column.key === "ECODE") {
          column.width = 200;
        }
        if (column.key === "SUM_QTY") {
          if (
            (this.basicData && this.basicData.status === "1") ||
            this.objid == "-1"
          ) {
            column.render = (h, params) => h("div", {}, params.row.SUM);
          } else {
            delete column.render;
            this.$set(column, "render", null);
          }
        }
        if (column.key === "SEND_QTY") {
          if (
            (this.basicData && this.basicData.status === "1") ||
            this.objid == "-1"
          ) {
            column.render = (h, params) => h("div", {}, 0);
          } else {
            delete column.render;
            this.$set(column, "render", null);
          }
        }
      });
      return cols;
    },
    // products_columns() {
    //   let cols = JSON.parse(JSON.stringify(this.tableCols.productsColumns));
    //   cols.forEach(column => {
    //     if (column.key === "ECODE") {
    //       column.width = 200;
    //     }
    //   });
    //   return cols;
    // },
    tableCols() {
      return tableCols;
    },
  },
  watch: {
    "infoData.products_origin": {
      handler(val, old) {
        const self = this;
        const cols = JSON.parse(JSON.stringify(this.tableCols.productsColumns));
        const colsxt = JSON.parse(
          JSON.stringify(this.tableCols.productsColumnsxt)
        );
        const colspt = JSON.parse(
          JSON.stringify(this.tableCols.productsColumnspt)
        );
        if (val === "1" || val === "2") {
          cols.forEach((column) => {
            if (column.key === "ECODE") {
              column.width = 200;
            }
          });
          this.products_columns = cols;
        } else if (val === "3") {
          colsxt.forEach((column) => {
            if (column.key === "ECODE") {
              column.width = 200;
            }
          });
          this.products_columns = colsxt;
        } else {
          colspt.forEach((column) => {
            if (column.key === "ECODE") {
              column.width = 200;
            }
          });
          this.products_columns = colspt;
        }
      },
    },
  },
  methods: {
    blurValue(row, listIndex, index, from, key) {
      if (from === "gift") {
        this.infoData.list[listIndex].gift_products[index][key] = row[key];
      } else {
        this.infoData.list[listIndex].products[index][key] = row[key];
      }
    },
    addList() {
      this.infoData.list.push({ gift_products: [], products: [] });
    },
    productsFromChange(val) {
      this.infoData.list = [{ gift_products: [], products: [] }];
      this.infoData.products_origin = val;
    },
    checkBuyerLimitFrequencyChange(val) {
      this.infoData.gift_doubles = val;
    },
    checkGiftChange(val) {
      this.infoData.gift_methods = val;
    },
    addRowData(index, from, row) {
      // 添加
      const self = this;
      const obj = {};
      if (from === "gift") {
        self.gift_columns.forEach((col) => {
          obj[col.key] = row && row[col.key] ? row[col.key] : "";
        });
        if (row && row.ID) obj.ID = row.ID;
        self.infoData.list[index].gift_products.push(obj);
      } else {
        self.products_columns.forEach((col) => {
          obj[col.key] = row && row[col.key] ? row[col.key] : "";
        });
        if (row && row.ID) obj.ID = row.ID;
        if (row && row.SKU_ID) obj.SKU_ID = row.SKU_ID;
        self.infoData.list[index].products.push(obj);
      }
    },
    deleteRowData(row, index, from) {
      const self = this;
      const rowIndex = row._index;
      if (from === "gift") {
        self.infoData.list[index].gift_products.splice(rowIndex, 1);
      } else {
        self.infoData.list[index].products.splice(rowIndex, 1);
      }
    },
    clearPdts() {
      this.infoData.list = [{ gift_products: [], products: [] }];
    },
    /**
     * 批量录入
     */
    batchImport(data) {
      let self = this;
      data.forEach((item, index) => {
        let obj = this.infoData.list[index];
        try {
          if (obj) {
            obj.products = obj.products.concat(item.rules);
            obj.gift_products = obj.gift_products.concat(item.gifts);
          } else {
            obj = {};
            obj.products = item.rules;
            obj.gift_products = item.gifts;
            this.infoData.list.push(obj);
          }
        } catch (e) {
          // console.log("批量导入解析出现问题...");
          self.$message({ type: "error", message: vmI18n.t("modalTips.r7") });
        }
      });
    },
  },

  mounted() {
    // console.log("infoData", this.infoData);
  },
};
</script>

<style lang="less">
@import "./../less/common.less";
@lineHeight: 24px;
@inputWidth: 400px;
@fontSize: 12px;
.batchInfoSet {
  padding: 10px;
  border: 3px solid rgb(235, 235, 235);
  .title {
    i {
      font-size: 36px;
      color: rgb(236, 110, 78);
    }
    > span {
      line-height: 36px;
      font-size: 20px;
      font-weight: 600;
    }
  }
  .info-row.row {
    display: flex;
  }
  .row {
    margin: 20px 0px;
    .form_label {
      text-align: center;
      display: inline-block;
      font-size: 12px;
      width: 150px;
      height: 100%;
      line-height: @lineHeight;
      padding: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .item-input {
      label.title {
        width: 90px;
        text-align: center;
      }
      .input-wrap {
        .input-inner {
          // width: @inputWidth;
          .el-input {
            //width: @inputWidth;
            font-size: @fontSize;
            .el-input__inner {
              font-size: @fontSize;
              border-radius: 2px;
              height: @lineHeight;
              line-height: @lineHeight;
              padding: 0 5px;
            }
          }
        }
      }
      .el-select {
        width: 300px;
        .el-input {
          font-size: 12px;
          .el-input__inner {
            font-size: @fontSize;
            height: @lineHeight;
            line-height: @lineHeight;
            border-radius: 2px;
          }
        }
      }
    }
    .burgeon-date-picker {
      .burgeon-date-picker-rel {
        .burgeon-input-wrapper {
          .burgeon-input-icon-normal + .burgeon-input {
            padding: 0;
          }
        }
      }
    }
    .form_content {
      height: 100%;
      line-height: @lineHeight;
      display: inline-block;
      vertical-align: top;
      width: calc(100% - 150px);
      .form_item {
        display: inline;
      }
      .form_el_input {
        width: @inputWidth;
        height: 100%;
        input {
          width: calc(100% - 10px);
          height: 100%;
          padding: 0 5px;
          border-radius: 2px;
          border: 1px solid #dcdfe6;
          box-sizing: border-box;
        }
      }
    }
    .form_button {
      padding: 5px 0 5px;
      text-align: right;
      > button {
        height: 24px;
        line-height: 24px;
        padding: 0 8px;
        border: 1px solid #fd6442;
        font-size: 12px;
        background: #fff;
        color: #fd6442;
        border-radius: 2px;
        //margin-right: 5px;
      }
    }
    .red {
      padding: 5px;
      color: red;
    }
    .form_content .form_el_input.doubleNum {
      display: inline-block;
      width: 60px;
      height: 24px;
    }
    .content_pro_list {
      width: 100%;
      display: flex;
      .detailtable {
        flex: 1;
        flex-direction: column;
      }
      .detailtable:first-child {
        padding-right: 8px;
        box-sizing: border-box;
      }
      .detailtable:last-child {
        padding-left: 8px;
        box-sizing: border-box;
      }
    }
  }
  .row {
    table tr td .item-input .input-wrap .input-inner p.mop {
      right: 16px;
    }
    .el-autocomplete {
      width: 300px;
      .el-input {
        font-size: 12px;
        .el-input__inner {
          text-align: left;
          font-size: 12px;
          height: 24px;
          line-height: 24px;
          border-radius: 2px;
        }
      }
    }
  }
}
</style>

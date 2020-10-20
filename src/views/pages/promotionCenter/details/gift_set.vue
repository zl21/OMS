<!-- 赠品设置 -->
<template>
  <div class="giftSet">
    <div class="title">
      <i class="iconfontPromotion iconzengpin" />
      <span>赠品信息设置</span>
    </div>
    <!--阶梯类型-->
    <div v-if="showPdtsArr" class="row">
      <div class="form_label">阶梯类型：</div>
      <div class="form_content">
        <SingleBox
          :value="giftData.steps_type"
          :options="groups.stepsType"
          @changeSingle="checkStepsTypeChange"
        />
      </div>
    </div>
    <!--赠品翻倍-->
    <div class="row">
      <div class="form_label"><i class="red">*</i>赠品翻倍：</div>
      <div class="form_content">
        <SingleBox
          :value="giftData.gift_doubles"
          :options="groups.giftDoubles"
          @changeSingle="checkGiftDoublesChange"
        />
        <div class="form_item">,最大翻倍次数</div>
        <div class="form_el_input form_item limitinput">
          <input
            v-model="giftData.max_doubles_limits"
            oninput="this.value= this.value.match(/^[1-9]\d{0,2}/) ? this.value.match(/^[1-9]\d{0,2}/)[0] : ''"
            placeholder
          />
        </div>
      </div>
    </div>
    <!--赠送方式-->
    <div class="row">
      <div class="form_label"><i class="red">*</i>赠送方式：</div>
      <div class="form_content">
        <SingleBox
          :value="giftData.gift_methods"
          :options="groups.giftMethods"
          @changeSingle="checkGiftMethodsChange"
        />
      </div>
    </div>
    <!--梯度-->
    <div v-if="showPdtsArr" class="row">
      <div class="form_label">赠品列表：</div>
      <div class="form_content">
        <detailtabs
          :current.sync="currentTab"
          :columns="columns"
          :products-arrs="giftData.gift_productsArrs"
          :products-arrs-view="productsArrsView"
          :itemdata="itemdata"
          :module-mode="moduleMode"
          @addOneTableRowData="addOneTableRowData"
          @deleteOneTableRowData="deleteOneTableRowData"
          @onePageChange="onePageChange"
          @onOnePageSizeChange="onOnePageSizeChange"
          @getOnePageButtonFkChoose="getOnePageButtonFkChoose"
          @alertOneTableRowData="alertOneTableRowData"
          @returnOneTableData="returnOneTableData"
        >
          <div slot="MatchOperate" class="form_button">
            <button class="white" @click="addSteps">添加阶梯</button>
            <button class="white" @click="removeSteps">删除阶梯</button>
          </div>
        </detailtabs>
      </div>
    </div>
    <!--非梯度-->
    <div v-if="!showPdtsArr" class="row">
      <div class="form_label"><i class="red">*</i>赠品列表：</div>
      <div class="form_content">
        <detailtable
          :t-columns="columns"
          :t-data="productslistView.data"
          :total="productslistView.total"
          :itemdata="itemdata"
          :current="productslistView.current"
          :page-size="productslistView.pageSize"
          @deleteRowData="deleteRowData"
          @on-page-change="pageChange"
          @on-page-size-change="onPageSizeChange"
          @alertRowData="alertRowData"
        >
          <div slot="action" class="form_button">
            <ButtonFkDialog
              :itemdata="itemdataFk"
              @getFkChooseItem="getButtonFkChoose"
            />
            <button class="white" @click="addRowData">新增</button>
            <button class="white" @click="importData">导入</button>
          </div>
        </detailtable>
      </div>
    </div>

    <!--导入组件-->
    <div v-if="show_dialog">
      <Modal
        v-model="show_dialog"
        class="dialog"
        :footer-hide="dialogSet.footerHide"
        :title="dialogSet.dialogTitle"
        :mask="dialogSet.mask"
      >
        <component
          :is="currentView"
          :ref="popDialog"
          :component-data="dialogModal"
          @returnData="returnData"
        />
      </Modal>
    </div>
  </div>
</template>
<script>
import detailtable from "./table.vue";
import detailtabs from "./tableTabs.vue";
import SingleBox from "../components/singleBox";
import tableCols from "@/assets/js/promotion/columns.js";
import ButtonFkDialog from "../components/buttonFkDialog";

// const _import = file => require(`@/jordanComponents/views/${file}.vue`).default;
export default {
  name: "GiftSet",
  components: {
    detailtable,
    detailtabs,
    SingleBox,
    ButtonFkDialog,
  },
  props: {
    basicData: {
      type: Object,
    },
    giftData: {
      type: Object,
      // default:{
      //   steps_type: "", //阶梯类型
      //   gift_doubles: "1", //赠品翻倍 1--翻倍 0-不翻倍
      //   max_doubles_limits: "999", //最大翻倍次数
      //   gift_methods: "1", //赠送方式  1-全部送  2-顺序送  3-随机送
      //   gift_productslist: [],
      //   gift_productsArrs: [
      //     {
      //       group: "1件",
      //       productslist: []
      //     }
      //   ]
      // }
    },
    loadDis: {
      type: Boolean,
      default: false,
    },
    objid: {
      type: String,
    },
  },
  computed: {
    groups() {
      return this.$store.state.customize.forginkeys.groups;
    },
    showPdtsArr() {
      const flag = this.basicData.gradient_gift === "1";
      if (flag) {
        // 重置tab页面为第一页
        this.currentTab = 0;
      }
      return flag;
    },
    getProductsArrsIndex() {
      // 组索引
      return this.giftData.gift_productsArrs.length;
    },
    getProductsListIndex() {
      // 商品列表索引
      return this.giftData.gift_productslist.length;
    },
    columns() {
      return this.customeColumns();
    },
    itemdataFk() {
      try {
        const itemdata = JSON.parse(JSON.stringify(this.itemdata));
        itemdata.isOneData = false;
        itemdata.fkdisplay = "mop";
        itemdata.isObject = true;
        return itemdata;
      } catch (e) {}
    },
  },
  watch: {
    loadDis(val) {
      if (val === true) {
        this.initView();
      }
    },
  },
  data() {
    return {
      currentTab: 0,
      tableCols,
      // columns: [
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
      //     key: "OPERATE",
      //     title: "操作",
      //     fun: ""
      //   }
      // ], //表头
      data: [], // 表格数据
      itemdata: {
        col: 1,
        colid:
          this.$store.state.customize.forginkeys.columnIds.sku || "1700806532",
        colname: `PS_C_PRO_ID${Math.floor(Math.random() * 100)}`,
        datelimit: "all",
        display: "text",
        fkdesc: "商品档案",
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
      productslistView: {
        current: 1,
        total: 0,
        pageSize: 10,
        data: [],
      },
      productsArrsView: [], // 多tab表格
      currentView: "", // 弹框展示模块
      popDialog: "", // 弹框
      dialogModal: {},
      show_dialog: false,
      dialogSet: {
        // 弹框设置
        dialogTitle: "",
        footerHide: true,
        mask: true,
      },
      moduleMode: "gift",
    };
  },
  methods: {
    /**
     * 修改阶梯类型
     */
    checkStepsTypeChange(val) {
      this.giftData.steps_type = val;
      this.clearPdts();
    },
    /**
     * 修改赠品翻倍
     */
    checkGiftDoublesChange(val) {
      this.giftData.gift_doubles = val;
    },
    /**
     * 修改赠送方式
     */
    checkGiftMethodsChange(val) {
      this.giftData.gift_methods = val;
      this.clearPdts();
    },
    deleteOneTableRowData(tabindex, row, currentPage, pageSize) {
      // 搭配-删除行数据
      try {
        const rowCount = (currentPage - 1) * pageSize;
        const rowindex = rowCount + row._index;
        const arrs =
          this.giftData.gift_productsArrs[tabindex].productslist || [];
        arrs.splice(rowindex, 1);
        this.countOneTablelistView(tabindex);
      } catch (e) {}
    },
    addOneTableRowData(tabindex, rowObj) {
      // 搭配-增加行数据
      const obj = {};
      this.columns.forEach((col) => {
        obj[col.key] = rowObj && rowObj[col.key] ? rowObj[col.key] : "";
        if (col.key === "ORDER") {
          obj[col.key] =
            this.giftData.gift_productsArrs[tabindex].productslist.length + 1;
        }
      });
      // obj.itemdata = JSON.parse(JSON.stringify(this.itemdata));
      // if (rowObj) {
      //   obj.ID = rowObj.ID;
      //   obj.itemdata.valuedata = rowObj.ECODE;
      // }
      if (rowObj) {
        obj.ID = rowObj.ID || "";
        obj.SKU_ID = rowObj.SKU_ID || "";
      }
      this.giftData.gift_productsArrs[tabindex].productslist.push(obj);
      this.countOneTablelistView(tabindex);
    },
    addRowData(event, rowObj) {
      // 非搭配--增加行
      const obj = {};
      this.columns.forEach((col) => {
        obj[col.key] = rowObj && rowObj[col.key] ? rowObj[col.key] : "";
        if (col.key === "ORDER") {
          obj[col.key] = this.giftData.gift_productslist.length + 1;
        }
      });
      // obj.itemdata = JSON.parse(JSON.stringify(this.itemdata));
      // if (rowObj) {
      //   obj.ID = obj.itemdata.pid = rowObj.ID;
      //   obj.itemdata.valuedata = rowObj.ECODE;
      // }
      this.giftData.gift_productslist.push(obj);
      this.countTablelistView();
    },
    /**
     * 单表格删除表格数据
     * @row  行数据
     * @currentPage 当前页
     * @pageSize 分页页数
     */
    deleteRowData(row, currentPage, pageSize) {
      // 非搭配-删除行
      const rowCount = (currentPage - 1) * pageSize;
      const index = rowCount + row._index;
      if (index >= 0) {
        this.giftData.gift_productslist.splice(index, 1);
      }
      this.countTablelistView();
    },
    /**
     * 删除阶梯
     */
    removeSteps() {
      // let delTab = this.giftData.gift_productsArrs.length - 1;
      const delTab = this.currentTab;
      this.giftData.gift_productsArrs.splice(this.currentTab, 1);
      // 确认是否是删除的最后一个
      if (this.giftData.gift_productsArrs.length <= this.currentTab) {
        this.currentTab = this.giftData.gift_productsArrs.length - 1;
      }
      this.removeGroupView(delTab);
      this.countOneTablelistView(this.currentTab);
    },
    /**
     *  添加阶梯
     */
    addSteps() {
      const obj = {};
      this.columns.forEach((col) => {
        obj[col.key] = "";
      });
      const group = {
        group: this.getGroupIndex(),
        unit: this.giftData.steps_type === "QTTY" ? "件" : "元",
        productslist: [...obj],
      };
      this.giftData.gift_productsArrs.push(group);
      this.currentTab = this.getProductsArrsIndex - 1;
      this.addGroupView(this.currentTab);
    },
    getGroupIndex() {
      return Number(this.getProductsArrsIndex) + 1;
    },
    clearPdts() {
      this.giftData.gift_productsArrs = [];
      this.giftData.gift_productslist = [];
      this.productslistView = {
        total: 0,
        current: 1,
        pageSize: 10,
        data: [],
      };
      this.productsArrsView = [];
    },
    /**
     * 切换非tab页面的表格的页数
     */
    pageChange(val) {
      this.productslistView.current = val;
      this.tablelistView(
        this.giftData.gift_productslist,
        this.productslistView
      );
    },
    /**
     * 切换非tab页面的表格的页长度
     */
    onPageSizeChange(val) {
      this.productslistView.pageSize = val;
      this.tablelistView(
        this.giftData.gift_productslist,
        this.productslistView
      );
    },
    /**
     * 切换tab页面的表格的页数
     */
    onePageChange(tabindex, val) {
      this.productsArrsView[tabindex].current = val;
      this.tablelistView(
        this.giftData.gift_productsArrs[tabindex].productslist,
        this.productsArrsView[tabindex]
      );
    },
    /**
     * 切换tab页面的表格的页长度
     */
    onOnePageSizeChange(tabindex, val) {
      this.productsArrsView[tabindex].pageSize = val;
      this.tablelistView(
        this.giftData.gift_productsArrs[tabindex].productslist,
        this.productsArrsView[tabindex]
      );
    },
    /**
     * 单表格添加和删除 灵活展示表格
     */
    countTablelistView() {
      const rows = this.giftData.gift_productslist || [];
      const obj = this.productslistView;
      const pageSize = obj.pageSize || 10;
      const pagesLen = Math.ceil(rows.length / pageSize);
      if (obj.current > pagesLen) obj.current = pagesLen;
      if (pagesLen === 0) obj.current = 1;
      this.tablelistView(rows, this.productslistView);
    },
    /**
     * 多tab单表格添加和删除 灵活展示表格
     */
    countOneTablelistView(tabindex) {
      const rows = this.giftData.gift_productsArrs[tabindex].productslist || [];
      const obj = this.productsArrsView[tabindex];
      const pageSize = obj.pageSize || 10;
      const pagesLen = Math.ceil(rows.length / pageSize);
      if (obj.current > pagesLen) obj.current = pagesLen;
      if (pagesLen === 0) obj.current = 1;
      this.tablelistView(rows, obj);
    },
    /**
     * 根据当前页和当前页数目 ，展示表格
     * @row 原始表格数据
     * @obj 表格虚拟视图
     */
    tablelistView(rows, obj) {
      const current = obj.current || 1;
      const pageSize = obj.pageSize || 10;
      const start = Number((current - 1) * pageSize);
      const end = Number(current * pageSize);
      obj.total = rows.length;
      obj.data = rows.slice(start, end);
    },
    /**
     * 新增的阶梯 增加对应的视图表格
     */
    addGroupView() {
      const obj = {
        current: 1,
        total: 0,
        pageSize: 10,
        data: [],
      };
      this.productsArrsView.push(obj);
    },
    /**
     * 删除阶梯对应的视图表格
     */
    removeGroupView(delTab) {
      this.productsArrsView.splice(delTab, 1);
    },
    /**
     *  修改行数据
     *  @row 行数据
     *  @currentPage 当前页
     *  @pageSize 页大小
     *  @force 强制更改元数据，刷新表格
     */
    alertRowData(row, currentPage, pageSize, force) {
      const rowCount = (currentPage - 1) * pageSize;
      const index = rowCount + row._index;
      if (index >= 0) {
        this.deleteProperty(row);
        this.giftData.gift_productslist.splice(index, 1, row);
      }
      if (force) this.countTablelistView();
    },
    /**
     * 修改多tab 第N个表格的行数据
     * @tabindex 表格索引
     */
    alertOneTableRowData(tabindex, row, currentPage, pageSize, force) {
      const rowCount = (currentPage - 1) * pageSize;
      const rowindex = rowCount + row._index;
      if (rowindex >= 0) {
        this.deleteProperty(row);
        const arrs =
          this.giftData.gift_productsArrs[tabindex].productslist || [];
        arrs.splice(rowindex, 1, row);
      }
      if (force) this.countOneTablelistView(tabindex);
    },
    getButtonFkChoose() {
      const rs = this.itemdataFk || {};
      const namelist = JSON.parse(rs.pid).nameList;
      namelist.forEach((obj) => {
        const row = {};
        if (rs.reftable === "SG_B_CHANNEL_PRODUCT") {
          row.ECODE = obj.PS_C_SKU_ECODE || "";
          row.ENAME = obj.PS_C_PRO_ENAME || "";
          row.SKU_ID = obj.SKU_ID || "";
          row.ID = obj.ID;
        } else {
          row.ECODE = obj.ECODE || "";
          row.ENAME = obj.PS_C_PRO_ENAME || "";
          row.ID = obj.ID || "";
        }
        this.addRowData(null, row);
      });
    },
    getOnePageButtonFkChoose(tabindex, val) {
      const rs = val || {};
      const namelist = JSON.parse(rs.pid).nameList;
      namelist.forEach((obj) => {
        const row = {};
        if (rs.reftable === "SG_B_CHANNEL_PRODUCT") {
          row.ECODE = obj.PS_C_SKU_ECODE || "";
          row.ENAME = obj.PS_C_PRO_ENAME || "";
          row.ID = obj.SKU_ID;
        } else if (rs.reftable === "IP_C_TAOBAO_PRODUCT") {
          row.ECODE = obj.NUM_IID || "";
          row.ENAME = obj.TITLE || "";
          row.ID = obj.ID;
        } else if (rs.reftable === "PS_C_PRO") {
          row.ECODE = obj.ECODE || "";
          row.ENAME = obj.ENAME || "";
          row.ID = obj.ID || "";
        } else {
          row.ECODE = obj.ECODE || "";
          row.ENAME = obj.PS_C_PRO_ENAME || "";
          row.ID = obj.ID;
        }
        this.addOneTableRowData(tabindex, row);
      });
    },
    /**
     * 删除多余属性
     */
    deleteProperty(row) {
      delete row._index;
      delete row.colspan;
      delete row._rowKey;
    },
    /**
     * 定制列元素
     */
    customeColumns() {
      let cols = [];
      if (this.giftData.gift_methods === "2") {
        cols = JSON.parse(JSON.stringify(this.tableCols.giftInCreaseColumns));
      } else {
        cols = JSON.parse(JSON.stringify(this.tableCols.giftAllColumns));
      }

      cols.forEach((column) => {
        if (column.key === "SUM_QTY") {
          if (this.basicData.status === "1" || this.objid == "-1") {
            column.render = (h, params) => h("div", {}, params.row.SUM);
          } else {
            delete column.render;
            this.$set(column, "render", null);
          }
        }
        if (column.key === "SEND_QTY") {
          if (this.basicData.status === "1" || this.objid == "-1") {
            column.render = (h, params) => h("div", {}, 0);
          } else {
            delete column.render;
            this.$set(column, "render", null);
          }
        }
      });
      return cols;
    },
    /**
     * 根据数据源 真实展示数据
     */
    initView() {
      const obj = {
        current: 1,
        total: 0,
        pageSize: 10,
        data: [],
      };
      if (this.basicData.gradient_gift === "0") {
        this.productslistView = obj;
        this.tablelistView(
          this.giftData.gift_productslist,
          this.productslistView
        );
      } else {
        this.productsArrsView = [];
        this.giftData.gift_productsArrs.forEach((item, index) => {
          const o = JSON.parse(JSON.stringify(obj));
          this.productsArrsView.push(o);
          this.tablelistView(
            this.giftData.gift_productsArrs[index].productslist,
            this.productsArrsView[index]
          );
        });
      }
    },
    /**
     * 导入
     */
    importData() {
      const self = this;
      this.dialogModal = {};
      this.dialogModal.tableName = this.itemdata.reftable || "PS_C_SKU";
      this.dialogModal.mode = this.moduleMode; // 区分模块 条件设置  赠品设置 还是批量设置
      const _component = "popdialog";
      Vue.component(
        _component,
        Vue.extend(_import("onlinePromotion/components/importDialog"))
      );
      self.currentView = _component;
      self.dialogSet.dialogTitle = "导入";
      self.show_dialog = true;
    },
    /**
     * 返回值，用于弹框返回解析
     */
    returnData(data) {
      if (data && data.length > 0) {
        this.giftData.gift_productslist = this.giftData.gift_productslist.concat(
          data
        );
        this.countTablelistView();
      }
    },
    /**
     * 返回值，用于弹框导入返回调添加多个表
     */
    returnOneTableData(data, tabindex) {
      if (data && data.length > 0) {
        this.giftData.gift_productsArrs[
          tabindex
        ].productslist = this.giftData.gift_productsArrs[
          tabindex
        ].productslist.concat(data);
        this.countOneTablelistView(tabindex);
      }
    },
    /**
     * 关闭弹框
     */
    closeDialog() {
      this.show_dialog = false;
    },
  },
  mounted() {},
};
</script>
<style lang="less">
@import "./../less/common.less";
@lineHeight: 24px;
@inputWidth: 400px;
@fontSize: 12px;
.giftSet {
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
  .row {
    margin: 20px 0px;
    display: flex;
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
        //text-align: center;
      }
      .input-wrap {
        .input-inner {
          width: 300px;
          .el-input {
            width: 300px;
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
        display: inline-block;
      }
      .limitinput {
        width: 60px !important;
      }
      .form_el_input {
        width: @inputWidth;
        line-height: @lineHeight;
        height: @lineHeight;
        input {
          width: calc(100% - 10px);
          height: 100%;
          padding: 0 5px;
          border-radius: 2px;
          border: 1px solid #dcdfe6;
          box-sizing: border-box;
        }
      }
      .table-input {
        width: 300px;
        .el-input {
          font-size: 12px;
          .el-input__inner {
            font-size: @fontSize;
            height: @lineHeight;
            line-height: @lineHeight;
            border-radius: 2px;
            text-align: left;
          }
        }
      }
    }
    .form_button {
      padding: 5px;
      display: flex;
      justify-content: flex-end;
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
        margin-right: 5px;
      }
    }
    .red {
      padding: 5px;
      color: red;
    }
  }
}
</style>

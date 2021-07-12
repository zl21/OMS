<!--
 * @Author:xx
 * @Date: 2021-05-22 15:24:50
 * @LastEditTime: 2021-07-12 10:55:30
 * @LastEditors: Please set LastEditors
 * @Description: 退换货订单-详情-退货单明细
 * @FilePath: /front-standard-product/src/views/pages/orderCenter/returnOrder/returnGoods.vue
-->
<template>
  <div v-loading="loading">
    <!-- 如果是组合商品不显示  v-if="IS_GROUP"  -->
    <div class="switch">
      <span @click="onSitch()"> {{ switchText }} </span>
    </div>
    <!-- 退货明细 -->
    <business-action-table
      :jordan-table-config="businessActionTable"
      @on-select="returnOnSelect"
      @on-select-cancel="returnCancel"
      @on-select-all="returnSelectAll"
      @on-select-all-cancel="returnSelectAllCancel"
    />
    <!-- 退/添加明细弹框 -->
    <Modal
      v-model="tableConfig.modal"
      width="900"
      titleAlign="left"
      :title="`添加商品-已选（${selectLen}）`"
      :mask="true"
      @on-ok="resetReturnMainTable"
      @on-cancel="detailAddCancel"
    >
      <businessActionTable
        :jordan-table-config="tableConfig"
        @on-select="onSelect"
        @on-select-cancel="onSelectCancel"
        @on-select-all="onSelectAll"
        @on-select-all-cancel="onSelectAllCancel"
      />
    </Modal>
    <!-- 替换/添加明细 -->
    <Modal
      v-model="replaceProductTable.modal"
      width="900"
      title="替换明细"
      :mask="true"
      @on-ok="replaceOk"
    >
      <businessActionTable
        :jordan-table-config="replaceProductTable"
        @on-row-click="replaceOnSelect"
        @on-page-change="pageChange"
        @on-page-size-change="pageSizeChange"
      />
    </Modal>
  </div>
</template>
<script>
import businessActionTable from "professionalComponents/businessActionTable";
import {
  addDetailModalTableColumns,
  tuiColumns,
  huanColumns,
} from "./returnConfig.js";
import Util from "@/assets/js/public/publicMethods";

export default {
  name: "retunGoods",
  components: {
    businessActionTable,
  },
  props: {
    mainData: {},
    returnProduct: "",
  },
  data() {
    return {
      switchText:'切换为sku商品展示',
      returnArr: [],
      changeArr: [],
      loading: false,
      renderColumn: [], //存放render过后的
      detailsArrData: [], //
      indexL: [], // 一并选中待选索引集
      haveGift: "", // 挂靠赠品-商品编码
      haveGroup: "", // 组合/福袋下挂的其他关联商品-商品编码
      selectLen: 0,
      isMainDelete: false,
      OC_B_RETURN_ORDER: {}, //主表
      orderStatus:'',
      tableHead: {
        tui: [],
        huan: [],
      },
      toMainData: {
        tui: [],
        huan: [],
      }, // 传给主表的数据(用于保存)(监听时机:删除明细/新增确认)
      businessActionTable: {
        businessFormConfig: {}, // 表单配置
        businessButtonConfig: {
          typeAll: "default", // 按钮统一风格样式
          btnsite: "left", // 按钮位置 (right , center , left)
          buttons: [
            {
              webname: 'returnOrderAddProductItem',
              type: "primary",
              text: "新增明细", // 按钮文本
              isShow: true,
              btnclick: (e) => {
                if (
                  this.$route.params.customizedModuleId === "New" &&
                  !this.mainData.SOURCE_CODE
                ) {
                  this.$Message.warning("原平台单号不能为空！");
                  return;
                }
                this.tableConfig.modal = true;
                setTimeout(() => {
                  this.getDetailModal();
                }, 10);
              }, // 按钮点击事件
            },
            {
              webname: 'returnOrderReplaceProduct',
              type: "primary", // 按钮类型
              text: "替换明细", // 按钮文本
              isShow: true,
              btnclick: (e) => {
                console.log(e);
                if (
                  this.$route.params.customizedModuleId === "New" &&
                  !this.mainData.SOURCE_CODE
                ) {
                  this.$Message.warning("原平台单号不能为空！");
                  return;
                }
                this.getPlaceData();
                this.replaceProductTable.modal = true;
              }, // 按钮点击事件
            },
            {
              webname: 'returnOrderDeleteProductItem',
              type: "warning", // 按钮类型
              text: "删除明细", // 按钮文本
              isShow: true,
              btnclick: (e) => {
                console.log(e, this.detailsArrData.length);
                this.deleteMainTableData();
              }, // 按钮点击事件
            },
          ],
        }, // 按钮配置
        columns: [],
        totalData: [],
        data: [
          /* {
            PS_C_SKU_ECODE:'1010',
            PS_C_PRO_ECODE: '1111',
            QTY_REFUND:1,
            AMT_REFUND_SINGLE:10,
            REFUND_FEE:10,
          }, */
        ], // 数据配置
        pageShow: false, // 控制分页是否显示
        loading: false,
        height: 280, // 表格高度
        // indexColumn: true, // 是否显示序号
        // isShowSelection: true, // 是否显示checkedbox
        border: true, // 是否显示纵向边框
        total: 0, // 设置总条数
        pageSizeOpts: [15, 30, 45, 60], // 每页条数切换的配置
        pageSize: 15, // 每页条数
      }, // 退货明细配置
      tableConfig: {
        modal: false,
        businessFormConfig: {}, // 表单配置
        columns: addDetailModalTableColumns, // 表头
        data: [], // 数据配置
        pageShow: false, // 控制分页是否显示
        loading: false,
        height: 280, // 表格高度
        indexColumn: true, // 是否显示序号
        isShowSelection: true, // 是否显示checkedbox
        width: "", // 表格宽度
        border: true, // 是否显示纵向边框
        total: 0, // 设置总条数
        pageSizeOpts: [15, 30, 45, 60], // 每页条数切换的配置
        pageSize: 15, // 每页条数
      }, // 弹框 - 添加明细
      replaceProductTable: {
        modal: false,
        businessButtonConfig: {
          typeAll: "default", // 按钮统一风格样式
          btnsite: "left", // 按钮位置 (right , center , left)
          buttons: [
            {
              type: "primary", // 按钮类型
              text: "搜索", // 按钮文本
              isShow: true,
              btnclick: (e) => {
                console.log("搜索");
                this.getPlaceData(0, this.replaceProductTable.pageSize);
              }, // 按钮点击事件
            },
          ],
        }, // 按钮配置
        businessFormConfig: {
          formValue: {
            PS_C_PRO_ECODE: "",
            ECODE: "",
            ENAME: "",
          },
          formData: [
            {
              label: "SKU编码",
              style: "dimSearch",
              width: "8",
              value: "ECODE",
              columns: ["value"],
              AuotData: [], //匹配的选项
              dimChange: (search) => {
                //模糊查询的方法
                this.fuzzyquerybyak(search, 171332)
              },
              dimEnter: (val) => {
                this.getPlaceData(0, this.replaceProductTable.pageSize);
              },
              dimSelect: (obj) => { },
              dimblur: () => { },
            },
            {
              label: "SKU名称",
              style: "dimSearch",
              width: "8",
              value: "ENAME",
              columns: ["ECODE"],
              AuotData: [], //匹配的选项
              dimChange: (search) => { },
              dimEnter: (val) => {
                this.getPlaceData(0, this.replaceProductTable.pageSize);
              },
              dimSelect: (obj) => { },
              dimblur: () => { },
            },
            {
              style: "dimSearch", //输入框类型
              label: "SPU编码", //输入框前文字
              value: "PS_C_PRO_ECODE", //输入框的值
              columns: ["ENAME"],
              width: "8",
              AuotData: [], //匹配的选项
              dimChange: (search) => {
                this.fuzzyquerybyak(search, 165990)
              },
              dimEnter: (val) => {
                this.getPlaceData(0, this.replaceProductTable.pageSize);
              },
              dimSelect: (obj) => { },
              dimblur: () => { },
            },
          ],
        }, // 表单配置
        columns: [], // 表头
        data: [], // 数据配置
        selectData: [],
        pageShow: true, // 控制分页是否显示
        loading: false,
        indexColumn: true, // 是否显示序号
        border: true, // 是否显示纵向边框
        total: 0, // 设置总条数
        pageSizeOpts: [10, 20, 30,50,100], // 每页条数切换的配置
        pageSize: 10, // 每页条数
      }, // 弹框 - 添加/替换商品
      btnPermission: {},
    };
  },
  watch: {
    returnProduct: {
      async handler(newData) {
        let renderKeys = []; // render key
        if (newData === "0") {
          console.log("退货单");
          renderKeys = ["REFUND_ID", "QTY_REFUND"];
          this.businessActionTable.businessButtonConfig.buttons[1].isShow = false;
          this.businessActionTable.businessButtonConfig.buttons[0].isShow = true;
          this.businessActionTable.businessButtonConfig.buttons[2].isShow = true;
          this.businessActionTable.data = this.toMainData.tui;
        } else if (newData === "1") {
          renderKeys = ["QTY_EXCHANGE", "PRICE_ACTUAL"];
          this.businessActionTable.businessButtonConfig.buttons[0].isShow = false;
          this.businessActionTable.businessButtonConfig.buttons[1].isShow = true;
          this.businessActionTable.businessButtonConfig.buttons[1].text = "新增明细";
          this.businessActionTable.businessButtonConfig.buttons[2].isShow = true;
          this.businessActionTable.data = this.toMainData.huan;
        }
        if (this.$route.params.customizedModuleId === "New") {
          await this.getColumns();
          await this.renderHandle(renderKeys);
        }
      },
      immediate: true,
    },
  },
  async created() {
    if (this.$route.params.customizedModuleId !== "New") {
      this.getReplaceData(this.$route.params.itemId);
    }
  },
  async activated() {
    //编辑页面 换货/退货逻辑
    if (this.$route.params.customizedModuleId !== "New") {
      this.getBtn().then((res) => {
        let BtnConfig = this.businessActionTable.businessButtonConfig.buttons;
        if (this.$parent.$parent.panelRef === "换货明细") {
          BtnConfig[0].isShow = false;
          BtnConfig[1].isShow = true;
          BtnConfig[2].isShow = false;
          if (this.$route.query.RETURN_SOURCE == "平台") {
            BtnConfig[1].isShow = false;
          }
          this.businessActionTable.columns = this.tableHead.huan;
          this.renderColumn = this.tableHead.huan;
          if(this.$route.query.RETURN_SOURCE !== "手工新增"){
             this.renderHandle([[ "QTY_EXCHANGE"]]); //render方法
          }else{
             this.renderHandle([["REFUND_ID", "QTY_EXCHANGE"]]); //render方法
          }
          this.businessActionTable.data = this.toMainData.huan;
        } else if (this.$parent.$parent.panelRef === "退货明细") {
          if (this.$route.query.RETURN_SOURCE == "平台") {
            BtnConfig[0].isShow = false;
            BtnConfig[1].isShow = false;
            BtnConfig[2].isShow = false;
          }
          BtnConfig[1].isShow = false;
          this.businessActionTable.columns = this.tableHead.tui;
          this.renderColumn = this.tableHead.tui;
          if(this.$route.query.RETURN_SOURCE !== "手工新增"){
             this.renderHandle([[ "QTY_EXCHANGE"]]); //render方法
          }else{
             this.renderHandle([["REFUND_ID", "QTY_EXCHANGE"]]); //render方法
          }
          this.businessActionTable.data = this.toMainData.tui;
        }
        // 判断如果单据状态为带退货完成/完成/取消 不可编辑
        if (['1', "2", "3"].includes(String(this.orderStatus))) {
          console.log('1');
          BtnConfig[0].isShow = false;
          BtnConfig[1].isShow = false;
          BtnConfig[2].isShow = false;
        }
      })
    } else {
      // this.getBtn();
    }
  },
  async mounted() {
    let self = this;
    window.addEventListener("customizeClick", function (e) {
      let text = e.detail.type || "";
      if (text === "save" && e.detail.res.data.oK) {
        console.log("save:");
        self.save();
      }
    });
  },
  methods: {
    // 切换商品展示类型
    onSitch(){
      this.isSku ? this.switchText = '切换为sku商品展示' : this.switchText = '切换为平台商品展示';
      this.isSku = !this.isSku;
      // this.getData(this.isSku);
    },
    // 获取按钮权限
    async getBtn() {
      return $OMS2.omsUtils.getPermissions(this, '', { table: 'OC_B_RETURN_ORDER', type: 'OBJ' }, true).then(res => {
        const { ACTIONS, SUB_ACTIONS } = res
        this.businessActionTable.businessButtonConfig.buttons.forEach(item => {
          if(!SUB_ACTIONS.some(y => y.webname === item.webname)){
              item.isShow = false
          } else {
            SUB_ACTIONS.forEach((e) => {
              if(item.webname === e.webname){
                item.isShow = true
              }
            })
          }
          if(this.$route.params.customizedModuleId === "New"){
            if (this.returnProduct == '0') {
              if (item.webname == 'returnOrderReplaceProduct') {
                item.isShow = false
              }
            } else {
              if (item.webname == 'returnOrderAddProductItem') {
                item.isShow = false
                item.text = '新增明细';
              }
            }
          }
        })
        return this.businessActionTable.businessButtonConfig.buttons
      });
    },
    // 编辑获取按钮权限
    // 获取表头（新增）
    async getColumns() {
      this.tableConfig.columns = tuiColumns;
      this.replaceProductTable.columns = huanColumns;
      this.renderColumn = this.returnProduct == "0" ? tuiColumns : huanColumns;
    },
    // 获取详情数据
    async getReplaceData(objid) {
      console.log('objId');
      const {
        data: {
          code,
          data,
          data: {
            REFUND_ITEM_TABTH, //退单表头
            EXCHANGE_ITEM_TABTH, // 换表头
            OC_B_RETURN_ORDER, //主表
            OC_B_RETURN_ORDER_REFUND_ITEMS, // 数据-退
            OC_B_RETURN_ORDER_EXCHANGE_ITEMS, // 数据-换
          },
          message,
        },
      } = await this.service.orderCenter.getALlOrderReturnAndItemInfo({
        ID: objid,
      });
      // 获取状态
      this.orderStatus = OC_B_RETURN_ORDER.RETURN_STATUS;
      this.businessActionTable.columns =
        this.$parent.$parent.panelRef === "退货明细"
          ? REFUND_ITEM_TABTH
          : EXCHANGE_ITEM_TABTH; //表头
      this.renderColumn =
        this.$parent.$parent.panelRef === "退货明细"
          ? REFUND_ITEM_TABTH
          : EXCHANGE_ITEM_TABTH; // render
      // 退款金额
      let returnAmount = {
        PRO_ACTUAL_AMT: this.$OMS2.omsUtils.floatNumber(
          Number(OC_B_RETURN_ORDER.PRO_ACTUAL_AMT)
        ), //商品应退金额
        PRO_REAL_AMT: this.$OMS2.omsUtils.floatNumber(
          Number(OC_B_RETURN_ORDER.PRO_REAL_AMT)
        ), //商品实退金额
        SHIP_AMT: this.$OMS2.omsUtils.floatNumber(
          Number(OC_B_RETURN_ORDER.SHIP_AMT)
        ), //应退运费
        ADJUST_AMT: this.$OMS2.omsUtils.floatNumber(
          Number(OC_B_RETURN_ORDER.ADJUST_AMT)
        ), //调整金额
        EXCHANGE_AMT: this.$OMS2.omsUtils.floatNumber(
          Number(OC_B_RETURN_ORDER.EXCHANGE_AMT)
        ), //换货金额
        FINAL_ACTUAL_AMT: this.$OMS2.omsUtils.floatNumber(
          Number(OC_B_RETURN_ORDER.FINAL_ACTUAL_AMT)
        ), //最终应退总金额
        FINAL_REAL_AMT: this.$OMS2.omsUtils.floatNumber(
          Number(OC_B_RETURN_ORDER.FINAL_REAL_AMT)
        ), //最终实退总金额
      };
      R3.store.commit(
        `customize/returnAmount`,
        JSON.parse(JSON.stringify(returnAmount))
      );
      if (code === 0) {
        // 初始赋值
        let renderArr =
          this.$parent.$parent.panelRef === "退货明细"
            ? ["REFUND_ID", "QTY_REFUND"]
            : ["QTY_EXCHANGE", "PRICE_ACTUAL"]; // render
        if (this.$route.query.RETURN_SOURCE !== "手工新增") {
          renderArr = [];
        }
        this.renderHandle(renderArr);
        this.businessActionTable.data =
          this.$parent.$parent.panelRef === "退货明细"
            ? OC_B_RETURN_ORDER_REFUND_ITEMS
            : OC_B_RETURN_ORDER_EXCHANGE_ITEMS; // 数据

        // 存起来
        this.tableHead.tui = REFUND_ITEM_TABTH;
        this.tableHead.huan = EXCHANGE_ITEM_TABTH;
        this.toMainData.tui = OC_B_RETURN_ORDER_REFUND_ITEMS;
        this.toMainData.huan = OC_B_RETURN_ORDER_EXCHANGE_ITEMS;
        R3.store.commit(
          "customize/returnOrderChangeItem",
          JSON.parse(JSON.stringify(this.toMainData))
        );
        this.totalNum();
      }
    },
    // 获取SKU数据
    async getPlaceData(page = 0, pageSize = 10) {
      let self = this;
      if (page >= 1) page = `${page - 1}0`;
      this.replaceProductTable.loading = true;
      // 组合查询条件
      let { PS_C_PRO_ECODE, ECODE, ENAME } =
        this.replaceProductTable.businessFormConfig.formValue;
      // sku和spu同时存在 优先查询sku
      if (PS_C_PRO_ECODE && ECODE) PS_C_PRO_ECODE = '';
      let fixedcolumns = { PS_C_PRO_ECODE, ECODE, ENAME };
      let searchdata = {
        table: "PS_C_SKU",
        startindex: page,
        range: pageSize,
        fixedcolumns: fixedcolumns,
        column_include_uicontroller: true,
        isolr: false,
      };
      let formData = new FormData();
      formData.append("searchdata", JSON.stringify(searchdata));
      // 调用查询接口
      const {
        data: { code, data },
      } = await self.service.common.QueryList(formData, { serviceId: "r3-ps" });
      this.replaceProductTable.loading = false;
      if (code === 0) {
        // 处理表头和数据
        let columns = data.tabth.map((element) => ({
          title: `${element.name}`,
          key: `${element.colname}`,
          dataAcessKey: `${element.colname}`,
        }));
        this.replaceProductTable.columns = columns;
        // 处理数据
        let tableKey = data.row.length ? Object.keys(data.row[0]) : []; // 获取行数据的key
        this.getCurrenData = data.row.length ? data.row : [];
        this.replaceProductTable.total = data.totalRowCount;
        this.replaceProductTable.data = [];
        data.row.forEach((item) => {
          //处理数据
          let curentData = {};
          tableKey.forEach(
            (element) => (curentData[element] = item[element].val)
          );
          this.replaceProductTable.data.push(curentData);
        });
      }
    },
    // 模糊查询 数据
    async fuzzyquerybyak(search, colid) {
      let fixedcolumns = {}
      const formData = new FormData()
      formData.append('ak', search)
      formData.append('colid', colid)
      formData.append('fixedcolumns', JSON.stringify(fixedcolumns))
      const {
        data: { data },
      } = await this.service.common.fuzzyquerybyak(formData);
      colid === 171332 ? this.replaceProductTable.businessFormConfig.formData[0].AuotData = data : this.replaceProductTable.businessFormConfig.formData[2].AuotData = data
    },
    // 获取新增明细数据
    async getDetailModal() {
      const param = {
        OC_B_RETURN_ORDER_REFUND_ITEMS: this.toMainData.tui,
        SOURCE_CODE: this.$route.query.SOURCE_CODE
          ? this.$route.query.SOURCE_CODE
          : this.mainData.SOURCE_CODE,
      };
      this.loading = true;
      const {
        data: { code, data },
      } = await this.service.orderCenter
        .getReturnItemBySourceCode(param)
        .catch(() => {
          this.loading = false;
        });
      if (data) {
        this.tableConfig.columns = data.TABTH;
      }
      if (code == 0) {
        this.tableConfig.data = data.OC_B_RETURN_ORDER_REFUND_ITEMS;
      }
      this.loading = false;
    },
    /* --------------------- 工具函数/列表表格方法： --------------------- */
    // key对应的render方法
    renderHandle(arr) {
      // 退货 =》 可退货数量可编辑
      // 换货 =》 退货数量、成交单价
      let obj = {
        REFUND_ID: (h, params) => {
          return h("Input", {
            props: {
              value: params.row.REFUND_ID,
              autosize: true,
              regx: /^[A-Za-z0-9]+$/,
            },
            on: {
              "on-change": (e) => {
                setTimeout(() => {
                  const rI = e.target.value;
                  params.row.REFUND_ID = rI;
                  console.log(rI, params);
                  if (this.$route.params.customizedModuleId !== "New") {
                    this.toMainData[
                      this.$parent.$parent.panelRef === "退货明细"
                        ? "tui"
                        : "huan"
                    ][params.index] = params.row;
                    R3.store.commit(
                      "customize/returnOrderChangeItem",
                      JSON.parse(JSON.stringify(this.toMainData))
                    );
                  }
                  this.businessActionTable.data[params.index] = params.row;
                }, 300);
              },
            },
          });
        }, // 平台退款单号
        QTY_REFUND: (h, params) => {
          // 申请退货数量
          return h("InputNumber", {
            props: {
              value: params.row.QTY_REFUND,
              regx: /^[1-9]\d*$/,
              max: params.row.RETURNABLE_QTY || 1,
              min: 1,
              disabled: params.row.RETURNABLE_QTY == 1,
              editable: true,
            },
            on: {
              "on-change": (e) => {
                /**
                 * 1.计算退货金额 = 退货单价[AMT_REFUND_SINGLE] * 申请退货数量[QTY_REFUND]
                 * 2.默认为1，可手工调整，申请数量不能大于商品的可退数量，最小为1
                 *   购买数量 = 原平台单号商品的购买数量
                 *   成交单价&成交金额 = 原平台单号商品明细的金额信息
                 *   可退数量 = 发货数量 - 已退数量计算得出，默认加载带出
                 *   退货单价 = 成交单价
                 *   退货金额 = 退货单价 * 申请退货数量
                 */
                params.row.QTY_REFUND = e;
                params.row.REFUND_FEE = this.$OMS2.omsUtils.floatNumber(
                  Number(e) * Number(params.row.AMT_REFUND_SINGLE),
                  2
                );
                this.businessActionTable.data[params.index] = params.row;
                this.totalNum();
              },
            },
          });
        }, //退货数量
        QTY_EXCHANGE: (h, params) => {
          return h("InputNumber", {
            props: {
              value: Number(params.row.QTY_EXCHANGE || 1),
              regx: /^[1-9]\d*$/,
              min: 1,
              max: Number(params.row.RETURNABLE_QTY || 1),
            },
            on: {
              "on-change": (e) => {
                params.row.QTY_EXCHANGE = e;
                params.row.AMT_EXCHANGE = this.$OMS2.omsUtils.floatNumber(
                  Number(e) * Number(params.row.PRICE_ACTUAL),
                  2
                );
                if (this.$route.params.customizedModuleId !== "New") {
                  this.toMainData[
                    this.$parent.$parent.panelRef === "退货明细"
                      ? "tui"
                      : "huan"
                  ][params.index] = params.row;
                  R3.store.commit(
                    "customize/returnOrderChangeItem",
                    JSON.parse(JSON.stringify(this.toMainData))
                  );
                }
                this.totalNum();
              },
            },
          });
        }, //换货数量
        PRICE_ACTUAL: (h, params) => {
          return h("InputNumber", {
            props: {
              value: params.row.PRICE_ACTUAL,
              regx: /^(([0-9] .[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*.[0-9] )|([0-9]*[1-9][0-9]*))$/,
              min: 1,
            },
            on: {
              "on-change": (e) => {
                params.row.PRICE_ACTUAL = e;
                params.row.AMT_EXCHANGE = this.$OMS2.omsUtils.floatNumber(
                  Number(e) * Number(params.row.QTY_EXCHANGE),
                  2
                );
                this.businessActionTable.data[params.index] = params.row;
                this.toMainData[ this.$parent.$parent.panelRef === "退货明细" ? "tui"  : "huan" ][params.index] = params.row;
                R3.store.commit(
                  "customize/returnOrderChangeItem",
                  JSON.parse(JSON.stringify(this.toMainData))
                );
                this.totalNum();
                
              },
            },
          });
        }, //成交单价
      };
      // 查找对应的key添加render
      this.renderColumn.forEach((k, i) => {
        arr.includes(k.key) && (this.renderColumn[i].render = obj[k.key]);
      });
      // 赋值
      this.businessActionTable.columns = this.renderColumn;
      setTimeout(() => {
        if (this.businessActionTable.columns[0].key !== "selection") {
          this.businessActionTable.columns.unshift(
            {
              key: "selection",
              type: "selection",
              width: "50",
              align: "center",
            },
            {
              title: "序号",
              key: "index",
              type: "index",
              align: "center",
            }
          );
        }
      }, 500);
    },
    // 生成'合计'行
    totalNum() {
      const self = this;
      let amt = 0;
      let qty = 0;
      let PRICE_ACTUAL = 0;
      const key1 = this.$parent.$parent.panelRef === "退货明细" ? "QTY_REFUND" : "QTY_EXCHANGE"; // 申请退货数量 : 换货数量
      const key2 = this.$parent.$parent.panelRef === "退货明细" ? "REFUND_FEE" : "AMT_EXCHANGE"; // 退货金额 : 成交金额
      const key3 = this.$parent.$parent.panelRef === "退货明细" ? "PRO_ACTUAL_AMT" : "AMT_EXCHANGE"; // 商品应退金额 : 换货金额
      self.businessActionTable.totalData = [];
      if (!self.businessActionTable.data) return;
      self.businessActionTable.data.forEach((item) => {
        qty += Number(item[key1] || 0);
        amt = Util.accAdd(Number(item[key2]), Number(amt));
        PRICE_ACTUAL = Util.accAdd(Number(item['PRICE_ACTUAL']), Number(PRICE_ACTUAL));
      });
      setTimeout(() => {
        if (this.$parent.$parent.panelRef === "退货明细" ) {
          self.businessActionTable.totalData.push({
            selection: `${$i18n.t("other.total")}:`, // 合计
            REFUND_FEE: this.$OMS2.omsUtils.floatNumber(amt, 2),
            QTY_REFUND: qty,
            PRICE_ACTUAL: PRICE_ACTUAL // 成交单价
          });
        } else {
          self.businessActionTable.totalData.push({
            selection: `${$i18n.t("other.total")}:`,
            AMT_EXCHANGE: this.$OMS2.omsUtils.floatNumber(amt, 2),
            QTY_EXCHANGE: qty,
          });
        }
        // 计算'商品应退金额'
        this.toMainData[key3] = self.businessActionTable.totalData[0][key2];
        this.$emit("subTableData", this.toMainData);
        let returnAmount = R3.store.state.customize.returnAmount;
        let FINAL_ACTUAL_AMT;
        if (this.$route.params.tableName === "OC_B_RETURN_ORDER_ECXCHANGE_TABLE") {
          FINAL_ACTUAL_AMT =
            Number(returnAmount.PRO_REAL_AMT) +
            Number(returnAmount.SHIP_AMT) +
            Number(returnAmount.ADJUST_AMT) -
            Number(returnAmount.EXCHANGE_AMT);
            R3.store.commit(
              `customize/returnAmount`,
              JSON.parse(
                JSON.stringify({
                  EXCHANGE_AMT: this.$OMS2.omsUtils.floatNumber(amt, 2),
                  FINAL_ACTUAL_AMT: String(FINAL_ACTUAL_AMT),
                  FINAL_REAL_AMT: String(FINAL_ACTUAL_AMT),
                })
              )
          );
          console.log(String(FINAL_ACTUAL_AMT));
        } else {
          R3.store.commit(`customize/returnAmount`, {
            PRO_ACTUAL_AMT: this.$OMS2.omsUtils.floatNumber(amt, 2),
            PRO_REAL_AMT: this.$OMS2.omsUtils.floatNumber(amt, 2),
            EXCHANGE_AMT: this.$OMS2.omsUtils.floatNumber(amt, 2)
          });
          FINAL_ACTUAL_AMT =
            Number(returnAmount.PRO_REAL_AMT) +
            Number(returnAmount.SHIP_AMT) +
            Number(returnAmount.ADJUST_AMT);
          R3.store.commit(`customize/returnAmount`, {
            FINAL_ACTUAL_AMT: String(FINAL_ACTUAL_AMT),
            FINAL_REAL_AMT: String(FINAL_ACTUAL_AMT),
          });
        }
      }, 10);
    },
    // 退-新增明细弹窗-插入列表格的过滤处理-累加/直接push
    insertOrderDetail(dataArr = []) {
      const self = this;
      const data = dataArr;
      const allDa = self.businessActionTable.data;
      const pryKey =
        this.returnProduct == "0" ? "REFUND_ITEM_UNIQUE_KEY" : "PS_C_SKU_ECODE";
      let pryKeyArr = [];
      if (!allDa.length) {
        // 当前为空，则直接新增
        data.forEach((it) => {
          it.REFUND_FEE = this.$OMS2.omsUtils.floatNumber(
            it.QTY_REFUND * it.AMT_REFUND_SINGLE,
            2
          );
        });
        self.businessActionTable.data = data;
        self.totalNum();
        return;
      }
      data.forEach((it) => {
        it.REFUND_FEE = this.$OMS2.omsUtils.floatNumber(
          it.QTY_REFUND * it.AMT_REFUND_SINGLE,
          2
        );
        allDa.forEach((item) => {
          pryKeyArr = this.$OMS2.omsUtils.sonList(allDa, pryKey);
          if (it[pryKey] == item[pryKey]) {
            // 1.已经存在（数量累加起来，没超则累加，反之保持数量是最大值即可）
            const sumQ = item.QTY_REFUND + it.QTY_REFUND;
            if (item.RETURNABLE_QTY > sumQ) {
              item.QTY_REFUND += it.QTY_REFUND;
              item.REFUND_FEE = this.$OMS2.omsUtils.floatNumber(
                (Util.accAdd(item.REFUND_FEE, it.REFUND_FEE), 2)
              );
            } else {
              item.QTY_REFUND = it.RETURNABLE_QTY;
              console.log(
                "REFUND_ITEM_UNIQUE_KEY:",
                it[pryKey],
                "数量大了/刚好！"
              );
            }
          } else if (it[pryKey] && !pryKeyArr.includes(it[pryKey])) {
            // 2.不存在该条明细（则直接push）
            self.businessActionTable.data.push(it);
          } else {
            console.log("other!");
          }
        });
      });
      self.totalNum();
      self.toMainData.tui = self.businessActionTable.data;
    },
    /* -------------------- 退/换货明细 - 列表表格事件 -------------------- */
    // 退货明细 - 列表勾选
    returnOnSelect(selection, row) {
      this.detailsArrData = selection;
    },
    // 退货明细 - 取消勾选
    returnCancel(selection, row) {
      this.detailsArrData = selection;
    },
    // 退货明细 - 列表全选
    returnSelectAll(row) {
      this.detailsArrData = row;
    },
    // 退货明细 - 取消全选
    returnSelectAllCancel(row) {
      console.log(row);
    },
    // 删除明细 - 本地删
    deleteMainTableData() {
      /* 可能要判断是哪个明细的 */
      const self = this;
      self.isMainDelete = true;
      const allDa = self.businessActionTable.data;
      const selDa = self.detailsArrData;
      if (!selDa.length) {
        this.$OMS2.omsUtils.msgTips(self, "warning", "a8");
        return;
      }
      this.haveGift = "";
      this.haveGroup = "";
      selDa.forEach((it) => {
        this.selectTogether(it);
      });
      const haveGift = this.haveGift;
      const haveGroup = this.haveGroup;
      let msg, title, key;
      if (this.returnProduct == "0") {
        title = "删除退货商品";
        key = "REFUND_ITEM_UNIQUE_KEY";
        if (haveGift) {
          msg = `请确认是否删除当前选中的退货商品，还存在关联的挂靠赠品：${haveGift.replace(
            /(，|,)$/,
            " "
          )} ？`;
        } else if (haveGroup) {
          msg = `请确认是否删除当前选中的退货商品，还存在组合/福袋下挂的其他关联商品：${haveGroup.replace(
            /(，|,)$/,
            " "
          )} ？`;
        } else if (haveGift && haveGroup) {
          msg = `请确认是否删除当前选中的退货商品，还存在关联的挂靠赠品：${haveGift.replace(
            /(，|,)$/,
            " "
          )}，并且还存在组合/福袋下挂的其他关联商品：${haveGroup.replace(
            /，$/,
            ""
          )}。`;
        } else {
          msg = "请确认是否删除当前选中的退货商品？";
        }
      } else {
        title = "删除换货商品";
        key = "PS_C_SKU_ECODE";
        msg = "请确认是否删除当前选中的换货商品？";
      }
      this.$Modal.info({
        title,
        content: msg,
        width: 450,
        mask: true,
        showCancel: true,
        okText: $i18n.t("common.determine"), // 确定
        cancelText: $i18n.t("common.cancel"), // 取消
        onOk: () => {
          this.$nextTick(() => {
            // 取差集展示：
            self.businessActionTable.data = this.$OMS2.omsUtils.getDifferentArr(
              allDa,
              selDa,
              key
            );
            this.totalNum();
            self.detailsArrData = [];
            if (this.$route.params.customizedModuleId === "New") {
              this.toMainData[this.returnProduct == "0" ? "tui" : "huan"] =
                this.businessActionTable.data;
            } else {
              this.toMainData[
                this.$parent.$parent.panelRef === "退货明细" ? "tui" : "huan"
              ] = this.businessActionTable.data;
            }
            this.$emit("subTableData", this.toMainData);
            R3.store.commit(
              "customize/returnOrderChangeItem",
              JSON.parse(JSON.stringify(this.toMainData))
            );
          });
        },
        onCancel: () => {
          this.$emit("closeActionDialog", false);
        },
      });
    },
    /* -------------------- 退-添加明细 - 弹框 -------------------- */
    resetReturnMainTable() {
      console.log("添加明细 - 确定");
      const tui = this.tableConfig.data;
      const addToList = tui.filter((i) => i._checked);
      this.toMainData.tui = addToList;
      this.insertOrderDetail(addToList);
      this.$emit("subTableData", this.toMainData);
      this.tableConfig.data.forEach((it) => {
        it._checked = false;
      });
      this.indexL = [];
      R3.store.commit(
        "customize/returnOrderChangeItem",
        JSON.parse(JSON.stringify(this.toMainData))
      );
    },
    detailAddCancel() {
      this.$emit("closeActionDialog", false);
      this.tableConfig.data.forEach((it) => {
        it._checked = false;
      });
      this.indexL = [];
    },
    onSelectCancel(selection, row) {
      const self = this;
      self.tableConfig.selectData = selection;
      self.selectLen = selection.length;
      // const allDa = JSON.parse(JSON.stringify(self.tableConfig.data));
      self.tableConfig.data.forEach((item, index) => {
        // 拿到ID去原数组中找
        if (row.REFUND_ITEM_UNIQUE_KEY == item.REFUND_ITEM_UNIQUE_KEY) {
          // 1.把取消选中的项的_checked置为false
          item._checked = false;
          // 2.把保存在indexL中的序号删掉
          const tag = self.indexL.indexOf(index);
          if (tag != -1) self.indexL.splice(tag, 1);
        }
      });
    },
    onSelect(selection, row) {
      const self = this;
      self.tableConfig.selectData = selection;
      self.isMainDelete = false;
      this.selectTogether(row);
    },
    onSelectAllCancel(x) {
      const self = this;
      self.tableConfig.selectData = x;
      self.selectLen = x.length;
      self.indexL = [];
    },
    onSelectAll(x) {
      const self = this;
      self.tableConfig.selectData = x;
      self.selectLen = x.length;
    },
    /* -------------------- 添加/替换明细 - 弹框 -------------------- */
    // 加/替换明细 - 选中
    replaceOnSelect(row) {
      console.log(row);
      this.replaceProductTable.selectData = row;
    },
    pageChange(page) {
      console.log("page:", page);
      this.replaceProductTable.pageIndex = page;
      this.getPlaceData(page, this.replaceProductTable.pageSize);
    },
    pageSizeChange(size) {
      this.replaceProductTable.pageSize = size;
      this.getPlaceData(0, size);
    },
    // 加/替换明细 - 确定
    async replaceOk() {
      let self = this;
      let tableData = self.businessActionTable.data;
      let selectData = self.replaceProductTable.selectData; //新的对象换货明细
      let params = {
        ID: self.$route.params.itemId ? self.$route.params.itemId : -1, //明细id
        SOURCE_CODE: self.$route.query.SOURCE_CODE
          ? self.$route.query.SOURCE_CODE
          : self.mainData.SOURCE_CODE, //原平台单号
        PS_C_SKU_ECODE: selectData.ECODE, // sku
        OC_B_RETURN_ORDER_REFUND_ITEMS: self.toMainData.huan, // 换货单明细
      };
      const {
        data: { code, data, message },
      } = await self.service.orderCenter.getReturnExchangeItemBySkuECode(
        params
      );
      // 获取商品明细
      if (data.OC_B_RETURN_ORDER_EXCHANGE_ITEMS === null) {
        return;
      }
      let newItem = data.OC_B_RETURN_ORDER_EXCHANGE_ITEMS[0];
      let findObj = tableData.find((item) => {
        return item.PS_C_SKU_ECODE === newItem.PS_C_SKU_ECODE;
      });
      if (findObj) {
        let index = tableData.findIndex((item) => {
          return item.PS_C_SKU_ECODE === newItem.PS_C_SKU_ECODE;
        });
        findObj.QTY_EXCHANGE = Number(findObj.QTY_EXCHANGE) + 1;
      } else {
        tableData.push(newItem);
      }
      this.totalNum();
      this.toMainData.huan = tableData;
      R3.store.commit(
        "customize/returnOrderChangeItem",
        JSON.parse(JSON.stringify(this.toMainData))
      );
    },

    /* -------------------- 业务逻辑处理 -------------------- */
    /**
     * 1.PRD：
     *    非赠品商品选中后，如果挂靠赠品还有可退数量一并选中
     *    如果整单的非挂靠赠品（系统/平台）还有可退数量也一并选中
     *    如果当前选中的商品为组合/福袋中的下挂明细，则对应的其他下卦明细也一并选中
     * 2.系统/平台赠品：gift-type、group-mark俩都为空 且giftType != 0
     * 3.PRO_TYPE：0普通，other组合/福袋
     * 4.GIFT_RELATION：挂靠关系
     * 5.GROUP_GOODS_MARK：组合关系
     * 6.GIFT_TYPE：0非赠品，other赠品
     */
    selectTogether(row) {
      const pT = row.PRO_TYPE; // number
      const gR = row.GIFT_RELATION;
      const gM = row.GROUP_GOODS_MARK;
      const gT = row.GIFT_TYPE; // string
      // if (pT == 0) { // 普通
      // 筛选出gR值相等的一并选中，挂靠赠品
      gR && this.screen({ GIFT_RELATION: gR });
      // 筛选出gM值相等的一并选中，下挂组合
      gM && this.screen({ GROUP_GOODS_MARK: gM });
      // 普通品的非下卦赠品一并选中，其它赠品
      this.screen();
      // }
      if (this.isMainDelete) return;
      this.selectLen = 0;
      this.indexL = [...new Set(this.indexL)];
      const allDa = JSON.parse(JSON.stringify(this.tableConfig.data));
      allDa.forEach((it, index) => {
        if (it.REFUND_ITEM_UNIQUE_KEY == row.REFUND_ITEM_UNIQUE_KEY)
          this.indexL.push(index); // 记录当前选中行的index
        it._checked = [...new Set(this.indexL)].includes(index); // 标记当前选中行和一并选中行（设置checked=true）
      });
      this.selectLen = [...new Set(this.indexL)].length;
      this.tableConfig.data = allDa; // 渲染checked的样式
    },
    screen(o = {}) {
      const allDa = JSON.parse(JSON.stringify(this.tableConfig.data));
      const obj = o;
      const objL = Object.entries(obj).flat(2);
      allDa.forEach((it, index) => {
        if (objL.length && it[objL[0]] == obj[objL[0]]) {
          switch (objL[0]) {
            case "GIFT_RELATION":
              this.haveGift += `${it.PS_C_SKU_ECODE},`;
              break;
            case "GROUP_GOODS_MARK":
              this.haveGroup += `${it.PS_C_SKU_ECODE},`;
              break;
          }
          if (this.isMainDelete) return;
          this.indexL.push(index);
        } else {
          const gR = it.GIFT_RELATION;
          const gM = it.GROUP_GOODS_MARK;
          const gT = it.GIFT_TYPE;
          if (gT != "0" && !gM && !gR) {
            // 系统/平台赠品（是赠品&不存在挂靠关系&不存在组合关系）
            if (this.isMainDelete) return;
            this.indexL.push(index);
          }
        }
      });
    },
  },
};
</script>

<style lang="less">
.unFlodStyle {
  margin-right: 0;
}
#OC_B_RETURN_ORDER_VIRTUAL_TABLE,
#OC_B_RETURN_ORDER_ECXCHANGE_TABLE {
  #back {
    display: none;
  }
}
.switch {
    position: absolute;
    right: 0;
    top: 10px;
    color: #5461B8;
    cursor: pointer;
  }
</style>

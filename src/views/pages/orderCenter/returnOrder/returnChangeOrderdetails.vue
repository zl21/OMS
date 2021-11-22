<!--
 * @Author:xx
 * @Date: 2021-05-22 15:24:50
 * @LastEditTime: 2021-08-10 16:35:28
 * @LastEditors: Please set LastEditors
 * @Description: 退换货订单-新增-退货单明细
 * @FilePath: /front-standard-product/src/views/pages/orderCenter/returnOrder/returnGoods.vue
-->
<template>
  <div v-loading="loading">
    <!-- 退货明细 -->
    <OmsTable
      :jordan-table-config="actionTableCon"
      @on-select="returnOnSelect"
      @on-select-cancel="returnCancel"
      @on-select-all="returnSelectAll"
      @on-select-all-cancel="returnSelectAllCancel"
    />
    <!-- 退/添加明细弹框 添加商品-已选-->
    <Modal
      v-model="tableConfig.modal"
      width="900"
      titleAlign="left"
      :title="`${vmI18n.t('modalTitle.ac')}（${selectLen}）`"
      :mask="true"
      footer-hide
      @on-ok="resetReturnMainTable"
      @on-cancel="detailAddCancel"
      class-name="ark-dialog"
    >
      <OmsTable
        :jordan-table-config="tableConfig"
        @on-select="onSelect"
        @on-select-cancel="onSelectCancel"
        @on-select-all="onSelectAll"
        @on-select-all-cancel="onSelectAllCancel"
      />
      <OmsButton :btn-config="btnConfigTui" class="modal-footer" />
    </Modal>
    <!-- 替换/添加明细 -->
    <Modal
      v-model="replaceProductTable.modal"
      width="900"
      titleAlign="left"
      :title="vmI18n.t('btn.replaceDetail')"
      :mask="true"
      @on-ok="replaceOk"
      footer-hide
      class-name="ark-dialog"
    >
      <OmsTable
        :jordan-table-config="replaceProductTable"
        @on-row-click="replaceOnSelect"
        @on-page-change="pageChange"
        @on-page-size-change="pageSizeChange"
      />
      <OmsButton :btn-config="btnConfigHuan" class="modal-footer" />
    </Modal>
  </div>
</template>
<script>

import {
  // addDetailModalTableColumns,
  // tuiColumns,
  // huanColumns,
} from "./returnConfig.js";
import Util from "@/assets/js/public/publicMethods";

export default {
  name: "retunAddDetail",
  props: {
    mainData: {},
    returnProduct: {
      type: String,
      default: () => '0'
    },
  },
  data() {
    return {
      btnConfigTui: {
        typeAll: "default",
        btnsite: "right",
        buttons: [
          {
            text: $i18n.t('common.cancel'), // 取消
            btnclick: () => {
              this.detailAddCancel();
            },
          },
          {
            text: $i18n.t('common.determine'), // 确定
            type: 'primary',
            btnclick: () => {
              this.resetReturnMainTable();
            },
          },
        ],
      },
      btnConfigHuan: {
        typeAll: "default",
        btnsite: "right",
        buttons: [
          {
            text: $i18n.t('common.cancel'), // 取消
            btnclick: () => {
              // this.$emit("closeActionDialog", false);
              this.replaceProductTable.modal = false;
              this.empeyForm();
            },
          },
          {
            text: $i18n.t('common.determine'), // 确定
            type: 'primary',
            btnclick: () => {
              this.replaceOk();
            },
          },
        ],
      },
      keyGift: '',
      keyGroup: '',
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
      orderStatus: '',
      tableHead: {
        tui: [],
        huan: [],
      },
      toMainData: {
        tui: [],
        huan: [],
      }, // 传给主表的数据(用于保存)(监听时机:删除明细/新增确认)
      actionTableCon: {
        // businessFormConfig: {}, // 表单配置
        businessButtonConfig: {
          typeAll: "default", // 按钮统一风格样式
          btnsite: "left", // 按钮位置 (right , center , left)
          buttons: [
            {
              webname: 'returnOrderAddProductItem',
              type: "primary",
              text: $i18n.t('btn.addDetail'), // 按钮文本 新增明细
              isShow: true,
              btnclick: (e) => {
                if (
                  this.$route.params.customizedModuleId === "New" &&
                  !this.mainData.SOURCE_CODE
                ) {
                  // 原平台单号不能为空！
                  this.$Message.warning($i18n.t('modalTips.ho'));
                  return;
                }
                setTimeout(() => {
                  this.getDetailModal();
                }, 10);
              }, // 按钮点击事件
            },
            {
              webname: 'returnOrderReplaceProduct',
              type: "primary", // 按钮类型
              text: $i18n.t('btn.replaceDetail'), // 按钮文本 替换明细
              isShow: true,
              btnclick: (e) => {
                console.log(e);
                if (
                  this.$route.params.customizedModuleId === "New" &&
                  !this.mainData.SOURCE_CODE
                ) {
                  // 原平台单号不能为空！
                  this.$Message.warning($i18n.t('modalTips.ho'));
                  return;
                }
                this.getPlaceData(0, 0);
              }, // 按钮点击事件
            },
            {
              webname: 'returnOrderDeleteProductItem',
              type: "warning", // 按钮类型
              text: $i18n.t('btn.deleteDetail'), // 按钮文本 删除明细
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
        data: [], // 数据配置
        pageShow: false, // 控制分页是否显示
        loading: false,
        height: 280, // 表格高度
        indexColumn: true, // 是否显示序号
        isShowSelection: true, // 是否显示checkedbox
        border: true, // 是否显示纵向边框
        total: 0, // 设置总条数
        pageSizeOpts: [15, 30, 45, 60], // 每页条数切换的配置
        pageSize: 15, // 每页条数
      }, // 退货明细配置
      tableConfig: {
        modal: false,
        // businessFormConfig: {}, // 表单配置
        columns: [], // 表头
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
          btnsite: "right", // 按钮位置 (right , center , left)
          buttons: [
            {
              text: $i18n.t('btn.reset'), //重置
              btnclick: () => {
                this.resetFun();
                this.getPlaceData(0, this.replaceProductTable.pageSize);
              }, // 按钮点击事件
            },
            {
              type: "primary", // 按钮类型
              text: $i18n.t('btn.search'), // 按钮文本 搜索
              isShow: true,
              btnclick: (e) => {
                this.getPlaceData(1, this.replaceProductTable.pageSize);
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
              label: $i18n.t('table_label.code_SKU'),//SKU编码
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
                this.getPlaceData(1, this.replaceProductTable.pageSize);
              },
              dimSelect: (obj) => {
                this.replaceProductTable.businessFormConfig.formValue.ECODE = obj.tem.ECODE;
              },
              dimblur: () => { },
            },
            {
              label: $i18n.t('form_label.skuName'), //sku名称
              style: "dimSearch",
              width: "8",
              value: "ENAME",
              columns: ["ECODE"],
              AuotData: [], //匹配的选项
              dimChange: (search) => { },
              dimEnter: (val) => {
                this.getPlaceData(1, this.replaceProductTable.pageSize);
              },
              dimSelect: (obj) => {
                this.replaceProductTable.businessFormConfig.formValue.ENAME = obj.tem.ECODE;
              },

              dimblur: () => { },
            },
            {
              style: "dimSearch", //输入框类型
              label: $i18n.t('table_label.itemNo01'), //输入框前文字 SPU编码
              value: "PS_C_PRO_ECODE", //输入框的值
              columns: ["ENAME"],
              width: "8",
              AuotData: [], //匹配的选项
              dimChange: (search) => {
                this.fuzzyquerybyak(search, 165990)
              },
              dimEnter: (val) => {
                this.getPlaceData(1, this.replaceProductTable.pageSize);
              },
              dimSelect: (obj) => {
                this.replaceProductTable.businessFormConfig.formValue.PS_C_PRO_ECODE = obj.tem.ECODE;
              },
              dimblur: () => { },
            },
          ],
        }, // 表单配置
        height: 450, // 表格高度
        columns: [], // 表头
        data: [], // 数据配置
        selectData: [],
        pageShow: true, // 控制分页是否显示
        loading: false,
        indexColumn: true, // 是否显示序号
        border: true, // 是否显示纵向边框
        total: 0, // 设置总条数
        pageSizeOpts: [10, 20, 30, 50, 100], // 每页条数切换的配置
        pageSize: 10, // 每页条数
        isShowSelection: true, // 是否显示checkedbox
        highlightRow: true, // 高亮单选必须结合它
        multiple: false //false 单选
      }, // 弹框 - 添加/替换商品
      btnPermission: {},
    };
  },
  watch: {
    returnProduct: {
      async handler(newData) {
        // let tableName; // 接口表名
        let renderKeys = []; // render key
        // 判断新增页面是退货还是换货
        if (newData === "0") {
          console.log("退货单");
          // tableName = 'OC_B_RETURN_ORDER_REFUND_ITEM';
          renderKeys = ["REFUND_ID", "QTY_REFUND"];
          // this.getBtn();
          this.actionTableCon.businessButtonConfig.buttons[1].isShow = false;
          this.actionTableCon.businessButtonConfig.buttons[0].isShow = true;
          this.actionTableCon.businessButtonConfig.buttons[2].isShow = true;
          this.actionTableCon.data = this.toMainData.tui;
        } else if (newData === "1") {
          // tableName = 'OC_B_RETURN_ORDER_EXCHANGE';
          renderKeys = ["QTY_EXCHANGE", "AMT_EXCHANGE"];
          // this.getBtn();
          this.actionTableCon.businessButtonConfig.buttons[0].isShow = false;
          this.actionTableCon.businessButtonConfig.buttons[1].isShow = true;
          this.actionTableCon.businessButtonConfig.buttons[1].text = $i18n.t('btn.addDetail'); //新增明细
          this.actionTableCon.businessButtonConfig.buttons[2].isShow = true;
          this.actionTableCon.data = this.toMainData.huan;
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
        let BtnConfig = this.actionTableCon.businessButtonConfig.buttons;
        // 换货明细
        if (this.$parent.$parent.panelRef === $i18n.t('form_label.exchangeDetails')) {
          BtnConfig[0].isShow = false;
          BtnConfig[1].isShow = true;
          BtnConfig[2].isShow = false;
          // 平台
          if (this.$route.query.RETURN_SOURCE == $i18n.t('other.platForm')) {
            BtnConfig[1].isShow = false;
          }
          this.actionTableCon.columns = this.tableHead.huan;
          this.renderColumn = this.tableHead.huan;
          // 手工新增
          if (this.$route.query.RETURN_SOURCE !== $i18n.t('btn.addManually')) {
            this.renderHandle([["QTY_EXCHANGE"]]); //render方法
          } else {
            this.renderHandle([["REFUND_ID", "QTY_EXCHANGE"]]); //render方法
          }
          this.actionTableCon.data = this.toMainData.huan;
          // 退货明细
        } else if (this.$parent.$parent.panelRef === $i18n.t('form_label.returnDetails')) {
          // 平台
          if (this.$route.query.RETURN_SOURCE == $i18n.t('other.platForm')) {
            BtnConfig[0].isShow = false;
            BtnConfig[1].isShow = false;
            BtnConfig[2].isShow = false;
          }
          BtnConfig[1].isShow = false;
          this.actionTableCon.columns = this.tableHead.tui;
          this.renderColumn = this.tableHead.tui;
          // 手工新增
          if (this.$route.query.RETURN_SOURCE !== $i18n.t('btn.addManually')) {
            this.renderHandle([["QTY_EXCHANGE"]]); //render方法
          } else {
            this.renderHandle([["REFUND_ID", "QTY_EXCHANGE"]]); //render方法
          }
          this.actionTableCon.data = this.toMainData.tui;
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
    // 替换商品重置
    resetFun(){
      let formVlue = this.replaceProductTable.businessFormConfig.formValue
      formVlue.PS_C_PRO_ECODE = ''
      formVlue.ECODE = ''
      formVlue.ENAME = ''
    },
    // 获取按钮权限
    async getBtn() {
      return $OMS2.omsUtils.getPermissions(this, '', { table: 'OC_B_RETURN_ORDER', type: 'OBJ' }, true).then(res => {
        const { ACTIONS, SUB_ACTIONS } = res
        this.actionTableCon.businessButtonConfig.buttons.forEach(item => {
          if (!SUB_ACTIONS.some(y => y.webname === item.webname)) {
            item.isShow = false
          } else {
            SUB_ACTIONS.forEach((e) => {
              if (item.webname === e.webname) {
                item.isShow = true
              }
            })
          }
          if (this.$route.params.customizedModuleId === "New") {
            if (this.returnProduct == '0') {
              if (item.webname == 'returnOrderReplaceProduct') {
                item.isShow = false
              }
            } else {
              if (item.webname == 'returnOrderAddProductItem') {
                item.isShow = false
                item.text = $i18n.t('btn.addDetail'); //新增明细
              }
            }
          }
        })
        return this.actionTableCon.businessButtonConfig.buttons
      });
    },
    // 获取表头（新增）
    async getColumns() {
      const {
        data: {
          code,
          data,
          data: {
            REFUND_ITEM_TABTH, // 退-明细表头
            EXCHANGE_ITEM_TABTH, // 换-明细表头
            OC_B_RETURN_ORDER, // 主表
          },
          message,
        },
      } = await this.service.orderCenter.getALlOrderReturnAndItemInfo({
        ID: '-1',
        BILL_TYPE: this.mainData.billType || '0',
      });
      if (code == 0) {
        const tuiColumns = REFUND_ITEM_TABTH;
        const huanColumns = EXCHANGE_ITEM_TABTH;
        this.tableConfig.columns = tuiColumns;
        this.replaceProductTable.columns = huanColumns;
        this.renderColumn = this.returnProduct == "0" ? tuiColumns : huanColumns;
      }
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
      this.actionTableCon.columns =
        // 退货明细
        this.$parent.$parent.panelRef === $i18n.t('form_label.returnDetails')
          ? REFUND_ITEM_TABTH
          : EXCHANGE_ITEM_TABTH; //表头
      this.renderColumn =
        // 退货明细
        this.$parent.$parent.panelRef === $i18n.t('form_label.returnDetails')
          ? REFUND_ITEM_TABTH
          : EXCHANGE_ITEM_TABTH; // render
      // 退款金额
      let returnAmount = {
        PRO_ACTUAL_AMT: $utils.floatNumber(
          Number(OC_B_RETURN_ORDER.PRO_ACTUAL_AMT)
        ),
        PRO_REAL_AMT: $utils.floatNumber(
          Number(OC_B_RETURN_ORDER.PRO_REAL_AMT)
        ),
        SHIP_AMT: $utils.floatNumber(
          Number(OC_B_RETURN_ORDER.SHIP_AMT)
        ),
        ADJUST_AMT: $utils.floatNumber(
          Number(OC_B_RETURN_ORDER.ADJUST_AMT)
        ),
        EXCHANGE_AMT: $utils.floatNumber(
          Number(OC_B_RETURN_ORDER.EXCHANGE_AMT)
        ),
        FINAL_ACTUAL_AMT: $utils.floatNumber(
          Number(OC_B_RETURN_ORDER.FINAL_ACTUAL_AMT)
        ),
        FINAL_REAL_AMT: $utils.floatNumber(
          Number(OC_B_RETURN_ORDER.FINAL_REAL_AMT)
        ),
      };
      R3.store.commit(
        `customize/returnAmount`,
        JSON.parse(JSON.stringify(returnAmount))
      );
      if (code === 0) {
        // 初始赋值
        let renderArr =
          // 退货明细
          this.$parent.$parent.panelRef === $i18n.t('form_label.returnDetails')
            ? ["REFUND_ID", "QTY_REFUND"]
            : ["QTY_EXCHANGE", "AMT_EXCHANGE"]; // render
        // 手工新增
        if (this.$route.query.RETURN_SOURCE !== $i18n.t('btn.addManually')) {
          renderArr = [];
        }
        this.renderHandle(renderArr);
        this.actionTableCon.data =
          // 退货明细
          this.$parent.$parent.panelRef === $i18n.t('form_label.returnDetails')
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
      self.replaceProductTable.selectData = [];
      if (page >= 1) page = `${(page - 1) * pageSize}`;
      this.replaceProductTable.loading = true;
      // 组合查询条件
      let { PS_C_PRO_ECODE, ECODE, ENAME } =
        this.replaceProductTable.businessFormConfig.formValue;
      // sku和spu同时存在 优先查询sku
      if (PS_C_PRO_ECODE && ECODE) PS_C_PRO_ECODE = '';
      let fixedcolumns = { PS_C_PRO_ECODE, ECODE, ENAME, "ISACTIVE": ["Y"] };
      let searchdata = {
        table: "PS_C_SKU_TABLE",
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
        if (data.tabth[0].colname == 'ID') data.tabth.splice(0, 1);
        let columns = data.tabth.map((element) => ({
          title: `${element.name}`,
          key: `${element.colname}`,
          dataAcessKey: `${element.colname}`,
        }));
        this.replaceProductTable.columns = columns;
        // 处理数据
        let tableKey = data.row.length ? Object.keys(data.row[0]) : []; // 获取行数据的key
        this.getCurrenData = data.row.length ? data.row : [];
        this.replaceProductTable.total = page === 0 ? 0 : data.totalRowCount;
        this.replaceProductTable.data = [];
        data.row.forEach((item) => {
          //处理数据
          let curentData = {};
          tableKey.forEach(
            (element) => (curentData[element] = item[element].val)
          );
          this.replaceProductTable.data.push(curentData);
        });
        this.replaceProductTable.modal = true;
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
        this.tableConfig.modal = true;
        this.tableConfig.data = data.OC_B_RETURN_ORDER_REFUND_ITEMS;
      }
      this.loading = false;
    },
    /* --------------------- 工具函数/列表表格方法： --------------------- */
    // key对应的render方法
    renderHandle(arr) {
      let obj = {
        REFUND_ID: (h, params) => {
          // 平台退款单号 -- 退
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
                  this.actionTableCon.data[params.index] = params.row;
                }, 300);
              },
            },
          });
        },
        QTY_REFUND: (h, params) => {
          // 申请退货数量 -- 退
          return h("InputNumber", {
            props: {
              value: params.row.QTY_REFUND,
              regx: /^[1-9]\d*$/,
              max: Number(params.row.RETURNABLE_QTY || 1),
              min: 1,
              disabled: Number(params.row.RETURNABLE_QTY) == 1,
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
                params.row.REFUND_FEE = $utils.floatNumber(
                  Number(e) * Number(params.row.AMT_REFUND_SINGLE),
                  2
                );
                this.actionTableCon.data[params.index] = params.row;
                this.totalNum();
              },
            },
          });
        },
        QTY_EXCHANGE: (h, params) => {
          // 换货数量 -- 换
          return h("InputNumber", {
            props: {
              value: Number(params.row.QTY_EXCHANGE || 1),
              regx: /^[1-9]\d*$/,
              min: 1,
              // max: Number(params.row.RETURNABLE_QTY || 1), // 产品说该字段暂时不设上限
            },
            on: {
              "on-change": (e) => {
                params.row.QTY_EXCHANGE = e;
                // params.row.AMT_EXCHANGE = $utils.floatNumber(
                //   Number(e) * Number(params.row.PRICE_ACTUAL),
                //   2
                // );
                this.actionTableCon.data[params.index] = params.row;
                this.totalNum();
              },
            },
          });
        },
        // PRICE_ACTUAL: (h, params) => {
        //   // 成交单价 -- 换
        //   return h("Input", {
        //     props: {
        //       value: params.row.PRICE_ACTUAL,
        //       regx: /^\+?\d+\.{0,1}\d{0,2}$/, // 还有 0后面紧跟数字的情况没兼容
        //     },
        //     on: {
        //       "on-change": (v) => {
        //         const e = v.target.value;
        //         params.row.PRICE_ACTUAL = e;
        //         params.row.AMT_EXCHANGE = $utils.floatNumber(
        //           Number(e) * Number(params.row.QTY_EXCHANGE),
        //           2
        //         );
        //         this.actionTableCon.data[params.index] = params.row;
        //         this.totalNum();
        //       },
        //     },
        //   });
        // },
        AMT_EXCHANGE: (h, params) => {
          return h("Input", {
            props: {
              value: params.row.AMT_EXCHANGE,
              regx: /^\+?\d+\.{0,1}\d{0,2}$/, // 还有 0后面紧跟数字的情况没兼容
            },
            on: {
              "on-change": (v) => {
                const e = v.target.value;
                params.row.AMT_EXCHANGE = e;
                this.actionTableCon.data[params.index] = params.row;
                this.totalNum();
              },
            },
          });
        },
      };
      // 查找对应的key添加render
      this.renderColumn.forEach((k, i) => {
        arr.includes(k.key) && (this.renderColumn[i].render = obj[k.key]);
      });
      // 赋值
      this.actionTableCon.columns = this.renderColumn;
      /* setTimeout(() => {
        if (this.actionTableCon.columns[0].key !== "selection") {
          this.actionTableCon.columns.unshift(
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
      }, 500); */
    },
    // 生成'合计'行
    totalNum: _.debounce(function () {
      const self = this;
      let amt = 0, qty = 0, realAmt = 0;
      const key1 = self.returnProduct == "0" ? "QTY_REFUND" : "QTY_EXCHANGE"; // 申请退货数量 : 换货数量
      const key2 = self.returnProduct == "0" ? "REFUND_FEE" : "AMT_EXCHANGE"; // 退货金额 : 成交金额
      const key3 = self.returnProduct == "0" ? "PRO_ACTUAL_AMT" : "EX_ACTUAL_AMT"; // 商品应退金额 : 换货金额
      self.actionTableCon.totalData = [];
      if (!self.actionTableCon.data) return;
      self.actionTableCon.data.forEach((item) => {
        qty += Number(item[key1] || 0);
        amt = Util.accAdd(Number(item[key2]), Number(amt));
        realAmt = Util.accAdd(item.REAL_AMT || 0, realAmt)
      });
      setTimeout(() => {
        if (self.returnProduct == "0") {
          self.actionTableCon.totalData.push({
            index: `${$i18n.t("other.total")}:`, // 合计
            REFUND_FEE: $utils.floatNumber(amt, 2),
            QTY_REFUND: qty,
            REAL_AMT: realAmt,
          });
        } else {
          self.actionTableCon.totalData.push({
            index: `${$i18n.t("other.total")}:`,
            AMT_EXCHANGE: $utils.floatNumber(amt, 2),
            QTY_EXCHANGE: qty,
          });
        }
        // 计算'商品应退金额'
        self.toMainData[key3] = self.actionTableCon.totalData[0][key2];
        self.$emit("subTableData", self.toMainData);
      }, 10);
    }, 300),
    // 退-新增明细弹窗-插入列表格的过滤处理-累加/直接push
    insertOrderDetail(dataArr = []) {
      const self = this;
      const data = dataArr;
      const allDa = self.actionTableCon.data;
      const pryKey =
        this.returnProduct == "0" ? "REFUND_ITEM_UNIQUE_KEY" : "PS_C_SKU_ECODE";
      let pryKeyArr = [];
      if (!allDa.length) {
        // 当前为空，则直接新增
        data.forEach((it) => {
          it.REFUND_FEE = $utils.floatNumber(
            it.QTY_REFUND * it.AMT_REFUND_SINGLE,
            2
          );
        });
        self.actionTableCon.data = data;
        self.totalNum();
        return;
      }
      data.forEach((it) => {
        // 申请退货数量(QTY_REFUND * 退货单价(AMT_REFUND_SINGLE
        it.REFUND_FEE = $utils.floatNumber(
          it.QTY_REFUND * it.AMT_REFUND_SINGLE,
          2
        );
        allDa.forEach((item) => {
          pryKeyArr = this.$utils.sonList(allDa, pryKey);
          if (it[pryKey] == item[pryKey]) {
            // 1.已经存在（数量累加起来，没超则累加，反之保持数量是最大值即可）
            const sumQ = item.QTY_REFUND + it.QTY_REFUND;
            if (Number(item.RETURNABLE_QTY) > sumQ) {
              item.QTY_REFUND += it.QTY_REFUND;
              const sum = Util.accAdd(item.REFUND_FEE, it.REFUND_FEE)
              item.REFUND_FEE = $utils.floatNumber(sum);
            } else {
              item.QTY_REFUND = Number(it.RETURNABLE_QTY);
              const sum = Number(item.PRICE_ACTUAL) * Number(item.QTY_REFUND)
              item.REFUND_FEE = $utils.floatNumber(sum);
            }
          } else if (it[pryKey] && !pryKeyArr.includes(it[pryKey])) {
            // 2.不存在该条明细（则直接push）
            self.actionTableCon.data.push(it);
          } else {
            console.log("other!");
          }
        });
      });
      self.totalNum();
      self.toMainData.tui = self.actionTableCon.data;
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
    // 删除明细 - 本地删（可能要判断是哪个明细的
    deleteMainTableData() {
      const self = this;
      const allDa = self.actionTableCon.data;
      const selDa = self.detailsArrData;
      if (!selDa.length) {
        this.$OMS2.omsUtils.msgTips(self, "warning", "a8");
        return;
      }
      // 全选删
      if (selDa.length == allDa.length) {
        self.detailsArrData = [];
        this.actionTableCon.data = [];
        if (this.$route.params.customizedModuleId === "New") {
          this.toMainData[this.returnProduct == "0" ? "tui" : "huan"] =
            this.actionTableCon.data;
        }
        this.totalNum();
        this.$emit("subTableData", this.toMainData);
        R3.store.commit(
          "customize/returnOrderChangeItem",
          JSON.parse(JSON.stringify(this.toMainData))
        );
        return
      }
      // 部分删
      this.haveGift = "";
      this.haveGroup = "";
      this.keyGift = "";
      this.keyGroup = "";
      self.isMainDelete = true;
      const riuk = 'REFUND_ITEM_UNIQUE_KEY';
      selDa.forEach((it) => {
        this.selectTogether(it);
      });
      let haveGift = this.haveGift.replace(/(，|,)$/, "").split(',');
      let haveGroup = this.haveGroup.replace(/(，|,)$/, "").split(',');
      let msg, title, key, giftArr = [], groupArr = [], bothArr = [];
      let a1 = this.keyGift.replace(/(，|,)$/, "").split(',') || [];
      let a2 = this.keyGroup.replace(/(，|,)$/, "").split(',') || [];
      selDa.forEach(it => {
        // 若某挂靠已被选中，则：1.从提示语中去除该项
        if (a1.includes(it[riuk])) {
          const x = haveGift.indexOf(it.PS_C_SKU_ECODE);
          x != -1 && haveGift.splice(x, 1);
          // haveGift = haveGift.replace(it.PS_C_SKU_ECODE, '');
        }
        // 若某组合项已被选中，则： 1.从提示语中去除该项
        if (a2.includes(it[riuk])) {
          const y = haveGroup.indexOf(it.PS_C_SKU_ECODE);
          y != -1 && haveGroup.splice(y, 1);
          // haveGroup = haveGroup.replace(it.PS_C_SKU_ECODE, '');
        }
      })
      haveGift = Array.from(new Set(haveGift));
      haveGroup = Array.from(new Set(haveGroup));
      haveGift = haveGift.join(',').replace(/(，|,)$/, "");
      haveGroup = haveGroup.join(',').replace(/(，|,)$/, "");
      if (this.returnProduct == "0") {
        // 删除退货商品
        title = $i18n.t('modalTips.jk');
        key = "REFUND_ITEM_UNIQUE_KEY";
        if (haveGift && !haveGroup) {
          // 请确认是否删除当前选中的退货商品，还存在关联的挂靠赠品
          msg = `${$i18n.t('modalTips.jl')}：${haveGift} ？`;
          giftArr = allDa.filter(it => a1.includes(it[key]));
        } else if (haveGroup && !haveGift) {
          // 请确认是否删除当前选中的退货商品，还存在组合/福袋下挂的其他关联商品
          msg = `${$i18n.t('modalTips.jm')}：${haveGroup} ？`;
          groupArr = allDa.filter(it => a2.includes(it[key]));
        } else if (haveGift && haveGroup) {
          // 请确认是否删除当前选中的退货商品，还存在关联的挂靠赠品
          // 并且还存在组合/福袋下挂的其他关联商品
          msg = `${$i18n.t('modalTips.jl')}：${haveGift}，${$i18n.t('modalTips.jo')}：${haveGroup}。`;
          bothArr = [...giftArr, ...groupArr]
        } else {
          // 请确认是否删除当前选中的退货商品？
          msg = $i18n.t('modalTips.jp');
        }
      } else {
        title = $i18n.t('modalTips.jq'); // 删除换货商品
        key = "PS_C_SKU_ECODE";
        // 请确认是否删除当前选中的换货商品？
        msg = $i18n.t('modalTips.jr');
      }
      this.$Modal.info({
        title,
        content: msg,
        width: 450,
        mask: true,
        className: 'ark-dialog errTip',
        showCancel: true,
        okText: $i18n.t("common.determine"), // 确定
        cancelText: $i18n.t("common.cancel"), // 取消
        onOk: () => {
          this.$nextTick(() => {
            // 取差集展示：
            console.log(haveGift, haveGroup);
            const partList = [...selDa, ...giftArr, ...groupArr];
            self.actionTableCon.data = $utils.getDifferentArr(
              allDa,
              partList,
              key
            );
            this.totalNum();
            self.detailsArrData = [];
            if (this.$route.params.customizedModuleId === "New") {
              this.toMainData[this.returnProduct == "0" ? "tui" : "huan"] = this.actionTableCon.data;
            }
            this.$emit("subTableData", this.toMainData);
            R3.store.commit(
              "customize/returnOrderChangeItem",
              JSON.parse(JSON.stringify(this.toMainData))
            );
          });
          this.keyGift = '';
          this.keyGroup = '';
        },
        onCancel: () => {
          this.keyGift = '';
          this.keyGroup = '';
          this.$emit("closeActionDialog", false);
        },
      });
    },
    /* -------------------- 退-添加明细 - 弹框 -------------------- */
    resetReturnMainTable() {
      const tui = this.tableConfig.data;
      const addToList = tui.filter((i) => i._checked);
      if (!addToList.length) {
        this.$Message.warning($i18n.t('modalTips.gn')); // 请选择一条明细！
        return false
      } else {
        this.tableConfig.modal = false;
      }
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
      // this.$emit("closeActionDialog", false);
      this.tableConfig.modal = false;
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
          // self.indexL中有重复的序号，得先去重
          self.indexL = Array.from(new Set(self.indexL));
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
      this.tableConfig.data.forEach(i => i._checked = false);
      self.tableConfig.selectData = x;
      self.selectLen = x.length;
      self.indexL = [];
    },
    onSelectAll(x) {
      const self = this;
      this.tableConfig.data.forEach(i => i._checked = true);
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
      this.getPlaceData(1, size);
    },
    // 清空表单 - 关闭弹框时
    empeyForm() {
      this.replaceProductTable.businessFormConfig.formValue.PS_C_PRO_ECODE = '';
      this.replaceProductTable.businessFormConfig.formValue.ECODE = '';
      this.replaceProductTable.businessFormConfig.formValue.ENAME = '';
    },
    // 加/替换明细 - 确定
    async replaceOk() {
      let self = this;
      let tableData = self.actionTableCon.data;
      let selectData = self.replaceProductTable.selectData; //新的对象换货明细
      if (!Object.keys(selectData).length) {
        self.$Message.warning($i18n.t('modalTips.gl')); // 请选中一条明细！
        return false
      }
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
      if (code == 0) {
        self.replaceProductTable.modal = false;
        this.empeyForm();
      }
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
     * 2.系统/平台赠品：gift-type、group-mark俩都为空
     * 3.PRO_TYPE：0普通，other组合/福袋
     * 4.GIFT_RELATION：挂靠关系
     * 5.GROUP_GOODS_MARK：组合关系
     * 6.GIFT_TYPE：'0':普通，'1':系统赠品，'2'平台赠品
     */
    selectTogether(row) {
      const pT = row.PRO_TYPE; // number
      const gR = row.GIFT_RELATION;
      const gM = row.GROUP_GOODS_MARK;
      const gT = row.GIFT_TYPE; // string
      // if (pT == 0) { // 普通
      // 筛选出gR值相等的一并选中，挂靠赠品
      gR && this.screen('gR', row);
      // 筛选出gM值相等的一并选中，下挂组合
      gM && this.screen('gM', row);
      // 普通品的非卦靠赠品一并选中，其它(系统/平台)赠品
      // this.screen('other', row);
      // }
      if (this.isMainDelete) return;
      this.selectLen = 0;
      this.indexL = [...new Set(this.indexL)];
      const allDa = JSON.parse(JSON.stringify(this.tableConfig.data));
      const riuk = 'REFUND_ITEM_UNIQUE_KEY';
      allDa.forEach((it, index) => {
        if (it[riuk] == row[riuk])
          this.indexL.push(index); // 记录当前选中行的index
        it._checked = [...new Set(this.indexL)].includes(index); // 标记当前选中行和一并选中行（设置checked=true）
      });
      this.selectLen = [...new Set(this.indexL)].length;
      this.tableConfig.data = allDa; // 渲染checked的样式
    },
    // 查找一并选中的数据下标
    screen(flag, obj = {}) {
      const allDa = JSON.parse(JSON.stringify(this.isMainDelete ? this.actionTableCon.data : this.tableConfig.data));
      // const mainDa = JSON.parse(JSON.stringify(this.actionTableCon.data));
      // const obj = o;
      // const objL = Object.entries(obj).flat(2);
      allDa.forEach((it, index) => {
        const riuk = 'REFUND_ITEM_UNIQUE_KEY';
        switch (flag) {
          case 'gR':
            // const key = flag == 'gR' ? 'GIFT_RELATION' : 'GROUP_GOODS_MARK';
            let key = 'GIFT_RELATION';
            // 当前选中的是普通品 而非 赠品（GIFT_TYPE == '0' && PRO_TYPE == 0）
            if (it[key] == obj[key] && (obj.GIFT_TYPE === '0' && obj.PRO_TYPE === 0)) {
              // sku不相同，则给删除提示
              if (it.PS_C_SKU_ECODE !== obj.PS_C_SKU_ECODE) {
                // this[flag == 'gR' ? 'haveGift' : 'haveGroup'] += `${it.PS_C_SKU_ECODE},`;
                this.haveGift += `${it.PS_C_SKU_ECODE},`;
                this.keyGift += `${it[riuk]},`
              }
              if (this.isMainDelete) return;
              this.indexL.push(index);
            }
            break;
          case 'gM':
            let key1 = 'GROUP_GOODS_MARK';
            // 当前选中的是组合/福袋品（PRO_TYPE != 0）
            if (it[key1] == obj[key1] && obj.PRO_TYPE != 0) {
              if (it.PS_C_SKU_ECODE !== obj.PS_C_SKU_ECODE) {
                this.haveGroup += `${it.PS_C_SKU_ECODE},`;
                this.keyGroup += `${it[riuk]},`
              }
              if (this.isMainDelete) return;
              this.indexL.push(index);
            }
            let kk = 'GIFT_RELATION';
            if (obj[kk]) {
              // 组合品的赠品：
              allDa.forEach((x, y) => {
                // 赠品标识相同 && 是赠品 && 排除该组合的其它商品 && 排除该条本身
                if (x[kk] == obj[kk] && x.GIFT_TYPE != '0' && x[key1] != obj[key1] && x[riuk] != obj[riuk]) {
                  if (x.PS_C_SKU_ECODE !== obj.PS_C_SKU_ECODE) {
                    this.haveGift += `${x.PS_C_SKU_ECODE},`;
                    this.keyGift += `${x[riuk]},`
                  }
                  if (this.isMainDelete) return;
                  this.indexL.push(y);
                }
              })
            }
            break;
          case 'other':
            const gR = it.GIFT_RELATION;
            const gM = it.GROUP_GOODS_MARK;
            const gT = it.GIFT_TYPE;
            if (gT != "0") {
              //  && !gM && !gR 系统/平台赠品，可能是组合、可能是挂靠（即可能存在挂靠、可能存在组合关系
              // 系统/平台赠品（是赠品&不存在挂靠关系&不存在组合关系）---- 不实用了
              if (this.isMainDelete) return;
              this.indexL.push(index);
            }
            break;
          default:
            console.error('未考虑到的情况！');
            break;
        }
        /* const aa = it[objL[0]]; // ACTUAL_REFUND_FEE 字段
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
        } */
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
.errTip {
  .ark-modal-confirm-body-info {
    textarea {
      min-height: 55px;
    }
  }
}
</style>

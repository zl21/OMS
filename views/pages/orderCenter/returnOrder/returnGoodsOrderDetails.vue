<!--
 * @Author:xx
 * @Date: 2021-05-22 15:24:50
 * @LastEditTime: 2021-08-16 14:35:53
 * @LastEditors: Please set LastEditors
 * @Description: 退换货订单-详情-退货单明细
 * @FilePath: /front-standard-product/src/views/pages/orderCenter/returnOrder/returnGoods.vue
-->
<template>
  <div v-loading="loading">
    <!-- 如果是组合商品不显示  v-if="IS_GROUP"  -->
    <div class="switch" v-if="IS_COMBINATION">
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
      :title="`${vmI18n.t('modalTitle.ac')}（${selectLen}）`"
      :mask="true"
      @on-ok="resetReturnMainTable"
      @on-cancel="detailAddCancel"
      class-name="ark-dialog"
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
      titleAlign="left"
      :title="vmI18n.t('btn.replaceDetail')"
      :mask="true"
      @on-ok="replaceOk"
      class-name="ark-dialog"
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
      vmI18n:$i18n,
      IS_COMBINATION:0,//4 代表组合商品
      switchText: $i18n.t('form_label.b0'), //切换为sku商品展示
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
                  // this.$Message.warning("原平台单号不能为空！");
                  this.$Message.warning($i18n.t('modalTips.ho'));
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
              text: $i18n.t('btn.replaceDetail'), // 按钮文本 替换明细
              isShow: true,
              btnclick: (e) => {
                if(this.detailsArrData.length > 1){
                   this.$Message.warning($i18n.t('modalTips.dz'));
                   return false;
                }
                if (
                  this.$route.params.customizedModuleId === "New" &&
                  !this.mainData.SOURCE_CODE
                ) {
                  // this.$Message.warning("原平台单号不能为空！");
                  this.$Message.warning($i18n.t('modalTips.ho'));
                  return;
                }
                this.getPlaceData(0,0);
                this.replaceProductTable.modal = true;
              }, // 按钮点击事件
            },
            {
              webname: 'returnOrderDeleteProductItem',
              type: "warning", // 按钮类型
              text: $i18n.t('btn.deleteDetail'), // 按钮文本 删除明细
              isShow: true,
              btnclick: (e) => {
                this.deleteMainTableData();
              }, // 按钮点击事件
            },
          ],
        }, // 按钮配置
        columns: [],
        totalData: [],
        data: [
          {
            PS_C_SKU_ECODE: 0,
            PS_C_PRO_ECODE: 0,
            QTY_REFUND:0,
            AMT_REFUND_SINGLE:0,
            REFUND_FEE:0,
          }
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
        // businessFormConfig: {}, // 表单配置
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
                this.getPlaceData(0, this.replaceProductTable.pageSize);
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
                this.getPlaceData(0, this.replaceProductTable.pageSize);
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
                this.getPlaceData(0, this.replaceProductTable.pageSize);
              },
              dimSelect: (obj) => {
                this.replaceProductTable.businessFormConfig.formValue.PS_C_PRO_ECODE = obj.tem.ECODE;
              },
              dimblur: () => { },
            },
          ],
        }, // 表单配置
        columns: [], // 表头
        data: [], // 数据配置
        selectData: {},
        height: 460, // 表格高度
        pageShow: true, // 控制分页是否显示
        loading: false,
        indexColumn: true, // 是否显示序号
        border: true, // 是否显示纵向边框
        total: 0, // 设置总条数
        pageSizeOpts: [10, 20, 30,50,100], // 每页条数切换的配置
        pageSize: 10, // 每页条数
        isShowSelection: true, // 是否显示checkedbox
        highlightRow: true, // 展示单选radio，结合isShowSelection使用
        multiple: false
      }, // 弹框 - 添加/替换商品
      btnPermission: {},
    };
  },
  watch: {
    returnProduct: {
      async handler(newData) {
        let renderKeys = []; // render key
        // if (newData === "0") {
        //   renderKeys = ["REFUND_ID", "QTY_REFUND"];
        //   this.businessActionTable.businessButtonConfig.buttons[1].isShow = false;
        //   this.businessActionTable.businessButtonConfig.buttons[0].isShow = true;
        //   this.businessActionTable.businessButtonConfig.buttons[2].isShow = true;
        //   this.businessActionTable.data = this.toMainData.tui;
        // } else if (newData === "1") {
        //   renderKeys = ["QTY_EXCHANGE", "PRICE_ACTUAL"];
        //   this.businessActionTable.businessButtonConfig.buttons[0].isShow = false;
        //   this.businessActionTable.businessButtonConfig.buttons[1].isShow = true;
        //   this.businessActionTable.businessButtonConfig.buttons[1].text = $i18n.t('btn.addDetail');//新增明细
        //   this.businessActionTable.businessButtonConfig.buttons[2].isShow = true;
        //   this.businessActionTable.data = this.toMainData.huan;
        // }
      },
      immediate: true,
    },
  },
  async created() {
    this.getReplaceData(this.$route.params.itemId);
    let ZH = localStorage.getItem("locale") == "zh"
    if(!ZH) document.getElementById('refresh').innerHTML = "Refresh";
  },
  async activated() {
    this.panelReturn = ["tapComponent.returnGoodsDetails",'tapComponent.returnDetails'].includes(this.$parent.$parent.panelInstance);
    //编辑页面 换货/退货逻辑
    this.getBtn().then((res) => {
      let BtnConfig = this.businessActionTable.businessButtonConfig.buttons;
      // 换货明细
      if (this.$parent.$parent.panelInstance === "tapComponent.changeGoodsDetails") {
        BtnConfig[0].isShow = false;
        BtnConfig[1].isShow = true;
        BtnConfig[2].isShow = true;
        this.businessActionTable.columns = this.tableHead.huan;
        this.renderColumn = this.tableHead.huan;
        // 手工新增
        setTimeout(() => {
            this.renderHandle([ "DISPUTE_ID","QTY_EXCHANGE","AMT_EXCHANGE"]) //render方法
          }, 100);
        this.businessActionTable.data = this.toMainData.huan;
        // 退货明细
      } else if (this.panelReturn) {
        this.businessActionTable.columns = this.tableHead.tui;
        this.renderColumn = this.tableHead.tui;
        if (this.$parent.$parent.panelInstance === 'tapComponent.returnDetails' && this.$route.query.RETURN_SOURCE !== '手工新增') {
          BtnConfig[0].isShow = false;
          BtnConfig[1].isShow = false;
          BtnConfig[2].isShow = false;
          this.businessActionTable.columns = this.businessActionTable.columns.filter((i) => delete i.render);
        }else{
          BtnConfig[0].isShow = true;
          BtnConfig[1].isShow = false;
          BtnConfig[2].isShow = true;
          setTimeout(() => {
            this.renderHandle(["REFUND_ID", "QTY_REFUND"]); //render方法
          }, 100);
        }
        this.businessActionTable.data = this.toMainData.tui;
      }
      // 判断如果单据状态为确认/完成/取消 不可编辑  下发WMS状态 0：未下发 1: 下发中 2:下发成功 3:下发失败 4:撤回成功
      setTimeout(() => {
        if (this.orderStatus !== 0 || ![0,3].includes(this.wmsIssueStatus)) {
          BtnConfig[0].isShow = false;
          BtnConfig[1].isShow = false;
          BtnConfig[2].isShow = false;
          this.businessActionTable.columns = this.businessActionTable.columns.filter((i) => delete i.render);
        }
      }, 100);
    })
  },
  async mounted() {
    let self = this;
    window.addEventListener("customizeClick", function (e) {
      let text = e.detail.type || "";
      if (text === "save" && e.detail.res.data.oK) {
        self.save();
      }
    });
    setTimeout(() => {
      let ZH = localStorage.getItem("locale") == "zh"
      if(!ZH) {
        const btnDomArr = document.getElementsByClassName('ark-btn-fcdefault');
        for (let i = 0; i < btnDomArr.length; i++) {
          btnDomArr[i].innerHTML  = btnDomArr[i].innerHTML == '返回' ? 'Back' : btnDomArr[i].innerHTML;
          btnDomArr[i].innerHTML  = btnDomArr[i].innerHTML == '保存' ? 'Save' : btnDomArr[i].innerHTML;
        }
        const panelDomArr = document.getElementsByClassName('ark-tabs-panels-tab');
        for (let y = 0; y < panelDomArr.length; y++) {
          // debugger
          panelDomArr[y].innerText  = panelDomArr[y].innerText == '退货明细' ? 'Return Detail' : panelDomArr[y].innerText;
          panelDomArr[y].innerText  = panelDomArr[y].innerText == '换货明细' ? 'Explacement Detail' : panelDomArr[y].innerText;
          panelDomArr[y].innerText  = panelDomArr[y].innerText == '操作日志' ? 'Operation Log' : panelDomArr[y].innerText;
        }
      }
    }, 10);
  },
  methods: {
    // 替换商品重置
    resetFun(){
      let formVlue = this.replaceProductTable.businessFormConfig.formValue
      formVlue.PS_C_PRO_ECODE = ''
      formVlue.ECODE = ''
      formVlue.ENAME = ''
    },
    // 切换商品展示类型
    onSitch(){
      // 切换为sku商品展示 切换为平台商品展示
      this.isSku ? this.switchText = $i18n.t('form_label.b0') : this.switchText = $i18n.t('form_label.b1');
      this.isSku = !this.isSku;
      this.getDetailsData(!this.isSku);
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
                item.text = $i18n.t('btn.addDetail');//新增明细
              }
            }
          }
        })
        return this.businessActionTable.businessButtonConfig.buttons
      });
    },
    // 获取详情数据
    async getReplaceData(objid) {
      this.loading = true;
      const {
        data: {
          code,
          data,
          data: {
            REFUND_ITEM_TABTH, //退单表头
            EXCHANGE_ITEM_TABTH, // 换表头
            OC_B_RETURN_ORDER, //主表
            OC_B_RETURN_ORDER_EXCHANGE_ITEMS,
            OC_B_RETURN_ORDER_REFUND_ITEMS
          },
          message,
        },
      } = await this.service.orderCenter.getALlOrderReturnAndItemInfo({
        ID: objid,
      });
      // 获取状态
      this.orderStatus = OC_B_RETURN_ORDER.RETURN_STATUS;
      this.wmsIssueStatus = OC_B_RETURN_ORDER.WMS_ISSUE_STATUS
      sessionStorage.setItem("RETURN_STATUS", JSON.stringify(OC_B_RETURN_ORDER.RETURN_STATUS));
      sessionStorage.setItem("WMS_ISSUE_STATUS", JSON.stringify(OC_B_RETURN_ORDER.WMS_ISSUE_STATUS));
      let orderStatus = sessionStorage.getItem("RETURN_STATUS");
      let wmsIssueStatus = sessionStorage.getItem("WMS_ISSUE_STATUS");
      this.IS_COMBINATION = OC_B_RETURN_ORDER.IS_COMBINATION;
      // 退货明细
      this.businessActionTable.columns = this.panelReturn ? REFUND_ITEM_TABTH : EXCHANGE_ITEM_TABTH; //表头
      // 退货明细
      this.renderColumn = this.panelReturn ? REFUND_ITEM_TABTH : EXCHANGE_ITEM_TABTH; // render
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
        this.businessActionTable.data =this.panelReturn ? OC_B_RETURN_ORDER_REFUND_ITEMS: OC_B_RETURN_ORDER_EXCHANGE_ITEMS; // 数据
        // 表头存起来
        this.tableHead.tui = REFUND_ITEM_TABTH;
        this.tableHead.huan = EXCHANGE_ITEM_TABTH;
        // 处理数据 -- 退换货明细
        // PT_SKU true平台 false商品
        this.getDetailsData(true);
      }
      this.loading = false;
    },
    // 获取明细详情数据
    async getDetailsData(PT_SKU){
      console.log();
      const {
        data: {
          code,
          data,
          data: {
            OC_B_RETURN_ORDER,
            OC_B_RETURN_ORDER_EXCHANGE_ITEMS,
            OC_B_RETURN_ORDER_REFUND_ITEMS
          },
          message,
        },
      } = await this.service.orderCenter.getALlOrderReturnAndItemInfo({
        BILL_TYPE:this.$route.params.tableName === "OC_B_RETURN_ORDER_ECXCHANGE_TABLE" ? 1 : 0,
        ID: this.$route.params.itemId,
        PT_SKU
      });
      this.businessActionTable.data = this.panelReturn ? OC_B_RETURN_ORDER_REFUND_ITEMS : OC_B_RETURN_ORDER_EXCHANGE_ITEMS; // 数据
      this.toMainData.tui = OC_B_RETURN_ORDER_REFUND_ITEMS;
      this.toMainData.huan = OC_B_RETURN_ORDER_EXCHANGE_ITEMS;
      R3.store.commit(
        "customize/returnOrderChangeItem",
        JSON.parse(JSON.stringify(this.toMainData))
      );
      this.totalNum();
    },
    // 获取SKU数据
    async getPlaceData(page = 0, pageSize = 10) {
      let self = this;
      this.replaceProductTable.loading = true;
      // 组合查询条件
      let { PS_C_PRO_ECODE, ECODE, ENAME } = this.replaceProductTable.businessFormConfig.formValue;
      // sku和spu同时存在 优先查询sku
      if (PS_C_PRO_ECODE && ECODE) PS_C_PRO_ECODE = '';
      let fixedcolumns = { PS_C_PRO_ECODE, ECODE, ENAME };
      let searchdata = {
        table: "PS_C_SKU_TABLE",
        startindex: (Number(page) - 1)<0 ? 0 : (Number(page) - 1)  * pageSize,
        range: pageSize,
        fixedcolumns: fixedcolumns,
        column_include_uicontroller: true,
        ISACTIVE:"Y",
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
        this.replaceProductTable.columns = columns.filter((item) => item.key !='ID');
        // 处理数据
        let tableKey = data.row.length ? Object.keys(data.row[0]) : []; // 获取行数据的key
        this.getCurrenData = data.row.length ? data.row : [];
        this.replaceProductTable.total = pageSize ? data.totalRowCount : 0;
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
        DISPUTE_ID: (h, params) => {
          return h("Input", {
            props: {
              value: params.row.DISPUTE_ID,
              autosize: true,
              regx: /^[A-Za-z0-9]+$/,
            },
            on: {
              "on-change": (e) => {
                setTimeout(() => {
                  const rI = e.target.value;
                  params.row.DISPUTE_ID = rI;
                  // 退货明细
                    this.toMainData["huan"][params.index] = params.row;
                    R3.store.commit(
                      "customize/returnOrderChangeItem",
                      JSON.parse(JSON.stringify(this.toMainData))
                    );
                  this.businessActionTable.data[params.index] = params.row;
                }, 300);
              },
            },
          });
        }, // 平台退换货单号	
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
                  if (this.$route.params.customizedModuleId !== "New") {
                    // 退货明细
                    this.toMainData[this.panelReturn ? "tui" : "huan"][params.index] = params.row;
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
              max: params.row.REAL_RETURNABLE_QTY || 0,
              min: 0,
              // disabled: params.row.REAL_RETURNABLE_QTY == 1,
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
                R3.store.commit(
                  "customize/returnOrderChangeItem",
                  JSON.parse(JSON.stringify(this.toMainData))
                );
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
              // max: Number(params.row.RETURNABLE_QTY || 1), // 产品说该字段暂时不设上限
            },
            on: {
              "on-change": (e) => {
                params.row.QTY_EXCHANGE = e;
                // params.row.AMT_EXCHANGE = this.$OMS2.omsUtils.floatNumber(
                //   Number(e) * Number(params.row.PRICE_ACTUAL),
                //   2
                // );
                if (this.$route.params.customizedModuleId !== "New") {
                  this.toMainData[this.panelReturn ? "tui" : "huan"][params.index] = params.row;
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
        // PRICE_ACTUAL: (h, params) => {
        //   return h("Input", {
        //     props: {
        //       value: params.row.PRICE_ACTUAL,
        //       regx: /^\+?\d+\.{0,1}\d{0,2}$/, // 还有 0后面紧跟数字的情况没兼容
        //       min: 1,
        //     },
        //     on: {
        //       "on-change": (e) => {
        //         params.row.PRICE_ACTUAL = e.target.value;
        //         params.row.AMT_EXCHANGE = this.$OMS2.omsUtils.floatNumber(Number(e.target.value) * Number(params.row.QTY_EXCHANGE || 0));
        //         this.businessActionTable.data[params.index] = params.row;
        //         // 退货明细
        //         this.toMainData[this.panelReturn ? "tui" : "huan"][params.index] = params.row;
        //         R3.store.commit(
        //           "customize/returnOrderChangeItem",
        //           JSON.parse(JSON.stringify(this.toMainData))
        //         );
        //         this.totalNum();
                
        //       },
        //     },
        //   });
        // }, //成交单价
        AMT_EXCHANGE: (h, params) => {
          return h("Input", {
            props: {
              value: params.row.AMT_EXCHANGE,
              regx: /^\+?\d+\.{0,1}\d{0,2}$/, // 还有 0后面紧跟数字的情况没兼容
            },
            on: {
              "on-change": (e) => {
                params.row.AMT_EXCHANGE = e.target.value;
                this.businessActionTable.data[params.index] = params.row;
                // 退货明细
                this.toMainData[this.panelReturn ? "tui" : "huan"][params.index] = params.row;
                R3.store.commit(
                  "customize/returnOrderChangeItem",
                  JSON.parse(JSON.stringify(this.toMainData))
                );
                this.totalNum();
                
              },
            },
          });
        }, //换货金额
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
              title: $i18n.t('table_label.serialNo'), // 序号
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
      let REAL_AMT = 0;
      // 退货明细
      const key1 = this.panelReturn ? "QTY_REFUND" : "QTY_EXCHANGE"; // 申请退货数量 : 换货数量
      const key2 = this.panelReturn ? "REFUND_FEE" : "AMT_EXCHANGE"; // 退货金额 : 成交金额
      const key3 = this.panelReturn ? "PRO_ACTUAL_AMT" : "AMT_EXCHANGE"; // 商品应退金额 : 换货金额
      self.businessActionTable.totalData = [];
      if (!self.businessActionTable.data) return;
      self.businessActionTable.data.forEach((item) => {
        qty += Number(item[key1] || 0);
        amt = Util.accAdd(Number(item[key2]), Number(amt));
        REAL_AMT = Util.accAdd(Number(item['REAL_AMT']), Number(REAL_AMT));
      });
      setTimeout(() => {
        // 退货明细
        if(self.businessActionTable.totalData.length) return;
        if (this.panelReturn) {
          self.businessActionTable.totalData.push({
            index: `${$i18n.t("other.total")}`, // 合计
            REFUND_FEE: this.$OMS2.omsUtils.floatNumber(amt),
            QTY_REFUND: qty,
            REAL_AMT: this.$OMS2.omsUtils.floatNumber(REAL_AMT) // 成交单价
          });
        } else {
          self.businessActionTable.totalData.push({
            index: `${$i18n.t("other.total")}:`,
            AMT_EXCHANGE: this.$OMS2.omsUtils.floatNumber(amt),
            QTY_EXCHANGE: qty,
          });
        }
        // 计算'商品应退金额'
        this.toMainData[key3] = self.businessActionTable.totalData[0][key2];
        this.$emit("subTableData", this.toMainData);
        let returnAmount = R3.store.state.customize.returnAmount;
        let FINAL_ACTUAL_AMT;
        if (this.$route.params.tableName === "OC_B_RETURN_ORDER_ECXCHANGE_TABLE") {
            if(this.panelReturn){
              R3.store.commit(`customize/returnAmount`,JSON.parse(JSON.stringify({
                    PRO_ACTUAL_AMT: this.$OMS2.omsUtils.floatNumber(amt)
                  })
                )
              );
            FINAL_ACTUAL_AMT = Number(returnAmount.PRO_ACTUAL_AMT) + Number(returnAmount.SHIP_AMT) + Number(returnAmount.ADJUST_AMT) - Number(returnAmount.EXCHANGE_AMT);
            R3.store.commit(`customize/returnAmount`,JSON.parse(JSON.stringify({
                    FINAL_ACTUAL_AMT: this.$OMS2.omsUtils.floatNumber(FINAL_ACTUAL_AMT),
                  })
                )
              );
            }else{
              R3.store.commit( `customize/returnAmount`, JSON.parse( JSON.stringify({
                    EXCHANGE_AMT: this.$OMS2.omsUtils.floatNumber(amt),
                  })
                )
              );
            FINAL_ACTUAL_AMT = Number(returnAmount.PRO_ACTUAL_AMT) + Number(returnAmount.SHIP_AMT) + Number(returnAmount.ADJUST_AMT) - Number(returnAmount.EXCHANGE_AMT);
            R3.store.commit( `customize/returnAmount`, JSON.parse( JSON.stringify({
                  FINAL_ACTUAL_AMT: this.$OMS2.omsUtils.floatNumber(FINAL_ACTUAL_AMT),
                })
              )
            );
          }
        } else {
          R3.store.commit(`customize/returnAmount`, {
            PRO_ACTUAL_AMT: this.$OMS2.omsUtils.floatNumber(amt),
            EXCHANGE_AMT: this.$OMS2.omsUtils.floatNumber(amt)
          });
          FINAL_ACTUAL_AMT =
            Number(returnAmount.PRO_ACTUAL_AMT) +
            Number(returnAmount.SHIP_AMT) +
            Number(returnAmount.ADJUST_AMT);
          R3.store.commit(`customize/returnAmount`, {
            FINAL_ACTUAL_AMT: this.$OMS2.omsUtils.floatNumber(FINAL_ACTUAL_AMT),
          });
        }
      }, 10);
    },
    // 退-新增明细弹窗-插入列表格的过滤处理-累加/直接push
    insertOrderDetail(dataArr = []) {
      const self = this;
      const data = dataArr;
      const allDa = self.businessActionTable.data;
      const pryKey = this.panelReturn ? "REFUND_ITEM_UNIQUE_KEY" : "PS_C_SKU_ECODE";
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
            if (Number(item.REAL_RETURNABLE_QTY) > sumQ) {
              item.QTY_REFUND += it.QTY_REFUND;
              const sum = Util.accAdd(item.REFUND_FEE, it.REFUND_FEE)
              item.REFUND_FEE = this.$OMS2.omsUtils.floatNumber(sum);
            } else {
              item.QTY_REFUND = Number(item.REAL_RETURNABLE_QTY);
              const sum = Number(item.PRICE_ACTUAL) * Number(item.QTY_REFUND)
              item.REFUND_FEE = this.$OMS2.omsUtils.floatNumber(sum);
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
    },
    // 删除明细 - 本地删
    deleteMainTableData() {
      /* 可能要判断是哪个明细的 */
      const self = this;
      self.isMainDelete = true;
      const allDa = self.businessActionTable.data;
      const selDa = self.detailsArrData;
      if (!selDa.length) {
        self.$OMS2.omsUtils.msgTips(self, "warning", "a8");
        return;
      }
      if (selDa.length == allDa.length) { // 全选删
        self.detailsArrData = [];
        self.businessActionTable.data = [];
        self.toMainData[self.panelReturn ? 'tui':'huan'] = self.businessActionTable.data;
        R3.store.commit(
          "customize/returnOrderChangeItem",
          JSON.parse(JSON.stringify(self.toMainData))
        );
         self.totalNum();
        return
      }
      self.haveGift = "";
      self.haveGroup = "";
      selDa.forEach((it) => {
        self.selectTogether(it);
      });
      const haveGift = self.haveGift;
      const haveGroup = self.haveGroup;
      let msg, title, key;
      if (self.panelReturn) {
        // 删除退货商品
        title = $i18n.t('modalTips.jk');
        key = "REFUND_ITEM_UNIQUE_KEY";
        if (haveGift) {
          // 请确认是否删除当前选中的退货商品，还存在关联的挂靠赠品
          msg = `${$i18n.t('modalTips.jl')}：${haveGift.replace(
            /(，|,)$/,
            " "
          )} ？`;
        } else if (haveGroup) {
          // 请确认是否删除当前选中的退货商品，还存在组合/福袋下挂的其他关联商品
          msg = `${$i18n.t('modalTips.jm')}：${haveGroup.replace(
            /(，|,)$/,
            " "
          )} ？`;
        } else if (haveGift && haveGroup) {
          // 请确认是否删除当前选中的退货商品，还存在关联的挂靠赠品
          // 并且还存在组合/福袋下挂的其他关联商品
          msg = `${$i18n.t('modalTips.jl')}：${haveGift.replace(
            /(，|,)$/,
            " "
          )}，${$i18n.t('modalTips.jo')}：${haveGroup.replace(
            /，$/,
            ""
          )}。`;
        } else {
          // 请确认是否删除当前选中的退货商品？
          msg = $i18n.t('modalTips.jp');
        }
      } else {
        title = $i18n.t('modalTips.jq');; // 删除换货商品
        key = "PS_C_SKU_ECODE";
        // 请确认是否删除当前选中的换货商品？
        msg = $i18n.t('modalTips.jr');
      }
      self.$Modal.info({
        title,
        content: msg,
        width: 450,
        className: 'ark-dialog',
        mask: true,
        showCancel: true,
        okText: $i18n.t("common.determine"), // 确定
        cancelText: $i18n.t("common.cancel"), // 取消
        onOk: () => {
          self.$nextTick(() => {
            // 取差集展示：
            self.businessActionTable.data = self.$OMS2.omsUtils.getDifferentArr(
              allDa,
              selDa,
              key
            );
            self.totalNum();
            self.toMainData[self.panelReturn ? 'tui':'huan'] = self.businessActionTable.data
            R3.store.commit(
              "customize/returnOrderChangeItem",
              JSON.parse(JSON.stringify(self.toMainData))
            );
          });
        },
        onCancel: () => {
          self.$emit("closeActionDialog", false);
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
      this.replaceProductTable.selectData = row;
    },
    pageChange(page) {
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
      let tableData = self.businessActionTable.data; // 添加
      let replaceArr = [] //替换
      let selectData = self.replaceProductTable.selectData; //新的对象换货明细
      if (JSON.stringify(selectData) == "{}") {
        self.$Message.warning($i18n.t('modalTips.gl')); // 请选中一条明细！
        return;
      }
      let params = {
        ID: self.$route.params.itemId ? self.$route.params.itemId : -1, //明细id
        SOURCE_CODE: self.$route.query.SOURCE_CODE ? self.$route.query.SOURCE_CODE : self.mainData.SOURCE_CODE, //原平台单号
        PS_C_SKU_ECODE: selectData.ECODE, // sku
        OC_B_RETURN_ORDER_REFUND_ITEMS: self.toMainData.huan, // 换货单明细
      };
      const {
        data: { code, data, message },
      } = await self.service.orderCenter.getReturnExchangeItemBySkuECode(
        params
      );
      self.replaceProductTable.selectData = {}
      // 获取商品明细
      if (data.OC_B_RETURN_ORDER_EXCHANGE_ITEMS === null) {
        return;
      }
      let newItem = data.OC_B_RETURN_ORDER_EXCHANGE_ITEMS[0];
      if(!this.detailsArrData.length){
        let findObj = tableData.find((item) => item.PS_C_SKU_ECODE === newItem.PS_C_SKU_ECODE);
        if (findObj) {
          findObj.QTY_EXCHANGE = Number(findObj.QTY_EXCHANGE) + 1;
        } else {
          tableData.push(newItem);
        }
      }else{
        // 筛选除勾选明细外的明细
        replaceArr = tableData.filter((i) => i.PS_C_SKU_ECODE != this.detailsArrData[0].PS_C_SKU_ECODE);
        let findObj = replaceArr.find((item) => item.PS_C_SKU_ECODE === newItem.PS_C_SKU_ECODE);
        if (findObj) {
          findObj.QTY_EXCHANGE = Number(findObj.QTY_EXCHANGE) + 1;
        } else {
          replaceArr.push(newItem);
        }
        self.businessActionTable.data = replaceArr;
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
     * 6.GIFT_TYPE：'0'非赠品，other赠品
     */
    selectTogether(row) {
      const pT = row.PRO_TYPE; // number
      const gR = row.GIFT_RELATION;
      const gM = row.GROUP_GOODS_MARK;
      const gT = row.GIFT_TYPE; // string
      // if (pT == 0) { // 普通
      // 筛选出gR值相等的一并选中，挂靠赠品
      gR && this.screen('gR', { GIFT_RELATION: gR, PS_C_SKU_ECODE: row.PS_C_SKU_ECODE });
      // 筛选出gM值相等的一并选中，下挂组合
      gM && this.screen('gM', { GROUP_GOODS_MARK: gM, PS_C_SKU_ECODE: row.PS_C_SKU_ECODE });
      // 普通品的非卦靠赠品一并选中，其它(系统/平台)赠品
      // this.screen('other', row);
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
  .switch {
    position: absolute;
    right: 0;
    top: 10px;
    color: #5461B8;
    cursor: pointer;
  }
}
</style>

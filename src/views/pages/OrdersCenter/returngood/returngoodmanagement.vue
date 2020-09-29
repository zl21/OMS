<template>
  <!-- 退换货订单新增 -->
  <div class="returngood">
    <!--按钮块-->
    <div class="returnAddBtn">
      <businessButton :btnConfig="btnConfig"></businessButton>
    </div>
    <div class="returnAddColl">
      <Collapse v-model="openDefault">
        <Panel name="1">
          基本信息
          <p slot="content">
            <businessForm :formConfig="information"></businessForm>
          </p>
        </Panel>
        <Panel name="2">
          换货人信息
          <p slot="content">
            <businessForm :formConfig="replacement"></businessForm>
          </p>
        </Panel>
        <Panel name="3">
          退货金额
          <div slot="content">
            <div class="sales">
              <ul>
                <li>
                  <p>商品应退金额</p>
                  <input type="text" disabled v-model="amountReturned" />
                </li>
                <li class="symbol">+</li>
                <li>
                  <p>应退邮费</p>
                  <input type="text" v-model="returnPostage" @input="returnTotal(returnPostage, 1)" />
                </li>
                <li class="symbol">+</li>
                <li>
                  <p>其他金额</p>
                  <input type="text" v-model="otherAmount" @input="returnTotal(otherAmount, 2)" />
                </li>
                <li class="symbol">-</li>
                <li>
                  <p>换货金额</p>
                  <input type="text" disabled v-model="exchangeAmount" />
                </li>
                <li class="symbol">=</li>
                <li>
                  <p>退货单总金额</p>
                  <input
                    type="text"
                    @input="isSettlementAmount(returnTotalAmount)"
                    disabled
                    v-model="returnTotalAmount"
                  />
                </li>
                <li>
                  <p>代销结算金额</p>
                  <input
                    type="text"
                    @input="isSettlementAmount(settlementAmount)"
                    v-model="settlementAmount"
                  />
                </li>
              </ul>
            </div>
          </div>
        </Panel>
      </Collapse>
    </div>
    <div class="salesTable">
      <!-- tab切换 -->
      <businessLabel
        class="businessLabel"
        :labelList="labelList"
        :labelDefaultValue="DefaultValue"
        @labelClick="labelClick"
      ></businessLabel>
      <!-- 列表组件 -->
      <div class="tableBox">
        <!-- 退货明细 -->
        <jordan-action-table
          v-show="labelDefaultValue === 1"
          :jordanTableConfig="jordanTableConfig"
          @on-select="returnOnSelect"
          @table-delete-detail="returnDeleteDetail"
          @table-add-detail="returnAddDetail"
          @on-select-cancel="returnCancel"
          @on-select-all="returnSelectAll"
          @on-select-all-cancel="returnSelectAllCancel"
        ></jordan-action-table>
        <!-- 换货明细 -->
        <jordan-action-table
          v-show="labelDefaultValue === 2"
          :jordanTableConfig="jordanTableConfig2"
          @on-select="returnOnSelect2"
          @table-delete-detail="returnDeleteDetail2"
          @on-select-cancel="returnCancel2"
          @on-select-all="returnSelectAll2"
          @on-select-all-cancel="returnSelectAllCancel2"
        ></jordan-action-table>
        <!-- 退货日志 -->
        <OrderItem v-show="labelDefaultValue === 3" :componentData="tab2"></OrderItem>
        <!-- 次品记录 -->
        <jordan-action-table
          v-show="labelDefaultValue === 4"
          :jordanTableConfig="jordanTableConfig4"
        ></jordan-action-table>
      </div>
    </div>
    <!-- <jordanBounced :bouncedData="bouncedList"></jordanBounced> -->
    <div class="queryorderB">
      <Modal
        class="queryorder"
        v-model="order.modal"
        :mask="true"
        :title="'查询原始订单编号'"
        @on-ok="queryorder"
        @on-cancel="querycancel"
      >
        <div class="orderContent">
          <businessForm :formConfig="order.orderform"></businessForm>
          <businessButton :btnConfig="order.btn"></businessButton>
        </div>
        <jordan-action-table
          :jordanTableConfig="order.table"
          @on-select="onquerySelect"
          @on-select-cancel="onqueryCancel"
          @on-select-all="onSelectAll"
          @on-select-all-cancel="onSelectAllCancel"
        ></jordan-action-table>
      </Modal>
    </div>
    <!-- 修改备注 11-->
    <jordanModal
      :title="changeRemarkConfig.confirmTitle"
      :titleAlign="changeRemarkConfig.titleAlign"
      :width="changeRemarkConfig.width"
      :scrollable="changeRemarkConfig.scrollable"
      :closable="changeRemarkConfig.closable"
      :draggable="changeRemarkConfig.draggable"
      :mask="changeRemarkConfig.mask"
      :mask-closable="changeRemarkConfig.maskClosable"
      :transfer="changeRemarkConfig.transfer"
      :name="changeRemarkConfig.name"
      :url="changeRemarkConfig.url"
      :keepAlive="changeRemarkConfig.keepAlive"
      :excludeString="changeRemarkConfig.excludeString"
      :componentData="changeRemarkConfig.componentData"
    ></jordanModal>
    <!--单据状态图片展示 -->
    <businessStatusFlag :statusName="statusName"></businessStatusFlag>
    <div class="fromLoading" v-show="isSaveLoading">
      <Spin></Spin>
    </div>

    <Modal
      class="available"
      v-model="availableStock"
      title="提示"
      width="400"
      :mask-closable="false"
      :mask="true"
      @on-ok="saveData"
      @on-cancel="cancalModal"
    >
      <p class="availableStock">{{availableStockMassage}}。是否继续？</p>
    </Modal>
    <Modal
      class="detailAdd"
      v-model="returnDetailAddTable.modal"
      :title="'新增退货明细'"
      @on-ok="resetReturnMainTable"
      @on-cancel="detailAddCancel">
      <jordan-action-table
        :jordanTableConfig="returnDetailAddTable.table"
        @on-select="returnDetailAddOnSelect"
        @on-select-cancel="returnDetailAddOnCancel"
        @on-select-all="returnDetailAddOnSelectAll"
        @on-select-all-cancel="returnDetailAddOnSelectAllCancel"
      ></jordan-action-table>
    </Modal>
    <!-- 矩阵框-->
    <jordanModal
      :title="matrixBox.confirmTitle"
      :titleAlign="matrixBox.titleAlign"
      :width="matrixBox.width"
      :scrollable="matrixBox.scrollable"
      :closable="matrixBox.closable"
      :draggable="matrixBox.draggable"
      :mask="matrixBox.mask"
      :mask-closable="matrixBox.maskClosable"
      :transfer="matrixBox.transfer"
      :name="matrixBox.name"
      :url="matrixBox.url"
      :keepAlive="matrixBox.keepAlive"
      :excludeString="matrixBox.excludeString"
      :componentData="matrixBox.componentData"
    ></jordanModal>
  </div>
</template>

<script>
import axios from "axios";
import businessButton from "professionalComponents/businessButton";
import businessForm from "professionalComponents/businessForm";
import businessActionTable from "professionalComponents/businessActionTable";
import businessLabel from "professionalComponents/businessLabel";
import { setTimeout } from "timers";
import jordanModal from "professionalComponents/businessDialog";
import OrderItem from "./orderItem";
import publicMethodsUtil from "@/assets/js/public/publicMethods";
import businessStatusFlag from "professionalComponents/businessStatusFlag";
import { buttonPermissionsMixin } from "@/assets/js/mixins/buttonPermissions";
import { dataAccessMixin } from "@/assets/js/mixins/dataAccess";
const areaList = require("@/assets/js/address/area-list");
const { parse, parseArea } = require("@/assets/js/address/address-parse");

parseArea(areaList);
export default {
  name: 'returngoodmanagement',
  components: {
    businessButton,
    businessForm,
    businessActionTable,
    jordanModal,
    OrderItem,
    businessLabel,
    businessStatusFlag
  },
  mixins: [buttonPermissionsMixin, dataAccessMixin],
  data() {
    return {
      // 显示水印标识
      statusName: "",
      // 可用库存不足弹窗提示
      availableStock: false,
      qtyRefundEditFlag:true,
      returnIdEditFlag:true,
      availableStockMassage: "",
      addReturnDetailSelectArr: [],
      addSelection: [],
      isModalSave: false, // 是否弹窗保存
      matrixBox: {
				refFuns: "confirmFun",
        confirmTitle: "矩阵录入",
        titleAlign: "center", //设置标题是否居中 center left
        width: "860",
        scrollable: false, //是否可以滚动
        closable: true, //是否可以按esc关闭
        draggable: true, //是否可以拖动
        mask: true, //是否显示遮罩层
        maskClosable: true, //是否可以点击叉号关闭
        transfer: true, //是否将弹层放在body内
        name: "jordanMatrixBox", //组件名称
        url: "matrixBox/jordanMatrixBox",
        keepAlive: true,
        excludeString: "jordanMatrixBox", //将name传进去，确认不缓存
        componentData: {}
      }, // 退单编号查询

      // 弹框配置 修改备注
      changeRemarkConfig: {
        refFuns: "confirmFun",
        confirmTitle: "修改卖家备注",
        titleAlign: "center", //设置标题是否居中 center left
        width: "440",
        scrollable: false, //是否可以滚动
        closable: true, //是否可以按esc关闭
        draggable: true, //是否可以拖动
        mask: true, //是否显示遮罩层
        maskClosable: true, //是否可以点击叉号关闭
        transfer: true, //是否将弹层放在body内
        name: "jordanBounced", //组件名称
        url: "returngood/jordanBounced",
        keepAlive: true,
        excludeString: "jordanBounced", //将name传进去，确认不缓存
        componentData: {}
      },
      order: {
        modal: false,
        btn: {
          typeAll: "error", //按钮统一风格样式
          buttons: [
            {
              text: "查找", //按钮文本
              disabled: false, //按钮禁用控制
              btnclick: () => {
                this.queryBounced();
              } //按钮点击事件
            }
          ]
        },
        orderform: {
          formValue: {
            bill_no: "",
            source_code: "",
            receiver_name: "",
            user_nick: "",
            receiver_mobile: "",
            cp_c_store_ename: ""
          },
          formData: [
            {
              style: "input",
              label: "订单号",
              value: "bill_no",
              width: "8",
              inputenter: () => this.queryBounced()
            },
            {
              style: "input",
              label: "平台单号",
              value: "source_code",
              width: "8",
              inputenter: () => this.queryBounced()
            },
            {
              style: "input",
              label: "收货人",
              value: "receiver_name",
              width: "8",
              inputenter: () => this.queryBounced()
            },
            {
              style: "input",
              label: "买家昵称",
              value: "user_nick",
              width: "8",
              inputenter: () => this.queryBounced()
            },
            {
              style: "input",
              label: "收货人手机",
              value: "receiver_mobile",
              width: "8",
              inputenter: () => this.queryBounced()
            },
            {
              style: "popInput",
              width: "8",
              itemdata: {
                col: 1,
                colid: 168210,
                colname: "SELLER_NICK", //当前字段的名称
                datelimit: "all",
                precolnameslist: [
                  {
                    premtype: "CP_C_SHOP_PERMISSION_ID",
                    refcol: "ID",
                    iswrite: "true"
                  }
                ],
                display: "text", //显示什么类型，例如xml表示弹窗多选加导入功能，mrp表示下拉多选
                fkdisplay: "drp", //外键关联类型
                fkdesc: "店铺名称",
                inputname: "SELLER_NICK:ENAME", //这个是做中文类型的模糊查询字段，例如ENAME
                isfk: true, //是否有fk键
                isnotnull: false, //是否必填
                isuppercase: false, //是否转大写
                length: 65535, //最大长度是多少
                name: "店铺名称", //input前面显示的lable值
                readonly: false, //是否可编辑，对应input   readonly属性
                reftable: "OC_B_RETURN_ORDER", //对应的表
                reftableid: 24578, //对应的表ID
                row: 1,
                statsize: -1,
                type: "STRING", //这个是后台用的
                valuedata: "" //这个是选择的值
              },
              oneObj: () => {
                this.threeObjs();
              }
            }
          ]
        },
        table: {
          columns: [
            {
              key: "SOURCE_CODE",
              title: "平台信息"
            },
            {
              key: "ID",
              title: "订单编号"
            },
            {
              key: "USER_NICK",
              title: "买家昵称"
            },
            {
              key: "ORDER_AMT",
              title: "订单总额"
            },
            {
              key: "RECEIVER_NAME",
              title: "收货人"
            },
            {
              key: "RECEIVER_MOBILE",
              title: "收货人手机号"
            },
            {
              key: "CP_C_PHY_WAREHOUSE_ENAME",
              title: "发货仓库"
            },
            // {
            //   key: "PLATFORM",
            //   title: "平台状态"
            // },
            {
              key: "EXPRESSCODE",
              title: "物流单号"
            },
            {
              key: "CP_C_SHOP_TITLE",
              title: "下单店铺"
            }
          ], //表头
          data: [], //数据配置
          indexColumn: true, // 是否显示序号
          height: "300",
          loading: false,
          isShowSelection: true // 是否显示checkedbox
        },
        value: ""
      },
      fkcolumn: {
        PROV: {
          col: 1,
          colid: 167814,
          colname: "RECEIVER_PROVINCE", //当前字段的名称
          datelimit: "all",
          display: "text", //显示什么类型，例如xml表示弹窗多选加导入功能，mrp表示下拉多选
          fkdisplay: "drp", //外键关联类型
          fkdesc: "收货人省份",
          inputname: "CP_C_STORE_IDS:ENAME", //这个是做中文类型的模糊查询字段，例如ENAME
          isfk: true, //是否有fk键
          isnotnull: false, //是否必填
          isuppercase: false, //是否转大写
          length: 65535, //最大长度是多少
          name: "收货人省份", //input前面显示的lable值
          readonly: false, //是否可编辑，对应input   readonly属性
          reftable: "CP_C_PROVINCE", //对应的表
          reftableid: 10010, //对应的表ID
          row: 1,
          statsize: -1,
          type: "STRING", //这个是后台用的
          pid: "",
          valuedata: "" //这个是选择的值
        },
        CITY: {
          col: 1,
          colid: 167815,
          colname: "RECEIVER_CITY", //当前字段的名称
          datelimit: "all",
          display: "text", //显示什么类型，例如xml表示弹窗多选加导入功能，mrp表示下拉多选
          fkdisplay: "drp", //外键关联类型
          fkdesc: "收货人市",
          inputname: "RECEIVER_CITY:ENAME", //这个是做中文类型的模糊查询字段，例如ENAME
          isfk: true, //是否有fk键
          isnotnull: false, //是否必填
          isuppercase: false, //是否转大写
          length: 65535, //最大长度是多少
          name: "收货人市", //input前面显示的lable值
          readonly: false, //是否可编辑，对应input   readonly属性
          reftable: "CP_C_CITY", //对应的表
          reftableid: 23864, //对应的表ID
          refcolval: {
            fixcolumn: "C_UP_ID",
            expre: "equal",
            srccol: "RECEIVER_PROVINCE"
          },
          row: 1,
          statsize: -1,
          type: "STRING", //这个是后台用的
          pid: "",
          valuedata: "" //这个是选择的值
        }
      },
      address: "",
      isgoods: true, // 商品单价
      isnumber: true, // 申请数量
      // isreturned: true, // 可退货数量
      isreplacement: true, // 换货数量
      ispurchase: true, // 购买数量
      openDefault: [], // 默认展开设置
      clrListArr:[],
      sizeListArr:[],
      itemSkuEcode:"",
      itemSkuId:"",
      itemGbcode:"",
      btnConfig: {
        typeAll: "error", //按钮统一风格样式
        buttons: []
      }, // 按钮组
      information: {
        formValue: {
          //存储表单得所有值
          ORIG_ORDER_ID: "", // 原始订单编号
          BILL_TYPE: "", // 单据类型
          BUYER_NICK: "", // 买家昵称
          CP_C_LOGISTICS_ENAME: "", // 退回物流公司
          ORIG_SOURCE_CODE: "", // 原始平台单号
          CP_C_SHOP_TITLE: "", // 店铺名称
          RETURN_ID: "", // 平台退款单号
          CP_C_LOGISTICS_ID: "", // 退回物流公司
          RETURN_REASON: "", // 退款原因
          LOGISTICS_CODE: "", // 退回物流单号
          IS_RESERVED: true, // 换货预留库存
          IS_BACK: false, // 是否原退
          IS_RETURN_ORDER_EXCHANGE: "",
          CP_C_STORE_ENAME: "", // 仓库
          REMARK: "", // 备注
          SELLER_MEMO: "", // 卖家备注
        },
        //表单非空提示
        ruleValidate: {
          ORIG_ORDER_ID: [{ required: true, message: " ", trigger: "blur" }],
          BILL_TYPE: [{ required: true, message: " ", trigger: "blur" }]
        },
        formData: [
          {
            style: "",
            label: "退单编号",
            disabled: true,
            value: "ID",
            width: "6"
          },
          {
            style: "input", //输入框类型
            dataAcessKey: "ORIG_ORDER_ID",
            label: "原始订单编号", //输入框前文字
            value: "ORIG_ORDER_ID", //输入框的值
            width: "6", //所占的宽度 (宽度分为24份,数值代表所占份数的宽度)
            icon: "ios-search", //输入框后带的图标,暂只有输入框支持
            placeholder: "", //占位文本，默认为请输入
            disabled: false, //按钮禁用控制
            rules: true,
            ghost: false, //是否关闭幽灵按钮，默认开启
            inputenter: () => {
              this.queryEnter();
            }, //表单回车事件
            iconclick: () => {
              const _this = this;
              _this.onSelectData = [];
              _this.order.orderform.formValue = {};
              _this.order.orderform.formData[5].itemdata.pid = "";
              _this.order.orderform.formData[5].itemdata.valuedata = "";
              _this.order.table.data = [];
              // document.getElementsByClassName(
              //   "SELLER_NICK"
              // )[1].children[0].children[0].value = "";
              if (_this.$route.query.id == "-1") {
                _this.order.modal = true;
              }
            } //点击icon图标事件
          },
          {
            style: "select", //下拉框类型
            label: "单据类型", //下拉框前的值
            dataAcessKey: "BILL_TYPE",
            width: "6", //所占宽度宽度
            disabled: false, //按钮禁用控制
            rules: true,
            value: "BILL_TYPE",
            selectChange: () => {
              this.selectSelectt();
            },
            options: [
              //下拉框选项值
              {
                value: "1",
                label: "退货"
              },
              {
                value: "2",
                label: "退换货"
              }
            ]
          },
          {
            style: "input",
            label: "买家昵称",
            value: "BUYER_NICK",
            dataAcessKey: "BUYER_NICK",
            disabled: true, //按钮禁用控制
            width: "6"
          },
          {
            style: "input",
            label: "原始平台单号",
            value: "ORIG_SOURCE_CODE",
            dataAcessKey: "ORIG_SOURCE_CODE",
            disabled: true, //按钮禁用控制
            width: "6",
            inputenter: () => {
              this.querySourceEnter();
            }
          },
          {
            style: "popInput",
            width: "6",
            value: "value5",
            dataAcessKey: "CP_C_SHOP_TITLE",
            itemdata: {
              col: 1,
              colid: 168210,
              colname: "SELLER_NICK", //当前字段的名称
              datelimit: "all",
              display: "text", //显示什么类型，例如xml表示弹窗多选加导入功能，mrp表示下拉多选
              fkdisplay: "drp", //外键关联类型
              fkdesc: "店铺名称",
              inputname: "SELLER_NICK:ENAME", //这个是做中文类型的模糊查询字段，例如ENAME
              isfk: true, //是否有fk键
              isnotnull: true, //是否必填
              isuppercase: false, //是否转大写
              length: 65535, //最大长度是多少
              name: "店铺名称", //input前面显示的lable值
              readonly: true, //是否可编辑，对应input   readonly属性
              reftable: "OC_B_RETURN_ORDER", //对应的表
              reftableid: 24578, //对应的表ID
              row: 1,
              statsize: -1,
              type: "STRING", //这个是后台用的
              valuedata: "" //这个是选择的值
            },
            oneObj: e => {
              this.oneObjs(e);
            }
          },
          {
            style: "input",
            label: "平台退款单号",
            dataAcessKey: "RETURN_ID",
            disabled: true, //按钮禁用控制
            value: "RETURN_ID",
            width: "6"
          },
          {
            style: "popInput",
            width: "6",
            dataAcessKey: "CP_C_LOGISTICS_ENAME",
            value: "CP_C_LOGISTICS_ID",
            itemdata: {
              col: 1,
              colid: 168212,
              colname: "CP_C_LOGISTICS_ENAME", //当前字段的名称
              datelimit: "all",
              display: "text", //显示什么类型，例如xml表示弹窗多选加导入功能，mrp表示下拉多选
              fkdisplay: "drp", //外键关联类型
              fkdesc: "退回物流公司",
              inputname: "CP_C_LOGISTICS_ENAME:ENAME", //这个是做中文类型的模糊查询字段，例如ENAME
              isfk: true, //是否有fk键
              isnotnull: false, //是否必填
              isuppercase: false, //是否转大写
              length: 65535, //最大长度是多少
              name: "退回物流公司", //input前面显示的lable值
              readonly: false, //是否可编辑，对应input   readonly属性
              reftable: "OC_B_RETURN_ORDER", //对应的表
              reftableid: 24578, //对应的表ID
              row: 1,
              statsize: -1,
              type: "STRING", //这个是后台用的
              valuedata: "" //这个是选择的值
            },
            oneObj: e => {
              this.oneObjs(e);
            }
          },
          {
            style: "select", //下拉框类型
            label: "退款原因", //下拉框前的值
            dataAcessKey: "RETURN_REASON",
            width: "6", //所占宽度宽度
            value: "RETURN_REASON",
            disabled: false, //按钮禁用控制
            options: []
          },
          {
            style: "input",
            label: "退回物流单号",
            dataAcessKey: "LOGISTICS_CODE",
            value: "LOGISTICS_CODE",
            disabled: false, //按钮禁用控制
            width: "6"
          },
          {
            style: "", //勾选框类型
            label: "换货预留库存", //前面的文字
            dataAcessKey: "IS_RESERVED",
            width: "6", //所占的宽度
            value: "IS_RESERVED",
            disabled: false, //按钮禁用控制
            checked: false, //是否勾选控制
            checkboxChange: e => {
              const _this = this;
              if (e) {
                _this.information.formData[11].style = "select";
                _this.information.formValue.IS_RETURN_ORDER_EXCHANGE = 1;
                setTimeout(() => {
                  document.getElementsByClassName(
                    "burgeon-select-selected-value"
                  )[1].className = "burgeon-select-selected-value inputBgcolor";
                }, 10);
              } else {
                _this.information.formData[11].style = "";
                _this.information.formValue.IS_RETURN_ORDER_EXCHANGE = "";
              }
            }
          },
          {
            style: "",
            label: "是否生成换货单",
            dataAcessKey: "",
            disabled: false, //按钮禁用控制
            value: "IS_RETURN_ORDER_EXCHANGE",
            width: "6",
            options: [
              {
                value: 1,
                label: "是"
              },
              {
                value: 0,
                label: "否"
              }
            ]
          },
          {
            style: "checkbox", //勾选框类型
            label: "是否原退", //前面的文字
            dataAcessKey: "IS_BACK",
            width: "6", //所占的宽度
            value: "IS_BACK",
            disabled: false, //按钮禁用控制
            checked: false, //是否勾选控制
            checkboxChange: e => {
              const _this = this;
              let phy = _this.information.formData[13].itemdata;
              let phyIn = _this.information.formData[14].itemdata;
              if (!e) {
                axios({
                  url: "/p/cs/queryOcBOrder",
                  method: "post",
                  cancelToken: true,
                  data: {'id': _this.information.formValue.ORIG_ORDER_ID}
                }).then(res => {
                  if (res.data.code === 0) {
                    phy.pid = phyIn.pid;
                    phy.valuedata = phyIn.valuedata;
                    _this.information.formValue.CP_C_PHY_WAREHOUSE_IN_ID =
                      phyIn.pid;
                    let arrList = JSON.parse(res.data.data);
                    _this.information.formValue.LOGISTICS_CODE = arrList.EXPRESSCODE;
                    _this.information.formValue.CP_C_LOGISTICS_ID = arrList.CP_C_LOGISTICS_ID;
                    _this.information.formData.forEach((list, j) => {
                      if (list.style === 'popInput' && list.itemdata.name === '退回物流公司') {
                        list.itemdata.pid = arrList.CP_C_LOGISTICS_ID;
                        list.itemdata.valuedata = arrList.CP_C_LOGISTICS_ENAME;
                      }
                    })
                  }
                });
              } else {
                _this.information.formValue.LOGISTICS_CODE = '';
                phy.pid = '';
                phy.valuedata = '';
                _this.information.formValue.CP_C_PHY_WAREHOUSE_IN_ID = '';
              }
            }
          },
          {
            style: "popInput",
            dataAcessKey: "CP_C_PHY_WAREHOUSE_ENAME",
            width: "6",
            itemdata: {
              col: 1,
              colid: 176316,
              colname: "CP_C_PHY_WAREHOUSE_IN_ID", //当前字段的名称
              datelimit: "all",
              // precolnameslist: [
              //   {
              //     premtype: "CP_C_WAREHOUSE_ID",
              //     refcol: "ID",
              //     iswrite: "true"
              //   }
              // ],
              display: "text", //显示什么类型，例如xml表示弹窗多选加导入功能，mrp表示下拉多选
              fkdisplay: "drp", //外键关联类型
              fkdesc: "实体仓档案",
              inputname: "CP_C_PHY_WAREHOUSE_IN_ID:ENAME", //这个是做中文类型的模糊查询字段，例如ENAME
              isfk: true, //是否有fk键
              isnotnull: false, //是否必填
              isuppercase: false, //是否转大写
              length: 20, //最大长度是多少
              name: "入库实体仓库", //input前面显示的lable值
              readonly: false, //是否可编辑，对应input   readonly属性
              reftable: "CP_C_PHY_WAREHOUSE", //对应的表
              reftableid: 24486, //对应的表ID
              row: 1,
              statsize: -1,
              type: "STRING", //这个是后台用的
              pid: "",
              valuedata: "" //这个是选择的值
            },
            oneObj: e => {
              this.oneObjs(e);
            }
          },
          {
            style: "popInput",
            width: "6",
            dataAcessKey: "CP_C_PHY_WAREHOUSE_ENAME",
            itemdata: {
              col: 1,
              colid: 167997,
              colname: "CP_C_PHY_WAREHOUSE_ID", //当前字段的名称
              datelimit: "all",
              display: "text", //显示什么类型，例如xml表示弹窗多选加导入功能，mrp表示下拉多选
              fkdisplay: "drp", //外键关联类型
              fkdesc: "实体仓档案",
              inputname: "CP_C_PHY_WAREHOUSE_ID:ENAME:ENAME", //这个是做中文类型的模糊查询字段，例如ENAME
              isfk: true, //是否有fk键
              isnotnull: false, //是否必填
              isuppercase: false, //是否转大写
              length: 20, //最大长度是多少
              name: "发货实体仓库", //input前面显示的lable值
              readonly: true, //是否可编辑，对应input   readonly属性
              reftable: "CP_C_PHY_WAREHOUSE", //对应的表
              reftableid: 24486, //对应的表ID
              row: 1,
              statsize: -1,
              type: "STRING", //这个是后台用的
              pid: "",
              valuedata: "" //这个是选择的值
            },
            oneObj: e => {
              this.oneObjs(e);
            }
          },
          {
            style: "input",
            label: "备注",
            dataAcessKey: "REMARK",
            value: "REMARK",
            disabled: false, //按钮禁用控制
            width: "12"
          },
          {
            style: "input",
            label: "卖家备注",
            value: "SELLER_MEMO",
            disabled: true, //按钮禁用控制
            width: "12"
          }
        ]
      }, // 基本信息
      returnDetailAddTable: {
        modal: false,
        pageShow: true, //控制分页是否显示
        table: {
          columns: [
            {
              key: "PS_C_PRO_ECODE",
              title: "商品编码",
              dataAcessKey: "PS_C_PRO_ECODE"

            },
            {
              key: "PS_C_CLR_ENAME",
              title: "颜色",
              dataAcessKey: "PS_C_CLR_ENAME"
            },
            {
              key: "PS_C_SIZE_ENAME",
              dataAcessKey: "PS_C_SIZE_ENAME",
              title: "尺码"
            },
            {
              key: "QTY_REFUND",
              title: "申请数量",
              dataAcessKey: "QTY_REFUND"
            },
            {
              key: "PS_C_SKU_ECODE",
              title: "条码",
              dataAcessKey: "PS_C_SKU_ECODE"
            },
            {
              key: "BARCODE",
              title: "国标码",
              dataAcessKey: "BARCODE"
            },
            {
              key: "PS_C_PRO_ENAME",
              title: "商品名称",
              dataAcessKey: "PS_C_PRO_ENAME"
            },
            {
              key: "SEX_NAME",
              title: "性别",
              dataAcessKey: "SEX"
            },
            {
              key: "QTY_IN",
              title: "入库数量",
              dataAcessKey: "QTY_IN"
            },
            {
              key: "QTY_CAN_REFUND",
              title: "订单数量",
              dataAcessKey: "QTY_CAN_REFUND"
            },
            {
              key: "PRICE",
              title: "吊牌价",
              dataAcessKey: "RESERVE_DECIMAL01"
            },
            {
              key: "amt_refund_single",
              title: "单件退货金额",
              dataAcessKey: "AMT_REFUND_SINGLE"
            },
            {
              key: "AMT_REFUND",
              dataAcessKey: "AMT_REFUND",
              title: "退货金额"
            },
            {
              key: "RESERVE_DECIMAL02",
              dataAcessKey: "RESERVE_DECIMAL02",
              title: "结算单价"
            },
            {
              key: "RESERVE_DECIMAL03",
              dataAcessKey: "RESERVE_DECIMAL03",
              title: "结算金额"
            },
            {
              key: "PRODUCT_MARK",
              title: "商品标记",
              dataAcessKey: "PRODUCT_MARK",
            }
          ], //表头
          data: [], //数据配置
          indexColumn: true, // 是否显示序号
          loading: false,
          isShowSelection: true // 是否显示checkedbox
        },
        value: ""
      },
      replacement: {
        formValue: {
          //存储表单得所有值
          message: "",
          RECEIVE_NAME: "", // 收货人
          RECEIVE_MOBILE: "", // 收货人手机
          RECEIVE_PHONE: "", // 收货人电话
          RECEIVE_ZIP: "", // 收货人邮编
          receiver_province_name: "", // 收货人省份
          receiver_city_name: "", // 收货人市
          receiver_area_name: "", // 收货人县
          SHIP_AMT: "", // 换货邮费
          RECEIVE_ADDRESS: "" // 收货人地址
        },
        //表单非空提示
        ruleValidate: {},
        formData: [
          {
            style: "input",
            label: "收货人信息",
            dataAcessKey: "",
            value: "message",
            disabled: false, //按钮禁用控制
            width: "24",
            inputenter: () => {
              let self = this;
              self.address = parse(self.replacement.formValue.message);
              if (!self.information.formValue.ORIG_ORDER_ID) {
                self.$Message.warning("请先填入原订单信息");
                return;
              }
              if (
                self.address.addr == "" ||
                self.address.area == "" ||
                self.address.city == "" ||
                self.address.name == "" ||
                (self.address.mobile == "" && self.address.phone == "") ||
                self.address.province == ""
              ) {
                self.$Message.warning(
                  "请填入完整信息,如:XX,17788888888,上海上海市闵行区XXXXXXXXXXX"
                );
              } else {
                self.replacement.formValue.RECEIVE_NAME = self.address.name; //收货人赋值
                self.replacement.formValue.RECEIVE_PHONE = self.address.phone;
                self.replacement.formValue.RECEIVE_MOBILE = self.address.mobile; //收货人手机赋值
                self.replacement.formValue.RECEIVE_ADDRESS = self.address.addr; //收货人地址赋值

                self
                  .getAddressId(
                    self.address.province,
                    self.address.city,
                    self.address.area
                  )
                  .then(res => {
                    if (res.data.code === 0) {
                      self.getQueryResionByName(res.data.data);
                    } else {
                      self.$Message.warning("省市区id获取失败");
                    }
                  });
              }
            }
          },
          {
            style: "input",
            label: "收货人",
            dataAcessKey: "RECEIVE_NAME",
            value: "RECEIVE_NAME",
            disabled: false, //按钮禁用控制
            rules: true,
            width: "6"
          },
          {
            style: "input",
            label: "收货人手机",
            dataAcessKey: "RECEIVE_MOBILE",
            value: "RECEIVE_MOBILE",
            disabled: false, //按钮禁用控制
            rules: true,
            width: "6"
          },
          {
            style: "input",
            label: "收货人电话",
            dataAcessKey: "RECEIVE_PHONE",
            value: "RECEIVE_PHONE",
            disabled: false, //按钮禁用控制
            width: "6"
          },
          {
            style: "input",
            label: "收货人邮编",
            dataAcessKey: "RECEIVE_ZIP",
            value: "RECEIVE_ZIP",
            disabled: false, //按钮禁用控制
            width: "6"
          },
          {
            style: "popInput", //输入框弹框单多选
            width: "6",
            dataAcessKey: "RECEIVER_PROVINCE_NAME",
            itemdata: {},
            oneObj: e => {
              this.replacement.formData[6].itemdata.pid = "";
              this.replacement.formData[6].itemdata.valuedata = "";
              this.replacement.formValue.receiver_city_id = "";
              this.replacement.formValue.receiver_city_name = "";
              this.replacement.formData[7].itemdata.pid = "";
              this.replacement.formData[7].itemdata.valuedata = "";
              this.replacement.formValue.receiver_area_id = "";
              this.replacement.formValue.receiver_area_name = "";
              this.twoObjs(e);
            }
          },
          {
            style: "popInput", //输入框弹框单多选
            width: "6",
            inputList: [],
            dataAcessKey: "RECEIVER_CITY_NAME",
            itemdata: {},
            oneObj: e => {
              this.replacement.formData[7].itemdata.pid = "";
              this.replacement.formData[7].itemdata.valuedata = "";
              this.replacement.formValue.receiver_area_id = "";
              this.replacement.formValue.receiver_area_name = "";
              this.twoObjs(e);
            }
          },
          {
            style: "popInput", //输入框弹框单多选
            width: "6",
            inputList: [],
            dataAcessKey: "RECEIVER_AREA_NAME",
            itemdata: {
              col: 1,
              colid: 167816,
              colname: "RECEIVER_AREA", //当前字段的名称
              datelimit: "all",
              display: "text", //显示什么类型，例如xml表示弹窗多选加导入功能，mrp表示下拉多选
              fkdisplay: "drp", //外键关联类型
              fkdesc: "收货人区",
              inputname: "RECEIVER_AREA:ENAME", //这个是做中文类型的模糊查询字段，例如ENAME
              isfk: true, //是否有fk键
              isnotnull: false, //是否必填
              isuppercase: false, //是否转大写
              length: 65535, //最大长度是多少
              name: "收货人区", //input前面显示的lable值
              readonly: false, //是否可编辑，对应input   readonly属性
              reftable: "CP_C_DISTAREA", //对应的表
              reftableid: 23863, //对应的表ID
              row: 1,
              statsize: -1,
              type: "STRING", //这个是后台用的
              pid: "",
              valuedata: "", //这个是选择的值
              refcolval: {
                fixcolumn: "C_UP_ID",
                expre: "equal",
                srccol: "RECEIVER_CITY"
              } //过滤配置
            },
            oneObj: e => {
              this.twoObjs(e);
            }
          },
          {
            style: "input",
            label: "换货邮费",
            dataAcessKey: "SHIP_AMT",
            disabled: false, //按钮禁用控制
            value: "SHIP_AMT",
            width: "6"
          },
          {
            style: "input",
            label: "收货人地址",
            dataAcessKey: "RECEIVE_ADDRESS",
            value: "RECEIVE_ADDRESS",
            disabled: false, //按钮禁用控制
            rules: true,
            width: "12"
          }
        ]
      }, // 换货人信
      labelList: [
        {
          label: "退货明细",
          value: "1",
          isShow: true
        },
        {
          label: "换货明细",
          value: "2",
          isShow: false
        },
        {
          label: "退货单日志",
          value: "3",
          isShow: true
        },
        {
          label: "次品记录",
          value: "4",
          isShow: true
        }
      ],
      jordanTableConfig: {
        jordanFormConfig: {}, //表单配置
        columns: [],
        data: [], //数据配置
        pageShow: false, //控制分页是否显示
        loading: false,
        height: 280, // 表格高度
        isShowDeleteDetailBtn: true, //控制是否显示删除明细
        isShowAddDetailBtn: true,
        indexColumn: true, // 是否显示序号
        isShowSelection: true, // 是否显示checkedbox
        width: "", // 表格宽度
        border: true, //是否显示纵向边框
        total: 0, //设置总条数
        pageSizeOpts: [15, 30, 45, 60], // 每页条数切换的配置
        pageSize: 15 // 每页条数
      }, // 退货明细
      jordanTableConfig2: {
        jordanFormConfig: {}, //表单配置
        columns: [],
        data: [], //数据配置
        pageShow: false, //控制分页是否显示
        loading: false,
        height: 280, // 表格高度
        isShowDeleteDetailBtn: true, //控制是否显示删除明细
        indexColumn: true, // 是否显示序号
        isShowSelection: true, // 是否显示checkedbox
        width: "", // 表格宽度
        border: true, //是否显示纵向边框
        total: 0, //设置总条数
        pageSizeOpts: [15, 30, 45, 60], // 每页条数切换的配置
        pageSize: 15 // 每页条数
      }, // 退货明细
      jordanTableConfig4: {
        jordanFormConfig: {}, //表单配置
        columns: [],
        data: [], //数据配置
        pageShow: false, //控制分页是否显示
        loading: false,
        height: 280, // 表格高度
        isShowDeleteDetailBtn: false, //控制是否显示删除明细
        indexColumn: true, // 是否显示序号
        isShowSelection: false, // 是否显示checkedbox
        width: "", // 表格宽度
        border: true, //是否显示纵向边框
        total: 0, //设置总条数
        pageSizeOpts: [15, 30, 45, 60], // 每页条数切换的配置
        pageSize: 15 // 每页条数
      }, // 次品记录
      DefaultValue: "1", // 控制tab切换样式
      tableIndex: 0, // 切换 0 ==> 退货明细  1 ==> 换货明细
      isExchange: false, // 是否显示换货明
      amountReturned: null, // 商品退回金额
      returnPostage: 0, // 应退邮费
      otherAmount: 0, // 其他金额
      exchangeAmount: null, // 换货金额
      returnTotalAmount: null, // 退货单总金额
      settlementAmount: 0, // 代销结算金额
      returnSelectData: [], // 退货明细列表选中数据
      exchangeSelectData: [], // 换货明细选中数据
      onSelectData: [], // 选中的原始订单编号
      refundDtoList: {
        // 退货明细行数据
        pageSize: 0,
        total: 0,
        data: []
      },
      exchangeDtoList: {
        //换货明细行数据
        pageSize: 0,
        total: 0,
        data: []
      },
      isTab: 0, // 区分tab
      status: "", // 单据状态
      clrAndSizeFlag:false,
      labelDefaultValue: 1, // lable切换显示
      tab2: {
        tablename: "",
        objid: ""
      },
      isSaveLoading: false, // 控制多次调用事件
      warehouseId: "", // 发货仓库id暂存
      inputValue: "", // table退货金额
      refundValue: "", // table换货金额
      tId: "",
      isTowwms: "", // 是否传wms
      inventedStatus: "", // 虚拟入库状态
      defectiveList: [], // 次品记录
      //******** */
      SENSITIVE_COLUMNS: [] //处理敏感列权限
    };
  },
  created() {
    const _this = this;
    window.addEventListener("keydown", e => {
      let key = e.keyCode;
      if (key == 13) {
        if (_this.order.modal && _this.order.table.data.length) {
          _this.queryorder();
        }
      }
      if (key == 27) {
        _this.order.modal = false;
      }
    });
  },
  destroyed() {
    window.removeEventListener("keydown", this, false);
  },
  mounted() {
    this.$nextTick(() => {
      if (this.$route.query.id === "-1") {
        this.btnConfig.buttons = [
          {
            text: "保存", //按钮文本
            disabled: false, //按钮禁用控制
            btnclick: () => {
              this.saveData();
            } //按钮点击事件
          },
          {
            text: "返回", //按钮文本
            disabled: false, //按钮禁用控制
            btnclick: () => {
              // this.$router.push({ path: "/m/action/returngoodList?id=2661" });
              this.$store.commit("customize/TabHref", {
                id: 2661,
                type: "action",
                name: "returngoodList",
                label: "退换货订单",
                query: Object.assign({
                  id: 2661,
                  tabTitle: "退换货订单"
                }),
                back: true
              });
            } //按钮点击事件
          }
        ];
      } else {
        this.btnConfig.buttons = [
          {
            text: "保存", //按钮文本
            disabled: false, //按钮禁用控制
            btnclick: () => {
              this.saveData();
            } //按钮点击事件
          },
          {
            isShow: "",
            text: "售后审核", //按钮文本
            disabled: false, //按钮禁用控制
            btnclick: () => {
              this.afterAudit();
            } //按钮点击事件
          },
          {
            text: "取消", //按钮文本
            disabled: false, //按钮禁用控制
            btnclick: () => {
              this.cancelBtn();
            } //按钮点击事件
          },
          {
            text: "虚拟入库", //按钮文本
            disabled: false, //按钮禁用控制
            btnclick: () => {
              this.virtualLibrary();
            } //按钮点击事件
          },
          {
            text: "取消自动退款", //按钮文本
            disabled: false, //按钮禁用控制
            btnclick: () => {
              this.cancelRefund();
            } //按钮点击事件
          },
          {
            text: "修改备注", //按钮文本
            disabled: false, //按钮禁用控制
            btnclick: () => {
              this.bounced();
            } //按钮点击事件
          },
          {
            text: "标记次品已调拨", //按钮文本
            disabled: true, //按钮禁用控制
            btnclick: () => {
              this.defectiveGoods();
            } //按钮点击事件
          },
          {
            text: "返回", //按钮文本
            disabled: false, //按钮禁用控制
            btnclick: () => {
              // this.$router.push({ path: "/m/action/returngoodList?id=2661" });
              this.$store.commit("customize/TabHref", {
                id: 2661,
                type: "action",
                name: "returngoodList",
                label: "退换货订单",
                query: Object.assign({
                  id: 2661,
                  tabTitle: "退换货订单"
                }),
                back: true
              });
            } //按钮点击事件
          }
        ];
      }
      this.getPermissions("btnConfig", "returngoodList");
    });
    // 判断是否为新增页面 -1为新增页面

    const _this = this;

    if (this.$route.query.id === "-1") {
      this.information.formValue.BILL_TYPE = "1";
      _this.clrAndSizeFlag = true;
      // this.btnConfig.buttons.forEach(item => {
      //   switch (item.text) {
      //     case "售后审核":
      //       item.isShow = false;
      //       break;
      //     case "取消":
      //       item.isShow = false;
      //       break;
      //     case "虚拟入库":
      //       item.isShow = false;
      //       break;
      //     case "取消自动退款":
      //       item.isShow = false;
      //       break;
      //     case "修改备注":
      //       item.isShow = false;
      //       break;
      //   }
      // });
      // 新增退单
      if (this.$route.query.orderHrefReturnid) {
        axios({
          url: "/p/cs/billCopy",
          method: "post",
          data: {
            IDS: _this.$route.query.orderHrefReturnid.split(","),
            TYPE: "3"
          }
        }).then(res => {
          if (res.data.code === 0) {
            const item = res.data.data.baseInfo;
            const replace = _this.replacement.formValue;
            this.onSelectData.push(item);
            this.information.formData.forEach((list, j) => {
              if (list.style === 'popInput' && list.itemdata.name === '退回物流公司') {
                list.itemdata.pid = item.CP_C_LOGISTICS_ID;
                list.itemdata.valuedata = item.CP_C_LOGISTICS_ENAME;
                this.information.formValue.CP_C_LOGISTICS_ID = item.CP_C_LOGISTICS_ID;
                this.information.formValue.CP_C_LOGISTICS_ENAME = item.CP_C_LOGISTICS_ENAME;
              }
            });
            _this.tId = item.TID;
            _this.warehouseId = item.CP_C_PHY_WAREHOUSE_ID
              ? item.CP_C_PHY_WAREHOUSE_ID
              : ""; // 发货仓库id
            _this.information.formData[14].itemdata.pid = this.warehouseId;
            _this.information.formData[14].itemdata.valuedata =
              item.CP_C_PHY_WAREHOUSE_ENAME;
            _this.information.formValue.CP_C_PHY_WAREHOUSE_ID = this.warehouseId;
            _this.information.formValue.ORIG_ORDER_ID = item.ID; // 编号
            _this.information.formValue.BUYER_NICK = item.USER_NICK;
            _this.information.formValue.ORIG_SOURCE_CODE = item.SOURCE_CODE;
            _this.information.formValue.CP_C_SHOP_TITLE = item.CP_C_SHOP_TITLE;
            _this.information.formValue.CP_C_SHOP_ID = item.CP_C_SHOP_ID;
            _this.information.formValue.SELLER_MEMO = item.SELLER_MEMO;
            _this.replacement.formValue.RECEIVE_ADDRESS =
              res.data.data.receivingGoods.RECEIVER_ADDRESS; // 收货人地址
            _this.replacement.formValue.RECEIVE_NAME =
              res.data.data.receivingGoods.RECEIVER_NAME; // 收货人姓名
            _this.replacement.formValue.RECEIVE_MOBILE =
              res.data.data.receivingGoods.RECEIVER_MOBILE; // 收货人手机
            _this.replacement.formValue.RECEIVE_PHONE =
              res.data.data.receivingGoods.RECEIVER_PHONE; // 收货人电话
            _this.replacement.formValue.RECEIVE_ZIP =
              res.data.data.receivingGoods.RECEIVER_ZIP; // 换货人邮编
            _this.settlementAmount = item.CONSIGN_AMT; // 代销结算金额
            replace.platform = item.PLATFORM; // 平台
            replace.orde_source = item.ORDER_SOURCE; // 订单来源
            replace.receiver_province_id =
              res.data.data.receivingGoods.CP_C_REGION_PROVINCE_ID; // 省id
            replace.receiver_province_name =
              res.data.data.receivingGoods.CP_C_REGION_PROVINCE_ENAME; // 收货人省份
            replace.receiver_city_id =
              res.data.data.receivingGoods.CP_C_REGION_CITY_ID; // 收货人市id
            replace.receiver_city_name =
              res.data.data.receivingGoods.CP_C_REGION_CITY_ENAME; // 收货人市
            replace.receiver_area_id =
              res.data.data.receivingGoods.CP_C_REGION_AREA_ID; // 收货人县id
            replace.receiver_area_name =
              res.data.data.receivingGoods.CP_C_REGION_AREA_ENAME; // 收货人县
            // 展示

            _this.information.formData[5].itemdata.valuedata = item.CP_C_SHOP_TITLE
              ? item.CP_C_SHOP_TITLE
              : "";
            _this.replacement.formData[5].itemdata.valuedata =
              res.data.data.receivingGoods.CP_C_REGION_PROVINCE_ENAME; // 省
            _this.replacement.formData[6].itemdata.valuedata =
              res.data.data.receivingGoods.CP_C_REGION_CITY_ENAME; // 市
            _this.replacement.formData[7].itemdata.valuedata =
              res.data.data.receivingGoods.CP_C_REGION_AREA_ENAME; // 区
          }
        });

        axios({
          url: "/p/cs/getOrderDetailList",
          method: "post",
          data: {
            id: _this.$route.query.orderHrefReturnid,
            currentPage: 1,
            pageSize: 1000,
            detailType:2 // 退换货订单使用
          }
        }).then(async res => {
          let queryList = [];
          res.data.data.records.forEach(item => {
            if (item.REFUND_STATUS != 6) queryList.push(item);
          });
          let newQueryList = [];
          for (let i = 0; i < queryList.length; i++) {
            let newItem = {};
            newItem.reserve_bigint10 = queryList[i].ID;
            newItem.ID = -1;
            newItem.oOid = queryList[i].OOID; // 子订单id
            newItem.PS_C_SKU_ECODE = queryList[i].PS_C_SKU_ECODE;
            newItem.BARCODE = queryList[i].BARCODE;
            newItem.PS_C_PRO_ID = queryList[i].PS_C_PRO_ID;
            newItem.PS_C_PRO_ECODE = queryList[i].PS_C_PRO_ECODE;
            newItem.PS_C_CLR_ID = queryList[i].PS_C_CLR_ID; // 颜色
            newItem.PS_C_CLR_ECODE = queryList[i].PS_C_CLR_ECODE;
            newItem.PS_C_CLR_ENAME = queryList[i].PS_C_CLR_ENAME;
            newItem.PS_C_SIZE_ID = queryList[i].PS_C_SIZE_ID; // 尺寸
            newItem.PS_C_SIZE_ECODE = queryList[i].PS_C_SIZE_ECODE;
            newItem.PS_C_SIZE_ENAME = queryList[i].PS_C_SIZE_ENAME;
            newItem.PS_C_PRO_ENAME = queryList[i].PS_C_PRO_ENAME;
            newItem.QTY_CAN_REFUND = queryList[i].QTY;
            newItem.QTY_REFUND = queryList[i].QTY - queryList[i].RESERVE_DECIMAL01;
            newItem.QTY_EXCHANGE = queryList[i].QTY;
            newItem.SEX_NAME = queryList[i].SEX_NAME;
            newItem.SEX = queryList[i].SEX;
            newItem.PRICE = queryList[i].RESERVE_DECIMAL02;
            newItem.amt_refund_single = queryList[i].PRICE_ACTUAL;
            newItem.AMT_REFUND = publicMethodsUtil
              .accMul(queryList[i].QTY, queryList[i].PRICE_ACTUAL)
              .toFixed(2); // 退货金额realAmt
            newItem.QTY_IN = 0;
            newItem.PRODUCT_MARK = "正品";
            newItem.skuId = queryList[i].PS_C_SKU_ID;
            await _this.getDataByProinfo(queryList[i].PS_C_PRO_ECODE,1);
            newItem.clrList = _this.clrListArr;
            newItem.sizeList = _this.sizeListArr;
            newItem.RESERVE_DECIMAL02 = queryList[i].PRICE_SETTLE; //结算单价
            newItem.RESERVE_DECIMAL03 = queryList[i].TOT_PRICE_SETTLE; //结算金额
            newQueryList.push(newItem);
          }
          _this.jordanTableConfig.data = newQueryList;
          _this.refundDtoList.data = _this.jordanTableConfig.data;
          _this.amountReturned = _this
            .calculateMoney(_this.jordanTableConfig.data, 1)
            .toFixed(2);
          _this.returnTotal();
        });
      }
      // 退换货复制退单
      if (this.$route.query.cloneReturnGoodId) {
        axios({
          url: "/p/cs/returnOrderquery",
          method: "post",
          data: { id: _this.$route.query.cloneReturnGoodId, start: 1, count: 50 }
        }).then(async res => {
          if (res.data.code == 0) {
            _this.jordanTableConfig.loading = false;
            _this.information.formValue.BILL_TYPE = String(
              res.data.data.returnOrders.BILL_TYPE
            );
            _this.selectSelectt();
            if (
              _this.information.formValue.BILL_TYPE == "2" &&
              !res.data.data.returnOrders.IS_RESERVED
            ) {
              _this.information.formData[11].style = "select";
              _this.information.formValue.IS_RETURN_ORDER_EXCHANGE =
                res.data.data.returnOrders.IS_RETURN_ORDER_EXCHANGE;
              setTimeout(() => {
                document.getElementsByClassName(
                  "burgeon-select-selected-value"
                )[1].className = "burgeon-select-selected-value inputBgcolor";
              }, 10);
            }
            _this.status = res.data.data.returnOrders.RETURN_STATUS;
            // 单据状态为等待退货入库（20）、等待售后确认（30）、完成（50）、取消（60）时，显示水印
            if ([20, 30, 50, 60].includes(_this.status)) {
              _this.statusName = _this.$route.query.statusName;
              // 由于后台状态和水印不相同
              if (_this.status === 30) {
                _this.statusName = "等待售后审核";
              }
              if (_this.status === 60) {
                _this.statusName = "已取消";
              }
            }
            _this.defectiveList = res.data.data.orderDefects;
            for (let i = 0; i < res.data.data.refundDtoList.length; i++) {
              res.data.data.refundDtoList[i].PRODUCT_MARK =
                res.data.data.refundDtoList[i].PRODUCT_MARK == 1
                  ? "正品"
                  : "次品";
              res.data.data.refundDtoList[i].amt_refund_single =
                res.data.data.refundDtoList[i].AMT_REFUND_SINGLE;
              res.data.data.refundDtoList[i].SEX_NAME =
                res.data.data.refundDtoList[i].SEX_ENAME;
              res.data.data.refundDtoList[i].PRICE =
                res.data.data.refundDtoList[i].RESERVE_DECIMAL01;
              let proEcode = res.data.data.refundDtoList[i].PS_C_PRO_ECODE;
              await _this.getDataByProinfo(proEcode,1);
              res.data.data.refundDtoList[i].clrList = _this.clrListArr;
              res.data.data.refundDtoList[i].sizeList = _this.sizeListArr;
            }
            for (let i = 0; i < res.data.data.exchangeDtoList.length; i++) {
              let item = res.data.data.exchangeDtoList[i];
              item.SEX_NAME = item.SEX_ENAME;
              item.PRICE = item.RESERVE_DECIMAL01;
              let proEcode = item.PS_C_PRO_ECODE;
              await _this.getDataByProinfo(proEcode,1);
              item.clrList = _this.clrListArr;
              item.sizeList = _this.sizeListArr;
            }
            const replace = _this.replacement.formValue;
            replace.platform = res.data.data.returnOrders.PLATFORM; // 平台
            // res.data.data.exchangeDtoList.forEach(item => {
            //   item.SEX_NAME = item.SEX_ENAME;
            //   item.PRICE = item.RESERVE_DECIMAL01;
            // });

            res.data.data.refundDtoList.forEach(item => {
              item.QTY_EXCHANGE = item.QTY_REFUND;
            })
            _this.refundDtoList.data = res.data.data.refundDtoList;
            _this.exchangeDtoList.data = res.data.data.exchangeDtoList;

            _this.jordanTableConfig.data = res.data.data.refundDtoList;
            _this.onSelectData.push(res.data.data.returnOrders);
            _this.assignment(res.data.data.returnOrders);
            _this.tId = res.data.data.returnOrders.TID;
            _this.amountReturned = _this
              .calculateMoney(res.data.data.refundDtoList, 1)
              .toFixed(2); // 商品退回合计
            _this.exchangeAmount = _this
              .calculateMoney(res.data.data.exchangeDtoList, 2)
              .toFixed(2); // 换货金额合计
            _this.returnTotal();
            // 是否原退
            _this.isTowwms = res.data.data.returnOrders.IS_TOWMS;
            if (
              res.data.data.returnOrders.RETURN_STATUS == 20 &&
              (res.data.data.returnOrders.IS_TOWMS == 0 ||
                res.data.data.returnOrders.IS_TOWMS == 2)
            ) {
              _this.information.formData[12].disabled = false;
            } else {
              _this.information.formData[12].disabled = true;
            }
            if (
              (res.data.data.returnOrders.RETURN_STATUS == 20 &&
                res.data.data.returnOrders.IS_TOWMS == 2) ||
              res.data.data.returnOrders.IS_TOWMS == 2
            ) {
              _this.information.formData.forEach(item => {
                if (
                  item.style == "input" ||
                  item.style == "checkbox" ||
                  item.style == "select"
                )
                  item.disabled = true;
                else if (item.style == "popInput") item.itemdata.readonly = true;
              });
            }
            // 按钮是否可用
            if (res.data.data.returnOrders.RETURN_STATUS != 30) {
              _this.btnConfig.buttons.forEach(item => {
                if (item.text == "售后审核") {
                  item.disabled = true;
                }
              });
            }
            if (res.data.data.returnOrders.RETURN_STATUS != 20) {
              _this.btnConfig.buttons.forEach(item => {
                if (item.text == "取消") {
                  item.disabled = true;
                }
                if (item.text == "虚拟入库") {
                  item.disabled = true;
                }
              });
            }
            if (res.data.data.returnOrders.RETURN_STATUS == 60) {
              _this.btnConfig.buttons.forEach(item => {
                if (item.text == "修改备注") {
                  item.disabled = true;
                }
              });
            }
          } else {
            let err = res.data.message || "复制退单失败!";
            _this.$Message.error(err);
          }
        });
      }
    } else {
      this.getList();
      this.information.formData[1].disabled = true;
      this.information.formData[1].icon = "";
      this.information.formData[2].disabled = true;
      this.information.formData[3].disabled = true;
      this.information.formData[4].disabled = true;
      this.information.formData[5].itemdata.readonly = true;
      this.information.formData[10].disabled = true;
      let informationArr = [
        {
          style: "input",
          label: "换货平台单号",
          disabled: true,
          dataAcessKey: "TB_DISPUTE_ID",
          value: "TB_DISPUTE_ID",
          width: "6"
        },
        {
          style: "input",
          label: "次品调拨状态",
          disabled: true,
          dataAcessKey: "RESERVE_BIGINT07_type",
          value: "RESERVE_BIGINT07_type",
          width: "6"
        },
      ];
      this.information.formData[0].style = 'input';
      this.information.formData = this.information.formData.concat(
        informationArr
      );
    }
    this.$nextTick(() => {
      this.getDataAccess("OC_B_RETURN_ORDER", res => {
        this.SENSITIVE_COLUMNS = res.SENSITIVE_COLUMNS;
        // 退换货订单-基础信息
        this.information.formData.forEach((parent, parentIndex) => {
          res.SENSITIVE_COLUMNS.forEach((child, childIndex) => {
            if (parent.dataAcessKey == child.ecode) {
              if (this.$route.query.id === "-1") {
                this.setFormPermissions(parent, child, "add");
              } else {
                this.setFormPermissions(parent, child, "detail");
              }
            }
          });
        });
        // 退换货订单-收货人信息
        this.replacement.formData.forEach((parent, parentIndex) => {
          res.SENSITIVE_COLUMNS.forEach((child, childIndex) => {
            if (parent.dataAcessKey == child.ecode) {
              if (this.$route.query.id === "-1") {
                this.setFormPermissions(parent, child, "add");
              } else {
                this.setFormPermissions(parent, child, "detail");
              }
            }
          });
        });
      });
    });
    this.selectSelectt();
    this.obtainWarehouse();
    // 省市赋值
    this.replacement.formData[5].itemdata = this.fkcolumn.PROV;
    this.replacement.formData[6].inputList.push(this.fkcolumn.PROV);
    this.replacement.formData[6].itemdata = this.fkcolumn.CITY;
    this.replacement.formData[7].inputList.push(this.fkcolumn.CITY);
  },
  methods: {
    getQueryResionByName(data) {
      const _this = this;
      let queryData = _this.replacement.formData;
      queryData.map(item => {
        if (item.itemdata) {
          if (item.itemdata.name === "收货人省份") {
            item.itemdata.valuedata = data.CP_C_REGION_PROVINCE_ENAME;
            _this.replacement.formValue.receiver_province_id =
              data.CP_C_REGION_PROVINCE_ID;
            _this.replacement.formValue.receiver_province_name =
              data.CP_C_REGION_PROVINCE_ENAME;
          } else if (item.itemdata.name === "收货人市") {
            item.itemdata.valuedata = data.CP_C_REGION_CITY_ENAME;
            _this.replacement.formValue.receiver_city_id =
              data.CP_C_REGION_CITY_ID;
            _this.replacement.formValue.receiver_city_name =
              data.CP_C_REGION_CITY_ENAME;
          } else if (item.itemdata.name === "收货人区") {
            item.itemdata.valuedata = data.CP_C_REGION_AREA_ENAME;
            _this.replacement.formValue.receiver_area_id =
              data.CP_C_REGION_AREA_ID;
            _this.replacement.formValue.receiver_area_name =
              data.CP_C_REGION_AREA_ENAME;
          }
        }
      });
    },
    // 获取详情数据
    getList() {
      const _this = this;
      _this.jordanTableConfig.loading = true;
      axios({
        url: "/p/cs/findDetail",
        method: "post",
        data: { id: _this.$route.query.id, start: 1, count: 50 }
      }).then(async res => {
        if (res.data.code === 0) {
          _this.jordanTableConfig.loading = false;
          _this.information.formValue.BILL_TYPE = String(
            res.data.data.returnOrders.BILL_TYPE
          );
          _this.selectSelectt();
          if (
            _this.information.formValue.BILL_TYPE == "2" &&
            !res.data.data.returnOrders.IS_RESERVED
          ) {
            _this.information.formData[11].style = "select";
            _this.information.formValue.IS_RETURN_ORDER_EXCHANGE =
              res.data.data.returnOrders.IS_RETURN_ORDER_EXCHANGE;
            setTimeout(() => {
              document.getElementsByClassName(
                "burgeon-select-selected-value"
              )[1].className = "burgeon-select-selected-value inputBgcolor";
            }, 10);
          }
          _this.status = res.data.data.returnOrders.RETURN_STATUS;
          // 单据状态为等待退货入库（20）、等待售后确认（30）、完成（50）、取消（60）时，显示水印
          if ([20, 30, 50, 60].includes(_this.status)) {
            _this.statusName = _this.$route.query.statusName;
            // 由于后台状态和水印不相同
            if (_this.status === 30) {
              _this.statusName = "等待售后审核";
            }
            if (_this.status === 60) {
              _this.statusName = "已取消";
            }
          }
          _this.defectiveList = res.data.data.orderDefects;
          for (let i = 0; i < res.data.data.refundDtoList.length; i++) {
            res.data.data.refundDtoList[i].PRODUCT_MARK =
              res.data.data.refundDtoList[i].PRODUCT_MARK == 1
                ? "正品"
                : "次品";
            res.data.data.refundDtoList[i].amt_refund_single =
              res.data.data.refundDtoList[i].AMT_REFUND_SINGLE;
            res.data.data.refundDtoList[i].SEX_NAME =
              res.data.data.refundDtoList[i].SEX_ENAME;
            res.data.data.refundDtoList[i].PRICE =
              res.data.data.refundDtoList[i].RESERVE_DECIMAL01;
            let proEcode = res.data.data.refundDtoList[i].PS_C_PRO_ECODE;
            await _this.getDataByProinfo(proEcode,1);
            res.data.data.refundDtoList[i].clrList = _this.clrListArr;
            res.data.data.refundDtoList[i].sizeList = _this.sizeListArr;
          }
          for (let i = 0; i < res.data.data.exchangeDtoList.length; i++) {
            let item = res.data.data.exchangeDtoList[i];
            item.SEX_NAME = item.SEX_ENAME;
            item.PRICE = item.RESERVE_DECIMAL01;
            let proEcode = item.PS_C_PRO_ECODE;
            await _this.getDataByProinfo(proEcode,1);
            item.clrList = _this.clrListArr;
            item.sizeList = _this.sizeListArr;
          }
          _this.refundDtoList.data = res.data.data.refundDtoList;
          _this.exchangeDtoList.data = res.data.data.exchangeDtoList;

          _this.jordanTableConfig.data = res.data.data.refundDtoList;
          _this.onSelectData.push(res.data.data.returnOrders);
          _this.assignment(res.data.data.returnOrders);
          _this.amountReturned = _this
            .calculateMoney(res.data.data.refundDtoList, 1)
            .toFixed(2); // 商品退回合计
          _this.exchangeAmount = _this
            .calculateMoney(res.data.data.exchangeDtoList, 2)
            .toFixed(2); // 换货金额合计
          _this.returnTotal();
          // 是否原退
          _this.isTowwms = res.data.data.returnOrders.IS_TOWMS;
          if (
            res.data.data.returnOrders.RETURN_STATUS == 20 &&
            (res.data.data.returnOrders.IS_TOWMS == 0 ||
              res.data.data.returnOrders.IS_TOWMS == 2)
          ) {
            _this.information.formData[12].disabled = false;
          } else {
            _this.information.formData[12].disabled = true;
          }
          if (
            (res.data.data.returnOrders.RETURN_STATUS == 20 &&
              res.data.data.returnOrders.IS_TOWMS == 2) ||
            res.data.data.returnOrders.IS_TOWMS == 2
          ) {
            _this.information.formData.forEach(item => {
              if (
                item.style == "input" ||
                item.style == "checkbox" ||
                item.style == "select"
              )
                item.disabled = true;
              else if (item.style == "popInput") item.itemdata.readonly = true;
            });
          }
          // 按钮是否可用
          if (res.data.data.returnOrders.RETURN_STATUS != 30) {
            _this.btnConfig.buttons.forEach(item => {
              if (item.text == "售后审核") {
                item.disabled = true;
              }
            });
          }
          if (res.data.data.returnOrders.RETURN_STATUS != 20) {
            _this.btnConfig.buttons.forEach(item => {
              if (item.text == "取消") {
                item.disabled = true;
              }
              if (item.text == "虚拟入库") {
                item.disabled = true;
              }
            });
          }
          if (res.data.data.returnOrders.RETURN_STATUS == 60) {
            _this.btnConfig.buttons.forEach(item => {
              if (item.text == "修改备注") {
                item.disabled = true;
              }
            });
          }
          //设置不可编辑文本框
          _this.setDisplayByReturnOrder(res.data.data.returnOrders);
        } else {
          let err = res.data.message || "获取详情失败!";
          _this.$Message.error(err);
        }
      });
    },
   //设置文本框是否可编辑
    setDisplayByReturnOrder(returnOrders){
      let _this = this;
      let returnStatus = returnOrders.RETURN_STATUS;
      let inventedStatus = returnOrders.INVENTED_STATUS;
      //设置物流单号与申请数量是否可编辑
      if((returnStatus ===  30  && inventedStatus === 0) || inventedStatus === 2){
        _this.information.formData.forEach(item => {
          if (item.value === "LOGISTICS_CODE"){
            item.disabled = true;
          }
        });
        _this.qtyRefundEditFlag = false;
      }
      //设置颜色尺码是否可编辑
      if([20].includes(returnStatus)){
        _this.clrAndSizeFlag = true;
        _this.returnIdEditFlag = true;
      }else{
        _this.clrAndSizeFlag = false;
        _this.returnIdEditFlag = false;
      }
    },
    // 赋值
    assignment(data) {
      const item = this.information.formValue;
      this.inventedStatus = data.INVENTED_STATUS; // 虚拟入库状态
      // 基本信息
      item.ORIG_ORDER_ID = data.ORIG_ORDER_ID ? data.ORIG_ORDER_ID : "";
      item.ID = data.ID;
      item.TB_DISPUTE_ID = data.TB_DISPUTE_ID;
      if (data.RESERVE_BIGINT07 == 0) item.RESERVE_BIGINT07_type = '无次品调拨'
        else if (data.RESERVE_BIGINT07 == 2) item.RESERVE_BIGINT07_type = '次品已调拨'
        else if (data.RESERVE_BIGINT07 == 1) {
          item.RESERVE_BIGINT07_type = '次品未调拨';
          this.btnConfig.buttons.forEach(item => {
            if (item.text == '标记次品已调拨') item.disabled = false;
          })
        }
      // item.RESERVE_BIGINT07_type = data.RESERVE_BIGINT07_type;
      item.SELLER_MEMO = data.RESERVE_VARCHAR02;
      item.BILL_TYPE = String(data.BILL_TYPE) ? String(data.BILL_TYPE) : "";
      item.BUYER_NICK = data.BUYER_NICK ? data.BUYER_NICK : "";
      item.CP_C_LOGISTICS_ENAME = data.CP_C_LOGISTICS_ENAME
        ? data.CP_C_LOGISTICS_ENAME
        : "";
      item.ORIG_SOURCE_CODE = data.ORIG_SOURCE_CODE
        ? data.ORIG_SOURCE_CODE
        : "";
      item.CP_C_SHOP_TITLE = data.CP_C_SHOP_TITLE ? data.CP_C_SHOP_TITLE : "";
      item.CP_C_SHOP_ID = data.CP_C_SHOP_ID ? data.CP_C_SHOP_ID : "";
      item.RETURN_ID = data.RETURN_ID ? data.RETURN_ID : "";
      item.CP_C_LOGISTICS_ID = data.CP_C_LOGISTICS_ID
        ? data.CP_C_LOGISTICS_ID
        : "";
      item.RETURN_REASON = data.RETURN_REASON ? data.RETURN_REASON : "";
      item.LOGISTICS_CODE = data.LOGISTICS_CODE ? data.LOGISTICS_CODE : "";
      if (data.IS_RESERVED == 1) item.IS_RESERVED = true;
      else if (data.IS_RESERVED == 0) item.IS_RESERVED = false;
      if (data.IS_BACK == 1) item.IS_BACK = true;
      else if (data.IS_BACK == 0) item.IS_BACK = false;
      item.CP_C_STORE_ENAME = data.CP_C_STORE_ENAME
        ? data.CP_C_STORE_ENAME
        : "";
      item.REMARK = data.REMARK ? data.REMARK : "";
      this.information.formData[5].itemdata.valuedata = data.CP_C_SHOP_TITLE
        ? data.CP_C_SHOP_TITLE
        : "";
      this.information.formData[7].itemdata.valuedata = data.CP_C_LOGISTICS_ENAME
        ? data.CP_C_LOGISTICS_ENAME
        : "";
      this.information.formData[13].itemdata.pid = data.CP_C_PHY_WAREHOUSE_IN_ID
        ? data.CP_C_PHY_WAREHOUSE_IN_ID
        : ""; // 入库实体仓库
      this.information.formData[13].itemdata.valuedata =
        data.CP_C_PHY_WAREHOUSE_IN_ID_NAME;
      this.information.formValue.CP_C_PHY_WAREHOUSE_IN_ID =
        data.CP_C_PHY_WAREHOUSE_IN_ID;
      this.information.formData[14].itemdata.pid = data.CP_C_PHY_WAREHOUSE_ID
        ? data.CP_C_PHY_WAREHOUSE_ID
        : ""; // 发货实体仓库
      this.information.formData[14].itemdata.valuedata =
        data.CP_C_PHY_WAREHOUSE_ID_NAME;
      this.information.formValue.CP_C_PHY_WAREHOUSE_ID =
        data.CP_C_PHY_WAREHOUSE_ID;
      // 换货人信息
      const replace = this.replacement.formValue;
      replace.RECEIVE_NAME = data.RECEIVE_NAME ? data.RECEIVE_NAME : ""; // 收货人
      replace.RECEIVE_MOBILE = data.RECEIVE_MOBILE ? data.RECEIVE_MOBILE : ""; // 收货人手机
      replace.RECEIVE_PHONE = data.RECEIVE_PHONE ? data.RECEIVE_PHONE : ""; // 收货人电话
      replace.RECEIVE_ZIP = data.RECEIVE_ZIP ? data.RECEIVE_ZIP : ""; // 收货人邮编
      replace.receiver_province_id = data.RECEIVER_PROVINCE_ID
        ? data.RECEIVER_PROVINCE_ID
        : "";
      replace.receiver_province_name = data.RECEIVER_PROVINCE_NAME
        ? data.RECEIVER_PROVINCE_NAME
        : ""; // 收货人省份
      replace.receiver_city_name = data.RECEIVER_CITY_NAME
        ? data.RECEIVER_CITY_NAME
        : ""; // 收货人市id
      replace.receiver_city_id = data.RECEIVER_CITY_ID
        ? data.RECEIVER_CITY_ID
        : ""; // 收货人市
      replace.receiver_area_id = data.RECEIVER_AREA_ID
        ? data.RECEIVER_AREA_ID
        : ""; // 收货人县id
      replace.receiver_area_name = data.RECEIVER_AREA_NAME
        ? data.RECEIVER_AREA_NAME
        : ""; // 收货人县
      replace.SHIP_AMT = data.SHIP_AMT ? data.SHIP_AMT : ""; // 换货邮费
      replace.RECEIVE_ADDRESS = data.RECEIVE_ADDRESS
        ? data.RECEIVE_ADDRESS
        : ""; // 收货人地址
      this.replacement.formData[5].itemdata.valuedata = data.RECEIVER_PROVINCE_NAME
        ? data.RECEIVER_PROVINCE_NAME
        : "";
      this.replacement.formData[6].itemdata.valuedata = data.RECEIVER_CITY_NAME
        ? data.RECEIVER_CITY_NAME
        : "";
      this.replacement.formData[7].itemdata.valuedata = data.RECEIVER_AREA_NAME
        ? data.RECEIVER_AREA_NAME
        : "";
      // 退货金额
      this.returnPostage = data.RETURN_AMT_SHIP; // 应退邮费
      this.otherAmount = data.RETURN_AMT_OTHER; // 其他金额
      this.settlementAmount = data.CONSIGN_AMT_SETTLE; // 代销结算金额
    },
    // 修改备注
    bounced() {
      if (this.$route.query.id == "-1") {
        return;
      }
      this.changeRemarkConfig.componentData = { ids: this.$route.query.id, type:1 };
      this.$children.find(item => item.name === "jordanBounced").openConfirm();
    },
    // 标记次品已调拨
    defectiveGoods() {
      const _this = this;
      axios({
        url: "/p/cs/returnSkuDb",
        method: "post",
        cancelToken: true,
        data: { id: _this.$route.query.id }
      }).then(res => {
        if (res.data.code == 0) {
          _this.$Message.success(res.data.message);
          // _this.getList();
          _this.$router.go(0);
        } else {
          _this.$Message.error(res.data.message);
        }
      });
    },
    // 计算商品/换货金额总和
    calculateMoney(arr, num) {
      let sum = 0;
      let sumt = 0;
      if (num == 1) {
        for (let i = 0; i < arr.length; i++) {
          sum += +arr[i].AMT_REFUND;
        }
        return sum ? sum : 0;
      } else if (num == 2) {
        for (let i = 0; i < arr.length; i++) {
          sumt += +arr[i].AMT_REFUND;
        }
        return sumt ? sumt : 0;
      }
    },
    // 退货金额合计
    returnTotal(num, id) {
      const _this = this;
      if (num && id === 1) {
        setTimeout(() => {
          _this.returnPostage = /^[0-9]{0,8}(\.[0-9]{0,4})?/.exec(
            _this.returnPostage
          )[0];
        }, 100);
      } else if (num && id === 2) {
        setTimeout(() => {
          _this.otherAmount = /^[0-9]{0,8}(\.[0-9]{0,4})?/.exec(
            _this.otherAmount
          )[0];
        }, 100);
      }
      let a, b;
      setTimeout(() => {
        a = publicMethodsUtil.accAdd(
          _this.amountReturned ? _this.amountReturned : 0,
          _this.returnPostage
        );
        b = publicMethodsUtil.accAdd(a, _this.otherAmount);
        _this.returnTotalAmount = publicMethodsUtil.accSub(
          b,
          _this.exchangeAmount ? _this.exchangeAmount : 0
        );
      }, 150);
    },
    // 代销金额校验
    isSettlementAmount(num) {
      const _this = this;
      setTimeout(() => {
        _this.settlementAmount = /^[0-9]{0,8}(\.[0-9]{0,4})?/.exec(
          _this.settlementAmount
        )[0];
      }, 100);
      return;
    },
    // 切换tab
    labelClick(item, index) {
      const _this = this;
      if (index === 0) {
        _this.labelDefaultValue = 1;
        _this.isTab = 0;
        this.jordanTableConfig.data = this.refundDtoList.data;
        this.jordanTableConfig.columns = [
          {
            key: "RESERVE_VARCHAR01",
            title: "平台退款单号",
            dataAcessKey: "RESERVE_VARCHAR01",
            render: (h, params) => {
              let _this = this;
              if(_this.returnIdEditFlag){
                return h(
                  "div",
                  {
                    style: {
                      width: "100%",
                      display: "flex",
                      alignitems: "center",
                      justifyContent: "space-between"
                    }
                  },
                  [
                    h("Input", {
                      class: "qtyRefund",
                      style: {
                        width: "150",
                        height: "100%",
                        border: "1px solid #dcdee2",
                        "text-align": "center"
                      },
                      props: {
                        value: params.row.RESERVE_VARCHAR01,
                        autosize: true,
                      },
                      on: {
                        "on-change": e => {
                          params.row.RESERVE_VARCHAR01 = e.target.value;
                          _this.refundDtoList.data[params.index] = params.row;
                          _this.returnSelectData.forEach(item => {
                            if (
                              item.PS_C_SKU_ECODE === params.row.PS_C_SKU_ECODE
                            ) {
                              item.RESERVE_VARCHAR01 = params.row.RESERVE_VARCHAR01;
                            }
                          });
                          // if (_this.returnSelectData.length > 0) {
                          //   _this.amountReturned = _this
                          //     .calculateMoney(_this.returnSelectData, 1)
                          //     .toFixed(2);
                          //   _this.returnTotal();
                          // } else {
                          //   _this.amountReturned = _this
                          //     .calculateMoney(_this.refundDtoList.data, 1)
                          //     .toFixed(2);
                          //   _this.returnTotal();
                          // }
                        }
                      }
                    })
                  ]
                );
              }else{
                return h(
                  "div",
                  {
                    style: {
                      width: "100%",
                      display: "flex",
                      alignitems: "center",
                      justifyContent: "space-between"
                    }
                  },
                  [
                    h("Label", {
                      class: "isNone",
                      style: {
                        width: "100%",
                        height: "100%"
                      },
                      props: {
                        value: params.row.RESERVE_VARCHAR01,
                        autosize: true
                      }
                    }, params.row.RESERVE_VARCHAR01)
                  ]
                );
              }
            }
          },
          {
            key: "PS_C_PRO_ECODE",
            title: "商品编码",
            dataAcessKey: "PS_C_PRO_ECODE"

          },
          {
            key: "PS_C_CLR_ID",
            title: "颜色",
            dataAcessKey: "PS_C_CLR_ID",
            render: (h, params) => {
              let proEcode = params.row.PS_C_PRO_ECODE;
              let list = params.row.clrList;
              if(_this.clrAndSizeFlag){
                return h(
                  "div",
                  {
                    style: {
                      width: "100%",
                      display: "flex",
                      alignitems: "center",
                      justifyContent: "space-between"
                    },
                    on:{
                      "click":e => {
                        e.stopPropagation();
                      }
                    }
                  },
                  [
                    h("Select",
                      {
                        class: 'coloraa',
                        style: {
                          width: "150px"
                        },
                        props: {
                          value: params.row.PS_C_CLR_ID, //结算方式
                          transfer: true
                        },
                        on: {
                          "on-change": async value => {
                            let preClrId = _this.jordanTableConfig.data[
                              params.index
                              ].PS_C_CLR_ID;
                            _this.jordanTableConfig.data[
                              params.index
                              ].PS_C_CLR_ID = value;
                            let sizeId = params.row.PS_C_SIZE_ID;
                            if(sizeId){
                              await _this.getDataByProinfo(proEcode,2,sizeId,value);
                              if(!_this.itemSkuEcode){
                                _this.jordanTableConfig.data[params.index].PS_C_SKU_ECODE = "";
                                _this.jordanTableConfig.data[params.index].PS_C_SKU_ID = "";
                                _this.jordanTableConfig.data[params.index].skuId = "";
                                _this.jordanTableConfig.data[params.index].BARCODE = "";
                                return _this.$Message.warning("未查询到条码!");
                              }
                              let duplicateFlag = false;
                              _this.jordanTableConfig.data.map(item=>{
                                if(item.PS_C_SKU_ECODE === _this.itemSkuEcode){
                                  duplicateFlag = true;
                                }
                              });
                              _this.returnSelectData = [];
                              if(duplicateFlag){
                                _this.jordanTableConfig.data[params.index].PS_C_SKU_ECODE = "";
                                _this.jordanTableConfig.data[params.index].PS_C_SKU_ID = "";
                                _this.jordanTableConfig.data[params.index].skuId = "";
                                _this.jordanTableConfig.data[params.index].BARCODE = "";
                                return _this.$Message.warning("不允许出现条码一致的明细!");
                              }else{
                                _this.jordanTableConfig.data[
                                  params.index
                                  ].PS_C_SKU_ECODE = _this.itemSkuEcode;
                                _this.jordanTableConfig.data[
                                  params.index
                                  ].PS_C_SKU_ID = _this.itemSkuId;
                                _this.jordanTableConfig.data[
                                  params.index
                                  ].skuId = _this.itemSkuId;
                                _this.jordanTableConfig.data[
                                  params.index
                                  ].BARCODE = _this.itemGbcode;
                                _this.refundDtoList.data[params.index] = _this.jordanTableConfig.data[params.index];
                                for(let i =0; i<list.length;i++){
                                  let clrItem = list[i];
                                  if(clrItem.psCSpec1objId === value){
                                    _this.jordanTableConfig.data[
                                      params.index
                                      ].PS_C_CLR_ECODE = clrItem.psCSpec1objCode;
                                    _this.jordanTableConfig.data[
                                      params.index
                                      ].PS_C_CLR_ENAME = clrItem.psCSpec1objName;
                                    break;
                                  }
                                }
                              }
                            }
                          }
                        }
                      },
                      list.map(item =>
                        h("Option", {
                          props: {
                            value: item.psCSpec1objId,
                            label: item.psCSpec1objName
                          }
                        })
                      )
                    )
                  ]
                );
              }else{
                return h(
                  "div",
                  {
                    style: {
                      width: "100%",
                      height: "100%"
                    },
                  },
                  [
                    h("Label",
                      {
                        style: {
                          width: "150px"
                        },
                        props: {
                          value: params.row.PS_C_CLR_ID,
                          autosize: true
                        },
                      },
                      params.row.PS_C_CLR_ENAME
                    )
                  ]
                );
              }
            }
          },
          {
            key: "PS_C_SIZE_ID",
            dataAcessKey: "PS_C_SIZE_ID",
            title: "尺码",
            render: (h, params) => {
              let proEcode = params.row.PS_C_PRO_ECODE;
              let list = params.row.sizeList;
              if(_this.clrAndSizeFlag){
                return h(
                  "div",
                  {
                    style: {
                      width: "100%",
                      display: "flex",
                      alignitems: "center",
                      justifyContent: "space-between"
                    },
                    on:{
                      "click":e => {
                        e.stopPropagation();
                      }
                    }
                  },
                  [
                    h("Select",
                      {
                        style: {
                          width: "150px"
                        },
                        props: {
                          value: params.row.PS_C_SIZE_ID,
                          transfer: true
                        },
                        on: {
                          "on-change": async value => {
                            let preSizeId = _this.jordanTableConfig.data[
                              params.index
                              ].PS_C_SIZE_ID;
                            _this.jordanTableConfig.data[
                              params.index
                              ].PS_C_SIZE_ID = value;
                            let clrId = params.row.PS_C_CLR_ID;
                            if(clrId){
                              await _this.getDataByProinfo(proEcode,2,value,clrId);
                              if(!_this.itemSkuEcode){
                                _this.jordanTableConfig.data[params.index].PS_C_SKU_ECODE = "";
                                _this.jordanTableConfig.data[params.index].PS_C_SKU_ID = "";
                                _this.jordanTableConfig.data[params.index].skuId = "";
                                _this.jordanTableConfig.data[params.index].BARCODE = "";
                                return _this.$Message.warning("未查询到条码!");
                              }
                              let duplicateFlag = false;
                              _this.jordanTableConfig.data.map(item=>{
                                if(item.PS_C_SKU_ECODE === _this.itemSkuEcode){
                                  duplicateFlag = true;
                                }
                              });
                              _this.returnSelectData = [];
                              if(duplicateFlag){
                                _this.jordanTableConfig.data[params.index].PS_C_SKU_ECODE = "";
                                _this.jordanTableConfig.data[params.index].PS_C_SKU_ID = "";
                                _this.jordanTableConfig.data[params.index].skuId = "";
                                _this.jordanTableConfig.data[params.index].BARCODE = "";
                                return _this.$Message.warning("不允许出现条码一致的明细!");
                              }else{
                                // for(let i =0; i<_this.returnSelectData.length;i++){
                                //   let selection = _this.returnSelectData[i];
                                //   if(selection.PS_C_PRO_ECODE === proEcode && selection.PS_C_CLR_ID === clrId && selection.PS_C_SIZE_ID === preSizeId){
                                //     _this.returnSelectData.splice(i, 1);
                                //     break;
                                //   }
                                // }
                                for(let i =0; i<list.length;i++){
                                  let sizeItem = list[i];
                                  if(sizeItem.psCSpec2objId === value){
                                    _this.jordanTableConfig.data[
                                      params.index
                                      ].PS_C_SIZE_ECODE = sizeItem.psCSpec2objCode;
                                    _this.jordanTableConfig.data[
                                      params.index
                                      ].PS_C_SIZE_ENAME = sizeItem.psCSpec2objName;
                                    break;
                                  }
                                }
                                _this.jordanTableConfig.data[
                                  params.index
                                  ].PS_C_SKU_ECODE = _this.itemSkuEcode;
                                _this.jordanTableConfig.data[
                                  params.index
                                  ].PS_C_SKU_ID = _this.itemSkuId;
                                _this.jordanTableConfig.data[
                                  params.index
                                  ].skuId = _this.itemSkuId;
                                _this.jordanTableConfig.data[
                                  params.index
                                  ].BARCODE = _this.itemGbcode;
                                _this.refundDtoList.data[params.index] = _this.jordanTableConfig.data[params.index];
                                // if(_this.returnSelectData.length > 0){
                                //   _this.returnSelectData.forEach((selection, i) => {
                                //     _this.refundDtoList.data.forEach((item, index) => {
                                //       if (selection.PS_C_SKU_ECODE === item.PS_C_SKU_ECODE) {
                                //         _this.returnSelectData[i] =  _this.refundDtoList.data[index];
                                //       }
                                //     })
                                //   });
                                // }
                              }
                            }
                          }
                        }
                      },
                      list.map(item =>
                        h("Option", {
                          props: {
                            value: item.psCSpec2objId,
                            label: item.psCSpec2objName
                          }
                        })
                      ))
                  ]
                );
              }else{
                return h(
                  "div",
                  {
                    style: {
                      width: "100%",
                      height: "100%"
                    },
                  },
                  [
                    h("Label",
                      {
                        style: {
                          width: "150px"
                        },
                        props: {
                          value: params.row.PS_C_SIZE_ID,
                          autosize: true
                        },
                      },
                      params.row.PS_C_SIZE_ENAME
                    )
                  ]
                );
              }

            }
          },
          {
            key: "QTY_REFUND",
            title: "申请数量",
            dataAcessKey: "QTY_REFUND",
            render: (h, params) => {
              let _this = this;
              if(_this.qtyRefundEditFlag){
                return h(
                  "div",
                  {
                    style: {
                      width: "100%",
                      display: "flex",
                      alignitems: "center",
                      justifyContent: "space-between"
                    }
                  },
                  [
                    h("Input", {
                      class: "qtyRefund",
                      style: {
                        width: "150",
                        height: "100%",
                        border: "1px solid #dcdee2",
                        "text-align": "center"
                      },
                      props: {
                        value: params.row.QTY_REFUND,
                        autosize: true,
                        regx: /^[1-9]\d*$/
                      },

                      on: {
                        "on-change": e => {
                          if (
                            parseInt(
                              _this.jordanTableConfig.data[params.index]
                                .QTY_CAN_REFUND
                            ) < parseInt(e.target.value)
                          ) {
                            _this.$Message.warning("申请数量不允许大于可退数量!");
                            setTimeout(() => {
                              document.getElementsByClassName("qtyRefund")[
                                params.index
                                ].childNodes[6].value =
                                _this.jordanTableConfig.data[
                                  params.index
                                  ].QTY_REFUND;
                            }, 100);
                            return;
                          }
                          if (params.row.amt_refund_single == 0) {
                            params.row.AMT_REFUND = publicMethodsUtil.accMul(
                              e.target.value,
                              params.row.PRICE === null ? 0 : params.row.PRICE
                            );
                          } else {
                            params.row.AMT_REFUND = publicMethodsUtil.accMul(
                              e.target.value,
                              params.row.amt_refund_single
                            );
                          }
                          //计算结算金额
                          params.row.RESERVE_DECIMAL03 =  publicMethodsUtil.accMul(
                            e.target.value,
                            params.row.RESERVE_DECIMAL02 === null ? 0 : params.row.RESERVE_DECIMAL02
                          );
                          params.row.QTY_REFUND = e.target.value;
                          _this.refundDtoList.data[params.index] = params.row;
                          _this.returnSelectData.forEach(item => {
                            if (
                              item.PS_C_SKU_ECODE === params.row.PS_C_SKU_ECODE
                            ) {
                              item.QTY_CAN_REFUND = params.row.QTY_CAN_REFUND;
                              item.AMT_REFUND = params.row.AMT_REFUND;
                              item.QTY_REFUND = params.row.QTY_REFUND;
                              item.QTY_EXCHANGE = params.row.QTY_REFUND;
                              item.RESERVE_DECIMAL03 = params.row.RESERVE_DECIMAL03;
                            }
                          });
                          if (_this.returnSelectData.length > 0) {
                            _this.amountReturned = _this
                              .calculateMoney(_this.returnSelectData, 1)
                              .toFixed(2);
                            _this.returnTotal();
                          } else {
                            _this.amountReturned = _this
                              .calculateMoney(_this.refundDtoList.data, 1)
                              .toFixed(2);
                            _this.returnTotal();
                          }
                        }
                      }
                    })
                  ]
                );
              }else{
                return h(
                  "div",
                  {
                    style: {
                      width: "100%",
                      display: "flex",
                      alignitems: "center",
                      justifyContent: "space-between"
                    }
                  },
                  [
                    h("Label", {
                      class: "isNone",
                      style: {
                        width: "100%",
                        height: "100%"
                      },
                      props: {
                        value: params.row.QTY_REFUND,
                        autosize: true
                      }
                    }, params.row.QTY_REFUND)
                  ]
                );
              }
            }
          },
          {
            key: "PS_C_SKU_ECODE",
            title: "条码",
            dataAcessKey: "PS_C_SKU_ECODE"
          },
          {
            key: "BARCODE",
            title: "国标码",
            dataAcessKey: "BARCODE"
          },
          {
            key: "PS_C_PRO_ENAME",
            title: "商品名称",
            dataAcessKey: "PS_C_PRO_ENAME"
          },
          {
            key: "SEX_NAME",
            title: "性别",
            dataAcessKey: "SEX"
          },
          {
            key: "QTY_IN",
            title: "入库数量",
            dataAcessKey: "QTY_IN"
          },
          {
            key: "QTY_CAN_REFUND",
            title: "订单数量",
            dataAcessKey: "QTY_CAN_REFUND"
          },
          {
            key: "PRICE",
            title: "吊牌价",
            dataAcessKey: "RESERVE_DECIMAL01"
          },
          {
            key: "amt_refund_single",
            title: "单件退货金额",
            dataAcessKey: "AMT_REFUND_SINGLE"
          },
          {
            key: "AMT_REFUND",
            dataAcessKey: "AMT_REFUND",
            title: "退货金额"
          },
          {
            key: "RESERVE_DECIMAL02",
            dataAcessKey: "RESERVE_DECIMAL02",
            title: "结算单价"
          },
          {
            key: "RESERVE_DECIMAL03",
            dataAcessKey: "RESERVE_DECIMAL03",
            title: "结算金额"
          },
          {
            key: "PRODUCT_MARK",
            title: "商品标记",
            dataAcessKey: "PRODUCT_MARK",
            render: (h, params) => {
              let list = [
                {
                  SPEC: "正品"
                },
                {
                  SPEC: "次品"
                }
              ];
              return h(
                "Select",
                {
                  style: {
                    width: "150px"
                  },
                  props: {
                    value: params.row.PRODUCT_MARK, //结算方式
                    transfer: true
                  },
                  on: {
                    "on-change": value => {
                      console.log(params);
                      _this.jordanTableConfig.data[
                        params.index
                      ].PRODUCT_MARK = value;
                    }
                  }
                },
                list.map(item =>
                  h("Option", {
                    props: {
                      value: item.SPEC,
                      label: item.SPEC
                    }
                  })
                )
              );
            }
          }
        ]; //表头
        this.getDataAccess("OC_B_RETURN_ORDER", res => {
          this.jordanTableConfig.columns =  this.setTablePermissions(this.jordanTableConfig.columns,res);
        });
        // 判断是否为修改页面
        // 是 => 不可新增/删除明细
        // 不是 => 可以新增/删除明细
        if (_this.$route.query.id === "-1") {
          _this.jordanTableConfig.jordanFormConfig = {};
          _this.jordanTableConfig.isShowDeleteDetailBtn = true;
          _this.jordanTableConfig.isShowAddDetailBtn = true;
          _this.jordanTableConfig.isShowImportBtn = true;
          _this.jordanTableConfig.isShowExportBtn = true;
        } else {
          _this.jordanTableConfig.jordanFormConfig = {};
          _this.jordanTableConfig.isShowDeleteDetailBtn = false;
          _this.jordanTableConfig.isShowAddDetailBtn = false;
          _this.jordanTableConfig.isShowImportBtn = false;
          _this.jordanTableConfig.isShowExportBtn = false;
        }
      } else if (index === 1) {
        _this.labelDefaultValue = 2;
        _this.isTab = 1;
        if (_this.returnSelectData.length) {
          _this.exchangeDtoList.data = [];
          _this.jordanTableConfig2.data = [];
          let returnSelectDataArr = JSON.parse(JSON.stringify(_this.returnSelectData));
          returnSelectDataArr.forEach((item) =>{
            item.ID = -1
          });
          _this.exchangeDtoList.data =  _this.exchangeDtoList.data.concat(returnSelectDataArr);
          let newArr = [];
          newArr.push(_this.exchangeDtoList.data[0]);
          for (let i = 0; i < _this.exchangeDtoList.data.length; i++) {
            let status = 0;
            for (let j = 0; j < newArr.length; j++) {
              if (
                _this.exchangeDtoList.data[i].PS_C_SKU_ECODE ==
                newArr[j].PS_C_SKU_ECODE
              ) {
                status = 1;
                break;
              }
            }
            if (status == 0) {
              newArr.push(_this.exchangeDtoList.data[i]);
            }
          }
          _this.exchangeDtoList.data = newArr;
          _this.exchangeAmount = _this
            .calculateMoney(_this.exchangeDtoList.data, 2)
            .toFixed(2);
          _this.returnTotal();
        }
        this.jordanTableConfig2.data = this.exchangeDtoList.data;
        this.jordanTableConfig2.columns = [
          {
            key: "PS_C_PRO_ECODE",
            title: "商品编码",
            dataAcessKey: "PS_C_PRO_ECODE",
          },
          {
            key: "PS_C_CLR_ID",
            dataAcessKey: "PS_C_CLR_ID",
            title: "颜色",
            render: (h, params) => {
              let proEcode = params.row.PS_C_PRO_ECODE;
              let list = params.row.clrList;
              if(_this.clrAndSizeFlag){
                return h(
                  "div",
                  {
                    style: {
                      width: "100%",
                      display: "flex",
                      alignitems: "center",
                      justifyContent: "space-between"
                    },
                    on:{
                      "click":e => {
                        e.stopPropagation();
                      }
                    }
                  },
                  [
                    h("Select",
                      {
                        style: {
                          width: "150px"
                        },
                        props: {
                          value: params.row.PS_C_CLR_ID,
                          transfer: true
                        },
                        on: {
                          "on-change": async value => {
                            _this.jordanTableConfig2.data[
                              params.index
                              ].PS_C_CLR_ID = value;
                            let sizeId = params.row.PS_C_SIZE_ID;
                            if(sizeId){
                              await _this.getDataByProinfo(proEcode,2,sizeId,value);
                              if(!_this.itemSkuEcode){
                                _this.jordanTableConfig2.data[params.index].PS_C_SKU_ECODE = "";
                                _this.jordanTableConfig2.data[params.index].PS_C_SKU_ID = "";
                                _this.jordanTableConfig2.data[params.index].skuId = "";
                                _this.jordanTableConfig2.data[params.index].BARCODE = "";
                                return _this.$Message.warning("未查询到条码!");
                              }
                              let duplicateFlag = false;
                              _this.jordanTableConfig2.data.map(item=>{
                                if(item.PS_C_SKU_ECODE === _this.itemSkuEcode){
                                  duplicateFlag = true;
                                }
                              });
                              if(duplicateFlag){
                                _this.jordanTableConfig2.data[params.index].PS_C_SKU_ECODE = "";
                                _this.jordanTableConfig2.data[params.index].PS_C_SKU_ID = "";
                                _this.jordanTableConfig2.data[params.index].skuId = "";
                                _this.jordanTableConfig2.data[params.index].BARCODE = "";
                                return _this.$Message.warning("不允许出现条码一致的明细!");
                              }else{
                                _this.jordanTableConfig2.data[
                                  params.index
                                  ].PS_C_SKU_ECODE = _this.itemSkuEcode;
                                _this.jordanTableConfig2.data[
                                  params.index
                                  ].PS_C_SKU_ID = _this.itemSkuId;
                                _this.jordanTableConfig2.data[
                                  params.index
                                  ].skuId = _this.itemSkuId;
                                _this.jordanTableConfig2.data[
                                  params.index
                                  ].BARCODE = _this.itemGbcode;
                                _this.exchangeDtoList.data[params.index] = _this.jordanTableConfig2.data[params.index];
                                for(let i =0; i<list.length;i++){
                                  let clrItem = list[i];
                                  if(clrItem.psCSpec1objId === value){
                                    _this.jordanTableConfig2.data[
                                      params.index
                                      ].PS_C_CLR_ECODE = clrItem.psCSpec1objCode;
                                    _this.jordanTableConfig2.data[
                                      params.index
                                      ].PS_C_CLR_ENAME = clrItem.psCSpec1objName;
                                    break;
                                  }
                                }
                              }
                            }
                          }
                        }
                      },
                      list.map(item =>
                        h("Option", {
                          props: {
                            value: item.psCSpec1objId,
                            label: item.psCSpec1objName
                          }
                        })
                      )
                    )
                  ]
                );
              }else{
                return h(
                  "div",
                  {
                    style: {
                      width: "100%",
                      height: "100%"
                    },
                  },
                  [
                    h("Label",
                      {
                        style: {
                          width: "150px"
                        },
                        props: {
                          value: params.row.PS_C_CLR_ID,
                          autosize: true
                        },
                      },
                      params.row.PS_C_CLR_ENAME
                    )
                  ]
                );
              }
            }
          },
          {
            key: "PS_C_SIZE_ID",
            dataAcessKey: "PS_C_SIZE_ID",
            title: "尺码",
            render: (h, params) => {
              let proEcode = params.row.PS_C_PRO_ECODE;
              let list = params.row.sizeList;
              if(_this.clrAndSizeFlag){
                return h(
                  "div",
                  {
                    style: {
                      width: "100%",
                      display: "flex",
                      alignitems: "center",
                      justifyContent: "space-between"
                    },
                    on:{
                      "click":e => {
                        e.stopPropagation();
                      }
                    }
                  },
                  [
                    h("Select",
                      {
                        style: {
                          width: "150px"
                        },
                        props: {
                          value: params.row.PS_C_SIZE_ID, //结算方式
                          transfer: true
                        },
                        on: {
                          "on-change": async value => {
                            _this.jordanTableConfig2.data[
                              params.index
                              ].PS_C_SIZE_ID = value;
                            let clrId = params.row.PS_C_CLR_ID;
                            if(clrId){
                              await _this.getDataByProinfo(proEcode,2,value,clrId);
                              if(!_this.itemSkuEcode){
                                _this.jordanTableConfig2.data[params.index].PS_C_SKU_ECODE = "";
                                _this.jordanTableConfig2.data[params.index].PS_C_SKU_ID = "";
                                _this.jordanTableConfig2.data[params.index].skuId = "";
                                _this.jordanTableConfig2.data[params.index].BARCODE = "";
                                return _this.$Message.warning("未查询到条码!");
                              }
                              let duplicateFlag = false;
                              _this.jordanTableConfig2.data.map(item=>{
                                if(item.PS_C_SKU_ECODE === _this.itemSkuEcode){
                                  duplicateFlag = true;
                                }
                              });
                              if(duplicateFlag){
                                _this.jordanTableConfig2.data[params.index].PS_C_SKU_ECODE = "";
                                _this.jordanTableConfig2.data[params.index].PS_C_SKU_ID = "";
                                _this.jordanTableConfig2.data[params.index].skuId = "";
                                _this.jordanTableConfig2.data[params.index].BARCODE = "";
                                return _this.$Message.warning("不允许出现条码一致的明细!");
                              }else{
                                _this.jordanTableConfig2.data[
                                  params.index
                                  ].PS_C_SKU_ECODE = _this.itemSkuEcode;
                                _this.jordanTableConfig2.data[
                                  params.index
                                  ].PS_C_SKU_ID = _this.itemSkuId;
                                _this.jordanTableConfig2.data[
                                  params.index
                                  ].skuId = _this.itemSkuId;
                                _this.jordanTableConfig2.data[
                                  params.index
                                  ].BARCODE = _this.itemGbcode;
                                _this.exchangeDtoList.data[params.index] = _this.jordanTableConfig2.data[params.index];
                                for(let i =0; i<list.length;i++){
                                  let sizeItem = list[i];
                                  if(sizeItem.psCSpec2objId === value){
                                    _this.jordanTableConfig2.data[
                                      params.index
                                      ].PS_C_SIZE_ECODE = sizeItem.psCSpec2objCode;
                                    _this.jordanTableConfig2.data[
                                      params.index
                                      ].PS_C_SIZE_ENAME = sizeItem.psCSpec2objName;
                                    break;
                                  }
                                }
                              }
                            }
                          }
                        }
                      },
                      list.map(item =>
                        h("Option", {
                          props: {
                            value: item.psCSpec2objId,
                            label: item.psCSpec2objName
                          }
                        })
                      ))
                  ]
                );
              }else{
                return h(
                  "div",
                  {
                    style: {
                      width: "100%",
                      height: "100%"
                    },
                  },
                  [
                    h("Label",
                      {
                        style: {
                          width: "150px"
                        },
                        props: {
                          value: params.row.PS_C_SIZE_ID,
                          autosize: true
                        },
                      },
                      params.row.PS_C_SIZE_ENAME
                    )
                  ]
                );
              }

            }
          },
          {
            key: "QTY_EXCHANGE",
            dataAcessKey: "ORIG_ORDER_ID",
            title: "换货数量",
            render: (h, params) => {
              let _this = this;
              return h(
                "div",
                {
                  style: {
                    width: "100%",
                    display: "flex",
                    alignitems: "center",
                    justifyContent: "space-between"
                  }
                },
                [
                  h("Input", {
                    style: {
                      width: "150",
                      height: "100%",
                      border: "1px solid #dcdee2",
                      "text-align": "center"
                    },
                    props: {
                      value: params.row.QTY_EXCHANGE,
                      autosize: true,
                      regx: /^[1-9]\d*$/
                    },

                    on: {
                      "on-change": e => {
                        // _this.jordanTableConfig.data[params.index].QTY_EXCHANGE = e.target.value;
                        // _this.jordanTableConfig.data[params.index].AMT_REFUND = publicMethodsUtil.accMul(e.target.value, _this.jordanTableConfig.data[params.index].PRICE);
                        params.row.QTY_EXCHANGE = e.target.value;
                        params.row.AMT_REFUND = publicMethodsUtil.accMul(
                          e.target.value,
                          params.row.PRICE
                        );
                        _this.exchangeDtoList.data[params.index] = params.row;
                        _this.exchangeAmount = _this
                          .calculateMoney(_this.exchangeDtoList.data, 2)
                          .toFixed(2);
                        _this.returnTotal();
                      }
                    }
                  })
                ]
              );
            }
          },
          {
            key: "PS_C_SKU_ECODE",
            dataAcessKey: "PS_C_SKU_ECODE",
            title: "条码"
          },
          {
            key: "BARCODE",
            dataAcessKey: "BARCODE",
            title: "国标码"
          },
          {
            key: "PS_C_PRO_ENAME",
            dataAcessKey: "PS_C_PRO_ENAME",
            title: "商品名称"
          },
          {
            key: "SEX_NAME",
            dataAcessKey: "SEX",
            title: "性别"
          },
          {
            key: "PRICE",
            dataAcessKey: "RESERVE_DECIMAL01",
            title: "吊牌价"
          },
          {
            key: "AMT_REFUND",
            dataAcessKey: "AMT_REFUND",
            title: "换货金额",
            render: (h, params) => {
              let _this = this;
              return h(
                "div",
                {
                  style: {
                    width: "100%",
                    display: "flex",
                    alignitems: "center",
                    justifyContent: "space-between"
                  }
                },
                [
                  h("Input", {
                    style: {
                      width: "150",
                      height: "100%",
                      border: "1px solid #dcdee2",
                      "text-align": "center"
                    },
                    props: {
                      value: params.row.AMT_REFUND,
                      autosize: true,
                      regx: /^(([1-9]{1}\d*)|(0{1}))(\.\d{0,2})?$/
                    },

                    on: {
                      "on-change": e => {
                        params.row.AMT_REFUND = e.target.value;
                        // _this.jordanTableConfig.data[params.index].AMT_REFUND = params.row.AMT_REFUND;
                        _this.exchangeDtoList.data[params.index] = params.row;
                        _this.exchangeAmount = _this
                          .calculateMoney(_this.exchangeDtoList.data, 2)
                          .toFixed(2);
                        _this.returnTotal();
                      }
                    }
                  })
                ]
              );
            }
          }
        ]; //表
        this.getDataAccess("OC_B_RETURN_ORDER", res => {
          this.jordanTableConfig2.columns =  this.setTablePermissions(this.jordanTableConfig2.columns,res);
        });
        if (_this.$route.query.id === "-1") {
          _this.jordanTableConfig2.jordanFormConfig = {
            formValue: {
              sku: "",
              number: "1",
              gbCode: ''
            },
            formData: [
              {
                label: "商品编码",
                style: "dimSearch",
                width: "6",
                value: "gbCode",
                columns: ["ECODE"],
                AuotData: [], //匹配的选项
                dimChange: val => {
                  //模糊查询的方法
                  let _this = this;
                  _this.jordanTableConfig2.jordanFormConfig.formValue.gbCode = val.trim();
                  let fromdata = new FormData();
                  let params = {"GLOBAL": val.trim(),"PAGENUM":1,"PAGESIZE":10,"CONDITION":{},"TABLENAME":"PS_C_PRO"}
                  fromdata.append('param', JSON.stringify(params));
                  axios({
                    url: "/p/cs/screenresult",
                    method: "post",
                    data: fromdata
                  }).then(res => {
                    if (res.data.code === 0) {
                      let dimList = _this.jordanTableConfig2.jordanFormConfig.formData;

                      dimList.map(item => {
                        if (item.label === "商品编码") {
                          item.AuotData = res.data.data.list;
                        }
                      });
                    }
                  });
                },
                dimEnter: val => {
                  const self = this;
                  if (!self.information.formData[14].itemdata.pid) {
                    self.$Message.warning("发货店仓，不能为空");
                    return;
                  }
                  self.matrixBox.componentData = {
                    objid: -1,
                    encode: val,
                    distribIds: self.information.formData[14].itemdata.pid,
                    tablename: 'OC_B_RETURN_ORDER',
                    returnType: '2'
                  };
                  self.$children
                    .find(item => item.name === "jordanMatrixBox")
                    .openConfirm();
                },
                dimSelect: val => {
                  const self = this;
                  if (!self.information.formData[14].itemdata.pid) {
                    self.$Message.warning("发货店仓，不能为空");
                    return;
                  }
                  self.matrixBox.componentData = {
                    objid: -1,
                    encode: val.label,
                    distribIds: self.information.formData[14].itemdata.pid,
                    tablename: 'OC_B_RETURN_ORDER',
                    returnType: '2'
                  };
                  self.$children
                    .find(item => item.name === "jordanMatrixBox")
                    .openConfirm();
                  // document.getElementById("Num").focus();
                }
              },
              {
                style: "dimSearch", //输入框类型
                label: "条码", //输入框前文字
                value: "sku", //输入框的值
                placeholder: "请输入sku、款号",
                width: "6", //所占的宽度 (宽度分为24份,数值代表所占份数的宽度)
                columns: ["ECODE"],
                AuotData: [], //匹配的选项
                dimChange: search => {
                  _this.jordanTableConfig2.jordanFormConfig.formValue.sku = _this.jordanTableConfig2.jordanFormConfig.formValue.sku.replace(
                    /(^\s*)|(\s*$)/g,
                    ""
                  );
                  //模糊查询的方法
                  _this.getData(search, 2);
                },
                dimEnter: val => {
                  _this.jordanTableConfig2.jordanFormConfig.formValue.sku = _this.jordanTableConfig2.jordanFormConfig.formValue.sku.replace(
                    /(^\s*)|(\s*$)/g,
                    ""
                  );
                  _this.entry(
                    _this.jordanTableConfig2.jordanFormConfig.formValue.sku,
                    2
                  );
                },
                dimSelect: obj => {
                  _this.jordanTableConfig2.jordanFormConfig.formValue.sku =
                    obj.label;
                  // document.getElementById("Enumber").focus();
                }
              },
              // {
              //   style: "input", //输入框类型
              //   label: "数量", //输入框前文字
              //   value: "number", //输入框的值
              //   id: "Enumber",
              //   width: "6", //所占的宽度 (宽度分为24份,数值代表所占份数的宽度)
              //   inputenter: () => {
              //     // const _this = _this;
              //     // _this.searchOnEnter(_this.jordanTableConfig2.jordanFormConfig.formValue.number)
              //     console.log(this.returnSelectData, "++++++++");
              //     let self = _this;
              //     let number =
              //       self.jordanTableConfig2.jordanFormConfig.formValue.number;
              //     let ecode =
              //       self.jordanTableConfig2.jordanFormConfig.formValue.sku;
              //     if (ecode) {
              //       _this.entry(ecode, 2);
              //     } else {
              //       _this.$Message.warning("请输入条码!");
              //     }
              //   }
              // }
            ]
          };
          _this.jordanTableConfig2.isShowDeleteDetailBtn = true;
          _this.jordanTableConfig2.isShowImportBtn = true;
          _this.jordanTableConfig2.isShowExportBtn = true;
        } else {
          _this.jordanTableConfig2.jordanFormConfig = {};
          _this.jordanTableConfig2.isShowDeleteDetailBtn = false;
          _this.jordanTableConfig2.isShowImportBtn = false;
          _this.jordanTableConfig2.isShowExportBtn = false;
        }
        // _this.returnSelectData = [];
      } else if (index === 2) {
        _this.labelDefaultValue = 3;
        _this.tab2 = {
          tablename: "OC_B_RETURN_ORDER",
          objid: this.$route.query.id
        };
        // _this.returnSelectData = [];
      } else if (index === 3) {
        _this.labelDefaultValue = 4;
        this.jordanTableConfig4.data = this.defectiveList;
        this.jordanTableConfig4.columns = [
          {
            key: "PS_C_PRO_ECODE",
            dataAcessKey: "PS_C_PRO_ECODE",
            title: "商品编码"
          },
          {
            key: "PS_C_CLR_ENAME",
            dataAcessKey: "PS_C_CLR_ENAME",
            title: "颜色"
          },
          {
            key: "PS_C_SIZE_ENAME",
            dataAcessKey: "PS_C_SIZE_ENAME",
            title: "尺码"
          },
          {
            key: "PS_C_SKU_ECODE",
            dataAcessKey: "PS_C_SKU_ECODE",
            title: "条码"
          },
          {
            key: "GBCODE",
            dataAcessKey: "BARCODE",
            title: "国标码"
          },
          {
            key: "PS_C_PRO_ENAME",
            dataAcessKey: "PS_C_PRO_ENAME",
            title: "商品名称"
          },
          {
            key: "QTY_IN",
            dataAcessKey: "QTY_IN",
            title: "入库数量"
          }
        ];
        //处理页面权限
        this.getDataAccess("OC_B_RETURN_ORDER", res => {
          this.jordanTableConfig4.columns =  this.setTablePermissions(this.jordanTableConfig4.columns,res)
        });
      }
    },
    // 保存
    saveData() {
      let _this = this;
      // 传WMS成功的单据不允许修改
      if (_this.isTowwms == 2) {
        return this.$Message.warning("传WMS成功状态的单据不可修改！");
      }
      // 只有等待退货入库和等待售后确认状态的可以修改
      if (_this.$route.query.id !== "-1") {
        if (
          (_this.status != 20 && _this.status != 30 && _this.status != 50) ||
          (_this.status == 50 && _this.inventedStatus != 1)
        ) {
          return this.$Message.warning(
            "只有等待退货入库和等待售后确认状态的单据 或 完成状态且虚拟入库未入库状态的单据可修改!"
          );
        } else if (_this.status == 20 && _this.isTowwms == 2) {
          return this.$Message.warning(
            "等待退货入库且传WMS成功状态的单据不可修改！"
          );
        }
      }
      if (!_this.information.formValue.ORIG_ORDER_ID) {
        return this.$Message.warning("原始订单编号不能为空!");
      }
      if (!_this.information.formValue.CP_C_SHOP_ID) return this.$Message.warning("店铺名称不能为空!");
      // if (!_this.information.formValue.CP_C_LOGISTICS_ID) return this.$Message.warning("退回物流公司不能为空!");
      if (_this.information.formValue.BILL_TYPE !== "1") {
        // 换货类型校验
        if (
          !_this.replacement.formValue.receiver_province_id ||
          !_this.replacement.formValue.receiver_city_id
        ) {
          return this.$Message.warning("省市信息必填!");
        }
        if (_this.replacement.formValue.RECEIVE_NAME.length > 50) {
          return this.$Message.warning("收货人姓名不合法，请重新填写！");
        }
        if (!_this.replacement.formValue.RECEIVE_NAME) {
          return this.$Message.warning("收货人必填!");
        }
        let phone = _this.replacement.formValue.RECEIVE_MOBILE;
        if (!phone) {
          return this.$Message.warning("收货人手机必填!");
        }
        if (phone.indexOf(1) != 0 || phone.length != 11) {
          return this.$Message.warning("电话号码不合法，请重新填写！");
        }
        if (!_this.replacement.formValue.RECEIVE_ADDRESS) {
          return this.$Message.warning("收货人地址必填!");
        }
        if (!_this.refundDtoList.data.length) {
          return this.$Message.info("退货明细必须有行数据！");
        }
        if (!_this.exchangeDtoList.data.length) {
          return this.$Message.info("换货明细必须有行数据！");
        }
        if (_this.returnTotalAmount != 0) {
          return this.$Message.info("换货金额必须等于退货金额！");
        }
      } else {
        if (!_this.refundDtoList.data.length) {
          return this.$Message.info("退货明细必须有行数据！");
        }
        if (parseInt(_this.returnTotalAmount) < 0) {
          return this.$Message.info("退货总金额不能小于0，请修改后重新保存！");
        }
      }
      if (_this.replacement.formValue.SHIP_AMT) {
        let n = /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/;
        if (!n.test(_this.replacement.formValue.SHIP_AMT)) {
          return this.$Message.warning("请输入正确的换货邮费!");
        }
      }
      // 是否原退
      if (_this.information.formValue.IS_BACK) {
        _this.information.formValue.IS_BACK = 1;
      } else {
        _this.information.formValue.IS_BACK = 0;
      }

      // 换货预留库存
      if (_this.information.formValue.IS_RESERVED) {
        _this.information.formValue.IS_RESERVED = 1;
      } else {
        _this.information.formValue.IS_RESERVED = 0;
      }
      if (_this.RESERVE_BIGINT07_type == '无次品调拨') _this.information.formValue.RESERVE_BIGINT07 = 0;
      else if (_this.RESERVE_BIGINT07_type == '次品已调拨') _this.information.formValue.RESERVE_BIGINT07 = 2;
      else if (_this.RESERVE_BIGINT07_type == '次品未调拨') _this.information.formValue.RESERVE_BIGINT07 = 1;
      let Rlist = [];
      let total = 0;
      let item = [];
      if (_this.returnSelectData.length) {
        item = _this.returnSelectData;
      } else {
        item = _this.refundDtoList.data;
      }
      for (let i = 0; i < item.length; i++) {
        if (!item[i].QTY_REFUND) return _this.$Message.error('退货明细数量不能为空');
        if (!item[i].PS_C_CLR_ID) return _this.$Message.error('退货明细颜色不能为空');
        if (!item[i].PS_C_SIZE_ID) return _this.$Message.error('退货明细尺码不能为空');
        if (!item[i].PS_C_SKU_ECODE) return _this.$Message.error('退货明细条码不能为空');
        Rlist.push({
          ID: item[i].ID != -1 ? item[i].ID : -1,
          reserve_bigint10: item[i].reserve_bigint10,
          ps_c_sku_ecode: item[i].PS_C_SKU_ECODE,
          barcode: item[i].BARCODE,
          ps_c_pro_ecode: item[i].PS_C_PRO_ECODE,
          ps_c_clr_id: item[i].PS_C_CLR_ID, // 颜色
          ps_c_clr_ecode: item[i].PS_C_CLR_ECODE,
          ps_c_clr_ename: item[i].PS_C_CLR_ENAME,
          ps_c_size_id: item[i].PS_C_SIZE_ID, // 颜色
          ps_c_size_ecode: item[i].PS_C_SIZE_ECODE,
          ps_c_size_ename: item[i].PS_C_SIZE_ENAME,
          ps_c_pro_ename: item[i].PS_C_PRO_ENAME,
          qty_can_refund: parseInt(item[i].QTY_CAN_REFUND),
          qty_refund: parseInt(item[i].QTY_REFUND),
          reserve_decimal01: item[i].PRICE,
          price: item[i].PRICE,
          sex: item[i].SEX,
          amt_refund: item[i].AMT_REFUND,
          qty_in: item[i].QTY_IN,
          product_mark: item[i].PRODUCT_MARK == "正品" ? "1" : "0",
          ps_c_sku_id: item[i].skuId ? item[i].skuId : item[i].PS_C_SKU_ID,
          ps_c_pro_id: item[i].PS_C_PRO_ID,
          sku_spec: item[i].SKU_SPEC,
          amt_refund_single: item[i].amt_refund_single,
          oid: item[i].oOId, // 子订单oid
          // "ps_c_pro_id": item[i].psCproId,// 商品id
          amt_adjust:
            parseInt(item[i].AMT_REFUND) -
            parseInt(item[i].PRICE) * parseInt(item[i].QTY_REFUND), // 总调整金额
          RESERVE_DECIMAL02:item[i].RESERVE_DECIMAL02,
          RESERVE_DECIMAL03:item[i].RESERVE_DECIMAL03,
          RESERVE_VARCHAR01:item[i].RESERVE_VARCHAR01,
        });
        total += parseInt(item[i].QTY_REFUND); // 商品数量
      }
      let Elist = [];
      let Eitem = _this.exchangeDtoList.data;
      for (let i = 0; i < Eitem.length; i++) {
        if (!Eitem[i].QTY_EXCHANGE) return _this.$Message.error('换货明细换货数量不能为空');
        if (!Eitem[i].PS_C_CLR_ID) return _this.$Message.error('换货明细颜色不能为空');
        if (!Eitem[i].PS_C_SIZE_ID) return _this.$Message.error('换货明细尺码不能为空');
        if (!Eitem[i].PS_C_SKU_ECODE) return _this.$Message.error('换货明细条码不能为空');
        Elist.push({
          ID: Eitem[i].ID != -1 ? Eitem[i].ID : -1,
          ps_c_sku_ecode: Eitem[i].PS_C_SKU_ECODE,
          barcode: Eitem[i].BARCODE,
          ps_c_pro_ecode: Eitem[i].PS_C_PRO_ECODE,
          ps_c_clr_id: Eitem[i].PS_C_CLR_ID, // 颜色PS_C_CLR_ENAME
          ps_c_clr_ecode: Eitem[i].PS_C_CLR_ECODE,
          ps_c_clr_ename: Eitem[i].PS_C_CLR_ENAME,
          ps_c_size_id: Eitem[i].PS_C_SIZE_ID, // 颜色
          ps_c_size_ecode: Eitem[i].PS_C_SIZE_ECODE,
          ps_c_size_ename: Eitem[i].PS_C_SIZE_ENAME,
          ps_c_pro_ename: Eitem[i].PS_C_PRO_ENAME,
          reserve_decimal01: Eitem[i].PRICE,
          price: Eitem[i].PRICE,
          sex: Eitem[i].SEX,
          amt_refund: Eitem[i].AMT_REFUND,
          qty_exchange: parseInt(Eitem[i].QTY_EXCHANGE),
          qty_in: Eitem[i].QTY_IN,
          product_mark: Eitem[i].PRODUCT_MARK == "正品" ? "1" : "0",
          ps_c_sku_id: Eitem[i].skuId ? Eitem[i].skuId : Eitem[i].PS_C_SKU_ID,
          ps_c_pro_id: Eitem[i].PS_C_PRO_ID,
          sku_spec: Eitem[i].SPEC
        });
      }

      let money = {
        RETURN_AMT_LIST: _this.amountReturned,
        RETURN_AMT_SHIP: _this.returnPostage,
        RETURN_AMT_OTHER: _this.otherAmount,
        EXCHANGE_AMT: _this.exchangeAmount,
        RETURN_AMT_ACTUAL: _this.returnTotalAmount,
        CONSIGN_AMT_SETTLE: _this.settlementAmount,
        // CP_C_PHY_WAREHOUSE_ID: _this.warehouseId,
        TID: _this.tId,
        QTY_INSTORE: total,
        RESERVE_VARCHAR02: _this.information.formValue.SELLER_MEMO,
      };
      let params = {
        objid: _this.$route.query.id,
        OcBreturnOrder: Object.assign(
          _this.information.formValue,
          _this.replacement.formValue,
          money
        ), // 主表信息
        OcBreturnOrderExchange: Elist, // 换货明细
        OcBreturnOrderRefund: Rlist // 退货明细
      };
      // 复制订单标识
      if (_this.$route.query.cloneReturnGoodId) params.copytype = 1
      if (_this.$route.query.id == -1) {
        if (_this.information.formValue.BILL_TYPE === "2" && !_this.isModalSave) {
          axios({
            url: "/p/cs/checkAllStroreStock",
            method: "post",
            cancelToken: true,
            data: params
          }).then(res => {
            if (res.data.code === 0) {
              // 换货明细的商品换货数量小于可用库存，弹窗提示,否则执行保存操作
              if (!res.data.data) {
                _this.availableStockMassage = res.data.message;
                _this.availableStock = true;
                _this.isModalSave = true;
              } else {
                _this.save(params);
              }
            } else {
              let err = res.data.message || "可用库存查询失败!";
              _this.$Message.error(err);
            }
          });
        } else {
          _this.save(params);
        }
      } else {
        if (_this.status == 20 && !_this.information.formValue.IS_RESERVED && !_this.isModalSave && _this.information.formValue.BILL_TYPE === "2") {
          axios({
            url: "/p/cs/checkAllStroreStock",
            method: "post",
            cancelToken: true,
            data: params
          }).then(res => {
            if (res.data.code === 0) {
              // 换货明细的商品换货数量小于可用库存，弹窗提示,否则执行保存操作
              if (!res.data.data) {
                _this.availableStockMassage = res.data.message;
                _this.availableStock = true;
                _this.isModalSave = true;
              } else {
                _this.save(params);
              }
            } else {
              let err = res.data.message || "可用库存查询失败!";
              _this.$Message.error(err);
            }
          });
        } else {
          _this.save(params);
        }
      }
      //  || (_this.status == 20 && _this.$route.query.id != -1)
    },
    // 保存接口
    save(params) {
      // 防止多次触发
      let _this = this;
      _this.isSaveLoading = true;
      axios({
        url: "/p/cs/returnOrder",
        method: "post",
        cancelToken: true,
        data: params
      }).then(res => {
        _this.availableStock = false;
        _this.isModalSave = false;
        _this.isSaveLoading = false;
        if (res.data.code === 0) {
          _this.$Message.success(res.data.message);
          _this.$store.commit("customize/TabHref", {
            id: 2661,
            type: "action",
            name: "returngoodList",
            label: "退换货订单",
            query: Object.assign({
              id: 2661,
              tabTitle: "退换货订单"
            }),
            back: true
          });
        } else {
          let err = res.data.message || "新增退换货订单失败!";
          _this.$Message.error(err);
        }
      });
    },
    // 售后审核
    afterAudit() {
      const _this = this;
      if (_this.$route.query.id === "-1") return;
      let checkData = _this.refundDtoList.data;
      let unMatchFlag = false;
      checkData.map(item => {
        if(item.QTY_REFUND !== item.QTY_IN){
          unMatchFlag = true;
        }
      });
      if(unMatchFlag){
        _this.$Modal.info({
          title: '提示',
          content: '申请数量与入库数量不一致，是否确定售后审核？',
          mask: true,
          showCancel: true,
          okText: '确定',
          cancelText: '取消',
          onOk: () => {
            axios({
              url: "/p/cs/chargebackcheck",
              method: "post",
              cancelToken: true,
              data: { ID: _this.$route.query.id }
            }).then(res => {
              if (res.data.code === 0) {
                _this.$Message.success(res.data.message);
                _this.getList();
              } else {
                _this.$Message.error(res.data.message);
              }
            });
          }
        });
      }else{
        _this.$Modal.info({
          title: '提示',
          content: '是否确定售后审核？',
          mask: true,
          showCancel: true,
          okText: '确定',
          cancelText: '取消',
          onOk: () => {
            axios({
              url: "/p/cs/chargebackcheck",
              method: "post",
              cancelToken: true,
              data: { ID: _this.$route.query.id }
            }).then(res => {
              if (res.data.code === 0) {
                _this.$Message.success(res.data.message);
                _this.getList();
              } else {
                _this.$Message.error(res.data.message);
              }
            });
          }
        });
      }
    },
    // 取消按钮
    cancelBtn() {
      const _this = this;
      if (this.$route.query.id == "-1") return;
      this.$Modal.info({
        title: '提示',
        content: '是否确定取消退单？',
        mask: true,
        showCancel: true,
        okText: '取消',
        cancelText: '确定',
        onCancel: () => {
          axios({
            url: "/p/cs/OcCancelChangingOrRefund",
            method: "post",
            cancelToken: true,
            data: { ids: [this.$route.query.id] }
          }).then(res => {
            if (res.data.code == 0) {
              _this.$Message.success(res.data.message);
              _this.getList();
            } else {
              _this.$Message.error(res.data.message);
            }
          });
        }
      });
    },
    // 虚拟入库
    virtualLibrary() {
      const _this = this;
      if (this.$route.query.id == "-1") return;
      if (this.status !== 20) {
        this.$Message.error("此退换单状态不允许虚拟入库!");
        return;
      }
      this.$Modal.info({
        title: '提示',
        content: '是否确定虚拟入库？',
        mask: true,
        showCancel: true,
        okText: '取消',
        cancelText: '确定',
        onCancel: () => {
          axios({
            url: "/p/cs/updateVirtualLibrary",
            method: "post",
            cancelToken: true,
            data: { ID: _this.$route.query.id }
          }).then(res => {
            if (res.data.code == 0) {
              _this.$Message.success(res.data.message);
              _this.getList();
            } else {
              _this.$Message.error(res.data.message);
            }
          });
        }
      });
    },
    // 取消自动退款
    cancelRefund() {
      const _this = this;
      if (this.$route.query.id == "-1") return;
      axios({
        url: "/p/cs/cancelautorefund",
        method: "post",
        cancelToken: true,
        data: { ID: _this.$route.query.id }
      }).then(res => {
        if (res.data.code == 0) {
          _this.$Message.success(res.data.message);
          _this.getList();
        } else {
          _this.$Message.error(res.data.message);
        }
      });
    },
    // 获取退款原因字段选项组
    obtainWarehouse() {
      const _this = this;
      let fromdata = new FormData();
      fromdata.append("table", "OC_B_RETURN_ORDER");
      fromdata.append("objid", -1);
      axios({
        url: "/p/cs/getObject",
        method: "post",
        data: fromdata
      }).then(res => {
        if (res.data.code == 0) {
          this.information.formData.forEach(value => {
            if (value.label === "退款原因") {
              let arr = [];
              res.data.data.addcolums[0].childs.forEach(item => {
                if (item.name == "退款原因") {
                  arr = item.combobox;
                }
              });
              for (let i = 0; i < arr.length; i++) {
                value.options.push({
                  value: arr[i].limitval,
                  label: arr[i].limitdesc
                });
              }
            }
          });
        }
      });
    },
    //获取省份id
    getAddressId(provinceName, cityName, areaName) {
      let self = this;
      return axios({
        url: "/p/cs/queryResionByName",
        method: "post",
        data: {
          provinceName: provinceName,
          cityName: cityName,
          areaName: areaName
        }
      });
    },
    //获取list模糊数据
    getData(search, index) {
      let self = this;
      let param = {
        isBlur: "Y",
        isGift: "Y",
        psCSku: {
          ECODE: search
        }
      };
      if (search === "") {
        return;
      }
      axios({
        url: "/p/cs/skuQuery",
        method: "post",
        data: param
      }).then(res => {
        if (res.data.code === 0) {
          if (index) {
            self.jordanTableConfig2.jordanFormConfig.formData[1].AuotData = res.data.data.data.map(
              row => {
                return {
                  ECODE: row.ECODE,
                  PS_C_PRO_ENAME: row.PS_C_PRO_ENAME,
                  SPEC: row.SPEC
                };
              }
            );
          }
        }
      });
    },
    entry(search, index) {
      // index 1 ==> 退货明细 2 ==> 换货明细 -- 去除退货明细20191217
      let self = this;
      if (!search || search === "") return;
      let qty = 1;
      let param = {
        isBlur: "N",
        psCSku: {
          ECODE: search
        }
      };
      axios({
        url: "/p/cs/skuQuery",
        method: "post",
        data: param
      }).then(async res => {
        if (res.data.code === 0) {
          let dataList = [];
          if (index === 2) {
            self.jordanTableConfig2.jordanFormConfig.formValue.sku = "";
            dataList = self.jordanTableConfig2.data;
          }
          let lists = res.data.data.data || [];
          if (lists.length === 0) {
            return this.$message.error("不存在该条码！");
          }
          let obj = lists.length > 0 ? lists[0] : {};
          obj.ID = -1; // 明细id
          obj.QTY_CAN_REFUND = qty; // 退货数量
          obj.QTY_REFUND = qty; // 退货数量
          obj.QTY_EXCHANGE = qty; // 换货数量
          obj.PS_C_SKU_ECODE = obj.ECODE; // 条码
          obj.BARCODE = obj.GBCODE; // 国际码
          // obj.PS_C_PRO_ECODE = obj.PS_C_PRO_ECODE; // 商品编码
          obj.PS_C_CLR_ID = obj.colorId; // 颜色
          obj.PS_C_CLR_ECODE = obj.colorCode;
          obj.PS_C_CLR_ENAME = obj.colorName;
          obj.PS_C_SIZE_ID = obj.sizeId; // 尺寸
          obj.PS_C_SIZE_ECODE = obj.sizeCode;
          obj.PS_C_SIZE_ENAME = obj.sizeName;
          // obj.PS_C_PRO_ENAME = obj.PS_C_PRO_ENAME; // 商品名称
          obj.SEX_NAME = obj.sexName;
          obj.SEX = obj.sex;
          obj.PRICE = obj.tagPrice; // 商品单价
          obj.AMT_REFUND = 0; // 退货金额
          obj.QTY_IN = 0; // 入库数量
          obj.SKU_SPEC = obj.SPEC; // 规格
          obj.amt_refund_single = 0; // 单件退货金额
          obj.PRODUCT_MARK = "正品"; // 商品标记
          obj.AMT_REFUND = 0; // 换货金额
          await self.getDataByProinfo(obj.PS_C_PRO_ECODE,1);
          obj.clrList = this.clrListArr;
          obj.sizeList = this.sizeListArr;
          // 新增换货明细时判断退货明细中是否存在此商品编号
          // 存在 ==> 将退货明细中数据拿过来
          // 不存在 ==> 新增
          if (index == 2) {
            let x = JSON.parse(JSON.stringify(self.refundDtoList.data));
            let y = x.find(
              item =>
                item.ECODE === obj.ECODE || item.PS_C_SKU_ECODE === obj.ECODE
            );
            if (y) {
              // 如果退货明细中存在再判断换货明细中是否存在
              // 换货明细中存在 => 数量相加、金额计算
              // 不存在push进去PS_C_SKU_ECODE
              let j = JSON.parse(JSON.stringify(dataList));
              let i = j.find(
                item =>
                  item.ECODE === obj.ECODE || item.PS_C_SKU_ECODE === obj.ECODE
              );
              if (i) {
                y.QTY_EXCHANGE =
                  (parseInt(y.QTY_EXCHANGE) ? parseInt(y.QTY_EXCHANGE) : 0) +
                  parseInt(obj.QTY_EXCHANGE);
                dataList = [...j];
                y.AMT_REFUND = publicMethodsUtil.accMul(
                  y.QTY_EXCHANGE,
                  obj.PRICE
                );
              } else {
                // 判断退货明细中是否有单件实际成交价
                // 有 => 单件实际成交价 * 数量
                // 无 => 吊牌价 * 数量
                if (y.amtRefundSingle == 0 || !y.amtRefundSingle) {
                  y.AMT_REFUND = publicMethodsUtil.accMul(
                    obj.PRICE,
                    obj.QTY_EXCHANGE
                  );
                } else {
                  y.AMT_REFUND = publicMethodsUtil.accMul(
                    y.amtRefundSingle,
                    obj.QTY_EXCHANGE
                  );
                }
                y.QTY_EXCHANGE = parseInt(obj.QTY_EXCHANGE);
                dataList.push(y);
              }
            } else {
              // 退货明细中无此商品编码 再验证换货明细中是否存在
              // 存在    => 退货数量加
              // 不存在  => push进去
              let eData = dataList;
              let s = eData.find(
                item =>
                  item.ECODE === obj.ECODE || item.PS_C_SKU_ECODE === obj.ECODE
              );

              if (s) {
                s.QTY_EXCHANGE =
                  (parseInt(s.QTY_EXCHANGE) ? parseInt(s.QTY_EXCHANGE) : 0) +
                  parseInt(obj.QTY_EXCHANGE);
                dataList = [...eData];
                s.AMT_REFUND = publicMethodsUtil.accMul(
                  s.QTY_EXCHANGE,
                  obj.PRICE
                );
              } else {
                dataList.push(obj);
                obj.AMT_REFUND = publicMethodsUtil.accMul(
                  obj.QTY_EXCHANGE,
                  obj.PRICE
                ); // 换货金额
              }
            }
          } else {
            // 判断是否要新增一条明细=
            let data = dataList;
            let d = data.find(
              item =>
                item.ECODE === obj.ECODE || item.PS_C_SKU_ECODE === obj.ECODE
            );
            if (d) {
              d.QTY_CAN_REFUND =
                parseInt(d.QTY_CAN_REFUND) + parseInt(obj.QTY_CAN_REFUND);
              d.QTY_REFUND = parseInt(d.QTY_REFUND) + parseInt(obj.QTY_REFUND);
              d.QTY_EXCHANGE =
                (parseInt(d.QTY_EXCHANGE) ? parseInt(d.QTY_EXCHANGE) : 0) +
                parseInt(obj.QTY_EXCHANGE);
              dataList = [...data];
              d.AMT_REFUND = publicMethodsUtil.accMul(d.QTY_REFUND, d.PRICE); // 退货金额
              d.AMT_REFUND = publicMethodsUtil.accMul(d.QTY_EXCHANGE, d.PRICE); // 换货金额
            } else {
              dataList.push(obj);
              obj.AMT_REFUND = publicMethodsUtil.accMul(
                obj.QTY_REFUND,
                obj.PRICE
              ); // 退货金额
              obj.AMT_REFUND = publicMethodsUtil.accMul(
                obj.QTY_EXCHANGE,
                obj.PRICE
              ); // 换货金额
            }
          }
          if (index == 1) {
            // 1 退货明细 2 退换货明细
            dataList.forEach(item => {
              item.AMT_REFUND = publicMethodsUtil.accMul(
                item.QTY_REFUND,
                item.PRICE
              );
            });
            self.refundDtoList.data = dataList;
            self.amountReturned = self.calculateMoney(dataList, 1).toFixed(2);
            self.returnTotal();
          } else if (index == 2) {
            self.exchangeAmount = self.calculateMoney(dataList, 1).toFixed(2);
            self.returnTotal();
            self.exchangeDtoList.data = dataList;
          }
        }
      });
    },
    // 列表勾选
    returnOnSelect(e) {
      this.returnSelectData = e;
      if (e.length > 0) {
        this.amountReturned = this.amountReturned = this.calculateMoney(
          this.returnSelectData,
          1
        ).toFixed(2);
        this.returnTotal();
      }
    },
    // 取消勾选
    returnCancel(e) {
      this.returnSelectData = e;
      if (e.length > 0) {
        this.amountReturned = this.calculateMoney(
          this.returnSelectData,
          1
        ).toFixed(2);
        this.returnTotal();
      } else {
        this.amountReturned = this.calculateMoney(
          this.refundDtoList.data,
          1
        ).toFixed(2);
        this.returnTotal();
      }
    },
    // 列表全选
    returnSelectAll(e) {
      this.returnSelectData = e;
      if (e.length > 0) {
        this.amountReturned = this.calculateMoney(
          this.returnSelectData,
          1
        ).toFixed(2);
        this.returnTotal();
      }
    },
    // 取消全选
    returnSelectAllCancel(e) {
      this.returnSelectData = e;
      this.amountReturned = this.calculateMoney(
        this.refundDtoList.data,
        1
      ).toFixed(2);
      this.returnTotal();
    },
    // 列表勾选
    returnOnSelect2(e) {
      this.exchangeSelectData = e;
    },
    // 取消勾选
    returnCancel2(e) {
      this.exchangeSelectData = e;
    },
    // 列表全选
    returnSelectAll2(e) {
      this.exchangeSelectData = e;
    },
    // 取消全选
    returnSelectAllCancel2(e) {
      this.exchangeSelectData = e;
    },
    // 退货新增明细
    returnAddDetail(){
      this.returnDetailAddTable.modal = true;
    },
    // 退货删除明细
    returnDeleteDetail() {
      const _this = this;
      if (
        _this.returnSelectData.length == 0 ||
        _this.returnSelectData.length == null
      ) {
        _this.$Message.error("请选择一条需要删除的明细!");
        return;
      } else if (_this.returnSelectData.length > 1) {
        _this.$Message.error("不允许批量删除明细!");
        return;
      } else {
        let item = _this.jordanTableConfig.data;
        for (let i = 0; i < item.length; i++) {
          if (
            item[i].PS_C_SKU_ECODE ===
              _this.returnSelectData[0].PS_C_SKU_ECODE &&
            _this.returnSelectData[0].PS_C_SKU_ECODE !== undefined
          ) {
            _this.jordanTableConfig.data.splice(i, 1);
            //新增明细列表填充
            _this.addSelection = this.addSelection.concat(_this.returnSelectData);
            _this.returnDetailAddTable.table.data = this.addSelection;
            _this.returnSelectData = [];
            _this.refundDtoList.data = _this.jordanTableConfig.data;
            _this.amountReturned = _this
              .calculateMoney(_this.refundDtoList.data, 1)
              .toFixed(2);
            _this.returnTotal();
            return _this.$Message.success("删除成功");
          }
        }
      }
    },
    // 换货删除明细
    returnDeleteDetail2() {
      const _this = this;
      if (
        _this.exchangeSelectData.length == 0 ||
        _this.exchangeSelectData.length == null
      ) {
        _this.$Message.error("请选择一条需要删除的明细!");
        return;
      } else if (_this.exchangeSelectData.length > 1) {
        _this.$Message.error("不允许批量删除明细!");
        return;
      } else {
        let item = _this.jordanTableConfig2.data;
        for (let i = 0; i < item.length; i++) {
          if (
            item[i].PS_C_SKU_ECODE ===
              _this.exchangeSelectData[0].PS_C_SKU_ECODE &&
            _this.exchangeSelectData[0].PS_C_SKU_ECODE !== undefined
          ) {
            _this.jordanTableConfig2.data.splice(i, 1);
            _this.exchangeSelectData = [];
            _this.exchangeDtoList.data = _this.jordanTableConfig2.data;
            _this.exchangeAmount = _this
              .calculateMoney(_this.exchangeDtoList.data, 2)
              .toFixed(2);
            _this.returnTotal();
            return _this.$Message.success("删除成功");
          }
        }
      }
    },
    // 查询原始订单编号
    queryBounced(num) {
      //  获取页面数据
      let _this = this;
      let lists = _this.order.orderform.formValue;
      if (
        (lists.bill_no == "" || lists.bill_no == undefined) &&
        (lists.source_code == "" || lists.source_code == undefined) &&
        (lists.receiver_name == "" || lists.receiver_name == undefined) &&
        (lists.user_nick == "" || lists.user_nick == undefined) &&
        (lists.receiver_mobile == "" || lists.receiver_mobile == undefined) &&
        (lists.cp_c_store_ename == "" || lists.cp_c_store_ename == undefined) &&
        num == undefined
      ) {
        _this.$Message.error("请输入查询条件！");
        return;
      }
      _this.order.table.loading = true;
      let fromdata = new FormData();
      let param = {
        page: {
          pageSize: "500",
          pageNum: "1"
        },
        highSearch: [
          {
            type: "Select",
            queryName: "ID",
            value: lists.bill_no
          },
          {
            type: "Input",
            queryName: "SOURCE_CODE",
            value: lists.source_code
          },
          {
            type: "Input",
            queryName: "RECEIVER_NAME",
            value: lists.receiver_name
          },
          {
            type: "Input",
            queryName: "USER_NICK",
            value: lists.user_nick
          },
          {
            type: "Input",
            queryName: "RECEIVER_MOBILE",
            value: lists.receiver_mobile
          },
          {
            type: "Select",
            queryName: "CP_C_SHOP_ID",
            value: lists.cp_c_store_id
          },
          {
            type: "Select",
            queryName: "ID",
            value: num
          },
          {
            type: "Select",
            queryName: "ORDER_STATUS",
            value: "5,6,12"
          }
        ],
        detailType:2 // 退换货订单使用
      };
      fromdata.append("param", JSON.stringify(param));
      axios({
        url: "/p/cs/getOrderList",
        method: "post",
        cancelToken: true,
        data: fromdata
      })
        .then(res => {
          if (res.data.data) {
            res.data.data.queryOrderResultList.forEach(item => {
              item.USER_NICK =
                item.USER_NICK + "(" + item.CP_C_SHOP_TITLE + ")";
            });
            _this.order.table.data = res.data.data.queryOrderResultList;
          } else {
            _this.order.table.data = [];
            _this.information.formValue.ORIG_ORDER_ID = "";
          }
          if (num) {
            _this.queryorder(_this.order.table.data, 1);
          }
          _this.order.table.loading = false;
        })
        .catch(err => {
          _this.$Message.info(err.message);
          _this.order.table.loading = false;
          _this.information.formValue.ORIG_ORDER_ID = "";
        });
    },
    // 查询原始订单编号回车事件
    queryEnter() {
      if (this.information.formValue.ORIG_ORDER_ID === "") {
        this.assignment("");
        this.refundDtoList.data = [];
        this.exchangeDtoList.data = [];
        this.jordanTableConfig.data = [];
        this.addSelection = [];
        this.returnDetailAddTable.table.data = this.addSelection;
        this.amountReturned = null; // 商品退回金额
        this.returnPostage = 0; // 应退邮费
        this.otherAmount = 0; // 其他金额
        this.exchangeAmount = null; // 换货金额
        this.returnTotalAmount = null; // 退货单总金额
        this.settlementAmount = 0; // 代销结算金额
        this.information.formValue.BILL_TYPE = 0;
      } else {
        this.queryBounced(this.information.formValue.ORIG_ORDER_ID);
      }
    },
    // 查询原始平台单号回车事件
    querySourceEnter() {
      const _this = this;
      let fromdata = new FormData();
      let param = {
        page: {
          pageSize: "10000",
          pageNum: "1"
        },
        queryInfo: [
          {
            type: "Input",
            displayName: "平台单号",
            queryName: "SOURCE_CODE",
            value: this.information.formValue.ORIG_SOURCE_CODE,
            list: []
          }
        ],
        highSearch: [
          {
            type: "Select",
            queryName: "ORDER_STATUS",
            value: "5,6,12"
          }
        ],
       detailType:2 // 退换货订单使用
      };
      fromdata.append("param", JSON.stringify(param));
      axios({
        url: "/p/cs/getOrderList",
        method: "post",
        cancelToken: true,
        data: fromdata
      })
        .then(res => {
          if (res.data.data.queryOrderResultList.length != 1) {
            _this.$Message.error(
              "原始平台单号存在多条记录，请用订单编号查询！"
            );
            return;
          }
          if (res.data.code == 0) {
            _this.order.table.data = res.data.data.queryOrderResultList;
            _this.queryorder(_this.order.table.data);
          } else {
            let err = res.data.message || "未查询到数据！";
            _this.$Message.error(err);
          }
        })
        .catch(err => {
          _this.$Message.info(err.message);
        });
    },
    // 确定原始订单编号
    async queryorder(listData, isEnter) {
      const _this = this;
      // 判断是否为回车精确查询
      if (isEnter) {
        if (!listData.length) {
          _this.$Message.warning("查询不到数据！");
          return;
        }
      } else {
        if (!this.onSelectData.length) {
          _this.$Message.warning("请选择一条数据！");
          return;
        }
      }
      if (listData) {
        this.onSelectData = listData;
      }
      this.information.formData.forEach((list, j) => {
        if (list.style === 'popInput' && list.itemdata.name === '退回物流公司') {
          list.itemdata.pid = this.onSelectData[0].CP_C_LOGISTICS_ID;
          list.itemdata.valuedata = this.onSelectData[0].CP_C_LOGISTICS_ENAME;
        }
      })
      this.information.formValue.CP_C_LOGISTICS_ID = this.onSelectData[0].CP_C_LOGISTICS_ID;
      this.information.formValue.CP_C_LOGISTICS_ENAME = this.onSelectData[0].CP_C_LOGISTICS_ENAME;
      this.information.formValue.SELLER_MEMO = this.onSelectData[0].SELLER_MEMO;
      const replace = _this.replacement.formValue;
      this.tId = this.onSelectData[0].TID;
      this.warehouseId = this.onSelectData[0].CP_C_PHY_WAREHOUSE_ID
        ? this.onSelectData[0].CP_C_PHY_WAREHOUSE_ID
        : ""; // 发货仓库id
      _this.information.formData[14].itemdata.pid = this.warehouseId;
      _this.information.formData[14].itemdata.valuedata = this.onSelectData[0].CP_C_PHY_WAREHOUSE_ENAME;
      _this.information.formValue.CP_C_PHY_WAREHOUSE_ID = this.warehouseId;
      if (_this.information.formValue.IS_BACK) {
        // 勾选是否原退时入库实体仓从发货实体仓带出
        let phy = _this.information.formData[13].itemdata;
        let phyIn = _this.information.formData[14].itemdata;

        phy.pid = phyIn.pid;
        phy.valuedata = phyIn.valuedata;
        _this.information.formValue.CP_C_PHY_WAREHOUSE_IN_ID = phyIn.pid;
      }
      this.information.formValue.ORIG_ORDER_ID = this.onSelectData[0].ID; // 编号
      this.information.formValue.BUYER_NICK = this.onSelectData[0].USER_NICK;
      this.information.formValue.ORIG_SOURCE_CODE = this.onSelectData[0].SOURCE_CODE;
      this.information.formValue.CP_C_SHOP_TITLE = this.onSelectData[0].CP_C_SHOP_TITLE;
      this.information.formValue.CP_C_SHOP_ID = this.onSelectData[0].CP_C_SHOP_ID;
      this.replacement.formValue.RECEIVE_ADDRESS = this.onSelectData[0].RECEIVER_ADDRESS; // 收货人地址
      this.replacement.formValue.RECEIVE_NAME = this.onSelectData[0].RECEIVER_NAME; // 收货人姓名
      this.replacement.formValue.RECEIVE_MOBILE = this.onSelectData[0].RECEIVER_MOBILE; // 收货人电话
      this.settlementAmount = this.onSelectData[0].CONSIGN_AMT; // 代销结算金额
      replace.platform = this.onSelectData[0].PLATFORM; // 平台
      replace.orde_source = this.onSelectData[0].ORDER_SOURCE; // 订单来源
      replace.receiver_province_id = this.onSelectData[0].CP_C_REGION_PROVINCE_ID; // 省id
      replace.receiver_province_name = this.onSelectData[0].CP_C_REGION_PROVINCE_ENAME; // 收货人省份
      replace.receiver_city_id = this.onSelectData[0].CP_C_REGION_CITY_ID; // 收货人市id
      replace.receiver_city_name = this.onSelectData[0].CP_C_REGION_CITY_ENAME; // 收货人市
      replace.receiver_area_id = this.onSelectData[0].CP_C_REGION_AREA_ID; // 收货人县id
      replace.receiver_area_name = this.onSelectData[0].CP_C_REGION_AREA_ENAME; // 收货人县
      // 展示
      this.information.formData[5].itemdata.valuedata = this.onSelectData[0].CP_C_SHOP_TITLE; // 店铺名称
      this.replacement.formData[5].itemdata.valuedata = this.onSelectData[0].CP_C_REGION_PROVINCE_ENAME; // 省
      this.replacement.formData[6].itemdata.valuedata = this.onSelectData[0].CP_C_REGION_CITY_ENAME; // 市
      this.replacement.formData[7].itemdata.valuedata = this.onSelectData[0].CP_C_REGION_AREA_ENAME; // 区
      this.information.formData.forEach((item, index) => {
        if (item.label === '是否原退' && this.information.formValue.IS_BACK) {
          this.information.formValue.LOGISTICS_CODE = _this.onSelectData[0].EXPRESSCODE;
        }
      });
      let queryList = [];
      _this.addSelection = [];
      _this.returnDetailAddTable.table.data = _this.addSelection;
      // this.onSelectData[0].QUERYORDERITEMRESULTLIST.forEach(item => {
      //   if (item.refundStatus != 6) queryList.push(item);
      // });
      for(let i = 0; i < this.onSelectData[0].QUERYORDERITEMRESULTLIST.length; i++){
        let selection = this.onSelectData[0].QUERYORDERITEMRESULTLIST[i];
        if(selection.refundStatus !== 6){
          let queryListItem = {};
          queryListItem.ID = -1;
          queryListItem.RESERVE_BIGINT10 = selection.proId;
          queryListItem.skuId = selection.skuId;
          queryListItem.PS_C_PRO_ID = selection.psCproId; // 商品id
          queryListItem.PS_C_SKU_ECODE = selection.skuEcode;
          queryListItem.BARCODE = selection.barCode;
          queryListItem.PS_C_PRO_ECODE = selection.ecode; // 商品编码
          queryListItem.PS_C_CLR_ECODE = selection.clrsEcode; // 颜色
          queryListItem.PS_C_CLR_ID = selection.clrsId;
          queryListItem.PS_C_CLR_ENAME = selection.clrs;
          queryListItem.PS_C_SIZE_ID = selection.sizeId; // 尺寸
          queryListItem.PS_C_SIZE_ECODE = selection.sizeEcode;
          queryListItem.PS_C_SIZE_ENAME = selection.sizes;
          queryListItem.PS_C_PRO_ENAME = selection.proEname;
          queryListItem.QTY_CAN_REFUND = selection.qty;
          queryListItem.QTY_REFUND = selection.qty - selection.RESERVE_DECIMAL01;
          queryListItem.QTY_EXCHANGE = selection.qty;
          queryListItem.SEX_NAME = selection.sexName;
          queryListItem.SEX = selection.sex;
          queryListItem.PRICE = selection.RESERVE_DECIMAL02;
          queryListItem.SKU_SPEC = selection.skuSpec; // 原单带出的规格
          queryListItem.AMT_REFUND = publicMethodsUtil
            .accMul(selection.qty, selection.amtRefundSingle)
            .toFixed(2); // 退货金额realAmt
          // queryList[i].AMT_REFUND = queryList[i].realAmt ? publicMethodsUtil.accMul(queryList[i].amtRefundSingle, queryList[i].qty) : publicMethodsUtil.accMul(queryList[i].price, queryList[i].qty); // 退货金额
          queryListItem.QTY_IN = 0;
          queryListItem.PRODUCT_MARK = "正品";
          queryListItem.amtRefundSingle = selection.amtRefundSingle;
          queryListItem.amt_refund_single = selection.amtRefundSingle;
          queryListItem.RESERVE_DECIMAL02 = selection.priceSettle;
          queryListItem.RESERVE_DECIMAL03 = selection.totPriceSettle;
          await _this.getDataByProinfo(selection.ecode,1);
          queryListItem.clrList = _this.clrListArr;
          queryListItem.sizeList = _this.sizeListArr;
          queryList.push(queryListItem);
        }
      }
      this.jordanTableConfig.data = queryList;
      this.refundDtoList.data = this.jordanTableConfig.data;
      this.amountReturned = this.calculateMoney(
        this.jordanTableConfig.data,
        1
      ).toFixed(2);
      this.returnTotal();
      this.order.modal = false;
    },
    // 取消
    querycancel() {},
    // 原始订单勾选
    onquerySelect(e) {
      // console.log(e.length);
      if (e.length != 1) {
        this.$Message.info("只能选择一条订单记录!");
        return;
      }
      this.onSelectData = e;
    },
    // 原始订单取消勾选
    onqueryCancel(e) {
      this.onSelectData = e;
    },
    // 原始订单全选
    onSelectAll(e) {
      this.onSelectData = e;
    },
    // 原始订单取消全选
    onSelectAllCancel(e) {
      this.onSelectData = e;
    },
    // 矩阵添加
    enterQuerySave(val, type) {
      const _this = this;
      if (type == 1 && val.length) {
        if (_this.jordanTableConfig.data.length) {
          val.forEach(item => {
            let d = _this.jordanTableConfig.data.find(
              list =>
                list.PS_C_SKU_ECODE === item.PS_C_SKU_ECODE
            );
            if (d) {
              val.forEach(data => {
                if (data.PS_C_SKU_ECODE === d.PS_C_SKU_ECODE) {
                  d.QTY_REFUND = parseInt(d.QTY_REFUND) + parseInt(data.QTY_REFUND);
                  d.QTY_EXCHANGE = parseInt(d.QTY_EXCHANGE) + parseInt(data.QTY_EXCHANGE);
                  d.QTY_CAN_REFUND = parseInt(d.QTY_CAN_REFUND) + parseInt(data.QTY_CAN_REFUND);

                  d.AMT_REFUND = publicMethodsUtil.accMul(d.QTY_REFUND, d.PRICE);
                }
              })
            } else {
              let arr = [];
              arr.push(item);
              _this.refundDtoList.data = _this.refundDtoList.data.concat(arr);
              _this.jordanTableConfig.data = _this.jordanTableConfig.data.concat(arr);
            }
          })
        } else {
          _this.jordanTableConfig.data = _this.jordanTableConfig.data.concat(val);
          _this.refundDtoList.data = _this.refundDtoList.data.concat(val);
        }
        _this.refundDtoList.data = _this.jordanTableConfig.data;
        _this.amountReturned = _this.calculateMoney(_this.jordanTableConfig.data, 1).toFixed(2);
        _this.returnTotal();
        _this.jordanTableConfig.jordanFormConfig.formValue.gbCode = '';
      } else {
        if (_this.jordanTableConfig2.data.length) {
          val.forEach(item => {
            let d = _this.jordanTableConfig2.data.find(
              list =>
                list.PS_C_SKU_ECODE === item.PS_C_SKU_ECODE
            );
            if (d) {
              val.forEach(data => {
                if (data.PS_C_SKU_ECODE === d.PS_C_SKU_ECODE) {
                  d.QTY_EXCHANGE = parseInt(d.QTY_EXCHANGE) + parseInt(data.QTY_EXCHANGE);

                  d.AMT_REFUND = publicMethodsUtil.accMul(d.QTY_EXCHANGE, d.PRICE);
                }
              })
            } else {
              let arr = [];
              arr.push(item);
              _this.exchangeDtoList.data = _this.exchangeDtoList.data.concat(arr);
              _this.jordanTableConfig2.data = _this.jordanTableConfig2.data.concat(arr);
            }
          })
        } else {
          _this.jordanTableConfig2.data = _this.jordanTableConfig2.data.concat(val);
          _this.exchangeDtoList.data = _this.exchangeDtoList.data.concat(val);
        }
        _this.exchangeDtoList.data = _this.jordanTableConfig2.data;
        _this.exchangeAmount = _this.calculateMoney(_this.jordanTableConfig2.data, 1).toFixed(2);
        _this.returnTotal();
        _this.jordanTableConfig2.jordanFormConfig.formValue.gbCode = '';
      }
      _this.$children
        .find(item => item.name === "jordanMatrixBox")
        .closeConfirm();
    },
    oneObjs(e) {
      const _this = this;
      _this.information.formData.forEach(item => {
        if (item.itemdata) {
          if (
            item.itemdata.name == "店铺名称" &&
            item.itemdata.name == e.name
          ) {
            this.information.formValue.CP_C_SHOP_ID = item.itemdata.pid;
            this.information.formValue.CP_C_SHOP_TITLE =
              item.itemdata.valuedata;
          } else if (
            item.itemdata.name == "退回物流公司" &&
            item.itemdata.name == e.name
          ) {
            this.information.formValue.CP_C_LOGISTICS_ID = item.itemdata.pid;
            this.information.formValue.CP_C_LOGISTICS_ENAME =
              item.itemdata.valuedata;
          } else if (
            item.itemdata.name == "入库实体仓库" &&
            item.itemdata.name == e.name
          ) {
            this.information.formValue.CP_C_PHY_WAREHOUSE_IN_ID =
              item.itemdata.pid;
            // this.information.formValue.CP_C_PHY_WAREHOUSE_IN_NAME = item.itemdata.valuedata;
          } else if (
            item.itemdata.name == "发货实体仓库" &&
            item.itemdata.name == e.name
          ) {
            this.information.formValue.CP_C_PHY_WAREHOUSE_ID =
              item.itemdata.pid;
          }
        }
      });
    },
    twoObjs(e) {
      const _this = this;
      _this.replacement.formData.forEach(item => {
        if (item.itemdata) {
          if (
            item.itemdata.name == "收货人省份" &&
            item.itemdata.name == e.name
          ) {
            this.replacement.formValue.receiver_province_id = item.itemdata.pid;
            this.replacement.formValue.receiver_province_name =
              item.itemdata.valuedata;
          } else if (
            item.itemdata.name == "收货人市" &&
            item.itemdata.name == e.name
          ) {
            this.replacement.formValue.receiver_city_id = item.itemdata.pid;
            this.replacement.formValue.receiver_city_name =
              item.itemdata.valuedata;
          } else if (
            item.itemdata.name == "收货人区" &&
            item.itemdata.name == e.name
          ) {
            this.replacement.formValue.receiver_area_id = item.itemdata.pid;
            this.replacement.formValue.receiver_area_name =
              item.itemdata.valuedata;
          }
        }
      });
    },
    threeObjs() {
      const _this = this;
      _this.order.orderform.formData.forEach(item => {
        if (item.itemdata) {
          switch (item.itemdata.name) {
            case "店铺名称":
              this.order.orderform.formValue.cp_c_store_id = item.itemdata.pid;
              this.order.orderform.formValue.cp_c_store_ename =
                item.itemdata.valuedata;
              break;
          }
        }
      });
    },
    // 退换货下拉切换
    selectSelectt() {
      if (this.information.formValue.BILL_TYPE === "2") {
        this.labelList[1].isShow = true;
        this.openDefault = ["1", "2", "3", "4"];
        this.replacement.ruleValidate = {
          RECEIVE_NAME: [{ required: true, message: " ", trigger: "blur" }],
          RECEIVE_MOBILE: [{ required: true, message: " ", trigger: "blur" }],
          RECEIVE_ADDRESS: [{ required: true, message: " ", trigger: "blur" }]
        };
        this.replacement.formData[5].itemdata.isnotnull = true;
        this.replacement.formData[6].itemdata.isnotnull = true;
        this.information.formData[10].style = "checkbox";
        this.information.formData[11].style = "";

        //切换选项且重新赋予表单权限
        this.$nextTick(() => {
          this.getDataAccess("OC_B_RETURN_ORDER", res => {

            // 退换货订单-基础信息
            this.information.formData.forEach((parent, parentIndex) => {
              res.SENSITIVE_COLUMNS.forEach((child, childIndex) => {
                if (parent.dataAcessKey == child.ecode) {
                  if (this.$route.query.id === "-1") {
                    this.setFormPermissions(parent, child, "add");
                  } else {
                    this.setFormPermissions(parent, child, "detail");
                  }
                }
              });
            });
          });
        });
      } else {
        this.labelList[1].isShow = false;
        this.DefaultValue = "1";
        this.openDefault = ["1", "3", "4"];
        this.labelClick({}, 0);
        this.exchangeDtoList.data = [];
        this.replacement.ruleValidate = {
          RECEIVE_NAME: [{ required: false, message: " ", trigger: "blur" }],
          RECEIVE_MOBILE: [{ required: false, message: " ", trigger: "blur" }],
          RECEIVE_ADDRESS: [{ required: false, message: " ", trigger: "blur" }]
        };
        this.replacement.formData[5].itemdata.isnotnull = false;
        this.replacement.formData[6].itemdata.isnotnull = false;
        this.information.formData[10].style = "";
        this.information.formData[11].style = "";
      }
    },
    cancalModal() {
      let self = this;
      self.availableStock = false;
      self.isModalSave = false;
    },
    returnDetailAddOnCancel(selection, row) {
      let selectArr = this.addReturnDetailSelectArr;
      for (let j = 0, len = selectArr.length; j < len; j++) {
        if (selectArr[j] === row.PS_C_SKU_ECODE) {
          selectArr.splice(j, 1);
        }
      }
    },
    returnDetailAddOnSelect(selection, row) {
      this.addReturnDetailSelectArr.push(row.PS_C_SKU_ECODE);
    },
    returnDetailAddOnSelectAllCancel() {
      this.addReturnDetailSelectArr = [];
    }, //全选勾选事件
    returnDetailAddOnSelectAll() {
      let self = this;
      self.returnDetailAddTable.table.data.map(item => {
        this.addReturnDetailSelectArr.push(item.PS_C_SKU_ECODE);
      });
    }, //全选选中事件
    detailAddCancel() {

    },
    resetReturnMainTable() {
      let selectArr = this.addReturnDetailSelectArr;
      let tableArr = this.returnDetailAddTable.table.data;
      let selection = [];
      //确认后删除明细对应记录
      for (let i = tableArr.length - 1; i >= 0; i--) {
        for (let j = 0, len = selectArr.length; j < len; j++) {
          if (selectArr[j] === tableArr[i].PS_C_SKU_ECODE) {
            selection.push(tableArr[i]);
            tableArr.splice(i, 1);
            break;
          }
        }
      }
      //重置选中记录
      this.addReturnDetailSelectArr = [];
      //新增明细表单回填记录
      this.enterQuerySave(selection, "1");
    },
    async getDataByProinfo(proEcode,dataType, sizeId, clrId){
      const _this = this;
      let param = {
        proEcode:proEcode
      };
      if(sizeId && clrId){
        param = {
          proEcode:proEcode,
          clrId:clrId,
          sizeId:sizeId
        };
      }
      let formdata = new FormData();
      formdata.append("param", JSON.stringify(param));
      return new Promise(resolve => {
        let optionData = {};
        axios({
          url: "/p/cs/extInfoQuery",
          method: "post",
          data: formdata
        }).then(function(res) {
          if(dataType === 1){
            _this.clrListArr = res.data.data.psCSpec1objList;
            _this.sizeListArr = res.data.data.psCSpec2objList;
          }else{
            if(res.data.code === 0){
              _this.itemSkuEcode = res.data.data.ecode;
              _this.itemSkuId = res.data.data.skuId;
              _this.itemGbcode = res.data.data.gbcode;
            }else{
              _this.itemSkuEcode = "";
              _this.itemSkuId = "";
              _this.itemGbcode = "";
            }
          }
          resolve(optionData);
        });
      });
    }
  }
};
</script>

<style lang="less">
@import "~@/assets/css/css_1_3/theme.less";
.returngood {
  position: relative;
  display: flex;
  flex-direction: column;
  padding-top: 8px;
  height: 100%;
  .inputBgcolor {
    background: #f3e6e6;
  }
  .sales {
    ul {
      display: flex;
      li {
        flex: auto;
        text-align: center;
        p {
          line-height: 20px;
          text-align: center;
        }
        input {
          width: 100px;
          height: 20px;
          text-align: center;
          margin: 0 auto;
          border: 1px solid #dcdee2;
        }
      }
      .symbol {
        text-align: center;
        line-height: 50px;
        font-size: 22px;
      }
    }
  }
  .orderManageEdit {
    margin-top: 0 !important;
  }
  .salesTable {
    .businessLabel {
      margin-top: 8px;
    }
    .tableBox {
      border: 1px solid #dcdee2;
      border-top: none;
      padding: 0 10px 10px 10px;
    }
  }
  .jordan-table-box .page-box {
    padding-top: 0 !important;
  }
  .fromLoading {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(255, 255, 255, 0.9);
    z-index: 1000 !important;
  }
}
.available {
  .burgeon-btn-text {
    color: #fff;
    background-color: #fd6442;
    border-color: #fd6442;
  }
  .burgeon-btn-text:hover {
    color: #fff;
    background-color: #fd6442;
    border-color: #fd6442;
  }
  .burgeon-btn-primary {
    color: #333;
    background-color: #fff;
    border-color: #fff;
  }
  .burgeon-btn-primary:hover {
    color: #333;
    background-color: #fff;
    border-color: #fff;
  }
}
.queryorder .burgeon-modal {
  width: 800px !important;
}
.queryorder .burgeon-modal-body {
  overflow: hidden;
}
.queryorder
  .burgeon-modal-content
  .burgeon-modal-body
  .burgeon-form-item-content {
  margin-right: 0 !important;
}
.queryorder .burgeon-form-item {
  margin-bottom: 0 !important;
}
.queryorder .burgeon-modal-body .orderContent {
  display: flex;
  justify-content: space-between;
}
.queryorder .orderContent .buttonBox {
  height: 30px;
  margin-top: 40px;
}
.queryorder .jordan-table-box .page-box {
  margin-top: 0 !important;
  padding-top: 0 !important;
}
.queryorder .jordan-table-box .burgeon-table-wrapper {
  margin-top: 0 !important;
}
.availableStock {
  word-wrap: break-word;
  line-height: 20px;
}
.detailAdd .burgeon-modal {
  width: 800px !important;
}
.detailAdd .burgeon-modal-body {
  overflow: hidden;
}
</style>


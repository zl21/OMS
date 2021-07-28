<template>
  <div class="orderAddorCopy customized-detail" v-loading="loading">
    <!-- <loading :loading="loading"></loading> -->
    <div class="orderButtons customized-detail-btn">
      <businessButton :btn-config="btnConfig" />
    </div>
    <div class="customized-detail-main">
      <Collapse v-model="panelDefaultValue">
        <Panel name="1">
          <!-- 基本信息 -->
          {{ vmI18n.t("common.baseInformation") }}
          <p slot="content">
            <businessForm :form-config="formConfigBase" @keyDown="keyDown" />
          </p>
        </Panel>
        <Panel name="2" v-show="showRe">
          <!-- 收货人信息 -->
          {{ vmI18n.t("common.consigneeInformation") }}
          <p slot="content">
            <businessForm :form-config="formConfigRe" />
          </p>
        </Panel>
        <!-- 备注信息 -->
        <!-- <Panel name="3">
          {{ vmI18n.t('common.remarksInfo') }}
          <p slot="content">
            <businessForm :form-config="" />
          </p>
        </Panel> -->
      </Collapse>
      <!-- tab切换 -->
      <div class="customized-detail-table">
        <div class="custom-label">
          <businessLabel
            :label-default-value="labelDefaultValue"
            :label-list="labelList"
          />
        </div>
        <div class="table custom-table">
          <!-- 订单明细 -->
          <div class="barcodeDetails">
            <!-- 
            <businessForm :form-config="formConfigDetail" @keyDown="keyDown">
              <template #spec01="{ rowData }">
                <DropMultiSelectFilter
                  :data="filterData || rowData.value[rowData.item.defVal].data"
                  :totalRowCount="rowData.value[rowData.item.defVal].totalRowCount"
                  :AutoData="rowData.value[rowData.item.defVal].autoData"
                  :pageSize="rowData.item.pageSize"
                  @on-popper-show="rowData.item.popShow"
                  @on-page-change="rowData.item.changePage"
                  @on-fkrp-selected="rowData.item.fkrpSelected"
                  @on-input-value-change="rowData.item.inputValueChange"
                  @on-clear="rowData.item.clearInput"
                  @on-popper-hide="rowData.item.popHide"
                >
                </DropMultiSelectFilter>
              </template>
            </businessForm>
             -->
            <businessActionTable
              :jordan-table-config="jordanTableConfig"
              @on-select="onSelect"
              @on-select-all="onSelectAll"
              @on-select-all-cancel="onSelectAllCancel"
              @on-select-cancel="onSelectCancel"
              @table-delete-detail="tableDeleteDetail"
              @table-import="tableImport"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- 矩阵框-->
    <businessDialog
      :closable="matrixBox.closable"
      :component-data="matrixBox.componentData"
      :draggable="matrixBox.draggable"
      :exclude-string="matrixBox.excludeString"
      :keep-alive="matrixBox.keepAlive"
      :mask="matrixBox.mask"
      :mask-closable="matrixBox.maskClosable"
      :name="matrixBox.name"
      :scrollable="matrixBox.scrollable"
      :title="matrixBox.confirmTitle"
      :title-align="matrixBox.titleAlign"
      :transfer="matrixBox.transfer"
      :url="matrixBox.url"
      :width="matrixBox.width"
    />
    <!-- 明细导入 -->
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
      :base-path-name="importTable.basePathName"
      :url="importTable.url"
      :width="importTable.width"
      :basePathName="importTable.basePathName"
    />
  </div>
</template>
<script>
import businessButton from "professionalComponents/businessButton";
import businessForm from "professionalComponents/businessForm";
import businessActionTable from "professionalComponents/businessActionTable";
import businessLabel from "professionalComponents/businessLabel";
import businessDialog from "professionalComponents/businessDialog";
// import buttonPermissionsMixin from '@/assets/js/mixins/buttonPermissions';
// import dataAccessMixin from '@/assets/js/mixins/dataAccess';
import BurgeonValidate from "burgeonConfig/config/validate.config";
// import BtnConfig from 'burgeonConfig/config/funBtn.config';
import dateUtil from "@/assets/js/__utils__/date.js";
import axios from "axios";
import Util from "@/assets/js/public/publicMethods";

const _ = require("lodash");
const areaList = require("@/assets/js/address/area-list");
const { parse, parseArea } = require("@/assets/js/address/address-parse");

parseArea(areaList);
export default {
  name: "orderAddorCopy",
  components: {
    businessButton,
    businessForm,
    businessActionTable,
    businessLabel,
    businessDialog,
  },
  // mixins: [buttonPermissionsMixin, dataAccessMixin],
  data() {
    const validatePhoneNumber = BurgeonValidate.validatePhoneNumber;
    const validateReceiveAddress = BurgeonValidate.validateReceiveAddress;
    return {
      vmI18n: $i18n,
      showRe: true,
      inputArrBase: [
        "SELLER_MEMO",
        "BUYER_MESSAGE",
        "SHIP_AMT",
        "BUYER_NICK",
        "USER_NICK",
        "SOURCE_CODE",
        "PAY_TIME",
        "PAY_TYPE",
        "COLLECT_AMT",
        "SERVICE_AMT",
      ],
      drpArrBase: [
        "CP_C_SHOP_ID",
        "CP_C_PHY_WAREHOUSE_ID",
        "CP_C_LOGISTICS_ID",
      ],
      matrixBox: {
        refFuns: "confirmFun",
        confirmTitle: $i18n.t("modalTitle.matrixEntry"), // 矩阵录入
        titleAlign: "center", // 设置标题是否居中 center left
        width: "860",
        scrollable: false, // 是否可以滚动
        closable: true, // 是否可以按esc关闭
        draggable: true, // 是否可以拖动
        mask: true, // 是否显示遮罩层
        maskClosable: true, // 是否可以点击叉号关闭
        transfer: true, // 是否将弹层放在body内
        name: "matrixBox", // 组件名称
        url: "modal/orderCenter/matrixBox",
        keepAlive: true,
        excludeString: "matrixBox", // 将name传进去，确认不缓存
        componentData: {},
      }, // 退单编号查询
      importTable: {
        confirmTitle: "订单明细导入",
        titleAlign: "center", // 设置标题是否居中 center left
        width: "572",
        scrollable: false, // 是否可以滚动
        closable: true, // 是否可以按esc关闭
        draggable: false, // 是否可以拖动
        mask: true, // 是否显示遮罩层
        maskClosable: true, // 是否可以点击叉号关闭
        transfer: true, // 是否将弹层放在body内
        name: "importTable", // 组件名称
        basePathName: "business-components",
        url: "importTable",
        keepAlive: true,
        excludeString: "importTable", // 将name传进去，确认不缓存
        componentData: {},
      },
      watchChange: false, // 监听修改变化
      modify: {
        master: {}, // 主表信息
        subInfo: [], // 子表信息
      },
      loading: false,
      backable: false,
      // isSetOption: false, // 付款方式是否赋值options
      // isCopy: false, // 是否丢单复制和复制订单来时,第一次查询条码
      address: "", // 存储解析后的地址
      // payTypeSelectData: [], // 支付方式的下拉选项值
      panelDefaultValue: ["1", "2"],
      // btnConfig: BtnConfig.config(),
      btnConfig: {
        typeAll: "default",
        btnsite: "right",
        buttons: [
          {
            text: "保存",
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              this.save();
            },
          },
          {
            webname: 'fix_back',
            text: $i18n.t("btn.back"),
            btnclick: () => {
              this.back();
            },
          },
        ],
      },
      formConfigBase: {
        formData: [
          {
            version: "1.4",
            style: "popInput",
            width: "6",
            colname: "CP_C_SHOP_ID",
            itemdata: {
              serviceId: "r3-cp",
              colid: 168864,
              colname: "CP_C_SHOP_ID",
              name: "店铺",
              valuedata: "",
              pid: "",
              fkdisplay: "drp",
              isfk: true,
              isnotnull: true,
              readonly: false,
            },
            oneObj: (val) => {
              const _this = this;
              // if (!val.pid) return;
              _this.formConfigBase.formValue.CP_C_SHOP_ID = val.pid;
              _this.formConfigBase.formValue.CP_C_SHOP_ENAME = val.valuedata;
              _this.querItem("CP_C_PHY_WAREHOUSE_ID").inputList = [
                {
                  childs: [
                    {
                      colname: "CP_C_PHY_WAREHOUSE_ID", // 必须是这个
                      refobjid: val.pid, // 店铺的pid
                      valuedata: val.valuedata, // 店铺的valuedate
                      name: "店铺", // 联动的提示
                    },
                  ],
                },
              ];
              this.formConfigBase = this.emptyData(
                this.formConfigBase,
                "CP_C_SHOP_ID",
                this.modify,
                val,
                ["CP_C_PHY_WAREHOUSE_ID", "CP_C_LOGISTICS_ID"]
              );
              this.modifyData("CP_C_SHOP_ID", "master");
              // _this.getWarehouse(val.pid);
            },
          },
          /* {
            style: 'select',
            label: '发货仓库', // 发货仓库
            width: '6',
            colname: 'CP_C_PHY_WAREHOUSE_ID',
            onOpenChange: (flag) => {
              const _this = this;
              if (flag && !_this.formConfigBase.formValue.CP_C_SHOP_ID) {
                _this.$Message.warning('请先选择店铺！');
                return;
              }
            },
            selectChange: (val) => {
              const _this = this;
              _this.watchChange = true;
              _this.querItem('CP_C_LOGISTICS_ID').inputList = [
                {
                  childs: [{ colname: 'CP_C_PLATFORM_ID', refobjid: _this.formConfigBase.formValue.CP_C_PHY_WAREHOUSE_ID, valuedata: val.label || '_' }],
                },
              ];
              const bef = _this.modify.master.CP_C_PHY_WAREHOUSE_ID;
              const aft = _this.formConfigBase.formValue.CP_C_PHY_WAREHOUSE_ID;
              if (bef && _this.sourceId && bef != aft) {
                _this.querItem('CP_C_LOGISTICS_ID').itemdata.pid = '';
                _this.querItem('CP_C_LOGISTICS_ID').itemdata.valuedata = '';
                _this.formConfigBase.formValue.CP_C_LOGISTICS_ID = '';
                _this.modifyData('CP_C_LOGISTICS_ID', 'master');
              }
              _this.modifyData('CP_C_PHY_WAREHOUSE_ID', 'master');
            },
            options: [
              /* {
                "label": "XWT0001NAME",
                "value": 235
              },
              {
                "label": "20XW-Test-NAME-001000",
                "value": 250
              }
            ],
          }, */
          {
            version: "1.4",
            style: "popInput",
            width: "6",
            colname: "CP_C_PHY_WAREHOUSE_ID",
            inputList: [
              {
                childs: [
                  {
                    colname: "CP_C_PHY_WAREHOUSE_ID",
                    refobjid: "",
                    valuedata: "",
                    name: "店铺",
                  },
                ],
              },
            ],
            itemdata: {
              serviceId: "r3-cp",
              colid: 171251,
              colname: "CP_C_PHY_WAREHOUSE_ID",
              fkdisplay: "drp",
              isfk: true, // 是否有fk键
              isnotnull: true, // 是否必填
              name: "发货仓库",
              readonly: false,
              valuedata: "",
              refcolval: {
                fixcolumn: "CP_C_SHOP_ID", // 根据什么查
                expre: "equal",
                srccol: "CP_C_PHY_WAREHOUSE_ID", // 要查什么
              },
            },
            oneObj: (val) => {
              const _this = this;
              _this.formConfigBase.formValue.CP_C_PHY_WAREHOUSE_ID = val.pid;
              _this.formConfigBase.formValue.CP_C_PHY_WAREHOUSE_ENAME =
                val.valuedata;
              _this.formConfigBase = this.emptyData(
                this.formConfigBase,
                "CP_C_PHY_WAREHOUSE_ID",
                this.modify,
                val,
                ["CP_C_LOGISTICS_ID"]
              );
              _this.querItem("CP_C_LOGISTICS_ID").inputList = [
                {
                  childs: [
                    {
                      colname: "CP_C_LOGISTICS_ID",
                      refobjid: val.pid,
                      valuedata: val.pid,
                      name: "发货仓库",
                    },
                  ],
                },
              ];
              _this.modifyData("CP_C_PHY_WAREHOUSE_ID", "master");
            },
          },
          {
            version: "1.4",
            style: "popInput",
            width: "6",
            colname: "CP_C_LOGISTICS_ID",
            inputList: [
              {
                childs: [
                  {
                    colname: "CP_C_LOGISTICS_ID",
                    refobjid: "",
                    valuedata: "",
                    name: "发货仓库",
                  },
                ],
              },
            ],
            itemdata: {
              serviceId: "r3-cp",
              colid: 171280,
              colname: "CP_C_LOGISTICS_ID",
              fkdisplay: "drp",
              isfk: true, // 是否有fk键
              isnotnull: false, // 是否必填
              name: "物流公司",
              readonly: false, // 仅读
              valuedata: "",
              refcolval: {
                fixcolumn: "CP_C_PHY_WAREHOUSE_ID", // queryList入参的字段
                expre: "equal",
                srccol: "CP_C_LOGISTICS_ID",
              },
            },
            oneObj: (val) => {
              const _this = this;
              _this.formConfigBase.formValue.CP_C_LOGISTICS_ID = val.pid;
              _this.formConfigBase.formValue.CP_C_LOGISTICS_ENAME =
                val.valuedata;
              this.modifyData("CP_C_LOGISTICS_ID", "master");
            },
          },
          {
            style: "input",
            colname: "SHIP_AMT", // 运费，默认0
            label: "运费",
            width: "6",
            regx: /^(\s*|([1-9]{1}\d*)|(0{1}))(\.\d{0,2})?$/,
            inputChange: () => {
              this.modifyData("SHIP_AMT", "master");
            },
          },
          {
            style: "input",
            width: "6",
            colname: "SOURCE_CODE", // 平台单号
            label: "平台单号",
            inputChange: () => {
              this.modifyData("SOURCE_CODE", "master");
            },
          },
          {
            style: "select",
            width: "6",
            colname: "PAY_TYPE",
            label: "支付方式",
            selectChange: () => {
              this.modifyData("PAY_TYPE", "master");
            },
            options: [],
          },
          // 支付方式为'货到付款'时才展示'代收货款'、'服务费'
          {
            style: null,
            colname: "COLLECT_AMT",
            label: "代收货款",
            width: "6",
            regx: /^(\s*|([1-9]{1}\d*)|(0{1}))(\.\d{0,2})?$/,
            inputChange: () => {
              this.modifyData("COLLECT_AMT", "master");
            },
          },
          {
            style: null,
            colname: "SERVICE_AMT",
            label: "服务费",
            width: "6",
            regx: /^(\s*|([1-9]{1}\d*)|(0{1}))(\.\d{0,2})?$/,
            inputChange: () => {
              this.modifyData("SERVICE_AMT", "master");
            },
          },
          {
            style: "input",
            colname: "BUYER_NICK", // 买家昵称
            label: "买家昵称",
            width: "6",
            inputChange: () => {
              this.modifyData("BUYER_NICK", "master");
            },
          },
          {
            style: "date",
            type: "datetime",
            label: "支付时间",
            colname: "PAY_TIME",
            format: "yyyy-MM-dd HH:mm:ss",
            width: "6",
            icon: "md-alarm",
            placeholder: "",
            transfer: true,
            ghost: false, // 是否关闭幽灵按钮，默认开启
            onChange: () => {
              let time = this.formConfigBase.formValue.PAY_TIME;
              if (time)
                this.formConfigBase.formValue.PAY_TIME = this.formatDate(time);
              this.modifyData("PAY_TIME", "master");
            },
            clearable: true,
          },
          {
            style: "input",
            colname: "SELLER_MEMO", // 卖家备注
            label: "卖家备注",
            width: "12",
            inputChange: () => {
              this.modifyData("SELLER_MEMO", "master");
            },
          },
          {
            style: "input",
            colname: "BUYER_MESSAGE", // 买家留言
            label: "买家留言",
            width: "12",
            inputChange: () => {
              this.modifyData("BUYER_MESSAGE", "master");
            },
          },
        ],
        formValue: {
          SELLER_MEMO: "", // 卖家备注
          BUYER_MESSAGE: "", // 买家留言
          SHIP_AMT: 0, // 费用
          USER_NICK: "", // 买家昵称
          BUYER_NICK: "", // 买家昵称
          SOURCE_CODE: "", // 平台单号，Y
          is_kaip: false, // 是否开票
          PAY_TIME: new Date(), // 创建时间
          // INSIDE_REMARK: '', // 内部备注
          CP_C_SHOP_ID: "", // 店铺，Y
          CP_C_SHOP_TITLE: "",
          CP_C_LOGISTICS_ID: "", // 物流公司，drp
          CP_C_LOGISTICS_ENAME: "",
          CP_C_PHY_WAREHOUSE_ID: "", // 发货仓库，Y
          CP_C_PHY_WAREHOUSE_ENAME: "",
          PAY_TYPE: 1, // 支付方式，Y
          COLLECT_AMT: "", // 代收货款，Y
          SERVICE_AMT: "", // 服务费
        },
        ruleValidate: {
          COLLECT_AMT: [
            {
              required: true,
              message: " ",
              trigger: "blur",
            },
          ],
          SOURCE_CODE: [
            {
              required: true,
              message: " ",
              trigger: "blur",
            },
          ],
          PAY_TYPE: [
            {
              required: true,
              message: " ",
              trigger: "blur",
            },
          ],
          CP_C_PHY_WAREHOUSE_ID: [
            {
              required: true,
              message: " ",
              trigger: "blur",
            },
          ],
        },
      },
      formConfigRe: {
        formData: [
          {
            style: "input",
            colname: "site", // 智能匹配地址
            label: "智能匹配地址",
            width: "24",
            placeholder:
              "如:张三,17788888888,上海上海市闵行区黎安路999号（输入后请按Enter键）",
            inputenter: () => {
              const self = this;
              self.address = parse(self.formConfigRe.formValue.site);
              let flag = false;
              const {
                detail,
                phone,
                mobile,
                zip_code,
                result,
                ...addressObj
              } = self.address;
              console.log(addressObj);
              if (Object.keys(addressObj).filter((k) => !addressObj[k]).length <= 0) {
                flag = true; // 全部有值
              }
              const modifyArr = [
                "RECEIVER_NAME",
                "RECEIVER_MOBILE",
                "RECEIVER_ADDRESS",
              ];
              const ssqModifyArr = [
                "CP_C_REGION_PROVINCE_ID",
                "CP_C_REGION_CITY_ID",
                "CP_C_REGION_AREA_ID",
              ];
              // if (!flag) {
              // "请填入完整信息,如:张三,17788888888,上海上海市闵行区黎安路999号"
              // self.$Message.warning($i18n.t("modalTips.f9"));
              self.selectRegion(addressObj.province, addressObj.city, addressObj.area).then(res => {
                let { data: { data: { provinceInfo, cityInfo, areaInfo } } } = res;
                const queryData = self.formConfigRe.formData;
                queryData[5].itemdata.pid = provinceInfo ? provinceInfo.id : '';
                queryData[5].itemdata.valuedata = provinceInfo ? provinceInfo.name : ''; // 省赋值
                queryData[6].itemdata.pid = cityInfo ? cityInfo.id : '';
                queryData[6].itemdata.valuedata = cityInfo ? cityInfo.name : ''; // 市赋值
                queryData[7].itemdata.pid = areaInfo ? areaInfo.id : '';
                queryData[7].itemdata.valuedata = areaInfo ? areaInfo.name : ''; // 区赋值
                self.formConfigRe.formValue.RECEIVER_NAME = self.address.name; // 收货人赋值
                self.formConfigRe.formValue.RECEIVER_PHONE = self.address.phone; // 收货人电话赋值
                self.formConfigRe.formValue.RECEIVER_MOBILE = self.address.mobile; // 收货人手机赋值
                self.formConfigRe.formValue.RECEIVER_ADDRESS = self.address.addr; // 收货人地址赋值
                ssqModifyArr.forEach((it) => {
                  self.formConfigRe.formValue[it] = self.querItem(it, "formConfigRe").itemdata.pid;
                  self.formConfigRe.formValue[it.replace("_ID", "_NAME")] = self.querItem(it, "formConfigRe").itemdata.valuedata;
                });
                modifyArr.concat(ssqModifyArr).forEach((it) => { self.modifyData(it, "master", "r") });
              })
              // } else {
              // self.formConfigRe.formValue.RECEIVER_NAME = self.address.name; // 收货人赋值
              // self.formConfigRe.formValue.RECEIVER_PHONE = self.address.phone; // 收货人电话赋值
              // self.formConfigRe.formValue.RECEIVER_MOBILE = self.address.mobile; // 收货人手机赋值
              // self.formConfigRe.formValue.RECEIVER_ADDRESS = self.address.addr; // 收货人地址赋值
              /* const queryData = self.formConfigRe.formData;
              self.getAddressId(
                self.address.province,
                self.address.city,
                self.address.area
              ).then(res => {
                if (res.data.code === 0) {
                  queryData[5].itemdata.pid = res.data.data.CP_C_REGION_PROVINCE_ID;
                  queryData[5].itemdata.valuedata = res.data.data.CP_C_REGION_PROVINCE_ENAME; // 省赋值
                  queryData[6].itemdata.pid = res.data.data.CP_C_REGION_CITY_ID;
                  queryData[6].itemdata.valuedata = res.data.data.CP_C_REGION_CITY_ENAME; // 市赋值
                  queryData[7].itemdata.pid = res.data.data.CP_C_REGION_AREA_ID;
                  queryData[7].itemdata.valuedata = res.data.data.CP_C_REGION_AREA_ENAME; // 区赋值
                  ssqModifyArr.forEach((it) => {
                    self.formConfigRe.formValue[it] = self.querItem(it, "formConfigRe").itemdata.pid;
                    self.formConfigRe.formValue[it.replace("_ID", "_NAME")] = self.querItem(it, "formConfigRe").itemdata.valuedata;
                  });
                  modifyArr.concat(ssqModifyArr).forEach((it) => { self.modifyData(it, "master", "r") });
                }
              }); */
              // }
            },
          },
          {
            style: "input",
            label: "收货人",
            colname: "RECEIVER_NAME", // 收货人,Y
            width: "6",
            inputChange: () => {
              this.modifyData("RECEIVER_NAME", "master", "r");
            },
          },
          {
            style: "input",
            label: "手机号",
            colname: "RECEIVER_MOBILE", // 手机号,N
            width: "6",
            regx: /^(\s*|\d+)$/,
            inputChange: () => {
              this.modifyData("RECEIVER_MOBILE", "master", "r");
            },
          },
          {
            style: "input",
            colname: "RECEIVER_PHONE", // 电话,N
            label: "电话",
            width: "6",
            inputChange: () => {
              this.modifyData("RECEIVER_PHONE", "master", "r");
            },
          },
          {
            style: "input",
            colname: "RECEIVER_ZIP", // 邮编,N
            label: "邮编",
            width: "6",
            inputChange: () => {
              this.modifyData("RECEIVER_ZIP", "master", "r");
            },
          },
          {
            version: "1.4",
            style: "popInput", // 省,Y
            width: "6",
            colname: "CP_C_REGION_PROVINCE_ID",
            itemdata: {
              serviceId: 'r3-cp',
              colid: 166974,
              colname: "CP_C_REGION_PROVINCE_ID",
              fkdisplay: "drp",
              isfk: true,
              isnotnull: true,
              name: "省",
              readonly: false,
              pid: "",
              valuedata: "",
            },
            oneObj: (val) => {
              this.formConfigRe.formValue.CP_C_REGION_PROVINCE_ID = val.pid;
              this.formConfigRe.formValue.CP_C_REGION_PROVINCE_ENAME = val.valuedata;
              this.formConfigRe = this.emptyData(this.formConfigRe, "CP_C_REGION_PROVINCE_ID", this.modify, val, ["CP_C_REGION_CITY_ID", "CP_C_REGION_AREA_ID"]);
              this.modifyData("CP_C_REGION_PROVINCE_ID", "master", "r");
            },
            InputEnter: (val) => {
              this.formConfigRe.formValue.CP_C_REGION_PROVINCE_ID = val.pid;
              this.formConfigRe.formValue.CP_C_REGION_PROVINCE_ENAME = val.valuedata;
              this.formConfigRe = this.emptyData(this.formConfigRe, "CP_C_REGION_PROVINCE_ID", this.modify, val, ["CP_C_REGION_CITY_ID", "CP_C_REGION_AREA_ID"]);
              this.modifyData("CP_C_REGION_PROVINCE_ID", "master", "r");
            }
          },
          {
            version: "1.4",
            style: "popInput", // 市,Y
            width: "6",
            colname: "CP_C_REGION_CITY_ID",
            inputList: [],
            objList: [],
            itemdata: {
              serviceId: 'r3-cp',
              colid: 167077,
              colname: "CP_C_REGION_CITY_ID",
              fkdisplay: "drp",
              isfk: true, // 是否有fk键
              isnotnull: true, // 是否必填
              name: "市",
              readonly: false, // 是否可编辑，对应input   readonly属性
              refcolval: {
                fixcolumn: "C_UP_ID",
                expre: "equal",
                srccol: "CP_C_REGION_PROVINCE_ID",
              },
              pid: "",
              valuedata: "",
            },
            oneObj: (val) => {
              this.formConfigRe.formValue.CP_C_REGION_CITY_ID = val.pid;
              this.formConfigRe.formValue.CP_C_REGION_CITY_ENAME = val.valuedata;
              this.formConfigRe = this.emptyData(this.formConfigRe, "CP_C_REGION_CITY_ID", this.modify, val, ["CP_C_REGION_AREA_ID"]);
              this.modifyData("CP_C_REGION_CITY_ID", "master", "r");
            },
            InputEnter: (val) => {
              console.log('InputEnter::', val);
              this.formConfigRe.formValue.CP_C_REGION_CITY_ID = val.pid;
              this.formConfigRe.formValue.CP_C_REGION_CITY_ENAME = val.valuedata;
              this.formConfigRe = this.emptyData(this.formConfigRe, "CP_C_REGION_CITY_ID", this.modify, val, ["CP_C_REGION_AREA_ID"]);
              this.modifyData("CP_C_REGION_CITY_ID", "master", "r");
            }
          },
          {
            version: "1.4",
            style: "popInput", // 区,N
            width: "6",
            colname: "CP_C_REGION_AREA_ID",
            inputList: [],
            itemdata: {
              serviceId: 'r3-cp',
              colid: 167091,
              colname: "CP_C_REGION_AREA_ID",
              fkdisplay: "drp",
              isfk: true, // 是否有fk键
              isnotnull: false, // 是否必填
              name: "区",
              readonly: false, // 是否可编辑，对应input   readonly属性
              pid: "",
              valuedata: "",
              refcolval: {
                fixcolumn: "C_UP_ID",
                expre: "equal",
                srccol: "CP_C_REGION_CITY_ID",
              }, // 过滤配置
            },
            oneObj: (val) => {
              this.formConfigRe.formValue.CP_C_REGION_AREA_ID = val.pid;
              this.formConfigRe.formValue.CP_C_REGION_AREA_ENAME = val.valuedata;
              this.modifyData("CP_C_REGION_AREA_ID", "master", "r");
            },
            InputEnter: (val) => {
              this.formConfigRe.formValue.CP_C_REGION_AREA_ID = val.pid;
              this.formConfigRe.formValue.CP_C_REGION_AREA_ENAME = val.valuedata;
              this.modifyData("CP_C_REGION_AREA_ID", "master", "r");
            }
          },
          {
            style: "input",
            colname: "RECEIVER_ADDRESS", // 收货人地址
            label: "收货人地址",
            width: "12",
            inputChange: () => {
              this.modifyData("RECEIVER_ADDRESS", "master", "r");
            },
          },
        ],
        formValue: {
          time: "",
          site: "", // 智能地址值
          RECEIVER_NAME: "", // 收货人，Y
          RECEIVER_MOBILE: "", // 收货人手机，Y
          RECEIVER_PHONE: "", // 收货人电话
          RECEIVER_ZIP: "", // 收货人邮编
          // CONSIGN_SHIP_AMT: "", //收货人邮费
          RECEIVER_ADDRESS: "", // 收货人地址，Y

          CP_C_REGION_PROVINCE_ID: "", // 收货人省份id，Y
          CP_C_REGION_PROVINCE_ENAME: "", // 收货人省名称

          CP_C_REGION_CITY_ID: "", // 收货人市id，Y
          CP_C_REGION_CITY_ENAME: "", // 收货人市明称

          CP_C_REGION_AREA_ID: "", // 收货人区id，Y
          CP_C_REGION_AREA_ENAME: "", // 收货人区名称
        },
        ruleValidate: {
          RECEIVER_NAME: [
            {
              required: true,
              message: " ",
              trigger: "blur",
            },
          ],
          RECEIVER_ADDRESS: [
            {
              validator: validateReceiveAddress,
              required: true,
              // message: ' ',
              trigger: "blur",
            },
          ],
          RECEIVER_MOBILE: [
            {
              validator: validatePhoneNumber,
              required: true,
              // message: ' ',
              trigger: "blur",
            },
          ],
        },
      },
      formConfigDetail: {
        formValue: {
          PS_C_SKU_data: {
            totalRowCount: 0,
            autoData: [],
            data: {
              start: 0,
              tabth: [],
              row: [],
            },
            defaultSelected: [],
          },
        },
        formData: [
          {
            label: "SKU编码",
            colname: "PS_C_SKU",
            defVal: "PS_C_SKU_data",
            style: "formCompile",
            slotName: "spec01",
            width: "6",
            isnotonly: true,
            disabled: false,
            pageSize: 10, // 每页条数
            itemdata: {
              serviceId: 'r3-cp',
              colid: "171332",
              colname: "PS_C_SKU",
              name: "SKU编码",
              valuedata: "",
              pid: "",
              fkdisplay: "mrp",
              isfk: true,
              isnotnull: true,
              readonly: false,
            },
            fkrpSelected: (e) => {
              console.log(e);
              this.getItems(e);
            }, // 选中
            clearInput: () => {
              this.getItems();
            }, // 点击clearIcon
            popShow: () => {
              this.getDropDownOptions(1);
            }, // 点击下拉小icon
            popHide: (e) => {
              const selsctData = e.transferDefaultSelected;
              console.log(selsctData);
              // this.searchOrderDetail(val.valuedata);
            },
            changePage: (pageNum) => {
              this.getDropDownOptions(pageNum);
            }, // 页码改变
            inputValueChange: (keyword) => {
              this.getDropDownOptions(keyword, true);
            }, // 模糊搜索
          },
        ],
      },
      filterData: {
        start: 0,
        tabth: [],
        row: [],
      },
      // 表格
      jordanTableConfig: {
        indexColumn: false,
        businessFormConfig: {
          formValue: {
            dimData: "",
            Num: "",
            gbCode: "",
          },
          formData: [
            {
              // version: '1.4',
              // style: "popInput",
              style: "popInputPlus",
              width: "6",
              colname: "PS_C_SKU",
              itemdata: {
                serviceId: 'r3-cp',
                version: '1.4',
                colid: "171332",
                colname: "PS_C_SKU",
                name: "SKU编码",
                valuedata: "",
                pid: "",
                fkdisplay: "drp",
                isfk: true,
                isnotnull: true,
                readonly: false,
                columnsKey: ['ECODE'],
                hidecolumns: ['id', 'value', 'ENAME'],
              },
              oneObj: (val) => {
                console.log("SKU编码-oneObj::", val);
                if (!val.pid && !val.valuedata) return;
                this.searchOrderDetail(val.valuedata);
              },
              // inputBlur: (val) => {
              //   if (!val.pid && !val.valuedata) return;
              // },
              inputEnter: (val) => {
                if (!val.pid && !val.valuedata) return;
                this.searchOrderDetail(val.valuedata);
              }
            },
          ],
        },
        businessButtonConfig: {
          typeAll: 'default', // 按钮统一风格样式
          btnsite: "left",
          buttons: [
            {
              type: 'primary', // 按钮类型
              text: '删除明细', // 按钮文本
              isShow: true,
              btnclick: (e) => {
                this.tableDeleteDetail();
              }
            },
            {
              type: 'default', // 按钮类型
              text: '导入', // 按钮文本
              isShow: true,
              btnclick: (e) => {
                this.tableImport();
              }
            },
          ],
        },
        isSearchText: true,
        isShowDeleteDetailBtn: false, // 控制是否显示删除明细
        isShowImportBtn: false, // 控制是否显示导入
        pageShow: false, // 控制分页是否显示
        btnsShow: true, // 控制操作按钮是否显示
        searchInputShow: false, // 控制搜索框是否显示
        width: "", // 表格宽度
        height: "280", // 表格高度
        border: true, // 是否显示纵向边框
        total: 1, // 设置总条数
        pageSizeOpts: [10, 30, 45, 60], // 每页条数切换的配置
        pageSize: 10, // 每页条数
        // isShowSelection: true, // 多选框
        // indexColumn: true, // 序号
        selectData: [], // 选中的数据
        deleteData: [], // 删除的数据
        addData: [], // 添加的数据
        data: [],
        totalData: [], // 合计
        columns: [
          {
            key: 'selection',
            type: 'selection',
            width: '50',
            align: 'center',
          },
          {
            title: $i18n.t("table_label.serialNo"), // "序号",
            key: "index",
            type: "index",
            align: 'center',
          },
          {
            title: $i18n.t("table_label.code_SKU"), // SKU编码
            key: "PS_C_SKU_ECODE",
            dataAcessKey: "PS_C_SKU_ECODE",
          },
          {
            title: $i18n.t("form_label.skuName"), // SKU名称
            key: "PS_C_SKU_ENAME",
            dataAcessKey: "PS_C_SKU_ENAME",
          },
          {
            title: $i18n.t("table_label.itemNo01"), // SPU编码
            key: "PS_C_PRO_ECODE",
            dataAcessKey: "PS_C_PRO_ECODE",
          },
          {
            title: $i18n.t("table_label.itemNo02"), // SPU名称
            key: "PS_C_PRO_ENAME",
            dataAcessKey: "PS_C_PRO_ENAME",
          },
          {
            title: $i18n.t("form_label.cu"), // 零售价
            key: "PRICE",
            dataAcessKey: "PRICE",
          },
          {
            title: $i18n.t("table_label.unitPrice"), // 成交单价
            key: "PRICE_ACTUAL",
            /* render: (h, params) => {
              const self = this;
              return h(
                "div",
                {
                  style: {
                    width: "100%",
                    display: "flex",
                    alignitems: "center",
                    justifyContent: "space-between",
                  },
                },
                [
                  h("Input", {
                    class: "isNone",
                    style: {
                      width: "150",
                      height: "100%",
                      "text-align": "center",
                    },
                    props: {
                      value: params.row.PRICE_ACTUAL,
                      autosize: true,
                      regx: /^\d*\.{0,1}\d{0,2}$/,
                      disabled: params.row.disabled,
                    },
                    on: {
                      'on-blur': e => {
                        let inputRA = Number(e.target._value);
                        if (!params.row.QTY && !inputRA) {
                          params.row.REAL_AMT = '0.00';
                          params.row.ADJUST_AMT = '0.00';
                          params.row.PRICE_ACTUAL = '0.00';
                        } else {
                          params.row.PRICE_ACTUAL = self.$OMS2.omsUtils.floatNumber(inputRA, 2); // 成交单价 保留两位小数 赋值
                        }
                        ++params.row._rowKey;
                        self.jordanTableConfig.data[params.index] = params.row;
                        self.totalNum();
                      },
                      'on-change': e => {
                        self.debounce(function () {
                          self.$nextTick(() => {
                            let inputPA = Number(e.target._value);
                            // params.row.PRICE_ACTUAL = self.$OMS2.omsUtils.floatNumber(inputPA, 2); // 成交单价赋值
                            params.row.ADJUST_AMT = 0;
                            const price = Number(params.row.PRICE);
                            const q = Number(params.row.QTY || 0);
                            const aa = Number(params.row.ADJUST_AMT || 0);
                            let ra = Number(params.row.REAL_AMT || 0);
                            const ad = Number(params.row.AMT_DISCOUNT || 0);
                            const osa = Number(params.row.ORDER_SPLIT_AMT || 0);
                            if (params.row.QTY && inputPA) {
                              // AMT_DISCOUNT 商品优惠金额
                              // ORDER_SPLIT_AMT 订单优惠金额
                              // 输入单价：修改零售价、成交金额、调整金额即可（计算成交金额时先将调整金额置为0
                              // 公式：【零售价 * 数量 - 商品优惠 - 订单优惠 + 调整金额 = 成交金额】
                              // 公式：【PRICE/PRICE_ACTUAL * QTY - 0 - 0 + ADJUST_AMT = REAL_AMT】
                              // 成交金额 = 成交单价 * 数量 - 商品优惠 - 订单优惠 + 调整金额
                              // 成交金额 = 成交单价 * 数量 （取这个
                              // 调整金额 = (成交金额 + 订单优惠 + 商品优惠) - (零售价'PRICE' * 数量)
                              params.row.REAL_AMT = self.$OMS2.omsUtils.floatNumber(inputPA * q, 2);
                              ra = Number(params.row.REAL_AMT);
                              params.row.ADJUST_AMT = self.$OMS2.omsUtils.floatNumber(ra + ad + osa - price * q, 2);
                            } else {
                              params.row.REAL_AMT = 0;
                              params.row.ADJUST_AMT = 0;
                              params.row.PRICE_ACTUAL = 0;
                            }
                            // params.row.PRICE = params.row.PRICE_ACTUAL; // 零售价 = 成交单价
                            self.jordanTableConfig.data[params.index] = params.row;
                            self.totalNum();
                          });
                        }, 1000)()
                      },
                    },
                  }),
                ]
              );
            }, */
          },
          {
            title: $i18n.t("table_label.quantities"), // 数量
            key: "QTY",
            dataAcessKey: "QTY",
            render: (h, params) => {
              const self = this;
              return h("InputNumber", {
                props: {
                  value: Number(params.row.QTY),
                  regx: /^[0-9]\d*$/,
                  min: 1,
                  editable: true,
                },
                on: {
                  "on-change": (e) => {
                    // 输入数量：修改成交金额、调整金额即可（计算成交金额时先将调整金额置为0
                    // 6.24变更：输入数量，计算成交单价、调整金额，数量不能小于1
                    let inputQTY = Number(e);
                    params.row.QTY = inputQTY;
                    params.row.ADJUST_AMT = 0;
                    const price = Number(params.row.PRICE);
                    let pa = Number(params.row.PRICE_ACTUAL || 0);
                    const aa = Number(params.row.ADJUST_AMT || 0);
                    let ra = Number(params.row.REAL_AMT || 0);
                    const ad = Number(params.row.AMT_DISCOUNT || 0);
                    const osa = Number(params.row.ORDER_SPLIT_AMT || 0);
                    if (pa && inputQTY) {
                      // 成交金额 = 成交单价 * 数量 （取这个
                      // 6.24变更：成交单价 = 成交金额 / 数量
                      // params.row.REAL_AMT = $omsUtils.floatNumber(pa * inputQTY, 2);
                      params.row.PRICE_ACTUAL = $omsUtils.floatNumber(ra / inputQTY, 2);
                      // ra = Number(params.row.REAL_AMT);
                      // pa = Number(params.row.PRICE_ACTUAL);
                      console.log(ra, ad, osa, price, inputQTY);
                      const aaa = ra + ad + osa - price * inputQTY;
                      console.log('四舍五入前：', aaa);
                      params.row.ADJUST_AMT = $omsUtils.floatNumber(ra + ad + osa - price * inputQTY, 2);
                      console.log('params.row.ADJUST_AMT', params.row.ADJUST_AMT);
                    } else {
                      params.row.REAL_AMT = '0.00';
                      params.row.ADJUST_AMT = '0.00';
                      params.row.PRICE_ACTUAL = '0.00';
                    }
                    self.jordanTableConfig.data[params.index] = params.row;
                    self.totalNum();
                  },
                },
              });
            }
          },
          {
            title: $i18n.t("table_label.transactionAmount"), // 成交金额
            key: "REAL_AMT",
            dataAcessKey: "REAL_AMT",
            render: (h, params) => {
              const self = this;
              return h(
                "div",
                {
                  style: {
                    width: "100%",
                    display: "flex",
                    alignitems: "center",
                    justifyContent: "space-between",
                  },
                },
                [
                  h("Input", {
                    class: "isNone",
                    style: {
                      width: "150",
                      height: "100%",
                      "text-align": "center",
                    },
                    props: {
                      value: params.row.REAL_AMT,
                      autosize: true,
                      regx: /^\d*\.{0,1}\d{0,2}$/,
                      disabled: params.row.disabled,
                    },

                    on: {
                      "on-change": (e) => {
                        self.debounce(function () {
                          self.$nextTick(() => {
                            // 输入成交金额：修改单价、调整金额即可
                            let inputRA = Number(e.target.value);
                            // params.row.REAL_AMT = self.$OMS2.omsUtils.floatNumber(inputRA, 2);
                            const price = Number(params.row.PRICE);
                            const q = Number(params.row.QTY || 0);
                            const aa = Number(params.row.ADJUST_AMT || 0);
                            const ad = Number(params.row.AMT_DISCOUNT || 0);
                            const osa = Number(params.row.ORDER_SPLIT_AMT || 0);
                            if (params.row.QTY && inputRA) {
                              // 单价 = (成交金额 - 调整金额 + 订单优惠 + 商品优惠) / 数量
                              // 单价 = 成交金额 / 数量 （取这个
                              params.row.PRICE_ACTUAL = self.$OMS2.omsUtils.floatNumber(inputRA / q, 2);
                              // 调整金额 = (成交金额 + 订单优惠 + 商品优惠) - (零售价'PRICE' * 数量)
                              params.row.ADJUST_AMT = self.$OMS2.omsUtils.floatNumber(inputRA + ad + osa - price * q, 2);
                            } else {
                              params.row.REAL_AMT = 0;
                              params.row.ADJUST_AMT = 0;
                              params.row.PRICE_ACTUAL = 0;
                            }
                            self.jordanTableConfig.data[params.index] = params.row;
                            self.totalNum();
                          });
                        }, 1000)()
                      },
                      'on-blur': e => {
                        let inputRA = Number(e.target._value);
                        if (!params.row.QTY && !inputRA) {
                          params.row.REAL_AMT = '0.00';
                          params.row.ADJUST_AMT = '0.00';
                          params.row.PRICE_ACTUAL = '0.00';
                        } else {
                          params.row.REAL_AMT = self.$OMS2.omsUtils.floatNumber(inputRA, 2);
                        }
                        ++params.row._rowKey;
                        self.jordanTableConfig.data[params.index] = params.row;
                        self.totalNum();
                      },
                    },
                  }),
                ]
              );
            },
          },
          {
            title: $i18n.t("table_label.adjustment_amount"), // 调整金额
            key: "ADJUST_AMT",
            dataAcessKey: "ADJUST_AMT",
            render: (h, params) =>
              h("span", {}, $omsUtils.floatNumber(params.row.ADJUST_AMT || 0, 2)),
          },
        ],
      },
      // tab切换配置
      labelList: [
        {
          label: $i18n.t("panel_label.order_detailed"), // 订单明细
          value: "1",
          isShow: true,
        },
      ],
      labelDefaultValue: "1", // 设置tab默认值
      orderNo: {
        refFuns: "confirmFun",
        confirmTitle: $i18n.t("modalTitle.matrixEntry"), // 矩阵录入
        titleAlign: "center", // 设置标题是否居中 center left
        width: "800",
        scrollable: false, // 是否可以滚动
        closable: true, // 是否可以按esc关闭
        draggable: true, // 是否可以拖动
        mask: false, // 是否显示遮罩层
        maskClosable: true, // 是否可以点击叉号关闭
        transfer: true, // 是否将弹层放在body内
        name: "orderNo", // 组件名称
        url: "modal/orderCenter/changeRemark",
      },
    };
  },
  watch: {
    "formConfigBase.formValue.PAY_TYPE": {
      handler(newValue, oldVal) {
        if (newValue == 2) {
          this.querItem("COLLECT_AMT").style = "input";
          this.querItem("SERVICE_AMT").style = "input";
        } else {
          this.querItem("COLLECT_AMT").style = null;
          this.querItem("SERVICE_AMT").style = null;
        }
      },
    },
  },
  computed: {
    ID() {
      return this.$route.params.customizedModuleId &&
        this.$route.params.customizedModuleId == "New"
        ? "-1"
        : "";
    },
    sourceId() {
      return this.$route.query.sourceId * 1 || "";
    },
    copyType() {
      return this.$route.query.copyType * 1 || 0;
    },
    copyReason() {
      return this.$route.query.copyReason * 1 || 0;
    },
  },
  created() {
    this.relationShip();
  },
  activated() {
    // this.getBtn();
  },
  async mounted() {
    this.querItem("PAY_TYPE").options = [
      {
        label: "在线支付",
        value: 1,
      },
      {
        label: "货到付款",
        value: 2,
      },
    ];
    this.$nextTick(() => {
      // this.getPermissions('btnConfig', 'orderManager');
      this.init(-1);
    });
    // this.getBtn();
    this.initObjItem(self.ID);
  },
  methods: {
    // 获取按钮权限
    getBtn() {
      $OMS2.omsUtils.getPermissions(this, 'btnConfig', { table: 'OC_B_ORDER', type: 'OBJ' }, true).then(res => {
        const { ACTIONS, SUB_ACTIONS } = res;
        console.log('buttons::', this.btnConfig.buttons, 'res::', res);
        const webArr = $OMS2.omsUtils.sonList(SUB_ACTIONS, 'webname');
        this.jordanTableConfig.businessButtonConfig.buttons[0].isShow = webArr.includes('删除');
        this.jordanTableConfig.businessButtonConfig.buttons[1].isShow = webArr.includes('导入');
      });
    },
    debounce(fn, time) {
      let timer = null;
      return function debounced() {
        const _self = this;//input
        const args = arguments;//inputEvent
        clearTimeout(timer);
        timer = setTimeout(function () {
          fn.apply(_self, args);
        }, time);
      };
    },
    async init(id) {
      if (this.sourceId) {
        return;
      }
      const self = this;
      this.loading = true;
      const data = await $omsUtils.getObject(
        "OC_B_ORDER_VIRTUAL_TABLE",
        id
      );
      let base, re;
      for (const it of data.addcolums) {
        if (it.parentname == "(OC_B_ORDER_VIRTUAL_TABLE.ID+300)") {
          re = it.childs;
        } else if (it.parentname == "(OC_B_ORDER_VIRTUAL_TABLE.ID+10)") {
          base = it.childs;
        }
      }
      self.formConfigBase = $omsUtils.initFormConfig(
        base,
        self.formConfigBase
      );
      self.formConfigRe = $omsUtils.initFormConfig(
        re,
        self.formConfigRe
      );
      setTimeout(() => {
        this.loading = false;
      }, 100);
    },
    async initObjItem(id) {
      const self = this;
      this.loading = true;
      // const data = await $omsUtils.getObject('OC_B_ORDER_VIRTUAL_TABLE', id);
      // self.formConfigBase = $omsUtils.initFormConfig(data.addcolums[2].childs, self.formConfigBase);
      // self.formConfigRe = $omsUtils.initFormConfig(data.addcolums[1].childs, self.formConfigRe);
      if (self.sourceId) {
        // 复制不展示明细导入按钮
        self.jordanTableConfig.isShowImportBtn = false;
        await self.orderCopy();
        await self.getOrderDatail();
        // 复制不展示'收货人信息'
        self.showRe = false;
      }
      this.loading = false;
      setTimeout(() => {
        if (!self.sourceId) {
          // 新增的特殊处理
        } else {
          // 复制的特殊处理
        }
        this.watchChange = true;
      }, 300);
    },
    /* -------------------- 复制 start -------------------- */
    /**
     * 1、要根据路由上的(列表传过来的)复制类型调接口获取初始化数据
     * 2、根据ID调接口初始化订单明细子表
     * 3、复制原因 （0:取消单复制;1:丢件复制;2:错漏发复制;3:赠品复制）
     */
    // 取消单复制/售后复制 - 主表初始化
    async orderCopy() {
      const self = this;
      const IDS = [self.sourceId]; // 后端要数组类型
      self.loading = true;
      const {
        data: { code, data, message },
      } = await self.service.orderCenter.billOcBOrderCopy({
        IDS,
        TYPE: self.copyType,
        COPY_REASON_TYPE: self.copyReason,
      });
      self.loading = false;
      if (code == 0) {
        // console.log(data);
        // const shopId = data.CP_C_SHOP_ID;
        // 需要单独赋值：店铺、发货仓库、物流公司
        // self.querItem('CP_C_SHOP_ID').itemdata.pid = data.CP_C_SHOP_ID;
        // self.querItem('CP_C_SHOP_ID').itemdata.valuedata = data.CP_C_SHOP_NAME;
        // self.formConfigBase.formValue.CP_C_SHOP_ID = self.querItem('CP_C_SHOP_ID').itemdata.pid;
        // self.getWarehouse(shopId); // 发货仓库-options
        // self.formConfigBase.formValue.CP_C_PHY_WAREHOUSE_ID = data.CP_C_PHY_WAREHOUSE_ID;
        // self.formConfigBase.formValue.CP_C_PHY_WAREHOUSE_ID = 235;
        /* self.querItem('CP_C_LOGISTICS_ID').inputList = [
          {
            childs: [
              // { colname: 'CP_C_PLATFORM_ID', refobjid: _this.formConfigBase.formValue.CP_C_PHY_WAREHOUSE_ID, valuedata: data.CP_C_PHY_WAREHOUSE_ENAME }
              { colname: 'CP_C_PLATFORM_ID', refobjid: '142', valuedata: '1' }
            ]
          }
        ]; */
        // self.querItem('CP_C_LOGISTICS_ID').itemdata.pid = data.CP_C_LOGISTICS_ID;
        // self.querItem('CP_C_LOGISTICS_ID').itemdata.valuedata = data.CP_C_LOGISTICS_ENAME;
        self.formConfigBase = $omsUtils.transformForm(
          data,
          self.formConfigBase,
          self.inputArrBase,
          self.drpArrBase,
          "_ENAME"
        );
        self.drpArrBase.forEach((key) => {
          self.formConfigBase.formValue[key] = self.querItem(key).itemdata.pid;
          self.formConfigBase.formValue[
            key.replace("_ID", "_ENAME")
          ] = self.querItem(key).itemdata.valuedata;
        });
        self.formConfigBase.formData[1].inputList = [
          {
            childs: [
              {
                colname: "CP_C_PHY_WAREHOUSE_ID",
                refobjid: this.formConfigBase.formValue.CP_C_SHOP_ID,
                valuedata: this.formConfigBase.formValue.CP_C_SHOP_ENAME,
                name: "店铺",
              },
            ],
          },
        ];
        self.formConfigBase.formData[2].inputList = [
          {
            childs: [
              {
                colname: "CP_C_LOGISTICS_ID",
                refobjid: this.formConfigBase.formValue.CP_C_PHY_WAREHOUSE_ID,
                valuedata: this.formConfigBase.formValue
                  .CP_C_PHY_WAREHOUSE_ENAME,
                name: "发货仓库",
              },
            ],
          },
        ];
        // self.relationShipPlus();

        const inputArrRe = [
          "RECEIVER_NAME",
          "RECEIVER_MOBILE",
          "RECEIVER_PHONE",
          "RECEIVER_ZIP",
          "RECEIVER_ADDRESS",
        ];
        const drpArrRe = [
          "CP_C_REGION_PROVINCE_ID",
          "CP_C_REGION_CITY_ID",
          "CP_C_REGION_AREA_ID",
        ];
        self.formConfigRe = $omsUtils.transformForm(
          data,
          self.formConfigRe,
          inputArrRe,
          drpArrRe,
          "_ENAME"
        );
        self.relationShip();
        drpArrRe.forEach((key) => {
          self.formConfigRe.formValue[key] = self.querItem(
            key,
            "formConfigRe"
          ).itemdata.pid;
          self.formConfigRe.formValue[
            key.replace("_ID", "_ENAME")
          ] = self.querItem(key, "formConfigRe").itemdata.valuedata;
        });
        // 子表初始化（加两列
        if (self.copyType == '2') {
          const exCol = [{
            title: $i18n.t("form_label.b3"), // 商品优惠
            key: "AMT_DISCOUNT",
          },
          {
            title: $i18n.t("form_label.ct"), // 订单优惠
            key: "ORDER_SPLIT_AMT",
          },]
          self.jordanTableConfig.columns = self.jordanTableConfig.columns.concat(exCol);
        }
      } else {
        self.$Message.warning(res.data.message);
        // BtnConfig.back('orderManager', 2627, 'panel_label.orderManager');
      }
      // });
    },
    // 复制 - 订单明细 - 子表初始化
    async getOrderDatail() {
      const self = this;
      const IDS = [self.sourceId]; // 后端要数组类型
      self.loading = true;
      const {
        data: { code, data, message },
      } = await self.service.orderCenter.billOcBOrderItemCopy({
        IDS,
        TYPE: self.copyType,
        COPY_REASON_TYPE: self.copyReason,
      });
      self.loading = false;
      if (code == 0) {
        if (self.copyType == 2) {
          // 售后复制-明细不可编辑
          data.map((it) => (it.disabled = true));
        }
        self.insertOrderDetail(data);
      } else {
        self.$Message.warning(res.data.message);
      }
    },
    /* -------------------- 复制 end -------------------- */
    // 保存
    async save() {
      const self = this;
      /* =========== 保存校验 start =========== */
      if (self.sourceId) {
        self.formConfigRe.formatDate = [];
        self.formConfigRe.formValue = {};
        self.modify.master = Object.assign(
          self.formConfigBase.formValue,
          self.formConfigRe.formValue
        );
      }
      const masterArr = Object.keys(self.modify.master);
      const subInfo = self.jordanTableConfig.data;
      // 未修改，不提示，不操作
      if (!masterArr.length && !subInfo.length) return false;
      const valueArr = [
        "SOURCE_CODE",
        "PAY_TYPE",
        "RECEIVER_NAME",
        "RECEIVER_MOBILE",
        "RECEIVER_ADDRESS",
      ];
      const payType = self.modify.master.PAY_TYPE;
      if (payType == "2") {
        if (valueArr.includes("COLLECT_AMT")) return;
        else valueArr.splice(1, 0, "COLLECT_AMT");
      } else {
        if (valueArr.includes("COLLECT_AMT")) {
          let no = valueArr.indexOf("COLLECT_AMT");
          valueArr.splice(no, 1);
        }
        // self.modify.master.PAY_TYPE = self.formConfigBase.formValue.PAY_TYPE; // 保存入参默认值
      }
      self.modify.master.PAY_TIME = self.formConfigBase.formValue.PAY_TIME; // 保存入参默认值
      const drpArr = [
        "CP_C_SHOP_ID",
        // "CP_C_PHY_WAREHOUSE_ID",
        "CP_C_REGION_PROVINCE_ID",
        "CP_C_REGION_CITY_ID",
      ];
      let formBoth = {};
      formBoth.formData = self.formConfigBase.formData.concat(
        self.formConfigRe.formData
      );
      formBoth.formValue = Object.assign(
        self.formConfigBase.formValue,
        self.formConfigRe.formValue
      );
      const mes = $omsUtils.validatorNotEmpty(
        formBoth,
        valueArr,
        drpArr
      );
      if (mes) {
        this.$message.error(mes);
        return false;
      }
      // 强制保存正则校验失败（红框警告无效）的form时：
      const valiObj = {
        mobile: {
          rule: /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/,
          tip: "",
          msg: "手机号格式不正确！",
        },
        anyCharacter: {
          rule: /^.{0,100}$/,
          tip: "",
          msg: "存在超长录入！",
        },
        sellerMemoVali: {
          rule: /^.{0,100}$/,
          tip: "",
          msg: "卖家备注超长！",
        },
        receiveNameVali: {
          rule: /^.{0,100}$/,
          tip: "",
          msg: "收货人超长！",
        },
        receivePhoneVali: {
          rule: /^.{0,50}$/,
          tip: "",
          msg: "收货人电话超长！",
        },
        receiveZipVali: {
          rule: /^.{0,20}$/,
          tip: "",
          msg: "收货人邮编超长！",
        },
      };
      const formVali = JSON.parse(JSON.stringify(self.modify.master));
      const validator = {
        SELLER_MEMO: "sellerMemoVali",
        RECEIVER_MOBILE: "mobile",
        RECEIVER_NAME: "receiveNameVali",
        RECEIVER_PHONE: "receivePhoneVali",
        RECEIVER_ZIP: "receiveZipVali",
      };
      for (const key in validator) {
        let flag;
        formVali[key] &&
          (flag = valiObj[validator[key]].rule.test(formVali[key]));
        if (formVali[key] && !flag) {
          self.$Message.warning(valiObj[validator[key]].msg);
          return false;
        }
      }
      if (!subInfo.length) {
        this.$message.error("订单明细不能为空！");
        return false;
      }
      /* =========== 保存校验 end =========== */
      let mainTable = JSON.parse(JSON.stringify(self.modify.master));
      mainTable.ID = self.sourceId || "-1";
      mainTable.COPY_REASON_TYPE = self.copyReason || 0;
      if (!self.formConfigBase.formValue.SHIP_AMT) mainTable.SHIP_AMT = "0";
      if (mainTable.PAY_TYPE == 1) {
        // 切换为在线支付保存订单时，代收货款和服务费字段不应该落库
        mainTable.COLLECT_AMT && delete mainTable.COLLECT_AMT;
        mainTable.SERVICE_AMT && delete mainTable.SERVICE_AMT;
      }
      const param = {
        OC_B_ORDER: mainTable,
        OC_B_ORDER_ITEMS: subInfo,
      };
      console.log("param::", param);
      // return false
      this.loading = true;
      const {
        data: { code, data, message },
      } = await self.service.orderCenter.saveBill(param).catch(() => {
        this.loading = false;
      });
      this.loading = false;
      if (code === 0) {
        this.backable = true;
        self.$Message.success(message || "no message！");
        self.modify.master = {};
        self.jordanTableConfig.data = [];
        // 跳转详情
        // $omsUtils.navigateMain(data.ID, 'TabOpen', 'ORDERMANAGEDETAILS', 'panel_label.addReturnOrder')
        if (data) self.ID = data;
        setTimeout(() => {
          this.$comUtils.tabCloseAppoint(this);
          this.$destroy(true);
          this.$store.commit("global/tabOpen", {
            type: "C",
            customizedModuleName: "OC_B_ORDER",
            label: "零售发货单详情",
            customizedModuleId: data,
          });
        }, 200);
      } else {
        // 走框架的报错
      }
    },

    /* --------------------- 工具函数： --------------------- */
    /**
     * 记录主表修改信息方法
     * @ecode 记录字段
     * @obj 修改值暂存在modify下的某个对象中
     */
    modifyData(ecode, obj, type) {
      const self = this;
      if (!self.watchChange) return;
      self.modify[obj][ecode] =
        self[type ? "formConfigRe" : "formConfigBase"].formValue[ecode];
    },
    // 时间戳格式化
    formatDate(time) {
      const date = new Date(time);
      return dateUtil.getFormatDate(date, "yyyy-MM-dd HH:mm:ss");
    },
    keyDown() { },
    // 生成'合计'行
    totalNum() {
      const self = this;
      let amt = 0;
      let qty = 0;
      self.jordanTableConfig.totalData = [];
      self.jordanTableConfig.data.forEach((item) => {
        qty += parseInt(item.QTY || 0);
        amt = Util.accAdd(parseFloat(item.REAL_AMT || 0).toFixed(2), amt);
      });
      setTimeout(() => {
        self.jordanTableConfig.totalData.push({
          selection: `${$i18n.t("other.total")}:`, // 合计
          REAL_AMT: $omsUtils.floatNumber(amt, 2), // 精确到两位小数
          QTY: qty,
        });
      }, 10);
    },
    // 智能匹配地址-获取省市区id填充form表单
    getAddressId(provinceName, cityName, areaName) {
      const self = this;
      return self.service.orderCenter.queryResionByNames({
        CP_C_REGION_PROVINCE_ENAME: provinceName,
        CP_C_REGION_CITY_ENAME: cityName,
        CP_C_REGION_AREA_ENAME: areaName,
      });
    },
    selectRegion(provinceName, cityName, areaName) {
      let params = { provinceName, cityName, areaName };
      return this.service.orderCenter.selectRegion(params);
      /* let { data: { data: { provinceInfo, cityInfo, areaInfo } } } = await this.service.orderCenter.selectRegion(params);
      console.log(provinceInfo, cityInfo, areaInfo);
      this.formConfig.formData[0].itemdata.valuedata = provinceInfo?.name;
      this.formConfig.formData[0].itemdata.pid = provinceInfo?.id;
      this.data.cp_c_region_province_id = provinceInfo?.id;
      this.formConfig.formData[1].itemdata.valuedata = cityInfo?.name;
      this.formConfig.formData[1].itemdata.pid = cityInfo?.id;
      this.data.cp_c_region_city_id = cityInfo?.id;
      this.formConfig.formData[2].itemdata.valuedata = areaInfo?.name;
      this.formConfig.formData[2].itemdata.pid = areaInfo?.id;
      this.data.cp_c_region_area_id = areaInfo?.id;
      if (provinceName.id || cityName.id) {
        console.log('111', provinceName, cityName);
        // 地址解析状态
        this.dataAysis = true;
      } */
    },
    // 根据'店铺'ID动态填充'发货仓库'的options
    async getWarehouse(id) {
      const _this = this;
      const formData = new FormData();
      formData.append("shopId", id * 1);
      const res = await _this.service.orderCenter
        .queryPhyWareHouseList(formData)
        .then((res) => {
          if (res.data.code === 0) {
            _this.querItem("CP_C_PHY_WAREHOUSE_ID").options = res.data.data;
          }
        })
        .catch(() => {
          console.log(res.data.message || "catch!");
        });
    },
    // 省市区联动查询-inputList填充
    relationShip() {
      this.querItem("CP_C_REGION_CITY_ID", "formConfigRe").inputList.push(
        this.querItem("CP_C_REGION_PROVINCE_ID", "formConfigRe").itemdata
      );
      this.querItem("CP_C_REGION_AREA_ID", "formConfigRe").inputList.push(
        this.querItem("CP_C_REGION_CITY_ID", "formConfigRe").itemdata
      );
    },
    // 店铺\仓库\物流联动查询-inputList填充
    relationShipPlus(
      obj = {
        CP_C_PHY_WAREHOUSE_ID: "CP_C_SHOP_ID",
        CP_C_LOGISTICS_ID: "CP_C_PHY_WAREHOUSE_ID",
      }
    ) {
      for (const key in obj) {
        let inputList = [
          {
            childs: [
              {
                colname: key,
                refobjid: this.formConfigBase.formValue[obj[key]],
                valuedata: this.formConfigBase.formValue[
                  obj[key.replace("_ID", "_ENAME")]
                ],
                name: key == "CP_C_PHY_WAREHOUSE_ID" ? "店铺" : "发货仓库",
              },
            ],
          },
        ];
        this.querItem(key).inputList = inputList;
      }
    },
    /**
     * 清空省市区（eg.国家变了之后，清空省市区）
     * @key 变更字段
     * @drpArr 待清空的drp类型
     */
    emptyData(form, key = "", before, val, drpArr = []) {
      const fD = form.formData;
      const fV = form.formValue;
      let flag = false;
      fD.forEach((element) => {
        if (element.colname == key) {
          if (before.master[key] == val.pid) {
            flag = true;
          }
        }
        if (!flag && drpArr.includes(element.colname)) {
          element.itemdata.valuedata = "";
          element.itemdata.pid = "";
          fV[element.colname] = "";
          this.modifyData(element.colname, "master", "r");
        }
      });
      form.formData = fD;
      return form;
    },
    // 根据colname遍历查询formData子项
    querItem(key, type) {
      return this[type ? type : "formConfigBase"].formData.find(
        (item) => item.colname == key
      );
    },
    // 根据'sku编码'ID，查询添加订单明细
    async searchOrderDetail(skuCode) {
      const self = this;
      const IDS = [self.sourceId || -1]; // 后端要数组类型
      const ecodes = skuCode.split(",");
      self.loading = true;
      const {
        data: { code, data, message },
      } = await self.service.orderCenter.getOcBOrderItemBySkuECode({
        IDS,
        ECODES: ecodes,
      });
      self.loading = false;
      if (code == 0 && data) {
        if (data[0].WHETHER_VIRTUAL_PRODUCTION) {
          // 虚拟字段的处理
          self.$Modal.info({
            title: $i18n.t("modalTitle.tips"), // 提示
            // content: `${skuCode}条码为虚拟条码，是否继续添加？`,
            content: data[0].VIRTUAL_GOODS_NOTICE,
            mask: true,
            showCancel: true,
            okText: $i18n.t("btn.increase"), // 添加
            cancelText: $i18n.t("common.cancel"), // 取消
            onOk: () => {
              self.insertOrderDetail(data);
            },
            onCancel: () => {
              self.$emit("closeActionDialog", false);
            },
          });
        } else {
          self.insertOrderDetail(data);
        }
      } else {
        // self.$Message.warning(res.data.message);
      }
    },
    /**
     * 订单明细插入表格的处理
     * 1.判断(SKU编码 && !OOID),OOID存在则是复制的数据
     * 2.true:累加 数量、成交金额
     * 3.false:新增一条
     * 4.使用场景：根据sku编码查询新增(一次只新增一条)，导入新增
     */
    insertOrderDetail(dataArr = []) {
      const self = this;
      const data = dataArr;
      const allDa = self.jordanTableConfig.data;
      data.length && data.map((it) => (it.pryKey = it.OOID || "" + "_" + it.PS_C_SKU_ECODE));
      allDa.length && allDa.map((it) => (it.pryKey = it.OOID || "" + "_" + it.PS_C_SKU_ECODE));
      let pryKeyArr = [];
      if (!allDa.length) {
        // 当前为空，则直接新增
        self.jordanTableConfig.data = data;
        self.totalNum();
        return;
      }
      data.forEach((it) => {
        it.pryKey && (it.pryKey = it.OOID || "" + "_" + it.PS_C_SKU_ECODE);
        allDa.forEach((item) => {
          !item.pryKey && (item.pryKey = item.OOID || "" + "_" + item.PS_C_SKU_ECODE);
          pryKeyArr = $omsUtils.sonList(allDa, "pryKey");
          if (!it.OOID && item.pryKey == it.pryKey) {
            // 1.非复制的且已存在该条明细(已经存在的明细都是刚刚新增的，不是复制带出来的，且，即将新增的是已经存在的，累加)
            item.QTY += it.QTY;
            item.REAL_AMT = $omsUtils.floatNumber(Util.accAdd(item.REAL_AMT, it.REAL_AMT), 2);
          } else if (!it.OOID && !pryKeyArr.includes(it.pryKey)) {
            // 2.非复制的且不存在该条明细
            self.jordanTableConfig.data.push(it);
            // self.jordanTableConfig.addData.push(it);
          } else if (it.OOID) {
            // 3.复制的
            self.jordanTableConfig.data.push(it);
            // self.jordanTableConfig.addData.push(it);
          } else {
            console.log("other!");
          }
        });
      });
      // self.jordanTableConfig.total = res.data.data.total;
      self.totalNum();
    },

    /* ------------------- 子表事件 part start ------------------- */
    onSelectCancel(x) {
      const self = this;
      self.jordanTableConfig.selectData = x;
    },
    onSelect(x) {
      const self = this;
      self.jordanTableConfig.selectData = x;
    },
    onSelectAllCancel(x) {
      const self = this;
      self.jordanTableConfig.selectData = x;
    },
    onSelectAll(x) {
      const self = this;
      self.jordanTableConfig.selectData = x;
    },
    async tableDeleteDetail() {
      const self = this;
      // 本地删
      const allDa = self.jordanTableConfig.data;
      const selDa = self.jordanTableConfig.selectData;
      if (!selDa.length) {
        $omsUtils.msgTips(self, "warning", "a8");
        return;
      }
      // 取差集展示：
      self.jordanTableConfig.data = $omsUtils.getDifferentArr(
        allDa,
        selDa,
        "pryKey"
      );
      this.totalNum();
      // const selectKey = $omsUtils.sonList(selDa, 'pryKey');
      self.jordanTableConfig.selectData = [];
    },
    tableImport() {
      const componentData = {
        isAction: false,
        tableName: "OC_B_ORDER_VIRTUAL_TABLE",
        webname: "import",
        tempApi: "/p/cs/oc/b/oms/v1/ocborder/downLoad",
        okApi: "/p/cs/oc/b/oms/v1/ocborder/importOrderItemSkuInfo",
        returnData: this.importReturnData,
      };
      this.importTable.componentData = componentData;
      this.$children.find((item) => item.name === "importTable").openConfirm();
    },
    importReturnData(data) {
      if (!data) return;
      this.insertOrderDetail(data);
      console.log("importReturnData::", data);
    },
    /* ------------------- 子表事件 part end ------------------- */

    // 返回
    back() {
      const self = this;
      if (self.backable) {
        // 保存成功之后返回
        self.onOk();
        return;
      }
      const masterArr = Object.keys(self.modify.master);
      if (masterArr.length) {
        this.$Modal.info({
          title: $i18n.t("modalTitle.tips"), // 提示
          content: "当前修改未保存，确定返回？",
          className: 'ark-dialog',
          mask: true,
          showCancel: true,
          okText: $i18n.t("common.determine"), // 确定
          cancelText: $i18n.t("common.cancel"), // 取消
          onOk: () => {
            self.onOk();
          },
        });
      } else {
        self.onOk();
      }
    },
    onOk() {
      this.$comUtils.tabCloseAppoint(this);
      this.$destroy(true);
      if (this.$route.query.spuid) {
        // 保留，可能要返回退换货 ？
        this.$store.commit("customize/TabOpen", {
          id: "2307",
          type: "action",
          name: "ORDERMANAGER",
          label: $i18n.t('panel_label.retail_shipping_order'),//"零售发货单",
          back: true,
        });
      } else {
        this.$store.commit("customize/TabOpen", {
          id: "2307",
          type: "action",
          name: "ORDERMANAGER",
          label: $i18n.t('panel_label.retail_shipping_order'),// "零售发货单",
          back: true,
        });
      }
    },

    /* ------------------- DropMultiSelectFilter组件事件 start  ------------------- */
    getItems(options) {
      let pid = [];
      let valuedata = [];
      let rows = [];

      if (options) {
        options.forEach((i) => {
          // 由于默认物流切到自动配送后，可能会选中与当前默认物流公司重复而被前端去重，故改为由后端做去重处理
          // if (!storeIds.includes(Number(i.ID))) {
          rows.push({
            ID: "-1",
            CP_C_LOGISTICS_ID: Number(i.ID),
            CP_C_LOGISTICS_ENAME: i.Label,
          });
          // }
          pid.push(i.ID);
          valuedata.push(i.Label);
        });
      }
      this.jordanTableConfig.addData = rows;
      const obj = pid.length && {
        pid: pid.join(","),
        valuedata: valuedata.join(","),
      };
      this.setFormValue(this.formConfigDetail, "PS_C_SKU", obj || "");
    },
    setFormValue(formConfig, field, data = {}) {
      const { formValue } = formConfig;
      const { pid, valuedata } = data;
      formValue[`${field}_ID`] = pid || "";
      formValue[`${field}_ENAME`] = valuedata || "";
      const obj = this.querItem(field, "formConfigDetail");
      if (!obj) return;
      obj.itemdata.pid = pid || "";
      obj.itemdata.valuedata = valuedata || "";
    },
    /**
     * 获取下拉项
     * @param {Number} val 当前页数 / 输入的关键字
     * @param {Boolean} isFilter 是否是模糊搜索
     */
    async getDropDownOptions(val, isFilter) {
      const query = new FormData();
      const startindex = isFilter ? 0 : (val - 1) * 10;
      const search = {
        isdroplistsearch: true,
        refcolid: 171332,
        fixedcolumns: {},
        startindex,
        range: 10,
      };
      query.append("searchdata", JSON.stringify(search));

      const formdata = new FormData();
      if (isFilter) {
        formdata.append("ak", val.trim());
        formdata.append("colid", 171650);
        formdata.append("fixedcolumns", JSON.stringify({ whereKeys: {} }));
      }
      const {
        data: { code, data, message },
      } = isFilter
          ? await axios.post("/ad-app/p/cs/fuzzyquerybyak", formdata)
          : await axios.post("/ad-app/p/cs/QueryList", query);
      if (code == 0) {
        if (isFilter) {
          const autoData = data.map((item) => ({
            ID: item.ID || item.id,
            value: item.ENAME,
          }));
          this.formConfigDetail.formValue.PS_C_SKU_data.autoData = autoData;
          return;
        }
        const { row, tabth, totalRowCount } = data;
        this.formConfigDetail.formValue.PS_C_SKU_data.data = {
          ...this.formConfigDetail.formValue.PS_C_SKU_data.data,
          row,
          tabth,
        };
        this.formConfigDetail.formValue.PS_C_SKU_data.totalRowCount = totalRowCount;
        this.filterData = { ...this.filterData, row, tabth };
      }
    },
    /* ------------------- DropMultiSelectFilter组件事件 end  ------------------- */
  },
};
</script>

<style lang="less">
@import "~@/css/pages/orderCenter/orderManageAdd/orderManageAdd.less";
</style>

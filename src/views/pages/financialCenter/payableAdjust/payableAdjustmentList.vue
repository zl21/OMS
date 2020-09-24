<template>
  <div class="payableAdjustmentList">
    <div style="margin-top: 8px" class="returnBtn">
      <!-- 按钮 -->
      <jordanButton :btnConfig="btnConfig"></jordanButton>
    </div>
    <div class="returnForm">
      <!-- form表单 -->
      <jordanForm :formConfig="formConfig"></jordanForm>
    </div>
    <div class="salesTable">
      <!-- tab切换 -->
      <jordanLabel
        class="jordanLabel"
        :labelList="labelList"
        :labelDefaultValue="labelDefaultValue"
      ></jordanLabel>
      <!-- 列表组件 -->
      <div class="tableBox">
        <jordan-action-table
          :jordanTableConfig="jordanTableConfig"
          @on-row-dblclick="onRowDblclick"
          @on-select="returnOnSelect"
          @table-import="returnImport"
          @table-export="returnExport"
          @on-select-cancel="returnCancel"
          @on-select-all="returnSelectAll"
          @on-select-all-cancel="returnSelectAllCancel"
          @on-page-change="pageChange"
          @on-page-size-change="pageSizeChange"
        ></jordan-action-table>
      </div>
    </div>
    <!-- 导入 -->
    <jordanModal
      :title="importTable.confirmTitle"
      :titleAlign="importTable.titleAlign"
      :width="importTable.width"
      :scrollable="importTable.scrollable"
      :closable="importTable.closable"
      :draggable="importTable.draggable"
      :mask="importTable.mask"
      :mask-closable="importTable.maskClosable"
      :transfer="importTable.transfer"
      :name="importTable.name"
      :url="importTable.url"
      :keepAlive="importTable.keepAlive"
      :excludeString="importTable.excludeString"
      :componentData="importTable.componentData"
    ></jordanModal>
    <!-- 导出 -->
    <Modal
      v-model="warningModal"
      title="警告"
      width="420"
      @on-ok="warningOk"
      :mask="true"
    >
      <p>当前的操作会执行全量导出，导出时间可能会比较慢！是否继续导出？</p>
    </Modal>
  </div>
</template>

<script>
import jordanButton from "@/jordanComponent/jordanButton";
import jordanForm from "@/jordanComponent/jordanForm";
import jordanLabel from "@/jordanComponent/jordanLabel";
import jordanActionTable from "@/jordanComponent/jordanActionTable";
import jordanModal from "@/jordanComponent/JDialog";
import axios from "axios";
import { debug, debuglog } from "util";
import { isFavoriteMixin } from "@/assets/js/mixins/isFavorite";
import publicMethodsUtil from "@/assets/js/public/publicMethods";
import { customPagingMixins } from "@/assets/js/mixins/customPaging.js";
import { buttonPermissionsMixin } from "@/assets/js/mixins/buttonPermissions";
export default {
  components: {
    jordanButton,
    jordanForm,
    jordanActionTable,
    jordanLabel,
    jordanModal,
  },
  mixins: [isFavoriteMixin, customPagingMixins, buttonPermissionsMixin],
  data() {
    return {
      allTableArr: [],
      selectArr: [],
      // 弹框配置 导入
      importTable: {
        refFuns: "confirmFun",
        confirmTitle: "导入",
        titleAlign: "center", //设置标题是否居中 center left
        width: "600",
        scrollable: false, //是否可以滚动
        closable: true, //是否可以按esc关闭
        draggable: true, //是否可以拖动
        mask: true, //是否显示遮罩层
        maskClosable: true, //是否可以点击叉号关闭
        transfer: true, //是否将弹层放在body内
        name: "importTable", //组件名称
        url: "publicDialog/importTable",
        keepAlive: true,
        excludeString: "importTable", //将name传进去，确认不缓存
        componentData: {},
      },
      warningModal: false, // 警告弹框
      btnConfig: {
        typeAll: "error", //按钮统一风格样式
        buttons: [
          {
            text: "查找", //按钮文本
            disabled: false, //按钮禁用控制
            btnclick: () => {
              this.find();
            }, //按钮点击事件
          },
          {
            text: "新增", //按钮文本
            disabled: false, //按钮禁用控制
            btnclick: () => {
              this.$store.commit("customize/TabHref", {
                id: -1, //id
                type: "action", //类型action
                name: "payableAdjustAdd", //文件名
                label: "赔付单新增", //tab中文名
                query: Object.assign({
                  id: -1, //id
                  tabTitle: "赔付单新增", //tab中文名
                }), //带的参数
              });
            }, //按钮点击事件
          },
          // {
          //   type: "", //按钮类型
          //   text: "导入", //按钮文本
          //   disabled: false, //按钮禁用控制
          //   btnclick: () => {
          //     const _this = this;
          //     _this.importTable.componentData = {tableName: 'AC_F_PAYABLE_ADJUSTMENT'};
          //     _this.$children.find(item => item.name === "importTable") .openConfirm();
          //   } //按钮点击事件
          // },
          {
            text: "导出", //按钮文本
            disabled: false, //按钮禁用控制
            btnclick: () => {
              this.exportClick();
            }, //按钮点击事件
          },
          {
            text: "作废", //按钮文本
            disabled: false, //按钮禁用控制
            btnclick: () => {
              this.invalid();
            }, //按钮点击事件
          },
          {
            text: "财审", //按钮文本
            disabled: false, //按钮禁用控制
            btnclick: () => {
              this.fiAudit();
            }, //按钮点击事件
          },
          {
            text: "客审", //按钮文本
            disabled: false, //按钮禁用控制
            btnclick: () => {
              this.custAudit();
            }, //按钮点击事件
          },
          {
            text: "反客审", //按钮文本
            disabled: false, //按钮禁用控制
            btnclick: () => {
              this.unCustAudit();
            }, //按钮点击事件
          },
          {
            icon: "iconfont iconbj_col", //按钮图标
            size: "small", //按钮大小
            name: "收藏",
            disabled: false, //按钮禁用控制
            btnclick: () => {
              let _this = this;
              _this.setFavorite();
            }, //按钮点击事件
          },
        ],
      }, // 按钮数据
      formConfig: {
        formData: [
          {
            style: "input", //文本录入
            label: "单据编号",
            value: "BILL_NO",
            width: "6",
          },
          {
            style: "input", //文本录入
            label: "平台单号",
            value: "TID",
            width: "6",
          },
          {
            style: "select", //下拉框类型
            label: "单据状态", //下拉框前的值
            width: "6", //所占宽度宽度
            value: "BILL_STATUS", //输入框的值
            multiple: true,
            options: [
              {
                label: "未审核",
                value: "1",
              },
              {
                label: "已客审",
                value: "2",
              },
              {
                label: "已财审",
                value: "3",
              },
              {
                label: "已作废",
                value: "4",
              },
            ],
          },
          {
            style: "input",
            label: "来源单据编号",
            value: "ORDER_NO",
            width: "6",
          },
          {
            style: "popInput", //输入框弹框单多选
            width: "6",
            itemdata: {
              col: 1,
              colid: 169964,
              colname: "CP_C_PHY_WAREHOUSE_ID", //当前字段的名称
              datelimit: "all",
              display: "text", //显示什么类型，例如xml表示弹窗多选加导入功能，mrp表示下拉多选
              fkdisplay: "drp", //外键关联类型
              fkdesc: "实体仓",
              inputname: "ENAME", //这个是做中文类型的模糊查询字段，例如ENAME
              isfk: true, //是否有fk键
              isnotnull: false, //是否必填
              isuppercase: false, //是否转大写
              length: 65535, //最大长度是多少
              name: "实体仓名称", //input前面显示的lable值
              readonly: false, //是否可编辑，对应input   readonly属性
              reftable: "CP_C_PHY_WAREHOUSE", //对应的表
              reftableid: 23451, //对应的表ID
              row: 1,
              statsize: -1,
              type: "STRING", //这个是后台用的
              valuedata: "", //这个是选择的值
              pid: "",
            },
            oneObj: (val) => {
              this.formConfig.formValue.CP_C_PHY_WAREHOUSE_ID = val.pid;
              this.formConfig.formValue.CP_C_PHY_WAREHOUSE_ENAME =
                val.valuedata;
            },
          },
          {
            style: "popInput", //输入框弹框单多选
            width: "6",
            itemdata: {
              col: 1,
              colid: 169965,
              colname: "CP_C_LOGISTICS_ID", //当前字段的名称
              datelimit: "all",
              display: "text", //显示什么类型，例如xml表示弹窗多选加导入功能，mrp表示下拉多选
              fkdisplay: "drp", //外键关联类型
              fkdesc: "快递公司",
              inputname: "ENAME", //这个是做中文类型的模糊查询字段，例如ENAME
              isfk: true, //是否有fk键
              isnotnull: false, //是否必填
              isuppercase: false, //是否转大写
              length: 65535, //最大长度是多少
              name: "快递公司名称", //input前面显示的lable值
              readonly: false, //是否可编辑，对应input   readonly属性
              reftable: "CP_C_LOGISTICS", //对应的表
              row: 1,
              statsize: -1,
              type: "STRING", //这个是后台用的
              valuedata: "", //这个是选择的值
              pid: "",
            },
            oneObj: (val) => {
              this.formConfig.formValue.CP_C_LOGISTICS_ID = val.pid;
              this.formConfig.formValue.CP_C_LOGISTICS_ENAME = val.valuedata;
            },
          },
          {
            style: "popInput", //输入框弹框单多选
            width: "6",
            itemdata: {
              col: 1,
              colid: 170011,
              colname: "PS_C_SKU_ID", //当前字段的名称
              datelimit: "all",
              display: "text", //显示什么类型，例如xml表示弹窗多选加导入功能，mrp表示下拉多选
              fkdisplay: "drp", //外键关联类型
              fkdesc: "商品条码",
              inputname: "ECODE", //这个是做中文类型的模糊查询字段，例如ENAME
              isfk: true, //是否有fk键
              isnotnull: false, //是否必填
              isuppercase: false, //是否转大写
              length: 65535, //最大长度是多少
              name: "商品条码", //input前面显示的lable值
              readonly: false, //是否可编辑，对应input   readonly属性
              reftable: "PS_C_SKU", //对应的表
              row: 1,
              statsize: -1,
              type: "STRING", //这个是后台用的
              valuedata: "", //这个是选择的值
              pid: "",
            },
            oneObj: (val) => {
              this.formConfig.formValue.PS_C_SKU_ID = val.pid;
              this.formConfig.formValue.PS_C_SKU_ECODE = val.valuedata;
            },
          },
          {
            style: "input", //文本录入
            label: "国标码",
            value: "GBCODE",
            width: "6",
          },
          {
            style: "select", //下拉框类型
            label: "调整类型", //下拉框前的值
            width: "6", //所占宽度宽度
            value: "ADJUST_TYPE", //输入框的值
            multiple: true,
            options: [
              //下拉框选项值
            ],
          },
          {
            style: "select", //下拉框类型
            label: "单据类型", //下拉框前的值
            width: "6", //所占宽度宽度
            value: "BILL_TYPE", //输入框的值
            multiple: true,
            options: [
              //下拉框选项值
            ],
          },
          {
            style: "select", //下拉框类型
            label: "渠道类型", //下拉框前的值
            width: "6", //所占宽度宽度
            value: "RESERVE_BIGINT01", //输入框的值
            multiple: true,
            options: [
              //下拉框选项值
            ],
          },
          {
            style: "date",
            type: "datetimerange",
            label: "创建日期",
            width: "6",
            value: "CREATIONDATE",
            format: "yyyy-MM-dd HH:mm:ss", //格式参照burgeonui
            placeholder: "",
            clearable: "", //是否显示清空按钮,默认为true   false
          },
          {
            style: "date",
            type: "datetimerange",
            label: "客审日期",
            width: "6",
            value: "GUEST_TRIAL_TIME",
            format: "yyyy-MM-dd HH:mm:ss", //格式参照burgeonui
            placeholder: "",
            clearable: "", //是否显示清空按钮,默认为true   false
          },
          {
            style: "date",
            type: "datetimerange",
            label: "财审日期",
            width: "6",
            value: "FINANCIAL_TRIAL_TIME",
            format: "yyyy-MM-dd HH:mm:ss", //格式参照burgeonui
            placeholder: "",
            clearable: "", //是否显示清空按钮,默认为true   false
          },
        ],
        formValue: {},
        flodClick: () => {
          setTimeout(() => {
            this.setTableHeight();
          }, 10);
        },
      }, // form表单
      labelList: [
        {
          label: "全部",
          value: "1",
          isShow: true,
        },
      ], // tab切换
      labelDefaultValue: "1",
      jordanTableConfig: {
        columns: [
          {
            title: "单据状态",
            key: "BILL_STATUS_NAME",
          },
          {
            title: "单据编号",
            key: "BILL_NO",
          },
          {
            title: "平台单号",
            key: "TID",
          },
          {
            title: "单据类型",
            key: "BILL_TYPE_NAME",
          },
          {
            title: "调整类型",
            key: "ADJUST_TYPE_NAME",
          },
          {
            title: "店铺名称",
            key: "CP_C_SHOP_TITLE",
          },
          {
            title: "实体仓",
            key: "CP_C_PHY_WAREHOUSE_ENAME",
          },
          {
            title: "赔付快递公司",
            key: "CP_C_LOGISTICS_ENAME",
          },
          {
            title: "快递单号",
            key: "LOGISTICS_NO",
          },
          {
            title: "总应付金额",
            key: "PAYABLE_PRICE",
          },
          {
            title: "支付方式",
            key: "PAY_TYPE_NAME",
          },
          {
            title: "备注",
            key: "REMARK",
          },
          {
            title: "来源单据编号",
            key: "ORDER_NO",
          },
          {
            title: "顾客电话",
            key: "CUSTOMER_TEL",
          },
          {
            title: "顾客姓名",
            key: "CUSTOMER_NAME",
          },
          {
            title: "支付宝号",
            key: "ALIPAY_ACCOUNT",
          },
          {
            title: "会员昵称",
            key: "CUSTOMER_NICK",
          },
          {
            title: "付款时间",
            key: "PAY_TIME",
          },
          {
            title: "创建时间",
            key: "CREATIONDATE",
          },
          {
            title: "创建人",
            key: "OWNERENAME",
          },
          {
            title: "修改时间",
            key: "MODIFIEDDATE",
          },
          {
            title: "修改人",
            key: "MODIFIERENAME",
          },
          {
            title: "客审时间",
            key: "GUEST_TRIAL_TIME",
          },
          {
            title: "客审人",
            key: "GUEST_TRIAL_ENAME",
          },
          {
            title: "财审时间",
            key: "FINANCIAL_TRIAL_TIME",
          },
          {
            title: "财审人",
            key: "FINANCIAL_TRIAL_ENAME",
          },
          {
            title: "作废时间",
            key: "DEL_TIME",
          },
          {
            title: "作废人",
            key: "DELENAME",
          },
          {
            title: "可用",
            key: "ISACTIVE",
          },
        ], //表头
        pageShow: true, //控制分页是否显示
        loading: false,
        // isShowDeleteDetailBtn: true, //控制是否显示删除明细
        // isShowImportBtn: true, //控制是否显示导入
        // isShowExportBtn: true, //控制是否显示导出
        searchInputShow: false, // 控制搜索框是否显示
        indexColumn: true, // 是否显示序号
        isShowSelection: true, // 是否显示checkedbox
        width: "", // 表格宽度
        height: 440, // 表格高度
        border: true, //是否显示纵向边框
        current: 1, //当前页数
        total: 0, //设置总条数
        pageSizeOpts: [20, 50, 80, 100], // 每页条数切换的配置
        pageSize: 50, // 每页条数
        data: [], //数据配置
      }, // 列表数据
      returnSelectData: [], // 列表选中数据
      isShowFromLoading: false,
      statusTab: "", // 单据类型
    };
  },
  activated() {
    // 获取默认数据
    this.jordanTableConfig.current = 1;
    this.getList();
  },
  created() {
    let self = this;
    self.getSelectData();
  },
  mounted() {
    this.$nextTick(() => {
      this.getPermissions("btnConfig", "payableAdjustmentList");
    });
    const _this = this;
    window.addEventListener("keydown", (e) => {
      let key = e.keyCode;
      if (key === 13 && _this.warningModal) {
        _this.warningOk();
      } else if (key === 27) {
        _this.warningModal = false;
      }
    });
    this.getList();
    this.setTableHeight();
  },
  methods: {
    //填充下拉选项框
    async getSelectData() {
      let self = this;
      let arrBillType = await this.getColOption(
        "AC_F_PAYABLE_ADJUSTMENT",
        "基本信息",
        "BILL_TYPE"
      );
      let arrAdjustType = await this.getColOption(
        "AC_F_PAYABLE_ADJUSTMENT",
        "基本信息",
        "ADJUST_TYPE"
      );
      let arrChannel = await this.getColOption(
        "AC_F_PAYABLE_ADJUSTMENT",
        "基本信息",
        "RESERVE_BIGINT01"
      );
      self.formConfig.formData.map((item) => {
        if (item.value === "BILL_TYPE") {
          item.options = arrBillType;
        } else if (item.value === "ADJUST_TYPE") {
          item.options = arrAdjustType;
        } else if (item.value === "RESERVE_BIGINT01") {
          item.options = arrChannel;
        }
      });
    },
    async getColOption(tableName, parentColName, childColName) {
      let fromdata = new FormData();
      fromdata.append("table", tableName);
      fromdata.append("objid", -1);
      return new Promise((resolve) => {
        let optionData = [];
        axios({
          url: "/p/cs/getObject",
          method: "post",
          data: fromdata,
        }).then((res) => {
          let selectData = res.data.data.addcolums;
          selectData.forEach((item) => {
            if (item.parentdesc === parentColName) {
              let childItem = item.childs;
              childItem.forEach((item) => {
                if (item.colname === childColName) {
                  optionData = item.combobox.map((subItem) => {
                    return {
                      label: subItem.limitdesc,
                      value: subItem.limitval,
                    };
                  });
                }
              });
            }
          });
          resolve(optionData);
        });
      });
    },
    // 查找
    find() {
      this.jordanTableConfig.current = 1;
      this.getList();
    },
    invalid() {
      let self = this;
      let ids = [];
      this.returnSelectData.map((item) => {
        ids.push(item.ID);
      });
      let param = {
        objids: ids,
      };
      let fromdata = new FormData();
      fromdata.append("param", JSON.stringify(param));
      axios({
        url: "/p/cs/voidPayableAdjustment",
        method: "post",
        data: fromdata,
      }).then(function (res) {
        if (res.data.data.code === 0) {
          self.$Message.success(res.data.data.message);
          self.getList();
        } else {
          self.$Message.error(res.data.data.message);
        }
      });
    },
    fiAudit() {
      let self = this;
      let fromdata = self.generateAuditFromdata();
      axios({
        url: "/p/cs/fiAuditPayableAdjustment",
        method: "post",
        data: fromdata,
      }).then(function (res) {
        if (res.data.data.code === 0) {
          self.$Message.success(res.data.data.message);
          self.getList();
        } else {
          self.$Message.error(res.data.data.message);
        }
      });
    },
    custAudit() {
      let self = this;
      let fromdata = self.generateAuditFromdata();
      axios({
        url: "/p/cs/auditPayableAdjustment",
        method: "post",
        data: fromdata,
      }).then(function (res) {
        if (res.data.data.code === 0) {
          self.$Message.success(res.data.data.message);
          self.getList();
        } else {
          self.$Message.error(res.data.data.message);
        }
      });
    },
    unCustAudit() {
      let self = this;
      let fromdata = self.generateAuditFromdata();
      axios({
        url: "/p/cs/cancelAuditPayableAdjustment",
        method: "post",
        data: fromdata,
      }).then((res) => {
        if (res.data.data.code === 0) {
          self.$Message.success("反客审成功!");
          self.getList();
        } else {
          self.$Message.error(res.data.data.message);
        }
      });
    },
    generateAuditFromdata() {
      let ids = [];
      this.returnSelectData.map((item) => {
        ids.push(item.ID);
      });
      let param = {
        ids: ids,
      };
      let fromdata = new FormData();
      fromdata.append("param", JSON.stringify(param));
      return fromdata;
    },
    // 获取列表数据
    getList() {
      const _this = this;
      if (_this.jordanTableConfig.loading) {
        return;
      }
      _this.jordanTableConfig.data = [];
      _this.jordanTableConfig.total = 0;
      _this.jordanTableConfig.loading = true;

      let mainData = _this.formConfig.formValue;
      let creationdateStart = "";
      let creationdateEnd = "";
      let guestTrialTimeStart = "";
      let guestTrialTimeEnd = "";
      let financialTrialTimeStart = "";
      let financialTrialTimeEnd = "";
      if (mainData.CREATIONDATE && mainData.CREATIONDATE.length > 0) {
        creationdateStart = mainData.CREATIONDATE[0];
        creationdateEnd = mainData.CREATIONDATE[1];
      }
      if (mainData.GUEST_TRIAL_TIME && mainData.GUEST_TRIAL_TIME.length > 0) {
        guestTrialTimeStart = mainData.GUEST_TRIAL_TIME[0];
        guestTrialTimeEnd = mainData.GUEST_TRIAL_TIME[1];
      }
      if (
        mainData.FINANCIAL_TRIAL_TIME &&
        mainData.FINANCIAL_TRIAL_TIME.length > 0
      ) {
        financialTrialTimeStart = mainData.FINANCIAL_TRIAL_TIME[0];
        financialTrialTimeEnd = mainData.FINANCIAL_TRIAL_TIME[1];
      }

      let whereInfoForm = {
        // start: _this.jordanTableConfig.current,
        // count: _this.jordanTableConfig.pageSize,
        CREATIONDATE_START: creationdateStart,
        CREATIONDATE_END: creationdateEnd,
        GUEST_TRIAL_TIME_START: guestTrialTimeStart,
        GUEST_TRIAL_TIME_END: guestTrialTimeEnd,
        FINANCIAL_TRIAL_TIME_START: financialTrialTimeStart,
        FINANCIAL_TRIAL_TIME_END: financialTrialTimeEnd,
        ADJUST_TYPE: mainData.ADJUST_TYPE,
        BILL_TYPE: mainData.BILL_TYPE,
        PS_C_SKU_ID: mainData.PS_C_SKU_ID,
        PS_C_SKU_ECODE: mainData.PS_C_SKU_ECODE,
        CP_C_LOGISTICS_ID: mainData.CP_C_LOGISTICS_ID,
        CP_C_LOGISTICS_ENAME: mainData.CP_C_LOGISTICS_ENAME,
        CP_C_PHY_WAREHOUSE_ID: mainData.CP_C_PHY_WAREHOUSE_ID,
        CP_C_PHY_WAREHOUSE_ENAME: mainData.CP_C_PHY_WAREHOUSE_ENAME,
        BILL_NO: mainData.BILL_NO,
        TID: mainData.TID,
        BILL_STATUS: mainData.BILL_STATUS,
        ORDER_NO: mainData.ORDER_NO,
        RESERVE_BIGINT01: mainData.RESERVE_BIGINT01,
      };

      let param = {
        whereInfo: whereInfoForm,
        pageNum: _this.jordanTableConfig.current,
        pageSize: _this.jordanTableConfig.pageSize,
      };
      // let newParam = Object.assign(param, _this.formConfig.formValue);
      let fromdata = new FormData();
      fromdata.append("param", JSON.stringify(param));
      axios({
        url: "/p/cs/getPayableAdjustmentList",
        method: "post",
        data: fromdata,
      }).then((res) => {
        _this.jordanTableConfig.loading = false;
        _this.returnSelectData = [];
        if (res.data.code === 0 && res.data.data.payableAdjustmentList.length) {
          //Table表单赋值
          _this.allTableArr = res.data.data.payableAdjustmentList.map(
            (item) => {
              //过滤不需要展示的模糊搜索项
              return {
                ID: item.ID,
                BILL_STATUS: item.BILL_STATUS,
                BILL_STATUS_NAME: item.BILL_STATUS_NAME,
                BILL_NO: item.BILL_NO,
                TID: item.TID,
                BILL_TYPE: item.BILL_TYPE,
                BILL_TYPE_NAME: item.BILL_TYPE_NAME,
                ADJUST_TYPE_NAME: item.ADJUST_TYPE_NAME,
                CP_C_SHOP_TITLE: item.CP_C_SHOP_TITLE,
                CP_C_PHY_WAREHOUSE_ENAME: item.CP_C_PHY_WAREHOUSE_ENAME,
                CP_C_LOGISTICS_ENAME: item.CP_C_LOGISTICS_ENAME,
                LOGISTICS_NO: item.LOGISTICS_NO,
                PAYABLE_PRICE: item.PAYABLE_PRICE,
                PAY_TYPE: item.PAY_TYPE,
                PAY_TYPE_NAME: item.PAY_TYPE_NAME,
                REMARK: item.REMARK,
                ORDER_NO: item.ORDER_NO,
                CUSTOMER_TEL: item.CUSTOMER_TEL,
                CUSTOMER_NAME: item.CUSTOMER_NAME,
                ALIPAY_ACCOUNT: item.ALIPAY_ACCOUNT,
                CUSTOMER_NICK: item.CUSTOMER_NICK,
                OWNERENAME: item.OWNERENAME,
                FINANCIAL_TRIAL_ENAME: item.FINANCIAL_TRIAL_ENAME,
                MODIFIERENAME: item.MODIFIERENAME,
                GUEST_TRIAL_ENAME: item.GUEST_TRIAL_ENAME,
                DELENAME: item.DELENAME,
                ISACTIVE: item.ISACTIVE === "Y" ? "是" : "否",
                CREATIONDATE: item.CREATIONDATE
                  ? publicMethodsUtil.DatesTime(item.CREATIONDATE)
                  : "",
                PAY_TIME: item.PAY_TIME
                  ? publicMethodsUtil.DatesTime(item.PAY_TIME)
                  : "",
                MODIFIEDDATE: item.MODIFIEDDATE
                  ? publicMethodsUtil.DatesTime(item.MODIFIEDDATE)
                  : "",
                GUEST_TRIAL_TIME: item.GUEST_TRIAL_TIME
                  ? publicMethodsUtil.DatesTime(item.GUEST_TRIAL_TIME)
                  : "",
                FINANCIAL_TRIAL_TIME: item.FINANCIAL_TRIAL_TIME
                  ? publicMethodsUtil.DatesTime(item.FINANCIAL_TRIAL_TIME)
                  : "",
                DEL_TIME: item.DEL_TIME
                  ? publicMethodsUtil.DatesTime(item.DEL_TIME)
                  : "",
              };
            }
          );
          // _this.customPagingFun(
          //   filterItemData,
          //   _this.jordanTableConfig.pageSize,
          //   _this.jordanTableConfig,
          //   "jordanTableConfig"
          // );
          _this.jordanTableConfig.total = res.data.data.page.totalSize;
          _this.jordanTableConfig.data = _this.allTableArr;
        } else {
          _this.jordanTableConfig.data = [];
          _this.jordanTableConfig.total = 0;
        }
      });
    },
    oneObjs(e) {},
    // 双击时触发
    onRowDblclick(row, index) {
      this.$store.commit("customize/TabHref", {
        id: row.ID, //单据id
        type: "action", //类型action
        name: "payableAdjustAdd", //文件名
        label: "赔付单详情", //tab中文名
        query: Object.assign({
          id: row.ID, //单据id
          tabTitle: "赔付详情", //tab中文名
        }), //带的参数
      });
    },
    // 列表勾选
    returnOnSelect(e) {
      this.returnSelectData = e;
    },
    // 取消勾选
    returnCancel(e) {
      this.returnSelectData = e;
    },
    // 列表全选
    returnSelectAll(e) {
      this.returnSelectData = e;
    },
    // 取消全选
    returnSelectAllCancel(e) {
      this.returnSelectData = e;
    },
    // 分页change 事件
    pageChange(val) {
      this.selectArr = [];
      this.jordanTableConfig.current = val;
      this.getList();
    },
    // 切换分页条数
    pageSizeChange(val) {
      this.selectArr = [];
      this.jordanTableConfig.pageSize = val;
    },
    // 导入
    returnExport() {},
    // 导出
    returnImport() {},
    //设置表格高度
    setTableHeight() {
      let _this = this;
      const contentHeight = document.getElementById("content").clientHeight;
      let returnHeight = 25;
      returnHeight += document.getElementsByClassName("returnBtn")[0]
        .clientHeight;
      returnHeight += document.getElementsByClassName("returnForm")[0]
        .clientHeight;
      let tableHeight = contentHeight - returnHeight;
      _this.jordanTableConfig.height = tableHeight - 130;
    },
    // 导出
    exportClick() {
      const _this = this;
      if (_this.returnSelectData.length) {
        let ids = [];
        for (let i = 0; i < _this.returnSelectData.length; i++) {
          ids.push(_this.returnSelectData[i].ID);
        }
        let idList = { idList: ids };
        axios({
          url: "/p/cs/exportPayableAdjustment",
          method: "post",
          cancelToken: true,
          data: idList,
        }).then((res) => {
          if (res.data.code === 0 && res.data.data !== null) {
            let mes = res.data.message || "导出成功！";
            _this.$Message.success(mes);
            _this.downloadUrlFile(res.data.data);
            // return (window.location = res.data.data);
          } else {
            let err = res.data.message || "失败！";
            _this.$Message.error(err);
          }
        });
      } else {
        if (_this.jordanTableConfig.data.length === 0) {
          return _this.$Message.error("列表没有数据,无法导出!");
        }
        _this.warningModal = true;
      }
    },
    // 导出
    downloadUrlFile(src) {
      var download_file = {};
      if (typeof download_file.iframe == "undefined") {
        var iframe = document.createElement("iframe");
        download_file.iframe = iframe;
        document.body.appendChild(download_file.iframe);
      }
      download_file.iframe.src = src;
      download_file.iframe.style.display = "none";
    },
    // 警告框确认
    warningOk() {
      const _this = this;
      let mainData = _this.formConfig.formValue;
      let creationdateStart = "";
      let creationdateEnd = "";
      let guestTrialTimeStart = "";
      let guestTrialTimeEnd = "";
      let financialTrialTimeStart = "";
      let financialTrialTimeEnd = "";
      if (mainData.CREATIONDATE && mainData.CREATIONDATE.length > 0) {
        creationdateStart = mainData.CREATIONDATE[0];
        creationdateEnd = mainData.CREATIONDATE[1];
      }
      if (mainData.GUEST_TRIAL_TIME && mainData.GUEST_TRIAL_TIME.length > 0) {
        guestTrialTimeStart = mainData.GUEST_TRIAL_TIME[0];
        guestTrialTimeEnd = mainData.GUEST_TRIAL_TIME[1];
      }
      if (
        mainData.FINANCIAL_TRIAL_TIME &&
        mainData.FINANCIAL_TRIAL_TIME.length > 0
      ) {
        financialTrialTimeStart = mainData.FINANCIAL_TRIAL_TIME[0];
        financialTrialTimeEnd = mainData.FINANCIAL_TRIAL_TIME[1];
      }
      let param = {
        start: _this.jordanTableConfig.current,
        count: 999999,
        CREATIONDATE_START: creationdateStart,
        CREATIONDATE_END: creationdateEnd,
        GUEST_TRIAL_TIME_START: guestTrialTimeStart,
        GUEST_TRIAL_TIME_END: guestTrialTimeEnd,
        FINANCIAL_TRIAL_TIME_START: financialTrialTimeStart,
        FINANCIAL_TRIAL_TIME_END: financialTrialTimeEnd,
        ADJUST_TYPE: mainData.ADJUST_TYPE,
        BILL_TYPE: mainData.BILL_TYPE,
        PS_C_SKU_ID: mainData.PS_C_SKU_ID,
        PS_C_SKU_ECODE: mainData.PS_C_SKU_ECODE,
        CP_C_LOGISTICS_ID: mainData.CP_C_LOGISTICS_ID,
        CP_C_LOGISTICS_ENAME: mainData.CP_C_LOGISTICS_ENAME,
        CP_C_PHY_WAREHOUSE_ID: mainData.CP_C_PHY_WAREHOUSE_ID,
        CP_C_PHY_WAREHOUSE_ENAME: mainData.CP_C_PHY_WAREHOUSE_ENAME,
        BILL_NO: mainData.BILL_NO,
        TID: mainData.TID,
        BILL_STATUS: mainData.BILL_STATUS,
        ORDER_NO: mainData.ORDER_NO,
        RESERVE_BIGINT01: mainData.RESERVE_BIGINT01,
      };
      axios({
        url: "/p/cs/exportPayableAdjustment",
        method: "post",
        cancelToken: true,
        data: param,
      }).then((res) => {
        if (res.data.code === 0 && res.data.data !== null) {
          let mes = res.data.message || "导出成功！";
          _this.$Message.success(mes);
          _this.downloadUrlFile(res.data.data);
          // return (window.location = res.data.data);
        } else {
          let err = res.data.message || "失败！";
          _this.$Message.error(err);
        }
      });
    },
  },
  destroyed() {
    window.removeEventListener("keydown", this, false);
  },
};
</script>

<style lang="less">
.payableAdjustmentList {
  .salesTable {
    .jordanLabel {
      margin-top: 8px;
    }
    .tableBox {
      border: 1px solid #dcdee2;
      border-top: none;
      padding: 10px 10px 10px 10px;
    }
  }
  .jordan-table-box .page-box {
    margin-top: 0;
  }
  .returnForm {
    position: relative;
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
  .burgeon-btn > .burgeon-icon {
    margin-left: 3px;
  }
}
.tableFooter {
  padding: 10px 10px 10px 0px;
  .tableFooter_border {
    padding: 2px 4px;
    border: 1px solid red;
  }
}
</style>

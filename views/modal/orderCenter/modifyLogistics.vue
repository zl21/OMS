<template>
  <div class="jordanModal customized-modal">
    <loading :loading="loading" />
    <!-- 修改物流 -->
    <!-- <businessForm style="margin-top:10px;" :formConfig="formConfig"></businessForm> -->
    <div class="Modal-Form">
      <!-- <label for>物流公司:</label> -->
      <!-- <label for>{{ vmI18n.t("form_label.logisticsCompany") }}:</label>
      <DropDownSelectFilter
        style="width: 285px"
        :single="true"
        :data="foreignKeyLink"
        :z-index="zIndex"
        :total-row-count="totalRowCount"
        :page-size="pageSize"
        :show-colname-key="'show'"
        :data-empty-message="dataEmptyMessage"
        :columns="columns"
        :auto-data="AutoData"
        :disabled="logisticsFlag"
        @on-page-change="changePage"
        @on-fkrp-selected="onFkrpSelected"
      /> -->
      <businessForm :form-config="formConfig" />
    </div>
    <!-- <label for>物流单号:</label> -->
    <!-- <div v-if="type == 'EXPRESSCODE'" class="jordanModal_box">
      <label for>{{ vmI18n.t("form_label.logisticsOrder_No") }}:</label>
      <Input
        v-model="expressCode"
        style="width: 285px"
        :disabled="expressCodeFlag"
      />
    </div> -->
    <businessButton :btn-config="btnConfig" class="modal-footer" />
  </div>
</template>
<script>
// import modifyLogistics from "@/js/modal/orderCenter/modifyLogistics";
// export default modifyLogistics;
// 策略平台-仓库物流优先级方案(新增/详情) - 修改物流
import businessButton from "professionalComponents/businessButton";
import businessForm from "professionalComponents/businessForm";
import businessActionTable from "professionalComponents/businessActionTable";
import loading from "professionalComponents/loading";

export default {
  components: {
    loading,
    businessButton,
    businessForm,
    businessActionTable,
  },
  props: {
    componentData: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {
      vmI18n: window.vmI18n,
      formConfig: {
        formData: [
          {
            version: "1.4",
            style: "popInput",
            width: "18",
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
              refcolval: {
                fixcolumn: "CP_C_PHY_WAREHOUSE_ID",
                expre: "equal",
                srccol: "CP_C_LOGISTICS_ID",
              },
              colid: 171280,
              colname: "CP_C_LOGISTICS_ID",
              fkdisplay: "drp",
              isfk: true, // 是否有fk键
              isnotnull: false, // 是否必填
              isuppercase: false, // 是否转大写
              name: "物流公司",
              readonly: false, // 是否可编辑，对应input   readonly属性
              valuedata: "",
              oneObj: (val) => {
                const _this = this;
                _this.formConfig.formValue.CP_C_LOGISTICS_ID = val.pid;
                _this.formConfig.formValue.CP_C_LOGISTICS_ENAME = val.valuedata;
              },
            },
            oneObj: (val) => {
              const _this = this;
              if (!val.pid) return;
              _this.formConfig.formValue.CP_C_LOGISTICS_ID = val.pid;
              _this.formConfig.formValue.CP_C_LOGISTICS_ENAME = val.valuedata;
            },
          },
        ],
        formValue: {
          CP_C_LOGISTICS_ID: "", // 物流公司，drp
          CP_C_LOGISTICS_ENAME: "",
          CP_C_PHY_WAREHOUSE_ID: "", // 发货仓库，Y
          CP_C_PHY_WAREHOUSE_ENAME: "",
        },
      },
      jordanTableConfig: {
        columns: [
          {
            key: "ENAME",
            title: window.vmI18n.t("form_label.logisticsCompany"), // '物流公司'
          },
          {
            key: "ECODE",
            title: window.vmI18n.t("form_label.logisticsNo"), // '物流编号'
          },
        ],
        data: [], // 数据配置
        pageShow: false, // 控制分页是否显示
        loading: false,
        height: 338, // 表格高度
        indexColumn: true, // 是否显示序号
        isShowSelection: true, // 是否显示checkedbox
        border: true, // 是否显示纵向边框
      },
      loading: false,
      btnConfig: {
        typeAll: "default", // 按钮统一风格样式
        btnsite: "right", // 按钮位置 (right , center , left)
        buttons: [
          {
            text: window.vmI18n.t("common.cancel"), // 取消
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              this.$parent.$parent.closeConfirm();
            }, // 按钮点击事件
          },
          {
            text: window.vmI18n.t("common.determine"), // 确定
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              const _this = this;
              _this.determine();
            }, // 按钮点击事件
          },
        ],
      }, // 确定取消按钮
      selectData: [],
      selectAllList: [],
      total: 0,
      cancelModel: false,
      name: "",
      delId: "",
      removeLoading: false,
    };
  },
  mounted() {
    // this.getLogistics();
    const _this = this;
    if (!_this.componentData.CP_C_PHY_WAREHOUSE_ID) {
      _this.$Message.warning("no CP_C_PHY_WAREHOUSE_ID ！(无仓库ID！)");
      _this.querItem("CP_C_LOGISTICS_ID").itemdata.readonly = true;
      _this.btnConfig.buttons[1].disabled = true;
      return;
    }
    _this.querItem("CP_C_LOGISTICS_ID").inputList = [
      {
        childs: [
          {
            colname: "CP_C_LOGISTICS_ID",
            refobjid: _this.componentData.CP_C_PHY_WAREHOUSE_ID || "",
            valuedata: _this.componentData.CP_C_PHY_WAREHOUSE_ENAME || "_",
          },
        ],
      },
    ];
  },
  methods: {
    querItem(key, type) {
      return this[type ? type : "formConfig"].formData.find(
        (item) => item.colname == key
      );
    },
    // 获取物流公司数据
    async getLogistics(name, index = "") {
      const _this = this;
      _this.removeLoading = true;
      const param = {
        objid: _this.componentData.id,
        logisticsInfo: name === undefined ? "" : name,
      };
      const res = await _this.service.common.getWarehouseLogisticsInfo(param);
      _this.removeLoading = false;
      if (res.data.code === 0) {
        _this.jordanTableConfig.data = res.data.data.cpLogisticsList;
        if (!index) {
          _this.selectData = res.data.data.warehouseLogisticsItems;
          _this.total = _this.selectData.length;
        }
      }
    },
    // 确定
    async determine() {
      const _this = this;
      // const fromdata = new FormData();
      // const param = {
      //   fixcolumn: {
      //     ST_C_WAREHOUSE_LOGISTICS: {},
      //     ST_C_WAREHOUSE_LOGISTICS_ITEM: _this.selectData,
      //     ST_C_WAREHOUSE_LOGISTICS_RANK_RESULT: [],
      //   },
      //   objid: _this.componentData.id,
      // };
      // fromdata.append("param", JSON.stringify(param));
      // const res = await this.service.strategyPlatform.saveWarehouseLogistics(
      //   _this.componentData
      // );
      if (!_this.formConfig.formValue.CP_C_LOGISTICS_ID) {
        _this.$Message.warning("请选择物流公司！");
        return false;
      }
      _this.loading = true;
      const res = await this.service.orderCenter.updateLogistics({
        IDS: _this.componentData.IDS,
        CP_C_LOGISTICS_ID: +_this.formConfig.formValue.CP_C_LOGISTICS_ID,
      });
      if (res.data.code === 0) {
        // _this.$parent.$parent.$parent.getTreeData();
        // _this.$parent.$parent.$parent.provinceSynchronous();
        _this.$parent.$parent.closeConfirm();
        _this.$Message.success(res.data.message);
        _this.$parent.$parent.$parent.query();
      } else if (code == 1 && data.data) {
        let tabData = data.data.map((row, index) => {
          row.INDEX = ++index;
          row.BILL_NO = row.objidno;
          row.RESULT_MSG = row.message;
          return row;
        });
        this.$OMS2.omsUtils.tipShow(
          "confirm",
          self,
          data,
          message,
          function (h) {
            return h("Table", {
              props: {
                columns: [
                  {
                    title: "序号",
                    key: "INDEX",
                  },
                  {
                    title: "ID",
                    key: "objid",
                  },
                  {
                    title: "单据编号",
                    key: "BILL_NO",
                  },
                  {
                    title: "失败原因",
                    key: "RESULT_MSG",
                  },
                ],
                data: tabData,
              },
            });
          }
        );
      } else {
        // 走框架报错
        // const err = res.data.message || window.vmI18n.t("modalTips.z3");
        // _this.$Message.error(err);
      }
      _this.loading = false;
    },
    // 同步查询
    synchronous() {
      const arr = [];
      if (this.selectAllList.length) {
        this.selectAllList.forEach((item) => {
          arr.push({
            CP_C_LOGISTICS_ID: item.ID,
            CP_C_LOGISTICS_ECODE: item.ECODE,
            CP_C_LOGISTICS_ENAME: item.ENAME,
            ID: -1,
          });
        });
      }
      if (!this.selectData.length) this.selectData = arr;
      else if (arr.length) {
        arr.forEach((item) => {
          if (
            !this.selectData.some(
              (e) => e.CP_C_LOGISTICS_ECODE === item.CP_C_LOGISTICS_ECODE
            )
          )
            this.selectData.push(item);
        });
      }
      this.total = this.selectData.length;
    },
    // 删除
    DeleteSelect(ecode, id) {
      if (id !== -1) {
        this.cancelModel = true;
        this.delId = id;
      } else {
        for (let i = 0, list = this.selectData.length; i < list; i++) {
          if (this.selectData[i].CP_C_LOGISTICS_ECODE === ecode) {
            this.selectData.splice(i, 1);
            this.total = this.selectData.length;
            this.$Message.success(window.vmI18n.t("modalTips.ay"));
            break;
          }
        }
      }
    },
    DeleteAll() {
      if (!this.selectData.length) return;
      this.delId = "";
      this.cancelModel = true;
    },
    // 删除确认
    async okClick() {
      this.removeLoading = true;
      const ids = [];
      if (this.delId) {
        ids[0] = this.delId;
      } else {
        this.selectData.forEach((item) => ids.push(item.ID));
      }
      const fromdata = new FormData();
      const param = {
        objid: this.componentData.id,
        tabitem: {
          ST_C_WAREHOUSE_LOGISTICS_ITEM: ids,
        },
      };
      fromdata.append("param", JSON.stringify(param));
      const res = await this.service.common.delWarehouseLogistics(fromdata);
      if (res.data.data.code === 0) {
        const ess = res.data.data.message || window.vmI18n.t("modalTips.ay");
        this.getLogistics();
        this.$parent.$parent.$parent.refresh();
        this.$Message.success(ess);
      } else {
        const err = res.data.data.message || window.vmI18n.t("modalTips.z3");
        this.$Message.error(err);
      }
      this.total = this.selectData.length;
    },
    cancalModal() {
      this.cancelModel = false;
    },
    // 双击
    onRowDblclick(row) {
      const arr = {
        CP_C_LOGISTICS_ID: row.ID,
        CP_C_LOGISTICS_ECODE: row.ECODE,
        CP_C_LOGISTICS_ENAME: row.ENAME,
        ID: -1,
      };
      if (!this.selectData.some((e) => e.CP_C_LOGISTICS_ECODE === row.ECODE))
        this.selectData.push(arr);
      this.total = this.selectData.length;
    },
    OnSelect(e) {
      this.selectAllList = e;
    },
    Cancel(e) {
      this.selectAllList = e;
    },
    SelectAll(e) {
      this.selectAllList = e;
    },
    SelectAllCancel(e) {
      this.selectAllList = e;
    },
  },
};
</script>

<style scoped lang='less'>
@import "~@/css/modal/orderCenter/modifyLogistics.less";
.jordanModal {
  min-height: 100px;
}
</style>

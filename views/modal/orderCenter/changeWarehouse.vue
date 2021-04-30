<template>
  <div class="semiCustomModal customized-modal">
    <loading :loading="loading" />
    <!-- 修改仓库 -->
    <div v-show="isShowFromLoading" class="order_warehouse_loading">
      <Spin />
    </div>
    <div class="Modal-Form">
      <businessForm :form-config="formConfig" />
      <!-- 修改仓库-->
      <!-- <div class="Modal-Form-Item">
        <label for>{{ vmI18n.t("btn.modifyWarehouse") }}:</label>
        <DropDownSelectFilter
          :single="true"
          :data="foreignKeyLink"
          :z-index="zIndex"
          :total-row-count="totalRowCount"
          :page-size="pageSize"
          :show-colname-key="'show'"
          :data-empty-message="dataEmptyMessage"
          :columns="columns"
          :auto-data="AutoData"
          :hidecolumns="hidecolumns"
          @on-page-change="changePage"
          @on-fkrp-selected="onFkrpSelected"
          @on-input-value-change="inputValueChange"
        />
      </div> -->
      <!-- 修改仓库-->
      <!-- <div class="Modal-Form-Item">
        <label for>{{ vmI18n.t('form_label.changeWarehouse_reasons') }}:</label>
        <Select 
          v-model="updateRemark" 
        >
          <Option
            v-for="item in updateRemarkOptions"
            :key="item.value"
            :value="item.value"
          >
            {{ item.label }}
          </Option>
        </Select>
      </div> -->
    </div>
    <businessButton :btn-config="btnConfig" class="modal-footer" />
  </div>
</template>
<script>
// import changeWarehouse from "@/js/modal/orderCenter/changeWarehouse";

// export default changeWarehouse;
import businessForm from "professionalComponents/businessForm";
import businessButton from "professionalComponents/businessButton";
import businessActionTable from "professionalComponents/businessActionTable";
import loading from "professionalComponents/loading";

import listeningToKeydownMixin from "@/assets/js/mixins/listeningToKeydown.js";

export default {
  mixins: [listeningToKeydownMixin],
  components: {
    loading,
    businessForm,
    businessButton,
    businessActionTable,
  },
  props: {
    componentData: {
      type: Object,
      default: {},
    },
  },
  computed: {},
  data() {
    return {
      vmI18n: window.vmI18n,
      isShowFromLoading: false, // 加载
      zIndex: 2500,
      totalRowCount: 0,
      pageSize: 10,
      pageNum: 1,
      dataEmptyMessage: "数据加载中...", // 无数据的提示
      columns: ["ename"], // 展现的组
      AutoData: [],
      hidecolumns: ["id"],
      foreignKeyLink: {},
      //
      pid: "",
      updateRemark: "",
      updateRemarkOptions: [
        {
          label: window.vmI18n.t("other.originalWarehouseOutOfStock_change"), // '原仓缺货改仓',
          value: window.vmI18n.t("other.originalWarehouseOutOfStock_change"),
        },
        {
          label: window.vmI18n.t("other.sysWrongJudgment_change"), // '系统错判改仓',
          value: window.vmI18n.t("other.sysWrongJudgment_change"),
        },
        {
          label: window.vmI18n.t("other.sysWrongJudgment_change"), // '新增仓库改仓',
          value: window.vmI18n.t("other.newWarehouse_change"),
        },
      ],
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
              this.determine(false);
            }, // 按钮点击事件
          },
        ],
      },
      loading: false,
      formConfig: {
        formData: [
          {
            version: "1.4",
            style: "popInput",
            width: "18",
            colname: "CP_C_PHY_WAREHOUSE_ID",
            inputList: [
              {
                colname: "CP_C_SHOP_ID",
                refobjid: "46",
                valuedata: "_",
                name: "店铺",
              },
            ],
            itemdata: {
              colid: 171251,
              colname: "CP_C_PHY_WAREHOUSE_ID",
              name: "修改仓库",
              valuedata: "",
              pid: "",
              fkdisplay: "drp",
              isfk: true,
              isnotnull: true,
              readonly: false,
              refcolval: {
                fixcolumn: "CP_C_SHOP_ID", // 根据什么查，根据什么字段过滤，根据'店铺'过滤仓库
                expre: "equal",
                srccol: "CP_C_PHY_WAREHOUSE_ID", // 要查什么
              },
            },
            oneObj: (val) => {
              const _this = this;
              if (!val.pid) return;
              _this.formConfig.formValue.CP_C_PHY_WAREHOUSE_ID = val.pid;
              _this.formConfig.formValue.CP_C_PHY_WAREHOUSE_ENAME =
                val.valuedata;
            },
          },
        ],
        formValue: {
          CP_C_PHY_WAREHOUSE_ID: "", // 发货仓库，Y
          CP_C_PHY_WAREHOUSE_ENAME: "",
        },
      },
    };
  },
  beforeDestroy() {
    document.removeEventListener("keydown", this.onKeyDown);
  },
  mounted() {
    const _this = this;
    console.log("this.componentData::", _this.componentData);
    if (!_this.componentData.CP_C_PHY_WAREHOUSE_ID) {
      _this.$Message.warning("no CP_C_SHOP_ID ！");
    }
    _this.querItem("CP_C_PHY_WAREHOUSE_ID").inputList = [
      {
        childs: [
          {
            colname: "CP_C_PHY_WAREHOUSE_ID",
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
    onKeyDown(e) {
      if (e.keyCode == 27) {
        this.$parent.$parent.closeConfirm();
        this.$parent.$parent.$parent.publicBouncedIndex = {
          name: "testModal",
        };
      }
      if (e.keyCode == 13) {
        this.determine(false);
      }
    },
    async determine(isOutOfStockFlag) {
      const self = this;
      if (!self.formConfig.formValue.CP_C_PHY_WAREHOUSE_ID) {
        self.$Message.warning({
          content: window.vmI18n.t("modalTips.zi"), // 请选择仓库
          duration: 5,
          top: 80,
        });
        return false;
      }
      self.loading = true;
      // const fromdata = new FormData();
      // fromdata.append("ids", self.componentData.ids);
      // fromdata.append("warehouseId", self.pid);
      // fromdata.append("isOutOfStockFlag ", isOutOfStockFlag);
      // fromdata.append("updateRemark", self.updateRemark);
      const {
        data: { data, code, message },
      } = await self.service.orderCenter.updateWarehouse({
        IDS: self.componentData.IDS,
        CP_C_LOGISTICS_ID: +self.formConfig.formValue.CP_C_PHY_WAREHOUSE_ID,
      });
      self.isShowFromLoading = false;
      if (code === 0) {
        if (self.$route.params.customizedModuleId == 2307) {
          self.$Message.success(message);
          self.$parent.$parent.closeConfirm();
          self.$parent.$parent.$parent.selection = [];
          self.$parent.$parent.$parent.query();
        } else {
          self.$Message.success(message);
          self.$parent.$parent.closeConfirm();
          self.$parent.$parent.$parent.load();
        }
      } else if (code == 1 && data.data) {
        // 多条错误信息render表格，一条错误信息code为-1走框架报错
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
      }
      self.loading = false;
    },
    async getListData() {
      const self = this;
      const fromdata = {
        flag: 2,
        id: self.componentData.CP_C_SHOP_ID,
        num: self.pageNum,
        size: 10,
        inputValue: "",
      };
      const {
        data: { data, count },
      } = await self.service.orderCenter.getQueryList(fromdata);
      if (data) {
        data.forEach((element) => {
          element.ecode = {
            val: element.ecode,
          };
          element.ename = {
            val: element.ename,
          };
          element.ID = {
            val: element.id,
          };
        });
        self.foreignKeyLink = {
          start: 0,
          tabth: [
            {
              colname: "ID",
              name: "ID",
              show: false,
            },
            {
              colname: "ename",
              // name: "发货仓库名称",
              name: window.vmI18n.t("table_label.deliveryWarehouse_name"),
              show: true,
            },
            {
              colname: "ecode",
              // name: "发货仓库编码",
              name: window.vmI18n.t("table_label.deliveryWarehouse_code"),
              show: false,
            },
          ],
          row: data,
        };
        self.totalRowCount = count;
      }
    },
    // 输入框改变产生的
    async inputValueChange(value) {
      const self = this;
      const fromdata = {
        flag: 2,
        id: self.componentData.CP_C_SHOP_ID,
        num: self.pageNum,
        size: 10,
        inputValue: value,
      };
      const {
        data: { data, code, count },
      } = await self.service.orderCenter.getQueryList(fromdata);
      if (code === 0) {
        self.AutoData = data.map((element) => ({
          value: element.ename,
          id: element.id,
        }));
        self.totalRowCount = count;
      } else {
        self.AutoData = [];
        self.shopStore.totalRowCount = 0;
      }
      self.foreignKeyLink = {
        start: 0,
        tabth: [
          {
            colname: "ID",
            name: "ID",
            show: false,
          },
          {
            colname: "ename",
            // name: "发货仓库名称",
            name: window.vmI18n.t("table_label.deliveryWarehouse_name"),
            show: true,
          },
          {
            colname: "ecode",
            // name: "发货仓库编码",
            name: window.vmI18n.t("table_label.deliveryWarehouse_code"),
            show: false,
          },
        ],
        row: data,
      };
      self.pageNum = 1;
    },
    // 分页请求数据
    changePage(value) {
      this.pageNum = value;
      this.getListData();
    },
    onFkrpSelected(val) {
      console.log(val);
      this.pid = val[0].ID;
    },
  },
};
</script>
<style scoped lang='less'>
@import "~@/css/modal/orderCenter/changeWarehouse.less";
.semiCustomModal {
  min-height: 100px;
}
</style>

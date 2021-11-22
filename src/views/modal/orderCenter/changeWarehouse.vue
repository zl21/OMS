<template>
  <div class="customized-modal" v-loading="loading">
    <OmsForm :form-config="formConfig" />
    <OmsButton :btn-config="btnConfig" class="modal-footer" />
  </div>
</template>

<script>
import listeningToKeydownMixin from "@/assets/js/mixins/listeningToKeydown.js";

const changeWarehouse = {
  mixins: [listeningToKeydownMixin],
  components: {},
  props: {
    componentData: {
      type: Object,
      default: {},
    },
  },
  computed: {},
  data() {
    return {
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
          label: $i18n.t("other.originalWarehouseOutOfStock_change"), // '原仓缺货改仓',
          value: $i18n.t("other.originalWarehouseOutOfStock_change"),
        },
        {
          label: $i18n.t("other.sysWrongJudgment_change"), // '系统错判改仓',
          value: $i18n.t("other.sysWrongJudgment_change"),
        },
        {
          label: $i18n.t("other.sysWrongJudgment_change"), // '新增仓库改仓',
          value: $i18n.t("other.newWarehouse_change"),
        },
      ],
      btnConfig: {
        typeAll: "default", // 按钮统一风格样式
        btnsite: "right", // 按钮位置 (right , center , left)
        buttons: [
          {
            text: $i18n.t("common.cancel"), // 取消
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              this.$parent.$parent.closeConfirm();
            }, // 按钮点击事件
          },
          {
            text: $i18n.t("common.determine"), // 确定
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
            width: "24",
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
              serviceId: 'r3-cp',
              colid: 171251,
              colname: "CP_C_PHY_WAREHOUSE_ID",
              name: "仓库名称",
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
              // if (!val.pid) return;
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
    this.$nextTick(() => {
      const _this = this;
      console.log("this.componentData::", _this.componentData);
      if (!_this.componentData.CP_C_SHOP_ID) {
        _this.$Message.warning("no CP_C_SHOP_ID ！");
      }
      _this.querItem("CP_C_PHY_WAREHOUSE_ID").inputList = [
        {
          childs: [
            {
              colname: "CP_C_PHY_WAREHOUSE_ID",
              refobjid: _this.componentData.CP_C_SHOP_ID || "",
              valuedata: _this.componentData.CP_C_SHOP_ENAME || "_",
            },
          ],
        },
      ];
    });
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
          content: $i18n.t("modalTips.zi"), // 请选择仓库
          duration: 5,
          top: 80,
        });
        return false;
      }
      self.loading = true;
      let param = JSON.parse(JSON.stringify(self.componentData));
      param.CP_C_PHY_WAREHOUSE_ID = +self.formConfig.formValue.CP_C_PHY_WAREHOUSE_ID;
      const {
        data: { data, code, message },
      } = await self.service.orderCenter.updateWarehouse(param);
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
      } else if (code == 1 && data) {
        self.$parent.$parent.closeConfirm();
        let tabData = data.map((row, index) => {
          row.INDEX = ++index;
          row.BILL_NO = row.objno;
          row.RESULT_MSG = row.message;
          return row;
        });
        $utils.tipShow(
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
                    title: $i18n.t('form_label.e0'), // 失败原因
                    key: "RESULT_MSG",
                  },
                ],
                data: tabData,
              },
            });
          }
        );
      } else {
        self.$parent.$parent.closeConfirm();
        // 走框架的报错
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
              name: $i18n.t("table_label.deliveryWarehouse_name"),
              show: true,
            },
            {
              colname: "ecode",
              // name: "发货仓库编码",
              name: $i18n.t("table_label.deliveryWarehouse_code"),
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
            name: $i18n.t("table_label.deliveryWarehouse_name"),
            show: true,
          },
          {
            colname: "ecode",
            // name: "发货仓库编码",
            name: $i18n.t("table_label.deliveryWarehouse_code"),
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
export default changeWarehouse
</script>

<style scoped lang='less'>
.semiCustomModal {
  min-height: 100px;
}
</style>

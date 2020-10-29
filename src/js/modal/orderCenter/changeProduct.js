import axios from "axios";
import reForm from "professionalComponents/businessForm";

export default {
  components: {
    reForm,
  },
  data() {
    return {
      vmI18n: window.vmI18n,
      pro: "",
      replace_pro: "",
      radioValue: "2",
      formConfig: {
        formValue: {
          searchValue: "",
          psCProEcode: "",
        },
        formData: [
          {
            label: "商品SKU",
            style: "dimSearch",
            width: "12",
            value: "searchValue",
            columns: ["ECODE"],
            AuotData: [], //匹配的选项
            dimChange: async (val) => {
              //模糊查询的方法
              let _this = this;
              _this.formConfig.formValue.searchValue = val.trim();
              let query = {
                isBlur: "Y", //N为精确匹配
                psCSku: {
                  ECODE: val.trim(),
                },
              };
              const res = await _this.service.common.skuQuery(query);
              if (res.status === 200) {
                let data = res.data.data.data;
                let dimList = _this.formConfig.formData;
                let arr;
                data.map((item) => {
                  //删除不需要展示的模糊搜索项
                  delete item.GBCODE;
                  delete item.IS_GIFT;
                  delete item.IS_GROUP;
                  delete item.PRICELIST;
                  // delete item.PS_C_PRO_ECODE;
                  delete item.PS_C_PRO_ID;
                  delete item.colorId;
                  delete item.colorName;
                  delete item.sizeId;
                  delete item.sizeName;
                  delete item.skuId;
                });
                dimList.map((item) => {
                  if (item.label === "商品SKU") {
                    item.AuotData = data;
                    //调用查询提取方法,传给条码,默认数量为一,调用状态为0的保存接口
                  }
                });
              }
            },
            dimEnter: () => {
              this.search("one");
            },
            dimSelect: (val) => {
              this.formConfig.formValue.searchValue = val.label;
            },
          },
          {
            label: "商品款号",
            style: "dimSearch",
            width: "12",
            value: "psCProEcode",
            columns: ["ECODE"],
            AuotData: [], //匹配的选项
            dimChange: async (val) => {
              //模糊查询的方法
              let _this = this;
              _this.formConfig.psCProEcode = val.trim();
              let fromdata = new FormData();
              let params = {
                GLOBAL: val.trim(),
                PAGENUM: 1,
                PAGESIZE: 10,
                CONDITION: {},
                TABLENAME: "PS_C_PRO",
              };
              fromdata.append("param", JSON.stringify(params));
              const res = await this.service.common.screenresult(fromdata);
              if (res.data.code === 0) {
                let dimList = _this.formConfig.formData;

                dimList.map((item) => {
                  if (item.label === "商品款号") {
                    item.AuotData = res.data.data.list;
                  }
                });
              }
            },
            dimEnter: () => {
              this.search("one");
            },
            dimSelect: (val) => {
              this.formConfig.formValue.psCProEcode = val.label;
              // this.psCProEcode = val.label;
            },
          },
        ],
      },
      replaceFormConfig: {
        formValue: {
          searchValue: "",
          psCProEcode: "",
        },
        formData: [
          {
            label: "商品SKU",
            style: "dimSearch",
            width: "12",
            value: "searchValue",
            columns: ["ECODE"],
            AuotData: [], //匹配的选项
            dimChange: async (val) => {
              //模糊查询的方法
              let _this = this;
              _this.replaceFormConfig.formValue.searchValue = val.trim();
              const query = {
                isBlur: "Y", //N为精确匹配
                psCSku: {
                  ECODE: val.trim(),
                },
              };
              const res = await this.service.common.skuQuery(query);
              if (res.status === 200) {
                let data = res.data.data.data;
                let dimList = _this.replaceFormConfig.formData;
                let arr;
                data.map((item) => {
                  //删除不需要展示的模糊搜索项
                  delete item.GBCODE;
                  delete item.IS_GIFT;
                  delete item.IS_GROUP;
                  delete item.PRICELIST;
                  // delete item.PS_C_PRO_ECODE;
                  delete item.PS_C_PRO_ID;
                  delete item.colorId;
                  delete item.colorName;
                  delete item.sizeId;
                  delete item.sizeName;
                  delete item.skuId;
                });
                dimList.map((item) => {
                  if (item.label === "商品SKU") {
                    item.AuotData = data;
                    //调用查询提取方法,传给条码,默认数量为一,调用状态为0的保存接口
                  }
                });
              }
            },
            dimEnter: () => {
              this.search("two");
            },
            dimSelect: (val) => {
              this.replaceFormConfig.formValue.searchValue = val.label;
            },
          },
          {
            label: "商品款号",
            style: "dimSearch",
            width: "12",
            value: "psCProEcode",
            columns: ["ECODE"],
            AuotData: [], //匹配的选项
            dimChange: async (val) => {
              //模糊查询的方法
              let _this = this;
              _this.replaceFormConfig.psCProEcode = val.trim();
              let fromdata = new FormData();
              let params = {
                GLOBAL: val.trim(),
                PAGENUM: 1,
                PAGESIZE: 10,
                CONDITION: {},
                TABLENAME: "PS_C_PRO",
              };
              fromdata.append("param", JSON.stringify(params));
              const res = await this.service.common.screenresult(fromdata);
              if (res.data.code === 0) {
                let dimList = _this.replaceFormConfig.formData;

                dimList.map((item) => {
                  if (item.label === "商品款号") {
                    item.AuotData = res.data.data.list;
                  }
                });
              }
            },
            dimEnter: () => {
              this.search("two");
            },
            dimSelect: (val) => {
              this.replaceFormConfig.formValue.psCProEcode = val.label;
              // this.psCProEcode = val.label;
            },
          },
        ],
      },
      // searchValue: "",
      // proEcode: "",
      proName: "",
      // replace_searchValue: "",
      // replace_proEcode: "",
      replace_proName: "",
      replaceTableLoad: false,
      tableLoad: false,
      columns: [
        {
          // title: "商品SKU",
          title: vmI18n.t("table_label.commoditySKU"),
          key: "ECODE",
        },
        {
          // title: "商品名称",
          title: vmI18n.t("table_label.productName"),
          key: "PS_C_PRO_ENAME",
        },
        {
          // title: "商品SKU名称",
          title: vmI18n.t("table_label.productSKUname"),
          key: "SPEC",
        },
      ],
      data: [],
      replace_data: [],
      onRowClickReplaceData: {},
      onRowClickData: {},
      onRowClickText: "",
      onRowClickReplaceText: "",
    };
  },
  props: {
    componentData: {
      type: Object,
    },
  },
  mounted() {
    // console.log("componentData=>",this.componentData);
  },
  methods: {
    radioChange(value) {
      console.log(value);
    },
    async search(value) {
      //sku查询
      let self = this;
      // console.log(value) "two"
      let loadName = value === "one" ? "tableLoad" : "replaceTableLoad";
      this[loadName] = true;
      let query = {
        isBlur: "N",
        psCSku: {
          ECODE:
            value == "one"
              ? self.formConfig.formValue.searchValue.trim()
              : self.replaceFormConfig.formValue.searchValue.trim(),
          psCProEcode:
            value == "one"
              ? self.formConfig.formValue.psCProEcode.trim()
              : self.replaceFormConfig.formValue.psCProEcode.trim(),
          psCProEname:
            value == "one"
              ? self.proName.trim()
              : self.replace_proName.trim(),
        },
      };
      try {
        const res = await _this.service.common.skuQuery(query);
        if (res.data.code == 0) {
          res.data.data.data.map((item) => {
            item.IS_GIFT == "0" ? "否" : "是";
          });
          if (value == "one") {
            self.data = res.data.data.data;
            self.onRowClickData = self.data[0];
            self.onRowClickText = self.data[0].ECODE;
          } else {
            self.replace_data = res.data.data.data;
            self.onRowClickReplaceData = self.replace_data[0];
            self.onRowClickReplaceText = self.replace_data[0].ECODE;
          }
        } else {
          // this.$Message.warning("sku查询失败!");
          this.$Message.warning(vmI18n.t("modalTips.zt"));
        }
        this[loadName] = false;
      } catch (e) {
        this[loadName] = false;
      }
    },
    confirm() {
      let self = this;
      if (JSON.stringify(self.onRowClickData) == "{}") {
        // self.$Message.warning("替换前商品sku不能为空!");
        self.$Message.warning(vmI18n.t("modalTips.yf"));
        return;
      }
      if (JSON.stringify(self.onRowClickReplaceData) == "{}") {
        // self.$Message.warning("替换后商品sku码不能为空!");
        self.$Message.warning(vmI18n.t("modalTips.yg"));
        return;
      }
      if (self.onRowClickData.ECODE == self.onRowClickReplaceData.ECODE) {
        // self.$Message.warning("替换商品与被替换商品不能相同!");
        self.$Message.warning(vmI18n.t("modalTips.yh"));
        return;
      }
      let result = {};
      let needParam = {
        IS_GIFT: self.onRowClickReplaceData.IS_GIFT == "是" ? "0" : "1",
        PS_C_PRO_ECODE: self.onRowClickReplaceData.PS_C_PRO_ECODE,
        PS_C_PRO_ENAME: self.onRowClickReplaceData.PS_C_PRO_ENAME,
        PRICELIST: self.onRowClickReplaceData.PRICELIST,
        IS_GROUP: self.onRowClickReplaceData.IS_GROUP,
        SKU_ECODE: self.onRowClickReplaceData.ECODE,
        PS_C_PRO_ID: self.onRowClickReplaceData.PS_C_PRO_ID,
      };
      if (self.componentData.a_2.length == 0) {
        // self.$Message.warning("请勾选订单数据!");
        self.$Message.warning(vmI18n.t("modalTips.zu"));
        return;
      }
      result.ids = self.componentData.a_2;
      result["changeGoodsSku"] = self.onRowClickData.ECODE;
      result["sku_code"] = needParam.SKU_ECODE;
      result["type"] = 1;
      console.log(this.componentData.a_1, result);
      axios({
        url: "/api/cs/oc/oms/v1/bathChangeGoods",
        method: "post",
        data: result,
      }).then((res) => {
        console.log(res);
        if (res.data.code == 0) {
          self.$Message.error(res.data.message);
          this.$parent.$parent.closeConfirm();
        } else {
          self.$Modal.confirm({
            title: res.data.message,
            width: 500,
            render: (h) => {
              return h("Table", {
                props: {
                  columns: [
                    {
                      // title: "提示信息",
                      title: vmI18n.t("modalTitle.tips"),
                      key: "message",
                    },
                  ],
                  data: res.data.data,
                },
              });
            },
          });
        }
      });
    },
    onRowClickReplace(row) {
      this.onRowClickReplaceData = row;
      this.onRowClickReplaceText = row.ECODE;
    },
    onRowClick(row) {
      this.onRowClickData = row;
      this.onRowClickText = row.ECODE;
    },
  },
};

<template>
  <!-- 添加商品 -->
  <div class="pushProduce">
    <div class="i_head">
      <!-- <div style="float:left;marginTop:8px;">
        <RadioGroup v-model="radioValue" @on-change="radioChange">
          <Radio label="2">
            <span>按页面已勾选订单</span>
          </Radio>
          <Radio label="1">
            <span>按筛选条件选中订单</span>
          </Radio>
        </RadioGroup>
      </div>-->
      <div style="display: flex">
        <div class="skuBox">
          <re-form :formConfig="formConfig" />
        </div>
        <div class="number-box">
          <label>数量:</label>
          <Input v-model="qty" style="width: 80px" @on-enter="search" />
        </div>
        <div class="search-button">
          <Button type="error" @click="search">搜索</Button>
        </div>
      </div>
    </div>
    <div class="i_body">
      <Table
        :columns="columns"
        :loading="tableLoading"
        :data="data"
        @on-row-click="onRowClick"
        :highlight-row="true"
      ></Table>
    </div>
    <div class="dialog-footer">
      <Button
        style="marginleft: 8px"
        type="error"
        :loading="loading"
        @click="confirm"
        >确定</Button
      >
      <Button
        type="error"
        ghost
        @click="
          () => {
            this.$parent.$parent.closeConfirm();
          }
        "
        >取消</Button
      >
    </div>
  </div>
</template>

<script>
import axios from "axios";
import reForm from "professionalComponents/businessForm";
export default {
  components: {
    reForm,
  },
  data() {
    return {
      loading: false,
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
            dimChange: (val) => {
              //模糊查询的方法
              let _this = this;
              _this.formConfig.formValue.searchValue = val.trim();
              axios({
                url: "/p/cs/skuQuery",
                method: "post",
                data: {
                  isBlur: "Y", //N为精确匹配
                  psCSku: {
                    ECODE: val.trim(),
                  },
                },
              }).then((res) => {
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
              });
            },
            dimEnter: () => {
              this.search();
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
            dimChange: (val) => {
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
              axios({
                url: "/p/cs/screenresult",
                method: "post",
                data: fromdata,
              }).then((res) => {
                if (res.data.code === 0) {
                  let dimList = _this.formConfig.formData;

                  dimList.map((item) => {
                    if (item.label === "商品款号") {
                      item.AuotData = res.data.data.list;
                    }
                  });
                }
              });
            },
            dimEnter: () => {
              this.search();
            },
            dimSelect: (val) => {
              this.formConfig.formValue.psCProEcode = val.label;
              // this.psCProEcode = val.label;
            },
          },
        ],
      },
      rowClickData: {},
      radioValue: "2",
      // searchValue: '',
      psCProEcode: "",
      // psCProEname: '',
      qty: "1",
      tableLoading: false,
      columns: [
        {
          title: "商品SKU",
          key: "ECODE",
        },
        {
          title: "商品名称",
          key: "PS_C_PRO_ENAME",
        },
        {
          title: "商品SKU名称",
          key: "SPEC",
        },
        {
          title: "数量",
          key: "qty",
        },
      ],
      data: [],
    };
  },
  props: {
    componentData: {
      type: Object,
    },
  },
  mounted() {
    console.log(this.componentData);
  },
  methods: {
    radioChange(value) {
      console.log(value);
    },
    search(value) {
      //sku查询
      let self = this;
      // if (!self.searchValue) {
      //   self.$Message.warning('请输入商品SKU');
      //   return;
      // }
      self.tableLoading = true;
      axios({
        url: "/p/cs/skuQuery",
        method: "post",
        data: {
          isBlur: "N",
          psCSku: {
            ECODE: self.formConfig.formValue.searchValue.trim(),
            psCProEcode: self.formConfig.formValue.psCProEcode.trim() /* , psCProEname: self.psCProEname.trim() */,
          },
        },
      })
        .then((res) => {
          console.log(res);
          if (res.data.code == 0) {
            if (res.data.data.data.length == 0) {
              this.$Message.warning("查询数据为空!");
              elf.data = [];
              self.tableLoading = false;
              return;
            }
            let resData = res.data.data.data;
            resData.forEach((val) => {
              val.qty = this.qty;
            });
            // res.data.data.data[0]['qty'] = this.qty;
            self.data = resData;
          } else {
            this.$Message.warning("sku查询失败!");
          }
          self.tableLoading = false;
        })
        .catch(() => {
          self.tableLoading = false;
        });
    },
    confirm() {
      let self = this;
      let url = "/api/cs/oc/oms/v1/batchAddGoods"; //添加商品接口
      let result = {};
      if (self.componentData.a_2.length == 0) {
        self.$Message.warning("请选中订单数据!");
        return;
      }
      if (JSON.stringify(self.rowClickData) == "{}") {
        self.$Message.warning("请选中需要新增的赠品!");
        return;
      }
      result["ids"] = self.componentData.a_2;
      result["changeGoodsSku"] = self.rowClickData.ECODE.trim();
      result["gift_type"] = 1;
      result["qty"] = self.rowClickData.qty;
      if (
        self.componentData.type &&
        self.componentData.type == "replaceTheHangingItem"
      ) {
        //替换下挂商品接口
        url = "/p/cs/oc/v1/bathChangeGoods";
        result["sku_code"] = self.rowClickData.ECODE.trim();
        result["type"] = 2;
        delete result.gift_type;
      }
      self.loading = true;
      axios({
        url: url,
        method: "post",
        data: result,
      }).then((res) => {
        console.log(res);
        if (res.data.code == 0) {
          self.$Message.success(res.data.message);
          self.$parent.$parent.$parent.getData();
          this.$parent.$parent.closeConfirm();
          this.loading = false;
        } else {
          this.loading = false;
          if (res.data.code === -1) {
            self.$Modal.confirm({
              title: res.data.message,
              width: 500,
              render: (h) => {
                return h("Table", {
                  props: {
                    columns: [
                      {
                        title: "提示信息",
                        key: "message",
                      },
                    ],
                    data: res.data.data,
                  },
                });
              },
            });
          }
        }
      });
    },
    onRowClick(row) {
      this.rowClickData = row;
    },
  },
};
</script>
<style lang="less">
@import "~@burgeon/oms-theme/skin/public.less";
.pushProduce {
  .i_head {
    height: 30px;
  }
  .i_body {
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .i_food {
    display: flex;
    flex-direction: row-reverse;
  }
  .skuBox {
    width: 430px;
    overflow: hidden;
    margin-top: -2px;
    /deep/ .orderManageEdit {
      padding-right: 0;
      .burgeon-form-item {
        display: flex;
        line-height: 28px;
        margin-right: 5px;
        .burgeon-form-item-label {
          padding-top: 0;
          padding-bottom: 0;
          width: auto !important;
          line-height: 28px;
        }
        .burgeon-form-item-content {
          line-height: 28px;
          margin-left: 0px !important;
        }
      }
    }
  }
  .number-box {
    label {
      width: 100px;
      text-align: right;
      padding: 10px 12px 10px 0;
      display: inline-block;
    }
  }
  .search-button {
    text-align: right;
    width: 100px;
    margin-top: 2px;
    .ark-btn-error {
      background-color: @button-bg;
      border-color: @button-border;
    }
  }
}
</style>

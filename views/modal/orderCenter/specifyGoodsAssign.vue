<template>
  <!-- 订单管理 - 批量拆弹 - 指定商品拆单 -->
  <div class="specifyGoods">
    <div class="i_head">
      <div style="float: left; margin-top: 7px">
        <RadioGroup v-model="radioValue" @on-change="radioChange">
          <Radio label="2">
            <!-- 按页面已勾选订单 -->
            <span>{{ vmI18n.t("modalTips.cd") }}</span>
          </Radio>
          <Radio label="1">
            <!-- 按筛选条件选中订单 -->
            <span>{{ vmI18n.t("modalTips.ce") }}</span>
          </Radio>
        </RadioGroup>
      </div>
      <!-- 商品SKU -->
      <div style="float: right" class="searchForm">
        <!-- {{ vmI18n.t("table_label.commoditySKU") }}: -->
        <!-- <Input
          v-model="searchValue"
          icon="ios-search"
          style="width: 150px"
          @on-enter="search"
          @on-click="search"
        /> -->
        <myInput
          colname="PS_C_SKU"
          style="popInput"
          version="1.4"
          isActive="true"
          :itemdata="itemdata"
          @getFkChooseItem="oneObj"
        ></myInput>
        <!-- 数量:
        <Input v-model="qty" style="width: 80px" />-->
      </div>
    </div>
    <div class="i_body">
      <Table :columns="columns" :data="data" />
    </div>
    <businessButton class="modalBth" :btn-config="btnConfig" />
  </div>
</template>

<script>
// import specifyGoodsAssign from '@/js/modal/orderCenter/specifyGoodsAssign';
// export default specifyGoodsAssign;
import businessButton from "professionalComponents/businessButton";
import myInput from "professionalComponents/fkinput.vue";

export default {
  components: {
    myInput,
    businessButton,
  },
  data() {
    return {
      vmI18n: $i18n,
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
              this.confirm();
            }, // 按钮点击事件
          },
        ],
      },
      radioValue: "2",
      searchValue: "",
      qty: "1",
      itemdata: {
        colid: "171332",
        colname: "PS_C_SKU",
        name: "SKU编码",
        valuedata: "",
        pid: "",
        fkdisplay: "drp",
        isfk: true,
        isnotnull: false,
        readonly: false,
      },
      columns: [
        {
          title: "序号",
          key: "INDEX",
          type: "index",
        },
        {
          title: "SKU编码", // SKU编码
          key: "ECODE",
        },
        {
          title: "SKU名称", // 商品SKU
          key: "ENAME",
        },
        {
          title: $i18n.t("table_label.productName"), // 商品名称
          key: "PS_C_PRO_ENAME",
        },
        {
          title: "操作",
          key: "OPARATE_BUTTON",
          render: (h, params) =>
            h(
              "a",
              {
                on: {
                  click: () => {
                    console.log(params.row);
                    this.querySgStorage(params.row);
                    this.$Modal.confirm({
                      title: "查库存",
                      titleAlign: "center",
                      mask: true,
                      className: "ark-dialog",
                      render: (h) =>
                        h("Table", {
                          props: {
                            columns: [
                              {
                                title: "序号",
                                key: "Index",
                                type: "index",
                              },
                              {
                                title: "逻辑仓",
                                key: "CP_C_STORE_NAME",
                              },
                              {
                                title: "可用数",
                                key: "QTY_AVAILABLE",
                              },
                            ],
                            data: this.storageData,
                          },
                        }),
                    });
                  },
                },
              },
              "查库存"
            ),
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
    oneObj(val) {
      console.log("val:", val);
      console.log("params:", params);
      this.getFkChooseItem(val, params);
    },
    radioChange(value) {
      console.log(value);
    },
    // async search(value) { // sku查询
    async search() {
      // sku查询
      const self = this;
      if (!self.searchValue) {
        self.$Message.warning($i18n.t("pHolder.z4")); // 请输入商品SKU
        return;
      }
      const query = { isBlur: "N", psCSku: { ECODE: self.searchValue } };
      const res = await self.service.common.skuQuery(query);
      if (res.data.code == 0) {
        if (res.data.data.data.length == 0) {
          this.$Message.warning($i18n.t("modalTips.r8")); // 查询数据为空!
          return;
        }
        res.data.data.data[0].IS_GIFT =
          res.data.data.data[0].IS_GIFT == "0" ? "否" : "是";
        self.data = res.data.data.data;
      } else {
        this.$Message.warning($i18n.t("modalTips.zt")); // sku查询失败!
      }
    },
    confirm() {
      const self = this;
      if (self.data.length == 0) {
        self.$Message.warning($i18n.t("modalTips.cg")); // sku不能为空!
        return;
      }
      let result = {};
      // if (self.qty == '') {
      //   self.$Message.warning('请输入数量!');
      //   return;
      // }
      if (self.radioValue == "1") {
        self.componentData.a_1.appiontSplitSkuCode = self.searchValue;
        // self.componentData.a_1['qty'] = self.qty;
        result = self.componentData.a_1;
      } else if (self.radioValue == "2") {
        if (self.componentData.a_2.length == 0) {
          self.$Message.warning($i18n.t("modalTips.zu")); // 请勾选订单数据!
          return;
        }
        result.ids = self.componentData.a_2;
        result.appiontSplitSkuCode = self.searchValue;
        // result['qty'] = self.qty;
      }
      console.log(this.componentData.a_1, result);
      this.$comUtils.setLoading(true);
      this.service.orderCenter
        .saveAppointSplitOrderInfo(result)
        .then((res) => {
          console.log(res);
          if (res.data.code == 0) {
            self.$Message.success(res.data.message);
            self.$parent.$parent.$parent.getData();
            this.$parent.$parent.closeConfirm();
          } else {
            self.$Message.error(res.data.message);
            this.$parent.$parent.closeConfirm();
          }
        })
        .finally(() => {
          this.$comUtils.setLoading();
        });
    },
  },
};
</script>
<style lang="less">
// @import "~@/css/modal/orderCenter/specifyGoodsAssign.less";
.specifyGoods {
  .i_head {
    height: 30px;
    .searchForm {
      .item-input {
        align-items: center;
      }
    }
  }
  .i_body {
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .i_food {
    display: flex;
    flex-direction: row-reverse;
  }
}
</style>
<template>
  <!-- 订单管理 - 批量拆弹 - 指定商品拆单 -->
  <div class="specifyGoods customized-modal" v-loading="loading">
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
        <inputP
          version="1.4"
          :itemdata="itemdata"
          @getFkChooseItem="oneObj"
          @inputBlur="inputBlur"
          @inputChange="inputChange"
          @inputEnter="inputEnter"
          @inputClear="inputClear"
        ></inputP>
        <!-- 数量:
        <Input v-model="qty" style="width: 80px" />-->
      </div>
    </div>
    <div class="i_body">
      <Table
        :columns="columns"
        :data="data"
        @on-row-click="onRowClick"
        height="266"
      />
    </div>
    <businessButton class="modal-footer" :btn-config="btnConfig" />
  </div>
</template>

<script>
// import specifyGoodsAssign from '@/js/modal/orderCenter/specifyGoodsAssign';
// export default specifyGoodsAssign;
import businessButton from "professionalComponents/businessButton";
import inputP from "professionalComponents/fkinputPlus.vue";
var _ = require('lodash');

export default {
  components: {
    inputP,
    businessButton,
  },
  data() {
    return {
      vmI18n: $i18n,
      clickRow: {},  //选中的sku数据
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
        version: '1.4',
        colid: "171332",
        colname: "PS_C_SKU",
        name: "SKU编码",
        valuedata: "",
        pid: "",
        fkdisplay: "drp",
        isfk: true,
        isnotnull: false,
        readonly: false,
        columnsKey: ['ECODE'],
      },
      loading: false,
      data: [],
      columns: [
        {
          title: "序号",
          key: "INDEX",
          type: "index",
        },
        {
          title: "SKU编码", // SKU编码
          key: "ecode",
        },
        {
          title: $i18n.t('form_label.skuName'), // SKU名称
          key: "ename",
        },
        {
          title: $i18n.t("table_label.productName"), // 商品名称
          key: "psCProEname",
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
                    // this.querySgStorage(params.row);
                    this.data.splice(params.row._index, 1)
                    /* const rowA = [params.row];
                    this.data = this.$OMS2.omsUtils.getDifferentArr(
                      this.data,
                      rowA,
                      "id"
                    ); */
                  },
                },
              },
              "删除"
            ),
        },
      ],
    };
  },
  props: {
    componentData: {
      type: Object,
    },
  },
  mounted() {
    console.log('this.componentData::', this.componentData);
  },
  methods: {
    onRowClick(row) {
      console.log(row);
      this.clickRow = row;
    },
    oneObj(val) {
      if (!val.valuedata) return // clear的情况
      this.search();
    },
    inputBlur(val) {
      console.log("inputBlur:", val);
    },
    inputChange(val) {
      this.searchValue = val;
      this.itemdata.valuedata = val;
    },
    inputEnter(val) {
      if (!val.pid && !val.valuedata) {
        this.search();
      }
    },
    inputClear() {
      this.searchValue = '';
      this.itemdata.valuedata = '';
    },

    radioChange(value) {
      console.log(value);
    },
    /* async search() {
      // sku查询
      const self = this;
      if (!self.itemdata.valuedata && !self.searchValue) {
        self.$Message.warning($i18n.t("pHolder.z4")); // 请输入商品SKU
        return;
      }
      const res = await self.service.common.selSku({ ECODE: self.itemdata.valuedata });
      console.log(res);

      if (res.data.code == 0) {
        if (res.data.data.length == 0 || res.data.data[0] == null) {
          self.$Message.warning($i18n.t("modalTips.r8")); // 查询数据为空!
          return;
        }
        // res.data.data[0].IS_GIFT =
        //   res.data.data[0].IS_GIFT == "0" ? "否" : "是";
        self.data.push(res.data.data[0]);
      } else {
        // this.$Message.warning($i18n.t("modalTips.zt")); // sku查询失败!
      }
    }, */
    search: _.debounce(async function () {
      const self = this;
      if (!self.itemdata.valuedata && !self.searchValue) {
        self.$Message.warning($i18n.t("pHolder.z4")); // 请输入商品SKU
        return;
      }
      const res = await self.service.common.selSku({ ECODE: self.itemdata.valuedata });
      console.log(res);
      if (res.data.code == 0) {
        if (res.data.data.length == 0 || res.data.data[0] == null) {
          self.$Message.warning($i18n.t("modalTips.r8")); // 查询数据为空!
          return;
        }
        self.data.push(res.data.data[0]);
      } else {
        // this.$Message.warning($i18n.t("modalTips.zt")); // sku查询失败!
      }
    }, 100),
    confirm() {
      const self = this;
      if (self.data.length == 0) {
        self.$Message.warning($i18n.t("modalTips.cg")); // sku不能为空!
        return;
      }
      let result = {};
      result.orderIds = self.componentData.a_2;
      result.skuList = self.data.map(item => item.ecode);
      // if (self.radioValue == "1") {
      //   result.QueryList = self.componentData.data;
      //   // self.componentData.data['qty'] = self.qty;
      // } else if (self.radioValue == "2") {
      //   if (self.componentData.a_2.length == 0) {
      //     self.$Message.warning($i18n.t("modalTips.zu")); // 请勾选订单数据!
      //     // return;
      //   }
      //   result.IDS = self.componentData.a_2;
      //   // result['qty'] = self.qty;
      // }
      this.loading = true;
      this.service.orderCenter
        .saveAppointSplitOrderInfo(result)
        .then((res) => {
          console.log(res);
          if (res.data.code == 0) {
            self.$OMS2.omsUtils.msgTips(self, 'success', res.data.message, 0);
            self.$parent.$parent.$parent.query();
            self.$parent.$parent.closeConfirm();
          } else {
            this.$Modal.confirm({
              title: res.data.message,
              width: 400,
              className: 'ark-dialog',
              mask: true,
              render: (h) => {
                if (res.data.data) {
                  res.data.data.forEach((item, index) => {
                    item['index'] = index + 1;
                  })
                  return h('Table', {
                    props: {
                      columns: [
                        {
                          title: $i18n.t('table_label.serialNo'), // 序号
                          key: 'index'
                        },
                        {
                          title: '单据编号', // '提示信息',
                          key: 'bollNo',
                        },
                        {
                          title: '失败原因',
                          key: 'message'
                        }
                      ],
                      data: res.data.data,
                    },
                  })
                } else {
                  return h('p', {}, res.data.message)
                }
              },
            })
          }
          // if (res.data.code == 0) {
          //   self.$Message.success(res.data.message);
          //   self.$parent.$parent.$parent.query();
          //   this.$parent.$parent.closeConfirm();
          // } else {
          //   this.$parent.$parent.closeConfirm();
          // }
        }).catch(() => this.loading = false)
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>
<style lang="less">
// @import "~@/css/modal/orderCenter/specifyGoodsAssign.less";
.specifyGoods {
  height: 375px;
  .i_head {
    height: 30px;
    .searchForm {
      .item-input {
        align-items: center;
      }
    }
  }
  .i_body {
    margin: 30px 0;
  }
}
</style>
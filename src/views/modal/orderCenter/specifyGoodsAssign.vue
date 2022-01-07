<template>
  <!-- 订单管理 - 批量拆弹 - 指定商品拆单 -->
  <div class="specifyGoods cus-modal" v-loading="loading">
    <div class="i_head">
      <div style="float: left; margin-top: 7px">
        <RadioGroup v-model="radioValue" @on-change="radioChange">
          <Radio label="2">
            <!-- 按页面已勾选订单 -->
            <span>{{ $it("tip.cd") }}</span>
          </Radio>
          <Radio label="1">
            <!-- 按筛选条件选中订单 -->
            <span>{{ $it("tip.ce") }}</span>
          </Radio>
        </RadioGroup>
      </div>
      <!-- 商品SKU -->
      <div style="float:right">
        {{ $it('tL.commoditySKU') }}:
        <Input
            v-model="searchValue"
            icon="ios-search"
            style="width: 150px;"
            @on-enter="search"
            @on-click="search"
        />
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
    <OmsButton class="modal-footer" :btn-config="btnConfig" />
  </div>
</template>

<script>
// import specifyGoodsAssign from '@/js/modal/orderCenter/specifyGoodsAssign';
// export default specifyGoodsAssign;

export default {
  components: {},
  data() {
    return {
      clickRow: {},  //选中的sku数据
      btnConfig: {
        typeAll: "default", // 按钮统一风格样式
        btnsite: "right", // 按钮位置 (right , center , left)
        buttons: [
          {
            text: $it("com.cancel"), // 取消
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              this.$parent.$parent.closeConfirm();
            }, // 按钮点击事件
          },
          {
            text: $it("com.determine"), // 确定
            type: 'primary',
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
      loading: false,
      data: [],
      columns: [
        {
          title: $it('tL.commoditySKU'), // 商品SKU
          key: 'ECODE'
        },
        {
          title: $it('tL.productName'), // 商品名称
          key: 'PS_C_PRO_ENAME'
        },
        {
          title: $it('tL.productSKUname'), // 商品SKU名称
          key: 'SPEC'
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
    radioChange(value) {
      console.log(value);
    },
    /* async search() {
      // sku查询
      const self = this;
      if (!self.itemdata.valuedata && !self.searchValue) {
        self.$Message.warning($it("pH.z4")); // 请输入商品SKU
        return;
      }
      const res = await self.service.common.selSku({ ECODE: self.itemdata.valuedata });
      console.log(res);

      if (res.data.code == 0) {
        if (res.data.data.length == 0 || res.data.data[0] == null) {
          self.$Message.warning($it("tip.r8")); // 查询数据为空!
          return;
        }
        // res.data.data[0].IS_GIFT =
        //   res.data.data[0].IS_GIFT == "0" ? "否" : "是";
        self.data.push(res.data.data[0]);
      } else {
        // this.$Message.warning($it("tip.zt")); // sku查询失败!
      }
    }, */
    search: _.debounce(async function () {
      const self = this;
      if (!self.searchValue) {
        self.$Message.warning($it("pH.z4")); // 请输入商品SKU
        return;
      }
      const query = { isBlur: 'N', psCSku: { ECODE: self.searchValue } };
      const res = await self.service.common.skuQuery(query);
      console.log(res);
      if (res.data.code == 0) {
        if (res.data.data.length == 0 || res.data.data[0] == null) {
          self.$Message.warning($it("tip.r8")); // 查询数据为空!
          return;
        }
        res.data.data.data[0].IS_GIFT = res.data.data.data[0].IS_GIFT == '0' ? '否' : '是';
        self.data = res.data.data.data;
      } else {
        this.$Message.warning($it("tip.zt")); // sku查询失败!
      }
    }, 100),
    confirm() {
      const self = this;
      if (self.data.length == 0) {
        self.$Message.warning($it("tip.cg")); // sku不能为空!
        return;
      }
      let result = {};
      if (self.radioValue == '1') {
        self.componentData.a_1.appiontSplitSkuCode = self.searchValue;
        // self.componentData.a_1['qty'] = self.qty;
        result = self.componentData.a_1;
      } else if (self.radioValue == '2') {
        if (self.componentData.a_2.length == 0) {
          self.$Message.warning(this.vmI18n.t('tip.zu'));// 请勾选订单数据!
          return;
        }
        result.ids = self.componentData.a_2;
        result.appiontSplitSkuCode = self.searchValue;
        // result['qty'] = self.qty;
      }
      this.loading = true;
      this.service.orderCenter
        .saveAppointSplitOrderInfo(result)
        .then((res) => {
          console.log(res);
          if (res.data.code == 0) {
            $utils.msgTips(self, 'success', res.data.message, 0);
            self.$parent.$parent.$parent.query();
            self.$parent.$parent.closeConfirm();
          } else {
            self.$Message.error(res.data.message);
            this.$parent.$parent.closeConfirm();
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
  // height: 375px;
  margin-top: 16px;
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

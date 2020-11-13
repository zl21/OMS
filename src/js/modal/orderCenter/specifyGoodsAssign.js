import axios from 'axios';

export default {
  data() {
    return {
      vmI18n: window.vmI18n,
      pageLoad: false,
      radioValue: '2',
      searchValue: '',
      qty: '1',
      columns: [
        {
          title: window.vmI18n.t('table_label.commoditySKU'), // 商品SKU
          key: 'ECODE'
        },
        {
          title: window.vmI18n.t('table_label.productName'), // 商品名称
          key: 'PS_C_PRO_ENAME'
        },
        {
          title: window.vmI18n.t('table_label.productSKUname'), // 商品SKU名称
          key: 'SPEC'
        },
        // {
        //   title: '是否为赠品',
        //   key: 'IS_GIFT'
        // }
      ],
      data: []
    };
  },
  props: {
    componentData: {
      type: Object,
    }
  },
  mounted() {
    console.log(this.componentData);
  },
  methods: {
    radioChange(value) {
      console.log(value);
    },
    async search(value) { // sku查询
      const self = this;
      if (!self.searchValue) {
        self.$Message.warning(self.vmI18n.t('pHolder.z4'));// 请输入商品SKU
        return;
      }
      const query = { isBlur: 'N', psCSku: { ECODE: self.searchValue } };
      const res = await self.service.common.skuQuery(query);
      if (res.data.code == 0) {
        if (res.data.data.data.length == 0) {
          this.$Message.warning(this.vmI18n.t('modalTips.r8'));// 查询数据为空!
          return;
        }
        res.data.data.data[0].IS_GIFT = res.data.data.data[0].IS_GIFT == '0' ? '否' : '是';
        self.data = res.data.data.data;
      } else {
        this.$Message.warning(this.vmI18n.t('modalTips.zt'));// sku查询失败!
      }
    },
    confirm() {
      const self = this;
      if (self.data.length == 0) {
        self.$Message.warning(this.vmI18n.t('modalTips.cg'));// sku不能为空!
        return;
      }
      let result = {};
      // if (self.qty == '') {
      //   self.$Message.warning('请输入数量!');
      //   return;
      // }
      if (self.radioValue == '1') {
        self.componentData.a_1.appiontSplitSkuCode = self.searchValue;
        // self.componentData.a_1['qty'] = self.qty;
        result = self.componentData.a_1;
      } else if (self.radioValue == '2') {
        if (self.componentData.a_2.length == 0) {
          self.$Message.warning(this.vmI18n.t('modalTips.zu'));// 请勾选订单数据!
          return;
        }
        result.ids = self.componentData.a_2;
        result.appiontSplitSkuCode = self.searchValue;
        // result['qty'] = self.qty;
      }
      console.log(this.componentData.a_1, result);
      this.pageLoad = true;
      axios({
        url: '/api/cs/oc/oms/v1/saveAppointSplitOrderInfo',
        method: 'post',
        data: result
      }).then((res) => {
        this.pageLoad = false;
        console.log(res);
        if (res.data.code == 0) {
          self.$Message.success(res.data.message);
          self.$parent.$parent.$parent.getData();
          this.$parent.$parent.closeConfirm();
        } else {
          self.$Message.error(res.data.message);
          this.$parent.$parent.closeConfirm();
        }
      }).catch(() => {
        this.pageLoad = false;
      });
    }
  }
};

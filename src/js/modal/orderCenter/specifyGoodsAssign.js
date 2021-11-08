import { OmsButton } from 'burgeonComponents'

export default {
  components: {
    OmsButton
  },
  data() {
    return {
      vmI18n:$i18n,
      btnConfig: {
        typeAll: 'default', // 按钮统一风格样式
        btnsite: 'right', // 按钮位置 (right , center , left)
        buttons: [
          {
            type: '', // 按钮类型
            text: $i18n.t('common.cancel'), // 取消
            icon: '', // 按钮图标
            size: 'small', // 按钮大小
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              this.$parent.$parent.closeConfirm();
            } // 按钮点击事件
          },
          {
            type: '', // 按钮类
            text: $i18n.t('common.determine'), // 确定
            icon: '', // 按钮图标
            size: 'small', // 按钮大小
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              this.confirm();
            } // 按钮点击事件
          }
        ],
      },
      radioValue: '2',
      searchValue: '',
      qty: '1',
      columns: [
        {
          title: $i18n.t('table_label.commoditySKU'), // 商品SKU
          key: 'ECODE'
        },
        {
          title: $i18n.t('table_label.productName'), // 商品名称
          key: 'PS_C_PRO_ENAME'
        },
        {
          title: $i18n.t('table_label.productSKUname'), // 商品SKU名称
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
    // async search(value) { // sku查询
    async search() { // sku查询
      const self = this;
      if (!self.searchValue) {
        self.$Message.warning($i18n.t('pHolder.z4'));// 请输入商品SKU
        return;
      }
      const query = { isBlur: 'N', psCSku: { ECODE: self.searchValue } };
      const res = await self.service.common.skuQuery(query);
      if (res.data.code == 0) {
        if (res.data.data.data.length == 0) {
          this.$Message.warning($i18n.t('modalTips.r8'));// 查询数据为空!
          return;
        }
        res.data.data.data[0].IS_GIFT = res.data.data.data[0].IS_GIFT == '0' ? '否' : '是';
        self.data = res.data.data.data;
      } else {
        this.$Message.warning($i18n.t('modalTips.zt'));// sku查询失败!
      }
    },
    confirm() {
      const self = this;
      if (self.data.length == 0) {
        self.$Message.warning($i18n.t('modalTips.cg'));// sku不能为空!
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
          self.$Message.warning($i18n.t('modalTips.zu'));// 请勾选订单数据!
          return;
        }
        result.ids = self.componentData.a_2;
        result.appiontSplitSkuCode = self.searchValue;
        // result['qty'] = self.qty;
      }
      console.log(this.componentData.a_1, result);
      $omsUtils.setLoading(true);
      this.service.orderCenter.saveAppointSplitOrderInfo(result).then((res) => {
        console.log(res);
        if (res.data.code == 0) {
          self.$Message.success(res.data.message);
          self.$parent.$parent.$parent.getData();
          this.$parent.$parent.closeConfirm();
        } else {
          self.$Message.error(res.data.message);
          this.$parent.$parent.closeConfirm();
        }
      }).finally(() => {
        $omsUtils.setLoading();
      });
    }
  }
};

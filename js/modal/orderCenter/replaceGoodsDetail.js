// import axios from 'axios';
import businessButton from 'professionalComponents/businessButton';

export default {
  components: {
    businessButton
  },
  data() {
    return {
      vmI18n: window.vmI18n,
      radioValue: '2',
      searchValue: '',
      qty: '1',
      columns: [
        {
          title: '商品SKU',
          key: 'ECODE'
        },
        {
          title: '商品名称',
          key: 'PS_C_PRO_ENAME'
        },
        {
          title: '规格',
          key: 'SPEC'
        },
        {
          title: '是否为赠品',
          key: 'IS_GIFT'
        }
      ],
      data: [],
      btnConfig: {
        typeAll: 'default', // 按钮统一风格样式
        buttons: [
          {
            text: '取消', // 查找 按钮文本
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              this.$parent.$parent.closeConfirm();
            } // 按钮点击事件
          },
          {
            text: '确定', // 查找 按钮文本
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              this.confirm();
            } // 按钮点击事件
          },
        ]
      },
    };
  },
  props: {
    componentData: {
      type: Object
    }
  },
  mounted() {
    // console.log(this.$parent.$parent.$parent.reloadCus);
  },
  methods: {
    radioChange(value) {
      console.log(value);
    },
    search() {
      // sku查询
      const self = this;
      const data = { isBlur: 'N', psCSku: { ECODE: self.searchValue } };
      self.service.common.skuQuery(data).then(res => {
        if (res.data.code == 0) {
          if (res.data.data.data.length == 0) {
            // 查询数据为空!
            this.$Message.warning(self.vmI18n.t('modalTips.r8'));
            return;
          }
          res.data.data.data[0].IS_GIFT = res.data.data.data[0].IS_GIFT == '0' ? '否' : '是';
          self.data = res.data.data.data;
        } else {
          // sku查询失败!
          this.$Message.warning(self.vmI18n.t('modalTips.zt'));
        }
      });
    },
    async confirm() {
      const self = this;
      if (self.data.length == 0) {
        // sku不能为空!
        self.$Message.warning(self.vmI18n.t('modalTips.cg'));
        return;
      }
      const param = {};
      param.ids = self.componentData.ids;
      param.sku_code = self.data[0].ECODE;
      param.itemId = self.componentData.itemId;
      param.type = 1;
      this.$comUtils.setLoading(true);
      // bathChangeGoods
      try {
        const { data: { code, message, data } } = await this.service.orderCenter.bathChangeGoods(param);
        if (code == 0) {
          self.$Message.success(message);
          if (self.componentData.list) {
            self.$parent.$parent.$parent.getData();
          } else {
            if (self.$parent.$parent.$parent.reloadCus) self.$parent.$parent.$parent.reloadCus();
            if (self.$parent.$parent.$parent.$parent.autoRefresh) self.$parent.$parent.$parent.$parent.autoRefresh();
          }

          self.$parent.$parent.closeConfirm();
        } else {
          self.$Modal.confirm({
            title: message,
            width: 500,
            render: h => h('Table', {
                props: {
                  columns: [
                    {
                      title: '提示信息',
                      key: 'message'
                    }
                  ],
                  data
                }
              })
          });
        }
      } catch (error) {
        this.$comUtils.setLoading();
      }
    }
  }
};

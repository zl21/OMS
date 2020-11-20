import axios from 'axios';
import businessButton from 'professionalComponents/businessButton';
export default {
  components: {
    businessButton
  },
  data() {
    return {
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
        typeAll: 'error', // 按钮统一风格样式
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
      axios({
        url: '/p/cs/skuQuery',
        method: 'post',
        data: { isBlur: 'N', psCSku: { ECODE: self.searchValue } }
      }).then(res => {
        console.log(res);
        if (res.data.code == 0) {
          if (res.data.data.data.length == 0) {
            this.$Message.warning('查询数据为空!');
            return;
          }
          res.data.data.data[0].IS_GIFT = res.data.data.data[0].IS_GIFT == '0' ? '否' : '是';
          self.data = res.data.data.data;
        } else {
          this.$Message.warning('sku查询失败!');
        }
      });
    },
    confirm() {
      const self = this;
      if (self.data.length == 0) {
        self.$Message.warning('sku不能为空!');
        return;
      }
      const result = {};
      result.ids = self.componentData.ids;
      result.sku_code = self.data[0].ECODE;
      result.itemId = self.componentData.itemId;
      result.type = 1;
      axios({
        url: '/api/cs/oc/oms/v1/bathChangeGoods',
        method: 'post',
        data: result
      }).then(res => {
        console.log(res);
        if (res.data.code == 0) {
          self.$Message.success(res.data.message);
          if (self.componentData.list) {
            self.$parent.$parent.$parent.getData();
          } else {
            if (self.$parent.$parent.$parent.reloadCus) self.$parent.$parent.$parent.reloadCus();
            if (self.$parent.$parent.$parent.$parent.autoRefresh) self.$parent.$parent.$parent.$parent.autoRefresh();
          }

          self.$parent.$parent.closeConfirm();
        } else {
          self.$Modal.confirm({
            title: res.data.message,
            width: 500,
            render: h => h('Table', {
                props: {
                  columns: [
                    {
                      title: '提示信息',
                      key: 'message'
                    }
                  ],
                  data: res.data.data
                }
              })
          });
        }
      });
    }
  }
};

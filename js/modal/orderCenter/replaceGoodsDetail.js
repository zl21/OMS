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
      columns: [{
        key: 'skuEcode',
        title: 'SKU编码',
      },
      {
        key: 'spuEcode',
        title: 'SPU编码',
      },
      {
        key: 'spuEname',
        title: 'SPU名称',
      },
      {
        key: 'skuEname',
        title: 'SKU名称',
      },
      {
        key: 'brandEname',
        title: '品牌',
      },
      {
        key: 'classifyEname',
        title: '商品分类',
      }],
      data: [],
      currentSkuEcode:'',
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
    console.log('componentData:',this.componentData);
  },
  methods: {
    // 当前选中的行数据
    currentChange(currentData){
      this.currentSkuEcode = currentData.skuEcode
    },
    // 搜索
    search() {
      // sku查询
      const self = this;
      let data = {
        skuEcode: self.searchValue,
        isGroup: 'Y',
        groupType: 2,
        size: 10,
        current: 1,
      }
      axios({
        method: 'post',
        url: '/r3-ps/p/cs/ps/pro/v1/selectSkuProBySkuEcodeList',
        data,
      }).then((res) => {
        self.data = res.data.data.records;
      })
    },
    // 替换
    async confirm() {
      const self = this;
      if (self.data.length == 0) {
        // sku不能为空!
        self.$Message.warning(self.vmI18n.t('modalTips.cg'));
        return;
      }
      let params = {
        orderList:this.componentData.orderList,
        skuEcodes:[this.componentData.oldSuk,this.currentSkuEcode]
      }
      const { data: { code, message, data } } = await this.service.orderCenter.replaceOrderByPro(params);
      console.log(code, message, data);
      if(code ===  0){
        self.$Message.success(message);
      }else if(data && code ===  -1){
          self.$Modal.confirm({
            title: message,
            width: 500,
            className:'ark-dialog',
            render: h => h('Table', {
                props: {
                  columns: [
                    {
                      title: 'ID',
                      key: 'orderId'
                    },
                    {
                      title: '单据编号',
                      key: 'billNo'
                    }, 
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
    }
  }
};

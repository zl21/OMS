import axios from 'axios';

export default {
  data() {
    return {
      vmI18n: window.vmI18n,
      is_click: false
    };
  },
  computed: {
    allFormData() {
      return this.$store.state[`S.${this.$route.params.tableName}.${this.$route.params.tableId}`].formItems.data;
    },
  },
  mounted() {
    console.log(this.$store.state[`S.${this.$route.params.tableName}.${this.$route.params.tableId}`]);
  },
  methods: {
    determine() {
      const self = this;
      if (self.is_click) {
        return false;
      }
      const url = '';
      if (!this.allFormData.CP_C_SHOP_ID && !this.allFormData.SKU_ID && !this.allFormData.PS_C_SKU_ECODE && !this.allFormData.NUMIID) {
        this.$Message.warning('查询条件【平台店铺、平台条码ID、平台商品ID、条码编码、商品编码】至少选择一个！');
        return;
      }
      // 库存按查询条件同步
      // if (self.$parent.title === self.vmI18n.t('modalTitle.z0')) url = '/p/cs/storage/manualSynchChannelStorageByQuery';
      // // 商品按查询条件同步
      // else if (self.$parent.title === self.vmI18n.t('modalTitle.z1')) url = '/p/cs/storage/manualCalcAndSynchChannelProduct';
      // let paramsObj = self.$parent.$parent.formObj.fixedcolumns;
      // 获取搜索form表单的对象
      const param = {};
        param.cpCShopIdList = this.allFormData.CP_C_SHOP_ID; // 平台店铺
        param.skuId = this.allFormData.SKU_ID;// 平台SKUID
        param.psCSkuEcode = this.allFormData.PS_C_SKU_ECODE;// 条码编码
        param.psCProEcode = this.allFormData.PS_C_PRO_ECODE;// 商品编码(条码编码)
        param.numiid = this.allFormData.NUMIID;// 平台商品id
        param.cpCPlatformIdList = [];
        if (this.allFormData.CP_C_PLATFORM_ID) { // 平台类型
          this.allFormData.CP_C_PLATFORM_ID.forEach((item) => {
            const obj = item.toString();
            param.cpCPlatformIdList.push(obj);
          });
        }
        self.is_click = true;
      R3.network.post('/p/cs/storage/manualCalcAndSynchChannelProduct', param).then((res) => {
        if (res.data.code === 0) {
          self.$emit('closeActionDialog');
          self.$Message.success(res.data.message);
        } else {
          self.is_click = false;
          self.$emit('closeActionDialog');
          self.$Message.error(res.data.message);
        }
      });
      // axios({
      //   url: url,
      //   method: "post",
      //   data: param
      // }).then(function(res) {
      //   if (res.data.code === 0) {
      //     self.$emit("closeActionDialog");
      //     self.$Message.success(res.data.message);
      //   } else {
      //     self.$emit("closeActionDialog");
      //     self.$Message.error(res.data.message);
      //   }
      // });
    }
  }
};

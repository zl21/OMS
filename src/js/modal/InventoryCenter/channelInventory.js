import axios from "axios";

export default {
  data() {
    return {
      vmI18n: window.vmI18n
    };
  },

  methods: {
    determine() {
      let self = this;
      let url = "";
      // 库存按查询条件同步
      if (self.$parent.title === self.vmI18n.t("modalTitle.z0"))
        url = "/p/cs/storage/manualSynchChannelStorageByQuery";
        // 商品按查询条件同步
      else if (self.$parent.title === self.vmI18n.t("modalTitle.z1"))
        url = "/p/cs/storage/manualCalcAndSynchChannelProduct";
      // let paramsObj = self.$parent.$parent.formObj.fixedcolumns;
      // 获取搜索form表单的对象
      let paramsObj = self.$parent.$parent.$parent.formItems.data;
      let param = {};
      if (paramsObj) {
        param.cpCShopIdList = paramsObj.CP_C_SHOP_ID ? paramsObj.CP_C_SHOP_ID:[]; // 平台店铺
        param.skuId = paramsObj.SKU_ID ? paramsObj.SKU_ID : null;// 平台SKUID
        param.psCSkuEcode = paramsObj.PS_C_SKU_ECODE ? paramsObj.PS_C_SKU_ECODE : [];// 平台类型
        param.psCProEcode = paramsObj.PS_C_PRO_ECODE ? paramsObj.PS_C_PRO_ECODE : null;// 平台编码(条码编码)
        param.numiid = paramsObj.NUMIID ? paramsObj.NUMIID : null;// 商品编码
        if (paramsObj.CP_C_PLATFORM_ID) {// 平台商品id
          paramsObj.CP_C_PLATFORM_ID.forEach(item => {
            let obj = item.toString();
            param.cpCPlatformIdList.push(obj);
          });
        }
      }
      R3.network.post('/p/cs/storage/manualCalcAndSynchChannelProduct',param).then(function(res) {
        if (res.data.code === 0) {
          self.$emit("closeActionDialog");
          self.$Message.success(res.data.message);
        } else {
          self.$emit("closeActionDialog");
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

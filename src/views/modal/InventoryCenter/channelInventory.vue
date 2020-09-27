<template>
  <div style="width:250px" class="gf">
    <p class="title">是否确认同步库存？</p>
    <!-- <jordanBtn :btnConfig="channelInventoryBtnConfig"></jordanBtn> -->
    <div class="dialog-footer">
      <Button type="primary" size="small" @click="determine">确定</Button>
      <Button
        type="error"
        ghost
        size="small"
        @click="
          () => {
            this.$emit('closeActionDialog');
          }
        "
        >取消</Button
      >
    </div>
  </div>
</template>

<script>
import axios from "axios";
// import jordanBtn from "@/components/jordanButton";

export default {
  // components: {
  //   jordanBtn
  // },
  props: {
    objList: {
      type: Array
    },
    idArr: {
      type: Array
    },
    webid: {
      type: Number
    },
    tablename: {
      type: String
    },
    rowData: {
      type: Array
    },
    SpecialTitle: {
      type: String
    }
  },
  // mounted() {
  //   console.log(this.rowData, "rowData");
  //   console.log(this.tablename, "tablename");
  //   console.log(this.webid, "webid");
  //   console.log(this.idArr, "idArr");
  //   console.log(this.objList, "objList");
  // },
  data() {
    return {
      // channelInventoryBtnConfig: {
      //   typeAll: "error", //按钮统一风格样式
      //   btnsite: "right", //按钮位置 (right , center , left)
      //   buttons: [
      //     {
      //       type: "", //按钮类型
      //       text: "取消", //按钮文本
      //       icon: "", //按钮图标
      //       size: "", //按钮大小
      //       disabled: false, //按钮禁用控制
      //       btnclick: () => {
      //         this.$emit("closeActionDialog");
      //       } //按钮点击事件
      //     },
      //     {
      //       type: "", //按钮类型
      //       text: "确认", //按钮文本
      //       icon: "", //按钮图标
      //       size: "", //按钮大小
      //       disabled: false, //按钮禁用控制
      //       btnclick: () => {
      //         let self = this;
      //         // let paramsObj = JSON.parse(sessionStorage.getItem('SG_B_CHANNEL_STORAGE'));
      //         let url = "";
      //         if (self.SpecialTitle === "库存按查询条件同步")
      //           url = "/p/cs/storage/manualSynchChannelStorageByQuery";
      //         else if (self.SpecialTitle === "商品按查询条件同步")
      //           url = "/p/cs/storage/manualCalcAndSynchChannelProduct";
      //         let paramsObj = self.$parent.$parent.formObj.fixedcolumns;
      //         let param = {
      //           cpCShopIdList: [], // 平台店铺
      //           skuId: null, // 平台SKUID
      //           cpCPlatformIdList: [], // 平台类型
      //           psCSkuEcode: null, // 平台编码(条码编码)
      //           psCProEcode: null, // 商品编码
      //           numiid: null // 平台商品id
      //         };
      //         if (paramsObj) {
      //           param.cpCShopIdList = paramsObj.CP_C_SHOP_ID;
      //           param.skuId = paramsObj.SKU_ID;
      //           param.psCSkuEcode = paramsObj.PS_C_SKU_ECODE;
      //           param.psCProEcode = paramsObj.PS_C_PRO_ECODE;
      //           param.numiid = paramsObj.NUMIID;
      //           if (paramsObj.CP_C_PLATFORM_ID) {
      //             paramsObj.CP_C_PLATFORM_ID.forEach(item => {
      //               let obj = item.toString();
      //               param.cpCPlatformIdList.push(obj);
      //             });
      //           }
      //         }
      //         axios({
      //           url: url,
      //           method: "post",
      //           data: param
      //         }).then(function(res) {
      //           if (res.data.code === 0) {
      //             self.$emit("closeActionDialog");
      //             self.$Message.success(res.data.message);
      //           } else {
      //             self.$emit("closeActionDialog");
      //             self.$Message.error(res.data.message);
      //           }
      //         });
      //       } //按钮点击事件
      //     }
      //   ]
      // }
    };
  },

  methods: {
    determine() {
      let self = this;
      // let paramsObj = JSON.parse(sessionStorage.getItem('SG_B_CHANNEL_STORAGE'));
      let url = "";
      if (self.SpecialTitle === "库存按查询条件同步")
        url = "/p/cs/storage/manualSynchChannelStorageByQuery";
      else if (self.SpecialTitle === "商品按查询条件同步")
        url = "/p/cs/storage/manualCalcAndSynchChannelProduct";
      let paramsObj = self.$parent.$parent.formObj.fixedcolumns;
      let param = {
        cpCShopIdList: [], // 平台店铺
        skuId: null, // 平台SKUID
        cpCPlatformIdList: [], // 平台类型
        psCSkuEcode: null, // 平台编码(条码编码)
        psCProEcode: null, // 商品编码
        numiid: null // 平台商品id
      };
      if (paramsObj) {
        param.cpCShopIdList = paramsObj.CP_C_SHOP_ID;
        param.skuId = paramsObj.SKU_ID;
        param.psCSkuEcode = paramsObj.PS_C_SKU_ECODE;
        param.psCProEcode = paramsObj.PS_C_PRO_ECODE;
        param.numiid = paramsObj.NUMIID;
        if (paramsObj.CP_C_PLATFORM_ID) {
          paramsObj.CP_C_PLATFORM_ID.forEach(item => {
            let obj = item.toString();
            param.cpCPlatformIdList.push(obj);
          });
        }
      }
      axios({
        url: url,
        method: "post",
        data: param
      }).then(function(res) {
        if (res.data.code === 0) {
          self.$emit("closeActionDialog");
          self.$Message.success(res.data.message);
        } else {
          self.$emit("closeActionDialog");
          self.$Message.error(res.data.message);
        }
      });
    }
  }
};
</script>

<style>
.gf .title {
  height: 50px;
  line-height: 50px;
  text-align: center;
}
</style>

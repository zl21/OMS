<template>
  <div style="width:350px;padding-right:20px">
    <div v-if="corfirmFlag">
      <p ref="corfirmMessage">
      {{corfirmMessage}}
      </p>
      <br/>
      <jordanBtn :btnConfig="confirmBtnConfig"></jordanBtn>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import jordanBtn from "professionalComponents/jordanButton";
import R3 from '@syman/burgeon-r3';
const { getModuleName } = R3;
export default {
  components: {
    jordanBtn
  },
  props: {},
  data() {
    return {
      corfirmFlag:false,
      corfirmMessage:"",
      // distributionIds:"",
      existsDistributionIds:"",
      // 选一个
      confirmBtnConfig: {
        typeAll: "error", //按钮统一风格样式
        btnsite: "right", //按钮位置 (right , center , left)
        warnFlag: false,
        buttons: [
          {
            type: "", //按钮类型
            text: "确认", //按钮文本
            icon: "", //按钮图标
            size: "", //按钮大小
            disabled: false, //按钮禁用控制
            btnclick: () => {
              let self = this;
              self.mergeDistributionOccus();
            }
          },
          {
            type: "", //按钮类型
            text: "取消", //按钮文本
            icon: "", //按钮图标
            size: "", //按钮大小
            disabled: false, //按钮禁用控制
            btnclick: () => {
              let self = this;
              self.singleDistributionOccus();
            }
          }
        ]
      },
    }
  },
  mounted() {
    let self = this;
    self.checkMergeDistribution();
  },
  methods: {
    checkMergeDistribution() {
      let self = this;
      let fromdata = new FormData();
      let param ={
        ids:self.$store.state[getModuleName()].buttons.selectIdArr,
      };
      fromdata.append("param", JSON.stringify(param));
      axios({
        url: "/api/cs/vip/distribution/v1/distributionOccupy",
        method: "post",
        data: fromdata
      }).then(function(res) {
        if (res.data.data.code === 0) {
          let mergeFlag = res.data.data.mergeFlag;
          if(mergeFlag === 'Y'){
            self.corfirmFlag = true;
            self.corfirmMessage = res.data.data.distributionNos;
            if(res.data.data.existsDistributionIds){
              self.existsDistributionIds = res.data.data.existsDistributionIds.replace(/\[|]/g,'');
            }
            if(res.data.data.distributionIds){
              self.distributionIds = res.data.data.distributionIds.replace(/\[|]/g,'');
            }
          }else{
            self.$Message.success("手工占单成功!");
            self.$emit("closeActionDialog");
            self.$emit("confirmImport");
          }
        } else {
          self.corfirmFlag = true;
          self.corfirmMessage = res.data.data.message;
          self.confirmBtnConfig.buttons = [
            {
              type: "", //按钮类型
              text: "关闭", //按钮文本
              icon: "", //按钮图标
              size: "", //按钮大小
              disabled: false, //按钮禁用控制
              btnclick: () => {
                self.singleDistributionOccus();
              }
            }
          ]
        }
      })
    },
    mergeDistributionOccus(){
      let self = this;
      let fromdata = new FormData();
      let param ={
        distributionIds:self.distributionIds,
        existsDistributionIds:self.existsDistributionIds
      };
      self.setBtnDisabled(true);
      fromdata.append("param", JSON.stringify(param));
      axios({
        url: "/api/cs/vip/distribution/v1/vipcomMergeDistribution ",
        method: "post",
        data: fromdata
      }).then(function(res) {
        if (res.data.data.code === 0) {
          self.$Message.success("合并占单成功!");
          self.$emit("closeActionDialog");
        } else {
          self.corfirmMessage = res.data.data.message;
          self.confirmBtnConfig.buttons = [
            {
              type: "", //按钮类型
              text: "关闭", //按钮文本
              icon: "", //按钮图标
              size: "", //按钮大小
              disabled: false, //按钮禁用控制
              btnclick: () => {
                self.singleDistributionOccus();
              }
            }
          ]
        }
      })
    },
    singleDistributionOccus(){
      let self = this;
      self.$emit("closeActionDialog");
    },
    setBtnDisabled(closeFlag){
      let self = this;
      self.confirmBtnConfig.buttons.forEach(btn => {
          btn.disabled = closeFlag;
      });
    }
  },
};
</script>

<style>
</style>

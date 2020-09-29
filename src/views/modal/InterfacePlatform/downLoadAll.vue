<template>
  <div class="downLoadTaobaoOrder" style="width:430px;padding-right:20px">
    <businessForm :formConfig="downLoadFormConfig">
    </businessForm>
    <jordanBtn :btnConfig="downLoadBtnConfig"></jordanBtn>
    <!-- 确认下载弹框 -->
    <Modal
      class="downLoadModal"
      v-model="downLoadModal"
      title="订单下载"
      width="450"
      @on-ok="downLoadOk"
      @on-cancel="downLoadCancel"
      :mask="true"
    >
      <p>
        订单下载任务已经发送，任务ID：
        <span class="taskID" @click="taskIDClick">{{taskId}}</span>，请前往接口下载任务表查看下载进度！
      </p>
    </Modal>
  </div>
</template>

<script>
import axios from "axios";
import httpServer from 'framework/__utils__/request';
import businessForm from "professionalComponents/businessForm";
import jordanBtn from "professionalComponents/businessButton";
import R3 from '@syman/burgeon-r3'
const formConfig = file => require(`./config/${file}.js`).default;
export default {
  components: {
    businessForm,
    jordanBtn
  },
  props: {
    objList: {
      type: Array,
      defalut:() =>{
        return []
      }
    },
    idArr: {
      type: Array,
      defalut:() =>{
        return []
      }
    },
    webid: {
      type: Number
    },
    tablename: {
      type: String
    },
    rowData: {
      type: Array,
      defalut:() =>{
        return []
      }
    }
  },
  data() {
    return {
      downLoadModal: false,
      taskId: "",
      downLoadBtnConfig: {
        typeAll: "error", //按钮统一风格样式
        btnsite: "right", //按钮位置 (right , center , left)
        buttons: [
          {
            type: "", //按钮类型
            text: "下载", //按钮文本
            icon: "", //按钮图标
            size: "", //按钮大小
            disabled: false, //按钮禁用控制
            btnclick: () => {
              formConfig(this.$route.params.tableName).determine(this)
              // formConfig('IP_C_VIP_PRO').determine(this)
            } //按钮点击事件
          },
          {
            type: "", //按钮类型
            text: "取消", //按钮文本
            icon: "", //按钮图标
            size: "", //按钮大小
            disabled: false, //按钮禁用控制
            btnclick: () => {
              this.$emit("closeActionDialog",false);
            } //按钮点击事件
          }
        ]
      },
      downLoadFormConfig: {}
    };
  },
  mounted:function () {
    let self = this;
    if(this.$route.params.tableName == 'IP_B_JITX_DELIVERY'){
      self.downLoadFormConfig.formValue.order_status = "NEW";
    }
    this.downLoadFormConfig = formConfig(this.$route.params.tableName).formConfig
    // self.downLoadFormConfig = formConfig('IP_C_VIP_PRO').formConfig
  },
  methods: {
    standardTimeConversiondateToStr(val) {
      let dateTime = new Date(val);
      let year = dateTime.getFullYear();
      let month = dateTime.getMonth() + 1; //js从0开始取
      let date = dateTime.getDate();
      let hour = dateTime.getHours();
      let minutes = dateTime.getMinutes();
      let second = dateTime.getSeconds();
      if (month < 10) {
        month = "0" + month;
      }
      if (date < 10) {
        date = "0" + date;
      }
      if (hour < 10) {
        hour = "0" + hour;
      }
      if (minutes < 10) {
        minutes = "0" + minutes;
      }
      if (second < 10) {
        second = "0" + second;
      }
      return (
        year +
        "-" +
        month +
        "-" +
        date +
        " " +
        hour +
        ":" +
        minutes +
        ":" +
        second
      );
    },
    downLoadOk() {
      const self = this;
      self.$emit("confirmImport");
      self.$emit("closeActionDialog");
    },
    downLoadCancel() {
      const self = this;
      self.$emit("confirmImport");
      self.$emit("closeActionDialog");
    },
    taskIDClick() {
      const self = this;
      self.$emit("confirmImport");
      self.$emit("closeActionDialog");
      this.downLoadModal = false;
      this.$store.commit("customize/TabOpen", {
        id: this.taskId,
        type: "singleView", //类型action
        name: "singleView",
        label: "接口下载任务表编辑", //tab中文名
        query: {
          id: this.taskId,
          pid: "24775",
          ptitle: "接口下载任务表",
          ptype: "table",
          tabTitle: "接口下载任务表编辑",
          tableName: "IP_T_CONSUMER_LOG"
        }
      });
    },
  }
};
</script>

<style >
.downLoadTaobaoOrder .burgeon-radio-group {
  display: flex !important;
}
.downLoadModal .burgeon-modal-wrap {
  /* z-index: 2019 !important; */
  /* top: -700px !important; */
}
.downLoadModal .taskID {
  color: blue;
  cursor: pointer;
}
</style>

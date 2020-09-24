<template>
  <div class="downLoadTaobaoOrder" style="width:400px">
    <jordanForm :formConfig="downLoadTaobaoOrderFormConfig"></jordanForm>
    <jordanBtn :btnConfig="downLoadTaobaoOrderBtnConfig"></jordanBtn>
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
import dateFuns from "@/assets/js/__utils__/date";
import jordanForm from "professionalComponents/jordanForm";
import jordanBtn from "professionalComponents/jordanButton";

export default {
  components: {
    jordanForm,
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
      downLoadTaobaoOrderBtnConfig: {
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
              let self = this;
              if (
                !self.downLoadTaobaoOrderFormConfig.formData[0].itemdata.pid
              ) {
                self.$Message.warning("请选择需要下载的店铺");
                return false;
              }
              if (
                self.downLoadTaobaoOrderFormConfig.formValue.startEndTimes
                  .length === 0 &&
                self.downLoadTaobaoOrderFormConfig.formValue.orderNum === ""
              ) {
                self.$Message.warning("请选择输入的日期或输入订单编号");
                return false;
              }
              let param = {
                shop_id:
                  self.downLoadTaobaoOrderFormConfig.formData[0].itemdata.pid,
                bill_no: self.downLoadTaobaoOrderFormConfig.formValue.orderNum, //订单编号
                start_time: self.standardTimeConversiondateToStr(
                  self.downLoadTaobaoOrderFormConfig.formValue.startEndTimes[0]
                ), //开始时间
                end_time: self.standardTimeConversiondateToStr(
                  self.downLoadTaobaoOrderFormConfig.formValue.startEndTimes[1]
                ), //结束时间
                status:
                  self.downLoadTaobaoOrderFormConfig.formValue.orderStatus, //状态 必传 给默认值
                table: self.tablename //当前表名 必传
              };
              let fromdata = new FormData();
              fromdata.append("param", JSON.stringify(param));
              axios({
                url: "/p/cs/orderDownload",
                method: "post",
                data: fromdata
              }).then(function(res) {
                console.log(res);
                if (res.data.code === 0) {
                  // self.$Message.success(res.data.message);
                  self.taskId = res.data.message.match(/\d+/)[0];
                  self.downLoadModal = true;
                } else {
                  self.$Message.error(res.data.message);
                }
              });
            } //按钮点击事件
          },
          {
            type: "", //按钮类型
            text: "取消", //按钮文本
            icon: "", //按钮图标
            size: "", //按钮大小
            disabled: false, //按钮禁用控制
            btnclick: () => {
              this.$emit("closeActionDialog");
            } //按钮点击事件
          }
        ]
      },
      downLoadTaobaoOrderFormConfig: {
        formValue: {
          orderStatus: "WAIT_SELLER_SEND_GOODS",
          startEndTimes: [],
          orderNum: "",
          dta: "1"
        },
        formData: [
          {
            style: "popInput", //输入框弹框单多选
            width: "24",
            value: "dta",
            inputList: [
              {
                childs: [{ colname: "CP_C_SHOP_ID", refobjid: 2, valuedata: 2 }]
              }
            ],
            isActive: true,
            isdisabled: false,
            itemdata: {
              col: 1,
              colid: 167606,
              colname: "CP_C_SHOP_ID", //当前字段的名称
              datelimit: "all",
              refcolval: {
                fixcolumn: "CP_C_PLATFORM_ID",
                expre: "equal",
                srccol: "CP_C_SHOP_ID"
              },
              display: "text", //显示什么类型，例如xml表示弹窗多选加导入功能，mrp表示下拉多选
              fkdisplay: "drp", //外键关联类型
              fkdesc: "店铺",
              inputname: "CP_C_SHOP_ID", //这个是做中文类型的模糊查询字段，例如ENAME
              isfk: true, //是否有fk键
              isnotnull: false, //是否必填
              isuppercase: false, //是否转大写
              length: 65535, //最大长度是多少
              name: "店铺", //input前面显示的lable值
              readonly: false, //是否可编辑，对应input   readonly属性
              reftable: "CP_C_SHOP",
              reftableid: 24475,
              row: 1,
              statsize: -1,
              type: "STRING",
              valuedata: "" //这个是选择的值
            }
          },
          {
            style: "radio", //单选框
            label: "订单状态", //前面字段
            width: "6", //宽度
            value: "orderStatus", //绑定到formValue的值
            // radioChange: ()=>{alert('123')}, //切换时的方法
            // setRequired: "required", //必选标识,值不为required时无标识
            options: [
              {
                label: "全部",
                value: ""
              },
              {
                label: "待发货",
                value: "WAIT_SELLER_SEND_GOODS"
              }
            ]
          },
          {
            style: "date",
            type: "datetimerange", //日期组件类型,默认为data  (daterange)为双日期区间选择
            value: "startEndTimes",
            label: "平台修改时间",
            width: "24",
            format: "yyyy-MM-dd HH:mm:ss", //格式参照burgeonui
            placeholder: ""
          },
          {
            style: "input", //输入框类型
            label: "平台单号", //输入框前文字
            value: "orderNum", //输入框的值
            width: "24", //所占的宽度 (宽度分为24份,数值代表所占份数的宽度)
            icon: "", //输入框后带的图标,暂只有输入框支持
            placeholder: "", //占位文本，默认为请输入
            ghost: false, //是否关闭幽灵按钮，默认开启
            inputenter: () => {}, //表单回车事件
            iconclick: () => {} //点击icon图标事件
            // setRequired: "required" //必选标识,值不为required时无标识
          }
        ]
      }
    };
  },

  methods: {
    standardTimeConversiondateToStr(val) {
      var dateTime = new Date(val);
      var year = dateTime.getFullYear();
      var month = dateTime.getMonth() + 1; //js从0开始取
      var date = dateTime.getDate();
      var hour = dateTime.getHours();
      var minutes = dateTime.getMinutes();
      var second = dateTime.getSeconds();
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
      this.$store.commit("TabOpen", {
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
    }
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

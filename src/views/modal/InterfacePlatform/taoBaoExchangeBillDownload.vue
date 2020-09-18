<template>
  <!-- // 淘宝换货单下载 -->
  <div class="taobao-exchange-bill-download">
    <jordanForm :formConfig="taoBaoExchangeBillFormConfig"></jordanForm>
    <jordanBtn :btnConfig="taoBaoExchangeBillBtnConfig"></jordanBtn>
  </div>
</template>
<script>
import axios from "axios";
import jordanForm from "@/jordanComponent/jordanForm";
import jordanBtn from "@/jordanComponent/jordanButton";
export default {
  components: {
    jordanForm,
    jordanBtn
  },
  data() {
    return {
      taoBaoExchangeBillBtnConfig: {
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
              this.printData();
            }
          },
          {
            type: "", //按钮类型
            text: "取消", //按钮文本
            icon: "", //按钮图标
            size: "", //按钮大小
            disabled: false, //按钮禁用控制
            btnclick: () => {
              this.$parent.$parent.actionDialog.show = false;
            } //按钮点击事件
          }
        ]
      },
      taoBaoExchangeBillFormConfig: {
        formValue: {
          shop_id: "", //店铺id
          status: "", //状态
          timerange: [], //时间区间
          bill_no: "", //退单单号
        },
        formData: [
          {
            style: "popInput", //输入框弹框单多选
            width: "24",
            isActive: true,
            isdisabled: false,
            itemdata: {
              col: 1,
              colid: 167606,
              colname: "CP_C_SHOP_ID", //当前字段的名称
              datelimit: "all",
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
            style: "radio", //输入框类型
            label: "换货单状态", //输入框前文字
            value: "status", //输入框的值
            width: "24", //所占的宽度 (宽度分为24份,数值代表所占份数的宽度)
            options: [
              //radio选项
              {
                label: "全部",
                value: ""
              },
              {
                label: "换货待处理",
                value: "1"
              }
            ]
          },
          {
            style: "date", //输入框类型
            label: "换货单修改时间", //输入框前文字
            value: "timerange", //输入框的值
            type: "datetimerange",
            width: "24", //所占的宽度 (宽度分为24份,数值代表所占份数的宽度)
            format: "yyyy-MM-dd HH:mm:ss" //时间格式
          },
          {
            style: "input", //输入框类型
            label: "平台换货单号", //输入框前文字
            value: "bill_no", //输入框的值
            width: "24", //所占的宽度 (宽度分为24份,数值代表所占份数的宽度)
            icon: "", //输入框后带的图标,暂只有输入框支持
            placeholder: "", //占位文本，默认为请输入
            ghost: false, //是否关闭幽灵按钮，默认开启
            inputenter: () => {}, //表单回车事件
            iconclick: () => {} //点击icon图标事件
          }
        ]
      }
    };
  },
  methods: {
    //输入框下拉多选的操作 店铺下拉时触发的事件
    // mutipleSelect(val) {
    //   this.taoBaoExchangeBillFormConfig.formValue.shop_id = val.pid;
    // },
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
    // 打印
    printData() {
      if (!this.taoBaoExchangeBillFormConfig.formData[0].itemdata.pid) {
        this.$Message.warning("请选择需要下载的店铺");
        return false;
      }
      if (
        this.taoBaoExchangeBillFormConfig.formValue.bill_no === "" &&
        this.taoBaoExchangeBillFormConfig.formValue.timerange[0] === ""&& this.taoBaoExchangeBillFormConfig.formValue.timerange[1] === ""
      ) {
        this.$Message.warning("换单修改时间和换单单号不能同时为空");
        return false;
      }
      let param = {
        shop_id: this.taoBaoExchangeBillFormConfig.formData[0].itemdata.pid,
        bill_no: this.taoBaoExchangeBillFormConfig.formValue.bill_no,
        start_time:this.standardTimeConversiondateToStr(this.taoBaoExchangeBillFormConfig.formValue.timerange[0]),
        end_time:this.standardTimeConversiondateToStr(this.taoBaoExchangeBillFormConfig.formValue.timerange[1]),
        status: this.taoBaoExchangeBillFormConfig.formValue.status,
        table: "IP_B_TAOBAO_EXCHANGE"
      };
      let fromdata = new FormData();
      fromdata.append("param", JSON.stringify(param));
      axios({
        url: "/p/cs/exchangeDownload",
        method: "post",
        data: fromdata
      }).then(res => {
        if (res.data.code === 0) {
          this.$Message.success(res.data.message);
          this.$parent.$parent.actionDialog.show = false;
        } else {
          this.$Message.error(res.data.message);
        }
      });
    }
  }
};
</script>
<style lang="less">
.taobao-exchange-bill-download {
  width: 500px;
  .orderManageEdit .popInput .item-input .input-wrap .input-inner input {
    font-size: 12px;
  }
}
</style>



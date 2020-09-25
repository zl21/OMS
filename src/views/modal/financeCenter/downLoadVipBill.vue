<template>
  <!-- 下载账单 -->
  <div class="downLoadVipBill">
    <jordanForm :formConfig="downLoadVipBillFormConfig"></jordanForm>
    <jordanBtn :btnConfig="downLoadVipBillBtnConfig"></jordanBtn>
  </div>
</template>

<script>
import axios from "axios";
import jordanForm from "professionalComponents/jordanForm";
import jordanBtn from "professionalComponents/jordanButton";

export default {
  components: {
    jordanForm,
    jordanBtn
  },
  name: "downloadVipBill",
  data() {
    let _this = this;
    return {
      type: "", //月结:month 进度: progress
      downLoadVipBillFormConfig: {
        formValue: {
          type: "", //状态 月结账单,进度账单
          // vendorCode: "", //供应商编码
          timerange: [], //时间区间,
          bill_numbere: "" //账单编码
        },
        formData: [
          // {
          //   style: "input", //输入框类型
          //   label: "供应商编码", //输入框前文字
          //   value: "vendorCode", //输入框的值
          //   clearable: true,
          //   regx: /[0-9a-zA-Z]/,
          //   width: "24", //所占的宽度 (宽度分为24份,数值代表所占份数的宽度)
          //   ghost: false, //是否关闭幽灵按钮，默认开启
          //   inputenter: () => {
          //   }, //表单回车事件
          //   iconclick: () => {
          //   } //点击icon图标事件
          // },
          {
            style: "popInput", //输入框弹框单多选
            width: "24",
            inputList: [
              {
                childs: [
                  { colname: "CP_C_SHOP_ID", refobjid: 19, valuedata: 2 }
                ]
              }
            ],
            itemdata: {
              col: 1,
              colid: 167606,
              colname: "CP_C_SHOP_ID", //当前字段的名称
              refcolval: {
                fixcolumn: "CP_C_PLATFORM_ID",
                expre: "equal",
                srccol: "CP_C_SHOP_ID"
              },
              datelimit: "all",
              display: "text", //显示什么类型，例如xml表示弹窗多选加导入功能，mrp表示下拉多选
              fkdisplay: "drp", //外键关联类型
              fkdesc: "店铺",
              inputname: "CP_C_SHOP_ID", //这个是做中文类型的模糊查询字段，例如ENAME
              isfk: true, //是否有fk键
              isnotnull: true, //是否必填
              isuppercase: false, //是否转大写
              length: 65535, //最大长度是多少
              name: "店铺", //input前面显示的lable值
              readonly: false, //是否可编辑，对应input   readonly属性
              reftable: "CP_C_SHOP",
              reftableid: 24475,
              row: 1,
              statsize: -1,
              type: "STRING",
              pid: "",
              valuedata: "" //这个是选择的值
            },
            oneObj: val => {
              _this.downLoadVipBillFormConfig.formValue.CP_C_SHOP_ID = val.pid;
            }
          },
          {
            style: "radio", //输入框类型
            label: "下载方式", //输入框前文字
            value: "type", //输入框的值
            width: "24", //所占的宽度 (宽度分为24份,数值代表所占份数的宽度)
            options: [
              //radio选项
              {
                label: "",
                value: ""
              }
            ]
          },
          {
            style: "date", //输入框类型
            label: "账单时间", //输入框前文字
            value: "timerange", //输入框的值
            type: "datetimerange",
            width: "24", //所占的宽度 (宽度分为24份,数值代表所占份数的宽度)
            format: "yyyy-MM-dd HH:mm:ss" //时间格式
          },
          {
            style: "input", //输入框类型
            label: "账单编码", //输入框前文字
            value: "bill_numbere", //输入框的值
            clearable: true,
            width: "24", //所占的宽度 (宽度分为24份,数值代表所占份数的宽度)
            inputenter: () => {}
          }
        ],
        ruleValidate: {
          timerange: [{ required: true, message: " ", trigger: "blur" }]
        }
      },
      downLoadVipBillBtnConfig: {
        typeAll: "error", //按钮统一风格样式
        btnsite: "right", //按钮位置 (right , center , left)
        buttons: [
          {
            type: "", //按钮类型
            text: "立即下载", //按钮文本
            icon: "", //按钮图标
            size: "", //按钮大小
            disabled: false, //按钮禁用控制
            btnclick: () => {
              this.printData();
            } //按钮点击事件
          },{
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
      }
    };
  },
  methods: {
    // // 数组标准时间转换成yyyy-mm-dd格式
    // standardTimeConversiondateToStr(val) {
    //   var dateTime = new Date(val);
    //   var year = dateTime.getFullYear();
    //   var month = dateTime.getMonth() + 1; //js从0开始取
    //   var date = dateTime.getDate();
    //   var hour = dateTime.getHours();
    //   var minutes = dateTime.getMinutes();
    //   var second = dateTime.getSeconds();
    //   if (month < 10) {
    //     month = "0" + month;
    //   }
    //   if (date < 10) {
    //     date = "0" + date;
    //   }
    //   if (hour < 10) {
    //     hour = "0" + hour;
    //   }
    //   if (minutes < 10) {
    //     minutes = "0" + minutes;
    //   }
    //   if (second < 10) {
    //     second = "0" + second;
    //   }
    //   return (
    //     year +
    //     "-" +
    //     month +
    //     "-" +
    //     date +
    //     " " +
    //     hour +
    //     ":" +
    //     minutes +
    //     ":" +
    //     second
    //   );
    // },
    // 打印
    printData() {
      // if (!this.downLoadVipBillFormConfig.formValue.vendorCode) {
      //   this.$Message.warning("请输入需要下载的供应商编码!");
      //   return false;
      // }
      let formValue = this.downLoadVipBillFormConfig.formValue;
      let startTime = formValue.timerange[0];
      let endTime = formValue.timerange[1];
      if (this.downLoadVipBillFormConfig.formData[0].itemdata.pid == "") {
        this.$Message.warning("请输入需要下载的店铺!");
        return false;
      }
      if (
        startTime === "" &&
        endTime === "" &&
        !this.downLoadVipBillFormConfig.formValue.bill_numbere
      ) {
        this.$Message.warning("账单时间账单编码不能同时为空!");
        return false;
      } else {
        // 如果没填写账单编码,则对时间格式进行判断
        if (!this.downLoadVipBillFormConfig.formValue.bill_numbere) {
          if (startTime === "" && endTime === "") {
            this.$Message.warning("账单时间不能为空");
            return false;
          }
          //账单时间不能跨月
          if (
            formValue.type === "billDownload" &&
            startTime.getMonth() != endTime.getMonth()
          ) {
            this.$Message.warning("账单时间不能跨月");
            return false;
          }
          //账单时间不能超过11天
          if (
            formValue.type === "billDownload" &&
            endTime - startTime > 1000 * 60 * 60 * 24 * 11
          ) {
            this.$Message.warning("账单时间段天数要小于等于11天");
            return false;
          }
        }
      }
      let param = {
        // vendorCode: this.downLoadVipBillFormConfig.formValue.vendorCode,
        shop_id: this.downLoadVipBillFormConfig.formData[0].itemdata.pid,
        type: this.downLoadVipBillFormConfig.formValue.type,
        start_time: startTime
          ? this.$comUtils.dateFormat(startTime, "yyyy-MM-dd hh:mm:ss")
          : "",
        end_time: endTime
          ? this.$comUtils.dateFormat(endTime, "yyyy-MM-dd hh:mm:ss")
          : "",
        bill_numbere: this.downLoadVipBillFormConfig.formValue.bill_numbere
      };
      let fromdata = new FormData();
      fromdata.append("param", JSON.stringify(param));
      axios({
        url: "/p/cs/ac/v1/triggerVipBill",
        method: "post",
        data: fromdata
      }).then(res => {
        if (res.data.data.Code === 0) {
          this.$Message.success(res.data.data.Execmsg);
          this.$parent.$parent.actionDialog.show = false;
        } else {
          this.$Message.error(res.data.data.Execmsg);
        }
      });
    }
  },
  mounted() {
    window.downLoadVipBill = this;
    // 月结,进度
    if (this.$route.path == "/m/table/AC_F_VIP_BILL_MONTH") {
      this.downLoadVipBillFormConfig.formValue.type = "billMonthDownload";
      this.downLoadVipBillFormConfig.formData[1].options[0].label =
        "月结账单下载";
      this.downLoadVipBillFormConfig.formData[1].options[0].value =
        "billMonthDownload";
    } else {
      this.downLoadVipBillFormConfig.formValue.type = "billDownload";
      this.downLoadVipBillFormConfig.formData[1].options[0].label =
        "进度账单下载";
      this.downLoadVipBillFormConfig.formData[1].options[0].value =
        "billDownload";
    }
    window.downloadVipBill = this;
  }
};
</script>

<style lang="less" scoped>
.downLoadVipBill {
  width: 500px;

  .button {
    display: flex;
    justify-content: space-around;
  }
}
</style>

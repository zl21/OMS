<template>
  <!-- 下载账单 -->
  <div class="generateSalesOrder" v-loading="pageLoad" style="width:400px;padding-right:20px">
    <jordanForm :formConfig="generateFormConfig"></jordanForm>
    <jordanBtn :btnConfig="generateBtnConfig"></jordanBtn>
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
  name: "generateSalesOrder",
  data() {
    return {
      pageLoad: false,
      type: "", //月结:month 进度: progress
      generateFormConfig: {
        formValue: {
          vendorId: "", //供应商编码
          type: "", //状态
          billnumber: "" // 账单编码
        },
        formData: [
          {
            style: "select", //下拉框类型
            label: "供应商ID", //下拉框前的值
            width: "24", //所占宽度宽度
            value: "vendorId", //输入框的值
            multiple: false, //布尔值,下拉框是否开启多选,默认为不开启
            disabled: false, //是否禁用,默认为false
            clearable: true, //下拉选中是否显示清空按钮,默认为false
            clearSelect: () => {}, //点击清空按钮回调
            selectChange: value => {}, // 选中事件，默认返回选中的值,默认返回当前值value
            setRequired: "required", //必选标识,值不为required时无标识
            options: [
            ]
          },
          {
            style: "select", //下拉框类型
            label: "账单编码", //下拉框前的值
            width: "24", //所占宽度宽度
            value: "billNumber", //输入框的值
            multiple: false,
            options: [],
            selectChange: e => {
              console.log(e);
              // this.formConfig.formValue.billNumber =
            }
          }
        ]
      },
      generateBtnConfig: {
        typeAll: "error", //按钮统一风格样式
        btnsite: "right", //按钮位置 (right , center , left)
        buttons: [
          {
            type: "", //按钮类型
            text: "生成", //按钮文本
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
    init() {
      this.setFormValueType();
      this.getBillMonthAndVendorIds();
    },
    // 月结,进度
    setFormValueType() {
      if (this.$route.params.tableName == "AC_F_VIP_BILL_MONTH_AGGREGATE") {
        // 月结
        this.generateFormConfig.formValue.type = "1";
      } else {
        // 进度
        this.generateFormConfig.formValue.type = "2";
      }
    },
    getBillMonthAndVendorIds() {
      let params = {
        param: {
          type: this.generateFormConfig.formValue.type
        }
      };
      this.pageLoad = true;
      R3.network.get("/p/cs/ac/v1/getVendorCodeAndBillNumber", { params })
        .then(res => {
          this.pageLoad = false;
          let resData = res.data.data;
          if (resData.code === 0) {
            console.log(resData);
            this.generateFormConfig.formData[0].options = resData.data.vendorIds.map(
              item => ({
                label: String(item),
                value: String(item)
              })
            );
            this.generateFormConfig.formData[1].options = resData.data.billNumbers.map(
              item => ({
                label: item,
                value: item
              })
            );
          } else {
            this.$Message.error(res.data.message);
          }
        });
    },
    // 打印
    printData() {
      let formValue = this.generateFormConfig.formValue;
      if (!formValue.vendorId) {
        this.$Message.warning("供应商ID不能为空!");
        return false;
      }
      if (!formValue.billNumber) {
        this.$Message.warning("账单编码不能为空!");
        return false;
      }
      let params = {
        param: {
          type: formValue.type,
          vendorId: formValue.vendorId,
          billNumber: formValue.billNumber
        }
      };
      R3.network.get("/p/cs/ac/v1/generateVipSalesOrder", { params })
        .then(res => {
          if (res.data.data.code === 0) {
            this.$Message.success(res.data.data.message);
            this.$parent.$parent.actionDialog.show = false;
          } else {
            this.$Message.error(res.data.data.message);
          }
        });
    }
  },
  mounted() {
    window.generateSalesOrder = this;
    this.init();
  }
};
</script>

<style lang="less" scoped>
.generateSalesOrder {
  width: 500px;

  .button {
    display: flex;
    justify-content: space-around;
  }
}
</style>

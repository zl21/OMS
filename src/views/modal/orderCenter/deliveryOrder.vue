<template>
  <div style="width:400px;padding-right:20px">
    <jordanForm :formConfig="formConfig"></jordanForm>
    <jordanBtn :btnConfig="btnConfig"></jordanBtn>
  </div>
</template>

<script>
import axios from "axios";
import jordanForm from "professionalComponents/jordanForm";
import jordanBtn from "professionalComponents/jordanButton";
export default {
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
    }
  },
  components: {
    jordanForm,
    jordanBtn
  },
  data() {
    return {
      btnConfig: {
        typeAll: "error", //按钮统一风格样式
        btnsite: "right", //按钮位置 (right , center , left)
        buttons: [
          {
            type: "", //按钮类型
            text: "确定", //按钮文本
            icon: "", //按钮图标
            size: "", //按钮大小
            disabled: false, //按钮禁用控制
            btnclick: () => {
              let self = this;
              let valuedata = self.formConfig.formData[0].itemdata.valuedata;
              let pid = self.formConfig.formData[0].itemdata.pid;
              let param = {
                deliver_id: pid,
                delivery_no:valuedata,
                ids: self.idArr
              };
              let formdata = new FormData();
              formdata.append("param", JSON.stringify(param));
              if (valuedata === "" || pid === "") {
                self.$Message.warning("出仓单不能为空");
              }
              axios({
                url: "/api/cs/vip/distribution/v1/matchingDelivery",
                method: "post",
                data: formdata
              }).then(res => {
                console.log(res);
                if (res.data.code === 0) {
                  self.$Message.success(res.data.message);
                  self.$emit("confirmImport");
                } else {
                  self.$Message.error(res.data.message);
                  this.$emit('uploadError', res.data.data);
                }
                self.$emit("closeActionDialog");
              });
            }
          },
          {
            type: "", //按钮类型
            text: "取消", //按钮文本
            icon: "", //按钮图标
            size: "", //按钮大小
            disabled: false, //按钮禁用控制
            btnclick: () => {
              this.$emit("closeActionDialog");
            }
          }
        ]
      },
      formConfig: {
        formValue: {},
        formData: [
          {
            style: "popInput", //输入框弹框单多选
            width: "24",
            isActive: true,
            isdisabled: false,
            inputList: [
              {
                childs: [{ colname: "OC_B_VIPCOM_DELIVERY_ID", refobjid: 0, valuedata: 2 }]
              }
            ],
            itemdata: {
              col: 1,
              colid: 173684,
              colname: "OC_B_VIPCOM_DELIVERY_ID", //当前字段的名称
              datelimit: "all",
              refcolval: {
                fixcolumn: "STATUS",
                expre: "equal",
                srccol: "OC_B_VIPCOM_DELIVERY_ID"
              },
              display: "text", //显示什么类型，例如xml表示弹窗多选加导入功能，mrp表示下拉多选
              fkdisplay: "drp", //外键关联类型
              fkdesc: "出仓单",
              inputname: "OC_B_VIPCOM_DELIVERY_ID", //这个是做中文类型的模糊查询字段，例如ENAME
              isfk: true, //是否有fk键
              isnotnull: true, //是否必填
              isuppercase: false, //是否转大写
              length: 65535, //最大长度是多少
              name: "出仓单", //input前面显示的lable值
              readonly: false, //是否可编辑，对应input   readonly属性
              reftable: "OC_B_VIPCOM_DELIVERY", //对应的表
              reftableid: 24652, //对应的表ID
              row: 1,
              statsize: -1,
              type: "STRING",
              valuedata: "" //这个是选择的值
            }
          },
        ]
      }
    };
  },
  mounted() {
    let self = this;
    console.log(self.idArr);
  }
};
</script>
<style>
</style>

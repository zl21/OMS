<template>
  <div style="width:430px;padding-right:20px">
    <jordanForm :formConfig="downLoadFormConfig"></jordanForm>
    <jordanBtn :btnConfig="downLoadBtnConfig"></jordanBtn>
  </div>
</template>

<script>
import axios from "axios";
import dateUtil from "@/customize/customizedModal/customizePateFor1.3/returngood/js/date.js";
import jordanForm from "@/jordanComponent/jordanForm";
import jordanBtn from "@/jordanComponent/jordanButton";
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
              let self = this;
              if (
                !self.downLoadFormConfig.formData[0].itemdata.pid
              ) {
                self.$Message.warning("请选择需要下载的店铺");
                return false;
              }
              let startTime = self.downLoadFormConfig.formValue.query_date[0];
              let endTime = self.downLoadFormConfig.formValue.query_date[1];
              if(startTime){
                startTime = dateUtil.getFormatDate(startTime,'yyyy-MM-dd HH:mm:ss');
              }
              if(endTime){
                endTime = dateUtil.getFormatDate(endTime,'yyyy-MM-dd HH:mm:ss');
              }
              let param = {
                shop_id: self.downLoadFormConfig.formData[0].itemdata.pid, // 店铺id 必传
                order_status: self.downLoadFormConfig.formValue.order_status,
                start_time:startTime,
                end_time:endTime
              };
              let fromdata = new FormData();
              fromdata.append("param", JSON.stringify(param));
              axios({
                url: "/p/cs/downLoadVipDelivery",
                method: "post",
                data: fromdata
              }).then(function(res) {
                if (res.data.code === 0) {
                  self.$Message.success(res.data.message);
                  self.$emit("confirmImport");
                  self.$emit("closeActionDialog");
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
      downLoadFormConfig: {
        formValue: {
          numNumber: ""
        },
        formData: [
          {
            style: "popInput", //输入框弹框单多选
            width: "24",
            isActive: true,
            isdisabled: false,
            inputList: [
              {
                childs: [{ colname: "CP_C_SHOP_ID", refobjid: 50, valuedata: 2 }]
              }
            ],
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
              valuedata: "" //这个是选择的值
            }
          },
          {
            style: 'radio', //单选框
            label: '订单状态', //前面字段
            width: '24', //宽度
            value: 'order_status', //绑定到formValue的值
            setRequired: '', //必选标识,值不为required时无标识
            options: [  //radio选项
              {
                value: "NEW",
                label: "新建",
              },
              {
                value: "CONFIRMING",
                label: "确认中",
              },
              {
                value: "CONFIRMED",
                label: "确认为JITX",
              },
              {
                value: "ROLLBACK",
                label: "确认为非JITX",
              }
            ]
          },
          {
            style: "date",
            type: "datetimerange", //日期组件类型,默认为data  (daterange)为双日期区间选择
            value: "query_date",
            label: "查询时间",
            width: "24",
            format: "yyyy-MM-dd HH:mm:ss", //格式参照burgeonui
            placeholder: ""
          },
        ],
        //表单非空提示
        ruleValidate: {
          numNumber: [{ required: true, message: " ", trigger: "blur" }]
        }
      }
    };
  },
  mounted() {
    let self = this;
    self.downLoadFormConfig.formValue.order_status = "NEW";
  },
};
</script>

<style>
</style>

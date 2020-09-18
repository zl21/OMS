<template>
  <div style="width:400px;">
    <jordanForm :formConfig="pickorderFromConfig"></jordanForm>
    <jordanBtn :btnConfig="pickorderBtnConfig"></jordanBtn>
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

  data() {
    return {
      pickorderBtnConfig: {
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
              let promptMessage = ""; //非空提示信息
              if (!self.pickorderFromConfig.formData[1].itemdata.pid) {
                promptMessage = "店铺";
              }else if(!self.pickorderFromConfig.formValue.TYPE){
                promptMessage = "配送方式";
              }
              if(self.pickorderFromConfig.formValue.TYPE === "0"){
                if(!self.pickorderFromConfig.formValue.PICK_NO){
                  promptMessage = "拣货单号";
                }
              }else if(self.pickorderFromConfig.formValue.TYPE === "1"){
                if(!self.pickorderFromConfig.formValue.PO_NO){
                  promptMessage = "PO";
                }
              }
              if (promptMessage) {
                this.$Message.warning(promptMessage + "不能为空");
                return;
              }
              let fromdata = new FormData();
              let param = {
                CP_C_SHOP_ID:  self.pickorderFromConfig.formData[1].itemdata.pid,
                TYPE:self.pickorderFromConfig.formValue.TYPE,
                PICK_NO:self.pickorderFromConfig.formValue.PICK_NO,
                PO_NO:self.pickorderFromConfig.formValue.PO_NO
              };
              fromdata.append("param", JSON.stringify(param));
              axios({
                url: "/api/cs/vip/pick/v1/downloadPick",
                method: "post",
                data: fromdata
              }).then(function(res) {
                if (res.data.data.code === 0) {
                  self.$Message.success(res.data.data.message);
                  self.$emit("confirmImport");
                  self.$emit("closeActionDialog");
                } else {
                  self.$Message.error(res.data.data.message);
                  self.$emit('uploadError', res.data.data.data);
                  self.$emit("closeActionDialog");
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
      pickorderFromConfig: {
        formValue: {
          TYPE: "",
          PICK_NO: "",
          PO_NO: "",
          CP_C_SHOP_ID: "",
        },
        ruleValidate: {
          TYPE:[
            {required: true}
          ],
          PO_NO:[
            {required: true}
          ],
          PICK_NO:[
            {required: true}
          ]
        },
        formData: [
          {
            style: 'radio', //单选框
            label: '下载类型', //前面字段
            width: '24', //宽度
            value: 'TYPE', //绑定到formValue的值
            radioChange: ()=>{
              let self = this;
              self.setInputDisplay();
            }, //切换时的方法
            setRequired: '', //必选标识,值不为required时无标识
            options: [  //radio选项
              {
                value: "0",
                label: "仅下载拣货单",
                disabled:false
              },
              {
                value: "1",
                label: "创建并下载拣货单",
                disabled:false
              }
            ]
          },
          {
            style: "popInput", //输入框弹框单多选
            width: "24",
            inputList: [
              {
                childs: [{ colname: "CP_C_SHOP_ID", refobjid: 'IN (19,999999)', valuedata: 2 }]
              }
            ],
            itemdata: {
              col: 1,
              colid: 167606,
              colname: "CP_C_SHOP_ID", //当前字段的名称
              refcolval: {
                fixcolumn: "CP_C_PLATFORM_ID",
                // expre: "equal",
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
              valuedata: "" //这个是选择的值
            },
            oneObj:(val)=>{
              this.pickorderFromConfig.formValue.CP_C_SHOP_ID = val.pid;
            }
          },
          {
            style: "input",
            label: "PO",
            value: "PO_NO",
            width: "24"
          },
          {
            style: "input",
            label: "拣货单号",
            value: "PICK_NO",
            width: "24"
          }
        ]
      }
    };
  },
  mounted() {
    let self = this;
    self.pickorderFromConfig.formValue.TYPE = "0";
    self.setInputDisplay();
  },
  methods: {
    setInputDisplay(){
      let self = this;
      let type = self.pickorderFromConfig.formValue.TYPE;
      let poNoData = self.pickorderFromConfig.formData.filter(
        item => item.value === "PO_NO"
      );
      let pickNoData = self.pickorderFromConfig.formData.filter(
        item => item.value === "PICK_NO"
      );
      if(type === '0'){
        poNoData[0].style = "";
        pickNoData[0].style = "input";
        self.pickorderFromConfig.formValue.PO_NO = "";
      }else{
        poNoData[0].style = "input";
        pickNoData[0].style = "";
        self.pickorderFromConfig.formValue.PICK_NO = "";
      }

    }
  }
};
</script>

<style>
</style>

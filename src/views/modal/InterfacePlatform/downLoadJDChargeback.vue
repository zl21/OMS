<template>
  <div style="width:450px">
    <jordanForm :formConfig="formConfig"></jordanForm>
    <jordanBtn :btnConfig="btnConfig"></jordanBtn>
  </div>
</template>

<script>
import httpServer from 'framework/__utils__/request';
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
      btnConfig: {
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
              this.confirmChange()
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
            } //按钮点击事件
          }
        ]
      },
      formConfig: {
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
                childs: [{ colname: "CP_C_SHOP_ID", refobjid: 4, valuedata: 2 }]
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
            style: "date",
            type: "datetimerange", //日期组件类型,默认为data  (daterange)为双日期区间选择
            value: "query_date",
            label: "平台时间",
            width: "24",
            format: "yyyy-MM-dd HH:mm:ss", //格式参照burgeonui
            placeholder: ""
          }
        ],
        //表单非空提示
        ruleValidate: {
          numNumber: [{ required: true, message: " ", trigger: "blur" }],
          'query_date': [{ required: true }]
        }
      }
    };
  },
  methods: {
    confirmChange() {
      let formValue = this.formConfig.formValue
      let shopId = this.formConfig.formData[0].itemdata.pid
      if (!shopId || !formValue.query_date[0]) {
        this.$message.error('店铺和平台时间不能为空')
        return
      }
      let params = JSON.stringify({
        "table": this.tablename,
        "shop_id": shopId,
        "start_time": this.$comUtils.dateFormat(formValue.query_date[0], 'yyyy-MM-dd hh:mm:ss'),
        "end_time": this.$comUtils.dateFormat(formValue.query_date[1], 'yyyy-MM-dd hh:mm:ss')
      })
      this.dialogLoad = true
      httpServer({
        url: '/p/cs/refundDownload',
        method: 'post',
        data: {
          param: params
        }
      }).then(res => {
        this.dialogLoad = false
        if (res.data.code === 0) {
          this.$message.success(res.data.message)
          this.$emit('confirmImport')
          this.$emit('closeActionDialog')
        }
      }).catch(() => {
        this.dialogLoad = false
      })
    }
  }
};
</script>

<style>
</style>

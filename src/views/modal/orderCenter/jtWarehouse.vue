<template>
  <div style="width: 400px; padding-right: 20px">
    <businessForm :formConfig="warehouseManagementFromConfig"></businessForm>
    <jordanBtn :btnConfig="warehouseManagementBtnConfig"></jordanBtn>
  </div>
</template>

<script>
import axios from "axios";
import businessForm from "professionalComponents/businessForm";
import jordanBtn from "professionalComponents/businessButton";
export default {
  components: {
    businessForm,
    jordanBtn,
  },
  props: {},

  data() {
    return {
      vmI18n: window.vmI18n,
      warehouseManagementBtnConfig: {
        typeAll: "error", //按钮统一风格样式
        btnsite: "right", //按钮位置 (right , center , left)
        buttons: [
          {
            type: "", //按钮类型
            // text: "确定", //按钮文本
            text: vmI18n.t("common.determine"), //按钮文本
            icon: "", //按钮图标
            size: "", //按钮大小
            disabled: false, //按钮禁用控制
            btnclick: () => {
              let self = this;
              let promptMessage = ""; //非空提示信息
              let formData = formData;
              if (!formData[0].itemdata.pid) {
                // promptMessage = "店铺";
                promptMessage = vmI18n.t("other.shop");
              } else if (!formData[1].itemdata.pid) {
                // promptMessage = "档期日程归属";
                promptMessage = vmI18n.t("form_label.scheduleOwnership");
              } else if (!formData[2].itemdata.pid) {
                // promptMessage = "实体仓库";
                promptMessage = vmI18n.t("table_label.physical_warehouse");
              } else if (
                !self.warehouseManagementFromConfig.formValue.DELIVERYTYPE
              ) {
                // promptMessage = "配送方式";
                promptMessage = vmI18n.t("form_label.distributionMode");
              }
              if (promptMessage) {
                // this.$Message.warning(promptMessage + "不能为空");
                this.$Message.warning(promptMessage + vmI18n.t("modalTips.y1"));
                return;
              }
              let fromdata = new FormData();
              let param = {
                CPCSHOPID: formData[0].itemdata.pid, //店铺id
                ASCRIPTIONID: formData[1].itemdata.pid, //日程档案id
                WAHOUSEID: self.$store.state[
                  getModuleName()
                ].buttons.selectIdArr.join(","), //列表中选中的数据id
                PHYWAREHOUSE: formData[2].itemdata.pid, //实体店仓id
                DELIVERYTYPE:
                  self.warehouseManagementFromConfig.formValue.DELIVERYTYPE, //配送方式
              };
              fromdata.append("param", JSON.stringify(param));
              axios({
                url: "/api/cs/vip/delivery/v1/generateOutOrder",
                method: "post",
                data: fromdata,
              }).then(function (res) {
                if (res.data.data.code === 0) {
                  self.$Message.success(res.data.data.message);
                  self.$emit("confirmImport");
                  self.$emit("closeActionDialog");
                } else {
                  self.$Message.error(res.data.data.message);
                  self.$emit("uploadError", res.data.data.data);
                  self.$emit("closeActionDialog");
                }
              });
            }, //按钮点击事件
          },
          {
            type: "", //按钮类型
            // text: "取消", //按钮文本
            text: vmI18n.t("common.cancel"), //按钮文本
            icon: "", //按钮图标
            size: "", //按钮大小
            disabled: false, //按钮禁用控制
            btnclick: () => {
              this.$emit("closeActionDialog");
            }, //按钮点击事件
          },
        ],
      },
      warehouseManagementFromConfig: {
        formValue: {
          DELIVERYTYPE: "",
        },
        ruleValidate: {
          DELIVERYTYPE: [{ required: true }],
        },
        formData: [
          {
            style: "popInput", //输入框弹框单多选
            width: "24",
            inputList: [
              {
                childs: [
                  {
                    colname: "CP_C_SHOP_ID",
                    refobjid: "IN (19,999999)",
                    valuedata: 2,
                  },
                ],
              },
            ],
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
              isnotnull: true, //是否必填
              isuppercase: false, //是否转大写
              length: 65535, //最大长度是多少
              // name: "店铺", //input前面显示的lable值
              name: vmI18n.t("other.shop"),
              readonly: false, //是否可编辑，对应input   readonly属性
              reftable: "CP_C_SHOP",
              reftableid: 24475,
              row: 1,
              statsize: -1,
              type: "STRING",
              valuedata: "", //这个是选择的值
              refcolval: {
                fixcolumn: "CP_C_PLATFORM_ID",
                // expre: "equal",
                srccol: "CP_C_SHOP_ID",
              },
            },
          },
          {
            style: "popInput", //输入框弹框单多选
            width: "24",
            itemdata: {
              col: 1,
              colid: 168138,
              colname: "ST_C_VIPCOM_ASCRIPTION_ID", //当前字段的名称
              datelimit: "all",
              display: "text", //显示什么类型，例如xml表示弹窗多选加导入功能，mrp表示下拉多选
              fkdisplay: "drp", //外键关联类型
              fkdesc: "日程归属",
              inputname: "ST_C_VIPCOM_PROJECT_ITEM", //这个是做中文类型的模糊查询字段，例如ENAME
              isfk: true, //是否有fk键
              isnotnull: true, //是否必填
              isuppercase: false, //是否转大写
              length: 65535, //最大长度是多少
              // name: "日程归属", //input前面显示的lable值
              name: vmI18n.t("form_label.ownership"),
              readonly: false, //是否可编辑，对应input   readonly属性
              reftable: "ST_C_VIPCOM_PROJECT_ITEM",
              reftableid: 24583,
              row: 1,
              statsize: -1,
              type: "STRING",
              valuedata: "", //这个是选择的值
            },
          },
          {
            style: "popInput", //输入框弹框单多选
            width: "24",
            itemdata: {
              col: 1,
              colid: 171222,
              colname: "CP_C_PHY_WAREHOUSE_ID", //当前字段的名称
              datelimit: "all",
              display: "text", //显示什么类型，例如xml表示弹窗多选加导入功能，mrp表示下拉多选
              fkdisplay: "drp", //外键关联类型
              fkdesc: "实体仓库",
              inputname: "ST_C_VIPCOM_PROJECT_ITEM", //这个是做中文类型的模糊查询字段，例如ENAME
              isfk: true, //是否有fk键
              isnotnull: true, //是否必填
              isuppercase: false, //是否转大写
              length: 65535, //最大长度是多少
              // name: "实体仓库", //input前面显示的lable值
              name: vmI18n.t("table_label.physical_warehouse"),
              readonly: false, //是否可编辑，对应input   readonly属性
              reftable: "CP_C_PHY_WAREHOUSE",
              reftableid: 24486,
              row: 1,
              statsize: -1,
              type: "STRING",
              valuedata: "", //这个是选择的值
            },
          },
          {
            style: "select", //下拉框类型
            // label: "配送方式", //下拉框前的值
            label: vmI18n.t("form_label.distributionMode"),
            width: "24", //所占宽度宽度
            value: "DELIVERYTYPE", //输入框的值
            multiple: false, //布尔值,下拉框是否开启多选,默认为不开启
            disabled: false, //是否禁用,默认为false
            clearable: true, //下拉选中是否显示清空按钮,默认为false
            clearSelect: () => {}, //点击清空按钮回调
            selectChange: (value) => {}, //选中事件，默认返回选中的值,默认返回当前值value
            options: [
              //下拉框选项值
            ],
          },
        ],
      },
    };
  },
  mounted() {
    this.getColOption();
  },
  methods: {
    //获取控件对应下拉选项值
    async getColOption() {
      let self = this;
      let fromdata = new FormData();
      fromdata.append("table", "ST_C_VIPCOM_PROJECT_ITEM");
      fromdata.append("objid", -1);
      fromdata.append("refcolid", 168046);
      fromdata.append(
        "searchdata",
        '{"column_include_uicontroller":true,"startindex":0,"fixedcolumns":{}}'
      );
      await axios({
        url: "/p/cs/objectTableItem",
        method: "post",
        data: fromdata,
      }).then(function (res) {
        if (res.data.code === 0) {
          let arr = "";
          res.data.datas.tabth.forEach((item) => {
            if (item.name === "配送方式") {
              arr = item.combobox;
            }
          });
          console.log(arr);
          arr.forEach((tem) => {
            tem.value = tem.limitval;
            tem.label = tem.limitdesc;
          });
          self.warehouseManagementFromConfig.formData[3].options = arr;
        }
      });
    },
  },
};
</script>

<style>
.burgeon-select-dropdown-transfer {
  z-index: 9999 !important;
}
</style>

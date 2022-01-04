<!--
 * @Author: your name
 * @Date: 2021-07-05 11:31:12
 * @LastEditTime: 2021-07-15 13:35:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /r3-web/src/views/modal/inventoryCenter/channelSkuBand.vue
-->
<template>
  <div class="channelSkuBand">
    <OmsForm :form-config="formConfig" class="channelSkuBand-form" />
    <OmsButton class="modal-footer" :btn-config="btnConfig" />
  </div>
</template>

<script>
// import myInput from "framework/components/input/objinput_dz.vue";

export default {
  components: {
    myInput: $R3_CPS.components.objinput_dz,
  },
  data() {
    return {
      formConfig: {
        formData: [
          {
            style: 'popInput', // 输入框类型
            width: '12',
            inputList: [], // 用于联动查询
            rules: true, //必选标识,值不为required时无标识
            itemdata: {
              colid: 174335, // 字段id
              colname: 'PS_C_BRAND', // 当前字段的名称 用来显示的
              display: 'text', // 显示什么类型，例如xml表示弹窗多选加导入功能，mrp表示下拉多选
              fkdisplay: 'drp', // 外键关联类型
              fkdesc: '平台店铺',
              inputname: 'PS_C_BRAND:ENAME', // 这个是做中文类型的模糊查询字段，例如ENAME
              isfk: true, // 是否有fk键
              isnotnull: true, // 是否必填
              name: "平台店铺", // 品牌
              readonly: false, // 是否可编辑，对应input readonly属性
              reftable: 'PS_C_BRAND', // 关联的表
              reftableid: 174335, // 关联的表ID
              pid: '', // 选择后选中数据的ID
              valuedata: '' // 选择后用于展示的值
            },
            oneObj: val => {

              this.formConfig.formValue.CP_C_SHOP_ID = val.pid
            }// 选中触发事件
          },
          {
            style: 'popInput_ld', // 输入框类型
            width: '12',
            inputList: [], // 用于联动查询
            class: "modal-mop",
            itemdata: {
              colid: 166758, // 字段id
              colname: 'PS_C_PRO', // 当前字段的名称 用来显示的
              display: 'text', // 显示什么类型，例如xml表示弹窗多选加导入功能，mrp表示下拉多选
              fkdisplay: 'mop', // 外键关联类型
              fkdesc: '品牌',
              inputname: 'PS_C_PRO:ENAME', // 这个是做中文类型的模糊查询字段，例如ENAME
              isfk: true, // 是否有fk键
              isnotnull: true, // 是否必填
              name: $it('tL.brand'), // 品牌
              readonly: false, // 是否可编辑，对应input readonly属性
              reftable: 'PS_C_PRO', // 关联的表
              reftableid: 23051, // 关联的表ID
              pid: '', // 选择后选中数据的ID
              valuedata: '' // 选择后用于展示的值
            },
            oneObj: val => {
              this.formConfig.formValue.PS_C_SPU_IDS = JSON.parse(val.pid).idArray.join(",")
            }// 选中触发事件
          }
        ],
        formValue: {
          CP_C_SHOP_ID: "",
          PS_C_SPU_IDS: "",
        },
        ruleValidate: {}
      },
      btnConfig: {
        typeAll: 'default', // 按钮统一风格样式
        btnsite: 'right', // 按钮位置 (right , center , left)
        buttons: [
          {
            webname: 'orderExport',
            text: '取消',
            btnclick: () => {
              // TODO
              this.$emit('closeActionDialog', false);
            }
          },
          {
            webname: 'iconbj_setup',
            text: '绑定',
            btnclick: () => {
              // TODO
              this.submit()
            }
          }
        ]
      }
    }
  },
  mounted(){
    this.init()
  },
  methods: {
    submit() {
      let param = {
        CP_C_SHOP_ID: this.formConfig.formValue.CP_C_SHOP_ID,
        PS_C_SPU_IDS: this.formConfig.formValue.PS_C_SPU_IDS
      }
      R3.network.post("/p/cs/sg/channel/shopAndSku/band", param).then(res => {
        if (res.data.code == 0) {
          this.$Message.success(res.data.message);
          this.$emit('closeActionDialog', false);
        }

      })

    },
    init(){
      let dom = document.getElementsByClassName("ark-modal-wrap")
       dom[0].classList.add("ZIndex")
    }
  },
  beforeDestroy(){  //修复方法解决遮造层级过高
     let dom = document.getElementsByClassName("ark-modal-wrap")
       dom[0].classList.remove("ZIndex")
  }

}
</script>

<style lang='less'>
.v-modal{
  z-index: 1000!important;
}
//.ZIndex { //解决遮造层级过高，用js修复
//  z-index: 3000 !important;
//}

.channelSkuBand {
  //.el-dialog {
  //  position: fixed !important;
  //  top: -150%;
  //  left: -40%;
  //}
  //.orderManageEdit .businessForm_a .popInput .item-input .fkdialog .title {
  //  width: inherit;
  //  padding: 0;
  //}
  .ark-form-item.modal-mop.popInput {
    .ark-form-item-content {
      margin-left: 0 !important;
    }
  }
}

</style>

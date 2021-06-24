<template>
  <div class="authinfodisplay">
    <businessForm :form-config="formconfig" @keyDown="keyDown"> </businessForm>
    <businessButton class="modal-footer" :btn-config="btnConfig" />
  </div>
</template>

<script>
import businessForm from 'professionalComponents/businessForm'
import businessButton from 'professionalComponents/businessButton'
import service from '@/service/index'

export default {
  components: {
    businessForm,
    businessButton
  },
  data() {
    return {
      formconfig: {
        formData: [
          {
            style: 'input',
            label: '店铺昵称',
            value: 'SHOP_NICK',
            colname: 'SHOP_NICK',
            width: '24',
            disabled: true,
            inputChange: () => { },
          },
        ],
        formValue: {
          SHOP_NICK: ""
        },
        ruleValidate: {}
      },
      btnConfig: {
        typeAll: 'default',
        btnsite: 'right',
        buttons: [
          {
            text: '确定',
            type: 'default',
            btnclick: () => {
              this.save()
            },
          },

        ],
      },
      reqkey: {}
    }
  },
  mounted() {
    this.init()

  },
  methods: {
    keyDown() {
    },
    init() {
      //SHOP_NICK
      //authKeywords
      let params = this.$parent.$parent.popwinMessage
      let data = { ID: params.ID }
      service.basicData.shopqueryById(data).then(res => {
        let resdata = res.data.data
        this.formconfig.formValue.SHOP_NICK = resdata.SHOP_NICK
        let row = res.data.data.authKeywords

        for (const key in row) {
          let obj = {
            style: 'input',
            label: row[key],
            colname: key,
            width: '24',
            disabled: false,
          }
          this.formconfig.formValue[key] = resdata[key]
          this.formconfig.ruleValidate[key] = [{ required: true, message: '' }]
          this.formconfig.formData.push(obj)
          this.reqkey[key] = ""
        }
      })
    },
    querItem(key) {
      // 根据colname遍历查询formData子项
      return this.formconfig.formData.find((item) => item.colname == key)
    },
    save() {
      let params = this.$parent.$parent.popwinMessage
      let data = { ID: params.ID }
      for (const k in this.reqkey) {
        if (!this.formconfig.formValue[k]) {
          this.$Message.warning(`${this.querItem(k).label}不能为空！`)
          return
        }
        data[k] = this.formconfig.formValue[k]

      }
      service.basicData.shopSave(data).then(res => {
        if (res.data.code == 0) {
          this.$Message.success(res.data.message)
           this.$emit("closeActionDialog");
        }
      })
    }
  }
}
</script>

<style>
</style>
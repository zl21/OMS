<!--
 * @Author: your name
 * @Date: 2021-06-11 15:28:09
 * @LastEditTime: 2021-06-11 17:33:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /burgeon-project-logic/views/modal/orderCenter/remitFail.vue
-->

<template>
  <div class="remitFail">
    <FormLayout
      :defaultColumn="defaultColumn"
      ref="FormLayout"
      :defaultconfig="config"
    >
    </FormLayout>
    <businessButton class="absolute" :btn-config="btnConfig" />
  </div>
</template>

<script>
import businessButton from 'professionalComponents/businessButton'
import service from '@/service/index'

export default {
  components: {
    businessButton,
  },
  data() {
    return {
      defaultColumn: 1,
      btnConfig: {
        typeAll: 'default', // 按钮统一风格样式
        btnsite: 'right', // 按钮位置 (right , center , left)
        buttons: [
          {
            text: '取消',
            btnclick: () => {
              this.$emit('closeActionDialog', false)

            }, // 按钮点击事件
          },
          {
            text: '确定',
            btnclick: () => {

              this.determine()
            }, // 按钮点击事件
          },
        ],
      },
      config: []
    }
  },
  created() {
    let IDS = this.$parent.$parent.idArray
    if (IDS.length == 0) {
      this.$Message.warning('请选中一条数据！');
      this.$emit('closeActionDialog', false)
      return
    }
  },
  mounted() {
    let _this = this.$parent.$parent.$parent.$refs.agTableElement
    let selectData = _this.datas.tabth.filter(item => item.colname == "PAY_TYPE")
    this.config = [
      {
        item: {
          type: 'Select', // 组件类型
          required: false,
          field: 'PAY_TYPE',
          label: '支付方式',
          props: {
            options: selectData[0].combobox.map(em => {
              em.value = em.limitval
              em.label = em.limitdesc
              return em
            })
          },
          event: {
            'on-change': (e) => {
              console.log(e);
            }
          }
        }
      },
      {
        item: {
          type: 'Input', // 组件类型
          required: true, // 是否必填
          field: 'PAY_NO',
          label: '支付账号',
          props: {
            placeholder: '',
            value: '',
            maxlength: 100,
            regx: /^\d+$|^\d+[.]?\d+$/ // 校验规则
          }
        }
      },
    ]




  },
  methods: {
    determine() {

      let forval = this.$refs.FormLayout.formData
      let data = {
        IDS,
        PAY_TYPE: forval.PAY_TYPE,//支付方式 1-支付宝、2-微信、3-现金、4-银行卡
        PAY_NO: forval.PAY_TYPE
      }

      service.orderCenter.remitFail(data).then(res => {

        if (res.data.code == 0) {
          this.$Message.success(res.data.message);
          this.$emit('closeActionDialog', true);
        }
      })
    }
  }
}
</script>

<style>
</style>
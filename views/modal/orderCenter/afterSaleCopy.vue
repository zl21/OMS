<template>
  <!-- 订单管理 - 售后复制 -->
  <div class="customized-modal">
    <div class="afterSaleCopy-form">
      <re-form :form-config="formConfig"></re-form>
    </div>
    <businessButton :btn-config="btnConfig" />
  </div>
</template>

<script>
import reForm from 'professionalComponents/businessForm'
import businessButton from 'professionalComponents/businessButton'

export default {
  components: {
    reForm,
    businessButton,
  },
  name: 'afterSaleCopy',
  props: ['componentData'],
  data() {
    const _this = this
    return {
      vmI18n: window.vmI18n,
      formConfig: {
        formData: [
          {
            style: 'select',
            label: '复制原因',
            width: '24',
            value: 'COPY_REASON_TYPE',
            options: [
              {
                value: 1,
                label: '丢件复制',
                // label: window.vmI18n.t('form_label.live_HOLD')
              },
              {
                value: 2,
                label: '错漏发复制',
                // label: window.vmI18n.t('form_label.buyer_HOLD')
              },
              {
                value: 3,
                label: '赠品复制',
                // label: window.vmI18n.t('form_label.live_HOLD')
              },
            ],
          },
        ],
        formValue: {
          COPY_REASON_TYPE: '',
        },
        ruleValidate: {
          COPY_REASON_TYPE: [{ required: true, message: ' ', trigger: 'blur' }],
        },
      },
      btnConfig: {
        typeAll: 'default',
        btnsite: 'right',
        buttons: [
          {
            text: window.vmI18n.t('common.cancel'), // 取消
            btnclick: () => {
              this.$parent.$parent.closeConfirm()
            },
          },
          {
            text: window.vmI18n.t('common.determine'), // 确定
            btnclick: () => {
              this.confirmChange()
            },
          },
        ],
      },
    }
  },
  methods: {
    // 确定事件
    confirmChange() {
      const self = this
      const copyReason = self.formConfig.formValue.COPY_REASON_TYPE
      if (!copyReason) {
        self.$OMS2.omsUtils.msgTips(self, 'warning', '请选择复制原因！', 2)
        return
      }
      const sourceId = self.componentData.id
      // self.componentData= {id: 767}
      this.$store.commit('customize/TabOpen', {
        id: 2307,
        type: 'action',
        name: 'ORDERMANAGER',
        label: '零售发货单新增',
        query: Object.assign({
          copyType: 2,
          copyReason,
          sourceId,
        }),
      })
      self.$parent.$parent.closeConfirm()
    },
  },
}
</script>

<style lang="less" scoped>
</style>

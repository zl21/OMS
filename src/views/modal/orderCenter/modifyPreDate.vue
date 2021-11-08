<template>
  <div class="jordanModal customized-modal" v-loading="loading">
    <!-- 修改预计发货时间 -->
    <div class="Modal-Form">
      <OmsForm :form-config="formConfig" />
    </div>
    <OmsButton :btn-config="btnConfig" class="modal-footer" />
  </div>
</template>
<script>
import { OmsForm, OmsButton } from 'burgeonComponents'

export default {
  components: {
    OmsButton,
    OmsForm,
  },
  props: {
    componentData: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {
      vmI18n: $i18n,
      formConfig: {
        flodClickClass: false,
        formData: [
          {
            style: 'date',
            label: $i18n.t('form_label.e2'), // 预计发货时间
            colname: 'dateTime',
            type: 'datetime',
            width: '24',
            format: 'yyyy-MM-dd HH:mm:ss', // 时间格式
            startDate: new Date(),
            options: {
              disabledDate(date) {
                return date && date.valueOf() < Date.now() - 86400000;
              }
            },
          },
        ],
        formValue: {
          dateTime: new Date(), // 默认当前时间
        },
      },
      loading: false,
      btnConfig: {
        typeAll: "default", // 按钮统一风格样式
        btnsite: "right", // 按钮位置 (right , center , left)
        buttons: [
          {
            text: $i18n.t("common.cancel"), // 取消
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              this.$parent.$parent.closeConfirm();
            }, // 按钮点击事件
          },
          {
            text: $i18n.t("common.determine"), // 确定
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              const _this = this;
              _this.determine();
            }, // 按钮点击事件
          },
        ],
      }, // 确定取消按钮
    };
  },
  mounted() { },
  methods: {
    // 确定
    async determine() {
      const _this = this;
      const dateTime = _this.formConfig.formValue.dateTime;
      if (!dateTime) {
        _this.$Message.warning("请选择预计发货时间！");
        return false;
      }
      _this.loading = true;
      const param = {
        orderIds: _this.componentData.ids,
        dateTime: $utils.getFormatDate(new Date(dateTime), 'yyyy-MM-dd HH:mm:ss')
      }
      const {
        data: { data, code, message },
      } = await _this.service.orderCenter.updateDeliveryTime(param).catch(() => {
        _this.loading = false;
      });
      if (code === 0) {
        _this.$parent.$parent.closeConfirm();
        _this.$Message.success(message);
        _this.$parent.$parent.$parent.query();
      } else {
        // 走框架报错
      }
      _this.loading = false;
    },
  },
};
</script>

<style scoped lang='less'>
.jordanModal {
  min-height: 100px;
}
</style>

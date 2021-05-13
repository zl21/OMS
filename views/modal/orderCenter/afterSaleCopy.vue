<template>
  <!-- 订单管理 - 售后复制 -->
  <div class="customized-modal afterSaleCopy">
    <div class="afterSaleCopy-form">
      <re-form :form-config="formConfig"></re-form>
    </div>
    <businessButton :btn-config="btnConfig" class="modal-footer" />
  </div>
</template>

<script>
import reForm from "professionalComponents/businessForm";
import businessButton from "professionalComponents/businessButton";
import electronicSheetPrinting from "../inventoryCenter/electronicSheetPrinting.vue";

export default {
  components: {
    reForm,
    businessButton,
  },
  name: "afterSaleCopy",
  props: ["componentData"],
  data() {
    const _this = this;
    return {
      vmI18n:$i18n,
      formConfig: {
        formData: [
          {
            style: "select",
            label: "复制原因",
            width: "24",
            value: "COPY_REASON_TYPE",
            options: [
              {
                value: 1,
                label: "丢件复制",
                // label: vmI18n.t('form_label.live_HOLD')
              },
              {
                value: 2,
                label: "错漏发复制",
                // label: vmI18n.t('form_label.buyer_HOLD')
              },
              {
                value: 3,
                label: "赠品复制",
                // label: vmI18n.t('form_label.live_HOLD')
              },
            ],
          },
        ],
        formValue: {
          COPY_REASON_TYPE: "",
        },
        ruleValidate: {
          COPY_REASON_TYPE: [{ required: true, message: " ", trigger: "blur" }],
        },
      },
      btnConfig: {
        typeAll: "default",
        btnsite: "right",
        buttons: [
          {
            text: vmI18n.t("common.cancel"), // 取消
            btnclick: () => {
              this.$parent.$parent.closeConfirm();
            },
          },
          {
            text: vmI18n.t("common.determine"), // 确定
            btnclick: () => {
              this.confirmChange();
            },
          },
        ],
      },
    };
  },
  methods: {
    // 确定事件
    /**
     * 复制原因： COPY_REASON_TYPE（0:取消单复制;1:丢件复制;2:错漏发复制;3:赠品复制）
     * 按钮类型：TYPE（1 取消单复制;2 售后复制）
     */
    async confirmChange() {
      const self = this;
      const ID = self.componentData.id;
      if (!ID) {
        self.$OMS2.omsUtils.msgTips(self, "warning", "a8");
        return;
      }
      const IDS = [ID];
      const copyReason = self.formConfig.formValue.COPY_REASON_TYPE;
      if (!copyReason) {
        self.$OMS2.omsUtils.msgTips(self, "warning", "请选择复制原因！", 2);
        return;
      }
      const {
        data: { code, data, message },
      } = await self.service.orderCenter.billOcBOrderCopy({
        IDS,
        TYPE: 2,
        COPY_REASON_TYPE: copyReason,
      });
      if (code == 0) {
        console.log(code);
        self.$store.commit("customize/TabOpen", {
          id: 2307,
          type: "action",
          name: "OC_B_ORDER_VIRTUAL_TABLE",
          label: "零售发货单新增",
          query: Object.assign({
            copyType: 2,
            copyReason,
            sourceId: ID,
          }),
        });
      } else {
        console.log(data, message);
      }
      self.$parent.$parent.closeConfirm();
    },
  },
};
</script>

<style lang="less" scoped>
.afterSaleCopy {
  min-height: 100px;
}
</style>

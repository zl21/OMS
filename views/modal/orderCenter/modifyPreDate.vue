<template>
  <div class="jordanModal customized-modal" v-loading="loading">
    <!-- 修改预计发货时间 -->
    <div class="Modal-Form">
      <businessForm :form-config="formConfig" />
    </div>
    <businessButton :btn-config="btnConfig" class="modal-footer" />
  </div>
</template>
<script>
import businessButton from "professionalComponents/businessButton";
import businessForm from "professionalComponents/businessForm";

export default {
  components: {
    businessButton,
    businessForm,
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
            value: 'timerange',
            type: 'datetimerange',
            width: '24',
            format: 'yyyy-MM-dd HH:mm:ss', // 时间格式
            startDate: new Date(),
            options: {
              disabledDate(date) {
                return isDate
                  ? date && date.valueOf() > Date.now() - 86400000
                  : date && date.valueOf() > Date.now() - 8.64e7 * (new Date().getDate());
              }
            },
          },
        ],
        formValue: {
          timerange: "", // 
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
      selectData: [],
      selectAllList: [],
      total: 0,
      cancelModel: false,
      name: "",
      delId: "",
      removeLoading: false,
    };
  },
  mounted() {
    // this.getLogistics();
  },
  methods: {
    querItem(key, type) {
      return this[type ? type : "formConfig"].formData.find(
        (item) => item.colname == key
      );
    },
    // 获取物流公司数据
    async getLogistics(name, index = "") {
      const _this = this;
      _this.removeLoading = true;
      const param = {
        objid: _this.componentData.id,
        logisticsInfo: name === undefined ? "" : name,
      };
      const res = await _this.service.common.getWarehouseLogisticsInfo(param);
      _this.removeLoading = false;
      if (res.data.code === 0) {
        _this.jordanTableConfig.data = res.data.data.cpLogisticsList;
        if (!index) {
          _this.selectData = res.data.data.warehouseLogisticsItems;
          _this.total = _this.selectData.length;
        }
      }
    },
    // 确定
    async determine() {
      const _this = this;
      if (!_this.formConfig.formValue.CP_C_LOGISTICS_ID) {
        _this.$Message.warning("请选择物流公司！");
        return false;
      }
      _this.loading = true;
      let param = JSON.parse(JSON.stringify(_this.componentData));
      param.CP_C_LOGISTICS_ID = +_this.formConfig.formValue.CP_C_LOGISTICS_ID;
      // const res = await this.service.orderCenter.updateLogistics(param);
      const {
        data: { data, code, message },
      } = await _this.service.orderCenter.updateLogistics(param);
      if (code === 0) {
        _this.$parent.$parent.closeConfirm();
        _this.$Message.success(message);
        _this.$parent.$parent.$parent.query();
      } else if (code == 1 && data) {
        _this.$parent.$parent.closeConfirm();
        let tabData = data.map((row, index) => {
          row.INDEX = ++index;
          row.BILL_NO = row.objno;
          row.RESULT_MSG = row.message;
          return row;
        });
        this.$OMS2.omsUtils.tipShow(
          "confirm",
          _this,
          data,
          message,
          function (h) {
            return h("Table", {
              props: {
                columns: [
                  {
                    title: "序号",
                    key: "INDEX",
                  },
                  {
                    title: "ID",
                    key: "objid",
                  },
                  {
                    title: "单据编号",
                    key: "BILL_NO",
                  },
                  {
                    title: $i18n.t('form_label.e0'), // 失败原因
                    key: "RESULT_MSG",
                  },
                ],
                data: tabData,
              },
            });
          }
        );
      } else if (code == 1 && !data) {
        _this.$parent.$parent.closeConfirm();
        _this.$Message.error(message);
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

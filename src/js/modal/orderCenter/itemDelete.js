import axios from 'axios';
import reForm from 'professionalComponents/businessForm';

export default {
  components: {
    reForm,
  },
  data() {
    return {
      vmI18n: window.vmI18n,
      formConfig: {
        formValue: {
          searchValue: '',
          psCProEcode: '',
        },
        formData: [
          {
            // label: "SKU编码",
            label: vmI18n.t('table_label.code_SKU'),
            style: 'dimSearch',
            width: '12',
            value: 'searchValue',
            columns: ['ECODE'],
            AuotData: [], // 匹配的选项
            dimChange: async (val) => {
              // 模糊查询的方法
              const _this = this;
              _this.formConfig.formValue.searchValue = val.trim();
              const query = {
                isBlur: 'Y', // N为精确匹配
                psCSku: {
                  ECODE: val.trim(),
                },
              };
              const res = await _this.service.common.skuQuery(query);
              if (res.status === 200) {
                const data = res.data.data.data;
                const dimList = _this.formConfig.formData;
                let arr;
                data.map((item) => {
                  // 删除不需要展示的模糊搜索项
                  delete item.GBCODE;
                  delete item.IS_GIFT;
                  delete item.IS_GROUP;
                  delete item.PRICELIST;
                  // delete item.PS_C_PRO_ECODE;
                  delete item.PS_C_PRO_ID;
                  delete item.colorId;
                  delete item.colorName;
                  delete item.sizeId;
                  delete item.sizeName;
                  delete item.skuId;
                });
                dimList.map((item) => {
                  if (item.label === 'SKU编码') {
                    item.AuotData = data;
                    // 调用查询提取方法,传给条码,默认数量为一,调用状态为0的保存接口
                  }
                });
              }
            },
            dimEnter: () => {
              this.search();
            },
            dimSelect: (val) => {
              this.formConfig.formValue.searchValue = val.label;
            },
          },
          {
            // label: "商品编码",
            label: vmI18n.t('table_label.productNo'),
            style: 'dimSearch',
            width: '12',
            value: 'psCProEcode',
            columns: ['ECODE'],
            AuotData: [], // 匹配的选项
            dimChange: async (val) => {
              // 模糊查询的方法
              const _this = this;
              _this.formConfig.psCProEcode = val.trim();
              const fromdata = new FormData();
              const params = {
                GLOBAL: val.trim(),
                PAGENUM: 1,
                PAGESIZE: 10,
                CONDITION: {},
                TABLENAME: 'PS_C_PRO',
              };
              fromdata.append('param', JSON.stringify(params));
              const res = await this.service.common.screenresult(fromdata);
              if (res.data.code === 0) {
                const dimList = _this.formConfig.formData;

                dimList.map((item) => {
                  if (item.label === '商品编码') {
                    item.AuotData = res.data.data.list;
                  }
                });
              }
            },
            dimEnter: () => {
              this.search();
            },
            dimSelect: (val) => {
              this.formConfig.formValue.psCProEcode = val.label;
              // this.psCProEcode = val.label;
            },
          },
        ],
      },
      rowClickData: {},
      radioValue: '2',
      // searchValue: "",
      // psCProEcode: "",
      // psCProEname: "",
      tableLoad: false,
      columns: [
        {
          // title: "SKU编码",
          title: vmI18n.t('table_label.code_SKU'),
          key: 'ECODE',
        },
        {
          // title: "商品名称",
          title: vmI18n.t('table_label.productName'),
          key: 'PS_C_PRO_ENAME',
        },
        {
          // title: "SKU名称",
          title: vmI18n.t('form_label.skuName'),
          key: 'SPEC',
        },
      ],
      data: [],
    };
  },
  props: {
    componentData: {
      type: Object,
    },
  },
  mounted() {
    console.log(this.componentData);
  },
  methods: {
    radioChange(value) {
      console.log(value);
    },
    async search(value) {
      // sku查询
      const self = this;
      self.tableLoad = true;
      const query = {
        isBlur: 'N',
        psCSku: {
          ECODE: self.formConfig.formValue.searchValue.trim(),
          psCProEcode: self.formConfig.formValue.psCProEcode.trim(),
          // psCProEname: self.psCProEname.trim()
        },
      };
      try {
        const res = await self.service.common.skuQuery(query);
        if (res.data.code == 0) {
          // res.data.data.data[0].IS_GIFT =
          //   res.data.data.data[0].IS_GIFT == "0" ? "否" : "否";
          self.data = res.data.data.data;
        } else {
          // this.$Message.warning("sku查询失败!");
          this.$Message.warning(vmI18n.t('modalTips.zt'));
        }
        self.tableLoad = false;
      } catch (e) {
        self.tableLoad = false;
      }
    },
    confirm() {
      const self = this;
      const result = {};
      if (self.componentData.a_2.length == 0) {
        // self.$Message.warning("请勾选订单数据!");
        self.$Message.warning(vmI18n.t('modalTips.zu'));
        return;
      }
      result.ids = self.componentData.a_2;
      result.changeGoodsSku = self.rowClickData.ECODE;
      console.log(this.componentData.a_1, result);
      axios({
        url: '/api/cs/oc/oms/v1/batchDeleteGoods',
        method: 'post',
        data: result,
      }).then((res) => {
        if (res.data.code == 0) {
          self.$Message.error(res.data.message);
          self.$parent.$parent.$parent.getData();
          this.$parent.$parent.closeConfirm();
        } else if (res.data.code == -1) {
          self.$Modal.confirm({
            title: res.data.message,
            width: 500,
            render: h => h('Table', {
              props: {
                columns: [
                  {
                    // title: "提示信息",
                    title: vmI18n.t('modalTitle.tips'),
                    key: 'message',
                  },
                ],
                data: res.data.data,
              },
            }),
          });
        }
      });
    },
    onRowClick(row) {
      this.rowClickData = row;
    },
  },
};

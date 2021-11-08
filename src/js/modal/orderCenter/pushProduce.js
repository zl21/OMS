import { OmsButton, OmsForm as reForm } from 'burgeonComponents'

export default {
  components: {
    reForm,
    OmsButton
  },
  data() {
    return {
      vmI18n:$i18n,
      loading: false,
      btnConfig: {
        typeAll: 'default', // 按钮统一风格样式
        btnsite: 'right', // 按钮位置 (right , center , left)
        buttons: [
          {
            type: '', // 按钮类型
            text: $i18n.t('common.cancel'), // 取消
            icon: '', // 按钮图标
            size: 'small', // 按钮大小
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              this.$parent.$parent.closeConfirm();
            } // 按钮点击事件
          },
          {
            type: '', // 按钮类
            text: $i18n.t('common.determine'), // 确定
            icon: '', // 按钮图标
            size: 'small', // 按钮大小
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              this.confirm();
            } // 按钮点击事件
          }
        ],
      },
      formConfig: {
        formValue: {
          searchValue: '',
          psCProEcode: '',
        },
        formData: [
          {
            // label: "商品SKU",
            label: $i18n.t('table_label.commoditySKU'),
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
                // let arr;
                data.forEach((item) => {
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
                dimList.forEach((item) => {
                  if (item.label === $i18n.t('table_label.commoditySKU')) {
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
            dimClear: () => {
              this.formConfig.formValue.searchValue = '';
            }
          },
          {
            // label: "商品款号",
            label: $i18n.t('table_label.itemNo'),
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
              const res = await _this.service.common.screenresult(fromdata);
              if (res.data.code === 0) {
                const dimList = _this.formConfig.formData;

                dimList.forEach((item) => {
                  if (item.label === $i18n.t('table_label.itemNo')) {
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
            },
            dimClear: () => {
              this.formConfig.formValue.psCProEcode = '';
            },
          },
        ],
      },
      rowClickData: {},
      radioValue: '2',
      // searchValue: '',
      psCProEcode: '',
      // psCProEname: '',
      qty: '1',
      tableLoading: false,
      columns: [
        {
          // title: "商品SKU",
          title: $i18n.t('table_label.commoditySKU'),
          key: 'ECODE',
        },
        {
          // title: "商品名称",
          title: $i18n.t('table_label.productName'),
          key: 'PS_C_PRO_ENAME',
        },
        {
          // title: "商品SKU名称",
          title: $i18n.t('table_label.productSKUname'),
          key: 'SPEC',
        },
        {
          // title: "数量",
          title: $i18n.t('table_label.quantities'),
          key: 'qty',
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
    // async search(value) {
    async search() {
      // sku查询
      const self = this;
      // if (!self.searchValue) {
      //   self.$Message.warning('请输入商品SKU');
      //   return;
      // }
      self.tableLoading = true;
      const query = {
        isBlur: 'N',
        psCSku: {
          ECODE: self.formConfig.formValue.searchValue.trim(),
          psCProEcode: self.formConfig.formValue.psCProEcode.trim() /* , psCProEname: self.psCProEname.trim() */,
        },
      };

      try {
        const res = await self.service.common.skuQuery(query);
        console.log(res);
        if (res.data.code == 0) {
          if (res.data.data.data.length == 0) {
            // this.$Message.warning("查询数据为空!");
            this.$Message.warning($i18n.t('modalTips.r8'));
            self.data = [];
            self.tableLoading = false;
            return;
          }
          const resData = res.data.data.data;
          resData.forEach((val) => {
            val.qty = this.qty;
          });
          // res.data.data.data[0]['qty'] = this.qty;
          self.data = resData;
        } else {
          // this.$Message.warning("sku查询失败!");
          this.$Message.warning($i18n.t('modalTips.zt'));
        }
        self.tableLoading = false;
      } catch (e) {
        self.tableLoading = false;
      }
    },
    confirm() {
      const self = this;
      let url = '/api/cs/oc/oms/v1/batchAddGoods'; // 添加商品接口
      const result = {};
      if (self.componentData.a_2.length == 0) {
        // self.$Message.warning("请选中订单数据!");
        self.$Message.warning($i18n.t('modalTips.yz'));
        return;
      }
      if (JSON.stringify(self.rowClickData) == '{}') {
        // self.$Message.warning("请选中需要新增的赠品!");
        self.$Message.warning($i18n.t('modalTips.xa'));
        return;
      }
      result.ids = self.componentData.a_2;
      result.changeGoodsSku = self.rowClickData.ECODE.trim();
      result.gift_type = 1;
      result.qty = self.rowClickData.qty;
      if (
        self.componentData.type
        && self.componentData.type == 'replaceTheHangingItem'
      ) {
        // 替换下挂商品接口
        url = '/p/cs/oc/v1/bathChangeGoods';
        result.sku_code = self.rowClickData.ECODE.trim();
        result.type = 2;
        delete result.gift_type;
      }
      self.loading = true;
      self.btnConfig.buttons[1].disabled = true;
      this.service.common.publicUrlParams(url, result).then((res) => {
        this.btnConfig.buttons[1].disabled = false;
        if (res.data.code == 0) {
          self.$Message.success(res.data.message);
          self.$parent.$parent.$parent.getData();
          this.$parent.$parent.closeConfirm();
          this.loading = false;
          self.btnConfig.buttons[1].disabled = false;
        } else {
          this.loading = false;
          self.btnConfig.buttons[1].disabled = false;
          if (res.data.code === -1) {
            self.$Modal.confirm({
              title: res.data.message,
              width: 500,
              render: h => h('Table', {
                props: {
                  columns: [
                    {
                      // title: "提示信息",
                      title: $i18n.t('modalTitle.tips'),
                      key: 'message',
                    },
                  ],
                  data: res.data.data,
                },
              }),
            });
          }
        }
      });
    },
    onRowClick(row) {
      this.rowClickData = row;
    },
  },
};

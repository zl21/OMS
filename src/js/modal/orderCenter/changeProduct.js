import axios from 'axios';
import reForm from 'professionalComponents/businessForm';
import businessButton from 'professionalComponents/businessButton';

export default {
  components: {
    reForm,
    businessButton
  },
  data() {
    // 当前页面名称
    const pageName = this.$route.params.tableName;
    return {
      pageName,
      vmI18n: window.vmI18n,
      loading: false,
      pro: '',
      replace_pro: '',
      radioValue: '2',
      btnConfig: {
        typeAll: 'error', // 按钮统一风格样式
        btnsite: 'right', // 按钮位置 (right , center , left)
        buttons: [
          {
            text: window.vmI18n.t('common.cancel'), // 取消 按钮文本
            btnclick: () => {
              if (this.isTBsku || this.pageName === 'IP_B_JINGDONG_ORDER' || this.pageName === 'IP_B_STANDPLAT_ORDER') {
                this.$emit('closeActionDialog');
              } else {
                this.$parent.$parent.closeConfirm();
              }
            } // 按钮点击事件
          },
          {
            text: window.vmI18n.t('common.determine'), // 确定 按钮文本
            btnclick: () => {
              if (this.isTBsku || this.pageName === 'IP_B_JINGDONG_ORDER' || this.pageName === 'IP_B_STANDPLAT_ORDER' ) {
                this.save();
              } else {
                this.confirm();
              }
            }
          }
        ]
      },
      formConfig: {
        formValue: {
          searchValue: '',
          psCProEcode: '',
        },
        formData: [
          {
            label: window.vmI18n.t('table_label.commoditySKU'), // '商品SKU',
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
              const res = await _this.skuQueryCommon(this.pageName, query);
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
                  // '商品SKU'
                  if (item.label === window.vmI18n.t('table_label.commoditySKU')) {
                    item.AuotData = data;
                    // 调用查询提取方法,传给条码,默认数量为一,调用状态为0的保存接口
                  }
                });
              }
            },
            dimEnter: () => {
              this.search('one');
            },
            dimSelect: (val) => {
              this.formConfig.formValue.searchValue = val.label;
            },
          },
          {
            label: window.vmI18n.t('table_label.itemNo'), // '商品款号',
            style: 'dimSearch',
            width: '12',
            value: 'psCProEcode',
            columns: ['ECODE'],
            AuotData: [], // 匹配的选项
            dimChange: async (val) => {
              // 模糊查询的方法
              const _this = this;
              _this.formConfig.psCProEcode = val.trim();
              // 新增逻辑: 当页面为“淘宝订单接口”页面，使用新接口查询sku信息
              let res = {};
              console.log('val', val)
              if (this.pageName === 'IP_B_TAOBAO_ORDER' || this.pageName === 'IP_B_JINGDONG_ORDER' || this.pageName === 'IP_B_STANDPLAT_ORDER') {
                const params = {
                  isBlur: 'Y',
                  psCSku: {
                    psCProEcode: val.trim(),
                  },
                };
                res = await this.skuQueryCommon(this.pageName, params);
              } else {
                const fromdata = new FormData();
                const params = {
                  GLOBAL: val.trim(),
                  PAGENUM: 1,
                  PAGESIZE: 10,
                  CONDITION: {},
                  TABLENAME: 'PS_C_PRO',
                };
                fromdata.append('param', JSON.stringify(params));
                res = await this.service.common.screenresult(fromdata);
              }
              if (res.data.code === 0) {
                const dimList = _this.formConfig.formData;
                dimList.map((item) => {
                  // '商品款号'
                  if (item.label === window.vmI18n.t('table_label.itemNo')) {
                    item.AuotData = res.data.data.data;
                  }
                });
              }
            },
            dimEnter: () => {
              this.search('one');
            },
            dimSelect: (val) => {
              this.formConfig.formValue.psCProEcode = val.label;
              // this.psCProEcode = val.label;
            },
          },
        ],
      },
      replaceFormConfig: {
        formValue: {
          searchValue: '',
          psCProEcode: '',
        },
        formData: [
          {
            label: window.vmI18n.t('table_label.commoditySKU'), // '商品SKU',
            style: 'dimSearch',
            width: '12',
            value: 'searchValue',
            columns: ['ECODE'],
            AuotData: [], // 匹配的选项
            dimChange: async (val) => {
              // 模糊查询的方法
              const _this = this;
              _this.replaceFormConfig.formValue.searchValue = val.trim();
              const query = {
                isBlur: 'Y', // N为精确匹配
                psCSku: {
                  ECODE: val.trim(),
                },
              };
              const res = await this.service.common.skuQuery(query);
              if (res.status === 200) {
                const data = res.data.data.data;
                const dimList = _this.replaceFormConfig.formData;
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
                  // '商品SKU'
                  if (item.label === window.vmI18n.t('table_label.commoditySKU')) {
                    item.AuotData = data;
                    // 调用查询提取方法,传给条码,默认数量为一,调用状态为0的保存接口
                  }
                });
              }
            },
            dimEnter: () => {
              this.search('two');
            },
            dimSelect: (val) => {
              this.replaceFormConfig.formValue.searchValue = val.label;
            },
          },
          {
            label: window.vmI18n.t('table_label.itemNo'), // '商品款号',
            style: 'dimSearch',
            width: '12',
            value: 'psCProEcode',
            columns: ['ECODE'],
            AuotData: [], // 匹配的选项
            dimChange: async (val) => {
              // 模糊查询的方法
              const _this = this;
              _this.replaceFormConfig.psCProEcode = val.trim();
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
                const dimList = _this.replaceFormConfig.formData;

                dimList.map((item) => {
                  // '商品款号'
                  if (item.label === window.vmI18n.t('table_label.itemNo')) {
                    item.AuotData = res.data.data.list;
                  }
                });
              }
            },
            dimEnter: () => {
              this.search('two');
            },
            dimSelect: (val) => {
              this.replaceFormConfig.formValue.psCProEcode = val.label;
              // this.psCProEcode = val.label;
            },
          },
        ],
      },
      proName: '',
      skuPropertiesName: '',
      replace_proName: '',
      replaceTableLoad: false,
      tableLoad: false,
      replaceColumns: [
        {
          // 商品SKU
          title: window.vmI18n.t('table_label.commoditySKU'),
          key: 'ECODE',
        },
        {
          // 商品名称
          title: window.vmI18n.t('table_label.productName'),
          key: 'PS_C_PRO_ENAME',
        },
        {
          // 商品SKU名称
          title: window.vmI18n.t('table_label.productSKUname'),
          key: 'SPEC',
        },
      ],
      columns: this.renderTableCol(pageName),
      data: [],
      replace_data: [],
      onRowClickReplaceData: {},
      onRowClickData: {},
      onRowClickText: '',
      onRowClickReplaceText: '',
      isTBsku: false
    };
  },
  props: {
    tablename: {
      type: String
    },
    idArray: {
      type: Array,
      defalut: () => []
    },
    componentData: {
      type: Object,
    },
  },
  created() {
    if(this.$parent.$parent.selectRowData[0].STATUS.val == '等待卖家发货') {
      this.$Message.error('状态 ! ! !')
      this.$parent.$parent.closeActionDialog();
    }
  },
  mounted() {
    // 淘宝订单接口-sku异常登记sku替换
    if(this.$attrs['obj-tab-action-dialog-config'].webname === "SKUAbnormalRegistration") {
      this.isTBsku = true
    }
  },
  methods: {
    radioChange(value) {
      console.log(value);
    },
    renderDialogTitle(type) {
      if (type === 'before') {
        switch(this.pageName) {
          // 淘宝订单接口
          case 'IP_B_TAOBAO_ORDER':
            return 'SKU编码';
          // 京东订单接口
          case 'IP_B_JINGDONG_ORDER':
            return '平台条码';
          // 通用订单接口
          case 'IP_B_STANDPLAT_ORDER':
            return '平台条码';
          default:
            return vmI18n.t('modalTitle.a1');
        }
      } else {
        switch(this.pageName) {
          // 淘宝订单接口
          case 'IP_B_TAOBAO_ORDER':
            return '自定义SKU';
          // 京东订单接口
          case 'IP_B_JINGDONG_ORDER':
            return '商品条码';
          // 通用订单接口
          case 'IP_B_STANDPLAT_ORDER':
            return '商家外部编码';
          default:
            return vmI18n.t('modalTitle.a4');
        };
      }
      
    },
    renderTableCol(pageName) {
      switch(pageName) {
        // 淘宝订单接口
        case 'IP_B_TAOBAO_ORDER':
          return [
            {
              // 商品SKU
              title: window.vmI18n.t('table_label.commoditySKU'),
              key: 'ECODE',
            },
            {
              // 商品款号
              title: '商品款号',
              key: 'SPEC',
            },
            {
              // 商品名称
              title: window.vmI18n.t('table_label.productName'),
              key: 'PS_C_PRO_ENAME',
            },
            
          ];
        // 京东订单接口
        case 'IP_B_JINGDONG_ORDER':
          return [
            {
              // 商品SKU
              title: window.vmI18n.t('table_label.commoditySKU'),
              key: 'ECODE',
            },
            {
              // 商品款号
              title: '商品款号',
              key: 'psCProEcode',
            },
            {
              // 商品名称
              title: window.vmI18n.t('table_label.productName'),
              key: 'psCProEname',
            },
          ];
        // 通用订单接口
        case 'IP_B_STANDPLAT_ORDER':
          return [
            {
              // 商品SKU
              title: window.vmI18n.t('table_label.commoditySKU'),
              key: 'ECODE',
            },
            {
              // 商品款号
              title: '商品款号',
              key: 'psCProEcode',
            },
            {
              // 商品名称
              title: window.vmI18n.t('table_label.productName'),
              key: 'psCProEname',
            },
            {
              // 条码属性
              title: '条码属性',
              key: 'skuPropertiesName',
            },
          ];
        default:
          return [
            {
              // 商品SKU
              title: window.vmI18n.t('table_label.commoditySKU'),
              key: 'ECODE',
            },
            {
              // 商品名称
              title: window.vmI18n.t('table_label.productName'),
              key: 'PS_C_PRO_ENAME',
            },
            {
              // 商品SKU名称
              title: window.vmI18n.t('table_label.productSKUname'),
              key: 'SPEC',
            },
          ];
      }
    },
    skuQueryCommon(pageName, params) {
      switch(pageName) {
        // 淘宝订单接口
        case 'IP_B_TAOBAO_ORDER':
          return this.service.common.queryTaobaoExceptionSkus(params);
        // 京东订单接口
        case 'IP_B_JINGDONG_ORDER':
          return this.service.common.queryJingdongExceptionSkus(params);
        // 通用订单接口
        case 'IP_B_STANDPLAT_ORDER':
          return this.service.common.queryStandPlatExceptionSkus(params);
        default:
          return this.service.common.skuQuery(params);
      }
    },
    async search(value) {
      // sku查询
      const self = this;
      const loadName = value === 'one' ? 'tableLoad' : 'replaceTableLoad';
      this[loadName] = true;
      const query = {
        isBlur: 'N',
        psCSku: {
          ECODE:
            value == 'one'
              ? self.formConfig.formValue.searchValue.trim()
              : self.replaceFormConfig.formValue.searchValue.trim(),
          psCProEcode:
            value == 'one'
              ? self.formConfig.formValue.psCProEcode.trim()
              : self.replaceFormConfig.formValue.psCProEcode.trim(),
          psCProEname:
            value == 'one'
              ? self.proName.trim()
              : self.replace_proName.trim(),
        },
      };
      if (this.pageName === 'IP_B_STANDPLAT_ORDER' && value === 'one') {
        Object.assign(query, {
          psCSku: {
            ...query.psCSku,
            skuPropertiesName: self.skuPropertiesName.trim(),
          }
        })
      }
      try {
        let res = {};
        if (value === 'one') {
          res = await self.skuQueryCommon(this.pageName, query);
        } else {
          res = await self.service.common.skuQuery(query);
        }
        if (res.data.code == 0) {
          res.data.data.data.map((item) => {
            item.IS_GIFT == '0' ? '否' : '是';
          });
          if (value == 'one') {
            self.data = res.data.data.data;
            self.onRowClickData = self.data[0];
            self.onRowClickText = self.data[0].ECODE;
          } else {
            self.replace_data = res.data.data.data;
            self.onRowClickReplaceData = self.replace_data[0];
            self.onRowClickReplaceText = self.replace_data[0].ECODE;
          }
        } else {
          // this.$Message.warning("sku查询失败!");
          this.$Message.warning(window.vmI18n.t('modalTips.zt'));
        }
        this[loadName] = false;
      } catch (e) {
        this[loadName] = false;
      }
    },
    getSaveUrl(pageName) {
      switch(pageName) {
        // 京东订单接口
        case 'IP_B_JINGDONG_ORDER':
          return '/api/cs/oc/oms/v1/bathChangeJingdongExceptionSkus';
        // 通用订单接口
        case 'IP_B_STANDPLAT_ORDER':
          return '/api/cs/oc/oms/v1/bathChangeStandPlatExceptionSkus';
        // 淘宝订单接口
        default:
          return '/api/cs/oc/oms/v1/bathChangeTaobaoExceptionSkus';
      }
    },
    confirm() {
      const self = this;
      if (JSON.stringify(self.onRowClickData) == '{}') {
        // self.$Message.warning("替换前商品sku不能为空!");
        self.$Message.warning(window.vmI18n.t('modalTips.yf'));
        return;
      }
      if (JSON.stringify(self.onRowClickReplaceData) == '{}') {
        // self.$Message.warning("替换后商品sku码不能为空!");
        self.$Message.warning(window.vmI18n.t('modalTips.yg'));
        return;
      }
      // if (self.onRowClickData.ECODE == self.onRowClickReplaceData.ECODE) {
      //   // self.$Message.warning("替换商品与被替换商品不能相同!");
      //   self.$Message.warning(window.vmI18n.t('modalTips.yh'));
      //   return;
      // }
      const result = {};
      const needParam = {
        IS_GIFT: self.onRowClickReplaceData.IS_GIFT == '是' ? '0' : '1',
        PS_C_PRO_ECODE: self.onRowClickReplaceData.PS_C_PRO_ECODE,
        PS_C_PRO_ENAME: self.onRowClickReplaceData.PS_C_PRO_ENAME,
        PRICELIST: self.onRowClickReplaceData.PRICELIST,
        IS_GROUP: self.onRowClickReplaceData.IS_GROUP,
        SKU_ECODE: self.onRowClickReplaceData.ECODE,
        PS_C_PRO_ID: self.onRowClickReplaceData.PS_C_PRO_ID,
      };
      if (self.componentData.a_2.length == 0) {
        // self.$Message.warning("请勾选订单数据!");
        self.$Message.warning(window.vmI18n.t('modalTips.zu'));
        return;
      }
      result.ids = self.componentData.a_2;
      result.changeGoodsSku = self.onRowClickData.ECODE;
      result.sku_code = needParam.SKU_ECODE;
      result.type = 1;
      console.log(this.componentData.a_1, result);
      this.loading = true;
      axios({
        url: '/api/cs/oc/oms/v1/bathChangeGoods',
        method: 'post',
        data: result,
      }).then((res) => {
        this.loading = false;
        console.log(res);
        if (res.data.code == 0) {
          self.$Message.success(res.data.message);
          this.$parent.$parent.closeConfirm();
        } else {
          self.$Modal.confirm({
            title: res.data.message,
            width: 500,
            render: h => h('Table', {
              props: {
                columns: [
                  {
                    // title: "提示信息",
                    title: window.vmI18n.t('modalTitle.tips'),
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
    save() {
      const self = this;
      if (JSON.stringify(self.onRowClickData) == '{}') {
        return self.$Message.warning(window.vmI18n.t('modalTips.yf'));
      }
      if (JSON.stringify(self.onRowClickReplaceData) == '{}') {
        return self.$Message.warning(window.vmI18n.t('modalTips.yg'));
      }

      const result = {};
      result.ids = self.idArray;
      result.changeGoodsSku = self.onRowClickData.ECODE;
      result.sku_code = self.onRowClickReplaceData.ECODE;
      this.loading = true;
      axios({
        url: self.getSaveUrl(self.pageName),
        method: 'post',
        data: result,
      }).then((res) => {
        this.loading = false;
        console.log(res);
        if (res.data.code == 0) {
          self.$Message.success(res.data.message);
          this.$emit('closeActionDialog');
        } else {
          self.$Modal.confirm({
            title: res.data.message,
            width: 500,
            render: h => h('Table', {
              props: {
                columns: [
                  {
                    // title: "提示信息",
                    title: window.vmI18n.t('modalTitle.tips'),
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
    onRowClickReplace(row) {
      this.onRowClickReplaceData = row;
      this.onRowClickReplaceText = row.ECODE;
    },
    onRowClick(row) {
      this.onRowClickData = row;
      this.onRowClickText = row.ECODE;
    },
  },
};

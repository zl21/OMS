import businessForm from "burgeonComponents/view/businessForm";
import i18n from "@burgeon/internationalization/i18n";
window.$i18n = i18n

export default {
  components: {
    businessForm
  },
  data() {
    return {
      vmI18n: i18n,
      pageLoad: false,
      formConfig: {
        formValue: {
          search: "",
          search1: "",
          qty: "1"
        },
        formData: [{
            // label: "商品SKU",
            label: $i18n.t('table_label.commoditySKU'),
            style: "dimSearch",
            width: "12",
            value: "search",
            columns: ["ECODE"],
            AuotData: [], //匹配的选项
            dimChange: search => {
              //模糊查询的方法
              this.getData(search, 'search');
            },
            dimEnter: val => {
              //this.entry(val);
              this.pdtChange(val);
            },
            dimSelect: obj => {
              // 将选中值赋值给value
              this.formConfig.formValue.search =  obj.label;
            },
            dimblur: () => {}
          },
          {
            // label: "商品款号",
            label: $i18n.t('table_label.itemNo'),
            style: "dimSearch",
            width: "12",
            value: "search1",
            columns: ["ECODE"],
            AuotData: [], //匹配的选项
            dimChange: search => {
              //模糊查询的方法
              this.getData(search, 'search1');
            },
            dimEnter: val => {
              //this.entry(val);
              this.pdtChange(val, 'search1');
            },
            dimSelect: obj => {
              let v = obj.label;
              this.entry(v);
            },
            dimblur: () => {}
          },
          {
            style: "input", //输入框类型
            // label: "数量", //输入框前文字
            label: $i18n.t('table_label.quantities'),
            value: "qty", //输入框的值
            clearable: true,
            regx: /^[1-9]\d*$/,
            width: "12", //所占的宽度 (宽度分为24份,数值代表所占份数的宽度)
            inputenter: () => {
              this.qtyChange();
            }
          }
        ]
      },
      lists: []
    };
  },
  props: {
    componentData: {}
  },
  methods: {
    //数量entry
    async qtyChange() {
      let self = this;
      let qty = self.formConfig.formValue.qty;
      let ecode = self.formConfig.formValue.search || self.formConfig.formValue.search1;
      if (ecode) {
        await this.entry(ecode);
        self.formConfig.formValue.qty = 1;
        self.formConfig.formValue.search = "";
        self.formConfig.formValue.search1 = "";
      } else {
        self.$message.error($i18n.t('modalTips.hl')); // 请输入商品
      }
      //调取查询明细方法,传给商品SKU和数量,调用状态为0的保存接口
    },
    async pdtChange(ecode, type = 'search') {
      let self = this;
      let value = ecode
      if (type === 'search1') {
        if (self.formConfig.formData[1].AuotData.length === 0) {
          await this.getData(ecode, 'search1')
        }
        value = self.formConfig.formData[1].AuotData[0].ECODE
      }
      await this.entry(value);
      self.formConfig.formValue.qty = 1;
      self.formConfig.formValue.search = "";
      self.formConfig.formValue.search1 = "";
    },
    //获取list
    getData(search, str) {
      //let search = this.formConfig.formValue.search;
      let self = this;
      let param = {
        isBlur: "Y",
        // isGift: "Y",
        psCSku: {
          // ECODE: ''
        }
      };
      if (str === 'search') {
        param.psCSku.ECODE = search
      } else {
        param.psCSku.PS_C_PRO_ECODE = search
      }
      if (search === "") {
        if (str == 'search') {
          self.formConfig.formData[0].AuotData = [];
        } else if (str == 'search1') {
          self.formConfig.formData[1].AuotData = [];
        }

        return;
      } else {
        self.formConfig.formValue[str] = search;
      }
      this.service.common.skuQuery(param).then(res => {
        if (res.data.code === 0) {
          if (str == 'search') {
            self.formConfig.formData[0].AuotData = res.data.data.data.map(row => {
              return {
                ECODE: row.ECODE,
                PS_C_PRO_ENAME: row.PS_C_PRO_ENAME,
                SPEC: row.SPEC
              };
            });
          } else {
            self.formConfig.formData[1].AuotData = res.data.data.data.map(row => {
              return {
                ECODE: row.ECODE,
                PS_C_PRO_ENAME: row.PS_C_PRO_ENAME,
                SPEC: row.SPEC
              };
            });
          }

        }
      });
    },
    entry(search) {
      let self = this;
      if (!search || search === "") return;
      let formValue = this.formConfig.formValue
      let qty = formValue.qty || 1;
      let param = {
        // isGift: "Y",
        isBlur: "N",
        psCSku: {
          ECODE: search
        }
      };
      this.pageLoad = true
      this.service.common.skuQuery(param).then(res => {
        this.pageLoad = false
        if (res.data.code === 0) {
          //this.formConfig.formValue.search = '';
          //this.$set(this.formConfig.formValue.search,'');
          let lists = res.data.data.data || [];
          // this.formConfig.formValue.search = '';
          // this.formConfig.formValue.qty = 1;
          if (lists.length === 0) {
            this.$Message.error($i18n.t('modalTips.q2'));
            // this.$message.error($i18n.t('modalTips.hm')); // 不存在该商品
            return;
          }
          let obj = lists.length > 0 ? lists[0] : {};
          obj.QTY = qty;
          if (typeof this.componentData.fun === "function") {
            this.componentData.fun(obj);
          }
          this.$nextTick(() => {
            self.formConfig.formValue.search = "";
            self.formConfig.formValue.search1 = "";
          })
        }
      });
    }
  },
};
import businessButton from 'burgeonComponents/businessButton';
import reActionTable from 'burgeonComponents/businessActionTable';

export default {
  name: 'ManualMarking',
  components: {
    reActionTable,
    businessButton,
  },
  props: {
    componentData: {
      type: Object,
      default: {},
    },
  },
  data() {
    const _this = this;
    return {
      vmI18n:$i18n,
      depositConfig: {
        jordanFormConfig: {
          formData: [
            {
              style: 'input',
              // label: "押金订单号",
              label: $i18n.t('form_label.depositOrderNo'),
              value: 'demo1',
              width: '8',
            },
            {
              style: 'input',
              // label: "收货人",
              label: $i18n.t('form_label.consignee'),
              value: 'demo2',
              width: '8',
            },
            {
              style: 'input',
              // label: "收货人手机号",
              label: $i18n.t('form_label.consignee_phone'),
              value: 'demo3',
              width: '8',
            },
            {
              style: 'input',
              // label: "买家昵称",
              label: $i18n.t('table_label.buyerNickname'),
              value: 'demo4',
              width: '8',
            },
            {
              style: 'popInput', // 输入框弹框单多选
              width: '8',
              itemdata: {
                col: 1,
                colid: 179226,
                colname: 'CP_C_SHOP_ID', // 当前字段的名称
                datelimit: 'all',
                display: 'text', // 显示什么类型，例如xml表示弹窗多选加导入功能，mrp表示下拉多选
                fkdisplay: 'drp', // 外键关联类型
                fkdesc: '下单店铺',
                inputname: 'CP_C_STORE_IDS:ENAME', // 这个是做中文类型的模糊查询字段，例如ENAME
                isfk: true, // 是否有fk键
                isnotnull: false, // 是否必填
                isuppercase: false, // 是否转大写
                length: 65535, // 最大长度是多少
                name: $i18n.t('form_label.orderShop'), // 下单店铺
                readonly: false, // 是否可编辑，对应input   readonly属性
                reftable: 'CP_C_SHOP', // 对应的表
                reftableid: 24475, // 对应的表ID
                row: 1,
                statsize: -1,
                type: 'STRING', // 这个是后台用的
                valuedata: '', // 这个是选择的值
                pid: '',
              },
              oneObj: (val) => {
                _this.depositConfig.jordanFormConfig.formValue.CP_C_SHOP_TITLE =
                  val.valuedata;
                _this.depositConfig.jordanFormConfig.formValue.CP_C_SHOP_ID =
                  val.pid;
                _this.depositConfig.jordanFormConfig.formValue.CP_C_PHY_WAREHOUSE_ID =
                  '';
                _this.depositConfig.jordanFormConfig.formValue.CP_C_PHY_WAREHOUSE_ENAME =
                  '';
                _this.depositConfig.jordanFormConfig.formData[5].options = [];
                _this.getWarehouse.call();
              },
            },
            {
              style: 'select', // 下拉框类型
              label: $i18n.t('form_label.delivery_warehouse'), // 发货仓库
              width: '8', // 所占宽度宽度
              value: 'CP_C_PHY_WAREHOUSE_ID', // 输入框的值
              selectChange: () => {
                const optionsArr = _this.formConfig.formData[8].options;
                for (let i = 0; i < optionsArr.length; i++) {
                  if (
                    optionsArr[i].value ===
                    _this.formConfig.formValue.CP_C_PHY_WAREHOUSE_ID
                  ) {
                    _this.depositConfig.jordanFormConfig.formValue.CP_C_PHY_WAREHOUSE_ENAME =
                      optionsArr[i].label;
                    return;
                  }
                }
              }, // 选中事件，默认返回选中的值
              options: [
                // 下拉框选项值
              ],
            },
          ],
          formValue: {
            demo1: '',
            demo2: '',
            demo3: '',
            CP_C_PHY_WAREHOUSE_ID: '',
            CP_C_PHY_WAREHOUSE_ENAME: '',
          },
        },
        jordanBtnConfig: {
          typeAll: 'default', // 按钮统一风格样式
          btnsite: 'right',
          buttons: [
            {
              // text: "查询",
              text: $i18n.t('btn.query'), // 按钮文本
              size: 'small',
              brnclick: () => {
                this.searchChange();
              },
            },
          ],
        },
        pageShow: false,
        isShowSelection: true,
        indexColumn: true,
        columns: [
          {
            // title: "押金订单号",
            title: $i18n.t('form_label.depositOrderNo'),
            key: 'demo1',
          },
          {
            // title: "收货人",
            title: $i18n.t('form_label.consignee'),
            key: 'demo2',
          },
          {
            // title: "卖家昵称",
            title: $i18n.t('table_label.seller_nickname'),
            key: 'demo3',
          },
          {
            // title: "收货人手机",
            title: $i18n.t('form_label.consignee_phone'),
            key: 'demo4',
          },
          {
            // title: "发货仓库",
            title: $i18n.t('form_label.delivery_warehouse'),
            key: 'demo5',
          },
          {
            // title: "物流单号",
            title: $i18n.t('form_label.logisticsOrder_No'),
            key: 'demo6',
          },
          {
            // title: "下单店铺",
            title: $i18n.t('form_label.orderShop'),
            key: 'demo7',
          },
        ],
        data: [],
      },
      btnConfig: {
        typeAll: 'default', // 按钮统一风格样式
        btnsite: 'right', // 按钮位置 (right , center , left)
        buttons: [
          {
            text: $i18n.t('common.cancel'), // 取消
            size: 'small', // 按钮大小
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              this.$parent.$parent.closeConfirm();
            }, // 按钮点击事件
          },
          {
            text: $i18n.t('common.determine'), // 确定
            size: 'small', // 按钮大小
            btnclick: () => {
              this.confirmChange();
            }, // 按钮点击事件
          },
        ],
      },
    };
  },
  methods: {
    // 会员加急发货请求事件
    vipConfirmInfo(params) {
      this.service.orderCenter
        .orderDeliveryUrgent(params)
        .then((res) => {
          if (res.data.code === 0) {
            // this.$Message.success(res.data.message || "会员加急发货打标成功");
            this.$Message.success(
              res.data.message || $i18n.t('modalTips.yd')
            );
            this.$parent.$parent.$parent.selection = [];
            this.$parent.$parent.$parent.getData();
          } else {
            this.$Message.error(res.data.message);
          }
        })
        .finally(() => {
          this.$parent.$parent.closeConfirm();
        });
    },
    // 发货仓库
    async getWarehouse() {
      const formData = new FormData();
      formData.append(
        'param',
        JSON.stringify({
          shopId: this.depositConfig.jordanFormConfig.formValue.CP_C_SHOP_ID,
        })
      );
      if (this.depositConfig.jordanFormConfig.formValue.CP_C_SHOP_ID) {
        const res = await this.service.common.queryPhyWareHouseList(formData);
        if (res.data.code === 0) {
          this.depositConfig.jordanFormConfig.formData.forEach((item) => {
            // 发货仓库
            if (item.label === $i18n.t('form_label.delivery_warehouse'))
              item.options = res.data.data;
          });
        }
      }
    },
    // 查询
    searchChange() {},
    // 弹窗确定事件
    confirmChange() {
      const componentData = this.$props.componentData;
      if (componentData.pageType === 'vip')
        this.vipConfirmInfo(componentData.params);
    },
  },
};

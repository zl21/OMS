import { OmsForm } from 'burgeonComponents';
import { OmsButton } from 'burgeonComponents'

export default {
  components: {
    businessForm,
    businessButton
  },
  data() {
    return {
      vmI18n:$i18n,
      pickorderBtnConfig: {
        typeAll: 'default', // 按钮统一风格样式
        btnsite: 'right', // 按钮位置 (right , center , left)
        buttons: [
          {
            type: '', // 按钮类型
            text: $i18n.t('common.cancel'), // 取消
            icon: '', // 按钮图标
            size: '', // 按钮大小
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              this.$emit('closeActionDialog');
            } // 按钮点击事件
          },
          {
            type: '', // 按钮类型
            text: $i18n.t('common.determine'), // 确定
            icon: '', // 按钮图标
            size: '', // 按钮大小
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              const self = this;
              let promptMessage = ''; // 非空提示信息
              const formData = self.pickorderFromConfig.formData;
              if (!formData[0].itemdata.pid) {
                // 店铺
                promptMessage = $i18n.t('other.shop');
              }
              if (promptMessage) {
                // 不能为空
                this.$Message.warning(promptMessage + $i18n.t('modalTips.y1'));
                return;
              }
              const fromdata = new FormData();
              const param = {
                CP_C_SHOP_ID: formData[0].itemdata.pid,
                PO_NO: self.pickorderFromConfig.formValue.PO_NO
              };
              fromdata.append('param', JSON.stringify(param));
              this.service.orderCenter.generatePoOrder(fromdata).then(res => {
                if (res.data.data.code === 0) {
                  self.$Message.success(res.data.data.message);
                  self.$emit('confirmImport');
                  self.$emit('closeActionDialog');
                } else {
                  self.$Message.error(res.data.data.message);
                  self.$emit('uploadError', res.data.data.data);
                  self.$emit('closeActionDialog');
                }
              });
            } // 按钮点击事件
          }
        ]
      },
      pickorderFromConfig: {
        formValue: {
          PO_NO: '',
          CP_C_SHOP_ID: '',
        },
        ruleValidate: {
          CP_C_SHOP_ID: [
            { required: true }
          ]
        },
        formData: [
          {
            style: 'popInput', // 输入框弹框单多选
            width: '24',
            inputList: [
              {
                childs: [{ colname: 'CP_C_SHOP_ID', refobjid: 'IN (19,999999)', valuedata: 2 }]
              }
            ],
            itemdata: {
              col: 1,
              colid: 167606,
              colname: 'CP_C_SHOP_ID', // 当前字段的名称
              refcolval: {
                fixcolumn: 'CP_C_PLATFORM_ID',
                // expre: "equal",
                srccol: 'CP_C_SHOP_ID'
              },
              datelimit: 'all',
              display: 'text', // 显示什么类型，例如xml表示弹窗多选加导入功能，mrp表示下拉多选
              fkdisplay: 'drp', // 外键关联类型
              fkdesc: $i18n.t('other.shop'), // 店铺
              inputname: 'CP_C_SHOP_ID', // 这个是做中文类型的模糊查询字段，例如ENAME
              isfk: true, // 是否有fk键
              isnotnull: true, // 是否必填
              isuppercase: false, // 是否转大写
              length: 65535, // 最大长度是多少
              name: $i18n.t('other.shop'), // 店铺 input前面显示的lable值
              readonly: false, // 是否可编辑，对应input   readonly属性
              reftable: 'CP_C_SHOP',
              reftableid: 24475,
              row: 1,
              statsize: -1,
              type: 'STRING',
              valuedata: '' // 这个是选择的值
            },
            oneObj: (val) => {
              this.pickorderFromConfig.formValue.CP_C_SHOP_ID = val.pid;
            }
          },
          {
            style: 'input',
            label: 'PO',
            value: 'PO_NO',
            width: '24'
          }
        ]
      }
    };
  },
  mounted() {
  },
  methods: {
  }
};

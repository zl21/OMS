import businessForm from 'professionalComponents/businessForm';
import businessButton from 'professionalComponents/businessButton';

export default {
  components: {
    businessForm,
    businessButton,
  },
  props: {},
  data() {
    return {
      pickorderBtnConfig: {
        typeAll: 'default', // 按钮统一风格样式
        btnsite: 'right', // 按钮位置 (right , center , left)
        buttons: [{
            text: $i18n.t('common.cancel'), // 取消
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              this.$emit('closeActionDialog');
            }, // 按钮点击事件
          },
          {
            text: $i18n.t('common.determine'), // 确定
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              this.determine()
            },
          }
        ],
      },
      pickorderFromConfig: {
        formData: [{
            style: 'radio', // 单选框
            label: $i18n.t('form_label.downloadType'), // 下载类型前面字段
            width: '24', // 宽度
            value: 'TYPE', // 绑定到formValue的值
            radioChange: () => {
              const self = this;
              self.setInputDisplay();
            }, // 切换时的方法
            setRequired: '', // 必选标识,值不为required时无标识
            options: [
              // radio选项
              {
                value: '0',
                label: $i18n.t('form_label.downloadOnly'), // 仅下载拣货单
                disabled: false,
              },
              {
                value: '1',
                label: $i18n.t('form_label.create_and_download'), // 创建并下载拣货单
                disabled: false,
              },
            ],
          },
          {
            version: '1.4',
            style: 'popInput', // 输入框弹框单多选
            width: '24',
            inputList: [{
              childs: [{
                colname: 'CP_C_SHOP_ID',
                refobjid: 'IN (19,999999)',
                valuedata: 2,
              }, ],
            }, ],
            itemdata: {
              col: 1,
              colid: 168567,
              colname: 'CP_C_SHOP_ID', // 当前字段的名称
              /* refcolval: {
                fixcolumn: 'CP_C_PLATFORM_ID',
                srccol: 'CP_C_SHOP_ID',
                custom: true
              }, */
              datelimit: 'all',
              display: 'text', // 显示什么类型，例如xml表示弹窗多选加导入功能，mrp表示下拉多选
              fkdisplay: 'drp', // 外键关联类型
              fkdesc: $i18n.t('other.shop'), // 店铺
              isfk: true, // 是否有fk键
              isnotnull: true, // 是否必填
              isuppercase: false, // 是否转大写
              length: 65535, // 最大长度是多少
              name: $i18n.t('other.shop'), // 店铺input前面显示的lable值
              readonly: false, // 是否可编辑，对应input   readonly属性
              reftable: 'CP_C_SHOP',
              reftableid: 10348,
              row: 1,
              statsize: -1,
              type: 'STRING',
              valuedata: '', // 这个是选择的值
            },
            oneObj: (val) => {
              this.pickorderFromConfig.formValue.CP_C_SHOP_ID = val.pid;
            },
          },
          {
            style: 'input',
            label: 'PO',
            value: 'PO_NO',
            width: '24',
          },
          {
            style: 'input',
            label: $i18n.t('form_label.pickingOrder_no'), // 拣货单号
            placeholder: '可录入多个拣货单号，用逗号分隔',
            value: 'PICK_NO',
            width: '24',
          },
        ],
        formValue: {
          TYPE: '0',
          PICK_NO: '',
          PO_NO: '',
          CP_C_SHOP_ID: '',
        },
        ruleValidate: {
          TYPE: [{
            required: true,
            message: ' '
          }],
          PO_NO: [{
            required: true,
            message: ' '
          }],
          PICK_NO: [{
            required: true,
            message: ' '
          }],
        },
      },
    };
  },
  mounted() {
    const self = this;
    self.pickorderFromConfig.formValue.TYPE = '0';
    self.setInputDisplay();
  },
  methods: {
    setInputDisplay() {
      const self = this;
      const type = self.pickorderFromConfig.formValue.TYPE;
      const poNoData = self.pickorderFromConfig.formData.filter(
        item => item.value === 'PO_NO'
      );
      const pickNoData = self.pickorderFromConfig.formData.filter(
        item => item.value === 'PICK_NO'
      );
      if (type === '0') {
        poNoData[0].style = '';
        pickNoData[0].style = 'input';
        self.pickorderFromConfig.formValue.PO_NO = '';
      } else {
        poNoData[0].style = 'input';
        pickNoData[0].style = '';
        self.pickorderFromConfig.formValue.PICK_NO = '';
      }
    },
    determine() {
      const self = this;
      let promptMessage = ''; // 非空提示信息
      if (!self.pickorderFromConfig.formData[1].itemdata.pid) {
        promptMessage = $i18n.t('other.shop'); // 店铺
      } else if (!self.pickorderFromConfig.formValue.TYPE) {
        promptMessage = $i18n.t('form_label.distributionMode'); // 配送方式
      }
      if (self.pickorderFromConfig.formValue.TYPE === '0') {
        if (!self.pickorderFromConfig.formValue.PICK_NO) {
          promptMessage = $i18n.t('form_label.pickingOrder_no'); // 拣货单号
        }
      } else if (self.pickorderFromConfig.formValue.TYPE === '1') {
        if (!self.pickorderFromConfig.formValue.PO_NO) {
          promptMessage = 'PO';
        }
      }
      if (promptMessage) {
        this.$Message.warning(promptMessage + $i18n.t('modalTips.y1')); // 不能为空
        return;
      }
      const fromdata = new FormData();
      const param = {
        CP_C_SHOP_ID: self.pickorderFromConfig.formData[1].itemdata.pid,
        TYPE: self.pickorderFromConfig.formValue.TYPE,
        PICK_NO: self.pickorderFromConfig.formValue.PICK_NO,
        PO_NO: self.pickorderFromConfig.formValue.PO_NO,
      };
      fromdata.append('param', JSON.stringify(param));
      this.service.orderCenter.downloadPick(fromdata).then(res => {
        if (res.data.code === 0) {
          self.$Message.success(res.data.message);
          self.$emit('confirmImport');
          self.$emit('closeActionDialog');
        } else {
          self.$Message.error(res.data.message);
          self.$emit('uploadError', res.data.data);
          self.$emit('closeActionDialog');
        }
      });
    }

  },
};

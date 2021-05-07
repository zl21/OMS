import businessForm from 'professionalComponents/businessForm';
import businessButton from 'professionalComponents/businessButton';

export default {
  components: {
    businessForm,
    businessButton
  },
  props: {
    objList: {
      type: Array,
      defalut: () => []
    },
    idArray: {
      type: Array,
      defalut: () => []
    },
    webid: {
      type: Number
    },
    tablename: {
      type: String
    },
    selectRowData: {
      type: Array,
      defalut: () => []
    }
  },
  data() {
    return {
      spinShow: false, // loading动画
      vmI18n: window.vmI18n,
      downLoadModal: false,
      taskId: '',
      downLoadBtnConfig: {
        typeAll: 'error', // 按钮统一风格样式
        btnsite: 'right', // 按钮位置 (right , center , left)
        buttons: [
          {
            type: '', // 按钮类型
            text: window.vmI18n.t('common.cancel'), // 取消 按钮文本
            icon: '', // 按钮图标
            size: '', // 按钮大小
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              this.$emit('closeActionDialog', false);
            } // 按钮点击事件
          },
          {
            type: '', // 按钮类型
            text: window.vmI18n.t('common.determine'), // 下载 按钮文本
            icon: '', // 按钮图标
            size: '', // 按钮大小
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              const _this = this;
              if (!_this.receiptFormConfig.formValue.cpCStoreReceiptId) {
                return _this.$Message.error('退供收货仓必填！')
              }
              const params = new FormData();
              params.append('param', JSON.stringify({"ids": _this.idArray, "cpCStoreReceiptId": _this.receiptFormConfig.formValue.cpCStoreReceiptId, "table": "IP_B_VIP_RETURN_ORDER"}));
              _this.service.interfacePlatform.modificationReturnWarehouse(params).then(res => {
                if (res.data.code === 0) {
                  _this.$Message.success(res.data.message);
                  this.$emit('closeActionDialog');
                }
              })
            } // 按钮点击事件
          }
        ]
      },
      receiptFormConfig: {
        formValue: {
          cpCStoreReceiptId: '', // 退供收货仓
        },
        // 表单非空提示
        ruleValidate: {
          cpCStoreReceiptId: [{ required: true, message: ' ', trigger: 'change' }]
        },
        formData: [
          {
            style: 'select', // 下拉框类型
            label: '退供收货仓', // 供应商ID 下拉框前的值
            width: '24', // 所占宽度宽度
            value: 'cpCStoreReceiptId', // 输入框的值
            multiple: false, // 布尔值,下拉框是否开启多选,默认为不开启
            disabled: false, // 是否禁用,默认为false
            clearable: true, // 下拉选中是否显示清空按钮,默认为false
            clearSelect: () => {
            }, // 点击清空按钮回调
            selectChange: () => {
            }, // 选中事件，默认返回选中的值,默认返回当前值value
            setRequired: 'required', // 必选标识,值不为required时无标识
            options: []
          }
        ]
      },
    };
  },
  mounted() {
    const self = this;

    // 获取退供收货仓
    const query = new FormData();
    // query.append('searchdata', JSON.stringify({"table":"CP_C_WAREHOUSE","startindex":0,"range":100,"fixedcolumns":{"ISACTIVE":["=Y"]},"column_include_uicontroller":true,"isolr":false}));
    query.append('searchdata', JSON.stringify({"table":"CP_C_WAREHOUSE","startindex":0,"range":100,"fixedcolumns":{"STORETYPE":["=11"],"ISACTIVE":["=Y"]},"column_include_uicontroller":true,"isolr":false}));
    this.service.common.QueryList(query).then(res => {

      let arr = []
      res.data.datas.row.forEach(item => {
        arr.push({
          label: item.ENAME.val + '  ' + item.ECODE.val,
          value: item.ID.val
        })
      });
      self.receiptFormConfig.formData[0].options = arr
    })

    const dom = document.getElementsByClassName('ark-modal-content')[0]
    dom.style.marginLeft = (document.body.clientWidth - 460)/2 + 'px'
  },
  methods: {
      
  }
};

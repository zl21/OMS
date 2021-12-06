
const { getModuleName } = R3;
export default {
  props: {
    objid: {
      default: ''
    },
    objList: Array,
    rowArr: Array,
    selectRowData: Array,
    idArray: Array, // 明细ids
    webid: '', // 动作定义id
    tablename: '' // 动作定义关联的表格
  },
  data() {
    return {
      btnConfig: {
        typeAll: 'default', // 按钮统一风格样式
        btnsite: 'right', // 按钮位置 (right , center , left)
        buttons: [
          {
            type: '', // 按钮类型
            text: $it('com.cancel'), // 取消
            icon: '', // 按钮图标
            size: '', // 按钮大小
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              this.$emit('closeActionDialog', false);
            }
          },
          {
            type: '', // 按钮类型
            text: $it('com.determine'), // 确定
            icon: '', // 按钮图标
            size: '', // 按钮大小
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              this.submit();
            }
          }
        ]
      },
      formConfig: {
        formValue: {
          lockTime: ''
        },
        formData: [
          {
            style: 'date',
            type: 'datetime', // 日期组件类型,默认为data  (daterange)为双日期区间选择
            label: $it('form_label.delayDate'), // '延期日期'
            width: '24',
            value: 'lockTime',
            format: 'yyyy-MM-dd HH:mm:ss', // 格式参照burgeonui
            placeholder: ''
          }
        ]
      }
    };
  },
  methods: {
    // 确定按钮
    // eslint-disable-next-line consistent-return
    submit() {
      const self = this;
      if (this.formConfig.formValue.lockTime === '') {
        return this.$Message.error($it('modalTips.en')); // 延期日期不能为空！
      }
      const param = {
        delayDate: this.formConfig.formValue.lockTime.Format('yyyy-MM-dd hh:mm:ss'),
        tablename: this.$route.params.tableName,
        ids: this.idArray,
      };
      this.service.strategyPlatform.delayButtonFunction(param).then((res) => {
        this.$emit('closeActionDialog', false);
        if (res.data.code === 0) {
          self.$Message.success(res.data.message);
          self.refreshData();
          self.closeActionDialog();
        } else {
          // self.$Message.error(res.data.message);
          const failInfo = res.data.data;
          const moduleComponentName = `S.${this.$route.params.tableName}.${this.$route.params.tableId}`;// 当前模块名称
          this.$emit('closeActionDialog', true, failInfo, moduleComponentName); // 关闭弹框
        }
      });
    },
    refreshData() {
      this.$emit('confirmImport');
    },
    closeActionDialog() {
      this.$emit('closeActionDialog');
    }
  },
  mounted() {
    // 调用 getModuleName（）返回 S.DC_B_SHOP_PROFIT_LOSS.249130.197
    // 通过  获取store的内容
    const row = this.$store.state[getModuleName()].buttons.selectArr[0];
    console.log();
    let l = '';
    let t = new Date();
    try {
      l = row.END_TIME.val || '';
      t = new Date(l);
      // eslint-disable-next-line no-empty
    } catch (e) { }
    const d = t.Format('yyyy-MM-dd hh:mm:ss');
    this.formConfig.formValue.lockTime = d;
  }
};

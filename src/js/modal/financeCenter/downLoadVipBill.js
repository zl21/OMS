import businessForm from 'professionalComponents/businessForm';
import jordanBtn from 'professionalComponents/businessButton';
import formatData from '@/assets/js/__utils__/date.js';

export default {
  components: {
    businessForm,
    jordanBtn
  },
  name: 'downloadVipBill',
  data() {
    const _this = this;
    return {
      vmI18n: window.vmI18n,
      type: '', // 月结:month 进度: progress
      downLoadFormConfig: {
        formValue: {
          type: '', // 状态 月结账单,进度账单
          // vendorCode: "", //供应商编码
          timerange: [], // 时间区间,
          bill_numbere: '' // 账单编码
        },
        formData: [
          {
            style: 'popInput', // 输入框弹框单多选
            width: '24',
            inputList: [
              {
                childs: [
                  { colname: 'CP_C_SHOP_ID', refobjid: 19, valuedata: 2 }
                ]
              }
            ],
            itemdata: {
              col: 1,
              colid: 167606,
              colname: 'CP_C_SHOP_ID', // 当前字段的名称
              refcolval: {
                fixcolumn: 'CP_C_PLATFORM_ID',
                expre: 'equal',
                srccol: 'CP_C_SHOP_ID'
              },
              datelimit: 'all',
              display: 'text', // 显示什么类型，例如xml表示弹窗多选加导入功能，mrp表示下拉多选
              fkdisplay: 'drp', // 外键关联类型
              fkdesc: window.vmI18n.t('other.shop'), // 店铺
              inputname: 'CP_C_SHOP_ID', // 这个是做中文类型的模糊查询字段，例如ENAME
              isfk: true, // 是否有fk键
              isnotnull: true, // 是否必填
              isuppercase: false, // 是否转大写
              length: 65535, // 最大长度是多少
              name: window.vmI18n.t('other.shop'), // 店铺input前面显示的lable值
              readonly: false, // 是否可编辑，对应input   readonly属性
              reftable: 'CP_C_SHOP',
              reftableid: 24475,
              row: 1,
              statsize: -1,
              type: 'STRING',
              pid: '',
              valuedata: '' // 这个是选择的值
            },
            oneObj: (val) => {
              _this.downLoadFormConfig.formValue.CP_C_SHOP_ID = val.pid;
            }
          },
          {
            style: 'radio', // 输入框类型
            label: window.vmI18n.t('other.downloadMethod'), // 下载方式 输入框前文字
            value: 'type', // 输入框的值
            width: '24', // 所占的宽度 (宽度分为24份,数值代表所占份数的宽度)
            options: [
              // radio选项
              {
                label: '',
                value: ''
              }
            ]
          },
          {
            style: 'date', // 输入框类型
            label: window.vmI18n.t('other.billTime'), // 账单时间 输入框前文字
            value: 'timerange', // 输入框的值
            type: 'datetimerange',
            width: '24', // 所占的宽度 (宽度分为24份,数值代表所占份数的宽度)
            format: 'yyyy-MM-dd HH:mm:ss' // 时间格式
          },
          {
            style: 'input', // 输入框类型
            label: window.vmI18n.t('other.billCode'), // 账单编码 输入框前文字
            value: 'bill_numbere', // 输入框的值
            clearable: true,
            width: '24', // 所占的宽度 (宽度分为24份,数值代表所占份数的宽度)
            inputenter: () => {}
          }
        ],
        ruleValidate: {
          timerange: [{ required: true, message: ' ', trigger: 'blur' }]
        }
      },
      downLoadBtnConfig: {
        typeAll: 'error', // 按钮统一风格样式
        btnsite: 'right', // 按钮位置 (right , center , left)
        buttons: [
          {
            type: '', // 按钮类型
            text: window.vmI18n.t('common.downloadNow'), // 立即下载 按钮文本
            icon: '', // 按钮图标
            size: '', // 按钮大小
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              this.printData();
            } // 按钮点击事件
          }, {
            type: '', // 按钮类型
            text: window.vmI18n.t('common.cancel'), // 取消 按钮文本
            icon: '', // 按钮图标
            size: '', // 按钮大小
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              // this.$parent.$parent.actionDialog.show = false;
              this.$emit('closeActionDialog', false);
            } // 按钮点击事件
          }
        ]
      }
    };
  },
  methods: {
    // 打印
    async printData() {
      const formValue = this.downLoadFormConfig.formValue;
      const startTime = formValue.timerange[0];
      const endTime = formValue.timerange[1];
      if (this.downLoadFormConfig.formData[0].itemdata.pid == '') {
        this.$Message.warning(this.vmI18n.t('modalTips.bg'));// 请输入需要下载的店铺!
        return false;
      }
      if (startTime === '' && endTime === '' && !this.downLoadFormConfig.formValue.bill_numbere) {
        this.$Message.warning(this.vmI18n.t('modalTips.bh'));// 账单时间账单编码不能同时为空!
        return false;
      } 
      // 如果没填写账单编码,则对时间格式进行判断
      if (!this.downLoadFormConfig.formValue.bill_numbere) {
        if (startTime === '' && endTime === '') {
          this.$Message.warning(this.vmI18n.t('modalTips.bi'));// 账单时间不能为空
          return false;
        }
        // 账单时间不能跨月
        if (
          formValue.type === 'billDownload'
            && startTime.getMonth() != endTime.getMonth()
        ) {
          this.$Message.warning(this.vmI18n.t('modalTips.bj'));// 账单时间不能跨月
          return false;
        }
        // 账单时间不能超过11天
        if (
          formValue.type === 'billDownload'
            && endTime - startTime > 1000 * 60 * 60 * 24 * 11
        ) {
          this.$Message.warning(this.vmI18n.t('modalTips.bk'));// 账单时间段天数要小于等于11天
          return false;
        }
      }
      
      const param = {
        shop_id: this.downLoadFormConfig.formData[0].itemdata.pid,
        type: this.downLoadFormConfig.formValue.type,
        start_time: startTime ? formatData.standardTimeConversiondateToStr(startTime, 'yyyy-MM-dd hh:mm:ss') : '',
        end_time: endTime ? formatData.standardTimeConversiondateToStr(endTime, 'yyyy-MM-dd hh:mm:ss') : '',
        bill_numbere: this.downLoadFormConfig.formValue.bill_numbere
      };
      const formdata = new FormData();
      formdata.append('param', JSON.stringify(param));
      const { data: { data } } = await this.service.financeCenter.triggerVipBill(formdata); 
      if (data.Code === 0) {
        this.$message.success(data.Execmsg);
        this.$parent.$parent.actionDialog.show = false;
      } else {
        this.$message.error(data.Execmsg);
      }
      // R3.network.post( "/p/cs/ac/v1/triggerVipBill",fromdata).then(res => {
      //   if (res.data.data.Code === 0) {
      //     this.$Message.success(res.data.data.Execmsg);
      //     this.$parent.$parent.actionDialog.show = false;
      //   } else {
      //     this.$Message.error(res.data.data.Execmsg);
      //   }
      // });
    }
  },
  mounted() {
    window.downLoadVipBill = this;
    // 月结,进度
    if (this.$route.params.tableName == 'AC_F_VIP_BILL_MONTH') {
      this.downLoadFormConfig.formValue.type = 'billMonthDownload';
      this.downLoadFormConfig.formData[1].options[0].label = this.vmI18n.t('modalTips.monthlyBillDownload');// 月结账单下载
      this.downLoadFormConfig.formData[1].options[0].value = 'billMonthDownload';
    } else {
      this.downLoadFormConfig.formValue.type = 'billDownload';
      this.downLoadFormConfig.formData[1].options[0].label = this.vmI18n.t('btn.downloadProgressBill');// 进度账单下载
      this.downLoadFormConfig.formData[1].options[0].value = 'billDownload';
    }
  }
};

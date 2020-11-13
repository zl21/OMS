import axios from 'axios';
import businessForm from 'professionalComponents/businessForm';

export default {
  components: {
    businessForm
  },
  data() {
    const _this = this;
    return {
      vmI18n: window.vmI18n,
      downLoadFormConfig: {
        formValue: {
          shopID: '', // 商品id
          articleNumber: '' // 货号
        },
        formData: [
          {
            style: 'popInput', // 输入框弹框单多选
            width: '24',
            isActive: true,
            isdisabled: false,
            inputList: [
              {
                childs: [{ colname: 'CP_C_SHOP_ID', refobjid: 4, valuedata: 2 }]
              }
            ],
            itemdata: {
              col: 1,
              colid: 167606,
              colname: 'CP_C_SHOP_ID', // 当前字段的名称
              datelimit: 'all',
              refcolval: {
                fixcolumn: 'CP_C_PLATFORM_ID',
                expre: 'equal',
                srccol: 'CP_C_SHOP_ID'
              },
              display: 'text', // 显示什么类型，例如xml表示弹窗多选加导入功能，mrp表示下拉多选
              fkdisplay: 'drp', // 外键关联类型
              fkdesc: vmI18n.t('other.shop'), // 店铺
              inputname: 'CP_C_SHOP_ID', // 这个是做中文类型的模糊查询字段，例如ENAME
              isfk: true, // 是否有fk键
              isnotnull: true, // 是否必填
              isuppercase: false, // 是否转大写
              length: 65535, // 最大长度是多少
              name: window.vmI18n.t('other.shop'), // 店铺 input前面显示的lable值
              readonly: false, // 是否可编辑，对应input   readonly属性
              reftable: 'CP_C_SHOP',
              reftableid: 24475,
              row: 1,
              statsize: -1,
              type: 'STRING',
              valuedata: '' // 这个是选择的值
            }
          },
          {
            style: 'input', // 输入框类型
            label: window.vmI18n.t('form_label.commodityID'), // 商品ID 输入框前文字
            value: vmI18n.t('form_label.commodityID'), // 输入框的值
            width: '24', // 所占的宽度 (宽度分为24份,数值代表所占份数的宽度)
            icon: '', // 输入框后带的图标,暂只有输入框支持
            placeholder: '', // 占位文本，默认为请输入
            ghost: false, // 是否关闭幽灵按钮，默认开启
            inputenter: () => {}, // 表单回车事件
            iconclick: () => {} // 点击icon图标事件
          } /* ,
           {
            style: "input", //输入框类型
            label: "货号", //输入框前文字
            value: "articleNumber", //输入框的值
            width: "24", //所占的宽度 (宽度分为24份,数值代表所占份数的宽度)
            icon: "", //输入框后带的图标,暂只有输入框支持
            placeholder: "", //占位文本，默认为请输入
            ghost: false, //是否关闭幽灵按钮，默认开启
            inputenter: () => {}, //表单回车事件
            iconclick: () => {} //点击icon图标事件
          } */
        ],
      },
      monthSearchStartDate: null,
      timeConfig: {
        data: [],
        config: {
          format: 'yyyy-MM-dd HH:mm:ss',
          valueFormat: 'yyyy-MM-dd HH:mm:ss',
          defaultTime: ['00:00:00', '23:59:59'],
          pickerOptions: {
            onPick({ maxDate, minDate }) {
              if (minDate && !maxDate) {
                _this.monthSearchStartDate = new Date(minDate);
              } else {
                _this.monthSearchStartDate = null;
              }
            },
            disabledDate(time) {
              const oneWeekTime = 7 * 24 * 3600 * 1000;
              if (_this.monthSearchStartDate) {
                return (
                  time.getTime()
                    >= _this.monthSearchStartDate.getTime() + oneWeekTime
                  || time.getTime()
                    <= _this.monthSearchStartDate.getTime() - oneWeekTime
                ); 
              }
            }
          }
        }
      }
    };
  },
  methods: {
    // 下载模板
    async download() {
      const self = this;
      const formValue = self.downLoadFormConfig.formValue;
      if (!self.downLoadFormConfig.formData[0].itemdata.pid) return self.$Message.warning(self.vmI18n.t('modalTips.be'));// 请选择需要下载的店铺
      if (formValue.shopID === '' && !self.timeConfig.data[0]) return self.$Message.warning(self.vmI18n.t('modalTips.bf'));// 商品ID和时间必填其中一个
      const param = {
        shop_id: self.downLoadFormConfig.formData[0].itemdata.pid, // 店铺id 必传
        // item_num:formValue.articleNumber, // 货号
        ware_id: formValue.shopID, // 商品ID
        table: this.$route.params.tableName, // 表名字 必传
        start_time: self.timeConfig.data[0],
        end_time: self.timeConfig.data[1]
      };
      const fromdata = new FormData();
      fromdata.append('param', JSON.stringify(param));
      const res = await this.service.common.itemDownload(fromdata);
      if (res.data.code === 0) {
        self.$Message.success(res.data.message);
        self.$emit('confirmImport');
        self.$emit('closeActionDialog');
      } else {
        self.$Message.error(res.data.message);
      }
    }
  }
};

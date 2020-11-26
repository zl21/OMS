import axios from 'axios';
import businessForm from 'professionalComponents/businessForm';
import jordanBtn from 'professionalComponents/businessButton';

export default {
  components: {
    businessForm,
    jordanBtn
  },
  props: {
    objList: {
      type: Array
    },
    idArray: {
      type: Array
    },
    webid: {
      type: Number
    },
    tablename: {
      type: String
    },
    selectRowData: {
      type: Array
    }
  },
  data() {
    return {
      vmI18n: window.vmI18n,
      downLoadTaobaoGoodsFormConfig: {
        formValue: {
          numNumber: ''
        },
        formData: [
          {
            style: 'popInput', // 输入框弹框单多选
            width: '24',
            isActive: true,
            isdisabled: false,
            inputList: [
              {
                childs: [{ colname: 'CP_C_SHOP_ID', refobjid: 2, valuedata: 2 }]
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
              fkdesc: window.vmI18n.t('other.shop'), // 店铺
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
            label: window.vmI18n.t('form_label.numberCode'), // 数字编号 输入框前文字
            value: 'numNumber', // 输入框的值
            width: '24', // 所占的宽度 (宽度分为24份,数值代表所占份数的宽度)
            icon: '', // 输入框后带的图标,暂只有输入框支持
            placeholder: '', // 占位文本，默认为请输入
            ghost: false, // 是否关闭幽灵按钮，默认开启
            inputenter: () => {}, // 表单回车事件
            iconclick: () => {} // 点击icon图标事件
          },
          {
            style: 'date',
            type: 'datetimerange', // 日期组件类型,默认为data  (daterange)为双日期区间选择
            value: 'timeArr',
            label: window.vmI18n.t('table_label.modificationTime'), // 修改时间
            width: '24',
            format: 'yyyy-MM-dd HH:mm:ss', // 格式参照burgeonui
            placeholder: ''
          }
        ]
      }
    };
  },
  methods: {
    // 下载模板
    download() {
      const self = this;
    }
  }
};

import businessButton from 'professionalComponents/businessButton';
import businessForm from 'professionalComponents/businessForm';
import businessLabel from 'professionalComponents/businessLabel';
import businessStatusFlag from 'professionalComponents/businessStatusFlag';
import businessActionTable from 'professionalComponents/businessActionTable';
import subTable from 'professionalComponents/subTable';
import scheduleFormDialog from '@/views/modal/strategyPlatform/scheduleFormDialog';
import dateUtil from '@/assets/js/__utils__/date.js';
import DialogConfig from 'burgeonConfig/config/dialogs.config';
import businessDialog from 'professionalComponents/businessDialog';
import modifycurrentLabel from '../../../assets/js/mixins/modifycurrentLabel';

export default {
  components: {
    subTable,
    businessButton,
    businessForm,
    businessLabel,
    businessStatusFlag,
    businessActionTable,
    scheduleFormDialog,
    businessDialog
  },
  mixins: [modifycurrentLabel],
  data() {
    return {
      vmI18n:$i18n,
      collapse: ['panel_baseInfo', 'panel_pickInfo', 'panel_warehouseInfo'],
      ID: this.$route.params.customizedModuleId && this.$route.params.customizedModuleId != 'New' ? this.$route.params.customizedModuleId : '-1', // 记录主界面传入的ID
      forceReload: 0, // 组件重载
      loading: false,
      dialogLoading: false,
      isWatchChange: false, // 监听
      isCurSpecial: false, // 是否专配
      isMasterRequired: false, // 主表是否已保存
      isModify: false,
      subTableConfig: {
        centerName: '',
        tablename: '',
        objid: '',
        pageShow: true
      },
      dialogs: DialogConfig.config(),
      // 公共弹框
      // 弹框配置
      scheduleFormConfig: {
        // title: '入库单', // 修改备注
        titleAlign: 'center', // 设置标题是否居中 center left
        // width: '800',
        scrollable: false, // 是否可以滚动
        closable: true, // 是否可以按esc关闭
        draggable: true, // 是否可以拖动
        mask: true, // 是否显示遮罩层
        maskClosable: true, // 是否可以点击叉号关闭
        transfer: true, // 是否将弹层放在body内
        name: 'scheduleFormDialog', // 组件名称
        url: 'modal/strategyPlatform/scheduleFormDialog',
        keepAlive: true,
        excludeString: 'scheduleFormDialog', // 将name传进去，确认不缓存
        componentData: {},
      },
      // dialog: {
      //   pickingForDate: false, // 拣货单-按时间点创建
      //   pickingForStatus: false, // 拣货单-按未拣货数创建
      //   warehouseWarrant: false // 入库单
      // },
      curDialog: '', // 当前弹窗
      btnConfig: {
        typeAll: 'default',
        buttons: [{
          webname: 'lookup_save', // 保存
            text: $i18n.t('btn.save'), // 保存
            size: '', // 按钮大小
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              const self = this;
              self.save();
            },
          },
          {
            webname: 'lookup_return', // 返回
            text: $i18n.t('btn.back'),
            btnclick: () => {
              this.back();
            },
          }
        ]
      }, // 按钮
      formConfig: {
        formData: [
          {
            version: '1.4',
            colname: 'CP_C_SHOP_ID',
            style: 'popInput', // 输入框弹框单多选
            width: '6',
            itemdata: {
              colid: 169130, // 当前字段的ID
              colname: 'CP_C_SHOP_ID', // 当前字段的名称
              fkdisplay: 'drp', // 外键关联类型
              isfk: true, // 是否有fk键
              isnotnull: true, // 是否必填
              name: $i18n.t('other.shop'), // 赔付类型
              readonly: false, // 是否可编辑，对应input   readonly属性
              reftable: 'CP_C_SHOP', // 对应的表
              reftableid: 169130, // 对应的表ID
              valuedata: '' // 这个是选择的值
            },
            oneObj: e => {
              console.log(e);
              this.formConfig.formValue.CP_C_SHOP_ID = e.pid;
              this.masterModifyData('CP_C_SHOP_ID', 'master');
            }
          },
          {
            style: 'input',
            label: $i18n.t('form_label.bo'), // 日程规划名称
            colname: 'NAME',
            value: 'NAME',
            width: '6',
            disabled: false,
            inputChange: () => {
              this.masterModifyData('NAME', 'master');
            }
          },
          {
            style: 'date', // 输入框类型
            label: $i18n.t('form_label.bp'), // 规划开始时间 输入框前文字
            colname: 'BEGIN_TIME',
            type: 'datetime',
            value: 'BEGIN_TIME', // 输入框的值
            width: '6', // 所占的宽度 (宽度分为24份,数值代表所占份数的宽度)
            format: 'yyyy-MM-dd HH:mm:ss',
            disabled: false,
            options: {
              disabledDate (date) {
                return date && date.valueOf() < Date.now() - 86400000;
              }
            },
            onChange: () => {
              this.masterModifyData('BEGIN_TIME', 'master');
            }
          },
          {
            style: 'date', // 输入框类型
            label: $i18n.t('form_label.bq'), // 规划结束时间 输入框前文字
            colname: 'END_TIME',
            type: 'datetime',
            value: 'END_TIME', // 输入框的值
            width: '6', // 所占的宽度 (宽度分为24份,数值代表所占份数的宽度)
            format: 'yyyy-MM-dd HH:mm:ss',
            disabled: false,
            options: {
              disabledDate (date) {
                return date && date.valueOf() < Date.now() - 86400000;
              }
            },
            onChange: () => {
              this.masterModifyData('END_TIME', 'master');
            }
          },
          {
            style: 'input',
            label: $i18n.t('table_label.priority'), // 优先级
            colname: 'RANK',
            value: 'RANK',
            width: '6',
            regx: /^[1-9]$/,
            disabled: false,
            inputChange: () => {
              this.masterModifyData('RANK', 'master');
            }
          },
          {
            style: 'checkbox',
            onlyBox: true,
            label: $i18n.t('form_label.br'), // 补货独立入库
            colname: 'IS_OUTWAREHOUSE_ALONE',
            value: 'IS_OUTWAREHOUSE_ALONE',
            width: '6',
            dataAcessKey: 'IS_OUTWAREHOUSE_ALONE',
            disabled: false,
            checkboxChange: (val) => {
              this.formConfig.formValue.IS_OUTWAREHOUSE_ALONE = val
              this.masterModifyData('IS_OUTWAREHOUSE_ALONE', 'master');
            }
          }
        ],
        formValue: {
          NAME: '', // 日程规划名称
          BEGIN_TIME: '', // 规划开始时间
          END_TIME: '', // 规划结束时间
          RANK: '', // 优先级
          IS_OUTWAREHOUSE_ALONE: false, // 补货独立入库
          CP_C_SHOP_ID: '' // 店铺
        },
        ruleValidate: {
          NAME: [{ required: true, message: ' ' }],
          BEGIN_TIME: [{ required: true, message: ' ' }],
          END_TIME: [{ required: true, message: ' ' }],
          RANK: [{ required: true, message: ' ' }],
          CP_C_SHOP_ID: [{ required: true, message: ' ' }],
        }
      }, // 主表表单
      dialogConfig: [],
      pickingForDate: {
        formData: [{
            style: 'time', // 输入框类型
            label: $i18n.t('table_label.creationTime'), // 创建时间 // 输入框前文字
            colname: 'PICK_CREATE_DATE',
            type: 'time',
            placement: 'bottom',
            value: 'PICK_CREATE_DATE', // 输入框的值
            width: '24', // 所占的宽度 (宽度分为24份,数值代表所占份数的宽度)
            format: 'HH:mm:ss',
            disabled: false,
            onChange: () => {
              this.masterModifyData('PICK_CREATE_DATE', 'picking', 0);
            }
          },
          {
            version: '1.4',
            colname: 'CP_C_ORIG_ID',
            style: 'popInput', // 输入框弹框单多选
            width: '24',
            itemdata: {
              col: 1,
              colid: 169347, // 当前字段的ID
              colname: 'CP_C_ORIG_ID', // 当前字段的名称
              datelimit: 'all',
              display: 'text', // 显示什么类型，例如xml表示弹窗多选加导入功能，mrp表示下拉多选
              fkdisplay: 'mrp', // 外键关联类型
              inputname: 'CP_C_ORIG_ID:ENAME', // 这个是做中文类型的模糊查询字段，例如ENAME
              isfk: true, // 是否有fk键
              isnotnull: true, // 是否必填
              isuppercase: false, // 是否转大写
              istooltip: true,
              length: 65535, // 最大长度是多少
              name: $i18n.t('form_label.bs'), // 唯品会仓库 // 赔付类型
              readonly: false, // 是否可编辑，对应input   readonly属性
              reftable: 'CP_C_ORIG', // 对应的表
              reftableid: 169347, // 对应的表ID
              row: 1,
              statsize: -1,
              type: 'STRING', // 这个是后台用的
              valuedata: '', // 这个是选择的值
              pid: '', // 啥 ？？？
            },
            oneObj: e => {
              this.dialogConfig[0].formConfig.formValue.CP_C_ORIG_ID = e.pid;
              this.masterModifyData('CP_C_ORIG_ID', 'picking', 0);
            },
          },
          {
            style: 'select',
            label: $i18n.t('form_label.bt'), // 拣货单类型
            value: 'PICK_FLAG',
            width: '24',
            disabled: false,
            colname: 'PICK_FLAG',
            selectChange: () => {
              this.masterModifyData('PICK_FLAG', 'picking', 0);
            },
            options: [ // radio选项
              {
                value: '1',
                label: $i18n.t('other.common'), // 普通
              },
              {
                value: '2',
                label: $i18n.t('form_label.bx'), // 补货单 
              },
              {
                value: '3',
                label: $i18n.t('form_label.by'), // 预调拨
              }
            ]
          }
        ],
        formValue: {
          PICK_CREATE_DATE: '', // 创建时间
          PICK_FLAG: '1', // 拣货单类型
          CP_C_ORIG_ID: '' // 唯品会仓库ID
        },
        ruleValidate: {
          PICK_CREATE_DATE: [{
            required: true,
            message: ' '
          }],
          PICK_FLAG: [{
            required: true,
            message: ' '
          }],
          CP_C_ORIG_ID: [{
            required: true,
            message: ' '
          }]
        }
      }, // 拣货单表单-按时间点创建
      pickingForStatus: {
        formData: [
          {
            style: 'select',
            label: $i18n.t('form_label.bu'), // 未拣货数维度
            value: 'NOT_PICK_NUM_LATITUDE',
            width: '24',
            disabled: false,
            colname: 'NOT_PICK_NUM_LATITUDE',
            selectChange: () => {
              this.masterModifyData('NOT_PICK_NUM_LATITUDE', 'picking', 0);
            },
            options: [ // radio选项
              {
                value: '1',
                label: $i18n.t('form_label.c9'), // PO维度
              },
              {
                value: '2',
                label: $i18n.t('form_label.c8'), // 单PO下唯品会仓库维度
              }
            ]
          },
          {
            style: 'input',
            label: $i18n.t('form_label.bv'), // 创建峰值
            colname: 'PEAK_VALUE',
            value: 'PEAK_VALUE',
            width: '24',
            regx: /^[0-9]*$/,
            disabled: false,
            inputChange: () => {
              this.masterModifyData('PEAK_VALUE', 'picking', 0);
            }
          },
          {
            style: 'select',
            label: $i18n.t('form_label.bw'), // 自动拣货间隔时间
            value: 'AUTO_PICK_TIME_INTERVAL',
            width: '24',
            disabled: false,
            colname: 'AUTO_PICK_TIME_INTERVAL',
            selectChange: () => {
              this.masterModifyData('AUTO_PICK_TIME_INTERVAL', 'picking', 0);
            },
            options: [ // radio选项
              // {
              //   value: '0.5',
              //   label: "0.5h",
              // },
              // {
              //   value: '1',
              //   label: "1h",
              // },
              // {
              //   value: '2',
              //   label: "2h",
              // },
              // {
              //   value: '3',
              //   label: "3h",
              // },
              // {
              //   value: '4',
              //   label: "4h",
              // },
              // {
              //   value: '5',
              //   label: "5h",
              // },
              // {
              //   value: '6',
              //   label: "6h",
              // }
            ]
          },
          {
            version: '1.4',
            colname: 'CP_C_ORIG_ID',
            style: 'popInput', // 输入框弹框单多选
            width: '24',
            itemdata: {
              col: 1,
              colid: 169347, // 当前字段的ID
              colname: 'CP_C_ORIG_ID', // 当前字段的名称
              datelimit: 'all',
              display: 'text', // 显示什么类型，例如xml表示弹窗多选加导入功能，mrp表示下拉多选
              fkdisplay: 'mrp', // 外键关联类型
              inputname: 'CP_C_ORIG_ID:ECODE', // 这个是做中文类型的模糊查询字段，例如ENAME
              isfk: true, // 是否有fk键
              isnotnull: true, // 是否必填
              isuppercase: false, // 是否转大写
              istooltip: true,
              length: 65535, // 最大长度是多少
              name: $i18n.t('form_label.bs'), // 唯品会仓库 // 赔付类型
              readonly: false, // 是否可编辑，对应input   readonly属性
              reftable: 'CP_C_ORIG', // 对应的表
              reftableid: 169347, // 对应的表ID
              row: 1,
              statsize: -1,
              type: 'STRING', // 这个是后台用的
              valuedata: '', // 这个是选择的值
              pid: '', // 啥 ？？？
            },
            oneObj: e => {
              console.log(e);
              this.dialogConfig[0].formConfig.formValue.CP_C_ORIG_ID = e.pid;
              this.masterModifyData('CP_C_ORIG_ID', 'picking', 0);
            },
          },
          {
            style: 'select',
            label: $i18n.t('form_label.bt'), // 拣货单类型
            value: 'PICK_FLAG',
            width: '24',
            disabled: false,
            colname: 'PICK_FLAG',
            selectChange: () => {
              this.masterModifyData('PICK_FLAG', 'picking', 0);
            },
            options: [ // radio选项
              {
                value: '1',
                label: $i18n.t('other.common'), // 普通
              },
              {
                value: '2',
                label: $i18n.t('form_label.bx'), // 补货单
              },
              {
                value: '3',
                label: $i18n.t('form_label.by'), // 预调拨
              }
            ]
          }
        ],
        formValue: {
          NOT_PICK_NUM_LATITUDE: '1', // 未拣货数维度
          PEAK_VALUE: '', // 创建峰值
          AUTO_PICK_TIME_INTERVAL: '2.00', // 自动拣货间隔时间
          PICK_FLAG: '1', // 拣货单类型
          CP_C_ORIG_ID: '' // 唯品会仓库ID
        },
        ruleValidate: {
          NOT_PICK_NUM_LATITUDE: [{
            required: true,
            message: ' '
          }],
          PEAK_VALUE: [{
            required: true,
            message: ' '
          }],
          AUTO_PICK_TIME_INTERVAL: [{
            required: true,
            message: ' '
          }],
          PICK_FLAG: [{
            required: true,
            message: ' '
          }],
          CP_C_ORIG_ID: [{
            required: true,
            message: ' '
          }]
        }
      }, // 拣货单表单-按未拣货数创建
      warehouseWarrant: [
        { 
          title: $i18n.t('panel_label.aa'), // 创建条件
          formConfig: {
            formData: [{
              style: 'input',
              label: $i18n.t('form_label.bv'), // 创建峰值
              colname: 'PEAK_VALUE',
              value: 'PEAK_VALUE',
              width: '12',
              regx: /^[0-9]*$/,
              disabled: false,
              tips: {
                content:  $i18n.t('modalTips.hw') // 当“店铺+唯品会仓库+发货仓库”相同的配货单中商品数量大于等于设置的峰值时，自动创建入库单
              },
              inputChange: () => {
                this.masterModifyData('PEAK_VALUE', 'warehouseWarrant', 0);
              }
            }],
            formValue: {
              PEAK_VALUE: ''
            },
            ruleValidate: {
              PEAK_VALUE: [{
                required: true,
                message: ' '
              }]
            }
          },
        },
        {
          title: $i18n.t('panel_label.a8'), // 创建内容
          formConfig: {
            formData: [
              {
                version: '1.4',
                colname: 'CP_C_PHY_WAREHOUSE_ID',
                style: 'popInput', // 输入框弹框单多选
                width: '12',
                itemdata: {
                  col: 1,
                  colid: 169375, // 当前字段的ID
                  colname: 'CP_C_PHY_WAREHOUSE_ID', // 当前字段的名称
                  datelimit: 'all',
                  display: 'text', // 显示什么类型，例如xml表示弹窗多选加导入功能，mrp表示下拉多选
                  fkdisplay: 'mrp', // 外键关联类型
                  inputname: 'CP_C_PHY_WAREHOUSE_ID:ECODE', // 这个是做中文类型的模糊查询字段，例如ENAME
                  isfk: true, // 是否有fk键
                  isnotnull: true, // 是否必填
                  isuppercase: false, // 是否转大写
                  istooltip: true,
                  length: 65535, // 最大长度是多少
                  name: $i18n.t('form_label.delivery_warehouse'), // 发货仓库 // 赔付类型
                  readonly: false, // 是否可编辑，对应input   readonly属性
                  reftable: 'CP_C_PHY_WAREHOUSE', // 对应的表
                  reftableid: 169375, // 对应的表ID
                  row: 1,
                  statsize: -1,
                  type: 'STRING', // 这个是后台用的
                  valuedata: '', // 这个是选择的值
                  pid: '', // 啥 ？？？
                },
                oneObj: e => {
                  console.log(e);
                  this.dialogConfig[1].formConfig.formValue.CP_C_PHY_WAREHOUSE_ID = e.pid;
                  this.masterModifyData('CP_C_PHY_WAREHOUSE_ID', 'warehouseWarrant', 1);
                },
              },
              {
                style: 'select',
                label: $i18n.t('form_label.bz'), // 承运商
                value: 'CARRIER_CODE',
                width: '12',
                disabled: false,
                colname: 'CARRIER_CODE',
                selectChange: () => {
                  this.togglePlatform();
                  this.masterModifyData('CARRIER_CODE', 'warehouseWarrant', 1);
                }, // 选中事件，默认返回选中的值,默认返回当前值value
                options: [ // radio选项
                  {
                    value: '120001552',
                    label: '唯品会专配',
                  },
                  {
                    value: '1200000538',
                    label: '顺丰陆运',
                  }
                ]
              },
              {
                style: 'checkbox', // 输入框类型
                label: $i18n.t('form_label.c0'), // 航空禁运 // 输入框前文字
                colname: 'IS_AIR_EMBARGO',
                value: 'IS_AIR_EMBARGO', // 输入框的值
                width: '24', // 所占的宽度 (宽度分为24份,数值代表所占份数的宽度)
                disabled: false,
                checkboxChange: () => {
                  this.masterModifyData('IS_AIR_EMBARGO', 'warehouseWarrant', 1);
                }
              },
              {
                style: 'select',
                label: $i18n.t('form_label.c1'), // 发货间隔
                value: 'EXP_SEND_INTERVAL',
                width: '12',
                disabled: false,
                colname: 'EXP_SEND_INTERVAL',
                selectChange: () => {
                  this.masterModifyData('EXP_SEND_INTERVAL', 'warehouseWarrant', 1);
                },
                options: [ // radio选项
                  {
                    value: '0',
                    label: $i18n.t('form_label.c2'), // 当日
                  },
                  {
                    value: '1',
                    label: $i18n.t('form_label.c3'), // 次日
                  }
                ]
              },
              {
                style: 'time', // 输入框类型
                label: $i18n.t('form_label.c4'), // 发货时间 // 输入框前文字
                colname: 'EXP_SENDTIME',
                type: 'time',
                value: 'EXP_SENDTIME', // 输入框的值
                width: '12', // 所占的宽度 (宽度分为24份,数值代表所占份数的宽度)
                format: 'HH:mm:ss',
                disabled: false,
                onChange: () => {
                  this.masterModifyData('EXP_SENDTIME', 'warehouseWarrant', 1);
                }
              },
              {
                style: 'select',
                label: $i18n.t('form_label.c5'), // 到货间隔
                value: 'ARRIVAL_INTERVAL',
                width: '12',
                disabled: false,
                colname: 'ARRIVAL_INTERVAL',
                selectChange: () => {
                  this.masterModifyData('ARRIVAL_INTERVAL', 'warehouseWarrant', 1);
                },
                options: [ // radio选项
                  {
                    value: '0',
                    label: $i18n.t('form_label.c2'), // 当日
                  },
                  {
                    value: '1',
                    label: $i18n.t('form_label.c3'), // 次日
                  }
                ]
              },
              {
                style: 'select', // 输入框类型
                label: $i18n.t('form_label.c6'), // 到货时间 输入框前文字
                colname: 'EXP_ARRIVETIME',
                value: 'EXP_ARRIVETIME', // 输入框的值
                width: '12', // 所占的宽度 (宽度分为24份,数值代表所占份数的宽度)
                disabled: false,
                selectChange: () => {
                  this.masterModifyData('EXP_ARRIVETIME', 'warehouseWarrant', 1);
                },
                options: []
              }
            ],
            formValue: {
              CARRIER_CODE: '120001552', // 承运商
              EXP_SEND_INTERVAL: '0', // 发货间隔
              EXP_SENDTIME: '', // 发货时间
              ARRIVAL_INTERVAL: '0', // 到货间隔
              EXP_ARRIVETIME: '', // 到货时间
              IS_AIR_EMBARGO: false, // 航空禁运
              DELIVERY_METHOD: '2', // 配送方式
            },
            ruleValidate: {
              CARRIER_CODE: [{
                required: true,
                message: ' '
              }],
              EXP_SEND_INTERVAL: [{
                required: true,
                message: ' '
              }],
              EXP_SENDTIME: [{
                required: true,
                message: ' '
              }],
              CP_C_PHY_WAREHOUSE_ID: [{
                required: true,
                message: ' '
              }],
              ARRIVAL_INTERVAL: [{
                required: false,
                message: ' '
              }],
              EXP_ARRIVETIME: [{
                required: false,
                message: ' '
              }],
              DELIVERY_METHOD: [{
                required: false,
                message: ' '
              }]
            }
          },
        },
        {
          title: $i18n.t('panel_label.a9'), // 入库单结单
          formConfig: {
            formData: [{
              style: 'time', // 输入框类型
              label: $i18n.t('form_label.c7'), // 入库单结单时间 输入框前文字
              colname: 'STATEMENT_TIME',
              type: 'time',
              value: 'STATEMENT_TIME', // 输入框的值
              width: '12', // 所占的宽度 (宽度分为24份,数值代表所占份数的宽度)
              format: 'HH:mm:ss',
              disabled: false,
              tips: {
                content: $i18n.t('modalTips.hv') // 每天在该时间点自动对创建的入库单结单
              },
              onChange: () => {
                this.masterModifyData('STATEMENT_TIME', 'warehouseWarrant', 2);
              }
            }],
            formValue: {
              STATEMENT_TIME: ''
            },
            ruleValidate: {
              STATEMENT_TIME: [{
                required: true,
                message: ' '
              }]
            }
          }
        }
      ], // 入库单表单
      formConfigData: [
        {
          style: 'checkbox', // 输入框类型
          label: $i18n.t('form_label.c0'), // 航空禁运 输入框前文字
          colname: 'IS_AIR_EMBARGO',
          value: 'IS_AIR_EMBARGO', // 输入框的值
          width: '24', // 所占的宽度 (宽度分为24份,数值代表所占份数的宽度)
          disabled: false,
          checkboxChange: () => {
            this.masterModifyData('IS_AIR_EMBARGO', 'warehouseWarrant', 1);
          }
        },
        {
          style: 'select',
          label: $i18n.t('form_label.distributionMode'), // 配送方式
          value: 'DELIVERY_METHOD',
          width: '24',
          disabled: false,
          colname: 'DELIVERY_METHOD',
          selectChange: () => {
            this.masterModifyData('DELIVERY_METHOD', 'warehouseWarrant', 1);
            this.toggleMethod();
          },
          options: [ // radio选项
            {
              value: '2',
              label: $i18n.t('form_label.ca'), // 空运
            },
            {
              value: '1',
              label: $i18n.t('form_label.cb'), // 汽运
            }
          ]
        }
      ], // 切换承运商时填充的字段
      pickingTableConfig: {
        // isSearchText: true, // 是否修改搜索框为select
        // isShowDeleteDetailBtn: false, // 控制是否显示删除明细
        // isShowAddDetailBtn: false, // 控制是否显示新增明细
        // searchSelectList: [], // isSearchText为false的情况下使用 搜索框list
        pageShow: false, // 控制分页是否显示
        searchInputShow: false, // 控制搜索框是否显示
        width: '', // 表格宽度
        border: true, // 是否显示纵向边框
        total: 0, // 设置总条数
        pageSizeOpts: [10, 20, 30,50,100], // 每页条数切换的配置
        pageSize: 10, // 默认每页条数100条，产品要求
        pageIndex: 1, // 页码
        totalData: [],
        selectionData: [],
        deleteData: [], // 暂存删除的数据，调保存的时候传给后端
        addData: [], // 暂存添加的数据，调保存的时候传给后端
        updateData: [], // 暂存修改的数据，调保存的时候传给后端
        data: [], // TODO 假数据
        columns: [
          {
            type: 'selection',
            width: 30,
            align: 'right'
          },
          {
            type: 'index',
            width: 60,
            align: 'left',
            title: $i18n.t('table_label.serialNo'), // 序号
          },
          {
            title: $i18n.t('table_label.operation'), // 操作
            key: 'demo5',
            render: (h, params) => h('div', [
              h(
                'Button',
                {
                  props: {
                    type: 'text',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      let isForDate = this.pickingTableConfig.businessFormConfig.formValue.PICK_CREATE_TYPE == 1;
                      let dialog = isForDate ? 'pickingForDate' : 'pickingForStatus';
                      this.handleDialog(dialog, params.row, true);
                    }
                  }
                },
                $i18n.t('table_label.edit') // 编辑
              ),
              h(
                'Button',
                {
                  props: {
                    type: 'text',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.$Modal.info({
                        title: $i18n.t('modalTitle.tips'), // 提示
                        content: $i18n.t('modalTitle.ht'), // 确定删除？
                        mask: true,
                        showCancel: true,
                        okText: $i18n.t('common.determine'), // 确定
                        cancelText: $i18n.t('common.cancel'), // 取消
                        onOk: () => {
                          this.subTableDelete(params.row.ID, 'pickingTableConfig');
                        },
                      });
                    }
                  }
                },
                $i18n.t('btn.delete') // 删除
              )
            ])
          }
        ],
        businessFormConfig: {
          formData: [
            {
              style: 'radio',
              label: $i18n.t('form_label.cc'), // 拣货单创建方式
              value: 'PICK_CREATE_TYPE',
              colname: 'PICK_CREATE_TYPE',
              width: '24',
              disabled: false,
              setRequired: '', // 必选标识,值不为required时无标识
              radioChange: ()=>{
                if (!this.pickingTableConfig.data.length) return;
                this.$Modal.info({
                  title: $i18n.t('modalTitle.tips'), // 提示
                  content: $i18n.t('modalTitle.hx'), // 当前切换操作会清空已录入的按时间点创建/按未拣货数创建内容，确定继续吗？
                  mask: true,
                  showCancel: true,
                  okText: $i18n.t('common.determine'), // 确定
                  cancelText: $i18n.t('common.cancel'), // 取消
                  onOk: () => {
                    this.initPickTable();
                    this.subTableDelete(-1, 'pickingTableConfig');
                  },
                  onCancel: () => {
                    const { PICK_CREATE_TYPE } = this.pickingTableConfig.businessFormConfig.formValue;
                    this.pickingTableConfig.businessFormConfig.formValue.PICK_CREATE_TYPE = PICK_CREATE_TYPE == 1 ? 2 : 1;
                  }
                });
              }, // 切换时的方法
              options: [ // radio选项
                {
                  value: 1,
                  label: $i18n.t('panel_label.ap'), // 按时间点创建
                },
                {
                  value: 2,
                  label: $i18n.t('panel_label.ab'), // 按未拣货数创建
                }
              ]
            }
          ],
          formValue: {
            PICK_CREATE_TYPE: 1
          },
          ruleValidate: {
            PICK_CREATE_TYPE: [{
              required: true,
              message: ' '
            }]
          }
        },
        businessButtonConfig: {
          typeAll: 'default',
          buttons: [
            {
              text: $i18n.t('btn.add'), // 新增
              size: '', // 按钮大小
              disabled: false, // 按钮禁用控制
              btnclick: () => {
                let dialog = this.pickingTableConfig.businessFormConfig.formValue.PICK_CREATE_TYPE == 1 ? 'pickingForDate' : 'pickingForStatus';
                this.handleDialog(dialog, '', false);
              }
            }
          ]
        }
      },
      pickTableHeaders: [
        [{
          title: $i18n.t('table_label.creationTime'), // 创建时间
          key: 'PICK_CREATE_DATE',
        },
        {
          title: $i18n.t('form_label.bs'), // 唯品会仓库
          key: 'CP_C_ORIG_ENAME',
        },
        {
          title: $i18n.t('form_label.bt'), // 拣货单类型
          key: 'PICK_FLAG_STR'
        }],
        [{
          title: $i18n.t('form_label.bu'), // 未拣货数维度
          key: 'NOT_PICK_NUM_LATITUDE_STR'
        },
        {
          title: $i18n.t('form_label.bv'), // 创建峰值
          key: 'PEAK_VALUE',
        },
        {
          title: $i18n.t('form_label.bw'), // 自动拣货间隔时间
          key: 'AUTO_PICK_TIME_INTERVAL_STR',
        },
        {
          title: $i18n.t('form_label.bs'), // 唯品会仓库
          key: 'CP_C_ORIG_ENAME',
        },
        {
          title: $i18n.t('form_label.bt'), // 拣货单类型
          key: 'PICK_FLAG_STR',
        }]
      ],
      warehouseWarrantConfig: {
        pageShow: false, // 控制分页是否显示
        searchInputShow: false, // 控制搜索框是否显示
        width: '', // 表格宽度
        border: true, // 是否显示纵向边框
        total: 0, // 设置总条数
        pageSizeOpts: [10, 20, 30,50,100], // 每页条数切换的配置
        pageSize: 10, // 默认每页条数100条，产品要求
        pageIndex: 1, // 页码
        totalData: [],
        selectionData: [],
        deleteData: [], // 暂存删除的数据，调保存的时候传给后端
        addData: [], // 暂存添加的数据，调保存的时候传给后端
        updateData: [], // 暂存修改的数据，调保存的时候传给后端
        data: [], // TODO 假数据
        columns: [
          {
            type: 'selection',
            width: 30,
            align: 'right'
          },
          {
            type: 'index',
            width: 60,
            align: 'left',
            title: $i18n.t('table_label.serialNo'), // 序号
          },
          {
            title: $i18n.t('table_label.operation'), // 操作
            key: 'demo5',
            render: (h, params) => h('div', [
              h(
                'Button',
                {
                  props: {
                    type: 'text',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.handleDialog('warehouseWarrant', params.row, true);
                    }
                  }
                },
                $i18n.t('table_label.edit') // 编辑
              ),
              h(
                'Button',
                {
                  props: {
                    type: 'text',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.$Modal.info({
                        title: $i18n.t('modalTitle.tips'), // 提示
                        content: $i18n.t('modalTitle.ht'), // 确定删除？
                        mask: true,
                        showCancel: true,
                        okText: $i18n.t('common.determine'), // 确定
                        cancelText: $i18n.t('common.cancel'), // 取消
                        onOk: () => {
                          this.subTableDelete(params.row.ID, 'warehouseWarrantConfig');
                        },
                      });
                    }
                  }
                },
                $i18n.t('btn.delete') // 删除
              )
            ])
          },
          {
            title: $i18n.t('form_label.bv'), // 创建峰值
            key: 'PEAK_VALUE',
          },
          {
            title: $i18n.t('form_label.delivery_warehouse'), // 发货仓库
            key: 'CP_C_PHY_WAREHOUSE_ENAME',
          },
          {
            title: $i18n.t('form_label.bz'), // 承运商
            key: 'CARRIER_CODE_STR',
          },
          {
            title: $i18n.t('form_label.c1'), // 发货间隔
            key: 'EXP_SEND_INTERVAL_STR',
          },
          {
            title: $i18n.t('form_label.c4'), // 发货时间
            key: 'EXP_SENDTIME',
          },
          {
            title: $i18n.t('form_label.c5'), // 到货间隔
            key: 'ARRIVAL_INTERVAL_STR',
          },
          {
            title: $i18n.t('form_label.c6'), // 到货时间
            key: 'EXP_ARRIVETIME',
          },
          {
            title: $i18n.t('form_label.c7'), // 入库单结单时间
            key: 'STATEMENT_TIME',
          },
          {
            title: $i18n.t('form_label.distributionMode'), // 配送方式
            key: 'DELIVERY_METHOD_STR',
          },
          {
            title: $i18n.t('form_label.c0'), // 航空禁运
            key: 'IS_AIR_EMBARGO',
            render: (h, params) => h('span', params.row.IS_AIR_EMBARGO == '0' ? '否' : '是')
          }
        ],
        businessButtonConfig: {
          typeAll: 'default',
          buttons: [
            {
              text: $i18n.t('btn.add'), // 新增
              size: '', // 按钮大小
              disabled: false, // 按钮禁用控制
              btnclick: () => {
                this.handleDialog('warehouseWarrant', '', false);
              }
            }
          ]
        }
      },
      // tab切换配置
      labelList: [
        {
          label: $i18n.t('panel_label.operationLog'), // 操作日志
          value: 'ST_C_VIPCOM_PROJECT_LOG',
        }
      ],
      labelDefaultValue: 'ST_C_VIPCOM_PROJECT_LOG', // 设置tab默认值，默认展示《自定义属性》
      modify: {
        master: {}, // 主表信息
        picking: {}, // 拣货单
        warehouseWarrant: {} // 入库单
      }, // 修改的信息
      initDetail: {},
      carrierOptions: [], // 承运商 
      arrivalTimeOptions: [] // 到货时间 空运-汽运的不同选项值
    };
  },
  async mounted() {
    // this.getBtn()
    await this.carrierDropList(); // 承运商下拉项
    this.querySchedule();
    this.subTableConfig = {
      centerName: 'strategyPlatform',
      tablename: this.labelDefaultValue,
      objid: this.ID,
      pageShow: true
    }
  },
  computed: {
    dialogInfo() {
      return this.curDialog == 'warehouseWarrant'
        ? { title: $i18n.t('panel_label.ac'), width: '800px' }
        : { title: $i18n.t('panel_label.ad'), width: '400px' };
    }
  },
  methods: {
    // 获取按钮权限
    getBtn() {
      $omsUtils.getPermissions(this, 'btnConfig', { table: 'ST_C_VIPCOM_PROJECT', type: 'OBJ', serviceId: 'r3-oc-oms' }, true).then(res => {
        const { ACTIONS, SUB_ACTIONS } = res;
        console.log('buttons::', this.btnConfig.buttons, 'res::', res);
        const webArr = $OMS2.omsUtils.sonList(SUB_ACTIONS, 'webname');
        this.jordanTableConfig.isShowDeleteDetailBtn = webArr.includes($i18n.t('btn.delete')); // 删除
        this.jordanTableConfig.isShowImportBtn = webArr.includes($i18n.t('btn.import')); // 导入
      });
    },
    // 时间戳格式化
    formatDate(time, format) {
      const date = new Date(time);
      return dateUtil.getFormatDate(date, format || 'yyyy-MM-dd HH:mm:ss');
    },
    // 返回
    back() {
      if (this.isModify) {
        this.$Modal.info({
          title: $i18n.t('modalTitle.tips'), // 提示
          content: $i18n.t('modalTips.hu'), // 当前修改未保存，确定返回？
          mask: true,
          showCancel: true,
          okText: $i18n.t('common.determine'), // 确定
          cancelText: $i18n.t('common.cancel'), // 取消
          onOk: () => {
            this.onOk();
          },
        });
      } else {
        this.onOk();
      }
    },
    onOk() {
      this.$comUtils.tabCloseAppoint(this);
      this.$destroy(true);
      this.$store.commit('global/tabOpen', {
        tableId: 10406,
        type: 'S',
        tableName: 'ST_C_VIPCOM_PROJECT',
        back: true,
      });
    },
    // 弹窗显示隐藏
    handleDialog(key, detail, isEdit) {
      // this.dialog[key] = !this.dialog[key];
      this.dialogConfig = key == 'warehouseWarrant' ? this[key] : [{ formConfig: this[key] }];
      this.curDialog = key;
      this.initDetail = detail || {};
      this.initForm(detail, isEdit);
      
      console.log(this.dialogConfig);
      this.scheduleFormConfig.componentData = {
        ID: this.ID,
        tableName: 'ST_C_VIPCOM_PROJECT',
        dialogConfig: this.dialogConfig,
        detail: detail || {},
        type: key
      };
      this.scheduleFormConfig = {
        ...this.scheduleFormConfig,
        title: this.dialogInfo.title,
        width: this.dialogInfo.width
      };
      setTimeout(() => {
        this.$children.find(item => item.name === 'scheduleFormDialog').openConfirm();
      }, 800);
     
    },
    /**
     * 记录主/子表修改信息方法
     * @param {*} ecode 记录字段
     * @param {*} obj 修改值存在modify下的某个对象中
     * @param {*} index 修改值存在formConfig索引
     */
     masterModifyData(ecode, obj, index) {
      const self = this;
      if (!this.isWatchChange) return;
      self.isModify = true;
      let value = index != undefined 
        ? self.dialogConfig[index].formConfig.formValue[ecode]
        : self.formConfig.formValue[ecode];
      let type = Object.prototype.toString.call(value);

      if (type == '[object Date]') {
        let newTime = this.formatDate(value)
        let oldTime = self.modify[obj][ecode]
        if (ecode == 'END_TIME') {
          newTime = $omsUtils.defaultEndTime(newTime, oldTime)
          self.formConfig.formValue[ecode] = newTime
        }
        self.modify[obj][ecode] = newTime
      } else {
        self.modify[obj][ecode] = ecode == 'IS_OUTWAREHOUSE_ALONE' ? Number(value) : value;
      }
    },
    // 是否专配
    async curSpecial() {
      const formConfig2 = this.dialogConfig[1].formConfig;
      const CARRIER_CODE = formConfig2.formValue.CARRIER_CODE;
      const specialObj = this.carrierOptions.find(i => i.checked);
      this.isCurSpecial = specialObj ? specialObj.value == CARRIER_CODE : false;
    },
    // 承运商切换字段显示隐藏
    togglePlatform() {
      this.forceReload += 1; // 组件重载
      this.curSpecial();

      /** 填充表单字段处理 */
      const formConfig2 = this.dialogConfig[1].formConfig;
      let fillColName = this.isCurSpecial ? 'IS_AIR_EMBARGO' : 'DELIVERY_METHOD'; // 填充字段
      let fillColNameIndex = this.formConfigData.findIndex(i => i.colname == fillColName); // 填充字段索引
      formConfig2.formData.splice(2, 1, this.formConfigData[fillColNameIndex]);

      /** 相关字段值处理 */
      if (this.isCurSpecial) {
        this.modify.warehouseWarrant.IS_AIR_EMBARGO = 0;
        delete this.modify.warehouseWarrant.DELIVERY_METHOD;
      } else {
        formConfig2.formValue.DELIVERY_METHOD = '2';
        this.modify.warehouseWarrant.DELIVERY_METHOD = '2';
        delete this.modify.warehouseWarrant.IS_AIR_EMBARGO;
      }
      this.toggleMethod();

      const HANDLE_FIELDS = ['ARRIVAL_INTERVAL', 'EXP_ARRIVETIME', 'DELIVERY_METHOD'];
      formConfig2.ruleValidate = this.setRules(formConfig2.ruleValidate, HANDLE_FIELDS, !this.isCurSpecial);
    },
    /**
     * 字段校验处理
     * @param {*} rules ruleValidate
     * @param {*} fields 待处理字段
     * @param {*} isRequired 是否必填
     * @returns 
     */
    setRules(rules, fields, isRequired) {
      return Object.fromEntries(
        Object.entries(rules)
        .map(([key, value]) => {
          fields.includes(key) && (value[0].required = isRequired);
          return [key, value];
        })
      );
    },
    // 配送方式切换
    toggleMethod() {
      const formConfig2 = this.dialogConfig[1].formConfig;
      const isAirTrans = formConfig2.formValue.DELIVERY_METHOD == '2';
      const optionsIndex = this.isCurSpecial || !this.isCurSpecial && isAirTrans ? 0 : 1;
      let options = this.arrivalTimeOptions[optionsIndex];
      this.fillSelectOptions(formConfig2, options, 'EXP_ARRIVETIME');
    },
    // 初始化拣货单表格
    initPickTable() {
      let isPickForDate = this.pickingTableConfig.businessFormConfig.formValue.PICK_CREATE_TYPE == 1;
      let columns = isPickForDate ? this.pickTableHeaders[0] : this.pickTableHeaders[1];
      this.pickingTableConfig.columns = [...this.pickingTableConfig.columns.slice(0, 3), ...columns];
    },
    // 重置修改的信息
    initModify() {
      this.modify = {
        master: {},
        picking: {},
        warehouseWarrant: {}
      };
    },
    fillSelectOptions(formConfig, data, fieldName) {
      const obj = this.queryForm(formConfig, fieldName);
      if (!obj) return;
      let options = data.hasOwnProperty('combobox') 
        ? data.combobox.map(i => ({ value: i.limitval, label: i.limitdesc }))
        : data;
      const val = options.length ? options[0].value : '';
      obj.options = options;
      formConfig.formValue[fieldName] = data.defval || data.valuedata || val;
    },
    queryForm(formConfig, field) {
      return formConfig.formData.find((item) => item.colname == field);
    },
    // 初始化表单弹窗
    async initForm(detail, isEdit) {
      console.log(detail);
      this.initModify();
      this.isWatchChange = false;
      const isStockIn = this.curDialog == 'warehouseWarrant';
      this.dialogLoading = true;
      const subTable = isStockIn ? 'ST_C_VIPCOM_PROJECT_STOCK_IN_ITEM' : 'ST_C_VIPCOM_PROJECT_PICK_ITEM';
      const data = await $omsUtils.getObject(subTable, isEdit ? this.ID : -1);

      /** 获取入库单到货时间下拉选项 */
      data.addcolums[0].childs.forEach(item => {
        const SELECT_FIELED = ['EXP_ARRIVETIME', 'RESERVE_TIME01'];
        if (SELECT_FIELED.includes(item.colname)) {
          const index = SELECT_FIELED.findIndex(i => i == item.colname);
          this.arrivalTimeOptions[index] = item.combobox.map(i => ({ value: i.limitval, label: i.limitdesc }));
        }
        if (item.colname == 'AUTO_PICK_TIME_INTERVAL') {
          this.fillSelectOptions(this.dialogConfig[0].formConfig, item, 'AUTO_PICK_TIME_INTERVAL');
        }
      });
      let childs = data.addcolums[0].childs.filter(i => i.colname != 'IS_AIR_EMBARGO')
      this.dialogConfig.forEach((item, index) => {
        item.formConfig = $omsUtils.initFormConfig(childs, item.formConfig);
        console.log(item.formConfig)
        /** 由于方法返回的外键字段值是对象，形如：{ pid: '', valuedata: ''} */
        if (index == 1) { 
          const obj = item.formConfig.formValue.CP_C_PHY_WAREHOUSE_ID;
          item.formConfig.formValue.CP_C_PHY_WAREHOUSE_ID = obj ? obj.pid : '';
          item.formConfig.formValue.IS_AIR_EMBARGO = item.formConfig.formValue.IS_AIR_EMBARGO != '0';
        }
      });

      /** 填充入库单承运商\到货时间默认值 */
      if (this.curDialog == 'warehouseWarrant') {
        this.fillSelectOptions(this.dialogConfig[1].formConfig, this.carrierOptions, 'CARRIER_CODE');
        this.togglePlatform();
      }

      if (isEdit) {
        const copyDetail = detail;
        if (this.dialogConfig.length > 1) {
          this.dialogConfig[1].formConfig.formValue.CARRIER_CODE = copyDetail.CARRIER_CODE;
          this.togglePlatform();
        }
        this.dialogConfig.forEach(item => {
          Object.keys(item.formConfig.formValue).forEach(i => {
            let dbVal = i == 'IS_AIR_EMBARGO' ? Boolean(Number(copyDetail[i])) : copyDetail[i];
            item.formConfig.formValue[i] = dbVal;
          });
          
          item.formConfig.formData.forEach((i, index) => {
            if (i.colname === 'CP_C_ORIG_ID') {
              item.formConfig.formData[index].itemdata.pid = copyDetail.CP_C_ORIG_ID;
              item.formConfig.formData[index].itemdata.valuedata = copyDetail.CP_C_ORIG_ENAME;
            } else if (i.colname === 'CP_C_PHY_WAREHOUSE_ID') {
              item.formConfig.formData[index].itemdata.pid = copyDetail.CP_C_PHY_WAREHOUSE_ID;
              item.formConfig.formData[index].itemdata.valuedata = copyDetail.CP_C_PHY_WAREHOUSE_ENAME;
            }
          });
        });
      }
      this.dialogLoading = false;
      this.isWatchChange = true;
    },
    
    // 承运商下拉项
    carrierDropList() {
      this.service.strategyPlatform.carrierDropList().then(({ data: { code, data } }) => {
        if (code == 0) {
          this.carrierOptions = data;
          this.fillSelectOptions(this.warehouseWarrant[1].formConfig, this.carrierOptions, 'CARRIER_CODE');
        }
      });
    },
    // 查询
    async querySchedule() {
      const data = await $omsUtils.getObject('ST_C_VIPCOM_PROJECT', this.ID);
      this.isWatchChange = false;
      this.formConfig = $omsUtils.initFormConfig(data.addcolums[0].childs, this.formConfig);
      this.formConfig.formValue.CP_C_SHOP_ID = data.addcolums[0].childs[0].refobjid;
      this.formConfig.formValue.IS_OUTWAREHOUSE_ALONE = false;

      if (this.ID != -1) {
        this.loading = true;
        this.service.strategyPlatform.querySchedule({ ID: this.ID })
        .then(({ data: { code, data, message } }) => {
          this.loading = false;
          if (code == 0) {
            const {
              PICK_CREATE_TYPE,
              VIPCOM_PROJECT_LIST,
              VIPCOM_PROJECT_PICK_LIST,
              VIPCOM_PROJECT_STORE_IN_LIST
            } = data || {};
            VIPCOM_PROJECT_LIST && (this.isMasterRequired = true);
            this.pickingTableConfig.data = VIPCOM_PROJECT_PICK_LIST || [];
            this.warehouseWarrantConfig.data = VIPCOM_PROJECT_STORE_IN_LIST || [];
            this.pickingTableConfig.businessFormConfig.formValue.PICK_CREATE_TYPE = PICK_CREATE_TYPE;
            this.formConfig.formValue.IS_OUTWAREHOUSE_ALONE = VIPCOM_PROJECT_LIST.IS_OUTWAREHOUSE_ALONE != '0';
            this.initPickTable();
          } else {
            this.$message.error(message);
          }
        }).catch(() => this.loading = false);
      }
      
      this.isWatchChange = true;
    },
    // 主表保存
    save() {
      const self = this;
      if (!this.isModify) return;
      /* =========== 保存校验 start =========== */
      const valueArr = ['NAME', 'BEGIN_TIME', 'END_TIME', 'RANK'];
      const drpArr = ['CP_C_SHOP_ID'];
      const mes = $omsUtils.validatorNotEmpty(self.formConfig, valueArr, drpArr);
      if (mes) {
        self.$message.error(mes);
        return false;
      }

      /** 判断如果主表已保存并且有修改数据，入参就是修改的信息，否则传所有字段信息 */
      const isEdit = this.isMasterRequired && this.isModify;
      let params = isEdit ? this.modify.master : this.formConfig.formValue;
      Object.keys(params).forEach(key => {
        if (['BEGIN_TIME', 'END_TIME'].includes(key)) {
          const val = this.formConfig.formValue[key];
          params[key] = val ? this.formatDate(val) : val;
        }
      });
      this.service.strategyPlatform.wphScheduleSave({ ID: this.ID, ...params })
      .then(({ data: { code, data, message } }) => {
        if (code == 0) {
          if (this.ID > 0) {
            this.onOk()
            return
          }
          this.isMasterRequired = true;
          this.initModify();
          this.isModify = false
          data && (this.ID = data);
          this.querySchedule();
          this.$message.success(message);
          return;
        }
        this.$message.error(message);
      });
    },
    /**
     * 拣货单/入库单删除
     * @param {*} ID 明细ID, -1则清空所有数据
     * @param {*} type pickingTableConfig、warehouseWarrantConfig
     */
    subTableDelete(ID, type) {
      this.loading = true;
      let payload = { ID, ST_C_VIPCOM_PROJECT_ID: this.ID };
      const api = type == 'pickingTableConfig' ? 'pickDelete' : 'warehouseInDelete';
      this.service.strategyPlatform[api](payload)
      .then(({ data: { code, message } }) => {
        this.loading = false;
        this[type].data = ID != -1 ? this[type].data.filter(i => i.ID != ID) : [];
        this.initModify();
        code == 0 ? this.$message.info(message) : this.$message.error(message);
      }).catch(() => this.loading = false);
    }
  },
};

import scheduleFormDialog from '@/views/modal/strategyPlatform/scheduleFormDialog';
import dateUtil from '@/assets/js/__utils__/date';
import omsUtils from '@/assets/js/public/publicMethods';

export default {
  components: {
    scheduleFormDialog,
  },
  data() {
    return {
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
      dialog: {
        pickingForDate: false, // 拣货单-按时间点创建
        pickingForStatus: false, // 拣货单-按未拣货数创建
        warehouseWarrant: false // 入库单
      },
      curDialog: '', // 当前弹窗
      btnConfig: {
        typeAll: 'default',
        buttons: [{
          webname: 'lookup_save', // 保存
          text: '保存',
          type: 'posdefault',
          size: '', // 按钮大小
          disabled: false, // 按钮禁用控制
          btnclick: () => {
            const self = this;
            self.save();
          },
        },
        {
          webname: 'lookup_return', // 返回
          text: window.vmI18n.t('btn.back'),
          btnclick: () => {
            this.back();
          },
        }
        ]
      }, // 按钮
      formConfig: {
        formData: [
          {
            version: '1.3',
            colname: 'CP_C_SHOP_ID',
            style: 'popInput', // 输入框弹框单多选
            width: '6',
            itemdata: {
              col: 1,
              colid: 171655, // 当前字段的ID
              colname: 'CP_C_SHOP_ID', // 当前字段的名称
              datelimit: 'all',
              display: 'text', // 显示什么类型，例如xml表示弹窗多选加导入功能，mrp表示下拉多选
              fkdisplay: 'drp', // 外键关联类型
              fkdesc: '店铺',
              inputname: 'CP_C_SHOP_ID:ECODE', // 这个是做中文类型的模糊查询字段，例如ENAME
              isfk: true, // 是否有fk键
              isnotnull: true, // 是否必填
              isuppercase: false, // 是否转大写
              length: 65535, // 最大长度是多少
              name: '店铺', // 赔付类型
              readonly: false, // 是否可编辑，对应input   readonly属性
              reftable: 'CP_C_SHOP', // 对应的表
              reftableid: 169130, // 对应的表ID
              row: 1,
              statsize: -1,
              type: 'STRING', // 这个是后台用的
              valuedata: '', // 这个是选择的值
              pid: '', // 啥 ？？？
            },
            oneObj: e => {
              console.log(e);
              this.formConfig.formValue.CP_C_SHOP_ID = e.pid;
              this.masterModifyData('CP_C_SHOP_ID', 'master');
            }
          },
          {
            style: 'input',
            label: '日程规划名称',
            colname: 'ENAME',
            value: 'ENAME',
            width: '6',
            disabled: false,
            inputChange: () => {
              this.masterModifyData('ENAME', 'master');
            }
          },
          {
            style: 'date', // 输入框类型
            label: '规划开始时间', // 输入框前文字
            colname: 'BEGIN_TIME',
            type: 'datetime',
            value: 'BEGIN_TIME', // 输入框的值
            width: '6', // 所占的宽度 (宽度分为24份,数值代表所占份数的宽度)
            format: 'yyyy-MM-dd HH:mm:ss',
            disabled: false,
            options: {
              disabledDate(date) {
                return date && date.valueOf() < Date.now() - 86400000;
              }
            },
            onChange: () => {
              this.masterModifyData('BEGIN_TIME', 'master');
            }
          },
          {
            style: 'date', // 输入框类型
            label: '规划结束时间', // 输入框前文字
            colname: 'END_TIME',
            type: 'datetime',
            value: 'END_TIME', // 输入框的值
            width: '6', // 所占的宽度 (宽度分为24份,数值代表所占份数的宽度)
            format: 'yyyy-MM-dd HH:mm:ss',
            disabled: false,
            options: {
              disabledDate(date) {
                return date && date.valueOf() < Date.now() - 86400000;
              }
            },
            onChange: () => {
              this.masterModifyData('END_TIME', 'master');
            }
          },
          {
            style: 'select',
            label: '优先级',
            colname: 'RANK',
            value: 'RANK',
            width: '6',
            // regx: /^(-|\\+)?[1-9]{0,1}$/,
            disabled: false,
            options: [
              { value: '1', label: '大促' },
              { value: '2', label: '活动' },
              { value: '3', label: '日常' }
            ],
            selectChange: () => {
              this.masterModifyData('RANK', 'master');
            }
          },
          {
            style: 'checkbox',
            onlyBox: true,
            label: '补货独立入库',
            colname: 'IS_OUTWAREHOUSE_ALONE',
            value: 'IS_OUTWAREHOUSE_ALONE',
            width: '6',
            dataAcessKey: 'IS_OUTWAREHOUSE_ALONE',
            disabled: false,
            checkboxChange: (e) => {
              this.masterModifyData('IS_OUTWAREHOUSE_ALONE', 'master');
            }
          },
          {
            style: 'input',
            label: '自动补货数量限制',
            colname: 'AUTO_ADD_GOODS_LIMIT',
            value: 'AUTO_ADD_GOODS_LIMIT',
            width: '6',
            maxlength: 11,
            disabled: false,
            regx: /^(-|\\+)?[0-9]*$/,
            inputChange: () => {
              this.masterModifyData('AUTO_ADD_GOODS_LIMIT', 'master');
            }
          }
        ],
        formValue: {
          ENAME: '', // 日程规划名称
          BEGIN_TIME: '', // 规划开始时间
          END_TIME: '', // 规划结束时间
          RANK: '', // 优先级
          IS_OUTWAREHOUSE_ALONE: false, // 补货独立入库
          CP_C_SHOP_ID: '', // 店铺
          AUTO_ADD_GOODS_LIMIT: 0
        },
        ruleValidate: {
          ENAME: [{ required: true, message: ' ' }],
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
          label: '拣货单创建时间', // 输入框前文字
          colname: 'CREATE_TIME',
          type: 'time',
          placement: 'bottom',
          value: 'CREATE_TIME', // 输入框的值
          width: '24', // 所占的宽度 (宽度分为24份,数值代表所占份数的宽度)
          format: 'HH:mm:ss',
          disabled: false,
          onChange: () => {
            this.masterModifyData('CREATE_TIME', 'picking', 0);
          }
        },
        {
          style: 'popInputPlus', // 输入框弹框单多选
          colname: 'CP_C_ORIG_ID',
          width: '24',
          itemdata: {
            colid: 1700824448, // 当前字段的ID
            colname: 'CP_C_ORIG_ID', // 当前字段的名称
            name: '唯品会仓库', // 赔付类型
            valuedata: "",
            pid: "",
            fkdisplay: "mrp",
            isfk: true,
            isnotnull: true,
            readonly: false,
            isBackRowItem: true,
            AutoData: [],
            columnsKey: ['WAREHOUSE_NAME'],
            hidecolumns: ['id', 'value'],
          },
          oneObj: e => {
            console.log(e);
            this.fkrpSelect(this.dialogConfig[0].formConfig, 'CP_C_ORIG', 'picking', e, 0)
          },
        },
        {
          style: 'select',
          label: '拣货单类型',
          value: 'PICKORDER_TYPE',
          width: '24',
          multiple: true,
          disabled: false,
          colname: 'PICKORDER_TYPE',
          selectChange: () => {
            this.masterModifyData('PICKORDER_TYPE', 'picking', 0);
          },
          options: [ // radio选项
            {
              value: '1',
              label: '普通',
            },
            {
              value: '2',
              label: '补货单',
            },
            // {
            //   value: '3',
            //   label: '预调拨',
            // }
          ]
        }
        ],
        formValue: {
          CREATE_TIME: '', // 创建时间
          PICKORDER_TYPE: ['1'], // 拣货单类型
          CP_C_ORIG_ID: '' // 唯品会仓库ID
        },
        ruleValidate: {
          CREATE_TIME: [{
            required: true,
            message: ' '
          }],
          PICKORDER_TYPE: [{
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
            label: '未拣货数维度',
            value: 'UN_PICK_NUM_DIMENSION',
            width: '24',
            disabled: false,
            colname: 'UN_PICK_NUM_DIMENSION',
            selectChange: () => {
              this.masterModifyData('UN_PICK_NUM_DIMENSION', 'picking', 0);
            },
            options: [ // radio选项
              {
                value: '1',
                label: 'PO维度',
              },
              {
                value: '2',
                label: '单PO下唯品会仓库维度',
              }
            ]
          },
          {
            style: 'input',
            label: '创建峰值',
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
            label: '自动拣货间隔时间',
            value: 'AUTO_PICK_INTERVAL_TIME',
            width: '24',
            disabled: false,
            colname: 'AUTO_PICK_INTERVAL_TIME',
            selectChange: () => {
              this.masterModifyData('AUTO_PICK_INTERVAL_TIME', 'picking', 0);
            },
            options: [] // radio选项
          },
          {
            style: 'popInputPlus', // 输入框弹框单多选
            colname: 'CP_C_ORIG_ID',
            width: '24',
            itemdata: {
              colid: 1700824448, // 当前字段的ID
              colname: 'CP_C_ORIG_ID', // 当前字段的名称
              name: '唯品会仓库', // 赔付类型
              valuedata: "",
              pid: "",
              fkdisplay: "mrp",
              isfk: true,
              isnotnull: true,
              readonly: false,
              isBackRowItem: true,
              AutoData: [],
              columnsKey: ['WAREHOUSE_NAME'],
              hidecolumns: ['id', 'value'],
            },
            oneObj: e => {
              console.log(e);
              this.fkrpSelect(this.dialogConfig[0].formConfig, 'CP_C_ORIG', 'picking', e, 0)
            },
          },
          {
            style: 'select',
            label: '拣货单类型',
            value: 'PICKORDER_TYPE',
            width: '24',
            multiple: true,
            disabled: false,
            colname: 'PICKORDER_TYPE',
            selectChange: () => {
              this.masterModifyData('PICKORDER_TYPE', 'picking', 0);
            },
            options: [ // radio选项
              {
                value: '1',
                label: '普通',
              },
              {
                value: '2',
                label: '补货单',
              },
              // {
              //   value: '3',
              //   label: '预调拨',
              // }
            ]
          }
        ],
        formValue: {
          UN_PICK_NUM_DIMENSION: '1', // 未拣货数维度
          PEAK_VALUE: '', // 创建峰值
          AUTO_PICK_INTERVAL_TIME: '2h', // 自动拣货间隔时间
          PICKORDER_TYPE: ['1'], // 拣货单类型
          CP_C_ORIG_ID: '' // 唯品会仓库ID
        },
        ruleValidate: {
          UN_PICK_NUM_DIMENSION: [{
            required: true,
            message: ' '
          }],
          PEAK_VALUE: [{
            required: true,
            message: ' '
          }],
          AUTO_PICK_INTERVAL_TIME: [{
            required: true,
            message: ' '
          }],
          PICKORDER_TYPE: [{
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
          title: '创建条件',
          formConfig: {
            formData: [{
              style: 'input',
              label: '创建峰值',
              colname: 'PEAK_VALUE',
              value: 'PEAK_VALUE',
              width: '12',
              regx: /^[0-9]*$/,
              disabled: false,
              tips: {
                content: '当“店铺+唯品会仓库+发货实体仓”相同的配货单中商品数量大于等于设置的峰值时，自动创建入库单'
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
          title: '创建内容',
          formConfig: {
            formData: [
              {
                style: "popInputPlus",
                width: "12",
                colname: "CP_C_PHY_WAREHOUSE_ID",
                itemdata: {
                  colid: 1700824455,
                  colname: "CP_C_PHY_WAREHOUSE_ID",
                  name: "发货实体仓",
                  valuedata: "",
                  pid: "",
                  fkdisplay: "mrp",
                  isfk: true,
                  isnotnull: true,
                  readonly: false,
                  isBackRowItem: true,
                  AutoData: [],
                  columnsKey: ['ENAME'],
                  hidecolumns: ['id', 'value'],
                },
                oneObj: (e) => {
                  console.log(e);
                  this.fkrpSelect(this.dialogConfig[1].formConfig, 'CP_C_PHY_WAREHOUSE', 'warehouseWarrant', e, 1)
                },
              },
              {
                style: 'select',
                label: '承运商',
                value: 'CARRIER_CODE',
                width: '12',
                disabled: false,
                colname: 'CARRIER_CODE',
                selectChange: () => {
                  this.masterModifyData('CARRIER_CODE', 'warehouseWarrant', 1);
                  this.togglePlatform();
                }, // 选中事件，默认返回选中的值,默认返回当前值value
                options: [ // radio选项
                  {
                    value: '1',
                    label: '唯品会专配',
                  },
                  {
                    value: '2',
                    label: '非唯品会专配',
                  }
                ]
              },
              {
                style: 'checkbox', // 输入框类型
                label: '航空禁运', // 输入框前文字
                colname: 'IS_AIR_EMBARGO',
                value: 'IS_AIR_EMBARGO', // 输入框的值
                width: '24', // 所占的宽度 (宽度分为24份,数值代表所占份数的宽度)
                disabled: false,
                checkboxChange: () => {
                  this.masterModifyData('IS_AIR_EMBARGO', 'warehouseWarrant', 1);
                }
              },
              {
                style: '',
                label: '配送方式',
                value: 'DELIVERY_WAY',
                width: '24',
                disabled: false,
                colname: 'DELIVERY_WAY',
                selectChange: () => {
                  this.masterModifyData('DELIVERY_WAY', 'warehouseWarrant', 1);
                  this.toggleMethod();
                },
                options: [ // radio选项
                  {
                    value: '2',
                    label: '空运',
                  },
                  {
                    value: '1',
                    label: '汽运',
                  }
                ]
              },
              {
                style: 'select',
                label: '发货间隔',
                value: 'SEND_INTERVAL',
                width: '12',
                disabled: false,
                colname: 'SEND_INTERVAL',
                selectChange: () => {
                  this.masterModifyData('SEND_INTERVAL', 'warehouseWarrant', 1);
                },
                options: [ // radio选项
                  {
                    value: '1',
                    label: '当日',
                  },
                  {
                    value: '2',
                    label: '次日',
                  }
                ]
              },
              {
                style: 'time', // 输入框类型
                label: '发货时间', // 输入框前文字
                colname: 'SENDTIME',
                type: 'time',
                value: 'SENDTIME', // 输入框的值
                width: '12', // 所占的宽度 (宽度分为24份,数值代表所占份数的宽度)
                format: 'HH:mm:ss',
                disabled: false,
                onChange: () => {
                  this.masterModifyData('SENDTIME', 'warehouseWarrant', 1);
                }
              },
              {
                style: 'select',
                label: '到货间隔',
                value: 'ARRIVAL_INTERVAL',
                width: '12',
                disabled: false,
                colname: 'ARRIVAL_INTERVAL',
                selectChange: () => {
                  this.masterModifyData('ARRIVAL_INTERVAL', 'warehouseWarrant', 1);
                },
                options: [ // radio选项
                  {
                    value: '1',
                    label: '当日',
                  },
                  {
                    value: '2',
                    label: '次日',
                  }
                ]
              },
              {
                style: 'select', // 输入框类型
                label: '到货时间', // 输入框前文字
                colname: 'ARRIVALTIME',
                value: 'ARRIVALTIME', // 输入框的值
                width: '12', // 所占的宽度 (宽度分为24份,数值代表所占份数的宽度)
                disabled: false,
                selectChange: () => {
                  this.masterModifyData('ARRIVALTIME', 'warehouseWarrant', 1);
                },
                options: []
              }
            ],
            formValue: {
              CARRIER_CODE: '1', // 承运商
              SEND_INTERVAL: '1', // 发货间隔
              SENDTIME: '', // 发货时间
              ARRIVAL_INTERVAL: '1', // 到货间隔
              ARRIVALTIME: '', // 到货时间
              IS_AIR_EMBARGO: false, // 航空禁运
              DELIVERY_WAY: '2', // 配送方式
            },
            ruleValidate: {
              CARRIER_CODE: [{
                required: true,
                message: ' '
              }],
              SEND_INTERVAL: [{
                required: true,
                message: ' '
              }],
              SENDTIME: [{
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
              ARRIVALTIME: [{
                required: false,
                message: ' '
              }],
              DELIVERY_WAY: [{
                required: false,
                message: ' '
              }]
            }
          },
        },
        {
          title: '入库单结单',
          formConfig: {
            formData: [{
              style: 'time', // 输入框类型
              label: '入库单结单时间', // 输入框前文字
              colname: 'STATEMENT_TIME',
              type: 'time',
              value: 'STATEMENT_TIME', // 输入框的值
              width: '12', // 所占的宽度 (宽度分为24份,数值代表所占份数的宽度)
              format: 'HH:mm:ss',
              disabled: false,
              tips: {
                content: '每天在该时间点自动对创建的入库单结单'
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
          label: '航空禁运', // 输入框前文字
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
          label: '配送方式',
          value: 'DELIVERY_WAY',
          width: '24',
          disabled: false,
          colname: 'DELIVERY_WAY',
          selectChange: () => {
            this.masterModifyData('DELIVERY_WAY', 'warehouseWarrant', 1);
            this.toggleMethod();
          },
          options: [ // radio选项
            {
              value: '2',
              label: '空运',
            },
            {
              value: '1',
              label: '汽运',
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
        pageSizeOpts: [10, 20, 30], // 每页条数切换的配置
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
            title: '序号'
          },
          {
            title: '操作',
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
                      let isForDate = this.pickingTableConfig.businessFormConfig.formValue.PICKORDER_CREATE_TYPE == 1;
                      let dialog = isForDate ? 'pickingForDate' : 'pickingForStatus';
                      this.handleDialog(dialog, params.row, true);
                    }
                  }
                },
                '编辑'
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
                        title: window.vmI18n.t('modalTitle.tips'), // 提示
                        content: '确定删除？',
                        mask: true,
                        showCancel: true,
                        okText: window.vmI18n.t('common.determine'), // 确定
                        cancelText: window.vmI18n.t('common.cancel'), // 取消
                        onOk: () => {
                          this.subTableDelete(params.row.ID, 'pickingTableConfig');
                        },
                      });
                    }
                  }
                },
                '删除'
              )
            ])
          }
        ],
        businessFormConfig: {
          formData: [
            {
              style: 'radio',
              label: '拣货单创建方式',
              value: 'PICKORDER_CREATE_TYPE',
              colname: 'PICKORDER_CREATE_TYPE',
              width: '12',
              disabled: false,
              setRequired: '', // 必选标识,值不为required时无标识
              radioChange: () => {
                if (!this.pickingTableConfig.data.length) return;
                this.$Modal.info({
                  className: 'ark-dialog',
                  title: window.vmI18n.t('modalTitle.tips'), // 提示
                  content: '当前切换操作会清空已录入的按时间点创建/按未拣货数创建内容，确定继续吗？',
                  mask: true,
                  showCancel: true,
                  okText: window.vmI18n.t('common.determine'), // 确定
                  cancelText: window.vmI18n.t('common.cancel'), // 取消
                  onOk: () => {
                    this.initPickTable();
                    this.subTableDelete(-1, 'pickingTableConfig');
                  },
                  onCancel: () => {
                    const { PICKORDER_CREATE_TYPE } = this.pickingTableConfig.businessFormConfig.formValue;
                    this.pickingTableConfig.businessFormConfig.formValue.PICKORDER_CREATE_TYPE = PICKORDER_CREATE_TYPE == 1 ? 2 : 1;
                  }
                });
              }, // 切换时的方法
              options: [ // radio选项
                {
                  value: '1',
                  label: '按时间点创建',
                },
                {
                  value: '2',
                  label: '按未拣货数创建',
                }
              ]
            }
          ],
          formValue: {
            PICKORDER_CREATE_TYPE: '1'
          },
          ruleValidate: {
            PICKORDER_CREATE_TYPE: [{
              required: true,
              message: ' '
            }]
          }
        },
        businessButtonConfig: {
          typeAll: 'default',
          buttons: [
            {
              text: '新增',
              size: '', // 按钮大小
              disabled: false, // 按钮禁用控制
              btnclick: () => {
                let type = this.pickingTableConfig.businessFormConfig.formValue.PICKORDER_CREATE_TYPE
                let dialog = type == 1 ? 'pickingForDate' : 'pickingForStatus';
                this.handleDialog(dialog, '', false);
              }
            }
          ]
        }
      },
      pickTableHeaders: [
        [{
          title: '拣货单创建时间',
          key: 'CREATE_TIME',
        },
        {
          title: '唯品会仓库',
          key: 'CP_C_ORIG_ENAME',
        },
        {
          title: '拣货单类型',
          key: 'PICKORDER_TYPE',
          render: (h, params) => {
            let types = {
              1: '普通',
              2: '补货单',
              // 3: '预调拨',
            }
            let text = params.row.PICKORDER_TYPE.split(',').map(i => types[i])
            return h('span', text.join(','))
          }
        }],
        [{
          title: '未拣货数维度',
          key: 'UN_PICK_NUM_DIMENSION',
          render: (h, params) => {
            let types = {
              1: 'PO维度',
              2: '单PO下唯品会仓库维度'
            }
            return h('span', types[params.row.UN_PICK_NUM_DIMENSION])
          }
        },
        {
          title: '创建峰值',
          key: 'PEAK_VALUE',
        },
        {
          title: '自动拣货间隔时间',
          key: 'AUTO_PICK_INTERVAL_TIME',
          render: (h, params) => {
            return h('span', `${params.row.AUTO_PICK_INTERVAL_TIME}`)
          }
        },
        {
          title: '唯品会仓库',
          key: 'CP_C_ORIG_ENAME',
        },
        {
          title: '拣货单类型',
          key: 'PICKORDER_TYPE',
          render: (h, params) => {
            let types = {
              1: '普通',
              2: '补货单',
              // 3: '预调拨',
            }
            let text = params.row.PICKORDER_TYPE.split(',').map(i => types[i])
            return h('span', text.join(','))
          }
        }]
      ],
      warehouseWarrantConfig: {
        pageShow: false, // 控制分页是否显示
        searchInputShow: false, // 控制搜索框是否显示
        width: '', // 表格宽度
        border: true, // 是否显示纵向边框
        total: 0, // 设置总条数
        pageSizeOpts: [10, 20, 30], // 每页条数切换的配置
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
            title: '序号'
          },
          {
            title: '操作',
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
                '编辑'
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
                        title: window.vmI18n.t('modalTitle.tips'), // 提示
                        content: '确定删除？',
                        mask: true,
                        showCancel: true,
                        okText: window.vmI18n.t('common.determine'), // 确定
                        cancelText: window.vmI18n.t('common.cancel'), // 取消
                        onOk: () => {
                          this.subTableDelete(params.row.ID, 'warehouseWarrantConfig');
                        },
                      });
                    }
                  }
                },
                '删除'
              )
            ])
          },
          {
            title: '创建峰值',
            key: 'PEAK_VALUE',
          },
          {
            title: '发货实体仓',
            key: 'CP_C_PHY_WAREHOUSE_ENAME',
          },
          {
            title: '承运商',
            key: 'CARRIER_CODE',
            render: (h, params) => {
              let types = {
                '1': '唯品会专配',
                '2': '非唯品会专配'
              }
              return h('span', types[params.row.CARRIER_CODE])
            }
          },
          {
            title: '发货间隔',
            key: 'SEND_INTERVAL',
            render: (h, params) => {
              let types = {
                '1': '当日',
                '2': '次日'
              }
              return h('span', types[params.row.SEND_INTERVAL])
            }
          },
          {
            title: '发货时间',
            key: 'SENDTIME',
          },
          {
            title: '到货间隔',
            key: 'ARRIVAL_INTERVAL',
            render: (h, params) => {
              let types = {
                '1': '当日',
                '2': '次日'
              }
              return h('span', types[params.row.ARRIVAL_INTERVAL])
            }
          },
          {
            title: '到货时间',
            key: 'ARRIVALTIME',
          },
          {
            title: '入库单结单时间',
            key: 'STATEMENT_TIME',
          },
          {
            title: '配送方式',
            key: 'DELIVERY_WAY',
            render: (h, params) => {
              let types = {
                '1': '汽运',
                '2': '空运'
              }
              return h('span', types[params.row.DELIVERY_WAY])
            }
          },
          {
            title: '航空禁运',
            key: 'IS_AIR_EMBARGO',
            render: (h, params) => h('span', params.row.IS_AIR_EMBARGO == '0' ? '否' : '是')
          }
        ],
        businessButtonConfig: {
          typeAll: 'default',
          buttons: [
            {
              text: '新增',
              size: '', // 按钮大小
              disabled: false, // 按钮禁用控制
              btnclick: () => {
                this.handleDialog('warehouseWarrant', '', false);
              }
            }
          ]
        }
      },
      logConfig: {
        // 是否修改搜索框为select
        isSearchText: true,
        isShowDeleteDetailBtn: false, // 控制是否显示删除明细
        isShowAddDetailBtn: false, // 控制是否显示新增明细
        // isSearchText为false的情况下使用 搜索框list
        searchSelectList: [],
        pageShow: true, // 控制分页是否显示
        btnsShow: true, // 控制操作按钮是否显示*
        searchInputShow: false, // 控制搜索框是否显示
        width: '', // 表格宽度
        border: true, // 是否显示纵向边框
        total: 0, // 设置总条数
        pageSizeOpts: [5, 15, 30, 45, 60], // 每页条数切换的配置
        pageSize: 5, // 每页条数
        isShowSelection: true, // 是否展示select框
        indexColumn: true, // 是否展示序号列
        columns: [
          {
            title: '用户名',
            key: 'CP_C_PLATFORM_ID',
          },
          {
            title: '日志类型',
            key: 'CP_C_LOGISTICS_ECODE',
          },
          {
            title: '修改前',
            key: 'CP_C_LOGISTICS_ENAME',
          },
          {
            title: '修改后',
            key: 'CP_C_LOGISTICS_ENAME',
          },
          {
            title: '修改人名称',
            key: 'CP_C_LOGISTICS_ENAME',
          }
        ],
        data: []
      },
      // tab切换配置
      labelList: [
        {
          label: '操作日志',
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
      carrierOptions: [
        {
          value: '1',
          label: '唯品会专配',
          checked: true
        },
        {
          value: '2',
          label: '非唯品会专配',
          checked: false
        }
      ], // 承运商
    };
  },
  async mounted() {
    console.log(this.$route.params);
    // await this.carrierDropList(); // 承运商下拉项
    this.querySchedule();
    // this.subTableConfig = {
    //   centerName: 'strategyPlatform',
    //   tablename: this.labelDefaultValue,
    //   objid: this.ID,
    //   pageShow: true
    // }
  },
  computed: {
    dialogInfo() {
      return this.curDialog == 'warehouseWarrant'
        ? { title: '入库单', width: '800' }
        : { title: '拣货单', width: '400' };
    },
    // 自动拣货间隔时间
    autoPickIntervalTimeOptions() {
      let timeArr = ['5min', '10min', '15min', '20min', '25min', '0.5h', '1h', '2h', '3h', '4h', '5h', '6h'];
      let options = timeArr.map(i => ({ label: i, value: i }));
      return options
    },
    // 到货时间 空运-汽运的不同选项值
    arrivalTimeOptions() {
      let airTrans = ['09:00:00', '16:00:00', '18:00:00', '23:59:00'];
      let busTrans = ['02:00:00', '09:00:00', '10:00:00', '16:00:00', '18:00:00', '19:00:00', '20:00:00', '22:00:00', '23:59:00'];
      let airTransOptions = airTrans.map(i => ({ label: i, value: i }));
      let busTransOptions = busTrans.map(i => ({ label: i, value: i }));
      return [airTransOptions, busTransOptions]
    }
  },
  methods: {
    // 时间戳格式化
    formatDate(time, format) {
      const date = new Date(time);
      return dateUtil.getFormatDate(date, format || 'yyyy-MM-dd HH:mm:ss');
    },
    // 返回
    back() {
      if (this.isModify) {
        this.$Modal.info({
          title: window.vmI18n.t('modalTitle.tips'), // 提示
          content: '当前修改未保存，确定返回？',
          mask: true,
          showCancel: true,
          okText: window.vmI18n.t('common.determine'), // 确定
          cancelText: window.vmI18n.t('common.cancel'), // 取消
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
        label: '档期日程规划',
        tableName: 'ST_C_VIPCOM_PROJECT',
        back: true,
      });
    },
    // 弹窗显示隐藏
    handleDialog(key, detail, isEdit) {
      this.dialog[key] = !this.dialog[key];
      this.dialogConfig = key == 'warehouseWarrant' ? this[key] : [{ formConfig: this[key] }];
      this.curDialog = key;
      this.initDetail = detail || {};
      this.initForm(detail, isEdit);
    },
    /**
     * 
     * @param {*} formConfig 表单配置名称
     * @param {*} field 字段名
     * @param {*} dialog dialog 类型
     * @param {*} rows 选中项
     * @param {*} index 所在弹窗表单的索引
     */
    fkrpSelect(formConfig, field, dialog, rows, index) {
      let fieldId = `${field}_ID`
      let fieldEcode = `${field}_ECODE`
      let fieldEname = `${field}_ENAME`
      let ids = []
      let ecodes = []
      let enames = []

      let rowId = 'ID'
      let rowEname = field == 'CP_C_ORIG' ? 'WAREHOUSE_NAME' : 'ENAME'
      let rowEcode = field == 'CP_C_ORIG' ? 'WAREHOUSE_CODE' : 'ECODE'
      if (rows.length > 0) {
        rows.forEach(i => {
          ids.push(typeof i.rowItem[rowId] == 'object' ? i.rowItem[rowId].val : i.rowItem.id)
          ecodes.push(typeof i.rowItem[rowEcode] == 'object' ? i.rowItem[rowEcode].val : i.rowItem[rowEcode])
          enames.push(typeof i.rowItem[rowEname] == 'object' ? i.rowItem[rowEname].val : i.rowItem[rowEname])
        })
      }
      formConfig.formValue[fieldId] = ids.join(',');
      formConfig.formValue[fieldEcode] = ecodes.join(',');
      formConfig.formValue[fieldEname] = enames.join(',');
      this.masterModifyData(fieldId, dialog, index);
      this.masterModifyData(fieldEcode, dialog, index);
      this.masterModifyData(fieldEname, dialog, index);
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
          newTime = omsUtils.defaultEndTime(newTime, oldTime)
          self.formConfig.formValue[ecode] = newTime
        }
        self.modify[obj][ecode] = newTime
      } else {
        let newValue;
        switch (ecode) {
          case 'PICKORDER_TYPE':
            newValue = value[0] == 'bSelect-all' ? ['1', '2'] : value;
            break;
          case 'IS_OUTWAREHOUSE_ALONE':
            newValue = Number(value);
            break;
          case 'AUTO_ADD_GOODS_LIMIT':
            newValue = value || 0;
            break;
          default:
            newValue = value;
            break;
        }
        self.modify[obj][ecode] = newValue;
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
      console.log(this.queryForm(formConfig2, 'IS_AIR_EMBARGO'));
      this.queryForm(formConfig2, 'IS_AIR_EMBARGO').style = this.isCurSpecial ? 'checkbox' : ''
      this.queryForm(formConfig2, 'DELIVERY_WAY').style = !this.isCurSpecial ? 'select' : ''
      // let fillColName = this.isCurSpecial ? 'IS_AIR_EMBARGO' : 'DELIVERY_WAY'; // 填充字段
      // let fillColNameIndex = this.formConfigData.findIndex(i => i.colname == fillColName); // 填充字段索引
      // formConfig2.formData.splice(2, 1, this.formConfigData[fillColNameIndex]);

      /** 相关字段值处理 */
      if (this.isCurSpecial) {
        this.modify.warehouseWarrant.IS_AIR_EMBARGO = 0;
        delete this.modify.warehouseWarrant.DELIVERY_WAY;
      } else if (this.isEdit) {
        this.modify.warehouseWarrant.DELIVERY_WAY = formConfig2.formValue.DELIVERY_WAY;
        delete this.modify.warehouseWarrant.IS_AIR_EMBARGO;
      } else {
        formConfig2.formValue.DELIVERY_WAY = '2';
        this.modify.warehouseWarrant.DELIVERY_WAY = '2';
        delete this.modify.warehouseWarrant.IS_AIR_EMBARGO;
      }
      this.toggleMethod();

      const HANDLE_FIELDS = ['ARRIVAL_INTERVAL', 'ARRIVALTIME', 'DELIVERY_WAY'];
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
      const isAirTrans = formConfig2.formValue.DELIVERY_WAY == '2';
      const optionsIndex = this.isCurSpecial || !this.isCurSpecial && isAirTrans ? 0 : 1;
      let options = this.arrivalTimeOptions[optionsIndex];
      this.fillSelectOptions(formConfig2, options, 'ARRIVALTIME');
    },
    // 初始化拣货单表格
    initPickTable() {
      let isPickForDate = this.pickingTableConfig.businessFormConfig.formValue.PICKORDER_CREATE_TYPE == 1;
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
      // const subTable = isStockIn ? 'ST_C_VIPCOM_PROJECT_WH_ENTRY_ITEM' : 'ST_C_VIPCOM_PROJECT_PICKORDER_ITEM';
      // const data = await omsUtils.getObject(subTable, isEdit ? this.ID : -1);

      /** 获取入库单到货时间下拉选项 */
      // data.addcolums.forEach(item => {
      //   if (item.child) {
      //     const SELECT_FIELED = ['ARRIVALTIME', 'RESERVE_TIME01'];
      //     if (SELECT_FIELED.includes(item.child.colname)) {
      //       const index = SELECT_FIELED.findIndex(i => i == item.child.colname);
      //       this.arrivalTimeOptions[index] = item.combobox.map(i => ({ value: i.limitval, label: i.limitdesc }));
      //     }
      //     if (item.child.colname == 'AUTO_PICK_INTERVAL_TIME') {
      //       this.fillSelectOptions(this.dialogConfig[0].formConfig, item, 'AUTO_PICK_INTERVAL_TIME');
      //     }
      //   }
      // });


      this.dialogConfig.forEach((item, index) => {
        // item.formConfig = omsUtils.initFormConfig(data.addcolums[0].childs, item.formConfig);
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
        this.queryForm(this.dialogConfig[1].formConfig, 'CP_C_PHY_WAREHOUSE_ID').itemdata.defaultSelectedMrp = []
      } else {
        const { PICKORDER_TYPE = [] } = detail
        this.pickingTableConfig.businessFormConfig.formValue.PICKORDER_CREATE_TYPE == '2'
          && this.fillSelectOptions(this.dialogConfig[0].formConfig, this.autoPickIntervalTimeOptions, 'AUTO_PICK_INTERVAL_TIME');

        detail = { ...detail, PICKORDER_TYPE: Array.isArray(PICKORDER_TYPE) ? PICKORDER_TYPE : PICKORDER_TYPE.split(',') }
        this.queryForm(this.dialogConfig[0].formConfig, 'CP_C_ORIG_ID').itemdata.defaultSelectedMrp = []
      }


      let init = this.curDialog == 'warehouseWarrant' ? {
        CARRIER_CODE: '1', // 承运商
        SEND_INTERVAL: '1', // 发货间隔
        SENDTIME: '', // 发货时间
        ARRIVAL_INTERVAL: '1', // 到货间隔
        ARRIVALTIME: '09:00:00', // 到货时间
        IS_AIR_EMBARGO: false, // 航空禁运
        DELIVERY_WAY: '2', // 配送方式
        PICKORDER_TYPE: ['1'], //
        CREATE_TIME: '', // 创建时间
        CP_C_ORIG_ID: '' // 唯品会仓库ID
      } : {
        UN_PICK_NUM_DIMENSION: '1', // 未拣货数维度
        PEAK_VALUE: '', // 创建峰值
        AUTO_PICK_INTERVAL_TIME: '2h', // 自动拣货间隔时间
        PICKORDER_TYPE: ['1'], // 拣货单类型
        CP_C_ORIG_ID: '' // 唯品会仓库ID
      }
      init = isEdit ? detail : init
      if (this.dialogConfig.length > 1) {
        this.dialogConfig[1].formConfig.formValue.CARRIER_CODE = init.CARRIER_CODE;
        this.togglePlatform();
      }
      this.dialogConfig.forEach(item => {
        Object.keys(item.formConfig.formValue).forEach(i => {
          let dbVal = i == 'IS_AIR_EMBARGO' ? Boolean(Number(init[i])) : init[i];
          item.formConfig.formValue[i] = dbVal;
        });

        item.formConfig.formData.forEach((i, index) => {
          if (i.colname === 'CP_C_ORIG_ID') {
            item.formConfig.formData[index].itemdata.pid = init.CP_C_ORIG_ID || '';
            item.formConfig.formData[index].itemdata.valuedata = init.CP_C_ORIG_ENAME || '';
          } else if (i.colname === 'CP_C_PHY_WAREHOUSE_ID') {
            item.formConfig.formData[index].itemdata.pid = init.CP_C_PHY_WAREHOUSE_ID || '';
            item.formConfig.formData[index].itemdata.valuedata = init.CP_C_PHY_WAREHOUSE_ENAME || '';
          }
        });
      });

      if (this.curDialog == 'warehouseWarrant') {
        this.toggleMethod()
        const { CP_C_PHY_WAREHOUSE_ID, CP_C_PHY_WAREHOUSE_ENAME, CP_C_PHY_WAREHOUSE_ECODE } = init
        this.dialogConfig[1].formConfig.formValue = {
          ...this.dialogConfig[1].formConfig.formValue,
          ARRIVALTIME: init.ARRIVALTIME,
          CP_C_PHY_WAREHOUSE_ID,
          CP_C_PHY_WAREHOUSE_ENAME,
          CP_C_PHY_WAREHOUSE_ECODE
        }

        let defaultSelectedMrp = []
        if (CP_C_PHY_WAREHOUSE_ID) {
          let ids = CP_C_PHY_WAREHOUSE_ID.split(',')
          let names = CP_C_PHY_WAREHOUSE_ENAME.split(',')
          let ecodes = CP_C_PHY_WAREHOUSE_ECODE.split(',')
          if (ids.length) {
            ids.forEach((i, index) => {
              defaultSelectedMrp.push({
                ID: i,
                Label: names[index],
                rowItem: {
                  ID: { val: i },
                  ECODE: { val: ecodes[index] },
                  ENAME: { val: names[index] }
                }
              })
            })
          }
        }
        this.queryForm(this.dialogConfig[1].formConfig, 'CP_C_PHY_WAREHOUSE_ID').itemdata.defaultSelectedMrp = defaultSelectedMrp
      } else {
        const { CP_C_ORIG_ID, CP_C_ORIG_ENAME, CP_C_ORIG_ECODE } = init
        let defaultSelectedMrp = []
        let ids = CP_C_ORIG_ID ? CP_C_ORIG_ID.split(',') : []
        let names = CP_C_ORIG_ENAME ? CP_C_ORIG_ENAME.split(',') : []
        let ecodes = CP_C_ORIG_ECODE ? CP_C_ORIG_ECODE.split(',') : []
        if (ids.length) {
          ids.forEach((i, index) => {
            defaultSelectedMrp.push({
              ID: i,
              Label: names[index],
              rowItem: {
                ID: { val: i },
                WAREHOUSE_CODE: { val: ecodes[index] },
                WAREHOUSE_NAME: { val: names[index] }
              }
            })
          })
        }
        this.queryForm(this.dialogConfig[0].formConfig, 'CP_C_ORIG_ID').itemdata.defaultSelectedMrp = defaultSelectedMrp
      }
      this.dialogLoading = false;
      this.isWatchChange = true;
    },
    // 确认弹窗数据
    getDetail(data) {
      const { ID } = data;
      let params;
      let PICKORDER_CREATE_TYPE;
      switch (this.curDialog) {
        case 'pickingForDate':
        case 'pickingForStatus':
          PICKORDER_CREATE_TYPE = this.curDialog == 'pickingForDate' ? 1 : 2;
          params = ID != -1 ? { ID, ...this.modify.picking } : { ...data, PICKORDER_CREATE_TYPE };
          this.subTableSave(params, 'picking');
          break;
        case 'warehouseWarrant':
          params = data;
          if (params.hasOwnProperty('IS_AIR_EMBARGO')) {
            const { IS_AIR_EMBARGO } = data;
            params.IS_AIR_EMBARGO = IS_AIR_EMBARGO ? Number(IS_AIR_EMBARGO) : 0;
          }
          this.subTableSave(params, 'warehouseWarrant');
          break;
        default:
          break;
      }
    },
    // 承运商下拉项
    carrierDropList() {
      // this.service.strategyPlatform.carrierDropList().then(({ data: { code, data } }) => {
      //   if (code == 0) {
      //     this.carrierOptions = data;
      //     this.fillSelectOptions(this.warehouseWarrant[1].formConfig, this.carrierOptions, 'CARRIER_CODE');
      //   }
      // });
      this.fillSelectOptions(this.warehouseWarrant[1].formConfig, this.carrierOptions, 'CARRIER_CODE');
    },
    // 查询
    async querySchedule() {
      this.isWatchChange = false;
      const data = await omsUtils.getObject('ST_C_VIPCOM_PROJECT', this.ID);
      if (!data) return
      this.formConfig = omsUtils.initFormConfig(data.addcolums[0].childs, this.formConfig);
      this.formConfig.formValue.CP_C_SHOP_ID = data.addcolums[0].childs[0].refobjid;
      this.formConfig.formValue.IS_OUTWAREHOUSE_ALONE = false;
      if (this.ID != -1) {
        this.loading = true;
        let formdata = new FormData()
        formdata.append('param', JSON.stringify({ ID: this.ID }))
        this.service.strategyPlatform.querySchedule(formdata)
          .then(({ data: { code, data, message } }) => {
            this.loading = false;
            if (code == 0) {
              const {
                VIPCOM_PROJECT_LIST,
                VIPCOM_PROJECT_PICK_LIST,
                VIPCOM_PROJECT_STORE_IN_LIST
              } = data || {};
              let projectObj = VIPCOM_PROJECT_LIST ? JSON.parse(VIPCOM_PROJECT_LIST) : null
              let pickList = VIPCOM_PROJECT_PICK_LIST ? JSON.parse(VIPCOM_PROJECT_PICK_LIST) : []
              let storeInList = VIPCOM_PROJECT_STORE_IN_LIST ? JSON.parse(VIPCOM_PROJECT_STORE_IN_LIST) : []
              console.log(projectObj);
              console.log(pickList);
              console.log(storeInList);
              VIPCOM_PROJECT_LIST && (this.isMasterRequired = true);
              this.pickingTableConfig.data = pickList;
              this.warehouseWarrantConfig.data = storeInList;
              this.pickingTableConfig.businessFormConfig.formValue.PICKORDER_CREATE_TYPE = pickList.length && pickList[0] && pickList[0].PICKORDER_CREATE_TYPE || '1';
              this.formConfig.formValue.IS_OUTWAREHOUSE_ALONE = projectObj.IS_OUTWAREHOUSE_ALONE == 1;
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
      const valueArr = ['ENAME', 'BEGIN_TIME', 'END_TIME', 'RANK'];
      const drpArr = ['CP_C_SHOP_ID'];
      const mes = omsUtils.validatorNotEmpty(self.formConfig, valueArr, drpArr);
      if (mes !== 1) {
        self.$message.error(mes);
        return false;
      }

      /** 判断如果主表已保存并且有修改数据，入参就是修改的信息，否则传所有字段信息 */
      const isEdit = this.isMasterRequired && this.isModify;
      let params = isEdit
        ? this.modify.master
        : {
          ...this.formConfig.formValue,
          AUTO_ADD_GOODS_LIMIT: this.formConfig.formValue.AUTO_ADD_GOODS_LIMIT || 0
        };
      Object.keys(params).forEach(key => {
        if (['BEGIN_TIME', 'END_TIME'].includes(key)) {
          const val = this.formConfig.formValue[key];
          params[key] = val ? this.formatDate(val) : val;
        }
      });

      let formdata = new FormData()
      formdata.append('param', JSON.stringify({ ID: this.ID, VIPCOM_PROJECT: params }))
      this.service.strategyPlatform.wphScheduleSave(formdata)
        .then(({ data: { data } }) => {
          if (data.code == 0) {
            this.isMasterRequired = true;
            this.initModify();
            this.isModify = false
            data.data && (this.ID = data.data.objid);
            this.querySchedule();
            this.$message.success('保存成功');
            return;
          }
          this.$message.error('保存失败');
        });
    },
    /**
     * 拣货单/入库单保存
     * @param {*} params 表单数据
     * @param {*} type 拣货单/入库单
     */
    subTableSave(params, type) {
      let subTableName
      let api
      let newParams = params;
      this.dialogLoading = true;
      if (type == 'picking') {
        subTableName = 'PICKORDER_ITEM';
        api = 'pickSave';
        const { PICKORDER_TYPE } = newParams;
        PICKORDER_TYPE && (newParams = { ...newParams, PICKORDER_TYPE: PICKORDER_TYPE == 'bSelect-all' ? '1,2' : PICKORDER_TYPE.join(',') });
      } else {
        subTableName = 'WAREHOUSE_ENTRY_ITEM';
        api = 'warehouseInSave';
      }
      let payload = { [subTableName]: newParams, ST_C_VIPCOM_PROJECT_ID: this.ID };
      let formdata = new FormData()
      formdata.append('param', JSON.stringify(payload))
      this.service.strategyPlatform[api](formdata)
        .then(({ data: { data } }) => {
          this.dialogLoading = false;
          if (data.code == 0) {
            this.$message.success(data.message);
            if (type == 'warehouseInSave') {
              this.queryForm(this.dialogConfig[1].formConfig, 'CP_C_PHY_WAREHOUSE_ID').itemdata.defaultSelectedMrp = []
            }
            this.querySchedule();
            this.initModify();
            this.$refs.dialogForm.$parent.close();
          }
        }).catch(() => this.dialogLoading = false);
    },
    /**
     * 拣货单/入库单删除
     * @param {*} IDS 明细ID, -1则清空所有数据
     * @param {*} type pickingTableConfig、warehouseWarrantConfig
     */
    subTableDelete(IDS, type) {
      this.loading = true;
      let payload = { IDS, ST_C_VIPCOM_PROJECT_ID: this.ID };
      const api = type == 'pickingTableConfig' ? 'pickDelete' : 'warehouseInDelete';
      let formdata = new FormData()
      formdata.append('param', JSON.stringify(payload))
      this.service.strategyPlatform[api](formdata)
        .then(res => {
          const { data: { code, message } } = res.data
          this.loading = false;
          this[type].data = IDS != -1 ? this[type].data.filter(i => i.ID != IDS) : [];
          this.initModify();
          code == 0 ? this.$message.success(message) : this.$message.error(message);
        }).catch(() => this.loading = false);
    }
  },
};

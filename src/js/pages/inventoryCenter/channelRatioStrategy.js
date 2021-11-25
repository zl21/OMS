import { checkRuleFunMixin } from "@/assets/js/mixins/checkFormRule";
import { setTableDataMixin } from "@/assets/js/mixins/setTableData";
import { setFormDataFunMixin } from "@/assets/js/mixins/setFormData";

export default {
  mixins: [checkRuleFunMixin, setTableDataMixin, setFormDataFunMixin],
  components: {},
  data() {
    return {
      loading: false,
      isChange: false, // 记录是否修改
      multipleSelection: [], // 表格选中的列表
      detailsData: {info: {}, log: {}}, // 详情数据
      buttonText: {
        Y: '是',
        N: '否',
      },
      tableName: 'SG_C_CHANNEL_RATIO_STRATEGY',
      tab1tableName: '', // 配销仓明细的表名
      tab2tableName: '', // 操作日志的表名
      table1Refcolid: '',
      table2Refcolid: '',
      ID: this.$route.params.customizedModuleId && this.$route.params.customizedModuleId !== 'New' ? this.$route.params.customizedModuleId : '-1', // 记录主界面传入的ID
      collapse: ['panel_baseInfo', 'exclusive_stock', 'share_baseInfo', 'operation_log'],
      formConfig1: {
        formData: [
          {
            colname: 'CP_C_SHOP_ID',
            style: 'popInput', // 输入框弹框单多选
            width: '6',
            itemdata: {
              col: 1,
              colid: 1700824990, // 当前字段的ID
              colname: 'CP_C_SHOP_ID', // 当前字段的名称
              datelimit: 'all',
              display: 'text', // 显示什么类型，例如xml表示弹窗多选加导入功能，mrp表示下拉多选
              fkdisplay: 'drp', // 外键关联类型
              fkdesc: '店铺',
              inputname: 'CP_C_SHOP_ID:CP_C_SHOP_TITLE', // 这个是做中文类型的模糊查询字段，例如ENAME
              isfk: true, // 是否有fk键
              isnotnull: true, // 是否必填
              isuppercase: false, // 是否转大写
              length: 20, // 最大长度是多少
              name: '平台店铺',
              readonly: this.$route.params.customizedModuleId !== 'New', // 是否可编辑，对应input   readonly属性
              reftable: 'CP_C_SHOP', // 对应的表
              reftableid: 24475, // 对应的表ID
              row: 1,
              statsize: -1,
              type: 'STRING', // 这个是后台用的
              valuedata: '', // 这个是选择的值
              pid: '',
            },
            oneObj: e => {
              this.formConfig1.formValue.CP_C_SHOP_ID = e.pid;
              this.isChange = true;
            }
          },
          {
            style: 'input', // 输入框类型
            label: window.vmI18n.t('table_label.remarks'), // 备注
            value: 'REMARK', // 输入框的值
            width: '6', // 所占的宽度 (宽度分为24份,数值代表所占份数的宽度)
            icon: '', // 输入框后带的图标,暂只有输入框支持
            placeholder: '', // 占位文本，默认为请输入
            ghost: false, // 是否关闭幽灵按钮，默认开启
            disabled: false, // 禁用控制
            inputenter: () => {
            }, // 表单回车事件
            inputChange: () => {
              this.isChange = true;
            },
            setRequired: "required" //必选标识,值不为required时无标识
          },

        ],
        formValue: {
          CP_C_SHOP_ID: '', // 店铺
          REMARK: '', // 备注
        },
        ruleValidate: {
          CP_C_SHOP_ID: [{required: true, message: '请输入平台店铺'}],
          REMARK: [{required: false, message: '请输入备注'}],
        }
      }, // 基本信息
      formConfig2: {
        formData: [
          {
            colname: 'SG_C_SA_STORE_ID',
            style: 'popInput', // 输入框弹框单多选
            width: '6',
            itemdata: {
              col: 1,
              colid: 1700825000, // 当前字段的ID
              colname: "SG_C_SA_STORE_ID", // 当前字段的名称
              datelimit: 'all',
              display: 'text', // 显示什么类型，例如xml表示弹窗多选加导入功能，mrp表示下拉多选
              fkdisplay: 'drp', // 外键关联类型
              fkdesc: '配销仓档案',
              inputname: 'SG_C_SA_STORE_ID:ENAME', // 这个是做中文类型的模糊查询字段，例如ENAME
              isfk: true, // 是否有fk键
              isnotnull: false, // 是否必填
              isuppercase: false, // 是否转大写
              length: 20, // 最大长度是多少
              name: '配销仓',
              readonly: false, // 是否可编辑，对应input   readonly属性
              reftable: 'SG_C_SA_STORE', // 对应的表
              reftableid: 249230796, // 对应的表ID
              row: 1,
              statsize: -1,
              type: 'STRING', // 这个是后台用的
              valuedata: '', // 这个是选择的值
              pid: '',
            },
            oneObj: e => {
              this.formConfig2.formValue.SG_C_SA_STORE_ID = e.pid;
              this.isChange = true;
            }
          },
          {
            style: 'input', // 输入框类型
            regx: /^[0-9]*$/,
            label: '优先级',
            value: 'SG_C_SA_STORE_ORDERNO', // 输入框的值
            width: '6', // 所占的宽度 (宽度分为24份,数值代表所占份数的宽度)
            icon: '', // 输入框后带的图标,暂只有输入框支持
            placeholder: '', // 占位文本，默认为请输入
            ghost: false, // 是否关闭幽灵按钮，默认开启
            id: `formConfig2SG_C_SA_STORE_ORDERNO`,
            inputenter: () => {
            }, // 表单回车事件
            inputChange: () => {
              this.isChange = true;
            },
            setRequired: "required" //必选标识,值不为required时无标识
          },
          {
            style: 'input', // 输入框类型
            regx: /^[0-9]*$/,
            label: '比例（%）',
            value: 'RATIO', // 输入框的值
            width: '6', // 所占的宽度 (宽度分为24份,数值代表所占份数的宽度)
            icon: '', // 输入框后带的图标,暂只有输入框支持
            placeholder: '', // 占位文本，默认为请输入
            ghost: false, // 是否关闭幽灵按钮，默认开启
            id: `formConfig2RATIO`,
            inputenter: () => {
            }, // 表单回车事件
            inputChange: () => {
              this.isChange = true;
            },
            setRequired: "required" //必选标识,值不为required时无标识
          },

        ],
        formValue: {
          SG_C_SA_STORE_ID: '', // 配销仓
          SG_C_SA_STORE_ORDERNO: '', // 优先级
          RATIO: null, // 比例
        },
        ruleValidate: {
          SG_C_SA_STORE_ID: [{required: false, message: '请输入配销仓'}],
          SG_C_SA_STORE_ORDERNO: [{required: false, message: '请输入优先级', style: 'input'}],
          RATIO: [{required: false, message: '请输入配销仓比例', style: 'input'}],
        }
      }, // 独享库存表单
      formConfig3: {
        formData: [
          {
            colname: 'SG_C_SHARE_POOL_ID',
            style: 'popInput', // 输入框弹框单多选
            width: '6',
            itemdata: {
              col: 1,
              colid: 1700824992, // 当前字段的ID
              colname: 'SG_C_SHARE_POOL_ID', // 当前字段的名称
              datelimit: 'all',
              display: 'text', // 显示什么类型，例如xml表示弹窗多选加导入功能，mrp表示下拉多选
              fkdisplay: 'drp', // 外键关联类型
              fkdesc: '共享池档案',
              inputname: 'SG_C_SHARE_POOL_ID', // 这个是做中文类型的模糊查询字段，例如ENAME
              isfk: true, // 是否有fk键
              isnotnull: false, // 是否必填
              isuppercase: false, // 是否转大写
              length: 20, // 最大长度是多少
              name: '共享池',
              readonly: false, // 是否可编辑，对应input   readonly属性
              reftable: 'SG_C_SHARE_POOL', // 对应的表
              reftableid: 249230846, // 对应的表ID
              row: 1,
              statsize: -1,
              type: 'STRING', // 这个是后台用的
              valuedata: '', // 这个是选择的值
              pid: '',
            },
            oneObj: e => {
              this.formConfig3.formValue.SG_C_SHARE_POOL_ID = e.pid;
              this.isChange = true;
            }
          },
          {
            style: 'input', // 输入框类型
            regx: /^[0-9]*$/,
            label: '比例（%）',
            value: 'SG_C_SHARE_POOL_RATIO', // 输入框的值
            width: '6', // 所占的宽度 (宽度分为24份,数值代表所占份数的宽度)
            icon: '', // 输入框后带的图标,暂只有输入框支持
            placeholder: '', // 占位文本，默认为请输入
            ghost: false, // 是否关闭幽灵按钮，默认开启
            disabled: false, // 禁用控制
            id: `formConfig3SG_C_SHARE_POOL_RATIO`,
            inputenter: () => {
            }, // 表单回车事件
            inputChange: () => {
              this.isChange = true;
            },
            setRequired: "required" //必选标识,值不为required时无标识
          }

        ],
        formValue: {
          SG_C_SHARE_POOL_ID: '', // 共享池
          SG_C_SHARE_POOL_RATIO: null, // 共享池比例
        },
        ruleValidate: {
          SG_C_SHARE_POOL_ID: [{required: false, message: '请输入共享池'}],
          SG_C_SHARE_POOL_RATIO: [{required: false, message: '请输入共享池比例'}],
        }
      }, // 共享库存
      formConfig4: {
        formData: [],
        formValue: {},
      }, // 日志
      // 独享库存 表格头部信息
      exclusiveStockColumns: [],
      // 独享库存 表格数据
      exclusiveStockData: [],
      // 操作日志 表格头部信息
      shareBaseInfoColumns: [],
      // 操作日志 表格数据
      shareBaseInfoData: [],
      // 独享库存 查询条件
      exclusiveStockFilterList: [],
      exclusiveStockFilterValue: '', // 独享库存 查询条件值
      exclusiveStockFilterInputValue: '', // 独享库存 查询条件值 - 输入框

      // 弹框配置 导入
      importTable: {
        refFuns: 'confirmFun',
        confirmTitle: '',
        titleAlign: 'center', // 设置标题是否居中 center left
        width: '600',
        scrollable: false, // 是否可以滚动
        closable: true, // 是否可以按esc关闭
        draggable: true, // 是否可以拖动
        mask: true, // 是否显示遮罩层
        maskClosable: true, // 是否可以点击叉号关闭
        transfer: true, // 是否将弹层放在body内
        name: 'importTable', // 组件名称
        url: 'modal/publicDialog/importTable',
        keepAlive: true,
        excludeString: 'importTable', // 将name传进去，确认不缓存
        componentData: {}
      },
      isExport: false,
      exportModal: true, // 导出弹窗
    };
  },
  mounted() {
    this.getObjectTab()
    this.getObject()
  },
  computed: {
    canEdit() {
      const canEdit = this.isActive || this.ID === '-1'
      this.formConfig1.formData[1].disabled = !canEdit
      this.formConfig3.formData[0].itemdata.readonly = !canEdit
      this.formConfig3.formData[1].disabled = !canEdit
      return canEdit
    },
    btnConfig() {
      const baocun = this.isActive ? [
        {
          webname: 'lookup_save', // 保存
          text: '保存',
          size: '', // 按钮大小
          disabled: false, // 按钮禁用控制
          btnclick: () => {
            this.save();
          },
        }] : []
      const invalid = this.canEdit && this.ID !== '-1' ? [
        {
          text: '作废',
          webname: '',
          btnclick: () => {
            this.deleteAuthority();
          }
        },
        {
          text: '库存发布',
          webname: '',
          btnclick: () => {
            this.exeActionFun();
          }
        }
      ] : []
      const btns = {
        typeAll: 'default',
        buttons: [
          ...baocun,
          {
            text: window.vmI18n.t('btn.refresh'), // 刷新
            webname: '',
            btnclick: () => {
              this.refresh();
            }
          },
          ...invalid,
          {
            webname: 'lookup_return', // 返回
            text: window.vmI18n.t('btn.back'),
            btnclick: () => {
              this.back();
            },
          }
        ]

      }
      return btns
    }
  },
  methods: {
    /**
     * 开关切换事件
     * @param row
     */
    switchFun(row, index) {
      console.log(row, index)
      const oldVal = row.ISACTIVE === '是' ? 'Y' : 'N'
      const newVal = oldVal === 'Y' ? 'N' : 'Y'
      this.$confirm(oldVal === 'Y' ? '确认停用吗？' : '确认启用吗？', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        confirmButtonClass: '',
        type: 'warning'
      }).then(() => {
        this.addSubmit(row.ID, oldVal, newVal, false, true)
      }).catch(() => {
        // this.exclusiveStockData[index].ISACTIVE = oldVal === 'Y' ? '是 ' : '否'
        this.getExclusiveStockData()
      });
    },
    /**
     * 库存发布
     */
    exeActionFun() {
      const param = {
        objid: this.ID,
        table: this.tableName,
        menu: "比例同步策略",
      }
      const formdata = new FormData();
      formdata.append('actionid', 41460447);
      formdata.append('webaction', null);
      formdata.append('param', JSON.stringify(param));
      this.service.common.exeAction(formdata).then((res) => {
        if (res.data.code === 0) {
          this.$Message.success(res.data.message || '同步成功！');
          this.isChange = false
          this.refresh()
        } else {
          console.log('数据加载失败');
        }
      });
    },
    /**
     * 作废
     */
    deleteAuthority() {
      this.$confirm('确认执行作废？', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        confirmButtonClass: '',
        customClass: 'warning-alert',
        type: 'warning'
      }).then(() => {
        const formdata = new FormData();
        formdata.append('table', this.tableName);
        formdata.append('objid', this.ID);
        this.service.common.objectVoid(formdata).then((res) => {
          if (res.data.code === 0) {
            this.$Message.success(res.data.message || '作废成功！');
            this.isChange = false
            this.refresh()
          } else {
            console.log('数据加载失败');
          }
        });
      });
    },
    /**
     * 刷新
     */
    refresh() {
      const refresh = () => {
        this.getObjectTab()
        this.getObject()
      }
      if (this.isChange) {
        this.$confirm('修改的数据未保存,确定刷新？', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          confirmButtonClass: '',
          type: 'warning'
        }).then(() => {
          refresh()
        });
      } else {
        refresh()
      }
    },
    /**
     * 导入
     */
    importFun() {
      const _this = this
      this.importTable.componentData = {
        tableName: this.tableName,
        objid: this.ID,
        mainId: this.ID,
        table: this.tab1tableName,
        mainTable: this.tableName,
        menu: '配销仓明细',
        downloadObj: {
          url: '/p/cs/downloadImportTemplate',
          method: 'GET',
          param: {
            searchdata: JSON.stringify({table: this.tab1tableName})
          },
        },
        importObj: {
          url: '/p/cs/import',
        },
        returnData(data) {
          _this.isChange = false
          _this.refresh()
        }
      };
      this.$children.find(item => item.name === 'importTable').openConfirm();
    },
    /**
     * 导出
     */
    exportClick() {
      if (this.isExport) {
        // 有一项导出正在进行中
        this.$Message.error(window.vmI18n.t('modalTips.f8'));
        return;
      }
      this.isExport = true;
      const idArr = this.multipleSelection.map(item => item.ID);
      const formdata = new FormData();
      const searchdata = {
        table: this.tab1tableName,
        column_include_uicontroller: true,
        fixedcolumns: {ID: idArr.length ? idArr : null},
        objectIds: `${this.table1Refcolid}=${this.ID}`,
        startindex: 0,
        range: 10
      }
      formdata.append('searchdata', JSON.stringify(searchdata));
      formdata.append('menu', '配销仓明细');
      formdata.append('filename', '配销仓明细');
      formdata.append('filetype', '.xlsx');
      formdata.append('showColumnName', true);

      this.service.orderCenter.exportChannel(formdata).then(res => {
        this.isExport = false;
        if (res.data.code == 0) {
          const data = res.data.data
          if (data !== null) {
            // res.data.data
            this.$confirm('本次操作已后台处理，是否至[我的任务]查看?', '提醒', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              confirmButtonClass: '',
              type: 'warning'
            }).then(() => {
              // 跳转页面
              R3.store.commit('global/tabOpen', {
                type: 'V',
                tableName: 'CP_C_TASK',
                label: window.vmI18n.t('other.myMission'),
                tableId: 24386,
                id: data,
                query: {
                  id: data,
                  pid: '10010',
                  ptitle: window.vmI18n.t('other.myMission'),
                  ptype: 'table',
                  tabTitle: window.vmI18n.t('other.myMission'),
                  tableName: 'CP_C_TASK'
                }
              });
            }).catch(() => {

            });
          }
        } else {
          const err = res.data.message || window.vmI18n.t('modalTips.z3'); // 失败！
          this.$Message.error(err);
        }
      });
    },
    /**
     * 选中表格事件
     * @param val
     */
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    /**
     *
     * 独享库存 - 添加
     * @param ID
     * @param oldVal
     * @param newVal
     * @param formInputRadio 是否来自修改比例触发
     * @param formSwitch 是否来自开关触发
     * @param formInputOrder 是否来自修改优先级触发
     */
    addSubmit(ID, oldVal, newVal, formInputRadio, formSwitch, formInputOrder) {
      if (this.ID === '-1') {
        this.save()
      } else {

        for (let key in this.formConfig2.formValue) {
          this.formConfig2.ruleValidate[key][0].required = true
        }
        let formConfigIsTrue = formInputRadio || formSwitch || formInputOrder ? true : this.checkRuleFun('formConfig2')
        let isTrue = ID === '-1' ? formConfigIsTrue : true
        this.$nextTick(() => {
          if (isTrue) {
            if (!this.tab1tableName) {
              return
            }
            const data = {}
            const SG_C_SA_STORE_ID = this.formConfig2.formValue.SG_C_SA_STORE_ID
            const addObj = ID === '-1' && SG_C_SA_STORE_ID ? {
              SG_C_SA_STORE_ID: SG_C_SA_STORE_ID,
              RATIO: this.formConfig2.formValue.RATIO,
              SG_C_SA_STORE_ORDERNO: Number(this.formConfig2.formValue.SG_C_SA_STORE_ORDERNO)
            } : {}

            let tableDatas = {}
            if (formSwitch) {
              tableDatas = {ISACTIVE: newVal}
            } else if (formInputRadio) {
              tableDatas = {RATIO: newVal}
            } else if (formInputOrder) {
              tableDatas = {SG_C_SA_STORE_ORDERNO: ID === '-1' ? Number(this.formConfig2.formValue.SG_C_SA_STORE_ORDERNO) : Number(newVal)}
            }

            data[this.tab1tableName] = [
              Object.assign(tableDatas, {ID: ID, ...addObj})
            ]

            const formdata = new FormData();
            formdata.append('table', this.tableName);
            formdata.append('objid', this.ID);
            formdata.append('data', JSON.stringify(data));
            if (ID && ID > 0) { // 表格行内编辑
              const before = {}
              const after = {}
              // const switchObj =
              before[this.tab1tableName] = [
                Object.assign(formSwitch ? {ISACTIVE: oldVal} : formInputOrder ? {SG_C_SA_STORE_ORDERNO: Number(oldVal)} : {RATIO: oldVal}, {ID: ID})
              ]
              after[this.tab1tableName] = [
                Object.assign(formSwitch ? {ISACTIVE: newVal} : formInputOrder ? {SG_C_SA_STORE_ORDERNO: Number(newVal)} : {RATIO: newVal}, {ID: ID})
              ]

              //
              // after[this.tab1tableName] = [{
              //   RATIO: newVal,
              //   ID: ID,
              // }]
              formdata.append('before', JSON.stringify(before));
              formdata.append('after', JSON.stringify(after));
            }
            this.service.common.objectSave(formdata).then((res) => {
              if (res.data.code === 0) {
                this.getExclusiveStockData() // 更新表格数据
                this.$Message.success(res.data.message || '保存成功！');
                this.formConfig2.formData[0].itemdata.valuedata = ''
                this.formConfig2.formData[0].itemdata.pid = ''
                this.formConfig2.formValue.SG_C_SA_STORE_ID = ''
                this.formConfig2.formValue.SG_C_SA_STORE_ORDERNO = ''
                this.formConfig2.formValue.RATIO = ''
              } else {
                console.log('数据加载失败');
              }
            });
          }
        })
      }
    },
    /**
     * 基本信息 & 日志
     */
    getObject() {
      this.loading = true
      const formdata = new FormData();
      formdata.append('table', this.tableName);
      formdata.append('objid', this.ID);
      this.service.common.getObject(formdata).then(res => {
        this.loading = false
        const addcolums = res.data.data.addcolums
        if (res.data.code === 0) {
          this.detailsData = {
            info: addcolums[0],
            log: addcolums[1],
          }
          if (this.ID !== '-1') {
            // 基本信息赋值
            addcolums[0].childs.forEach((item) => {
              // 基础信息
              if (item.colname === this.formConfig1.formData[0].itemdata.colname) {
                this.formConfig1.formData[0].itemdata.valuedata = item.valuedata
              }
              if (item.colname === 'CP_C_SHOP_ID') {
                this.formConfig1.formValue.CP_C_SHOP_ID = item.valuedata ? item.refobjid : ''
              }
              if (item.colname === 'REMARK') {
                this.formConfig1.formValue.REMARK = item.valuedata
              }
              //共享库存
              if (item.colname === 'SG_C_SHARE_POOL_ID') {
                this.formConfig3.formData[0].itemdata.valuedata = item.valuedata
                this.formConfig3.formData[0].itemdata.pid = item.valuedata ? item.refobjid : ''
                this.formConfig3.formValue.SG_C_SHARE_POOL_ID = item.valuedata ? item.refobjid : ''
              }
              if (item.colname === 'SG_C_SHARE_POOL_RATIO') {
                this.formConfig3.formValue.SG_C_SHARE_POOL_RATIO = item.valuedata
              }
            })
            // 日志赋值
            this.formCommonFun('formConfig4', addcolums[1].childs)
          }
        } else {
          console.log('数据加载失败');
        }
      });
    },
    /**
     * 操作日志
     */
    objectTableItem() {
      const searchdata = {
        column_include_uicontroller: true,
        startindex: 0,
        range: 999998
      }
      const formdata = new FormData();
      formdata.append('table', this.tab2tableName);
      formdata.append('objid', this.ID);
      formdata.append('refcolid', this.table2Refcolid);
      formdata.append('searchdata', JSON.stringify(searchdata));

      this.service.common.objectTableItem(formdata).then(res => {
        const datas = res.data.datas
        if (res.data.code === 0) {
          // 表头和表格数据
          const showTable = this.setTableData(datas, false, true, null);
          this.shareBaseInfoData = showTable.tbody
          this.shareBaseInfoColumns = showTable.thead
        } else {
          console.log('数据加载失败');
        }
      });
    },
    getObjectTab() {
      this.loading = true
      const formdata = new FormData();
      formdata.append('table', this.tableName);
      formdata.append('objid', this.ID);
      formdata.append('ismaintable', 'y');
      this.service.inventoryCenter.objectTab(formdata).then(res => {
        this.loading = false
        const reftabs = res.data.data.reftabs
        if (res.data.code === 0) {
          this.tab1tableName = reftabs[0].tablename
          this.table1Refcolid = reftabs[0].refcolid
          this.tab2tableName = reftabs[1].tablename
          this.table2Refcolid = reftabs[1].refcolid
          this.getExclusiveStockData() // 配销仓明细
        } else {
          console.log('数据加载失败');
        }
      })
    },
    /**
     * 独享库存 表格数据
     */
    getExclusiveStockData() {
      const formdata = new FormData();
      const fixedcolumns = {}
      if (this.exclusiveStockFilterValue && this.exclusiveStockFilterInputValue) {
        fixedcolumns[`${this.exclusiveStockFilterValue}`] = this.exclusiveStockFilterInputValue
      }
      const searchdata = {
        startindex: 0,
        column_include_uicontroller: true,
        range: 99999
      };
      if (Object.keys(fixedcolumns).length) {
        searchdata.fixedcolumns = fixedcolumns
      }
      formdata.append('table', this.tab1tableName);
      formdata.append('objid', this.ID);
      formdata.append('refcolid', this.table1Refcolid);
      formdata.append('searchdata', JSON.stringify(searchdata));
      this.service.common.objectTableItem(formdata).then(res => {
        const datas = res.data.datas
        if (res.data.code === 0) {
          // 表头和表格数据
          const showTable = this.setTableData(datas, true, true, (element) => {
            if (element.colname === 'ISACTIVE') {
              return {
                width: 80,
                slot: 'switch',
                align: 'center',
              }
            } else if (element.colname === 'RATIO') {
              return {
                width: 90,
                align: 'center',
                render: (h, params) => {
                  return h(
                    'div', {
                      style: {
                        width: '100%',
                        display: 'flex',
                        alignitems: 'center',
                        justifyContent: 'space-between',
                      },
                    },
                    [
                      this.canEdit ? h('Input', {
                        class: 'isNone',
                        style: {
                          width: '70',
                          height: '100%',
                          'text-align': 'center',
                        },
                        props: {
                          value: params.row.RATIO,
                          autosize: true,
                          regx: /^[0-9]*$/,
                        },
                        on: {
                          'on-blur': (e) => {
                            const oldVal = params.row.RATIO
                            let newVal = e.target.value
                            if (newVal === '') { // 双泉说 为空时传0 过去
                              newVal = 0
                            }
                            if (oldVal !== newVal) {
                              this.addSubmit(params.row.ID, oldVal, newVal, true, false, false)
                              this.isChange = true;
                            }
                          },
                        },
                      }) : params.row.RATIO,
                    ]
                  );
                }
              }
            } else if (element.colname === 'SG_C_SA_STORE_ORDERNO') {
              return {
                width: 90,
                align: 'center',
                renderHeader: (h, params) => {
                  const column = params.column
                  return h('span', {
                    class: 'line-height-30 cursor-pointer',
                    style: 'margin-right:-5px;'
                  }, [
                    h('Poptip', {
                      props: {
                        transfer: true,
                        trigger: 'hover',
                        // title: 'Title',
                        content: '数值越大，优先级越高',
                        width: '200px'
                      }
                    }, [
                      h(
                        'span', column.title,
                      ),
                      h('i', {
                        class: 'iconfont iconios-information-circle-outline color-primary mg-lf-3 pull-right font-size-14',
                      })
                    ])
                  ]);
                },
                render: (h, params) => {
                  return h(
                    'div', {
                      style: {
                        width: '100%',
                        display: 'flex',
                        alignitems: 'center',
                        justifyContent: 'space-between',
                      },
                    },
                    [
                      this.canEdit ? h('Input', {
                        class: 'isNone',
                        style: {
                          width: '70',
                          height: '100%',
                          'text-align': 'center',
                        },
                        props: {
                          value: params.row.SG_C_SA_STORE_ORDERNO,
                          autosize: true,
                          regx: /^[0-9]*$/,
                        },
                        on: {
                          'on-blur': (e) => {
                            const oldVal = params.row.SG_C_SA_STORE_ORDERNO
                            let newVal = e.target.value
                            if (newVal === '') {
                              // params.row.SG_C_SA_STORE_ORDERNO = 222
                              // params.row.SG_C_SA_STORE_ORDERNO = Number(datas.row[params.index].SG_C_SA_STORE_ORDERNO.val)
                              this.getExclusiveStockData()
                              return
                            }
                            if (oldVal !== newVal) {
                              this.addSubmit(params.row.ID, oldVal, newVal, false, false, true)
                              this.isChange = true;
                            }
                          },
                        },
                      }) : params.row.RATIO,
                    ]
                  );
                }
              }
            } else {
              return {}
            }

          });
          this.exclusiveStockData = showTable.tbody
          this.exclusiveStockColumns = showTable.thead
          this.exclusiveStockFilterList = showTable.filterList
          setTimeout(() => {
            this.objectTableItem() // 操作日志
          }, 500)
        } else {
          console.log('数据加载失败');
        }
      });
    },

    onOk() {
      $utils.tabCloseAppoint(this);
      this.$destroy(true);
      this.$store.commit('global/tabOpen', {
        tableId: 249230883,
        type: 'S',
        tableName: 'V_SG_C_CHANNEL_RATIO_STRATEGY',
        back: true,
      });
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
    /**
     * 保存
     */
    save() {
      let isTrue = this.checkRuleFun('formConfig1')
      let formConfig2IsTrue = true
      let formConfig3IsTrue = true
      if (this.formConfig2.formValue.SG_C_SA_STORE_ID || this.formConfig2.formValue.RATIO || this.formConfig2.formValue.SG_C_SA_STORE_ORDERNO) {
        this.formConfig2.ruleValidate.SG_C_SA_STORE_ID[0].required = true
        this.formConfig2.ruleValidate.RATIO[0].required = true
        this.formConfig2.ruleValidate.SG_C_SA_STORE_ORDERNO[0].required = true
        formConfig2IsTrue = this.checkRuleFun('formConfig2')
      }
      if (this.formConfig3.formValue.SG_C_SHARE_POOL_ID || this.formConfig3.formValue.SG_C_SHARE_POOL_RATIO) {
        this.formConfig3.ruleValidate.SG_C_SHARE_POOL_ID[0].required = true
        this.formConfig3.ruleValidate.SG_C_SHARE_POOL_RATIO[0].required = true
        formConfig3IsTrue = this.checkRuleFun('formConfig3')
      }
      this.$nextTick(() => {
        if (isTrue && formConfig2IsTrue && formConfig3IsTrue) {
          const formdata = new FormData();
          const data = {}
          const before = {}
          data[this.tableName] = {}
          before[this.tableName] = {}

          if (this.ID === '-1') {
            data[this.tableName].ISACTIVE = 'Y'
          }

          const commonFun = (item, key, obj) => {
            if (item.colname === key) {
              const oldVal = item.refobjid || item.valuedata
              const newVal = this[obj].formValue[key]
              if (oldVal !== newVal && newVal) {
                data[this.tableName][key] = newVal
                if (oldVal !== undefined) {
                  before[this.tableName][key] = oldVal
                }
              }
            }
          }
          if (this.detailsData.info.childs) {
            this.detailsData.info.childs.forEach((item) => {
              for (let key in this.formConfig1.formValue) {
                commonFun(item, key, 'formConfig1')
              }
              for (let key in this.formConfig3.formValue) {
                commonFun(item, key, 'formConfig3')
              }
            })
          }


          if (this.formConfig2.formValue.SG_C_SA_STORE_ID && this.formConfig2.formValue.RATIO && this.formConfig2.formValue.SG_C_SA_STORE_ORDERNO) {
            data[this.tab1tableName] = [{
              SG_C_SA_STORE_ID: this.formConfig2.formValue.SG_C_SA_STORE_ID, // 配销仓
              RATIO: this.formConfig2.formValue.RATIO, // 配销仓比例
              SG_C_SA_STORE_ORDERNO: Number(this.formConfig2.formValue.SG_C_SA_STORE_ORDERNO), // 配销仓比例
              ID: -1
            }]
          }
          if (!Object.keys(data[this.tableName]).length) {
            delete data[this.tableName]
          }
          formdata.append('table', this.tableName);
          formdata.append('objid', this.ID);
          formdata.append('data', JSON.stringify(data));
          if (Object.keys(before[this.tableName]).length) {
            console.log(4, before[this.tableName])
            formdata.append('after', JSON.stringify(data));
            formdata.append('before', JSON.stringify(before));
          }
          if (Object.keys(data).length) {
            this.loading = true
            this.service.orderCenter.objectAdd(formdata).then(res => {
              this.loading = false
              if (res.data.code === 0) {
                const objid = res.data.data.objid
                if (this.ID === '-1') {
                  this.$store.commit('customize/TabOpen', {
                    id: objid, // id
                    type: 'action', // 类型action
                    name: 'CHANNELRATIOSTRATEGY', // 文件名
                    label: '比例同步策略',
                  });
                }
                this.formConfig2.formData[0].itemdata.valuedata = ''
                this.formConfig2.formData[0].itemdata.pid = ''
                this.formConfig2.formValue.SG_C_SA_STORE_ID = ''
                this.formConfig2.formValue.RATIO = ''
                this.formConfig2.formValue.SG_C_SA_STORE_ORDERNO = ''
                this.$Message.success(window.vmI18n.t('modalTips.z9')); // '保存成功'
                this.ID = objid
                this.$nextTick(() => {
                  this.isChange = false
                  this.refresh()
                });
              } else {
                console.log('数据加载失败');
              }
            });
          }
        }
      });

    },
  },
};

import { checkRuleFunMixin } from "@/assets/js/mixins/checkFormRule";
import { setTableDataMixin } from "@/assets/js/mixins/setTableData";
import { setFormDataFunMixin } from "@/assets/js/mixins/setFormData";

export default {
  mixins: [checkRuleFunMixin, setTableDataMixin, setFormDataFunMixin],
  components: {},
  data() {
    return {
      // 独享库存的分页器
      exclusiveStockPage: {
        tabname: '',
        current: 1,
        pageSize: 10,
        total: 1,
        pageSizeOpts: [10, 20, 30, 50, 100],
      },
      // 共享库存的分页器
      shareBaseInfoPage: {
        tabname: '',
        current: 1,
        pageSize: 10,
        total: 1,
        pageSizeOpts: [10, 20, 30, 50, 100],
      },
      loading: false,
      table1Loading: false,
      table2Loading: false,
      isChange: false, // 记录是否修改
      multipleSelection: [], // 独享库存 表格选中的列表
      multipleSelection2: [], // 共享库存 表格选中的列表
      detailsData: {info: {}, log: {}}, // 详情数据
      buttonText: {
        Y: '是',
        N: '否',
      },
      tableName: 'SG_C_CHANNEL_SKU_STRATEGY',
      tab1tableName: '', // 独享库存明细的表名
      tab2tableName: '', // 操作日志的表名
      table1Refcolid: '',
      table2Refcolid: '',
      ID: this.$route.params.customizedModuleId && this.$route.params.customizedModuleId !== 'New' ? this.$route.params.customizedModuleId : '-1', // 记录主界面传入的ID
      collapse: ['panel_baseInfo', 'exclusive_stock', 'share_baseInfo'],
      formConfig1: {
        formData: [],
        formValue: {},
        ruleValidate: {}
      }, // 基本信息
      formConfig2: {
        formData: [],
        formValue: {},
        ruleValidate: {}
      }, // 独享库存表单
      formConfig3: {
        formData: [],
        formValue: {},
        ruleValidate: {}
      }, // 共享库存
      formConfig4: {
        formData: [],
        formValue: {},
      }, // 日志
      // 独享库存 表格头部信息
      exclusiveStockColumns: [],
      // 独享库存 表格数据
      exclusiveStockData: [],
      // 共享库存 表格头部信息
      sharedInventoryColumns: [],
      // 共享库存 表格数据
      sharedInventoryData: [],


      // 独享库存 查询条件
      exclusiveStockFilterList: [],
      exclusiveStockFilterValue: '', // 独享库存 查询条件值
      exclusiveStockFilterInputValue: '', // 独享库存 查询条件值 - 输入框

      // 共享库存 查询条件
      sharedInventoryFilterList: [],
      sharedInventoryFilterValue: '', // 独享库存 查询条件值
      sharedInventoryFilterInputValue: '', // 独享库存 查询条件值 - 输入框

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
      isExport2: false,
    };
  },
  mounted() {
    this.getObjectTab()
  },
  computed: {
    canEdit() {
      return `${this.status}` === '1' || this.ID === '-1'
    },
    btnConfig() {
      const jiean = `${this.status}` === '2' ? [
        {
          text: '结案',
          webname: '',
          btnclick: () => {
            this.exeActionFun()
          }
        },
      ] : []
      const tijiao = this.canEdit && this.ID !== '-1' ? [
        {
          text: '提交',
          webname: '',
          btnclick: () => {
            this.submitFun('submit')
          }
        }
      ] : []
      const zuofei = this.canEdit && this.ID !== '-1' ? [
        {
          text: '作废',
          webname: '',
          btnclick: () => {
            this.deleteAuthority();
          }
        }
      ] : []
      const invalid = this.canEdit ? [
        {
          webname: 'lookup_save', // 保存
          text: '保存',
          size: '', // 按钮大小
          disabled: false, // 按钮禁用控制
          btnclick: () => {
            this.submitFun('save');
          },
        },
        ...tijiao,
        ...zuofei,

      ] : []

      const btns = {
        typeAll: 'default',
        buttons: [
          ...invalid,
          ...jiean,
          {
            text: window.vmI18n.t('btn.refresh'), // 刷新
            webname: '',
            btnclick: () => {
              this.refresh();
            }
          },
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
        this.isChange = false
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
     * @param tableName
     * @param menu
     * @param delType 判断刷新哪个表
     */
    importFun(tableName, menu, delType) {
      const _this = this
      this.importTable.componentData = {
        tableName: _this.tableName,
        objid: _this.ID,
        mainId: _this.ID,
        table: tableName,
        mainTable: _this.tableName,
        menu: menu,
        downloadObj: {
          url: '/p/cs/downloadImportTemplate',
          method: 'GET',
          param: {
            searchdata: JSON.stringify({table: tableName})
          },
        },
        importObj: {
          url: '/p/cs/import',
        },
        returnData(data) {
          if (delType === 1) {
            this.getExclusiveStockData() // 更新表格数据 - 独享库存
          } else if (delType === 2) {
            this.getSharedInventoryData() // 更新表格数据 - 共享库存
          }
        }
      };
      this.$children.find(item => item.name === 'importTable').openConfirm();
    },
    /**
     * 导出
     * @param tableName
     * @param multipleSelection
     * @param objectIds
     * @param menu
     * @param isExport
     * @param type
     */
    exportClick(tableName, multipleSelection, objectIds, menu, isExport, type) {
      if (this[isExport]) {
        // 有一项导出正在进行中
        this.$Message.error(window.vmI18n.t('modalTips.f8'));
        return;
      }
      this[isExport] = true;
      const idArr = multipleSelection.map(item => item.ID);
      const formdata = new FormData();
      const searchdata = {
        table: tableName,
        column_include_uicontroller: true,
        fixedcolumns: {ID: idArr.length ? idArr : null},
        objectIds: `${objectIds}=${this.ID}`,
        startindex: 0,
        range: 10
      }
      formdata.append('searchdata', JSON.stringify(searchdata));
      formdata.append('menu', menu);
      formdata.append('filename', menu);
      formdata.append('filetype', '.xlsx');
      formdata.append('showColumnName', true);

      this.service.orderCenter.exportChannel(formdata).then(res => {
        this[isExport] = false;
        if (res.data.code == 0) {
          const data = res.data.data
          if (data !== null) {
            // 取消选择
            this.$refs[`table${type}`].selectAll(false);

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
     *独享库存 选中表格事件
     * @param val
     */
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    /**
     * 共享库存 选中表格事件
     * @param val
     */
    handleSelectionChange2(val) {
      this.multipleSelection2 = val;
    },
    /**
     * 删除明细
     * @param multipleSelection
     * @param tableName
     * @param delType
     */
    delFun(multipleSelection, tableName, delType) {
      if (!multipleSelection.length) {
        this.$Message.warning('请先选择需要删除的记录！');
        return
      }
      const data = {}
      const idArr = []
      multipleSelection.forEach((item) => {
        idArr.push(item.ID)
      })
      data[tableName] = idArr
      const formdata = new FormData();
      formdata.append('table', this.tableName);
      formdata.append('objid', this.ID);
      formdata.append('isdelmtable', false); // false:代表删除明细；
      formdata.append('data', JSON.stringify(data));
      this.service.common.objectDelete(formdata).then((res) => {
        if (res.data.code === 0) {
          this.$Message.success(res.data.message || '删除成功！');
          if (delType === 1) {
            this.getExclusiveStockData() // 更新表格数据 - 独享库存
          } else if (delType === 2) {
            this.getSharedInventoryData() // 更新表格数据 - 共享库存
          }
        } else {
          console.log('数据加载失败');
        }
      })
    },

    /**
     * 添加
     * @param ID
     * @param formConfig
     * @param tableName
     * @param type
     * @param oldVal
     * @param newVal
     * @param formInput
     */
    addSubmit(ID, formConfig, tableName, type, oldVal, newVal, formInput) {
      for (let key in this[formConfig].formValue) {
        this[formConfig].ruleValidate[key][0].required = true
      }
      let formConfigIsTrue = formInput ? true : this.checkRuleFun(formConfig)
      let isTrue = ID === '-1' ? formConfigIsTrue : true
      this.$nextTick(() => {
        if (isTrue) {
          if (!tableName) {
            return
          }
          const data = {}
          const SG_C_SA_STORE_ID = this[formConfig].formValue.SG_C_SA_STORE_ID
          const SKU_ID = this[formConfig].formValue.SKU_ID
          const addObj = ID === '-1' && SG_C_SA_STORE_ID ? {SG_C_SA_STORE_ID} : {}
          const addObj2 = ID === '-1' && SKU_ID ? {SKU_ID} : {}

          data[tableName] = [
            Object.assign({RATIO: ID === '-1' ? this[formConfig].formValue.RATIO : newVal}, {ID: ID, ...addObj, ...addObj2})
          ]

          const formdata = new FormData();
          formdata.append('table', this.tableName);
          formdata.append('objid', this.ID);
          formdata.append('data', JSON.stringify(data));
          if (ID && ID > 0) { // 表格行内编辑
            const before = {}
            const after = {}
            before[tableName] = [
              Object.assign({RATIO: oldVal}, {ID: ID})
            ]
            after[tableName] = [
              Object.assign({RATIO: newVal}, {ID: ID})
            ]
            formdata.append('before', JSON.stringify(before));
            formdata.append('after', JSON.stringify(after));
          }
          this.service.common.objectSave(formdata).then((res) => {
            if (res.data.code === 0) {
              if (type === 1) {
                this.getExclusiveStockData() // 更新表格数据
              } else if (type === 2) {
                this.getSharedInventoryData() // 更新表格数据
              }
              this.$Message.success(res.data.message || '保存成功！');

              if (ID < 0) { // 为了清空表单值
                if (type === 1) {
                  this.getTab1FormData()
                } else if (type === 2) {
                  this.getTab2FormData()
                }
                /* TODO  为了清空表单值  for (let key in this[formConfig].formValue) {
                     const data = this[formConfig].formValue[key]
                     this.$nextTick(()=>{
                       this.$set(this[formConfig].formValue, [key], Array.isArray(data) ? [] : '');
                     });
                   }*/
              }
            } else {
              console.log('数据加载失败');
            }
          });
        }
      })

    },
    /**
     * 结案
     */
    exeActionFun() {
      this.$confirm('确认执行结案？', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        confirmButtonClass: '',
        customClass: 'warning-alert',
        type: 'warning'
      }).then(() => {
        const param = {
          objid: this.ID,
          table: this.tableName,
          menu: "特殊条码按比例同步策略",
        }
        const formdata = new FormData();
        formdata.append('actionid', 41460446);
        formdata.append('webaction', null);
        formdata.append('param', JSON.stringify(param));
        this.service.inventoryCenter.exeAction(formdata).then((res) => {
          if (res.data.code === 0) {
            this.$Message.success(res.data.message || '提交成功！');
            this.isChange = false
            this.refresh()
          } else {
            console.log('数据加载失败');
          }
        });
      });
    },
    /**
     * 提交
     * @param type (save:保存按钮，submit 提交按钮)
     */
    submitFun(type) {
      const submitCommonFun = () => {
        const data = {}
        const after = {}
        const before = {}
        data[this.tableName] = {}
        after[this.tableName] = {}
        before[this.tableName] = {}
        data[this.tab1tableName] = [{}]
        data[this.tab2tableName] = [{}]
        if (this.ID < 0) {
          data[this.tableName].STATUS = '1'
          // data[this.tab1tableName][0].ID = -1
          // data[this.tab2tableName][0].ID = -1
        } else {
          data[this.tableName].ID = this.ID
        }

        // 保存部分 -  基本信息
        let isAddFormConfig1 = false
        if (type === 'save') {
          isAddFormConfig1 = this.checkRuleFun('formConfig1')
        }
        if (!isAddFormConfig1 && type === 'save') {
          return
        }


        // 添加部分 - 独享库存
        let isAddFormConfig2 = false // 是否新增独享库存
        if (this.formConfig2.formValue.SG_C_SA_STORE_ID || this.formConfig2.formValue.RATIO || this.formConfig2.formValue.SKU_ID) {
          this.formConfig2.ruleValidate.SG_C_SA_STORE_ID[0].required = true
          this.formConfig2.ruleValidate.RATIO[0].required = true
          this.formConfig2.ruleValidate.SKU_ID[0].required = true
          isAddFormConfig2 = true
        }
        if (isAddFormConfig2) {
          data[this.tab1tableName][0].ID = -1
          let isTrue = this.checkRuleFun('formConfig2')
          if (isTrue) {
            // 组装数据 -  独享库存部分
            for (let key in this.formConfig2.formValue) {
              if (this.formConfig2.formValue[key]) {
                data[this.tab1tableName][0][key] = this.formConfig2.formValue[key]
              }
            }
          } else {
            delete data[this.tab1tableName]
            return
          }
        } else {
          delete data[this.tab1tableName]
        }


        // 添加部分 - 共享库存
        let isAddFormConfig3 = false // 是否新增独享库存
        if (this.formConfig3.formValue.RATIO || this.formConfig3.formValue.SKU_ID) {
          this.formConfig3.ruleValidate.RATIO[0].required = true
          this.formConfig3.ruleValidate.SKU_ID[0].required = true
          isAddFormConfig3 = true
        }
        if (isAddFormConfig3) {
          data[this.tab2tableName][0].ID = -1
          let isTrue = this.checkRuleFun('formConfig3')
          if (isTrue) {
            // 组装数据 -  共享库存部分
            for (let key in this.formConfig3.formValue) {
              if (this.formConfig3.formValue[key]) {
                data[this.tab2tableName][0][key] = this.formConfig3.formValue[key]
              }
            }
          } else {
            delete data[this.tab2tableName]
            return
          }
        } else {
          delete data[this.tab2tableName]
        }


        // 组装数据 -  基础信息部分
        const commonFun = (item, key, obj) => {
          if (item.colname === key && !item.readonly) {
            const oldVal = item.valuedata
            let newVal = this[obj].formValue[key]
            if (item.display.indexOf('DAT') !== -1) {
              newVal = $utils.dateFormat(new Date(this[obj].formValue[key]), 'yyyy-MM-dd hh:mm:ss')
            }
            if (oldVal !== newVal && newVal) {
              data[this.tableName][key] = newVal
              after[this.tableName][key] = newVal
              before[this.tableName][key] = oldVal
            }
          }
        }
        if (this.detailsData.info.childs) {
          this.detailsData.info.childs.forEach((item) => {
            for (let key in this.formConfig1.formValue) {
              commonFun(item, key, 'formConfig1')
            }
          })
        }


        // -----

        const formdata = new FormData();
        formdata.append('table', this.tableName);
        formdata.append('objid', this.ID);
        formdata.append('data', JSON.stringify(data));
        if (this.ID !== '-1' && Object.keys(before[this.tableName]).length && Object.keys(after[this.tableName]).length) {
          formdata.append('before', JSON.stringify(before));
          formdata.append('after', JSON.stringify(after));
        }
        this.loading = true
        if (this.ID < 0) { // 新增
          this.service.orderCenter.objectAdd(formdata).then((res) => {
            this.loading = false
            if (res.data.code === 0) {
              const objid = res.data.data.objid
              this.$store.commit('customize/TabOpen', {
                id: objid, // id
                type: 'action', // 类型action
                name: 'CHANNELSKUSTRATEGY', // 文件名
                label: '特殊条码按比例同步策略',
              });
              this.isChange = false
              this.$Message.success('保存成功！');
            } else {
              console.log('数据加载失败');
            }
          });
        } else { // 修改 or 提交
          this.service.common.objectSave(formdata).then((res) => {
            this.loading = false
            if (res.data.code === 0) {
              if (type === 'submit') {
                // 提交接口
                const formdata2 = new FormData();
                formdata2.append('table', this.tableName);
                formdata2.append('objid', this.ID);
                this.service.common.objectSubmit(formdata2).then((res) => {
                  if (res.data.code === 0) {
                    this.$Message.success('提交成功！');
                    this.isChange = false
                    this.refresh()
                  } else {
                    console.log('数据加载失败');
                  }
                });
              } else {
                this.$Message.success('保存成功！');
                this.isChange = false
                this.refresh()
              }
            } else {
              console.log('数据加载失败');
            }
          });
        }

      }
      if (type === 'submit') { // 提交
        this.$confirm('确认执行提交？', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          confirmButtonClass: '',
          customClass: 'warning-alert',
          type: 'warning'
        }).then(() => {
          submitCommonFun()
        });
      } else {
        submitCommonFun()
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
          this.formConfig1 = {
            formData: [],
            formValue: {},
            ruleValidate: {}
          }

          this.detailsData = {
            info: addcolums[0],
            log: addcolums[1],
          }
          // 基本信息赋值
          this.formCommonFun('formConfig1', addcolums[0].childs)
          // 日志赋值
          this.formCommonFun('formConfig4', addcolums[1].childs)


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

          this.getObject()

          this.getTab1FormData()
          this.getExclusiveStockData() // 独享库存明细
          setTimeout(() => {
            this.getTab2FormData()
            this.getSharedInventoryData() // 共享库存明细
          }, 500)

        } else {
          console.log('数据加载失败');
        }
      })
    },
    /**
     * 独享库存明细 表单的数据
     */
    getTab1FormData() {
      const formdata = new FormData();
      formdata.append('table', this.tab1tableName);
      formdata.append('inlinemode', 'Y');
      this.service.common.inputForitem(formdata).then((res) => {
        if (res.data.code === 0) {
          this.formConfig2 = {
            formData: [],
            formValue: {},
            ruleValidate: {}
          }
          const inpubobj = res.data.data.inpubobj
          this.$nextTick(() => {
            this.formCommonFun('formConfig2', inpubobj)
          });
        } else {
          console.log('数据加载失败');
        }
      });
    },
    /**
     * 独享库存明细 表单的数据
     */
    getTab2FormData() {
      const formdata = new FormData();
      formdata.append('table', this.tab2tableName);
      formdata.append('inlinemode', 'Y');
      this.service.common.inputForitem(formdata).then((res) => {
        if (res.data.code === 0) {
          this.formConfig3 = {
            formData: [],
            formValue: {},
            ruleValidate: {}
          }
          const inpubobj = res.data.data.inpubobj
          this.$nextTick(() => {
            this.formCommonFun('formConfig3', inpubobj)
          });
        } else {
          console.log('数据加载失败');
        }
      });
    },

    // 独享库存 分页change 事件
    pageChange1(val) {
      this.exclusiveStockPage.current = val;
      this.getExclusiveStockData() // 更新表格数据 - 独享库存
    },
    // 独享库存 切换分页条数
    pageSizeChange1(val) {
      this.exclusiveStockPage.pageSize = val;
      this.getExclusiveStockData() // 更新表格数据 - 独享库存
    },
    // 共享库存 分页change 事件
    pageChange2(val) {
      this.shareBaseInfoPage.current = val;
      this.getSharedInventoryData() // 更新表格数据 - 共享库存
    },
    // 共享库存 切换分页条数
    pageSizeChange2(val) {
      this.shareBaseInfoPage.pageSize = val;
      this.getSharedInventoryData() // 更新表格数据 - 共享库存
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
        startindex: (this.exclusiveStockPage.current - 1) * this.exclusiveStockPage.pageSize, // 起始下标
        column_include_uicontroller: true,
        range: this.exclusiveStockPage.pageSize
      };
      if (Object.keys(fixedcolumns).length) {
        searchdata.fixedcolumns = fixedcolumns
      }
      formdata.append('table', this.tab1tableName);
      formdata.append('objid', this.ID);
      formdata.append('refcolid', this.table1Refcolid);
      formdata.append('searchdata', JSON.stringify(searchdata));
      this.table1Loading = true
      this.service.common.objectTableItem(formdata).then(res => {
        if (res.data.code === 0) {
          const datas = res.data.datas
          this.loading = false
          this.table1Loading = false
          this.exclusiveStockPage.total = datas.totalRowCount
          this.exclusiveStockPage.tabname = datas.tabname
          // 表头和表格数据
          const showTable = this.setTableData(datas, true, true, (element) => {
            if (element.colname === 'SG_C_SA_STORE_ID') {
              return {
                width: 150,
                align: 'center',
                render: (h, params) => {
                  const row = params.row
                  const index = params.index
                  const SG_C_SA_STORE_ID = datas.row[index].SG_C_SA_STORE_ID
                  return h('div', [
                    h('i', {
                      class: 'iconfont iconbj_link',
                      style: {
                        fontSize: '12px',
                        color: '#0f8ee9',
                        cursor: 'pointer'
                      },
                      on: {
                        click: () => {
                          // 跳转页面
                          R3.store.commit('global/tabOpen', {
                            type: 'V',
                            tableName: SG_C_SA_STORE_ID.reftablename,
                            label: SG_C_SA_STORE_ID.reftabdesc,
                            tableId: SG_C_SA_STORE_ID.reftableid,
                            id: SG_C_SA_STORE_ID.refobjid,
                          });
                        }
                      }
                    }), row.SG_C_SA_STORE_ID
                  ]);
                }
              }
            } else if (element.colname === 'RATIO') {
              return {
                width: 150,
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
                          width: '150',
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
                            const newVal = e.target.value
                            if (oldVal !== newVal) {
                              this.addSubmit(params.row.ID, 'formConfig2', this.tab1tableName, 1, oldVal, newVal, true)
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
        } else {
          console.log('数据加载失败');
        }
      });
    },
    /**
     * 共享库存 表格数据
     */
    getSharedInventoryData() {
      const formdata = new FormData();
      const fixedcolumns = {}
      if (this.sharedInventoryFilterValue && this.sharedInventoryFilterInputValue) {
        fixedcolumns[`${this.sharedInventoryFilterValue}`] = this.sharedInventoryFilterInputValue
      }
      const searchdata = {
        startindex: (this.shareBaseInfoPage.current - 1) * this.shareBaseInfoPage.pageSize, // 起始下标
        column_include_uicontroller: true,
        range: this.shareBaseInfoPage.pageSize
      };
      if (Object.keys(fixedcolumns).length) {
        searchdata.fixedcolumns = fixedcolumns
      }
      formdata.append('table', this.tab2tableName);
      formdata.append('objid', this.ID);
      formdata.append('refcolid', this.table2Refcolid);
      formdata.append('searchdata', JSON.stringify(searchdata));
      this.table2Loading = true
      this.service.common.objectTableItem(formdata).then(res => {
        this.loading = false
        this.table2Loading = false
        const datas = res.data.datas
        if (res.data.code === 0) {
          this.shareBaseInfoPage.total = datas.totalRowCount
          this.shareBaseInfoPage.tabname = datas.tabname
          // 表头和表格数据
          const showTable = this.setTableData(datas, true, true, (element) => {
            if (element.colname === 'RATIO') {
              return {
                width: 150,
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
                          width: '150',
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
                            const newVal = e.target.value
                            if (oldVal !== newVal) {
                              this.addSubmit(params.row.ID, 'formConfig3', this.tab2tableName, 2, oldVal, newVal, true)
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
          this.sharedInventoryData = showTable.tbody
          this.sharedInventoryColumns = showTable.thead
          this.sharedInventoryFilterList = showTable.filterList
        } else {
          console.log('数据加载失败');
        }
      });
    },

    onOk() {
      $utils.tabCloseAppoint(this);
      this.$destroy(true);
      this.$store.commit('global/tabOpen', {
        tableId: 249230890,
        type: 'S',
        tableName: 'V_SG_C_CHANNEL_SKU_STRATEGY',
        back: true,
      });
    },
    // 返回
    back() {
      if (this.isChange) {
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
  },
};

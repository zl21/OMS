import { setFormDataFunMixin } from "@/assets/js/mixins/setFormData";
import { setTableDataMixin } from "@/assets/js/mixins/setTableData";
import { checkRuleFunMixin } from "@/assets/js/mixins/checkFormRule";

export default {
  components: {},
  mixins: [setFormDataFunMixin, setTableDataMixin, checkRuleFunMixin],
  data() {
    return {
      formConfig2Data: {}, // 判断条件数据 - 保存用
      formConfig3Data: {}, // 店铺数据 - 保存用
      multipleSelection1: [], // 表格选中的列表
      multipleSelection2: [], // 表格选中的列表
      tableColumn1: [], // 表格头部信息
      tableData1: [], // 表格数据
      tableColumn2: [], // 表格头部信息
      tableData2: [], // 表格数据
      status: null, //  1： 未提交,2：已提交,3：已作废,4:已结案
      ID: this.$route.params.customizedModuleId && this.$route.params.customizedModuleId !== 'New' ? this.$route.params.customizedModuleId : '-1', // 记录主界面传入的ID
      tableName: 'SG_C_SYNC_GRADIENT_STRATEGY',
      tab1tableName: '', // 待发布明细 的表名
      tab2tableName: '', // 已经发布明细 的表名
      table1Refcolid: '',
      table2Refcolid: '',
      isChange: false, // 记录是否修改
      loading: false,
      rightTableLoading: false,
      loading2: true,
      detailsData: {}, // 基本信息和日志的数据
      leftTableCurrRowId: null, // 左边表格默认行id

      // 独享库存的分页器
      pageObj1: {
        tabname: '',
        current: 1,
        pageSize: 10,
        total: 1,
        pageSizeOpts: [10, 20, 30, 50, 100],
      },
      collapse: ['panel_baseInfo'],
      formConfig1: {
        formData: [],
        formValue: {},
        ruleValidate: {}
      }, // 基本信息
      formConfig4: {
        formData: [],
        formValue: {},
      }, // 日志
      formConfig2: {
        formData: [],
        formValue: {},
        ruleValidate: {}
      }, // 条件明细
      formConfig3: {
        formData: [],
        formValue: {},
        ruleValidate: {}
      }, // 条件明细
    };
  },
  computed: {
    canEdit() {
      return this.isActive || this.ID === '-1'
    },
    btnConfig() {
      const btns = this.isActive ? [
        {
          text: '保存',
          size: '', // 按钮大小
          disabled: false, // 按钮禁用控制
          btnclick: () => {
            this.saveFun(1);
          },
        }
      ] : []
      const invalid = this.canEdit && this.ID !== '-1' ? [
        {
          text: '库存同步',
          size: '', // 按钮大小
          disabled: false, // 按钮禁用控制
          btnclick: () => {
            this.exeActionFun(41460518)
          },
        },
        {
          text: '作废',
          size: '', // 按钮大小
          disabled: false, // 按钮禁用控制
          btnclick: () => {
            this.deleteAuthority()
          },
        },
      ] : []
      const btnConfig = {
        typeAll: 'default',
        buttons: [
          ...btns,
          ...invalid,
          {
            text: window.vmI18n.t('btn.back'),
            btnclick: () => {
              this.back();
            },
          }
        ]

      }
      return btnConfig
    }
  },
  created() {
  },
  mounted() {
    this.refresh()
  },
  methods: {
    /**
     * 同步
     * @param actionid
     */
    exeActionFun(actionid) {
      const subParam = {
        table: this.tab1tableName,
        idArr: this.multipleSelection1
      }
      const param = {
        objid: this.ID,
        table: this.tableName,
        menu: "共享池库存梯度策略",
        subParam: subParam
      }
      const formdata = new FormData();
      formdata.append('actionid', actionid);
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
    refresh() {
      this.getObject()
      this.getObjectTab()
      if (this.ID !== '-1') {
        this.getLeftTableDetail()
      }
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
     * 高亮 class
     * @param row
     * @param index
     * @returns {string}
     */
    rowClassName(row, index) {
      if (this.leftTableCurrRowId === row.ID) {
        return 'ark-table-row-highlight';
      }
      return '';
    },
    /**
     * 保存
     * @param type (1:来自最上方的保存按钮 ,2:判断条件的保存，3：店铺的保存)
     */
    saveFun(type) {
      let isTrue = type === 1 || this.ID === '-1' ? this.checkRuleFun('formConfig1') : true
      if (isTrue) {
        let needAddObj = {
          condition: false, // 判断条件是否需要新增
          store: false, // 店铺是否需要新增
        }
        // 有一个已输入就要必填
        const commonFun = (formConfigName, needAddKey) => {
          for (let key in this[formConfigName].formValue) {
            if (this[formConfigName].formValue[key]) {
              needAddObj[needAddKey] = true
            }
          }
          this[`${formConfigName}Data`].forEach((item) => {
            item.isnotnull = needAddObj[needAddKey] // 是否必填更新
            const key = item.colname
            item.defval = this[formConfigName].formValue[key] // 填写了的数据回显
            item.valuedata = this[formConfigName].formValueName[key] // 填写了的数据回显 - popInput
          })
          this.formCommonFun(formConfigName, this[`${formConfigName}Data`], 12, true) // 但凡有一个项填写了数据，就要更新必填

        }

        commonFun('formConfig2', 'condition')
        const isTrue2 = type === 1 || type === 2 ? this.checkRuleFun('formConfig2') : true
        if (!isTrue2) {
          return
        }
        commonFun('formConfig3', 'store')
        const isTrue3 = type === 1 || type === 3 ? this.checkRuleFun('formConfig3') : true
        if (!isTrue3) {
          return
        }


        const params = {
          //主表
          SG_C_SYNC_GRADIENT_STRATEGY: {
            id: this.ID,  //主表id 判断新增还是修改
            // sgCSharePoolId: this.formConfig1.formValue.SG_C_SHARE_POOL_ID,  //共享池id 共享池梯度策略传，配销仓不传
            // remark: this.formConfig1.formValue.REMARK  //备注
          },
          //条件明细表
          SG_C_SYNC_GRADIENT_STRATEGY_COND: {
            id: -1,  //主表id  -1 代表左侧新增，有值代表右侧新增
            condtion: this.formConfig2.formValue.CONDTION || '',   //判断条件
            qtyBegin: this.formConfig2.formValue.QTY_BEGIN || '' //开始值
          },
          //店铺明细表
          SG_C_SYNC_GRADIENT_STRATEGY_ITEM: {
            id: -1,  //主表id 判断新增还是修改
            cpCShopId: this.formConfig3.formValue.CP_C_SHOP_ID || '',  //平台店铺id
            ratio: this.formConfig3.formValue.RATIO || ''   //比例
          }
        }

        //主表
        const keyObj = {
          SG_C_SHARE_POOL_ID: 'sgCSharePoolId',
          REMARK: 'remark',
        }

        // 组装数据 -  基础信息部分
        const assembleFun = (item, key, obj) => {
          if (item.colname === key) {
            const oldVal = item.isfk ? item.refobjid : item.valuedata
            let newVal = this[obj].formValue[key]
            // if (item.display.indexOf('DAT') !== -1) {
            //   newVal = $utils.dateFormat(new Date(this[obj].formValue[key]), 'yyyy-MM-dd hh:mm:ss')
            // }
            if (oldVal !== newVal && newVal) {
              params[this.tableName][keyObj[key]] = newVal
            }
          }
        }
        if (this.detailsData.info.childs) {
          this.detailsData.info.childs.forEach((item) => {
            for (let key in this.formConfig1.formValue) {
              assembleFun(item, key, 'formConfig1')
            }
          })
        }
        if (type === 3 || params.SG_C_SYNC_GRADIENT_STRATEGY_COND.condtion === '' || params.SG_C_SYNC_GRADIENT_STRATEGY_COND.qtyBegin === '') {
          delete params.SG_C_SYNC_GRADIENT_STRATEGY_COND
        }
        if (type === 2 || params.SG_C_SYNC_GRADIENT_STRATEGY_ITEM.cpCShopId === '' || params.SG_C_SYNC_GRADIENT_STRATEGY_ITEM.ratio === '') {
          delete params.SG_C_SYNC_GRADIENT_STRATEGY_ITEM
        }
        if ((type === 1 && !this.formConfig2.formValue.CONDTION && !this.formConfig2.formValue.QTY_BEGIN) || type === 3) {
          if (this.leftTableCurrRowId) {
            params.SG_C_SYNC_GRADIENT_STRATEGY_COND = {}
            params.SG_C_SYNC_GRADIENT_STRATEGY_COND.id = this.leftTableCurrRowId
          }
        }

        this.service.inventoryCenter.sgSyncGradientStrategyShareSave(params).then((res) => {
          if (res.data.code === 0) {
            if (this.ID === '-1') {
              this.$store.commit('customize/TabHref', {
                id: res.data.data, // id
                type: 'action', // 类型action
                name: 'SYNCGRADIENTSTRATEGY', // 文件名
                label: '共享池库存梯度策略', //  tab中文名
              });
            }
            this.$Message.success(window.vmI18n.t('modalTips.z9')); // '保存成功'
            this.ID = res.data.data
            this.getLeftTableDetail(true, type)
            // 保存成功后处理
            const reset = (formConfigName) => {
              this[`${formConfigName}Data`].forEach((item) => {
                item.isnotnull = false
                item.defval = ''
                item.valuedata = ''
              })
              this.$nextTick(() => {
                this.formCommonFun(formConfigName, this[`${formConfigName}Data`], 12) // 重置
                setTimeout(() => {
                  this.isChange = false
                  // 滚动到最下面
                  const scrollTopNum = document.getElementsByClassName('ark-table-row-highlight')[0].offsetTop
                  $('.ark-table-body').scrollTop(scrollTopNum)
                }, 1000)
              });
            }
            reset('formConfig2')
            reset('formConfig3')
          } else {
            // this.$Message.error(res.data.message);
          }

        })
      }
    },
    /**
     * 删除明细
     * @param multipleSelection
     * @param tableName
     * @param type
     */
    delFun2(multipleSelection, tableName, type) {
      if (!multipleSelection.length) {
        this.$Message.warning('请先选择需要删除的记录！');
        return
      }
      this.$confirm('确认执行删除?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        confirmButtonClass: '',
        customClass: 'warning-alert',
        type: 'warning'
      }).then(() => {
        const idArr = []
        multipleSelection.forEach((item) => {
          idArr.push(item.ID)
        })
        const params = {
          itemIds: idArr.join(','),
          mainId: this.ID
        }
        if (type === 1) {// 判断条件的删除
          this.service.inventoryCenter.SgSyncGradientStrategyCondItemDelete(params).then((res) => {
            if (res.data.code === 0) {
              this.$Message.success(res.data.message || '删除成功！');
              this.$nextTick(() => {
                this.getLeftTableDetail()
              });
            } else {
              console.log('数据加载失败');
            }
          })
        } else if (type === 2) { // 店铺的删除
          this.service.inventoryCenter.SgSyncGradientStrategyShopItemDelete(params).then((res) => {
            if (res.data.code === 0) {
              this.$Message.success(res.data.message || '删除成功！');
              this.$nextTick(() => {
                this.getRightTableDetail()
              });
            } else {
              console.log('数据加载失败');
            }
          })
        }

      });

    },
    /**
     * 删除明细 - 元数据的删除
     * @param multipleSelection
     * @param tableName
     * @param delType
     */
    delFun(multipleSelection, tableName) {
      if (!multipleSelection.length) {
        this.$Message.warning('请先选择需要删除的记录！');
        return
      }
      this.$confirm('确认执行删除?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        confirmButtonClass: '',
        customClass: 'warning-alert',
        type: 'warning'
      }).then(() => {
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
            this.getObjectTab()
          } else {
            console.log('数据加载失败');
          }
        })
      });

    },
    // 分页change 事件
    pageChange1(val) {
      this.pageObj1.current = val;
      this.getRightTableDetail()
    },
    // 独享库存 切换分页条数
    pageSizeChange1(val) {
      this.pageObj1.pageSize = val;
      this.getRightTableDetail()
    },
    /**
     * 条件明细 表单的数据
     * @param table
     * @param formConfigName
     * @param require
     */
    inputForitem(table, formConfigName, require = false) {
      const formdata = new FormData();
      formdata.append('table', table);
      formdata.append('inlinemode', 'Y');
      this.service.common.inputForitem(formdata).then((res) => {
        if (res.data.code === 0) {
          const inpubobj = res.data.data.inpubobj
          this[`${formConfigName}Data`] = inpubobj
          const typeObj = {
            CONDTION: 2,
            QTY_BEGIN: 2,
            CP_C_SHOP_ID: 3,
            RATIO: 3,
          }
          inpubobj.forEach((item) => {
            const type = typeObj[item.colname]
            item.onEnter = (val) => { // 添加回车事件
              this.saveFun(type)
            }
            // if (item.fkdisplay) {
            //   const customParams = {precolnameslist: [{iswrite: true, refcol: 'ID', premtype: 'SG_C_SHARE_POOL_ID'}]}
            //   item.autoRequest = customParams
            //   item.tableRequest = customParams
            // }
          })
          this.$nextTick(() => {
            this.formCommonFun(formConfigName, inpubobj, 12, require)
          });
        } else {
          console.log('数据加载失败');
        }
      });
    },
    getObjectTab() {
      this.loading2 = true
      const formdata = new FormData();
      formdata.append('table', this.tableName);
      formdata.append('objid', this.ID);
      formdata.append('ismaintable', 'y');
      this.service.inventoryCenter.objectTab(formdata).then(res => {
        this.loading2 = false
        if (res.data.code === 0) {
          const reftabs = res.data.data.reftabs
          this.tab1tableName = reftabs[0].tablename
          this.tab2tableName = reftabs[1].tablename
          this.table1Refcolid = reftabs[0].refcolid
          this.table2Refcolid = reftabs[1].refcolid
          this.inputForitem(this.tab1tableName, 'formConfig2') // 判断条件 表单
          setTimeout(() => {
            this.inputForitem(this.tab2tableName, 'formConfig3') // 店铺 表单
          }, 500)
          // 右侧店铺的详情
        } else {
          console.log('数据加载失败');
        }
      })
    },
    /**
     * 左侧表格行点击事件
     * @param row
     */
    onCurrentChange(row) {
      this.leftTableCurrRowId = row.ID
      this.getRightTableDetail()
    },
    /**
     * 左侧条件判断的表格数据 -  详情
     * @param newAdd 是否来自保存更新
     * @param type
     */
    getLeftTableDetail(newAdd, type) {
      this.loading = true
      this.service.inventoryCenter.sgSyncGradientStrategyShareQueryById({
        id: this.ID
      }).then((res) => {
        this.loading = false
        if (res.data.code === 0) {
          let datas = []
          if (res.data.data) {
            datas = res.data.data.condItemResults || []
          }
          const row = []
          const tabth = []
          const tittleName = {
            CONDTION: '判断条件',
            QTYBEGIN: '开始值',
          } // 表头中文名
          datas.forEach((item) => {
            const obj = {}
            row.push(obj)
            for (let key in item) {
              const upCaseKey = key.toUpperCase()
              obj[upCaseKey] = {val: item[key]}
            }
          })
          for (let key in datas[0]) {
            const upCaseKey = key.toUpperCase()
            tabth.push({
              colname: upCaseKey,
              name: tittleName[upCaseKey]
            })
          }
          // 表头和表格数据
          const showTable = this.setTableData({row, tabth}, true, true, null);
          this.tableData1 = showTable.tbody
          this.tableColumn1 = datas.length ? showTable.thead : []
          if (this.leftTableCurrRowId === null) {
            this.leftTableCurrRowId = this.tableData1[0].ID
          } else if ((newAdd && type !== 3) || !newAdd) {
            this.leftTableCurrRowId = this.tableData1.length ? this.tableData1[this.tableData1.length - 1].ID : null
          }
          this.$nextTick(() => {
            this.getRightTableDetail()
          });
        } else {
          console.log('数据加载失败');
        }
      })
    },
    /**
     *  右侧店铺的表格数据 -  详情
     */
    getRightTableDetail() {
      if (!this.leftTableCurrRowId) {
        this.tableData2 = []
        this.tableColumn2 = []
        return
      }
      this.rightTableLoading = true
      this.service.inventoryCenter.SgSyncGradientStrategyItemQuery({
        sgCSyncGradientStrategyId: this.ID, //配销仓/共享池库存梯度策略主表id
        sgCSyncGradientStrategyCondId: this.leftTableCurrRowId,  //库存梯度策略条件明细id
        pageSize: this.pageObj1.pageSize, //分页大小
        pageNumber: this.pageObj1.current  //页码
      }).then((res) => {
        this.rightTableLoading = false
        if (res.data.code === 0) {
          let datas = []
          if (res.data.data) {
            this.pageObj1.total = res.data.data.total || 0
            datas = res.data.data.list
          }
          const row = []
          const tabth = []
          const tittleName = {
            CPCSHOPTITLE: '店铺',
            RATIO: '同步比例',
          } // 表头中文名
          datas.forEach((item) => {
            const obj = {}
            row.push(obj)
            for (let key in item) {
              const upCaseKey = key.toUpperCase()
              obj[upCaseKey] = {val: item[key]}
            }
          })
          for (let key in datas[0]) {
            const upCaseKey = key.toUpperCase()
            tabth.push({
              colname: upCaseKey,
              name: tittleName[upCaseKey]
            })
          }
          // 表头和表格数据
          const showTable = this.setTableData({row, tabth}, true, true, null);
          this.tableData2 = showTable.tbody
          this.tableColumn2 = datas.length ? showTable.thead : []
        } else {
          console.log('数据加载失败');
        }
      })
    },
    getObject() {
      this.loading = true
      const formdata = new FormData();
      formdata.append('table', this.tableName);
      formdata.append('objid', this.ID);
      this.service.common.getObject(formdata).then(res => {
        this.loading = false
        if (res.data.code === 0) {
          const addcolums = res.data.data.addcolums
          this.detailsData = {
            info: addcolums[0],
            log: addcolums[1],
          }
          // pop 下拉组件添加入参
          const mesArr = addcolums[0].childs || []
          mesArr.forEach((item) => {
            if (item.fkdisplay) {
              const customParams = {precolnameslist: [{iswrite: true, refcol: 'ID', premtype: 'SG_C_SHARE_POOL_ID'}]}
              item.autoRequest = customParams
              item.tableRequest = customParams
            }
          })
          // 基本信息赋值
          this.formCommonFun('formConfig1', mesArr)
          this.formCommonFun('formConfig4', addcolums[1].childs)
        } else {
          console.log('数据加载失败');
        }
      });
    },
    onOk() {
      /*this.$comUtils.tabCloseAppoint(this);
      this.$store.commit('customize/TabHref', {
        id: 41460474, // id
        type: 'action', // 类型action
        name: 'SYNCGRADIENTSTRATEGYLIST', // 文件名
        label: '共享池库存梯度策略', //  tab中文名
      });
      this.$destroy();*/
      $utils.tabCloseAppoint(this);
      this.$destroy(true);
      this.$store.commit('global/tabOpen', {
        tableId: 249231068,
        type: 'S',
        tableName: 'V_SG_C_SYNC_GRADIENT_STRATEGY',//this.tableName,
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
  destroyed() {
  }
};

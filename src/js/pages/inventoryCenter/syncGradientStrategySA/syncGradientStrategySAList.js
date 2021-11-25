import actionForm from '@/commonPages/AutoForm/actionForm';
import { isFavoriteMixin } from "@/assets/js/mixins/isFavorite";
import { setActionFormMixin } from "@/assets/js/mixins/setActionFormData";

export default {
  components: {
    actionForm,
  },
  mixins: [isFavoriteMixin, setActionFormMixin],
  data() {
    return {
      tableName: 'SG_C_SYNC_GRADIENT_STRATEGY_SA',
      n: 'field',
      customizedModuleName: this.$route.params.customizedModuleName,
      customizedModuleId: this.$route.params.customizedModuleId,
      agTableConfig: {
        isIndex: false,
        agLoading: false,
        columnDefs: [
          {field: "sgCSaStoreEname", headerName: "配销仓"},
          {field: "condtion", headerName: "判断条件"},
          {field: "qtyBegin", headerName: "开始值"},
          {field: "cpCShopTitle", headerName: "店铺"},
          {field: "ratio", headerName: "同步比例"},
          {field: "ownerename", headerName: "创建人"},
          {field: "creationdate", headerName: "创建时间"},
          {field: "modifierename", headerName: "修改人"},
          {field: "modifieddate", headerName: "修改时间"},
        ], // 表头
        rowData: [],
        renderArr: {}, // 表格内处理
        tableHeight: '560px',
        pagenation: $utils.pageConfig
      },
      selection: [],
      formConfig: {
        formData: [],
        formValue: {},
        ruleValidate: {}
      },
    };
  },
  watch: {},
  computed: {
    // formConfig2(){
    //   return {
    //     formData: [
    //       {
    //         colname: 'SG_C_SA_STORE_ID',
    //         style: 'popInput', // 输入框弹框单多选
    //         width: '6',
    //         itemdata: {
    //           autoRequest: {precolnameslist: [{iswrite: false, refcol: 'ID', premtype: 'SG_C_SA_STORE_ID'}]},
    //           tableRequest: {precolnameslist: [{iswrite: false, refcol: 'ID', premtype: 'SG_C_SA_STORE_ID'}]},
    //           col: 1,
    //           colid: 1700826714, // 当前字段的ID
    //           colname: 'SG_C_SA_STORE_ID', // 当前字段的名称
    //           datelimit: 'all',
    //           display: 'text', // 显示什么类型，例如xml表示弹窗多选加导入功能，mrp表示下拉多选
    //           fkdisplay: 'mrp', // 外键关联类型
    //           fkdesc: '配销仓',
    //           inputname: 'SG_C_SA_STORE_ID:ENAME', // 这个是做中文类型的模糊查询字段，例如ENAME
    //           isfk: true, // 是否有fk键
    //           isnotnull: false, // 是否必填
    //           isuppercase: false, // 是否转大写
    //           length: 20, // 最大长度是多少
    //           name: '配销仓',
    //           readonly: false, // 是否可编辑，对应input   readonly属性
    //           reftable: 'SG_C_SA_STORE', // 对应的表
    //           reftableid: 249230796, // 对应的表ID
    //           row: 1,
    //           statsize: -1,
    //           type: 'STRING', // 这个是后台用的
    //           valuedata: '', // 这个是选择的值
    //           pid: ''
    //         },
    //         oneObj: e => {
    //           this.formConfig.formValue.SG_C_SA_STORE_ID = e.pid;
    //         }
    //       },
    //     ],
    //     formValue: {
    //       SG_C_SA_STORE_ID: [],
    //     }
    //   }
    // },
    btnConfig() {
      return {
        typeAll: 'default',
        buttons: [
          {
            webname: 'lookup_dianchangpingfen',
            type: 'posdefault',
            text: window.vmI18n.t('btn.find'), // 查找
            btnclick: () => {
              this.getTableData();
            }
          },
          {
            webname: 'Newlyadded_dianchangpingfen',
            type: 'default',
            text: window.vmI18n.t('btn.add'), // 新增
            btnclick: () => {
              $utils.tabCloseAppoint(this);
              this.$store.commit('customize/TabHref', {
                id: 'New', // id
                type: 'action', // 类型action
                name: 'SYNCGRADIENTSTRATEGYSA', // 文件名
                label: '配销仓库存梯度策略', //  tab中文名
              });
              this.$destroy();
            }
          },
          // {
          //   webname: 'del_dianchangpingfen',
          //   type: 'default',
          //   text: window.vmI18n.t('btn.delete'), // 删除
          //   btnclick: () => {
          //     this.delFun()
          //   }
          // },
          // {
          //   text: '库存同步',
          //   btnclick: () => {
          //   },
          // },
          {
            webname: 'import_dianchangpingfen',
            text: window.vmI18n.t('btn.import'), // 导入
            btnclick: () => {
            },
          },
          {
            text: window.vmI18n.t('btn.export'), // 导出
            btnclick: () => {
              // this.exportClick();
              this.exportClick2()
            },
          },
          {
            icon: `iconfont ${this.isFavorite ? 'iconbj_alrcol' : 'iconbj_col'} font-size-12`, // 按钮图标
            size: 'small', // 按钮大小
            name: window.vmI18n.t('btn.collection'), // 收藏
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              this.setFavorite2();
            } // 按钮点击事件
          }

        ]

      }
    }
  },
  mounted() {
    this.getSearchFormData()
    this.getTableData()
  },
  activated() {
    this.agTableConfig.pagenation.current = 1;
    // 计算高度 通过设置节点 'totalHeight'
    $utils.setTableHeight(this, 165);
    // 检测屏幕变化 设置高度 重新渲染agTabe
    $utils.onresizes(this, 0);
  },
  methods: {
    /**
     * 查询区域动态数据获取
     */
    getSearchFormData() {
      const formData = new FormData();
      formData.append('table', 'V_SG_C_SYNC_GRADIENT_STRATEGY_SA');
      formData.append('getcmd', 'y');
      this.service.common.getTableQuery(formData).then((res) => {
        if (res.data.code === 0) {
          const dataarry = res.data.datas.dataarry || []
          this.actionFormCommonFun('formConfig', dataarry)
        }
      });
    },
    /**
     * 导出
     * @param tableName
     * @param multipleSelection
     * @param objectIds
     * @param menu
     * @param isExport
     * @param type
     * tab1tableName,multipleSelection1,table1Refcolid,`${tabArr[0].tabledesc}`,isExport1,1
     */
    exportClick2(tableName, multipleSelection, objectIds, menu, isExport, type) {
      this.selection = this.$refs.agGridChild.AGTABLE.getSelect()
      if (this[isExport]) {
        // 有一项导出正在进行中
        this.$Message.error(window.vmI18n.t('modalTips.f8'));
        return;
      }
      this[isExport] = true;
      const idArr = this.selection.map(item => item.id);
      const formdata = new FormData();
      const searchdata = {
        table: this.tableName,
        column_include_uicontroller: true,
        fixedcolumns: {ID: idArr.length ? idArr : null},
        isolr: false,
        startindex: 0,
        range: 100
      }
      formdata.append('searchdata', JSON.stringify(searchdata));
      formdata.append('menu', '配销仓库存梯度策略');
      formdata.append('filename', '配销仓库存梯度策略');
      formdata.append('filetype', '.xlsx');
      formdata.append('showColumnName', true);

      this.service.orderCenter.exportChannel(formdata).then(res => {
        this[isExport] = false;
        if (res.data.code == 0) {
          const data = res.data.data
          if (data !== null) {
            // 取消选择
            this.$refs.agGridChild.AGTABLE.deselectAll();
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
    delFun() {
      const storeId = []
      const selectArr = this.$refs.agGridChild.AGTABLE.getSelect()
      if (selectArr.length) {
        selectArr.forEach((item) => {
          storeId.push(item.storeId)
        })
        const fromdata = new FormData();
        fromdata.append('phyWarehouseId', storeId.join(','));
        this.service.inventoryCenter.deleteByStoreIds(fromdata).then((res) => {
          if (res.data.code === 0) {
            this.$Message.success(window.vmI18n.t('modalTips.ay')); // '删除成功'
            this.getTableData()
          }
        })
      }
    },
    getExtendObj() {
      return {
        getRowStyle(params) {
          // 设置行样式
          if (params.data.isactive === 'N') {
            return {color: '#999', fontStyle: 'italic'};
          }

        }
      };
    },
    /**
     * 获取表单数据
     */
    getTableData() {
      this.selection = [];
      this.agTableConfig.agLoading = true;
      const params = {
        pageNumber: this.agTableConfig.pagenation.current, // 起始下标
        pageSize: this.agTableConfig.pagenation.pageSize,
      }
      // 查询区域的入参
      const val = this.formConfig.formValue
      for (let key in val) {
        if (typeof val[key] === 'boolean') { // 布尔值
          params[key] = val[key]
        } else if (Array.isArray(val[key]) && val[key].length) { // 数组 （pop下拉框的只要ID）
          if (val[key][0] && val[key][0].ID) {
            const arr = []
            val[key].forEach((item) => {
              arr.push(item.ID)
            })
            params[key] = arr
          } else {
            params[key] = val[key]
          }
        } else if (typeof val[key] === 'string' && val[key] !== '') { // 字符串
          params[key] = val[key]
        } else if (Object.prototype.toString.call(val[key]) === '[object Object]' && Object.keys(val[key]).length) { // 对象
          params[key] = val[key]
        }
      }
      this.service.inventoryCenter.SgSyncGradientStrategySaQueryList(params).then((res) => {
        this.agTableConfig.agLoading = false;
        if (res.data.code === 0) {
          if (res.data.data) {
            const data = res.data.data.list || []
            this.agTableConfig.pagenation.total = res.data.data.total;
            this.agTableConfig.rowData = data
            this.$refs.agGridChild.agGridTable(this.agTableConfig.columnDefs, this.agTableConfig.rowData, this.getExtendObj());
          }
        }

      })
    },

    // 单击某二行时触发
    onRowDblclick(row) {
      $utils.tabCloseAppoint(this);
      this.$store.commit('customize/TabHref', {
        id: row.id, // id
        type: 'action', // 类型action
        name: 'SYNCGRADIENTSTRATEGYSA', // 文件名
        label: '配销仓库存梯度策略', //  tab中文名
      });
      this.$destroy();
    },
    // 分页change 事件
    pageChange(val) {
      this.agTableConfig.pagenation.current = val;
      this.getTableData();
    },
    // 切换分页条数
    pageSizeChange(val) {
      this.agTableConfig.pagenation.pageSize = val;
      this.getTableData();
    },
  }
};

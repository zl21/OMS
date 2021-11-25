import isFavoriteMixin from "@/assets/js/mixins/isFavorite";
import R3 from "@syman/burgeon-r3";
import BC from 'burgeonComponents'

export default {
  components: {},
  mixins: [isFavoriteMixin],
  data() {
    return {
      importTable: {
        refFuns: 'confirmFun',
        confirmTitle: '条件信息导入',
        titleAlign: 'center', // 设置标题是否居中 center left
        width: '600',
        scrollable: false, // 是否可以滚动
        closable: true, // 是否可以按esc关闭
        draggable: true, // 是否可以拖动
        mask: true, // 是否显示遮罩层
        maskClosable: true, // 是否可以点击叉号关闭
        transfer: true, // 是否将弹层放在body内
        name: 'importTable', // 组件名称
        url: BC.Components.ImportTable,
        keepAlive: true,
        excludeString: 'importTable', // 将name传进去，确认不缓存
        componentData: {},
      },
      options: {
        datas: {},     //南京框架增加的配置,datas必须存在
        floatingFilter: true      //关掉表格浮动过滤器 agTable原生配置
      },
      n: 'field',
      customizedModuleName: this.$route.params.customizedModuleName,
      customizedModuleId: this.$route.params.customizedModuleId,
      agTableConfig: {
        isIndex: false,
        agLoading: false,
        pageShow: true,
        columnDefs: [], // 表头
        rowData: [],
        renderArr: {}, // 表格内处理
        tableHeight: '560px',
        pagenation: $utils.pageConfig
      },
      selection: [],
      formConfig: {
        formData: [
          {
            colname: 'CP_C_PHY_WAREHOUSE_ID',
            style: 'popInput', // 输入框弹框单多选
            width: '6',
            itemdata: {
              col: 1,
              colid: 1700825948, // 当前字段的ID
              colname: 'CP_C_PHY_WAREHOUSE_ID', // 当前字段的名称
              datelimit: 'all',
              display: 'text', // 显示什么类型，例如xml表示弹窗多选加导入功能，mrp表示下拉多选
              fkdisplay: 'mrp', // 外键关联类型
              fkdesc: '实体店仓',
              inputname: 'CP_C_PHY_WAREHOUSE_ID:ENAME', // 这个是做中文类型的模糊查询字段，例如ENAME
              isfk: true, // 是否有fk键
              isnotnull: false, // 是否必填
              isuppercase: false, // 是否转大写
              length: 20, // 最大长度是多少
              name: '实体店仓',
              readonly: false, // 是否可编辑，对应input   readonly属性
              reftable: 'CP_C_PHY_WAREHOUSE', // 对应的表
              reftableid: 24486, // 对应的表ID
              row: 1,
              statsize: -1,
              type: 'STRING', // 这个是后台用的
              valuedata: '', // 这个是选择的值
              pid: ''
            },
            oneObj: e => {
              this.formConfig.formValue.CP_C_PHY_WAREHOUSE_ID = e.pid;
            }
          },
        ],
        formValue: {
          CP_C_PHY_WAREHOUSE_ID: [],
        }
      }, // 基本信息
    };
  },
  watch: {},
  computed: {
    btnConfig() {
      return {
        typeAll: 'default',
        buttons: [
          {
            webname: 'lookup_dianchangpingfen',
            type: 'posdefault',
            text: window.vmI18n.t('btn.find'), // 查找
            btnclick: () => {
              this.queryByPhyWarehouseId();
            }
          },
          {
            webname: 'Newlyadded_dianchangpingfen',
            type: 'default',
            text: window.vmI18n.t('btn.add'), // 新增
            btnclick: () => {
              this.$store.commit('customize/TabHref', {
                id: 'New', // id
                type: 'action', // 类型action
                name: 'STORESCORESTRATEGYDETAIL', // 文件名
                label: '店仓评分设置表', //  tab中文名
              });
            }
          },
          {
            webname: 'del_dianchangpingfen',
            type: 'default',
            text: window.vmI18n.t('btn.delete'), // 删除
            btnclick: () => {
              this.delFun()
            }
          },
          {
            webname: 'import_dianchangpingfen',
            text: window.vmI18n.t('btn.import'), // 导入
            btnclick: () => {
              this.importData()
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
    // this.$next
    this.queryShareScoreFactor();
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
     * 导入
     */
    importData() {
      const componentData = {
        isAction: false,
        tableName: 'SG_C_STORE_SCORE_STRATEGY',
        webname: 'import',
        tempApi: '/p/cs/downloadImportTemplate',
        tempMethod: 'get',
        tempParm: {
          searchdata: { table: "SG_C_STORE_SCORE_STRATEGY" }
        },
        okApi: '/p/cs/import',
        okParm: {
          table: 'SG_C_STORE_SCORE_STRATEGY',
          mainId: 249230897,
          menu: '店仓评分设置表',
          isUpdate: 'N',
          startRow: 2
        },
        downErrorInfo: false,
        showErrorInfo: true,
        returnData: (objid) => {
          const fromdata = new FormData();
          fromdata.append('table', 'CP_C_TASK');
          fromdata.append('objid', objid);
          this.service.common.getObject(fromdata).then((res) => {
            if (res.data.code === 0) {
              console.log(222, res.data)
              const data = res.data.data.addcolums[0].childs || []
              data.forEach((item) => {
                if (item.colname === 'CONTENT') {
                  this.$confirm(item.valuedata, '成功', {
                    confirmButtonText: '确定',
                    showCancelButton: false,
                    customClass: 'success-alert',
                    type: 'success'
                  });
                  const fromdata = new FormData();
                  fromdata.append('id', objid);
                  R3.network.post('/p/cs/ignoreMsg', fromdata);
                }
              })
            }
          });
        },
        importNotes: false,
        dontShowDownloadA: false,
      }
      this.importTable.componentData = componentData;
      this.$children.find((item) => item.name === 'importTable').openConfirm();
    },
    onSelectionChange(data) {
      this.selection = data;
    },
    delFun() {
      const storeId = []
      // const selectArr = this.$refs.agGridChild.AGTABLE.getSelect()
      const selectArr = this.selection;
      if (selectArr.length) {
        selectArr.forEach((item) => {
          storeId.push(item.storeId)
        })
        const fromdata = new FormData();
        fromdata.append('phyWarehouseId', storeId.join(','));
        this.service.inventoryCenter.deleteByStoreIds(fromdata).then((res) => {
          if (res.data.code === 0) {
            this.$Message.success(window.vmI18n.t('modalTips.ay')); // '删除成功'
            this.queryByPhyWarehouseId()
          }
        })
      }
    },
    /**
     * 获取表头数据
     */
    queryShareScoreFactor() {
      this.service.inventoryCenter.queryShareScoreFactor({}).then((res) => {
        if (res.data.code === 0) {
          const data = res.data.data
          const columnDefs = data.map((item) => {
            return {
              field: `${this.n}${item.ECODE}`,
              headerName: item.ENAME,
              tdAlign: 'left',
              isagfilter: true,
            }
          });
          columnDefs.unshift({
            field: "storeName",
            headerName: '实体店仓',
            tdAlign: 'left',
            isagfilter: true,
            // isorder: true,
            // sort:'asc' // 默认排序
          })
          columnDefs.unshift({
            "headerName": "序号",
            "width": 90,
            "field": "index",
            "sort": 10,
            checkboxSelection: true,
            pinned: 'left',
            headerClass: '',
            thAlign: 'left',
            tdAlign: 'left',
            cellStyle: { color: 'rgb(15, 142, 233)' },
          })
          columnDefs.push({
            field: "sumScore",
            headerName: '总计',
            tdAlign: 'left',
            isagfilter: true,
          })
          // 表头赋值
          this.agTableConfig.columnDefs = columnDefs
          // this.$refs.agGridChild.agGridTable(this.agTableConfig.columnDefs, this.agTableConfig.rowData);
          this.queryByPhyWarehouseId();
        }
      })
    },
    /**
     * 获取表单数据
     */
    queryByPhyWarehouseId() {
      this.selection = [];
      this.agTableConfig.agLoading = true;
      const params = {
        pageNumber: this.agTableConfig.pagenation.current, // 起始下标
        pageSize: this.agTableConfig.pagenation.pageSize,
      }
      // 查询数据
      const phyWarehouseIds = this.formConfig.formValue.CP_C_PHY_WAREHOUSE_ID
      if (phyWarehouseIds.length) {
        params.phyWarehouseIds = phyWarehouseIds.split(',')
      }
      this.service.inventoryCenter.queryByPhyWarehouseId(params).then((res) => {
        this.agTableConfig.agLoading = false;
        if (res.data.code === 0) {
          const rowData = []
          if (res.data.data) {
            const data = res.data.data.list
            const total = res.data.data.total
            data.forEach((obj, i) => {
              const newObj = {}
              for (let key in obj) {
                const val = obj[key]
                if (key === 'phyWarehouseInfo') {
                  newObj['storeName'] = val['cpPhyWarehouseEname']
                  newObj['storeId'] = val['cpPhyWarehouseId']
                }
                if (key === 'sumScore') {
                  newObj['sumScore'] = val
                }
                for (let key2 in val) {
                  if (key === 'scoreMap') {
                    newObj[`${this.n}${key2}`] = val[key2]
                  }
                }
              }
              newObj.index = ++i;
              newObj.ID = +new Date();
              rowData.push(newObj)
            })
            this.agTableConfig.pagenation.total = total;
          }
          // 表格赋值
          this.agTableConfig.rowData = rowData
          // this.$refs.agGridChild.agGridTable(this.agTableConfig.columnDefs, this.agTableConfig.rowData);
        }

      })
    },
    /**
     * 排序
     * @param event
     */
    onSortChange(event) {
      console.log(event)
      this.agTableConfig.pagenation.current = 1;
      this.queryByPhyWarehouseId()
    },
    // 单击某二行时触发
    onRowDblclick(row) {
      this.$store.commit('customize/TabHref', {
        id: row.storeId, // id
        type: 'action', // 类型action
        name: 'STORESCORESTRATEGYDETAIL', // 文件名
        label: '店仓评分设置表', //  tab中文名
      });
    },
    // 分页change 事件
    pageChange(val) {
      this.agTableConfig.pagenation.current = val;
      this.queryByPhyWarehouseId();
    },
    // 切换分页条数
    pageSizeChange(val) {
      this.agTableConfig.pagenation.pageSize = val;
      this.queryByPhyWarehouseId();
    },
  }
};

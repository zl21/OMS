import CustomTable from 'framework/components/table/customTable.vue';
import pageNation from 'framework/components/page/pagenation.vue';
import propSelect from '@/commonPages/AutoForm/propSelect';
import actionForm from '@/commonPages/AutoForm/actionForm';
import selectTag from '@/commonPages/AutoForm/selectTag'
import tableHeaderCustom from "allpages/inventoryCenter/channelStockControl/tableHeaderCustom.vue";

import {setFormDataFunMixin} from "@/assets/js/mixins/setFormData";
import {setActionFormMixin} from "@/assets/js/mixins/setActionFormData";
import dateUtil from "@/assets/js/__utils__/date";
import copy from 'copy-to-clipboard';

export default {
  mixins: [setFormDataFunMixin, setActionFormMixin],
  components: {
    selectTag,
    propSelect,
    actionForm,
    CustomTable,
    pageNation
  },
  data() {
    return {
      btnList: [],
      actionFunList: {
        // 下载全店在售库存
        downloadAllShopSaleStorage: () => {
          this.downloadAllShopSaleStorageFun()
        },
        // 下载平台商品
        itemDownload: () => {
          this.downDialogFun('下载平台商品')
        },
        // 下载平台库存
        platformInventory: () => {
          this.downDialogFun2('下载平台库存')
        },
        // 同步库存
        saveDevOpsInfo: () => {
          this.hasSelectionData(() => {
            this.dialogObj1.show = true
          })
        },
        // 是否转仓
        'channel/saveDevOpsInfo': () => {
          this.hasSelectionData(() => {
            this.dialogObj2.show = true
          })
        },
        // 修改商品类型
        updateBySaStoreType: () => {
          this.hasSelectionData(() => {
            this.modifyTypeDialogObjShow = true
          })
        },
        // 设定安全库存
        '/sg/channel/saveDevOpsInfo': () => {
          this.hasSelectionData(() => {
            this.dialogObj3.show = true
          })
        },
        // 全量库存同步
        'syncChannelStorage': () => {
          this.hasSelectionData(() => {
            this.$confirm(
              $it('tip.ky'), // 是否确定全量库存同步？
              $it('mT.warning'), {
              confirmButtonText: $it('com.determine'),/*确定*/
              cancelButtonText: $it('com.cancel'), /*取消*/
              confirmButtonClass: '',
              customClass: 'warning-alert',
              type: 'warning'
            }).then(() => {
              this.syncChannelStorageFun()
            });
          })
        },
        // 手动增量同步库存
        IncSyncStorage: () => {
          this.hasSelectionData(() => {
            this.debounceFun(() => {
              const itemList = []
              let allIsZere = true
              let allLessThanTen = true // 都大于10分钟
              this.multipleSelection.forEach((item) => {
                if (`${item.qtyDifferences}` !== '0') {
                  allIsZere = false
                }
                itemList.push({
                  id: item.id,
                  qtyInc: item.qtyDifferences, //差异数
                })

                // 平台库存下载时间 和 系统时间 判断
                const currentTime = item.currentTime // 服务器库时间 - 时间戳
                const currentTimeNum = currentTime ? currentTime : Date.parse(new Date()) // 服务器库时间 - 转时间戳
                const transTime = item.transTime // 平台库存下载时间 - 时间戳
                const differenceNum = Math.abs(currentTimeNum - transTime) / 1000 / 60
                if (differenceNum > 10) {
                  allLessThanTen = false // 只要存在一个大于10分钟的就提示
                }
              })
              if (allIsZere) {
                // 选中的都是0 时候不需要同步
                this.$Message.warning($it('tip.kz')); // 当前选中记录无差异数，无需同步 
              } else {
                if (allLessThanTen) {
                  // 所有的都小于10min：走之前逻辑
                  this.$confirm(
                    $it('tip.ie'), // 是否确认增量同步库存
                    $it('mT.warning'), {
                    confirmButtonText: $it('com.determine'),/*确定*/
                    cancelButtonText: $it('com.cancel'),
                    confirmButtonClass: '',
                    customClass: 'warning-alert',
                    type: 'warning'
                  }).then(() => {
                    this.incSyncStorageFun(itemList)
                  });
                } else {
                  // 只要存在一个大于的 就提示
                  this.$confirm(
                    $it('tip.if'), // 需要重新下载最新库存，不能产生增量同步
                    $it('mT.warning'), {
                    confirmButtonText: $it('btn.download'),/*下载*/
                    cancelButtonText: $it('com.cancel'),
                    confirmButtonClass: '',
                    customClass: 'warning-alert',
                    type: 'warning'
                  }).then(() => {
                    this.downDialogFun2()
                  });
                }
              }
            })
          })
        },
        // 修改同步比例
        checkSkuStorage: () => {
          this.hasSelectionData(() => {
            this.$confirm(
              $it('tip.ig'), // 是否确定修改同步比例？
              $it('mT.warning'), {
              confirmButtonText:$it('com.determine'),/*确定*/
              cancelButtonText: $it('com.cancel'),
              confirmButtonClass: '',
              customClass: 'warning-alert',
              type: 'warning'
            }).then(() => {
              this.dialogObj4.show = true
            });
          })
        },
        download: () => { // 导出
          this.exportFun()
        },
      },
      agTableConfig: {
        gridApi: {},
        columnApi: {},
        columnDefs: [
          // {
          //   headerName: "序号",
          //   // valueGetter: 'parseInt(node.rowIndex) + 1',
          //   valueGetter: (params) => {
          //     console.log(3222, params)
          //     debugger
          //   },
          //   checkboxSelection: true,
          //   pinned: 'left',
          //   headerClass: '',
          //   thAlign: 'left',
          //   tdAlign: 'left',
          //   cellStyle: {color: 'rgb(15, 142, 233)'},
          // },
          {
            headerName: $it('tL.serialNo'), // 序号
            width: 90,
            field: "index",
            checkboxSelection: true,
            pinned: 'left',
            headerClass: '',
            thAlign: 'left',
            tdAlign: 'left',
            cellStyle: {color: 'rgb(15, 142, 233)'},
          },
          {
            headerName: $it('other.shop'), // 店铺
            field: 'cpCShopEname',
            tdAlign: 'left',
            isagfilter: true,
          },
          {
            headerName: $it('tL.a5'), // 平台商品
            field: 'numiid',
            width: 120,
            tdAlign: 'left',
            isagfilter: true,
          },
          {
            headerName: $it('fL.barCode'), // 条码
            field: 'psCSkuEcode',
            tdAlign: 'left',
            isagfilter: true,
          },
          {
            headerName: $it('tL.productNo'), // 商品编码
            field: 'psCProEcode',
            tdAlign: 'left',
            isagfilter: true,
          },
          {
            headerName: $it('btn.aa'), // 是否转仓
            field: 'istrans',
            tdAlign: 'left',
            isagfilter: true,
          },
          {
            headerName: $it('btn.a9'), // 同步库存
            field: 'islock',
            tdAlign: 'left',
            isagfilter: true,
          },
          {
            headerName: $it('tL.a6'), // 上架状态
            field: 'saleStatus',
            tdAlign: 'left',
            isagfilter: true,
          },
          {
            headerName: $it('fL.f6'), // 商品类型
            field: 'brandLabel',
            tdAlign: 'left',
            isagfilter: true,
          },
          {
            headerName: $it('tL.a7'), // 同步比例
            field: 'specialRadio',
            tdAlign: 'left',
            isagfilter: true,
          },
          {
            headerName: '店铺库存',
            field: 'qtyChannel',
            tdAlign: 'left',
            isagfilter: true,
            // isagfilter: true,
            headerComponentFramework: Vue.extend(tableHeaderCustom),
            headerComponentParams: {
              toolTipText: '中台系统当前店铺的库存'
            },
          },
          {
            headerName: '计算状态',
            field: 'calcStatus',
            tdAlign: 'left',
            isagfilter: true,
          },
          {
            headerName: '平台库存',
            field: 'qtyPlatform',
            tdAlign: 'left',
            isagfilter: true,
            headerComponentFramework: Vue.extend(tableHeaderCustom),
            headerComponentParams: {
              toolTipText: '线上平台当前店铺的库存'
            },
          },
          {
            headerName: $it('tL.a8'), // 平台库存下载时间
            field: 'transTime',
            tdAlign: 'left',
            isagfilter: true,
          },
          {
            headerName: `${$it('tL.a9')}(>=)`, // 差异数(>=)
            field: 'qtyDifferences',
            tdAlign: 'left',
            isagfilter: true,
            headerComponentFramework: Vue.extend(tableHeaderCustom),
            headerComponentParams: {
              toolTipText: '店铺库存 - 平台库存',
              sortable: true, // 是否显示排序按钮
              sortType: '', // 排序顺序
              setSortTypeFun: (column, colId) => { // 改变对应列的sortType值
                this.agTableConfig.columnDefs.forEach((item, index) => {
                  if (this.agTableConfig.columnDefs[index].field === colId) {
                    this.agTableConfig.columnDefs[index].headerComponentParams.sortType = column
                    this.getTable1Data({order: column})
                  }
                })
              },
            },
          },
          {
            headerName: '配销仓库存',
            field: 'qtyReal',
            tdAlign: 'left',
            isagfilter: true,
            headerComponentFramework: Vue.extend(tableHeaderCustom),
            headerComponentParams: {
              toolTipText: '供货配销仓的可用库存的合计'
            },
          },
          {
            headerName: '安全库存',
            field: 'qtySafety',
            tdAlign: 'left',
            isagfilter: true,
            headerComponentFramework: Vue.extend(tableHeaderCustom),
            headerComponentParams: {
              toolTipText: '店铺当前平台条码ID的保底量'
            },
          },
          {
            headerName: '最后同步数',
            field: 'finalSyncNum',
            tdAlign: 'left',
            isagfilter: true,
          },
          {
            headerName: '最后同步时间',
            field: 'finalSyncTime',
            tdAlign: 'left',
            isagfilter: true,
          },
          {
            headerName: '同步失败的原因',
            field: 'syncFailedReason',
            tdAlign: 'left',
            isagfilter: true,
          },
          {
            headerName: '同步状态',
            field: 'syncStatus',
            tdAlign: 'left',
            isagfilter: true,
          },
          {
            headerName: '平台条码',
            field: 'skuId',
            tdAlign: 'left',
            isagfilter: true,
          },
        ], // 表头
        rowData: [],
        renderArr: {}, // 表格内处理
        renderParams: (cellData) => {       //render表格渲染
          if (cellData.field === 'index') { // 序号
            return {
              renderContainer: 'CellRenderByFunction',
              renderComponent: (h, params) => {
                // 合计显示成了1所以前端加个判断 ，判断 params.value 是否有值
                return h('span', {}, params.value ? params.value : (this.page1.current - 1) * this.page1.pageSize + params.rowIndex + 1)
              }
            }
          } else if (cellData.field === 'istrans') { // 是否转仓
            return {
              renderContainer: 'CellRenderByFunction',
              renderComponent: (h, params) => {
                // return h('span', {}, params.row.istrans === 'Y' ? '是' : '否')
                let val = ''
                const data = params.row.istrans
                if (data === 'Y') {
                  val = $it('com.yes')
                } else if (data === 'N') {
                  val = $it('com.no')
                }
                return h('div', {}, val);
              }
            }
          } else if (cellData.field === 'islock') { // 同步库存
            return {
              renderContainer: 'CellRenderByFunction',
              renderComponent: (h, params) => {
                // return h('span', {}, params.row.islock === 'Y' ? '否' : '是') // 这个后端让取反
                let val = ''
                const data = params.row.islock
                if (data === 'Y') {
                  val = $it('com.no')
                } else if (data === 'N') {
                  val = $it('com.yes')
                }
                return h('div', {}, val);
              }
            }
          } else if (cellData.field === 'saleStatus') { // 上架状态
            return {
              renderContainer: 'CellRenderByFunction',
              renderComponent: (h, params) => {
                let limitdesc = ''
                const data = params.row.saleStatus
                this.saleStatusArr.forEach((item) => {
                  if (item.limitval === data) {
                    limitdesc = item.limitdesc
                  }
                })
                return h('div', {}, limitdesc);
              }
            }
          } else if (cellData.field === 'brandLabel') { // 商品类型
            return {
              renderContainer: 'CellRenderByFunction',
              renderComponent: (h, params) => {
                const arr = params.row.brandLabel ? params.row.brandLabel.split(',') : []
                const domArr = []
                const getTagName = (limitval) => {
                  let limitdesc = ''
                  this.brandLabelArr.forEach((item) => {
                    if (item.limitval === limitval) {
                      limitdesc = item.limitdesc
                    }
                  })
                  return limitdesc
                }
                arr.forEach((item) => {
                  domArr.push(h('li', {
                    class: 'flag width-20 height-20 line-height-20 pull-left color-white scale-point-8 font-size-14 text-center',
                    style: {
                      backgroundColor: this.tagColorObj[item],
                    },
                  }, getTagName(item).slice(0, 1)))
                })
                return h('ul', {class: 'clearfix'}, domArr);
              }
            }
          } else if (cellData.field === 'numiid') { // 平台商品
            return {
              renderContainer: 'CellRenderByFunction',
              renderComponent: (h, params) => {
                const rowData = this.data1[params.rowIndex]
                if (!rowData) {
                  return
                }
                const numiid = params.row.numiid
                const divDom = h('div', {}, numiid)
                const aDom = h('a', {
                  props: {
                    class: 'fs-14 cursor-pointer'
                  },
                  on: {
                    click: () => {
                      window.open(rowData.detailUrl);
                    }
                  }
                }, numiid)

                return rowData.detailUrl ? aDom : divDom; // 如果接口返回 "detailUrl" 需要跳转界面
              }
            }
          } else if (cellData.field === 'finalSyncTime') { // 最后同步时间
            return {
              renderContainer: 'CellRenderByFunction',
              renderComponent: (h, params) => {
                const finalSyncTime = params.row.finalSyncTime // 最后同步时间
                return h('div', {}, finalSyncTime ? this.formatDate(finalSyncTime) : '');
                /*  const currentTime = params.row.currentTime // 服务器库时间 - 时间戳
                  let value = ''
                  if (finalSyncTime) {
                    // 先时间格式化，接口返回的时间格式有点奇怪：2021-09-09T20:31:45.099
                    // const currentTimeFormal = this.formatDate(currentTime)
                    // 服务器库时间 - 转时间戳
                    const currentTimeNum = currentTime ? currentTime : Date.parse(new Date())
                    // 最后同步时间
                    const differenceNum = Math.abs(currentTimeNum - finalSyncTime) / 1000 / 60
                    // console.log(222, currentTimeNum, finalSyncTime, differenceNum)
                    if (differenceNum <= 1) {
                      value = '<=1min'
                    } else if (differenceNum <= 5) {
                      value = '<=5min'
                    } else if (differenceNum <= 10) {
                      value = '<=10min'
                    } else if (differenceNum <= 30) {
                      value = '<=30min'
                    } else if (differenceNum > 30) {
                      value = '>30min'
                    }
                  }
                   return h('div', {}, value);*/
              }
            }
          } else if (cellData.field === 'syncStatus') { // 同步状态
            return {
              renderContainer: 'CellRenderByFunction',
              renderComponent: (h, params) => {
                const obj = {
                  '0': '未同步',
                  '2': '同步成功',
                  '3': '同步失败',
                }
                const syncStatus = params.row.syncStatus // 同步状态
                return h('div', {}, obj[syncStatus] || '');
              }
            }
          } else if (cellData.field === 'calcStatus') { // 计算状态
            return {
              renderContainer: 'CellRenderByFunction',
              renderComponent: (h, params) => {
                const obj = {
                  '0': $it('fL.f4'), // 计算完成
                  '1': $it('fL.f5'), // 计算中
                }
                const calcStatus = params.row.calcStatus // 计算状态
                return h('div', {}, obj[calcStatus] || '');
              }
            }
          } else if (cellData.field === 'transTime') { // 平台库存下载时间
            return {
              renderContainer: 'CellRenderByFunction',
              renderComponent: (h, params) => {
                const transTime = params.row.transTime ? this.formatDate(params.row.transTime) : '' // 平台库存下载时间
                return h('div', {}, transTime);
              }
            }
          }
        },
      },
      tableTotal: [
        {
          index: $it('other.total'),
          qtyChannel: "0", // 店铺库存
          qtyPlatform: "0", // 平台库存
          qtyDifferences: "0", // 差异数
          qtyReal: "0", // 配销仓库存
        },
        // {
        //   index: "总计",
        //   qtyPlatform: "0"
        // }
      ],
      isExport: false,
      tableHeight: '', // 表格高度
      searchParams: {}, // 记录查询过得条件（不然分页时查询有问题）
      multipleSelection: [], // 表格选中的列表
      downDialogObjTittle: '', // 下载平台商品 弹窗标题
      downDialogObjShow: false, // 下载平台商品
      downDialogObjShow2: false, // 下载平台库存
      modifyTypeDialogObjShow: false, // 修改商品类型
      dialogObj1: {
        show: false,
        loading: false,
        formData: {islock: ''},
      }, //  同步库存
      dialogObj2: {
        show: false,
        loading: false,
        formData: {istrans: ''},
      }, // 是否转仓
      dialogObj3: {
        show: false,
        loading: false,
        formData: {qtySafety: ''},
      }, // 设定安全库存
      dialogObj4: {
        show: false,
        loading: false,
        formData: {ratio: ''},
      }, // 修改同步比例
      collapseShow: [], // 折叠面板
      transferInventoryForm: {
        qty: ''// 调入量
      },
      dialog1rule: {
        istrans: [
          {
            validator: (rule, value, callback) => {
              if (value === '') {
                const mes = '请输入调入量!'
                this.$Message.error(mes);
                callback(new Error(mes));
              } else {
                callback();
              }
            }, trigger: 'blur'
          }
        ]
      },
      ruleCustom: {
        qty: [
          {
            validator: (rule, value, callback) => {
              if (value === '') {
                const mes = '请输入调入量!'
                this.$Message.error(mes);
                callback(new Error(mes));
              } else {
                callback();
              }
            }, trigger: 'blur'
          }
        ]
      },
      showTransferInventory: false,// 调入库存 - 弹窗
      saleStatusArr: [], // 上下架的下拉框数据
      brandLabelArr: [], // 标签的下拉框数据
      leftLoading: false, // 左侧列表加载
      table1Loading: false, // 平台商品查询接口 - 加载
      table2Loading: false, // 配销仓 - 加载
      table3Loading: false, // 共享池 - 加载
      formConfig1: {
        formData: [],
        formValue: {},
      }, // 查询区域
      formConfig2: {
        loading: false,
        formData: [
          {
            displayType: "selectTag",
            multiple: false,
            clearable: true,
            columnName: "brandLabels",
            labelName: $it('fL.f6'), // 商品类型
            optionArr: [
              {
                label: $it('fL.ek'), // 活动
                value: "1"
              },
              {
                label: $it('other.common'), // 普通
                value: "2"
              }
            ],
            colorObj: {
              "1": "#670FDF",
              "2": "#A10000",
            },
            placeholder: "请选择商品类型"
          }
        ],
        formValue: {
          brandLabels: ''
        },
      },
      rightTableCurrRowId: null, // 右边表格默认行id - 渠道仓
      rightTableCurrRowData: null, // 右边表格默认行数据 - 渠道仓
      rightTable2CurrIndex: null, // 右边表格默认行索引 - 配销仓
      rightTable2CurrRowData: null, // 右边表格默认行数据 - 配销仓
      page: {
        startindex: 0,
        range: 60,
        total: 0
      },
      leftSearch: '', // 左侧搜索
      leftCheckValue: null, // 左侧选择的店铺
      leftCheckData: {}, // 左侧选择的店铺数据
      leftShopList: [], // 左侧列表数据
      expirationTime: 0, // 倒计时

      // searchForm: {
      //   aaa: [],
      //   bbb: ['y', 'h', 't'],
      //   ccc: 'Y',
      // }, // 查询区域

      page1: {
        tabname: '',
        current: 1,
        pageSize: 50,
        total: 1,
        pageSizeOpts: [50, 100, 150, 200, 2000],
      },
      page2: {
        tabname: '',
        current: 1,
        pageSize: 50,
        total: 1,
        pageSizeOpts: [50, 100, 150, 200, 2000],
      },
      data1: [],
      columns2: [
        {
          type: 'index',
          title: $it('tL.serialNo'), // 序号
          fixed: 'left',
          indexMethod: (row) => {
            return (this.page2.current - 1) * this.page2.pageSize + row._index + 1;
            ;
          },
          align: 'center'
        },
        {
          title: '来源配销仓',
          key: 'sgCSaStoreEname',
          fixed: true,
          width: 170,
          tooltip: true,
        },
        {
          title: '配销仓类型',
          key: 'type',
          render: (h, params) => {
            const obj = {
              '1': $it('fL.ek'), // 活动
              '2': $it('other.common'), // 普通
            }
            const type = params.row.type // 同步状态
            return h('div', {}, obj[type] || '');
          }
        },
        {
          title: '来源仓库存',
          key: 'qtyStorage'
        },
        {
          title: '占用数',
          key: 'qtyPreout'
        },
        {
          title: '可用数',
          key: 'qtyAvailable'
        },
        {
          title: $it('tL.a7'), // 同步比例
          key: 'ratio'
        },
        {
          title: $it('btn.a9'), // 同步库存
          key: 'qtysync'
        },
        {
          title: '来源聚合仓',
          key: 'sgCShareStoreEname',
          width: 170,
          tooltip: true,
        },
        {
          title: $it('tL.priority'), // 优先级
          key: 'priority'
        },
        {
          title: $it('tL.operation'), // 操作
          key: 'action',
          align: 'center',
          render: (h, params) => {
            return h('div', [
              /* h('Button', {
                 props: {
                   type: 'primary',
                   size: 'small'
                 },
                 style: {
                   marginRight: '5px'
                 },
                 on: {
                   click: () => {
                     // TODO 待老板提供页面原型 (还在开发中。。。)
                     this.$Message.warning('还在开发中。。。')
                   }
                 }
               }, '查看商品同步配置'),*/

              /*h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    // 跳转到 特殊条码按比例同步界面列表页面
                    this.modifyScaleFun(params.row)
                  }
                }
              }, '修改比例'),*/
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {},
                on: {
                  click: (row) => {
                    this.showTransferInventory = true
                    this.rightTable2CurrIndex = params.index
                    this.rightTable2CurrRowData = params.row
                  }
                }
              }, $it('btn.a8')) // 调入库存
            ]);
          }
        }

      ],
      data2: [],
      columns3: [
        {
          title: '来源共享池',
          key: 'sgCSharePoolEname',
          width: 170,
          tooltip: true,
        },
        {
          title: '可用数',
          key: 'qtyAvailable'
        },
        {
          title: $it('tL.a7'), // 同步比例
          key: 'ratio'
        },
        {
          title: $it('fL.synchronizedInventory'), // 同步库存数
          key: 'qtysync'
        },
        {
          title: $it('tL.priority'), // 优先级
          key: 'priority'
        },
        /*{
          title: '操作',
          key: 'action',
          align: 'center',
          render: (h, params) => {
            return h('div', [
              // h('Button', {
              //   props: {
              //     type: 'primary',
              //     size: 'small'
              //   },
              //   style: {
              //     marginRight: '5px'
              //   },
              //   on: {
              //     click: () => {
              //       this.show(params.index)
              //     }
              //   }
              // }, '查看商品同步配置'),
             /!* h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  // marginRight: '5px'
                },
                on: {
                  click: () => {
                    // 跳转到 特殊条码按比例同步界面列表页面
                    this.modifyScaleFun(params.row)
                  }
                }
              }, '修改比例')*!/
            ]);
          }
        }*/
      ],
      data3: [],

      natureStoreFormItems: [], // 查询区域
      downConfig: [
        {
          show: true,// 是否显示隐藏
          col: 1, // 列宽
          item: {
            soltName: 'shopSlot'// 店铺信息
          }
        },
        {
          col: 1, // 列宽
          item: {
            type: 'Input', // 组件类型
            required: false, // 是否必填
            field: 'numiid',
            label: $it('fL.commodityID'), // 商品ID
            props: {
              class: 'width-230',
              clearable: true,
              placeholder: '请输入平台商品ID',
              value: '',
              regularMessage: '请输入平台商品ID', // 报错提示
              regx: /^[0-9]*$/ // 校验规则
            }
          }
        },
        {
          col: 1, // 列宽
          item: {
            type: 'DatePicker', // 组件类型
            required: false, // 是否必填
            field: 'time',
            label: $it('tL.modificationTime'), // 修改时间
            props: {
              class: 'width-230',
              type: 'datetimerange',
              clearable: true,
              value: '',
              placeholder: '请选择修改时间',
              regularMessage: '请选择修改时间', // 报错提示
            }
          }
        },
      ],
      downConfig2: [
        {
          show: true,// 是否显示隐藏
          col: 1, // 列宽
          item: {
            soltName: 'shopSlot'// 店铺信息
          }
        },
        {
          col: 1, // 列宽
          item: {
            type: 'Input', // 组件类型
            required: true, // 是否必填
            field: 'numiid',
            label: $it('fL.commodityID'), // 商品ID
            props: {
              class: 'width-230',
              clearable: true,
              placeholder: '请输入平台商品ID',
              value: '',
              regularMessage: '请输入平台商品ID', // 报错提示
              regx: /^[0-9]*$/ // 校验规则
            }
          }
        }
      ]
    };
  },
  watch: {
    downDialogObjShow(v) {
      if (v) {
        let numiidArr = []
        this.multipleSelection.forEach((item) => {
          numiidArr.push(item.numiid)
        })
        numiidArr = Array.from(new Set(numiidArr))
        this.downConfig[1].item.props.value = numiidArr.length ? numiidArr.join(',') : ''
      }
    },
    downDialogObjShow2(v) {
      if (v) {
        let numiidArr = []
        this.multipleSelection.forEach((item) => {
          numiidArr.push(item.numiid)
        })
        numiidArr = Array.from(new Set(numiidArr))
        this.downConfig2[1].item.props.value = numiidArr.length ? numiidArr.join(',') : ''
      }
    },
    showTransferInventory(v) {
      if (!v) {
        this.transferInventoryForm.qty = ''
        this.rightTable2CurrIndex = null
        this.rightTable2CurrRowData = null
      }
    },
    modifyTypeDialogObjShow(v) {
      if (!v) {
        this.formConfig2.formValue.brandLabels = ''
      }
    },
    /**
     * 监听渠道仓改变事件
     */
    rightTableCurrRowId() {
      this.page2.current = 1
      this.getDevOpsInfoFun()
      this.getShareQueryDevOpsInfoFun()
    },
    /**
     * 用户ID
     */
    // userIdInfo(v) {
    //   if (v) {
    //     this.loadFun(11)
    //   }
    // }
  },
  computed: {
    numiidArr() {
      const numiidArr = []
      this.multipleSelection.forEach((item) => {
        numiidArr.push(item.numiid)
      })
      return numiidArr
    },
    btnConfig2() {
      const buttons = [
        {
          type: 'posdefault',
          text: $it('btn.query'), // 查询
          btnclick: () => {
            this.throttleFun(() => {
              this.searchFun(true)
            })
          }
        },
        {
          type: 'default',
          text: $it('btn.ae'), // 清空条件
          btnclick: () => {
            this.reset()
          }
        },
        ...this.btnList
      ]
      return {
        typeAll: 'default',
        buttons
      }
    },
    // 标签颜色
    tagColorObj() {
      let tagColorObj = {}
      this.formConfig1.formData.forEach((item) => {
        if (item.columnName === 'BRAND_LABEL') {
          tagColorObj = item.colorObj
        }
      })
      return tagColorObj
    },
    columns1() {
      const columns1 = [
        {
          type: 'selection',
          width: 35,
          align: 'center',
          fixed: 'left',
        },
        {
          type: 'index',
          key: 'index',
          title: $it('tL.serialNo'), // 序号
          fixed: 'left',
          indexMethod: (row) => {
            return (this.page1.current - 1) * this.page1.pageSize + row._index + 1;
            ;
          },
          align: 'center'
        },
        {
          title: $it('other.shop'), // 店铺
          fixed: 'left',
          key: 'cpCShopEname',
        },
        {
          title: $it('tL.a5'), // 平台商品
          key: 'numiid',
          tooltip: true,
          render: (h, params) => {
            const detailUrl = params.row.detailUrl
            const numiid = params.row.numiid
            const divDom = h('div', {}, numiid)
            const aDom = h('a', {
              props: {
                class: 'fs-14 cursor-pointer'
              },
              on: {
                click: () => {
                  window.open(detailUrl);
                }
              }
            }, numiid)

            return detailUrl ? aDom : divDom; // 如果接口返回 "detailUrl" 需要跳转界面
          }
        },
        {
          title: $it('fL.barCode'), // 条码
          key: 'psCSkuEcode',
        },
        {
          title: $it('tL.productNo'), // 商品编码
          key: 'psCProEcode',
        },
        {
          title: $it('btn.aa'), // 是否转仓
          key: 'istrans',
          align: 'center',
          slot: 'switch',
        },
        {
          title: $it('btn.a9'), // 同步库存
          key: 'islock',
          align: 'center',
          slot: 'islock',
        },
        {
          title: $it('tL.a6'), // 上架状态
          key: 'saleStatus',
          render: (h, params) => {
            let limitdesc = ''
            const data = params.row.saleStatus
            this.saleStatusArr.forEach((item) => {
              if (item.limitval === data) {
                limitdesc = item.limitdesc
              }
            })
            return h('div', {}, limitdesc);
          }
        },
        {
          title: $it('fL.f6'), // 商品类型
          key: 'brandLabel',
          width: 76,
          align: 'center',
          render: (h, params) => {
            const arr = params.row.brandLabel ? params.row.brandLabel.split(',') : []
            const domArr = []
            // brandLabelArr
            // tagColorObj
            const getTagName = (limitval) => {
              let limitdesc = ''
              this.brandLabelArr.forEach((item) => {
                if (item.limitval === limitval) {
                  limitdesc = item.limitdesc
                }
              })
              return limitdesc
            }
            arr.forEach((item) => {
              domArr.push(h('li', {
                class: 'flag width-20 height-20 line-height-20 pull-left color-white scale-point-8 font-size-14',
                style: {
                  backgroundColor: this.tagColorObj[item],
                },
              }, getTagName(item).slice(0, 1)))
            })
            return h('ul', {class: 'clearfix'}, domArr);
          }
        },
        // {
        //   title: '商家SKU',
        //   key: 'psCSkuEcode'
        // },
        {
          title: $it('tL.a7'), // 同步比例
          key: 'specialRadio'
        },
        {
          title: '店铺库存',
          key: 'qtyChannel',
          width: 80,
          renderHeader: (h, params) => {
            const column = params.column
            return h('div', {
              class: 'line-height-30 cursor-pointer',
              style: 'margin-right:-5px;'
            }, [
              h('Poptip', {
                props: {
                  transfer: true,
                  trigger: 'hover',
                  // title: 'Title',
                  content: '中台系统当前店铺的库存',
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
          }
        },
        {
          title: '计算状态',
          key: 'calcStatus', // 0 计算完成   1计算中
          render: (h, params) => {
            const obj = {
              '0': $it('fL.f4'), // 计算完成
              '1': $it('fL.f5'), // 计算中
            }
            const calcStatus = params.row.calcStatus // 计算状态
            return h('div', {}, obj[calcStatus] || '');
          }
        },
        {
          title: '平台库存',
          key: 'qtyPlatform',
          width: 80,
          renderHeader: (h, params) => {
            const column = params.column
            return h('div', {
              class: 'line-height-30 cursor-pointer',
              style: 'margin-right:-5px;'
            }, [
              h('Poptip', {
                props: {
                  transfer: true,
                  trigger: 'hover',
                  // title: 'Title',
                  content: '线上平台当前店铺的库存',
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
          }
        },
        {
          title: $it('tL.a8'), // 平台库存下载时间
          key: 'transTime',
          render: (h, params) => {
            const transTime = params.row.transTime ? this.formatDate(params.row.transTime) : '' // 平台库存下载时间
            return h('div', {}, transTime);
          }
        },
        {
          title: `${$it('tL.a9')}(>=)`, // 差异数(>=)
          key: 'qtyDifferences',
          width: 100,
          sortable: 'custom',
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
                  content: '店铺库存 - 平台库存',
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
          }
        },
        {
          title: '配销仓库存',
          width: 90,
          key: 'qtyReal',
          renderHeader: (h, params) => {
            const column = params.column
            return h('div', {
              class: 'line-height-30 cursor-pointer',
              style: 'margin-right:-5px;'
            }, [
              h('Poptip', {
                props: {
                  transfer: true,
                  trigger: 'hover',
                  // title: 'Title',
                  content: '供货配销仓的可用库存的合计',
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
          }
        },
        {
          title: '安全库存',
          width: 80,
          key: 'qtySafety',
          renderHeader: (h, params) => {
            const column = params.column
            return h('div', {
              class: 'line-height-30 cursor-pointer',
              style: 'margin-right:-5px;'
            }, [
              h('Poptip', {
                props: {
                  transfer: true,
                  trigger: 'hover',
                  // title: 'Title',
                  content: '店铺当前平台条码ID的保底量',
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
          }
        },
        {
          title: '最后同步数',
          key: 'finalSyncNum'
        },
        {
          title: '最后同步时间',
          key: 'finalSyncTime',
          render: (h, params) => {
            const finalSyncTime = params.row.finalSyncTime // 最后同步时间
            return h('div', {}, finalSyncTime ? this.formatDate(finalSyncTime) : '');
            /*  const currentTime = params.row.currentTime // 服务器库时间 - 时间戳
              let value = ''
              if (finalSyncTime) {
                // 先时间格式化，接口返回的时间格式有点奇怪：2021-09-09T20:31:45.099
                // const currentTimeFormal = this.formatDate(currentTime)
                // 服务器库时间 - 转时间戳
                const currentTimeNum = currentTime ? currentTime : Date.parse(new Date())
                // 最后同步时间
                const differenceNum = Math.abs(currentTimeNum - finalSyncTime) / 1000 / 60
                // console.log(222, currentTimeNum, finalSyncTime, differenceNum)
                if (differenceNum <= 1) {
                  value = '<=1min'
                } else if (differenceNum <= 5) {
                  value = '<=5min'
                } else if (differenceNum <= 10) {
                  value = '<=10min'
                } else if (differenceNum <= 30) {
                  value = '<=30min'
                } else if (differenceNum > 30) {
                  value = '>30min'
                }
              }
               return h('div', {}, value);*/
          }
        },
        {
          title: '同步失败的原因',
          key: 'syncFailedReason'
        },
        {
          title: '同步状态',
          key: 'syncStatus', // 同步状态： 0 未同步  2 同步成功 3 同步失败
          render: (h, params) => {
            const obj = {
              '0': '未同步',
              '2': '同步成功',
              '3': '同步失败',
            }
            const syncStatus = params.row.syncStatus // 同步状态
            return h('div', {}, obj[syncStatus] || '');
          }
        },
        {
          title: '平台条码',
          key: 'skuId',
        },
      ]
      return columns1
    },
    // 用户信息
    userInfo() {
      return this.$store.state.global.userInfo || {}
    },
    userIdInfo() {
      return this.$store.state.global.userInfo.id
    },
    // 浏览器高度
    windowHeight() {
      return document.documentElement.clientHeight
    }
  },
  mounted() {
    this.queryMenuPermissionFun()
    this.setTableHeightFun()
    this.getSearchFormData()
    let alReadyLoady = false // 初始已经请求过
    setInterval(() => {
      if (this.userIdInfo && !alReadyLoady) {
        alReadyLoady = true
        this.getLeftList()
        console.log('用户ID', this.userIdInfo)
      }
    }, 1000)
    this.searchParams = JSON.parse(JSON.stringify(this.formConfig1.formValue))
    window.onresize = () => {
      this.setTableHeightFun()
    }
  },
  methods: {
    /**
     * 先判断是否勾选了记录
     * @param fn
     */
    hasSelectionData(fn) {
      if (!this.multipleSelection.length) {
        this.$Message.warning($it('tip.kx')); // 未勾选记录，不允许继续操作!
      } else {
        if (fn) {
          fn()
        }
      }
    },
    /**
     * 获取按钮权限
     */
    queryMenuPermissionFun() {
      this.service.common.queryMenuPermission({
        param: `{query: {AD_SUBSYSTEM_ID: 218, AD_TABLECATE_ID: 5088, GROUP_ID: 10}}`
      }).then((res) => {
        if (res.data.code === 0) {
          // 各个按钮对应的方法调用入口
          const data = res.data.data || []
          data.forEach((item) => {
            if (item.name === 'shopStorageManager') { // 平台店铺库存管理
              const actionList = item.actionList || []
              actionList.forEach((item2) => {
                if (item2.id > 0 && item2.name !== 'queryDevOpsInfoList') {
                  this.btnList.push({
                    type: 'default',
                    text: item2.description,
                    description: item2.description,
                    name: item2.name,
                    btnclick: () => {
                      typeof this.actionFunList[item2.name] === 'function' ? this.actionFunList[item2.name]() : ''
                    }
                  })
                }
              })
            }
          })
        }
      });
    },
    /**
     * 重组列的顺序
     * @param val
     * @param th
     * @returns {[]}
     */
    setColumn(val, th) {
      let arr = val.split(',')
      let thArr = []
      arr.forEach((item) => {
        let head = th.find((i) => {
          return i.field === item
        })
        if (head) {
          thArr.push(head)
        }
      })
      return thArr
    },
    /**
     * 获取表格列的顺序
     */
    getUserConfigFun() {
      const formData = new FormData();
      formData.append('type', 'type'); // V_SG_CHANNEL_PRO_INFO
      formData.append('id', '41460534');
      this.service.common.getUserConfig(formData).then((res) => {
        if (res.data.code === 0) {
          if (res.data.data.colPosition && res.data.data.colPosition.length) {
            this.agTableConfig.columnDefs = this.setColumn(res.data.data.colPosition, this.agTableConfig.columnDefs)
          }
        }
      });
    },
    /**
     * 设置表格列的顺序
     */
    columnmovedFun(v) {
      const colposition = []
      const allGridColumnsArr = this.agTableConfig.columnApi.getAllGridColumns() || [] // 获取表格列的顺序
      allGridColumnsArr.forEach((item) => {
        colposition.push(item.colId)
      })
      console.log(999, colposition)
      this.debounceFun(() => {
        const formData = new FormData();
        formData.append('tableid', '41460534'); // V_SG_CHANNEL_PRO_INFO
        formData.append('colposition', colposition);
        this.service.common.setColPosition(formData).then((res) => {
        });
      })
    },
    /**
     * 保存选中的表格
     */
    selectedDataSave() {
      if (this.multipleSelection.length) {
        sessionStorage.setItem('multipleSelection', this.multipleSelection)
      }
    },
    /**
     * 设置默认选中的表格行
     */
    setCheckedRow() {
      const selectedIndex = []
      this.multipleSelection.forEach((item) => {
        selectedIndex.push(item.id)
      })
      this.agTableConfig.gridApi.forEachNode((node) => {
        if (selectedIndex.includes(node.data.id)) {
          this.agTableConfig.gridApi.selectNode(node, true);
        }
      });
    },
    /**
     * 表格准备完毕
     * @param params
     */
    onGridReady(params) {
      this.agTableConfig.gridApi = params.api;
      this.agTableConfig.columnApi = params.columnApi;
      this.getUserConfigFun()
      if (this.data1.length) {
        this.agTableConfig.gridApi.sizeColumnsToFit();
      }
    },
    /**
     * 节流函数
     */
    throttleFun: _.throttle((fun) => {
      fun()
    }, 1000),
    /**
     * 防抖函数
     */
    debounceFun: _.debounce((fun) => {
      fun()
    }, 1000),
    /**
     * 计算合计
     * @param key
     * @param type
     */
    totalDateKpi(key, type) {
      let total = this[`data${type}`].reduce((total, item) => {
        const val = Number(item[key])
        return (total += isNaN(val) ? 0 : val);
      }, 0);
      this.$set(this.tableTotal[0], key, total);
      setTimeout(() => {
        this.agTableConfig.gridApi.setPinnedBottomRowData(this.tableTotal)
      }, 0)
    },
    /**
     * 导出
     * @param v
     */
    exportFun() {
      if (this.isExport) {
        // 有一项导出正在进行中
        this.$Message.error(window.vmI18n.t('modalTips.f8'));
        return;
      }
      this.isExport = true;
      let ids = []
      this.multipleSelection.forEach((item) => {
        ids.push(item.id)
      })
      //查询条件
      const searchParams = this.searchParamsFun()
      const params = {
        cpCShopIds: this.leftCheckValue ? [this.leftCheckValue] : null, //店铺id
        userId: this.userIdInfo, // 用户id
      }
      if (ids.length) {
        params.ids = ids
      }
      this.service.inventoryCenter.download({...params, ...searchParams}).then((res) => {
        this.isExport = false;
        if (res.data.code === 0) {
          this.$Message.success(res.data.message);
          const data = res.data.data
          if (data !== null) {
            this.$store.dispatch('customize/timingCalcAsyncTask', {id: data}); // 直接下载
            // this.$confirm('本次操作已后台处理，是否至[我的任务]查看?', '提醒', {
            //   confirmButtonText: '确定',
            //   cancelButtonText: $it('com.cancel'),
            //   confirmButtonClass: '',
            //   type: 'warning'
            // }).then(() => {
            //   // 跳转页面
            //   R3.store.commit('global/tabOpen', {
            //     type: 'V',
            //     tableName: 'CP_C_TASK',
            //     label: window.vmI18n.t('other.myMission'),
            //     tableId: 24386,
            //     id: data,
            //     query: {
            //       id: data,
            //       pid: '10010',
            //       ptitle: window.vmI18n.t('other.myMission'),
            //       ptype: 'table',
            //       tabTitle: window.vmI18n.t('other.myMission'),
            //       tableName: 'CP_C_TASK'
            //     }
            //   });
            // }).catch(() => {

            // });
          }
        } else {
          const err = res.data.message || window.vmI18n.t('modalTips.z3'); // 失败！
          this.$Message.error(err);
        }
      })
    },
    /**
     * 下载全店在售库存
     */
    downloadAllShopSaleStorageFun() {
      const params = {
        cpCShopId: this.leftCheckData.id, //店铺id
        cpCPlatformId: this.leftCheckData.cpCPlatformId,
      }
      this.service.inventoryCenter.downloadAllShopSaleStorage(params).then((res) => {
        if (res.data.code === 0) {
          this.$Message.success(res.data.message);
        }
      })
    },
    /**
     * 下载平台商品
     * @param tittle
     */
    downDialogFun(tittle) {
      this.downDialogObjTittle = tittle
      this.downDialogObjShow = true
    },
    /**
     * 下载平台库存
     * @param tittle
     */
    downDialogFun2() {
      this.downDialogObjShow2 = true
    },
    /**
     * 设置表格高度
     */
    setTableHeightFun() {
      this.tableHeight = `${document.body.offsetHeight - 450}px`
    },
    /**
     * 修改比例
     */
    modifyScaleFun(rowData) {
      const rightTableCurrRowData = this.rightTableCurrRowData
      const leftCheckData = this.leftCheckData
      const values = [
        {
          display: 'OBJ_FK',
          colid: '1700825658', // 平台店铺
          refobjid: leftCheckData.id || '',
          defaultValue: leftCheckData.cpCShopEname || ''
        },
        {
          display: 'OBJ_FK',
          colid: '1700825961', //条码
          refobjid: rightTableCurrRowData.psCSkuId || '',
          defaultValue: rightTableCurrRowData.psCSkuEcode || ''
        },
        {
          display: 'text',
          colid: '1700825672', //平台条码ID
          defaultValue: rightTableCurrRowData.skuId || ''
        },
        {
          display: 'text',
          colid: '1700825673', //平台商品ID
          defaultValue: rightTableCurrRowData.numiid || ''
        }
      ]
      if (rowData.sgCSaStoreId) {
        values.push({
          display: 'OBJ_FK',
          colid: '1700825665', //配销仓
          refobjid: rowData.sgCSaStoreId || '',
          defaultValue: rowData.sgCSaStoreEname || ''
        })
      } else if (rowData.sgCSharePoolId) {
        values.push({
          display: 'OBJ_FK',
          colid: '1700825666', //共享池
          refobjid: rowData.sgCSharePoolId || '',
          defaultValue: rowData.sgCSharePoolEname || ''
        })
      }
      this.$store.commit('global/tabCloseAppoint', {
        tableName: 'V_SG_C_CHANNEL_SKU_STRATEGY', // (主表表名),
        routeFullPath: '/SYSTEM/TABLE/V_SG_C_CHANNEL_SKU_STRATEGY/249230890', // （路由path）
        routePrefix: '/SYSTEM',//(路由前缀)
      });

      setTimeout(() => {
        // 跳转到 特殊条码按比例同步界面列表页面
        this.$store.commit('global/tabOpen', {
          tableId: 249230890,
          type: 'S',
          tableName: 'V_SG_C_CHANNEL_SKU_STRATEGY',
          isSetQuery: true,
          queryData: {
            tableId: '249230890',
            values
          }
        });
      }, 0)


    },
    /**
     * 倒计时
     */
    countDownFun(name) {
      let expirationTime = Number(JSON.stringify(this.expirationTime))
      let timer = setInterval(() => {
        this.btnList.forEach((item, index) => {
          if (item.name === name) {
            if (expirationTime >= 0) {
              this.btnList[index].text = `${this.btnList[index].description}${expirationTime > 0 ? `(${expirationTime})` : ''}`
              expirationTime--
            } else {
              clearInterval(timer);
            }
            this.btnList[index].disabled = expirationTime >= 0
          }
        })
      }, 1000)
    },
    /**
     * 手动增量库存同步
     */
    incSyncStorageFun(itemList) {
      const params = {
        cpCShopEcode: this.leftCheckData.cpCShopEcode,   // 店铺编号
        cpCShopId: this.leftCheckData.id, //店铺id
        cpCShopTitle: this.leftCheckData.cpCShopEname,   // 店铺名称
        itemList,
        userId: this.userIdInfo, // 用户id
      }
      this.service.inventoryCenter.IncSyncStorage(params).then((res) => {
        if (res.data.code === 0) {
          // this.$refs.selectionTable.selectAll(false); // 取消全选
          if (res.data.data) {
            this.$Message.success(res.data.message);
            this.searchFun() //更新表格数据
          }
          /*  this.$store.commit('global/tabCloseAppoint', {
              tableName: 'SG_B_CHANNEL_STORAGE_INC_SYNC', // (主表表名),
              routeFullPath: '/SYSTEM/TABLE/SG_B_CHANNEL_STORAGE_INC_SYNC/249230912', // （路由path）
              routePrefix: '/SYSTEM',//(路由前缀)
            });
            setTimeout(() => {
              // 跳转到 平台库存增量同步界面
              this.$store.commit('global/tabOpen', {
                tableId: 249230912,
                type: 'S',
                tableName: 'SG_B_CHANNEL_STORAGE_INC_SYNC',
                isSetQuery: true,
                queryData: {
                  tableId: '249230912',
                  values: [
                    {
                      display: 'OBJ_FK',
                      colid: '1700826397', // 平台店铺
                      refobjid: this.leftCheckData.id || '',
                      defaultValue: this.leftCheckData.cpCShopEname || ''
                    },
                    {
                      display: 'text',
                      colid: '1700826396', // 批次号
                      defaultValue: res.data.data ? res.data.data.batchNo : ''
                    }
                  ]
                }
              });
            }, 0)*/
        }
      })
    },
    /**
     * 全量库存同步
     */
    syncChannelStorageFun() {
      const syncInfoRequestList = []
      this.multipleSelection.forEach((item) => {
        syncInfoRequestList.push({
          cpCShopId: item.cpCShopId,   // 店铺id
          psCSkuEcode: item.psCSkuEcode, //条码编码
          psCSkuId: item.psCSkuId,  //条码id
          skuId: item.skuId,  //平台条码id
        })
      })
      const params = {
        syncInfoRequestList,
        userId: this.userIdInfo, // 用户id
      }
      this.service.inventoryCenter.syncChannelStorage(params).then((res) => {
        if (res.data.code === 0) {
          // this.$refs.selectionTable.selectAll(false); // 取消全选
          this.$Message.success('操作成功！');
          // this.searchFun() //更新表格数据
        } else {
          this.$Message.error(res.data.message);
        }
      })
    },
    /**
     * 同步库存、是否转仓、设定安全库存  按钮通用接口
     * @param obj
     * @param dialogName
     * @param callback
     * @param isReload 是否更新表格数据
     */
    saveDevOpsInfoFun(obj, dialogName, isReload, callback) {
      this[dialogName].loading = true
      const saveInfoRequestList = []
      this.multipleSelection.forEach((item) => {
        saveInfoRequestList.push({
          id: item.id, // 列表id
          ...obj
        })
      })
      const params = {
        saveInfoRequestList: saveInfoRequestList,
        userId: this.userIdInfo, // 用户id
      }
      this.service.inventoryCenter.saveDevOpsInfo(params).then((res) => {
        this[dialogName].loading = false
        if (res.data.code === 0) {
          // this.$refs.selectionTable.selectAll(false); // 取消全选
          this[dialogName].show = false
          for (let key in this[dialogName].formData) {
            this[dialogName].formData[key] = ''
          }
          this.$Message.success('操作成功！');
          if (isReload) {
            this.searchFun() //更新表格数据
          }
          if (callback) {
            callback()
          }
        }
      })
    },

    /**
     * 修改同步比例
     * @param obj
     * @param dialogName
     * @param isReload
     * @param callback
     */
    checkSkuStorageFun(obj, dialogName, isReload, callback) {
      this[dialogName].loading = true
      const saveInfoRequestList = []
      this.multipleSelection.forEach((item) => {
        saveInfoRequestList.push({
          shopId: item.cpCShopId, //  店铺id
          skuId: item.skuId, //  平台条码id
          saStoreType: item.saStoreType, //  配销仓类型
          ...obj
        })
      })
      const params = {
        requestList: saveInfoRequestList,
        userId: this.userIdInfo, // 用户id
      }
      this.service.inventoryCenter.checkSkuStorage(params).then((res) => {
        this[dialogName].loading = false
        if (res.data.code === 0) {
          // this.$refs.selectionTable.selectAll(false); // 取消全选
          this[dialogName].show = false
          for (let key in this[dialogName].formData) {
            this[dialogName].formData[key] = ''
          }
          this.$Message.success('操作成功！');
          if (isReload) {
            this.searchFun() //更新表格数据
          }
          if (callback) {
            callback()
          }
        }
      })
    },
    /**
     * 表格单击
     */
    tableRowClick(data, index) {
      const row = data.data
      if (row.id) {
        this.rightTableCurrRowId = row.id
        this.rightTableCurrRowData = row
      }
      // this.getDevOpsInfoFun()
      // this.getShareQueryDevOpsInfoFun()
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    getContextMenuItemsFun(params) {
      return [
        {
          name: $it('com.copy'), // 复制
          action: function () {
            copy(params.value);
          },
        },
      ]
    },
    /**
     * 左侧店铺切换事件
     */
    leftCheckChangeFun(val) {
      this.leftShopList.forEach((item) => {
        if (item.id === val) {
          this.leftCheckData = item
        }
      })
      // this.$refs.selectionTable.selectAll(false); // 取消全选
      this.searchFun(true)
    },
    /**
     * 共享池库存列表查询
     */
    getShareQueryDevOpsInfoFun() {
      if (this.rightTableCurrRowData) {
        const params = {
          skuId: this.rightTableCurrRowData.skuId,          //平台条码
          psCSkuId: this.rightTableCurrRowData.psCSkuId,          //商家条码id
          cpCShopId: this.rightTableCurrRowData.cpCShopId, //店铺id
          startindex: 0, // 起始下标
          range: 1000,
          userId: this.userIdInfo, // 用户id
        }
        this.service.inventoryCenter.shareQueryDevOpsInfo(params).then((res) => {
          if (res.data.code === 0) {
            const data = res.data.data
            this.data3 = data.shareStorageInfoList || []
          }
        })
      } else {
        this.data3 = []
      }

    },
    // 时间戳格式化
    formatDate(time) {
      const date = new Date(time);
      return dateUtil.getFormatDate(date, 'yyyy-MM-dd HH:mm:ss');
    },
    /**
     * 调入库存
     */
    transferInventoryFun() {
      this.$refs['formCustom'].validate((valid) => {
        if (valid) {
          const params = {
            skuId: this.rightTableCurrRowData.skuId,          //平台条码
            psCSkuId: this.rightTableCurrRowData.psCSkuId,          //商家条码id
            sgCSaStoreId: this.rightTable2CurrRowData.sgCSaStoreId,     //配销仓id
            sgCShareStoreId: this.rightTable2CurrRowData.sgCShareStoreId, //聚合仓id
            qty: this.transferInventoryForm.qty,
            psCSkuEcode: this.rightTableCurrRowData.psCSkuEcode,
            userId: this.userIdInfo, // 用户id
          }
          this.service.inventoryCenter.addAllocationBill(params).then((res) => {
            if (res.data.code === 0) {
              this.showTransferInventory = false
              this.$Message.success(res.data.message);
            }
          })
        }
      })
    },
    /**
     * 配销仓查询接口
     * @param rightTableCurrRowData
     */
    getDevOpsInfoFun() {
      if (this.rightTableCurrRowData) {
        this.table2Loading = true
        const params = {
          startindex: (this.page2.current - 1) * this.page2.pageSize, // 起始下标
          range: this.page2.pageSize,
          cpCShopId: this.rightTableCurrRowData.cpCShopId, //店铺id
          skuId: this.rightTableCurrRowData.skuId, //平台条码
          psCSkuId: this.rightTableCurrRowData.psCSkuId, //商家条码id
          userId: this.userIdInfo, // 用户id
          saStoreType: this.rightTableCurrRowData.saStoreType, //  配销仓类型
        }
        this.service.inventoryCenter.queryDevOpsInfo(params).then((res) => {
          this.table2Loading = false
          if (res.data.code === 0) {
            const data = res.data.data
            this.data2 = data.saStorageInfoList || []
            this.page2.total = data.totalRowCount
          }
        })
      } else {
        this.data2 = []
        this.page2.total = 0
      }


    },
    /**
     * 查询区域动态数据获取
     */
    getSearchFormData() {
      const formData = new FormData();
      formData.append('table', 'V_SG_CHANNEL_PRO_INFO');
      formData.append('getcmd', 'y');
      this.service.common.getTableQuery(formData).then((res) => {
        if (res.data.code === 0) {
          const dataarry = res.data.datas.dataarry || []
          dataarry.forEach((item) => {
            if (item.colname === 'QTY_DIFFERENCES') { // 差异数可以输入负数
              item.regx = /^[-]?[0-9]*$/ //可以输入负数的整数数字
            }
            if (item.colname === 'IS_DIFF') { // 差异数可以输入负数
              item.multiple = false //是否可以多选
            }
          })
          this.actionFormCommonFun('formConfig1', dataarry)
          dataarry.forEach((item) => {
            if (item.colname === 'SALE_STATUS') {
              this.saleStatusArr = item.combobox
            }
            if (item.colname === 'BRAND_LABEL') {
              this.brandLabelArr = item.combobox
            }
          })
        }
      });
    },
    /**
     * 修改商品类型
     */
    modifyTypeFun() {
      this.formConfig2.loading = true
      const saStoreType = this.formConfig2.formValue.brandLabels
      const saveInfoRequestList = []
      this.multipleSelection.forEach((item) => {
        saveInfoRequestList.push({
          id: item.id,
          qtySafety: Number(item.qtySafety),
          skuId: item.skuId,
          cpCShopId: item.cpCShopId,
          saStoreType
        })
      })
      const params = {
        userId: this.userIdInfo, // 用户id
        saveInfoRequestList
      }
      this.service.inventoryCenter.updateBySaStoreType(params).then((res) => {
        if (res.data.code === 0) {
          // this.$refs.selectionTable.selectAll(false); // 取消全选
          this.modifyTypeDialogObjShow = false
          this.$Message.success('修改成功！');
          this.getTable1Data() //更新表格数据
        }
        this.formConfig2.loading = false
      })
    },
    /**
     * 手动下载平台商品
     */
    downDialogSubmit() {
      const formData = this.$refs.downDialogForm.formData
      console.log(formData.time)
      if (!formData.numiid && (formData.time && formData.time[0] === '')) {
        this.$Message.warning('请输入需要下载的数字编号或修改时间中的一个')
        return
      }
      let storeName = 'tysp'
      if (this.leftCheckData.cpCPlatformEname.indexOf('唯品会') !== -1) {
        storeName = 'wph'
      } else if (this.leftCheckData.cpCPlatformEname.indexOf('淘宝') !== -1) {
        storeName = 'taobao'
      } else if (this.leftCheckData.cpCPlatformEname.indexOf('京东') !== -1) {
        storeName = 'jd'
      } else if (this.leftCheckData.cpCPlatformEname.indexOf('通用商品') !== -1) {
        storeName = 'tysp'
      }

      if (this.leftCheckValue) {
        const url = {
          taobao: '/p/cs/itemDownload',// 淘宝
          jd: '/p/cs/itemDownload',//京东
          tysp: '/p/cs/stdp/item/get', // 通用商品
          wph: '/p/cs/vip/item/get',// 唯品会
        }
        const params = {
          taobao: {
            item_num: formData.numiid, // 平台商品ID
            table: "IP_C_TAOBAO_PRODUCT",
          },
          jd: {
            ware_id: formData.numiid,// 平台商品ID
            table: "IP_C_JINGDONG_PRODUCT"
          },
          tysp: {
            sp_ids: formData.numiid,// 平台商品ID
          },
          wph: {}
        }
        const commonDownFun = () => {

        }
        const fromdata = new FormData();
        const params2 = {
          shop_id: this.leftCheckValue, // 店铺id
          start_time: this.formatDate(formData.time[0]),
          end_time: this.formatDate(formData.time[1]),
          ...params[storeName]
        }
        fromdata.append('param', JSON.stringify(params2));
        this.service.common.publicUrlParams(url[storeName], fromdata).then(res => {
          this.downDialogObjShow = false
          if (res.data.code === 0) {
            this.$Message.success(res.data.message);
            // this.$refs.selectionTable.selectAll(false); // 取消全选
            /*const taskId = res.data.message.match(/\d+(.\d+)?/g)
            this.$confirm(`商品下载任务已经发送，任务ID：${taskId}，是否前往接口下载任务表查看下载进度！`, '提示', {
              confirmButtonText: '前往',
              cancelButtonText: $it('com.cancel'),
              confirmButtonClass: '',
              customClass: 'warning-alert',
              type: 'warning'
            }).then(() => {
              this.$store.commit('global/tabOpen', {
                tableId: 24775,
                type: 'S',
                tableName: 'IP_T_CONSUMER_LOG',
                isSetQuery: true,
                queryData: {
                  tableId: '249230890',
                  values: [
                    {
                      display: 'text',
                      colid: '173661', //任务ID
                      defaultValue: taskId
                    },
                    {
                      display: 'text',
                      colid: '173667', //平台
                      defaultValue: `${this.leftCheckData.cpCPlatformId}`
                    },
                    // {
                    //   display: 'text',
                    //   colid: '173666', //卖家昵称
                    //   defaultValue: ''
                    // },
                    // {
                    //   display: 'text',
                    //   colid: '173670', //云枢纽标识
                    //   defaultValue: ''
                    // }
                  ]
                }
              });
            });*/
          }
        })
      } else {
        console.log('找不到平台店铺')
      }


    },
    /**
     * 手动下载平台库存
     */
    downDialogSubmit2() {
      const formData = this.$refs.downDialogForm2.formData
      if (!formData.numiid.length) {
        this.$Message.warning('请输入平台商品ID')
        return
      }
      const itemNums = formData.numiid
      this.downDialogObjShow2 = false
      if (this.leftCheckValue) {
        const params = {
          shopId: this.leftCheckValue, // 店铺id
          itemNums: itemNums.split(','), // 平台商品ID
          userId: this.userIdInfo, // 用户id
        }
        this.service.inventoryCenter.platformInventory(params).then(res => {
          if (res.data.code === 0) {
            this.$Message.success(res.data.message);
            // this.$refs.selectionTable.selectAll(false); // 取消全选
          }
        })
      } else {
        console.log('找不到平台店铺')
      }


    },
    /**
     * 下划线转换驼峰
     * @param name
     * @returns {*}
     */
    toHump(name) {
      const val = name.toLowerCase()
      return val.replace(/\_(\w)/g, function (all, letter) {
        return `${letter.toUpperCase()}`;
      });
    },
    reset() {
      this.searchParams = {}
      for (let key in this.formConfig1.formValue) {
        this.formConfig1.formValue[key] = Array.isArray(this.formConfig1.formValue[key]) ? [] : ''
      }
      // this.$refs.selectionTable.selectAll(false); // 取消全选
      this.searchFun()
    },
    /**
     * 查询列表数据
     * @param fromSearch 是否来自查询按钮
     */
    searchFun(fromSearch) {
      if (fromSearch) {
        this.searchParams = JSON.parse(JSON.stringify(this.formConfig1.formValue))
        const trueParams = {}
        for (const key in this.searchParams) {
          const element = this.searchParams[key]
          if (Object.prototype.toString.call(element) === '[object Array]' || Object.prototype.toString.call(element) === '[object String]') {
            if (element.length > 0) {
              if (Array.isArray(element)) {
                if (element[0] !== "bSelect-all") { // 全部的时候不传
                  trueParams[key] = element
                }
              } else {
                trueParams[key] = element
              }
            }
          }
        }
        this.searchParams = trueParams
        this.multipleSelection = [] // 查询时候清空勾选
      }
      this.page1.current = 1
      this.getTable1Data()
    },
    /**
     * 获取查询条件
     * @returns {{}}
     */
    searchParamsFun() {
      const params = {}
      for (let key in this.searchParams) {
        const item = this.searchParams[key]
        if (item.length) {
          const multipleString = ['MUNIID', 'SKU_ID'] // 逗号分割，或者空格分割 多条查询
          if (multipleString.indexOf(key) !== -1) {
            const val = this.searchParams[key].split(/[,， ]/)
            const arr = []
            val.forEach((v) => {
              if (v) {
                arr.push(v)
              }
            })
            params[`${this.toHump(key)}s`] = arr
          } else {
            if (Array.isArray(item) && item[0].ID !== undefined) { // 下拉框多选的数据，数组里面只要ID
              const arr = []
              item.forEach((item2) => {
                arr.push(Number(item2.ID))
              })
              params[`${this.toHump(key)}s`] = arr
            } else {
              if (Array.isArray(item)) {
                params[`${this.toHump(key)}s`] = this.searchParams[key] // 多选的入参都要加s
              } else {
                params[this.toHump(key)] = this.searchParams[key]
              }
            }
          }

        }
      }
      return params
    },

    /**
     * 平台商品查询接口
     * @param sortObj
     */
    getTable1Data(sortObj) {
      this.table1Loading = true
      const params = {
        startindex: (this.page1.current - 1) * this.page1.pageSize, // 起始下标
        range: this.page1.pageSize,
        cpCShopIds: this.leftCheckValue ? [this.leftCheckValue] : null, //店铺id
        userId: this.userIdInfo, // 用户id
      }
      if (sortObj) {
        if (sortObj.order === 'asc') {
          params.ruleAsc = true
        }
        if (sortObj.order === 'desc') {
          params.ruleDesc = true
        }
      } else {
        // 分页时带上排序的功能
        this.agTableConfig.columnDefs.forEach((item, index) => {
          if (this.agTableConfig.columnDefs[index].field === 'qtyDifferences') {
            const sortType = this.agTableConfig.columnDefs[index].headerComponentParams.sortType
            if (sortType === 'asc') {
              params.ruleAsc = true
            }
            if (sortType === 'desc') {
              params.ruleDesc = true
            }
          }
        })
      }
      //查询条件
      const searchParams = this.searchParamsFun()
      this.service.inventoryCenter.queryDevOpsInfoList({...params, ...searchParams}).then((res) => {
        this.table1Loading = false
        if (res.data.code === 0) {
          const data = res.data.data
          const list = data.productList || []
          // 处理数据
          const numberKey = ['qtyChannel', 'qtySafety', 'qtyPlatform', 'qtyDifferences', 'qtyReal', 'finalSyncNum', 'ratio', 'specialRadio']
          list.forEach((item, index) => {
            item.ID = {val: item.id} // 框架必须要有id,不然勾选表格报错
            for (let key in item) {
              if (numberKey.indexOf(key) !== -1) {
                item[key] = `${item[key]}` // 数字类型表格不显示问题
              }
            }
          })
          this.data1 = list || []
          this.agTableConfig.rowData = this.data1
          setTimeout(() => {
            this.setCheckedRow() // 设置默认选中的表格
          }, 1000)
          this.page1.total = data.totalRowCount
          for (let key in this.tableTotal[0]) {
            if (key !== 'index') {
              this.totalDateKpi(key, 1);
            }
          }
          if (this.data1 && this.data1.length) {
            this.rightTableCurrRowId = this.data1[0].id
            this.rightTableCurrRowData = this.data1[0]
          } else {
            this.rightTableCurrRowId = null
            this.rightTableCurrRowData = null
          }
          this.getDevOpsInfoFun()
          this.getShareQueryDevOpsInfoFun()
        }
      })
    }
    ,

    /**
     * 高亮 class
     * @param row
     * @param index
     * @returns {string}
     */
    rowClassName(row, index) {
      if (this.rightTableCurrRowId === row.id) {
        return 'ark-table-row-highlight';
      }
      return '';
    }
    ,
    /**
     * 获取左侧当前选中的数据
     * @returns {string}
     */
    leftShopData() {
      let data = {}
      this.leftShopList.forEach((item) => {
        if (item.cpCShopId === this.leftCheckValue) {
          data = item
        }
      })
      return data
    },
    /**
     * 表格排序
     */
    sortChange(column) {
      this.getTable1Data(column)
    },
    /**
     * 平台店铺查询（左侧列表）
     * @param isFromSearch
     */
    getLeftList(isFromSearch, callback) {
      this.leftLoading = true
      if (isFromSearch) {
        this.page = {
          startindex: 0,
          range: 60
        }
      }
      this.service.inventoryCenter.shopSelectByName({
        startindex: this.page.startindex,
        range: this.page.range,
        cpCShopEname: this.leftSearch,
        userId: this.userIdInfo, // 用户id
      }).then((res) => {
        this.leftLoading = false
        if (res.data.code === 0) {
          const data = res.data.data
          this.page.range++
          this.page.total = data.totalRowCount
          this.leftShopList = res.data.data.cpCShopList || []
          this.expirationTime = res.data.data.expirationTime || 0
          if (this.leftShopList.length) {
            this.leftCheckData = this.leftShopList[0]
            this.leftCheckValue = this.leftShopList[0].id
            this.searchFun(true)
          }
        }
        if (callback) {
          callback()
        }
      })
    }
    ,
    show(index) {
      this.$Modal.info({
        title: 'User Info',
        content: `Name：${this.data6[index].name}<br>Age：${this.data6[index].age}<br>Address：${this.data6[index].address}`
      })
    }
    ,
    remove(index) {
      this.data6.splice(index, 1);
    },

    //  分页change 事件
    pageChange1(val) {
      this.page1.current = val;
      this.getTable1Data() // 更新表格数据 - 平台商品查询
    },
    //  切换分页条数
    pageSizeChange1(val) {
      this.page1.pageSize = val;
      this.getTable1Data() // 更新表格数据 - 平台商品查询
    },
    //  分页change 事件
    pageChange2(val) {
      this.page2.current = val;
      this.getDevOpsInfoFun() // 更新表格数据 - 平台商品查询
    },
    //  切换分页条数
    pageSizeChange2(val) {
      this.page2.pageSize = val;
      this.getDevOpsInfoFun() // 更新表格数据 - 平台商品查询
    },
    /**
     * 标签选择事件
     * @param v
     */
    changeTagFun(v) {
      if (v[0] === 'bSelect-all') {
        this.formConfig1.formValue.bbb = ['y', 'h', 't']
      }
    }
    ,
    /**
     * 左侧无线滚动
     * @returns {Promise<unknown>}
     */
    handleReachBottom() {
      return new Promise(resolve => {
        this.getLeftList(false, () => {
          resolve()
        })
        setTimeout(() => {
          const last = this.leftShopList[this.leftShopList.length - 1];
          for (let i = 1; i < 11; i++) {
            this.leftShopList.push(last + i);
          }
        }, 2000);
      });
    }


  }
};

import businessForm from 'professionalComponents/businessForm';
import businessButton from 'professionalComponents/businessButton';
import fkdialog from 'framework/components/tablelist/fkdialog.vue';
import loading from '@/component/loading.vue';
import {checkRuleFunMixin} from "@/assets/js/mixins/checkFormRule";
import businessStatusFlag from 'professionalComponents/businessStatusFlag';


export default {
  components: {
    businessForm,
    businessButton,
    fkdialog,
    loading,
    businessStatusFlag
  },
  mixins: [checkRuleFunMixin],
  data() {
    return {
      maxLevel: 0, // 已有的最大层级
      detailData: [], // 详情数据
      tableData1Detail: [],
      tableName: 'SG_C_CHANNEL_SOURCE_STRATEGY',
      statusObj: {
        2: '已提交',
        3: '已作废',
        4: '已结案',
      },
      status: 1, //  1： 未提交,2：已提交,3：已作废,4:已结案
      page: {
        tabname: '',
        current: 1,
        pageSize: 10,
        total: 0, // 这个界面total必须初始为0！！！
        pageSizeOpts: [10, 20, 30, 50, 100],
      },
      scoringId: '-1', // 评分策略 编辑时候的id
      typeList: [], // 类型下拉框数据
      loading: false,
      submitLoading: false, // 提交按钮 loading
      addLineLoading: false, // 寻源规则按钮 loading
      tableData2Loading: false, // 寻源规则 loading
      columns1: [
        {
          title: '类型',
          align: 'center',
          width: 200,
          key: 'type',
          slot: 'type'
        },
        {
          title: '店仓',
          align: 'center',
          tdAlign: 'left',
          key: 'store',
          slot: 'stores',
          renderHeader: (h, params) => {
            const column = params.column
            const index = params.index
            return h('div', {class: 'line-height-30'}, [
              column.title, this.canEdit ?
                h('i', {
                  class: 'iconfont iconios-add-circle-outline color-primary pull-right mg-rt-50 cursor-pointer font-size-18',
                  on: {
                    click: () => {
                      this.isChange = true
                      this.handleAdd(column, index)
                    }
                  }
                }) : ''
            ]);
          }
        },
      ],
      tableData1: [
        {
          type: '1',
          store: []
        }
      ],
      columns2: [
        {
          title: '寻源层级',
          align: 'center',
          width: 200,
          key: 'level',
          slot: 'level'
        },
        {
          title: '寻源规则',
          align: 'center',
          key: 'rulers',
          slot: 'rulers',
        },
        {
          title: '操作',
          align: 'center',
          key: 'action',
          width: 100,
          slot: 'action',
        },
      ],
      tableData2PartNewLine: [], // 寻源规则 - 未入库数据
      tableData2: [], // 寻源规则 -库里数据
      isChange: false,
      isChange2: false,
      ID: this.$route.params.customizedModuleId && this.$route.params.customizedModuleId != 'New' ? this.$route.params.customizedModuleId : '-1', // 记录主界面传入的ID
      customizedModuleName: this.$route.params.customizedModuleName,
      formConfig1: {
        formData: [
          {
            style: 'input',
            label: '策略名称',
            value: 'ENAME',
            width: '12',
            disabled: false,
            id: `formConfig1ENAME`,
            inputChange: () => {
              this.isChange = true;
            },
          },
          {
            colname: 'CP_C_PLATFORM_ID',
            style: 'popInput', // 输入框弹框单多选
            width: '12',
            itemdata: {
              col: 1,
              colid: 1700826023, // 当前字段的ID
              colname: 'CP_C_PLATFORM_ID', // 当前字段的名称
              datelimit: 'all',
              display: 'text', // 显示什么类型，例如xml表示弹窗多选加导入功能，mrp表示下拉多选
              fkdisplay: 'drp', // 外键关联类型
              fkdesc: '来源平台',
              inputname: 'CP_C_PLATFORM_ID:ENAME', // 这个是做中文类型的模糊查询字段，例如ENAME
              isfk: true, // 是否有fk键
              isnotnull: false, // 是否必填
              isuppercase: false, // 是否转大写
              length: 20, // 最大长度是多少
              name: '来源平台',
              readonly: false, // 是否可编辑，对应input   readonly属性
              reftable: 'CP_C_PLATFORM', // 对应的表
              reftableid: 24872, // 对应的表ID
              row: 1,
              statsize: -1,
              type: 'STRING', // 这个是后台用的
              valuedata: '', // 这个是选择的值
              pid: ''
            },
            oneObj: e => {
              this.isChange = true
              this.formConfig1.formValue.CP_C_PLATFORM_ID = e.pid;
            }
          },
          {
            colname: 'CP_C_SHOP_ID',
            style: 'popInput', // 输入框弹框单多选
            width: '12',
            itemdata: {
              col: 1,
              colid: 1700826022, // 当前字段的ID
              colname: 'CP_C_SHOP_ID', // 当前字段的名称
              datelimit: 'all',
              display: 'text', // 显示什么类型，例如xml表示弹窗多选加导入功能，mrp表示下拉多选
              fkdisplay: 'drp', // 外键关联类型
              fkdesc: '平台店铺档案',
              inputname: 'CP_C_SHOP_ID:CP_C_SHOP_TITLE', // 这个是做中文类型的模糊查询字段，例如ENAME
              isfk: true, // 是否有fk键
              isnotnull: false, // 是否必填
              isuppercase: false, // 是否转大写
              length: 20, // 最大长度是多少
              name: '平台店铺',
              readonly: false, // 是否可编辑，对应input   readonly属性
              reftable: 'CP_C_SHOP', // 对应的表
              reftableid: 24475, // 对应的表ID
              row: 1,
              statsize: -1,
              type: 'STRING', // 这个是后台用的
              valuedata: '', // 这个是选择的值
              pid: ''
            },
            oneObj: e => {
              this.isChange = true
              this.formConfig1.formValue.CP_C_SHOP_ID = e.pid;
            }
          },
          {
            style: 'date',
            type: 'datetimerange', // 日期组件类型,默认为data  (daterange)为双日期区间选择
            value: 'query_date',
            label: '范围时间',
            width: '12',
            format: 'yyyy-MM-dd HH:mm:ss', // 格式参照burgeonui
            placeholder: '',
            disabled: false,
            onChange: () => {
              this.isChange = true
            }
          },
        ],
        formValue: {
          ENAME: '', // 策略名
          CP_C_PLATFORM_ID: '', // 来源平台
          CP_C_SHOP_ID: '', // 平台店铺
          query_date: '', // 范围时间
        },
        // 表单非空提示
        ruleValidate: {
          ENAME: [{required: true, message: '请输入策略名称', trigger: 'blur'}],
          query_date: [{required: true, message: '请输入范围时间', trigger: 'blur'}],
        }
      }, // 基本信息
      formConfig2: {
        formData: [
          {
            colname: 'SG_C_SHARE_SCORE_STRATEGY_ID',
            style: 'popInput', // 输入框弹框单多选
            width: '12',
            itemdata: {
              col: 1,
              colid: 1700826106, // 当前字段的ID
              colname: 'SG_C_SHARE_SCORE_STRATEGY_ID', // 当前字段的名称
              datelimit: 'all',
              display: 'text', // 显示什么类型，例如xml表示弹窗多选加导入功能，mrp表示下拉多选
              fkdisplay: 'drp', // 外键关联类型
              fkdesc: '评分策略',
              inputname: 'SG_C_SHARE_SCORE_STRATEGY_ID:ID', // 这个是做中文类型的模糊查询字段，例如ENAME
              isfk: true, // 是否有fk键
              isnotnull: true, // 是否必填
              isuppercase: false, // 是否转大写
              length: 20, // 最大长度是多少
              name: '评分策略',
              readonly: false, // 是否可编辑，对应input   readonly属性
              reftable: 'SG_C_SHARE_SCORE_STRATEGY', // 对应的表
              reftableid: 249230886, // 对应的表ID
              row: 1,
              statsize: -1,
              type: 'STRING', // 这个是后台用的
              valuedata: '', // 这个是选择的值
              pid: ''
            },
            oneObj: e => {
              this.isChange = true
              this.formConfig2.formValue.SG_C_SHARE_SCORE_STRATEGY_ID = e.pid;
            }
          },
        ],
        formValue: {
          SG_C_SHARE_SCORE_STRATEGY_ID: '', // 评分策略
        },
        // 表单非空提示
        ruleValidate: {
          SG_C_SHARE_SCORE_STRATEGY_ID: [{required: true, message: '请输入评分策略', trigger: 'blur'}],
        }
      }, // 评分策略
      itemdata: {
        col: 1,
        colid: 1700826069,
        colname: "CP_C_STORE_ID",
        datelimit: "all",
        display: "xml",
        fkdesc: "店仓档案",
        fkdisplay: "mop",
        inputname: "CP_C_STORE_ID:ENAME",
        isfk: true,
        isnotnull: false,
        isuppercase: false,
        length: 65535,
        name: "逻辑仓",
        readonly: false,
        reftable: "CP_C_STORE",
        reftableid: 23296,
        row: 1,
        statsize: -1,
        type: "STRING",
        valuedata: "",
        pid: "",
        isOneData: false,
        isObject: true
      },
      fkDialog: {
        // 弹框多选
        dialog: false,
        lists: {},
      }
    };
  },
  watch: {},
  computed: {
    canEdit() {
      return Number(this.status) === 1 || this.ID === '-1'
    },
    /**
     * 前端分页所需总条数
     * @returns {number}
     */
    totalForFrontEnd() {
      return this.page.total + Number(this.tableData2PartNewLine.length)
    },
    /**
     *  库里数据 + 未入库数据 (数据保存、前端分页数据用)
     * @returns {*[]}
     */
    tableData2AndNewLineData() {
      return [...this.tableData2, ...this.tableData2PartNewLine]
    },
    /**
     * 寻源规则 - 前端分页数据
     * @returns {any[] | []}
     */
    tableData2ForFrontEndPage() {
      const len = this.page.pageSize
      let arr = []
      let start = 0
      arr = JSON.parse(JSON.stringify(this.tableData2AndNewLineData))
      if (!this.tableData2.length) {
        start = Number(this.tableData2PartNewLine.length) - (this.totalForFrontEnd - (this.page.current - 1) * this.page.pageSize)
      }
      console.log('库里数据 - 根据分页返回的', this.tableData2)
      console.log('前端分页总数据', this.tableData2AndNewLineData)
      console.log('未入库数据', this.tableData2PartNewLine)
      return arr.splice(start, len)
    },
    /**
     * 底部按钮 （status:    1： 未提交,2：已提交,3：已作废,4:已结案）
     * 1、未提交： 保存、提交、作废、返回
     * 2、已提交： 结案、返回
     * 3、已结案： 返回
     * 4、已作废： 返回
     * @returns {{typeAll: string, buttons: *[]}}
     */
    btnConfig() {
      let btns = []
      const baocun = this.ID === '-1' || this.status === 1 ? [
        {
          webname: 'save_xunyuancelue',
          type: 'default',
          text: '保存',
          btnclick: () => {
            this.saveFun()
          }
        }
      ] : []
      const tijiao = [
        {
          webname: 'tijiao_xunyuancelue',
          type: 'default',
          text: '提交',
          btnclick: () => {
            if (!this.submitLoading) {
              this.submitFun()
            }
          }
        }
      ]
      const zuofei = [
        {
          webname: 'zuofei_xunyuancelue',
          type: 'default',
          text: '作废',
          btnclick: () => {
            this.deleteAuthority();
          }
        }
      ]
      const jiean = [
        {
          webname: 'jiean_xunyuancelue',
          type: 'default',
          text: '结案',
          btnclick: () => {
            this.exeActionFun()
          }
        }
      ]
      if (this.status === 1 && this.ID !== '-1') {
        btns = [...tijiao, ...zuofei]
      } else if (this.status === 2) {
        btns = [...jiean]
      }
      const btnConfig = {
        typeAll: 'default',
        buttons: [
          ...baocun,
          ...btns,
          {
            webname: 'back_xunyuancelue',
            type: 'default',
            text: '返回',
            btnclick: () => {
              this.back()
            } // 按钮点击事件
          },
        ]
      }
      return btnConfig
    }
  },
  mounted() {
    this.getTypeList()
    if (this.ID !== '-1') {
      this.refresh()
    }
    $('#navBox li').click(function () {
      const index = $(this).index() || 0
      $(this).addClass('curr').siblings().removeClass('curr')
      const scrollTop = document.getElementById(`box-${index + 1}`).offsetTop
      $('#content').scrollTop(scrollTop - 20)
    });
    this.setrightBoxWidth();
  },
  activated() {
    $(window).on('resize', () => {
      this.setrightBoxWidth();
    });
  },
  destroyed() {
    $(window).off('resize');
  },
  methods: {
    refresh() {
      this.sgChannelSourceStrategyQueryFun()
      this.sgChannelSourceStrategyForceItemQueryFun()
      this.sgChannelSourceStrategyRuleItemQueryFun()
    },
    // 设置表格高度
    setrightBoxWidth() {
      const contentDisplayAreaWidth = document.getElementById('ContentDisplayArea').clientWidth
      this.$refs.rightBox.style.width = contentDisplayAreaWidth + 'px'
    },
    getTypeList() {
      const params = new FormData();
      const searchdata = {
        range: 999,
        startindex: 0,
        refcolid: '1700826986',
        isdroplistsearch: true,
      }
      params.append('searchdata', JSON.stringify(searchdata));
      this.service.common.QueryList(params).then(({data: res}) => {
        if (res.code === 0) {
          const data = res.datas.row || []
          this.typeList = data.map((item) => {
            return {
              label: item.ENAME.val,
              value: `${item.ID.val}`
            }
          });
        }
      });
    },
    /**
     * 详情 - 寻源规则
     */
    sgChannelSourceStrategyRuleItemQueryFun() {
      this.tableData2Loading = true
      this.service.inventoryCenter.SgChannelSourceStrategyRuleItemQuery({
        sgCChannelSourceStrategyId: this.ID,
        pageSize: this.page.pageSize,
        pageNumber: this.page.current, // 起始下标
      }).then((res) => {
        this.isChange2 = false
        this.tableData2Loading = false
        if (res.data.code === 0) {
          let data = res.data.data ? res.data.data.list : []
          this.page.total = res.data.data ? res.data.data.total : 0
          if (this.maxLevel === 0) {
            this.maxLevel = res.data.data ? Number(res.data.data.startRow) : 0
          }
          if (!res.data.data) {
            this.maxLevel = 0
          }
          const tableData2 = []
          data.forEach((item) => {
            tableData2.push({
              level: item.priority,
              newLine: false,
              rulers: item.ruleInfos,
            })
          })
          this.tableData2 = tableData2

        }
      })
    },
    /**
     * 详情 - 强制寻源规则
     */
    sgChannelSourceStrategyForceItemQueryFun() {
      this.loading = true
      this.service.inventoryCenter.SgChannelSourceStrategyForceItemQuery({
        sgCChannelSourceStrategyId: this.ID
      }).then((res) => {
        this.loading = false
        if (res.data.code === 0) {
          const data = res.data.data || []
          this.tableData1Detail = data
          const obj = {
            value: {
              TABLENAME: "CP_C_STORE",
              CONDITION: [],
              IN: [],
              NOTIN: [],
              EXCLUDE: [],
              GLOBAL: ""
            },
            total: 0,
            lists: {
              result: []
            },
            nameList: [],
            idArray: []
          }
          data.forEach((item) => {
            const store = []
            obj.total = item.storeInfos.length
            if (item.storeInfos.length) {
              this.tableData1 = []
            }
            item.storeInfos.forEach((item2) => {
              // 表格店仓 赋值
              store.push({
                ECODE: item2.cpCStoreEcode,
                ENAME: item2.cpCStoreEname,
                ID: item2.cpCStoreId,
                id: item2.id
              })
              // 弹窗 右侧列表赋值
              obj.value.IN.push(item2.cpCStoreEcode)
              obj.lists.result.push({
                screen_string: `[${item2.cpCStoreEcode}]${item2.cpCStoreEname}`,
                screen: item2.cpCStoreId,
                exclude: false,
                id_list: [item2.cpCStoreEcode]
              })
              obj.nameList.push({
                ENAME: item2.cpCStoreEname,
                ECODE: item2.cpCStoreEcode,
                MIXNAME: `[${item2.cpCStoreEcode}]${item2.cpCStoreEname}`,
                ID: item2.cpCStoreEcode
              })
              obj.idArray.push(item2.cpCStoreEcode)
            })
            // 表格赋值
            this.tableData1.push({
              type: `${item.sgCChannelSourceForceStrategyId}`,
              store
            })
          })

          // 更新弹窗右侧数据
          this.itemdata.pid = JSON.stringify(obj);
          this.fkDialog.lists = JSON.stringify(obj);
          this.itemdata.valuedata = `已选中${obj.total}条数据`;
        }
      })
    },
    /**
     * 详情 - 基础信息
     */
    sgChannelSourceStrategyQueryFun() {
      this.loading = true
      this.service.inventoryCenter.SgChannelSourceStrategyQuery({
        id: this.ID
      }).then((res) => {
        this.loading = false
        if (res.data.code === 0) {
          const data = res.data.data || []
          this.detailData = data
          const beginTime = this.$comUtils.dateFormat(new Date(data.beginTime), 'yyyy-MM-dd hh:mm:ss')
          const endTime = this.$comUtils.dateFormat(new Date(data.endTime), 'yyyy-MM-dd hh:mm:ss')

          this.formConfig1.formValue.ENAME = data.ename
          this.formConfig1.formValue.CP_C_PLATFORM_ID = data.cpCPlatformId
          this.formConfig1.formValue.CP_C_SHOP_ID = data.cpCShopId
          this.formConfig1.formValue.query_date = [beginTime, endTime]

          this.formConfig1.formData[1].itemdata.valuedata = `${data.cpCPlatformEname}`
          this.formConfig1.formData[1].itemdata.pid = `${data.cpCPlatformEcode}`
          this.formConfig1.formData[2].itemdata.valuedata = `${data.cpCShopTitle}`
          this.formConfig1.formData[2].itemdata.pid = `${data.cpCShopId}`

          this.formConfig2.formValue.SG_C_SHARE_SCORE_STRATEGY_ID = data.scoreItemResult.sgCShareScoreStrategyId;
          this.formConfig2.formData[0].itemdata.valuedata = `${data.scoreItemResult.sgCShareScoreStrategyEname}`
          this.formConfig2.formData[0].itemdata.pid = `${data.scoreItemResult.sgCShareScoreStrategyId}`
          this.scoringId = `${data.scoreItemResult.id}`
          if (data.status) {
            this.status = data.status
            // 不可编辑处理
            const disabled = Number(this.status) !== 1
            const setDisabledFun = (formConfig) => {
              this[formConfig].formData.forEach((item) => {
                if (item.disabled !== undefined) {
                  item.disabled = disabled
                } else if (item.itemdata !== undefined) {
                  item.itemdata.readonly = disabled
                }
              })
            }
            setDisabledFun('formConfig1')
            setDisabledFun('formConfig2')
          }

        }
      })
    },
    /**
     * 弹窗多选关闭
     */
    dialogClose() {
      console.log('弹窗多选关闭')
    },
    /**
     * 弹窗多选 确定
     * @param item
     */
    getFkdialog(item) {
      const ITEM = JSON.parse(item);
      this.itemdata.pid = '';
      this.itemdata.valuedata = '';
      if (ITEM.lists.result.length > 0) {
        this.itemdata.pid = item;
        this.fkDialog.lists = item;
        this.itemdata.valuedata = `已选中${ITEM.total}条数据`;
      } else {
        this.itemdata.pid = '';
        this.fkDialog.lists = {};
        this.itemdata.valuedata = '';
      }
      // 强制寻源规则 数据更新
      const data = this.itemdata.pid ? JSON.parse(this.itemdata.pid) : {}
      console.log(data.nameList)
      this.tableData1[0].store = data.nameList || []

    },
    makeSureTip() {
      if (this.ID !== '-1') {
        // 如果库里数据没有这么多页
        if (this.page.current > Math.ceil(this.page.total / this.page.pageSize) && this.page.total) {
          this.tableData2 = []
          return
        }
        this.sgChannelSourceStrategyRuleItemQueryFun()
      }
    },
    makeSureTip2() {
      const commonFun = () => {
        if (this.ID !== '-1') {
          // 如果库里数据没有这么多页
          if (this.page.current > Math.ceil(this.page.total / this.page.pageSize) && this.page.total) {
            this.tableData2 = []
            return
          }
          this.sgChannelSourceStrategyRuleItemQueryFun()
        }
      }
      if (this.isChange2) {
        this.$confirm('当前页有未保存数据，是否需要保存？', '警告', {
          confirmButtonText: '需要',
          cancelButtonText: '取消',
          confirmButtonClass: '',
          customClass: 'warning-alert',
          type: 'warning'
        }).then(() => {
          this.saveFun()
        }).catch(_ => {
          commonFun()
        });
      } else {
        commonFun()
      }
    },
    pageSizeChange(val) {
      this.page.pageSize = val;
      this.makeSureTip()

    },
    changePage(val) {
      this.page.current = val;
      this.makeSureTip()

    },
    /**
     * 添加标签
     * @param row
     * @param index
     */
    handleAdd(row, index) {
      this.fkDialog.dialog = true
    },
    /**
     * 关闭标签
     * @param event
     * @param name
     */
    handleClose(index, i, row) {
      // 弹窗右侧数据更新
      const data = JSON.parse(this.fkDialog.lists)
      data.idArray.splice(i, 1);
      data.lists.result.splice(i, 1);
      data.nameList.splice(i, 1);
      data.value.IN.splice(i, 1);
      this.itemdata.valuedata = `已选中${data.nameList.length}条数据`;
      this.fkDialog.lists = JSON.stringify(data)
      this.itemdata.pid = JSON.stringify(data)
      // 界面tag数据更新
      this.tableData1[index].store.splice(i, 1);
      console.log(this.tableData1Detail[0].storeInfos)
      console.log(row)
      let id = null
      if (this.tableData1Detail.length && this.tableData1Detail[0].storeInfos && this.tableData1Detail[0].storeInfos.length) {
        this.tableData1Detail[0].storeInfos.forEach((item) => {
          if (item.cpCStoreId === row.ID) {
            id = item.id
          }
        })
      }
      if (id) {
        this.sgChannelSourceStrategyForceItemDeleteFun(id) // 只有库里有的店 才调删除接口

      }
    },
    /**
     * 强制寻源规则删除
     * @param itemId 强制寻源规则明细id
     */
    sgChannelSourceStrategyForceItemDeleteFun(itemId) {
      this.service.inventoryCenter.SgChannelSourceStrategyForceItemDelete({
        itemId: itemId
      }).then((res) => {
        if (res.data.code === 0) {
          this.$Message.success(res.data.message || '删除成功！');
        }
      })
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
          menu: "寻源策略表",
        }
        const formdata = new FormData();
        formdata.append('actionid', 41460459);
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
     */
    submitFun() {
      this.$confirm('确认执行提交？', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        confirmButtonClass: '',
        customClass: 'warning-alert',
        type: 'warning'
      }).then(() => {
        this.submitLoading = true
        const formdata = new FormData();
        formdata.append('table', this.tableName);
        formdata.append('objid', this.ID);
        this.service.common.objectSubmit(formdata).then((res) => {
          this.submitLoading = false
          if (res.data.code === 0) {
            this.$Message.success('提交成功！');
            this.isChange = false
            this.refresh()
          }
        })
      });
    },
    /**
     * 保存
     */
    saveFun() {
      let isTrue = this.checkRuleFun('formConfig1')
      if (!isTrue) return
      const isTrue2 = this.checkRuleFun('formConfig2')
      if (!isTrue2) return
      const formValue1 = this.formConfig1.formValue
      const formValue2 = this.formConfig2.formValue

      // 主表
      const SG_C_CHANNEL_SOURCE_STRATEGY = {
        id: this.ID
      }
      if (this.ID === '-1' || (this.detailData.ename && formValue1.ENAME !== this.detailData.ename)) {
        SG_C_CHANNEL_SOURCE_STRATEGY.ENAME = formValue1.ENAME //策略名称
      }

      const beginTime = new Date(formValue1.query_date[0]).getTime() // 时间戳
      const endTime = new Date(formValue1.query_date[1]).getTime()// 时间戳
      if (this.ID === '-1' ? formValue1.query_date[0] !== '' : (beginTime !== this.detailData.beginTime || endTime !== this.detailData.endTime)) {
        SG_C_CHANNEL_SOURCE_STRATEGY.BEGIN_TIME = this.$comUtils.dateFormat(new Date(formValue1.query_date[0]), 'yyyy-MM-dd hh:mm:ss')
        SG_C_CHANNEL_SOURCE_STRATEGY.END_TIME = this.$comUtils.dateFormat(new Date(formValue1.query_date[1]), 'yyyy-MM-dd hh:mm:ss')
      }
      if (this.ID === '-1' ? formValue1.CP_C_SHOP_ID : formValue1.CP_C_SHOP_ID !== this.detailData.cpCShopId) {
        SG_C_CHANNEL_SOURCE_STRATEGY.CP_C_SHOP_ID = formValue1.CP_C_SHOP_ID
      }
      if (this.ID === '-1' ? formValue1.CP_C_PLATFORM_ID : `${formValue1.CP_C_PLATFORM_ID}` !== `${this.detailData.cpCPlatformEcode}`) {
        SG_C_CHANNEL_SOURCE_STRATEGY.CP_C_PLATFORM_ID = formValue1.CP_C_PLATFORM_ID
      }
      console.log(222, formValue1)
      if (!formValue1.CP_C_SHOP_ID && !formValue1.CP_C_PLATFORM_ID) {
        this.$Message.warning('来源平台和平台店铺不能均为空!');
        return
      }


      // 明细表 评分策略
      const SG_C_CHANNEL_SOURCE_STRATEGY_SCORE_ITEM = {
        id: this.scoringId,
        sgCShareScoreStrategyId: formValue2.SG_C_SHARE_SCORE_STRATEGY_ID,  //评分策略id
      }

      let params = {
        SG_C_CHANNEL_SOURCE_STRATEGY,
        SG_C_CHANNEL_SOURCE_STRATEGY_SCORE_ITEM
      }

      // 如果 强制寻源规则 有值
      if (this.tableData1.length) {
        // 明细表 明细表强制寻源规则
        const storeInfo = []
        const detailArr = this.tableData1Detail.length ? this.tableData1Detail[0].storeInfos : [] // 详情数据
        const SG_C_CHANNEL_SOURCE_STRATEGY_FORCE_ITEM = []
        this.tableData1.forEach((item) => {
          item.store.forEach((item) => {
            let id = '-1'
            detailArr.forEach((item2) => {
              if (item.ID === item2.cpCStoreId) {
                id = item.ID
              }
            })
            storeInfo.push({
              id: id,
              cpCStoreId: item.ID
            })
          })
          SG_C_CHANNEL_SOURCE_STRATEGY_FORCE_ITEM.push({
            sgCChannelSourceForceStrategyId: this.tableData1[0].type,  // 类型id
            storeInfos: storeInfo
          })
        })
        params.SG_C_CHANNEL_SOURCE_STRATEGY_FORCE_ITEM = SG_C_CHANNEL_SOURCE_STRATEGY_FORCE_ITEM
      }
      // 如果 寻源规则 有值
      if (this.tableData2AndNewLineData.length) {
        // 明细表 寻源规则
        const SG_C_CHANNEL_SOURCE_STRATEGY_RULE_ITEM = []
        this.tableData2AndNewLineData.forEach((item) => {
          const shareSourceRuleStrategyInfos = []
          if (item.isChanged || item.newLine) {
            item.rulers.forEach((item2) => {
              shareSourceRuleStrategyInfos.push({
                id: item2.id || -1,
                isactive: item2.isactive,
                sgCShareSourceRuleStrategyId: item2.sgCShareSourceRuleStrategyId,
                sgCShareSourceRuleStrategyEcode: item2.sgCShareSourceRuleStrategyEcode,
                sgCShareSourceRuleStrategyEname: item2.sgCShareSourceRuleStrategyEname
              })
            })
            SG_C_CHANNEL_SOURCE_STRATEGY_RULE_ITEM.push({
              priority: item.level,
              newLine: Boolean(item.newLine),
              shareSourceRuleStrategyInfos: shareSourceRuleStrategyInfos
            })
          }

        })
        params.SG_C_CHANNEL_SOURCE_STRATEGY_RULE_ITEM = SG_C_CHANNEL_SOURCE_STRATEGY_RULE_ITEM
      }

      this.service.inventoryCenter.sgChannelSourceStrategySave(params).then((res) => {
        if (res.data.code === 0) {
          this.isChange = false
          this.isChange2 = false
          if (this.ID === '-1') {
            this.$store.commit('customize/TabHref', {
              id: res.data.data, // id
              type: 'action', // 类型action
              name: 'SOURCSTRATEGYDETAIL', // 文件名
              label: '寻源策略表', //  tab中文名
            });
          }
          this.$Message.success(window.vmI18n.t('modalTips.z9')); // '保存成功'
          this.tableData2PartNewLine = []
          this.sgChannelSourceStrategyRuleItemQueryFun()
        } else {
          this.$Message.error(res.data.message);
        }
      })
    },
    /**
     * 新增行
     */
    addRowFun() {
      this.isChange = true
      this.addLineLoading = true
      this.service.inventoryCenter.SgChannelSourceStrategyRuleItemNewLine().then((res) => {
        this.addLineLoading = false
        if (res.data.code === 0) {
          const data = res.data.data || []
          this.maxLevel += 1
          // const level = this.ID !== '-1' ? this.maxLevel : Number(this.tableData2PartNewLine.length) + 1
          this.tableData2PartNewLine.push({
            level: this.maxLevel,
            newLine: true,
            rulers: data,
          })
        }
      })
    },
    /**
     * 删除行
     */
    delRowFun(i, row) {
      // 最后一条数据删除后要跳转到上一页
      const commonFun = () => {
        if (this.page.current > 1 && this.totalForFrontEnd - (this.page.current - 1) * this.page.pageSize < 2) {
          this.page.total = this.page.total - 1
          this.page.current = this.page.current - 1
        }
        this.sgChannelSourceStrategyRuleItemQueryFun()
      }
      if (!row.newLine) {
        // 删库里数据
        this.service.inventoryCenter.SgChannelSourceStrategyRuleItemDelete({
          priority: row.level,
          sgCChannelSourceStrategyId: this.ID
        }).then((res) => {
          this.addLineLoading = false
          if (res.data.code === 0) {
            this.$Message.success(res.data.message || '删除成功！');
            commonFun()
          }
        })
      } else {
        // 删本地数据
        this.tableData2PartNewLine.forEach((item, index) => {
          if (item.level === row.level) {
            this.tableData2PartNewLine.splice(index, 1);
          }
        })
      }

    },
    tabClick(e, index, i, row) {
      this.isChange = true
      this.isChange2 = true
      // this.tableData2ForFrontEndPage[index].rulers[i].isactive = e ? 'Y' : 'N'
      this.tableData2.forEach((item3, index3) => {
        if (item3.level === row.level) {
          this.tableData2[index3].isChanged = true
        }
      })
      this.tableData2AndNewLineData.forEach((item2, index2) => {
        if (item2.level === row.level) {
          this.tableData2AndNewLineData[index2].rulers[i].isactive = e ? 'Y' : 'N'
        }
      })
    },
    onOk() {
      this.$comUtils.tabCloseAppoint(this);
      this.$destroy(true);
      R3.store.commit('global/tabOpen', {
        type: 'S',
        tableName: 'SG_C_CHANNEL_SOURCE_STRATEGY',
        tableId: 249230899,
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
  }
};

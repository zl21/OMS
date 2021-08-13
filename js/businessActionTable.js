// const _import = (file) =>
//   require(`commonPage/${process.env.BRANCH_ENV}/page/${file}.vue`).default
import businessButton from '../businessButton'
import businessForm from '../businessForm'
import i18n from "@burgeon/internationalization/i18n";
window.$i18n = i18n

export default {
  components: {
    businessButton,
    businessForm,
  },
  props: {
    jordanTableConfig: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      FormPadding:'',
      vmI18n: i18n,
      // 输入框文字
      searchInputValue: '',
      // 输入框前搜索select
      searchSelectValue: '',
      // 动态渲染插槽组件
      currentView: null,
      // 详情-明细-buttons
      detailButtonsConfig: {
        typeAll: 'default', // 按钮统一风格样式
        btnsite: 'left', // 按钮位置 (right , center , left)
        buttons: [
          {
            text: $i18n.t('btn.refresh'),
            btnclick: () => {
              this.tableRefreshDetail();
            }, // 按钮点击事件
            class: 'deleteDetail',
          },
          {
            text: $i18n.t('btn.addDetail'),
            btnclick: () => {
              this.tableAddDetail();
            },
            class: 'deleteDetail',
          },
          {
            text: $i18n.t('btn.deleteDetail'),
            btnclick: () => {
              this.tableDeleteDetail();
            },
            class: 'deleteDetail',
          },
          {
            text: $i18n.t('btn.import'),
            btnclick: () => {
              this.isShowImportBtn();
            },
            class: 'import',
          },
          {
            text: $i18n.t('btn.export'),
            btnclick: () => {
              this.isShowExportBtn();
            },
            class: 'export',
          }
        ]
      }, // 按钮配置
    }
  },
  computed: {
     // 获取当前展示几列
     colRowNum(){
      return $store.state.customize.colRowNum;
    },
    // 展示表头否
    showHeader() {
      return this.jordanTableConfig.showHeader ?? true;
    },
    noDataText() {
      return this.jordanTableConfig.noDataText ?? $i18n.t('other.noDataAvailable'); // 暂无数据
    },
    // 是否高亮
    highlightRow() {
      let highlightRow = Boolean
      return highlightRow = this.jordanTableConfig.highlightRow === undefined ? false : this.jordanTableConfig.highlightRow;
    },
    // 是否单选
    multiple(){
      let multiple = Boolean
      return multiple = this.jordanTableConfig.multiple === undefined ? true : this.jordanTableConfig.multiple;
    },
    // 搜索框前文字
    isSearchText() {
      return this.jordanTableConfig.isSearchText
    },
    // 搜索框前搜索数组
    searchSelectList() {
      if (!this.jordanTableConfig.searchSelectList) {
        this.jordanTableConfig.searchSelectList = []
      }
      return this.jordanTableConfig.searchSelectList
    },
    // 表头显示数据
    columns() {
      let columnsData = [...this.jordanTableConfig.columns]
      if (this.jordanTableConfig.indexColumn) {
        // 是否存在序号列
        columnsData.unshift({
          // title: '序号',
          title: $i18n.t('table_label.serialNo'),
          key: 'index',
          align: 'left',
          fixed: 'left',
          width: 40,
          // renderHeader: (h, params) => h("div","序号"),
          render: (h, params) =>
            h(
              'span', {
                style: {
                  color: '#0f8ee9',
                },
              },
              params.index + 1
            ),
        })
      }
      if (this.jordanTableConfig.isShowSelection) {
        // 是否存在多选
        columnsData.unshift({
          type: 'selection',
          align: 'center',
          fixed: 'left',
          width: 30,
        })
      }
      if (this.jordanTableConfig.isShowAction) {
        // 是否存在多选
        columnsData.push({
          title: 'Action',
          key: 'action',
          align: 'center',
          fixed: 'right',
          width: 50,
          renderHeader: (h, params) => h('span', '操作'),
        })
      }
      // 判断是否存在自定义列
      if (this.renderArr.length > 0) {
        this.jordanTableConfig.renderArr.map((newItem, newIndex) => {
          columnsData.forEach((oldItem) => {
            if (oldItem.key === newItem.key) {
              oldItem.render = newItem.render;
              oldItem.ellipsis = newItem.ellipsis === undefined ? true : newItem.ellipsis,
                oldItem.width = newItem.width
            }
          })
        })
      }
      // console.log(new Date(), "组件列");
      // if (!this.jordanTableConfig.data.length) return []
      return columnsData
    },
    // 自定义列
    renderArr() {
      if (!this.jordanTableConfig.renderArr) {
        this.jordanTableConfig.renderArr = []
      }
      return this.jordanTableConfig.renderArr
    },
    // 表格显示数据
    data() {
      if (!this.jordanTableConfig.data) {
        this.jordanTableConfig.data = []
      }
      // console.log(new Date(), "组件data");
      return this.jordanTableConfig.data
    },

    totalData() {
      //孙乾添加合计数据
      if (!this.jordanTableConfig.totalData) {
        this.jordanTableConfig.totalData = []
      }
      return this.jordanTableConfig.totalData
    },
    // 是否显示纵向边框
    border() {
      return this.jordanTableConfig.border
    },
    //控制分页是否显示
    pageShow() {
      return this.jordanTableConfig.pageShow
    },
    // 控制操作按钮是否显示
    btnsShow() {
      return this.jordanTableConfig.btnsShow
    },
    // 控制是否显示新增明细
    isShowAddDetailBtn() {
      /* if (!this.jordanTableConfig.isShowAddDetailBtn) {
        const _index = (this.detailButtonsConfig.buttons || []).findIndex((item) => item.text === '新增明细');
        this.detailButtonsConfig.buttons.splice(_index,1)
      } */
      return this.jordanTableConfig.isShowAddDetailBtn
    },
    // 控制是否显示刷新按钮
    isShowRefreshBtn() {
      return this.jordanTableConfig.isShowRefreshBtn
    },
    // 控制是否显示删除明细
    isShowDeleteDetailBtn() {
      return this.jordanTableConfig.isShowDeleteDetailBtn
    },
    // 控制是否显示导入
    isShowImportBtn() {
      return this.jordanTableConfig.isShowImportBtn
    },
    // 控制是否显示导出
    isShowExportBtn() {
      return this.jordanTableConfig.isShowExportBtn
    },
    // 控制搜索框是否显示
    searchInputShow() {
      return this.jordanTableConfig.searchInputShow
    },
    // 表格宽度
    width() {
      return this.jordanTableConfig.width
    },
    // 表格高度
    height() {
      return this.jordanTableConfig.height
    },
    // 数据总数
    total() {
      if (!this.jordanTableConfig.total) {
        this.jordanTableConfig.total = 0
      }
      return this.jordanTableConfig.total
    },
    // 是否加载中
    loading() {
      return this.jordanTableConfig.loading
    },
    // 每页条数切换的配置
    pageSizeOpts() {
      if (!this.jordanTableConfig.pageSizeOpts) {
        this.jordanTableConfig.pageSizeOpts = [10, 20, 30, 40]
      }
      return this.jordanTableConfig.pageSizeOpts
    },
    // 每页条数
    pageSize() {
      if (!this.jordanTableConfig.pageSize) {
        this.jordanTableConfig.pageSize = 20
      }

      return this.jordanTableConfig.pageSize
    },
    // 页数
    current() {
      if (!this.jordanTableConfig.current) {
        this.jordanTableConfig.current = 1
      }
      return this.jordanTableConfig.current
    },
    // 是否产生拖拽
    draggable() {
      return this.jordanTableConfig.draggable
    },
    // 表单配置文件
    businessFormConfig() {
      return this.jordanTableConfig.businessFormConfig
    },
    gridBar(){
      return (this.jordanTableConfig.businessFormConfig && this.jordanTableConfig.businessFormConfig.gridBar) || false
    },
    formDataLength(){
      return (this.jordanTableConfig.businessFormConfig && this.jordanTableConfig.businessFormConfig.formData.length) || 0
    },
    noGridBar(){
      let widths = 0
      if(this.jordanTableConfig.businessFormConfig && this.jordanTableConfig.businessFormConfig.formData){
        this.jordanTableConfig.businessFormConfig.formData.forEach(i=>{
          i.style && (widths += Number(i.width))
        })
      }
      return Number.isInteger(widths / 24)
    },
    // 按钮配置文件
    businessButtonConfig() {
      return this.jordanTableConfig.businessButtonConfig
    },
    name() {
      return this.jordanTableConfig.name
    },
    url() {
      return this.jordanTableConfig.url
    },
    componentData() {
      return this.jordanTableConfig.componentData
    },
  },
  mounted() {
    const _self = this
    if (!_self.url && !_self.name) {} else {
      let componentName = _self.name
      Vue.component(componentName, Vue.extend(_self.url))
      _self.currentView = componentName
    }
  },
  methods: {
    // 行样式修改
    rowClassName(row, index) {
      if (row.isGray) {
        // 订单中心详情-订单明细行背景置灰
        return 'table-yellow-row'
      }else if (row.isColorGray) {
        // 订单中心列表-已取消/系统作废行的字体颜色置灰
        return 'color-gray-row'
      }else if (row.isOutOfStock) {
        // 订单中心详情-订单明细行缺货字体置红
        return 'color-red-row'
      }
      return ''
    },
    // 分页change 事件
    pageChange(val) {
      this.$emit('on-page-change', val)
    },
    // 切换分页条数
    onPageSizeChange(val) {
      this.$emit('on-page-size-change', val)
    },
    // 拖拽函数回调，返回当前拖拽完成后的表头
    draggableMethod(columns) {
      // console.log(columns.length)
      this.$emit('on-drag-drop', columns)
    },
    // 选中某一项时触发
    onSelect(selection, row) {
      // console.log(selection,row)
      this.$emit('on-select', selection, row)
    },
    // 取消选中某一项时触发
    onSelectCancel(selection, row) {
      this.$emit('on-select-cancel', selection, row)
    },
    // 点击全选时触发
    onSelectAll(selection) {
      this.$emit('on-select-all', selection)
    },
    // 点击取消全选时触发
    onSelectAllCancel(selection) {
      this.$emit('on-select-all-cancel', selection)
    },

    // 单击某一行时触发
    onRowClick(row, index) {
      if (
        this.jordanTableConfig.isShowSelection ||
        this.jordanTableConfig.columns[0].type === 'selection'
      ){
        if(!this.jordanTableConfig.rowClickNoSelected){
          this.$refs.selections.toggleSelect(index)
        }
      }
      this.$emit('on-row-click', row, index)
    },
    // 单击某二行时触发
    onRowDblclick(row, index) {
      this.$emit('on-row-dblclick', row, index)
    },
    // 单选某一行
    onCurrentChange(currentRow, oldCurrentRow) {
      this.$emit('on-current-change', currentRow, oldCurrentRow)
    },
    // 刷新按钮
    tableRefreshDetail() {
      this.$emit('table-refresh-detail')
    },
    // 删除明细
    tableDeleteDetail() {
      this.$emit('table-delete-detail')
    },
    // 新增明细
    tableAddDetail() {
      this.$emit('table-add-detail')
    },
    // 导入
    tableImport() {
      // this.$children.find(item => item.name === "importTable").openConfirm();
      this.$emit('table-import')
    },
    // 导出
    tableExport() {
      this.$emit('table-export')
    },
    // input 按下回车键时触发
    searchOnEnter(event, vm) {
      this.$emit('search-on-enter', this.searchInputValue, event, vm)
    },
    // input 	数据改变时触发
    searchOnChange(event, vm) {
      this.$emit('search-on-change', this.searchInputValue, event, vm)
    },
    // 选择框 change事件
    searchSelectOnChange(item) {
      this.$emit('search-select-on-ohange', this.searchSelectValue, item)
    },
  },
}
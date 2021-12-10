import listeningToKeydownMixin from '@/assets/js/mixins/listeningToKeydown'

export default {
  mixins: [listeningToKeydownMixin],
  data() {
    return {
      objid: '',
      url: '',
      loading: false,
      onRowData: '', // 选中数据
      tableConfig: {
        businessFormConfig: {
          formValue: {
            SKU_CODE: '',
            SPU_CODE: '',
            SPU_NAE: '',
            number: 1,
          },
          formData: [
            {
              label: $it('tL.code_SKU'), // SKU编码
              style: 'dimSearch',
              width: '8',
              value: 'SKU_CODE',
              columns: ['value'],
              AuotData: [], //匹配的选项
              dimChange: (search) => {
                //模糊查询的方法
                // this.fuzzyquerybyak(search)
              },
              dimEnter: (val) => {
                this.searchGift()
              },
              dimSelect: (obj) => { },
              dimblur: () => { },
            },
            {
              label: $it('tL.itemNo01'), // SPU编码
              style: 'dimSearch',
              width: '8',
              value: 'SPU_CODE',
              columns: ['ECODE'],
              AuotData: [], //匹配的选项
              dimChange: (search) => { },
              dimEnter: (val) => {
                this.searchGift()
              },
              dimSelect: (obj) => { },
              dimblur: () => { },
            },
            {
              style: 'dimSearch', //输入框类型
              label: $it("tL.itemNo02"), // SPU名称 输入框前文字
              value: 'SPU_NAE', //输入框的值
              columns: ['ENAME'],
              width: '8',
              AuotData: [], //匹配的选项
              dimChange: (search) => { },
              dimEnter: (val) => {
                this.searchGift()
              },
              dimSelect: (obj) => { },
              dimblur: () => { },
            },

          ],
        },
        // searchBtn
        businessButtonConfig: {
          typeAll: 'default', // 按钮统一风格样式
          btnsite: 'right', // 按钮位置 (right , center , left)
          buttons: [
            {
              text: '搜索',
              type: "primary",
              btnclick: () => {
                this.tableConfig.current = 1
                this.skuEcodes = ""
                this.onRowData = ""
                this.searchGift()
              }, // 按钮点击事件
            },
          ],
        },
        indexColumn: true,
        isShowSelection: true,
        columns: [
          {
            key: 'skuEcode',
            title: $it('tL.code_SKU'), // SKU编码
          },
          {
            key: 'spuEcode',
            title: $it('tL.itemNo01'), // SPU编码
          },
          {
            key: 'spuEname',
            title: $it("tL.itemNo02"), // SPU名称
          },
          {
            key: 'skuEname',
            title: $it('fL.skuName'), // SKU名称
          },
          {
            key: 'brandEname',
            title: '品牌',
          },
          {
            key: 'classifyEname',
            title: '商品分类',
          },
        ],
        data: [],
        pageShow: true, // 控制分页是否显示
        btnsShow: true, // 控制操作按钮是否显示
        searchInputShow: false, // 控制搜索框是否显示
        width: '', // 表格宽度
        height: '300', // 表格高度
        border: true, // 是否显示纵向边框
        total: 0, // 设置总条数
        pageSizeOpts: [10, 20, 30, 50, 100], // 每页条数切换的配置
        pageSize: 10, // 每页条数
        highlightRow: true,
        multiple: false
      },
      btnConfig: {
        typeAll: 'default', // 按钮统一风格样式
        btnsite: 'right', // 按钮位置 (right , center , left)
        buttons: [
          {
            disabled: false,
            text: $it('com.cancel'),
            btnclick: () => {
              this.$parent.$parent.closeConfirm();
            }, // 按钮点击事件
          },
          {
            text: $it('com.determine'),
            disabled: false,
            btnclick: () => {
              if (!this.skuEcodes) {
                this.$Message.warning("请选中操作的数据")
                return
              }
              this.btnConfig.buttons[1].disabled = true;
              if (this.type == 'add') {
                this.saveOrderByPro() // 添加订单商品信息-确定添加
              } else if (this.type == 'del') {
                this.deleteOrderGoods()
              } else if (this.type == 'replace') {
                this.parseOrderList() //确认解析
              } else {
                this.submit()
              }
            },
          },
        ],
      },
      skuEcodes: '',
      type: '', //组件传过来的类型，区分那里过来的
    }
  },
  components: {},
  props: {
    componentData: {
      type: Object,
    },
  },

  methods: {
    saveOrderByPro() {
      let orderList = []
      this.componentData.data.forEach((em) => {
        let obj = {
          orderId: em.ID, //订单id
          billNo: em.BILL_NO, //单据编号
        }
        orderList.push(obj)
      })

      let data = {
        skuEcodes: [this.skuEcodes],
        orderList,
        initNumber: this.tableConfig.businessFormConfig.formValue.number,
      }
      this.service.orderCenter.saveOrderByPro(data).then((res) => {
        setTimeout(() => {
          this.btnConfig.buttons[1].disabled = false;
        }, 5000);
        setTimeout(() => {
          this.$parent.$parent.closeConfirm();
        }, 1000)
        if (res.data.code == 0) {
          this.$Message.success(res.data.message)
          this.$parent.$parent.$parent.$parent.getDetailsData()
        } else if (res.data.code === -1) {
          this.$Modal.confirm({
            title: "message",
            width: 500,
            className: 'ark-dialog',
            mask: true,
            render: h => h('div', {
            }, res.data.data[0].message)
          });
        }


      })
    },
    deleteOrderGoods() {
      let orderList = []
      this.componentData.data.forEach((em) => {
        let obj = {
          orderId: em.ID, //订单id
          billNo: em.BILL_NO, //单据编号
        }
        orderList.push(obj)
      })

      let data = {
        skuEcodes: [this.skuEcodes],
        orderList,
      }
      this.service.orderCenter.deleteOrderGoods(data).then((res) => {
        setTimeout(() => {
          this.btnConfig.buttons[1].disabled = false;
        }, 5000);

        if (res.data.code == 0) {
          this.$Message.success(res.data.message)

        } else {
          if (!res.data.data) {
            $utils.tipShow('error', self, res.data.message)
            return
          }
          this.$Modal.confirm({
            title: res.data.message,
            width: 500,
            mask: true,
            className: 'ark-dialog',
            render: (h) => {
              if (res.data.data) {
                return h('Table', {
                  props: {
                    columns: [
                      {
                        title: "单据编号", // '提示信息',
                        key: 'billNo',
                      },
                      {
                        title: $it('mT.a6'), // '提示信息',
                        key: 'message',
                      },
                    ],
                    data: res.data.data,
                  },
                })
              }
              return false
            },
          })
        }
        this.$parent.$parent.closeConfirm()
      })
    },
    parseOrderList() {
      let orderList = []
      this.componentData.data.forEach((em) => {
        let obj = {
          orderId: em.ID, //订单id
          billNo: em.BILL_NO, //单据编号
        }
        orderList.push(obj)
      })

      let data = {
        skuEcodes: [this.skuEcodes],
        orderList,
      }
      this.service.orderCenter.parseOrderList(data).then((res) => {
        setTimeout(() => {
          this.btnConfig.buttons[1].disabled = false;
        }, 5000);

        if (res.data.code == 0) {
          this.$Message.success(res.data.message)

        } else {
          if (!res.data.data) {
            $utils.tipShow('error', self, res.data.message)
            return
          }
          this.$Modal.confirm({
            title: res.data.message,
            width: 500,
            mask: true,
            className: 'ark-dialog',
            render: (h) => {
              if (res.data.data) {
                return h('Table', {
                  props: {
                    columns: [
                      {
                        title: "单据编号", // '提示信息',
                        key: 'billNo',
                      },
                      {
                        title: $it('mT.a6'), // '提示信息',
                        key: 'message',
                      },
                    ],
                    data: res.data.data,
                  },
                })
              }
              return false
            },
          })
        }
        this.$parent.$parent.closeConfirm()
      })
    },
    // 选中某一项时触发
    onSelect(v) {
      //  this.skuEcodes = v[0].skuEcode
      console.log(v)
    },
    // 取消选中某一项时触发
    onSelectCancel() { },
    // 点击全选时触发
    onSelectAll() { },
    // 点击取消全选时触发
    onSelectAllCancel() { },
    // 单击某一行时触发
    onRowClick(row) {
      console.log(row)
      this.skuEcodes = row.skuEcode
      this.onRowData = row
    },
    // 单击某二行时触发
    onRowDblclick() { },
    // 分页change 事件
    pageChange(val) {
      console.log(val);
      this.tableConfig.current = val
      this.searchGift()
    },
    // 切换分页条数
    pageSizeChange(val) {
      console.log(val);
      this.tableConfig.pageSize = val
      this.searchGift()
    },
    tableDeleteDetail() { },
    // 模糊搜索
    async fuzzyquerybyak(search) {
      if (this.url == '') {
        let fixedcolumns = {}
        const formData = new FormData()
        formData.append('ak', search)
        formData.append('colid', 171332)
        formData.append('fixedcolumns', JSON.stringify(fixedcolumns))
        const {
          data: { data },
        } = await this.service.com.fuzzyquerybyak(formData)
        this.tableConfig.businessFormConfig.formData[0].AuotData = data
      }
    },
    // 添加赠品
    add(obj) {
      // 判断是否是要加一行明细  还是更新数量
      const data = this.tableConfig.data
      const d = data.find((item) => item.ECODE === obj.ECODE)
      if (d) {
        // d.QTY = parseInt(d.QTY) + parseInt(obj.QTY);
        d.QTY = parseInt(obj.QTY) // 计算逻辑与列表页添加赠品同步
        this.tableConfig.data = [...data]
        this.onRowData = this.tableConfig.data[0]
      } else {
        // this.tableConfig.data.push(obj);
        this.tableConfig.data = [obj]
        this.onRowData = this.tableConfig.data[0]
      }
    },
    // 搜索赠品
    searchGift() {

      this.selectSkuProBySkuEcodeList()
    },
    // 提交
    async submit() {
      const self = this;
      if (!self.onRowData) {
        self.$Message.error($it('tip.eg')) // '无赠品可添加！'
        return
      }
      const ids = []
      ids.push(self.objid)
      $omsUtils.setLoading(true)
      const param = {
        ids,
      }
      this.btnConfig.buttons[0].loading = true
      const {
        data: { code, data, message },
      } = await this.service.orderCenter.batchAddGoods(param)
      if (code === 0) {
        self.$Message.success(message);
        self.$parent.$parent.$parent.$parent.autoRefresh();
        self.$parent.$parent.closeConfirm()
        this.btnConfig.buttons[0].loading = false;
      } else {
        this.btnConfig.buttons[0].loading = false;
        if (code === -1) {
          self.$Modal.confirm({
            title: message,
            width: 500,
            mask: true,
            render: (h) => {
              if (data) {
                return h('Table', {
                  props: {
                    columns: [
                      {
                        title: "单据编号", // '提示信息',
                        key: 'billNo',
                      },
                      {
                        title: $it('mT.a6'), // '提示信息',
                        key: 'message',
                      },
                    ],
                    data,
                  },
                })
              }
              return false
            },
          })
        }
      }
      setTimeout(() => {
        this.btnConfig.buttons[1].disabled = false;
      }, 5000);
      $omsUtils.setLoading()
    },
    // 回车
    onKeyDown(e) {
      if (e.keyCode == 27) {
        this.$parent.$parent.closeConfirm()
      }
    },
    selectSkuProBySkuEcodeList() {
      let data = {
        skuEcode: this.tableConfig.businessFormConfig.formValue.SKU_CODE,
        spuEcode: this.tableConfig.businessFormConfig.formValue.SPU_CODE,
        spuEname: this.tableConfig.businessFormConfig.formValue.SPU_NAE,
        size: this.tableConfig.pageSize,
        current: this.tableConfig.current,
      }

      if (this.type == 'replace') {
        data.isGroup = 'Y'
        data.groupType = 2
      }

      this.service.commodityCenter.selectSkuProBySkuEcodeList(data).then((res) => {
        this.tableConfig.total = res.data.data.total
        this.tableConfig.height = '458';
        this.tableConfig.columns = [
          // {
          //   title: '操作',
          //   key: 'isok',
          //   render: (h, params) => {
          //     return h('el-radio', {
          //       props: {
          //         value: params.row.index,
          //         label: params.row.index,
          //       },
          //       on: {
          //         change: (v) => {
          //           console.log(v)
          //         },
          //       },
          //     })
          //   },
          // },
          {
            key: 'skuEcode',
            title: $it('tL.code_SKU'), // SKU编码
          },
          {
            key: 'spuEcode',
            title: $it('tL.itemNo01'), // SPU编码
          },
          {
            key: 'spuEname',
            title: $it("tL.itemNo02"), // SPU名称
          },
          {
            key: 'skuEname',
            title: $it('fL.skuName'), // SKU名称
          },
          {
            key: 'brandEname',
            title: '品牌',
          },
          {
            key: 'classifyEname',
            title: '商品分类',
          },
        ]
        this.tableConfig.data = res.data.data.records.map((em, index) => {
          em.index = index + 1
          em.isok = false
          return em
        })
      })
    },
  },
  mounted() {
    const self = this
    console.log(this.componentData)
    this.type = this.componentData.type
    if (this.type == "add") {
      let obj = {
        style: 'input', //输入框类型
        label: '数量', //输入框前文字
        value: 'number', //输入框的值
        regx: /^[1-9]\d*(\.\d+)?$/,
        maxlength: 8,
        columns: ['number'],
        width: '8',
        AuotData: [], //匹配的选项
        dimChange: (search) => { },
        dimEnter: (val) => { },
        dimSelect: (obj) => { },
        dimblur: () => { },
      }
      self.tableConfig.businessFormConfig.formData.push(obj)
    }


    if (this.componentData && this.componentData.ID) {
      self.objid = this.componentData.ID
    }
  },
}

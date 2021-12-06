export default {
  components: {},
  data() {
    return {
      pro: '',
      replace_pro: '',
      radioValue: '2',
      btnConfig: {
        typeAll: 'default', // 按钮统一风格样式
        btnsite: 'right', // 按钮位置 (right , center , left)
        buttons: [
          {
            text: $it('com.cancel'), // 取消
            btnclick: () => {
              this.$parent.$parent.closeConfirm()
            }, // 按钮点击事件
          },
          {
            text: $it('com.determine'), // 确定
            btnclick: () => {
              this.confirm()
            },
          },
        ],
      },
      proName: '',
      replace_proName: '',
      tableConfig: {
        businessFormConfig: {
          formValue: {
            searchValue: '',
            psCProEcode: '',
            proName: "",
          },
          formData: [
            {
              label: $it('table_label.code_SKU'), // '商品SKU',
              style: 'dimSearch',
              width: '12',
              value: 'searchValue',
              columns: ['ECODE'],
              AuotData: [], // 匹配的选项
              dimChange: async (val) => {

              },
              dimEnter: () => {
                this.search('one')
              },
              dimSelect: (val) => {
                this.tableConfig.businessFormConfig.formValue.searchValue = val.label
              },
            },
            {
              label: $it('table_label.itemNo01'), // '商品款号',
              style: 'dimSearch',
              width: '12',
              value: 'psCProEcode',
              columns: ['ECODE'],
              AuotData: [], // 匹配的选项
              dimChange: async (val) => {

              },
              dimEnter: () => {
                this.tableConfig.current = 1
                this.search('one')
              },
              dimSelect: (val) => {
                this.tableConfig.businessFormConfig.formValue.psCProEcode = val.label
                // this.psCProEcode = val.label;
              },
            },
            {
              label: $it("table_label.itemNo02"),
              style: 'dimSearch',
              width: '12',
              value: 'proName',
              columns: ['ECODE'],
              AuotData: [], // 匹配的选项
              dimChange: async (val) => {

              },
              dimEnter: () => {
                this.tableConfig.current = 1
                this.search('one')
              },
              dimSelect: (val) => {
                this.tableConfig.businessFormConfig.formValue.proName = val.label
                // this.psCProEcode = val.label;
              },
            },
          ],
        },
        // searchBtn
        businessButtonConfig: {
          typeAll: 'default', // 按钮统一风格样式
          btnsite: 'right', // 按钮位置 (right , center , left)
          buttons: [
            {
              text: $it("btn.search"),
              type: "primary",
              btnclick: () => {
                this.fnsearch('one')
              }, // 按钮点击事件
            },
          ],
        },
        indexColumn: true,
        isShowSelection: true,
        columns: [
          // {
          //   key: 'index',
          //   title: '序号',
          // },
          {
            key: 'skuEcode',
            title: $it('table_label.code_SKU'), // SKU编码
          },
          {
            key: 'spuEcode',
            title: $it('table_label.itemNo01'), // SPU编码
          },
          {
            key: 'spuEname',
            title: $it("table_label.itemNo02"), // SPU名称
          },
          {
            key: 'skuEname',
            title: $it('form_label.skuName'), // SKU名称
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
        height: '290', // 表格高度
        border: true, // 是否显示纵向边框
        total: 0, // 设置总条数
        pageSizeOpts: [10, 20, 30, 50, 100], // 每页条数切换的配置
        current: 1,
        pageSize: 10, // 每页条数
        highlightRow: true,
      },
      tableConfig2: {
        businessFormConfig: {
          formValue: {
            searchValue: '',
            psCProEcode: '',
            proName: ""
          },
          formData: [
            {
              label: $it('table_label.code_SKU'), // '商品SKU',
              style: 'dimSearch',
              width: '12',
              value: 'searchValue',
              columns: ['ECODE'],
              AuotData: [], // 匹配的选项
              dimChange: async (val) => {

              },
              dimEnter: () => {
                this.tableConfig.current2 = 1
                this.search('two')
              },
              dimSelect: (val) => {
                this.tableConfig2.businessFormConfig.formValue.searchValue = val.label
              },
            },
            {
              label: $it('table_label.itemNo01'), // '商品款号',
              style: 'dimSearch',
              width: '12',
              value: 'psCProEcode',
              columns: ['ECODE'],
              AuotData: [], // 匹配的选项
              dimChange: async (val) => {

              },
              dimEnter: () => {
                this.search('two')
              },
              dimSelect: (val) => {
                this.tableConfig2.businessFormConfig.formValue.psCProEcode = val.label
                // this.psCProEcode = val.label;
              },
            },
            {
              label: $it("table_label.itemNo02"),
              style: 'dimSearch',
              width: '12',
              value: 'proName',
              columns: ['ECODE'],
              AuotData: [], // 匹配的选项
              dimChange: async (val) => {

              },
              dimEnter: () => {
                this.tableConfig.current = 1
                this.search('one')
              },
              dimSelect: (val) => {
                this.tableConfig.businessFormConfig.formValue.proName = val.label
                // this.psCProEcode = val.label;
              },
            },
          ],
        },
        // searchBtn
        businessButtonConfig: {
          typeAll: 'default', // 按钮统一风格样式
          btnsite: 'right', // 按钮位置 (right , center , left)
          buttons: [
            {
              text: $it("btn.search"),
              type: "primary",
              btnclick: () => {
                this.fnsearch('two')
              }, // 按钮点击事件
            },
          ],
        },
        current: 1,
        indexColumn: true,
        isShowSelection: true,
        columns: [
          // {
          //   key: 'index',
          //   title: '序号',
          // },
          {
            key: 'skuEcode',
            title: $it('table_label.code_SKU'), // SKU编码
          },
          {
            key: 'spuEcode',
            title: $it('table_label.itemNo01'), // SPU编码
          },
          {
            key: 'spuEname',
            title: $it("table_label.itemNo02"), // SPU名称
          },
          {
            key: 'skuEname',
            title: $it('form_label.skuName'), // SKU名称
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
        height: '290', // 表格高度
        border: true, // 是否显示纵向边框
        total: 0, // 设置总条数
        pageSizeOpts: [10, 20, 30, 50, 100], // 每页条数切换的配置
        pageSize: 10, // 每页条数
        highlightRow: true,
      },
      replaceTableLoad: false,
      tableLoad: false,
      data: [],
      replace_data: [],
      onRowClickReplaceData: {},
      onRowClickData: {},
      onRowClickText: '',
      onRowClickReplaceText: '',

    }
  },
  props: {
    componentData: {
      type: Object,
    },
  },
  methods: {
    // 选中某一项时触发
    onSelect1(v) {
      //  this.skuEcodes = v[0].skuEcode
      console.log(v)
      console.log('----111')
    },
    // 取消选中某一项时触发
    onSelectCancel1() { },
    // 点击全选时触发
    onSelectAll1() { },
    // 点击取消全选时触发
    onSelectAllCancel1() { },
    // 单击某一行时触发
    onRowClick1(row) {
      console.log(row)
      this.onRowClickText = row.skuEcode
      this.skuEcodes = row.skuEcode
      this.onRowData = row
    },
    // 单击某二行时触发
    onRowDblclick1() { },
    // 分页change 事件
    pageChange1(val) {
      this.tableConfig.current = val
      // this.request(this.componentData);
      this.search('one')
    },
    // 切换分页条数
    pageSizeChange1(val) {
      this.tableConfig.pageSize = val
      this.search('one')
      // this.request(this.componentData);
    },
    tableDeleteDetail1() { },
    onSelect2(v) {
      //  this.skuEcodes = v[0].skuEcode
      console.log(v)
      console.log('----111')
    },
    // 取消选中某一项时触发
    onSelectCancel2() { },
    // 点击全选时触发
    onSelectAll2() { },
    // 点击取消全选时触发
    onSelectAllCancel2() { },
    // 单击某一行时触发
    onRowClick2(row) {
      console.log(row)
      this.onRowClickReplaceText = row.skuEcode
      this.skuEcodes2 = row.skuEcode
      this.onRowData2 = row
    },
    // 单击某二行时触发
    onRowDblclick2() { },
    // 分页change 事件
    pageChange2(val) {
      this.tableConfig2.current = val
      this.search('two')
    },
    // 切换分页条数
    pageSizeChange2(val) {
      this.tableConfig2.pageSize = val
      this.search('two')
    },
    tableDeleteDetail2() { },
    radioChange(value) {
      console.log(value)
    },
    fnsearch(val) {
      if (val == 'one') {
        this.tableConfig.current = 1
        this.onRowClickText = ''
        this.skuEcodes = ''
        this.onRowData = ''
      } else {
        this.tableConfig2.current = 1
        this.onRowClickReplaceText = ''
        this.skuEcodes2 = ''
        this.onRowData2 = ''
      }
      this.search(val)
    },
    async search(value) {
      const self = this
      let data = {}
      if (value == 'one') {
        data.skuEcode = self.tableConfig.businessFormConfig.formValue.searchValue.trim()
        data.spuEcode = self.tableConfig.businessFormConfig.formValue.psCProEcode.trim()
        data.spuEname = self.tableConfig.businessFormConfig.formValue.proName.trim()
        data.size = this.tableConfig.pageSize
        data.current = this.tableConfig.current
      } else {
        data.skuEcode = self.tableConfig2.businessFormConfig.formValue.searchValue.trim()
        data.spuEcode = self.tableConfig2.businessFormConfig.formValue.psCProEcode.trim()
        data.spuEname = self.tableConfig2.businessFormConfig.formValue.proName.trim()
        data.size = this.tableConfig2.pageSize
        data.current = this.tableConfig2.current
      }

      this.service.commodityCenter.selectSkuProBySkuEcodeList(data).then((res) => {
        if (value == 'one') { //current
          this.tableConfig.current = res.data.data.current
          this.tableConfig.total = res.data.data.total
          this.tableConfig.data = res.data.data.records
        } else {
          this.tableConfig2.current = res.data.data.current
          this.tableConfig2.total = res.data.data.total
          this.tableConfig2.data = res.data.data.records
        }
      })

      //console.log(self.replaceFormConfig.formValue.searchValue.trim())
      // sku查询
      // const self = this
      // const loadName = value === 'one' ? 'tableLoad' : 'replaceTableLoad'
      // this[loadName] = true
      // const query = {
      //   isBlur: 'N',
      //   psCSku: {
      //     ECODE:
      //       value == 'one'
      //         ? self.formConfig.formValue.searchValue.trim()
      //         : self.replaceFormConfig.formValue.searchValue.trim(),
      //     psCProEcode:
      //       value == 'one'
      //         ? self.formConfig.formValue.psCProEcode.trim()
      //         : self.replaceFormConfig.formValue.psCProEcode.trim(),
      //     psCProEname:
      //       value == 'one' ? self.proName.trim() : self.replace_proName.trim(),
      //   },
      // }
      // try {
      //   const res = await self.service.common.skuQuery(query)
      //   if (res.data.code == 0) {
      //     res.data.data.data.forEach((item) => {
      //       item.IS_GIFT = item.IS_GIFT == '0' ? '否' : '是'
      //     })
      //     if (value == 'one') {
      //       self.data = res.data.data.data
      //       self.onRowClickData = self.data[0]
      //       self.onRowClickText = self.data[0].ECODE
      //     } else {
      //       self.replace_data = res.data.data.data
      //       self.onRowClickReplaceData = self.replace_data[0]
      //       self.onRowClickReplaceText = self.replace_data[0].ECODE
      //     }
      //   } else {
      //     // this.$Message.warning("sku查询失败!");
      //     this.$Message.warning($it('modalTips.zt'))
      //   }
      //   this[loadName] = false
      // } catch (e) {
      //   this[loadName] = false
      // }
    },
    confirm() {
      let orderList = []
      let skuEcodes = []
      this.componentData.a_2.forEach((em) => {
        let obj = {
          orderId: em.ID, //订单id
          billNo: em.BILL_NO, //单据编号
        }
        orderList.push(obj)
      })
      if (!this.onRowData || !this.onRowData2) {
        this.$Message.warning($it('modalTips.d8'))
        return
      }
      skuEcodes.push(this.onRowData.skuEcode)
      skuEcodes.push(this.onRowData2.skuEcode)
      let data = {
        skuEcodes,
        orderList,
      }

      this.service.orderCenter.replaceOrderByPro(data).then((res) => {
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
                        title: $it('modalTitle.a6'), // '提示信息',
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
      /* const self = this
      if (JSON.stringify(self.onRowClickData) == '{}') {
        // self.$Message.warning("替换前商品sku不能为空!");
        self.$Message.warning($it('modalTips.yf'))
        return
      }
      if (JSON.stringify(self.onRowClickReplaceData) == '{}') {
        // self.$Message.warning("替换后商品sku码不能为空!");
        self.$Message.warning($it('modalTips.yg'))
        return
      }
      // if (self.onRowClickData.ECODE == self.onRowClickReplaceData.ECODE) {
      //   // self.$Message.warning("替换商品与被替换商品不能相同!");
      //   self.$Message.warning($it('modalTips.yh'));
      //   return;
      // }
      const result = {}
      const needParam = {
        IS_GIFT:
          self.onRowClickReplaceData.IS_GIFT == $it('com.yes')
            ? '0'
            : '1',
        PS_C_PRO_ECODE: self.onRowClickReplaceData.PS_C_PRO_ECODE,
        PS_C_PRO_ENAME: self.onRowClickReplaceData.PS_C_PRO_ENAME,
        PRICELIST: self.onRowClickReplaceData.PRICELIST,
        IS_GROUP: self.onRowClickReplaceData.IS_GROUP,
        SKU_ECODE: self.onRowClickReplaceData.ECODE,
        PS_C_PRO_ID: self.onRowClickReplaceData.PS_C_PRO_ID,
      }
      if (self.componentData.a_2.length == 0) {
        // self.$Message.warning("请勾选订单数据!");
        self.$Message.warning($it('modalTips.zu'))
        return
      }
      result.ids = self.componentData.a_2
      result.changeGoodsSku = self.onRowClickData.ECODE
      result.sku_code = needParam.SKU_ECODE
      result.type = 1
      console.log(this.componentData.a_1, result)
      $omsUtils.setLoading(true)
      const {
        data: { code, data, message },
      } = await this.service.orderCenter.bathChangeGoods(result)
      console.log(code, data, message)
      $omsUtils.setLoading()
      if (code == 0) {
        self.$Message.success(message)
        this.$parent.$parent.closeConfirm()
      } else {
        self.$Modal.confirm({
          title: message,
          width: 500,
          render: (h) =>
            h('Table', {
              props: {
                columns: [
                  {
                    // title: "提示信息",
                    title: $it('modalTitle.tips'),
                    key: 'message',
                  },
                ],
                data,
              },
            }),
        })
      }
      */
    },
    onRowClickReplace(row) {
      this.onRowClickReplaceData = row
      this.onRowClickReplaceText = row.ECODE
    },
    onRowClick(row) {
      this.onRowClickData = row
      this.onRowClickText = row.ECODE
    },
  },
}

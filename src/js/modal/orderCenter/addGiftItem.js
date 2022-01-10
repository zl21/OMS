import listeningToKeydownMixin from '@/assets/js/mixins/listeningToKeydown';

export default {
  mixins: [listeningToKeydownMixin],
  data() {
    return {
      onRowData: '', // 选中数据
      tableItemUrl: '/api/cs/oc/oms/v1/getOrderDetailList',
      tableConfig: {
        indexColumn: true,
        isShowSelection: false,
        columns: [
          {
            key: 'ECODE',
            title: $it('tL.commoditySKU'), // '商品SKU'
          },
          {
            key: 'sizeName',
            title: $it('other.size'), // '尺码'
          },
          {
            key: 'colorName',
            title: $it('other.color'), // '颜色'
          },
          {
            key: 'QTY',
            title: $it('tL.quantities'), // '数量'
          },
          {
            key: 'PS_C_PRO_ENAME',
            title: $it('tL.productName'), // '商品名称'
          },
          {
            key: 'GBCODE',
            title: $it('tL.internationalCode'), // '国际码'
          },
          {
            key: 'IS_GIFT',
            title: $it('tL.whetherGift'), // '是否赠品',
            render: (h, params) => {
              const IS_GIFT = params.row.IS_GIFT == 1 ? '是' : '否';
              return h('span', {}, IS_GIFT);
            }
          },
          {
            key: 'IS_DELETE',
            title: $it('tL.operation'), // '操作',
            render: (h, params) => h(
                'a',
                {
                  on: {
                    click: () => {
                      const index = params.index;
                      this.tableConfig.data.splice(index, 1);
                      if (this.onRowData.ECODE == params.row.ECODE) {
                        this.onRowData = '';
                      }
                    }
                  }
                },
                '删除'
              )
          }
        ],
        data: [],
        pageShow: false, // 控制分页是否显示
        btnsShow: true, // 控制操作按钮是否显示
        searchInputShow: false, // 控制搜索框是否显示
        width: '', // 表格宽度
        height: '', // 表格高度
        border: true, // 是否显示纵向边框
        total: 0, // 设置总条数
        pageSizeOpts: [10, 20, 30], // 每页条数切换的配置
        pageSize: 10 // 每页条数
      },
      matrixData: {
        // 商品SKU  数量  回调函数
        fun: obj => {
          const self = this;
          self.add(obj);
        }
      },
      objid: '',
      options: {}, // 自定义属性（选填）
      btnConfig: {
        typeAll: 'default', // 按钮统一风格样式
        btnsite: 'right', // 按钮位置 (right , center , left)
        buttons: [
          {
            text: $it('com.cancel'),
            btnclick: () => {
              this.$parent.$parent.closeConfirm();
            } // 按钮点击事件
          },
          {
            type: 'primary',
            text: $it('com.determine'),
            loading: false,
            btnclick: () => {
              this.submit();
            }
          }
        ]
      }
    };
  },
  props: {
    componentData: {}
  },
  watch: {
    componentData: {
      handler(newVal) {
        this.request(newVal);
      },
      deep: true
    }
  },
  methods: {
    // 选中某一项时触发
    onSelect() {},
    // 取消选中某一项时触发
    onSelectCancel() {},
    // 点击全选时触发
    onSelectAll() {},
    // 点击取消全选时触发
    onSelectAllCancel() {},
    // 单击某一行时触发
    onRowClick(row) {
      this.onRowData = row;
    },
    // 单击某二行时触发
    onRowDblclick() {},
    // 分页change 事件
    pageChange(val) {
      this.tableConfig.current = val;
      this.request(this.componentData);
    },
    // 切换分页条数
    pageSizeChange(val) {
      this.tableConfig.pageSize = val;
      this.request(this.componentData);
    },
    tableDeleteDetail() {},
    // 添加赠品
    add(obj) {
      // 判断是否是要加一行明细  还是更新数量
      const data = this.tableConfig.data;
      const d = data.find(item => item.ECODE === obj.ECODE);
      if (d) {
        // d.QTY = parseInt(d.QTY) + parseInt(obj.QTY);
        d.QTY = parseInt(obj.QTY); // 计算逻辑与列表页添加赠品同步
        this.tableConfig.data = [...data];
        this.onRowData = this.tableConfig.data[0];
      } else {
        // this.tableConfig.data.push(obj);
        this.tableConfig.data = [obj];
        this.onRowData = this.tableConfig.data[0];
      }
    },
    async submit() {
      const self = this;
      if (!self.onRowData) {
        self.$Message.error($it('tip.eg')); // '无赠品可添加！'
        return;
      }
      const ids = self.objid;
      self.loading = true;
      const param = {
        ids,
        changeGoodsSku: self.onRowData.ECODE,
        gift_type: 1,
        qty: self.onRowData.QTY
      };
      this.btnConfig.buttons[0].loading = true;
      const { data: { code, data, message } } = await this.service.orderCenter.batchAddGoods(param);
      if (code === 0) {
        self.$Message.success(message);
        self.$parent.$parent.$parent.$parent.autoRefresh();
        self.$parent.$parent.closeConfirm();
        this.btnConfig.buttons[0].loading = false;
        self.loading = false;
      } else {
        this.btnConfig.buttons[0].loading = false;
        self.loading = false;
        if (code === -1) {
          self.$Modal.confirm({
            title: message,
            width: 500,
            mask: true,
            render: h => {
              if (data) {
                return h('Table', {
                  props: {
                    columns: [
                      {
                        title: $it('mT.a6'), // '提示信息',
                        key: 'message'
                      }
                    ],
                    data
                  }
                });
              }
              return false;
            }
          });
        }
      }
    },
    request(req) {
      const self = this;
      // console.log('addGift', req);
      self.objid = req.objid;
    },
    getColumns() {
      const cols = [
        {
          key: 'ECODE',
          title: $it('tL.commoditySKU'), // '商品SKU'
        },
        {
          key: 'QTY',
          title: $it('tL.quantities'), // '数量'
        },
        {
          key: 'PS_C_PRO_ENAME',
          title: $it('tL.productName'), // '商品名称'
        },
        {
          key: 'GBCODE',
          title: $it('tL.internationalCode'), // '国际码'
        },
        {
          key: 'IS_GIFT',
          title: $it('tL.whetherGift'), // '是否赠品',
        }
      ];
      this.columns = cols;
    },
    showTable(obj) {
      const tbody = obj;
      this.tableConfig = Object.assign(this.tableConfig, {
        columns: this.columns,
        indexColumn: true, // 是否展示需要
        data: tbody,
        pageShow: true, // 控制分页是否显示
        btnsShow: true, // 控制操作按钮是否显示
        searchInputShow: true, // 控制搜索框是否显示
        width: '', // 表格宽度
        height: '', // 表格高度
        border: true, // 是否显示纵向边框
        total: obj.totalRowCount, // 设置总条数
        pageSizeOpts: obj.selectRange, // 每页条数切换的配置
        pageSize: obj.defaultrange // 每页条数
      });
    },
    onKeyDown(e) {
      if (e.keyCode == 27) {
        this.$parent.$parent.closeConfirm();
      }
    }
  },
  mounted() {
    this.getColumns();
    if (this.componentData && this.componentData.objid) {
      this.request(this.componentData);
    }
  }
};

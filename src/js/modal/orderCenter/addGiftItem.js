import businessButton from 'professionalComponents/businessButton';
import businessActionTable from 'professionalComponents/businessActionTable';
import EasyMatrix from 'professionalComponents/easyMatrix';
import { listeningToKeydownMixin } from '@/assets/js/mixins/listeningToKeydown';
import axios from 'axios';
import loading from '@/component/loading.vue';

export default {
  mixins: [listeningToKeydownMixin],
  data() {
    return {
      loading: false,
      onRowData: '', // 选中数据
      tableItemUrl: '/api/cs/oc/oms/v1/getOrderDetailList',
      tableConfig: {
        indexColumn: true,
        isShowSelection: false,
        columns: [
          {
            key: 'ECODE',
            title: '商品SKU'
          },
          {
            key: 'sizeName',
            title: '尺码'
          },
          {
            key: 'colorName',
            title: '颜色'
          },
          {
            key: 'QTY',
            title: '数量'
          },
          {
            key: 'PS_C_PRO_ENAME',
            title: '商品名称'
          },
          {
            key: 'GBCODE',
            title: '国际码'
          },
          {
            key: 'IS_GIFT',
            title: '是否赠品',
            render: (h, params) => {
              const IS_GIFT = params.row.IS_GIFT == 1 ? '是' : '否';
              return h('span', {}, IS_GIFT);
            }
          },
          {
            key: 'IS_DELETE',
            title: '操作',
            render: (h, params) =>
              h(
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
        typeAll: 'error', // 按钮统一风格样式
        btnsite: 'right', // 按钮位置 (right , center , left)
        buttons: [
          {
            text: '取消', // 按钮文本
            btnclick: () => {
              this.$parent.$parent.closeConfirm();
            } // 按钮点击事件
          },
          {
            text: '确定', // 按钮文本
            loading: false,
            btnclick: () => {
              this.submit();
            }
          }
        ]
      }
    };
  },
  components: {
    businessActionTable,
    EasyMatrix,
    businessButton,
    loading
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
        d.QTY = parseInt(d.QTY) + parseInt(obj.QTY);
        this.tableConfig.data = [...data];
        this.onRowData = this.tableConfig.data[0];
      } else {
        this.tableConfig.data.push(obj);
        this.onRowData = this.tableConfig.data[0];
      }
    },
    submit() {
      const self = this;
      if (!self.onRowData) {
        self.$Message.error('无赠品可添加！');
        return;
      }
      const ids = [];
      ids.push(self.objid);
      self.loading = true;
      const param = {
        ids,
        changeGoodsSku: self.onRowData.ECODE,
        gift_type: 1,
        qty: self.onRowData.QTY
      };
      this.btnConfig.buttons[0].loading = true;
      axios({
        url: '/api/cs/oc/oms/v1/batchAddGoods',
        method: 'post',
        data: param
      }).then(res => {
        // console.log(res);
        if (res.data.code === 0) {
          self.$Message.success(res.data.message);
          self.$parent.$parent.$parent.$parent.autoRefresh();
          self.$parent.$parent.closeConfirm();
          this.btnConfig.buttons[0].loading = false;
          self.loading = false;
        } else {
          // let mes = res.data.message || "失败";
          // self.$Message.error(mes);
          this.btnConfig.buttons[0].loading = false;
          self.loading = false;
          if (res.data.code === -1) {
            self.$Modal.confirm({
              title: res.data.message,
              width: 500,
              mask: true,
              render: h => {
                if (res.data.data) {
                  return h('Table', {
                    props: {
                      columns: [
                        {
                          title: '提示信息',
                          key: 'message'
                        }
                      ],
                      data: res.data.data
                    }
                  });
                }
              }
            });
          }
        }
      });
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
          title: '商品SKU'
        },
        {
          key: 'QTY',
          title: '数量'
        },
        {
          key: 'PS_C_PRO_ENAME',
          title: '商品名称'
        },
        {
          key: 'GBCODE',
          title: '国际码'
        },
        {
          key: 'IS_GIFT',
          title: '是否赠品'
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

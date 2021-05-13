import businessActionTable from 'professionalComponents/businessActionTable';
// import businessForm from "professionalComponents/businessForm";
import businessButton from 'professionalComponents/businessButton';
import listeningToKeydownMixin from '@/assets/js/mixins/listeningToKeydown.js';

export default {
  components: {
    businessActionTable,
    businessButton
  },
  mixins: [listeningToKeydownMixin],
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
  data() {
    return {
      btnConfig: {
        typeAll: 'default',
        btnsite: 'right',
        buttons: [
          {
            text: '搜索', // 按钮文本
            btnclick: () => {
              this.search();
            }
          }
        ]
      },
      btnConfig2: {
        typeAll: 'default', // 按钮统一风格样式
        btnsite: 'right', // 按钮位置 (right , center , left)
        buttons: [
          {
            text: '确定', // 按钮文本
            btnclick: () => {
              this.submit();
            }
          },
          // {
          //   text: "关闭", //按钮文本
          //   btnclick: () => {
          //     this.$parent.$parent.$parent.getData()
          //     this.$parent.$parent.closeConfirm();

          //   }
          // },
          {
            text: '取消', // 按钮文本
            btnclick: () => {
              this.$parent.$parent.closeConfirm();
            } // 按钮点击事件
          }
        ]
      },
      queryList: [
        {
          column: 'ECODE',
          label: '条码:',
          ecode: 5
        },
        {
          column: 'PS_C_PRO_ECODE',
          label: '商品编码:'
        },
        {
          type: 'select',
          column: 'IS_GIFT',
          label: '是否赠品:',
          render: (h, params) => {
            const IS_GIFT = params.row.IS_GIFT === 1 ? '是' : '否';
            return h('span', {}, IS_GIFT);
          }
        },
        {
          column: 'PS_C_PRO_ENAME',
          label: '商品名称:'
        },
        {
          column: 'GBCODE',
          label: '国标码:'
        }
      ],
      queryParams: {
        ECODE: '',
        PS_C_PRO_ECODE: '',
        IS_GIFT: '',
        PS_C_PRO_ENAME: '',
        GBCODE: ''
      },
      tableConfig: {
        indexColumn: true,
        isShowSelection: false,
        columns: [
          {
            key: 'PS_C_PRO_ENAME',
            title: '商品名称'
          },
          {
            key: 'PS_C_PRO_ECODE',
            title: '商品编码'
          },
          {
            key: 'ECODE',
            title: '条码'
          },
          {
            key: 'SPEC',
            title: '规格'
          },
          {
            key: 'PRICELIST',
            title: '销售价'
          },
          {
            key: 'GBCODE',
            title: '国标码'
          },
          {
            key: 'IS_GIFT',
            title: '是否赠品',
            render: (h, params) => {
              const IS_GIFT = params.row.IS_GIFT === '1' ? '是' : '否';
              return h('span', {}, IS_GIFT);
            }
          },
          {
            key: 'IS_GROUP',
            title: '是否组合商品',
            render: (h, params) => {
              const IS_GROUP = params.row.IS_GROUP === 'Y' ? '是' : '否';
              return h('span', {}, IS_GROUP);
            }
          }
        ],
        data: [],
        pageShow: true, // 控制分页是否显示
        btnsShow: true, // 控制操作按钮是否显示
        searchInputShow: false, // 控制搜索框是否显示
        width: '', // 表格宽度
        height: '350', // 表格高度
        border: true, // 是否显示纵向边框
        total: 0, // 设置总条数
        pageSizeOpts: [10, 20, 30], // 每页条数切换的配置
        pageSize: 10 // 每页条数
      },
      selection: {}
    };
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
      this.selection = row;
    },
    // 单击某二行时触发
    onRowDblclick(row) {
      this.selection = row;
    },
    // 分页change 事件
    pageChange(val) {
      this.tableConfig.current = val;
      this.search();
    },
    // 切换分页条数
    pageSizeChange(val) {
      this.tableConfig.pageSize = val;
      this.search();
    },
    tableDeleteDetail() {},
    async request(req) {
      const self = this;
      self.objid = req.objid || -1;
      self.itemobjid = req.itemobjid || -1;
      self.itemskuid = req.itemskuid || -1;
      const list = self.queryList || [];
      const param = {
        isBlur: 'Y',
        psCSku: {}
      };
      list.forEach(item => {
        if (item.column === 'IS_GIFT' && self.componentData.order) {
          param.isGift = self.componentData.order.IS_GIFT || 'Y';
        } else if (self.componentData && self.componentData.order) {
          param.psCSku[item.column] = self.componentData && self.componentData.order && self.componentData.order[item.column] ? self.componentData.order[item.column] : '';
        }
      });
    },
    async submit() {
      const self = this;
      const ECODE = this.selection && this.selection.ECODE ? this.selection.ECODE : '';
      if (ECODE === '') {
        // 请选择需要更换的商品
        self.$Message.error($i18n.t('modalTips.eb'));
        return;
      }
      if (self.itemskuid === this.selection.skuId) {
        // 不可以选择更换当前商品！
        self.$Message.error($i18n.t('modalTips.ec'));
        return;
      }
      const keys = {
        colorCode: 'COLOR_CODE',
        colorId: 'COLOR_ID',
        colorName: 'COLOR_NAME',
        sizeCode: 'SIZE_CODE',
        sizeId: 'SIZE_ID',
        sizeName: 'SIZE_NAME',
        skuId: 'SKU_ID',
        ECODE: 'SKU_ECODE',
        GBCODE: 'GBCODE',
        PRICELIST: 'PRICELIST',
        PS_C_PRO_ECODE: 'PS_C_PRO_ECODE',
        PS_C_PRO_ENAME: 'PS_C_PRO_ENAME',
        PS_C_PRO_ID: 'PS_C_PRO_ID',
        SPEC: 'SPEC',
        IS_GIFT: 'IS_GIFT',
        IS_GROUP: 'IS_GROUP'
      };
      const selection = JSON.parse(JSON.stringify(this.selection));
      let param = {
        oc_b_order_item_id: self.itemobjid || '',
        oc_b_order_id: self.objid
      };
      param = Object.assign(
        param,
        Object.keys(keys).reduce((row, key) => {
          const newKey = keys[key] || key;
          row[newKey] = selection[key];
          return row;
        }, {})
      );
      const { data: { code, message } } = await this.service.orderCenter.bathChangeGoods(param);
      if (code === 0) {
        self.$Message.info(message);
        self.$parent.$parent.$parent.getData();
        self.$parent.$parent.closeConfirm();
        self.$parent.$parent.$parent.selection = [];
      } else {
        self.$Message.error(message);
      }
      // axios({
      //   url: '/api/cs/oc/oms/v1/modifygoods',
      //   method: 'post',
      //   // cancelToken: true,
      //   data: param
      // }).then(res => {
      //   if (res.data.code === 0) {
      //     self.$Message.info(res.data.message);
      //     self.$parent.$parent.$parent.getData();
      //     self.$parent.$parent.closeConfirm();
      //     self.$parent.$parent.$parent.selection = [];
      //   } else {
      //     self.$Message.error(res.data.message);
      //   }
      // });
    },
    async search() {
      // 搜索
      const self = this;
      const p = JSON.parse(JSON.stringify(this.queryParams));
      // 检验搜索条件是否所有都为空，如果是，不允许搜索 2019-5-29
      const isNull = Object.values(p).every(item => item === '' || item === null);
      if (isNull) {
        // 请填写筛选条件
        self.$Message.warning($i18n.t('modalTips.ed'));
        return;
      }
      if (p.IS_GIFT != '') {
        p.IS_GIFT = p.IS_GIFT === $i18n.t('common.yes') ? 'Y' : 'N';
      } else {
        p.IS_GIFT = '';
      }
      const param = {
        isBlur: 'Y',
        offSet: this.tableConfig.current || 1, // 当前页
        limit: this.tableConfig.pageSize || 10, // 分页条数
        psCSku: p,
        IS_GIFT: p.IS_GIFT
      };
      const res = await self.service.common.skuQuery(param);
      if (res.data.code === 0) {
        const lists = res.data.data.data;
        self.tableConfig.data = lists;
        self.tableConfig.total = res.data.data.totleCount;
      }
    },

    onKeyDown(e) {
      if (e.keyCode == 27) {
        this.$parent.$parent.closeConfirm();
        this.$parent.$parent.$parent.publicBouncedIndex = {
          name: 'testModal'
        };
      }
    }
  },
  mounted() {
    this.request(this.componentData);
  },
  created() {}
};

import axios from 'axios';

export default {
  name: 'splitOrder',
  data() {
    return {
      old_cp_c_phy_warehouse_ename: '', // 保存原仓库
      columns: [
        {
          type: 'selection'
        },
        {
          title: '是否赠品',
          key: 'is_gift_name'
        },
        {
          title: '商品SKU',
          key: 'ps_c_sku_ecode'
        },
        {
          title: '商品名称',
          key: 'ps_c_pro_ename'
        },
        // {
        //   title: '商品信息',
        //   key: 'ps_c_clr_ename'
        // },
        {
          title: '商品SKU名称',
          key: 'ps_c_sku_ename'
        },
        {
          title: '原发货仓库',
          key: 'cp_c_phy_warehouse_ename'
        },
        {
          title: '建议发货仓库',
          key: 'advise_phy_warehouse_id',
          render: (h, params) => {
            console.log(params);
            const options = params.row.sgBPhyInStorageItemExt.map(item => h('Option', {
                style: {
                  'font-style': item.total_qty_available === 0 ? 'italic' : 'normal'
                },
                props: {
                  value: item.advise_phy_warehouse_id,
                  label: item.advise_phy_warehouse_ename
                }
              }));
            return h('div', [
              h(
                'Select',
                {
                  props: {
                    value: params.row.cp_c_phy_warehouse_id,
                    disabled: this.dataIndex !== 0
                  },
                  on: {
                    'on-change': value => {
                      const opt = params.row.sgBPhyInStorageItemExt.filter(item => item.advise_phy_warehouse_id == value)[0];
                      params.row.cp_c_phy_warehouse_id = value;
                      params.row.cp_c_phy_warehouse_ecode = opt.advise_phy_warehouse_ecode;
                      params.row.cp_c_phy_warehouse_ename = opt.advise_phy_warehouse_ename;
                      params.row.total_qty_available = opt.total_qty_available;
                      // params.row.total_qty_available = params.row.sgBPhyInStorageItemExt.filter(item => { return item.advise_phy_warehouse_id == value })[0].total_qty_available;
                      // 如果勾选了,同时更新勾选数据
                      if (this.onSelectData.length !== 0) {
                        this.onSelectData.forEach(item => {
                          if (params.row.orig_order_item_id == item.orig_order_item_id) {
                            item.cp_c_phy_warehouse_id = value;
                            item.cp_c_phy_warehouse_ecode = opt.advise_phy_warehouse_ecode;
                            item.cp_c_phy_warehouse_ename = opt.advise_phy_warehouse_ename;
                          }
                        });
                      }
                      this.data[0][params.index] = params.row;
                    }
                  }
                },
                options
              )
            ]);
          }
        },

        {
          title: '购买数量',
          key: 'qty'
        },
        {
          title: '可售数量',
          key: 'total_qty_available'
        },
        {
          title: '待拆数量',
          key: 'waiting_split_num'
        },
        {
          title: '拆分数量',
          key: 'split_num',
          width: 100,
          render: (h, params) => {
            console.log(params);
            return h('div', [
              h('Input', {
                props: {
                  value: params.row.split_num,
                  disabled: this.dataIndex !== 0
                },
                on: {
                  'on-change': value => {
                    params.row.split_num = value.target.value;
                    if (params.row.waiting_split_num - value.target.value < 0) {
                      this.$Message.warning('拆分数量不能大于待拆数量；不进行拆单');
                      this.$nextTick(() => {
                        params.row.split_num = params.row.waiting_split_num;
                        this.data[0][params.index] = params.row;
                      });
                      return;
                    }
                    // params.row.waiting_split_num = params.row.waiting_split_num - value.target.value;
                    // params.row.qty = params.row.waiting_split_num;
                    // 如果勾选了,同时更新勾选数据
                    if (this.onSelectData.length !== 0) {
                      this.onSelectData.forEach(item => {
                        if (params.row.orig_order_item_id == item.orig_order_item_id) {
                          item.split_num = value.target.value;
                        }
                      });
                    }
                    this.data[0][params.index] = params.row;
                  }
                },
                style: {
                  'text-align': 'center'
                }
              })
            ]);
          }
        }
      ],
      data: [],
      dataIndex: 0,
      onSelectData: []
    };
  },
  watch: {},
  mounted() {
    this.getData();
    window.selfInstance = this;
  },
  methods: {
    back() {
      this.$store.commit('customize/TabHref', {
        id: 2627,
        type: 'action',
        name: 'orderManager',
        label: '零售发货单',
        back: true,
        query: {} // row.id
      });
      this.$destroy();
    },
    getData() {
      const self = this;
      axios({
        url: '/api/cs/oc/oms/v1/querySkuListAndStorageInfo',
        method: 'post',
        data: { orderId: self.$route.query.id }
      }).then(res => {
        console.log(res);
        let total = 0;
        if (res.data.code === 0) {
          self.old_cp_c_phy_warehouse_ename = res.data.data[0].cp_c_phy_warehouse_ename;
          res.data.data.forEach(item => {
            item.waiting_split_num = Number(item.waiting_split_num || 0);
            item.split_num = item.waiting_split_num;
            total += item.waiting_split_num;
            item.total_qty_available = item.sgBPhyInStorageItemExt[0].total_qty_available; // 获取默认仓库可售数量
            item.is_gift_name = item.is_gift == 0 ? '否' : '是';
          });
          res.data.data[0].total = total;
          self.data.push(res.data.data);
        } else {
          self.$Message.error('查询失败!');
        }
      });
    },
    onSelect(selection) {
      this.onSelectData = selection;
    },
    onSelectCancel(selection) {
      this.onSelectData = selection;
    },
    onSelectAll(selection) {
      this.onSelectData = selection;
    },
    onSelectAllCancel(selection) {
      console.log(selection);
      this.onSelectData = selection;
    },
    // 添加到带拆单按钮方法
    addPendingOrder() {
      const self = this;
      let flag = true;
      if (self.onSelectData.length === 0) {
        self.$Message.warning('请选择需要拆分的明细!');
        return;
      }
      if (self.data[0].length == 0 || self.data[0][0].total <= 1) {
        self.$Message.warning('没有可拆分的订单');
        return;
      }
      self.onSelectData.forEach(item => {
        if (item.split_num == 0) {
          flag = false;
        }
      });
      if (!flag) {
        self.$Message.warning('拆分数量不能为0!');
        return;
      }
      console.log(self.onSelectData);
      self.onSelectData[0].total = 0;
      self.onSelectData.forEach(item => {
        item._index = undefined;
        item.orig_order_id = self.$route.query.id;
        self.onSelectData[0].total = Number(item.split_num) + Number(self.onSelectData[0].total);
        // self.data[0][0].total -= item.split_num;
      });
      // 更新原单拆单数量
      const arr = [];
      self.data[0][0].total = 0; // 重置促使仓库数量,一下重新计算总件数
      self.data[0].forEach((item) => {
        if (self.isNullToArr(item.orig_order_item_id, self.onSelectData)) {
          item.waiting_split_num -= item.split_num;
        }
        item.split_num = item.waiting_split_num;
        if (item.waiting_split_num !== 0) {
          item._index = undefined;
          arr.push(item);
          if (arr[0].total) arr[0].total += item.waiting_split_num;
          else arr[0].total = item.waiting_split_num;
        }
      });
      self.data.push(JSON.parse(JSON.stringify(self.onSelectData)));
      self.data[0] = arr;
      self.onSelectData = [];
    },
    isNullToArr(code, arr) {
      const flag = arr.find(item => code == item.orig_order_item_id);
      // arr.map(item => {
      //   if (code == item.orig_order_item_id) {
      //     flag = true;
      //   }
      // })
      return !!flag;
    },
    // 确认拆单
    confirm() {
      const self = this;
      console.log(self.data);
      if (self.data.length <= 1) {
        self.$Message.warning('请先选择拆单明细添加到待拆单，再进行拆单');
        return;
      }
      axios({
        url: '/api/cs/oc/oms/v1/saveSplitOrderInfo',
        method: 'post',
        data: { data: self.data }
      }).then(res => {
        console.log(res);
        if (res.data.code == 0) {
          self.$Message.success(res.data.message);
          self.back();
        } else {
          self.$Message.error(res.data.message);
        }
      });
    },
    // 切换列表
    switchList(index) {
      const self = this;
      self.dataIndex = index;
    }
  },
  computed: {
    isOutStore() {
      if (this.data.length) {
        let buyNum = 0;
        let canSellNum = 0;
        this.data[0].forEach(item => {
          buyNum += Number(item.qty);
          canSellNum += Number(item.total_qty_available);
        });
        return !(canSellNum >= buyNum);
      }
      return false;

      // return this.$store.state.sliderbar.isopen;
    }
  }
};

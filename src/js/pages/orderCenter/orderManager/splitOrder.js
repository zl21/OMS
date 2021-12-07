export default {
  name: 'splitOrder',
  data() {
    return {
      vmI18n: window.vmI18n,
      drpdata: {},
      cpdata: [],
      btnConfig: {
        typeAll: 'error',
        buttons: [
          {
            text: $it('btn.refresh'), // text: '刷新',
            btnclick: () => {
              if (this.canFresh) {
                this.$Modal.confirm({
                  title: $it('mT.tips'), // title:'提示',
                  content: $it('tip.ch'), // content:'当前操作未确认拆单，是否确认刷新？'
                  titleAlign: 'center',
                  mask: true, // 显示蒙层
                  draggable: true, // 拖拽
                  closable: true, // 右上角小叉
                  showCancel: true,
                  okText: '确认',
                  // okText: $it('tip.ch'),
                  cancelText: $it('common.cancel'), // 取消
                  onOk: () => {
                    this.getData();
                  },
                });
              } else {
                this.$Message.warning($it('tip.ci')); // 已是原始状态，不执行操作!
              }
            },
          },
          {
            text: $it('btn.back'), // 返回
            btnclick: this.back,
          },
          {
            text: $it('btn.add_splitOrder'), // 添加到待拆单
            btnclick: this.addPendingOrder,
            // icon: 'ios-add-circle-outline',
          },
          {
            text: $it('btn.confirm_splitOrder'), // 确认拆单
            btnclick: this.confirm,
            // icon: 'ios-photos-outline',
          },
        ],
      },
      old_cp_c_phy_warehouse_ename: '', // 保存原仓库
      columns: [
        {
          type: 'selection'
        },
        {
          title: $it('tL.whetherGift'), // 是否赠品
          key: 'is_gift_name'
        },
        {
          title: $it('tL.commoditySKU'), // 商品SKU
          key: 'ps_c_sku_ecode'
        },
        {
          title: $it('tL.productName'), // 商品名称
          key: 'ps_c_pro_ename'
        },
        {
          title: $it('fL.platform_billNo'), // 平台单号
          key: 'tid'
        },
        // {
        //   title: $it('tL.productSKUname'), // 商品SKU名称
        //   key: 'ps_c_sku_ename'
        // },
        {
          title: $it('tL.original_deliveryWarehouse'), // 原发货仓库
          key: 'cp_c_phy_warehouse_ename'
        },
        {
          title: "建议发货聚合仓", // 建议发货聚合仓
          key: 'shareStoreIds',
          render: (h, params) => {
            let defaultObj = { ID: "", Label: "" };
            const _keys = Object.keys(params.row.shareStoreIds);
            if(_keys && _keys.length) {
              defaultObj.ID  = _keys[0];
              defaultObj.Label  = params.row.shareStoreIds[_keys[0]];
            };
            // params.row.shareStoreIds?.forEach((item, index) => {
            //   console.log('item: ', index, item);
            // })
            return h('DropDownSelectFilter', {
              props: {
                data: this.drpdata,
                disabled: this.dataIndex !== 0,
                defaultSelected: [
                  // {
                  //   ID: params.row.share_storage_id,
                  //   Label: params.row.share_storage_ename
                  // }
                  defaultObj
                ]
              },
              on: {
                "on-page-change": () => {
                },
                "on-input-value-change": () => {

                },
                "on-clear": () => {
                  params.row.share_storage_id = ""
                  params.row.share_storage_ename = ""
                  params.row.shareStoreIds = {};
                },
                "on-fkrp-selected": (v) => {
                  params.row.share_storage_id = v[0].ID
                  params.row.share_storage_ename = v[0].Label
                  this.onSelectData.forEach(item => {
                    if (item.orig_order_item_id == params.row.orig_order_item_id) {
                      item.share_storage_id = v[0].ID
                      item.share_storage_ename = v[0].Label
                    }
                  })

                  this.data[0][params.index].share_storage_id = v[0].ID
                  params.row.cp_c_phy_warehouse_id = ""
                  let data = {
                    orderId: this.$route.params.customizedModuleId,
                    "skuId": params.row.ps_c_sku_id,
                    "shareStoreId": v[0].ID
                  }
                  this.service.orderCenter.querySkuListAndStorageInfo(data).then(res => {
                    if (res.data.code == 0) {
                      params.row.sgBPhyInStorageItemExt = res.data.data[0].sgBPhyInStorageItemExt;
                      this.data[0][params.index].sgBPhyInStorageItemExt = res.data.data[0].sgBPhyInStorageItemExt;
                    }
                  })
                  this.data[0][params.index].share_storage_id = v[0].ID;
                  this.data[0][params.index].share_storage_ename = v[0].Label;
                  this.data[0][params.index].cp_c_phy_warehouse_id = '';
                },
                "on-popper-show": () => {
                  let fordata = new FormData()
                  let ids = params.row.shareStoreIds && Object.keys(params.row.shareStoreIds).join(",")
                  if (ids) {
                    let obj = { "isdroplistsearch": true, "refcolid": 1700823730, "range": 10, "startindex": 0, "fixedcolumns": { "ID": "in (" + ids + ")" } }
                    fordata.append("searchdata", JSON.stringify(obj))

                    this.service.common.QueryList(fordata).then(res => {
                      if (res.data.code == 0) {
                        this.drpdata = res.data.datas
                      }

                    })
                  }
                }
              }
            })
          }
        },
        {
          title: $it('tL.suggested_deliveryWarehouse'), // 建议发货仓库
          key: 'advise_phy_warehouse_id',
          render: (h, params) => {
            const options = params.row.sgBPhyInStorageItemExt.map(item => h('Option', {
              style: {
                'font-style': item.total_qty_available === 0 ? 'italic' : 'normal'
              },
              props: {
                transfer: true,
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
                    transfer: true,
                    disabled: this.dataIndex !== 0,
                    clearable: true
                  },
                  on: {
                    'on-clear': () => {
                      this.$set(this.data[0][params.index], 'cp_c_phy_warehouse_id', '');
                    },
                    'on-change': value => {
                      if (value) {
                        this.data[0][params.index].value = value
                        params.row.value = value
                        const opt = params.row.sgBPhyInStorageItemExt.filter(item => item.advise_phy_warehouse_id == value)[0];
                        console.log(opt);
                        params.row.cp_c_phy_warehouse_id = value;
                        params.row.cp_c_phy_warehouse_ecode = opt.advise_phy_warehouse_ecode;
                        params.row.advise_phy_warehouse_ename = opt.advise_phy_warehouse_ename;
                        params.row.total_qty_available = opt.total_qty_available;
                        // params.row.total_qty_available = params.row.sgBPhyInStorageItemExt.filter(item => { return item.advise_phy_warehouse_id == value })[0].total_qty_available;
                        // 如果勾选了,同时更新勾选数据
                        if (this.onSelectData.length !== 0) {
                          this.onSelectData.forEach(item => {
                            if (params.row.orig_order_item_id == item.orig_order_item_id) {
                              item.cp_c_phy_warehouse_id = value;
                              item.cp_c_phy_warehouse_ecode = opt.advise_phy_warehouse_ecode;
                              item.advise_phy_warehouse_ename = opt.advise_phy_warehouse_ename;
                            }
                          });
                        }
                        this.data[0][params.index] = params.row;
                      }
                    }
                  }
                },
                options
              )
            ]);
          }
        },
        {
          title: $it('fL.purchaseQuantity'), // 购买数量
          key: 'qty'
        },
        {
          title: $it('tL.quantity_availableSale'), // 可售数量
          key: 'total_qty_available'
        },
        {
          title: $it('tL.quantity_demolished'), // 待拆数量
          key: 'waiting_split_num'
        },
        {
          title: $it('tL.quantity_split'), // 拆分数量
          key: 'split_num',
          width: 100,
          render: (h, params) =>
            // console.log(params);
            h('div', [
              h('Input', {
                props: {
                  value: params.row.split_num,
                  disabled: this.dataIndex !== 0,
                  regx: /^[0-9]/,
                },
                on: {
                  'on-change': value => {
                    // this.canFresh = params.row.split_num != value.target.value;
                    params.row.split_num = value.target.value;
                    if (params.row.waiting_split_num - value.target.value < 0) {
                      this.$Message.warning($it('tip.cj')); // 拆分数量不能大于待拆数量；不进行拆单
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
                  },
                  'on-regx-check': (value, errorValue) => {
                    console.log('拆分数量不能为负');
                  }
                },
                style: {
                  'text-align': 'center'
                }
              })
            ])

        }
      ],
      data: [],
      tableDataTidNumber: {},
      dataIndex: 0,
      onSelectData: [],
      platformdata: [],
      canFresh: false, // 刷新与否
    };
  },
  watch: {},
  mounted() {
    this.getData();
    window.selfInstance = this;
  },
  methods: {
    back() {
      $utils.tabCloseAppoint(this);
      this.$store.commit('customize/TabHref', {
        id: 2627,
        type: 'action',
        name: 'orderManager',
        label: $it('pL.retail_shipping_order'), // label: '零售发货单',
        back: true,
        query: {} // row.id
      });
      this.$destroy();
    },
    async getData() {
      console.log('getData::');
      const self = this;
      let params = { orderId: self.$route.params.customizedModuleId };

      const res = await this.service.orderCenter.querySkuListAndStorageInfo(params);
      console.log('res: ', res);
      let total = 0;
      if (res.data.code === 0) {
        self.data = [];
        if (!res.data.data) return;
        self.old_cp_c_phy_warehouse_ename = res.data.data[0].cp_c_phy_warehouse_ename;
        self.platformdata = res.data.data
        res.data.data.forEach((item, index) => {
          item.waiting_split_num = Number(item.waiting_split_num || 0);
          item.split_num = item.waiting_split_num;
          total += item.waiting_split_num;
          item.total_qty_available = item.sgBPhyInStorageItemExt && item.sgBPhyInStorageItemExt[0].total_qty_available; // 获取默认仓库可售数量
          item.is_gift_name = item.is_gift == 0 ? '否' : '是';
          item.share_storage_id = ''
          item.share_storage_ename = ''
          item.initIndex = index
          if (!this.tableDataTidNumber[item.tid]) this.tableDataTidNumber[item.tid] = 0;
          this.tableDataTidNumber[item.tid]++
        });
        res.data.data[0].total = total;
        self.data.push(res.data.data);
        self.switchList(0);
        // self.cpdata = JSON.parse(JSON.stringify(self.data))
      } else {
        self.$Message.error($it('tip.ck')); // 查询失败
      }
    },
    onSelect(selection) {
      this.onSelectData = selection;
      this.selectdata = selection

    },
    onSelectCancel(selection) {
      this.onSelectData = selection;
      this.selectdata = selection
    },
    onSelectAll(selection) {
      this.onSelectData = selection;
      this.selectdata = selection
    },
    onSelectAllCancel(selection) {
      this.onSelectData = selection;
      this.selectdata = selection
    },
    // 添加到带拆单按钮方法
    addPendingOrder() {
      const self = this;
      let flag = true;
      let isIndex = true; // 主仓库第一条total是否已重置为0;
      if (self.onSelectData.length === 0) {
        self.$Message.warning($it('tip.cl')); // 请选择需要拆分的明细
        return;
      }
      let isok = true;
      for (let v of self.onSelectData) {
        for (let item of this.data[0]) {
          if (item.orig_order_item_id == v.orig_order_item_id) {
            if ((!item.share_storage_id && item.value) || (!item.value && item.share_storage_id)) {
              isok = false;
            }
          }
        }
      }
      if (self.onSelectData.length > 1) {
        let state = [];
        self.onSelectData.forEach(item => {
          if ((item.share_storage_ename === '' && item.cp_c_phy_warehouse_id === '') || (item.share_storage_ename !== '' && item.cp_c_phy_warehouse_id !== '')) {
            state.push(1);
          } else {
            state.push(2);
          }
        })
        isok = state.includes(1);
      } else {
        isok = ((self.onSelectData[0].share_storage_ename === '' && self.onSelectData[0].cp_c_phy_warehouse_id === '') || (self.onSelectData[0].share_storage_ename !== '' && self.onSelectData[0].cp_c_phy_warehouse_id !== ''))
      }
      if (!isok) {
        self.$Message.warning('当前建议仓库填写不完整，请完善建议仓库信息！');
        return
      }

      /*if (this.platformdata[0].platform === 50) {
        let resule = false;
        if (this.onSelectData.length === 1) {
          let newdat = this.platformdata.filter(item => {
            return item.orig_order_item_id != this.onSelectData[0].orig_order_item_id
          })
          console.log(this.selectdata[0].tid);
          resule = newdat.some(item => {
            return this.selectdata[0].tid == item.tid
          })
        } else {
          const selectTableDataTidNumber = {};
          const tableDataTidNumber = this.tableDataTidNumber;
          this.selectdata.forEach(val => {
            if (!selectTableDataTidNumber[val.tid]) selectTableDataTidNumber[val.tid] = 0;
            selectTableDataTidNumber[val.tid]++
          })
          if (Object.keys(selectTableDataTidNumber).length > 1) {
            resule = true;
          } else {
            for (let key in selectTableDataTidNumber) {
              if (selectTableDataTidNumber[key] !== tableDataTidNumber[key]) {
                resule = true;
                break;
              }
            }
          }
        }
        if (resule) {
          self.$Message.warning("JITX订单 仅支持整单拆单，不支持单明细拆单！");
          return;
        }
      }*/
      if ((self.data[0].length == 1 && self.data[0][0].split_num >= self.data[0][0].waiting_split_num) || self.data[0][0].total <= 1) {
        self.$Message.warning($it('tip.cm')); // 没有可拆分的订单
        return;
      }
      if (self.data[0].length > 1 && this.platformdata[0].platform === 19) {
        let state = self.data[0].every(item => {
          return item.tid === self.data[0][0].tid;
        })
        if (state) {
          self.$Message.warning($it('tip.cm')); // 没有可拆分的订单
          return;
        }
        // 如果是JITX订单，并且“建议发货仓库”与原单仓库不一致则 点击“添加到带拆单”时，报错提示：“JITX订单目前暂不允许在该界面进行修改仓库，请保持原单拆单后，至零售发货单界面进行修改仓库！”
        if(this.onSelectData[0].advise_phy_warehouse_ename != this.onSelectData[0].cp_c_phy_warehouse_ename){
          self.$Message.warning('JITX订单目前暂不允许在该界面进行修改仓库，请保持原单拆单后，至零售发货单界面进行修改仓库！');
          return;
        }
      }else if(self.data[0].length > 1 && this.platformdata[0].platform === 2){
        if(self.data[0].length === this.onSelectData.length){
          self.$Message.warning('当前操作不允许添加带拆单列表');
          return;
        }
      }
      self.onSelectData.forEach(item => {
        if (item.split_num == 0) {
          flag = false;
        }
      });
      if (!flag) {
        self.$Message.warning($it('tip.cn')); // 拆分数量不能为0
        return;
      }
      self.onSelectData[0].total = 0;
      self.onSelectData.forEach(item => {
        item._index = undefined;
        item.orig_order_id = self.$route.params.customizedModuleId;
        self.onSelectData[0].total = Number(item.split_num) + Number(self.onSelectData[0].total);
        item.waiting_split_num = item.split_num;
        // self.data[0][0].total -= item.split_num;
      });
      // 更新原单拆单数量
      const arr = [];
      self.data[0][0].total = 0; // 重置促使仓库数量,一下重新计算总件数
      self.data[0].forEach((item, index) => {
        if (self.isNullToArr(item.orig_order_item_id, self.onSelectData)) {
          item.waiting_split_num -= item.split_num;
        }
        item.split_num = item.waiting_split_num;
        if (item.waiting_split_num !== 0) {
          item._index = undefined;
          arr.push(item);
          if (isIndex) { arr[0].total = 0; isIndex = false; } // 第一次累计主仓库总数是重置total为0;
          if (arr[0].total) arr[0].total += item.waiting_split_num;
          else arr[0].total = item.waiting_split_num;
        }
      });
      self.onSelectData.forEach(item => {
        this.data[0].forEach(em => {
          if (em.orig_order_item_id == item.orig_order_item_id) {
            em.share_storage_ename = ""
            em.share_storage_id = ""
          }
        })
      })
      self.data.push(JSON.parse(JSON.stringify(self.onSelectData)));
      self.data[0] = arr;

      self.onSelectData = [];
      self.canFresh = true;
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
    async confirm() {
      const self = this;
      if (self.data.length <= 1) {
        self.$Message.warning($it('tip.co')); // 请先选择拆单明细添加到待拆单，再进行拆单
        return;
      }
      const { data: { code, message } } = await this.service.orderCenter.saveSplitOrderInfo({ data: self.data });
      console.log(code, message);
      if (code == 0) {
        self.canFresh = false;
        self.$Message.success(message);
        self.back();
      } else {
        self.$Message.error(message);
      }
      // axios({
      //   url: '/api/cs/oc/oms/v1/saveSplitOrderInfo',
      //   method: 'post',
      //   data: { data: self.data }
      // }).then(res => {
      //   console.log(res);
      //   if (res.data.code == 0) {
      //     self.canFresh = false;
      //     self.$Message.success(res.data.message);
      //     self.back();
      //   } else {
      //     self.$Message.error(res.data.message);
      //   }
      // });
    },
    // 切换列表
    switchList(index) {
      console.log(this.data[0]);
      const self = this;
      self.dataIndex = index;
    },
    // 撤销
    undo(index) {
      debugger
      let total = 0;
      const map = new Map();
      this.data[index].forEach(item => {
        map.set(item.orig_order_item_id, item); // 记录明细唯一标识
      });
      const Rarr = []; // 新建组数,更新data[0],为了触发表格视图刷新
      this.data[0].forEach((item) => {
        if (map.get(item.orig_order_item_id)) {
          Rarr.push(item);
          item.split_num = Number(item.split_num) + Number(map.get(item.orig_order_item_id).split_num);
          total = Number(total) + Number(map.get(item.orig_order_item_id).split_num);
          item.waiting_split_num = Number(item.waiting_split_num) + Number(map.get(item.orig_order_item_id).waiting_split_num);
          map.delete(item.orig_order_item_id);
        } else {
          Rarr.push(item);
        }
        this.data[0] = [];
        this.data[0] = Rarr;
      });
      map.forEach(value => {
        total += Number(value.split_num);
        let newArr = [];
        this.data[0].push(value);
        newArr = JSON.parse(JSON.stringify(this.data[0]));
        this.data[0] = [];
        this.data[0] = newArr;
      });
      this.$nextTick(() => {
        this.data[0][0].total += total;
        this.data.splice(index, 1);
        this.switchList(0);
      });
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

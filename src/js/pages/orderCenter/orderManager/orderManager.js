import BurgeonEvent from 'burgeonConfig/config/event.config';
import buttonPermissionsMixin from '@/assets/js/mixins/buttonPermissions';
import isFavoriteMixin from '@/assets/js/mixins/isFavorite';
import dataAccessMixin from '@/assets/js/mixins/dataAccess';
import labelListConfig from './publicConfig/labelList';
import orderLogo from './publicConfig/orderLogo';
import unzipXv from '@/assets/js/dataToSmall';

export default {
  components: {},
  mixins: [isFavoriteMixin, buttonPermissionsMixin, dataAccessMixin],
  watch: {
    publicBouncedConfig(newvalue) {
      this.publicBouncedIndex = newvalue;
    }
  },
  data() {
    return {
      pageLoad: false,
      isActive: false,
      agTableConfig: {
        isIndex: true,
        pageShow: true,
        tableHeight: '412px',
        agLoading: false,
        columnDefs: [],
        rowData: [],
        renderParams: (cellData) => {
          const field = cellData.field;
          switch (field) {
            case 'EXPRESSCODE':
              return {
                renderContainer: 'CellRenderByFunction',
                renderComponent: (h, params) => {
                  return h('span', {
                    style: {
                      color: '#36A2EB',
                      cursor: 'pointer',
                    },
                    on: {
                      click: () => {
                        const iTop = (window.screen.availHeight - 30 - 800) / 2;
                        const iLeft = (window.screen.availWidth - 10 - 1200) / 2;
                        window.open(`http://www.kuaidi100.com/chaxun?com=${params.row.PY_SHORT_NAME}&nu=${params.row.EXPRESSCODE}`, '', `height=800, width=1200 , top=${iTop} , left=${iLeft}`);
                      }
                    },
                  }, params.row.EXPRESSCODE)
                }
              }
              break;
            case 'ORDER_TAG':
              return {
                renderContainer: 'CellRenderByFunction',
                renderComponent: (h, params) => {
                  return h('div', {},
                    params.row.ORDERTAGLIST.map(item => h('span', {
                      domProps: {
                        title: item.text,
                        innerText: item.text
                      },
                      style: {
                        border: `1px solid${item.clr}`,
                        color: item.clr,
                        margin: '0 2px',
                        borderRadius: '6px',
                        padding: '2px'
                      }
                    }))
                  )
                }
              }
              break;
            case 'PAY_TIME':
            case 'AUDIT_TIME':
            case 'DISTRIBUTION_TIME':
            case 'CREATIONDATE':
            case 'HOLD_RELEASE_TIME':
            case 'PLATFORM_DELIVERY_TIME':
            case 'WAREHOUSE_DELIVERY_TIME':
              return {
                renderContainer: 'CellRenderByFunction',
                renderComponent: (h, params) => {
                  return h('div', {
                    domProps: {
                      innerHTML: `${params.row[field] ? $utils.standardTimeConversiondateToStr(params.row[field]) : ''}`
                    }
                  })
                }
              }
              break;
            case 'SG_B_OUT_BILL_NO':
              return {
                renderContainer: 'CellRenderByFunction',
                renderComponent: (h, params) => {
                  return h('span', {
                    style: {
                      color: '#36A2EB',
                      cursor: 'pointer',
                    },
                    on: {
                      click: () => {
                        if (params.data.SG_B_OUT_BILL_ID) {
                          R3.store.commit('global/tabOpen', {
                            type: 'V',
                            tableName: 'SG_B_STO_OUT_NOTICES',
                            tableId: '249230947',
                            id: params.data.SG_B_OUT_BILL_ID
                          });
                        } else this.$Message.error('出库通知单单号的id为空');
                      }
                    },
                  }, params.row.SG_B_OUT_BILL_NO)
                }
              }
              break;
            case 'BILL_NO':
              return {
                renderContainer: 'CellRenderByFunction',
                renderComponent: (h, params) => {
                  return h('span', {
                    style: {
                      color: '#36A2EB',
                      cursor: 'pointer',
                    },
                    on: {
                      click: () => {
                        R3.store.commit('global/tabCloseAppoint', {
                          routeFullPath: '/SYSTEM/TABLE/SG_B_STO_OUT/249230774',
                          stopRouterPush: true,
                          keepAliveModuleName: 'S.SG_B_STO_OUT.249230774',
                          tableName: 'SG_B_STO_OUT'
                        });
                        setTimeout(() => {
                          R3.store.commit('global/tabOpen', {
                            type: 'S',
                            tableName: 'SG_B_STO_OUT',
                            tableId: '249230774',
                            isSetQuery: true,
                            queryData: {
                              tableId: '249230774',
                              values: [
                                {
                                  display: 'OBJ_DATENUMBER',
                                  colid: '1700825958',
                                  defaultValue: ['', '']
                                }, {
                                  display: 'text',
                                  colid: '1700822250',
                                  defaultValue: params.data.BILL_NO
                                }
                              ]
                            }
                          });
                        }, 500);
                      }
                    }
                  }, params.row.BILL_NO)
                }
              }
              break;
            case 'SUGGEST_PRESINK_STATUS':
              return {
                renderContainer: 'CellRenderByFunction',
                renderComponent: (h, params) => {
                  const val = params.data.SUGGEST_PRESINK_STATUS;
                  let value = null;
                  let arr = new Map([
                    ['Y', '是'],
                    ['N', '否'],
                  ]);
                  value = arr.get(val) || '';
                  return h('div', {}, value)
                }
              }
              break;
            case 'ACTUAL_PRESINK_STATUS':
              return {
                renderContainer: 'CellRenderByFunction',
                renderComponent: (h, params) => {
                  let arr = new Map([
                    ['1', '未通知'],
                    ['2', '通知中'],
                    ['3', '已通知'],
                    ['4', '已完成'],
                    ['5', '取消中'],
                    ['6', '取消成功'],
                    ['7', '取消失败'],
                  ]);
                  const val = params.data.ACTUAL_PRESINK_STATUS;
                  let value = null;
                  value = arr.get(val) || '';
                  return h('div', {}, value)
                }
              }
              break;
            case 'THIRD_PARTY_FAIL_STATUS':
              return {
                renderContainer: 'CellRenderByFunction',
                renderComponent: (h, params) => {
                  let arr = new Map([
                    ['1', '传TMS失败'],
                    ['2', '传DRP失败'],
                    ['3', '传WMS失败'],
                    ['4', 'WMS实缺'],
                    ['5', '其他'],
                  ]);
                  const val = params.data.THIRD_PARTY_FAIL_STATUS;
                  let value = null;
                  value = arr.get(val) || '';
                  return h('div', {}, value)
                }
              }
              break;
            case 'STATUS_PAY_STEP':
              return {
                renderContainer: 'CellRenderByFunction',
                renderComponent: (h, params) => {
                  console.log('params: ', params);
                  const val = params.row.STATUS_PAY_STEP,
                    _map = new Map([
                      ['FRONT_PAID_FINAL_NOPAID', '预售尾款未付'], ['FRONT_PAID_FINAL_PAID', '预售尾款已付']
                    ]);
                  if (_map.has(val)) return h('div', {}, _map.get(val));
                  return h('div', {}, val || '');
                }
              }
              break;
            default:
              break;
          }
        },
        // pagenation: $utils.pageConfig,
        pagenation: {
          total: 0,
          pageSize: 50,
          current: 1,
          pageSizeOpts: [50, 200, 500, 2000]
        },
      },
      options: {
        oldMoved: true,
        rowHeight: 40,
        // getRowClass: this.getRowClass, // 改变行颜色
        // onColumnResized: this.onColumnResized, // aG列宽改变回调
        // getMainMenuItems: this.getMainMenuItems, // 重置所有列位置信息
        datas: {},
        floatingFilter: true
      },
      // 弹框配置 导入
      importTable: {
        refFuns: 'confirmFun',
        confirmTitle: '导入',
        titleAlign: 'center', // 设置标题是否居中 center left
        width: '600',
        scrollable: false, // 是否可以滚动
        closable: true, // 是否可以按esc关闭
        draggable: true, // 是否可以拖动
        mask: true, // 是否显示遮罩层
        maskClosable: true, // 是否可以点击叉号关闭
        transfer: true, // 是否将弹层放在body内
        name: 'importTable', // 组件名称
        url: $BC.Components.ImportTable,
        keepAlive: true,
        excludeString: 'importTable', // 将name传进去，确认不缓存
        componentData: {}
      },
      changeInternalRemarksConfig: {
        refFuns: 'confirmFun',
        confirmTitle: '修改内部备注', // 修改内部备注
        titleAlign: 'center', // 设置标题是否居中 center left
        width: '440',
        scrollable: false, // 是否可以滚动
        closable: true, // 是否可以按esc关闭
        draggable: true, // 是否可以拖动
        mask: true, // 是否显示遮罩层
        maskClosable: true, // 是否可以点击叉号关闭
        transfer: true, // 是否将弹层放在body内
        name: 'changeInternalRemarks', // 组件名称
        // url: 'modal/orderCenter/changeInternalRemarks',
        url: require('@/views/modal/orderCenter/changeInternalRemarks').default,
        keepAlive: true,
        excludeString: 'changeInternalRemarks', // 将name传进去，确认不缓存
        componentData: {}
      },
      warningModal: false, // 警告弹框
      distributeLogisticsModal: false, // 警告弹框
      distributeWarehouseModal: false, // 警告弹框
      batchReturnOrderModal: false, // 警告弹框
      // 清除高级搜索中的数据
      clearFromListValue: false,
      // 状态json
      statusData: {
        label: $it('com.toBeReviewed'), // 全部
        value: '1',
        isShow: true
      },
      // tag 搜索
      queryInfoData: [],
      // 高级搜索
      highSearchData: [],
      sort: [], // 表格排序状态
      // 标签
      labelData: [],

      // 表格选中数据
      selection: [],
      // from loading
      isShowFromLoading: false,
      // 弹框判断
      publicBouncedIndex: {
        name: 'testModal'
      },
      // 公共弹框
      publicBouncedConfig: {},
      // 判断显示高级搜索还是正常搜素
      isShowSeniorOrOrdinary: true,
      // icon 样式
      iconDownIcon: 'ark-icon iconfont iconios-arrow-down',

      // tabs
      // 设置tabs默认值
      labelDefaultValue: '1',
      // 设置tabs列表
      labelList: labelListConfig,
      // 普通搜索
      dropList: [],
      tagList: [
        {
          label: '标签', // 标签字段名称
          column: 'tag', // 标签字段
          trigger: '', // 触发方式
          list: [] // 选项
        }
      ],
      // 表单搜索
      btnConfig: {
        typeAll: 'default', // 按钮统一风格样式
        loading: false, // 按钮加载
        buttons: []
      },
      extendBtn: [
        {
          text: '查找', // 查找
          type: 'error',
          webname: 'queryList',
          btnclick: () => {
            this.loadData();
          } // 按钮点击事件
        },
        {
          text: '重置', // 重置
          webname: 'Reset',
          btnclick: () => {
            const _this = this;
            _this.clearFromListValue = true;
            _this.queryInfoData = [];
            _this.labelData = [];
            _this.highSearchData = [];
            _this.getHeaderList();
          } // 按钮点击事件
        },
        {
          webname: 'BatchOrderUnDeliveryUrgent', //批量取消加急
          btnclick: () => {
            if (this.selection.length === 0) {
              this.$Message.warning({
                content: '请选择需要取消加急的记录！',
                duration: 5,
                top: 80
              })
              return
            }
            const dataId = {
              ids: this.selection.map(item => item.ID)
            };
            this.$Modal.warning({
              title: '提示',
              content: '是否确定取消加急?',
              showCancel: true,
              mask: true,
              onOk: () => {
                this.btnConfig.loading = true;
                this.service.orderCenter.orderUnDeliveryUrgent(dataId).then(res => {
                  this.btnConfig.loading = false;
                  if (res.data.code === 0) {
                    this.$Message.success(res.data.message);
                    this.getData();
                    this.selection = [];
                  } else {
                    this.$Message.warning(res.data.message);
                  }
                })
              },
            })
          }
        },
        {
          webname: 'refund_price',
          btnclick: () => {
            if (this.selection.length === 0) {
              this.$Message.warning('请选择需要额外退款的记录');
            } else if (this.selection.length > 1) {
              this.$Message.warning('只能选择一条记录进行退款');
            } else {
              if (this.selection[0].ORDER_STATUS === 6 || this.selection[0].ORDER_STATUS === 5) {
                this.$store.commit('customize/TabOpen', {
                  id: -1,
                  type: 'action',
                  name: 'EXTRAREFUND',
                  label: $it('pL.extraRefundEdit'), // 额外退款编辑
                  query: Object.assign({
                    oid: this.selection[0].ID,
                    tabTitle: $it('pL.extraRefundEdit'), // 额外退款编辑
                    fromOrder: true,
                    new: true
                  })
                });
              } else {
                this.$Message.warning('只有仓库发货或者平台发货的订单才能操作额外退款');
              }
            }
          }
        },
        {
          webname: 'batchModifyAddress',
          webid: 41460540,
          btnclick: () => {
            this.importTable.componentData = { tableName: 'OC_B_ORDER-importOrderRemark' };
            this.$children.find(item => item.name === 'importTable').openConfirm();
          }
        },
        {
          text: $it('btn.manualCreation') // 手工创建
        },
        {
          webname: 'Newly added' // 新增
        },
        {
          webname: 'orderDetentionRelease', // 卡单释放
          btnclick: () => {
            this.orderDetentionRelease();
          }
        },
        {
          webname: 'To examine', // 审核
          btnclick: () => {
            this.existMergableOrder('auditOrder');
          } // 按钮点击事件
        },
        {
          webname: 'Counter-audit', // 反审核
          btnclick: () => {
            const self = this;
            if (self.selection.length > 0) {
              self.btnConfig.loading = true;
              const ids = [];
              self.selection.forEach((item, index) => {
                ids[index] = item.ID;
              });
              self.service.orderCenter.auditOrderReserve({ ids, type: '1' }).then(res => {
                if (res.data.code === 0) {
                  self.$Message.success(res.data.message);
                  self.getData();
                  self.selection = [];
                } else {
                  self.$Modal.error({
                    title: $it('mT.tips'), // 提示
                    content: res.data.message,
                    cancelType: true,
                    titleAlign: 'left',
                    mask: true,
                    draggable: true,
                    keyDown: event => {
                      if (event.keyCode == 27 || event.keyCode == 13) {
                        self.$Modal.remove();
                      }
                    }
                  });
                }
                self.btnConfig.loading = false;
              });
            } else {
              self.$Message.warning({
                content: $it('tip.a6'), // 请选择需要反审核的记录！
                duration: 5,
                top: 80
              });
            }
          } // 按钮点击事件
        },
        {
          webname: 'Revising Logistics' // 批量修改物流
        },
        {
          webname: 'Drop-out copy' // 丢单复制
        },
        {
          webname: 'BacthUpdateInsideRemark', // 修改内部备注
        },
        {
          webname: 'holdOrder' // 批量Hold单
        },
        {
          webname: 'cancelHoldOrder' // 批量取消Hold
        },
        {
          webname: 'batchAgainOccupyStock', // 批量重新寻源
          btnclick: () => {
            const self = this;
            if (self.selection.length === 0) {
              self.$Message.warning('请选择需要重新寻源的记录!')
            } else {
              const ids = self.selection.map(item => item.ID);
              self.service.orderCenter.againOccupyStock({ ids }).then(res => {
                if (res.data.code === 0) {
                  self.$Message.success({
                    content: res.data.message
                  });
                  this.getData();
                }
                this.getData();
              })
            }
          }
        },
        {
          text: $it('btn.invoice_otice'), // 开票通知
          btnclick: () => {
            const self = this;
            if (self.selection.length === 0) {
              self.$Message.warning($it('tip.a7')); // 请选择需要开票的订单
            } else if (self.selection.length > 0) {
              self.btnConfig.loading = true;
              const ids = self.sonList(self.selection, 'ID'); // 选中订单的单据号
              const fromdata = new FormData();
              fromdata.append('param', JSON.stringify({ IDS: ids }));
              self.service.orderCenter
                .checkAddOrderInvoicing(fromdata)
                // self.$network
                //   .post('/api/cs/oc/oms/v1/checkAddOrderInvoicing', fromdata)
                .then(res => {
                  if (res.data.code === 0) {
                    self.$store.commit('customize/TabOpen', {
                      id: -1,
                      type: 'action',
                      name: 'invoiceNoticetAdd',
                      label: '开票通知编辑',
                      query: {
                        highSearchData: JSON.stringify({
                          type: 'Input',
                          queryName: 'ID',
                          value: res.data.data.join()
                        }),
                        isOrder: 'ture',
                        id: -1
                      }
                    });
                    // R3.store.commit('global/tabOpen', {
                    //   type: 'C',
                    //   label: $it('pL.billingNoticeEdit'),
                    //   customizedModuleName: 'INVOICENOTICETADD',
                    //   customizedModuleId: '-1',
                    //   query: {
                    //     highSearchData: JSON.stringify({
                    //       type: 'Input',
                    //       queryName: 'ID',
                    //       value: res.data.data.join(),
                    //     }),
                    //     isOrder: 'ture',
                    //     id: -1,
                    //   },
                    // });
                  } else {
                    self.$Message.warning(res.data.message);
                  }
                  self.btnConfig.loading = false;
                });
            }
          } // 按钮点击事件
        },
        {
          text: $it('btn.recordInvoice'), // 记录发票
          webname: 'Record invoices',
          btnclick: () => {
            const self = this;
            if (self.selection.length === 1) {
              self.btnConfig.loading = true;
              const id = self.sonList(self.selection, 'ID').join(); // 选中订单的单据号
              const fromdata = new FormData();
              fromdata.append('param', JSON.stringify({ ID: id }));
              self.service.orderCenter
                .checkRecordInvoicing(fromdata)
                // self.$network
                //   .post('/api/cs/oc/oms/v1/checkRecordInvoicing', fromdata)
                .then(res => {
                  if (res.data.code === 0) {
                    self.publicBouncedConfig = Object.assign(publicDialogConfig.makeOutInvoiceConfig, {
                      componentData: res.data.data
                    });
                    setTimeout(() => {
                      self.$children.find(item => item.name === 'makeOutInvoice').openConfirm();
                    }, 100);
                  } else {
                    self.$Message.warning(res.data.message);
                  }
                  self.btnConfig.loading = false;
                });
            } else {
              self.$Message.warning($it('tip.a8')); // 请选择一条订单
            }
          } // 按钮点击事件
        },
        {
          webname: 'Modify warehouse' // 批量修改仓库
        },
        {
          text: $it('btn.orderCancel'), // 订单取消
          webname: 'Order Cancellation',
          btnclick: () => {
            const self = this;
            if (self.selection.length > 0) {
              self.btnConfig.loading = true;
              const ids = [];
              self.selection.forEach((item, index) => {
                ids[index] = item.ID;
              });
              this.$Modal.info({
                title: $it('mT.tips'), // 提示
                content: $it('tip.e0'), // 是否确定取消订单？
                mask: true,
                showCancel: true,
                okText: $it('com.determine'), // 确定
                cancelText: $it('com.cancel'), // 取消
                onOk: () => {
                  self.service.orderCenter
                    .cancelOrder({ ids, type: '1' })
                    // self.$network
                    //   .post('/api/cs/oc/oms/v1/cancelOrder', { ids, type: '1' })
                    .then(res => {
                      if (res.data.code === 0) {
                        self.$Message.success(res.data.message);
                        self.getData();
                        self.selection = [];
                      } else {
                        self.$Modal.error({
                          title: $it('mT.tips'), // 提示
                          content: res.data.message,
                          cancelType: true,
                          titleAlign: 'left',
                          mask: true,
                          draggable: true,
                          keyDown: event => {
                            if (event.keyCode == 27 || event.keyCode == 13) {
                              self.$Modal.remove();
                            }
                          }
                        });
                      }
                      self.btnConfig.loading = false;
                    });
                },
                onCancel: () => {
                  self.btnConfig.loading = false;
                }
              });
            } else {
              self.$Message.warning({
                content: $it('tip.a9'), // 请选择需要取消的订单！
                duration: 5,
                top: 80
              });
            }
          } // 按钮点击事件
        },
        {
          text: $it('btn.orderBlocking'), // 订单拦截
          btnclick: () => {
            const self = this;
            if (self.selection.length > 0) {
              self.btnConfig.loading = true;
              const ids = [];
              self.selection.forEach((item, index) => {
                ids[index] = item.ID;
              });
              const param = {
                ids
              };
              self.service.orderCenter
                .orderInterception(param)
                // self.$network
                //   .post('/api/cs/oc/oms/v1/orderInterception', param)
                .then(res => {
                  if (res.data.code === 0) {
                    self.$Message.success(res.data.message);
                    self.getData();
                    self.selection = [];
                  } else {
                    self.$Modal.error({
                      title: $it('mT.tips'), // 提示
                      content: res.data.message,
                      cancelType: true,
                      titleAlign: 'left',
                      mask: true,
                      draggable: true,
                      keyDown: event => {
                        if (event.keyCode == 27 || event.keyCode == 13) {
                          self.$Modal.remove();
                        }
                      }
                    });
                  }
                  self.btnConfig.loading = false;
                });
            } else {
              self.$Message.warning({
                content: $it('tip.b1'), // 请选择需要拦截的记录！
                duration: 5,
                top: 80
              });
            }
          } // 按钮点击事件
        },
        {
          webname: 'OrderDeliveryUrgent' // 加急发货
        },
        {
          text: $it('btn.splitOrder'), // 拆分订单
          webname: 'Split the order',
          btnclick: () => {
            const self = this;
            if (self.selection.length === 1) {
              this.service.orderCenter.querySkuListAndStorageInfo({ orderId: self.selection[0].ID }).then(res => {
                // 提前判断下该单据是否可拆单
                if (res.data.code == 0) {
                  if ((self.selection[0].PLATFORM === 4 && self.selection[0].PAY_TYPE === 2) || self.selection[0].PLATFORM === 7) {
                    self.$Message.warning({
                      content: $it('tip.b1'), // 交易平台为当当，唯品会jitx，京东（货到付款）的订单不允许拆单
                      duration: 5,
                      top: 80
                    });
                    return;
                  }
                  if (self.selection[0].IS_INRETURNING === 1 || self.selection[0].IS_INTERECEPT === 1) {
                    self.$Message.warning({
                      content: $it('tip.b2'), // 拦截、退款中的订单不允许拆单！
                      duration: 5,
                      top: 80
                    });
                    return;
                  }
                  if (self.selection[0].ORDER_STATUS === self.orderStatus.orderUnconfirmed || self.selection[0].ORDER_STATUS === self.orderStatus.orderOutofstock) {
                    self.$store.commit('customize/TabHref', {
                      id: self.selection[0].ID,
                      type: 'action',
                      name: 'splitOrder',
                      label: $it('pL.orderSplit'), // 订单拆分
                      query: {
                        id: self.selection[0].ID,
                        tabTitle: $it('pL.orderSplit') // 订单拆分
                      }
                    });
                  } else {
                    self.$Message.warning({
                      content: $it('tip.b3'), // 只允许拆分待审核和缺货状态的订单！
                      duration: 5,
                      top: 80
                    });
                  }
                } else {
                  this.$Message.warning(res.data.message);
                }
              });
            } else {
              self.$Message.warning({
                content: $it('tip.b4'), // 一次只能对一个订单进行拆分！
                duration: 5,
                top: 80
              });
            }
          } // 按钮点击事件
        },
        // {
        //   text: "添加赠品", //按钮文本
        //   btnclick: () => {
        //     let self = this;
        //     self.selection = self.$refs.agGridChild.AGTABLE.getSelect();
        //     if (self.selection.length > 0) {
        //       self.btnConfig.loading = true;
        //       let ids = [];
        //       let isAddGit = true;
        //       self.selection.forEach((item, index) => {
        //         ids[index] = item.ID;
        //         if (item.PLATFORM === 50) {
        //           isAddGit = false;
        //         }
        //       });
        //       if (!isAddGit) {
        //         self.$Message.warning({
        //           content: "选择的订单中存在JITX订单, 不允许添加赠品！",
        //           duration: 5,
        //           top: 80
        //         });
        //         return;
        //       }
        //       let param = {
        //         ids: ids
        //       };
        //       axios({
        //         url: "/api/cs/oc/oms/v1/checkGit",
        //         method: "post",
        //         cancelToken: true,
        //         data: param
        //       }).then(function (res) {
        //         if (res.data.code === 0) {
        //           self.publicBouncedConfig =
        //             publicDialogConfig.addGiftsConfig;
        //           self.publicBouncedConfig.componentData = {
        //             objid: ids
        //           };
        //           setTimeout(() => {
        //             self.$children
        //               .find(item => item.name === "addGifts")
        //               .openConfirm();
        //           }, 100);
        //         } else {
        //           self.$Modal.error({
        //             title: $it('mT.tips'),//提示,
        //             content: res.data.message,
        //             cancelType: true,
        //             titleAlign: "left",
        //             mask: true,
        //             draggable: true,
        //             keyDown: event => {
        //               if (event.keyCode == 27 || event.keyCode == 13) {
        //                 self.$Modal.remove();
        //               }
        //             }
        //           });
        //         }
        //         self.btnConfig.loading = false;
        //       });
        //     } else {
        //       self.$Message.warning({
        //         content: "请选择需要添加赠品的记录！",
        //         duration: 5,
        //         top: 80
        //       });
        //     }
        //   } //按钮点击事件
        // },
        {
          text: $it('btn.new_chargeback'), // 新增退单
          webname: 'New refund receipt',
          // 新增退单跳转页面
          btnclick: () => {
            const self = this;
            if (self.selection.length === 0) {
              self.$Message.warning({
                content: $it('tip.b5'), // 请选择需要新增退单记录！
                duration: 5,
                top: 80
              });
              return;
            }
            if (self.selection.length > 1) {
              self.$Message.warning({
                content: $it('tip.b6'), // 请选择一条记录！
                duration: 5,
                top: 80
              });
              return;
            }
            // 已取消，系统作废
            if (self.selection[0].ORDER_STATUS == 7 || self.selection[0].ORDER_STATUS == 8) {
              self.$Message.warning({
                content: `${self.selection[0].ID}${$it('tip.b7')}`, // 订单需要生成退换货单的订单状态不能已取消、系统作废！
                duration: 5,
                top: 80
              });
              return;
            }
            // “待分配”、“待审核”、“缺货”、“已审核”、“传WMS中”、“配货中
            if (self.selection[0].ORDER_STATUS == 1 || self.selection[0].ORDER_STATUS == 2 || self.selection[0].ORDER_STATUS == 3 || self.selection[0].ORDER_STATUS == 4 || self.selection[0].ORDER_STATUS == 50 || self.selection[0].ORDER_STATUS == 21) {
              self.$Message.warning({
                content: `${self.selection[0].ID}${$it('tip.b8')}`, // 订单需要发货后才能新增退单!
                duration: 5,
                top: 80
              });
              return;
            }
            // self.$store.commit('customize/('TabOpen', {
            //   id: -1,
            //   type: 'action',
            //   name: 'returngood',
            //   label: '退换货单新增',
            //   query: {
            //     id: -1,
            //     orderHrefReturnid: self.selection[0].ID,
            //     isOrderHrefReturn: 'order',
            //     tabTitle: '退换货单新增',
            //   },
            // })

            self.$store.commit('customize/TabOpen', {
              id: -1,
              type: 'action',
              name: 'returngood',
              label: $it('pL.addReturnOrder'), // 退换货单新增
              query: {
                id: -1,
                orderHrefReturnid: self.selection[0].ID,
                isOrderHrefReturn: 'order',
                tabTitle: $it('pL.addReturnOrder') // 退换货单新增
              }
            });
            // self.selection = [];
          } // 按钮点击事件
        },
        {
          webname: 'Amendment Notes' // 批量修改备注
        },
        // {
        //   text: "工单", //按钮文本
        //   btnclick: () => {} //按钮点击事件
        // },
        {
          text: $it('btn.beOut_of_stock'), // 缺货重新占单
          webname: 'Out-of-stock reopening',
          btnclick: () => {
            const self = this;
            if (self.selection.length > 0) {
              self.btnConfig.loading = true;
              const ids = [];
              self.selection.forEach((item, index) => {
                ids[index] = item.ID;
              });
              self.service.orderCenter
                .queryshortagSearchOrder({ ids })
                // self.$network
                //   .post('/api/cs/oc/oms/v1/queryshortagSearchOrder', { ids })
                .then(res => {
                  if (res.data.code === 0) {
                    self.$Message.success(res.data.message);
                    self.getData();
                    self.selection = [];
                  } else {
                    self.$Modal.error({
                      title: $it('mT.tips'), // 提示
                      content: res.data.message,
                      cancelType: true,
                      titleAlign: 'left',
                      mask: true,
                      draggable: true,
                      keyDown: event => {
                        if (event.keyCode == 27 || event.keyCode == 13) {
                          self.$Modal.remove();
                        }
                      }
                    });
                  }
                  self.btnConfig.loading = false;
                });
            } else {
              self.$Message.warning({
                content: $it('tip.b9'),
                duration: 5,
                top: 80
              });
            }
          } // 按钮点击事件
        },
        {
          text: $it('btn.fubaoOut_of_stock'), // 福袋缺货重新占单
          webname: 'FortuneBag-Out-of-stock reopening',
          btnclick: () => {
            const self = this;
            if (self.selection.length > 0) {
              self.btnConfig.loading = true;
              const ids = [];
              self.selection.forEach((item, index) => {
                ids[index] = item.ID;
              });
              self.service.orderCenter
                .queryFortuneBagShortage({ ids })
                // self.$network
                //   .post('/api/cs/oc/oms/v1/queryFortuneBagShortage', { ids })
                .then(res => {
                  if (res.data.code === 0) {
                    self.$Message.success(res.data.message);
                    self.getData();
                    self.selection = [];
                  } else {
                    self.$Modal.error({
                      title: $it('mT.tips'), // 提示
                      content: res.data.message,
                      cancelType: true,
                      titleAlign: 'left',
                      mask: true,
                      draggable: true,
                      keyDown: event => {
                        if (event.keyCode == 27 || event.keyCode == 13) {
                          self.$Modal.remove();
                        }
                      }
                    });
                  }
                  self.btnConfig.loading = false;
                });
            } else {
              self.$Message.warning({
                content: $it('tip.c0'), // 请选择需要福袋缺货重新占单的记录！
                duration: 5,
                top: 80
              });
            }
          } // 按钮点击事件
        },
        // {
        //   text: "复制订单", //按钮文本
        //   btnclick: () => {
        //     let self = this;
        //     self.selection = self.$refs.agGridChild.AGTABLE.getSelect();
        //     if (self.selection.length === 1) {
        //       let query = {
        //         copyOrder: true,
        //         id: self.selection[0].ID
        //       };
        //       self.$store.commit("customize/TabHref", {
        //         id: -1,
        //         type: "action",
        //         name: "orderManageAdd",
        //         label: "零售发货单新增",
        //         query: query
        //       });
        //     } else {
        //       self.$Message.warning({
        //         content: "请选择一条需要复制的订单！",
        //         duration: 5,
        //         top: 80
        //       });
        //     }
        //   } //按钮点击事件
        // },
        /* {
          text: $it('btn.copyOrder') // 复制订单
        }, */
        {
          webname: 'OrderWrongCopy' // 错发复制
        },
        {
          webname: 'OrderMissSendCopy' // 漏发复制
        },
        {
          webname: 'OrderGiftsOutCopy' // 赠品出库复制
        },
        {
          webname: 'oriInvalidCopy' // 原单无效复制
        },
        {
          text: $it('btn.note_import'), // 备注导入
          webname: 'beizhudaoru',
          btnclick: () => {
            const _this = this;
            _this.importTable.componentData = {
              tableName: 'OUT_OF_STOCK_MEMO'
            };
            _this.importTable.confirmTitle = $it('btn.note_import');
            _this.$children.find(item => item.name === 'importTable').openConfirm();
          } // 按钮点击事件
        },
        // {
        //   text: "重新分配快递", //按钮文本
        //   btnclick: () => {
        //     this.distributeLogisticsModal = true;
        //   } //按钮点击事件
        // },
        // {
        //   text: "重新分配仓库", //按钮文本
        //   btnclick: () => {
        //     this.distributeWarehouseModal = true;
        //   } //按钮点击事件
        // },
        {
          text: $it('btn.changeTo_platformShipment'), // 更改为平台发货
          btnclick: () => {
            const self = this;
            if (self.selection.length > 0) {
              self.btnConfig.loading = true;
              const ids = [];
              self.selection.forEach((item, index) => {
                ids[index] = item.ID;
              });
              const param = {
                ids
              };
              self.service.orderCenter
                .doManualDeliveryOrder(param)
                // self.$network
                //   .post('/api/cs/oc/oms/v1/doManualDeliveryOrder', param)
                .then(res => {
                  if (res.data.code === 0) {
                    self.$Message.success(res.data.message);
                    self.getData();
                    self.selection = [];
                  } else {
                    self.$Modal.error({
                      title: $it('mT.tips'), // 提示,//提示
                      content: res.data.message,
                      cancelType: true,
                      titleAlign: 'left',
                      mask: true,
                      draggable: true,
                      keyDown: event => {
                        if (event.keyCode === 27 || event.keyCode === 13) {
                          self.$Modal.remove();
                        }
                      }
                    });
                  }
                  self.btnConfig.loading = false;
                });
            } else {
              self.$Message.warning({
                content: $it('tip.c1'), // 请选择需要更改为平台发货的记录!
                duration: 5,
                top: 80
              });
            }
          }
        },
        /* {
          text: $it('btn.batchModifyGoods') // 批量改商品
        }, */
        {
          webname: 'order_gh' // 替换商品
        },
        {
          webname: 'Adding gifts' // 添加赠品
        },
        {
          webname: 'Delete_Merchandise' // 删除赠品
        },
        /* {
          text: $it('btn.batchSplitOrder') // 批量拆单
        }, */
        {
          webname: 'appointSplit' // 指定商品拆单
        },
        {
          webname: 'shortageSplit' // 缺货拆单
        },
        {
          // text: $it('btn.batch_chargeback'), // 批量退单
          webname: 'batchReturnOrder',
          btnclick: () => {
            const self = this;
            if (self.selection.length > 0) {
              try {
                self.checkBatchReturnOrder(self.selection);
              } catch (err) {
                self.$Message.error(err.message);
                return;
              }
              self.batchReturnOrderModal = true;
            } else {
              self.$Message.warning({
                content: $it('tip.c2'), // 请选择需要批量退单的记录！
                duration: 5,
                top: 80
              });
            }
          }
        },
        {
          text: $it('btn.release_inventory'), // 释放库存
          btnclick: () => {
            const self = this;
            const ids = [];
            let statusFlag = false;
            if (self.selection.length > 0) {
              self.selection.forEach((item, index) => {
                ids[index] = item.ID;
                if (item.ORDER_STATUS != 1) {
                  statusFlag = true;
                }
              });
              if (statusFlag) {
                self.$Message.warning({
                  content: $it('tip.c3'), // 选择的订单中存在非待审核订单, 不允许释放库存！
                  duration: 5,
                  top: 80
                });
                return;
              }
              self.btnConfig.loading = true;
              this.$Modal.info({
                title: $it('mT.tips'), // 提示,
                content: $it('tip.c4'), // 是否确定将选择的订单占用的库存释放？
                mask: true,
                showCancel: true,
                okText: $it('com.determine'), // 确定
                cancelText: $it('com.cancel'), // 取消
                onCancel: () => {
                  self.service.orderCenter
                    .releaseInventory({ ids })
                    // self.$network
                    //   .post('/p/cs/releaseInventory', { ids })
                    .then(res => {
                      if (res.data.code === 0) {
                        self.$Message.success(res.data.message);
                        self.getData();
                        self.selection = [];
                      } else {
                        self.$Modal.error({
                          title: $it('mT.tips'), // 提示,
                          content: res.data.message,
                          cancelType: true,
                          titleAlign: 'left',
                          mask: true,
                          draggable: true,
                          keyDown: event => {
                            if (event.keyCode === 27 || event.keyCode === 13) {
                              self.$Modal.remove();
                            }
                          }
                        });
                      }
                      self.btnConfig.loading = false;
                    });
                },
                onOk: () => {
                  self.btnConfig.loading = false;
                }
              });
            } else {
              self.$Message.warning({
                content: $it('tip.c'), // 请选择需要库存释放的订单！
                duration: 5,
                top: 80
              });
            }
          } // 按钮点击事件
        },
        {
          // text: $it('btn.mergeOrders'), // 合并订单
          webname: 'mergeOrderOne',
          btnclick: () => {
            this.existMergableOrder('mergeOrder');
          }
        },
        {
          text: $it('btn.cancel_mergeOrders'), // 取消合并订单
          webname: 'cancelMergeOrder',
          btnclick: () => {
            this.cancelMergeOrder();
          }
        },
        {
          webname: 'OcBOrderImportCmd', // 导入
          webid: 3025
        },
        {
          webname: 'OcBOrderExportCmd', // 导出
          btnclick: () => {
            this.exportClick();
          } // 按钮点击事件
        }, {
          webname: 'createPayableAdjustment', // 生成赔付单
          btnclick: () => {
            this.generateToPaySingle();
          } // 按钮点击事件
        },
        {
          icon: 'iconfont iconbj_setup', // 按钮图标
          btnclick: () => {
            const self = this;
            // if (self.iconDownIcon === 'ark-icon iconfont iconios-arrow-down') {
            //   self.iconDownIcon = 'ark-icon iconfont iconios-arrow-up';
            // } else {
            //   self.iconDownIcon = 'ark-icon iconfont iconios-arrow-down';
            // }
            self.isShowSeniorOrOrdinary = true;
            publicDialogConfig.dropSortConfig.confirmTitle = '查询条件设置'
            self.publicBouncedConfig = {
              ...publicDialogConfig.dropSortConfig
            };
            self.publicBouncedConfig.componentData = {
              typeName: 'OC_B_ORDER'
            };
            setTimeout(() => {
              self.$children.find(item => item.name === 'setFormDrag').openConfirm();
            }, 100);
          } // 按钮点击事件
        },
        {
          icon: 'iconfont iconbj_col', // 收藏图标
          name: $it('btn.collection'),
          btnclick: () => {
            const self = this;
            self.setFavorite();
          } // 按钮点击事件
        },
        {
          label: '标签', // 标签字段名称
          column: 'tag', // 标签字段
          trigger: '', // 触发方式
          list: [] // 选项
        }
      ],
      selectValue: [],
      // 表单搜索
      btnsSearch: {
        typeAll: 'error', // 按钮统一风格样式
        buttons: [
          {
            text: '查找', // 按钮文本
            btnclick: () => {
              this.loadData();
            } // 按钮点击事件
          },
        ],
      },
      batchReturnFormConfig: {
        formValue: {
          IS_BACK: false
        },
        formData: [
          {
            style: 'checkbox', // 勾选框类型
            label: $it('fL.whether_returned'), // 前面的文字
            value: 'IS_BACK', // 输入框的值
            width: '6', // 所占的宽度
            checked: false // 是否勾选控制
          }
        ]
      },
      // 高级搜索表单
      formConfig: {
        btn: {
          typeAll: 'error', // 按钮统一风格样式
          buttons: [
            {
              text: '查找', // 按钮文本
              btnclick: () => {
                this.loadData();
              } // 按钮点击事件
            },
            {
              text: '重置', // 按钮文本
              type: 'default',
              btnclick: () => {
                const _this = this;
                _this.clearFromListValue = true;
                _this.queryInfoData = [];
                _this.labelData = [];
                _this.highSearchData = [];
                _this.getHeaderList();
              } // 按钮点击事件
            }
          ]
        },
        iconSite: 'bottomCenter', // rightTop
        flodClick: (v) => {},
        // setColnum: 4, // 4列
        // setRow: 3, // 3行
        formValue: {},
        formData: []
      },
      // 状态枚举
      orderStatus: {
        orderUnconfirmed: 1, // 待审核
        waitDistribution: 50, // 待分配
        audited: 3, // 已审核
        waitSendWMS: 21, // 待传wms
        distributioning: 4, // 配货中
        orderOutofstock: 2, // 缺货
        orderCancel: 7, // 已取消
        orderSystemInvalid: 8, // 系统作废
        warehouseDelivery: 5, // 仓库发货
        platformDelivery: 6 // 平台发货
      },
      formValObj: {},
      isExport: false,
      state: false,  // 是否表头有缓存
    };
  },
  activated() {
    // 获取默认数据
    const self = this;
    this.$OMS2.BtnConfig.target = self;
    BurgeonEvent.target = self;
    this.$OMS2.BtnConfig.singleType = 0;
    // _self.agTableConfig.pagenation.current = 1;
    // 检测屏幕变化 设置高度 重新渲染agTabe
    // $utils.onresizes(self, 40);
  },
  // deactivated() {
  //   let columnData = this.$refs.agGridChild.AGTABLE.api.columnController.getDisplayedColumns();
  //   let AllData = this.$refs.agGridChild.AGTABLE.api.columnController.columnApi.getAllColumns();
  //   console.log(columnData)
  //   console.log(AllData);
  //   let data = columnData.map((item, index) => {
  //     return item.colDef
  //   })
  //   let allData = AllData.map(item => {
  //     return item.colDef
  //   })
  //   localStorage.setItem('AllColumns', JSON.stringify(allData));
  //   localStorage.setItem('DisplayedColumns', JSON.stringify(data));
  // },
  mounted() {
    // 获取普通搜索的标签数据
    // this.getSearchData();
    // 获取from数据
    // this.getFromData();
    console.log('---btnConfig::', this.btnConfig);
    const _this = this;
    // const buttons = _this.$OMS2.BtnConfig.config();
    _this.btnConfig.buttons = [..._this.btnConfig.buttons, ..._this.extendBtn];
    _this.getHeaderList();
    _this.$nextTick(() => {
      _this.getPermissions('btnConfig', 'orderManager');
    });
    console.log('---btnConfig22::', this.btnConfig);
    // 计算高度 通过设置节点 'totalHeight'
    $utils.setTableHeight(_this, 80);

    // let exist = JSON.parse(localStorage.getItem('DisplayedColumns'));
    // let Allexist = JSON.parse(localStorage.getItem('AllColumns'));
    // if(exist !== null){
    //   let isSome;
    //   Allexist.forEach(item => {
    //     isSome = exist.some(items => items.field === item.field);
    //     if(isSome) {
    //       item.hide = false;
    //     }else {
    //       item.hide = true;
    //       this.state = true;
    //     }
    //     if(item.field === '__ag_sequence_column_name__'){
    //       item.hide = false;
    //     }
    //     if (['PRESELL_WAY', 'ADVANCE_TYPE'].includes(item.field)) {
    //       // this.state = false;
    //       item.field = 'ADVANCE_TYPE';
    //       item.headerName = '预售类型';
    //       item.hide = false;
    //     }
    //   });
    //   this.showData = Allexist;
    // }
  },
  methods: {
    colPinned() { },
    colMoved() { },
    onSelectionChange(e) {
      this.selection = e;
    },
    onSortChanged() {
      this.getData();
    },
    // 丢单复制、错发复制、漏发复制、赠品出库复制
    copyRouteChange(type) {
      const self = this;
      if (!self.selection.length) {
        // 请先选择需要复制的订单
        self.$Message.warning($it('tip.a1'));
        return;
      }
      const selectItem = self.selection[0];
      const ORDERSTATUSNAME = selectItem.ORDERSTATUSNAME;
      if (self.selection.length === 1) {
        if (selectItem.COPY_REASON) {
          // 订单只能是原单才能复制
          self.$Message.warning($it('tip.a2'));
          return;
        }
        // 原单无效复制
        if (type === 'oriInvalidCopy') {
          // 已取消
          if (selectItem.ORDER_STATUS != 7 && selectItem.ORDER_STATUS != 8) {
            // 非已取消或系统作废订单，不允许复制
            self.$Message.error($it('tip.a3'));
            return;
          }
          // 仓库发货
          // 平台发货
        } else if (ORDERSTATUSNAME !== $it('other.warehouseDelivery') && ORDERSTATUSNAME !== $it('other.platformDelivery')) {
          // 只能对【仓库发货，平台发货】订单状态的原单进行复制操作
          self.$Message.error($it('tip.a4'));
          return;
        }
        // 默认是丢单复制的query
        const query = {
          id: selectItem.ID,
          pageTitle: type
        };
        // 丢单复制
        if (type === 'Drop-out copy') {
          query.orderCopy = true;
        } else {
          query.copyOrder = true;
        }
        self.$store.commit('customize/TabHref', {
          id: -1,
          type: 'action',
          name: 'orderManageAdd',
          label: '零售发货单新增',
          query
        });
      } else {
        self.$Message.warning({
          content: $it('tip.a5'), // 请选择一条需要复制的订单！
          duration: 5,
          top: 80
        });
      }
    },
    // 是否还存在可合并的JIT订单
    async existMergableOrder(type) {
      const self = this;
      const fromdata = new FormData();
      const param = {
        ids: self.selection.map(val => val.ID)
      };
      fromdata.append('param', JSON.stringify(param));
      await self.service.orderCenter
        .checkOtherMergeOrder(fromdata)
        .then(res => {
          self.pageLoad = false;
          if (res.data.code == 0) {
            this[type]();
          } else if (res.data.code === -3) {
            this.$Modal.info({
              title: $it('mT.tips'), // 提示
              content: res.data.message, // 零售发货单/JIT订单中间表存在可合并的订单还未参与合并，仍要继续次操作吗？
              mask: true,
              showCancel: true,
              okText: $it('com.determine'), // 确定
              cancelText: $it('com.cancel'), // 取消
              onOk: () => {
                self[type]();
              },
              onCancel: () => {
                self.$emit('closeActionDialog', false);
              }
            });
          } else if (res.data.code === -1) {
            self.$Message.error(res.data.message);
          }
        })
        .catch(() => {
          self.pageLoad = false;
        });
    },
    // 审核
    auditOrder() {
      const self = this;
      if (self.selection.length > 0) {
        self.btnConfig.loading = true;
        const ids = [];
        self.selection.forEach((item, index) => {
          ids[index] = item.ID;
        });
        this.service.orderCenter
          .auditOrder({
            ids,
            type: '1',
            isCheck: 0
          })
          .then(res => {
            if (res.data.code === 0) {
              self.$Modal.success({
                title: $it('mT.tips'), // 提示
                content: res.data.message,
                cancelType: true,
                titleAlign: 'left',
                mask: true,
                draggable: true,
                keyDown: event => {
                  if (event.keyCode == 27 || event.keyCode == 13) {
                    self.$Modal.remove();
                  }
                }
              });
              self.selection = [];
              self.getData();
            } else {
              self.$Modal.error({
                title: $it('mT.tips'), // 提示
                content: res.data.message,
                cancelType: true,
                titleAlign: 'left',
                mask: true,
                draggable: true,
                keyDown: event => {
                  if (event.keyCode == 27 || event.keyCode == 13) {
                    self.$Modal.remove();
                  }
                }
              });
            }
            self.btnConfig.loading = false;
          });
      } else {
        self.$Message.warning({
          content: $it('tip.a6'), // 请选择需要审核的记录！
          duration: 5,
          top: 80
        });
      }
    },
    // 合并订单
    mergeOrder() {
      const self = this;
      let message = '';
      const selectionLength = self.selection.length;
      if (selectionLength === 0) {
        self.$Message.warning({
          content: $it('tip.d7'), // 请选择要合并的单据！
          duration: 5,
          top: 80
        });
        return;
      }
      for (const item of self.selection) {
        // 待审核  已审核
        if (item.ORDERSTATUSNAME !== '待审核') {
          // 要合并的单据的订单状态只能为待审核或已审核
          message = $it('tip.e7');
          break;
        } else if (item.PAYTYPENAME === '货到付款') {
          // 要合并的单据的付款方式只能为非货到付款
          message = $it('tip.e8');
          break;
        } else if (item.RESERVE_VARCHAR03_NAME !== '非预售' && item.RESERVE_VARCHAR03_NAME !== '预售尾款已付') {
          // 要合并的单据的预售状态只能为非预售
          message = $it('tip.e9');
          break;
        } else if (item.CP_C_PHY_WAREHOUSE_ENAME === '') {
          // 要合并的单据的发货仓库只能为非空
          message = $it('tip.f0');
          break;
        }
      }
      if (message.length !== 0) {
        self.$Message.warning({
          content: message,
          duration: 5,
          top: 80
        });
        return;
      }
      const fromdata = new FormData();
      const param = {
        tableid: self.$route.query.id,
        ids: self.selection.map(val => val.ID),
        menu: '合并订单'
      };
      fromdata.append('param', JSON.stringify(param));
      self.pageLoad = true;
      self.service.orderCenter
        .mergeOrderOne(fromdata)
        // self.$network
        //   .post('/api/cs/oc/oms/v1/mergeOrderOne', formdata)
        .then(res => {
          self.pageLoad = false;
          if (res.data.code === 0) {
            // 合并订单成功
            self.$Message.success(res.data.message || $it('tip.f1'));
            self.getData();
            self.selection = [];
          } else {
            // 合并订单失败
            self.$Message.error(res.data.message || $it('tip.f2'));
          }
        })
        .catch(() => {
          self.pageLoad = false;
        });
    },
    // 取消合并订单
    cancelMergeOrder() {
      const self = this;
      if (self.selection.length === 0) {
        // 请选择需要操作的单据！
        this.$Message.warning($it('tip.d8'));
        return;
      }
      for (const item of self.selection) {
        if (!['缺货', '待审核', '已审核'].includes(item.ORDERSTATUSNAME)) {
          // 当前状态异常，不允许操作！
          this.$Message.warning($it('tip.d9'));
          return;
        }
      }
      const fromdata = new FormData();
      const param = {
        tableid: self.$route.query.id,
        ids: self.selection.map(val => val.ID),
        menu: '取消合并订单'
      };
      fromdata.append('param', JSON.stringify(param));
      self.pageLoad = true;
      self.service.orderCenter
        .cancelMergeOrder(fromdata)
        .then(res => {
          self.pageLoad = false;
          if (res.data.code === 0) {
            // 取消合并订单成功
            self.$Message.success(res.data.message || $it('tip.f3'));
            self.getData();
            self.selection = [];
          } else {
            // 取消合并订单失败
            self.$Message.error(res.data.message || $it('tip.f4'));
          }
        })
        .catch(() => {
          self.pageLoad = false;
        });
    },
    // 获取高级查询&表头
    getHeaderList() {
      const _this = this;
      // 清除高级搜索
      _this.formConfig.formValue = {
        ID: '',
        SOURCE_CODE: '',
        EXPRESSCODE: '',
        RECEIVER_NAME: '',
        RECEIVER_MOBILE: '',
        BUYER_MESSAGE: '',
        PS_C_SKU_ECODE: '',
        SELLER_MEMO: '',
        QTY_ALL: {
          value1: '',
          value2: ''
        },
        BILL_NO: '',
        USER_NICK: '',
        ORDER_AMT: {
          value1: '',
          value2: ''
        },
        PS_C_PRO_ECODE: '', // 商品款号
        IS_EXCHANGE_NO_IN: [],
        RECEIVER_ADDRESS: '', // 收货地址
        SYSREMARK: '', // 系统备注
      };
      const fromdata = new FormData();
      const params = {
        table: 'OC_B_ORDER',
        column_include_uicontroller: true,
        fixedcolumns: {},
        multiple: [],
        startindex: 0
      };
      fromdata.append('param', JSON.stringify(params));
      _this.agTableConfig.agLoading = true;
      _this.service.orderCenter.getSeniorQueryCondition(fromdata).then(res => {
        // 高级查询
        const formData = [];
        if (res.data.data) {
          res.data.data.highSearch.forEach((item, index) => {
            if (item.type === 'date') {
              formData[index] = {
                style: item.tabth.isfilter ? 'date' : '', // 输入框类型
                type: 'datetimerange', // 文本框类型的input
                label: item.tabth.name, // 输入框前文字
                value: item.tabth.colname, // 输入框的值
                // format: "yyyy-MM-dd hh:mm:ss",
                width: '6', // 所占的宽度 (宽度分为24份,数值代表所占份数的宽度)
                icon: 'md-alarm', // 输入框后带的图标,暂只有输入框支持
                placeholder: '', // 占位文本，默认为请输入
                ghost: false, // 是否关闭幽灵按钮，默认开启
                inputenter: () => {
                  _this.loadData();
                }, // 表单回车事件
                iconclick: () => { }, // 点击icon图标事件
                clearable: true
              };
              _this.formConfig.formValue[item.tabth.colname] = [];
            }
            if (item.type === 'propInput') {
              formData[index] = {
                style: 'popInputPlus', // 输入框弹框单多选
                width: '6',
                itemdata: {
                  col: 1,
                  colid: item.tabth.colid,
                  colname: item.tabth.colname, // 当前字段的名称
                  datelimit: 'all',
                  display: 'text', // 显示什么类型，例如xml表示弹窗多选加导入功能，mrp表示下拉多选
                  fkdisplay: item.tabth.fkdisplay, // 外键关联类型
                  fkdesc: item.tabth.fkdesc,
                  inputname: 'CP_C_STORE_IDS:ENAME', // 这个是做中文类型的模糊查询字段，例如ENAME
                  isfk: true, // 是否有fk键
                  isnotnull: false, // 是否必填
                  isuppercase: false, // 是否转大写
                  length: 65535, // 最大长度是多少
                  name: item.tabth.name, // input前面显示的lable值
                  readonly: false, // 是否可编辑，对应input   readonly属性
                  reftable: item.tabth.reftable,
                  reftableid: item.tabth.reftableid,
                  row: 1,
                  statsize: -1,
                  type: item.tabth.type, // 这个是后台用的
                  verion: '1.4',
                  valuedata: '' // 这个是选择的值
                }
              };
              if (item.tabth.precolnameslist) {
                formData[index].itemdata.precolnameslist = item.tabth.precolnameslist ? item.tabth.precolnameslist : [];
              }
            }
            if (item.type === 'text') {
              formData[index] = {
                style: item.tabth.isfilter ? 'input' : '', // 输入框类型
                label: item.tabth.name, // 输入框前文字
                value: item.tabth.colname, // 输入框的值
                width: '6', // 所占的宽度 (宽度分为24份,数值代表所占份数的宽度)
                icon: '', // 输入框后带的图标,暂只有输入框支持
                clearable: true,
                placeholder: '', // 占位文本，默认为请输入
                ghost: false, // 是否关闭幽灵按钮，默认开启
                inputenter: () => {
                  _this.loadData();
                }, // 表单回车事件
                iconclick: () => { } // 点击icon图标事件
              };
              _this.formConfig.formValue[item.tabth.colname] = '';
            }
            if (item.type === 'number') {
              formData[index] = {
                // style: item.tabth.isfilter ? "input" : "", //输入框类型
                style: item.tabth.isfilter ? 'bothInput' : '', // 输入框类型
                label: item.tabth.name, // 输入框前文字
                value: item.tabth.colname, // 输入框的值
                clearable: true,
                regx: _this.determineTheRegular(item.tabth.colname),
                width: '6', // 所占的宽度 (宽度分为24份,数值代表所占份数的宽度)
                icon: '', // 输入框后带的图标,暂只有输入框支持
                placeholder: '', // 占位文本，默认为请输入
                ghost: false, // 是否关闭幽灵按钮，默认开启
                inputenter: () => {
                  _this.loadData();
                }, // 表单回车事件
                iconclick: () => { } // 点击icon图标事件
              };
              _this.formConfig.formValue[item.tabth.colname] = {
                value1: '', // 第一个数字框绑定的值
                value2: '' // 第二个数字框绑定的值
              };
            }
            if (item.type === 'select') {
              formData[index] = {
                style: item.tabth.isfilter ? 'select' : '', // 下拉框类型
                label: item.tabth.name, // 下拉框前的值
                width: '6', // 所占宽度宽度
                placeholder: '', // 占位文本，默认为请输入
                value: item.tabth.colname, // 输入框的值
                multiple: true, // 布尔值,下拉框是否开启多选,默认为不开启
                selectChange: () => { }, // 选中事件，默认返回选中的值
                options: _this.converSelect(item.tabth.combobox)
              };
              _this.formConfig.formValue[item.tabth.colname] = [];
              // if (item.tabth.colname === 'IS_EXCHANGE_NO_IN') _this.formConfig.formValue[item.tabth.colname] = ['1'];
            }
          });
          _this.formConfig.formData = formData;
          if (!this.state) {
            const arr = res.data.data.tableHeader
            const hideArr = [
              'SPLIT_REASON_ID', 'PRESELL_WAY', 'HAS_TAG', 'HAS_NO_TAG',
              'PLATFORM_STATUS', 'TIME_OUT_RANGE', 'SKU_NUMIID', 'NUM_IID',
              'ESTIMATE_CON_TIME'
            ]; // 预售拆单原因、预售方式、标签、不含标签、平台状态、超时范围、平台SKUID、平台商品字段、预计发货时间
            arr.forEach(item => {
              // const obj = {};
              if (hideArr.includes(item.key)) {
                item.hide = true;
              }
              item.headerName = item.title;
              item.field = item.key;
              item.tdAlign = 'left';
              item.isagfilter = true;
              /* if (item.key !== 'SPLIT_REASON_ID' && item.key !== 'ADVANCE_TYPE') { // 预售拆单原因 预售状态
                if (item.key === 'SG_B_OUT_BILL_NO') obj.width = '150px';
                arr.push(obj);
              } */
            });
            /* arr.unshift({
              "headerName": "序号",
              "width": 90,
              isorder: true, // checkboxSelection为true时排序不生效！？
              sort:'desc',
              "field": "index",
              checkboxSelection: true,
              pinned: 'left',
              headerClass: '',
              cellStyle: {color: 'rgb(15, 142, 233)'},
            }) */
            _this.agTableConfig.columnDefs = arr;
            _this.agTableConfig.agLoading = false;
          } else {
            _this.agTableConfig.columnDefs = this.showData;
          }


          // 下拉数据 定义
          const dropList = [];
          res.data.data.queryInfo.forEach((item, index) => {
            if (item.type === 'Select') {
              dropList[index] = {
                label: item.displayName, // 字段名称
                column: item.queryName, // 字段
                placeholder: '', // 占位文本
                type: item.type === 'date' ? 'DatePicker' : item.type, // 类型
                componentAttribute: {
                  multiple: true,
                  'label-in-value': true,
                  clearable: true
                }, // 组件属性
                list: item.list, // 选项
                value: '', // 选中值
                noClearSearchValue: true // 查询后是否清除输入框内的值,默认false-清除,true:不清除
              };
            } else if (item.type === 'DropDownSelectFilter') {
              dropList[index] = {
                label: item.displayName, // 字段名称
                column: item.queryName, // 字段
                placeholder: '', // 占位文本
                type: item.type, // 类型 item.type
                value: '',
                componentAttribute: {
                  totalRowCount: 0,
                  single: false, // 是否是单选
                  data: {
                    start: 0,
                    tabth: [],
                    row: []
                  },
                  pageSize: 10,
                  AutoData: [],
                  hidecolumns: [
                    'ID',
                    'SELLER_NICK',
                    'ECODE',
                    'CP_C_PLATFORM_ENAME',
                    'CONTACT_NAME',
                    'CP_C_STORE_NATURE_ID',
                    'JIT_WAREHOUSE_ECODE',
                    'MOBILEPHONE_NUM',
                    'ORIGINAL_RETURN_PHY_WAREHOUSE_ID',
                    'OWNER_CODE',
                    'PHONE_NUM',
                    'REMARK',
                    'SELLER_AREA_ID',
                    'SELLER_CITY_ID',
                    'SELLER_PROVINCE_ID',
                    'SELLER_ZIP',
                    'SEND_ADDRESS',
                    'WH_TYPE',
                    'WMS_ACCOUNT',
                    'WMS_WAREHOUSE_CODE'
                  ]
                }, // 组件属性
                componentEvent: {
                  'on-popper-show': () => {
                    const self = this;
                    // let premtype = '';
                    // if (item.selectTab.tabth.name === '店铺') {
                    //   premtype = 'CP_C_SHOP_PERMISSION_ID';
                    // } else if (item.selectTab.tabth.name === '发货仓库') {
                    //   premtype = 'CP_C_WAREHOUSE_ID';
                    // }
                    const params = {
                      isdroplistsearch: true,
                      refcolid: item.selectTab.tabth.colid,
                      fixedcolumns: {},
                      startindex: 0,
                      range: 10,
                      precolnameslist: item.selectTab.tabth.precolnameslist
                      // precolnameslist: [
                      //   {
                      //     iswrite: 'false',
                      //     refcol: 'ID',
                      //     premtype
                      //   }
                      // ]
                    };
                    const data = new URLSearchParams();
                    data.append('searchdata', JSON.stringify(params));
                    self.service.orderCenter
                      .QueryList(data)
                      // self.$network
                      //   .post('/p/cs/QueryList', data)
                      .then(res => {
                        dropList[index].componentAttribute.data = res.data.datas;
                        dropList[index].componentAttribute.totalRowCount = res.data.datas.totalRowCount;
                      });
                  },
                  'on-page-change': e => {
                    const self = this;
                    // let premtype = '';
                    // if (item.selectTab.tabth.name === '店铺') {
                    //   premtype = 'CP_C_SHOP_PERMISSION_ID';
                    // } else if (item.selectTab.tabth.name === '发货仓库') {
                    //   premtype = 'CP_C_WAREHOUSE_ID';
                    // }
                    const params = {
                      isdroplistsearch: true,
                      refcolid: item.selectTab.tabth.colid,
                      fixedcolumns: {},
                      startindex: (e - 1) * 10,
                      range: 10,
                      precolnameslist: item.selectTab.tabth.precolnameslist
                      // precolnameslist: [
                      //   {
                      //     iswrite: 'false',
                      //     refcol: 'ID',
                      //     premtype
                      //   }
                      // ]
                    };
                    const data = new URLSearchParams();
                    data.append('searchdata', JSON.stringify(params));
                    self.service.orderCenter
                      .QueryList(data)
                      // self.$network
                      //   .post('/p/cs/QueryList', data)
                      .then(res => {
                        dropList[index].componentAttribute.data = res.data.datas;
                        dropList[index].componentAttribute.totalRowCount = res.data.datas.totalRowCount;
                      });
                  },
                  'on-input-value-change': async e => {
                    // let colid;
                    // if (item.selectTab.tabth.name === '店铺') {
                    //   colid = '167606';
                    // } else if (item.selectTab.tabth.name === '发货仓库') {
                    //   colid = '167640';
                    // }
                    const formdata = new FormData();
                    formdata.append('ak', e.trim());
                    // formdata.append('colid', colid);
                    formdata.append('colid', item.selectTab.tabth.colid);
                    formdata.append('fixedcolumns', JSON.stringify({}));
                    const res = await this.service.common.fuzzyquerybyak(formdata);
                    if (res.data.code == 0) {
                      this.dropList.filter(key => key.label == item.displayName)[0].componentAttribute.AutoData = res.data.data;
                    } else {
                      this.dropList.filter(key => key.label == key.displayName)[0].componentAttribute.AutoData = [];
                    }
                    // const self = this;
                    // let premtype = '';
                    // if (item.selectTab.tabth.name === '店铺') {
                    //   premtype = 'CP_C_SHOP_PERMISSION_ID';
                    // } else if (item.selectTab.tabth.name === '发货仓库') {
                    //   premtype = 'CP_C_WAREHOUSE_ID';
                    // }
                    // const params = {
                    //   isdroplistsearch: true,
                    //   refcolid: item.selectTab.tabth.colid,
                    //   fixedcolumns: {},
                    //   startindex: (e - 1) * 10,
                    //   range: 10,
                    //   precolnameslist: [
                    //     {
                    //       iswrite: 'false',
                    //       refcol: 'ID',
                    //       premtype
                    //     }
                    //   ]
                    // };
                    // const data = new URLSearchParams();
                    // data.append('searchdata', JSON.stringify(params));
                    // self.service.orderCenter
                    //   .QueryList(data)
                    //   // self.$network
                    //   //   .post('/p/cs/QueryList', data)
                    //   .then(res => {
                    //     console.log(res);
                    //     if (res.data.code == 0) {
                    //       this.dropList.filter(key => key.label == item.displayName)[0].componentAttribute.AutoData = this.setData(res.data.datas.row);
                    //     } else {
                    //       this.dropList.filter(item => item.label == item.displayName)[0].componentAttribute.AutoData = [];
                    //     }
                    //   });
                  },
                  // 集合搜索的下拉多选组件清空后,去除上次选中的数据
                  'on-clear': e => {
                    console.log('on-clear:', e);
                    e.modelValue = [];
                    this.$refs.integrateSearchFilter.dropDownSelectFilterSelectedValue = [];
                    this.dropList.forEach(item => {
                      if (item.type === 'DropDownSelectFilter') {
                        item.selectedList = [];
                        item.value = '';
                      }
                    });
                  }
                }
              };
            } else {
              dropList[index] = {
                label: item.displayName, // 字段名称
                column: item.queryName, // 字段
                placeholder: '', // 占位文本
                type: item.type === 'date' ? 'DatePicker' : item.type, // 类型
                componentAttribute:
                  item.type === 'date'
                    ? {
                      type: 'datetimerange',
                      value: _this.getCurrentTime(), // ["2018-09-07 09:09:09","2018-09-07 09:09:10"]
                      isEmitOnChange: true
                    }
                    : {}, // 组件属性
                componentEvent: {
                  'on-enter': () => {
                    setTimeout(() => {
                      _this.searchMethod();
                    }, 100);
                  }
                }, // 组件事件
                list: item.list, // 选项
                value: '' // 选中值
              };
            }
            if (item.queryName === 'PAY_TIME') {
              dropList[index].value = `${_this.getCurrentTime()[0]}~${_this.getCurrentTime()[1]}`;
              if (_this.selectValue.length === 0) {
                _this.selectValue.push(dropList[index]);
              }
            }
          });
          _this.dropList = dropList;
          // 标签数据 定义
          const tagList = [];
          res.data.data.label.forEach((item, index) => {
            tagList[index] = {
              label: item.text,
              value: `${item.val}`,
              key: item.key,
              sort: item.sort,
              trigger: 'click'
            };
          });
          _this.tagList[0].list = tagList;
          if (this.$route.query.type === 'workID') {
            this.searchMethod('workID');
            this.selectValue = [];
          } else {
            this.searchMethod();
          }
          _this.setSearchOption();
        } else {
          _this.agTableConfig.agLoading = false;
        }
      });
    },
    // 处理数据
    setData(array) {
      const arr = [];
      array.forEach(item => {
        const obj = {};
        for (const key in item) {
          console.log(key, item[key].val);
          obj[key] = item[key].val;
        }
        arr.push(obj);
      });
      return arr;
    },
    // 展开 并获取from页面数据
    shutDownOrbounceOff() {
      const self = this;
      // self.isShowFromLoading = true;
      // if (self.iconDownIcon === 'ark-icon iconfont iconios-arrow-down') {
      // 打开高级搜索
      // self.iconDownIcon = 'ark-icon iconfont iconios-arrow-up';
      // self.labelData = [];
      // self.queryInfoData = [];
      const dom = document.getElementsByClassName('fromHeight')[0];
      if (self.iconDownIcon === 'ark-icon iconfont iconios-arrow-down') {
        self.iconDownIcon = 'ark-icon iconfont iconios-arrow-up';
        dom.style.height = '100%';
      } else {
        self.iconDownIcon = 'ark-icon iconfont iconios-arrow-down';
        dom.style.height = '124px';
      }
      self.selectValue = []; // 清空高级搜索项
      self.clearFromListValue = true;
      self.isShowSeniorOrOrdinary = !self.isShowSeniorOrOrdinary;
      // } else {
      //   // 关闭高级搜索
      //   self.clearFromListValue = false;
      //   self.iconDownIcon = 'ark-icon iconfont iconios-arrow-down';
      //   self.highSearchData = [];
      //   self.isShowSeniorOrOrdinary = !self.isShowSeniorOrOrdinary;
      //   setTimeout(() => {
      //     $utils.setTableHeight(this, 30);
      //     this.$refs.agGridChild.agGridTable(this.agTableConfig.columnDefs, this.agTableConfig.rowData);
      //   }, 500);
      //   // 设置普通搜索默认选项
      //   self.setSearchOption();
      // }
      // self.isShowFromLoading = false;
      // self.getHeaderList();
      // self.getData();
    },
    // 设置普通搜索默认选项
    setSearchOption() {
      // TODO 调试了下貌似没用到这个方法 暂注释
      setTimeout(() => {
        const slideBox = document.getElementById('IntegrateSearchFilter');
        if (slideBox) {
          setTimeout(() => {
            const pageUl = document.querySelector('.from .ark-dropdown-menu').childNodes[0];
            pageUl.click();
          }, 200);
        }
      }, 100);
    },
    // 判断使用正则
    determineTheRegular(val) {
      let regx = '';
      switch (val) {
        case 'ORDER_AMT': // 订单金额
          regx = /^[1-9][0-9]{0,}$/;
          break;
        case 'QTY_ALL': // 商品数量
          regx = /^[1-9][0-9]{0,}$/;
          break;
        default:
          regx = '';
      }
      return regx;
    },
    // 获取当前时间
    getCurrentTime() {
      const self = this;
      const timestamp = Date.parse(new Date());
      const SevenDaysTimestamp = Date.parse(new Date()) - 7 * 24 * 3600 * 1000;
      const defaultTimeArr = [];
      defaultTimeArr[0] = `${self.dateLong2String(SevenDaysTimestamp)} 00:00:00`;
      defaultTimeArr[1] = `${self.dateLong2String(timestamp)} 23:59:59`;
      return defaultTimeArr;
    },
    // 时间戳转化yyyy-mm-dd
    dateLong2String(time) {
      const date = new Date(time);
      const year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();
      month = month < 10 ? `0${month}` : month;
      day = day < 10 ? `0${day}` : day;
      return `${year}-${month}-${day}`;
    },
    // 数组标准时间转换成yyyy-mm-dd格式
    getTimesValue(time) {
      let timeValue = '';
      const dateone = new Date(time[0]).toJSON();
      const datetwo = new Date(time[1]).toJSON();
      const dateTimeOne = new Date(+new Date(dateone) + 8 * 3600 * 1000)
        .toISOString()
        .replace(/T/g, ' ')
        .replace(/\.[\d]{3}Z/, '');
      const dateTimeTwo = new Date(+new Date(datetwo) + 8 * 3600 * 1000)
        .toISOString()
        .replace(/T/g, ' ')
        .replace(/\.[\d]{3}Z/, '');
      timeValue = `${dateTimeOne}~${dateTimeTwo}`;

      if (timeValue === '1970-01-01 08:00:00~1970-01-01 08:00:00') {
        timeValue = '';
      }
      return timeValue;
    },
    // 刷新按钮
    tableRefreshDetail() {
      this.getData();
    },
    // 字段选项组转换
    converSelect(val) {
      const list = [];
      val.forEach((item, index) => {
        list[index] = {
          label: item.limitdesc,
          value: item.limitval
        };
      });
      return list;
    },
    /* 用于数据深拷贝 */
    reaptData(obj) {
      // 深拷贝
      if (obj instanceof Array) {
        // array
        const temp = [];
        obj.forEach(item => {
          const temp2 = [];
          if (item instanceof Array) {
            item.forEach(item2 => {
              temp2.push(item2);
            });
            temp.push(temp2);
          } else {
            temp.push(item);
          }
        });
        return temp;
      }
      // obj
      const temp = {};
      for (const item in obj) {
        temp[item] = obj[item];
      }
      return temp;
    },

    // 高级搜索
    search() { },
    // DropDownSelectFilter禁止用户输入
    onDropChange(value) {
      console.log('onDropChange::', value);
      // if (value.type === 'DropDownSelectFilter') {
      //   this.$nextTick(() => {
      //     const input = document.querySelector('.ark-integrate-search-filter-container').querySelector('input');
      //     input.setAttribute('disabled', true);
      //     input.classList.add('forceWhite');
      //   });
      // }
    },
    // 清除某个检索项值
    clearItem() {
      this.searchMethod();
    },
    // 清除检索项
    clearAll() {
      this.selectValue = [];
      setTimeout(() => {
        this.searchMethod();
      }, 100);
    },
    // 检索项方法
    searchMethod(isWork) {
      // 取的标签值
      let label = [];
      const queryInfo = [];
      // if (this.isShowSeniorOrOrdinary) {
      //   // 只有高级搜索时queryInfo条件才有效
      //   this.selectValue.forEach((item, index) => {
      //     if (item.column === 'tag') {
      //       label = item.selectedList;
      //     } else if (item.type === 'DatePicker') {
      //       queryInfo[index] = {
      //         type: 'date',
      //         displayName: item.label,
      //         queryName: item.column,
      //         list: item.list,
      //         value: item.value
      //       };
      //     } else if (item.type === 'Select') {
      //       queryInfo[index] = {
      //         type: item.type,
      //         displayName: item.label,
      //         queryName: item.column,
      //         value: item.value,
      //         list: item.selectedList
      //       };
      //     } else if (item.type === 'DropDownSelectFilter') {
      //       queryInfo[index] = {
      //         type: item.type,
      //         displayName: item.label,
      //         queryName: item.column,
      //         value: item.value,
      //         list: item.selectedList
      //       };
      //     } else {
      //       queryInfo[index] = {
      //         type: item.type,
      //         displayName: item.label,
      //         queryName: item.column,
      //         value: item.value.replace(/(^\s*)|(\s*$)/g, ''),
      //         list: item.list
      //       };
      //     }
      //   });
      // }
      const labelData = [];
      label.forEach((item, index) => {
        labelData[index] = {
          val: item.value,
          text: item.label,
          sort: item.sort,
          key: item.key
        };
      });
      if (this.$route.query.type === 'workID' && isWork === 'workID') {
        this.selectValue = [];
        this.agTableConfig.pagenation.current = 1;
        this.getData1();
      } else {
        this.queryInfoData = this.notempty(queryInfo);
        this.labelData = this.notempty(labelData);
        this.agTableConfig.pagenation.current = 1;
        this.getData(true);
      }
    },
    distributeLogistics() {
      const self = this;
      self.selection = [];
      const param = {
        page: {
          pageSize: self.agTableConfig.pagenation.pageSize,
          pageNum: self.agTableConfig.pagenation.current
        },
        label: self.labelData, // 标签
        queryInfo: self.queryInfoData, // 普通搜索
        status: self.statusData,
        highSearch: self.highSearchData
      };
      const fromdata = new FormData();
      fromdata.append('param', JSON.stringify(param));
      self.service.orderCenter.reallocateLogistics(fromdata).then(res => {
        console.log(res);
        // this.$Message.success("后台重新分配快递中...");
      });
    },
    distributeWarehouse() {
      const self = this;
      self.selection = [];
      const param = {
        page: {
          pageSize: self.agTableConfig.pagenation.pageSize,
          pageNum: self.agTableConfig.pagenation.current
        },
        label: self.labelData, // 标签
        queryInfo: self.queryInfoData, // 普通搜索
        status: self.statusData,
        highSearch: self.highSearchData
      };
      const fromdata = new FormData();
      fromdata.append('param', JSON.stringify(param));
      self.service.orderCenter.reallocateWarehouse(fromdata).then(res => {
        console.log(res);
        // this.$Message.success("后台重新分配快递中...");
      });
    },
    loadData() {
      const arr = [];
      this.formConfig.formData.forEach((item, index) => {
        if (item.style === 'popInputPlus') {
          arr[index] = {
            type: 'Select',
            queryName: item.itemdata.colname,
            value: item.itemdata.pid === undefined ? '' : item.itemdata.pid
          };
        }
      });
      const keyArr = [];
      for (const key in this.formConfig.formValue) {
        this.formConfig.formData.forEach((item, index) => {
          if (item.style !== 'popInputPlus') {
            if (key === item.value) {
              if (item.style === 'date') {
                keyArr[index] = {
                  type: item.style,
                  queryName: item.value,
                  value: this.getTimesValue(this.formConfig.formValue[key])
                };
              } else if (item.style === 'input') {
                keyArr[index] = {
                  type: 'Input',
                  queryName: item.value,
                  value: this.formConfig.formValue[key]
                };
              } else if (item.style === 'bothInput') {
                // console.log(this.formConfig.formValue[key]['0'].replace(/(^\s*)|(\s*$)/g, ''));
                keyArr[index] = {
                  type: 'Input',
                  queryName: item.value,
                  value: `${this.formConfig.formValue[key]['0']}~${this.formConfig.formValue[key]['1']}`
                };
              } else if (item.style === 'select') {
                keyArr[index] = {
                  type: 'Select',
                  queryName: item.value,
                  value: this.formConfig.formValue[key].join(',') === 'bSelect-all' ? '' : this.formConfig.formValue[key].join(',')
                };
              }
            }
          }
        });
      }
      const highSearchData = [...this.notempty(arr), ...keyArr];
      this.highSearchData = this.notempty(highSearchData);
      this.agTableConfig.pagenation.current = 1;
      this.getData();
    },

    //  获取页面数据
    async getData(flag) {
      const self = this;
      self.selection = [];
      self.agTableConfig.agLoading = true;
      self.isActive = true;
      // 当出现loading，禁止页面滚动
      document.getElementById('content').style.overflow = 'hidden';
      document.getElementById('content').style.position = '';
      const param = {
        page: {
          pageSize: self.agTableConfig.pagenation.pageSize,
          pageNum: self.agTableConfig.pagenation.current
        },
        label: self.labelData, // 标签
        queryInfo: self.queryInfoData, // 普通搜索
        status: self.statusData,
        highSearch: self.highSearchData,
        sort: self.sort
      };
      // 零售发货单列表tab 区分审核失败/多次缺货类型订单查询
      if (self.statusData.label == '审核失败') {
        param.status = { label: '待审核', value: '1', isShow: true };
        param.lackstockOrAudit = self.statusData.value;
      } else if (self.statusData.label == '多次缺货') {
        param.lackstockOrAudit = self.statusData.value;
        param.status = { label: '缺货', value: '2', isShow: true };
        // } else if (this.statusData.label == '待审核') {
        //   param.lackstockOrAudit = this.statusData.value;
        //   param.status = { label: '待审核', value: '1', isShow: true };
        //   if(param.highSearch.length === 0){
        //     param.highSearch =  [{
        //       type: 'Select',
        //       queryName: 'HAS_NO_TAG',
        //       value: '2,6'
        //     }];
        //   }else {
        //     param.highSearch.forEach(item => {
        //       if(item.queryName === 'HAS_NO_TAG') {
        //         if(item.value != ''){
        //           item.value += ',2,6';
        //         }else{
        //           item.value = '2,6';
        //         }
        //       }
        //     })
        //   }
        // }else{
        //   param.highSearch.forEach(item => {
        //     if(item.queryName === 'HAS_NO_TAG') {
        //       if(item.value != ''){
        //         if (item.value.includes(',2,6')) item.value = item.value.replace(',2,6','')
        //           else item.value = item.value.replace('2,6','')
        //       }
        //     }
        //   })
      }
      const fromdata = new FormData();
      fromdata.append('param', JSON.stringify(param));
      self.service.orderCenter
        .getOrderList(fromdata)
        .then(res => {
          self.agTableConfig.agLoading = false;
          // 当loading结束，页面滚动
          document.getElementById('content').style.overflow = 'auto';
          document.getElementById('content').style.position = 'relative';
          self.isActive = false;
          if (!res.data.data) {
            // self.$refs.agGridChild.AGTABLE.cleanRows(); // 清空表格数据
            // 初始化表格
            self.agTableConfig.pagenation.goodsSum = 0;
            self.agTableConfig.pagenation.total = 0;
            self.agTableConfig.rowData = [];
            // self.$refs.agGridChild.agGridTable(self.agTableConfig.columnDefs, []);
            self.$Message.warning({
              content: res.data.message,
              duration: 5,
              top: 80
            });
            return;
          }
          // res.data.data = JSON.parse($BC.Utils.unzip(res.data.data));
          res.data.data = JSON.parse(unzipXv(res.data.data));
          if (res.data.code === 0) {
            if (!res.data.data) {
              self.agTableConfig.pagenation.total = 0;
              // self.$refs.agGridChild.AGTABLE.cleanRows(); // 清空表格数据
              self.agTableConfig.rowData = [];
            } else if (flag) {
              // 首次进入的时候数据不加载
              self.agTableConfig.rowData = []
              const queryOrderResultList = res.data.data.queryOrderResultList;
              self.agTableConfig.pagenation.goodsSum = queryOrderResultList.reduce((sum, item) => sum + Number(item.QTY_ALL || 0), 0);
              // self.$refs.agGridChild.agGridTable(self.agTableConfig.columnDefs, self.agTableConfig.rowData);
            } else {
              const queryOrderResultList = res.data.data.queryOrderResultList;
              // const currentPage = this.agTableConfig.pagenation.current;
              // const pageSize = this.agTableConfig.pagenation.pageSize;
              self.agTableConfig.pagenation.total = res.data.data.totalSize;
              queryOrderResultList.forEach((item, i) => {
                // item.index = (currentPage - 1) * pageSize + i + 1;
                if (item.ORDER_STATUS === self.orderStatus.orderCancel || item.ORDER_STATUS === self.orderStatus.orderSystemInvalid) {
                  item.isColorGray = true;
                } else {
                  item.isColorGray = false;
                }
                if (item.PAY_TIME) { // 付款时间
                  item.PAY_TIME = $utils.standardTimeConversiondateToStr(item.PAY_TIME);
                }
                if (item.CREATIONDATE) { // 创建时间
                  item.CREATIONDATE = $utils.standardTimeConversiondateToStr(item.CREATIONDATE);
                }
                if (item.HOLD_RELEASE_TIME) { // Hold单释放时间
                  item.HOLD_RELEASE_TIME = $utils.standardTimeConversiondateToStr(item.HOLD_RELEASE_TIME);
                }
                if (item.PLATFORM_DELIVERY_TIME) { // 平台发货时间
                  item.PLATFORM_DELIVERY_TIME = $utils.standardTimeConversiondateToStr(item.PLATFORM_DELIVERY_TIME);
                }
                if (item.WAREHOUSE_DELIVERY_TIME) { // 仓库发货时间
                  item.WAREHOUSE_DELIVERY_TIME = $utils.standardTimeConversiondateToStr(item.WAREHOUSE_DELIVERY_TIME);
                }
                if (item.SCAN_TIME) { // 出库时间
                  item.SCAN_TIME = $utils.standardTimeConversiondateToStr(item.SCAN_TIME);
                }
                if (item.DISTRIBUTION_TIME) { // 配货时间
                  item.DISTRIBUTION_TIME = $utils.standardTimeConversiondateToStr(item.DISTRIBUTION_TIME);
                }
                if (item.ESTIMATE_CON_TIME) { //预计发货时间
                  item.ESTIMATE_CON_TIME = $utils.standardTimeConversiondateToStr(item.ESTIMATE_CON_TIME);
                }
              });
              // 统计商品总数
              self.agTableConfig.pagenation.goodsSum = queryOrderResultList.reduce((sum, item) => sum + Number(item.QTY_ALL || 0), 0);
              self.agTableConfig.rowData = queryOrderResultList;
              // self.$refs.agGridChild.agGridTable(self.agTableConfig.columnDefs, self.agTableConfig.rowData);
            }
          } else {
            // self.$refs.agGridChild.AGTABLE.cleanRows(); // 清空表格数据
            self.agTableConfig.rowData = [];
            self.$Message.warning({
              content: res.data.message,
              duration: 5,
              top: 80
            });
          }
        })
        .catch(() => {
          self.agTableConfig.agLoading = false;
        });
    },
    checkBatchReturnOrder(selection) {
      const self = this;
      if (selection.length > 80) {
        throw new Error($it('tip.f5')); // 请选择不超过80笔订单的数据！;
      }
      for (let i = 0; i < selection.length; i++) {
        const item = selection[i];
        if (!(item.ORDER_STATUS === self.orderStatus.warehouseDelivery || item.ORDER_STATUS === self.orderStatus.platformDelivery)) {
          throw new Error('只允许仓库发货、平台发货状态订单批量退单');
        }
      }
    },
    onBatchReturnOrderCancel() {
      this.batchReturnFormConfig.formValue.IS_BACK = false;
    },
    doBatchReturnOrder() {
      const self = this;
      self.btnConfig.loading = true;
      const ids = [];
      self.selection.forEach((item, index) => {
        ids[index] = item.ID;
      });
      const param = {
        ids,
        is_back: self.batchReturnFormConfig.formValue.IS_BACK
      };
      const searchdata = {
        table: 'OC_B_ORDER',
        column_include_uicontroller: true,
        fixedcolumns: param
      };
      const fromdata = new FormData();
      fromdata.append('searchdata', JSON.stringify(searchdata));
      fromdata.append('filename', '批量退单');
      fromdata.append('filetype', ' .xlsx');
      fromdata.append('showColumnName', true);
      fromdata.append('menu', '批量退单');
      self.service.orderCenter.doBatchReturnOrder(fromdata).then(res => {
        self.batchReturnFormConfig.formValue.IS_BACK = false;
        if (res.data.code === 0) {
          self.$Message.success(res.data.message);
          R3.store.commit('global/tabOpen', {
            type: 'V',
            tableName: 'CP_C_TASK',
            label: $it('other.myMission'),
            tableId: 24386,
            id: res.data.data,
            query: {
              id: res.data.data,
              pid: '10010',
              ptitle: $it('other.myMission'),
              ptype: 'table',
              tabTitle: $it('other.myMission'),
              tableName: 'CP_C_TASK'
            }
          });
        } else {
          self.$Modal.error({
            title: $it('mT.tips'), // 提示
            content: res.data.message,
            cancelType: true,
            titleAlign: 'left',
            mask: true,
            draggable: true,
            keyDown: event => {
              if (event.keyCode === 27 || event.keyCode === 13) {
                self.$Modal.remove();
              }
            }
          });
        }
        self.btnConfig.loading = false;
      });
    },
    //  获取页面数据
    async getData1() {
      const self = this;
      self.agTableConfig.agLoading = true;
      if (self.$route.query.type == 'workID' && self.$route.query.ID !== undefined) {
        const arr = [{ type: 'Input', queryName: 'ID', value: self.$route.query.ID }];
        if (!self.highSearchData.length) {
          self.highSearchData = self.highSearchData.concat(arr);
        }
      } else {
        if (!self.highSearchData.length) {
          self.highSearchData = JSON.parse(self.$route.query.param);
        }

        if (self.$route.query.label !== undefined) {
          self.labelData = JSON.parse(self.$route.query.label);
        }
      }

      const param = {
        page: {
          pageSize: self.agTableConfig.pagenation.pageSize,
          pageNum: self.agTableConfig.pagenation.current
        },
        label: self.labelData, // 标签
        queryInfo: self.queryInfoData, // 普通搜索
        status: self.statusData,
        highSearch: self.highSearchData
      };
      const fromdata = new FormData();
      fromdata.append('param', JSON.stringify(param));

      self.service.common
        .queryOrderList(fromdata)
        .then(res => {
          self.agTableConfig.agLoading = false;
          if (res.data.code === 0) {
            if (!res.data.data) {
              self.jordanTableConfig.total = 0;
              // self.$refs.agGridChild.AGTABLE.cleanRows(); // 清空表格数据
              self.agTableConfig.rowData = [];
            } else {
              const queryOrderResultList = res.data.data.queryOrderResultList;
              self.agTableConfig.pagenation.total = res.data.data.totalSize;
              self.agTableConfig.rowData = queryOrderResultList;
              self.jordanTableConfig.data.forEach(item => {
                if (item.ORDER_STATUS === self.orderStatus.orderCancel || item.ORDER_STATUS === self.orderStatus.orderSystemInvalid) {
                  item.isColorGray = true;
                } else {
                  item.isColorGray = false;
                }
              });
            }
          } else {
            self.$Message.warning({
              content: res.data.message,
              duration: 5,
              top: 80
            });
          }
        })
        .catch(() => {
          self.agTableConfig.agLoading = false;
        });
      this.selectValue = [];
    },
    // 标准时间转化为yyyy-mm-dd
    standardTimeConversion(val) {
      const d = new Date(val);
      const datetime = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()} `;
      return datetime;
    },
    // 分页change 事件
    pageChange(val) {
      this.agTableConfig.pagenation.current = val;
      this.getData();
    },
    // 切换分页条数
    pageSizeChange(val) {
      this.agTableConfig.pagenation.pageSize = val;
      this.getData();
    },
    // 切换标签 执行搜索
    labelClick(item) {
      this.statusData = item;
      this.agTableConfig.pagenation.current = 1;
      this.getData();
    },

    // 选中某一项时触发
    onSelect(selection) {
      this.selection = selection;
    },
    // 取消选中某一项时触发
    onSelectCancel(selection) {
      this.selection = selection;
    },
    // 点击全选时触发
    onSelectAll(selection) {
      this.selection = selection;
    },

    // 点击取消全选时触发
    onSelectAllCancel(selection) {
      this.selection = selection;
    },
    // 单击某一行时触发
    onRowClick() { },
    // 单击某二行时触发
    onRowDblclick(row) {
      R3.store.commit('global/tabOpen', {
        type: 'C',
        customizedModuleName: 'orderManageDetail',
        customizedModuleId: row.ID,
        label: $it('pL.retailInvoice_details')
      });
    },
    // 返回置换两行索引
    onDragDrop(columns) {
      this.jordanTableConfig.columns = columns;
    },
    /**
     * 扩展Array方法, 去除数组中空白数据
     */
    notempty(val) {
      const arr = val.filter(val => val !== '' && val !== undefined);
      return arr;
    },

    // 导出校验
    exportClick() {
      const _this = this;
      if (_this.selection.length > 0) {
        this.exportChange(_this.selection);
      } else {
        if (_this.selection.length === 0) {
          this.exportChange(_this.agTableConfig.rowData);
          return;
        }
        if (_this.statusData.value == 0) {
          _this.warningModal = true;
        } else {
          _this.warningOk();
        }
      }
    },
    // 导出
    exportChange(list = []) {
      if (this.isExport) {
        // 有一项导出正在进行中

        this.$Message.error($it('tip.f8'));
        return;
      }
      this.isExport = true;
      const fromdata = new FormData();
      if (this.selection.length) {
        const ids = list.map(item => item.ID);
        const idList = { idList: ids };
        fromdata.append('param', JSON.stringify(idList));
      } else {
        const param = {
          page: {
            pageSize: 999999,
            pageNum: 1
          },
          label: this.labelData, // 标签
          queryInfo: this.queryInfoData, // 普通搜索
          status: this.statusData,
          highSearch: this.highSearchData,
          sort: this.sort
        };
        // 零售发货单列表tab 区分审核失败/多次缺货类型订单查询
        if (this.statusData.label == '审核失败') {
          param.status = { label: '待审核', value: '1', isShow: true };
          param.lackstockOrAudit = this.statusData.value;
        } else if (this.statusData.label == '多次缺货') {
          param.lackstockOrAudit = this.statusData.value;
          param.status = { label: '缺货', value: '2', isShow: true };
        }
        fromdata.append('param', JSON.stringify(param));
      }
      this.service.orderCenter.exportOcBOrder(fromdata).then(res => {
        this.isExport = false;
        if (res.data.code == 0 && res.data.data !== null) {
          const mes = res.data.message || $it('tip.z2'); // 导出成功！
          this.$Message.success(mes);
          $utils.downloadUrlFile(res.data.data);
        } else {
          const err = res.data.message || $it('tip.z3'); // 失败！
          this.$Message.error(err);
        }
      });
    },
    // 生成赔付单
    async generateToPaySingle() {
      const actioveSelect = this.selection;
      if (actioveSelect.length === 0) {
        // 请选择需要操作的单据！
        this.$Message.warning($it('tip.d8'));
        return;
      }
      const FormData = {
        ids: actioveSelect.map(val => val.ID) // 选中的列表
      };
      const data = await this.service.orderCenter.payableAdjustmentCreate(FormData);
      if (data.data.code === 0 && data.data.code !== null) {
        const mes = data.data.message;
        // _this.$Message.success(mes);
        this.$Message.success(mes);
      } else {
        this.$Message.warning(data.data.message);
      }
    },
    // 警告框确认
    warningOk() {
      const _this = this;
      // 有一项导出正在进行中
      if (this.isExport) {
        this.$Message.error($it('tip.f8'));
        return;
      }
      this.isExport = true;
      const param = {
        page: {
          pageSize: 999999,
          pageNum: 1
        },
        label: _this.labelData, // 标签
        queryInfo: _this.queryInfoData, // 普通搜索
        status: _this.statusData,
        highSearch: _this.highSearchData
      };
      const fromdata = new FormData();
      fromdata.append('param', JSON.stringify(param));
      _this.service.orderCenter.exportOcBOrder(fromdata).then(res => {
        this.isExport = false;
        if (res.data.code == 0 && res.data.data !== null) {
          const mes = res.data.message || $it('tip.z2'); // 导出成功！
          _this.$Message.success(mes);
          $utils.downloadUrlFile(res.data.data);
        } else {
          const err = res.data.message || $it('tip.z3'); // 失败！
          _this.$Message.error(err);
        }
      });
    },
    // 数组对象根据子元素某各个key合并分组
    sonList(arr, key) {
      const obj = [];
      arr.forEach(item => {
        obj.push(item[key]);
      });
      return obj;
    },
    // 卡单释放
    orderDetentionRelease() {
      let selection = this.selection;
      if (selection.length === 0) {
        this.$Message.warning('请选择需要卡单释放的数据')
      } else {
        let ids = [];
        selection.forEach(item => {
          ids.push(item.ID)
        })
        this.$network.post('/api/cs/oc/oms/v1/orderDetentionRelease', { ids }).then(res => {
          let resData = res.data;
          if (resData.code === 0) {
            this.$Modal.fcSuccess({
              content: resData.message
            })
          } else {
            this.$Modal.fcError({
              content: resData.message
            })
          }
        })
      }


    }
  }
  // destroyed() {

  // }
};

import businessButton from 'professionalComponents/businessButton';
import businessForm from 'professionalComponents/businessForm';
import businessLabel from 'professionalComponents/businessLabel';
import businessActionTable from 'professionalComponents/businessActionTable';
import businessDialog from 'professionalComponents/businessDialog';
import { isFavoriteMixin } from '@/assets/js/mixins/isFavorite';
import publicMethodsUtil from '@/assets/js/public/publicMethods';
import { buttonPermissionsMixin } from '@/assets/js/mixins/buttonPermissions';
import publicDialogConfig from 'professionalComponents/common/js/publicDialog';
import aTable from 'professionalComponents/agGridTable';
import loading from '@/component/loading';
import comUtils from '@/assets/js/__utils__/common';
import unzipXv from '@/assets/js/dataToSmall';

export default {
  components: {
    businessButton,
    businessForm,
    businessActionTable,
    businessLabel,
    businessDialog,
    aTable,
    loading
  },
  // mixins: [isFavoriteMixin],
  mixins: [isFavoriteMixin, buttonPermissionsMixin],
  data() {
    return {
      loadingActive: false,
      resetForm: true,
      vmI18n: window.vmI18n,
      errThData: [
        {
          title: window.vmI18n.t('form_label.chargebackNumber'), // 退单编号
          key: 'id'
        },
        {
          title: window.vmI18n.t('table_label.abnormalInfo'), // 异常信息
          key: 'error'
        }
      ],
      errModal: false,
      errdataList: [],
      // 公共弹框
      publicBouncedConfig: {},
      // 弹框配置
      changeRemarkConfig: {
        refFuns: 'confirmFun',
        confirmTitle: window.vmI18n.t('modalTitle.modify_sellerNotes'), // 修改备注/修改卖家备注
        titleAlign: 'center', // 设置标题是否居中 center left
        width: '440',
        scrollable: false, // 是否可以滚动
        closable: true, // 是否可以按esc关闭
        draggable: true, // 是否可以拖动
        mask: true, // 是否显示遮罩层
        maskClosable: true, // 是否可以点击叉号关闭
        transfer: true, // 是否将弹层放在body内
        name: 'rturngoodModifyRemarks', // 组件名称
        url: 'pages/OrderCenter/returngood/rturngoodModifyRemarks',
        keepAlive: true,
        excludeString: 'rturngoodModifyRemarks', // 将name传进去，确认不缓存
        componentData: {}
      },
      // 修改退回仓库
      modifyWarehouse: {
        refFuns: 'confirmFun',
        confirmTitle: window.vmI18n.t('modalTitle.modify_returnWarehouse'), // 修改退货仓库
        titleAlign: 'center', // 设置标题是否居中 center left
        width: '440',
        scrollable: false, // 是否可以滚动
        closable: true, // 是否可以按esc关闭
        draggable: true, // 是否可以拖动
        mask: true, // 是否显示遮罩层
        maskClosable: true, // 是否可以点击叉号关闭
        transfer: true, // 是否将弹层放在body内
        name: 'modifyWarehouse', // 组件名称
        url: 'modal/orderCenter/returngood/modifyWarehouse',
        keepAlive: true,
        excludeString: 'modifyWarehouse', // 将name传进去，确认不缓存
        componentData: {}
      },
      modifyReturnOrderLogistics: {
        refFuns: 'confirmFun',
        confirmTitle: window.vmI18n.t('modalTitle.modify_logisticsCompany'), // 修改物流公司
        titleAlign: 'center', // 设置标题是否居中 center left
        width: '440',
        scrollable: false, // 是否可以滚动
        closable: true, // 是否可以按esc关闭
        draggable: true, // 是否可以拖动
        mask: true, // 是否显示遮罩层
        maskClosable: false, // 是否可以点击叉号关闭
        transfer: true, // 是否将弹层放在body内
        name: 'modifyReturnOrderLogistics', // 组件名称
        url: 'returngood/modifyReturnOrderLogistics',
        keepAlive: true,
        excludeString: 'modifyReturnOrderLogistics', // 将name传进去，确认不缓存
        componentData: {}
      },
      // 弹框配置 导入
      importTable: {
        refFuns: 'confirmFun',
        confirmTitle: window.vmI18n.t('btn.import'), // 导入
        titleAlign: 'center', // 设置标题是否居中 center left
        width: '600',
        scrollable: false, // 是否可以滚动
        closable: true, // 是否可以按esc关闭
        draggable: true, // 是否可以拖动
        mask: true, // 是否显示遮罩层
        maskClosable: true, // 是否可以点击叉号关闭
        transfer: true, // 是否将弹层放在body内
        name: 'importTable', // 组件名称
        url: 'modal/publicDialog/importTable',
        keepAlive: true,
        excludeString: 'importTable', // 将name传进去，确认不缓存
        componentData: {}
      },
      warningModal: false, // 警告弹框
      virtualWarehouseModal: false, // 手工入库弹框
      btnConfig: {
        typeAll: 'error', // 按钮统一风格样式
        buttons: [
          {
            text: window.vmI18n.t('btn.find'), // 查找
            webname: 'lookup_tuihuanhuo',
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              this.find();
            } // 按钮点击事件
          },
          {
            text: window.vmI18n.t('btn.reset'), // 重置
            webname: 'lookup_chongzhi',
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              this.reset();
            } // 按钮点击事件
          },
          {
            text: window.vmI18n.t('btn.add'), // 新增
            webname: 'new_tuihuanhuo',
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              this.$store.commit('customize/TabHref', {
                id: -1, // id
                type: 'action', // 类型action
                name: 'returngood', // 文件名
                label: this.vmI18n.t('panel_label.addReturnOrder'), // 退换货订单新增 tab中文名
                query: Object.assign({
                  id: -1, // id
                  tabTitle: this.vmI18n.t('panel_label.addReturnOrder') // 退换货订单新增 tab中文名
                }) // 带的参数
              });
            } // 按钮点击事件
          },
          {
            text: window.vmI18n.t('btn.modify'), // 修改
            webname: 'modify_yuihuanhuo',
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              this.modify();
            } // 按钮点击事件
          },
          {
            text: window.vmI18n.t('panel_label.scannAndWarehous'), // 扫描入库
            webname: 'in_tuihuanhuo',
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              this.scanIncoming();
            } // 按钮点击事件
          },
          {
            text: window.vmI18n.t('btn.afterSalesAudit'), // 售后审核
            webname: 'shenhe_tuihuanhuo',
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              this.afterAudit();
            } // 按钮点击事件
          },
          {
            text: window.vmI18n.t('common.cancel'), // 取消
            webname: 'quxiao_tuihuanhuo',
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              this.cancelBtn();
            } // 按钮点击事件
          },
          {
            text: window.vmI18n.t('btn.virtualWarehous'), // 虚拟入库
            webname: 'xuniruku_tuihuanhuo',
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              this.virtualLibrary();
            } // 按钮点击事件
          },
          {
            text: window.vmI18n.t('modalTitle.manualWarehous'), // 手动入库
            webname: 'VirtualWarehouseStorageCmd',
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              this.virtualWarehouseLibraryWarn();
            } // 按钮点击事件
          },
          {
            text: window.vmI18n.t('btn.cancel_automaticRefund'), // 取消自动退款
            webname: 'quxiaozidongtuikuan_tuihuanhuo',
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              this.cancelRefund();
            } // 按钮点击事件
          },
          {
            text: window.vmI18n.t('btn.modifyRemarks'), // 修改备注
            webname: 'beizhu_tuihuanh',
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              this.changeRemarkConfig.confirmTitle = '修改备注';
              this.bounced();
            } // 按钮点击事件
          },
          {
            text: window.vmI18n.t('modalTitle.modify_sellerNotes'), // 修改卖家备注
            webname: 'modifyReturnSellerRemark',
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              this.changeRemarkConfig.confirmTitle = '修改卖家备注';
              this.bounced2();
            } // 按钮点击事件
          },
          {
            text: window.vmI18n.t('btn.modify_returnWarehouse'), // 修改退回仓库
            webname: 'tuihuicangku_tuihuanhuo',
            btnclick: () => {
              this.Warehouse();
            }
          },
          /* {
            text: window.vmI18n.t('modalTitle.modify_logisticsCompany'), // 修改物流公司
            webname: '',
            btnclick: () => {
              this.OrderLogistics();
            }
          }, */
          {
            text: window.vmI18n.t('btn.batchOriginalReturn'), // 批量原退
            webname: 'oc_b_return_order_batch',
            btnclick: () => {
              this.batchOriginalBack();
            }
          },
          // {
          //   text: "从WMS撤回", //按钮文本
          //   disabled: false, //按钮禁用控制
          //   btnclick: () => {
          //     this.withdrawWMS();
          //   } //按钮点击事件
          // },
          {
            text: window.vmI18n.t('btn.retransmission_WMS'), // 重传WMS  //按钮文本
            webname: 'chuanwms_tuihuanhuo',
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              this.againWMS();
            } // 按钮点击事件
          },
          {
            text: window.vmI18n.t('btn.mandatoryCompletion'), // 强制完成  //按钮文本
            webname: 'qiaozhiwancheng_tuihuanhuo',
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              this.forcedCompletion();
            } // 按钮点击事件
          },
          {
            text: window.vmI18n.t('btn.returnCopy'), // 退换货复制
            webname: 'OcChangingOrRefundingDetailCmd',
            disabled: false,
            btnclick: () => {
              this.cloneRenturnGood();
            }
          },
          {
            webname: 'refund_to_exchange', // 退货转换货
            disabled: false,
            btnclick: () => {
              this.refund2ExchangeValidate();
            }
          },
          {
            type: '', // 按钮类型
            // text: window.vmI18n.t('btn.sellerNotesImport'),
            webname: 'oc_b_return_order_import_seller_remark', // 卖家备注导入
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              const _this = this;
              _this.importTable.componentData = {
                tableName: 'OC_B_RETURN_ORDER_remark',
                objid: '1'
              };
              _this.importTable.confirmTitle = _this.vmI18n.t('btn.sellerNotesImport'); // 卖家备注导入
              _this.$children.find(item => item.name === 'importTable').openConfirm();
            } // 按钮点击事件
          },
          {
            type: '', // 按钮类型
            text: window.vmI18n.t('btn.import'), // 导入
            webname: 'daoru_tuihuanhuo',
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              const _this = this;
              _this.importTable.componentData = {
                tableName: 'OC_B_RETURN_ORDER'
              };
              _this.$children.find(item => item.name === 'importTable').openConfirm();
            } // 按钮点击事件
          },
          {
            text: window.vmI18n.t('btn.export'), // 导出
            webname: 'daochu_tuihuanhuo',
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              this.exportClick();
            } // 按钮点击事件
          },
          {
            icon: 'iconfont iconbj_setup', // 按钮图标
            btnclick: () => {
              const self = this;
              self.isShowSeniorOrOrdinary = true;
              self.publicBouncedConfig = {
                ...publicDialogConfig.dropSortConfig
              };
              self.publicBouncedConfig.componentData = {
                typeName: 'OC_B_RETURN_ORDER'
              };
              setTimeout(() => {
                self.$children.find(item => item.name === 'setFormDrag').openConfirm();
              }, 100);
            } // 按钮点击事件
          },
          {
            icon: 'iconfont iconbj_col', // 按钮图标
            size: 'small', // 按钮大小
            name: window.vmI18n.t('btn.collection'), // 收藏
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              const _this = this;
              _this.setFavorite();
            } // 按钮点击事件
          },
          {
            text: '重新生成订单', // 导出
            webname: 'refund_to_order',
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              this.regenerateTheOrder();
            } // 按钮点击事件
          },
        ]
      }, // 按钮数据
      formConfig: {
        flodClickMsg: 'a', // 展开按钮 参数任意字符串
        formValue: {},
        formData: [],
        flodClick: () => {
          setTimeout(() => {}, 10);
        }
      }, // form表单
      labelList: [
        {
          label: window.vmI18n.t('panel_label.all'), // 全部
          value: '1',
          isShow: true
        },
        {
          label: window.vmI18n.t('form_label.waitFor_return_warehous'), // 等待退货入库
          value: '2',
          isShow: true
        },
        {
          label: window.vmI18n.t('form_label.waitFor_afterSale_confirm'), // 等待售后确认
          value: '3',
          isShow: true
        },
        {
          label: window.vmI18n.t('form_label.complete'), // 完成
          value: '4',
          isShow: true
        },
        {
          label: window.vmI18n.t('common.cancel'), // 取消
          value: '5',
          isShow: true
        }
      ], // tab切换
      labelDefaultValue: '1',
      agTableConfig: {
        agLoading: false,
        columnDefs: [],
        rowData: [],
        renderArr: {
          CP_C_SHOP_ID: param => {
            const resDom = document.createElement('div');
            resDom.style.width = '100%';
            resDom.style.display = 'flex';
            resDom.style.alignitems = 'center';
            resDom.style.justifyContent = 'space-between';
            resDom.innerHTML = param.data.CP_C_SHOP_TITLE;
            return resDom;
          },
          TID: param => {
            const self = this;
            const resDom = document.createElement('a');
            resDom.style['text-decoration'] = 'underline';
            resDom.innerHTML = param.data.TID;
            if (param.data.TID.split(',').length == 1) {
              resDom.onclick = () => {
              console.log(self);
              const formdata = new FormData();
              formdata.append('param', JSON.stringify({ sourceCode: param.data.TID }));
              self.service.orderCenter.getOrderId(formdata).then(res => {
                console.log(res);
                if (res.data.code === 0) {
                  R3.store.commit('global/tabOpen', {
                    type: 'C',
                    customizedModuleName: 'orderManageDetail',
                    customizedModuleId: res.data.data,
                    label: window.vmI18n.t('panel_label.retailInvoice_details')
                  });
                } else {
                  self.$Message.warning(res.data.message);
                }
              });
            };
            } else {
              resDom.onclick = ()=>{
                self.$Message.warning('当前平台单号存在多个零售发货单，请进入零售发货单页面查找查看');
              };
            }
            
            return resDom;
          }
        },
        tableHeight: '480px',
        pagenation: comUtils.pageConfig
      },
      jordanTableConfig: {
        columns: [], // 表头
        renderArr: [
          {
            key: 'ALL_SKU',
            // title: "所有商品",
            render: (h, params) => {
              let bottomTable = 'bottom';
              if (params.index >= 8) bottomTable = 'top';
              if (params.row.allSkuItem === null) return;
              params.row.allSkuItem.forEach(item => {
                item.qty_refund = parseInt(item.qty_refund);
              });
              const goodsThead = [
                {
                  key: 'id',
                  title: window.vmI18n.t('table_label.code') // 编号
                },
                {
                  key: 'return',
                  title: window.vmI18n.t('table_label.returnGoods') // 退换货
                },
                {
                  title: window.vmI18n.t('table_label.articleNumber'), // 货号
                  key: 'ps_c_pro_ecode'
                },
                // {
                //   title: "规格",
                //   key: "sku_spec"
                // },
                {
                  title: window.vmI18n.t('other.color'), // 颜色
                  key: 'ps_c_clr_ename'
                },
                {
                  title: window.vmI18n.t('other.sizes'), // 尺寸
                  key: 'ps_c_size_ename'
                },
                {
                  title: window.vmI18n.t('form_label.refundAmount'), // 退款金额
                  key: 'refund_amt'
                },
                {
                  title: window.vmI18n.t('table_label.appleNumber'), // 申请数量
                  key: 'qty_refund'
                },
                {
                  title: window.vmI18n.t('table_label.storageQuantity'), // 入库数量
                  key: 'qty_in'
                }
              ]; // 浮框表头
              return h(
                'div',
                {
                  style: {
                    width: '200px',
                    display: 'flex',
                    alignitems: 'center',
                    justifyContent: 'space-between'
                  }
                },
                [
                  h(
                    'Poptip',
                    {
                      props: {
                        placement: bottomTable,
                        transfer: true,
                        minWidth: '400',
                        trigger: 'hover'
                      }
                    },
                    [
                      h(
                        'div',
                        {
                          style: {
                            width: '200px',
                            position: 'releative',
                            overflow: 'hidden',
                            'white-space': 'nowrap',
                            'text-overflow': 'ellipsis'
                          }
                        },
                        params.row.allSkuItem.length ? params.row.ALL_SKU : '' // hover值
                      ),
                      h('i-table', {
                        slot: 'content',
                        props: {
                          'show-header': true,
                          'disabled-hover': true,
                          'highlight-row': false,
                          'no-data-text': '暂无数据',
                          columns: goodsThead,
                          data: params.row.allSkuItem ? params.row.allSkuItem : [] // 浮框数据
                        }
                      })
                    ]
                  )
                ]
              );
            }
          },
          {
            key: 'ORDERFLAG',
            render: (h, params) => {
              const imgSrc = params.row.BACK_MESSAGE == null || params.row.BACK_MESSAGE == '' ? require('@/assets/image/img/0.png') : require('@/assets/image/img/1.png');
              return h(
                'Poptip',
                {
                  props: {
                    placement: 'right',
                    width: '78',
                    trigger: 'hover'
                  }
                },
                [
                  h('img', {
                    attrs: {
                      src: imgSrc
                    },
                    style: {
                      width: '20px',
                      height: '20px'
                    }
                  }),
                  h(
                    'span',
                    {
                      slot: 'content'
                    },
                    params.row.BACK_MESSAGE ? params.row.BACK_MESSAGE : '暂无卖家备注'
                  )
                ]
              );
            }
          }
        ],
        pageShow: true, // 控制分页是否显示
        loading: false,
        // isShowDeleteDetailBtn: true, //控制是否显示删除明细
        // isShowImportBtn: true, //控制是否显示导入
        // isShowExportBtn: true, //控制是否显示导出
        searchInputShow: false, // 控制搜索框是否显示
        indexColumn: true, // 是否显示序号
        isShowSelection: true, // 是否显示checkedbox
        width: '', // 表格宽度
        height: 440, // 表格高度
        border: true, // 是否显示纵向边框
        current: 1, // 当前页数
        total: 0, // 设置总条数
        pageSizeOpts: [15, 30, 45, 60], // 每页条数切换的配置
        pageSize: 15, // 每页条数
        data: [] // 数据配置
      }, // 列表数据
      isShowFromLoading: false,
      statusTab: '', // 单据类型
      isExport: false,
      isSaveLoading: false
    };
  },
  activated() {
    // 计算高度 通过设置节点 'totalHeight'
    // comUtils.setTableHeight(this, 115);
    // 检测屏幕变化 设置高度 重新渲染agTabe
    // comUtils.onresizes(this, 40);
  },
  created() {
    // 获取默认数据
    this.agTableConfig.pagenation.current = 1;
  },
  mounted() {
    this.$nextTick(() => {
      // 前提:公共逻辑处理必须使用jordanButton组件才可以使用公共逻辑
      // 参数1  关于是否是定制页面:action 半定制页面:halfaCustom （目前不生效）
      // 参数2  buttons父级json
      // 参数3  true逻辑处理 false定制页面自行处理  按钮权限
      // 逻辑处理则直接调用
      this.getPermissions('btnConfig', 'returngoodList');
      // 定制页面自行处理
      // let buttonList = this.getPermissions("action", "btnConfig",true);
    });

    const _this = this;
    window.addEventListener('keydown', e => {
      const key = e.keyCode;
      if (key == 13 && _this.warningModal) {
        _this.warningOk();
      } else if (key == 27) {
        _this.warningModal = false;
      }
    });
    this.getHeaderList();
  },
  methods: {
    // 重新生成订单
    regenerateTheOrder() {
      const self = this;
      const arr = self.$refs.agGridChild.AGTABLE.getSelect();
      if (arr.length !== 1) {
        self.$Message.warning('请选中一条单据进行生成!'); // 请选中一条单据进行生成!
        return;
      }
      this.service.orderCenter.validateRefundChange({ objid: arr[0].ID }).then(res=>{
        console.log(res);
        if (res.data.code == 0) {
          self.$store.commit('customize/TabHref', {
                id: arr.ID, // 单据id
                type: 'action', // 类型action
                name: 'RETURNGOOD', // 文件名
                label: '退换货订单详情', // tab中文名
                query: Object.assign({
                  id: arr.ID, // 单据id
                  tabTitle: '退换货订单详情', // tab中文名
                  statusName: arr[0].RETURN_STATUS_NAME, // 行的退单状态
                  flag: 'validateRefundChange'
                }) // 带的参数
              });
        } else {
          self.$Message.error(res.data.message);
        }
      });
      // if (true) {
      //   self.$store.commit('customize/TabHref', {
      //     id: 250406, // 单据id
      //     type: 'action', // 类型action
      //     name: 'RETURNGOOD', // 文件名
      //     label: '退换货订单详情', // tab中文名
      //     query: Object.assign({
      //       id: 250406, // 单据id
      //       tabTitle: '退换货订单详情', // tab中文名
      //       statusName: arr[0].RETURN_STATUS_NAME, // 行的退单状态
      //       flag: 'validateRefundChange'
      //     }) // 带的参数
      //   });
      // } else {
      //   // const err = res.data.message || '转换失败'; // 售后审核失败！
      //   self.$Message.error('err');
      // }
    },
    // 获取高级查询&表头
    getHeaderList() {
      const _this = this;
      const params = {
        table: 'OC_B_RETURN_ORDER',
        column_include_uicontroller: true,
        fixedcolumns: {},
        multiple: [],
        startindex: 0
      };
      this.service.orderCenter.DynamicList(params).then(res => {
        // 高级查询
        const formData = [];
        res.data.data.search.date.forEach((item, index) => {
          if (item.type === 'date') {
            formData[index] = {
              style: item.tabth.isfilter ? 'date' : '', // 输入框类型
              type: 'datetimerange', // 文本框类型的input
              label: item.tabth.name, // 输入框前文字
              value: item.tabth.colname, // 输入框的值
              // format: "yyyy-MM-dd",
              width: '6', // 所占的宽度 (宽度分为24份,数值代表所占份数的宽度)
              icon: 'md-alarm', // 输入框后带的图标,暂只有输入框支持
              placeholder: '', // 占位文本，默认为请输入
              transfer: true,
              ghost: false, // 是否关闭幽灵按钮，默认开启
              inputenter: () => {
                _this.getList();
              }, // 表单回车事件
              iconclick: () => {}, // 点击icon图标事件
              clearable: true
            };
            _this.formConfig.formValue[item.tabth.colname] = '';
          }
          if (item.type === 'propInput') {
            formData[index] = {
              style: item.tabth.isfilter ? 'popInput' : '', // 输入框弹框单多选
              width: '6',
              itemdata: {
                col: 1,
                colid: item.tabth.colid,
                colname: item.tabth.colname, // 当前字段的名称
                datelimit: 'all',
                display: 'text', // 显示什么类型，例如xml表示弹窗多选加导入功能，mrp表示下拉多选
                fkdisplay: item.tabth.fkdisplay, // 外键关联类型
                fkdesc: item.tabth.fkdesc,
                inputname: item.tabth.inputname, // 这个是做中文类型的模糊查询字段，例如ENAME
                isfk: true, // 是否有fk键
                isnotnull: false, // 是否必填
                isuppercase: false, // 是否转大写
                length: 65535, // 最大长度是多少
                name: item.tabth.name, // input前面显示的lable值
                readonly: false, // 是否可编辑，对应input   readonly属性
                reftable: item.tabth.reftable,
                reftableid: item.tabth.reftableid,
                row: 1,
                scale: 0,
                statsize: -1,
                type: item.tabth.type, // 这个是后台用的
                pid: '',
                valuedata: '' // 这个是选择的值
              },
              oneObj: e => {
                _this.oneObjs(e);
              }
            };
            if (item.tabth.precolnameslist) {
              formData[index].itemdata.precolnameslist = item.tabth.precolnameslist ? item.tabth.precolnameslist : [];
            }
          }
          if (item.type === 'text') {
            formData[index] = {
              style: item.tabth.isfilter ? 'input' : '', // 输入框类型
              // type: "", //文本框类型的input
              label: item.tabth.name, // 输入框前文字
              value: item.tabth.colname, // 输入框的值
              width: '6', // 所占的宽度 (宽度分为24份,数值代表所占份数的宽度)
              icon: '', // 输入框后带的图标,暂只有输入框支持
              clearable: true,
              placeholder: '', // 占位文本，默认为请输入
              ghost: false, // 是否关闭幽灵按钮，默认开启
              inputenter: () => {
                _this.getList();
              }, // 表单回车事件
              iconclick: () => {} // 点击icon图标事件
            };
            _this.formConfig.formValue[item.tabth.colname] = '';
          }
          if (item.type === 'number') {
            formData[index] = {
              style: item.tabth.isfilter ? 'input' : '', // 输入框类型
              // type: "", //文本框类型的input
              label: item.tabth.name, // 输入框前文字
              value: item.tabth.colname, // 输入框的值
              clearable: true,
              width: '6', // 所占的宽度 (宽度分为24份,数值代表所占份数的宽度)
              icon: '', // 输入框后带的图标,暂只有输入框支持
              placeholder: '', // 占位文本，默认为请输入
              ghost: false, // 是否关闭幽灵按钮，默认开启
              inputenter: () => {
                _this.getList();
              }, // 表单回车事件
              iconclick: () => {} // 点击icon图标事件
            };
            _this.formConfig.formValue[item.tabth.colname] = '';
          }
          if (item.type === 'select') {
            formData[index] = {
              style: item.tabth.isfilter ? 'select' : '', // 下拉框类型
              label: item.tabth.name, // 下拉框前的值
              width: '6', // 所占宽度宽度
              clearable: true, // 是否显示下来清空按钮
              value: item.tabth.colname, // 输入框的值
              multiple: true, // 布尔值,下拉框是否开启多选,默认为不开启
              selectChange: () => {}, // 选中事件，默认返回选中的值
              clearSelect: e => {
                if (e == 'RETURN_STATUS') {
                  _this.formConfig.formValue.RETURN_STATUS = '';
                } else if (e == 'IS_ADD') {
                  _this.formConfig.formValue.IS_ADD = '';
                } else if (e == 'IS_TOAG') {
                  _this.formConfig.formValue.IS_TOAG = '';
                } else if (e == 'IS_TOWMS') {
                  _this.formConfig.formValue.IS_TOWMS = '';
                } else if (e == 'BILL_TYPE') {
                  _this.formConfig.formValue.BILL_TYPE = '';
                } else if (e == 'IS_EXAMINE') {
                  _this.formConfig.formValue.IS_EXAMINE = '';
                } else if (e == 'IS_TODRP') {
                  _this.formConfig.formValue.IS_TODRP = '';
                } else if (e == 'IS_TRANSFER') {
                  _this.formConfig.formValue.IS_TRANSFER = '';
                }
              }, // 点击清空按钮回调
              options: _this.converSelect(item.tabth.combobox)
            };
            _this.formConfig.formValue[item.tabth.colname] = [];
          }
        });
        _this.formConfig.formData = formData;
        // 表头赋值
        res.data.data.columns.forEach(item => {
          item.field = item.key;
          item.headerName = item.title;
          delete item.key;
          delete item.title;
        });
        _this.agTableConfig.columnDefs = res.data.data.columns;
        if (_this.$route.query.type == 'workID') {
          this.getListWork();
        } else {
          this.getList();
        }
      });
    },
    // 查找
    find() {
      this.agTableConfig.pagenation.current = 1;
      this.getList(this.statusTab);
    },
    // 重置
    reset() {
      this.resetForm = false;
      this.$nextTick(() => {
        this.resetForm = true;
        this.getHeaderList();
      });
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
    // 获取列表数据
    getList(status) {
      const _this = this;
      if (_this.agTableConfig.agLoading) {
        return;
      }
      _this.agTableConfig.rowData = [];
      _this.agTableConfig.pagenation.total = 0;
      _this.agTableConfig.agLoading = true;
      // 当出现loading，禁止页面滚动
      document.getElementById('content').style.overflow = 'hidden';
      document.getElementById('content').style.position = '';
      _this.loadingActive = true;
      const param = {
        start: _this.agTableConfig.pagenation.current,
        count: _this.agTableConfig.pagenation.pageSize,
        RETURN_STATUS: status == undefined || !status ? [] : [status],
        IS_GZIP: true
      };
      _this.formConfig.formValue.RECEIVE_PROVINCE = '';
      _this.formConfig.formValue.RECEIVE_PROVINCE_ID = '';
      if (_this.formConfig.formData.length) {
        _this.formConfig.formData.forEach(item => {
          if (item.itemdata !== undefined && item.itemdata.name == '原始订单编号') {
            _this.formConfig.formValue.ORIG_ORDER_ID = item.itemdata.valuedata;
          }
        });
      }
      if (status) {
        _this.formConfig.formValue.RETURN_STATUS = [status];
      }
      const Obj = _this.formConfig.formValue;
      if (Obj.INVENTED_STATUS && Obj.INVENTED_STATUS[0] === 'bSelect-all') {
        Obj.INVENTED_STATUS = '';
      } else if (Obj.BILL_TYPE && Obj.BILL_TYPE[0] === 'bSelect-all') {
        Obj.BILL_TYPE = '';
      } else if (Obj.RETURN_STATUS && Obj.RETURN_STATUS[0] === 'bSelect-all') {
        Obj.RETURN_STATUS = '';
      } else if (Obj.IS_TOWMS && Obj.IS_TOWMS[0] === 'bSelect-all') {
        Obj.IS_TOWMS = '';
      } else if (Obj.WMS_CANCEL_STATUS && Obj.WMS_CANCEL_STATUS[0] === 'bSelect-all') {
        Obj.WMS_CANCEL_STATUS = '';
      } else if (Obj.IS_ADD && Obj.IS_ADD[0] === 'bSelect-all') Obj.IS_ADD = '';
      else if (Obj.IS_TOAG && Obj.IS_TOAG[0] === 'bSelect-all') {
        Obj.IS_TOAG = '';
      } else if (Obj.IS_BACK && Obj.IS_BACK[0] === 'bSelect-all') {
        Obj.IS_BACK = '';
      } else if (Obj.STATUS_DEFECTIVE_TRANS && Obj.STATUS_DEFECTIVE_TRANS[0] === 'bSelect-all') {
        Obj.STATUS_DEFECTIVE_TRANS = '';
      } else if (Obj.IS_RESERVED && Obj.IS_RESERVED[0] === 'bSelect-all') {
        Obj.IS_RESERVED = '';
      }
      // const arr = document.getElementsByClassName('ark-input');

      // 防止多次连续多次点击回车，去除焦点
      // for (let i = 0; i < arr.length; i++) {
      //   arr[i].blur();
      // }
      this.service.orderCenter.querySalesReturn(Object.assign(param, _this.formConfig.formValue)).then(res => {
        // 当loading结束，页面滚动
        _this.agTableConfig.agLoading = false;
        _this.loadingActive = false;
        document.getElementById('content').style.overflow = 'auto';
        document.getElementById('content').style.position = 'relative';
        res.data.data = JSON.parse(unzipXv(res.data.data));
        console.log(res.data.data);
        if (res.data.code == 0 && res.data.data.queryResult.length) {
          _this.agTableConfig.rowData = res.data.data.queryResult;
          _this.agTableConfig.pagenation.total = res.data.data.totalNum;
          for (let i = 0; i < _this.agTableConfig.rowData.length; i++) {
            const item = _this.agTableConfig.rowData[i];
            if (item.MODIFIEDDATE) {
              item.MODIFIEDDATE = publicMethodsUtil.DatesTime(item.MODIFIEDDATE);
            } // 修改时间
            if (item.IN_TIME) {
              item.IN_TIME = publicMethodsUtil.DatesTime(item.IN_TIME);
            } // 入库时间
            if (item.AUDIT_TIME) {
              item.AUDIT_TIME = publicMethodsUtil.DatesTime(item.AUDIT_TIME);
            } // 审核时间
            if (item.LAST_UPDATE_TIME) {
              item.LAST_UPDATE_TIME = publicMethodsUtil.DatesTime(item.LAST_UPDATE_TIME);
            } // 退款平台最后修改时间
            if (item.RETURN_CREATE_TIME) {
              item.RETURN_CREATE_TIME = publicMethodsUtil.DatesTime(item.RETURN_CREATE_TIME);
            } // 退款创建时间
            if (item.CREATIONDATE) {
              item.CREATIONDATE = publicMethodsUtil.DatesTime(item.CREATIONDATE);
            } // 创建时间
            // item.RETURN_STATUS = item.RETURN_STATUS_NAME; // 退单状态
            item.IS_ADD = item.IS_ADD == 0 ? '否' : '是'; // 是否手工新增
            if (item.INVENTED_STATUS == 0) {
              item.INVENTED_STATUS = '未虚拟入库';
            } else if (item.INVENTED_STATUS == 1) {
              item.INVENTED_STATUS = '虚拟入库未入库';
            } else if (item.INVENTED_STATUS == 2) {
              item.INVENTED_STATUS = '虚拟入库已入库';
            }
            item.PLATFORM = item.PLAT_NAME; // 平台类型
            item.CP_C_LOGISTICS_ID = item.CP_C_LOGISTICS_ECODE; // 退回物流公司
            item.IS_RECEIVE_CONFIRM = item.IS_RECEIVE_CONFIRM == 0 ? '否' : '是'; // 是否确认收货
            // item.WMS_CANCEL_STATUS = item.WMS_CANCEL_STATUS == 0 ? '未撤回' : '已撤回'; // WMS撤回状态
            if (item.WMS_CANCEL_STATUS == 0) {
              item.WMS_CANCEL_STATUS = '未撤回';
            } else if (item.WMS_CANCEL_STATUS == 1) {
              item.WMS_CANCEL_STATUS = '已撤回';
            } else if (item.WMS_CANCEL_STATUS == 2) {
              item.WMS_CANCEL_STATUS = '撤回失败';
            }
            item.IS_BACK = item.IS_BACK == 0 ? '否' : '是'; // 是否原退
            item.IS_MANUAL_AUDIT = item.IS_MANUAL_AUDIT == 0 ? '否' : '是'; // 是否手工审核
            // item.IS_TOAG = item.IS_TOAG == 0 ? '否' : '是'; // 是否传AG
            if (item.IS_TOAG == 0) {
              item.IS_TOAG = '未传';
            } else if (item.IS_TOAG == 1) {
              item.IS_TOAG = '已传';
            } else if (item.IS_TOAG == 2) {
              item.IS_TOAG = '失败';
            } else if (item.IS_TOAG == 3) {
              item.IS_TOAG = '不传';
            }
            // 0未传WMS，1传WMS中，2传WMS成功，3传WMS失败;
            if (item.IS_TOWMS == 0) {
              item.IS_TOWMS = '未传WMS';
            } else if (item.IS_TOWMS == 1) {
              item.IS_TOWMS = '传WMS中';
            } else if (item.IS_TOWMS == 2) {
              item.IS_TOWMS = '传WMS成功';
            } else if (item.IS_TOWMS == 3) {
              item.IS_TOWMS = '传WMS失败';
            }
            // item.IS_TOWMS = item.IS_TOWMS == 0 ? '否' : '是'; // 是否传wms

            // 0无次品调拨，1次品未调拨，2次品已调拨
            if (item.STATUS_DEFECTIVE_TRANS === 0) {
              item.STATUS_DEFECTIVE_TRANS = '无次品调拨';
            } else if (item.STATUS_DEFECTIVE_TRANS === 1) {
              item.STATUS_DEFECTIVE_TRANS = '次品未调拨';
            } else if (item.STATUS_DEFECTIVE_TRANS === 2) {
              item.STATUS_DEFECTIVE_TRANS = '次品已调拨';
            }
            item.RETURN_REASON = item.RETURN_REASON; // 退货原因
            item.BILL_TYPE = item.BILL_TYPE == 1 ? '退货单' : '退换货单';
            item.OWNERID = item.OWNERNAME;
            item.IS_CHECK = item.IS_CHECK == 0 ? '否' : '是'; // 是否已匹配
            item.IS_NOTLOGMBER = item.IS_NOTLOGMBER == 0 ? '否' : '是'; // 是否缺少运单号
            item.IS_EXAMINE = item.IS_EXAMINE == 0 ? '否' : '是'; // 是否提交审核
            item.ISACTIVE = item.ISACTIVE == 0 ? '否' : '是'; // 是否激活
            // item.IS_TODRP = item.IS_TODRP == 0 ? '否' : '是'; // 是否生成零售
            if (item.IS_TODRP == 0) {
              item.IS_TODRP = '未生成';
            } else if (item.IS_TODRP == 1) {
              item.IS_TODRP = '已生成';
            } else if (item.IS_TODRP == 2) {
              item.IS_TODRP = '生成失败';
            }
            item.IS_REFUND = item.IS_REFUND == 0 ? '否' : '是'; // 是否
            item.IS_RESERVED = item.IS_RESERVED == 0 ? '否' : '是'; // 是否
            item.IS_INSTORAGE = item.IS_INSTORAGE == 0 ? '否' : '是'; // 是否
            // item.IS_TOWMS = item.IS_TOWMS == 0 ? '否' : '是'; // 是否
            item.IS_TRANSFER = item.IS_TRANSFER == 0 ? '否' : '是'; // 是否
            item.IS_FORCE = item.IS_FORCE == 0 ? '否' : '是'; // 是否
          }
          _this.$refs.agGridChild.agGridTable(_this.agTableConfig.columnDefs, _this.agTableConfig.rowData);
        } else {
          _this.agTableConfig.rowData = [];
          _this.agTableConfig.pagenation.total = 0;
          _this.agTableConfig.agLoading = false;
          _this.$refs.agGridChild.agGridTable(_this.agTableConfig.columnDefs, _this.agTableConfig.rowData);
        }
      });
      console.log(_this.agTableConfig.rowData);
    },
    // 客服工作台跳转获取列表数据
    getListWork(status = '') {
      const _this = this;
      if (_this.agTableConfig.agLoading) {
        return;
      }
      _this.agTableConfig.rowData = [];
      _this.agTableConfig.pagenation.total = 0;
      _this.agTableConfig.agLoading = true;
      const param = {
        start: _this.agTableConfig.pagenation.current,
        count: _this.agTableConfig.pagenation.pageSize,
        RETURN_STATUS: status == undefined || !status ? [] : [status],
        IS_GZIP: true
      };
      _this.formConfig.formValue.RECEIVE_PROVINCE = '';
      _this.formConfig.formValue.RECEIVE_PROVINCE_ID = '';
      if (_this.formConfig.formData.length) {
        _this.formConfig.formData.forEach(item => {
          if (item.itemdata !== undefined && item.itemdata.name == '原始订单编号') {
            _this.formConfig.formValue.ORIG_ORDER_ID = item.itemdata.valuedata;
          }
        });
      }
      if (status) {
        _this.formConfig.formValue.RETURN_STATUS = [status];
      }
      const returnParam = JSON.parse(_this.$route.query.returnParam);
      if (_this.$route.query.type == 'workID') {
        if (returnParam.time == 'IN_TIME') {
          _this.formConfig.formValue.IN_TIME = [new Date(returnParam.startTime), new Date(returnParam.endTime)];
        } else if (returnParam.time == 'AUDIT_TIME') {
          _this.formConfig.formValue.AUDIT_TIME = [new Date(returnParam.startTime), new Date(returnParam.endTime)];
        } else if (returnParam.time == 'CREATIONDATE') {
          _this.formConfig.formValue.CREATIONDATE = [new Date(returnParam.startTime), new Date(returnParam.endTime)];
          _this.formConfig.formValue.ISACTIVE = returnParam.IS_ACTIVE;
        }
        if (returnParam.ID) _this.formConfig.formValue.ID = returnParam.ID;
        if (returnParam.returnStatus) {
          _this.formConfig.formValue.RETURN_STATUS = returnParam.returnStatus;
        }
        if (returnParam.shopId) {
          _this.formConfig.formValue.CP_C_SHOP_ID = returnParam.shopId;
        }
        if (returnParam.IS_BACK) {
          _this.formConfig.formValue.IS_BACK = returnParam.IS_BACK;
        } // 是否原退
        if (returnParam.CP_C_PHY_WAREHOUSE_ID) {
          _this.formConfig.formValue.CP_C_PHY_WAREHOUSE_ID = returnParam.CP_C_PHY_WAREHOUSE_ID;
        } // 入库实体仓库
      }
      this.service.orderCenter.querySalesReturn(Object.assign(param, _this.formConfig.formValue)).then(res => {
        res.data.data = JSON.parse(unzipXv(res.data.data));
        if (res.data.code == 0 && res.data.data.queryResult.length) {
          _this.agTableConfig.agLoading = false;
          _this.agTableConfig.rowData = res.data.data.queryResult;
          _this.agTableConfig.pagenation.total = res.data.data.totalNum;
          for (let i = 0; i < _this.agTableConfig.rowData.length; i++) {
            const item = _this.agTableConfig.rowData[i];
            if (item.MODIFIEDDATE) {
              item.MODIFIEDDATE = publicMethodsUtil.DatesTime(item.MODIFIEDDATE);
            } // 修改时间
            if (item.IN_TIME) {
              item.IN_TIME = publicMethodsUtil.DatesTime(item.IN_TIME);
            } // 入库时间
            if (item.AUDIT_TIME) {
              item.AUDIT_TIME = publicMethodsUtil.DatesTime(item.AUDIT_TIME);
            } // 审核时间
            if (item.LAST_UPDATE_TIME) {
              item.LAST_UPDATE_TIME = publicMethodsUtil.DatesTime(item.LAST_UPDATE_TIME);
            } // 退款平台最后修改时间
            if (item.RETURN_CREATE_TIME) {
              item.RETURN_CREATE_TIME = publicMethodsUtil.DatesTime(item.RETURN_CREATE_TIME);
            } // 退款创建时间
            if (item.CREATIONDATE) {
              item.CREATIONDATE = publicMethodsUtil.DatesTime(item.CREATIONDATE);
            } // 创建时间
            item.RETURN_STATUS = item.RETURN_STATUS_NAME; // 退单状态
            item.IS_ADD = item.IS_ADD == 0 ? '否' : '是'; // 是否手工新增
            if (item.INVENTED_STATUS == 0) {
              item.INVENTED_STATUS = '未虚拟入库';
            } else if (item.INVENTED_STATUS == 1) {
              item.INVENTED_STATUS = '虚拟入库未入库';
            } else if (item.INVENTED_STATUS == 2) {
              item.INVENTED_STATUS = '虚拟入库已入库';
            }
            item.PLATFORM = item.PLAT_NAME; // 平台类型
            item.CP_C_LOGISTICS_ID = item.CP_C_LOGISTICS_ECODE; // 退回物流公司
            item.IS_RECEIVE_CONFIRM = item.IS_RECEIVE_CONFIRM == 0 ? '否' : '是'; // 是否确认收货
            // item.WMS_CANCEL_STATUS = item.WMS_CANCEL_STATUS == 0 ? '未撤回' : '已撤回'; // WMS撤回状态
            if (item.WMS_CANCEL_STATUS == 0) {
              item.WMS_CANCEL_STATUS = '未撤回';
            } else if (item.WMS_CANCEL_STATUS == 1) {
              item.WMS_CANCEL_STATUS = '已撤回';
            } else if (item.WMS_CANCEL_STATUS == 2) {
              item.WMS_CANCEL_STATUS = '撤回失败';
            }
            item.IS_BACK = item.IS_BACK == 0 ? '否' : '是'; // 是否原退
            item.IS_MANUAL_AUDIT = item.IS_MANUAL_AUDIT == 0 ? '否' : '是'; // 是否手工审核
            // item.IS_TOAG = item.IS_TOAG == 0 ? '否' : '是'; // 是否传AG
            if (item.IS_TOAG == 0) {
              item.IS_TOAG = '未传';
            } else if (item.IS_TOAG == 1) {
              item.IS_TOAG = '已传';
            } else if (item.IS_TOAG == 2) {
              item.IS_TOAG = '失败';
            } else if (item.IS_TOAG == 3) {
              item.IS_TOAG = '不传';
            }
            // 0未传WMS，1传WMS中，2传WMS成功，3传WMS失败;
            if (item.IS_TOWMS == 0) {
              item.IS_TOWMS = '未传WMS';
            } else if (item.IS_TOWMS == 1) {
              item.IS_TOWMS = '传WMS中';
            } else if (item.IS_TOWMS == 2) {
              item.IS_TOWMS = '传WMS成功';
            } else if (item.IS_TOWMS == 3) {
              item.IS_TOWMS = '传WMS失败';
            }
            // 0无次品调拨，1次品未调拨，2次品已调拨
            if (item.STATUS_DEFECTIVE_TRANS === 0) {
              item.STATUS_DEFECTIVE_TRANS = '无次品调拨';
            } else if (item.STATUS_DEFECTIVE_TRANS === 1) {
              item.STATUS_DEFECTIVE_TRANS = '次品未调拨';
            } else if (item.STATUS_DEFECTIVE_TRANS === 2) {
              item.STATUS_DEFECTIVE_TRANS = '次品已调拨';
            }
            // item.IS_TOWMS = item.IS_TOWMS == 0 ? '否' : '是'; // 是否传wms
            item.RETURN_REASON = item.RETURN_REASON; // 退货原因
            item.BILL_TYPE = item.BILL_TYPE == 1 ? '退货单' : '退换货单';
            item.OWNERID = item.OWNERNAME;
            item.IS_CHECK = item.IS_CHECK == 0 ? '否' : '是'; // 是否已匹配
            item.IS_NOTLOGMBER = item.IS_NOTLOGMBER == 0 ? '否' : '是'; // 是否缺少运单号
            item.IS_EXAMINE = item.IS_EXAMINE == 0 ? '否' : '是'; // 是否提交审核
            item.ISACTIVE = item.ISACTIVE == 0 ? '否' : '是'; // 是否激活
            // item.IS_TODRP = item.IS_TODRP == 0 ? '否' : '是'; // 是否生成零售
            if (item.IS_TODRP == 0) {
              item.IS_TODRP = '未生成';
            } else if (item.IS_TODRP == 1) {
              item.IS_TODRP = '已生成';
            } else if (item.IS_TODRP == 2) {
              item.IS_TODRP = '生成失败';
            }
            item.IS_REFUND = item.IS_REFUND == 0 ? '否' : '是'; // 是否
            item.IS_RESERVED = item.IS_RESERVED == 0 ? '否' : '是'; // 是否
            item.IS_INSTORAGE = item.IS_INSTORAGE == 0 ? '否' : '是'; // 是否
            // item.IS_TOWMS = item.IS_TOWMS == 0 ? '否' : '是'; // 是否
            item.IS_TRANSFER = item.IS_TRANSFER == 0 ? '否' : '是'; // 是否
            item.IS_FORCE = item.IS_FORCE == 0 ? '否' : '是'; // 是否
          }
          _this.$refs.agGridChild.agGridTable(_this.agTableConfig.columnDefs, _this.agTableConfig.rowData);
        } else {
          _this.agTableConfig.rowData = [];
          _this.agTableConfig.pagenation.total = 0;
          _this.agTableConfig.agLoading = false;
        }
      });
    },
    // 切换table
    labelClick(item, index) {
      if (index == 0) {
        this.formConfig.formValue.RETURN_STATUS = '';
        this.statusTab = '';
        this.agTableConfig.pagenation.current = 1;
        this.getList();
      } else if (index == 1) {
        this.agTableConfig.pagenation.current = 1;
        this.statusTab = '20';
        this.getList('20');
      } else if (index == 2) {
        this.agTableConfig.pagenation.current = 1;
        this.statusTab = '30';
        this.getList('30');
      } else if (index == 3) {
        this.agTableConfig.pagenation.current = 1;
        this.statusTab = '50';
        this.getList('50');
      } else if (index == 4) {
        this.agTableConfig.pagenation.current = 1;
        this.statusTab = '60';
        this.getList('60');
      }
    },
    oneObjs() {
      const _this = this;
      _this.formConfig.formData.forEach(item => {
        if (item.itemdata) {
          if (item.itemdata.name == '平台') {
            _this.formConfig.formValue.PLATFORM = item.itemdata.pid;
          } else if (item.itemdata.name == '入库逻辑仓库') {
            _this.formConfig.formValue.CP_C_STORE_ID = item.itemdata.pid;
          } else if (item.itemdata.name == '快递公司') {
            _this.formConfig.formValue.CP_C_LOGISTICS_ID = item.itemdata.pid;
          } else if (item.itemdata.name == '入库实体仓库') {
            _this.formConfig.formValue.CP_C_PHY_WAREHOUSE_IN_ID = item.itemdata.pid;
          } else if (item.itemdata.name == '发货实体仓库') {
            _this.formConfig.formValue.CP_C_PHY_WAREHOUSE_ID = item.itemdata.pid;
          } else if (item.itemdata.name == '店铺名称') {
            _this.formConfig.formValue.CP_C_SHOP_ID = item.itemdata.pid;
          } else if (item.itemdata.name == '创建人') {
            _this.formConfig.formValue.OWNERID = item.itemdata.pid;
          }
        }
      });
    },
    // 双击时触发
    onRowDblclick(row) {
      this.$store.commit('customize/TabHref', {
        id: row.ID, // 单据id
        type: 'action', // 类型action
        name: 'RETURNGOOD', // 文件名
        label: '退换货订单详情', // tab中文名
        query: Object.assign({
          id: row.ID, // 单据id
          tabTitle: '退换货订单详情', // tab中文名
          statusName: row.RETURN_STATUS_NAME // 行的退单状态
        }) // 带的参数
      });
    },
    // 分页change 事件
    pageChange(val) {
      this.agTableConfig.pagenation.current = val;
      if (this.$route.query.type == 'workID') {
        this.getListWork();
      } else {
        this.getList(this.statusTab);
      }
    },
    // 切换分页条数
    pageSizeChange(val) {
      this.agTableConfig.pagenation.pageSize = val;
      if (this.$route.query.type == 'workID') {
        this.getListWork();
      } else {
        this.getList(this.statusTab);
      }
    },
    // 修改
    modify() {
      if (this.$refs.agGridChild.AGTABLE.getSelect().length != 1) {
        this.$Message.error(this.vmI18n.t('modalTips.k3')); // 请选中一项修改!
        return;
      }
      this.$store.commit('customize/TabHref', {
        id: this.$refs.agGridChild.AGTABLE.getSelect()[0].ID, // 单据id
        type: 'action', // 类型action
        name: 'returngood', // 文件名
        label: this.vmI18n.t('panel_label.ReturnOrderDetails'), // 退换货订单详情 tab中文名
        query: Object.assign({
          id: this.$refs.agGridChild.AGTABLE.getSelect()[0].ID, // 单据id
          tabTitle: this.vmI18n.t('panel_label.ReturnOrderDetails'), // 退换货订单详情 tab中文名
          statusName: this.$refs.agGridChild.AGTABLE.getSelect()[0].RETURN_STATUS_NAME // 选中行的退单状态
        }) // 带的参数
      });
    },
    // 扫描入库按钮
    scanIncoming() {
      const tempArr = this.$refs.agGridChild.AGTABLE.getSelect();
      const recordID = tempArr[0].ID;
      if (tempArr.length > 0) {
        this.service.orderCenter.getScanIncomingInfo({ ID: recordID }).then(res => {
          if (res.data.code === 0) {
            this.$store.commit('customize/TabOpen', {
              id: -1, // 单据id
              type: 'action', // 类型action
              name: 'scanIn', // 文件名
              label: this.vmI18n.t('panel_label.scannAndWarehous'), // 扫描入库 tab中文名
              query: Object.assign({
                id: -1,
                returnId: recordID, // 单据id
                isOrderHrefReturn: 'order',
                tabTitle: this.vmI18n.t('panel_label.scannAndWarehous') // 扫描入库 tab中文名
              }) // 带的参数
            });
          } else {
            this.$Message.warning(this.vmI18n.t('modalTips.k4')); // 此退换单状态不允许扫描入库,请重新选择!
          }
        });
      } else {
        this.$Message.error(this.vmI18n.t('modalTips.k3')); // 请选中一项修改!
      }
    },
    // 售后审核接口
    afterAudit() {
      const _this = this;
      if (this.$refs.agGridChild.AGTABLE.getSelect().length == 0) {
        _this.$Message.error(this.vmI18n.t('modalTips.k3')); // 请选中一项修改!
        return;
      }
      if (this.$refs.agGridChild.AGTABLE.getSelect()[0].RETURN_STATUS != 30 && this.$refs.agGridChild.AGTABLE.getSelect().length == 1) {
        // _this.$Message.warning(this.vmI18n.t('modalTips.k5')); // 当前选中行，无法使用此按钮!
        _this.$Message.warning(this.vmI18n.t('modalTips.dt')); // 只有待售后审核状态的退单可以售后审核，请重新选择数据！
        return;
      }
      const ids = [];
      for (let i = 0; i < this.$refs.agGridChild.AGTABLE.getSelect().length; i++) {
        if (this.$refs.agGridChild.AGTABLE.getSelect()[i].RETURN_STATUS == 30) {
          ids.push(this.$refs.agGridChild.AGTABLE.getSelect()[i].ID);
        }
      }
      if (ids.length == 0) {
        // _this.$Message.warning(this.vmI18n.t('modalTips.k6')); // 单据状态不符合审核条件，请重新选择
        _this.$Message.warning(this.vmI18n.t('modalTips.dt')); // 只有待售后审核状态的退单可以售后审核，请重新选择数据！
        return;
      }
      this.$Modal.info({
        title: this.vmI18n.t('modalTitle.tips'), // 提示
        content: this.vmI18n.t('modalTips.k7'), // 是否确定售后审核？
        mask: true,
        showCancel: true,
        okText: this.vmI18n.t('common.determine'), // 确定
        cancelText: this.vmI18n.t('common.cancel'), // 取消
        onOk: () => {
          _this.service.common.chargebackcheck({ ID: ids.join(',') }).then(res => {
            if (res.data.code == 0) {
              const mes = res.data.message || _this.vmI18n.t('modalTips.k8'); // 售后审核成功！
              _this.$Message.success(mes);
              _this.getList(_this.statusTab);
            } else {
              _this.$Modal.confirm({
                title: res.data.message,
                width: 500,
                render: h => h('Table', {
                    props: {
                      columns: [
                        {
                          title: '提示信息',
                          key: 'message'
                        }
                      ],
                      data: res.data.data
                    }
                  })
              });
              // const err = res.data.message || _this.vmI18n.t('modalTips.k9'); // 售后审核失败！
              // _this.$Message.error(err);
            }
          });
        }
      });
    },
    // 取消按钮
    cancelBtn() {
      const selectArr = this.$refs.agGridChild.AGTABLE.getSelect();
      if (selectArr.length == 0) {
        this.$Message.error(this.vmI18n.t('modalTips.l0')); // 请至少选中一项!
        return;
      }
      if (selectArr[0].RETURN_STATUS != 20 && selectArr.length == 1) {
        this.$Message.warning(this.vmI18n.t('modalTips.l1')); // 退换货取消失败,只有【等待退货入库】状态才可以操作取消，请检查后重试!
        return;
      }

      const ids = [];
      for (let i = 0; i < selectArr.length; i++) {
        if (selectArr[i].RETURN_STATUS == 20) {
          ids.push(selectArr[i].ID);
        }
      }
      if (ids.length == 0) {
        this.$Message.warning(this.vmI18n.t('modalTips.l2')); // 单据状态不符合取消条件，请重新选择
        return;
      }
      this.service.orderCenter.checkCancelParams({ ids }).then(res => {
        if (res.data.code == 0 || res.data.code == 1) {
          const message = res.data.code == 0 ? this.vmI18n.t('modalTips.l3') : '此退换货单已生成未作废的换货类型零售发货单,不允许取消,继续将作废换货类型零售发货单以及退换订单';
          this.$Modal.info({
            title: this.vmI18n.t('modalTitle.tips'), // 提示
            content: message,
            mask: true,
            showCancel: true,
            okText: this.vmI18n.t('common.determine'), // 确定
            cancelText: this.vmI18n.t('common.cancel'), // 取消
            onOk: () => {
              this.isSaveLoading = true;
              this.service.orderCenter.OcCancelChangingOrRefund({ ids }).then(res => {
                this.isSaveLoading = false;
                if (res.data.code === 0) {
                  if (res.data.data === 'comfirmFlag') {
                    this.$Modal.info({
                      title: this.vmI18n.t('modalTitle.tips'), // 提示
                      content: this.vmI18n.t('modalTips.l4'), // 换货订单的状态为配货中或已经发货,是否确认直接取消退货？
                      mask: true,
                      showCancel: true,
                      okText: this.vmI18n.t('common.determine'), // 确定
                      cancelText: this.vmI18n.t('common.cancel'), // 取消
                      onOk: () => {
                        this.isSaveLoading = true;
                        this.service.orderCenter.OcCancelChangingOrRefund({ ids, comfirmFlag: 'comfirmFlag' }).then(res => {
                          this.isSaveLoading = false;
                          if (res.data.code === 0) {
                            this.$Message.success(res.data.message);
                            setTimeout(() => {
                              this.getList(this.statusTab);
                            }, 500);
                          } else {
                            const err = res.data.message || this.vmI18n.t('modalTips.l5'); // 取消失败！
                            this.$Message.info(err);
                          }
                        });
                      }
                    });
                  } else {
                    this.$Message.success(res.data.message);
                    setTimeout(() => {
                      this.getList(this.statusTab);
                    }, 500);
                  }
                } else {
                  this.$Modal.fcError({
                    width: 500,
                    render: h => h('Table', {
                        props: {
                          columns: [
                            {
                              // title: "提示信息",
                              title: 'ID',
                              key: 'objid'
                            },
                            {
                              title: '报错信息',
                              key: 'message'
                            }
                          ],
                          data: res.data.data
                        }
                      })
                  });
                }
              });
            }
          });
        }
      });
    },
    // 虚拟入库
    virtualLibrary() {
      if (this.$refs.agGridChild.AGTABLE.getSelect().length != 1) {
        this.$Message.error(this.vmI18n.t('modalTips.k3')); // 请选中一项修改!
        return;
      }
      if (this.$refs.agGridChild.AGTABLE.getSelect()[0].RETURN_STATUS !== 20) {
        this.$Message.error(this.vmI18n.t('modalTips.l6')); // 此退换单状态不允许虚拟入库!
        return;
      }
      this.$Modal.info({
        title: this.vmI18n.t('modalTitle.tips'), // 提示
        content: this.vmI18n.t('modalTips.l7'), // 是否确定虚拟入库？
        mask: true,
        showCancel: true,
        okText: this.vmI18n.t('common.determine'), // 确定
        cancelText: this.vmI18n.t('common.cancel'), // 取消
        onOk: () => {
          this.service.common.updateVirtualLibrary({ ID: this.$refs.agGridChild.AGTABLE.getSelect()[0].ID }).then(res => {
            if (res.data.code == 0) {
              this.$Message.success(res.data.message);
              setTimeout(() => {
                this.getList(this.statusTab);
              }, 500);
            } else {
              const err = res.data.message || this.vmI18n.t('modalTips.l5'); // 虚拟入库失败！
              this.$Message.info(err);
            }
          });
        }
      });
    },
    virtualWarehouseLibraryWarn() {
      if (this.$refs.agGridChild.AGTABLE.getSelect().length === 0) {
        this.$Message.error(this.vmI18n.t('modalTips.l0')); // 请至少选中一项!
        return;
      }
      this.virtualWarehouseModal = true;
    },
    // 虚拟仓库入库
    virtualWarehouseLibrary() {
      const ids = [];
      this.$refs.agGridChild.AGTABLE.getSelect().forEach(item => {
        ids.push(item.ID);
      });
      this.service.orderCenter.virtualWarehouseStorage({ ids }).then(res => {
        if (res.data.code === 0) {
          this.getList(this.statusTab);
          this.$Message.success(res.data.message);
        } else {
          const err = res.data.message || this.vmI18n.t('modalTips.l9'); // 虚拟仓库入库失败！
          // this.$Message.info(err);
          this.$Modal.confirm({
            title: err,
            render: h => h('Table', {
                props: {
                  columns: [
                    {
                      title: 'id',
                      key: 'objid'
                    },
                    {
                      title: '报错信息',
                      key: 'message'
                    }
                  ],
                  data: res.data.data
                }
              })
          });
        }
      });
    },
    // 取消自动退款
    cancelRefund() {
      if (this.$refs.agGridChild.AGTABLE.getSelect().length != 1) {
        this.$Message.error(this.vmI18n.t('modalTips.k3')); // 请选中一项修改!
        return;
      }
      this.service.orderCenter.cancelautorefund({ ID: this.$refs.agGridChild.AGTABLE.getSelect()[0].ID }).then(res => {
        if (res.data.code === 0) {
          this.getList(this.statusTab);
          this.$Message.success(res.data.message);
        } else {
          const err = res.data.message || this.vmI18n.t('modalTips.m0'); // 取消自动退款失败！
          this.$Message.info(err);
        }
      });
    },
    // 修改备注
    bounced() {
      if (!this.$refs.agGridChild.AGTABLE.getSelect().length) {
        this.$Message.error(this.vmI18n.t('modalTips.m1')); // 请至少选中一项修改!
        return;
      }
      if (this.$refs.agGridChild.AGTABLE.getSelect()[0].RETURN_STATUS == 60 && this.$refs.agGridChild.AGTABLE.getSelect().length == 1) {
        this.$Message.error(this.vmI18n.t('modalTips.m2')); // 取消状态不允许修改备注!
        return;
      }
      const ids = [];
      for (let i = 0; i < this.$refs.agGridChild.AGTABLE.getSelect().length; i++) {
        if (this.$refs.agGridChild.AGTABLE.getSelect()[i].RETURN_STATUS != 60) {
          ids.push(this.$refs.agGridChild.AGTABLE.getSelect()[i].ID);
        }
      }
      this.changeRemarkConfig.componentData = {
        ids: ids.join(','),
        status: this.statusTab,
        type: 1
      };
      this.$children.find(item => item.name === 'rturngoodModifyRemarks').openConfirm();
    },
    // 修改卖家备注
    bounced2() {
      const selectArr = this.$refs.agGridChild.AGTABLE.getSelect();
      if (!selectArr.length) {
        this.$Message.error(this.vmI18n.t('modalTips.m1')); // 请至少选中一项修改!
        return;
      }
      const ids = [];
      let iSstate = true;
      selectArr.forEach(element => {
        if (element.RETURN_STATUS_NAME === this.vmI18n.t('common.cancel')) {
          this.$Message.error(this.vmI18n.t('modalTips.ds')); // 单据状态是取消状态不能修改卖家备注！
          iSstate = false;
        }
      });
      if (iSstate) {
        for (let i = 0; i < this.$refs.agGridChild.AGTABLE.getSelect().length; i++) {
          ids.push(this.$refs.agGridChild.AGTABLE.getSelect()[i].ID);
        }
        this.changeRemarkConfig.componentData = {
          ids: ids.join(','),
          status: this.statusTab,
          type: 2
        };
        this.$children.find(item => item.name === 'rturngoodModifyRemarks').openConfirm();
      }
    },
    // 修改退货仓库
    Warehouse() {
      if (!this.$refs.agGridChild.AGTABLE.getSelect().length) {
        this.$Message.error(this.vmI18n.t('modalTips.m1')); // 请至少选中一项修改!
        return;
      }
      // if (this.returnSelectData[0].RETURN_STATUS_NAME != '等待退货入库' && this.returnSelectData.length == 1) {
      //   this.$Message.error('只有等待退货入库状态可以从WMS撤回!');
      //   return;
      // }
      const ids = [];
      for (let i = 0; i < this.$refs.agGridChild.AGTABLE.getSelect().length; i++) {
        // if (this.returnSelectData[i].RETURN_STATUS_NAME != '取消') {
        ids.push(this.$refs.agGridChild.AGTABLE.getSelect()[i].ID);
        // }
      }
      this.modifyWarehouse.componentData = { ids };
      this.$children.find(item => item.name === 'modifyWarehouse').openConfirm();
    },
    OrderLogistics() {
      if (!this.$refs.agGridChild.AGTABLE.getSelect().length) {
        this.$Message.error(this.vmI18n.t('modalTips.m1')); // 请至少选中一项修改!
        return;
      }
      const ids = [];
      for (let i = 0; i < this.$refs.agGridChild.AGTABLE.getSelect().length; i++) {
        ids.push(this.$refs.agGridChild.AGTABLE.getSelect()[i].ID);
      }
      this.modifyReturnOrderLogistics.componentData = { ids };
      this.$children.find(item => item.name === 'modifyReturnOrderLogistics').openConfirm();
    },
    // 批量原退
    batchOriginalBack() {
      if (this.$refs.agGridChild.AGTABLE.getSelect().length == 0) {
        this.$Message.error(this.vmI18n.t('modalTips.l0')); // 请至少选中一项!
        return;
      }
      const ids = [];
      for (let i = 0; i < this.$refs.agGridChild.AGTABLE.getSelect().length; i++) {
        ids.push(this.$refs.agGridChild.AGTABLE.getSelect()[i].ID);
      }
      this.$Modal.info({
        title: this.vmI18n.t('modalTitle.tips'), // 提示
        content: this.vmI18n.t('modalTips.m3'), // 是否确定批量原退？
        mask: true,
        showCancel: true,
        okText: this.vmI18n.t('common.determine'), // 确定
        cancelText: this.vmI18n.t('common.cancel'), // 取消
        onOk: () => {
          this.service.orderCenter.updateReturnBOrder({ ids }).then(res => {
            if (res.data.code === 0) {
              this.getList(this.statusTab);
              this.$Message.success(res.data.message);
              if (res.data.data.length) {
                this.errModal = true;
                this.errdataList = res.data.data;
              }
            } else {
              const err = res.data.message || this.vmI18n.t('modalTips.m4'); // 批量原退失败！
              this.$Message.info(err);
            }
          });
        }
      });
    },
    keyenter() {
      this.errModal = !this.errModal;
    },
    // 从wms撤回
    withdrawWMS() {
      if (this.$refs.agGridChild.AGTABLE.getSelect().length == 0) {
        this.$Message.error(this.vmI18n.t('modalTips.l0')); // 请至少选中一项!
        return;
      }
      if (this.$refs.agGridChild.AGTABLE.getSelect()[0].RETURN_STATUS != 20 && this.$refs.agGridChild.AGTABLE.getSelect().length == 1) {
        this.$Message.error(this.vmI18n.t('modalTips.m5')); // 只有等待退货入库状态可以从WMS撤回!
        return;
      }
      const ids = [];
      for (let i = 0; i < this.$refs.agGridChild.AGTABLE.getSelect().length; i++) {
        if (this.$refs.agGridChild.AGTABLE.getSelect()[i].RETURN_STATUS == 20) {
          ids.push(this.$refs.agGridChild.AGTABLE.getSelect()[i].ID);
        }
      }
      this.service.orderCenter.orderReturnRecallFromWms({ ID: ids }).then(res => {
        if (res.data.code === 0) {
          this.getList(this.statusTab);
          this.$Message.success(res.data.message);
        } else {
          const err = res.data.message || this.vmI18n.t('modalTips.m6'); // 从wms撤回失败！
          this.$Message.info(err);
        }
      });
    },
    // 重传wms
    againWMS() {
      if (this.$refs.agGridChild.AGTABLE.getSelect().length == 0) {
        this.$Message.error(this.vmI18n.t('modalTips.l0')); // 请至少选中一项!
        return;
      }
      const ids = [];
      for (let i = 0; i < this.$refs.agGridChild.AGTABLE.getSelect().length; i++) {
        ids.push(this.$refs.agGridChild.AGTABLE.getSelect()[i].ID);
      }
      this.service.orderCenter.retransmissionWms({ returnOrderIds: ids.join(',') }).then(res => {
        if (res.data.code === 0) {
          this.getList(this.statusTab);
          this.$Message.success(res.data.message);
        } else {
          const err = res.data.message || this.vmI18n.t('modalTips.m7'); // 重WMS失败！
          this.$Message.info(err);
        }
      });
    },
    // 强制完成
    forcedCompletion() {
      if (this.$refs.agGridChild.AGTABLE.getSelect().length == 0) {
        this.$Message.error(this.vmI18n.t('modalTips.l0')); // 请至少选中一项!
        return;
      }
      if (this.$refs.agGridChild.AGTABLE.getSelect()[0].RETURN_STATUS != 30 && this.$refs.agGridChild.AGTABLE.getSelect().length == 1) {
        this.$Message.error(this.vmI18n.t('modalTips.m8')); // 只有等待售后确认状态可以强制完成!
        return;
      }
      const ids = [];
      this.$refs.agGridChild.AGTABLE.getSelect().forEach(item => {
        ids.push(item.ID);
      });
      this.$Modal.info({
        title: this.vmI18n.t('modalTitle.tips'), // 提示
        content: this.vmI18n.t('modalTips.m9'), // 是否确定强制完成？
        mask: true,
        showCancel: true,
        okText: this.vmI18n.t('common.determine'), // 确定
        cancelText: this.vmI18n.t('common.cancel'), // 取消
        onOk: () => {
          this.service.orderCenter.forcedCompletion({ ids }).then(res => {
            if (res.data.code === 0) {
              this.getList(this.statusTab);
              this.$Message.success(res.data.message);
            } else {
              const err = res.data.message || this.vmI18n.t('modalTips.n0'); // 强制完成失败！
              this.$Message.info(err);
            }
          });
        }
      });
    },
    // 复制退单
    cloneRenturnGood() {
      const _this = this;
      if (this.$refs.agGridChild.AGTABLE.getSelect().length !== 1) {
        this.$Message.error(this.vmI18n.t('modalTips.n1'));
        return;
      } // 请选中一条单据进行复制!
      _this.$store.commit('customize/TabOpen', {
        id: -1,
        type: 'action',
        name: 'returngood',
        label: _this.vmI18n.t('panel_label.addReturnOrder'), // 退换货订单新增
        query: {
          id: -1,
          cloneReturnGoodId: this.$refs.agGridChild.AGTABLE.getSelect()[0].ID,
          tabTitle: _this.vmI18n.t('panel_label.addReturnOrder') // 退换货订单新增
        }
      });
    },
    // 退货转换货校验
    async refund2ExchangeValidate() {
      const _this = this;
      const seLen = this.$refs.agGridChild.AGTABLE.getSelect().length;
      if (seLen !== 1) {
        // <1时,请选中一项修改!    >1时,不允许批量处理！
        const str = seLen < 1 ? this.vmI18n.t('modalTips.k3') : this.vmI18n.t('modalTips.dr');
        _this.$Message.error(str);
        return;
      }
      const selected = this.$refs.agGridChild.AGTABLE.getSelect()[0];
      const query = {
        ids: [selected.ID]
      };
      const res = await _this.service.orderCenter.refund2ExchangeValidate(query);
      if (res.data.code === 0) {
        // this.refund2Exchange();
        this.$store.commit('customize/TabHref', {
          id: selected.ID, // 单据id
          type: 'action', // 类型action
          name: 'RETURNGOOD', // 文件名
          label: '退换货订单详情', // tab中文名
          query: Object.assign({
            id: selected.ID, // 单据id
            tabTitle: '退换货订单详情', // tab中文名
            statusName: selected.RETURN_STATUS_NAME, // 行的退单状态
            flag: 'RefundToExchange'
          }) // 带的参数
        });
      } else {
        const err = res.data.message || '转换失败'; // 售后审核失败！
        _this.$Message.error(err);
      }
    },
    // 退货转换货
    async refund2Exchange() {
      const _this = this;
      const selected = this.$refs.agGridChild.AGTABLE.getSelect()[0];
      const query = {
        ids: [selected.ID]
      };
      const res = await _this.service.orderCenter.refund2Exchange(query);
      if (res.data.code == 0) {
        this.$store.commit('customize/TabHref', {
          id: query.ID, // 单据id
          type: 'action', // 类型action
          name: 'RETURNGOOD', // 文件名
          label: '退换货订单详情', // tab中文名
          query: Object.assign({
            id: query.ID, // 单据id
            tabTitle: '退换货订单详情', // tab中文名
            statusName: selected.RETURN_STATUS_NAME // 行的退单状态
          }) // 带的参数
        });
      } else {
        const err = res.data.message || '转换失败'; // 售后审核失败！
        _this.$Message.error(err);
      }
    },
    // 导入
    returnExport() {},
    // 导出
    returnImport() {},
    // 导出
    exportClick() {
      const _this = this;
      if (this.$refs.agGridChild.AGTABLE.getSelect().length) {
        if (this.isExport) {
          this.$Message.error(_this.vmI18n.t('modalTips.f8')); // 有一项导出正在进行中
          return;
        }
        this.isExport = true;
        const ids = [];
        for (let i = 0; i < this.$refs.agGridChild.AGTABLE.getSelect().length; i++) {
          ids.push(this.$refs.agGridChild.AGTABLE.getSelect()[i].ID);
        }
        const idList = { idList: ids };
        this.service.orderCenter.exportReturnOrder(idList).then(res => {
          _this.isExport = false;
          if (res.data.code == 0 && res.data.data !== null) {
            const mes = res.data.message || _this.vmI18n.t('modalTips.z2'); // 导出成功！
            _this.$Message.success(mes);
            publicMethodsUtil.downloadUrlFile(res.data.data);
          } else {
            const err = res.data.message || _this.vmI18n.t('modalTips.z3'); // 失败！
            _this.$Message.error(err);
          }
        });
      } else {
        if (_this.agTableConfig.rowData.length === 0) {
          _this.$Message.error(_this.vmI18n.t('modalTips.z4'));
          return;
        } // 列表没有数据,无法导出!
        if (_this.statusTab == '') {
          _this.warningModal = true;
        } else {
          _this.warningOk();
        }
      }
    },

    // 警告框确认
    warningOk() {
      const _this = this;
      if (this.isExport) {
        this.$Message.error(_this.vmI18n.t('modalTips.f8')); // 有一项导出正在进行中
        return;
      }
      this.isExport = true;
      const param = {
        start: _this.agTableConfig.pagenation.current,
        count: 999999,
        RETURN_STATUS: _this.status == undefined ? '' : _this.status
      };
      _this.formConfig.formValue.RECEIVE_PROVINCE = '';
      _this.formConfig.formValue.RECEIVE_PROVINCE_ID = '';
      if (_this.formConfig.formData.length) {
        _this.formConfig.formData.forEach(item => {
          if (item.itemdata !== undefined && item.itemdata.name == '原始订单编号') {
            _this.formConfig.formValue.ORIG_ORDER_ID = item.itemdata.valuedata;
          }
        });
      }
      if (this.status) {
        _this.formConfig.formValue.RETURN_STATUS = this.status;
      }
      this.service.orderCenter.exportReturnOrder(Object.assign(param, _this.formConfig.formValue)).then(res => {
        _this.isExport = false;
        if (res.data.code == 0 && res.data.data !== null) {
          const mes = res.data.message || this.vmI18n.t('modalTips.z2'); // 导出成功！
          _this.$Message.success(mes);
          // return (window.location = res.data.data);
          publicMethodsUtil.downloadUrlFile(res.data.data);
        } else {
          const err = res.data.message || this.vmI18n.t('modalTips.z3'); // 失败！
          _this.$Message.error(err);
        }
      });
    }
  },
  destroyed() {
    window.removeEventListener('keydown', this, false);
  }
};

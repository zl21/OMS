import { OmsButton, OmsForm, OmsDialog, OmsLabel, OmsTable, OmsAgTable as aTable } from 'burgeonComponents'
import isFavoriteMixin from '@/assets/js/mixins/isFavorite';
import publicMethodsUtil from '@/assets/js/public/publicMethods';
import buttonPermissionsMixin from '@/assets/js/mixins/buttonPermissions';
import BtnConfig from 'burgeonConfig/config/funBtn.config';
import unzipXv from '@/assets/js/dataToSmall';
import commonUtils from 'burgeonConfig/config/commonUtils';
import BurgeonEvent from 'burgeonConfig/config/event.config';

export default {
  components: {
    OmsButton,
    OmsForm,
    OmsTable,
    OmsLabel,
    OmsDialog,
    aTable,
    loading
  },
  // mixins: [isFavoriteMixin],
  mixins: [isFavoriteMixin, buttonPermissionsMixin],
  data() {
    return {
      vmI18n: $i18n,
      loadingActive: false,
      resetForm: true,
      eventGather: BurgeonEvent,
      errThData: [
        {
          title: $i18n.t('form_label.chargebackNumber'), // 退单编号
          key: 'id'
        },
        {
          title: $i18n.t('table_label.abnormalInfo'), // 异常信息
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
        confirmTitle: $i18n.t('modalTitle.modify_sellerNotes'), // 修改备注/修改卖家备注
        titleAlign: 'left', // 设置标题是否居中 center left
        width: '440',
        scrollable: false, // 是否可以滚动
        closable: true, // 是否可以按esc关闭
        draggable: true, // 是否可以拖动
        mask: true, // 是否显示遮罩层
        maskClosable: true, // 是否可以点击叉号关闭
        transfer: true, // 是否将弹层放在body内
        name: 'rturngoodModifyRemarks', // 组件名称
        url: 'pages/orderCenter/returngood/rturngoodModifyRemarks',
        keepAlive: true,
        excludeString: 'rturngoodModifyRemarks', // 将name传进去，确认不缓存
        componentData: {}
      },
      // 修改退回仓库
      modifyWarehouse: {
        refFuns: 'confirmFun',
        confirmTitle: $i18n.t('modalTitle.modify_returnWarehouse'), // 修改退货仓库
        titleAlign: 'left', // 设置标题是否居中 center left
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
        confirmTitle: $i18n.t('modalTitle.modify_logisticsCompany'), // 修改物流公司
        titleAlign: 'left', // 设置标题是否居中 center left
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
        confirmTitle: $i18n.t('btn.import'), // 导入
        titleAlign: 'left', // 设置标题是否居中 center left
        width: '600',
        scrollable: false, // 是否可以滚动
        closable: true, // 是否可以按esc关闭
        draggable: true, // 是否可以拖动
        mask: true, // 是否显示遮罩层
        maskClosable: true, // 是否可以点击叉号关闭
        transfer: true, // 是否将弹层放在body内
        name: 'importTable', // 组件名称
        basePathName: 'business-components',
        url: 'importTable',
        keepAlive: true,
        excludeString: 'importTable', // 将name传进去，确认不缓存
        componentData: {}
      },
      warningModal: false, // 警告弹框
      virtualWarehouseModal: false, // 手工入库弹框
      btnConfig: BtnConfig.config(), // 按钮数据
      formConfig: {
        flodClickMsg: 'a', // 展开按钮 参数任意字符串
        formValue: {},
        formData: [],
        flodClick: () => {
          setTimeout(() => { }, 10);
        }
      }, // form表单
      labelList: [
        {
          label: $i18n.t('panel_label.all'), // 全部
          value: '',
          isShow: true
        },
        {
          label: $i18n.t('form_label.waitFor_return_warehous'), // 等待退货入库
          value: '20',
          isShow: true
        },
        {
          label: $i18n.t('form_label.waitFor_afterSale_confirm'), // 等待售后确认
          value: '30',
          isShow: true
        },
        {
          label: $i18n.t('form_label.complete'), // 完成
          value: '50',
          isShow: true
        },
        {
          label: $i18n.t('common.cancel'), // 取消
          value: '60',
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
                      label: $i18n.t('panel_label.retailInvoice_details')
                    });
                  } else {
                    self.$Message.warning(res.data.message);
                  }
                });
              };
            } else {
              resDom.onclick = () => {
                self.$Message.warning('当前平台单号存在多个零售发货单，请进入零售发货单页面查找查看');
              };
            }

            return resDom;
          }
        },
        tableHeight: '480px',
        pagenation: $omsUtils.pageConfig
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
                  title: $i18n.t('table_label.code') // 编号
                },
                {
                  key: 'return',
                  title: $i18n.t('table_label.returnGoods') // 退换货
                },
                {
                  title: $i18n.t('table_label.articleNumber'), // 货号
                  key: 'ps_c_pro_ecode'
                },
                // {
                //   title: "规格",
                //   key: "sku_spec"
                // },
                {
                  title: $i18n.t('other.color'), // 颜色
                  key: 'ps_c_clr_ename'
                },
                {
                  title: $i18n.t('other.sizes'), // 尺寸
                  key: 'ps_c_size_ename'
                },
                {
                  title: $i18n.t('form_label.refundAmount'), // 退款金额
                  key: 'refund_amt'
                },
                {
                  title: $i18n.t('table_label.appleNumber'), // 申请数量
                  key: 'qty_refund'
                },
                {
                  title: $i18n.t('table_label.storageQuantity'), // 入库数量
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
              const img = params.row.BACK_MESSAGE == null || params.row.BACK_MESSAGE == '' ? 0 : 1;
              const imgSrc = require(`assetsImg/flagImgs/${img}.png`);
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
      isExport: false
    };
  },
  activated() {
    // 计算高度 通过设置节点 'totalHeight'
    $omsUtils.setTableHeight(this, 115);
  },
  created() {
    // 获取默认数据
    this.agTableConfig.pagenation.current = 1;
    this.statusData = this.labelList[0];
  },
  mounted() {
    BtnConfig.target = this;
    BurgeonEvent.target = this;
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

    this.getHeaderList();
  },
  methods: {
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
              iconclick: () => { }, // 点击icon图标事件
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
              iconclick: () => { } // 点击icon图标事件
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
              iconclick: () => { } // 点击icon图标事件
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
              selectChange: () => { }, // 选中事件，默认返回选中的值
              clearSelect: e => {
                let tagArr = ['RETURN_STATUS', 'IS_ADD', 'IS_TOAG', 'IS_TOWMS', 'BILL_TYPE', 'IS_EXAMINE', 'IS_TODRP', 'IS_TRANSFER'];
                if (tagArr.includes(e)) _this.formConfig.formValue[e] = '';
              }, // 点击清空按钮回调
              options: commonUtils.converSelect(item.tabth.combobox)
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
        this.getList();
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
    // 获取列表数据
    getList(status) {
      const _this = this;
      _this.agTableConfig.agLoading = true
      _this.agTableConfig.rowData = [];
      _this.agTableConfig.pagenation.total = 0;
      // 当出现loading，禁止页面滚动
      document.getElementById('content').style.overflow = 'hidden';
      document.getElementById('content').style.position = '';
      _this.loadingActive = true;
      status = status ?? this.statusData.value;
      const param = {
        start: _this.agTableConfig.pagenation.current,
        count: _this.agTableConfig.pagenation.pageSize,
        RETURN_STATUS: [status],
        IS_GZIP: true
      };
      _this.formConfig.formValue.RECEIVE_PROVINCE = '';
      _this.formConfig.formValue.RECEIVE_PROVINCE_ID = '';
      _this.formConfig.formData.forEach(item => {
        // '原始订单编号'
        if (item.itemdata?.name == $i18n.t('form_label.originalOrderNo')) {
          _this.formConfig.formValue.ORIG_ORDER_ID = item.itemdata.valuedata;
        }
      });

      if (status) {
        _this.formConfig.formValue.RETURN_STATUS = [status];
      }
      const Obj = _this.formConfig.formValue;
      let keyArr = ['INVENTED_STATUS', 'BILL_TYPE', 'RETURN_STATUS', 'IS_TOWMS', 'WMS_CANCEL_STATUS', 'IS_ADD',
        'IS_TOAG', 'IS_BACK', 'STATUS_DEFECTIVE_TRANS', 'IS_RESERVED'];

      keyArr.some((item) => {
        Obj[item] = (Obj[item]?.[0] === 'bSelect-all') && '';
        return true;
      })

      this.service.orderCenter.querySalesReturn(Object.assign(param, _this.formConfig.formValue)).then(res => {
        // 当loading结束，页面滚动
        _this.agTableConfig.agLoading = false;
        // this.$R3loading.hide(customizedModuleName);
        _this.loadingActive = false;
        document.getElementById('content').style.overflow = 'auto';
        document.getElementById('content').style.position = 'relative';
        res.data.data = JSON.parse(unzipXv(res.data.data));
        console.log(res.data.data);
        if (res.data.code == 0 && res.data.data.queryResult.length) {
          _this.agTableConfig.rowData = res.data.data.queryResult;
          _this.agTableConfig.pagenation.total = res.data.data.totalNum;
          let tempArr = ['MODIFIEDDATE', 'IN_TIME', 'AUDIT_TIME', 'LAST_UPDATE_TIME', 'RETURN_CREATE_TIME', 'CREATIONDATE'];
          for (let i = 0; i < _this.agTableConfig.rowData.length; i++) {
            const item = _this.agTableConfig.rowData[i];
            tempArr.every(subitem => {
              item[subitem] = item[subitem] && $utils.DatesTime(item[subitem]);
            })

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
            if (item.WMS_CANCEL_STATUS == 0) {
              item.WMS_CANCEL_STATUS = '未撤回';
            } else if (item.WMS_CANCEL_STATUS == 1) {
              item.WMS_CANCEL_STATUS = '已撤回';
            } else if (item.WMS_CANCEL_STATUS == 2) {
              item.WMS_CANCEL_STATUS = '撤回失败';
            }
            item.IS_BACK = item.IS_BACK == 0 ? '否' : '是'; // 是否原退
            item.IS_MANUAL_AUDIT = item.IS_MANUAL_AUDIT == 0 ? '否' : '是'; // 是否手工审核
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
            item.RETURN_REASON = item.RETURN_REASON; // 退货原因
            item.BILL_TYPE = item.BILL_TYPE == 1 ? '退货单' : '退换货单';
            item.OWNERID = item.OWNERNAME;
            item.IS_CHECK = item.IS_CHECK == 0 ? '否' : '是'; // 是否已匹配
            item.IS_NOTLOGMBER = item.IS_NOTLOGMBER == 0 ? '否' : '是'; // 是否缺少运单号
            item.IS_EXAMINE = item.IS_EXAMINE == 0 ? '否' : '是'; // 是否提交审核
            item.ISACTIVE = item.ISACTIVE == 0 ? '否' : '是'; // 是否激活
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
            item.IS_TRANSFER = item.IS_TRANSFER == 0 ? '否' : '是'; // 是否
            item.IS_FORCE = item.IS_FORCE == 0 ? '否' : '是'; // 是否
          }
        } else {
          _this.agTableConfig.rowData = [];
          _this.agTableConfig.pagenation.total = 0;
          _this.agTableConfig.agLoading = false;
        }
        _this.$refs.agGridChild.agGridTable(_this.agTableConfig.columnDefs, _this.agTableConfig.rowData);
      });
      console.log(_this.agTableConfig.rowData);
    },
    oneObjs() {
      const _this = this;
      let tempObj = {
        'other.platForm': 'PLATFORM',
        'other.warehousingLogicalWarehouse': 'CP_C_STORE_ID',
        'table_label.expressCompany': 'CP_C_LOGISTICS_ID',
        'form_label.warehousingEntity': 'CP_C_PHY_WAREHOUSE_IN_ID',
        'form_label.shipPhysicalWarehouse': 'CP_C_PHY_WAREHOUSE_ID',
        'table_label.shopName': 'CP_C_SHOP_ID',
        'table_label.creator': 'OWNERID'
      };
      _this.formConfig.formData.forEach(item => {
        if (Object.keys(tempObj).includes(item.itemdata?.name)) {
          _this.formConfig.formValue[tempObj.myName] = item.itemdata.pid
        }
      });
    },
    // 双击时触发
    onRowDblclick(row) {
      commonUtils.navigateMain(row.ID, 'TabHref', 'returngood', 'panel_label.ReturnOrderDetails', { statusName: row.RETURN_STATUS_NAME, statusNo: row.RETURN_STATUS });
    },
    keyenter() {
      this.errModal = !this.errModal;
    },

  },
};

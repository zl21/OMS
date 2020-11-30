import businessButton from 'professionalComponents/businessButton';
import businessForm from 'professionalComponents/businessForm';
import businessActionTable from 'professionalComponents/businessActionTable';
import businessDialog from 'professionalComponents/businessDialog';
import strUtil from '@/assets/js/__utils__/util';
import DateUtil from '@/assets/js/__utils__/date';
import { buttonPermissionsMixin } from '@/assets/js/mixins/buttonPermissions';
import { isFavoriteMixin } from '@/assets/js/mixins/isFavorite';
import comUtils from '@/assets/js/__utils__/common.js';
import loading from '@/component/loading.vue';
import aTable from 'professionalComponents/agGridTable.vue';

const getCurrentTime = (() => {
  const t = new Date();
  return t.Format('yyyy-MM-dd 23:59:59');
})();
const addSevenDay = (() => {
  const d = new Date();
  const t = d.addDays(d, -7);
  return t.Format('yyyy-MM-dd 00:00:00');
})();

export default {
  components: {
    businessButton,
    businessForm,
    businessActionTable,
    businessDialog,
    aTable,
    loading
  },
  mixins: [buttonPermissionsMixin, isFavoriteMixin],
  props: {},
  watch: {
    selection: {
      handler() {
        this.btnConfig.buttons[2].disabled = !(this.selection && this.selection.length <= 1);
      }
    }
  },
  data() {
    return {
      vmI18n: window.vmI18n,
      isFavorite: false,
      // 弹框配置 导入
      importTable: {
        refFuns: 'confirmFun',
        // confirmTitle: "导入",
        confirmTitle: window.vmI18n.t('modalTitle.import'),
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
      setFromInput: {
        refFuns: 'confirmFun',
        // confirmTitle: "排序表单",
        confirmTitle: window.vmI18n.t('modalTitle.sortForm'),
        titleAlign: 'center', // 设置标题是否居中 center left
        width: '300',
        scrollable: false, // 是否可以滚动
        closable: true, // 是否可以按esc关闭
        draggable: true, // 是否可以拖动
        mask: true, // 是否显示遮罩层
        maskClosable: true, // 是否可以点击叉号关闭
        transfer: true, // 是否将弹层放在body内
        name: 'setFromInput', // 组件名称
        url: 'returngood/setFromInput',
        keepAlive: true,
        excludeString: 'setFromInput', // 将name传进去，确认不缓存
        componentData: {}
      },
      btnConfig: {
        typeAll: 'error',
        buttons: [
          {
            // text: "查找",
            text: window.vmI18n.t('btn.find'), // 按钮文本
            btnclick: () => {
              this.requestBefore();
            }
          },
          {
            // text: "新增",
            text: window.vmI18n.t('btn.add'), // 按钮文本
            btnclick: () => {
              this.$store.commit('customize/TabHref', {
                id: -1, // id
                type: 'action', // 类型action
                name: 'returnTreasuryAdd', // 文件名
                // label: "退货入库新增", //tab中文名
                label: window.vmI18n.t('panel_label.returnTreasuryAdd'),
                query: Object.assign({
                  id: -1, // id
                  // tabTitle: "退货入库新增", //tab中文名
                  tabTitle: window.vmI18n.t('panel_label.returnTreasuryAdd')
                }) // 带的参数
              });
            }
          },
          {
            // text: "手工匹配",
            text: window.vmI18n.t('btn.manual_matching'), // 按钮文本
            disabled: false,
            btnclick: () => {
              const self = this;
              self.selection = self.$refs.agGridChild.AGTABLE.getSelect();
              const ids = this.selection.map(item => item.ID);
              if (ids.length === 0) {
                // return this.$Message.error("请选择一条明细手工匹配");
                this.$Message.error(window.vmI18n.t('modalTips.p4'));
                return;
              }
              if (ids.length > 1) {
                // return this.$Message.error("只能选择一条明细手工匹配");
                this.$Message.error(window.vmI18n.t('modalTips.p5'));
                return;
              }
              if (this.selection[0].IS_OFF_MATCH == 1) {
                // return this.$Message.error("此退货入库单已经关闭匹配，不允许选择");
                this.$Message.error(window.vmI18n.t('modalTips.q6'));
                return;
              }
              const id = ids[0];
              // 需要验证是否能够进入手工匹配界面
              this.service.orderCenter.manualMatchingCheck({ id }).then(res => {
                if (res.data.code === 0) {
                  self.$store.commit('customize/TabHref', {
                    id, // id
                    type: 'action', // 类型action
                    name: 'manualMatching', // 文件名
                    // label: "退货入库-手工匹配", //tab中文名
                    label: window.vmI18n.t('panel_label.return_warehousing_manual_matching'),
                    query: Object.assign({
                      id, // id
                      // tabTitle: "退货入库-手工匹配", //tab中文名
                      tabTitle: window.vmI18n.t('panel_label.return_warehousing_manual_matching'),
                      source: 2,
                      form: 'list'
                    }) // 带的参数
                  });
                } else {
                  // let mes = res.data.message || "状态不匹配不能进入手动匹配";
                  const mes = res.data.message || window.vmI18n.t('modalTips.p6');
                  self.$Message.error(mes);
                }
              });
            }
          },
          {
            // text: "错发强制匹配",
            text: window.vmI18n.t('btn.wrong_sending_forced_matching'), // 按钮文本
            disabled: false,
            btnclick: () => {
              const self = this;
              self.selection = self.$refs.agGridChild.AGTABLE.getSelect();
              const ids = this.selection.map(item => item.ID);
              if (ids.length === 0) {
                // return this.$Message.error("请选择一条明细错发强制匹配");

                this.$Message.error(window.vmI18n.t('modalTips.p7'));
                return;
              }
              if (ids.length > 1) {
                // return this.$Message.error("只能选择一条明细错发强制匹配");
                this.$Message.error(window.vmI18n.t('modalTips.p8'));
                return;
              }
              if (this.selection[0].IS_OFF_MATCH == 1) {
                // return this.$Message.error("此退货入库单已经关闭匹配，不允许选择");
                this.$Message.error(window.vmI18n.t('modalTips.q6'));
                return;
              }
              const id = ids[0];
              // 需要验证是否能够进入错发强制匹配界面
              this.service.orderCenter.manualMatchingCheck({ id }).then(res => {
                if (res.data.code === 0) {
                  self.$store.commit('customize/TabHref', {
                    id, // id
                    type: 'action', // 类型action
                    name: 'manualMatching', // 文件名
                    // label: "退货入库-错发强制匹配", //tab中文名
                    label: window.vmI18n.t('panel_label.return_warehousing_wrong_delivery_forced_matching'),
                    query: Object.assign({
                      id, //
                      // tabTitle: "退货入库-错发强制匹配", //tab中文名
                      tabTitle: window.vmI18n.t('panel_label.return_warehousing_wrong_delivery_forced_matching'),
                      source: 3,
                      form: 'list'
                    }) // 带的参数
                  });
                } else {
                  const mes = res.data.message || window.vmI18n.t('modalTips.p9');
                  self.$Message.error(mes);
                }
              });
            }
          },
          {
            // =======================================================暂时影藏
            // text: "作废",
            text: window.vmI18n.t('btn.void'), // 按钮文本
            isShow: false,
            btnclick: () => {
              this.selection = this.$refs.agGridChild.AGTABLE.getSelect();
              const ids = this.selection.map(item => item.ID);
              if (ids.length === 0) {
                // return this.$Message.error("未选择退货入库单,请选择一条数据后再操作！");
                this.$Message.error(window.vmI18n.t('modalTips.o0'));
                return;
              }
              this.service.orderCenter.returnCancel({ ids }).then(res => {
                if (res.data.code === 0) {
                  const mes = res.data.message || window.vmI18n.t('modalTips.q9');
                  this.$Message.success(mes);
                } else {
                  const mes = res.data.message || window.vmI18n.t('modalTips.p0');
                  this.$Message.error(mes);
                }
              });
            }
          },
          {
            type: '', // 按钮类型
            // text: "导入", //按钮文本
            text: window.vmI18n.t('btn.import'), // 按钮文本
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              const _this = this;
              _this.importTable.componentData = { tableName: 'OC_B_REFUND_IN' };
              _this.$children.find(item => item.name === 'importTable').openConfirm();
            } // 按钮点击事件
          },
          {
            // text: "导出", //按钮文本
            text: window.vmI18n.t('btn.export'), // 按钮文本
            btnclick: () => {
              this.exportClick();
            } // 按钮点击事件
          },
          {
            icon: 'iconfont iconbj_setup', // 按钮图标
            btnclick: () => {
              const self = this;
              self.setFromInput.componentData = {
                typeName: 'OC_B_REFUND_IN'
              };
              setTimeout(() => {
                self.$children.find(item => item.name === 'setFromInput').openConfirm();
              }, 100);
            } // 按钮点击事件
          },
          {
            icon: 'iconfont iconbj_col', // 按钮图标
            // name: "收藏",
            name: window.vmI18n.t('btn.collection'), // 按钮文本
            btnclick: () => {
              const self = this;
              self.setFavorite();
            } // 按钮点击事件
          }
        ]
      },
      formConfig: {
        flodClickMsg: 'a',
        formData: [],
        formValue: {},
        flodClick: () => {}
      },
      agTableConfig: {
        agLoading: false,
        columnDefs: [],
        rowData: [],
        renderArr: {
          ID: param => {
            const resDom = document.createElement('a');
            resDom.style['text-decoration'] = 'underline';
            resDom.innerHTML = param.data.ID;
            return resDom;
          }
        },
        tableHeight: '560px',
        pagenation: comUtils.pageConfig
      },
      selection: [],
      searchObj: {},
      warningModal: false,
      isShowFromLoading: false,
      isExport: false
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.getPermissions('btnConfig', 'returnStoreageList');
    });
    this.getHeaderList();
    // 计算高度 通过设置节点 'totalHeight'
    comUtils.setTableHeight(this, 100);
    // 检测屏幕变化 设置高度 重新渲染agTabe
    window.onresize = () => {
      comUtils.setTableHeight(this, 40);
      this.$refs.agGridChild.agGridTable(this.agTableConfig.columnDefs, this.agTableConfig.rowData);
    };
  },
  activated() {
    this.agTableConfig.pagenation.current = 1;
  },
  methods: {
    // 获取高级查询&表头
    getHeaderList() {
      const _this = this;
      _this.isShowFromLoading = true;
      const params = {
        table: 'OC_B_REFUND_IN',
        column_include_uicontroller: true,
        fixedcolumns: {},
        multiple: [],
        startindex: 0
      };
      this.service.orderCenter.DynamicList(params).then(res => {
        // 高级查询
        const formData = [];
        res.data.data.search.date.forEach((item, index) => {
          switch (item.type) {
            case 'date':
              formData[index] = {
                style: item.tabth.isfilter ? 'date' : '', // 输入框类型
                type: 'datetimerange', // 文本框类型的input
                label: item.tabth.name, // 输入框前文字
                value: item.tabth.colname, // 输入框的值
                format: 'yyyy-MM-dd HH:mm:ss',
                width: '12', // 所占的宽度 (宽度分为24份,数值代表所占份数的宽度)
                icon: 'md-alarm', // 输入框后带的图标,暂只有输入框支持
                placeholder: '', // 占位文本，默认为请输入
                transfer: true,
                ghost: false, // 是否关闭幽灵按钮，默认开启
                inputenter: () => {
                  _this.request();
                }, // 表单回车事件
                iconclick: () => {}, // 点击icon图标事件
                clearable: true
              };
              _this.formConfig.formValue[item.tabth.colname] = item.tabth.name === '创建时间' ? [addSevenDay, getCurrentTime] : [];
              break;
            case 'propInput':
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
              break;
            case 'text':
              formData[index] = {
                style: item.tabth.isfilter ? 'input' : '', // 输入框类型
                // type: "", //文本框类型的input
                label: item.tabth.name, // 输入框前文字
                value: item.tabth.colname, // 输入框的值
                width: item.tabth.name == '备注' ? '12' : '6', // 所占的宽度 (宽度分为24份,数值代表所占份数的宽度)
                icon: '', // 输入框后带的图标,暂只有输入框支持
                clearable: true,
                placeholder: '', // 占位文本，默认为请输入
                ghost: false, // 是否关闭幽灵按钮，默认开启
                inputenter: () => {
                  _this.request();
                }, // 表单回车事件
                iconclick: () => {} // 点击icon图标事件
              };
              _this.formConfig.formValue[item.tabth.colname] = '';
              break;
            case 'number':
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
                  _this.request();
                }, // 表单回车事件
                iconclick: () => {} // 点击icon图标事件
              };
              _this.formConfig.formValue[item.tabth.colname] = '';
              break;
            case 'select':
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
              break;
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
        _this.isShowFromLoading = false;
        setTimeout(() => {
          _this.request();
        }, 100);
      });
    },
    oneObjs(e) {
      const _this = this;
      _this.formConfig.formData.forEach(item => {
        if (item.itemdata && item.itemdata.name == e.name) {
          switch (item.itemdata.name) {
            case '物流公司':
              _this.formConfig.formValue.CP_C_LOGISTICS_ID = item.itemdata.pid;
              break;
            case '入库仓库':
              _this.formConfig.formValue.IN_STORE_ID = item.itemdata.pid;
              break;
            case '批货编号':
              _this.formConfig.formValue.OC_B_REFUND_BATCH_ID = item.itemdata.pid;
              break;
          }
        }
      });
    },
    // 字段选项组转换
    converSelect(val) {
      const list = [];
      val.forEach(item => {
        list.push({ label: item.limitdesc, value: item.limitval });
      });
      return list; 
    },
    parentClass() {
      return '';
    },
    requestBefore() {
      this.agTableConfig.pagenation.current = 1;
      this.request();
    },
    requestParams() {
      const params = {
        currentPage: this.agTableConfig.pagenation.current || 1, // 当前页
        pageSize: this.agTableConfig.pagenation.pageSize // 页大小
      };
      this.formConfig.formData.forEach(item => {
        if (item.value === 'CREATETIME') return; // 特殊处理
        if (item.value === 'MATCH_STATUS' || item.value === 'IS_OFF_MATCH' || item.value === 'PRODUCT_MARK' || item.value === 'IN_STATUS') {
          const arr = this.formConfig.formValue[item.value];
          if (Object.prototype.toString.call(arr) === '[object Array]' && arr[0] === 'bSelect-all') {
            return;
          }
        }
        if (!strUtil.isObjectEmpty(item.itemdata) && item.itemdata.colname !== '' && item.itemdata.valuedata && item.itemdata.valuedata !== '') {
          const colname = item.itemdata.colname;
          this.formConfig.formValue[colname] = item.itemdata.pid || '';
          params[colname] = this.formConfig.formValue[colname];
        } else if (item.value && this.formConfig.formValue[item.value] !== '') {
          // 正常
          params[item.value] = this.formConfig.formValue[item.value];
        }
      });
      const CREATETIME = this.formConfig.formValue.CREATETIME;
      if (CREATETIME && CREATETIME !== []) {
        if (CREATETIME[0] !== '') {
          params.beginDate = CREATETIME[0] ? CREATETIME[0].Format('yyyy-MM-dd hh:mm:ss') : '';
        }
        if (CREATETIME[1] !== '') {
          params.endDate = CREATETIME[1] ? CREATETIME[1].Format('yyyy-MM-dd hh:mm:ss') : '';
        }
      }
      return params;
    },
    request() {
      const self = this;
      self.selection = [];
      self.agTableConfig.agLoading = true;
      const params = this.requestParams();
      this.service.orderCenter.ReturnStorageList(params).then(res => {
        // if (res.data.code === 1) {
        self.agTableConfig.agLoading = false;
        const data = res.data.data || {};
        self.agTableConfig.rowData = data.queryResult || [];
        self.agTableConfig.pagenation.total = data.totalSize;
        self.$refs.agGridChild.agGridTable(self.agTableConfig.columnDefs, self.agTableConfig.rowData);
        // }
      });
    },
    // 单击某二行时触发
    onRowDblclick(row) {
      this.$store.commit('customize/TabHref', {
        id: row.ID,
        type: 'action',
        name: 'returnTreasuryAdd',
        // label: "退货入库详情",
        label: window.vmI18n.t('panel_label.returnTreasuryDetails'),
        query: Object.assign({
          id: row.ID, // 单据id
          // tabTitle: "退货入库详情",
          tabTitle: window.vmI18n.t('panel_label.returnTreasuryDetails'),
          statusName: row.INVALIDSTATE
        })
      });
    },
    // 分页change 事件
    pageChange(val) {
      this.agTableConfig.pagenation.current = val;
      this.request();
    },
    // 切换分页条数
    pageSizeChange(val) {
      this.agTableConfig.pagenation.pageSize = val;
      this.request();
    },
    exportClick() {
      const self = this;
      self.selection = self.$refs.agGridChild.AGTABLE.getSelect();
      if (self.selection.length) {
        // if (this.isExport) return this.$Message.error("有一项导出正在进行中");
        if (this.isExport) {
          this.$Message.error(window.vmI18n.t('modalTips.f8'));
          return;
        }
        this.isExport = true;
        const ids = [];
        for (let i = 0; i < self.selection.length; i++) {
          ids.push(self.selection[i].ID);
        }
        const fromdata = new FormData();
        const idList = { idList: ids };
        fromdata.append('param', JSON.stringify(idList));
        this.service.orderCenter.exportOcBRefundIn(idList).then(res => {
          self.isExport = false;
          if (res.data.code == 0 && res.data.data !== null) {
            // let mes = res.data.message || "导出成功！";
            const mes = res.data.message || window.vmI18n.t('modalTips.z2');
            self.$Message.success(mes);
            self.downloadUrlFile(res.data.data);
            // return (window.location = res.data.data);
          } else {
            // let err = res.data.message || "失败！";
            const err = res.data.message || window.vmI18n.t('modalTips.z3');
            self.$Message.error(err);
          }
        });
      } else {
        if (self.tableConfig.data.length === 0) {
          // return self.$Message.error("列表没有数据,无法导出!");
          self.$Message.error(window.vmI18n.t('modalTips.z4'));
          return;
        }
        self.warningModal = true;
      }
    },
    // 导出
    downloadUrlFile(src) {
      const downloadFile = {};
      if (typeof downloadFile.iframe === 'undefined') {
        const iframe = document.createElement('iframe');
        downloadFile.iframe = iframe;
        document.body.appendChild(downloadFile.iframe);
      }
      downloadFile.iframe.src = src;
      downloadFile.iframe.style.display = 'none';
    },
    // 警告框确认
    warningOk() {
      const self = this;
      // if (this.isExport) return this.$Message.error("有一项导出正在进行中");
      if (this.isExport) {
        this.$Message.error(window.vmI18n.t('modalTips.f8'));
        return;
      }
      this.isExport = true;
      const arr = this.requestParams();
      arr.pageSize = 999999;
      const params = JSON.parse(JSON.stringify(arr));
      this.service.orderCenter.exportOcBRefundIn(params).then(res => {
        self.isExport = false;
        if (res.data.code == 0 && res.data.data !== null) {
          // let mes = res.data.message || "导出成功！";
          const mes = res.data.message || window.vmI18n.t('modalTips.z2');
          self.$Message.success(mes);
          // return (window.location = res.data.data);
          self.downloadUrlFile(res.data.data);
        } else {
          // let err = res.data.message || "失败！";
          const err = res.data.message || window.vmI18n.t('modalTips.z3');
          self.$Message.error(err);
        }
      });
    }
  }
};

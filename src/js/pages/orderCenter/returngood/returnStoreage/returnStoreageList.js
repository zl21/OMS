import { OmsButton, OmsForm, OmsDialog, OmsAgTable as aTable, OmsTable } from 'burgeonComponents'
import strUtil from '@/assets/js/__utils__/util';
import buttonPermissionsMixin from '@/assets/js/mixins/buttonPermissions';
import isFavoriteMixin from '@/assets/js/mixins/isFavorite';
import publicMethodsUtil from '@/assets/js/public/publicMethods';
import BtnConfig from 'burgeonConfig/config/funBtn.config';
import commonUtils from 'burgeonConfig/config/commonUtils';

const getCurrentTime = (() => {
  return $utils.Format(new Date(),'yyyy-MM-dd 23:59:59');
})();
const addSevenDay = (() => {
  const t = $utils.addDays(new Date(), -7);
  return $utils.Format(t,'yyyy-MM-dd 00:00:00');
})();

export default {
  components: {
    OmsButton,
    OmsForm,
    OmsTable,
    OmsDialog,
    aTable,
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
      vmI18n: $i18n,
      isFavorite: false,
      // 公共弹框
      publicBouncedConfig: {},
      // 弹框配置 导入
      importTable: {
        refFuns: 'confirmFun',
        // confirmTitle: "导入",
        confirmTitle: $i18n.t('modalTitle.import'),
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
      btnConfig: BtnConfig.config(),
      formConfig: {
        flodClickMsg: 'a',
        formData: [],
        formValue: {},
        flodClick: () => { }
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
          },
          SOURCE_CODE: param => {
            const self = this;
            const resDom = document.createElement('a');
            resDom.style['text-decoration'] = 'underline';
            resDom.innerHTML = param.data.SOURCE_CODE;
            resDom.onclick = function () {
              console.log(self);
              const formdata = new FormData();
              formdata.append('param', JSON.stringify({ sourceCode: param.data.SOURCE_CODE }));
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
            return resDom;
          }
        },
        tableHeight: '560px',
        pagenation: $omsUtils.pageConfig
      },
      selection: [],
      searchObj: {},
      warningModal: false,
      isShowFromLoading: false,
      isExport: false
    };
  },
  mounted() {
    BtnConfig.target = this;
    console.log(this.btnConfig);
    this.$nextTick(() => {
      this.getPermissions('btnConfig', 'returnStoreageList');
    });
    this.getHeaderList();
  },
  activated() {
    this.agTableConfig.pagenation.current = 1;
    // 计算高度 通过设置节点 'totalHeight'
    $omsUtils.setTableHeight(this, 65);
    // 检测屏幕变化 设置高度 重新渲染agTabe
    $omsUtils.onresizes(this, 0);
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
              // item.tabth.name === '创建时间'
              _this.formConfig.formValue[item.tabth.colname] = item.tabth.colname === "CREATETIME" ? [addSevenDay, getCurrentTime] : [];
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
                width: '6',
                // width: item.tabth.name == '备注' ? '12' : '6', // 所占的宽度 (宽度分为24份,数值代表所占份数的宽度)
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
                  _this.getList();
                }, // 表单回车事件
                iconclick: () => { } // 点击icon图标事件
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
                selectChange: () => { }, // 选中事件，默认返回选中的值
                clearSelect: e => {
                  let funArr = ['RETURN_STATUS', 'IS_ADD', 'IS_TOAG', 'IS_TOWMS', 'BILL_TYPE', 'IS_EXAMINE', 'IS_TODRP', 'IS_TRANSFER'];
                  if (funArr.includes(e)) {
                    _this.formConfig.formValue[e] = '';
                  }
                }, // 点击清空按钮回调
                options: commonUtils.converSelect(item.tabth.combobox)
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
          _this.getList();
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
    parentClass() {
      return '';
    },
    find() {
      this.agTableConfig.pagenation.current = 1;
      this.getList();
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
        console.log(CREATETIME[0]);
        if (CREATETIME[0] !== '') {
          params.beginDate = CREATETIME[0] ? $utils.Format(CREATETIME[0],'yyyy-MM-dd hh:mm:ss') : '';
        }
        if (CREATETIME[1] !== '') {
          params.endDate = CREATETIME[1] ? $utils.Format(CREATETIME[1],'yyyy-MM-dd hh:mm:ss')  : '';
        }
      }
      return params;
    },
    getList() {
      const self = this;
      // const {customizedModuleName}=this.$router.currentRoute.params;
      self.selection = [];
      self.agTableConfig.agLoading = true;
      // this.$R3loading.show(customizedModuleName);
      const params = this.requestParams();
      this.service.orderCenter.ReturnStorageList(params).then(res => {
        // if (res.data.code === 1) {
        self.agTableConfig.agLoading = false;
        // this.$R3loading.hide(customizedModuleName);
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
        label: $i18n.t('panel_label.returnTreasuryDetails'),
        query: Object.assign({
          id: row.ID, // 单据id
          // tabTitle: "退货入库详情",
          tabTitle: $i18n.t('panel_label.returnTreasuryDetails'),
          statusName: row.INVALIDSTATE
        })
      });
    },
    // 分页change 事件
    pageChange(val) {
      this.agTableConfig.pagenation.current = val;
      this.getList();
    },
    // 切换分页条数
    pageSizeChange(val) {
      this.agTableConfig.pagenation.pageSize = val;
      this.getList();
    },
    exportClick() {
      const self = this;
      if (!self.vueAgTable) {
        self.selection = self.$refs.agGridChild.AGTABLE.getSelect();
      }
      console.log(self.selection);
      if (self.selection.length) {
        // if (this.isExport) return this.$Message.error("有一项导出正在进行中");
        if (this.isExport) {
          this.$Message.error($i18n.t('modalTips.f8'));
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
            const mes = res.data.message || $i18n.t('modalTips.z2');
            self.$Message.success(mes);
            publicMethodsUtil.downloadUrlFile(res.data.data);
          } else {
            const err = res.data.message || $i18n.t('modalTips.z3');
            self.$Message.error(err);
          }
        });
      } else {
        if (self.agTableConfig.rowData.length === 0) {
          self.$Message.error($i18n.t('modalTips.z4'));
          return;
        }
        self.warningModal = true;
      }
    },
    // 警告框确认
    warningOk() {
      const self = this;
      // if (this.isExport) return this.$Message.error("有一项导出正在进行中");
      if (this.isExport) {
        this.$Message.error($i18n.t('modalTips.f8'));
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
          const mes = res.data.message || $i18n.t('modalTips.z2');
          self.$Message.success(mes);
          // return (window.location = res.data.data);
          publicMethodsUtil.downloadUrlFile(res.data.data);
        } else {
          // let err = res.data.message || "失败！";
          const err = res.data.message || $i18n.t('modalTips.z3');
          self.$Message.error(err);
        }
      });
    }
  }
};

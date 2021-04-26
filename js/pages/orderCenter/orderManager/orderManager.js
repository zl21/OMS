import businessButton from 'professionalComponents/businessButton';
import businessLabel from 'professionalComponents/businessLabel';
import businessForm from 'professionalComponents/businessForm';
import businessDialog from 'professionalComponents/businessDialog';
import buttonPermissionsMixin from '@/assets/js/mixins/buttonPermissions';
import isFavoriteMixin from '@/assets/js/mixins/isFavorite';
import dataAccessMixin from '@/assets/js/mixins/dataAccess';
import aTable from 'professionalComponents/agGridTable';
import unzipXv from '@/assets/js/dataToSmall';
import BurgeonDate from '@/assets/js/__utils__/date';
import labelListConfig from './publicConfig/labelList';
import BtnConfig from 'burgeonConfig/config/funBtn.config';
import BurgeonValidate from 'burgeonConfig/config/validate.config';
import loading from 'professionalComponents/loading';
import commonUtils from 'burgeonConfig/config/commonUtils';
import BurgeonEvent from 'burgeonConfig/config/event.config';
// import WarningModal from 'burgeonConfig/config/warning.modal.config'

export default {
  components: {
    businessButton,
    businessForm,
    businessLabel,
    businessDialog,
    aTable,
    loading
  },
  mixins: [isFavoriteMixin, buttonPermissionsMixin, dataAccessMixin],
  watch: {
    publicBouncedConfig(newvalue) {
      this.publicBouncedIndex = newvalue;
    },
    customizedModuleName() {
      return this.$router.currentRoute.params.customizedModuleName;
    },
  },
  data() {
    return {
      vmI18n: window.vmI18n,
      isActive: false,
      agTableConfig: {
        tableHeight: '480px',
        agLoading: false,
        columnDefs: [],
        rowData: [],
        renderArr: {
          EXPRESSCODE: (params) => {
            // render渲染的执行方法
            const resultElement = document.createElement('span');
            resultElement.innerText = params.value;
            resultElement.style.color = '#36A2EB';
            resultElement.style.cursor = 'pointer';
            resultElement.onclick = () => {
              const iTop = (window.screen.availHeight - 30 - 800) / 2;
              const iLeft = (window.screen.availWidth - 10 - 1200) / 2;
              window.open(
                `http://www.kuaidi100.com/chaxun?com=${params.data.PY_SHORT_NAME}&nu=${params.data.EXPRESSCODE}`,
                '',
                `height=800, width=1200 , top=${iTop} , left=${iLeft}`
              );
            };
            return resultElement;
          },
          ORDER_TAG: (params) => {
            const resultElement = document.createElement('div');
            params.data.ORDERTAGLIST.forEach((item) => {
              const tag = document.createElement('span');
              tag.innerText = item.text;
              tag.style.color = item.clr;
              tag.style.border = `1px solid${item.clr}`;
              tag.style.margin = '0 2px';
              tag.style.borderRadius = '6px';
              tag.style.padding = '2px';
              resultElement.appendChild(tag);
            });
            return resultElement;
          },
          PAY_TIME: (params) => BurgeonDate.standardTimeConversiondateToStr(params.data.PAY_TIME), // 付款时间
          AUDIT_TIME: (params) => BurgeonDate.standardTimeConversiondateToStr(params.data.AUDIT_TIME), // 审核时间
          DISTRIBUTION_TIME: (params) => BurgeonDate.standardTimeConversiondateToStr(params.data.AUDIT_TIME), // 配货时间
          CREATIONDATE: (params) => BurgeonDate.standardTimeConversiondateToStr(params.data.CREATIONDATE), // 创建时间
          HOLD_RELEASE_TIME: (params) => BurgeonDate.standardTimeConversiondateToStr(params.data.HOLD_RELEASE_TIME), // HOLD单释放时间
          SCAN_TIME: (params) => BurgeonDate.standardTimeConversiondateToStr(params.data.SCAN_TIME), // 出库时间
          ORDER_FLAG: () => { },
        },
        pagenation: this.$comUtils.pageConfig,
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
        basePathName: 'business-components',
        url: 'importTable',
        keepAlive: true,
        excludeString: 'importTable', // 将name传进去，确认不缓存
        componentData: {},
      },
      warningModal: false, // 警告弹框
      distributeLogisticsModal: false, // 警告弹框
      distributeWarehouseModal: false, // 警告弹框
      batchReturnOrderModal: false, // 警告弹框
      eventGather: BurgeonEvent,
      // 清除高级搜索中的数据
      clearFromListValue: false,
      // 状态json
      statusData: {
        label: window.vmI18n.t('common.toBeReviewed'), // 全部
        value: '1',
        isShow: true,
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
        name: 'testModal',
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
          list: [], // 选项
        },
      ],
      selectValue: [],
      // 表单搜索
      btnsSearch: {
        typeAll: 'default', // 按钮统一风格样式
        buttons: [
          {
            text: window.vmI18n.t('btn.empty'), // 按钮文本
            btnclick: () => {
              const _this = this;
              _this.clearFromListValue = true;
              _this.queryInfoData = [];
              _this.labelData = [];
              _this.getHeaderList();
            }, // 按钮点击事件
          },
          {
            text: window.vmI18n.t('btn.search'), // 按钮文本
            btnclick: () => {
              this.loadData();
            }, // 按钮点击事件
          },
        ],
      },
      btnConfig: BtnConfig.config(),
      batchReturnFormConfig: {
        formValue: {
          IS_BACK: false,
        },
        formData: [
          {
            style: 'checkbox', // 勾选框类型
            label: window.vmI18n.t('form_label.whether_returned'), // 前面的文字
            value: 'IS_BACK', // 输入框的值
            width: '6', // 所占的宽度
            checked: false, // 是否勾选控制
          },
        ],
      },
      // 高级搜索表单
      formConfig: {
        formValue: {},
        formData: [],
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
        platformDelivery: 6, // 平台发货
      },
      formValObj: {},
      isExport: false,
    };
  },
  activated() {
    // 获取默认数据
    const _self = this;
    _self.agTableConfig.pagenation.current = 1;
    // 检测屏幕变化 设置高度 重新渲染agTabe
    this.$comUtils.onresizes(_self, 40);
  },
  mounted() {
    // 获取普通搜索的标签数据
    // this.getSearchData();
    // 获取from数据
    // this.getFromData();
    BtnConfig.target = this;
    BurgeonEvent.target = this;
    // WarningModal.target=this;
    const _this = this;
    _this.getHeaderList();
    _this.$nextTick(() => {
      _this.getPermissions('btnConfig', 'orderManager');
    });
    // 计算高度 通过设置节点 'totalHeight'
    this.$comUtils.setTableHeight(_this, 80);
  },
  methods: {

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
          value2: '',
        },
        BILL_NO: '',
        USER_NICK: '',
        ORDER_AMT: {
          value1: '',
          value2: '',
        },
        PS_C_PRO_ECODE: '', // 商品款号
        IS_EXCHANGE_NO_IN: ['0'],
      };
      const fromdata = new FormData();
      const params = {
        table: 'OC_B_ORDER',
        column_include_uicontroller: true,
        fixedcolumns: {},
        multiple: [],
        startindex: 0,
      };
      fromdata.append('param', JSON.stringify(params));
      _this.agTableConfig.agLoading = true;
      _this.service.orderCenter.getSeniorQueryCondition(fromdata).then((res) => {
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
                inputenter: ()=> self.eventGather.inputenter('loadData'),
                iconclick: () => { }, // 点击icon图标事件
                clearable: true,
              };
              _this.formConfig.formValue[item.tabth.colname] = [];
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
                  valuedata: '', // 这个是选择的值
                },
              };
              if (item.tabth.precolnameslist) {
                formData[index].itemdata.precolnameslist = item.tabth
                  .precolnameslist
                  ? item.tabth.precolnameslist
                  : [];
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
                inputenter: ()=> self.eventGather.inputenter('loadData'),
                iconclick: () => { }, // 点击icon图标事件
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
                regx: BurgeonValidate.determineTheRegular(item.tabth.colname),
                width: '6', // 所占的宽度 (宽度分为24份,数值代表所占份数的宽度)
                icon: '', // 输入框后带的图标,暂只有输入框支持
                placeholder: '', // 占位文本，默认为请输入
                ghost: false, // 是否关闭幽灵按钮，默认开启
                inputenter: ()=> self.eventGather.inputenter('loadData'),
                iconclick: () => { }, // 点击icon图标事件
              };
              _this.formConfig.formValue[item.tabth.colname] = {
                value1: '', // 第一个数字框绑定的值
                value2: '', // 第二个数字框绑定的值
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
                options: commonUtils.converSelect(item.tabth.combobox),
              };
              _this.formConfig.formValue[item.tabth.colname] = [];
              if (item.tabth.colname === 'IS_EXCHANGE_NO_IN')
                _this.formConfig.formValue[item.tabth.colname] = ['0'];
            }
          });
          _this.formConfig.formData = formData;
          const arr = [];
          res.data.data.tableHeader.forEach((item) => {
            const obj = {};
            obj.headerName = item.title;
            obj.field = item.key;
            arr.push(obj);
          });
          _this.agTableConfig.columnDefs = arr;

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
                  clearable: true,
                }, // 组件属性
                list: item.list, // 选项
                value: '', // 选中值
                noClearSearchValue: true, // 查询后是否清除输入框内的值,默认false-清除,true:不清除
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
                    row: [],
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
                    'WMS_WAREHOUSE_CODE',
                  ],
                }, // 组件属性
                componentEvent: {
                  'on-popper-show': () => {
                    const self = this;
                    const params = {
                      isdroplistsearch: true,
                      refcolid: item.selectTab.tabth.colid,
                      fixedcolumns: {},
                      startindex: 0,
                      range: 10,
                      precolnameslist: item.selectTab.tabth.precolnameslist,
                    };
                    const data = new URLSearchParams();
                    data.append('searchdata', JSON.stringify(params));
                    self.service.orderCenter
                      .QueryList(data)
                      // self.$network
                      //   .post('/p/cs/QueryList', data)
                      .then((res) => {
                        dropList[index].componentAttribute.data =
                          res.data.datas;
                        dropList[index].componentAttribute.totalRowCount =
                          res.data.datas.totalRowCount;
                      });
                  },
                  'on-page-change': (e) => {
                    const self = this;
                    const params = {
                      isdroplistsearch: true,
                      refcolid: item.selectTab.tabth.colid,
                      fixedcolumns: {},
                      startindex: (e - 1) * 10,
                      range: 10,
                      precolnameslist: item.selectTab.tabth.precolnameslist,
                    };
                    const data = new URLSearchParams();
                    data.append('searchdata', JSON.stringify(params));
                    self.service.orderCenter
                      .QueryList(data)
                      // self.$network
                      //   .post('/p/cs/QueryList', data)
                      .then((res) => {
                        dropList[index].componentAttribute.data =
                          res.data.datas;
                        dropList[index].componentAttribute.totalRowCount =
                          res.data.datas.totalRowCount;
                      });
                  },
                  'on-input-value-change': async (e) => {
                    const formdata = new FormData();
                    formdata.append('ak', e.trim());
                    // formdata.append('colid', colid);
                    formdata.append('colid', item.selectTab.tabth.colid);
                    formdata.append('fixedcolumns', JSON.stringify({}));
                    const res = await this.service.common.fuzzyquerybyak(
                      formdata
                    );
                    if (res.data.code == 0) {
                      this.dropList.filter(
                        (key) => key.label == item.displayName
                      )[0].componentAttribute.AutoData = res.data.data;
                    } else {
                      this.dropList.filter(
                        (key) => key.label == key.displayName
                      )[0].componentAttribute.AutoData = [];
                    }
                  },
                  // 集合搜索的下拉多选组件清空后,去除上次选中的数据
                  'on-clear': (e) => {
                    console.log('on-clear:', e);
                    e.modelValue = [];
                    this.$refs.integrateSearchFilter.dropDownSelectFilterSelectedValue = [];
                    this.dropList.forEach((item) => {
                      if (item.type === 'DropDownSelectFilter') {
                        item.selectedList = [];
                        item.value = '';
                      }
                    });
                  },
                },
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
                      value: _this.$comUtils.getCurrentTime(), // ["2018-09-07 09:09:09","2018-09-07 09:09:10"]
                      isEmitOnChange: true,
                    }
                    : {}, // 组件属性
                componentEvent: {
                  'on-enter': () => {
                    setTimeout(() => {
                      _this.searchMethod();
                    }, 100);
                  },
                }, // 组件事件
                list: item.list, // 选项
                value: '', // 选中值
              };
            }
            if (item.queryName === 'PAY_TIME') {
              dropList[index].value = _this.$comUtils.getCurrentTime().join('~');
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
              trigger: 'click',
            };
          });
          _this.tagList[0].list = tagList;
          this.searchMethod();

          _this.setSearchOption();
        } else {
        }
        _this.agTableConfig.agLoading = false;
      });
    },

    // 设置普通搜索默认选项
    setSearchOption() {
      // TODO 调试了下貌似没用到这个方法 暂注释
      setTimeout(() => {
        let slideBox = document.getElementById('IntegrateSearchFilter');
        if (slideBox) {
          setTimeout(() => {
            let pageUl = document.querySelector('.from .ark-dropdown-menu').childNodes[0];
            pageUl.click();
          }, 200);
        }
      }, 100);
    },


    // 检索项方法
    searchMethod() {
      // 取的标签值
      let label = [];
      const queryInfo = [];
      if (this.isShowSeniorOrOrdinary) {
        // 只有高级搜索时queryInfo条件才有效
        this.selectValue.forEach((item, index) => {
          if (item.column === 'tag') {
            label = item.selectedList;
          } else {
            let listType = ['Select', 'DropDownSelectFilter'].includes(item.type) ? 'selectedList' : 'list';
            let queryVal = ['Select', 'DropDownSelectFilter', 'DatePicker'].includes(item.type) ? item.value : item.value.replace(/(^\s*)|(\s*$)/g, '');
            queryInfo[index] = {
              type: (item.type === 'DatePicker') ? 'date' : item.type,
              displayName: item.label,
              queryName: item.column,
              value: queryVal,
              list: item[listType]
            };
          }
        });
      }
      const labelData = [];
      label.forEach((item) =>
        labelData.push({
          val: item.value,
          text: item.label,
          sort: item.sort,
          key: item.key,
        }))
      this.queryInfoData = commonUtils.notempty(queryInfo);
      this.labelData = commonUtils.notempty(labelData);

      this.agTableConfig.pagenation.current = 1;
      this.getData();
    },

    loadData() {
      let arr = [];
      this.formConfig.formData.forEach((item, index) => {
        if (item.style === 'popInput') {
          arr[index] = {
            type: 'Select',
            queryName: item.itemdata.colname,
            value: item.itemdata.pid ?? '',
          };
        }
      });
      let keyArr = [];
      for (let key in this.formConfig.formValue) {
        keyArr = this.formConfig.formData.map((item) => {
          if (item.style !== 'popInput' && key === item.value) {
            let obj = {};
            switch (item.style) {
              case 'date':
                obj = {
                  type: item.style,
                  value: this.$comUtils.getTimesValue(this.formConfig.formValue[key])
                }
                break;
              case 'input':
              case 'bothInput':
                let val = (item.style == 'input') ? this.formConfig.formValue[key] : `${this.formConfig.formValue[key].value1.replace(/(^\s*)|(\s*$)/g, '')}~${this.formConfig.formValue[key].value2.replace(/(^\s*)|(\s*$)/g, '')}`;
                obj = {
                  type: 'Input',
                  value: val,
                }
                break;
              case 'select':
                obj = {
                  type: 'Select',
                  value: this.formConfig.formValue[key].join(',') === 'bSelect-all' ? '' : this.formConfig.formValue[key].join(',')
                }
                break;
            }
            return Object.assign(obj, { queryName: item.value })
          }
        });
      }
      const highSearchData = [...commonUtils.notempty(arr), ...keyArr];
      this.highSearchData = commonUtils.notempty(highSearchData);
      this.agTableConfig.pagenation.current = 1;
      this.getData();
    },

    //  获取页面数据
    getData() {
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
          pageNum: self.agTableConfig.pagenation.current,
        },
        label: self.labelData, // 标签
        queryInfo: self.queryInfoData, // 普通搜索
        status: self.statusData,
        highSearch: self.highSearchData,
        sort: self.sort,
      };
      // 零售发货单列表tab 区分审核失败/多次缺货类型订单查询
      // '审核失败'
      if (self.statusData.label == window.vmI18n.t('other.auditError')) {
        param.status = { label: '待审核', value: '1', isShow: true };
        param.lackstockOrAudit = self.statusData.value;
        // '多次缺货'
      } else if (self.statusData.label == window.vmI18n.t('other.multipleOutOfStock')) {
        param.lackstockOrAudit = self.statusData.value;
        param.status = { label: '缺货', value: '2', isShow: true };
      }

      const fromdata = new FormData();
      fromdata.append('param', JSON.stringify(param));
      self.service.orderCenter.getOrderList(fromdata).then((res) => {
        // 当loading结束，页面滚动
        document.getElementById('content').style.overflow = 'auto';
        document.getElementById('content').style.position = 'relative';
        self.isActive = false;
        if (!res.data.data) {
          self.$refs.agGridChild.AGTABLE.cleanRows(); // 清空表格数据
          // 初始化表格
          self.agTableConfig.pagenation.goodsSum = 0;
          self.agTableConfig.pagenation.total = 0;
          self.$refs.agGridChild.agGridTable(self.agTableConfig.columnDefs, []);
          this.tipShow('warning', self, res);
          return;
        }
        res.data.data = JSON.parse(unzipXv(res.data.data));
        if (res.data.code === 0) {
          if (!res.data.data) {
            self.agTableConfig.pagenation.total = 0;
            self.$refs.agGridChild.AGTABLE.cleanRows(); // 清空表格数据
          } else {
            const queryOrderResultList = res.data.data.queryOrderResultList;
            self.agTableConfig.pagenation.total = res.data.data.totalSize;
            self.agTableConfig.rowData = queryOrderResultList;
            self.agTableConfig.rowData.forEach((item) => {
              item.isColorGray = [7, 8].includes(item.ORDER_STATUS);
            });
            // 统计商品总数
            self.agTableConfig.pagenation.goodsSum = queryOrderResultList.reduce((sum, item) => sum + Number(item.QTY_ALL || 0), 0);
            self.$refs.agGridChild.agGridTable(self.agTableConfig.columnDefs, self.agTableConfig.rowData);
          }
        } else {
          self.$refs.agGridChild.AGTABLE.cleanRows(); // 清空表格数据
          this.tipShow('warning', self, res);
        }
      }).finally(() => {
        this.agTableConfig.agLoading = false;
      });
    },
  },
};

import businessButton from 'professionalComponents/businessButton';
import businessForm from 'professionalComponents/businessForm';
import businessLabel from 'professionalComponents/businessLabel';
import businessActionTable from 'professionalComponents/businessActionTable';
import businessDialog from 'professionalComponents/businessDialog';
import { isFavoriteMixin } from '@/assets/js/mixins/isFavorite';
import publicMethodsUtil from '@/assets/js/public/publicMethods';
import { customPagingMixins } from '@/assets/js/mixins/customPaging';
import { buttonPermissionsMixin } from '@/assets/js/mixins/buttonPermissions';

export default {
  components: {
    businessButton,
    businessForm,
    businessActionTable,
    businessLabel,
    businessDialog
  },
  mixins: [isFavoriteMixin, customPagingMixins, buttonPermissionsMixin],
  data() {
    return {
      allTableArr: [],
      selectArr: [],
      warningModal: false, // 警告弹框
      btnConfig: {
        typeAll: 'error', // 按钮统一风格样式
        buttons: [
          {
            webname: 'lookup_kucuntongbuduilie', // 查找
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              this.find();
            } // 按钮点击事件
          },
          {
            icon: 'iconfont iconbj_col', // 按钮图标
            size: 'small', // 按钮大小
            name: '收藏',
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              const _this = this;
              _this.setFavorite();
            } // 按钮点击事件
          }
        ]
      }, // 按钮数据
      formConfig: {
        formData: [
          {
            style: 'date',
            type: 'datetimerange',
            label: '创建日期',
            width: '6',
            value: 'CREATIONDATE',
            format: 'yyyy-MM-dd HH:mm:ss', // 格式参照burgeonui
            placeholder: '',
            clearable: '' // 是否显示清空按钮,默认为true   false
          },
          {
            style: 'input', // 文本录入
            label: '批次编号',
            value: 'BATCHNO',
            width: '6'
          },
          {
            style: 'input', // 来源单号
            label: '来源单号',
            value: 'SOURCE_NO',
            width: '6'
          },
          {
            style: 'input', // 文本录入
            label: '卖家昵称',
            value: 'SELLER_NICK',
            width: '6'
          },
          {
            style: 'select', // 下拉框类型
            label: '平台类型', // 下拉框前的值
            width: '6', // 所占宽度宽度
            value: 'CP_C_PLATFORM_ID', // 输入框的值
            multiple: true,
            options: [
              {
                label: '未审核',
                value: '1'
              },
              {
                label: '已客审',
                value: '2'
              },
              {
                label: '已财审',
                value: '3'
              },
              {
                label: '已作废',
                value: '4'
              }
            ]
          },
          {
            style: 'input',
            label: '平台商品ID',
            value: 'NUMIID',
            width: '6'
          },
          {
            style: 'input',
            label: '平台条码ID',
            value: 'SKU_ID',
            width: '6'
          },
          {
            style: 'select', // 下拉框类型
            label: '是否错误', // 下拉框前的值
            width: '6', // 所占宽度宽度
            value: 'IS_ERROR', // 输入框的值
            multiple: true,
            options: [
              {
                label: '未审核',
                value: '1'
              },
              {
                label: '已客审',
                value: '2'
              },
              {
                label: '已财审',
                value: '3'
              },
              {
                label: '已作废',
                value: '4'
              }
            ]
          },
          {
            style: 'select', // 下拉框类型
            label: '同步状态', // 下拉框前的值
            width: '6', // 所占宽度宽度
            value: 'SYN_STATUS', // 输入框的值
            multiple: true,
            options: [
              {
                label: '未审核',
                value: '1'
              },
              {
                label: '已客审',
                value: '2'
              },
              {
                label: '已财审',
                value: '3'
              },
              {
                label: '已作废',
                value: '4'
              }
            ]
          },
          {
            style: 'input',
            label: '同步库存数',
            value: 'QTY_STORAGE',
            width: '6'
          },
          // {
          //   style: "popInput", //输入框弹框单多选
          //   width: "6",
          //   itemdata: {
          //     col: 1,
          //     colid: 174380,
          //     colname: "PS_C_SKU_ID", //当前字段的名称
          //     datelimit: "all",
          //     display: "text", //显示什么类型，例如xml表示弹窗多选加导入功能，mrp表示下拉多选
          //     fkdisplay: "drp", //外键关联类型
          //     fkdesc: "条码ID",
          //     inputname: "ECODE", //这个是做中文类型的模糊查询字段，例如ENAME
          //     isfk: true, //是否有fk键
          //     isnotnull: false, //是否必填
          //     isuppercase: false, //是否转大写
          //     length: 65535, //最大长度是多少
          //     name: "条码ID", //input前面显示的lable值
          //     readonly: false, //是否可编辑，对应input   readonly属性
          //     reftable: "PS_C_SKU", //对应的表
          //     row: 1,
          //     statsize: -1,
          //     type: "STRING", //这个是后台用的
          //     valuedata: "", //这个是选择的值
          //     pid: ""
          //   },
          //   oneObj: val => {
          //     this.formConfig.formValue.PS_C_SKU_ID = val.pid;
          //     this.formConfig.formValue.PS_C_SKU_ECODE = val.valuedata;
          //   }
          // },
          {
            style: 'input',
            label: '条码编码',
            value: 'PS_C_SKU_ECODE',
            width: '6'
          },
          {
            style: 'popInput', // 输入框弹框单多选
            width: '6',
            itemdata: {
              col: 1,
              colid: 174382,
              colname: 'CP_C_SHOP_ID', // 当前字段的名称
              datelimit: 'all',
              display: 'text', // 显示什么类型，例如xml表示弹窗多选加导入功能，mrp表示下拉多选
              fkdisplay: 'mrp', // 外键关联类型
              fkdesc: '店铺ID',
              inputname: 'ENAME', // 这个是做中文类型的模糊查询字段，例如ENAME
              isfk: true, // 是否有fk键
              isnotnull: false, // 是否必填
              isuppercase: false, // 是否转大写
              length: 65535, // 最大长度是多少
              name: '店铺ID', // input前面显示的lable值
              readonly: false, // 是否可编辑，对应input   readonly属性
              reftable: 'CP_C_SHOP', // 对应的表
              row: 1,
              statsize: -1,
              type: 'STRING', // 这个是后台用的
              valuedata: '', // 这个是选择的值
              pid: ''
            },
            oneObj: val => {
              this.formConfig.formValue.CP_C_SHOP_ID = val.pid;
            }
          },
          {
            style: 'input', // 文本录入
            label: '店铺名称',
            value: 'CP_C_SHOP_TITLE',
            width: '6'
          },
          {
            style: 'input', // 文本录入
            label: '国标码',
            value: 'GBCODE',
            width: '6'
          }
        ],
        formValue: {},
        ruleValidate: {
          NUMIID: [{ required: true, message: ' ' }],
          CREATIONDATE: [{ required: true, message: ' ' }]
        },
        flodClick: () => {
          setTimeout(() => {
            this.setTableHeight();
          }, 10);
        }
      }, // form表单
      labelList: [
        {
          label: '全部',
          value: '1',
          isShow: true
        }
      ], // tab切换
      labelDefaultValue: '1',
      jordanTableConfig: {
        columns: [
          {
            title: '批次编号',
            key: 'BATCHNO'
          },
          {
            title: '卖家昵称',
            key: 'SELLER_NICK'
          },
          {
            title: '平台商品ID',
            key: 'NUMIID'
          },
          {
            title: '是否错误',
            key: 'IS_ERROR'
          },
          {
            title: '返回信息',
            key: 'ERROR_MSG'
          },
          {
            title: '同步状态',
            key: 'SYN_STATUS_NAME'
          },
          {
            title: '同步库存数',
            key: 'QTY_STORAGE'
          },
          {
            title: '计算虚高库存前库存',
            key: 'QTY_STORAGE_REALY'
          },
          {
            title: '来源单号',
            key: 'SOURCE_NO'
          },
          {
            title: '平台条码ID',
            key: 'SKU_ID'
          },
          {
            title: '条码编码',
            key: 'PS_C_SKU_ECODE'
          },
          {
            title: '店铺名称',
            key: 'CP_C_SHOP_TITLE'
          },
          {
            title: '创建时间',
            key: 'CREATIONDATE'
          },
          {
            title: '国标码',
            key: 'GBCODE'
          },
          {
            title: '扩展属性',
            key: 'PROPERTIES'
          }
        ], // 表头
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
        pageSizeOpts: [20, 50, 80, 100], // 每页条数切换的配置
        pageSize: 50, // 每页条数
        data: [] // 数据配置
      }, // 列表数据
      returnSelectData: [], // 列表选中数据
      isShowFromLoading: false,
      statusTab: '' // 单据类型
    };
  },
  // activated() {
  //   // 获取默认数据
  //   this.jordanTableConfig.current = 1;
  //   this.getList();
  // },
  created() {
    const self = this;
    self.getSelectData();
  },
  mounted() {
    this.$nextTick(() => {
      this.getPermissions('btnConfig', 'sgChannelSynstockQuery');
    });
    const _this = this;
    window.addEventListener('keydown', e => {
      const key = e.keyCode;
      if (key === 13 && _this.warningModal) {
        _this.warningOk();
      } else if (key === 27) {
        _this.warningModal = false;
      }
    });
    // this.getList();
    const today = new Date();
    const preDay = today.addDays(today, -1);
    this.formConfig.formValue.CREATIONDATE = [preDay, today];
    this.setTableHeight();
  },
  methods: {
    // 填充下拉选项框
    async getSelectData() {
      const self = this;
      const platformType = await this.getColOption('SG_B_CHANNEL_SYNSTOCK_Q', '基本信息', 'CP_C_PLATFORM_ID');
      const isErrorType = await this.getColOption('SG_B_CHANNEL_SYNSTOCK_Q', '基本信息', 'IS_ERROR');
      const synStatusType = await this.getColOption('SG_B_CHANNEL_SYNSTOCK_Q', '基本信息', 'SYN_STATUS');
      self.formConfig.formData.forEach(item => {
        if (item.value === 'CP_C_PLATFORM_ID') {
          item.options = platformType;
        } else if (item.value === 'IS_ERROR') {
          item.options = isErrorType;
        } else if (item.value === 'SYN_STATUS') {
          item.options = synStatusType;
        }
      });
    },
    async getColOption(tableName, parentColName, childColName) {
      const fromdata = new FormData();
      fromdata.append('table', tableName);
      fromdata.append('objid', -1);
      return new Promise(resolve => {
        let optionData = [];
        this.service.common.getObject(fromdata).then(res => {
          const selectData = res.data.data.addcolums;
          selectData.forEach(item => {
            if (item.parentdesc === parentColName) {
              const childItem = item.childs;
              childItem.forEach(item => {
                if (item.colname === childColName) {
                  optionData = item.combobox.map(subItem => ({
                    label: subItem.limitdesc,
                    value: subItem.limitval
                  }));
                }
              });
            }
          });
          resolve(optionData);
        });
      });
    },
    // 查找
    find() {
      this.jordanTableConfig.current = 1;
      this.getList();
    },
    generateAuditFromdata() {
      const ids = [];
      this.returnSelectData.forEach(item => {
        ids.push(item.ID);
      });
      const param = {
        ids
      };
      const fromdata = new FormData();
      fromdata.append('param', JSON.stringify(param));
      return fromdata;
    },
    // 获取列表数据
    getList() {
      const _this = this;
      if (_this.jordanTableConfig.loading) {
        return;
      }
      const mainData = _this.formConfig.formValue;
      if (!mainData.NUMIID) {
        _this.$Message.error('平台商品ID不能为空!');
        return;
      }
      let creationdateStart = '';
      let creationdateEnd = '';
      if (mainData.CREATIONDATE && mainData.CREATIONDATE.length > 0) {
        creationdateStart = mainData.CREATIONDATE[0];
        creationdateEnd = mainData.CREATIONDATE[1];
      }
      if (!creationdateStart || !creationdateEnd) {
        _this.$Message.error('创建日期不能为空!');
        return;
      }
      _this.jordanTableConfig.data = [];
      _this.jordanTableConfig.total = 0;
      _this.jordanTableConfig.loading = true;
      const dealForm = {
        CREATIONDATE_START: creationdateStart,
        CREATIONDATE_END: creationdateEnd,
        CP_C_PLATFORM_ID: mainData.CP_C_PLATFORM_ID && mainData.CP_C_PLATFORM_ID.includes('bSelect-all') ? '' : mainData.CP_C_PLATFORM_ID,
        IS_ERROR: mainData.IS_ERROR && mainData.IS_ERROR.includes('bSelect-all') ? '' : mainData.IS_ERROR,
        SYN_STATUS: mainData.SYN_STATUS && mainData.SYN_STATUS.includes('bSelect-all') ? '' : mainData.SYN_STATUS
      };
      const whereInfoForm = Object.assign(mainData, dealForm);
      // delete whereInfoForm["CREATIONDATE"];
      const param = {
        whereInfo: whereInfoForm,
        pageNum: _this.jordanTableConfig.current,
        pageSize: _this.jordanTableConfig.pageSize
      };
      const fromdata = new FormData();
      fromdata.append('param', JSON.stringify(param));
      this.service.inventoryCenter.getChannelSynstockQuery(fromdata).then(res => {
        _this.jordanTableConfig.loading = false;
        _this.returnSelectData = [];
        if (res.data.code === 0 && res.data.data.sgChannelStorageStockQResultList.length) {
          res.data.data.sgChannelStorageStockQResultList.forEach(item => {
            // item.ISACTIVE = item.ISACTIVE === "Y" ? "是" : "否";
            item.CREATIONDATE = item.CREATIONDATE ? publicMethodsUtil.DatesTime(item.CREATIONDATE) : '';
            // item.MODIFIEDDATE = item.MODIFIEDDATE ? publicMethodsUtil.DatesTime(item.MODIFIEDDATE) : "";
          });
          _this.jordanTableConfig.total = res.data.data.totalSize;
          _this.jordanTableConfig.data = res.data.data.sgChannelStorageStockQResultList;
        } else {
          _this.jordanTableConfig.data = [];
          _this.jordanTableConfig.total = 0;
          _this.$Message.warning({ content: res.data.message });
        }
      });
    },
    oneObjs() {},
    // 列表勾选
    returnOnSelect(e) {
      this.returnSelectData = e;
    },
    // 取消勾选
    returnCancel(e) {
      this.returnSelectData = e;
    },
    // 列表全选
    returnSelectAll(e) {
      this.returnSelectData = e;
    },
    // 取消全选
    returnSelectAllCancel(e) {
      this.returnSelectData = e;
    },
    // 分页change 事件
    pageChange(val) {
      this.selectArr = [];
      this.jordanTableConfig.current = val;
      this.getList();
    },
    // 切换分页条数
    pageSizeChange(val) {
      this.selectArr = [];
      this.jordanTableConfig.pageSize = val;
    },
    // 导入
    returnExport() {},
    // 导出
    returnImport() {},
    // 设置表格高度
    setTableHeight() {
      const _this = this;
      const contentHeight = document.getElementsByClassName('main-content')[0].clientHeight;
      let returnHeight = 25;
      returnHeight += document.getElementsByClassName('returnBtn')[0].clientHeight;
      returnHeight += document.getElementsByClassName('returnForm')[0].clientHeight;
      const tableHeight = contentHeight - returnHeight;
      _this.jordanTableConfig.height = tableHeight - 130;
    },
    // 导出
    exportClick() {
      const _this = this;
      if (_this.returnSelectData.length) {
        const ids = [];
        for (let i = 0; i < _this.returnSelectData.length; i++) {
          ids.push(_this.returnSelectData[i].ID);
        }
        const idList = { idList: ids };
        this.service.common.exportPayableAdjustment(idList).then(res => {
          if (res.data.code === 0 && res.data.data !== null) {
            const mes = res.data.message || '导出成功！';
            _this.$Message.success(mes);
            publicMethodsUtil.downloadUrlFile(res.data.data);
          } else {
            const err = res.data.message || '失败！';
            _this.$Message.error(err);
          }
        });
      } else {
        if (_this.jordanTableConfig.data.length === 0) {
          _this.$Message.error('列表没有数据,无法导出!');
          return;
        }
        if (_this.statusTab === '') {
          _this.warningModal = true;
        } else {
          _this.warningOk();
        }
      }
    },
    // 警告框确认
    warningOk() {
      const _this = this;
      const param = {
        start: _this.jordanTableConfig.current,
        count: 999999
      };
      this.service.common.exportPayableAdjustment(Object.assign(param, _this.formConfig.formValue)).then(res => {
        if (res.data.code === 0 && res.data.data !== null) {
          const mes = res.data.message || '导出成功！';
          _this.$Message.success(mes);
          publicMethodsUtil.downloadUrlFile(res.data.data);
          // return (window.location = res.data.data);
        } else {
          const err = res.data.message || '失败！';
          _this.$Message.error(err);
        }
      });
    }
  },
  destroyed() {
    window.removeEventListener('keydown', this, false);
  }
};

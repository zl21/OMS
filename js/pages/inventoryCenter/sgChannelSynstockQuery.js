import businessButton from 'professionalComponents/businessButton';
import businessForm from 'professionalComponents/businessForm';
import businessLabel from 'professionalComponents/businessLabel';
import businessActionTable from 'professionalComponents/businessActionTable';
import businessDialog from 'professionalComponents/businessDialog';
import isFavoriteMixin from '@/assets/js/mixins/isFavorite';
import publicMethodsUtil from '@/assets/js/public/publicMethods';
import customPagingMixins from '@/assets/js/mixins/customPaging';
import buttonPermissionsMixin from '@/assets/js/mixins/buttonPermissions';
import BtnConfig from 'burgeonConfig/config/funBtn.config';

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
      btnConfig: BtnConfig.config(), // 按钮数据
      formConfig: {
        formData: [
          {
            style: 'date',
            type: 'datetimerange',
            label: $i18n.t('form_label.creationDate'), // '创建日期',
            width: '6',
            value: 'CREATIONDATE',
            format: 'yyyy-MM-dd HH:mm:ss', // 格式参照burgeonui
            placeholder: '',
            clearable: '' // 是否显示清空按钮,默认为true   false
          },
          {
            style: 'input',
            label: $i18n.t('form_label.batch_number'), // '批次编号',
            value: 'BATCHNO',
            width: '6'
          },
          {
            style: 'input',
            label: $i18n.t('form_label.bar_code'), // '条码编码',
            value: 'PS_C_SKU_ECODE',
            width: '6'
          },
          {
            style: 'input',
            label: $i18n.t('form_label.platformCommodityID'), // '平台商品ID',
            value: 'NUMIID',
            width: '6'
          },
          {
            style: 'input',
            label: $i18n.t('table_label.platform_barcode_ID'), // '平台条码ID',
            value: 'SKU_ID',
            width: '6'
          },
          {
            style: 'input',
            label: $i18n.t('form_label.gBCode'), // '国标码',
            value: 'GBCODE',
            width: '6'
          },
          {
            label: $i18n.t('table_label.shopName'), // '店铺名称',
            value: 'CP_C_SHOP_TITLE',
              style: 'popInput', // 输入框弹框单多选
            width: '6',
            itemdata: {
              col: 1,
              colid: 174382,
              colname: 'CP_C_SHOP_ID', // 当前字段的名称
              datelimit: 'all',
              display: 'text', // 显示什么类型，例如xml表示弹窗多选加导入功能，mrp表示下拉多选
              fkdisplay: 'mrp', // 外键关联类型
              fkdesc: $i18n.t('table_label.shopName'), // '店铺名称',
              inputname: 'ENAME', // 这个是做中文类型的模糊查询字段，例如ENAME
              isfk: true, // 是否有fk键
              isnotnull: false, // 是否必填
              isuppercase: false, // 是否转大写
              length: 65535, // 最大长度是多少
              name: $i18n.t('table_label.shopName'), // '店铺名称',
              readonly: false, // 是否可编辑，对应input   readonly属性
              reftable: 'CP_C_SHOP', // 对应的表
              row: 1,
              statsize: -1,
              type: 'STRING', // 这个是后台用的
              valuedata: '', // 这个是选择的值
              pid: ''
            },
            oneObj: val => {
              this.formConfig.formValue.CP_C_SHOP_TITLE = val.valuedata;
            }
          },
          // {
          //   style: 'input',
          //   label: $i18n.t('form_label.storeID'), // '店铺ID',
          //   value: 'CP_C_SHOP_ID',
          //   width: '6'
          // },
          // {
          //   style: 'popInput', // 输入框弹框单多选
          //   width: '6',
          //   itemdata: {
          //     col: 1,
          //     colid: 174382,
          //     colname: 'CP_C_SHOP_ID', // 当前字段的名称
          //     datelimit: 'all',
          //     display: 'text', // 显示什么类型，例如xml表示弹窗多选加导入功能，mrp表示下拉多选
          //     fkdisplay: 'mrp', // 外键关联类型
          //     fkdesc: '店铺ID',
          //     inputname: 'ENAME', // 这个是做中文类型的模糊查询字段，例如ENAME
          //     isfk: true, // 是否有fk键
          //     isnotnull: false, // 是否必填
          //     isuppercase: false, // 是否转大写
          //     length: 65535, // 最大长度是多少
          //     name: $i18n.t('form_label.storeID'), // '店铺ID',
          //     readonly: false, // 是否可编辑，对应input   readonly属性
          //     reftable: 'CP_C_SHOP', // 对应的表
          //     row: 1,
          //     statsize: -1,
          //     type: 'STRING', // 这个是后台用的
          //     valuedata: '', // 这个是选择的值
          //     pid: ''
          //   },
          //   oneObj: val => {
          //     this.formConfig.formValue.CP_C_SHOP_ID = val.pid;
          //   }
          // },
          {
            style: 'input',
            label: $i18n.t('form_label.sourceNo'), // '来源单号',
            value: 'SOURCE_NO',
            width: '6'
          },
          {
            style: 'select', // 下拉框类型
            label: $i18n.t('form_label.synchronizationStatus'), // '同步状态',
            width: '6', // 所占宽度宽度
            value: 'SYN_STATUS', // 输入框的值
            multiple: true,
            options: [
              {
                label: $i18n.t('common.unAudit'), // '未审核',
                value: '1'
              },
              {
                label: $i18n.t('common.custAudited'), // '已客审',
                value: '2'
              },
              {
                label: $i18n.t('common.financeAudited'), // '已财审',
                value: '3'
              },
              {
                label: $i18n.t('common.voided'), // '已作废',
                value: '4'
              }
            ]
          },
          {
            style: 'select', // 下拉框类型
            label: $i18n.t('form_label.platformType'), // '平台类型',
            width: '6', // 所占宽度宽度
            value: 'CP_C_PLATFORM_ID', // 输入框的值
            multiple: true,
            options: [
              {
                label: $i18n.t('common.unAudit'), // '未审核',
                value: '1'
              },
              {
                label: $i18n.t('common.custAudited'), // '已客审',
                value: '2'
              },
              {
                label: $i18n.t('common.financeAudited'), // '已财审',
                value: '3'
              },
              {
                label: $i18n.t('common.voided'), // '已作废',
                value: '4'
              }
            ]
          },
          {
            style: 'input',
            label: $i18n.t('table_label.seller_nickname'), // '卖家昵称',
            value: 'SELLER_NICK',
            width: '6'
          },
          // {
          //   style: 'select', // 下拉框类型
          //   label: $i18n.t('form_label.wrongOrNot'), // '是否错误',
          //   width: '6', // 所占宽度宽度
          //   value: 'IS_ERROR', // 输入框的值
          //   multiple: true,
          //   options: [
          //     {
          //       label: $i18n.t('common.unAudit'), // '未审核',
          //       value: '1'
          //     },
          //     {
          //       label: $i18n.t('common.custAudited'), // '已客审',
          //       value: '2'
          //     },
          //     {
          //       label: $i18n.t('common.financeAudited'), // '已财审',
          //       value: '3'
          //     },
          //     {
          //       label: $i18n.t('common.voided'), // '已作废',
          //       value: '4'
          //     }
          //   ]
          // },
          // {
          //   style: 'input',
          //   label: $i18n.t('form_label.synchronizedInventory'), // '同步库存数',
          //   value: 'QTY_STORAGE',
          //   width: '6'
          // },
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
        ],
        formValue: {
        },
        ruleValidate: {
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
          label: $i18n.t('common.all'), // '全部',
          value: '1',
          isShow: true
        }
      ], // tab切换
      labelDefaultValue: '1',
      jordanTableConfig: {
        columns: [
          {
            title: $i18n.t('table_label.creationTime'), // '创建时间',
            key: 'CREATIONDATE'
          },
          {
            title: $i18n.t('table_label.shopName'), // '店铺名称',
            key: 'CP_C_SHOP_TITLE'
          },
          {
            title: $i18n.t('form_label.bar_code'), // '条码编码',
            key: 'PS_C_SKU_ECODE'
          },
          {
            title: $i18n.t('form_label.platformCommodityID'), // '平台商品ID',
            key: 'NUMIID'
          },
          {
            title: $i18n.t('table_label.platform_barcode_ID'), // '平台条码ID',
            key: 'SKU_ID'
          },
          {
            title: $i18n.t('form_label.synchronizationStatus'), // '同步状态',
            key: 'SYN_STATUS_NAME'
          },
          {
            title: $i18n.t('form_label.returnInformation'), // '返回信息',
            key: 'ERROR_MSG'
          },
          {
            title: $i18n.t('form_label.synchronizedInventory'), // '同步库存数',
            key: 'QTY_STORAGE'
          },
          {
            title: $i18n.t('form_label.a9'), // '计算虚高库存前库存',
            key: 'QTY_STORAGE_REALY'
          },
          {
            title: $i18n.t('form_label.sourceNo'), // '来源单号',
            key: 'SOURCE_NO'
          },
          {
            title: $i18n.t('form_label.batch_number'), // '批次编号',
            key: 'BATCHNO'
          },
          {
            title: $i18n.t('table_label.extendedProperties'), // '扩展属性',
            key: 'PROPERTIES'
          },
          {
            title: $i18n.t('table_label.seller_nickname'), // '卖家昵称',
            key: 'SELLER_NICK'
          },
          {
            title: $i18n.t('table_label.remarks'), // 备注
            key: 'REMARK'
          },
          // {
          //   title: $i18n.t('form_label.wrongOrNot'), // '是否错误',
          //   key: 'IS_ERROR'
          // },
          {
            title: $i18n.t('form_label.gBCode'), // '国标码',
            key: 'GBCODE'
          },
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
    BtnConfig.target = this;
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
    // const today = new Date();
    // const preDay = today.addDays(today, -1);
    const preDay = new Date(new Date(new Date().toLocaleDateString()).getTime());
    const today = new Date(new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 - 1);
    console.log(preDay, today);
    this.formConfig.formValue.CREATIONDATE = [preDay, today];
    console.log(this.formConfig.formValue.CREATIONDATE);
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
      if (!mainData.NUMIID && !mainData.BATCHNO && !mainData.SKU_ID && !mainData.PS_C_SKU_ECODE) {
        // _this.$Message.error($i18n.t('modalTips.dn')); // '平台商品ID不能为空!'
        _this.$Message.error('批次编号,平台商品ID,平台条码ID,条码编码中需最少一项不为空!');
        return;
      }
      let creationdateStart = '';
      let creationdateEnd = '';
      if (mainData.CREATIONDATE && mainData.CREATIONDATE.length > 0) {
        creationdateStart = mainData.CREATIONDATE[0];
        creationdateEnd = mainData.CREATIONDATE[1];
      }
      if (!creationdateStart || !creationdateEnd) {
        _this.$Message.error($i18n.t('modalTips.dk')); // '创建日期不能为空!'
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
          // _this.$Message.warning({ content: res.data.message });
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
      const contentHeight = document.getElementById('content').clientHeight;
      let returnHeight = 25;
      returnHeight += document.getElementsByClassName('returnBtn')[0].clientHeight;
      returnHeight += document.getElementsByClassName('returnForm')[0].clientHeight;
      const tableHeight = contentHeight - returnHeight;
      _this.jordanTableConfig.height = tableHeight - 100;
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
            const mes = res.data.message || $i18n.t('modalTips.z2'); // '导出成功！';
            _this.$Message.success(mes);
            publicMethodsUtil.downloadUrlFile(res.data.data);
          } else {
            // const err = res.data.message || $i18n.t('modalTips.z3'); // '失败！';
            // _this.$Message.error(err);
          }
        });
      } else {
        if (_this.jordanTableConfig.data.length === 0) {
          _this.$Message.error($i18n.t('modalTips.z4')); // '列表没有数据,无法导出!';
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
          const mes = res.data.message || $i18n.t('modalTips.z2'); // '导出成功！';
          _this.$Message.success(mes);
          publicMethodsUtil.downloadUrlFile(res.data.data);
          // return (window.location = res.data.data);
        } else {
          // const err = res.data.message || $i18n.t('modalTips.z3'); // '失败！';
          // _this.$Message.error(err);
        }
      });
    }
  },
  destroyed() {
    window.removeEventListener('keydown', this, false);
  }
};

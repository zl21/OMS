
import isFavoriteMixin from '@/assets/js/mixins/isFavorite';
import publicMethodsUtil from '@/assets/js/public/publicMethods';
import customPagingMixins from '@/assets/js/mixins/customPaging';
import buttonPermissionsMixin from '@/assets/js/mixins/buttonPermissions';
import BtnConfig from 'burgeonConfig/config/funBtn.config';

export default {
  components: {},
  mixins: [isFavoriteMixin, customPagingMixins, buttonPermissionsMixin],
  data() {
    return {
      vmI18n: $i18n,
      allTableArr: [],
      selectArr: [],
      warningModal: false, // 警告弹框
      btnConfig: BtnConfig.config(),
      formConfig: {
        formData: [
          {
            style: 'popInput', // 输入框弹框单多选
            width: '6',
            itemdata: {
              col: 1,
              colid: 174267,
              colname: 'CP_C_SHOP_ID', // 当前字段的名称
              datelimit: 'all',
              display: 'text', // 显示什么类型，例如xml表示弹窗多选加导入功能，mrp表示下拉多选
              fkdisplay: 'mrp', // 外键关联类型
              fkdesc: '平台店铺标题',
              inputname: 'ENAME', // 这个是做中文类型的模糊查询字段，例如ENAME
              isfk: true, // 是否有fk键
              isnotnull: true, // 是否必填
              isuppercase: false, // 是否转大写
              length: 65535, // 最大长度是多少
              name: $i18n.t('table_label.platform_store_title'), // '平台店铺标题',
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
            style: 'popInput', // 输入框弹框单多选
            width: '6',
            itemdata: {
              col: 1,
              colid: 174272,
              colname: 'PS_C_SKU_ID', // 当前字段的名称
              datelimit: 'all',
              display: 'text', // 显示什么类型，例如xml表示弹窗多选加导入功能，mrp表示下拉多选
              fkdisplay: 'mrp', // 外键关联类型
              fkdesc: '条码',
              inputname: 'ECODE', // 这个是做中文类型的模糊查询字段，例如ENAME
              isfk: true, // 是否有fk键
              isnotnull: true, // 是否必填
              isuppercase: false, // 是否转大写
              length: 65535, // 最大长度是多少
              name: $i18n.t('form_label.barCode'), // '条码',
              readonly: false, // 是否可编辑，对应input   readonly属性
              reftable: 'PS_C_SKU', // 对应的表
              row: 1,
              statsize: -1,
              type: 'STRING', // 这个是后台用的
              valuedata: '', // 这个是选择的值
              pid: ''
            },
            oneObj: val => {
              this.formConfig.formValue.PS_C_SKU_ID = val.pid;
              this.formConfig.formValue.PS_C_SKU_ECODE = val.valuedata;
            }
          },
          {
            style: 'input',
            label: $i18n.t('table_label.productNo'), // '商品编码',
            value: 'PS_C_SKU_ECODE',
            width: '6'
          },

          {
            style: 'input', // 文本录入
            label: $i18n.t('form_label.gBCode'), // '国标码',
            value: 'GBCODE',
            width: '6'
          }
        ],
        formValue: {},
        ruleValidate: {},
        /* flodClick: () => {
          setTimeout(() => {
            this.setTableHeight();
          }, 10);
        } */
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
            title: $i18n.t('table_label.platform_store_title'), // '平台店铺标题',
            key: 'CP_C_SHOP_TITLE'
          },
          {
            title: $i18n.t('table_label.a0'), // '期初可售数',
            key: 'QTY_BEGIN'
          },
          {
            title: $i18n.t('table_label.a1'), // '变化数量',
            key: 'QTY_CHANGE'
          },
          {
            title: $i18n.t('table_label.a2'), // '期末可售数',
            key: 'QTY_END'
          },
          {
            title: $i18n.t('form_label.bar_code'), // '条码编码',
            key: 'PS_C_SKU_ECODE'
          },
          {
            title: $i18n.t('table_label.productNo'), // '商品编码',
            key: 'PS_C_PRO_ECODE'
          },
          {
            title: $i18n.t('table_label.productName'), // '商品名称',
            key: 'PS_C_PRO_ENAME'
          },
          {
            title: $i18n.t('form_label.gBCode'), // '国标码',
            key: 'GBCODE'
          },
          {
            title: $i18n.t('table_label.creationTime'), // '创建时间',
            key: 'CREATIONDATE'
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
  created() { },
  mounted() {
    BtnConfig.target = this;
    this.$nextTick(() => {
      this.getPermissions('btnConfig', 'sgStorageChangeFtpQuery');
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
    // 查找
    find() {
      this.jordanTableConfig.current = 1;
      this.getList();
    },
    // 获取列表数据
    async getList() {
      const _this = this;
      // if (_this.jordanTableConfig.loading) {
      //   return;
      // }
      const mainData = _this.formConfig.formValue;
      if (!mainData.CP_C_SHOP_ID) {
        _this.$Message.error($i18n.t('modalTips.do')); // '店铺不能为空!');
      } else if (!mainData.PS_C_SKU_ID) {
        _this.$Message.error($i18n.t('modalTips.dp')); // '条码不能为空!');
      } else {
        _this.jordanTableConfig.data = [];
        _this.jordanTableConfig.total = 0;
        _this.jordanTableConfig.loading = true;
        const dealForm = {};
        const whereInfoForm = Object.assign(mainData, dealForm);
        const param = {
          whereInfo: whereInfoForm,
          pageNum: _this.jordanTableConfig.current,
          pageSize: _this.jordanTableConfig.pageSize
        };
        const fromdata = new FormData();
        fromdata.append('param', JSON.stringify(param));
        const {
          data: { data, code, message }
        } = await this.service.inventoryCenter.getChannelStorageFtpQuery(fromdata);
        _this.jordanTableConfig.loading = false;
        _this.returnSelectData = [];
        console.log(data, code, message);
        if (code === 0 && data.sgChannelStorageFtpResultList.length) {
          data.sgChannelStorageFtpResultList.forEach(item => {
            item.CREATIONDATE = item.CREATIONDATE ? $utils.DatesTime(item.CREATIONDATE) : '';
          });
          _this.jordanTableConfig.total = data.totalSize;
          _this.jordanTableConfig.data = data.sgChannelStorageFtpResultList;
        } else {
          _this.jordanTableConfig.data = [];
          _this.jordanTableConfig.total = 0;
          // _this.$Message.warning(message);
        }
      }
    },
    oneObjs() { },
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
    returnExport() { },
    // 导出
    returnImport() { },
    // 设置表格高度
    setTableHeight() {
      const _this = this;
      const contentHeight = document.getElementById('ContentDisplayArea').clientHeight;
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
            const mes = res.data.message || $i18n.t('modalTips.z2'); // '导出成功！';
            _this.$Message.success(mes);
            publicMethodsUtil.downloadUrlFile(res.data.data);
            // return (window.location = res.data.data);
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

import businessButton from 'professionalComponents/businessButton';
import businessForm from 'professionalComponents/businessForm';
import businessLabel from 'professionalComponents/businessLabel';
import businessDialog from 'professionalComponents/businessDialog';
import businessActionTable from 'professionalComponents/businessActionTable.vue';
import { isFavoriteMixin } from '@/assets/js/mixins/isFavorite.js';
import publicMethodsUtil from '@/assets/js/public/publicMethods.js';
import { customPagingMixins } from '@/assets/js/mixins/customPaging.js';
import { buttonPermissionsMixin } from '@/assets/js/mixins/buttonPermissions.js';

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
            text: '查找', // 按钮文本
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
            type: 'datetimerange', // 日期组件类型,默认为data  (daterange)为双日期区间选择
            value: 'CREATIONDATE',
            label: '创建日期',
            width: '6',
            format: 'yyyy-MM-dd HH:mm:ss', // 格式参照burgeonui
            placeholder: ''
          },
          {
            style: 'popInput', // 输入框弹框单多选
            width: '6',
            itemdata: {
              col: 1,
              colid: 174415,
              colname: 'CP_C_SHOP_ID', // 当前字段的名称
              datelimit: 'all',
              display: 'text', // 显示什么类型，例如xml表示弹窗多选加导入功能，mrp表示下拉多选
              fkdisplay: 'mrp', // 外键关联类型
              fkdesc: '店铺',
              inputname: 'ENAME', // 这个是做中文类型的模糊查询字段，例如ENAME
              isfk: true, // 是否有fk键
              isnotnull: false, // 是否必填
              isuppercase: false, // 是否转大写
              length: 65535, // 最大长度是多少
              name: '店铺', // input前面显示的lable值
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
            label: '平台条码ID',
            value: 'SKU_ID',
            width: '6'
          },
          {
            style: 'input', // 文本录入
            label: '来源单号',
            value: 'SOURCE_NO',
            width: '6'
          },
          {
            style: 'input', // 文本录入
            label: '条码',
            value: 'SKU_ECODE',
            width: '6'
          },
          {
            style: 'input', // 文本录入
            label: '批次号',
            value: 'BATCH_NO',
            width: '6'
          }
        ],
        formValue: {
          CREATIONDATE: []
        },
        ruleValidate: {
          CREATIONDATE: [{ required: true, message: ' ' }]
        },
        flodClick: () => {
          // setTimeout(() => {
          //   this.setTableHeight();
          // }, 10);
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
            title: '店铺',
            key: 'CP_C_SHOP_TITLE'
          },
          {
            title: '平台条码ID',
            key: 'SKU_ID'
          },
          {
            title: '来源单号',
            key: 'SOURCE_NO'
          },
          {
            title: '条码',
            key: 'SKU_ECODE'
          },
          {
            title: '批次号',
            key: 'BATCH_NO'
          },
          {
            title: '处理状态',
            key: 'DEL_STATUS'
          },
          {
            title: '创建时间',
            key: 'CREATIONDATE'
          } /* ,
            {
              title: "可用",
              key: "ISACTIVE"
            } */
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
  created() {},
  mounted() {
    this.$nextTick(() => {
      this.getPermissions('btnConfig', 'sgChannelStorageBuffer');
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
    const dateStr = new Date().toLocaleDateString();
    const today = `${dateStr} 23:59:59`;
    const preDay = `${dateStr} 00:00:00`;
    this.formConfig.formValue.CREATIONDATE = [new Date(preDay), new Date(today)];
    //   this.setTableHeight();
  },
  methods: {
    // 查找
    find() {
      this.jordanTableConfig.current = 1;
      this.getList();
    },
    // 获取列表数据
    getList() {
      const _this = this;
      if (_this.jordanTableConfig.loading) {
        return;
      }
      const mainData = _this.formConfig.formValue;
      if (!mainData.CREATIONDATE[0]) {
        _this.$Message.error('创建日期不能为空!');
        return;
      }
      const endDate = new Date(mainData.CREATIONDATE[1]).getTime();
      const startDate = new Date(mainData.CREATIONDATE[0]).getTime();
      const oneDayTime = 24 * 60 * 60 * 1000;
      if (endDate - startDate > oneDayTime) {
        _this.$Message.error('时间范围不能超过24小时');
        return;
      }
      if (!mainData.SKU_ID && !mainData.SKU_ECODE && !mainData.BATCH_NO) {
        _this.$Message.error('【平台条码id、条码、批次编码】不能同时为空！');
        return;
      }
      _this.jordanTableConfig.data = [];
      _this.jordanTableConfig.total = 0;
      _this.jordanTableConfig.loading = true;
      const dealForm = {};
      const whereInfoForm = Object.assign(mainData, dealForm);
      const param = {
        table: this.$route.params.customizedModuleName,
        whereInfo: whereInfoForm,
        pageNum: _this.jordanTableConfig.current,
        pageSize: _this.jordanTableConfig.pageSize
      };
      const fromdata = new FormData();
      fromdata.append('param', JSON.stringify(param));
      this.service.inventoryCenter
        .getChannelStorageBufferQuery(fromdata)
        .then(res => {
          _this.jordanTableConfig.loading = false;
          _this.returnSelectData = [];
          if (res.data.code === 0 && res.data.data.sgChannelStorageBufferResultList.length) {
            res.data.data.sgChannelStorageBufferResultList.forEach(item => {
              item.ISACTIVE = item.ISACTIVE === 'Y' ? '是' : '否';
              item.CREATIONDATE = item.CREATIONDATE ? publicMethodsUtil.DatesTime(item.CREATIONDATE) : '';
              item.MODIFIEDDATE = item.MODIFIEDDATE ? publicMethodsUtil.DatesTime(item.MODIFIEDDATE) : '';
            });
            _this.jordanTableConfig.total = res.data.data.totalSize;
            _this.jordanTableConfig.data = res.data.data.sgChannelStorageBufferResultList;
          } else {
            _this.jordanTableConfig.data = [];
            _this.jordanTableConfig.total = 0;
            _this.$Message.warning({ message: res.data.message });
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
            _this.downloadUrlFile(res.data.data);
            // return (window.location = res.data.data);
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
    // 导出
    downloadUrlFile(src) {
      const downloadFile = {};
      if (typeof downloadFile.iframe == 'undefined') {
        const iframe = document.createElement('iframe');
        downloadFile.iframe = iframe;
        document.body.appendChild(downloadFile.iframe);
      }
      downloadFile.iframe.src = src;
      downloadFile.iframe.style.display = 'none';
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
          _this.downloadUrlFile(res.data.data);
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

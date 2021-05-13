import businessButton from 'professionalComponents/businessButton';
import businessForm from 'professionalComponents/businessForm';
import businessLabel from 'professionalComponents/businessLabel';
import businessStatusFlag from 'professionalComponents/businessStatusFlag';
import publicMethodsUtil from '@/assets/js/public/publicMethods.js';
import orderItem from 'professionalComponents/subTable';
import businessActionTable from 'professionalComponents/businessActionTable';
import addPlatformLogisticsCompany from '@/views/modal/commodityCenter/addPlatformLogisticsCompany';
import loading from 'professionalComponents/loading';

export default {
  name: 'logisticsCompanyFilesAddOrEdit',
  components: {
    orderItem,
    businessButton,
    businessForm,
    businessLabel,
    businessStatusFlag,
    businessActionTable,
    addPlatformLogisticsCompany,
    loading,
  },
  data() {
    /* -------------------- input校验器 start -------------------- */
    const ECODEValidator = (rule, value, callback) => {
      let eCode = this.formConfig.formValue.ECODE;
      if (!eCode) {
        return callback(new Error('!'));
      }
      if (/^[A-Za-z0-9]+$/.test(eCode)) {
        return callback();
      } else {
        return callback(new Error('格式不正确!'));
      }
    };
    /* -------------------- input校验器 end -------------------- */
    return {
      vmI18n:$i18n,
      subTableLogConfig: {
        centerName: '',
        tablename: '',
        objid: '',
      },
      showAddPlatformLogisticsCompany: false,
      delRowIdList: [], // 删除明细中记录选中的标识
      // ID: this.$route.params.customizedModuleId && this.$route.params.customizedModuleId != 'New' ? this.$route.params.customizedModuleId : '-1', // 记录主界面传入的ID
      showSubtablePart: false,
      loading: false,
      addTableData: [],
      totalData: [],
      backable: false,
      modify: {
        // 监听并暂存修改的信息，便于调保存的时候传给后端
        master: {}, // 修改后的主表信息
        subTable: [], // 修改后的子表信息
      },
      btnConfig: {
        typeAll: 'default',
        buttons: [{
            text: '保存',
            size: '', // 按钮大小
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              this.save();
            },
          },
          {
            text: $i18n.t('btn.back'),
            btnclick: () => {
              this.back();
            },
          },
        ],
      },
      // 主表Part
      formConfig: {
        formData: [{
            style: 'input',
            label: '物流公司编码',
            value: 'ECODE',
            colname: 'ECODE',
            width: '6',
            disabled: false,
            inputChange: () => {
              this.masterModifyData('ECODE', 'master');
            },
          },
          {
            style: 'input',
            label: '物流公司名称',
            value: 'ENAME',
            colname: 'ENAME',
            width: '6',
            disabled: false,
            inputChange: () => {
              this.masterModifyData('ENAME', 'master');
            },
          },
        ],
        formValue: {
          ECODE: '',
          ENAME: '',
        },
        ruleValidate: {
          ECODE: [{
            validator: ECODEValidator,
            required: true,
            message: ' '
          }],
          ENAME: [{
            required: true,
            message: ' '
          }],
        },
      },
      // 子表Part
      subTableConfig: {
        isSearchText: true, // 是否修改搜索框为select
        isShowDeleteDetailBtn: false, // 控制是否显示删除明细
        isShowAddDetailBtn: false, // 控制是否显示新增明细
        searchSelectList: [], // isSearchText为false的情况下使用 搜索框list
        pageShow: true, // 控制分页是否显示
        searchInputShow: false, // 控制搜索框是否显示
        width: '', // 表格宽度
        height: '332', // 表格高度
        border: true, // 是否显示纵向边框
        total: 0, // 设置总条数
        current: 1, // 当前页码
        pageSizeOpts: [10, 20, 30, 40, 50, 60], // 每页条数切换的配置
        pageSize: 10, // 每页条数
        totalData: [],
        selectionData: [],
        data: [],
        isShowSelection: true, // 是否展示select框
        indexColumn: true, // 是否展示序号列
        columns: [{
            title: '平台',
            key: 'CP_C_PLATFORM_ENAME',
          },
          {
            title: '平台物流编号',
            key: 'CP_C_LOGISTICS_ECODE',
          },
          {
            title: '平台物流名称',
            key: 'CP_C_LOGISTICS_ENAME',
          },
        ],
        businessButtonConfig: {
          typeAll: 'default',
          buttons: [{
              text: '添加',
              disabled: false, // 按钮禁用控制
              btnclick: () => {
                this.addHandel();
              },
            },
            {
              text: '删除',
              btnclick: () => {
                this.deleteHandel();
              },
            },
          ],
        },
      },
      // tab切换配置
      labelList: [{
          label: '平台物流对应',
          value: 'PROPERTYVALUES',
        },
        {
          label: '操作日志',
          value: 'PS_C_ALTERNATE_SKU1',
        },
      ],
      labelDefaultValue: 'PROPERTYVALUES', // 设置tab默认值
      panelDefaultValue: 'panel_baseInfo', // 设置默认打开'基本信息'
    };
  },
  watch: {},
  computed: {
    customizedModuleName() {
      return this.$router.currentRoute.params.customizedModuleName;
    },
    ID() {
      const id = this.$route.params.customizedModuleId;
      if (id == 'New') {
        return '-1'
      } else {
        return id
      }
    },
  },
  mounted() {
    const self = this;
    if (self.ID == '-1') {
      // 新增
      self.labelList.splice(1, 1);
    } else {
      // 详情
      self.initObjItem(self.ID);
    }
  },
  created() {},
  methods: {
    /* -------------------- 详情初始化 start -------------------- */
    async initObjItem(id) {
      const self = this;
      this.loading = true;
      const data = await this.$OMS2.omsUtils.getObject('CP_C_LOGISTICS', id);
      // self.formConfig = this.$OMS2.omsUtils.analysisForm(data, self.formConfig, '基本信息');
      self.formConfig = this.$OMS2.omsUtils.initFormConfig(data.addcolums[0].childs, self.formConfig);

      /* 子表初始化： */
      const subData = await this.$OMS2.omsUtils.initSubtable('CP_C_LOGISTICS_ITEM', self.ID, '168321', {
        range: 5000
      });
      self.totalData = subData.rowData;
      self.totalData.map(item => {
        item.repeatKey = item.CP_C_PLATFORM_ENAME + '+' + item.CP_C_LOGISTICS_ECODE
      })
      self.getTableData(self.totalData, 'edit');
      this.loading = false;
    },
    /* -------------------- 详情初始化 end -------------------- */

    /* -------------------- 子表Part start -------------------- */
    getTableData(data, type = 'add') {
      const self = this;
      if (type == 'add') {
        self.addTableData = self.addTableData.concat(data); // 添加
        self.addTableData = this.$OMS2.omsUtils.unrepeated(self.addTableData, 'repeatKey'); // 去重，便于保存
      }
      const allArr = self.totalData.concat(data)
      // self.subTableConfig.data = this.$OMS2.omsUtils.unrepeated(allArr, 'repeatKey'); // 取差值-展示
      // self.subTableConfig.total += self.subTableConfig.data.length - 1;
      self.totalData = this.$OMS2.omsUtils.unrepeated(allArr, 'repeatKey'); // 取差值-展示
      self.subTableConfig.total = self.totalData.length;
      // 初始化展示10条
      self.pageChange(1);
    },

    // 添加按钮
    addHandel() {
      const self = this;
      self.showAddPlatformLogisticsCompany = true;
    },
    // 删除按钮
    async deleteHandel() {
      const self = this;
      const allArrs = self.totalData;
      let partArrs = self.subTableConfig.selectionData;
      let partNewArrs = [];
      let IDS = [];
      partArrs.forEach((it) => {
        // 过滤调刚刚新增的数据
        if (it.ID != '-1') {
          IDS.push(it.ID);
        } else {
          // 刚新增的数据（未保存的）的删除处理，不调用删除接口的
          partNewArrs.push(it);
        }
      });
      self.totalData = this.$OMS2.omsUtils.getDifferentArr(allArrs, partNewArrs, 'repeatKey');
      if (!IDS.length && partNewArrs.length) {
        self.addTableData = this.$OMS2.omsUtils.getDifferentArr(self.addTableData, partNewArrs, 'repeatKey');
        partNewArrs = [];
        self.$Message.success('删除成功！');
        self.getTableData(self.totalData);
        return false;
      }
      const {
        data: {
          code,
          data,
          message
        }
      } = await self.service.basicData.platformDeleteItems({
        IDS
      }).catch(() => {
        this.loading = false;
      });
      if (code == 0) {
        self.$Message.success(message);
        // 刷新页面
        await self.initObjItem(self.ID);
      } else {
        // 走框架报错提示
      }
    },
    /* -------------------- 子表Part end -------------------- */

    // 保存
    async save() {
      console.clear();
      const self = this;
      const afterForm = self.modify.master;
      /* ========= 保存校验 start ========= */
      const masterArr = Object.keys(self.modify.master);
      // 未修改，不提示，不操作
      if (!masterArr.length && !self.addTableData.length) return false;
      const valueArr = ['ECODE', 'ENAME'];
      const mes = this.$OMS2.omsUtils.validatorNotEmpty(self.formConfig, valueArr);
      if (mes !== 1) {
        this.$message.error(mes);
        return false;
      }
      /* ========= 保存校验 end ========= */
      const CP_C_LOGISTICS = Object.assign(afterForm, {
        ID: self.ID,
      });
      const CP_C_LOGISTICS_ITEM = self.addTableData;
      const param = {
        CP_C_LOGISTICS, // 主表修改信息
        CP_C_LOGISTICS_ITEM, // 子表修改信息
      };
      this.loading = true;
      const {
        data: {
          code,
          data,
          message
        }
      } = await self.service.basicData.platformSave(param).catch(() => {
        this.loading = false;
      });
      this.loading = false;
      if (code === 0) {
        this.backable = true;
        if (this.formConfig.formValue.TYPE == 'LIST') {
          this.showSubtablePart = true;
        }
        // 数据回显
        self.modify.master = {};
        if (data && data.ID) self.ID = data.ID
        await self.initObjItem(self.ID);
        self.$Message.success(message || $i18n.t('modalTips.z9'));
      } else {
        // 走框架的报错
      }
    },
    // 返回
    back() {
      const self = this;
      if (self.backable) {
        // 保存成功之后返回
        self.onOk()
        return
      }
      const masterArr = Object.keys(self.modify.master);
      if (masterArr.length) {
        this.$Modal.info({
          title: $i18n.t('modalTitle.tips'), // 提示
          content: '当前修改未保存，确定返回？',
          mask: true,
          showCancel: true,
          okText: $i18n.t('common.determine'), // 确定
          cancelText: $i18n.t('common.cancel'), // 取消
          onOk: () => {
            self.onOk()
          },
        });
      } else {
        self.onOk()
      }
    },
    onOk() {
      this.$comUtils.tabCloseAppoint(this);
      this.$destroy(true);
      this.$store.commit('global/tabOpen', {
        tableId: 10328,
        type: 'S',
        tableName: 'CP_C_LOGISTICS',
        back: true,
      });
    },

    /* --------------- 表格事件 --------------- */
    delTableDetail() {},
    addTableDetail() {},
    onSelect(e) {
      // e为选中的数组对象RowArr
      this.subTableConfig.selectionData = e;
    },
    onSelectCancel(e) {
      this.subTableConfig.selectionData = e;
    },
    onSelectAll(e) {
      this.subTableConfig.selectionData = e;
    },
    onSelectAllCancel(e) {
      this.subTableConfig.selectionData = e;
    },
    pageChange(e) {
      this.subTableConfig.current = e;
      // eg:第二页，展示第11-20条
      const startIndex = this.subTableConfig.pageSize * (e - 1) + 1; // 11
      const endIndex = e * this.subTableConfig.pageSize; // 20
      this.subTableConfig.data = this.totalData.slice(startIndex - 1, endIndex);
    },
    pageSizeChange(e) {
      this.subTableConfig.pageSize = e;
    },

    /* --------------------- 工具函数： --------------------- */
    // 切换Label & 实时渲染subTable
    labelClick(item) {
      this.labelDefaultValue = item.value;
      if (this.labelDefaultValue == 'PROPERTYVALUES') return;
      this.subTableConfig = {
        tablename: this.labelDefaultValue,
        objid: this.ID,
      };
    },
    /**
     * 记录主表修改信息方法
     * @ecode 记录字段
     * @obj 修改值暂存在modify下的某个对象中
     */
    masterModifyData(ecode, obj) {
      const self = this;
      self.modify[obj][ecode] = self.formConfig.formValue[ecode];
    },
    // 填充下拉选项框
    async getSelectData() {
      const self = this;
      self.formConfig.formData = await publicMethodsUtil.getTypeList('BS_C_EXTRA_ATTRIBUTE_DEF_PRO', ['TYPE', 'LOCATION', 'TABLE_NAME'], '基础信息', self.formConfig);
    },
    keyDown(e) {
      // console.log(e);
    },
  },
};

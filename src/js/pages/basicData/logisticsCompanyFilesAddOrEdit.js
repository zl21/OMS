import businessButton from 'burgeonComponents/businessButton';
import { OmsForm } from 'burgeonComponents';
import businessLabel from 'burgeonComponents/businessLabel';
import publicMethodsUtil from '@/assets/js/public/publicMethods.js';
import addPlatformLogisticsCompany from '@/views/modal/commodityCenter/addPlatformLogisticsCompany';
import loading from 'burgeonComponents/loading';
import subTable from 'burgeonComponents/subTable';
import orderNumberNnalysis from 'allpages/basicData/orderNumberNnalysis.vue';
import modifycurrentLabel from '../../../assets/js/mixins/modifycurrentLabel';
import { OmsTable } from 'burgeonComponents'

export default {
  components: {
    businessButton,
    businessForm,
    businessLabel,
    OmsTable,
    addPlatformLogisticsCompany,
    loading,
    subTable,
    orderNumberNnalysis
  },
  mixins: [new modifycurrentLabel()],
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
      vmI18n: $i18n,
      subTableLogConfig: {
        centerName: '',
        tablename: '',
        objid: '',
      },
      showAddPlatformLogisticsCompany: false,
      delRowIdList: [], // 删除明细中记录选中的标识
      ID: this.$route.params.customizedModuleId && this.$route.params.customizedModuleId != 'New' ? this.$route.params.customizedModuleId : '-1', // 记录主界面传入的ID
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
        btnsite: 'right', // 按钮对齐方式
        typeAll: 'default',
        buttons: [
          {
            webname: 'LOGISTICS_SaveBtn',
            text: $i18n.t('btn.save'), // 保存
            size: '', // 按钮大小
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              this.save();
            },
          },
          {
            webname: 'fix_back',
            text: $i18n.t('btn.back'),
            btnclick: () => {
              this.back();
            },
          },
        ],
      },
      // 主表Part
      formConfig: {
        formData: [
          {
            style: 'input',
            label: $i18n.t('form_label.ds'), // 物流公司编码
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
            label: $i18n.t('form_label.dt'), // 物流公司名称
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
        key: 'subTableConfig',
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
        pageSizeOpts: [10, 20, 30, 50, 100], // 每页条数切换的配置
        pageSize: 10, // 每页条数
        totalData: [],
        selectionData: [],
        data: [],
        isShowSelection: true, // 是否展示select框
        indexColumn: true, // 是否展示序号列
        columns: [
          {
            title: $i18n.t('other.platForm'), // 平台
            key: 'CP_C_PLATFORM_ENAME',
          },
          {
            title: $i18n.t('form_label.dq'), // 平台物流编号
            key: 'CP_C_LOGISTICS_ECODE',
          },
          {
            title: $i18n.t('form_label.dr'), // 平台物流名称
            key: 'CP_C_LOGISTICS_ENAME',
          },
        ],
        businessButtonConfig: {
          typeAll: 'default',
          buttons: [
            {
              webname: 'LOGISTICS_AddDetailBtn',
              type: 'primary',
              text: $i18n.t('btn.increase'), // 添加
              disabled: false, // 按钮禁用控制
              btnclick: () => {
                this.addHandel();
              },
            },
            {
              webname: 'LOGISTICS_DeleteDetailBtn',
              type: 'warning',
              text: $i18n.t('btn.delete'), // 删除
              btnclick: () => {
                this.deleteHandel();
              },
            },
          ],
        },
      },
      subTableConfig1: {
        key: 'subTableConfig1',
        businessButtonConfig: {
          typeAll: 'default',
          buttons: [
            {
              webname: 'LOGISTICS2_AddDetailBtn',
              text: $i18n.t('btn.increase'), // 添加
              type: 'primary',
              disabled: false, // 按钮禁用控制
              btnclick: () => {
                this.nalysisAdd();
                this.subTableConfig1.businessFormConfig.formValue.PREFIX = '';
                this.subTableConfig1.businessFormConfig.formValue.SUFFIX = '';
              },
            },
            {
              webname: 'LOGISTICS2_DeleteDetailBtn',
              text: $i18n.t('btn.delete'), // 删除
              type: 'warning',
              btnclick: () => {
                this.nalysisDetale();
              },
            },
          ],
        },
        businessFormConfig: {
          formValue: {
            PREFIX: '',
            SUFFIX: '',
          },
          formData: [
            {
              label: $i18n.t('form_label.do'), // 前缀
              style: 'input',
              width: '6',
              value: 'PREFIX',
              AuotData: [], //匹配的选项
              regx: /^[^\s]*$/,
              dimChange: (search) => {
                //模糊查询的方法
                // this.fuzzyquerybyak(search)
              },
              dimEnter: (val) => {
                this.nalysisAdd();
              },
              dimSelect: (obj) => { },
              dimblur: () => { },
            },
            {
              label: $i18n.t('form_label.dp'), // 后缀
              style: 'input',
              width: '6',
              value: 'SUFFIX',
              AuotData: [], //匹配的选项
              regx: /^[^\s]*$/,
              dimChange: (search) => { },
              dimEnter: (val) => {
                this.nalysisAdd();
              },
              dimSelect: (obj) => { },
              dimblur: () => { },
            }
          ],
        }, // 表单配置
        columns: [
          {
            title: $i18n.t('form_label.do'), // 前缀
            key: 'PREFIX',
          },
          {
            title: $i18n.t('form_label.dp'), // 后缀
            key: 'SUFFIX',
          }
        ],
        data: [],
        selectionData: [],
        border: true, // 是否显示纵向边框
        isShowSelection: true, // 是否展示select框
        indexColumn: true // 是否展示序号列
      },
      subTableConfig2: {},
      // tab切换配置
      labelList: [
        {
          label: $i18n.t('panel_label.b1'), // 平台物流对应
          value: 'PROPERTYVALUES',
        },
        {
          label: $i18n.t('panel_label.b2'), // 物流单号解析配置
          value: 'CP_C_LOGISTICS_FIX',
        },
        {
          label: $i18n.t('panel_label.operationLog'), // 操作日志
          value: 'CP_LOGISTICS_LOG',
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
  },
  async mounted() {
    const self = this;
    if (self.ID == '-1') {
      // 新增
      self.labelList.splice(2, 1);
    } else {
      // 详情
      self.initObjItem(self.ID);
    }
    const subData = await $omsUtils.initSubtable('CP_C_LOGISTICS_FIX', this.ID, '180461',);
    this.subTableConfig1.data = subData.rowData.map((item) => {
      item.COMBINATION = `${item.PREFIX}${item.SUFFIX}`;
      return item;
    })
  },
  created() { },
  activated() {
    this.getBtn();
  },
  methods: {
    /* -------------------- 详情初始化 start -------------------- */
    async initObjItem(id) {
      const self = this;
      this.$nextTick(() => {
        this.getBtn();
      })
      // this.loading = true;
      const data = await $omsUtils.getObject('CP_C_LOGISTICS', id);
      // self.formConfig = $omsUtils.analysisForm(data, self.formConfig, '基本信息');
      self.formConfig = $omsUtils.initFormConfig(data.addcolums[0].childs, self.formConfig);

      /* 子表初始化： */
      const subData = await $omsUtils.initSubtable('CP_C_LOGISTICS_ITEM', self.ID, '168321', {
        range: 5000
      });
      self.totalData = subData.rowData;
      self.totalData.map(item => {
        item.repeatKey = item.CP_C_PLATFORM_ENAME + '+' + item.CP_C_LOGISTICS_ECODE
      })
      self.getTableData(self.totalData, 'edit');
      // this.loading = false;
    },
    // 按钮权限
    getBtn() {
      $OMS2.omsUtils.getPermissions(this, 'btnConfig', { table: 'CP_C_LOGISTICS', type: 'OBJ', serviceId: 'r3-oc-oms' }, true).then(res => {
        console.log('buttons::', this.btnConfig.buttons, 'res::', res);
        const { ACTIONS, SUB_ACTIONS } = res;
        const webArr = $OMS2.omsUtils.sonList(SUB_ACTIONS, 'webname');
        this.subTableConfig.businessButtonConfig.buttons.forEach(item => {
          item.isShow = webArr.includes(item.webname);
          SUB_ACTIONS.forEach(it => {
            if (item.webname == it.webname) {
              item.text = it.webdesc;
            }
          });
        });
        this.subTableConfig.key += $OMS2.omsUtils.generateKey();
        console.log('this.subTableConfig.businessButtonConfig.buttons::', this.subTableConfig.businessButtonConfig.buttons);
        this.subTableConfig1.businessButtonConfig.buttons.forEach(item => {
          item.isShow = webArr.includes(item.webname);
          SUB_ACTIONS.forEach(it => {
            if (item.webname == it.webname) {
              item.text = it.webdesc;
            }
          });
        });
        this.subTableConfig1.key += $OMS2.omsUtils.generateKey();
        console.log('this.subTableConfig1.businessButtonConfig.buttons::', this.subTableConfig1.businessButtonConfig.buttons);
      });
    },
    /* -------------------- 详情初始化 end -------------------- */

    /* -------------------- 子表Part start -------------------- */
    getTableData(data, type = 'add') {
      const self = this;
      if (type == 'add') {
        self.addTableData = self.addTableData.concat(data); // 添加
        self.addTableData = $omsUtils.unrepeated(self.addTableData, 'repeatKey'); // 去重，便于保存
      }
      const allArr = self.totalData.concat(data)
      // self.subTableConfig.data = $omsUtils.unrepeated(allArr, 'repeatKey'); // 取差值-展示
      // self.subTableConfig.total += self.subTableConfig.data.length - 1;
      self.totalData = $omsUtils.unrepeated(allArr, 'repeatKey'); // 取差值-展示
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
      self.totalData = $omsUtils.getDifferentArr(allArrs, partNewArrs, 'repeatKey');
      if (!IDS.length && partNewArrs.length) {
        self.addTableData = $omsUtils.getDifferentArr(self.addTableData, partNewArrs, 'repeatKey');
        partNewArrs = [];
        $omsUtils.msgTips(this, 'success', 'ay'); // 删除成功！
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
    // 物流单号解析 添加/删除按钮事件
    nalysisAdd() {
      let data = this.subTableConfig1.data;
      let { PREFIX, SUFFIX } = this.subTableConfig1.businessFormConfig.formValue;
      let COMBINATION = `${PREFIX}${SUFFIX}`;
      if (data.length) {
        if (COMBINATION === '') {
          $omsUtils.msgTips(this, 'warning', 'kd'); // 内容不能为空！
          return;
        }
        if (data.some((item) => { return item.COMBINATION === COMBINATION })) {
          $omsUtils.msgTips(this, 'warning', 'ke'); // 重复数据，不能添加！
          return;
        }
        this.subTableConfig1.data.push({ ID: '-1', PREFIX, SUFFIX, COMBINATION });
      } else {
        this.subTableConfig1.data.push({ ID: '-1', PREFIX, SUFFIX, COMBINATION })
      }
    },
    // 删除
    async nalysisDetale() {
      let tableConfig = this.subTableConfig1
      this.subTableConfig1.data = $omsUtils.getDifferentArr(tableConfig.data, tableConfig.selectionData, 'COMBINATION');
      let arr = tableConfig.selectionData.map((item) => { if (item.ID !== '-1') return item.ID });
      let ids = arr.filter((item) => { return item != undefined });
      if (ids.length) {
        const {
          data: { code, data, message }
        } = await this.service.basicData.deleteFixes({ IDS: ids });
        if (code === 0) {
          this.$Message.success(message);
        }
      }
    },
    /* -------------------- 子表Part end -------------------- */

    // 保存
    async save() {
      console.log('save');
      const self = this;
      const afterForm = self.modify.master;
      /* ========= 保存校验 start ========= */
      const masterArr = Object.keys(self.modify.master);
      // 未修改，不提示，不操作
      if (!masterArr.length && !self.addTableData.length && this.subTableConfig1.length) return false;
      const valueArr = ['ECODE', 'ENAME'];
      const mes = $omsUtils.validatorNotEmpty(self.formConfig, valueArr);
      if (mes) {
        this.$message.error(mes);
        return false;
      }
      /* ========= 保存校验 end ========= */
      const CP_C_LOGISTICS = Object.assign(afterForm, {
        ID: self.ID,
      });
      const CP_C_LOGISTICS_ITEM = self.addTableData;
      const CP_C_LOGISTICS_FIX = self.subTableConfig1.data;
      const param = {
        CP_C_LOGISTICS, // 主表修改信息
        CP_C_LOGISTICS_ITEM, // 子表修改信息
        CP_C_LOGISTICS_FIX
      };
      // this.loading = true;
      const {
        data: {
          code,
          data,
          message
        }
      } = await self.service.basicData.platformSave(param);
      // this.loading = false;
      if (code === 0) {
        if (self.ID !== '-1') {
          this.backable = true;
          this.back();
        } else {
          if (this.formConfig.formValue.TYPE == 'LIST') {
            this.showSubtablePart = true;
          }
          // 数据回显
          self.modify.master = {};
          if (data && data.ID) self.ID = data.ID
          self.$Message.success(message || $i18n.t('modalTips.z9'));
          $omsUtils.tabCloseAppoint(this);
          this.$destroy(true);
          this.$store.commit('global/tabOpen', {
            type: 'tableDetailAction',
            label: $i18n.t('menu.b5'), // 物流公司档案编辑
            customizedModuleName: 'LOGISTICSCOMPANYFILESADDOREDIT',
            customizedModuleId: self.ID
          });
        }
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
          className: 'ark-dialog',
          title: $i18n.t('modalTitle.tips'), // 提示
          content: $i18n.t('modalTips.hu'), // 当前修改未保存，确定返回？
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
      $omsUtils.tabCloseAppoint(this);
      this.$destroy(true);
      this.$store.commit('global/tabOpen', {
        tableId: 10328,
        type: 'S',
        tableName: 'CP_C_LOGISTICS',
        back: true,
      });
    },

    /* --------------- 表格事件 --------------- */
    delTableDetail() { },
    addTableDetail() { },
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
    // 物流单号解析表格事件
    onSelect1(e) {
      this.subTableConfig1.selectionData = e;
    },
    onSelectCancel1(e) {
      this.subTableConfig1.selectionData = e;
    },
    onSelectAll1(e) {
      this.subTableConfig1.selectionData = e;
    },
    onSelectAllCancel1(e) {
      this.subTableConfig1.selectionData = e;
    },

    /* --------------------- 工具函数： --------------------- */
    // 切换Label & 实时渲染subTable
    async labelClick(item) {
      console.log('item', item);
      this.labelDefaultValue = item.value;
      // if(this.$route.params.customizedModuleId != 'New' && this.labelDefaultValue == 'CP_C_LOGISTICS_FIX'){
      //   const subData = await $omsUtils.initSubtable('CP_C_LOGISTICS_FIX', this.ID, '180461');
      //   this.subTableConfig1.data = subData.rowData
      // }
      console.log(this.labelDefaultValue);
      if (this.labelDefaultValue == 'PROPERTYVALUES' || this.labelDefaultValue == 'CP_C_LOGISTICS_FIX') return;
      this.subTableConfig2 = { //basicData
        centerName: 'basicData',
        tablename: this.labelDefaultValue,
        objid: this.ID,
        pageShow: true,
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

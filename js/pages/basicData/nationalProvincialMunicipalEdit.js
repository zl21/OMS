import businessButton from 'professionalComponents/businessButton';
import businessForm from 'professionalComponents/businessForm';
import orderItem from 'professionalComponents/subTable';
import businessLabel from 'professionalComponents/businessLabel';
import loading from 'professionalComponents/loading';

export default {
  name: 'NationalProvincialMunicipalEdit',
  components: {
    businessButton,
    businessForm,
    orderItem,
    businessLabel,
    loading,
  },
  data() {
    return {
      vmI18n:$i18n,
      ID: this.$route.params.customizedModuleId && this.$route.params.customizedModuleId != 'New' ? this.$route.params.customizedModuleId : '-1', // 记录主界面传入的ID
      panelDefaultValue: 'panel_baseInfo', // 设置默认打开'基本信息'
      backable: false,
      loading: false,
      labelList: [{
        label: '操作日志',
        value: 'LOG',
      }, ],
      labelDefaultValue: 'CP_REGION_ALIAS_LOG', // 设置tab默认值
      subTableConfig: {
        centerName: '',
        tablename: '',
        objid: '',
      },
      modify: {
        // 监听并暂存修改的信息，便于调保存的时候传给后端
        master: {}, // 修改后的主表信息
        subTable: [], // 修改后的子表信息
      },
      btnConfig: {
        typeAll: 'default',
        buttons: [{
            text: '保存',
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
      // 新增区域
      formConfig: {
        formData: [{
            style: 'input',
            label: '区域编码',
            value: 'CP_C_REGION_AREA_ECODE',
            colname: 'CP_C_REGION_AREA_ECODE',
            width: '8',
            disabled: true,
            regx: /^(\s*|[0-9]+)$/,
            inputChange: () => {
              // this.masterModifyData('CP_C_REGION_AREA_ECODE', 'master');
            },
          },
          {
            style: 'input',
            label: '区域名称',
            value: 'CP_C_REGION_AREA_ENAME',
            colname: 'CP_C_REGION_AREA_ENAME',
            width: '8',
            disabled: true,
            inputChange: () => {
              // this.masterModifyData('CP_C_REGION_AREA_ENAME', 'master');
            },
          },
          {
            style: 'input',
            label: '别名名称',
            value: 'CP_C_REGION_ALIAS',
            colname: 'CP_C_REGION_ALIAS',
            width: '8',
            disabled: false,
            inputChange: () => {
              this.masterModifyData('CP_C_REGION_ALIAS', 'master');
            },
          },
          {
            style: 'radio',
            label: '区域类型', // 输入框前文字
            value: 'REGION_TYPE', // 输入框的值
            colname: 'REGION_TYPE', // 输入框的值
            width: '18', // 所占的宽度 (宽度分为24份,数值代表所占份数的宽度)
            options: [{
                label: '国家',
                value: '0',
                disabled: true,
              },
              {
                label: '省份',
                value: '1',
                disabled: true,
              },
              {
                label: '市级',
                value: '2',
                disabled: true,
              },
              {
                label: '区级',
                value: '3',
                disabled: true,
              },
            ],
            radioChange: () => {
              const val = this.formConfig.formValue.REGION_TYPE;
              // this.masterModifyData('REGION_TYPE', 'master');
              /* let beforeArr = [];
              let afterArr = [];
              switch (val) {
                case '0':
                  // 选国家，都不可编辑
                  beforeArr = [];
                  afterArr = ['CP_C_REGION_COUNTRY_ID', 'CP_C_REGION_PROVINCE_ID', 'CP_C_REGION_CITY_ID'];
                  this.changeInput(beforeArr, afterArr);
                  break;
                case '1':
                  // 选省份，仅展示国家
                  beforeArr = ['CP_C_REGION_COUNTRY_ID'];
                  afterArr = ['CP_C_REGION_PROVINCE_ID', 'CP_C_REGION_CITY_ID'];
                  this.changeInput(beforeArr, afterArr);
                  break;
                case '2':
                  // 勾选市级时，则只展示“国家、关联省”
                  beforeArr = ['CP_C_REGION_COUNTRY_ID', 'CP_C_REGION_PROVINCE_ID'];
                  afterArr = ['CP_C_REGION_CITY_ID'];
                  this.changeInput(beforeArr, afterArr);
                  break;
                default:
                  // 勾选区级时，则只展示“国家、关联省、关联市”
                  beforeArr = ['CP_C_REGION_COUNTRY_ID', 'CP_C_REGION_PROVINCE_ID', 'CP_C_REGION_CITY_ID'];
                  afterArr = [];
                  this.changeInput(beforeArr, afterArr);
                  break;
              } */
            },
          },
          {
            version: '1.4',
            colname: 'CP_C_REGION_COUNTRY_ENAME',
            style: 'popInput', // 输入框弹框单多选
            width: '8',
            inputList: [],
            itemdata: {
              col: 1,
              colid: 168556, // 当前字段的ID
              colname: 'CP_C_REGION_COUNTRY_ID', // 当前字段的名称
              datelimit: 'all',
              display: 'text', // 显示什么类型，例如xml表示弹窗多选加导入功能，mrp表示下拉多选
              fkdisplay: 'drp', // 外键关联类型
              isfk: true, // 是否有fk键
              isnotnull: false, // 是否必填
              isuppercase: false, // 是否转大写
              length: 65535, // 最大长度是多少
              name: '国家', // 赔付类型
              readonly: true, // 是否可编辑，对应input   readonly属性
              reftable: 'CP_C_COUNTRY', // 对应的表
              reftableid: 10283, // 对应的表ID
              row: 1,
              statsize: -1,
              type: 'STRING', // 这个是后台用的
              valuedata: '', // 这个是选择的值
              pid: '', // 啥 ？？？
            },
            oneObj: (val) => {
              // 选中触发事件
              console.log('val::', val);
              if (!val.pid) return;
              this.formConfig.formValue.CP_C_REGION_COUNTRY_ENAME = val;
              // this.masterModifyData('CP_C_REGION_COUNTRY_ID', 'master');
            },
          },
          {
            version: '1.4',
            colname: 'CP_C_REGION_PROVINCE_ENAME',
            style: 'popInput', // 输入框弹框单多选
            width: '8',
            inputList: [],
            itemdata: {
              col: 1,
              colid: 166974, // 当前字段的ID
              colname: 'PS_C_PRO_ID', // 当前字段的名称
              datelimit: 'all',
              display: 'text', // 显示什么类型，例如xml表示弹窗多选加导入功能，mrp表示下拉多选
              fkdisplay: 'drp', // 外键关联类型
              isfk: true, // 是否有fk键
              isnotnull: false, // 是否必填
              isuppercase: false, // 是否转大写
              length: 65535, // 最大长度是多少
              name: '关联省', // 赔付类型
              readonly: true, // 是否可编辑，对应input   readonly属性
              reftable: 'CP_C_PROVINCE', // 对应的表
              reftableid: 10286, // 对应的表ID
              row: 1,
              statsize: -1,
              type: 'STRING', // 这个是后台用的
              valuedata: '', // 这个是选择的值
              pid: '', // 啥 ？？？
            },
            oneObj: (val) => {
              // 选中触发事件
              console.log('val::', val);
              if (!val.pid) return;
              this.formConfig.formValue.CP_C_REGION_PROVINCE_ENAME = val;
              // this.masterModifyData('CP_C_REGION_PROVINCE_ID', 'master');
            },
          },
          {
            version: '1.4',
            colname: 'CP_C_REGION_CITY_ENAME',
            style: 'popInput', // 输入框弹框单多选
            width: '8',
            inputList: [],
            refcolval: {
              fixcolumn: 'C_UP_ID',
              expre: 'equal',
              srccol: 'RECEIVER_PROVINCE',
            },
            itemdata: {
              col: 1,
              colid: 167077, // 当前字段的ID
              colname: 'CP_C_REGION_CITY_ID', // 当前字段的名称
              datelimit: 'all',
              display: 'text', // 显示什么类型，例如xml表示弹窗多选加导入功能，mrp表示下拉多选
              fkdisplay: 'drp', // 外键关联类型
              isfk: true, // 是否有fk键
              isnotnull: false, // 是否必填
              isuppercase: false, // 是否转大写
              length: 65535, // 最大长度是多少
              name: '关联市', // 赔付类型
              readonly: true, // 是否可编辑，对应input   readonly属性
              reftable: 'CP_C_CITY', // 对应的表
              reftableid: 10285, // 对应的表ID
              row: 1,
              statsize: -1,
              type: 'STRING', // 这个是后台用的
              valuedata: '', // 这个是选择的值
              pid: '', // 啥 ？？？
            },
            oneObj: (val) => {
              // 选中触发事件
              console.log('val::', val);
              if (!val.pid) return;
              this.formConfig.formValue.CP_C_REGION_CITY_ENAME = val;
              // this.masterModifyData('CP_C_REGION_CITY_ID', 'master');
            },
          },
          {
            style: 'input',
            label: '启用状态',
            value: 'ISACTIVE',
            colname: 'ISACTIVE',
            width: '8',
            disabled: true,
            inputChange: () => {
              // this.masterModifyData('ISACTIVE', 'master');
            },
          },
        ],
        formValue: {
          CP_C_REGION_AREA_ECODE: '',
          CP_C_REGION_AREA_ENAME: '',
          CP_C_REGION_ALIAS: '',
          REGION_TYPE: '',
          // CP_C_REGION_COUNTRY_ID: {},
          // CP_C_REGION_PROVINCE_ID: {},
          // CP_C_REGION_CITY_ID: {},
          CP_C_REGION_COUNTRY_ENAME: {},
          CP_C_REGION_PROVINCE_ENAME: {},
          CP_C_REGION_CITY_ENAME: {},
          ISACTIVE: '',
        },
        ruleValidate: {
          /* CP_C_REGION_AREA_ECODE: [{ required: true, message: ' ' }],
          CP_C_REGION_AREA_ENAME: [{ required: true, message: ' ' }],
          CPCREGIONALIAS: [{ required: true, message: ' ' }],
          REGION_TYPE: [{ required: true, message: ' ' }],
          ISACTIVE: [{ required: true, message: ' ' }], */
          CP_C_REGION_ALIAS: [{ required: true, message: ' ' }]
        },
      },
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
    self.initObjItem(self.ID);
    // 子表初始化
    this.subTableConfig = {
      centerName:"basicData",
      tablename: this.labelDefaultValue,
      objid: this.ID,
    };
  },
  created() {},
  methods: {
    /* -------------------- 详情初始化 start -------------------- */
    async initObjItem(id) {
      const self = this;
      const formdata = new FormData();
      formdata.append('id', id);
      this.loading = true;
      const {
        data: {
          code,
          data,
          message
        },
      } = await self.service.basicData.selectregion(formdata).catch(() => {
        this.loading = false;
      });
      if (code === 0) {
        switch (data.REGION_TYPE) {
          case 0:
            self.formConfig.formValue.CP_C_REGION_AREA_ECODE = data.CP_C_REGION_COUNTRY_ECODE || '';
            self.formConfig.formValue.CP_C_REGION_AREA_ENAME = data.CP_C_REGION_COUNTRY_ENAME || '';
            break;
          case 1:
            self.formConfig.formValue.CP_C_REGION_AREA_ECODE = data.CP_C_REGION_PROVINCE_ECODE || '';
            self.formConfig.formValue.CP_C_REGION_AREA_ENAME = data.CP_C_REGION_PROVINCE_ENAME || '';
            break;
          case 2:
            self.formConfig.formValue.CP_C_REGION_AREA_ECODE = data.CP_C_REGION_CITY_ECODE || '';
            self.formConfig.formValue.CP_C_REGION_AREA_ENAME = data.CP_C_REGION_CITY_ENAME || '';
            break;
          case 3:
            self.formConfig.formValue.CP_C_REGION_AREA_ECODE = data.CP_C_REGION_AREA_ECODE || '';
            self.formConfig.formValue.CP_C_REGION_AREA_ENAME = data.CP_C_REGION_AREA_ENAME || '';
            break;
          default:
            break;
        }
        /* const inputArr = ['CP_C_REGION_AREA_ECODE', 'CP_C_REGION_AREA_ENAME', 'CP_C_REGION_ALIAS'];
      for (const key in self.formConfig.formValue) {
        if (inputArr.includes(key)) {
          self.formConfig.formValue[key] = data[key];
        }
      } */
        self.formConfig.formValue.CP_C_REGION_ALIAS = data.CP_C_REGION_ALIAS || '';
        self.formConfig.formValue.REGION_TYPE = data.REGION_TYPE.toString() || '';
        self.formConfig.formValue.ISACTIVE = data.isactive == 'Y' ? '启用' : '停用';
        // const drpArr = ['CP_C_REGION_COUNTRY_ID', 'CP_C_REGION_PROVINCE_ID', 'CP_C_REGION_CITY_ID'];
        const drpArr = ['CP_C_REGION_COUNTRY_ENAME', 'CP_C_REGION_PROVINCE_ENAME', 'CP_C_REGION_CITY_ENAME'];
        self.formConfig.formData.forEach((item) => {
          if (drpArr.includes(item.colname)) {
            item.itemdata.valuedata = data[item.colname];
          }
        });
      }
      this.loading = false;
    },
    /* -------------------- 详情初始化 end -------------------- */

    // 保存
    async save() {

      const self = this;
      /* =========== 保存校验 start =========== */
      /* let valueArr = ['CP_C_REGION_AREA_ECODE', 'CP_C_REGION_AREA_ENAME', 'CPCREGIONALIAS', 'REGION_TYPE', 'ISACTIVE'];
    if (self.formConfig.formValue.REGION_TYPE != '0') {
      valueArr.push('CP_C_REGION_COUNTRY_ID');
    } */
      const masterArr = Object.keys(self.modify.master);
      // 未修改，不提示，不操作
      if (!masterArr.length) return false;
      const valueArr = ['CP_C_REGION_ALIAS'];
      const mes = this.$OMS2.omsUtils.validatorNotEmpty(self.formConfig, valueArr);
      if (mes) {
        this.$message.error(mes);
        return false;
      }
      /* =========== 保存校验 end =========== */
      // const CP_C_REGION_AREA_ECODE = self.formConfig.formValue.CP_C_REGION_AREA_ECODE;
      // const CP_C_REGION_AREA_ENAME = self.formConfig.formValue.CP_C_REGION_AREA_ENAME;
      const CP_C_REGION_ALIAS = self.modify.master.CP_C_REGION_ALIAS;
      // const REGION_TYPE = self.formConfig.formValue.REGION_TYPE;
      // const CP_C_REGION_COUNTRY_ID = self.formConfig.formValue.CP_C_REGION_COUNTRY_ID.pid; // 国家ID
      // const CP_C_REGION_COUNTRY_ENAME = self.formConfig.formValue.CP_C_REGION_COUNTRY_ID.valuedata; //
      // const CP_C_REGION_PROVINCE_ID = self.formConfig.formValue.CP_C_REGION_PROVINCE_ID.pid; // 省ID
      // const CP_C_REGION_PROVINCE_ENAME = self.formConfig.formValue.CP_C_REGION_PROVINCE_ID.valuedata; //
      // const CP_C_REGION_CITY_ID = self.formConfig.formValue.CP_C_REGION_CITY_ID.pid; // 市ID
      // const CP_C_REGION_CITY_ENAME = self.formConfig.formValue.CP_C_REGION_CITY_ID.valuedata; //
      this.loading = true;
      const param = {
        // CP_C_REGION_AREA_ECODE, // 区域编码
        // CP_C_REGION_AREA_ENAME, // 区域名称
        CP_C_REGION_ALIAS,
        // REGION_TYPE, // 省市区类型
        // CP_C_REGION_COUNTRY_ID, // 国家ID
        // CP_C_REGION_COUNTRY_ENAME, //
        // CP_C_REGION_PROVINCE_ID, // 省ID
        // CP_C_REGION_PROVINCE_ENAME, //
        // CP_C_REGION_CITY_ID, // 市ID
        // CP_C_REGION_CITY_ENAME, //
      };
      const {
        data: {
          code,
          data,
          message
        },
      } = await self.service.basicData.saveRegion({
        V_CP_C_REGION_ALIAS: param,
        OBJID: self.ID
      }).catch(() => {
        this.loading = false;
      });
      if (code === 0) {
        if (data) self.ID = data;//"NATIONALPROVINCIALMUNICIPALEDIT"
        self.onOk();
        self.initObjItem(self.ID);
        self.backable = true;
        self.$Message.success(message || $i18n.t('modalTips.z9'));
      }
    },

    // 返回
    back() {
      const self = this;
      if (self.backable) {
        // 保存成功之后返回
        self.onOk();
        return;
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
            self.onOk();
          },
        });
      } else {
        self.onOk();
      }
    },
    onOk() {
      this.$comUtils.tabCloseAppoint(this);
      this.$destroy(true);
      this.$store.commit('global/tabOpen', {
        tableId: 10288,
        type: 'S',
        tableName: 'V_CP_C_REGION_ALIAS',
        label: '国家省市区',
        back: true,
      });
    },
    /* --------------------- 工具函数： --------------------- */
    keyDown(e) {
      // console.log(e);
    },
    // 控制单选展示下拉项
    changeInput(beforeArr, afterArr) {
      this.formConfig.formData.forEach((item) => {
        if (afterArr.includes(item.colname)) {
          item.itemdata.readonly = true;
        }
        if (beforeArr.includes(item.colname)) {
          item.itemdata.readonly = false;
        }
      });
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
  },
};

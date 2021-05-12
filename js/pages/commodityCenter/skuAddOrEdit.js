import businessButton from 'professionalComponents/businessButton';
import businessForm from 'professionalComponents/businessForm';
import businessLabel from 'professionalComponents/businessLabel';
import businessStatusFlag from 'professionalComponents/businessStatusFlag';
import dateUtil from '@/assets/js/__utils__/date.js';
import publicMethodsUtil from '@/assets/js/public/publicMethods.js';
import orderItem from 'professionalComponents/subTable';
import loading from 'professionalComponents/loading';

export default {
  name: 'skuAddOrEdit',
  components: {
    orderItem,
    businessButton,
    businessForm,
    businessLabel,
    businessStatusFlag,
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
        return callback(new Error('!'));
      }
    };
    /* -------------------- input校验器 end -------------------- */
    return {
      vmI18n: window.vmI18n,
      subTableConfig: {
        centerName: '',
        tablename: '',
        objid: '',
      },
      forceFresh: 0,
      ID: this.$route.params.customizedModuleId && this.$route.params.customizedModuleId != 'New' ? this.$route.params.customizedModuleId : '-1', // 记录主界面传入的ID
      isModal: false,
      showSubtablePart: false,
      watchChange: false, // 监听修改变化
      modify: {
        // 监听并暂存修改的信息，便于调保存的时候传给后端
        master: {}, // 修改后的主表信息 + 固定属性信息
        exAttr: {}, // 修改后的自定义属性信息
      },
      loading: false,
      backable: false,
      spuID: '', // SPU编码对应的ID
      skuID: '',
      imgIndex: 0,
      spec01Data: {
        totalRowCount: 0, // 数据总条数
        autoData: [], // 模糊搜索的数据
        data: {}, // 下拉气泡表格里数据
      },
      spec02Data: {
        totalRowCount: 0, // 数据总条数
        autoData: [], // 模糊搜索的数据
        data: {}, // 下拉气泡表格里数据
      },
      spec03Data: {
        totalRowCount: 0, // 数据总条数
        autoData: [], // 模糊搜索的数据
        data: {}, // 下拉气泡表格里数据
      },
      popTableBaseData: {
        "start": 0,
        "tabth": [
          {
            "colname": "ID",
            "name": "ID",
            "isak": false
          },
          {
            "colname": "ECODE",
            "name": "编码",
            "isak": false
          },
          {
            "colname": "ENAME",
            "name": "名称",
            "isak": true
          }
        ],
        "row": []
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
          text: window.vmI18n.t('btn.back'),
          btnclick: () => {
            this.back()
          },
        },
        ],
      },
      dataitem: {
        url: '/p/cs/upload2',
        sendData: {
          path: 'AC_F_PAYABLE_ADJUSTMENT/-1/',
        },
        width: 250,
        height: 170,
        colname: 'IMAGE',
        name: window.vmI18n.t('other.uploadVoucher'), // 上传凭证
        readonly: false,
        valuedata: [],
      },
      // 主表Part-formConfig
      formConfig: {
        formData: [{
          colname: 'PS_C_PRO_ID',
          style: 'popInput', // 输入框弹框单多选
          width: '8',
          itemdata: {
            colid: '165990',
            colname: 'PS_C_PRO_ID',
            name: "SPU编码",
            valuedata: '',
            pid: '',
            fkdisplay: 'drp',
            isfk: true,
            isnotnull: true,
            readonly: true,
          },
          oneObj: (val) => {
            // 选中触发事件
            console.log('val::', val);
            if (!val.pid) return;
            this.spuID = val.pid;
            this.formConfig.formValue.PS_C_PRO_ID = val.valuedata;
            this.masterModifyData('PS_C_PRO_ID', 'master');
            this.renderProperties(val);
          },
        },
        {
          colname: 'ECODE',
          width: '8',
          style: 'input',
          regx: /^(\s*|[A-Za-z0-9]+)$/,
          placeholder: 'Only numbers and letters',
          inputChange: () => {
            this.masterModifyData('ECODE', 'master');
          },
        },
        {
          colname: 'ENAME',
          width: '8',
          style: 'input',
          regx: /^(\s*|[\u4E00-\u9FA5A-Za-z0-9_]+)$/,
          inputChange: () => {
            this.masterModifyData('ENAME', 'master');
          },
        },
        {
          colname: 'SALES_STATUS',
          width: '8',
          style: 'select', // 下拉框类型
          selectChange: (value) => {
            this.masterModifyData('SALES_STATUS', 'master');
          },
        },
        {
          colname: 'PURCHASE_STATUS',
          style: 'select', // 下拉框类型
          width: '8', // 所占宽度宽度
          selectChange: (value) => {
            this.masterModifyData('PURCHASE_STATUS', 'master');
          },
        },
        {
          colname: 'UNIT',
          width: '8',
          style: 'input',
          inputChange: () => {
            this.masterModifyData('UNIT', 'master');
          },
        },
        {
          style: 'dynamic',
          colname: 'ISACTIVE',
          width: '8',
          class: 'statusInput',
        },
        {
          style: 'textarea',
          colname: 'SPEC_REMARK',
          width: '24',
          inputChange: () => {
            this.masterModifyData('SPEC_REMARK', 'master');
          },
        },
        {
          colname: 'PRICE_RETAIL',
          width: '8',
          style: 'input',
          regx: /^(\s*|\d+(\.\d{0,2})?)$/,
          inputChange: () => {
            this.masterModifyData('PRICE_RETAIL', 'master');
          },
        },
        {
          colname: 'PRICE_COST',
          width: '8',
          style: 'input',
          regx: /^(\s*|\d+(\.\d{0,2})?)$/,
          inputChange: () => {
            this.masterModifyData('PRICE_COST', 'master');
          },
        },
        {
          colname: 'PRICE_PURCHASE',
          width: '8',
          style: 'input',
          regx: /^(\s*|\d+(\.\d{0,2})?)$/,
          inputChange: () => {
            this.masterModifyData('PRICE_PURCHASE', 'master');
          },
        },
        {
          colname: 'LENGTH',
          width: '8',
          style: 'input',
          regx: /^(\s*|\d+(\.\d{0,2})?)$/,
          inputChange: () => {
            this.masterModifyData('LENGTH', 'master');
          },
        },
        {
          colname: 'HEIGHT',
          width: '8',
          style: 'input',
          regx: /^(\s*|\d+(\.\d{0,2})?$)/,
          inputChange: () => {
            this.masterModifyData('HEIGHT', 'master');
          },
        },
        {
          colname: 'WIDTH',
          width: '8',
          style: 'input',
          regx: /^(\s*|\d+(\.\d{0,2})?$)/,
          inputChange: () => {
            this.masterModifyData('WIDTH', 'master');
          },
        },
        {
          colname: 'GROSS_WEIGHT',
          width: '8',
          style: 'input',
          regx: /^(\s*|\d+(\.\d{0,2})?$)/,
          inputChange: () => {
            this.masterModifyData('GROSS_WEIGHT', 'master');
          },
        },
        {
          colname: 'NET_WEIGHT',
          width: '8',
          style: 'input',
          regx: /^(\s*|\d+(\.\d{0,2})?$)/,
          inputChange: () => {
            this.masterModifyData('NET_WEIGHT', 'master');
          },
        },
        {
          colname: 'PS_C_SPECOBJ1_ID',
          defVal: 'PS_C_SPECGROUP_ID1',
          style: 'dynamic',
          slotName: 'spec01',
          width: '6',
          pageSize: 10, // 每页条数
          columns: ['name', 'value'],// 展现的组
          changePage: (val) => {
            this.renderSpecificationDimension(val, 10, 1)
          },
          inputValueChange: (val) => {
            this.renderSpecificationDimension(1, 10, 1, val)
          },
          fkrpSelected: (val) => {
            this.formConfig.formValue.PS_C_SPECOBJ1_ID = val[0].ID;
            this.masterModifyData('PS_C_SPECOBJ1_ID', 'master');
          },
          clearInput: () => {
            this.formConfig.formValue.PS_C_SPECOBJ1_ID = '';
          },
          popShow: () => {
            const self = this;
            self.renderSpecificationDimension(1, 10, 1)
          },
        },
        {
          colname: 'PS_C_SPECOBJ2_ID',
          defVal: 'PS_C_SPECGROUP_ID2',
          style: 'dynamic',
          slotName: 'spec01',
          width: '6',
          pageSize: 10, // 每页条数
          columns: ['name', 'value'],
          changePage: (val) => {
            this.renderSpecificationDimension(val, 10, 2)
          },
          inputValueChange: (val) => {
            this.renderSpecificationDimension(1, 10, 2, val)
          },
          fkrpSelected: (val) => {
            this.formConfig.formValue.PS_C_SPECOBJ2_ID = val[0].ID;
            this.masterModifyData('PS_C_SPECOBJ2_ID', 'master');
          },
          clearInput: () => {
            this.formConfig.formValue.PS_C_SPECOBJ2_ID = '';
          },
          popShow: () => {
            const self = this;
            self.renderSpecificationDimension(1, 10, 2)
          },
        },
        {
          colname: 'PS_C_SPECOBJ3_ID',
          defVal: 'PS_C_SPECGROUP_ID3',
          style: 'dynamic',
          slotName: 'spec01',
          width: '6',
          pageSize: 10, // 每页条数
          columns: ['name', 'value'],// 展现的组
          changePage: (val) => {
            this.renderSpecificationDimension(val, 10, 3)
          },
          inputValueChange: (val) => {
            this.renderSpecificationDimension(1, 10, 3, val)
          },
          fkrpSelected: (val) => {
            this.formConfig.formValue.PS_C_SPECOBJ3_ID = val[0].ID;
            this.masterModifyData('PS_C_SPECOBJ3_ID', 'master');
          },
          clearInput: () => {
            this.formConfig.formValue.PS_C_SPECOBJ3_ID = '';
          },
          popShow: () => {
            const self = this;
            self.renderSpecificationDimension(1, 10, 3)
          },
        },
        ],
        formValue: {
          PS_C_SPECOBJ1_ID: '',
          PS_C_SPECOBJ2_ID: '',
          PS_C_SPECOBJ3_ID: '',
          PS_C_SPECGROUP_ID1: {
            "totalRowCount": 0,
            autoData: [],
            defaultSelected: [],
          },
          PS_C_SPECGROUP_ID2: {
            "totalRowCount": 0,
            autoData: [],
            defaultSelected: [],
          },
          PS_C_SPECGROUP_ID3: {
            "totalRowCount": 0,
            autoData: [],
            defaultSelected: [],
          },
        },
        ruleValidate: {
          ECODE: [{ required: true, message: " " }],
          ENAME: [{ required: true, message: " " }],
          PRICE_RETAIL: [{ required: true, message: " " }],
        },
      },
      // 固定属性Part-formConfig
      fixAttrFormConfig: {
        formData: [],
        formValue: {},
        ruleValidate: {},
      },
      // 自定义属性Part-formConfig
      cusAttrFormConfig: {
        formData: [],
        formValue: {},
        ruleValidate: {},
      },
      // tab切换配置
      labelList: [
        /* {
                  label: '自定义属性',
                  value: 'PROPERTY',
                }, */
        {
          label: '备用条码',
          value: 'PS_C_ALTERNATE_SKU',
        },
        {
          label: '操作日志',
          value: 'PS_C_ALTERNATE_SKU_1',
        },
      ],
      labelDefaultValue: 'PS_C_ALTERNATE_SKU', // 设置tab默认值，默认展示'备用条码'
      panelDefaultValue: ['panel_baseInfo', 'panel_cusAttr'], // 设置默认打开'基础信息'
    };
  },
  watch: {},
  computed: {
    customizedModuleName() {
      return this.$router.currentRoute.params.customizedModuleName;
    },
  },
  mounted() {
    const self = this;
    self.dataitem.url = self.$OMS2.omsUtils.splicingGateWay('commodityCenter', '/p/cs/upload2')
    if (self.ID > 0 && !self.$route.query.spuid) {
      // 详情
      self.initObjItem(self.ID);
    } else if (self.ID > 0 && self.$route.query.spuid) {
      // 是SPU新增/详情 跳转过来的新增
      self.labelList.splice(1, 2);
      self.spuID = self.$route.query.spuid;
      self.initObjItem('-1');
      self.renderProperties({
        valuedata: self.$route.query.spucode
      });
    } else {
      // 新增
      // this.getSelectData(); // 初始化下拉选项
      self.initObjItem(self.ID);
      self.labelList.splice(1, 2);
    }
  },
  created() {
    // this.formConfig.formData.find(it => it.colname == 'PS_C_SPECGROUP_ID1').itemdata.defaultSelected = this.formConfig.formValue.PS_C_SPECGROUP_ID1;
  },
  methods: {
    /* -------------------- 详情初始化 start -------------------- */
    async initObjItem(id) {
      const self = this;
      this.loading = true;
      const data = await this.$OMS2.omsUtils.getObject('PS_C_SKU', id);
      // this.watchChange = false;
      self.formConfig = this.$OMS2.omsUtils.initFormConfig(data.addcolums[0].childs, self.formConfig);
      // self.formConfig = this.$OMS2.omsUtils.analysisForm(data, self.formConfig, '基础信息', ['SALES_STATUS', 'PURCHASE_STATUS']);
      if (self.ID > 0 && self.$route.query.spuid) {
        self.formConfig.formData[0].itemdata.valuedata = self.$route.query.spucode;
      }
      // 初始化规格维度的spec01Data
      const specGroupArr = ['spec01Data', 'spec02Data', 'spec03Data'];
      const specGroupArrP = ['PS_C_SPECGROUP_ID1', 'PS_C_SPECGROUP_ID2', 'PS_C_SPECGROUP_ID3'];
      // 1、this上
      /* specGroupArr.forEach(it => {
        this[it].data = JSON.parse(JSON.stringify(this.popTableBaseData));
      }) */
      // 2、formData上
      /* self.formConfig.formData.forEach(it => {
        if (specGroupArrP.includes(it.colname)) {
          it.data = JSON.parse(JSON.stringify(this.popTableBaseData));
        }
      }) */
      // 3、formValue上
      specGroupArrP.forEach(it => {
        this.formConfig.formValue[it].data = JSON.parse(JSON.stringify(this.popTableBaseData));
      })
      const defValArr = ['PS_C_SPECOBJ1_ID', 'PS_C_SPECOBJ2_ID', 'PS_C_SPECOBJ3_ID'];
      this.formConfig.formData.forEach(item => {
        if (defValArr.includes(item.colname)) {
          let itemV = this.formConfig.formValue[item.colname] ? JSON.parse(JSON.stringify(this.formConfig.formValue[item.colname])) : '';
          // itemV = { pid: 38, valuedata: 'B1' };
          let itemDefV = [];
          itemDefV.push(itemV);
          itemDefV = itemDefV.map(it => ({ "ID": it.pid * 1, "Label": it.valuedata }))
          this.formConfig.formValue[item.defVal].defaultSelected = itemDefV;
        }
      })

      // 渲染图片
      if (data.addcolums[0].childs[0].valuedata) {
        const imgData = JSON.parse(data.addcolums[0].childs[0].valuedata)
        self.dataitem.valuedata.push(...imgData);
      }
      // 展示Form：启用状态
      if (self.ID > 0) {
        self.formConfig.formData.forEach(item => {
          if (item.colname == 'ISACTIVE') {
            item.style = 'select'
          }
        });
      }
      // 动态渲染'自定义属性' / 新增需求:渲染'规格维度一、二、三'
      if (self.formConfig.formValue.PS_C_PRO_ID) {
        const val = self.formConfig.formValue.PS_C_PRO_ID;
        await self.renderProperties(val);
      }
      self.subTableConfig = {
        centerName: 'commodityCenter',
        tablename: this.labelDefaultValue,
        objid: this.ID,
      }
      this.forceFresh += 1;
      this.loading = false;
      setTimeout(() => {
        this.watchChange = true;
      }, 10);
    },
    /* -------------------- 详情初始化 end -------------------- */

    /* -------------------- 动态渲染自定义属性、规格维度123 Part start -------------------- */
    /**
     * @method 处理接口返回的Form结构（动态渲染自定义属性/固定属性的Form）
     * @arr 待处理的数组
     * @targetFormConfig 待生成的formConfig
     */
    dealForm(_this, arr, targetFormConfig) {
      const self = _this;
      self[targetFormConfig].formData = arr;
      self[targetFormConfig].formData.forEach((item) => {
        // 为formData的每一项添加value、selectChange等属性
        item.value = item.colname.toString();
        if (item.style == 'input') {
          item.inputChange = () => {
            if (item.attrType = 'fix') {
              // 固定属性和主表Part的form一起放在'PsSku'里面传
              console.log(self[targetFormConfig].formValue[item.colname]);
              this.masterModifyData(item.colname, 'master', 'FIX');
            } else {
              this.masterModifyData(item.colname, 'exAttr', 'EX');
            }
          };
        } else {
          item.selectChange = () => {
            if (item.attrType = 'fix') {
              // 固定属性和主表Part的form一起放在'PsSku'里面传
              this.masterModifyData(item.colname, 'master', 'FIX');
            } else {
              this.masterModifyData(item.colname, 'exAttr', 'EX');
            }
          };
        }
      });
      self[targetFormConfig].formData.forEach((item) => {
        self[targetFormConfig].formValue[item.colname.toString()] = item.valuedata;
      });
    },
    /**
     * @method 规格维度123,下拉/模糊搜索 时填充popData
     */
    async renderSpecificationDimension(pageIndex = 1, pageSize = 10, DIMENSION = 1, NAME = '') {
      const self = this;
      const param = {
        PS_C_PRO_ID: self.spuID,
        pageNumber: pageIndex,
        pageSize: pageSize,
        DIMENSION: DIMENSION, // 规格值文本框（规格维度一传1，规格维度二传2，规格维度三传3）
        NAME: NAME, // 模糊查询输入的string
      };
      const {
        data: {
          code,
          data,
          message
        },
      } = await this.service.commodityCenter.skuSelSpecobj(param).catch(() => { });
      if (code == 0 && (Object.keys(data)).length) {
        // 1、挂在this上：
        // const key = `spec0${DIMENSION}Data`;
        // this[key].data.row = data.DATA.map(it => ({ ECODE: { val: it.ECODE }, ENAME: { val: it.ENAME }, ID: { val: it.ID } }))
        // this[key].totalRowCount = data.COUNT;
        // this[key].autoData = data.DATA;
        // 2、挂在formValue上：
        const key = `PS_C_SPECGROUP_ID${DIMENSION}`;
        this.formConfig.formValue[key].data.row = data.DATA.map(it => ({ ECODE: { val: it.ECODE }, ENAME: { val: it.ENAME }, ID: { val: it.ID } }))
        this.formConfig.formValue[key].totalRowCount = data.COUNT;
        if (NAME) this.formConfig.formValue[key].autoData = data.DATA;
        // this.formConfig.formValue[key].defaultSelected = [];
        // 3、挂在formData上：
        // this.formConfig.formData.find(it => it.colname == key).data.row = this[`popData${DIMENSION}`];
      }


    },
    /**
     * @method 按查询条件渲染
     *  1. 有固定属性则在主表位置 渲染固定属性
     *  2. 有自定义属性则在子表位置 渲染自定义属性，反之则不渲染此label
     *  3. 新增时只展示‘自定义属性’这个Label
     *  4. 动态渲染规格维度(展示在主表位置)
     * */
    async renderProperties(val) {
      if (!val.valuedata) return false;
      const proCode = val.valuedata; // 选中行的spuCode {'coffee'}
      const classId = '10'; // sku页面不传（商品分类ID）{'10'}
      const skuCode = this.formConfig.formValue.ECODE || ''; // 定义成全局的 新增时没有，可传空
      let skuId = this.skuID; // 新增时没有，可传空
      if (this.ID > 0) {
        skuId = this.ID;
      }
      const param = {
        tableName: 'ps_c_sku',
        proCode,
        skuCode, // 该条明细的skuCode，新增时没有，传空字符串
        skuId,
      };
      this.loading = true;
      const {
        data: {
          code,
          data,
          message
        },
      } = await this.service.commodityCenter.queryAttributeSku(param).catch(() => {
        this.loading = false;
      });
      this.loading = false;
      if (code == 0 && (Object.keys(data)).length) {
        this.showSubtablePart = true;
        data.FIXED.forEach((item) => {
          item.attrType = 'fix';
        });
        // let customAttr = data.FIXED.concat(data.EXTRA);
        this.watchChange = false;
        this.dealForm(this, data.FIXED, 'fixAttrFormConfig'); // 固定属性
        this.dealForm(this, data.EXTRA, 'cusAttrFormConfig'); // 自定义属性
        this.formConfig.formData.forEach(it => {
          if (data.DIMENSION.includes(it.defVal)) {
            // it.style = 'DropDownSelectFilter';
            it.style = 'formCompile';
            // 动态渲染规格维度
            const dimension = it.defVal.slice(-1, 18) * 1;
            if (this.ID == '-1' || this.$route.query.spuid) {
              this.renderSpecificationDimension(1, 10, dimension); // 需要初始化
            }
          }
        })
        this.watchChange = true;
      } else {
        // 走框架错误提示
        // this.$Message.warning(message);
      }
    },
    /* -------------------- 动态渲染自定义属性、规格维度123 Part end -------------------- */

    /* -------------------- 图片处理 start -------------------- */
    // 删除图片
    deleteImg(imgInfo, imgIndex) {
      this.imgIndex = imgIndex;
      this.isModal = true;
    },
    // 弹框-确认删除图片
    deleteImgBySure() {
      this.dataitem.valuedata.splice(this.imgIndex - 1, 1);
      this.formConfig.formValue.IMAGE = this.dataitem.valuedata;
      this.modify.master.IMAGE = this.dataitem.valuedata;
    },
    // 图片上传成功的处理
    uploadFileChangeSuccess(res) {
      const self = this;
      self.dataitem.valuedata.push({
        name: res.data.Name,
        URL: res.data.Url,
      });
      self.formConfig.formValue.IMAGE = self.dataitem.valuedata;
      self.modify.master.IMAGE = self.dataitem.valuedata;
    },
    /* -------------------- 图片处理 end -------------------- */

    // 保存
    async save() {
      const self = this;
      /* =========== 保存校验 start =========== */
      const masterArr = Object.keys(self.modify.master);
      const exAttr = Object.keys(self.modify.exAttr);
      // 未修改，不提示，不操作
      if (!masterArr.length && !exAttr.length) return false;
      const valueArr = ['ECODE', 'ENAME', 'PRICE_RETAIL'];
      const drpArr = ['PS_C_PRO_ID'];
      const mes = this.$OMS2.omsUtils.validatorNotEmpty(self.formConfig, valueArr, drpArr);
      if (mes !== 1) {
        this.$message.error(mes);
        return false;
      }
      /* =========== 保存校验 end =========== */
      let EXTRA = [];
      let PsSku = self.modify.master;
      PsSku.PS_C_PRO_ID = self.spuID; // 特别地，后端要的是ID不是ECODE (即'coffee对应的id')
      PsSku.IMAGE = JSON.stringify(self.modify.master.IMAGE);
      for (const key in PsSku) {
        // 字段是空字符串时不传
        if (PsSku[key] == '') {
          delete PsSku[key];
        }
      }
      for (const key in self.modify.exAttr) {
        EXTRA.push({
          attributeId: key,
          attributeItem: afterExPro[key] ? afterExPro[key] : ''
        });
      }
      if (self.$route.query.spuid) this.ID = '-1';
      const param = {
        objid: this.ID,
        table: 'PS_C_SKU',
        PsSku, // 主表修改信息
        EXTRA, // 子表修改信息
      };
      this.loading = true;
      const {
        data: {
          code,
          data,
          message
        },
      } = await self.service.commodityCenter.operateSku(param).catch(() => {
        this.loading = false;
      });
      this.loading = false;
      if (code === 0) {
        this.backable = true;
        self.$Message.success(message || window.vmI18n.t('modalTips.z9'));
        self.modify.master = {};
        self.modify.exAttr = {};
        // 数据回显
        if (data) self.ID = data;
        await self.initObjItem(self.ID);
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
          title: self.vmI18n.t('modalTitle.tips'), // 提示
          content: '当前修改未保存，确定返回？',
          mask: true,
          showCancel: true,
          okText: self.vmI18n.t('common.determine'), // 确定
          cancelText: self.vmI18n.t('common.cancel'), // 取消
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
      if (this.$route.query.spuid) {
        this.$store.commit('customize/TabOpen', {
          id: this.$route.query.spuid,
          type: 'action',
          name: 'PS_C_PRO',
          label: 'SPU编辑',
        });
      } else {
        this.$store.commit('global/tabOpen', {
          tableId: 10105,
          type: 'S',
          tableName: 'PS_C_SKU',
          label: '商品SKU',
          back: true,
        });
      }
    },

    /* --------------------- 工具函数： --------------------- */
    // 切换Label & 实时渲染subTable
    labelClick(item) {
      this.labelDefaultValue = item.value;
      if (this.labelDefaultValue == 'PS_C_ALTERNATE_SKU') return;
      this.subTableConfig = {
        centerName: 'commodityCenter',
        tablename: this.labelDefaultValue,
        objid: this.ID,
      };
    },
    // 填充下拉选项框
    async getSelectData() {
      const self = this;
      self.formConfig.formData = await publicMethodsUtil.getTypeList('PS_C_SKU', ['SALES_STATUS', 'PURCHASE_STATUS'], '基础信息', self.formConfig);
    },
    /**
     * 记录主表修改信息方法
     * @ecode 记录字段
     * @obj 修改值暂存在modify下的某个对象中
     */
    masterModifyData(ecode, obj, type = 'S') {
      const self = this;
      if (!self.watchChange) return;
      switch (type) {
        case "EX":
          self.modify[obj][ecode] = self.cusAttrFormConfig.formValue[ecode];
          break;
        case "FIX":
          self.modify[obj][ecode] = self.fixAttrFormConfig.formValue[ecode];
          break;
        default:
          self.modify[obj][ecode] = self.formConfig.formValue[ecode];
          break;
      }
    },
    keyDown(e) {
      // console.log(e);
    },
    // 时间戳格式化
    formatDate(time) {
      const date = new Date(time);
      return dateUtil.getFormatDate(date, 'yyyy-MM-dd HH:mm:ss');
    },
  },
};

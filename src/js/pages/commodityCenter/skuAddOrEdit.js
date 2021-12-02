import modifycurrentLabel from '../../../assets/js/mixins/modifycurrentLabel';

export default {
  mixins: [new modifycurrentLabel()],
  data() {
    return {
      subTableConfig: {},
      forceFresh: 0,
      // ID: this.$route.params.customizedModuleId && this.$route.params.customizedModuleId != 'New' ? this.$route.params.customizedModuleId : '-1', // 记录主界面传入的ID
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
      specList: ['spec01', 'spec02', 'spec03'],
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
        btnsite: 'right',
        typeAll: 'default',
        buttons: [{
          webname: 'SKU_SaveBtn',
          text: $it('btn.save'), // 保存
          size: '', // 按钮大小
          disabled: false, // 按钮禁用控制
          btnclick: () => {
            this.save();
          },
        },
        {
          webname: 'fix_back',
          text: $it('btn.back'),
          btnclick: () => {
            this.back()
          },
        },
        ],
      },
      imageValue: '',
      http: $network,
      dataitem: {
        url: '/p/cs/upload2',
        sendData: {
          path: 'AC_F_PAYABLE_ADJUSTMENT/-1/',
        },
        colname: 'IMAGE',
        name: $it('other.uploadVoucher'), // 上传凭证
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
            name: $it('table_label.itemNo01'), // SPU编码
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
            // if (!val.pid) return;
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
          // regx: /^(\s*|[A-Za-z0-9]+)$/,
          // regx: /^(\s*|[\u4E00-\u9FA5A-Za-z0-9_]+)$/,
          // placeholder: 'Only numbers and letters',
          inputChange: () => {
            this.masterModifyData('ECODE', 'master');
          },
        },
        {
          colname: 'ENAME',
          width: '8',
          style: 'input',
          // regx: /^(\s*|[\u4E00-\u9FA5A-Za-z0-9_]+)$/,
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
          style: 'textarea',
          colname: 'SPEC_REMARK',
          width: '24',
          maxlength: 255,
          inputChange: () => {
            this.masterModifyData('SPEC_REMARK', 'master');
          },
        },
        {
          style: '',
          colname: 'ISACTIVE',
          width: '8',
          class: 'statusInput',
          disabled: true,
        },
        {
          // colname: 'PS_C_SPECOBJ1_ID',
          defVal: 'PS_C_SPECGROUP_ID1',
          // style: 'dynamic',
          style: '',
          // slotName: 'spec01',
          width: '8',
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
            this.masterModifyData('PS_C_SPECOBJ1_ID', 'master');
          },
          popShow: () => {
            const self = this;
            self.renderSpecificationDimension(1, 10, 1)
          },
        },
        {
          // colname: 'PS_C_SPECOBJ2_ID',
          defVal: 'PS_C_SPECGROUP_ID2',
          style: '',
          // slotName: 'spec02',
          width: '8',
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
            this.masterModifyData('PS_C_SPECOBJ2_ID', 'master');
          },
          popShow: () => {
            const self = this;
            self.renderSpecificationDimension(1, 10, 2)
          },
        },
        {
          // colname: 'PS_C_SPECOBJ3_ID',
          defVal: 'PS_C_SPECGROUP_ID3',
          style: '',
          // slotName: 'spec03',
          width: '8',
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
            this.masterModifyData('PS_C_SPECOBJ3_ID', 'master');
          },
          popShow: () => {
            const self = this;
            self.renderSpecificationDimension(1, 10, 3)
          },
        },
        ],
        formValue: {
          PS_C_PRO_ID: '',
          ECODE: '',
          ENAME: '',
          PURCHASE_STATUS: '',
          SALES_STATUS: '',
          UNIT: '',
          ISACTIVE: '',
          SPEC_REMARK: '',
          PRICE_RETAIL: '',
          PRICE_COST: '',
          PRICE_PURCHASE: '',
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
      formConfigWuLi: {
        key: 'wuli',
        formData: [
          {
            colname: 'LENGTH',
            width: '8',
            style: 'input',
            disabled: false,
            // regx: /^(\s*|\d+(\.\d{0,2})?)$/,
            inputChange: () => {
              this.masterModifyData('LENGTH', 'master', 'wuLi');
            },
          },
          {
            colname: 'HEIGHT',
            width: '8',
            style: 'input',
            // regx: /^(\s*|\d+(\.\d{0,2})?$)/,
            inputChange: () => {
              this.masterModifyData('HEIGHT', 'master', 'wuLi');
            },
          },
          {
            colname: 'WIDTH',
            width: '8',
            style: 'input',
            // regx: /^(\s*|\d+(\.\d{0,2})?$)/,
            inputChange: () => {
              this.masterModifyData('WIDTH', 'master', 'wuLi');
            },
          },
          {
            colname: 'GROSS_WEIGHT', // 毛重
            width: '8',
            style: 'input',
            // regx: /^(\s*|\d+(\.\d{0,2})?$)/,
            inputChange: () => {
              this.masterModifyData('GROSS_WEIGHT', 'master', 'wuLi');
            },
          },
          {
            colname: 'NET_WEIGHT', // 净重
            width: '8',
            style: 'input',
            // regx: /^(\s*|\d+(\.\d{0,2})?$)/,
            inputChange: () => {
              this.masterModifyData('NET_WEIGHT', 'master', 'wuLi');
            },
          },
        ],
        formValue: {
          LENGTH: '',
          HEIGHT: '',
          WIDTH: '',
          GROSS_WEIGHT: '',
          NET_WEIGHT: '',
        },
        ruleValidate: {},
      },
      specGroupArrP: ['PS_C_SPECGROUP_ID1', 'PS_C_SPECGROUP_ID2', 'PS_C_SPECGROUP_ID3'],
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
          label: $it('panel_label.as'), // 备用条码
          value: 'PS_C_ALTERNATE_SKU',
        },
        {
          label: $it('panel_label.operationLog'), // 操作日志
          value: 'PS_C_SKU_LOG',
        },
      ],
      labelDefaultValue: 'PS_C_ALTERNATE_SKU', // 设置tab默认值，默认展示'备用条码'
      panelDefaultValue: ['panel_baseInfo', 'panel_wuli', 'panel_fixAttr', 'panel_cusAttr'], // 设置默认打开'基础信息'
    };
  },
  watch: {},
  computed: {
    ID() {
      const spu = this.$route.query.spuid || this.$route.query.spucode;
      let id = this.$route.params.customizedModuleId && this.$route.params.customizedModuleId != 'New' ? this.$route.params.customizedModuleId : '-1'; // 记录主界面传入的ID
      if (spu) { id = '-1'; }
      return id
    },
    customizedModuleName() {
      return this.$router.currentRoute.params.customizedModuleName;
    },
  },
  activated() {
    if (this.ID > 0) {
      this.getBtn();
    }
  },
  mounted() {
    const self = this;
    self.dataitem.url = $omsUtils.splicingGateWay('commodityCenter', '/p/cs/upload2')
    if (self.ID > 0 && !self.$route.query.spuid) {
      // 详情
      this.getBtn();
      self.initObjItem(self.ID);
    } else if (self.$route.query.spuid) {
      // 是SPU新增/详情 跳转过来的新增
      self.labelList.splice(1, 2);
      self.initObjItem('-1');
      self.renderProperties({
        valuedata: self.$route.query.spucode
      });
    } else {
      // 新增
      self.initObjItem(self.ID);
      self.labelList.splice(1, 2);
    }
  },
  created() {
    this.$route.query.spuid && (this.spuID = this.$route.query.spuid)
  },
  methods: {
    getBtn() {
      $OMS2.omsUtils.getPermissions(this, 'btnConfig', { table: 'PS_C_SKU', type: 'OBJ', serviceId: 'r3-oc-oms' }, true).then(res => {
        console.log('buttons::', this.btnConfig.buttons, 'res::', res);
      })
    },
    /* -------------------- 详情/SPU新增SKU 初始化 start -------------------- */
    async initObjItem(id) {
      const self = this;
      this.loading = true;
      await $omsUtils.getObject("PS_C_SKU", id).then(data => {
        // 初始化《基础信息》
        let base = data.addcolums.find(it => it.parentname == "(PS_C_SKU.ID+10)").childs;
        self.formConfig = self.$OMS2.omsUtils.initFormConfig(base, self.formConfig);
        if (base[0].valuedata) { // 渲染图片
          const imgData = JSON.parse(data.addcolums[0].childs[0].valuedata)
          self.dataitem.valuedata.push(...imgData);
        }
        return data
      }).then((data) => {
        // 初始化《物理属性》
        let wuli = data.addcolums.find(it => it.parentname == "(PS_C_SKU.ID+20)").childs;
        self.formConfigWuLi = self.$OMS2.omsUtils.initFormConfig(wuli, self.formConfigWuLi);
        self.formConfigWuLi.key += 1;
        return data
      }).then((data) => {
        /* 详情页信息渲染 */
        // 1. SPU编码默认值赋值：
        if (self.ID > 0 && self.$route.query.spuid && !self.$route.query.isSpuSave) {
          self.formConfig.formData[0].itemdata.valuedata = self.$route.query.spucode;
          self.formConfig.formData[0].itemdata.readonly = true;
          self.spuID = self.$route.query.spucode;
        } else {
          self.spuID = self.formConfig.formValue.PS_C_PRO_ID.pid || '';
        }
        // 2. 规格名称默认值赋值：
        /* const defValArr = ['PS_C_SPECOBJ1_ID', 'PS_C_SPECOBJ2_ID', 'PS_C_SPECOBJ3_ID'];
        self.formConfig.formData.forEach(item => {
          if (defValArr.includes(item.colname)) {
            let itemV = self.formConfig.formValue[item.colname] ? JSON.parse(JSON.stringify(this.formConfig.formValue[item.colname])) : '';
            let itemDefV = [];
            itemDefV.push(itemV);
            itemDefV = itemDefV.map(it => ({ "ID": it.pid * 1, "Label": it.valuedata }))
            self.formConfig.formValue[item.defVal].defaultSelected = itemDefV;
          }
        }) */
        return data
      }).then(async (data) => {
        console.log(data);
        // 展示Form：启用状态
        if (self.ID > 0 && !self.$route.query.spuid) {
          self.formConfig.formData.forEach(item => {
            if (item.colname == 'ISACTIVE') {
              item.style = 'select'
            }
            if (self.formConfig.formValue.ISACTIVE == 'Y') { // "启用"状态时，都不可以编辑
              if (!item.itemdata) {
                item.disabled = true;
              }
              if (item.itemdata) {
                item.itemdata.readonly = true;
              }
            }
          });
          if (self.formConfig.formValue.ISACTIVE == 'Y') { // '物理属性'不可编辑
            self.formConfigWuLi.formData.map(item => item.disabled = true)
          }
        }
        // 动态渲染'自定义属性' / 新增需求:渲染'规格维度一、二、三'
        if (self.formConfig.formValue.PS_C_PRO_ID) {
          const val = self.formConfig.formValue.PS_C_PRO_ID;
          await self.renderProperties(val);
        }
        self.subTableConfig = {
          centerName: 'commodityCenter',
          tablename: self.labelDefaultValue,
          objid: this.ID,
          pageShow: true,
        }
        setTimeout(() => {
          self.watchChange = true;
          self.forceFresh += 1;
          self.loading = false;
        }, 100);
      })
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
        let fieldStyles = {
          input: 'inputChange',
          select: 'selectChange',
          date: 'onChange',
          switch: 'switchChange',
          radio: 'radioChange'
        }
        let eventName = fieldStyles[item.style]
        if (eventName) {
          item[eventName] = () => {
            if (item.attrType == 'fix') {
              // 固定属性和主表Part的form一起放在'PsSku'里面传
              console.log(self[targetFormConfig].formValue[item.colname]);
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
      const key = `PS_C_SPECGROUP_ID${DIMENSION}`;
      let spu = this.$route.query.spuid ? this.$route.query.spuid : self.spuID;
      const param = {
        PS_C_PRO_ID: spu,
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
        let row = data.DATA.map(it => ({ ECODE: { val: it.ECODE }, ENAME: { val: it.ENAME }, ID: { val: it.ID } }))
        let totalRowCount = data.COUNT;
        let autoData = [];
        NAME && (autoData = data.DATA);
        let drpData = { ...this.popTableBaseData, row }
        this.formConfig.formValue[key] = { ...this.formConfig.formValue[key], data: drpData, autoData, totalRowCount }
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
      // if (!val.valuedata) return false;
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
        objid: this.formConfig.formValue.ISACTIVE == 'N' ? '-1' : this.ID, // 用于控制是否可编辑
        objid_info: '用于控制‘自定义属性’和‘固定属性’是否可编辑,-1可编辑,其它则不可编辑',
      };
      if (this.$route.query.spuid) { // spu过来的新增，不传skuId
        delete param.skuId;
      }
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
          /* if (data.DIMENSION.includes(it.defVal)) {
            it.style = 'DropDownSelectFilter';
            it.style = 'formCompile';
            // 动态渲染规格维度
            const dimension = it.defVal.slice(-1, 18) * 1;
            if (this.ID == '-1' || this.$route.query.spuid) {
              this.renderSpecificationDimension(1, 10, dimension); // 需要初始化
            }
          } */
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
    deleteImg() {
      this.formConfig.formValue.IMAGE = this.dataitem.valuedata;
      this.modify.master.IMAGE = this.dataitem.valuedata;
    },
    // 图片上传成功的处理
    uploadFileChangeSuccess(res) {
      const self = this;
      self.dataitem.valuedata = res.map(i => ({ name: i.NAME, URL: i.URL }))
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
      const mes = $omsUtils.validatorNotEmpty(self.formConfig, valueArr, drpArr);
      if (mes) {
        this.$Message.warning(mes);
        return false;
      }
      /* =========== 保存校验 end =========== */
      let EXTRA = [];
      let PsSku = self.modify.master;
      const speArr = ['PS_C_SPECOBJ1_ID', 'PS_C_SPECOBJ2_ID', 'PS_C_SPECOBJ3_ID'];
      PsSku.IMAGE = JSON.stringify(self.modify.master.IMAGE);
      for (const key in PsSku) {
        // 字段是空字符串时不传
        if (PsSku[key] == '') {
          delete PsSku[key];
        }
        if (speArr.includes(key)) {
          PsSku[key] = PsSku[key] ?? 0;
        }
      }
      for (const key in self.modify.exAttr) {
        const afterExPro = JSON.parse(JSON.stringify(self.modify.exAttr));
        EXTRA.push({
          attributeId: key,
          attributeItem: afterExPro[key] ? afterExPro[key] : ''
        });
      }
      if (self.$route.query.spuid) {
        // spu跳过来的新增，默认入参
        this.ID = '-1';
        PsSku.ISACTIVE = 'Y';
        self.spuID = self.$route.query.spuid;
      }
      PsSku.SALES_STATUS = PsSku.SALES_STATUS ? PsSku.SALES_STATUS : self.formConfig.formValue.SALES_STATUS;
      PsSku.PS_C_PRO_ID = self.spuID; // 特别地，后端要的是ID不是ECODE (即'coffee对应的id')
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
        self.$Message.success(message || $it('modalTips.z9'));
        self.modify.master = {};
        self.modify.exAttr = {};
        // 数据回显
        if (!data) {
          self.$Message.error('没有返回新的数据ID！');
          return
        }
        let newId = data;
        // if (data) self.ID = data; 
        setTimeout(() => {
          if (this.$route.query.spuid) {
            //$omsUtils.tabCloseAppoint(this);
            // this.$destroy(true);
            $store.commit('customize/TabOpen', {
              id: newId,
              type: 'action',
              name: 'PS_C_SKU',
              label: $it('menu.b1'), // SKU编辑
              query: Object.assign({
                spuid: this.spuID,
                spucode: this.formConfig.formValue.ECODE || '',
                isSpuSave: true,
              })
            });
          } else {
            // this.initObjItem(self.ID);
            $store.commit('global/tabOpen', {
              url: `/CUSTOMIZED/PS_C_SKU/${newId}`,
              type: 'C',
              label: $it('menu.b1'), // SKU编辑
            });
          }
        }, 20);
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
          title: $it('modalTitle.tips'), // 提示
          content: $it('modalTips.hu'), // 当前修改未保存，确定返回？
          mask: true,
          showCancel: true,
          okText: $it('common.determine'), // 确定
          cancelText: $it('common.cancel'), // 取消
          onOk: () => {
            self.onOk()
          },
        });
      } else {
        self.onOk()
      }
    },
    onOk() {
      const spuID = this.$route.query.spuid;
      if (spuID) {
        //$omsUtils.tabCloseAppoint(this);
        // this.$destroy(true);
        this.$store.commit('global/tabOpen', {
          // 回到SPU的详情，同时SKU要回到列表
          tableId: 10105,
          type: 'S',
          tableName: 'PS_C_SKU',
          label: $it('menu.a8'), // 商品SKU
          back: true,
        });
        this.$store.commit('global/tabOpen', {
          url: `/CUSTOMIZED/PS_C_PRO/${spuID}`,
          type: 'C',
          label: $it('menu.b2'), // SPU编辑
        });
      } else {
        this.$store.commit('global/tabOpen', {
          tableId: 10105,
          type: 'S',
          tableName: 'PS_C_SKU',
          label: $it('menu.a8'), // 商品SKU
          back: true,
        });
      }
    },

    /* --------------------- 工具函数： --------------------- */
    // 切换Label & 实时渲染subTable
    labelClick(item) {
      this.labelDefaultValue = item.value;
      // if (this.labelDefaultValue == 'PS_C_ALTERNATE_SKU') return;
      this.subTableConfig = {
        centerName: 'commodityCenter',
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
    masterModifyData(ecode, obj, type = 'S') {
      const self = this;
      if (!self.watchChange) return;
      switch (type) {
        case "wuLi":
          self.modify[obj][ecode] = self.formConfigWuLi.formValue[ecode];
          break;
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
      return $utils.getFormatDate(date, 'yyyy-MM-dd HH:mm:ss');
    },
  },
};

import businessButton from 'professionalComponents/businessButton';
import businessForm from 'professionalComponents/businessForm';
import businessLabel from 'professionalComponents/businessLabel';
import businessStatusFlag from 'professionalComponents/businessStatusFlag';
import dateUtil from '@/assets/js/__utils__/date.js';
import publicMethodsUtil from '@/assets/js/public/publicMethods.js';
import comUtils from '@/assets/js/__utils__/common.js';
import orderItem from 'professionalComponents/subTable';
import logTable from 'professionalComponents/LogTable';

export default {
  name: 'SpuRecord',
  components: {
    orderItem,
    businessButton,
    businessForm,
    businessLabel,
    businessStatusFlag,
    logTable
  },
  data() {
    return {
      vmI18n: window.vmI18n,
      collapse: ['panel_baseInfo', 'attr'],
      labelValue: 'skuInfo',
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
      isModal: false,
      WatchChange: false, // 停止监听表单change事件
      imgIndex: 0,
      tableFormConfig: {
        formData: [{
          version: '1.4',
          colname: 'cpCSupplierName',
          style: 'popInput', // 输入框弹框单多选
          width: '6',
          itemdata: {
            col: 1,
            colid: 169325, // 当前字段的ID
            colname: 'QUERY_SUPPLIER_ID', // 当前字段的名称
            datelimit: 'all',
            display: 'text', // 显示什么类型，例如xml表示弹窗多选加导入功能，mrp表示下拉多选
            fkdisplay: 'drp', // 外键关联类型
            fkdesc: '商品SPU',
            inputname: 'QUERY_SUPPLIER_ID:ENAME', // 这个是做中文类型的模糊查询字段，例如ENAME
            isfk: true, // 是否有fk键
            isnotnull: true, // 是否必填
            isuppercase: false, // 是否转大写
            length: 65535, // 最大长度是多少
            name: '供应商名称', // 赔付类型
            readonly: false, // 是否可编辑，对应input   readonly属性
            reftable: 'CP_C_SUPPLIER', // 对应的表
            reftableid: 10222, // 对应的表ID
            row: 1,
            statsize: -1,
            type: 'STRING', // 这个是后台用的
            valuedata: '', // 这个是选择的值
            pid: '', // 啥 ？？？
          },
          oneObj: e => {
            console.log(e);
            this.tableFormConfig.formValue.cpCSupplierName = e.valuedata;
            this.tableFormConfig.formValue.cpCSupplierId = e.pid;
          },
        }],
        formValue: {
          cpCSupplierName: '', // 供应商名称
          cpCSupplierId: '' // 供应商id
        }
      },
      btnConfig: {
        typeAll: 'default',
        buttons: [{
            webname: 'lookup_save', // 保存
            text: '保存',
            size: '', // 按钮大小
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              const self = this;
              self.save();
            },
          },
          {
            webname: 'lookup_return', // 返回
            text: window.vmI18n.t('btn.back'),
            btnclick: () => {
              if (this.isModify) {
                this.$Modal.fcWarning({
                  title: '提示', // 打印
                  content: '该页面已经修改,是否继续返回?', // 正在打印中，请稍后。。。
                  mask: true,
                  showCancel: true,
                  onOk: () => {
                    comUtils.tabCloseAppoint(this);
                    this.$destroy(true);
                    this.$store.commit('global/tabOpen', {
                      tableId: 10106,
                      type: 'S',
                      tableName: 'PS_C_PRO',
                      label: '商品SPU',
                      back: true,
                    });
                  }
                });
              } else {
                comUtils.tabCloseAppoint(this);
                    this.$destroy(true);
                    this.$store.commit('global/tabOpen', {
                      tableId: 10106,
                      type: 'S',
                      tableName: 'PS_C_PRO',
                      label: '商品SPU',
                      back: true,
                    });
              }
            },
          },
        ],
      },
      skuInfo: {
        btnConfig: {
          typeAll: 'default', // 按钮统一风格样式
          loading: false, // 按钮加载
          buttons: [{
              text: '新增SKU',
              btnclick: () => {
                if (this.spuid == '-1') {
                  this.$OMS2.omsUtils.msgTips(this, 'warning', 'cu');
                  return;
                }
                this.isModify = true;
                $store.commit('customize/TabOpen', {
                  id: 2201,
                  type: 'action',
                  name: 'PS_C_SKU',
                  label: '商品SKU编辑', // 额外退款编辑
                  query: Object.assign({
                    spuid: this.spuid,
                    spucode: this.formConfig.formValue.ECODE
                  })
                });
              }
            },
            {
              text: '快速新增',
              btnclick: () => {
                if (this.spuid == '-1') {
                  this.$OMS2.omsUtils.msgTips(this, 'warning', 'cu');
                  return;
                }
                if (!this.formConfig.formValue.PS_C_PRO_CLASSIFY_ID) {
                  this.$OMS2.omsUtils.msgTips(this, 'warning', 'fj');
                  return;
                }
                this.isModify = true;
                $store.commit('customize/TabOpen', {
                  id: 2200,
                  type: 'action',
                  name: 'PS_C_SKU_QUICKLY_ADD',
                  label: '快速生成', // 额外退款编辑
                  query: Object.assign({
                    id: this.spuid, // spuid
                    classid: this.formConfig.formValue.PS_C_PRO_CLASSIFY_ID
                  })
                });
              }
            },
            {
              text: '应用到所有列',
              btnclick: () => {
                this.useAllColumns();
              }
            }

          ]
        },
        resData: [],
        columns: [{
            type: 'index',
            width: 60,
            align: 'center',
            title: '序号'
          },
          {
            title: 'SKU编码',
            key: 'ECODE'
          },
          {
            title: 'SKU名称',
            key: 'ENAME'
          },
          {
            title: '销售状态',
            key: 'SALES_STATUS'
          },
          {
            title: '零售价',
            key: 'PRICE_RETAIL'
          },
          {
            title: '采购价',
            key: 'PRICE_PURCHASE'
          },
          {
            title: '成本价',
            key: 'PRICE_COST'
          },
          {
            title: '体积(cm3)',
            key: 'VOLUME'
          },
          {
            title: '毛重',
            key: 'GROSS_WEIGHT'
          },
          {
            title: '净重',
            key: 'NET_WEIGHT'
          },
          {
            title: '单位',
            key: 'UNIT'
          },
          {
            title: '备注',
            key: 'SPEC_REMARK'
          }
        ],
        clickColumns: '',
        rowClickData: {}, // sku信息单据选中的数据
      },
      supplier: {
        resData: [],
        btnConfig: {
          typeAll: 'default', // 按钮统一风格样式
          loading: false, // 按钮加载
          btnsite: 'right', // 按钮位置 (right , center , left)
          buttons: [{
              text: '新增',
              btnclick: () => {
                this.addSupplier();
              }
            },
            {
              text: '删除',
              btnclick: () => {
                this.supplierDel();
              }
            }
          ]
        },
        columns: [{
            type: 'selection',
            width: 30,
            align: 'right'
          },
          {
            type: 'index',
            width: 60,
            align: 'left',
            title: '序号'
          },
          {
            title: '供应商名称',
            key: 'cpCSupplierName'
          },
          {
            title: '默认供应商',
            key: 'IS_DEFAULT',
            render: (h, params) => h('Checkbox', {
              props: {
                value: params.row.IS_DEFAULT == 'Y'
              },
              on: {
                'on-change': (val) => {
                  this.supplier.resData.forEach(item => {
                    if (val && item.cpCSupplierId !== params.row.cpCSupplierId) {
                      item.IS_DEFAULT = 'N';
                    } else if (val && item.cpCSupplierId == params.row.cpCSupplierId) {
                      item.IS_DEFAULT = 'Y';
                    }
                  });
                  console.log(val);
                  console.log(params);
                }
              }
            })
          }
        ],
        selectionData: []
      },
      customAttr: {
        formConfig: {
          formData: [],
          formValue: {}
        },
        fixFormConfig: {
          formData: [],
          formValue: {}
        },
        customFormConfig: {
          formData: [],
          formValue: {}
        }
      },
      formConfig: {
        formData: [{
            style: 'input',
            label: 'SPU编码',
            value: 'ECODE',
            width: '8',
            disabled: false,
            inputChange: () => {
              this.masterModifyData('ECODE', 'master', '');
            }
          },
          // {   不要了
          //   style: 'input',
          //   label: '启用状态',
          //   value: 'isactive',
          //   width: '8',
          //   disabled: true,
          // },
          {
            style: 'input',
            label: 'SPU名称',
            value: 'ENAME',
            width: '24',
            disabled: false,
            inputChange: () => {
              this.masterModifyData('ENAME', 'master', '');
            }
          },
          {
            colname: 'TYPE',
            style: 'select', // 下拉框类型
            label: '类型',
            width: '8', // 所占宽度宽度
            value: 'TYPE', // 输入框的值
            clearable: true,
            selectChange: () => {
              this.masterModifyData('TYPE', 'master', undefined);
            },
            options: [
              // 下拉框选项值
              {
                label: '1',
                value: 1
              },
              {
                label: '2',
                value: 2
              }
            ]
          },
          {
            version: '1.4',
            colname: 'PS_C_BRAND_ID',
            style: 'popInput', // 输入框弹框单多选
            width: '8',
            itemdata: {
              col: 1,
              colid: 166035, // 当前字段的ID
              colname: 'PS_C_BRAND_ID', // 当前字段的名称
              datelimit: 'all',
              display: 'text', // 显示什么类型，例如xml表示弹窗多选加导入功能，mrp表示下拉多选
              fkdisplay: 'drp', // 外键关联类型
              fkdesc: '商品SPU',
              inputname: 'PS_C_PRO_ID:ECODE', // 这个是做中文类型的模糊查询字段，例如ENAME
              isfk: true, // 是否有fk键
              isnotnull: true, // 是否必填
              isuppercase: false, // 是否转大写
              length: 65535, // 最大长度是多少
              name: '品牌', // 赔付类型
              readonly: false, // 是否可编辑，对应input   readonly属性
              reftable: 'PS_C_BRAND', // 对应的表
              reftableid: 166035, // 对应的表ID
              row: 1,
              statsize: -1,
              type: 'STRING', // 这个是后台用的
              valuedata: '', // 这个是选择的值
              pid: '', // 啥 ？？？
            },
            oneObj: e => {
              console.log(e);
              this.formConfig.formValue.PS_C_BRAND_ID = e.pid;
              if (e.pid == null) return;
              this.masterModifyData('PS_C_BRAND_ID', 'master', '');
            },
          },
          {
            version: '1.4',
            colname: 'PS_C_PRO_CLASSIFY_ID',
            style: 'popInput', // 输入框弹框单多选
            width: '8',
            itemdata: {
              col: 1,
              colid: 166036, // 当前字段的ID
              colname: 'PS_C_PRO_CLASSIFY_ID', // 当前字段的名称
              datelimit: 'all',
              display: 'text', // 显示什么类型，例如xml表示弹窗多选加导入功能，mrp表示下拉多选
              fkdisplay: 'drp', // 外键关联类型
              fkdesc: '商品SPU',
              inputname: 'PS_C_PRO_ID:ECODE', // 这个是做中文类型的模糊查询字段，例如ENAME
              isfk: true, // 是否有fk键
              isnotnull: true, // 是否必填
              isuppercase: false, // 是否转大写
              length: 65535, // 最大长度是多少
              name: '商品分类', // 赔付类型
              readonly: false, // 是否可编辑，对应input   readonly属性
              reftable: 'PS_C_PRO_CLASSIFY', // 对应的表
              reftableid: 10091, // 对应的表ID
              row: 1,
              statsize: -1,
              type: 'STRING', // 这个是后台用的
              valuedata: '', // 这个是选择的值
              pid: '', // 啥 ？？？
            },
            oneObj: e => {
              this.formConfig.formValue.PS_C_PRO_CLASSIFY_ID = e.pid;
              if (e.pid == null) return;
              this.masterModifyData('PS_C_PRO_CLASSIFY_ID', 'master', '');
              this.getCustomAttr();
            },
          },
          {
            style: 'textarea',
            label: '产品介绍',
            value: 'REMARK',
            width: '24',
            inputChange: () => {
              this.masterModifyData('REMARK', 'master', '');
            }
          }
        ],
        formValue: {
          ECODE: '', // SPU编码
          isactive: '', // 启用状态
          ENAME: '', // 商品名称
          TYPE: '', // 类型
          PS_C_BRAND_ID: '', // 品牌
          PS_C_PRO_CLASSIFY_ID: '', // 商品分类
          REMARK: '', // 产品介绍
        },
        ruleValidate: {
          ECODE: [{
            required: true,
            message: ' '
          }],
          ENAME: [{
            required: true,
            message: ' '
          }],
          TYPE: [{
            required: true,
            message: ' '
          }],
          PS_C_BRAND_ID: [{
            required: true,
            message: ' '
          }],
          PS_C_PRO_CLASSIFY_ID: [{
            required: true,
            message: ' '
          }],
        },
      },
      // tab切换配置
      labelList: [{
          label: 'SKU信息',
          value: 'skuInfo',
        },
        {
          label: '供应商',
          value: 'supplier',
        },
        // {
        //   label: '自定义属性',
        //   value: 'customAttr',
        // },
        {
          label: '操作日志',
          value: 'logTable',
        },
      ],
      labelDefaultValue: 'skuInfo', // 设置tab默认值，默认展示《自定义属性》
      isModify: false,
      // 修改的信息
      modify: {
        master: {}, // 主表信息
        skuInfo: [], // 修改后的sku信息
        customAttr: [], // 修改后的自定义属性
        supplier: [], // 修改后的供应商明细
      },
      old: { // 保存最初数据
        supplier: [], // 最初的供应商数据
      }
    };
  },
  computed: {
    spuid() {
      return this.$route.params.customizedModuleId == 'New' ? '-1' : this.$route.params.customizedModuleId;
    }
  },

  async mounted() {
    //   this.$nextTick(() => {
    //     this.getPermissions('btnConfig', 'PS_C_PRO');
    //   });
    const self = this;
    self.dataitem.url = self.$OMS2.omsUtils.splicingGateWay('commodityCenter','/p/cs/upload2')
    this.init();
    await this.getSelectOption();
    await this.querySpu();
    await this.getSkuInfoData();
  },
  created() {
    // 设置默认值
  },
  methods: {
    init() {
      const self = this;
      if (self.spuid > 0) {
        self.formConfig.formData.forEach(item=>{
          if (item.value == 'ECODE') {
            item.disabled = true;
          }
        });
      } else {
        self.WatchChange = true;
      }
    },
    addSupplier() {
      const self = this;
      const cpCSupplierName = self.tableFormConfig.formValue.cpCSupplierName;
      const supplierId = self.tableFormConfig.formValue.cpCSupplierId;
      if (!supplierId) {
        self.$OMS2.omsUtils.msgTips(self, 'warning', 'fk');
        return;
      }
      // 判断表格中是否已经存在该供应商,如已存在,则不再添加
      if (self.supplier.resData.some(item => item.cpCSupplierId == supplierId)) {
        self.$OMS2.omsUtils.msgTips(self, 'warning', 'fl');
        return;
      }
      const obj = {};
      obj.cpCSupplierName = cpCSupplierName; // 供应商名称
      obj.cpCSupplierId = supplierId; // 供应商id
      obj.PS_C_PRO_ID = this.spuid; // spuid
      obj.IS_DEFAULT = 'N'; // 默认供应商
      obj.ID = '-1';
      self.supplier.resData.push(obj);
      self.isModify = true;
      self.tableFormConfig.formValue.cpCSupplierId = '';
      self.tableFormConfig.formData[0].itemdata.pid = '';
      self.tableFormConfig.formData[0].itemdata.valuedata = '';
    },
    // 删除图片
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
    // 获取类型下拉数据
    async getSelectOption() {
      const self = this;
      self.formConfig.formData = await publicMethodsUtil.getTypeList('PS_C_PRO', ['TYPE'], '基础信息', self.formConfig);
    },
    // 记录主表修改信息方法
    /**
     * ecode 记录字段
     * error 删除记录条件
     * obj 修改值存在modify下的某个对象中
     */
    masterModifyData(ecode, obj, error) {
      const self = this;
      if (!self.WatchChange) return;
      self.isModify = true;
      if (self.formConfig.formValue[ecode] == error) {
        delete self.modify[obj][ecode];
      } else {
        self.modify[obj][ecode] = self.formConfig.formValue[ecode];
      }
    },
    querySpu() {
      const self = this;
      if (self.spuid == '-1') return;
      const formdata = new FormData();
      formdata.append('id', self.spuid);
      self.service.commodityCenter.querySpu(formdata).then(res => {
        console.log(res);
        if (res.data.code == 0) {
          const {
            ECODE,
            isactive,
            ENAME,
            TYPE,
            PS_C_BRAND_ID,
            PS_C_PRO_CLASSIFY_ID,
            REMARK,
            PS_C_BRAND_NAME,
            PS_C_PRO_CLASSIFY_NAME
          } = res.data.data;
          self.formConfig.formValue = {
            ECODE, // SPU编码
            isactive: isactive == 'Y' ? '启用' : '不启用', // 启用状态
            ENAME, // 商品名称
            TYPE, // 类型
            PS_C_BRAND_ID, // 品牌
            PS_C_PRO_CLASSIFY_ID, // 商品分类
            REMARK, // 产品介绍
          };
          self.formConfig.formData.forEach(item => {
            switch (item.colname) {
              case 'PS_C_BRAND_ID':
                item.itemdata.pid = PS_C_BRAND_ID;
                item.itemdata.valuedata = PS_C_BRAND_NAME;
                break;
              case 'PS_C_PRO_CLASSIFY_ID':
                item.itemdata.pid = PS_C_PRO_CLASSIFY_ID;
                item.itemdata.valuedata = PS_C_PRO_CLASSIFY_NAME;
            }
          });
          self.getCustomAttr();
        }
      });
    },
    onColumnClick(e, column) { // 点击当前列
      const self = this;
      console.log(e);
      console.log(column);
      self.skuInfo.clickColumns = column.key;
    },
    // sku信息单击选中一行
    onRowClick(e) {
      console.log(e);
      this.skuInfo.rowClickData = e;
    },
    getSkuInfoData() {
      if (this.spuid == '-1') return;
      const formdata = new FormData();
      formdata.append('id', this.spuid);
      this.service.commodityCenter.listSku(formdata).then(res => {
        console.log(res);
        if (res.data.code == 0) {
          this.skuInfo.resData = res.data.data;
        } else {
          this.$OMS2.omsUtils.msgTips(this, 'error', res.data.message, 0);
        }
      });
    },
    getCustomAttr() {
      const self = this;
      if (!self.formConfig.formValue.PS_C_PRO_CLASSIFY_ID) return;
      self.service.commodityCenter.queryAttributeSku({
        proCode: self.formConfig.formValue.ECODE, // spu编码
        tableName: 'ps_c_pro', // 表名
        classId: self.formConfig.formValue.PS_C_PRO_CLASSIFY_ID // 分类id
      }).then(res => {
        console.log(res);
        if (res.data.code == 0) {
          if (JSON.stringify(res.data.data) == '{}') {
            self.customAttr.formConfig.formData = [];
            self.customAttr.fixFormConfig.formData = [];
            self.customAttr.customFormConfig.formData = [];
            return;
          }
          self.dynamicAttr(res.data.data, 'EXTRA', self.customAttr.customFormConfig);
          self.dynamicAttr(res.data.data, 'FIXED', self.customAttr.fixFormConfig);
          self.WatchChange = true;
        } else {
          self.$OMS2.omsUtils.msgTips(self, 'error', res.data.message, 0);
        }
      });
    },
    /**
     * 
     * @param {请求数据} res 
     * @param {自定义属性/固定属性} name 
     * @param {存储修改数组对象} modifyObj
     */
    dynamicAttr(res, name, modifyObj) {
      const self = this;
      if (res[name].length) {
        const data = res[name];
        data.forEach(item=>{
          const key = String(item.colname);
          item.value = key;
          modifyObj.formValue[key] = item.valuedata;
          if (item.style == 'select') {
            item.selectChange = () => {
              self.isModify = true;
              if (modifyObj.formValue[key] == '') {
              self.modify.customAttr.forEach((item, index) => {
                if (item.attributeId == key) {
                  self.modify.customAttr.splice(index, 1);
                }
              });
            } else if (!self.modify.customAttr.length) {
              const obj = {};
              obj.attributeId = key;
              obj.attributeItem = modifyObj.formValue[key];
              obj.custom_type = name;
              self.modify.customAttr.push(obj);
            } else {
              const boo = self.modify.customAttr.some(item => item.attributeId == key);
              if (boo) {
                item.attributeItem = modifyObj.formValue[key];
              } else {
                const obj = {};
                obj.attributeId = key;
                obj.attributeItem = modifyObj.formValue[key];
                obj.custom_type = name;
                self.modify.customAttr.push(obj);
              }
            }
            };
          } else {
            item.inputChange = () => { // 动态记录自定义属性修改值
            const self = this;
            self.isModify = true;
            if (modifyObj.formValue[key] == '') {
              self.modify.customAttr.forEach((item, index) => {
                if (item.attributeId == key) {
                  self.modify.customAttr.splice(index, 1);
                }
              });
            } else if (!self.modify.customAttr.length) {
              const obj = {};
              obj.attributeId = key;
              obj.attributeItem = modifyObj.formValue[key];
              obj.custom_type = name;
              self.modify.customAttr.push(obj);
            } else {
              const boo = self.modify.customAttr.filter(item => item.attributeId == key);
              if (boo.length) {
                boo[0].attributeItem = modifyObj.formValue[key];
                // boo[0].attributeId = modifyObj.formValue[key];
              } else {
                const obj = {};
                obj.attributeId = key;
                obj.attributeItem = modifyObj.formValue[key];
                obj.custom_type = name;
                self.modify.customAttr.push(obj);
              }
            }
            console.log(self.modify.customAttr);
          };
          }
        });
        modifyObj.formData = data;
      } else {
        modifyObj.formData = [];
      }
    },
    useAllColumns() {
      const self = this;
      self.isModify = true;
      if (JSON.stringify(self.skuInfo.rowClickData) == '{}') {
        self.$OMS2.omsUtils.msgTips(self, 'warning', 'fm');
        return;
      }
      const modifyData = self.skuInfo.rowClickData[self.skuInfo.clickColumns]; // 要应用到所有列的值
      self.skuInfo.resData.forEach(ele => {
        if (!ele[self.skuInfo.clickColumns]) {
          ele[self.skuInfo.clickColumns] = modifyData;
        // 记录修改的表格数据
        const obj = {};
        obj[self.skuInfo.clickColumns] = modifyData;
        obj.ID = ele.ID;
        self.modify.skuInfo.push(obj);
        }
      });
    },
    labelClick(e) { // tab明细切换
      console.log(e);
      this.labelValue = e.value;
      if (e.value == 'skuInfo') {
        this.getSkuInfoData();
      } else if (e.value == 'supplier') {
        this.getSupplierData();
      } else if (e.value == 'customAttr') {
        this.getCustomAttr();
      } else if (e.value == 'logTable') {

      }
    },
    onSelectionChange(selection) { // 供应商表格勾选数据
      const self = this;
      self.supplier.selectionData = selection;
    },
    supplierDel() {
      const self = this;
      if (!self.supplier.selectionData.length) {
        self.$OMS2.omsUtils.msgTips(self, 'warning', 'df');
        return;
    }
      const delarr = self.supplier.selectionData.map(item => item.cpCSupplierId);
      const arr = [];
      // 删除表格数据,同时删除modify里的修改数据
      self.supplier.resData.forEach(item => {
        if (!delarr.includes(item.cpCSupplierId)) {
          arr.push(item);
        }
      });
      self.supplier.resData = arr;
      self.isModify = true;
    },
    getSupplierData() { // 供应商列表查询
      if (this.spuid == '-1') {
        this.old.supplier = JSON.stringify([]);
        return;
      }
      const formdata = new FormData();
      formdata.append('spuId', this.spuid);
      this.service.commodityCenter.listSpu(formdata).then(res => {
        console.log(res);
        if (res.data.code == 0) {
          this.supplier.resData = res.data.data;
          this.old.supplier = JSON.stringify(this.supplier.resData); // 存储初始化供应商数据
        } else {
          this.$OMS2.omsUtils.msgTips(this, 'error', res.data.message, 0);
        }
      });
    },
    save() { // 保存接口
      const self = this;
      // 非空效验
      const data = self.formConfig.formValue;
      let str = '';
      if (!data.ECODE) {
        str += 'SPU编码 ';
      } else if (!data.ENAME) {
        str += 'SPU名称 ';
      } else if (!data.TYPE) {
        str += '类型 ';
      }
      self.formConfig.formData.forEach(item=>{
        if (item.colname == 'PS_C_BRAND_ID' && !item.itemdata.pid) {
          str += '品牌 ';
        } else if (item.colname == 'PS_C_PRO_CLASSIFY_ID' && !item.itemdata.pid) {
          str += '商品分类 ';
        }
      });
      if (str) {
        self.$OMS2.omsUtils.msgTips(self, 'warning', `${str}不能为空!`, 0);
        return;
      }
      // 获取主表信息
      const obj = {};
      obj.objid = this.spuid;
      self.modify.master.IMAGE = JSON.stringify(self.modify.master.IMAGE);
      obj.PsSpu = self.modify.master; // 主表信息
      obj.PsSpu.ID = this.spuid;
      obj.PsCSkuList = self.modify.skuInfo; // sku字表修改信息
      obj.PsCProSupItemDTOList = self.labelValue == 'supplier' ? self.diffSupplier(self.supplier.resData, JSON.parse(self.old.supplier)) : []; // 供应商字表修改信息
      // 根据标记区分固定属性还是自定义属性进行分类
      const EXTRA = []; // 自定义属性
      const FIXED = []; // 固定属性
      self.modify.customAttr.forEach(item => {
        if (item.custom_type == 'EXTRA') {
          EXTRA.push(item);
        } else if (item.custom_type == 'FIXED') {
          FIXED.push(item);
        }
      });
      obj.EXTRA = EXTRA.length ? EXTRA : null; // 自定义属性修改参数
      FIXED.forEach(item => {
        obj.PsSpu[item.attributeId] = item.attributeItem;
      });
      self.service.commodityCenter.spuSave(obj).then(res => {
        console.log(res);
        if (res.data.code == 0) {
          self.isModify = false;
          self.$OMS2.omsUtils.msgTips(self, 'success', res.data.message, 0);
          self.$store.commit('customize/TabOpen', {
            id: res.data.data,
            type: 'action',
            name: 'PS_C_PRO',
            label: 'SPU编辑', // 额外退款编辑
          });
          // self.modify = {
          //   master: {}, // 主表信息
          //   skuInfo: [], // 修改后的sku信息
          //   customAttr: [], // 修改后的自定义属性
          // };
          // this.querySpu();
          // this.getSkuInfoData();
        } else {
          self.$OMS2.omsUtils.msgTips(self, 'error', res.data.message, 0);
        }
      });
    },
    diffSupplier(newData, oldData) {
      const arr = [];
      oldData.forEach(oldItem => {
        if (!newData.some(ele => oldItem.cpCSupplierId == ele.cpCSupplierId)) {
          arr.push({
            actionName: 'DELETE',
            id: oldItem.ID
          });
        }
      });
      newData.forEach(newItem => {
        if (!oldData.some(ele => newItem.cpCSupplierId == ele.cpCSupplierId)) {
          arr.push({
            actionName: 'SAVE',
            cpCSupplierId: newItem.cpCSupplierId,
            isDefault: newItem.IS_DEFAULT
          });
        }
      });
      oldData.forEach(oldItem => {
        newData.forEach(newItem => {
          if (newItem.cpCSupplierId == oldItem.cpCSupplierId && newItem.IS_DEFAULT !== oldItem.IS_DEFAULT) {
            arr.push({
              actionName: 'UPDATE',
              id: newItem.ID,
              cpCSupplierId: newItem.cpCSupplierId,
              isDefault: newItem.IS_DEFAULT
            });
          }
        });
      });
      return arr;
    },
    // 时间戳格式化
    formatDate(time) {
      const date = new Date(time);
      return dateUtil.getFormatDate(date, 'yyyy-MM-dd HH:mm:ss');
    }
  },
};

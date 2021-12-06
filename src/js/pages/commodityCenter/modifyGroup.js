
/**
 * 组合商品
 */
import modifycurrentLabel from '@/assets/js/mixins/modifycurrentLabel';

export default {
  components: {},
  mixins: [new modifycurrentLabel()],
  computed: {
    id() {
      return this.$route.params.customizedModuleId == 'New' ? -1 : this.$route.params.customizedModuleId;
    },
    groupType() {
      return this.formConfig.formValue.group_type;
    },
    save_button() {
      return this.btnConfig.buttons.filter(item => item.webname == 'lookup_save')[0];
    }
  },
  data() {
    return {
      collapse: 'panel_baseInfo',
      btnConfig: {
        btnsite: 'right',
        typeAll: 'default',
        buttons: [],
      },
      extendBtn: [
        {
          webname: 'ps_c_pro_group_save', // 保存
          text: $it('btn.save'), // 保存
          size: '', // 按钮大小
          disabled: false, // 按钮禁用控制
          btnclick: () => {
            this.save();
          },
        },
        {
          webname: 'ps_c_pro_group_return', // 返回
          text: $it('btn.back'),
          btnclick: () => {
            if (this.isModify) {
              this.$Modal.fcWarning({
                className: 'ark-dialog',
                title: $it('mT.tips'), // 提示
                content: $it('modalTips.hu'), // 当前修改未保存，确定返回？
                mask: true,
                showCancel: true,
                onOk: () => {
                  // $omsUtils.tabCloseAppoint(this);
                  // this.$destroy(true);
                  this.$store.commit('global/tabOpen', {
                    tableId: 10108,
                    type: 'S',
                    tableName: 'PS_C_PRO_GROUP',
                    back: true,
                  });
                }
              });
            } else {
              // $omsUtils.tabCloseAppoint(this);
              // this.$destroy(true);
              this.$store.commit('global/tabOpen', {
                tableId: 10108,
                type: 'S',
                tableName: 'PS_C_PRO_GROUP',
                back: true,
              });
            }
          },
        },
      ],
      formConfig: {
        formData: [{
          style: 'input',
          label: $it('fL.cy'), // 组合商品编码
          value: 'ecode',
          width: '8',
          disabled: false,
          inputChange: () => {
            this.masterModifyData('ecode', 'master');
          }
        },
        {
          style: 'input',
          label: $it('fL.cz'), // 组合商品名称
          value: 'ename',
          width: '16',
          disabled: false,
          inputChange: () => {
            this.masterModifyData('ename', 'master');
          }
        },
        {
          colname: 'TYPE',
          style: 'select', // 下拉框类型
          label: $it('fL.type'), // 类型
          width: '8', // 所占宽度宽度
          value: 'type', // 输入框的值
          clearable: true,
          selectChange: () => {
            this.masterModifyData('type', 'master');
          },
          options: []
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
            inputname: 'PS_C_PRO_ID:ECODE', // 这个是做中文类型的模糊查询字段，例如ENAME
            isfk: true, // 是否有fk键
            isnotnull: true, // 是否必填
            isuppercase: false, // 是否转大写
            length: 65535, // 最大长度是多少
            name: $it('tL.brand'), // 品牌
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
            this.formConfig.formValue.ps_c_brand_id = e.pid;
            this.modify.master.ps_c_brand_id = e.pid;
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
            inputname: 'PS_C_PRO_ID:ECODE', // 这个是做中文类型的模糊查询字段，例如ENAME
            isfk: true, // 是否有fk键
            isnotnull: true, // 是否必填
            isuppercase: false, // 是否转大写
            length: 65535, // 最大长度是多少
            name: $it('menu.ac'), // 商品分类
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
            this.formConfig.formValue.ps_c_pro_classify_id = e.pid;
            this.modify.master.ps_c_pro_classify_id = e.pid;
          },
        },
        {
          style: 'input',
          label: $it('fL.bg'), //  启用状态
          value: 'ISACTIVE',
          width: '8',
          disabled: true
        },
        {
          style: 'input',
          label: $it('fL.cu'), // 零售价
          value: 'price_retail',
          width: '8',
          inputChange: () => {
            this.masterModifyData('price_retail', 'master');
          }
        },
        {
          colname: 'group_type',
          style: 'select', // 下拉框类型
          label: $it('fL.d0'), // 组合类型
          width: '8', // 所占宽度宽度
          value: 'group_type', // 输入框的值
          clearable: true,
          selectChange: () => {
            if (!this.WatchChange) return;
            this.isClearItem = true;
          },
          options: [
            // 下拉框选项值
            {
              label: $it('other.common'), // 普通
              value: 2
            },
            {
              label: $it('other.blessingBag'), // 福袋
              value: 1
            }
          ]
        },
        ],
        formValue: {
          group_type: 2,
          ecode: '',
          ename: '',
          type: '',
          price_retail: '',
          ISACTIVE: ''
        },
        ruleValidate: {
          type: [{
            required: false,
            message: ' ',
            trigger: 'blur'
          }],
          ecode: [{
            required: true,
            message: ' ',
            trigger: 'blur'
          }],
          ename: [{
            required: true,
            message: ' ',
            trigger: 'blur'
          }],
          group_type: [{
            required: true,
            message: ' ',
            trigger: 'blur'
          }],
          price_retail: [{
            required: true,
            message: ' ',
            trigger: 'blur'
          }]
        }
      },
      label: {
        labelList: [{
          label: $it('fL.d1'), // 普通组合明细
          value: 'generalGroupItem',
        },
        {
          label: $it('pL.operationLog'), // 操作日志
          value: 'logTable'
        }
        ],
        labelTagList: [{
          label: $it('fL.d2'), // 福袋组合明细
          value: 'luckbagGroupItem',
        },
        {
          label: $it('pL.operationLog'), // 操作日志
          value: 'logTable'
        }],
        labelValue: 'generalGroupItem'
      },
      jordanTableConfigLuck: { // 福袋明细配置
        indexColumn: true,
        businessButtonConfig: { // 表格内按钮配置
          typeAll: 'default',
          btnsite: 'right', // 按钮位置 (right , center , left)
          buttons: [{
            type: 'primary',
            webname: 'ps_c_pro_group_add', // 返回
            text: $it('btn.increase'), // 添加
            disabled: false,
            btnclick: () => {
              this.addgeneralItem();
            },
          },
          {
            type: 'warning',
            webname: 'ps_c_pro_group_del', // 返回
            text: $it('btn.delete'), // 删除
            disabled: false,
            btnclick: () => {
              this.delLuck();
            },
          },
          ]
        },
        businessFormConfig: {
          formData: [{
            style: 'input',
            label: $it('fL.d3'), // 每组抽取数
            value: 'NUM',
            disabled: false,
            dataAcessKey: 'NUM',
            width: '6',
            inputChange: () => {
              this.masterModifyData('NUM', 'master');
            }
          },
          {
            label: $it('tL.code_SKU'), // SKU编码
            style: 'dimSearch',
            width: '6',
            value: 'gbCode',
            columns: ['ECODE'],
            AuotData: [], // 匹配的选项
            disabled: false,
            dimChange: (val) => {
              if (!val) {
                this.jordanTableConfigLuck.businessFormConfig.formData[1].AuotData = [];
                return;
              }
              const formdata = new FormData();
              formdata.append('ecode', val);
              this.service.commodityCenter.querySku(formdata).then(res => {
                if (res.data.code == 0) {
                  this.jordanTableConfigLuck.businessFormConfig.formData[1].AuotData = res.data.data;
                }
              });
            },
            dimEnter: (val) => { },
            dimSelect: (val) => {
              this.jordanTableConfigLuck.businessFormConfig.formValue.gbCode = val.tem.ECODE;
            },
          },
          {
            style: 'input',
            label: $it('tL.grouping'), // 分组
            value: 'GROUPNUM',
            disabled: false,
            dataAcessKey: 'GROUPNUM',
            width: '6',
            inputenter: () => {
              this.addgeneralItem();
            }
          },
          ],
          formValue: {
            NUM: '1',
            GROUPNUM: '1',
            gbCode: '',
          },

        }, // 表格内表单项配置
        columns: [{
          key: 'selection',
          type: 'selection',
          width: '50',
          align: 'center',
        },
        {
          title: $it('tL.code_SKU'), // SKU编码
          key: 'ECODE'
        },
        {
          title: $it('fL.skuName'), // SKU名称
          key: 'ENAME'
        },
        {
          title: $it('fL.cu'), // 零售价
          key: 'PRICE_RETAIL'
        },
        {
          title: $it('tL.grouping'), // 分组
          key: 'GROUPNUM'
        },
        {
          title: $it('other.goods_quantity'), // 商品数量
          key: 'QTY',
          render: (h, params) => {
            return h("InputNumber", {
              props: {
                value: params.row.QTY,
                regx: /^[1-9]\d*$/,
                min: 1,
                disabled: ['Y', '启用'].includes(this.formConfig.formValue.ISACTIVE),
                editable: true,
              },
              on: {
                "on-change": (e) => {
                  params.row.QTY = e;
                  this.jordanTableConfigLuck.data[params.index] = params.row;
                  this.modify.luckGroupItem = this.jordanTableConfigLuck.data;
                },
              },
            });
          }
        },
        ],
        data: [],
      },
      jordanTableConfigGenera: { // 普通明细配置
        businessButtonConfig: { // 表格内按钮配置
          typeAll: 'default',
          btnsite: 'right', // 按钮位置 (right , center , left)
          buttons: [{
            type: 'primary',
            webname: 'ps_c_pro_group_add', // 返回
            text: $it('btn.increase'), // 添加
            disabled: false,
            btnclick: () => {
              this.addgeneralItem();
            },
          },
          {
            type: 'warning',
            webname: 'ps_c_pro_group_del', // 返回
            text: $it('btn.delete'), // 删除
            disabled: false,
            btnclick: () => {
              this.delGeneral();
            },
          },
          ]
        },
        businessFormConfig: {
          formData: [{
            label: $it('tL.code_SKU'), // SKU编码
            style: 'dimSearch',
            width: '6',
            value: 'gbCode',
            columns: ['ECODE'],
            AuotData: [], // 匹配的选项
            dimChange: (val) => {
              if (!val) {
                this.jordanTableConfigGenera.businessFormConfig.formData[0].AuotData = [];
                return;
              }
              const formdata = new FormData();
              formdata.append('ecode', val);
              this.service.commodityCenter.querySku(formdata).then(res => {
                if (res.data.code == 0) {
                  this.jordanTableConfigGenera.businessFormConfig.formData[0].AuotData = res.data.data;
                }
              });
            },
            dimEnter: (val) => {
              console.log(val);
              this.addgeneralItem(val);
            },
            dimSelect: (val) => {
              console.log(val);
              this.jordanTableConfigGenera.businessFormConfig.formValue.gbCode = val.tem.ECODE;
            },
          },
          {
            style: 'input',
            label: '数量', // 卖家备注
            value: 'QTY',
            disabled: false,
            width: '6',
            inputenter: () => {
              this.addgeneralItem();
            }
          },
          ],
          formValue: {
            QTY: 1,
            gbCode: ''
          },

        }, // 表格内表单项配置
        columns: [{
          key: 'selection',
          type: 'selection',
          width: '50',
          align: 'center',
        },
        {
          title: $it('tL.code_SKU'), // SKU编码
          key: 'ECODE'
        },
        {
          title: $it('fL.skuName'), // SKU名称
          key: 'ENAME'
        },
        {
          title: $it('fL.cu'), // 零售价
          key: 'PRICE_RETAIL'
        },
        {
          title: $it('other.goods_quantity'), // 商品数量
          key: 'QTY',
          render: (h, params) => {
            return h("InputNumber", {
              props: {
                value: params.row.QTY,
                regx: /^[1-9]\d*$/,
                min: 1,
                disabled: ['Y', '启用'].includes(this.formConfig.formValue.ISACTIVE),
                editable: true,
              },
              on: {
                "on-change": (e) => {
                  params.row.QTY = e;
                  this.jordanTableConfigGenera.data[params.index] = params.row;
                  this.modify.generalGroupItem = this.jordanTableConfigGenera.data;
                },
              },
            });
          }
        },
        ],
        data: [],
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
      subTableConfig: {
        centerName: '',
        tablename: '',
        objid: '',
      },
      imgIndex: '',
      isClearItem: false, // 是否清空明细
      isModify: false,
      WatchChange: false, // 监听修改变化
      modify: {
        master: {
          group_type: 2, // 组合类型默认值为普通
        }, // 主表数据
        generalGroupItem: [], // 普通商品明细
        luckGroupItem: [], // 福袋商品明细
      }, // 记录修改项
      selectDatas: [], // 普通/福袋勾选的数据
    };
  },
  created() {
    this.getSelectOption();
  },
  async mounted() {
    const self = this;
    self.dataitem.url = $omsUtils.splicingGateWay('commodityCenter', '/p/cs/upload2')
    self.formConfig.formData[0].disabled = self.id !== -1;
    const buttons = self.$OMS2.BtnConfig.config();
    this.btnConfig.buttons = [...this.extendBtn];
    if (self.id == -1) {
      self.formConfig.formData.filter(item => item.value && item.value == 'ISACTIVE')[0].style = '';
      this.label.labelList = [{
        label: $it('fL.d1'), // 普通组合明细
        value: 'generalGroupItem',
      }];
      this.label.labelTagList = [{
        label: $it('fL.d2'), // 福袋组合明细
        value: 'luckbagGroupItem',
      }];
    } else {
      $omsUtils.getBtnPermission(this, ['btnConfig', 'jordanTableConfigLuck.businessButtonConfig', 'jordanTableConfigGenera.businessButtonConfig'], { table: 'PS_C_PRO_GROUP', type: 'OBJ', serviceId: 'r3-oc-oms' }, true);
    }
    this.query();
  },
  methods: {
    query() {
      const self = this;
      if (this.id == '-1') {
        self.WatchChange = true;
        return;
      }
      const formdata = new FormData();
      formdata.append('id', this.id);
      self.service.commodityCenter.selectGroupById(formdata).then(res => {
        console.log(res);
        if (res.data.code == 0) {
          // $utils.msgTips(self, 'success', res.data.message, 0);
          self.setForm(res.data.data);
        } else {
          // 走框架报错即可
          // $utils.msgTips(self, 'error', res.data.message, 0);
        }
      });
    },
    setForm(data) {
      const self = this;
      const { ECODE, ENAME, TYPE = '', PRICE_RETAIL, GROUP_TYPE, ISACTIVE, IMAGE } = data.PsCProGroup;
      self.formConfig.formValue.ecode = ECODE;
      self.formConfig.formValue.ename = ENAME;
      self.formConfig.formValue.type = TYPE;
      self.formConfig.formValue.price_retail = PRICE_RETAIL;
      self.formConfig.formValue.group_type = GROUP_TYPE;
      self.formConfig.formValue.ISACTIVE = ISACTIVE ? "启用" : "停用";
      IMAGE && self.dataitem.valuedata.push(...(JSON.parse(IMAGE))); // 图片
      self.modify.master.group_type = data.PsCProGroup.GROUP_TYPE;
      // self.save_button.disabled = data.PsCProGroup.ISACTIVE;
      self.btnConfig.buttons[0].disabled = data.PsCProGroup.ISACTIVE;
      self.jordanTableConfigLuck.businessButtonConfig.buttons.forEach(item => item.disabled = data.PsCProGroup.ISACTIVE);
      self.jordanTableConfigGenera.businessButtonConfig.buttons.forEach(item => item.disabled = data.PsCProGroup.ISACTIVE);

      const active = ['Y', '启用'].includes(self.formConfig.formValue.ISACTIVE)
      // 赋值品牌 商品分类
      self.formConfig.formData.forEach(ele => {
        if (ele.colname == 'PS_C_BRAND_ID') {
          ele.itemdata.pid = data.PsCProGroup.PS_C_BRAND_ID;
          ele.itemdata.valuedata = data.PsCProGroup.PS_C_BRAND_ENAME;
        } else if (ele.colname == 'PS_C_PRO_CLASSIFY_ID') {
          ele.itemdata.pid = data.PsCProGroup.PS_C_PRO_CLASSIFY_ID;
          ele.itemdata.valuedata = data.PsCProGroup.PS_C_PRO_CLASSIFY_ENAME;
        }
        // '启用'状态表单不可编辑
        if (active) {
          if (!ele.itemdata) {
            ele.disabled = true;
          }
          if (ele.itemdata) {
            ele.itemdata.readonly = true;
          }
        }
      });
      // 明细表单不可编辑
      self.jordanTableConfigLuck.businessFormConfig.formData.map(it => it.disabled = active)
      self.jordanTableConfigGenera.businessFormConfig.formData.map(it => it.disabled = active)
      // 图片上传不可用
      self.dataitem.readonly = active;

      // 赋值明细
      if (data.PsCProGroup.GROUP_TYPE == 2) { // 普通组合明细
        self.label.labelValue = 'generalGroupItem';
        self.jordanTableConfigGenera.data = data.PsCProGroupItems;
      } else {
        self.label.labelValue = 'luckbagGroupItem';
        self.jordanTableConfigLuck.data = data.PsCProGroupItems;
      }
      setTimeout(() => {
        self.WatchChange = true;
      }, 10);
    },
    save() {
      const self = this;
      let str = '';
      if (!self.formConfig.formValue.ecode) {
        str += `${$it('fL.cy')} `; // 组合商品编码
      } else if (!self.formConfig.formValue.ename) {
        str += `${$it('fL.cz')} `; // 组合商品名称
      } else if (!self.formConfig.formValue.group_type) {
        str += `${$it('fL.d0')} `; // 组合类型
      } else if (!self.formConfig.formValue.price_retail) {
        str += `${$it('fL.cu')} `; // 零售价
      } else if (!self.formConfig.formData.filter(item => item.colname == 'PS_C_BRAND_ID')[0].itemdata.pid) {
        str += `${$it('tL.brand')} `; // 品牌
      } else if (!self.formConfig.formData.filter(item => item.colname == 'PS_C_PRO_CLASSIFY_ID')[0].itemdata.pid) {
        str += $it('menu.ac') // 商品分类
      }
      if (str) {
        $utils.msgTips(self, 'warning', `${str}不能为空!`, 0);
        return;
      }
      self.modify.master.IMAGE = JSON.stringify(self.modify.master.IMAGE);
      const data = {
        objid: this.id,
        PsCProGroup: self.modify.master,
        SkuGroupRequestList: self.groupType == 2 ? self.modify.generalGroupItem : self.modify.luckGroupItem
      };
      this.btnConfig.buttons[0].disabled = true;
      self.service.commodityCenter.skuGroupSave(data).then(res => {
        console.log(res);
        if (res.data.code == 0) {
          $utils.msgTips(self, 'success', res.data.message, 0);
          self.isModify = false
          $store.commit('global/tabOpen', {
            url: `/CUSTOMIZED/PS_C_PRO_GROUP/${res.data.data}`,
            type: 'C',
            label: '组合商品编辑', // 额外退款编辑
          });
          self.modify.generalGroupItem = [];
          self.modify.luckGroupItem = [];
          self.btnConfig.buttons[0].disabled = false;
        } else {
          this.btnConfig.buttons[0].disabled = false;
        }
      });
    },
    // 获取类型下拉数据
    async getSelectOption() {
      const self = this;
      self.formConfig.formData = await $omsUtils.getTypeList('PS_C_PRO_GROUP', ['TYPE'], '基础信息', self.formConfig);
    },
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
    labelClick(e) { // tab明细切换
      console.log(e);
      if (e.value == 'logTable') {
        this.subTableConfig = {
          centerName: 'commodityCenter',
          tablename: 'PS_PRO_GROUP_LOG',
          pageShow: true,
          objid: this.$route.params.customizedModuleId,
        }
      }
      this.label.labelValue = e.value;
    },
    // 记录主表修改信息方法
    /**
     * ecode 记录字段
     * error 删除记录条件
     * obj 修改值存在modify下的某个对象中
     */
    masterModifyData(ecode, obj) { // 记录修改数据
      const self = this;
      if (!self.WatchChange) return;
      self.isModify = true;
      self.modify[obj][ecode] = self.formConfig.formValue[ecode];
    },
    // 普通商品明细添加
    addgeneralItem() {
      const self = this;
      self.isModify = true;
      const ename = self.groupType == 2 ? this.jordanTableConfigGenera.businessFormConfig.formValue.gbCode : this.jordanTableConfigLuck.businessFormConfig.formValue.gbCode;
      if (!ename) {
        $utils.msgTips(self, 'warning', 'fh');
        return;
      }
      let arr = {};
      const formdata = new FormData();
      formdata.append('ecode', ename);
      self.service.commodityCenter.querySku(formdata).then(res => {
        console.log(res);
        if (res.data.code == 0) {
          if (self.groupType == 2) { // 为普通商品
            const QTY = self.jordanTableConfigGenera.businessFormConfig.formValue.QTY;
            arr = res.data.data.filter(item => ename == item.ECODE)[0];
            if (self.jordanTableConfigGenera.data.some(item => item.ECODE == arr.ECODE)) {
              $utils.msgTips(self, 'warning', $it('modalTips.jz'), 0); // 请勿重复添加该明细!
              return;
            }
            arr.PS_C_SKU_ID = '-1';
            arr.QTY = QTY;
            self.jordanTableConfigGenera.data.push(arr);
            self.modify.generalGroupItem.push(arr); // 添加的明细记录到修改记录里
            self.jordanTableConfigGenera.businessFormConfig.formValue.gbCode = '';
          } else if (self.groupType == 1) {
            arr = res.data.data.filter(item => ename == item.ECODE)[0];
            if (self.jordanTableConfigLuck.data.some(item => item.ECODE == arr.ECODE)) {
              $utils.msgTips(self, 'warning', $it('modalTips.jz'), 0); // 请勿重复添加该明细!
              return;
            }
            arr.PS_C_SKU_ID = '-1';
            arr.GROUPNUM = self.jordanTableConfigLuck.businessFormConfig.formValue.GROUPNUM; // 分组
            arr.QTY = 1;
            // arr.NUM = self.jordanTableConfigLuck.businessFormConfig.formValue.NUM; // 每组抽取数
            self.jordanTableConfigLuck.data.push(arr);
            self.modify.luckGroupItem.push(arr);
            self.jordanTableConfigLuck.businessFormConfig.formValue.gbCode = '';
          }
        } else { }
      });
    },
    delGeneral() {
      const self = this;
      if (!self.selectDatas.length) {
        $utils.msgTips(self, 'warning', 'df');
        return;
      }
      const data = [];
      self.selectDatas.forEach(item => {
        if (item.PS_C_SKU_ID !== '-1') {
          data.push(item.ID);
        }
      });
      if (data.length) {
        self.service.commodityCenter.skuGroupDelItem({
          ID: self.id,
          ITEMIDS: data,
          FLAG: false
        }).then(res => {
          console.log(res);
          if (res.data.code == 0) {
            $utils.msgTips(self, 'success', res.data.message, 0);
            // 本地删除勾选数据 表格数据和modify里的数据
            const delArr = self.selectDatas.map(item => item.PS_C_SKU_ID);
            const resultArr = [];
            const resultModify = [];
            self.jordanTableConfigGenera.data.forEach(item => { // 删除表格数据
              if (!delArr.includes(item.PS_C_SKU_ID)) {
                resultArr.push(item);
              }
            });
            self.modify.generalGroupItem.forEach(item => {
              if (!delArr.includes(item.PS_C_SKU_ID)) {
                resultModify.push(item);
              }
            });
            self.jordanTableConfigGenera.data = resultArr;
            self.modify.generalGroupItem = resultModify;
          } else { }
        });
      } else {
        const arr = self.selectDatas.map(item => item.ID);
        self.jordanTableConfigGenera.data = self.jordanTableConfigGenera.data.filter(item => !arr.includes(item.ID));
        self.modify.generalGroupItem = self.modify.generalGroupItem.filter(item => !arr.includes(item.ID));
      }
      self.isModify = true;
    },
    delLuck() {
      const self = this;
      const data = [];
      if (!self.selectDatas.length) {
        $utils.msgTips(self, 'warning', 'df', 0);
        return;
      }
      self.selectDatas.forEach(item => {
        if (item.PS_C_SKU_ID !== '-1') {
          data.push(item.ID);
        }
      });
      if (data.length) {
        self.service.commodityCenter.skuGroupDelItem({
          ID: self.id,
          ITEMIDS: data,
          FLAG: false
        }).then(res => {
          console.log(res);
          if (res.data.code == 0) {
            $utils.msgTips(self, 'success', res.data.message, 0);
            // 本地删除勾选数据 表格数据和modify里的数据
            const delArr = self.selectDatas.map(item => item.PS_C_SKU_ID);
            const resultArr = [];
            const resultModify = [];
            self.jordanTableConfigLuck.data.forEach(item => { // 删除表格数据
              if (!delArr.includes(item.PS_C_SKU_ID)) {
                resultArr.push(item);
              }
            });
            self.modify.luckGroupItem.forEach(item => {
              if (!delArr.includes(item.PS_C_SKU_ID)) {
                resultModify.push(item);
              }
            });
            self.jordanTableConfigLuck.data = resultArr;
            self.modify.luckGroupItem = resultModify;
          } else { }
        });
      } else {
        const arr = self.selectDatas.map(item => item.ID);
        self.jordanTableConfigLuck.data = self.jordanTableConfigLuck.data.filter(item => !arr.includes(item.ID));
        self.modify.luckGroupItem = self.modify.luckGroupItem.filter(item => !arr.includes(item.ID));
      }
      self.isModify = true;
    },
    clearItem() {
      this.masterModifyData('group_type', 'master');
      this.label.labelValue = this.formConfig.formValue.group_type == 2 ? 'generalGroupItem' : 'luckbagGroupItem';
      this.service.commodityCenter.skuGroupDelItem({ ID: this.id, FLAG: true });
      this.jordanTableConfigGenera.data = [];
      this.jordanTableConfigLuck.data = [];
    },
    unClearItem() {
      this.isClearItem = false
      this.formConfig.formValue.group_type = this.formConfig.formValue.group_type == 1 ? 2 : 1;
    },
    onSelect(selection, row) { // 勾选普通/福袋明细
      console.log(selection);
      console.log(row);
      const self = this;

      if (self.formConfig.formValue.group_type == 2) {
        console.log('普通');
        self.selectDatas = selection;
      } else {
        console.log('福袋');
        self.selectDatas = selection;
      }
    }
  }
};

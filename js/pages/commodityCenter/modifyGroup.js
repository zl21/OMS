import businessButton from 'professionalComponents/businessButton';
import businessForm from 'professionalComponents/businessForm';
import businessLabel from 'professionalComponents/businessLabel';

import businessStatusFlag from 'professionalComponents/businessStatusFlag';
import businessActionTable from 'professionalComponents/businessActionTable';
import publicMethodsUtil from '@/assets/js/public/publicMethods.js';
import comUtils from '@/assets/js/__utils__/common.js';
import logTable from 'professionalComponents/LogTable';

export default {
  components: {
    businessButton,
    businessForm,
    businessLabel,
    businessStatusFlag,
    logTable,
    businessActionTable
  },
  computed: {
    id() {
      return this.$route.params.customizedModuleId == 'New' ? -1 : this.$route.params.customizedModuleId;
    },
    groupType() {
      return this.formConfig.formValue.group_type;
    }
  },
  data() {
    return {
      vmI18n:$i18n,
      collapse: 'panel_baseInfo',
      btnConfig: {
        typeAll: 'default',
        buttons: [{
            webname: 'lookup_save', // 保存
            text: '保存',
            size: '', // 按钮大小
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              this.save();
            },
          },
          {
            webname: 'lookup_return', // 返回
            text: $i18n.t('btn.back'),
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
                tableId: 10108,
                type: 'S',
                tableName: 'PS_C_PRO_GROUP',
                back: true,
              });
                  }
                });
              } else {
                comUtils.tabCloseAppoint(this);
              this.$destroy(true);
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
      },
      formConfig: {
        formData: [{
            style: 'input',
            label: '组合商品编码',
            value: 'ecode',
            width: '8',
            disabled: this.id !== 'New',
            inputChange: () => {
              this.masterModifyData('ecode', 'master');
            }
          },
          {
            style: 'input',
            label: '组合商品名称',
            value: 'ename',
            width: '24',
            disabled: false,
            inputChange: () => {
              this.masterModifyData('ename', 'master');
            }
          },
          {
            colname: 'TYPE',
            style: 'select', // 下拉框类型
            label: '类型',
            width: '8', // 所占宽度宽度
            value: 'type', // 输入框的值
            clearable: true,
            selectChange: () => {
              this.masterModifyData('type', 'master');
            },
            options: [
              // 下拉框选项值
              {
                label: 1,
                value: 1
              },
              {
                label: 2,
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
              this.formConfig.formValue.ps_c_pro_classify_id = e.pid;
              this.modify.master.ps_c_pro_classify_id = e.pid;
            },
          },
          {
            style: 'input',
            label: '零售价',
            value: 'price_retail',
            width: '24',
            inputChange: () => {
              this.masterModifyData('price_retail', 'master');
            }
          },
          {
            colname: 'group_type',
            style: 'select', // 下拉框类型
            label: '组合类型',
            width: '8', // 所占宽度宽度
            value: 'group_type', // 输入框的值
            clearable: true,
            selectChange: () => {
              if(!this.WatchChange) return;
              this.isClearItem = true;
            },
            options: [
              // 下拉框选项值
              {
                label: '普通',
                value: 2
              },
              {
                label: '福袋',
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
          price_retail: ''
        },
        ruleValidate: {
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
          }]
        }
      },
      label: {
        labelList: [{
          label: '普通组合明细',
          value: 'generalGroupItem',
        }],
        labelTagList: [{
          label: '福袋组合明细',
          value: 'luckbagGroupItem',
        }],
        labelDefaultValue: '',
        labelValue: 'generalGroupItem'
      },
      jordanTableConfigLuck: { // 福袋明细配置
        indexColumn: true,
        businessButtonConfig: { // 表格内按钮配置
          typeAll: 'default',
          btnsite: 'right', // 按钮位置 (right , center , left)
          buttons: [{
              webname: 'order_fund', // 返回
              text: '添加',
              btnclick: () => {
                this.addgeneralItem();
              },
            },
            {
              webname: 'order_fund', // 返回
              text: '删除',
              btnclick: () => {
                this.delLuck();
              },
            },
          ]
        },
        businessFormConfig: {
          formData: [{
              style: 'input',
              label: '每组抽取数', // 卖家备注
              value: 'NUM',
              disabled: false,
              dataAcessKey: 'NUM',
              width: '6',
              inputChange: () => {
                this.masterModifyData('NUM', 'master');
              }
            },
            {
              label: 'SKU编码', // 商品编码
              style: 'dimSearch',
              width: '6',
              value: 'gbCode',
              columns: ['ECODE'],
              AuotData: [], // 匹配的选项
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
              dimEnter: (val) => {},
              dimSelect: (val) => {
                this.jordanTableConfigLuck.businessFormConfig.formValue.gbCode = val.tem.ECODE;
              },
            },
            {
              style: 'input',
              label: '分组', // 卖家备注
              value: 'GROUPNUM',
              disabled: false,
              dataAcessKey: 'GROUPNUM',
              width: '6',
              inputenter: ()=>{
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
            title: 'SKU编码',
            key: 'ECODE'
          },
          {
            title: 'SKU名称',
            key: 'ENAME'
          },
          {
            title: '零售价',
            key: 'PRICE_RETAIL'
          },
          {
            title: '分组',
            key: 'GROUPNUM'
          },
          {
            title: '商品数量',
            key: 'QTY'
          },
        ],
        data: [],
      },
      jordanTableConfigGenera: { // 普通明细配置
        businessButtonConfig: { // 表格内按钮配置
          typeAll: 'default',
          btnsite: 'right', // 按钮位置 (right , center , left)
          buttons: [{
              webname: 'order_fund', // 返回
              text: '添加',
              btnclick: () => {
                this.addgeneralItem();
              },
            },
            {
              webname: 'order_fund', // 返回
              text: '删除',
              btnclick: () => {
                this.delGeneral();
              },
            },
          ]
        },
        businessFormConfig: {
          formData: [{
              label: 'SKU编码', // 商品编码
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
              inputenter: ()=>{
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
            title: 'SKU编码',
            key: 'ECODE'
          },
          {
            title: 'SKU名称',
            key: 'ENAME'
          },
          {
            title: '零售价',
            key: 'PRICE_RETAIL'
          },
          {
            title: '商品数量',
            key: 'QTY'
          },
        ],
        data: [],
      },
      dataitem: {
        url: '/p/cs/upload2',
        sendData: {
          path: 'AC_F_PAYABLE_ADJUSTMENT/-1/',
        },
        width: 250,
        height: 170,
        colname: 'IMAGE',
        name: $i18n.t('other.uploadVoucher'), // 上传凭证
        readonly: false,
        valuedata: [],
      },
      imgIndex: '',
      isModal: false,
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
  async mounted() {
    const self = this;
    self.dataitem.url = self.$OMS2.omsUtils.splicingGateWay('commodityCenter','/p/cs/upload2')
    await this.getSelectOption();
    await this.query();
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
          // self.$OMS2.omsUtils.msgTips(self, 'success', res.data.message, 0);
          self.setForm(res.data.data);
        } else {
          self.$OMS2.omsUtils.msgTips(self, 'error', res.data.message, 0);
        }
      });
    },
    setForm(data) {
      const self = this;
      self.formConfig.formValue.ecode = data.PsCProGroup.ECODE;
      self.formConfig.formValue.ename = data.PsCProGroup.ENAME;
      self.formConfig.formValue.type = data.PsCProGroup.TYPE;
      self.formConfig.formValue.price_retail = data.PsCProGroup.PRICE_RETAIL;
      self.formConfig.formValue.group_type = data.PsCProGroup.GROUP_TYPE;
      self.modify.master.group_type = data.PsCProGroup.GROUP_TYPE;

      // 赋值品牌 商品分类
      self.formConfig.formData.forEach(ele => {
        if (ele.colname == 'PS_C_BRAND_ID') {
          ele.itemdata.pid = data.PsCProGroup.PS_C_BRAND_ID;
          ele.itemdata.valuedata = data.PsCProGroup.PS_C_BRAND_ENAME;
        } else if (ele.colname == 'PS_C_PRO_CLASSIFY_ID') {
          ele.itemdata.pid = data.PsCProGroup.PS_C_PRO_CLASSIFY_ID;
          ele.itemdata.valuedata = data.PsCProGroup.PS_C_PRO_CLASSIFY_ENAME;
        }
      });

      // 赋值明细
      if (data.PsCProGroup.GROUP_TYPE == 2) { // 普通组合明细
        self.label.labelValue = 'generalGroupItem';
        self.jordanTableConfigGenera.data = data.PsCProGroupItems;
      } else {
        self.label.labelValue = 'luckbagGroupItem';
        self.jordanTableConfigLuck.data = data.PsCProGroupItems;
      }
      setTimeout(()=>{
        self.WatchChange = true;
      }, 10);
    },
    save() {
      const self = this;
      let str = '';
      if (!self.formConfig.formValue.ecode) {
        str += '组合商品编码 ';
      } else if (!self.formConfig.formValue.ename) {
        str += '组合商品名称 ';
      }else if (!self.formConfig.formValue.group_type) {
        str += '组合类型 ';
      } else if (!self.formConfig.formData.filter(item=>item.colname == 'PS_C_BRAND_ID')[0].itemdata.pid) {
        str += '品牌 ';
      } else if (!self.formConfig.formData.filter(item=>item.colname == 'PS_C_PRO_CLASSIFY_ID')[0].itemdata.pid) {
        str += '商品分类';
      }
      if (str) {
        self.$OMS2.omsUtils.msgTips(self, 'warning', `${str}不能为空!`, 0);
        return;
      }
      self.modify.master.IMAGE = JSON.stringify(self.modify.master.IMAGE);
      const data = {
        objid: this.id,
        PsCProGroup: self.modify.master,
        SkuGroupRequestList: self.groupType == 2 ? self.modify.generalGroupItem : self.modify.luckGroupItem
      };
      self.service.commodityCenter.skuGroupSave(data).then(res => {
        console.log(res);
        if (res.data.code == 0) {
          self.$OMS2.omsUtils.msgTips(self, 'success', res.data.message, 0);
          self.isModify = false
          // self.query(res.data.data);
          $store.commit('customize/TabOpen', {
            id: res.data.data,
            type: 'action',
            name: 'PS_C_PRO_GROUP',
            label: '组合商品编辑', // 额外退款编辑
          });
        } else {
          self.$OMS2.omsUtils.msgTips(self, 'error', res.data.message, 0);
        }
      });
    },
    // 获取类型下拉数据
    async getSelectOption() {
      const self = this;
      self.formConfig.formData = await publicMethodsUtil.getTypeList('PS_C_PRO_GROUP', ['TYPE'], '基础信息', self.formConfig);
    },
    // 删除图片
    // 删除图片
    deleteImg(imgInfo, imgIndex) {
      this.imgIndex = imgIndex;
      this.isModal = true;
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
    // 弹框-确认删除图片
    deleteImgBySure() {
      this.dataitem.valuedata.splice(this.imgIndex - 1, 1);
      this.formConfig.formValue.IMAGE = this.dataitem.valuedata;
      this.modify.master.IMAGE = this.dataitem.valuedata;
    },
    labelClick(e) { // tab明细切换
      console.log(e);
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
        self.$OMS2.omsUtils.msgTips(self, 'warning', 'fh');
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
              self.$OMS2.omsUtils.msgTips(self, 'warning', '请勿重复添加该明细!', 0);
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
              self.$OMS2.omsUtils.msgTips(self, 'warning', '请勿重复添加该明细!', 0);
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
        } else {
          self.$OMS2.omsUtils.msgTips(self, 'error', res.data.message, 0);
        }
      });
    },
    delGeneral() {
      const self = this;
      if (!self.selectDatas.length) {
        self.$OMS2.omsUtils.msgTips(self, 'warning', 'df');
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
            self.$OMS2.omsUtils.msgTips(self, 'success', res.data.message, 0);
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
          } else {
            self.$OMS2.omsUtils.msgTips(self, 'error', res.data.message, 0);
          }
        });
      } else {
        const arr = self.selectDatas.map(item => item.ID);
        self.jordanTableConfigGenera.data = self.jordanTableConfigGenera.data.filter(item => !arr.includes(item.ID));
      }
      self.isModify = true;
    },
    delLuck() {
      const self = this;
      const data = [];
      if (!self.selectDatas.length) {
        self.$OMS2.omsUtils.msgTips(self, 'warning', 'df', 0);
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
              self.$OMS2.omsUtils.msgTips(self, 'success', res.data.message, 0);
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
            } else {
              self.$OMS2.omsUtils.msgTips(self, 'error', res.data.message, 0);
            }
          });
        } else {
          const arr = self.selectDatas.map(item => item.ID);
        self.jordanTableConfigLuck.data = self.jordanTableConfigLuck.data.filter(item => !arr.includes(item.ID));
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

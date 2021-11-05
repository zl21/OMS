/**
 * 商品自定义属性
 */
import { OmsButton, OmsForm, OmsLabel, subTable as orderItem, OmsTable } from 'burgeonComponents'
import publicMethodsUtil from '@/assets/js/public/publicMethods.js';
import modifycurrentLabel from '../../../assets/js/mixins/modifycurrentLabel';

export default {
  components: {
    orderItem,
    OmsButton,
    OmsForm,
    OmsLabel,
    OmsTable,
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
      subTableConfig: {},
      ID: this.$route.params.customizedModuleId && this.$route.params.customizedModuleId != 'New' ? this.$route.params.customizedModuleId : '-1', // 记录主界面传入的ID
      showSubtablePart: false,
      loading: false,
      backable: false,
      modify: {
        // 监听并暂存修改的信息，便于调保存的时候传给后端
        master: {}, // 修改后的主表信息
        subTable: [], // 修改后的子表信息
      },
      watchChange: false, // 监听修改变化
      btnConfig: {
        btnsite: 'right',
        typeAll: 'default',
        buttons: [{
          webname: 'ATTRIBUTE_SaveBtn',
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
      // 主表Part-formConfig
      formConfig: {
        formData: [{
          style: 'input',
          label: '属性编码',
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
          label: '属性名称',
          value: 'ENAME',
          colname: 'ENAME',
          width: '6',
          disabled: false,
          inputChange: () => {
            this.masterModifyData('ENAME', 'master');
          },
        },
        {
          style: 'input',
          label: '属性别名',
          value: 'ALIAS_NAME',
          colname: 'ALIAS_NAME',
          width: '6',
          disabled: false,
          inputChange: () => {
            this.masterModifyData('ALIAS_NAME', 'master');
          },
        },
        {
          colname: 'TYPE',
          style: 'select', // 下拉框类型
          label: '属性类型',
          width: '6', // 所占宽度宽度
          value: 'TYPE', // 输入框的值
          disabled: false,
          selectChange: (value) => {
            this.masterModifyData('TYPE', 'master');
            if (this.ID < 0) {
              if (this.formConfig.formValue.TYPE == 'LIST') {
                this.showSubtablePart = true;
              } else {
                this.showSubtablePart = false;
              }
            } else {
              // 下拉型，展示'属性值'
              if (this.formConfig.formValue.TYPE == 'LIST') {
                if (this.labelList[0].value != 'PROPERTYVALUES') {
                  this.labelList.unshift({
                    label: '属性值',
                    value: 'PROPERTYVALUES',
                  });
                  this.labelDefaultValue = 'PROPERTYVALUES';
                }
              } else {
                this.labelList.forEach((it, index) => {
                  if (it.value == 'PROPERTYVALUES') {
                    this.labelList.splice(index, 1);
                    this.labelDefaultValue = '';
                  }
                });
              }
            }
          },
          options: [
            // 下拉框选项值
          ],
        },
        {
          colname: 'LOCATION',
          style: 'select', // 下拉框类型
          label: '属性形式',
          width: '6', // 所占宽度宽度
          value: 'LOCATION', // 输入框的值
          disabled: false,
          /* tips: {
            content: '枚举：全部、固定属性、自定义属性；默认：全部',
            maxWidth: '400',
            // placement:'bottom',
            // theme:'light',
          }, */
          selectChange: (value) => {
            this.masterModifyData('LOCATION', 'master');
          },
          options: [
            // 下拉框选项值
          ],
        },
        {
          colname: 'TABLE_NAME',
          style: 'select', // 下拉框类型
          label: '属性归属',
          width: '6', // 所占宽度宽度
          value: 'TABLE_NAME', // 输入框的值
          selectChange: (value) => {
            this.masterModifyData('TABLE_NAME', 'master');
          },
          options: [
            // 下拉框选项值
          ],
        },
        ],
        formValue: {
          ECODE: '',
          ENAME: '',
          ALIAS_NAME: '',
          TYPE: '',
          LOCATION: '',
          TABLE_NAME: '',
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
          ALIAS_NAME: [{
            required: true,
            message: ' '
          }],
          TYPE: [{
            required: true,
            message: ' '
          }],
          LOCATION: [{
            required: true,
            message: ' '
          }],
          TABLE_NAME: [{
            required: true,
            message: ' '
          }],
        },
      },
      // 子表Part
      propertyValuesConfig: {
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
        pageSizeOpts: [10, 20, 30, 50, 100], // 每页条数切换的配置
        pageSize: 10, // 每页条数
        totalData: [],
        selectionData: [],
        deleteData: [], // 暂存删除的数据，调保存的时候传给后端
        addData: [], // 暂存添加的数据，调保存的时候传给后端
        updateData: [], // 暂存修改的数据，调保存的时候传给后端
        data: [],
        isShowSelection: true, // 是否展示select框
        indexColumn: true, // 是否展示序号列
        columns: [{
          title: '名称',
          key: 'ECODE',
          render: (h, params) =>
            h('Input', {
              props: {
                value: params.row.ECODE,
              },
              style: {
                // border: '4px solid #ccc',
              },
              on: {
                'on-change': (e) => {
                  console.log(e.target.value);
                  if (e.target.value != '') {
                    // 修改时，校验是否已经存在，名称不能重复
                    const rowID = params.row.ID;
                    this.propertyValuesConfig.data.forEach((it) => {
                      if (it.ECODE == e.target.value) {
                        this.$message.error('名称已存在！');
                        this.propertyValuesConfig.data.forEach((it) => {
                          if (it.ID == rowID) {
                            // 重置为未修改前的ECODE
                            e.target.value = it.ECODE;
                          }
                        });
                      }
                    });
                  }
                  if (params.row.ID != -1) {
                    // ID不为-1则是修改，反之为新增的
                    params.row.ECODE = e.target.value;
                    if (!this.propertyValuesConfig.updateData.length) {
                      params.row.actionName = 'UPDATE';
                      this.propertyValuesConfig.updateData.push(params.row);
                      return;
                    }
                    this.propertyValuesConfig.updateData.forEach((it) => {
                      if (it.ID != params.row.ID) {
                        // 不存在则push
                        params.row.actionName = 'UPDATE';
                        this.propertyValuesConfig.updateData.push(params.row);
                      } else if (it.ID == params.row.ID) {
                        // 存在则修改对应的ECODE
                        it.ECODE = e.target.value;
                        // 存在则判断SORT_NO是否被改过，未改过则保存时仅传ECODE
                        if (it.SORT_NO == params.row.SORT_NO) {
                          delete it.SORT_NO;
                        }
                      }
                    });
                  } else {
                    this.propertyValuesConfig.addData.forEach((it) => {
                      // 修改对应项
                      if (it.key == params.row.key) {
                        it.ECODE = e.target.value;
                      }
                    });
                  }
                },
              },
            }),
        },
        {
          title: '顺序号',
          key: 'SORT_NO',
          render: (h, params) =>
            h('Input', {
              props: {
                value: params.row.SORT_NO,
              },
              on: {
                'on-change': (e) => {
                  if (params.row.ID != -1) {
                    // ID不为-1则是修改，反之为新增的
                    params.row.SORT_NO = e.target.value;
                    if (!this.propertyValuesConfig.updateData.length) {
                      params.row.actionName = 'UPDATE';
                      this.propertyValuesConfig.updateData.push(params.row);
                      return;
                    }
                    this.propertyValuesConfig.updateData.forEach((it) => {
                      if (it.ID != params.row.ID) {
                        // 不存在则push
                        params.row.actionName = 'UPDATE';
                        this.propertyValuesConfig.updateData.push(params.row);
                      } else if (it.ID == params.row.ID) {
                        // 存在则修改对应的SORT_NO
                        it.SORT_NO = e.target.value;
                        // 存在则判断ECODE是否被改过，未改过则保存时仅传SORT_NO
                        if (it.ECODE == params.row.ECODE) {
                          delete it.ECODE;
                        }
                      }
                    });
                  } else {
                    this.propertyValuesConfig.addData.forEach((it) => {
                      // 修改对应项
                      if (it.key == params.row.key) {
                        it.SORT_NO = e.target.value;
                      }
                    });
                  }
                },
              },
            }),
        },
        ],
        businessFormConfig: {
          formData: [{
            style: 'input',
            label: '名称',
            value: 'ECODE',
            colname: 'ECODE',
            width: '6',
            disabled: false,
          },
          {
            style: 'input',
            label: '顺序号',
            value: 'SORT_NO',
            colname: 'SORT_NO',
            width: '6',
            disabled: false,
          },
          ],
          formValue: {
            ECODE: '',
            SORT_NO: '',
          },
          ruleValidate: {
            ECODE: [{
              required: true,
              message: ' '
            }],
          },
        },
        businessButtonConfig: {
          typeAll: 'default',
          buttons: [{
            type: 'primary',
            text: '添加',
            size: '', // 按钮大小
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              this.addAttrValue();
            },
          },
          {
            type: 'warning',
            text: $i18n.t('btn.delete'), // 删除
            btnclick: () => {
              this.deleteAttrValue();
            },
          },
          ],
        },
      },
      // tab切换配置
      labelList: [{
        label: '属性值',
        value: 'PROPERTYVALUES',
      },
      {
        label: $i18n.t('panel_label.operationLog'), // 操作日志
        value: 'BS_EXTRA_ATTRIBUTE_DEF_LOG',
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
  activated() {
    if (this.ID > 0) {
      this.getBtn();
    }
  },
  mounted() {
    const self = this;
    if (self.ID > 0) {
      // 详情
      this.getBtn();
      setTimeout(() => {
        self.initObjItem(self.ID);
      }, 10);
    } else {
      // 新增
      this.getSelectData(); // 初始化下拉选项
      self.labelList.splice(1, 1);
      self.watchChange = true;
    }
  },
  created() { },
  methods: {
    getBtn() {
      $OMS2.omsUtils.getPermissions(this, 'btnConfig', { table: 'BS_C_EXTRA_ATTRIBUTE_DEF_PRO', type: 'OBJ', serviceId: 'r3-oc-oms' }, true).then(res => {
        console.log('buttons::', this.btnConfig.buttons, 'res::', res);
      })
    },
    /* -------------------- 详情初始化 start -------------------- */
    async initObjItem(id) {
      const self = this;
      this.loading = true;
      const data = await $omsUtils.getObject('BS_C_EXTRA_ATTRIBUTE_DEF_PRO', id);
      self.watchChange = false;
      // self.formConfig = $omsUtils.analysisForm(data, self.formConfig, '基础信息', ['TYPE', 'LOCATION', 'TABLE_NAME']);
      self.formConfig = $omsUtils.initFormConfig(data.addcolums[0].childs, self.formConfig);
      self.showSubtablePart = true;
      if (self.formConfig.formValue.TYPE != 'LIST') {
        // 非下拉型，只展示'操作日志'
        self.labelList.forEach((it, index) => {
          if (it.value == 'PROPERTYVALUES') {
            self.labelList.splice(index, 1);
            self.labelDefaultValue = 'BS_EXTRA_ATTRIBUTE_DEF_LOG';
          }
        });
      } else {
        self.labelDefaultValue = 'PROPERTYVALUES';
      }
      /* 子表初始化： */
      const subData = await $omsUtils.initSubtable('BS_C_EXTRA_ATTRIBUTE_DEF_ITEM', self.ID, '165821');
      self.propertyValuesConfig.data = subData.rowData;
      self.propertyValuesConfig.total = subData.otherData.totalRowCount;

      if (self.ID > 0) {
        // 属性编码/属性类型/属性形式-不可编辑
        // const readonlyArr = ['ECODE', 'TYPE']
        self.formConfig.formData.find(it => it.colname == 'ECODE').disabled = true;
        self.formConfig.formData.find(it => it.colname == 'TYPE').disabled = true;
        self.formConfig.formData.find(it => it.colname == 'LOCATION').disabled = true;
      }
      this.subTableConfig = {
        centerName: 'commodityCenter',
        tablename: 'BS_EXTRA_ATTRIBUTE_DEF_LOG',
        objid: this.ID,
        pageShow: true,
      };
      this.loading = false;
      self.watchChange = true;
    },
    /* -------------------- 详情初始化 end -------------------- */

    /* -------------------- 子表Part start -------------------- */
    // 添加按钮
    addAttrValue() {
      const self = this;
      let flag = true;
      const inputECODE = self.propertyValuesConfig.businessFormConfig.formValue.ECODE; // 输入的名称
      const inputSORT_NO = self.propertyValuesConfig.businessFormConfig.formValue.SORT_NO; // 输入的顺序号
      if (!inputECODE) {
        this.$message.error('名称不能为空！');
        return;
      }
      self.propertyValuesConfig.data.forEach((it) => {
        if (inputECODE == it.ECODE) {
          this.$message.error('名称已存在！');
          flag = false;
        }
        if (it.SORT_NO && inputSORT_NO == it.SORT_NO) {
          this.$message.error('顺序号已存在！');
          flag = false;
        }
      });
      if (!flag) return;
      let rowData = {}; // 添加的行数据
      const bFormV = self.propertyValuesConfig.businessFormConfig.formValue;
      for (const key in bFormV) {
        rowData[key] = bFormV[key];
        rowData.actionName = 'SAVE';
        rowData.ID = '-1';
        rowData.key = $omsUtils.generateKey();
      }
      self.propertyValuesConfig.addData.push(rowData);
      self.propertyValuesConfig.data.push(rowData);
      // 添加结束，清空input框
      self.propertyValuesConfig.businessFormConfig.formValue.ECODE = '';
      self.propertyValuesConfig.businessFormConfig.formValue.SORT_NO = '';
    },
    // 删除按钮
    deleteAttrValue() {
      const self = this;
      let allArrs = self.propertyValuesConfig.data;
      let partArrs = self.propertyValuesConfig.selectionData;
      if (!partArrs.length) {
        return this.$Message.warning('请选择要删除的属性值！')
      }
      partArrs.forEach((item) => {
        if (item.ID == '-1') {
          // 刚新增的被删除了则不push，且要从addData中移除
          let deArritem = [];
          deArritem.push(item);
          self.propertyValuesConfig.addData = $omsUtils.getDifferentArr(self.propertyValuesConfig.addData, deArritem, 'ID');
          return;
        } else {
          item.actionName = 'DELETE';
          self.propertyValuesConfig.deleteData = self.propertyValuesConfig.deleteData.concat(partArrs);
        }
      });
      // 筛选出差集作为展示
      self.propertyValuesConfig.data = $omsUtils.getDifferentArr(allArrs, partArrs, 'ECODE');
    },
    /* -------------------- 子表Part end -------------------- */

    // 保存
    async save() {
      console.clear();
      const self = this;
      let bsCExtraAttributeDefDTO = {};
      let bsCExtraAttributeDefItemDTOList = [];
      // 子表部分--添加的、修改的、删除的
      bsCExtraAttributeDefItemDTOList = [...self.propertyValuesConfig.addData, ...self.propertyValuesConfig.deleteData, ...self.propertyValuesConfig.updateData];
      /* =====¬¬_¬¬===== 保存校验 start =====¬¬_¬¬===== */
      const masterArr = Object.keys(self.modify.master);
      if (!masterArr.length && !bsCExtraAttributeDefItemDTOList.length) {
        // 未修改，不提示，不操作
        return false;
      }
      const valueArr = ['ECODE', 'ENAME', 'ALIAS_NAME', 'TYPE', 'LOCATION', 'TABLE_NAME'];
      const mes = $omsUtils.validatorNotEmpty(self.formConfig, valueArr);
      if (mes) {
        this.$message.error(mes);
        return false;
      }
      if (self.formConfig.formValue.TYPE == 'LIST' && !self.propertyValuesConfig.data.length) {
        this.$message.error('明细不能为空！');
        return false;
      }
      /* =====¬¬_¬¬===== 保存校验 end =====¬¬_¬¬===== */
      let param = {
        objid: self.ID,
        // bsCExtraAttributeDefDTO, // 主表修改信息
        bsCExtraAttributeDefItemDTOList, // 子表修改信息
      };
      if (masterArr.length) param.bsCExtraAttributeDefDTO = Object.assign(bsCExtraAttributeDefDTO, self.modify.master); //主表修改信息
      // if (bsCExtraAttributeDefItemDTOList.length) param.bsCExtraAttributeDefItemDTOList = bsCExtraAttributeDefItemDTOList; //子表修改信息
      this.loading = true;
      const {
        data: {
          code,
          data,
          message
        },
      } = await self.service.commodityCenter.cusAttrSave(param).catch(() => {
        this.loading = false;
      });
      this.loading = false;
      if (code === 0) {
        self.backable = true;
        self.modify.master = {};
        self.propertyValuesConfig.addData = [];
        self.propertyValuesConfig.deleteData = [];
        self.propertyValuesConfig.updateData = [];
        self.$Message.success(message);
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
        self.onOk();
        return;
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
      //$omsUtils.tabCloseAppoint(this);
      // this.$destroy(true);
      this.$store.commit('global/tabOpen', {
        tableId: 10096,
        type: 'S',
        tableName: 'BS_C_EXTRA_ATTRIBUTE_DEF_PRO',
        back: true,
      });
    },
    /* --------------- 表格事件 --------------- */
    delTableDetail() { },
    addTableDetail() { },
    onSelect(e) {
      // e为选中的数组对象RowArr
      this.propertyValuesConfig.selectionData = e;
    },
    onSelectCancel(e) {
      this.propertyValuesConfig.selectionData = e;
    },
    onSelectAll(e) {
      this.propertyValuesConfig.selectionData = e;
    },
    onSelectAllCancel(e) {
      this.propertyValuesConfig.selectionData = e;
    },
    pageChange() { },
    pageSizeChange() { },

    /* --------------------- 工具函数： --------------------- */
    keyDown(e) {
      // console.log(e);
    },
    // 切换Label & 实时渲染subTable
    labelClick(item) {
      this.labelDefaultValue = item.value;
      if (this.labelDefaultValue == 'PROPERTYVALUES') return;
      this.subTableConfig = {
        centerName: 'commodityCenter',
        tablename: this.labelDefaultValue,
        objid: this.ID,
        pageShow: true,
      };
    },
    // 填充下拉选项框
    async getSelectData() {
      const self = this;
      self.formConfig.formData = await publicMethodsUtil.getTypeList('BS_C_EXTRA_ATTRIBUTE_DEF_PRO', ['TYPE', 'LOCATION', 'TABLE_NAME'], '基础信息', self.formConfig);
    },
    /**
     * 记录主表修改信息方法
     * @ecode 记录字段
     * @obj 修改值暂存在modify下的某个对象中
     */
    masterModifyData(ecode, obj) {
      const self = this;
      if (!self.watchChange) return;
      self.modify[obj][ecode] = self.formConfig.formValue[ecode];
    },
  },
};

/**
 * 商品分类
 */
import modifycurrentLabel from '../../../assets/js/mixins/modifycurrentLabel';

export default {
  mixins: [new modifycurrentLabel()],
  data() {
    return {
      vmI18n: $i18n,
      fresh2: 0,
      subTableConfig: {},
      ID: this.$route.params.customizedModuleId && this.$route.params.customizedModuleId != 'New' ? this.$route.params.customizedModuleId : '-1', // 记录主界面传入的ID
      loading: false,
      showSubtablePart: false,
      watchChange: false, // 监听修改变化
      modify: {
        // 监听并暂存修改的信息，便于调保存的时候传给后端
        master: {}, // 修改后的主表信息
        subTable: [], // 修改后的子表信息
      },
      backable: false, // 可返回否
      saveable: false, // 可保存否
      btnConfig: {
        btnsite: 'right',
        typeAll: 'default',
        buttons: [{
          webname: 'CLASSIFY_SaveBtn',
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
      // 主表Part-基本信息-formConfig1
      formConfig: {
        formData: [{
          style: 'input',
          label: '分类编码',
          value: 'ECODE',
          colname: 'ECODE',
          width: '6',
          regx: /^(\s*|[\u4E00-\u9FA5A-Za-z0-9_]+)$/,
          disabled: false,
          inputChange: () => {
            this.masterModifyData('ECODE', 'master');
          },
        },
        {
          style: 'input',
          label: '分类名称',
          value: 'ENAME',
          colname: 'ENAME',
          width: '6',
          regx: /^(\s*|[\u4E00-\u9FA5A-Za-z0-9_]+)$/,
          disabled: false,
          inputChange: () => {
            this.masterModifyData('ENAME', 'master');
          },
        },
        {
          style: 'input',
          label: '分类英文名称',
          value: 'ENGLISH_NAME',
          colname: 'ENGLISH_NAME',
          width: '6',
          disabled: false,
          inputChange: () => {
            this.masterModifyData('ENGLISH_NAME', 'master');
          },
        },
        {
          version: '1.4',
          colname: 'PARENT_ENAME',
          style: 'popInput', // 输入框弹框单多选
          width: '6',
          itemdata: {
            colid: 165858, // 当前字段的ID
            colname: 'PARENT_ID', // 当前字段的名称
            fkdisplay: 'drp', // 外键关联类型
            isfk: true, // 是否有fk键
            isnotnull: false, // 是否必填
            name: '父类', // 赔付类型
            readonly: false, // 是否可编辑，对应input   readonly属性
            valuedata: '', // 这个是选择的值
            pid: '',
          },
          oneObj: (val) => {
            // 选中触发事件
            console.log('val::', val);
            // if (!val.pid) return;
            this.formConfig.formValue.PARENT_ID = val.pid;
            this.masterModifyData('PARENT_ID', 'master');
          },
        },
        {
          style: null,
          label: $i18n.t('form_label.bg'), //  启用状态
          value: 'STATUS',
          colname: 'STATUS',
          width: '8',
          class: 'statusInput',
          disabled: true,
          inputChange: () => {
            // this.masterModifyData('STATUS', 'master');
          },
        },
        ],
        formValue: {
          ECODE: '',
          ENAME: '',
          ENGLISH_NAME: '',
          PARENT_ENAME: '',
          PARENT_ID: '',
        },
        ruleValidate: {
          ECODE: [{
            required: true,
            message: ' ',
          },],
          ENAME: [{
            required: true,
            message: ' ',
          },],
        },
      },
      // 主表Part-商品维度-formConfig2
      formConfig2: {
        formData: [
          {
            style: 'switch',
            label: '启用多维度规格',
            value: 'OPEN_DIMENSION',
            colname: 'OPEN_DIMENSION',
            class: 'OPEN_DIMENSION',
            width: '6',
            disabled: false,
            switchChange: () => {
              this.formConfig2.formValue.OPEN_DIMENSION_String = this.formConfig2.formValue.OPEN_DIMENSION === true ? 'Y' : 'N';
              this.masterModifyData('OPEN_DIMENSION_String', 'master', 'formConfig2');
              if (this.formConfig2.formValue.OPEN_DIMENSION) {
                this.formConfig2.formData.find((it) => it.colname == 'DIMENSION').disabled = false;
              } else {
                this.formConfig2.formData.find((it) => it.colname == 'DIMENSION').disabled = true;
                this.changeSpec(2);
                this.formConfig2.formValue.DIMENSION = 2;
              }
            },
          },
          {
            colname: 'DIMENSION',
            style: 'select',
            label: '规格维度',
            width: '6',
            value: 'DIMENSION',
            clearable: true,
            disabled: true,
            type: 'NUMBER',
            selectChange: () => {
              const val = this.formConfig2.formValue.DIMENSION;
              this.changeSpec(val);
              this.masterModifyData('DIMENSION', 'master', 'formConfig2');
            },
            options: [
              // 下拉框选项值
              {
                label: '一维',
                value: 1,
              },
              {
                label: '二维',
                value: 2,
              },
              {
                label: '三维',
                value: 3,
              },
            ],
          },
          {
            version: '1.4',
            colname: 'PS_C_SPEC_GROUP_ENAME1',
            style: 'popInputPlus', // 输入框弹框单多选
            width: '6',
            itemdata: {
              version: '1.4',
              colid: 168758, // 当前字段的ID
              colname: 'PS_C_SPEC_GROUP_ID1', // 当前字段的名称
              fkdisplay: 'drp', // 外键关联类型
              isfk: true, // 是否有fk键
              isnotnull: false, // 是否必填
              name: '规格名称一', // 赔付类型
              readonly: false, // 是否可编辑，对应input   readonly属性
              valuedata: '', // 这个是选择的值
              pid: '',
            },
            oneObj: (val) => {
              // 选中触发事件
              console.log('val::', val);
              // if (!val.pid) return;
              this.formConfig2.formValue.PS_C_SPEC_GROUP_ID1 = val.pid;
              this.masterModifyData('PS_C_SPEC_GROUP_ID1', 'master', 'formConfig2');
            },
          },
          {
            colname: 'PS_C_SPEC_GROUP_ENAME2',
            style: 'popInputPlus', // 输入框弹框单多选
            width: '6',
            itemdata: {
              version: '1.4',
              colid: 168757, // 当前字段的ID
              colname: 'PS_C_SPEC_GROUP_ID2', // 当前字段的名称
              fkdisplay: 'drp', // 外键关联类型
              isfk: true, // 是否有fk键
              isnotnull: false, // 是否必填
              name: '规格名称二', // 赔付类型
              readonly: false, // 是否可编辑，对应input   readonly属性
              valuedata: '', // 这个是选择的值
              pid: '',
            },
            oneObj: (val) => {
              // 选中触发事件
              console.log('val::', val);
              // if (!val.pid) return;
              this.formConfig2.formValue.PS_C_SPEC_GROUP_ID2 = val.pid;
              this.masterModifyData('PS_C_SPEC_GROUP_ID2', 'master', 'formConfig2');
            },
          },
          {
            colname: 'PS_C_SPEC_GROUP_ENAME3',
            // style: 'popInput', // 输入框弹框单多选
            style: null,
            width: '6',
            itemdata: {
              colid: 168859, // 当前字段的ID
              colname: 'PS_C_SPEC_GROUP_ID3', // 当前字段的名称
              fkdisplay: 'drp', // 外键关联类型
              isfk: true, // 是否有fk键
              isnotnull: false, // 是否必填
              name: '规格名称三', // 赔付类型
              readonly: false, // 是否可编辑，对应input   readonly属性
              valuedata: '', // 这个是选择的值
              pid: '',
            },
            oneObj: (val) => {
              // 选中触发事件
              console.log('val::', val);
              // if (!val.pid) return;
              this.formConfig2.formValue.PS_C_SPEC_GROUP_ID3 = val.pid;
              this.masterModifyData('PS_C_SPEC_GROUP_ID3', 'master', 'formConfig2');
            },
          },
        ],
        formValue: {
          OPEN_DIMENSION: false,
          OPEN_DIMENSION_String: 'N',
          DIMENSION: 2,
          PS_C_SPEC_GROUP_ENAME1: '',
          PS_C_SPEC_GROUP_ID1: '',
          PS_C_SPEC_GROUP_ENAME2: '',
          PS_C_SPEC_GROUP_ID2: '',
          PS_C_SPEC_GROUP_ENAME3: '',
          PS_C_SPEC_GROUP_ID3: '',
        },
      },
      // 子表Part
      cusAttrConfig: {
        key: 0,
        isSearchText: true, // 是否修改搜索框为select
        isShowDeleteDetailBtn: false, // 控制是否显示删除明细
        isShowAddDetailBtn: false, // 控制是否显示新增明细
        searchSelectList: [], // isSearchText为false的情况下使用 搜索框list
        pageShow: false, // 控制分页是否显示
        searchInputShow: false, // 控制搜索框是否显示
        width: '', // 表格宽度
        height: '300', // 表格高度
        border: true, // 是否显示纵向边框
        total: 0, // 设置总条数
        pageSizeOpts: [10, 20, 30, 50, 100], // 每页条数切换的配置
        pageSize: 10, // 每页条数
        totalData: [],
        selectionData: [], // 选中的数据
        deleteData: [], // 删除的数据
        addData: [], // 添加的数据
        data: [],
        isShowSelection: true, // 是否展示select框
        indexColumn: true, // 是否展示序号列
        columns: [{
          title: '自定义属性名称',
          key: 'BS_C_EXTRA_ATTRIBUTE_DEF_ENAME',
        },
        {
          title: '自定义属性别名',
          key: 'BS_C_EXTRA_ATTRIBUTE_DEF_ALIAS_NAME',
        },
        {
          title: '属性类型',
          key: 'BS_C_EXTRA_ATTRIBUTE_DEF_TYPE',
        },
        ],
        businessFormConfig: {
          formData: [{
            version: '1.4',
            colname: 'BS_C_EXTRA_ATTRIBUTE_DEF_ID',
            style: 'popInput', // 输入框弹框单多选
            width: '6',
            itemdata: {
              colid: 165798, // 当前字段的ID
              colname: 'BS_C_EXTRA_ATTRIBUTE_DEF_ID', // 当前字段的名称
              fkdisplay: 'mrp', // 外键关联类型
              isfk: true, // 是否有fk键
              isnotnull: false, // 是否必填
              name: '自定义属性', // 赔付类型
              readonly: false, // 是否可编辑，对应input   readonly属性
              valuedata: '', // 这个是选择的值
              pid: '',
            },
            oneObj: (val) => {
              // 选中触发事件
              console.log('val1::', val);
              // if (!val.pid) return;
              this.IDS = val.pid.split(',');
            },
          },],
          formValue: {},
          ruleValidate: {},
        },
        businessButtonConfig: {
          typeAll: 'default',
          buttons: [{
            webname: 'CLASSIFY_AddDetailBtn',
            type: 'primary',
            text: $i18n.t('btn.increase'), //'添加',
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              this.addAttrValue();
            },
          },
          {
            webname: 'CLASSIFY_DeleteDetailBtn',
            type: 'warning',
            text: $i18n.t('btn.delete'), // 删除
            btnclick: () => {
              this.deleteAttrValue();
            },
          },
          ],
        },
      },
      IDS: [],
      // tab切换配置
      labelList: [{
        label: '自定义属性',
        value: 'PROPERTY',
      },
      {
        label: $i18n.t('panel_label.operationLog'), // 操作日志
        value: 'PS_C_CLASSIFY_LOG',
      },
      ],
      labelDefaultValue: 'PROPERTY', // 设置tab默认值，默认展示'自定义属性'
      panelDefaultValue: ['panel_baseInfo', 'panel_commodityDimension'], // 设置默认打开'基础信息'
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
  async mounted() {
    const self = this;
    if (self.ID > 0) {
      // 详情
      this.getBtn();
      await self.initObjItem(self.ID);
    } else {
      // 新增
      self.labelList.splice(1, 1);
      self.watchChange = true;
    }
  },
  created() { },
  methods: {
    getBtn() {
      $OMS2.omsUtils.getPermissions(this, 'btnConfig', { table: 'PS_C_PRO_CLASSIFY', type: 'OBJ', serviceId: 'r3-oc-oms' }, true).then(res => {
        console.log('buttons::', this.btnConfig.buttons, 'res::', res);
        const { ACTIONS, SUB_ACTIONS } = res;
        const webArr = $utils.sonList(SUB_ACTIONS, 'webname');
        this.cusAttrConfig.businessButtonConfig.buttons.forEach(item => {
          item.isShow = webArr.includes(item.webname);
          SUB_ACTIONS.forEach(it => {
            if (item.webname == it.webname) {
              item.text = it.webdesc;
            }
          });
        });
        this.cusAttrConfig.key += 1;
        console.log('this.cusAttrConfig.businessButtonConfig.buttons::', this.cusAttrConfig.businessButtonConfig.buttons);
      });
    },
    /* -------------------- 详情初始化 start -------------------- */
    async initObjItem(id) {
      const self = this;
      const formdata = new FormData();
      formdata.append('id', id);
      this.loading = true;
      const inputArr = ['ECODE', 'ENAME', 'ENGLISH_NAME'];
      const drpArr = ['PARENT_ENAME'];
      const inputArr2 = ['OPEN_DIMENSION', 'DIMENSION'];
      const drpArr2 = ['PS_C_SPEC_GROUP_ENAME1', 'PS_C_SPEC_GROUP_ENAME2', 'PS_C_SPEC_GROUP_ENAME3'];
      const {
        data: {
          code,
          data,
          message
        },
      } = await self.service.commodityCenter.queryClassifyInit(formdata);
      this.loading = false;
      if (code == 0) {
        self.formConfig = $omsUtils.transformForm(data.PsCProClassify, self.formConfig, inputArr, drpArr);
        self.formConfig2 = $omsUtils.transformForm(data.PsCProClassify, self.formConfig2, inputArr2, drpArr2);
        self.cusAttrConfig.data = data.PsCProClassifyItems;
        // 特别地（规格名称赋值）
        const specialObj = { 'PS_C_SPEC_GROUP_ENAME1': 'PS_C_SPEC_GROUP_ID1', 'PS_C_SPEC_GROUP_ENAME2': 'PS_C_SPEC_GROUP_ID2', 'PS_C_SPEC_GROUP_ENAME3': 'PS_C_SPEC_GROUP_ID2' };
        for (const key in specialObj) {
          this.formConfig2.formData.find(it => it.colname == key).itemdata.pid = data.PsCProClassify[specialObj[key]] ? data.PsCProClassify[specialObj[key]] : '';
        }
        // 特别地
        self.formConfig2.formValue.OPEN_DIMENSION_String = self.formConfig2.formValue.OPEN_DIMENSION;
        self.watchChange = false;
        self.formConfig2.formValue.OPEN_DIMENSION = self.formConfig2.formValue.OPEN_DIMENSION === 'Y';
        if (this.formConfig2.formValue.OPEN_DIMENSION) {
          this.formConfig2.formData.find((it) => it.colname == 'DIMENSION').disabled = false;
        }
        self.changeSpec((data.PsCProClassify.DIMENSION = data.PsCProClassify.DIMENSION || 2));
        self.watchChange = true;
        this.fresh2 += 1;
      }
      if (id > 0) {
        self.formConfig.formData.find((it) => it.colname == 'ECODE').disabled = true;
        // self.formConfig.formData.find(it => it.colname == 'ENAME').disabled = true;
      }
      self.subTableConfig = {
        centerName: 'commodityCenter',
        tablename: 'PS_C_CLASSIFY_LOG',
        objid: this.ID,
        pageShow: true,
      };
    },
    /* -------------------- 详情初始化 end -------------------- */

    /* -------------------- 子表 start -------------------- */
    // 添加
    async addAttrValue() {
      const self = this;
      if (!self.cusAttrConfig.businessFormConfig.formData[0].itemdata.valuedata.length) {
        self.$Message.warning($i18n.t('modalTips.kk'));
        return false;
      }
      this.loading = true;
      const {
        data: {
          code,
          data,
          message
        },
      } = await self.service.commodityCenter.queryClassifyItem(self.IDS).catch(() => {
        this.loading = false;
      });
      this.loading = false;
      if (code == 0) {
        self.cusAttrConfig.addData = data;
        // self.cusAttrConfig.data.push(...self.cusAttrConfig.addData);
        self.cusAttrConfig.businessFormConfig.formData[0].itemdata.valuedata = '';
        self.cusAttrConfig.businessFormConfig.formData[0].itemdata.pid = '';
        self.saveable = true;
        self.save();
      }
    },

    // 删除
    async deleteAttrValue() {
      const self = this;
      if (!self.cusAttrConfig.selectionData.length) {
        self.$Message.warning($i18n.t('modalTips.ka'));
        return false;
      }
      const delIDS = [];
      self.cusAttrConfig.selectionData.forEach((it) => {
        delIDS.push(it.ID);
      });
      this.loading = true;
      const {
        data: {
          code,
          data,
          message
        },
      } = await self.service.commodityCenter.delClassifyItem({
        id: self.ID,
        ids: delIDS
      }).catch(() => {
        this.loading = false;
      });
      this.loading = false;
      if (code == 0) {
        self.saveable = true;
        self.initObjItem(self.ID);
      }
    },
    /* -------------------- 子表 end -------------------- */

    // 保存
    async save() {
      const self = this;
      /* =========== 保存校验 start =========== */
      const masterArr = Object.keys(self.modify.master);
      // 未修改，不提示，不操作
      if (!masterArr.length && !self.saveable) return false;
      const valueArr = ['ECODE', 'ENAME'];
      const drpArr = [];
      const mes = $omsUtils.validatorNotEmpty(self.formConfig, valueArr, drpArr);
      if (mes) {
        this.$message.error(mes);
        return false;
      }
      /* =========== 保存校验 end =========== */
      const PsCProClassify = self.modify.master;
      const speArr = ['PS_C_SPEC_GROUP_ID1', 'PS_C_SPEC_GROUP_ID2', 'PS_C_SPEC_GROUP_ID3'];
      for (const key in PsCProClassify) {
        if (speArr.includes(key)) {
          PsCProClassify[key] = PsCProClassify[key] ?? 0;
        }
      }
      PsCProClassify.OPEN_DIMENSION = self.formConfig2.formValue.OPEN_DIMENSION_String; // 默认不开启二维
      PsCProClassify.DIMENSION = self.formConfig2.formValue.DIMENSION ? self.formConfig2.formValue.DIMENSION.toString() : '2'; // 默认规格维度二维
      const Items = self.cusAttrConfig.addData;
      const param = {
        OBJID: this.ID,
        PsCProClassify, // 主表修改信息
        Items, // 子表修改信息
      };
      this.loading = true;
      const {
        data: {
          code,
          data,
          message
        },
      } = await self.service.commodityCenter.saveClassify(param).catch(() => {
        this.loading = false;
      });
      this.loading = false;
      if (code === 0) {
        this.backable = true;
        self.modify.master = {};
        self.cusAttrConfig.addData = [];
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
        // 保存成功之后点击的返回
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
            self.onOk();
          },
        });
      } else {
        self.onOk();
      }
    },
    onOk() {
      //$omsUtils.tabCloseAppoint(this);
      // this.$destroy(true);
      this.$store.commit('global/tabOpen', {
        tableId: 10091,
        type: 'S',
        tableName: 'PS_C_PRO_CLASSIFY',
        label: $i18n.t('menu.ac'), //'商品分类',
        back: true,
      });
    },

    /* --------------- 表格事件 --------------- */
    delTableDetail() { },
    addTableDetail() { },
    onSelect(e) {
      // e为选中的数组对象RowArr
      this.cusAttrConfig.selectionData = e;
    },
    onSelectCancel(e) {
      this.cusAttrConfig.selectionData = e;
    },
    onSelectAll(e) {
      this.cusAttrConfig.selectionData = e;
    },
    onSelectAllCancel() {
      this.cusAttrConfig.selectionData = [];
    },
    pageChange(e) {
      // this.cusAttrConfig.pageIndex = e;
    },
    pageSizeChange(e) {
      this.cusAttrConfig.pageSize = e;
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
        pageShow: true,
      };
    },
    /**
     * 记录主表修改信息方法
     * @ecode 记录字段
     * @obj 修改值暂存在modify下的某个对象中
     */
    masterModifyData(ecode, obj, config) {
      const self = this;
      if (!self.watchChange) return;
      self.modify[obj][ecode] = self[config ? config : 'formConfig'].formValue[ecode];
    },
    // 控制单选展示下拉项，且清空afterArr的value
    changeInput(beforeArr, afterArr) {
      this.formConfig2.formData.forEach((item) => {
        if (beforeArr.includes(item.colname)) {
          item.itemdata.readonly = false;
          // item.itemdata.isnotnull = true;
          item.style = 'popInputPlus';
        }
        if (afterArr.includes(item.colname)) {
          item.itemdata.readonly = true;
          // item.itemdata.isnotnull = false;
          item.style = null;
          item.itemdata.valuedata = '';
        }
      });
    },
    // 根据维度值动态渲染规格
    changeSpec(val) {
      let beforeArr = [];
      let afterArr = [];
      switch (val) {
        case 1:
          // 一维
          beforeArr = ['PS_C_SPEC_GROUP_ENAME1'];
          afterArr = ['PS_C_SPEC_GROUP_ENAME2', 'PS_C_SPEC_GROUP_ENAME3'];
          this.changeInput(beforeArr, afterArr);
          break;
        case 2:
          beforeArr = ['PS_C_SPEC_GROUP_ENAME1', 'PS_C_SPEC_GROUP_ENAME2'];
          afterArr = ['PS_C_SPEC_GROUP_ENAME3'];
          this.changeInput(beforeArr, afterArr);
          break;
        case 3:
          beforeArr = ['PS_C_SPEC_GROUP_ENAME1', 'PS_C_SPEC_GROUP_ENAME2', 'PS_C_SPEC_GROUP_ENAME3'];
          afterArr = [];
          this.changeInput(beforeArr, afterArr);
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

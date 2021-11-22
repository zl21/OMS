import editor from 'framework/components/wang-editor/wang-editor';
// import axios from 'axios';

export default {
  name: 'WphEmailSend',
  components: {
    editor
  },
  props: {
    objid: {
      type: String
    },
    objList: {
      type: Array
    },
    refresh: Boolean,
    save: Boolean,
    tablename: {
      type: String
    },
    isdisabled: {
      type: Boolean
    },
    isActive: {
      type: Boolean
    },
    editsave: Boolean,
    stopsave: Boolean,
    selectItem: {},
    tabConfig: {},
    status: {}, // 整体状态,是否可编辑
    ExportFlag: {} // 导入状态
  },
  data() {
    return {
      vmI18n:$i18n,
      lists: [
        {
          label: '品牌',
          click: () => this.setVariable('品牌')
        },
        {
          label: '订单号',
          click: () => this.setVariable('订单号')
        },
        {
          label: '入库单号',
          click: () => this.setVariable('入库单号')
        },
        {
          label: '到货仓',
          click: () => this.setVariable('到货仓')
        },
        {
          label: '商品总数量',
          click: () => this.setVariable('商品总数量')
        }
      ],
      modify: false, // 是否修改
      currentView: '', // 控制富文本
      storageItem: {
        // 存储表
        name: 'PS_C_PRO',
        id: this.objid
      },
      itemdata: {
        // 富文本的传值
        colid: this.objid,
        valuedata: ''
      },
      saveObj: {
        // 保存数据
        MAIL_TITLE: '',
        MAIL_CONTENT: ''
      }
    };
  },
  watch: {
    // refresh(val) {
    refresh() {
      console.log('refresh');
    },
    editsave() {
      console.log('editsave');
    },
    itemdata: {
      // handler(obj, oldobj) {
      handler(obj) {
        this.saveObj.MAIL_CONTENT = obj.valuedata;
      },
      deep: true
    }
  },
  computed: {},
  methods: {
    getChangeItem(value) {
      this.itemdata.valuedata = value.valuedata;
    },
    // 获取变量
    getVariableRest() {
      const self = this;

      const rows = ['品牌', '订单号', '入库单号', '到货仓', '商品总数量', '预计发货时间', '预计到货时间', '箱号', '物流公司', '发货实体仓'];
      self.lists = rows.map((row) => ({
        label: row,
        click: () => self.setVariable(row)
      }));
    },
    setVariable(s) {
      const self = this;
      const val = self.itemdata.valuedata || '';
      self.itemdata.valuedata = `${val}<font color="#4d80bf">$${s}$&nbsp;</font>`;
      self.$refs[`editor${self.objid}`].getData(self.itemdata);
    },
    setDetail(details) {
      const self = this;
      self.$set(self.itemdata, 'valuedata', details);
      self.currentView = 'editor';
      self.formObj = null;

      self.$nextTick(() => {
        if (self.$refs[`editor${self.objid}`]) {
          self.$refs[`editor${self.objid}`].getData(self.itemdata);
        }
      });
    },
    // 获取当前数据
    async getData() {
      const self = this;
      const obj = {
        // table:self.tablename,
        objid: self.$route.params.itemId === 'New' ? '-1' : self.$route.params.itemId,
      };

      const { data } = await this.service.strategyPlatform.selectVipcomMailSetColumn(obj);
      if (data.code === 0) {
        const row = data.data;
        self.saveObj.MAIL_CONTENT = row.MAIL_CONTENT;
        self.itemdata.valuedata = row.MAIL_CONTENT;
        self.saveObj.MAIL_TITLE = row.MAIL_TITLE;
        self.$nextTick(() => {
          if (self.$refs[`editor${self.objid}`]) {
            self.$refs[`editor${self.objid}`].getData(self.itemdata);
          }
        });
      }
    },
    // 保存当前单据
    // flag 主表保存成功后的标志
    async saveCurrent(flag) {
      const self = this;
      const obj = {
        objid: self.$route.params.itemId === 'New' ? '-1' : self.$route.params.itemId,
        fixcolumn: {
          ST_C_VIPCOM_MAIL: self.saveObj
        }
      };
      const data = new URLSearchParams();
      data.append('param', JSON.stringify(obj));

      const res = await this.service.strategyPlatform.saveVipcomMail(data);
      if (!flag) {
        if (res.data.code === 0) {
          self.$Message.success('保存成功!');
        } else {
          // self.$Message.error('保存失败');
        }
      }
    },
    refreshGetData() {
      this.$emit('changeRefresh', false);
    },
    changeSave() {
      // this.$emit('changeSave', val);
      this.$emit('changeSave');
    },
    newLySave() {
      this.$emit('changeHasContent', true);
      this.$emit('objectSave');
    },
    noContent() {
      // 定制界面没有明细
      this.$emit('changeHasContent', false);
    },
    errorHasContent() {
      // 定制界面存在明细，且走上面的保存
      this.$emit('changeHasContent', true);
    },
    changeEditSave() {
      this.$emit('changeEditSave');
    },
    objectEdit() {
      this.$emit('objectEdit');
    },
    changeStopSave() {
    }
  },
  mounted() {
    this.modify = true;
    this.getVariableRest();
    this.setDetail('');
    // 默认子明细需要保存
    this.errorHasContent();
    if (this.$route.params.itemId !== 'New') {
      this.getData();
    }
    // 监听主表的保存成功事件
    window.addEventListener('customizeClick', (data) => {
      console.log('customizeClick::data', data);
      if (data.detail.type === 'save') {
        const flag = typeof (data.detail.mainTableParame) !== 'undefined';
        this.saveCurrent(flag);
      }
      // if ( && ) {
      //   // 主表有修改保存
      //   this.saveCurrent(true);
      // } else {
      //   // 主表没有修改保存
      //   this.saveCurrent();
      // }
    });
  },
  created() {
  }
};

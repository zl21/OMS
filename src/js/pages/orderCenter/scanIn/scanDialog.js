import businessActionTable from 'professionalComponents/businessActionTable.vue';
import businessButton from 'professionalComponents/businessButton.vue';

export default {
  components: {
    businessActionTable,
    businessButton
  },
  methods: {
    // 勾选事件
    onSelect(row) {
      const self = this;
      self.dilogList = row;
    },
    // 取消事件
    onSelectCancel(row) {
      const self = this;
      self.dilogList = row;
    },
    // 全选事件
    onSelectAll(row) {
      const self = this;
      self.dilogList = row;
    },
    // 全选取消事件
    onSelectAllCancel(row) {
      const self = this;
      self.dilogList = row;
    }
  },
  props: {
    componentData: {
      type: Object
    }
  },
  mounted() {
    const self = this;
    this.jordanTableConfig.data = self.componentData.list;
  },
  watch: {
    componentData(val) {
      this.jordanTableConfig.data = val.list;
    }
  },
  data() {
    return {
      dilogList: [], // 存储选中的所有明细值
      // 按钮
      btnConfig: {
        typeAll: 'error',
        btnsite: 'right',
        buttons: [
          {
            text: '取消',
            size: '',
            btnclick: () => { 
              const self = this;
              self.$parent.$parent.closeConfirm();
              console.log(self);
            }
          },
          {
            text: '确定',
            size: '',
            btnclick: () => {
              const self = this;
              if (self.dilogList.length === 0) {
                self.$Message.warning('请选择明细');
              } else {
                self.$parent.$parent.$parent.dilogList = self.dilogList;
                self.$parent.$parent.closeConfirm();
              }
            }
          }
        ],
      },
                
      jordanTableConfig: {
        indexColumn: false, // 序号
        isShowSelection: true, // 是否存在多选框
        height: '200',
        columns: [
          {
            title: '退单编号',
            key: 'ID',
            width: '',
            type: 'asc'
          },
          {
            title: '原平台单号',
            key: 'ORIG_SOURCE_CODE',
            width: '',
            type: 'asc'
          },
          {
            title: '退回物流公司',
            key: 'CP_C_LOGISTICS_ENAME',
            width: '',
            type: 'asc'
          },
          {
            title: '退回物流单号',
            key: 'LOGISTICS_CODE',
            width: '',
            type: 'asc'
          },
          {
            title: '买家昵称',
            key: 'BUYER_NICK',
            width: '',
            type: 'asc'
          },
          {
            title: '手机号',
            key: 'RECEIVE_PHONE',
            width: '',
            type: 'asc'
          },
          {
            title: '收货人',
            key: 'RECEIVE_NAME',
            width: '',
            type: 'asc'
          },
          {
            title: '店铺名称',
            key: 'CP_C_SHOP_TITLE',
            width: '',
            type: 'asc'
          },
          {
            title: '原单单号',
            key: 'ORIG_ORDER_ID',
            width: '',
            type: 'asc'
          },
        ],
        data: [],

      }
    };
  }
};

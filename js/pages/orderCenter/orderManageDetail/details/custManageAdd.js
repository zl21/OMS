// 零售发货单-详情-订单明细
import businessActionTable from 'professionalComponents/businessActionTable';
import publicMethodsUtil from '@/assets/js/public/publicMethods';
import buttonPermissionsMixin from '@/assets/js/mixins/buttonPermissions';

export default {
  data() {
    return {
      vmI18n: window.vmI18n,
      //isCombination: 1, // 1:组合商品 2:组合商品下挂商品
      tableConfig: {
        businessButtonConfig: {
          typeAll: 'default', // 按钮统一风格样式
          btnsite: 'left', // 按钮位置 (right , center , left)
          buttons: [
            {
              type: 'primary', // 按钮类型
              text: '添加赠品', // 按钮文本
              isShow: true,
              btnclick: () => {
                // 判断条件是否符合
                const self = this;
                this.$emit('addGiftHandler')
              } // 按钮点击事件
            },
            {
              type: 'warning', // 按钮类型
              text: '删除赠品', // 按钮文本
              disabled: true,
              isShow: true,
              btnclick: () => {
                this.deleteItem();
              } // 按钮点击事件
            },
            {
              text: '标记退款完成', // 按钮文本
              disabled: true,
              isShow: false,
              btnclick: () => {
                this.returnAccount();
              } // 按钮点击事件
            },
            {
              text: '替换商品', // 按钮文本
              disabled: true,
              isShow: true,
              btnclick: () => {
                // 是否可以更换商品
                // this.modifyGoodsCheck();
                this.replaceGoodsDetail();
              } // 按钮点击事件
            },
            {
              text: '标记取消',
              disabled: true,
              isShow: true,
              btnclick: () => {
                this.flagCalcelRefund();
              }
            }
          ]
        }, // 按钮配置
        isShowSelection: true,
        loading: false,
        indexColumn: true,
        columns: [],
        data: [],
        pageShow: false, // 控制分页是否显示
        btnsShow: true, // 控制操作按钮是否显示
        searchInputShow: false, // 控制搜索框是否显示
        width: '', // 表格宽度
        height: '300', // 表格高度
        border: true, // 是否显示纵向边框
        total: 0, // 设置总条数
        pageSizeOpts: [10, 20, 30], // 每页条数切换的配置
        pageSize: 1000, // 每页条数
        totalData: [] // 总计
      },
      textArr:['删除赠品','替换商品','标记取消'], // 需要控制的按钮text
      selection: [],
      checkSelection: [],
      objid: '',
      options: {}, // 自定义属性（选填）
      islackstock: [
        {
          label: '是',
          value: '1'
        },
        {
          label: '否',
          value: '0'
        }
      ],
      livePlatformArr: [],
      giftTypeArr: []
    };
  },
  mixins: [buttonPermissionsMixin],
  components: {
    businessActionTable
  },
  props: {
    componentData: {},
    isQh: {
      type: Boolean
    }
  },
  watch: {
    componentData: {
      handler(newVal) {
        console.log('newVal:',newVal);
        this.request(newVal);
        if(newVal.order.IS_COMBINATION){
          this.tableConfig.businessButtonConfig = {}
        }
      },
      deep: true
    },
    isQh() {
      this.tableConfig.businessButtonConfig.buttons.forEach((item) => {
        item.isShow = this.isQh;
      });
    }
  },
  async created() {
    // this.$nextTick(()=>{
    //   this.getPermissions('tableConfig.businessButtonConfig', 'orderManager');
    // });
  },
  methods: {
    // 获取表头
    async getColumn(){
      try {
        const { data: {data} } = await this.service.orderCenter.initObject({"TABLE":"OC_B_ORDER_ITEM"});
        let arr = [];
        data.DATA.forEach(element => {
          arr.push({title:`${element.headerName}`,key:`${element.field}`,dataAcessKey:`${element.field}`});
        });
        this.tableConfig.columns = arr;
      } catch (error) {
        
      }
      
    },
    // 获取数据
    request(newVal){
      this.tableConfig.loading = true;
      if(newVal.subItem){
        this.tableConfig.data = newVal.subItem;
        this.tableConfig.loading = false;
      }
    },
    // 删除赠品
    async deleteItem() {
      const self = this;
      const itemId = this.checkSelection.map(row => row.ID);
      // const changeGoodsSKu = this.checkSelection.map(row => row.PS_C_PRO_ECODE);
      // 至少选择一条订单明细
      if (itemId.length === 0) return self.$Message.error(self.vmI18n.t('modalTips.zk'));
      const param = {
        ids: [self.objid],
        itemId,
        detail: 'Y'
      };
      const { data: { code, message } } = await this.service.orderCenter.batchDeleteGoods(param);
      if (code === 0) {
        self.$Message.success(message || self.vmI18n.t('modalTips.ay'));
        self.$parent.$parent.autoRefresh();
      } else {
        self.$Message.error(message || self.vmI18n.t('modalTips.z3'));
      }
    },
    // 标记退款
    async returnAccount() {
      const self = this;
      const ids = this.checkSelection.map(row => row.ID);
      if (ids.length === 0) {
        // 至少选择一条订单明细
        self.$Message.error(self.vmI18n.t('modalTips.zk'));
        return;
      }
      const { data: { code, message } } = await this.service.orderCenter.markrefund({ id: this.$route.params.customizedModuleId, itemIds: ids, ISJITX: 50 });
      console.log(code, message);
      if (code === 0) {
        self.$parent.$parent.load();
        self.$Message.success(message);
      } else {
        self.$Message.error(self.vmI18n.t('modalTips.z3'));
      }
    },
    // 标记取消退款
    async flagCalcelRefund() {
      const self = this;
      const ids = this.checkSelection.map(row => row.ID);
      if (ids.length === 0) {
        // 至少选择一条订单明细
        self.$Message.error(self.vmI18n.t('modalTips.z3'));
        return;
      }
      const { data: { data: { code, message } } } = await this.service.orderCenter.markRefundCancel({ itemIds: ids.join(','), orderId: this.$route.params.customizedModuleId });
      if (code === 0) {
        self.$parent.$parent.load();
        self.$Message.success(message);
      } else {
        self.$Message.error(message);
      }
    },
    // 替换商品
    replaceGoodsDetail() {
      if (this.checkSelection.length !== 1) {
        // 请选择一条需要替换的明细!
        this.$Message.warning(this.vmI18n.t('modalTips.dv'));
        return;
      }
      this.$emit('replaceGoodsDetail', this.checkSelection);
    },
    // 选中某一项时触发
    onSelect(selection) {
      this.checkSelection = selection;
      let buttonArr = this.tableConfig.businessButtonConfig.buttons;
      this.$OMS2.omsUtils.buttonHasDisable(this.textArr,buttonArr,false);
    },
    // 取消选中某一项时触发
    onSelectCancel(selection) {
      this.checkSelection = selection;
      if(selection.length === 0){
        let buttonArr = this.tableConfig.businessButtonConfig.buttons;
        this.$OMS2.omsUtils.buttonHasDisable(this.textArr,buttonArr,true);
      }
    },
    // 点击全选时触发
    onSelectAll(selection) {
      this.checkSelection = selection;
    },
    // 点击取消全选时触发
    onSelectAllCancel(selection) {
      this.checkSelection = selection;
    },
    // 单击某一行时触发
    onRowClick(row) {
      this.selection = [];
      this.selection.push(row);
    },
    // 单击某二行时触发
    onRowDblclick(row) {
      this.selection = [];
      this.selection.push(row);
    },
    // 分页change 事件
    pageChange(val) {
      this.tableConfig.current = val;
    },
    // 切换分页条数
    pageSizeChange(val) {
      this.tableConfig.pageSize = val;
    },
    showTable(obj) {
      const tbody = obj;
      let totalData = [];
      // 明细合计
      let amt = 0;
      let qty = 0;
      obj.forEach((item) => {
        if (item.REAL_AMT !== null) {
          amt = publicMethodsUtil.accAdd(
            parseFloat(item.REAL_AMT).toFixed(2),
            amt
          );
          qty += Number(item.QTY);
        }
      });
      totalData = [
        {
          index: '总计',
          REAL_AMT: amt,
          QTY: qty
        }
      ];
      this.tableConfig = Object.assign(this.tableConfig, {
        columns: this.columns,
        isShowSelection: true,
        indexColumn: true, // 是否展示需要
        data: tbody,
        pageShow: false, // 控制分页是否显示
        btnsShow: true, // 控制操作按钮是否显示
        searchInputShow: false, // 控制搜索框是否显示
        width: '', // 表格宽度
        height: '', // 表格高度
        border: true, // 是否显示纵向边框
        total: obj.totalRowCount, // 设置总条数
        pageSizeOpts: obj.selectRange, // 每页条数切换的配置
        pageSize: obj.defaultrange, // 每页条数
        totalData // 总计
      });
    }
  },
  created(){
    // 获取表头
    this.getColumn();
  },
  mounted() {
    // 获取数据
    // if (this.componentData && this.componentData.tablename) {
    //   // this.tableConfig.loading = true;
    //   // setTimeout(() => {
        
    //   // }, 1000);
    // }
  }
};

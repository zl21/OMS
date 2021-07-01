// 零售发货单-详情-订单明细
import businessActionTable from 'professionalComponents/businessActionTable';
import publicMethodsUtil from '@/assets/js/public/publicMethods';
import buttonPermissionsMixin from '@/assets/js/mixins/buttonPermissions';

export default {
  data() {
    return {
      //isCombination: 1, // 1:组合商品 2:组合商品下挂商品
      vmI18n:$i18n,
      tableConfig: {
        businessButtonConfig: {
          typeAll: 'default', // 按钮统一风格样式
          btnsite: 'left', // 按钮位置 (right , center , left)
          buttons: [
            {
              webname:'orderItemAddGift',
              type: 'primary', // 按钮类型
              text: '添加赠品', // 按钮文本
              isShow: true,
              btnclick: () => {
                // 判断条件是否符合
                const self = this;
                if(!['缺货','待审核'].includes(this.componentData.order.ORDER_STATUS)) {
                  self.$Message.error('只有状态为待审核和缺货才能添加赠品！');
                  return;
                };
                this.$emit('addGiftHandler')
              } // 按钮点击事件
            },
            {
              webname:'Delete_Merchandise',
              type: 'warning', // 按钮类型
              text: '删除赠品', // 按钮文本
              disabled: true,
              isShow: true,
              btnclick: () => {
                this.deleteItem();
              } // 按钮点击事件
            },
            {
              webname:'aa',
              text: '标记退款完成', // 按钮文本
              disabled: true,
              isShow: true,
              btnclick: () => {
                this.returnAccount();
              } // 按钮点击事件
            },
            {
              webname:'orderItemReplaceProduct',
              text: '替换商品', // 按钮文本
              disabled: true,
              isShow: true,
              btnclick: () => {
                // 是否可以更换商品
                this.replaceGoodsDetail();
              } // 按钮点击事件
            },
            {
              webname:'orderMarkupCancel',
              text: '标记取消',
              disabled: true,
              isShow: true,
              btnclick: () => {
                this.flagCalcel();
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
        pageSizeOpts: [10, 20, 30,50,100], // 每页条数切换的配置
        pageSize: 1000, // 每页条数
        totalData: [] // 总计
      },
      textArr:['删除赠品','替换商品','标记取消'], // 需要控制的按钮text
      butArray:[],
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
        this.request(newVal);
      },
      deep: true
    },
    isQh() {
      this.tableConfig.businessButtonConfig.buttons.forEach((item) => {
        item.isShow = this.isQh;
      });
    }
  },
  methods: {
    // 获取表头
    async getColumn(){
      try {
        const { data: {data} } = await this.service.orderCenter.initObject({"TABLE":"OC_B_ORDER_ITEM"});
        this.tableConfig.columns = data.DATA.map(element => ({title:`${element.headerName}`,key:`${element.field}`,dataAcessKey:`${element.field}`}));
      } catch (error) {
        
      }
      
    },
    // 获取数据
    request(newVal){
      this.tableConfig.loading = true;
      if(newVal.subItem){
        let buttonArr = this.tableConfig.businessButtonConfig.buttons;
        $omsUtils.buttonHasDisable(this.textArr,buttonArr,true);
        this.tableConfig.data = newVal.subItem;
        this.tableConfig.loading = false;
      }
    },
    // 删除赠品
    async deleteItem() {
      const self = this;
      const GIFT_TYPES = this.checkSelection.map(row => row.GIFT_TYPE);
      if(GIFT_TYPES.includes('非赠品') && !['缺货','待审核'].includes(this.componentData.order.ORDER_STATUS)){
        self.$Message.error('勾选明细含有非赠品禁止删除！');
        return;
      }
      const PS_C_SKU_CODES = this.checkSelection.map(row => row.PS_C_SKU_ECODE);
     let spuIds =  this.checkSelection.map(row => row.ID);

      let data = {
        spuIds,
        skuEcodes: PS_C_SKU_CODES,
        orderList:[{ 
          orderId: this.componentData.order.ID, //订单id
          billNo: this.componentData.order.BILL_NO, //单据编号
        }],
      }
      this.tableConfig.businessButtonConfig.buttons[1].disabled = true;
      this.service.orderCenter.deleteOrderGoods(data).then((res) => {
        setTimeout(() => {
          this.tableConfig.businessButtonConfig.buttons[1].disabled = false;
        }, 1000);
        if (res.data.code == 0) {
          this.$Message.success(res.data.message);
          this.$parent.$parent.$parent.$parent.getDetailsData()
        }
        else if(res.data.code ===  -1){
          self.$Modal.confirm({
            title: "message",
            width: 500,
            className:'ark-dialog',
            mask:true,
            render: h => h('div', {
              },res.data.data[0].message)
          });
      }
      })
    },
    // 标记取消
    async flagCalcel(){
      const self = this;
      const { data: { data, code, message } } = await this.service.orderCenter.markCancel({ 
        id: Number(this.$route.params.customizedModuleId), 
        itemIds: this.checkSelection.map(row => row.ID), 
      });
      if (code === 0) {
        self.$Message.success(message || '成功！');
      }
    },
    // 标记退款
    // async returnAccount() {
    //   const self = this;
    //   const ids = this.checkSelection.map(row => row.ID);
    //   if (ids.length === 0) {
    //     // 至少选择一条订单明细
    //     self.$Message.error($i18n.t('modalTips.zk'));
    //     return;
    //   }
    //   const { data: { code, message } } = await this.service.orderCenter.markrefund({ id: this.$route.params.customizedModuleId, itemIds: ids, ISJITX: 50 });
    //   if (code === 0) {
    //     self.$parent.$parent.load();
    //     self.$Message.success(message);
    //   } else {
    //     self.$Message.error($i18n.t('modalTips.z3'));
    //   }
    // },
    // 标记取消退款
    async flagCalcelRefund() {
      const self = this;
      const ids = this.checkSelection.map(row => row.ID);
      if (ids.length === 0) {
        // 至少选择一条订单明细
        self.$Message.error($i18n.t('modalTips.z3'));
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
        this.$Message.warning($i18n.t('modalTips.dv'));
        return;
      }
      if(!['缺货','待审核'].includes(this.componentData.order.ORDER_STATUS)){
        this.$Message.error('只允许缺货或待审核状态的订单进行替换！');
        return;
      }
      this.$emit('replaceGoodsDetail', this.checkSelection);
    },
    // 选中某一项时触发
    onSelect(selection) {
      this.checkSelection = selection;
      let buttonArr = this.tableConfig.businessButtonConfig.buttons;
      $omsUtils.buttonHasDisable(this.textArr,buttonArr,false);
    },
    // 取消选中某一项时触发
    onSelectCancel(selection) {
      console.log('selection:',selection);
      this.checkSelection = selection;
      if(selection.length === 0){
        let buttonArr = this.tableConfig.businessButtonConfig.buttons;
        $omsUtils.buttonHasDisable(this.textArr,buttonArr,true);
      }
    },
    // 点击全选时触发
    onSelectAll(selection) {
      this.checkSelection = selection;
      let buttonArr = this.tableConfig.businessButtonConfig.buttons;
      $omsUtils.buttonHasDisable(this.textArr,buttonArr,false);
    },
    // 点击取消全选时触发
    onSelectAllCancel(selection) {
      this.checkSelection = selection;
      let buttonArr = this.tableConfig.businessButtonConfig.buttons;
      $omsUtils.buttonHasDisable(this.textArr,buttonArr,true);
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
  async created(){
    // 按钮权限配置
    let { SUB_ACTIONS,ACTIONS } = await $omsUtils.getPermissions(this, 'butArray', {table: this.$route.params.customizedModuleName, type: 'OBJ'},true);
    let buttonArr = this.tableConfig.businessButtonConfig.buttons
    sessionStorage.setItem("ACTIONS", JSON.stringify(ACTIONS));
    let buttonArr1 = buttonArr.map((x)=>{ if(SUB_ACTIONS.some(y => y.webname === x.webname)) return x}).filter(item => item)
    this.tableConfig.businessButtonConfig.buttons = buttonArr1
    // 获取表头
    this.getColumn();
  }
};

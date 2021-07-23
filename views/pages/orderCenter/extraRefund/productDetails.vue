<!--
 * @Author: your name
 * @Date: 2021-05-28 16:55:51
 * @LastEditTime: 2021-07-23 17:54:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /front-standard-product/src/views/pages/orderCenter/returnOrder/productDetails.vue
-->
<template>
  <div>
    <businessActionTable 
    :jordan-table-config="tableConfig"
    @on-select="onSelect" 
    @on-select-cancel="onSelectCancel" 
    @on-select-all="onSelectAll" 
    @on-select-all-cancel="onSelectAllCancel"
    @on-page-change="pageChange" 
    @on-page-size-change="pageSizeChange" />
    <Modal v-model="addDetailsConfig.modal" width="900" title="新增明细" :mask="true" @on-ok="addDetailsOk">
      <businessActionTable 
      :jordan-table-config="addDetailsConfig"  
      @on-select="addOnSelect" 
      @on-select-cancel="addOnSelectCancel" 
      @on-select-all="addOnSelectAll" 
      @on-select-all-cancel="addOnSelectAllCancel"
      @on-page-change="pageChange1" 
      @on-page-size-change="pageSizeChange1" />
    </Modal>
  </div>
</template>

<script>
import businessActionTable from 'professionalComponents/businessActionTable';
// import businessForm from 'professionalComponents/businessForm';
export default {
  data(){
    return {
      tableConfig: {
        modal: false,
        businessButtonConfig: {
          typeAll: 'default', // 按钮统一风格样式
          btnsite: 'left', // 按钮位置 (right , center , left)
          buttons: [
            {
              webname:'E_PRODUCT_PUSHDETAILS',
              type: 'primary',
              text: '新增明细', // 按钮文本
              isShow: true,
              btnclick: (e) => {
                let billNo = R3.store.state.customize.originalOrder;
                console.log(sessionStorage.getItem('billNo'));
                if((!billNo || billNo === ' ' ) && sessionStorage.getItem('billNo') === null){
                  this.$Message.error('原订单编号不能为空！');
                  return;
                }
                this.addDetailsConfig.modal = true;
                if(!billNo || billNo === ' '){
                  billNo = sessionStorage.getItem('billNo')
                }
                this.getTable(true,billNo);
              } // 按钮点击事件
            },
            {
              webname:'E_PRODUCT_DETELEDETAILS',
              type: 'warning', // 按钮类型
              text: '删除明细', // 按钮文本
              isShow: true,
              btnclick: (e) => {
                if(!this.tableConfig.selectData.length){
                  this.$Message.error('请选择至少一条明细！');
                  return;
                }
                this.deleteData(this.tableConfig.selectData)
              } // 按钮点击事件
            }
          ]
        }, // 按钮配置
        businessFormConfig: {}, // 表单配置
        columns: [
          {
            key: 'PS_C_SKU_ECODE',
            title: 'SKU编码'
          },{
            key: 'PS_C_PRO_ENAME',
            title: $i18n.t('form_label.skuName'), // SKU名称
          },{
            key: 'PS_C_PRO_ECODE',
            title: 'SPU编码'
          },{
            key: 'PS_C_PRO_ENAME',
            title: $i18n.t("table_label.itemNo02"), // SPU名称
          },{
            key: 'GIFT_TYPE',
            title: '赠品',
            render:(h,params)=>{
              let GIFT_TYPE = ''
              if(params.row.GIFT_TYPE == 0){
                  GIFT_TYPE = '非赠品'
              }else if(params.row.GIFT_TYPE == 1){
                  GIFT_TYPE = '系统赠品'
              }else{
                  GIFT_TYPE = '平台赠品'
              }
              return h('span', {}, GIFT_TYPE);
            }
          },
          {
            key: 'QTY',
            title: '购买数量',
            render:(h,params)=>{
              return h('span', {}, Number(params.row.QTY));
            }
          },{
            key: 'REAL_AMT',
            title: '成交金额',
            render:(h,params)=>{
              let num  = Number(params.row.REAL_AMT) ||  0
              return h('span', {}, num);
            }
          },{
            key: 'QTY_REFUND',
            title: '申请退货数量', // 申请退货数量：默认取原零售发货单可退数量，可编辑，仅支持录入大于0的正整数，且需小于等于原零售发货单可退数量；
            render:(h,params)=>{
             return h('InputNumber', {
                props: {
                  value: params.row.QTY_REFUND,
                  autosize: true,
                  min:1,
                  max: Number(params.row.QTY) - Number(params.row.QTY_RETURN_APPLY),
                  disabled: this.orderStatus !== '0' ? true : false,
                  regx: /^(\s*|([1-9]{1}\d*)|(0{1}))(\.\d{0,2})?$/
                },
                on: {
                  'on-change': e => {
                      let num =  this.$OMS2.omsUtils.floatNumber(Number(e) * Number(params.row.PRICE_ACTUCL))
                      console.log(e,params.row.PRICE_ACTUCL);
                      // 申请退货数量
                      params.row.AMT_REFUND = isNaN(num) ? '0.00' : num;
                      // 退货金额
                      params.row.QTY_REFUND = e;
                      this.tableConfig.data[params.index] = params.row;
                      R3.store.commit('customize/extraoOrderDetails', JSON.parse(JSON.stringify([...this.tableConfig.data])));
                  }
                }
              });
            }
          },{
            key: 'AMT_REFUND',
            title: '退货金额', // 申请退款金额：为 申请退货数量*成交单价（成交单价为原零售发货单中记录的），保留两位小数； 
          },{
            key: 'QTY_ACTUAL',
            title: '实际退货数量', // 实际退货数量：默认为0；
            render:(h,params)=>{
              return h('span', {}, 0);
            }
          },{
            key: 'AMT_ACTUAL_REFUND',
            title: '退款金额', // 退款金额：默认取“申请退款金额”，可编辑，仅支持录入正数，保留两位小数
            render:(h,params)=>{
            console.log(params.row.AMT_ACTUAL_REFUND);
             return h('Input', {
               props: {
                  // && this.$route.params.itemId !== 'New' 
                  disabled: this.orderStatus !== '0' ? true : false,
                  value: params.row.AMT_ACTUAL_REFUND,
                  autosize: true,
                  regx: /^\d*\.{0,1}\d{0,2}$/,
                },
                on: {
                  'on-change': e => {
                     params.row.AMT_ACTUAL_REFUND = e.target.value;
                     this.tableConfig.data[params.index] = params.row;
                     R3.store.commit('customize/extraoOrderDetails', JSON.parse(JSON.stringify([...this.tableConfig.data])));
                  }
                }
              });
            }
          }
        ], // 表头
        data: [], // 数据配置
        pageShow: true, // 控制分页是否显示
        loading: false,
        height: 280, // 表格高度
        indexColumn: true, // 是否显示序号
        isShowSelection: true, // 是否显示checkedbox
        width: '', // 表格宽度
        border: true, // 是否显示纵向边框
        selectData: [],
        total: 0, // 设置总条数
        pageSizeOpts: [10, 30, 50, 100], // 每页条数切换的配置
        pageSize: 10, // 每页条数
        pageIndex: 1
      }, // 弹框 - 明细
      addDetailsConfig:{
        modal:false,
        businessButtonConfig: {}, // 按钮配置
        businessFormConfig: {}, // 表单配置
        isShowSelection: true, // 是否显示checkedbox
        columns: [
           {
            key: 'PS_C_SKU_ECODE',
            title: 'SKU编码'
          },{
            key: 'PS_C_SKU_ENAME',
            title: $i18n.t('form_label.skuName'), // SKU名称
          },{
            key: 'PS_C_PRO_ECODE',
            title: 'SPU编码'
          },{
            key: 'PS_C_PRO_ENAME',
            title: 'SPU名称'
          },{
            key: 'GIFT_TYPE',
            title: '赠品',
            render:(h,params)=>{
              let GIFT_TYPE = ''
              if(params.row.GIFT_TYPE == 0){
                  GIFT_TYPE = '非赠品'
              }else if(params.row.GIFT_TYPE == 1){
                  GIFT_TYPE = '系统赠品'
              }else{
                  GIFT_TYPE = '平台赠品'
              }
              return h('span', {}, GIFT_TYPE);
            }
          },{
            key: 'REAL_AMT',
            title: '成交金额'
          },{
            key: 'AMT_REFUND',
            title: '可退金额',
            render:(h,params)=>{
              let QTY_RETURN_APPLY = params.row.QTY_RETURN_APPLY || 0;
              // 数量 已退数量
              let returnNum = Number(params.row.QTY || 0) - QTY_RETURN_APPLY;
              // 单价   
              return h('span', {}, returnNum * Number(params.row.PRICE_ACTUCL || 0));
            }
          },{
            key: 'QTY',
            title: '购买数量'
          },{
            key: 'QTY_REFUND',
            title: '可退数量',
            render:(h,params)=>{
              let QTY_RETURN_APPLY = params.row.QTY_RETURN_APPLY || 0;
              let returnNum = Number(params.row.QTY) - QTY_RETURN_APPLY;
              return h('span', {}, returnNum);
            }
          },{
            key: 'PRO_TYPE',
            title: '是否组合下挂',
            render:(h,params)=>{
              let PRO_TYPE = ''
              if([1,2].includes(params.row.PRO_TYPE)){
                  PRO_TYPE = '是'
              }else{
                  PRO_TYPE = '否'
              }
              return h('span', {}, PRO_TYPE);
            }
          }
        ], // 表头
        data: [], // 数据配置
        selectData: [],
        pageShow: true, // 控制分页是否显示
        loading: false,
        indexColumn: true, // 是否显示序号
        border: true, // 是否显示纵向边框
        total: 0, // 设置总条数
        pageSizeOpts: [10, 30, 50, 100], // 每页条数切换的配置
        pageSize: 10, // 每页条数
        pageIndex: 1
      }
    }
  },
  components: {
    businessActionTable
  },
  computed: {
    isEdit () {
      return R3.store.state.customize.originalOrder;　　//需要监听的数据
    }
  },
  watch: {
    async isEdit(newVal) {
      if(newVal === ' '){
        this.tableConfig.data = [],
        this.tableConfig.total = 0
      }else{
        await this.getTable(false,newVal);
        await sessionStorage.setItem('copyDetails',JSON.stringify(this.tableConfig.data))
      }
      
    },
    'tableConfig.data':{
      handler(newV, oldV) {
       R3.store.commit('customize/extraoOrderDetails', JSON.parse(JSON.stringify([...newV])));
      },
      deep:true
    }
  },
  async created(){
    // 按钮权限
    let { SUB_ACTIONS,ACTIONS } = await this.$OMS2.omsUtils.getPermissions(this, 'butArray', {table: this.$route.params.tableName, type: 'OBJ'},true);
    let buttonArr = this.tableConfig.businessButtonConfig.buttons
    let buttonArr1 = buttonArr.map((x)=>{ if(SUB_ACTIONS.some(y => y.webname === x.webname)) return x}).filter(item => item);
    this.tableConfig.businessButtonConfig.buttons = buttonArr1
    let route = this.$route.params;
    if(!(this.$route.params.itemId == 'New')){
      console.log('bushiNew');
       const subData = await this.$OMS2.omsUtils.initSubtable('OC_B_REFUND_ORDER_ITEM', route.itemId, '181618');
       this.tableConfig.data = subData.rowData;
       console.log('subData.rowData:',subData.rowData);
       await sessionStorage.setItem('copyDetails',JSON.stringify(subData.rowData));
       let billNo = this.$store.state[`V.${route.tableName}.${route.tableId}.${route.itemId}`].mainFormInfo.formData.data.addcolums[0].childs[1].valuedata;
       sessionStorage.setItem('billNo',billNo)
      }else{
        //  编辑没有实际退款数量
        let columns = this.tableConfig.columns.filter(item => item.title !== '实际退货数量');
        this.tableConfig.columns = columns
      }
    // 单据状态 0:未审核
    this.orderStatus = this.$store.state[`V.${route.tableName}.${route.tableId}.${route.itemId}`].mainFormInfo.formData.data.addcolums[0].childs[6].valuedata;
    if(this.orderStatus !== '0' && this.$route.params.itemId !== 'New'){
      this.tableConfig.businessButtonConfig.buttons[0].isShow = false
      this.tableConfig.businessButtonConfig.buttons[1].isShow = false
    }
  },
  mounted(){
    
  },
  methods:{
    /****************** 工具方法 *************************/

    /****************** 获取数据 *************************/
    async getTable(isAdd,billNo,pageNum = 1,pageSize = 10){
      let self = this;
      // 筛选ids
      let ids
      let params = {
        BILL_NO:billNo,
        pageNum: pageNum,
        pageSize: pageSize
      };
      // 是否是新增
      if (isAdd) {
        if(!(this.$route.params.itemId == 'New')){
          ids = this.tableConfig.data.map((item) => {return item.OC_B_ORDER_ITEM_ID})
        } else {
          ids = this.tableConfig.data.map((item) => {return item.ID})
        }
        params = Object.assign(params,{EXCLUDE_IDS:ids ? ids.join() : ''});
      }
      // 调用查询接口
      const {data:{code,data}} = await self.service.orderCenter.queryExtraReturnOrderItem(params);
      if(code === 0){
        if(!isAdd){
          data.ORDER_ITEM.forEach((item)=>{
            item.QTY_REFUND = item.QTY - item.QTY_RETURN_APPLY || 0;
            let PRICE_ACTUCL = item.PRICE_ACTUCL || 0
            console.log(Number(item.QTY_REFUND),PRICE_ACTUCL);
            item.AMT_REFUND = this.$OMS2.omsUtils.floatNumber(Number(item.QTY_REFUND) * Number(PRICE_ACTUCL));
          })
        }
        isAdd ? this.addDetailsConfig.data = data.ORDER_ITEM : this.tableConfig.data = data.ORDER_ITEM,
        isAdd ? this.addDetailsConfig.total = data.TOTAL : this.tableConfig.total = data.TOTAL
      }
    },
    /****************** 商品明细 *************************/
    onSelect(row){
      this.tableConfig.selectData = row;
    },
    onSelectCancel(row){
      console.log(row);
      this.tableConfig.selectData = row;
    },
    onSelectAll(row){
      this.tableConfig.selectData = row;
    },
    onSelectAllCancel(row){
      this.tableConfig.selectData = row;
    },
    pageChange(pageNum){
      let billNo = R3.store.state.customize.originalOrder;
      this.tableConfig.pageIndex = pageNum;
      this.getTable(false,billNo,pageNum,this.tableConfig.pageSize)
    },
    pageSizeChange(pageSize){
      let billNo = R3.store.state.customize.originalOrder;
      this.tableConfig.pageSize = pageSize;
      this.getTable(false,billNo,this.tableConfig.pageIndex,pageSize)
    },
    deleteData(row){
      // 删除
      this.tableConfig.data = [...this.tableConfig.data].filter(x => [...row].every(y => y.ID !== x.ID));
      this.tableConfig.selectData = [];
    },
    /******************  添加商品明细 -- 弹框 *************************/
    addOnSelect(row){
      console.log(row);
      this.addDetailsConfig.selectData = row
    },
    addOnSelectCancel(row){
      console.log(row);
      this.addDetailsConfig.selectData = row
    },
    addOnSelectAll(row){
      this.addDetailsConfig.selectData = row
    },
    addOnSelectAllCancel(row){
      this.addDetailsConfig.selectData = row
    },
    pageChange1(pageNum){
      let billNo = R3.store.state.customize.originalOrder;
      this.addDetailsConfig.pageIndex = pageNum;
      this.getTable(true,billNo,pageNum,this.addDetailsConfig.pageSize)
    },
    pageSizeChange1(pageSize){
       let billNo = R3.store.state.customize.originalOrder;
       this.addDetailsConfig.pageSize = pageSize;
       this.getTable(true,billNo,pageNum,this.addDetailsConfig.pageSize)
    },
    addDetailsOk(){
      console.log(!this.addDetailsConfig.selectData.length);
      if(!this.addDetailsConfig.selectData.length){
        this.$Message.error('请选择至少一条明细！');
        return;
      }
      // 新增明细
      let arr = JSON.parse(sessionStorage.getItem('copyDetails')) //详情
      // 如果是编辑的话 
      this.addDetailsConfig.selectData.forEach(x =>{
        if(arr.every(y => y.ID !== x.ID)){
          // 不存在
          x.OC_B_ORDER_ITEM_ID = x.ID
          x.ID = '-1'
        }
      })
      this.tableConfig.data = this.tableConfig.data.concat(this.addDetailsConfig.selectData);
      this.addDetailsConfig.selectData = []
    },
  },
  destroyed(){
    sessionStorage.clear('copyDetails');
    sessionStorage.clear('billNo');
  }
};
</script>

<style lang="less" scoped>
  #actionMODIFY{
    display: none;
  }
</style>

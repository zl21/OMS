<!--
 * @Author: your name
 * @Date: 2021-05-28 16:55:51
 * @LastEditTime: 2021-06-24 17:13:00
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
                if(!R3.store.state.customize.originalOrder){
                  this.$Message.error('原订单编号不能为空！');
                  return;
                }
                this.addDetailsConfig.modal = true;
                let billNo = R3.store.state.customize.originalOrder;
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
            title: 'SKU名称'
          },{
            key: 'PS_C_PRO_ECODE',
            title: 'SPU编码'
          },{
            key: 'PS_C_PRO_ENAME',
            title: 'SPU名称'
          },{
            key: 'PS_C_SPEC1_ENAME',
            title: '规格1'
          },{
            key: 'PS_C_SPEC2_ENAME',
            title: '规格2'
          },{
            key: 'PS_C_SPEC3_ENAME',
            title: '规格3'
          },{
            key: 'qty',
            title: '购买数量'
          },{
            key: 'REAL_AMT',
            title: '成交金额'
          },{
            key: 'QTY_REFUND',
            title: '申请数量', // 申请退货数量：默认取原零售发货单可退数量，可编辑，仅支持录入大于0的正整数，且需小于等于原零售发货单可退数量；
            render:(h,params)=>{
             return h('InputNumber', {
                props: {
                  value: params.row.QTY_REFUND,
                  autosize: true,
                  min:1,
                  regx: /^(\s*|([1-9]{1}\d*)|(0{1}))(\.\d{0,2})?$/
                },
                on: {
                  'on-change': e => {
                      let num =  this.$OMS2.omsUtils.floatNumber(Number(e) * Number(params.row.AMT_REFUND), 2)
                      params.row.AMT_REFUND = isNaN(num) ? '0.00' : num;
                      params.row.QTY_REFUND = e;
                      this.tableConfig.data[params.index] = params.row;
                      R3.store.commit('customize/extraoOrderDetails', JSON.parse(JSON.stringify([...this.tableConfig.data])));
                  }
                }
              });
            }
          },{
            key: 'AMT_REFUND',
            title: '申请退款金额' // 申请退款金额：为 申请退货数量*成交单价（成交单价为原零售发货单中记录的），保留两位小数； 
          },{
            key: 'QTY_ACTUAL',
            title: '实际退货数量' // 实际退货数量：默认为0；
          },{
            key: 'AMT_ACTUAL_REFUND',
            title: '退款金额', // 退款金额：默认取“申请退款金额”，可编辑，仅支持录入正数，保留两位小数
            render:(h,params)=>{
             return h('Input', {
               props: {
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
            title: 'SKU名称'
          },{
            key: 'ORIG_ORDER_ID',
            title: 'SPU编码'
          },{
            key: 'ORIG_ORDER_ID',
            title: 'SPU名称'
          },{
            key: 'GIFT_TYPE',
            title: '赠品'
          },{
            key: 'TOTAL_FEE',
            title: '成交金额'
          },{
            key: 'AMT_REFUND',
            title: '可退金额'
          },{
            key: 'QTY',
            title: '购买数量'
          },{
            key: 'QTY_REFUND',
            title: '可退数量'
          },{
            key: 'GROUP_GOODS_MARK',
            title: '组合商品'
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
      await this.getTable(false,newVal);
      await sessionStorage.setItem('copyDetails',JSON.stringify(this.tableConfig.data))
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
    // console.log(buttonArr1);
    // buttonArr.forEach((x)=>{
    //   // 判断是否存在不存在设置为false，存在看是否显示ishide
    //   if(!SUB_ACTIONS.some(y => y.webname === x.webname)){
    //     x.isShow = false
    //     console.log(x.webname);
    //   }else{
    //     SUB_ACTIONS.forEach((e) => {
    //       if(x.webname === e.webname){
    //         x.isShow = e.ishide
    //       }
    //     })
    //   }
    // })
    if(!(this.$route.params.itemId == 'New')){
       let route = this.$route.params;
       const subData = await this.$OMS2.omsUtils.initSubtable('OC_B_REFUND_ORDER_ITEM', route.itemId, '181618');
       this.tableConfig.data = subData.rowData;
       await sessionStorage.setItem('copyDetails',JSON.stringify(subData.rowData));
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
      let ids = this.tableConfig.data.map((item) => {return item.ID})
      let params = {
        BILL_NO:billNo,
        pageNum: pageNum,
        pageSize: pageSize
      };
      // 是否是新增
      if (isAdd) {
        params = Object.assign(params,{EXCLUDE_IDS:ids ? ids.join() : ''})
      }

      // 调用查询接口
      const {data:{code,data}} = await self.service.orderCenter.queryExtraReturnOrderItem(params);
      if(code === 0){
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
      // 新增明细
      let arr = JSON.parse(sessionStorage.getItem('copyDetails')) //详情
      console.log(arr);
      // 如果是编辑的话 
      this.addDetailsConfig.selectData.forEach(x =>{
        if(arr.every(y => y.ID !== x.ID)){
          // 不存在
          x.OC_B_ORDER_ITEM_ID = x.ID
          x.ID = '-1'
        }
      })
      this.tableConfig.data = this.tableConfig.data.concat(this.addDetailsConfig.selectData);
    },
  },
  destroyed(){
    sessionStorage.clear('copyDetails');
  }
};
</script>

<style lang="less" scoped>
  #actionMODIFY{
    display: none;
  }
</style>

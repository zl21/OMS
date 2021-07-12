<!--
 * @Author: xx
 * @Date: 2021-05-19 10:53:30
 * @LastEditTime: 2021-07-12 18:00:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /project-logic/views/pages/orderCenter/returngood/returnGoods.vue
-->
<template>
  <div class="returnGoods">
    <div class="switch" v-if="IS_GROUP">
      <span @click="onSitch()"> {{ switchText }} </span>
    </div>
    <business-action-table :jordan-table-config="returnDetailAddTable.table" />
  </div>
</template>

<script>
  import businessForm from 'professionalComponents/businessForm';
  import businessActionTable from 'professionalComponents/businessActionTable';
  export default {
    name:'returnGodds',
    components:{
      businessForm,
      businessActionTable
    },
    data(){
      return{
        isSku:false,
        switchText:'切换为sku商品展示',
        IS_GROUP:true,
        returnDetailAddTable: {
          modal: false,
          pageShow: true, // 控制分页是否显示
          table: {
            border:true,
            columns: [], // 表头
            data: [], // 数据配置
            indexColumn: true, // 是否显示序号
            loading: false,
            isShowSelection: true, // 是否显示checkedbox
            totalData:[{name:'合计'}]
          }
      },
      }
    },
    created(){
      
    },
    async mounted(){
      await this.getColumData();
      await this.getData()
    },
    methods:{
      // 切换商品展示类型
      onSitch(){
        this.isSku ? this.switchText = '切换为sku商品展示' : this.switchText = '切换为平台商品展示';
        this.isSku = !this.isSku;
        this.getData(this.isSku);
      },
      // 获取表头
      async getColumData(){
        try {
          const { data } = await this.service.orderCenter.initObject({"TABLE":"OC_B_REFUND_ORDER_ITEM"});
          if(data.code === 0){
            this.returnDetailAddTable.table.columns = data.data.DATA.map(element => ({title:`${element.headerName}`,key:`${element.field}`,dataAcessKey:`${element.field}`}));
          }
        } catch (error) {
          console.log(error);
        }
      },
      // 获取数据
      async getData(isSku = this.isSku){
        try {
          let params = {
            ID: this.$route.params.itemId, //id
            TABLE: this.$route.params.tableName, //主表名
            SUB_TABLE: 'OC_B_REFUND_ORDER_ITEM', //明细表名
            PT_SKU: isSku, //true平台 false商品
            REFRESH: false, //是否加密
            index: 1 //当前页
          };
          const { data } = await this.service.orderCenter.queryObject(params);
          if(data.code === 0){
            this.returnDetailAddTable.table.data = data.data.DATA.SUB_ITEM
          }
        } catch (error) {
          console.log(error);
        }
      },
      // 合计
      totalNum(){

      }
    }
  }
</script>

<style lang="less">
@import "~@burgeon/oms-theme/skin/public.less";
.ItemComponentRoot {
  position: relative;
  overflow: inherit;
  .returnGoods .switch {
    position: absolute;
    right: 0;
    top: -54px;
    color: @base-color;
    cursor: pointer;
  }
}
</style>
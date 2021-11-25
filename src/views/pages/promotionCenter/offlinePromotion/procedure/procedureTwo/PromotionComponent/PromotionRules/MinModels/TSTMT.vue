<template>
  <!--TMT
    descript:组件之一,用来表示购买商品：筛选商品的情况
    author:wdq
    date:20180816
  -->
  <div class="propdis11" >
    <div class="buyPlatform">
    <span class="imputStr" v-if="index === 0">*</span>
        <span v-if="index === 0">购买</span>
        <select v-model="rule.proType" v-if="index === 0" @change="changePlatform()">
            <option value="1">商品</option>
            <option value="2">条码</option>
            <option value="3">平台商品</option>
            <option value="4">平台条码</option>
        </select>
    </div>
    <my-input
      :isActive="true"
      :isdisabled="false"
      :itemdata = Mitemdata2.itemdata
      @getFkChooseItem="handleChanged"
    >
    </my-input>
    <p>{{desc2}}</p>
  </div>
</template>


<script>
import myInput from "framework/components/element/input";
export default {
  model: {
    prop: "value",
    event: "change"
  },
  props: ["rule", "value","tobjid",'amend' , 'index'],
  watch:{
    tobjid:{
      handler(val , oldval){
        if(val){
          this.Mitemdata2.itemdata.valuedata=''
          this.Mitemdata2.itemdata.pid=''
        }
      }
    },
    amend:{
      handler(val , oldval){
        this.Mitemdata2.itemdata.valuedata=''
        this.Mitemdata2.itemdata.pid=''
        this.$emit('changeM')
      }
    }
  },
  data() {
    return {
      desc1: "",
      Mitemdata2: {
        //参与门店
        itemdata: {
          col: 1,
          // colid: 138222,
          // colname: `PS_C_PRO_ID${Math.floor(Math.random()*100)}`,
          datelimit: "all",
          display: "text",
          fkdesc: "标准商品档案",
          fkdisplay: "mop",
          inputname: "PS_C_PRO_ID:ECODE",
          isfk: true,
          isnotnull: false,
          isuppercase: true,
          length: 65535,
          name: "商品",
          pid:"",
          readonly: false,
          reftable: "PS_C_PRO",
          reftableid: 23446,
          row: 1,
          statsize: -1,
          type: "STRING",
          valuedata:""
        },
      },
      desc2: ""
    };
  },
  methods: {
    changePlatform(){
      this.$store.commit('changePlatform' , this.rule.proType);
      this.Mitemdata2.itemdata.valuedata=''
      this.Mitemdata2.itemdata.pid=''
    },
    handleChanged(value) {
       if(value.pid) {
         let valuePid = JSON.parse(value.pid)
         //促销设置条数太多时nameList数据返回太多，没有用到nameList，直接赋值空数组
         if(valuePid.nameList && valuePid.nameList.length>0){
           valuePid.nameList = []
         }
         if(valuePid.lists && valuePid.lists.result && valuePid.lists.result.length>0){
           valuePid.lists.result = []
         }
         if(valuePid.idArray && valuePid.idArray.length>0){
           valuePid.idArray = []
         }
         this.$emit("change", valuePid);
      }else {
        this.$emit("change", '');
      }
    }
    },
  components: {
    myInput
  },
  mounted(){
    this.Mitemdata2.itemdata.valuedata=this.value?JSON.stringify(this.value):""
    this.$store.state.jordanStore.platformStyle = this.rule.proType?this.rule.proType:this.$store.state.jordanStore.platformStyle;
    if(this.$store.state.jordanStore.platformStyle === '1'){
          this.Mitemdata2.itemdata.reftable = 'PS_C_PRO'
        }else if(this.$store.state.jordanStore.platformStyle === '2'){
          this.Mitemdata2.itemdata.reftable = 'PS_C_SKU'
        }else {
          this.Mitemdata2.itemdata.reftable = 'SG_B_CHANNEL_PRODUCT'
        }
  },
  computed: {
    selectVal_store(){
      return  this.$store.state.jordanStore.platformStyle
      
    }
  },
  watch:{
    selectVal_store:{
      handler(val , oldVal){
        if(val === '1'){
          this.Mitemdata2.itemdata.reftable = 'PS_C_PRO'
        }else if(val === '2'){
          this.Mitemdata2.itemdata.reftable = 'PS_C_SKU'
        }else {
          this.Mitemdata2.itemdata.reftable = 'SG_B_CHANNEL_PRODUCT'
        }
      }
    }
    
  }
};
</script>
<style  lang="less">
.propdis11 {
  display: flex;
  align-items: center;
  font-size: 12px;
  position: relative;
  .imputStr{
    color: red;
    padding-left: 2px

  }
  .item-input label.title {
      width: 50px;
  }
  .obj-input {
    width: 238px !important;
    margin: 0;
  }
  input {
    background: #fcf7f1;
    font-size: 12px;
  }

  .buyPlatform {
    width: 150px;
    margin-left: 40px;
    select {
        width: 100px;
    }
}
.item-input {
    width: calc(100% - 184px);
    .input-wrap {
    // width: calc(100% - 50px) !important;
    }
}
.buyPlatform select {
  background: #fcf7f1
}
}

</style>

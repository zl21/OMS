<template>
  <!--TMT
    descript:组件之一,用来表示优惠商品：筛选商品的情况
    author:luyan
    date:20200612
  -->
  <div class="propdis1 propdis111" >
    <span class="imputStr" v-if="!label || label=='优惠商品'">*</span>
    <my-input
      :isActive="true"
      :isdisabled="false"
      :itemdata = "Mitemdata2.itemdata"
      @getFkChooseItem="handleChanged"
    >
    </my-input>
    <p>{{desc2}}</p>
  </div>
</template>


<script>
import myInput from "../../../input.vue";
export default {
  model: {
    prop: "value",
    event: "change"
  },
  props: ["rule", "value","tobjid",'amend' , 'label','scheme_data','letterArr','index'],
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
    },
    'scheme_data.choose_commodity.value7':{
      handler(val,old){
        console.log('scheme_data.choose_commodity.value7',val)
        if(val == 1){
          this.Mitemdata2.itemdata.reftable = 'PS_C_PRO';
        }else{
          this.Mitemdata2.itemdata.reftable = 'PS_C_SKU';
        }
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
          colid: 138222,
          colname: `PS_C_PRO_ID${Math.floor(Math.random()*100)}`,
          datelimit: "all",
          display: "text",
          fkdesc: "标准商品档案",
          fkdisplay: "mop",
          inputname: "PS_C_PRO_ID:ECODE",
          isfk: true,
          isnotnull: false,
          isuppercase: true,
          length: 65535,
          name: "购买商品",
          pid:"",
          readonly: false,
          reftable: "PS_C_PRO",
          reftableid: 23446,
          row: 1,
          statsize: -1,
          type: "STRING",
          valuedata:""
        }
      },
      desc2: ""
    };
  },
  methods: {
    handleChanged(value) {
      let detail_code = this.scheme_data ?this.scheme_data.detail_code : "";
       if(value.pid) {
         let valuePid = JSON.parse(value.pid)
         //自由组合促销设置条数太多时nameList数据返回太多，自由组合并没有用到nameList，直接赋值空数组
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
    let detail_code = this.scheme_data ?this.scheme_data.detail_code : "";
    this.Mitemdata2.itemdata.valuedata=this.value?JSON.stringify(this.value):"";
    if(detail_code === 'GA1106'){
      this.Mitemdata2.itemdata.name = '购买 '+ this.letterArr[this.index] + '类商品'
    }
    console.log(this.label);
    if(this.label){
      this.Mitemdata2.itemdata.name = this.label;
    }
    if(this.scheme_data.choose_commodity && this.scheme_data.choose_commodity.value7 == 1){
      this.Mitemdata2.itemdata.reftable = 'PS_C_PRO';
    }else if(this.scheme_data.choose_commodity && this.scheme_data.choose_commodity.value7 == 2){
      this.Mitemdata2.itemdata.reftable = 'PS_C_SKU';
    }
  },
  // computed:{
  //   value(){
  //     return this.value
  //   }
  // },
  // watch:{
  //   value:{
  //     handler(val , oldVal){
  //       this.Mitemdata2.itemdata.valuedata = JSON.stringify(this.value)
  //     },
  //     deep:true
  //   }
  // //   this.Mitemdata2.itemdata.valuedata = JSON.stringify(this.value)
  // }
};
</script>
<style  lang="less">
.propdis111 {
  // float: left;
  // flex: 1;
  display: flex;
  align-items: center;
  font-size: 12px;
  position: relative;
  .imputStr{
    color: red;
    position: absolute;
    left: 30px;

  }
  .obj-input {
    width: 238px !important;
    margin: 0;
  }
  input {
    background: #fcf7f1;
    font-size: 12px;
  }
}


</style>

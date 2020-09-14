<template>
  <!--TMT
    descript:组件之一,用来表示购买商品：筛选商品的情况
    author:wdq
    date:20180816
  -->
  <div class="propdis1" >
    <span class="imputStr">*</span>
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
import myInput from "framework/components/element/input";
export default {
  model: {
    prop: "value",
    event: "change"
  },
  props: ["rule", "value","tobjid",'amend'],
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
  mounted() {
    console.log(this.tobjid)
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
       if(value.pid) {
         let valuePid = JSON.parse(value.pid)
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
  }
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
.propdis1 {
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

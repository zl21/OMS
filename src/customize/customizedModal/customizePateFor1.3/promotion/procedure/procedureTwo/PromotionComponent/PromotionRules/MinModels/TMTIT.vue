<template>
  <!--TMTIT
    descript:组件之一
    1.换购商品多少件
    2.送券多少张
    author:wdq
    date:20180820
  -->
  <div class="propdis6"  >
    <span class="imputStr" v-if="must">*</span>
    <my-input  v-if="showFilterPdts()"
      :isActive="true"
      :isdisabled="false"
      :itemdata = "Mitemdata1.itemdata"
      @getFkChooseItem="handleChangeds"
    >
    </my-input>
    <Mtable  v-if="showFilterVous()"
        id="my-input"
        :itemdata="Mtable.inputItemdata"
        :disabled='Mtable.isdisabled'
        :isActive="Mtable.isActive"
      >
      </Mtable>
    <span>{{getDesc}}</span>
    <input class="inputed" type="text" v-model="rule.prizeNum"
    oninput = "this.value= this.value.match(/\d+(\.\d{0,2})?/) ? this.value.match(/\d+(\.\d{0,2})?/)[0] : ''"
    onfocus="this.select()"
    maxlength="5" >
    <span>{{getUnit}}</span>
  </div>
</template>


<script>
import myInput from "framework/components/element/input";
import Mtable from "framework/components/input/objinput.vue";
export default {
  model: {
    prop: "value",
    event: "change"
  },
  props: ["rule", "value", "scheme_data","tobjid",'must'],
    watch:{
    tobjid:{
      handler(val , oldval){
        if(val){
          this.Mitemdata1.itemdata.valuedata=''
          this.Mitemdata1.itemdata.pid=''
        }
      }
    }
  },
  mounted() {
  },
  data() {
    return {
      desc1: "",
      Mitemdata1: {
        //参与门店
        itemdata: {
          col: 1,
          colid: 138222,
          colname: `PS_C_PRO_ID${Math.floor(Math.random()*100)}`,
          datelimit: "all",
          display: "text",
          fkdesc: "门店档案",
          fkdisplay: "mop",
          inputname: "PS_C_PRO_ID:ECODE",
          isfk: true,
          isnotnull: false,
          isuppercase: true,
          length: 65535,
          name: this.GetType(),
          readonly: false,
          reftable: "PS_C_PRO",
          reftableid: 23446,
          row: 1,
          statsize: -1,
          type: "STRING",
          valuedata: this.value?JSON.stringify(this.value):''
        }
      },
      Mtable: {
        isActive: true,
        isdisabled: false,
        inputItemdata: {
          col: 1,
          colid: "139987",
          colname: "VP_C_VOU_ID",
          datelimit: "all",
          display: "text",
          fkdesc: "购物券",
          fkdisplay: "drp",
          inputname: "VP_C_VOU_ID:ECODE",
          isfk: true,
          isnotnull: false,
          isuppercase: false,
          length: 20,
          name: "送",
          readonly: false,
          refobjid: "23601",
          reftable: "VP_C_VOU",
          reftableid: "23601",
          row: 1,
          statsize: -1,
          type: "STRING",
          valuedata: this.value?JSON.stringify(this.value):''
        }
      },
      desc2: ""
    };
  },
  computed: {
    getUnit() {
      const { scheme_data = {} } = this;
      // if(scheme_data.detail_code.indexOf("coupon")<0){
      // if(scheme_data.detail_code.indexOf("GA1403"||"GA1404"||"GA1303"||"GA1304")<0){
      if(scheme_data.detail_code.indexOf("GA1403")<0 &&scheme_data.detail_code.indexOf("GA1404")<0&&scheme_data.detail_code.indexOf("PA1303")<0&&scheme_data.detail_code.indexOf("PA1304")<0){
          return "件";
      }else{
          return  "张";
      }
    },
    getDesc() {
      const { scheme_data = {} } = this;
      // if(scheme_data.detail_code.indexOf("coupon")<0){
      if(scheme_data.detail_code.indexOf("GA1403")<0 &&scheme_data.detail_code.indexOf("GA1404")<0&&scheme_data.detail_code.indexOf("PA1303")<0&&scheme_data.detail_code.indexOf("PA1304")<0){
          return "";
      }else{
          return  "券";
      }
    }
  },
  methods: {
    handleChangeds(value) {
      if(value.pid) {
         let valuePid = JSON.parse(value.pid)
        this.$emit("change", valuePid);
      }else {
        this.$emit("change", );
      }
    },
    GetType() {
      const { scheme_data = {} } = this;
      const { rules = [] } = scheme_data;
      let type = scheme_data.promotionType_code;
      let rs = "";
      switch (type) {
        case "GA14":
        case "PA13":
          rs = "赠送商品";
          break;
        case "GA15":
        case "PA14":
          rs = "换购商品";
          break;
        default:
          rs = "";
      }
      return rs;
    },
    showFilterPdts() {
       const { scheme_data = {} } = this;
      //  return scheme_data.detail_code.indexOf("coupon")<0;
       return scheme_data.detail_code.indexOf("GA1403")<0 &&scheme_data.detail_code.indexOf("GA1404")<0&&scheme_data.detail_code.indexOf("PA1303")<0&&scheme_data.detail_code.indexOf("PA1304")<0;
    },
    showFilterVous() {
      const { scheme_data = {} } = this;
      return (scheme_data.promotionType_code=="GA14"||scheme_data.promotionType_code=="PA13")&&(scheme_data.detail_code==="GA1403"||scheme_data.detail_code==="GA1404"||scheme_data.detail_code==="PA1303"||scheme_data.detail_code==="PA1304");
    }
  },
  components: {
    myInput,
    Mtable
  }
};
</script>
<style>
.propdis6 {
  /* float: left; */
  /* flex: 1; */
  display: flex;
  align-items: center;
  font-size: 12px;
  /* width: 30%; */
  position: relative;
}
.propdis6 .imputStr{
  color: red;
  position: absolute;
  left: 3px;
}
.obj-input {
  width: 238px !important;
  margin: 0;
}
 .propdis6 .inputed {
  background: #FCF7F1;
  font-size: 12px;
  width: 60px;
  height: 24px;
  border-radius: 2px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  border: 1px solid #d8d8d8;
  padding-left: 3px;
  margin: 0 3px;
  text-align:center;
}

.item-input {
  line-height: 24px;
}
</style>

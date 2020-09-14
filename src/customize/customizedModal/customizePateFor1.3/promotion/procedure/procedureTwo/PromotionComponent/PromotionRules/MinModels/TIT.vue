<template>
  <!--TIT
    descript:组件之一,用来表示享受几折、优惠多少元
    author:wdq
    date:20180816
  -->
  <div class="propdis3">
    <p style="text-align: right">{{getName}}</p>
    <input type="text" v-if="getUnit==='折'"  v-model=rule.content    @change="$emit('change',$event.target.value)" placeholder="0.10" class="input-number"
           onfocus="this.select()"
           min="0" maxlength="4" onkeyup="this.value= this.value.match(/^(0(\.?[0-9]{0,2})?|1(\.0?0?)?)$/) ? this.value.match(/^(0(\.?[0-9]{0,2})?|1(\.0?0?)?)$/)[0] : ''"
    />
    <input v-else type="text"   v-model=rule.content  onkeyup="this.value= this.value.match(/^(0\.?\d{0,2}|[1-9]\d*\.?\d{0,2})$/) ? this.value.match(/^(0\.?\d{0,2}|[1-9]\d*\.?\d{0,2})$/)[0] : ''"  @change="$emit('change',$event.target.value)" placeholder="0" class="input-number"
           onfocus="this.select()" min="0">
    <p>{{getUnit}}</p>
  </div>
</template>


<script>
  import myInput from "framework/components/element/input.vue";

  export default {
    model: {
      prop: "value",
      event: "change"
    },
    props: ["scheme_data", "rule", "index"],
    components: {
      myInput
    },
    computed: {
      getName() {
        let d = this.scheme_data.promotionType_code;
        let result = "";
        switch (d) {
          case "GA11":
          case "PA11":
            result = this.GetDiscountDispaly();
            break;
          case "GA12":
          case "PA12":
            result = this.GetMinusDisplay();
            break;
          case "GA13":
            result = this.GetFpriceDisplay();
            break;
          case "GA15":
          case "PA14":
            result = this.GetChangeDisplay();
            break;
          case "GA16":
          case "PA15":
            result = this.GetFreeDisplay();
            break;
        }
        return result;
      },
      getUnit() {
        let t = this.scheme_data.promotionType_code;
        let d = this.scheme_data.detail_code;
        switch (t) {
          case "GA11":
          case "PA11":
            return "折";
            break;
          case "GA13":
          case "GA12":
          case "PA12":
            return "元";
            break;
          case "GA16":
          case "PA15":
            return "件";
            break;
          case "PA14":
            if(d=="GA1503"||d=="PA1402"||d=="GA1504")  return "折";
            else  return "元";
            break;
        }
      }
    },
    methods: {
      GetDiscountDispaly() {
        let index = this.index;
        let len = this.scheme_data.rules.length - 1;
        let detail_code = this.scheme_data.detail_code;
        let begin = "",
          middle = "",
          end = "";
        if (detail_code == "GA1103"||detail_code == "PA1103") {
          switch (index) {
            case 0:
              begin = "立享第1件";
              break;
            case len:
              end = "以上";
            default:
              middle = "第" + (index + 1) + "件";
          }
          return begin + middle + end;
        }
        return "立享";
      },
      GetMinusDisplay() {
        return "立减";
      },
      GetFpriceDisplay(){
        return "特价";
      },
      GetChangeDisplay(){
        let d = this.scheme_data.detail_code;
        let index=this.index;
        let end="";
        let begin= index==0?"":"";
        switch (d) {
          case "GA1501":
          case "PA1401":
          case "GA1502":
            end="加";
            break;
          case "GA1503":
          case "PA1402":
          case "GA1504":
            end="享受";
            break;
          case  "GA1505":case  "PA1403":
          case  "GA1506":
            end="优惠";
            break;
        }
        return  begin+end;
      },
      GetFreeDisplay(){
        return "免";
      },
    },
  };
</script>
<style lang="less" scoped>
.propdis3 {
  /* float: left; */
  /* flex: 1; */
  display: flex;
  align-items: center;
  font-size: 12px;
  input {
    background: #fcf7f1;
    font-size: 12px;
    width: 60px;
    height: 24px;
    border-radius: 2px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    border: 1px solid #d8d8d8;
    padding-left: 3px;
    margin: 0 3px;
  }
  .input-number{
    text-align: center;
  }
}


</style>

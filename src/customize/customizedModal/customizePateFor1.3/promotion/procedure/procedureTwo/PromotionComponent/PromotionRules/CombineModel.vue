<template>
  <div class="all-promotion">

    <div class="fur">
    <div v-for="(rule,index) in scheme_data.rules" :key="scheme_data.promotionType_code+index" class="rule grade-giftClass box"
     :class="[multipleClass(index) , gradeGiftClass(index) , incrementClass(index) , minusClass(index) , fpriceClass(index) ,
     gradeCouponClass(index) , allFprice(index) , allDis(index) , allMinus(index) , globalMultiple(index) , globalMinus(index),
     globalGradeCoupon(index) , globalIncrement(index) , globalChange(index)]" >
     <!-- 断行 -->
     <div class="box1" :class="[discount12(index) , discount13(index) ,change11(index) , change12(index) , change13(index) , minus12(index) ,
      fprice12(index) , gift34(index) , discount22(index) , discount23(index) , minus22(index) , gift24(index) , change20(index) , free11(index) , gradeclass(index) ]">
      <TMT   v-model="rule.skuIds" :rule="rule" :tobjid="tobjid" :amend="amend" @changeM="changeM"  v-if="showFilterSkus(index)" />
      <TNNIT :rule="rule"  :index="index" :scheme_data="scheme_data"   v-if="showprogram_code(index)"/>
      <TSSIT :rule="rule"  :index="index" :scheme_data="scheme_data"   v-if="showAmountOrAmt(index)"  @changeAll="changeAllUnit"  @changeUnitAllFlag="changeUnitAllFlag"/>
      <!-- 断行 -->
      </div>
      <!-- 断行1 -->
      <div class="box2" :class="[purchaseExemption() ,  freeClass(index) , boxMultip(index)]">
      <TIT   v-model="rule.content"  :rule="rule"  :index="index" :scheme_data="scheme_data"   v-if="showDisOrMinus()" />
      <TMTIT :rule="rule" :must="true" v-model="rule.prizeItem"  :index="index" :scheme_data="scheme_data" :tobjid="tobjid"  class="rule"  v-if="showPrize()"    />
      <BB  :rule="rule"  :index="index" :scheme_data="scheme_data"   v-if="ShowAddOrDeleteRow(index)"   @operateData="operateData" />
      <span v-if="showAnd(index)" class="dis_and_style" >并且</span>
      <!-- 断行1 -->
      </div>
    </div>
    <div   v-for="(limit,index) in scheme_data.limits" class="rule" :key=index>
      <!-- 针对组合策略才会出现这种情况 -->
      <TIT  v-model="limit.content"  :rule="limit"  :index="index" :scheme_data="scheme_data"   class="rule" :class="[combineClass(index) , combineFprice(index) , combineDis(index)]"  v-if="showOutCondition()"/>
      <!-- 针对组合（特价/换购/赠品）才会出现这种情况 -->
      <TMTIT :must="false" :rule="limit" v-model="limit.skusId"  :index="index" :scheme_data="scheme_data"   class="rule"   v-if="showOutPrize()"   />
      <BB  :rule="limit"  :index="index" :scheme_data="scheme_data"   class="rule" @operateData="operateData"   v-if="ShowOutAddOrDeleteRow(index)"/>
    </div>

    </div>

  </div>
</template>
<script>
import TMT from "./MinModels/TMT";
import TSSIT from "./MinModels/TSSIT";
import TIT from "./MinModels/TIT";
import BB from "./MinModels/BB";
import SIT from "./MinModels/SIT";
import TMTIT from "./MinModels/TMTIT";
import TNNIT from "./MinModels/TNNIT";
export default {
  components: {
    TMT,
    TSSIT,
    TIT,
    SIT,
    BB,
    TMTIT,
    TNNIT
  },
  props:{
    tobjid:{
      type:Boolean,
      default:()=>false
    },
    amend:{
      type:Boolean,
      default:()=>false
    }
  },
  data() {
    return {
      myin: "",
      isChangeALLUnit:false,  //是否切换页面所有的计件（价）单位
    };
  },
   // store 库中的促销策略数据
  computed : {
    scheme_data(){
        let routerid = this.$route.query.id;
        return routerid>0?this.$store.state.customize.scheme_data:this.$store.state.customize.scheme_dataNew
    }
  },
  mounted() {

  },
  methods: {
    changeM(){
      this.$emit('changeM')
    },
    //购买商品组件，筛选商品
    showFilterSkus(index) {
      const { scheme_data = {} } = this;
      const { rules = [] } = scheme_data;
      let p = scheme_data.program_code;
      let t = scheme_data.promotionType_code;
      let d = scheme_data.detail_code;
      let rs = true;
      if (p === "GA") {
        if (index != 0) {
          switch (d) {
            case "GA1104":
            case "GA1502":
            case "GA1504":
            case "GA1506":
              rs = true;
              break;
            default:
              rs = false;
          }
        }
      }else{
         rs=false;
      }
      return rs;
    },
    //分别大类
    showprogram_code(index){
      const { scheme_data = {} } = this;
      const { rules = [] } = scheme_data;
      let p = scheme_data.program_code;
      let t = scheme_data.promotionType_code;
      let d = scheme_data.detail_code;
      if(p==="GA"){
         return false;
      }else if (p==="PA"&&index!=0){
        if(t=="PA13"&&d=="PA1302"&&index===0)
          return true;
        else
          return false
      }else{
         return  true;
      }

    },
    //是否出现金额和数量比较组件
    showAmountOrAmt(index) {
      const { scheme_data = {} } = this;
      const { rules = [] } = scheme_data;
      let p=scheme_data.program_code;
      let t=scheme_data.promotionType_code;
      let d = scheme_data.detail_code;
      let rs = false;
      if(index==0)  return true;
      if(p==="GA"){
           if(t==="GA15"){
                switch (d) {
                  case "GA1504":
                  case "GA1502":
                  case "GA1506":
                    rs = true;
                    break;
                  default:
                    rs = false;
                }
           }else if(t==="GA11"){
              switch(d){
                 case "GA1102":
                 case "GA1104":
                    rs=true;
                    break;
              }
           }else{
              rs=true;
           }
      }else{
        //if (p==="PA" && (t=="gift" && (d=="grade-gift"||d=="grade-coupon")))
          //return true;
        if(p==="PA"){
          if(t==="PA13"){
            switch (d) {
              case "PA1302":
              case "PA1304":
                rs = true;
                break;
              default:
                rs = false;
            }
          }else if(t==="PA11"||t==="PA12"){
             switch(d){
                case "PA1102":
                case "PA1202":
                   rs=true;
                   break;
                default:
                   rs=false;
             }
          }
        }


      }
      return rs;
    },
    //是否展示行之前的连接符"并且""
    showAnd(index) {
      const { scheme_data = {} } = this;
      const { rules = [] } = scheme_data;
      let d = scheme_data.detail_code;
      let rs = false;
      if (
       // scheme_data.program_code === "GA" &&
        ((scheme_data.promotionType_code == "GA15"||scheme_data.promotionType_code == "PA14")||(scheme_data.promotionType_code == "GA11"||scheme_data.promotionType_code == "PA11")) && index != rules.length - 1
      ) {
        switch (d) {
          case "GA1104":
          case "GA1504":
          case "GA1502":
          case "GA1506":
            rs = true;
            break;
          default:
            rs = false;
        }
      }
      return rs;
    },
    showOutCondition() {
      const { scheme_data = {} } = this;
      const { limits = [] } = scheme_data;
      let t = scheme_data.promotionType_code;
      let d = scheme_data.detail_code;
      let rs = false;
      switch (t) {
        case "GA15":
          // if (d.indexOf("combine-") >= 0) rs = true;
          if (d==="GA1502"||d==="GA1504"||d==="GA1506") rs = true;
          else rs = false;
          case "GA11":
          if (d == "GA1104")
          rs = true;
      }
      return rs;
    },
    showOutPrize() {
      const { scheme_data = {} } = this;
      const { rules = [] } = scheme_data;
      let t = scheme_data.promotionType_code;
      let d = scheme_data.detail_code;
      let rs = false;
      switch (t) {
        case "GA15":
        case "PA14":
          // if (d.indexOf("combine-") >= 0) rs = true;
          if (d==="GA1502"||d==="GA1504"||d==="GA1506") rs = true;
          else rs = false;

      }
      return rs;
    },
    //展示赠品条件和换购条件
    showPrize() {
      const { scheme_data = {} } = this;
      const { rules = [] } = scheme_data;
      let d = scheme_data.detail_code;
      let rs = true;
      switch (scheme_data.promotionType_code) {
        case "GA11":
        case "PA11":
        case "GA12":
        case "PA12":
        case "GA16":
        case "PA15":
        case "GA13":
          rs = false;
          break;
        case "GA14":
        case "PA13":
          rs = true;
          break;
        case "GA15":
        case "PA14":
          // if (d.indexOf("all-") >= 0) rs = true;
          if (d === "GA1401"||d === "GA1403"||d === "PA1301"||d === "PA1303"||d === "GA1501"||d === "GA1503"||d === "GA1505"||d === "PA1401"||d === "PA1402"||d === "PA1403") rs = true;
          else rs = false;
      }
      return rs;
    },
    //享受/立减
    showDisOrMinus() {
      const { scheme_data = {} } = this;
      const { rules = [] } = scheme_data;
      let d = scheme_data.detail_code;
      let rs = true;
      switch (scheme_data.promotionType_code) {
        case "GA11":
        case "PA11":
          if (scheme_data.detail_code !== "GA1104") rs = true;
          else rs = false;
          break;
        case "GA12":
        case "PA12":
        case "GA13":
          rs=true;
          break;
        case "GA15":
        case "PA14":
          // if (d.indexOf("all-") >= 0) rs = true;
          if (d === "GA1401"||d === "GA1403"||d === "PA1301"||d === "PA1303"||d === "GA1501"||d === "GA1503"||d === "GA1505"||d === "PA1401"||d === "PA1402"||d === "PA1403") rs = true;
          else rs = false;
          break;
        case "GA14":
        case "PA13":
          rs = false;
          break;
      }
      return rs;
    },
    //增加和删除按钮
    ShowAddOrDeleteRow(index) {
      const { scheme_data = {} } = this;
      const { rules = [] } = scheme_data;
      let d=scheme_data.detail_code;
      let rs = false;
      switch (scheme_data.promotionType_code) {
        case "GA11":
        case "PA11":
          if (
            (scheme_data.detail_code === "GA1102" ||
            scheme_data.detail_code === "PA1102" ||
              scheme_data.detail_code === "GA1103"||scheme_data.detail_code === "PA1103") &&
            index === rules.length - 1
          )
            rs = true;
          else rs = false;
          break;
        case "GA13":
        case "GA12":
        case "PA12":
          if ((scheme_data.detail_code === "GA1302"||scheme_data.detail_code === "GA1202"||scheme_data.detail_code === "PA1202") && index === rules.length - 1)
            rs = true;
          else rs = false;
          break;
        case "GA14":
        case "PA13":
           if (((scheme_data.detail_code === "GA1402"||scheme_data.detail_code === "PA1302") ||(scheme_data.detail_code === "GA1404"||scheme_data.detail_code === "PA1304")) && index === rules.length - 1)
            rs = true;
          else rs = false;
          break;
        case "GA15":
        case "PA14":
          if(index === rules.length - 1&& (d === "GA1401"||d === "GA1403"||d === "PA1301"||d === "PA1303"||d === "GA1501"||d === "GA1503"||d === "GA1505"||d === "PA1401"||d === "PA1402"||d === "PA1403"))
            rs=true;
          else
            rs=false;
          break;
      }
      return rs;
    },
     //增加和删除按钮
    ShowOutAddOrDeleteRow(index) {
      const { scheme_data = {} } = this;
      const { limits = [] } = scheme_data;
      let d=scheme_data.detail_code;
      let rs = false;
      switch (scheme_data.promotionType_code) {
        case "GA15":
        case "PA14":
          if(index === limits.length - 1&& (d==="GA1502"||d==="GA1504"||d==="GA1506"))
            rs=true;
          else
            rs=false;
          break;
      }
      return rs;
    },

    //动态添加类方法
    multipleClass(index) {
      if (
        this.scheme_data.program_code === "GA" &&
        this.scheme_data.promotionType_code === "GA11" &&
        this.scheme_data.detail_code === "GA1102"
      ) {
        return index !== 0 ? "multipleClass" : "";
      }
    },
    boxMultip(index) {
      if (
        this.scheme_data.program_code === "GA" &&
        this.scheme_data.promotionType_code === "GA11" &&
        this.scheme_data.detail_code === "GA1102"
      ) {
        return index !== 0 ? "boxMultip" : "";
      }
    },
    //动态修改box宽度
    discount12(index) {
      if (
        this.scheme_data.program_code === "GA" &&
        this.scheme_data.promotionType_code === "GA11" &&
        this.scheme_data.detail_code === "GA1102"
      ) {
        return index > 0 ? "discount12" : "";
      }
    },
    discount13(index) {
      if (
        this.scheme_data.program_code === "GA" &&
        this.scheme_data.promotionType_code === "GA11" &&
        this.scheme_data.detail_code === "GA1103"
      ) {
        return index > 0 ? "discount13" : "";
      }
    },
    gradeGiftClass(index) {
      if (
        this.scheme_data.program_code === "GA" &&
        this.scheme_data.promotionType_code === "GA14" &&
        this.scheme_data.detail_code === "GA1402"
      ) {
        return index !== 0 ? "gradeGiftClass" : "";
      }

    },
    //动态修改box1的宽度
    gift34(index) {
      if (
        this.scheme_data.program_code === "GA" &&
        this.scheme_data.promotionType_code === "GA14" &&
        (this.scheme_data.detail_code === "GA1402" || this.scheme_data.detail_code === "GA1404")
      ) {
        return index !== 0 ? "gift34" : "";
      }
    },
    incrementClass(index) {
      if(this.scheme_data.program_code === "GA" && this.scheme_data.promotionType_code === "GA11" && this.scheme_data.detail_code === "GA1103"){
        return index !==0 ? (index < this.scheme_data.rules.length-1 ? "incrementClass1" : "incrementClass") : "";
      }
    },
    combineClass(index) {
      if(this.scheme_data.program_code === "GA" && this.scheme_data.promotionType_code === "GA11" && this.scheme_data.detail_code === "GA1104"){
        return index === 0 ? "combineClass" : "";
      }
    },
    minusClass(index) {
      if(this.scheme_data.program_code === "GA" && this.scheme_data.promotionType_code === "GA12" && this.scheme_data.detail_code === "GA1202"){
        return index !== 0 ? "minusClass" : "";
      }
    },
    //动态修改box1宽度
    minus12(index){
      if(this.scheme_data.program_code === "GA" && this.scheme_data.promotionType_code === "GA12" && this.scheme_data.detail_code === "GA1202"){
        return index !== 0 ? "minus12" : "";
      }
    },
    fpriceClass(index){
      if(this.scheme_data.program_code === "GA" && this.scheme_data.promotionType_code === "GA13" && this.scheme_data.detail_code === "GA1302"){
        return index !== 0 ? "fpriceClass" : "";
      }
    },
    //动态添加买免box2宽度
    purchaseExemption(){
      if(this.scheme_data.detail_code === "GA1601"){
        return 'purchaseExemptionClass'
      }
    },
    //动态修改box1宽度
    fprice12(index){
      if(this.scheme_data.program_code === "GA" && this.scheme_data.promotionType_code === "GA13" && this.scheme_data.detail_code === "GA1302"){
        return index !== 0 ? "fprice12" : "";
      }
    },
    gradeCouponClass(index){
      if(this.scheme_data.program_code === "GA" && this.scheme_data.promotionType_code === "GA14" && this.scheme_data.detail_code === "GA1404"){
        return index !== 0 ? "gradeCouponClass" : "";
      }
    },
    allFprice(index){
      if(this.scheme_data.program_code === "GA" && this.scheme_data.promotionType_code === "GA15" && this.scheme_data.detail_code === "GA1501"){
        return index !== 0 ? "allFprice" : "";
      }
    },
    allDis(index){
      if(this.scheme_data.program_code === "GA" && this.scheme_data.promotionType_code === "GA15" && this.scheme_data.detail_code === "GA1503"){
        return index !== 0 ? "allDis" : "";
      }
    },
    //动态添加box宽度
    change11(index){
      if(this.scheme_data.program_code === "GA" && this.scheme_data.promotionType_code === "GA15" && this.scheme_data.detail_code === "GA1501"){
        return index !== 0 ? "change11" : "";
      }
    },
    change12(index){
      if(this.scheme_data.program_code === "GA" && this.scheme_data.promotionType_code === "GA15" && this.scheme_data.detail_code === "GA1503"){
        return index !== 0 ? "change12" : "";
      }
    },
    change13(index){
      if(this.scheme_data.program_code === "GA" && this.scheme_data.promotionType_code === "GA15" && this.scheme_data.detail_code ==="GA1505"){
        return index !== 0 ? "change13" : "";
      }
    },
    allMinus(index){
      if(this.scheme_data.program_code === "GA" && this.scheme_data.promotionType_code === "GA15" && this.scheme_data.detail_code === "GA1505"){
        return index !== 0 ? "allMinus" : "";
      }
    },
    combineFprice(index){
      if(this.scheme_data.program_code === "GA" && this.scheme_data.promotionType_code === "GA15" && this.scheme_data.detail_code === "GA1502"){
        return "combineFprice"
      }
    },
    combineDis(index){
      if(this.scheme_data.program_code === "GA" && this.scheme_data.promotionType_code === "GA15" && (this.scheme_data.detail_code === "GA1504" || this.scheme_data.detail_code === "GA1506")){
        return "combineDis"
      }
    },
    //是否要改变界面上所有的计件/价单位
    changeAllUnit(val){
       if(!this.isChangeALLUnit)  return;
       const { scheme_data = {} } = this;
       const { rules = [] } = scheme_data;
       rules.forEach(rule => {
            rule.conditionName=val;
       });
    },
    changeUnitAllFlag(val){
      this.isChangeALLUnit=val;
    },


    //全场活动
    globalMultiple(index){
      if(this.scheme_data.program_code === "PA" && this.scheme_data.promotionType_code === "PA11" && this.scheme_data.detail_code === "PA1102"){
        return index !== 0 ? "globalMultiple" : "";
      }
    },
    //动态修改box1宽度
    discount22(index){
      if(this.scheme_data.program_code === "PA" && this.scheme_data.promotionType_code === "PA11" && this.scheme_data.detail_code === "PA1102"){
        return index !== 0 ? "discount22" : "";
      }
    },
    discount23(index){
      if(this.scheme_data.program_code === "PA" && this.scheme_data.promotionType_code === "PA11" && this.scheme_data.detail_code === "PA1103"){
        return index !== 0 ? "discount23" : "";
      }
    },
    //增加 删除  行
    operateData(type,behavior){
      let routerid = this.$route.query.id
      if(type==="rules"){
         switch(behavior){
            case "insert":
              let obj= {
                // 购买商品
                skuIds: "",
                // 条件名称
                conditionName: routerid>0?this.$store.state.customize.scheme_data.rules[0].conditionName:this.$store.state.customize.scheme_dataNew.rules[0].conditionName,
                // 条件类型：大于，等于。。。。
                conditionType: "GE",
                // 条件值
                conditionValue: "",
                // 非组合策略使用的(打折、满减、特价)
                content: 1,
                //赠品、换购范围条件
                prizeItem: "",
                //赠品、换购数量
                prizeNum: ""
              };
              this.scheme_data.rules.push(obj);
              break;
            case  "delete":
              this.scheme_data.rules.pop();
         }
      }else{
         switch(behavior){
            case "insert":
              let obj={
                content: "1",
                skusId: "",
                skusNum: 1
              };
              this.scheme_data.limits.push(obj);
              break;
            case  "delete":
              this.scheme_data.limits.pop();
         }
      }
    },
    globalMinus(index){
      if(this.scheme_data.program_code === "PA" && this.scheme_data.promotionType_code === "PA12" && this.scheme_data.detail_code === "PA1202"){
        return index !== 0 ? "globalMinus" : "";
      }
    },
    //动态修改box1的宽度
    minus22(index){
      if(this.scheme_data.program_code === "PA" && this.scheme_data.promotionType_code === "PA12" && this.scheme_data.detail_code === "PA1202"){
        return index !== 0 ? "minus22" : "";
      }
    },
    globalGradeCoupon(index){
      if(this.scheme_data.program_code === "PA" && this.scheme_data.promotionType_code === "PA13" && this.scheme_data.detail_code === "PA1304"){
        return index !== 0 ? "globalGradeCoupon" : "";
      }
    },
    //动态修改box1的宽度
    gift24(index){
      if(this.scheme_data.program_code === "PA" && this.scheme_data.promotionType_code === "PA13" && this.scheme_data.detail_code === "PA1304"){
        return index !== 0 ? "gift24" : "";
      }
    },
    freeClass(index){
      if(this.scheme_data.program_code === "PA" && this.scheme_data.promotionType_code === "PA15" && this.scheme_data.detail_code === "PA1501"){
        return "freeClass";
      }
    },
    globalIncrement(index) {
      if(this.scheme_data.program_code === "PA" && this.scheme_data.promotionType_code === "PA11" && this.scheme_data.detail_code === "PA1103"){
        return index !==0 ? (index >= this.scheme_data.rules.length-1 ? "globalIncrement" : "globalIncrement1") : "";
      }
    },
    globalChange(index) {
      if(this.scheme_data.program_code === "PA" && this.scheme_data.promotionType_code === "PA14"){
        return index > 0 ? "globalChange" : "";
      }
    },
    //动态修改box1宽度
    change20(index) {
      if(this.scheme_data.program_code === "PA" && (this.scheme_data.promotionType_code === "PA14" || this.scheme_data.promotionType_code === "free")){
        return index > 0 ? "change20" : "";
      }
    },
    free11(index) {
      if(this.scheme_data.program_code === "GA" && this.scheme_data.promotionType_code === "GA16"){
        return  "free11" ;
      }
    },
    gradeclass(index){
      if (
          this.scheme_data.program_code === "PA" &&
          this.scheme_data.promotionType_code === "PA13" &&
          this.scheme_data.detail_code === "PA1302"&&
          index !==0
        ) {
          return index !== 0 ? "gradeclass" : "";
        }
    },
  }
};
</script>
<style lang="less" scoped>
.all-promotion {
  div{
    box-sizing: border-box;
  }
  padding: 20px 0px;
  font-size: 12px;
  // overflow-y: auto;
  .dis_and_style {
    color: red;
    height: 24px;
    line-height: 24px;
    margin-left: 20px;
  }
  .fur {
  width: 100%;
  height: 100px;
  // padding-top: 50px;
}
  .rule {
    margin-bottom: 3px;
    // overflow: hidden;
    display: flex;
    justify-content: flex-start;
    position: relative;
  }
  // TIT input 样式
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
  }




//动态添加类
//商品-折扣-多种折扣
.multipleClass {
  padding-left: 435px;
}

//商品-折扣-递增折扣
.incrementClass {
  margin-left: 665px;
}
.incrementClass1 {
  margin-left: 689px;
}

//商品-买赠-梯度送赠品
.gradeGiftClass {
  margin-left: 436px;
}

//商品-打折-组合折扣
.combineClass {
  margin-left: 100px;
}

//商品-减现-梯度减现
.minusClass {
  margin-left: 435px;
}

//商品-特价-梯度特价
.fpriceClass {
  margin-left: 434px;
}

//商品-买赠-梯度送券
.gradeCouponClass {
  margin-left: 436px;
}

//商品-换购-统一换购+特价换购
.allFprice {
  // margin-left: 24px;
}

//商品-换购-统一换购+打折换购
.allDis {
  // margin-left: 24px;
}

//商品-换购-统一换购+优惠换购
.allMinus {
  // margin-left: 24px;
}

//商品-换购-组合换购+特价换购
.combineFprice {
  margin-left: 100px;
}

//商品-换购-组合换购+打折换购 与 商品-换购-组合换购+优惠打折
.combineDis {
  margin-left: 100px;
}


//全场活动
//全场-折扣-多种折扣
.globalMultiple {
  margin-left: 436px;
}
//全场-减现-梯度减现
.globalMinus {
  margin-left: 436px;
}
//全场-买赠-梯度送券
.globalGradeCoupon {
  margin-left: 431px;
}


//全场-打折-递增折扣
.globalIncrement {
  margin-left: 0px;
}
.globalIncrement1 {
  margin-left: 24px;
}

//全场-换购
.globalChange {
  margin-left: 0px;
}


.testdata {
  width: 200px;
}



// 调试样式

.box {
  display: flex;
  flex-wrap: wrap;
}

.box1 {
  display: flex;
  width: 665px;
  height: 28px;
  margin-right: -45px;
}

.box2 {
  display:flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  position: relative;
  margin-left: 27px;
}

//全场-买免
.freeClass {
  margin-left: -124px;
}

.boxMultip {
  margin-left: 90px;
}

//以下为动态修改box样式
.discount12 {
    // width: 164px;
    // padding-left: 26px;
    width: 167px;
    padding-left: 23px;
}
.discount13 {
  width: 0;
}
.change11 {
  height: 1px;
}
.change12 {
  height: 1px;
}
.change13 {
  height: 1px;
}
.minus12 {
    // padding-left: 26px;
    // width: 204px;
    padding-left: 23px;
    width: 229px;
}
.fprice12 {
    // padding-left: 26px;
    // width: 204px;
    padding-left: 24px;
    width: 229px;
}
.gift34 {
    // padding-left: 26px;
    // width: 204px;
    padding-left: 22px;
    width: 229px;
}
.discount22 {
    // padding-left: 26px;
    // width: 204px;
    padding-left: 19px;
    width: 229px;
}
.discount23 {
  height: 1px;
}
//全场满减-梯度
.minus22 {
    // padding-left: 26px;
    // width: 204px;
    padding-left: 19px;
    width: 229px;
}
.gift24 {
    padding-left: 26px;
    width: 204px;
}
.change20 {
  height: 1px;
}
.free11 {
  width: 500px;
}
// 递增折扣的第二行一下的对齐样式
.gradeclass {
  box-sizing: border-box;
  // margin-left: 466px;
  // width: 199px;
  margin-left: 455px;
    width: 210px;
}
.purchaseExemptionClass{
  margin-left: 80px;
}
}
</style>

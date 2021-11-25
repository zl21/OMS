<template>
  <div class="all-promotion">
     <div v-if="showTable()" style="width:100%">
       <tablePromsion :scheme_data="scheme_data" :choose_commodity="choose_commodity"/>
     </div>
    <div class="fur_1" v-if="!showTable()">
    <div v-for="(rule,index) in scheme_data.rules" :key="scheme_data.promotionType_code+index" class="rule grade-giftClass"
     :class="[multipleClass(index) , gradeGiftClass(index) , incrementClass(index) , minusClass(index) , fpriceClass(index) ,
     gradeCouponClass(index) , allFprice(index) , allDis(index) , allMinus(index) , globalMultiple(index) , globalMinus(index),
     globalGradeCoupon(index) , globalIncrement(index) , globalChange(index) , boxClass() , freeDom(index) , freeDomIndex(index),freeIndex(index),freeShare(index)]" >
     <!-- 断行 -->
     <div class="box1" :class="[discount12(index) , discount13(index) ,change11(index) , change12(index) , change13(index) , minus12(index) ,
      fprice12(index) , gift34(index) , discount22(index) , discount23(index) , minus22(index) , gift24(index) , change20(index) , free11(index) , gradeclass(index) ,PA1602(index),
      GA1702(index) , GA1802(index) , GA1803(index) , PA1702(index)]">
      <TITIT :rule="rule" :tobjid="tobjid" :amend="amend" v-if="showTitit(index)" />
      <TMT   v-model="rule.skuIds" :rule="rule" :tobjid="tobjid" :amend="amend" :index="index" :scheme_data="scheme_data" :letterArr="letterArr" @changeM="changeM"  v-if="showFilterSkus(index)" />
      <TSTMT  v-model="rule.skuIds" :rule="rule" :index="index" :tobjid="tobjid" :amend="amend" @changeM="changeM"  v-if="showFilterSkusAndPlatform(index)" />
      <TNNIT :rule="rule"  :index="index" :scheme_data="scheme_data"   v-if="showprogram_code(index)"/>
      <TSSIT :rule="rule"  :index="index" :scheme_data="scheme_data" :proflagsLeft="proflagsLeft"  v-if="showAmountOrAmt(index)"  @changeAll="changeAllUnit"  @changeUnitAllFlag="changeUnitAllFlag"/>
      <TCT  :rule="rule"  v-model="rule.instalment"   :index="index" :scheme_data="scheme_data" :tobjid="tobjid"   v-if="showInstalment(index)" ></TCT>
      <BB  :rule="rule"  :index="index" :scheme_data="scheme_data"   v-if="masterShowAddOrDeleteRow(index)"   @operateData="operateData" />
      <span class="dis_and_style" v-if="showAnd1(index)">并且</span>
       
      </div>
      <!-- 断行 -->
      <!-- 断行1 线下-->
    <div class="box2 bbgg" :class="[purchaseExemption() ,  freeClass(index) , boxMultip(index),incrementClassGa1105(index),incrementClassPa1104(index), minus13(index),GA1410(index)]" v-if="!isOnLine(scheme_data)">
      <!-- 打折的 优惠商品组件 -->
      <TMTDS :rule="rule.discounts[0]" :tobjid="tobjid" :amend="amend" :label="TMTlabel" v-model="rule.discounts[0].prizeItem" @changeM="changeM" :scheme_data="scheme_data" v-if="showDiscountProduce(index , scheme_data.rules.length)"></TMTDS>&nbsp;&nbsp;&nbsp;&nbsp;
      <TIT   v-model="rule.discounts[0].content"  :rule="rule.discounts[0]"  :index="index" :scheme_data="scheme_data" :proflagsLeft="proflagsLeft" :letterArr="letterArr" v-if="showDisOrMinus(index)" />
      <TMTIT :rule="rule.discounts[0]" :must="true" v-model="rule.discounts[0].prizeItem"  :index="index" :scheme_data="scheme_data" :tobjid="tobjid"  class="rule"  v-if="showPrize(index)"    />
      <!-- GP并且或者选组控件 GA1410分类送赠品 group_no放在discounts里面 -->
      <GP :rule="rule"  :index="index" :scheme_data="scheme_data" v-if="isGrouping(index)" @changeAll="changeGp"></GP>
      <GP  :rule="rule"  :index="index" :scheme_data="scheme_data" v-if="isGroupingGA1410(index)" @changeAll="changeGpGA1410"></GP>
      <BB  :rule="rule"  :index="index" :scheme_data="scheme_data" :fromFreeGroup="fromFreeGroup"   v-if="ShowAddOrDeleteRow(index)"   @operateData="operateData" />
      <span v-if="showAnd(index)" class="dis_and_style" >并且</span>
    </div>
      <!-- 断行1 -->
      <!-- 断行2 线上-->
    <div class="box2" v-if="isOnLine(scheme_data)" v-for="(innerRule , inneri) in rule.discounts" :key="inneri" :class="[purchaseExemption() ,  freeClass(index) , boxMultip(index)]">
      <TMTIT :isOneData='false' :rule="innerRule" :must="true" v-model="innerRule.prizeItem"  :index="inneri" :scheme_data="scheme_data" :tobjid="tobjid"  class="rule"  v-if="innerShowPrize(index)"    />
      <!-- <TIT   v-model="innerRule.content"  :rule="innerRule"  :index="inneri" :scheme_data="scheme_data"   v-if="innerShowDisOrMinus(index)" /> -->
      <TIT   v-model="innerRule.stock"  :rule="innerRule"  :index="inneri" :scheme_data="scheme_data"   v-if="innerShowDisOrMinus(index)" />
      <IBB  :rule="innerRule"  :index="index" :inneri="inneri" :scheme_data="scheme_data"   v-if="innerShowAddOrDeleteRow(index , inneri)"   @operateData="operateData" />
      <span v-if="showAnd(index)" class="dis_and_style" >并且</span>
    </div>
      <!-- 断行2 -->
    </div>
    <div   v-for="(limit,index) in scheme_data.limits" class="limit 111" :key="index">
      <TMTDS :rule="limit" :tobjid="tobjid" :amend="amend" :label="TMTlabel" :scheme_data="scheme_data" v-model="limit.skusId" @changeM="changeM" v-if="limtTMT()"></TMTDS>&nbsp;&nbsp;&nbsp;&nbsp;
      <!-- 针对组合策略才会出现这种情况 -->
      <!-- <TIT  v-model="limit.content"  :rule="limit"  :index="index" :scheme_data="scheme_data"   class="rule" :class="[combineClass(index) , combineFprice(index) , combineDis(index)]"  v-if="showOutCondition()"/> -->
      <TIT  v-model="limit.content"  :rule="limit"  :index="index" :scheme_data="scheme_data"   class="rule" :class="[combineClass(index) , combineFprice(index) , combineDis(index)]"  v-if="showOutCondition()"/>
      <!-- 针对组合（特价/换购/赠品）才会出现这种情况 -->
      <TMTIT :isOneData='false' :must="false" :rule="limit" v-model="limit.skusId"  :index="index" :scheme_data="scheme_data"   class="rule"   v-if="showOutPrize()"   />
      <TIT  v-model="limit.stock"  :rule="limit"  :index="index" :scheme_data="scheme_data"   class="rule" :class="[combineClass(index) , combineFprice(index) , combineDis(index)]"  v-if="showOutCondition1()"/>
      <BB  :rule="limit"  :index="index" :scheme_data="scheme_data" :limitAdd="limitAdd"   class="rule" @operateData="operateData"   v-if="ShowOutAddOrDeleteRow(index)"/>
      <IBB  :rule="limit" :inneri="index"  :index="index" :scheme_data="scheme_data"   class="rule" @operateData="operateData"   v-if="innerShowOutAddOrDeleteRow(index)"/>
    </div>

    </div>

  </div>
</template>
<script>
import tablePromsion from "./MinModels/TABLE";
import TMT from "./MinModels/TMT";
import TSTMT from "./MinModels/TSTMT";
import TSSIT from "./MinModels/TSSIT";
import TIT from "./MinModels/TIT";
import BB from "./MinModels/BB";
import IBB from "./MinModels/innerBB";
import SIT from "./MinModels/SIT";
import TMTIT from "./MinModels/TMTIT";
import TNNIT from "./MinModels/TNNIT";
import TITIT from "./MinModels/TITIT";
import TMTDS from "./MinModels/TMTDS";
import TCT from  "./MinModels/TCT";
export default {
  components: {
    TMT,
    TSTMT,
    TSSIT,
    TIT,
    SIT,
    BB,
    IBB,
    TMTIT,
    TNNIT,
    TITIT,
    TMTDS,
    TCT,
    tablePromsion
  },
  props:{
    tobjid:{
      type:Boolean,
      default:()=>false
    },
    amend:{
      type:Boolean,
      default:()=>false
    },
    scheme_data:{},
    choose_commodity:{},
    jordanTableConfig:{}
  },
  data() {
    return {
      limitAdd:true,  //换购中区分rules和limit中的加号
      fromFreeGroup:true,  //来源是 detail_code =GA1106 商品折扣自由组合
      myin: "",
      isChangeALLUnit:false,  //是否切换页面所有的计件（价）单位
      TMTlabel:'优惠商品',
      proflagsLeft:2,//商品打折左侧商品数量
      proflagsRight:2,//商品打折右侧立享数量
      letterArr:[],//26个英文字母数组
    };
  },
   // store 库中的促销策略数据
  computed : {
    // scheme_data(){
    //     let routerid = this.$route.query.id;
    //      return routerid>0?this.$store.state.scheme_data:this.$store.state.scheme_dataNew
    // }
  },
  watch :{ 
    choose_commodity:{
      handler(val,old){
        // console.log('console.log(this.choose_commodity)',this.choose_commodity)
        this.scheme_data.choose_commodity = val
      },
      deep: true,
      immediate: true
    },
    scheme_data:{
      handler(val,old){
        let self = this;
        // console.log('watch_scheme_data',val)
        // console.log('choose_commodity++++++',this.choose_commodity)
        this.scheme_data.choose_commodity = this.choose_commodity;
        if(val.detail_code === 'GA1106'||val.detail_code === 'GA1306'){
          val.rules.map((item,index)=>{
            item.pro_flag = self.letterArr[index%val.proflags]
          })
        }
      },
      deep: true,
      immediate: true
    },
    proflagsLeft:{
      handler(val,old){
        // console.log('watch_left',val)
        let routerid = this.$route.query.id;
        val = this.scheme_data.proflags
        this.proflagsRight = this.scheme_data.rules.length/this.proflagsLeft
        routerid>0?this.$store.state.scheme_data.proflags=this.proflagsLeft:this.$store.state.scheme_dataNew.proflags =this.proflagsLeft
      }
    }
  },
  created(){
        let self =this;
        this.newsetDesc()
        let routerid = this.$route.query.id;
       if(self.scheme_data.detail_code ==='GA1106'||self.scheme_data.detail_code ==='GA1306'){
         console.log('self.scheme_data.detail_code',self.scheme_data.detail_code)
          self.proflagsLeft = self.scheme_data.proflags
          // console.log('created_self.proflagsLeft',self.proflagsLeft)
          self.proflagsRight = (self.scheme_data.rules.length)/self.scheme_data.proflags
          self.scheme_data.rules.map((item,index)=>{
            item.pro_flag = self.letterArr[index%self.proflagsLeft]
          })
        }
        // console.log('self.scheme_data',self.scheme_data)

  },
  mounted() {
  },
  methods: {
    newsetDesc() {//商品折扣A,B,C,D...类商品，字母获取
      for (var i = 65, j = 0; i < 91; i++ , j++) {
      this.letterArr[j] = String.fromCharCode(i);
      }
      return this.letterArr
    },
    //是否显示limit的TMT组件
    limtTMT(){
      let scheme_data = this.scheme_data;
      let p = scheme_data.program_code;
      let t = scheme_data.promotionType_code;
      let d = scheme_data.detail_code;
      let rs = false;
      if(d==='GA1104'){
        rs = true;
      }
      return rs;
    },
    //是否显示box类名
    boxClass(){
      let self = this;
      return self.isOnLine(this.scheme_data) ? '':'box';
    },
    isOnLine(val){
      let value = false;
      if(val.promotionType_code==="GA17"||val.promotionType_code==="GA18"
        ||val.promotionType_code==="PA16"||val.promotionType_code==="PA17"){
          value = true
        }
        return value;
    },
    changeM(){
      this.$emit('changeM')
    },
    //优惠商品是否显示
    showDiscountProduce(index , len){
      let scheme_data = this.scheme_data;
      let p = scheme_data.program_code;
      let t = scheme_data.promotionType_code;
      let d = scheme_data.detail_code;
      let rs = false;
      if((t==="GA11"&& d!=="GA1104" && d!=="GA1106"&&d!=="GA1306") || (t === 'GA12')){
        rs = true;
        if(index != 0){
          rs = false;
        }
      }
      return rs;
    },
    //排名组件
    showTitit(index){
      let scheme_data = this.scheme_data;
      let p = scheme_data.program_code;
      let t = scheme_data.promotionType_code;
      let d = scheme_data.detail_code;
      let rs = false;
      if(index === 0){
        switch (t) {
          case "GA18":
          case "PA17":
            rs = true;
            break;
        }
      }
      return rs;
    },
    //购买商品组件,筛选商品
    showFilterSkus(index){
      const { scheme_data = {} } = this;
      const { rules = [] } = scheme_data;
      let p = scheme_data.program_code;
      let t = scheme_data.promotionType_code;
      let d = scheme_data.detail_code;
      let rs = true;
      if(p==="GA" && t!="GA17" && t!="GA18"){
        if(index != 0){
          switch (d) {
            case "GA1104":
            case "GA1106":
            case "GA1306":
            case "GA1502":
            case "GA1504":
            case "GA1506":
            case "GA1405": case "GA1406":
            case "GA1203":
            case "GA1303":
            case "GA1305":
            case "GA1602":
            if((d==='GA1106'||d==='GA1306') && index>=this.proflagsLeft ){
              rs = false
            }else{
              rs = true;
            }
              break;
              default:
                rs = false;
          }
        }else if( d==='GA1307' ){  // 特价单品补充不显示
          rs = false
        }
      }else {
        rs = false;
      }
      return rs;
    },
    //购买某平台商品组件，筛选商品
    showFilterSkusAndPlatform(index) {
      const { scheme_data = {} } = this;
      const { rules = [] } = scheme_data;
      let p = scheme_data.program_code;
      let t = scheme_data.promotionType_code;
      let d = scheme_data.detail_code;
      let rs = true;
      if (t === "GA17" || t === "GA18") {
        if (index != 0) {
          switch (d) {
            case "GA1703":
            case "GA1803":
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
         if(d== 'PA1801')  return false;
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
      //if( d === 'PA1801') return rs;
      if(index==0&&d!="GA1307" || d==="GA1405" || d==="GA1406")  return true;
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
                 case "GA1106":
                    rs=true;
                    break;
              }
           }else if(t==="GA14"){
             switch(d){
               case "GA1401":
               case "GA1410":
                 rs = false;
                 break;
               case "GA1402":
               case "GA1410":
               case "GA1404":
                 rs = true;
                 break;
             }
           }else if(t === 'GA13'){
              switch(d){
                case "GA1302":
                case "GA1303":
                case "GA1305":
                case "GA1306":
                  rs = true;
                  break;
                default:
                  rs = false;
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
          }else if(t==="PA16"){
            switch(d){
              case "PA1602":
                rs = true;
                break;
            }
          }else if(t==="PA17"){
            switch(d){
              case "PA1702":
                rs = true;
                break;
            }
          }
        }
      }
      return rs;
    },
    //是否展示行之前的连接符"并且""
    showAnd1(index){
      let scheme_data = this.scheme_data;
      let rules = scheme_data.rules;
      let d = scheme_data.detail_code;
      let rs = false;
      if((scheme_data.promotionType_code==="GA17"||"GA18")&& index === 0){
        switch (d) {
          case "GA1703":
            rs = true;
            break;
          case "GA1803":
            rs = true;
            break;
          case "GA1405":case 'GA1406':
            rs = true;
            break;
        }
      }
      return rs;
    },
    showAnd(index) {
      const { scheme_data = {} } = this;
      const { rules = [] } = scheme_data;
      let d = scheme_data.detail_code;
      let rs = false;
      if (
       // scheme_data.program_code === "GA" &&
        ((scheme_data.promotionType_code == "GA15"||scheme_data.promotionType_code == "PA14")||
        (scheme_data.promotionType_code == "GA11"||scheme_data.promotionType_code == "PA11"||
        scheme_data.promotionType_code == "GA12"||scheme_data.promotionType_code == "GA13"||scheme_data.promotionType_code == "GA16")) && index != rules.length - 1
      ) {
        switch (d) {
          case "GA1104":
          case "GA1504":
          case "GA1502":
          case "GA1506":
          case "GA1203":
          case "GA1303":
          case "GA1602":
            rs = true;
            break;
          default:
            rs = false;
        }
        if(d==='GA1303'&& this.choose_commodity.value13=='Y'){
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
          break;
          case "GA11":
          if (d == "GA1104")
          rs = true;
          break;
          case "GA12":
            if(d==="GA1203") rs=true;
          break;
          case "GA16":
            if(d==="GA1602") rs=true;
          break;
      }
      return rs;
    },
    showOutCondition1(){
      const { scheme_data = {} } = this;
      const { limits = [] } = scheme_data;
      let t = scheme_data.promotionType_code;
      let d = scheme_data.detail_code;
      let rs = false;
      switch(t){
        case "GA17":
        case "GA18":
        case "GA13":
          if(d==="GA1703" || d==="GA1803" || d==="GA1303"){
            rs = true;
          }
          break;
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
        case "GA14":
        case "GA15":
        case "PA14":
        case "GA17":
        case "GA18":
          // if (d.indexOf("combine-") >= 0) rs = true;
          if (d==="GA1502"||d==="GA1504"||d==="GA1506"||d==="GA1803"||d==="GA1703"||d==="GA1405" || d === "GA1406") rs = true;
          else rs = false;

      }
      return rs;
    },
    //box3内部的结构
    innerShowPrize(index){
      let self = this;
      let scheme_data = self.scheme_data;
      let rules = scheme_data.rules;
      let d = scheme_data.detail_code;
      let p = scheme_data.promotionType_code;
      let rs = false;
      switch (p) {
        case "GA14":
          if(d === "GA1402" || d === "GA1410"){
            rs = true
          }
          break;
        case "GA17":
          if(d==="GA1703" ){
            rs = false;
          }else {
            rs = true;
          }
          break;
        case "GA18":
          if(d==="GA1803" ){
            rs = false;
          }else {
            rs = true;
          }
          break;
        case "PA16":
          if(d==="PA1601" || d === "PA1602"){
            rs = true;
          }
          break;
        case "PA17":
          rs = true;
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
        case "PA13":
          rs = true;
          break;
        case "GA14":
        case "GA15":
        case "PA14":
          // if (d.indexOf("all-") >= 0) rs = true;
          if (d === "GA1401"||d === "GA1402"||d === "GA1410"||d === "GA1403" || d === "GA1404" || d === "PA1301"||d === "PA1303"||d === "GA1501"||d === "GA1503"||d === "GA1505"||d === "PA1401"||d === "PA1402"||d === "PA1403") rs = true;
          else rs = false;
         case "PA18":
          if( d === 'PA1801') rs  = false;
      }
      return rs;
    },
    showTable(){
      let scheme_data = this.scheme_data;
      let d = scheme_data.detail_code;
      let t = false
      if(d=='GA1307'){
        t = true
      }
      return t 
    },
    //box3享受/立减
    innerShowDisOrMinus(index){
      let self = this;
      let scheme_data = this.scheme_data;
      let d = scheme_data.detail_code;
      let p = scheme_data.promotionType_code;
      let rs = true;
      switch(p){
        case "GA14":
          if(d==="GA1402" || d === "GA1410"){
            rs = true;
          }else {
            rs = false;
          }
          break;
        case "GA17":
          if(d==="GA1703"){
            rs = false;
          }
          break;
        case "GA18":
          if(d==="GA1803"){
            rs = false;
          }
          break;
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
          if(d==="GA1203"||d==="GA1303" || d=="GA1307") rs = false;
          else rs=true;
          break;
        case "GA14":
            rs = false;
          break;
        case "GA15":
        case "PA14":
          // if (d.indexOf("all-") >= 0) rs = true;
          if (d === "GA1401"||d === "GA1403"||d === "PA1301"||d === "PA1303"||d === "GA1501"||d === "GA1503"||d === "GA1505"||d === "PA1401"||d === "PA1402"||d === "PA1403") rs = true;
          else rs = false;
          break;
        case "GA16":
          if(d==="GA1602") rs=false;
          break;
        // case "GA14":
        case "PA13":
          rs = false;
          break;
        case "PA18":
          if( d === 'PA1801') rs  = false;
      }
      return rs;
    },
    //增加和删除按钮
    masterShowAddOrDeleteRow(index){
      let self = this;
      let scheme_data = self.scheme_data;
      let rules = self.scheme_data.rules;
      let d = scheme_data.detail_code;
      let t = self.proflagsLeft;
      let rs = false;
      switch (scheme_data.promotionType_code) {
        case "GA17":
          if((d === "GA1703"||d==="GA1702") && index === rules.length-1){
            rs = true;
          } else {
            rs = false;
          }
          break;
        case "GA18":
          if((d === "GA1802"||d==="GA1803") && index === rules.length-1){
            rs = true;
          } else {
            rs = false;
          }
          break;
        case "PA16":
          if(d==="PA1602" && index ===rules.length-1){
            rs = true;
          }
          break;
        case "PA17":
          if(d==="PA1702" && index ===rules.length-1){
            rs = true;
          }
          break;
        case "GA11":
          if((d==="GA1104" ) && index === rules.length-1){
            rs = true;
          }else if(d === "GA1106" && index === t-1){
            rs = true;
          }
          break;
        case "GA13":
          if(d === "GA1306" && index === t-1){
            rs = true;
          }
          break;
      }
      console.log('masterShowAddOrDeleteRow22222',rs)
      return rs;
    },
    //box3增加删除按钮
    innerShowAddOrDeleteRow(index,inneri){
      let self = this;
      let scheme_data = self.scheme_data;
      let p = scheme_data.promotionType_code;
      let d = scheme_data.detail_code
      let rs = false;
      switch(p){
        case "GA17":
          if(inneri === scheme_data.rules[index].discounts.length-1 && d!=="GA1703"){
            rs = true;
          }
          break;
        case "GA18":
          if(inneri === scheme_data.rules[index].discounts.length-1 && d!=="GA1803"){
            rs = true;
          }
          break;
        case "PA16":
          if(inneri === scheme_data.rules[index].discounts.length-1){
            rs = true;
          }
          break;
        case "PA17":
          if(inneri === scheme_data.rules[index].discounts.length-1){
            rs = true;
          }
          break;
      }
      return rs;
    },
    isGrouping(index){
      let self = this;
      let scheme_data = self.scheme_data;
      let p = scheme_data.promotionType_code;
      let d = scheme_data.detail_code
      let rs = false;
      if(d ==='GA1303'&&this.choose_commodity.value13==='Y'){
          rs = true;
      } 
      // if (d ==='GA1410'){
      //     rs = true;
      // }
      return rs;
    },
    isGroupingGA1410(index){
      let self = this;
      let scheme_data = self.scheme_data;
      let p = scheme_data.promotionType_code;
      let d = scheme_data.detail_code
      let rs = false;
      if (d ==='GA1410'){
          rs = true;
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
        case "GA14":
        case "PA11":
          if (
            (scheme_data.detail_code === "GA1102" ||
            scheme_data.detail_code === "GA1105" ||
            scheme_data.detail_code === "PA1102" ||
             scheme_data.detail_code === "PA1104" ||
              scheme_data.detail_code === "GA1103"||
              scheme_data.detail_code === "PA1103"||
              scheme_data.detail_code === 'GA1402'||
              scheme_data.detail_code === 'GA1410'||
              scheme_data.detail_code === 'GA1404'||
              scheme_data.detail_code === 'GA1405'||
              scheme_data.detail_code === 'GA1406') &&
            index === rules.length - 1
          )
            rs = true;
          else if (scheme_data.detail_code === "GA1106" && (index === rules.length-this.proflagsLeft))
            rs = true;
          else rs = false;
          break;
        case "GA13":
        case "GA12":
        case "PA12":
          if ((scheme_data.detail_code === "GA1203"||scheme_data.detail_code === "GA1302"||scheme_data.detail_code === "GA1305"||scheme_data.detail_code === "GA1303"||scheme_data.detail_code === "GA1304"||scheme_data.detail_code === "GA1202"||scheme_data.detail_code === "PA1202") && index === rules.length - 1)
            rs = true;
          else if (scheme_data.detail_code === "GA1306" && (index === rules.length-this.proflagsLeft))
            rs = true;
          else rs = false;
          break;
        case "GA14":
        case "PA13":
           if (((scheme_data.detail_code === "GA1402"||scheme_data.detail_code === "PA1302") ||(scheme_data.detail_code === "GA1404"||scheme_data.detail_code === "PA1304")||scheme_data.detail_code === "GA1410" ) && index === rules.length - 1)
            rs = true;
          else rs = false;
          break;
        case "GA15":
        case "PA14":
          if(index === rules.length - 1&& (d === "GA1401"||d === "GA1403"||d === "PA1301"||d === "PA1303"||d === "GA1501"||d === "GA1503"||d === "GA1505"||d === "PA1401"||d === "PA1402"||d === "PA1403"))
            rs=true;
          else if(index === rules.length -1 && (d==="GA1502"||d==="GA1504"||d==="GA1506"))
            rs = true;
            else
            rs=false;
          break;
        case "GA16":
          if(d==="GA1602" && index===rules.length-1){
            rs=true;
          }
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
    innerShowOutAddOrDeleteRow(index){
      const { scheme_data = {} } = this;
      const { limits = [] } = scheme_data;
      let d=scheme_data.detail_code;
      let rs = false;
      switch (scheme_data.promotionType_code){
        case "GA17":
        case "GA18":
          if(index===limits.length-1 && (d==="GA1703"||d==="GA1803")){
            rs=true;
          }else {
            rs = false;
          }
          break;
      }
      return rs;
    },
    showInstalment(index){
      const { scheme_data = {} } = this;
      const { limits = [] } = scheme_data;
      let d=scheme_data.detail_code;
      let rs = false;
      switch (d){
         case 'PA1801':   //花呗分支
           rs = true;
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
    freeDom(index){
      if (
        (this.scheme_data.program_code === "GA" &&
        this.scheme_data.promotionType_code === "GA11" &&
        this.scheme_data.detail_code === "GA1106")||
        (this.scheme_data.program_code === "GA" &&
        this.scheme_data.promotionType_code === "GA13" &&
        this.scheme_data.detail_code === "GA1306")
      ) {
        return "freeDom";
      }
    },
    freeDomIndex(index){
       if (
        (this.scheme_data.program_code === "GA" &&
        this.scheme_data.promotionType_code === "GA11" &&
        this.scheme_data.detail_code === "GA1106")||
        (this.scheme_data.program_code === "GA" &&
        this.scheme_data.promotionType_code === "GA13" &&
        this.scheme_data.detail_code === "GA1306")
      ) {
        return index !== 0 ? "freeDomIndex" : "";
      }
    },
    freeIndex(index){
      if (
        (this.scheme_data.program_code === "GA" &&
        this.scheme_data.promotionType_code === "GA11" &&
        this.scheme_data.detail_code === "GA1106")||
        (this.scheme_data.program_code === "GA" &&
        this.scheme_data.promotionType_code === "GA13" &&
        this.scheme_data.detail_code === "GA1306")
      ) {
        return index >= this.proflagsLeft ? "freeIndex" : "";
      }
    },
    freeShare(index){
      if (
        this.scheme_data.program_code === "GA" &&
        (this.scheme_data.promotionType_code === "GA11" &&
        this.scheme_data.detail_code === "GA1106")||
        (this.scheme_data.promotionType_code === "GA13" &&
        this.scheme_data.detail_code === "GA1306")
      ) {
        return (index % this.proflagsLeft !==0 && index !==0)? "freeShare" : "";
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
        (this.scheme_data.detail_code === "GA1402"||
        this.scheme_data.detail_code === "GA1410")
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
    incrementClassGa1105(index){
      if(this.scheme_data.program_code === "GA" && this.scheme_data.promotionType_code === "GA11" && this.scheme_data.detail_code === "GA1105"){
        return index !==0 ? (index < this.scheme_data.rules.length-1 ? "incrementClassGA1105" : "incrementClassGA11") : "";
      }
    },
    incrementClassPa1104(index){
      if(this.scheme_data.program_code === "PA" && this.scheme_data.promotionType_code === "PA11" && this.scheme_data.detail_code === "PA1104"){
        return index !==0 ? (index < this.scheme_data.rules.length-1 ? "incrementClassPA1104" : "incrementClassPA11") : "";
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
    minus13(index){
      let t = this.scheme_data.promotionType_code 
      if(t === "GA12"){
        return index !== 0 ? "minus13" : "";
      }
      if(t === "PA12"){
        return index !== 0 ? "minus13_1" : "";
      }
    },
    fpriceClass(index){
      if(this.scheme_data.program_code === "GA" && this.scheme_data.promotionType_code === "GA13" && this.scheme_data.detail_code === "GA1302"){
        return index !== 0 ? "fpriceClass" : "";
      }
      if(this.scheme_data.program_code === "GA" && this.scheme_data.promotionType_code === "GA13"&& this.scheme_data.detail_code === "GA1304"){
           return index !==0 ? (index < this.scheme_data.rules.length-1 ? "fpriceIncrement1" : "fpriceIncrement") : "";
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
    changeGp(val,index){
      const { scheme_data = {} } = this;
      const { rules = [] } = scheme_data;
      rules[index].group_no = val;
    },
    changeGpGA1410(val,index){
      const { scheme_data = {} } = this;
      const { rules = [] } = scheme_data;
      rules[index].discounts[0].group_no = val;
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
    operateData(type,behavior,i,sourceType){
      let self = this;
      let d =this.scheme_data.detail_code
      let routerid = this.$route.query.id
      let comType = this.scheme_data.rules.length/ self.proflagsLeft   //商品折扣自由组合立享有多少个组
      let nowRulesLenghth = self.proflagsLeft * comType
      if(type==="rules"){
         switch(behavior){
            case "insert":
              let obj= {
                // 购买商品
                skuIds: "",
                // 条件名称
                conditionName: this.scheme_data.rules[0].conditionName,
                //conditionName: routerid>0?this.$store.state.scheme_data.rules[0].conditionName:this.$store.state.scheme_dataNew.rules[0].conditionName,
                // 条件类型：大于，等于。。。。
                conditionType: "GE",
                // 条件值
                conditionValue: "",
                // 非组合策略使用的(打折、满减、特价)
                content: 1,
                //赠品、换购范围条件
                prizeItem: "",
                //赠品、换购数量
                prizeNum: "",
                group_no:'0',
                discounts:[
                {
                    content: 1,
                    prizeItem: "",
                    prizeNum: 1,
                    conditionName:'',
                    group_no:'0'
                }
            ]
              };
              if(sourceType === 'fromFreeGroup' && (d === 'GA1106'||d === 'GA1306')){//添加折扣商品自由组合右侧立享
                  if(self.proflagsRight < 10){
                    if(self.proflagsLeft === 1){
                       self.scheme_data.rules.push({skuIds: "",conditionName: this.scheme_data.rules[0].conditionName,conditionType: "GE",
                        conditionValue: "",content: 1,prizeItem: "",prizeNum: "",mustBuy:false,group_no:'0',
                        discounts:[{content: 1,prizeItem: "",prizeNum: 1,conditionName:''}]});
                    }else{
                       for(let i = 0; i < self.proflagsLeft ;i++){
                            self.scheme_data.rules.push({skuIds: "",conditionName: this.scheme_data.rules[0].conditionName,conditionType: "GE",
                            conditionValue: "",content: 1,prizeItem: "",prizeNum: "",mustBuy:false,group_no:'0',
                            discounts:[{content: 1,prizeItem: "",prizeNum: 1,conditionName:''}]})
                        }
                    }
                    self.proflagsRight++;
                  }else{
                    this.$Message.warning('条数超限');
                  }
                  //console.log('self.scheme_data.rules--------++',self.scheme_data.rules)
                }else if(!sourceType && (d === 'GA1106'||d === 'GA1306')){//添加折扣商品自由组合左侧分类商品
                  if(self.proflagsLeft < 10){
                    if(self.proflagsRight ===1){
                      self.scheme_data.rules.push({skuIds: "",conditionName: this.scheme_data.rules[0].conditionName,conditionType: "GE",
                        conditionValue: "",content: 1,prizeItem: "",prizeNum: "",mustBuy:false,group_no:'0',
                        discounts:[{content: 1,prizeItem: "",prizeNum: 1,conditionName:''}]});
                        self.proflagsLeft++;
                  }else{
                    for(let i = 1;  i < self.proflagsRight +1;i++){
                        let index;
                      if(i === 1){
                            index = self.proflagsLeft*i;
                      }else{
                          index = self.proflagsLeft*i + i - 1 ;
                      }
                      self.scheme_data.rules.splice(index , 0 , {skuIds: "",conditionName: this.scheme_data.rules[0].conditionName,conditionType: "GE",
                      conditionValue: "",content: 1,prizeItem: "",prizeNum: "",mustBuy:false,group_no:'0',
                      discounts:[{content: 1,prizeItem: "",prizeNum: 1,conditionName:''}]});
                      //console.log('self.scheme_data.rule------',self.scheme_data.rules);
                    }
                      self.proflagsLeft++;
                    }
                  }else{
                     self.$Message.warning('条数超限');
                  }
                    //console.log('self.scheme_data.rules------+',self.scheme_data.rules)
                    //console.log('self.scheme_data------+',self.scheme_data)
                }else{//除了商品折扣自由组合其他的促销
                  if(this.scheme_data.rules.length <10){
                    this.scheme_data.rules.push(obj);
                  }else {
                    this.$Message.warning('条数超限');
                  }
               }
              break;
            case  "delete":
              if(sourceType === 'fromFreeGroup' && (d === 'GA1106'||d === 'GA1306')){//删除折扣商品自由组合右侧立享
                for(let i = 0; i < self.proflagsLeft ;i++){
                  self.scheme_data.rules.splice((self.scheme_data.rules.length)-1,1)
                }
                self.proflagsRight--;
              }else if(!sourceType && (d === 'GA1106'||d === 'GA1306')){//删除折扣商品自由组合左侧商品类
                  for(let i = 1;  i < self.proflagsRight + 1;i++){
                    let index;
                    if(i === 1){
                          index = self.proflagsLeft*i -1;
                    }else{
                        index = self.proflagsLeft*i - i;
                    }
                    //console.log('aaaaaa------===',index,self.proflagsLeft);
                    self.scheme_data.rules.splice(index , 1);
                  }
                  self.proflagsLeft--;
              }else{//除了商品折扣自由组合其他的促销
                this.scheme_data.rules.pop();
              }
         }
      }else if(type==="innerRules"){
        switch(behavior){
          case "insert":
            let obj = {
                    content: 1,
                    prizeItem: "",
                    prizeNum: 1,
                    stock: ''
                }
            if(this.scheme_data.rules[i].discounts.length<10){
              this.scheme_data.rules[i].discounts.push(obj);
            }else {
              this.$Message.warning('条数超限');
            }
            break;
          case "delete":
            this.scheme_data.rules[i].discounts.pop();
            break;
        }
      }else{
         switch(behavior){
            case "insert":
              let obj={
                content: "1",
                skusId: "",
                skusNum: 1
              };
              if(this.scheme_data.limits.length<10){
                this.scheme_data.limits.push(obj);
              }else {
                this.$Message.warning('条数超限');
              }
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
    PA1602(index){
      if(this.scheme_data.promotionType_code === "PA16" && this.scheme_data.detail_code==="PA1602" && index >0){
        return "PA1602_margin_left"
      }
    },
    GA1702(index){
      if(this.scheme_data.promotionType_code === "GA17" && this.scheme_data.detail_code ==="GA1702" && index >0){
        return "GA1702_margin_left"
      }
    },
    GA1802(index){
      if(this.scheme_data.promotionType_code === "GA18" && this.scheme_data.detail_code ==="GA1802" && index >0){
        return "GA1802_margin_left"
      }
    },
    GA1803(index){
      if(this.scheme_data.promotionType_code === "GA18" && this.scheme_data.detail_code ==="GA1803" && index >0){
        return "GA1803_margin_left"
      }
    },
    PA1702(index){
      if(this.scheme_data.promotionType_code === "PA17" && this.scheme_data.detail_code ==="PA1702" && index >0){
        return "PA1702_margin_left"
      }
    },
    GA1410(index){
      if(this.scheme_data.promotionType_code === "GA14" && this.scheme_data.detail_code ==="GA1410" && index >0){
        return "GA1410_margin_left"
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
   width: 100%;
  div{
    box-sizing: border-box;
  }
  padding: 20px 0px;
  font-size: 12px;
  //overflow-y: auto;
  .dis_and_style {
    color: red;
    height: 24px;
    line-height: 24px;
    margin-left: 20px;
  }
  .fur_1 {
    .box {
      display:flex;
      flex-wrap: wrap;
    }
  
  height: 100%;
  // padding-top: 50px;
    .limit {
      display: flex;
      margin-bottom: 8px;
      // margin-left: 41px;
    }
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


//商品折扣：自由组合
.freeDom{
  .box1{
    .propdis1{
      padding-right:30px;
      padding-left:20px;
      .item-input{
        label.title{
          //width:125px;
        }
      }
    }
    //.propdis1{padding-right:30px;}
    .propdisBB{
      position:absolute;
      left:290px;
    }
  }

}
.freeDomIndex{
  //padding-left:270px;
  .box1{
    .propdis2{
      padding-left:110px;
    }
  }
}
.freeIndex{
  .box1{
    .propdis2{
      padding-left:415px;
    }
  }
}
.freeShare{
  .box2{
    padding-left:268px;
  }
}
//动态添加类
//商品-折扣-多种折扣
.multipleClass {
  padding-left: 328px;
}

//商品-折扣-递增折扣
.incrementClass {
  margin-left: 800px;
}
.incrementClass1 {
  margin-left: 824px;
}

//商品-买赠-梯度送赠品
.gradeGiftClass {
  margin-left: 329px;
}

//商品-打折-组合折扣
.combineClass {
  margin-left: 0px;
}

//商品-减现-梯度减现
.minusClass {
  margin-left: 328px;
}

//商品-特价-梯度特价
.fpriceClass {
  margin-left: 328px;
}

.fpriceIncrement{
   margin-left: 550px;
}
.fpriceIncrement1{
   margin-left: 575px;
}

//商品-买赠-梯度送券
.gradeCouponClass {
  margin-left:325px ;//436px
}

//商品-换购-统一换购+特价换购
.allFprice {
  margin-left: 552px;
}

//商品-换购-统一换购+打折换购
.allDis {
   margin-left: 552px;
}

//商品-换购-统一换购+优惠换购
.allMinus {
   margin-left: 552px;
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
  margin-left: 660px;
}
.globalIncrement1 {
  margin-left: 684px;
}

//全场-换购
.globalChange {
  margin-left: 660px;
}


.testdata {
  width: 200px;
}



// 调试样式



.box1 {
  display: flex;
  // width: 665px;
  margin-top: 2px;
  margin-right: -45px;
  margin-bottom: 8px;
}

.box2 {
  display:flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  position: relative;
  margin-left: 39px;
  margin-top: 2px;
  margin-bottom: 8px;
}

.box3 {
  display:flex;
}

//全场-买免
.freeClass {
  margin-left: 25px;
}

.boxMultip {
  margin-left: 344px;
  padding-left:100px;
}

//以下为动态修改box样式
.discount12 {
    // width: 164px;
    // padding-left: 26px;
    width: 167px;
    padding-left: 23px;
}
.discount13 {
  width: 75px;
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
.minus13{
   padding-left:320px;
}
.minus13_1{
   padding-left:80px;
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
    margin-right:60px;
}
.discount23 {
  height: 1px;
  width:85px;
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
  //width: 500px;
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
.PA1602_margin_left {
  margin-left: 455px;
}
.GA1702_margin_left {
  margin-left: 498px;
}
.GA1802_margin_left {
  margin-left: 760px;
}
.GA1803_margin_left {
  margin-left: 262px
}
.PA1702_margin_left{
  margin-left: 716px
}
.GA1410_margin_left{
margin-left: 262px
}
.incrementClassGA11{
  margin-left: 938px;
}
.incrementClassGA1105{
  margin-left: 938px;
}
.incrementClassPA11{
  margin-left: 806px;
}
.incrementClassPA1104{
  margin-left: 806px;
}
}
</style>

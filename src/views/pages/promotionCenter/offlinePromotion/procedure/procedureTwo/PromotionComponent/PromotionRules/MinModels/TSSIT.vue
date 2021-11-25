<template>
  <!--TMT
    descript:组件之一,用来表示条件（数量、金额）比较大小
    author:wdq
    date:20180816
  -->
  <div class="propdis2">
    <p style="text-align: right">{{showDescription}}</p>
    <el-select  v-model=rule.conditionName   placeholder="请选择"  v-if="showCompareNames" @change="changeUnit">
      <el-option
        v-for="item in CompareNames"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <el-select  v-model=rule.conditionType   placeholder="请选择" v-if="showCompareTypes">
      <el-option
        v-for="item in CompareTypes"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <input type="text" v-model="rule.conditionValue"  class="input-number"
     oninput = "this.value= this.value.match(/\d+(\.\d{0,2})?/) ? this.value.match(/\d+(\.\d{0,2})?/)[0] : ''"
     onfocus="this.select()"
     maxlength="5"/>
    <p>{{showDescription2}}</p>
  </div>
</template>
<script>
import myInput from "framework/components/element/input";
export default {
  props: ["rule","index", "scheme_data"],
  data() {
    return {
      CompareNames: [
        {
          value: "QTTY",
          label: "数量"
        },
        // {
        //   value: "AMT_LIST",
        //   label: "吊牌金额"
        // },
        // {
        //   value: "AMT_RETAIL",
        //   label: "零售金额"
        // },
        {
          value: "AMT_RECEIVABLE",
          label: "应收金额"
        },
      ],
      CompareTypes: [
        {
          value: "GE",
          label: "大于等于"
        },
        {
          value: "G",
          label: "大于"
        },
        {
          value: "E",
          label: "等于"
        }
      ],
      //isChangeALLUnit:false,  //是否切换所有的计件（价）单位
     };
  },
  computed: {
    //是否显示比较方式
    showCompareNames() {
      let p = this.scheme_data.program_code;
      let t = this.scheme_data.promotionType_code;
      let detail_code = this.scheme_data.detail_code;
      let rs=true;
      if ((p == "GA"  && t == "GA16")|| t == "PA15") rs=false;
      if (
        detail_code == "GA1102" ||detail_code == "PA1102" ||detail_code == "GA1202" ||detail_code == "PA1202" ||detail_code == "GA1302" ||
         (detail_code == "GA1402"&& p=="GA")||
        (detail_code == "GA1404"||detail_code == "PA1304"||detail_code=="PA1302")
      ) {
        rs=this.index == 0;
      }
      //如果当前项隐藏且行下标大于1改变父亲组件的改变所有计价单位的标识
      if(!rs&&this.index>0) this.changeUnitAllFlag(true);
      return rs;
    },
    //是否显示比较条件
    showCompareTypes() {
      let p = this.scheme_data.program_code;
      let t = this.scheme_data.promotionType_code;
       if ((p == "GA"  && t == "GA16")|| t == "PA15") return false;
      return true;
    },
    showDescription() {
      let p = this.scheme_data.program_code;
      let t = this.scheme_data.promotionType_code;
      let detail_code = this.scheme_data.detail_code;
      if (t == "GA16"||t=="PA15") return "立享满";
      if (
        (detail_code == "GA1102" ||detail_code == "PA1102" ||detail_code == "GA1202" ||detail_code == "PA1202" ||detail_code == "GA1302" ||
          (detail_code == "GA1402"&& p=="GA") ||
          (detail_code == "GA1404"||detail_code == "PA1304"||detail_code == "PA1302")) &&
        this.index != 0
      ) {
        return "";
      }
      return "满足";
    },
    showDescription2() {
      let c_name=this.rule.conditionName;
      // this.rule.conditionValue = "";
      return   c_name=="QTTY"?"件":"元";
    }

  },
  methods:{
    changeUnit(){
      let val=this.rule.conditionName;
      this.$emit("changeAll",val);
      this.rule.conditionValue = "";
    },
    //是否改变所有标记
    changeUnitAllFlag(val){
      this.$emit("changeUnitAllFlag",val);
    },
  },
  components: {
    myInput
  },
  mounted(){
    this.CompareNames = this.scheme_data.promotionType_code==='GA13'? [{value: "QTTY", label: "数量"}]:[{value: "QTTY", label: "数量"},
    // {value: "AMT_LIST", label: "吊牌金额"},
    //   {
    //     value: "AMT_RETAIL",
    //     label: "零售金额"
    //   },
      {
        value: "AMT_RECEIVABLE",
        label: "应收金额"
      },
    ]
  }
};
</script>
<style  lang="less">
.propdis2 {
  // float: left;
  // flex: 1;
  display: flex;
  align-items: center;
  font-size: 12px;
  // width: 40%;
  margin: 0px 15px;
  .el-select {
    input {
      width: 80px;
      height: 24px;
      line-height: 24px;
      padding: 0 3px;
    }
  }
  input {
    width: 60px;
    height: 24px;
    border-radius: 2px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    border: 1px solid #d8d8d8;
    padding-left: 3px;
    margin: 0 2px;
  }
  .input-number{
    text-align: center;
  }
}
</style>

<template>
  <!--TMT
    descript:组件之一,用来表示全场的条件比较
    author:wdq
    date:20180816
  -->
  <div class="propdis7">
    <!-- <p>{{showDescription}}</p> -->
    <p v-html="showDescription"></p>
    <el-select  v-model=rule.preConditionName  placeholder="请选择"  v-if="showCompareNames">
      <el-option
        v-for="item in CompareNames"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <el-select  v-model=rule.preConditionType   placeholder="请选择" v-if="showCompareTypes">
      <el-option
        v-for="item in CompareTypes"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <input type="text"  v-model=rule.preConditionValue  
     onfocus="this.select()"
     oninput = "this.value= this.value.match(/\d+(\.\d{0,2})?/) ? this.value.match(/\d+(\.\d{0,2})?/)[0] : ''" maxlength="5"/>
    <p>{{showDescription2}}</p>
  </div>
</template>
<script>
import myInput from 'framework/components/element/input';
export default {
  model: {
    prop: "value",
    event: "change"
  },
  props: ["rule", "value", "index", "scheme_data"],
  data() {
    return {
      CompareNames: [
        {
          value: "DISCOUNT",
          label: "折扣"
        },
        {
          value: "AMT_RECEIVABLE",
          label: "应收价"
        }
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
      ]
    };
  },
  computed: {
    //是否显示比较方式
    showCompareNames() {
      let p = this.scheme_data.program_code;
      let t = this.scheme_data.promotionType_code;
      let detail_code = this.scheme_data.detail_code;
      if (p == "GA"  && t == "GA16") return false;
      if (
        detail_code == "GA1102" ||detail_code == "PA1102" ||detail_code == "GA1202" ||detail_code == "PA1202" ||detail_code == "GA1302" ||
        detail_code == "GA1404"||detail_code == "PA1304"||t=="GA11"||t=="PA11"
      ) {
        return this.index == 0;
      }
      return true;
    },
    //是否显示比较条件
    showCompareTypes() {
      let p = this.scheme_data.program_code;
      let t = this.scheme_data.promotionType_code;
      if (p == "GA"  && t == "GA16") return false;
      return true;
    },
    showDescription() {
       return "<span class='red'>*</span> 全场:";
    },
    showDescription2() {
      return "的商品，";
    }
  },
  components: {
    myInput
  }
};
</script>
<style  lang="less">
.propdis7 {
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
      background: #fcf7f1;
      font-size: 12px;
    }
  }
  .red{
    color:red;
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
    background: #fcf7f1;
    font-size: 12px;
  }
}
</style>
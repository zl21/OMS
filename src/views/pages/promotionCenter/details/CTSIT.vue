<template>
  <!--TMT
    descript:CheckBox + Desc + Select + Input + Desc ,用来表示条件（数量、金额）比较大小
    author:wdq
    date:20200312
  -->
  <div class="proodis_cisit">
    <Checkbox
      v-if="!(rule.show === false)"
      v-model="rule.check"
    />
    <p style="text-align: right">
      {{ showDescription }}
    </p>
    <el-select
      v-model="rule.type"
      placeholder="请选择"
    >
      <el-option
        v-for="item in CompareTypes"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <input
      v-model="rule.value"
      type="text"
      class="input-number"
      oninput="this.value= this.value.match(/\d+(\.\d{0,2})?/) ? this.value.match(/\d+(\.\d{0,2})?/)[0] : ''"
      onfocus="this.select()"
      maxlength="8"
    >
    <p class="desc2">
      {{ showDescription2 }}
    </p>
    <SingleBox
      v-if="filterPdtWayShow"
      :value="rule.filterPdtWay"
      :options="groups.diffFilterPdts"
      @changeSingle="checkFilterPdtWayChange"
    />
  </div>
</template>
<script>
  import CTSIT from "@/js/pages/promotionCenter/details/CTSIT.js";
  export default CTSIT;
</script>
<style  lang="less">
.proodis_cisit {
  // float: left;
  // flex: 1;
  display: flex;
  align-items: center;
  font-size: 12px;
  // width: 40%;
  margin: 0px 0px 12px  0px;
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
  .desc2{
    padding-right:10px ;
  }
}
</style>

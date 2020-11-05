<template>
  <!--TMT
    descript:CheckBox + Desc + Select + Input + Desc ,用来表示条件（数量、金额）比较大小
    author:wdq
    date:20200312
  -->
  <div class="proodis_cisit">
    <Checkbox v-model="rule.check"  v-if="!(rule.show === false)"></Checkbox>
    <p style="text-align: right">{{showDescription}}</p>
    <el-select  v-model="rule.type"   placeholder="请选择" >
      <el-option
        v-for="item in CompareTypes"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <input type="text" v-model="rule.value"  class="input-number"
     oninput = "this.value= this.value.match(/\d+(\.\d{0,2})?/) ? this.value.match(/\d+(\.\d{0,2})?/)[0] : ''"
     onfocus="this.select()"
     maxlength="8"/>
    <p class="desc2">{{showDescription2}}</p>
    <SingleBox v-if="filterPdtWayShow"
        :value="rule.filterPdtWay"
        :options="groups.diffFilterPdts"
        @changeSingle="checkFilterPdtWayChange"
      ></SingleBox>
       <SingleBox v-if="amoutStyleShow"
        :value="rule.amount_style"
        :options="groups.diffFilter"
        @changeSingle="filterOPtWayChange"
      ></SingleBox>
  </div>
</template>
<script>
  import CTSIT from '@/js/pages/promotionCenter/details/CTSIT.js';
  export default CTSIT;
</script>
<style  lang="less">
@import "~@/css/pages/promotionCenter/details/CTSIT.less";
</style>

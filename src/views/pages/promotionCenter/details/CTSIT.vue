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
  import CTSIT from '@/js/pages/promotionCenter/details/CTSIT.js';

  export default CTSIT;
</script>
<style  lang="less">
@import "~@/css/pages/promotionCenter/details/CTSIT.less";
</style>

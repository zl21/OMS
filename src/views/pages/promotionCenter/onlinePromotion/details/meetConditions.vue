<template>
  <!--TMT
    复现：新增/详情/批量新增--条件信息-搭配商品/满足条件
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
    <SingleBox
      v-if="amoutStyleShow"
      :value="rule.amount_style"
      :options="groups.diffFilter"
      @changeSingle="filterOPtWayChange"
    />
  </div>
</template>
<script>
  import meetConditions from '@/js/pages/promotionCenter/details/meetConditions';

  export default meetConditions;
</script>

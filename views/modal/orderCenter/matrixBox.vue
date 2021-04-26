<!-- 矩阵公共弹框 -->
<template>
  <!-- <matrix
    :edit="true"
    :objid="componentData.objid"
    :selectItem="componentData.selectItem"
    :objList="componentData.objList"
    :encode="activeObj.PS_C_PRO_ECODE"
    :tablename="tablename"
    :loading="loading"
    :matchTableData="matchTableData"
    :isdisabled="isdisabled"
    :isActive="isActive"
    @enterSave="enterSave"
    @loadChange="loadChange"
    @amendData="amendData"
    @inputFocus="inputFocus"
    ref="matrixOne"
  ></matrix>-->
  <!--
    objid: 单据id
    encode： 条码/编码
    tablename： 表名
    distribIds：仓库id
  -->
  <matrix
    ref="matrixOne"
    :edit="true"
    :general="true"
    :isdisabled="false"
    :is-active="true"
    :is-stock-btn="false"
    :objid="componentData.objid"
    :encode="componentData.encode"
    :tablename="componentData.tablename"
    :distrib-ids="componentData.distribIds"
    :return-type="componentData.returnType"
    :name-join="componentData.nameJoin"
    @inputFocus="inputFocus"
    @enterSave="enterSave"
    @loadChange="loadChange"
    @amendData="amendData"
    @confirmOk="confirmOk"
    @refreshData="refreshData"
  />
</template>

<script>
  import matrixBox from '@/js/modal/orderCenter/matrixBox';

  export default matrixBox;
</script>

<style scoped lang='less'>
  @import "~@/css/modal/orderCenter/matrixBox.less";
</style>

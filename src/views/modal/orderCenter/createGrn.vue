<template>
  <div
    class="semiCustomModal"
    style="width: 400px;"
  >
    <div class="Modal-Form">
      <p v-if="isError">
        {{ errorMessage }}
      </p>
      <div class="Modal-Form-Item">
        <!-- 档期日程归属 -->
        <label>{{ vmI18n.t("form_label.scheduleOwnership") }}:</label>
        <DropDownSelectFilter
          :single="true"
          :data="datas"
          :auto-data="autoData"
          :columns="columns"
          :default-selected="defaultSelected"
          @on-fkrp-selected="fkrpSelected"
          @on-clear="clear"
        />
      </div>
      <div class="Modal-Form-Item">
        <!--  运输方式 -->
        <label>{{ vmI18n.t("form_label.transportationMode") }}:</label>
        <Input
          v-model="transportStyle.text"
          disabled
        />
      </div>
    </div>

    <businessButton :btn-config="btnConfig" />
  </div>
</template>
<script>
  import createGrn from '@/js/modal/orderCenter/createGrn';

  export default createGrn;
</script>

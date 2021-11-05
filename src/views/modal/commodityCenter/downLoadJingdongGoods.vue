<template>
  <div class="customized-modal" style="width:440px;">
    <businessForm :form-config="downLoadFormConfig" />
    <div class="timeBox">
      <!-- 修改时间 -->
      <label>{{ vmI18n.t('table_label.modificationTime') }}:</label>
      <el-date-picker
        v-model="timeConfig.data"
        :default-time="timeConfig.config.defaultTime"
        :end-placeholder="vmI18n.t('common.endDate')"
        :format="timeConfig.config.format"
        :picker-options="timeConfig.config.pickerOptions"
        :range-separator="vmI18n.t('common.to')"
        :start-placeholder="vmI18n.t('common.startDate')"
        :unlink-panels="true"
        :value-format="timeConfig.config.valueFormat"
        class="timeBox-input"
        type="datetimerange"
        @focus="monthSearchStartDate = null"
      />
    </div>
    <OmsButton class="modal-footer" :btn-config="buttonConfig" />
  </div>
</template>

<script>
  import downLoadJingdongGoods from '@/js/modal/commodityCenter/downLoadJingdongGoods';

  export default downLoadJingdongGoods;
</script>

<style lang="less" scoped>
  @import "~@/css/modal/commodityCenter/downLoadJingdongGoods.less";
</style>

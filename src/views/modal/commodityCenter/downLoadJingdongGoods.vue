<template>
  <div style="width:440px;padding-right:20px">
    <businessForm :formConfig="downLoadFormConfig"></businessForm>
    <div class="timeBox">
      <!-- 修改时间 -->
      <label>{{vmI18n.t('table_label.modificationTime')}}:</label>
      <el-date-picker
        :default-time="timeConfig.config.defaultTime"
        :end-placeholder="vmI18n.t('common.endDate')"
        :format="timeConfig.config.format"
        :picker-options="timeConfig.config.pickerOptions"
        :range-separator="vmI18n.t('common.to')"
        :start-placeholder="vmI18n.t('common.startDate')"
        :unlink-panels="true"
        :value-format="timeConfig.config.valueFormat"
        @focus="monthSearchStartDate = null"
        class="timeBox-input"
        type="datetimerange"
        v-model="timeConfig.data"
      >
      </el-date-picker>
    </div>
    <div class="dialog-footer">
      <!-- 确定 -->
      <Button @click="download" ghost size="small" type="primary">
        {{vmI18n.t('btn.determine')}}
      </Button>
      <!-- 取消 -->
      <Button
        @click="
          () => {
            this.$emit('closeActionDialog');
          }
        "
        ghost
        size="small"
        type="error"
      >{{vmI18n.t('btn.cacel')}}
      </Button
      >
    </div>
  </div>
</template>

<script>
  import downLoadJingdongGoods from "@/js/modal/commodityCenter/downLoadJingdongGoods";

  export default downLoadJingdongGoods;
</script>

<style lang="less" scoped>
  @import "~@/css/modal/commodityCenter/downLoadJingdongGoods.less";
</style>

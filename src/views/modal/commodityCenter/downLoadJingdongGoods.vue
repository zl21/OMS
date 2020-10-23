<template>
  <div style="width:440px;padding-right:20px">
    <businessForm :formConfig="downLoadFormConfig"></businessForm>
    <div class="timeBox">
      <!-- 修改时间 -->
      <label>{{vmI18n.t('table_label.modificationTime')}}:</label>
      <el-date-picker
        class="timeBox-input"
        v-model="timeConfig.data"
        type="datetimerange"
        :range-separator="vmI18n.t('common.to')"
        :start-placeholder="vmI18n.t('common.startDate')"
        :end-placeholder="vmI18n.t('common.endDate')"
        :unlink-panels="true"
        :format="timeConfig.config.format"
        :value-format="timeConfig.config.valueFormat"
        :default-time="timeConfig.config.defaultTime"
        :picker-options="timeConfig.config.pickerOptions"
        @focus="monthSearchStartDate = null"
      >
      </el-date-picker>
    </div>
    <div class="dialog-footer">
      <!-- 确定 -->
      <Button type="primary" ghost size="small" @click="download">
        {{vmI18n.t('btn.determine')}}
      </Button>
      <!-- 取消 -->
       <Button
        type="error"
        ghost
        size="small"
        @click="
          () => {
            this.$emit('closeActionDialog');
          }
        "
        >{{vmI18n.t('btn.cacel')}}</Button
      >
    </div>
  </div>
</template>

<script>
  import downLoadJingdongGoods from "@/js/modal/commodityCenter/downLoadJingdongGoods";
  export default downLoadJingdongGoods;
</script>

<style lang="less" scoped>
.timeBox {
  display: flex;
  width: 100%;
  // padding-right: 28px;
  align-items: center;
  height: 30px;
  margin-bottom: 10px;
  box-sizing: border-box;
  > label {
    width: 100px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    padding: 10px 4px 10px 0;
    text-align: right;
  }
  /deep/ .timeBox-input {
    flex: 1;
    max-width: calc(100% - 100px);
    .el-range-input {
      width: 44%;
      font-size: 12px;
    }
    .el-range-separator {
      width: auto !important;
      line-height: 18px !important;
      font-size: 12px;
    }
  }
}
/deep/ .orderManageEdit .jordanForm_a {
  padding-bottom: 0;
}
</style>

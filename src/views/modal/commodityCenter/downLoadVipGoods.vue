<template>
  <div style="width:400px;padding-right:15px">
    <businessForm :formConfig="formConfig"></businessForm>
    <div class="dialog-footer">
      <!-- 确定 -->
      <Button type="primary" ghost size="small" @click="confirmChange">{{vmI18n.t('btn.determine')}}</Button>
        <!-- 取消 -->
        <Button
        type="error"
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
  import downLoadVipGoods from "@/js/modal/commodityCenter/downLoadVipGoods";
  export default downLoadVipGoods;
</script>

<style></style>

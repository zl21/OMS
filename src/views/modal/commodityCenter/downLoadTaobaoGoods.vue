<template>
  <div style="width:430px;padding-right:20px">
    <businessForm :form-config="downLoadTaobaoGoodsFormConfig" />
    <div class="dialog-footer">
      <!-- 确定 -->
      <Button
        type="primary"
        ghost
        @click="download"
      >
        {{ vmI18n.t('common.determine') }}
      </Button>
      <!-- 取消 -->
      <Button
        type="error"
        ghost
        @click="
          () => {
            this.$emit('closeActionDialog');
          }
        "
      >
        {{ vmI18n.t('common.cancel') }}
      </Button>
    </div>
  </div>
</template>

<script>
  import downLoadTaobaoGoods from '@/js/modal/commodityCenter/downLoadTaobaoGoods';

  export default downLoadTaobaoGoods;
</script>

<style></style>

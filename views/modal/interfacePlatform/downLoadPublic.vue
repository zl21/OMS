<template>
  <div
    class="public"
    style="width: 400px;"
  >
    <businessForm :form-config="pulicdownLoadConfig">
      <template #compile="{ rowData }">
        <div
          class="import-box"
          @click="importBoxOpen(rowData.item)"
        >
          <!-- 导入 -->
          [{{ vmI18n.t("btn.import") }}]
        </div>
      </template>
    </businessForm>
    <!-- footer -->
    <businessButton :btn-config="downLoadBtnConfig" />

    <businessDialog
      ref="dialog"
      :title="dialogConfig.title"
      :component-data="dialogConfig.componentData"
      :name="dialogConfig.name"
      :url="dialogConfig.url"
      :width="dialogConfig.width"
    />
  </div>
</template>

<script>
  import downLoadPublic from '@/js/modal/interfacePlatform/downLoadPublic';

  export default downLoadPublic;
</script>

<style lang="less">
  @import "~@/css/modal/interfacePlatform/downLoadPublic.less";
</style>

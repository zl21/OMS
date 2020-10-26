<template>
  <div class="public" style="width: 400px; padding-right: 20px">
    <businessForm :formConfig="pulicdownLoadConfig">
      <template #compile="{ rowData }">
        <div class="import-box" @click="importBoxOpen(rowData.item)">
          <!-- 导入 -->
          [{{ vmI18n.t("btn.import") }}]
        </div>
      </template>
    </businessForm>
    <div class="dialog-footer">
      <!-- 确定 -->
      <Button type="primary" @click="downloadPublicAll">{{
        vmI18n.t("common.determine")
      }}</Button>
      <Button
        type="error"
        ghost
        @click="
          () => {
            this.$emit('closeActionDialog');
          }
        "
        >{{ vmI18n.t("common.cancel") }}</Button
      >
    </div>
    <jordan-dialog
      ref="dialog"
      :title="dialogConfig.title"
      :componentData="dialogConfig.componentData"
      :name="dialogConfig.name"
      :url="dialogConfig.url"
      :width="dialogConfig.width"
    />
  </div>
</template>

<script>
  import downLoadPublic from "@/js/modal/InterfacePlatform/downLoadPublic";
  export default downLoadPublic;
</script>

<style lang="less">
  @import "~@/css/modal/InterfacePlatform/downLoadPublic.less";
</style>

<template>
  <div class="copyModal">
    <Modal
      v-model="copyModal"
      width="360"
      :mask="true"
    >
      <p
        slot="header"
        style="color:black;font-size:13px;text-align:center"
      >
        <span>复制权限</span>
      </p>
      <div style="text-align:center;">
        <FormLayout
          ref="FormLayout"
          :default-column="defaultColumn"
          :defaultconfig="config"
        />
      </div>
      <div slot="footer">
        <Button
          type="fcdefault"
          size="small"
          @click="sureBtn"
        >
          确定
        </Button>
        <Button
          type="fcdefault"
          size="small"
          @click="cancelBtn"
        >
          取消
        </Button>
      </div>
    </Modal>
  </div>
</template>
<script>
  import copyModal from '@/js/pages/systemConfig/quanXian/copyModal';

  export default copyModal;
</script>
<style lang="less">
  @import "~@/css/pages/systemConfig/quanXian/copyModal.less";
</style>

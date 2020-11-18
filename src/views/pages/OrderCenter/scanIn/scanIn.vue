<template>
  <div class="scanIn">
    <!-- 按钮 -->
    <div class="scan_button">
      <businessButton :btn-config="btnConfig" />
    </div>
    <!-- 高级搜索 -->
    <div class="scan_search">
      <IntegrateSearchFilter v-model="searchValue" :drop-down-list="dropList" :is-search-item-show="false" :search-method="searchMethod" />
    </div>
    <!-- 扫描信息 -->
    <div class="scan_info">
      <div class="titles">
        <Icon size="18" style="margin-right: 5px" type="md-paper" />
        {{ vmI18n.t('panel_label.scanInfo') }}
      </div>
      <businessForm :form-config="formConfig1" />
    </div>
    <!-- 录入信息 -->
    <div class="scan_logg">
      <div class="titles">
        <Icon size="18" style="margin-right: 5px" type="md-paper" />
        {{ vmI18n.t('panel_label.enterInfo') }}
      </div>
      <businessForm :form-config="formConfig2" />
    </div>
    <!-- 特殊处理 -->
    <div class="scan_special">
      <businessForm :form-config="formConfig3" />
    </div>
    <!-- 扫描明细 -->
    <div class="scan_details">
      <div class="titles">
        <Icon size="18" style="margin-right: 5px" type="md-paper" />
        {{ vmI18n.t('panel_label.scanDetails') }}
      </div>
      <businessActionTable :jordan-table-config="jordanTableConfig" @on-row-click="onRowClick" />
    </div>
    <!-- 退换货信息 -->
    <div class="scan_returngood">
      <div class="titles">
        <Icon size="18" style="margin-right: 5px" type="md-paper" />
        {{ vmI18n.t('panel_label.returnAndExchange_info') }}
      </div>
      <businessForm :form-config="formConfig4" />
    </div>
    <!-- 弹框 -->
    <div class="dilog">
      <businessDialog
        :closable="changeWarehouseConfig.closable"
        :component-data="changeWarehouseConfig.componentData"
        :draggable="changeWarehouseConfig.draggable"
        :exclude-string="changeWarehouseConfig.excludeString"
        :keep-alive="changeWarehouseConfig.keepAlive"
        :mask="changeWarehouseConfig.mask"
        :mask-closable="changeWarehouseConfig.maskClosable"
        :name="changeWarehouseConfig.name"
        :scrollable="changeWarehouseConfig.scrollable"
        :title="changeWarehouseConfig.confirmTitle"
        :title-align="changeWarehouseConfig.titleAlign"
        :transfer="changeWarehouseConfig.transfer"
        :url="changeWarehouseConfig.url"
        :width="changeWarehouseConfig.width"
      />
    </div>
    <!-- 扫描发出条码无对应明细时提示弹框 -->
    <Modal v-model="isModal" :title="vmI18n.t('modalTitle.tips')" @on-cancel="cancel1" @on-keydown="keydown1" @on-ok="ok1">
      <!-- 条码不在列表中,是否继续添加? -->
      <p>{{ vmI18n.t('modalTips.h4') }}</p>
    </Modal>
    <!-- 退货单无头件提示 -->
    <Modal v-model="isModal2" :title="vmI18n.t('modalTitle.tips')" @on-cancel="cancel2" @on-keydown="keydown2" @on-ok="ok2">
      <!-- 未能匹配相应的退换货单，是否继续? -->
      <p>{{ vmI18n.t('modalTips.h5') }}</p>
    </Modal>
    <!-- 失败提示 -->
    <Modal v-model="isModal3" :title="vmI18n.t('modalTitle.tips')">
      <p>{{ errModelTitle }}</p>
    </Modal>
    <!-- 提示音 -->
    <audio id="fm01">
      <!--以下所有 您的浏览器不支持 audio 与元素。 -->
      <source src="./MP3/fm01.mp3" type="audio/ogg" />
      {{ vmI18n.t('modalTips.h6') }}
    </audio>
    <audio id="fm02">
      <source src="./MP3/fm02.mp3" type="audio/ogg" />
      {{ vmI18n.t('modalTips.h6') }}
    </audio>
    <audio id="fm03">
      <source src="./MP3/fm03.mp3" type="audio/ogg" />
      {{ vmI18n.t('modalTips.h6') }}
    </audio>
    <audio id="fm04">
      <source src="./MP3/fm04.mp3" type="audio/ogg" />
      {{ vmI18n.t('modalTips.h6') }}
    </audio>
    <audio id="error01">
      <source src="./MP3/error01.mp3" type="audio/ogg" />
      {{ vmI18n.t('modalTips.h6') }}
    </audio>
    <audio id="error02">
      <source src="./MP3/error02.mp3" type="audio/ogg" />
      {{ vmI18n.t('modalTips.h6') }}
    </audio>
    <div v-show="isSaveLoading" class="fromLoading">
      <Spin />
    </div>
  </div>
</template>

<script>
import scanIn from '@/js/pages/orderCenter/scanIn/scanIn';

export default scanIn;
</script>

<style lang='less'>
@import '~@/css/pages/orderCenter/scanIn/scanIn.less';
</style>

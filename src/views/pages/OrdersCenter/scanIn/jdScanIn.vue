
<template>
  <div class="scanIn">
    <!-- 按钮 -->
    <div class="scan_button">
      <jordan-button :btn-config="btnConfig" />
    </div>
    <!-- 高级搜索 -->
    <!--<div class="scan_search">-->
    <!--<IntegrateSearchFilter :dropDownList="dropList" :searchMethod="searchMethod" v-model="searchValue" :isSearchItemShow='false'></IntegrateSearchFilter>-->
    <!--</div>-->
    <!-- 扫描信息 -->
    <div class="scan_info">
      <div class="titles">
        <Icon
          size="18"
          style="margin-right: 5px;"
          type="md-paper"
        />扫描信息
      </div>
      <jordan-form :form-config="formConfig1" />
    </div>
    <!-- 录入信息 -->
    <div class="scan_logg">
      <div class="titles">
        <Icon
          size="18"
          style="margin-right: 5px;"
          type="md-paper"
        />录入信息
      </div>
      <jordan-form :form-config="formConfig2" />
    </div>
    <!-- 特殊处理 -->
    <div class="scan_special">
      <jordan-form :form-config="formConfig3" />
    </div>
    <!-- 扫描明细 -->
    <div class="scan_details">
      <div class="titles">
        <Icon
          size="18"
          style="margin-right: 5px;"
          type="md-paper"
        />扫描明细
      </div>
      <jordan-action-table
        :jordan-table-config="jordanTableConfig"
        @on-row-click="onRowClick"
      />
    </div>
    <!-- 退换货信息 -->
    <div class="scan_returngood">
      <div class="titles">
        <Icon
          size="18"
          style="margin-right: 5px;"
          type="md-paper"
        />退换货信息
      </div>
      <jordan-form :form-config="formConfig4" />
    </div>
    <!-- 弹框 -->
    <div class="dilog">
      <businessDialog
        :title="changeWarehouseConfig.confirmTitle"
        :title-align="changeWarehouseConfig.titleAlign"
        :width="changeWarehouseConfig.width"
        :scrollable="changeWarehouseConfig.scrollable"
        :closable="changeWarehouseConfig.closable"
        :draggable="changeWarehouseConfig.draggable"
        :mask="changeWarehouseConfig.mask"
        :mask-closable="changeWarehouseConfig.maskClosable"
        :transfer="changeWarehouseConfig.transfer"
        :name="changeWarehouseConfig.name"
        :url="changeWarehouseConfig.url"
        :keep-alive="changeWarehouseConfig.keepAlive"
        :exclude-string="changeWarehouseConfig.excludeString"
        :component-data="changeWarehouseConfig.componentData"
      />
    </div>
    <!-- 扫描发出条码无对应明细时提示弹框 -->
    <Modal
      v-model="isModal"
      title="提示"
      @on-ok="ok1"
      @on-cancel="cancel1"
      @on-keydown="keydown1"
    >
      <p>条码不在列表中,是否继续添加?</p>
    </Modal>
    <!-- 退货单无头件提示 -->
    <Modal
      v-model="isModal2"
      title="提示"
      @on-ok="ok2"
      @on-cancel="cancel2"
      @on-keydown="keydown2"
    >
      <p>未能匹配相应的退换货单，是否继续?</p>
    </Modal>
    <!-- 失败提示 -->
    <Modal
      v-model="isModal3"
      title="提示"
    >
      <p>{{ errModelTitle }}</p>
    </Modal>
    <!-- 提示音 -->
    <audio id="fm01">
      <source
        src="./MP3/fm01.mp3"
        type="audio/ogg"
      >您的浏览器不支持 audio 与元素。
    </audio>
    <audio id="fm02">
      <source
        src="./MP3/fm02.mp3"
        type="audio/ogg"
      >您的浏览器不支持 audio 与元素。
    </audio>
    <audio id="fm03">
      <source
        src="./MP3/fm03.mp3"
        type="audio/ogg"
      >您的浏览器不支持 audio 与元素。
    </audio>
    <audio id="fm04">
      <source
        src="./MP3/fm04.mp3"
        type="audio/ogg"
      >您的浏览器不支持 audio 与元素。
    </audio>
    <audio id="error01">
      <source
        src="./MP3/error01.mp3"
        type="audio/ogg"
      >您的浏览器不支持 audio 与元素。
    </audio>
    <audio id="error02">
      <source
        src="./MP3/error02.mp3"
        type="audio/ogg"
      >您的浏览器不支持 audio 与元素。
    </audio>
    <div
      v-show="isSaveLoading"
      class="fromLoading"
    >
      <Spin />
    </div>
  </div>
</template>

<script>
  import jdScanIn from '@/js/pages/orderCenter/scanIn/jdScanIn.js';

  export default jdScanIn;
</script>

<style lang='less'>
// @import '../../../../../static/skin/public.less';
@import '~@burgeon/oms-theme/skin/public.less';
.scanIn {
  position: relative;
  .scan_button {
    padding-left: 37px;
    padding-top: 15px;
  }
  .scan_search {
    padding: 10px 0 15px 37px;
  }
  .scan_details {
    // margin-left: 37px;
  }
  .scan_logg .titles ,.scan_details .titles,.scan_info .titles ,.scan_returngood .titles{
    margin: 10px 0;
    font-size: 16px;
    font-weight: 600;
    border-bottom: 3px solid #fd8368;
    width: 120px;
    padding-bottom: 5px;
  }

  .yellow {
    background-color: yellow;
    color: red;
  }
  .green {
    background-color: green;
    color: red;
  }
  .fromLoading {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(255, 255, 255, 0.9);
    z-index: 1000 !important;
  }
}
</style>

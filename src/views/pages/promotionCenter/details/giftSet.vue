<!-- 赠品设置 -->
<template>
  <div class="giftSet">
    <div class="title">
      <i class="iconfont icon-zengpin" />
      <!-- <span>赠品信息设置</span> -->
      <span>{{ vmI18n.t('other.gift_set') }}</span>
    </div>
    <div class="formList">
      <!--阶梯类型-->
      <div
        v-if="showPdtsArr"
        class="row"
      >
        <div class="form_label">
          {{ vmI18n.t('form_label.ladderType') }}：
        </div>
        <div class="form_content">
          <SingleBox
            :value="giftData.steps_type"
            :options="groups.stepsType"
            @changeSingle="checkStepsTypeChange"
          />
        </div>
      </div>
      <!--赠品翻倍-->
      <div class="row">
        <div class="form_label">
          <i class="red">*</i>{{ vmI18n.t('form_label.double_gifts') }}：
        </div>
        <div class="form_content">
          <SingleBox
            :value="giftData.gift_doubles"
            :options="groups.giftDoubles"
            @changeSingle="checkGiftDoublesChange"
          />
          <div class="form_item">
            {{ vmI18n.t('form_label.max_doubling_times') }}
          </div>
          <div class="form_el_input form_item limitinput">
            <input
              v-model="giftData.max_doubles_limits"
              oninput="this.value= this.value.match(/^[1-9]\d{0,2}/) ? this.value.match(/^[1-9]\d{0,2}/)[0] : ''"
              placeholder
            >
          </div>
        </div>
      </div>
      <!--赠送方式-->
      <div class="row">
        <div class="form_label">
          <i class="red">*</i>{{ vmI18n.t('form_label.giving_ways') }}：
        </div>
        <div class="form_content">
          <SingleBox
            :value="giftData.gift_methods"
            :options="groups.giftMethods"
            @changeSingle="checkGiftMethodsChange"
          />
        </div>
      </div>
      <!--赠送总量-->
      <div
        v-if="showPdtsArr"
        class="row"
      >
        <div class="form_label">
          <i class="red">*</i>赠送总量：
        </div>
        <div class="form_content">
          <SingleBox
            :value="giftData.give_num_share"
            :options="groups.giveNumShare"
            @changeSingle="checkGiftGrossChange"
          />
        </div>
      </div>
      <!--梯度-->
      <div
        v-if="showPdtsArr"
        class="row"
      >
        <!-- 赠品列表： -->
        <div class="form_label">
          {{ vmI18n.t('other.gift_list') }}：
        </div>
        <div class="form_content">
          <detailtabs
            :current.sync="currentTab"
            :columns="columns"
            :products-arrs="giftData.gift_productsArrs"
            :products-arrs-view="productsArrsView"
            :itemdata="itemdata"
            :module-mode="moduleMode"
            @addOneTableRowData="addOneTableRowData"
            @deleteOneTableRowData="deleteOneTableRowData"
            @onePageChange="onePageChange"
            @onOnePageSizeChange="onOnePageSizeChange"
            @getOnePageButtonFkChoose="getOnePageButtonFkChoose"
            @alertOneTableRowData="alertOneTableRowData"
            @returnOneTableData="returnOneTableData"
          >
            <div
              slot="MatchOperate"
              class="form_button"
            >
              <OmsButton :btn-config="btnConfig" />
            </div>
          </detailtabs>
        </div>
      </div>
      <!--非梯度-->
      <div
        v-if="!showPdtsArr"
        class="row"
      >
        <div class="form_label">
          <!-- 赠品列表 -->
          <i class="red">*</i> {{ vmI18n.t('other.gift_list') }}：
        </div>
        <div class="form_content">
          <detailtable
            :t-columns="columns"
            :t-data="productslistView.data"
            :total="productslistView.total"
            :itemdata="itemdata"
            :current="productslistView.current"
            :page-size="productslistView.pageSize"
            @deleteRowData="deleteRowData"
            @on-page-change="pageChange"
            @on-page-size-change="onPageSizeChange"
            @alertRowData="alertRowData"
          >
            <div
              slot="action"
              class="form_button"
            >
              <ButtonFkDialog
                :itemdata="itemdataFk"
                @getFkChooseItem="getButtonFkChoose"
              />
              <button
                class="white"
                @click="addRowData"
              >
                {{ vmI18n.t('btn.add') }}
              </button>
              <button
                class="white"
                @click="importData"
              >
                {{ vmI18n.t('btn.import') }}
              </button>
            </div>
          </detailtable>
        </div>
      </div>
    </div>

    <!--导入组件-->
    <businessDialog
      :closable="importTable.closable"
      :component-data="importTable.componentData"
      :draggable="importTable.draggable"
      :exclude-string="importTable.excludeString"
      :keep-alive="importTable.keepAlive"
      :mask="importTable.mask"
      :mask-closable="importTable.maskClosable"
      :name="importTable.name"
      :scrollable="importTable.scrollable"
      :title="importTable.confirmTitle"
      :title-align="importTable.titleAlign"
      :transfer="importTable.transfer"
      :base-path-name="importTable.basePathName"
      :url="importTable.url"
      :width="importTable.width"
      :basePathName="importTable.basePathName"
    />
    <!--设置商品池 添加阶梯 删除阶梯-->
    <SetCommodity
      :dialog_visible="dialogVisible"
      :gift-data="giftData"
      :basic-data="basicData"
      :objid="objid"
      :load-dis="loadDis"
      @confirm="confirm"
      @closeDialog="closeDialog"
    />
  </div>
</template>
<script>
  import giftSet from '@/js/pages/promotionCenter/details/giftSet';

  export default giftSet;
</script>

<template>
  <div class="customized-detail">
    <div class="authorize-list">
      <div class="authorize-list-heard">
        <div class="heard-tips">{{vmI18n.t("modalTips.ha") }}</div>
        <div class="search-input">
          <label>{{vmI18n.t('btn.search') }} ：</label>
          <Input
            v-model="plantName"
            search
            enter-button
            @input="init"
            @keyup.enter="init"
            @keyup.enter.native="init"
          />
        </div>
      </div>
      <div class="authorize-imgs">
        <div
          v-for="(em, index) in shops"
          :key="index"
          class="authorize-img"
          @click="fnopen(em)"
        >
          <img :src="em.plantLogo[0].URL" />
          <P class="authorize-text"> {{ em.name }}</P>
        </div>
      </div>
    </div>

    <Modal
      v-model="shopShow"
      width="600"
      class="shopModal"
      footer-hide
      :draggable="true"
      :mask="true"
      :title="shopTitle"
    >
      <div class="customized-modal">
        <!-- 步骤条 -->
        <div class="steps-style">
          <Steps :current="2" size="small">
            <Step
              v-for="(item, index) in steps"
              :key="index"
              :title="item.name"
              :status="item.status"
            />
          </Steps>
        </div>

        <!-- 店铺授权 -->
        <div v-if="shopform" class="shop-one-show">
          <FormLayout
            ref="FormLayout"
            :default-column="defaultColumn"
            :defaultconfig="formConfig"
          />
        </div>
        <div v-else class="shop-one-show">
          <OmsForm :form-config="formconfig" @keyDown="keyDown">
            <template #formCompile="{ rowData }">
              <div class="form-compile">
                <p>{{ rowData.value.authTips }}</p>
              </div>
            </template>
          </OmsForm>
        </div>
        <OmsButton class="modal-footer" :btn-config="btnConfig" />
      </div>
    </Modal>
    <Modal
      v-model="modal1"
      footer-hide
      :draggable="true"
      :mask="true"
      :width="400"
      title
      :class-name="'ark-dialog'"
    >
      <div class="customized-modal">
        <p class="tips"><span class="iconfont"></span>{{vmI18n.t('modalTips.hb') }}</p>
        <OmsButton class="modal-footer" :btn-config="authoriBtnConfig" />
      </div>
    </Modal>
  </div>
</template>

<script>
import authorize from '@/js/pages/basicData/authorize.js'

export default authorize
</script>

<style lang="less" scoped>
@import "~@/css/pages/basicData/authorize.less";
@import "~omsTheme/public.less";
.customized-modal {
  .tips {
    padding-top: 10%;
    text-align: center;
  }
}

.authorize-text {
  text-align: center;
  margin-top: 35px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.authorize-list {
  padding: 12px;
}
.steps-style {
  position: relative;
  left: 5.5%;
}
// 头部
.authorize-list-heard {
  display: grid;
  grid-template-columns: 30% 70%;
  margin-bottom: @base-mr;
  .heard-tips {
    font-size: 14px;
    color: #292f43;
    height: 32px;
    line-height: 32px;
  }
  .search-input {
    display: grid;
    grid-template-columns: 80px 200px;
    justify-content: end;
    align-items: center;

    label {
      text-align: right;
    }
    .ark-input-wrapper {
      /deep/ .ark-input {
        border: 1px solid #dbdde8;
        height: 32px;
        line-height: 32px;
        border-radius: 5px !important;
        width: calc(100% - 40px);
      }
      /deep/ .ark-input-search {
        &:before {
          display: none;
        }
        display: grid;
        justify-content: center;
        align-items: center;
        height: 32px;
        line-height: 32px;
        border-radius: 5px !important;
        text-align: center;
        background: @base-color !important;
        color: #fff;
        border: #292f43;
      }
    }
  }
}
// 平台店铺
.authorize-imgs {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(96px, 1fr));
  grid-gap: 10px;
  margin-top: 24px;
  .authorize-img {
    background: #fff;
    // padding: @base-mr;
    padding: 12px 12px 7px 12px;
    position: relative;
    border: 1px solid #f2f2f2;
    box-sizing: @base-shadow;
    border-radius: @base-radius;
    &::before {
      content: "";
      display: block;
      padding-bottom: 100%;
    }
    img {
      position: absolute;
      max-width: 90%;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
}
// 店铺新增弹框
.shopModal {
  .ark-steps {
    .ark-steps-item {
      width: 38% !important;
      &:last-child {
        width: 24% !important;
      }
    }
  }
  /deep/ .ark-steps-item.ark-steps-status-finish .ark-steps-head-inner,
  /deep/
    .ark-steps-item.ark-steps-status-finish
    .ark-steps-head-inner
    > .ark-steps-icon {
    color: @base-color;
    border-color: @base-color;
  }
  /deep/ .ark-steps-item.ark-steps-status-finish .ark-steps-tail > i:after {
    background: @base-color;
  }
  .shop-one-show {
    margin-top: @base-mr;
    .ark-input {
      border-radius: @base-radius;
    }
  }
}
// 授权提示
.tips {
  line-height: 40px;
  font-size: 14px;
  span {
    color: @base-color;
    vertical-align: middle;
    margin-right: 5px;
  }
}
</style>

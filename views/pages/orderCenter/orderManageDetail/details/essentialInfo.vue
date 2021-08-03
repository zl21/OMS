<!--基本信息-->
<template>
  <div class="order-content-tab">
    <div class="order-content-top">
      <!-- 收货信息 * 地址 And 备注 -->
      <div class="order-tab-left order-tab-content">
        <div class="order-tab-title">
          <!-- 收货信息 -->
          <span>{{ vmI18n.t('table_label.receivingInfo') }}</span>
          <div class="title-right">
            <p v-if="butArr[0]['isShow']"  @click="eyeClick">
              <span>
                <Icon
                  style="fontSize:16px; margin-top:-3px"
                  :type="!eyeStatus ? 'ios-eye' : 'ios-eye-off'"
                />
              </span>
              <label :title="eyeText">
                {{ eyeText }}
              </label>
            </p>
            <p v-if="butArr[1]['isShow']"  @click="modifyAddress">
              <span>
                <span>
                  <Icon
                    style="fontSize:16px; margin-top:-3px"
                    type="ios-create-outline"
                  />
                </span>
                <label :title = "vmI18n.t('modalTitle.modify_shipping_address')">
                  <!-- 修改收货地址 -->
                  {{vmI18n.t('modalTitle.modify_shipping_address')}} 
                </label>
              </span>
            </p>
          </div>
        </div>
        <div class="order-tab-detail">
          <Row class="detail-ul">
            <Col
              v-for="(list, index) of detail"
              :key="index"
              :span="list.width"
              class="detail-li"
            >
              <label :title="list.label">
                <i v-if="list.flag">*</i>
                {{ list.label }}
              </label>
              <p v-if="list.column === 'CP_C_REGION_PROVINCE_ENAME'" :title="`${componentData.order['CP_C_REGION_PROVINCE_ENAME']}${componentData.order['CP_C_REGION_CITY_ENAME']}${componentData.order['CP_C_REGION_AREA_ENAME']}`">
                {{ componentData.order['CP_C_REGION_PROVINCE_ENAME'] }}
                {{ componentData.order['CP_C_REGION_CITY_ENAME'] }}
                {{ componentData.order['CP_C_REGION_AREA_ENAME'] }}
              </p>
              <p :title="componentData.order[list.column]" v-else>{{ componentData.order[list.column] }}</p>
            </Col>
          </Row>
        </div>
      </div>
      <!-- 基础资料 -->
      <div class="order-tab-right order-tab-content">
        <div class="order-tab-title">
          <!-- 基础资料 -->
          <span class="order-tab-title-span"> {{ vmI18n.t('panel_label.basicData')}} </span>
          <div class="title-sign">
            <span :title="item.text" v-for="(item,index) in componentData.order.ORDER_TAG" :key="index" :style="{ color: item.clr,borderColor: item.clr}">
              {{item.text}}
            </span>
            <label :title="componentData.order.OC_B_LABEL_DESCRIPTION">
              {{componentData.order.OC_B_LABEL_DESCRIPTION}}
            </label>
          </div>

        </div>
        <div class="order-tab-detail">
          <Row class="detail-ul">
            <Col
              v-for="(list, index) of queryList"
              :key="index"
              :span="list.width"
              class="detail-li"
            >
            <!-- {{orderTypeClass}}{{platformStatusClass}} -->
              <label :title="list.label">
                <i v-if="list.flag">*</i>
                {{ list.label }}
              </label>
              <!-- 平台编号 -->
              <p
                v-if="list.column==='MERGE_SOURCE_CODE'"
                class="text-ellipsis"
                :title="componentData.order[list.column]"
              >
                {{ componentData.order[list.column] }}
              </p>
              <!-- 物流单号 -->
              <p v-if="list.column ==='EXPRESSCODE'" :title="componentData.order[list.column]">
                {{ componentData.order[list.column] }}
                <span
                  v-if="componentData.order.RESERVE_BIGINT05 == 1"
                  style="color: red;"
                > {{ vmI18n.t('form_label.an')}}</span>
                <!-- (多包裹) -->
              </p>
              <p v-if="list.column === 'SELLER_MEMO'" :title="componentData.order[list.column]">
                {{ componentData.order[list.column] }}
                <span  v-if="butArr[2]['isShow']" @click="modifyRemark" class="edit iconfont icon-bianji"></span>
              </p>
              <!-- 其他 -->
              <p v-else :title="componentData.order[list.column]" :class="[list.column==='ORDER_TYPE' ? `color_${orderTypeClass}` :'',list.column==='PLATFORM_STATUS' ? `color_${platformStatusClass}` :'']" >
                {{ componentData.order[list.column] }}
              </p>
            </Col>
          </Row>
          <!-- 订单金额 -->
          <div class="order-money">
            <!-- 订单金额 -->
            <span class="order-money-title" :title="vmI18n.t('form_label.ah')"> {{ vmI18n.t('form_label.ah')}}</span>
            <ul class="totalAmount">
              <li>
                <label :title="vmI18n.t('form_label.ai')">
                  <!-- 商品总金额  -->
                  {{ vmI18n.t('form_label.ai')}}
                    <Tooltip placement="top-start" max-width="800" theme="light">
                      <Icon type="ios-alert-outline" />
                      <div slot="content">
                        <goodsTotalAmount :data="componentData" @retailPriceTotal="priceTotal"></goodsTotalAmount>
                      </div>
                  </Tooltip>
                </label>
                <p>{{retailPriceTotal}}</p>
              </li>
              <li class="symbol">+</li>
              <li>
                <!-- 运费 -->
                <label :title="vmI18n.t('form_label.freight')">{{vmI18n.t('form_label.freight')}}</label>
                <p>{{componentData.order.SHIP_AMT || '0.00'}}</p>
              </li>
              <li class="symbol">+</li>
              <li>
                <!-- 服务费 -->
                <label :title="vmI18n.t('form_label.service_charge')">{{vmI18n.t('form_label.service_charge')}}</label>
                <p>{{ componentData.order.SERVICE_AMT || '0.00' }}</p>
              </li>
              <li class="symbol">=</li>
              <li class="resulf-text">
                <!-- 订单总金额 -->
                <label :title="vmI18n.t('form_label.aj')">{{vmI18n.t('form_label.aj') }}</label>
                <p>{{orderPriceTotal}}</p>
              </li>
            </ul>
            <ul class="amountActually">
              <li>
                <!-- 实付金额 -->
                <label :title="vmI18n.t('form_label.ak')">{{vmI18n.t('form_label.ak') }}</label>
                <p>{{ componentData.order.RECEIVED_AMT  || '0.00'}}</p>
              </li>
              <li>
                <!-- 红包 -->
                <label :title="vmI18n.t('form_label.al')">{{vmI18n.t('form_label.al') }}</label>
                <p>{{ componentData.order.al || '0.00'}}</p>
              </li>
              <li>
                <!-- 代收COD金额 -->
                <label :title="vmI18n.t('form_label.am')">{{vmI18n.t('form_label.am') }}</label>
                <p>{{ componentData.order.COLLECT_AMT || '0.00'}}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <Row>
      <!-- 订单明细 -->
      <Col span="24" >
        <div class="order-tab-content">
          <div class="order-tab-title border">
            <!-- 订单明细 -->
            <span> {{vmI18n.t('panel_label.order_detailed')}}</span>
            <!-- 如果是组合商品不显示 -->
            <div v-if="is_combination" class="checkCombination">
              <span
                v-if="isQh && isQhChild"
                @click="checkCombination"
              >
                <Icon type="ios-repeat" />
                <!-- 切换为sku商品显示 -->
                {{vmI18n.t('form_label.b0')}}
              </span>
              <span
                v-if="!isQh && isQhChild"
                @click="checkCombination"
              >
                <Icon type="ios-repeat" />
                <!-- 切换为平台商品明细 -->
                {{vmI18n.t('form_label.b1')}}
              </span>
            </div>
          </div>
          <CusOrderItem
            ref="cusOrderItem"
            :component-data="tableConfig"
            :is-qh="isQh"
            @freshLoadChild="freshLoadChild"
            @addGiftHandler="addGiftHandler"
            @isQhMethod="isQhMethod"
            @replaceGoodsDetail="replaceGoodsDetail"
          />
        </div>
      </Col>
      <businessDialog
        :ref="dialogsConfig.name"
        :url="dialogsConfig.url"
        :title="dialogsConfig.title"
        :name="dialogsConfig.name"
        :keep-alive="dialogsConfig.keepAlive||true"
        :width="dialogsConfig.width||''"
        :exclude-string="dialogsConfig.excludeString"
        :component-data="dialogsConfig.data"
        :footer-hide="dialogsConfig.footerHide"
        :quit="dialogsConfig.quit"
        :mask-closable="dialogsConfig.maskClosable"
        :confirm="dialogsConfig.confirm"
      />
    </Row>
  </div>
</template>

<script>
  import essentialInfo from '@/js/pages/orderCenter/orderManageDetail/details/essentialInfo';
  export default essentialInfo;
</script>

<style lang="less" scoped>
  @import "~@/css/pages/orderCenter/orderManageDetail/details/essentialInfo.less";
</style>

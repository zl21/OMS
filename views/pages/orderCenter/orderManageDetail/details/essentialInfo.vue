<!--基本信息-->
<template>
  <Row :gutter="12" class="order-content-tab">
     <!-- 收货信息 * 地址 And 备注 -->
    <Col span="9" >
      <div class="order-tab-content">
        <div class="order-tab-title">
          <span>收货信息</span>
          <div class="title-right">
            <p>
              <span>
                <Icon
                  style="fontSize:16px; margin-top:-3px"
                  :type="!eyeStatus ? 'ios-eye' : 'ios-eye-off'"
                  @click="eyeClick"
                />
              </span>
              <label>
                {{ eyeText }}
              </label>
            </p>
            <p>
              <span>
                <span>
                  <Icon
                    style="fontSize:16px; margin-top:-3px"
                    type="ios-create-outline"
                    @click="modifyAddress"
                  />
                </span>
                <label>
                  修改收货地址
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
              <label>
                <i v-if="list.flag">*</i>
                {{ list.label }}
              </label>
              <p v-if="list.column === 'CP_C_REGION_PROVINCE_ENAME'">
                {{ componentData.order['CP_C_REGION_PROVINCE_ENAME'] }}
                {{ componentData.order['CP_C_REGION_CITY_ENAME'] }}
                {{ componentData.order['CP_C_REGION_AREA_ENAME'] }}
              </p>
              <p v-if="list.column === 'SELLER_MEMO'">
                {{ componentData.order[list.column] }}
                <span @click="modifyRemark" class="edit iconfont icon-bianji"></span>
              </p>
              <p>{{ componentData.order[list.column] }}</p>
            </Col>
          </Row>
        </div>
      </div>
    </Col>
    <!-- 基础资料 -->
    <Col span="15" >
      <div class="order-tab-content">
        <div class="order-tab-title">
          <span>基础资料</span>
          <div class="title-sign">
            <span v-for="(item,index) in componentData.order.ORDER_TAG" :key="index" :style="{ color: item.clr,borderColor: item.clr}">
              {{item.text}}
            </span>
            <!-- <span class="one">合</span>
            <span class="two">挂</span>
            <span class="three">标</span>
            <span class="four">手</span> -->
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
              <label>
                <i v-if="list.flag">*</i>
                {{ list.label }}
              </label>
              <!-- 平台编号 -->
              <p
                v-if="list.column==='MERGE_SOURCE_CODE'"
                class="text-ellipsis"
              >
                {{ componentData.order[list.column] }}
              </p>
              <!-- 物流单号 -->
              <p v-if="list.column ==='EXPRESSCODE'">
                {{ componentData.order[list.column] }}
                <span
                  v-if="componentData.order.RESERVE_BIGINT05 == 1"
                  style="color: red;"
                >(多包裹)</span>
              </p>
              <!-- 其他 -->
              <p v-else>
                {{ componentData.order[list.column] }}
              </p>
            </Col>
          </Row>
          <!-- 订单金额 -->
          <div class="order-money">
            <span class="order-money-title">订单金额</span>
            <ul class="totalAmount">
              <li>
                <label>
                  商品总金额 
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
                <label>运费</label>
                <p>{{componentData.order.SHIP_AMT || '0.00'}}</p>
              </li>
              <li class="symbol">+</li>
              <li>
                <label>服务费</label>
                <p>{{ componentData.order.SERVICE_AMT || '0.00' }}</p>
              </li>
              <li class="symbol">=</li>
              <li class="resulf-text">
                <label>订单总金额</label>
                <p>{{orderPriceTotal}}</p>
              </li>
            </ul>
            <ul class="amountActually">
              <li>
                <label>实付金额</label>
                <p>{{ componentData.order.RECEIVED_AMT  || '0.00'}}</p>
              </li>
              <li>
                <label>红包</label>
                <p>{{ componentData.order.RED_ENVELOPER || '0.00'}}</p>
              </li>
              <li>
                <label>代收COD金额</label>
                <p>{{ componentData.order.COLLECT_AMT || '0.00'}}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Col>
    <!-- 订单明细 -->
    <Col span="24" >
      <div class="order-tab-content">
        <div class="order-tab-title">
          <span>订单明细</span>
          <!-- 如果是组合商品不显示 -->
          <div v-if="!is_combination" class="checkCombination">
            <span
              v-if="isQh && isQhChild"
              @click="checkCombination"
            >
              <Icon type="ios-repeat" />切换为sku商品显示
            </span>
            <span
              v-if="!isQh && isQhChild"
              @click="checkCombination"
            >
              <Icon type="ios-repeat" />切换为平台商品明细
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
</template>

<script>
  import essentialInfo from '@/js/pages/orderCenter/orderManageDetail/details/essentialInfo';

  export default essentialInfo;
</script>

<style lang="less" scoped>
  @import "~@/css/pages/orderCenter/orderManageDetail/details/essentialInfo.less";
</style>

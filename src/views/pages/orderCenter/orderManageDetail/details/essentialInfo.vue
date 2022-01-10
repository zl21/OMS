<!--基本信息-->
<template>
  <div class="order-content-tab customized-detail">
    <div class="order-tab-content obj-main">
      <Collapse v-model="collapse">
        <Panel name="panel_baseInfo">
          {{ $it('com.baseInformation') }}
          <div slot="content">
            <div class="order-tab-detail">
              <ul>
                <li
                  v-for="(list, index) of queryList"
                  :key="index"
                >
                  <label>
                    <i v-if="list.flag">*</i>
                    {{ list.label }}
                  </label>
                  <p v-if="list.label==='平台编号:'" class="text-ellipsis">
                      {{ componentData.order[list.column] }}
                  </p>
                  <p v-if="list.label ==='物流单号:'">
                    {{ componentData.order[list.column] }}
                    <span
                      v-if="componentData.order.RESERVE_BIGINT05 == 1"
                      style="color: red;"
                    >(多包裹)</span>
                  </p>
                  <p
                    v-if="list.label!=='平台编号:' && list.label !=='物流单号:'"
                  >
                    {{ componentData.order[list.column] }}
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </Panel>
        <Panel name="panel_amt">
          订单金额
          <!-- {{ $it('com.baseInformation') }} -->
          <div slot="content">
            <div class="order-tab-detail2">
              <ul>
                <li>
                  <p>商品金额</p>
                  <p>{{ componentData.order.PRODUCT_AMT==null?componentData.order.PRODUCT_AMT:componentData.order.PRODUCT_AMT }}</p>
                </li>
                <li>+</li>
                <li>
                  <p>配送费用</p>
                  <p>{{ componentData.order.SHIP_AMT }}</p>
                </li>
                <li>+</li>
                <li>
                  <p>调整金额</p>
                  <p>{{ componentData.order.ADJUST_AMT==null || componentData.order.ADJUST_AMT== 0 ?componentData.order.ADJUST_AMT:componentData.order.ADJUST_AMT }}</p>
                </li>
                <li>+</li>
                <li>
                  <p>服务费</p>
                  <p>{{ componentData.order.SERVICE_AMT==null || componentData.order.SERVICE_AMT== 0 ?componentData.order.SERVICE_AMT:componentData.order.SERVICE_AMT }}</p>
                </li>
                <li>-</li>
                <li>
                  <p>订单优惠金额</p>
                  <p>{{ componentData.order.ORDER_DISCOUNT_AMT==null || componentData.order.ORDER_DISCOUNT_AMT == 0 ?componentData.order.ORDER_DISCOUNT_AMT:componentData.order.ORDER_DISCOUNT_AMT }}</p>
                </li>
                <li>-</li>
                <li>
                  <p>商品优惠金额</p>
                  <p>{{ componentData.order.PRODUCT_DISCOUNT_AMT==null || componentData.order.PRODUCT_DISCOUNT_AMT == 0 ?componentData.order.PRODUCT_DISCOUNT_AMT:componentData.order.PRODUCT_DISCOUNT_AMT }}</p>
                </li>
                <li>=</li>
                <li>
                  <p class="red strong">
                    总金额
                  </p>
                  <p>{{ componentData.order.ORDER_AMT==null || componentData.order.ORDER_AMT == 0 ?componentData.order.ORDER_AMT:componentData.order.ORDER_AMT }}</p>
                </li>
                <li>
                  <p class="blue strong">
                    已支付金额
                  </p>
                  <p>{{ componentData.order.RECEIVED_AMT==null || componentData.order.RECEIVED_AMT == 0 ?componentData.order.RECEIVED_AMT:componentData.order.RECEIVED_AMT }}</p>
                </li>
                <li>
                  <p class="blue strong">
                    代收(COD)金额
                  </p>
                  <p>{{ componentData.order.COD_AMT==null || componentData.order.COD_AMT == 0 ?componentData.order.COD_AMT:componentData.order.COD_AMT }}</p>
                </li>
                <!-- <li>
                  <p class="blue strong">结算金额</p>
                  <p>{{componentData.order.CONSIGN_AMT==null || componentData.order.CONSIGN_AMT == 0 ?componentData.order.CONSIGN_AMT:componentData.order.CONSIGN_AMT}}</p>
                </li>-->
                <!-- <li>
                  <p class="blue strong">
                    操作费
                  </p>
                  <p>{{ componentData.order.OPERATE_AMT==null || componentData.order.OPERATE_AMT == 0 ?componentData.order.OPERATE_AMT:componentData.order.OPERATE_AMT }}</p>
                </li>
                <li>
                  <p class="blue strong">
                    代销运费
                  </p>
                  <p>{{ componentData.order.CONSIGN_SHIP_AMT==null || componentData.order.CONSIGN_SHIP_AMT == 0 ?componentData.order.CONSIGN_SHIP_AMT:componentData.order.CONSIGN_SHIP_AMT }}</p>
                </li>
                <li>
                  <p class="blue strong">
                    <Tooltip placement="top" content="(总金额-配送费用-服务费) / 商品金额">
                      <Icon type="ios-alert-outline" color="red" class="tooltip" />
                    </Tooltip>
                    整单折扣
                  </p>
                  <p>{{ componentData.order.ORDER_DISCOUNT || '0.00' }}</p>
                </li> -->
              </ul>
            </div>
          </div>
        </Panel>
        <Panel name="panel_address">
          <span>订单收货地址</span>
          <Icon
            style="fontSize:24px;paddingBottom:2px;marginLeft:15px"
            type="ios-eye"
            @click.stop="eyeClick"
          />
          <!-- {{ $it('com.baseInformation') }} -->
          <div slot="content">
            <div class="order-tab-detail">
              <ul>
                <li
                  v-for="(list, index) of detail"
                  :key="index"
                  :class="colStretch(list)"
                >
                  <label>
                    <i v-if="list.flag">*</i>
                    {{ list.label }}
                  </label>
                  <p>{{ componentData.order[list.column] }}</p>
                </li>
              </ul>
            </div>
          </div>
        </Panel>
        <Panel name="panel_details">
          <span>订单明细</span>
          <span
            v-if="isQh && isQhChild"
            style="float: right;fontSize:12px;color:red;fontWeight:300;marginRight:8px;cursor:pointer;"
            @click.stop="checkCombination"
          >
            <Icon type="ios-repeat" />切换为sku商品显示
          </span>
          <span
            v-if="!isQh && isQhChild"
            style="float: right;fontSize:12px;color:red;fontWeight:300;marginRight:8px;cursor:pointer;"
            @click.stop="checkCombination"
          >
            <Icon type="ios-repeat" />切换为平台商品明细
          </span>
          <div slot="content">
            <CusOrderItem
              ref="cusOrderItem"
              :component-data="tableConfig"
              :is-qh="isQh"
              @freshLoadChild="freshLoadChild"
              @BtnClickEvent="BtnClickEvent"
              @isQhMethod="isQhMethod"
              @replaceGoodsDetail="replaceGoodsDetail"
            />
          </div>
        </Panel>
        <Panel name="panel_remark">
          {{ $it('com.baseInformation') }}
          <div slot="content">
            <ul>
              <li>买家备注: {{ componentData.order.BUYER_MESSAGE }}</li>
              <li>卖家备注: {{ componentData.order.SELLER_MEMO }}</li>
              <li>系统备注: {{ componentData.order.SYSREMARK }}</li>
              <li>内部备注: {{ componentData.order.INSIDE_REMARK }}</li>
            </ul>
          </div>
        </Panel>
      </Collapse>
    </div>

    <!-- <businessDialog
      v-for="(list, index) in dialogs"
      :key="index"
      :ref="list.name"
      :url="list.url"
      :title="list.title"
      :name="list.name"
      :keep-alive="list.keepAlive||true"
      :width="list.width||''"
      :exclude-string="list.excludeString"
      :component-data="list.data"
      :footer-hide="list.footerHide"
      :quit="list.quit"
      :confirm="list.confirm"
    />
    -->
    <OmsDialog
      :title="publicBouncedConfig.title"
      :title-align="publicBouncedConfig.titleAlign"
      :width="publicBouncedConfig.width"
      :scrollable="publicBouncedConfig.scrollable"
      :closable="publicBouncedConfig.closable"
      :draggable="publicBouncedConfig.draggable"
      :mask="publicBouncedConfig.mask"
      :mask-closable="publicBouncedConfig.maskClosable"
      :transfer="publicBouncedConfig.transfer"
      :name="publicBouncedConfig.name"
      :url="publicBouncedConfig.url"
      :batch-closed="publicBouncedConfig.batchClosed"
      :keep-alive="publicBouncedConfig.keepAlive"
      :exclude-string="publicBouncedConfig.excludeString"
      :component-data="publicBouncedConfig.componentData"
      :quit="publicBouncedConfig.quit"
    /> 

  </div>
</template>

<script>
  import essentialInfo from '@/js/pages/orderCenter/orderManageDetail/details/essentialInfo';

  export default essentialInfo;
</script>

<style lang="less" scoped>
  @import "~@/css/pages/orderCenter/orderManageDetail/details/essentialInfo.less";
</style>

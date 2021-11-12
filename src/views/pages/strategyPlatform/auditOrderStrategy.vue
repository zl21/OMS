<!--
 * @Author: your name
 * @Date: 2021-06-03 19:24:42
 * @LastEditTime: 2021-08-05 11:43:15
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /burgeon-project-logic/views/pages/strategyPlatform/auditOrderStrategy.vue
-->
<template>
  <!-- 审单策略 -->
  <div class="auditOrderStrategy customized-detail">
    <div class="customized-detail-btn">
      <OmsButton :btn-config="btnConfig" />
    </div>
    <div class="customized-detail-main">
      <Collapse v-model="collapseValue">
        <Panel name="1">
          <!-- 基础资料 -->
          {{ vmI18n.t('panel_label.basicData') }}
          <p slot="content">
            <span class="baseData">
              <OmsForm :form-config="formConfig" />
              <p class="createdTime">
                <label>按系统创建时间等待</label>
                <Input
                  v-model="resultData.ST_C_AUTO_AUDIT.WAIT_TIME"
                  @on-change="modify"
                  :regx="/^[0-9]{0,9}$/"
                />
                <span>分钟后自动审核</span>
              </p>
            </span>
          </p>
        </Panel>
        <Panel name="2">
          限制条件
          <div slot="content">
            <div class="conditions">
              <div class="chackbox-content">
                <label class="label">单据创建方式：</label>
                <div class="condition-input">
                  <Checkbox
                    :indeterminate="createMethod.indeterminate"
                    :value="createMethod.checkAll"
                    @click.prevent.native="createMethod_handleCheckAll"
                    :disabled="disabledAll"
                    >全选</Checkbox
                  >
                  <CheckboxGroup
                    v-model="
                      resultData.ST_C_AUTO_AUDIT_ITEM.BILL_FOUND_TYPE.VALUE
                    "
                    @on-change="createMethod_checkAllGroupChange"
                  >
                    <Checkbox label="3" :disabled="disabledAll"
                      >手工导入</Checkbox
                    >
                    <Checkbox label="1" :disabled="disabledAll"
                      >手工新增</Checkbox
                    >
                  </CheckboxGroup>
                </div>
              </div>
              <div class="chackbox-content">
                <label class="label">单据类型：</label>
                <div class="condition-input">
                  <Checkbox
                    :indeterminate="orderType.indeterminate"
                    :value="orderType.checkAll"
                    @click.prevent.native="orderType_handleCheckAll"
                    :disabled="disabledAll"
                    >全选</Checkbox
                  >
                  <CheckboxGroup
                    v-model="resultData.ST_C_AUTO_AUDIT_ITEM.BILL_TYPE.VALUE"
                    @on-change="orderType_checkAllGroupChange"
                  >
                    <Checkbox label="1" :disabled="disabledAll">正常</Checkbox>
                    <Checkbox label="32" :disabled="disabledAll">预售</Checkbox>
                    <Checkbox label="4" :disabled="disabledAll">补发</Checkbox>
                    <Checkbox label="2" :disabled="disabledAll">换货</Checkbox>
                    <Checkbox label="16" :disabled="disabledAll"
                      >货到付款</Checkbox
                    >
                  </CheckboxGroup>
                </div>
              </div>
              <div class="switch-content">
                <i-switch
                  v-model="
                    resultData.ST_C_AUTO_AUDIT_ITEM.DELIVERY_WAREHOUSE.IS_OPEN
                  "
                  class="switch"
                  size="small"
                  :disabled="disabledAll"
                />
                <label class="label"
                  ><i
                    v-show="
                      resultData.ST_C_AUTO_AUDIT_ITEM.DELIVERY_WAREHOUSE.IS_OPEN
                    "
                    >*</i
                  >发货仓库：</label
                >
                <div class="popInput">
                  <Fkinput
                    class="popInput"
                    :version="DELIVERY_WAREHOUSE.version"
                    :is-active="DELIVERY_WAREHOUSE.isActive"
                    :itemdata="DELIVERY_WAREHOUSE.itemdata"
                    :is-disabled="DELIVERY_WAREHOUSE.isDisabled"
                    @getFkChooseItem="DELIVERY_WAREHOUSE_oneObj"
                  />
                </div>
              </div>
              <div class="switch-content">
                <i-switch
                  v-model="
                    resultData.ST_C_AUTO_AUDIT_ITEM.LOGISTICS_COMPANY.IS_OPEN
                  "
                  class="switch"
                  size="small"
                  :disabled="disabledAll"
                />
                <label class="label"
                  ><i
                    v-show="
                      resultData.ST_C_AUTO_AUDIT_ITEM.LOGISTICS_COMPANY.IS_OPEN
                    "
                    >*</i
                  >物流公司：</label
                >
                <div class="popInput">
                  <Fkinput
                    class="popInput"
                    :version="LOGISTICS_COMPANY.version"
                    :is-active="LOGISTICS_COMPANY.isActive"
                    :itemdata="LOGISTICS_COMPANY.itemdata"
                    :is-disabled="LOGISTICS_COMPANY.isDisabled"
                    @getFkChooseItem="LOGISTICS_COMPANY_oneObj"
                  />
                </div>
              </div>
              <div class="switch-content">
                <i-switch
                  v-model="resultData.ST_C_AUTO_AUDIT_ITEM.PAYMENT_TIME.IS_OPEN"
                  class="switch"
                  size="small"
                  :disabled="disabledAll"
                />
                <label class="label"
                  ><i
                    v-show="
                      resultData.ST_C_AUTO_AUDIT_ITEM.PAYMENT_TIME.IS_OPEN
                    "
                    >*</i
                  >支付时间：</label
                >
                <div class="condition-input">
                  <DatePicker
                    v-model="PAYMENT_TIME"
                    type="datetimerange"
                    placement="bottom-end"
                    placeholder="请输入支付时间"
                    style="width: 200px"
                    format="yyyy-MM-dd HH:mm:ss"
                    transfer
                    :disabled="disabledAll"
                  />
                </div>
              </div>
              <div class="switch-content">
                <i-switch
                  v-model="resultData.ST_C_AUTO_AUDIT_ITEM.TOTAL_AMOUNT.IS_OPEN"
                  class="switch"
                  size="small"
                  :disabled="disabledAll"
                />
                <label class="label"
                  ><i
                    v-show="
                      resultData.ST_C_AUTO_AUDIT_ITEM.TOTAL_AMOUNT.IS_OPEN
                    "
                    >*</i
                  >总金额(元)：</label
                >
                <div class="condition-input1">
                  <div
                    v-for="(item, index) in resultData.ST_C_AUTO_AUDIT_ITEM
                      .TOTAL_AMOUNT.TOTAL_AMT_ITEM"
                    :key="index"
                    style="marginbottom: 5px"
                  >
                    <Input
                      v-model="item.GREATER"
                      style="width: 95px"
                      @on-change="modify"
                      placeholder="大于等于"
                      :disabled="disabledAll"
                    />
                    -
                    <Input
                      v-model="item.LESS"
                      style="width: 95px"
                      @on-blur="bothChange(index)"
                      @on-change="modify"
                      placeholder="小于"
                      :disabled="disabledAll"
                    />
                    <Icon
                      style="font-size: 26px; color: red"
                      type="ios-add"
                      @click="mdAdd"
                      v-if="
                        resultData.ST_C_AUTO_AUDIT_ITEM.TOTAL_AMOUNT
                          .TOTAL_AMT_ITEM.length ==
                          index + 1 && !disabledAll
                      "
                    />

                    <Icon
                      style="font-size: 26px; color: red"
                      type="ios-remove"
                      @click="fndel(index)"
                      v-if="
                        resultData.ST_C_AUTO_AUDIT_ITEM.TOTAL_AMOUNT
                          .TOTAL_AMT_ITEM.length ==
                          index + 1 && !disabledAll
                      "
                    />
                  </div>
                </div>
              </div>
              <div class="switch-content">
                <i-switch
                  v-model="
                    resultData.ST_C_AUTO_AUDIT_ITEM.RECEIVING_ADDRESS.IS_OPEN
                  "
                  class="switch"
                  size="small"
                  :disabled="disabledAll"
                />
                <label class="label"
                  ><i
                    v-show="
                      resultData.ST_C_AUTO_AUDIT_ITEM.RECEIVING_ADDRESS.IS_OPEN
                    "
                    >*</i
                  >收货地址：</label
                >
                <div class="condition-input">
                  <Input
                    v-model="
                      resultData.ST_C_AUTO_AUDIT_ITEM.RECEIVING_ADDRESS.INFO
                    "
                    style="width: 500px"
                    @on-change="modify"
                    placeholder="包含关键字进行人工审核；多个关键字可依次填写，使用中文“，”隔开"
                    :disabled="disabledAll"
                  />
                </div>
              </div>
              <div class="switch-content">
                <i-switch
                  v-model="
                    resultData.ST_C_AUTO_AUDIT_ITEM.BUYER_MESSAGE.IS_OPEN
                  "
                  class="switch"
                  size="small"
                  :disabled="disabledAll"
                />
                <label class="label">买家留言：</label>
                <div class="condition-input">
                  <Input
                    v-model="resultData.ST_C_AUTO_AUDIT_ITEM.BUYER_MESSAGE.INFO"
                    style="width: 500px"
                    @on-change="modify"
                    placeholder="为空默认为有备注信息进行人工审核；多个关键字可依次填写，使用中文“，”隔开。"
                    :disabled="disabledAll"
                  />
                </div>
              </div>
              <div class="switch-content">
                <i-switch
                  v-model="resultData.ST_C_AUTO_AUDIT_ITEM.SELLER_NOTES.IS_OPEN"
                  class="switch"
                  size="small"
                  @on-change="modify"
                  :disabled="disabledAll"
                />
                <label class="label">卖家备注：</label>
                <div class="condition-input">
                  <Input
                    v-model="resultData.ST_C_AUTO_AUDIT_ITEM.SELLER_NOTES.INFO"
                    style="width: 500px"
                    @on-change="modify"
                    placeholder="为空默认为有备注信息进行人工审核；多个关键字可依次填写，使用中文“，”隔开。"
                    :disabled="disabledAll"
                  />
                </div>
              </div>
              <div class="switch-content">
                <i-switch
                  v-model="resultData.ST_C_AUTO_AUDIT_ITEM.PRO_INFO.IS_OPEN"
                  class="switch"
                  size="small"
                  :disabled="disabledAll"
                />
                <label class="label">商品信息：</label>
                <div class="condition-input">
                  <RadioGroup
                    v-model="resultData.ST_C_AUTO_AUDIT_ITEM.PRO_INFO.TYPE"
                    style="paddingtop: 5px"
                  >
                    <Radio label="9" :disabled="disabledAll">系统SKU编码</Radio>
                    <Radio label="10" :disabled="disabledAll">平台SKUID</Radio>
                  </RadioGroup>
                  <Input
                    v-model="resultData.ST_C_AUTO_AUDIT_ITEM.PRO_INFO.INFO"
                    style="width: 500px"
                    @on-change="modify"
                    placeholder="等于关键字进行人工审核；多个关键字可依次填写，使用中文“，”隔开。"
                    :disabled="disabledAll"
                  />
                </div>
              </div>
            </div>
          </div>
        </Panel>
      </Collapse>
      <div class="customized-detail-table">
        <div v-show="id != '-1'">
          <OmsLabel
            :label-list="label.labelList"
            :label-default-value="label.labelDefaultValue"
          >
          </OmsLabel>
          <div>
            <SubTable :component-data="subTableConfig"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import auditOrderStrategy from '@/js/pages/strategyPlatform/auditOrderStrategy';
export default auditOrderStrategy;
</script>

<style scoped lang="less">
@import '~@/css/pages/strategyPlatform/auditOrderStrategy.less';
</style>

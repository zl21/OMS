<template>
  <div class="auto-check">
    <div class="operate left">
      <Button
        v-for="(item, i) in oc"
        :key="i"
        :custom-icon="''"
        :ghost="true"
        :size="'small'"
        :type="'error'"
        class="operate-btn"
        @click.native="item.clickEv"
      >
        {{ item.text }}
      </Button>
    </div>

    <Tabs value="name1">
      <TabPane
        label="基本信息"
        name="name1"
      >
        <Form
          ref="formValidate"
          :label-width="150"
          :model="info"
        >
          <Collapse v-model="collapseShow">
            <Panel name="1">
              基础资料
              <div
                slot="content"
                class="content"
              >
                <Row>
                  <Col span="8" />
                  <FormItem label="店铺名称：">
                    <Input
                      v-model="info.CP_C_SHOP_TITLE"
                      disabled
                      size="small"
                    />
                  </FormItem>
                  </Col>
                  <Col span="4" />
                  <FormItem label="启用自动审核：">
                    <Checkbox
                      v-model="IS_AUTOCHECK_ORDER"
                      size="small"
                      @on-change="setResult('IS_AUTOCHECK_ORDER')"
                    >
&nbsp;
                    </Checkbox>
                  </FormItem>
                  </Col>
                  <Col span="8" />
                  <FormItem label="等待审核时间">
                    <Col span="20" />
                    <Input
                      v-model="info.WAIT_TIME"
                      size="small"
                      :maxlength="5"
                      @on-change="setResult('WAIT_TIME')"
                    />
                    </Col>
                    <Col span="4" />
                    分钟
                    </Col>
                  </FormItem>
                  </Col>
                  <Col span="4">
                    <FormItem label="检查可合并订单：">
                      <Checkbox
                        @on-change="setResult('IS_MERGE_ORDER')"
                        size="small"
                        v-model="IS_MERGE_ORDER"
                      >&nbsp;
                      </Checkbox>
                    </FormItem>
                  </Col>
                  <Col span="8">
                    <FormItem label="hold单等待时间：">
                      <Col span="20">
                        <Input
                          size="small"
                          v-model="info.HOLD_WAIT_TIME"
                          @on-change="setResult('HOLD_WAIT_TIME')"
                          :maxlength="5"
                        />
                      </Col>
                      <Col span="4">
                        分钟
                      </Col>
                    </FormItem>
                  </Col>
                  <Col span="8">
                    <FormItem label="反审核等待时间：">
                      <Col span="20">
                        <Input
                          size="small"
                          v-model="info.UN_AUDIT_WAIT_TIME"
                          @on-change="setResult('UN_AUDIT_WAIT_TIME')"
                          :maxlength="5"
                        />
                      </Col>
                      <Col span="4">
                        分钟
                      </Col>
                    </FormItem>
                  </Col>
                </Row>
              </div>
            </Panel>
            <Panel name="auditCondition">
              审核条件
              <div
                slot="content"
                class="content"
              >
                <Row>
                  <Col
                    colspan="2"
                    span="2"
                    style="padding-top: 10px;"
                  />
                  <Checkbox
                    v-model="effectiveCondition[0].value"
                    size="small"
                    @on-change="setResult('effectiveCondition')"
                  >
&nbsp;
                  </Checkbox>
                  </Col>
                  <Col span="10" />
                  <FormItem label="订单金额（元）">
                    <Row>
                      <Col span="10" />
                      <Input
                        v-model="info.AUDIT_PRICE_DOWN"
                        placeholder
                        size="small"
                        :maxlength="10"
                        @on-change="setResult('AUDIT_PRICE')"
                      />
                      </Col>
                      <Col
                        span="4"
                        style="text-align: center;"
                      />-</Col>
                      <Col span="10" />
                      <Input
                        v-model="info.AUDIT_PRICE_UP"
                        placeholder
                        size="small"
                        :maxlength="10"
                        @on-change="setResult('AUDIT_PRICE')"
                      />
                      </Col>
                    </Row>
                  </FormItem>
                  </Col>
                  <Col span="10" />
                  <FormItem label="等待">
                    <Col span="4" />
                    <Input
                      v-model="info.AUDIT_WAIT_TIME"
                      size="small"
                      :maxlength="5"
                      @on-change="setResult('AUDIT_WAIT_TIME')"
                    />
                    </Col>
                    分钟后自动审核，满足限制条件的订单需进行人工审核
                  </FormItem>
                  </Col>
                </Row>
              </div>
            </Panel>
            <Panel name="2">
              限制条件
              <div
                slot="content"
                class="content"
              >
                <Row>
                  <Col
                    span="24"
                    style="margin-bottom: 10px;"
                  />满足以下条件的订单需要人工审核</Col>
                </Row>
                <Row>
                  <FormItem label="订单类型：">
                    <Checkbox
                      :indeterminate="indeterminate"
                      :value="checkAll"
                      size="small"
                      style="float: left; display: inline-block;"
                      @click.prevent.native="handleCheckAll()"
                    >
                      全选
                    </Checkbox>
                    <CheckboxGroup
                      v-model="orderType"
                      size="small"
                      @on-change="setResult('orderType')"
                    >
                      <Checkbox label="1">
                        正常订单
                      </Checkbox>
                      <Checkbox label="2">
                        预售订单
                      </Checkbox>
                      <!--                      <Checkbox label="3">补发订单</Checkbox>-->
                      <!--                      <Checkbox label="4">虚拟订单</Checkbox>-->
                      <Checkbox label="5">
                        换货订单
                      </Checkbox>
                      <Checkbox label="6">
                        货到付款
                      </Checkbox>
                      <Checkbox label="7">
                        手工订单
                      </Checkbox>
                    </CheckboxGroup>
                  </FormItem>
                </Row>
                <Row>
                  <Col
                    colspan="2"
                    span="2"
                    style="padding-top: 10px;"
                  />
                  <Checkbox
                    v-model="effectiveCondition[1].value"
                    size="small"
                    @on-change="setResult('effectiveCondition')"
                  >
&nbsp;
                  </Checkbox>
                  </Col>
                  <Col span="20" />
                  <FormItem label="付款时间：">
                    <Row>
                      <Col span="10" />
                      <DatePicker
                        v-model="info.beginTime"
                        format="yyyy-MM-dd HH:mm:ss"
                        size="small"
                        style="width: 200px"
                        type="datetime"
                        @on-change="setResult('beginEndTime')"
                      />
                      </Col>
                      <Col
                        span="4"
                        style="text-align: center;"
                      />-</Col>
                      <Col span="10" />
                      <DatePicker
                        v-model="info.endTime"
                        format="yyyy-MM-dd HH:mm:ss"
                        size="small"
                        style="width: 200px"
                        type="datetime"
                        @on-change="setResult('beginEndTime')"
                      />
                      </Col>
                    </Row>
                  </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col
                    colspan="2"
                    span="2"
                    style="padding-top: 10px;"
                  />
                  <Checkbox
                    v-model="effectiveCondition[2].value"
                    size="small"
                    @on-change="setResult('effectiveCondition')"
                  >
&nbsp;
                  </Checkbox>
                  </Col>
                  <Col span="20" />
                  <FormItem label="订单金额（元）">
                    <Row>
                      <Col span="10" />
                      <Input
                        v-model="info.LIMIT_PRICE_DOWN"
                        placeholder
                        size="small"
                        :maxlength="10"
                        @on-change="setResult('LIMIT_PRICE')"
                      />
                      </Col>
                      <Col
                        span="4"
                        style="text-align: center;"
                      />-</Col>
                      <Col span="10" />
                      <Input
                        v-model="info.LIMIT_PRICE_UP"
                        placeholder
                        size="small"
                        :maxlength="10"
                        @on-change="setResult('LIMIT_PRICE')"
                      />
                      </Col>
                    </Row>
                  </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col
                    colspan="2"
                    span="2"
                    style="padding-top: 10px;"
                  />
                  <Checkbox
                    v-model="effectiveCondition[3].value"
                    size="small"
                    @on-change="setResult('effectiveCondition')"
                  >
&nbsp;
                  </Checkbox>
                  </Col>
                  <Col span="20" />
                  <FormItem label="收货省份">
                    <DropDownSelectFilter
                      :data="data1"
                      :data-empty-message="dataEmptyMessage"
                      :default-selected="defaultSelected"
                      :is-back-row-item="true"
                      :page-size="pageSize"
                      :show-colname-key="'show'"
                      :single="false"
                      :total-row-count="totalRowCount"
                      @on-clear="clearSelect"
                      @on-fkrp-selected="selected"
                      @on-input-value-change="InputValueChange"
                      @on-page-change="changePage1"
                    />
                  </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col
                    colspan="2"
                    span="2"
                    style="padding-top: 10px;"
                  />
                  <Checkbox
                    v-model="effectiveCondition[4].value"
                    size="small"
                    @on-change="setResult('effectiveCondition')"
                  >
&nbsp;
                  </Checkbox>
                  </Col>
                  <Col span="20" />
                  <FormItem label="收货地址">
                    <Input
                      v-model="info.RECEIVER_ADDRESS"
                      placeholder="包含关键字进行人工审核；多个关键字可依次填写，使用中文“，”隔开"
                      size="small"
                      @on-change="setResult('RECEIVER_ADDRESS')"
                    />
                  </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col
                    colspan="2"
                    span="2"
                    style="padding-top: 10px;"
                  />
                  <Checkbox
                    v-model="effectiveCondition[5].value"
                    size="small"
                    @on-change="setResult('effectiveCondition')"
                  >
&nbsp;
                  </Checkbox>
                  </Col>
                  <Col span="20" />
                  <FormItem label="买家留言">
                    <Input
                      v-model="info.BUYER_REMARK"
                      placeholder="为空默认为有备注信息进行人工审核；多个关键字可依次填写，使用中文“，”隔开。"
                      size="small"
                      @on-change="setResult('BUYER_REMARK')"
                    />
                  </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col
                    colspan="2"
                    span="2"
                    style="padding-top: 10px;"
                  />
                  <Checkbox
                    v-model="effectiveCondition[6].value"
                    size="small"
                    @on-change="setResult('effectiveCondition')"
                  >
&nbsp;
                  </Checkbox>
                  </Col>
                  <Col span="20" />
                  <FormItem label="卖家备注">
                    <Input
                      v-model="info.SELLER_REMARK"
                      placeholder="为空默认为有备注信息进行人工审核；多个关键字可依次填写，使用中文“，”隔开。"
                      size="small"
                      @on-change="setResult('SELLER_REMARK')"
                    />
                  </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col
                    colspan="2"
                    span="2"
                    style="padding-top: 10px;"
                  />
                  <Checkbox
                    v-model="effectiveCondition[7].value"
                    size="small"
                    @on-change="setResult('effectiveCondition')"
                  >
&nbsp;
                  </Checkbox>
                  </Col>
                  <Col span="20" />
                  <FormItem label="平台SKU编码">
                    <Row>
                      <Col span="6" />
                      <RadioGroup
                        v-model="EXCLUDE_SKU_TYPE"
                        @on-change="setResult('EXCLUDE_SKU_TYPE')"
                      >
                        <Radio
                          label="1"
                          size="small"
                        >
                          包含
                        </Radio>
                        <Radio
                          label="2"
                          size="small"
                        >
                          排除
                        </Radio>
                      </RadioGroup>
                      </Col>
                      <Col span="18" />
                      <Input
                        v-model="info.SKU_CONTENT"
                        placeholder="输入多个商品条码，使用中文“，”隔开"
                        size="small"
                        @on-change="setResult('SKU_CONTENT');"
                      />
                      </Col>
                    </Row>
                  </FormItem>
                  </Col>
                </Row>
              </div>
            </Panel>
          </Collapse>
        </Form>
      </TabPane>
      <TabPane
        label="操作日志"
        name="name2"
      >
        <!-- <Collapse v-model="collapseLog">
          <Panel name="1">
            日志
            <div class="content" slot="content">
              <Row>
                <Col span="8">
                  <FormItem label="创建人：">
                    <Input v-model="info.OWNERENAME" size="small" placeholder readonly />
                  </FormItem>
                </Col>
                <Col span="8">
                  <FormItem label="创建时间：">
                    <Input v-model="CREATIONDATE" size="small" placeholder readonly />
                  </FormItem>
                </Col>
                <Col span="8">
                  <FormItem label="修改人：">
                    <Input v-model="info.MODIFIERENAME" size="small" placeholder readonly />
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="8">
                  <FormItem label="修改时间：">
                    <Input v-model="MODIFIEDDATE" size="small" placeholder readonly />
                  </FormItem>
                </Col>
              </Row>
            </div>
          </Panel>
        </Collapse>-->
        <logTable
          :id="$route.params.customizedModuleId"
          :table-name="$route.params.customizedModuleName"
        />
      </TabPane>
    </Tabs>
  </div>
</template>
<script>
  import orderAutoCheck from '@/js/pages/strategyPlatform/orderAutoCheck';

  export default orderAutoCheck;
</script>
<style lang="less" type="text/less">
@import "~@/assets/css/css_1_3/theme.less";
@import '~@/css/pages/strategyPlatform/orderAutoCheck.less';
</style>

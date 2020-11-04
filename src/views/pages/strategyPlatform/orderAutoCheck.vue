<template>
  <div class="auto-check">
    <div class="operate left">
      <Button
        :custom-icon="''"
        :ghost="true"
        :key="i"
        :size="'small'"
        :type="'error'"
        @click.native="item.clickEv"
        class="operate-btn"
        v-for="(item, i) in oc"
      >{{item.text}}
      </Button>
    </div>

    <Tabs value="name1">
      <TabPane label="基本信息" name="name1">
        <Form :label-width="150" :model="info" ref="formValidate">
          <Collapse v-model="collapseShow">
            <Panel name="1">
              基础资料
              <div class="content" slot="content">
                <Row>
                  <Col span="8">
                    <FormItem label="店铺名称：">
                      <Input disabled size="small" v-model="info.CP_C_SHOP_TITLE"/>
                    </FormItem>
                  </Col>
                  <Col span="4">
                    <FormItem label="启用自动审核：">
                      <Checkbox
                        @on-change="setResult('IS_AUTOCHECK_ORDER')"
                        size="small"
                        v-model="IS_AUTOCHECK_ORDER"
                      >&nbsp;
                      </Checkbox>
                    </FormItem>
                  </Col>
                  <Col span="8">
                    <FormItem label="等待审核时间">
                      <Col span="20">
                        <Input
                          size="small"
                          v-model="info.WAIT_TIME"
                          @on-change="setResult('WAIT_TIME')"
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
              <div class="content" slot="content">
                <Row>
                  <Col colspan="2" span="2" style="padding-top: 10px;">
                    <Checkbox
                      @on-change="setResult('effectiveCondition')"
                      size="small"
                      v-model="effectiveCondition[0].value"
                    >&nbsp;
                    </Checkbox>
                  </Col>
                  <Col span="10">
                    <FormItem label="订单金额（元）">
                      <Row>
                        <Col span="10">
                          <Input
                            @on-change="setResult('AUDIT_PRICE')"
                            placeholder
                            size="small"
                            v-model="info.AUDIT_PRICE_DOWN"
                            :maxlength="10"
                          />
                        </Col>
                        <Col span="4" style="text-align: center;">-</Col>
                        <Col span="10">
                          <Input
                            @on-change="setResult('AUDIT_PRICE')"
                            placeholder
                            size="small"
                            v-model="info.AUDIT_PRICE_UP"
                            :maxlength="10"
                          />
                        </Col>
                      </Row>
                    </FormItem>
                  </Col>
                  <Col span="10">
                    <FormItem label="等待">
                      <Col span="4">
                        <Input
                          @on-change="setResult('AUDIT_WAIT_TIME')"
                          size="small"
                          v-model="info.AUDIT_WAIT_TIME"
                          :maxlength="5"
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
              <div class="content" slot="content">
                <Row>
                  <Col span="24" style="margin-bottom: 10px;">满足以下条件的订单需要人工审核</Col>
                </Row>
                <Row>
                  <FormItem label="订单类型：">
                    <Checkbox
                      :indeterminate="indeterminate"
                      :value="checkAll"
                      @click.prevent.native="handleCheckAll()"
                      size="small"
                      style="float: left; display: inline-block;"
                    >全选
                    </Checkbox>
                    <CheckboxGroup
                      @on-change="setResult('orderType')"
                      size="small"
                      v-model="orderType"
                    >
                      <Checkbox label="1">正常订单</Checkbox>
                      <Checkbox label="2">预售订单</Checkbox>
<!--                      <Checkbox label="3">补发订单</Checkbox>-->
<!--                      <Checkbox label="4">虚拟订单</Checkbox>-->
                      <Checkbox label="5">换货订单</Checkbox>
                      <Checkbox label="6">货到付款</Checkbox>
                      <Checkbox label="7">手工订单</Checkbox>
                    </CheckboxGroup>
                  </FormItem>
                </Row>
                <Row>
                  <Col colspan="2" span="2" style="padding-top: 10px;">
                    <Checkbox
                      @on-change="setResult('effectiveCondition')"
                      size="small"
                      v-model="effectiveCondition[1].value"
                    >&nbsp;
                    </Checkbox>
                  </Col>
                  <Col span="20">
                    <FormItem label="付款时间：">
                      <Row>
                        <Col span="10">
                          <DatePicker
                            @on-change="setResult('beginEndTime')"
                            format="yyyy-MM-dd HH:mm:ss"
                            size="small"
                            style="width: 200px"
                            type="datetime"
                            v-model="info.beginTime"
                          ></DatePicker>
                        </Col>
                        <Col span="4" style="text-align: center;">-</Col>
                        <Col span="10">
                          <DatePicker
                            @on-change="setResult('beginEndTime')"
                            format="yyyy-MM-dd HH:mm:ss"
                            size="small"
                            style="width: 200px"
                            type="datetime"
                            v-model="info.endTime"
                          ></DatePicker>
                        </Col>
                      </Row>
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col colspan="2" span="2" style="padding-top: 10px;">
                    <Checkbox
                      @on-change="setResult('effectiveCondition')"
                      size="small"
                      v-model="effectiveCondition[2].value"
                    >&nbsp;
                    </Checkbox>
                  </Col>
                  <Col span="20">
                    <FormItem label="订单金额（元）">
                      <Row>
                        <Col span="10">
                          <Input
                            @on-change="setResult('LIMIT_PRICE')"
                            placeholder
                            size="small"
                            v-model="info.LIMIT_PRICE_DOWN"
                            :maxlength="10"
                          />
                        </Col>
                        <Col span="4" style="text-align: center;">-</Col>
                        <Col span="10">
                          <Input
                            @on-change="setResult('LIMIT_PRICE')"
                            placeholder
                            size="small"
                            v-model="info.LIMIT_PRICE_UP"
                            :maxlength="10"
                          />
                        </Col>
                      </Row>
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col colspan="2" span="2" style="padding-top: 10px;">
                    <Checkbox
                      @on-change="setResult('effectiveCondition')"
                      size="small"
                      v-model="effectiveCondition[3].value"
                    >&nbsp;
                    </Checkbox>
                  </Col>
                  <Col span="20">
                    <FormItem label="收货省份">
                      <DropDownSelectFilter
                        :data="data1"
                        :dataEmptyMessage="dataEmptyMessage"
                        :defaultSelected="defaultSelected"
                        :isBackRowItem="true"
                        :pageSize="pageSize"
                        :showColnameKey="'show'"
                        :single="false"
                        :totalRowCount="totalRowCount"
                        @on-clear="clearSelect"
                        @on-fkrp-selected="selected"
                        @on-input-value-change="InputValueChange"
                        @on-page-change="changePage1"
                      ></DropDownSelectFilter>
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col colspan="2" span="2" style="padding-top: 10px;">
                    <Checkbox
                      @on-change="setResult('effectiveCondition')"
                      size="small"
                      v-model="effectiveCondition[4].value"
                    >&nbsp;
                    </Checkbox>
                  </Col>
                  <Col span="20">
                    <FormItem label="收货地址">
                      <Input
                        @on-change="setResult('RECEIVER_ADDRESS')"
                        placeholder="包含关键字进行人工审核；多个关键字可依次填写，使用中文“，”隔开"
                        size="small"
                        v-model="info.RECEIVER_ADDRESS"
                      />
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col colspan="2" span="2" style="padding-top: 10px;">
                    <Checkbox
                      @on-change="setResult('effectiveCondition')"
                      size="small"
                      v-model="effectiveCondition[5].value"
                    >&nbsp;
                    </Checkbox>
                  </Col>
                  <Col span="20">
                    <FormItem label="买家留言">
                      <Input
                        @on-change="setResult('BUYER_REMARK')"
                        placeholder="为空默认为有备注信息进行人工审核；多个关键字可依次填写，使用中文“，”隔开。"
                        size="small"
                        v-model="info.BUYER_REMARK"
                      />
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col colspan="2" span="2" style="padding-top: 10px;">
                    <Checkbox
                      @on-change="setResult('effectiveCondition')"
                      size="small"
                      v-model="effectiveCondition[6].value"
                    >&nbsp;
                    </Checkbox>
                  </Col>
                  <Col span="20">
                    <FormItem label="卖家备注">
                      <Input
                        @on-change="setResult('SELLER_REMARK')"
                        placeholder="为空默认为有备注信息进行人工审核；多个关键字可依次填写，使用中文“，”隔开。"
                        size="small"
                        v-model="info.SELLER_REMARK"
                      />
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col colspan="2" span="2" style="padding-top: 10px;">
                    <Checkbox
                      @on-change="setResult('effectiveCondition')"
                      size="small"
                      v-model="effectiveCondition[7].value"
                    >&nbsp;
                    </Checkbox>
                  </Col>
                  <Col span="20">
                    <FormItem label="平台SKU编码">
                      <Row>
                        <Col span="6">
                          <RadioGroup
                            @on-change="setResult('EXCLUDE_SKU_TYPE')"
                            v-model="EXCLUDE_SKU_TYPE"
                          >
                            <Radio label="1" size="small">包含</Radio>
                            <Radio label="2" size="small">排除</Radio>
                          </RadioGroup>
                        </Col>
                        <Col span="18">
                          <Input
                            @on-change="setResult('SKU_CONTENT');"
                            placeholder="输入多个商品条码，使用中文“，”隔开"
                            size="small"
                            v-model="info.SKU_CONTENT"
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
      <TabPane label="操作日志" name="name2">
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
        <logTable :id="$route.params.customizedModuleId" :tableName="$route.params.customizedModuleName"></logTable>
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

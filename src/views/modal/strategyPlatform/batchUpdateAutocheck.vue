<template>
    <div class="batchUpdateAutocheck">
        <Spin
      v-show="loading"
      fix
    >
      <Icon
        type="ios-loading"
        size="18"
        class="demo-spin-icon-load"
      />
      <div>Loading</div>
    </Spin>
    <p>已选中批量修改记录数: {{idArray.length}}行</p>
    <div class="public-content" >
      <Form ref="formValidate" :label-width="120" :model="info">
            <Collapse v-model="collapseShow">
              <Panel name="1">
                基础资料
                <div slot="content" class="content">
                  <Row>
                    <Col span="6">
                      <FormItem label="启用自动审核：">
                        <Select v-model="IS_AUTOCHECK_ORDER" @on-change="setResult('IS_AUTOCHECK_ORDER')">
                            <Option value="Y">是</Option>
                            <Option value="N">否</Option>
                        </Select>
                      </FormItem>
                    </Col>
                    <Col span="6">
                      <FormItem label="检查可合并订单：">
                        <Select v-model="IS_MERGE_ORDER" @on-change="setResult('IS_MERGE_ORDER')">
                            <Option value="Y">是</Option>
                            <Option value="N">否</Option>
                        </Select>
                      </FormItem>
                    </Col>
                    <Col span="6">
                      <FormItem label="零元订单自动审核：">
                        <Select v-model="IS_ZERO_AUTOCHECK" @on-change="setResult('IS_ZERO_AUTOCHECK')">
                            <Option value="Y">是</Option>
                            <Option value="N">否</Option>
                        </Select>
                      </FormItem>
                    </Col>
                    <Col span="6">
                      <FormItem label="全赠品订单开启自动审核：" class="width">
                        <Select v-model="IS_FULL_GIFT_ORDER" @on-change="setResult('IS_FULL_GIFT_ORDER')">
                            <Option value="Y">是</Option>
                            <Option value="N">否</Option>
                        </Select>
                      </FormItem>
                    </Col>

                    <Col span="6">
                      <FormItem label="等待审核时间：">
                        <Col span="20">
                          <Input v-model="info.WAIT_TIME" size="small" :maxlength="5" @on-change="setResult('WAIT_TIME')" />
                        </Col>
                        <Col span="4" style="text-align: right"> 分钟 </Col>
                      </FormItem>
                    </Col>

                    <Col span="6">
                      <FormItem label="反审核等待时间：">
                        <Col span="20">
                          <Input v-model="info.ANTI_AUDIT_WAIT_TIME" size="small" :maxlength="5" @on-change="setResult('ANTI_AUDIT_WAIT_TIME')" />
                        </Col>
                        <Col span="4" style="text-align: right"> 分钟 </Col>
                      </FormItem>
                    </Col>

                    <Col span="6">
                      <FormItem label="hold单等待时间：">
                        <Col span="20">
                          <Input v-model="info.HOLD_WAIT_TIME" size="small" :maxlength="5" @on-change="setResult('HOLD_WAIT_TIME')" />
                        </Col>
                        <Col span="4" style="text-align: right"> 分钟 </Col>
                      </FormItem>
                    </Col>
                    <Col span="6">
                      <FormItem label="自动审核货到付款：" class="width">
                        <Select v-model="IS_AUTOCHECK_PAY" @on-change="setResult('IS_AUTOCHECK_PAY')">
                            <Option value="Y">是</Option>
                            <Option value="N">否</Option>
                        </Select>
                      </FormItem>
                    </Col>

                    <Col span="6">
                      <FormItem label="排除物流公司：">
                        <Col span="24">
                          <DropDownSelectFilter
                            :single="false"
                            :data="CP_C_LOGISTICS_ID_SELECT.datas"
                            :total-row-count="CP_C_LOGISTICS_ID_SELECT.totalRowCount"
                            :page-size="CP_C_LOGISTICS_ID_SELECT.pageSize"
                            :show-colname-key="'show'"
                            :data-empty-message="'暂无数据'"
                            :columns="CP_C_LOGISTICS_ID_SELECT.datas.tabth"
                            :auto-data="CP_C_LOGISTICS_ID_SELECT.autoData"
                            :defaultSelected="CP_C_LOGISTICS_ID_SELECT.defaultSelected"
                            @on-page-change="changePage1"
                            @on-fkrp-selected="logisticSelected"
                            @on-clear="logisticClear"
                            @on-input-value-change="logisticInputValueChange"
                          />
                        </Col>
                      </FormItem>
                    </Col>
                    <Col span="6">
                      <FormItem label="手工订单：">
                        <Checkbox v-model="IS_MANUAL_ORDER" size="small" @on-change="setResult('IS_MANUAL_ORDER')"> &nbsp; </Checkbox>
                      </FormItem>
                    </Col>
                  </Row>
                </div>
              </Panel>
              <Panel name="2">
                限制条件
                <div slot="content" class="content">
                  <Row>
                    <Col span="24" style="margin-bottom: 10px">满足以下条件的订单需要人工审核</Col>
                  </Row>
                  <Row>
                    <Col span='2' style="padding-top:8px">订单类型: </Col>
                    <Col span='5'>
                      <FormItem label="是否正常订单：">
                        <Select v-model="orderType[0]" @on-change="setResult('orderType')">
                          <Option value='1'>是</Option>
                          <Option value='N'>否</Option>
                        </Select>
                      </FormItem>
                    </Col>
                    <Col span='5'>
                      <FormItem label="是否预售订单：">
                        <Select v-model="orderType[1]" @on-change="setResult('orderType')">
                          <Option value='2'>是</Option>
                          <Option value='N'>否</Option>
                        </Select>
                      </FormItem>
                    </Col>
                    <Col span='5'>
                      <FormItem label="是否换货订单：">
                        <Select v-model="orderType[2]" @on-change="setResult('orderType')">
                          <Option value='5'>是</Option>
                          <Option value='N'>否</Option>
                        </Select>
                      </FormItem>
                    </Col>
                    <!-- <FormItem label="订单类型：">
                      <Checkbox :indeterminate="indeterminate" :value="checkAll" size="small" style="float: left; display: inline-block" @click.prevent.native="handleCheckAll()"> 全选 </Checkbox>
                      <CheckboxGroup v-model="orderType" size="small" @on-change="setResult('orderType')">
                        <Checkbox label="1"> 正常订单 </Checkbox>
                        <Checkbox label="2"> 预售订单 </Checkbox>
                        <Checkbox label="5"> 换货订单 </Checkbox>
                      </CheckboxGroup>
                    </FormItem> -->
                  </Row>
                  <Row>
                      <!-- <Checkbox v-model="effectiveCondition[1].value" size="small" @on-change="setResult('effectiveCondition')"> &nbsp; </Checkbox> -->
                      <Col colspan="1"  span="1" style="padding-top:5px"><span>启用:</span></Col>
                    <Col colspan="1" span="1">
                          <Select v-model="effectiveCondition[1].value" @on-change="setResult('effectiveCondition')">
                              <Option value="Y">是</Option>
                              <Option value="N">否</Option>
                          </Select>
                    </Col>
                    <Col span="11">
                      <i style="position:absolute;top:10px;left:20px;color:red" v-show="effectiveCondition[1].value== 'Y'">*</i>
                      <FormItem label="付款时间：">
                        <Row>
                          <Col span="11">
                            <DatePicker v-model="info.beginTime" format="yyyy-MM-dd HH:mm:ss" size="small" style="width: 200px" type="datetime" @on-change="setResult('beginEndTime')" />
                          </Col>
                          <Col span="2" style="text-align: center">-</Col>
                          <Col span="11">
                            <DatePicker v-model="info.endTime" format="yyyy-MM-dd HH:mm:ss" size="small" style="width: 200px" type="datetime" @on-change="setResult('beginEndTime')" />
                          </Col>
                        </Row>
                      </FormItem>
                    </Col>
                  </Row>
                  <Row>
                    <Col colspan="1"  span="1" style="padding-top:5px"><span>启用:</span></Col>
                    <Col colspan="1" span="1">
                          <Select v-model="effectiveCondition[2].value" @on-change="setResult('effectiveCondition')">
                              <Option value="Y">是</Option>
                              <Option value="N">否</Option>
                          </Select>
                    </Col>
                    <Col span="11">
                    <i style="position:absolute;top:10px;left:8px;color:red" v-show="effectiveCondition[2].value == 'Y'">*</i>
                      <FormItem label="订单金额（元）:">
                        <Row>
                          <Col span="11">
                            <!--去除:maxlength="10"-->
                            <Input v-model.number="info.LIMIT_PRICE_DOWN" placeholder size="small" @on-change="setResult('LIMIT_PRICE_DOWN', $event)" />
                          </Col>
                          <Col span="2" style="text-align: center">-</Col>
                          <Col span="11">
                            <Input v-model="info.LIMIT_PRICE_UP" placeholder size="small" :maxlength="10" @on-change="setResult('LIMIT_PRICE_UP', $event)" />
                          </Col>
                        </Row>
                      </FormItem>
                    </Col>
                  </Row>
                  <Row>
                      <!-- <Checkbox v-model="effectiveCondition[4].value" size="small" @on-change="setResult('effectiveCondition')"> &nbsp; </Checkbox> -->
                      <Col colspan="1"  span="1" style="padding-top:5px"><span>启用:</span></Col>
                      <Col colspan="1" span="1">
                            <Select v-model="effectiveCondition[4].value" @on-change="setResult('effectiveCondition')">
                                <Option value="Y">是</Option>
                                <Option value="N">否</Option>
                            </Select>
                      </Col>
                    <Col span="11">
                    <i style="position:absolute;top:10px;left:30px;color:red" v-show="effectiveCondition[4].value == 'Y'">*</i>
                      <FormItem label="收货地址:">
                        <Input v-model="info.RECEIVER_ADDRESS" placeholder="包含关键字进行人工审核；多个关键字可依次填写，使用中文“，”隔开" size="small" @on-change="setResult('RECEIVER_ADDRESS')" />
                      </FormItem>
                    </Col>
                  </Row>
                  <Row>
                      <!-- <Checkbox v-model="effectiveCondition[5].value" size="small" @on-change="setResult('effectiveCondition')"> &nbsp; </Checkbox> -->
                      <Col colspan="1"  span="1" style="padding-top:5px"><span>启用:</span></Col>
                      <Col colspan="1" span="1">
                            <Select v-model="effectiveCondition[5].value" @on-change="setResult('effectiveCondition')">
                                <Option value="Y">是</Option>
                                <Option value="N">否</Option>
                            </Select>
                      </Col>
                    <Col span="11">
                      <FormItem label="买家留言:">
                        <Input v-model="info.BUYER_REMARK" placeholder="为空默认为有备注信息进行人工审核；多个关键字可依次填写，使用中文“，”隔开。" size="small" @on-change="setResult('BUYER_REMARK')" />
                      </FormItem>
                    </Col>
                  </Row>
                  <Row>
                      <!-- <Checkbox v-model="effectiveCondition[6].value" size="small" @on-change="setResult('effectiveCondition')"> &nbsp; </Checkbox> -->
                      <Col colspan="1"  span="1" style="padding-top:5px"><span>启用:</span></Col>
                      <Col colspan="1" span="1">
                            <Select v-model="effectiveCondition[6].value" @on-change="setResult('effectiveCondition')">
                                <Option value="Y">是</Option>
                                <Option value="N">否</Option>
                            </Select>
                      </Col>
                    <Col span="11">
                      <FormItem label="卖家备注">
                        <Input v-model="info.SELLER_REMARK" placeholder="为空默认为有备注信息进行人工审核；多个关键字可依次填写，使用中文“，”隔开。" size="small" @on-change="setResult('SELLER_REMARK')" />
                      </FormItem>
                    </Col>
                  </Row>
                </div>
              </Panel>
            </Collapse>
          </Form>
    </div>
    <div class="operate left">
      <businessButton :btn-config="btnConfig" />
    </div>
    </div>
</template>

<script>
import batchUpdateAutocheck from '@/js/modal/strategyPlatform/batchUpdateAutocheck.js'
export default batchUpdateAutocheck
</script>

<style lang="less">
.batchUpdateAutocheck {
    width:1200px;
}
</style>
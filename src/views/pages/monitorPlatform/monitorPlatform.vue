<!--
 * @Author: your name
 * @Date: 2021-04-27 11:20:18
 * @LastEditTime: 2021-09-07 18:56:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /project-logic/commonPages/WelcomePage.vue
-->
<template>
  <div class="monitoringPlatform" v-loading="pageLoading">
    <div class="header">
      <div class="time">
        <span>更新时间：{{ header.time }}</span>
        <Icon type="icon-monitorPlat-fresh" @click="freshHandel" />
      </div>
    </div>
    <div class="main">
      <div class="mainContent mainTop">
        <div class="main01">
          <div class="mainHeader">
            <span>{{ main01.title }}</span>
            <div class="btn">
              <div v-for="(it, index) in main01.btn" :key="'m1Time' + index">
                <Button :type="it.type" @click="dayBtnHandel(it, 'main01')">{{
                  it.text
                }}</Button>
              </div>
            </div>
          </div>
          <div class="main01body">
            <div class="left">
              <div id="main01Left">
                <i>{{ main01.status_name }}</i>
              </div>
              <div class="legend">
                <template v-for="(it, index) in main01.pieData">
                  <div :key="'pieLegend' + index">
                    <span>{{ it.name }}</span> <i>{{ it.value }}</i>
                  </div>
                </template>
              </div>
            </div>
            <div class="right">
              <template v-for="(it, index) in main01.data">
                <div
                  @click="m1DomClick(it, index)"
                  class="rightItem comItem"
                  :key="'rightItem' + index"
                  :class="[it.status == 0 ? 'abnormal' : 'normal', it.clickCss]"
                >
                  <div class="title">
                    <Icon :type="it.icon" :style="{}" />
                    <span>{{ it.title }}</span>
                  </div>
                  <div class="status">{{ it.status_name }}</div>
                  <div v-if="it.status == 0" class="detail">
                    {{ it.message }} <i class="sum">{{ it.sum }}</i>
                  </div>
                </div>
              </template>
            </div>
          </div>
        </div>
        <div :class="['', 'main02']">
          <div class="mainHeader">
            <span>{{ main02.title }}</span>
            <div class="btn">
              <div
                v-for="(it, index) in main02.btnSta"
                :key="'m2Status' + index"
              >
                <Button
                  :disabled="it.disabled"
                  :type="it.type"
                  :class="it.icon ? 'iconBtn' : ''"
                  :icon="it.icon || ''"
                  @click="statusBtnHandel(it, 'main02')"
                  >{{ it.text }}</Button
                >
              </div>
            </div>
          </div>
          <div
            :class="['main02body', up, noData]"
            id="main02body"
            :style="{ height: m2Heigh + 'px' }"
            v-loading="m2Loading"
          >
            <picture v-if="noData">
              <source srcset="./img/la.png" media="(min-width: 1600px)" />
              <img src="./img/medium-car-image.jpg" alt="Car" />
              <span>暂无异常数据</span>
            </picture>
            <template v-else>
              <div
                class="m2Item comItem"
                v-for="(it, index) in main02.data"
                :key="it.id + index"
                :class="it.status == 0 ? 'abnormal' : 'normal'"
              >
                <div class="title">
                  <Icon
                    :type="it.titleIcon"
                    :style="{ 'background-color': it.color }"
                  />
                  <!-- <i :class="it.titleIcon"></i> -->
                  <span>{{ it.title }}</span>
                  <Icon :type="it.statusIcon" class="statusIcon" />
                  <!-- <i :class="['warnIcon', it.statusIcon]"></i> -->
                </div>
                <div class="content">
                  <template v-for="i in it.data">
                    <div
                      :key="i.A_sum + +new Date()"
                      :class="['itemData', i.color || '']"
                    >
                      <span>{{ i.A_name }}</span>
                      <span>{{ i.A_sum }}</span>
                    </div>
                  </template>
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>
      <div :class="['mainContent', 'main03']">
        <div class="mainHeader">
          <span>{{ main03.title }}</span>
          <div class="btn btnEx">
            <div v-for="(it, index) in main03.btn" :key="'m3Time' + index">
              <Button :type="it.type" @click="dayBtnHandel(it, 'main03')">{{
                it.text
              }}</Button>
            </div>
            <i></i>
            <div v-for="(it, index) in main03.btnSta" :key="'m3Status' + index">
              <Button
                :disabled="it.disabled"
                :type="it.type"
                :class="it.icon ? 'iconBtn' : ''"
                :icon="it.icon || ''"
                @click="statusBtnHandel(it, 'main03')"
                >{{ it.text }}</Button
              >
            </div>
          </div>
        </div>
        <div
          :class="['main03body', m3Up, m3noData]"
          id="main03body"
          :style="{ height: m3Heigh + 'px' }"
        >
          <picture v-if="m3noData">
            <source srcset="./img/la.png" media="(min-width: 1600px)" />
            <img src="./img/medium-car-image.jpg" alt="Car" />
            <span>暂无异常数据</span>
          </picture>
          <!-- <div class="main03body-main" v-show="!m3noData"> -->
          <template>
            <div
              v-show="!m3noData"
              class="m3Item comItem"
              v-for="(it, index) in main03.data"
              :key="index"
              :class="it.status == 0 ? 'abnormal' : 'normal'"
            >
              <div class="title3">
                <span>{{ it.title }}</span>
                <span>{{ it.time }}</span>
              </div>
              <div
                class="itemData"
                :id="`gaugeChart${index}`"
                style="width: 100%; height: 180px"
              ></div>
              <!-- 标题 -->
              <div class="gaugeTitle">
                <span>
                  {{ it.desc }}
                </span>
                <Tooltip placement="top-start" theme="light">
                  <Icon type="ios-help-circle-outline" />
                  <div slot="content">
                    <div class="gaugeTips">
                      积压单量说明积压单量说明积压单量说明
                    </div>
                  </div>
                </Tooltip>
              </div>
            </div>
          </template>
          <!-- </div> -->
        </div>
      </div>
      <div class="mainContent main04">
        <div class="mainHeader">
          <span>{{ main04.title }}</span>
          <div class="btn">
            <div v-for="(it, index) in main04.btnArr" :key="index">
              <Button :type="it.type" @click="geTabnormal(index)">{{
                it.text
              }}</Button>
            </div>
          </div>
        </div>
        <div class="selectBox">
          <Form :label-width="100">
            <Row>
              <Col span="6">
                <FormItem label="第三方名称：">
                  <Select v-model="main04.projectV">
                    <Option
                      v-for="item in main04.projectOption"
                      :value="item.value"
                      :key="item.value"
                      >{{ item.label }}</Option
                    >
                  </Select>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="接口：">
                  <Select
                    v-model="main04.apiV"
                    filterable
                    multiple
                    @on-change="selectCheck"
                  >
                    <Option
                      v-for="item in main04.apiOption"
                      :value="item.value"
                      :key="item.value"
                      @on-change="selectCheck"
                      >{{ item.label }}</Option
                    >
                  </Select>
                </FormItem>
              </Col>
            </Row>
          </Form>
        </div>
        <div id="mainCurve" style="widht: 100%; height: 500px"></div>
      </div>
    </div>
  </div>
</template>

<script>
import businessButton from "burgeonComponents/businessButton";
import dateUtil from "@/assets/js/__utils__/date.js";
import * as echarts from "echarts";

let dayBtnConifg = [
  {
    text: "近三天",
    type: "primary",
    webname: "threeDays",
  },
  {
    text: "昨日",
    type: "text",
    webname: "yesterday",
  },
  {
    text: "当天",
    type: "text",
    webname: "today",
  },
];
let statusBtnConifg = [
  {
    text: "全部",
    type: "primary",
    webname: "all",
  },
  {
    text: "异常",
    type: "text",
    webname: "abort",
  },
  {
    text: "",
    type: "text",
    icon: "ios-arrow-down",
    webname: "upDownIcon",
    disabled: true,
  },
];
export default {
  name: "WelcomePage",
  components: {
    OmsButton,
  },
  data() {
    return {
      m2Loading: false,
      pageLoading: false,
      m2Heigh: 0,
      m3Heigh: 0,
      noData: "",
      m3noData: "",
      up: "",
      m3Up: "",
      header: {
        time: new Date(),
      },
      main01: {
        title: "第三方监控", // 标题
        status: 0, // 状态
        status_name: "异常", // 状态文字
        btn: JSON.parse(JSON.stringify(dayBtnConifg)),
        data: [
          {
            status: 0,
            status_name: "异常",
            icon: 'icon-monitorPlat-warn', // 状态图标
            title: "平台", // 标题
            id: 'ptai',
            message: "异常单据", // 右下角展示的文字
            sum: 288, // 右下角展示的数量
            clickCss: 'clickCss', // 点击样式
          },
          {
            status: 1,
            status_name: "正常",
            icon: 'icon-monitorPlat-right',
            title: "SAP",
            id: 'sap',
            message: "异常单据",
            sum: 288,
            clickCss: '',
          },
          {
            status: 1,
            status_name: "正常",
            icon: 'icon-monitorPlat-right',
            title: "WMS",
            id: 'wms',
            message: "异常单据",
            sum: 288,
            clickCss: '',
          },
          /* {
            status: 0,
            status_name: "异常",
            icon: 'icon-monitorPlat-warn',
            title: "AG项目4",
            message: "异常单据",
            sum: 288,
            clickCss: '',
          }, */
        ],
        pieData: [
          { value: 8, name: "总数" },
          { value: 2, name: "异常数" },
          { value: 6, name: "正常数" },
        ],
      },
      main02: {
        title: "对外接口监控项目详细数据",
        btnSta: JSON.parse(JSON.stringify(statusBtnConifg)),
        data: [
          {
            titleIcon: "icon-monitorPlat-home",
            color: '#4560AB',
            id: 'p1',
            title: "平台（取消发货自动退款）",
            statusIcon: "icon-monitorPlat-warn",
            status: 0,
            data: [
              {
                status: 0,
                color: "gray",
                A_name: "推送总数",
                A_sum: 3880,
              },
              {
                status: 1,
                color: "green",
                A_name: "推送成功",
                A_sum: 345,
              },
              {
                status: 0,
                color: "red",
                A_name: "推送失败率",
                A_sum: "20%",
              },
            ],
          },
          {
            titleIcon: "icon-monitorPlat-out",
            color: '#FFAE34',
            id: 'p2',
            title: "平台（退货入库自动退款）",
            statusIcon: "icon-monitorPlat-warn",
            status: 0,
            data: [
              {
                status: 0,
                color: "gray",
                A_name: "推送总数",
                A_sum: 3880,
              },
              {
                status: 1,
                color: "green",
                A_name: "推送成功",
                A_sum: 345,
              },
              {
                status: 0,
                color: "red",
                A_name: "推送失败率",
                A_sum: "20%",
              },
            ],
          },
          {
            titleIcon: "icon-monitorPlat-cancel",
            color: '#D656A7',
            id: 'p3',
            title: "平台（平台发货）",
            statusIcon: "icon-monitorPlat-warn",
            status: 0,
            data: [
              {
                status: 0,
                color: "gray",
                A_name: "推送总数",
                A_sum: 3880,
              },
              {
                status: 1,
                color: "green",
                A_name: "推送成功",
                A_sum: 345,
              },
              {
                status: 0,
                color: "red",
                A_name: "推送失败率",
                A_sum: "20%",
              },
            ],
          },
          {
            titleIcon: "icon-monitorPlat-in",
            color: '#FF6951',
            id: 'p4',
            title: "平台（同意换货回传平台）",
            statusIcon: "icon-monitorPlat-warn",
            status: 0,
            data: [
              {
                status: 0,
                color: "gray",
                A_name: "推送总数",
                A_sum: 3880,
              },
              {
                status: 1,
                color: "green",
                A_name: "推送成功",
                A_sum: 345,
              },
              {
                status: 0,
                color: "red",
                A_name: "推送失败率",
                A_sum: "20%",
              },
            ],
          },
          {
            titleIcon: "icon-monitorPlat-modify",
            color: '#A375C1',
            id: 'p5',
            title: "平台（拒绝换货回传平台）",
            statusIcon: "icon-monitorPlat-warn",
            status: 0,
            data: [
              {
                status: 0,
                color: "gray",
                A_name: "推送总数",
                A_sum: 3880,
              },
              {
                status: 1,
                color: "green",
                A_name: "推送成功",
                A_sum: 345,
              },
              {
                status: 0,
                color: "red",
                A_name: "推送失败率",
                A_sum: "20%",
              },
            ],
          },
          {
            titleIcon: "icon-monitorPlat-synchro",
            color: '#FB79A1',
            id: 'p5',
            title: "平台（修改地址回传平台）",
            statusIcon: "icon-monitorPlat-right",
            status: 1,
            data: [
              {
                status: 0,
                color: "gray",
                A_name: "推送总数",
                A_sum: 3880,
              },
              {
                status: 1,
                color: "green",
                A_name: "推送成功",
                A_sum: 345,
              },
              {
                status: 0,
                color: "red",
                A_name: "推送失败率",
                A_sum: "20%",
              },
            ],
          },
        ],
      },
      // 模块3
      main03: {
        title: "服务异常监控详细数据",
        btn: JSON.parse(JSON.stringify(dayBtnConifg)),
        btnSta: JSON.parse(JSON.stringify(statusBtnConifg)),
        data: [
          {
            title: "转单服务",
            time: "2h",
            status: 0,
            min: 0,
            max: 10000,
            value: 9002,
            desc: "积压单量",
            tips: "",
          },
          {
            title: "下发WMS服务",
            time: "2h",
            status: 1,
            min: 0,
            max: 10000,
            value: 3002,
            desc: "积压单量",
            tips: "",
          },
          {
            title: "平台发货服务",
            time: "2h",
            status: 1,
            min: 0,
            max: 10000,
            value: 5002,
            desc: "积压单量",
            tips: "",
          },
          {
            title: "取消拦截服务",
            time: "2h",
            status: 0,
            min: 0,
            max: 10000,
            value: 8672,
            desc: "积压单量",
            tips: "",
          },
          /* {
            title: "转单服务",
            time: "2h",
            status: 0,
            min: 0,
            max: 10000,
            value: 5670,
            desc: "积压单量",
            tips: "",
          }, */
        ],
      },
      // 模块4 --- 接口异常趋势图
      main04: {
        title: "接口异常趋势图",
        // 按钮配置项
        btnArr: [
          {
            text: "近三天",
            type: "text",
          },
          {
            text: "昨日",
            type: "primary",
          },
          {
            text: "当天",
            type: "text",
          },
        ],
        // 项目和接口枚举项
        projectOption: [
          {
            value: "1",
            label: "平台",
          },
          {
            value: "2",
            label: "SAP",
          },
          {
            value: "3",
            label: "WMS",
          },
        ],
        apiOption: [
          {
            value: "1",
            label: "取消发货自动退款",
          },
          {
            value: "2",
            label: "退货入库自动退款",
          },
          {
            value: "3",
            label: "平台发货",
          },
        ],
        projectV: "1",
        apiV: "2",
        // 数据
        currentData: {
          type: "category",
          key: [
            "1点",
            "2点",
            "3点",
            "4点",
            "5点",
            "6点",
            "7点",
            "8点",
            "9点",
            "10点",
            "11点",
            "12点",
            "12点",
            "14点",
            "15点",
            "16点",
            "17点",
            "18点",
            "19点",
            "20点",
            "21点",
            "22点",
            "23点",
            "24点",
          ],
          datas: [
            {
              type: "line",
              name: "接口1",
              color: "#FF6951",
              data: [
                19, 23, 45, 68, 90, 13, 54, 20, 35, 24, 78, 1, 57, 24, 90, 13,
                54, 20, 35, 24, 78, 1, 57, 24,
              ],
            },
          ],
        },
      },
      vmI18n: window.vmI18n,
    };
  },
  computed: {
    tableName() {
      const { keepAliveModuleName, tableName } = this.$store.state.global.activeTab;
      return tableName
    }
  },
  mounted() {
    // const domContent = document.getElementById('content');
    // domContent.style.padding = '0 0';
    this.maxHeight("main02body", "m2Item");
    window.onresize = () => {
      console.log(11, this.tableName);
      if (this.tableName != 'MONITORINGPLATFORM') {
        return
      }
      this.maxHeight("main02body", "m2Item");
      this.maxHeight("main03body", "m3Item");
    };

    this.header.time = dateUtil.getFormatDate(
      this.header.time,
      "yyyy-MM-dd HH:mm:ss"
    );
    this.curveChart();
    this.getGauge();
    // this.pieChart();
  },
  destroyed() {
    if (document.getElementById("content")) {
      const domContent = document.getElementById("content");
      domContent.style.padding = "0 15px";
    }
  },

  methods: {
    // 接口返回的数据处理，传参数决定处理哪一块
    // 接口不放在这里调？放吧，不然全局刷新要调4次该方法
    // 在这调的话，入参处理……
    // 调接口并处理数据（可能有4个接口
    getData(all = 0, ...others) {
      const self = this;
      let params = { fresh: Boolean(all) };
      let [m1 = {}, m2 = {}, m3 = {}, m4 = {}] = others;
      if (!all) {
        // params.
        // params = Object.assign({}, params, others);
        /** -------- 暂时的假数据 -------- */
        if (m1.item.id == 'sap') {
          this.main02.data = [
            {
              titleIcon: "icon-monitorPlat-home",
              color: '#4560AB',
              id: 's1',
              title: "SAP（SAP）",
              statusIcon: "icon-monitorPlat-warn",
              status: 0,
              data: [
                {
                  status: 0,
                  color: "gray",
                  A_name: "推送总数",
                  A_sum: 3880,
                },
                {
                  status: 1,
                  color: "green",
                  A_name: "推送成功",
                  A_sum: 345,
                },
                {
                  status: 0,
                  color: "red",
                  A_name: "推送失败率",
                  A_sum: "20%",
                },
              ],
            },
          ]
        } else if (m1.item.id == 'wms') {
          this.main02.data = [
            {
              titleIcon: "icon-monitorPlat-home",
              color: '#4560AB',
              id: 'w1',
              title: "WMS(零售发货单下发WMS)",
              statusIcon: "icon-monitorPlat-warn",
              status: 0,
              data: [
                {
                  status: 0,
                  color: "gray",
                  A_name: "推送总数",
                  A_sum: 3880,
                },
                {
                  status: 1,
                  color: "green",
                  A_name: "推送成功",
                  A_sum: 345,
                },
                {
                  status: 0,
                  color: "red",
                  A_name: "推送失败率",
                  A_sum: "20%",
                },
              ],
            },
            {
              titleIcon: "icon-monitorPlat-home",
              color: '#4560AB',
              id: 'w2',
              title: "WMS(退换货单下发WMS)",
              statusIcon: "icon-monitorPlat-warn",
              status: 0,
              data: [
                {
                  status: 0,
                  color: "gray",
                  A_name: "推送总数",
                  A_sum: 3880,
                },
                {
                  status: 1,
                  color: "green",
                  A_name: "推送成功",
                  A_sum: 345,
                },
                {
                  status: 0,
                  color: "red",
                  A_name: "推送失败率",
                  A_sum: "20%",
                },
              ],
            },
            {
              titleIcon: "icon-monitorPlat-home",
              color: '#4560AB',
              id: 'w3',
              title: "WMS(采购退货单下发WMS)",
              statusIcon: "icon-monitorPlat-warn",
              status: 0,
              data: [
                {
                  status: 0,
                  color: "gray",
                  A_name: "推送总数",
                  A_sum: 3880,
                },
                {
                  status: 1,
                  color: "green",
                  A_name: "推送成功",
                  A_sum: 345,
                },
                {
                  status: 0,
                  color: "red",
                  A_name: "推送失败率",
                  A_sum: "20%",
                },
              ],
            },
            {
              titleIcon: "icon-monitorPlat-home",
              color: '#4560AB',
              id: 'w4',
              title: "WMS(发货包裹拦截）",
              statusIcon: "icon-monitorPlat-warn",
              status: 0,
              data: [
                {
                  status: 0,
                  color: "gray",
                  A_name: "推送总数",
                  A_sum: 3880,
                },
                {
                  status: 1,
                  color: "green",
                  A_name: "推送成功",
                  A_sum: 345,
                },
                {
                  status: 0,
                  color: "red",
                  A_name: "推送失败率",
                  A_sum: "20%",
                },
              ],
            },
            {
              titleIcon: "icon-monitorPlat-home",
              color: '#4560AB',
              id: 'w5',
              title: "WMS(实物调拨单下发WMS)",
              statusIcon: "icon-monitorPlat-warn",
              status: 0,
              data: [
                {
                  status: 0,
                  color: "gray",
                  A_name: "推送总数",
                  A_sum: 3880,
                },
                {
                  status: 1,
                  color: "green",
                  A_name: "推送成功",
                  A_sum: 345,
                },
                {
                  status: 0,
                  color: "red",
                  A_name: "推送失败率",
                  A_sum: "20%",
                },
              ],
            },
          ]
        } else if (m1.item.id == 'ptai') {
          this.main02.data = [
            {
              titleIcon: "icon-monitorPlat-home",
              color: '#4560AB',
              id: 'p1',
              title: "平台（取消发货自动退款）",
              statusIcon: "icon-monitorPlat-warn",
              status: 0,
              data: [
                {
                  status: 0,
                  color: "gray",
                  A_name: "推送总数",
                  A_sum: 3880,
                },
                {
                  status: 1,
                  color: "green",
                  A_name: "推送成功",
                  A_sum: 345,
                },
                {
                  status: 0,
                  color: "red",
                  A_name: "推送失败率",
                  A_sum: "20%",
                },
              ],
            },
            {
              titleIcon: "icon-monitorPlat-out",
              color: '#FFAE34',
              id: 'p2',
              title: "平台（退货入库自动退款）",
              statusIcon: "icon-monitorPlat-warn",
              status: 0,
              data: [
                {
                  status: 0,
                  color: "gray",
                  A_name: "推送总数",
                  A_sum: 3880,
                },
                {
                  status: 1,
                  color: "green",
                  A_name: "推送成功",
                  A_sum: 345,
                },
                {
                  status: 0,
                  color: "red",
                  A_name: "推送失败率",
                  A_sum: "20%",
                },
              ],
            },
            {
              titleIcon: "icon-monitorPlat-cancel",
              color: '#D656A7',
              id: 'p3',
              title: "平台（平台发货）",
              statusIcon: "icon-monitorPlat-warn",
              status: 0,
              data: [
                {
                  status: 0,
                  color: "gray",
                  A_name: "推送总数",
                  A_sum: 3880,
                },
                {
                  status: 1,
                  color: "green",
                  A_name: "推送成功",
                  A_sum: 345,
                },
                {
                  status: 0,
                  color: "red",
                  A_name: "推送失败率",
                  A_sum: "20%",
                },
              ],
            },
            {
              titleIcon: "icon-monitorPlat-in",
              color: '#FF6951',
              id: 'p4',
              title: "平台（同意换货回传平台）",
              statusIcon: "icon-monitorPlat-warn",
              status: 0,
              data: [
                {
                  status: 0,
                  color: "gray",
                  A_name: "推送总数",
                  A_sum: 3880,
                },
                {
                  status: 1,
                  color: "green",
                  A_name: "推送成功",
                  A_sum: 345,
                },
                {
                  status: 0,
                  color: "red",
                  A_name: "推送失败率",
                  A_sum: "20%",
                },
              ],
            },
            {
              titleIcon: "icon-monitorPlat-modify",
              color: '#A375C1',
              id: 'p5',
              title: "平台（拒绝换货回传平台）",
              statusIcon: "icon-monitorPlat-warn",
              status: 0,
              data: [
                {
                  status: 0,
                  color: "gray",
                  A_name: "推送总数",
                  A_sum: 3880,
                },
                {
                  status: 1,
                  color: "green",
                  A_name: "推送成功",
                  A_sum: 345,
                },
                {
                  status: 0,
                  color: "red",
                  A_name: "推送失败率",
                  A_sum: "20%",
                },
              ],
            },
            {
              titleIcon: "icon-monitorPlat-synchro",
              color: '#FB79A1',
              id: 'p5',
              title: "平台（修改地址回传平台）",
              statusIcon: "icon-monitorPlat-right",
              status: 1,
              data: [
                {
                  status: 0,
                  color: "gray",
                  A_name: "推送总数",
                  A_sum: 3880,
                },
                {
                  status: 1,
                  color: "green",
                  A_name: "推送成功",
                  A_sum: 345,
                },
                {
                  status: 0,
                  color: "red",
                  A_name: "推送失败率",
                  A_sum: "20%",
                },
              ],
            },
          ]
        }
        /** -------- 暂时的假数据 -------- */
        params.m1 = m1;
        params.m2 = m2;
        params.m3 = m3;
        params.m4 = m4;
        console.log('getData:params::', params);
        this.$nextTick(() => {
        })
        setTimeout(() => {
          self.maxHeight("main02body", "m2Item", 1);
          self.pageLoading = false;
          self.m2Loading = false;
        }, 500);
      }
    },
    // 右上角-刷新icon事件
    freshHandel: _.throttle(function () {
      const self = this;
      self.pageLoading = true;
      self.getData(0, { m1: 1 }, { m2: 2 });
    }, 1000, { 'trailing': false }),
    /** ----------------- 配置方法 -------------------- **/
    // 饼图
    /* pieChart() {
      const chartDom = document.getElementById('main01Left');
      const myChart = echarts.init(chartDom);
      const option = {
        series: [
          {
            color: ["#5470c6"],
            name: "访问来源",
            type: "pie",
            radius: ["55%", "75%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              scale: true, // 扇形区域hover上去放大效果
              label: {
                show: true,
                fontSize: "28",
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: this.main01.pieData,
          },
        ],
      };
      let index;
      myChart.dispatchAction({
        type: "highlight",
        seriesIndex: 0,
        dataIndex: 0,
      }); //设置默认选中高亮部分
      myChart.on("mouseover", function (e) {
        if (e.dataIndex != index) {
          myChart.dispatchAction({
            type: "downplay",
            seriesIndex: 0,
            dataIndex: index,
          });
        }
      });
      myChart.on("mouseout", function (e) {
        index = e.dataIndex;
        myChart.dispatchAction({
          type: "highlight",
          seriesIndex: 0,
          dataIndex: e.dataIndex,
        });
      });
      option && myChart.setOption(option);
    }, */
    // 折线图
    curveChart() {
      const chartDom = document.getElementById("mainCurve");
      const myChart = echarts.init(chartDom);
      // 处理折线
      let LineArr = [];
      this.main04.currentData.datas.forEach((i) => {
        let lineConfig = {
          type: "line",
          name: i.name,
          symbol: "circle",
          smooth: true, //平滑折线  = 曲线
          data: i.data,
          symbolSize: 10, // 设定折线点的大小
          // 折线条的样式
          lineStyle: {
            color: i.color,
            width: 2,
          },
          // 折线拐点的样式
          itemStyle: {
            normal: {
              color: i.color,
            },
          },
          // 鼠标经过时
          emphasis: {
            itemStyle: {
              color: i.color, //颜色
              borderColor: "#fff", //图形的描边颜色
              borderWidth: 2, // 描边的线宽
              shadowBlur: 4, // 图形的阴影大小
              shadowColor: i.color, // 图形的阴影颜色
            },
          },
        };
        LineArr.push(lineConfig);
      });
      // 配置选项
      const option = {
        // 位置
        grid: {
          top: 50,
          left: 50,
          right: 0,
          bottom: 50,
        },
        // 鼠标经过展示tips
        tooltip: {
          trigger: "axis",
          alwaysShowContent: true, //始终保留最后一个经过的提示框
          axisPointer: {
            type: "cross",
          },
          // 自定义显示位置
          // position: (point, params, dom, rect, size) => {
          //   // 跟着鼠标走
          //   return [point[0] - 60, point[1] - 80];
          // },
          // 自定义显示内容
          formatter: (params) => {
            return this.formatterFun(params);
          },
        },
        xAxis: {
          type: this.main04.currentData.type,
          axisLine: {
            lineStyle: {
              color: "#F2F2F2",
            },
          },
          // 刻度尺
          axisTick: {
            show: false,
          },
          axisLabel: {
            fontSize: "12",
            color: "#8D91A1",
          },
          data: this.main04.currentData.key,
        },
        yAxis: {
          type: "value",
          // 分割线
          splitLine: {
            show: true,
            lineStyle: {
              color: "#F2F2F2",
            },
          },
        },
        // 数据设置项
        series: LineArr,
      };
      // 设置选项
      setTimeout(() => {
        document
          .getElementById("mainCurve")
          .setAttribute("_echarts_instance_", "");
        option && myChart.setOption(option);
      }, 10);
    },
    formatterFun(params) {
      let liNode = `<h6>${params[0].axisValue}</h6>`;
      params.forEach((e) => {
        liNode += `<div style="fontSize:12px;color:#8D91A1;line-height:20px">
                      <span style="
                        display: inline-block;
                        width: 10px;
                        height: 10px;
                        border-radius: 10px;
                        background: #F76D59;">
                      </span>
                      异常数：
                      <span style="font-size:12px;color:#F76D59;line-height:20px">
                      ${e.data}
                      </span>
                    </div>`;
      });
      return liNode;
    },
    // 仪表盘
    gaugeChart(params) {
      const chartDom = document.getElementById(`gaugeChart${params.index}`);
      const myChart = echarts.init(chartDom);
      // 配置选项
      console.log(params.status);
      let option = {
        series: [
          {
            type: "gauge",
            startAngle: 180, //弧度
            endAngle: 0,
            min: params.min, //数据最小
            max: params.max, // 数据最大
            splitNumber: 1, //刻度显示个数
            radius: "120%", // 大小
            center: ["50%", "70%"], //显示位置
            itemStyle: {
              color: params.status ? "#90BB57" : "#FF6951",
            },
            //进度
            progress: {
              show: true,
              roundCap: true,
              width: 10,
            },
            // 指针
            pointer: {
              show: false,
            },
            // 背景
            axisLine: {
              roundCap: true,
              lineStyle: {
                width: 10,
                opacity: 0.5,
              },
            },
            // 刻度尺
            axisTick: {
              show: false,
            },
            // 分割线 ，刻度尺
            splitLine: {
              show: false,
            },
            axisLabel: {
              distance: 0,
              color: "#999",
              fontSize: 12,
            },
            data: [
              {
                value: params.status ? params.max : params.value,
                name: params.desc,
                title: {
                  show: false,
                },
                detail: {
                  offsetCenter: [0, " -30%"],
                  formatter: function (value) {
                    // 积压单量
                    let returnV = params.status ? "正常" : value;
                    return `{value|${returnV}}`;
                  },
                  rich: {
                    value: {
                      fontSize: 24,
                      color: params.status ? "#90BB57" : "#FA8A78",
                    },
                  },
                },
              },
            ],
            silent: true,
            animation: true,
          },
        ],
      };
      // 设置选项
      option && myChart.setOption(option);
      myChart.on("click", function (params) {
        console.log(params);
        window.open(
          "https://www.baidu.com/s?wd=" + encodeURIComponent(params.name)
        );
      });
    },

    /** ------------------ 事件方法 ------------------- **/
    geTabnormal(index) {
      // 设置按钮样式
      let btnArr = this.main04.btnArr;
      btnArr.forEach((it, i) => {
        i == index ? (btnArr[i].type = "primary") : (btnArr[i].type = "text");
      });
      if (index) {
        this.main04.currentData.key = ["1点", "2点", "3点", "4点", "5点", "6点", "7点", "8点", "9点", "10点", "11点", "12点", "12点", "14点", "15点", "16点", "17点", "18点", "19点", "20点", "21点", "22点", "23点", "24点"];
      } else {
        this.main04.currentData.key = ["8-16", "8-17", "8-18"];
      }
      this.curveChart();
    },
    //
    getGauge(params) {
      let gauageData = this.main03.data;
      gauageData.forEach((item, i) => {
        item.index = i;
        this.gaugeChart(item);
      });
    },
    // 计算max-Height
    maxHeight: _.throttle(function (body, itemName, isInit) {
      const self = this;
      const mBody = document.getElementById(body);
      let nodeHeight = 0,
        firstLeft = 0, // 第一个元素的横坐标
        rowSum = 0, // 行数
        flag = false;
      for (const node of mBody.children) {
        if (node.className.includes(itemName)) {
          firstLeft = mBody.children[0].getClientRects()[0].x;
          nodeHeight = node.clientHeight;
          const itPosition = node.getClientRects()[0].x;
          if (itPosition == firstLeft) {
            rowSum += 1;
          }
          // console.log(itPosition,rowSum);
          // break;
        } else {
          // flag = true;
        }
      }
      if (!rowSum) return;
      self[body.includes('2') ? 'main02' : 'main03'].btnSta.find(i => i.webname == 'upDownIcon').disabled = rowSum <= 2;
      if (body.includes('2')) {
        if (self.up == 'fadeInDom' && !isInit) {
          self.m2Heigh = mBody.scrollHeight;
          mBody.style.transition = '2s'
        } else {
          self.m2Heigh = nodeHeight * (rowSum == 1 ? 1 : rowSum >= 2 ? 2 : 1) + (rowSum == 1 ? 2 : rowSum >= 2 ? 20 : 2);
          console.log(self.m2Heigh);
          mBody.style.transition = '2s'
        }
      } else {
        if (self.m3Up == 'm3fadeInDom') {
          self.m3Heigh = mBody.scrollHeight;
          mBody.style.transition = '2s'
        } else {
          self.m3Heigh = nodeHeight * (rowSum == 1 ? 1 : rowSum >= 2 ? 2 : 1) + (rowSum == 1 ? 2 : rowSum >= 2 ? 20 : 2);
          mBody.style.transition = '2s'
        }
      }
      // { 'trailing': false }
    }, 500),

    dayBtnHandel(item, panel) {
      this.btnStyleChange(item, 1, panel);
    },
    statusBtnHandel: _.throttle(function (item, panel) {
      this.btnStyleChange(item, 0, panel);
    }, 1000, { 'trailing': false }),
    // 按钮样式变换、无数据时展示图片样式处理
    btnStyleChange(item, order, panel) {
      let nowBtn = item.webname;
      const btnArr = order ? this[panel].btn : this[panel].btnSta;
      if (item.icon) {
        btnArr.find((it) => it.webname == nowBtn).icon =
          item.icon == "ios-arrow-down" ? "ios-arrow-up" : "ios-arrow-down";
        switch (panel) {
          case "main02":
            this.up = this.up ? "" : "fadeInDom";
            this.maxHeight("main02body", "m2Item");
            break;
          case "main03":
            this.m3Up = this.m3Up ? "" : "m3fadeInDom";
            this.maxHeight("main03body", "m3Item");
            break;
          default:
            break;
        }
        return;
      }
      switch (panel) {
        case "main02":
          this.noData = item.webname == "abort" ? "noData" : "";
          break;
        case "main03":
          this.m3noData = item.webname == "abort" ? "noData" : "";
          break;
        default:
          break;
      }
      btnArr.forEach(
        (it) => (it.type = it.webname == nowBtn ? "primary" : "text")
      );
    },
    m1DomClick(it, index) {
      this.main01.data.forEach((i, n) => {
        i.clickCss = n == index ? 'clickCss' : '';
      });
      this.m2Loading = true;
      const m1 = {
        item: it,
        action: this.main01.btn.find(i => i.type == 'primary')
      }
      this.getData(0, m1)
    },
    // 异常趋势图 接口选择
    selectCheck(item) {
      this.main04.currentData.datas = [
        {
          type: "line",
          name: "接口1",
          color: "#FF6951",
          data: [
            19, 23, 45, 68, 90, 13, 54, 20, 35, 24, 78, 1, 57, 24, 90, 13, 54,
            20, 35, 24, 78, 1, 57, 24,
          ],
        },
      ];
      if (item.length == 2) {
        this.main04.currentData.datas.push({
          type: "line",
          name: "接口2",
          color: "#FF6951",
          data: [
            39, 43, 65, 88, 110, 33, 74, 40, 55, 44, 98, 20, 77, 44, 110, 33,
            74, 40, 55, 44, 98, 20, 77, 44,
          ],
        });
      } else {
        this.main04.currentData.datas.push(
          {
            type: "line",
            name: "接口2",
            color: "#FF6951",
            data: [
              29, 33, 55, 78, 100, 23, 64, 30, 45, 34, 88, 10, 67, 34, 100, 23,
              64, 30, 45, 34, 88, 10, 67, 34,
            ],
          },
          {
            type: "line",
            name: "接口2",
            color: "#FF6951",
            data: [
              39, 43, 65, 88, 110, 33, 74, 40, 55, 44, 98, 20, 77, 44, 110, 33,
              74, 40, 55, 44, 98, 20, 77, 44,
            ],
          }
        );
      }
      this.curveChart();
    },
    /** ------------------ 获取数据方法 ------------------- **/
  },
};
</script>

<style scoped lang="less">
@import "~@burgeon/oms-theme/skin/public.less";
@import "./monitorPlatform.less";
.selectBox {
  margin-top: 20px;
  display: grid;
  grid-template-columns: calc(100% - 200px) 200px;
  .ark-form-item {
    margin-bottom: 0;
  }
  .btn {
    text-align: right;
  }
  /deep/ .ark-select .ark-select-selection {
    height: 30px;
    line-height: 30px;
    box-sizing: content-box;
    .ark-select-placeholder,
    .ark-select-selected-value {
      height: 32px;
      line-height: 32px;
    }
  }
}
</style>

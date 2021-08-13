<!--
 * @Author: your name
 * @Date: 2021-04-27 11:20:18
 * @LastEditTime: 2021-08-13 10:39:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /project-logic/commonPages/WelcomePage.vue
-->
<template>
  <div class="monitoringPlatform">
    <div class="header">
      <!-- <span>11</span>
      <span>22</span>
      <span>33</span> -->
      <!-- <businessButton :btn-config=" header.btn" class="btn" /> -->
      <!-- <div class="btn">
        <Button type="primary">近三天</Button>
        <Button type="text">昨天</Button>
        <Button type="text">当天</Button>
      </div> -->
      <div class="time">
        <span>更新时间：{{ header.time }}</span>
        <Icon type="icon-OMS-fonticon-015" style="color: #5461b8" />
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
              <div id="main01Left" style=" min-width: 200px; min-height: 200px"></div>
              <div class="legend" >
                <template v-for="(it,index) in main01.pieData">
                  <div :key="'pieLegend' + index"> {{it.name}} <i>{{it.value}}</i></div>
                </template>
              </div>
            </div>
            <div class="right">
              <div
                class="rightItem comItem"
                v-for="(it, index) in main01.data"
                :key="index"
                :class="it.status == 0 ? 'abnormal' : 'normal'"
              >
                <div class="title">
                  <Icon type="ios-alert-outline" />
                  <span>{{ it.title }}</span>
                </div>
                <div class="status">{{ it.status_name }}</div>
                <div v-if="it.status == 0" class="detail">
                  {{ it.message }} <i class="sum">{{ it.sum }}</i>
                </div>
              </div>
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
                  :type="it.type"
                  :class="it.icon ? 'iconBtn' : ''"
                  :icon="it.icon || ''"
                  @click="statusBtnHandel(it, 'main02')"
                  >{{ it.text }}</Button
                >
              </div>
            </div>
          </div>
          <div :class="['main02body', up, noData]" id="main02body">
            <picture v-if="noData">
              <source srcset="./img/la.png" media="(min-width: 1600px)" />
              <img src="./img/medium-car-image.jpg" alt="Car" />
              <span>暂无异常数据</span>
            </picture>
            <template v-else>
              <div
                class="m2Item comItem"
                v-for="(it, index) in main02.data"
                :key="index"
                :class="it.status == 0 ? 'abnormal' : 'normal'"
              >
                <div class="title">
                  <Icon :type="it.titleIcon" />
                  <!-- <i :class="it.titleIcon"></i> -->
                  <span>{{ it.title }}</span>
                  <Icon :type="it.statusIcon" class="warnIcon" />
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
                :type="it.type"
                :class="it.icon ? 'iconBtn' : ''"
                :icon="it.icon || ''"
                @click="statusBtnHandel(it, 'main03')"
                >{{ it.text }}</Button
              >
            </div>
          </div>
        </div>
        <div :class="['main03body', m3Up, m3noData]" id="main03body">
          <picture v-if="m3noData">
            <source srcset="./img/la.png" media="(min-width: 1600px)" />
            <img src="./img/medium-car-image.jpg" alt="Car" />
            <span>暂无异常数据</span>
          </picture>
          <template v-else>
            <div
              class="m3Item comItem"
              v-for="(it, index) in main03.data"
              :key="index"
              :class="it.status == 0 ? 'abnormal' : 'normal'"
            >
              <div class="title">
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
                  {{it.desc}}
                </span>
                <Tooltip placement="top-start" theme="light">
                    <Icon type="ios-help-circle-outline" />
                    <div slot="content">
                        <div class="gaugeTips">积压单量说明积压单量说明积压单量说明</div>
                    </div>
                </Tooltip>
              </div>
            </div>
          </template>
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
          <Form :label-width="80">
            <Row>
              <Col span="6">
                <FormItem label="项目：">
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
                  <Select v-model="main04.apiV">
                    <Option
                      v-for="item in main04.apiOption"
                      :value="item.value"
                      :key="item.value"
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
import businessButton from "professionalComponents/businessButton";
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
  },
];
export default {
  name: "WelcomePage",
  components: {
    businessButton,
  },
  data() {
    return {
      noData: "",
      m3noData: "",
      up: "",
      m3Up: "",
      m2BtnIcon: "ios-arrow-down",
      m3BtnIcon: "ios-arrow-down",
      header: {
        time: new Date(),
      },
      main01: {
        title: "第三方监控",
        sum: 10,
        ex_sum: 2,
        normal_sum: 8,
        status: 0,
        status_name: "异常",
        btn: JSON.parse(JSON.stringify(dayBtnConifg)),
        data: [
          {
            status: 0,
            status_name: "异常",
            title: "AG项目1",
            message: "异常单据",
            sum: 288,
          },
          {
            status: 1,
            status_name: "正常",
            title: "AG项目2",
            message: "异常单据",
            sum: 288,
          },
          {
            status: 1,
            status_name: "正常",
            title: "AG项目3",
            message: "异常单据",
            sum: 288,
          },
          {
            status: 0,
            status_name: "异常",
            title: "AG项目4",
            message: "异常单据",
            sum: 288,
          },
        ],
        pieData: [
          {value: 1048, name: '总数'},
          {value: 1048, name: '异常数'},
          {value: 1048, name: '正常数'},
        ],
      },
      main02: {
        title: "对外接口监控项目详细数据",
        btnSta: JSON.parse(JSON.stringify(statusBtnConifg)),
        data: [
          {
            titleIcon: "icon-fahuo",
            title: "WMS(AG项目1)",
            statusIcon: "ios-alert-outline",
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
            titleIcon: "icon-chuku",
            title: "WMS(AG项目1)",
            statusIcon: "ios-alert-outline",
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
            titleIcon: "ios-home",
            title: "WMS(AG项目1)",
            statusIcon: "ios-alert-outline",
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
            titleIcon: "ios-home",
            title: "WMS(AG项目1)",
            statusIcon: "ios-alert-outline",
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
            titleIcon: "ios-home",
            title: "WMS(AG项目1)",
            statusIcon: "ios-alert-outline",
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
            titleIcon: "ios-home",
            title: "WMS(AG项目1)",
            statusIcon: "ios-alert-outline",
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
        title: "服务异常监控详细数据（AG项目1）",
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
            color: "#FF6951",
            tips: "",
          },
          {
            title: "转单服务",
            time: "2h",
            status: 0,
            min: 0,
            max: 10000,
            value: 3002,
            desc: "积压单量",
            color: "#90BB57",
            tips: "",
          },
          {
            title: "转单服务",
            time: "2h",
            status: 0,
            min: 0,
            max: 10000,
            value: 5002,
            color: "#90BB57",
            desc: "积压单量",
            tips: "",
          },
          {
            title: "转单服务",
            time: "2h",
            status: 0,
            min: 0,
            max: 10000,
            value: 8672,
            color: "#FF6951",
            desc: "积压单量",
            tips: "",
          },
          {
            title: "转单服务",
            time: "2h",
            status: 0,
            min: 0,
            max: 10000,
            value: 5670,
            color: "#90BB57",
            desc: "积压单量",
            tips: "",
          },
        ],
      },
      // 模块4 --- 接口异常趋势图
      main04: {
        title: "接口异常趋势图",
        // 按钮配置项
        btnArr: [
          {
            text: "近三天",
            type: "primary",
          },
          {
            text: "昨日",
            type: "text",
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
            label: "New York",
          },
          {
            value: "2",
            label: "London",
          },
        ],
        apiOption: [
          {
            value: "1",
            label: "New York",
          },
          {
            value: "2",
            label: "London",
          },
        ],
        projectV: "1",
        apiV: "2",
        // 数据
        currentDay: {
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
          data: [
            19, 23, 45, 68, 90, 13, 54, 20, 35, 24, 78, 1, 57, 24, 90, 13, 54,
            20, 35, 24, 78, 1, 57, 24,
          ],
        },
        threeDay: {
          type: "category",
          key: ["One", "Two", "Three"],
          data: [100, 200, 50],
        },
        setData: {
          type: "category",
          key: ["One", "Two", "Three"],
          data: [100, 200, 50],
        },
      },
      vmI18n: window.vmI18n,
    };
  },
  updated() {
    this.maxHeight("main02body", "m2Item");
    this.maxHeight("main03body", "m3Item");
  },
  mounted() {
    // const domContent = document.getElementById('content');
    // domContent.style.padding = '0 0';
    this.header.time = dateUtil.getFormatDate(
      this.header.time,
      "yyyy-MM-dd HH:mm:ss"
    );
    this.curveChart();
    this.getGauge();
    this.pieChart();
  },
  destroyed() {
    if (document.getElementById("content")) {
      const domContent = document.getElementById("content");
      domContent.style.padding = "0 15px";
    }
  },

  methods: {
    /** ----------------- 配置方法 -------------------- **/
    // 饼图
    pieChart() {
      const chartDom = document.getElementById('main01Left');
      const myChart = echarts.init(chartDom);
      const option = {
        series: [
          {
            color: ['#5470c6'],
            name: '访问来源',
            type: 'pie',
            radius: ['55%', '75%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              scale: true, // 扇形区域hover上去放大效果
              label: {
                show: true,
                fontSize: '28',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: this.main01.pieData,
          }
        ]
      };
      let index;
      myChart.dispatchAction({type: 'highlight',seriesIndex: 0,dataIndex: 0});//设置默认选中高亮部分
      myChart.on('mouseover',function(e){
        if(e.dataIndex != index){
          myChart.dispatchAction({type: 'downplay', seriesIndex: 0, dataIndex: index });
        }
      });
      myChart.on('mouseout',function(e){
        index = e.dataIndex;
        myChart.dispatchAction({type: 'highlight',seriesIndex: 0,dataIndex: e.dataIndex});
      });
      option && myChart.setOption(option);
    },
    // 折线图
    curveChart() {
      const chartDom = document.getElementById("mainCurve");
      const myChart = echarts.init(chartDom);
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
          // 自定义显示位置
          position: (point, params, dom, rect, size) => {
            // 跟着鼠标走
            return [point[0] - 60, point[1] - 80];
          },
          // 自定义显示内容
          formatter: (params) => {
            let HTMLElement = "";
            HTMLElement = `<div>
              <div style="font-size:12px;color:#8D91A1;line-height:20px">
              ${params[0].axisValue}
              </div>
              <div style="fontSize:12px;color:#8D91A1;line-height:20px">
                <span style="
                  display: inline-block;
                  width: 10px;
                  height: 10px;
                  border-radius: 10px;
                  background: #F76D59;">
                </span>
                异常数：
                <span style="font-size:12px;color:#F76D59;line-height:20px">
                ${params[0].data}
                </span>
              </div>
             </div>`;
            return HTMLElement;
          },
        },
        // 坐标轴指示器 必须搭配tooltip的type:'axis'
        axisPointer: {
          type: "line",
          lineStyle: {
            color: "#F2F2F2",
          },
        },
        xAxis: {
          type: this.main04.setData.type,
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
          data: this.main04.setData.key,
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
        series: [
          {
            type: "line",
            symbol: "circle",
            smooth: true, //平滑折线  = 曲线
            data: this.main04.setData.data,
            symbolSize: 10, // 设定折线点的大小
            // 折线条的样式
            lineStyle: {
              color: "#FF6951",
              width: 2,
            },
            // 折线拐点的样式
            itemStyle: {
              normal: {
                color: "#FF6951",
              },
            },
            // 鼠标经过时
            emphasis: {
              itemStyle: {
                color: "#FF6951", //颜色
                borderColor: "#fff", //图形的描边颜色
                borderWidth: 2, // 描边的线宽
                shadowBlur: 4, // 图形的阴影大小
                shadowColor: "#FF6951", // 图形的阴影颜色
              },
            },
          },
        ],
      };
      // 设置选项
      option && myChart.setOption(option);
    },
    // 仪表盘
    gaugeChart(params) {
      const chartDom = document.getElementById(`gaugeChart${params.index}`);
      const myChart = echarts.init(chartDom);
      // 配置选项
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
              color: params.color, //"#FF6951",
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
                value: params.value,
                name: params.desc,
                title: {
                  show:false,
                  offsetCenter: [0, 0],
                  fontSize: 12,
                  color: "#8C8C8C",
                },
                detail: {
                  offsetCenter: [0, " -30%"],
                  formatter: function (value) {
                    // 积压单量
                    return `{value|${value}}`;
                  },
                  rich: {
                    value: {
                      fontSize: 24,
                      color: "#FA8A78",
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
      if (index == 2) {
        this.main04.setData = this.main04.currentDay;
      } else {
        this.main04.setData = this.main04.threeDay;
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
    // 计算maxHeight
    maxHeight(body, itemName) {
      const mBody = document.getElementById(body);
      // let m2Heigh = m2Body.clientHeight;
      let nodeHeight = 0,
        flag = false,
        nodeSum = mBody.childNodes.length;
      for (const node of mBody.childNodes) {
        if (node.className.includes(itemName)) {
          nodeHeight = node.clientHeight;
          break;
        } else {
          flag = true;
        }
      }
      if (flag) return;
      mBody.style.maxHeight = `${nodeHeight * 2 + 32}px`;
      console.log(mBody);
    },
    //
    dayBtnHandel(item, panel) {
      this.btnStyleChange(item, 1, panel);
    },
    statusBtnHandel(item, panel) {
      this.btnStyleChange(item, 0, panel);
    },
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
            break;
          case "main03":
            this.m3Up = this.m3Up ? "" : "m3fadeInDom";
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
    /** ------------------ 获取数据方法 ------------------- **/
  },
};
</script>

<style scoped lang="less">
@import "~@burgeon/oms-theme/skin/public.less";
@import "./public.less";
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
  /deep/ .ark-select-single .ark-select-selection {
    height: 32px;
    line-height: 32px;
    .ark-select-placeholder,
    .ark-select-selected-value {
      height: 32px;
      line-height: 32px;
    }
  }
}
</style>

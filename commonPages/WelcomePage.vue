<!--
 * @Author: your name
 * @Date: 2021-04-27 11:20:18
 * @LastEditTime: 2021-08-11 17:42:05
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
      <!-- <businessButton :btn-config="data.header.btn" class="btn" /> -->
      <!-- <div class="btn">
        <Button type="primary">近三天</Button>
        <Button type="text">昨天</Button>
        <Button type="text">当天</Button>
      </div> -->
      <div class="time">
        <span>更新时间：{{ data.header.time }}</span>
        <Icon type="ios-refresh" />
      </div>
    </div>
    <div class="main">
      <div class="mainContent mainTop">
        <div class="main01">
          <div class="mainHeader">
            <span>{{ data.main01.title }}</span>
            <div class="btn">
              <Button type="primary">近三天</Button>
              <Button type="text">昨天</Button>
              <Button type="text">当天</Button>
            </div>
          </div>
          <div class="main01body">
            <div class="left comItem">
              <div id="main" style="width: 200px; height: 200px"></div>
            </div>
            <div class="right">
              <div
                class="rightItem comItem"
                v-for="(it, index) in data.main01.data"
                :key="index"
                :class="it.status == 0 ? 'abnormal' : 'normal'"
              >
                <div class="title">
                  <Icon type="ios-alert-outline" />
                  <span>{{ it.title }}</span>
                </div>
                <div class="status">{{ it.status_name }}</div>
                <div v-if="it.status == 0" class="detail">{{ it.message }} <i class="sum">{{ it.sum }}</i></div>
              </div>
            </div>
          </div>
        </div>
        <div :class="['', 'main02']">
          <div class="mainHeader">
            <span>{{ data.main02.title }}</span>
            <div class="btn">
              <Button type="primary">全部</Button>
              <Button type="text">异常</Button>
              <Button type="text" :icon="m2BtnIcon" @click="upDown"></Button>
            </div>
          </div>
          <div :class="['main02body', up]">
            <div
              class="m2Item comItem"
              v-for="(it, index) in data.main02.data"
              :key="index"
              :class="it.status == 0 ? 'abnormal' : 'normal'"
            >
              <div class="title">
                <Icon :type="it.titleIcon" />
                <span>{{ it.title }}</span>
                <Icon :type="it.statusIcon" class="warnIcon" />
              </div>
              <div
                for=""
                v-for="(i, j) in it.data"
                :key="'m2' + j"
                class="itemData"
              >
                <span>{{ i.A_name }}</span>
                <span>{{ i.A_sum }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div :class="['mainContent', 'main03']">
        <div class="mainHeader">
          <span>{{ data.main03.title }}</span>
          <div class="btn">
            <Button type="primary">全部</Button>
            <Button type="text">异常</Button>
            <Button type="text" :icon="m3BtnIcon"></Button>
          </div>
        </div>
        <div :class="['main03body', up]">
          <div
            class="m3Item comItem"
            v-for="(it, index) in data.main03.data"
            :key="index"
            :class="it.status == 0 ? 'abnormal' : 'normal'"
          >
            <div class="title">
              <span>{{ it.title }}</span>
              <span>{{ it.time }}</span>
            </div>
            <div class="itemData"></div>
          </div>
        </div>
      </div>
      <div class="mainContent main04">
        <div class="mainHeader">
          <span>{{ data.main04.title }}</span>
          <div class="btn">
            <Button type="primary">近三天</Button>
            <Button type="text">昨天</Button>
            <Button type="text">当天</Button>
          </div>
        </div>
        <div id="mainCurve" style="widht:100%;height:500px"></div>
      </div>
    </div>
  </div>
</template>

<script>
import businessButton from "professionalComponents/businessButton";
import dateUtil from "@/assets/js/__utils__/date.js";
import * as echarts from "echarts";

export default {
  name: "WelcomePage",
  components: {
    businessButton
  },
  data() {
    return {
      up: "",
      m2BtnIcon: "ios-arrow-down",
      m3BtnIcon: "ios-arrow-down",
      data: {
        header: {
          time: new Date(),
          btn: {
            btnsite: "left", // 按钮对齐方式
            typeAll: "default",
            buttons: [
              {
                webname: "threeDays",
                text: "近三天",
                type: "primary",
                btnclick: () => {}
              },
              {
                webname: "yesterday",
                text: "昨天",
                btnclick: () => {}
              },
              {
                webname: "today",
                text: "当天",
                btnclick: () => {}
              }
            ]
          }
        },
        main01: {
          title: "第三方监控",
          sum: 10,
          ex_sum: 2,
          normal_sum: 8,
          status: 0,
          status_name: "异常",
          data: [
            {
              status: 0,
              status_name: '异常',
              title: "AG项目1",
              message: "异常单据",
              sum: 288
            },
            {
              status: 1,
              status_name: '正常',
              title: "AG项目2",
              message: "异常单据",
              sum: 288
            },
            {
              status: 1,
              status_name: '正常',
              title: "AG项目3",
              message: "异常单据",
              sum: 288
            },
            {
              status: 0,
              status_name: '异常',
              title: "AG项目4",
              message: "异常单据",
              sum: 288
            }
          ]
        },
        main02: {
          title: "对外接口监控项目详细数据",
          data: [
            {
              titleIcon: "ios-home",
              title: "WMS(AG项目1)",
              statusIcon: "ios-alert-outline",
              data: [
                {
                  status: 0,
                  A_name: "推送总数",
                  A_sum: 3880
                },
                {
                  status: 1,
                  A_name: "推送成功",
                  A_sum: 345
                },
                {
                  status: 0,
                  A_name: "推送失败率",
                  A_sum: "20%"
                }
              ]
            },
            {
              titleIcon: "ios-home",
              title: "WMS(AG项目1)",
              statusIcon: "ios-alert-outline",
              data: [
                {
                  status: 0,
                  A_name: "推送总数",
                  A_sum: 3880
                },
                {
                  status: 1,
                  A_name: "推送成功",
                  A_sum: 345
                },
                {
                  status: 0,
                  A_name: "推送失败率",
                  A_sum: "20%"
                }
              ]
            },
            {
              titleIcon: "ios-home",
              title: "WMS(AG项目1)",
              statusIcon: "ios-alert-outline",
              data: [
                {
                  status: 0,
                  A_name: "推送总数",
                  A_sum: 3880
                },
                {
                  status: 1,
                  A_name: "推送成功",
                  A_sum: 345
                },
                {
                  status: 0,
                  A_name: "推送失败率",
                  A_sum: "20%"
                }
              ]
            },
            {
              titleIcon: "ios-home",
              title: "WMS(AG项目1)",
              statusIcon: "ios-alert-outline",
              data: [
                {
                  status: 0,
                  A_name: "推送总数",
                  A_sum: 3880
                },
                {
                  status: 1,
                  A_name: "推送成功",
                  A_sum: 345
                },
                {
                  status: 0,
                  A_name: "推送失败率",
                  A_sum: "20%"
                }
              ]
            },
            {
              titleIcon: "ios-home",
              title: "WMS(AG项目1)",
              statusIcon: "ios-alert-outline",
              data: [
                {
                  status: 0,
                  A_name: "推送总数",
                  A_sum: 3880
                },
                {
                  status: 1,
                  A_name: "推送成功",
                  A_sum: 345
                },
                {
                  status: 0,
                  A_name: "推送失败率",
                  A_sum: "20%"
                }
              ]
            },
            {
              titleIcon: "ios-home",
              title: "WMS(AG项目1)",
              statusIcon: "ios-alert-outline",
              data: [
                {
                  status: 0,
                  A_name: "推送总数",
                  A_sum: 3880
                },
                {
                  status: 1,
                  A_name: "推送成功",
                  A_sum: 345
                },
                {
                  status: 0,
                  A_name: "推送失败率",
                  A_sum: "20%"
                }
              ]
            }
          ]
        },
        main03: {
          title: "服务异常监控详细数据（AG项目1）",
          data: [
            {
              title: "转单服务",
              time: "2h",
              status: 0,
              min: 10,
              max: 10000,
              desc: "积压单量",
              tips: ""
            },
            {
              title: "转单服务",
              time: "2h",
              status: 0,
              min: 10,
              max: 10000,
              desc: "积压单量",
              tips: ""
            },
            {
              title: "转单服务",
              time: "2h",
              status: 0,
              min: 10,
              max: 10000,
              desc: "积压单量",
              tips: ""
            },
            {
              title: "转单服务",
              time: "2h",
              status: 0,
              min: 10,
              max: 10000,
              desc: "积压单量",
              tips: ""
            },
            {
              title: "转单服务",
              time: "2h",
              status: 0,
              min: 10,
              max: 10000,
              desc: "积压单量",
              tips: ""
            }
          ]
        },
        main04: {
          title: "接口异常趋势图"
        }
      },
      vmI18n: window.vmI18n
    };
  },
  mounted() {
    // const domContent = document.getElementById('content');
    // domContent.style.padding = '0 0';
    this.data.header.time = dateUtil.getFormatDate(
      this.data.header.time,
      "yyyy-MM-dd HH:mm:ss"
    );
    this.curveChart();
  },
  destroyed() {
    if (document.getElementById("content")) {
      const domContent = document.getElementById("content");
      domContent.style.padding = "0 15px";
    }
  },

  methods: {
    upDown() {
      this.up = this.up ? "" : "fadeInDom";
      this.m2BtnIcon =
        this.m2BtnIcon == "ios-arrow-down" ? "ios-arrow-up" : "ios-arrow-down";
    },
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
          bottom: 50
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
          formatter: params => {
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
          }
        },
        // 坐标轴指示器 必须搭配tooltip的type:'axis'
        axisPointer: {
          type: "line",
          lineStyle: {
            color: "#F2F2F2"
          }
        },
        xAxis: {
          type: "category",
          axisLine: {
            lineStyle: {
              color: "#F2F2F2"
            }
          },
          // 刻度尺
          axisTick: {
            show: false
          },
          axisLabel: {
            fontSize: "12",
            color: "#8D91A1"
          },
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
        },
        yAxis: {
          type: "value",
          // 分割线
          splitLine: {
            show: true,
            lineStyle: {
              color: "#F2F2F2"
            }
          }
        },
        // 数据设置项
        series: [
          {
            type: "line",
            symbol:'circle',
            smooth: true, //平滑折线  = 曲线
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            symbolSize: 10, // 设定折线点的大小
            // 折线条的样式
            lineStyle: {
              color: "#FF6951",
              width: 2
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
                  color: '#FF6951', //颜色
                  borderColor: '#fff', //图形的描边颜色
                  borderWidth: 2, // 描边的线宽
                  shadowBlur: 4, // 图形的阴影大小
                  shadowColor: '#FF6951', // 图形的阴影颜色
              }
            }
          }
        ]
      };
      // 设置选项
      option && myChart.setOption(option);
    }
  }
};
</script>

<style scoped lang="less">
@import "~@burgeon/oms-theme/skin/public.less";
@import "./public.less";
</style>

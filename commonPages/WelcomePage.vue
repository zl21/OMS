<!--
 * @Author: your name
 * @Date: 2021-04-27 11:20:18
 * @LastEditTime: 2021-08-11 10:45:14
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
      <div class="btn">
        <Button type="primary">近三天</Button>
        <Button type="text">昨天</Button>
        <Button type="text">当天</Button>
      </div>
      <div class="time">
        <span>更新时间：{{ data.header.time }}</span>
        <Icon type="ios-refresh" />
      </div>
    </div>
    <div class="main">
      <div class="mainContent main01">
        <h2>{{ data.main01.title }}</h2>
        <div class="main01body">
          <div class="left">
            <div id="main" style="width: 200px; height: 200px"></div>
          </div>
          <div class="right">
            <div
              class="rightItem"
              v-for="(it, index) in data.main01.data"
              :key="index"
              :class="it.status == 0 ? 'abnormal' : 'normal'"
            >
              <Icon type="ios-alert-outline" />
              <span>{{ it.title }}</span>
              <div class="info">
                <span>{{ it.message }}</span>
                <span>{{ it.sum }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div :class="['mainContent', 'main02']">
        <h2>{{ data.main02.title }}</h2>
        <div class="btn">
          <Button type="primary">全部</Button>
          <Button type="text">异常</Button>
          <Button type="text" :icon="m2BtnIcon" @click="upDown"></Button>
        </div>
        <div :class="['main02body', up]">
          <div
            class="m2Item"
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
      <div :class="['mainContent', 'main03']">
        <h2>{{ data.main03.title }}</h2>
        <div class="btn">
          <Button type="primary">全部</Button>
          <Button type="text">异常</Button>
          <Button type="text" :icon="m3BtnIcon"></Button>
        </div>
        <div :class="['main03body', up]">
          <div
            class="m3Item"
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
        <h2>{{ data.main04.title }}</h2>
        <div class="btn">
          <Button type="primary">近三天</Button>
          <Button type="text">昨天</Button>
          <Button type="text">当天</Button>
        </div>
        <div id="mainCurve" style="widht:100%;height:500px"></div>
      </div>
    </div>
  </div>
</template>

<script>
import businessButton from "professionalComponents/businessButton";
import dateUtil from "@/assets/js/__utils__/date.js";
// 按需引入
import * as echarts from "echarts/core";
import { GridComponent } from "echarts/components";
import { LineChart } from "echarts/charts";
import { CanvasRenderer } from "echarts/renderers";

echarts.use([GridComponent, LineChart, CanvasRenderer]);

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
              title: "AG项目1",
              message: "异常单据",
              sum: 288
            },
            {
              status: 1,
              title: "AG项目2",
              message: "异常单据",
              sum: 288
            },
            {
              status: 1,
              title: "AG项目3",
              message: "异常单据",
              sum: 288
            },
            {
              status: 0,
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
      // 获取chart节点
      const chartDom = document.getElementById("mainCurve");
      // 初始化
      const myChart = echarts.init(chartDom);
      // 配置选项
      const option = {
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: "line",
            smooth: true
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

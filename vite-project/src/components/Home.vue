
<template>
  <div className="home">
    <div className="header">
      <img src="../assets/logo1.png" alt="">
    </div>
    <div className="body">
      <div className="body-left">
        <div :key="index" v-for="(it,index) in info">
          <span className="title" @click="titleClick(it)">{{it.en}}</span>
          <span className="subTitle" @click="titleClick(it)"> - {{it.zh}}</span>
        </div>
      </div>
      <div className="body-right">
        <!-- <img src="../assets/img1.png" alt=""> -->
      </div>
    </div>
    <div className="footer">
      <span className="copyright">©2021-2022 Burgeon Software Co.,Ltd. All rights reserved.</span>
      <span className="author">BY OMS</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";

// defineProps<{ msg: string }>();

const titleClick = (it: any) => {
  window.open(it.url);
};
const count = ref(0);
const info = reactive([
  {
    en: "OMS UI",
    zh: "OMS组件库",
    url: "http://101.132.182.36:20003/",
  },
  {
    en: "THEME",
    zh: "主题",
    url: "http://101.132.182.36:20002/?path=/story/other-theme--page",
  },
  {
    en: "I18N", // INTERNATIONALNATION
    zh: "国际化",
    url: "http://101.132.182.36:20000/",
  },
]);
</script>

<style lang="less" scoped>
.home {
  display: flex;
  flex-direction: column;
  // font-size: 0;
  padding: 40px 80px;
  height: 100vh;
  box-sizing: border-box;
  .header {
    img {
      height: 60px;
      float: left;
      margin-left: 50px;
    }
  }
  .body {
    flex: 1;
    display: flex;

    &-left {
      flex: 0.4;
      div {
        margin: 32px 0;
      }
      span {
        display: block;
        line-height: 1;
        width: fit-content;
        &:hover {
          color: rgb(191, 191, 217);
          cursor: pointer;
        }
      }
      .title {
        font-size: 64px;
        font-weight: 1000;
        font-family: Arial Bold;
        color: #f5f5f5;
      }
      .subTitle {
        font-size: 24px;
        font-weight: 500;
        font-family: 微软雅黑;
        // color: #f5f5f5;
      }
    }
    &-right {
      flex: 0.6;
      width: 100%;
      height: 100%;
      background: url("../assets/img1.png") center / cover no-repeat;
    }
  }
  .footer {
    position: relative;
    span {
      position: absolute;
      bottom: 0;
      font-size: 12px;
    }
    // .copyright {
    //   float: left;
    // }
    .author {
      // float: right;
      right: 0;
    }
  }
  .header,
  .footer {
    flex: 0.2;
  }
}
</style>
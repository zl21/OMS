<template>
  <div class="loginBG">
    <div ref="container" class="container">
      <div class="login-content">
        <!-- logo -->
        <div class="logo-img">
          <img src="../assets/img/form-logo.png" />
        </div>
        <div class="title">欢迎登录</div>
        <!-- form -->
        <div class="form-input">
          <label>
            <i class="iconfont icon-yonghu"></i>
          </label>
          <div class="input-box">
            <input
              ref="username"
              type="text"
              value=""
              class="username"
              placeholder="请输入用户名"
            />
          </div>
        </div>
        <div class="form-input">
          <label>
            <i class="iconfont icon-mima"></i>
          </label>
          <div class="input-box">
            <input
              ref="password"
              type="password"
              value=""
              class="pwd"
              placeholder="请输入密码"
            />
          </div>
        </div>
        <!-- button -->
        <div id="btn" class="btn" @click="login">
          登录
          <img src="../assets/img/arrow-right.png" />
        </div>
        <p class="fargetPws">
          <a>忘记密码了？</a>
        </p>
        <!-- bg -->
        <span class="login-bg-img">
          <img src="../assets/img/login-bg-img.png" />
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import R3 from "@syman/burgeon-r3";
import service from '@/service/index';
export default {
  name: "Login",
  methods: {
    login() {
      let message = {};
      if (this.$refs.username.value === "") {
        message = {
          title: "错误",
          content: "请输入用户名",
        };
        this.$Modal.fcError(message);
      } else if (this.$refs.password.value === "") {
        message = {
          title: "错误",
          content: "请输入密码",
        };
        this.$Modal.fcError(message);
      } else if (
        this.$refs.username.value !== "" &&
        this.$refs.password.value !== ""
      ) {

        service.common.getCaptcha().then((res) => {
          let params = {
            username: this.$refs.username.value,
            password: this.$refs.password.value,
            captcha: res.data.captcha,
            rememberMe: false,
            lang: 'zh_CN',
          }
          service.common.globalLogin(R3.urlSearchParams(params)).then((r) => {
            if (r.status === 200 && r.data.code === 0) {
              window.location.href = window.location.origin;
            }
          })
        });
      }
    },
  },
};
</script>

<style lang="less" scoped>
.loginBG {
  background: url(../assets/img/login-bg.jpg) no-repeat;
  background-size: cover;
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  .login {
    position: absolute;
    top: 33%;
    right: 0;
    width: 610px;
    height: 680px;
  }
  /*整块内容*/
  .container {
    width: 1024px;
    height: 480px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 17px;
    background: url(../assets/img/login-form-bg.png) right no-repeat #fff;
    background-size: auto 100%;
  }
  .login-content {
    width: 50%;
    text-align: center;
    min-width: 400px;
  }
  /*头部区域*/
  .logo-img {
    display: inline-block;
    margin-top: 50px;
    text-align: center;
    width: 240px;
    height: 80px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .title {
    cursor: default;
    text-align: center;
    font-size: 14px;
    color: #6d6e71;
  }
  .form-input {
    height: 40px;
    line-height: 40px;
    position: relative;
    background: #ffffff;
    border: 1px solid #dbdde8;
    border-radius: 5px;
    width: 320px;
    padding-left: 40px;
    margin-top: 24px;
    display: inline-block;
    font-size: 14px;
    label {
      position: absolute;
      left: 10px;
      top: 0;
      height: 38px;
      line-height: 38px;
      width: 40px;
      text-align: left;
      color: #292f43;
      i {
        font-size: 20px;
        color: #b3b4bd;
      }
    }
    input {
      width: 100%;
      height: 38px;
      line-height: 1;
      display: block;
      border: none;
      background: transparent;
      padding-right: 16px;
      &:-webkit-placeholder {
        color: #c3c6d2;
      }
      &:-webkit-autofill {
        -webkit-text-fill-color: #292f43;
        -webkit-box-shadow: 0 0 0px 1000px transparent inset !important;
        background-color: transparent;
        background-image: none;
        transition: background-color 50000s ease-in-out 0s; //背景色透明  生效时长  过渡效果  启用时延迟的时间
      }
    }
  }
  .btn {
    display: inline-block;
    margin-top: 24px;
    width: 320px;
    height: 40px;
    line-height: 40px;
    opacity: 1;
    background: #5461b8;
    border-radius: 4px;
    font-size: 16px;
    font-weight: bold;
    color: #fff;
    box-shadow: 0px 6px 20px 0px rgba(69, 96, 171, 0.31);
    cursor: pointer;
    img {
      width: 20px;
      height: 20px;
      vertical-align: middle;
    }
  }
  .fargetPws {
    height: 45px;
    line-height: 45px;
    a {
      color: #5461b8;
      text-decoration: underline;
    }
  }
  .login-bg-img {
    width: 137px;
    position: absolute;
    left: -35px;
    bottom: -20px;
    img {
      width: 100%;
    }
  }
}
</style>

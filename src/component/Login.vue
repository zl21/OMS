<template>
  <div class="loginBG">
    <div
      ref="container"
      class="container"
    >
      <!-- <img
        src="../assets/image/logo.1.png"
        alt="logo"
        class="logo"
      > -->
      <span class="titleTOP">用户登录</span>
      <div class="divAccount">
        <img
          src="../assets/image/account.png"
          class="icon"
        >
        <input
          ref="username"
          type="text"
          value=""
          class="username"
          placeholder="请输入用户名"
        >
      </div>
      <div class="divMima">
        <img
          src="../assets/image/password.png"
          class="icon"
        >
        <input
          ref="password"
          type="password"
          value=""
          class="pwd"
          placeholder="请输入密码"
        >
      </div>
     
      <div
        id="btn"
        class="btn"
        @click="login"
      />
    </div>
  </div>
</template>

<script>

  import R3 from '@syman/burgeon-r3';

  const enableGateWay = false;
  const { network, urlSearchParams } = R3;
  
  export default {
    name: 'Login',
    methods: {
      
      login() {
        let message = {};
        if (this.$refs.username.value === '') {
          message = {
            title: '错误',
            content: '请输入用户名'
          };
          this.$Modal.fcError(message);
        } else if (this.$refs.password.value === '') {
          message = {
            title: '错误',
            content: '请输入密码'
          };
          this.$Modal.fcError(message);
        } else if (this.$refs.username.value !== '' && this.$refs.password.value !== '') {
          const globalServiceId = window.sessionStorage.getItem('serviceId');
          network.post(enableGateWay ? `/${globalServiceId}/p/c/getCaptcha` : '/p/c/getCaptcha').then((res) => {
            network.post(enableGateWay ? `/${globalServiceId}/p/c/login` : '/p/c/login', urlSearchParams({
              username: this.$refs.username.value,
              password: this.$refs.password.value,
              captcha: res.data.captcha,
              rememberMe: false,
              lang: 'zh_CN',
            })).then((r) => {
              if (r.status === 200 && r.data.code === (0 || 1)) {
                window.location.href = window.location.origin;
              }
            });
          });
        }
      }
    }
  };
</script>

<style lang="less" scoped>
  .loginBG {
    background: url(../assets/image/loginBg.jpg) no-repeat;
    background-size: cover;
    width: 100%;
    height: 100%;
    position: relative;
    min-width: 660px;
    display: flex;
    justify-content: center;
    /*快鱼logo*/
    .logo {
      position: absolute;
      width: 90%;
      top: -130px;
      left: 15px;
    }
    .login {
      position: absolute;
      top: 33%;
      right: 0;
      width: 610px;
      height: 680px;
    }
    /*整块内容*/
    .container {
      width: 460px;
      height: 267px;
      position: absolute;
      top: 33%;
      background-color: #fff;
      right: 150px;
    }
    .iIcon {
      width: 24px;
      height: 24px;
      background-color: #fff;
    }
    /*头部区域*/
    .titleTOP {
      margin: 40px 0 18px 60px;
      font-size: 20px;
      font-weight: bold;
      color: #111419;
      display: inline-block;
      letter-spacing: 2px;
    }
    
    /*帐号和密码*/
    .username, .pwd {
      width: 340px;
      height: 38px;
      border-radius: 4px;
      margin-bottom: 18px;
      box-sizing: border-box;
      padding: 0 20px 0 40px;
      border: 1px solid #dadada;
      background: #f9f9f9;
      color: #575757;
      font-size: 14px;
    }
    .divAccount {
      position: absolute;
      top: 78px;
      left: 60px;
    }
    .icon {
      
      position: absolute;
      width: 18px;
      height: 18px;
      background-size: cover;
      left: 13px;
      top: 10px;
      color: #575757;
    }
    .divMima {
      position: absolute;
      top: 134px;
      left: 60px;
    }
    
    ::-webkit-input-placeholder { /* WebKit browsers */
      color: #dadada;
      font-size: 14px;
      
    }
    :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
      font-size: 14px;
      color: #dadada;
    }
    ::-moz-placeholder { /* Mozilla Firefox 19+ */
      font-size: 14px;
      color: #dadada;
    }
    :-ms-input-placeholder { /* Internet Explorer 10+ */
      font-size: 14px;
      color: #dadada;
    }
    
    /*滑块*/
    .movebox {
      position: absolute;
      top: 190px;
      left: 60px;
      /*position: relative;*/
      /*margin-left: 60px;*/
      margin-bottom: 32px;
      border-radius: 4px;
      /*background-color: #e8e8e8;*/
      background: #f9f9f9;
      width: 338px;
      /*height: 36px;*/
      line-height: 36px;
      text-align: center;
      border: 1px solid #dadada;
      .txt {
        position: absolute;
        top: 0;
        width: 338px;
        font-size: 14px;
        border-radius: 6px;
        /*background: rgba(255,255,255,.1);*/
        color: #dadada;
        -moz-user-select: none;
        -webkit-user-select: none;
        user-select: none;
        -o-user-select: none;
        -ms-user-select: none;
        height: 36px;
      }
      .movego {
        background-color: #09A155;
        height: 36px;
        width: 0px;
        /*border-radius: 6px;*/
        /*border-radius: 6px;*/
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
        /*border: 1px solid #d8d8d8;*/
      }
      .move {
        position: absolute;
        top: -1px;
        left: -1px;
        width: 38px;
        height: 38px;
        /*background: #636363 !important;*/
        /*border: 1px solid #fff;*/
        cursor: pointer;
        border-radius: 4px;
      }
    
    }
    .line {
      position: absolute;
      top: 260px;
      left: 0;
      width: 100%;
      height: 1px;
      background: #dadada;
      
    }
    .checkBox {
      display: inline-block;
      position: absolute;
      /*background: red;*/
      top: 288px;
      left: 60px;
      /*margin-left: 60px;*/
    }
    .checkBox > span {
      color: #575757;
      position: absolute;
      width: 80px;
      top: 3px;
      left: 18px;
      font-size: 12px;
    }
    .remenber {
      position: absolute;
      top: 3px;
      width: 14px;
      height: 14px;
    }
    .btn {
      background: url(../assets/image/login.png) no-repeat;
      background-size: cover;
      cursor: pointer;
      position: absolute;
      /*display: inline-block;*/
      top: 196px;
      right: 60px;
      width: 100px;
      height: 38px;
      font-size: 14px;
      margin-top: 3px;
      margin-left: 300px;
      color: #fff;
      border-radius: 4px;
    }
  }
</style>

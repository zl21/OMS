<template>
  <div class="loginBG">
    <!--  -->
    <div class="i18nDom">
      <Dropdown>
        <a href="javascript:void(0)">
          <!-- 中/En -->
          {{ curLang }}
          <Icon type="ios-arrow-down"></Icon>
        </a>
        <DropdownMenu slot="list">
          <DropdownItem
            v-for="item in langConfig"
            :key="item.type"
            @click.native="toggleLang(item.type)"
            :disabled="vmI18n.locale == item.type"
            >{{ item.text }}</DropdownItem
          >
        </DropdownMenu>
      </Dropdown>
    </div>
    <div ref="container" class="login-container">
      <div class="login-content">
        <!-- logo -->
        <!-- <div class="login-type-bg" @click="cutLoginType">
          <img :src="loginType == 2? require('../assets/img/login-pc-icon.png'): require('../assets/img/login-mobile-icon.png')" alt="">
        </div> -->
        <div class="logo-img">
          <img src="../assets/img/form-logo.png" />
        </div>
        <!-- 欢迎登录 -->
        <div class="title">{{ vmI18n.t("welcome") }}</div>

        <R3Login />
        <!-- form -->
        <!-- <div class="form-input">
          <label>
            <i class="iconfont icon-yonghu"></i>
          </label>
          <div class="input-box">
            <input
              ref="username"
              type="text"
              value=""
              class="username"
              :placeholder="vmI18n.t('pHolder.a2')"
            />
          </div>
        </div>
        <div class="login-type" v-if="loginType == 2">
          <div>
            <div class="form-input">
              <label>
                <i class="iconfont icon-yonghu"></i>
              </label>
              <div class="input-box">
                <input
                  type="text"
                  maxlength="11"
                  class="username"
                  placeholder="手机号"
                  v-model="receiver"
                  autofocus
                />
              </div>
            </div>
          </div>
          <div>
            <div class="form-input" style="width: 216px">
              <label>
                <i class="iconfont icon-mima"></i>
              </label>
              <div class="input-box">
                <input
                  type="text"
                  class="kaptcha"
                  placeholder="输入图形验证码"
                  maxlength="4"
                  v-model="captchaText"
                />
              </div>
            </div>
            <img
              :src="captchaImag"
              alt=""
              class="kaptchaImg"
              @click="getIdaasKaptcha"
            />
          </div>
        </div> -->
        <!-- button -->
        <!-- <div id="btn" class="btn" @click="login">
          {{ vmI18n.t("login") }}
          <img src="../assets/img/arrow-right.png" />
        </div> -->
        <!-- <p class="fargetPws">
          <a>忘记密码了？</a>
        </p> -->
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
import i18n from '@burgeon/internationalization/i18n'; // 国际化
window.$i18n = i18n;

const langConfig = [
  {
    type: 'zh',
    text: '中文',
  },
  {
    type: 'en',
    text: 'English',
  },
  {
    type: 'ja',
    text: '日本語',
  },
];
export default {
  name: "Login",
  components: {
    R3Login: R3.components.Login
  },
  data() {
    return {
      vmI18n: i18n,
      langConfig,
      curLang: '', // 当前语言
      loginType: 1,  //登录类型 1：普通登录 2：短信登录
      captcha: "", //图片校验码
      captchaImag: null, //图片
      captchaCode: "",//idaas返回验证码code
      captchaText: "",//用户输入idaas图片验证码
      receiver: null, //手机号
      smscode: null, //短信验证嘛
      codeShow: true, //控制短信验证码的发送
      timeLoading: 0 //倒计时
    };
  },
  created() {
    const _this = this;
    const browseLan = localStorage.getItem('locale') || 'zh';
    _this.vmI18n.locale = browseLan;
    this.curLang = langConfig.find(it => it.type == browseLan).text;
  },
  mounted() {
    let loginBtn = document.getElementById('btn')
    loginBtn.innerHTML = `${this.vmI18n.t("login")} <img src="${require('../assets/img/arrow-right.png')}" />`
  },
  methods: {
    toggleLang(lang) {
      const _this = this;
      let message = ['zh', 'en'].includes(lang) ? _this.vmI18n.messages[lang].tip_info : lang;
      switch (message) {
        case 'ja':
          message = "暂无日语语言包，敬请期待！(已默认使用中文)"
          break;
        default:
          break;
      }
      if (!['zh', 'en'].includes(lang)) {
        lang = 'zh'
      }
      localStorage.setItem('locale', lang);
      // _this.vmI18n.locale = localStorage.getItem('locale');
      _this.vmI18n.locale = lang;
      this.curLang = langConfig.find(it => it.type == lang).text;
      R3.store.commit(`customize/language`, lang || 'zh');

      this.$message({
        // message: _this.vmI18n.messages[lang].tip_info,
        message,
        // type: _this.vmI18n.messages[lang].tip_type,
        type: 'success',
      });
    },
    login() {
      let message = {};
      if (this.$refs.username.value === "") {
        message = {
          title: $i18n.t('modalTitle.error'), // 错误
          content: $i18n.t('username'), // 请输入用户名
        };
        this.$Modal.fcError(message);
      } else if (this.$refs.password.value === "") {
        message = {
          title: $i18n.t('modalTitle.error'), // 错误
          content: $i18n.t('password'), // 请输入密码
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
            localStorage.setItem("name", this.$refs.username.value)
            if (r.status === 200 && r.data.code === 0) {
              let obj = {
                TID: this.$refs.username.value,
                LOGIN_RESULT: "success",
                LOGIN_MESSAGE: "success"
              }
              // 切换语言
              const pa = new FormData();
              pa.append('language', localStorage.getItem("locale") || 'zh');
              service.common.langSwitcher(pa).then((r) => {
                if (r.status === 200 && r.data.code === 0) {
                  console.log('langSwitcher success!');
                }
              })
              // 御城河
              service.common.loginLog(obj).then(res=>{
                console.log(res);
              })
              window.location.href = window.location.origin;
            }else{
               let obj = {
                TID: this.$refs.username.value,
                LOGIN_RESULT: "fail",
                LOGIN_MESSAGE: r.data.message
              }
              service.common.loginLog(obj).then(res=>{
                console.log(res);
              })
            }
          })
        });
      }
    },
    // 切换tab时清空数据
    clearInfo(value) {
      if (value === "name1") {
        this.getIdaasKaptcha();
      }
      (this.uname = ""), //账户名
        (this.pwd = ""), //密码
        (this.captcha = ""), //图片校验码
        (this.receiver = null), //手机号
        (this.smscode = null); //短信验证嘛
      this.codeShow = true;
      this.timeLoading = 0;
    },
    // 获取图片验证码
    getKaptcha() {
      this.captchaImag = `/p/c/kaptcha?v=${this.getNum()}`;
    },
    // 获取图片验证码
    getIdaasKaptcha() {
      let _that = this;
      let _url = "/p/c/kaptchaidaas";
      $.ajax({
        url: _url,
        type: "post",
        dataType: "json",
        success: function (_res) {
          _that.captchaCode = _res.data.code;
          _that.captchaImag = "data:image/png;base64," + _res.data.captcha;
        }
      });
    },
    cutLoginType() {
      //切换登录方式
      this.loginType = this.loginType == 1 ? 2 : 1;
      this.captchaText = "";
      if(this.loginType == 2){
        this.getIdaasKaptcha();
      }
    },
    getNum() {
      //获取32位随机数
      var chars = [
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z",
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "h",
        "i",
        "j",
        "k",
        "l",
        "m",
        "n",
        "o",
        "p",
        "q",
        "r",
        "s",
        "t",
        "u",
        "v",
        "w",
        "x",
        "y",
        "z"
      ];
      var nums = "";
      for (var i = 0; i < 32; i++) {
        var id = parseInt(Math.random() * 61);
        nums += chars[id];
      }
      return nums;
    },

    // 获取短信校验码
    sendsms() {
      let _that = this;
      if (!this.receiver) {
        // this.errorMessage({
        //   action: "confirm",
        //   title: "警告",
        //   type: "error",
        //   list: [],
        //   isAction: true,
        //   desc: "请输入手机号"
        // });
        return;
      }
      if(!(/^1\d{10}$/.test(this.receiver))){
        this.errorMessage({
          action: "confirm",
          title: "警告",
          type: "error",
          list: [],
          isAction: true,
          desc: "手机格式不正确，请重新输入；"
        });
        return false;
      }
      if (!this.captchaText) {
        this.errorMessage({
          action: "confirm",
          title: "警告",
          type: "error",
          list: [],
          isAction: true,
          desc: "请输入图形验证码"
        });
        return;
      }

      $.ajax({
        url: "/p/c/sendidaassms",
        method: "post",
        dataType: "json",
        data: {
          phone: this.receiver,
          captchaText: this.captchaText,
          captchaCode: this.captchaCode
        },
        success: function (res) {
          if (res.code != 200) {
            _that.errorMessage({
              action: "confirm",
              title: "警告",
              type: "error",
              list: [],
              isAction: true,
              desc: res.message || res.msg
            });
            return;
          }
          _that.sToken = res.data.sToken;
          _that.timeLoading = 60;
          _that.codeShow = false;
          let timer = setInterval(() => {
            _that.timeLoading--;
            if (_that.timeLoading === 0) {
              clearInterval(timer);
              _that.codeShow = true;
            }
          }, 1000);
        }
      });
    }
  },
};
</script>

<style lang="less" scoped>
@import "~@burgeon/oms-theme/skin/public.less";
.loginBG {
  background: url(../assets/img/login-bg.jpg) no-repeat;
  background-size: cover;
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  .i18nDom {
    z-index: 999;
    position: absolute;
    top: 16px;
    right: 16px;
    border: 1px solid #fff;
    padding: 2px 0;
    border-radius: 5px;
    width: 100px;
    text-align: center;
    .ark-dropdown {
      min-width: 100px;
    }
    button {
      height: 24px;
      width: 60px;
      border-radius: 2px;
      border: 1px solid @button-border;
      color: @button-border;
      background-color: @button-bg-font;
      margin-right: 20px;
    }
    span {
      font-size: 16px;
      text-align: left;
    }
    /deep/ .ark-dropdown-rel a {
      color: #fff;
      display: inline-block;
      line-height: 20px;
    }
  }
  .login {
    position: absolute;
    top: 33%;
    right: 0;
    width: 610px;
    height: 680px;
  }
  /*整块内容*/
  .login-container {
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
    height: 100%;
    position: relative;
    /deep/.login {
      // background: transparent;
      // .container {

      // }
      /* 覆盖框架登录样式 */
      background: none;
      position: relative !important;
      right: 14.5% !important;
      top: 0 !important;
      width: 0 !important;
      height: 0 !important;
      .container {
        width: 440px !important;
        &.loginPro {
          height: 285px !important;
        }
        &.loginPro, &.divErCode {
          background: transparent !important;
          .titleTOP {
            display: none;
          }
          .logo {
            display: none;
          }
        }
      }
      input:-webkit-autofill {
        -webkit-text-fill-color: #292f43;
        box-shadow: 0 0 0px 1000px transparent inset !important;
        background-color: transparent;
        background-image: none;
        transition: background-color 50000s ease-in-out 0s;
      }
      .divAccount {
        top: 25px !important;
      } 
      .divMima, .divErCode .divCode {
        top: 88px !important;
      }
      .loginPro .divCode, .btn {
        top: 151px !important;
      }
      .divAccount img, .divMima img, .divCode img{
        display: none;
      }
      .divAccount:before,.divCode:before,.divMima:before {
        content: '\e64b';
        display: inline-block;
        width: 20px;
        height: 20px;
        font-family: 'iconfont';
        position: absolute;
        top: 9px;
        left: 10px;
        font-size: 20px;
        color: #b3b4bd;
      }
      .divCode:before{
        content: '\e60c';
        top: 0;
      }
      .divMima:before {
        content: '\e60c';
      }
      .pwd, .username {
        width: 320px !important;
        background: #fff !important;
        border: 1px solid #dbdde8 !important;
      }
      .pwd::-webkit-input-placeholder,.pwd.code::-webkit-input-placeholder, .username::-webkit-input-placeholder{
        color:#97a8be;
      }
      .divErCode .code, .loginPro .code {
        width: 200px !important;
      }
      .divErCode .code {
        width: 213px !important;
      }
      .divErCode .codeimg, .loginPro .codeimg {
        top: 151px !important;
      }
      .container.loginPro .btn, .container.divErCode .btn {
        display: inline-block;
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
      }
      .container.loginPro .btn img, .container.divErCode .btn img {
        width: 20px;
        height: 20px;
        vertical-align: middle;
      }
      .loginPro .btn {
        top: 214px !important;
      }
    }
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
  .login-type-bg {
    position: absolute;
    right: 0px;
    top: 0px;
    color: #0E8EE9;
    font-size: 15px;
    cursor: pointer;
  }
  .login-type-bg img {
    width: 100px;
    height: 100px;
    opacity: .65;
  }
  .kaptchaImg {
    width: 100px;
    position: relative;
    top: 15px;
    height: 40px;
    cursor: pointer;
    border-radius: 2px;
  }
  .getSmscode {
    position: absolute;
    right: 16px;
    top: 0;
    font-size: 14px;
    cursor: pointer;
    color: #0068b7;
  }
}
</style>

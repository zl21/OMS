<template>
  <div class="loginBG">
    <!--  -->
    <div class="i18nDom">
      <Dropdown>
        <a href="javascript:void(0)">
          <!-- 中/En -->
          {{curLang}}
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
    <div ref="container" class="container">
      <div class="login-content">
        <!-- logo -->
        <div class="logo-img">
          <img src="../assets/img/form-logo.png" />
        </div>
        <!-- 欢迎登录 -->
        <div class="title">{{vmI18n.t("welcome")}}</div>
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
              :placeholder="vmI18n.t('pHolder.a2')"
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
              :placeholder="vmI18n.t('pHolder.a3')"
            />
          </div>
        </div>
        <!-- button -->
        <div id="btn" class="btn" @click="login">
          <!-- 登录 -->
          {{vmI18n.t("login")}}
          <img src="../assets/img/arrow-right.png" />
        </div>
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
  data() {
    return {
      vmI18n: i18n,
      langConfig,
      curLang: '', // 当前语言
    };
  },
  created() {
    const _this = this;
    const browseLan = localStorage.getItem('locale') || 'zh';
    _this.vmI18n.locale = browseLan;
    this.curLang = langConfig.find(it => it.type == browseLan).text;
  },
  methods: {
    toggleLang(lang) {
      const _this = this;
      let message = ['zh','en'].includes(lang) ? _this.vmI18n.messages[lang].tip_info : lang;
      switch (message) {
        case 'ja':
          message = "暂无日语语言包，敬请期待！(已默认使用中文)"
          break;
        default:
          break;
      }
      if (!['zh','en'].includes(lang)) {
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
@import '~@burgeon/oms-theme/skin/public.less';
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
    padding: 1px 18px;
    border-radius: 5px;
    width: 100px;
    text-align: center;
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

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
        <div class="logo-img">
          <img src="../assets/img/form-logo.png" />
        </div>
        <!-- 欢迎登录 -->
        <div class="title">{{ vmI18n.t("welcome") }}</div>
        <!-- 表单 -->
        <R3Login />
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
      curLang: '' // 当前语言
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
      /* 覆盖框架登录样式 */
      background: transparent;
      position: relative !important;
      right: 14.5% !important;
      top: 0 !important;
      width: 0 !important;
      height: 0 !important;
      .container {
        width: 440px !important;
        background: transparent !important;
        .logo {
          display: none;
        }
        input:-webkit-autofill {
          -webkit-text-fill-color: #292f43;
          box-shadow: 0 0 0px 1000px transparent inset !important;
          background-color: transparent;
          background-image: none;
          transition: background-color 50000s ease-in-out 0s;
        }
        .pwd, .username {
          width: 320px !important;
          background: #fff !important;
          border: 1px solid #dbdde8 !important;
        }
        .pwd, .username {
          &::-webkit-input-placeholder {
            color:#97a8be;
          }
        }
        .divAccount, .divMima, .divCode {
          img {
            display: none;
          }
          &:before {
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
        }
        .divCode:before {
          content: '\e60c';
          top: 0;
        }
        .divMima {
          top: 88px !important;
          &:before {
            content: '\e60c';
          }
        }
        .btn {
          top: 151px !important;
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
          img {
            width: 20px;
            height: 20px;
            vertical-align: middle;
          }
        }
        &.loginPro, &.divErCode {
          .titleTOP, .logo {
            display: none;
          }
          .code {
            width: 200px !important;
          }
          .codeimg {
            top: 151px !important;
          }
          
          // .pwd.code {
          //   &::-webkit-input-placeholder {
          //     color:#97a8be;
          //   }
          // }
        }
        &.loginPro {
          height: 285px !important;
          .divCode {
            top: 151px !important;
            .pwd.code {
              width: 200px !important;
            }
          }
          .btn {
            top: 214px !important;
          }
        }
        &.divErCode {
          .divCode {
            top: 88px !important;
          }
          .code {
            width: 213px !important;
          }
        }
      }
      .divAccount {
        top: 25px !important;
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
}
</style>
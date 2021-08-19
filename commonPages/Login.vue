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
          <img :src="require('@/assets/img/form-logo.png')" />
        </div>
        <!-- tabs -->
        <div class="loginTabs" v-if="isEnableLoginPro">
          <div class="tab" @click="toggleTab('pwd')">
            <span>{{ vmI18n.t("other.vCodeLogin") }}</span>
          </div>
          <div class="tab" @click="toggleTab('phone')">
            <span>{{ vmI18n.t("other.pwdLogin") }}</span>
          </div>
        </div>
        <!-- 欢迎登录 -->
        <div class="title" v-else>{{ vmI18n.t("welcome") }}</div>
        <!-- 表单 -->
        <R3Login :loginSucCbk="loginSucCbk" />
        <!-- bg -->
        <span class="login-bg-img">
          <img :src="require('@/assets/img/login-bg-img.png')" />
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import R3 from "@syman/burgeon-r3";
import service from '@/service/index';
import i18n from "@burgeon/internationalization/i18n"; // 国际化
window.$i18n = i18n;

const langConfig = [
  {
    type: "zh",
    text: "中文",
  },
  {
    type: "en",
    text: "English",
  },
  {
    type: "ja",
    text: "日本語",
  },
];
export default {
  name: "Login",
  components: {
    R3Login: R3.components.Login,
  },
  data() {
    return {
      vmI18n: i18n,
      langConfig,
      curLang: "", // 当前语言
      isEnableLoginPro: false, // 是否开启手机验证码登录
    };
  },
  created() {
    const _this = this;
    const browseLan = localStorage.getItem("locale") || "zh";
    _this.vmI18n.locale = browseLan;
    this.curLang = langConfig.find((it) => it.type == browseLan).text;
  },
  mounted() {
    this.isEnableLogin();
    this.initDom();
  },
  methods: {
    initDom() {
      let isPhone = document.querySelector(".divErCode");
      let account = document.querySelector(".divAccount");
      let code = document.querySelector(".divCode");
      let inputNodes = document.querySelectorAll(".loginCore .container input");
      code &&
        code.setAttribute("data-code", this.vmI18n.t("other.verticalCode"));
      if (isPhone) {
        // 验证码登录
        account.setAttribute(
          "data-phone",
          this.vmI18n.t("form_label.cellPhone_number")
        );
        inputNodes[0].setAttribute("placeholder", this.vmI18n.t("pHolder.a6")); // 请输入手机号
        inputNodes[1].setAttribute("placeholder", this.vmI18n.t("pHolder.a8")); // 请输入短信验证码
      } else {
        // 密码登录
        let pwd = document.querySelector(".divMima");
        account.setAttribute("data-account", this.vmI18n.t("other.user"));
        pwd.setAttribute("data-pwd", this.vmI18n.t("other.pwd"));
        inputNodes[0].setAttribute("placeholder", this.vmI18n.t("pHolder.a2")); // 请输入用户名
        inputNodes[1].setAttribute("placeholder", this.vmI18n.t("pHolder.a3")); // 请输入密码
        if (this.isEnableLoginPro) {
          inputNodes[2].setAttribute(
            "placeholder",
            this.vmI18n.t("pHolder.a7")
          ); // 请输入验证码
        }
      }
      let loginBtn = document.getElementById("btn");
      loginBtn.innerHTML = `${this.vmI18n.t(
        "login"
      )} <img src="${require("@/assets/img/arrow-right.png")}" />`;
    },
    // 是否开启手机验证码登录
    isEnableLogin() {
      let node =
        document.querySelector(".loginPro") ||
        document.querySelector(".divErCode");
      this.isEnableLoginPro = !!node;
      this.$nextTick(() => {
        node && this.initTab(true);
      });
    },
    initTab(isPhone) {
      let nodes = document.querySelectorAll(".tab");
      nodes[Number(isPhone)].classList.add("active");
      nodes[Number(!isPhone)].classList.remove("active");
    },
    toggleTab(type) {
      // 由于tab tile与框架默认展示的登录方式相反，故特殊处理
      if (
        (type == "phone" && document.querySelector(".loginPro")) ||
        (type == "pwd" && document.querySelector(".divErCode"))
      )
        return;
      document.getElementsByClassName("toggle")[0].click();
      this.$nextTick(() => {
        this.initDom();
      });
      this.initTab(type == "phone");
    },
    toggleLang(lang) {
      const _this = this;
      let message = ["zh", "en"].includes(lang)
        ? _this.vmI18n.messages[lang].tip_info
        : lang;
      switch (message) {
        case "ja":
          message = "暂无日语语言包，敬请期待！(已默认使用中文)";
          break;
        default:
          break;
      }
      if (!["zh", "en"].includes(lang)) {
        lang = "zh";
      }
      localStorage.setItem("locale", lang);
      // _this.vmI18n.locale = localStorage.getItem('locale');
      _this.vmI18n.locale = lang;
      this.curLang = langConfig.find((it) => it.type == lang).text;
      R3.store.commit(`customize/language`, lang || "zh");
      this.initDom();

      this.$message({
        // message: _this.vmI18n.messages[lang].tip_info,
        message,
        // type: _this.vmI18n.messages[lang].tip_type,
        type: "success",
      });
    },
    /**
     * 切换语言
     * 走框架登录成功前的回调loginSucCbk，返回true就继续走，false就拦截
     */
    async loginSucCbk() {
      const pa = new FormData();
      pa.append('language', localStorage.getItem("locale") || 'zh');
      const { status, data } = await service.common.langSwitcher(pa)
      return status === 200 && data.code === 0
    }
  },
};
</script>

<style lang="less" scoped>
@import "~@burgeon/oms-theme/skin/public.less";
.loginBG {
  background: url("~@/assets/img/login-bg.jpg") no-repeat;
  background-size: cover;
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  // 国际化
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
  /*整块内容*/
  .login-container {
    width: 1024px;
    height: 480px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 17px;
    background: url("~@/assets/img/login-form-bg.png") right no-repeat #fff;
    background-size: auto 100%;
  }
  .loginTabs {
    display: flex;
    text-align: center;
    justify-content: space-around;
    width: 243px;
    font-size: 14px;
    font-weight: 700;
    color: #c3c6d2;
    cursor: pointer;
    margin: auto;
    margin-bottom: 26px;
    div {
      position: relative;
      width: 50%;
      &:last-child {
        border-left: 1px solid #c3c6d2;
      }
      &.active {
        color: #292f43;
        span {
          position: relative;
          &::before {
            position: absolute;
            content: "";
            width: 24px;
            height: 3px;
            background: #5461b8;
            border-radius: 2px;
            top: 24px;
            left: 50%;
            transform: translateX(-50%);
            -webkit-transform: translateX(-50%);
            -webkit-animation: 1s changeWidth;
            animation: 1s changeWidth;
          }
        }
      }
      @-webkit-keyframes changeWidth {
        0% {
          width: 0;
        }
        50% {
          width: 100%;
        }
        100% {
          width: 24px;
        }
      }
      @keyframes changeWidth {
        0% {
          width: 0;
        }
        50% {
          width: 100%;
        }
        100% {
          width: 24px;
        }
      }
    }
  }
  .login-content {
    width: 50%;
    text-align: center;
    min-width: 400px;
    height: 100%;
    position: relative;
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
      margin: 10px 0 24px 0;
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
    // login登陆
    .loginCore {
      //设置样式
      width: 100%;
      height: auto;
      position: relative;
      /deep/ .container{
        width: 340px;
        margin: 0 auto;
        height: auto;
        position: inherit;
        background-color: #fff;
        // 登录框
        & > div:first-child {
          text-align: left;
          .titleTOP,
          .divToggle,
          .icon {
            display: none;
          }
          .divAccount,
          .divMima,
          .divCode,
          .codeimg {
            position: relative;
            top: auto;
            left: auto;
            width: 100%;
          }
          //input
          .username,
          .password,
          .pwd {
            border: 1px solid #dbdde8 !important;
            background: transparent;
            text-align: right;
            padding-left: 100px;
            margin-bottom: 24px;
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
          // 验证码长度
          .code.pwd{
            width: calc(100% - 116px);
          }
          // codeimg
          .codeimg {
            position: absolute;
            right: 0;
            bottom: 62px;
            width: 100px;
            border-color:#dcdee2;
          }
          .erCodeBtn{
            margin-bottom: 3px;
            margin-left: 0;
            border-radius: 4px;
            vertical-align: top;
            margin-left: 16px;
            &:hover{
              border-color: @base-color;
              color: @base-color;
            }
          }
          // 定位图标文字
          > div::before {
            position: absolute;
            left: 0;
            top: 0;
            display: inline-block;
            width: 100px;
            height: 38px;
            line-height: 38px;
            font-size: 12px;
            padding-left: 16px;
            #bundle > .points;
          }
          .divAccount:before {
            content: attr(data-account); // 账号
          }
          .divCode {
            &:before {
              content: attr(data-code); // 验证码
            }
            display: inline-block;
            vertical-align: top;
          }
          .divMima:before {
            content: attr(data-pwd); // 密码
          }
        }
        // 登录按钮
        & > div:nth-child(2) {
          .btn {
            position: inherit;
            margin: 0;
            width: 100%;
            line-height: 38px;
            background: #5461b8;
            border-radius: 4px;
            box-shadow: 0px 6px 20px 0px rgba(69, 96, 171, 0.31);
            img {
              // display: none;
              width: 20px;
              height: 20px;
              vertical-align: middle;
            }
          }
        }
      }
      /deep/ .divErCode {
        .divAccount:before {
          content: attr(data-phone) !important; // 手机号
        }
      }
    }
  }
}
</style>

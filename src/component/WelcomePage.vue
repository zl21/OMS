<template>
  <div class="welcomepage">
    <div class="container">
      <Dropdown>
        <a href="javascript:void(0)">
          中/En
          <Icon type="ios-arrow-down"></Icon>
        </a>
        <DropdownMenu slot="list">
          <DropdownItem
            @click.native="toggleLang('zh')"
            :disabled="this.vm.$i18n._vm.locale == 'zh'"
            >中文</DropdownItem
          >
          <DropdownItem
            @click.native="toggleLang('en')"
            :disabled="this.vm.$i18n._vm.locale == 'en'"
            >English</DropdownItem
          >
          <DropdownItem
            @click.native="toggleLang('ja')"
            :disabled="this.vm.$i18n._vm.locale == 'ja'"
            >日本</DropdownItem
          >
        </DropdownMenu>
      </Dropdown>
      <br>
      <button>{{ vm.$t("btn.text") }}</button>
      <span>{{ vm.$t("message.hello") }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "WelcomePage",
  data() {
    const vm = window.vm;
    return {
      vm: vm,
    };
  },
  mounted() {
    console.log("this", this);
    console.log("this.vm.$i18n._vm.locale", this.vm.$i18n._vm.locale);
  },
  methods: {
    toggleLang(lang) {
      let _this = this;
      console.log("_this", _this);
      localStorage.setItem("locale", lang);
      _this.vm.$i18n._vm.locale = localStorage.getItem("locale");
      console.log(_this.vm.$i18n._vm.messages[lang]);
      this.$message({
        message: _this.vm.$i18n._vm.messages[lang].tip_info,
        type: _this.vm.$i18n._vm.messages[lang].tip_type,
      });
    },
  },
};
</script>

<style scoped lang="less">
@import "~@burgeon/oms-theme/skin/public.less";
.welcomepage {
  width: 100%;
  height: 100%;
  background: url("../assets/image/loginBg.jpg") center / 100% no-repeat;
  /deep/ .ark-dropdown {
    margin: 10px 10px 20px;
  }
  .container {
    z-index: 999;
    padding: 20px;
    background-color: rgb(252, 252, 247);
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
  }
}
</style>

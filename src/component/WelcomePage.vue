<template>
  <div class="welcomepage">
    <!--     
    <div class="container">
      <Dropdown>
        <a href="javascript:void(0)">
          中/En
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
      <br />
      <button>{{ vmI18n.t("btn.text") }}</button>
      <span>{{ vmI18n.t("message.hello") }}</span>
    </div> 
    -->
  </div>
</template>

<script>
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
      text: '日语',
    },
  ];

  export default {
    name: 'WelcomePage',
    data() {
      return {
        vmI18n: window.vmI18n,
        langConfig,
      };
    },
    methods: {
      toggleLang(lang) {
        const _this = this;
        localStorage.setItem('locale', lang);
        _this.vmI18n.locale = localStorage.getItem('locale');
        this.$message({
          message: _this.vmI18n.messages[lang].tip_info,
          type: _this.vmI18n.messages[lang].tip_type,
        });
      },
    },
    mounted() {
      const domContent = document.getElementById('content');
      domContent.style.padding = '0 0';
    },
    destroyed() {
      const domContent = document.getElementById('content');
      domContent.style.padding = '0 15px';
    }
  };
</script>

<style scoped lang="less">
@import "~@burgeon/oms-theme/skin/public.less";
.welcomepage {
  width: 100%;
  height: 100%;
  background: url("../assets/image/loginBg.jpg") no-repeat;
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

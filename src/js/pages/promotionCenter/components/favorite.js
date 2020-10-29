import axios from "axios";

export default {
  name: "Favorite",
  data() {
    return {
      icon: "",
    };
  },
  methods: {
    // 设置是否收藏
    async setFavorite() {
      const self = this;
      const fromdata = new FormData();
      console.log("self.$route", self);
      fromdata.append("id", self.$route.params.customizedModuleId);
      fromdata.append("type", "action");
      if (self.icon !== "iconfont icon-liebiao-yishoucang") {
        const res = await this.service.common.addToFavorite(fromdata);
        if (res.data.code == 0) {
          self.$store.commit("global/updateFavoriteData", res.data);
        }
        self.icon = "iconfont icon-liebiao-yishoucang";
      } else {
        const res = await this.service.common.removeFromFavorite(fromdata);
        if (res.data.code == 0) {
          self.$store.commit("global/updateFavoriteData", res.data);
          self.icon = "iconfont iconbj_col";
        }
      }
    },
    // 获取当前页面是否被收藏
    async getisFavorite() {
      const self = this;
      const fromdata = new FormData();
      fromdata.append("id", this.$route.params.customizedModuleId);
      fromdata.append("type", "action");
      const res = await this.service.common.getUserConfig(fromdata);
      console.log("res.data.data", res.data.data);
      if (res.data.data && res.data.data.isFavorite) {
        self.icon = "iconfont icon-liebiao-yishoucang";
      } else {
        self.icon = "iconfont iconbj_col";
      }
    },
  },
  mounted() {
    this.getisFavorite();
  },
};

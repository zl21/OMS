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
    setFavorite() {
      const self = this;
      const fromdata = new FormData();
      console.log("self.$route", self);
      fromdata.append("id", self.$route.params.customizedModuleId);
      fromdata.append("type", "action");
      if (self.icon !== "iconfont icon-liebiao-yishoucang") {
        axios({
          url: "/p/cs/addToFavorite",
          method: "post",
          data: fromdata,
        }).then((res) => {
          if (res.data.code == 0) {
            self.$store.commit("global/updateFavoriteData", res.data);
          }
          self.icon = "iconfont icon-liebiao-yishoucang";
        });
      } else {
        axios({
          url: "/p/cs/removeFromFavorite",
          method: "post",
          data: fromdata,
        }).then((res) => {
          if (res.data.code == 0) {
            self.$store.commit("global/updateFavoriteData", res.data);
            self.icon = "iconfont iconbj_col";
          }
        });
      }
    },
    // 获取当前页面是否被收藏
    getisFavorite() {
      const self = this;
      const fromdata = new FormData();
      fromdata.append("id", this.$route.params.customizedModuleId);
      fromdata.append("type", "action");
      axios({
        url: "/p/cs/getUserConfig",
        method: "post",
        data: fromdata,
      }).then((res) => {
        console.log("res.data.data", res.data.data);
        if (res.data.data && res.data.data.isFavorite) {
          self.icon = "iconfont icon-liebiao-yishoucang";
        } else {
          self.icon = "iconfont iconbj_col";
        }
      });
    },
  },
  mounted() {
    this.getisFavorite();
  },
};

// 是否收藏公共逻辑管理
const isFavoriteMixin = {
  mounted() {
    // 获取当前页面是否被收藏
    this.getisFavorite();
  },
  methods: {
    // 设置是否收藏
    async setFavorite() {
      const self = this;
      const fromdata = new FormData();
      fromdata.append('id', self.$route.params.customizedModuleId);
      fromdata.append('type', 'action');
      if (self.btnConfig.buttons.find(item => item.webname === 'isFavorite').icon !== 'iconfont icon-liebiao-yishoucang') {
        const res = await this.service.common.addToFavorite(fromdata);
        this.changeBtnStatus(res, self);
      } else {
        const res = await this.service.common.removeFromFavorite(fromdata);
        this.changeBtnStatus(res, self);
      }
    },

    changeBtnStatus(res, self) {
      if (res.data.code == 0) {
        self.$store.commit('global/updateFavoriteData', res.data);
        const tempBtn = self.btnConfig.buttons.find(item => item.webname === 'isFavorite');
        const styleStr = tempBtn.icon === 'iconfont icon-liebiao-yishoucang' ? 'iconfont iconbj_col' : 'iconfont icon-liebiao-yishoucang';
        tempBtn.icon = styleStr;
      }
    },
    // 获取当前页面是否被收藏
    async getisFavorite() {
      const self = this;
      const fromdata = new FormData();
      fromdata.append('id', self.$route.params.customizedModuleId);
      fromdata.append('type', 'action');
      const res = await this.service.common.getUserConfig(fromdata);
      const styleStr = res.data.data.isFavorite ? 'iconfont icon-liebiao-yishoucang' : 'iconfont iconbj_col';
      self.btnConfig.buttons.find(item => item.webname === 'isFavorite').icon = styleStr;
    }
  }
};
export default isFavoriteMixin;

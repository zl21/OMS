// 是否收藏公共逻辑管理
import axios from 'axios';
import lookUserJurisdiction from "allpages/SystemConfig/quanXian/1/lookUserJurisdiction";

export const isFavoriteMixin = {
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
      if (self.btnConfig.buttons.find(item => (item.name === '收藏' || item.name === 'collection')).icon !== 'iconfont icon-liebiao-yishoucang') {
        const res = await this.service.common.addToFavorite(fromdata);
        if (res.data.code == 0) {
          self.$store.commit('global/updateFavoriteData', res.data);
          self.btnConfig.buttons.find(item => (item.name === '收藏' || item.name === 'collection')).icon === 'iconfont icon-liebiao-yishoucang' ? self.btnConfig.buttons.find(item => item.name === '收藏').icon = 'iconfont iconbj_col' : self.btnConfig.buttons.find(item => item.name === '收藏').icon = 'iconfont icon-liebiao-yishoucang';
        }
      } else {
        const res = await this.service.common.removeFromFavorite(fromdata);
        if (res.data.code == 0) {
          self.$store.commit('global/updateFavoriteData', res.data);
          self.btnConfig.buttons.find(item => (item.name === '收藏' || item.name === 'collection')).icon === 'iconfont icon-liebiao-yishoucang' ? self.btnConfig.buttons.find(item => item.name === '收藏').icon = 'iconfont iconbj_col' : self.btnConfig.buttons.find(item => item.name === '收藏').icon = 'iconfont icon-liebiao-yishoucang';
        }
      }
    },
    // 获取当前页面是否被收藏
    async getisFavorite() {
      const self = this;
      const fromdata = new FormData();
      fromdata.append('id', self.$route.params.customizedModuleId);
      fromdata.append('type', 'action');
      const res = await this.service.common.getUserConfig(fromdata);
      if (res.data.data.isFavorite) {
        self.btnConfig.buttons.find(item => (item.name === '收藏' || item.name === 'collection')).icon = 'iconfont icon-liebiao-yishoucang';
      } else {
        self.btnConfig.buttons.find(item => (item.name === '收藏' || item.name === 'collection')).icon = 'iconfont iconbj_col';
      }
    },
  }
};

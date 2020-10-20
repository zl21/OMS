// 是否收藏公共逻辑管理 
import axios from 'axios';

export const isFavoriteMixin = {
  mounted() {
    // 获取当前页面是否被收藏
    this.getisFavorite();
  },
  methods: {
    // 设置是否收藏
    setFavorite() {
      const self = this;
      const fromdata = new FormData();
      fromdata.append('id', self.$route.params.customizedModuleId);
      fromdata.append('type', 'action');
      if (self.btnConfig.buttons.find(item => (item.name === '收藏' || item.name === 'collection')).icon !== 'iconfont icon-liebiao-yishoucang') {
        axios({
          url: '/p/cs/addToFavorite',
          method: 'post',
          data: fromdata
        }).then((res) => {
          if (res.data.code == 0) {
            self.$store.commit('global/updateFavoriteData', res.data);
            self.btnConfig.buttons.find(item => (item.name === '收藏' || item.name === 'collection')).icon === 'iconfont icon-liebiao-yishoucang' ? self.btnConfig.buttons.find(item => item.name === '收藏').icon = 'iconfont iconbj_col' : self.btnConfig.buttons.find(item => item.name === '收藏').icon = 'iconfont icon-liebiao-yishoucang';
          }
        });
      } else {
        axios({
          url: '/p/cs/removeFromFavorite',
          method: 'post',
          data: fromdata
        }).then((res) => {
          if (res.data.code == 0) {
            self.$store.commit('global/updateFavoriteData', res.data);
            self.btnConfig.buttons.find(item => (item.name === '收藏' || item.name === 'collection')).icon === 'iconfont icon-liebiao-yishoucang' ? self.btnConfig.buttons.find(item => item.name === '收藏').icon = 'iconfont iconbj_col' : self.btnConfig.buttons.find(item => item.name === '收藏').icon = 'iconfont icon-liebiao-yishoucang';
          }
        });
      }
    },
    // 获取当前页面是否被收藏
    getisFavorite() {
      const self = this;
      const fromdata = new FormData();
      fromdata.append('id', self.$route.params.customizedModuleId);
      fromdata.append('type', 'action');
      axios({
        url: '/p/cs/getUserConfig',
        method: 'post',
        data: fromdata
      }).then((res) => {
        if (res.data.data.isFavorite) {
          self.btnConfig.buttons.find(item => (item.name === '收藏' || item.name === 'collection')).icon = 'iconfont icon-liebiao-yishoucang';
        } else {
          self.btnConfig.buttons.find(item => (item.name === '收藏' || item.name === 'collection')).icon = 'iconfont iconbj_col';
        }
      });
    },
  }
};

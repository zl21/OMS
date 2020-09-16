<template>
  <div
    class="favoriteForm"
    @click="setFavorite"
  >
    <span :class="icon" />
  </div>
</template>
<script>
  import axios from 'axios';

  export default {
    name: 'Favorite',
    data() {
      return {
        icon: '',
      };
    },
    methods: {
      // 设置是否收藏
      setFavorite() {
        const self = this;
        const fromdata = new FormData();
        fromdata.append('id', self.$route.query.id);
        fromdata.append('type', 'action');
        if (
          self.icon
          !== 'iconfont iconliebiao-yishoucang'
        ) {
          axios({
            url: '/p/cs/addToFavorite',
            method: 'post',
            data: fromdata
          }).then((res) => {
            if (res.data.code == 0) {
              self.$store.commit('updateFavoriteList', res.data.data);
              self.icon = 'iconfont iconliebiao-yishoucang';
            }
          });
        } else {
          axios({
            url: '/p/cs/removeFromFavorite',
            method: 'post',
            data: fromdata
          }).then((res) => {
            if (res.data.code == 0) {
              self.$store.commit('updateFavoriteList', res.data.data);
              self.icon = 'iconfont iconbj_col';
            }
          });
        }
      },
      // 获取当前页面是否被收藏
      getisFavorite() {
        const self = this;
        const fromdata = new FormData();
        fromdata.append('id', this.$route.params.customizedModuleId);
        fromdata.append('type', 'action');
        axios({
          url: '/p/cs/getUserConfig',
          method: 'post',
          data: fromdata
        }).then((res) => {
          if (res.data.data && res.data.data.isFavorite) {
            self.icon = 'iconfont iconliebiao-yishoucang';
          } else {
            self.icon = 'iconfont iconbj_col';
          }
        });
      }
    },
    mounted() {
      this.getisFavorite(); 
    }
  };
</script>
<style lang="less" scoped>
.favoriteForm{
    border-radius: 2px;
    line-height: 24px;
    height: 24px;
    border: 1px solid #fd6442;
    color: #fd6442;
    display: inline-block;
    >span{
        font-size: 12px;
        padding: 5px;
    }

}

</style>

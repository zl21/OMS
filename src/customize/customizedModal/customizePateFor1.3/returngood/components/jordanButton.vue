<template>
  <div class="one_button">
    <div
      v-if="btnConfig.loading"
      class="demo-spin-container"
    >
      <Spin fix />
    </div>
    <div
      class="buttonBox"
      :class="btnConfig.btnsite"
    >
      <div
        v-for="(item , index) in btnConfig.buttons"
        :key="index"
      >
        <div
          v-if="( item.isShow === false || item.isShow )? item.isShow : true"
          class="buttonGroup"
        >
          <Button
            :ref="item.ref"
            :type="item.type ? item.type : btnConfig.typeAll"
            :size="item.size ? item.size : 'small'"
            :custom-icon="item.icon ? item.icon : ''"
            :disabled="item.disabled ? item.disabled : false"
            :ghost="item.ghost ? false : true"
            @click.native="item.btnclick"
          >
            {{ item.text }}
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
      // buttons: [
      //   {
      //     type: 'fcdefault',  //按钮类型
      //     text: 'fcdefault',  //按钮文本
      //     icon: 'logo-facebook', //按钮图标
      //     size: 'large',  //按钮大小
      //     disabled: 'disabled', //按钮禁用控制
      //     isShow: false
      //   }
      // ]
      };
    },

    props: {
      btnConfig: {
        type: Object
      }
    },

    methods: {
      button(ref) {
        this.$emit('buttonEvent', ref, this);
      }
    }
  };
</script>

<style lang='less' scoped>
.one_button {
  position: relative;

  .ark-btn-small{
    padding: 4px 7px;
  }
  .loading {
    width: 100%;
    height: 100%;
    position: absolute;
    background-color: #ccc;
    opacity:0.5;
    .demo-spin-container{
    	display: inline-block;
      width: 60px;
      height: 30px;
      position: relative;
      border: 1px solid #eee;
    }
  }

  .buttonBox {
  display: flex;
  flex-wrap: wrap;
  // flex-direction: row;
  // .ark-btn-ghost.ark-btn-error {
  //   color: #fd6442 !important;
  // }
}
.buttonBox .buttonGroup {
  margin: 0px 8px 8px 0px;
}

.left {
  justify-content: flex-start;
}
.center {
  justify-content: center;
}
.right {
  justify-content: flex-end;
}
}
</style>

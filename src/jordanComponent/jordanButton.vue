<template>
  <div class="one_button">
    <div class="demo-spin-container" v-if="btnConfig.loading">
      <Spin fix></Spin>
    </div>
    <div class="buttonBox" :class="btnConfig.btnsite">
      <div v-for="(item , index) in btnConfig.buttons" :key="index">
        <div
          class="buttonGroup"
          v-if="( item.isShow === false || item.isShow )? item.isShow : true">
          <Button
            v-if="!item.dropDown"
            @click.native="item.btnclick"
            :ref="item.ref"
            :type="item.type ? item.type : btnConfig.typeAll"
            :size="item.size ? item.size : 'small'"
            :custom-icon="item.icon ? item.icon : ''"
            :icon="item.icon ? item.icon : ''"
            :disabled="item.disabled ? item.disabled : false"
            :ghost="item.ghost ? false : true"
            :shape="item.shape?item.shape:undefined"
            :class="item.class"
          >{{item.text}}</Button>
          <!-- 下拉菜单按钮 -->
          <Dropdown v-else-if="item.dropDown && item.menus.length>0" @on-click="dropDownClick">
            <Button
              :ref="item.ref"
              :type="item.type ? item.type : btnConfig.typeAll"
              :size="item.size ? item.size : 'small'"
              :icon="item.icon ? item.icon : ''"
              :disabled="item.disabled ? item.disabled : false"
              :ghost="item.ghost ? false : true"
              :shape="item.shape?item.shape:undefined"
              :class="item.class"
            >
              {{item.menuText}}
              <Icon type="ios-arrow-down"></Icon>
            </Button>
            <DropdownMenu slot="list">
              <DropdownItem
                v-for="(menu_item , index) in item.menus"
                :key="index"
                :name="menu_item.text"
              >{{menu_item.text}}</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
      <div
        class="right_btn"
        v-for="(item , index) in btnConfig.right_btn"
        v-if="( item.isShow === false || item.isShow )? item.isShow : true"
      >
        <Button
          @click.native="item.btnclick"
          :ref="item.ref"
          :type="item.type ? item.type : btnConfig.typeAll"
          :size="item.size ? item.size : 'small'"
          :custom-icon="item.icon ? item.icon : ''"
          :disabled="item.disabled ? item.disabled : false"
          :ghost="item.ghost ? false : true"
          :key="index"
          :class="item.class"
        >{{item.text}}</Button>
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
    dropDownClick(name) {
      this.$emit('dropDownClick', name)
    },
    button(ref) {
      this.$emit("buttonEvent", ref, this);
    }
  }
};
</script>

<style lang='less' scoped>
.one_button {
  position: relative;
  .loading {
    width: 100%;
    height: 100%;
    position: absolute;
    background-color: #ccc;
    opacity: 0.5;
    .demo-spin-container {
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
    // .burgeon-btn-ghost.burgeon-btn-error {
    //   color: #fd6442 !important;
    // }
  }
  .buttonBox .buttonGroup {
    margin: 0px 0px 8px 8px;
    .burgeon-btn-ghost {
      background: #fdf4f2;
    }
    button {
      border-color: #eb4832;
    }
    .save {
      width: 80px;
      height: 28px;
      background: #eb4832 !important;
      box-shadow: 0 2px 9px 1px rgba(250, 196, 189, 0.95);
      border-radius: 25px;
      border: none;
      color: #fff;
    }
    .cancel {
      width: 80px;
      height: 28px;
      background: #0f3365 !important;
      box-shadow: 0 2px 9px 1px #cfe1f9;
      border-radius: 25px;
      border: none;
      color: #fff;
    }
    .burgeon-select-dropdown ul {
      z-index: 99;
    }
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



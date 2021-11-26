<template>
  <div class="button-combina">
    <div class="demo-spin-container" v-if="btnConfig.loading">
      <Spin fix></Spin>
    </div>
    <div class="button-content" :class="btnConfig.btnsite">
      <div
        class="button-group"
        v-for="(item, index) in btnConfig.buttons"
        :key="index"
        :class="item.isShow && item.isShow === false ? 'button-group-none' : ''"
      >
        <template
          v-if="item.isShow === false || item.isShow ? item.isShow : true"
        >
          <!-- icon 设置按钮的图标类型 custom-icon 设置按钮的自定义图标 -->
          <Button
            v-if="!item.dropDown"
            @click.native="item.btnclick"
            :ref="item.ref"
            :type="item.type ? item.type : btnConfig.typeAll"
            :size="item.size ? item.size : 'small'"
            :custom-icon="item.customIcon ? item.customIcon : ''"
            :icon="item.icon ? item.icon : ''"
            :disabled="item.disabled ? item.disabled : false"
            :ghost="item.ghost ? true : false"
            :shape="item.shape ? item.shape : undefined"
            :class="item.class"
            >{{ item.text }}</Button
          >
          <!-- 下拉菜单按钮 -->
          <Dropdown
            v-else-if="item.dropDown && item.menus.length > 0"
            @on-click="dropDownClick"
          >
            <Button
              :ref="item.ref"
              :type="item.type ? item.type : btnConfig.typeAll"
              :size="item.size ? item.size : 'small'"
              :icon="item.icon ? item.icon : ''"
              :disabled="item.disabled ? item.disabled : false"
              :ghost="item.ghost ? false : true"
              :shape="item.shape ? item.shape : undefined"
              :class="item.class"
            >
              {{ item.menuText }}
              <Icon type="ios-arrow-down"></Icon>
            </Button>
            <DropdownMenu slot="list">
              <DropdownItem
                v-for="(menu_item, index) in item.menus"
                :key="index"
                :name="menu_item.webname"
              >
                <span v-if="!menu_item.dropDown">{{ menu_item.text }}</span>
                <!-- 三级按钮 -->
                <Dropdown
                  placement="right-start"
                  v-else-if="menu_item.dropDown && menu_item.menus.length > 0"
                >
                  <a
                    href="javascript:void(0)"
                    :ref="menu_item.ref"
                    :type="menu_item.type ? menu_item.type : btnConfig.typeAll"
                    :size="menu_item.size ? menu_item.size : 'small'"
                    :icon="menu_item.icon ? menu_item.icon : ''"
                    :disabled="menu_item.disabled ? menu_item.disabled : false"
                    :ghost="menu_item.ghost ? false : true"
                    :shape="menu_item.shape ? menu_item.shape : undefined"
                    :class="menu_item.class"
                  >
                    {{ menu_item.menuText }}
                    <Icon type="ios-arrow-forward"></Icon>
                  </a>
                  <DropdownMenu slot="list">
                    <DropdownItem
                      v-for="(three_item, index) in menu_item.menus"
                      :key="index"
                      :name="three_item.webname"
                    >
                      {{ three_item.text }}
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
                <!-- end -->
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </template>
      </div>
      <div
        class="button-group"
        v-for="(item, index) in btnConfig.buttonsRight"
        :key="index"
      >
        <Button
          @click.native="item.btnclick"
          v-if="item.isShow === false || item.isShow ? item.isShow : true"
          :ref="item.ref"
          :type="item.type ? item.type : btnConfig.typeAll"
          :size="item.size ? item.size : 'small'"
          :custom-icon="item.customIcon ? item.customIcon : ''"
          :icon="item.icon ? item.icon : ''"
          :disabled="item.disabled ? item.disabled : false"
          :ghost="item.ghost ? true : false"
          :shape="item.shape ? item.shape : undefined"
          :key="index"
          :class="item.class"
          >{{ item.text }}</Button
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OmsButton',
  data() {
    return {};
  },

  props: {
    btnConfig: {
      type: Object
    }
  },

  methods: {
    dropDownClick(name, ...eventlist) {
      this.$emit('dropDownClick', name, eventlist)
    },
    button(ref) {
      this.$emit("buttonEvent", ref, this);
    }
  }
};
// import OmsButton from 'burgeonComponents/js/OmsButton.js';
// export default OmsButton;
</script>

<style lang='less' scoped>
@import "burgeonComponents/css/OmsButton.less";
</style>



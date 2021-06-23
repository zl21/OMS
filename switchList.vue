<!--
 * @Author: your name
 * @Date: 2021-06-18 11:28:58
 * @LastEditTime: 2021-06-23 11:29:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /burgeon-business-components/switchList.vue
-->
<template>
  <div class="content-li-item switchList">
    <label style="width: 130px;">{{switchList.label}}:</label>
    <div class="content-li-item-left">
      <div class="content-li-item-left-a" v-for="em,index in switchList.list" :key="index">
        <span class="left-a">
          <i-switch v-model="em.val" :disabled="em.disabled" :size="em.size ? em.size : switchList.size ? switchList.size : 'small'" switchList/>
          {{em.name}}
        </span>

        <span v-if="em.isok" class="left-b-em">*</span>
        <span>{{em.label}}:</span>

        <Input
          v-model="em.value"
          :placeholder="em.placeholder"
          :style="em.style"
          :regx="em.regx"
          :disabled="em.disabled"
          :maxlength="em.maxlength"
        />
        {{em.symbol}}
        <Input
          v-model="em.value2"
          :disabled="em.disabled"
          :placeholder="em.placeholder1"
          :style="em.style"
          :regx="em.regx2"
          :maxlength="em.maxlength"
        />
        {{em.type}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    switchList: {
      type: Object,
    },
  },
  data() {
    return {};
  },
};
</script>

<style lang="less" scoped>
.content-li-item {
  display: flex;
  align-items: baseline;
  padding-left: 55px;
  margin-top: 20px;
  .left-a {
    margin-right: 10px;
  }
  .left-b-em {
    color: red;
  }
  .content-li-item-left {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    .content-li-item-left-a {
      width: 100%;
      padding: 5px;
    }
  }
}
</style>
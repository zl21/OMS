<template>
  <div class="singleBox">
    <RadioGroup
      v-model="name"
      @on-change="checkChange"
    >
      <Radio
        v-for="(item,index) in options"
        :key="index"
        circle
        :label="item.title"
      >
        <span>{{ item.title }}</span>
      </Radio>
    </RadioGroup>
  </div>
</template>
<script>
  export default {
    name: 'SingleBox',
    data() {
      return {
        name: '',
        norefresh: true,
      };
    },
    watch: {
      value(val) {
        this.initData();
      },
      options: {
        handler(val) {
          this.initData();
        },
        deep: true
      }
    },
    props: {
      value: {
        type: String,
        default: () => ''
      },
      options: {
        type: Array,
        default: () => []
      }
    },
    methods: {
      /**
       * 初始化单选值
       */
      initData() {
        this.name = '';
        const obj = this.options.find(opt => opt.value === this.value);
        if (obj) this.name = obj.title;
      },
      /**
       * 单选值
       */
      checkChange(name) {
        const obj = this.options.find(opt => opt.title === name);
        if (obj) {
          this.$emit('changeSingle', obj.value);
        }
      }
    },
    mounted() {
      this.initData();
    }
  };
</script>
<style lang="less" scoped>
.singleBox{
  display: inline-block;
  height: 100%;
  line-height: 100%;
}
</style>>

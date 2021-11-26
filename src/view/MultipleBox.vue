<!--
 * @Author: your name
 * @Date: 2021-11-01 13:50:01
 * @LastEditTime: 2021-11-02 18:06:40
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /burgeon-business-components/src/view/multipleBox.vue
-->
<template>
  <div class="multipleBox">
    <Checkbox v-model="all" @click.prevent.native="handleCheckAll">
      {{ vmI18n.t("common.all") }}
    </Checkbox>

    <CheckboxGroup v-model="names" @on-change="checkChange">
      <Checkbox
        v-for="(item, index) in _options"
        :key="index"
        :label="item.title"
      >
        <span>{{ item.title }}</span>
      </Checkbox>
    </CheckboxGroup>
  </div>
</template>
<script>
// import i18n from "@burgeon/internationalization/i18n";

export default {
  name: 'MultipleBox',
  data() {
    return {
      // vmI18n: i18n,
      indeterminate: true,
      all: false,
      names: [] // 选中项目的名称
    };
  },
  props: {
    values: {
      // 选中项目的真实值
      type: Array
    },
    options: {
      type: Array
    }
  },
  watch: {
    values() {
      this.initData();
    }
  },
  computed: {
    _values() {
      return this.values;
    },
    _options() {
      return this.options;
    }
  },
  methods: {
    checkChange(vals) {
      const _values = [];
      this._options.forEach((opt) => {
        if (vals.includes(opt.title)) {
          _values.push(opt.value);
        }
      });
      this.$emit('changeOptions', _values);
      this.ensureCheckAll(_values);
    },
    ensureCheckAll(vals) {
      // 是否全选
      if (vals.length === this._options.length) {
        this.all = true;
      } else {
        this.all = false;
      }
    },
    handleCheckAll() {
      let _values = [];
      this.all = !this.all;
      if (this.all) {
        this._options.forEach((opt) => {
          this.names.push(opt.title);
          _values.push(opt.value);
        });
      } else {
        this.names = [];
        _values = [];
      }
      this.$emit('changeOptions', _values);
    },
    /**
     * 根据父组件传过来的_values 映射到names
     */
    initData() {
      const self = this;
      self.names = [];
      self._options.forEach((opt) => {
        if (self._values.includes(opt.value)) {
          self.names.push(opt.title);
        }
      });
      self.ensureCheckAll(self._values);
    }
  },
  mounted() {
    this.initData();
  }
};
  // import MultipleBox from 'burgeonComponents/js/multipleBox';
  // export default MultipleBox;
</script>

<style lang="less" scoped>
@import "burgeonComponents/css/MultipleBox.less";
</style>>

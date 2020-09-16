<template>
  <div class="multipleBox">
    <Checkbox  v-model="all"   @click.prevent.native="handleCheckAll">全部</Checkbox>

    <CheckboxGroup v-model="names" @on-change="checkChange">
      <Checkbox v-for="(item,index) in _options" :key="index" :label="item.title">
        <span>{{item.title}}</span>
      </Checkbox>
    </CheckboxGroup>
  </div>
</template>
<script>
export default {
  name: "multipleBox",
  data() {
    return {
      indeterminate: true,
      all: false,
      names: [] //选中项目的名称
    };
  },
  props: {
    values: {
      //选中项目的真实值
      type: Array
    },
    options: {
      type: Array
    }
  },
  watch:{
     values:function(){
        this.initData();
     }
  },
  computed:{
    _values(){
       return  this.values;
    },
    _options(){
      return  this.options;
    }
  },
  methods: {
    checkChange(vals) {
      let _values = [];
      this._options.forEach(opt => {
        if (vals.includes(opt.title)) {
          _values.push(opt.value);
        }
      });
      this.$emit('changeOptions',_values)
      this.ensureCheckAll(_values);
    },
    ensureCheckAll(vals){
      //是否全选
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
        this._options.forEach(opt => {
          this.names.push(opt.title);
          _values.push(opt.value);
        });
      } else {
        this.names = [];
        _values = [];
      }
      this.$emit('changeOptions',_values)
    },
    /**
     * 根据父组件传过来的_values 映射到names
     */
    initData() {
      this.names = [];
      this._options.forEach(opt => {
        if (this._values.includes(opt.value)) {
          this.names.push(opt.title);
        }
      });
      this.ensureCheckAll(this._values);
    }
  },
  mounted() {
    this.initData();
  }
};
</script>
<style lang="less" scoped>
.multipleBox{
  display: flex;
  .burgeon-checkbox-group{
    white-space: initial;
  }
}
</style>>

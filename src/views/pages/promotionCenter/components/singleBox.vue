<template>
  <div class="singleBox" >
    <RadioGroup v-model="name" @on-change="checkChange" >
      <Radio circle v-for="(item,index) in  options" :key="index" :label="item.title">
        <span>{{item.title}}</span>
      </Radio>
    </RadioGroup>
  </div>
</template>
<script>
export default {
  name: "singleBox",
  data() {
      return {
          name:'',
          norefresh:true,
      }
  },
  watch:{
      value:function(val){
          this.initData();
      },
      options:{
         handler(val){
            this.initData();
         },
         deep:true
      }
  },
  props: {
    value: {
      type: String
    },
    options: {
      type: Array
    }
  },
  methods:{
      /**
       * 初始化单选值
       */
      initData(){
         this.name ='';
         this.$nextTick(() =>{
           let obj = this.options.find((opt) =>{
              return opt.value === this.value;
          })
          if(obj)
              this.name = obj.title;

         })
         
      },
      /**
       * 单选值
       */
      checkChange(name){
         let obj = this.options.find((opt) =>{
              return opt.title === name;
         })
         if(obj){
            this.$emit("changeSingle",obj.value);
         }
      }
  },
  mounted(){
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
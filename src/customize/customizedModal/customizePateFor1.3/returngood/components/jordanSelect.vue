
<template>
  <FormItem :label="label">
    <Select>
      <Option v-for="(item , index) in selectData" :key=index value='item.value'>{{item.label}}</Option>
    </Select>
  </FormItem>
</template>

<script>
export default {
  props: {
    selectData:{
      type:Array
    },
    label:{
      type:String
    }
  },
  
  mounted(){
    console.log(this.selectData);
  }
}
</script>

<style>

</style>


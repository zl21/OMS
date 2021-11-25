<template>
  <!--BB
    descript:组件之一,用来表示增加行、减少行
    author:wdq
    date:20180817
  -->
  <div class="propdisIBB">
     <i  class="error" v-if="inneri!=0" @click="OperateItem('delete')"></i>
     <i class="correct" @click="OperateItem('insert')"></i>
  </div>
</template>
  <script>
  export default {
    data(){
      return{
        desc1:"享受",
        val:"9",
        desc2:"折",
      }
    },
    props:["scheme_data","rule","index" , "inneri"],
    methods:{
       OperateItem(val){
            let p = this.scheme_data.program_code;
            let t = this.scheme_data.promotionType_code;
            let d = this.scheme_data.detail_code;
            switch(val){
                case "delete":
                    if(d==="GA1703" || d==="GA1803"){
                      return this.DeletParnetLimit();
                    }else {
                      return this.DeletInnerRule();
                    }
                    break;
                case "insert":
                    if(d==="GA1703" || d==="GA1803"){
                      return this.AddParentLimit();
                    }else {
                      return  this.AddInnerRule();
                    }
                    break;
            }
       },
       //增加父组件内的innerRules 数据
       AddInnerRule(){
            this.$emit("operateData",'innerRules','insert',this.index);
       },
       //删除父组件内的innerRule 数据
       DeletInnerRule(){
            this.$emit("operateData",'innerRules','delete',this.index);
       },
       //增加父组件的limit数据
       AddParentLimit(){
            this.$emit("operateData",'limits','insert');
       },
       //删除父组件的limit数据
       DeletParnetLimit(){
           this.$emit("operateData",'limits','delete');
       }
    }
  }
</script>
<style  lang="less">

   .propdisIBB{

        // flex: 1;
        display: flex;
        align-items: center;
        font-size: 12px;
        padding-left: 10px;
        padding-top: 2px;

      .error{
        //  float:left;
         width:18px;
         height:24px;
         padding:0 5px;
         background: url("/static/img/error.png") no-repeat;
      }
      .correct{
         width:18px;
         height:24px;
         padding:0 5px;
         background: url("/static/img/add.png") no-repeat
      }
   }
</style>

<template>
  <!--BB
    descript:组件之一,用来表示增加行、减少行
    author:wdq
    date:20180817
  -->
  <div class="propdis4">
     <i  class="error" v-if="index!=0" @click="OperateItem('delete')"></i>
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
    props:["scheme_data","rule","index"],
    methods:{
       OperateItem(val){
            let p = this.scheme_data.program_code;
            let t = this.scheme_data.promotionType_code;
            let d = this.scheme_data.detail_code;
            switch(d){
                case "GA1102":case "PA1102":case "GA1202":case "PA1202":case "GA1302":
                case "GA1103":case "PA1103":
                case "GA1402":case "PA1302":
                case "GA1404":case "PA1304":
                case "GA1501":case "PA1401":
                case "GA1503":case "PA1402":
                case "GA1505":case "PA1403":
                    return   val=="insert"?this.AddParentRule():this.DeletParnetRule();
                    break;
                case "GA1502":
                case "GA1504":
                case "GA1506":
                    return   val=="insert"?this.AddParentLimit():this.DeletParnetLimit();
                    break;
            }
       },
       //增加父组件的rule 数据
       AddParentRule(){
            this.$emit("operateData",'rules','insert');
       },
       //增加父组件的limit数据
       AddParentLimit(){
            this.$emit("operateData",'limits','insert');
       },
       //删除父组件的rule 数据
       DeletParnetRule(){
            this.$emit("operateData",'rules','delete');
       },
       //删除父组件的limit数据
       DeletParnetLimit(){
           this.$emit("operateData",'limits','delete');
       },
    }
  }
</script>
<style  lang="less">

   .propdis4{

        // flex: 1;
        display: flex;
        align-items: center;
        font-size: 12px;
        padding-left: 10px;
        padding-top: 0px;
        position: absolute;
        right: -60px;

      .error{
        //  float:left;
         width:14px;
         height:24px;
         padding:0 5px;
         background: url("/static/img/error.png") no-repeat;
      }
      .correct{
         width:12px;
         height:24px;
         padding:0 5px;
         background: url("/static/img/add.png") no-repeat
      }
   }
</style>

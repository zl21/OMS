<template>
  <!--BB
    descript:组件之一,用来表示增加行、减少行
    author:wdq
    date:20180817
  -->
  <div class="propdisBB">
     <i  class="error" v-if="(scheme_data.detail_code==='GA1803'&&index>1)||
       (scheme_data.detail_code==='GA1703'&&index>1)||(scheme_data.detail_code==='GA1104'&&index>1)||
        ((scheme_data.detail_code==='GA1502'||scheme_data.detail_code==='GA1504'||scheme_data.detail_code==='GA1506')&&index>1)||
        ((scheme_data.detail_code==='GA1405'|| scheme_data.detail_code==='GA1406') && index>1)||(scheme_data.detail_code==='GA1203'&&index>1)||(scheme_data.detail_code==='GA1303'&&index>1)||
        (scheme_data.detail_code==='GA1602'&&index>1)||

       (index!=0 && scheme_data.detail_code!=='GA1703'&&scheme_data.detail_code!=='GA1803'&&scheme_data.detail_code!=='GA1104'&&
       scheme_data.detail_code!=='GA1405'&&scheme_data.detail_code!=='GA1406'&&scheme_data.detail_code!=='GA1203'&&scheme_data.detail_code!=='GA1303'&&scheme_data.detail_code!=='GA1602'&&
       ((scheme_data.detail_code!=='GA1502'&&scheme_data.detail_code!=='GA1504'&&scheme_data.detail_code!=='GA1506')||limitAdd))" 
       @click="OperateItem('delete')"></i>
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
    props:["scheme_data","rule","index","limitAdd","fromFreeGroup"],
    methods:{
       OperateItem(val){      
            let p = this.scheme_data.program_code;
            let t = this.scheme_data.promotionType_code;
            let d = this.scheme_data.detail_code;
            switch(d){
                case "GA1102":case "PA1102":case "GA1202":case "PA1202":case "GA1302":case "GA1106":
                case "GA1103":case "PA1103":
                case "GA1402":case "PA1302":
                case "GA1404":case "PA1304":
                case "GA1501":case "PA1401":
                case "GA1503":case "PA1402":
                case "GA1505":case "PA1403":
                case "GA1401":case "GA1702":
                case "PA1602":case "GA1802":
                case "PA1702":case "GA1703":
                case "GA1803":case "GA1701":
                case "GA1801":case "GA1104":
                case "GA1502":case "GA1504":
                case "GA1506":case "GA1405":case "GA1406":
                case "GA1203":case "GA1303":case "GA1304":
                case "GA1602":
                    if(this.limitAdd){
                      return   val=="insert"?this.AddParentLimit():this.DeletParnetLimit();
                    }else {
                      return   val=="insert"?this.AddParentRule():this.DeletParnetRule();
                    }
                    break;
            }
       },
       //增加父组件的rule 数据
       AddParentRule(){
            if(this.fromFreeGroup){
              this.$emit("operateData",'rules','insert',this.index,'fromFreeGroup');
            }else{
              this.$emit("operateData",'rules','insert');
            }
            
       },
       //增加父组件的limit数据
       AddParentLimit(){
            this.$emit("operateData",'limits','insert');
       },
       //删除父组件的rule 数据
       DeletParnetRule(){
         if(this.fromFreeGroup){
           this.$emit("operateData",'rules','delete',this.index,'fromFreeGroup');
         }else{
           this.$emit("operateData",'rules','delete');
         }
       },
       //删除父组件的limit数据
       DeletParnetLimit(){
           this.$emit("operateData",'limits','delete');
       },
    }
  }
</script>
<style  lang="less">

   .propdisBB{
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

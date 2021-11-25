<!-- TCT 
    descript:组件之一,用来单选或者多选 Check
    author:wdq
    date:20200831
-->
<template>
      <div class="propdis8">
         <span>{{showDesc}}:</span>
         <div v-for="(item,index) in options" :key="index" >
              <Checkbox v-model="item.value"  @on-change="checkSingle(item)"  >{{item.description}}</Checkbox>
         </div>
         <span>{{showDesc2}}</span>
      </div>
</template>
<script>
export default {
    props: ["rule","index", "scheme_data"],
    data(){
        return {
           options:[]
        }
    },
    components:{

    },
    computed:{
        showDesc(){
            let {detail_code} = this.scheme_data;
            let rs = '立享'
            if(detail_code === 'PA1801'){
                rs += '花呗分期';
            }
            return  rs;
        },
        showDesc2(){
            return  "免息";
        }
        
    },
    methods:{
        checkSingle(item){
            this.rule.instalment = this.options.filter( item => item.value).map(item => item.type).join();
        }
    },
    created(){
        //this.rule.instalment = '3';
        this.options = 	[
            {
                "description": "3期",
                "type": 3
            },
            {
                "description": "6期",
                "type": 6
            },
            {
                "description": "12期",
                "type": 12
            }
        ];
        this.options.forEach((item)=>{
            if(this.rule.instalment.includes(item.type)){
                 item.value = true;
            }else{
                 item.value = false;
            }

        });
    },
    mounted(){
       
    }

}
</script>
<style lang="less" scoped>
.propdis8{
    display: flex;
    align-items: center;
    font-size: 12px;
    > span {
      margin: 0 5px;   
    }
}

</style>
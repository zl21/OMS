<template>
  <div class="procedureOne">
    <div class="CommonStyle" :class="index===0?'proced_left':'proced_right'" v-for="(item,index) of dataOne">
      <h1>{{item.ENAME}}</h1>
      <ul>
        <li :class="{'active':list.active}" v-for="(list,i) of item.ITEMS" @click="Active_M_Highlight(item,index,list,i)">
          <div>
            <h3>{{list.ENAME}}</h3>
            <p>{{list.BRIEF}}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  export default {
    data(){
      return{
        M_index: {
          index:0,
          i:0
        }, //点击的是第一个页面的第几个，下标
        dataOne: [],
      }
    },
    props:{
      isActive:{
        type:Number
      },
    },
    activated(){

    },
    mounted(){
      this.axios({//第一页大类接口
        method: 'post',
        url: '/p/cs/cpromtypelistquery',
        data: {
          param:JSON.stringify({
            "TYPE":2
          })
        }
      }).then((res) => {
        this.dataOne = res.data.data;
        for(let m=0;m<this.dataOne.length;m++){
          for(let j=0;j<this.dataOne[m].ITEMS.length;j++){
            this.$set(this.dataOne[m].ITEMS[j],'active',false)
          }
        }
      });
    },
    methods:{
      Active_M_Highlight(item,index,list,i){
        this.M_index = {
          index:index,
          i:i
        };
        for(let m=0;m<this.dataOne.length;m++){
          for(let j=0;j<this.dataOne[m].ITEMS.length;j++){
            this.dataOne[m].ITEMS[j].active=false;
            if(index===m&&j===i){
              this.dataOne[m].ITEMS[j].active=true;
            }
          }
        }
        let routerid = this.$route.query.id
          this.axios({//第二页方案接口
          method: 'post',
          url: '/p/cs/cpromactiquery',
          data: {
            param:JSON.stringify({
              "objid":-1,  "prom_type_id":this.dataOne[index].ITEMS[i].ID
            })
          }
        }).then((res) => {
          if(res.data.code===0){
            let dataTwo= res.data.data;
            for(let i=0;i<dataTwo.scheme_arr.length;i++){
              this.$set(dataTwo.scheme_arr[i],'checked',false)
              if(i===0){
                this.$set(dataTwo.scheme_arr[i],'checked',true)
                if(routerid>0){
                  this.$store.state.customize.scheme_data=dataTwo.scheme_arr[i].scheme_struct
                }else{
                  this.$store.state.customize.scheme_dataNew=dataTwo.scheme_arr[i].scheme_struct
                }
              }
            }
            if(routerid>0){
              this.$store.state.customize.dataTwo=dataTwo;
            }else{
              this.$store.state.customize.dataTwoNew=dataTwo
            }
            this.$emit('Mchange',{dataOne:this.dataOne,M_index:this.M_index})
          }
        });
      },
    }
  }
</script>
<style lang="less">
  .procedureOne{
    display: flex;
    justify-content: flex-start;
    padding: 0 10px 20px;
    margin-top: 16px;
    flex: 1;
    .CommonStyle{
      width: 100%;
      margin: 0 20px;
      border:1px solid #D8D8D8;
      h1{
        font-size: 14px;
        color: #212121;
        background: #F8F7F7;
        text-align: center;
        height:34px;
        line-height: 34px;
        font-weight: 400;
        border-bottom:1px solid #D8D8D8;
      }
      ul{
      }
      li{
        border:1px solid #C0E2D9;
        margin: 16px 20px;
        text-align: center;
        height:58px;
        display: flex;
        align-items: center;
        justify-content: center;
        &.active{
          background: #F4FFFC;
          h3{
            color: #26A67A;
          }
          p{
            color: #26A67A;
          }
        }
        h3{
          height:20px;
          color: #000;
          line-height: 19px;
          font-size: 14px;
        }
        p{
          font-size: 12px;
          height:18px;
          color:#575757;
          line-height: 16px;
        }
      }
    }
    .proced_left.CommonStyle{

    }
  }
</style>

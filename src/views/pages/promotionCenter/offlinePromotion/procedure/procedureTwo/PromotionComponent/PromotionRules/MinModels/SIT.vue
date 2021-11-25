<template>
  <!--SIT
    descript:组件之一,用来表示享受几折、优惠多少元
    author:wdq
    date:20180816
  -->
  <div class="propdis5">
   <!-- <div class="content">-->
      <el-select v-model="compare" placeholder="请选择">
        <el-option
          v-for="item in comparetypes"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <input type="text"   v-model=val  oninput = "this.value= this.value.match(/\d+(\.\d{0,2})?/) ? this.value.match(/\d+(\.\d{0,2})?/)[0] : ''"/>
      <p>{{desc2}}</p>
   <!-- </div>-->
  </div>
</template>
<script>
    import myInput from 'framework/components/element/input'
    export default {
      data(){
        return{
          desc2:" 元",
          comparetypes:[
            {
              value:"GE",
              label:"大于等于"
            },{
              value:"G",
              label:"大于"
            },{
              value:"E",
              label:"等于"
            },
           
          ],
          val:"",
          compare:"",
        }
      },
      components:{
         myInput
      }
    }  
</script>
<style  lang="less">
  .propdis5{
    // float:left;
    // flex: 1;
    display: flex;
    align-items: center;
    font-size: 12px;
    width: 30%;
    .content{
      text-align:right;
      .el-select{
        input{
          width: 80px;
          height: 24px;
          padding: 0 3px;
        }
      }
      
    }
    
    input{
      width: 60px;
      height: 24px;
      border-radius: 2px;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      border: 1px solid #d8d8d8;
      padding-left: 3px;
    }
  }
     
</style>
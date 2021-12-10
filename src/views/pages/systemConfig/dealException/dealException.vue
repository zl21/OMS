<!--处理异常零售单-->
<template>
  <div class="dealException">
    <basicSet :basicData="basic_info"></basicSet>
    <div class="step">
      <div class="title"><img src='./image/two.png'/>基本信息</div>
      <div style="margin:10px 30px;" ><Checkbox v-model="warn_info.check">{{warn_info.tip}}</Checkbox>
   </div>
    </div>
    <infoSet :basicData="basic_info" :infoData="info_set"></infoSet>
     <div class="footer">
      <button  @click="save">提交</button>
      <button  @click="quit">取消</button>
    </div>
  </div>
</template>
<script>
import basicSet from "./basicSet";
import infoSet from "./infoSet";
// import axios  from  'axios';
export default {
  components: {
    basicSet,
    infoSet
  },
  data() {
    return {
      objid: -1,
      basic_info: {
        name: "", //真实姓名
        mobile: "", //手机号
        operate_type: "RETAILES", //操作类型
        reason: "" //操作理由
      },
      warn_info: {
        check: false,
        tip: "您已明确该项操作的后果，愿意承担相应的责任，请慎重使用！"
      },
      info_set: {
        retail_to_es: {
          //零售单重推ES
          es_type: "IDTYPE",
          begin_time: "", //开始时间
          end_time: "" //结束时间
        },
        retail_to_pg: {
          //零售单重推ES
          BILL_NO:''
        },
        managernav_organize: {
          //店长导航数据归集
          storeIds:'',
          dates:''
        }
      }
    };
  },
  props: {
    basicData: {
      //基础信息
      type: Object
    }
  },
  methods: {
    /**
     * 确定前验证
     */
    checkBefore(){
       let result = { code:0, message:''};
        if(!this.basic_info.name){
           result = {
             code: -1,
             message:'请填写真实姓名！'
          }
          return result;
        };
        if(!this.basic_info.mobile || !(/^1[3456789]\d{9}$/.test(this.basic_info.mobile ))){
           result = {
             code: -1,
             message:'请填写正确的手机号！'
          }
          return result;
        };
        if(!/^(?=([\u4e00-\u9fa5].*){10})/.test(this.basic_info.reason)){
           result = {
             code: -1,
             message:'操作理由不能少于10个汉字！'
          }
          return result;
        };
        if(!this.warn_info.check){
          result = {
             code: -1,
             message:'请阅读警告信息，若同意请勾选！'
          }
         return result;
        }
        return result;
    },
    /**
     *  确定
     */
    save() {
      let  result = this.checkBefore();
      if(result && result.code === -1){
          this.$message({
              type: "error",
              message: result.message
          });
          return 
      }
      let operate_type = this.basic_info.operate_type;
      let data = {};
      switch (operate_type) {
        case "RETAILES":
          data = this.getRETAILESData();
          break;
        case "STOCK":
          data = this.getSTOCKData();
          break;
        case "STOREMESS":
          data = this.getSTOREMESSData();
          break;
      }
      const params = this.$urlSearchParams({
        param: data
      })
      this.$network.post('/p/cs/handleException', params).then(res => {
        if(res.data.code === 0){
            this.$message({
              type: "success",
              message: res.data.message
          });
        }else{
          this.$message({
              type: "error",
              message: res.data.message
          });
        }
      });
    },
    /**
     * 上传零售单推ES
     */
    getRETAILESData() {
      let obj = {};
      let basic_info = JSON.parse(JSON.stringify(this.basic_info));
       basic_info.inner_type = this.info_set.retail_to_es.es_type ;
      if (this.info_set.retail_to_es.es_type === "IDTYPE") {
        let billId = this.info_set.retail_to_es.billId ||"";
        let  ids =  billId=== ""? []:billId.split(',');
        obj = { ID: ids };
      } else {
        obj = {
          startDate: this.info_set.retail_to_es.begin_time,
          endDate: this.info_set.retail_to_es.end_time
        };
      }
       let params = {
         basic_info:basic_info,
         data:obj
      }

      return params;
    },
    /**
     * 上传零售单推pg
     */
    getSTOCKData() {
      let BILL_NO = this.info_set.retail_to_pg.BILL_NO||"";
      let billnos = BILL_NO === ''? []:BILL_NO.split(',');
      let params = {
         basic_info:this.basic_info,
         data:{BILL_NO:billnos}
      }
      return params;

    },
    /**
     * 上传店长导航数据归集
     */
    getSTOREMESSData() {
      let dates = !this.info_set.managernav_organize.dates||this.info_set.managernav_organize.dates === ''?[]:this.info_set.managernav_organize.dates.split(',');
      let storeIds = !this.info_set.managernav_organize.storeIds||this.info_set.managernav_organize.storeIds ==='' ?[]:this.info_set.managernav_organize.storeIds.split(',');
      let params = {
         basic_info:this.basic_info,
          data:{
          "dates":dates,
          "storeIds":storeIds,
        }
      }
      return params;
    },
    /**
     * 取消
     */
    quit() {
       let params = {
         "id":31460230,
         "type":"action",
         "source":"search",
         "name":"dl_b_exception_mess",
         "label":"异常处理",
        // "url":"action/dl_b_exception_mess?id=31460230",
        // "query":{"id":31460230},
        // "path":"/m/action/dl_b_exception_mess?id=31460230"
      }
      this.$store.commit("TabCloseAppoint",params);
    }
  },
  mounted() {},
  created() {}
};
</script>
<style lang="less">
.dealException {
  position: relative;
  font-size: 14px;
  display: flex;
  flex-direction: column;
  height: 100%;
  .title {
    margin: 5px;
    display: flex;
    line-height: 32px;
    font-size: 18px;
    font-weight: 500;
    img {
      width: 32px;
      height: 32px;
    }
  }
  .step {
    margin:10px;
    border: 1px solid rgb(235, 235, 235);
    .burgeon-checkbox-wrapper {
      color: #de2525;
      font-size: 14px;
    }
    .burgeon-checkbox-wrapper:after {
      left: 3px !important;
      top: 3px !important;
    }
  }
    .footer {
    // height: 50px;
    // position: absolute;
    line-height: 50px;
    background: rgb(253, 245, 244);
    width: 100%;
    text-align: right;
    bottom: 0;
    > button {
      height: 24px;
      line-height: 24px;
      padding: 0 8px;
      border: 1px solid #fd6442;
      font-size: 12px;
      background: transparent;
      color: #fd6442;
      border-radius: 2px;
      margin-right: 10px;
      &:hover {
        background: #fd6442;
        color: white;
      }
    }
  }
}
</style>

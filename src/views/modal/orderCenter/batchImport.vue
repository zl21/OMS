<template>
  <!-- 发货订单批量导入 -->
  <div class="batchImport">
    <div class="logo">
      <!-- <Icon
        type="md-cloud-download"
        size="30"
        color="#09a155"
      /> -->
      <div class="iconclass">
        <i class="burgeon-icon iconfont icondaoru" />
      </div>
    </div>
    <div class="downLoad">
      <p>
        注意：上传文件中，不要放置宏或图标，不要更改列的顺序，数据中不要使用公式。
        <a
          :href="origin"
          @click="downLoad"
        >(下载模板)</a>
      </p>
      <div class="files">
        <input
          id="file"
          type="file"
          @change="fileList"
        >

        <label>是否审核:</label>&nbsp;&nbsp;
        <RadioGroup v-model="isAutoAudit">
          <Radio label="是" />
          <Radio label="否" />
        </RadioGroup>
      </div>
    </div>
    <div class="button">
      <div class="first">
        <Button
          type="error"
          ghost
          @click="cancel"
        >
          取消
        </Button>
      </div>
      <Button
        type="error"
        ghost
        @click="import_table"
      >
        导入
      </Button>
    </div>
  </div>
</template>
<script>
  import axios from 'axios';

  export default {
    methods: {
      downLoad() {
      
      },
      fileList(e) {
        this.file = e.target.files[0];
      },
      import_table() {
        /** 根据url 表名来区分是那个页面得弹窗，进行不同得请求地址！
         * "OC_B_PURCHASE_ORDER"  采购订单
         * "OC_B_REFUND_PURCHASE" //采购退货单
         */
        // const url = this.$route.params[0];
        // const urlarr = url.split('/');
        // 取主标表名
        const tableName = this.$route.params.tableName;
        let requrl = '/p/cs/oc/v1/ImportPurchaseRefundOrder'; // 默认采购退后单地址
        if (!this.file) {
          this.$message({
            message: '请先选择导入得文件！',
            type: 'warning',
          });
          return;
        }
        // 判断主表表名
        if (tableName === 'OC_B_PURCHASE_ORDER') {
          requrl = '/p/cs/oc/v1/ImportPurchaseOrder'; // 采购订单得地址
        }
        const fromdata = new FormData(); // 表单提交
        fromdata.append('file', this.file);
        fromdata.append('isAutoAudit', this.isAutoAudit === '是');
        fromdata.append('mainTable  ', tableName);

        axios({
          method: 'post',
          url: requrl,
          data: fromdata,
        }).then((res) => {
          if (res.data.code === 0) {
            this.$Message.success(res.data.message);
          } else {
            this.$message({
              message: res.data.message,
              type: 'warning',
            });
          }
        });

      //            if(this.isClick){
      //              this.isClick=false;
      //              let formdata = new FormData();
      //              let isAutoAudit;
      //              if(this.isAutoAudit == '是'){
      //                isAutoAudit = true;
      //              }else {
      //                isAutoAudit = false;
      //              }
      //              formdata.append('file' , this.file);
      //              formdata.append('isAutoAudit' , isAutoAudit)

      //              axios({
      //                method:'post',
      //                url:'/p/cs/ocSendOutImport',
      //                data:formdata
      //              }).then(res=>{
      //                console.log(res);
      //                if(res.data.code === 0){
      //                  this.isClick=true;
      //                  this.$Message.success(res.data.message);
      //                  this.$emit("closeActionDialog");
      //                }else {
      //                  if(res.data.data){
      //                    this.isClick=true;
      //                    /* let content = '';
      //                     res.data.data.errResults.map(item=>{
      //                         content = content + `item.errMsg}+</br>`;
      //                     });
      // */                      this.errorList=res.data.data.errResults;
      //                    this.$Modal.error({
      //                      title: res.data.message,
      //                      titleAlign: "center",
      //                      render: (h, params) => {
      //                        console.log(this.errorList);
      //                        return h('div',
      //                          this.errorList.map(
      //                            msg =>{
      //                              return h('p',
      //                                {
      //                                  style: {
      //                                    width: "100%",
      //                                    textAlign: "center",
      //                                    paddingBottom:'10px'
      //                                  }
      //                                },
      //                                msg.errMsg
      //                              )
      //                            }
      //                          )
      //                        )

      //                      }
      //                    });
      //                  }else {
      //                    this.$Message.error(res.data.message);
      //                  }

      //                  this.$emit("closeActionDialog");
      //                }
      //              })
      //            }
      },
      cancel() {
        this.$emit('closeActionDialog', false);
      },
    },
    data() {
      return {
        file: '',
        isAutoAudit: '否', // 是否审核,
        errorList: [],
        isClick: true,
      };
    },
    computed: {
      origin() {
        return 'https://qc-r3-dev.oss-cn-shanghai.aliyuncs.com/import/template/purchaseReturnBatchInsert.xlsx';
      },
    },
  };
</script>
<style lang="less">
.batchImport {
  .logo {
    display: flex;
    justify-content: center;
  }
  .downLoad {
    padding: 0 50px;

    margin: 20px 0;
    .files {
      margin-top: 10px;
    }
  }
  .button {
    display: flex;
    flex-direction: row-reverse;
    padding-right: 50px;
    .first {
      margin-left: 20px;
    }
  }
}
</style>

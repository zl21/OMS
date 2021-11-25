<template>
   <div class="promisionTbale">
      <jordan-action-table
          :jordanTableConfig="jordanTableConfig"
          @on-select="onSelect"
          @on-select-cancel="onSelectCancel"
          @on-select-all="onSelectAll"
          @on-select-all-cancel="onSelectAllCancel"
          @table-delete-detail="tableDeleteDetail"
          @table-add-detail="tableAddDetail"
          @on-page-change="pageChange"
          @on-page-size-change="pageSizeChange"
          @on-current-change="onCurrentChange"
          @table-import="tableImport"
          @table-export="tableExport"></jordan-action-table>
      <el-dialog title="导入" :visible.sync="modal"  width="30%">
        <div class="import-panel">
          <el-upload
              class="upload-tables"
              ref="upload"
              :action="action"
              accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
              :data="table"
              :before-upload="handleBefore"
              :on-success="handleSuccess"
              :on-error="handleError"
              :auto-upload="false"
              :file-list="importFlies">
              <el-button class="btns">选择文件</el-button>
            </el-upload>
          </div>
          <div slot="footer">
            <div class="button-panel-table-promision btns" >
              <el-button @click="downLoadTemUp">下载模板</el-button>
              <el-button @click="cancelDetail">取消</el-button>
               <el-button @click="importData" class="imports">导入</el-button>
            </div>
          </div>
      </el-dialog>
   </div>
</template>
<script>
import jordanActionTable from 'professionalComponents/businessActionTable';
import publicMethodsUtil from '@/assets/js/public/publicMethods';
export default {
  name:'tablePromsion',
  components:{
    jordanActionTable
  },
  props:{
    scheme_data:{},
    choose_commodity:{}
  },
  data(){
    return {
      importFlies: [],//导入文件列表
      action:'/p/cs/pm/v1/specialParseExcel',
      modal:false,
      table:{
        proType: 1
      },
      selections:[],
      jordanTableConfig:{
        // indexColumn:true,
        pageShow:true,
        height:300,
        // isShowAddDetailBtn:true,
        isShowImportBtn:true,
        isShowExportBtn:true,
        isShowDeleteDetailBtn:true,
        total: 0, //设置总条数
        current: 1,
        pageSizeOpts: [100, 200, 500], // 每页条数切换的配置
        pageSize: 100, // 每页条数
        showDown:true,
        border:true,
        columns:[],
        data:[]
      },
    }    
  },
  watch:{
    scheme_data:{
      handler(val,old){
         if(val){
           if(val.rules.length>0){
             this.jordanTableConfig.data = val.rules[0].skuIds
           }
         }
      },
      deep: true,
      immediate: true
    },
  },
  mounted(){
    this.jordanTableConfig.total = this.jordanTableConfig.data.length
    this.getTable();
  },
  methods:{
    handleBefore(){
      this.table.proType =  this.choose_commodity.value6;
    },
    getTable(){
        let columns = []
        this.axios({
          url: '/p/cs/pm/v1/specialHeaderNames',
          method: "get",
          data:{},        
        }).then((res) => {
          if(res.data.code===0){
            let self = this
            columns = res.data.data.colomun
            columns.unshift({
            title: "序号",
            key: "index",
            width: 50,
            render: (h, params) =>
              h(
                "span",
                {
                  style: {
                    color: "#0f8ee9"
                  }
                },
                params.index + 1
              )
          });
          columns.unshift({
              type: "selection",
              width:50
          })
          columns.forEach((item,i)=>{
            item.align="center"
          })
        self.jordanTableConfig.columns = columns
        self.jordanTableConfig.columns.map((item,i)=>{
            if(item.key=='specialPrice'){
              item.render =  (h, params) => {
                return h("div",{
                   on: {
                     'click':e=>{
                       e.stopPropagation();
                       e.preventDefault();
                     },
                   },
                },[
                  h("Input", {
                    props: {
                      value: params.row.specialPrice,
                      regx: /^[0-9]*$/
                    },
                    on: {
                      "on-blur": e => {
                          let self = this
                          self.scheme_data.rules[0].skuIds.map((item,i)=>{
                              if(i==params.index){
                                item.specialPrice =  e.target.value
                              }
                          })
                          const param = {
                            "uuid": self.scheme_data.rules[0].uuid,
                            "actiId": "",
                            "type": 0, // 0 更新 1 删除
                            "list": [params.row]
                          };
                          const serachParams = new URLSearchParams();
                          serachParams.append('param', JSON.stringify(param));
                          axios({
                            method: 'post',
                            url: '/p/cs/UpdateSpecialOfferByID',
                            data: serachParams
                          }).then((res) => {
                            if (res.data.code === 0) {
                              // 修改成功
                            }
                          }).catch((error) => {
                            // error
                          });
                      },

                    }
                  })
                ]);
              }
            }
        })
          }
        });
      },
    downLoadTemUp(){
      this.axios({
        url: '/p/cs/pm/v1/getSpecialModuleUrl',
        method: "get",
        data:{},        
      }).then((res) => {
        if(res.data.code===0){
           window.open(res.data.data,'_blank') 
        }else{
          this.$message({
            message: res.message,
            type: 'warning'
          });
        }
      });
    },
    clearFile(){
      this.$refs.upload.clearFiles();
    },
    handleError(err, file, fileList) {
      this.$message({
        message: err.error,
        type: 'warning'
      });
      return false
    },
     unique(arr){            
        for(var i=0; i<arr.length; i++){
            for(var j=i+1; j<arr.length; j++){
                if(arr[i].PS_C_PRO_ECODE==arr[j].PS_C_PRO_ECODE){         
                    arr.splice(j,1);
                    j--;
                }
            }
        }
        return arr;
    },
    compare(p){ //这是比较函数
        return function(m,n){
            var a = m[p];
            var b = n[p];
            return a - b; //升序
        }
    },
    handleSuccess(res){
      if(res.code==0){
        this.scheme_data.rules[0].uuid = res.uuid;
        // 20210719 刁新铭：重复导入会覆盖的
        // if(this.scheme_data.rules[0].skuIds&&this.scheme_data.rules[0].skuIds.length>0){
        //   res.data.forEach((item)=>{
        //     item._checked=false
        //      this.scheme_data.rules[0].skuIds.unshift(item)
        //   })
        //   this.scheme_data.rules[0].skuIds = this.unique(this.scheme_data.rules[0].skuIds)
        // }else{
        this.scheme_data.rules[0].skuIds = []
        console.log(this.scheme_data.rules,11111111111111)
        res.data.forEach((item)=>{
          item._checked=false
          this.scheme_data.rules[0].skuIds.push(item)
        })
        // }
        const h = this.$createElement;
         this.$notify({
          title: '提示',
          message: h('i', { style: 'color: teal'}, res.message),
          duration: 5000
        });
        // this.$notify({
        //   title: '提示',
        //   message: res.message,
        //   duration: 0
        // });
        // this.$message({
        //   message: res.message,
        //   type: 'success'
        // });
      }else{
         const h = this.$createElement;
         this.$notify({
          title: '提示',
          message: h('i', { style: 'color: teal'}, res.message),
          duration: 5000
        });
        // this.$message({
        //   message: res.message,
        //   type: 'warning'
        // });
      }
    },
    cancelDetail(){
      this.modal = false
    },
    importData(){
      if (this.$refs.upload.$refs['upload-inner'].fileList.length === 0) {
        this.$message({
        message: '请先选择要导入的文件！',
        type: 'warning'
      });
        return;
      }
      this.$refs.upload.submit();
      this.cancelDetail()
    },
    tableAddDetail(){
      let obj = {
        PS_C_PRO_ECODE:Math.floor(Math.random()*10),
        PS_C_PRO_ENAME:'上衣',
        PRICE_LIST:140,
        DISCOUNT:0.45,
        specialPrice:99,
        _checked:false
      }
      this.scheme_data.rules[0].skuIds.push(obj)
    },
    tableImport() {
      this.modal = true
      setTimeout(()=>{
        this.clearFile()
      },100)
    },
    // 导出
    tableExport() {
      const param = {
        "uuid": this.scheme_data.rules[0].uuid
      };
      const serachParams = new URLSearchParams();
      serachParams.append('param', JSON.stringify(param));
      axios({
        method: 'post',
        url: '/p/cs/exportSpecialOfferPro',
        data: serachParams
      }).then((res) => {
        if (res.data.data.code === 0) {
          publicMethodsUtil.downloadUrlFile(res.data.data.data.url);
        }
      }).catch((error) => {
        // error
      });
    },
    // 分页change 事件
    pageChange(val) {
      this.jordanTableConfig.current = val;
      this.pagingQuery();
    },
    // 切换分页条数
    pageSizeChange(val) {
      this.jordanTableConfig.pageSize = val;
      this.pagingQuery();
    },
    pagingQuery() {
      const self = this;
      const param = {
        "uuid": self.scheme_data.rules[0].uuid,
        "actiId": this.$route.query.id,
        "size": this.jordanTableConfig.pageSize,
        "pageNum": this.jordanTableConfig.current
      };
      const serachParams = new URLSearchParams();
      serachParams.append('param', JSON.stringify(param));
      axios({
        method: 'post',
        url: '/p/cs/getSpecialOfferInfoByPage',
        data: serachParams
      }).then((res) => {
        if (res.data.code === 0) {
          self.jordanTableConfig.total = res.data.total
          self.scheme_data.rules[0].skuIds = res.data.data
        }
      }).catch((error) => {
        // error
      });
    },
    tableDeleteDetail(){
        const self = this
        let flag = false
        self.scheme_data.rules[0].skuIds.forEach(item => {
            if(item._checked){
              flag = true
            }
        });
        if(!flag){
          self.$message({
            message: '请选择要删除的信息',
            type: 'warning'
          });
          return false
        }
        const param = {
          "uuid": self.scheme_data.rules[0].uuid,
          "actiId": "",
          "type": 1, // 0 更新 1 删除
          "list": self.scheme_data.rules[0].skuIds.filter(item=>item._checked === true)
        };
        const serachParams = new URLSearchParams();
        serachParams.append('param', JSON.stringify(param));
        axios({
          method: 'post',
          url: '/p/cs/UpdateSpecialOfferByID',
          data: serachParams
        }).then((res) => {
          if (res.data.code === 0) {
            // 删除成功
            self.scheme_data.rules[0].skuIds = self.scheme_data.rules[0].skuIds.filter(item=>item._checked === false)
          }
        }).catch((error) => {
          // error
        });
    },
    onCurrentChange(val){

    },
    onSelectAllCancel(select,row){
      this.scheme_data.rules[0].skuIds.map((item)=>{
        item._checked = false
      })
    },
    onSelectAll(select,row){
      this.scheme_data.rules[0].skuIds.map((item)=>{
        item._checked = true
      })
    },
    onSelect(select,row){
      this.scheme_data.rules[0].skuIds.map((item)=>{
        if(row.PS_C_PRO_ECODE == item.PS_C_PRO_ECODE){
          item._checked = true
        }
      })
    },
    onSelectCancel(select,row){
      this.scheme_data.rules[0].skuIds.map((item)=>{
        if(row.PS_C_PRO_ECODE == item.PS_C_PRO_ECODE){
          item._checked = false
        }
      })
    },
  }
}
</script>
<!--新增盘点单-->
<template>
  <div class="inventoryInsert" v-loading="loading">
    <div class="query-content">
      <div class="myInput">
        <my-input
          :isActive="true"
          :isDisabled="false"
          :itemdata="itemdata"
          @getFkChooseItem="getFkChooseItem"
        ></my-input>
      </div>
      <el-form label-position="right" label-width="88px">
        <!-- <el-form-item class="form-item" label="盘点店仓：" required>
          <current-user-access-store
            v-model="query.store"
            :ischeckbox="false"
            @handleSelect="axiosDefaultStore"
          ></current-user-access-store>
        </el-form-item>-->
        <el-form-item class="form-item" label="盘点类型：" required>
          <el-select v-model="query.type" placeholder="请选择盘点类型" @change="sel_type">
            <el-option label="分类全盘" name="type" value="2" key="2"></el-option>
            <el-option label="局部盘" name="type" value="1" key="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="form-item" label="盘点日期：" v-if="query.type=='1'" required>
          <el-input v-model="query.date" :disabled="true"></el-input>
        </el-form-item>
        <div class="item_three" v-else>
          <span>
            <b>*</b>盘点日期：
            <el-date-picker
              class="M_date_clas"
              v-model="query.date"
              format="yyyy-MM-dd"
              type="date"
              placeholder="选择日期"
            ></el-date-picker>
          </span>
        </div>
        <el-form-item
          class="form-item"
          label
          v-show="query.type == 0 && query.storeType"
          style="margin-top: -10px;"
        >
          <label class="tips">提示：计划月盘日当天上午11:00至下午18:00之间禁止全盘</label>
        </el-form-item>
        <el-form-item class="form-item" label="业务范围：" required>
          <el-select v-model="query.wuliao_type" multiple placeholder="请选择业务范围" :disabled="wuliao_disabled">
            <el-option
              v-for="(item,index) in wuliao_data"
              :key="index"
              :label="item.limitdesc"
              :value="item.limitval"
              :disabled="item.disabled"
            ></el-option>
          </el-select>
        <!--  <el-select v-model="value1"  multiple placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>-->
        </el-form-item>
      </el-form>
    </div>
    <div class="dialog-footer">
      <Button
        ghost
        type="error"
        style="marginLeft:10px;"
        @click.stop="axiosInsertAction"
      >
        {{ChineseDictionary.ENSURE}}
      </Button>
      <Button  @click.stop="closeDialog()">
        {{ChineseDictionary.CANCEL}}
      </Button>
    </div>
  </div>
</template>
<script>
/*import Vue from 'vue'*/
import ChineseDictionary from '@/assets/js/ChineseDictionary.js'
import { post } from 'framework/__utils__/request';
import currentUserAccessStore from 'framework/components/input/currentUserAccessStore.vue'
import myInput from 'framework/components/input/objinput_dz.vue';
export default {
  props: {},
  components: { currentUserAccessStore, myInput },
  created() {
    this.ChineseDictionary = ChineseDictionary;
    this.axiosDefaultStore();
    this.wuliao();
  },
  data() {
    return {
      wuliao_data: [],
      wuliao_disabled: false,
     /* value1:[],
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],*/
      itemdata: {
        col: 1,
        colid: 1700803703,
        colname: "CP_C_PHY_WAREHOUSE_ID", //当前字段的名称
        datelimit: "all",
        display: "text", //显示什么类型，例如xml表示弹窗多选加导入功能，mrp表示下拉多选
        fkdisplay: "drp", //外键关联类型
        fkdesc: "下单店铺",
        inputname: "CP_C_PHY_WAREHOUSE_ID:ENAME", //这个是做中文类型的模糊查询字段，例如ENAME
        isfk: true, //是否有fk键
        isnotnull: true, //是否必填
        isuppercase: false, //是否转大写
        length: 65535, //最大长度是多少
        name: "盘点店仓", //input前面显示的lable值
        readonly: false, //是否可编辑，对应input   readonly属性
        reftable: "CP_C_PHY_WAREHOUSE", //对应的表
        reftableid: 24486, //对应的表ID
        row: 1,
        statsize: -1,
        type: "STRING", //这个是后台用的
        valuedata: "", //这个是选择的值
        pid: '',
        precolnameslist: [{ iswrite: false, refcol: "ID", premtype: "CP_C_WAREHOUSE_ID" }]
      },
      ChineseDictionary: '',
      query: {
        store: [],//店仓名称
        storeType: true,
        type: '2',//盘点类型
        date: '',//盘点时间
        systemDate: '',
        planDate: '',
        wuliao_type: '',  //物料类型
      },
      loading: true,
      BUSINESSRANGE_NAME:[],
      allType:[] // 全选
    }
  },
  computed: {},
  watch: {

      'query.wuliao_type':function(val,oldval){
        let newindex =  val.indexOf('ALL'),oldindex =  oldval.indexOf('ALL');   //获取val和oldval里all的索引,如果没有则返回-1
        if(newindex!=-1 && oldindex==-1 && val.length>1)                       //如果新的选择里有勾选了选择所有选择所有 则 只直线勾选所有整个选项
          this.query.wuliao_type=['ALL'];
        else if(newindex!=-1 && oldindex!=-1 && val.length>1)                 //如果操作前有勾选了选择所有且当前也选中了勾选所有且勾选数量大于1  则移除掉勾选所有
          this.query.wuliao_type.splice(val.indexOf('ALL'),1)
      }

    // 'query.type': function (val, old) {
    //   const _self = this;
    //   if (val == 2) {
    //     _self.query.date = _self.query.planDate;
    //   } else {
    //     _self.query.date = _self.query.systemDate;
    //   }
    // }
  },
  mounted() {

  },
  methods: {
    sel_type(val) {
      console.log(val);
      this.select_wuliao();
    },
    select_wuliao() {  //根据盘点类型控制物料类型值是否可选
      let self = this;
      console.log(self.query.type);
      if (self.query.type == '2') {
        // self.wuliao_data[0].disabled = true;
        // self.query.wuliao_type = "";
        self.wuliao_disabled = false;
      } else {
        self.query.date=self.query.systemDate;
        self.wuliao_data[0].disabled = false;
        self.query.wuliao_type = ['ALL'];
        self.wuliao_disabled = true;
      }
    },
    wuliao() { //物料类型下拉数据获取
      let self = this;
      let formdata = new FormData();
      formdata.append('table', 'PS_C_PRO');
      formdata.append('objid', -1);
      post('/p/cs/getObject', formdata).then(res => {
        if (res.data.code == 0) {
          res.data.data.addcolums.map(item => {
            if (item.parentdesc == '基本信息') {
              item.childs.map(s_item => {
                if (s_item.colid == 166442) {
                  s_item.combobox.unshift({
                    limitdesc: '全部',
                    limitval: 'ALL',
                    disabled: false
                  });
                  s_item.combobox.map(ss_item => {
                    if (ss_item.limitval != 'ALL') {
                      ss_item['disabled'] = false;
                    }
                   /* self.wuliao_data.push(
                      {
                        label:ss_item.limitdesc,
                        value: ss_item.limitval,
                      }
                    )*/
                  });

                  self.wuliao_data = JSON.parse(JSON.stringify(s_item.combobox));
                  // self.select_wuliao();
                  console.log(self.wuliao_data);
                }
              })
            }
          })
        }
      })
    },
    getFkChooseItem(val) {
      if (val.colid) {
        this.query.store[0].ENAME = '';
        this.query.store[0].ECODE = '';
        this.query.store[0].ID = '';
      } else if (val.id) {
        this.query.store[0].ENAME = val.ENAME;
        this.query.store[0].ECODE = val.ECODE;
        this.query.store[0].ID = val.id;
      } else {
        this.query.store[0].ENAME = val.ENAME.val;
        this.query.store[0].ECODE = val.ECODE.val;
        this.query.store[0].ID = val.ID.val;
      }
    },
    //获取默认店仓
    axiosDefaultStore() {
      let storeId = '';
      if (this.query.store.length > 0) {
        console.log(this.query.store)
        storeId = this.query.store[0].ID;
      }
      let param = {
        "objid": -1,
        "fixcolumn": {
          "STORE_ID": storeId
        }
      };
      let searchParam = new URLSearchParams();
      searchParam.append('param', JSON.stringify(param));
      post('/p/cs/sg/ScBInventory/addload', searchParam).then(res => {
        console.log(res);
        this.loading = false;
        if (res.data.code == 0) {
          let result = res.data.data;
          if (result) {
            const _self = this;
            // if (result.ID) {
            _self.query.store = [{
              ECODE: result.ECODE,
              ENAME: result.ENAME,
              ID: result.ID
            }];
            this.itemdata.valuedata = result.ENAME;
            this.itemdata.pid = result.ID;
            // }
            _self.query.systemDate = result.SYSTEM_DATE;
            _self.query.planDate = result.PLAN_CHECK_DATE;
            if (result.STORENATURE === 'WH') {
              _self.query.storeType = false;
            } else {
              _self.query.storeType = true;
            }
            if (_self.query.type == 0) {
              _self.query.date = _self.query.planDate;
            } else {
              _self.query.date = _self.query.systemDate;
            }

          }
        }
      }).catch(() => {
        this.loading = false;
      });
    },
    axiosInsertAction() {
      const _self = this;
      if (!_self.query.store || _self.query.store.length <= 0) {
        _self.$message({
          message: '盘点店仓不能为空！',
          type: 'warning'
        });
        return;
      }
      let storeId = _self.query.store[0].ID;
      if (!_self.query.type) {
        _self.$message({
          message: '盘点类型不能为空！',
          type: 'warning'
        });
        return;
      }
      // 分类全盘业务范围不能为空
      if (_self.query.type=='2'&&_self.query.wuliao_type.length==0) {
        _self.$message({
          message: '业务范围不能为空！',
          type: 'warning'
        });
        return;
      }
      if (!_self.query.date) {
        _self.$message({
          message: '盘点日期不能为空！',
          type: 'warning'
        });
        return;
      } else {
        if (typeof _self.query.date === "object") {
          _self.query.date = _self.formatDate(_self.query.date);
        }
      }
      // 判断是否全选
      if(_self.query.wuliao_type[0]=="ALL"){
        _self.wuliao_data.map(
          item =>{
            if (item.limitdesc!="全部"){
              if(!_self.BUSINESSRANGE_NAME.includes(item.limitdesc)){
                _self.BUSINESSRANGE_NAME.push(item.limitdesc);
                _self.allType.push(item.limitval)
              }
            }
          }
        )
      }else {
        _self.wuliao_data.map(
          (item) =>{
            _self.query.wuliao_type.map(
              (item1)=>{
                if (item.limitval==item1){
                  if(!_self.BUSINESSRANGE_NAME.includes(item.limitdesc)){
                    _self.BUSINESSRANGE_NAME.push(item.limitdesc)
                  }
                }
              }
            )
          }
        );
      }

      let query = {
        objid: -1,
        fixcolumn: {
          CP_C_PHY_WAREHOUSE_ID: storeId,
          INVENTORY_TYPE: _self.query.type,
          INVENTORY_DATE: _self.query.date,
          CP_C_PHY_WAREHOUSE_ECODE: _self.query.store[0].ECODE,
          CP_C_PHY_WAREHOUSE_ENAME: _self.query.store[0].ENAME,
          PLAN_DATE: _self.query.planDate,
          BUSINESSRANGE: _self.query.wuliao_type[0]=="ALL" ? _self.allType.toString() : _self.query.wuliao_type.toString(),
          BUSINESSRANGE_NAME:this.BUSINESSRANGE_NAME.toString()
        }
      }
      //        console.log(query);
      _self.loading = true;
      let searchParam = new URLSearchParams();
      searchParam.append('param', JSON.stringify(query));
      post('/p/cs/sg/ScBInventory/save', searchParam).then(res => {
        _self.loading = false;
        _self.BUSINESSRANGE_NAME=[];
        if (res.data.data.code == 0) {
          _self.$message({
            message: res.data.data.message,
            type: 'success'
          });
          let result = res.data.data.data;
          let tab = {
            action: '/m/singleView/singleView?id=' + result.objid + '&tableName=' + result.tablename + '&pid=24062&ptype=table&ptitle=盘点单&tabTitle=盘点单编辑',
            webid: result.objid,
            tableName: result.tablename,
            webdesc: '盘点单编辑'
          };
          _self.$emit('jumpNavbar', tab);
          _self.closeDialog();
        } else if (res.data.code == -2) { //特殊处理,错误提示走了catch但是取不到错误信息,故使用code为-2
          // console.log(res);
          _self.loading = false;
          _self.$message({
            message: res.data.message,
            type: 'error'
          });
          _self.closeDialog();
        }
        _self.closeDialog();
      })
      // .catch(() => {
      //   _self.loading = false;
      //   _self.$message({
      //     message: '失败',
      //     type: 'error'
      //   });
      // })
    },
    closeDialog() {
      this.$emit('closeActionDialog');
    },
    //格式化时间
    formatDate(date) {
      let year = date.getFullYear();
      let month = date.getMonth() + 1 >= 10 ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1));
      let day = date.getDate() >= 10 ? date.getDate() : ('0' + date.getDate());
      return '' + year + '-' + month + '-' + day;
    },
  }
}
</script>
<style lang="less" type="text/less">
.inventoryInsert {
  .el-input__inner {
    height: 24px !important;
  }
  .item_three {
    margin-left: 21px;
    margin-bottom: 10px;
    span {
      display: flex;
      align-items: center;
      color: #575757;
      b {
        color: #f50505;
      }
    }}
  width: 340px;
  .el-select__tags{
    white-space: nowrap;
    overflow: hidden;
    display: inline-block !important;
  }
  .myInput {
    margin-bottom: 8px;
    .item-input {
      padding-left: 19px;
      .title {
        line-height: 24px;
        i {
          font-size: 12px;
          font-style: normal;
          padding-right: 4px;
        }
      }
      .el-autocomplete {
        width: 85.5%;
        border: none;
        .el-input {
          height: 24px;
          input {
            height: 100%;
          }
        }
      }
      .popover-icon {
        right: 40px;
      }
    }
  }
  .query-content {
    .form-item {
      width: 340px;
      display: block;
      margin: 0 10px 10px 0;
      height: 24px;
      line-height: 24px;
      position: relative;
      clear: both;
      vertical-align: middle;
      .el-form-item__label {
        font-size: 12px;
        padding: 0;
        line-height: 24px;
      }
      .el-form-item__content {
        line-height: 24px;
        height: 24px;
        font-size: 12px;
        .tips {
          color: #e80000;
          margin-top: 6px;
          line-height: 14px;
          width: auto;
        }
        .el-select {
          .el-input {
            height: 24px;
            .el-input__icon {
              width: 20px;
            }
          }
        }
        .el-date-editor.el-input {
          width: 220px;
          .el-input__icon {
            width: 20px;
            color: #0f8ee9;
          }
        }
        .is-disabled {
          input {
            background-color: #f4f4f4;
          }
        }
        input[type="text"] {
          border: solid 1px #d8d8d8;
          border-radius: 0 2px 2px 0;
          -webkit-box-sizing: border-box;
          -moz-box-sizing: border-box;
          box-sizing: border-box;
          color: #575757;
          float: left;
          font-size: 12px;
          height: 24px;
          padding: 0 20px 0 0;
          text-indent: 5px;
          width: 220px;
          line-height: 24px;
        }
        label {
          display: inline-block;
          height: 24px;
          width: 32%;
          input[type="checkbox"],
          input[type="radio"] {
            float: left;
            margin: 6px 6px 6px 0;
          }
        }

        .shadow-input {
          display: none;
          position: absolute;
          left: 0;
          top: 0;
          right: 40px;
          bottom: 0;
          background: rgba(0, 0, 0, 0.1);
          z-index: 1;
          opacity: 0;
          &:hover {
            opacity: 1;
          }
          .iconfont {
            right: 4px;
            color: #fff;
            background: #918f8f;
            height: 18px;
            top: 3px;
            line-height: 18px;
          }
        }
      }
    }
  }
  .button-panel {
    margin: 20px 40px 10px;
    text-align: center;
    .el-button {
      border: solid 1px #fd6442;
      border-radius: 2px;
      color: #fd6442;
      height: 24px;
      font-size: 12px;
      width: 66px;
      padding: 0;
      &:hover {
        opacity: 0.6;
      }
    }
  }
}
</style>




<template>
  <!--促销第二步上半部分-->
  <div class="procedureTwo_index">
    <div class="procedureTwo_centen">
      <div class="proc_c_left CommonStyle">
        <h1>基础信息</h1>
        <ul class="M_ul">
          <li class="M_li">
            <label><b>*</b>活动名称:</label><input maxlength="100" class="customization" v-model="activityName" type="text">
          </li>
          <li class="M_li">
            <label><b>*</b>活动日期:</label>
            <el-date-picker
              class="M_date_clas"
              v-model="value1"
              type="datetimerange"
              :picker-options="pickerOptions"
              align="right"
              placeholder="选择日期"
              :default-time="['00:00:00', '23:59:59']"
            >
            </el-date-picker>
          </li>
          <li class="M_li">
            <label><b>*</b>活动频次:</label>
            <my-data
              :append-to-body="true"
              :activities.sync="activities"
              :initialData="initialData"
              @saveData="saveData"
              @returnTime="returnTime"
            >
            </my-data>
          </li>
        </ul>
      </div>
      <!-- 活动范围 -->
      <!-- 线上 -->
      <div class="proc_c_right CommonStyle" v-if="!isOnLine()">
        <h1>活动范围</h1>
        <ul class="M_ul">
          <li class="M_se_input">
            <!-- 参与店铺 -->
            <my-input
              :isActive="true"
              :isdisabled="false"
              :itemdata="Mitemdata"
            >
            </my-input>
            <!-- 参与仓库 -->
            <my-input
              :isActive="true"
              :isdisabled="false"
              :itemdata="Mitemdata1"
            >
            </my-input>
          </li>
          <!-- <li class="M_se_input">
            <div class="item_three"> -->
              <!-- 仅限会员 -->
              <!-- <v-select
                class="selectcomp"
                type="select"
                :importance="false"
                :itemdata='MyselectVIP'>
              </v-select> -->
              <!-- 会员等级 -->
              <!-- <my-input
                :isActive="true"
                :isdisabled="false"
                :itemdata="Mitemdata2"
              >
              </my-input>
            </div>
          </li> -->
          <li class="M_se_input">
            <div class="item_three1">
              <!-- 单据类型 -->
            <div class="timeStyle">
              <span class="timeTitle">单据类型:</span>
              <Select multiple v-model="orderType" clearable transfer>
                  <Option v-for="item in orderStatusData" :value="item.limitval" :key="item.limitval">{{ item.limitdesc }}</Option>
              </Select>
            </div>
            <!-- 时间类型 -->
            <div class="timeStyle">
              <span class="timeTitle">时间类型:&nbsp;</span>
              <Select v-model="timeType" transfer>
                <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </div>
            </div>
            
          </li>
          <!-- 排除省份 -->
          <li class="M_se_input">
            <div class="item_four">
              <my-input
                  :isActive="true"
                  :isdisabled="false"
                  :itemdata="Mitemdata3"
              >
              </my-input>
            </div>
          </li>
        </ul>
      </div>
      <!-- 线下 -->
      <div class="proc_c_right CommonStyle" v-if="isOnLine()">
        <h1>活动范围</h1>
        <ul class="M_ul">
          <!-- 适用门店 -->
          <li class="M_se_input">
            <my-input
              :isActive="true"
              :isdisabled="false"
              :itemdata="unLineMitemdata"
            >
            </my-input>
          </li>
          <!-- 仅限会员 -->
          <li class="M_li">
            <div class="item_three">
              <v-select
                class="selectcomp"
                type="select"
                :importance="false"
                :itemdata='MyselectVIP'>
              </v-select>
            </div>
          </li>
          <!-- 会员等级 -->
          <li class="M_se_input">
            <my-input
              :isActive="true"
              :isdisabled="false"
              :itemdata="Mitemdata2"
            >
            </my-input>
          </li>
        </ul>
      </div>
      <!-- 活动范围 -->
    </div>
    <div class="com">
      <h1 class="M_title">活动方案</h1>
      <ul class="M_table">
        <li v-for="(item,index) of list" :key="index">
          <label>
          <input type="radio" name="a" :value="item.ID" :id="item.ID" @click="switchDetail(index)" :checked="item.checked">
          <!-- <input type="radio" name="a" :value="item.ID" :id="item.ID" @click="switchDetail(item.ID)" :checked="!index"> -->
          {{item.ENAME}}:{{item.BRIEF}}
          </label>
        </li>
      </ul>
      <div class="FullReduction_1">
        <div class="tableList">
          <div class="condition">
            <table>
              <td v-if="isShow1()">是否与其他商品活动同时执行:
                <el-select v-model="combInValue.value1" placeholder="请选择">
                  <el-option
                    v-for="item in combIn.options1"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </td>
              <td>是否与全场活动同时执行:
                <el-select v-model="combInValue.value2" placeholder="请选择">
                  <el-option
                    v-for="item in combIn.options1"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </td>
              <td v-if="false">是否享受VIP折上折:
                <el-select v-model="combInValue.value3" placeholder="请选择">
                  <el-option
                    v-for="item in combIn.options1"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </td>
              <td v-show="isShow2()">换购条件:
                <el-select v-model="combInValue.value4" placeholder="请选择">
                  <el-option
                    v-for="item in combIn.options2"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </td>
            </table>
            <button>说明</button>
            <button @click="allDel">清空</button>
          </div>
          <combine-model :tobjid="tobjid"  :scheme_data="scheme_data"   :amend="amend" @changeM="changeM" v-if="combineInit"></combine-model>
          <div class="double" v-if="showDouble()">
            允许最大翻倍 <input type="text" v-model="combInValue.value5"
            @input="handleInput" > 0或者空表示不自动翻倍；-1表示不限次数；正整数表示最大翻倍次数
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
   import myData from '../../date/date';
  import select from 'framework/components/select/Mselect.vue';
  import myInput from 'framework/components/element/input';
  import CombineModel from './PromotionComponent/PromotionRules/CombineModel';

  export default {
    data() {
      return {
        combineInit:true,
        tyep_current:0, //当前选中方案
        orderStatusData:"", //单据状态下拉数据
        orderType:['1'], //单据状态选中数据
        timeType:"2",  //时间类型数据
        amend:false,//修改活动方案，告诉下面的组件更新
        combIn:{
          options1: [
            {
              value: "Y",
              label: "是"
            },
            {
              value: "N",
              label: "否"
            },
          ],
          options2: [
            {
              value: 1,
              label: "不限"
            },
            {
              value: 2,
              label: "仅限同款"
            },
            {
              value: 3,
              label: "仅限同吊牌价"
            }
          ],
        },
        combInValue:{
          value1: "Y",
          value2: "Y",
          value3: "N",
          value4: 1,
          value5: "-1"
        },
        activityName:'',
        value1: '',//时间
        activities: '',//活动频次的存放
        maxInputData:{
          week:[],
          type:1,
          day:[],
          weekIndex:[],
        },//选择时的值
        initialData:{
          "week": ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
          "type": 1,
          "day": [],
          "weekIndex": [1, 2, 3, 4, 5, 6, 7],
          "Time": {
              "startDate": "00:00",
              "endDate": "23:59"
          }
        },//请求回来的默认值
        Time:{
          startDate:'00:00',
          endDate:'23:59'
        },//选择时的时间
        scheme_Arr:'',//可选方案的选择值
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },//日期控件快捷方式的数据函数
        MyselectVIP: {//仅限会员
          coldesc: '仅限会员',
          combobox: [
            {
              id: 1,
              limitdesc: '否',
              limitval: '1'
            },
            {
              id: 2,
              limitdesc: '是',
              limitval: '2'
            },
          ],
          value: '',
        },//是否仅限会员的数据
        //时间类型
         cityList: [
                    {
                        value: '1',
                        label: '下单时间'
                    },
                    {
                        value: '2',
                        label: '付款时间'
                    }
                ],
        Mitemdata: {//参与店铺
          col: 1,
          colid: 138222,
          colname: "CP_C_STORE_IDS",
          datelimit: "all",
          display: "xml",
          fkdesc: "门店档案",
          fkdisplay: "mop",
          inputname: "CP_C_STORE_IDS:ENAME",
          isfk: true,
          isnotnull: false,
          isuppercase: false,
          length: 65535,
          name: "参与店铺",
          readonly: false,
          reftable: "CP_C_SHOP",
          reftableid: 24475,
          row: 1,
          statsize: -1,
          type: "STRING",
          valuedata: ''
        },
        unLineMitemdata:{//参与门店
          col: 1,
          colid: 138222,
          colname: "CP_C_STORE_IDS",
          datelimit: "all",
          display: "xml",
          fkdesc: "门店档案",
          fkdisplay: "mop",
          inputname: "CP_C_STORE_IDS:ENAME",
          isfk: true,
          isnotnull: false,
          isuppercase: false,
          length: 65535,
          name: "参与门店",
          readonly: false,
          reftable: "CP_C_RSTORE",
          reftableid: 23446,
          row: 1,
          statsize: -1,
          type: "STRING",
          valuedata: ''
        },
        Mitemdata1: { //参与仓库
          col: 1,
          colid: 138222,
          colname: "CP_C_STORE_IDS",
          datelimit: "all",
          display: "xml",
          fkdesc: "门店档案",
          fkdisplay: "mop",
          inputname: "CP_C_STORE_IDS:ENAME",
          isfk: true,
          isnotnull: false,
          isuppercase: false,
          length: 65535,
          name: "参与仓库",
          readonly: false,
          reftable: "CP_C_PHY_WAREHOUSE",
          reftableid: 24486,
          row: 1,
          statsize: -1,
          type: "STRING",
          valuedata: ''
        },
        Mitemdata2: {
          "col": 1,
          "reftable": "VP_C_VIPTYPE",
          "display": "text",
          "length": 65535,
          "reftableid": 23476,
          "refobjid": "",
          "type": "STRING",
          "statsize": -1,
          "datelimit": "all",
          "colname": "VP_C_VIPTYPE_IDS",
          "readonly": false,
          "isuppercase": false,
          "isnotnull": false,
          "fkdesc": "会员等级",
          "name": "会员等级",
          "valuedata": "",
          "fkdisplay": "mrp",
          "row": 1,
          "inputname": "VP_C_VIPTYPE_IDS:ENAME",
          "colid": 1646750000,
          "isfk": true,
        },
        // Mitemdata2: {//会员等级
        //   "col": 1,
        //   "reftable": "VP_C_VIPTYPE",
        //   "display": "text",
        //   "length": 65535,
        //   "reftableid": 23476,
        //   "refobjid": "",
        //   "type": "STRING",
        //   "statsize": -1,
        //   "datelimit": "all",
        //   "colname": "VP_C_VIPTYPE_IDS",
        //   "readonly": false,
        //   "isuppercase": false,
        //   "isnotnull": false,
        //   "fkdesc": "会员等级",
        //   "name": "会员等级",
        //   "valuedata": "",
        //   "fkdisplay": "mop",
        //   "row": 1,
        //   "inputname": "VP_C_VIPTYPE_IDS:ENAME",
        //   "colid": 138217,
        //   "isfk": true
        // },//会员等级
        Mitemdata3: {//排除省
          col: 1,
          colid: 138222,
          colname: "CP_C_STORE_IDS",
          datelimit: "all",
          display: "xml",
          fkdesc: "门店档案",
          fkdisplay: "mop",
          inputname: "CP_C_STORE_IDS:ENAME",
          isfk: true,
          isnotnull: false,
          isuppercase: false,
          length: 65535,
          name: "排除省",
          readonly: false,
          reftable: "CP_C_PROVINCE",
          reftableid: 23862,
          row: 1,
          statsize: -1,
          type: "STRING",
          valuedata: ''
        },
        sub:0,
        Objid:this.$route.query.id,
        Swit:true,//保存草稿開關，防止多次點擊
        schemeOne:{},  //通过接口直接获取当前页面渲染的数据  view标记为true
      }
    },
    computed:{
      list (){
        let view = this.$route.query.view || false;
        if(view){
           return  this.schemeOne.scheme_arr;
        }
        return this.$route.query.id>0 ?this.$store.state.customize.dataTwo.scheme_arr:this.$store.state.customize.dataTwoNew.scheme_arr
      },
      schTypeId(){  //中类ID
        return this.$store.state.customize.jordanStore.sch_type_id;
      },
      scheme_data(){
          let view = this.$route.query.view || false;
          if(view){
            return  this.schemeOne.scheme_data;
          }
        let routerid = this.$route.query.id;
        let temp =routerid>0 ?this.$store.state.customize.scheme_data:this.$store.state.customize.scheme_dataNew;
        if(this.Objid<0){//新增，防止keep-alive  created 不执行
            this.scheme_Arr = temp.detail_id;
        }
        return temp;
      },
      scheme_dataInit(){
        let view = this.$route.query.view || false;
         return  view ? this.schemeOne : this.$store.state.customize.jordanStore.scheme_dataInit
      },
    },
    components: {
      'v-select': select,
      myInput,
      myData,
      // FullReduction,
      CombineModel
    },
    props:{
      tobjid:{//只有切换到促销第一个页面才会变为true
        type:Boolean,
        default:()=>false
      },
      dataOne:{
        type:Array,
        default:()=>[]
      },
      M_index:{
        type:Object,
        default:()=>{}
      },
      mutating:{//保存草稿
        type:Boolean,
        default:()=>false
      },
    },
    watch:{
      orderType:{
        handler(val , old){
          let arr = [];
          if(val[0] === 'bSelect-all'){
            this.orderStatusData.map(item=>{
              arr.push(item.limitval);
            })
            this.orderType = arr;
          }
        }
      },
      MyselectVIP:{
        handler(val, old) {
          this.Mitemdata2.readonly=val.value===1?true:false
          if(this.Mitemdata2.readonly){
            this.Mitemdata2.valuedata=''
            this.Mitemdata2.pid=''
          }
        },
        deep:true
      },
      'mutating':{
        handler(val, old) {
          if(val){
            this.save()
            this.$emit('SaveDrafts',this.Objid);
          }
        },
      },
      'tobjid':{
        handler(val, old) {
          if(val){
            this.Mitemdata2.pid=''
            this.Mitemdata2.valuedata=''
            this.activityName=''
            this.activities=''
            this.maxInputData={
              week:[],
              type:1,
              day:[],
              weekIndex:[],
            },
            this.initialData={
              week:[],
              type:1,
              day:[],
              weekIndex:[],
              Time:{
                startDate:'00:00',
                endDate:"23:59"
              }
            }
            this.MyselectVIP.value=''
            this.Mitemdata.pid=''
            this.Mitemdata.valuedata=''
            this.unLineMitemdata.pid=''
            this.unLineMitemdata.valuedata=''
            
            this.value1=''
            this.Objid=-1
          }
        },
      },
    },

    created(){//这个接口不能放在mounted里，不然子组件先渲染，拿不到后续的值
      let view = this.$route.query.view || false;
      if(view){
        this.getDisData();
        this.$emit('editOrView',true);
        return;
      }
      //add by wdq  20200225 针对以下的处理方法持有保留意见 问题：如果同时打开多个界面或者外部链接这个界面，存在内存丢失问题,尝试使用别的方法代替
      this.tSave();
    },
    mounted(){
      //获取单据类型下拉数据
      this.orderStatus();
      // this.reloadToData();
    },
    methods:{
      //判断当前方案为线上或线下促销
      isOnLine(){
        //默认为线下
        let value = true;
        if(!this.scheme_data)  return;
        if(this.scheme_data.promotionType_code==='GA17'||
        this.scheme_data.promotionType_code==='GA18'||
        this.scheme_data.promotionType_code==='PA16'||
        this.scheme_data.promotionType_code==='PA17'){
          value = false;
        }
        return value;
      },
      getDisData(){
          let self = this;
          let ACTI_ID = this.$route.query.id;
          let typeId = this.$route.query.typeId;
          this.axios({
            method: 'post',
            url: '/p/cs/cpromactiquery',
            data: {
              param:JSON.stringify({
                "objid":ACTI_ID,  "prom_type_id":typeId
              })
            }
          }).then((res) => {
            if(res.data.code===0){
              self.schemeOne = res.data.data;
              self.tSaveNoEdit();
            }
          });
      },
      //刷新请求数据
      reloadToData() {//双击事件
              let ACTI_ID = this.$route.query.id;
              let typeId = this.$route.query.typeId;
              this.axios({
                method: 'post',
                url: '/p/cs/cpromactiquery',
                data: {
                  param:JSON.stringify({
                    "objid":ACTI_ID,  "prom_type_id":typeId
                  })
                }
              }).then((res) => {
                if(res.data.code===0){
                  this.$store.state.customize.dataTwo=res.data.data
                  //sq存储一套作为清空操作的初始数据
                  let scheme_dataInit = JSON.stringify(res.data.data.scheme_arr);
                  this.$store.commit('customize/scheme_dataRecover' , JSON.parse(scheme_dataInit));
                  //存储种类id保存草稿时需要
                this.$store.state.customize.jordanStore.sch_type_id = res.data.data.basic_info.sch_type_id
                  this.$store.commit('customize/TabHref', {
                    id:ACTI_ID,//id
                    type: "action",//类型action
                    name: "promotion",//文件名
                    label: "编辑促销活动",//tab中文名
                    query: Object.assign({
                      id: ACTI_ID,//id
                      typeId:typeId,
                      tabTitle: "编辑促销活动",//tab中文名
                      // prom_type_name:PROM_TYPE_NAME , //二类名称
                      // prom_type_brief:PROM_TYPE_BRIEF,  //二类描述
                      // status:STATUS
                    })//带的参数
                  })
                }
              })
          },
      //获取单据状态下拉数据方法
      orderStatus(){
        let self = this;
        self.axios({
          url:'/p/cs/getTableQuery',
          method:'post',
          data:{
            table:'PM_C_PROM_ACTI_PROP',
            getcmd:'y'
          }
        }).then(res=>{
          if(res.data.code === 0){
            self.orderStatusData = res.data.datas.dataarry[0].combobox
          }
        })
      },
      changeM(){
        this.amend=false
      },
      handleInput(e){
        this.combInValue.value5=e.target.value.replace(/[^(\-?\d)]/g,'')
        if(this.combInValue.value5>-2 || this.combInValue.value5 == "-"){
            this.combInValue.value5=e.target.value.replace(/[^(\-?\d)]/g,'')
        }else{
              this.combInValue.value5=e.target.value.replace(/[\d]+/g,'')
        }
      },
      //限制最大翻倍为大于-1的所有正整数
      tSave(){
        if(this.Objid>0){
          let routerid = this.$route.query.id
          let dataTwo=routerid>0?this.$store.state.customize.dataTwo:this.$store.state.customize.dataTwoNew
          for(let i=0;i<dataTwo.scheme_arr.length;i++){
            this.$set(dataTwo.scheme_arr[i],'checked',false)
            if(dataTwo.scheme_arr[i].ID===dataTwo.scheme_attr.sch_id){
              this.$set(dataTwo.scheme_arr[i],'checked',true)
              this.scheme_Arr=dataTwo.scheme_arr[i].ID
              if(routerid>0){
                this.$store.state.customize.scheme_data= dataTwo.scheme_data
              }else{
                this.$store.state.customize.scheme_dataNew = dataTwo.scheme_data
              }
            }
          }
          if(!dataTwo||!dataTwo.basic_info){
             this.$message({
                message:'界面加载异常,请回到上层重新操作!',
                type: "error"
              });
            return;
          }
          this.activityName=dataTwo.basic_info.acti_name;
          
          this.value1=dataTwo.basic_info.acti_date;
          this.Mitemdata.valuedata=dataTwo.acti_scope.apply_shop?JSON.stringify(dataTwo.acti_scope.apply_shop):'';  //参与店铺赋值
          this.unLineMitemdata.valuedata=dataTwo.acti_scope.apply_store?JSON.stringify(dataTwo.acti_scope.apply_store):'';  //适用门店赋值
          this.Mitemdata1.valuedata=dataTwo.acti_scope.apply_warehouse?JSON.stringify(dataTwo.acti_scope.apply_warehouse):''; //参与仓库赋值
          this.orderType = dataTwo.scheme_attr.order_type;  //单据状态赋值
          this.timeType = String(dataTwo.scheme_attr.time_type);  //时间类型赋值
          this.Mitemdata3.valuedata=dataTwo.acti_scope.exclude_province?JSON.stringify(dataTwo.acti_scope.exclude_province):''; //排除省赋值
          this.MyselectVIP.value=dataTwo.acti_scope.members_only
          this.Mitemdata2.readonly=this.MyselectVIP.value===1?true:false;

          this.Mitemdata2.pid = dataTwo.acti_scope.members_level.VIP_TYPE_ID?dataTwo.acti_scope.members_level.VIP_TYPE_ID:'' //VIP
          this.Mitemdata2.valuedata = dataTwo.acti_scope.members_level.VIP_TYPE_ENAME 
           
          let w=[];
          if(dataTwo.basic_info.freq_type===1){
            this.maxInputData.type=1
            let week = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
            for(let i of dataTwo.basic_info.freq_value){
              w.push(week[i-1])
            }
            if(w.length===week.length){
              this.activities= `每天`
            }else{
              this.activities= `每${w.join('、')}${dataTwo.basic_info.freq_start}至${dataTwo.basic_info.freq_end}`
            }
          }else{
            this.maxInputData.type=2
            if(dataTwo.basic_info.freq_value&&dataTwo.basic_info.freq_value.length===31){
              this.activities= `每天`
            }else{
              this.activities= `每${dataTwo.basic_info.freq_value?dataTwo.basic_info.freq_value.join('、'):''}日${dataTwo.basic_info.freq_start}至${dataTwo.basic_info.freq_end}`
            }
          }
          this.initialData ={
            week:dataTwo.basic_info.freq_type===2?[]:w,
            type:dataTwo.basic_info.freq_type,
            day:dataTwo.basic_info.freq_type===2?dataTwo.basic_info.freq_value:[],
            weekIndex:dataTwo.basic_info.freq_type===2?[]:dataTwo.basic_info.freq_value,
            Time:{
              startDate:dataTwo.basic_info.freq_start,
              endDate:dataTwo.basic_info.freq_end
            }
          }
          this.combInValue.value1 = dataTwo.scheme_attr.is_other_pro
          this.combInValue.value2 = dataTwo.scheme_attr.is_store_act
          this.combInValue.value3 = dataTwo.scheme_attr.is_vip_discount
          this.combInValue.value4 = dataTwo.scheme_attr.exchange_conditions
          this.combInValue.value5 = dataTwo.scheme_attr.max_times
        }else{
          let routerid = this.$route.query.id
          let dataTwo=routerid>0?this.$store.state.customize.dataTwo:this.$store.state.customize.dataTwoNew
          dataTwo.basic_info.freq_type = 1;
          dataTwo.basic_info.freq_value = [1, 2, 3, 4, 5, 6, 7];
          this.initialData ={
            week:['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
            type:dataTwo.basic_info.freq_type,
            day:[],
            weekIndex:dataTwo.basic_info.freq_value,
            Time:{
              startDate:"00:00",
              endDate:"23:59"
            }
          }
          this.activities= `每天`
        }
      },
      tSaveNoEdit(){
        if(this.Objid>0){
          let routerid = this.$route.query.id
          let dataTwo = this.schemeOne;
          for(let i=0;i<dataTwo.scheme_arr.length;i++){
            this.$set(dataTwo.scheme_arr[i],'checked',false)
            if(dataTwo.scheme_arr[i].ID===dataTwo.scheme_attr.sch_id){
              this.$set(dataTwo.scheme_arr[i],'checked',true)
              this.scheme_Arr=dataTwo.scheme_arr[i].ID
            }
          }
          this.activityName=dataTwo.basic_info.acti_name;
          this.value1=dataTwo.basic_info.acti_date;
          this.Mitemdata.valuedata=dataTwo.acti_scope.apply_shop?JSON.stringify(dataTwo.acti_scope.apply_shop):'';  //参与店铺赋值
          this.unLineMitemdata.valuedata=dataTwo.acti_scope.apply_store?JSON.stringify(dataTwo.acti_scope.apply_store):'';  //适用门店赋值
          this.Mitemdata1.valuedata=dataTwo.acti_scope.apply_warehouse?JSON.stringify(dataTwo.acti_scope.apply_warehouse):''; //参与仓库赋值
          this.orderType = dataTwo.scheme_attr.order_type;  //单据状态赋值
          this.timeType = String(dataTwo.scheme_attr.time_type);  //时间类型赋值
          this.Mitemdata3.valuedata=dataTwo.acti_scope.exclude_province?JSON.stringify(dataTwo.acti_scope.exclude_province):''; //排除省赋值
          this.MyselectVIP.value=dataTwo.acti_scope.members_only
          this.Mitemdata2.readonly=this.MyselectVIP.value===1?true:false;
          this.Mitemdata2.pid = dataTwo.acti_scope.members_level.VIP_TYPE_ID?dataTwo.acti_scope.members_level.VIP_TYPE_ID:'' //VIP
          this.Mitemdata2.valuedata = dataTwo.acti_scope.members_level.VIP_TYPE_ENAME 
          let w=[];
          if(dataTwo.basic_info.freq_type===1){
            this.maxInputData.type=1
            let week = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
            for(let i of dataTwo.basic_info.freq_value){
              w.push(week[i-1])
            }
            if(w.length===week.length){
              this.activities= `每天`
            }else{
              this.activities= `每${w.join('、')}${dataTwo.basic_info.freq_start}至${dataTwo.basic_info.freq_end}`
            }
          }else{
            this.maxInputData.type=2
            if(dataTwo.basic_info.freq_value&&dataTwo.basic_info.freq_value.length===31){
              this.activities= `每天`
            }else{
              this.activities= `每${dataTwo.basic_info.freq_value?dataTwo.basic_info.freq_value.join('、'):''}日${dataTwo.basic_info.freq_start}至${dataTwo.basic_info.freq_end}`
            }
          }
          this.initialData ={
            week:dataTwo.basic_info.freq_type===2?[]:w,
            type:dataTwo.basic_info.freq_type,
            day:dataTwo.basic_info.freq_type===2?dataTwo.basic_info.freq_value:[],
            weekIndex:dataTwo.basic_info.freq_type===2?[]:dataTwo.basic_info.freq_value,
            Time:{
              startDate:dataTwo.basic_info.freq_start,
              endDate:dataTwo.basic_info.freq_end
            }
          }
          this.combInValue.value1 = dataTwo.scheme_attr.is_other_pro
          this.combInValue.value2 = dataTwo.scheme_attr.is_store_act
          this.combInValue.value3 = dataTwo.scheme_attr.is_vip_discount
          this.combInValue.value4 = dataTwo.scheme_attr.exchange_conditions
          this.combInValue.value5 = dataTwo.scheme_attr.max_times
        }
      },
      //是否显示折上折或者商品活动
      isShow1(){
        let routerid = this.$route.query.id
        let sw = "";
        try{
           sw = routerid>0?this.$store.state.customize.dataTwo.scheme_arr[0].scheme_struct.program_code:this.$store.state.customize.dataTwoNew.scheme_arr[0].scheme_struct.program_code
        }catch(e){}
        let t = true
        if(sw === "PA"){
          t = false
        }
        return t
      },
      isShow2(){
        let routerid = this.$route.query.id
        let sw = "";
        try{
           sw = routerid>0?this.$store.state.customize.dataTwo.scheme_arr[0].scheme_struct:this.$store.state.customize.dataTwoNew.scheme_arr[0].scheme_struct
        }catch(e){}
        let t = false
        // if(sw.promotionType_code === "GA14"){
        //   t = true
        // }
        return t
      },
      // 清空按钮功能
      allDel(){
        let cv = this.combInValue
        let routerid = this.$route.query.id
        let sd = routerid>0?this.$store.state.customize.scheme_data:this.$store.state.customize.scheme_dataNew
        cv.value1 = "Y"
        cv.value2 = "Y"
        cv.value3 = "N"
        cv.value4 = 1
        cv.value5 = "-1"
        sd.content=1
        let a = JSON.stringify(this.$store.state.customize.jordanStore.scheme_dataInit);
        this.$store.commit('customize/clearType' , JSON.parse(a));
        this.combineInit= false
        this.$nextTick(() => {
            this.combineInit= true
        });
        let val = this.tyep_current;
        for(let [index , k] of Object.entries(JSON.parse(a))){
          this.$set( k,'checked',false)
          if(Number(index)===val){
            this.$set(k , "checked" , true)
            this.amend=true;
            let obj={
              scheme_struct:k.scheme_struct,
              id:routerid
            }
            this.$store.commit("customize/switchDetail" , obj)
          }
        }
        for(let [index , k] of Object.entries(this.$store.state.customize.jordanStore.scheme_dataInit)){
          this.$set( k,'checked',false)
          if(Number(index)===val){
            this.$set(k , "checked" , true)
          }
        }

        for(let i = 0; i < sd.rules.length; i++){
          sd.rules[i].skuIds="";
          sd.rules[i].conditionName="QTTY";
          sd.rules[i].conditionType="GE";
          sd.rules[i].conditionValue="";
          sd.rules[i].preConditionName="DISCOUNT";
          sd.rules[i].preConditionType="GE";
          sd.rules[i].preConditionValue=0;
          sd.rules[i].prizeItem="";
          sd.rules[i].prizeNum=1;
          sd.rules[i].content=1;
        }
      },
      //显示隐藏翻倍模块
      showDouble(){
        let routerid = this.$route.query.id
        let t = routerid>0?this.$store.state.customize.scheme_data.promotionType_code:this.$store.state.customize.scheme_dataNew.promotionType_code
        let sw = true
        switch(t){
          case "GA11":
          case "PA11":
          sw = false
        }
        return sw
      },
      // 切换促销策略
      switchDetail(val){
        this.allDel()
        this.tyep_current = val;
        let routerid = this.$route.query.id
        let scheme_arr = routerid>0?this.$store.state.customize.dataTwo.scheme_arr:this.$store.state.customize.dataTwoNew.scheme_arr;
        if(this.sub===scheme_arr[val].ID) return
        this.sub=scheme_arr[val].ID;
        this.scheme_Arr=scheme_arr[val].ID;
        for(let [index , k] of Object.entries(scheme_arr)){
          this.$set( k,'checked',false)
          this.$store.state.customize.jordanStore.scheme_dataInit[index].checked = false;
          if(Number(index)===val){
            this.$set(k , "checked" , true)
            this.$store.state.customize.jordanStore.scheme_dataInit[index].checked = false;
            this.amend=true;
            let obj={
              scheme_struct:k.scheme_struct,
              id:routerid
            }
            this.$store.commit("customize/switchDetail" , obj)
          }
        }
        for(let [index , k] of Object.entries(this.$store.state.customize.jordanStore.scheme_dataInit)){
          this.$set( k,'checked',false)
          if(Number(index)===val){
            this.$set(k , "checked" , true)
          }
        }
      },
      saveData(val){
        this.maxInputData=val
      },
      save(){     
        if(!this.activityName){
          this.$message({
            message: '请输入活动名称',
            type: 'warning'
          });
          return false
        }
        if(!this.value1){
          this.$message({
            message: '请选择活动日期',
            type: 'warning'
          });
          return false
        }
        if(!this.activities){
          this.$message({
            message: '请选择活动频次',
            type: 'warning'
          });
          return false
        }

        //打折促销保存草稿不能为空的控制
        let routerid = this.$route.query.id
        let rule = routerid>0?this.$store.state.customize.scheme_data:this.$store.state.customize.scheme_dataNew

        // 打折组合策略非空判断
        if(rule.promotionType_code==="GA11"&&rule.detail_code==="GA1104"){
          for(let element of rule.rules){
              if(element.conditionValue===""||
              element.conditionType===""||
              element.conditionName===""||
              element.skuIds===""||
              rule.limits[0].content===""){
                this.$message({
                  message:"请完善商品条件信息",
                  type: "warning"
                })
                return false;
              }
          };
        }
        // 打折自由组合策略非空判断
        if(rule.promotionType_code==="GA11"&&rule.detail_code==="GA1106"){
          for(let i =0;i<=(rule.rules.length-1);i++){
            if(i<rule.proflags && rule.rules[i].skuIds===""){
              this.$message({
                message:"请完善商品条件信息",
                type: "warning"
              })
              return false;
            }else if(i===0&&rule.rules[i].conditionName ===''){
              this.$message({
                message:"请完善商品条件信息",
                type: "warning"
              })
              return false;
            }else if((i%rule.proflags === 0) && (rule.rules[i].conditionType ===''|| 
              rule.rules[i].conditionValue ==='')){
                this.$message({
                  message:"请完善商品条件信息",
                  type: "warning"
                })
                return false;
            }
          }
        }
        // 商品打折非空判断 除组合打折外
        else if(rule.promotionType_code==="GA11"&&rule.detail_code==="GA1103"){
          if(rule.rules[0].skuIds !== '' && rule.rules[0].conditionValue) {
            for(let element of rule.rules){
              if(element.conditionName===""||
              element.conditionType===""||
              element.content===""){
                this.$message({
                  message:"请完善商品条件信息",
                  type: "warning"
                })
                return false;
              }
            };
          } else {
            this.$message({
              message:"请完善商品条件信息",
              type: "warning"
            })
            return false;
          }
        }
        else if (rule.promotionType_code==="GA11"&&rule.detail_code!=="GA1104"&&rule.detail_code!=="GA1106"){
          if(rule.rules[0].skuIds !== '' && rule.rules[0].conditionValue) {
            for(let element of rule.rules){
              if(element.conditionName===""||
                element.conditionType===""||
                element.conditionValue===""||
                element.content===""){
                  this.$message({
                    message:"请完善商品条件信息",
                    type: "warning"
                  })
                  return false;
                }
              else if(element.conditionName===""||
                element.conditionType===""||
                element.conditionValue===""||
                element.content===""){
                this.$message({
                  message:"请完善商品条件信息",
                  type: "warning"
                })
                return false;
              }
            }
          } else {
            this.$message({
              message:"请完善商品条件信息",
              type: "warning"
            })
            return false;
          }
        }
        else if (rule.promotionType_code==="PA11" && rule.detail_code==="PA1103") {
          if(rule.rules[0].conditionName !== "" && rule.rules[0].conditionType !== "" && rule.rules[0].conditionValue !== ""
          && rule.rules[0].preConditionName !== "" &&rule.rules[0].preConditionType !== "" && rule.rules[0].preConditionValue !== "" ) {
            for(let element of rule.rules){
              if(element.content===""){
                this.$message({
                  message:"请完善商品条件信息",
                  type: "warning"
                })
                return false;
              }
            };

          } else {
            this.$message({
                  message:"请完善商品条件信息!",
                  type: "warning"
                })
                return false;
          }

        }
        else if (rule.promotionType_code==="PA11") {
          for(let element of rule.rules){
            if(element.preConditionName===""||
              element.preConditionValue===""||
              element.preConditionType===""||
              element.conditionValue===""||
              element.conditionType===""||
              element.conditionName===""||
              element.content===""){
              this.$message({
                message:"请完善商品条件信息",
                type: "warning"
              })
              return false;
            }
          }
        }
        let Ecode = '';        
        let scheme_arr = routerid>0?this.$store.state.customize.dataTwo.scheme_arr:this.$store.state.customize.dataTwoNew.scheme_arr
        for(let i of scheme_arr){
          if(i.ID===Number(this.scheme_Arr)){
            Ecode = i.ECODE
          }
        }
        //单据类型时间类型非空判断
        if(!this.timeType || this.orderType.length === 0){
          this.$Message.warning('单据类型或时间类型不能为空');
          return;
        }
        let obj={
          "objid": this.$route.query.copy?-1:this.Objid,               //促销活动ID,新增默认-1
          "fixcolumn":{
            //1.基础信息
            "basic_info":{
              "acti_name":this.activityName,         //活动名称
              "acti_date":this.value1,         //活动日期
              "freq_value":this.maxInputData.type===1?
                (this.maxInputData.weekIndex.length===0?this.initialData.weekIndex:this.maxInputData.weekIndex)
                :(this.maxInputData.day.length===0?this.initialData.day:this.maxInputData.day),        //频次值
              "freq_type":this.maxInputData.type,           //频次类型（1=按周，2=按天）
              'freq_start':this.Time.startDate.replace(':',''),
              'freq_end':this.Time.endDate.replace(':',''),
              'sch_type_id':this.schTypeId, //种类ID
            },
            //2.活动范围
            "acti_scope":{
              "apply_store":this.unLineMitemdata.pid?JSON.parse(this.unLineMitemdata.pid):'', //适用门店
              "apply_shop":this.Mitemdata.pid?JSON.parse(this.Mitemdata.pid):'',       //参与店铺
              "apply_warehouse":this.Mitemdata1.pid?JSON.parse(this.Mitemdata1.pid):'',       //参与仓库
              "exclude_province":this.Mitemdata3.pid?JSON.parse(this.Mitemdata3.pid):'',       //排除省
              "members_only":this.MyselectVIP.value?this.MyselectVIP.value:1,      //仅限会员（1=无限制，2=仅限会员）
              "members_level":this.Mitemdata2.pid?this.Mitemdata2.pid.split(','):'',      //会员等级

            },
            //4.方案属性
            "scheme_attr":{
              "sch_id":this.scheme_Arr,                 //选中方案ID
              "sch_ecode":Ecode,       //选中方案编码
              "is_other_pro":this.combInValue.value1,          //是否与其他商品活动同时执行 （Y ：是 N：否）
              "is_store_act":this.combInValue.value2,          //是否与全场活动同时执行    （Y ：是 N：否）
              "is_vip_discount":this.combInValue.value3,       //是否享受VIP折上折        （Y ：是 N：否）
              "exchange_conditions":this.combInValue.value4,   //换购条件                （1:不限，2:仅限同款，3:仅限同吊牌价）
              "gift_conditions":1,       //买赠条件                （1:不限，2:仅限同款，3:仅限同吊牌价）
              "max_times":this.combInValue.value5,             //允许最大翻倍            （-1=无限翻倍）
              'time_type':this.timeType,  //时间类型
              'order_type':this.orderType   //单据类型
            },
            //5.方案内容（商品、条件、优惠值）
            "scheme_data":routerid>0?this.$store.state.customize.scheme_data:this.$store.state.customize.scheme_dataNew
          }
        }
        //判断赠品合计不能为空
        // let flagIs0 = true;
        // let flagIs1 = true;
        // if(!(rule.detail_code==="GA1703" || rule.detail_code==="GA1803")){
        //     obj.fixcolumn.scheme_data.rules.map(item=>{
        //     if(item.discounts.length>=1){
        //       item.discounts.map(n_item=>{
        //         if(n_item.stock === ''|| n_item.stock==0 || !n_item.stock){
        //           flagIs0 = false;
        //         }
        //       })
        //     }
        //     if(item.discounts.length>=1){
        //       item.discounts.map(n_item=>{
        //         if(n_item.prizeNum === ''|| n_item.prizeNum==0 || !n_item.prizeNum){
        //           flagIs1 = false;
        //         }
        //       })
        //     }
        //   })
        // }else {
        //   obj.fixcolumn.scheme_data.limits.map(item=>{
        //     if(!item.stock || item.stock == 0 || item.stock===''){
        //       flagIs0 = false;
        //     }
        //     if(!item.prizeNum || item.prizeNum == 0 || item.prizeNum===''){
        //       flagIs1 = false;
        //     }
        //   })
        // }
        
        // if(!flagIs0){
        //   this.$message.warning("赠品总计不能为空");
        //   return;
        // }
        // if(!flagIs1){
        //   this.$message.warning('赠送件数不能为空');
        //   return;
        // }

        if(rule.promotionType_code === 'GA18' || rule.promotionType_code === 'PA17'){
          if(obj.fixcolumn.scheme_data.rules[0].top_begin === '' || obj.fixcolumn.scheme_data.rules[0].top_end === ''){
            this.$Message.warning('排名不能为空');
            return;
          }
        }
        if(rule.detail_code ==="GA1106"){
          console.log('obj.fixcolumn.scheme_data.rules',obj.fixcolumn.scheme_data.rules)
          obj.fixcolumn.scheme_data.rules.forEach((item,index)=>{
            if(index !== 0){
              obj.fixcolumn.scheme_data.rules[index].conditionName = obj.fixcolumn.scheme_data.rules[0].conditionName
            }
            if(index%rule.proflags !== 0){
              obj.fixcolumn.scheme_data.rules[index].conditionType = obj.fixcolumn.scheme_data.rules[index-(index%rule.proflags)].conditionType
              obj.fixcolumn.scheme_data.rules[index].conditionValue = obj.fixcolumn.scheme_data.rules[index-(index%rule.proflags)].conditionValue
              obj.fixcolumn.scheme_data.rules[index].discounts[0].conditionName = obj.fixcolumn.scheme_data.rules[index-(index%rule.proflags)].discounts[0].conditionName
            }
          })
        }
        console.log('save_scheme_data_obj-----',obj)
        console.log('save_scheme_data_list-----',obj.fixcolumn.scheme_data)

        if(this.Swit){
          this.Swit=false
          this.$emit('showLoading',true);
          this.axios({//保存草稿
            method: 'post',
            url: '/p/cs/cpromactisave',
            data: {
              param:JSON.stringify(obj)
            }
          }).then((res) => {
            this.Swit=true
            if(res.data.code===0){
              this.$route.query.copy=false;
              this.Objid=res.data.data.objid;
              this.$emit('SaveDrafts',{Objid:this.Objid,dataTwo:obj});
              this.$message({
                message: res.data.message,
                type: 'success'
              });
            }else{
              this.$emit('SaveDrafts',{Objid:this.Objid,dataTwo:obj});
            }
            this.$emit('showLoading',false);
          }).catch(() =>{
             this.Swit=true
             this.$emit('showLoading',false);
          });
        }
      },
      returnTime(val){
        this.Time=val
      }
    },
  }
</script>
<style lang="less">
  .procedureTwo_index {
    margin-top: 16px;
    display: flex;
    flex-direction: column;
    height: 100%;
    .com {
      display: flex;
      flex-direction: column;
      border: 1px solid #D8D8D8;
      border-radius: 6px;
      overflow: hidden;
      margin-bottom: 10px;
      flex: 1;
    }
    .M_title {
      font-size: 12px;
      color: #575757;
      background: #F8F7F7;
      font-weight: 400;
      height: 24px;
      line-height: 22px;
      text-align: center;
      border-bottom: 1px solid #D8D8D8;
    }
    .M_table {
      width: 100%;
      min-height: 34px;
      line-height: 26px;
      padding-left: 40px;
      display: flex;
      flex-wrap: wrap;
      border-bottom: 1px solid #DCDCDC;
      li {
        width: 50%;
        font-size: 12px;
        color: #575757;
        display: flex;
        align-items: center;
        input {
          vertical-align: middle;
        }
      }
    }
    .procedureTwo_centen {
      display: flex;
      margin-bottom: 10px;
      justify-content: space-around;
      .CommonStyle {
        width: 50%;
        text-align: center;
        border: 1px solid #D8D8D8;
        border-radius: 6px;
        overflow: hidden;
        margin-top: 10px;
        h1 {
          font-size: 12px;
          color: #575757;
          background: #F8F7F7;
          height: 24px;
          line-height: 22px;
          border-bottom: 1px solid #D8D8D8;
          font-weight: 400;
        }
        .M_ul {
          padding-top: 14px;
          padding-bottom: 2px;
        }
        .M_li {
          height: 30px;
          display: flex;
          flex-wrap: nowrap;
          align-items: center;
          padding-right: 40px;
          padding-bottom: 8px;
          .customization{
            height: 24px;
            line-height: 22px;
            border: 1px solid #D8D8D8;
            border-radius: 2px;
            box-sizing: border-box;
            padding-left: 3px;
            color: #575757;
          }
          label {
            font-size: 12px;
            display: inline-block;
            width: 120px;
            text-align: right;
            color: #575757;
            margin-right: 10px;
            b {
              color: #E80000;
            }
          }
          input {
            width: 100%;
            background: #FCF7F1;
            border: 1px solid #D8D8D8;
            border-radius: 2px;
            font-size: 12px;
          }
          .M_date_clas {
            width: 100% !important;
            background: #FCF7F1;
            input {
              border: none
            }
          }
          .el-input__inner {
            width: 100%;
            height: 24px;
            line-height: 22px;
            border: 1px solid #D8D8D8;
            padding: 3px
          }
        }
        .M_se_input {
          padding-right: 40px;
          padding-bottom: 8px;
          display: flex;
          .timeStyle {
            display: flex;
            width: 100%;
            text-align: left;
            .timeTitle {
              width: 120px;
              line-height: 24px;
              margin-right: 10px;
              text-align: right;
            }
          }
          .VP_C_VIPTYPE_IDS {
            width: 100%;
            .el-input{
              input {
                 height: 24px;
                line-height: 22px;
              }
               
            }
          }
          .input-wrap {
            display: inherit;
            width: 100%;
            flex: auto;
          }
          label.title {
            font-size: 12px;
            display: inline-block;
            width: 120px;
            text-align: right;
            color: #575757;
            margin-right: 10px;
            b {
              color: #E80000;
            }
          }
          input{
            font-size: 12px ;
          }
          .item_four {
            width: 100%;
            display: flex;
            label.title {
              width: 92px;
            }
          }
        }
        .item_three1{
          position: relative;
          width: 100%;
          display: flex;
          .el-autocomplete {
            width: 100%;
            .el-input {
              width: 100%;
            }
          }
          .ff-current-user-box {
            width: 100%;
            input {
              width: 100%;
              line-height: 24px;
            }
            .iconfont {
              border: none;
              height: 15px;
              top: 5px;
              right: 3px;
            }
          }
          .selectcomp {
            width: 100%;
            display: flex;
            flex-wrap: nowrap;
            align-items: center;
            .el-select {
              width: 100%;
              input {
                width: 100%;
                height: 24px;
                line-height: 22px;
              }
            }
            .el-input__inner {
              margin-left: 0;
            }
          }
          .burgeon-select-selection-head span {
            position: absolute;
            width: 100%;
            text-overflow: ellipsis;
          }
          .burgeon-select-dropdown {
            z-index: 100;
          }
        }
        .item_three {
          width: 100%;
          display: flex;
          .el-autocomplete {
            width: 100%;
            .el-input {
              width: 100%;
            }
          }
          .ff-current-user-box {
            width: 100%;
            input {
              width: 100%;
              line-height: 24px;
            }
            .iconfont {
              border: none;
              height: 15px;
              top: 5px;
              right: 3px;
            }
          }
          .selectcomp {
            width: 100%;
            display: flex;
            flex-wrap: nowrap;
            align-items: center;
            .el-select {
              width: 100%;
              input {
                width: 100%;
                height: 24px;
                line-height: 22px;
              }
            }
            .el-input__inner {
              margin-left: 0;
            }
          }
        }
      }
      .proc_c_left {
        margin-right: 15px;
      }
      .proc_c_right {
        margin-left: 15px;
        .M_li {
          label.title {
            padding-right: 5px;
            box-sizing: border-box;
            margin-right: 9px;
          }
          input {
            width: 100%;
            background: #fff;
            border: 1px solid #bfcbd9;
            border-radius: 2px;
            font-size: 12px;
          }
        }
      }
    }
  }
  .FullReduction_1 {
    //height: 400px;
    display: flex;
    flex-direction: column;
    border-radius: 6px;
    overflow: hidden;
    margin-bottom: 10px;
    flex: 1;
    .tableList {
      display: flex;
      flex-direction: column;
      flex: 1;
      .shopgoods {
        flex: 1;
        display: flex;
        align-items: center;
        font-size: 12px;
        .shopgoods_centen {
          display: flex;
        }
        .item-input {
          width: auto;
        }
        .obj-input {
          // width: 238px !important;
          margin: 0;
        }
        input {
          background: #fcf7f1;
          font-size: 12px;
        }
        .meanwhile {
          margin-left: 20px;
          display: flex;
          .meanwhile_centen {
            margin-left: 5px;
            li {
              margin-bottom: 5px;
            }
          }
          input {
            width: 60px;
            height: 24px;
            border-radius: 2px;
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
            border: 1px solid rgba(216, 216, 216, 1);
            padding-left: 3px;
          }
        }
        .el-select {
          input {
            width: 80px;
            height: 24px;
            line-height: 24px;
            padding: 0 3px;
          }
        }
      }
      .double {
        font-size: 12px;
        color: #575757;
        margin-bottom: 10px;
        padding: 0 40px;
        input {
          width: 80px;
          height: 24px;
          background: rgba(255, 255, 255, 1);
          border-radius: 2px;
          border: 1px solid rgba(216, 216, 216, 1);
          box-sizing: border-box;
          text-align: center;
        }
      }
    }

    .condition {
      width: 100%;
      // sq2018年9月28修改 注释了一下代码,使高度不固定
      //height: 34px;
      line-height: 34px;
      display: flex;
      flex-wrap: nowrap;
      align-items: center;
      table {
        display: flex;
        // justify-content: center;
        flex: 1;
        padding-left: 18px;
        td {
          // width: 100%;
          font-size: 12px;
          color: #575757;
          padding: 0 0 0 20px;
        }
      }
      .el-select {
        input {
          width: 80px;
          height: 24px;
          padding: 0 3px;
          font-size: 12px;
        }
      }
      button {
        height: 24px;
        line-height: 22px;
        width: auto;
        margin-right: 8px;
        margin-left: 0px;
        padding: 0 8px;
        background: #fff;
        color: #fd6442;
        border: 1px solid #fd6442;
        border-radius: 2px;
        font-size: 12px;
        box-sizing: border-box;
      }
    }

    .all-promotion {
      .propdis1,
      .propdis2,
      .propdis3,
      .propdis4,
      .propdis5,
      .propdis6 {
        .obj-input {
          // width: 238px !important;
          margin: 0;
        }
        input {
          background: #fcf7f1;
          font-size: 12px;
        }
      }
    }

    .all-promotion {
      display: flex;
      flex: 1;
      align-items: center;

    }
  }
</style>

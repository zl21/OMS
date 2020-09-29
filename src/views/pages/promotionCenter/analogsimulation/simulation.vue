<!--  一商模拟仿真   -->
<template>
  <div class="simulation">
    <div class="operation_btn">
      <button
        class="btn"
        @click="cancel_simulation"
      >
        取消
      </button>
      <button
        class="btn"
        @click="execute_simulation"
      >
        仿真试算
      </button>
    </div>
    <div class="content">
      <div class="orderSet">
        <div class="header_title">
          <i class="header_name">模拟订单设置</i>
        </div>
        <div class="formList">
          <div class="row storeName">
            <my-input
              :is-active="basicData.stores.isActive"
              :is-disabled="basicData.stores.isdisabled"
              :itemdata="basicData.stores.itemdata"
            />
          </div>
          <div class="row">
            <div class="form_label">
              <i class="red">*</i>时间类型：
            </div>
            <div class="form_content">
              <SingleBox
                :value="basicData.time_type"
                :options="groups.timeTypes"
                @changeSingle="checkTimeTypeChange"
              />
              <div class="form_item">
                <i class="red">*</i>时间范围：
                <DatePicker
                  v-model="basicData.time_limit"
                  format="yyyy/MM/dd HH:mm:ss"
                  type="datetime"
                  placeholder=""
                  style="width: 200px"
                  @on-change="handleTimeLimitChange"
                />
              </div>
            </div>
          </div>
          <div class="row">
            <div class="form_label">
              <i class="red">*</i>订单类型：
            </div>
            <div class="form_content">
              <SingleBox
                :value="basicData.order_list"
                :options="groups.orderTypes"
                @changeSingle="checkOrderTypeChange"
              />
            </div>
          </div>
          <div class="row">
            <div class="form_label">
              <i class="red" />平台标记：
            </div>
            <div class="form_content">
              <SingleBox
                :value="basicData.platform_mark"
                :options="groups.platformTabs"
                @changeSingle="checkPlatformChange"
              />
            </div>
          </div>
          <div class="row">
            <div class="form_label">
              <i class="red" />购买排名：
            </div>
            <div class="form_content">
              <div class="form_el_input">
                <input
                  v-model="basicData.buy_ranking"
                  placeholder
                  @keyup="basicData.buy_ranking = basicData.buy_ranking.length === 1 ? basicData.buy_ranking.replace(/[^1-9]/g, '') : basicData.buy_ranking.replace(/\D/g, '')"
                >
              </div>
            </div>
          </div>
          <div class="row">
            <div class="form_label">
              <i class="red" />卖家备注：
            </div>
            <div class="form_content">
              <div class="form_el_input">
                <input
                  v-model="basicData.vendor_remark"
                  placeholder
                >
              </div>
            </div>
          </div>
          <div class="row">
            <div class="form_label">
              <i class="red" />买家留言：
            </div>
            <div class="form_content">
              <div class="form_el_input">
                <input
                  v-model="basicData.buyer_message"
                  placeholder
                >
              </div>
            </div>
          </div>
          <div class="row storeName">
            <my-input
              :is-active="basicData.receiving_porvince.isActive"
              :is-disabled="basicData.receiving_porvince.isdisabled"
              :itemdata="basicData.receiving_porvince.itemdata"
            />
          </div>
        </div>
        <div class="products_list">
          <div class="header_title">
            <i class="header_name">商品列表</i>
          </div>
          <!-- <div class="button_list">
                    <button class="btn add" @click="add_prolist">新增</button>
                    <button class="btn lead">导入</button>
                </div> -->
          <detailtable
            :t-columns="products_columns"
            :itemdata="itemdata"
            :is-object="itemdata.isObject"
            :t-data="productslistView.data"
            :total="productslistView.total"
            :current="productslistView.current"
            :page-size="productslistView.pageSize"
            @deleteRowData="del_prolist"
            @on-page-change="pageChange"
            @on-page-size-change="onPageSizeChange"
            @alertRowData="alertRowData"
          >
            <div
              slot="action"
              class="button_list"
            >
              <ButtonFkDialog
                :itemdata="itemdataFk"
                @getFkChooseItem="getButtonFkChoose"
              />
              <button
                class="btn"
                @click="add_prolist"
              >
                新增
              </button>
              <button class="btn">
                导入
              </button>
            </div>
          </detailtable>
        </div>
      </div>
      <div class="execute_result">
        <div class="header_title">
          <i class="header_name">试算执行结果</i>
        </div>
        <div class="table">
          <Table
            :columns="result_columns"
            :data="result_data"
            :tree-props="treePropsData"
            :col-row-method="mergeCells"
            border
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import myInput from 'framework/components/element/input';
  import axios from 'axios';
  import detailtable from '../details/table';
  import MultipleBox from '../components/multipleBox';
  import SingleBox from '../components/singleBox';
  import ButtonFkDialog from '../components/buttonFkDialog';
  import tabList from '@/assets/js/promotion/columns.js';

  export default {
    data() {
      return {
        basicData: {
          time_limit: '', // 时间范围
          time_type: '1', // 时间类型
          order_list: '1', // 订单类型
          platform_mark: '', // 平台标记
          buy_ranking: '', // 购买排名
          vendor_remark: '', // 卖家备注
          buyer_message: '', // 买家留言
          receiving_porvince: {
            isActive: true,
            isdisabled: false,
            itemdata: {
              col: 1,
              colid: 167814,
              colname: 'RECEIVER_PROVINCE',
              datelimit: 'all',
              display: 'text',
              fkdesc: '收货省份',
              fkdisplay: 'drp',
              inputname: 'CP_C_STORE_IDS:ENAME',
              isfk: true,
              isnotnull: true,
              isuppercase: false,
              length: 65535,
              name: '收货省份',
              readonly: false,
              reftable: 'CP_C_PROVINCE',
              reftableid: 10010,
              row: 1,
              statsize: -1,
              type: 'STRING',
              valuedata: '',
            }
          }, // 收货省份
          stores: {
            isActive: true,
            isdisabled: false,
            itemdata: {
              col: 1,
              colid: 1700805184,
              colname: 'CP_C_SHOP_ID',
              datelimit: 'all',
              display: 'text',
              fkdesc: '店铺',
              fkdisplay: 'drp',
              inputname: 'CP_C_SHOP:ENAME',
              isfk: true,
              isnotnull: true,
              isuppercase: false,
              length: 20,
              name: '店铺名称',
              readonly: false,
              refobjid: '',
              reftable: 'CP_C_SHOP',
              reftableid: 23446,
              row: 1,
              statsize: -1,
              type: 'STRING',
              valuedata: ''
            }
          }, // 店铺名称
        },
        itemdata: {// 平台商品
          col: 1,
          colid: 1700806533,
          colname: `SG_B_CHANNEL_PRODUCT_ID${Math.floor(Math.random() * 100)}`,
          datelimit: 'all',
          display: 'text',
          fkdesc: '门店档案',
          fkdisplay: 'drp',
          inputname: 'SG_B_CHANNEL_PRODUCT_ID:ECODE',
          isfk: true,
          isnotnull: false,
          isuppercase: true,
          length: 65535,
          name: '',
          readonly: false,
          reftable: 'SG_B_CHANNEL_PRODUCT',
          reftableid: 24801,
          row: 1,
          statsize: -1,
          type: 'STRING',
          valuedata: '',
          isObject: true,
          isSimulation: true,
          isGetValue: true
        },
        products_columns: tabList.products_columns,
        result_columns: tabList.result_columns,
        result_data: [], // 试算执行结果列表
        treePropsData: { children: 'productList' },
        products_data: [], // 商品列表
        currentTab: 0, // 当前选中
        productslistView: {
          current: 1,
          total: 0,
          pageSize: 10
        },
        productsArrsView: []
      };
    },
    props: [],
    components: {
      myInput,
      detailtable,
      MultipleBox,
      SingleBox,
      ButtonFkDialog
    },
    computed: {
      groups() {
        return this.$store.state.customize.forginkeys.groups;
      },
      itemdataFk() {
        try {
          const rs = this.itemdata;
          const itemdata = JSON.parse(JSON.stringify(rs));
          itemdata.isOneData = false;
          itemdata.fkdisplay = 'mop';
          itemdata.isObject = true;
          return itemdata;
        } catch (e) {}
      },
    },
    watch: {
      basicData: {
        handler(val, old) {
          this.result_data = [];
        },
        deep: true
      },
      products_data: {
        handler(val, old) {
          this.result_data = [];
        },
        deep: true
      }
    },
    methods: {
      handleTimeLimitChange(val) {
        this.basicData.time_limit = val;
      },
      mergeCells() {

      },
      checkTimeTypeChange(val) {
        this.basicData.time_type = val;
      },
      checkOrderTypeChange(val) {
        this.basicData.order_list = val;
      },
      checkPlatformChange(val) {
        this.basicData.platform_mark = val;
      },
      add_prolist(objRow) {
        const obj = {};
        this.products_columns.forEach((col) => {
          if (col.key == 'NUM' && !obj[col.key]) {
            obj[col.key] = 1;
          } else {
            obj[col.key] = objRow.ECODE ? objRow[col.key] : '';
          }
        });
        // if(objRow.PRO_ECODE && objRow.SG_PRO_ID){
        //     obj.PRO_ECODE = objRow.PRO_ECODE
        //     obj.SG_PRO_ID = objRow.SG_PRO_ID
        // }
        // obj.itemdata =  JSON.parse(JSON.stringify(this.itemdata));
        // if(objRow){
        //     obj.itemdata.pid = objRow.ID;
        //     obj.itemdata.valuedata  = objRow.ECODE;
        // }
        // obj.itemdata.colname = obj.itemdata.colname + Math.floor(Math.random()*1000000);
        this.products_data.push(obj);
        this.countTablelistView();
      },
      del_prolist(row, currentPage, pageSize) {
        const rowCount = (currentPage - 1) * pageSize;
        const index = rowCount + row._index;
        this.products_data.splice(index, 1);
        console.log('this.products_data', JSON.stringify(this.products_data));
        this.countTablelistView();
      },
      /**
       * 切换非tab页面的表格的页数
       */
      pageChange(val) {
        this.productslistView.current = val;
        this.tablelistView(this.products_data, this.productslistView);
      },
      /**
       * 切换非tab页面的表格的页长度
       */
      onPageSizeChange(val) {
        this.productslistView.pageSize = val;
        this.tablelistView(this.products_data, this.productslistView);
      },
      /**
       * 单表格添加和删除 灵活展示表格
       */
      countTablelistView() {
        const rows = this.products_data || [];
        const obj = this.productslistView;
        const pageSize = obj.pageSize || 10;
        const pagesLen = Math.ceil(rows.length / pageSize);
        if (obj.current > pagesLen) obj.current = pagesLen;
        if (pagesLen === 0) obj.current = 1;
        this.tablelistView(rows, this.productslistView);
      },
      /**
       * 根据当前页和当前页数目 ，展示表格
       * @row 原始表格数据
       * @obj 表格虚拟视图
       */
      tablelistView(rows, obj) {
        const current = obj.current || 1;
        const pageSize = obj.pageSize || 10;
        const start = Number((current - 1) * pageSize);
        const end = Number(current * pageSize);
        obj.total = rows.length;
        obj.data = rows.slice(start, end);
      },
      async getButtonFkChoose() {
        const rs = this.itemdataFk || {};
        let namelist = JSON.parse(rs.pid).nameList;
        if (rs.isGetValue) {
          namelist = await this.isGetIndexValue(rs.reftable, namelist);
        }
        namelist.forEach((obj) => {
          const row = {};
          if (rs.reftable === 'SG_B_CHANNEL_PRODUCT') {
            row.ECODE = obj.PS_C_SKU_ECODE || '';
            row.ENAME = obj.PS_C_PRO_ENAME || '';
            row.SUM = Number(obj.PRICE) || '';
            row.SKU_ID = obj.SKU_ID || '';
            row.ID = obj.ID;
            row.NUM = 1;
            row.PRO_ECODE = obj.PS_C_PRO_ECODE;
            row.SG_PRO_ID = obj.NUMIID;
            row.ALLSUM = Number(row.SUM * row.NUM).toFixed(2);
          }
          this.add_prolist(row);
        });
      },
      isGetIndexValue(reftable, nameList) {
        const arr = [];
        console.log('nameList++++++', nameList);
        const simParam = new URLSearchParams();
        nameList.forEach((item, index) => {
          arr.push(item.ID);
        });
        const params = {
          table: reftable,
          ids: arr
        };
        simParam.append('param', JSON.stringify(params));
        return new Promise((resolve) => {
          axios({// 根据id获取表格其他数据
            method: 'post',
            url: '/p/cs/pm/v1/selectProInfo',
            data: simParam
          }).then((res) => {
            if (res.data.code === 0) {
              console.log('res.data.data', res.data.data);
              resolve(res.data.data);
            } else {
              this.$message({
                type: 'error',
                message: res.data.message
              });
            }
          });
        });
      },
      cancel_simulation() {
        this.$destroy(true);
        this.$store.commit('customize/TabClose', {
          id: 31460113, // id
          type: 'CUSTOMIZED', // 类型action
          name: 'PROMACTIQUERYLIST', // 文件名
          label: '促销活动', // tab中文名 
          query: Object.assign({
            id: 31460113
          }) // 带的参数
        });
      },
      execute_simulation() {
        const self = this;
        const checkSimulation = this.checkSimulation();
        if (checkSimulation.code == '-1') {
          self.$message({
            message: checkSimulation.message,
            type: 'warning'
          });
          return;
        }
        const params = {
          basicData: this.basicData,
          products_data: this.products_data
        };
        const simParam = new URLSearchParams();
        simParam.append('param', JSON.stringify(params));
        axios({// 仿真试算
          method: 'post',
          url: '/p/cs/pm/v1/testPm',
          data: simParam
        }).then((res) => {
          if (res.data.code === 0) {
            console.log('res.data.data', res.data.data);
            self.result_data = res.data.data.result;
            self.result_columns = res.data.data.cloumns;
            self.$message({
              type: 'success',
              message: '试算成功！'
            });
          } else {
            self.result_data = [];
            self.$message({
              type: 'error',
              message: res.data.message
            });
          }
        });
      },
      initData() { // 初始化数据
        try {
          const groups = this.groups;
          this.basicData.time_type = groups.timeTypes.find(item => item.value == 2).value;
          this.basicData.order_list = groups.orderTypes.find(item => item.value == 1).value;
          // this.basicData.platform_mark = groups.platformTabs.find((item)=>{
          //     return item.title == '手机';
          // }).value;
          this.basicData.receiving_porvince.itemdata.valuedata = '';
          this.basicData.receiving_porvince.itemdata.pid = '';
          this.basicData.stores.itemdata.valuedata = '';
          this.basicData.stores.itemdata.pid = '';
          this.basicData.time_limit = '';// 时间范围
          this.basicData.buy_ranking = ''; // 购买排名
          this.basicData.vendor_remark = '';// 卖家备注
          this.basicData.buyer_message = ''; // 买家留言
          this.products_data = [];
        } catch (e) {
          console.log(e.stack);
        }
      },
      checkSimulation() {
        if (!this.basicData.stores.itemdata.pid) {
          return { code: '-1', message: '店铺信息未填写' };
        }
        if (this.basicData.time_type === '') {
          return { code: '-1', message: '时间类型未填写' };
        }
        if (this.basicData.time_limit === '') {
          return { code: '-1', message: '时间范围未填写' };
        }
        if (this.basicData.order_list === '') {
          return { code: '-1', message: '订单类型未填写' };
        }
        // if(this.basicData.platform_mark === ""){
        //     return {code:"-1",message:"平台标记未填写"}
        // }
        if (!this.basicData.receiving_porvince.itemdata.pid) {
          return { code: '-1', message: '收货省份未填写' };
        }
        if (this.products_data.length == 0) {
          return { code: '-1', message: '商品列表数据不能为空' };
        }
        for (let i = 0; i < this.products_data.length; i++) {
          const row = this.products_data[i];
          for (const j in row) {
            const notnull = ['ECODE', 'ENAME', 'NUM', 'SUM'];
            if (notnull.includes(j) && row[j] === '') {
              return { code: -1, message: `商品列表第${i + 1}行数据未填写完毕` };
            }
          }
        }


        return { code: 0, message: '校验完成' };
      },
      /**
       *  修改行数据
       */
      alertRowData(row, currentPage, pageSize, force) {
        const rowCount = (currentPage - 1) * pageSize;
        const index = rowCount + row._index;
        this.deleteProperty(row);
        this.products_data.splice(index, 1, row);
        if (force) this.countTablelistView();
      },
      /**
       * 删除多余属性
       */
      deleteProperty(row) {
        delete row._index;
        delete row.colspan;
        delete row._rowKey;
      },
    },
    created() {
      this.initData();
    },
    mounted() {
    },
  };
</script>
<style lang="less">
@import "../less/common.less";
@lineHeight: 24px;
@inputWidth: 410px;
@fontSize: 12px;
@baseColor: #0068b7;
@bgColr:#fff6f6;
@bgColor:#fff;
.simulation{
    height: 100%;
    position:relative;
    padding-top:70px;
    .operation_btn{
        position: absolute;
        top:10px;
        text-align: left;
        background:@bgColr;
        padding:10px 20px;
        width:100%;
        box-sizing: border-box;
        z-index:101;
        border:1px solid #ffdcdc;
        .btn {
            font-size: 12px;
            color:@baseColor;
            border:1px solid @baseColor;
            padding:0px 8px;
            border-radius:2px;
            height:24px;
            line-height: 24px;
            background:@bgColor;
        }
    }
    .content{
        height: 100%;
        overflow: scroll;
         .orderSet{
            border:1px solid #BEBEBE;
            padding:10px;
            margin:20px 0 20px;
            position:relative;
            .header_title{
                display:inline-block;
                position:absolute;
                top:-9px;
                left:12px;
                .header_name{
                    font-size: 18px;
                    font-style: normal;
                    padding:0 5px;
                    background:#fff;
                }
            }
        }
        .formList{
            width:80%;
            .row{
            margin: 20px 0px;
            .form_label {
                text-align: right;
                display: inline-block;
                font-size: 12px;
                width: 90px;
                height: 100%;
                line-height: 28px;
                padding: 0;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                text-align: center;
            }
            .form_content {
                min-height: 24px;
                line-height: @lineHeight;
                display: inline-block;
                vertical-align: top;
                width: calc(100% - 94px);
                .form_item{
                    display: inline;
                }
                .form_el_input {
                    width: @inputWidth;
                    height: 100%;
                    input {
                    width: 100%;
                    height: 24px;
                    padding: 0 5px;
                    border-radius: 2px;
                    border: 1px solid #dcdfe6;
                    margin:2px 0;
                    box-sizing: border-box;
                    }
                }
                .burgeon-input{
                    box-sizing: border-box;
                }
                .burgeon-radio-wrapper{
                    padding:5px 0;
                }
                }
            }
            .storeName{
                width:500px;
                .el-autocomplete{
                    width:100%;
                    height:100%;
                    .el-input{
                    width:100%;
                    height:100%;
                    input{
                        font-size: 12px;
                        width:100%;
                        height:calc(100% - 1px);
                        background:#fff;
                        color:#2c3e50;
                    }
                    }
                }
                .item-input{
                    line-height: 25px;
                    height:25px;
                }
                .item-input label.title{
                    width:90px;
                    text-align: center;
                }
            .item-input label i{
                font-size: 12px;
                top:0;
                right:0;
            }

            }
            .timeScope{
                padding-left: 74px;
                position:relative;
                box-sizing: border-box;
                .query_titile{
                    font-size: 12px;
                    width: 60px;
                    display: inline-block;
                    font-style: normal;
                    text-align: right;
                    padding-right: 6px;
                    line-height: 34px;
                    position: absolute;
                    left:8px;
                }
                input{
                    height:100%;
                }
                .el-input__suffix{
                    .el-input__icon{
                        top:10px;
                    }
                }
            }
        }
        .products_list{
            border:1px solid #BEBEBE;
            width:90%;
            margin-left:30px;
            padding:20px;
            box-sizing: border-box;
            position:relative;
            table tr td .item-input .input-wrap .input-inner p.mop{
                right:16px;
            }
            .header_title{
                display:inline-block;
                position:absolute;
                top:-7px;
                left:12px;
                .header_name{
                    font-size: 14px;
                    font-style: normal;
                    padding:0 5px;
                    background:#fff;
                }
            }
            .button_list{
                margin-bottom:15px;
                text-align: right;
                .btn{
                    font-size: 12px;
                    color:@baseColor;
                    border:1px solid @baseColor;
                    padding:0px 8px;
                    border-radius:2px;
                    height:24px;
                    line-height: 24px;
                    background:@bgColor;
                }
            }
            .page_content{
                .page-allSizes{
                    line-height: 24px;
                }
            }

            .input-wrap {
                .input-inner {
                    width: 300px;
                    .el-input {
                        width: 300px;
                        font-size: @fontSize;
                        .el-input__inner {
                        font-size: @fontSize;
                        border-radius: 2px;
                        height: @lineHeight;
                        line-height: @lineHeight;
                        padding: 0 5px;
                        }
                    }
                }
            }
            .table-input{
                .el-input {
                    width: 300px;
                    font-size: @fontSize;
                    .el-input__inner {
                        text-align: left;
                        font-size: @fontSize;
                        border-radius: 2px;
                        height: @lineHeight;
                        line-height: @lineHeight;
                        padding: 0 5px;
                    }
                }
            }
        }
        .execute_result{
            border:1px solid #BEBEBE;
            padding:20px;
            margin:20px 0 20px;
            position:relative;
            min-height: 200px;
            .header_title{
                display:inline-block;
                position:absolute;
                top:-9px;
                left:12px;
                .header_name{
                    font-size: 18px;
                    font-style: normal;
                    padding:0 5px;
                    background:#fff;
                }
            }
            .table{
                width:90%;
                margin-left: 30px;
            }
        }
        .red{
        padding: 5px;
        color:red;
        }
        .buttonFk{
            display:inline-block;
            button{
                margin-right:0!important;
            }
        }

    }

}
</style>

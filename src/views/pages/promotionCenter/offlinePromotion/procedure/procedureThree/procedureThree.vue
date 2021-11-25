<template>
  <div class="procedureThree">
    <div class="procedureThree_condition">
      <!-- 门店 -->
      <my-input
        id="my-input"
        :itemdata="changeshop.inputItemdata"
        :disabled="changeshop.isdisabled"
        :is-active="changeshop.isActive"
      />
      <div class="date_input">
        <label><i style="color: #E80000; margin-right:2px;font-size:18px;margin-top:6px;">*</i>日期:</label>
        <el-date-picker
          v-model="datevalue"
          type="datetime"
          format="yyyy-MM-dd HH:mm"
          class="datechangeclass"
          @change="getdate"
        />
      </div>
      <my-input
        id="my-input"
        :itemdata="vipgrade.inputItemdata"
        :disabled="vipgrade.isdisabled"
        :is-active="vipgrade.isActive"
      />
    </div>
    <div class="table_ff_m_box">
      <!-- @childmethods='childmethods' -->
      <m-table
        ref="childtable"
        :obj-list="objList"
        :iddata="iddataval"
        :t-head="tHead"
        :t-body="tBody"
        @spot="spot"
        @cleardatalist="cleardatalist"
        @cleardata="cleardata"
        @deletearray="deletearray"
        @amendChang="amendChange"
      />
    </div>
    <div class="detail">
      <div
        v-loading="detail_left_loadings"
        class="detail_left commodity"
      >
        <label for="">
          促销执行明细:
        </label>
        <ul>
          <li
            v-for="(item,index) in mingxilist.content"
            :key="index"
          >
            {{ item.name }}
            <span v-if="item.type == 2">
              <span
                v-if="mingxilist.length >3"
                :title="mingxilist.item"
              >...</span>
              中的{{ item.qtty }}件商品
            </span>
          </li>
        </ul>
      </div>
      <div
        v-loading="detail_right_loadings"
        class="detail_right commodity"
      >
        <div class="detail_right_title">
          <label for="">
            可选促销列表:
          </label>
          <div>
            <button @click="trialsum">
              试算
            </button>
            <button @click="resetsum">
              重选
            </button>
          </div>
        </div>
        <ul class="checkboxscroll">
          <li
            v-for="(item,index) in checkboxlist"
            :key="index"
            class="checkboxlist"
          >
            <input
              :id="item.checkid"
              type="checkbox"
              class="checkbox"
              :checked="item.is_opti"
              @change="getcheckboxid(item)"
            >
            <span class="text">{{ item.name }}</span>
          </li>
          <!-- <li>2.促销执行明细促销执行明细促销执行明细促销执行明促销执行明细促销执行明细促销执行明细促销执行明细促销执行明细细促销执行明细</li> -->
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  // import { debug } from 'util';
  import mTable from './table';
  import myInput from '../procedureTwo/input';
  import { httpFormdata } from 'framework/__utils__/request.js';

  Array.prototype.remove = function (val) {
    const index = this.indexOf(val);
    if (index > -1) {
      this.splice(index, 1);
    }
  };
  export default {
    data() {
      return {
        // 促销方案列表
        checkboxlist: [],
        // 促销明细列表
        mingxilist: {
          content: [],
          length: '',
          item: [] 
        },
        // 日期value 默认当前时间
        datevalue: this.formatDateTime(new Date().getTime()),
        // 输出日期数据
        changedatevalue: '',
        // 输出选择促销方案id
        idarray: [],
        detail_right_loadings: false,
        detail_left_loadings: false,
        // 表格头部数据
        //   PS_C_PRO_ECODE: "8C1000",//商品编码
        //   AMT_RECEIVABLE: 129, //应售价
        //   PS_C_SKU_ID: 15567042,
        //   PS_c_PRO_ENAME: "男休闲衬衫",
        //   AMT_LIST: 129, //吊牌价
        //   CLR_ENAME: "白色", //颜色
        //   AMT_RETAIL: 129, //零售价
        //   SUM_AMT_RECEIVABLE: 117, //应收金额
        //   QTY: 12, //数量
        //   SIZE_ENAME: "M", //尺寸
        //   DISCOUNT: 1 //折扣
        tHead: [
          {
            label: '商品编码',
            name: 'PS_C_PRO_ECODE'
          },

          {
            label: '商品名称',
            name: 'PS_C_PRO_ENAME'
          },
          {
            label: '颜色',
            name: 'CLR_ENAME'
          },
          {
            label: '尺寸',
            name: 'SIZE_ENAME'
          },
          {
            label: '吊牌价',
            name: 'AMT_LIST',
            isTotal: true
          },
          {
            label: '零售价',
            name: 'AMT_RETAIL',
            isTotal: true
          },
          {
            label: '折扣',
            name: 'DISCOUNT'
          },
          {
            label: '应收价',
            name: 'AMT_RECEIVABLE'
          },
          {
            label: '数量',
            name: 'QTY',
            type: 'input',
            isTotal: true
          },
          {
            label: '应收金额',
            name: 'SUM_AMT_RECEIVABLE',
            isTotal: true
          },
          {
            label: '执行促销',
            name: 'actis'
          },
          {
            label: '',
            name: 'AMT_COST_PF'
          }
        ], // 多货表头
        vipgrade: {
          isActive: true,
          isdisabled: false,
          inputItemdata: {
            col: 1,
            colid: 1700829582,
            colname: 'VP_C_VIPTYPE_IDS',
            datelimit: 'all',
            display: 'text',
            fkdesc: '门店',
            fkdisplay: 'drp',
            inputname: 'VP_C_VIPTYPE_IDS:ENAME',
            isfk: true,
            isnotnull: false,
            isuppercase: false,
            length: 20,
            name: 'VIP',
            readonly: false,
            refobjid: '22660',
            reftable: 'VP_C_VIPTYPE',
            reftableid: 23476,
            row: 1,
            statsize: -1,
            type: 'STRING',
            valuedata: ''
          }
        },
        changeshop: {
          isActive: true,
          isdisabled: false,
          inputItemdata: {
            col: 1,
            colid: 164741,
            colname: 'CP_C_STORE_ID',
            datelimit: 'all',
            display: 'text',
            fkdesc: '参与收货仓',
            fkdisplay: 'drp',
            inputname: 'CP_C_STORE_ID:MIXNAME',
            isfk: true,
            isnotnull: true,
            isuppercase: false,
            length: 20,
            name: '参与收货仓',
            readonly: false,
            refobjid: '',
            reftable: 'CP_C_RSTORE',
            reftableid: 23446,
            row: 1,
            statsize: -1,
            type: 'STRING',
            valuedata: ''
          }
        },
        // 传值给子组件
        iddataval: {},
        tBody: [],
        objList: [
          {
            childs: [
              {
                colname: 'CP_C_ORIG_ID',
                name: '发货店仓',
                valuedata: '',
                pid: ''
              },
              {
                colname: 'CP_C_DEST_ID',
                name: '收货店仓',
                valuedata: '[000001]总部正品仓1',
                pid: '206598865151'
              }
            ]
          }
        ], // 发货店仓和收货店仓(2者取一或同时存在都可)
        UN_PROM_ACTI_IDS: [],
        buyGift: '',
      };
    },
    props: {
      objid: {
        type: Number
      }
    },
    components: {
      myInput,
      mTable
    },
    computed: {

    },
    watch: {
      changeshop: {
        handler(val, oldVal) {
          this.iddataval = val.inputItemdata;
          this.cleardata();
          this.$refs.childtable.emptydata();
        },
        deep: true
      },
      vipgrade: {
        handler(val, oldVal) {
          this.cleardatalist();
        },
        deep: true
      }
    },
    mounted() {
     
    },
    methods: {
      amendChange(val) {
        console.log(val);
      },
      // 清空数据（清空明细）
      cleardata() {
        console.log('清空明细');
        this.mingxilist = [];
        this.checkboxlist = [];
        this.tBody = [];
        this.idarray = [];
      },
      // 点x
      cleardatalist() {
        this.mingxilist = [];
        this.checkboxlist = [];
        this.idarray = [];
      // console.log(this.idarray);
      // console.log("选中数据");
      },
      // 获取日期
      getdate(val) {
        const result = new Date(val).getTime();
        this.datevalue = this.formatDateTime(new Date(val).getTime());
        console.log(this.datevalue);
        this.cleardatalist();
      },
      // 转换日期格式
      formatDateTime(timeStamp) {
        const date = new Date();
        date.setTime(timeStamp);
        const y = date.getFullYear();
        let m = date.getMonth() + 1;
        m = m < 10 ? `0${m}` : m;
        let d = date.getDate();
        d = d < 10 ? `0${d}` : d;
        let h = date.getHours();
        h = h < 10 ? `0${h}` : h;
        let minute = date.getMinutes();
        const second = date.getSeconds();
        minute = minute < 10 ? `0${minute}` : minute;
        // second = second < 10 ? "0" + second : second;
        return `${y}-${m}-${d} ${h}:${minute}`;
      },
      // 获取促销方案id集合
      getcheckboxid(val) {
    
        const self = this;
        if ($(`#${val.checkid}`).is(':checked') == true) {
          self.idarray.push(val.checkid);
        } else {
          self.idarray.remove(val.checkid);
        }
      },
      // 重选
      resetsum() {
        console.log('重选');
        // 取消选择
        $('input:checkbox').each(() => {
          $('input:checkbox').prop('checked', false);
        });
        this.idarray = [];
      },
      // 试算
      trialsum() {
        
        const self = this;
        //  草稿id
        self.detail_right_loadings = false;
        self.detail_left_loadings = false;
        const UN_PROM_ACTI_IDS = [];
        let a = [];
        self.checkboxlist.map((item, index) => {
          a[index] = {
            id: item.checkid,
            ename: item.name
          };
        });
        const PRO_ECODESarr = [];
        this.tBody.map((item, index) => {
          PRO_ECODESarr[index] = {
            ecode: item.PS_C_PRO_ECODE, // 商品编码
            sku: item.PS_C_SKU_ECODE, // sku 值可以为空 但是要有这个key
            lineno: '', // pos端行号标记符   值可以为空 但是要有这个key
            amt_list: item.AMT_LIST, // 吊牌金额
            amt_retail: item.AMT_RETAIL, // 零售金额
            amt_receivable: item.AMT_RETAIL, // 零售金额
            qtty: item.QTY // 数量
          };
        });
        if (self.changeshop.inputItemdata.pid == '') {
          self.$message({
            message: '请选择门店',
            type: 'warning'
          });
        } else if (self.datevalue == '') {
          self.$message({
            message: '请选择日期',
            type: 'warning'
          });
        } else {
          const queryjjson = {
            CP_C_STORE_ID: self.changeshop.inputItemdata.pid, // 门店ID
            PROM_ACTI_ID: this.$store.state.customize.shisuanid, // 当前草稿ID
            PROM_DATE: self.datevalue, // 日期
            VP_C_VIPTYPE_ID: self.vipgrade.inputItemdata.pid, // VIP等级ID
            PRO_ECODES: PRO_ECODESarr,
            PROM_ACTI_IDS: self.idarray,
            ALL_PROM_ACTI_IDS: a,
            flag:0
          };
          // console.log(self.tBody);
          self.tBody.map((item, index) => {
            item.actis = '';
          });
          // console.log(self.tBody);
          // console.log("表格2");
          const params = new URLSearchParams();
          params.append('param', JSON.stringify(queryjjson));
          httpFormdata({
            method: 'post',
            url: '/p/cs/promstrategylisttest',
            data: params
          }).then((res) => {
            self.detail_right_loadings = false;
            self.detail_left_loadings = false;
            if (res.data.code == 0) {
              self.$message({
                message: res.data.message,
                type: 'success'
              });
              const datajson = res.data.data;
              const excute_acti = [];
              // 商品列表
              const ecode_acti = [];
              // 促销明细列表
              const excute_item = [];
              // 促销方案列表
              datajson.excute_acti.map((item, index) => {
                if (item.is_opti == undefined) {
                  item.is_opti = false;
                }
                excute_acti[index] = {
                  checkid: item.id,
                  name: item.ename,
                  is_opti: item.is_opti
                };
              });

              //   PS_C_PRO_ECODE: "8C1000",//商品编码
              //   AMT_RECEIVABLE: 129, //应售价
              //   PS_C_SKU_ID: 15567042,
              //   PS_c_PRO_ENAME: "男休闲衬衫",
              //   AMT_LIST: 129, //吊牌价
              //   CLR_ENAME: "白色", //颜色
              //   AMT_RETAIL: 129, //零售价
              //   SUM_AMT_RECEIVABLE: 117, //应收金额
              //   QTY: 12, //数量
              //   SIZE_ENAME: "M", //尺寸
              //   DISCOUNT: 1 //折扣
              // console.log(self.tBody);
              const newtable = [];
              for (let i = 0; i < datajson.ecode_acti.length; i++) {
                for (let k = 0; k < self.tBody.length; k++) {
                  if (
                    datajson.ecode_acti[i].sku == self.tBody[k].PS_C_SKU_ECODE
                  ) {
                    newtable[i] = {
                      // 应收金额
                      // SUM_AMT_RECEIVABLE: self.tBody[k].SUM_AMT_RECEIVABLE,
                      // AMT_RECEIVABLE: self.tBody[k].AMT_RECEIVABLE,
                      // PS_C_SKU_ID: self.tBody[k].PS_C_SKU_ID,
                      // PS_c_PRO_ENAME: self.tBody[k].PS_c_PRO_ENAME,
                      // AMT_LIST: self.tBody[k].AMT_LIST,
                      // CLR_ENAME: self.tBody[k].CLR_ENAME,
                      // AMT_RETAIL: datajson.ecode_acti[i].AMT_RETAIL,
                      // SUM_AMT_RECEIVABLE: self.tBody[k].SUM_AMT_RECEIVABLE,
                      // QTY: self.tBody[k].QTY,
                      // SIZE_ENAME: self.tBody[k].SIZE_ENAME,
                      // DISCOUNT: self.tBody[k].DISCOUNT,
                      //
                      AMT_LIST: self.tBody[k].AMT_LIST,
                      AMT_RETAIL: self.tBody[k].AMT_RETAIL,
                      CLR_ECODE: self.tBody[k].CLR_ECODE,
                      CLR_ENAME: self.tBody[k].CLR_ENAME,

                      PS_C_PRO_ECODE: self.tBody[k].PS_C_PRO_ECODE,
                      PS_C_PRO_ENAME: self.tBody[k].PS_C_PRO_ENAME,
                      PS_C_PRO_ID: self.tBody[k].PS_C_PRO_ID,
                      PS_C_SKU_ECODE: self.tBody[k].PS_C_SKU_ECODE,
                      PS_C_SKU_ID: self.tBody[k].PS_C_SKU_ID,

                      SIZE_ECODE: self.tBody[k].SIZE_ECODE,
                      SIZE_ENAME: self.tBody[k].SIZE_ENAME,
                      // 应收金额
                      SUM_AMT_RECEIVABLE:
                        datajson.ecode_acti[i].sum_amt_receivable,
                      // 执行促销
                      actis: datajson.ecode_acti[i].actis,
                      // 应收价
                      AMT_RECEIVABLE:
                        datajson.ecode_acti[i].single_amt_receivable,
                      // 计算折扣
                      DISCOUNT: (datajson.ecode_acti[i].single_amt_receivable / self.tBody[k].AMT_LIST).toFixed(2),
                      // 数量
                      QTY: datajson.ecode_acti[i].qtty
                    };
                  }
                }
              }

              self.tBody = newtable;
              // for (var i = 0; i < datajson.ecode_acti.length; i++) {
              //   for (var k = 0; k < self.tBody.length; k++) {
              //     if (
              //       datajson.ecode_acti[i].sku == self.tBody[k].PS_C_SKU_ECODE
              //     ) {
              //       // 应收金额
              //       self.tBody[k].SUM_AMT_RECEIVABLE =
              //         datajson.ecode_acti[i].sum_amt_receivable;
              //       //  应收价
              //       self.tBody[k].AMT_RECEIVABLE =
              //         datajson.ecode_acti[i].single_amt_receivable;
              //       // 计算折扣
              //       let DISCOUNT = "";
              //       DISCOUNT =
              //         datajson.ecode_acti[i].single_amt_receivable /
              //         self.tBody[k].AMT_LIST;
              //       self.tBody[k].DISCOUNT = DISCOUNT.toFixed(2);
              //       // 执行促销
              //       console.log(k,i)
              //       self.tBody[k].actis = datajson.ecode_acti[i].actis;
              //     }
              //   }
              // }
              // console.log(self.tBody);
              // 促销明细列表
              // datajson.excute_item.map((item, index) => {
              //   excute_item[index] = {
              //     name: index + 1 + ". " + item.msg
              //   };
              // });
              // 促销方案列表
              const excuteItem = [];
              const mingxilistType = '';
              datajson.excute_item.map((item, index) => {   
                let obj = {};                       
                if (item.type == 1) {
                  a = `${index + 1}. ` + `促销[${item.discount.ename}]参与的商品有[${item.discount.products}],共优惠${item.discount.disamt}元`;                  
                } else { //
                  const productsName = [];
                  const Products = item.buygift.products;   
                  const giftName = []; 
                  self.mingxilist.item = giftName; 
                  self.buyGift = Products;                         
                  self.mingxilist.length = Products.length; // 获取一共的数量                                
                  Products.map((item, index) => {
                    giftName.push(`[${Products[index]}]`);
                    if (index < 3) {
                      productsName.push(`[${item}]`);
                    }                            
                  });
                  a = `${index + 1}. ` + `该订单已满足【买赠】促销[${item.buygift.ename}],可赠送${productsName}`;
                } 

                obj = {
                  name: a,
                  qtty: item.buygift.qtty, // 获取返回可赠送的数量 
                  type: item.type 
                };                 
                excuteItem.push(obj);                   
              });
              self.mingxilist.content = excuteItem;
              self.checkboxlist = excute_acti;
              // 明细列表
              // self.mingxilist = excute_item;
              // 促销明细列表
              // 促销明细方案id
              const excute_actiidarray = [];
              const UN_PROM_ACTI_IDS = [];
              excute_acti.map((item, index) => {
                if (item.is_opti) {
                  excute_actiidarray[index] = item.checkid;
                } else {
                  UN_PROM_ACTI_IDS[index] = {
                    checkid: item.checkid,
                    name: item.name
                  };
                }
              });
              self.UN_PROM_ACTI_IDS = self.removeEmptyArrayEle(UN_PROM_ACTI_IDS);
              self.idarray = self.removeEmptyArrayEle(excute_actiidarray);
            }
          });
        }
      },
      deletearray(index) {
        this.tBody.splice(index, 1);

      },
      // 去除数组中的empty
      removeEmptyArrayEle(arr) {
        for (let i = 0; i < arr.length; i++) {
          if (arr[i] == undefined) {
            arr.splice(i, 1);
            i -= 1; // i - 1 ,因为空元素在数组下标 2 位置，删除空之后，后面的元素要向前补位，
          // 这样才能真正去掉空元素,觉得这句可以删掉的连续为空试试，然后思考其中逻辑
          }
        }
        return arr;
      },
      // 传递数据给父组件
      spot(data) {
        this.tBody = data;
      }
    }
  };
</script>
<style lang="less">
html .el-loading-mask .el-loading-spinner,
body .el-loading-mask .el-loading-spinner {
  margin-top: -21px !important;
}
.procedureThree {
  // min-width: 1026px;
  display: flex;
  flex-direction: column;
  flex: 1;
  padding-bottom: 20px;
  margin-top: 16px;
  .procedureThree_condition {
    display: flex;
    padding-right: 49px;
    height: 44px;
    align-items: center;
    font-size: 12px;
    border: 1px solid #d8d8d8;
    .date_input {
      display: flex;
      width: 100%;
      label {
        margin-right: 4px;
      }
      .el-date-editor.el-input,
      .el-date-editor.el-input__inner {
        width: 100%;
      }
    }
    label {
      width: 102px;
      text-align: right;
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }
    input {
      height: 24px;
      line-height: 22px;
      box-sizing: border-box;
    }
    .item-input .input-wrap {
      overflow: inherit;
      .el-autocomplete {
        width: 100%;
      }
    }
  }
  .detail {
    display: flex;
    justify-content: space-between;
    border: 1px solid #d8d8d8;
    font-size: 12px;
    height: 120px;
    .commodity {
      width: 100%;
      padding: 10px;
      label {
        height: 24px;
        line-height: 22px;
        display: flex;
        align-items: center;
      }
      li {
        line-height: 16px;
        word-break: break-all;
      }
    }
    .detail_left {
      border-right: 1px solid #d8d8d8;
    }
    .detail_right {
      .detail_right_title {
        display: flex;
        justify-content: space-between;
        align-items: center;
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
    }
  }
  .table_ff_m_box {
    margin: 11px 0;
    display: flex;
    flex-direction: column;
    border: 1px solid #ddd;
    flex: 1;
  }
  // caren
  .checkboxscroll {
    height: 84px;
    overflow-y: auto;
    .checkboxlist {
      display: flex;
      flex-direction: row;
      align-items: center;
      .checkbox {
        margin-right: 4px;
      }
    }
  }
  .datechangeclass {
    input {
      background: #fcf7f1;
    }
  }
}
</style>

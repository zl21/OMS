
import axios from "axios";
import matrix from "@/views/modal/orderCenter/matrixBox.vue";
import publicMethodsUtil from "@/assets/js/public/publicMethods.js";
export default {
  components: {
    matrix
  },
  data() {
    return {
    };
  },
  props: {
    componentData: {
      type: Object,
      default: {}
    }
  },
  methods: {
    // 获取焦点
    inputFocus() {
      document.getElementsByClassName('ff-matrix--input')[0].focus();
    },
    // 确定
    confirmOk(val, num) {
      if (num) {
        let arr = [];
        let arrList = [];
        Object.keys(val).map(keys => {
          let obj = val[keys];
          arr.push(obj.PS_C_SKU_ECODE.trim());
        });
        Object.keys(val).map(keys => {
          let obj = val[keys];
          arrList.push({ sku: obj.PS_C_SKU_ECODE.trim(), qty: obj.count === "" ? 0 : obj.count.trim() });
        });
        let fromdata = new FormData();
        fromdata.append('param', JSON.stringify({ 'SkuEcodeList': arr }))
        axios({
          url: "/p/cs/skuListQuery",
          method: "post",
          data: fromdata
        }).then(async (res) => {
          if (res.data.code === 0) {
            let queryList = res.data.data;
            for (let i = 0; i < arrList.length; i++) {
              let list = arrList[i];
              let resData = res.data.data;
              for (let index = 0; index < resData.length; index++) {
                let item = resData[index];
                if (item) {
                  if (list.sku === item.ECODE) {
                    queryList[index].skuId = item.ID;
                    queryList[index].PS_C_SKU_ECODE = item.ECODE;
                    queryList[index].BARCODE = item.GBCODE;
                    queryList[index].PS_C_PRO_ECODE = item.PS_C_PRO_ECODE;
                    queryList[index].PS_C_CLR_ID = item.PS_C_SPEC1OBJ_ID; // 颜色
                    queryList[index].PS_C_CLR_ECODE = item.CLRSECODE;
                    queryList[index].PS_C_CLR_ENAME = item.CLRSENAME;
                    queryList[index].PS_C_SIZE_ID = item.PS_C_SPEC2OBJ_ID; // 尺寸
                    queryList[index].PS_C_SIZE_ECODE = item.SIZESECODE;
                    queryList[index].PS_C_SIZE_ENAME = item.SIZESENAME;
                    queryList[index].PS_C_PRO_ENAME = item.PS_C_PRO_ENAME;
                    queryList[index].QTY_CAN_REFUND = list.qty; // 申请数量
                    queryList[index].QTY_REFUND = list.qty;
                    queryList[index].QTY_EXCHANGE = list.qty;
                    queryList[index].SEX_NAME = item.SEX_NAME;
                    queryList[index].SEX = item.SEX;
                    queryList[index].PRICE = item.PRICELIST;
                    queryList[index].amt_refund_single = item.PRICELIST;
                    queryList[index].AMT_REFUND = publicMethodsUtil
                      .accMul(list.qty, item.PRICELIST)
                      .toFixed(2); // 退货金额realAmt
                    queryList[index].QTY_IN = 0;
                    queryList[index].PRODUCT_MARK = "正品";
                    queryList[index].ID = -1;
                    await this.$parent.$parent.$parent.getDataByProinfo(item.PS_C_PRO_ECODE, 1);
                    queryList[index].clrList = this.$parent.$parent.$parent.clrListArr;
                    queryList[index].sizeList = this.$parent.$parent.$parent.sizeListArr;
                  }
                }

              }
            }
            this.$parent.$parent.$parent.enterQuerySave(queryList, num);
          }
        })
      } else {
        let arr = [];
        let arrList = [];
        Object.keys(val).map(keys => {
          let obj = val[keys];
          arr.push(obj.PS_C_SKU_ECODE.trim());
        });
        Object.keys(val).map(keys => {
          let obj = val[keys];
          arrList.push({ sku: obj.PS_C_SKU_ECODE.trim(), qty: obj.count === "" ? 0 : obj.count.trim() });
        });
        let fromdata = new FormData();
        fromdata.append('param', JSON.stringify({ 'SkuEcodeList': arr }))
        axios({
          url: "/p/cs/skuListQuery",
          method: "post",
          data: fromdata
        }).then((res) => {
          if (res.data.code === 0) {
            let queryList = [];

            // 熊伟，15703766695，浙江省杭州市江干区九堡
            arrList.forEach(list => {
              res.data.data.forEach((item, index) => {
                if (list.sku === item.ECODE) {
                  if (item.IS_GIFT === 'Y') item.IS_GIFT = '1'
                  else if (item.IS_GIFT === 'N') item.IS_GIFT = '0'

                  queryList.push({
                    'RESERVE_DECIMAL02': item.PRICELIST,
                    'PRICE_ACTUAL': item.PRICELIST,
                    'REAL_AMT': publicMethodsUtil.accMul(item.PRICELIST, list.qty),
                    'PS_C_CLR_ENAME': item.CLRSENAME,
                    'PS_C_SIZE_ENAME': item.SIZESENAME,
                    'PS_C_SKU_ECODE': item.ECODE,
                    'QTY': list.qty,
                    'ADJUST_AMT': 0,
                    'AMT_DISCOUNT': 0,
                    'IS_GIFT': item.IS_GIFT,
                    'SEX_NAME': item.SEX_NAME,
                    'PS_C_PRO_ENAME': item.PS_C_PRO_ENAME,
                    'PS_C_PRO_ECODE': item.PS_C_PRO_ECODE,
                    'PRICE': item.PRICELIST,
                    'PRICE_TAG': item.PRICELIST
                  })
                }
              })
            })
            this.$parent.$parent.$parent.enterQuerySave1(queryList);
          }
        })
        // this.$parent.$parent.$parent.enterQuerySave(val);
      }
    },
    // 取消
    refreshData() {
      this.$parent.$parent.closeConfirm();
    },
    // enterSave
    enterSave() {
      // debugger
    },
    // loading触发
    loadChange() {
      // debugger
    },
    // input监听
    amendData() {
      // debugger
    }
  }
};
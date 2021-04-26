import matrix from 'allpages/orderCenter/orderManageDetail/orderDetail/matrix.vue';
import publicMethodsUtil from '@/assets/js/public/publicMethods.js';

export default {
  name: 'matrixBox',
  components: {
    matrix
  },
  data() {
    return {};
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
    async confirmOk(val, num) {
      if (num) {
        const arr = [];
        const arrList = [];
        Object.keys(val).forEach(keys => {
          const obj = val[keys];
          arr.push(obj.PS_C_SKU_ECODE.trim());
        });
        Object.keys(val).forEach(keys => {
          const obj = val[keys];
          arrList.push({ sku: obj.PS_C_SKU_ECODE.trim(), qty: obj.count === '' ? 0 : obj.count.trim() });
        });
        const fromdata = new FormData();
        fromdata.append('param', JSON.stringify({ SkuEcodeList: arr }));
        const res = await this.service.orderCenter.skuListQuery(fromdata);
          if (res.data.code === 0) {
            const queryList = res.data.data;
            for await (const list of arrList) {
              const resData = res.data.data;
              let count = 0;
              for await (const item of resData) {
                if (item) {
                  if (list.sku === item.ECODE) {
                    queryList[count].skuId = item.ID;
                    queryList[count].PS_C_SKU_ECODE = item.ECODE;
                    queryList[count].BARCODE = item.GBCODE;
                    queryList[count].PS_C_PRO_ECODE = item.PS_C_PRO_ECODE;
                    queryList[count].PS_C_CLR_ID = item.PS_C_SPEC1OBJ_ID; // 颜色
                    queryList[count].PS_C_CLR_ECODE = item.CLRSECODE;
                    queryList[count].PS_C_CLR_ENAME = item.CLRSENAME;
                    queryList[count].PS_C_SIZE_ID = item.PS_C_SPEC2OBJ_ID; // 尺寸
                    queryList[count].PS_C_SIZE_ECODE = item.SIZESECODE;
                    queryList[count].PS_C_SIZE_ENAME = item.SIZESENAME;
                    queryList[count].PS_C_PRO_ENAME = item.PS_C_PRO_ENAME;
                    queryList[count].QTY_CAN_REFUND = list.qty; // 申请数量
                    queryList[count].QTY_REFUND = list.qty;
                    queryList[count].QTY_EXCHANGE = list.qty;
                    queryList[count].SEX_NAME = item.SEX_NAME;
                    queryList[count].SEX = item.SEX;
                    queryList[count].PRICE = item.PRICELIST;
                    queryList[count].amt_refund_single = item.PRICELIST;
                    queryList[count].AMT_REFUND = publicMethodsUtil.accMul(list.qty, item.PRICELIST).toFixed(2); // 退货金额realAmt
                    queryList[count].QTY_IN = 0;
                    queryList[count].PRODUCT_MARK = '正品';
                    queryList[count].ID = -1;
                    await this.$parent.$parent.$parent.getDataByProinfo(item.PS_C_PRO_ECODE, 1);
                    queryList[count].clrList = this.$parent.$parent.$parent.clrListArr;
                    queryList[count].sizeList = this.$parent.$parent.$parent.sizeListArr;
                    count++;
                  }
                }
              }
            }
            this.$parent.$parent.$parent.enterQuerySave(queryList, num);
          }
      } else {
        const arr = [];
        const arrList = [];
        Object.keys(val).forEach(keys => {
          const obj = val[keys];
          arr.push(obj.PS_C_SKU_ECODE.trim());
        });
        Object.keys(val).forEach(keys => {
          const obj = val[keys];
          arrList.push({ sku: obj.PS_C_SKU_ECODE.trim(), qty: obj.count === '' ? 0 : obj.count.trim() });
        });
        const fromdata = new FormData();
        fromdata.append('param', JSON.stringify({ SkuEcodeList: arr }));
        this.service.orderCenter.skuListQuery(fromdata).then(res => {
          if (res.data.code === 0) {
            const queryList = [];

            // 熊伟，15703766695，浙江省杭州市江干区九堡
            arrList.forEach(list => {
              res.data.data.forEach(item => {
                if (list.sku === item.ECODE) {
                  if (item.IS_GIFT === 'Y') item.IS_GIFT = '1';
                  else if (item.IS_GIFT === 'N') item.IS_GIFT = '0';

                  queryList.push({
                    RESERVE_DECIMAL02: item.PRICELIST,
                    PRICE_ACTUAL: item.PRICELIST,
                    REAL_AMT: publicMethodsUtil.accMul(item.PRICELIST, list.qty),
                    PS_C_CLR_ENAME: item.CLRSENAME,
                    PS_C_SIZE_ENAME: item.SIZESENAME,
                    PS_C_SKU_ECODE: item.ECODE,
                    QTY: list.qty,
                    ADJUST_AMT: 0,
                    AMT_DISCOUNT: 0,
                    IS_GIFT: item.IS_GIFT,
                    SEX_NAME: item.SEX_NAME,
                    PS_C_PRO_ENAME: item.PS_C_PRO_ENAME,
                    PS_C_PRO_ECODE: item.PS_C_PRO_ECODE,
                    PRICE: item.PRICELIST,
                    PRICE_TAG: item.PRICELIST
                  });
                }
              });
            });
            this.$parent.$parent.$parent.enterQuerySave1(queryList);
          }
        });
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

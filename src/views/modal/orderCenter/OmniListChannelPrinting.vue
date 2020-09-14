<template>
  <div
    v-if="printFlag"
    class="warehousePickingListPrinting"
  >
    <p>是否打印？</p>
    <jordanButton :btn-config="btnConfig" />
  </div>
  <div
    v-else
    class="warehousePickingListPrinting"
  >
    <p>{{ errMessage }}</p>
    <jordanButton :btn-config="closeBtnConfig" />
  </div>
</template>
<script>
  import { getLodop } from '@/jordanComponent/common/LodopFuncs';
  import axios from 'axios';
  import jordanButton from '@syman/burgeon-r3-components/r3.publish/src/jordanComponents/jordanButton.vue';
  import R3 from '@syman/burgeon-r3';

  const { getModuleName } = R3;
  export default {
    components: {
      jordanButton
    },
    props: {
      // objList: {
      //   type: Array,
      //   default: () => []
      // },
      idArray: {
        type: Array,
        default: () => []
      },
      // webid: {
      //   type: Number
      // },
      // tablename: {
      //   type: String,
      //   default: () => ''
      // },
      // rowData: {
      //   type: Array,
      //   default: () => []
      // }
    },
    data() {
      return {
        rowData: [],
        Current: '',
        pintNumber: 0, // 明细打印数量
        checkedRow: [],
        printFlag: true,
        errMessage: '',
        btnConfig: {
          typeAll: 'error', // 按钮统一风格样式
          btnsite: 'right', // 按钮位置 (right , center , left)
          loading: false, // 按钮组件是否有loading样式,值为true false
          buttons: [
            {
              text: '取消', // 按钮文本
              btnclick: () => {
                this.$emit('closeActionDialog', false);
              } // 按钮点击事件
            },
            {
              text: '确定打印', // 按钮文本
              disabled: false,
              btnclick: () => {
                this.doPrint();
              }
            }
          ]
        },
        closeBtnConfig: {
          typeAll: 'error', // 按钮统一风格样式
          btnsite: 'right', // 按钮位置 (right , center , left)
          loading: false, // 按钮组件是否有loading样式,值为true false
          buttons: [
            {
              text: '关闭', // 按钮文本
              disabled: false,
              btnclick: () => {
                this.$emit('closeActionDialog', false);
              }
            }
          ]
        },
        websock: null,

        jsonObject: {
          content: {
            data: {
              recipient: {
                address: {
                  city: '杭州市',
                  detail: '良睦路999号乐佳国际大厦2号楼小邮局',
                  district: '余杭区',
                  province: '浙江省',
                  town: ''
                },
                mobile: '13012345678',
                name: '乾宝贝最可爱',
                phone: '057112345678'
              },
              routingInfo: {
                consolidation: {
                  name: '杭州',
                  code: 'hangzhou'
                },
                origin: {
                  name: '杭州',
                  code: 'POSTB'
                },
                sortation: {
                  name: '杭州'
                },
                routeCode: '123A-456-789'
              },
              sender: {
                address: {
                  city: '杭州市',
                  detail: '文一西路1001号阿里巴巴淘宝城5号小邮局',
                  district: '余杭区',
                  province: '浙江省',
                  town: ''
                },
                mobile: '13012345678',
                name: '阿里巴巴',
                phone: '057112345678'
              },
              shippingOption: {
                code: 'COD',
                services: {
                  'SVC-COD': {
                    value: '200'
                  },
                  'TIMED-DELIVERY': {
                    value: 'SEVERAL-DAYS'
                  },
                  'PAYMENT-TYPE': {
                    value: 'ON-DELIVERY'
                  },
                  'SVC-INSURE': {
                    value: '1000000'
                  },
                  'SVC-PROMISE-DELIVERY': {
                    'promise-type': 'SAMEDAY_DELIVERY'
                  }
                },
                title: '代收货款'
              },
              waybillCode: '0123456789'
            },
            signature:
              '19d6f7759487e556ddcdd3d499af087080403277b7deed1a951cc3d9a93c42a7e22ccba94ff609976c5d3ceb069b641f541bc9906098438d362cae002dfd823a8654b2b4f655e96317d7f60eef1372bb983a4e3174cc8d321668c49068071eaea873071ed683dd24810e51afc0bc925b7a2445fdbc2034cdffb12cb4719ca6b7',
            templateURL:
              'http://cloudprint.cainiao.com/cloudprint/template/getStandardTemplate.json?template_id=101&version=4'
          }
        },
        num: [
          {
            waybillCode: '0123456789',
            printData: {
              data: '',
              templateURL:
                'http://cloudprint.cainiao.com/cloudprint/template/getStandardTemplate.json?template_id=101&version=4'
            },
            objectId: '1'
          }
        ],

        getData: [],

        defaultPrinter: ''
      };
    },
    mounted() {
      this.getCheckedRow();
    },
    created() {
      // this.initWebSocket();
      this.rowData = this.$store.state[getModuleName()].buttons.selectArr;
      // 老框架迁移新框架定制弹框界面，由于框架更换，框架弹框传入自定义弹框的的参数发生变化
      // rowData值框架未传入，需自定义弹框界面自行获取
    },
    methods: {
      getCheckedRow() {
        const _this = this;
        if (_this.idArray.length > 0) {
          _this.idArray.map((id) => {
            _this.rowData.map((item) => {
              if (item.ID.val === id) {
                _this.checkedRow.push(item);
              }
            });
          });
        } else {
          _this.printFlag = false;
          _this.errMessage = '请勾选数据后进行打印!';
          return false;
        }
        if (_this.idArray.length > 0 && _this.checkedRow.length > 0 && _this.checkedRow[0].CP_C_PHY_WAREHOUSE_ID) {
          const warehouseId = _this.checkedRow[0].CP_C_PHY_WAREHOUSE_ID.refobjid;
          for (const index in _this.checkedRow) {
            if (warehouseId !== _this.checkedRow[index].CP_C_PHY_WAREHOUSE_ID.refobjid) {
              _this.printFlag = false;
              _this.errMessage = '请勾选同一实体仓数据!';
            } else if (_this.checkedRow[index].BILL_STATUS.val === '已作废') {
              _this.printFlag = false;
              _this.errMessage = '存在已作废的数据,请重新勾选!';
            }
          }
        }
      },
      // lodop 打印
      doPrint() {
        this.$emit('closeActionDialog', true);
        const LODOP = getLodop();
        /**
         * 针打：15*9.33cm
         */
        // this.pintNumber = 1;
        LODOP.PRINT_INITA('0mm', '0mm', '150mm', `${((this.checkedRow.length - 5) * 8) + 93.3}mm`, '全渠道发货单模板');
        LODOP.SET_PRINT_PAGESIZE(1, '150mm', `${((this.checkedRow.length - 5) * 8) + 93.3}mm`, '');
        // LODOP.ADD_PRINT_RECT("0mm", "0mm", "80mm", `${((this.pintNumber - 1) * 8) + 235}mm`, 0, 1);
        // LODOP.SET_PRINT_STYLE("FontSize", 12);
        // LODOP.SET_PRINT_STYLEA(0,"FontName", "宋体");
        LODOP.ADD_PRINT_TEXT('5mm', '45mm', '100mm', '8mm', '门店&快递每日发货交接清单');// （上，右，宽，高，内容）
        LODOP.SET_PRINT_STYLEA(0, 'Bold', 1);
        LODOP.SET_PRINT_STYLEA(0, 'FontSize', 13);
        LODOP.ADD_PRINT_TEXT('12mm', '8mm', '30mm', '10mm', '门店:');// （上，右，宽，高，内容）
        LODOP.ADD_PRINT_TEXT('12mm', '20mm', '100mm', '10mm', this.checkedRow[0].CP_C_PHY_WAREHOUSE_ID.val);// （上，右，宽，高，内容）
        LODOP.SET_PRINT_STYLEA(0, 'FontSize', 10);
        // 明细
        LODOP.ADD_PRINT_TEXT('20mm', '8mm', '15mm', '8mm', '序号');// （上，右，宽，高，内容）
        LODOP.ADD_PRINT_RECT('19mm', '7mm', '15mm', '8mm', 0, 1);
        LODOP.ADD_PRINT_TEXT('20mm', '23mm', '50mm', '8mm', '快递单号');// （上，右，宽，高，内容）
        LODOP.ADD_PRINT_RECT('19mm', '22mm', '50mm', '8mm', 0, 1);
        LODOP.ADD_PRINT_TEXT('20mm', '73mm', '20mm', '8mm', '件数');// （上，右，宽，高，内容）
        LODOP.ADD_PRINT_RECT('19mm', '72mm', '20mm', '8mm', 0, 1);
        LODOP.ADD_PRINT_TEXT('20mm', '93mm', '40mm', '8mm', '出库时间');// （上，右，宽，高，内容）
        LODOP.ADD_PRINT_RECT('19mm', '92mm', '40mm', '8mm', 0, 1);
        this.checkedRow.map(
          (item, index) => {
            LODOP.ADD_PRINT_TEXT(`${(index * 8) + 28}mm`, '8mm', '15mm', '8mm', index + 1);// （上，右，宽，高，内容）
            LODOP.ADD_PRINT_RECT(`${(index * 8) + 27}mm`, '7mm', '15mm', '8mm', 0, 1);
            LODOP.ADD_PRINT_TEXT(`${(index * 8) + 27}mm`, '23mm', '50mm', '8mm', item.LOGISTIC_NUMBER.val);// （上，右，宽，高，内容）
            LODOP.ADD_PRINT_RECT(`${(index * 8) + 27}mm`, '22mm', '50mm', '8mm', 0, 1);
            LODOP.ADD_PRINT_TEXT(`${(index * 8) + 28}mm`, '73mm', '20mm', '8mm', item.TOT_QTY_OUT.val);// （上，右，宽，高，内容）
            LODOP.ADD_PRINT_RECT(`${(index * 8) + 27}mm`, '72mm', '20mm', '8mm', 0, 1);
            LODOP.ADD_PRINT_TEXT(`${(index * 8) + 28}mm`, '93mm', '40mm', '8mm', item.OUT_TIME.val);// （上，右，宽，高，内容）
            LODOP.ADD_PRINT_RECT(`${(index * 8) + 27}mm`, '92mm', '40mm', '8mm', 0, 1);
          }
        );
        const detailHeight = this.checkedRow.length * 8 + 29;
        LODOP.ADD_PRINT_TEXT(`${detailHeight}mm`, '9mm', '30mm', '7mm', '汇总包裹数');// （上，右，宽，高，内容）
        LODOP.SET_PRINT_STYLEA(0, 'Bold', 1);
        LODOP.ADD_PRINT_TEXT(`${detailHeight}mm`, '93mm', '40mm', '7mm', this.checkedRow.length);// （上，右，宽，高，内容）
        LODOP.SET_PRINT_STYLEA(0, 'Bold', 1);
        LODOP.ADD_PRINT_TEXT(`${detailHeight + 6}mm`, '9mm', '30mm', '5mm', '签字(快递):');// （上，右，宽，高，内容）
        LODOP.ADD_PRINT_TEXT(`${detailHeight + 11}mm`, '9mm', '30mm', '5mm', '签字(门店):');// （上，右，宽，高，内容）
        LODOP.ADD_PRINT_TEXT(`${detailHeight + 16}mm`, '9mm', '30mm', '5mm', '揽收时间:');// （上，右，宽，高，内容）
        LODOP.SET_PRINT_STYLEA(0, 'FontSize', 9);
        LODOP.SET_PRINT_MODE('PRINT_DUPLEX', 1);
        LODOP.PREVIEW();// 预览
      },

      // doPrint(printer, waybillArray) {
      //   var request = this.getRequestObject("print");
      //   request.task = new Object();
      //   request.task.taskID = this.getUUID(8, 10);
      //   request.task.preview = false;
      //   request.task.printer = this.printer;
      //   var documents = new Array();
      //   for (let i = 0; i < waybillArray.length; i++) {
      //     var doc = new Object();
      //     doc.documentID = waybillArray[i];
      //     var content = new Array();
      //     var waybillJson = this.getWaybillJson(waybillArray[i]);
      //     var customAreaData = this.getCustomAreaData(waybillArray[i]);
      //     content.push(waybillJson, customAreaData);
      //     doc.contents = content;
      //     documents.push(doc);
      //   }
      //   request.task.documents = documents;
      //   console.log(request);

      //   // this.websock.send(JSON.stringify(request));
      //   // this.threadPoxi(JSON.stringify(request));
      // },
      /* doPrint(printer, waybillArray) {
        let self = this;
        var request = this.getRequestObject("print");
        request.task = new Object();
        request.task.taskID = self.getData[0].task.taskID;
        request.task.preview = false;
        request.task.printer = printer;
        var documents = new Array();
        self.getData.map(item => {
          documents.push(item.task.documents[0]);
        });
        request.task.documents = documents;
        console.log(request);

        // this.websock.send(JSON.stringify(request));
        this.threadPoxi(JSON.stringify(request));
      }, */
      getWaybillJson(waybillNO) {
        // 获取waybill对应的json object，此处的ajaxGet函数是伪代码
        // var jsonObject = {jiade:1234}// ajaxGet(waybillNO);
        return this.jsonObject;
      },
      getCustomAreaData(waybillNO) {
        // 获取waybill对应的自定义区的JSON object，此处的ajaxGet函数是伪代码
        // var jsonObject = {jiade:1234}//ajaxGet(waybillNO);
        const ret = new Object();
        ret.templateURL = this.jsonObject.content.templateURL;
        ret.data = this.jsonObject.content.data;
        return ret;
      },
      initWebSocket() {
        // 打印机初始化
        // ws地址
        this.websock = new WebSocket('ws://127.0.0.1:13528');
        this.websock.onmessage = this.websocketonmessage;
        this.websock.onclose = this.websocketclose;
        const that = this;
        this.websock.onopen = function (event) {
          that.getPrintList(); // 打印机列表
          // 监听消息
          that.websock.onmessage();
          // 监听Socket的关闭
          that.websock.onclose();
        };
      },
      getPrintList() {
        const request = this.getRequestObject('getPrinters');
        if (this.websock.readyState === 1) {
          console.log(request);
          this.websock.send(JSON.stringify(request));
        }
      },
      /** *
       * 构造request对象
       */
      getRequestObject(cmd) {
        const request = new Object();
        request.requestID = this.getUUID(8, 16);
        // request.requestID =  this.getData[0].requestID;
        request.version = '1.0';
        request.cmd = cmd;
        // request.cmd = this.getData[0].cmd;
        return request;
      },
      getUUID(len, radix) {
        const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split(
          ''
        );
        const uuid = [];
        let i;
        radix = radix || chars.length;
        if (len) {
          for (i = 0; i < len; i++) uuid[i] = chars[0 | (Math.random() * radix)];
        } else {
          let r;
          uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
          uuid[14] = '4';
          for (i = 0; i < 36; i++) {
            if (!uuid[i]) {
              r = 0 | (Math.random() * 16);
              uuid[i] = chars[i == 19 ? (r & 0x3) | 0x8 : r];
            }
          }
        }
        return uuid.join('');
      },
      websocketonmessage(event) {
        // 数据接收
        console.log(event);
        if (event && event.data) {
          this.defaultPrinter = JSON.parse(event.data).defaultPrinter;
          console.log(JSON.parse(event.data).defaultPrinter);
        }
      },
      websocketsend(agentData) {
        // 数据发送
        this.websock.send(agentData);
      },
      websocketclose(event) {
        // 关闭
        if (event && event.code) {
          console.log(`connection closed (${event.code})`);
        }
      },
      ceshi() {
        {
          const a = {
            data: [
              {
                task: {
                  preview: false,
                  documents: [
                    {
                      contents: [
                        {
                          ver: 'waybill_print_secret_version_1',
                          signature: 'MD:cEw/Km2UYKaBA2TUQWKK8w==',
                          encryptedData:
                            'AES:rU904rj6UH2oqfSUb43+Z5CuoOkTVqESmlQ0tcJbrUAU/Tyci9E9dE6M43ziEjHJWyM1K3xi4RrxlKTl/BPDAYQzCubV8F5nw7IIPwfvQcH1JGnicJBCnSkZYR52+CP2Ze8V+9Tn/gaybLlYlQLbx1p7ypqqNH5r0+XrwaKo3NKD67IWsBxKnzuA9jYeH1xJXDX49tozaFJhHUhXd1p8ItT5BMiNUvnPDoczD13vmbYVsDZbdqIOIfXbeG/tKOr4UvrJv3zeKRicYrL4RefZGstxWj6vjhRxkinsp8rJAhIEicZUtlm8IWFvzUdAnDHlowYvtw97cn54IySMbNiuQdLxA0ZzL0NY/JI56ANgfcqywDdh3l8BOUg4tfKtHbNX9OBbd1qqwFyWaPx0dCR/BG+VWwS3gvEKPR+2lsjUcekZJZYOUMwONuGA0+e3218wqPL5u4qA1vR1olSvtp/RaDSV8g8Qe5rvcH47LjUNI59AGmtxDrG8LQiDVqFaRy79rlvWiFRxLpT0FRURhA2XJ6k07UZal1CFHYJ/4NbccnRoDfYKpZNfCriRCxjNBsJPbj7dGYCp2ZMG3qk5WhylB98RvxG1WbefvzD9VZAFMzqNs8T6hTlCMtNFyonfYxkSzr4257p9ez8xAyWB+x5No2sJ8I6WjI0ATbmxVn3tZcLsjlEfcB1b9cHwK5+30xG9/s0j9eSsVzmMOKJxfDma6w/ihJUIIVCLOebjyHxK3pANWkUDqo5FBbBUBpwa4rvMvdyi7Z93q4RwZQe2EeC/ot7PMeRsZ45gXF5CoxtcXE4PL++tfsTiO9Gxl1MLxTtpAgolBRMyPZLCyA07cnQUwC04+LV3sb9Zc5mpsVNFAHy9Ls8PQmg1pg0SgeZpdRUe5yDLGHmqs0UYLOWMOLIBNanFuBIO0JDG9vtN9LGAOv0frEUp9YLg4arSTG3G0RVq/epKLy1yM3uFSwhk85yj8jEkvEnUxLbBTPvRk3d8fgS8JnnmxCsjN77nfasexCuT8vYVvmtpiUQNtrEYiwlos9rRSS76TCbMmEqQLuBLd068NwVPSxnpswNXiOXcWHllzo+IvahjCuoLz7iOQNA9UXEFTK/wW5BuZZuVl0pV589I9SkeMaVD1qES47i9k0qxD4JGYkyI4c+o2n4Y/9Dez8B9ipsmvCvK+Y94GxQT2hlyuygcI8YRMOr2mGimZu1b2BKng6YvFdA8lfxX5v2Q56XbgUx0gaUOKWJ8VL1hD2MCkFyjyhG6nmc5pQS/Rsqux85kqNnyxMWUvIAfdcfRtBoivSJgmjJddH8fpCL20Rh6dZelsxC3xKFAfEsRPNhv/tRALpQTd4bIJ15CxIm/NPEXOg/lETVzLdn1F/MxvYL6HI3rYTXQx7w2gzyokMcmepeO50Rp1sICbW7TAmOd2xNQmqvG8nd+mYIvDfibCBXP/GQphY1CXCBBipnanS1gEalKcDFBfwkMh0QxYcvcXO+Drxxf+iEL9As7w8DNruTEUcabf2MYE+VJKL0isVdKBbS+UKGA9Yw3EGNTvYXwgDVgV5uDX66ruY461i48yipaZxN53TWqfoqDrl07CvvpEftSiS9YC659qWTv19r9a6j3Rz9ZVcrqe0632ZKSrC+gUAOBSl1iuib80r+CIH/I00wIICOnhPIpuuiGYPyXD86pAj1FT688TOt/0cax8tc=',
                          templateURL:
                            'http://cloudprint.cainiao.com/template/standard/1301'
                        },
                        {
                          data: {
                            Title: '柑子的店铺  7147',
                            table: [
                              {
                                skuSpec: '10kg阳离子交换树脂（SOFT-10S）；',
                                qryOut: 2.0,
                                proModel: null,
                                sku: '190001-0001'
                              },
                              {
                                skuSpec: '一温一开G商用',
                                qryOut: 2.0,
                                proModel: null,
                                sku: '101001-0001'
                              },
                              {
                                skuSpec: '立式电子制冷智能,会销',
                                qryOut: 2.0,
                                proModel: '72',
                                sku: '101011-0002'
                              }
                            ]
                          },
                          templateURL:
                            'http://cloudprint.cainiao.com/template/customArea/9307564/1'
                        }
                      ],
                      documentID: '9479379026'
                    }
                  ],
                  taskID: '3243435f-13b6-4743-96fe-ced57fe2e5f8'
                },
                requestID: '29c24775-0f8b-4ca3-ab54-0d2db32450fb',
                cmd: 'print',
                version: '1.0'
              },
              {
                task: {
                  preview: false,
                  documents: [
                    {
                      contents: [
                        {
                          ver: 'waybill_print_secret_version_1',
                          signature: 'MD:znkMyF3z2IN5YZ7qOEcdjA==',
                          encryptedData:
                            'AES:rU904rj6UH2oqfSUb43+Z5CuoOkTVqESmlQ0tcJbrUAU/Tyci9E9dE6M43ziEjHJWyM1K3xi4RrxlKTl/BPDAYQzCubV8F5nw7IIPwfvQcH1JGnicJBCnSkZYR52+CP2VHUAQoTW82Y6lhdP2l8ET1vE1MZGfo7lIA6p97bUZntSAqNuftaCecOn/OLMRelC9SRp4nCQQp0pGWEedvgj9lR1AEKE1vNmOpYXT9pfBE+kdKHd1CaGSHBveoTGmzDhhVjG+M22BHBWgYwbkHwVMuk79WOizD6o82Osxb5pznUDOfSOoT8DfhZK8OnFrk1K/Z2DdHukmYo+aGzKQe4XtPvdwwD9pYN/de49D1Vpwd2VcDZykiMBreiQCavXm2DB9OBbd1qqwFyWaPx0dCR/BG+VWwS3gvEKPR+2lsjUcenOMAy3mGL0IZDAJXZimmqr6CLzxW4BDiKSwKqCzcDhln3kvQHRhgNBAhby/6gMCU3/7Q08N4xkwMmmO/hoHSMySlFdIJlor4ZyBPwfrX68V7apAWqTJY9lB1KQrCAaDHnDZFB1T1b385Fw9kMUSP8Ey5VATepuMlf2TWCrTQQ+7KV5l3kg3KX0xsTr5R6E0rGbGzP0672ryUaszlN/feHXkZT2rPXcTkXCR+oQhlFuTFvQ20k/fKdqvxGRzM4Tw00FVMXjiHGYbfn9PY5XHiRXOohEc48Z1O6I50B7p/6JGFMVzTjfnfZmcTZmSMOK+SFuQEEqMb3T7VxNQifpToNMn74aYneSgBa7hCbA7M7XCSZFXYdBVxau6tb0usVEhH/f+UG6tIxjeg7aaKH5kGIVyMfWRny1JCXWID8a5UgOkWSAcKu6dgyw7iRHw+sG3x6YhmfkrNzE2GN+Cz4iTAgxZjaeQjdDHjrMZKfQ6dDX28caE4Fy/WTXTYTzBVpgZL3N7nOsMa9KGlo9Nxv3lv6oa1iU4Kw8pr+dFKQ3YQp1HWqHwjSyuUQJf1IVNZeqz1tFdBfAJ0nLGnxECUvUihBCjntuC6jCmtV0ikhTlKpNzb0sPpi6sm7zB59JVRa2jIH9UigCGS8+8p0r5+rhYZnGSe+IBLWT4zNc/WjxW1pOAkHVpT8AXUkGGMT9/cWZXNewU3tCHTlq65g6W614gsI6ENU2xQWE8/gfY5zES88HqR77oN7M1x204dXXErdIMaCvz78zAqCwDMQI6rmfDVZv7ZM6PZ3GNPq8VU4pNEVAhwiU/jUcU9ZbSoE83+SyVwFq52fuAs4ba2RFWgBJhfSUxtiCklJRNv7Dy17APNfsL7RKD4Kl49atE8d44LxMYX8cpCJkwAZOPw9Z7fNx5vYm3cUzxGe55GA1pTKD+XFydhxrnUK5I/PY+WkNvqnlvS/D9661VqP8o6hD/AXptqFjpq1W5QhKLajaxmMCwqVO/+e4tTGt//vKeepQez1QGGm1seGgItgZpEUEPIjq/JlDDwW4Sw+kf0R4SGxcddKrExqYXsFv75BXRr6VzaGAtp5/s585pn+bZVJV1g02vsn0r3VPFhqK/Ke6ViA75HqfbMSaClDHA2xBp57kNG4BBeHwVd1x7lmDHXFMp3dxeCTJcqPCKpDJIGw/t2OZsCbB2w==',
                          templateURL:
                            'http://cloudprint.cainiao.com/template/standard/301'
                        },
                        {
                          data: {
                            Title: '柑子的店铺  7151',
                            table: [
                              {
                                skuSpec:
                                  '立式温热智能，不喷漆、翻盖喷漆；电商；银色+黑色',
                                qryOut: 1.0,
                                proModel: 'JL5593XZ',
                                sku: '101004-0001'
                              }
                            ]
                          },
                          templateURL:
                            'http://cloudprint.cainiao.com/template/customArea/9249129/1'
                        }
                      ],
                      documentID: '75316549105076'
                    }
                  ],
                  taskID: '98ab7c63-8512-4bb9-b5aa-c86f3c8fd106'
                },
                requestID: '441d6377-1de7-4d45-b2a8-d4fada4d2759',
                cmd: 'print',
                version: '1.0'
              }
            ],
            message: '查询数据成功'
          };
        }
      }
    }
  };
</script>
<style lang="less">
  .warehousePickingListPrinting {
    width: 440px;
  }
</style>

<template>
  <div style="width: 440px;">
    <p>是否打印选中行？</p>
    <jordanButton :btn-config="btnConfig" />
  </div>
</template>
<script>
  import axios from 'axios';
  import jordanButton from 'framework/jordanComponents/jordanButton.vue';
  import DateUtil from '@/assets/js/__utils__/date';
  import { getLodop } from '@/jordanComponent/common/LodopFuncs';

  export default {
    components: {
      jordanButton,
    },
    props: {
      objList: {
        type: Array,
        default: () => []
      },
      idArray: {
        type: Array,
        default: () => []
      },
      webid: {
        type: Number,
      },
      tablename: {
        type: String,
        default: () => ''
      },
      rowData: {
        type: Array,
        default: () => []
      },
    },
    data() {
      return {
        btnConfig: {
          typeAll: 'error', // 按钮统一风格样式
          btnsite: 'right', // 按钮位置 (right , center , left)
          loading: false, // 按钮组件是否有loading样式,值为true false
          buttons: [
            {
              text: '取消', // 按钮文本
              btnclick: () => {
                this.$emit('closeActionDialog', false);
              }, // 按钮点击事件
            },
            {
              text: '确定打印', // 按钮文本
              disabled: false,
              btnclick: () => {
                this.print();
              },
            },
          ],
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
                  town: '',
                },
                mobile: '13012345678',
                name: '乾宝贝最可爱',
                phone: '057112345678',
              },
              routingInfo: {
                consolidation: {
                  name: '杭州',
                  code: 'hangzhou',
                },
                origin: {
                  name: '杭州',
                  code: 'POSTB',
                },
                sortation: {
                  name: '杭州',
                },
                routeCode: '123A-456-789',
              },
              sender: {
                address: {
                  city: '杭州市',
                  detail: '文一西路1001号阿里巴巴淘宝城5号小邮局',
                  district: '余杭区',
                  province: '浙江省',
                  town: '',
                },
                mobile: '13012345678',
                name: '阿里巴巴',
                phone: '057112345678',
              },
              shippingOption: {
                code: 'COD',
                services: {
                  'SVC-COD': {
                    value: '200',
                  },
                  'TIMED-DELIVERY': {
                    value: 'SEVERAL-DAYS',
                  },
                  'PAYMENT-TYPE': {
                    value: 'ON-DELIVERY',
                  },
                  'SVC-INSURE': {
                    value: '1000000',
                  },
                  'SVC-PROMISE-DELIVERY': {
                    'promise-type': 'SAMEDAY_DELIVERY',
                  },
                },
                title: '代收货款',
              },
              waybillCode: '0123456789',
            },
            signature:
              '19d6f7759487e556ddcdd3d499af087080403277b7deed1a951cc3d9a93c42a7e22ccba94ff609976c5d3ceb069b641f541bc9906098438d362cae002dfd823a8654b2b4f655e96317d7f60eef1372bb983a4e3174cc8d321668c49068071eaea873071ed683dd24810e51afc0bc925b7a2445fdbc2034cdffb12cb4719ca6b7',
            templateURL:
              'http://cloudprint.cainiao.com/cloudprint/template/getStandardTemplate.json?template_id=101&version=4',
          },
        },
        num: [
          {
            waybillCode: '0123456789',
            printData: {
              data: '',
              templateURL:
                'http://cloudprint.cainiao.com/cloudprint/template/getStandardTemplate.json?template_id=101&version=4',
            },
            objectId: '1',
          },
        ],

        getData: [],
        getJdWjQtData: [],
        getJdWjSfData: [],
        getJdData: [],

        defaultPrinter: '',
      };
    },
    mounted() {
    // console.log(this.objList, "objList");
    // console.log(this.idArr, "idArr");
    // console.log(this.tablename, "tablename");
    // console.log(this.rowData, "rowData");
    // console.log(this.webid, "webid");
    },
    created() {
      this.initWebSocket();
    },
    methods: {
      print() {
        axios({
          url: '/p/cs/SgOutNoticePrint',
          method: 'post',
          data: {
            ids: this.idArray,
          },
        }).then((res) => {
          const self = this;
          console.log(res);
          if (res.data.code === 0) {
            res.data.data.map((data) => {
              if (data.PLATFORM === 'CN') {
                self.getData = data.RETURN_DATA;
              } else if (data.PLATFORM === 'JD_WJQT') {
                self.getJdWjQtData = data.RETURN_DATA;
              } else if (data.PLATFORM === 'JD_WJSF') {
                self.getJdWjSfData = data.RETURN_DATA;
              } else if (data.PLATFORM === 'JD_QL') {
                self.getJdData = data.RETURN_DATA;
              }
            });
            self.$emit('closeActionDialog', true);
            if (self.getData.length > 0) {
              self.doPrint(self.defaultPrinter, self.num);
            } else {
              const LODOP = getLodop();
              const today = new Date();
              const formatToday = today.Format('yyyy-MM-dd');
              if (self.getJdWjQtData.length > 0) {
                LODOP.PRINT_INITA(
                  '0mm',
                  '0mm',
                  '100mm',
                  '180mm',
                  '京东无界通用模板'
                );
                LODOP.SET_PRINT_PAGESIZE(1, '108mm', '188mm', '');
                self.getJdWjQtData.map((qtData) => {
                  self.doPrintForJdWjQt(LODOP, qtData);
                });
              } else if (self.getJdData.length > 0) {
                LODOP.PRINT_INITA(
                  '0mm',
                  '0mm',
                  '110mm',
                  '113mm',
                  '京东无界自营模板'
                );
                LODOP.SET_PRINT_PAGESIZE(1, '110mm', '113mm', '');
                self.getJdData.map((zyData) => {
                  self.doPrintForJd(LODOP, zyData, formatToday);
                });
              }
              LODOP.PREVIEW(); // 预览
            }
          } else {
            self.$Message.error(res.data.message);
            self.$emit('closeActionDialog', true);
          }
        });
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
      getImgUrl(logisticsEcode) {
        let url = '/static/img/logisticsLogo/ZhongTongLogo.png';
        switch (logisticsEcode) {
        case 'STO':
          url = '/static/img/logisticsLogo/ShenTong.jpg';
          break;
        case 'YTO':
          url = '/static/img/logisticsLogo/YuanTong.jpg';
          break;
        case 'YUNDA':
          url = '/static/img/logisticsLogo/YunDa.jpg';
          break;
        case 'EMS':
          url = '/static/img/logisticsLogo/EMS.jpg';
          break;
        }
        return url;
      },
      doPrintForJdWjQt(LODOP, qtData) {
        LODOP.NewPage();
        LODOP.SET_PRINT_STYLE('FontSize', 12);
        // LODOP.SET_PRINT_STYLE("Bold", 1);
        LODOP.SET_PRINT_STYLE('FontName', 'Microsoft YaHei');
        LODOP.ADD_PRINT_RECT('0mm', '0mm', '98mm', '110mm', 0, 2.82);
        const imgUrl = this.getImgUrl(qtData.cpCLogisticsEcode);
        LODOP.ADD_PRINT_IMAGE(
          '1mm',
          '1mm',
          '30mm',
          '9mm',
          `<img src='${imgUrl}'>`
        ); // （上，右，宽，高，内容）
        LODOP.SET_PRINT_STYLEA(0, 'Stretch', 1);
        LODOP.ADD_PRINT_TEXT('1mm', '31mm', '44mm', '9mm', ''); // （上，右，宽，高，内容）
        LODOP.ADD_PRINT_TEXT('1mm', '75mm', '24mm', '9mm', ''); // （上，右，宽，高，内容）
        LODOP.ADD_PRINT_LINE('10mm', '0mm', '10mm', '100mm', 0, 1);
        // LODOP.SET_PRINT_STYLE("PenStyle", 12);

        LODOP.ADD_PRINT_TEXT('10mm', '1mm', '98mm', '15mm', qtData.bigpen); // （上，右，宽，高，内容）
        LODOP.SET_PRINT_STYLEA(0, 'FontSize', 32);
        LODOP.SET_PRINT_STYLEA(0, 'Bold', 1);
        LODOP.ADD_PRINT_LINE('25mm', '0mm', '25mm', '100mm', 0, 1);

        LODOP.ADD_PRINT_TEXT('22mm', '1mm', '74mm', '10mm', qtData.packagewname); // 向上移动3(for字体)
        LODOP.SET_PRINT_STYLEA(0, 'FontSize', 32);
        LODOP.ADD_PRINT_LINE('25mm', '75mm', '35mm', '75mm', 0, 1);
        // LODOP.ADD_PRINT_BARCODE("25mm", "75mm", "22mm", "8mm", "EAN128A",1381232732);//（上，右，宽，高，内容）
        // LODOP.SET_PRINT_STYLEA(0, "FontSize", 9);
        // LODOP.SET_PRINT_STYLEA(0,"ShowBarText",0);
        // LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
        LODOP.ADD_PRINT_LINE('35mm', '0mm', '35mm', '100mm', 0, 1);

        LODOP.ADD_PRINT_TEXT('39mm', '2mm', '5mm', '18mm', '收件'); // 右移动1 下移动4
        LODOP.SET_PRINT_STYLEA(0, 'FontSize', 8);
        LODOP.ADD_PRINT_LINE('35mm', '6mm', '53mm', '6mm', 0, 1);
        LODOP.ADD_PRINT_TEXT('36mm', '7mm', '69mm', '4mm', qtData.recipient); // 右移动1 下移动1
        LODOP.SET_PRINT_STYLEA(0, 'FontSize', 8);
        LODOP.SET_PRINT_STYLEA(0, 'Bold', 1);
        LODOP.ADD_PRINT_TEXT(
          '40mm',
          '7mm',
          '69mm',
          '14mm',
          qtData.recipientAddress
        ); // 右移动1 下移动1
        LODOP.SET_PRINT_STYLEA(0, 'FontSize', 8);
        LODOP.SET_PRINT_STYLEA(0, 'Bold', 1);
        LODOP.ADD_PRINT_LINE('35mm', '75mm', '53mm', '75mm', 0, 1);
        LODOP.ADD_PRINT_LINE('53mm', '0mm', '53mm', '75mm', 0, 1);
        LODOP.ADD_PRINT_TEXT('55mm', '2mm', '5mm', '12mm', '寄件'); // 右移动1 下移动2
        LODOP.SET_PRINT_STYLEA(0, 'FontSize', 8);
        LODOP.ADD_PRINT_LINE('53mm', '6mm', '65mm', '6mm', 0, 1);
        LODOP.ADD_PRINT_TEXT('54mm', '7mm', '69mm', '4mm', qtData.sender); // 右移动1 下移动1
        LODOP.SET_PRINT_STYLEA(0, 'FontSize', 6);
        LODOP.ADD_PRINT_TEXT('58mm', '7mm', '69mm', '8mm', qtData.senderAddress); // 右移动1 下移动1
        LODOP.SET_PRINT_STYLEA(0, 'FontSize', 6);
        LODOP.ADD_PRINT_LINE('53mm', '75mm', '65mm', '75mm', 0, 1);
        LODOP.ADD_PRINT_LINE('65mm', '0mm', '65mm', '75mm', 0, 1);
        LODOP.ADD_PRINT_TEXT('36mm', '75mm', '24mm', '5mm', '服务'); // 向下移动1
        LODOP.SET_PRINT_STYLEA(0, 'FontSize', 6);
        LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
        LODOP.ADD_PRINT_LINE('40mm', '75mm', '40mm', '99mm', 0, 1);
        LODOP.ADD_PRINT_TEXT('40mm', '75mm', '24mm', '25mm', ''); // （上，右，宽，高，内容）
        LODOP.ADD_PRINT_LINE('65mm', '75mm', '65mm', '100mm', 0, 1);

        LODOP.ADD_PRINT_BARCODE(
          '69mm',
          '1mm',
          '70mm',
          '18mm',
          'EAN128A',
          qtData.logisticNumber
        ); // 向下移动3
        LODOP.SET_PRINT_STYLEA(0, 'HOrient', 2);
        LODOP.SET_PRINT_STYLEA(0, 'FontSize', 10);
        LODOP.ADD_PRINT_LINE('90mm', '0mm', '90mm', '100mm', 0, 1);

        LODOP.ADD_PRINT_TEXT('90mm', '1mm', '44mm', '19mm', ''); // （上，右，宽，高，内容）
        LODOP.SET_PRINT_STYLEA(0, 'FontSize', 6);
        LODOP.ADD_PRINT_LINE('90mm', '45mm', '109mm', '45mm', 0, 1);
        LODOP.ADD_PRINT_TEXT('92mm', '48mm', '35mm', '19mm', '签收人：'); // 向下移动2，右移动3
        LODOP.SET_PRINT_STYLEA(0, 'FontSize', 8);
        LODOP.ADD_PRINT_TEXT('97mm', '48mm', '35mm', '19mm', '时间：'); // 向下移动2，右移动3
        LODOP.SET_PRINT_STYLEA(0, 'FontSize', 8);
        LODOP.ADD_PRINT_LINE('90mm', '80mm', '109mm', '80mm', 0, 1);
        LODOP.ADD_PRINT_TEXT('90mm', '80mm', '19mm', '19mm', ''); // （上，右，宽，高，内容）
        // LODOP.ADD_PRINT_LINE("109mm", "0mm", "109mm", "99mm", 0, 2.82);

        // 下部分
        LODOP.ADD_PRINT_RECT('110mm', '0mm', '98mm', '178mm', 0, 2.82);
        LODOP.ADD_PRINT_IMAGE(
          '111mm',
          '1mm',
          '30mm',
          '14mm',
          `<img src='${imgUrl}'>`
        ); // （上，右，宽，高，内容）
        LODOP.SET_PRINT_STYLEA(0, 'Stretch', 1);
        LODOP.ADD_PRINT_BARCODE(
          '112mm',
          '56mm',
          '40mm',
          '11mm',
          'EAN128A',
          qtData.logisticNumber
        ); // 向下移动1，右移动25
        LODOP.SET_PRINT_STYLEA(0, 'FontSize', 10);
        // LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
        LODOP.ADD_PRINT_LINE('125mm', '0mm', '125mm', '100mm ', 0, 1);

        LODOP.ADD_PRINT_TEXT('127mm', '2mm', '5mm', '12mm', '收件'); // 右移动1 下移动2
        LODOP.SET_PRINT_STYLEA(0, 'FontSize', 8);
        LODOP.ADD_PRINT_LINE('125mm', '6mm', '137mm', '6mm', 0, 1);
        LODOP.ADD_PRINT_TEXT('126mm', '7mm', '74mm', '4mm', qtData.recipient); // 右移动1 下移动1
        LODOP.SET_PRINT_STYLEA(0, 'FontSize', 6);
        LODOP.ADD_PRINT_TEXT(
          '130mm',
          '7mm',
          '74mm',
          '8mm',
          qtData.recipientAddress
        ); // 右移动1 下移动1
        LODOP.SET_PRINT_STYLEA(0, 'FontSize', 6);
        LODOP.ADD_PRINT_LINE('125mm', '80mm', '137mm', '80mm', 0, 1);
        LODOP.ADD_PRINT_LINE('137mm', '0mm', '137mm', '80mm', 0, 1);
        LODOP.ADD_PRINT_TEXT('139mm', '2mm', '5mm', '12mm', '寄件'); // 右移动1 下移动2
        LODOP.SET_PRINT_STYLEA(0, 'FontSize', 8);
        LODOP.ADD_PRINT_LINE('137mm', '6mm', '149mm', '6mm', 0, 1);
        LODOP.ADD_PRINT_TEXT('138mm', '7mm', '74mm', '4mm', qtData.sender); // 右移动1 下移动1
        LODOP.SET_PRINT_STYLEA(0, 'FontSize', 6);
        LODOP.ADD_PRINT_TEXT('142mm', '7mm', '74mm', '8mm', qtData.senderAddress); // 右移动1 下移动1
        LODOP.SET_PRINT_STYLEA(0, 'FontSize', 6);
        LODOP.ADD_PRINT_LINE('137mm', '80mm', '149mm', '80mm', 0, 1);
        LODOP.ADD_PRINT_LINE('149mm', '0mm', '149mm', '100mm', 0, 1);
        LODOP.ADD_PRINT_LINE('149mm', '0mm', '149mm', '100mm', 0, 1);

        LODOP.ADD_PRINT_TEXT('150mm', '2mm', '80mm', '27mm', '商家自定义区'); // 向下移动1 右移动2
        LODOP.SET_PRINT_STYLEA(0, 'FontSize', 8);
        LODOP.SET_PRINT_STYLEA(0, 'Bold', 1);
        LODOP.ADD_PRINT_TEXT('170mm', '80mm', '19mm', '7mm', '已视验'); // （上，右，宽，高，内容）
        LODOP.SET_PRINT_STYLEA(0, 'FontSize', 8);
        LODOP.SET_PRINT_MODE('PRINT_DUPLEX', 1);
      },
      doPrintForJd(LODOP, zyData, formatToday) {
        LODOP.NewPage();
        // LODOP.SET_PRINT_STYLE("FontSize", 12);
        // LODOP.SET_PRINT_STYLE("Bold", 1);
        LODOP.SET_PRINT_STYLE('FontName', 'Century Gothic');
        LODOP.ADD_PRINT_RECT('1mm', '1mm', '96mm', '54mm', 0, 1);

        LODOP.ADD_PRINT_BARCODE(
          '2mm',
          '5mm',
          '92mm',
          '18mm',
          'EAN128A',
          `${zyData.logisticNumber}-1-1-`
        ); //
        LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
        // LODOP.SET_PRINT_STYLEA(0,"HOrient",2);
        LODOP.SET_PRINT_STYLEA(0, 'FontSize', 9);
        LODOP.ADD_PRINT_LINE('21mm', '1mm', '21mm', '97mm', 0, 1);

        LODOP.ADD_PRINT_TEXT(
          '22mm',
          '2mm',
          '47mm',
          '10mm',
          `始发地：${zyData.sourceSortCenterName}`
        ); //
        LODOP.SET_PRINT_STYLEA(0, 'FontSize', 8);
        LODOP.SET_PRINT_STYLEA(0, 'Bold', 1);
        LODOP.ADD_PRINT_TEXT(
          '25mm',
          '2mm',
          '47mm',
          '10mm',
          `${zyData.sourceCrossCode}-${zyData.sourceTabletrolleyCode}`
        ); //
        LODOP.SET_PRINT_STYLEA(0, 'FontSize', 20);
        LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
        LODOP.SET_PRINT_STYLEA(0, 'Bold', 1);
        LODOP.ADD_PRINT_LINE('21mm', '49mm', '33mm', '49mm', 0, 1);
        LODOP.ADD_PRINT_TEXT(
          '22mm',
          '50mm',
          '45mm',
          '10mm',
          `目的地：${zyData.targetSortCenterName}`
        ); //
        LODOP.SET_PRINT_STYLEA(0, 'FontSize', 8);
        LODOP.SET_PRINT_STYLEA(0, 'Bold', 1);
        LODOP.ADD_PRINT_TEXT(
          '25mm',
          '50mm',
          '47mm',
          '10mm',
          `${zyData.slideNo}-${zyData.targetTabletrolleyCode}`
        ); //
        LODOP.SET_PRINT_STYLEA(0, 'FontSize', 20);
        LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
        LODOP.SET_PRINT_STYLEA(0, 'Bold', 1);
        LODOP.ADD_PRINT_LINE('33mm', '1mm', '33mm', '97mm', 0, 1);

        LODOP.ADD_PRINT_LINE('33mm', '8mm', '39mm', '8mm', 0, 1);
        LODOP.ADD_PRINT_TEXT('33mm', '8mm', '44mm', '8mm', zyData.siteName); //
        LODOP.SET_PRINT_STYLEA(0, 'FontSize', 16);
        LODOP.ADD_PRINT_LINE('33mm', '49mm', '39mm', '49mm', 0, 1);
        LODOP.ADD_PRINT_TEXT('33mm', '50mm', '9mm', '8mm', zyData.road); //
        LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
        LODOP.SET_PRINT_STYLEA(0, 'FontSize', 16);
        LODOP.ADD_PRINT_LINE('33mm', '59mm', '39mm', '59mm', 0, 1);
        LODOP.ADD_PRINT_TEXT('33mm', '60mm', '35mm', '8mm', '1/1'); //
        LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
        LODOP.SET_PRINT_STYLEA(0, 'FontSize', 16);
        LODOP.ADD_PRINT_LINE('39mm', '1mm', '39mm', '97mm', 0, 1);

        LODOP.ADD_PRINT_TEXT('39mm', '3mm', '7mm', '16mm', '客户信息');
        LODOP.SET_PRINT_STYLEA(0, 'FontSize', 8);
        LODOP.ADD_PRINT_LINE('39mm', '8mm', '55mm', '8mm', 0, 1);
        LODOP.ADD_PRINT_TEXT('39mm', '9mm', '50mm', '11mm', zyData.recipient);
        LODOP.SET_PRINT_STYLEA(0, 'FontSize', 9);
        LODOP.ADD_PRINT_TEXT(
          '51.5mm',
          '9mm',
          '40mm',
          '5mm',
          `${zyData.receiverName} ${zyData.receiverMobile}`
        );
        LODOP.SET_PRINT_STYLEA(0, 'FontSize', 9);
        LODOP.ADD_PRINT_LINE('39mm', '59mm', '55mm', '59mm', 0, 1);
        LODOP.ADD_PRINT_TEXT('39mm', '61mm', '9mm', '7mm', '客户签字');
        LODOP.SET_PRINT_STYLEA(0, 'FontSize', 8);
        LODOP.ADD_PRINT_LINE('39mm', '69mm', '55mm', '69mm', 0, 1);
        LODOP.ADD_PRINT_TEXT('47mm', '61mm', '9mm', '7mm', '应收金额');
        LODOP.SET_PRINT_STYLEA(0, 'FontSize', 8);

        LODOP.ADD_PRINT_TEXT(
          '49mm',
          '70mm',
          '27mm',
          '8mm',
          `￥${zyData.shouldPayMoney}元`
        );
        LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
        LODOP.SET_PRINT_STYLEA(0, 'FontSize', 10);
        LODOP.ADD_PRINT_LINE('47mm', '59mm', '47mm', '97mm', 0, 1);

        LODOP.ADD_PRINT_TEXT('56mm', '55mm', '20mm', '3mm', formatToday);
        LODOP.SET_PRINT_STYLEA(0, 'FontSize', 6);

        LODOP.ADD_PRINT_RECT('60mm', '1mm', '96mm', '43mm', 0, 1);

        LODOP.ADD_PRINT_TEXT('61mm', '1mm', '96mm', '7mm', zyData.logisticNumber);
        LODOP.SET_PRINT_STYLEA(0, 'FontSize', 13);
        LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
        LODOP.ADD_PRINT_LINE('67mm', '1mm', '67mm', '97mm', 0, 1);

        LODOP.ADD_PRINT_TEXT(
          '67mm',
          '2mm',
          '56mm',
          '4mm',
          `客户信息：${zyData.receiverName} ${zyData.receiverMobile}`
        );
        LODOP.SET_PRINT_STYLEA(0, 'FontSize', 8);
        LODOP.ADD_PRINT_BARCODE(
          '71mm',
          '5mm',
          '54mm',
          '11mm',
          'EAN128A',
          zyData.logisticNumber
        ); //
        LODOP.SET_PRINT_STYLEA(0, 'FontSize', 9);
        LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
        LODOP.ADD_PRINT_LINE('67mm', '59mm', '83mm', '59mm', 0, 1);
        LODOP.ADD_PRINT_TEXT('67mm', '60mm', '10mm', '4mm', '备注');
        LODOP.ADD_PRINT_LINE('83mm', '1mm', '83mm', '97mm', 0, 1);

        LODOP.ADD_PRINT_LINE('83mm', '25mm', '90mm', '25mm', 0, 1);
        LODOP.ADD_PRINT_LINE('83mm', '59mm', '90mm', '59mm', 0, 1);
        LODOP.ADD_PRINT_LINE('83mm', '81mm', '90mm', '81mm', 0, 1);
        LODOP.ADD_PRINT_LINE('90mm', '1mm', '90mm', '97mm', 0, 1);

        LODOP.ADD_PRINT_TEXT(
          '90mm',
          '2mm',
          '56mm',
          '4mm',
          `寄方信息：${zyData.sendAddress}`
        );
        LODOP.ADD_PRINT_TEXT(
          '94mm',
          '2mm',
          '56mm',
          '2mm',
          `${zyData.contactName}${zyData.mobilephoneNum}`
        );
        LODOP.SET_PRINT_STYLEA(0, 'FontSize', 6);
        LODOP.ADD_PRINT_LINE('90mm', '59mm', '97mm', '59mm', 0, 1);
        LODOP.ADD_PRINT_TEXT('90mm', '60mm', '37mm', '6mm', '');
        LODOP.SET_PRINT_STYLEA(0, 'FontSize', 6);
        LODOP.ADD_PRINT_LINE('97mm', '1mm', '97mm', '97mm', 0, 1);

        const warnMsg = '请您确认包裹完好,保留此包裹联时,代表您已经正常签收并确认外包裹完好。http://www.jd-ex.com客服电话:400-603-3600';
        LODOP.ADD_PRINT_TEXT('97.5mm', '1.5mm', '60mm', '5mm', warnMsg);
        LODOP.SET_PRINT_STYLEA(0, 'FontSize', 5);
        LODOP.ADD_PRINT_LINE('97mm', '59mm', '103mm', '59mm', 0, 1);
        LODOP.ADD_PRINT_TEXT(
          '97.5mm',
          '60mm',
          '37mm',
          '5mm',
          zyData.sourceSortCenterName
        );
        LODOP.SET_PRINT_STYLEA(0, 'FontSize', 10);
      },
      doPrint(printer, waybillArray) {
        const self = this;
        const request = this.getRequestObject('print');
        request.task = new Object();
        request.task.taskID = self.getData[0].task.taskID;
        request.task.preview = false;
        request.task.printer = printer;
        const documents = new Array();
        self.getData.map((item) => {
          documents.push(item.task.documents[0]);
        });
        request.task.documents = documents;
        console.log(request);

        // this.websock.send(JSON.stringify(request));
        this.threadPoxi(JSON.stringify(request));
      },
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
      threadPoxi(request) {
        // 实际调用的方法
        // 参数
        const agentData = request;
        // 若是ws开启状态
        if (this.websock.readyState === this.websock.OPEN) {
          this.websocketsend(agentData);
          this.promptInform();
        }
        // 若是 正在开启状态，则等待300毫秒
        else if (this.websock.readyState === this.websock.CONNECTING) {
          const that = this; // 保存当前对象this
          setTimeout(() => {
            that.websocketsend(agentData);
          }, 300);
        }
        // 若未开启 ，则等待500毫秒
        else {
          this.initWebSocket();
          const that = this; // 保存当前对象this
          setTimeout(() => {
            that.websocketsend(agentData);
          }, 500);
        }
      },
      promptInform() {
        const self = this;
        this.btnConfig.buttons[1].disabled = true;
        this.$Modal.info({
          title: '打印',
          content: '正在打印中，请稍后。。。',
          mask: true,
          onOk: () => {
            self.$emit('confirmView');
            this.$emit('closeActionDialog');
          },
        });
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
                            'http://cloudprint.cainiao.com/template/standard/1301',
                        },
                        {
                          data: {
                            Title: '柑子的店铺  7147',
                            table: [
                              {
                                skuSpec: '10kg阳离子交换树脂（SOFT-10S）；',
                                qryOut: 2.0,
                                proModel: null,
                                sku: '190001-0001',
                              },
                              {
                                skuSpec: '一温一开G商用',
                                qryOut: 2.0,
                                proModel: null,
                                sku: '101001-0001',
                              },
                              {
                                skuSpec: '立式电子制冷智能,会销',
                                qryOut: 2.0,
                                proModel: '72',
                                sku: '101011-0002',
                              },
                            ],
                          },
                          templateURL:
                            'http://cloudprint.cainiao.com/template/customArea/9307564/1',
                        },
                      ],
                      documentID: '9479379026',
                    },
                  ],
                  taskID: '3243435f-13b6-4743-96fe-ced57fe2e5f8',
                },
                requestID: '29c24775-0f8b-4ca3-ab54-0d2db32450fb',
                cmd: 'print',
                version: '1.0',
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
                            'http://cloudprint.cainiao.com/template/standard/301',
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
                                sku: '101004-0001',
                              },
                            ],
                          },
                          templateURL:
                            'http://cloudprint.cainiao.com/template/customArea/9249129/1',
                        },
                      ],
                      documentID: '75316549105076',
                    },
                  ],
                  taskID: '98ab7c63-8512-4bb9-b5aa-c86f3c8fd106',
                },
                requestID: '441d6377-1de7-4d45-b2a8-d4fada4d2759',
                cmd: 'print',
                version: '1.0',
              },
            ],
            message: '查询数据成功',
          };
        }
      },
    },
  };
</script>
<style lang="less"></style>

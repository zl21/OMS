import businessButton from 'professionalComponents/businessButton.vue';
import { getLodop } from 'professionalComponents/common/js/LodopFuncs';

export default {
  components: {
    businessButton
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
      type: Number
    },
    tablename: {
      type: String,
      default: () => ''
    },
    selectRowData: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      vmI18n:$i18n,
      btnConfig: {
        typeAll: 'default', // 按钮统一风格样式
        btnsite: 'right', // 按钮位置 (right , center , left)
        loading: false, // 按钮组件是否有loading样式,值为true false
        buttons: [
          {
            text: $i18n.t('other.confirmPrinting'), // 确定打印 按钮文本
            disabled: false,
            btnclick: () => {
              this.print();
            }
          },
          {
            text: $i18n.t('common.cancel'), // 取消 按钮文本
            btnclick: () => {
              this.$emit('closeActionDialog', false);
            } // 按钮点击事件
          }
        ]
      },
      websock: null,

      jsonObject: {
        content: {
          data: {
            recipient: {
              address: {
                city: $i18n.t('other.hzCity'), // 杭州市
                detail: $i18n.t('other.addressDetails0'), // 良睦路999号乐佳国际大厦2号楼小邮局
                district: $i18n.t('other.yhErea'), // 余杭区
                province: $i18n.t('other.zjProvince'), // 浙江省
                town: ''
              },
              mobile: $i18n.t('other.mobile0'), // 13012345678
              name: $i18n.t('other.name'), // 乾宝贝最可爱
              phone: $i18n.t('other.phone0') // 057112345678
            },
            routingInfo: {
              consolidation: {
                name: $i18n.t('common.address.placeName0'), // 杭州
                code: 'hangzhou'
              },
              origin: {
                name: $i18n.t('common.address.placeName0'), // 杭州
                code: 'POSTB'
              },
              sortation: {
                name: $i18n.t('common.address.placeName0') // 杭州
              },
              routeCode: '123A-456-789'
            },
            sender: {
              address: {
                city: $i18n.t('common.address.city1'), // 杭州市
                detail: $i18n.t('common.address.addressDetails1'), // 文一西路1001号阿里巴巴淘宝城5号小邮局
                district: $i18n.t('common.address.erea1'), // 余杭区
                province: $i18n.t('common.address.province1'), // 浙江省
                town: ''
              },
              mobile: $i18n.t('common.address.mobile1'), // 13012345678
              name: $i18n.t('common.address.name'), // 阿里巴巴
              phone: $i18n.t('common.address.phone1') // 057112345678
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
          signature: '19d6f7759487e556ddcdd3d499af087080403277b7deed1a951cc3d9a93c42a7e22ccba94ff609976c5d3ceb069b641f541bc9906098438d362cae002dfd823a8654b2b4f655e96317d7f60eef1372bb983a4e3174cc8d321668c49068071eaea873071ed683dd24810e51afc0bc925b7a2445fdbc2034cdffb12cb4719ca6b7',
          templateURL: 'http://cloudprint.cainiao.com/cloudprint/template/getStandardTemplate.json?template_id=101&version=4'
        }
      },
      num: [
        {
          waybillCode: '0123456789',
          printData: {
            data: '',
            templateURL: 'http://cloudprint.cainiao.com/cloudprint/template/getStandardTemplate.json?template_id=101&version=4'
          },
          objectId: '1'
        }
      ],

      getData: [],
      getJdWjQtData: [],
      getJdWjSfData: [],
      getJdData: [],

      defaultPrinter: ''
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
    async print() {
      const res = await this.service.common.SgOutNoticePrint({ ids: this.idArray });
      const self = this;
      console.log(res);
      if (res.data.code === 0) {
        res.data.data.forEach(data => {
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
            LODOP.PRINT_INITA('0mm', '0mm', '100mm', '180mm', '京东无界通用模板');
            LODOP.SET_PRINT_PAGESIZE(1, '108mm', '188mm', '');
            self.getJdWjQtData.forEach(qtData => {
              self.doPrintForJdWjQt(LODOP, qtData);
            });
          } else if (self.getJdData.length > 0) {
            LODOP.PRINT_INITA('0mm', '0mm', '110mm', '113mm', '京东无界自营模板');
            LODOP.SET_PRINT_PAGESIZE(1, '110mm', '113mm', '');
            self.getJdData.forEach(zyData => {
              self.doPrintForJd(LODOP, zyData, formatToday);
            });
          }
          LODOP.PREVIEW(); // 预览
        }
      } else {
        self.$Message.error(res.data.message);
        self.$emit('closeActionDialog', true);
      }
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
      LODOP.ADD_PRINT_IMAGE('1mm', '1mm', '30mm', '9mm', `<img src='${imgUrl}'>`); // （上，右，宽，高，内容）
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
      LODOP.ADD_PRINT_TEXT('40mm', '7mm', '69mm', '14mm', qtData.recipientAddress); // 右移动1 下移动1
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

      LODOP.ADD_PRINT_BARCODE('69mm', '1mm', '70mm', '18mm', 'EAN128A', qtData.logisticNumber); // 向下移动3
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
      LODOP.ADD_PRINT_IMAGE('111mm', '1mm', '30mm', '14mm', `<img src='${imgUrl}'>`); // （上，右，宽，高，内容）
      LODOP.SET_PRINT_STYLEA(0, 'Stretch', 1);
      LODOP.ADD_PRINT_BARCODE('112mm', '56mm', '40mm', '11mm', 'EAN128A', qtData.logisticNumber); // 向下移动1，右移动25
      LODOP.SET_PRINT_STYLEA(0, 'FontSize', 10);
      // LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
      LODOP.ADD_PRINT_LINE('125mm', '0mm', '125mm', '100mm ', 0, 1);

      LODOP.ADD_PRINT_TEXT('127mm', '2mm', '5mm', '12mm', '收件'); // 右移动1 下移动2
      LODOP.SET_PRINT_STYLEA(0, 'FontSize', 8);
      LODOP.ADD_PRINT_LINE('125mm', '6mm', '137mm', '6mm', 0, 1);
      LODOP.ADD_PRINT_TEXT('126mm', '7mm', '74mm', '4mm', qtData.recipient); // 右移动1 下移动1
      LODOP.SET_PRINT_STYLEA(0, 'FontSize', 6);
      LODOP.ADD_PRINT_TEXT('130mm', '7mm', '74mm', '8mm', qtData.recipientAddress); // 右移动1 下移动1
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

      LODOP.ADD_PRINT_BARCODE('2mm', '5mm', '92mm', '18mm', 'EAN128A', `${zyData.logisticNumber}-1-1-`); //
      LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
      // LODOP.SET_PRINT_STYLEA(0,"HOrient",2);
      LODOP.SET_PRINT_STYLEA(0, 'FontSize', 9);
      LODOP.ADD_PRINT_LINE('21mm', '1mm', '21mm', '97mm', 0, 1);

      LODOP.ADD_PRINT_TEXT('22mm', '2mm', '47mm', '10mm', `始发地：${zyData.sourceSortCenterName}`); //
      LODOP.SET_PRINT_STYLEA(0, 'FontSize', 8);
      LODOP.SET_PRINT_STYLEA(0, 'Bold', 1);
      LODOP.ADD_PRINT_TEXT('25mm', '2mm', '47mm', '10mm', `${zyData.sourceCrossCode}-${zyData.sourceTabletrolleyCode}`); //
      LODOP.SET_PRINT_STYLEA(0, 'FontSize', 20);
      LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
      LODOP.SET_PRINT_STYLEA(0, 'Bold', 1);
      LODOP.ADD_PRINT_LINE('21mm', '49mm', '33mm', '49mm', 0, 1);
      LODOP.ADD_PRINT_TEXT('22mm', '50mm', '45mm', '10mm', `目的地：${zyData.targetSortCenterName}`); //
      LODOP.SET_PRINT_STYLEA(0, 'FontSize', 8);
      LODOP.SET_PRINT_STYLEA(0, 'Bold', 1);
      LODOP.ADD_PRINT_TEXT('25mm', '50mm', '47mm', '10mm', `${zyData.slideNo}-${zyData.targetTabletrolleyCode}`); //
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
      LODOP.ADD_PRINT_TEXT('51.5mm', '9mm', '40mm', '5mm', `${zyData.receiverName} ${zyData.receiverMobile}`);
      LODOP.SET_PRINT_STYLEA(0, 'FontSize', 9);
      LODOP.ADD_PRINT_LINE('39mm', '59mm', '55mm', '59mm', 0, 1);
      LODOP.ADD_PRINT_TEXT('39mm', '61mm', '9mm', '7mm', '客户签字');
      LODOP.SET_PRINT_STYLEA(0, 'FontSize', 8);
      LODOP.ADD_PRINT_LINE('39mm', '69mm', '55mm', '69mm', 0, 1);
      LODOP.ADD_PRINT_TEXT('47mm', '61mm', '9mm', '7mm', '应收金额');
      LODOP.SET_PRINT_STYLEA(0, 'FontSize', 8);

      LODOP.ADD_PRINT_TEXT('49mm', '70mm', '27mm', '8mm', `￥${zyData.shouldPayMoney}元`);
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

      LODOP.ADD_PRINT_TEXT('67mm', '2mm', '56mm', '4mm', `客户信息：${zyData.receiverName} ${zyData.receiverMobile}`);
      LODOP.SET_PRINT_STYLEA(0, 'FontSize', 8);
      LODOP.ADD_PRINT_BARCODE('71mm', '5mm', '54mm', '11mm', 'EAN128A', zyData.logisticNumber); //
      LODOP.SET_PRINT_STYLEA(0, 'FontSize', 9);
      LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
      LODOP.ADD_PRINT_LINE('67mm', '59mm', '83mm', '59mm', 0, 1);
      LODOP.ADD_PRINT_TEXT('67mm', '60mm', '10mm', '4mm', '备注');
      LODOP.ADD_PRINT_LINE('83mm', '1mm', '83mm', '97mm', 0, 1);

      LODOP.ADD_PRINT_LINE('83mm', '25mm', '90mm', '25mm', 0, 1);
      LODOP.ADD_PRINT_LINE('83mm', '59mm', '90mm', '59mm', 0, 1);
      LODOP.ADD_PRINT_LINE('83mm', '81mm', '90mm', '81mm', 0, 1);
      LODOP.ADD_PRINT_LINE('90mm', '1mm', '90mm', '97mm', 0, 1);

      LODOP.ADD_PRINT_TEXT('90mm', '2mm', '56mm', '4mm', `寄方信息：${zyData.sendAddress}`);
      LODOP.ADD_PRINT_TEXT('94mm', '2mm', '56mm', '2mm', `${zyData.contactName}${zyData.mobilephoneNum}`);
      LODOP.SET_PRINT_STYLEA(0, 'FontSize', 6);
      LODOP.ADD_PRINT_LINE('90mm', '59mm', '97mm', '59mm', 0, 1);
      LODOP.ADD_PRINT_TEXT('90mm', '60mm', '37mm', '6mm', '');
      LODOP.SET_PRINT_STYLEA(0, 'FontSize', 6);
      LODOP.ADD_PRINT_LINE('97mm', '1mm', '97mm', '97mm', 0, 1);

      const warnMsg = '请您确认包裹完好,保留此包裹联时,代表您已经正常签收并确认外包裹完好。http://www.jd-ex.com客服电话:400-603-3600';
      LODOP.ADD_PRINT_TEXT('97.5mm', '1.5mm', '60mm', '5mm', warnMsg);
      LODOP.SET_PRINT_STYLEA(0, 'FontSize', 5);
      LODOP.ADD_PRINT_LINE('97mm', '59mm', '103mm', '59mm', 0, 1);
      LODOP.ADD_PRINT_TEXT('97.5mm', '60mm', '37mm', '5mm', zyData.sourceSortCenterName);
      LODOP.SET_PRINT_STYLEA(0, 'FontSize', 10);
    },
    // doPrint(printer, waybillArray) {
    doPrint(printer) {
      const self = this;
      const request = this.getRequestObject('print');
      request.task = {};
      request.task.taskID = self.getData[0].task.taskID;
      request.task.preview = false;
      request.task.printer = printer;
      const documents = [];
      self.getData.forEach(item => {
        documents.push(item.task.documents[0]);
      });
      request.task.documents = documents;
      console.log(request);

      // this.websock.send(JSON.stringify(request));
      this.threadPoxi(JSON.stringify(request));
    },
    // getWaybillJson(waybillNO) {
    getWaybillJson() {
      // 获取waybill对应的json object，此处的ajaxGet函数是伪代码
      // var jsonObject = {jiade:1234}// ajaxGet(waybillNO);
      return this.jsonObject;
    },
    // getCustomAreaData(waybillNO) {
    getCustomAreaData() {
      // 获取waybill对应的自定义区的JSON object，此处的ajaxGet函数是伪代码
      // var jsonObject = {jiade:1234}//ajaxGet(waybillNO);
      const ret = {};
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
      this.websock.onopen = () => {
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
      const request = {};
      request.requestID = this.getUUID(8, 16);
      request.version = '1.0';
      request.cmd = cmd;
      return request;
    },
    getUUID(len, radix) {
      const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
      const uuid = [];
      let i;
      radix = radix || chars.length;
      if (len) {
        // eslint-disable-next-line no-bitwise
        for (i = 0; i < len; i++) uuid[i] = chars[0 | (Math.random() * radix)];
      } else {
        let r;
        uuid[8] = '-';
        uuid[13] = '-';
        uuid[18] = '-';
        uuid[23] = '-';
        uuid[14] = '4';
        for (i = 0; i < 36; i++) {
          if (!uuid[i]) {
            // eslint-disable-next-line no-bitwise
            r = 0 | (Math.random() * 16);
            // eslint-disable-next-line no-bitwise
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
      } else if (this.websock.readyState === this.websock.CONNECTING) {
        // 若是 正在开启状态，则等待300毫秒
        const that = this; // 保存当前对象this
        setTimeout(() => {
          that.websocketsend(agentData);
        }, 300);
      } else {
        // 若未开启 ，则等待500毫秒
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
        className: 'ark-dialog',
        title: $i18n.t('other.printing'), // 打印
        content: $i18n.t('modalTips.ca'), // 正在打印中，请稍后。。。
        mask: true,
        onOk: () => {
          self.$emit('confirmView');
          this.$emit('closeActionDialog');
        }
      });
    }
  }
};

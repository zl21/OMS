import buttons from 'professionalComponents/businessButton.vue';
import Aform from 'professionalComponents/businessForm.vue';
import Atable from 'professionalComponents/businessActionTable.vue';
import jordanModal from 'professionalComponents/businessDialog';
import axios from 'axios';

export default {
  // inject: ['reload'],
  components: {
    buttons,
    Atable,
    Aform,
    jordanModal
  },
  data() {
    return {
      IMAGE: '', // 扫描图片
      load: true,
      clean: false, // 清空提示框
      go_home: false, // 返回提示
      watermark_src: '', // 水印路径
      notScanModal: {
        modal1: false, // 未扫描商品弹框
        mask: true,
        footerHide: true, // 不显示底部
      },

      // 总模块公共数据
      tab: 'tab1',
      isActive: 0,
      ID: -1, // 单据id
      importTable: {
        refFuns: 'confirmFun',
        confirmTitle: '导入',
        titleAlign: 'center', // 设置标题是否居中 center left
        width: '600',
        scrollable: false, // 是否可以滚动
        closable: true, // 是否可以按esc关闭
        draggable: true, // 是否可以拖动
        mask: true, // 是否显示遮罩层
        maskClosable: true, // 是否可以点击叉号关闭
        transfer: true, // 是否将弹层放在body内
        name: 'importTable', // 组件名称
        url: 'importTable',
        keepAlive: true,
        excludeString: 'importTable', // 将name传进去，确认不缓存
        componentData: {}
      },
      notScanData: {
        isShowSelection: false,
        indexColumn: false,
        // indexColumn: true,
        height: 300,
        columns: [
          {
            title: '未拣货数量',
            key: 'QTY_DIFF',
            align: 'center'
          },
          {
            title: '通知数',
            key: 'QTY_NOTICE',
            align: 'center'
          },
          {
            title: '已拣货数',
            key: 'QTY_OUT',
            align: 'center'
          },
          {
            title: '箱号',
            key: 'PS_C_TEUS_ECODE',
            align: 'center'
          },
          {
            title: '商品编码',
            key: 'PS_C_PRO_ECODE',
            align: 'center'
          },
          {
            title: '条码',
            key: 'PS_C_SKU_ECODE',
            align: 'center'
          },
          {
            title: '国标码',
            key: 'GBCODE',
            align: 'center'
          },
          // {
          //   title: "商品名称",
          //   key: "PS_C_PRO_ENAME",
          //   align: "center"
          // },
          // {
          //   title: "颜色",
          //   key: "PS_C_SPEC1_ENAME",
          //   align: "center"
          // },
          // {
          //   title: "尺寸",
          //   key: "PS_C_SPEC2_ENAME",
          //   align: "center"
          // },
        ],
        data: [],
        init_data: [],
      }, // 未扫描商品
      // 扫描出库模块数据
      scanOutbound: {
        delArr: [], // 删除选中数据
        modal2: false,
        warnModal: false,
        warnMessage: '',
        i: '', // 当前删除箱的位置
        scanWork: { // 扫描作业数据模块
          scanNum: 1, // 扫描数量
          scanProduce: '', // 商品扫描
          message: '', // 提示信息
          isAllowPart: ''
        },
        workRTK: { // 作业试试动态数据模块
          init_total: 0, // 存储最初状态扫描数量
          init_unscanCount: 0, // 最初状态未扫描数
          total: 0, // 总数
          scanCount: 0, // 已扫描数
          unscanCount: 0 // 未扫描数
        },

        btnConfig: { // 按钮配置
          typeAll: 'error',
          buttons: [
            {
              text: '刷新',
              btnclick: () => {
                // this.reload();
              }
            },
            {
              text: '保存',
              btnclick: () => {
                const self = this;
                self.save();
              }
            },
            {
              text: '审核',
              btnclick: () => {
                const self = this;
                self.audit();
              }
            },
            {
              text: '清空',
              btnclick: () => {
                // this.getAllData();
                const self = this;
                if (self.pickOrder.logFormConfig.formValue.BILL_STATUS == '已审核') {
                  self.$Message.warning('已审核订单不允许清空');
                  return;
                } if (self.pickOrder.logFormConfig.formValue.BILL_STATUS == '已作废') {
                  self.$Message.warning('已作废订单不允许清空');
                  return;
                }
                this.clean = true;
              }
            },
            {
              text: '查看未扫描商品',
              btnclick: () => {
                this.notScanModal.modal1 = true;
              }
            },
            // {
            //     text:'导入',
            //     btnclick:()=>{
            //         console.log('保存')
            //     }
            // },
            {
              text: '返回',
              btnclick: () => {
                this.go_home = true;
              }
            }
          ]
        },
        jordanTableConfig: {
          isShowSelection: true,
          indexColumn: true,
          isShowImportBtn: false, // 受否显示导入按钮
          isShowDeleteDetailBtn: true, // 受否显示删除按钮
          // pageShow:true,
          height: 300,
          columns: [
            // {
            //   title: "图片",
            //   key: "IMAGE",
            //   align: "center",
            //   render: (h, params) => {
            //     console.log(params);
            //     return h(
            //       "img", {
            //       style: {
            //         height: '27px'
            //       },
            //       attrs: {
            //         src: params.row.IMAGE ? JSON.parse(params.row.IMAGE)[0].URL : '',
            //       }
            //     }
            //     )
            //   }
            // },
            {
              title: '是否箱',
              key: 'IS_TEUS',
              align: 'center'
            },
            {
              title: '箱号',
              key: 'PS_C_TEUS_ECODE',
              align: 'center'
            },
            {
              title: '条码',
              key: 'PS_C_SKU_ECODE',
              align: 'center'
            },
            {
              title: '国标码',
              key: 'GBCODE',
              align: 'center'
            },
            // {
            //   title: "配码",
            //   key: "PS_C_MATCHSIZE_ENAME",
            //   align: "center"
            // },
            {
              title: '商品编码',
              key: 'PS_C_PRO_ECODE',
              align: 'center'
            },
            // {
            //   title: "商品名称",
            //   key: "PS_C_PRO_ENAME",
            //   align: "center"
            // },
            // {
            //   title: "颜色",
            //   key: "PS_C_SPEC1_ENAME",
            //   align: "center"
            // },
            // {
            //   title: "尺寸",
            //   key: "PS_C_SPEC2_ENAME",
            //   align: "center"
            // },
            {
              title: '扫描数量',
              key: 'QTY_TEUS',
              align: 'center'
            },
          ],
          data: []
        },
        scanJob: {
          addOrSub: 'add'
        },
        boxs: [ // 箱
          {
            boxName: '1号箱', // 箱号
            id: 1,
            detail: [],
          }
        ],
        baseInfo: {
          BILL_NO: '', // 拣货单号
          BILL_DATE: '', // 单据日期
          CP_C_DEST_ENAME: '', // 收货方
          CP_C_ORIG_ENAME: '', // 发货方
          REMARK: '', // 备注
        },
        currentBox: 1, // 当前选中的箱
      },
      // 拣货单模块数据
      pickOrder: {
        tableTab: 'pickDetail',

        btnConfig: { // 按钮配置
          typeAll: 'error',
          buttons: [
            {
              text: '保存',
              btnclick: () => {
                console.log('保存');
              }
            },
            {
              text: '刷新',
              btnclick: () => {
                // this.reload();
              }
            },
            {
              text: '返回',
              btnclick: () => {
                this.go_home = true;
              }
            }
          ]
        },
        pickDetail: {
          isShowSelection: false,
          indexColumn: true,
          height: 300,
          columns: [
            {
              title: '是否箱',
              key: 'IS_TEUS',
              align: 'center'
            },
            {
              title: '箱号',
              key: 'PS_C_TEUS_ECODE',
              align: 'center'
            },
            {
              title: '条码',
              key: 'PS_C_SKU_ECODE',
              align: 'center'
            },
            {
              title: '国标码',
              key: 'GBCODE',
              align: 'center'
            },
            {
              title: '商品编码',
              key: 'PS_C_PRO_ECODE',
              align: 'center'
            },
            {
              title: '配码',
              key: 'PS_C_MATCHSIZE_ENAME',
              align: 'center'
            },
            {
              title: '商品名称',
              key: 'PS_C_PRO_ENAME',
              align: 'center'
            },
            {
              title: '颜色',
              key: 'PS_C_SPEC1_ENAME',
              align: 'center'
            },
            {
              title: '尺寸',
              key: 'PS_C_SPEC2_ENAME',
              align: 'center'
            },
            {
              title: '吊牌价',
              key: 'PRICE_LIST',
              align: 'center'
            },
            {
              title: '通知数量',
              key: 'QTY_NOTICE',
              align: 'center'
            },
            {
              title: '已拣货数量',
              key: 'QTY_OUT',
              align: 'center'
            },
            {
              title: '未拣货数量',
              key: 'QTY_DIFF',
              align: 'center'
            },
          ],
          data: []
        },
        sourceNotification: {
          isShowSelection: false,
          indexColumn: true,
          height: 300,
          columns: [
            {
              title: '出库通知单号',
              key: 'NOTICE_BILL_NO',
              align: 'center'
            },
            {
              title: '实体仓',
              key: 'CP_C_PHY_WAREHOUSE_ENAME',
              align: 'center'
            },
            {
              title: '收货方名称',
              key: 'CP_C_PHY_WAREHOUSE_DEST_ENAME',
              align: 'center'
            },
            {
              title: '单据日期',
              key: 'BILL_DATE',
              align: 'center'
            },
          ],
          data: []
        },
        binningDetail: {
          isShowSelection: false,
          indexColumn: true,
          height: 300,
          columns: [

            {
              title: '拣货箱号',
              key: 'PICK_OUT_TEUS_ID',
              align: 'center'
            },
            {
              title: '箱号',
              key: 'PS_C_TEUS_ECODE',
              align: 'center'
            },
            {
              title: '商品编码',
              key: 'PS_C_PRO_ECODE',
              align: 'center'
            },
            {
              title: '条码',
              key: 'PS_C_SKU_ECODE',
              align: 'center'
            },
            {
              title: '国标码',
              key: '',
              align: 'center'
            },
            {
              title: '商品名称',
              key: 'PS_C_PRO_ENAME',
              align: 'center'
            },
            {
              title: '颜色',
              key: 'PS_C_SPEC1_ENAME',
              align: 'center'
            },
            {
              title: '尺寸',
              key: 'PS_C_SPEC2_ENAME',
              align: 'center'
            },
            {
              title: '装箱数量',
              key: 'QTY_TEUS',
              align: 'center'
            },
          ],
          data: []
        },
        entryNotice: {
          isShowSelection: false,
          indexColumn: true,
          height: 300,
          columns: [
            {
              title: '出库结果单号',
              key: 'BILL_NO',
              align: 'center'
            },
            {
              title: '实体仓',
              key: 'CP_C_PHY_WAREHOUSE_ENAME',
              align: 'center'
            },
            {
              title: '收货方名称',
              key: 'CP_C_PHY_WAREHOUSE_DEST_ENAME',
              align: 'center'
            },
            {
              title: '单据日期',
              key: 'BILL_DATE',
              align: 'center'
            },
          ],
          data: []
        },
        value1: '1',
        formConfig: {
          formData: [
            {
              style: 'input',
              label: '拣货单号',
              value: 'BILL_NO',
              dataAcessKey: 'SHIP_AMT',
              disabled: true,
              width: '6'
            },
            {
              style: 'input',
              label: '发货方',
              value: 'CP_C_ORIG_ENAME',
              dataAcessKey: 'SHIP_AMT',
              disabled: true,
              width: '6'
            },
            {
              style: 'input',
              label: '收货方',
              value: 'CP_C_DEST_ENAME',
              dataAcessKey: 'SHIP_AMT',
              disabled: true,
              width: '6'
            },
            {
              style: 'input',
              label: '备注',
              value: 'REMARK',
              dataAcessKey: 'SHIP_AMT',
              disabled: false,
              width: '6'
            }
          ],
          formValue: {
            BILL_NO: '', // 拣货单号
            CP_C_DEST_ENAME: '', // 收货方
            CP_C_ORIG_ENAME: '', // 发货方
            REMARK: '', // 备注
          }
        },
        logFormConfig: {
          formData: [
            {
              style: 'input',
              label: '单据状态',
              value: 'BILL_STATUS',
              dataAcessKey: 'SHIP_AMT',
              disabled: true,
              width: '6'
            },
            {
              style: 'input',
              label: '审核人',
              value: 'STATUS_NAME',
              dataAcessKey: 'SHIP_AMT',
              disabled: true,
              width: '6'
            },
            {
              style: 'input',
              label: '审核时间',
              value: 'STATUS_TIME',
              dataAcessKey: 'SHIP_AMT',
              disabled: true,
              width: '6'
            },
            // {
            //   style: "input",
            //   label: "打印人",
            //   value: "",
            //   dataAcessKey: "SHIP_AMT",
            //   disabled: true,
            //   width: "6"
            // },
            // {
            //   style: "input",
            //   label: "打印时间",
            //   value: "",
            //   dataAcessKey: "SHIP_AMT",
            //   disabled: true,
            //   width: "6"
            // },
            {
              style: 'input',
              label: '创建人',
              value: 'OWNERNAME',
              dataAcessKey: 'SHIP_AMT',
              disabled: true,
              width: '6'
            },
            {
              style: 'input',
              label: '创建时间',
              value: 'CREATIONDATE',
              dataAcessKey: 'SHIP_AMT',
              disabled: true,
              width: '6'
            },
            {
              style: 'input',
              label: '作废人',
              value: 'DELER_NAME',
              dataAcessKey: 'SHIP_AMT',
              disabled: true,
              width: '6'
            },
            {
              style: 'input',
              label: '作废时间',
              value: 'DEL_TIME',
              dataAcessKey: 'SHIP_AMT',
              disabled: true,
              width: '6'
            },
            {
              style: 'input',
              label: '修改人',
              value: 'MODIFIERNAME',
              dataAcessKey: 'SHIP_AMT',
              disabled: true,
              width: '6'
            },
            {
              style: 'input',
              label: '修改时间',
              value: 'MODIFIEDDATE',
              dataAcessKey: 'SHIP_AMT',
              disabled: true,
              width: '6'
            }
          ],
          formValue: {
            BILL_STATUS: '', // 单据状态
            STATUS_NAME: '', // 审核人
            STATUS_TIME: '', // 审核时间
            CREATIONDATE: '', // 创建时间
            OWNERNAME: '', // 创建人
            DEL_TIME: '', // 作废时间
            DELER_NAME: '', // 作废人
            MODIFIERNAME: '', // 修改人
            MODIFIEDDATE: '', // 修改时间
          }
        }
      }
    };
  },
  mounted() {
    this.getAllData();
  },
  computed: {
    orderID() {
      return Number(this.$route.query.id);
    }
  },
  methods: {
    fm_one() {
      const myAudio = document.getElementById('fm01');
      myAudio.play();
    },
    error_one() {
      const myAudio = document.getElementById('error01');
      myAudio.play();
    },
    initScanNum(val) {
      console.log(val.target.value);
      if (Number(val.target.value) <= 0) {
        this.scanOutbound.scanWork.scanNum = 0;
      }
    },
    warnKeyDown(key) {
      if (key.keyCode === 32) {
        this.scanOutbound.warnModal = false;
        setTimeout(() => {
          this.$refs.proScanText.focus();
        }, 200);
      }
    },
    ok_home() {
      this.$store.commit('customize/TabHref', {
        id: 249130125,
        type: 'table',
        name: 'SG_B_OUT_PICKORDER',
        label: '出库拣货单',
        back: true,
      });
    },
    notScanKeyDown(key) {
      if (key.keyCode === 27) {
        this.notScanModal.modal1 = false;
      }
    },
    ok_clean() {
      // this.reload();
      const self = this;
      self.scanOutbound.boxs = [];
      self.$nextTick(() => {
        self.scanOutbound.workRTK.unscanCount = self.scanOutbound.workRTK.unscanCount + self.scanOutbound.workRTK.scanCount;
        // self.scanOutbound.workRTK.total = self.scanOutbound.workRTK.init_total;
        // self.notScanData.data = JSON.parse(JSON.stringify(self.notScanData.init_data));
        self.notScanData.data.map((item) => {
          item.QTY_DIFF += item.QTY_OUT;
          item.QTY_OUT = 0;
        });
        const xiang = {
          boxName: '1号箱',
          id: 1,
          detail: [],
        };
        self.scanOutbound.boxs.push(xiang);
        self.scanOutbound.workRTK.scanCount = 0;
        self.scanOutbound.currentBox = 1;
        self.isActive = 1;
        self.scanOutbound.jordanTableConfig.data = self.scanOutbound.boxs[0].detail;
        self.scanOutbound.scanWork.scanProduce = '';
        self.IMAGE = '';
      });
    },
    onclick(v) {
      console.log(v);
    },
    onTableTab(v) { // 拣货单tabs切换方法
      // if(v !== "logInfo") {
      // }

    },
    radioChange(v) {
      this.scanOutbound.scanJob.addOrSub = v;
      console.log(this.scanOutbound.scanJob.addOrSub);
    },
    addBox() { // 新增箱操作
      const self = this;
      const length = self.scanOutbound.boxs.length - 1;
      self.scanOutbound.boxs.push({
        boxName: `${self.scanOutbound.boxs[length].id + 1}号箱`,
        id: self.scanOutbound.boxs[length].id + 1,
        detail: []
      });
    },
    subBox(i) { // 删除箱操作
      const self = this;
      if (self.scanOutbound.boxs.length == 1) {
        self.$Message.warning('最后一箱，不允许删除!');
      } else {
        self.scanOutbound.modal2 = true;
        self.scanOutbound.i = i;
      }
    },
    ok() {
      const self = this;
      const i = self.scanOutbound.i;
      if (self.scanOutbound.boxs.length !== 1) {
        self.scanOutbound.boxs.splice(i, 1);
      }
      self.isActive = self.scanOutbound.boxs[0].id;
      self.scanOutbound.currentBox = self.scanOutbound.boxs[0].id;
      self.scanOutbound.jordanTableConfig.data = self.scanOutbound.boxs[0].detail;
    },
    currentBox(i) { // 选中当前箱
      const self = this;
      self.scanOutbound.delArr = [];
      self.scanOutbound.currentBox = self.scanOutbound.boxs[i].id;
      self.isActive = self.scanOutbound.boxs[i].id;
      // 将选中箱的箱明细数据赋值给表格
      self.scanOutbound.jordanTableConfig.data = self.scanOutbound.boxs[i].detail;
    },
    // 出库拣货单查询方法
    getAllData() {
      /**
       * sgBInPickorderTeusItemList 装箱明细
         sgBInPickorderItemList 拣货明细
         sgBInPickorder 入库拣货单主表
       */
      const self = this;
      const formdata = new FormData();
      formdata.append('objid', this.orderID);
      axios({
        method: 'post',
        url: ' /p/cs/sg/v1/warehouse/sgBOutPickorder/querySgBOutPickorder',
        data: formdata
      }).then((res) => {
        console.log(res);
        if (res.data.code === 0) {
          res.data.data.sgBOutPickorderItemList.map((item) => { // 计算总数
            self.scanOutbound.workRTK.total = self.scanOutbound.workRTK.total + item.QTY_NOTICE;
            self.scanOutbound.workRTK.scanCount = self.scanOutbound.workRTK.scanCount + item.QTY_OUT;
          });
          self.scanOutbound.workRTK.init_total = self.scanOutbound.workRTK.total;
          self.scanOutbound.workRTK.unscanCount = self.scanOutbound.workRTK.total - self.scanOutbound.workRTK.scanCount; // 计算未扫描数量
          self.scanOutbound.workRTK.init_unscanCount = self.scanOutbound.workRTK.total - self.scanOutbound.workRTK.scanCount; // 计算未扫描数量
          self.notScanData.data = JSON.parse(JSON.stringify(res.data.data.sgBOutPickorderItemList)); // 赋值未扫描商品明细
          self.notScanData.init_data = JSON.parse(JSON.stringify(res.data.data.sgBOutPickorderItemList)); // 最初值赋值未扫描商品明细
          self.setData(JSON.parse(JSON.stringify(res.data.data.sgBOutPickorder)));
          self.setPickOrder(JSON.parse(JSON.stringify(res.data.data.sgBOutPickorderItemList)));
          self.setBinningDetail(JSON.parse(JSON.stringify(res.data.data.sgBOutPickorderTeusItemList)));
          self.setSourceNotification(JSON.parse(JSON.stringify(res.data.data.sgBOutPickorderNoticeItemList))); // 来源出库通知单
          self.setEntryNotice(JSON.parse(JSON.stringify(res.data.data.sgBOutPickorderResultItemList))); // 来源出库结果单
          self.setTeusDetail(JSON.parse(JSON.stringify(res.data.data.sgBOutPickorderTeusItemList)));
        } else {
          self.$Message.error(res.data.message);
        }
      });
    },
    // 单据信息赋值
    setData(res) {
      const self = this;
      // 基础信息赋值
      self.scanOutbound.baseInfo.BILL_NO = res.BILL_NO; // 拣货单号
      self.scanOutbound.baseInfo.BILL_DATE = res.BILL_DATE; // 单据日期
      self.scanOutbound.baseInfo.CP_C_DEST_ENAME = res.CP_C_DEST_ENAME; // 发货方
      self.scanOutbound.baseInfo.CP_C_ORIG_ENAME = res.CP_C_ORIG_ENAME; // 收货方
      self.scanOutbound.baseInfo.REMARK = res.REMARK; // 备注

      // 拣货单表单数据赋值
      self.pickOrder.formConfig.formValue.BILL_NO = res.BILL_NO; // 拣货单号
      self.pickOrder.formConfig.formValue.CP_C_DEST_ENAME = res.CP_C_DEST_ENAME; // 发货方
      self.pickOrder.formConfig.formValue.CP_C_ORIG_ENAME = res.CP_C_ORIG_ENAME; // 收货方
      self.pickOrder.formConfig.formValue.REMARK = res.REMARK; // 备注

      // 扫描作业赋值
      self.scanOutbound.scanWork.isAllowPart = res.IS_ALLOW_PART === 'Y';

      // 拣货单日志信息赋值
      if (res.BILL_STATUS == 1) {
        self.pickOrder.logFormConfig.formValue.BILL_STATUS = '未审核';
        self.setItemTableOperation('on');
        // self.watermark_src = '../../../../static/img/watermark/uncheck.png'
      } else if (res.BILL_STATUS == 2) {
        self.setItemTableOperation('off');
        self.pickOrder.logFormConfig.formValue.BILL_STATUS = '已审核';
        self.watermark_src = '../../../../static/img/watermark/checked.png';
      } else if (res.BILL_STATUS == 3) {
        self.setItemTableOperation('off');
        self.pickOrder.logFormConfig.formValue.BILL_STATUS = '已作废';
        self.watermark_src = '../../../../static/img/watermark/void.png';
      }
      self.pickOrder.logFormConfig.formValue.STATUS_NAME = res.STATUS_NAME; // 审核人
      self.pickOrder.logFormConfig.formValue.STATUS_TIME = self.toDate(res.STATUS_TIME); // 审核时间
      self.pickOrder.logFormConfig.formValue.CREATIONDATE = self.toDate(res.CREATIONDATE); // 创建时间
      self.pickOrder.logFormConfig.formValue.OWNERNAME = res.OWNERNAME; // 创建人
      self.pickOrder.logFormConfig.formValue.DEL_TIME = self.toDate(res.DEL_TIME); // 作废时间
      self.pickOrder.logFormConfig.formValue.DELER_NAME = res.DELER_NAME; // 作废人
      self.pickOrder.logFormConfig.formValue.MODIFIERNAME = res.MODIFIERNAME; // 修改人
      self.pickOrder.logFormConfig.formValue.MODIFIEDDATE = self.toDate(res.MODIFIEDDATE); // 修改时间

      self.ID = res.ID;
    },
    setItemTableOperation(switchType) {
      if (switchType === 'on') {
        this.scanOutbound.jordanTableConfig.isShowImportBtn = false;
        this.scanOutbound.jordanTableConfig.isShowDeleteDetailBtn = true;
      } else {
        this.scanOutbound.jordanTableConfig.isShowImportBtn = false;
        this.scanOutbound.jordanTableConfig.isShowDeleteDetailBtn = false;
      }
    },
    // 拣货单-->拣货明细表格赋值
    setPickOrder(res) {
      const self = this;
      // 映射部分数据
      console.log(res);
      res.map((item) => {
        if (item.IS_TEUS == 0) {
          item.IS_TEUS = 'x';
        } else if (item.IS_TEUS == 1) {
          item.IS_TEUS = '√';
        }
      });
      self.pickOrder.pickDetail.data = res;
    },
    // 拣货单-->装箱明细表格赋值
    setBinningDetail(res) {
      const self = this;
      self.pickOrder.binningDetail.data = res;
    },
    // 来源出库通知单
    setSourceNotification(res) {
      const self = this;
      res.map((item) => {
        item.BILL_DATE = self.toDate(item.BILL_DATE);
      });
      self.pickOrder.sourceNotification.data = res;
    },
    // 来源出库结果单
    setEntryNotice(res) {
      const self = this;
      res.map((item) => {
        item.BILL_DATE = self.toDate(item.BILL_DATE);
      });
      self.pickOrder.entryNotice.data = res;
    },
    // 扫描出库-->箱明细,将明细装箱
    setTeusDetail(res) {
      const self = this;
      const tues = [];
      res.map((item) => {
        // 映射箱号
        if (item.IS_TEUS == 0) {
          item.IS_TEUS = 'x';
        } else {
          item.IS_TEUS = '√';
        }
        if (tues.indexOf(item.PICK_OUT_TEUS_ID) == -1) {
          tues.push(item.PICK_OUT_TEUS_ID);
        }
      });
      tues.sort();
      // 生成箱
      const boxs = [];
      tues.map((item) => {
        const obj = {};
        obj.boxName = `${item}号箱`;
        obj.id = item;
        obj.detail = [];
        boxs.push(obj);
      });

      // 将明细分别装进对应箱号的箱中
      boxs.map((item) => {
        res.map((em) => {
          if (em.PICK_OUT_TEUS_ID == item.id) {
            em.QTY_TEUS = em.QTY_TEUS;
            item.detail.push(em);
          }
        });
      });
      if (boxs.length !== 0) {
        self.scanOutbound.boxs = boxs;
        self.isActive = self.scanOutbound.boxs[0].id;
        self.scanOutbound.currentBox = self.scanOutbound.boxs[0].id;
        self.scanOutbound.jordanTableConfig.data = self.scanOutbound.boxs[0].detail;
      } else {
        self.isActive = 1;
        self.scanOutbound.currentBox = 1;
        self.scanOutbound.jordanTableConfig.data = self.scanOutbound.boxs[0].detail;
      }
    },
    scanPro(val) {
      const self = this;
      if (self.pickOrder.logFormConfig.formValue.BILL_STATUS === '已审核') {
        self.$Message.warning('已审核订单不允许修改');
        self.error_one();
        return;
      } if (self.pickOrder.logFormConfig.formValue.BILL_STATUS === '已作废') {
        self.$Message.warning('已作废订单不允许修改');
        self.error_one();
        return;
      }
      const value = val.target.value;
      const isNull = self.existPick(value, self.pickOrder.pickDetail.data);
      if (self.scanOutbound.scanWork.scanProduce.trim() === '') {
        self.scanOutbound.scanWork.scanProduce = '';
        self.$Message.warning('商品不能为空!');
        return;
      } if (self.scanOutbound.scanWork.scanNum === '') {
        self.$Message.warning('扫描数量不能为空!');
        return;
      }
      const insertData = '';
      const addOrSub = self.scanOutbound.scanJob.addOrSub;
      const scanDetail = self.notScanData.data.filter(item => item.PS_C_SKU_ECODE === self.scanOutbound.scanWork.scanProduce || (item.GBCODE && item.GBCODE === self.scanOutbound.scanWork.scanProduce));
      if (scanDetail.length === 0) {
        self.scanOutbound.warnModal = true;
        self.scanOutbound.warnMessage = `未扫描商品不存在(${value})条码或国标码!`;
        self.scanOutbound.scanWork.scanProduce = '';
        self.error_one();
        return;
      }
      if (addOrSub === 'add') {
        if (Number(scanDetail[0].QTY_DIFF) <= 0) {
          self.scanOutbound.warnModal = true;
          self.scanOutbound.warnMessage = `${value}(条码或国标码)扫描数量已超出!`;
          self.scanOutbound.scanWork.scanProduce = '';
          self.error_one();
          return;
        } if (Number(self.scanOutbound.scanWork.scanNum) + Number(self.scanOutbound.workRTK.scanCount) > Number(self.scanOutbound.workRTK.total)) {
          self.scanOutbound.warnModal = true;
          self.scanOutbound.warnMessage = '扫描总数量已超出!';
          self.scanOutbound.scanWork.scanProduce = '';
          self.error_one();
          return;
        }
      }
      if (isNull === 1) {
        self.pickOrder.pickDetail.data.map((item) => {
          if (item.PS_C_SKU_ECODE === value || (item.GBCODE && item.GBCODE === value)) {
            self.existTues(item, isNull);
          }
        });
        // self.scanOutbound.scanWork.scanProduce = '';
      } else if (isNull === 2) {
        self.pickOrder.pickDetail.data.map((item) => {
          if (item.PS_C_TEUS_ECODE === value) {
            if (item.IS_TEUS == '√') {
              if (self.scanOutbound.scanWork.scanNum != 1) {
                self.$Message.warning(`箱号:${value}数量不能大于1`);
              } else {
                self.existTues(item, isNull);
              }
            } else {
              self.existTues(item, isNull);
            }
          }
        });
        // self.scanOutbound.scanWork.scanProduce = '';
      } else {
        self.$Message.warning('明细不存在!');
        self.scanOutbound.scanWork.message = '明细不存在';
        self.IMAGE = '';
        // self.scanOutbound.scanWork.scanProduce = '';
        return false;
      }
      self.fm_one();
      self.scanOutbound.scanWork.scanProduce = '';
    },
    // 扫描商品在拣货明细中是否存在方法
    existPick(val, data) {
      const self = this;
      let result = 3;
      if (data.some(current => (current.PS_C_SKU_ECODE == val || (current.GBCODE && current.GBCODE == val)))) {
        // 存在相同条码
        result = 1;
      } else if (data.some(current => current.PS_C_TEUS_ECODE == val)) {
        // 存在相同箱号
        result = 2;
      } else {
        // 不存在相同单据
        result = 3;
      }
      return result;
    },
    // 判断该条码或箱号在当前箱明细中是否存在
    existTues(data, isNull) {
      const self = this;
      const addOrSub = self.scanOutbound.scanJob.addOrSub; // 扫描还是反冲
      let currentTues = '';
      const scanNum = Number(self.scanOutbound.scanWork.scanNum); // 扫描数量
      self.scanOutbound.boxs.map((item) => {
        if (item.id == self.scanOutbound.currentBox) {
          currentTues = item.detail;
        }
      });
      if (isNull === 1) { // 从拣货明细中查到的相同条码
        if (currentTues.some(item => (item.PS_C_SKU_ECODE === data.PS_C_SKU_ECODE || (item.GBCODE && item.GBCODE === data.GBCODE)))) { // 如果当前箱明细中有相同条码或国标码
          currentTues.map((item) => {
            if (item.PS_C_SKU_ECODE === data.PS_C_SKU_ECODE || (item.GBCODE && item.GBCODE === data.GBCODE)) {
              if (addOrSub === 'add') { // 为扫描
                item.QTY_TEUS = Number(item.QTY_TEUS) + scanNum;
                self.scanOutbound.workRTK.scanCount = self.scanOutbound.workRTK.scanCount + scanNum;
                self.scanOutbound.workRTK.unscanCount = self.scanOutbound.workRTK.unscanCount - scanNum;
                self.scanOutbound.scanWork.message = '已扫描';
                self.updataNotScan(data.PS_C_SKU_ECODE, '条码'); // 更新未扫描商品
                self.IMAGE = data.IMAGE ? JSON.parse(data.IMAGE)[0].URL : ''; // 展示扫描图片
              } else if (addOrSub === 'sub') { // 为反冲
                if (item.QTY_TEUS >= scanNum) {
                  item.QTY_TEUS = Number(item.QTY_TEUS) - scanNum;
                  self.scanOutbound.workRTK.scanCount = self.scanOutbound.workRTK.scanCount - scanNum;
                  self.scanOutbound.workRTK.unscanCount = self.scanOutbound.workRTK.unscanCount + scanNum;
                  self.scanOutbound.scanWork.message = '已扫描';
                  self.updataNotScan(data.PS_C_SKU_ECODE, '条码'); // 更新未扫描商品
                  self.IMAGE = data.IMAGE ? JSON.parse(data.IMAGE)[0].URL : ''; // 展示扫描图片
                } else {
                  self.$Message.warning('不允许为负值');
                  self.scanOutbound.scanWork.message = '不允许为负值';
                  self.IMAGE = data.IMAGE ? JSON.parse(data.IMAGE)[0].URL : ''; // 展示扫描图片
                }
              }
            }
          });
        } else { // 如果当前箱明细不存在相同条码
          if (addOrSub === 'add') { // 为扫描
            data.QTY_TEUS = scanNum;
            data.PICK_OUT_TEUS_ID = self.scanOutbound.currentBox;
            self.scanOutbound.workRTK.scanCount = self.scanOutbound.workRTK.scanCount + scanNum;
            self.scanOutbound.workRTK.unscanCount = self.scanOutbound.workRTK.unscanCount - scanNum;
            // data.IS_TEUS = data.IS_TEUS == 0?'x':'√';
            currentTues.push(JSON.parse(JSON.stringify(data)));
            self.scanOutbound.scanWork.message = '已扫描';
            self.updataNotScan(data.PS_C_SKU_ECODE, '条码'); // 更新未扫描商品
            self.IMAGE = data.IMAGE ? JSON.parse(data.IMAGE)[0].URL : ''; // 展示扫描图片
          } else if (addOrSub === 'sub') {
            self.IMAGE = data.IMAGE ? JSON.parse(data.IMAGE)[0].URL : ''; // 展示扫描图片
            self.$Message.warning(`当前拣货箱不存在条码${data.PS_C_SKU_ECODE}`);
            self.scanOutbound.scanWork.message = `当前拣货箱不存在条码${data.PS_C_SKU_ECODE}`;
          }
        }
      } else if (isNull === 2) { // 从拣货明细中查到的相同箱号
        if (currentTues.some(item => item.PS_C_TEUS_ECODE === data.PS_C_TEUS_ECODE)) { // 如果当前箱明细中有相同箱号
          currentTues.map((item) => {
            if (item.PS_C_TEUS_ECODE === data.PS_C_TEUS_ECODE) {
              if (addOrSub === 'add') { // 为扫描
                if (item.IS_TEUS == '√') {
                  if (Number(item.QTY_TEUS) + scanNum > 1) {
                    self.$Message.warning(`箱号:${data.PS_C_TEUS_ECODE}数量不能大于1`);
                  } else {
                    item.QTY_TEUS = item.QTY_TEUS == 0 ? scanNum : Number(item.QTY_TEUS) + scanNum;
                    self.scanOutbound.workRTK.scanCount = self.scanOutbound.workRTK.scanCount + scanNum;
                    self.scanOutbound.workRTK.unscanCount = self.scanOutbound.workRTK.unscanCount - scanNum;
                    self.scanOutbound.scanWork.message = '已扫描';
                    self.updataNotScan(data.PS_C_TEUS_ECODE, '箱号'); // 更新未扫描商品
                    self.IMAGE = data.IMAGE ? JSON.parse(data.IMAGE)[0].URL : ''; // 展示扫描图片
                  }
                } else {
                  item.QTY_TEUS = Number(item.QTY_TEUS) + scanNum;
                  self.scanOutbound.workRTK.scanCount = self.scanOutbound.workRTK.scanCount + scanNum;
                  self.scanOutbound.workRTK.unscanCount = self.scanOutbound.workRTK.unscanCount - scanNum;
                  self.scanOutbound.scanWork.message = '已扫描';
                  self.updataNotScan(data.PS_C_TEUS_ECODE, '箱号'); // 更新未扫描商品
                  self.IMAGE = data.IMAGE ? JSON.parse(data.IMAGE)[0].URL : ''; // 展示扫描图片
                }
              } else if (addOrSub === 'sub') { // 为反冲
                if (item.QTY_TEUS >= scanNum) {
                  self.scanOutbound.workRTK.scanCount = self.scanOutbound.workRTK.scanCount - scanNum;
                  self.scanOutbound.workRTK.unscanCount = self.scanOutbound.workRTK.unscanCount + scanNum;
                  item.QTY_TEUS = Number(item.QTY_TEUS) - scanNum;
                  self.scanOutbound.scanWork.message = '已扫描';
                  self.updataNotScan(data.PS_C_TEUS_ECODE, '箱号'); // 更新未扫描商品
                  self.IMAGE = data.IMAGE ? JSON.parse(data.IMAGE)[0].URL : ''; // 展示扫描图片
                } else {
                  // self.$Message.warning('不允许为负值');
                  self.scanOutbound.scanWork.message = '不允许为负值';
                  self.IMAGE = data.IMAGE ? JSON.parse(data.IMAGE)[0].URL : ''; // 展示扫描图片
                }
              }
            }
          });
        } else { // 如果当前箱明细不存在相同箱号
          if (addOrSub === 'add') { // 为扫描
            data.QTY_TEUS = scanNum;
            data.PICK_OUT_TEUS_ID = self.scanOutbound.currentBox;
            self.scanOutbound.workRTK.scanCount = self.scanOutbound.workRTK.scanCount + scanNum;
            self.scanOutbound.workRTK.unscanCount = self.scanOutbound.workRTK.unscanCount - scanNum;
            // data.IS_TEUS = data.IS_TEUS == 0?'x':'√';
            currentTues.push(JSON.parse(JSON.stringify(data)));
            self.scanOutbound.scanWork.message = '已扫描';
            self.updataNotScan(data.PS_C_TEUS_ECODE, '箱号'); // 更新未扫描商品
            self.IMAGE = data.IMAGE ? JSON.parse(data.IMAGE)[0].URL : ''; // 展示扫描图片
          } else if (addOrSub === 'sub') {
            self.IMAGE = data.IMAGE ? JSON.parse(data.IMAGE)[0].URL : ''; // 展示扫描图片
            self.$Message.warning(`当前拣货箱不存在箱号${data.PS_C_TEUS_ECODE}`);
            self.scanOutbound.scanWork.message = `当前拣货箱不存在箱号${data.PS_C_TEUS_ECODE}`;
          }
        }
      }
    },
    // 保存
    save() {
      const self = this;
      let detail = []; // 存贮拆箱后的明细
      const formdata = new FormData();
      const param = {};
      self.scanOutbound.boxs.map((item) => {
        detail = detail.concat(item.detail);
      });
      detail.map((item) => { // 是否箱映射
        if (item.IS_TEUS == 'x') {
          item.IS_TEUS = 0;
        } else {
          item.IS_TEUS = 1;
        }
      });

      param.ID = self.ID;
      param.IS_ALLOW_PART = self.scanOutbound.scanWork.isAllowPart ? 'Y' : 'N';
      param.SG_B_OUT_PICKORDER_TEUS_ITEM = detail;
      formdata.append('param', JSON.stringify(param));
      axios({
        url: '/p/cs/sg/saveOutPickOrder',
        method: 'post',
        data: formdata
      }).then((res) => {
        console.log(res);
        if (res.data.code === 0) {
          self.$Message.success(res.data.message);
          // self.reload();
        } else {
          self.$Message.error(res.data.message);
        }
      });
    },
    // 审核
    audit() {
      const self = this;
      const formdata = new FormData();
      if (self.ID === -1) {
        self.$Message.warning('当前单据未保存,不允许审核!');
        // self.scanOutbound.scanWork.message = '当前单据未保存,不允许审核!';
      } else {
        const param = {};
        param.ID = self.ID;
        param.IS_ALLOW_PART = self.scanOutbound.scanWork.isAllowPart ? 'Y' : 'N';
        formdata.append('param', JSON.stringify(param));
        axios({
          url: '/p/cs/sg/auditOutPickOrder',
          method: 'post',
          data: formdata
        }).then((res) => {
          console.log(res);
          if (res.data.code === 0) {
            self.$Message.success(res.data.message);
            // self.reload();
          } else {
            self.$Message.error(res.data.message);
          }
        });
      }
    },
    // 扫描后,更新未扫描商品表格
    // data:扫描或反冲数据
    // type:条码或箱号
    updataNotScan(data, type, operationType) {
      const self = this;
      const addOrSub = self.scanOutbound.scanJob.addOrSub; // 扫描还是反冲
      const num = Number(self.scanOutbound.scanWork.scanNum); // 扫描数量
      if (type === '条码') { // 条码
        self.notScanData.data.map((item) => {
          if (item.PS_C_SKU_ECODE === data) {
            if (self.scanOutbound.scanJob.addOrSub === 'add' && !operationType) { // 扫描
              // item.QTY_NOTICE = item.QTY_NOTICE - num
              item.QTY_OUT += num;
              item.QTY_DIFF -= num;
            } else if (self.scanOutbound.scanJob.addOrSub === 'sub' || operationType === 'sub') { // 反冲
              // item.QTY_NOTICE = item.QTY_NOTICE + num;
              item.QTY_OUT -= num;
              item.QTY_DIFF += num;
            }
          }
        });
      } else if (type === '箱号') { // 箱号
        self.notScanData.data.map((item) => {
          if (item.PS_C_TEUS_ECODE === data) {
            if (self.scanOutbound.scanJob.addOrSub === 'add') { // 扫描
              // item.QTY_NOTICE = item.QTY_NOTICE - num;
              item.QTY_OUT += num;
              item.QTY_DIFF -= num;
            } else if (self.scanOutbound.scanJob.addOrSub === 'sub') { // 反冲
              // item.QTY_NOTICE = item.QTY_NOTICE + num;
              item.QTY_OUT -= num;
              item.QTY_DIFF += num;
            }
          }
        });
      }
    },
    toDate(date) {
      if (date) {
        date = new Date(date);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const mydate = date.getDate();

        // let hours = date.getHours();
        // let minutes = date.getMinutes();
        // let seconds = date.getSeconds();
        return `${year}-${month}-${mydate}`;
      }
      return '';
    },
    onSelect(selection, row) {
      const self = this;
      self.scanOutbound.delArr = selection;
    },
    onSelectCancel(selection, row) {
      const self = this;
      self.scanOutbound.delArr = selection;
    },
    onSelectAll(selection, row) {
      const self = this;
      self.scanOutbound.delArr = selection;
    },
    onSelectAllCancel(selection, row) {
      const self = this;
      self.scanOutbound.delArr = [];
    },
    tableImport() {
      const _this = this;
      _this.importTable.componentData = {
        tableName: 'SG_B_OUT_PICKORDER',
        objid: this.$route.query.id,
        tableEname: '出库拣货单'
      };
      _this.importTable.confirmTitle = 'PDA导入';
      _this.$children
        .find(item => item.name === 'importTable')
        .openConfirm();
    },
    tableDeleteDetail() {
      const self = this;
      if (self.pickOrder.logFormConfig.formValue.BILL_STATUS === '已审核') {
        self.$Message.warning('已审核订单不允许修改');
        return;
      } if (self.pickOrder.logFormConfig.formValue.BILL_STATUS === '已作废') {
        self.$Message.warning('已作废订单不允许修改');
        return;
      }
      const currentBox = self.scanOutbound.currentBox; // 当前箱
      console.log(self.scanOutbound.delArr);
      if (self.scanOutbound.delArr.length === 0) {
        self.$Message.warning('请选择需要删除的数据');
      } else {
        self.scanOutbound.delArr.map((item) => {
          self.scanOutbound.jordanTableConfig.data.map((s_item, index) => {
            if (item.ID === s_item.ID) {
              self.scanOutbound.jordanTableConfig.data.splice(index, 1);
              if (s_item.QTY_TEUS > 0) {
                self.scanOutbound.workRTK.scanCount = self.scanOutbound.workRTK.scanCount - s_item.QTY_TEUS;
                self.scanOutbound.workRTK.unscanCount = self.scanOutbound.workRTK.unscanCount + s_item.QTY_TEUS;
                self.updataNotScan(s_item.PS_C_SKU_ECODE, '条码', 'sub'); // 更新未扫描商品
                // self.IMAGE = data.IMAGE ? JSON.parse(data.IMAGE)[0].URL : ''; //展示扫描图片
              }
            }
          });
        });
        console.log(self.scanOutbound.jordanTableConfig.data);
      }
    },
  }
};

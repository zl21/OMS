import { OmsButton, OmsForm, OmsTable, OmsDialog } from 'burgeonComponents'
import buttonPermissionsMixin from '@/assets/js/mixins/buttonPermissions';

export default {
  components: {
    OmsButton,
    OmsForm,
    OmsTable,
    OmsDialog,
  },
  // inject: ['reload'],
  mixins: [buttonPermissionsMixin],
  methods: {
    forceScanIn() {
      const self = this;
      const a = this.getData();
      a.ID = self.ID; // 后端要求新增两个字段 主表ID/是否强制入库
      a.IS_FORCE = 1;

      // 非空效验
      // if(a.LOGISTICS_CODE == '' || a.RECEIVE_NAME == '' || a.RECEIVE_MOBILE == ''){
      if (a.LOGISTICS_CODE == '') {
        self.$Message.warning($i18n.t('modalTips.h8')); // 必须填写物流单号才能强制保存
        return;
      }
      // 判断扫描数量不能为零
      const unQTYSCAN = a.ITEM_LIST.every((i) => i.QTY_SCAN === 0);
      if (unQTYSCAN) {
        self.$Message.warning($i18n.t('modalTips.h9')); // 扫描数量不能为零！
        return;
      }
      if (a.OC_B_REFUND_BATCH_ID == '' || !a.OC_B_REFUND_BATCH_ID) {
        self.$Message.warning($i18n.t('modalTips.i0')); // 退货批次不能为空!
        return;
      }
      if (!self.formConfig2.formData[5].itemdata.pid) {
        self.$Message.warning($i18n.t('modalTips.i0')); // 销退入库仓不能为空!
        return;
      }

      if (self.isSave) return;
      self.isSave = true;
      self.btnConfig.buttons[1].disabled = true;
      self.service.orderCenter.saveScanIncoming(a).then((res) => {
        // console.log(res);
        if (res.data.code === 0) {
          self.$Message.success(res.data.message);
          self.fm_four();
          if (this.$route.query.returnId) {
            // 如果是从退换货列表跳转过来的，入库完成后再调回去
            this.$store.commit('customize/TabHref', {
              id: 2661,
              type: 'action',
              name: 'returngoodList',
              label: $i18n.t('common.preferential_info'), // 退换货订单
              query: Object.assign({
                id: 2661,
                tabTitle: $i18n.t('common.preferential_info'), // 退换货订单
              }),
              back: true,
            });
            // 销毁当前实例
            this.$destroy();
          } else {
            // self.reload();
            self.formConfig2.formData.forEach((item) => {
              if (
                item.itemdata &&
                item.itemdata.name ===
                $i18n.t('form_label.logisticsCompany')
              ) {
                // 物流公司
                item.itemdata.valuedata = sessionStorage.getItem('companyName');
                item.itemdata.pid = sessionStorage.getItem('companyId');
              }
            });
          }
          self.isSave = false;
        } else {
          self.errModelTitle =
            res.data.message || $i18n.t('modalTips.i2'); // 强制入库失败
          self.isModal3 = true;
          self.error_one();
          self.btnConfig.buttons[1].disabled = false;
          self.isSave = false;
        }
      });
    },
    // 播放音频
    fm_one() {
      const myAudio = document.getElementById('fm01');
      myAudio.play();
    },
    fm_two() {
      const myAudio = document.getElementById('fm02');
      myAudio.play();
    },
    fm_three() {
      const myAudio = document.getElementById('fm03');
      myAudio.play();
    },
    fm_four() {
      const myAudio = document.getElementById('fm04');
      myAudio.play();
    },
    error_one() {
      const myAudio = document.getElementById('error01');
      myAudio.play();
    },
    error_two() {
      const myAudio = document.getElementById('error02');
      myAudio.play();
    },
    // 请求退货批次数据
    getReturnBatch() {
      const self = this;
      self.loading = true;
      const pici = sessionStorage.getItem('status');
      self.formConfig2.formData[0].options = [];
      this.service.orderCenter
        .getCurrentBatch({
          BATCH_TYPE: '',
        })
        .then((res) => {
          console.log(res);
          if (res.data.code === 0) {
            const options = JSON.parse(JSON.stringify(res.data.data));
            options.forEach((item) => {
              item.label = item.BATCH_NO;
              item.value = item.ID;
            });
            self.formConfig2.formData[0].options = options;
            const isExist = options.some((item) => item.ID == pici);
            if (!isExist) {
              setTimeout(() => {
                self.formConfig2.formValue.OC_B_REFUND_BATCH_ID = options[0].ID;
                sessionStorage.setItem('status', options[0].ID);
                self.getBatch(self.formConfig2.formValue.OC_B_REFUND_BATCH_ID);
              }, 100);
            } else {
              self.formConfig2.formValue.OC_B_REFUND_BATCH_ID = Number(pici);
              sessionStorage.setItem('status', pici);
              self.getBatch(self.formConfig2.formValue.OC_B_REFUND_BATCH_ID);
            }
          } else {
            self.$Message.warning(res.data.message);
          }
        })
        .finally(() => {
          self.loading = false;
        });
    },
    // 表格单击一行方法
    onRowClick(row, index) {
      this.onRowClickIndex = index;
      this.onRowClickData = row;
      console.log(this.onRowClickData);
    },
    // 弹框确认取消
    cancel1() {
      const self = this;
      self.formConfig3.formValue.PS_C_SKU_ECODE = '';
    },
    keydown1(e) {
      switch (e.keyCode) {
        case 13:
          this.ok1();
          this.isModal = false;
          break;
        case 27:
          this.cancel1();
          this.isModal = false;
          break;
        default:
          console.log(e);
      }
    },
    keydown2(e) {
      switch (e.keyCode) {
        case 13:
          this.ok2();
          this.isModal2 = false;
          setTimeout(() => {
            document.getElementById('toNo').focus();
          }, 800);
          break;
        case 27:
          this.cancel2();
          this.isModal2 = false;
          break;
        default:
          console.log(e);
      }
    },
    ok1() {
      const self = this;
      this.service.orderCenter
        .getOneRefundItem({
          PS_C_SKU_ECODE: self.formConfig3.formValue.PS_C_SKU_ECODE,
        })
        .then((res) => {
          if (res.data.code === 0) {
            res.data.data.IS_WITHOUT_ORIG = '是';
            res.data.data.QTY_SCAN = 1;
            res.data.data.QTY = 1;
            res.data.data.PRODUCT_MARK = '1';
            self.jordanTableConfig.data.push(res.data.data);
            self.$Message.warning(res.data.message);
            self.fm_three();
            self.isSelfMotion = false;
            self.formConfig3.formValue.PS_C_SKU_ECODE = '';
          } else {
            self.$Message.warning(res.data.message);
            self.error_two();
            self.formConfig3.formValue.PS_C_SKU_ECODE = '';
          }
        });
    },
    ok2() {
      const self = this;
      // 先清空之前的数据
      self.jordanTableConfig.data = [];
      self.formConfig4.formValue.ORIG_ORDER_ID = ''; // 原单单号赋值
      self.formConfig4.formValue.ORIG_SOURCE_CODE = ''; // 原始平台单号赋值
      self.formConfig4.formValue.BUYER_NICK = ''; // 买家昵称赋值
      self.formConfig4.formValue.RECEIVE_MOBILE = ''; // 收件人手机赋值
      self.formConfig2.formValue.RECEIVE_MOBILE = ''; // 收件人手机赋值
      self.formConfig4.formValue.LOGISTICS_CODE = ''; // 物流单号赋值
      self.formConfig4.formValue.RECEIVE_NAME = ''; // 收件人赋值
      self.formConfig4.formValue.RECEIVE_PHONE = ''; // 联系电话赋值
      self.formConfig4.formValue.RECEIVE_ADDRESS = ''; // 发货地址赋值
      self.formConfig3.formValue.SPECIAL_TYPE = '0'; // 特殊处理类型为正常
      self.formConfig3.formData[3].style = ''; // 隐藏实收条码
      // 将无头件标识改为是
      self.isNoHeader = true;
      // document.getElementById('toNo').focus();
      // 无头件处理,将物流单号和原单单号值更新赋值到退换货信息中
      self.formConfig4.formValue.LOGISTICS_CODE =
        self.formConfig1.formValue.LOGISTICS_CODE;
      self.formConfig4.formValue.ORIG_ORDER_ID =
        self.formConfig1.formValue.ORIG_ORDER_ID;
    },
    cancel2() {
      // this.reload();
    },
    // 对界面赋值方法
    setData(data) {
      const self = this;
      // 录入信息赋值
      self.formConfig2.formValue.REMARK = data.REMARK; // 退换货备注赋值
      self.formConfig2.formData.forEach((item) => {
        // 物流公司
        if (
          item.itemdata &&
          item.itemdata.name === $i18n.t('form_label.logisticsCompany')
        ) {
          item.itemdata.valuedata = data.CP_C_LOGISTICS_ENAME
            ? data.CP_C_LOGISTICS_ENAME
            : sessionStorage.getItem('companyName');
          item.itemdata.pid = data.CP_C_LOGISTICS_ID
            ? data.CP_C_LOGISTICS_ID
            : sessionStorage.getItem('companyId');
          sessionStorage.setItem('companyId', data.CP_C_LOGISTICS_ID);
          sessionStorage.setItem('companyName', data.CP_C_LOGISTICS_ENAME);
        }
        // 销退入库仓  门店
        if (
          item.itemdata &&
          item.itemdata.name ===
          $i18n.t('form_label.salesReturn_to_warehouse')
        ) {
          if (
            self.formConfig2.formValue.BATCH_TYPE ===
            $i18n.t('form_label.store')
          ) {
            item.itemdata.pid = data.STORE_ID;
            item.itemdata.valuedata = data.STORE_ENAME;
          }
        }
      });
      self.formConfig2.formValue.CP_C_PHY_WAREHOUSE_ENAME =
        data.CP_C_PHY_WAREHOUSE_ENAME; // 原发货仓
      // 扫描明细赋值
      const itemList = [];
      data.ITEM_LIST.forEach((item) => {
        // 每条明细新增ISFEONT属性
        item.ISFRONT = 0;
        // 转换是否无原单条码
        if (item.IS_WITHOUT_ORIG === 1) {
          item.IS_WITHOUT_ORIG = '是';
        } else {
          item.IS_WITHOUT_ORIG = '否';
        }
        for (let i = 0; i < item.QTY; i++) {
          itemList.push(item);
        }
        itemList.forEach((val) => {
          val.QTY = 1;
        });
      });
      const arrList = JSON.parse(JSON.stringify(itemList));

      self.jordanTableConfig.data = arrList;
      // 退换货信息赋值
      self.formConfig4.formValue.ORIG_ORDER_ID = data.ORIG_ORDER_ID; // 原单单号赋值
      self.formConfig4.formValue.ORIG_SOURCE_CODE = data.ORIG_SOURCE_CODE; // 原始平台单号赋值
      self.formConfig4.formValue.BUYER_NICK = data.BUYER_NICK; // 买家昵称赋值
      self.formConfig4.formValue.RECEIVE_MOBILE = data.RECEIVE_MOBILE; // 收件人手机赋值
      self.formConfig2.formValue.RECEIVE_MOBILE = data.RECEIVE_MOBILE; // 收件人手机赋值
      self.formConfig4.formValue.LOGISTICS_CODE = data.LOGISTICS_CODE; // 物流单号赋值
      self.formConfig4.formValue.RECEIVE_NAME = data.RECEIVE_NAME; // 收件人赋值
      self.formConfig4.formValue.RECEIVE_PHONE = data.RECEIVE_PHONE; // 联系电话赋值
      self.formConfig4.formValue.RECEIVE_ADDRESS = data.RECEIVE_ADDRESS; // 发货地址赋值
    },
    // 入库保存对界面取值方法
    getData() {
      const self = this;
      let allData = {};
      let detailData = JSON.stringify(self.jordanTableConfig.data);
      if (self.formConfig2.formValue.RECEIVE_MOBILE) {
        self.formConfig4.formValue.RECEIVE_MOBILE =
          self.formConfig2.formValue.RECEIVE_MOBILE;
      }
      detailData = JSON.parse(detailData);
      detailData.forEach((item) => {
        if (item.IS_WITHOUT_ORIG === '是') {
          item.IS_WITHOUT_ORIG = 1;
        } else {
          item.IS_WITHOUT_ORIG = 0;
        }
      });
      allData = self.formConfig4.formValue;
      allData.ITEM_LIST = detailData;
      allData.REAL_REMARK = self.formConfig2.formValue.REAL_REMARK; // 备注传值
      allData.SPECIAL_TYPE = Number(self.formConfig3.formValue.SPECIAL_TYPE); // 特殊处理类型传值
      self.formConfig2.formData.forEach((item) => {
        if (
          item.itemdata &&
          item.itemdata.name === $i18n.t('form_label.logisticsCompany')
        ) {
          // 物流公司
          allData.CP_C_LOGISTICS_ENAME = item.itemdata.valuedata;
          allData.CP_C_LOGISTICS_ID = item.itemdata.pid;
        }
        if (
          item.itemdata &&
          item.itemdata.name ===
          $i18n.t('form_label.salesReturn_to_warehouse')
        ) {
          // 销退入库仓
          allData.LOGICAL_WAREHOUSE_ID = item.itemdata.pid;
        }
      });
      allData.OC_B_REFUND_BATCH_ID =
        self.formConfig2.formValue.OC_B_REFUND_BATCH_ID;
      // console.log(allData);
      return allData;
    },
    checkECODE(item) {
      const ECODE = this.formConfig3.formValue.PS_C_SKU_ECODE;
      return ECODE === item.PS_C_SKU_ECODE || ECODE === item.GBCODE; // 2019/6/6 需求改动，同时匹配发出条码和国标码；
    },
    // 集成搜索方法
    searchMethod() {
      const self = this;
      console.log(self.searchValue);
      if (
        self.searchValue[0].label ==
        $i18n.t('form_label.chargebackNumber')
      ) {
        // 退单编号
        self.fiveQuery('id', Number(self.searchValue[0].value));
      } else if (
        self.searchValue[0].label == $i18n.t('form_label.phone_number')
      ) {
        // 手机号码
        self.fiveQuery('receiver_phone', self.searchValue[0].value);
      } else if (
        self.searchValue[0].label == $i18n.t('form_label.consignee')
      ) {
        // 收货人
        self.fiveQuery('receiver_name', self.searchValue[0].value);
      }
      // 清空searValue的值
      self.$children[1].clearAllSeatchItem();
    },
    // 获取销退入库仓以及批次类型方法
    getBatch(val) {
      const self = this;
      self.service.orderCenter.cpStoreInfo({ BATCH_ID: val }).then((res) => {
        console.log(res);
        if (res.data.code === 0) {
          self.formConfig2.formData.forEach((item) => {
            if (item.value && item.value === 'BATCH_TYPE') {
              self.$set(
                self.formConfig2.formValue,
                'BATCH_TYPE',
                res.data.data.BATCH_TYPE === 1 ? '1' : '2'
              );
            }
            if (
              item.itemdata &&
              item.itemdata.colname === 'TRANSFER_STORE_ID'
            ) {
              item.itemdata.pid = res.data.data.STORE_ID;
              item.itemdata.valuedata = res.data.data.STORE_ENAME;
              if (res.data.data.STORE_ID && res.data.data.STORE_ENAME) {
                item.itemdata.readonly = true;
              } else {
                item.itemdata.readonly = false;
              }
            }
          });
        } else {
          this.$Message.warning(res.data.message);
        }
      });
    },

    // 五选一查询方法
    fiveQuery(type, value) {
      const self = this;
      let id;
      this.receiverPhone = '';
      this.receiverName = '';
      this.logisticCode = '';
      this.origOrderId = '';
      switch (type) {
        case 'id':
          id = value;
          break;
        case 'receiver_phone':
          this.receiverPhone = value;
          break;
        case 'receiver_name':
          this.receiverName = value;
          break;
        case 'logistic_code':
          this.logisticCode = value;
          break;
        case 'orig_order_id':
          this.origOrderId = value;
          break;
      }
      this.service.orderCenter
        .getScanIncomingInfo({
          ID: id, // 退单编号
          RECEIVER_MOBILE: this.receiverPhone, // 手机号码
          RECEIVER_NAME: this.receiverName, // 收货人
          LOGISTIC_CODE: this.logisticCode, // 物流单号
          ORIG_ORDER_ID: this.origOrderId, // 原单单号
        })
        .then((res) => {
          // console.log(res);
          if (res.data.code === 0) {
            self.ID = res.data.data[0].ID; // 存储退单ID
            if (res.data.data.length === 1) {
              self.setData(res.data.data[0]);
              self.fm_one();
              // 光标跳到发出条码框
              document.getElementById('toNo').focus();
            } else {
              // 弹出弹框,展示多条退换货单
              // let obj = {};
              // obj.list = res.data.data;
              self.changeWarehouseConfig.componentData = {
                list: res.data.data,
              };
              self.$children
                .find((item) => item.name === 'dilog')
                .openConfirm();
            }
            // 无头件标识改为否
            self.isNoHeader = false;
          } else {
            self.error_one();
            self.$Message.warning(res.data.message);
          }
        });
    },
    // 物流单号，原单单号查询方法
    fiveQuery1(type, value) {
      const self = this;
      let id;
      switch (type) {
        case 'id':
          id = value;
          break;
        case 'receiver_phone':
          this.receiverPhone = value;
          break;
        case 'receiver_name':
          this.receiverName = value;
          break;
        case 'logistic_code':
          this.logisticCode = value;
          break;
        case 'orig_order_id':
          this.origOrderId = value;
          break;
      }
      this.service.orderCenter
        .getScanIncomingInfo({
          ID: id, // 退单编号
          RECEIVER_MOBILE: this.receiverPhone, // 手机号码
          RECEIVER_NAME: this.receiverName, // 收货人
          LOGISTIC_CODE: this.logisticCode, // 物流单号
          ORIG_ORDER_ID: this.origOrderId, // 原单单号
        })
        .then((res) => {
          if (res.data.code === 0) {
            self.ID = res.data.data[0].ID; // 存储退单ID
            self.setData(res.data.data[0]);
            self.fm_two();
            // 光标跳到发出条码框
            document.getElementById('toNo').focus();
            self.isNoHeader = false;
          } else if (res.data.code === -2) {
            const err = res.data.message || $i18n.t('modalTips.h7'); // 退货入库单中存在此物流单号，不允许扫描入库！
            self.$Message.error(err);
            self.removeData();
            if (sessionStorage.getItem('companyId') !== null) {
              this.formConfig2.formData.forEach((item) => {
                if (
                  item.itemdata &&
                  item.itemdata.name ===
                  $i18n.t('form_label.logisticsCompany')
                ) {
                  // 物流公司
                  item.itemdata.valuedata = sessionStorage.getItem(
                    'companyName'
                  );
                  item.itemdata.pid = sessionStorage.getItem('companyId');
                }
              });
            }
          } else {
            // self.isModal2 = true;
            self.ok2();
            document.getElementById('toNo').focus();
            self.error_one();
          }
        });
    },
    // 清除
    removeData() {
      if (this.$route.query.returnId) {
        this.$store.commit('customize/TabHref', {
          id: 2776, // 单据id
          type: 'action', // 类型action
          name: 'scanIn', // 文件名
          label: $i18n.t('panel_label.scannAndWarehous'), // tab中文名
          query: Object.assign({
            id: 2776,
          }), // 带的参数
        });
        return;
      }
      const _this = this;
      // sessionStorage.removeItem("companyId");
      // sessionStorage.removeItem("companyName");
      _this.formConfig2.formData.forEach((item) => {
        if (item.style === 'popInput') {
          item.itemdata.pid = '';
          item.itemdata.valuedata = '';
        }
      });
      document.getElementsByClassName('burgeon-input-default')[0].value = '';
      _this.formConfig1.formValue = {};
      _this.formConfig2.formValue = {};
      _this.formConfig3.formValue = {
        SPECIAL_TYPE: '0',
        isMatching: false,
      };
      _this.formConfig4.formValue = {};
      _this.jordanTableConfig.data = [];
      _this.formConfig3.formData[3].style = '';
      _this.isSelfMotion = true;
      _this.getReturnBatch();
      // if(this.$route.query.returnId){
      //   this.fiveQuery('id' , Number(this.$route.query.returnId));
      // }
      document.getElementById('orderNo').focus();
    },
    oneObjs(e) {
      sessionStorage.setItem('companyId', e.pid);
      sessionStorage.setItem('companyName', e.valuedata);
    },
  },
  mounted() {
    this.$nextTick(() => {
      // 前提:公共逻辑处理必须使用jordanButton组件才可以使用公共逻辑
      // 参数1  关于是否是定制页面:action 半定制页面:halfaCustom （目前不生效）
      // 参数2  buttons父级json
      // 参数3  true逻辑处理 false定制页面自行处理  按钮权限
      // 逻辑处理则直接调用
      this.getPermissions('btnConfig', 'scanIn');
      // 定制页面自行处理
      // let buttonList = this.getPermissions("action", "btnConfig",true);
    });

    const _this = this;
    window.addEventListener('keydown', (e) => {
      const key = e.keyCode;
      if (key == 13 && _this.isModal3) {
        _this.isModal3 = false;
      } else if (key == 27) {
        _this.isModal3 = false;
      }
    });
    if (this.$route.query.returnId) {
      this.fiveQuery('id', Number(this.$route.query.returnId));
    }

    this.getReturnBatch();
    this.formConfig3.formValue.isMatching =
      sessionStorage.getItem('isMatching') !== 'false';

    // 光标默认在物流单号框中
    this.$nextTick(() => {
      document.getElementById('orderNo').focus();
    });
    if (sessionStorage.getItem('companyId') !== null) {
      _this.formConfig2.formData.forEach((item) => {
        if (
          item.itemdata &&
          item.itemdata.name === $i18n.t('form_label.logisticsCompany')
        ) {
          // 物流公司
          item.itemdata.valuedata = sessionStorage.getItem('companyName');
          item.itemdata.pid = sessionStorage.getItem('companyId');
        }
      });
    }
  },
  watch: {
    // 监听是否为无头件
    isNoHeader() { },
    dilogList() {
      const self = this;
      const arr = [];
      self.dilogList.forEach((item) => {
        if (item.ITEM_LIST) {
          item.ITEM_LIST.forEach((items) => {
            arr.push(items);
            self.fm_one();
          });
        }
      });
      console.log(arr);
      self.setData(self.dilogList[0]);
      self.jordanTableConfig.data = arr;
    },
  },
  destroyed() {
    window.removeEventListener('keydown', this, false);
  },
  data() {
    return {
      vmI18n: $i18n,
      errModelTitle: '',
      isModal3: false,
      loading: false,
      only1: true, // 此商品已经全部扫描过，不允许再扫描 的标识1
      only2: true, // 此商品已经全部扫描过，不允许再扫描 的标识2
      ID: '', // 存储退单ID
      isNoHeader: true, // 是否为无头件,默认为是
      onRowClickIndex: '', // 单击表格某一行的index
      onRowClickData: '', // 单击表格某一行的值
      dilogList: [], // 通过弹框传来选中的值
      isEquality: true, // 扫描明细中所有明细数量是否等于扫描数量
      isSelfMotion: true, // 是否执行自动入库，默认为true
      isModal: false, // 扫描发出条码,如果无对应明细时弹框弹出的控制
      isModal2: false, // 扫描物流单号或原单单号,如果找不到弹出的控制
      searchValue: [], // 集成搜索的值
      // 弹框数据
      changeWarehouseConfig: {
        refFuns: 'confirmFun',
        confirmTitle: $i18n.t('modalTitle.data'), // 数据
        titleAlign: 'left', // 设置标题是否居中 center left
        width: '800',
        scrollable: false, // 是否可以滚动
        closable: true, // 是否可以按esc关闭
        draggable: true, // 是否可以拖动
        mask: false, // 是否显示遮罩层
        maskClosable: true, // 是否可以点击叉号关闭
        transfer: true, // 是否将弹层放在body内
        name: 'dilog', // 组件名称
        url: 'returngood/scanIn/scandilog',
        keepAlive: true,
        excludeString: 'dilog', // 将name传进去，确认不缓存
        componentData: {},
      },
      // 弹框数据

      product_mark_list: [
        {
          label: $i18n.t('form_label.phone_number'), // 正品
          value: '1',
        },
        {
          label: $i18n.t('form_label.qualityGoods'), // 次品
          value: '0',
        },
      ],
      isSave: false,
      // 按钮
      btnConfig: {
        typeAll: 'default',
        buttons: [
          // {
          //   text: "自动匹配",
          //   btnclick: () => {
          //     let self = this;
          //     let detailList = self.jordanTableConfig.data;
          //     if(detailList.length === 0){
          //       self.$Message.warning('没有可匹配的明细');
          //       return;
          //     }
          //     detailList.forEach(item=>{
          //       if(item.QTY_SCAN !== ''){
          //         self.isSelfMotion = false;
          //         item.QTY_SCAN = item.QTY;
          //       }else {
          //         self.$Message.warning('没有可匹配的明细');
          //       }

          //     })
          //     // self.reload();
          //   }
          // },
          {
            text: $i18n.t('btn.forcedStorage'), // 强制入库
            webname: 'Forcedwarehousing_saomiaoruku',
            disabled: false,
            btnclick: () => {
              const _this = this;
              _this.forceScanIn();
            },
          },
          {
            text: $i18n.t('btn.refresh'), // 刷新
            webname: 'Refresh_saomiaoruku',
            btnclick: () => {
              const _this = this;
              _this.getReturnBatch();
            },
          },
          {
            text: $i18n.t('btn.empty'), // 清除
            webname: 'Eliminate_saomiaoruku',
            btnclick: () => {
              const _this = this;
              _this.removeData();
            },
          },
        ],
      },
      // 表单一
      formConfig1: {
        formData: [
          {
            style: 'input',
            label: $i18n.t('form_label.logisticsOrder_No'), // 物流单号
            value: 'LOGISTICS_CODE',
            width: '6',
            id: 'orderNo',
            inputenter: () => {
              const self = this;
              self.formConfig3.formValue.SPECIAL_TYPE = '0';
              self.formConfig3.formData[3].style = '';
              self.fiveQuery1(
                'logistic_code',
                self.formConfig1.formValue.LOGISTICS_CODE
              );
            },
          },
          {
            style: 'input',
            label: $i18n.t('form_label.originalOrder_No'), // 原单单号
            value: 'ORIG_ORDER_ID',
            width: '6',
            inputenter: () => {
              const self = this;
              self.formConfig3.formValue.SPECIAL_TYPE = '0';
              self.formConfig3.formData[3].style = '';
              self.fiveQuery1(
                'orig_order_id',
                self.formConfig1.formValue.ORIG_ORDER_ID
              );
            },
          },
        ],
        formValue: {
          LOGISTICS_CODE: '', // 物流单号(输入项)
          ORIG_ORDER_ID: '', // 原单单号(输入项)
        },
      },
      // 表单二
      formConfig2: {
        formData: [
          {
            style: 'select', // 下拉框类型
            label: $i18n.t('form_label.returnBatch'), // 退货批次 下拉框前的值
            width: '6', // 所占宽度宽度
            value: 'OC_B_REFUND_BATCH_ID', // 输入框的值
            multiple: false, // 布尔值,下拉框是否开启多选,默认为不开启
            // clearable:true,
            selectChange: () => {
              const self = this;
              const batchIds = self.formConfig2.formValue.OC_B_REFUND_BATCH_ID;
              // 将选中的批次状态存储到localStorage中
              sessionStorage.setItem('status', batchIds);
              self.getBatch(batchIds);
            }, // 选中事件，默认返回选中的值
            options: [
              // 下拉框选项值
            ],
          },
          {
            style: 'input',
            label: $i18n.t('form_label.returnNotes'), // 退换货备注
            value: 'REMARK',
            width: '6',
          },
          {
            style: 'input',
            label: $i18n.t('table_label.remarks'), // 备注
            value: 'REAL_REMARK',
            width: '6',
          },
          {
            style: 'popInput', // 输入框弹框单多选
            width: '6',
            itemdata: {
              col: 1,
              colid: 167630,
              colname: 'AD_C_LOGISTIC_COMPANY_ID', // 当前字段的名称
              datelimit: 'all',
              display: 'text', // 显示什么类型，例如xml表示弹窗多选加导入功能，mrp表示下拉多选
              fkdisplay: 'drp', // 外键关联类型
              fkdesc: $i18n.t('form_label.logisticsCompany'), // 物流公司
              inputname: 'CP_C_STORE_IDS:ENAME', // 这个是做中文类型的模糊查询字段，例如ENAME
              isfk: true, // 是否有fk键
              isnotnull: false, // 是否必填
              isuppercase: false, // 是否转大写
              length: 65535, // 最大长度是多少
              name: $i18n.t('form_label.logisticsCompany'), // 物流公司 input前面显示的lable值
              readonly: false, // 是否可编辑，对应input   readonly属性
              reftable: 'CP_C_LOGISTICS', // 对应的表
              reftableid: 24411, // 对应的表ID
              row: 1,
              statsize: -1,
              type: 'STRING', // 这个是后台用的
              valuedata: '', // 这个是选择的值
            },
            oneObj: (e) => {
              this.oneObjs(e);
            },
          },
          {
            style: 'input',
            label: $i18n.t('form_label.addressee_phone'), // 收件人手机
            width: '6',
            disabled: false,
            value: 'RECEIVE_MOBILE',
          },
          {
            // 2020/1/3新增需求
            style: 'popInput', // 输入框弹框单多选
            width: '6',
            itemdata: {
              col: 1,
              colid: 174971,
              colname: 'TRANSFER_STORE_ID', // 当前字段的名称
              datelimit: 'all',
              display: 'text', // 显示什么类型，例如xml表示弹窗多选加导入功能，mrp表示下拉多选
              fkdisplay: 'drp', // 外键关联类型
              fkdesc: $i18n.t('form_label.salesReturn_to_warehouse'), // 销退入库仓
              inputname: 'CP_C_STORE_IDS:ENAME', // 这个是做中文类型的模糊查询字段，例如ENAME
              isfk: true, // 是否有fk键
              isnotnull: false, // 是否必填
              isuppercase: false, // 是否转大写
              length: 65535, // 最大长度是多少
              name: $i18n.t('form_label.salesReturn_to_warehouse'), // 销退入库仓input前面显示的lable值
              readonly: false, // 是否可编辑，对应input   readonly属性
              reftable: 'CP_C_STORE', // 对应的表
              reftableid: 23296, // 对应的表ID
              row: 1,
              statsize: -1,
              type: 'STRING', // 这个是后台用的
              valuedata: '', // 这个是选择的值
            },
            oneObj: (e) => {
              this.oneObjs(e);
            },
          },
          {
            style: 'select', // 下拉框类型
            label: $i18n.t('form_label.lotType'), // 批次类型 下拉框前的值
            width: '6', // 所占宽度宽度
            disabled: true,
            value: 'BATCH_TYPE', // 输入框的值
            options: [
              {
                value: '1',
                label: $i18n.t('form_label.warehouse'), // 仓库
              },
              {
                value: '2',
                label: $i18n.t('form_label.store'), // 门店
              },
            ],
          },
          {
            style: 'input',
            label: $i18n.t('form_label.originalDeliveryWarehouse'), // 原发货仓
            width: '6',
            disabled: true,
            value: 'CP_C_PHY_WAREHOUSE_ENAME',
          },
        ],
        formValue: {
          OC_B_REFUND_BATCH_ID: '', // 退货批次ID
          // IN_STORE_ENAME:'',  //入库仓库
          REAL_REMARK: '', // 备注
          REMARK: '', // 退换货备注
          RECEIVE_MOBILE: '',
        },
      },

      // 表格
      jordanTableConfig: {
        indexColumn: true,
        isShowSelection: false, // 是否存在多选框
        columns: [
          {
            title: $i18n.t('form_label.returnOrder_no'), // 退换货单号
            key: 'OC_B_RETURN_ORDER_ID',
            width: '',
            type: 'asc',
          },
          {
            title: $i18n.t('table_label.productNo'), // 商品编码
            key: 'PS_C_PRO_ECODE',
            width: '',
            type: 'asc',
          },
          {
            title: $i18n.t('table_label.productName'), // 商品名称
            key: 'PS_C_PRO_ENAME',
            width: '',
            type: 'asc',
          },
          {
            title: $i18n.t('form_label.goodsMark'), // 商品标记
            key: 'PRODUCT_MARK',
            render: (h, params) =>
              h(
                'Select',
                {
                  style: {
                    width: '150px',
                  },
                  props: {
                    value: params.row.PRODUCT_MARK,
                    transfer: true,
                  },
                  on: {
                    'on-change': (value) => {
                      this.jordanTableConfig.data[
                        params.index
                      ].PRODUCT_MARK = value;
                    },
                  },
                },
                this.product_mark_list.forEach((item) =>
                  h('Option', {
                    props: {
                      value: item.value,
                      label: item.label,
                      transfer: true,
                    },
                  })
                )
              ),
            width: '',
            type: 'asc',
          },
          {
            title: $i18n.t('form_label.issueBarcode'), // 发出条码
            key: 'PS_C_SKU_ECODE',
            width: '',
            type: 'asc',
          },
          {
            title: $i18n.t('form_label.receivedBarcode'), // 实收条码
            key: 'REAL_SKU_ECODE',
            width: '',
            type: 'asc',
          },
          {
            title: $i18n.t('form_label.specs'), // 规格
            key: 'SKU_SPEC',
            width: '',
            type: 'asc',
          },
          {
            title: $i18n.t('table_label.quantities'), // 数量
            key: 'QTY',
            width: '',
            type: 'asc',
          },
          {
            title: $i18n.t('form_label.scansNumber'), // 扫描数量
            key: 'QTY_SCAN',
            width: '',
            type: 'asc',
          },
          {
            title: $i18n.t('form_label.gBCode'), // 国标码
            key: 'GBCODE',
            width: '',
            type: 'asc',
          },
          {
            title: $i18n.t('form_label.receivedGBcode'), // 实收国标码
            key: 'RESERVE_VARCHAR01',
            width: '',
            type: 'asc',
          },
          {
            title: $i18n.t('form_label.is_there_no_original_barcode'), // 是否无原单条码
            key: 'IS_WITHOUT_ORIG',
            width: '',
            type: 'asc',
          },
        ],
        data: [],
        highlightRow: true,
        height: '172',
      },
      // 表单三
      formConfig3: {
        formValue: {
          PS_C_SKU_ECODE: '', // 发出条码
          SPECIAL_TYPE: '0', // 特殊处理类型
          REAL_SKU_ECODE: '', // 实收条码
          isMatching: false, // 是否自动匹配
        },
        formData: [
          {
            style: 'input',
            label: '发出条码',
            autocomplete: 'off',
            value: 'PS_C_SKU_ECODE',
            width: '6',
            id: 'toNo',
            inputenter: () => {
              const self = this;
              const detailist = this.jordanTableConfig.data;
              let isDlog = true; // 标识：识别明细中是否已存在该条码
              if (self.formConfig3.formValue.PS_C_SKU_ECODE === '') {
                self.$Message.warning('发出条码不能为空');
                return;
              }
              // 判断扫描发出条码后是否为特殊处理流程
              if (
                self.formConfig3.formValue.SPECIAL_TYPE === '1' ||
                self.formConfig3.formValue.SPECIAL_TYPE === '2'
              ) {
                // 判断发出条码在明细表中是否存在

                isDlog = detailist.some(self.checkECODE);
                if (isDlog === false) {
                  // 如果扫描发出条码在明细中未存在
                  // 发出声音
                  // this.error_two();
                  // 弹框提示
                  // this.isModal = true;

                  // 07/01版本优化项:不弹框,直接扫入,根据底色判断单据状态

                  const self = this;
                  self.service.orderCenter
                    .getOneRefundItem({
                      PS_C_SKU_ECODE: self.formConfig3.formValue.PS_C_SKU_ECODE,
                    })
                    .then((res) => {
                      if (res.data.code === 0) {
                        res.data.data.IS_WITHOUT_ORIG = '是';
                        res.data.data.QTY_SCAN = 1;
                        res.data.data.QTY = 1;
                        res.data.data.PRODUCT_MARK = '1';
                        // 增加底色
                        self.$set(res.data.data, 'cellClassName', {
                          OC_B_RETURN_ORDER_ID: 'yellow',
                          PS_C_PRO_ECODE: 'yellow',
                          PS_C_PRO_ENAME: 'yellow',
                          PRODUCT_MARK: 'yellow',
                          PS_C_SKU_ECODE: 'yellow',
                          REAL_SKU_ECODE: 'yellow',
                          SKU_SPEC: 'yellow',
                          QTY: 'yellow',
                          QTY_SCAN: 'yellow',
                          GBCODE: 'yellow',
                          RESERVE_VARCHAR01: 'yellow',
                          IS_WITHOUT_ORIG: 'yellow',
                        });
                        console.log(res.data.data);
                        self.jordanTableConfig.data.push(res.data.data);
                        self.$Message.warning(res.data.message);
                        self.fm_three();
                        self.isSelfMotion = false;
                        self.formConfig3.formValue.PS_C_SKU_ECODE = '';
                      } else {
                        self.$Message.warning(res.data.message);
                        self.error_two();
                        self.formConfig3.formValue.PS_C_SKU_ECODE = '';
                      }
                    });
                } else {
                  let allScan = [];
                  detailist.forEach((item) => {
                    if (
                      (self.formConfig3.formValue.PS_C_SKU_ECODE ===
                        item.PS_C_SKU_ECODE ||
                        self.formConfig3.formValue.PS_C_SKU_ECODE ===
                        item.GBCODE) &&
                      item.OC_B_RETURN_ORDER_ID
                    ) {
                      // 条码相等且有退换货单号
                      if (item.QTY === item.QTY_SCAN) {
                        allScan.push(true);
                      } else {
                        allScan.push(false);
                      }
                    } else if (
                      (self.formConfig3.formValue.PS_C_SKU_ECODE ===
                        item.PS_C_SKU_ECODE ||
                        self.formConfig3.formValue.PS_C_SKU_ECODE ===
                        item.GBCODE) &&
                      !item.OC_B_RETURN_ORDER_ID
                    ) {
                      // 条码相等且无退换货单号
                      allScan = [false];
                    }
                  });
                  allScan = allScan.every((item) => item === true);

                  // detailist.forEach(item=>{
                  // if((self.formConfig3.formValue.PS_C_SKU_ECODE === item.PS_C_SKU_ECODE || self.formConfig3.formValue.PS_C_SKU_ECODE === item.GBCODE) && !item.OC_B_RETURN_ORDER_ID){
                  if (
                    (detailist.some(
                      (item) =>
                        item.PS_C_SKU_ECODE ===
                        self.formConfig3.formValue.PS_C_SKU_ECODE
                    ) ||
                      detailist.some(
                        (item) =>
                          item.GBCODE ===
                          self.formConfig3.formValue.PS_C_SKU_ECODE
                      )) &&
                    !detailist.some((item) => item.OC_B_RETURN_ORDER_ID)
                  ) {
                    this.service.orderCenter
                      .getOneRefundItem({
                        PS_C_SKU_ECODE:
                          self.formConfig3.formValue.PS_C_SKU_ECODE,
                      })
                      .then((res) => {
                        // console.log(res);
                        if (res.data.code === 0) {
                          // 无头件处理，将是否为原单条码改为是
                          if (
                            String(res.data.data.OC_B_RETURN_ORDER_ID) ===
                            'null'
                          ) {
                            res.data.data.IS_WITHOUT_ORIG = '是';
                          } else {
                            res.data.data.IS_WITHOUT_ORIG = '否';
                          }
                          res.data.data.QTY_SCAN = 1;
                          res.data.data.QTY = 1;
                          res.data.data.PRODUCT_MARK = '1';
                          self.jordanTableConfig.data.push(res.data.data);
                          self.$Message.warning(res.data.message);
                          self.fm_three();
                          self.isSelfMotion = false;
                          self.formConfig3.formValue.PS_C_SKU_ECODE = '';
                        } else {
                          self.$Message.warning(res.data.message);
                          self.error_two();
                          self.formConfig3.formValue.PS_C_SKU_ECODE = '';
                        }
                      });
                  }
                  for (let i = 0; i < detailist.length; i++) {
                    const item = detailist[i];
                    if (!allScan) {
                      if (
                        (self.formConfig3.formValue.PS_C_SKU_ECODE ===
                          item.PS_C_SKU_ECODE ||
                          self.formConfig3.formValue.PS_C_SKU_ECODE ===
                          item.GBCODE) &&
                        item.QTY > item.QTY_SCAN
                      ) {
                        item.QTY_SCAN = Number(item.QTY_SCAN) + 1;
                        self.$set(item, 'cellClassName', {
                          OC_B_RETURN_ORDER_ID: 'green',
                          PS_C_PRO_ECODE: 'green',
                          PS_C_PRO_ENAME: 'green',
                          PRODUCT_MARK: 'green',
                          PS_C_SKU_ECODE: 'green',
                          REAL_SKU_ECODE: 'green',
                          SKU_SPEC: 'green',
                          QTY: 'green',
                          QTY_SCAN: 'green',
                          GBCODE: 'green',
                          RESERVE_VARCHAR01: 'green',
                          IS_WITHOUT_ORIG: 'green',
                        });
                        self.formConfig3.formValue.PS_C_SKU_ECODE = '';
                        self.fm_three();
                        break;
                      }
                    } else if (self.only1) {
                      // this.$Message.warning('此商品已经全部扫描过，不允许再扫描');
                      // self.error_two();
                      if (
                        self.formConfig3.formValue.PS_C_SKU_ECODE ===
                        item.PS_C_SKU_ECODE ||
                        self.formConfig3.formValue.PS_C_SKU_ECODE ===
                        item.GBCODE
                      ) {
                        const arr = JSON.parse(JSON.stringify(item));
                        arr.OC_B_RETURN_ORDER_ID = '';
                        arr.IS_WITHOUT_ORIG = '是';
                        arr.PRODUCT_MARK = '1';
                        self.$set(arr, 'cellClassName', {
                          OC_B_RETURN_ORDER_ID: 'yellow',
                          PS_C_PRO_ECODE: 'yellow',
                          PS_C_PRO_ENAME: 'yellow',
                          PRODUCT_MARK: 'yellow',
                          PS_C_SKU_ECODE: 'yellow',
                          REAL_SKU_ECODE: 'yellow',
                          SKU_SPEC: 'yellow',
                          QTY: 'yellow',
                          QTY_SCAN: 'yellow',
                          GBCODE: 'yellow',
                          RESERVE_VARCHAR01: 'yellow',
                          IS_WITHOUT_ORIG: 'yellow',
                        });
                        detailist.push(arr);
                        self.fm_three();
                        self.formConfig3.formValue.PS_C_SKU_ECODE = '';
                        self.only1 = false;
                        return;
                      }
                    }
                  }
                }
              } else {
                // 判断发出条码在明细表中是否存在
                isDlog = detailist.some(
                  // return self.formConfig3.formValue.PS_C_SKU_ECODE === item.PS_C_SKU_ECODE;
                  (item) =>
                    self.formConfig3.formValue.PS_C_SKU_ECODE ===
                    item.PS_C_SKU_ECODE ||
                    self.formConfig3.formValue.PS_C_SKU_ECODE === item.GBCODE // 2019/6/6 需求改动，同时匹配发出条码和国标码；
                );
                if (isDlog === false) {
                  // 如果扫描发出条码在明细中未存在
                  // 发出声音
                  // this.error_two();
                  // 弹框提示
                  // this.isModal = true;

                  // 07/01版本优化项:不弹框,直接扫入,根据底色判断单据状态

                  const self = this;
                  self.service.orderCenter
                    .getOneRefundItem({
                      PS_C_SKU_ECODE: self.formConfig3.formValue.PS_C_SKU_ECODE,
                    })
                    .then((res) => {
                      if (res.data.code === 0) {
                        res.data.data.IS_WITHOUT_ORIG = '是';
                        res.data.data.QTY_SCAN = 1;
                        res.data.data.QTY = 1;
                        res.data.data.PRODUCT_MARK = '1';
                        // 增加底色
                        self.$set(res.data.data, 'cellClassName', {
                          OC_B_RETURN_ORDER_ID: 'yellow',
                          PS_C_PRO_ECODE: 'yellow',
                          PS_C_PRO_ENAME: 'yellow',
                          PRODUCT_MARK: 'yellow',
                          PS_C_SKU_ECODE: 'yellow',
                          REAL_SKU_ECODE: 'yellow',
                          SKU_SPEC: 'yellow',
                          QTY: 'yellow',
                          QTY_SCAN: 'yellow',
                          GBCODE: 'yellow',
                          RESERVE_VARCHAR01: 'yellow',
                          IS_WITHOUT_ORIG: 'yellow',
                        });
                        console.log(res.data.data);
                        self.jordanTableConfig.data.push(res.data.data);
                        self.$Message.warning(res.data.message);
                        self.fm_three();
                        self.isSelfMotion = false;
                        self.formConfig3.formValue.PS_C_SKU_ECODE = '';
                      } else {
                        self.$Message.warning(res.data.message);
                        self.error_two();
                        self.formConfig3.formValue.PS_C_SKU_ECODE = '';
                      }
                    });
                } else {
                  let allScan = [];
                  detailist.forEach((item) => {
                    // if(self.formConfig3.formValue.PS_C_SKU_ECODE === item.PS_C_SKU_ECODE && item.OC_B_RETURN_ORDER_ID){ //条码相等且有退换货单号
                    if (
                      (self.formConfig3.formValue.PS_C_SKU_ECODE ===
                        item.PS_C_SKU_ECODE ||
                        self.formConfig3.formValue.PS_C_SKU_ECODE ===
                        item.GBCODE) &&
                      item.OC_B_RETURN_ORDER_ID
                    ) {
                      // 条码或国标码相等且有退换货单号
                      if (item.QTY === item.QTY_SCAN) {
                        allScan.push(true);
                      } else {
                        allScan.push(false);
                      }
                    } else if (
                      (self.formConfig3.formValue.PS_C_SKU_ECODE ===
                        item.PS_C_SKU_ECODE ||
                        self.formConfig3.formValue.PS_C_SKU_ECODE ===
                        item.GBCODE) &&
                      !item.OC_B_RETURN_ORDER_ID
                    ) {
                      // 条码相等且无退换货单号
                      allScan = [false];
                    }
                  });
                  allScan = allScan.every((item) => item === true);

                  for (let i = 0; i < detailist.length; i++) {
                    const items = detailist[i];
                    // detailist.forEach(items=>{
                    if (
                      (self.formConfig3.formValue.PS_C_SKU_ECODE ===
                        items.PS_C_SKU_ECODE ||
                        self.formConfig3.formValue.PS_C_SKU_ECODE ===
                        items.GBCODE) &&
                      !items.OC_B_RETURN_ORDER_ID
                    ) {
                      // items.QTY_SCAN++;
                      // items.QTY++;
                      // let arr = [];
                      detailist.push(JSON.parse(JSON.stringify(items)));
                      self.fm_three();
                      self.formConfig3.formValue.PS_C_SKU_ECODE = '';
                    }
                    if (!allScan) {
                      if (
                        (self.formConfig3.formValue.PS_C_SKU_ECODE ===
                          items.PS_C_SKU_ECODE ||
                          self.formConfig3.formValue.PS_C_SKU_ECODE ===
                          items.GBCODE) &&
                        items.QTY > items.QTY_SCAN
                      ) {
                        items.QTY_SCAN = Number(items.QTY_SCAN) + 1;
                        self.$set(items, 'cellClassName', {
                          OC_B_RETURN_ORDER_ID: 'green',
                          PS_C_PRO_ECODE: 'green',
                          PS_C_PRO_ENAME: 'green',
                          PRODUCT_MARK: 'green',
                          PS_C_SKU_ECODE: 'green',
                          REAL_SKU_ECODE: 'green',
                          SKU_SPEC: 'green',
                          QTY: 'green',
                          QTY_SCAN: 'green',
                          GBCODE: 'green',
                          RESERVE_VARCHAR01: 'green',
                          IS_WITHOUT_ORIG: 'green',
                        });
                        self.formConfig3.formValue.PS_C_SKU_ECODE = '';
                        self.fm_three();
                        break;
                      }
                    } else if (self.only2) {
                      // this.$Message.warning('此商品已经全部扫描过，不允许再扫描');
                      // self.error_two();
                      if (
                        self.formConfig3.formValue.PS_C_SKU_ECODE ===
                        items.PS_C_SKU_ECODE ||
                        self.formConfig3.formValue.PS_C_SKU_ECODE ===
                        items.GBCODE
                      ) {
                        const arr = JSON.parse(JSON.stringify(items));
                        arr.OC_B_RETURN_ORDER_ID = '';
                        arr.IS_WITHOUT_ORIG = '是';
                        arr.PRODUCT_MARK = '1';
                        self.$set(arr, 'cellClassName', {
                          OC_B_RETURN_ORDER_ID: 'yellow',
                          PS_C_PRO_ECODE: 'yellow',
                          PS_C_PRO_ENAME: 'yellow',
                          PRODUCT_MARK: 'yellow',
                          PS_C_SKU_ECODE: 'yellow',
                          REAL_SKU_ECODE: 'yellow',
                          SKU_SPEC: 'yellow',
                          QTY: 'yellow',
                          QTY_SCAN: 'yellow',
                          GBCODE: 'yellow',
                          RESERVE_VARCHAR01: 'yellow',
                          IS_WITHOUT_ORIG: 'yellow',
                        });
                        detailist.push(arr);
                        self.fm_three();
                        self.formConfig3.formValue.PS_C_SKU_ECODE = '';
                        self.only2 = false;
                        self.isSelfMotion = false;
                        return;
                      }
                    }
                    // });
                  }
                }
              }
              self.only1 = true;
              self.only2 = true;
              if (self.formConfig3.formValue.isMatching) {
                // 判断明细表中数量全部等于扫描数量
                self.isEquality = detailist.every(
                  (item) => item.QTY_SCAN === item.QTY
                );
                if (
                  self.isEquality &&
                  self.isSelfMotion &&
                  self.jordanTableConfig.data.length !== 0 &&
                  !self.isNoHeader
                ) {
                  const a = this.getData();
                  a.ID = self.ID; // 后端要求新增两个字段 主表ID/是否强制入库
                  a.IS_FORCE = 0;
                  // 非空效验
                  if (a.LOGISTICS_CODE == '') {
                    self.$Message.warning($i18n.t('modalTips.h8')); // 必须填写物流单号才能强制保存
                    return;
                  }

                  if (a.OC_B_REFUND_BATCH_ID == '' || !a.OC_B_REFUND_BATCH_ID) {
                    self.$Message.warning($i18n.t('modalTips.i0')); // 退货批次不能为空!
                    return;
                  }
                  if (!self.formConfig2.formData[5].itemdata.pid) {
                    self.$Message.warning($i18n.t('modalTips.i1')); // 销退入库仓不能为空!
                    return;
                  }
                  // if(a.RECEIVE_MOBILE == '' || !a.RECEIVE_MOBILE){
                  //   self.$Message.warning('收件人手机不能为空!');
                  //   return;
                  // }
                  this.service.orderCenter.saveScanIncoming(a).then((res) => {
                    console.log(res);
                    if (res.data.code === 0) {
                      self.$Message.success(res.data.message);
                      if (this.$route.query.returnId) {
                        // 如果是从退换货列表跳转过来的，入库完成后再调回去
                        this.$store.commit('customize/TabHref', {
                          id: 2661,
                          type: 'action',
                          name: 'returngoodList',
                          label: $i18n.t('panel_label.forcedStorage'), // 退换货订单
                          query: Object.assign({
                            id: 2661,
                            tabTitle: $i18n.t(
                              'panel_label.forcedStorage'
                            ), // 退换货订单
                          }),
                          back: true,
                        });
                        // 销毁当前实例
                        this.$destroy();
                      } else {
                        // self.reload();
                      }
                    } else {
                      self.$Message.error(res.data.message);
                    }
                  });
                  // console.log(a);
                  // alert('自动入库');
                } // 如果数量全部等于扫描数量,则自动入库
              }
            },
          },
          {
            style: 'checkbox', // 勾选框类型
            label: $i18n.t('form_label.autoMatch'), // 是否自动匹配 前面的文字
            width: '6', // 所占的宽度
            value: 'isMatching',
            checked: false, // 是否勾选控制
            checkboxChange: (e) => {
              sessionStorage.setItem('isMatching', !e);
            },
          },
          // {
          //   style: "select", //下拉框类型
          //   label: "特殊处理类型", //下拉框前的值
          //   width: "6", //所占宽度宽度
          //   value: "SPECIAL_TYPE", //输入框的值
          //   multiple: false, //布尔值,下拉框是否开启多选,默认为不开启
          //   selectChange: () => {
          //     let self = this;
          //     let val = self.formConfig3.formValue.SPECIAL_TYPE;
          //     let data = self.formConfig3.formData.find(
          //       item => item.label === "实收条码"
          //     );
          //     if (val == "0") {
          //       data['style'] = "";
          //     } else {
          //       data['style'] = "input";
          //       //处理拆单逻辑
          //       self.jordanTableConfig.data.forEach(item=>{
          //         let twoQty = item.QTY;
          //         item.QTY = 1;
          //         item.QTY_SCAN = 0;

          //         for(let i = 0; i <twoQty-1; i++){
          //           let obj = '';
          //           obj = JSON.stringify(item);
          //           self.jordanTableConfig.data.push(JSON.parse(obj));
          //         }
          //       })
          //       self.isSelfMotion = false;
          //     }
          //   }, //选中事件，默认返回选中的值
          //   options: [
          //     //下拉框选项值
          //     {
          //       value: "0",
          //       label: "正常"
          //     },
          //     {
          //       value: "1",
          //       label: "错发扫描处理",
          //       disabled: true
          //     },
          //     {
          //       value: "2",
          //       label: "鞋盒条码与实物条码不符"
          //     }
          //   ]
          // },
          {
            style: 'radio', // 单选框
            label: $i18n.t('form_label.specialTreatmentType'), // 特殊处理类型 前面字段
            width: '6', // 宽度
            value: 'SPECIAL_TYPE', // 绑定到formValue的值
            radioChange: () => {
              const self = this;
              const val = self.formConfig3.formValue.SPECIAL_TYPE;
              const data = self.formConfig3.formData.find(
                (item) =>
                  item.label === $i18n.t('form_label.receivedBarcode') // 实收条码
              );
              if (val == '0') {
                data.style = '';
              } else {
                data.style = 'input';
                // 处理拆单逻辑
                // self.jordanTableConfig.data.forEach(item=>{
                //   let twoQty = item.QTY;
                //   item.QTY = 1;
                //   item.QTY_SCAN = 0;

                //   for(let i = 0; i <twoQty-1; i++){
                //     let obj = '';
                //     obj = JSON.stringify(item);
                //     self.jordanTableConfig.data.push(JSON.parse(obj));
                //   }
                // })
                self.isSelfMotion = false;
              }
            }, // 切换时的方法
            setRequired: '', // 必选标识,值不为required时无标识
            options: [
              // radio选项
              {
                value: '0',
                label: $i18n.t('form_label.normal'), // 正常
              },
              // {
              //   value: "1",
              //   label: "错发扫描处理",
              //   disabled: true
              // },
              {
                value: '2',
                label: $i18n.t('form_label.bar_code_does_not_match'), // 鞋盒条码与实物条码不符
              },
            ],
          },
          {
            style: '',
            label: $i18n.t('form_label.receivedBarcode'), // 实收条码
            value: 'REAL_SKU_ECODE',
            width: '6',
            inputenter: () => {
              const self = this;
              // if(self.onRowClickData !== ''){
              if (self.formConfig3.formValue.REAL_SKU_ECODE === '') {
                self.$Message.warning($i18n.t('modalTips.i3')); // 实收条码不能为空
                self.error_two();
                return;
              }
              if (self.onRowClickData !== '') {
                if (
                  self.formConfig3.formValue.REAL_SKU_ECODE ===
                  self.onRowClickData.PS_C_SKU_ECODE
                ) {
                  self.$Message.warning($i18n.t('modalTips.i4')); // 实收条码与发出条码一致，请检查后重新扫描
                  self.formConfig3.formValue.REAL_SKU_ECODE = '';
                  self.error_two();
                  return;
                }
              } else if (self.jordanTableConfig.data.length === 1) {
                // 当扫描明细区只有一条数据时
                const self = this;
                self.service.orderCenter
                  .getOneRefundItem({
                    PS_C_SKU_ECODE: self.formConfig3.formValue.REAL_SKU_ECODE,
                  })
                  .then((res) => {
                    if (res.data.code === 0) {
                      const self = this;
                      self.jordanTableConfig.data[0].REAL_SKU_ECODE =
                        res.data.data.PS_C_SKU_ECODE;
                      self.jordanTableConfig.data[0].RESERVE_VARCHAR01 =
                        res.data.data.GBCODE;
                      self.jordanTableConfig.data[0].REAL_SKU_ID =
                        res.data.data.PS_C_SKU_ID;
                      self.jordanTableConfig.data[0].QTY_SCAN = 1;
                      if (
                        !self.jordanTableConfig.data[0].OC_B_RETURN_ORDER_ID
                      ) {
                        self.jordanTableConfig.data[0].IS_WITHOUT_ORIG = '是';
                      }
                      self.formConfig3.formValue.REAL_SKU_ECODE = '';
                      self.fm_three();
                    } else {
                      self.$Message.warning($i18n.t('modalTips.i5')); // 本地条码档案中不存在此条码，请检查后重试
                      self.formConfig3.formValue.REAL_SKU_ECODE = '';
                      self.error_two();
                    }
                  });
                return;
              } else {
                self.$Message.warning($i18n.t('modalTips.i6')); // 请先选择一行记录进行扫描
                self.formConfig3.formValue.REAL_SKU_ECODE = '';
                self.error_two();
                return;
              }

              // if(self.formConfig3.formValue.REAL_SKU_ECODE !== '') {
              if (self.onRowClickData.OC_B_RETURN_ORDER_ID) {
                // 有退换货单号时
                const self = this;
                self.service.orderCenter
                  .getOneRefundItem({
                    PS_C_SKU_ECODE: self.formConfig3.formValue.REAL_SKU_ECODE,
                  })
                  .then((res) => {
                    if (res.data.code === 0) {
                      console.log(res);
                      // self.jordanTableConfig.data[self.onRowClickIndex].REAL_SKU_ECODE = self.formConfig3.formValue['REAL_SKU_ECODE']
                      self.jordanTableConfig.data[
                        self.onRowClickIndex
                      ].REAL_SKU_ECODE = res.data.data.PS_C_SKU_ECODE;
                      self.jordanTableConfig.data[
                        self.onRowClickIndex
                      ].RESERVE_VARCHAR01 = res.data.data.GBCODE;
                      self.jordanTableConfig.data[
                        self.onRowClickIndex
                      ].REAL_SKU_ID = res.data.data.PS_C_SKU_ID;
                      self.jordanTableConfig.data[
                        self.onRowClickIndex
                      ].QTY_SCAN = 1;

                      self.formConfig3.formValue.REAL_SKU_ECODE = '';
                      // console.log(self.onRowClickIndex)
                      // self.fm_three();
                    } else {
                      self.$Message.warning($i18n.t('modalTips.i5')); // 本地条码档案中不存在此条码，请检查后重试
                      self.formConfig3.formValue.REAL_SKU_ECODE = '';
                      self.error_two();
                    }
                  });
              } else if (!self.onRowClickData.OC_B_RETURN_ORDER_ID) {
                // 无头件
                const self = this;
                self.service.orderCenter
                  .getOneRefundItem({
                    PS_C_SKU_ECODE: self.formConfig3.formValue.REAL_SKU_ECODE,
                  })
                  .then((res) => {
                    if (res.data.code === 0) {
                      if (
                        res.data.data.PS_C_SKU_ECODE ==
                        self.onRowClickData.PS_C_SKU_ECODE
                      ) {
                        self.$Message.warning($i18n.t('modalTips.i4')); // 实收条码与发出条码一致，请检查后重新扫描
                        self.formConfig3.formValue.REAL_SKU_ECODE = '';
                        self.error_two();
                        return;
                      }

                      self.jordanTableConfig.data[
                        self.onRowClickIndex
                      ].QTY_SCAN = 1;
                      // self.jordanTableConfig.data[self.onRowClickIndex].REAL_SKU_ECODE = self.formConfig3.formValue['REAL_SKU_ECODE'];
                      self.jordanTableConfig.data[
                        self.onRowClickIndex
                      ].REAL_SKU_ECODE = res.data.data.PS_C_SKU_ECODE;
                      self.jordanTableConfig.data[
                        self.onRowClickIndex
                      ].RESERVE_VARCHAR01 = res.data.data.GBCODE;
                      self.jordanTableConfig.data[
                        self.onRowClickIndex
                      ].REAL_SKU_ID = res.data.data.PS_C_SKU_ID;
                      self.jordanTableConfig.data[
                        self.onRowClickIndex
                      ].IS_WITHOUT_ORIG = '是';
                      // res.data.data.QTY_SCAN = 1;
                      // 无头件，将是否无原单条码改为是
                      // res.data.data.IS_WITHOUT_ORIG = "是"
                      // res.data.data.REAL_SKU_ECODE = self.formConfig3.formValue['REAL_SKU_ECODE'];
                      // self.jordanTableConfig.data.push(res.data.data);
                      self.formConfig3.formValue.REAL_SKU_ECODE = '';
                      self.fm_three();
                    } else {
                      self.$Message.warning($i18n.t('modalTips.i5')); // 本地条码档案中不存在此条码，请检查后重试
                      self.formConfig3.formValue.REAL_SKU_ECODE = '';
                      self.error_two();
                    }
                  });
              }
              // } else {
              //   self.$Message.warning('实收条码不能为空');
              //   self.error_two();
              //   return;
              // }
            },
          },
        ],
      },
      // 表单四
      formConfig4: {
        formData: [
          {
            style: 'input',
            label: $i18n.t('form_label.originalOrder_No'), // 原单单号
            width: '6',
            value: 'ORIG_ORDER_ID',
            disabled: true,
          },
          {
            style: 'input',
            label: $i18n.t('form_label.originalOrderPlatform'), // 原平台单号
            width: '6',
            value: 'ORIG_SOURCE_CODE',
            disabled: true,
          },
          {
            style: 'input',
            label: $i18n.t('table_label.buyerNickname'), // 买家昵称
            width: '6',
            value: 'BUYER_NICK',
          },
          {
            style: 'input',
            label: $i18n.t('form_label.contactNumber'), // 联系电话
            width: '6',
            value: 'RECEIVE_PHONE',
          },
          {
            style: 'input',
            label: $i18n.t('form_label.logisticsOrder_No'), // 物流单号
            width: '6',
            value: 'LOGISTICS_CODE',
          },
          {
            style: 'input',
            label: $i18n.t('form_label.addressee'), // 收件人
            width: '6',
            value: 'RECEIVE_NAME',
          },
          {
            style: 'input',
            label: $i18n.t('form_label.addressee_phone'), // 收件人手机
            width: '6',
            value: 'RECEIVE_MOBILE',
          },
          {
            style: 'input',
            label: $i18n.t('form_label.deliverGoodsAddress'), // 发货地址
            width: '6',
            value: 'RECEIVE_ADDRESS',
          },
        ],
        formValue: {
          ORIG_ORDER_ID: '', // 原单单号
          ORIG_SOURCE_CODE: '', // 原平台单号
          BUYER_NICK: '', // 买家昵称
          RECEIVE_MOBILE: '', // 收件人手机
          LOGISTICS_CODE: '', // 物流单号
          RECEIVE_NAME: '', // 收件人
          RECEIVE_PHONE: '', // 联系电话
          RECEIVE_ADDRESS: '', // 发货地址
        },
      },

      // 高级搜索
      dropList: [
        {
          label: $i18n.t('form_label.chargebackNumber'), // 退单编号
          column: 'docno',
          placeholder: $i18n.t('pHolder.chargebackNumber'), // 请输入退单编号
          type: 'Input',
          componentAttribute: {},
          value: '',
          componentEvent: {
            'on-enter': (val) => {
              const self = this;
              self.fiveQuery('id', Number(val.target.value));
            },
          },
        },
        {
          label: $i18n.t('form_label.phone_number'), // 手机号码
          column: 'test1',
          placeholder: $i18n.t('pHolder.phone_number'), // 请输入手机号码
          type: 'Input',
          componentAttribute: {},
          value: '',
          componentEvent: {
            'on-enter': (val) => {
              const self = this;
              self.fiveQuery('receiver_phone', val.target.value);
            },
          },
        },
        {
          label: $i18n.t('form_label.consignee'), // 收货人
          column: 'test2',
          placeholder: $i18n.t('pHolder.consignee'), // 请输入收货人
          type: 'Input',
          componentAttribute: {},
          value: '',
          componentEvent: {
            'on-enter': (val) => {
              const self = this;
              self.fiveQuery('receiver_name', val.target.value);
            },
          },
        },
      ],
    };
  },
};

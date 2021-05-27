// 额外退款新增/编辑、已发货退款编辑  共用此组件
import reButton from 'professionalComponents/businessButton';
import reTable from 'professionalComponents/businessActionTable';
import reForm from 'professionalComponents/businessForm';
import commonUtil from '@/assets/js/__utils__/common';
import comUtils from '@/assets/js/__utils__/common';
import axios from 'axios';
import refundAfterShipment from './constants/refundAfterShipment';

export default {
  components: {
    reButton,
    reTable,
    reForm
  },
  data() {
    return {
      sessionStorageData: '',
      vmI18n: window.vmI18n,
      IMAGE: '', // 图片
      imgIndex: 0, // 当前操作图片位置
      isModal: false,
      delTableData: [], // 要删除的退款单明细
      isOne: true,
      RETURN_STATUS: null,
      BILL_TYPE: '1',
      onSelectData: {},
      selectData: {},
      order: {
        modal: false,
        btn: {
          typeAll: 'error', // 按钮统一风格样式
          buttons: [
            {
              text: window.vmI18n.t('btn.find'), // 查找 按钮文本
              disabled: false, // 按钮禁用控制
              btnclick: () => {
                this.queryBounced();
                this.$nextTick(() => {
                  this.reForm.config.forEach((val, index) => {
                    if (val.item.label === '单据来源') {
                      this.reForm.config[index].item.props.value = '手动';
                    } else if (val.item.label === '单据日期') {
                      this.reForm.config[index].item.props.value = commonUtil.dateFormat(new Date(), 'yyyy-MM-dd');
                    }
                  });
                });
              } // 按钮点击事件
            }
          ]
        },
        orderform: {
          formValue: {
            bill_no: '',
          },
          formData: [
            {
              style: 'input',
              label: '零售发货单编号',
              value: 'bill_no',
              width: '8',
              inputenter: () => this.queryBounced()
            }
          ]
        },
        table: {
          columns: [
            {
              key: 'SOURCE_CODE',
              title: '零售发货单编号'
            },
            {
              key: 'ID',
              title: '下单店铺'
            },
            {
              key: 'USER_NICK',
              title: '发货物流'
            },
            {
              key: 'ORDER_AMT',
              title: '发货仓库'
            },
            {
              key: 'RECEIVER_NAME',
              title: '买家昵称'
            },
            {
              key: 'RECEIVER_MOBILE',
              title: '商品款号'
            },
            {
              key: 'CP_C_PHY_WAREHOUSE_ENAME',
              title: 'SKU'
            },
            {
              key: "PLATFORM",
              title: "发货数量"
            },
            {
              key: 'EXPRESSCODE',
              title: '发货金额'
            }
          ], // 表头
          data: [], // 数据配置
          indexColumn: true, // 是否显示序号
          height: '300',
          loading: false
          //   isShowSelection: true // 是否显示checkedbox
        },
        value: ''
      },
      imageUploadConfig: {
        name: window.vmI18n.t('other.uploadVoucher'),
        url: '/p/cs/upload2', // 上传地址
        sendData: {
          path: `${this.$route.params.customizedModuleName}/${this.$route.params.customizedModuleId}/`
        }, // 上传参数
        width: 270,
        height: 250,
        valuedata: []
      },
      reForm: {
        defaultColumn: 3,
        config: [
          {
            show: true, // 是否显示隐藏
            col: 3, // 列宽
            item: {
              soltName: 'CBX', // 组件类型
              props: {},
              event: {}
            }
          },
          {
            item: {
              type: 'Input',
              label: '异常登记编号',
              props: {
                value: '',
                disabled: true
              }
            }
          },
          {
            item: {
              type: 'Input',
              label: '单据状态',
              props: {
                value: '',
                disabled: true
              }
            }
          },
          {
            item: {
              type: 'Input',
              label: '订单编号',
              required: true,
              props: {
                icon: 'ios-search',
                value: '',
                disabled: true
              },
              event: {
                'on-click': () => {
                  // icon点击事件
                  const self = this;
                  self.order.modal = true;
                }
              }
            }
          },
          {
            item: {
              type: 'Input',
              label: '买家昵称',
              props: {
                value: '',
                disabled: true
              }
            }
          },
          {
            item: {
              type: 'Input',
              label: '原始平台单号',
              props: {
                value: '',
                disabled: true
              }
            }
          },
          {
            item: {
              type: 'Input',
              label: '子订单编号',
              props: {
                value: '',
                disabled: true
              }
            }
          },
          {
            item: {
              type: 'Input',
              label: '下单店铺',
              props: {
                value: '',
                disabled: true
              }
            }
          },
          {
            item: {
              type: 'Input',
              label: '发货时间',
              props: {
                value: '',
                disabled: true
              }
            }
          },
          {
            item: {
              type: 'Input',
              label: '发货物流公司',
              props: {
                value: '',
                disabled: true
              }
            }
          },
          {
            show: true, // 是否显示隐藏
            col: 1, // 列宽
            item: {
              label: '退货物流公司',
              soltName: 'returnType', // 组件类型
              props: {},
              event: {}
            }
          },
          {
            item: {
              type: 'Input',
              label: '商品款号',
              props: {
                value: '',
                disabled: true
              }
            }
          },
          {
            item: {
              type: 'Input',
              label: '发货仓库',
              props: {
                value: '',
                disabled: true
              }
            }
          },
          {
            item: {
              type: 'Input',
              label: '发货物流单号',
              props: {
                value: '',
                disabled: true
              }
            }
          },
          {
            item: {
              type: 'Input',
              label: '退货物流单号',
              props: {
                value: ''
              }
            }
          },
          {
            item: {
              type: 'Input',
              label: 'SKU',
              props: {
                value: '',
                disabled: true
              }
            }
          },
          {
            item: {
              type: 'Input',
              label: '发货数量',
              props: {
                value: '',
                disabled: true
              }
            }
          },
          {
            item: {
              type: 'Input',
              label: '异常登记数量',
              props: {
                value: ''
              }
            }
          },
          {
            item: {
              type: 'Input',
              label: '异常登记金额',
              props: {
                value: ''
              }
            }
          },
          {
            item: {
              type: 'Input',
              label: '备注',
              props: {
                value: ''
              }
            }
          },
          {
            item: {
              type: 'Input',
              label: '发货金额',
              props: {
                value: '',
                disabled: true
              }
            }
          },
          {
            show: true, // 是否显示隐藏
            col: 1, // 列宽
            item: {
              label: '异常大类',
              soltName: 'abnormalCategories', // 组件类型
              props: {},
              event: {}
            }
          },
          {
            item: {
              type: 'Select',
              label: '异常小类',
              props: {
                value: '1',
                options: []
              },
              event: {
                'on-change': value => {
                  this.sellerRemarkValueChange('payMode', value);
                }
              }
            }
          }
        ]
      },
      reFormDataConfig: refundAfterShipment.reFormDataConfig,
      sellerRemarkData: {
        USER_NICK: '',
        VIP_PHONE: '',
        SOURCE_CODE: '',
        OC_B_RETURN_TYPE_ENAME: '',
        AMT_RETURN_APPLY: '',
        PAY_MODE: '',
        BUYER_ALIPAY_NO: ''
      },
      value: ['1', '2'],
      returnTypeFormConfig: {
        formValue: {},
        formData: [
          {
            style: 'popInput',
            width: '24',
            itemdata: {
              colid: 167630,
              colname: 'CP_C_LOGISTICS_ID',
              display: 'text',
              fkdisplay: 'mrp',
              isfk: true,
              length: 100,
              name: "退货物流公司",
              isnotnull: true,
              reftable: 'V_CP_C_LOGISTICS_WAREHOUSE', // 对应的表
              reftableid: 249230554, // 对应的表ID
              pid: '', // 这个是选择的id
              valuedata: ''
            },
            oneObj: data => {
              this.returnTypeFormConfig.formValue.OC_B_RETURN_TYPE_ID = data.pid;
              this.returnTypeFormConfig.formValue.OC_B_RETURN_TYPE_ENAME = data.valuedata;
              if (data.pid) {
                this.returnTypeChange();
                this.sellerRemarkValueChange('returnType', data.valuedata);
              }
            },
            InputEnter: () => {}
          }
        ]
      },
      abnormalCategoriesFormConfig: {
        formValue: {},
        formData: [
          {
            style: 'popInput',
            width: '24',
            itemdata: {
              colid: 1700823545,
              colname: 'OC_B_LARGE_CLASS_EXCEPTION_ID',
              display: 'OBJ_FK',
              fkdisplay: 'drp',
              isfk: true,
              length: 100,
              name: "异常大类",
              isnotnull: true,
              reftable: 'OC_B_LARGE_CLASS_EXCEPTION', // 对应的表
              reftableid: 249230829, // 对应的表ID
              inputname: "OC_B_LARGE_CLASS_EXCEPTION_ID:ENAME",
              pid: '', // 这个是选择的id
              valuedata: ''
            },
            oneObj: data => {
              this.abnormalCategoriesFormConfig.formValue.OC_B_RETURN_TYPE_ID = data.pid;
              this.abnormalCategoriesFormConfig.formValue.OC_B_RETURN_TYPE_ENAME = data.valuedata;
              if (data.pid) {
                this.returnTypeChange();
                this.sellerRemarkValueChange('returnType', data.valuedata);
              }
            },
            InputEnter: () => {}
          }
        ]
      },
      returnTypeItemConfig: {
        formValue: {},
        formData: [
          {
            style: 'select', // 下拉框类型
            label: window.vmI18n.t('form_label.refundDescription'), // 退款描述
            width: '24', // 所占宽度宽度
            value: 'OC_B_RETURN_TYPE_ITEM_ID', // 输入框的值
            // clearable: true, //下拉选中是否显示清空按钮,默认为false
            options: []
          }
        ],
        ruleValidate: {
          OC_B_RETURN_TYPE_ITEM_ID: [{ required: true, message: ' ', trigger: 'blur' }]
        }
      },
      btnConfig: {
        typeAll: 'error',
        buttons: [
          {
            text: window.vmI18n.t('btn.save'), // 保存
            // class: 'save',
            // icon: 'md-download',
            btnclick: () => {
              this.save();
            }
          },
          {
            text: window.vmI18n.t('btn.back'), // 返回
            // class: 'cancel',
            // icon: 'md-arrow-round-back',
            btnclick: () => {
              comUtils.tabCloseAppoint(this);
              if (this.$route.params.customizedModuleName === 'EXTRAREFUND') {
                R3.store.commit('global/tabOpen', {
                  type: 'S',
                  tableId: 249230545,
                  tableName: 'OC_B_RETURN_AF_SEND_MANUAL',
                  back: true,
                  label: window.vmI18n.t('btn.additionalRefund') // 额外退款
                });
              } else if (this.$route.query.fromOrder === 'true') {
                // 返回零售发货单详情
                R3.store.commit('global/tabOpen', {
                  type: 'C',
                  customizedModuleName: 'ORDERMANAGEDETAIL',
                  customizedModuleId: this.$route.query.oid,
                  label: this.vmI18n.t('panel_label.retailInvoice_details'),
                  dynamicRoutingForCustomizePage: true
                });
              } else {
                R3.store.commit('global/tabOpen', {
                  type: 'S',
                  tableId: 249130393,
                  tableName: 'OC_B_RETURN_AF_SEND',
                  back: true,
                  label: window.vmI18n.t('form_label.refundNoteDelivered') // 已发货退款单
                });
              }
              // 销毁当前实例
              this.$destroy();
            }
          }
        ]
      },
      auditBtn: {
        text: window.vmI18n.t('btn.audit'), // 审核
        // class: 'save',
        // icon: 'md-download',
        disabled: this.$route.params.customizedModuleId === 'New',
        btnclick: () => {
          this.audit();
        }
      },
      navStatus: 0,
      logFormConfig: refundAfterShipment.logFormConfig,
      logTableConfig: {
        tableName: this.$route.params.customizedModuleName,
        id: this.$route.params.customizedModuleId
      },
      createdStatus: !!this.$route.query.new, // 页面数据是否初始化完成
      sellerRemarkDataCreated: !!this.$route.query.new,
      selectOptions: {
        payType: []
      }
    };
  },
  mounted() {
    // this.handleAuditBtnDisplay();
    // const customizeMessage = sessionStorage.getItem('customizeMessage');
    // if (customizeMessage) {
    //   this.sessionStorageData = JSON.parse(customizeMessage)[this.$route.params.customizedModuleId == '41460334' ? 'undefined' : this.$route.params.customizedModuleId];
    // }
    // // if (this.$route.query.id && !this.$route.query.new) {
    // // eslint-disable-next-line no-mixed-operators
    // if ((this.sessionStorageData && this.sessionStorageData.standardTableurlCustomized) || (this.sessionStorageData && this.sessionStorageData.standardCustomizeButton)) {
    //   // 已发货退款单详情跳转
    //   this.reForm.config.splice(14, 0, {
    //     item: {
    //       type: 'Input',
    //       label: window.vmI18n.t('form_label.actualRefundAmount'), // 实际退款金额
    //       props: {
    //         value: '',
    //         disabled: this.$route.params.customizedModuleName === 'REFUNDAFTERSHIPMENT'
    //       },
    //       event: {}
    //     }
    //   });
    //   this.query();
    // } else if (this.$route.query.fromOrder) {
    //   // 该类型从订单详情跳转过来的查询方式
    //   this.queryBounced(this.$route.query.oid);
    //   this.$nextTick(() => {
    //     this.reForm.config.forEach((val, index) => {
    //       if (val.item.label === '单据来源') {
    //         this.reForm.config[index].item.props.value = '手动';
    //       } else if (val.item.label === '单据日期') {
    //         this.reForm.config[index].item.props.value = commonUtil.dateFormat(new Date(), 'yyyy-MM-dd');
    //       }
    //     });
    //   });
    // } else {
    //   this.$nextTick(() => {
    //     this.reForm.config.forEach((val, index) => {
    //       if (val.item.label === '单据来源') {
    //         this.reForm.config[index].item.props.value = '手动';
    //       } else if (val.item.label === '单据日期') {
    //         this.reForm.config[index].item.props.value = commonUtil.dateFormat(new Date(), 'yyyy-MM-dd');
    //       }
    //     });
    //   });
    // }
    // if (this.$route.params.customizedModuleId !== 'New') {
    //   this.logTableInfo();
    // }
    // this.getDownUp();

    setTimeout(()=> {
      const dom = document.getElementsByClassName('ark-input ark-input-default')
      dom[2].style.backgroundColor = '#fff'
    }, 500)
  },
  methods: {
    // 确定原始订单编号
    queryorder(listData, isEnter) {
      const _this = this;
      if (isEnter) {
        _this.fromOrder(listData, true);
      } else {
        _this.onSelectData = _this.selectData;
        if (JSON.stringify(_this.onSelectData) == '{}') {
          _this.$Message.warning(window.vmI18n.t('modalTips.i7')); // 请选择一条数据！
          return;
        }
        // const QUERYORDERITEMRESULTLIST = _this.onSelectData.QUERYORDERITEMRESULTLIST;
        // _this.onSelectData.QUERYORDERITEMRESULTLIST = _this.filter(QUERYORDERITEMRESULTLIST);
        _this.setForm(_this.onSelectData);
      }
    },
    // 赋值表单数据
    setForm(data) {
      const self = this;
      self.isOne = false;
    },
    // 取消
    querycancel() {},
    onCurrentChange(val) {
      this.selectData = val;
    },
    // 查询原始订单编号
    queryBounced(num) {
      //  获取页面数据
      const _this = this;
      const lists = _this.order.orderform.formValue;
      // if (
      //   (lists.bill_no == "" || lists.bill_no == undefined) &&
      //   (lists.source_code == "" || lists.source_code == undefined) &&
      //   (lists.receiver_name == "" || lists.receiver_name == undefined) &&
      //   (lists.user_nick == "" || lists.user_nick == undefined) &&
      //   (lists.receiver_mobile == "" || lists.receiver_mobile == undefined) &&
      //   (lists.cp_c_store_ename == "" || lists.cp_c_store_ename == undefined) &&
      //   num == undefined
      // ) {
      //   _this.$Message.error("请输入查询条件！");
      //   return;
      // }
      if (!lists.bill_no && !lists.source_code && !lists.receiver_name && !lists.user_nick && !lists.receiver_mobile && !lists.cp_c_store_ename && num === undefined) {
        _this.$Message.error(_this.vmI18n.t('modalTips.i8')); // 请输入查询条件！
        return;
      }
      _this.order.table.loading = true;
      const fromdata = new FormData();
      const param = {
        page: {
          pageSize: '500',
          pageNum: '1'
        },
        highSearch: [
          {
            type: 'Select',
            queryName: 'ID',
            value: lists.bill_no
          },
          {
            type: 'Input',
            queryName: 'SOURCE_CODE',
            value: lists.source_code
          },
          {
            type: 'Input',
            queryName: 'RECEIVER_NAME',
            value: lists.receiver_name
          },
          {
            type: 'Input',
            queryName: 'USER_NICK',
            value: lists.user_nick
          },
          {
            type: 'Input',
            queryName: 'RECEIVER_MOBILE',
            value: lists.receiver_mobile
          },
          {
            type: 'Select',
            queryName: 'CP_C_SHOP_ID',
            value: lists.cp_c_store_id
          },
          {
            type: 'Select',
            queryName: 'ID',
            value: num
          },
          {
            type: 'Select',
            queryName: 'ORDER_STATUS',
            value: '1,2,3,4,5,6,9,10,11,12,13,21,51,52'
          }
        ]
      };
      fromdata.append('param', JSON.stringify(param));
      this.service.common
        .queryOrderList(fromdata)
        .then(res => {
          const query = _this.$route.query;
          if (res.data.data) {
            res.data.data.queryOrderResultList.forEach(item => {
              item.USER_NICK = `${item.USER_NICK}(${item.CP_C_SHOP_TITLE})`;
            });
            _this.order.table.data = res.data.data.queryOrderResultList;
          } else {
            _this.order.table.data = [];
          }
          if (num) {
            _this.queryorder(_this.order.table.data, true);
          }
          _this.order.table.loading = false;
          // 当订单详情跳转过来时执行
          if (query.oid && query.fromOrder) {
            this.$nextTick(() => {
              setTimeout(() => {
                this.createdStatus = true;
              }, 100);
            });
          }
        })
        .catch(() => {
          _this.$Message.info(_this.vmI18n.t('modalTips.i9')); // 查询不到数据!
          _this.order.table.loading = false;
        });
    },
    // 图片上传成功
    uploadFileChangeSuccess(res) {
      const self = this;
      self.imageUploadConfig.valuedata.push({
        name: res.data.Name,
        URL: res.data.Url
      });
      self.IMAGE = self.imageUploadConfig.valuedata;
    },
    // 图片删除回调
    deleteImg(imgInfo, imgIndex) {
      this.imgIndex = imgIndex;
      this.isModal = true;
    },
    deleteImgBySure() {
      this.imageUploadConfig.valuedata.splice(this.imgIndex - 1, 1);
      this.IMAGE = this.imageUploadConfig.valuedata;
    }
  },
  computed: {

  },
};


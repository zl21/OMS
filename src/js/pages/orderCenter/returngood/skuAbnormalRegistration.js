// sku异常登记新增/编辑
import reButton from 'professionalComponents/businessButton';
import reTable from 'professionalComponents/businessActionTable';
import reForm from 'professionalComponents/businessForm';
import commonUtil from '@/assets/js/__utils__/common';
import comUtils from '@/assets/js/__utils__/common';
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
      REGISTER_STATUS: null,
      BILL_TYPE: '1',
      onSelectData: {},
      selectData: {},
      isCopy: false,
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
              } // 按钮点击事件
            }
          ]
        },
        orderform: {
          formValue: {
            BILL_NO: '',
          },
          formData: [
            {
              style: 'input',
              label: '零售发货单编号',
              value: 'BILL_NO',
              width: '8',
              inputenter: () => this.queryBounced()
            }
          ]
        },
        table: {
          columns: [
            {
              key: 'BILL_NO',
              title: '零售发货单编号'
            },
            {
              key: 'CP_C_SHOP_TITLE',
              title: '下单店铺'
            },
            {
              key: 'CP_C_LOGISTICS_ENAME',
              title: '发货物流'
            },
            {
              key: 'CP_C_PHY_WAREHOUSE_ENAME',
              title: '发货仓库'
            },
            {
              key: 'BUYER_NICK',
              title: '买家昵称'
            },
            {
              key: 'PS_C_PRO_ECODE',
              title: '商品款号'
            },
            {
              key: 'PS_C_SKU_ECODE',
              title: 'SKU'
            },
            {
              key: "SEND_QTY",
              title: "发货数量"
            },
            {
              key: 'SEND_AMT',
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
                  self.order.orderform.formValue.BILL_NO = '';
                  self.order.table.data = [];
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
              required: true,
              props: {
                value: ''
              }
            }
          },
          {
            item: {
              type: 'Input',
              label: '异常登记金额',
              required: true,
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
              required: true,
              props: {
                value: '',
                options: []
              },
              event: {
                'on-change': value => {
                  // this.sellerRemarkValueChange('payMode', value);
                }
              }
            }
          }
        ]
      },
      // reFormDataConfig: refundAfterShipment.skuAbnormalRegistration,
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
              fkdisplay: 'drp',
              isfk: true,
              length: 100,
              name: "退货物流公司",
              isnotnull: false,
              reftable: 'V_CP_C_LOGISTICS_WAREHOUSE', // 对应的表
              reftableid: 249230554, // 对应的表ID
              pid: '', // 这个是选择的id
              valuedata: ''
            },
            oneObj: data => {
              this.returnTypeFormConfig.formValue.RETURN_CP_C_LOGISTICS_ID = data.pid;
              this.returnTypeFormConfig.formValue.RETURN_CP_C_LOGISTICS_ENAME = data.valuedata;
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
              this.abnormalCategoriesFormConfig.formValue.OC_B_LARGE_CLASS_EXCEPTION_ID = data.pid;
              this.abnormalCategoriesFormConfig.formValue.OC_B_LARGE_CLASS_EXCEPTION_NAME = data.valuedata;
              if (data.pid) {
                this.getSmallClass(data.pid);
                // this.sellerRemarkValueChange('returnType', data.valuedata);
              }
            },
            InputEnter: () => {}
          }
        ]
      },
      btnConfig: {
        typeAll: 'error',
        buttons: [
          {
            text: window.vmI18n.t('btn.save'), // 保存
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              this.save();
            }
          },
          {
            text: '审核',
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              this.audit();
            }
          },
          {
            text: '作废',
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              this.invalid();
            }
          },
          {
            text: '刷新',
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              this.query();
            }
          },
          {
            text: '复制',
            btnclick: () => {
              this.copy();
            }
          },
          {
            text: window.vmI18n.t('btn.back'), // 返回
            btnclick: () => {
              comUtils.tabCloseAppoint(this);
              R3.store.commit('global/tabOpen', {
                type: 'S',
                tableId: 249230831,
                tableName: 'OC_B_SKU_EXCEPTION_REGISTER',
                label: 'sku异常登记',
                back: true
              });
              // 销毁当前实例
              this.$destroy();
            }
          }
        ]
      },
      auditBtn: {
        text: window.vmI18n.t('btn.audit'), // 审核
        disabled: this.$route.params.customizedModuleId === 'New',
        btnclick: () => {
          this.audit();
        }
      },
      logFormConfig: refundAfterShipment.logFormConfig,
    };
  },
  mounted() {
    if (this.$route.params.customizedModuleId !== 'New') {
      this.query()

    }

    setTimeout(()=> {
      const dom = document.getElementsByClassName('ark-input ark-input-default')
      dom[2].style.backgroundColor = '#fff'
    }, 500)
  },
  methods: {
    // 详情 复制查询方法
    query() {
      const self = this;
      const ID = self.$route.params.customizedModuleId;
      const query = { ID: ID === 'New' ? '-1' : ID };
      self.service.common.abnormalRegistrationInfo(query).then(res => {
        if (res.data.code == 0) {
          const resData = res.data.data;
          self.getSmallClass(resData.OC_B_LARGE_CLASS_EXCEPTION_ID)
          self.REGISTER_STATUS = resData.REGISTER_STATUS;

          if (self.REGISTER_STATUS !== null && self.REGISTER_STATUS != 1) {
            self.btnConfig.buttons.forEach(item => {
              if (item.text == '审核' || item.text == '作废' || item.text == window.vmI18n.t('btn.save')) item.disabled = true
            })
          }

          // self.onSelectData['ID'] = res.data.data.AfSend.ID
          self.setDetailForm(resData);
          self.logFormConfig.formValue = {
            OWNERENAME: resData.OWNERNAME,
            CREATIONDATE: resData.CREATIONDATE && commonUtil.dateFormat(new Date(resData.CREATIONDATE), 'yyyy-MM-dd hh:mm:ss'),
            MODIFIERENAME: resData.MODIFIERENAME || resData.MODIFIERNAME,
            MODIFIEDDATE: resData.MODIFIEDDATE && commonUtil.dateFormat(new Date(resData.MODIFIEDDATE), 'yyyy-MM-dd hh:mm:ss')
          };
          self.onSelectData = resData;
        } else {
          self.$Message.error(res.data.message);
        }
      });
    },

    setDetailForm(data) {
      const self = this;
      self.returnTypeFormConfig.formValue.RETURN_CP_C_LOGISTICS_ID = data.RETURN_CP_C_LOGISTICS_ID;
      self.abnormalCategoriesFormConfig.formValue.OC_B_LARGE_CLASS_EXCEPTION_ID = data.OC_B_LARGE_CLASS_EXCEPTION_ID;
      self.returnTypeFormConfig.formValue.RETURN_CP_C_LOGISTICS_ENAME = data.RETURN_CP_C_LOGISTICS_ENAME;
      self.abnormalCategoriesFormConfig.formValue.OC_B_LARGE_CLASS_EXCEPTION_NAME = data.OC_B_LARGE_CLASS_EXCEPTION_NAME;
      this.returnTypeFormConfig.formData[0].itemdata.pid = data.RETURN_CP_C_LOGISTICS_ID;
      this.returnTypeFormConfig.formData[0].itemdata.valuedata = data.RETURN_CP_C_LOGISTICS_ENAME;
      this.abnormalCategoriesFormConfig.formData[0].itemdata.pid = data.OC_B_LARGE_CLASS_EXCEPTION_ID;
      this.abnormalCategoriesFormConfig.formData[0].itemdata.valuedata = data.OC_B_LARGE_CLASS_EXCEPTION_NAME;
      self.reForm.config.forEach(async item => {
        switch (item.item.label) {
          case '异常登记编号':
            item.item.props.value = data.EXCEPTION_NO;
            break
          case '单据状态':
            item.item.props.value = data.REGISTER_STATUS == 1 ? '未审核' : data.REGISTER_STATUS == 2 ? '已审核' : '已作废';
            break
          case '买家昵称':
            item.item.props.value = data.BUYER_NICK;
            break
          case '订单编号':
            item.item.props.value = data.BILL_NO
            break
          case '原始平台单号':
            item.item.props.value = data.SOURCE_CODE
            break
          case '子订单编号':
            item.item.props.value = data.OC_B_ORDER_ITEM_ID
            break
          case '下单店铺':
            item.item.props.value = data.CP_C_SHOP_TITLE
            break
          case '发货时间':
            item.item.props.value = data.SEND_TIME && commonUtil.dateFormat(new Date(data.SEND_TIME), 'yyyy-MM-dd hh:mm:ss')
            break
          case '发货物流公司':
            item.item.props.value = data.CP_C_LOGISTICS_ENAME
            break
          case '商品款号':
            item.item.props.value = data.PS_C_PRO_ECODE
            break
          case '发货仓库':
            item.item.props.value = data.CP_C_PHY_WAREHOUSE_ENAME
            break
          case '发货物流单号':
            item.item.props.value = data.LOGISTIC_NUMBER
            break
          case 'SKU':
            item.item.props.value = data.PS_C_SKU_ECODE
            break
          case '发货数量':
            item.item.props.value = data.SEND_QTY
            break
          case '发货金额':
            item.item.props.value = data.SEND_AMT
            break

          case '退货物流单号':
            item.item.props.value = data.RETURN_LOGISTIC_NUMBER;
            break
          case '异常登记数量':
            item.item.props.value = data.EXCEPTION_QTY;
            break
          case '异常登记金额':
            item.item.props.value = data.EXCEPTION_AMT;
            break
          case '备注':
            item.item.props.value = data.REMARK;
            break
          case '异常小类':
            item.item.props.value = data.OC_B_SMALL_CLASS_EXCEPTION_ID;
            break
          default:
            break
        }
      });
      // this.sellerRemarkValueChange('originalOrder', data);
      self.imageUploadConfig.valuedata = data.IMAGE ? JSON.parse(data.IMAGE) : [];
      self.IMAGE = self.imageUploadConfig.valuedata;
    },
    save() {
      const self = this;
      const flag = self.isNull();
      if (flag !== '') {
        self.$Message.warning(`${flag},${self.vmI18n.t('modalTips.y1')}`);
        return;
      }
      const y = this.reForm.config.find(item => item.item.label == '备注' && item.item.props.value.length > 100);
      if (y) return self.$Message.warning(`备注不能大于100个字符！`);
      const y1 = this.reForm.config.find(item => item.item.label == '异常登记数量' && !/^[1-9]\d*$/.test(item.item.props.value));
      if (y1) return self.$Message.warning(`异常登记数量需要为大于0的正整数！`);
      const y2 = this.reForm.config.find(item => item.item.label == '异常登记金额' && !/^([1-9]\d*(\.\d{1,2})?|([0](\.([0][1-9]|[1-9]\d{0,1}))))$/.test(item.item.props.value));
      if (y2) return self.$Message.warning(`异常登记金额需要为大于0且保留两位小数！`);
      if (this.IMAGE.length > 10) self.$Message.warning(`最大上传10张图片！`);
      
      const data = {};
      const AfSend = self.getForm();
      AfSend.ID = self.$route.query.cid || self.$route.params.customizedModuleId === 'New' || this.isCopy ? '-1' : self.$route.params.customizedModuleId;
      AfSend.RETURN_CP_C_LOGISTICS_ID = this.returnTypeFormConfig.formValue.RETURN_CP_C_LOGISTICS_ID ? this.returnTypeFormConfig.formValue.RETURN_CP_C_LOGISTICS_ID : '';
      AfSend.RETURN_CP_C_LOGISTICS_ENAME = this.returnTypeFormConfig.formValue.RETURN_CP_C_LOGISTICS_ENAME ? this.returnTypeFormConfig.formValue.RETURN_CP_C_LOGISTICS_ENAME : '';
      AfSend.OC_B_LARGE_CLASS_EXCEPTION_ID = this.abnormalCategoriesFormConfig.formValue.OC_B_LARGE_CLASS_EXCEPTION_ID;
      AfSend.OC_B_LARGE_CLASS_EXCEPTION_NAME = this.abnormalCategoriesFormConfig.formValue.OC_B_LARGE_CLASS_EXCEPTION_NAME;
      AfSend.IMAGE = this.IMAGE ? JSON.stringify(this.IMAGE) : '';

      self.reForm.config.map(item => {
        switch (item.item.label) {
          case '退货物流单号':
            AfSend.RETURN_LOGISTIC_NUMBER = item.item.props.value;
            break
          case '异常登记数量':
            AfSend.EXCEPTION_QTY = item.item.props.value;
            break
          case '异常登记金额':
            AfSend.EXCEPTION_AMT = item.item.props.value;
            break
          case '备注':
            AfSend.REMARK = item.item.props.value;
            break
          case '异常小类':
            AfSend.OC_B_SMALL_CLASS_EXCEPTION_ID = item.item.props.value;
            break
          default:
            break
        }
      })
      data.OC_B_SKU_EXCEPTION_REGISTER = AfSend;
      console.log(data)
      this.service.common.abnormalRegistrationAdd(data).then(res => {
        if (res.data.code == 0) {
          self.$Message.success(res.data.message);
          comUtils.tabCloseAppoint(this);
          R3.store.commit('global/tabOpen', {
            type: 'S',
            tableId: 249230831,
            tableName: 'OC_B_SKU_EXCEPTION_REGISTER',
            label: 'sku异常登记'
          });
          // 销毁当前实例
          this.$destroy();
        } else {
          self.$Message.error(res.data.message || '保存出错');
        }
      });
    },
    getForm() {
      // 保存获取主表数据
      const self = this;
      const AfSend = {};
      AfSend.BILL_NO = self.onSelectData.BILL_NO;
      AfSend.BUYER_NICK = self.onSelectData.BUYER_NICK;
      AfSend.CP_C_LOGISTICS_ENAME = self.onSelectData.CP_C_LOGISTICS_ENAME; // 物流公司名称
      AfSend.CP_C_LOGISTICS_ECODE = self.onSelectData.CP_C_LOGISTICS_ECODE; // 物流公司编码
      AfSend.CP_C_LOGISTICS_ID = self.onSelectData.CP_C_LOGISTICS_ID; // 物流公司ID
      AfSend.CP_C_PHY_WAREHOUSE_ENAME = self.onSelectData.CP_C_PHY_WAREHOUSE_ENAME; //  发货仓名称
      AfSend.CP_C_PHY_WAREHOUSE_ECODE = self.onSelectData.CP_C_PHY_WAREHOUSE_ECODE; //  发货仓编码
      AfSend.CP_C_PHY_WAREHOUSE_ID = self.onSelectData.CP_C_PHY_WAREHOUSE_ID; // 发货仓ID
      AfSend.CP_C_SHOP_TITLE = self.onSelectData.CP_C_SHOP_TITLE; // 店铺name
      AfSend.CP_C_SHOP_ECODE = self.onSelectData.CP_C_SHOP_ECODE; // 店铺code
      AfSend.CP_C_SHOP_ID = self.onSelectData.CP_C_SHOP_ID; // 店铺ID
      AfSend.OC_B_ORDER_ID = self.onSelectData.OC_B_ORDER_ID;
      AfSend.OC_B_ORDER_ITEM_ID = self.onSelectData.OC_B_ORDER_ITEM_ID;
      AfSend.PS_C_PRO_ECODE = self.onSelectData.PS_C_PRO_ECODE;
      AfSend.PS_C_SKU_ECODE = self.onSelectData.PS_C_SKU_ECODE;
      AfSend.PS_C_SKU_ID = self.onSelectData.PS_C_SKU_ID;
      AfSend.SEND_AMT = self.onSelectData.SEND_AMT;
      AfSend.SEND_QTY = self.onSelectData.SEND_QTY;
      AfSend.SEND_TIME = self.onSelectData.SEND_TIME;
      AfSend.SOURCE_CODE = self.onSelectData.SOURCE_CODE;
      return AfSend;
    },
    isNull() {
      let flag = this.reForm.config.find(item => item.item.required && !item.item.props.value);
      // 退货物流公司必填校验
      if (!flag) {
        if (
          // 异常大类
          !this.abnormalCategoriesFormConfig.formValue.OC_B_LARGE_CLASS_EXCEPTION_ID
        ) {
          flag = {
            item: { label: `异常大类` }
          };
        }
      }
      return `${flag ? flag.item.label : ''}`;
    },
    getSmallClass(id) {
      const self = this;
      self.reForm.config.map(item => {
        if (item.item.label == '异常小类') item.item.props.value = ''
      })
      this.service.common
      .getSmallClass({OC_B_LARGE_CLASS_EXCEPTION_ID: id})
      .then(res => {
        if (res.data.code === 0) {
          self.reForm.config.map(item => {
            if (item.item.label == '异常小类') {
              const arr = [];
              res.data.data.forEach(item => {
                arr.push({
                  label: item.ENAME,
                  value: item.OC_B_LARGE_CLASS_EXCEPTION_ID
                })
              })
              item.item.props.options = arr;
            }
          })
        }
      })
    },
    // 确定原始订单编号
    queryorder() {
      const _this = this;
      _this.onSelectData = _this.selectData;
      if (JSON.stringify(_this.onSelectData) == '{}') {
        _this.$Message.warning(window.vmI18n.t('modalTips.i7')); // 请选择一条数据！
        return;
      }
      _this.setForm(_this.onSelectData);
    },
    // 赋值表单数据
    setForm(data) {
      const self = this;
      self.reForm.config.map(item => {
        switch (item.item.label) {
          case '买家昵称':
            item.item.props.value = data.BUYER_NICK;
            break
          case '订单编号':
            item.item.props.value = data.BILL_NO
            break
          case '原始平台单号':
            item.item.props.value = data.SOURCE_CODE
            break
          case '子订单编号':
            item.item.props.value = data.OC_B_ORDER_ITEM_ID
            break
          case '下单店铺':
            item.item.props.value = data.CP_C_SHOP_TITLE
            break
          case '发货时间':
            item.item.props.value = data.SEND_TIME
            break
          case '发货物流公司':
            item.item.props.value = data.CP_C_LOGISTICS_ENAME
            break
          case '商品款号':
            item.item.props.value = data.PS_C_PRO_ECODE
            break
          case '发货仓库':
            item.item.props.value = data.CP_C_PHY_WAREHOUSE_ENAME
            break
          case '发货物流单号':
            item.item.props.value = data.LOGISTIC_NUMBER
            break
          case 'SKU':
            item.item.props.value = data.PS_C_SKU_ECODE
            break
          case '发货数量':
            item.item.props.value = data.SEND_QTY
            break
          case '发货金额':
            item.item.props.value = data.SEND_AMT
            break
          default:
            break
        }
      })
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
      if (!lists.BILL_NO) {
        _this.$Message.error("请输入查询条件！");
        return;
      }
      _this.order.table.loading = true;
      const param = {
        BILL_NO: lists.BILL_NO
      };
      this.service.common
        .abnormalRegistration(param)
        .then(res => {
          _this.order.table.loading = false;
          if (res.data.data) {
            _this.order.table.data = res.data.data;
          } else {
            _this.order.table.data = [];
          }
        })
        .catch(() => {
          _this.$Message.info(_this.vmI18n.t('modalTips.i9')); // 查询不到数据!
          _this.order.table.loading = false;
        });
    },
    // 审核
    audit() {
      this.service.common
      .abnormalRegistrationAudit({ID: this.$route.params.customizedModuleId})
      .then(res => {
        if (res.data.code === 0) {
          this.$Message.success(res.data.message);
          this.query()
        } else {
          this.$Message.error(res.data.message);
        }
      });
    },
    // 作废
    invalid() {
      this.service.common
      .abnormalRegistrationInvalid({ID: this.$route.params.customizedModuleId})
      .then(res => {
        if (res.data.code === 0) {
          this.$Message.success(res.data.message);
          this.query()
        } else {
          this.$Message.error(res.data.message);
        }
      });
    },
    // 复制
    copy() {
      const self = this;
      self.isCopy = true;
      self.btnConfig.buttons.forEach(item => {
        if (item.text == '审核' || item.text == '作废' || item.text == '刷新') item.disabled = true
        if (item.text == '保存') item.disabled = false
      })
      self.reForm.config.map(item => {
        switch (item.item.label) {
          case '异常登记编号':
            item.item.props.value = '';
            break
          case '单据状态':
            item.item.props.value = '';
            break
          case '买家昵称':
            item.item.props.value = '';
            break
          case '订单编号':
            item.item.props.value = ''
            break
          case '原始平台单号':
            item.item.props.value = ''
            break
          case '子订单编号':
            item.item.props.value = ''
            break
          case '下单店铺':
            item.item.props.value = ''
            break
          case '发货时间':
            item.item.props.value = ''
            break
          case '发货物流公司':
            item.item.props.value = ''
            break
          case '商品款号':
            item.item.props.value = ''
            break
          case '发货仓库':
            item.item.props.value = ''
            break
          case '发货物流单号':
            item.item.props.value = ''
            break
          case 'SKU':
            item.item.props.value = ''
            break
          case '发货数量':
            item.item.props.value = ''
            break
          case '发货金额':
            item.item.props.value = ''
            break
          default:
            break
        }
      })
      self.logFormConfig.formValue = {}
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


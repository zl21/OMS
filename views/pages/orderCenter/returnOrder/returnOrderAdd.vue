<template>
  <!-- 退换货订单新增 -->
  <div class="customized-detail returnOrderAdd" v-loading="loading">
    <!--按钮块-->
    <div class="customized-detail-btn">
      <businessButton :btn-config="btnConfig" />
    </div>
    <div class="customized-detail-main">
      <div class="returnAddColl">
        <Collapse v-model="openDefault">
          <Panel name="1">
            <!-- 基本信息 -->
            {{ vmI18n.t('common.baseInformation') }}
            <p slot="content">
              <businessForm :form-config="formConfig" />
            </p>
          </Panel>
          <Panel v-show="showEx" name="2">
            换货人信息
            <p slot="content">
              <businessForm :form-config="formConfigEx" :key="exFormKey"/>
            </p>
          </Panel>
          <Panel name="3">
            <!-- 退款金额 -->
            退款金额
            <p slot="content">
              <ul class="calculation-main">
                <li>
                  <div class="calculation-item">
                    <!-- 根据所有退货商品明细的应退金额合计自动算出，只读展示，正数 -->
                    <span>商品应退金额</span>
                    <label>{{PRO_ACTUAL_AMT}}</label>
                  </div>
                </li>
                <li class="symbol">+</li>
                <li>
                  <div class="calculation-item">
                    <!-- 正数，选填项 -->
                    <span>应退运费</span>
                    <Input
                      v-model="SHIP_AMT"
                      type="text"
                      :regx="/^(\s*|([1-9]{1}\d*)|(0{1}))(\.\d{0,2})?$/"
                      placeholder="0.00"
                    />
                  </div>
                </li>
                <li class="symbol">+</li>
                <li>
                  <div class="calculation-item">
                    <!-- 可正可负，选填项 -->
                    <span>调整金额</span>
                    <Input
                      v-model="ADJUST_AMT"
                      type="text"
                      :regx="/^-?\d*\.{0,1}\d{0,4}$/"
                      placeholder="0.00"
                    />
                  </div>
                </li>
                <li v-show="showEx" class="symbol">-</li>
                <li v-show="showEx">
                  <div class="calculation-item">
                    <!-- sum所有换货商品“成交金额“，只读，正数 -->
                    <span>换货金额</span>
                    <label>{{EX_ACTUAL_AMT}}</label>
                  </div>
                </li>
                <li class="symbol">=</li>
                <li>
                  <div class="calculation-item">
                    <!-- 最终应退总额=商品应退金额+应退运费+/-调整金额-换货金额，自动算出，只读展示 -->
                    <span class="black">最终应退总金额</span>
                    <label>{{FINAL_ACTUAL_AMT}}</label>
                  </div>
                </li>
              </ul>
            </p>
          </Panel>
        </Collapse>
      </div>
      <div class="customized-detail-table">
        <!-- tab切换 -->
        <businessLabel class="jordanLabel" :label-list="labelList" :label-default-value="labelDefaultValue" @labelClick="labelClick"/>
        <div class="tableBox returnChangeOrderdetails">
          <returnChangeOrderdetails 
              :key="clearDetail"
              :mainData="mainData" 
              :returnProduct="labelDefaultValue" 
              @subTableData="subTableData"></returnChangeOrderdetails>
        </div>
      </div>
      <!--单据状态图片展示 -->
      <businessStatusFlag :status-name="statusName" />
    </div>
    <!-- 查询原始订单编号 -->
    <Modal v-model="orderModal" width="900" titleAlign="left" :closable="true" :mask="true" class-name="ark-dialog" title="查询原平台单号">
        <div class="dialog-footer" slot="footer">
            <businessButton :btn-config="btnConfigMo" />
        </div>
        <searchOOID :orderData="orderData" @getRowData="getRowData"></searchOOID>
    </Modal>
  </div>
</template>

<script>
// 退换货单详情
import businessButton from 'professionalComponents/businessButton';
import businessForm from 'professionalComponents/businessForm';
import businessActionTable from 'professionalComponents/businessActionTable';
import businessLabel from 'professionalComponents/businessLabel';
import { setTimeout } from 'timers';
import businessDialog from 'professionalComponents/businessDialog';
import publicMethodsUtil from '@/assets/js/public/publicMethods';
import businessStatusFlag from 'professionalComponents/businessStatusFlag';
import buttonPermissionsMixin from '@/assets/js/mixins/buttonPermissions';
import dataAccessMixin from '@/assets/js/mixins/dataAccess';
import BurgeonValidate from "burgeonConfig/config/validate.config";
// import BtnConfig from 'burgeonConfig/config/funBtn.config';
import commonUtils from 'burgeonConfig/config/commonUtils'
import searchOOID from './searchOOID.vue'
import returnChangeOrderdetails from './returnChangeOrderdetails.vue'
import { valiObj, waterMarkMap } from './returnConfig.js'

export default {
  name: 'returngoodmanagement',
  components: {
    returnChangeOrderdetails,
    searchOOID,
    businessButton,
    businessForm,
    businessActionTable,
    businessDialog,
    businessLabel,
    businessStatusFlag
  },
  mixins: [buttonPermissionsMixin, dataAccessMixin],
  data() {
    const validatePhoneNumber = BurgeonValidate.validatePhoneNumber;
    return {
      vmI18n: $i18n,
      loading: false,
      ID: this.$route.params.customizedModuleId && (this.$route.params.customizedModuleId != 'NEW' || this.$route.params.customizedModuleId != 'New') ? this.$route.params.customizedModuleId : '-1',
      watchChange: false, // 监听修改变化
      platformData: {}, //当前平台单号数据
      modify: {
        master: {}, // 主表信息
        subInfo: [], // 子表信息
      },
      clearDetail: 0,
      isCancel: false,
      baseEx: [],
      reInfo: [],
      exFormKey: 0,
      showEx: false,
      mainData: {},
      loading: false,
      backable: false,
      bT: '0',
      /* ----------- 退/换货金额： ----------- */
      SHIP_AMT: '0.00',
      ADJUST_AMT: '0.00',
      FINAL_ACTUAL_AMT: '0.00',
      PRO_ACTUAL_AMT: '0.00',
      EX_ACTUAL_AMT: '0.00',
      /* ----------- 水印： ----------- */
      statusName: '',
      waterMarkMap: waterMarkMap,
      // 默认展开
      openDefault: ['1', '2', '3'],
      // btnConfig: BtnConfig.config(),
      btnConfig: {
        typeAll: "default",
        buttons: [
          {
            text: "保存",
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              this.save();
            },
          },
          {
            text: $i18n.t("btn.back"),
            btnclick: () => {
              this.back();
            },
          },
        ],
      },
      btnConfigMo: {
        typeAll: "default",
        btnsite: "right",
        buttons: [
          {
            text: "取消",
            btnclick: () => {
              this.orderModal = false;
            },
          },
          {
            text: '确定',
            type: 'primary',
            btnclick: () => {
              this.queryorder();
            },
          },
        ],
      },
      // 基本信息
      formConfig: {
        formValue: {
          BILL_TYPE: '',
          SOURCE_CODE: '',
          RETURN_TYPE: '',
          CP_C_SHOP_ID: '', // 1
          BUYER_NICK: '', // 1
          RECEIVER_NAME: '',// 1
          RECEIVER_MOBILE: '', // 1
          RETURNEE_NAME: '',
          RETURNEE_MOBILE: '',
          REFUND_REASON: '',
          CP_C_PHY_WAREHOUSE_IN_ID: '',
          CP_C_LOGISTICS_ID: '',
          EXPRESS_CODE: '',
          SYS_REMARK: '',
        },
        ruleValidate: {
          BILL_TYPE: [{ required: true, message: ' ', trigger: 'blur' }],
          SOURCE_CODE: [{ required: true, message: ' ', trigger: 'blur' }],
          RETURN_TYPE: [{ required: true, message: ' ', trigger: 'blur' }],
          CP_C_SHOP_ID: [{ required: true, message: ' ', trigger: 'blur' }],
          RECEIVER_MOBILE: [
            {
              validator: validatePhoneNumber,
              required: false,
              trigger: "blur",
            },
          ],
        },
        formData: [
          {
            // style: 'popInputPlus',
            colname: 'CP_C_PHY_WAREHOUSE_ENAME',
            width: '6',
            itemdata: {
              // isBackRowItem: true,
              colid: 168864,
              colname: 'CP_C_PHY_WAREHOUSE_IN_ID',
              fkdisplay: 'drp',
              isfk: true,
              isnotnull: false,
              name: $i18n.t('form_label.warehousingEntity'), // 入库实体仓库 
              readonly: false,
              pid: '',
              valuedata: '',
            },
            oneObj: (val) => {
              console.log(val);
              // this.oneObjs(e);
            },
          },
          {
            style: 'select',
            label: '单据类型', // 单据类型
            colname: 'BILL_TYPE',
            width: '6', // 所占宽度宽度
            rules: true,
            selectChange: (val) => {
              this.modifyData("ORDER_TYPE", "master");
            },
          },
          {
            style: 'input',
            colname: 'SOURCE_CODE',
            // label: $i18n.t('form_label.originalOrderNo'), // 原始订单编号输入框前文字
            width: '6',
            icon: 'ios-search',
            placeholder: '输入后请按Enter',
            rules: true,
            ghost: false, // 是否关闭幽灵按钮，默认开启
            inputenter: () => {
              this.queryEnter();
              this.modifyData("SOURCE_CODE", "master");
            }, // 表单回车事件
            inputChange: () => {
              this.modifyData("SOURCE_CODE", "master");
            },
            iconclick: () => {
              this.orderModal = true;
            }, // 点击icon图标事件
          },
          {
            version: '1.4',
            style: 'popInput',
            width: '6',
            colname: 'CP_C_SHOP_ID',
            itemdata: {
              serviceId: "r3-cp",
              colid: 171929,
              colname: 'CP_C_SHOP_ID',
              fkdisplay: 'mrp',
              isfk: true,
              isnotnull: false,
              name: '店铺名称', // 店铺名称
              readonly: false,
              reftable: 'CP_C_SHOP',
              reftableid: 10348,
              valuedata: '',
            },
            oneObj: (val) => {
              console.log(val);
            },
          },
          {
            style: 'input',
            // label: '买家昵称', // 买家昵称
            colname: 'BUYER_NICK',
            width: '6',
            inputChange: () => {
              this.modifyData("BUYER_NICK", "master");
            },
          },
          {
            style: null,
            label: '换货预留库存', // 换货预留库存
            colname: 'IS_RESERVED', // '0'/'1'
            onlyBox: true,
            width: '6',
            inputChange: () => {
              this.modifyData("IS_RESERVED", "master");
            },
          },
          {
            style: 'select',
            // label: '退货类型', // 单据类型 
            colname: 'RETURN_TYPE',
            width: '6', // 所占宽度宽度
            rules: true,
            selectChange: () => {
              this.modifyData("RETURN_TYPE", "master");
            },
            options: [],
          },
          {
            style: 'select',
            // label: $i18n.t('form_label.reasonRefund'), // 退货原因
            colname: 'REFUND_REASON',
            width: '6',
            options: [],
            inputChange: () => {
              this.modifyData("REFUND_REASON", "master");
            },
          },
          {
            style: 'input',
            // label: '退货人姓名', // 退货人姓名
            colname: 'RETURNEE_NAME',
            width: '6',
            inputChange: () => {
              this.modifyData("RETURNEE_NAME", "master");
            },
          },
          {
            style: 'input',
            // label: '退货人手机', // 退货人手机
            colname: 'RETURNEE_MOBILE',
            width: '6',
            inputChange: () => {
              this.modifyData("RETURNEE_MOBILE", "master");
            },
          },
          {
            style: 'popInput',
            colname: 'CP_C_PHY_WAREHOUSE_IN_ID',
            width: '6',
            itemdata: {
              colid: 179536,
              colname: 'CP_C_PHY_WAREHOUSE_IN_ID',
              fkdisplay: 'drp',
              isfk: true,
              // name: $i18n.t('form_label.warehousingEntity'), // 入库实体仓
              name: '入库实体仓',
              pid: '',
              valuedata: '',
            },
            oneObj: (e) => {
              // this.oneObjs(e);
              this.modifyData("CP_C_PHY_WAREHOUSE_IN_ID", "master");
              this.formConfig.formValue.CP_C_PHY_WAREHOUSE_IN_ID = e.pid;
              this.formConfig.formValue.CP_C_PHY_WAREHOUSE_IN_ENAME = e.valuedata;
            },
          },
          {
            style: 'popInput',
            colname: 'CP_C_PHY_WAREHOUSE_ID',
            width: '6',
            itemdata: {
              colid: 179536,
              colname: 'CP_C_PHY_WAREHOUSE_ID',
              fkdisplay: 'drp',
              isfk: true,
              name: '发货实体仓', // 发货实体仓
              pid: '',
              valuedata: '',
            },
            oneObj: (e) => {
              // this.oneObjs(e);
              this.modifyData("CP_C_PHY_WAREHOUSE_ID", "master");
              this.formConfig.formValue.CP_C_PHY_WAREHOUSE_ID = e.pid;
              this.formConfig.formValue.CP_C_PHY_WAREHOUSE_ENAME = e.valuedata;
            },
          },
          {
            style: 'popInput',
            width: '6',
            colname: 'CP_C_LOGISTICS_ID',
            itemdata: {
              colid: 179538,
              colname: 'CP_C_LOGISTICS_ID',
              fkdisplay: 'drp',
              isfk: true,
              name: $i18n.t('form_label.returnLogisticsCompany'), // 退回物流公司
              valuedata: '',
            },
            oneObj: (e) => {
              // this.oneObjs(e);
              this.modifyData("CP_C_LOGISTICS_ID", "master");
              this.formConfig.formValue.CP_C_LOGISTICS_ID = e.pid;
              this.formConfig.formValue.CP_C_LOGISTICS_ENAME = e.valuedata;
            },
          },
          {
            style: 'input',
            // label: $i18n.t('form_label.returnLogisticsNumber'), // 退回物流单号
            colname: 'EXPRESS_CODE',
            width: '6',
            inputChange: () => {
              this.modifyData("EXPRESS_CODE", "master");
            },
          },
          {
            style: 'input',
            // label: '单据备注', // 单据备注,
            colname: 'SYS_REMARK',
            width: '12',
            inputChange: () => {
              this.modifyData("SYS_REMARK", "master");
            },
          },
        ],
      },
      formConfigEx: {
        formValue: {
          RECEIVER_ADDRESS: '',
          EXCHANGE_SHIP_AMT: '',
          CP_C_REGION_AREA_ID: '',
          CP_C_REGION_CITY_ID: '',
          CP_C_REGION_PROVINCE_ID: '',
          RECEIVER_ZIP: '',
          RECEIVER_PHONE: '',
          RECEIVER_MOBILE: '',
          RECEIVER_NAME: '',
        },
        ruleValidate: {
          RECEIVER_ADDRESS: [{ required: true, message: ' ', trigger: 'blur' }],
          RECEIVER_NAME: [{ required: true, message: ' ', trigger: 'blur' }],
          RECEIVER_MOBILE: [
            {
              validator: validatePhoneNumber,
              required: true,
              trigger: "blur",
            },
          ],
        },
        formData: [
          {
            style: 'input',
            // label: '收货人', // 收货人
            colname: 'RECEIVER_NAME',
            width: '6',
            inputChange: () => {
              this.modifyData("RECEIVER_NAME", "master", 1);
            },
          },
          {
            style: 'input',
            // label: '收货人手机', // 收货人手机
            colname: 'RECEIVER_MOBILE',
            width: '6',
            inputChange: () => {
              this.modifyData("RECEIVER_MOBILE", "master", 1);
            },
          },
          {
            style: 'input',
            // label: '收货人电话', // 收货人电话
            colname: 'RECEIVER_PHONE',
            width: '6',
            inputChange: () => {
              this.modifyData("RECEIVER_PHONE", "master", 1);
            },
          },
          {
            style: 'input',
            // label: '收货人邮编', // 收货人邮编
            colname: 'RECEIVER_ZIP',
            width: '6',
            inputChange: () => {
              this.modifyData("RECEIVER_ZIP", "master", 1);
            },
          },
          {
            version: '1.4',
            style: 'popInput',
            width: '6',
            colname: 'CP_C_REGION_PROVINCE_ID',
            itemdata: {
              serviceId: "r3-cp",
              colid: 180257,
              colname: 'CP_C_REGION_PROVINCE_ID',
              fkdisplay: 'drp',
              isfk: true,
              name: '收货人省份',
              valuedata: '',
            },
            oneObj: (val) => {
              this.formConfigEx.formValue.CP_C_REGION_PROVINCE_ID = val.pid;
              this.formConfigEx.formValue.CP_C_REGION_PROVINCE_ENAME = val.valuedata;
              this.formConfigEx = this.emptyData(
                this.formConfigEx,
                "CP_C_REGION_PROVINCE_ID",
                this.modify,
                val,
                ["CP_C_REGION_CITY_ID", "CP_C_REGION_AREA_ID"]
              );
              this.modifyData("CP_C_REGION_PROVINCE_ID", "master", 1);
            },
          },
          {
            version: '1.4',
            style: 'popInput',
            width: '6',
            colname: 'CP_C_REGION_CITY_ID',
            inputList: [],
            itemdata: {
              serviceId: "r3-cp",
              colid: 180258,
              colname: 'CP_C_REGION_CITY_ID',
              fkdisplay: 'drp',
              isfk: true,
              name: '收货人市',
              valuedata: '',
              refcolval: {
                fixcolumn: "C_UP_ID",
                expre: "equal",
                srccol: "CP_C_REGION_PROVINCE_ID",
              },
            },
            oneObj: (val) => {
              this.formConfigEx.formValue.CP_C_REGION_CITY_ID = val.pid;
              this.formConfigEx.formValue.CP_C_REGION_CITY_ENAME = val.valuedata;
              this.formConfigEx = this.emptyData(
                this.formConfigEx,
                "CP_C_REGION_CITY_ID",
                this.modify,
                val,
                ["CP_C_REGION_AREA_ID"]
              );
              this.modifyData("CP_C_REGION_CITY_ID", "master", 1);
            },
          },
          {
            version: '1.4',
            style: 'popInput',
            width: '6',
            colname: 'CP_C_REGION_AREA_ID',
            inputList: [],
            itemdata: {
              serviceId: "r3-cp",
              colid: 180260,
              colname: 'CP_C_REGION_AREA_ID',
              fkdisplay: 'drp',
              isfk: true,
              name: '收货人区',
              valuedata: '',
              refcolval: {
                fixcolumn: "C_UP_ID",
                expre: "equal",
                srccol: "CP_C_REGION_CITY_ID",
              },
            },
            oneObj: (val) => {
              this.formConfigEx.formValue.CP_C_REGION_AREA_ID = val.pid;
              this.formConfigEx.formValue.CP_C_REGION_AREA_ENAME = val.valuedata;
              this.modifyData("CP_C_REGION_AREA_ID", "master", 1);
            },
          },
          {
            style: 'input',
            // label: $i18n.t('form_label.platformType'), // 换货邮费
            colname: 'EXCHANGE_SHIP_AMT',
            width: '6',
            inputChange: () => {
              this.modifyData("EXCHANGE_SHIP_AMT", "master", 1);
            },
          },
          {
            style: 'input',
            // label: '收货人地址', // 收货人地址
            colname: 'RECEIVER_ADDRESS',
            width: '18',
            inputChange: () => {
              this.modifyData("RECEIVER_ADDRESS", "master", 1);
            },
          },
        ],
      },
      // label
      labelList: [
        {
          label: $i18n.t('form_label.returnDetails'), // 退货明细
          value: '0',
          isShow: true,
        },
        {
          label: '换货明细', // 换货明细
          value: '1',
          isShow: false,
        },
      ],
      labelDefaultValue: '0', // lable切换显示
      orderModal: false,
      orderData: {},
    };
  },
  watch: {
    'SHIP_AMT': {
      handler(newV, oldV) {
        const pa = Number(this.PRO_ACTUAL_AMT || 0);
        const aa = Number(this.ADJUST_AMT);
        const ea = Number(this.EX_ACTUAL_AMT || 0);
        this.FINAL_ACTUAL_AMT = this.$OMS2.omsUtils.floatNumber(pa + Number(newV) + aa - ea, 2);
      }
    },
    'ADJUST_AMT': {
      handler(newV, oldV) {
        const pa = Number(this.PRO_ACTUAL_AMT || 0);
        const sa = Number(this.SHIP_AMT);
        const ea = Number(this.EX_ACTUAL_AMT || 0);
        this.FINAL_ACTUAL_AMT = this.$OMS2.omsUtils.floatNumber(pa + Number(newV) + sa - ea, 2);
      }
    },
    "formConfig.formValue.BILL_TYPE": {
      handler(newV, oldV) {
        this.bT = newV;
        this.changeBillType(newV, oldV);
      }
    },
    "formConfig.formValue.SOURCE_CODE": {
      handler(newV, oldV) {
        this.mainData.SOURCE_CODE = newV;
      }
    },
  },
  created() {
    console.log();
    this.relationShip();
  },
  destroyed() {

  },
  mounted() {
    // BtnConfig.target = this;
    // BtnConfig.singleType = 1;
    this.$nextTick(() => {
      // this.getPermissions('btnConfig', 'orderManager');
      this.initObjItem(-1);
      setTimeout(() => {
        this.loading = false;
      }, 110);
    });
  },
  methods: {
    // 单据类型变更
    changeBillType(nV, oV) {
      if (this.isCancel) return;
      const type = nV;
      const beType = oV;
      if (oV && type != beType) {
        const msg = `当前单据为${beType == '0' ? '退货单' : '退换货单'}，是否进行换单！`
        this.$Modal.info({
          title: $i18n.t('modalTitle.tips'), // 提示
          content: msg,
          mask: true,
          showCancel: true,
          okText: $i18n.t('common.determine'), // 确定
          cancelText: $i18n.t('common.cancel'), // 取消
          onOk: () => {
            if (type == '1') {
              this.$nextTick(() => {
                this.showEx = true;
                this.formConfigEx = this.$OMS2.omsUtils.initFormConfig(this.reInfo, this.formConfigEx);
                this.querItem('IS_RESERVED').style = 'checkbox';
                this.querItem('RETURN_TYPE').style = null;
                this.querItem('REFUND_REASON').style = null;
                this.exFormKey += 1;
                this.labelList.find(it => it.value == '1').isShow = true;
                this.formEmpty(this, 'formConfig', ['BILL_TYPE']);
              });
            } else {
              this.showEx = false;
              this.querItem('IS_RESERVED').style = null;
              this.querItem('RETURN_TYPE').style = 'select';
              this.querItem('REFUND_REASON').style = 'select';
              this.labelList.find(it => it.value == '1').isShow = false;
              this.DefaultValue = '0';
              this.formEmpty(this, 'formConfig', ['BILL_TYPE']);
              this.formEmpty(this, 'formConfigEx');
            }
            this.clearDetail += 1; // 清空明细
          },
          onCancel: () => {
            this.formConfig.formValue.BILL_TYPE = beType;
            this.isCancel = true;
            this.$emit('closeActionDialog', false)
            setTimeout(() => {
              this.isCancel = false;
            }, 1);
          },
        })
      }
    },
    // 清空表单
    formEmpty(_this, form, notvalueArr = [], notdrpArr = []) {
      _this[form].formData.forEach((it) => {
        if (it.itemdata && !notdrpArr.includes(it.colname)) {
          it.itemdata.pid = '';
          it.itemdata.valuedata = '';
        }
      })
      for (const key in _this[form].formValue) {
        if (!notvalueArr.includes(key)) {
          _this[form].formValue[key] = ''
        }
      }
      return _this[form]
    },
    // 原平台单号
    getRowData(row) {
      console.log(row);
      this.platformData = row;
    },
    // 处理明细子组件带出的数据
    subTableData(data) {
      const useAr = ['tui', 'huan'];
      for (const key in data) {
        if (useAr.includes(key)) {
          data[key].forEach(it => { it._checked = false });
          this.modify[key] = data[key] || [];
        }
      }
      this.PRO_ACTUAL_AMT = data.PRO_ACTUAL_AMT || 0.00;
      this.EX_ACTUAL_AMT = data.EX_ACTUAL_AMT || 0.00;
      const pa = Number(this.PRO_ACTUAL_AMT);
      const sa = Number(this.SHIP_AMT);
      const aa = Number(this.ADJUST_AMT);
      const ea = Number(this.EX_ACTUAL_AMT);
      this.FINAL_ACTUAL_AMT = this.$OMS2.omsUtils.floatNumber(pa + sa + aa - ea, 2);
      // this.FINAL_ACTUAL_AMT = data.PRO_ACTUAL_AMT;
    },
    labelClick(item) {
      this.labelDefaultValue = item.value;
    },
    async initObjItem(id) {
      const self = this;
      this.loading = true;
      const data = await this.$OMS2.omsUtils.getObject("OC_B_RETURN_ORDER_VIRTUAL_TABLE", id);
      let base = data.addcolums.find(it => it.parentname == "(OC_B_RETURN_ORDER_VIRTUAL_TABLE.ID+10)").childs;
      setTimeout(async () => {
        const dataEx = await this.$OMS2.omsUtils.getObject('OC_B_RETURN_ORDER_ECXCHANGE_TABLE', id)
        this.baseEx = dataEx.addcolums.find(it => it.parentname == "(OC_B_RETURN_ORDER_ECXCHANGE_TABLE.ID+101)").childs;
        this.reInfo = dataEx.addcolums.find(it => it.parentname == "(OC_B_RETURN_ORDER_ECXCHANGE_TABLE.ID+100)").childs;
      }, 1);
      self.formConfig = this.$OMS2.omsUtils.initFormConfig(base, self.formConfig);
      setTimeout(() => {
        this.loading = false;
        this.watchChange = true;
        this.modify.master.BILL_TYPE = '0'
      }, 100);
      this.mainData.fV = this.formConfig.formValue;
    },
    // input回车查原单信息
    async queryEnter() {
      const self = this;
      const ooId = self.formConfig.formValue.SOURCE_CODE;
      if (!ooId) return
      self.loading = true;
      let searchdata = { "table": "OC_B_ORIG_ORDER", "startindex": 0, "range": 10, "fixedcolumns": { "SOURCE_CODE": ooId }, "column_include_uicontroller": true, "isolr": false }
      let formData = new FormData();
      formData.append("searchdata", JSON.stringify(searchdata));
      const res = await self.service.common.QueryList(formData, { serviceId: "r3-oc-oms" }).catch(() => {
        self.$Message.warning('p/cs/QueryList catch !');
      });
      if (!res.data.data.row.length) {
        self.$Message.error('没有查询到当前平台单号！');
        self.loading = false;
        return
      }
      const data = res.data.data.row[0];
      this.renderForm(data);
      self.loading = false;
    },
    // 通过原始平台单号带出的数据渲染form表单
    renderForm(data) {
      const self = this;
      let drp, drpEx;
      const bT = self.formConfig.formValue.BILL_TYPE;
      drp = ['CP_C_SHOP_ID'];
      drpEx = ['CP_C_REGION_PROVINCE_ID', 'CP_C_REGION_CITY_ID', 'CP_C_REGION_AREA_ID'];
      const form = bT == '0' ? 'formConfig' : 'formConfigEx';
      for (const key in data) {
        if (bT == '1' && drpEx.includes(key)) {
          self.querItem(key, form).itemdata.pid = data[key].refobjid || ''
          self.querItem(key, form).itemdata.valuedata = data[key].val || ''
          self[form].formValue[key] = data[key].refobjid
          self[form].formValue[key.replace("_ID", "_ENAME")] = data[key].val
        }
        if (drp.includes(key)) {
          self.querItem(key).itemdata.pid = data[key].refobjid || ''
          self.querItem(key).itemdata.valuedata = data[key].val || ''
          self.formConfig.formValue[key] = data[key].refobjid
          self.formConfig.formValue[key.replace("_ID", "_ENAME")] = data[key].val
        } else {
          self.formConfig.formValue[key] = data[key].val
          if (!drpEx.includes(key)) self.formConfigEx.formValue[key] = data[key].val
          // 特别地
          self.formConfig.formValue.RETURNEE_NAME = data.RECEIVER_NAME.val || '';
          self.formConfig.formValue.RETURNEE_MOBILE = data.RECEIVER_MOBILE.val || '';
        }
      }
    },
    // 保存
    async save() {
      const self = this;
      const mainTable = JSON.parse(JSON.stringify(self.formConfig.formValue));
      const bT = mainTable.BILL_TYPE;
      if (bT == '1') Object.assign(mainTable, this.formConfigEx.formValue);
      const masterArr = Object.keys(mainTable);
      const delArr = ['RECEIVER_ADDRESS', 'EXCHANGE_SHIP_AMT', 'CP_C_REGION_AREA_ID', 'CP_C_REGION_CITY_ID', 'CP_C_REGION_PROVINCE_ID', 'RECEIVER_ZIP', 'RECEIVER_PHONE', 'RECEIVER_MOBILE', 'RECEIVER_NAME'];
      if (bT == '0') {
        for (const key in mainTable) {
          if (delArr.includes(key)) {
            delete mainTable[key]
          }
        }
      }
      const tui = self.modify.tui || [];
      const huan = self.modify.huan || [];
      // 未修改，不提示，不操作
      if (!masterArr.length && !tui.length && !huan.length) return false;
      /* =========== 保存校验 start =========== */
      let valueArr = [];
      let drpArr = [];
      valueArr = bT == '1' ? ['SOURCE_CODE', 'RECEIVER_NAME', 'RECEIVER_MOBILE', 'RECEIVER_ADDRESS'] : ["SOURCE_CODE", "RETURN_TYPE"];
      drpArr = bT == '1' ? ['CP_C_SHOP_ID', 'CP_C_REGION_PROVINCE_ID', 'CP_C_REGION_CITY_ID',] : ["CP_C_SHOP_ID"];
      const mes = this.$OMS2.omsUtils.validatorNotEmpty(
        self.formConfig,
        valueArr,
        drpArr,
      );
      if (mes) return this.$message.error(mes);
      const mes1 = this.$OMS2.omsUtils.validatorNotEmpty(
        self.formConfigEx,
        valueArr,
        drpArr,
      );
      if (mes1) return this.$message.error(mes1);
      const over = self.overLength(self.formConfig.formValue);
      if (over) return
      if (this.bT == '1') {
        if (!tui.length) return this.$message.error("退货明细不能为空！");
        if (!huan.length) return this.$message.error("换货明细不能为空！");
      } else if (this.bT == '0' && !tui.length) {
        this.$message.error("退货明细不能为空！");
        return false;
      }
      // 校验最终应退总金额不能小于0
      if (this.FINAL_ACTUAL_AMT < 0) {
        this.$message.error("最终应退总金额不能小于0！");
        return
      }
      // 校验换货金额是否等于退货金额；一致则保存成功，不一致则提示“换货金额与退货金额不一致请重新确认”
      if (this.bT == '1' && this.EX_ACTUAL_AMT != this.PRO_ACTUAL_AMT) {
        this.$message.error("换货金额与退货金额不一致请重新确认！");
        return
      }
      /* =========== 保存校验 end =========== */
      const EXCHANGE_PRICE = {
        SHIP_AMT: this.SHIP_AMT,
        ADJUST_AMT: this.ADJUST_AMT,
        FINAL_ACTUAL_AMT: this.FINAL_ACTUAL_AMT,
        PRO_ACTUAL_AMT: this.PRO_ACTUAL_AMT,
        EX_ACTUAL_AMT: this.EX_ACTUAL_AMT,
        info: bT == '0' ? '退货金额' : '换货金额',
      }
      if (bT == '0') delete EXCHANGE_PRICE.EX_ACTUAL_AMT;
      mainTable.ID = '-1';
      const param = {
        EXCHANGE_PRICE,
        BILL_TYPE: mainTable.BILL_TYPE,
        OC_B_RETURN_ORDER: mainTable,
        OC_B_RETURN_ORDER_REFUND_ITEMS: tui,
        OC_B_RETURN_ORDER_EXCHANGE_ITEMS: huan,
      };
      console.log("param::", param);
      this.loading = true;
      const {
        data: { code, data, message },
      } = await self.service.orderCenter.returnSaveBill(param).catch(() => {
        this.loading = false;
      });
      this.loading = false;
      if (code === 0) {
        this.backable = true;
        self.$Message.success(message || "no message！");
        self.modify.master = {};
        self.modify.tui = [];
        self.modify.huan = [];
        // 跳转详情
        // this.$OMS2.omsUtils.navigateMain(data.ID, 'TabOpen', 'ORDERMANAGEDETAILS', 'panel_label.addReturnOrder')
        if (data) self.ID = data;
        setTimeout(() => {
          this.$comUtils.tabCloseAppoint(this);
          this.$destroy(true);
          this.$store.commit('global/tabOpen', {
            type: 'V',
            tableName: bT == 0 ? 'OC_B_RETURN_ORDER_VIRTUAL_TABLE' : 'OC_B_RETURN_ORDER_ECXCHANGE_TABLE',
            label: '退换货单详情',
            tableId: bT == 0 ? 10728 : 10754,
            id: `${self.ID}?RETURN_SOURCE='手工新增'&SOURCE_CODE=${mainTable.SOURCE_CODE}`,
          });
        }, 10);
      } else {
        // 走框架的报错
      }
    },

    /* --------------------- 工具函数： --------------------- */
    // 保存超长校验
    overLength(val) {
      const formVali = JSON.parse(JSON.stringify(val));
      for (const key in valiObj) {
        let flag = false;
        if (formVali[key]) {
          flag = !valiObj[key].rule.test(formVali[key]);
        }
        if (flag) {
          this.$Message.warning(valiObj[key].tip ? $i18n.t(valiObj[key].tip) : valiObj[key].msg);
          return true
        }
      }
    },
    // 记录主表修改信息方法
    modifyData(ecode, obj, type) {
      const self = this;
      if (!self.watchChange) return;
      self.modify[obj][ecode] =
        self[type ? 'formConfigEx' : "formConfig"].formValue[ecode];
    },
    // 根据colname遍历查询formData子项
    querItem(key, type) {
      return this[type ? type : "formConfig"].formData.find(
        (item) => item.colname == key
      );
    },
    // 省市区联动查询-inputList填充
    relationShip() {
      this.querItem("CP_C_REGION_CITY_ID", "formConfigEx").inputList.push(
        this.querItem("CP_C_REGION_PROVINCE_ID", "formConfigEx").itemdata
      );
      this.querItem("CP_C_REGION_AREA_ID", "formConfigEx").inputList.push(
        this.querItem("CP_C_REGION_CITY_ID", "formConfigEx").itemdata
      );
    },
    // 清空省市区（eg.国家变了之后，清空省市区）
    emptyData(form, key = "", before, val, drpArr = []) {
      const fD = form.formData;
      const fV = form.formValue;
      let flag = false;
      fD.forEach((element) => {
        if (element.colname == key) {
          if (before.master[key] == val.pid) {
            flag = true;
          }
        }
        if (!flag && drpArr.includes(element.colname)) {
          element.itemdata.valuedata = "";
          element.itemdata.pid = "";
          fV[element.colname] = "";
          this.modifyData(element.colname, "master", "r");
        }
      });
      form.formData = fD;
      return form;
    },
    // 时间戳格式化
    formatDate(time) {
      const date = new Date(time);
      return dateUtil.getFormatDate(date, "yyyy-MM-dd HH:mm:ss");
    },
    keyDown() { },
    // 根据'sku编码'ID，查询添加订单明细
    async searchOrderDetail(skuCode) {
      const self = this;
      const IDS = [self.sourceId || -1]; // 后端要数组类型
      const ecodes = skuCode.split(",");
      self.loading = true;
      const {
        data: { code, data, message },
      } = await self.service.orderCenter.getOcBOrderItemBySkuECode({
        IDS,
        ECODES: ecodes,
      });
      self.loading = false;
      if (code == 0 && data) {
        if (data[0].WHETHER_VIRTUAL_PRODUCTION) {
          // 虚拟字段的处理
          self.$Modal.info({
            title: $i18n.t("modalTitle.tips"), // 提示
            // content: `${skuCode}条码为虚拟条码，是否继续添加？`,
            content: data[0].VIRTUAL_GOODS_NOTICE,
            mask: true,
            showCancel: true,
            okText: $i18n.t("btn.increase"), // 添加
            cancelText: $i18n.t("common.cancel"), // 取消
            onOk: () => {
              self.insertOrderDetail(data);
            },
            onCancel: () => {
              self.$emit("closeActionDialog", false);
            },
          });
        } else {
          self.insertOrderDetail(data);
        }
      } else {
        // self.$Message.warning(res.data.message);
      }
    },

    /* ------------------- 查询原单信息-弹窗事件 start ------------------- */
    // 添加明细 - 确定
    resetReturnMainTable() {
    },
    // 添加明细 - 取消
    detailAddCancel() {
    },
    // 原始订单编号 - 确定
    queryorder() {
      if (!Object.keys(this.platformData).length) {
        this.$Message.warning('请选中一条单据！');
        return false
      }
      this.renderForm(this.platformData);
      this.orderModal = false;
    },
    /* ------------------- 查询原单信息-弹窗事件 end ------------------- */

    // 返回
    back() {
      const self = this;
      if (self.backable) {
        // 保存成功之后返回
        self.onOk();
        return;
      }
      const masterArr = Object.keys(self.modify.master);
      if (masterArr.length) {
        this.$Modal.info({
          title: $i18n.t("modalTitle.tips"), // 提示
          content: "当前修改未保存，确定返回？",
          mask: true,
          showCancel: true,
          okText: $i18n.t("common.determine"), // 确定
          cancelText: $i18n.t("common.cancel"), // 取消
          onOk: () => {
            self.onOk();
          },
        });
      } else {
        self.onOk();
      }
    },
    onOk() {
      this.$comUtils.tabCloseAppoint(this);
      this.$destroy(true);
      this.$store.commit("customize/TabOpen", {
        id: "2624",
        type: "action",
        name: "OC_B_RETURN_ORDER",
        label: "退换货单",
        back: true,
      });
    },
  },
};

</script>

<style lang="less" scoped>
@import "~@/css/pages/orderCenter/returngood/returngoodmanagement.less";
.returnOrderAdd {
  /deep/ .returnChangeOrderdetails {
    .businessButtons-box .button-combina .button-content {
      justify-content: flex-start !important;
    }
  }
}
.calculation-main {
  display: flex;
  padding: 8px;
  background: fade(#4560ab, 8);
  li {
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
    .calculation-item {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      min-width: 50%;
      &.bg {
        background: fade(#4560ab, 10);
      }
      .ark-input-wrapper {
        width: 80%;
      }
      input {
        border: 1px solid #ccc;
        border-radius: 4px;
        height: 28px;
        text-align: center;
        z-index: 8;
      }
      span,
      label {
        height: 30px;
        line-height: 35px;
        font-weight: bold;
        font-size: 12px;
        color: #8d91a1;
        width: 100%;
        text-align: center;
      }
      label {
        height: 30px;
        line-height: 25px;
        font-size: 16px !important;
        color: #ff6951;
        .black {
          color: black;
        }
      }
    }
    &.symbol {
      flex: 0.1;
      font-size: 30px;
      color: #c3c6d2;
    }
  }
}
</style>

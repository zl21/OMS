// 订单中心->智能地址解析页面

import businessButton from 'professionalComponents/businessButton';
import businessForm from 'professionalComponents/businessForm';
import listeningToKeydownMixin from '@/assets/js/mixins/listeningToKeydown.js';
import loading from 'professionalComponents/loading';

const areaList = require('@/assets/js/address/area-list.js');
const { parse, parseArea } = require('@/assets/js/address/address-parse.js');

parseArea(areaList);

export default {
  props: {
    componentData: {},
  },
  mixins: [listeningToKeydownMixin],
  components: {
    businessButton,
    businessForm,
    loading
  },
  data() {
    return {
      objId: -1,
      loading: false,
      newReceivAddress: '',
      ORDER_ADDRESS: '', // 新地址
      formConfig:{
        labelWidth:'80',
        formValue:{},
        formData:[{
          version: "1.4",
          colname: "CP_C_REGION_PROVINCE_ID",
          style: "popInput", // 输入框弹框单多选
          width: "8",
          itemdata: {
            col: 1,
            colid: 166974, // 当前字段的ID
            colname: "CP_C_REGION_PROVINCE_ID", // 当前字段的名称
            datelimit: "all",
            display: "text", // 显示什么类型，例如xml表示弹窗多选加导入功能，mrp表示下拉多选
            fkdisplay: "drp", // 外键关联类型
            isfk: true, // 是否有fk键
            isnotnull: false, // 是否必填
            isuppercase: false, // 是否转大写
            length: 65535, // 最大长度是多少
            name: "省", // 赔付类型
            readonly: false, // 是否可编辑，对应input   readonly属性
            reftable: "CP_C_PROVINCE", // 对应的表
            reftableid: 10286, // 对应的表ID
            row: 1,
            statsize: -1,
            type: "STRING", // 这个是后台用的
            valuedata: "", // 这个是选择的值
            pid: ""
          },
          oneObj: (val) => {
            // 选中触发事件
            this.data.cp_c_region_province_id = val.pid;
            this.formConfig.formData[1].itemdata.pid = '';
            this.formConfig.formData[1].itemdata.valuedata = '';
            this.formConfig.formData[2].itemdata.pid = '';
            this.formConfig.formData[2].itemdata.valuedata = '';
          },
        },
        {
          version: "1.4",
          colname: "CP_C_REGION_CITY_ID",
          style: "popInput", // 输入框弹框单多选
          width: "8",
          inputList: [],
          itemdata: {
            col: 1,
            colid: 167077, // 当前字段的ID
            colname: "CP_C_REGION_CITY_ID", // 当前字段的名称
            datelimit: "all",
            display: "text", // 显示什么类型，例如xml表示弹窗多选加导入功能，mrp表示下拉多选
            fkdisplay: "drp", // 外键关联类型
            isfk: true, // 是否有fk键
            isnotnull: false, // 是否必填
            isuppercase: false, // 是否转大写
            length: 65535, // 最大长度是多少
            name: "市", // 赔付类型
            readonly: false, // 是否可编辑，对应input   readonly属性
            reftable: "CP_C_CITY", // 对应的表
            reftableid: 10285, // 对应的表ID
            row: 1,
            statsize: -1,
            type: "STRING", // 这个是后台用的
            valuedata: "", // 这个是选择的值
            pid: "",
            refcolval: {
              fixcolumn: "C_UP_ID",
              expre: "equal",
              srccol: "CP_C_REGION_PROVINCE_ID",
            },
          },
          oneObj: (val) => {
            // 选中触发事件
            console.log("val::", val);
            this.data.cp_c_region_city_id = val.pid;
            this.formConfig.formData[2].itemdata.pid = '';
            this.formConfig.formData[2].itemdata.valuedata = '';
          },
        },
        {
          version: "1.4",
          colname: "CP_C_REGION_AREA_ID",
          style: "popInput", // 输入框弹框单多选
          width: "8",
          inputList: [],
          itemdata: {
            col: 1,
            colid: 167091, // 当前字段的ID
            colname: "CP_C_REGION_AREA_ID", // 当前字段的名称
            datelimit: "all",
            display: "text", // 显示什么类型，例如xml表示弹窗多选加导入功能，mrp表示下拉多选
            fkdisplay: "drp", // 外键关联类型
            isfk: true, // 是否有fk键
            isnotnull: false, // 是否必填
            isuppercase: false, // 是否转大写
            length: 65535, // 最大长度是多少
            name: "区县", // 赔付类型
            readonly: false, // 是否可编辑，对应input   readonly属性
            reftable: "CP_C_DISTAREA", // 对应的表
            reftableid: 10287, // 对应的表ID
            row: 1,
            statsize: -1,
            type: "STRING", // 这个是后台用的
            valuedata: "", // 这个是选择的值
            pid: "",
            refcolval: {
              fixcolumn: "C_UP_ID",
              expre: "equal",
              srccol: "CP_C_REGION_CITY_ID",
            },
          },
          oneObj: (val) => {
            // 选中触发事件
            console.log("val::", val);
            this.data.cp_c_region_area_id = val.pid
          },
        }]
      },
      dataAysis: true, // 智能解析地址是否正确
      regx: {
        mobile: /^\d{11}$/,
        phone: /^\d{11,12}$/,
        shipamt: /^\d*(\.[0-9]{0,2})?$/,
        shipzip: /^\d{6}$/,
        number: '/^d?$/',
      },
      //获取省份的id
      province_id:'',
      data: {
        receiver_address: '', //详细地址
        cp_c_region_province_id: '', //  省份
        cp_c_region_city_id: '', // 城市
        cp_c_region_area_id: '', // 区域
        receiver_name: '', // 名字
        receiver_mobile: '', //  手机号
        receiver_phone: '', // 电话
        receiver_zip: '', // 邮编
        ship_amt: '', // 
      }, // 需要提交的数据
      ruleValidate:{
        receiver_address: [
            { required: true, message: ' ', trigger: 'blur' }
        ],
        receiver_name: [
            { required: true, message: ' ', trigger: 'blur' }
        ],
        receiver_mobile: [
            { required: true, message: ' ', trigger: 'blur' }
        ]
      },
      btnConfig: {
        typeAll: 'default', // 按钮统一风格样式
        btnsite: 'right', // 按钮位置 (right , center , left)
        buttons: [
          {
            text: $i18n.t('common.cancel'), // 取消
            btnclick: () => {
              this.$parent.$parent.closeConfirm();
            }, // 按钮点击事件
          },
          {
            text: $i18n.t('common.determine'), // 确定
            btnclick: () => {
              this.update();
            },
          }
        ],
      },
    };
  },
  methods: {
    newAddressChange(){
      if (this.newReceivAddress.length > 150) {
        this.$nextTick(()=>{
          this.newReceivAddress = this.newReceivAddress.substring(0,150);
          this.$Message.warning("收货信息的最大长不能超过150");
        })
      }
    },
    async initAddress(){
      this.loading = true;
      let params = {
        ID: this.objId,
        TABLE: 'OC_B_ORDER',
        SUB_TABLE: 'OC_B_ORDER_ITEM',
        index: 1,
        REFRESH: true,
        DECRYPT: true
      };
      try {
        const { data: { data:{DATA} } } = await this.service.orderCenter.queryObject(params);
        // this.ORDER_ADDRESS = DATA.ORDER_ADDRESS;
        this.data.cp_c_region_province_id = DATA.ITEM.CP_C_REGION_PROVINCE_ID;
        this.data.cp_c_region_city_id = DATA.ITEM.CP_C_REGION_CITY_ID;
        this.data.cp_c_region_area_id = DATA.ITEM.CP_C_REGION_AREA_ID;
        this.data.receiver_address = DATA.ITEM.RECEIVER_ADDRESS;
        this.data.receiver_name = DATA.ITEM.RECEIVER_NAME;
        this.data.receiver_mobile = DATA.ITEM.RECEIVER_MOBILE;
        this.data.receiver_phone = DATA.ITEM.RECEIVER_PHONE;
        this.data.receiver_zip = DATA.ITEM.RECEIVER_ZIP;
        this.newReceivAddress = DATA.ITEM.NEWRECEIVADDRESS;
        this.formConfig.formData[0].itemdata.valuedata = DATA.ITEM.CP_C_REGION_PROVINCE_ENAME
        this.formConfig.formData[0].itemdata.pid = DATA.ITEM.CP_C_REGION_PROVINCE_ID
        this.formConfig.formData[1].itemdata.valuedata = DATA.ITEM.CP_C_REGION_CITY_ENAME
        this.formConfig.formData[1].itemdata.pid = DATA.ITEM.CP_C_REGION_CITY_ID
        this.formConfig.formData[2].itemdata.valuedata = DATA.ITEM.CP_C_REGION_AREA_ENAME
        this.formConfig.formData[2].itemdata.pid = DATA.ITEM.CP_C_REGION_AREA_ID
        this.loading = false;
        this.ORDER_ADDRESS = `${DATA.ITEM.RECEIVER_NAME ?? ''} ${DATA.ITEM.RECEIVER_MOBILE ?? ''} ${DATA.ITEM.CP_C_REGION_PROVINCE_ENAME ?? ''}${DATA.ITEM.CP_C_REGION_CITY_ENAME ?? ''}${DATA.ITEM.CP_C_REGION_AREA_ENAME ?? ''}${DATA.ITEM.RECEIVER_ADDRESS ?? ''}`
      } catch (error) {
        console.log(error);
      }
    },
    async parseAddress() {
      if (!this.newReceivAddress) return;
      const result = parse(this.newReceivAddress);
      if (result.province == '' && (result.area == '' || result.city == '')) {
        // "请填入完整信息,如:张三,17788888888,上海上海市闵行区黎安路999号"
        this.$Message.warning($i18n.t('modalTips.f9'));
      }else{
        this.data.receiver_name = result.name;
        this.data.receiver_mobile = result.mobile;
        this.data.receiver_address = result.addr;
        this.data.receiver_phone = result.receiver_phone;
        this.data.receiver_zip = result.receiver_zip;
        this.newReceivAddress = result.newReceivAddress;
        this.formConfig.formData[0].itemdata.valuedata = result.province;
        this.formConfig.formData[1].itemdata.valuedata = result.city;
        this.formConfig.formData[2].itemdata.valuedata = result.area;
        // 地址解析默认是正确状态
        this.dataAysis = true;
        // 获取省市区的id
        await this.getSelection(166974,result.province);
        await this.getSelection(167077,result.city,this.province_id);
        await this.getSelection(167091,result.area,this.province_id);
        // 判断是收货人基础信息是否正确
        await this.intelligentReciver();
      }
    },
    async intelligentReciver() {
      if (!this.dataAysis) return;
      if (this.data.receiver_mobile) {
        const f = this.CheckRegx(this.regx.mobile, this.data.receiver_mobile);
        if (!f) return this.CheckRegxMobile();
      } else {
        // 请填写收货人手机
        return this.$Message.error($i18n.t('modalTips.yi'));
      }
      if (!this.data.receiver_name) {
        // 请填写收货人名称
        return this.$Message.error($i18n.t('modalTips.yj'));
      }
    },
    update() {
      console.log(this.data);
      if (!this.data.receiver_address) {
        // 请填写详细地址！
        return this.$Message.error($i18n.t('modalTips.ym'));
      }
      let f = this.CheckRegx(this.regx.mobile, this.data.receiver_mobile);
      if (this.componentData.ck != 50) {
        if (!f) return this.CheckRegxMobile();
      }
      if (this.data.receiver_zip) {
        f = this.CheckRegx(this.regx.shipzip, this.data.receiver_zip);
        if (!f) return this.CheckRegxZip();
      }
      const info = this.data;
      if (!info.cp_c_region_area_id) {
        delete info.cp_c_region_area_id;
      }
      const self = this;
      const param = {
        id: self.objId,
        updateInfo: info,
      };
      console.log(param);
      this.loading = true;
      this.service.orderCenter.updateOrderAddr(param).then((res) => {
        if (res.data.code === 0) {
          if (res.data.message) this.$Message.success(res.data.message);
          if (
            self.componentData.CALLBACK
            && (typeof self.componentData.CALLBACK === 'function')
          ) {
            self.componentData.CALLBACK();
          } else {
            try {
              self.$parent.$parent.$parent.autoRefresh();
            } catch (e) {
              console.log(e);
            }
          }
          self.$parent.$parent.closeConfirm();
        }
        this.loading = false;
      });
    },
    /** 校验规则
     * s 字符串
     * reg  正则表达式
     */
    CheckRegx(reg, s) {
      return reg.test(s);
    },
    CheckRegxMobile() {
      // 收货人手机不合法
      return this.$Message.error($i18n.t('modalTips.yn'));
    },
    CheckRegxPhone() {
      // 收货人电话不合法
      return this.$Message.error($i18n.t('modalTips.yo'));
    },
    CheckRegxZip() {
      // 邮编不合法
      return this.$Message.error($i18n.t('modalTips.yp'));
    },
    onKeyDown(e) {
      if (this.$refs.newReceivAddress.$refs.input === document.activeElement) {
        return;
      }
      if (e.keyCode == 27) {
        this.$parent.$parent.closeConfirm();
      }
      if (e.keyCode == 13) {
        this.update();
      }
    },
    // 获取省市区的id
    async getSelection(refcolid,name,code){
      let params = {
        isdroplistsearch:true,
        refcolid:refcolid,
        fixedcolumns:{
          C_UP_ID: code ?? '',
          ENAME:`=${name}`
        },
        startindex:0,
        range:10
      };
      const formdata = new FormData();
      formdata.append('searchdata', JSON.stringify(params));
      let { data:{data:{row}} } =  await this.service.common.QueryList(formdata);
      let pid = row[0].ECODE.val;
      this.province_id = pid;
      if(refcolid && refcolid === 166974){
        this.formConfig.formData[0].itemdata.pid = pid;
        this.data.cp_c_region_province_id = pid;
      } else if(refcolid && refcolid === 167077){
        this.formConfig.formData[1].itemdata.pid = pid;
        this.data.cp_c_region_city_id = pid;
      } else if(refcolid && refcolid === 167091){
        this.formConfig.formData[2].itemdata.pid = pid;
        this.data.cp_c_region_area_id = pid;
      }

    }
  },
  async created() {
    this.objId = this.componentData.ID;
    this.initAddress();
    this.formConfig.formData[1].inputList.push(this.formConfig.formData[0].itemdata)
    this.formConfig.formData[2].inputList.push(this.formConfig.formData[1].itemdata)
  }
};

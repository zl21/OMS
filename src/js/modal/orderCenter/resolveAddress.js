// 订单中心->智能地址解析页面

import jordanButton from 'professionalComponents/businessButton';
import { listeningToKeydownMixin } from '@/assets/js/mixins/listeningToKeydown.js';
import axios from 'axios';

const areaList = require('@/assets/js/address/area-list.js');
const { parse, parseArea } = require('@/assets/js/address/address-parse.js');

parseArea(areaList);

export default {
  props: {
    componentData: {},
  },
  mixins: [listeningToKeydownMixin],
  components: {
    jordanButton,
  },
  data() {
    return {
      vmI18n: window.vmI18n,
      isShowFromLoading: false, // 加载
      objId: -1,
      newReceivAddress: '',
      ReceivAddress: '', // 新地址
      ReceivProvince: '', // 省市区
      ReceivCity: '',
      ReceivArea: '',
      ReceivProvinceName: '',
      ReceivCityName: '',
      ReceivAreaName: '',
      ReceivName: '', // 收货人
      ReceivMobile: '', // 手机号
      provList: [],
      cityList: [],
      areaList: [],
      dataAysis: true, // 智能解析地址是否正确
      regx: {
        mobile: /^\d{11}$/,
        phone: /^\d{11,12}$/,
        shipamt: /^\d*(\.[0-9]{0,2})?$/,
        shipzip: /^\d{6}$/,
        number: '/^d?$/',
      },
      // 2019-8-12 去掉收货人的正则        name: /^[a-zA-Z_\u4e00-\u9fa5]+$/,
      data: {
        receiver_address: '',
        cp_c_region_province_id: '',
        cp_c_region_city_id: '',
        cp_c_region_area_id: '',
        receiver_name: '',
        receiver_mobile: '',
        receiver_phone: '',
        receiver_zip: '',
        ship_amt: '',
      }, // 需要提交的数据
      btnConfig: {
        typeAll: 'error', // 按钮统一风格样式
        btnsite: 'right', // 按钮位置 (right , center , left)
        buttons: [
          {
            // text: "确定", //按钮文本
            text: window.vmI18n.t('common.determine'), // 按钮文本
            btnclick: () => {
              this.update();
            },
          },
          {
            // text: "取消", //按钮文本
            text: window.vmI18n.t('common.cancel'), // 按钮文本
            btnclick: () => {
              this.$parent.$parent.closeConfirm();
            }, // 按钮点击事件
          },
        ],
      },
    };
  },
  watch: {
    componentData: {
      handler(obj, oldval) {
        // 监测数据
        this.initAddress(obj);
      },
      deep: true,
    },
  },

  methods: {
    initAddress(obj) {
      this.data.cp_c_region_province_id = obj.CP_C_REGION_PROVINCE_ID;
      this.getCity();
      this.data.cp_c_region_city_id = obj.CP_C_REGION_CITY_ID;
      this.getArea();
      this.data.cp_c_region_area_id = obj.CP_C_REGION_AREA_ID;
      this.data.receiver_address = obj.RECEIVER_ADDRESS || '';
      this.data.receiver_name = obj.RECEIVER_NAME || '';
      this.data.receiver_mobile = obj.RECEIVER_MOBILE || '';
      this.data.receiver_phone = obj.RECEIVER_PHONE || '';
      this.data.receiver_zip = obj.RECEIVER_ZIP || '';
    },
    async parseAddress() {
      if (this.newReceivAddress === '') return;
      const result = parse(this.newReceivAddress);
      this.ReceivName = result.name;
      this.ReceivMobile = result.mobile;
      this.ReceivAddress = result.addr;
      this.ReceivAreaName = result.area;
      this.ReceivCityName = result.city;
      this.ReceivProvinceName = result.province;
      // 地址解析默认是正确状态
      this.dataAysis = true;
      // 判断省市区
      await this.intelligentAddress();
      // 判断是收货人基础信息是否正确
      await this.intelligentReciver();
    },
    // 判断省市区是是否正确
    async intelligentAddress() {
      if (this.dataAysis) await this.searchProv();
      if (this.dataAysis) await this.searchCity();
      if (this.dataAysis) await this.searchArea();
    },
    async intelligentReciver() {
      if (!this.dataAysis) return;
      if (this.ReceivMobile) {
        const f = this.CheckRegx(this.regx.mobile, this.ReceivMobile);
        if (!f) return this.CheckRegxMobile();
      } else {
        // return this.$Message.error("请填写收货人手机");
        return this.$Message.error(window.vmI18n.t('modalTips.yi'));
      }
      if (this.ReceivName) {
        // let f = this.CheckRegx(this.regx.name, this.ReceivName);
        // if (!f) return this.CheckRegxName();
      } else {
        // return this.$Message.error("请填写收货人名称");
        return this.$Message.error(window.vmI18n.t('modalTips.yj'));
      }

      this.data.receiver_name = this.ReceivName;
      this.data.cp_c_region_province_id = this.ReceivProvince;
      this.data.receiver_mobile = this.ReceivMobile;
      this.data.cp_c_region_city_id = this.ReceivCity;
      this.data.cp_c_region_area_id = this.ReceivArea;
      this.data.receiver_address = this.ReceivAddress;
    },
    update() {
      if (!this.data.cp_c_region_province_id) {
        // return this.$Message.error("请填写省份！");
        return this.$Message.error(window.vmI18n.t('modalTips.yk'));
      }
      if (!this.data.cp_c_region_city_id) {
        // return this.$Message.error("请填写城市！");
        return this.$Message.error(window.vmI18n.t('modalTips.yl'));
      }
      if (!this.data.receiver_address) {
        // return this.$Message.error("请填写详细地址！");
        return this.$Message.error(window.vmI18n.t('modalTips.ym'));
      }
      //  f = this.CheckRegx(this.regx.name, this.data.receiver_name);
      // if (!f) return this.CheckRegxName();
      let f = this.CheckRegx(this.regx.mobile, this.data.receiver_mobile);
      if (this.componentData.ck != 50) {
        if (!f) return this.CheckRegxMobile();
      }
      // f = this.CheckRegx(this.regx.phone, this.data.receiver_phone);
      // if (!f) return this.CheckRegxPhone();
      if (this.data.receiver_zip) {
        f = this.CheckRegx(this.regx.shipzip, this.data.receiver_zip);
        if (!f) return this.CheckRegxZip();
      }
      const info = this.data;
      const self = this;
      self.isShowFromLoading = true;
      const param = {
        id: self.componentData.ID,
        updateInfo: info,
      };
      axios({
        url: '/api/cs/oc/oms/v1/saveOrder',
        method: 'post',
        data: param,
      }).then((res) => {
        self.isShowFromLoading = false;
        if (res.data.code === 0) {
          if (res.data.message) this.$Message.success(res.data.message);
          if (
            self.componentData.CALLBACK
            & (typeof self.componentData.CALLBACK === 'function')
          ) {
            self.componentData.CALLBACK();
          } else {
            try {
              self.$parent.$parent.$parent.autoRefresh();
            } catch (e) {
            }
          }
          self.$parent.$parent.closeConfirm();
        } else {
          self.$Message.error(res.data.message);
        }
      });
    },
    /** 校验规则
     * s 字符串
     * reg  正则表达式
     */
    CheckRegx(reg, s) {
      return reg.test(s);
    },
    // CheckRegxName() {
    //   this.$Message.error("收货人姓名不能为空,不能包含数字或者字符");
    // },
    CheckRegxMobile() {
      // return this.$Message.error("收货人手机不合法");
      return this.$Message.error(window.vmI18n.t('modalTips.yn'));
    },
    CheckRegxPhone() {
      // return this.$Message.error("收货人电话不合法");
      return this.$Message.error(window.vmI18n.t('modalTips.yo'));
    },
    CheckRegxZip() {
      // return this.$Message.error("邮编不合法");
      return this.$Message.error(window.vmI18n.t('modalTips.yp'));
    },
    searchProv() {
      const name = this.ReceivProvinceName;
      const obj = this.provList.find(
        item => item.ENAME === name
          || item.ENAME === `${name}市`
          || item.ENAME === `${name}省`
      );
      if (obj) {
        this.ReceivProvince = obj.ID || '';
        // 查找城市
        return new Promise((resolve) => {
          this.getCity(resolve, this.ReceivProvince);
        });
      } 
      // this.$Message.error("请正确填写省份");
      this.$Message.error(window.vmI18n.t('modalTips.yr'));
      this.dataAysis = false;
    },
    searchCity() {
      const name = this.ReceivCityName || '';
      const obj = this.cityList.find(
        item => item.ENAME === name || item.ENAME === `${name}市`
      );
      if (obj) {
        this.ReceivCity = obj.ID;
        // 查找城市
        return new Promise((resolve) => {
          this.getArea(resolve, this.ReceivCity);
        });
      } 
      // this.$Message.error("请正确填写城市");
      this.$Message.error(window.vmI18n.t('modalTips.ys'));
      this.dataAysis = false;
    },
    searchArea() {
      const name = this.ReceivAreaName || '';
      const obj = this.areaList.find(
        item => item.ENAME === name || item.ENAME === `${name}区`
      );
      if (obj) {
        this.ReceivArea = obj.ID;
      } else {
        // this.$Message.error("请正确填写区县");
        this.$Message.error(window.vmI18n.t('modalTips.yt'));
        this.dataAysis = false;
      }
    },
    async getProv() {
      const query = {
        ID: null,
        REGIONTYPE: 'COUN',
      };
      const res = await this.service.common.regionBySelect(query);
      // this.clearCity();
      if (res.data ? res.data.code === 0 : false) {
        this.provList = res.data.data.data.map(row => ({
          ID: row.ID,
          ENAME: row.ENAME,
        }));
      } else {
        // this.$Message.error("省份查询失败");
        this.$Message.error(window.vmI18n.t('modalTips.yu'));
      }
    },
    /** 回调
     *
     * callback
     * prov 省份
     */
    async getCity(callback, prov) {
      const provid = prov || this.data.cp_c_region_province_id;
      // if (provid === "") return this.$Message.error("请先选择省份");
      if (provid === '') return this.$Message.error(window.vmI18n.t('modalTips.yv'));
      const query = {
        ID: provid,
        REGIONTYPE: 'PROV',
      };
      const res = await this.service.common.regionBySelect(query);
      if (res.data ? res.data.code === 0 : false) {
        this.cityList = res.data.data.data.map(row => ({
          ID: row.ID,
          ENAME: row.ENAME,
        }));
        this.clearArea();
        this.data.cp_c_region_area_id = this.componentData.CP_C_REGION_AREA_ID;
      } else {
        // this.$Message.error("城市查询失败");
        this.$Message.error(window.vmI18n.t('modalTips.yw'));
      }
      typeof callback === 'function' ? callback() : '';
    },
    async getArea(callback, city) {
      const cityid = city || this.data.cp_c_region_city_id;
      // if (cityid === "") return this.$Message.error("请先选择城市");
      if (cityid === '') return this.$Message.error(window.vmI18n.t('modalTips.yx'));
      const query = {
        ID: cityid,
        REGIONTYPE: 'CITY',
      };
      const res = await this.service.common.regionBySelect(query);
      if (res.data ? res.data.code === 0 : false) {
        this.areaList = res.data.data.data.map(row => ({
          ID: row.ID,
          ENAME: row.ENAME,
        }));
      } else {
        // this.$Message.error("区县查询失败");
        this.$Message.error(window.vmI18n.t('modalTips.yy'));
      }
      typeof callback === 'function' ? callback() : '';
    },
    clearProv() {
      this.cityList = [];
      this.data.cp_c_region_city_id = '';
      this.ReceivCity = '';
      this.clearCity();
    },
    clearCity() {
      this.areaList = [];
      this.data.cp_c_region_area_id = '';
      this.ReceivArea = '';
    },
    clearArea() {
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
  },
  created() {
    // 获取所有省份的接口
    this.getProv();
    this.objId = this.componentData.ID;
    this.initAddress(this.componentData);
  },
};

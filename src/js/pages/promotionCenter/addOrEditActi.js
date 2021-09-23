import BasicInfo from 'allpages/promotionCenter/details/basicInfo';
import InfoSet from 'allpages/promotionCenter/details/infoSet';
import GiftSet from 'allpages/promotionCenter/details/giftSet';
import stepsBars from 'allpages/promotionCenter/components/steps';
import comUtils from '@/assets/js/__utils__/common.js';

export default {
  components: {
    BasicInfo,
    InfoSet,
    GiftSet,
    stepsBars
  },
  data() {
    return {
      vmI18n: window.vmI18n,
      objid: '-1', // 新增-1 保存的正整数
      basic_info: {
        // 基础信息设置
        activity_name: '', // 活动名称【必填】
        stores: {
          itemdata: {
            col: 1,
            // colid: this.$store.state.forginkeys.columnIds.shop || '1700805184',
            colid: '1700805184',
            colname: 'CP_C_SHOP_ID', // 当前字段的名称
            datelimit: 'all',
            display: 'text', // 显示什么类型，例如xml表示弹窗多选加导入功能，mrp表示下拉多选
            fkdisplay: 'drp', // 外键关联类型
            fkdesc: '店铺',
            inputname: 'CP_C_SHOP:ENAME', // 这个是做中文类型的模糊查询字段，例如ENAME
            isfk: true, // 是否有fk键
            isnotnull: true, // 是否必填
            isuppercase: false, // 是否转大写
            length: 65535, // 最大长度是多少
            // name: "店铺名称", // input前面显示的lable值
            name: window.vmI18n.t('table_label.shopName'),
            readonly: false, // 是否可编辑，对应input   readonly属性
            reftable: 'CP_C_SHOP', // 对应的表
            // reftableid: 24475, //对应的表ID
            row: 1,
            statsize: -1,
            type: 'STRING', // 这个是后台用的
            isOneData: true,
            valuedata: '', // 这个是选择的值
            isObject: true
          }
        }, // 多选店仓信息
        order_type: [], // 订单类型,选项1，2，3
        platform_mark: [], // 平台标记
        time_type: '', // 时间类型【必填】
        time_limit: '', // 时间范围
        offline_time: '', // 下线时间
        activity_type: '', // 活动类型
        gradient_gift: '', // 梯度赠送,"1"是是 “0”是否
        order_notes_type: '', // 订单备注 1买家留言 2卖家留言
        order_note_content: '', // 备注内容
        except_provinces: {
          itemdata: {
            col: 1,
            // colid: this.$store.state.forginkeys.columnIds.province || '168686',
            colid: '168686',
            colname: 'CP_C_PROVINCE_IDS',
            datelimit: 'all',
            display: 'text',
            fkdesc: '排除省',
            fkdisplay: 'mrp',
            inputname: 'CP_C_PROVINCE_IDS:ENAME',
            isfk: true,
            isnotnull: false,
            isuppercase: false,
            length: 65535,
            // name: "排除省",
            name: window.vmI18n.t('common.exclude_province'),
            readonly: false,
            reftable: 'CP_C_PROVINCE',
            reftableid: 23862,
            row: 1,
            statsize: -1,
            type: 'STRING',
            valuedata: ''
          }
        }, // 排除省份
        buyer_limit_frequency: '', // 单个买家参与活动次数  0-不限制 1-限制
        buyer_max_frequency: '1', // 最大次数
        status: '1' // 促销状态
      },
      condition_info_setting: {
        // 条件信息设置
        products_join: '1', // 商品参与方式  1-非搭配 2-搭配
        products_origin: '1', // 商品来源  1-系统商品  2-平台商品
        includeorexclude: '1', // 选择商品方式    1-包含  2-排除
        productsArrs: [],
        productslist: [],
        rules: [
          {
            show: true, // 不显示
            check: false, // 选中  true、false
            name: 'QTTY', // 条件名称
            type: 'GE', // 条件类型：大于，等于
            value: '', // 条件值
            filterPdtWayShow: true, // 过滤商品方式是否展示
            amoutStyleShow: false, // 金额满足条件
            filterPdtWay: '2', // 增加过滤商品方式
            amount_style: '' // 金额来源方式
          },
          {
            show: true, // 不显示
            check: false, // 选中  true、false
            name: 'AMOUNT_LIST', // 条件名称
            type: 'GE', // 条件类型：大于，等于
            value: '', // 条件值
            filterPdtWayShow: false, // 过滤商品方式是否展示
            amoutStyleShow: true, // 金额来源满足条件
            amount_style: '1', // 金额来源方式
            filterPdtWay: '' // 增加过滤商品方式
          }
        ]
      },
      gift_info_setting: {
        // 赠品信息设置
        steps_type: 'QTTY', // 阶梯类型
        gift_doubles: '0', // 赠品翻倍 1--翻倍 0-不翻倍
        max_doubles_limits: '999', // 最大翻倍次数
        gift_methods: '1', // 赠送方式  1-全部送  2-顺序送  3-随机送
        give_num_share: '2', // 赠送总量 1-单行单梯度数量 2-多梯度统一总量
        gift_productslist: [],
        gift_productsArrs: [],
        gift_commoditylist: []
      },
      batch_infos_setting: {
        // 【批量】条件信息设置
        products_origin: '1', // 商品来源  1-系统商品  2-平台商品
        gift_doubles: '1', // 赠品翻倍 1--翻倍 0-不翻倍
        max_doubles_limits: '999', // 最大翻倍次数
        gift_methods: '1', // 赠送方式  1-全部送  2-顺序送  3-随机送
        list: [
          {
            gift_products: {},
            products: {} // 商品列表
          }
        ]
      },
      stepsBar: [
        {
          class: 'icon-jibenxinxi',
          // content: "基础信息",
          content: window.vmI18n.t('other.basic_info'),
          finish: false
        },
        {
          class: 'icon-liuchengtiaojian',
          // content: "条件信息",
          content: window.vmI18n.t('other.condition_info'),
          finish: false
        },
        {
          class: 'icon-zengpin',
          // content: "赠品信息",
          content: window.vmI18n.t('other.gift_info'),
          finish: false
        },
        {
          class: 'icon-huodong',
          // content: "活动概览",
          content: window.vmI18n.t('other.activity_overview'),
          finish: false
        }
      ],
      current: 0,
      loadDis: false, // 是否加载促销详情
      loading: false, // 是否需要展示加载中的样式
      isScorlling: false // 是否在滚动中
    };
  },
  computed: {
    showInfoDataContainer() {
      // 全场买赠不展示模块
      if (this.basic_info.activity_type === 'PA' && this.basic_info.gradient_gift === '1') return false;
      return true;
    },
    showSaveButton() {
      if (this.objid > 0 && (this.basic_info.status === '2' || this.basic_info.status === '3')) {
        return false;
      }
      return true;
    },
    showPublishButton() {
      if (this.objid < 0 || this.basic_info.status !== '1') {
        return false;
      }
      return true;
    }
  },
  watch: {
    current() {
      if (!this.isScorlling) {
        // 非手动滚动时候触发
        this.scorllArea();
      }
    },
    stepsBar: {
      handler(bars) {
        if (bars[0].finish === true && bars[1].finish === true && bars[2].finish === true) {
          bars[3].finish = true;
        } else {
          bars[3].finish = false;
        }
      },
      deep: true
    }
  },
  methods: {
    closeDialog() {
      this.dialog_visible = false;
    },
    confirm() {
      const tablename = '商品池';
      let rs = { code: 0, message: '校验完成' };
      rs = this.checkTable(this.gift_info_setting.gift_commoditylist);
      if (rs.code === -1) {
        rs.message = `${tablename},${rs.message}`;
        return this.$message({ type: 'error', message: rs.message });
      }
        rs.message = `${tablename},` + '保存成功';
        this.$message({ type: 'success', message: rs.message });
        this.closeDialog();
    },
    async setCommodity() {
      const modulesValid3 = this.validate3();
      if (modulesValid3.code === -1) {
        return this.$message({ type: 'error', message: modulesValid3.message });
      }
      const arr = [];
      this.gift_info_setting.gift_productsArrs.forEach((item) => {
        item.productslist.forEach((obj) => {
          arr.push(obj);
        });
      });
      console.log('this.gift_info_setting.gift_productsArrs', arr);
      this.gift_info_setting.gift_commoditylist = await this.unique(arr);
      this.loadDis = true;
      this.dialog_visible = true;
      this.$nextTick(() => {
        this.loadDis = false;
      });
    },
    unique(arr) {
      const res = new Map();
      const self = this;
      const copy = this.$route.query.copy;
      // let arrList = []
      const arrlist = JSON.parse(JSON.stringify(arr));
      for (let i = 0; i < arrlist.length; i++) {
        const temp = arrlist[i];
        if (self.gift_info_setting.gift_commoditylist.length > 0) {
          for (let j = 0; j < self.gift_info_setting.gift_commoditylist.length; j++) {
            const item = self.gift_info_setting.gift_commoditylist[j];
            if (item.ECODE === temp.ECODE) {
              temp.SUM = item.SUM || '';
              temp.SUM_QTY = item.SUM_QTY || 0;
            }
          }
        }
      }
      if (copy && copy > 1) {
        arrlist.forEach((item, index) => {
          item.SUM_QTY = item.SUM;
        });
      } else {
        arrlist.forEach((item, index) => {
          if (!(item.SUM || item.SUM_QTY)) {
            item.SUM_QTY = 0;
            item.SUM = '';
          }
        });
      }
      return arrlist.filter((arrlist) => !res.has(arrlist.ECODE) && res.set(arrlist.ECODE, 1));
    },
    /**
     * 查询促销的详情
     */
    async getData(_objid) {
      const self = this;
      const formData = new URLSearchParams();
      const obj = { objid: this.objid };
      if (_objid) obj.objid = _objid;
      formData.append('param', JSON.stringify(obj));
      try {
        const {
          data: { code, message, data }
        } = await this.service.promotionCenter.selectPm(formData);
        console.log(code, message, data);
        if (code === 0) {
          const rs = data || {};
          Object.assign(self.basic_info, rs.basic_info);
          if (rs.condition_info_setting) {
            const info = rs.condition_info_setting || {};
            for (const key in info) {
              if (key === 'rules') {
                // Object.assign(self.condition_info_setting.rules,info.rules);
                // add by wdq  由于后台不完整结构,
                self.condition_info_setting.rules.forEach(rule => {
                  const obj = info.rules.find(item => item.name === rule.name);
                  if (obj) {
                    for (const i in obj) {
                      rule[i] = obj[i];
                    }
                  }
                });
              } else self.condition_info_setting[key] = info[key];
            }
          }
          Object.assign(self.gift_info_setting, rs.gift_info_setting);
          this.loadDis = true;
          this.$nextTick(() => {
            this.loadDis = false;
            this.validateModule();
          });
        } else {
          self.$message({
            message,
            type: 'error'
          });
        }
      } catch (error) {
        // self.$message({ type: "error", message: "获取促销详情异常" });
        self.$message({ type: 'error', message: this.vmI18n.t('modalTips.r4') });
      }
    },
    /**
     * 保存草稿
     */
    async saveDraft() {
      console.log('保存草稿');
      const [modulesValid1, modulesValid2, modulesValid3] = this.validateModule();
      if (modulesValid1.code === -1) {
        this.$message({ type: 'error', message: modulesValid1.message });
        return;
      }
      if (modulesValid2.code === -1) {
        this.$message({ type: 'error', message: modulesValid2.message });
        return;
      }
      if (modulesValid3.code === -1) {
        this.$message({ type: 'error', message: modulesValid3.message });
        return;
      }
      const index = this.basic_info.activity_type + new Date().Format('yyyyMMddHHMMSS');
      const params = {
        objid: this.objid,
        basic_info: this.basic_info,
        condition_info_setting: this.condition_info_setting,
        gift_info_setting: this.gift_info_setting,
        index
      };
      // 请求保存接口
      this.loading = true;
      console.log('发布', params);
      const formData = new FormData();
      formData.append('param', JSON.stringify(params));
      try {
        const {
          data: { code, message, data }
        } = await this.service.promotionCenter.savePm(formData);
        if (code === 0) {
          this.$message({
            type: 'success',
            message: this.vmI18n.t('modalTips.z9') // 保存成功
          });
          let action = 'customize/switchActiveTab';
          if (this.objid == -1) {
            action = 'customize/TabClose';
          }
          this.objid = String(data.objid) || -1;
          this.$nextTick(() => {
            this.getData(data.objid);
            // this.$store.commit(action, {
            //   type: 'C', // 类型action
            //   customizedModuleId: this.objid, // id
            //   customizedModuleName: 'addOrEditActi', // 文件名
            //   // id: this.objid, // id
            //   // type: 'action', // 类型action
            //   // name: 'addOrEditActi', // 文件名
            //   label: this.vmI18n.t('panel_label.editPromotion'), // 编辑促销活动
            //   query: Object.assign({
            //     id: this.objid, // id
            //     // tabTitle: this.vmI18n.t('panel_label.editPromotion') // 编辑促销活动
            //   }) // 带的参数
            // });
          });
        } else {
          this.$message({
            type: 'error',
            message
          });
        }
        this.loading = false;
      } catch (error) {
        this.loading = false;
        this.$message({
          type: 'error',
          error
        });
      }
    },
    // 发布
    async publish() {
      console.log('1111');
      const [modulesValid1, modulesValid2, modulesValid3] = this.validateModule();
      if (modulesValid1.code === -1) {
        this.$message({ type: 'error', message: modulesValid1.message });
        return;
      }
      if (modulesValid2.code === -1) {
        this.$message({ type: 'error', message: modulesValid2.message });
        return;
      }
      if (modulesValid3.code === -1) {
        this.$message({ type: 'error', message: modulesValid3.message });
        return;
      }
      // const index = this.basic_info.activity_type + new Date().Format('yyyyMMddHHMMSS');
      const ids = [];
      ids[0] = this.basic_info.objid;
      const params = {
        objid: -1, // 默认参数 保持格式统一 传死-1
        isBatch: true, // 是否批量 传true
        fixcolumn: {
          ids,
          status: 2
        }
      };
      this.loading = true;
      // 发布
      const formData = new FormData();
      formData.append('param', JSON.stringify(params));
      try {
        const {
          data: { code, message }
        } = await this.service.promotionCenter.updatePmStatus(formData);
        if (code === 0) {
          this.$message({
            message,
            type: 'success'
          });
          let action = 'switchActiveTab';
          if (this.objid == -1) {
            action = 'TabClose';
          }
          this.$nextTick(() => {
            this.getData(this.objid);
          });
        } else {
          this.$message({
            type: 'error',
            message
          });
        }
        this.loading = false;
      } catch (error) {
        this.loading = false;
      }
    },
    /**
     * 取消(关闭) 返回列表界面
     */
    close() {
      comUtils.tabCloseAppoint(this);
      this.$store.commit('global/tabOpen', {
        type: 'C', // 类型action
        customizedModuleId: 2895, // id
        customizedModuleName: 'PROMACTIQUERYLIST', // 文件名
        label: this.vmI18n.t('panel_label.promotionList'), // 促销活动
        dynamicRoutingForCustomizePage: true,
      });
      // this.$destroy();
    },
    /**
     * 新增 初始化数据
     */
    initData() {
      try {
        const groups = this.$store.state.customize.forginkeys.groups;
        // 基础信息设置
        this.basic_info.order_type = groups.orderTypes.map(item => item.value);
        // this.basic_info.platform_mark = groups.platformTabs.map((item)=>{
        //   return item.value;
        // });
        this.basic_info.time_type = groups.timeTypes.find(item => item.title === '付款日期').value;
        this.basic_info.activity_type = groups.actiTypes.find(item => item.title === '指定买赠').value;
        this.basic_info.gradient_gift = groups.gradientGift.find(item => item.title === '否').value;
        this.basic_info.buyer_limit_frequency = groups.buyerLimitFrequency.find(item => item.title === '不限制').value;
        this.initDefaultTime();
        this.basic_info.order_notes_type = groups.orderRemarks.find(item => item.title === '买家留言').value;
        // 条件设置
        this.condition_info_setting.products_join = groups.productsJoin.find(item => item.title === '非搭配商品').value;
        this.condition_info_setting.products_origin = groups.productsOrigin.find(item => item.title === '系统商品SKU').value;
        this.condition_info_setting.includeorexclude = groups.includeOrExclude.find(item => item.title === '包含以下商品').value;
        // 赠品设置
        this.gift_info_setting.steps_type = groups.stepsType.find(item => item.title === '数量阶梯').value;
        this.gift_info_setting.gift_doubles = groups.giftDoubles.find(item => item.title === '不翻倍').value;
        this.gift_info_setting.gift_methods = groups.giftMethods.find(item => item.title === '全部送').value;
      } catch (e) {
        console.log(e.stack);
      }
    },
    /**
     * 初始化默认时间  时间范围好下线时间
     */
    initDefaultTime() { },
    /**
     * 滚动选中区域
     */
    scorllArea() {
      const area0 = this.$refs.area_0.$el.offsetHeight;
      const area1 = this.$refs.area_1.$el.offsetHeight;
      // const area2 = this.$refs.area_2.$el.offsetHeight;
      if (this.current === 0) this.$refs.basicSteps.scrollTop = 0;
      else if (this.current === 1) {
        this.$refs.basicSteps.scrollTop = area0;
      } else if (this.current === 2) {
        this.$refs.basicSteps.scrollTop = area0 + area1;
      }
      this.validateModule();
    },
    /**
     *
     */
    addListener() {
      this.$refs.basicSteps.addEventListener('scroll', this.handleScrollByUser);
    },
    /**
     * 用户手动滚动,监听页面滚动
     */
    handleScrollByUser() {
      this.isScorlling = true;
      const scroll = this.$refs.basicSteps.scrollTop;
      const area0 = this.$refs.area_0.$el.offsetHeight;
      let area1 = 0;
      try {
        area1 = this.$refs.area_1.$el.offsetHeight; // 第二个模块可能没有
      } catch (e) {
        console.log(e);
        // this.throw(e);
      }
      const area2 = this.$refs.area_2.$el.offsetHeight;
      if (scroll < area0) {
        this.current = 0;
      } else if (scroll < area0 + area1) {
        this.current = 1;
      } else if (scroll < area0 + area1 + area2) {
        this.current = 2;
      }
      this.validateModule();
      this.$nextTick(() => {
        this.isScorlling = false;
      });
    },
    /**
     * @needTip 是否需要提示出来，哪一项存在问题
     */
    validateModule() {
      const f1 = this.validate1();
      if (f1.code === 0) {
        this.stepsBar[0].finish = true;
      } else {
        this.stepsBar[0].finish = false;
      }
      const f2 = this.validate2();
      if (f2.code === 0) {
        this.stepsBar[1].finish = true;
      } else {
        this.stepsBar[1].finish = false;
      }
      const f3 = this.validate3();
      if (f3.code === 0) {
        this.stepsBar[2].finish = true;
      } else {
        this.stepsBar[2].finish = false;
      }
      return [f1, f2, f3];
    },
    validate1() {
      if (this.basic_info.activity_name === '') {
        return { code: -1, message: this.vmI18n.t('modalTips.s5') }; // 活动名称未填写！
      }
      if (this.basic_info.stores.itemdata.valuedata === '') {
        return { code: -1, message: this.vmI18n.t('modalTips.s6') }; // 店铺名称未填写！
      }
      if (this.basic_info.order_type.length === 0) {
        return { code: -1, message: this.vmI18n.t('modalTips.s7') }; // 订单类型必选！
      }
      // if(this.basic_info.platform_mark.length === 0){
      //    return {code:-1,message:'平台标记未填写！'};
      // }
      if (this.basic_info.time_limit === '' || this.basic_info.time_limit[0] === '' || this.basic_info.time_limit[1] === '') {
        return { code: -1, message: this.vmI18n.t('modalTips.t8') }; // 时间范围未填写！
      }
      if (this.basic_info.offline_time === '') {
        return { code: -1, message: this.vmI18n.t('modalTips.s8') }; // 下线时间未填写！
      }
      if (this.basic_info.buyer_limit_frequency === '1' && this.basic_info.buyer_max_frequency === '') {
        return { code: -1, message: this.vmI18n.t('modalTips.s9') }; // 最大限制次数未填写！
      }

      return { code: 0, message: this.vmI18n.t('modalTips.s4') }; // 校验完成
    },
    validate2() {
      // const tablename = "商品列表";
      const tablename = this.vmI18n.t('other.product_list');
      // 1.指定-非搭配   2.全场-不梯度, 规则至少需要选中一个
      // add  by wdq  1情况 不控制   (this.basic_info.activity_type === "GA" && this.condition_info_setting.products_join === "1")
      if ((this.basic_info.activity_type === 'PA' || (this.basic_info.activity_type === 'GA' && this.condition_info_setting.products_join === '1')) && this.basic_info.gradient_gift === '0') {
        const rules = this.condition_info_setting.rules || [];
        const o = rules.find(rule => rule.check && Number(rule.value) > 0);
        if (!o) {
          return {
            code: -1,
            message: this.vmI18n.t('modalTips.r5') // 【满足条件】至少要选中一项并且填写数量或金额条件
          };
        }
      }
      let rs = { code: 0, message: this.vmI18n.t('modalTips.s4') }; // 校验完成
      if (this.basic_info.activity_type === 'GA') {
        // 指定
        if (this.condition_info_setting.products_join === '1') {
          // 非搭配
          const arrs = this.condition_info_setting.productslist || [];
          if (arrs.length === 0) return { code: -1, message: tablename + this.vmI18n.t('modalTips.r6') }; // 无数据
          console.log('非搭配::', arrs);
          rs = this.checkTable(arrs);
        }
        if (this.condition_info_setting.products_join === '2') {
          // 搭配
          const arrs = this.condition_info_setting.productsArrs || [];
          if (arrs.length === 0) return { code: -1, message: tablename + this.vmI18n.t('modalTips.r6') }; // 无数据
          console.log('搭配::', arrs);
          rs = this.checkTableTab(arrs, 'info');
        }
      }
      if (rs.code === -1) {
        rs.message = `${tablename},${rs.message}`;
      }
      return rs;
    },
    validate3() {
      const tablename = this.vmI18n.t('other.gift_list');
      let rs = { code: 0, message: this.vmI18n.t('modalTips.s4') }; // 赠品列表
      if (this.basic_info.gradient_gift === '0') {
        // 不梯度
        const arrs = this.gift_info_setting.gift_productslist || [];
        if (arrs.length === 0) return { code: -1, message: tablename + this.vmI18n.t('modalTips.r6') };
        rs = this.checkTable(arrs);
      } else {
        const arrs = this.gift_info_setting.gift_productsArrs || [];
        if (arrs.length === 0) return { code: -1, message: tablename + this.vmI18n.t('modalTips.r6') };
        console.log('梯度::', arrs);
        rs = this.checkTableTab(arrs, 'gift');
      }
      if (rs.code === -1) {
        rs.message = `${tablename}${rs.message}`;
      }
      return rs;
    },
    checkTableTab(tabs, type) {
      for (const tab of tabs) {
        let rows = [];
        if (type === 'info') {
          const rules = tab.rules;
          for (const rule of rules) {
            if (rule.value === '') {
              return {
                code: -1,
                message: `表格【${tab.group}】,数量规则未填写`
              };
            }
          }
          rows = tab.productslist || [];
          if (rows.length === 0) return { code: -1, message: `表格【${tab.group}】,无数据` };
        } else {
          // WARNING:这块赠品信息提示有问题 提到下面的if(type === 'gift')逻辑中
          rows = tab.productslist || [];
          if (rows.length === 0) return { code: -1, message: '无数据' };
        }
        const res = this.checkTable(rows);
        if (res.code === -1) {
          res.message = `表格【${tab.group}】,${res.message}`;
          return res;
        }
      }
      /* 
      if (type === 'gift') {
        const giftRows = tabs || [];
        if (giftRows.length === 0) return { code: -1, message: '无数据' };
        giftRows = rows;
      }
      */
      return { code: 0, message: this.vmI18n.t('modalTips.s4') };
    },
    checkTable(rows) {
      for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        for (const j in row) {
          const notnull = ['ECODE', 'NUM', 'SUM', 'ORDER'];
          if (notnull.includes(j) && row[j] === '') {
            return { code: -1, message: `第${i + 1}行数据未填写完毕` };
          }
        }
      }
      return { code: 0, message: this.vmI18n.t('modalTips.s4') };
    }
  },
  mounted() {
    // 新增
    // 修改草稿
    this.addListener();
    this.$nextTick(() => {
      this.handleScrollByUser();
    });
  },
  beforeDestroy() {
    this.$refs.basicSteps.removeEventListener('scroll', this.handleScrollByUser, false);
  },
  created() {
    if (this.$route.query.id > 0) {
      this.objid = this.$route.query.id;
      this.getData();
    } else {
      this.objid = '-1';
      this.initData();
      const copy = this.$route.query.copy;
      if (copy && copy > 1) this.getData(copy);
    }
  }
};

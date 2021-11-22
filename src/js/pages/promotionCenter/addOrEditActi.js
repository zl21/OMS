import BasicInfo from 'allpages/promotionCenter/details/basicInfo.vue';
import InfoSet from 'allpages/promotionCenter/details/infoSet.vue';
import GiftSet from 'allpages/promotionCenter/details/giftSet.vue';
import promotionMixin from './promotion.mixin';

export default {
  components: {
    BasicInfo,
    InfoSet,
    GiftSet,
  },
  mixins: [promotionMixin()],
  data() {
    return {
      freshKey: 0,
      vueMark: 'addOrEditActi',
      btnConfig: {
        btnsite: 'right',
        typeAll: 'default',
        buttons: [
          {
            text: $i18n.t('btn.back'), // 返回
            btnclick: () => {
              this.close();
            }
          },
          {
            text: $i18n.t('btn.saveDraft'), // 保存草稿
            btnclick: () => {
              this.saveDraft();
            }
          },
          {
            text: $i18n.t('btn.publish'), // 发布
            btnclick: () => {
              this.publish();
            }
          },
        ]
      },
      dialogVisible: false,
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
      loadDis: false, // 是否加载促销详情
    };
  },
  computed: {
    showInfoDataContainer() {
      // 全场买赠不展示模块
      if (this.basic_info.activity_type === 'PA' && this.basic_info.gradient_gift === '1') return false;
      return true;
    },
  },
  watch: {
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
    basicDataHandel(data) {
      // this.basic_info.stores = data.stores || {};
      // this.basic_info.except_provinces = data.except_provinces || {};
    },
    closeDialog() {
      this.dialogVisible = false;
    },
    confirm() {
      const tablename = '商品池';
      let rs = {
        code: 0,
        message: '校验完成'
      };
      rs = this.checkTable(this.gift_info_setting.gift_commoditylist);
      if (rs.code === -1) {
        rs.message = `${tablename},${rs.message}`;
        // return this.$Message.error(rs.message);
      }
      rs.message = `${tablename},保存成功`;
      this.$Message.success(rs.message);
      this.closeDialog();
    },
    async setCommodity() {
      const modulesValid3 = this.validate3();
      if (modulesValid3.code === -1) {
        return this.$Message.error(modulesValid3.message);
      }
      const arr = [];
      this.gift_info_setting.gift_productsArrs.forEach(item => {
        item.productslist.forEach(obj => {
          arr.push(obj);
        });
      });
      console.log('this.gift_info_setting.gift_productsArrs', arr);
      this.gift_info_setting.gift_commoditylist = await this.unique(arr);
      this.loadDis = true;
      this.dialogVisible = true;
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
        // arrlist.forEach((item, index) => {
        arrlist.forEach(item => {
          item.SUM_QTY = item.SUM;
        });
      } else {
        // arrlist.forEach((item, index) => {
        arrlist.forEach(item => {
          if (!(item.SUM || item.SUM_QTY)) {
            item.SUM_QTY = 0;
            item.SUM = '';
          }
        });
      }
      return arrlist.filter(arrlist => !res.has(arrlist.ECODE) && res.set(arrlist.ECODE, 1));
    },
    /**
     * 查询促销的详情
     */
    async getData(_objid) {
      const self = this;
      const formData = new URLSearchParams();
      const obj = {
        objid: this.objid
      };
      if (_objid) obj.objid = _objid;
      formData.append('param', JSON.stringify(obj));
      self.loading = true;
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
        }
        self.initBtn();
        self.loading = false;
      } catch (error) {
        // self.$message({ type: "error", message: "获取促销详情异常" });
        self.loading = false;
        // self.$Message.error($i18n.t('modalTips.r4'));
      }
    },
    /**
     * 保存草稿
     */
    async saveDraft() {
      const validateRes = this.validateModule();
      for (const it of validateRes) {
        if (it.code === -1) return this.$Message.error(it.message);
      }
      const index = this.basic_info.activity_type + $utils.Format(new Date(), 'yyyy-MM-dd 23:59:59')
      const params = {
        objid: this.objid,
        basic_info: this.basic_info,
        condition_info_setting: this.condition_info_setting,
        gift_info_setting: this.gift_info_setting,
        index
      };
      // 请求保存接口
      this.loading = true;
      // console.log('发布', params);
      const formData = new FormData();
      formData.append('param', JSON.stringify(params));
      try {
        const {
          data: { code, data, message }
        } = await this.service.promotionCenter.savePm(formData);
        if (code === 0) {
          // this.$Message.message($i18n.t('modalTips.z9'));
          $utils.msgTips(this, 'success', message, 0);
          /* this.$message({
            type: 'success',
            message: $i18n.t('modalTips.z9') // 保存成功
          }); */
          // action never used
          // let action = 'customize/switchActiveTab';
          // if (this.objid == -1) {
          //   action = 'customize/TabClose';
          // }
          this.objid = String(data.objid) || -1;
          this.$nextTick(() => {
            // this.getData(data.objid);
            $omsUtils.tabJump(0, data.objid, 1, 'PM_C_PROM_ACTI', { i8n: 1, tip: 'panel_label.editPromotion' }, {}, 0)
            // $store.commit(action, {
            //   type: 'C', // 类型action
            //   customizedModuleId: this.objid, // id
            //   customizedModuleName: 'addOrEditActi', // 文件名
            //   // id: this.objid, // id
            //   // type: 'action', // 类型action
            //   // name: 'addOrEditActi', // 文件名
            //   label: $i18n.t('panel_label.editPromotion'), // 编辑促销活动
            //   query: Object.assign({
            //     id: this.objid, // id
            //     // tabTitle: $i18n.t('panel_label.editPromotion') // 编辑促销活动
            //   }) // 带的参数
            // });
          });
        }
        this.loading = false;
      } catch (error) {
        this.loading = false;
      }
    },
    /**
     * 新增 初始化数据
     */
    initData() {
      try {
        const groups = $store.state.customize.forginkeys.groups;
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
      this.area_0 = this.$refs.area_0.$el.offsetHeight;
      this.area_1 = this.$refs.area_1.$el.offsetHeight;
      if (this.current === 0) this.$refs.basicSteps.scrollTop = 0;
      else if (this.current === 1) {
        this.$refs.basicSteps.scrollTop = this.area_0;
      } else if (this.current === 2) {
        this.$refs.basicSteps.scrollTop = this.area_0 + this.area_1;
      }
      this.validateModule();
    },
    /**
     * 用户手动滚动,监听页面滚动
     */
    handleScrollByUser() {
      this.isScorlling = true;
      const scroll = this.$refs.basicSteps.scrollTop;
      this.area_0 = this.$refs.area_0.$el.offsetHeight;
      this.area_1 = 0;
      try {
        this.area_1 = this.$refs.area_1.$el.offsetHeight; // 第二个模块可能没有
      } catch (e) {
        console.log(e);
        // this.throw(e);
      }
      this.area_2 = this.$refs.area_2.$el.offsetHeight;
      if (scroll < this.area_0) {
        this.current = 0;
      } else if (scroll < this.area_0 + this.area_1) {
        this.current = 1;
      } else if (scroll < this.area_0 + this.area_1 + this.area_2) {
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
      this.stepsBar[0].finish = [0].includes(f1.code);
      const f2 = this.validate2();
      this.stepsBar[1].finish = [0].includes(f2.code);
      const f3 = this.validate3();
      this.stepsBar[2].finish = [0].includes(f3.code);
      return [f1, f2, f3];
    },
    validate2() {
      // const tablename = "商品列表";
      const tablename = $i18n.t('other.product_list');
      // 1.指定-非搭配   2.全场-不梯度, 规则至少需要选中一个
      // add  by wdq  1情况 不控制   (this.basic_info.activity_type === "GA" && this.condition_info_setting.products_join === "1")
      if ((this.basic_info.activity_type === 'PA' || (this.basic_info.activity_type === 'GA' && this.condition_info_setting.products_join === '1')) && this.basic_info.gradient_gift === '0') {
        const rules = this.condition_info_setting.rules || [];
        const o = rules.find(rule => rule.check && Number(rule.value) > 0);
        if (!o) {
          return {
            code: -1,
            message: $i18n.t('modalTips.r5') // 【满足条件】至少要选中一项并且填写数量或金额条件
          };
        }
      }
      let rs = {
        code: 0,
        message: $i18n.t('modalTips.s4')
      }; // 校验完成
      if (this.basic_info.activity_type === 'GA') {
        // 指定
        if (this.condition_info_setting.products_join === '1') {
          // 非搭配
          const arrs = this.condition_info_setting.productslist || [];
          if (arrs.length === 0) {
            return {
              code: -1,
              message: tablename + $i18n.t('modalTips.r6')
            };
          } // 无数据
          rs = this.checkTable(arrs);
        }
        if (this.condition_info_setting.products_join === '2') {
          // 搭配
          const arrs = this.condition_info_setting.productsArrs || [];
          if (arrs.length === 0) {
            return {
              code: -1,
              message: tablename + $i18n.t('modalTips.r6')
            };
          } // 无数据
          rs = this.checkTableTab(arrs, 'info');
        }
      }
      if (rs.code === -1) {
        rs.message = `${tablename},${rs.message}`;
      }
      return rs;
    },
    validate3() {
      const tablename = $i18n.t('other.gift_list');
      let rs = {
        code: 0,
        message: $i18n.t('modalTips.s4')
      }; // 赠品列表
      if (this.basic_info.gradient_gift === '0') {
        // 不梯度
        const arrs = this.gift_info_setting.gift_productslist || [];
        if (arrs.length === 0) {
          return {
            code: -1,
            message: tablename + $i18n.t('modalTips.r6')
          };
        }
        rs = this.checkTable(arrs);
      } else {
        const arrs = this.gift_info_setting.gift_productsArrs;
        let flag = false;
        if (arrs.length === 0) {
          return {
            code: -1,
            message: tablename + $i18n.t('modalTips.r6')
          };
        };
        for (const iterator of arrs) {
          if (iterator.productslist.some(item => item.ECODE == '')) {
            flag = true;
            break;
          }
        };
        if (flag) {
          return {
            code: -1,
            message: tablename + $i18n.t('modalTips.r6')
          };
        }
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
          if (rows.length === 0) {
            return {
              code: -1,
              message: `表格【${tab.group}】,无数据`
            };
          }
        } else {
          // WARNING:这块赠品信息提示有问题 提到下面的if(type === 'gift')逻辑中
          // rows = tab.productslist || [];
          // if (rows.length === 0) return { code: -1, message: '无数据' };
        }
        const res = this.checkTable(rows);
        if (res.code === -1) {
          res.message = `表格【${tab.group}】,${res.message}`;
          return res;
        }
      }
      if (type === 'gift') {
        const giftRows = tabs || [];
        if (giftRows.length === 0) {
          return {
            code: -1,
            message: '无数据'
          };
        }
      }
      return {
        code: 0,
        message: $i18n.t('modalTips.s4')
      };
    },
    checkTable(rows) {
      for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        for (const j in row) {
          const notnull = ['ECODE', 'NUM', 'SUM', 'ORDER'];
          if (notnull.includes(j) && row[j] === '') {
            return {
              code: -1,
              message: `第${i + 1}行数据未填写完毕`
            };
          }
        }
      }
      return {
        code: 0,
        message: $i18n.t('modalTips.s4')
      };
    },
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
  async created() { }
};

<!-- 批量新增、编辑、复制促销活动-->
<template>
  <div
    v-loading="loading"
    class="batchActivity"
  >
    <div class="steps_content">
      <div
        ref="basicSteps"
        class="basicSteps"
      >
        <BasicInfo
          ref="area_0"
          :basic-data="basic_info"
        />
        <BatchInfoSet
          ref="area_1"
          :objid="objid"
          :basic-data="basic_info"
          :info-data="batch_infos_setting"
        />
      </div>
      <div class="footer">
        <button @click="close">
          取消
        </button>
        <button
          v-if="showSaveButton"
          @click="saveDraft"
        >
          保存草稿
        </button>
        <button
          v-if="showPublishButton"
          @click="publish"
        >
          发布
        </button>
      </div>
    </div>
    <div class="steps_bar">
      <stepsBars
        :current.sync="current"
        :steps="stepsBar"
      />
      <!-- <Steps :current="0" direction="vertical">
        <Step content="基础信息" icon="test iconfont burgeon-iconjibenxinxi"></Step>
        <Step content="条件信息" icon="test iconfont burgeon-iconliuchengtiaojian"></Step>
        <Step content="活动概览" icon="test iconfont burgeon-iconhuodong"></Step>
      </Steps> -->
    </div>
  </div>
</template>
<script>
  import axios from 'axios';
  import BasicInfo from './details/basic_info';
  import BatchInfoSet from './details/batch_info_set';
  import stepsBars from './components/steps';

  export default {
    components: {
      BasicInfo,
      BatchInfoSet,
      stepsBars,
    },
    data() {
      return {
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
              name: '店铺名称', // input前面显示的lable值
              readonly: false, // 是否可编辑，对应input   readonly属性
              reftable: 'CP_C_SHOP', // 对应的表
              // reftableid: 24475, //对应的表ID
              row: 1,
              statsize: -1,
              type: 'STRING', // 这个是后台用的
              valuedata: '' // 这个是选择的值
            }
          }, // 多选店仓信息
          order_type: [], // 订单类型,选项1，2，3
          platform_mark: [], // 平台标记
          time_type: '', // 时间类型【必填】
          time_limit: '', // 时间范围
          offline_time: '', // 下线时间
          activity_type: 'GA', // 活动类型
          order_notes_type: '1', // 订单备注 1买家留言 2卖家留言
          order_note_content: '', // 备注内容
          except_provinces: {
            itemdata: {
              col: 1,
              // colid: this.$store.state.forginkeys.columnIds.shop || '1700805184',
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
              name: '排除省',
              readonly: false,
              reftable: 'CP_C_PROVINCE',
              reftableid: 23862,
              row: 1,
              statsize: -1,
              type: 'STRING',
              valuedata: ''
            }
          }, // 排除省份
          buyer_limit_frequency: '0', // 单个买家参与活动次数  0-不限制 1-限制
          buyer_max_frequency: '1', // 最大次数
          status: '1', // 促销状态
        },
        batch_infos_setting: {
          // 【批量】条件信息设置
          products_origin: '1', // 商品来源  1-系统商品  2-平台商品
          gift_doubles: '0', // 赠品翻倍 1--翻倍 0-不翻倍
          max_doubles_limits: '1', // 最大翻倍次数
          gift_methods: '1', // 赠送方式  1-全部送  2-顺序送  3-随机送
          list: [
            {
              gift_products: [],
              products: [] // 商品列表
            }
          ]
        },
        stepsBar: [
          {
            class: 'iconjibenxinxi',
            content: '基础信息',
            finish: false
          },
          {
            class: 'iconliuchengtiaojian',
            content: '条件信息',
            finish: false
          },
          {
            class: 'iconhuodong',
            content: '活动概览',
            finish: false
          }
        ],
        current: 0,
        loading: false, // 是否需要展示加载中的样式
        isScorlling: false, // 是否在滚动中
      };
    },
    computed: {
      groups() {
        return this.$store.state.customize.forginkeys.groups;
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
      current(val) {
        if (!this.isScorlling) // 非手动滚动时候触发
        { this.scorllArea(); }
      },
    },
    methods: {
      /**
       * 查询促销的详情
       */
      getInitData(_objid) {
        const self = this;
        const searchParam = new URLSearchParams();
        const obj = { objid: this.objid };
        if (_objid) obj.objid = _objid;
        searchParam.append('param', JSON.stringify(obj));
        axios({
          method: 'post',
          url: '/p/cs/pm/v1/selectPm',
          data: searchParam
        }).then((res) => {
          if (res.data.code === 0) {
            const rs = res.data.data;
            this.basic_info = rs.basic_info || {};
            this.batch_infos_setting = rs.batch_infos_setting || {};
          } else {
            this.$message('error', res.data.message);
          }
        });
      // .catch((res)=>{
      //     self.$message({type:'error',message:'获取促销详情异常'});
      // });
      },
      /**
       * 新增 初始化数据
       */
      initData() {
        try {
          const groups = this.groups;
          // 基础信息设置
          this.basic_info.order_type = groups.orderTypes.map(item => // 订单类型
            item.value);
          // this.basic_info.platform_mark = groups.platformTabs.map((item)=>{//平台标记
          //   return item.value;
          // });
          this.basic_info.time_type = groups.timeTypes.find(item => // 时间类型
            item.title === '付款日期').value;
          this.basic_info.activity_type = groups.actiTypes.find(item => // 活动类型
            item.title === '指定买赠').value;
          this.basic_info.buyer_limit_frequency = groups.buyerLimitFrequency.find(item => // 单个买家参与活动次数
            item.title === '不限制').value;
          this.basic_info.order_notes_type = groups.orderRemarks.find(item => // 订单备注
            item.title === '买家留言').value;
          // 条件设置
          this.batch_infos_setting.products_origin = groups.productsOrigin.find(item => item.title === '系统商品SKU').value;
          this.batch_infos_setting.gift_doubles = groups.giftDoubles.find(item => item.title === '不翻倍').value;
          this.batch_infos_setting.gift_methods = groups.batchGiftMethods.find(item => item.title === '全部送').value;
          this.basic_info.activity_name = '';
          this.basic_info.stores.itemdata.valuedata = '';
          this.basic_info.stores.itemdata.pid = '';
          this.basic_info.except_provinces.itemdata.valuedata = '';
          this.basic_info.except_provinces.itemdata.pid = '';
          this.basic_info.time_limit = ''; // 时间范围
          this.basic_info.offline_time = ''; // 下线时间
          this.basic_info.order_note_content = '';// 备注内容
          this.basic_info.buyer_max_frequency = '1';// 基础活动最大次数
          this.batch_infos_setting.max_doubles_limits = '1';// 条件信息最大次数
          this.batch_infos_setting.list = [{ gift_products: [], products: [] }];// 条件信息最大次数
        } catch (e) {
          console.log(e.stack);
        }
      },
      /**
       * @needTip 是否需要提示出来，哪一项存在问题
       */
      validateModule(needTip) {
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
        if (this.stepsBar[0].finish && this.stepsBar[1].finish) {
          this.stepsBar[2].finish = true;
        } else {
          this.stepsBar[2].finish = false;
        }
        return [f1, f2];
      },
      validate1() {
        if (this.basic_info.activity_name === '') {
          return { code: -1, message: '活动名称未填写！' };
        }
        if (this.basic_info.stores.itemdata.valuedata === '') {
          return { code: -1, message: '店铺名称未填写！' };
        }
        if (this.basic_info.order_type.length === 0) {
          return { code: -1, message: '订单类型必选！' };
        }
        // if(this.basic_info.platform_mark.length === 0){
        //    return {code:-1,message:'平台标记未填写！'};
        // }
        if (this.basic_info.time_limit === '' || this.basic_info.time_limit[0] === '' || this.basic_info.time_limit[1] === '') {
          return { code: -1, message: '时间范围未填写！' };
        }
        if (this.basic_info.offline_time === '') {
          return { code: -1, message: '下线时间未填写！' };
        }
        if (this.basic_info.buyer_limit_frequency === '1' && this.basic_info.buyer_max_frequency === '') {
          return { code: -1, message: '最大限制次数未填写！' };
        }

        return { code: 0, message: '校验完成' };
      },
      validate2() {
        let rs = { code: 0, message: '校验完成' };
        if (this.batch_infos_setting.gift_doubles === '1' && this.batch_infos_setting.max_doubles_limits === '') {
          return { code: -1, message: '最大翻倍数未填写！' };
        }
        if (this.batch_infos_setting.list.length === 0) {
          return { code: -1, message: '请先添加商品和赠品！' };
        }
        for (let i = 0; i < this.batch_infos_setting.list.length; i++) {
          const product_arr = this.batch_infos_setting.list[i].products;
          const gift_arr = this.batch_infos_setting.list[i].gift_products;
          if (product_arr.length === 0) {
            return { code: -1, message: '商品列表无数据' };
          }
          rs = this.checkTableProducts(product_arr, i);
          if (rs.code == -1) {
            return rs;
          }

          if (gift_arr.length === 0) {
            return { code: -1, message: '赠品列表无数据' };
          }
          rs = this.checkTableGift(gift_arr, i);
          if (rs.code == -1) {
            return rs;
          }
        }
        return rs;
      },
      checkTableProducts(arr, index) {
        for (let i = 0; i < arr.length; i++) {
          const row = arr[i];
          for (const j in row) {
            const notnull = ['ECODE', 'ENAME', 'NUM'];
            if (notnull.includes(j) && row[j] === '') {
              return { code: -1, message: `商品列表第${index + 1}组` + `第${i + 1}行数据未填写完毕` };
            }
          }
        }
        return { code: 0, message: '校验完成' };
      },
      checkTableGift(arr, index) {
        for (let i = 0; i < arr.length; i++) {
          const row = arr[i];
          for (const j in row) {
            const notnull = ['ECODE', 'GIFTNUM', 'TOTALNUM'];
            if (notnull.includes(j) && row[j] === '') {
              return { code: -1, message: `赠品列表第${index + 1}组` + `第${i + 1}行数据未填写完毕` };
            }
          }
        }
        return { code: 0, message: '校验完成' };
      },
      /**
       * 初始化默认时间  时间范围好下线时间
       */
      initDefaultTime() {

      },
      /**
       * 保存草稿
       */
      saveDraft() {
        console.log(this.basic_info);
        const [modulesValid1, modulesValid2] = this.validateModule();
        if (modulesValid1.code === -1) {
          return this.$message({ type: 'error', message: modulesValid1.message });
        }
        if (modulesValid2.code === -1) {
          return this.$message({ type: 'error', message: modulesValid2.message });
        }
        const index = this.basic_info.activity_type + (new Date()).Format('yyyyMMddHHMMSS');
        const params = {
          objid: this.objid,
          basic_info: this.basic_info,
          batch_infos_setting: this.batch_infos_setting,
          index
        };
        this.loading = true;
        const searchParam = new URLSearchParams();
        searchParam.append('param', JSON.stringify(params));
        axios({
          method: 'post',
          url: '/p/cs/pm/v1/saveBatchPm',
          data: searchParam
        }).then((res) => {
          if (res.data.code === 0) {
            this.$message({
              type: 'success',
              message: '保存成功'
            });
            let action = 'customize/switchActiveTab';
            if (this.objid == -1) {
              action = 'customize/TabClose';
            }
            this.objid = String(res.data.data.objid) || '-1';
            this.$nextTick(() => {
              this.$store.commit(action, {
                id: this.objid, // id
                type: 'action', // 类型action
                name: 'batchActivity', // 文件名
                label: '批量新增促销活动', // tab中文名
                query: Object.assign({
                  id: this.objid, // id
                  tabTitle: '批量新增促销活动' // tab中文名
                }) // 带的参数
              });
            });
          } else {
            this.$message({
              type: 'error',
              message: res.data.message
            });
          }
          this.loading = false;
        }).catch(() => {
          this.loading = false;
        });
      },
      publish() {
        console.log(this.basic_info);
        const [modulesValid1, modulesValid2] = this.validateModule();
        if (modulesValid1.code === -1) {
          return this.$message({ type: 'error', message: modulesValid1.message });
        }
        if (modulesValid2.code === -1) {
          return this.$message({ type: 'error', message: modulesValid2.message });
        }
        const index = this.basic_info.activity_type + (new Date()).Format('yyyyMMddHHMMSS');
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
        const searchParam = new URLSearchParams();
        searchParam.append('param', JSON.stringify(params));
        axios({
          method: 'post',
          url: '/p/cs/pm/v1/updatePmStatus',
          data: searchParam
        }).then((res) => {
          if (res.data.code === 0) {
            this.$message({
              message: res.data.message,
              type: 'success'
            });
            let action = 'switchActiveTab';
            if (this.objid == -1) {
              action = 'TabClose';
            }
            this.$nextTick(() => {
              this.getInitData(this.objid);
            });
          } else {
            this.$message({
              type: 'error',
              message: res.data.message
            });
          }
          this.loading = false;
        }).catch(() => {
          this.loading = false;
        });
      },
      /**
       * 取消(关闭)
       */
      close() {
        const _self = this;
        this.$destroy(true);
        // 返回列表的
        const params = {
          id: 31460113, // id
          type: 'CUSTOMIZED',
          name: 'PROMACTIQUERYLIST',
          label: '促销活动',
          query: Object.assign({
            id: 31460113
          }) // 带的参数
        };
        _self.$store.commit('customize/TabClose', params);
      },
      /**
       * 滚动选中区域
       */
      scorllArea() {
        const area_0 = this.$refs.area_0.$el.offsetHeight;
        const area_1 = this.$refs.area_1.$el.offsetHeight;
        //   let area_2 = this.$refs.area_2.$el.offsetHeight;
        if (this.current === 0) this.$refs.basicSteps.scrollTop = 0;
        else if (this.current === 1) {
          this.$refs.basicSteps.scrollTop = area_0;
        } else if (this.current === 2) {
          this.$refs.basicSteps.scrollTop = area_0 + area_1;
        }
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
        const scroll = this.$refs.basicSteps.scrollTop;
        const area_0 = this.$refs.area_0.$el.offsetHeight;
        const area_1 = this.$refs.area_1.$el.offsetHeight;
        // console.log("scroll-----",scroll)
        // console.log("area_0-----",area_0)
        // console.log("area_1-----",area_1)
        if (scroll < area_0) {
          this.current = 0;
        } else if (scroll < (area_0 + area_1)) {
          this.current = 1;
        } else if (scroll < (area_0 + area_1 + area_2)) {
          this.current = 3;
        }
        this.validateModule();
        this.$nextTick(() => {
          this.isScorlling = false;
        });
      }
    },
    beforeDestroy() {
      this.$refs.basicSteps.removeEventListener('scroll', this.handleScrollByUser, false);
    },
    mounted() {
      // 新增
      // 修改草稿
      this.addListener();
    },
    created() {
      const routeId = this.$route.query.id;
      if (routeId > 0) {
        this.objid = String(routeId);
        this.getInitData();
      } else {
        this.objid = '-1';
        // this.initData();
        const copy = this.$route.query.copy;
        if (copy && copy > 1) this.getInitData(copy);
      }
    }
  };
</script>
<style lang="less" scoped>
@import "./less/common.less";
@borderColor: #bfcbd9;
@bgColor:#fff;
.batchActivity {
  display: flex;
  height: 100%;
  //height: calc(100% - 30px);
  border: 1px  solid @borderColor !important;
  .row{
    .form_content{
      width:100%;
      display:flex;
    }
    .item-input .input-wrap .input-inner p.mop{
      right:16px;
    }
  }
  .steps_content {
    position: relative;
    height: 100%;
    width: 92%;
    display: flex;
    flex-direction: column;
    .basicSteps{
       overflow: scroll;
    }
    .footer {
      height: 50px;
      line-height: 50px;
      background: rgb(253, 245, 244);
      width: 100%;
      text-align: right;
      > button {
        height: 24px;
        line-height: 24px;
        padding: 0 8px;
        border: 1px solid #fd6442;
        font-size: 12px;
        color: #fd6442;
        border-radius: 2px;
        margin-right: 10px;
        background:transparent;
      }
    }
  }
  .steps_bar {
  padding: 20px;
  //height: 100%;
  width: 8%;
  border-left: 1px solid #d8d8d8;
  .burgeon-steps-vertical .burgeon-steps-item {
    height: 140px;
    display: flex !important;
    flex-direction: column;
    text-align: center;
  }
  .burgeon-steps .burgeon-steps-head-inner > .burgeon-steps-icon.burgeon-icon {
    font-size: 50px;
  }
  .burgeon-steps-item.burgeon-steps-custom
    .burgeon-steps-head-inner
    > .burgeon-steps-icon {
    width: 50px;
    height: 50px;
  }
  .burgeon-steps-vertical .burgeon-steps-tail {
    height: calc(100% - 80px);
    //top: 50%;
    left: 50%;
    //transform: translate(-50%, -50%);
    padding: 80px 0 4px 0;
  }
  .burgeon-steps .burgeon-steps-tail > i {
    background: rgb(255, 255, 255);
    border-left: 2px dashed #cccc;
  }
  .burgeon-steps-item.burgeon-steps-status-process .burgeon-steps-tail > i {
    background: rgb(255, 255, 255);
    border-left: 2px dashed #cccc;
  }

  .burgeon-steps-item.burgeon-steps-status-finish
    .burgeon-steps-tail
    > i:after {
    background: rgb(255, 255, 255);
  }
}
}
</style>

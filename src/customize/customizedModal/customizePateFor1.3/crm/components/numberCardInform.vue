<!--会员卡信息页面-->
<template>
  <div class="ff-number-card-inform">
    <div class="ff-card-binding-channels">
      <h4 class="ff-number-card--title">
        全渠道会员卡
      </h4>
      <ul class="ff-number-card-binding-ul">
        <li
          v-for="(list, index) in channels"
          class="ff-number-card-binding--box"
        >
          <span
            class="ff-number-card-binding-icon"
            :style="{'background-color': list.active? list.bc : '#BEBEBE'}"
          >
            <i
              class="iconfont"
              :class="[list.type]"
            />
          </span>
          <span class="ff-number-card-binding-label">{{ list.label }}</span>
        </li>
      </ul>
    </div>
    <div class="ff-number-card--detail">
      <h4 class="ff-number-card--title">
        会员卡信息
      </h4>
      <ul class="ff-number-card--detail-ul">
        <li
          v-for="(list, index) in details"
          v-if="list.name !== 'limit' || flag"
          class="ff-number-card--detail-box"
        >
          <label class="ff-number-card--detail-label">{{ list.label }}∶</label>
          <span :class="{'ff-number-card--detail-val': list.name === 'limit'}">{{ informs[list.name] }}</span>
        </li>
      </ul>
      <div
        v-for="(list, index) in channelInformsData"
        class="ff-number-card--channels-box"
      >
        <h4 class="ff-number-card--channels-title">
          <i
            class="iconfont"
            :style="{'color': list.color}"
            :class="list.class"
          />
          <span>{{ list.label }}</span>
        </h4>
        <ul class="ff-number-card--channels--ul">
          <li
            v-for="(data, sub) in channelInformsLabel"
            v-if="data.name !== 'ID' || list.data[data.name]"
            class="ff-number-card--channels--li"
          >
            <label
              class="ff-number-card--channels-label"
              v-html="data.label"
            />
            <span class="ff-number-card--channels--data">{{ list.data[data.name] }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped type="text/less">
  .ff-number-card-inform {
    .ff-number-card--title {
      font-size: 14px;
      color: #575757;
      line-height: 40px;
    }
    .ff-card-binding-channels {
      .ff-number-card-binding-ul {
        padding: 10px 15px;
        display: flex;
      }
      .ff-number-card-binding--box {
        flex: 1;
        display: flex;
        align-items: center;
        padding: 11px 0 11px 20px;
        border: 1px solid #DCDCDC;
        border-radius: 4px;
        margin-right: 10px;
        .ff-number-card-binding-icon {
          margin-right: 16px;
          border-radius: 50%;
          text-align: center;
          line-height: 34px;
          display: inline-block;
          width: 34px;
          height: 34px;
          color: #fff;
          .iconfont {
            font-size: 18px;
            color: #fff;
          }
        }
        .ff-number-card-binding-label {
          font-weight: bold;
          color: #575757;
        }
      }
    }
    .ff-number-card--detail {
      .ff-number-card--detail-ul {
        max-width: 900px;
        padding: 10px 0 10px 25px;
        overflow: hidden;
        .ff-number-card--detail-box {
          display: flex;
          align-items: center;
          float: left;
          width: 50%;
          line-height: 28px;
          color: #666;
          font-size: 14px;
          align-items: center;
          .ff-number-card--detail-label {
            display: inline-block;
            width: 70px;
          }
          .ff-number-card--detail-val {
            color: #F86241;
          }
        }
      }
      .ff-number-card--channels-title {
        display: flex;
        align-items: center;
        margin-bottom: 5px;
        font-size: 14px;
        .iconfont {
          margin-right: 11px;
          font-size: 12px;
        }
      }
      .ff-number-card--channels-box {
        color: #575757;
        //max-width: 1000px;
        box-sizing: border-box;
        margin-left: 25px;
        border: 1px solid #DCDCDC;
        border-radius: 4px;
        padding: 20px 14px;
        margin-bottom: 12px;
        .ff-number-card--channels--ul {
          overflow: hidden;
        }
        .ff-number-card--channels--li {
          display: flex;
          float: left;
          width: 30%;
          margin-top: 15px;
          font-size: 14px;
          color: #575757;
        }
        .ff-number-card--channels--data {
          flex: 1;
          word-wrap: break-word;
          word-break:break-all;
        }
        .ff-number-card--channels-label {
          display: inline-block;
          width: 80px;
          text-align: right;
        }
      }
    }
  }
</style>
<script>
  import $http from 'framework/__utils__/request';
  // import { getSeesionObject } from 'framework/utils/sessionStorage';
  import R3 from '@syman/burgeon-r3'
const {getSeesionObject}=R3
  export default {
    data() {
      return {
        channels: [
          {
            label: '门店',
            active: false,
            type: 'icon-mendian',
            bc: '#2D9ADF',
            sourceType: 5
          },
          {
            label: '微信',
            active: false,
            type: 'icon-weixin1',
            bc: '#41C155',
            sourceType: 2
          },
          {
            label: '淘宝',
            active: false,
            type: 'icon-taobao',
            bc: '#F05948',
            sourceType: 3
          },
          {
            label: '小程序',
            active: false,
            type: 'icon-miniprogram',
            bc: '#28a544',
            sourceType: 1
          },
          {
            label: '京东',
            active: false,
            type: 'icon-jingdong',
            bc: '#e1251a',
            sourceType: 4
          },
          {
            label: '蘑菇街',
            active: false,
            type: 'icon-mogujie',
            bc: '#ff4466',
            sourceType: 6
          }
        ], // 绑定渠道
        details: [
          {
            label: '会员卡号',
            name: 'cardNumber'
          },
          {
            label: '会员等级',
            name: 'cardClass'
          },
          {
            label: '开卡日期',
            name: 'cardDate'
          },
          {
            label: '开卡门店',
            name: 'cardStore'
          },
          {
            label: '开卡导购',
            name: 'cardGuide'
          },
          {
            label: '开卡渠道',
            name: 'cardTrench'
          },
          {
            label: '剩余额度',
            name: 'limit'
          }
        ], // 会员卡信息key
        informs: {
          /* cardNumber: 516165165156, //会员卡号
          cardClass: '普通卡', //会员等级
          cardDate: '2018-06-09', //开卡时间
          cardStore: '广州正佳广场店', //开卡门店
          cardGuide: '武鸣县', //开卡导购
          cardTrench: '门店POS', //开卡渠道
          limit: 960 //剩余额度 */
        }, // 会员卡信息value
        channelInformsLabel: [
          {
            label: '昵&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称∶',
            name: 'nikeName'
          },
          {
            label: '绑卡日期∶',
            name: 'cardDate'
          },
          {
            label: '绑卡门店∶',
            name: 'cardStore'
          },
          {
            label: '绑卡导购∶',
            name: 'cardGuide'
          },
          {
            label: '推广渠道∶',
            name: 'cardSeo'
          },
          {
            label: 'openID∶',
            name: 'ID'
          }
        ], // 渠道信息key
        channelInformsData: [
          /* {
            label: '微信',
            class: 'icon-weixin1',
            color: '#41C155',
            data: {
              nikeName: '智能过来了',
              cardDate: '2018-05-06',
              cardStore: '广州正佳广场店',
              cardGuide: '张晓晨',
              cardSeo: '导购二维码',
              ID: 'asdasd'
            }
          },
          {
            label: '淘宝',
            class: 'icon-taobao',
            color: '#F05948',
            data: {
              nikeName: '智能过来了',
              cardDate: '2018-05-06',
              cardStore: '广州正佳广场店',
              cardGuide: '张晓晨',
              cardSeo: '导购二维码'
            }
          } */
        ], // 渠道信息value
        VP_C_VIP_ACC_ID: '', // 会员id
        VP_C_VIP_ID: '', // 会员卡id
        accInform: {}, // 会员卡信息
        cardType: [
          {
            type: 1,
            name: '小程序'
          },
          {
            type: 2,
            name: '微信'
          },
          {
            type: 3,
            name: '淘宝'
          },
          {
            type: 4,
            name: '京东'
          },
          {
            type: 5,
            name: '门店'
          },
          {
            type: 6,
            name: '蘑菇街'
          }
        ], // 类型集合
        flag: true, // 只有员工卡才会显示余额
      };
    },
    mounted() {
      const standardTableurlCustomized = getSeesionObject('customizeMessage')[this.$route.params.customizedModuleId].standardTableurlCustomized;

      this.VP_C_VIP_ID = standardTableurlCustomized.VP_C_VIP_ID;
      this.VP_C_VIP_ACC_ID = standardTableurlCustomized.VP_C_VIP_ACC_ID;
      this.getData();
    },
    methods: {
      /* 获取会员卡信息 */
      getData() {
        $http({
          url: '/p/cs/getVipAccDetailsBasic',
          method: 'post',
          data: {
            param: JSON.stringify({
              VP_C_VIP_ACC_ID: this.VP_C_VIP_ACC_ID, // 会员ID
              VP_C_VIP_ID: this.VP_C_VIP_ID, // 会员卡ID
            })
          }
        }).then((res) => {
          const data = res.data;
          if (data.code === 0) {
            this.flag = data.BASICINFO.data.ACCINFO.VP_C_VIPTYPE_ID == 11;
            this.informs = {
              cardNumber: data.BASICINFO.data.ACCINFO.ECODE, // 会员卡号
              cardClass: data.BASICINFO.data.ACCINFO.VP_C_VIPTYPE_ENAME, // 会员等级
              cardDate: data.BASICINFO.data.ACCINFO.OPENDATE, // 开卡时间
              cardStore: data.BASICINFO.data.ACCINFO.CP_C_STORE_ENAME, // 开卡门店
              cardGuide: data.BASICINFO.data.ACCINFO.CP_C_SALER_ENAME, // 开卡导购
              cardTrench: data.BASICINFO.data.ACCINFO.OPEN_CHANNEL, // 开卡渠道
              limit: data.BASICINFO.data.ACCINFO.DECDIM1 // 剩余额度
            };// 卡号信息
            const arr = [];
            let sub = -1;
            let subObj = {};
            this.channels.map((obj) => {
              const index = data.BASICINFO.data.DETAILSLIST.findIndex(n => n.SOURCE_TYPE == obj.sourceType);
              if (obj.sourceType == 5) return subObj = Object.assign({}, obj);
              if (index === -1) {
                arr.push(Object.assign({}, obj, { active: false }));
              } else {
                sub++;
                arr.unshift(Object.assign({}, obj, { active: true }));
              }
            });
            // 门店默认点亮
            arr.splice(sub, 0, Object.assign(subObj, { active: true }));
            /* if(sub > -1){
              arr.splice(sub, 0, Object.assign(subObj, {active: true}))
            }else {
              arr.push(Object.assign(subObj, {active: false}));
            } */
            this.channels = arr;
            this.channelInformsData = data.BASICINFO.data.DETAILSLIST.map((obj) => {
              const index = this.channels.findIndex(n => obj.SOURCE_TYPE == n.sourceType);
              if (!obj.BIND_DATE && !obj.BIND_STORE_ENAME && !obj.BIND_SHOPPER_ENAME && index !== -1 && this.channels[index].sourceType == 2) {
                this.$set(this.channels[index], 'active', false);
              }
              if (index === -1) return false;
              return {
                label: this.channels[index].label,
                class: this.channels[index].type,
                color: this.channels[index].bc,
                data: {
                  nikeName: obj.WECHAT_ENAME, // 昵称
                  cardDate: obj.BIND_DATE, // 绑卡日期
                  cardStore: obj.BIND_STORE_ENAME, // 绑卡门店
                  cardGuide: obj.BIND_SHOPPER_ENAME, // 绑卡导购
                  cardSeo: obj.PROMOTION_CHANNEL, // 推广渠道
                  ID: obj.OPENID ? obj.OPENID : ''
                }
              };
            }).filter(_ => _);
          }
        });
      }
    }
  };
</script>

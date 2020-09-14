<!--会员升降记录-->
<template>
  <div class="ff-card-lifting-record">
    <table>
      <thead>
        <tr>
          <th v-for="(list, index) in tHead">
            {{ list.label }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(list, index) in tBody">
          <td
            v-for="(data, sub) in tHead"
            :class="{'ff-card-lifting--color-litre': data.name === 'liftingType' && list[data.name] === '升级', 'ff-card-lifting--color-drop': data.name === 'liftingType' && list[data.name] === '降级'}"
          >
            {{ list[data.name] }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<style lang="less" scoped type="text/less">
  .ff-card-lifting-record {
    td,th {
      border: 1px solid #DCDCDC;
      text-align: center;
    }
    table {
      color: #575757;
      width: 100%;
      th {
        height: 30px;
        font-size: 14px;
        font-weight: 400;
        box-sizing: border-box;
        background-color: #F6F8FA;
      }
      td {
        padding: 10px 0;
      }
      .ff-card-lifting--color-litre {
        color: #0F8EE9;
      }
      .ff-card-lifting--color-drop {
        color: #F17356;
      }
    }
  }
</style>
<script>
  import $http from 'framework/__utils__/request';
  import R3 from '@syman/burgeon-r3'
  
  const { getSeesionObject } =R3;

  export default {
    data() {
      return {
        tHead: [
          {
            label: '序号',
            name: 'index'
          },
          {
            label: '会员原等级',
            name: 'oldClass'
          },
          {
            label: '会员类型',
            name: 'memberType'
          },
          {
            label: '会员新等级',
            name: 'newClass'
          },
          {
            label: '升降级时间',
            name: 'liftingDate'
          },
          {
            label: '升降类型',
            name: 'liftingType'
          },
          {
            label: '备注',
            name: 'remark'
          }
        ],
        tBody: [
          /* {
            index: 1,
            oldClass: '快鱼普通卡',
            memberType: '快鱼',
            newClass: '快鱼金卡',
            liftingDate: '2018-11-2 17:32:59',
            liftingType: '升级',
            remark: 'asdasdasdasdasd'
          },
          {
            index: 2,
            oldClass: '快鱼普通卡',
            memberType: '快鱼',
            newClass: '快鱼金卡',
            liftingDate: '2018-11-2 17:32:59',
            liftingType: '降级',
            remark: 'asdasdasdasdasd'
          },
          {
            index: 3,
            oldClass: '快鱼普通卡',
            memberType: '快鱼',
            newClass: '快鱼金卡',
            liftingDate: '2018-11-2 17:32:59',
            liftingType: '升级',
            remark: 'asdasdasdasdasd'
          },
          {
            index: 4,
            oldClass: '快鱼普通卡',
            memberType: '快鱼',
            newClass: '快鱼金卡',
            liftingDate: '2018-11-2 17:32:59',
            liftingType: '降级',
            remark: 'asdasdasdasdasd'
          } */
        ],
        VP_C_VIP_ACC_ID: '', // 会员id
        VP_C_VIP_ID: '', // 会员卡id
      };
    },
    methods: {
      /* 获取会员卡升降记录 */
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
            this.tBody = data.BASICINFO.data.VIPUPLIST.map((obj, index) => Object.assign(obj, {
              index: index + 1, // 序号
              oldClass: obj.VP_C_VIPTYPE_OLDTYPEENAME, // 会员原等级
              memberType: obj.VP_C_VIPTYPEGROUP_ENAME, // 会员类型
              newClass: obj.VP_C_VIPTYPE_NEWTYPEENAME, // 会员新等级
              liftingDate: obj.DATEUP, // 升降级时间
              liftingType: obj.TYPE === 1 ? '升级' : '降级', // 升降类型
              remark: obj.REMARK// 备注
            }));
          }
        });
      }
    },
    mounted() {
      const standardTableurlCustomized = getSeesionObject('customizeMessage')[this.$route.params.customizedModuleId].standardTableurlCustomized;
      this.VP_C_VIP_ID = standardTableurlCustomized.VP_C_VIP_ID;
      this.VP_C_VIP_ACC_ID = standardTableurlCustomized.VP_C_VIP_ACC_ID;
      this.getData();
    }
  };
</script>

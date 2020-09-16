<!--高级搜索省市区组件-->
<template>
  <div class="ff-pro-component">
    <el-select
      v-model="pro.value"
      placeholder="请选择"
      size="mini"
      class="ff-pro-component--select"
    >
      <el-option
        v-for="item in pro.lists"
        :key="item.value"
        :label="item.label"
        :value="item"
      />
    </el-select>
    <el-select
      v-model="city.value"
      placeholder="请选择"
      size="mini"
      class="ff-pro-component--select"
    >
      <el-option
        v-for="item in city.lists"
        :key="item.value"
        :label="item.label"
        :value="item"
      />
    </el-select>
    <el-select
      v-model="area.value"
      placeholder="请选择"
      size="mini"
      class="ff-pro-component--select"
    >
      <el-option
        v-for="item in area.lists"
        :key="item.value"
        :label="item.label"
        :value="item"
      />
    </el-select>
    <p
      v-if="verify && Object.keys(pro.value).length === 0"
      class="ff-advanced-search-verify"
    >
      请填写完整
    </p>
  </div>
</template>
<style lang="less" scoped type="text/less">
  .ff-pro-component {
    display: inline-block;
    .ff-pro-component--select {
      width: 100px;
      margin-right: 7px;
    }
  }
</style>
<script>
  import $http from 'framework/__utils__/request';

  export default {
    props: {
      initData: {}, // 初始值
      verify: {
        type: Boolean,
        default: false
      }// 用于校验(判断是否填写了值)
    },
    data() {
      return {
        pro: {
          value: {},
          lists: []
        },
        city: {
          value: {},
          lists: []
        },
        area: {
          value: {},
          lists: []
        },
        firstData: {
          pro: {},
          city: {},
          area: {}
        }// 用于保存初始值的
      };
    },
    watch: {
      'pro.value': function (val) {
        this.$emit('changeData', {
          value: val.code,
          text: `${this.pro.value.label}`
        });
        this.city.value = {};
        this.area.value = {};
        if (Object.keys(val).length === 0) return;
        this.getAddress('CP_C_CITY', {
          C_UP_ID: [val.value]
        }).then((res) => {
          const data = res.data;
          let arr = [];
          if (data.code === 0) {
            arr = data.datas.row.map(obj => Object.assign({
              label: obj.ENAME.val,
              value: obj.ID.val,
              code: obj.ECODE.val
            }));
          }
          this.city.lists = arr;
          if (Object.keys(this.firstData.city).length > 0) {
            this.city.value = Object.assign({}, this.firstData.city);
          }
        }).catch(_ => this.city.lists = []);
      },
      'city.value': function (val) {
        this.area.value = {};
        if (Object.keys(val).length === 0) return;
        this.$emit('changeData', {
          value: val.code,
          text: `${this.pro.value.label}${this.city.value.label}`
        });
        this.firstData.city = {};// 清空初始化
        this.getAddress('CP_C_DISTAREA', {
          C_UP_ID: [val.value]
        }).then((res) => {
          const data = res.data;
          let arr = [];
          if (data.code === 0) {
            arr = data.datas.row.map(obj => Object.assign({
              label: obj.ENAME.val,
              value: obj.ID.val,
              code: obj.ECODE.val
            }));
          }
          this.area.lists = arr;
          if (Object.keys(this.firstData.area).length > 0) {
            this.area.value = Object.assign({}, this.firstData.area);
          }
        }).catch(_ => this.area.lists = []);
      },
      'area.value': function (val) {
        if (Object.keys(val).length === 0) return;
        this.firstData.area = {};// 清空初始化
        this.$emit('changeData', {
          value: val.code,
          text: `${this.pro.value.label}${this.city.value.label}${this.area.value.label}`
        });
      }
    },
    methods: {
      /* 省 "CP_C_PROVINCE"  市 "CP_C_CITY" 区 "CP_C_DISTAREA"   data: 需要明确查找的数据 */
      getAddress(table, data) {
        return $http({
          url: '/p/cs/QueryList',
          method: 'post',
          data: {
            searchdata: JSON.stringify({
              table,
              column_include_uicontroller: true,
              fixedcolumns: data,
              multiple: [],
              startindex: 0,
              range: 99999,
            })
          }
        });
      },
    },
    async mounted() {
      await this.getAddress('CP_C_PROVINCE', {}).then((res) => {
        const data = res.data;
        let arr = [];
        if (data.code === 0) {
          arr = data.datas.row.map(obj => Object.assign({
            label: obj.ENAME.val,
            value: obj.ID.val,
            code: obj.ECODE.val
          }));
        }
        this.pro.lists = arr;
      }).catch(_ => this.pro.lists = []);
      if (this.initData) {
        // 区
        let city = '';
        await this.getAddress('CP_C_DISTAREA', {
          ECODE: this.initData
        }).then((res) => {
          const result = res.data;
          if (result.code === 0 && result.datas.row.length !== 0) {
            this.firstData.area = result.datas.row.map((obj) => {
              city = obj.C_UP_ID.val;
              return {
                label: obj.ENAME.val,
                value: obj.ID.val,
                code: obj.ECODE.val
              };
            })[0];
          }
        });
        // 市
        let pro = '';
        await this.getAddress('CP_C_CITY', Object.keys(this.firstData.area).length === 0 ? {
          ECODE: this.initData
        } : {
          ENAME: city // 表示上次保存的是区的code
        }).then((res) => {
          const result = res.data;
          // 只可能获得一个城市
          if (result.code === 0 && result.datas.row.length !== 0) {
            this.firstData.city = result.datas.row.map((obj) => {
              pro = obj.C_UP_ID.val;
              return {
                label: obj.ENAME.val,
                value: obj.ID.val,
                code: obj.ECODE.val
              };
            })[0];
          }
        });
        // 省
        const data = this.pro.lists.find(n => n.code === this.initData || n.label === pro);
        if (data) this.pro.value = data;
      }
    }
  };
</script>

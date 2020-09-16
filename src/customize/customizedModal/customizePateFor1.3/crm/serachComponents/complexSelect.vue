<!--高级搜索下拉单选和下拉多选组合组件-->
<template>
  <div class="ff-complex-select">
    <drop-select
      :get-data="getTypeData"
      placeholder="请选择会员类型"
      :init-data="typeData.value"
      @changeData="singleChange"
    />
    <drop-select
      v-if="!disabled"
      :init-data="secondData"
      :get-data="getClassData"
      :multiple="true"
      placeholder="请选择会员等级"
      :other="typeData.value"
      class="ff-complex-select-width"
      @changeData="moreChange"
    />
    <p
      v-if="verify && typeData.value === ''"
      class="ff-advanced-search-verify"
    >
      请填写完整
    </p>
  </div>
</template>
<style lang="less" scoped type="text/less">
  .ff-complex-select {
    .ff-complex-select-width {
      width: 280px;
    }
  }
</style>
<script>
  import $http from 'framework/__utils__/request';
  import dropSelect from './dropSelect.vue';

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
        disabled: true,
        typeData: {
          value: ''
        }, // 类型数据
        secondData: []
      };
    },
    mounted() {
      if (this.initData && Object.keys(this.initData)) {
        const arr = Object.keys(this.initData);
        this.typeData.value = this.initData[arr[0]];
        this.disabled = false;
        this.secondData = [...this.initData[arr[1]]];
      }
    },
    components: {
      dropSelect
    },
    methods: {
      /* 获取开卡类型列表数据 */
      getTypeData(cb) {
        $http({
          url: '/p/cs/QueryList',
          method: 'post',
          data: {
            searchdata: JSON.stringify({
              table: 'VP_C_VIPTYPEGROUP',
              column_include_uicontroller: true,
              fixedcolumns: {},
              multiple: [],
              startindex: 0,
              range: 100,
              orderby: [
                {
                  column: 'VP_C_VIPTYPEGROUP.ID',
                  asc: true
                }
              ]
            })
          }
        }).then((res) => {
          const data = res.data;
          let arr = [];
          if (data.code === 0) {
            arr = data.datas.row.map(obj => ({
              label: obj.ENAME.val,
              value: obj.ID.val,
              code: obj.ECODE.val
            }));
          }
          cb(arr);
        }).catch(_ => cb([]));
      },
      /* 改变类型时 */
      singleChange(val) {
        this.disabled = false;
        this.typeData = {
          value: val.value,
          text: val.text
        };
        this.$emit('changeData', {
          value: {
            TYPE: val.value,
            LEVEL: []
          },
          text: val.text
        });
      },
      /* 获取等级数据 */
      getClassData(cb) {
        $http({
          url: '/p/cs/QueryList',
          method: 'post',
          data: {
            searchdata: JSON.stringify({
              table: 'VP_C_VIPTYPE',
              column_include_uicontroller: true,
              fixedcolumns: {
                VP_C_VIPTYPEGROUP_ID: [this.typeData.value]
              },
              multiple: [],
              startindex: 0,
              range: 100,
              orderby: [
                {
                  column: 'VP_C_VIPTYPE.ID',
                  asc: true
                }
              ]
            })
          }
        }).then((res) => {
          const data = res.data;
          let arr = [];
          if (data.code === 0) {
            arr = data.datas.row.map(obj => ({
              label: obj.ENAME.val,
              value: obj.ID.val,
              code: obj.ECODE.val
            }));
          }
          cb(arr);
        }).catch(_ => cb([]));
      },
      /* 获取列表数据 */
      moreChange(val) {
        this.$emit('changeData', {
          value: {
            TYPE: this.typeData.value,
            LEVEL: val.value
          },
          text: `${this.typeData.text}:${val.text}`
        });
      },
    }
  };
</script>

<template>
  <div class="item-select wrap-filter dialog-select">
    <label class="title"><b v-if="importance">*</b>{{ itemdata.coldesc }}:</label>
    <el-select
      v-model="itemdata.value"
      class="item-select"
      :loading="loading"
      size="small"
      :placeholder="$t('form.selectPlaceholder')"
      @change="selectChange"
    >
      <!--         <el-option
        value=""
        label="">
        </el-option> -->
      <el-option
        v-for="item in itemdata.combobox"
        :key="item.limitval"
        :value="item.id"
        :label="item.limitdesc"
      />
    </el-select>
  </div>
</template>

<script>
// import i18n from '../../assets/js/i18n'
  export default {
    name: 'Mselect',
    props: {
      itemdata: {
        type: Object
      },
      type: {
        type: String
      },
      loading: {
        type: Boolean,
        defalut: false,
      },
      importance: {
        type: Boolean,
        defalut: false,
      }
    },

    beforeCreate() {
    // this.$t = i18n.t.bind(i18n)
    },

    methods: {
      selectChange(val) { //
        this.$emit('getChangeItem', val);
      },
    }
  };
</script>

<style lang="less">
.item-select.wrap-filter {
  .el-select {
    // display: flex;
    // flex: 1;
    width: calc(100% - 60px);
    font-size: 12px;
    .el-input__inner {
      width: 124px;
      height: 22px;
      border: 1px solid #dcdfe6;
      border-radius: 2px;
      padding: 0 0 2px 4px;
      font-size: 12px;
      margin-left: 3px;
    }
  }

}
.dialog-select {
    label.title {
        line-height: 20px !important;
    }
}
</style>

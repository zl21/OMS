<template>
  <div class="errorMessage">
    <div class="top">
      <div class="left">
        <i
          v-if="DialogClass == 'success'"
          class="iconfont"
        >&#xe626;</i>
        <i
          v-if="DialogClass == 'warning' && !DialogBack"
          class="iconfont"
        >&#xe631;</i>
        <i
          v-if="DialogClass == 'error'"
          class="iconfont"
        >&#xe6b4;</i>
        <i
          v-if="DialogClass == 'warning' && DialogBack"
          class="iconfont"
        >&#xe600;</i>
      </div>
      <div class="right">
        <p
          v-for="(item, index) in errorMessage"
          v-if="errorFlag"
          :key="index"
          v-html="item.message"
        />
        <p
          v-if="!errorFlag"
          v-html="errorMessage.message"
        />
      </div>
    </div>

    <div
      v-if="!hiddenButton"
      class="bottom"
    >
      <el-button
        @click.stop="closeDialog(true)"
        @keyup.13.stop="closeDialog(true)"
      >
        {{ ChineseDictionary.ENSURE }}
      </el-button>
      <el-button
        v-if="DialogBack"
        @click.stop="closeDialog(false)"
      >
        {{ ChineseDictionary.CANCEL }}
      </el-button>
    </div>

    <div
      v-if="hiddenButton"
      class="bottom"
    >
      <el-button
        v-if="DialogBack"
        @click.stop="closeDialog(false)"
      >
        {{ ChineseDictionary.ENSURE }}
      </el-button>
    </div>
  </div>
</template>

<script>
  // import ChineseDictionary from '../../assets/js/ChineseDictionary';

  export default {
    name: 'error',
    props: {
      errorMessage: {},
      dialogClass: {},
      dialogBack: {},
      hiddenButton: {
        type: Boolean
      }
    },
    props: [
      'errorMessage',
      'DialogClass',
      'DialogBack',
      'hiddenButton'
    ],
    data() {
      return {
        ChineseDictionary: '',
        errorFlag: false
      };
    },
    methods: {
      closeDialog(option) {
        const _self = this;
        _self.$emit('refreshbizlines', false, option);
      }
    },
    mounted() {
      const _self = this;
      this.ChineseDictionary = ChineseDictionary;
      $('.errorMessage .bottom button:eq(0)').focus();
      // console.log('_self.errorMessage',_self.errorMessage,_self.errorMessage instanceof Array)
      if (_self.errorMessage instanceof Array) {
        _self.errorFlag = true;
      } else {
        _self.errorFlag = false;
      }
    },
    created() {


    }
  };
</script>

<style lang="less">
  // 提示信息


</style>

<template>
  <div class="dialogForm customized-modal">
    <loading :loading="loading" />
    <div class="subtablePart">
      <businessForm
        v-if="dialogConfig.length == 1"
        :form-config="dialogConfig[0].formConfig"
      />
      <Collapse
        v-if="dialogConfig.length > 1"
        v-model="subTableCollapse"
      >
        <Panel
          v-for="(item, index) in dialogConfig"
          :key="item.title"
          :name="String(index)"
        >
          {{ item.title }}
          <p slot="content">
            <businessForm :form-config="item.formConfig" />
          </p>
        </Panel>
      </Collapse>
    </div>
    <div class="buttons">
      <businessButton :btn-config="btnConfig" />
    </div>
  </div>
</template>
<script>
  import businessForm from 'professionalComponents/businessForm';
  import businessButton from 'professionalComponents/businessButton';
  import loading from 'professionalComponents/loading';
  import comMethods from '_/assets/js/__utils__/comMethods.js';

  export default {
    name: 'ScheduleFormDialog',
    components: {
      businessButton,
      businessForm,
      loading
    },
    props: {
      dialogConfig: {
        type: Array,
        default: []
      }, // 表单数据
      detail: {
        type: Object,
        default: {}
      }, // 明细详情
      loading: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        vmI18n: window.vmI18n,
        ID: this.$route.params.customizedModuleId && this.$route.params.customizedModuleId != 'New' ? this.$route.params.customizedModuleId : '-1', // 记录主界面传入的ID
        subTableCollapse: [],
        formConfig: {},
        btnConfig: {
          typeAll: 'error',
          buttons: [
            {
              text: '取消',
              btnclick: () => {
                this.$parent.close();
                this.$emit('clearModify');
              },
            },
            {
              text: '确定',
              size: '', // 按钮大小
              disabled: false, // 按钮禁用控制
              btnclick: () => {
                this.confirmHandel();
              },
            },
          ]
        }
      };
    },
    watch: {
      dialogConfig: {
        handler(val) {
          const panelCounts = this.dialogConfig.length;
          this.subTableCollapse = panelCounts > 1 ? [...new Array(panelCounts).keys()] : [];
        },
        immediate: true
      }
    },
    mounted() {
      this.$emit('initForm'); // 表单初始化渲染
    },
    methods: {
      confirmHandel() {
        console.log(this.detail.ID);

        if (!this.validate()) return;
        let ID = this.detail.ID || -1;
        this.$emit('getData', { ID, ...this.formConfig.formValue });
      },
      // 表单校验
      validate() {
        const self = this;
        let flag = true;
        // 整合表单
        let formData = [];
        let formValue = {};
        let ruleValidate = {};
        this.dialogConfig.forEach(item => {
          formData = formData.concat(item.formConfig.formData);
          Object.assign(formValue, item.formConfig.formValue);
          Object.assign(ruleValidate, item.formConfig.ruleValidate);
        });
        this.formConfig = { formData, formValue, ruleValidate };

        const objKey = this.formConfig.formData.map(i => i.itemdata && i.itemdata.colname);
        const requiredArr = Object.keys(this.formConfig.ruleValidate).map(i => {
          if (this.formConfig.ruleValidate[i][0].required) return i;
        });
        const drpArr = requiredArr.filter(i => objKey.includes(i));
        const valueArr = requiredArr.filter(i => !drpArr.includes(i));
        const msg = comMethods.validatorNotEmpty(self.formConfig, valueArr, drpArr);
      
        if (msg !== 1) {
          self.$message.error(msg);
          flag = false;
        }
        return flag;
      }
    }
  };
</script>
<style lang="less" scoped>
.dialogForm {
  /deep/ .one_button .buttonBox {
    justify-content: flex-end;
  }
  max-height: 400px !important;
  overflow-y: scroll !important;
}
</style>
